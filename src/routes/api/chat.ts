import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/ash-prompt";
import { createLovableAiGatewayRunIdFetch } from "@/lib/server/run-id";

const Body = z.object({
  messages: z.array(z.any()).min(1).max(60),
  focus: z.string().max(100).optional(),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];

        if (!apiKey) {
          return Response.json(
            { error: "AI is not configured." },
            { status: 500 }
          );
        }

        const parsed = Body.safeParse(
          await request.json().catch(() => null)
        );

        if (!parsed.success) {
          return Response.json(
            { error: "Invalid request." },
            { status: 400 }
          );
        }

        const runId = createLovableAiGatewayRunIdFetch();

        const openai = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: {
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          fetch: runId.fetch,
        });

        const messages = parsed.data.messages as UIMessage[];

        const result = streamText({
          model: openai.responses("openai/gpt-6.1-sol"),
          system: buildSystemPrompt(parsed.data.focus),
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          maxRetries: 0,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (err) => {
            const status = (err as { statusCode?: number })?.statusCode;

            if (status === 429) {
              return "Too many questions right now — try again in a moment.";
            }

            if (status === 402 || status === 403) {
              return "The AI helper is unavailable right now.";
            }

            return "Something went wrong. Please try again.";
          },
        });
      },
    },
  },
});


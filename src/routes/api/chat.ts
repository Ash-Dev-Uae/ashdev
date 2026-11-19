import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/ash-prompt";

const Body = z.object({
  messages: z.array(z.any()).min(1).max(60),
  focus: z.string().max(100).optional(),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["OPENROUTER_API_KEY"];

        if (!apiKey) {
          return Response.json(
            { error: "OpenRouter API key is missing." },
            { status: 500 },
          );
        }

        const parsed = Body.safeParse(
          await request.json().catch(() => null),
        );

        if (!parsed.success) {
          return Response.json(
            { error: "Invalid request." },
            { status: 400 },
          );
        }

        const openrouter = createOpenAI({
          name: "openrouter",
          baseURL: "https://openrouter.ai/api/v1",
          apiKey,
        });

        const messages = parsed.data.messages as UIMessage[];

        const result = streamText({
          model: openrouter.chat("openai/gpt-oss-20b"),
          system: buildSystemPrompt(parsed.data.focus),
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          maxRetries: 1,
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (err) => {
            console.error("AshBot OpenRouter API error:", err);

            const status = (err as { statusCode?: number })?.statusCode;

            if (status === 429) {
              return "Too many requests. Please try again shortly.";
            }

            if (status === 401 || status === 403) {
              return "OpenRouter authentication failed. Check your API key.";
            }

            return "Something went wrong. Please try again.";
          },
        });
      },
    },
  },
});

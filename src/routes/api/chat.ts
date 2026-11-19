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
        const apiKey = process.env["GEMINI_API_KEY"];

        if (!apiKey) {
          return Response.json(
            { error: "Gemini API key is not configured on the server." },
            { status: 500 }
          );
        }

        const parsed = Body.safeParse(
          await request.json().catch(() => null)
        );

        if (!parsed.success) {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const openai = createOpenAI({
          baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
          apiKey,
        });

        const messages = parsed.data.messages as UIMessage[];

        const result = streamText({
          model: openai.chat("gemini-3.1-flash-lite"),
          system: buildSystemPrompt(parsed.data.focus),
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          maxRetries: 0,
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

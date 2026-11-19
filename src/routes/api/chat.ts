
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
        const apiKey =
          process.env["GEMINI_API_KEY"] ??
          process.env["Gemini_key_api"];

        if (!apiKey) {
          return Response.json(
            { error: "Gemini API key is missing." },
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

        const gemini = createOpenAI({
          baseURL:
            "https://generativelanguage.googleapis.com/v1beta/openai/",
          apiKey,
        });

        const messages = parsed.data.messages as UIMessage[];

        const result = streamText({
          model: gemini.chat("gemini-2.5-flash"),
          system: buildSystemPrompt(parsed.data.focus),
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          maxRetries: 1,
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (err) => {
  console.error("AshBot Gemini API error:", err);

  const status = (err as { statusCode?: number })?.statusCode;

  if (status === 429) {
    return "Too many questions right now. Try again shortly.";
  }

  if (status === 401 || status === 403) {
    return "Gemini authentication failed. Check your API key.";
  }

  return "Something went wrong. Please try again.";
},
          },
        });
      },
    },
  },
});

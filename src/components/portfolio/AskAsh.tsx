import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import botImg from "@/assets/ash-bot.png";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { servers } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Thread = {
  id: string;
  title: string;
  focus: string;
  updatedAt: number;
  messages: UIMessage[];
};
const KEY = "ashbot-threads-v1";

const newThread = (): Thread => ({
  id: crypto.randomUUID(),
  title: "New chat",
  focus: "",
  updatedAt: Date.now(),
  messages: [],
});

function loadThreads(): Thread[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Thread[]) : [];
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {
    /* ignore */
  }
  const first = [newThread()];
  window.localStorage.setItem(KEY, JSON.stringify(first));
  return first;
}

export function AskAsh({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const t = loadThreads();
    setThreads(t);
    setActiveId(t[0]?.id ?? "");
  }, []);

  const save = useCallback((updater: (t: Thread[]) => Thread[]) => {
    setThreads((prev) => {
      const next = updater(prev ?? []);
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const active = threads?.find((t) => t.id === activeId);

  const create = () => {
    const t = newThread();
    save((prev) => [t, ...prev]);
    setActiveId(t.id);
  };

  const remove = (id: string) => {
    save((prev) => {
      let next = prev.filter((t) => t.id !== id);
      if (!next.length) next = [newThread()];
      if (id === activeId) setActiveId(next[0]?.id ?? "");
      return next;
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-[60] max-w-[calc(100vw-2rem)]">
      <section
        id="ashbot-panel"
        aria-label="AshBot chat"
        hidden={!open}
        className={cn(
          "mb-3 h-[min(640px,calc(100dvh-7rem))] w-[420px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-pixel)]",
          open && "flex",
        )}
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-border bg-secondary/35 p-3">
          <img
            src={botImg}
            alt=""
            className="size-9 rounded-lg border border-primary/25 [image-rendering:pixelated]"
          />
          <div className="flex-1">
            <h2 className="text-sm font-bold">AshBot</h2>
            <p className="text-[10px] text-muted-foreground">Ask about my experience</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            title="Close chat"
            aria-label="Close chat"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>
        </header>
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
          <select
            aria-label="Saved chats"
            value={activeId}
            onChange={(e) => setActiveId(e.target.value)}
            className="min-w-0 flex-1 rounded-sm border border-border bg-background px-2 py-2 text-sm"
          >
            {threads?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="icon"
            title="New chat"
            aria-label="New chat"
            onClick={create}
          >
            <Plus />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Delete chat"
            aria-label="Delete chat"
            onClick={() => remove(activeId)}
          >
            <Trash2 />
          </Button>
        </div>
        {active ? (
          <ChatWindow
            key={active.id}
            thread={active}
            onChange={(patch) =>
              save((prev) =>
                prev.map((t) =>
                  t.id === active.id ? { ...t, ...patch, updatedAt: Date.now() } : t,
                ),
              )
            }
          />
        ) : (
          <div className="min-h-0 flex-1" />
        )}
      </section>
      <Button
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="ashbot-panel"
        aria-label={open ? "Hide AshBot" : "Open AshBot"}
        className="ml-auto flex h-13 gap-2 rounded-full border border-primary/35 bg-primary px-5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-pixel-primary)] hover:bg-primary/90"
      >
        <img src={botImg} alt="" className="size-8 rounded-md [image-rendering:pixelated]" /> Ask
        AshBot
      </Button>
    </div>
  );
}

function ChatWindow({
  thread,
  onChange,
}: {
  thread: Thread;
  onChange: (p: Partial<Thread>) => void;
}) {
  const [focus, setFocus] = useState(thread.focus);
  const [text, setText] = useState("");
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const taRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ focus: focusRef.current }),
        fetch: async (input, init) => {
          const response = await fetch(input, init);
          if (!response.ok && response.headers.get("content-type")?.includes("application/json")) {
            const payload: unknown = await response
              .clone()
              .json()
              .catch(() => null);
            if (
              payload &&
              typeof payload === "object" &&
              "error" in payload &&
              typeof payload.error === "string"
            ) {
              throw new Error(payload.error);
            }
          }
          return response;
        },
      }),
    [],
  );
  const { messages, sendMessage, status, stop, error } = useChat({
    id: thread.id,
    messages: thread.messages,
    transport,
  });

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (status === "ready" || status === "error") {
      if (messages.length !== thread.messages.length || messages !== thread.messages) {
        const firstUser = messages.find((m) => m.role === "user");
        const firstText = firstUser?.parts.find((p) => p.type === "text");
        const title =
          firstText && firstText.type === "text" ? firstText.text.slice(0, 40) : thread.title;
        onChangeRef.current({ messages, title });
      }
    }
  }, [status, messages, thread.messages, thread.title]);

  const ask = (q: string) => {
    if (!q.trim() || status === "submitted" || status === "streaming") return;
    void sendMessage({ text: q });
    setText("");
  };

  const suggestions = [
    "What servers has Ash run?",
    "What does Ash do as an Admin?",
    "How does Ash handle staff abuse?",
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <label htmlFor="focus" className="font-mono text-[9px] tracking-wide text-muted-foreground">
          SERVER / ROLE
        </label>
        <input
          id="focus"
          list="ash-servers"
          value={focus}
          maxLength={100}
          onChange={(e) => setFocus(e.target.value)}
          onBlur={() => onChange({ focus })}
          placeholder="e.g. Toxicity or Admin (optional)"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <datalist id="ash-servers">
          {servers.map((s) => (
            <option key={s.server} value={s.server} />
          ))}
        </datalist>
      </div>
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <img src={botImg} alt="AshBot" className="size-16 [image-rendering:pixelated]" />
              <p className="font-display text-lg">Ask AshBot anything</p>
              <p className="text-sm text-muted-foreground">
                Questions about Ash's Discord & Minecraft experience.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    type="button"
                    onClick={() => ask(s)}
                    className="h-auto whitespace-normal rounded-lg px-3 py-2 text-xs hover:border-primary"
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m, mi) => (
              <Message key={m.id} from={m.role}>
                <MessageContent className="group-[.is-user]:bg-accent group-[.is-user]:text-accent-foreground">
                  {m.parts.map((p, i) => {
                    if (p.type === "text")
                      return m.role === "assistant" ? (
                        <MessageResponse key={i}>{p.text}</MessageResponse>
                      ) : (
                        <p key={i} className="whitespace-pre-wrap">
                          {p.text}
                        </p>
                      );
                    if (p.type === "reasoning" && p.text)
                      return (
                        <Reasoning
                          key={i}
                          isStreaming={
                            status === "streaming" &&
                            mi === messages.length - 1 &&
                            i === m.parts.length - 1
                          }
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{p.text}</ReasoningContent>
                        </Reasoning>
                      );
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img
                src={botImg}
                alt=""
                className="size-6 animate-bounce [image-rendering:pixelated]"
              />{" "}
              AshBot is typing…
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error.message || "Something went wrong."}
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t border-border bg-secondary/20 p-3">
        <PromptInput onSubmit={(msg) => ask(msg.text ?? "")}>
          <PromptInputTextarea
            ref={taRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask about Ash's experience…"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={!text.trim() && status !== "submitted" && status !== "streaming"}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

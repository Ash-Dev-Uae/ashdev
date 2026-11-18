import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Plus, Trash2 } from "lucide-react";
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

type Thread = { id: string; title: string; focus: string; updatedAt: number; messages: UIMessage[] };
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

export function AskAsh() {
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const t = loadThreads();
    setThreads(t);
    setActiveId(t[0]!.id);
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
      if (id === activeId) setActiveId(next[0]!.id);
      return next;
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <aside className="pixel-card flex flex-col gap-2 p-3">
        <button type="button" onClick={create} className="pixel-btn flex items-center justify-center gap-2 bg-primary px-3 py-2 font-pixel text-xs text-primary-foreground">
          <Plus className="size-4" /> NEW CHAT
        </button>
        <ul className="flex max-h-40 flex-col gap-1 overflow-y-auto md:max-h-[420px]">
          {threads?.map((t) => (
            <li key={t.id} className={cn("flex items-center gap-1 rounded-sm border-2", t.id === activeId ? "border-primary bg-primary/10" : "border-transparent")}>
              <button type="button" onClick={() => setActiveId(t.id)} className="min-w-0 flex-1 truncate px-2 py-1.5 text-left text-sm">
                {t.title}
              </button>
              <button type="button" aria-label="Delete chat" onClick={() => remove(t.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {active ? (
        <ChatWindow key={active.id} thread={active} onChange={(patch) => save((prev) => prev.map((t) => (t.id === active.id ? { ...t, ...patch, updatedAt: Date.now() } : t)))} />
      ) : (
        <div className="pixel-card h-[520px]" />
      )}
    </div>
  );
}

function ChatWindow({ thread, onChange }: { thread: Thread; onChange: (p: Partial<Thread>) => void }) {
  const [focus, setFocus] = useState(thread.focus);
  const [text, setText] = useState("");
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const taRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: () => ({ focus: focusRef.current }) }),
    [],
  );
  const { messages, sendMessage, status, stop, error } = useChat({ id: thread.id, messages: thread.messages, transport });

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (status === "ready" || status === "error") {
      if (messages.length !== thread.messages.length || messages !== thread.messages) {
        const firstUser = messages.find((m) => m.role === "user");
        const firstText = firstUser?.parts.find((p) => p.type === "text");
        const title = firstText && firstText.type === "text" ? firstText.text.slice(0, 40) : thread.title;
        onChangeRef.current({ messages, title });
      }
      taRef.current?.focus();
    }
  }, [status, messages, thread.messages, thread.title]);

  useEffect(() => taRef.current?.focus(), []);

  const ask = (q: string) => {
    if (!q.trim() || status === "submitted" || status === "streaming") return;
    sendMessage({ text: q });
    setText("");
  };

  const suggestions = ["What servers has Ash run?", "What does Ash do as an Admin?", "How does Ash handle staff abuse?"];

  return (
    <div className="pixel-card flex h-[520px] flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-border p-3">
        <label htmlFor="focus" className="font-pixel text-[10px] text-muted-foreground">SERVER / ROLE</label>
        <input
          id="focus"
          list="ash-servers"
          value={focus}
          maxLength={100}
          onChange={(e) => setFocus(e.target.value)}
          onBlur={() => onChange({ focus })}
          placeholder="e.g. Toxicity or Admin (optional)"
          className="min-w-0 flex-1 rounded-sm border-2 border-border bg-background px-2 py-1 text-sm outline-none focus:border-primary"
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
              <p className="text-sm text-muted-foreground">Questions about Ash's Discord & Minecraft experience.</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)} className="rounded-sm border-2 border-border px-2 py-1 text-xs hover:border-primary">
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m, mi) => (
              <Message key={m.id} from={m.role}>
                <MessageContent className="group-[.is-user]:bg-accent group-[.is-user]:text-accent-foreground">
                  {m.parts.map((p, i) => {
                    if (p.type === "text") return m.role === "assistant" ? <MessageResponse key={i}>{p.text}</MessageResponse> : <p key={i} className="whitespace-pre-wrap">{p.text}</p>;
                    if (p.type === "reasoning" && p.text)
                      return (
                        <Reasoning key={i} isStreaming={status === "streaming" && mi === messages.length - 1 && i === m.parts.length - 1}>
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
              <img src={botImg} alt="" className="size-6 animate-bounce [image-rendering:pixelated]" /> AshBot is typing…
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error.message || "Something went wrong."}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t-2 border-border p-3">
        <PromptInput onSubmit={(msg) => ask(msg.text ?? "")}>
          <PromptInputTextarea ref={taRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about Ash's experience…" />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!text.trim() && status === "ready"} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

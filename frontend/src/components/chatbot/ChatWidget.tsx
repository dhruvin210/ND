"use client";

import * as React from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the NextDynamix assistant. Ask me about our AI, software, or cloud services — or tell me about your project and I'll point you in the right direction.",
};

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does an MVP cost?",
  "Can you build AI agents?",
  "Book a consultation",
];

function getSessionId(): string {
  const key = "nd_chat_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/** Floating AI assistant — streams answers from the FastAPI RAG backend
 *  (LangGraph + LlamaIndex + pgvector). Captures leads and books meetings
 *  through conversation. */
export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content }]);
    trackEvent("chatbot_message");

    try {
      const res = await fetch(`${site.apiUrl}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: getSessionId(), message: content }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      // Stream the response token-by-token (text/event-stream of plain chunks)
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages((m) => [
          ...m.slice(0, -1),
          { role: "assistant", content: assistant },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Sorry — I'm having trouble connecting right now. You can reach the team directly at ${site.email}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        aria-controls="nd-chat-panel"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) trackEvent("chatbot_open");
        }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-brand-glow transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      <div
        id="nd-chat-panel"
        role="dialog"
        aria-label="NextDynamix AI assistant"
        className={cn(
          "fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <header className="flex items-center gap-3 border-b border-border bg-surface-elevated px-5 py-4">
          <span className="rounded-xl bg-brand/15 p-2 text-brand">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              NextDynamix Assistant
            </p>
            <p className="text-xs text-muted">
              Answers grounded in our services &amp; case studies
            </p>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-4"
          aria-live="polite"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "self-end bg-brand text-white"
                  : "self-start bg-surface-elevated text-foreground",
              )}
            >
              {msg.content || "…"}
            </div>
          ))}
          {messages.length === 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand/60 hover:text-brand"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="flex gap-2 border-t border-border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="nd-chat-input" className="sr-only">
            Message the assistant
          </label>
          <input
            id="nd-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about services, pricing, AI…"
            className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted/70 focus:border-brand focus:outline-none"
            disabled={busy}
          />
          <Button type="submit" size="md" disabled={busy} aria-label="Send message">
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </>
  );
}

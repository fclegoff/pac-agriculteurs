"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Wheat,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "C'est quoi l'éco-régime ?",
  "Quand déposer ma déclaration PAC ?",
  "Comment calculer mes BCAE ?",
  "Qu'est-ce que l'ICHN ?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur du serveur");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erreur de connexion";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:bg-[var(--color-primary-dark)] transition-all hover:scale-105 flex items-center justify-center group"
          aria-label="Ouvrir l'assistant PAC"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Badge pulsant */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </span>
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[420px] h-[100dvh] md:h-[600px] md:rounded-2xl bg-white md:border md:border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--color-primary)] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistant PAC</h3>
                <p className="text-xs text-white/80">
                  Posez vos questions sur la PAC
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Nouvelle conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Message d'accueil */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="bg-[var(--color-bg)] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm">
                      Bonjour ! Je suis votre assistant PAC. Je peux vous aider
                      avec vos questions sur :
                    </p>
                    <ul className="text-sm mt-2 space-y-1 text-[var(--color-text-muted)]">
                      <li>- La déclaration de surfaces</li>
                      <li>- L&apos;éco-régime et les BCAE</li>
                      <li>- Les aides (ICHN, MAEC, aides couplées...)</li>
                      <li>- Les échéances et délais</li>
                      <li>- TelePAC</li>
                    </ul>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="pl-11">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">
                    Questions fréquentes :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs bg-white border border-[var(--color-border)] text-[var(--color-text)] px-3 py-1.5 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Historique */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user"
                      ? "bg-blue-100"
                      : "bg-[var(--color-primary-light)]"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[var(--color-primary)] text-white rounded-tr-sm"
                      : "bg-[var(--color-bg)] text-[var(--color-text)] rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.role === "user"
                        ? "text-white/60"
                        : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <div className="bg-[var(--color-bg)] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Réflexion en cours...
                  </div>
                </div>
              </div>
            )}

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                <p className="font-medium">Erreur</p>
                <p className="mt-0.5">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    if (messages.length > 0) {
                      const lastUserMsg = [...messages]
                        .reverse()
                        .find((m) => m.role === "user");
                      if (lastUserMsg) {
                        setMessages((prev) =>
                          prev.filter((m) => m.id !== prev[prev.length - 1]?.id || prev[prev.length - 1]?.role !== "user")
                        );
                        sendMessage(lastUserMsg.content);
                      }
                    }
                  }}
                  className="mt-2 text-xs font-medium text-red-600 hover:underline"
                >
                  Réessayer
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--color-border)] p-3 flex-shrink-0 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question sur la PAC..."
                rows={1}
                className="flex-1 resize-none px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-[var(--color-bg)] max-h-24"
                style={{
                  height: "auto",
                  minHeight: "42px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 96) + "px";
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                  input.trim() && !loading
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 text-center">
              Assistant IA — Vérifiez toujours les informations auprès de votre DDT
            </p>
          </div>
        </div>
      )}
    </>
  );
}

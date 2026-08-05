"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpeakButton } from "@/components/speak-button";
import { AlertIcon, SparkIcon } from "@/components/icons";

/**
 * Almanca konuşma partneri.
 *
 * Sohbet akışı düz metin olarak gelir ve geldiği gibi ekrana eklenir —
 * cevabın tamamını beklemek konuşma hissini bozuyor.
 *
 * Düzeltme satırları (✏️ ile başlayan) ayrı bir tonda gösterilir: konuşmanın
 * içinde kaybolmasın ama akışı da bölmesin. Bu ayrımı istemci yapıyor çünkü
 * modelden yapı (JSON) istemek küçük modellerde hem kuralı kaçırtıyor hem
 * akışı zorlaştırıyor; tek karakterlik bir işaret daha sağlam.
 */

type Turn = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Hallo! Wie geht es dir heute?",
  "Erzähl mir von deinem Wochenende.",
  "Was machst du beruflich?",
  "Wo möchtest du gern Urlaub machen?",
];

export function ChatPlayer({ configured, level }: { configured: boolean; level: string }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, busy]);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy) return;

      const next: Turn[] = [...turns, { role: "user", content: message }];
      setTurns([...next, { role: "assistant", content: "" }]);
      setDraft("");
      setBusy(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        if (!res.ok || !res.body) {
          setTurns(next);
          setError(
            res.status === 503
              ? "Sohbet için anahtar tanımlı değil (.env → GITHUB_MODELS_API_KEY)."
              : "Cevap alınamadı. Birkaç saniye sonra tekrar dene.",
          );
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          // Akan metni son baloncuğa yaz; her parçada tüm listeyi değil
          // yalnızca son öğeyi değiştiriyoruz.
          setTurns([...next, { role: "assistant", content: acc }]);
        }
        if (!acc.trim()) {
          setTurns(next);
          setError("Boş cevap geldi. Tekrar dener misin?");
        }
      } catch {
        setTurns(next);
        setError("Bağlantı kurulamadı. İnternetini kontrol et.");
      } finally {
        setBusy(false);
        input.current?.focus();
      }
    },
    [turns, busy],
  );

  if (!configured) {
    return (
      <div className="card p-6">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <AlertIcon size={22} />
        </div>
        <h2 className="text-center text-lg font-bold">Sohbet henüz bağlı değil</h2>
        <p className="muted mt-2 text-center text-sm">
          Konuşma partneri GitHub Models üzerinden çalışıyor. Anahtarı{" "}
          <code className="rounded px-1 surface-2">.env</code> dosyasına{" "}
          <code className="rounded px-1 surface-2">GITHUB_MODELS_API_KEY</code> olarak ekleyip
          sunucuyu yeniden başlat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="card flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {turns.length === 0 ? (
            <div className="py-6 text-center">
              <div className="brand-gradient mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-white">
                <SparkIcon size={22} />
              </div>
              <p className="text-sm font-semibold">Almanca sohbet edelim</p>
              <p className="muted mx-auto mt-1 max-w-sm text-xs">
                {level} seviyesinde konuşuyorum. Takıldığın yerde Türkçe yazabilirsin;
                hatalarını konuşmayı bölmeden düzeltirim.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="chip px-3 py-1.5 text-xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <AnimatePresence initial={false}>
            {turns.map((turn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${turn.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {turn.role === "user" ? (
                  <div
                    className="max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm"
                    style={{
                      background: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)",
                    }}
                  >
                    {turn.content}
                  </div>
                ) : (
                  <Reply text={turn.content} pending={busy && i === turns.length - 1} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottom} />
        </div>

        {error ? (
          <p
            className="border-t px-4 py-2 text-center text-xs"
            style={{ borderColor: "var(--border)", color: "var(--color-flame-500)" }}
          >
            {error}
          </p>
        ) : null}

        <div className="flex items-end gap-2 border-t p-3" style={{ borderColor: "var(--border)" }}>
          <textarea
            ref={input}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // Enter gönderir, Shift+Enter satır atlar — sohbet kutusu alışkanlığı.
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
            placeholder="Almanca yaz… (takılırsan Türkçe de olur)"
            className="max-h-32 flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none surface-2"
            style={{ color: "var(--text)" }}
          />
          <button
            type="button"
            onClick={() => void send(draft)}
            disabled={busy || !draft.trim()}
            className="btn btn-primary shrink-0 px-4 py-2.5 text-sm disabled:opacity-40"
          >
            {busy ? "…" : "Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Modelin cevabı — düzeltme satırları gövdeden ayrı gösterilir. */
function Reply({ text, pending }: { text: string; pending: boolean }) {
  const lines = text.split("\n");
  const corrections = lines.filter((l) => l.trim().startsWith("✏️"));
  const body = lines.filter((l) => !l.trim().startsWith("✏️")).join("\n").trim();

  return (
    <div className="max-w-[85%] space-y-2">
      {body ? (
        <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm surface-2">
          <span className="whitespace-pre-wrap">{body}</span>
          <SpeakButton text={body} size="sm" className="ml-1 align-middle" />
        </div>
      ) : pending ? (
        <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 surface-2">
          <span className="muted text-sm">yazıyor…</span>
        </div>
      ) : null}

      {corrections.map((line, i) => (
        <div
          key={i}
          className="rounded-xl px-3 py-2 text-xs"
          style={{
            background: "color-mix(in srgb, var(--color-mint-500) 12%, transparent)",
            color: "var(--text)",
          }}
        >
          {line.replace(/^\s*✏️\s*/, "")}
        </div>
      ))}
    </div>
  );
}

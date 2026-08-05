"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpeakButton, speakGerman, useSpeechAvailable } from "@/components/speak-button";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { AlertIcon, SparkIcon, SpeakerIcon } from "@/components/icons";
import { parseReply } from "@/lib/chat-format";
import { summarize } from "@/lib/chat-summary";

/**
 * Almanca konuşma partneri.
 *
 * Sohbetin asıl UX sorunu boş kutu: bir dil öğrencisi "ne diyeceğim?" diye
 * takıldığında konuşma orada biter. Bu yüzden yazmak son çare olacak biçimde
 * kurgulandı — her cevabın altında **dokunulabilir öneriler** var, mikrofonla
 * **konuşarak** cevap verilebiliyor, klavyeye düşülürse de umlaut tuşları
 * elin altında.
 *
 * Akış düz metin olarak gelir ve geldiği gibi eklenir; cevabın tamamını
 * beklemek konuşma hissini bozuyor.
 *
 * Modelden yapı (JSON) istemek yerine satır başındaki tek karakter kullanılıyor:
 * ✏️ düzeltme, 💬 önerilen cevap. Küçük modellerde şema hem kuralı kaçırtıyor
 * hem akışı zorlaştırıyor; işaret hem sağlam hem akarken ayrıştırılabiliyor.
 */

type Turn = { role: "user" | "assistant"; content: string };

/** İlk ekranda konuşmayı başlatan hazır cümleler. */
const STARTERS = [
  "Hallo! Wie geht es dir?",
  "Erzähl mir von deinem Tag.",
  "Was machst du gern am Wochenende?",
];

const UMLAUTS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];
const HANDSFREE_KEY = "wortspiel-chat-handsfree";

export function ChatPlayer({
  configured,
  level,
  focus = [],
}: {
  configured: boolean;
  level: string;
  /** Öğrencinin çalıştığı kelimeler — konuşma sonundaki özet bunları sayıyor. */
  focus?: { de: string; tr: string }[];
}) {
  const [showSummary, setShowSummary] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [handsFree, setHandsFree] = useState(false);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const recognition = useRef<Recognition | null>(null);
  /** Seslendirilmiş son cevap — akış sürerken tekrar tekrar okunmasın. */
  const spoken = useRef<number>(-1);
  /** Okuma bittiğinde çalışan geri çağrı eski değeri görmesin diye. */
  const handsFreeRef = useRef(false);
  const draftRef = useRef("");
  /** Hangi okumanın bittiğini ayırt eden jeton — cancel() eski onend'i tetikliyor. */
  const speechToken = useRef(0);
  /** listen() içinden çağrılır; send her turda değiştiği için ref üzerinden. */
  const sendRef = useRef<(text: string) => Promise<void>>(async () => {});

  // Eller serbest cihaz tercihidir (kulaklık var mı, ortam sessiz mi, mikrofon
  // uygun mu) — sunucuda değil cihazda saklanıyor, tema tercihiyle aynı mantık.
  useEffect(() => {
    try {
      const on = localStorage.getItem(HANDSFREE_KEY) === "1";
      setHandsFree(on);
      handsFreeRef.current = on;
    } catch {
      /* depolama kapalıysa kapalı başlar */
    }
  }, []);

  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  /**
   * Eller serbest anahtarı.
   *
   * Açılırken mikrofon izni **burada** isteniyor: bu bir kullanıcı dokunuşu,
   * yani tarayıcı istemi gösterebiliyor. Sonraki otomatik dinlemeler okuma
   * bitişinde tetikleniyor ve orada dokunuş yok — izin o an istenirse
   * tarayıcı sessizce reddedebilir.
   */
  async function toggleHandsFree() {
    if (handsFree) {
      setHandsFree(false);
      handsFreeRef.current = false;
      speechToken.current++;
      window.speechSynthesis?.cancel();
      recognition.current?.abort();
      setListening(false);
      try {
        localStorage.setItem(HANDSFREE_KEY, "0");
      } catch {
        /* tercih hatırlanmaz, işlev etkilenmez */
      }
      return;
    }

    setError(null);
    if (asrAvailable) {
      const permission = await requestMicrophone();
      if (permission === "denied") {
        setError("Eller serbest için mikrofon izni gerekiyor. Ayarlardan izin verip tekrar dene.");
        return;
      }
    }
    setHandsFree(true);
    handsFreeRef.current = true;
    try {
      localStorage.setItem(HANDSFREE_KEY, "1");
    } catch {
      /* tercih hatırlanmaz, işlev etkilenmez */
    }
  }

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, busy]);

  useEffect(() => () => recognition.current?.abort(), []);

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
      }
    },
    [turns, busy],
  );

  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  // Cevap tamamlanınca bir kez seslendir — akış sürerken değil, yoksa
  // her parçada baştan okumaya başlardı.
  /**
   * Sesle cevap.
   *
   * Elle başlatıldığında tanınan metin taslağa düşer ve gönderilmeden önce
   * düzeltilebilir. Eller serbest döngüsünde ise doğrudan gönderilir: her turda
   * "Gönder"e uzanmak zaten döngünün amacını ortadan kaldırır, yanlış tanınan
   * bir cümleyi de konuşmanın kendisi onarır — insan sohbeti de böyle yürür.
   */
  const listen = useCallback(async (autoSend = false) => {
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    setError(null);
    const permission = await requestMicrophone();
    if (permission === "denied") {
      setError("Mikrofon izni verilmedi. Uygulama ayarlarından izin verebilirsin.");
      return;
    }

    const rec = new Ctor();
    recognition.current = rec;
    rec.lang = "de-DE";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (event) => {
      const heard = (event.results[0]?.[0]?.transcript ?? "").trim();
      setListening(false);
      if (!heard) return;
      if (autoSend) {
        void sendRef.current(heard);
        return;
      }
      setDraft((d) => (d ? `${d} ${heard}` : heard));
      input.current?.focus();
    };
    rec.onerror = (e) => {
      setListening(false);
      setError(
        e.error === "no-speech"
          ? "Ses duyulmadı. Mikrofona yaklaşıp tekrar dene."
          : e.error === "network"
            ? "Tanıma için internet gerekiyor."
            : "Mikrofon kullanılamadı.",
      );
    };
    rec.onend = () => setListening(false);

    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }, []);

  useEffect(() => {
    if (busy || !handsFree) return;
    const last = turns.length - 1;
    if (last < 0 || turns[last].role !== "assistant") return;
    if (spoken.current === last) return;
    const { body } = parseReply(turns[last].content);
    if (!body) return;
    spoken.current = last;

    const token = ++speechToken.current;
    speakGerman(body, () => {
      // Okuma bitti → mikrofon kendiliğinden açılır. Döngüyü kapatan üç durum:
      // anahtar kapatıldı, araya yeni bir okuma girdi, ya da kullanıcı yazmaya
      // başladı (o zaman sözü ondadır, mikrofon karışmaz).
      if (speechToken.current !== token) return;
      if (!handsFreeRef.current) return;
      if (draftRef.current.trim()) return;
      void listen(true);
    });
  }, [turns, busy, handsFree, listen]);

  function insertUmlaut(ch: string) {
    const el = input.current;
    if (!el) {
      setDraft((d) => d + ch);
      return;
    }
    const start = el.selectionStart ?? draft.length;
    const end = el.selectionEnd ?? start;
    const next = draft.slice(0, start) + ch + draft.slice(end);
    setDraft(next);
    // İmleci eklenen harften sonraya al, yoksa her tuşta başa dönüyor.
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  }

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

  const lastTurn = turns[turns.length - 1];
  const openSuggestions =
    !busy && lastTurn?.role === "assistant" ? parseReply(lastTurn.content).suggestions : [];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="card flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Tek anahtar, tam döngü: okur → mikrofonu açar → cevabı gönderir. */}
        {ttsAvailable || asrAvailable ? (
          <div
            className="flex shrink-0 items-center justify-end border-b px-3 py-1.5"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => void toggleHandsFree()}
              aria-pressed={handsFree}
              className="btn btn-ghost flex items-center gap-1.5 px-2 py-1 text-xs"
              style={{ color: handsFree ? "var(--color-brand-500)" : undefined }}
            >
              <SpeakerIcon size={13} />
              {handsFree ? "Eller serbest: açık" : "Eller serbest"}
            </button>
          </div>
        ) : null}

        {/* Özet ancak konuşulacak bir şey olduğunda anlamlı. */}
        {turns.some((t) => t.role === "user") ? (
          <div
            className="flex shrink-0 items-center justify-end border-b px-3 py-1.5"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => setShowSummary((v) => !v)}
              aria-pressed={showSummary}
              className="btn btn-ghost px-2 py-1 text-xs"
              style={{ color: showSummary ? "var(--color-brand-500)" : undefined }}
            >
              {showSummary ? "Özeti kapat" : "Konuşmayı özetle"}
            </button>
          </div>
        ) : null}

        {showSummary ? <Summary turns={turns} focus={focus} /> : null}

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {turns.length === 0 ? (
            <div className="py-6 text-center">
              <div className="brand-gradient mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-white">
                <SparkIcon size={22} />
              </div>
              <p className="text-sm font-semibold">Almanca sohbet edelim</p>
              <p className="muted mx-auto mt-1 max-w-sm text-xs">
                {level} seviyesinde konuşuyorum. Aşağıdakilerden birine dokun, mikrofonla
                konuş ya da yaz. Üstteki “Eller serbest” anahtarını açarsan cevabımı
                okuduktan sonra mikrofon kendiliğinden açılır — telefona hiç dokunmazsın.
              </p>
              <div className="mt-4 flex flex-col items-center gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="option w-full max-w-xs px-3 py-2.5 text-sm"
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

        {/* Önerilen cevaplar — boş kutuya bakmak yerine dokunup devam et. */}
        {openSuggestions.length ? (
          <div
            className="shrink-0 border-t px-3 py-2.5"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="muted mb-1.5 text-[11px] font-semibold uppercase tracking-wide">
              Şunu diyebilirsin
            </p>
            <div className="flex flex-wrap gap-2">
              {openSuggestions.map((s, i) => (
                <motion.button
                  key={`${s}-${i}`}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => void send(s)}
                  className="option px-3 py-2 text-left text-sm"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
        ) : null}

        {error ? (
          <p
            className="shrink-0 border-t px-4 py-2 text-center text-xs"
            style={{ borderColor: "var(--border)", color: "var(--color-flame-500)" }}
          >
            {error}
          </p>
        ) : null}

        {/* Umlaut tuşları: klavyede zor, cümleyi bozan en sık sebep. */}
        {draft ? (
          <div
            className="flex shrink-0 flex-wrap gap-1 border-t px-3 pt-2"
            style={{ borderColor: "var(--border)" }}
          >
            {UMLAUTS.map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => insertUmlaut(ch)}
                className="chip px-2.5 py-1 text-sm"
              >
                {ch}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className="flex shrink-0 items-end gap-2 border-t p-3"
          style={{ borderColor: "var(--border)" }}
        >
          {asrAvailable ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => (listening ? recognition.current?.stop() : void listen(false))}
              disabled={busy}
              aria-label={listening ? "Kaydı bitir" : "Konuşarak yaz"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40"
              style={{
                background: listening ? "var(--color-rose-500)" : "var(--color-brand-500)",
              }}
            >
              <motion.span
                animate={listening ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
              >
                <SpeakerIcon size={18} />
              </motion.span>
            </motion.button>
          ) : null}

          <textarea
            ref={input}
            rows={1}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              // Yazdıkça büyüsün, uzun cümlede tek satıra sıkışmasın.
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
            placeholder={
              listening
                ? "Dinliyorum… konuşunca gönderilir"
                : handsFree
                  ? "Eller serbest — cevabı bekleyip konuş"
                  : "Yaz ya da mikrofona dokun"
            }
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
  const { body, corrections } = parseReply(text);

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
          {line}
        </div>
      ))}
    </div>
  );
}

/**
 * Konuşma özeti.
 *
 * Rakip uygulamaların ortak eksiği buydu: konuşma bitiyor ve öğrenci ne
 * olduğunu bilmeden kapatıyor. Düzeltmeler akış içinde tek tek geçiyor ama
 * okunup unutuluyorlar; toplu görüldüğünde örüntü ortaya çıkıyor.
 *
 * Gösterilen her şey sayılan veri: kaç tur konuşuldu, model hangi düzeltmeleri
 * yazdı, çalışılan kelimelerden hangileri fiilen kullanıldı. Puan ya da
 * "akıcılığın arttı" gibi bir değerlendirme yok — onlar doğrulanamaz ve
 * telaffuz notunda kaçındığımız şeyin aynısı olurdu.
 */
function Summary({
  turns,
  focus,
}: {
  turns: Turn[];
  focus: { de: string; tr: string }[];
}) {
  const s = summarize(turns, focus);

  return (
    <div
      className="shrink-0 border-b px-4 py-3.5"
      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
    >
      <p className="text-sm font-bold">Bu konuşmada</p>
      <p className="muted mt-1 text-xs">
        {s.turns} kez söz aldın · {s.corrections.length} düzeltme
      </p>

      {s.corrections.length ? (
        <div className="mt-3">
          <p className="muted text-xs font-semibold">Düzeltmeler</p>
          <ul className="mt-1 space-y-1">
            {s.corrections.map((line, i) => (
              <li key={i} className="text-xs leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 text-xs" style={{ color: "var(--color-mint-500)" }}>
          Hiç düzeltme gerekmedi.
        </p>
      )}

      {s.usedFocus.length ? (
        <div className="mt-3">
          <p className="muted text-xs font-semibold">Çalıştığın kelimelerden kullandıkların</p>
          <p className="mt-1 text-xs">{s.usedFocus.join(", ")}</p>
        </div>
      ) : null}

      {/* Bir sonraki konuşmanın somut hedefi — "daha çok pratik yap" gibi
          boş bir öğütten iyi. Uzun liste bunaltıyor, ilk beşi yeter. */}
      {s.unusedFocus.length ? (
        <div className="mt-3">
          <p className="muted text-xs font-semibold">Sıradaki konuşmada dene</p>
          <p className="mt-1 text-xs">{s.unusedFocus.slice(0, 5).join(", ")}</p>
        </div>
      ) : null}
    </div>
  );
}

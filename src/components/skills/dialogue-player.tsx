"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SpeakingDialogueExercise } from "@/lib/skills/types";
import { DIALOGUE_MIN_TURNS, dialogueDone, matchReply, targetsUsed, usedTargets, type DialogueReply, type DialogueTurn } from "@/lib/dialogue";
import { parseReply } from "@/lib/chat-format";
import { askCoach } from "@/lib/coach-client";
import { speakGerman, useSpeechAvailable } from "@/components/speak-button";
import { AlertIcon, CheckIcon, MicIcon, SpeakerIcon } from "@/components/icons";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";

/**
 * Karşılıklı konuşma oynatıcısı.
 *
 * Uygulama sorar, öğrenci yüksek sesle cevap verir, söylediğine göre dal
 * seçilir. "Anlama" bir dil modelinden değil, temanın önceden yazılmış
 * dallarından gelir (bkz. lib/dialogue.ts) — ve bu sınır kullanıcıdan
 * saklanmaz: anlaşılmayan cevapta garson "anlamadım" der ve somut bir örnek
 * gösterir, konuşma kilitlenmez.
 *
 * Sohbet balonlar hâlinde birikir; öğrenci ne dediğini ve ne duyulduğunu
 * geriye dönüp görebilir.
 */

type Bubble =
  | { who: "app"; de: string; tr: string }
  | { who: "me"; heard: string; understood: boolean };

export function DialoguePlayer({ exercise }: { exercise: SpeakingDialogueExercise }) {
  const turns = exercise.dialogue;
  const byId = new Map(turns.map((t) => [t.id, t]));

  const [turnId, setTurnId] = useState(turns[0]?.id ?? "");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [path, setPath] = useState<DialogueReply[]>([]);
  const [phase, setPhase] = useState<"idle" | "asking" | "listening" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [coachHint, setCoachHint] = useState("");
  const [coaching, setCoaching] = useState(false);
  const [understoodCount, setUnderstoodCount] = useState(0);
  const [finished, setFinished] = useState(false);
  /*
    Açık diyalog (WP-23): tema varsa ve sağlayıcı açıksa muhatap dil modeli —
    senaryoda olmayan cevap da anlaşılır. Servis yoksa ya da koparsa senaryo
    devralır; UI aynı. Kalıp kullanımı yerel eşleştirmeyle (targetsUsed).
  */
  const [mode, setMode] = useState<"scenario" | "llm">("scenario");
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  useEffect(() => {
    if (!exercise.theme) return;
    let alive = true;
    fetch("/api/roleplay", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { configured?: boolean } | null) => {
        if (alive && d?.configured) setMode("llm");
      })
      .catch(() => {
        /* senaryo kalır */
      });
    return () => {
      alive = false;
    };
  }, [exercise.theme]);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const recognition = useRef<Recognition | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  /** Geç gelen koç cevabı sonraki tura taşınmasın. */
  const coachToken = useRef(0);
  const turn: DialogueTurn | undefined = byId.get(turnId);
  /*
    Payda: senaryoda tur sayısı; açık diyalogda tamamlanma eşiği (4 tur) —
    model hedefe 4 turda ulaşıp kapatınca "6 görevden 4" demek yanlış olurdu.
  */
  const total = mode === "llm" ? DIALOGUE_MIN_TURNS : turns.length;
  const { finish, state, reset } = useSkillFinish(exercise, total);

  useEffect(() => () => recognition.current?.abort(), []);

  // Yeni tur açılınca sorusu balona düşer ve sesli okunur.
  useEffect(() => {
    if (!turn) return;
    // Geliştirmede StrictMode etkiyi iki kez çalıştırıyor; aynı soru iki kez düşmesin.
    setBubbles((prev) => {
      const last = prev[prev.length - 1];
      return last && last.who === "app" && last.de === turn.ask ? prev : [...prev, { who: "app", de: turn.ask, tr: turn.askTr }];
    });
    setHistory((prev) => (prev.length ? prev : [{ role: "assistant", content: turn.ask }]));
    const t = setTimeout(() => speakGerman(turn.ask), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnId]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [bubbles]);

  /** Bekleyen koç cevabını geçersiz kılar; yoksa eski ipucu sonraki turda kalır. */
  const clearCoach = useCallback(() => {
    coachToken.current++;
    setCoachHint("");
    setCoaching(false);
  }, []);

  /** Cevabı işler: dal tutarsa ilerle, tutmazsa aynı turda kal ve örnek göster. */
  /** Açık diyalog turu: modele gönder, cevabı balona düş, hedef eşiğinde kapat. */
  const askModel = useCallback(
    async (heard: string) => {
      if (busy) return;
      setBusy(true);
      setHint(null);
      setSuggestions([]);
      const next = [...history, { role: "user" as const, content: heard }];
      setHistory(next);
      setBubbles((prev) => [...prev, { who: "me", heard, understood: true }]);
      const said = next.filter((m) => m.role === "user").map((m) => m.content);
      try {
        const res = await fetch("/api/roleplay", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ exerciseId: exercise.id, messages: next }),
        });
        if (!res.ok || !res.body) throw new Error(`roleplay ${res.status}`);
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
        }
        const parsed = parseReply(acc);
        const body = parsed.body.trim() || acc.trim();
        setHistory([...next, { role: "assistant", content: body }]);
        setBubbles((prev) => [...prev, { who: "app", de: body, tr: "" }]);
        setSuggestions(parsed.suggestions.slice(0, 2));
        speakGerman(body);
        setUnderstoodCount((n) => n + 1);
        if (dialogueDone(said.length, targetsUsed(exercise.targets, said).length)) {
          setPhase("done");
          setFinished(true);
        } else setPhase("idle");
      } catch (err) {
        console.error("[dialogue] model", err);
        // Servis koptu: senaryo devralır, konuşma baştan — UI aynı kalır.
        setMode("scenario");
        setError("Konuşma servisi ulaşılamıyor; senaryolu konuşmaya geçildi.");
        setBubbles([]);
        setHistory([]);
        setPath([]);
        setUnderstoodCount(0);
        setTurnId("");
        setTimeout(() => setTurnId(turns[0]?.id ?? ""), 0);
        setPhase("idle");
      }
      setBusy(false);
    },
    // exercise sabit; history/busy güncel değerleriyle yeniden kurulur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [busy, history, exercise.id],
  );

  const handleTranscript = useCallback(
    (heard: string) => {
      if (!turn) return;
      if (mode === "llm") {
        void askModel(heard);
        return;
      }
      const match = matchReply(heard, turn.replies);
      setBubbles((prev) => [...prev, { who: "me", heard, understood: match !== null }]);

      if (!match) {
        setBubbles((prev) => [
          ...prev,
          { who: "app", de: turn.fallback.say, tr: turn.fallback.sayTr },
        ]);
        setHint(turn.fallback.example);
        speakGerman(turn.fallback.say);
        setPhase("idle");

        // Senaryo dalları anahtar kök arıyor; aynı anlamı başka türlü kuran
        // tamamen geçerli bir cevap da tutmuyor. Sabit örnek cümle o durumda
        // yanlış geri bildirim oluyor — doğru söyleyip "anlaşılmadı" duymak
        // öğreticinin yapabileceği en can sıkıcı şey. Koç burada ikisini
        // ayırt ediyor: cevap geçerliyse onaylıyor, değilse ne diyeceğini
        // söylüyor. Yalnızca dal tutmadığında çağrılıyor, yani limit doğru
        // ilerleyen konuşmalara harcanmıyor.
        const token = ++coachToken.current;
        setCoaching(true);
        void askCoach({
          kind: "dialogue",
          ask: turn.ask,
          cue: turn.cue,
          heard,
          expected: turn.replies.flatMap((r) => r.match).slice(0, 8),
        }).then((text) => {
          if (coachToken.current !== token) return;
          setCoachHint(text);
          setCoaching(false);
        });
        return;
      }

      clearCoach();
      setHint(null);
      setUnderstoodCount((n) => n + 1);
      setPath((prev) => [...prev, match.reply]);
      setBubbles((prev) => [
        ...prev,
        { who: "app", de: match.reply.say, tr: match.reply.sayTr },
      ]);
      speakGerman(match.reply.say);

      const next = match.reply.next;
      if (next && byId.has(next)) {
        // Cevabın okunmasını bekle, sonra sıradaki soruyu aç.
        setPhase("idle");
        setTimeout(() => setTurnId(next), 900);
      } else {
        setPhase("done");
        setFinished(true);
      }
    },
    // byId her render'da yeniden kurulsa da içeriği sabit; turn kimliği yeterli.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn, mode, askModel],
  );

  // Konuşma bitince sonucu bir kez gönder.
  useEffect(() => {
    if (finished) void finish(Math.min(understoodCount, total));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const listen = useCallback(async () => {
    const Ctor = recognitionCtor();
    if (!Ctor || !turn) return;
    setError(null);
    setPhase("asking");
    const permission = await requestMicrophone();
    if (permission === "denied") {
      setPhase("idle");
      setError(
        "Mikrofon izni verilmedi. Uygulama ayarlarından izin verip tekrar dene — " +
          "izin vermeden cevapları yazılı seçerek de ilerleyebilirsin.",
      );
      return;
    }

    const rec = new Ctor();
    recognition.current = rec;
    rec.lang = "de-DE";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 5;

    rec.onresult = (event) => {
      // Diyalogda en iyi aday yeter: niyet eşleştirmesi zaten köklere bakıyor,
      // telaffuz turlarındaki gibi n-best taramasına gerek yok.
      const best = event.results[0]?.[0]?.transcript ?? "";
      setPhase("idle");
      handleTranscript(best);
    };
    rec.onerror = (e) => {
      setPhase("idle");
      setError(
        e.error === "no-speech"
          ? "Ses duyulmadı. Mikrofona yaklaşıp tekrar dene."
          : e.error === "network"
            ? "Tanıma için internet gerekiyor; bağlantın kesik görünüyor."
            : e.error === "not-allowed" || e.error === "service-not-allowed"
              ? "Tanıma servisi mikrofona erişemedi. Mikrofon iznini kontrol et."
              : "Tanıma başlatılamadı. Tekrar dene.",
      );
    };
    rec.onend = () => setPhase((p) => (p === "listening" ? "idle" : p));

    setPhase("listening");
    try {
      rec.start();
    } catch {
      setPhase("idle");
      setError("Mikrofon başlatılamadı.");
    }
  }, [turn, handleTranscript]);

  function restart() {
    setTurnId(turns[0]?.id ?? "");
    setBubbles([]);
    setHistory([]);
    setSuggestions([]);
    setDraft("");
    setPath([]);
    setUnderstoodCount(0);
    setHint(null);
    clearCoach();
    setError(null);
    setPhase("idle");
    setFinished(false);
    reset();
  }

  const used = new Set(
    mode === "llm" ? targetsUsed(exercise.targets, history.filter((m) => m.role === "user").map((m) => m.content)) : usedTargets(path),
  );
  function sendTyped() {
    const t = draft.trim();
    if (!t || phase === "listening" || busy) return;
    setDraft("");
    handleTranscript(t);
  }

  return (
    <PlayerShell exercise={exercise}>
      <p className="muted mb-4 text-sm">{exercise.intro}</p>

      {!asrAvailable ? (
        <div
          className="mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{
            background: "color-mix(in srgb, var(--color-flame) 12%, transparent)",
            color: "var(--color-flame)",
          }}
        >
          <AlertIcon size={16} className="mt-0.5 shrink-0" />
          <span>
            Bu tarayıcı konuşma tanımayı desteklemiyor (Firefox'ta yok). Konuşmayı Chrome, Edge
            ya da Safari'de deneyebilirsin.
          </span>
        </div>
      ) : null}

      {/* Sohbet akışı */}
      <section className="card p-4">
        <div className="flex max-h-[26rem] flex-col gap-2.5 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {bubbles.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${b.who === "me" ? "justify-end" : "justify-start"}`}
              >
                {b.who === "app" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 surface-2">
                    <p className="flex items-start gap-1.5 text-sm font-semibold">
                      <span>{b.de}</span>
                      <button
                        type="button"
                        onClick={() => speakGerman(b.de)}
                        aria-label="Tekrar dinle"
                        className="btn btn-ghost h-6 w-6 shrink-0"
                      >
                        <SpeakerIcon size={12} />
                      </button>
                    </p>
                    {b.tr ? <p className="muted mt-0.5 text-xs">{b.tr}</p> : null}
                  </div>
                ) : (
                  <div
                    className="max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm"
                    style={{
                      background: b.understood
                        ? "color-mix(in srgb, var(--color-brand) 16%, transparent)"
                        : "color-mix(in srgb, var(--color-rose) 14%, transparent)",
                    }}
                  >
                    {b.heard}
                    {/* Anlaşılmayan cevap ayrı renkte: öğrenci hangi cümlesinin
                        tutmadığını geriye dönüp görebilmeli. */}
                    {!b.understood ? (
                      <span className="muted ml-1.5 text-[11px]">anlaşılmadı</span>
                    ) : null}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottom} />
        </div>

        {!finished && turn ? (
          <>
            <div className="mt-4 flex flex-col items-center gap-2">
              {asrAvailable ? (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => (phase === "listening" ? recognition.current?.stop() : void listen())}
                  disabled={phase === "asking"}
                  aria-label={phase === "listening" ? "Kaydı bitir" : "Cevabını söyle"}
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg disabled:opacity-60"
                  style={{
                    background:
                      phase === "listening" ? "var(--color-rose)" : "var(--color-brand)",
                  }}
                >
                  <motion.span
                    animate={phase === "listening" ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                    transition={{ repeat: phase === "listening" ? Infinity : 0, duration: 1.1 }}
                  >
                    <MicIcon size={26} />
                  </motion.span>
                </motion.button>
              ) : null}
              <span className="muted text-center text-xs">
                {phase === "asking"
                  ? "Mikrofon izni bekleniyor…"
                  : phase === "listening"
                    ? "Dinliyorum… söyleyince dokun"
                    : busy
                      ? "Cevap geliyor…"
                      : mode === "llm" && bubbles.length > 1
                        ? "Söylediğine göre konuşma ilerler — serbestçe cevap ver."
                        : turn.cue}
              </span>
              {mode === "llm" && !busy ? (
                <span className="muted text-[11px]">açık diyalog · senaryo yedekte</span>
              ) : null}
            </div>

            {/* Model önerileri (WP-23): dokununca söylenmiş sayılır. */}
            {suggestions.length && !busy ? (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => handleTranscript(s)} className="chip px-2.5 py-1 text-xs" lang="de">
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            {/* Yazarak cevap: tanıyıcısı olmayan tarayıcı ve sessiz ortam için. */}
            <div className="mt-3">
              {!typing && asrAvailable ? (
                <button type="button" onClick={() => setTyping(true)} className="btn btn-ghost mx-auto block px-3 py-1 text-xs">
                  Yazarak cevapla
                </button>
              ) : (
                <div className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendTyped();
                      }
                    }}
                    rows={1}
                    lang="de"
                    placeholder="Almanca yaz…"
                    disabled={busy}
                    className="input max-h-24 flex-1 resize-none py-2 text-sm"
                  />
                  <button type="button" onClick={sendTyped} disabled={busy || !draft.trim()} className="btn btn-primary px-3.5 py-2.5 text-sm">
                    Gönder
                  </button>
                </div>
              )}
            </div>

            {/* Anlaşılmadıysa somut bir çıkış yolu verilir; konuşma kilitlenmez. */}
            {hint ? (
              <div className="mt-3 rounded-xl px-3 py-2.5 text-center text-sm surface-2">
                <span className="muted text-xs">Şöyle diyebilirsin: </span>
                <strong className="brand-text">{hint}</strong>
                {ttsAvailable ? (
                  <button
                    type="button"
                    onClick={() => speakGerman(hint)}
                    className="btn btn-ghost ml-1 h-6 px-2 text-xs"
                  >
                    Dinle
                  </button>
                ) : null}
                {/* Sabit örnek hemen çıkar, koç sonradan altına eklenir:
                    konuşma modelin cevabını beklemez. Koç gelmezse örnek
                    tek başına zaten çalışan bir çıkış yolu. */}
                {coaching ? (
                  <p className="muted mt-2 text-xs">Cevabına bakılıyor…</p>
                ) : coachHint ? (
                  <p className="mt-2 text-left text-sm">{coachHint}</p>
                ) : null}
              </div>
            ) : null}

            {error ? (
              <p className="mt-3 text-center text-sm" style={{ color: "var(--color-flame)" }}>
                {error}
              </p>
            ) : null}
          </>
        ) : null}
      </section>

      {/* Pekiştirme: hangi kalıplara gerçekten geldin, hangilerine hiç uğramadın. */}
      <section className="card mt-4 p-4">
        <h2 className="muted mb-2 text-xs font-bold uppercase tracking-wide">
          Bu temanın kalıpları
        </h2>
        <ul className="space-y-1.5">
          {exercise.targets.map((t) => {
            const done = used.has(t.de);
            return (
              <li key={t.de} className="flex items-baseline gap-2 text-sm">
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: done ? "var(--color-mint)" : "var(--surface-2)",
                    color: "white",
                  }}
                >
                  {done ? <CheckIcon size={10} /> : null}
                </span>
                <span className={done ? "font-semibold" : "muted"}>{t.de}</span>
                <span className="muted ml-auto min-w-0 text-right text-xs">
                  <span className="block truncate">{t.tr}</span>
                  {t.en ? (
                    <span className="block truncate opacity-70" lang="en">
                      {t.en}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
        {finished ? (
          <p className="muted mt-3 text-xs">
            İşaretsiz kalanlar bu turda hiç geçmedi — konuşmayı yeniden başlatıp farklı
            cevaplar vererek onlara da uğrayabilirsin.
          </p>
        ) : null}
      </section>

      <ResultCard
        correct={Math.min(understoodCount, total)}
        total={total}
        state={state}
        noun="görev"
        onRetry={restart}
      />
    </PlayerShell>
  );
}


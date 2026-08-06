"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SpeakButton, prefetchGerman, speakGerman, useSpeechAvailable } from "@/components/speak-button";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { AlertIcon, CheckIcon, SparkIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { parseReply } from "@/lib/chat-format";
import { fx } from "@/lib/fx";
import type { Lesson } from "@/lib/lessons/types";

/**
 * Ders oynatıcısı — kural, alıştırma, rol yapma, özet.
 *
 * Akışın sırası tasarımın kendisi. Kuralı okumadan alıştırmaya, alıştırmayı
 * geçmeden konuşmaya girilmiyor; çünkü serbest sohbetin en pahalı sorunu
 * öğrencinin "ne diyeceğim?" diye kalmasıydı ve bunun sebebi konuşmaya
 * hazırlıksız girmekti. Burada konuşmaya gelindiğinde elde bir kural, üç örnek
 * ve az önce çözülmüş sorular var.
 *
 * Rol yapma "yeterince konuşuldu"da değil, kural kullanıldığında bitiyor;
 * `minTurns` yalnızca alt sınır.
 */

type Phase = "rule" | "checks" | "roleplay" | "summary";
type Turn = { role: "user" | "assistant"; content: string };

const HANDSFREE_KEY = "wortspiel-lesson-handsfree";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("rule");

  // Alıştırma durumu
  const [checkIndex, setCheckIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Rol yapma durumu
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [handsFree, setHandsFree] = useState(true);
  /** Yazarak cevaplama — varsayılan değil, takılınca açılan çıkış yolu. */
  const [typing, setTyping] = useState(false);

  const [saved, setSaved] = useState<{ passed: boolean; nextDays: number } | null>(null);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const recognition = useRef<Recognition | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const handsFreeRef = useRef(false);
  const draftRef = useRef("");
  const speechToken = useRef(0);
  const sendRef = useRef<(text: string) => void>(() => {});

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);
  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);
  useEffect(() => () => recognition.current?.abort(), []);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, phase]);

  /**
   * Dersin bütün seslerini baştan indirir.
   *
   * Ders kısa ve hangi cümlelerin okunacağı baştan belli: örnekler ve rol
   * yapmanın açılış repliği. Öğrenci kuralı okurken bunlar iniyor, böylece
   * hoparlöre basıldığında ya da rol yapma başladığında ağa hiç çıkılmıyor.
   */
  useEffect(() => {
    for (const ex of lesson.examples) prefetchGerman(ex.de);
    prefetchGerman(lesson.roleplay.opening);
  }, [lesson]);

  /**
   * Eller serbest döngü **açık** başlıyor.
   *
   * Rol yapma konuşma tabanlı olduğu için doğal akış şu: model konuşur,
   * bitince mikrofon kendiliğinden açılır, öğrenci cevap verir. Bunu isteğe
   * bağlı bir seçenek yapmak, varsayılan deneyimi yazışmaya geri döndürüyordu.
   * Kapatan kullanıcının tercihi hatırlanıyor; hiç dokunmayan için açık.
   */
  useEffect(() => {
    try {
      setHandsFree(localStorage.getItem(HANDSFREE_KEY) !== "0");
    } catch {
      setHandsFree(true);
    }
  }, []);

  /** Öğrencinin kaç kez söz aldığı — rol yapmanın alt sınırı buna bakıyor. */
  const userTurns = turns.filter((t) => t.role === "user").length;
  const roleplayDone = userTurns >= lesson.roleplay.minTurns;

  // ─────────────────────────── alıştırmalar ───────────────────────────

  const check = lesson.checks[checkIndex];

  function answer(option: string) {
    if (picked) return;
    setPicked(option);
    const isCorrect = option === check.answer;
    if (isCorrect) setCorrectCount((n) => n + 1);
    fx(isCorrect ? "correct" : "wrong", 900);
    // Doğru cevapta kendiliğinden ilerliyor: gerekçe kısa bir an görünüyor ve
    // geçiliyor. Yanlışta duruluyor — orada okunacak bir şey var ve öğrencinin
    // kendi hızında okuması gerekiyor. Her cevapta düğmeye bastırmak, doğru
    // bilen öğrenciye gereksiz bir adım yüklüyordu.
    if (isCorrect) setTimeout(() => advance(), 1400);
  }

  function advance() {
    setPicked(null);
    if (checkIndex + 1 < lesson.checks.length) setCheckIndex((i) => i + 1);
    else startRoleplay();
  }



  // ─────────────────────────── rol yapma ───────────────────────────

  function startRoleplay() {
    setPhase("roleplay");
    // Açılış repliği içerikte yazılı: konuşma boş ekranla başlamıyor ve model
    // ilk turu üretmek için beklenmiyor.
    setTurns([{ role: "assistant", content: lesson.roleplay.opening }]);
    if (ttsAvailable) speakGerman(lesson.roleplay.opening);
  }

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      setDraft("");
      setError(null);
      const next: Turn[] = [...turns, { role: "user", content: clean }];
      setTurns([...next, { role: "assistant", content: "" }]);
      setBusy(true);

      try {
        const res = await fetch("/api/roleplay", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lessonId: lesson.id, messages: next }),
        });
        if (!res.ok || !res.body) {
          setTurns(next);
          setError(
            res.status === 503
              ? "Konuşma servisi şu an kapalı. Dersin diğer bölümleri çalışıyor."
              : "Cevap alınamadı. Tekrar dener misin?",
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
        const { body } = parseReply(acc);
        if (ttsAvailable && body.trim()) {
          const token = ++speechToken.current;
          speakGerman(body, () => {
            // cancel() bekleyen okumanın bitişini de tetikliyor; bu okumanın
            // hâlâ güncel olup olmadığı jetonla ayırt ediliyor.
            if (speechToken.current !== token) return;
            if (!handsFreeRef.current) return;
            if (draftRef.current.trim()) return;
            void listen(true);
          });
        }
      } catch {
        setTurns(next);
        setError("İnternet bağlantısı kurulamadı.");
      } finally {
        setBusy(false);
      }
    },
    // `listen` aşağıda tanımlı; bağımlılığa alınırsa döngü oluşur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns, busy, lesson.id, ttsAvailable],
  );

  useEffect(() => {
    sendRef.current = (t: string) => void send(t);
  }, [send]);

  const listen = useCallback(async (autoSend = false) => {
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    const permission = await requestMicrophone();
    if (permission === "denied") {
      setError("Mikrofon izni verilmedi. Yazarak da devam edebilirsin.");
      return;
    }
    const rec = new Ctor();
    recognition.current = rec;
    rec.lang = lesson.course === "gsw-zh" ? "de-CH" : "de-DE";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const said = e.results[0]?.[0]?.transcript?.trim() ?? "";
      if (!said) return;
      if (autoSend) sendRef.current(said);
      else setDraft((d) => (d ? `${d} ${said}` : said));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }, [lesson.course]);

  function stopListening() {
    recognition.current?.stop();
    setListening(false);
  }

  async function toggleHandsFree() {
    const next = !handsFree;
    setHandsFree(next);
    try {
      localStorage.setItem(HANDSFREE_KEY, next ? "1" : "0");
    } catch {
      /* depolama kapalı */
    }
    // İzin kullanıcı hareketiyle isteniyor; yüklü PWA'da tanıyıcı bunu
    // kendiliğinden yapmıyor.
    if (next) await requestMicrophone();
  }

  // ─────────────────────────── bitiş ───────────────────────────

  async function finish() {
    setPhase("summary");
    try {
      const res = await fetch("/api/lesson", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          correct: correctCount,
          roleplayDone,
        }),
      });
      if (res.ok) setSaved((await res.json()) as { passed: boolean; nextDays: number });
    } catch {
      // Kayıt başarısızsa özet yine gösteriliyor: dersi yaptığın gerçeği
      // sunucuya ulaşamamış olmasından bağımsız.
    }
  }

  const corrections = turns
    .filter((t) => t.role === "assistant")
    .flatMap((t) => parseReply(t.content).corrections);

  const suggestions =
    !busy && turns.at(-1)?.role === "assistant"
      ? parseReply(turns.at(-1)!.content).suggestions
      : [];

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4">
      <Steps phase={phase} />

      <AnimatePresence mode="wait">
        {phase === "rule" ? (
          <motion.section
            key="rule"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card p-5"
          >
            <h2 className="text-lg font-bold">{lesson.title}</h2>
            <p className="muted mt-1 text-sm">{lesson.summary}</p>
            <p className="mt-4 text-sm leading-relaxed">{lesson.rule}</p>

            <div className="mt-4 space-y-2">
              {lesson.examples.map((ex) => (
                <div
                  key={ex.de}
                  className="rounded-xl px-3 py-2.5"
                  style={{ background: "var(--surface-2)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="brand-text text-sm font-bold">{ex.de}</span>
                    <SpeakButton text={ex.de} size="sm" />
                  </div>
                  <p className="muted mt-0.5 text-xs">{ex.tr}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPhase("checks")}
              className="btn btn-primary mt-5 w-full py-3 text-sm"
            >
              Anladım, alıştırmaya geç
            </button>
          </motion.section>
        ) : null}

        {phase === "checks" && check ? (
          <motion.section
            key={`check-${checkIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="muted text-xs font-semibold">
                {checkIndex + 1} / {lesson.checks.length}
              </p>
              {/* Sorunun ne ölçtüğünü söylemek öğrenciye ne yapacağını da
                  söylüyor: doldurmak, tanımak, hatayı bulmak ayrı işler. */}
              <span className="chip px-2 py-0.5 text-[11px] font-semibold">
                {check.kind === "fill"
                  ? "Boşluğu doldur"
                  : check.kind === "spot"
                    ? "Hatayı bul"
                    : "Doğruyu seç"}
              </span>
            </div>
            <p className="mt-2 text-base font-semibold">{check.prompt}</p>

            <div className="mt-4 grid gap-2">
              {check.options.map((opt) => {
                const isAnswer = opt === check.answer;
                const state = !picked
                  ? ""
                  : isAnswer
                    ? "option-correct"
                    : opt === picked
                      ? "option-wrong"
                      : "";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answer(opt)}
                    disabled={Boolean(picked)}
                    className={`option px-4 py-3 text-left text-sm ${state}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked ? (
              <>
                <p className="muted mt-3 text-sm leading-relaxed">{check.why}</p>
                {picked !== check.answer ? (
                  <button
                    type="button"
                    onClick={advance}
                    className="btn btn-primary mt-4 w-full py-3 text-sm"
                  >
                    {checkIndex + 1 < lesson.checks.length ? "Anladım, devam" : "Rol yapmaya geç"}
                  </button>
                ) : null}
              </>
            ) : null}
          </motion.section>
        ) : null}

        {phase === "roleplay" ? (
          <motion.section
            key="roleplay"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div
              className="shrink-0 border-b px-4 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm font-bold">{lesson.roleplay.partner}</p>
              <p className="muted mt-0.5 text-xs leading-relaxed">{lesson.roleplay.scene}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="muted text-xs tabular-nums">
                  {userTurns} / {lesson.roleplay.minTurns} tur
                </span>
                {ttsAvailable || asrAvailable ? (
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
                ) : null}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {turns.map((turn, i) => (
                <Bubble
                  key={i}
                  turn={turn}
                  pending={busy && i === turns.length - 1}
                  ttsAvailable={ttsAvailable}
                />
              ))}
              <div ref={bottom} />
            </div>

            {error ? (
              <p
                className="shrink-0 px-4 pb-2 text-xs"
                style={{ color: "var(--color-flame-500)" }}
              >
                {error}
              </p>
            ) : null}

            {suggestions.length ? (
              <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
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
            ) : null}

            {/* Konuşma tabanlı giriş.
                Burası önce bir yazışma kutusuydu ve dersin amacına aykırıydı:
                rol yapmanın işi konuşturmak, yazdırmak değil. Yazarak cevap
                veren öğrenci telaffuzunu hiç denemiyor, düşünme süresi
                gerçek konuşmadakinden uzun oluyor ve kurduğu cümleyi gözüyle
                kontrol ediyor — konuşurken hiçbiri olmuyor.

                Mikrofon tek ve büyük: ekrandaki asıl eylem o. Yazmak yalnızca
                tanıyıcı yoksa ya da kullanıcı açıkça isterse görünüyor. */}
            <div className="shrink-0 border-t p-4" style={{ borderColor: "var(--border)" }}>
              {asrAvailable ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => (listening ? stopListening() : void listen(true))}
                    disabled={busy}
                    aria-label={listening ? "Kaydı bitir" : "Konuşmaya başla"}
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg disabled:opacity-50"
                    style={{
                      background: listening
                        ? "var(--color-rose-500)"
                        : "var(--color-brand-500)",
                    }}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
                    >
                      <SpeakerIcon size={24} />
                    </motion.span>
                  </motion.button>
                  <p className="muted text-xs">
                    {busy
                      ? "Cevap geliyor…"
                      : listening
                        ? "Dinliyorum — bitince dokun"
                        : "Konuşmak için dokun"}
                  </p>
                  {/* Yazmak kapalı değil ama öne çıkmıyor: takılan öğrencinin
                      çıkışı olmalı, varsayılan yolu değil. */}
                  <button
                    type="button"
                    onClick={() => setTyping((v) => !v)}
                    className="btn btn-ghost px-3 py-1 text-xs"
                  >
                    {typing ? "Yazmayı kapat" : "Yazarak cevapla"}
                  </button>
                </div>
              ) : (
                <p className="muted mb-2 text-center text-xs">
                  Bu tarayıcı konuşma tanımayı desteklemiyor; yazarak devam et.
                </p>
              )}

              {typing || !asrAvailable ? (
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    ref={input}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(draft);
                      }
                    }}
                    rows={1}
                    placeholder="Almanca yaz…"
                    className="input max-h-28 flex-1 resize-none py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => void send(draft)}
                    disabled={busy || !draft.trim()}
                    className="btn btn-primary h-10 shrink-0 px-4 text-sm disabled:opacity-50"
                  >
                    Gönder
                  </button>
                </div>
              ) : null}
            </div>

            <div className="shrink-0 border-t p-3" style={{ borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={() => void finish()}
                className="btn btn-ghost w-full py-2.5 text-sm"
              >
                {roleplayDone ? "Dersi bitir" : "Şimdilik bırak"}
              </button>
            </div>
          </motion.section>
        ) : null}

        {phase === "summary" ? (
          <motion.section
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{
                  background: saved?.passed
                    ? "var(--color-mint-500)"
                    : "var(--color-flame-500)",
                }}
              >
                {saved?.passed ? <CheckIcon size={18} /> : <SparkIcon size={18} />}
              </span>
              <div>
                <h2 className="text-base font-bold">
                  {saved?.passed ? "Ders tamam" : "Ders yarım kaldı"}
                </h2>
                <p className="muted text-xs">{lesson.title}</p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Alıştırma" value={`${correctCount} / ${lesson.checks.length}`} />
              <Stat
                label="Konuşma"
                value={`${userTurns} tur`}
                tone={roleplayDone ? "ok" : "warn"}
              />
            </dl>

            {corrections.length ? (
              <div className="mt-4">
                <p className="muted text-xs font-semibold">Konuşmadaki düzeltmeler</p>
                <ul className="mt-1.5 space-y-1">
                  {corrections.map((c, i) => (
                    <li key={i} className="text-xs leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : turns.length > 1 ? (
              <p className="mt-4 text-xs" style={{ color: "var(--color-mint-500)" }}>
                Konuşmada hiç düzeltme gerekmedi.
              </p>
            ) : null}

            {!roleplayDone ? (
              <p className="muted mt-4 text-xs leading-relaxed">
                Dersin sayılması için rol yapmada en az {lesson.roleplay.minTurns} kez söz
                alman gerekiyor — kural ancak kullanılınca oturuyor.
              </p>
            ) : saved ? (
              <p className="muted mt-4 text-xs leading-relaxed">
                Bu kural {saved.nextDays} gün sonra tekrar karşına çıkacak.
              </p>
            ) : null}

            <div className="mt-5 flex gap-2">
              {!roleplayDone ? (
                <button
                  type="button"
                  onClick={() => setPhase("roleplay")}
                  className="btn btn-primary flex-1 py-3 text-sm"
                >
                  Konuşmaya dön
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => router.push("/lessons")}
                className={`btn flex-1 py-3 text-sm ${roleplayDone ? "btn-primary" : "btn-ghost"}`}
              >
                Derslere dön
              </button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Steps({ phase }: { phase: Phase }) {
  const steps: { id: Phase; label: string }[] = [
    { id: "rule", label: "Kural" },
    { id: "checks", label: "Alıştırma" },
    { id: "roleplay", label: "Rol yapma" },
    { id: "summary", label: "Özet" },
  ];
  const at = steps.findIndex((s) => s.id === phase);
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.id} className="flex flex-1 flex-col gap-1">
          <span
            className="h-1 rounded-full"
            style={{
              background: i <= at ? "var(--color-brand-500)" : "var(--border)",
            }}
          />
          <span
            className="text-[11px] font-semibold"
            style={{ color: i <= at ? "var(--color-brand-500)" : "var(--text-muted)" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "warn" }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: "var(--surface-2)" }}>
      <dt className="muted text-xs">{label}</dt>
      <dd
        className="mt-0.5 text-sm font-bold tabular-nums"
        style={{
          color:
            tone === "warn"
              ? "var(--color-flame-500)"
              : tone === "ok"
                ? "var(--color-mint-500)"
                : undefined,
        }}
      >
        {value}
      </dd>
    </div>
  );
}

/** Konuşma baloncuğu — düzeltme satırı gövdeden ayrı gösteriliyor. */
function Bubble({
  turn,
  pending,
  ttsAvailable,
}: {
  turn: Turn;
  pending: boolean;
  ttsAvailable: boolean;
}) {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white"
          style={{ background: "var(--color-brand-500)" }}
        >
          {turn.content}
        </p>
      </div>
    );
  }

  const { body, corrections } = parseReply(turn.content);
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm"
        style={{ background: "var(--surface-2)" }}
      >
        {body.trim() || (pending ? "…" : "")}
        {ttsAvailable && body.trim() ? (
          <SpeakButton text={body} size="sm" className="ml-1 align-middle" />
        ) : null}
      </div>
      {corrections.map((c, i) => (
        <p
          key={i}
          className="flex max-w-[85%] items-start gap-1.5 rounded-xl px-3 py-1.5 text-xs"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <XIcon size={13} className="mt-0.5 shrink-0" />
          <span>{c}</span>
        </p>
      ))}
    </div>
  );
}

/** Tanıyıcı yoksa kullanıcıya sebebini söylemek gerekiyor. */
function AsrNote({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
      style={{
        background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
        color: "var(--color-flame-500)",
      }}
    >
      <AlertIcon size={14} className="mt-0.5 shrink-0" />
      <span>Bu tarayıcı konuşma tanımayı desteklemiyor; yazarak devam edebilirsin.</span>
    </div>
  );
}

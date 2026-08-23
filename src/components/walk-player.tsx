"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { speakSegments, stopSpeaking, type SpeechSegment } from "@/components/speak-button";
import { useListen } from "@/components/use-listen";
import { isSpeechCorrect, judgeSpeech } from "@/lib/speech";
import { play, resetCombo } from "@/lib/sfx";
import { track } from "@/lib/track";
import { CheckIcon, MicIcon, XIcon } from "@/components/icons";
import type { Answer, Round, RoundWord, SessionPayload, SessionProgress } from "@/lib/types";

/**
 * Yürürken modu — ekransız kelime turu.
 *
 * Uygulamanın tamamı bir ekrana bakmayı gerektiriyordu. Oysa eller serbest
 * konuşma döngüsü derslerde zaten çalışıyordu: cevap sesli okunuyor, okuma
 * biter bitmez mikrofon kendiliğinden açılıyor, söylenen doğrudan gidiyor.
 * Aynı döngü kelime turuna taşındığında ortaya bambaşka bir kullanım anı
 * çıkıyor — yürürken, bulaşık yıkarken, otobüste.
 *
 * Yön bilerek ÜRETİM: Türkçe duyuluyor, Almanca söyleniyor. Ekranda şık
 * işaretlemek tanımadır; ağızdan çıkarmak ise dilin asıl kullanıldığı iş ve
 * ekrana bakmadan yapılabilecek tek alıştırma türü.
 *
 * Tur, ekrandaki turun TA KENDİSİ: aynı `/api/session` kuyruğu okunuyor ve
 * cevaplar aynı uca gidiyor. Yani ekranda başlayıp kulakla devam etmek (ya da
 * tersi) mümkün; SRS, günlük hedef, seri ve rozetler hiçbir şeyin farkında
 * olmuyor. Ayrı bir "sesli mod ilerlemesi" kurmak, aynı emeği ikinci bir
 * yerde saymak olurdu.
 *
 * Cevaplar `speak` adıyla kaydediliyor. Yazma oyununun hanesine yazmak
 * kolaydı ama profil ekranındaki oyun başarısı tablosunu bozardı: ikisi
 * farklı beceri.
 */

type Status =
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "empty"
  | "error"
  | "unsupported"
  | "denied";

/** Ekranda ne olduğunu söyleyen tek satır — bakan biri için. */
type Phase = "speaking" | "listening" | "judging";

/**
 * Duyulmayan cevabın karşılığı.
 *
 * Sessizlik YANLIŞ sayılmıyor. Sokakta, otobüste ya da cepteki telefonda
 * mikrofonun bir turu kaçırması olağan; onu hata yazmak tekrar planını
 * bozardı — kelime gerçekten unutulduğu için değil, gürültü yüzünden öne
 * çekilirdi. Duyulmayan tur cevapsız geçiliyor ve doğru karşılık okunuyor.
 */
const UNHEARD_IS_NOT_WRONG = true;

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function withArtikel(w: RoundWord): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/** Turdaki kelimeler — eşleştirme turu beş kelime taşıyor, gerisi bir. */
function wordsOf(round: Round): RoundWord[] {
  return round.game === "match" ? round.words : [round.word];
}

export function WalkPlayer({ onExit }: { onExit: () => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  const [prompt, setPrompt] = useState<{ tr: string; de: string } | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unheard" | null>(null);
  const [tally, setTally] = useState({ correct: 0, total: 0 });

  const { listen, cancel } = useListen();
  /** Çalışan döngünün jetonu — duraklat/çık geç gelen adımları geçersiz kılar. */
  const run = useRef(0);
  const startedAt = useRef(Date.now());
  const pending = useRef<Answer[]>([]);
  const missed = useRef<SessionProgress["missed"]>([]);
  const tallyRef = useRef({ correct: 0, total: 0 });
  /** Okumanın bitişini bekleyen söz — iptal edilirse elle çözülür. */
  const speakDone = useRef<(() => void) | null>(null);

  // ── Sunucu konuşması ────────────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/session", { cache: "no-store" });
      if (!res.ok) return setStatus("error");
      const data = (await res.json()) as SessionPayload & { resume?: SessionProgress | null };
      if (!data.rounds.length) return setStatus("empty");
      setSession(data);
      const at = data.resume?.index ?? 0;
      setIndex(Math.min(at, data.rounds.length - 1));
      if (data.resume) {
        tallyRef.current = { correct: data.resume.correct, total: data.resume.total };
        setTally(tallyRef.current);
        missed.current = data.resume.missed;
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /** Cevapları ve turun nerede kalındığını gönderir — ekrandaki turla aynı uç. */
  const flush = useCallback(async (final: boolean, progress: SessionProgress) => {
    const batch = pending.current;
    pending.current = [];
    if (!batch.length) return;
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: batch,
          day: localDay(),
          seconds: final ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
          progress,
        }),
        keepalive: true,
      });
      if (!res.ok) return;
      const data = (await res.json()) as { totalXp: number; currentStreak: number };
      window.dispatchEvent(
        new CustomEvent("wortspiel:stats", {
          detail: { xp: data.totalXp, streak: data.currentStreak },
        }),
      );
    } catch {
      /* çevrimdışıysa cevaplar bu tur için kaybolur; SRS bozulmaz */
    }
  }, []);

  // ── Ses ve mikrofon ────────────────────────────────────────────────

  /** Okur ve bitmesini bekler. İptal edilirse söz elle çözülür, döngü kilitlenmez. */
  const say = useCallback((segments: SpeechSegment[]): Promise<void> => {
    return new Promise<void>((resolve) => {
      speakDone.current = resolve;
      speakSegments(segments, () => {
        speakDone.current = null;
        resolve();
      });
    });
  }, []);

  const stopAll = useCallback(() => {
    run.current++;
    stopSpeaking();
    cancel();
    speakDone.current?.();
    speakDone.current = null;
  }, [cancel]);

  useEffect(() => () => stopAll(), [stopAll]);

  // ── Turun kendisi ──────────────────────────────────────────────────

  const loop = useCallback(
    async (rounds: Round[], from: number) => {
      const token = ++run.current;
      const alive = () => token === run.current;

      for (let i = from; i < rounds.length; i++) {
        if (!alive()) return;
        setIndex(i);
        const round = rounds[i];
        const results: Answer[] = [];

        for (const word of wordsOf(round)) {
          if (!alive()) return;
          const target = withArtikel(word);
          setPrompt({ tr: word.tr, de: target });
          setVerdict(null);

          // Yeni kelime: sorulmuyor, tanıtılıyor. Ekranda da öyle çalışıyor.
          if (round.game === "intro") {
            setPhase("speaking");
            await say([
              { lang: "tr", text: "Yeni kelime." },
              { lang: "de", text: target },
              { lang: "tr", text: word.tr },
              { lang: "de", text: target },
            ]);
            if (!alive()) return;
            results.push({
              wordId: word.id,
              game: "intro",
              correct: true,
              latencyMs: 0,
              hintUsed: true,
            });
            continue;
          }

          // Soru: Türkçe karşılık okunuyor, ardından mikrofon açılıyor.
          setPhase("speaking");
          await say([{ lang: "tr", text: word.tr }]);
          if (!alive()) return;

          setPhase("listening");
          const askedAt = Date.now();
          const heard = await listen({ lang: "de-DE" });
          if (!alive()) return;

          setPhase("judging");
          const decision = judgeSpeech(target, heard.alternatives, [], heard.confidences);
          // "Emin değilim" doğru sayılıyor: tanıyıcı hedefi alt sıralarda
          // görmüşse kullanıcı büyük olasılıkla doğru söylemiştir ve şüpheden
          // öğrencinin yararlanması gerekir.
          const ok = isSpeechCorrect(decision) || decision.kind === "uncertain";
          const unheard = decision.kind === "unheard";

          if (unheard && UNHEARD_IS_NOT_WRONG) {
            setVerdict("unheard");
            await say([
              { lang: "tr", text: "Duyamadım." },
              { lang: "de", text: target },
            ]);
            continue;
          }

          setVerdict(ok ? "correct" : "wrong");
          play(ok ? "correct" : "wrong");
          results.push({
            wordId: word.id,
            game: "speak",
            correct: ok,
            latencyMs: Date.now() - askedAt,
            hintUsed: false,
          });
          tallyRef.current = {
            correct: tallyRef.current.correct + (ok ? 1 : 0),
            total: tallyRef.current.total + 1,
          };
          setTally({ ...tallyRef.current });

          if (!ok) {
            if (!missed.current.some((m) => m.id === word.id)) {
              missed.current.push({ id: word.id, de: target, tr: word.tr, en: word.en });
            }
            // Yanlışta doğrusu okunuyor: ekransız akışta düzeltmeyi görmenin
            // başka yolu yok.
            await say([
              { lang: "tr", text: "Doğrusu:" },
              { lang: "de", text: target },
            ]);
          } else {
            await say([{ lang: "de", text: target }]);
          }
          if (!alive()) return;
        }

        pending.current.push(...results);
        const last = i >= rounds.length - 1;
        await flush(last, {
          correct: tallyRef.current.correct,
          total: tallyRef.current.total,
          xp: tallyRef.current.correct * 10,
          index: last ? rounds.length : i + 1,
          missed: missed.current,
        });
        if (!alive()) return;
      }

      if (!alive()) return;
      setPhase("speaking");
      await say([{ lang: "tr", text: "Tur bitti. Aferin." }]);
      play("finish");
      setStatus("done");
      track("session_done", tallyRef.current.correct);
    },
    [flush, listen, say],
  );

  async function start(from: number) {
    const rounds = session?.rounds;
    if (!rounds?.length) return;
    // İzin açıkça isteniyor: ana ekrana eklenmiş uygulamada tanıyıcının kendi
    // istemi güvenilir biçimde çıkmıyor ve tanıma sessizce düşüyor.
    const { requestMicrophone, recognitionCtor } = await import("@/components/microphone");
    if (!recognitionCtor()) return setStatus("unsupported");
    const permission = await requestMicrophone();
    if (permission === "denied") return setStatus("denied");
    if (permission === "unavailable") return setStatus("unsupported");

    resetCombo();
    startedAt.current = Date.now();
    setStatus("playing");
    track("walk_start", from);
    void loop(rounds, from);
  }

  function pause() {
    stopAll();
    setStatus("paused");
  }

  function leave() {
    stopAll();
    onExit();
  }

  // ── Görünüm ────────────────────────────────────────────────────────

  const total = session?.rounds.length ?? 0;

  if (status === "loading") return <Frame><p className="muted">Tur hazırlanıyor…</p></Frame>;

  if (status === "error")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Tur açılamadı</h2>
        <p className="muted mt-2 text-sm">Bağlantını kontrol edip tekrar dene.</p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "empty")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Bugünlük tur yok</h2>
        <p className="muted mt-2 text-sm">Tekrar zamanı gelen kelime kalmamış.</p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "unsupported")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Bu tarayıcı sesli cevabı desteklemiyor</h2>
        <p className="muted mt-2 text-sm">
          Yürürken modu tarayıcının konuşma tanıyıcısına dayanıyor. Chrome ya da Safari&apos;de
          çalışıyor; Firefox&apos;ta henüz yok.
        </p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "denied")
    return (
      <Frame>
        <h2 className="text-lg font-bold">Mikrofon izni yok</h2>
        <p className="muted mt-2 text-sm">
          Ekransız tur için mikrofon gerekiyor. Tarayıcının site ayarlarından izin verip
          tekrar dene.
        </p>
        <button onClick={leave} className="btn btn-ghost mt-5 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "ready" || status === "paused")
    return (
      <Frame>
        <h2 className="text-xl font-bold">
          {status === "paused" ? "Duraklatıldı" : "Yürürken"}
        </h2>
        <p className="muted mt-2 text-sm leading-relaxed">
          Türkçesini duyacaksın, Almancasını söyleyeceksin. Ekrana bakmana gerek yok —
          telefonu cebine koyabilirsin. Yanlışta doğrusu okunur, duyulmayan tur atlanır.
        </p>
        <div className="mt-4 rounded-xl px-3 py-2.5 text-center text-sm" style={{ background: "var(--surface-2)" }}>
          <span className="muted">Kaldığın yer: </span>
          <strong>{Math.min(index + 1, total)}</strong>
          <span className="muted"> / {total} tur</span>
        </div>
        <button onClick={() => void start(index)} className="btn btn-primary mt-5 w-full px-5 py-4 text-base">
          {status === "paused" ? "Devam et" : "Kulaklığı tak, başla"}
        </button>
        <button onClick={leave} className="btn btn-ghost mt-2 w-full px-5 py-3">Geri dön</button>
      </Frame>
    );

  if (status === "done")
    return (
      <Frame>
        <h2 className="text-2xl font-bold">Tur bitti</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-mint-500)" }}>
          {tally.correct}/{tally.total} doğru
        </p>
        <p className="muted mt-2 text-sm">
          Cevapların kaydedildi: tekrar planın, günlük hedefin ve serin güncellendi.
        </p>
        <button onClick={leave} className="btn btn-primary mt-5 w-full px-5 py-3.5">Bitir</button>
      </Frame>
    );

  // playing
  return (
    <Frame>
      <div className="mb-4 flex items-baseline justify-between text-xs font-semibold">
        <span className="muted">{index + 1} / {total}</span>
        <span className="muted tabular-nums">{tally.correct}/{tally.total} doğru</span>
      </div>

      {/* Ekran ikincil: asıl akış kulakta. Yine de bakan biri ne olduğunu
          bir bakışta görmeli — bu yüzden tek büyük satır. */}
      <motion.div
        key={`${index}-${phase}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[9rem] flex-col items-center justify-center text-center"
      >
        {phase === "listening" ? (
          <>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)", color: "var(--color-brand-500)" }}
            >
              <MicIcon size={28} />
            </motion.span>
            <p className="mt-3 text-lg font-bold">{prompt?.tr}</p>
            <p className="muted mt-1 text-sm">Almancasını söyle</p>
          </>
        ) : verdict ? (
          <>
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background:
                  verdict === "correct"
                    ? "color-mix(in srgb, var(--color-mint-500) 18%, transparent)"
                    : "color-mix(in srgb, var(--color-flame-500) 18%, transparent)",
                color: verdict === "correct" ? "var(--color-mint-500)" : "var(--color-flame-500)",
              }}
            >
              {verdict === "correct" ? <CheckIcon size={28} /> : <XIcon size={28} />}
            </span>
            <p className="mt-3 text-lg font-bold">{prompt?.de}</p>
            <p className="muted mt-1 text-sm">
              {verdict === "correct" ? "Doğru" : verdict === "unheard" ? "Duyamadım" : prompt?.tr}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-bold">{prompt?.tr ?? "…"}</p>
            <p className="muted mt-1 text-sm">Okunuyor…</p>
          </>
        )}
      </motion.div>

      {/* Düğmeler bilerek büyük: yürürken ve bakmadan basılıyor. */}
      <button onClick={pause} className="btn btn-ghost mt-6 w-full px-5 py-4 text-base">
        Duraklat
      </button>
      <button onClick={leave} className="btn btn-ghost mt-2 w-full px-5 py-3">
        Bitir
      </button>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card p-6">{children}</div>
    </div>
  );
}

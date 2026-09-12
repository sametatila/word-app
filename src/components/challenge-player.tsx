"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { RoundExit } from "@/components/round-exit";
import { AchievementFlash, Confetti, CountUp } from "@/components/celebrate";
import { play, resetCombo } from "@/lib/sfx";
import { AlertIcon, FlameIcon, SparkIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { useLang, useT } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";
import { formatDecimal, formatPercent } from "@/lib/i18n/dict";

/** Başlangıç süresi kısa: süreyi doğru cevaplarla kazanırsın. */
const START_SECONDS = 40;
const BONUS_MS = 2000; // doğru cevap
const FAST_BONUS_MS = 1500; // 3,5 saniyenin altında cevaplandıysa ek
const PENALTY_MS = 4000; // yanlış cevap
const FAST_LIMIT_MS = 3500;
const MAX_SECONDS = 75; // süre sonsuza uzamasın
/**
 * Sayacın kırmızıya döndüğü ve saniyede bir uyarı tıkının başladığı eşik.
 *
 * BU MOD SÜREYİ KAZANDIRIYOR (başlangıç kısa, doğru cevap süre ekliyor), o
 * yüzden eşik patron turundan daha dar: orada süre yalnız azalıyor ve son on
 * saniye gerçekten son on saniye. Mobilde bu modun karşılığı YOK; adı aynı
 * olan sabit `boss-player` içinde ve o ikisi zaten eşit (10).
 */
const DANGER_SECONDS = 8;

/** Üst üste doğrularda puan çarpanı — asıl heyecan burada. */
function multiplier(combo: number): number {
  if (combo >= 10) return 3;
  if (combo >= 7) return 2.5;
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  return 1;
}

/** Dalga adları anahtar olarak; metin gösterildiği yerde çevriliyor. */
const TIER_KEYS = ["", "challenge.tier_warmup", "challenge.tier_pressure", "challenge.tier_crisis"];

type Status = "loading" | "ready" | "playing" | "done" | "empty" | "error";
type Payload = { rounds: Round[]; tiers: number[]; pool: number; weak: number; best: number };
/** Sunucunun tur sonunda döndürdüğü rekor durumu: `previous` tur öncesindeki rekor. */
type Outcome = { best: number; previous: number };

/**
 * Süreye karşı meydan okuma.
 *
 * Sabit süreli bir "kaç doğru yaparsın" turu değil: süre doğru cevapla kazanılır,
 * yanlışta kaybedilir; üst üste doğrular puan çarpanını büyütür ve sorular üç
 * dalgada sertleşir. Böylece iyi oynayan uzun süre hayatta kalır, acele eden
 * ya da bilmeyen erken biter.
 */
export function ChallengePlayer({ onExit }: { onExit: () => void }) {
  const t = useT();
  const lang = useLang();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [left, setLeft] = useState(START_SECONDS);
  const [flash, setFlash] = useState({ fire: 0, text: "", tone: "flame" as "flame" | "mint" });
  // Rekor sunucudan gelir: cihaza yazılsaydı telefonda kırılan rekor
  // tarayıcıda 0 görünürdü.
  const [record, setRecord] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const deadline = useRef(0);
  const pending = useRef<Answer[]>([]);
  const finished = useRef(false);
  /** Bitiş geri sayımdan da tetiklenebildiği için puan ref'ten okunur. */
  const scoreRef = useRef(0);

  /* Tekrar deneme sayaci: artinca yukleme etkisi yeniden kosuyor. Kalip
     `weekly-player`/`placement-test` ile ayni. */
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus("loading");
    (async () => {
      try {
        const res = await apiFetch("/api/challenge", { cache: "no-store" });
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const payload = (await res.json()) as Payload;
        setData(payload);
        setRecord(payload.best ?? 0);
        setStatus(payload.rounds.length >= 3 ? "ready" : "empty");
      } catch {
        setStatus("error");
      }
    })();
  }, [attempt]);

  const finish = useCallback(async () => {
    if (finished.current) return;
    finished.current = true;
    setStatus("done");
    const score = scoreRef.current;
    const batch = pending.current;
    pending.current = [];
    if (batch.length) {
      const seconds = Math.round(START_SECONDS + batch.length * 2);
      try {
        await apiFetch("/api/answers", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ answers: batch, day: localDay(), seconds }),
        });
      } catch {
        /* çevrimdışıysa sonuç yine gösterilir */
      }
    }
    try {
      const res = await apiFetch("/api/challenge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ score }),
        keepalive: true,
      });
      if (res.ok) setOutcome((await res.json()) as Outcome);
    } catch {
      /* çevrimdışıysa rekor bir sonraki turda güncellenir */
    }
  }, []);

  // Geri sayım: kalan süre bir zaman damgasından okunur, böylece bonus/ceza
  // eklemeleri sayacı kaydırmaz.
  useEffect(() => {
    if (status !== "playing") return;
    // Son saniyelerin sesi. Sayaç ekranın üstünde ama oyun ekranın ortasında
    // oynanıyor: süre bittiğini gören değil, DUYAN kullanıcı hızlanıyor.
    // Tık saniyede bir, yalnızca kritik eşiğin altında.
    let lastTick = Infinity;
    const tick = () => {
      const remaining = (deadline.current - Date.now()) / 1000;
      setLeft(Math.max(0, remaining));
      const whole = Math.ceil(remaining);
      if (remaining > 0 && remaining <= DANGER_SECONDS && whole !== lastTick) {
        lastTick = whole;
        play("danger");
      }
      if (remaining > DANGER_SECONDS) lastTick = Infinity;
      if (remaining <= 0) void finish();
    };
    const t = setInterval(tick, 100);
    return () => clearInterval(t);
  }, [status, finish]);

  function start() {
    finished.current = false;
    resetCombo();
    play("start");
    deadline.current = Date.now() + START_SECONDS * 1000;
    setLeft(START_SECONDS);
    // Bir önceki turun rekoru artık "mevcut rekor" olur.
    if (outcome) setRecord(outcome.best);
    setOutcome(null);
    scoreRef.current = 0;
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTally({ correct: 0, total: 0 });
    setIndex(0);
    setStatus("playing");
  }

  function handleDone(round: Round, results: GameResult[]) {
    if (finished.current) return;
    pending.current.push(...results.map((r) => ({ ...r, game: round.game })));

    const tier = data?.tiers[index] ?? 1;
    let nextCombo = combo;
    let gained = 0;
    let deltaMs = 0;

    for (const r of results) {
      if (r.correct) {
        nextCombo += 1;
        const fast = r.latencyMs > 0 && r.latencyMs < FAST_LIMIT_MS;
        gained += Math.round((10 + tier * 5 + (fast ? 5 : 0)) * multiplier(nextCombo));
        deltaMs += BONUS_MS + (fast ? FAST_BONUS_MS : 0);
      } else {
        nextCombo = 0;
        deltaMs -= PENALTY_MS;
      }
    }

    // Süre kazanılır ya da kaybedilir ama tavanı aşamaz.
    deadline.current = Math.min(
      Date.now() + MAX_SECONDS * 1000,
      deadline.current + deltaMs,
    );

    scoreRef.current = score + gained;
    setScore(scoreRef.current);
    setCombo(nextCombo);
    setBestCombo((b) => Math.max(b, nextCombo));
    setTally((t) => ({
      correct: t.correct + results.filter((r) => r.correct).length,
      total: t.total + results.length,
    }));

    // Kombo kilometre taşları ve dalga geçişleri duyurulur.
    if (nextCombo > combo && [3, 5, 7, 10, 15].includes(nextCombo)) {
      setFlash({ fire: Date.now(), text: t("challenge.flash_combo", { n: nextCombo, mult: multiplier(nextCombo) }), tone: "flame" });
    } else {
      const nextTier = data?.tiers[index + 1];
      if (nextTier && nextTier > tier) {
        /* TITRESIM BURADA DEGIL: `AchievementFlash` ateslendiginde kendisi
            `vibrate("correct")` veriyor (bkz. `celebrate.tsx`). Buradaki
            ikinci cagri hem MUKERRERDI hem de YANLIS KALIPTAYDI - dalga
            yukselmesi olumlu bir an, `"wrong"` ise hata titresimi
            ([0,34,60,34]). Android ayni ani bir kez ve `correct` ile
            veriyor (`ChallengeScreen` `showFlash`). */
        setFlash({ fire: Date.now(), text: t("challenge.flash_wave", { wave: t(TIER_KEYS[nextTier] ?? TIER_KEYS[1]) }), tone: "mint" });
      }
    }

    if (index >= (data?.rounds.length ?? 0) - 1) void finish();
    else setIndex((i) => i + 1);
  }

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (status === "loading")
    return (
      <Frame>
        <p role="status" aria-busy="true" className="muted text-center text-body">{t("challenge.preparing")}</p>
      </Frame>
    );

  if (status === "error")
    return (
      <Frame>
        {/* YERINDE TEKRAR DENEME. Web yalniz "geri don" diyordu: gecici bir ag
            hatasi kullaniciyi meydan okumadan tamamen atiyordu. Android'deki
            sira: birincil "tekrar dene", ikincil cikis (`ChallengeScreen`).
            Hata ayrica DUYURULUYOR - ekrani kaplayan bir hata metni canli
            bolge degilse ekran okuyucu kullanan biri hicbir sey duymuyor. */}
        <div role="alert" className="text-center">
          <AlertIcon size={22} />
          <p className="mt-2 text-body">{t("challenge.load_failed")}</p>
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="btn btn-primary mt-4 w-full px-5 py-3"
          >
            {t("common.try_again")}
          </button>
          <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
            {t("common.go_back")}
          </button>
        </div>
      </Frame>
    );

  if (status === "empty")
    return (
      <Frame>
        <div className="text-center">
          {/* MASKOT BOS DALDA DA. Android ayni ekranda `idle` maskotu
              ciziyor (`ChallengeScreen`); webde yalniz sonuc dalinda vardi,
              yani "bugun meydan okuma yok" ekrani karaktersiz bir metin
              blogu olarak kaliyordu. */}
          <Mascot mood="idle" size={96} className="mx-auto" />
          <h2 className="mt-1 text-h3">{t("challenge.none_title")}</h2>
          <p className="muted mt-2 text-body">
            {t("challenge.none_sub")}
          </p>
          <button onClick={onExit} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            {t("common.back_to_learn")}
          </button>
        </div>
      </Frame>
    );

  if (status === "ready")
    return (
      <Frame>
        <div className="text-center">
          <div className="brand-gradient mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-tile">
            <FlameIcon size={26} />
          </div>
          <h2 className="text-h2">{t("challenge.title")}</h2>
          <p className="muted mt-2 text-body">
            {t("challenge.pitch", { n: START_SECONDS })}
          </p>

          <ul className="mt-4 space-y-1.5 text-left text-body">
            <Rule tone="mint">{t("challenge.rule_correct")}</Rule>
            <Rule tone="rose">{t("challenge.rule_wrong")}</Rule>
            <Rule tone="flame">
              {data?.weak
                ? t("challenge.rule_waves_weak", { weak: data.weak })
                : t("challenge.rule_waves")}
            </Rule>
          </ul>

          {record > 0 ? (
            <p className="muted mt-4 text-body">
              {t("challenge.your_record")} <strong>{record}</strong> {t("common.points")}
            </p>
          ) : null}
          <button onClick={start} className="btn btn-primary mt-5 w-full px-5 py-3.5 text-h3">
            {t("common.start")}
          </button>
          <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
            {t("common.discard")}
          </button>
        </div>
      </Frame>
    );

  if (status === "done") {
    // Rekor kararı sunucunun: `previous` bu tur oynanmadan önceki değerdir.
    // Yanıt gelene kadar elimizdeki en iyi bilgi turdan önce okunan rekordur.
    const previous = outcome?.previous ?? record;
    const isRecord = score > previous && score > 0;
    const accuracy = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
    return (
      <Frame>
        <RecordChime fire={isRecord} />
        <Confetti fire={isRecord ? 1 : 0} count={40} />
        {/* TURUN SONUCU DUYURULUYOR (bkz. 11.337). */}
        <div role="status" className="text-center">
          {/* Rekor kırıldıysa kutluyor, kırılmadıysa gülümsüyor — hayatta
              kalma turu tükenerek bitiyor, üzgün bir yüz burada haksız olurdu. */}
          <Mascot mood={isRecord ? "cheer" : "happy"} size={96} className="mx-auto" />
          <h2 className="text-display">
            <CountUp value={score} /> <span className="text-h3">{t("common.points")}</span>
          </h2>
          {isRecord ? (
            <p className="mt-1 text-strong text-[color:var(--color-mint)]">
              {t("challenge.new_record", { previous })}
            </p>
          ) : (
            <p className="muted mt-1 text-body">{t("challenge.your_record")} {outcome?.best ?? Math.max(record, score)}</p>
          )}

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Box label={t("daily.correct")} value={`${tally.correct}/${tally.total}`} />
            <Box label={t("challenge.hit_rate")} value={formatPercent(accuracy, lang)} />
            <Box label={t("challenge.longest_streak")} value={String(bestCombo)} />
          </div>

          <button onClick={start} className="btn btn-primary mt-5 w-full px-5 py-3.5">
            {t("common.try_again")}
          </button>
          <button onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
            {t("common.back_to_learn")}
          </button>
        </div>
      </Frame>
    );
  }

  const round = data!.rounds[index];
  const tier = data!.tiers[index] ?? 1;
  const pct = Math.min(100, (left / START_SECONDS) * 100);
  const urgent = left <= DANGER_SECONDS;
  const mult = multiplier(combo);

  return (
    <div className="relative mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <AchievementFlash fire={flash.fire} message={flash.text} tone={flash.tone} />

      {/* ÇIKIŞ YOLU YOKTU: tur başlayınca başlıkta hiçbir düğme yoktu ve tek
          çıkış tarayıcının geri düğmesiydi. Android'de aynı yerde 44 px'lik
          kapat karosu var (`ChallengeScreen`). */}
      <div className="mb-3 shrink-0">
        <div className="mb-1.5 flex items-center justify-between gap-3 text-caption">
          <RoundExit onExit={onExit} />
          <span className="flex flex-1 items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow"
              style={{
                background: "color-mix(in srgb, var(--color-brand) 14%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              {t(TIER_KEYS[tier] ?? TIER_KEYS[1])}
            </span>
            <motion.span key={score} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="font-bold">
              {score} {t("common.points")}
            </motion.span>
          </span>
          <motion.span
            key={`${urgent}-${Math.ceil(left)}`}
            initial={urgent ? { scale: 1.18 } : false}
            animate={{ scale: 1 }}
            className="font-bold tabular-nums"
            style={{ color: urgent ? "var(--color-rose)" : "var(--color-flame)" }}
          >
            {/* Ondalık ayraç DİLDEN: `toFixed` sabit nokta yazıyor ve
                Türkçe/Almanca arayüzde de "8.3" çıkıyordu. Aynı kusur
                Android'de de vardı (`ChallengeScreen`). */}
            {t("challenge.seconds", { n: formatDecimal(left, lang) })}
          </motion.span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full surface-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: urgent ? "var(--color-rose)" : "var(--color-flame)",
              transition: "width .12s linear, background-color .3s ease",
            }}
          />
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {combo >= 2 ? (
              <motion.span
                key={combo}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 text-caption"
                style={{ color: "var(--color-violet)" }}
              >
                <SparkIcon size={13} /> {t("challenge.combo", { n: combo, mult })}
              </motion.span>
            ) : (
              <span className="muted text-caption">{t("challenge.build_streak")}</span>
            )}
          </AnimatePresence>
          <span className="muted text-caption">
            {index + 1}/{data!.rounds.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <FitBox>
            <GameSwitch round={round} onDone={(res) => handleDone(round, res)} />
          </FitBox>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Rule({ tone, children }: { tone: "mint" | "rose" | "flame"; children: React.ReactNode }) {
  const color = `var(--color-${tone}-500)`;
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className="muted">{children}</span>
    </li>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-panel px-2 py-3 surface-2">
      <div className="text-strong">{value}</div>
      <div className="muted text-micro">{label}</div>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="card p-6">{children}</div>
      <p className="muted mt-4 text-center text-caption">
        <Link href="/learn" className="underline-offset-4 hover:underline">
          {t("challenge.back_to_normal")}
        </Link>
      </p>
    </motion.div>
  );
}

/**
 * Bitiş sesi.
 *
 * Sonuç kartı bir bileşen değil `if` dalı olduğu için içine `useEffect`
 * konulamıyordu (koşullu hook). Sesi taşıyan küçük bir bileşen bu kısıtı
 * çözüyor ve rekorun sesini konfetiyle aynı koşula bağlıyor: göz ne
 * görüyorsa kulak onu duyuyor.
 */
function RecordChime({ fire }: { fire: boolean }) {
  useEffect(() => {
    play(fire ? "record" : "finish");
  }, [fire]);
  return null;
}

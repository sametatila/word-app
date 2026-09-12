"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { AnimatePresence, motion } from "framer-motion";
import type { Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { RoundExit } from "@/components/round-exit";
import { Confetti, CountUp } from "@/components/celebrate";
import { scoreAnswer } from "@/lib/daily-score";
import { TIER_COLOR } from "@/components/achievement-badge";
import { track } from "@/lib/track";
import { ShareResult } from "@/components/share-result";
import { AlertIcon, FlameIcon, SparkIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";
import Link from "next/link";

/**
 * Günün turu.
 *
 * Diğer bütün turlardan bir farkı var: kişiye özel değil. Aynı kurs ve
 * seviyedeki herkes aynı kelimeleri aynı sırayla görüyor, bu yüzden skorlar
 * karşılaştırılabiliyor ve tablo bir anlam taşıyor.
 *
 * Geri sayım yok. Günde tek hakkı olan bir turda süre baskısı, öğrenciyi
 * ölçmek yerine telaşını ölçerdi; hız yine de puana yansıyor ama kaybettirmiyor.
 */

type Board = {
  rank: number;
  name: string | null;
  score: number;
  correct: number;
  total: number;
  isMe: boolean;
}[];

type Payload = {
  day: string;
  level: string;
  rounds: Round[];
  played: { score: number; correct: number; total: number; bestCombo: number } | null;
  board: Board;
};

/* `auth` AYRI BIR HAL: oturum acik sayfada duserse (belirtec suresi, sunucu
   yeniden baslamasi) istek 401 donuyor ve "yuklenemedi, tekrar dene" demek
   YANLIS SEBEP - tekrar denemek hicbir zaman ise yaramaz. Android bunu
   bastan ayiriyor (`DailyScreen`: `e.status === 401 ? "auth" : "error"`) ve
   girise goturuyor; web ikisini tek dalda topluyordu. */
type Status = "loading" | "ready" | "playing" | "submitting" | "done" | "error" | "empty" | "auth";

export function DailyPlayer({ onExit }: { onExit: () => void }) {
  const t = useT();
  const lang = useLang();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [board, setBoard] = useState<Board>([]);
  const [xpGained, setXpGained] = useState(0);

  const bestCombo = useRef(0);
  const marks = useRef<boolean[]>([]);
  const startedAt = useRef(Date.now());
  const sent = useRef(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStatus("loading");
    (async () => {
      try {
        const res = await apiFetch(`/api/daily?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) return setStatus(res.status === 401 ? "auth" : "error");
        const payload = (await res.json()) as Payload;
        setData(payload);
        setBoard(payload.board);
        if (payload.played) setStatus("done");
        else setStatus(payload.rounds.length ? "ready" : "empty");
      } catch {
        setStatus("error");
      }
    })();
  }, [attempt]);

  const finish = useCallback(
    async (finalScore: number, finalTally: { correct: number; total: number }) => {
      // Tek hak sunucuda korunuyor ama iki kez göndermek de gereksiz: ağ
      // yavaşsa kullanıcı düğmeye iki kez basabiliyor.
      if (sent.current) return;
      sent.current = true;
      /* GÖNDERİLİRKEN ekranda bir şey olmalı: son tur donmuş hâlde duruyordu
         ve ağ yavaşsa kullanıcı düğmenin işe yaramadığını sanıyordu. Android
         aynı anda yükleme iskeletini gösteriyor (`DailyScreen` `submitting`). */
      setStatus("submitting");
      track("session_done", finalTally.correct, "daily");
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      try {
        const res = await apiFetch("/api/daily", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            day: localDay(),
            score: finalScore,
            correct: finalTally.correct,
            total: finalTally.total,
            bestCombo: bestCombo.current,
            seconds,
          }),
        });
        if (res.ok) {
          const out = (await res.json()) as { board: Board; xpGained: number };
          setBoard(out.board);
          setXpGained(out.xpGained);
        }
      } catch {
        /* skor gönderilemediyse tur yine de bitmiş sayılır */
      }
      setStatus("done");
    },
    [],
  );

  function handleDone(round: Round, results: GameResult[]) {
    let running = combo;
    let gained = 0;
    let right = 0;
    for (const r of results) {
      running = r.correct ? running + 1 : 0;
      if (running > bestCombo.current) bestCombo.current = running;
      gained += scoreAnswer(r.correct, r.latencyMs, running);
      if (r.correct) right++;
      marks.current.push(r.correct);
    }
    setCombo(running);

    const nextScore = score + gained;
    const nextTally = { correct: tally.correct + right, total: tally.total + results.length };
    setScore(nextScore);
    setTally(nextTally);

    const last = index >= (data?.rounds.length ?? 0) - 1;
    if (last) void finish(nextScore, nextTally);
    else setIndex(index + 1);
  }

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (status === "loading" || status === "submitting") {
    return (
      <Card>
        <p role="status" aria-busy="true" className="muted py-8 text-center text-body">{t("daily.preparing")}</p>
      </Card>
    );
  }

  if (status === "auth") {
    return (
      <Card>
        <div role="alert" className="p-6 text-center">
          <p className="text-h3">{t("daily.sign_in_for_daily_round")}</p>
          <p className="muted mt-2 text-body leading-relaxed">{t("daily.play_same_round_as_everyone_and")}</p>
          <Link href="/login" prefetch={false} className="btn btn-primary mt-5 w-full px-5 py-4">
            {t("daily.sign_in_sign_up")}
          </Link>
          <button type="button" onClick={onExit} className="btn btn-ghost mt-2 w-full px-5 py-3">
            {t("common.close")}
          </button>
        </div>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <div role="alert" className="p-6 text-center">
          <AlertIcon size={22} />
          <p className="mt-2 text-strong">{t("daily.couldn_t_load_daily_round")}</p>
          {/* YERİNDE TEKRAR DENEME. Web yalnız "geri dön" diyordu: geçici bir
              ağ hatası kullanıcıyı ekrandan çıkarıp geri getirmeye zorluyordu.
              Android birincil düğme olarak tekrar denetiyor, çıkış ikincil. */}
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="btn btn-primary mt-4 w-full px-5 py-2.5 text-body"
          >
            {t("daily.try_again")}
          </button>
          <button onClick={onExit} className="btn btn-ghost mt-2 px-5 py-2.5 text-body">
            {t("common.close")}
          </button>
        </div>
      </Card>
    );
  }

  if (status === "empty") {
    return (
      <Card>
        <div className="p-6 text-center">
          <p className="text-strong">{t("daily.none_title")}</p>
          <p className="muted mt-1 text-caption">{t("daily.none_sub")}</p>
          <button onClick={onExit} className="btn btn-ghost mt-4 px-5 py-2.5 text-body">
            {t("common.go_back")}
          </button>
        </div>
      </Card>
    );
  }

  if (status === "ready" && data) {
    return (
      <Card>
        <div className="brand-gradient-deep px-6 py-6 text-center text-white">
          <p className="text-body opacity-90">{t("daily.daily_round")} · {data.level}</p>
          <h2 className="mt-1 text-h1">{t("daily.same_words")}</h2>
          <p className="mx-auto mt-2 max-w-xs text-body opacity-90">
            {t("daily.pitch", { n: data.rounds.length })}
          </p>
        </div>
        <div className="space-y-2 p-6">
          <button
            onClick={() => {
              startedAt.current = Date.now();
              /* Günün turu ÖLÇÜLÜYOR. Mobil `DailyScreen` baştan beri
                 `session_start`/`session_done` yazıyor ve `kind`i "daily"
                 veriyor; web hiçbir olay yazmıyordu, yani günün turu
                 raporlarda yalnız Android tarafından görünüyordu. Ayrı bir
                 `daily_play` olayı YOK: ölçüm zaten `kind` ile ayrışıyor
                 (bkz. web-parity §11.28). */
              track("session_start", 0, "daily");
              setStatus("playing");
            }}
            className="btn btn-primary w-full px-5 py-4 text-h3"
          >
            {t("common.start")}
          </button>
          <button onClick={onExit} className="btn btn-ghost w-full px-5 py-3">
            {t("common.later")}
          </button>
        </div>
        {board.length > 1 ? <BoardList rows={board} title={t("daily.today_s_ranking")} /> : null}
      </Card>
    );
  }

  if (status === "playing" && data) {
    const round = data.rounds[index];
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        {/* ÇIKIŞ YOLU YOKTU: tur başlayınca başlıkta hiçbir düğme yoktu ve
            tek çıkış tarayıcının geri düğmesiydi. Android'de aynı yerde 44
            px'lik kapat karosu var (`DailyScreen`). */}
        <div className="mb-3 shrink-0">
          <div className="mb-1.5 flex items-center justify-between gap-3 text-caption">
            <RoundExit onExit={onExit} labelKey="common.back" />
            <span className="muted flex-1">
              {index + 1} / {data.rounds.length}
            </span>
            <span className="flex items-center gap-2">
              {combo >= 3 ? (
                <motion.span
                  key={combo}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-micro"
                  style={{
                    background: "color-mix(in srgb, var(--color-violet-500) 14%, transparent)",
                    color: "var(--color-violet)",
                  }}
                >
                  <SparkIcon size={12} /> {combo}
                </motion.span>
              ) : null}
              <span className="font-black" style={{ color: "var(--color-brand)" }}>
                {formatNumber(score, lang)}
              </span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full surface-2">
            <motion.div
              className="brand-gradient h-full rounded-full"
              animate={{ width: `${(index / data.rounds.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={round.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.16 }}
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

  // done
  const played = data?.played;
  const finalScore = played?.score ?? score;
  const finalCorrect = played?.correct ?? tally.correct;
  const finalTotal = played?.total ?? tally.total;
  const me = board.find((r) => r.isMe);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <Confetti fire={1} />
      {/* TURUN SONUCU DUYURULUYOR (bkz. 11.337). */}
      <div role="status" className="card overflow-hidden">
        <div className="brand-gradient-deep p-8 text-center text-white">
          {/* Günün turu da bir kapanış anı: kelime turu, oyun içindeki sonuç
              şeridi, beceri egzersizi ve ders aynı karakterle kapanıyor.
              Kupa simgesi bunun dışında kalan tek yerdi. */}
          <Mascot mood="celebrate" size={88} className="mx-auto" />
          <h2 className="mt-1 text-h1">
            <CountUp value={finalScore} /> {t("common.points")}
          </h2>
          <p className="mt-1 text-body opacity-90">
            {t("common.n_correct", { correct: finalCorrect, total: finalTotal })}
            {me ? ` · ${t("daily.your_rank_today", { rank: me.rank })}` : ""}
          </p>
          {/* En iyi seri Android'in sonuç başlığında ayrı bir kutu; web'de
              yalnız paylaşım görselinin içindeydi, ekranda hiç görünmüyordu —
              oysa turun asıl anlattığı şey art arda kaç doğru yaptığın. */}
          <p className="mt-1 flex items-center justify-center gap-1 text-body opacity-90">
            <FlameIcon size={14} />
            {bestCombo.current} {t("daily.best_streak")}
          </p>
          {xpGained > 0 ? <p className="mt-1 text-body opacity-90">+{xpGained} XP</p> : null}
        </div>

        {/* Tablo tek satırken de gösteriliyor: "Tabloyu gör" deyip tablo
            görmemek, düğmenin yalan söylemesi. Seviyesinde ilk oynayan
            kullanıcı kendi satırını ve neden yalnız olduğunu görüyor. */}
        {/* BOŞ TABLO da bir şey söylüyor: eskiden hiçbir şey çizilmiyordu ve
            ekran bozuk görünüyordu. Android aynı koşulda "ilk oynayan sen ol"
            diyor (`DailyScreen` `Board`). */}
        {board.length === 0 ? (
          <p className="muted px-5 py-3 text-center text-caption">{t("daily.be_first_to_play_today")}</p>
        ) : null}
        {board.length > 0 ? <BoardList rows={board} title={t("daily.today_s_ranking")} /> : null}
        {board.length === 1 ? (
          <p className="muted border-t px-5 py-3 text-caption" style={{ borderColor: "var(--border)" }}>
            {t("daily.first_today")}
          </p>
        ) : null}

        <div className="space-y-2 p-6">
          {/* Paylaşılan sonuç burada gerçekten bir şey ifade ediyor: karşı taraf
              aynı turu oynadıysa skorları doğrudan karşılaştırabiliyor. */}
          <ShareResult
            kind="daily"
            score={finalScore}
            marks={marks.current}
            total={finalTotal}
            accuracy={finalTotal ? Math.round((finalCorrect / finalTotal) * 100) : 0}
            streak={bestCombo.current}
            level={data?.level ?? "A1"}
          />
          <button onClick={onExit} className="btn btn-primary w-full px-5 py-4">
            {t("common.back_to_learn")}
          </button>
          <p className="muted pt-1 text-center text-caption">
            {t("daily.once_a_day")}
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card mx-auto w-full max-w-md overflow-hidden">{children}</div>;
}

/**
 * İlk üçün madalya rengi — ortak kademe ölçeğinden (`TIER_COLOR`).
 *
 * Mobil `screens/DailyScreen` `medalColor` ile aynı: dördüncü ve sonrası
 * madalyasız, `null` dönüyor ve çizim düz soluk numaraya düşüyor.
 */
function medalColor(rank: number): string | null {
  return rank === 1 ? TIER_COLOR.gold : rank === 2 ? TIER_COLOR.silver : rank === 3 ? TIER_COLOR.bronze : null;
}

function BoardList({ rows, title }: { rows: Board; title: string }) {
  const t = useT();
  const lang = useLang();
  return (
    <div className="border-t" style={{ borderColor: "var(--border)" }}>
      {/* Tablonun seviyeye göre olduğu Android'de altyazıyla söyleniyor;
          web'de yalnız başlık vardı ve kullanıcı kendini bütün oyuncularla
          karşılaştırdığını sanıyordu. */}
      <div className="px-5 pt-2.5 pb-1">
        <p className="muted text-micro uppercase tracking-eyebrow">{title}</p>
        <p className="muted text-micro">{t("daily.players_at_your_level")}</p>
      </div>
      <ol>
        {rows.map((r) => {
          /* Baş harf JSX'İN DIŞINDA, Android'de olduğu gibi
             (`DailyScreen`: `const initial = …`). Satırın içinde hesaplanırsa
             "ad çizimi" sayan ölçüler onu bir ad sanıyor — oysa tek karakter,
             satıra sığmama sorunu yok. */
          const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
          return (
          <li
            key={`${r.rank}-${r.name ?? "x"}`}
            className="flex items-center gap-3 border-t px-5 py-2.5 text-body"
            style={{
              borderColor: "var(--border)",
              background: r.isMe
                ? "color-mix(in srgb, var(--color-brand) 8%, transparent)"
                : undefined,
            }}
          >
            {/*
              İLK ÜÇ DOLU DAİRE, GERİSİ DÜZ NUMARA — mobil `DailyScreen` ile
              aynı kural ve aynı ölçek (`TIER_COLOR`).
              Burada madalya HİÇ yoktu: web sıralamasında ilk üç, dördüncüden
              ayırt edilemiyordu. Rengi yazıya vermek çözüm değil (mobil
              tarafta ölçülmüş: beyaz kart üstünde altın 2.88, gümüş 2.56,
              bronz 3.09 — normal yazı eşiği 4.5); uygulamanın kendi dili dolu
              zemin + beyaz içerik ve o ölçekte üçü de eşiği geçiyor.
            */}
            <span className="flex w-6 shrink-0 justify-center">
              {medalColor(r.rank) ? (
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-caption tabular-nums text-white"
                  style={{ background: medalColor(r.rank)! }}
                >
                  {r.rank}
                </span>
              ) : (
                <span className="muted text-center font-black tabular-nums">{r.rank}</span>
              )}
            </span>
            {/*
              BAŞ HARF DAİRESİ. Android'in satırında rütbeden sonra 36 px'lik
              bir daire var ve içinde adın ilk harfi (`DailyScreen`); webde
              yalnız sıra numarası ve ad vardı, yani aynı liste iki
              uygulamada iki farklı ağırlıkta okunuyordu. Kendi satırı da
              işaretleniyor: dolu zemin + `onFill`.
            */}
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-body font-bold"
              style={{
                background: r.isMe ? "var(--color-brand)" : "var(--surface-2)",
                color: r.isMe ? "var(--on-fill)" : "var(--text-muted)",
              }}
              aria-hidden
            >
              {initial}
            </span>
            <span className="min-w-0 flex-1">
              {/* AD YEDEĞİ `social.student`: sıralama satırında birine
                  "isimsiz öğrenci" demek, eksik bir alanı herkese
                  duyurmaktır. Android üç tablosunun hepsinde "Öğrenci"
                  diyor; webin lig tablosu kendi içinde bile tutmuyordu
                  (satır "isimsiz öğrenci", aynı kişinin bildirme düğmesi
                  "öğrenci"). */}
              <span className="block truncate font-semibold">
                {r.name ?? t("social.student")}
                {r.isMe ? t("social.you_paren") : ""}
              </span>
              {/* DOĞRU SAYISI ADIN ALTINDA ve ortak anahtardan: web ham bir
                  kesir basıyordu (`3/8`), Android "8 soruda 3 doğru" diyor
                  (`common.n_correct`). */}
              <span className="muted block text-micro">
                {t("common.n_correct", { correct: r.correct, total: r.total })}
              </span>
            </span>
            <span
              className="w-16 shrink-0 text-right font-bold tabular-nums"
              style={{ color: "var(--color-brand)" }}
            >
              {formatNumber(r.score, lang)}
            </span>
          </li>
          );
        })}
      </ol>
    </div>
  );
}

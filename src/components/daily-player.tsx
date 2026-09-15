"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { AnimatePresence, motion } from "framer-motion";
import type { Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { RoundExit } from "@/components/round-exit";
import { scoreAnswer } from "@/lib/daily-score";
import { TIER_COLOR } from "@/components/achievement-badge";
import { track } from "@/lib/track";
import { ShareResult } from "@/components/share-result";
import { ClockIcon, LockIcon, PodiumIcon, SparkIcon } from "@/components/icons";
import { CoverBody, DetailCard, FlowActions, FlowColumn, ResultHero, StateBody, StatRow } from "@/components/flow";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";

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
  /* Sonuç BU OTURUMDA mı bitti, yoksa bugün oynanmış tur yeniden mi
     açıldı. Konfeti yalnız ilkinde: aynı sonucu her açışta kutlamak
     kutlamayı değersizleştirir. */
  const justFinished = useRef(false);
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
      justFinished.current = true;
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

  /* DURUM ŞABLONU (`components/flow` `StateBody`): giriş = el sallayan
     maskot, hata = üzgün, boş = düşünen; tek birincil çıkış + metin
     bağlantısı. Mobil `DailyScreen` aynı üç dalı aynı biçimde çiziyor. */
  if (status === "auth") {
    return (
      <FlowColumn>
        <StateBody alert mood="wave" title={t("daily.sign_in_for_daily_round")} body={t("daily.play_same_round_as_everyone_and")}>
          <FlowActions primary={{ label: t("daily.sign_in_sign_up"), href: "/login" }} tertiary={{ label: t("common.close"), onClick: onExit }} />
        </StateBody>
      </FlowColumn>
    );
  }

  if (status === "error") {
    return (
      <FlowColumn>
        {/* YERİNDE TEKRAR DENEME: geçici bir ağ hatası kullanıcıyı ekrandan
            çıkarıp geri getirmeye zorlamasın. */}
        <StateBody alert mood="sad" title={t("daily.couldn_t_load_daily_round")}>
          <FlowActions primary={{ label: t("daily.try_again"), onClick: () => setAttempt((n) => n + 1) }} tertiary={{ label: t("common.close"), onClick: onExit }} />
        </StateBody>
      </FlowColumn>
    );
  }

  if (status === "empty") {
    return (
      <FlowColumn>
        <StateBody mood="think" title={t("daily.none_title")} body={t("daily.none_sub")}>
          <FlowActions primary={{ label: t("common.back_to_learn"), onClick: onExit }} />
        </StateBody>
      </FlowColumn>
    );
  }

  if (status === "ready" && data) {
    /*
     * KAPAK ŞABLONU: ikon karosu · başlık · tek cümle · kural satırları.
     * Eski tanıtım tek cümlede "·" ile üç kuralı sıralıyordu; kurallar artık
     * ayrı ve ikonlu. "Hız puana eklenir" `lib/daily-score` `scoreAnswer`dan:
     * doğru cevaba 2-8 sn arasında azalan hız bonusu biniyor.
     *
     * DÜĞMELER TABLODAN ÖNCE (bilinçli fark): mobilde düğmeler ekranın dibine
     * sabit, burada sayfa akıyor — tablo üstte kalsa "Başla" katlamanın
     * altına düşerdi.
     */
    return (
      <FlowColumn>
        <CoverBody
          icon={<PodiumIcon size={28} />}
          tint="var(--color-sky-500)"
          eyebrow={t("daily.daily_round")}
          title={t("daily.same_words")}
          pitch={t("daily.cover_pitch", { n: data.rounds.length })}
          rules={[
            { icon: <LockIcon size={16} />, text: t("daily.rule_once") },
            { icon: <ClockIcon size={16} />, text: t("daily.rule_speed") },
            { icon: <PodiumIcon size={16} />, text: t("daily.rule_board", { level: data.level }), tone: "ok" },
          ]}
        />
        <FlowActions
          primary={{
            label: t("common.start"),
            onClick: () => {
              startedAt.current = Date.now();
              /* Günün turu ÖLÇÜLÜYOR: `session_start`, kind "daily" — mobil
                 `DailyScreen` ile aynı (bkz. web-parity §11.28). */
              track("session_start", 0, "daily");
              setStatus("playing");
            },
          }}
          tertiary={{ label: t("common.later"), onClick: onExit }}
        />
        {/* Bugünün tablosu turdan ÖNCE de duruyor: "kime yetişiyorum" sorusu
            oynamaya iten şeyin kendisi. Tek satırsa (yalnız kendisi) çizilmiyor. */}
        {board.length > 1 ? (
          <DetailCard title={`${t("daily.today_s_ranking")} · ${data.level}`}>
            <p className="muted text-caption">{t("daily.players_at_your_level")}</p>
            <BoardList rows={board} />
          </DetailCard>
        ) : null}
      </FlowColumn>
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
  const finalBest = played?.bestCombo ?? bestCombo.current;
  const level = data?.level ?? "A1";
  const accuracy = finalTotal ? Math.round((finalCorrect / finalTotal) * 100) : 0;
  const me = board.find((r) => r.isMe);
  /* Günün turunda geçme/kalma yok; maskot ve kutlama doğruluktan çıkıyor
     (kelime turunun eşiği: %80 kutlama, %60 mutlu). Eskiden her sonuç —
     3/20 bile — konfetiyle açılıyordu. */
  const deserved = finalTotal >= 4 && accuracy >= 80;

  /*
    SONUÇ ŞABLONU (`components/flow`): band (puan · doğru + XP · sıra hapı)
    → üç sayı → günün sıralaması → Bitir / Paylaş. Mobil `DailyScreen`
    `done` ile aynı alanlar, aynı sıra.
  */
  return (
    <FlowColumn celebrate={deserved && justFinished.current}>
      {/* TURUN SONUCU DUYURULUYOR: bant canlı bölge (bkz. 11.337). */}
      <ResultHero
        eyebrow={t("daily.daily_round")}
        title={t("daily.your_score")}
        figure={formatNumber(finalScore, lang)}
        /* Kazanılan XP yalnız kazanç varsa: yeniden açılan sonuçta sunucu 0 döndürüyor. */
        sub={
          xpGained > 0
            ? `${t("common.n_correct", { correct: finalCorrect, total: finalTotal })} · +${xpGained} XP`
            : t("common.n_correct", { correct: finalCorrect, total: finalTotal })
        }
        mood={deserved ? "celebrate" : accuracy >= 60 ? "happy" : "sad"}
        pill={me ? { text: t("daily.rank_pill", { rank: me.rank }) } : null}
      />
      <StatRow
        items={[
          { value: `${finalCorrect}/${finalTotal}`, label: t("daily.correct") },
          { value: String(finalBest), label: t("daily.best_streak"), tone: "streak" },
          { value: me ? t("daily.rank_value", { rank: me.rank }) : "—", label: t("daily.rank") },
        ]}
      />
      {/* Tablo tek satırken de gösteriliyor ("ilk sensin"); boşken de bir şey
          söylüyor ("ilk oynayan sen ol") — sessiz tablo bozuk görünür. */}
      <DetailCard title={`${t("daily.today_s_ranking")} · ${level}`}>
        <p className="muted text-caption">{t("daily.players_at_your_level")}</p>
        {board.length === 0 ? (
          <p className="muted py-2 text-center text-caption">{t("daily.be_first_to_play_today")}</p>
        ) : (
          <>
            {board.length === 1 ? <p className="muted text-micro">{t("daily.first_today")}</p> : null}
            <BoardList rows={board} />
          </>
        )}
      </DetailCard>

      <div className="flex flex-col gap-2">
        <FlowActions primary={{ label: t("common.finish"), onClick: onExit }} />
        {/* PAYLAŞ İKİNCİL (çerçeveli): karşı taraf aynı turu oynadıysa skorları
            doğrudan karşılaştırabiliyor. Düğme kendi bileşeninde (Web Share /
            panoya kopyalama), çerçeve `FlowActions` ikincilinin ölçüsünde. */}
        {finalTotal > 0 ? (
          <div className="rounded-panel border-[1.5px]" style={{ borderColor: "var(--border)" }}>
            <ShareResult
              kind="daily"
              score={finalScore}
              marks={marks.current}
              total={finalTotal}
              accuracy={accuracy}
              streak={finalBest}
              level={level}
            />
          </div>
        ) : null}
        <p className="muted text-center text-micro">{t("daily.once_a_day")}</p>
      </div>
    </FlowColumn>
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

/**
 * Günün sıralaması — `DetailCard`ın içinde çiziliyor (kapakta önizleme,
 * sonuçta tablo). Başlık ve "aynı seviyede oynayanlar" notu kartın kendisinde.
 * Satırlar arasında çizgi yok (kartın içinde kart olurdu); kendi satırı marka
 * zeminiyle vurgulu — mobil `DailyScreen` `Board` ile aynı.
 */
function BoardList({ rows }: { rows: Board }) {
  const t = useT();
  const lang = useLang();
  return (
    <div>
      <ol className="flex flex-col gap-1">
        {rows.map((r) => {
          /* Baş harf JSX'İN DIŞINDA, Android'de olduğu gibi
             (`DailyScreen`: `const initial = …`). Satırın içinde hesaplanırsa
             "ad çizimi" sayan ölçüler onu bir ad sanıyor — oysa tek karakter,
             satıra sığmama sorunu yok. */
          const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
          return (
          <li
            key={`${r.rank}-${r.name ?? "x"}`}
            className="flex items-center gap-3 rounded-panel px-2 py-2 text-body"
            style={{
              background: r.isMe
                ? "color-mix(in srgb, var(--color-brand) 8%, transparent)"
                : undefined,
              boxShadow: r.isMe ? "inset 0 0 0 1px var(--color-brand)" : undefined,
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

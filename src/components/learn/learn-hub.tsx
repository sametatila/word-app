"use client";

import Link from "next/link";
import { barPct, fillStyle } from "@/lib/motion";
import type { ReactNode } from "react";
import { QuestCard } from "@/components/quest-card";
import { PlacementNudge } from "@/components/learn/placement-nudge";
import { LevelProgress, type LevelProgressData } from "@/components/learn/level-progress";
import { FriendPulse } from "@/components/social/friend-pulse";
import { CardGrid } from "@/components/layout";
import { LearnHeader } from "@/components/app-header";
import { Mascot, MASCOT_CARD } from "@/components/mascot";
import { useT } from "@/lib/i18n/client";
import { goalCount } from "@/lib/daily-goal";
import {
  DailyRoundIcon,
  ForwardIcon,
  MockExamIcon,
  NewWordsIcon,
  PracticeIcon,
  ReviewIcon,
  SurvivalIcon,
  WalkIcon,
  WeeklyTestIcon,
} from "@/components/icons";

/**
 * Öğren sekmesi — MERKEZ, oyun değil.
 *
 * Burası bir kelime turu oynatıcısıydı: `/learn` açılınca doğrudan oturum
 * yükleniyor, oyunun başlangıç kartı da sekmenin ana ekranı gibi davranıyordu.
 * Yan etkileri ölçülebilir: sekme her açılışta bir oturum kuruyordu (kullanıcı
 * oynamayacak olsa bile), günün görevleri ve yürüyüş modu bir OYUNUN başlangıç
 * kartının içine gömülüydü, ve turu bırakıp sekmeye dönmek diye bir şey yoktu
 * — sekmenin kendisi turdu.
 *
 * Mobilde ayrım net (`M/src/screens/LearnScreen.tsx` + `GameScreen.tsx`):
 * Öğren bir merkez, tur onun üstüne açılan ayrı bir tam ekran. Bu dosya o
 * merkez; tur `/learn/game`de.
 *
 * Bölüm sırası mobille birebir ve bir cümle kuruyor: bugün ne yapacağım
 * (kahraman) → nerede duruyorum (seviye şeridi) → bugün ne kazanabilirim
 * (görevler) → arkadaşlarım ne yapıyor → başka ne var (öne çıkan + daha
 * fazlası).
 */

export type LearnHubData = {
  level: string;
  mastered: number;
  totalWords: number;
  xp: number;
  streak: number;
  dailyGoal: number;
  reviewsToday: number;
  /**
   * BUGÜNÜN SAYISI GERÇEKTEN OKUNDU MU.
   *
   * Hedef şeridi `reviewsToday/dailyGoal` yazıyor ve iki sayı AYRI okumadan
   * geliyor: hedef profilden, bugünkü tekrar ilerleme okumasından. İlerleme
   * okuması patladığında `reviewsToday` sıfıra düşüyor ve şerit "0/20"
   * yazıyordu — on beş tekrar yapmış kullanıcıya "bugün hiç çalışmadın"
   * demek. Android'de bu ayrım baştan beri var (`LearnScreen` `hasToday =
   * me?.reviewsToday !== undefined`) ve orada şerit hiç çizilmiyor.
   */
  hasToday: boolean;
  dueCount: number;
  /** Turda bugün KALAN yeni kelime — rozet (bkz. session `newWordsLeft`). */
  newLeft: number;
  /** Kursun deneme sınavı kataloğu var mı — yoksa o kama hiç çizilmez. */
  hasMockExams: boolean;
  /** Mikrofon gerektiren yürüyüş modu bu tarayıcıda mümkün mü. */
  canWalk: boolean;
  /** İlk hafta seviye önerisi (seviye testi v2, lib/placement-nudge); yoksa null. */
  nudge?: { direction: "up" | "down"; from: string; to: string } | null;
  /** Seviye ilerlemesi: hazırlık ve onaylı geçiş (lib/level-readiness); okunamazsa null. */
  levelStatus?: LevelProgressData | null;
};

export function LearnHub({ data }: { data: LearnHubData }) {
  const t = useT();
  const { dailyGoal, reviewsToday, hasToday, dueCount, newLeft } = data;
  const goalPct = dailyGoal ? Math.min(100, Math.round((reviewsToday / dailyGoal) * 100)) : 0;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <LearnHeader />

      {/*
        GÜNLÜK TUR — dil-içerik öncelikli kahraman.

        Tek düğme, tek karar. "Kaldığın yerden devam et" ile "yeni tura başla"
        ayrımı buradan kalktı: tur zaten sunucuda saklanıyor ve `/learn/game`
        açılınca kaldığı yerden sürüyor — mobildeki davranışın aynısı. İki
        düğme, kullanıcıya sistemin kendi muhasebesini sordurmaktı.
      */}
      <Link
        href="/learn/game"
        className="pressable relative mb-5 block overflow-hidden rounded-card glow-tint-lg"
        style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
      >
        {/* Kısa rozetler — kartın sağ üstünde. Bugün ne birikmiş, tek bakışta. */}
        {dueCount > 0 || newLeft > 0 ? (
          <div className="absolute right-3 top-3 z-10 flex gap-1.5">
            {dueCount > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-micro">
                <ReviewIcon size={13} /> {t("learn.due_count", { n: dueCount })}
              </span>
            ) : null}
            {newLeft > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-micro">
                <NewWordsIcon size={13} /> {t("learn.new_count", { n: newLeft })}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-end gap-3 p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-tile bg-white/20">
                <DailyRoundIcon size={22} />
              </span>
              <span className="text-micro uppercase tracking-eyebrow opacity-80">{t("learn.daily_round")}</span>
            </div>
            <p className="text-h1">{t("learn.practice_your_words")}</p>
<p className="mt-1 text-body opacity-90">{t("learn.daily_pitch")}</p>
            <span
              className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-strong"
              style={{ background: "#ffffff", color: "var(--on-brand-inv)" }}
            >
              {t("common.start")} <ForwardIcon size={18} />
            </span>
          </div>
          {/*
            ERDİ'NİN TEK YERİ (2026-09-22, Samet'in kararı). Maskot ürünün
            hiçbir yerinde oynamıyor — turun içinde de değil; yalnız bu kutuda.
            Kutunun kendisi zaten "günlük tur" demek, yani karakter davetin
            parçası; tur başlayınca ekranda kalmıyor.
            `aria-hidden` gerekmiyor: `Mascot` süs olduğunu kendi içinde
            söylüyor. Kart metni dar telefonda daralmasın diye maskot
            `shrink-0` ve yalnız orta boy ekrandan itibaren görünüyor.
          */}
          {/* 12 px aşağıda: ayaklar kartın iç boşluğuna iniyor, Nomi kartın zeminine basıyor. */}
          <Mascot mood="idle" size={MASCOT_CARD} className="-mb-3 hidden shrink-0 sm:block" />
        </div>

        {/*
          Hedef şeridi kahramanın İÇİNDE ve veri gelmese de aynı yeri kaplıyor:
          dışarıda olsaydı kart yükleme sonrası uzayıp altındaki her şeyi aşağı
          iterdi.
        */}
        {hasToday && dailyGoal > 0 ? (
          <div className="px-5 pb-4">
            <div className="mb-1.5 flex justify-between text-micro opacity-85">
              <span>{t("learn.daily_goal")}</span>
              <span className="tabular-nums">
                {goalCount(reviewsToday, dailyGoal)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "color-mix(in srgb, currentColor 30%, transparent)" }}>
              <div
                className="bar-fill h-full rounded-full"
                style={{ ...fillStyle(barPct(goalPct, 3)), background: "currentColor" }}
              />
            </div>
          </div>
        ) : null}
      </Link>

      {/*
        BURADAN KALDIRILDI: "A1 · 128 kelime öğrenildi" + XP + ilerleme çubuğu.

        Üç sayının üçü de başka yerde ve daha doğru yerde duruyor — seviye ve
        öğrenilen kelime Gelişim'de, XP profilde ve sıralamada. Ana sekmenin
        işi bir sonraki adımı göstermek; sayaç okumak değil. Mobilde de aynı
        kart kaldırıldı, iki uygulama yine aynı.
      */}
      {/* GÜNÜN GÖREVLERİ — gömülü, ayrı ekran yok.
          Yanında "bugünkü plan" satırı da vardı; mobilin Öğren ekranında öyle
          bir yüzey yok ve söylediği şey (sıradaki konuşma) zaten Patika'nın öne
          çıkan ünite kartında yazıyor. İki yerde duran bir cümle, bölüm
          sırasını mobilden ayırmaya değmiyordu. */}
      {/* İlk hafta seviye önerisi: yalnız sunucu önerdiğinde (mobil `PlacementNudge` aynı yerde). */}
      {data.nudge ? <PlacementNudge nudge={data.nudge} /> : null}
      {/* Seviye ilerlemesi (docs/plan/level-progress.md); mobil `LevelProgress` aynı yerde. */}
      {data.levelStatus ? <LevelProgress status={data.levelStatus} /> : null}
      <div className="mb-5">
        <QuestCard />
      </div>

      {/* Bu haftanın ortak görevi/daveti varsa tek satır nabız; yoksa hiç çizilmez. */}
      <FriendPulse />

      {/* ÖNE ÇIKAN — iki kama: yürüyüş modu (farklılaştırıcı) ve sınav hazırlık
          (acıyı dindiren). İkisi de kursa/cihaza bağlı; yoksa bölüm hiç yok. */}
      {data.canWalk || data.hasMockExams ? (
        <section className="mb-5 mt-2">
          <h2 className="mb-2 ml-1 text-h3">{t("learn.featured")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.canWalk ? (
              <Wedge
                href="/learn/walk"
                tone="var(--color-violet-500)"
                icon={<WalkIcon size={24} />}
                title={t("learn.walk_mode")}
                pitch={t("learn.walk_pitch")}
              />
            ) : null}
            {data.hasMockExams ? (
              <Wedge
                href="/mock-exams"
                tone="var(--color-flame-500)"
                icon={<MockExamIcon size={24} />}
                title={t("learn.mock_exams")}
                pitch={t("learn.mock_exams_pitch")}
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {/* DİĞER ÖĞRENME YOLLARI */}
      <h2 className="mb-2 ml-1 text-h3">{t("learn.more")}</h2>
      {/* MİN DEĞERİ WEB'DE 360, MOBİLDE 380 ve bu bilerek: iki taraf da aynı
          şeyi istiyor (yer varsa iki sütun) ama ölçüyü farklı şeye karşı
          alıyor. Mobilde ölçü CİHAZ genişliği; web'de bu sayfa 48rem'de
          (768 px) sabit ve iki kez 380 artı boşluk 784 ediyor - on altı
          piksel yüzünden ızgara HER ZAMAN tek sütun kalıyordu. 360 ile iki
          sütun sığıyor; telefonda kap zaten dar olduğu için tek sütun. */}
      <CardGrid min={360} className="mb-5">
        <Action
          href="/learn/practice"
          tone="var(--color-brand-500)"
          icon={<PracticeIcon size={24} />}
          title={t("learn.practice")}
          sub={t("learn.practice_one_game_with_your_own")}
        />
        <Action
          href="/learn/weekly"
          tone="var(--color-mint-500)"
          icon={<WeeklyTestIcon size={24} />}
          title={t("learn.weekly_quiz")}
          sub={t("learn.test_what_you_ve_learned_weekly")}
        />
        {/* Hayatta kalma §11.199'da Android'e de geldi; simge iki tarafta
            aynı (`SurvivalIcon`). Önce "web'e özel bir mod" diye yazılıydı
            ve o gerekçe artık doğru değil. */}
        <Action
          href="/learn/challenge"
          tone="var(--color-rose-500)"
          icon={<SurvivalIcon size={24} />}
          title={t("learn.survival")}
          sub={t("learn.survival_pitch")}
        />
        {/* Seviye sınavı 2026-09-25'te Patika'ya taşındı: Patika'nın Sınav
            adımı (modül sınavlarıyla birlikte), bkz. immersion-hub. Öğren'de
            yalnız deneme sınavları kalıyor (docs/premium/README.md §2). */}
      </CardGrid>
    </div>
  );
}

/** Öne çıkan kama — renkli kenarlık + dolu ikon karosu. */
function Wedge({
  href,
  tone,
  icon,
  title,
  pitch,
}: {
  href: string;
  tone: string;
  icon: ReactNode;
  title: string;
  pitch: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      /* Kenar NÖTR (`.card` hairline'ı); renk yalnız ikon karosunda
         (2026-09-29 Samet: seçim B — renkli kenarlıklı kart yok). */
      className="pressable card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4"
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-tile text-white glow-tint-sm"
        style={{ background: tone, "--tint-fill": tone } as React.CSSProperties}
      >
        {icon}
      </span>
      <span>
        <span className="block text-h3">{title}</span>
        <span className="muted block text-caption">{pitch}</span>
      </span>
    </Link>
  );
}

/** "Daha fazlası" satırı — dolu ikon karosu + başlık + açıklama + ok. */
function Action({
  href,
  tone,
  icon,
  title,
  sub,
}: {
  href: string;
  tone: string;
  icon: ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <Link href={href} prefetch={false} className="pressable card flex items-center gap-3 p-4">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile text-white glow-tint-sm"
        style={{ background: tone, "--tint-fill": tone } as React.CSSProperties}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-h3">{title}</span>
        <span className="muted block text-caption">{sub}</span>
      </span>
      <ForwardIcon size={20} style={{ color: "var(--text-muted)" }} className="shrink-0" />
    </Link>
  );
}

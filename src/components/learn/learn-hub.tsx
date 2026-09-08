"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Mascot } from "@/components/mascot";
import { QuestCard } from "@/components/quest-card";
import { PlanCard } from "@/components/plan-card";
import { FriendPulse } from "@/components/social/friend-pulse";
import { CardGrid } from "@/components/layout";
import { LearnHeader } from "@/components/app-header";
import { useT } from "@/lib/i18n/client";
import {
  ArrowRightIcon,
  BoltIcon,
  CrownIcon,
  ExamIcon,
  HeartIcon,
  PodiumIcon,
  RefreshIcon,
  TargetIcon,
  WalkIcon,
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
  dueCount: number;
  newToday: number;
  /** Kursun deneme sınavı kataloğu var mı — yoksa o kama hiç çizilmez. */
  hasMockExams: boolean;
  /** Mikrofon gerektiren yürüyüş modu bu tarayıcıda mümkün mü. */
  canWalk: boolean;
};

const nf = new Intl.NumberFormat("tr-TR");

export function LearnHub({ data, leaderboard }: { data: LearnHubData; leaderboard?: ReactNode }) {
  const t = useT();
  const { level, mastered, totalWords, xp, streak, dailyGoal, reviewsToday, dueCount, newToday } = data;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;
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
        className="pressable relative mb-5 block overflow-hidden rounded-card shadow-soft-lg"
        style={{ background: "var(--color-brand-500)" }}
      >
        {/* Kısa rozetler — kartın sağ üstünde. Bugün ne birikmiş, tek bakışta. */}
        {dueCount > 0 || newToday > 0 ? (
          <div className="absolute right-3 top-3 z-10 flex gap-1.5">
            {dueCount > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-micro text-white">
                <RefreshIcon size={13} /> {t("learn.due_count", { n: dueCount })}
              </span>
            ) : null}
            {newToday > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-micro text-white">
                <BoltIcon size={13} /> {t("learn.new_count", { n: newToday })}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-end gap-3 p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-tile bg-white/20 text-white">
                <BoltIcon size={22} />
              </span>
              <span className="text-micro uppercase tracking-widest text-white/80">{t("learn.daily_round")}</span>
            </div>
            <p className="text-h1 text-white">{t("learn.practice_your_words")}</p>
<p className="mt-1 text-body text-white/90">{t("learn.daily_pitch")}</p>
            <span
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-strong"
              style={{ color: "var(--color-brand-600)" }}
            >
              {t("common.start")} <ArrowRightIcon size={18} />
            </span>
          </div>
          {/*
            Erdi'nin üç hâli: seri duruyorsa keyfi yerinde, seri KIRILMIŞSA
            uyuyor, hiç oynamamışsa el sallıyor. Ayrım birikimde — puanı olup
            serisi kopmuş kişi dönen kullanıcıdır, uyku klibi onun resmi.
          */}
          <Mascot mood={streak > 0 ? "happy" : xp > 0 ? "sleep" : "idle"} size={66} className="shrink-0" />
        </div>

        {/*
          Hedef şeridi kahramanın İÇİNDE ve veri gelmese de aynı yeri kaplıyor:
          dışarıda olsaydı kart yükleme sonrası uzayıp altındaki her şeyi aşağı
          iterdi.
        */}
        {dailyGoal > 0 ? (
          <div className="px-5 pb-4">
            <div className="mb-1.5 flex justify-between text-micro text-white/85">
              <span>{t("learn.daily_goal")}</span>
              <span className="tabular-nums">
                {reviewsToday}/{dailyGoal}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-500"
                style={{ width: `${Math.max(3, goalPct)}%` }}
              />
            </div>
          </div>
        ) : null}
      </Link>

      {/* Dil ilerlemesi — sade bir satır, fitness metresi değil. */}
      <div className="card mb-5 p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="rounded-chip px-2.5 py-1 text-strong"
              style={{
                background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              {level}
            </span>
            <span className="truncate text-strong">{t("learn.words_learned", { n: nf.format(mastered) })}</span>
          </div>
          <span className="muted shrink-0 text-caption tabular-nums">{nf.format(xp)} XP</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${Math.max(3, pct)}%`, background: "var(--color-mint-500)" }}
          />
        </div>
      </div>

      {/* GÜNÜN GÖREVLERİ — gömülü, ayrı ekran yok. Planla birlikte: biri ne
          kazanılacağını, diğeri sıradaki adımı söylüyor. */}
      <div className="mb-5 space-y-3">
        <QuestCard />
        <PlanCard />
      </div>

      {/* Bu haftanın ortak görevi/daveti varsa tek satır nabız; yoksa hiç çizilmez. */}
      <FriendPulse />

      {/* ÖNE ÇIKAN — iki kama: yürüyüş modu (farklılaştırıcı) ve sınav hazırlık
          (acıyı dindiren). İkisi de kursa/cihaza bağlı; yoksa bölüm hiç yok. */}
      {data.canWalk || data.hasMockExams ? (
        <section className="mb-5 mt-2">
          <h2 className="muted mb-3 text-h3">{t("learn.featured")}</h2>
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
                icon={<ExamIcon size={24} />}
                title={t("learn.mock_exams")}
                pitch={t("learn.mock_exams_pitch")}
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {/* DİĞER ÖĞRENME YOLLARI */}
      <h2 className="muted mb-3 text-h3">{t("learn.more")}</h2>
      <CardGrid min={380} className="mb-5">
        <Action
          href="/learn/practice"
          tone="var(--color-brand-500)"
          icon={<TargetIcon size={24} />}
          title={t("learn.practice")}
          sub={t("learn.practice_one_game_with_your_own")}
        />
        <Action
          href="/learn/daily"
          tone="var(--color-sky-500)"
          icon={<PodiumIcon size={24} />}
          title={t("learn.daily_round_2")}
          sub={t("learn.same_challenge_for_everyone_get")}
        />
        <Action
          href="/learn/weekly"
          tone="var(--color-mint-500)"
          icon={<CrownIcon size={24} />}
          title={t("learn.weekly_quiz")}
          sub={t("learn.test_what_you_ve_learned_weekly")}
        />
        {/*
          Hayatta kalma mobilde YOK — web'e özel bir mod. Parite "webde fazla
          olanı at" demek değil; mobilin düzenine oturttuk, yerini korudu.
        */}
        <Action
          href="/learn/challenge"
          tone="var(--color-rose-500)"
          icon={<HeartIcon size={24} />}
          title={t("learn.survival")}
          sub={t("learn.survival_pitch")}
        />
      </CardGrid>

      {leaderboard}
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
      className="pressable card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4"
      style={{ borderColor: tone, borderWidth: 1.5 }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-tile text-white shadow-soft-sm"
        style={{ background: tone }}
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
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile text-white shadow-soft-sm"
        style={{ background: tone }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-h3">{title}</span>
        <span className="muted block text-caption">{sub}</span>
      </span>
      <ArrowRightIcon size={20} style={{ color: "var(--text-muted)" }} className="shrink-0" />
    </Link>
  );
}

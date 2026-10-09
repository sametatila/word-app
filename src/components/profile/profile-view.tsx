"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { AvatarStage, derivedAvatar } from "@/components/avatar";
import { BadgeIcon, TIER_COLOR } from "@/components/achievement-badge";
import { achievementHref } from "@/lib/achievement-groups";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";
import { SkeletonLine } from "@/components/skeleton";
import { useShell } from "@/components/app-shell";
import { supportsMockExams } from "@/lib/mock-exams";
import { courseName } from "@/lib/courses";
import { useAvatar } from "@/lib/avatar";
import { parseAvatar } from "@/lib/avatar-config";
import { social, tierKey, type LeagueView } from "@/lib/social/client";
import { ReferralCard } from "@/components/referral-card";
import type { ReferralStats } from "@/lib/premium/referral-types";
import { SettingsIcon, BackIcon, ChevronNextIcon, CorrectIcon, EditIcon, MyWordsIcon, MyWritingsIcon, PremiumIcon, StreakIcon } from "@/components/icons";

/**
 * PROFİL — "sen" ekranı, mobil `ProfileScreen` ile aynı kurgu (2026-09-28,
 * Samet'in kararı; taslak F2, `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Üstte SAHNE (`AvatarStage`): avatarın arka planı ve büyük Nomi. İçerik
 * sahnenin üstüne bir kâğıt gibi biniyor: ad ve "Avatarı düzenle", seri · XP ·
 * lig tek satırda, Gelişim, son başarımlar, Premium.
 *
 * KALKANLAR: menü (Başarımlar, Haftalık sıralama, Arkadaşlar, Gelen kutusu,
 * Davet), Çıkış yap ve Hesabı sil. Yeni yerleri: başlıktaki zil, Topluluk
 * sekmesi, Ayarlar.
 */
export type ProfileStats = {
  name: string;
  streak: number;
  xp: number;
  premium: boolean;
  username: string | null;
  /** Ustalaşılan kelime — Gelişim kutusunun sayısı. */
  mastered: number;
  /** Davet kodu ve katılan sayısı; misafirde ve okunamazsa null (kart çizilmiyor). */
  referral: ReferralStats | null;
};

type Ach = { id: string; title: string; tier: string; glyph: string; unlocked: boolean; unlockedAt?: string | null };

export function ProfileView({ stats }: { stats: ProfileStats }) {
  const { userId, avatar, course } = useShell();
  const t = useT();
  const lang = useLang();
  const cfg = useAvatar() ?? parseAvatar(avatar) ?? derivedAvatar(userId || stats.name);
  const [league, setLeague] = useState<LeagueView | null>(null);
  const [ach, setAch] = useState<{ rows: Ach[]; unlockedCount: number; total: number } | null>(null);
  /* Başarım satırı gelene kadar yeri İSKELETLE tutuluyor: sonradan araya
     girip Premium kartını ve daveti aşağı itiyordu (QA F-0070 sınıfı; mobil
     `ProfileScreen` aynı). İstek düşerse satır kalkıyor. */
  const [achFailed, setAchFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    social.league().then((l) => { if (alive) setLeague(l); }).catch(() => {});
    apiFetch("/api/achievements", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return;
        if (d && Array.isArray(d.rows) && typeof d.total === "number") setAch({ rows: d.rows, unlockedCount: d.unlockedCount ?? 0, total: d.total });
        else setAchFailed(true);
      })
      .catch(() => { if (alive) setAchFailed(true); });
    return () => { alive = false; };
  }, []);

  const sub = [stats.username ? `@${stats.username}` : null, courseName(course, lang)].filter(Boolean).join(" · ");
  const myRank = league?.rows.find((r) => r.isMe)?.rank ?? null;
  const recent = (ach?.rows ?? [])
    .filter((a) => a.unlocked)
    .sort((a, b) => String(b.unlockedAt ?? "").localeCompare(String(a.unlockedAt ?? "")))
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-card">
        <AvatarStage config={cfg} height={300} inset={28}>
          <div className="absolute inset-x-3 top-3 flex justify-between">
            <Link href="/learn" prefetch={false} aria-label={t("common.back")} className="pressable flex h-11 w-11 items-center justify-center rounded-tile" style={{ background: "var(--surface)", color: "var(--text)" }}>
              <BackIcon size={22} />
            </Link>
            <Link href="/profile/settings" prefetch={false} aria-label={t("settings.settings")} className="pressable flex h-11 w-11 items-center justify-center rounded-tile" style={{ background: "var(--surface)", color: "var(--text)" }}>
              {/* Dişli, anahtar değil: ayarların anlam ikonu `SettingsIcon`. */}
              <SettingsIcon size={22} />
            </Link>
          </div>
        </AvatarStage>
      </div>

      {/* KÂĞIT — sahnenin üstüne biniyor. */}
      <div className="relative -mx-4 -mt-7 space-y-5 rounded-t-[1.75rem] px-4 pt-4 sm:mx-0" style={{ background: "var(--bg)" }}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-h1">{stats.name}</h1>
            {sub ? <p className="muted truncate text-caption">{sub}</p> : null}
          </div>
          <Link
            href="/profile/avatar"
            prefetch={false}
            className="pressable glow-tint-sm flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-strong"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
          >
            <EditIcon size={16} />
            {t("profile.edit_avatar")}
          </Link>
        </div>

        {/* SERİ · XP · LİG — tek kart, üç sütun. Lig sütunu Topluluk › Lig'i açıyor. */}
        <div className="card grid grid-cols-3 divide-x divide-[color:var(--hairline)]">
          <div className="flex flex-col items-center py-3">
            <span className="flex items-center gap-1 text-h2"><StreakIcon size={18} style={{ color: "var(--color-flame)" }} />{stats.streak}</span>
            <span className="muted truncate text-caption">{t("profile.day_streak")}</span>
          </div>
          <div className="flex flex-col items-center py-3">
            <span className="text-h2">{formatNumber(stats.xp, lang)}</span>
            <span className="muted truncate text-caption">{t("profile.total_xp")}</span>
          </div>
          <Link href="/friends?tab=league" prefetch={false} className="pressable flex flex-col items-center py-3">
            <span className="flex items-center gap-1.5 text-h2">
              <span aria-hidden className="inline-block h-4 w-3.5" style={{ background: TIER_COLOR.gold, borderRadius: "4px 4px 8px 8px" }} />
              {myRank ? `${myRank}.` : "–"}
            </span>
            <span className="muted truncate text-caption">{league ? t(tierKey(league.tier)) : t("leaderboard.league")}</span>
          </Link>
        </div>

        {/* GELİŞİM — seri 0 olunca alev kayboluyordu ve buraya giden tek yol oydu. */}
        <section className="space-y-2">
          <Head title={t("appheader.progress")} href="/profile/progress" action={t("profile.see_all")} />
          <div className="grid grid-cols-3 gap-2">
            <Tile href="/words" icon={<MyWordsIcon size={18} />} value={formatNumber(stats.mastered, lang)} label={t("profile.my_words")} />
            <Tile href="/profile/cando" icon={<CorrectIcon size={18} />} label={t("profile.what_can_i_do")} />
            <Tile href="/profile/writings" icon={<MyWritingsIcon size={18} />} label={t("profile.my_posts")} />
          </div>
        </section>

        {/* SON BAŞARIMLAR — en yeni üç. Her rozet duvarı KENDİSİNE kaydırarak açıyor
            (`achievementHref`); duvarın başına düşmek "neden buraya geldim" dedirtiyordu. */}
        <section className="space-y-2">
          <Head title={t("profile.achievements")} href="/profile/achievements" action={ach ? `${ach.unlockedCount}/${ach.total}` : t("profile.see_all")} />
          {!ach && !achFailed ? (
            <div role="status" aria-busy="true" aria-label={t("common.loading")} className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="flex flex-col items-center gap-1.5">
                  <span className="h-14 w-14 animate-pulse rounded-full surface-2" />
                  <SkeletonLine variant="micro" width="70%" />
                </span>
              ))}
            </div>
          ) : recent.length ? (
            <div className="grid grid-cols-3 gap-2">
              {recent.map((a) => (
                <Link key={a.id} href={achievementHref(a.id)} prefetch={false} className="pressable flex flex-col items-center gap-1.5 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: TIER_COLOR[a.tier] ?? TIER_COLOR.bronze, color: "#fff" }}>
                    <BadgeIcon glyph={a.glyph} size={26} />
                  </span>
                  <span className="muted line-clamp-2 text-micro">{a.title}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        {/* PREMIUM — üyeye abonelik satırı, olmayana tek kart. */}
        {stats.premium ? (
          <Link href="/premium?from=profile" prefetch={false} className="card pressable flex items-center gap-3 p-4">
            <PremiumIcon size={22} style={{ color: "var(--color-flame)" }} />
            <span className="min-w-0 flex-1">
              <span className="block text-strong">{t("profile.premium_member")}</span>
              <span className="muted block text-caption">{t("profile.all_features_unlocked_thank_you")}</span>
            </span>
            <ChevronNextIcon size={20} style={{ color: "var(--text-faint)" }} />
          </Link>
        ) : (
          <Link
            href="/premium?from=profile"
            prefetch={false}
            className="pressable glow-tint flex items-center gap-3 rounded-card p-4"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)", "--tint-fill": "var(--brand-fill)" } as React.CSSProperties}
          >
            <PremiumIcon size={24} />
            <span className="min-w-0 flex-1">
              <span className="block text-h3">{t("profile.go_premium")}</span>
              <span className="block text-caption" style={{ opacity: 0.85 }}>{t(supportsMockExams(course) ? "profile.premium_band_exams" : "profile.premium_band")}</span>
            </span>
            <ChevronNextIcon size={22} />
          </Link>
        )}

        {/* DAVET Premium ekranından buraya taşındı (paywall yeniden tasarımı,
            2026-09-29): davetin karşılığı arkadaşlık bağı, satın almayla ilgisi yok. */}
        {stats.referral ? <ReferralCard referral={stats.referral} /> : null}
      </div>
    </div>
  );
}

function Head({ title, href, action }: { title: string; href: string; action: string }) {
  return (
    <div className="flex items-baseline justify-between px-1">
      <h2 className="text-h3">{title}</h2>
      <Link href={href} prefetch={false} className="text-strong" style={{ color: "var(--color-brand)" }}>
        {action} ›
      </Link>
    </div>
  );
}

function Tile({ href, icon, value, label }: { href: string; icon: React.ReactNode; value?: string; label: string }) {
  return (
    <Link href={href} prefetch={false} className="card pressable flex min-h-24 flex-col gap-1.5 p-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-tile" style={{ background: "var(--brand-tint)", color: "var(--color-brand)" }}>{icon}</span>
      {value !== undefined ? <span className="text-h3">{value}</span> : null}
      <span className="muted line-clamp-2 text-caption">{label}</span>
    </Link>
  );
}

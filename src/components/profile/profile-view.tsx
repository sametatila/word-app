"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MyAvatar } from "@/components/my-avatar";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { BackButton } from "@/components/page-back";
import { authApi } from "@/lib/auth/api";
import {
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  CrownIcon,
  FlameIcon,
  HandshakeIcon,
  LearnIcon,
  MailIcon,
  PenIcon,
  PodiumIcon,
  SparkIcon,
  TrophyIcon,
  UserIcon,
  WrenchIcon,
} from "@/components/icons";

/**
 * Profil — "ben" ekranı, mobil `ProfileScreen` yerleşiminde.
 *
 * Web'de profil bir PANO idi: kimlik şeridi, seviye kartı, iki haftalık ritim,
 * yetkinlik paneli, rozet duvarı ve beş satırlık bir menü — hepsi alt alta.
 * İki sorun vardı.
 *
 * Biri uzunluk: rozet duvarı ve ilerleme blokları tek sayfada üst üste
 * biniyordu ve "ayarlara gitmek" için üç ekran boyu kaydırmak gerekiyordu.
 * Mobilde bunların her biri KENDİ ekranı ve profil onların kapısı.
 *
 * Diğeri eksiklik: mobildeki on satırın beşi web'de hiç yoktu (avatar,
 * başarımlar, sıralama, gelen kutusu, ilerleme) ve ÇIKIŞ YAP da yoktu —
 * çıkmak için Ayarlar'ın en altına inmek gerekiyordu.
 *
 * Sıra mobildeki sıra: kim → ne biriktirdim (dört karo) → premium → nereye
 * gidebilirim → çıkış.
 */

export type ProfileStats = {
  name: string;
  email: string | null;
  streak: number;
  xp: number;
  mastered: number;
  /** Bu haftaki çalışma süresi (saniye). */
  seconds: number;
  premium: boolean;
};

const nf = new Intl.NumberFormat("tr-TR");

/** "1 sa 20 dk" / "45 dk" — mobil `formatDuration` ile aynı biçim. */
function formatDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} sa ${rest} dk` : `${h} sa`;
}

export function ProfileView({ stats }: { stats: ProfileStats }) {
  const router = useRouter();
  const [confirmOut, setConfirmOut] = useState(false);

  async function signOut() {
    setConfirmOut(false);
    try {
      await authApi("sign-out", {});
    } catch {
      /* oturum zaten düşmüş olabilir; yönlendirme yine doğru yer */
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <BackButton fallback="/learn" />
        <h1 className="flex-1 text-h2">Profil</h1>
        {/*
          Ayarlar dişlisi geri düğmesiyle AYNI ölçüde ve simetri kasıtlı:
          başlığı iki uçtaki eşit düğme ortalıyor. Mobilde de böyle.
          `HeaderAction` bir <button>; burada bağlantı gerektiği için aynı
          sınıflar doğrudan veriliyor (bağlantı içine buton konmaz).
        */}
        <Link
          href="/profile/settings"
          prefetch={false}
          aria-label="Ayarlar"
          className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          <WrenchIcon size={22} />
        </Link>
      </div>

      {/* kimlik kartı */}
      <div className="card mb-4 flex flex-col items-center p-5">
        <Link href="/profile/avatar" prefetch={false} aria-label="Avatarını düzenle" className="pressable rounded-full shadow-soft">
          <MyAvatar size={76} />
        </Link>
        <p className="mt-3 text-h2">{stats.name}</p>
        {stats.email ? <p className="muted text-caption">{stats.email}</p> : null}
        <div className="mt-3 flex gap-3">
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-strong"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 16%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            <FlameIcon size={16} /> {stats.streak} gün
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-strong"
            style={{
              background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
              color: "var(--color-brand)",
            }}
          >
            <SparkIcon size={16} /> {nf.format(stats.xp)} XP
          </span>
        </div>
      </div>

      {/* dört karo — mobildeki 2×2 ızgara */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Stat value={nf.format(stats.mastered)} label="Öğrenilen kelime" tone="var(--color-brand)" />
        <Stat value={String(stats.streak)} label="Gün serisi" tone="var(--color-flame)" />
        <Stat value={nf.format(stats.xp)} label="Toplam XP" tone="var(--color-mint)" />
        <Stat value={formatDuration(stats.seconds)} label="Bu hafta süre" tone="var(--color-sky)" />
      </div>

      {/* premium bandı */}
      {stats.premium ? (
        <div
          className="mb-4 flex items-center gap-3 rounded-card p-4"
          style={{ background: "color-mix(in srgb, var(--color-mint-500) 16%, transparent)" }}
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile text-white"
            style={{ background: "var(--color-mint-600)" }}
          >
            <CrownIcon size={26} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-h3" style={{ color: "var(--color-mint)" }}>
              Premium üye
            </span>
            <span className="muted block text-caption">Tüm özellikler açık, teşekkürler</span>
          </span>
          <CheckIcon size={22} style={{ color: "var(--color-mint)" }} />
        </div>
      ) : (
        <Link
          href="/premium?from=profile"
          prefetch={false}
          className="pressable mb-4 flex items-center gap-3 rounded-card p-4 text-white shadow-soft"
          style={{ background: "var(--color-brand-500)" }}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile bg-white/20">
            <CrownIcon size={26} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-h3">Premium&apos;a geç</span>
            <span className="block text-caption text-white/85">Sınırsız konuşma + tam sınav hazırlığı</span>
          </span>
          <ChevronRightIcon size={22} />
        </Link>
      )}

      {/* menü — mobildeki satırların karşılığı */}
      <nav className="card px-4" aria-label="Profil">
        <Row href="/profile/avatar" icon={<UserIcon size={20} />} tone="var(--color-brand-500)" label="Avatarını düzenle" />
        <Row href="/words" icon={<LearnIcon size={20} />} tone="var(--color-brand-500)" label="Kelimelerim" />
        <Row href="/profile/achievements" icon={<TrophyIcon size={20} />} tone="var(--color-flame-500)" label="Başarımlar" />
        <Row href="/profile/cando" icon={<CheckIcon size={20} />} tone="var(--color-mint-500)" label="Yapabildiklerim" />
        <Row href="/profile/progress" icon={<PodiumIcon size={20} />} tone="var(--color-sky-500)" label="İlerlemem" />
        <Row href="/profile/writings" icon={<PenIcon size={20} />} tone="var(--color-sky-500)" label="Yazılarım" />
        <Row href="/leaderboard" icon={<PodiumIcon size={20} />} tone="var(--color-violet-500)" label="Haftalık sıralama" />
        <Row href="/friends" icon={<HandshakeIcon size={20} />} tone="var(--color-mint-500)" label="Arkadaşlar" />
        <Row href="/inbox" icon={<MailIcon size={20} />} tone="var(--color-flame-500)" label="Gelen kutusu" />
        <Row href="/notifications" icon={<BellIcon size={20} />} tone="var(--color-sky-500)" label="Bildirimler" last />
      </nav>

      <button
        type="button"
        onClick={() => setConfirmOut(true)}
        className="pressable mt-4 w-full py-3 text-center text-strong"
        style={{ color: "var(--color-rose)" }}
      >
        Çıkış yap
      </button>

      <ConfirmDialog
        open={confirmOut}
        title="Çıkış yap"
        message="Oturumun kapanacak. İlerlemen kayıtlı kalır, tekrar giriş yapabilirsin."
        confirmLabel="Çıkış yap"
        destructive
        onConfirm={() => void signOut()}
        onCancel={() => setConfirmOut(false)}
      />
    </div>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className="card p-4">
      <p className="text-h1" style={{ color: tone }}>
        {value}
      </p>
      <p className="muted text-caption">{label}</p>
    </div>
  );
}

function Row({
  href,
  icon,
  tone,
  label,
  last,
}: {
  href: string;
  icon: ReactNode;
  tone: string;
  label: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="pressable flex items-center gap-3 py-3"
      style={last ? undefined : { borderBottom: "1px solid var(--hairline)" }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile"
        style={{ background: `color-mix(in srgb, ${tone} 16%, transparent)`, color: tone }}
      >
        {icon}
      </span>
      <span className="flex-1 text-strong">{label}</span>
      <ChevronRightIcon size={20} className="muted shrink-0" />
    </Link>
  );
}

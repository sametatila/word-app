"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MyAvatar } from "@/components/my-avatar";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { BackButton } from "@/components/page-back";
import { authApi } from "@/lib/auth/api";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";
import { useShell } from "@/components/app-shell";
import { inviteText, shareInvite } from "@/lib/share";
import {
  CheckIcon,
  ChevronRightIcon,
  CrownIcon,
  FlameIcon,
  HandshakeIcon,
  MailIcon,
  PodiumIcon,
  ShareIcon,
  SparkIcon,
  TrophyIcon,
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


export function ProfileView({ stats }: { stats: ProfileStats }) {
  const router = useRouter();
  const t = useT();
  const lang = useLang();
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
        <h1 className="flex-1 text-h2">{t("profile.profile")}</h1>
        {/*
          Ayarlar dişlisi geri düğmesiyle AYNI ölçüde ve simetri kasıtlı:
          başlığı iki uçtaki eşit düğme ortalıyor. Mobilde de böyle.
          `HeaderAction` bir <button>; burada bağlantı gerektiği için aynı
          sınıflar doğrudan veriliyor (bağlantı içine buton konmaz).
        */}
        <Link
          href="/profile/settings"
          prefetch={false}
          aria-label={t("settings.settings")}
          className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          <WrenchIcon size={22} />
        </Link>
      </div>

      {/* kimlik kartı */}
      <div className="card mb-4 flex flex-col items-center p-5">
        <Link href="/profile/avatar" prefetch={false} aria-label={t("profile.edit_your_avatar")} className="pressable rounded-full shadow-soft">
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
            <FlameIcon size={16} /> {t("profile.days", { n: stats.streak })}
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-strong"
            style={{
              background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
              color: "var(--color-brand)",
            }}
          >
            <SparkIcon size={16} /> {formatNumber(stats.xp, lang)} XP
          </span>
        </div>
      </div>

      {/* dört karo — mobildeki 2×2 ızgara */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/*
          İKİ SAYI, DÖRT DEĞİL. Profil kimliktir, ölçüm tablosu değil: öğrenilen
          kelime ve toplam süre Gelişim sayfasında zaten var ve burada birebir
          tekrar ediyordu. Kalan ikisi kimliğin parçası ve herkese açık profilde
          de görünüyor (bkz. lib/social/profile).
        */}
        <Stat value={String(stats.streak)} label={t("profile.day_streak")} tone="var(--color-flame)" />
        <Stat value={formatNumber(stats.xp, lang)} label={t("profile.total_xp")} tone="var(--color-mint)" />
      </div>

      {/* premium bandı */}
      {stats.premium ? (
        <div
          className="mb-4 flex items-center gap-3 rounded-card p-4"
          style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)" }}
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile text-white"
            style={{ background: "var(--color-mint-600)" }}
          >
            <CrownIcon size={26} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-h3" style={{ color: "var(--color-mint)" }}>
              {t("profile.premium_member")}
            </span>
            <span className="muted block text-caption">{t("profile.all_features_unlocked_thank_you")}</span>
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
            <span className="block text-h3">{t("profile.go_premium")}</span>
            <span className="block text-caption text-white/85">{t("profile.unlimited_speaking_full_exam")}</span>
          </span>
          <ChevronRightIcon size={22} />
        </Link>
      )}

      {/* menü — mobildeki satırların karşılığı */}
      <nav className="card px-4" aria-label={t("profile.profile")}>
        {/*
          MENÜNÜN KURALI: burada duran şey ya KİMLİĞİN ya da BAŞKALARIYLA
          İLİŞKİN; kendi ölçün /profile/progress sayfasında. Mobil profil
          ekranıyla aynı bölünme.

          Taşınanlar: Kelimelerim (Gelişim'de "kelime ustalığı" kartının
          detayı), Yapabildiklerim, Yazılarım. Kaldırılan: "Avatarını düzenle"
          (avatarın kendisi zaten o sayfayı açıyor) ve "Bildirimler" (içeriği
          ayar; Ayarlar → Uygulama'ya taşındı).
        */}
        <Row href="/profile/achievements" icon={<TrophyIcon size={20} />} tone="var(--color-flame-500)" label={t("profile.achievements")} />
        <Row href="/leaderboard" icon={<PodiumIcon size={20} />} tone="var(--color-sky-500)" label={t("profile.weekly_leaderboard")} />
        <Row href="/friends" icon={<HandshakeIcon size={20} />} tone="var(--color-mint-500)" label={t("profile.friends")} />
        <Row href="/inbox" icon={<MailIcon size={20} />} tone="var(--color-flame-500)" label={t("profile.inbox")} />
        <InviteRow last />
      </nav>

      {/*
        HESAPTAN ÇIKIŞ İKİLİSİ — en altta, birlikte. "Hesabı sil" ayarların
        en üstündeki hesap bölümünde, ad kutusunun hemen altında duruyordu:
        yıkıcı bir eylem, sık kullanılan bir alanın bir dokunuş yanında.
        Yeri burası çünkü çıkış zaten burada, yıkıcı eylem grubun sonunda
        durur ve mağaza kuralları (App Store 5.1.1(v), Play veri silme)
        "kolay bulunur" istiyor. Mobil profil ekranıyla da aynı sıra.
      */}
      <button
        type="button"
        onClick={() => setConfirmOut(true)}
        className="pressable mt-4 w-full py-3 text-center text-strong"
        style={{ color: "var(--color-rose)" }}
      >
        {t("profile.log_out")}
      </button>

      <Link
        href="/account/delete"
        prefetch={false}
        className="pressable muted block w-full py-2 text-center text-caption"
      >
        {t("settings.delete_account")}
      </Link>

      <ConfirmDialog
        open={confirmOut}
        title={t("profile.log_out")}
        message={t("profile.signout_confirm")}
        confirmLabel={t("profile.signout")}
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
      {/* Karo ve şevron mobil `ui/MenuRow.tsx` ile aynı: 38 px karo, tonun
          %13'ü (mobilde `tint + "22"`) ve en sönük katmandaki şevron. */}
      <span
        className="flex shrink-0 items-center justify-center rounded-tile"
        style={{ width: 38, height: 38, background: `color-mix(in srgb, ${tone} 13%, transparent)`, color: tone }}
      >
        {icon}
      </span>
      <span className="flex-1 text-strong">{label}</span>
      <ChevronRightIcon size={20} className="faint shrink-0" />
    </Link>
  );
}

/**
 * Davet satırı — menünün tek DÜĞMESİ, bağlantısı değil.
 *
 * Mobilde de burada duruyor (`ProfileScreen`, "Arkadaşını davet et") ve orada
 * işletim sisteminin paylaşım sayfasını açıyor. Web'de paylaşım sayfası her
 * tarayıcıda yok; olmadığında metin panoya düşüyor ve satır bunu bir süre
 * söylüyor — yoksa dokunuş hiçbir şey yapmamış gibi görünür.
 */
function InviteRow({ last }: { last?: boolean }) {
  const t = useT();
  const lang = useLang();
  const { course } = useShell();
  const [copied, setCopied] = useState(false);

  async function invite() {
    // Davet kodu ödülün tek bağı; okunamazsa bağlantı yine paylaşılıyor.
    let code: string | null = null;
    try {
      const res = await fetch("/api/premium/referral", { cache: "no-store" });
      if (res.ok) code = ((await res.json()) as { code?: string }).code ?? null;
    } catch {
      /* kod olmadan da davet edilebilir */
    }
    if ((await shareInvite(inviteText(lang, course, code))) === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void invite()}
      className="pressable flex w-full items-center gap-3 py-3 text-left"
      style={last ? undefined : { borderBottom: "1px solid var(--hairline)" }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile"
        /* Yazı tema duyarlı tokenden: sabit 500 kendi %16 tinti üstünde açık temada
           2.97 veriyordu, grafik eşiği 3.0 bile değil. Zemin 500 kalıyor. */
        style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)", color: "var(--color-mint)" }}
      >
        <ShareIcon size={20} />
      </span>
      <span className="flex-1 text-strong">{t(copied ? "inv.copied" : "profile.invite_friend")}</span>
      <ChevronRightIcon size={20} className="muted shrink-0" />
    </button>
  );
}

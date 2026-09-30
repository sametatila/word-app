"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { SkeletonLine } from "@/components/skeleton";
import { Row } from "@/components/settings-section";
import { useT } from "@/lib/i18n/client";

/**
 * Ayar iskeletinin parçaları — iki yerden kullanılıyor: rota iskeleti
 * (`profile/settings/skeleton.tsx`) ve kendi verisini çeken bileşenlerin
 * yükleme hâli (`LinkedAccounts`, `ActiveSessions`). İkisi AYNI parçayı
 * çizdiği için rota iskeleti → bileşen iskeleti → içerik geçişinde yükseklik
 * değişmiyor; eskiden bileşenler yüklenirken hiç çizilmiyordu ve sayfa
 * iskeletten sonra boşalıp sonra doluyordu.
 *
 * Yazısı bilinen yer gerçek çeviriyle ve gerçek sınıfla, görünmez çiziliyor
 * (genişlik ve sarılma her dilde gerçeğiyle aynı); veriye bağlı yer çubuk.
 */

/* flow-skeleton `TextSlot` ile aynı zemin; orada metin değil uzunluk alınıyor. */
const slot = (tone: string): CSSProperties => ({
  color: "transparent",
  background: tone,
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
});

/** Bilinen metnin yeri — görünmez yazı, her satırın çubuğu satır içi zemin. */
export function Words({
  text,
  className = "",
  as: Tag = "span",
  tone = "var(--surface-2)",
}: {
  text: string;
  className?: string;
  as?: ElementType;
  /** surface-2 zemin üstünde (tema şeridi) bir ton koyu. */
  tone?: string;
}) {
  return (
    <Tag aria-hidden className={`select-none ${className}`}>
      <span className="animate-pulse rounded-chip" style={slot(tone)}>
        {text}
      </span>
    </Tag>
  );
}

/** Düğme yeri — gerçek sınıfıyla ve gerçek adıyla, görünmez. */
export function Btn({ className, text }: { className: string; text: string }) {
  /* `globals.css` dokunma tabanı `h-9`lu DÜĞMEYE 2.25rem alt sınır veriyor;
     390 px altında `h-9` ondan kısa. Yer tutucu düğme değil, sınırı elle alıyor. */
  const floor = className.includes("h-9") ? { minHeight: "2.25rem" } : {};
  return (
    <span aria-hidden className={`${className} animate-pulse select-none`} style={{ ...floor, background: "var(--surface-2)", color: "transparent" }}>
      {text}
    </span>
  );
}

/** `Switch`: `h-7 w-12` hap; düğmedeki `w-12`ye dokunma tabanı en az 3rem veriyor. */
export function SwitchSlot() {
  return <span aria-hidden className="block h-7 w-12 shrink-0 animate-pulse rounded-full" style={{ minWidth: "3rem", background: "var(--surface-2)" }} />;
}

/** `SettingRow` — null başlık/alt satır: veriye bağlı, çubuk. */
export function SettingRowSlot({ title, sub, children }: { title: string | null; sub?: string | null; children?: ReactNode }) {
  return (
    <div className="setting-row flex flex-wrap items-center gap-x-3 gap-y-2">
      <div className="min-w-[9rem] flex-1">
        {title === null ? <SkeletonLine variant="strong" width="45%" /> : <Words as="p" className="text-strong" text={title} />}
        {sub === undefined ? null : sub === null ? (
          <SkeletonLine variant="caption" width="65%" className="mt-0.5" />
        ) : (
          <Words as="p" className="muted mt-0.5 text-caption leading-snug" text={sub} />
        )}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-1.5">{children}</div> : null}
    </div>
  );
}

/**
 * Giriş yöntemleri listesi (`LinkedAccounts`, `Row` içeriği). En sık durum:
 * parolayla açılmış hesap (tek yöntem), Google açıksa bağlı değil.
 */
export function SignInMethodsSkeleton({ google = true }: { google?: boolean }) {
  const t = useT();
  return (
    <div aria-hidden className="inset-list">
      <SettingRowSlot title={t("links.credential")} sub={t("linked.credential_sub")}>
        <Words className="muted text-caption" text={t("links.only_method")} />
      </SettingRowSlot>
      {google ? (
        <SettingRowSlot title={t("linked.google")} sub={t("links.not_linked")}>
          <Btn className="btn btn-tint h-9 shrink-0 px-3 text-caption" text={t("links.link")} />
        </SettingRowSlot>
      ) : null}
    </div>
  );
}

/** Kapalı `ChangePassword` ve `TwoFactor` satırları (parolalı hesap; iki adım kapalı). */
export function PasswordRowsSkeleton() {
  const t = useT();
  return (
    <>
      <Row label={<Words text={t("settings.sec_password")} />}>
        <div className="flex items-center justify-between gap-3">
          <Words as="p" className="muted text-body leading-snug" text={t("changepw.sub")} />
          <Btn className="btn btn-tint h-9 shrink-0 px-3 text-caption" text={t("changepw.open")} />
        </div>
      </Row>
      <Row label={<Words text={t("settings.sec_two_factor")} />}>
        <div className="flex items-center justify-between gap-3">
          <Words as="p" className="muted text-body leading-snug" text={t("twofa.off_sub")} />
          <Btn className="btn btn-tint h-9 shrink-0 px-3 text-caption" text={t("twofa.enable")} />
        </div>
      </Row>
    </>
  );
}

/** `ActiveSessions` listesinin satırı — bu cihazın oturumu; aygıt ve tarih tipik uzunlukta. */
export function SessionRowSkeleton() {
  const t = useT();
  return (
    <div aria-hidden className="inset-list">
      <SettingRowSlot title="Chrome · macOS" sub={`${t("sessions.since", { date: "01.09.2026" })} · 000.000.000.00`}>
        <Btn className="btn btn-danger-soft h-9 shrink-0 px-3 text-caption" text={t("sessions.revoke")} />
      </SettingRowSlot>
    </div>
  );
}

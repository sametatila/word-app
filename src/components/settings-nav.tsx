"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuRow } from "@/components/menu-row";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { signOutOnDevice } from "@/components/session-keeper";
import { useT } from "@/lib/i18n/client";
import { AccountIcon, InfoIcon, LanguageIcon, LearningSettingsIcon, LogoutIcon, PremiumIcon, PrivacyIcon, RemindersIcon } from "@/components/icons";
import type { SettingsSection } from "@/components/profile-form";

export type SettingsValues = {
  learning: string | null;
  app: string | null;
  account: string | null;
  subscription: string | null;
  version: string;
};

/**
 * Ayarlar çerçevesinin panelleri: `ProfileForm` grupları + web'e özel iki
 * panel. Hatırlatmalar ve Abonelik mobilde ayrı ekran (`Notifications`,
 * `Paywall`); web'de ayarların içinde, solda menü sağda panel (2026-09-29
 * Samet: web ayarlar masaüstü düzeni). Eski adresleri (`/notifications`,
 * `/premium`) çalışıyor.
 */
export type SettingsPanel = SettingsSection | "reminders" | "subscription";

export const SETTINGS_PANEL_HREF = (p: SettingsPanel) => `/profile/settings/${p}`;

/**
 * Adresten açık panel. Liste adresi masaüstünde Öğrenme'yi gösteriyor
 * (`page.tsx`); Güvenlik Hesap'ın alt sayfası, menüde Hesap vurgulu.
 */
export function panelOf(pathname: string | null): SettingsPanel {
  const seg = (pathname ?? "").split("/")[3];
  if (!seg) return "learning";
  if (seg === "security") return "account";
  return seg as SettingsPanel;
}

/**
 * AYARLAR MENÜSÜ — mobil `SettingsScreen` listesinin karşılığı.
 *
 * Sıra Samet'in kararı (2026-09-28): Öğrenme · Uygulama · Hatırlatmalar |
 * Hesap · Gizlilik · Abonelik | Destek ve hakkında | Çıkış yap. Çıkış yap
 * yalnız burada (Profil'den kalktı).
 *
 * İKİ BİÇİM (2026-09-29 Samet: web ayarlar masaüstü düzeni):
 *   - `list` telefonda `/profile/settings`in kendisi: kart + şevron + değer,
 *     mobil ile birebir (`MenuRow`).
 *   - `sidebar` masaüstünde ayarlar düzeninin sol sütunu (`layout.tsx`):
 *     kartsız düz menü, gruplar ince çizgiyle ayrılıyor, açık panel adresten
 *     (`usePathname`) — düzende durduğu için sayfalar arasında yeniden
 *     çizilmiyor, kıpırdamıyor. Değer yok: sütun dar, açık grup zaten sağda.
 */
export function SettingsNav({ values, variant = "list" }: { values?: SettingsValues; variant?: "list" | "sidebar" }) {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const [confirmOut, setConfirmOut] = useState(false);
  const side = variant === "sidebar";
  const on = side ? panelOf(pathname) : null;
  const v: SettingsValues = !side && values ? values : { learning: null, app: null, account: null, subscription: null, version: "" };
  const href = SETTINGS_PANEL_HREF;

  async function signOut() {
    setConfirmOut(false);
    await signOutOnDevice();
    router.push("/login");
    router.refresh();
  }

  /* Grup kabı: telefonda kart, masaüstünde kartsız; gruplar arası ince çizgi.
     Bileşen değil işlev: her çizimde yeni bir bileşen türü satırları yeniden
     kurardı (odak kaybolurdu). */
  const block = (children: ReactNode, first = false) =>
    side ? (
      <div className={`flex flex-col gap-1 ${first ? "" : "mt-2 border-t pt-2"}`} style={first ? undefined : { borderColor: "var(--hairline)" }}>
        {children}
      </div>
    ) : (
      <div className="card px-4">{children}</div>
    );

  return (
    <nav aria-label={t("settings.settings")} className={side ? "flex flex-col" : "space-y-4"}>
      {block(
        <>
          <MenuRow variant={variant} href={href("learning")} active={on === "learning"} icon={<LearningSettingsIcon size={20} />} tone="brand" label={t("settings.group_learning")} value={v.learning} />
          <MenuRow variant={variant} href={href("app")} active={on === "app"} icon={<LanguageIcon size={20} />} tone="sky" label={t("settings.group_app")} value={v.app} />
          <MenuRow variant={variant} href={href("reminders")} active={on === "reminders"} icon={<RemindersIcon size={20} />} tone="flame" label={t("notifications.reminders")} last />
        </>,
        true,
      )}
      {block(
        <>
          <MenuRow variant={variant} href={href("account")} active={on === "account"} icon={<AccountIcon size={20} />} tone="mint" label={t("settings.group_account")} value={v.account} />
          <MenuRow variant={variant} href={href("privacy")} active={on === "privacy"} icon={<PrivacyIcon size={20} />} tone="violet" label={t("settings.group_privacy")} />
          <MenuRow variant={variant} href={href("subscription")} active={on === "subscription"} icon={<PremiumIcon size={20} />} tone="flame" label={t("settings.group_subscription")} value={v.subscription} last />
        </>,
      )}
      {block(<MenuRow variant={variant} href={href("about")} active={on === "about"} icon={<InfoIcon size={20} />} tone="sky" label={t("settings.group_about")} value={v.version || null} last />)}
      {/* Çıkış: telefonda listenin altında ortalı kırmızı yazı (mobil ile aynı),
          masaüstünde menünün son satırı, öteki satırlarla aynı hizada. */}
      {side ? (
        block(<MenuRow variant="sidebar" onClick={() => setConfirmOut(true)} icon={<LogoutIcon size={20} />} tone="rose" label={t("profile.log_out")} danger />)
      ) : (
        <button type="button" onClick={() => setConfirmOut(true)} className="pressable w-full py-3 text-center text-strong" style={{ color: "var(--color-rose)" }}>
          {t("profile.log_out")}
        </button>
      )}
      <ConfirmDialog
        open={confirmOut}
        title={t("profile.log_out")}
        message={t("profile.signout_confirm")}
        confirmLabel={t("profile.signout")}
        destructive
        onConfirm={() => void signOut()}
        onCancel={() => setConfirmOut(false)}
      />
    </nav>
  );
}

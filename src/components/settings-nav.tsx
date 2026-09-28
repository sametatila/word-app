"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuRow } from "@/components/menu-row";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { signOutOnDevice } from "@/components/session-keeper";
import { useT } from "@/lib/i18n/client";
import { BellIcon, BookIcon, ChatIcon, CrownIcon, GlobeIcon, LockIcon, UserIcon } from "@/components/icons";
import type { SettingsSection } from "@/components/profile-form";

export type SettingsValues = {
  learning: string | null;
  app: string | null;
  account: string | null;
  subscription: string | null;
  version: string;
};

/**
 * AYARLAR LİSTESİ — mobil `SettingsScreen` listesinin karşılığı.
 *
 * Telefonda `/profile/settings`in kendisi; masaüstünde her ayar sayfasının sol
 * sütunu (açık grup vurgulu). Sıra Samet'in kararı (2026-09-28): Öğrenme ·
 * Uygulama · Hatırlatmalar | Hesap · Gizlilik · Abonelik | Destek ve hakkında
 * | Çıkış yap. Çıkış yap yalnız burada (Profil'den kalktı).
 */
export function SettingsNav({ values: all, current, compact = false }: { values: SettingsValues; current?: SettingsSection; compact?: boolean }) {
  /* Masaüstü sol sütunu dar: değerler orada etiketi kesiyordu ("Hes…"); açık
     grup zaten sağda. Değerler yalnız telefon listesinde. */
  const values: SettingsValues = compact ? { learning: null, app: null, account: null, subscription: null, version: "" } : all;
  const t = useT();
  const router = useRouter();
  const [confirmOut, setConfirmOut] = useState(false);
  const href = (s: SettingsSection) => `/profile/settings/${s}`;

  async function signOut() {
    setConfirmOut(false);
    await signOutOnDevice();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav aria-label={t("settings.settings")} className="space-y-4">
      <div className="card px-4">
        <MenuRow href={href("learning")} active={current === "learning"} icon={<BookIcon size={20} />} tone="brand" label={t("settings.group_learning")} value={values.learning} />
        <MenuRow href={href("app")} active={current === "app"} icon={<GlobeIcon size={20} />} tone="sky" label={t("settings.group_app")} value={values.app} />
        <MenuRow href="/notifications" icon={<BellIcon size={20} />} tone="flame" label={t("notifications.reminders")} last />
      </div>
      <div className="card px-4">
        <MenuRow href={href("account")} active={current === "account" || current === "security"} icon={<UserIcon size={20} />} tone="mint" label={t("settings.group_account")} value={values.account} />
        <MenuRow href={href("privacy")} active={current === "privacy"} icon={<LockIcon size={20} />} tone="violet" label={t("settings.group_privacy")} />
        <MenuRow href="/premium?from=settings" icon={<CrownIcon size={20} />} tone="flame" label={t("settings.group_subscription")} value={values.subscription} last />
      </div>
      <div className="card px-4">
        <MenuRow href={href("about")} active={current === "about"} icon={<ChatIcon size={20} />} tone="sky" label={t("settings.group_about")} value={values.version || null} last />
      </div>
      <button type="button" onClick={() => setConfirmOut(true)} className="pressable w-full py-3 text-center text-strong" style={{ color: "var(--color-rose)" }}>
        {t("profile.log_out")}
      </button>
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

import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { ProfileForm, type SettingsSection } from "@/components/profile-form";
import { SettingsNav } from "@/components/settings-nav";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";
import { loadSettings } from "../_data";
import { SettingsFrame } from "../frame";

export const dynamic = "force-dynamic";

const SECTIONS: SettingsSection[] = ["learning", "app", "account", "security", "privacy", "about"];
const TITLE: Record<SettingsSection, string> = {
  learning: "settings.group_learning",
  app: "settings.group_app",
  account: "settings.group_account",
  security: "settings.group_security",
  privacy: "settings.group_privacy",
  about: "settings.group_about",
};

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const t = await getT();
  const key = TITLE[section as SettingsSection];
  return { title: t(key ?? "settings.settings") };
}

/** Tek ayar grubu — telefonda yalnız grup, masaüstünde solda liste. */
export default async function SettingsSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!SECTIONS.includes(section as SettingsSection)) notFound();
  const s = section as SettingsSection;
  const t = await getT();
  const r = await loadSettings(s === "account" || s === "privacy");
  if (!r.user) return null;
  if (!r.data) {
    return (
      <FlowColumn>
        <StateBody alert title={t("settingsw.load_failed")} body={t("socialw.try_in_a_moment")}>
          <RetryButton className="btn btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 disabled:opacity-60" />
        </StateBody>
      </FlowColumn>
    );
  }
  const { values, initial, googleEnabled, social } = r.data;
  return (
    <SettingsFrame nav={<SettingsNav values={values} current={s} compact />}>
      <ProfileForm userId={r.user.id} section={s} initial={initial} googleEnabled={googleEnabled} social={social} version={values.version} />
    </SettingsFrame>
  );
}

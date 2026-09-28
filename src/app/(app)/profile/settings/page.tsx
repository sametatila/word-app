import { titleMeta } from "@/lib/page-meta";
import { getT } from "@/lib/i18n/server";
import { ProfileForm } from "@/components/profile-form";
import { SettingsNav } from "@/components/settings-nav";
import { PageBack } from "@/components/page-back";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";
import { loadSettings } from "./_data";
import { SettingsFrame } from "./frame";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("settings.settings");

/**
 * Ayarlar — telefonda grup listesi, masaüstünde liste + ilk grup (Öğrenme).
 * Gruplar kendi adreslerinde: `/profile/settings/<bölüm>`.
 */
export default async function SettingsPage() {
  const t = await getT();
  const r = await loadSettings(false);
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
  const { values, initial, googleEnabled } = r.data;
  return (
    <SettingsFrame nav={<SettingsNav values={values} current="learning" compact />}>
      <div className="md:hidden">
        <PageBack fallback="/profile" title={t("settings.settings")} />
        <SettingsNav values={values} />
      </div>
      <div className="hidden md:block">
        <ProfileForm userId={r.user.id} section="learning" initial={initial} googleEnabled={googleEnabled} />
      </div>
    </SettingsFrame>
  );
}

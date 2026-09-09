import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import { PageBack } from "@/components/page-back";
import { UnitPane } from "@/components/immersion/unit-pane";
import { buildHubUnits } from "@/lib/immersion/hub";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Ünite ayrıntısı — adımların tam listesi.
 *
 * Web'de böyle bir sayfa YOKTU: Patika'da bir üniteye dokununca o ünite "öne
 * çıkan" karta geçiyor ve adımlar yalnız ince bir segment şeridinde
 * görünüyordu. Adımların türü, adı ve durumu hiçbir yerde okunamıyordu.
 * Mobilde ünitenin kendi ekranı baştan beri var (`UnitScreen`).
 *
 * Geniş ekranda Patika aynı gövdeyi kendi sağ panelinde çiziyor; burası
 * telefon ve doğrudan açılan adres için.
 */
export default async function UnitPage({ params }: { params: Promise<{ index: string }> }) {
  const t = await getT();
  const user = await getUserInfo();
  if (!user) return null;

  const index = Number((await params).index);
  if (!Number.isInteger(index) || index < 1) notFound();

  let level: CefrLevel = "A1";
  let course = "de";
  try {
    const profile = await ensureProfile(user.id, user.name);
    if (LEVELS.includes(profile.level as CefrLevel)) level = profile.level as CefrLevel;
    course = profile.course;
  } catch (err) {
    console.error("[unit] profil okunamadı", err);
  }

  const track = await loadTrack(course, level, t);
  const completion = await immersionCompletion(user.id, course);
  const units = buildHubUnits(buildTrackState(track, completion));
  const unit = units.find((u) => u.index === index);
  if (!unit) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageBack fallback="/immersion" title={unit.theme} subtitle={`${level} · ${t("common.unit")} ${unit.index}`} />
      <UnitPane unit={unit} level={level} embedded />
    </div>
  );
}

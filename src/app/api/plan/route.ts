import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { buildPlan } from "@/lib/plan";
import { isNativeLang, DEFAULT_NATIVE } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

/**
 * Bugünkü plan (WP-60): `GET /api/plan?day=YYYY-MM-DD`.
 *
 * ŞU AN ÇAĞIRANI YOK. Tek istemcisi Öğren sekmesindeki "bugünkü plan"
 * satırıydı; mobilin Öğren ekranında öyle bir yüzey olmadığı için parite
 * turunda kaldırıldı (bkz. docs/plan/web-parity.md §7) ve bileşen de silindi.
 * Uç ve `lib/plan` duruyor: e2e onları hâlâ deniyor ve plan mantığı zayıf
 * nokta/beceri önerisiyle ortak. Kalıcı olarak atılıp atılmayacağı ayrı bir
 * karar; sessizce çürümemesi için burada yazılı.
 * Gün istemcinin yerel günü — "bugün yapıldı" işareti ona göre.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const raw = new URL(req.url).searchParams.get("day");
  const day = raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);
  try {
    const profile = await ensureProfile(userId);
    const plan = await buildPlan(userId, day, profile.course, profile.level, profile.dailyGoal, isNativeLang(profile.nativeLang) ? profile.nativeLang : DEFAULT_NATIVE);
    return NextResponse.json(plan, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[plan]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

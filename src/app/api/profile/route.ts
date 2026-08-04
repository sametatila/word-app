import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const patch: Partial<typeof profiles.$inferInsert> = {};
  if (typeof body.displayName === "string") patch.displayName = body.displayName.slice(0, 60);
  if (typeof body.dailyGoal === "number") patch.dailyGoal = clampInt(body.dailyGoal, 5, 120);
  if (typeof body.newPerDay === "number") patch.newPerDay = clampInt(body.newPerDay, 0, 40);
  if (typeof body.level === "string" && ["A1", "A2", "B1", "B2", "C1"].includes(body.level))
    patch.level = body.level;
  if (typeof body.course === "string" && ["de", "gsw-zh"].includes(body.course))
    patch.course = body.course;

  if (!Object.keys(patch).length) return NextResponse.json({ error: "empty" }, { status: 400 });

  try {
    const current = await ensureProfile(userId);

    // Seviye değiştiyse sistem yeni duruma anında uyum sağlar: çalışma seviyesi
    // seçilen yere taşınır, terfi/düşüş puanı sıfırlanır ve zorluk ölçümü
    // baştan başlar. Böylece B1 diyen öğrenci A1'de beklemez, seviyesini
    // düşüren de eski başarısının zorluğuyla karşılaşmaz.
    if (patch.level && patch.level !== current?.activeLevel) {
      patch.activeLevel = patch.level;
      patch.levelScore = 0;
      patch.levelChangedAt = new Date();
    }

    // Kurs seçimi (onboarding ya da profil): ilk seçim kaydedilir; kurs
    // değişiminde zorluk ölçümü sıfırlanır — yeni dilde eski başarı geçmez.
    if (patch.course) {
      if (!current?.courseChosenAt) patch.courseChosenAt = new Date();
      if (patch.course !== current?.course) {
        patch.courseChosenAt = new Date();
        patch.levelScore = 0;
        patch.levelChangedAt = new Date();
      }
    }

    const [updated] = await db
      .update(profiles)
      .set(patch)
      .where(eq(profiles.userId, userId))
      .returning();
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[profile]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function clampInt(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

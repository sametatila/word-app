import { NextResponse } from "next/server";
import { resolveVoice } from "@/lib/tts/voices";
import { eq, sql } from "drizzle-orm";
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
  // Ses, gideceği kursa göre doğrulanıyor: kurs ve ses aynı istekte
  // geliyorsa yeni kurs, gelmiyorsa kayıtlı kurs ölçü alınıyor. Aksi hâlde
  // Zürih'e geçen biri Almanca sesle kalabilirdi.
  if (typeof body.voice === "string") {
    const target = patch.course ?? (await currentCourse(userId));
    patch.voice = resolveVoice(target, body.voice);
  }

  if (!Object.keys(patch).length) return NextResponse.json({ error: "empty" }, { status: 400 });

  try {
    await ensureProfile(userId);

    // Onboarding'in bittiğinin işareti.
    //
    // Bu satır bir refactor sırasında düşmüş ve ortaya sessiz bir döngü
    // çıkmıştı: kullanıcı kursu ve seviyeyi seçiyor, seçimler kaydediliyor,
    // ama işaret konmadığı için düzen onu tekrar onboarding'e gönderiyordu.
    // Form her açılışta varsayılanlarla başladığı için bu, dışarıdan
    // "seçimlerim sıfırlandı" gibi görünüyordu.
    //
    // `coalesce` ile yalnızca ilk kez yazılıyor: sonradan profilden kurs
    // değiştiren biri onboarding'e geri düşmemeli.
    if (patch.course) {
      patch.courseChosenAt = sql`coalesce(${profiles.courseChosenAt}, now())` as never;
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

/** Ses doğrulanırken ölçü alınan kurs — istekte kurs yoksa kayıtlı olan. */
async function currentCourse(userId: string): Promise<string> {
  const [row] = await db
    .select({ course: profiles.course })
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);
  return row?.course ?? "de";
}

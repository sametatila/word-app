import { NextResponse } from "next/server";
import { resolveVoice } from "@/lib/tts/voices";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { proficiencyFor } from "@/lib/proficiency-data";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

/**
 * Profil özeti (WP-50): seviye + beceri yetkinliği + sıradaki en iyi adım.
 * Ayarlar POST'ta; burası yalnız okur.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    const level = (["A1", "A2", "B1", "B2", "C1"].includes(profile.level) ? profile.level : "A1") as CefrLevel;
    const data = await proficiencyFor(userId, profile.course, level);
    return NextResponse.json({ level, ...data }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[profile] yetkinlik", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

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
  // İsim boş bırakılamaz. Zorlama burada duruyor çünkü tek geçit burası:
  // hem ilk giriş ekranı hem profil formu bu uca yazıyor, dolayısıyla
  // arayüz atlansa bile isimsiz bir profil oluşamıyor. Sıralamada "İsimsiz
  // öğrenci" diye görünen kayıtların kaynağı buydu.
  if (typeof body.displayName === "string") {
    const name = body.displayName.trim().replace(/\s+/g, " ");
    if (name.length < 2) return NextResponse.json({ error: "name_required" }, { status: 400 });
    patch.displayName = name.slice(0, 60);
  }
  if (typeof body.dailyGoal === "number") patch.dailyGoal = clampInt(body.dailyGoal, 5, 120);
  if (typeof body.goal === "string" && ["work", "daily", "exam", "swiss"].includes(body.goal)) patch.goal = body.goal;
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
    // Onboarding yalnızca isim de verildiyse bitmiş sayılıyor: aksi hâlde
    // kursu seçip ismi atlayan biri işareti alıp bir daha sorulmuyordu.
    if (patch.course && patch.displayName) {
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

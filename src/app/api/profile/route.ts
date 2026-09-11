import { NextResponse } from "next/server";
import { displayNameAllowed } from "@/lib/moderation";
import { acceptsCourse, acceptsNativeLang, acceptsPair, coursesForNative, nativeOf } from "@/lib/courses";
import { resolveVoice } from "@/lib/tts/voices";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { proficiencyFor } from "@/lib/proficiency-data";
import type { CefrLevel } from "@/lib/skills/types";
import { PROFILE_LIMITS } from "@/lib/profile-limits";

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
    // Görünen ad başkalarına görünür (sıralama, arkadaşlar): bağlantı, e-posta, kontrol
    // karakteri ve küfür kabul edilmez (Play UGC: başkalarına görünen metin için moderasyon).
    if (!displayNameAllowed(name)) return NextResponse.json({ error: "name_invalid" }, { status: 400 });
    patch.displayName = name.slice(0, PROFILE_LIMITS.displayNameMax);
  }
  if (typeof body.dailyGoal === "number") patch.dailyGoal = clampInt(body.dailyGoal, PROFILE_LIMITS.dailyGoal.min, PROFILE_LIMITS.dailyGoal.max);
  if (typeof body.goal === "string" && ["work", "daily", "exam", "swiss"].includes(body.goal)) patch.goal = body.goal;
  if (typeof body.newPerDay === "number") patch.newPerDay = clampInt(body.newPerDay, PROFILE_LIMITS.newPerDay.min, PROFILE_LIMITS.newPerDay.max);
  if (typeof body.level === "string" && ["A1", "A2", "B1", "B2", "C1"].includes(body.level))
    patch.level = body.level;
  // Kabul edilen kurslar kayıt defterinden (lib/courses): literal liste
  // burada ve UI'da ayrı ayrı duruyordu, yeni bir dil eklendiğinde API onu
  // sessizce reddediyordu. `enabled` bayrağı ikisini birlikte açar.
  if (typeof body.course === "string" && acceptsCourse(body.course))
    patch.course = body.course;
  // Anadil (arayüz/anlatım dili) — kurstan ayrı eksen. Cihazda da tutuluyor;
  // burada durmasının sebebi cihaz değiştiren kullanıcının seçimini
  // kaybetmemesi. Serbest metin kabul edilmiyor.
  if (typeof body.nativeLang === "string" && acceptsNativeLang(body.nativeLang))
    patch.nativeLang = body.nativeLang;

  /*
    ÇİFT DOĞRULAMASI — kurs ve anadil ayrı ayrı geçerli olabilir ama BİRLİKTE
    olmayabilir. `nativeLang="en"` + `course="en"` ikisi de tek başına geçerli
    ve sunucu bunu kabul ediyordu: kullanıcı kendi anadilini öğrenmeye başlardı.
    Mobil arayüzü buna izin vermiyordu, web veriyordu; kapı burada olmalıydı.

    İki durum ayrılıyor, çünkü doğru davranış farklı:

      - Kurs AÇIKÇA istendi ve çift geçersiz → REDDET. İstemci hatası ya da
        elle atılmış bir istek; sessizce başka bir kursa taşımak, kullanıcının
        istemediği bir kursa geçmesi olurdu.
      - Yalnız anadil değişti ve kayıtlı kurs geçersiz kaldı → KURSU TAŞI.
        Almanca öğrenen biri arayüzünü Almancaya alırsa kursu listeden düşüyor;
        reddetmek meşru bir dil değişikliğini engellerdi. Mobildeki
        `keepCourseValid` ile aynı davranış.
  */
  if (patch.course || patch.nativeLang) {
    const current = await ensureProfile(userId);
    const native = nativeOf(patch.nativeLang ?? current?.nativeLang);
    const course = String(patch.course ?? current?.course ?? "de");
    if (!acceptsPair(native, course)) {
      if (patch.course) return NextResponse.json({ error: "pair_invalid" }, { status: 400 });
      const next = coursesForNative(native)[0]?.id;
      if (next) patch.course = next;
    }
  }
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
    //
    // KOŞULDA İSİM YOK. `patch.course && patch.displayName` yazıyordu, çünkü
    // onboarding ismi de soruyordu. Ekran artık sormuyor (kayıt formu ve
    // kimlik sağlayıcısı veriyor) ve o hâliyle koşul HİÇ sağlanamıyordu:
    // kullanıcı beş adımı bitiriyor, kurs yazılıyor, işaret konmuyor, düzen
    // onu `/setup`e geri yolluyor — kapalı bir döngü.
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

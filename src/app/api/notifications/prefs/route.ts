import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Hatırlatma tercihleri — mobildeki `NotificationsScreen`in üç anahtarı.
 *
 * Tercih SUNUCUDA duruyor: kullanıcının iki tarayıcısı varsa ikisinde de
 * aynı kararı görmeli. Mobil de aynı ucu çağırıyor (`lib/notifications`
 * `loadPrefs`/`syncPrefs`) - bildirimi cihazda zamanlıyor olması bu uca
 * ihtiyacı kaldırmıyordu: buradaki üç alan varsayılan olarak AÇIK ve
 * hatırlatma turu mobil cihaz jetonlarını da hedefliyor (bkz.
 * `findReminderTargets`), yani uygulamadaki anahtar sunucuya yazılmadığı
 * sürece kapalı görünürken push gitmeye devam ediyordu.
 *
 * SAAT KULLANICININ KENDİ SAATİ. `profiles.timezone` ile birlikte
 * okunuyor (bkz. `findReminderTargets`); 0–23 dışına çıkan değer kabul
 * edilmiyor çünkü sorgu onu doğrudan karşılaştırmada kullanıyor.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const p = await ensureProfile(userId, null);
    return NextResponse.json(
      { daily: p.remindersEnabled, hour: p.reminderHour, streak: p.streakAlert, weekly: p.weeklyReminder },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[notifications/prefs] okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const patch: Partial<{ remindersEnabled: boolean; reminderHour: number; streakAlert: boolean; weeklyReminder: boolean }> = {};
  if (typeof body.daily === "boolean") patch.remindersEnabled = body.daily;
  if (typeof body.streak === "boolean") patch.streakAlert = body.streak;
  if (typeof body.weekly === "boolean") patch.weeklyReminder = body.weekly;
  if (typeof body.hour === "number" && Number.isInteger(body.hour) && body.hour >= 0 && body.hour <= 23) {
    patch.reminderHour = body.hour;
  }
  if (!Object.keys(patch).length) return NextResponse.json({ error: "empty" }, { status: 400 });

  try {
    await ensureProfile(userId, null);
    await db.update(profiles).set(patch).where(eq(profiles.userId, userId));
    const p = await ensureProfile(userId, null);
    return NextResponse.json({ daily: p.remindersEnabled, hour: p.reminderHour, streak: p.streakAlert, weekly: p.weeklyReminder });
  } catch (err) {
    console.error("[notifications/prefs] yazılamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

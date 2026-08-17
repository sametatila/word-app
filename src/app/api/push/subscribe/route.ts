import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, pushSubscriptions } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { pushEnabled, sendToUser } from "@/lib/push";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor

/** Tarayıcının ürettiği abonelik nesnesi. */
type Incoming = {
  endpoint?: unknown;
  keys?: { p256dh?: unknown; auth?: unknown };
  timezone?: unknown;
};

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!pushEnabled) return NextResponse.json({ error: "push_disabled" }, { status: 503 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const endpoint = typeof body.endpoint === "string" ? body.endpoint : "";
  const p256dh = typeof body.keys?.p256dh === "string" ? body.keys.p256dh : "";
  const auth = typeof body.keys?.auth === "string" ? body.keys.auth : "";
  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: "bad_subscription" }, { status: 400 });
  }

  try {
    // Aynı tarayıcı yeniden abone olduğunda yeni satır değil güncelleme:
    // izni kapatıp açan kullanıcı iki bildirim almamalı. Sahip de
    // güncelleniyor — paylaşılan bir cihazda abonelik son giren hesabındır.
    await db
      .insert(pushSubscriptions)
      .values({ userId, endpoint, p256dh, auth })
      .onConflictDoUpdate({
        target: pushSubscriptions.endpoint,
        set: { userId, p256dh, auth, failures: 0 },
      });

    // Saat dilimi buradan geliyor: hatırlatmayı gönderen sunucu, kullanıcının
    // "akşam 8"inin ne zaman olduğunu ancak böyle bilebiliyor.
    if (typeof body.timezone === "string" && body.timezone.length < 64) {
      await db
        .update(profiles)
        .set({ timezone: body.timezone, remindersEnabled: true })
        .where(eq(profiles.userId, userId));
    } else {
      await db
        .update(profiles)
        .set({ remindersEnabled: true })
        .where(eq(profiles.userId, userId));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[push/subscribe]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let endpoint = "";
  try {
    const body = (await req.json()) as Incoming;
    if (typeof body.endpoint === "string") endpoint = body.endpoint;
  } catch {
    /* gövdesiz istek: kullanıcının bütün cihazları kapatılır */
  }

  try {
    if (endpoint) {
      await db
        .delete(pushSubscriptions)
        .where(
          and(eq(pushSubscriptions.userId, userId), eq(pushSubscriptions.endpoint, endpoint)),
        );
    } else {
      await db.delete(pushSubscriptions).where(eq(pushSubscriptions.userId, userId));
    }
    // Bildirimleri kapatmak bir tercihtir; bir sonraki abonelikte tekrar
    // açılana kadar sunucu bu kullanıcıyı hedef listesine almamalı.
    await db
      .update(profiles)
      .set({ remindersEnabled: false })
      .where(eq(profiles.userId, userId));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[push/subscribe] silme", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Deneme bildirimi.
 *
 * İzin verildiği anda tek bir bildirim gidiyor. Bu bir gösteri değil bir
 * sözleşme: kullanıcı neye izin verdiğini ve bildirimin nasıl göründüğünü
 * hemen görüyor. Sessiz kalan bir izin isteği, ertesi gün gelen ilk
 * bildirimde "ben buna izin vermemiştim" tepkisini doğuruyor.
 */
export async function PUT(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!pushEnabled) return NextResponse.json({ error: "push_disabled" }, { status: 503 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const [profile] = await db
      .select({ name: profiles.displayName })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    const first = profile?.name?.trim().split(/\s+/)[0];
    const sent = await sendToUser(userId, {
      title: "Hatırlatmalar açık",
      body: first
        ? `${first}, çalışmadığın günlerde seni buradan dürteceğiz.`
        : "Çalışmadığın günlerde seni buradan dürteceğiz.",
      url: "/learn",
      tag: "reminder-test",
    });
    return NextResponse.json({ ok: true, sent });
  } catch (err) {
    console.error("[push/subscribe] deneme", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

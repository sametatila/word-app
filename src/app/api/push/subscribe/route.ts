import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, pushSubscriptions } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { pushEnabled, sendToUser } from "@/lib/push";
import { langOf } from "@/lib/social/notify";
import { translate } from "@/lib/i18n/dict";
import { isPushEndpoint } from "@/lib/push-endpoint";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor

/** Tarayıcının ürettiği abonelik nesnesi. */
type Incoming = {
  endpoint?: unknown;
  keys?: { p256dh?: unknown; auth?: unknown };
  timezone?: unknown;
  /** Çıkış: yalnız bu tarayıcının aboneliği düşer, tercih olduğu gibi kalır (DELETE). */
  signOut?: unknown;
};

/**
 * IANA saat dilimi doğrulaması — güvenlik denetimi F4 (2026-09-14).
 *
 * `timezone` istemciden geliyor ve `profiles.timezone`'a yazılıyor; oradan
 * push.ts'teki hatırlatma/streak/haftalık/özet cron işleri TÜM profiller
 * üzerinde tek sorguda `now() at time zone <col>` çalıştırıyor. Postgres
 * tanınmayan bir dilimde ("time zone not recognized") tüm batch sorgusunu
 * iptal eder — tek bir kullanıcının yazdığı çöp değer, o günden sonra HERKESİN
 * bildirimlerini kalıcı olarak durdururdu (kalıcı, veri-tabanı geneli DoS).
 * Bu yüzden yalnız gerçek IANA dilimleri saklanır; geçersizse alan hiç
 * güncellenmez (şema varsayılanı "Europe/Istanbul" ya da eski değer korunur).
 */
function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!pushEnabled) return NextResponse.json({ error: "push_disabled" }, { status: 503 });

  /* HESAP İSTER: bildirim aboneliği yalnız hesaba yazılıyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const endpoint = typeof body.endpoint === "string" ? body.endpoint : "";
  const p256dh = typeof body.keys?.p256dh === "string" ? body.keys.p256dh : "";
  const auth = typeof body.keys?.auth === "string" ? body.keys.auth : "";
  if (!endpoint || !p256dh || !auth || !isPushEndpoint(endpoint) || !validKey(p256dh, 200) || !validKey(auth, 64)) {
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
    if (typeof body.timezone === "string" && body.timezone.length < 64 && isValidTimeZone(body.timezone)) {
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
  let signOut = false;
  try {
    const body = (await req.json()) as Incoming;
    if (typeof body.endpoint === "string") endpoint = body.endpoint;
    signOut = body.signOut === true;
  } catch {
    /* gövdesiz istek: kullanıcının bütün cihazları kapatılır */
  }

  /*
    ÇIKIŞ BİR TERCİH DEĞİL. Aşağıdaki normal yol `remindersEnabled`'ı
    kapatıyor, çünkü kullanıcı bildirimleri kapatmayı SEÇTİ. Çıkışta ise
    istenen tek şey bu tarayıcının artık bu hesabın bildirimlerini almaması:
    ortak bilgisayarda A çıktıktan sonra A'nın hatırlatmaları ekrana
    düşmemeli. Tercihi kapatmak A'nın telefonundaki hatırlatmaları da
    susturur, gövdesiz silme de bütün cihazlarını düşürürdü; ikisi de yok.
  */
  if (signOut) {
    if (!endpoint) return NextResponse.json({ error: "bad_request" }, { status: 400 });
    try {
      await db
        .delete(pushSubscriptions)
        .where(and(eq(pushSubscriptions.userId, userId), eq(pushSubscriptions.endpoint, endpoint)));
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[push/subscribe] oturum kapatma silmesi", err);
      return NextResponse.json({ error: "database" }, { status: 500 });
    }
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

  /* HESAP İSTER: bildirim aboneliği yalnız hesaba yazılıyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  try {
    const [profile] = await db
      .select({ name: profiles.displayName })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    const first = profile?.name?.trim().split(/\s+/)[0];
    // Bildirim ALICININ dilinde — abonelik açılışında giden ilk mesaj bu ve
    // sabit Türkçe yazılıydı (bkz. lib/push `composeReminder`, aynı düzeltme).
    const lang = await langOf(userId);
    const sent = await sendToUser(userId, {
      title: translate(lang, "push.reminders_on_title"),
      body: translate(lang, first ? "push.reminders_on_body_named" : "push.reminders_on_body", { name: first ?? "" }),
      url: "/learn",
      tag: "reminder-test",
      lang,
    });
    return NextResponse.json({ ok: true, sent });
  } catch (err) {
    console.error("[push/subscribe] deneme", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function validKey(v: string, max: number): boolean {
  return v.length <= max && /^[A-Za-z0-9_-]+=*$/.test(v);
}

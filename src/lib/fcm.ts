import "server-only";
import { createSign } from "node:crypto";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { deviceTokens } from "@/lib/db/schema";

/**
 * Firebase Cloud Messaging — native uygulamanın push kanalı.
 *
 * Web Push (VAPID) tarayıcıya ait ve native uygulamada çalışmıyor: bu dosya
 * gelmeden önce Android ve iOS kullanıcıları hiçbir uzak bildirim almıyordu.
 *
 * SDK YOK, BAĞIMLILIK YOK. FCM HTTP v1'in istediği tek şey bir OAuth erişim
 * jetonu ve onu üretmek için gereken imza `node:crypto`da zaten var:
 * servis hesabının özel anahtarıyla imzalanan bir JWT'yi Google'ın jeton ucuna
 * verip bir saatlik erişim jetonu alıyoruz. firebase-admin paketi bunun için
 * onlarca megabayt ve kendi başına bir çalışma zamanı getirirdi.
 *
 * ANAHTAR YOKSA SESSİZCE KAPALI — Google girişindeki kalıbın aynısı. Env üç
 * değişkenden birini bile taşımıyorsa `fcmEnabled` false olur, gönderici hiç
 * çağrılmaz ve hiçbir yerde hata görünmez.
 */
export const fcmEnabled = Boolean(
  process.env.FCM_PROJECT_ID && process.env.FCM_CLIENT_EMAIL && process.env.FCM_PRIVATE_KEY,
);

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/firebase.messaging";

/** Kalıcı hata sayısı bunu aşan jeton silinir (push_subscriptions ile aynı eşik mantığı). */
const MAX_FAILURES = 5;

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

/**
 * Özel anahtar env'de tek satır: `.env` biçimi gerçek satır sonu taşıyamadığı
 * için "\n" dizisi olarak yazılıyor ve burada geri açılıyor. Tırnak içinde
 * yapıştırılmış anahtarlar da temizleniyor.
 */
function privateKey(): string {
  return (process.env.FCM_PRIVATE_KEY ?? "").replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string | null> {
  // Bir dakikalık pay: kullanılmak üzereyken dolan jeton 401 verirdi.
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const iat = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: process.env.FCM_CLIENT_EMAIL,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat,
      exp: iat + 3600,
    }),
  );
  let signature: string;
  try {
    const signer = createSign("RSA-SHA256");
    signer.update(`${header}.${claims}`);
    signature = signer.sign(privateKey(), "base64url");
  } catch (err) {
    console.error("[fcm:sign]", err);
    return null;
  }
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  if (!res.ok) {
    console.error("[fcm:token]", res.status, await res.text().catch(() => ""));
    return null;
  }
  const body = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!body.access_token) return null;
  cached = { token: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cached.token;
}

export type FcmPayload = {
  title: string;
  body: string;
  /** Dokununca açılacak uygulama içi adres — web push ile AYNI değer. */
  url: string;
  /** Aynı etiketli bildirim öncekinin yerine geçer (Android tag / iOS thread-id). */
  tag: string;
};

/**
 * Kullanıcının bütün cihazlarına gönderir; kaç cihaza ulaştığını döndürür.
 *
 * Gövde `data`+`notification` birlikte: `notification` uygulamanın kapalı
 * olduğu durumda sistemin kendi bildirimini çizmesi için, `data` ise uygulama
 * açıkken notifee'nin aynı bildirimi kendi kanalıyla göstermesi ve dokunuşun
 * doğru ekrana gitmesi için. İkisi olmadan bildirim ya arka planda ya ön
 * planda kaybolurdu.
 */
export async function sendFcm(userId: string, payload: FcmPayload): Promise<number> {
  if (!fcmEnabled) return 0;
  const rows = await db.select().from(deviceTokens).where(eq(deviceTokens.userId, userId));
  if (!rows.length) return 0;
  const auth = await accessToken();
  if (!auth) return 0;

  const dead: string[] = [];
  const failed: string[] = [];
  let sent = 0;
  await Promise.all(
    rows.map(async (row) => {
      const message = {
        message: {
          token: row.token,
          notification: { title: payload.title, body: payload.body },
          data: { url: payload.url, tag: payload.tag },
          android: { collapse_key: payload.tag, notification: { tag: payload.tag, channel_id: "reminder" } },
          apns: {
            headers: { "apns-collapse-id": payload.tag },
            payload: { aps: { "thread-id": payload.tag, sound: "default" } },
          },
        },
      };
      try {
        const res = await fetch(`https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`, {
          method: "POST",
          headers: { authorization: `Bearer ${auth}`, "content-type": "application/json" },
          body: JSON.stringify(message),
        });
        if (res.ok) {
          sent++;
          return;
        }
        // 404 ve 403 jetonun artık geçersiz olduğunu söyler: cihaz silinmiş,
        // uygulama kaldırılmış ya da jeton yenilenmiş. Beklemeye gerek yok.
        if (res.status === 404 || res.status === 403) dead.push(row.token);
        else failed.push(row.token);
      } catch {
        failed.push(row.token);
      }
    }),
  );

  if (dead.length) await db.delete(deviceTokens).where(inArray(deviceTokens.token, dead));
  if (failed.length) {
    await db
      .update(deviceTokens)
      .set({ failures: sql`${deviceTokens.failures} + 1` })
      .where(inArray(deviceTokens.token, failed));
    // Geçici hata silmeyi hak etmiyor ama ısrar ederse jeton ölmüştür.
    await db.delete(deviceTokens).where(and(inArray(deviceTokens.token, failed), sql`${deviceTokens.failures} >= ${MAX_FAILURES}`));
  }
  if (sent) await db.update(deviceTokens).set({ failures: 0 }).where(inArray(deviceTokens.token, rows.map((r) => r.token)));
  return sent;
}

/** Cihaz jetonunu kaydeder ya da tazeler. Jeton başka hesaptaysa el değiştirir. */
export async function registerDevice(userId: string, token: string, platform: "ios" | "android"): Promise<void> {
  await db
    .insert(deviceTokens)
    .values({ token, userId, platform })
    .onConflictDoUpdate({
      target: deviceTokens.token,
      set: { userId, platform, failures: 0, seenAt: new Date() },
    });
}

/** Çıkışta ya da bildirim kapatılınca — cihaz artık bu hesabın bildirimini almasın. */
export async function unregisterDevice(token: string): Promise<void> {
  await db.delete(deviceTokens).where(eq(deviceTokens.token, token));
}

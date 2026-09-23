import "server-only";
import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * İSTEMCİ HATA GRUPLARI — web ve mobil JS hataları, mesaj ve yığınla.
 *
 * NEDEN KENDİMİZ. Hata takibinin iki ücretsiz yolu vardı: üçüncü taraf bir
 * servis (Sentry ücretsiz katmanı) ya da kendi tablomuz. Kendi tablomuz
 * seçildi, çünkü (1) kullanıcı verisi üçüncü bir tarafa gitmiyor (gizlilik
 * politikasına yeni bir alt işleyen eklemek gerekmiyor), (2) hatalar panelde
 * ve Telegram uyarısında zaten olan yerde görünüyor, (3) kota yok. Native
 * çökmeler (JS'e hiç ulaşmayanlar) mağazaların kendi raporlarında: Play
 * Console › Android vitals ve Xcode › Organizer (Crashlytics 2026-09-23'te
 * uygulamadan çıkarıldı; üçüncü taraf çökme SDK'sı yok).
 *
 * GRUPLAMA: platform + hata adı + SAYISIZ mesaj + yığının ilk anlamlı karesi.
 * "Cannot read property 'x' of undefined (id 123)" ile "(id 456)" aynı grup.
 *
 * KİŞİSEL VERİ YOK: kullanıcı kimliği yazılmıyor; mesaj ve yığın e-posta,
 * jeton, uzun sayı ve adres sorgusundan temizleniyor. Grup başına tek örnek.
 *
 * SEL KORUMASI: istemci zaten dakikada birle sınırlı; sunucu ayrıca instance
 * başına aynı grubu 5 saniyede bir yazıyor, sayacı bellekte biriktiriyor.
 */

export type ClientErrorInput = {
  platform: "web" | "android" | "ios";
  name?: string;
  message: string;
  stack?: string;
  screen?: string;
  appVersion?: string;
};

export function scrub(s: string): string {
  return s
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
    .replace(/([?&](?:token|ott|code|n|key|sig|signature)=)[^&\s"')]+/gi, "$1[x]")
    .replace(/\b[A-Za-z0-9_-]{32,}\b/g, "[x]")
    .replace(/\b\d{6,}\b/g, "[n]");
}

/** Gruplama için mesaj: sayılar, tırnak içleri, adresler sabitleniyor. */
function normalizeMessage(m: string): string {
  return scrub(m)
    .replace(/https?:\/\/\S+/g, "[url]")
    .replace(/(["'`]).{0,80}?\1/g, "'…'")
    .replace(/\d+/g, "#")
    .slice(0, 200);
}

/** Yığının ilk anlamlı karesi: kütüphane/çalışma zamanı kareleri atlanıyor, satır:sütun atılıyor. */
function topFrame(stack: string | undefined): string {
  if (!stack) return "";
  for (const line of stack.split("\n").slice(1, 12)) {
    const l = line.trim();
    if (!l || /node_modules|react-dom|react-native\/Libraries|webpack|<anonymous>|native code/.test(l)) continue;
    return l.replace(/:\d+:\d+\)?$/, "").replace(/\?[^)\s]*/, "").slice(0, 160);
  }
  return "";
}

/** Grup anahtarı — saf, `scripts/test-admin.ts` sınıyor. */
export function errorFingerprint(e: Pick<ClientErrorInput, "platform" | "name" | "message" | "stack">): string {
  return createHash("sha1")
    .update([e.platform, e.name ?? "", normalizeMessage(e.message), topFrame(e.stack)].join("|"))
    .digest("hex")
    .slice(0, 24);
}

const lastWrite = new Map<string, { at: number; pending: number }>();
const WRITE_EVERY_MS = 5_000;

export async function recordClientError(e: ClientErrorInput): Promise<void> {
  const message = scrub(e.message).slice(0, 500);
  if (!message) return;
  const fingerprint = errorFingerprint(e);

  const now = Date.now();
  const w = lastWrite.get(fingerprint);
  if (w && now - w.at < WRITE_EVERY_MS) {
    w.pending++;
    return;
  }
  const add = 1 + (w?.pending ?? 0);
  lastWrite.set(fingerprint, { at: now, pending: 0 });
  if (lastWrite.size > 5_000) lastWrite.clear();

  try {
    await db.execute(sql`
      insert into client_error_groups (fingerprint, platform, name, message, stack, screen, app_version, count)
      values (${fingerprint}, ${e.platform}, ${e.name?.slice(0, 80) ?? null}, ${message}, ${e.stack ? scrub(e.stack).slice(0, 4000) : null},
        ${e.screen?.slice(0, 64) ?? null}, ${e.appVersion?.slice(0, 32) ?? null}, ${add})
      on conflict (fingerprint) do update set
        count = client_error_groups.count + ${add},
        last_seen = now(),
        message = excluded.message,
        stack = coalesce(excluded.stack, client_error_groups.stack),
        screen = coalesce(excluded.screen, client_error_groups.screen),
        app_version = coalesce(excluded.app_version, client_error_groups.app_version),
        resolved_at = null`);
  } catch (err) {
    console.error("[client-errors]", (err as Error).message);
  }
}

export type ErrorGroup = {
  fingerprint: string; platform: string; name: string; message: string; stack: string; screen: string;
  appVersion: string; count: number; firstSeen: string; lastSeen: string; resolved: boolean;
};

export async function listErrorGroups(includeResolved: boolean): Promise<ErrorGroup[]> {
  try {
    const r = (await db.execute(sql`
      select fingerprint, platform, coalesce(name, '') name, message, coalesce(stack, '') stack, coalesce(screen, '') screen,
        coalesce(app_version, '') app_version, count, first_seen, last_seen, resolved_at is not null resolved
      from client_error_groups
      ${includeResolved ? sql`` : sql`where resolved_at is null`}
      order by last_seen desc limit 200`)) as unknown;
    const rows = (Array.isArray(r) ? r : (r as { rows?: Record<string, unknown>[] }).rows ?? []) as Record<string, unknown>[];
    return rows.map((x) => ({
      fingerprint: String(x.fingerprint), platform: String(x.platform), name: String(x.name), message: String(x.message),
      stack: String(x.stack), screen: String(x.screen), appVersion: String(x.app_version), count: Number(x.count) || 0,
      firstSeen: new Date(String(x.first_seen)).toISOString(), lastSeen: new Date(String(x.last_seen)).toISOString(),
      resolved: x.resolved === true,
    }));
  } catch {
    return [];
  }
}

export async function resolveErrorGroup(fingerprint: string): Promise<void> {
  await db.execute(sql`update client_error_groups set resolved_at = now() where fingerprint = ${fingerprint}`);
}

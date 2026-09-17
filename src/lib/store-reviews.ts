import "server-only";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import https from "node:https";

/**
 * MAĞAZA YORUMLARI — App Store ve Google Play, panelde (/admin/reviews).
 *
 * ANAHTARLAR: yalnız bu iş için açılmış, DAR yetkili iki anahtar. Mağaza
 * kaydını yöneten asıl anahtarlar (App Store "Team" anahtarı, Play yönetim
 * servis hesabı) sunucuya GİRMİYOR (AGENTS.md güvenlik kuralı):
 *   - App Store Connect: rolü "Customer Support" olan API anahtarı
 *     (yorum okur; uygulamayı, fiyatı, sürümü değiştiremez).
 *   - Google Play: yalnız "uygulama bilgilerini görüntüleme" izni olan servis
 *     hesabı.
 * Dosyalar sunucuda `/opt/lernomi/secrets/` altında, `root:lernomi 0640`.
 * Ortam: STORE_REVIEWS_ASC_KEY_PATH / _ASC_KEY_ID / _ASC_ISSUER_ID,
 * STORE_REVIEWS_PLAY_SA_PATH. Eksikse o mağaza "yapılandırılmadı" döner.
 *
 * YALNIZ OKUMA (GET). Yoruma cevap bir yazma işlemi; bilerek yok, cevap mağaza
 * konsolundan veriliyor.
 *
 * IPv4 ZORUNLU: sunucudan api.appstoreconnect.apple.com'a IPv6 yolu takılıyor
 * (yerelde de aynı, AGENTS.md "Ağ tuzağı"). `fetch` aile seçtirmediği için
 * istekler `node:https` + `family: 4` ile.
 *
 * ÖNBELLEK 30 dakika: yorumlar dakikalık değişmiyor, iki API'nin de kotası var.
 * Uyarı motoru da aynı önbellekten okuyor (yeni 1-2 yıldızlı yorum → Telegram).
 */

export const APP_STORE_APP_ID = "6810593275";
export const PLAY_PACKAGE = "com.lernomi.learn";

export type StoreReview = {
  store: "ios" | "android";
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  at: string;
  version: string;
  territory: string;
  answered: boolean;
};

export type StoreReviewsResult = {
  store: "ios" | "android";
  configured: boolean;
  error: string | null;
  reviews: StoreReview[];
};

function request(url: string, init: { method?: string; headers?: Record<string, string>; body?: string } = {}): Promise<{ status: number; json: unknown }> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: init.method ?? "GET", headers: init.headers, family: 4, timeout: 15_000 }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString("utf8");
        let json: unknown = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch {
          json = null;
        }
        resolve({ status: res.statusCode ?? 0, json });
      });
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    if (init.body) req.write(init.body);
    req.end();
  });
}

const b64url = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");

async function appStoreReviews(): Promise<StoreReviewsResult> {
  const keyPath = process.env.STORE_REVIEWS_ASC_KEY_PATH;
  const kid = process.env.STORE_REVIEWS_ASC_KEY_ID;
  const iss = process.env.STORE_REVIEWS_ASC_ISSUER_ID;
  if (!keyPath || !kid || !iss) return { store: "ios", configured: false, error: null, reviews: [] };
  try {
    const key = await fs.readFile(keyPath, "utf8");
    const now = Math.floor(Date.now() / 1000);
    const head = `${b64url({ alg: "ES256", kid, typ: "JWT" })}.${b64url({ iss, iat: now, exp: now + 600, aud: "appstoreconnect-v1" })}`;
    const jwt = `${head}.${crypto.sign("sha256", Buffer.from(head), { key, dsaEncoding: "ieee-p1363" }).toString("base64url")}`;
    const r = await request(
      `https://api.appstoreconnect.apple.com/v1/apps/${APP_STORE_APP_ID}/customerReviews?sort=-createdDate&limit=100&include=response`,
      { headers: { authorization: `Bearer ${jwt}` } },
    );
    if (r.status !== 200) return { store: "ios", configured: true, error: `App Store Connect HTTP ${r.status}`, reviews: [] };
    const body = r.json as { data?: { id: string; attributes?: Record<string, unknown>; relationships?: { response?: { data?: unknown } } }[] };
    return {
      store: "ios",
      configured: true,
      error: null,
      reviews: (body.data ?? []).map((d) => {
        const a = d.attributes ?? {};
        return {
          store: "ios" as const,
          id: d.id,
          rating: Number(a.rating) || 0,
          title: String(a.title ?? ""),
          body: String(a.body ?? ""),
          author: String(a.reviewerNickname ?? ""),
          at: String(a.createdDate ?? ""),
          version: "",
          territory: String(a.territory ?? ""),
          answered: Boolean(d.relationships?.response?.data),
        };
      }),
    };
  } catch (err) {
    return { store: "ios", configured: true, error: `App Store Connect: ${(err as Error).message}`, reviews: [] };
  }
}

async function playReviews(): Promise<StoreReviewsResult> {
  const saPath = process.env.STORE_REVIEWS_PLAY_SA_PATH;
  if (!saPath) return { store: "android", configured: false, error: null, reviews: [] };
  try {
    const sa = JSON.parse(await fs.readFile(saPath, "utf8")) as { client_email: string; private_key: string; private_key_id: string; token_uri: string };
    const now = Math.floor(Date.now() / 1000);
    const head = `${b64url({ alg: "RS256", typ: "JWT", kid: sa.private_key_id })}.${b64url({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/androidpublisher", aud: sa.token_uri, iat: now, exp: now + 600 })}`;
    const jwt = `${head}.${crypto.sign("sha256", Buffer.from(head), sa.private_key).toString("base64url")}`;
    const tok = await request(sa.token_uri, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString(),
    });
    const access = (tok.json as { access_token?: string } | null)?.access_token;
    if (!access) return { store: "android", configured: true, error: `Google OAuth HTTP ${tok.status}`, reviews: [] };
    // Play API yalnız SON 7 GÜNÜN metinli yorumlarını döndürüyor (Google'ın sınırı).
    const r = await request(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PLAY_PACKAGE}/reviews?maxResults=100`, {
      headers: { authorization: `Bearer ${access}` },
    });
    if (r.status !== 200) return { store: "android", configured: true, error: `Google Play HTTP ${r.status}`, reviews: [] };
    type PlayReview = {
      reviewId: string;
      authorName?: string;
      comments?: {
        userComment?: { text?: string; starRating?: number; lastModified?: { seconds?: string }; appVersionName?: string; reviewerLanguage?: string };
        developerComment?: unknown;
      }[];
    };
    const body = r.json as { reviews?: PlayReview[] };
    return {
      store: "android",
      configured: true,
      error: null,
      reviews: (body.reviews ?? []).map((rv) => {
        const u = rv.comments?.find((c) => c.userComment)?.userComment ?? {};
        return {
          store: "android" as const,
          id: rv.reviewId,
          rating: Number(u.starRating) || 0,
          title: "",
          body: String(u.text ?? "").trim(),
          author: String(rv.authorName ?? ""),
          at: u.lastModified?.seconds ? new Date(Number(u.lastModified.seconds) * 1000).toISOString() : "",
          version: String(u.appVersionName ?? ""),
          territory: String(u.reviewerLanguage ?? ""),
          answered: Boolean(rv.comments?.some((c) => c.developerComment)),
        };
      }),
    };
  } catch (err) {
    return { store: "android", configured: true, error: `Google Play: ${(err as Error).message}`, reviews: [] };
  }
}

let cache: { at: number; value: StoreReviewsResult[] } | null = null;
const TTL_MS = 30 * 60_000;

export async function storeReviews(fresh = false): Promise<{ results: StoreReviewsResult[]; at: number }> {
  if (!fresh && cache && Date.now() - cache.at < TTL_MS) return { results: cache.value, at: cache.at };
  const value = await Promise.all([appStoreReviews(), playReviews()]);
  cache = { at: Date.now(), value };
  return { results: value, at: cache.at };
}

/** Özet: ortalama, yıldız dağılımı, cevapsız düşük puanlılar. Saf — test edilebilir. */
export function summarizeReviews(reviews: StoreReview[], sinceDays = 30, now = Date.now()) {
  const since = now - sinceDays * 86_400_000;
  const recent = reviews.filter((r) => r.at && Date.parse(r.at) >= since);
  const stars = [1, 2, 3, 4, 5].map((s) => reviews.filter((r) => r.rating === s).length);
  const avg = reviews.length ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10 : null;
  return {
    total: reviews.length,
    avg,
    stars,
    recent: recent.length,
    lowUnanswered: reviews.filter((r) => r.rating > 0 && r.rating <= 2 && !r.answered).length,
  };
}

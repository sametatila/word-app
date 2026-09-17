import "server-only";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import https from "node:https";
import { PLAY_PACKAGE } from "@/lib/store-reviews";

/**
 * ANDROID VITALS — kullanıcının fark ettiği çökme ve donma (ANR) oranları.
 *
 * NEDEN. Google Play bu iki oranı "temel kalite sinyali" sayıyor: 28 günlük
 * kullanıcı ağırlıklı oran KÖTÜ DAVRANIŞ EŞİĞİNİ aşarsa uygulama mağazada
 * geri plana itiliyor ve sayfasında uyarı gösterilebiliyor. Crashlytics tek
 * tek çökmeyi gösteriyor; bu ise mağazanın gördüğü, sıralamayı etkileyen sayı.
 *
 * Eşikler (Play Console, genel): kullanıcının fark ettiği çökme %1,09,
 * kullanıcının fark ettiği ANR %0,47. Değişirse yalnız buradaki sabitler.
 *
 * Kaynak: Play Developer Reporting API (v1beta1), mağaza yorumlarıyla AYNI dar
 * yetkili servis hesabı ("uygulama kalitesi bilgilerini görüntüleme"). Veri
 * günlük; önbellek 6 saat. Google yeterli kullanıcı birikmeden oran vermiyor:
 * satır yoksa "henüz veri yok" (hata değil).
 */

export const CRASH_THRESHOLD = 0.0109;
export const ANR_THRESHOLD = 0.0047;

export type VitalsPoint = { day: string; rate: number | null; rate28d: number | null; users: number | null };
export type VitalsSeries = { points: VitalsPoint[]; latest28d: number | null; latestDay: string | null };
export type AndroidVitals = { configured: boolean; error: string | null; crash: VitalsSeries; anr: VitalsSeries };

type Row = { startTime?: { year: number; month: number; day: number }; metrics?: { metric: string; decimalValue?: { value?: string } }[] };

/** API satırlarını seriye çevirir. Saf — `scripts/test-admin.ts` sınıyor. */
export function parseVitalsRows(rows: Row[], rateMetric: string, weightedMetric: string): VitalsSeries {
  const num = (r: Row, m: string) => {
    const v = r.metrics?.find((x) => x.metric === m)?.decimalValue?.value;
    return v == null || v === "" ? null : Number(v);
  };
  const points = rows
    .filter((r) => r.startTime)
    .map((r) => {
      const t = r.startTime!;
      return {
        day: `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`,
        rate: num(r, rateMetric),
        rate28d: num(r, weightedMetric),
        users: num(r, "distinctUsers"),
      };
    })
    .sort((a, b) => a.day.localeCompare(b.day));
  const last = [...points].reverse().find((p) => p.rate28d != null) ?? null;
  return { points, latest28d: last?.rate28d ?? null, latestDay: last?.day ?? null };
}

function post(url: string, headers: Record<string, string>, body: string): Promise<{ status: number; json: unknown }> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: "POST", headers, family: 4, timeout: 15_000 }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => {
        let json: unknown = null;
        try {
          json = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        } catch {
          json = null;
        }
        resolve({ status: res.statusCode ?? 0, json });
      });
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const EMPTY: VitalsSeries = { points: [], latest28d: null, latestDay: null };
let cache: { at: number; value: AndroidVitals } | null = null;

export async function androidVitals(fresh = false): Promise<AndroidVitals> {
  if (!fresh && cache && Date.now() - cache.at < 6 * 3_600_000) return cache.value;
  const saPath = process.env.STORE_REVIEWS_PLAY_SA_PATH;
  if (!saPath) return { configured: false, error: null, crash: EMPTY, anr: EMPTY };
  let value: AndroidVitals;
  try {
    const sa = JSON.parse(await fs.readFile(saPath, "utf8")) as { client_email: string; private_key: string; private_key_id: string; token_uri: string };
    const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
    const now = Math.floor(Date.now() / 1000);
    const head = `${b64({ alg: "RS256", typ: "JWT", kid: sa.private_key_id })}.${b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/playdeveloperreporting", aud: sa.token_uri, iat: now, exp: now + 600 })}`;
    const jwt = `${head}.${crypto.sign("sha256", Buffer.from(head), sa.private_key).toString("base64url")}`;
    const tok = await post(sa.token_uri, { "content-type": "application/x-www-form-urlencoded" }, new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString());
    const access = (tok.json as { access_token?: string } | null)?.access_token;
    if (!access) throw new Error(`Google OAuth HTTP ${tok.status}`);

    // Veri 1-2 gün geriden geliyor; 30 günlük pencere, bitiş iki gün önce. Saat dilimi API'nin istediği.
    const d = (ms: number) => {
      const x = new Date(ms);
      return { year: x.getUTCFullYear(), month: x.getUTCMonth() + 1, day: x.getUTCDate(), timeZone: { id: "America/Los_Angeles" } };
    };
    const spec = { aggregationPeriod: "DAILY", startTime: d(Date.now() - 32 * 86_400_000), endTime: d(Date.now() - 2 * 86_400_000) };
    const query = async (set: string, metrics: string[]) => {
      const r = await post(
        `https://playdeveloperreporting.googleapis.com/v1beta1/apps/${PLAY_PACKAGE}/${set}:query`,
        { authorization: `Bearer ${access}`, "content-type": "application/json" },
        JSON.stringify({ timelineSpec: spec, metrics }),
      );
      if (r.status !== 200) throw new Error(`Play Reporting ${set} HTTP ${r.status}`);
      return ((r.json as { rows?: Row[] } | null)?.rows ?? []) as Row[];
    };
    const [crashRows, anrRows] = await Promise.all([
      query("crashRateMetricSet", ["userPerceivedCrashRate", "userPerceivedCrashRate28dUserWeighted", "distinctUsers"]),
      query("anrRateMetricSet", ["userPerceivedAnrRate", "userPerceivedAnrRate28dUserWeighted", "distinctUsers"]),
    ]);
    value = {
      configured: true,
      error: null,
      crash: parseVitalsRows(crashRows, "userPerceivedCrashRate", "userPerceivedCrashRate28dUserWeighted"),
      anr: parseVitalsRows(anrRows, "userPerceivedAnrRate", "userPerceivedAnrRate28dUserWeighted"),
    };
  } catch (err) {
    value = { configured: true, error: (err as Error).message, crash: EMPTY, anr: EMPTY };
  }
  cache = { at: Date.now(), value };
  return value;
}

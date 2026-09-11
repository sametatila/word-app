import { ApiError } from "../api/client";

/**
 * Değerlendirme neden alınamadı — SEBEBİNE göre tek cümle.
 *
 * Mobil bu ayrımı hiç yapmıyordu: premium ve adil kullanım dışındaki her şey
 * "servis şu an kapalı" diye gösteriliyordu. Yani metni çok uzun olan da,
 * oturumu düşen de, isteği eksik giden de aynı YANLIŞ açıklamayı görüyordu ve
 * hiçbiri ne yapacağını öğrenemiyordu.
 *
 * Eşleme web `lib/assess-client` `askAssess` ile birebir aynı: 403 iki ayrı
 * şey olabiliyor (premium kapısı / yetkisizlik) ve ayırt edilmezse premium
 * reddi "geçersiz istek" diye görünür.
 */
export type AssessFailure =
  | "premium"
  | "not_configured"
  | "quota"
  | "too_long"
  | "timeout"
  | "invalid"
  | "upstream"
  | "unauthorized"
  | "bad_request";

/** Kullanıcıya gösterilecek kısa açıklama — web `ASSESS_FAILURE_KEYS`. */
export const ASSESS_FAILURE_KEYS: Record<AssessFailure, string> = {
  premium: "assess.fail_premium",
  not_configured: "assess.fail_not_configured",
  /* Web burada kendi anahtarını kullanıyor (`assessw.fail_quota`): orada hak
     dolunca kural tabanlı yedek gösteriliyor, mobilde puan hiç verilmiyor —
     metin gerçekten farklı ve ayrı ad farkı görünür kılıyor. */
  quota: "assess.fail_quota",
  too_long: "assess.fail_too_long",
  timeout: "assess.fail_timeout",
  invalid: "assess.fail_invalid",
  upstream: "assess.fail_upstream",
  unauthorized: "assess.fail_unauthorized",
  bad_request: "assess.fail_bad_request",
};

/** Hatanın sebebi — web `askAssess`in durum kodu tablosu. */
export function assessFailure(e: unknown): AssessFailure {
  const err = e as { status?: number; message?: string; name?: string } | null;
  if (!(e instanceof ApiError)) {
    // Ağ yok ya da istek zaman aşımına uğradı: `fetchWithTimeout` iptal ediyor.
    return err?.name === "AbortError" || err?.message === "timeout" ? "timeout" : "upstream";
  }
  switch (err?.status) {
    case 403:
      return err.message === "premium_required" ? "premium" : "unauthorized";
    case 401:
      return "unauthorized";
    case 413:
      return "too_long";
    case 429:
      return "quota";
    case 502:
      return "invalid";
    case 503:
      return err.message === "not_configured" ? "not_configured" : "upstream";
    default:
      return "bad_request";
  }
}

/** Doğrudan sözlük anahtarı. */
export function assessFailKey(e: unknown): string {
  return ASSESS_FAILURE_KEYS[assessFailure(e)];
}

/**
 * Bu bir KAPI mı, yoksa bir arıza mı?
 *
 * Kapıda ("premium'a özel", "bugünlük doldu") uydurma bir yedek puan vermek
 * kapıyı görünmez kılar; arızada ise alıştırma durmamalı.
 */
export function isGate(f: AssessFailure): boolean {
  return f === "premium" || f === "quota";
}

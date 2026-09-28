/**
 * GEÇİCİ HATADA YENİDEN DENEME — dış API okumaları için (mağaza yorumları, Android vitals).
 *
 * Neden (2026-09-28): Google Play ve App Store Connect ara sıra tek bir 503/500 dönüyor. Tek denemede hata sayılınca
 * Telegram'a "okunamadı" gidiyor, bir sonraki kontrolde "düzeldi" — gerçek bir kesinti yokken uyarı gelip gidiyordu.
 * Çözüm uyarıyı susturmak değil, geçici hatayı atlatmak: aynı isteği artan beklemeyle birkaç kez denemek. Denemelerin
 * hepsi başarısızsa hata olduğu gibi dönüyor ve uyarı yine gidiyor (kalıcı kesinti gizlenmiyor).
 *
 * YALNIZ tekrarlanması güvenli isteklerle kullan: okuma (GET) ya da sonucu değiştirmeyen POST (OAuth jetonu, sorgu).
 */

/** Sunucu tarafının geçici olduğunu söylediği durumlar: zaman aşımı, hız sınırı, ağ geçidi ve bakım hataları. */
export const TRANSIENT_STATUS = new Set([408, 429, 500, 502, 503, 504]);

export type RetryOptions = {
  /** Toplam deneme sayısı (ilki dahil). */
  tries?: number;
  /** İlk bekleme; her denemede üçe katlanıyor (1 sn, 3 sn …). */
  baseMs?: number;
  /** Test için: beklemeyi değiştirmek. */
  sleep?: (ms: number) => Promise<void>;
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * `call`ı geçici hata (TRANSIENT_STATUS ya da fırlatılan ağ/zaman aşımı hatası) aldıkça yeniden dener. Kalıcı bir durum
 * (200, 401, 403, 404 …) ilk seferde döner. Son deneme de geçici hata verirse o sonuç döner ya da hata fırlatılır.
 */
export async function withRetry<T extends { status: number }>(call: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const tries = opts.tries ?? 3;
  const baseMs = opts.baseMs ?? 1_000;
  const sleep = opts.sleep ?? wait;
  for (let i = 1; ; i++) {
    try {
      const res = await call();
      if (!TRANSIENT_STATUS.has(res.status) || i >= tries) return res;
    } catch (err) {
      if (i >= tries) throw err;
    }
    await sleep(baseMs * 3 ** (i - 1));
  }
}

/**
 * ÖMÜR BOYU PREMIUM — test kullanıcıları (Samet, 2026-10-03). Saf karar kısmı;
 * veritabanı işi `lib/premium/lifetime`, çağıran `/api/cron/lifetime` (saatte bir).
 *
 * Liste `LIFETIME_PREMIUM_EMAILS` env'inde, virgülle ayrılmış. Depoya YAZILMAZ:
 * depo herkese açık ve adresler kişisel veri. Listede olup henüz kayıt olmamış
 * kişi, kayıt olup e-postasını doğruladıktan sonraki ilk saatlik turda alır.
 *
 * TURUN ÖMRÜ (Samet): en fazla 14 gün (`LIFETIME_PREMIUM_UNTIL`, gün dahil) ya da
 * listedeki herkes doğrulanmış hesapla katılınca biter. Bitince uç "done" döner
 * ve sunucudaki sarmalayıcı (`/opt/lernomi/lifetime-job.sh`) timer'ı kapatıp
 * Telegram'a yazar. Verilmiş Premium kalır; yalnız tur durur.
 *
 * "Ömür boyu" ayrı bir yetki türü değil, 100 yıllık bonus (`grantBonus`,
 * kaynak `manual`, ref `lifetime`): mağaza aboneliğiyle aynı kurallarla
 * birlikte yaşıyor (abone olunca kalan bonus bakiyeye döner, abonelik bitince
 * yeniden çalışır). İade bonusu sıfırlıyor (`lib/premium/entitlement`); tur o
 * zaman yeniden veriyor. Eşik 50 yıl: altına inmeden ikinci kez verilmiyor,
 * yani tamsayı bakiye taşamaz.
 */

const YEAR_MINUTES = Math.round(365.25 * 24 * 60);
/** Verilen süre: 100 yıl (dakika). */
export const LIFETIME_MINUTES = 100 * YEAR_MINUTES;
/** Bu süreden fazlası kalmışsa kişi zaten ömür boyu sayılıyor. */
export const LIFETIME_THRESHOLD_MINUTES = 50 * YEAR_MINUTES;

/** Env değerini küçük harfli, tekrarsız adres kümesine çevirir; geçersiz parça atlanır. */
export function parseLifetimeEmails(raw: string | undefined): Set<string> {
  const out = new Set<string>();
  for (const part of (raw ?? "").split(/[,\s;]+/)) {
    const e = part.trim().toLowerCase();
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) out.add(e);
  }
  return out;
}

/** Yetki satırı (yoksa null) ömür boyu eşiğinin altındaysa true: verilmeli. */
export function needsLifetime(row: { bonusMinutes: number; bonusUntil: Date | null } | null, now: number = Date.now()): boolean {
  if (!row) return true;
  const runningMin = row.bonusUntil ? (row.bonusUntil.getTime() - now) / 60_000 : 0;
  return Math.max(runningMin, 0) + row.bonusMinutes < LIFETIME_THRESHOLD_MINUTES;
}

/**
 * Tur bitti mi: bitiş tarihi geçti (ya da tanımsız) veya bekleyen kalmadı.
 * `until` "YYYY-MM-DD", o gün dahil (UTC gün sonu).
 */
export function lifetimeDone(until: string | undefined, waiting: number | null, now: number = Date.now()): { done: boolean; reason: string | null } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((until ?? "").trim());
  if (!m) return { done: true, reason: "LIFETIME_PREMIUM_UNTIL tanımsız" };
  const end = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + 1);
  if (now >= end) return { done: true, reason: "süre doldu" };
  if (waiting === 0) return { done: true, reason: "listedeki herkes katıldı" };
  return { done: false, reason: null };
}

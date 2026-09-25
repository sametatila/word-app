/**
 * KULLANIM BİLGİSİ — kartın dilbilgisi satırında, öğrencinin anadilinde.
 *
 * Tek karşılık kuralı ("denn" = "çünkü", "weil" = "çünkü") anlamı veriyor ama
 * kullanımı vermiyordu: weil yan cümle kurar ve fiili sona atar, denn söz
 * dizimine dokunmaz; mit Dativ ister, für Akkusativ; kriegen gündelik dil,
 * obgleich yazı dili. Bu bilgi öğrencinin cümle kurarken ilk yanıldığı yer ve
 * kartta hiç yoktu (yalnız "infolge" çoğul alanında "+ Gen." taşıyordu).
 *
 * Kapalı bir kod kümesi: veride kod (`usage`, boşlukla ayrılmış), ekranda
 * sözlükten etiket. Liste ve etiket sözlükleri mobil `lib/usage` ile AYNI
 * (parity 250); `check:usage` verideki kodları bu listeye karşı denetliyor.
 *   akk / dat / gen / wechsel — edatın istediği hâl (wechsel: yön Akk., yer Dat.)
 *   ns    — yan cümle bağlacı: fiil sona gider
 *   konj0 — ana cümleleri bağlar, söz dizimi değişmez (und, aber, denn…)
 *   pos1  — bağlayıcı zarf: cümle başında gelince fiil hemen ardından (deshalb…)
 *   ugs / geh / amtl — gündelik dil, yazı dili, resmî yazışma dili
 *   tier  — yalnız hayvanlar için (fressen: insan için söylenirse hakaret)
 *   brit  — İngilizce kursta İngiliz İngilizcesi sözcüğü (kurs Amerikan)
 */
export const USAGE_CODES = ["akk", "dat", "gen", "wechsel", "ns", "konj0", "pos1", "ugs", "geh", "amtl", "tier", "brit"] as const;
export type UsageCode = (typeof USAGE_CODES)[number];

/** Verideki kod dizgesi → bilinen kodlar (bilinmeyen kod sessizce düşer; kapı `check:usage`). */
export function usageCodes(raw: string | null | undefined): UsageCode[] {
  return String(raw ?? "")
    .split(/\s+/)
    .filter((c): c is UsageCode => (USAGE_CODES as readonly string[]).includes(c));
}

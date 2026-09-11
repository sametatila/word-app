import { MASTERED_DAYS } from "@/lib/srs";

/**
 * KELİMENİN DURUMU — tek kaynak.
 *
 * Aynı sınıflandırma dört yerde ayrı ayrı yazılıydı: `/api/words`ün gövde
 * eşlemesi, `/words` sayfasının ve o ucun SQL süzgeçleri, ve listenin etiket
 * fonksiyonu (`word-list` `statusOf`). Dördü de bugün aynı eşikleri kullanıyor
 * (`MASTERED_DAYS` üçünde de `lib/srs`ten geliyor), ama kural dört kez
 * yazıldığı için biri düzeltilip ötekilerin eski kalması için dört yol vardı.
 *
 * Mobil tarafta kural TEK yerde duruyor (`data/words` `statusOf`) ve yorumu
 * "web `word-list` `statusOf` ile AYNI eşikler" diyor — ölçen bir şey yoktu.
 *
 * İki ayrı soru var ve ikisi ayrı işlev:
 *
 *   `coarseStatus` — ucun GÖVDESİNE giden üç değer (`new`/`learning`/
 *     `mastered`). Süzgeç çipleri de bu üçü; SQL tarafı aynı eşiği kendi
 *     dilinde yazıyor.
 *   `wordStatus`   — listenin ETİKETİ, beş değer. `leech` en önde, çünkü
 *     "sürekli unutulan" bilgisi aralıktan bağımsız ve kullanıcı için daha
 *     önemli; `familiar` ise ucun üç değerinde olmayan bir ara bant.
 */
export type WordStatus = "new" | "learning" | "familiar" | "mastered" | "leech";

/** "Tanıdık" bandının tabanı (gün) — ucun üç değerinde yok, yalnız etikette. */
export const FAMILIAR_DAYS = 3;

/** Ucun gövdesine giden üç değer; süzgeç çipleriyle aynı küme. */
export function coarseStatus(intervalDays: number | null): "new" | "learning" | "mastered" {
  if (intervalDays == null) return "new";
  return intervalDays >= MASTERED_DAYS ? "mastered" : "learning";
}

/** Listenin etiketi — beş bant, `leech` en önde. */
export function wordStatus(row: { intervalDays: number | null; leech: boolean }): WordStatus {
  if (row.leech) return "leech";
  const coarse = coarseStatus(row.intervalDays);
  if (coarse !== "learning") return coarse;
  return (row.intervalDays ?? 0) >= FAMILIAR_DAYS ? "familiar" : "learning";
}

import type { CefrLevel } from "@/lib/skills/types";
import { CHEATSHEETS } from "./index";
import type { CheatSheet } from "./types";

/**
 * Tablodan çalışma maddesine.
 *
 * Ekrandaki tablo bir okuma nesnesi; çalışmak için sorulabilir bir şeye
 * ihtiyaç var. Bir madde tablonun tek bir HÜCRESİ: satırın anahtarı soruyu
 * kuruyor ("nehmen"), sütun başlığı ne istendiğini söylüyor ("Perfekt"),
 * hücrenin kendisi cevap ("hat genommen").
 *
 * Böyle bölmenin sebebi kelime tarafındaki mantığın aynısı: tekrar planı
 * BİLİNEN ŞEY başına tutulur. "Düzensiz fiiller" bir madde olsaydı, Perfekt'i
 * bilip Präteritum'u bilmeyen biri için plan hiçbir şey ifade etmezdi. Aynı
 * kelimenin farklı hâlleri ayrı ayrı geliyor — bir kelimenin dört biçimi dört
 * ayrı madde.
 */
export type CheatItem = {
  /**
   * Kalıcı kimlik: "grup|anahtar|sütun".
   *
   * Sayfadaki SIRAYA değil İÇERİĞE bağlı. Satır sırası değişince ya da araya
   * yeni satır girince ilerleme kaymasın diye: sıraya dayalı bir kimlik
   * tablonun ortasına bir fiil eklendiğinde ondan sonraki her maddenin
   * geçmişini yanlış maddeye bağlardı.
   */
  id: string;
  sheetId: string;
  sheetTitle: string;
  level: CefrLevel;
  /** Satırın ilk hücresi — sorunun konusu. */
  key: string;
  /** Sütun başlığı — ne sorulduğu. */
  label: string;
  answer: string;
  /** Aynı sütundaki diğer cevaplar; çeldirici havuzu. */
  siblings: string[];
  /** Satırın geri kalanı — cevaptan sonra gösterilen bağlam. */
  context: { label: string; value: string }[];
};

/**
 * Cevap olarak sorulamayacak hücreler.
 *
 * "—" bir cevap değil, bir boşluk işareti. Uzun hücreler ise cümle: "Er sprach
 * leise, sodass ich nichts verstand." bir tabloda örnek olarak değerlidir ama
 * ezberden yazdırılacak bir şey değil. Onlar cevaptan SONRA bağlam olarak
 * gösteriliyor — soru olarak değil.
 */
const MAX_ANSWER = 40;

function answerable(cell: string): boolean {
  const value = cell.trim();
  if (!value || value === "—" || value === "-") return false;
  if (value.length > MAX_ANSWER) return false;
  // Yalnızca noktalama ya da tek karakterlik işaret: "?" gibi hücreler soru olmaz.
  return /\p{L}/u.test(value);
}

/** Sayfanın çalışma kökü — dört fiil sayfası tek havuzu paylaşıyor. */
function groupOf(sheet: CheatSheet): string {
  return sheet.group ?? sheet.id;
}

function build(): CheatItem[] {
  const out: CheatItem[] = [];
  const seen = new Set<string>();

  for (const sheet of CHEATSHEETS) {
    const group = groupOf(sheet);
    for (const block of sheet.blocks) {
      if (block.kind !== "table") continue;
      if (block.columns.length < 2) continue;

      for (const row of block.rows) {
        const key = (row[0] ?? "").trim();
        if (!key) continue;

        for (let ci = 1; ci < block.columns.length; ci++) {
          const answer = (row[ci] ?? "").trim();
          if (!answerable(answer)) continue;

          const label = block.columns[ci];
          const id = `${group}|${key}|${label}`;
          // Aynı kimlik ilk görüldüğü seviyede kalıyor: A1 fiil sayfası B2'nin
          // alt kümesi ve öğrenci "nehmen · Perfekt"i bir kez öğreniyor.
          if (seen.has(id)) continue;
          seen.add(id);

          out.push({
            id,
            sheetId: sheet.id,
            sheetTitle: sheet.title,
            level: sheet.level,
            key,
            label,
            answer,
            siblings: block.rows
              .map((r) => (r[ci] ?? "").trim())
              .filter((v) => v && v !== answer && v !== "—"),
            context: block.columns
              .map((c, i) => ({ label: c, value: (row[i] ?? "").trim() }))
              .filter((c, i) => i !== 0 && i !== ci && c.value && c.value !== "—"),
          });
        }
      }
    }
  }
  return out;
}

export const CHEAT_ITEMS: CheatItem[] = build();

const BY_ID = new Map(CHEAT_ITEMS.map((i) => [i.id, i]));
export function itemById(id: string): CheatItem | undefined {
  return BY_ID.get(id);
}

/**
 * Bir sayfanın maddeleri.
 *
 * Fiil sayfalarında dikkat: kimlik gruba bağlı olduğu için A1 sayfasının
 * maddeleri B2 sayfasında da geçerli. Burada sayfanın KENDİ satırlarından
 * üretilen kimlikler dönüyor — yani A1 sayfasını çalışan biri 62 fiili,
 * B2 sayfasını çalışan 189'unu görüyor ve ortak olanların ilerlemesi tek.
 */
export function itemsOfSheet(sheet: CheatSheet): CheatItem[] {
  const group = groupOf(sheet);
  const ids = new Set<string>();
  for (const block of sheet.blocks) {
    if (block.kind !== "table") continue;
    for (const row of block.rows) {
      const key = (row[0] ?? "").trim();
      if (!key) continue;
      for (let ci = 1; ci < block.columns.length; ci++) {
        if (!answerable(row[ci] ?? "")) continue;
        ids.add(`${group}|${key}|${block.columns[ci]}`);
      }
    }
  }
  return CHEAT_ITEMS.filter((i) => ids.has(i.id));
}

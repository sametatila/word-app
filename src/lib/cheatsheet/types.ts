import type { CefrLevel } from "@/lib/skills/types";

/**
 * Cheatsheet — dersin değil, BAŞVURUNUN ekranı.
 *
 * Dersler ilerleyen bir yol: bir konu bir kez geçilir ve arkada kalır. Ama
 * dilbilgisi öyle çalışmıyor; sıfat çekimi tablosuna A2'de bakılır, B1'de
 * yeniden bakılır, C1'de hâlâ bakılır. Ders yolunda geriye gidip "sıfat çekimi
 * hangi dersteydi" diye aramak, bir tabloya bakmak için bir dersi yeniden
 * açmak demekti.
 *
 * Bu yüzden buradaki içerik ilerlemeye BAĞLI DEĞİL: kilit yok, sıra yok, puan
 * yok. Referans olarak açılıyor, kapanıyor. Model olarak alınan şey basılı
 * dilbilgisi ekleri — Klett'in "Liste der unregelmäßigen Verben"i gibi: dört
 * sütun, tek bakışta okunan bir tablo.
 *
 * Tek etkileşim mekaniği var: **sütun gizleme**. Basılı tabloyu elle kapatıp
 * kendini yoklamanın karşılığı. Her tabloya ayrı bir alıştırma yazmak
 * gerekmiyor — mekanik içerikten bağımsız olduğu için 60 tablonun hepsi aynı
 * anda çalışılabilir hâle geliyor ve yeni bir tablo eklemek yalnızca veri
 * eklemek oluyor.
 */

/**
 * Sayfanın yapı taşı.
 *
 * Bilerek yalnızca iki tür var. "Kalıp listesi", "eşleştirme", "çekim tablosu"
 * ayrı türler olarak başlamıştı; hepsi iki ya da daha çok sütunlu tabloya
 * indirgenince gizleme mekaniği tek bir yerde kaldı ve her içerik türü
 * kendiliğinden çalışılabilir oldu.
 */
export type CheatBlock =
  | {
      kind: "table";
      /** Tablonun ne gösterdiği — birden çok tablosu olan sayfalarda şart. */
      caption?: string;
      /**
       * Sütun başlıkları. İLK sütun anahtar sütun: satırın kimliği o ve
       * çalışma modunda hiçbir zaman gizlenmiyor. Gizlenirse satır
       * "bir şeyin bir hâli" olur ve neyin sorulduğu belirsizleşir.
       */
      columns: string[];
      rows: string[][];
    }
  | {
      /** Tabloya sığmayan kural — sıralama, istisna, uyarı. */
      kind: "note";
      text: string;
    };

export type CheatSheet = {
  /** Kalıcı kimlik: bağlantı ve açık/kapalı durumu buna bağlanıyor. */
  id: string;
  level: CefrLevel;
  /** Türkçe başlık — kullanıcı sayfayı bununla arıyor. */
  title: string;
  /** Almanca dilbilgisi terimi; kurs kitaplarında bu adla geçiyor. */
  de: string;
  /** Tek satır: bu sayfa hangi soruyu cevaplıyor. */
  summary: string;
  /**
   * Çalışma kimliğinin kökü — verilmezse `id`.
   *
   * Dört seviyenin düzensiz fiil sayfası AYNI satırları gösteriyor: A1 listesi
   * B2 listesinin içinde. Kimlik sayfadan türetilseydi "nehmen · Perfekt"
   * dört ayrı madde olurdu ve öğrenci aynı şeyi dört kez ezberlemek zorunda
   * kalırdı — tekrar planı da dörde bölünürdü. Ortak bir kök vermek dört
   * sayfayı tek bir çalışma havuzuna bağlıyor.
   */
  group?: string;
  blocks: CheatBlock[];
};

/** Sayfanın gizlenebilir hücre sayısı — çalışma modunun paydası. */
export function maskableCount(sheet: CheatSheet): number {
  let n = 0;
  for (const block of sheet.blocks) {
    if (block.kind !== "table") continue;
    n += block.rows.length * Math.max(0, block.columns.length - 1);
  }
  return n;
}

/** İçerik dosyaları için kısayol — blok yazımını okunur tutuyor. */
export const table = (
  columns: string[],
  rows: string[][],
  caption?: string,
): CheatBlock => ({ kind: "table", columns, rows, caption });

export const note = (text: string): CheatBlock => ({ kind: "note", text });

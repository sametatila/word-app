/**
 * Konuşma sözlükçesini TS içeriğinden çıkarır: (konusmaId, de, tr) üçlüleri.
 *
 * Neden regex ve neden TS'i import etmiyoruz: içerik dosyaları uygulamanın
 * geri kalanını (tip, yardımcı, sabit) içeri alıyor ve bu hattın çalışmak
 * için derleyiciye ihtiyacı yok. Tek istediği alan adları — onlar da
 * `VocabItem = { de, tr }` olarak sabit.
 *
 * Konuşma sınırı `id: "…"` satırıyla belirleniyor; bir `vocab:` bloğu kendinden
 * ÖNCEKİ en yakın `id`ye aittir. Sıra dosyada zaten böyle.
 */
import { readFileSync, readdirSync } from "node:fs";

const DIR = new URL("../../../src/lib/conversations/content/", import.meta.url).pathname;

/**
 * `block` ya `vocab` ya `patterns`: ikisi de `{ de, tr }` öğesi taşıyor ve
 * ikisi de konuşmaya konum sırasıyla bağlanıyor. Ayrı iki çıkarıcı yazmak iki
 * kopyanın ayrışması demekti (aynı gerekçe `data/en-de/check.mjs`in
 * `contains`i paylaşmasında da yazılı).
 */
export function extractVocab(block = "vocab") {
  const rows = [];
  for (const f of readdirSync(DIR).filter((x) => x.endsWith(".ts")).sort()) {
    const src = readFileSync(`${DIR}${f}`, "utf8");
    // Konuşmanın kimliği ve blokları TEK taramada, konum sırasıyla al: ayrı ayrı
    // toplanırsa hangi bloğun hangi konuşmaya ait olduğu kaybolur.
    let conversation = null;
    const re = new RegExp(`^\\s*id:\\s*"([^"]+)"|${block}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`, "gm");
    for (const m of src.matchAll(re)) {
      if (m[1] !== undefined) {
        conversation = m[1];
        continue;
      }
      /* SONDAKİ VİRGÜL. Uzun bir madde satıra sığmayınca biçimlendirici onu
         üç satıra açıyor ve `tr` değerinin ardına virgül koyuyor:
         `{\n  de: "…",\n  tr: "…",\n}`. Virgülü beklemeyen desen o maddeyi
         GÖRMÜYORDU — ne paketlenir, ne çevrilir, ne de kapı fark eder;
         `resolveConversation` sessizce Türkçesine düşerdi. Bir kalıp tam olarak
         böyle kayboldu (de-a1-sprachen, "Nein, aber ich lerne Deutsch.").
         Ölçüldü: 4.640 sözlükçe maddesi değişmiyor, kalıp 1.291 → 1.292. */
      for (const v of m[2].matchAll(/\{\s*de:\s*"([^"]+)",\s*tr:\s*"([^"]*)"\s*,?\s*\}/g))
        rows.push({ conversation, file: f, de: v[1], tr: v[2] });
    }
  }
  return rows;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractVocab(process.argv[2] || "vocab");
  const noConversation = rows.filter((r) => !r.conversation).length;
  console.log(`${rows.length} sözlükçe girdisi · ${new Set(rows.map((r) => r.conversation)).size} konuşma`);
  if (noConversation) console.log(`UYARI: ${noConversation} girdi bir konuşmaya bağlanamadı`);
}

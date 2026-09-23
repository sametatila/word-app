/**
 * Kelime seslendirme İŞ LİSTESİ — kendi karakter sesleri için.
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-words-jobs.ts <sunucu-dökümü.json> <çıktı.jsonl>
 *
 * Girdi sunucu veritabanının `words` dökümü (data/app/words.json değil: doğruluk kaynağı canlı tablo).
 * Metinler uygulamanın KENDİ kurallarıyla kuruluyor — oyunların ve yürüyüş modunun /api/tts'e gönderdiği
 * dizge birebir bu (`withArtikel`, `die <çoğul>`, örnek cümle, anadil karşılığı) ve aynı `cleanForSpeech`
 * temizliğinden geçiyor. Önbellek anahtarı bu temiz metin; üretim tarafı (tts-test/kelimeler.py) onu
 * DEĞİŞTİRMEDEN seslendirir ve manifestte saklar; sunucu eşlemesi bu metne bakar.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { withArtikel } from "../src/lib/option-label";
import { cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";

const [src, out] = process.argv.slice(2);
type W = { id: number; de: string; artikel: string | null; tr: string; en: string | null; formen: string | null; typ: string; niveau: string; beispiel: string | null; de_gloss: string | null; course: string };
const words: W[] = JSON.parse(readFileSync(src, "utf8"));
const course = words[0]?.course;
const target = course === "en" ? "en" : "de";
const lines: string[] = [];
const seen = new Set<string>();
function job(w: W, field: string, lang: string, text: string | null) {
  if (!text) return;
  for (const part of splitForSpeech(text)) {
    const clean = cleanForSpeech(part);
    if (!clean) continue;
    const key = `${lang}|${clean}`;
    if (seen.has(key)) continue;            // aynı temiz metin bir kez seslendirilir (örn. aynı çoğul iki maddede)
    seen.add(key);
    lines.push(JSON.stringify({ id: w.id, field, lang, niveau: w.niveau, rank: (w as { rank?: number }).rank ?? null, text: part, clean }));
  }
}
for (const w of words) {
  job(w, "word", target, withArtikel(w));                                   // oyunlar, yürüyüş modu hedefi
  if (target === "de" && w.typ === "Nomen" && w.formen) job(w, "plural", target, `die ${w.formen}`);   // çoğul oyunu
  job(w, "example", target, w.beispiel);                                    // çeviri/cloze/sıralama oyunları
  job(w, "gloss_tr", "tr", w.tr);                                            // yürüyüş modu, anadil tr
  job(w, "gloss_en", "en", w.en);                                            // yürüyüş modu, anadil en
  if (target === "en") job(w, "gloss_de", "de", w.de_gloss);                 // yürüyüş modu, anadil de (yalnız en kursu)
}
// sıra: sık kullanılan ve düşük seviye önce — ürün ilk gün A1'i duyar
lines.sort((a, b) => {
  const A = JSON.parse(a), B = JSON.parse(b);
  const lv = (x: string) => ["A1", "A2", "B1", "B2", "C1"].indexOf(x);
  return lv(A.niveau) - lv(B.niveau) || (A.rank ?? 1e9) - (B.rank ?? 1e9) || A.id - B.id;
});
writeFileSync(out, lines.join("\n") + "\n");
const by: Record<string, number> = {};
for (const l of lines) { const f = JSON.parse(l).field; by[f] = (by[f] ?? 0) + 1; }
console.log(`${course}: ${words.length} kelime → ${lines.length} iş`, by);

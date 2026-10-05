/**
 * İçerikteki KİŞİ ADLARI — sözcük kapıları için (vocab-gate, vocab-gate-en).
 *
 * Kapılar özel adı metinden tahmin ediyor: cümle içinde büyük harfle başlayan, havuzda olmayan sözcük addır.
 * Cümle başındaki ad bu kuralın kör noktası ("Paula wohnt in Köln." → "paula" havuz dışı sayılıyordu). Türkçe
 * adlar Almanca/İngilizce adlarla değiştirilince (2026-10-05, Samet: hedef dil içeriğinde o dilin adları)
 * Türkçe harfli adların süzgeçte kendiliğinden düşmesi bitti ve aynı kişiler sözcük borcu gibi görünmeye
 * başladı. Doğruluk kaynağı konuşmacı tabloları (`src/lib/tts/speakers.ts`): içerikteki her ad orada, çünkü
 * ses cinsiyeti oradan seçiliyor (`check:tts` eksik adı sayıyor).
 */
const fs = require("node:fs");
const path = require("node:path");

let cache = null;
function bilinenAdlar() {
  if (cache) return cache;
  const t = fs.readFileSync(path.join(__dirname, "../../src/lib/tts/speakers.ts"), "utf8");
  cache = new Set();
  for (const liste of ["FIRST_F", "FIRST_M", "SURNAME_M"]) {
    const m = t.match(new RegExp(`const ${liste} = \\[([\\s\\S]*?)\\];`));
    if (m) for (const x of m[1].matchAll(/"([^"]+)"/g)) cache.add(x[1]);
  }
  return cache;
}

module.exports = { bilinenAdlar };

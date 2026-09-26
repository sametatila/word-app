/**
 * Kelime havuzunda yayımlanmış bir sınav kelime listesinin örnek cümlesi olmasın.
 *
 * NEDEN: Almanca havuzun ilk hâli (Ağustos 2026) bir sınav kurumunun herkese
 * açık kelime listelerinden çıkarılmıştı ve örnek cümlelerin 1.079'u o listedeki
 * cümlelerin birebir aynısıydı (denetim 2026-09-25 İ1). 2026-09-26'da hepsi
 * özgün cümlelerle değişti; İngilizce kursun bir kısmı da o cümlelerin
 * çevirisiydi. Bu kapı aynı cümlelerin bir daha girmesini durduruyor.
 *
 * LİSTE METNİ DEPODA YOK. `data/published-examples.sha` yalnız her cümlenin
 * normalleştirilmiş hâlinin SHA-256 özetinin ilk 16 hanesini tutuyor: bir
 * cümlenin listede olup olmadığı sınanabiliyor, cümlelerin kendisi geri
 * elde edilemiyor. Normalleştirme: küçük harf, harf/rakam/boşluk dışı her şey
 * atılır, boşluklar teke iner. Üç kelimeden kısa cümleler listede yok.
 *
 * Kapsam: Almanca örnek cümleler (`words.json`, `data/meanings/out`) ve İngilizce
 * kursun örnek cümlelerinin Almanca çevirileri (`data/en-de/out`) — İngilizce
 * cümle listedeki Almanca cümlenin çevirisiyse, çevirisi listedeki cümleye döner.
 * Konuşma, beceri ve sınav metinleri kapsam dışı: oradaki eşleşmeler ("Wie alt
 * sind Sie?") herkesin kurduğu gündelik cümleler, bir listeden alınmış değil.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";

const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
const hash = (s) => createHash("sha256").update(norm(s)).digest("hex").slice(0, 16);

const LIST = new Set(readFileSync("data/published-examples.sha", "utf8").split("\n").map((l) => l.trim()).filter((l) => /^[0-9a-f]{16}$/.test(l)));
if (LIST.size < 1000) {
  console.error(`published-examples.sha beklenenden küçük (${LIST.size}); dosya bozuk olabilir`);
  process.exit(1);
}

const hits = [];
function test(where, id, text) {
  if (norm(text).split(" ").length < 3) return;
  if (LIST.has(hash(text))) hits.push(`${where} ${id}: "${text}"`);
}

for (const w of JSON.parse(readFileSync("data/app/words.json", "utf8"))) test("words.json", w.id, w.beispiel);
for (const f of readdirSync("data/meanings/out").filter((f) => f.endsWith(".json")))
  for (const r of JSON.parse(readFileSync(`data/meanings/out/${f}`, "utf8"))) test(`meanings/out/${f}`, r.id, r.beispiel);
for (const f of readdirSync("data/en-de/out").filter((f) => f.endsWith(".json")))
  for (const r of JSON.parse(readFileSync(`data/en-de/out/${f}`, "utf8"))) test(`en-de/out/${f}`, r.id, r.beispielDe);

if (hits.length) {
  console.error(`Yayımlanmış kelime listesindeki ${hits.length} örnek cümle havuzda (özgün cümleyle değiştir):`);
  for (const h of hits.slice(0, 50)) console.error("  " + h);
  if (hits.length > 50) console.error(`  … ve ${hits.length - 50} tane daha`);
  process.exit(1);
}
console.log(`tamam: yayımlanmış listeden örnek cümle yok (${LIST.size} özet)`);

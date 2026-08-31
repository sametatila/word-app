/**
 * Anlam yenileme paketlerini üretir: `node data/meanings/make-packets.mjs [boyut]`
 *
 * Paketler A1'den C1'e, her seviyenin içinde sıklık sırasına göre dizilir:
 * ilk paketler öğrencinin en çok gördüğü kelimeleri taşır, yani işin değeri
 * baştan itibaren birikir ve kalite erken görülebilir.
 *
 * `overlapping` alanı kritik. Tek karşılığa inince çakışma sayısı kendiliğinden
 * artıyor: "öğrenci" hem Schüler hem Student için doğru bir ilk cevaptır. Ajan
 * bunu aramak zorunda kalmasın diye, havuzun tamamında **aynı ilk anlamı**
 * taşıyan diğer maddeler önüne konuyor. Karşılaştırma mevcut çevirinin ilk
 * parçası üzerinden yapılıyor: yeni tek karşılık büyük ölçüde o olacak.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const SIZE = Number(process.argv[2] || 50);
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));

/** Örnek cümlelerin mevcut Türkçe çevirisi — ajan bağlam olarak görüyor. */
let beispielTr = new Map();
try {
  const rows = JSON.parse(readFileSync(`${ROOT}data/app/beispiel-tr.json`, "utf8"));
  beispielTr = new Map(rows.map((r) => [r.id, r.tr]));
} catch {
  console.warn("beispiel-tr.json okunamadı — mevcut çeviriler pakete girmeyecek.");
}

/** Çok anlamlı çevirinin ilk parçası: "açık olmak (dükkân, kapı)" → "açık olmak". */
const firstMeaning = (tr) =>
  tr
    .split(/[,;/]/)[0]
    .replace(/\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("tr-TR");

const byMeaning = new Map();
for (const w of words) {
  const k = firstMeaning(w.tr);
  if (!k) continue;
  if (!byMeaning.has(k)) byMeaning.set(k, []);
  byMeaning.get(k).push(w);
}

mkdirSync(`${ROOT}data/meanings/in`, { recursive: true });
mkdirSync(`${ROOT}data/meanings/out`, { recursive: true });

const index = [];
let total = 0;
for (const niveau of LEVELS) {
  const rows = words
    .filter((w) => w.niveau === niveau)
    .sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9) || a.id - b.id);

  for (let i = 0; i < rows.length; i += SIZE) {
    const slug = `${niveau.toLowerCase()}-${String(Math.floor(i / SIZE) + 1).padStart(3, "0")}`;
    const packetWords = rows.slice(i, i + SIZE).map((w) => {
      const overlapping = (byMeaning.get(firstMeaning(w.tr)) ?? [])
        .filter((o) => o.id !== w.id)
        .map((o) => `${o.artikel ? o.artikel + " " : ""}${o.de} (${o.niveau})`);
      return {
        id: w.id,
        de: `${w.artikel ? w.artikel + " " : ""}${w.de}`,
        typ: w.typ,
        niveau: w.niveau,
        formen: w.formen || "",
        currentTr: w.tr,
        currentBeispiel: w.beispiel || "",
        currentBeispielTr: beispielTr.get(w.id) || "",
        // Uzun listeler paketi şişiriyor ve okunmuyor; sekiz taneden fazlası
        // zaten "bu kelime çok genel bir karşılık almış" demek.
        ...(overlapping.length ? { overlapping: overlapping.slice(0, 8) } : {}),
      };
    });

    const path = `${ROOT}data/meanings/in/${slug}.json`;
    writeFileSync(path, JSON.stringify({ packet: slug, niveau, words: packetWords }, null, 1) + "\n");
    index.push({ packet: slug, niveau, items: packetWords.length });
    total += packetWords.length;
  }
}

writeFileSync(`${ROOT}data/meanings/in/_index.json`, JSON.stringify(index, null, 1) + "\n");

const finished = index.filter((p) => existsSync(`${ROOT}data/meanings/out/${p.packet}.json`)).length;
console.log(`${total} madde → ${index.length} paket (${SIZE}'lik)`);
for (const niveau of LEVELS) {
  const p = index.filter((x) => x.niveau === niveau);
  console.log(`  ${niveau}: ${p.length} paket, ${p.reduce((s, x) => s + x.items, 0)} madde`);
}
console.log(`çıktısı hazır olan: ${finished}/${index.length}`);

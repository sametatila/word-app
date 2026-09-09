/**
 * İngilizce havuzu çeviri paketlerine böler:
 *   `node data/en-de/make-packets.mjs [paket boyu]`
 *
 * Paket birimi SEVİYE + ellilik blok (`a1-001`, `b2-013`). Seviye birimi
 * bilerek: bir seviyeyi bitirmek ölçülebilir bir ilerleme ve A1 çevirisiyle C1
 * çevirisi aynı iş değil — biri günlük dil, öteki kurumsal metin.
 *
 * Almanca karşılık pakete YAZILIYOR, çünkü denetleyici cümlede onu arıyor ve
 * her koşuda `words.json`u yeniden okumak hattı kaynak dosyaya bağlardı.
 * Türetme kuralı seed ile aynı: elle yazılan varsa o, yoksa kaynak satırın
 * başlığı (bkz. `scripts/seed-english.ts`).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const IN = `${ROOT}data/en-de/in`;
const SIZE = Number(process.argv[2] ?? 50);

const jsonl = (p) =>
  readFileSync(p, "utf8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l));

const german = new Map(
  JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8")).map((r) => [r.id, r.de]),
);
const rows = jsonl(`${ROOT}data/app/words-en.json`);

// Almanca karşılığı OLMAYAN madde çeviri paketine girmiyor: denetleyici cümlede
// onu arıyor ve arayacak bir şey yoksa denetim anlamsız. Bugün böyle madde yok
// (7.175/7.175) ama kural burada dursun ki havuza kaynaksız bir kelime
// eklendiği gün paket sessizce denetimsiz kalmasın.
const items = [];
let skipped = 0;
for (const r of rows) {
  const deGloss = r.deGloss?.trim() || (r.srcId ? german.get(r.srcId) : null);
  if (!deGloss || !r.beispiel?.trim()) {
    skipped++;
    continue;
  }
  items.push({
    id: r.id,
    niveau: r.niveau,
    en: r.de,
    deGloss,
    tr: r.tr,
    beispiel: r.beispiel.trim(),
    beispielTr: r.beispielTr?.trim() ?? null,
  });
}

rmSync(IN, { recursive: true, force: true });
mkdirSync(IN, { recursive: true });

const byLevel = new Map();
for (const it of items) {
  const lv = it.niveau.toLowerCase();
  if (!byLevel.has(lv)) byLevel.set(lv, []);
  byLevel.get(lv).push(it);
}

let packets = 0;
for (const [lv, list] of [...byLevel].sort()) {
  // Sıra rank değil id: rank İngilizce kursta null ve id kaynak sırasını
  // koruyor, yani paketler iki koşu arasında yer değiştirmiyor.
  list.sort((a, b) => a.id - b.id);
  for (let i = 0; i < list.length; i += SIZE) {
    const name = `${lv}-${String(Math.floor(i / SIZE) + 1).padStart(3, "0")}`;
    writeFileSync(
      `${IN}/${name}.json`,
      `${JSON.stringify({ packet: name, words: list.slice(i, i + SIZE) }, null, 1)}\n`,
    );
    packets++;
  }
  console.log(`  ${lv}  ${list.length} madde · ${Math.ceil(list.length / SIZE)} paket`);
}
console.log(`\n${packets} paket · ${items.length} madde${skipped ? ` · ${skipped} atlandı (karşılık ya da cümle yok)` : ""}`);

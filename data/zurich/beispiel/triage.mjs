/**
 * Züritüütsch örnek cümleleri TRİYAJ eder:
 *   `node data/zurich/beispiel/triage.mjs [paket|seviye|all]`
 *
 * Soru şu: 8.267 maddenin kaçının cümlesi gerçekten yeniden yazılacak?
 * SPEC "paketin çoğu maddesinde cümle değişmemiştir" diyor ama sayı yoktu, ve
 * sayı olmadan iş planlanamıyor — "çoğu" 200 madde de olabilir 4.000 da.
 *
 * Ölçü, denetleyicinin KENDİ kurallarıyla yapılıyor (`check.mjs`ten içe
 * aktarılıyor, kopyalanmıyor): mevcut lehçe cümlesi `beispielDe` ile eşleşen
 * bir çıktı olarak kabul edilir miydi? Edilirse KORUNUR, edilmezse yazılacak
 * listesine girer — ve neden girdiği de yazılır.
 *
 * Sayı uyuşmazlığı burada en ağır ölçüt: çeviri Almanca cümleden koşulsuz
 * devralındığı için sayılar tutmazsa çeviri yalan söyler.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { contains, numbers, words_ } from "./check.mjs";

const ROOT = new URL("../../..", import.meta.url).pathname;
const IN = `${ROOT}data/zurich/beispiel/in`;
const ARG = (process.argv[2] || "all").toLowerCase();

const packets = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((p) => ARG === "all" || p === ARG || p.startsWith(`${ARG}-`))
  .sort();

/** Mevcut cümle olduğu gibi kabul edilebilir mi? Değilse sebepleri. */
function reasons(k) {
  const b = String(k.currentGsw ?? "").trim();
  const out = [];
  if (!b) return ["cümle yok"];
  if (/\//.test(b)) out.push("çok seçenekli (/)");
  if (!/[.!?]$/.test(b)) out.push("noktalama");
  if (/[.!?]\s+\S/.test(b.replace(/[.!?]$/, ""))) out.push("çok cümleli");
  if (/ß/.test(b)) out.push("ß");
  const n = words_(b);
  if (n < 3 || n > 13) out.push(`uzunluk ${n}`);
  if (!contains(b, k.gsw)) out.push("kelime cümlede yok");
  if (numbers(b) !== numbers(k.beispielDe)) out.push("sayı uyuşmazlığı");
  if (/\?$/.test(b) !== /\?$/.test(k.beispielDe)) out.push("soru uyuşmazlığı");
  return out;
}

const tally = new Map();
let total = 0;
let keep = 0;
const todo = [];

for (const p of packets) {
  const src = JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8"));
  let packetTodo = 0;
  for (const k of src.words) {
    total++;
    const rs = reasons(k);
    if (!rs.length) {
      keep++;
      continue;
    }
    packetTodo++;
    for (const r of rs) tally.set(r, (tally.get(r) ?? 0) + 1);
    todo.push({ packet: p, id: k.id, gsw: k.gsw, reasons: rs, beispielDe: k.beispielDe, currentGsw: k.currentGsw });
  }
  if (packetTodo) console.log(`  ${p}  ${packetTodo}/${src.words.length} yazılacak`);
}

console.log(`\nTOPLAM ${total} madde · ${keep} korunabilir · ${total - keep} yazılacak`);
console.log("\nSebepler (bir madde birden çok sebep taşıyabilir):");
for (const [r, n] of [...tally].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)}  ${r}`);

const path = `${ROOT}data/zurich/beispiel/todo.json`;
writeFileSync(path, JSON.stringify(todo, null, 1));
console.log(`\nYazılacaklar: ${path}`);

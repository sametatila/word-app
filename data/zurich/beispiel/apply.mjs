/**
 * Paket çıktısını kurar:
 *   `node data/zurich/beispiel/apply.mjs a1-001`
 *
 * SPEC paketteki HER maddenin çıktıda olmasını istiyor, ama maddelerin çoğunda
 * cümle değişmiyor (triyaj: 8.267'nin 7.084'ü korunabilir). Korunanları elle
 * kopyalamak hem gereksiz emek hem de kopyalarken bozma riski — bu yüzden
 * çıktı burada kuruluyor:
 *
 *   out/<paket>.json  =  in/<paket>.json'daki `currentGsw`
 *                        ÜSTÜNE  fix/<paket>.json'daki yeniden yazılanlar
 *
 * `fix/` yalnızca DEĞİŞENLERİ taşır: `[{ "id": 417, "beispiel": "…" }]`.
 * Böylece bir paketin diff'i "neyi elle yazdım"ı gösteriyor, elli maddelik bir
 * kopyayı değil.
 *
 * Doğrulama ayrı adımda: `node data/zurich/beispiel/check.mjs <paket>`.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { contains, numbers, words_ } from "./check.mjs";

const ROOT = new URL("../../..", import.meta.url).pathname;
const IN = `${ROOT}data/zurich/beispiel/in`;
const FIX = `${ROOT}data/zurich/beispiel/fix`;
const OUT = `${ROOT}data/zurich/beispiel/out`;
const ARG = (process.argv[2] || "all").toLowerCase();

mkdirSync(OUT, { recursive: true });
mkdirSync(FIX, { recursive: true });

const packets = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((p) => ARG === "all" || p === ARG || p.startsWith(`${ARG}-`))
  .sort();

let built = 0;
let skipped = 0;
let written = 0;
let kept = 0;

for (const p of packets) {
  const src = JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8"));
  const fixPath = `${FIX}/${p}.json`;
  const fixes = existsSync(fixPath)
    ? new Map(JSON.parse(readFileSync(fixPath, "utf8")).map((r) => [r.id, String(r.beispiel ?? "").trim()]))
    : new Map();

  // fix/ içinde pakete ait olmayan bir id varsa sessizce yutulmaz: büyük
  // ihtimalle yanlış dosyaya yazılmıştır ve o madde hiç düzelmemiş olur.
  const ids = new Set(src.words.map((k) => k.id));
  const stray = [...fixes.keys()].filter((id) => !ids.has(id));
  if (stray.length) {
    console.error(`${p}: pakete ait olmayan id — ${stray.join(", ")}`);
    process.exitCode = 1;
    continue;
  }

  const out = src.words.map((k) => ({
    id: k.id,
    beispiel: (fixes.get(k.id) ?? String(k.currentGsw ?? "")).trim(),
  }));

  /*
    TEMİZ DEĞİLSE YAZILMAZ.

    İlk hâli koşulsuz yazıyordu ve `apply.mjs a1` henüz elle yazılmamış on iki
    paket için de çıktı üretti — içleri eski cümlelerle doluydu ve `out/`
    veritabanının tohumlandığı yer. Yani "hazır değil"i "hazır" diye
    işaretlemiş oluyordu; bu hattın kaçınmak için kurulduğu şeyin ta kendisi.

    Denetim `check.mjs`ten geliyor, kopyalanmıyor.
  */
  const bad = [];
  for (const k of src.words) {
    const b = out.find((r) => r.id === k.id).beispiel;
    const n = words_(b);
    if (!b) bad.push(`${k.id} boş`);
    else if (!/[.!?]$/.test(b)) bad.push(`${k.id} noktalama`);
    else if (/[.!?]\s+\S/.test(b.replace(/[.!?]$/, ""))) bad.push(`${k.id} çok cümleli`);
    else if (/ß/.test(b)) bad.push(`${k.id} ß`);
    else if (n < 3 || n > 13) bad.push(`${k.id} uzunluk ${n}`);
    else if (!contains(b, k.gsw)) bad.push(`${k.id} kelime yok`);
    else if (numbers(b) !== numbers(k.beispielDe)) bad.push(`${k.id} sayı`);
    // Soru uyuşmazlığı `check.mjs`te UYARI ama kapı için HATA: çeviri Almanca
    // cümleden devralındığı için, cümle soruyken çevirisi düz cümle oluyor.
    // Dört paket tam bu yüzden "temiz" sanılıp yazılmıştı.
    else if (/\?$/.test(b) !== /\?$/.test(k.beispielDe)) bad.push(`${k.id} soru`);
  }
  if (bad.length) {
    console.log(`  ${p}: ATLANDI — ${bad.length} madde eksik (${bad.slice(0, 3).join(", ")}${bad.length > 3 ? "…" : ""})`);
    // Önceden yazılmış bozuk bir çıktı varsa kaldırılıyor: yarım bir dosyanın
    // durması, "bu paket bitti" demekle aynı şey.
    rmSync(`${OUT}/${p}.json`, { force: true });
    skipped++;
    continue;
  }

  for (const r of out) {
    if (fixes.has(r.id)) written++;
    else kept++;
  }
  writeFileSync(`${OUT}/${p}.json`, `${JSON.stringify(out, null, 1)}\n`);
  built++;
}

console.log(`${built} paket kuruldu · ${written} yeniden yazıldı · ${kept} korundu` + (skipped ? ` · ${skipped} atlandı` : ""));

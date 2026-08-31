/**
 * A2 üretim denetimi: `node check.js [--verbose]`
 *
 * Ajan çıktılarını `out/*.json` altından okur ve birleştirmeden ÖNCE denetler.
 * Üretilen veri, kaynak listeler kadar dikkatli elenmeli — bir kez havuza
 * girdikten sonra yanlış artikel ya da B2 seviyesinde bir kelime öğrenciye
 * sessizce öğretilir.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sentenceContainsWord } from "../../src/lib/headword";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VERBOSE = process.argv.includes("--verbose");

const norm = (s: unknown): string =>
  String(s ?? "")
    .toLowerCase()
    .replace(/^-+|-+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

const existing = new Set(
  fs.readFileSync(path.join(HERE, "existing.txt"), "utf8").split("\n").map(norm).filter(Boolean),
);
const freq = new Map();
for (const line of fs.readFileSync(path.join(HERE, "de_50k.txt"), "utf8").split("\n")) {
  const [w, n] = line.split(" ");
  if (w) freq.set(w.toLowerCase(), Number(n));
}

const outDir = path.join(HERE, "out");
const files = fs.existsSync(outDir)
  ? fs.readdirSync(outDir).filter((f) => f.endsWith(".json")).sort()
  : [];

const seen = new Map<string, string>(); // norm(de) -> ilk gören dosya
const kept: Record<string, unknown>[] = [];
const stats = { files: 0, items: 0, rejected: 0 };
const reasons: Record<string, number> = {};
/** Cümlede kökü görünmeyenler — elenmez, gözle denetlenir. */
const suspect: string[] = [];

const reject = (file: string, item: Record<string, unknown> | undefined, why: string) => {
  stats.rejected++;
  reasons[why] = (reasons[why] ?? 0) + 1;
  if (VERBOSE) console.log(`   ${file} "${item?.de ?? "?"}" → ${why}`);
};

for (const file of files) {
  let arr: Record<string, unknown>[];
  try {
    arr = JSON.parse(fs.readFileSync(path.join(outDir, file), "utf8"));
  } catch (e: unknown) {
    console.log(`${file.padEnd(22)} ✗ JSON bozuk: ${(e as Error).message}`);
    continue;
  }
  if (!Array.isArray(arr)) {
    console.log(`${file.padEnd(22)} ✗ dizi değil`);
    continue;
  }
  stats.files++;
  let ok = 0;

  for (const raw of arr) {
    const it = raw as {
      de?: string; artikel?: string; tr?: string; formen?: string;
      typ?: string; beispiel?: string; beispielTr?: string;
    };
    stats.items++;
    const de = String(it?.de ?? "").trim();
    const key = norm(de);

    if (!de) { reject(file, it, "boş kelime"); continue; }
    if (!/^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß\s-]*$/.test(de)) { reject(file, it, "geçersiz karakter"); continue; }
    if (existing.has(key)) { reject(file, it, "havuzda zaten var"); continue; }
    if (seen.has(key)) { reject(file, it, `tekrar (${seen.get(key)})`); continue; }
    if (!["Nomen", "Verb", "Sonstiges"].includes(it.typ ?? "")) { reject(file, it, "typ geçersiz"); continue; }
    if (it.typ === "Nomen" && !["der", "die", "das"].includes(it.artikel ?? "")) {
      reject(file, it, "isimde artikel yok"); continue;
    }
    if (it.typ !== "Nomen" && it.artikel) { reject(file, it, "isim değil ama artikelli"); continue; }
    if (!String(it.tr ?? "").trim()) { reject(file, it, "Türkçe yok"); continue; }
    if (!String(it.beispiel ?? "").trim()) { reject(file, it, "örnek cümle yok"); continue; }
    if (!String(it.beispielTr ?? "").trim()) { reject(file, it, "çeviri yok"); continue; }

    // Örnek cümle kelimeyi taşımalı. Ortak mantık kullanılıyor: ayrılabilen
    // fiiller cümlede parçalanır ("aufwärmen" → "wärme ... auf") ve düz alt
    // dize araması bunları yanlışlıkla eler.
    // Uyarı, ret değil. Almanca çekimi sezgisel bir kuralla yakalanamıyor:
    // "anhalten" cümlede "hält an", "eintreffen" ise "trifft ein" olur (gövde
    // ünlüsü değişir), "edel" niteleyici olunca "edle" olur. İyi kelimeyi
    // elemek, kusurlu bir sezgiyi memnun etmekten kötü. Bu maddeler yalnızca
    // boşluk doldurma turuna giremez; diğer dokuz oyun onları kapsıyor.
    if (!sentenceContainsWord(de, it.beispiel ?? "")) suspect.push(`${de} → ${it.beispiel}`);
    // Çeviri örnek cümleyle örtüşmeli: sayılar aynı kalmalı.
    const nums = (s: unknown) => (String(s).match(/\d+/g) ?? []).sort().join(",");
    if (nums(it.beispiel) !== nums(it.beispielTr)) { reject(file, it, "çeviride sayı uyuşmuyor"); continue; }

    seen.set(key, file);
    kept.push({ ...it, de, _file: file, _freq: freq.get(key) ?? freq.get(key.split(" ").pop()) ?? 0 });
    ok++;
  }
  console.log(`${file.padEnd(22)} ${String(arr.length).padStart(4)} madde → ${ok} kabul`);
}

// Sıklık kapısı: A2 günlük dildir, listede hiç geçmeyen kelime şüphelidir.
const rare = kept.filter((k) => k._freq === 0);
console.log(`\ntoplam: ${stats.items} üretildi · ${kept.length} kabul · ${stats.rejected} elendi`);
if (stats.rejected) {
  console.log("elenme nedenleri:");
  for (const [why, n] of Object.entries(reasons).sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(n).padStart(4)}  ${why}`);
}
console.log(`\nsıklık listesinde geçmeyen: ${rare.length} (%${((rare.length / Math.max(1, kept.length)) * 100).toFixed(1)})`);
if (rare.length && VERBOSE) console.log("  " + rare.slice(0, 20).map((r) => r.de).join(", "));

const byTyp: Record<string, number> = {};
for (const k of kept) {
  const t = String(k.typ);
  byTyp[t] = (byTyp[t] ?? 0) + 1;
}
console.log("tür dağılımı:", JSON.stringify(byTyp));
if (suspect.length) {
  console.log(`\ngözle denetlenecek — cümlede kök görünmüyor (${suspect.length}):`);
  for (const s of suspect) console.log("   ", s);
}

fs.writeFileSync(path.join(HERE, "accepted.json"), JSON.stringify(kept, null, 1));
console.log(`\naccepted.json yazıldı (${kept.length} madde)`);

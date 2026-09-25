/**
 * Maskotun adı Nomi (2026-09-25, Samet'in kararı: geri dönülmez). Eski ad
 * "Erdi" depoda hiçbir yerde — dosya içeriğinde ya da dosya/klasör adında —
 * yeniden belirmesin.
 *
 * Türkçe "sona erdi", "yeşerdi" gibi fiiller eşleşmesin diye yalnız büyük
 * harfle başlayan ad aranıyor ve önünde/arkasında harf (Türkçe ve Almanca
 * harfler dahil) olmamalı. Dosya adında ise bağımsız "erdi" parçası aranıyor.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const L = "A-Za-zÇĞİÖŞÜçğıöşüÄÖÜäöüß";
const NAME = new RegExp(`(?<![${L}])(Erdi|ERDI)(?![a-zçğıöşü])`, "g");
const FILE = /(^|[^a-z])erdi([^a-z]|$)/i;
/* Bu kapının kendisi eski adı anmak zorunda. */
const SELF = "scripts/check-no-erdi.mjs";

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);
const problems = [];
for (const f of files) {
  if (f === SELF) continue;
  if (FILE.test(f.split("/").pop() ?? "")) problems.push(`${f}: dosya adında eski maskot adı`);
  let text;
  try {
    text = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  if (text.includes("\u0000")) continue;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    NAME.lastIndex = 0;
    if (NAME.test(line)) problems.push(`${f}:${i + 1}: ${line.trim().slice(0, 120)}`);
  });
}

if (problems.length) {
  console.error(`Maskotun adı Nomi; eski ad "Erdi" ${problems.length} yerde geçiyor:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`tamam: ${files.length} dosyada eski maskot adı yok`);

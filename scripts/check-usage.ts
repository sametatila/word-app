/**
 * Kullanım bilgisi kapısı — `npm run check:usage`.
 *
 * `usage` alanı kapalı bir kod kümesi (`lib/usage`); kart satırı kodu
 * öğrencinin anadilinde etikete çeviriyor ve bilinmeyen kodu sessizce
 * düşürüyor. Yanlış yazılmış bir kod ("Dat", "dativ") bu yüzden ekranda hiç
 * görünmez, kimse fark etmez; burada yakalanıyor. Ayrıca kodun maddeye
 * uyduğu denetleniyor: hâl ve söz dizimi yalnız işlev sözcüklerinde, tek hâl,
 * "brit" yalnız İngilizce kursta, "tier" yalnız fiilde.
 */
import { readFileSync } from "node:fs";
import { USAGE_CODES } from "../src/lib/usage";

type Row = { id: number; de: string; typ: string; usage?: string };
const CASE = new Set(["akk", "dat", "gen", "wechsel"]);
const SYNTAX = new Set(["ns", "konj0", "pos1"]);
const errors: string[] = [];
let n = 0;

function check(course: "de" | "en", rows: Row[]) {
  for (const r of rows) {
    if (r.usage == null) continue;
    n++;
    const codes = r.usage.split(" ");
    const where = `${course}${r.id} ${r.de}`;
    if (r.usage !== r.usage.trim() || codes.some((c) => !c)) errors.push(`${where}: boşluk "${r.usage}"`);
    for (const c of codes) if (!(USAGE_CODES as readonly string[]).includes(c)) errors.push(`${where}: bilinmeyen kod "${c}"`);
    if (new Set(codes).size !== codes.length) errors.push(`${where}: yinelenen kod`);
    if (codes.filter((c) => CASE.has(c)).length > 1) errors.push(`${where}: birden çok hâl`);
    if (course === "de" && r.typ !== "Sonstiges" && codes.some((c) => CASE.has(c) || SYNTAX.has(c))) errors.push(`${where}: hâl/söz dizimi yalnız işlev sözcüğünde (${r.typ})`);
    if (course === "de" && codes.includes("brit")) errors.push(`${where}: "brit" Almanca kursta`);
    if (codes.includes("tier") && r.typ !== "Verb") errors.push(`${where}: "tier" yalnız fiilde (${r.typ})`);
    if (course === "en" && codes.some((c) => CASE.has(c) || SYNTAX.has(c))) errors.push(`${where}: İngilizce kursta hâl/söz dizimi kodu`);
  }
}

check("de", JSON.parse(readFileSync("data/app/words.json", "utf8")));
check("en", readFileSync("data/app/words-en.json", "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)));
if (errors.length) { console.log(errors.map((e) => "  HATA " + e).join("\n")); console.log(`\n${errors.length} hata`); process.exit(1); }
console.log(`tamam: ${n} maddede kullanım bilgisi, kodlar kapalı kümede`);

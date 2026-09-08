/**
 * Mobil sözlükleri web'e ÇEKER: `node scripts/i18n-pull.mjs`
 *
 * Arayüz metinlerinin kaynağı MOBİL (`mobile/src/i18n/*.ts`). Sebep tarih:
 * 964 anahtarlık tr/en/de seti orada yazıldı ve orada bakımı yapılıyor; web
 * bugüne kadar tek dile gömülüydü. İki kopya elle tutulsaydı ilk çeviri
 * düzeltmesinde ayrışırlardı.
 *
 * Bu betik `src/i18n/base/` altını ÜRETİR — orası elle düzenlenmez. Web'e özel
 * anahtarlar (mobilde karşılığı olmayan ekranların metinleri) `src/i18n/web/`
 * altında durur ve `lib/i18n/dict.ts` ikisini birleştirir.
 *
 * Depodaki `dump-*-mobile.ts` betikleri içerik için ters yönde çalışıyor
 * (web → mobil); arayüz metni için yön bu, çünkü kaynak orada.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LANGS = ["tr", "en", "de"];
const SRC = "mobile/src/i18n";
const OUT = "src/i18n/base";

await mkdir(OUT, { recursive: true });

let total = 0;
for (const lang of LANGS) {
  const raw = await readFile(path.join(SRC, `${lang}.ts`), "utf8");
  // Dosyalar saf veri: `export const <lang>: Record<string, string> = { … };`
  const i = raw.indexOf("= {");
  if (i < 0) throw new Error(`${lang}.ts beklenen biçimde değil`);
  const body = raw.slice(i + 2);
  const count = (body.match(/^\s{2}"/gm) ?? []).length;
  total += count;
  const header = `/* ÜRETİLDİ — elle düzenleme. Kaynak: mobile/src/i18n/${lang}.ts
 * Yenilemek için: node scripts/i18n-pull.mjs
 * Web'e özel anahtarlar src/i18n/web/${lang}.ts içinde. */
export const ${lang}Base: Record<string, string> = `;
  await writeFile(path.join(OUT, `${lang}.ts`), header + body.trimEnd() + "\n", "utf8");
  console.log(`${lang}: ${count} anahtar`);
}

// Anahtar kümeleri aynı mı — tr kaynak, diğerleri onu izler.
const keysOf = async (lang) => {
  const s = await readFile(path.join(OUT, `${lang}.ts`), "utf8");
  return new Set([...s.matchAll(/^\s{2}"([^"]+)":/gm)].map((m) => m[1]));
};
const tr = await keysOf("tr");
let missing = 0;
for (const lang of ["en", "de"]) {
  const set = await keysOf(lang);
  const gaps = [...tr].filter((k) => !set.has(k));
  const extra = [...set].filter((k) => !tr.has(k));
  if (gaps.length) console.log(`  ${lang}: ${gaps.length} eksik (Türkçeye düşecek) — ${gaps.slice(0, 3).join(", ")}`);
  if (extra.length) console.log(`  ${lang}: ${extra.length} fazla anahtar — ${extra.slice(0, 3).join(", ")}`);
  missing += gaps.length + extra.length;
}
console.log(missing === 0 ? "Anahtar kümeleri aynı." : `${missing} fark var (eksik çeviri Türkçeye düşer).`);
console.log(`Toplam ${total} satır çekildi.`);

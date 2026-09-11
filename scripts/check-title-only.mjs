/**
 * Yalnız ipucu balonunda duran metin: `node scripts/check-title-only.mjs`
 *
 * NEDEN VAR. DOM'daki `title` özniteliği YALNIZ fareyle üstüne gelince
 * açılıyor: dokunmatikte hiç açılmaz, klavyeyle erişilmez, ekran okuyucuların
 * bir kısmı okur bir kısmı okumaz. Yani `title` bir metni GÖSTERMEZ, gizler.
 * Bir bilgi başka hiçbir yerde yazmıyorsa ve yalnız orada duruyorsa,
 * kullanıcıların bir bölümü onu HİÇ görmüyor.
 *
 * Bu sınıf kusur tek tek çıkmaya devam etti (2026-09-11/12): yürüyüşün
 * "konuşma yine sayılır" güvencesi, monologun hedef çipleri, yazma kartının
 * kalıp karşılıkları, ders özetinin kalıp listesi, devre dışı "arkadaş ekle"
 * düğmesinin sebebi. Hepsi aynı biçimde bulundu, yani mutlak bir ölçütle
 * taranmalı.
 *
 * ÖLÇÜT. Bir DOM `title=` ya `aria-label` ile birlikte durur (o zaman metin
 * erişilebilir addan da okunur) ya da bu dosyadaki TABAN'da sayılıdır. Taban
 * bir BORÇ listesi, bir onay değil: sayılar yalnız AZALABİLİR.
 *
 * `<Component title=...>` (PageBack, SettingRow, Card, Section…) bu kapının
 * konusu DEĞİL — o bir prop, öznitelik değil. Tarama yalnız küçük harfle
 * başlayan DOM etiketlerine bakıyor.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");

/**
 * BORÇ TABANI — dosya başına "yalnız ipucu balonunda" duran metin sayısı.
 *
 * Her satır bir borç. Sayılar azaltılabilir (ve azaltılmalı), artırılamaz.
 * Yeni bir dosya eklenirse kapı kırmızı olur: yeni borç açmanın yolu yok.
 */
const TABAN = {
  /* Yönetim panosu: kullanıcı yüzeyi değil, Android karşılığı da yok.
     Grafik çubuğunun günü/değeri orada tabloda da yazıyor. */
  "src/app/admin/dashboard.tsx": 2,
  /* İlerleme grafiği: gün ve değer eksende ve altındaki satırda da var;
     ipucu yalnızca kolaylık, tek taşıyıcı değil. */
  "src/components/progress-view.tsx": 2,
};

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
    else if (/\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
}
/** Açılış etiketinin bittiği yer — ilk `>` DEĞİL (bkz. `check:hit`). */
function acilisSonu(blok) {
  let derinlik = 0, tirnak = null;
  for (let i = 0; i < blok.length; i++) {
    const c = blok[i];
    if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
    if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
    if (c === "{") derinlik++;
    else if (c === "}") derinlik--;
    else if (c === ">" && derinlik === 0) return i;
  }
  return -1;
}

const sayim = new Map();
for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  const src = stripComments(fs.readFileSync(abs, "utf8"));
  for (const m of src.matchAll(/<([a-z][a-z0-9.]*)\b/g)) {
    const j = m.index;
    const son = acilisSonu(src.slice(j));
    if (son < 0) continue;
    const acilis = src.slice(j, j + son + 1);
    if (!/\btitle=/.test(acilis)) continue;
    /* `aria-label` varsa metin erişilebilir addan da okunuyor. */
    if (/\baria-label=/.test(acilis)) continue;
    sayim.set(rel, (sayim.get(rel) ?? 0) + 1);
  }
}

const artan = [];
const yeni = [];
for (const [rel, n] of [...sayim.entries()].sort()) {
  if (!(rel in TABAN)) yeni.push({ rel, n });
  else if (n > TABAN[rel]) artan.push({ rel, n, taban: TABAN[rel] });
}
/* Taban azaldıysa haber ver: sayı güncellenmeli, yoksa borç geri açılabilir. */
const azalan = Object.entries(TABAN).filter(([rel, n]) => (sayim.get(rel) ?? 0) < n);

if (yeni.length || artan.length) {
  console.error("check:title — yalnız ipucu balonunda duran YENİ metin:\n");
  for (const y of yeni) console.error(`  ${y.rel}  ${y.n} yeni`);
  for (const a of artan) console.error(`  ${a.rel}  ${a.n} > taban ${a.taban}`);
  console.error("\n`title` dokunmatikte açılmaz, klavyeyle erişilmez. Metni GÖRÜNÜR yaz");
  console.error("ya da aynı metni `aria-label` olarak da ver.");
  process.exit(1);
}
const toplam = [...sayim.values()].reduce((a, b) => a + b, 0);
if (azalan.length) {
  console.log(`check:title — borç AZALDI, tabanı güncelle:`);
  for (const [rel, n] of azalan) console.log(`  ${rel}: ${n} → ${sayim.get(rel) ?? 0}`);
  process.exit(1);
}
console.log(`check:title — yalnız ipucu balonunda duran metin artmadı: tamam (${toplam} kayıtlı borç)`);

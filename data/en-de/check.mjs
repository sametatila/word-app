/**
 * İngilizce örnek cümlelerin Almanca çevirisini denetler:
 *   `node data/en-de/check.mjs [paket|seviye|all]`
 *
 * Ayrım bilerek: `hata` üretimi durdurur, `uyarı` durdurmaz. Uyarı, doğru
 * olabileceği gibi yanlış da olabilen bir işaret; hataya çevirmek yazarı doğru
 * işi bozmaya iterdi.
 *
 * DENETLEYİCİ YENİDEN YAZILMIYOR. Almanca `contains` zaten var ve 8.267 madde
 * üzerinde çalışılmış (`data/meanings/contains.mjs`): ayrılabilir ön ekler,
 * güçlü fiil gövdeleri, çoğul ünlü değişimi. İkinci bir kopya çıkarmak, iki
 * kopyanın ayrışması demekti.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const IN = `${ROOT}data/en-de/in`;
const OUT = `${ROOT}data/en-de/out`;
const ARG = (process.argv[2] || "all").toLowerCase();

/** Cümledeki sayılar — çeviri sayıyı değiştiremez. */
/*
  Sayı kümesi karşılaştırması, ama HARFE YAPIŞIK rakamlar sayı değildir.

  `\d+` düz hâliyle «CO2-Ausstoß»taki 2'yi bir sayı sanıyordu ve İngilizce
  karşılığı ("carbon emissions") rakamsız olduğu için madde HATA veriyordu.
  Aynı tuzak B2, G20, mp3, DIN A4 gibi her formül/kod adında var — bunlar
  nicelik değil, adın parçası.

  Bu, «Diät» kırpılmasıyla aynı aile: JS'te `\b` ve `\d` sınırları harfi
  hesaba katmıyor, o yüzden sınır `\p{L}` ile yazılıyor.
*/
const numbers = (t) => [...String(t ?? "").matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort().join(",");
const words_ = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;

const packets = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((p) => ARG === "all" || p === ARG || p.startsWith(`${ARG}-`))
  .sort();

const errors = [];
const warnings = [];
let items = 0;
let pending = 0;

for (const p of packets) {
  const src = JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8"));
  const path = `${OUT}/${p}.json`;
  if (!existsSync(path)) {
    pending++;
    continue;
  }

  let rows;
  try {
    rows = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`  [bozuk json] ${p}: ${e.message}`);
    continue;
  }
  if (!Array.isArray(rows)) {
    errors.push(`  [bozuk json] ${p}: çıktı bir dizi değil`);
    continue;
  }

  const want = new Set(src.words.map((k) => k.id));
  const got = new Map(rows.map((r) => [r.id, String(r.beispielDe ?? "").trim()]));
  const missing = [...want].filter((id) => !got.has(id));
  const extra = [...got.keys()].filter((id) => !want.has(id));
  if (missing.length) errors.push(`  [eksik madde] ${p}: ${missing.join(", ")}`);
  if (extra.length) errors.push(`  [pakete ait olmayan] ${p}: ${extra.join(", ")}`);
  if (got.size !== rows.length) errors.push(`  [yinelenen id] ${p}`);

  for (const k of src.words) {
    const de = got.get(k.id);
    if (de === undefined) continue;
    items++;
    const H = (m) => errors.push(`  [${p}] ${k.id} «${k.en}» — ${m}`);
    const U = (m) => warnings.push(`  [${p}] ${k.id} «${k.en}» — ${m}`);

    if (!de) {
      H("boş");
      continue;
    }
    if (!/[.!?]$/.test(de)) H("noktalama ile bitmiyor");
    // Son işareti atıp kalanda cümle sınırı arıyoruz: "Dr." gibi kısaltmalar
    // büyük harf istemediği için sonrası boşluk+harf olarak aranıyor.
    if (/[.!?]\s+\S/.test(de.replace(/[.!?]$/, ""))) H("birden çok cümle");
    const n = words_(de);
    if (n < 3 || n > 16) H(`uzunluk ${n} (3–16 bekleniyor)`);
    if (numbers(de) !== numbers(k.beispiel))
      H(`sayı "${numbers(de)}" ≠ İngilizce "${numbers(k.beispiel)}"`);
    if (/\?$/.test(de) !== /\?$/.test(k.beispiel)) H("soru/düz cümle uyuşmuyor");
    if (!contains(de, k.deGloss)) H(`«${k.deGloss}» cümlede yok`);

    if (de === k.beispiel) U("İngilizce cümlenin aynısı — çevrilmemiş olabilir");
    const ratio = n / Math.max(1, words_(k.beispiel));
    if (ratio > 1.5 || ratio < 0.6) U(`uzunluk oranı ${ratio.toFixed(2)} (${n} ↔ ${words_(k.beispiel)})`);
  }
}

/*
  İKİZ KARŞILIK — SAYILIYOR, UYARILMIYOR.

  İki İngilizce başlık aynı Almanca karşılığı taşıyabiliyor. İlk bakışta bu
  bir kusur gibi görünüyor: de→en sorusunda o karşılık gösterildiğinde iki şık
  birden doğru olur. Madde madde uyarı da yazdım — ve 103 uyarı verdi. Sonra
  ne olduklarına baktım ve UYARI YANLIŞTI:

    Film      movie = film          İngilizce eşanlamlı
    Flugzeug  airplane = plane      İngilizce eşanlamlı
    krank     sick = ill            İngilizce eşanlamlı
    dick      fat = thick           Almanca tek kelime, İngilizce iki
    halten    stop = hold           Almanca tek kelime, İngilizce iki

  İki durumda da KARŞILIK DOĞRU. Birinde İngilizce gerçekten iki kelimeyle
  aynı şeyi söylüyor, ötekinde Almanca bir kelime iki İngilizce anlamı
  kapsıyor ve ayrım örnek cümlede duruyor. Düzeltilecek bir veri yok.

  Gerçek sorun soru üretiminde: çeldirici seçilirken doğru cevapla aynı
  karşılığa sahip satır elenmiyorsa soru iki doğru şıkla çıkıyor. Orası
  `src/lib/` işi, bu hattın değil.

  O yüzden burada yalnız SAYI duruyor — ölçü görünür kalsın, ama yanlış
  uyarı gerçek sinyali gömmesin.
*/
const byGloss = new Map();
for (const f of readdirSync(IN).filter((x) => x.endsWith(".json"))) {
  for (const k of JSON.parse(readFileSync(`${IN}/${f}`, "utf8")).words) {
    byGloss.set(k.deGloss, (byGloss.get(k.deGloss) ?? 0) + 1);
  }
}
const twinGroups = [...byGloss.values()].filter((n) => n > 1).length;

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
  if (warnings.length > 20) console.log(`  … ${warnings.length - 20} tane daha`);
}
console.log(
  `\nözet: ${packets.length - pending}/${packets.length} paket üretilmiş, ${items} madde · ` +
    `${errors.length} hata · ${warnings.length} uyarı · ${twinGroups} ikiz karşılık grubu`,
);
process.exit(errors.length ? 1 : 0);

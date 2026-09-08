/**
 * Premium kurallarının birim testi — `npm run test:premium`.
 *
 * Veritabanı ve ağ gerektirmez: sınanan şeyler saf. Üç sınıf var ve üçü de
 * ancak gerçek para akarken fark edilecek hatalara bakıyor:
 *
 *  1. PAKET İLERLEMESİ. Gevşek olursa premium'un anlamı kalmaz; sıkı olursa
 *     ödeme yapmış kullanıcı kilitli kalır. İkinci hata iadenin ve tek yıldızın
 *     en sık sebebi, ve yalnız "%60'ı tutturamayan kullanıcı" senaryosunda
 *     ortaya çıkıyor — yani elle denerken neredeyse hiç görülmez.
 *  2. YAPILANDIRMA DOĞRULAMASI. Panelden gelen sayı doğrudan faturayı ve ürünü
 *     etkiliyor; bozuk bir değerin varsayılana düşmesi ve aralık dışının
 *     kırpılması sözleşme gibi tutulmalı.
 *  3. METİN BÜTÜNLÜĞÜ. Paywall satırları yapılandırmadan ÜRETİLİYOR ve çeviri
 *     anahtarı döndürüyor; bir anahtar sözlükte yoksa kullanıcı ham anahtar
 *     görür ("plan.pro_mock") ve bunu ancak üç dilde tek tek bakan biri fark eder.
 */
import { computePacks, type PaperStat } from "../src/lib/premium/access";
import { parsePremiumConfig } from "../src/lib/premium/config";
import { DEFAULT_PREMIUM_CONFIG, describeLimits } from "../src/lib/premium/gates";
import { trBase } from "../src/i18n/base/tr";
import { enBase } from "../src/i18n/base/en";
import { deBase } from "../src/i18n/base/de";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

const RULE = { packSize: 3, unlockPct: 60, unlockOnComplete: true };
const P = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
const stat = (o: Record<string, [number, number]>): Map<string, PaperStat> =>
  new Map(Object.entries(o).map(([k, [c, t]]) => [k, { correct: c, total: t, done: true }]));

console.log("\nPaket ilerlemesi");

// Hiç çözülmemiş: yalnız ilk paket açık.
{
  const { unlocked, packs } = computePacks(P, new Map(), RULE);
  check("hiç çözülmemişken ilk paket açık", unlocked.join() === "p1,p2,p3");
  check("ikinci paket kapalı", packs[1]?.unlocked === false);
  check("paket sayısı doğru", packs.length === 3, `(${packs.length})`);
}

// Başarı hızlandırır: üçünü beklemeden, iki kâğıtta %80 ile sonraki paket açılır.
{
  const { unlocked } = computePacks(P, stat({ p1: [16, 20], p2: [16, 20] }), RULE);
  check("iki kâğıtta %80 → sonraki paket açıldı (başarı hızlandırır)", unlocked.includes("p4"));
}

// Eşiğin ALTINDA ve paket bitmemiş: kapalı kalmalı.
{
  const { unlocked } = computePacks(P, stat({ p1: [8, 20], p2: [8, 20] }), RULE);
  check("%40 ve paket bitmemiş → kapalı", !unlocked.includes("p4"));
}

// EMNİYET SUPABI: eşiği tutturamayan ama üçünü de bitiren kullanıcı ilerliyor.
{
  const { unlocked } = computePacks(P, stat({ p1: [8, 20], p2: [8, 20], p3: [8, 20] }), RULE);
  check("%40 ama üçü de bitti → sonraki paket açıldı (çaba da açar)", unlocked.includes("p4"));
}

// Supap kapalıyken aynı kullanıcı kilitli kalıyor — kapatmanın bedeli bu.
{
  const { unlocked } = computePacks(P, stat({ p1: [8, 20], p2: [8, 20], p3: [8, 20] }), { ...RULE, unlockOnComplete: false });
  check("supap kapalıyken %40 → kilitli kalır", !unlocked.includes("p4"));
}

// Zincir: ikinci paket açılmadan üçüncü açılamaz (boş paket "tamamlandı" sayılmamalı).
{
  const { unlocked } = computePacks(P, stat({ p1: [20, 20], p2: [20, 20], p3: [20, 20] }), RULE);
  check("ikinci paket açıldı", unlocked.includes("p4"));
  check("üçüncü paket, ikincisi çözülmeden AÇILMADI", !unlocked.includes("p7"));
}

// Ağırlık madde başına: uzun kâğıttaki kötü sonuç kısa kâğıttaki iyi sonucu yutmamalı.
{
  const { packs } = computePacks(P, stat({ p1: [40, 40], p2: [0, 60] }), RULE);
  check("yüzde madde başına ağırlıklı (40/100 = %40)", packs[0]?.pct === 40, `(${packs[0]?.pct})`);
}

// Son paket eksik kalabilir (7 kâğıt, 3'lü paket → son pakette 1 kâğıt).
{
  const { packs } = computePacks(P, new Map(), RULE);
  check("son paket eksik boyutta olabiliyor", packs[2]?.ids.length === 1, `(${packs[2]?.ids.length})`);
}

console.log("\nYapılandırma doğrulaması");
{
  const d = DEFAULT_PREMIUM_CONFIG;
  check("boş girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig({})) === JSON.stringify(d));
  check("null girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig(null)) === JSON.stringify(d));
  check("çöp girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig("abc")) === JSON.stringify(d));

  const clamped = parsePremiumConfig({ free: { weeklyAiPractice: 999999 }, fairUse: { aiPracticePerDay: 0 } });
  check("üst sınır kırpılıyor", clamped.free.weeklyAiPractice === 100, `(${clamped.free.weeklyAiPractice})`);
  // Tavanın alt sınırı 1: 0 yazılsaydı ödeme yapmış kullanıcı hiçbir şey yapamazdı.
  check("adil kullanım tavanı 0 olamıyor", clamped.fairUse.aiPracticePerDay === 1, `(${clamped.fairUse.aiPracticePerDay})`);

  // 0 GEÇERLİ bir ücretsiz kota: "bu özellik ücretsizde hiç yok" demek.
  const zero = parsePremiumConfig({ free: { pocketWalksPerDay: 0 } });
  check("ücretsiz kota 0 olabiliyor (premium-only)", zero.free.pocketWalksPerDay === 0);

  const bad = parsePremiumConfig({ mock: { packSize: "üç", unlockPct: 250, unlockOnComplete: "evet" } });
  check("sayı olmayan değer varsayılana düşüyor", bad.mock.packSize === d.mock.packSize);
  check("yüzde 100'e kırpılıyor", bad.mock.unlockPct === 100);
  check("boolean olmayan değer varsayılana düşüyor", bad.mock.unlockOnComplete === d.mock.unlockOnComplete);

  const prices = parsePremiumConfig({ plans: { prices: [{ region: "X", monthly: "", yearly: "1" }] } });
  check("eksik fiyat satırı varsayılana düşüyor", prices.plans.prices.length === d.plans.prices.length);
  check("global (USD) fiyat satırı var", d.plans.prices.some((p) => p.region === "GLOBAL" && p.currency === "USD"));
}

console.log("\nPaywall metinleri üç sözlükte de var");
{
  const copy = describeLimits(DEFAULT_PREMIUM_CONFIG);
  const keys = [...copy.free, ...copy.premium].map((l) => l.key);
  check("kapsam satırı üretiliyor", keys.length >= 10, `(${keys.length})`);
  for (const [lang, dict] of [["tr", trBase], ["en", enBase], ["de", deBase]] as const) {
    const missing = keys.filter((k) => !dict[k]);
    check(`${lang}: her anahtarın karşılığı var`, missing.length === 0, missing.join(", "));
  }
  // Parametreli satırlar gerçekten parametre taşımalı; taşımazsa metinde
  // "{n}" görünür ve bunu yalnız o dili konuşan biri fark eder.
  const withParams = [...copy.free, ...copy.premium].filter((l) => l.params);
  for (const [lang, dict] of [["tr", trBase], ["en", enBase], ["de", deBase]] as const) {
    const bad = withParams.filter((l) => {
      const text = dict[l.key] ?? "";
      return Object.keys(l.params ?? {}).some((k) => !text.includes(`{${k}}`));
    });
    check(`${lang}: parametreler metinde yerinde`, bad.length === 0, bad.map((b) => b.key).join(", "));
  }
}

console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
process.exit(failures === 0 ? 0 : 1);

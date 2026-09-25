/**
 * Premium kurallarının birim testi — `npm run test:premium`.
 *
 * Veritabanı ve ağ gerektirmez: sınanan şeyler saf. Üç sınıf var ve üçü de
 * ancak gerçek para akarken fark edilecek hatalara bakıyor:
 *
 *  1. PAKET İLERLEMESİ. Gevşek olursa premium'un anlamı kalmaz; sıkı olursa
 *     ödeme yapmış kullanıcı kilitli kalır. Kural 2026-09-25'ten beri tek:
 *     paketteki kâğıtların hepsi bitirilince sonraki paket açılır.
 *  2. YAPILANDIRMA DOĞRULAMASI. Panelden gelen sayı doğrudan faturayı ve ürünü
 *     etkiliyor; bozuk bir değerin varsayılana düşmesi ve aralık dışının
 *     kırpılması sözleşme gibi tutulmalı.
 *  3. METİN BÜTÜNLÜĞÜ. Paywall satırları yapılandırmadan ÜRETİLİYOR ve çeviri
 *     anahtarı döndürüyor; bir anahtar sözlükte yoksa kullanıcı ham anahtar
 *     görür ("plan.pro_mock") ve bunu ancak üç dilde tek tek bakan biri fark eder.
 */
import { computePacks, type PaperStat } from "../src/lib/premium/access";
import { packCopy, tieredCopy, walkCopy } from "../src/lib/premium/unlock-copy";
import { allowedCount, completedSlices, freeUnlock, liveStreak, premiumMockUnlock, streakTier, unlockedTier } from "../src/lib/premium/unlock";
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

const RULE = { packSize: 3 };
const P = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
const stat = (o: Record<string, [number, number]>): Map<string, PaperStat> =>
  new Map(Object.entries(o).map(([k, [c, t]]) => [k, { correct: c, total: t, done: true }]));

console.log("\nPaket ilerlemesi (premium)");

// Hiç çözülmemiş: yalnız ilk paket açık.
{
  const { unlocked, packs } = computePacks(P, new Map(), RULE);
  check("hiç çözülmemişken ilk paket açık", unlocked.join() === "p1,p2,p3");
  check("ikinci paket kapalı", packs[1]?.unlocked === false);
  check("paket sayısı doğru", packs.length === 3, `(${packs.length})`);
}

/* %60 KOŞULU KALKTI (2026-09-25): yüksek puan tek başına paketi açmıyor. */
{
  const { unlocked } = computePacks(P, stat({ p1: [20, 20], p2: [20, 20] }), RULE);
  check("iki kâğıtta %100 ama paket bitmedi → kapalı (başarı yüzdesi açmıyor)", !unlocked.includes("p4"));
}

// Paketin hepsi bitti: puan düşük olsa da sonraki paket açık.
{
  const { unlocked } = computePacks(P, stat({ p1: [2, 20], p2: [2, 20], p3: [2, 20] }), RULE);
  check("%10 ama üçü de bitti → sonraki paket açıldı", unlocked.includes("p4"));
}

// Zincir: ikinci paket bitmeden üçüncü açılamaz (boş paket "tamamlandı" sayılmamalı).
{
  const { unlocked } = computePacks(P, stat({ p1: [20, 20], p2: [20, 20], p3: [20, 20] }), RULE);
  check("ikinci paket açıldı", unlocked.includes("p4"));
  check("üçüncü paket, ikincisi bitmeden AÇILMADI", !unlocked.includes("p7"));
}

// Yüzde yalnız gösterim: madde başına ağırlıklı.
{
  const { packs } = computePacks(P, stat({ p1: [40, 40], p2: [0, 60] }), RULE);
  check("yüzde madde başına ağırlıklı (40/100 = %40)", packs[0]?.pct === 40, `(${packs[0]?.pct})`);
}

// Son paket eksik kalabilir (7 kâğıt, 3'lü paket → son pakette 1 kâğıt).
{
  const { packs } = computePacks(P, new Map(), RULE);
  check("son paket eksik boyutta olabiliyor", packs[2]?.ids.length === 1, `(${packs[2]?.ids.length})`);
}

// Kilit açma görünümü paket kuralıyla aynı sonucu veriyor.
{
  const u = premiumMockUnlock([true, true, false, false, false, false, false], 3);
  check("premium görünüm: ilk paket açık, 2/3 bitti", u.open === 3 && u.next?.complete.done === 2 && u.next?.complete.needed === 3);
  const all = premiumMockUnlock([true, true, true, true, true, true, false], 3);
  check("premium görünüm: son paket açık, sonrası yok", all.open === 7 && all.next === null, `(${all.open})`);
}

console.log("\nYapılandırma doğrulaması");
{
  const d = DEFAULT_PREMIUM_CONFIG;
  check("boş girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig({})) === JSON.stringify(d));
  check("null girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig(null)) === JSON.stringify(d));
  check("çöp girdi varsayılana düşüyor", JSON.stringify(parsePremiumConfig("abc")) === JSON.stringify(d));

  const clamped = parsePremiumConfig({ free: { conversationsPerLevel: 999999 }, fairUse: { aiPracticePerDay: 0, walkRoundsPerDay: 0 } });
  check("üst sınır kırpılıyor", clamped.free.conversationsPerLevel === 100, `(${clamped.free.conversationsPerLevel})`);
  // Tavanın alt sınırı 1: 0 yazılsaydı ödeme yapmış kullanıcı hiçbir şey yapamazdı.
  check("adil kullanım tavanı 0 olamıyor", clamped.fairUse.aiPracticePerDay === 1, `(${clamped.fairUse.aiPracticePerDay})`);
  check("premium yürüyüş tavanı 0 olamıyor", clamped.fairUse.walkRoundsPerDay === 1, `(${clamped.fairUse.walkRoundsPerDay})`);

  // 0 GEÇERLİ bir ücretsiz kota: "bu özellik ücretsizde hiç yok" demek.
  const zero = parsePremiumConfig({ free: { walkRoundsPerDay: 0 } });
  check("ücretsiz kota 0 olabiliyor (premium-only)", zero.free.walkRoundsPerDay === 0);
  /* İlk adı `walkSessionsPerDay`di (birim "oturum", 2026-09-25 düzeltildi): o
     adla yazılmış kayıt da okunuyor. */
  const eskiAd = parsePremiumConfig({ free: { walkSessionsPerDay: 5 }, fairUse: { walkSessionsPerDay: 40 } });
  check("eski walkSessionsPerDay adı okunuyor", eskiAd.free.walkRoundsPerDay === 5 && eskiAd.fairUse.walkRoundsPerDay === 40);
  check("yeni ad eskisinden önce", parsePremiumConfig({ free: { walkRoundsPerDay: 4, walkSessionsPerDay: 9 } }).free.walkRoundsPerDay === 4);
  /* `mockPapersPerLevel` 2026-09-25'te `mockExamsPerLevel` oldu: eski adla yazılmış kayıt da okunuyor. */
  check("eski mockPapersPerLevel adı okunuyor", parsePremiumConfig({ free: { mockPapersPerLevel: 3 } }).free.mockExamsPerLevel === 3);
  check("yeni mock adı eskisinden önce", parsePremiumConfig({ free: { mockExamsPerLevel: 2, mockPapersPerLevel: 7 } }).free.mockExamsPerLevel === 2);

  /* Kademe panelden kapatılabilmeli: 0 bonus = yalnız taban. */
  const kapali = parsePremiumConfig({ free: { streakBonus: 0 } });
  check("kademe kapatılabiliyor", kapali.free.streakBonus === 0);
  const adim = parsePremiumConfig({ free: { streakStep: 0 } });
  check("seri adımı 1'in altına inemiyor", adim.free.streakStep === 1, `(${adim.free.streakStep})`);
  check("kademe tavanı varsayılanı 0 (sınırsız)", d.free.maxTiers === 0);

  /* ESKİ KAYIT: 2026-09-25 öncesi alanlar yok sayılıyor, yeniler varsayılana düşüyor. */
  const eski = parsePremiumConfig({ free: { weeklyAiPractice: 2, streakMaxTiers: 5, pocketWalksPerDay: 0 }, mock: { unlockPct: 60, unlockOnComplete: true } });
  check("eski kayıt geriye uyumlu okunuyor", JSON.stringify(eski) === JSON.stringify(d));
  check("eski streakMaxTiers yeni tavana taşınmıyor", eski.free.maxTiers === 0);

  const bad = parsePremiumConfig({ mock: { packSize: "üç" } });
  check("sayı olmayan değer varsayılana düşüyor", bad.mock.packSize === d.mock.packSize);

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

console.log("\nKademe formülü: taban + bonus × min(seri kademesi, bitirilmiş dilim)");
{
  /*
    KURAL (2026-09-25, docs/premium/README.md §2): bir sonraki dilim ancak açık
    hakların hepsi BİTİRİLİNCE ve seri eşiğe VARINCA açılıyor. Seri tek başına
    hak açmıyor, bitirmek tek başına açmıyor.
  */
  const r = { base: 2, bonus: 2, step: 7, maxTiers: 0 };
  check("seri kademesi floor(en uzun / 7)", streakTier(13, 7) === 1 && streakTier(14, 7) === 2 && streakTier(6, 7) === 0);
  check("dilim: taban bitmeden 0", completedSlices(1, 2, 2) === 0);
  check("dilim: taban bitti → 1", completedSlices(2, 2, 2) === 1);
  check("dilim: taban + bir bonus bitti → 2", completedSlices(4, 2, 2) === 2);
  check("dilim: taban 0 ise baştan 1", completedSlices(0, 0, 2) === 1);

  check("seri yok, hiç bitirmedi → taban", allowedCount(r, 0, 0) === 2);
  check("seri 30 gün ama bitirmedi → taban (seri tek başına açmaz)", allowedCount(r, 1, 30) === 2);
  check("ikisini bitirdi ama seri 6 → taban (bitirmek tek başına açmaz)", allowedCount(r, 2, 6) === 2);
  check("ikisini bitirdi + 7 gün seri → +2", allowedCount(r, 2, 7) === 4);
  check("dördünü bitirdi ama seri 13 → hâlâ 4", allowedCount(r, 4, 13) === 4);
  check("dördünü bitirdi + 14 gün → 6", allowedCount(r, 4, 14) === 6);
  check("seri 50 ama 3 bitti → 4 (ikinci dilim bitmedi)", allowedCount(r, 3, 50) === 4);
  check("tavan 1 → en çok bir dilim", allowedCount({ ...r, maxTiers: 1 }, 10, 100) === 4);
  check("bonus 0 → yalnız taban", allowedCount({ ...r, bonus: 0 }, 10, 100) === 2);
  check("negatif seri tabana düşüyor", unlockedTier(r, 2, -5) === 0);

  // Deneme sınavı: taban 1, bonus 1.
  const m = { base: 1, bonus: 1, step: 7, maxTiers: 0 };
  check("deneme: hiç bitirmedi → 1", allowedCount(m, 0, 30) === 1);
  check("deneme: bitirdi + 7 gün → 2", allowedCount(m, 1, 7) === 2);
  check("deneme: ikisini bitirdi + 14 gün → 3", allowedCount(m, 2, 14) === 3);
  check("deneme: ikisini bitirdi ama seri 13 → 2", allowedCount(m, 2, 13) === 2);
}

console.log("\nKilit açma durumu (arayüzün gösterdiği)");
{
  const r = { base: 1, bonus: 1, step: 7, maxTiers: 0 };
  // Örnek (Samet): deneme sınavını bitirdi, seri 3/7 → 4 gün sonra ikinci kâğıt.
  const u = freeUnlock(r, { used: 1, done: 1, longestStreak: 3, currentStreak: 3 });
  check("açık 1, kalan 0", u.open === 1 && u.remaining === 0, JSON.stringify(u));
  check("bitirme koşulu tamam (1/1)", u.next?.complete.done === 1 && u.next?.complete.needed === 1);
  check("seri 3/7", u.next?.streak.current === 3 && u.next?.streak.needed === 7 && u.next?.streak.met === false);
  check("4 gün kaldı", u.next?.days === 4, `(${u.next?.days})`);
  check("kazanç 1", u.next?.gain === 1);

  // En uzun seri eşiği geçmiş ama güncel seri kopmuş: seri koşulu TAMAM (kazanılan geri alınmıyor).
  const v = freeUnlock({ base: 2, bonus: 2, step: 7, maxTiers: 0 }, { used: 2, done: 1, longestStreak: 9, currentStreak: 0 });
  check("en uzun seri yetiyor → seri koşulu tamam, gün 0", v.next?.streak.met === true && v.next?.days === 0);
  check("bitirme 1/2", v.next?.complete.done === 1 && v.next?.complete.needed === 2);

  const tavan = freeUnlock({ base: 2, bonus: 2, step: 7, maxTiers: 1 }, { used: 4, done: 4, longestStreak: 30, currentStreak: 30 });
  check("tavana varılınca sonraki yok", tavan.next === null && tavan.open === 4);

  check("seri: dün çalıştıysa yaşıyor", liveStreak(5, "2026-09-24", "2026-09-25") === 5);
  check("seri: bugün çalıştıysa yaşıyor", liveStreak(5, "2026-09-25", "2026-09-25") === 5);
  check("seri: iki gün önce ise kopmuş", liveStreak(5, "2026-09-23", "2026-09-25") === 0);
}

console.log("\nKilit açma cümleleri (web ve mobil aynı kural)");
{
  /* Örnek (Samet): deneme sınavını bitirdin ✓ · seri 3/7 · 4 gün sonra +1. */
  const r = { base: 1, bonus: 1, step: 7, maxTiers: 0 };
  const c = tieredCopy(freeUnlock(r, { used: 1, done: 1, longestStreak: 3, currentStreak: 3 }), "mock");
  check("hak bitti → spent başlığı", c?.headline?.key === "unlock.spent_mock" && c.spent === true);
  check("bitirme ✓", c?.conditions[0]?.ok === true && c.conditions[0].line.key === "unlock.cond_complete_ok");
  check("seri 3/7 çubuklu", c?.conditions[1]?.ok === false && c.conditions[1].bar?.cur === 3 && c.conditions[1].bar?.need === 7);
  check("4 gün sonra +1", c?.when?.key === "unlock.when_days" && c.when.params.n === 4 && c.when.gain.key === "unlock.gain_mock" && c.when.gain.params?.n === 1);

  const conv = { base: 2, bonus: 2, step: 7, maxTiers: 0 };
  const left = tieredCopy(freeUnlock(conv, { used: 1, done: 0, longestStreak: 0, currentStreak: 0 }), "conv");
  check("kalan hak başlığı", left?.headline?.key === "unlock.left_conv" && left.headline.params?.n === 1 && !left.spent);
  check("ikisi eksik → when_both", left?.when?.key === "unlock.when_both" && left.when.params.n === 7);
  const onlyDone = tieredCopy(freeUnlock(conv, { used: 2, done: 1, longestStreak: 9, currentStreak: 0 }), "write");
  check("seri tamam, bitirme eksik → when_complete", onlyDone?.when?.key === "unlock.when_complete" && onlyDone.conditions[1]?.line.key === "unlock.cond_streak_ok");
  const capped = tieredCopy(freeUnlock({ ...conv, maxTiers: 1 }, { used: 4, done: 4, longestStreak: 30, currentStreak: 30 }), "skill_write");
  check("tavan → max, koşul yok", capped?.max === true && capped.conditions.length === 0 && capped.when === null);
  check("premium → cümle yok", tieredCopy({ premium: true }, "conv") === null);

  check("premium paket: sıradaki", packCopy(premiumMockUnlock([true, false, false, false], 3))?.key === "unlock.pack_next");
  check("premium paket: hepsi açık", packCopy(premiumMockUnlock([true, true, true], 3))?.key === "unlock.pack_all");

  const w = { premium: false, perDay: 3, used: 1, remaining: 2, pocket: false };
  check("yürüyüş: kalan", walkCopy(w)?.key === "unlock.walk_left" && walkCopy(w)?.params?.n === 2);
  check("yürüyüş: bitti", walkCopy({ ...w, used: 3, remaining: 0 })?.key === "unlock.walk_spent");

  // Seçilen her anahtar üç sözlükte var.
  const all = [c, left, onlyDone, capped].flatMap((x) => [
    x?.headline?.key,
    ...(x?.conditions.map((k) => k.line.key) ?? []),
    x?.when?.key,
    x?.when?.gain.key,
  ]).filter((k): k is string => Boolean(k));
  for (const s of ["conv", "write", "skill_speak", "skill_write", "mock"]) all.push(`unlock.left_${s}`, `unlock.spent_${s}`, `unlock.gain_${s}`);
  all.push("unlock.walk_left", "unlock.walk_spent", "unlock.pack_next", "unlock.pack_all", "unlock.max", "unlock.premium_now", "unlock.celebrate", "unlock.title", "unlock.locked_conv");
  for (const [lang, dict] of [["tr", trBase], ["en", enBase], ["de", deBase]] as const) {
    const missing = [...new Set(all)].filter((k) => !dict[k]);
    check(`${lang}: kilit açma anahtarlarının karşılığı var`, missing.length === 0, missing.join(", "));
  }
}

console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
process.exit(failures === 0 ? 0 : 1);

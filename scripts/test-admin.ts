/**
 * Yönetim ve işletim katmanının saf kuralları — `npm run test:admin`.
 *
 * Veritabanı istemez. Sınanan şeylerin ortak özelliği: yanlışları DERLEMEYİ
 * KIRMIYOR ve canlıda sessiz kalıyor.
 *   - uygulama denetimi ayrıştırıcısı: panelden yazılan bozuk bir değer herkesi
 *     güncelleme ekranına kilitleyebilir ya da mağaza bağlantısını dışarıya
 *     yönlendirebilir;
 *   - istemci sürüm başlığı: tanınmazsa zorunlu güncelleme kimseye uygulanmaz;
 *   - hata gruplama ve temizleme: kişisel veri sızarsa ya da her hata ayrı grup
 *     olursa panel ve Telegram gürültüye boğulur;
 *   - nginx zaman/rota ayrıştırıcıları: bozulursa 5xx uyarısı hiç tetiklenmez;
 *   - toplu bildirim hedefi ve yolu: dışarıya yönlendiren bildirim yazılamamalı;
 *   - mağaza defteri eşlemesi: yanlış tür/tutar gelir kartını yanıltır.
 */
import { DEFAULT_APP_CONTROL, parseAppControl, parseClientHeader, updateVerdict } from "../src/lib/app-control-shared";
import { errorFingerprint, scrub } from "../src/lib/client-errors";
import { nginxTime } from "../src/lib/alerts";
import { routeOf } from "../src/lib/server-metrics";
import { cleanUrl, parseAudience } from "../src/lib/push-broadcast";
import { cleanSource, platformOf } from "../src/lib/store-link";
import { adminErrorText } from "../src/lib/admin-errors";
import { revenuecat } from "../src/lib/premium/providers/revenuecat";
import { AUTH_SECRET_TABLES, USER_COLUMNS } from "../src/lib/account/export";
import { summarizeReviews, type StoreReview } from "../src/lib/store-reviews";
import { parseVitalsRows } from "../src/lib/android-vitals";
import { trendDelta } from "../src/lib/admin-trends-shared";
import { aggregateMockItems, MIN_ANSWERS } from "../src/lib/admin-content";
import { alertHref } from "../src/app/admin/alert-href";
import { parseRange } from "../src/app/admin/_data-shared";
import * as authSchema from "../src/lib/db/auth-schema";
import { getTableName, is } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

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

async function main() {
  console.log("\nUygulama denetimi");
  const bad = parseAppControl({
    minBuild: { ios: -5, android: "12" },
    latestBuild: { ios: 3, android: 4 },
    store: { ios: { live: "evet", url: "https://evil.example/app" }, android: { live: true, url: "https://play.google.com/store/apps/details?id=x" } },
    maintenance: { enabled: "true", message: { tr: "  bakım  ", en: 42 } },
  });
  check("negatif build 0'a kırpılıyor", bad.minBuild.ios === 0);
  check("metin sayı build sayıya çevriliyor", bad.minBuild.android === 12);
  check("en son build en düşüğün altına inemiyor", bad.latestBuild.android === 12, JSON.stringify(bad.latestBuild));
  check("yabancı mağaza adresi reddediliyor (varsayılana dönüyor)", bad.store.ios.url === DEFAULT_APP_CONTROL.store.ios.url);
  check("\"evet\" canlı bayrağı sayılmıyor", bad.store.ios.live === false);
  check("Play adresi kabul ediliyor", bad.store.android.url.startsWith("https://play.google.com/"));
  check("bakım yalnız gerçek true ile açılıyor", bad.maintenance.enabled === false);
  check("mesaj kırpılıyor, sayı mesaj boş", bad.maintenance.message.tr === "bakım" && bad.maintenance.message.en === "");
  check("boş girdi = varsayılan", JSON.stringify(parseAppControl(null)) === JSON.stringify(DEFAULT_APP_CONTROL));

  const c = parseAppControl({ minBuild: { android: 10 }, latestBuild: { android: 14 } });
  check("build bilinmiyorsa karar yok", updateVerdict(c, "android", 0) === "none");
  check("en düşüğün altı zorunlu", updateVerdict(c, "android", 9) === "required");
  check("aradaki önerilen", updateVerdict(c, "android", 12) === "suggested");
  // Sınır: en düşük build'in KENDİSİ desteklenir (panel "en düşük" diyor, "bundan büyük" değil).
  check("tam en düşük build zorunlu değil", updateVerdict(c, "android", 10) === "suggested");
  check("en son ve üstü yok", updateVerdict(c, "android", 14) === "none");
  check("iOS ayarı yoksa iOS etkilenmiyor", updateVerdict(c, "ios", 1) === "none");

  console.log("\nİstemci sürüm başlığı");
  check("geçerli başlık", JSON.stringify(parseClientHeader("android/1.0.3/14")) === JSON.stringify({ platform: "android", version: "1.0.3", build: 14 }));
  check("iOS", parseClientHeader(" ios/2.10.0/305 ")?.platform === "ios");
  check("bilinmeyen platform reddediliyor", parseClientHeader("web/1.0.0/1") === null);
  check("eksik parça reddediliyor", parseClientHeader("android/1.0/14") === null);
  check("boş", parseClientHeader(null) === null && parseClientHeader("") === null);

  console.log("\nHata gruplama ve temizleme");
  const s = scrub("mail ali.veli@example.com ?token=abcDEF123&x=1 id 12345678 key " + "a".repeat(40));
  check("e-posta temizleniyor", !s.includes("ali.veli") && s.includes("[email]"), s);
  check("jeton temizleniyor", s.includes("?token=[x]"), s);
  check("uzun sayı temizleniyor", !s.includes("12345678"), s);
  check("uzun anahtar temizleniyor", !s.includes("a".repeat(40)), s);
  const stackA = "TypeError: x\n    at render (webpack-internal:///node_modules/react-dom/x.js:1:2)\n    at Player (https://www.lernomi.app/_next/static/chunks/app.js:10:20)";
  const stackB = "TypeError: x\n    at render (webpack-internal:///node_modules/react-dom/x.js:9:9)\n    at Player (https://www.lernomi.app/_next/static/chunks/app.js:99:1)";
  const f1 = errorFingerprint({ platform: "web", name: "TypeError", message: "Cannot read 'a' of undefined (id 123)", stack: stackA });
  const f2 = errorFingerprint({ platform: "web", name: "TypeError", message: "Cannot read 'b' of undefined (id 456)", stack: stackB });
  check("sayı ve tırnak içi farkı aynı grup", f1 === f2);
  check("platform farkı ayrı grup", f1 !== errorFingerprint({ platform: "android", name: "TypeError", message: "Cannot read 'a' of undefined (id 123)", stack: stackA }));
  check("farklı kendi karesi ayrı grup", f1 !== errorFingerprint({ platform: "web", name: "TypeError", message: "Cannot read 'a' of undefined (id 123)", stack: "TypeError: x\n    at Other (https://www.lernomi.app/_next/static/chunks/b.js:1:1)" }));

  console.log("\nnginx ayrıştırıcıları");
  check("saat dilimli zaman", nginxTime("17/Sep/2026:10:49:26 +0200") === Date.UTC(2026, 8, 17, 8, 49, 26));
  check("negatif dilim", nginxTime("01/Jan/2026:00:00:00 -0500") === Date.UTC(2026, 0, 1, 5, 0, 0));
  check("bozuk zaman 0", nginxTime("dün") === 0);
  check("kimlik parçası :id", routeOf("/api/social/users/0f3a9c1e-1111-2222-3333-444455556666/profile?x=1") === "/api/social/users/:id");
  check("sayısal parça :id", routeOf("/api/certificate/123") === "/api/certificate/:id");
  check("sorgu atılıyor", routeOf("/api/tts?v=a&t=hallo") === "/api/tts");

  console.log("\nToplu bildirim");
  check("yalnız uygulama içi yol", cleanUrl("/learn/weekly") === "/learn/weekly");
  check("dış adres reddediliyor", cleanUrl("https://evil.example") === "/learn" && cleanUrl("//evil.example") === "/learn");
  check("javascript: reddediliyor", cleanUrl("javascript:alert(1)") === "/learn");
  const a = parseAudience({ native: "fr", course: "de", platform: "sms", test: "true" });
  check("bilinmeyen dil/platform varsayılana", a.native === "" && a.platform === "all" && a.course === "de");
  check("test yalnız gerçek true", a.test === false && parseAudience({ test: true }).test === true);
  check("hizmet duyurusu onayı yalnız gerçek true", parseAudience({ service: "true" }).service === false && parseAudience({ service: true }).service === true);

  const { startBroadcast } = await import("../src/lib/push-broadcast");
  const refused = await startBroadcast({ text: { tr: { title: "t", body: "b" }, en: { title: "", body: "" }, de: { title: "", body: "" } }, url: "/learn", audience: parseAudience({ service: false }), adminEmail: null, adminUserId: null });
  check("hizmet onayı olmadan gönderim reddediliyor (veritabanına gitmeden)", "error" in refused && refused.error === "not_service");

  console.log("\nMağaza yönlendirmesi");
  check("iPhone", platformOf("Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X)") === "ios");
  check("Android", platformOf("Mozilla/5.0 (Linux; Android 15; Pixel 9)") === "android");
  check("masaüstü", platformOf("Mozilla/5.0 (X11; Linux x86_64)") === "desktop" && platformOf(null) === "desktop");
  check("kaynak etiketi temizleniyor", cleanSource("qr") === "qr" && cleanSource("<script>") === "paywall" && cleanSource(null) === "paywall");

  console.log("\nAdmin hata metinleri");
  check("2FA kodu anlaşılır", adminErrorText("admin_2fa_required").includes("iki adımlı"));
  check("bilinmeyen kod görünür kalıyor", adminErrorText("xyz").includes("xyz"));

  console.log("\nMağaza defteri eşlemesi (RevenueCat)");
  process.env.REVENUECAT_WEBHOOK_AUTH = "test-sir";
  const parse = async (event: Record<string, unknown>) =>
    revenuecat.parse(new Request("https://x/webhook", { method: "POST", headers: { authorization: "test-sir" } }), JSON.stringify({ event }));
  const base = { id: "e1", app_user_id: "u1", product_id: "lernomi_premium_yearly", store: "PLAY_STORE", environment: "PRODUCTION", expiration_at_ms: Date.now() + 86_400_000, event_timestamp_ms: 1_789_000_000_000 };
  const trial = await parse({ ...base, type: "INITIAL_PURCHASE", period_type: "TRIAL", price: 0, currency: "TRY" });
  check("deneme başlangıcı: purchase + trial + ödeme değil", trial.ok && "event" in trial && trial.event.ledger?.type === "purchase" && trial.event.ledger.period === "trial" && trial.event.paid === false);
  const conv = await parse({ ...base, id: "e2", type: "RENEWAL", period_type: "NORMAL", is_trial_conversion: true, price: 29.99, currency: "TRY", price_in_purchased_currency: 999 });
  check("deneme dönüşümü işaretleniyor, tutar taşınıyor", conv.ok && "event" in conv && conv.event.ledger?.trialConversion === true && conv.event.ledger.priceUsd === 29.99 && conv.event.ledger.priceLocal === 999);
  const refund = await parse({ ...base, id: "e3", type: "REFUND", period_type: "NORMAL", price: -29.99 });
  check("iade: tür refund, tutar pozitif", refund.ok && "event" in refund && refund.event.ledger?.type === "refund" && refund.event.ledger.priceUsd === 29.99);
  const sandbox = await parse({ ...base, id: "e4", type: "INITIAL_PURCHASE", environment: "SANDBOX" });
  check("sandbox deftere de yetkiye de girmiyor", !sandbox.ok);
  const wrongSecret = await revenuecat.parse(new Request("https://x", { method: "POST", headers: { authorization: "yanlis" } }), JSON.stringify({ event: base }));
  check("yanlış sır 401", !wrongSecret.ok && wrongSecret.status === 401);

  console.log("\nMağaza yorumları özeti");
  const now = Date.parse("2026-09-17T12:00:00Z");
  const rv = (rating: number, daysAgo: number, answered = false): StoreReview => ({ store: "android", id: `${rating}-${daysAgo}`, rating, title: "", body: "", author: "", at: new Date(now - daysAgo * 86_400_000).toISOString(), version: "", territory: "", answered });
  const sum = summarizeReviews([rv(5, 1), rv(1, 2), rv(2, 40, true), rv(4, 3)], 30, now);
  check("ortalama tek ondalık", sum.avg === 3);
  check("yıldız dağılımı", JSON.stringify(sum.stars) === JSON.stringify([1, 1, 0, 1, 1]));
  check("son 30 gün penceresi", sum.recent === 3);
  check("cevapsız 1-2 yıldız (cevaplanan sayılmaz)", sum.lowUnanswered === 1);
  check("boş liste ortalama null", summarizeReviews([], 30, now).avg === null);

  console.log("\nAndroid vitals ayrıştırması");
  const row = (day: number, rate: string | null, w: string | null, users = "150") => ({
    startTime: { year: 2026, month: 9, day },
    metrics: [
      ...(rate == null ? [] : [{ metric: "userPerceivedCrashRate", decimalValue: { value: rate } }]),
      ...(w == null ? [] : [{ metric: "userPerceivedCrashRate28dUserWeighted", decimalValue: { value: w } }]),
      { metric: "distinctUsers", decimalValue: { value: users } },
    ],
  });
  const vs = parseVitalsRows([row(12, "0.004", "0.006"), row(10, "0.002", "0.005"), row(13, "0.010", null)], "userPerceivedCrashRate", "userPerceivedCrashRate28dUserWeighted");
  check("günler sıralanıyor", vs.points.map((p) => p.day).join(",") === "2026-09-10,2026-09-12,2026-09-13");
  check("son 28g değeri: ağırlıklı değeri olan en son gün", vs.latest28d === 0.006 && vs.latestDay === "2026-09-12", JSON.stringify(vs));
  check("eksik metrik null (0 değil)", vs.points[2].rate28d === null && vs.points[2].rate === 0.01);
  check("boş satırlar = veri yok", parseVitalsRows([], "a", "b").latest28d === null);

  console.log("\nHaftalık karşılaştırma");
  check("artış iyi (kullanıcı)", JSON.stringify(trendDelta({ current: 120, previous: 100, good: "up" })) === JSON.stringify({ text: "+%20", tone: "good" }));
  check("artış kötü (hata)", trendDelta({ current: 30, previous: 20, good: "down" }).tone === "bad");
  check("küçük tabanda yüzde değil fark", trendDelta({ current: 3, previous: 1, good: "up" }).text === "+2");
  check("oranda puan farkı", trendDelta({ current: 55, previous: 60, good: "up", unit: "pct" }).text === "−5 puan");
  check("değişim yoksa =", trendDelta({ current: 7, previous: 7, good: "up" }).tone === "flat");

  console.log("\nMadde analizi (deneme sınavı)");
  {
    // Her deneme iki madde: m1'i herkes bilir, m2'yi kimse. m3 yalnız 2 kez sorulmuş.
    const attempts = Array.from({ length: 4 }, (_, i) => ({ paperId: "de-b1-01", skill: "reading", answers: { n: String(i) } }));
    const rows = aggregateMockItems(
      attempts,
      (_p, _s, a) => [{ id: "m1", correct: true }, { id: "m2", correct: false }, ...(Number(a.n) < 2 ? [{ id: "m3", correct: false }] : [])],
      (_p, id) => `soru ${id}`,
    );
    check("en düşük başarı önce", rows[0]?.itemId === "m2" && rows[0].pct === 0, JSON.stringify(rows.map((r) => r.itemId)));
    check(`en az ${MIN_ANSWERS} cevabı olmayan madde düşüyor`, !rows.some((r) => r.itemId === "m3"));
    check("oran ve sayılar doğru", rows.find((r) => r.itemId === "m1")?.pct === 100 && rows[0].asked === 4 && rows[0].label === "soru m2");
    check("puanlanamayan kâğıt atlanıyor", aggregateMockItems(attempts, () => null, () => "").length === 0);
  }

  console.log("\nUyarı → sayfa eşlemesi");
  check("yeni hata grubu Hatalar'a", alertHref("err:abc") === "/admin/errors" && alertHref("errspike:abc") === "/admin/errors");
  check("mağaza ve vitals Mağaza'ya", alertHref("err-review:ios:1") === "/admin/reviews" && alertHref("vitals:çökme") === "/admin/reviews");
  check("şikâyet Moderasyon'a, bakım Uygulama'ya", alertHref("reports") === "/admin/moderation" && alertHref("maintenance") === "/admin/app");
  check("sunucu uyarıları Sunucu'ya", alertHref("backup:offsite") === "/admin/ops" && alertHref("cron:assess") === "/admin/ops");

  console.log("\nPanel tarih aralığı");
  check("tanınan aralıklar geçiyor", parseRange("7") === 7 && parseRange("90") === 90);
  check("bilinmeyen ya da boş aralık 30'a düşüyor (sınırsız tarama yok)", parseRange("365") === 30 && parseRange(undefined) === 30 && parseRange("abc") === 30);

  console.log("\nVeri dışa aktarma kapsamı");
  // Kimlik doğrulama şemasında kullanıcıya bağlı HER tablo dışarıda bırakılmalı:
  // yeni bir auth tablosu (ör. passkey) eklenip listeye yazılmazsa sırları dışa
  // aktarılan dosyaya girer (2026-09-17'de session/account/twoFactor böyleydi).
  const authUserTables = Object.values(authSchema)
    .filter((v) => is(v, PgTable))
    .filter((v) => USER_COLUMNS.some((c) => c in (v as unknown as Record<string, unknown>)))
    .map((v) => getTableName(v as never));
  const leaked = authUserTables.filter((n) => !AUTH_SECRET_TABLES.has(n));
  check(`auth şemasındaki kullanıcı tabloları dışa aktarmadan hariç (${authUserTables.join(", ")})`, authUserTables.length > 0 && leaked.length === 0, leaked.join(", "));

  console.log(`\n${total - failures}/${total} ${failures ? "BAŞARISIZ" : "tamam"}\n`);
  process.exit(failures ? 1 : 0);
}

void main();

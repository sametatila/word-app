/**
 * Yönetim ve işletim katmanının saf kuralları — `npm run test:admin`.
 *
 * Veritabanı istemez. Sınanan şeylerin ortak özelliği: yanlışları DERLEMEYİ
 * KIRMIYOR ve canlıda sessiz kalıyor.
 *   - uygulama denetimi ayrıştırıcısı: panelden yazılan bozuk bir değer herkesi
 *     güncelleme ekranına kilitleyebilir ya da mağaza bağlantısını dışarıya
 *     yönlendirebilir;
 *   - istemci sürüm başlığı: tanınmazsa zorunlu güncelleme kimseye uygulanmaz;
 *   - Test Lab işareti ve ölçüm süzgeci: bozuk başlık gerçek kullanıcıyı
 *     ölçümden düşürmemeli, süzgeç sütunu alt sorgunun içine bağlanmamalı;
 *   - hata gruplama ve temizleme: kişisel veri sızarsa ya da her hata ayrı grup
 *     olursa panel ve Telegram gürültüye boğulur;
 *   - nginx zaman/rota ayrıştırıcıları: bozulursa 5xx uyarısı hiç tetiklenmez;
 *   - toplu bildirim hedefi ve yolu: dışarıya yönlendiren bildirim yazılamamalı;
 *   - mağaza defteri eşlemesi: yanlış tür/tutar gelir kartını yanıltır.
 */
import { DEFAULT_APP_CONTROL, parseAppControl, parseClientHeader, parseTestLabHeader, updateVerdict } from "../src/lib/app-control-shared";
import { isTestLabSql, notTestLab, real } from "../src/lib/test-lab";
import { errorFingerprint, scrub } from "../src/lib/client-errors";
import { csvCell } from "../src/lib/csv";
import { chunkLines, criticalRouteAlerts, errorLabel, nginxTime } from "../src/lib/alerts";
import { nextSort, parseSort, sortHref } from "../src/lib/admin-sort";
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
import { alertLinks } from "../src/lib/admin-links";
import { QUEUE_ALERT_FAMILIES, rankOf, slaProgress, sortInbox, type InboxItem } from "../src/lib/admin-inbox-shared";
import { parseRange } from "../src/app/admin/_data-shared";
import * as authSchema from "../src/lib/db/auth-schema";
import { getTableName, is } from "drizzle-orm";
import { PgDialect, PgTable } from "drizzle-orm/pg-core";

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

  console.log("\nTest Lab işareti (lib/test-lab)");
  check("tam 1 işaret", parseTestLabHeader("1") && parseTestLabHeader(" 1 "));
  check("başka değer işaret değil", !parseTestLabHeader("true") && !parseTestLabHeader("0") && !parseTestLabHeader("") && !parseTestLabHeader(null));
  const dialect = new PgDialect();
  const render = (q: Parameters<PgDialect["sqlToQuery"]>[0]) => dialect.sqlToQuery(q).sql;
  const ev = render(real("events"));
  check("ölçüm tablosu aynı adla dönüyor", /\) events$/.test(ev), ev);
  check("süzgeç dış tabloya bağlı", ev.includes("tl.user_id = events.user_id and tl.test_lab"), ev);
  check("takma ad korunuyor", /\) p$/.test(render(real("profiles", "p"))));
  const us = render(real("user", "u"));
  check("user tablosu kimlik sütunuyla", us.includes('tl.user_id = "user".id') && /\) u$/.test(us), us);
  check("nitelikli sütun kabul", render(notTestLab("e.user_id")).includes("tl.user_id = e.user_id"));
  let threw = false;
  try { notTestLab("user_id"); } catch { threw = true; }
  check("çıplak sütun reddediliyor (alt sorguya bağlanırdı)", threw);
  check("rozet ifadesi exists", render(isTestLabSql("p.user_id")).startsWith("exists ("));

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

  // Tablo sıralaması (lib/admin-sort): istemci ve sunucu tablosunda aynı kural.
  const DEF = { key: "active", dir: "desc" as const };
  check("sıra adresi: anahtar artan, -anahtar azalan", JSON.stringify(parseSort("xp", ["xp"], DEF)) === '{"key":"xp","dir":"asc"}' && JSON.stringify(parseSort("-xp", ["xp"], DEF)) === '{"key":"xp","dir":"desc"}');
  check("tanınmayan anahtar varsayılana düşer", parseSort("drop table", ["xp"], DEF) === DEF && parseSort(undefined, ["xp"], DEF) === DEF);
  check("yeni sütun: sayı büyükten, metin baştan; aynı sütun yön değiştirir", nextSort(null, "xp", true).dir === "desc" && nextSort(null, "name", false).dir === "asc" && nextSort({ key: "xp", dir: "desc" }, "xp", true).dir === "asc");
  check("sıra bağlantısı süzgeci korur, sayfayı başa alır", sortHref("/admin/users?tur=premium&sayfa=3&sira=xp", { key: "xp", dir: "desc" }) === "/admin/users?tur=premium&sira=-xp");

  // Telegram parçalama: satır ortadan kesilmez, her satır bir kez, sınır aşılmaz.
  const many = Array.from({ length: 40 }, (_, i) => `<b>[UYARI]</b> satır ${i} ${"x".repeat(150)}`);
  const parts = chunkLines(many, 3800);
  const flat = parts.flatMap((c) => c.indexes);
  check("parçalama: her satır tam bir kez", flat.length === 40 && new Set(flat).size === 40 && parts.every((c) => c.lines.every((l, j) => l === many[c.indexes[j]])));
  check("parçalama: hiçbir parça sınırı aşmıyor", parts.length > 1 && parts.every((c) => c.lines.join("\n\n").length <= 3800));
  const huge = chunkLines([`<b>[KRİTİK]</b> ${"y".repeat(5000)}`], 3800);
  check("parçalama: tek dev satır etiketsiz kısaltılıyor", huge.length === 1 && huge[0].lines[0].length <= 3800 && !huge[0].lines[0].includes("<b>"));

  // Tek seferde bile önemli uçlar.
  type R = { method?: string; path: string; status: number };
  const keys = (r: R[]) => criticalRouteAlerts(r.map((x) => ({ method: "POST", ...x }))).map((a) => a.key).sort().join(",");
  const wh = "/api/premium/webhook/revenuecat";
  check("webhook POST 401 tek seferde kritik", keys([{ path: wh, status: 401 }]) === "err-route:webhook:401");
  check("webhook POST 500 kritik", keys([{ path: wh, status: 500 }]) === "err-route:webhook:500");
  check("webhook 200 sessiz", keys([{ path: wh, status: 200 }]) === "");
  check("webhook GET 405 / 404 / 400 sessiz (bot, yanlış KRİTİK olmasın)", keys([{ method: "GET", path: wh, status: 405 }, { path: "/api/premium/webhook/foo", status: 404 }, { path: wh, status: 400 }]) === "");
  check("webhook GET 401 sessiz (yalnız POST sayılır)", keys([{ method: "GET", path: wh, status: 401 }]) === "");
  check("hesap silme 500 tek seferde", keys([{ path: "/api/auth/delete-user", status: 500 }]) === "err-route:delete:500");
  check("hesap silme 400 (yanlış parola) sessiz", keys([{ path: "/api/auth/delete-user", status: 400 }]) === "");
  check("sosyal giriş 2 hata sessiz, 3 hata uyarı", keys(Array(2).fill({ path: "/api/auth/sign-in/social", status: 500 })) === "" && keys(Array(3).fill({ path: "/api/auth/callback/google", status: 500 })) === "err-route:social");
  check("giriş hata sayfası (better-auth 302 yönlendirmesi) sayılıyor", keys([{ method: "GET", path: "/api/auth/error", status: 200 }, { method: "GET", path: "/api/auth/error", status: 200 }, { path: "/api/auth/sign-in/social", status: 401 }]) === "err-route:social");
  check("e-posta girişi 400 (yanlış parola) sosyal sayılmıyor", keys(Array(5).fill({ path: "/api/auth/sign-in/email", status: 400 })) === "");
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
  /* SANDBOX artık İŞARETLİ kabul ediliyor (2026-09-23, IAP-1): TestFlight ve Play iç
     testte satın alan inceleyici premium'u görmeli; satır `sandbox` taşıyıp gelirden
     düşülüyor. `REVENUECAT_ALLOW_SANDBOX=0` eski davranışa (yok say) döndürüyor. */
  const sandbox = await parse({ ...base, id: "e4", type: "INITIAL_PURCHASE", environment: "SANDBOX" });
  check("sandbox kabul ediliyor ama işaretli", sandbox.ok && "event" in sandbox && sandbox.event.sandbox === true);
  process.env.REVENUECAT_ALLOW_SANDBOX = "0";
  const sandboxOff = await parse({ ...base, id: "e5", type: "INITIAL_PURCHASE", environment: "SANDBOX" });
  check("REVENUECAT_ALLOW_SANDBOX=0 iken sandbox yok sayılıyor", !sandboxOff.ok);
  delete process.env.REVENUECAT_ALLOW_SANDBOX;
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
    /*
      SIRALAMA DOĞRULUK ORANINA GÖRE DEĞİL, AYIRT ETME GÜCÜNE GÖRE.

      Fikstür iki maddeyi karşı karşıya koyuyor:
        zor    doğruluk %25 ama doğru yapanlar kâğıtta iyi (90), yapamayanlar
               zayıf (40) — madde AYIRIYOR, işini görüyor.
        bozuk  doğruluk %75 ama yanlış yapanlar kâğıtta iyi (95), doğru
               yapanlar zayıf (45) — yanlış anahtar imzası.

      Doğruluk oranına göre sıralayan bir liste "zor"u başa koyar ve
      müfredatın en öğretici sorusunu kapatmaya davet eder. Doğru liste
      "bozuk"u başa koyuyor.
    */
    const mk = (n: number, score: number, zorOk: boolean, bozukOk: boolean) =>
      Array.from({ length: n }, () => ({
        paperId: "de-b1-01",
        skill: "reading",
        release: 3 as number | null,
        score,
        answers: { zor: zorOk ? "1" : "0", bozuk: bozukOk ? "1" : "0" },
      }));
    const attempts = [
      ...mk(5, 90, true, false),   // iyi öğrenci: zoru bilir, bozuğu "yanlış" yapar
      ...mk(15, 40, false, true),  // zayıf öğrenci: zoru bilemez, bozuğu "doğru" yapar
    ];
    const rows = aggregateMockItems(
      attempts,
      (_p, _s, _r, a) => [
        { id: "zor", correct: a.zor === "1" },
        { id: "bozuk", correct: a.bozuk === "1" },
      ],
      (_p, id) => `soru ${id}`,
    );
    const zor = rows.find((r) => r.itemId === "zor")!;
    const bozuk = rows.find((r) => r.itemId === "bozuk")!;
    check("bozuk madde listenin başında", rows[0]?.itemId === "bozuk", JSON.stringify(rows.map((r) => r.itemId)));
    check("zor madde şüpheli sayılmıyor", !zor.suspect, `ayırt ${zor.discrimination}, %${zor.pct}`);
    check("bozuk madde şüpheli", bozuk.suspect, bozuk.why);
    check("zorun ayırt etme gücü pozitif", zor.discrimination > 0, String(zor.discrimination));
    check("bozuğun ayırt etme gücü negatif", bozuk.discrimination < 0, String(bozuk.discrimination));
    check("doğruluk oranı sıralamayı belirlemiyor", zor.pct < bozuk.pct, `zor %${zor.pct} < bozuk %${bozuk.pct}`);

    // Eşik: iki cevaplı madde hiç listelenmiyor.
    const az = aggregateMockItems(
      mk(2, 70, true, true),
      (_p, _s, _r, a) => [{ id: "tek", correct: a.zor === "1" }],
      () => "",
    );
    check(`en az ${MIN_ANSWERS} cevabı olmayan madde düşüyor`, az.length === 0, String(az.length));
    check("puanlanamayan kâğıt atlanıyor", aggregateMockItems(attempts, () => null, () => "").length === 0);
  }

  console.log("\nUyarı → adres eşlemesi");
  {
    const p = (k: string) => alertLinks(k).panel.path;
    check("yeni hata grubu doğrudan o gruba", p("err:abc123") === "/admin/errors?grup=abc123#grup-abc123" && p("errspike:abc123").startsWith("/admin/errors?grup=abc123"));
    check("mağaza yorumu mağaza sayfasına + doğru konsol", p("err-review:ios:1") === "/admin/reviews#yorumlar" && alertLinks("err-review:ios:1").external?.url.includes("appstoreconnect") === true && alertLinks("err-review:android:1").external?.url.includes("play.google") === true);
    check("vitals bölümüne ve Play vitals'a", p("vitals:çökme") === "/admin/reviews#vitals" && alertLinks("vitals-api").external?.url.includes("vitals") === true);
    check("şikâyet, bakım, e-posta, webhook", p("reports") === "/admin/moderation" && p("maintenance") === "/admin/app#bakim" && p("mail") === "/admin/experience#e-posta" && p("webhook") === "/admin/revenue");
    check("sunucu uyarıları doğru bölüme", p("backup:offsite") === "/admin/ops#yedek" && p("cron:assess") === "/admin/ops#zamanlanmis-isler" && p("cronfail:assess") === "/admin/ops#zamanlanmis-isler" && p("http5xx") === "/admin/ops#istek-sagligi" && p("ai-down:cloudflare") === "/admin/ops#yapay-zeka" && p("azure:key") === "/admin/ops#yapay-zeka" && p("azure:stt-cap") === "/admin/ops#yapay-zeka" && p("ai:none") === "/admin/ops#yapay-zeka" && p("unit:x.service") === "/admin/ops#yedek" && p("disk") === "/admin/ops#kaynak" && p("pgconn") === "/admin/ops#veritabani" && p("instances") === "/admin/ops#deploy");
    check("kritik uç, bildirim, içerik uyarıları doğru yere", p("err-route:webhook:401") === "/admin/revenue" && p("err-route:delete:500") === "/admin/ops#istek-sagligi" && p("err-route:social") === "/admin/ops#istek-sagligi" && p("push") === "/admin/experience#bildirimler" && p("content:promote") === "/admin/content" && p("err-mailverify:12") === "/admin/experience#e-posta");
    check("bütçe uyarıları bütçe bölümüne", ["budget:cloudflare", "budget:groq:openai/gpt-oss-120b", "budget:payment:deepgram", "budget:resend-day", "budget:month"].every((k) => p(k) === "/admin/ops#yapay-zeka-butce"));
    check("bilinmeyen anahtar kaybolmuyor (Sunucu)", p("check:yeni") === "/admin/ops");
    check("etiket boş değil", ["err:a", "reports", "cron:x", "zzz"].every((k) => alertLinks(k).panel.label.length > 3));
    // İstemci hata uyarısı Telegram'a istemcinin metnini taşımıyor (güvenlik denetimi O3).
    check("hata uyarısı: tür + grup", errorLabel({ platform: "web", name: "TypeError", fingerprint: "abcdef1234567890" }) === "web · TypeError · abcdef12");
    check("hata uyarısı: kalıba uymayan ad ve platform yazılmıyor", errorLabel({ platform: "<b>x", name: "Ödül al https://evil.example", fingerprint: "abcdef1234567890" }) === "? · abcdef12");
  }

  console.log("\nCSV hücresi (formül enjeksiyonu)");
  check("formül başlangıcı metne çevriliyor", csvCell("=HYPERLINK(\"x\")") === `"'=HYPERLINK(""x"")"` && csvCell("@SUM(A1)") === "'@SUM(A1)" && csvCell("+cmd") === "'+cmd" && csvCell("-2+3") === "'-2+3");
  check("salt sayı sayı kalıyor", csvCell("-5") === "-5" && csvCell("+3,5") === `"+3,5"` && csvCell(-12) === "-12" && csvCell("-12%") === "-12%");
  check("ayraç ve tırnak kaçırılıyor", csvCell('a,"b"') === `"a,""b"""` && csvCell("düz") === "düz");

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

  console.log("\nGelen işler sırası");
  {
    check("kademe: kritik uyarı < gecikmiş < yaklaşan < uyarı < süresi bol",
      rankOf({ kind: "alert", level: "kritik" }) < rankOf({ kind: "queue", level: "late" }) &&
      rankOf({ kind: "queue", level: "late" }) < rankOf({ kind: "queue", level: "soon" }) &&
      rankOf({ kind: "queue", level: "soon" }) < rankOf({ kind: "alert", level: "uyari" }) &&
      rankOf({ kind: "alert", level: "uyari" }) < rankOf({ kind: "queue", level: "ok" }));
    const it = (id: string, rank: number, due: number | null) => ({ kind: "alert", id, cat: "sistem", level: "uyari", text: "", links: alertLinks("zzz"), rank, due, created: null }) as InboxItem;
    const order = sortInbox([it("c", 4, 300), it("a", 1, 200), it("b", 1, 100), it("d", 0, null)]).map((i) => i.id).join("");
    check("aynı kademede süresi önce dolan üstte", order === "dbac", order);
    check("kuyrukta iş olan konunun uyarısı ikinci kez girmiyor", ["sla-late", "sla-soon", "reports", "err-review"].every((f) => QUEUE_ALERT_FAMILIES.has(f)) && !QUEUE_ALERT_FAMILIES.has("cron"));
    check("Claude'a bırakılan işin hatırlatması Telegram'a gidiyor, kuyrukta ikinci kez durmuyor, Gelen işler'e bağlı", QUEUE_ALERT_FAMILIES.has("claude") && alertLinks("claude:due").panel.path === "/admin");
    const created = new Date(Date.now() - 36 * 3_600_000).toISOString();
    const p = slaProgress("user_report", created, Date.now());
    check("süre halkası: 48 saatin 36'sı geçti → %75, yaklaşan", !!p && Math.abs(p.ratio - 0.75) < 0.01 && p.level === "soon", JSON.stringify(p));
  }

  console.log(`\n${total - failures}/${total} ${failures ? "BAŞARISIZ" : "tamam"}\n`);
  process.exit(failures ? 1 : 0);
}

void main();

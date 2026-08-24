/**
 * Cepte kipinin arıza sınaması — gerçek uygulama, gerçek tarayıcı.
 *
 *   ALLOW_DEMO_USER=1 npm run build && ALLOW_DEMO_USER=1 npx next start -p 3011
 *   WALK_BASE=http://localhost:3011 node scripts/walk-pocket.mjs [senaryo]
 *
 * Neden dışarıdan ölçüyor: uygulamanın kendi günlüğüne bakmak, uygulamanın
 * kendi hakkındaki iddiasına bakmaktır. Burada yalnızca DIŞARIDAN görülebilen
 * iki şey izleniyor — hangi ses çalınmaya çalışıldı (`/api/tts?t=` adresinde
 * metin duruyor) ve mikrofon kaydı sunucuya gitti mi. Tur ilerliyorsa yeni
 * metinler çalınır; donduysa akış susar.
 *
 * Ekran kapanması taklit değil, GERÇEK kısıtlarla kuruluyor:
 *
 *   - `getUserMedia` gizliyken reddediliyor. Telefon kilitlendikten sonra
 *     yeni mikrofon izni verilmiyor; masaüstü Chrome'da bu kısıt yok, o yüzden
 *     eklenmezse test yalancı bir "geçti" veriyor.
 *   - Zamanlayıcılar gizliyken kısılıyor (dakikada bir). Arka plan sekmesinde
 *     `setTimeout` böyle davranıyor ve zaman aşımlarını buna dayanmadan kurmak
 *     korumasız kalmak demek.
 *
 * Senaryolar: ok | tts-hang | tts-500 | stt-hang | stt-500 | stt-off | stt-noise
 *              | browser-fast
 *
 * `browser-fast` EKRAN AÇIK yolu: doğru cevap ara sonuç olarak duyulur duyulmaz
 * dinleme kapanmalı. Sahte tanıyıcı bilerek `onend` VERMİYOR — tur ilerliyorsa
 * bunu yapan tek şey erken kapatmadır, yoksa zaman aşımına kadar beklenirdi.
 *
 * `stt-noise` tanıyıcının gürültüyü kelimeye çevirdiği hâl: metin geliyor ama
 * güveni düşük. Beklenen davranış onu YANLIŞ CEVAP saymak değil, duyulmamış
 * saymak — yanlış saymak kelimeyi gerçekten unutulduğu için değil arkadan
 * geçen bir konuşma yüzünden öne çekerdi.
 *
 * `stt-off` sunucuda konuşma tanıma anahtarının hiç olmadığı hâl. Cevaplar
 * duyulamıyor ama tur DONMAMALI: soru okunmalı, duyulmadığı söylenmeli ve
 * sınıra gelince sesli bir açıklamayla durulmalı.
 */
import { chromium } from "playwright-core";

const BASE = process.env.WALK_BASE ?? "http://localhost:3011";
const SCENARIO = process.argv[2] ?? "ok";
const RUN_MS = Number(process.env.WALK_RUN_MS ?? 70_000);
const HIDE_AT_MS = Number(process.env.WALK_HIDE_AT ?? 6_000);

const t0 = Date.now();
const at = () => String(Date.now() - t0).padStart(6);
const log = (...a) => console.log(at(), ...a);

/** Kısa ama gerçek bir WAV — `onended` ateşlensin diye çalınabilir olmalı. */
function wav(ms = 400) {
  const rate = 8000;
  const n = Math.round((rate * ms) / 1000);
  const b = Buffer.alloc(44 + n);
  b.write("RIFF", 0);
  b.writeUInt32LE(36 + n, 4);
  b.write("WAVEfmt ", 8);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24);
  b.writeUInt32LE(rate, 28);
  b.writeUInt16LE(1, 32);
  b.writeUInt16LE(8, 34);
  b.write("data", 36);
  b.writeUInt32LE(n, 40);
  for (let i = 0; i < n; i++) b[44 + i] = 128 + Math.round(40 * Math.sin((i * 2 * Math.PI * 440) / rate));
  return b;
}
const CLIP = wav();
const never = () => new Promise(() => {});

const spoken = [];
let sttPosts = 0;

/** Sahte tanıyıcının okuyacağı kelimeler — tur verisiyle aynı sıra. */
const WORDS_FOR_FAKE = [
  ["der", "Weg"],
  ["die", "Katze"],
  ["das", "Haus"],
  ["der", "Baum"],
  ["die", "Blume"],
  ["das", "Buch"],
  ["der", "Tisch"],
  ["die", "Tür"],
];

const browser = await chromium.launch({
  // Kurulu sürüm dışarıdan verilebiliyor: bu depo `playwright-core` kullanıyor
  // ve tarayıcıyı kendi indirmiyor.
  executablePath: process.env.WALK_CHROME || undefined,
  args: [
    "--use-fake-device-for-media-stream",
    "--use-fake-ui-for-media-stream",
    "--autoplay-policy=no-user-gesture-required",
  ],
});
const ctx = await browser.newContext({
  permissions: ["microphone"],
  viewport: { width: 412, height: 915 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Mobile Safari/537.36",
});

if (SCENARIO === "browser-fast") {
  await ctx.addInitScript((words) => {
    /*
      Sahte konuşma tanıyıcı.

      Başsız tarayıcıda gerçek tanıma yok, yani "doğru cevabı duyar duymaz
      dinlemeyi kapat" davranışı hiç sınanamıyordu. Bu sahte tanıyıcı doğru
      cevabı ARA SONUÇ olarak veriyor ve `onend` hiç vermiyor: tur ilerliyorsa
      bunu yapan tek şey erken kapatmadır.
    */
    let n = 1; // ilk tur tanıtım, ilk dinleme ikinci kelimede
    class Fake {
      lang = "";
      interimResults = false;
      maxAlternatives = 1;
      continuous = false;
      onresult = null;
      onend = null;
      onerror = null;
      start() {
        const [artikel, de] = words[n++ % words.length];
        setTimeout(() => {
          const alt = { transcript: `${artikel} ${de}`, confidence: 0.95 };
          const res = Object.assign([alt], { length: 1, isFinal: false });
          this.onresult?.({ results: Object.assign([res], { length: 1 }) });
        }, 400);
      }
      stop() {}
      abort() {}
    }
    Object.defineProperty(window, "webkitSpeechRecognition", { value: Fake, writable: true });
    Object.defineProperty(window, "SpeechRecognition", { value: Fake, writable: true });
  }, WORDS_FOR_FAKE);
}

await ctx.addInitScript(() => {
  let hidden = false;
  Object.defineProperty(document, "visibilityState", {
    get: () => (hidden ? "hidden" : "visible"),
    configurable: true,
  });
  Object.defineProperty(document, "hidden", { get: () => hidden, configurable: true });

  // Gerçek telefon kısıtı: ekran kilitliyken yeni mikrofon izni verilmiyor.
  const md = navigator.mediaDevices;
  const gum = md.getUserMedia.bind(md);
  md.getUserMedia = (c) =>
    hidden
      ? Promise.reject(new DOMException("locked screen", "NotAllowedError"))
      : gum(c);

  /*
    Arka plan kısıtlaması: gizli sayfada zamanlayıcı geri çağrıları dakikada
    birden sık çalışmıyor. Zaten kurulmuş olanlar da kısılıyor, o yüzden
    kısıtlama çağrının KENDİSİNDE uygulanıyor; yalnızca kuruluş anında
    uygulansaydı gizlenmeden önce kurulan zamanlayıcılar serbest kalır ve test
    gerçekte olmayan bir koruma gösterirdi.
  */
  const THROTTLE = 60_000;
  const wrapTimer = (orig, isInterval) =>
    function (fn, ms, ...rest) {
      if (typeof fn !== "function") return orig(fn, ms, ...rest);
      let last = Date.now();
      const guarded = (...args) => {
        if (hidden && Date.now() - last < THROTTLE) {
          if (!isInterval) orig(guarded, 250);
          return;
        }
        last = Date.now();
        fn(...args);
      };
      return orig(guarded, ms, ...rest);
    };
  window.setTimeout = wrapTimer(window.setTimeout.bind(window), false);
  window.setInterval = wrapTimer(window.setInterval.bind(window), true);

  /*
    Nabız gözlemi.

    Arka planda ayakta kalmanın tamamı, çalan bir sesin `timeupdate` olayına
    dayanıyor. Bu olay durursa zaman aşımları da durur ve tur donar — yani
    testin ölçmesi gereken ilk şey bu. Sayaç test tarafında tutuluyor,
    uygulamaya hiçbir şey eklenmiyor.
  */
  window.__beats = { timeupdate: 0, players: 0 };
  const play0 = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...a) {
    if (!this.__watched) {
      this.__watched = true;
      window.__beats.players++;
      this.addEventListener("timeupdate", () => window.__beats.timeupdate++);
    }
    return play0.apply(this, a);
  };

  window.__setHidden = (v) => {
    hidden = v;
    document.dispatchEvent(new Event("visibilitychange"));
  };
});

const page = await ctx.newPage();
// Sayfanın hataları sessizce yutulmasın: donmanın sebebi çoğu zaman bir
// istisnadır ve dışarıdan yalnızca "hiçbir şey olmadı" diye görünür.
page.on("pageerror", (e) => log("SAYFA HATASI:", e.message));
page.on("console", (m) => {
  if (m.type() === "error") log("KONSOL:", m.text().slice(0, 200));
});

/*
  Tur verisi de koşumdan veriliyor.

  Uygulama Neon'un HTTP sürücüsünü kullanıyor, yani yerel bir Postgres'e
  bağlanmıyor; gerçek veritabanına bağlanmak ise bu testin cevaplarını
  kullanıcının kendi ilerlemesine yazardı. Burada sınanan şey zaten sunucu
  değil: ekran kapalıyken İSTEMCİ döngüsünün yürüyüp yürümediği. Sabit veri
  aynı zamanda tekrarlanabilirlik demek — hangi kelimenin ne zaman okunması
  gerektiği baştan belli.
*/
const WORDS = [
  ["der", "Weg", "yol"],
  ["die", "Katze", "kedi"],
  ["das", "Haus", "ev"],
  ["der", "Baum", "ağaç"],
  ["die", "Blume", "çiçek"],
  ["das", "Buch", "kitap"],
  ["der", "Tisch", "masa"],
  ["die", "Tür", "kapı"],
];
const round = (i) => {
  const [artikel, de, tr] = WORDS[i % WORDS.length];
  const word = {
    id: i + 1,
    de,
    artikel,
    tr,
    en: null,
    typ: "nomen",
    niveau: "A1",
    beispiel: null,
    beispielTr: null,
  };
  // İlk tur tanıtım: cevap beklenmiyor, yalnızca okunuyor. Karışımda ikisi de
  // olmalı — donma ikisinde de olabiliyor.
  return i === 0
    ? { id: `r${i}`, game: "intro", word }
    : { id: `r${i}`, game: "typing", word, alternatives: [] };
};
const SESSION = {
  rounds: Array.from({ length: 20 }, (_, i) => round(i)),
  resume: null,
  meta: {
    dueCount: 0,
    newToday: 0,
    reviewsToday: 0,
    dailyGoal: 20,
    currentStreak: 1,
    totalXp: 0,
    displayName: "Test",
    level: "A1",
    coverage: { mastered: 0, total: 100 },
    pacing: "normal",
    leeches: 0,
  },
};

await page.route("**/api/session**", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(SESSION),
  }),
);
await page.route("**/api/answers**", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: '{"totalXp":0,"currentStreak":1}',
  }),
);

await page.route("**/api/tts**", async (route) => {
  const text = new URL(route.request().url()).searchParams.get("t") ?? "";
  spoken.push({ ms: Date.now() - t0, text });
  log("OKU:", JSON.stringify(text));
  if (SCENARIO === "tts-hang") return never();
  if (SCENARIO === "tts-500") return route.fulfill({ status: 500, body: "" });
  return route.fulfill({ status: 200, contentType: "audio/wav", body: CLIP });
});

await page.route("**/api/stt**", async (route) => {
  if (route.request().method() === "GET")
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: SCENARIO === "stt-off" ? '{"configured":false}' : '{"configured":true}',
    });
  sttPosts++;
  log("MİKROFON → sunucu (#" + sttPosts + ")");
  if (SCENARIO === "stt-hang") return never();
  if (SCENARIO === "stt-500") return route.fulfill({ status: 500, body: "" });
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body:
      SCENARIO === "stt-noise"
        ? JSON.stringify({ text: "and then he said", confidence: 0.18 })
        : JSON.stringify({ text: "der Weg", confidence: 0.96 }),
  });
});

log("senaryo:", SCENARIO);
await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
// Kartın kendi "Başla" düğmesi — sayfada birden fazla var, o yüzden karta
// göre daraltılıyor.
await page
  .locator("section", { hasText: "Türkçesini duy, Almancasını söyle" })
  .last()
  .getByRole("button", { name: "Başla" })
  .click({ timeout: 20_000 });
await page.getByRole("button", { name: /Kulaklığı tak, başla|Devam et/ }).click({ timeout: 20_000 });
log("tur başladı (ekran açık)");

await page.waitForTimeout(HIDE_AT_MS);
const beforeHide = spoken.length;
if (SCENARIO === "browser-fast") {
  log("--- EKRAN AÇIK KALIYOR (tarayıcı tanıyıcısı yolu) ---");
} else {
  log("--- EKRAN KAPANDI ---");
  await page.evaluate(() => window.__setHidden(true));
}

// Nabız gerçekten atıyor mu — donmanın sebebini ayırt eden tek ölçü.
await page.waitForTimeout(4000);
const beat0 = await page.evaluate(() => ({ ...window.__beats }));
await page.waitForTimeout(4000);
const beat1 = await page.evaluate(() => ({ ...window.__beats }));
log(
  `nabız: ${beat1.timeupdate - beat0.timeupdate} atış / 4 sn · ${beat1.players} oynatıcı`,
);


await page.waitForTimeout(Math.max(0, RUN_MS - 8000));
await browser.close();

// ── Değerlendirme ──────────────────────────────────────────────────
const after = spoken.slice(beforeHide);
const uniq = [...new Set(after.map((s) => s.text))];
console.log("\n─────────────────────────────────");
console.log("ekran kapandıktan sonra okunan parça :", after.length);
console.log("farklı metin                        :", uniq.length);
console.log("sunucuya giden kayıt                :", sttPosts);
if (after.length) {
  const gaps = after.slice(1).map((s, i) => s.ms - after[i].ms);
  console.log("en uzun sessizlik                   :", Math.max(...gaps, 0), "ms");
}
console.log("okunanlar:", uniq.slice(0, 12).map((t) => JSON.stringify(t)).join(" "));

// Ölçüt: ekran kapalıyken tur İLERLEMİŞ olmalı. Tek bir metinde kalmak
// donmadır; bu testin varlık sebebi de o.
/*
  Ölçüt senaryoya göre değişiyor.

  `stt-off`ta cevap duyulamıyor, yani ilerlemenin bir yerde durması DOĞRU
  davranış: duyulmayan cevaplarla yirmi turu tüketmek kullanıcıyı boşuna
  yorardı. Aranan şey donma değil, sesli bir açıklamayla durmak.
*/
const explained = uniq.some((t) => t.includes("duyamıyorum"));
/*
  Gürültü senaryosunda ölçüt: gelen metin YANLIŞ CEVAP olarak işlenmemeli.
  Yanlış cevapta "Doğrusu:" okunuyor, duyulmayanda "Duyamadım." — ikisi
  dışarıdan ayırt edilebiliyor.
*/
const asNoise = uniq.some((t) => t.includes("Duyamadım")) && !uniq.some((t) => t.includes("Doğrusu"));
/*
  Erken kapatma ölçütü: sahte tanıyıcı `onend` vermediği için tur yalnızca
  erken kapatma sayesinde ilerleyebilir. Üstelik hızlı ilerlemeli — zaman
  aşımıyla kurtarılsaydı her soru 21 saniye sürerdi.
*/
const quick = after.length > 1 && Math.max(...after.slice(1).map((s2, i) => s2.ms - after[i].ms), 0) < 8000;
const ok =
  SCENARIO === "browser-fast"
    ? uniq.length >= 3 && quick
    : SCENARIO === "stt-off"
    ? explained
    : SCENARIO === "stt-noise"
      ? uniq.length >= 3 && asNoise
      : uniq.length >= 3;
console.log(
  ok
    ? SCENARIO === "browser-fast"
      ? "\nGEÇTİ — doğru cevap duyulur duyulmaz dinleme kapandı"
      : SCENARIO === "stt-off"
      ? "\nGEÇTİ — donmadı, sebebini sesle söyleyip durdu"
      : SCENARIO === "stt-noise"
        ? "\nGEÇTİ — güveni düşük metin yanlış sayılmadı"
        : "\nGEÇTİ — ekran kapalıyken tur ilerledi"
    : "\nKALDI — tur ekran kapalıyken durdu",
);
process.exit(ok ? 0 : 1);

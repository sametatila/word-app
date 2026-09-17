/**
 * Yürürken modunun EKRAN AÇIK yol sınaması — gerçek uygulama, gerçek tarayıcı.
 *
 *   npm run build && npx next start -p 3011
 *   WALK_BASE=http://localhost:3011 node scripts/walk-pocket.mjs [senaryo]
 *
 * Neden dışarıdan ölçüyor: uygulamanın kendi günlüğüne bakmak, uygulamanın
 * kendi hakkındaki iddiasına bakmaktır. Burada yalnızca DIŞARIDAN görülebilen
 * iki şey izleniyor — hangi ses çalınmaya çalışıldı (`/api/tts?t=` adresinde
 * metin duruyor) ve mikrofon kaydı sunucuya gitti mi.
 *
 * Senaryolar: browser-fast | visible-only
 *
 * `browser-fast`: doğru cevap ara sonuç olarak duyulur duyulmaz dinleme
 * kapanmalı. Sahte tanıyıcı bilerek `onend` VERMİYOR — tur ilerliyorsa bunu
 * yapan tek şey erken kapatmadır, yoksa zaman aşımına kadar beklenirdi.
 *
 * `visible-only`: tanıyıcı hiçbir şey anlamıyor. Ekran açıkken sunucuya HİÇ
 * istek gitmemeli — boş dinleme "duyamadım"dır, yol değişmez.
 *
 * (Ekranı KAPATAN senaryolar — ok, tts-*, stt-*, switch — ekran kapalı cep
 * yoluyla birlikte kaldırıldı, 2026-09-17: ekran kapanınca tur artık duruyor.)
 */
import { chromium } from "playwright-core";

const BASE = process.env.WALK_BASE ?? "http://localhost:3011";
const SCENARIO = process.argv[2] ?? "browser-fast";
if (SCENARIO !== "browser-fast" && SCENARIO !== "visible-only") {
  console.error(`bilinmeyen senaryo: ${SCENARIO} (browser-fast | visible-only)`);
  process.exit(2);
}
const RUN_MS = Number(process.env.WALK_RUN_MS ?? 70_000);
/** Tur başladıktan sonra ölçümün başladığı an. */
const MEASURE_AT_MS = Number(process.env.WALK_MEASURE_AT ?? 6_000);

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

const spoken = [];
let sttPosts = 0;

/** Sahte tanıyıcının okuyacağı kelimeler — tur verisiyle aynı sıra. */
const WORDS_FOR_FAKE = [
  ["der", "Weg", "yol"],
  ["die", "Katze", "kedi"],
  ["das", "Haus", "ev"],
  ["der", "Baum", "ağaç"],
  ["die", "Blume", "çiçek"],
  ["das", "Buch", "kitap"],
  ["der", "Tisch", "masa"],
  ["die", "Tür", "kapı"],
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

await ctx.addInitScript(({ words, scenario }) => {
  /*
    Sahte konuşma tanıyıcı.

    Başsız tarayıcıda gerçek tanıma yok, yani "doğru cevabı duyar duymaz
    dinlemeyi kapat" davranışı hiç sınanamıyordu. Bu sahte tanıyıcı doğru
    cevabı ARA SONUÇ olarak veriyor ve `onend` hiç vermiyor: tur ilerliyorsa
    bunu yapan tek şey erken kapatmadır.

    `visible-only`: tanıyıcı hiç anlamıyor ("no-speech"). Ekran açıkken
    sunucuya HİÇ istek gitmemeli — boş dinleme "duyamadım"dır, yol değişmez.
  */
  const active = new Set();
  class Fake {
    lang = "";
    interimResults = false;
    maxAlternatives = 1;
    continuous = false;
    onresult = null;
    onend = null;
    onerror = null;
    start() {
      if (scenario === "visible-only") {
        setTimeout(() => {
          this.onerror?.({ error: "no-speech" });
          this.onend?.();
        }, 500);
        return;
      }
      active.add(this);
      /*
        Cevap ekrandan: dinleme sırasında Türkçe soru ekranda yazıyor, sahte
        tanıyıcı onu bulup Almancasını veriyor. Sayaçla sıra tutmak tekrar
        sorulan kelimede kayıyordu ve her yanlış cevap sonraki turu
        bozuyordu. Ekranda soru yoksa (onay sorusu) "evet".
      */
      const text = document.body.innerText;
      const hit = words.find((w) => text.includes(w[2]));
      const answer = hit ? `${hit[0]} ${hit[1]}` : "evet";
      setTimeout(() => {
        if (!active.has(this)) return;
        active.delete(this);
        const alt = { transcript: answer, confidence: 0.95 };
        const res = Object.assign([alt], { length: 1, isFinal: false });
        this.onresult?.({ results: Object.assign([res], { length: 1 }) });
      }, 400);
    }
    stop() {
      // Gerçek tanıyıcı `stop()`tan sonra `onend` veriyor; burada bilerek
      // verilmiyor (erken kapatmayı ölçmek için).
      active.delete(this);
    }
    abort() {
      active.delete(this);
    }
  }
  Object.defineProperty(window, "webkitSpeechRecognition", { value: Fake, writable: true });
  Object.defineProperty(window, "SpeechRecognition", { value: Fake, writable: true });
}, { words: WORDS_FOR_FAKE, scenario: SCENARIO });

const page = await ctx.newPage();
// Sayfanın hataları sessizce yutulmasın: donmanın sebebi çoğu zaman bir
// istisnadır ve dışarıdan yalnızca "hiçbir şey olmadı" diye görünür.
page.on("pageerror", (e) => log("SAYFA HATASI:", e.message));
page.on("console", (m) => {
  if (m.type() === "error") log("KONSOL:", m.text().slice(0, 200));
});

/*
  Tur verisi de koşumdan veriliyor.

  Gerçek veritabanına bağlanmak bu testin cevaplarını kullanıcının kendi
  ilerlemesine yazardı. Burada sınanan şey zaten sunucu
  değil: İSTEMCİ döngüsünün hangi yolu kullandığı ve yürüyüp yürümediği. Sabit veri
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
    body: route.request().method() === "POST" ? '{"ok":true}' : JSON.stringify(SESSION),
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
  return route.fulfill({ status: 200, contentType: "audio/wav", body: CLIP });
});

await page.route("**/api/stt**", async (route) => {
  if (route.request().method() === "GET")
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"configured":true}',
    });
  sttPosts++;
  log("MİKROFON → sunucu (#" + sttPosts + ")");
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ text: "der Weg", confidence: 0.96 }),
  });
});

log("senaryo:", SCENARIO);
await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
// "Farklı bir şey dene" ızgarasındaki Yürürken döşemesi — döşemenin tamamı
// bir düğme (bkz. components/mode-tile), adı başlık + durum satırı.
await page.getByRole("button", { name: /Yürürken/ }).click({ timeout: 20_000 });
await page.getByRole("button", { name: /Ekran açık (başla|devam et)/ }).click({ timeout: 20_000 });
log("tur başladı (ekran açık)");

await page.waitForTimeout(MEASURE_AT_MS);
const beforeMeasure = spoken.length;
log("--- ÖLÇÜM BAŞLADI (tarayıcı tanıyıcısı yolu) ---");
await page.waitForTimeout(Math.max(0, RUN_MS - MEASURE_AT_MS));
await browser.close();

// ── Değerlendirme ──────────────────────────────────────────────────
const after = spoken.slice(beforeMeasure);
const uniq = [...new Set(after.map((s) => s.text))];
console.log("\n─────────────────────────────────");
console.log("ölçüm boyunca okunan parça          :", after.length);
console.log("farklı metin                        :", uniq.length);
console.log("sunucuya giden kayıt                :", sttPosts);
if (after.length) {
  const gaps = after.slice(1).map((s, i) => s.ms - after[i].ms);
  console.log("en uzun sessizlik                   :", Math.max(...gaps, 0), "ms");
}
console.log("okunanlar:", uniq.slice(0, 12).map((t) => JSON.stringify(t)).join(" "));

/*
  Erken kapatma ölçütü (`browser-fast`): sahte tanıyıcı `onend` vermediği için
  tur yalnızca erken kapatma sayesinde ilerleyebilir. Üstelik hızlı
  ilerlemeli — zaman aşımıyla kurtarılsaydı her soru 21 saniye sürerdi.

  `visible-only`: sunucuya HİÇ istek yok; tur ya "duyamadım"larla ilerler ya
  da duyulmama sınırında sesle durur, ikisi de doğru.
*/
const quick = after.length > 1 && Math.max(...after.slice(1).map((s2, i) => s2.ms - after[i].ms), 0) < 8000;
const ok =
  SCENARIO === "browser-fast"
    ? uniq.length >= 3 && quick
    : sttPosts === 0 && uniq.some((t) => t.includes("Duyamadım") || t.includes("duyamıyorum"));
console.log(
  ok
    ? SCENARIO === "browser-fast"
      ? "\nGEÇTİ — doğru cevap duyulur duyulmaz dinleme kapandı"
      : "\nGEÇTİ — ekran açıkken sunucuya hiç istek gitmedi, tur duyamadımlarla sürdü"
    : SCENARIO === "browser-fast"
      ? "\nKALDI — dinleme erken kapanmadı ya da tur ilerlemedi"
      : "\nKALDI — ekran açıkken sunucuya istek gitti ya da tur ilerlemedi",
);
process.exit(ok ? 0 : 1);

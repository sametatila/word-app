/**
 * Cepte kipinin arıza sınaması — gerçek uygulama, gerçek tarayıcı.
 *
 *   npm run build && npx next start -p 3011
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
 *              | browser-fast | visible-only | switch
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
/** `switch` senaryosunda ekranın geri açıldığı an. */
const SHOW_AT_MS = Number(process.env.WALK_SHOW_AT ?? 32_000);

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
/** Sunucuya giden kayıtların anları — geçiş senaryosu "ne zaman" diye soruyor. */
const sttTimes = [];

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

if (SCENARIO === "browser-fast" || SCENARIO === "visible-only" || SCENARIO === "switch") {
  await ctx.addInitScript(({ words, scenario }) => {
    /*
      Sahte konuşma tanıyıcı.

      Başsız tarayıcıda gerçek tanıma yok, yani "doğru cevabı duyar duymaz
      dinlemeyi kapat" davranışı hiç sınanamıyordu. Bu sahte tanıyıcı doğru
      cevabı ARA SONUÇ olarak veriyor ve `onend` hiç vermiyor: tur ilerliyorsa
      bunu yapan tek şey erken kapatmadır.

      `visible-only`: tanıyıcı hiç anlamıyor ("no-speech"). Ekran açıkken
      sunucuya HİÇ istek gitmemeli — boş dinleme "duyamadım"dır, yol değişmez.

      `switch`: tanıyıcı gerçek Android gibi davranıyor — sayfa gizlenince
      süren dinlemeyi "aborted" ile iptal ediyor, gizliyken başlatılırsa da.
      Ekran kapanınca cep yoluna, açılınca tanıyıcıya dönülmeli.
    */
    const active = new Set();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) return;
      for (const r of [...active]) r.__abort();
    });
    class Fake {
      lang = "";
      interimResults = false;
      maxAlternatives = 1;
      continuous = false;
      onresult = null;
      onend = null;
      onerror = null;
      __abort() {
        if (!active.has(this)) return;
        active.delete(this);
        this.onerror?.({ error: "aborted" });
        this.onend?.();
      }
      start() {
        if (scenario === "visible-only") {
          setTimeout(() => {
            this.onerror?.({ error: "no-speech" });
            this.onend?.();
          }, 500);
          return;
        }
        if (scenario === "switch" && document.hidden) {
          setTimeout(() => {
            this.onerror?.({ error: "aborted" });
            this.onend?.();
          }, 50);
          return;
        }
        active.add(this);
        /*
          Cevap ekrandan: dinleme sırasında Türkçe soru ekranda yazıyor, sahte
          tanıyıcı onu bulup Almancasını veriyor. Sayaçla sıra tutmak kip
          geçişlerinde (cebe koy → tekrar sor) kayıyordu ve her yanlış cevap
          sonraki turu bozuyordu. Ekranda soru yoksa (onay sorusu) "evet".
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
        active.delete(this);
        // Gerçek tanıyıcı `stop()`tan sonra `onend` veriyor; `browser-fast`
        // bilerek vermiyor (erken kapatmayı ölçmek için), geçiş senaryosu veriyor.
        if (scenario === "switch") setTimeout(() => this.onend?.(), 30);
      }
      abort() {
        active.delete(this);
      }
    }
    Object.defineProperty(window, "webkitSpeechRecognition", { value: Fake, writable: true });
    Object.defineProperty(window, "SpeechRecognition", { value: Fake, writable: true });
  }, { words: WORDS_FOR_FAKE, scenario: SCENARIO });
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

let progressPosts = 0;
await page.route("**/api/session**", (route) => {
  /*
    İlerleme yazımı ayrıca sayılıyor.

    Duyulmayan tur cevap üretmiyor ve eskiden ilerleme de yazılmıyordu; sunucu
    turu yarım görüyor, uygulamaya her girişte AYNI yirmi tur geliyordu.
    Dışarıdan görülebilen kanıt bu istek.
  */
  if (route.request().method() === "POST") progressPosts++;
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: route.request().method() === "POST" ? '{"ok":true}' : JSON.stringify(SESSION),
  });
});
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
  sttTimes.push(Date.now() - t0);
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
// "Farklı bir şey dene" ızgarasındaki Yürürken döşemesi — döşemenin tamamı
// bir düğme (bkz. components/mode-tile), adı başlık + durum satırı.
await page.getByRole("button", { name: /Yürürken/ }).click({ timeout: 20_000 });
await page.getByRole("button", { name: /Kulaklığı tak, başla|Devam et/ }).click({ timeout: 20_000 });
log("tur başladı (ekran açık)");

/*
  Cep yolu artık kendiliğinden değil "Cebe koy" ile kuruluyor: mikrofon ekran
  AÇIKKEN alınıyor (kilitliyken istenemiyor) ve tutulan mikrofon tarayıcı
  tanıyıcısını bozduğu için ekran kipinde hiç tutulmuyor. Ekranı kapatan
  senaryolar önce buna basıyor; düğme yoksa (sunucu STT kapalı) tur ekran
  kapanınca sesli açıklamayla durmalı.
*/
if (SCENARIO !== "browser-fast" && SCENARIO !== "visible-only") {
  try {
    await page.getByRole("button", { name: /Cebe koy/ }).click({ timeout: 8_000 });
    log("cebe koy");
  } catch {
    log("cebe koy düğmesi yok (sunucu STT kapalı?)");
  }
}

await page.waitForTimeout(HIDE_AT_MS);
const beforeHide = spoken.length;
const hideAt = Date.now() - t0;
if (SCENARIO === "browser-fast" || SCENARIO === "visible-only") {
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

/*
  `switch`: ekran bir süre sonra GERİ açılıyor. Beklenen: kapalıyken sunucuya
  kayıt gitti, açıldıktan sonra (süren kaydın bitmesi için kısa bir pay
  hariç) bir daha gitmiyor ve tur tanıyıcıyla sürüyor.
*/
let showAt = Infinity;
if (SCENARIO === "switch") {
  await page.waitForTimeout(Math.max(0, SHOW_AT_MS - HIDE_AT_MS - 8000));
  showAt = Date.now() - t0;
  log("--- EKRAN AÇILDI ---");
  await page.evaluate(() => window.__setHidden(false));
  await page.waitForTimeout(Math.max(0, RUN_MS - SHOW_AT_MS));
} else {
  await page.waitForTimeout(Math.max(0, RUN_MS - 8000));
}
await browser.close();

// ── Değerlendirme ──────────────────────────────────────────────────
const after = spoken.slice(beforeHide);
const uniq = [...new Set(after.map((s) => s.text))];
console.log("\n─────────────────────────────────");
console.log("ekran kapandıktan sonra okunan parça :", after.length);
console.log("farklı metin                        :", uniq.length);
console.log("sunucuya giden kayıt                :", sttPosts);
console.log("ilerleme yazımı                     :", progressPosts);
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
// Duyulmayan turda ilerleme yine de yazılmalı — yoksa aynı tur geri gelir.
const kept = progressPosts > 0;
/*
  Erken kapatma ölçütü: sahte tanıyıcı `onend` vermediği için tur yalnızca
  erken kapatma sayesinde ilerleyebilir. Üstelik hızlı ilerlemeli — zaman
  aşımıyla kurtarılsaydı her soru 21 saniye sürerdi.
*/
const quick = after.length > 1 && Math.max(...after.slice(1).map((s2, i) => s2.ms - after[i].ms), 0) < 8000;
/*
  Geçiş ölçütleri (`switch`): kapalıyken sunucuya kayıt gitmiş olmalı; ekran
  açıldıktan sonra — süren kaydın bitmesine 8 sn pay — bir daha gitmemeli; tur
  ekran açıldıktan sonra da ilerlemeli. `visible-only`: sayfa hep görünür,
  sunucuya HİÇ istek yok, tur "duyamadım"larla yine de ilerliyor.
*/
const postsHidden = sttTimes.filter((t) => t >= hideAt && t < showAt).length;
const postsAfterShow = sttTimes.filter((t) => t > showAt + 8000).length;
const spokenAfterShow = spoken.filter((s) => s.ms > showAt + 2000).length;
if (SCENARIO === "switch") {
  console.log("kapalıyken giden kayıt              :", postsHidden);
  console.log("açıldıktan sonra giden kayıt        :", postsAfterShow);
  console.log("açıldıktan sonra okunan parça       :", spokenAfterShow);
}
const ok =
  SCENARIO === "browser-fast"
    ? uniq.length >= 3 && quick
    : SCENARIO === "visible-only"
      // Tur ya "duyamadım"larla ilerler ya da duyulmama sınırında sesle durur;
      // ikisi de doğru. Yanlış olan tek şey sunucuya istek gitmesi.
      ? sttTimes.length === 0 && uniq.some((t) => t.includes("Duyamadım") || t.includes("duyamıyorum"))
      : SCENARIO === "switch"
        ? postsHidden > 0 && postsAfterShow === 0 && spokenAfterShow >= 2
        : SCENARIO === "stt-off"
          ? explained
          : SCENARIO === "stt-noise"
            ? uniq.length >= 3 && asNoise && kept
            : uniq.length >= 3;
console.log(
  ok
    ? SCENARIO === "browser-fast"
      ? "\nGEÇTİ — doğru cevap duyulur duyulmaz dinleme kapandı"
      : SCENARIO === "visible-only"
        ? "\nGEÇTİ — ekran açıkken sunucuya hiç istek gitmedi, tur duyamadımlarla sürdü"
        : SCENARIO === "switch"
          ? "\nGEÇTİ — kapanınca cep yoluna geçti, açılınca tanıyıcıya döndü"
          : SCENARIO === "stt-off"
            ? "\nGEÇTİ — donmadı, sebebini sesle söyleyip durdu"
            : SCENARIO === "stt-noise"
              ? "\nGEÇTİ — güveni düşük metin yanlış sayılmadı, ilerleme yine de yazıldı"
              : "\nGEÇTİ — ekran kapalıyken tur ilerledi"
    : SCENARIO === "visible-only"
      ? "\nKALDI — ekran açıkken sunucuya istek gitti ya da tur ilerlemedi"
      : SCENARIO === "switch"
        ? "\nKALDI — geçiş beklendiği gibi olmadı"
        : "\nKALDI — tur ekran kapalıyken durdu",
);
process.exit(ok ? 0 : 1);

/**
 * Ses üst üste binme denetimi.
 *
 *   WALK_CHROME=<chrome> node scripts/audio-overlap.mjs
 *
 * Aranan tek şey var: aynı anda BİRDEN FAZLA ses öğesi çalıyor mu. İki ses üst
 * üste bindiğinde kullanıcının duyduğu şey "boş bir odada yankı" oluyor ve bu
 * dışarıdan ses kalitesi sorunu gibi görünüyor — oysa mekanik bir hata.
 *
 * Sebebi tek bir asimetriydi: uygulama iki ses öğesi kullanıyor (parça zinciri
 * ikisini sırayla çalıyor) ama oyunların konuşma yolu yalnızca BİRİNCİSİNİ
 * susturuyordu. Yarım kalmış bir anlatım ikincide çalmaya devam ediyor ve
 * oyunun sesi onun üstüne biniyordu.
 *
 * Ölçüm dışarıdan: `HTMLMediaElement` çalma/durdurma olayları sayılıyor,
 * uygulamaya hiçbir şey eklenmiyor.
 */
import { chromium } from "playwright-core";
const BASE = "http://localhost:3011";
const t0 = Date.now();
const at = () => String(Date.now() - t0).padStart(6);

const W = (id, de, artikel, tr, beispiel) => ({
  id, de, artikel, tr, en: null, typ: "nomen", niveau: "A1",
  beispiel, beispielTr: beispiel ? "örnek" : null,
});
const SESSION = {
  rounds: [
    { id: "r1", game: "artikel", word: W(1, "Weg", "der", "yol", null) },
    { id: "r2", game: "cloze", word: W(2, "Katze", "die", "kedi", "Die Katze schläft."),
      sentence: "Die _____ schläft.", sentenceTr: "Kedi uyuyor.", sentenceEn: null,
      answer: "Katze", options: ["Katze", "Hund", "Maus", "Vogel"] },
    { id: "r3", game: "typing", word: W(3, "Haus", "das", "ev", null), alternatives: [] },
  ],
  resume: null,
  meta: { dueCount: 0, newToday: 0, reviewsToday: 0, dailyGoal: 20, currentStreak: 1,
    totalXp: 0, displayName: "T", level: "A1", coverage: { mastered: 0, total: 100 },
    pacing: "normal", leeches: 0 },
};

const browser = await chromium.launch({
  executablePath: process.env.WALK_CHROME,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true });

await ctx.addInitScript(() => {
  window.__audio = [];
  const p0 = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...a) {
    window.__audio.push({ t: Date.now(), kind: "element.play", src: String(this.src).slice(-60), id: this.__id ??= Math.random().toString(36).slice(2, 6) });
    this.addEventListener("ended", () => window.__audio.push({ t: Date.now(), kind: "element.ended", id: this.__id }), { once: true });
    return p0.apply(this, a);
  };
  const pause0 = HTMLMediaElement.prototype.pause;
  HTMLMediaElement.prototype.pause = function (...a) {
    if (!this.paused) window.__audio.push({ t: Date.now(), kind: "element.pause", id: this.__id });
    return pause0.apply(this, a);
  };
  // WebAudio kaynakları: boşluksuz okuma yolu ve oyun sesleri buradan çıkıyor.
  const AC = window.AudioContext;
  const start0 = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (...a) {
    window.__audio.push({ t: Date.now(), kind: "webaudio.buffer", dur: this.buffer?.duration ?? null });
    return start0.apply(this, a);
  };
  const osc0 = OscillatorNode.prototype.start;
  OscillatorNode.prototype.start = function (...a) {
    window.__audio.push({ t: Date.now(), kind: "webaudio.osc", freq: this.frequency?.value });
    return osc0.apply(this, a);
  };
});

let bad = false;
const page = await ctx.newPage();
await page.route("**/api/session**", (r) =>
  r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(SESSION) }));
await page.route("**/api/answers**", (r) =>
  r.fulfill({ status: 200, contentType: "application/json", body: '{"totalXp":0,"currentStreak":1}' }));

await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: /turluk oturuma başla|Devam et/ }).first().click({ timeout: 20000 });

async function probe(label, click) {
  await page.evaluate(() => (window.__audio = []));
  await click();
  await page.waitForTimeout(6000);
  const ev = await page.evaluate(() => window.__audio);
  console.log(`\n──── ${label} ────`);
  const base = ev[0]?.t ?? 0;
  for (const e of ev) {
    console.log(
      `  +${String(e.t - base).padStart(5)}ms  ${e.kind.padEnd(16)}` +
        `${e.id ? " el=" + e.id : ""}${e.src ? " " + e.src : ""}` +
        `${e.dur != null ? " dur=" + e.dur.toFixed(2) : ""}${e.freq ? " " + Math.round(e.freq) + "Hz" : ""}`,
    );
  }
  // Aynı anda çalan ses öğesi sayısı
  let live = 0, max = 0;
  for (const e of ev) {
    if (e.kind === "element.play") live++;
    if (e.kind === "element.ended" || e.kind === "element.pause") live = Math.max(0, live - 1);
    max = Math.max(max, live);
  }
  const tts = ev.filter((e) => e.kind === "element.play" && e.src.includes("tts")).length;
  console.log(`  → en çok aynı anda çalan öğe: ${max} · tts çalma sayısı: ${tts}`);
  // Bir ses öğesi yeter: ikisi aynı anda çalıyorsa duyulan şey yankı.
  if (max > 1) bad = true;
}

await probe("ARTIKEL YARIŞI", () =>
  page.getByRole("button", { name: /^(der|die|das)$/ }).first().click({ timeout: 15000 }));
await probe("CÜMLEYİ TAMAMLA", () =>
  page.getByRole("button", { name: "Katze", exact: true }).first().click({ timeout: 15000 }));

await probe("YAZMA (karşılaştırma)", async () => {
  await page.keyboard.type("das Haus");
  await page.getByRole("button", { name: /Kontrol et|Gönder|Bitir/ }).first().click({ timeout: 15000 }).catch(() => {});
});

await browser.close();

console.log(`\n${bad ? "KALDI — sesler üst üste biniyor" : "GEÇTİ — hiçbir noktada iki ses aynı anda çalmadı"}`);
process.exit(bad ? 1 : 0);

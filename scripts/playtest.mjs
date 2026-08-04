/**
 * Öğrenci simülasyonu: uygulamayı yalnızca arayüzden oynar.
 * Kelimeleri sadece ekranda gördüğünden öğrenir (tanıtım kartı + yanlış cevap geri bildirimi),
 * bilmediğinde tahmin eder. Kod/veritabanı bilgisi kullanmaz.
 *
 *   node scripts/playtest.mjs [saniye]
 */
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync, appendFileSync } from "node:fs";

const OUT = process.env.PLAYTEST_OUT ?? "/tmp/playtest";
const TOTAL_SECONDS = Number(process.argv[2] ?? 330);
const BASE = "http://localhost:3000";

mkdirSync(OUT, { recursive: true });
mkdirSync(`${OUT}/shots`, { recursive: true });
writeFileSync(`${OUT}/events.jsonl`, "");

const log = (o) => appendFileSync(`${OUT}/events.jsonl`, JSON.stringify({ t: Date.now(), ...o }) + "\n");
const say = (s) => { console.log(s); log({ kind: "note", text: s }); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const think = (min, max) => sleep(min + Math.random() * (max - min));

// --- öğrencinin hafızası (yalnızca ekrandan öğrenilir) ---
const deToTr = new Map();
const trToDe = new Map();
const deToArtikel = new Map();
const sentences = []; // {blanked, de}
const seenWords = new Map(); // de -> kaç kez karşılaştı

function learn(de, tr) {
  if (!de || !tr) return;
  const bare = de.replace(/^(der|die|das)\s+/, "");
  if (/^(der|die|das)\s/.test(de)) deToArtikel.set(bare, de.split(" ")[0]);
  deToTr.set(bare, tr);
  trToDe.set(tr, bare);
}
const know = (tr) => trToDe.get(tr);
const meaning = (de) => deToTr.get(de.replace(/^(der|die|das)\s+/, ""));

async function currentGame(page) {
  const chip = page.locator("span.brand-gradient.rounded-full").first();
  try {
    await chip.waitFor({ state: "visible", timeout: 12000 });
    return (await chip.innerText()).trim();
  } catch {
    return null;
  }
}

async function screenshot(page, name) {
  await page.screenshot({ path: `${OUT}/shots/${name}.png` });
}

// --- oyunlar ---
async function playIntro(page) {
  const box = page.locator(".card").first();
  const de = (await box.locator("h2").first().innerText()).trim();
  const artikel = (await box.locator("span").first().innerText({ timeout: 1200 }).catch(() => "")).trim();
  await think(1200, 2600); // kartı okuma
  const tr = (await box.locator("p").nth(0).innerText({ timeout: 1200 }).catch(() => "")).trim();
  const texts = await box.locator("p").allInnerTexts();
  const trGuess = texts.find((t) => t && !/^[a-zäöüß\s,.\-]+$/i.test(t) === false) ?? tr;
  const full = /^(der|die|das)$/.test(artikel) ? `${artikel} ${de}` : de;
  // ekranda görünen anlam: mor renkli paragraf
  const trShown = (await box.locator("p.text-xl").first().innerText({ timeout: 1500 }).catch(() => trGuess)).trim();
  learn(full, trShown);
  const beispiel = texts.find((t) => t.includes(".") && t.split(" ").length > 3);
  if (beispiel) sentences.push({ text: beispiel, de: de });
  log({ kind: "round", game: "intro", word: full, tr: trShown });
  await page.getByRole("button", { name: /anladım/ }).click();
  return { correct: true, word: full };
}

async function playChoice(page) {
  const prompt = (await page.locator("span.brand-text").first().innerText()).trim();
  const hint = (await page.locator(".muted").first().innerText({ timeout: 1200 }).catch(() => "")).trim();
  const opts = page.locator("button.option");
  const n = await opts.count();
  const texts = [];
  for (let i = 0; i < n; i++) texts.push((await opts.nth(i).innerText()).trim());

  const deSide = /Türkçe karşılığını/.test(hint);
  let want = null;
  if (deSide) want = meaning(prompt);            // Almanca soruldu → Türkçesini biliyor muyum?
  else want = know(prompt);                       // Türkçe soruldu → Almancasını biliyor muyum?

  let idx = texts.findIndex((t) => t === want);
  const guessed = idx < 0;
  if (idx < 0) idx = Math.floor(Math.random() * n);

  await think(guessed ? 1800 : 700, guessed ? 3800 : 1600);
  await opts.nth(idx).click();
  await sleep(300);

  // geri bildirimden öğren
  const fb = await page.locator("p.muted").last().innerText({ timeout: 1200 }).catch(() => "");
  const m = fb.match(/Doğrusu:\s*(.+)$/);
  let correct = !m;
  if (m) {
    if (deSide) learn(prompt, m[1].trim());
    else learn(m[1].trim(), prompt);
  } else if (deSide) learn(prompt, texts[idx]);
  else learn(texts[idx], prompt);

  log({ kind: "round", game: "choice", prompt, guessed, correct, options: n });
  return { correct, word: prompt };
}

async function playArtikel(page) {
  const word = (await page.locator("span.brand-text, h2").first().innerText({ timeout: 1200 }).catch(() => "")).trim();
  const known = deToArtikel.get(word);
  const pick = known ?? ["der", "die", "das"][Math.floor(Math.random() * 3)];
  await think(known ? 600 : 1500, known ? 1400 : 3000);
  await page.getByRole("button", { name: new RegExp(`^${pick}$`) }).click();
  await sleep(400);
  const green = await page.locator("button.option-correct").first().innerText({ timeout: 2500 }).catch(() => "");
  if (green) deToArtikel.set(word, green.trim());
  const correct = green.trim() === pick;
  log({ kind: "round", game: "artikel", word, known: !!known, correct });
  return { correct, word };
}

async function playScramble(page) {
  const prompt = (await page.locator("span.brand-text").first().innerText().catch(() => "")).trim();
  const target = know(prompt);
  const pool = page.locator("div.flex.flex-wrap.justify-center.gap-2:not(.option) > button");
  await think(1500, 3200);

  if (target) {
    for (const ch of [...target]) {
      const c = await pool.count();
      let hit = -1;
      for (let i = 0; i < c; i++) {
        if ((await pool.nth(i).innerText()).trim() === ch) { hit = i; break; }
      }
      if (hit < 0) break;
      await pool.nth(hit).click();
      await sleep(140 + Math.random() * 200);
    }
  } else {
    // bilmiyorum: birkaç harf denerim, sonra ipucuna başvururum
    const total = await pool.count();
    for (let i = 0; i < total; i++) {
      if ((await pool.count()) === 0) break;
      if (i > 0 && Math.random() < 0.5) {
        await page.getByRole("button", { name: /^İpucu$/ }).click().catch(() => {});
      } else {
        await pool.first().click().catch(() => {});
      }
      await sleep(220);
    }
  }
  await sleep(1200);
  const body = await page.locator("body").innerText();
  const m = body.match(/Doğrusu:\s*(\S+)/);
  if (m) learn(m[1].trim(), prompt);
  const correct = !m;
  log({ kind: "round", game: "scramble", prompt, known: !!target, correct });
  return { correct, word: prompt };
}

async function playTyping(page) {
  const trPrompt = (await page.locator("span.brand-text, h2").first().innerText({ timeout: 1200 }).catch(() => "")).trim();
  const target = know(trPrompt);
  const input = page.locator("input").first();
  await think(1400, 3000);
  await input.fill(target ?? "keine");
  await sleep(250);
  await page.getByRole("button", { name: /Kontrol Et/ }).click();
  await sleep(500);
  const body = await page.locator("body").innerText();
  const m = body.match(/Doğru cevap:?\s*(.+)/);
  const correct = !!target && !m;
  if (m) learn(m[1].split("\n")[0].trim(), trPrompt);
  log({ kind: "round", game: "typing", prompt: trPrompt, known: !!target, correct });
  return { correct, word: trPrompt };
}

async function playCloze(page) {
  const sentence = (await page.locator(".card").first().innerText({ timeout: 1200 }).catch(() => "")).trim();
  const opts = page.locator("button.option");
  const n = await opts.count();
  const texts = [];
  for (let i = 0; i < n; i++) texts.push((await opts.nth(i).innerText()).trim());

  // Daha önce tanıtım kartında gördüğüm cümleye benziyor mu?
  let idx = -1;
  const core = sentence.replace(/_+/g, "").replace(/\s+/g, " ").slice(0, 40);
  const remembered = sentences.find((s) => s.text.replace(/\s+/g, " ").includes(core.slice(0, 20)));
  if (remembered) idx = texts.findIndex((t) => t.replace(/^(der|die|das)\s+/, "") === remembered.de);
  const guessed = idx < 0;
  if (idx < 0) idx = Math.floor(Math.random() * n);

  await think(2000, 4200); // cümle okuma
  await opts.nth(idx).click();
  await sleep(600);
  const correctText = await page.locator("button.option-correct").first().innerText({ timeout: 1200 }).catch(() => "");
  const correct = correctText.trim() === texts[idx];
  log({ kind: "round", game: "cloze", guessed, correct });
  return { correct, word: texts[idx] };
}

async function playMatch(page) {
  const t0 = Date.now();
  let pairs = 0;
  for (let attempt = 0; attempt < 24; attempt++) {
    const btns = page.locator("button.option:not(.option-correct)");
    const c = await btns.count();
    if (c === 0) break;
    const items = [];
    for (let i = 0; i < c; i++) {
      const el = btns.nth(i);
      const box = await el.boundingBox();
      if (!box) continue;
      items.push({ i, x: box.x, text: (await el.innerText()).trim() });
    }
    if (!items.length) break;
    const midX = (Math.min(...items.map((o) => o.x)) + Math.max(...items.map((o) => o.x))) / 2;
    const left = items.filter((o) => o.x <= midX);
    const right = items.filter((o) => o.x > midX);
    if (!left.length || !right.length) break;

    const source = left[Math.floor(Math.random() * left.length)];
    const want = meaning(source.text);
    let targetItem = right.find((o) => o.text === want);
    const guessed = !targetItem;
    if (!targetItem) targetItem = right[Math.floor(Math.random() * right.length)];

    await think(guessed ? 1200 : 500, guessed ? 2400 : 1100);
    await btns.nth(source.i).click();
    await sleep(180);
    await btns.nth(targetItem.i).click();
    await sleep(700);
    if (!guessed) pairs++;
    if (Date.now() - t0 > 75000) break;
  }
  log({ kind: "round", game: "match", pairs });
  return { correct: true, word: "match" };
}

const norm = (s) => s.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();

const PLAYERS = {
  "yeni kelime": playIntro,
  "doğru anlam": playChoice,
  "artikel yarışı": playArtikel,
  "harf bulmacası": playScramble,
  "yazarak hatırla": playTyping,
  "cümleyi tamamla": playCloze,
  "eşleştirme": playMatch,
};

async function setLevel(page, level) {
  await page.goto(`${BASE}/profile`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: new RegExp(`^${level} —`) }).click();
  await page.getByRole("button", { name: /^Kaydet$/ }).click();
  await sleep(900);
  say(`— seviye ${level} olarak ayarlandı —`);
  await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
}

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
    args: ["--no-sandbox"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "tr-TR",
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") log({ kind: "console_error", text: m.text().slice(0, 200) });
  });
  page.on("pageerror", (e) => log({ kind: "page_error", text: String(e).slice(0, 200) }));

  const start = Date.now();
  const shot = new Set();
  let rounds = 0, sessions = 0, correct = 0, level = "A1";
  const gameCounts = {};
  const roundDurations = [];
  let lastGame = null, sameGameStreak = 0, maxSameGameStreak = 0;

  await page.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
  await sleep(2500);

  while ((Date.now() - start) / 1000 < TOTAL_SECONDS) {
    const elapsed = (Date.now() - start) / 1000;
    if (elapsed > TOTAL_SECONDS * 0.36 && level === "A1") { level = "A2"; await setLevel(page, "A2"); await sleep(2000); continue; }
    if (elapsed > TOTAL_SECONDS * 0.68 && level === "A2") { level = "B1"; await setLevel(page, "B1"); await sleep(2000); continue; }

    const body = await page.locator("body").innerText({ timeout: 1200 }).catch(() => "");
    if (/Tur tamamlandı/.test(body)) {
      sessions++;
      if (!shot.has("summary")) { await screenshot(page, "summary"); shot.add("summary"); }
      say(`>> oturum ${sessions} bitti (${rounds} tur)`);
      await think(1200, 2200);
      await page.getByRole("button", { name: /Devam et/ }).click();
      await sleep(2200);
      continue;
    }
    if (/Bugünlük her şey tamam/.test(body)) {
      if (!shot.has("empty")) { await screenshot(page, "empty"); shot.add("empty"); }
      say("!! kuyruk boşaldı — 'Bugünlük her şey tamam' ekranı");
      await page.getByRole("button", { name: /Yenile/ }).click();
      await sleep(2500);
      continue;
    }
    if (/Bağlantı kurulamadı/.test(body)) { say("!! bağlantı hatası ekranı"); break; }

    const rawGame = await currentGame(page);
    const game = rawGame ? norm(rawGame) : null;
    if (!game || !PLAYERS[game]) {
      log({ kind: "unknown_screen", body: body.slice(0, 160) });
      await sleep(1200);
      continue;
    }

    if (!shot.has(`${level}-${game}`)) {
      await screenshot(page, `${level}-${game.replace(/\s+/g, "_")}`);
      shot.add(`${level}-${game}`);
    }

    if (game === lastGame) { sameGameStreak++; maxSameGameStreak = Math.max(maxSameGameStreak, sameGameStreak); }
    else sameGameStreak = 1;
    lastGame = game;

    const t0 = Date.now();
    let res;
    try {
      res = await PLAYERS[game](page);
    } catch (err) {
      log({ kind: "play_error", game, text: String(err).slice(0, 200) });
      await sleep(1500);
      continue;
    }
    // Tur geçişi bitene kadar bekle: geçiş anında tıklamak hedefi ıskalıyor.
    await sleep(1300);
    const dur = Date.now() - t0;
    roundDurations.push({ game, dur });
    gameCounts[game] = (gameCounts[game] ?? 0) + 1;
    rounds++;
    if (res.correct) correct++;
    if (res.word) seenWords.set(res.word, (seenWords.get(res.word) ?? 0) + 1);
    await sleep(500);
  }

  // ilerleme ekranı
  await page.goto(`${BASE}/progress`, { waitUntil: "domcontentloaded" });
  await sleep(2000);
  await screenshot(page, "progress");
  await page.goto(`${BASE}/profile`, { waitUntil: "domcontentloaded" });
  await sleep(1500);
  await screenshot(page, "profile");
  // masaüstü görünüm
  const wide = await ctx.newPage();
  await wide.setViewportSize({ width: 1440, height: 900 });
  await wide.goto(`${BASE}/learn`, { waitUntil: "domcontentloaded" });
  await sleep(2500);
  await wide.screenshot({ path: `${OUT}/shots/desktop-learn.png` });
  await wide.goto(`${BASE}/progress`, { waitUntil: "domcontentloaded" });
  await sleep(2000);
  await wide.screenshot({ path: `${OUT}/shots/desktop-progress.png` });

  const summary = {
    seconds: Math.round((Date.now() - start) / 1000),
    rounds,
    sessions,
    accuracy: rounds ? Math.round((correct / rounds) * 100) : 0,
    gameCounts,
    maxSameGameStreak,
    learnedWords: deToTr.size,
    repeatedWords: [...seenWords.entries()].filter(([, c]) => c > 1).length,
    avgRoundMs: Math.round(roundDurations.reduce((s, r) => s + r.dur, 0) / (roundDurations.length || 1)),
  };
  writeFileSync(`${OUT}/summary.json`, JSON.stringify(summary, null, 2));
  console.log("\n=== ÖZET ===\n" + JSON.stringify(summary, null, 2));
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });

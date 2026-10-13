#!/usr/bin/env node
/*
  YATAY VİDEO ÜRETİMİ (YouTube uzun video). Sunucu işçisi (worker.mjs, stüdyoda onaylanan sürüm) ve yerel komut
  aynı fonksiyonu kullanır.

  Çıktı (dir): <ad>.mp4 (1920×1080, 30 fps, H.264 High yuv420p BT.709, CRF 18, 2 sn'de bir anahtar kare, AAC 192k
  48 kHz, −14 LUFS, gerçek tepe ≤ −1 dBTP, +faststart), kapak.jpg (1280×720, YouTube küçük resmi), aciklama.txt
  (YouTube açıklaması: bölümün metni + bölüm listesi + bağlantı + etiketler).

  Ses Node tarafında karışır (12 dakikalık izi sayfada kurmak tarayıcıyı boğardı): motorun planındaki her ses ipucu
  kaydın dosyasından çözülüp zamanına eklenir, efektler motordaki formülün aynısıyla (Y.SFX ↔ SFX aşağıda).

  node scripts/social/yatay/uret.mjs <yatay-id> [--sunucudan] [--sure 20]   (yerel; .shots/social/yatay/<id>/video/)
*/
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { renderPage, resolveClips, clipPath, OUT, pullFromServer } from "./sayfa.mjs";
import { describe } from "./aciklama.mjs";
import { loudness, normalize, run } from "../lib/audio.mjs";
import { launchBrowser } from "../lib/page.mjs";
import { loadLong, spokenOf } from "./icerik.mjs";

export const FPS = 30;
const RATE = 48000;

/** Motordaki Y.SFX'in eşi (aynı formül, aynı süre). */
const SFX = {
  tick: { dur: 0.06, f: (t) => Math.sin(2 * Math.PI * 1320 * t) * Math.exp(-t * 70) * 0.18 },
  ok: { dur: 0.7, f: (t) => (Math.sin(2 * Math.PI * 880 * t) * 0.6 + Math.sin(2 * Math.PI * 1320 * t) * 0.3 * (t > 0.08 ? 1 : 0)) * Math.exp(-t * 6) * 0.16 },
  chap: { dur: 1.1, f: (t) => (Math.sin(2 * Math.PI * 523.25 * t) + 0.6 * Math.sin(2 * Math.PI * 783.99 * t) * (t > 0.12 ? 1 : 0)) * Math.exp(-t * 3.6) * 0.09 },
};

/** Kaydı mono 48 kHz float'a çöz. */
function decode(file) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-f", "f32le", "-ac", "1", "-ar", String(RATE), "-"], { maxBuffer: 1 << 28 });
  if (r.status !== 0) throw new Error(`çözülemedi: ${file}: ${r.stderr}`);
  return new Float32Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length / 4);
}

/** Planın ses izi → 16 bit stereo WAV (normalize edilmemiş). */
export function mixWav(plan, out, { allowMissing = false } = {}) {
  const n = Math.ceil((plan.duration + 0.5) * RATE);
  const mix = new Float32Array(n);
  const cache = new Map();
  for (const c of plan.voice) {
    const f = clipPath(c.key);
    if (!f && allowMissing) continue;
    if (!f) throw new Error(`ses yok: ${c.key}`);
    if (!cache.has(c.key)) cache.set(c.key, decode(f));
    const pcm = cache.get(c.key);
    const o = Math.round(c.t * RATE);
    for (let i = 0; i < pcm.length && o + i < n; i++) mix[o + i] += pcm[i];
  }
  for (const s of plan.sfx) {
    const fx = SFX[s.kind];
    if (!fx) continue;
    const o = Math.round(s.t * RATE);
    const len = Math.round(fx.dur * RATE);
    for (let i = 0; i < len && o + i < n; i++) mix[o + i] += fx.f(i / RATE);
  }
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(RATE, 24);
  buf.writeUInt32LE(RATE * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0, o = 44; i < n; i++, o += 4) {
    const v = Math.round(Math.max(-1, Math.min(1, mix[i])) * 32767);
    buf.writeInt16LE(v, o);
    buf.writeInt16LE(v, o + 2);
  }
  fs.writeFileSync(out, buf);
}

/**
 * ep: { id, template, data }. check: üretmeden yerleşim denetimi (Y.audit) ve ses denetimi; sorun varsa hata.
 * onProgress(0–1) en çok saniyede bir çağrılır (sunucu işçisi kalp atışı ve kilit tazelemesi için).
 */
export async function renderLong(browser, ep, { dir, tmp, check = false, limit = 0, allowMissing = false, onProgress = async () => {} }) {
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(tmp, { recursive: true });
  const { clips, missing } = resolveClips(spokenOf(ep.data));
  if (missing.length && !allowMissing) throw new Error(`ses yok (${missing.length}): ${missing.slice(0, 4).join(" · ")}`);
  const html = path.join(tmp, "sayfa.html");
  fs.writeFileSync(html, renderPage({ template: ep.template, data: ep.data, clips, engine: ep.engine || null }));
  const pg = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on("pageerror", (e) => errs.push(String(e)));
  try {
    await pg.goto(`file://${html}`);
    await pg.waitForFunction(() => window.READY === true || window.FAILED, null, { timeout: 180000 });
    const failed = await pg.evaluate(() => window.FAILED || null);
    if (failed) throw new Error(`sahne kurulamadı: ${failed}`);
    if (check) {
      const issues = await pg.evaluate(() => Y.audit(window.I));
      if (issues.length) throw new Error(`yerleşim sorunu: ${issues.slice(0, 3).join(" | ")}`);
    }
    const plan = await pg.evaluate(() => window.I.plan);
    if (limit) plan.duration = Math.min(plan.duration, limit); // yerel deneme: yalnız ilk saniyeler

    const raw = path.join(tmp, "ses.wav");
    const norm = path.join(tmp, "ses-14lufs.wav");
    mixWav(plan, raw, { allowMissing });
    const loud = normalize(raw, norm);
    const mp4 = path.join(dir, `${ep.id}.mp4`);
    const ff = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", "-i", norm, "-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-c:v", "libx264", "-profile:v", "high", "-crf", "18", "-preset", "medium", "-g", String(FPS * 2), "-r", String(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", mp4], { stdio: ["pipe", "inherit", "inherit"] });
    const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
    const frames = Math.round(plan.duration * FPS);
    let last = 0;
    for (let i = 0; i < frames; i++) {
      await pg.evaluate((t) => window.I.render(t), i / FPS);
      const jpg = await pg.screenshot({ type: "jpeg", quality: 92 });
      if (!ff.stdin.write(jpg)) await new Promise((r) => ff.stdin.once("drain", r));
      if (Date.now() - last > 1000) {
        last = Date.now();
        await onProgress(i / frames);
      }
    }
    ff.stdin.end();
    await done;

    // kapak (1280×720) ve açıklama
    await pg.evaluate(() => window.I.showCover(true));
    const png = path.join(tmp, "kapak.png");
    fs.writeFileSync(png, await pg.screenshot({ type: "png" }));
    run("ffmpeg", ["-y", "-hide_banner", "-i", png, "-vf", "scale=1280:720:flags=lanczos", "-q:v", "2", path.join(dir, "kapak.jpg")]);
    const caption = describe({ id: ep.id, data: ep.data, plan });
    fs.writeFileSync(path.join(dir, "aciklama.txt"), `${caption}\n`);
    if (errs.length) throw new Error(`sayfa hatası: ${errs.join(" | ")}`);

    // AAC'den sonra yüklenecek dosyanın kendisi; tepe aşıldıysa ses daha sıkı sınırlanıp yeniden konur
    let fin = loudness(mp4);
    for (let peak = -1, k = 0; fin.TP > -1 && k < 3; k++) {
      peak -= fin.TP + 1.2;
      const tight = path.join(tmp, "ses-sikti.wav");
      normalize(raw, tight, peak);
      const fixed = path.join(tmp, "duzeltilmis.mp4");
      run("ffmpeg", ["-y", "-hide_banner", "-i", mp4, "-i", tight, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", fixed]);
      fs.renameSync(fixed, mp4);
      fin = loudness(mp4);
    }
    return { duration: plan.duration, frames, bytes: fs.statSync(mp4).size, inputLufs: loud.input_i, lufs: fin.I, truePeak: fin.TP, caption, chapters: plan.chapters.length };
  } finally {
    await pg.close();
  }
}

// yerel komut
if (import.meta.url === `file://${process.argv[1]}`) {
  const id = process.argv[2];
  if (!id) throw new Error("kullanım: uret.mjs <yatay-id> [--sunucudan]");
  const [ep] = await loadLong([id]);
  if (process.argv.includes("--sunucudan")) pullFromServer(ep.spoken);
  const browser = await launchBrowser();
  const t0 = Date.now();
  try {
    const limit = process.argv.includes("--sure") ? Number(process.argv[process.argv.indexOf("--sure") + 1]) : 0;
    const r = await renderLong(browser, ep, { dir: path.join(OUT, id, "video"), tmp: path.join(OUT, id, "tmp"), check: !limit, limit, allowMissing: !!limit, onProgress: async (f) => process.stdout.write(`\r%${Math.round(f * 100)}`) });
    console.log(`\n✓ ${id}: ${r.duration.toFixed(1)} sn, ${(r.bytes / 1e6).toFixed(1)} MB, ${r.lufs} LUFS, tepe ${r.truePeak} dBTP, ${((Date.now() - t0) / 60000).toFixed(1)} dk`);
  } finally {
    await browser.close();
  }
}

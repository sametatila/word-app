#!/usr/bin/env node
/*
  Bölümü paylaşılabilir dosyalara çevirir (TikTok + Instagram Reels, ikisi aynı dosyayı kabul eder):

  npm run social:render -- <bölüm-id> [<bölüm-id> …]     ör. duy-lacivert-001
  npm run social:render -- --status hazır                 durumu "hazır" olan bütün bölümler
  … --muziksiz                                            müziksiz sürüm de (<id>-muziksiz.mp4): platformun kendi
                                                          (ticari) müzik kütüphanesinden parça eklemek için

  Çıktı (git dışı) .shots/social/out/<bölüm-id>/:
    <bölüm-id>.mp4   1080×1920, 30 fps, H.264 High yuv420p (CRF 18, 2 sn'de bir anahtar kare), AAC 192k 48 kHz,
                     ses −14 LUFS / gerçek tepe ≤ −1 dBTP, AAC sonrası ölçülür (iki platform da bu seviyeye çekiyor; daha yüksek verilirse kısılır),
                     +faststart (yükleme sırasında önizleme)
    kapak.jpg        9:16 kapak (plan.poster karesi): TikTok ve Reels'te kapak seçerken yüklenir
    kapak-3x4.jpg    profil ızgarasının gösterdiği orta 3:4 kesit (1080×1440, y 240–1680): kanca burada okunmalı
    aciklama.txt     paylaşım metni + etiketler

  Kareler sayfadaki belirli renderAt(t) ile alınır (aynı t → aynı kare); ses aynı motorun OfflineAudioContext izi.
*/
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { loadEpisodes } from "./lib/episodes.mjs";
import { OUT, CHROME, playwright } from "./lib/page.mjs";
import { run, loudness, renderDoc, soundtrackWav } from "./lib/audio.mjs";

const FPS = 30;
const args = process.argv.slice(2);
let ids = args.filter((a) => !a.startsWith("--"));
if (args.includes("--status")) {
  const want = args[args.indexOf("--status") + 1];
  ids = (await loadEpisodes()).episodes.filter((e) => e.status === want).map((e) => e.id);
}
if (!ids.length) {
  console.error("kullanım: npm run social:render -- <bölüm-id> … | --status hazır");
  process.exit(1);
}

const browser = await playwright().chromium.launch({ executablePath: CHROME });
for (const id of ids) {
  const t0 = Date.now();
  const { episodes, clips } = await loadEpisodes([id]);
  const ep = episodes[0];
  const dir = path.join(OUT, "out", id);
  const tmp = path.join(OUT, "render", id);
  fs.mkdirSync(dir, { recursive: true });
  const html = renderDoc(ep, clips, tmp);

  const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on("pageerror", (e) => errs.push(String(e)));
  await pg.goto(`file://${html}`);
  await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const plan = await pg.evaluate(() => ({ duration: window.I.plan.duration, poster: window.I.plan.poster, caption: window.I.plan.caption }));

  // ses
  const loud = await soundtrackWav(pg, tmp);
  const norm = loud.file;

  // kareler → ffmpeg
  const mp4 = path.join(dir, `${id}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", "-i", norm, "-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-c:v", "libx264", "-profile:v", "high", "-crf", "18", "-preset", "medium", "-g", String(FPS * 2), "-r", String(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", mp4], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
  const frames = Math.round(plan.duration * FPS);
  for (let i = 0; i < frames; i++) {
    await pg.evaluate((t) => window.I.render(t), i / FPS);
    const jpg = await pg.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(jpg)) await new Promise((r) => ff.stdin.once("drain", r));
    if (i % 150 === 0) process.stdout.write(`\r${id}: ${Math.round((i / frames) * 100)}%`);
  }
  ff.stdin.end();
  await done;

  // müziksiz sürüm: aynı görüntü, sesi yalnız konuşma + efekt (yeniden kodlama yok)
  if (args.includes("--muziksiz")) {
    const { file: norm2 } = await soundtrackWav(pg, tmp, { noMusic: true });
    run("ffmpeg", ["-y", "-hide_banner", "-i", mp4, "-i", norm2, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", path.join(dir, `${id}-muziksiz.mp4`)]);
  }

  // kapaklar ve açıklama
  await pg.evaluate((t) => window.I.render(t), plan.poster);
  const cover = path.join(dir, "kapak.jpg");
  fs.writeFileSync(cover, await pg.screenshot({ type: "jpeg", quality: 92 }));
  run("ffmpeg", ["-y", "-hide_banner", "-i", cover, "-vf", "crop=1080:1440:0:240", "-q:v", "2", path.join(dir, "kapak-3x4.jpg")]);
  fs.writeFileSync(path.join(dir, "aciklama.txt"), `${plan.caption}\n`);
  await pg.close();
  if (errs.length) throw new Error(`${id}: sayfa hatası: ${errs.join(" | ")}`);
  const mb = (fs.statSync(mp4).size / 1e6).toFixed(1);
  const fin = loudness(mp4); // AAC'den sonra, yüklenecek dosyanın kendisi
  console.log(`\r✓ ${id}: ${plan.duration.toFixed(1)} sn, ${frames} kare, ${mb} MB, ses ${loud.input_i} → ${fin.I} LUFS (gerçek tepe ${fin.TP} dBTP), ${((Date.now() - t0) / 1000).toFixed(0)} sn → ${path.relative(process.cwd(), dir)}/`);
}
await browser.close();

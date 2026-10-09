/*
  Video üretimi: render.html sayfasından kare kare MP4 + kapaklar + açıklama. Yerel komut (render.mjs, depodaki
  bölümler) ve sunucu işçisi (worker.mjs, stüdyoda onaylanan sürüm) aynı fonksiyonu kullanır: aynı ayarlar, aynı kalite.

  Çıktı (dir): <ad>.mp4 (1080×1920, 30 fps, H.264 High yuv420p BT.709, CRF 18, 2 sn'de bir anahtar kare, AAC 192k
  48 kHz, −14 LUFS, gerçek tepe ≤ −1 dBTP, +faststart), kapak.jpg (9:16), kapak-3x4.jpg (orta 1080×1440),
  aciklama.txt; isteğe bağlı <ad>-muziksiz.mp4.
*/
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { run, loudness, normalize, soundtrackWav } from "./audio.mjs";

export const FPS = 30;

/**
 * html: renderDoc() çıktısı. check: üretmeden önce sayfada yerleşim denetimi (E.audit) ve Defne sesi denetimi;
 * sorun varsa hata (sunucu işçisi, stüdyonun onayına güvenmeden bir kez daha bakar).
 */
export async function renderVideo(browser, html, { name, dir, tmp, noMusicToo = false, check = false, onProgress = () => {} }) {
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(tmp, { recursive: true });
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on("pageerror", (e) => errs.push(String(e)));
  try {
    await pg.goto(`file://${html}`);
    await pg.waitForFunction(() => window.READY === true || window.FAILED, null, { timeout: 60000 });
    const failed = await pg.evaluate(() => window.FAILED || null);
    if (failed) throw new Error(`sahne kurulamadı: ${failed}`);
    if (check) {
      const issues = await pg.evaluate(() => E.audit(document.getElementById("host"), window.I));
      if (issues.length) throw new Error(`yerleşim sorunu: ${issues.slice(0, 3).join(" | ")}`);
    }
    const plan = await pg.evaluate(() => ({ duration: window.I.plan.duration, poster: window.I.plan.poster, caption: window.I.plan.caption }));

    const loud = await soundtrackWav(pg, tmp);
    const mp4 = path.join(dir, `${name}.mp4`);
    const ff = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", "-i", loud.file, "-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-c:v", "libx264", "-profile:v", "high", "-crf", "18", "-preset", "medium", "-g", String(FPS * 2), "-r", String(FPS), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", mp4], { stdio: ["pipe", "inherit", "inherit"] });
    const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
    const frames = Math.round(plan.duration * FPS);
    for (let i = 0; i < frames; i++) {
      await pg.evaluate((t) => window.I.render(t), i / FPS);
      const jpg = await pg.screenshot({ type: "jpeg", quality: 92 });
      if (!ff.stdin.write(jpg)) await new Promise((r) => ff.stdin.once("drain", r));
      if (i % 30 === 0) await onProgress(i / frames);
    }
    ff.stdin.end();
    await done;

    // müziksiz sürüm: aynı görüntü, sesi yalnız konuşma + efekt (yeniden kodlama yok)
    if (noMusicToo) {
      const { file } = await soundtrackWav(pg, tmp, { noMusic: true });
      run("ffmpeg", ["-y", "-hide_banner", "-i", mp4, "-i", file, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", path.join(dir, `${name}-muziksiz.mp4`)]);
    }

    // kapaklar ve açıklama
    await pg.evaluate((t) => window.I.render(t), plan.poster);
    const cover = path.join(dir, "kapak.jpg");
    fs.writeFileSync(cover, await pg.screenshot({ type: "jpeg", quality: 92 }));
    run("ffmpeg", ["-y", "-hide_banner", "-i", cover, "-vf", "crop=1080:1440:0:240", "-q:v", "2", path.join(dir, "kapak-3x4.jpg")]);
    fs.writeFileSync(path.join(dir, "aciklama.txt"), `${plan.caption}\n`);
    if (errs.length) throw new Error(`sayfa hatası: ${errs.join(" | ")}`);

    // AAC'den sonra, yüklenecek dosyanın kendisi; tepe aşıldıysa ses daha sıkı sınırlanıp yeniden konur (görüntüye dokunmadan)
    let fin = loudness(mp4);
    for (let peak = -1, k = 0; fin.TP > -1 && k < 3; k++) {
      peak -= fin.TP + 1.2;
      const tight = path.join(tmp, "ses-sikti.wav");
      normalize(loud.raw, tight, peak);
      const fixed = path.join(tmp, "duzeltilmis.mp4");
      run("ffmpeg", ["-y", "-hide_banner", "-i", mp4, "-i", tight, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", fixed]);
      fs.renameSync(fixed, mp4);
      fin = loudness(mp4);
    }
    return { duration: plan.duration, frames, bytes: fs.statSync(mp4).size, inputLufs: loud.input_i, lufs: fin.I, truePeak: fin.TP, caption: plan.caption };
  } finally {
    await pg.close();
  }
}

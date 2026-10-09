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
import path from "node:path";
import { loadEpisodes } from "./lib/episodes.mjs";
import { OUT, CHROME, playwright } from "./lib/page.mjs";
import { renderDoc } from "./lib/audio.mjs";
import { renderVideo } from "./lib/render.mjs";

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
  const dir = path.join(OUT, "out", id);
  const tmp = path.join(OUT, "render", id);
  const html = renderDoc(episodes[0], clips, tmp);
  const r = await renderVideo(browser, html, { name: id, dir, tmp, noMusicToo: args.includes("--muziksiz"), onProgress: (f) => process.stdout.write(`\r${id}: ${Math.round(f * 100)}%`) });
  if (r.truePeak > -1) console.warn(`\n! ${id}: gerçek tepe ${r.truePeak} dBTP, −1'in üstünde`);
  console.log(`\r✓ ${id}: ${r.duration.toFixed(1)} sn, ${r.frames} kare, ${(r.bytes / 1e6).toFixed(1)} MB, ses ${r.inputLufs} → ${r.lufs} LUFS (gerçek tepe ${r.truePeak} dBTP), ${((Date.now() - t0) / 1000).toFixed(0)} sn → ${path.relative(process.cwd(), dir)}/`);
}
await browser.close();

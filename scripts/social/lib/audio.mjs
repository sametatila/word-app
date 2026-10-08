/*
  Ses izi: motorun OfflineAudioContext karışımı (render.html window.wav) → −14 LUFS → dosya. MP4 üretimi (render.mjs)
  ve galeri (gallery.mjs) aynı yolu kullanır: galeride duyulan, yüklenecek videodaki sesin aynısı.
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { buildPage, localDoc } from "./page.mjs";

export const run = (cmd, a) => {
  const r = spawnSync(cmd, a, { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`${cmd} ${a.join(" ")}\n${r.stderr}`);
  return r.stderr;
};

/** Bütünleşik ses yüksekliği (LUFS) ve gerçek tepe (dBTP). */
export function loudness(file) {
  const e = run("ffmpeg", ["-hide_banner", "-i", file, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const tail = e.slice(e.lastIndexOf("Summary:"));
  return { I: Number(tail.match(/I:\s+(-?[\d.]+) LUFS/)[1]), TP: Number(tail.match(/Peak:\s+(-?[\d.]+) dBFS/)[1]) };
}

/**
 * −14 LUFS'a eşitleme: kazanç + sert sınırlayıcı (tavan −2 dBFS, AAC'nin taşmasına pay), ölç, bir kez düzelt.
 * loudnorm'un doğrusal modu tepe sınırına takılıp hedefin altında kalıyordu, dinamik modu tepeyi aşıyordu.
 */
export function normalize(inWav, outWav) {
  const before = loudness(inWav);
  let gain = -14 - before.I;
  let after;
  for (let k = 0; k < 5; k++) {
    run("ffmpeg", ["-y", "-hide_banner", "-i", inWav, "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.79:attack=1:release=50:level=disabled`, "-ar", "48000", outWav]);
    after = loudness(outWav);
    if (Math.abs(after.I + 14) <= 0.5) break;
    gain += -14 - after.I;
  }
  return { input_i: before.I, output_i: after.I, output_tp: after.TP };
}

/**
 * Bölümün kare kare sayfası (render.html, 1080×1920): dışa aktarma ve ses izi bunun üstünden alınır.
 * Dönüş: yerel HTML dosyasının yolu.
 */
export function renderDoc(ep, clips, dir) {
  const { page, ok } = buildPage("render.html", { data: { [ep.template]: ep.data }, clips, templates: [ep.template], meta: { TEMPLATE: ep.template } });
  if (!ok.includes(ep.template)) throw new Error(`şablon yüklenemedi: ${ep.template}`);
  fs.mkdirSync(dir, { recursive: true });
  const html = path.join(dir, "page.html");
  fs.writeFileSync(html, localDoc(page));
  return html;
}

/** Açık render sayfasından ses izini alıp −14 LUFS WAV yazar. */
export async function soundtrackWav(pg, dir, { noMusic = false } = {}) {
  const tag = noMusic ? "ses-muziksiz" : "ses";
  const raw = path.join(dir, `${tag}.wav`);
  const norm = path.join(dir, `${tag}-14lufs.wav`);
  fs.writeFileSync(raw, Buffer.from(await pg.evaluate((n) => window.wav(n), noMusic), "base64"));
  return { file: norm, ...normalize(raw, norm) };
}

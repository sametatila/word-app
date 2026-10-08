#!/usr/bin/env node
/*
  Tasarım atölyesi (galeri + oynatıcı): her şablonun EN YENİ bölümü. Artifact olarak yayınlanan tek dosya.

  npm run social:gallery [-- --no-posters] [-- --no-audio] [-- --open]

  Çıktı (git dışı) .shots/social/gallery/: atolye.html (yayın; iskeleti Artifact ekler), atolye.local.html (yerel),
  ses/<şablon>.m4a (yayında atolye.html'in yanındaki dosyalar: Artifact `files`).
  Kapaklar Chrome'da çekilip JPEG gömülür: galeri 20 canlı sahne kurarsa iPhone'da (3x) bellek biter ve sayfa çöker.
  Ses de burada üretilir (MP4'teki −14 LUFS karışımın aynısı, AAC): telefonda Safari 40 sn'lik müziği kendisi
  sentezlerken çöküyordu. Ses dosyası okunamazsa (file:// ile yerel açılış) oynatıcı sesi tarayıcıda sentezler.
*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { loadEpisodes, duplicates } from "./lib/episodes.mjs";
import { buildPage, localDoc, OUT, CHROME, playwright } from "./lib/page.mjs";
import { run, renderDoc, soundtrackWav } from "./lib/audio.mjs";

const DIR = path.join(OUT, "gallery");
const LOCAL = path.join(DIR, "atolye.local.html");
fs.mkdirSync(DIR, { recursive: true });

const { episodes } = await loadEpisodes();
const { errors, warnings } = duplicates(episodes);
for (const w of warnings) console.warn(`~ ${w}`);
for (const e of errors) console.error(`✗ ${e}`);

// şablon başına en yeni bölüm
const latest = {};
for (const e of episodes) if (!latest[e.template] || e.id > latest[e.template].id) latest[e.template] = e;
const data = Object.fromEntries(Object.values(latest).map((e) => [e.template, e.data]));
const episodeOf = Object.fromEntries(Object.values(latest).map((e) => [e.template, e.id]));
// sayfaya yalnız gösterilen bölümlerin sesleri (eski bölümler birikince sayfa büyümesin)
const { clips: usedClips } = await loadEpisodes(Object.values(episodeOf));

async function renderPosters(ids) {
  const b = await playwright().chromium.launch({ executablePath: CHROME });
  const pg = await b.newPage({ viewport: { width: 400, height: 700 } });
  await pg.goto(`file://${LOCAL}`);
  await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const out = {};
  for (const id of ids) {
    const dur = await pg.evaluate((id) => {
      try {
        document.getElementById("__p")?.remove();
        const d = document.createElement("div");
        d.id = "__p";
        d.style.cssText = "position:fixed;left:0;top:0;width:360px;height:640px;z-index:9999";
        document.body.appendChild(d);
        return E.mount(d, id).plan.duration;
      } catch (e) {
        return `HATA ${e.message}`;
      }
    }, id);
    if (typeof dur === "string") {
      console.error(`✗ ${id}: ${dur}`);
      process.exitCode = 1;
      continue;
    }
    const jpg = await pg.screenshot({ type: "jpeg", quality: 80, clip: { x: 0, y: 0, width: 360, height: 640 } });
    out[id] = { src: `data:image/jpeg;base64,${jpg.toString("base64")}`, dur: Math.round(dur * 10) / 10 };
  }
  await b.close();
  return out;
}

/** Şablon başına ses dosyası; aynı sayfa (motor + şablon + içerik) önbellekten gelir. Dönüş: şablon → göreli adres. */
async function renderAudio() {
  const cache = path.join(OUT, "cache/audio");
  const outDir = path.join(DIR, "ses");
  fs.mkdirSync(cache, { recursive: true });
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const { clips } = await loadEpisodes(Object.values(episodeOf));
  let b = null;
  const out = {};
  for (const ep of Object.values(latest)) {
    if (!ok.includes(ep.template)) continue;
    const tmp = path.join(OUT, "render", ep.id);
    const html = renderDoc(ep, clips, tmp);
    const hash = crypto.createHash("sha1").update(fs.readFileSync(html)).digest("hex").slice(0, 10);
    const cached = path.join(cache, `${hash}.m4a`);
    if (!fs.existsSync(cached)) {
      b ||= await playwright().chromium.launch({ executablePath: CHROME });
      const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
      await pg.goto(`file://${html}`);
      await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
      const { file } = await soundtrackWav(pg, tmp);
      await pg.close();
      run("ffmpeg", ["-y", "-hide_banner", "-i", file, "-c:a", "aac", "-b:a", "96k", "-ar", "48000", "-movflags", "+faststart", cached]);
    }
    fs.copyFileSync(cached, path.join(outDir, `${ep.template}.m4a`));
    out[ep.template] = `ses/${ep.template}.m4a?v=${hash}`;
  }
  if (b) await b.close();
  return out;
}

const make = (posters, audio = {}) => buildPage("gallery.html", { data: { ...data }, clips: usedClips, templates: Object.keys(data), meta: { POSTERS: posters, AUDIO: audio, EPISODE_OF: episodeOf } });
let { page, ok } = make({});
fs.writeFileSync(LOCAL, localDoc(page));
const posters = process.argv.includes("--no-posters") ? {} : await renderPosters(ok);
const audio = process.argv.includes("--no-audio") ? {} : await renderAudio();
({ page, ok } = make(posters, audio));
fs.writeFileSync(path.join(DIR, "atolye.html"), page);
fs.writeFileSync(LOCAL, localDoc(page));
console.log(`✓ ${ok.length} şablon, ${episodes.length} bölüm, ${Object.keys(usedClips).length} ses, ${(page.length / 1e6).toFixed(2)} MB + ${Object.keys(audio).length} ses dosyası → ${path.relative(process.cwd(), path.join(DIR, "atolye.html"))}`);
if (errors.length) process.exitCode = 1;
if (process.argv.includes("--open")) spawnSync("open", ["-a", "Google Chrome", LOCAL]);

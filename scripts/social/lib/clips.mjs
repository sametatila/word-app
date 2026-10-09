/*
  Defne klipleri: seslendirilen metin → kayıt dosyası (tts-test yayın tablosu `tts-map.json`, anahtar
  "defne|de|<metin>"; bekletmedeki kayıt `tts-hold.json` kullanılmaz). Mac'te ~/Workspace/tts-test/yayin, sunucuda
  TTS_OWN_DIR (/opt/lernomi/tts-own) aynı düzende. Kayıt yoksa üretilmez: Samet'in kararı (2026-10-09) "yalnız Defne";
  eksik metin sunucunun ses bekçisiyle Mac'in günlük üretimine girer (scripts/tts-own-watch.ts).
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { TTS } from "./content.mjs";

let cache = null;
function tables() {
  const mapFile = path.join(TTS, "tts-map.json");
  const mtime = fs.statSync(mapFile).mtimeMs;
  if (!cache || cache.mtime !== mtime) {
    const holdFile = path.join(TTS, "tts-hold.json");
    cache = { mtime, map: JSON.parse(fs.readFileSync(mapFile, "utf8")), hold: fs.existsSync(holdFile) ? JSON.parse(fs.readFileSync(holdFile, "utf8")) : {} };
  }
  return cache;
}

export const clipKey = (text) => `defne|de|${text}`;

/** Kayıt dosyasının yolu ya da null (yok ya da bekletmede). */
export function clipFile(text) {
  const { map, hold } = tables();
  const key = clipKey(text);
  return map[key] && !hold[key] ? path.join(TTS, "m4a", map[key]) : null;
}

/** Sayfaya gömülecek klipler ({ metin: { dur, b64 } }) ve kaydı olmayanlar. */
export function resolveClips(texts) {
  const clips = {};
  const missing = [];
  for (const text of texts) {
    const file = clipFile(text);
    if (!file || !fs.existsSync(file)) {
      missing.push(text);
      continue;
    }
    const dur = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).stdout.toString().trim());
    if (!dur) throw new Error(`süre okunamadı: ${file}`);
    clips[text] = { dur: Math.round(dur * 1000) / 1000, b64: fs.readFileSync(file).toString("base64") };
  }
  return { clips, missing };
}

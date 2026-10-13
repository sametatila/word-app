/*
  Yatay sayfa kurucu: motor + şablon + veri + sesler tek HTML'de. Üretim (uret.mjs, sunucu işçisi) ve yerel
  araçlar (onizle.mjs, denetim) aynı sayfayı kullanır: aynı kod, aynı kare.

  Sesler: TTS_OWN_DIR (sunucu, /opt/lernomi/tts-own) ya da TTS_DIR'deki tts-map.json + m4a/. Mac'te yerel kopya
  eksik (dinleme kayıtları yalnız sunucuda): `--sunucudan` ile gereken dosyalar sunucudan .shots/social/yatay/tts'e
  çekilir (okuma).
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, TPL } from "./icerik.mjs";
import { fontCss, iconUri } from "../lib/page.mjs";

export const SRC = path.join(ROOT, "scripts/social/yatay");
export const OUT = path.join(ROOT, ".shots/social/yatay");
const LOCAL_TTS = path.join(OUT, "tts");
export const ttsDir = () => process.env.TTS_DIR || process.env.TTS_OWN_DIR || LOCAL_TTS;

let table = null;
function tables() {
  const dir = ttsDir();
  const mapFile = path.join(dir, "tts-map.json");
  if (!fs.existsSync(mapFile)) return { dir, map: {}, hold: {} };
  const mtime = fs.statSync(mapFile).mtimeMs;
  if (!table || table.mtime !== mtime || table.dir !== dir) {
    const holdFile = path.join(dir, "tts-hold.json");
    table = { dir, mtime, map: JSON.parse(fs.readFileSync(mapFile, "utf8")), hold: fs.existsSync(holdFile) ? JSON.parse(fs.readFileSync(holdFile, "utf8")) : {} };
  }
  return table;
}
/** Kaydın dosya yolu ya da null (yok ya da bekletmede). */
export function clipPath(key) {
  const { dir, map, hold } = tables();
  return map[key] && !hold[key] ? path.join(dir, "m4a", map[key]) : null;
}

/** Yerel deneme: sunucudaki tabloyu ve bu anahtarların dosyalarını .shots/social/yatay/tts'e çek (yalnız okuma). */
export function pullFromServer(keys) {
  fs.mkdirSync(path.join(LOCAL_TTS, "m4a"), { recursive: true });
  for (const f of ["tts-map.json", "tts-hold.json"]) spawnSync("scp", ["-q", `lernomi:/opt/lernomi/tts-own/${f}`, path.join(LOCAL_TTS, f)], { stdio: "inherit" });
  table = null;
  const { map, hold } = tables();
  const need = keys.map((k) => map[k]).filter((f, i) => f && !hold[keys[i]] && !fs.existsSync(path.join(LOCAL_TTS, "m4a", f)));
  if (need.length) {
    const lst = path.join(OUT, "cek.txt");
    fs.writeFileSync(lst, [...new Set(need)].join("\n") + "\n");
    spawnSync("rsync", ["-a", `--files-from=${lst}`, "lernomi:/opt/lernomi/tts-own/m4a/", path.join(LOCAL_TTS, "m4a") + "/"], { stdio: "inherit" });
  }
}

const durCache = new Map();
function probe(file) {
  if (!durCache.has(file)) durCache.set(file, Math.round(Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).stdout.toString().trim()) * 1000) / 1000);
  return durCache.get(file);
}
/** { anahtar: { dur, b64 } } ve kaydı olmayanlar. b64=false: yalnız süre (denetim). */
export function resolveClips(keys, { b64 = true } = {}) {
  const clips = {};
  const missing = [];
  for (const k of keys) {
    const f = clipPath(k);
    if (!f || !fs.existsSync(f)) {
      missing.push(k);
      continue;
    }
    const dur = probe(f);
    if (!dur) throw new Error(`süre okunamadı: ${f}`);
    clips[k] = b64 ? { dur, b64: fs.readFileSync(f).toString("base64") } : { dur };
  }
  return { clips, missing };
}

const esc = (s) => s.replaceAll("</script", "<\\/script");
/** Motor + şablon betiği (stüdyo da aynısını /api/studio/engine?f=yatay ile alır). */
export function engineSource(templates) {
  return [fs.readFileSync(path.join(SRC, "motor.js"), "utf8"), ...templates.map((t) => fs.readFileSync(path.join(TPL, `${t}.js`), "utf8"))].join("\n");
}

/**
 * Üretim sayfası (1920×1080, kenar boşluğu yok). window.I = Y.mount(...) hazır olunca window.READY. Kapak için
 * window.I.showCover(true).
 */
export function renderPage({ template, data, clips }) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${fontCss()}</style><style>html,body{margin:0;background:#000;overflow:hidden}#host{position:fixed;left:0;top:0;width:1920px;height:1080px}</style></head><body><div id="host"></div>
<script>window.Y={ICON:${JSON.stringify(iconUri())}};window.CLIPS=${esc(JSON.stringify(clips))};window.DATA=${esc(JSON.stringify(data))};window.TEMPLATE=${JSON.stringify(template)};</script>
<script>${esc(engineSource([template]))}</script>
<script>
(async () => {
  try {
    await Promise.all(["800 100px 'Bricolage Grotesque'", "700 100px 'Bricolage Grotesque'", "600 100px 'Bricolage Grotesque'", "500 100px 'Bricolage Grotesque'", "500 100px 'DM Mono'", "400 100px 'DM Mono'"].map((f) => document.fonts.load(f, "ÄÖÜäöüßğışçİ")));
    await Y.decodeEnvelopes();
    window.I = Y.mount(document.getElementById("host"), TEMPLATE, DATA, { scale: false });
    window.READY = true;
  } catch (e) {
    window.FAILED = e.message || String(e);
  }
})();
</script></body></html>`;
}

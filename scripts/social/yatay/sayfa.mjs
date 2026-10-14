/*
  Yatay sayfa kurucu: motor + şablon + veri + sesler tek HTML'de. Üretim (uret.mjs, sunucu işçisi) ve yerel
  araçlar (onizle.mjs, denetim) aynı sayfayı kullanır: aynı kod, aynı kare.

  Sesler: TTS_OWN_DIR (sunucu, /opt/lernomi/tts-own) ya da TTS_DIR'deki tts-map.json + m4a/; anlatıcı (ElevenLabs,
  "ahu") SOCIAL_DIR/ses'te aynı düzenle. Mac'te yerel kopya eksik (dinleme kayıtları yalnız sunucuda): `--sunucudan`
  ile gereken dosyalar sunucudan .shots/social/yatay/{tts,ses}'e çekilir (okuma).
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, TPL } from "./icerik.mjs";
import { fontCss, iconUri } from "../lib/page.mjs";

export const SRC = path.join(ROOT, "scripts/social/yatay");
export const OUT = path.join(ROOT, ".shots/social/yatay");
const LOCAL_TTS = path.join(OUT, "tts");
const LOCAL_SES = path.join(OUT, "ses");
export const ttsDir = () => process.env.TTS_DIR || process.env.TTS_OWN_DIR || LOCAL_TTS;
/** Anlatıcı (ElevenLabs) kayıtları: sunucuda SOCIAL_DIR/ses, yerelde .shots/social/yatay/ses (aynı düzen: tts-map.json + m4a/). */
export const sesDir = () => process.env.SES_DIR || (process.env.TTS_OWN_DIR ? path.join(process.env.SOCIAL_DIR || "/opt/lernomi/social", "ses") : LOCAL_SES);
/** Anlatıcı sesleri (anlatici.mjs ELEVEN ile aynı liste; burada yalnız adlar, döngüsel içe aktarma olmasın). */
export const AUTO_VOICES = new Set(["ahu"]);
const dirOf = (key) => (AUTO_VOICES.has(key.split("|")[0]) ? sesDir() : ttsDir());

const tableCache = new Map();
function tables(dir) {
  const mapFile = path.join(dir, "tts-map.json");
  if (!fs.existsSync(mapFile)) return { dir, map: {}, hold: {} };
  const mtime = fs.statSync(mapFile).mtimeMs;
  const cur = tableCache.get(dir);
  if (cur && cur.mtime === mtime) return cur;
  const holdFile = path.join(dir, "tts-hold.json");
  const t = { dir, mtime, map: JSON.parse(fs.readFileSync(mapFile, "utf8")), hold: fs.existsSync(holdFile) ? JSON.parse(fs.readFileSync(holdFile, "utf8")) : {} };
  tableCache.set(dir, t);
  return t;
}
/** Kaydın dosya yolu ya da null (yok ya da bekletmede). */
export function clipPath(key) {
  const { dir, map, hold } = tables(dirOf(key));
  return map[key] && !hold[key] ? path.join(dir, "m4a", map[key]) : null;
}

/** Yerel deneme: sunucudaki tabloları ve bu anahtarların dosyalarını .shots/social/yatay/{tts,ses}'e çek (yalnız okuma). */
export function pullFromServer(keys) {
  for (const [local, remote, ks] of [
    [LOCAL_TTS, "/opt/lernomi/tts-own", keys.filter((k) => !AUTO_VOICES.has(k.split("|")[0]))],
    [LOCAL_SES, "/opt/lernomi/social/ses", keys.filter((k) => AUTO_VOICES.has(k.split("|")[0]))],
  ]) {
    fs.mkdirSync(path.join(local, "m4a"), { recursive: true });
    for (const f of ["tts-map.json", "tts-hold.json"]) spawnSync("scp", ["-q", `lernomi:${remote}/${f}`, path.join(local, f)], { stdio: "ignore" });
    tableCache.delete(local);
    const { map, hold } = tables(local);
    const need = ks.map((k) => map[k]).filter((f, i) => f && !hold[ks[i]] && !fs.existsSync(path.join(local, "m4a", f)));
    if (need.length) {
      const lst = path.join(OUT, "cek.txt");
      fs.writeFileSync(lst, [...new Set(need)].join("\n") + "\n");
      spawnSync("rsync", ["-a", `--files-from=${lst}`, `lernomi:${remote}/m4a/`, path.join(local, "m4a") + "/"], { stdio: "inherit" });
    }
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
 * window.I.showCover(true). engine: motor + şablon kaynağı (Mac'te üretim sunucunun kodunu kullanır).
 */
export function renderPage({ template, data, clips, engine = null }) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${fontCss()}</style><style>html,body{margin:0;background:#000;overflow:hidden}#host{position:fixed;left:0;top:0;width:1920px;height:1080px}</style></head><body><div id="host"></div>
<script>window.Y={ICON:${JSON.stringify(iconUri())}};window.CLIPS=${esc(JSON.stringify(clips))};window.DATA=${esc(JSON.stringify(data))};window.TEMPLATE=${JSON.stringify(template)};</script>
<script>${esc(engine || engineSource([template]))}</script>
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

#!/usr/bin/env node
/*
  YATAY ANLATICI (ElevenLabs, 2026-10-14; Samet: "gerçekçiliği abartmamalıyız, öğretmen hissi ön planda", ses Ahu).
  Uzun videoların Türkçe anlatımı ElevenLabs Eleven v4 ile; Almanca kelime ve cümleler yine Aras/Defne (uygulamanın sesi).
  Kayıtlar ayrı depoda: SOCIAL_DIR/ses (tts-map.json + m4a/<ses>/<özet>.m4a), uygulamanın ses tablosuna (tts-own) girmez.

  Üretim kendiliğinden: işçi (worker.mjs --once) her koşuda yatay bölümlerin kaydedilmiş metninde kaydı olmayan anlatıcı
  satırlarını üretir (koşu başına en çok MAX_PER_RUN satır). Editör metni değiştirip kaydedince birkaç dakikada gelir;
  Mac talebi yok. Aylık karakter tavanı ELEVENLABS_MONTHLY_CHARS (varsayılan 100 bin; Creator planı 131 bin); her
  istek SOCIAL_DIR/ses/kullanim.jsonl'a yazılır.

  node scripts/social/yatay/anlatici.mjs <bölüm-id> [...] [--dry]   yerelde: depodaki bölümün eksik anlatımı
                                                                      → .shots/social/yatay/ses (deneme, sunucuya gitmez)
  Ortam: ELEVENLABS_API_KEY (yoksa yerelde .secrets/elevenlabs/api).
*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { ROOT } from "./icerik.mjs";
import { sesDir } from "./sayfa.mjs";

/** Anlatıcılar. Ayar: stabilite yüksek (öğretmen gibi sakin, düzenli), stil kapalı; metne ses işareti yazılmaz. */
export const ELEVEN = {
  ahu: { id: "xyqF3vGMQlPk3e7yA4DI", model: "eleven_v4", settings: { stability: 0.7, similarity_boost: 0.8, style: 0, use_speaker_boost: true } },
};
const KEY_RE = /^([a-z]+)\|(tr|de|en)\|(.+)$/s;
const MONTHLY = Number(process.env.ELEVENLABS_MONTHLY_CHARS || 100000);
export const MAX_PER_RUN = 20;

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const f = path.join(ROOT, ".secrets/elevenlabs/api");
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8").trim() : null;
}
const fileOf = (key) => `${key.split("|")[0]}/${crypto.createHash("sha1").update(key).digest("hex").slice(0, 16)}.m4a`;
/** Anlatıcı satırı mı (ses adı ELEVEN'de). */
export const isNarration = (key) => key.split("|")[0] in ELEVEN;

function readMap(dir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, "tts-map.json"), "utf8"));
  } catch {
    return {};
  }
}
function writeMap(dir, map) {
  const tmp = path.join(dir, `tts-map.json.${process.pid}`);
  fs.writeFileSync(tmp, JSON.stringify(map));
  fs.renameSync(tmp, path.join(dir, "tts-map.json"));
}
function usedThisMonth(dir) {
  const month = new Date().toISOString().slice(0, 7);
  try {
    return fs
      .readFileSync(path.join(dir, "kullanim.jsonl"), "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l))
      .filter((r) => r.at.startsWith(month))
      .reduce((s, r) => s + r.chars, 0);
  } catch {
    return 0;
  }
}

async function synth(key, voice, lang, text) {
  // kısa satır (tek kelime) cümle gibi bitsin: model yarım bırakmasın
  const say = /[.!?…:]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`;
  const body = JSON.stringify({ text: say, model_id: voice.model, language_code: lang, voice_settings: voice.settings });
  for (let i = 0; ; i++) {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.id}?output_format=mp3_44100_192`, {
      method: "POST",
      headers: { "xi-api-key": key, "content-type": "application/json", accept: "audio/mpeg" },
      body,
      signal: AbortSignal.timeout(120_000),
    });
    if (res.ok) return { mp3: Buffer.from(await res.arrayBuffer()), chars: say.length };
    const msg = (await res.text()).slice(0, 300);
    if (i < 2 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
      continue;
    }
    throw new Error(`ElevenLabs ${res.status}: ${msg}`);
  }
}

/**
 * Kaydı olmayan anlatıcı satırlarını üret. keys: "ses|dil|metin" (anlatıcı olmayanlar atlanır).
 * → { made, chars, skipped, errors }
 */
export async function generateNarration(keys, { dir = sesDir(), max = MAX_PER_RUN, dry = false, log = console.log } = {}) {
  const out = { made: 0, chars: 0, skipped: 0, errors: [] };
  const todo = [...new Set(keys)].filter(isNarration);
  if (!todo.length) return out;
  fs.mkdirSync(path.join(dir, "m4a"), { recursive: true });
  let map = readMap(dir);
  const missing = todo.filter((k) => !map[k] || !fs.existsSync(path.join(dir, "m4a", map[k])));
  if (!missing.length) return out;
  if (dry) {
    for (const k of missing) log(`  üretilecek: ${k}`);
    out.skipped = missing.length;
    return out;
  }
  const key = apiKey();
  if (!key) throw new Error("ELEVENLABS_API_KEY yok");
  let used = usedThisMonth(dir);
  for (const k of missing.slice(0, max)) {
    const [, v, lang, text] = k.match(KEY_RE) || [];
    if (!v || k.includes("#")) {
      out.errors.push(`anlatıcı satırı tür taşımaz: ${k}`);
      continue;
    }
    if (used + text.length > MONTHLY) {
      out.errors.push(`aylık karakter tavanı (${MONTHLY}) doldu: ${used} kullanıldı`);
      break;
    }
    try {
      const { mp3, chars } = await synth(key, ELEVEN[v], lang, text);
      const rel = fileOf(k);
      const dst = path.join(dir, "m4a", rel);
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      const tmp = path.join(dir, `.${process.pid}.mp3`);
      fs.writeFileSync(tmp, mp3);
      // ses düzeyi uygulamanın kayıtlarıyla aynı (Aras/Defne ~−16 LUFS; ElevenLabs ~−25 geliyor, videoda sesler sıçramasın)
      const ff = spawnSync("ffmpeg", ["-nostdin", "-v", "error", "-y", "-i", tmp, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", "-c:a", "aac", "-b:a", "160k", "-f", "mp4", `${dst}.yeni`]);
      fs.rmSync(tmp, { force: true });
      if (ff.status !== 0) throw new Error(`ffmpeg: ${ff.stderr.toString().slice(0, 200)}`);
      fs.renameSync(`${dst}.yeni`, dst);
      map = readMap(dir);
      map[k] = rel;
      writeMap(dir, map);
      fs.appendFileSync(path.join(dir, "kullanim.jsonl"), JSON.stringify({ at: new Date().toISOString(), voice: v, chars, key: k.slice(0, 120) }) + "\n");
      used += chars;
      out.made++;
      out.chars += chars;
    } catch (e) {
      out.errors.push(`${k.slice(0, 80)}: ${e.message}`);
      if (/40[13]|quota|credits/i.test(e.message)) break;
    }
  }
  out.skipped = Math.max(0, missing.length - out.made - out.errors.length);
  if (out.made) log(`anlatıcı: ${out.made} kayıt, ${out.chars} karakter (bu ay ${used}/${MONTHLY})${out.skipped ? `, ${out.skipped} sonraki koşuya` : ""}`);
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadLong } = await import("./icerik.mjs");
  const ids = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const eps = await loadLong(ids.length ? ids : undefined);
  const keys = eps.flatMap((e) => e.spoken);
  let total = { made: 0, chars: 0 };
  for (;;) {
    const r = await generateNarration(keys, { dry: process.argv.includes("--dry"), max: 200 });
    for (const e of r.errors) console.error(`✗ ${e}`);
    total = { made: total.made + r.made, chars: total.chars + r.chars };
    if (!r.made || r.errors.length || !r.skipped) break;
  }
  console.log(`toplam ${total.made} kayıt, ${total.chars} karakter → ${sesDir()}`);
}

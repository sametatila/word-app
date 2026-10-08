/**
 * Yürüyüş modu, ekran kapalı dinleme: sabit 3 sn pencere ↔ cihazda VAD — ölçüm.
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/walk-vad-eval.ts <çalışma dizini> [--azure] [--wav]
 *
 * Sahneler sentetik (gerçek kullanıcı sesi YOK): macOS `say` ile kelime (Almanca/İngilizce
 * sesler, Türkçe sesle okunan = kaba aksan), mikrofon açılış sesi ("micon", iOS
 * `sfxNotes` ile aynı), farklı başlama anları ve koşullar (temiz, yürüyüş, rüzgâr, trafik,
 * cep, kısık ses) + yalnız gürültü. Bugün: kaydın ilk 3 sn'si gönderiliyor. VAD:
 * `scripts/lib/walk-vad.ts`. `--azure` iki klibi de üretimdeki Azure yolundan geçirir
 * (telaffuz değerlendirmesi, kabul edilmezse düz tanıma) ve sonuçları önbelleğe yazar.
 */
import "dotenv/config";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { sttProviders } from "../src/lib/chat-providers";
import { paAccepted, type PaWord } from "../src/lib/stt";
import { runVad, WALK_VAD, type VadParams } from "./lib/walk-vad";

const RATE = 16_000;
const SCENE_S = 10;
const TODAY_S = 3;

// ---------- deterministik rastgele ----------
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- ses üretimi ----------
const db = (x: number) => Math.pow(10, x / 20);
const rms = (x: Float64Array, a = 0, b = x.length) => {
  let s = 0;
  for (let i = a; i < b; i++) s += x[i] * x[i];
  return Math.sqrt(s / Math.max(1, b - a));
};
function scaleTo(x: Float64Array, dbfs: number) {
  const r = rms(x) || 1e-9;
  const k = db(dbfs) / r;
  for (let i = 0; i < x.length; i++) x[i] *= k;
  return x;
}
function lowpass(x: Float64Array, fc: number) {
  const a = Math.exp((-2 * Math.PI * fc) / RATE);
  let y = 0;
  for (let i = 0; i < x.length; i++) { y = (1 - a) * x[i] + a * y; x[i] = y; }
  // ikinci kutup: daha dik
  y = 0;
  for (let i = 0; i < x.length; i++) { y = (1 - a) * x[i] + a * y; x[i] = y; }
  return x;
}
function white(n: number, r: () => number) {
  const x = new Float64Array(n);
  for (let i = 0; i < n; i++) x[i] = r() * 2 - 1;
  return x;
}
function pink(n: number, r: () => number) {
  const x = new Float64Array(n);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < n; i++) {
    const w = r() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
    b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
    x[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362; b6 = w * 0.115926;
  }
  return x;
}
function brown(n: number, r: () => number) {
  const x = new Float64Array(n);
  let y = 0;
  for (let i = 0; i < n; i++) { y = (y + 0.02 * (r() * 2 - 1)) / 1.02; x[i] = y; }
  return x;
}

/** iOS `sfxNotes("micon")` + `renderWav` (kare dalga, 2400 Hz alçak geçiren, üstel sönüm). */
function micon(): Float64Array {
  const notes = [
    [523.25, 0.0, 0.17, 0.05, 2, 2400], [523.25, 0.0, 0.2, 0.16, 0, 0],
    [783.99, 0.06, 0.17, 0.05, 2, 2400], [783.99, 0.06, 0.2, 0.16, 0, 0],
  ];
  const n = Math.round(0.32 * RATE);
  const out = new Float64Array(n);
  for (const [f, st, dur, peak, wave, lp] of notes) {
    const len = Math.round(dur * RATE);
    const raw = new Float64Array(len);
    let ph = 0;
    for (let i = 0; i < len; i++) { ph += (2 * Math.PI * f) / RATE; raw[i] = wave === 2 ? (Math.sin(ph) >= 0 ? 1 : -1) : Math.sin(ph); }
    if (lp) lowpass(raw, lp);
    const s0 = Math.round(st * RATE);
    for (let i = 0; i < len; i++) {
      const t = i / RATE;
      const env = t < 0.004 ? 0.0001 * Math.pow(peak / 0.0001, t / 0.004) : peak * Math.pow(0.0001 / peak, (t - 0.004) / (dur - 0.004));
      if (s0 + i < n) out[s0 + i] += raw[i] * env * 0.8;
    }
  }
  return out;
}

const VOICES: Record<"de" | "en", string[]> = {
  de: ["Anna (Almanca (Almanya))", "Eddy (Almanca (Almanya))", "Flo (Almanca (Almanya))", "Reed (Almanca (Almanya))", "Sandy (Almanca (Almanya))", "Grandpa (Almanca (Almanya))", "Yelda (Türkçe (Türkiye))"],
  en: ["Samantha", "Daniel", "Flo (İngilizce (ABD))", "Yelda (Türkçe (Türkiye))"],
};

function sayPcm(dir: string, voice: string, text: string): Float64Array {
  const key = createHash("sha1").update(`${voice}\0${text}`).digest("hex").slice(0, 12);
  const raw = join(dir, "say", `${key}.raw`);
  if (!existsSync(raw)) {
    mkdirSync(join(dir, "say"), { recursive: true });
    const aiff = join(dir, "say", `${key}.aiff`);
    execFileSync("say", ["-v", voice, "-o", aiff, text]);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", aiff, "-ac", "1", "-ar", String(RATE), "-f", "s16le", raw]);
  }
  const b = readFileSync(raw);
  const x = new Float64Array(b.length / 2);
  for (let i = 0; i < x.length; i++) x[i] = b.readInt16LE(i * 2) / 32768;
  // say başında/sonunda sessizlik: gerçek konuşma sınırları (tepe − 40 dB)
  const fr = 320;
  let peak = 0;
  const es: number[] = [];
  for (let a = 0; a + fr <= x.length; a += fr) { const e = rms(x, a, a + fr); es.push(e); peak = Math.max(peak, e); }
  const thr = peak * db(-40);
  const first = es.findIndex((e) => e > thr);
  let last = es.length - 1;
  while (last > 0 && es[last] <= thr) last--;
  return x.slice(Math.max(0, first * fr), Math.min(x.length, (last + 1) * fr));
}

type Cond = "temiz" | "yuruyus" | "ruzgar" | "trafik" | "cep" | "kisik";
const CONDS: Cond[] = ["temiz", "yuruyus", "ruzgar", "trafik", "cep", "kisik"];

function noiseBed(cond: Cond, r: () => number): Float64Array {
  const n = SCENE_S * RATE;
  const bed = scaleTo(white(n, r), -72); // mikrofon öz gürültüsü
  const add = (x: Float64Array) => { for (let i = 0; i < n; i++) bed[i] += x[i]; };
  if (cond === "yuruyus" || cond === "cep") {
    add(scaleTo(pink(n, r), cond === "cep" ? -54 : -48));
    // adımlar: ~0,55 sn'de bir gümleme + tık
    const step = Math.round(0.55 * RATE);
    const x = new Float64Array(n);
    for (let s = Math.round(r() * step); s < n; s += step + Math.round((r() - 0.5) * 0.06 * RATE)) {
      for (let i = 0; i < 0.12 * RATE && s + i < n; i++) {
        const t = i / RATE;
        x[s + i] += Math.sin(2 * Math.PI * 70 * t) * Math.exp(-t * 35) * db(cond === "cep" ? -24 : -30);
        if (i < 40) x[s + i] += (r() * 2 - 1) * db(-36) * (1 - i / 40);
      }
    }
    add(x);
    if (cond === "cep") {
      // kumaş hışırtısı: rastgele kısa gürültü patlamaları
      const y = new Float64Array(n);
      for (let k = 0; k < 6; k++) {
        const s = Math.round(r() * (n - 0.3 * RATE)), len = Math.round((0.08 + r() * 0.2) * RATE);
        const w = lowpass(white(len, r), 3000);
        const g = db(-34 - r() * 8) / (rms(w) || 1);
        for (let i = 0; i < len; i++) y[s + i] += w[i] * g * Math.sin((Math.PI * i) / len);
      }
      add(y);
    }
  }
  if (cond === "ruzgar") {
    const w = scaleTo(brown(n, r), -30);
    for (let i = 0; i < n; i++) w[i] *= 0.6 + 0.4 * Math.sin((2 * Math.PI * 0.35 * i) / RATE + 1.3); // savrulma
    add(w);
    add(scaleTo(lowpass(white(n, r), 900), -50));
  }
  if (cond === "trafik") {
    add(scaleTo(lowpass(pink(n, r), 1500), -42));
    const pass = scaleTo(lowpass(pink(n, r), 800), -32);
    const c = r() * SCENE_S;
    for (let i = 0; i < n; i++) { const t = i / RATE; pass[i] *= Math.exp(-((t - c) ** 2) / 1.2); }
    add(pass);
  }
  if (cond === "kisik") add(scaleTo(pink(n, r), -56));
  return bed;
}

type Scene = {
  id: string; lang: "de" | "en"; expected: string; voice: string; cond: Cond; onset: number;
  pcm: Int16Array; speech: [number, number] | null;
};

const PHRASES: [("de" | "en"), string][] = [
  ["de", "der Tisch"], ["de", "die Luft"], ["de", "das Fenster"], ["de", "die Führung"], ["de", "sonst"],
  ["de", "mir"], ["de", "der Großvater"], ["de", "sich freuen"], ["de", "die Haltestelle"], ["de", "das Brötchen"],
  ["de", "der Schlüssel"], ["de", "die Rechnung"], ["de", "pünktlich"], ["de", "vielleicht"], ["de", "die Wohnung"],
  ["de", "der Bahnhof"], ["de", "das Gepäck"], ["de", "eintreten"], ["de", "die Erfahrung"], ["de", "gestern"],
  ["de", "zwanzig"], ["de", "der Fahrschein"], ["de", "die Ausbildung"], ["de", "kündigen"], ["de", "der Termin"],
  ["de", "die Krankenkasse"], ["de", "acht"], ["de", "der Kopf"], ["de", "die Bewerbung"], ["de", "das Gehalt"],
  ["en", "the window"], ["en", "to borrow"], ["en", "the appointment"], ["en", "eight"], ["en", "the receipt"],
  ["en", "to apply"], ["en", "though"], ["en", "the key"], ["en", "pretty"], ["en", "the neighbourhood"],
];
const ONSETS = [0.35, 0.7, 1.1, 1.6, 2.3];

function buildScenes(dir: string): Scene[] {
  const r = rng(20261008);
  const out: Scene[] = [];
  const chirp = micon();
  const make = (id: string, lang: "de" | "en", expected: string, voice: string, cond: Cond, onset: number, speech: Float64Array | null) => {
    const bed = noiseBed(cond, r);
    for (let i = 0; i < chirp.length; i++) bed[i] += chirp[i] * db(-6); // hoparlörden mikrofona sızan
    let span: [number, number] | null = null;
    if (speech) {
      const s = Float64Array.from(speech);
      if (cond === "cep") { lowpass(s, 2200); scaleTo(s, -32); }
      else scaleTo(s, cond === "kisik" ? -42 : -24);
      const s0 = Math.round(onset * RATE);
      for (let i = 0; i < s.length && s0 + i < bed.length; i++) bed[s0 + i] += s[i];
      span = [s0, s0 + s.length];
    }
    const pcm = new Int16Array(bed.length);
    for (let i = 0; i < bed.length; i++) pcm[i] = Math.max(-32768, Math.min(32767, Math.round(bed[i] * 32767)));
    out.push({ id, lang, expected, voice, cond, onset, pcm, speech: span });
  };
  PHRASES.forEach(([lang, text], pi) => {
    for (let k = 0; k < 3; k++) {
      const cond = CONDS[(pi * 3 + k) % CONDS.length];
      const voices = VOICES[lang];
      const voice = voices[(pi + k * 3) % voices.length];
      const onset = ONSETS[(pi * 2 + k) % ONSETS.length];
      make(`${lang}-${pi}-${k}`, lang, text, voice, cond, onset, sayPcm(dir, voice, text));
    }
  });
  CONDS.forEach((cond) => { for (let k = 0; k < 3; k++) make(`bos-${cond}-${k}`, "de", "", "-", cond, 0, null); });
  return out;
}

// ---------- WAV ve Azure ----------
function wav(pcm: Int16Array): Buffer {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length * 2, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length * 2, 40);
  return Buffer.concat([h, Buffer.from(pcm.buffer, pcm.byteOffset, pcm.length * 2)]);
}

type AzureJson = { RecognitionStatus?: string; NBest?: { Lexical?: string; AccuracyScore?: number; Words?: PaWord[] }[] };
type AzureOut = { pa: AzureJson; plain?: AzureJson; billed: number };
const LOCALE: Record<string, string> = { de: "de-DE", en: "en-US" };

async function azureCall(audio: Buffer, lang: string, ref?: string): Promise<AzureJson> {
  const p = sttProviders().find((x) => x.name === "azure");
  if (!p) throw new Error("azure yapılandırılmamış (AZURE_SPEECH_KEY)");
  const q = new URLSearchParams({ language: LOCALE[lang], format: "detailed", profanity: "masked" });
  const headers: Record<string, string> = { "Ocp-Apim-Subscription-Key": p.key, "content-type": "audio/wav; codecs=audio/pcm; samplerate=16000", accept: "application/json" };
  if (ref) headers["Pronunciation-Assessment"] = Buffer.from(JSON.stringify({ ReferenceText: ref, GradingSystem: "HundredMark", Granularity: "Word", Dimension: "Comprehensive", EnableMiscue: true })).toString("base64");
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${p.baseUrl}/speech/recognition/conversation/cognitiveservices/v1?${q}`, { method: "POST", headers, body: new Uint8Array(audio) });
    if (res.status === 429 && attempt < 6) { await new Promise((ok) => setTimeout(ok, 3000)); continue; }
    if (!res.ok) throw new Error(`azure ${res.status} ${(await res.text()).slice(0, 100)}`);
    return (await res.json()) as AzureJson;
  }
}

/** Üretimdeki `lib/stt` `azure()` akışı: PA, kabul yoksa ve konuşma varsa düz tanıma. */
async function azureLikeProd(dir: string, audio: Buffer, lang: string, ref: string): Promise<AzureOut> {
  const key = createHash("sha1").update(audio).update(`\0${lang}\0${ref}`).digest("hex");
  const cache = join(dir, "azure", `${key}.json`);
  if (existsSync(cache)) return JSON.parse(readFileSync(cache, "utf8")) as AzureOut;
  const secs = (audio.length - 44) / 32000;
  const pa = await azureCall(audio, lang, ref);
  let out: AzureOut = { pa, billed: secs };
  const accepted = pa.RecognitionStatus === "Success" && paAccepted(pa.NBest?.[0]?.Words, lang);
  const silent = ["NoMatch", "InitialSilenceTimeout", "BabbleTimeout"].includes(pa.RecognitionStatus ?? "");
  if (!accepted && !silent) out = { pa, plain: await azureCall(audio, lang), billed: secs * 2 };
  mkdirSync(join(dir, "azure"), { recursive: true });
  writeFileSync(cache, JSON.stringify(out));
  return out;
}

const ARTICLES = new Set(["der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "the", "a", "an", "to", "sich"]);
const fold = (t: string) => t.toLocaleLowerCase("de-DE").replace(/ß/g, "ss").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").split(/[^a-z0-9]+/).filter(Boolean);
const NUM: Record<string, string> = { "20": "zwanzig", "8": "acht" };
function heardOk(heard: string, expected: string) {
  const h = new Set(fold(heard).map((w) => NUM[w] ?? w));
  const want = fold(expected).filter((w) => !ARTICLES.has(w));
  return want.length > 0 && want.every((w) => h.has(w) || (w === "eight" && h.has("8")));
}
/** Kullanıcının duyduğu karar: PA kabul ya da düz tanıma metni hedefe uyuyor. */
function verdict(o: AzureOut | null, lang: string, expected: string): { ok: boolean; heard: string } {
  if (!o) return { ok: false, heard: "" };
  if (o.pa.RecognitionStatus === "Success" && paAccepted(o.pa.NBest?.[0]?.Words, lang)) return { ok: true, heard: expected };
  const heard = (o.plain?.NBest?.[0]?.Lexical ?? "").trim();
  return { ok: !!expected && heardOk(heard, expected), heard };
}

// ---------- koşu ----------
type Row = {
  s: Scene; vad: ReturnType<typeof runVad>; todayClip: Int16Array; vadClip: Int16Array | null;
  clipped: { start: boolean; end: boolean } | null; todayCut: boolean;
};

function analyse(scenes: Scene[], p: VadParams): Row[] {
  return scenes.map((s) => {
    const vad = runVad(s.pcm, p);
    const todayClip = s.pcm.subarray(0, TODAY_S * RATE);
    const vadClip = vad.kind === "none" ? null : s.pcm.subarray(vad.start, vad.end);
    let clipped: Row["clipped"] = null;
    if (s.speech && vad.kind !== "none") clipped = { start: vad.start > s.speech[0] + 160, end: vad.end < s.speech[1] - 480 };
    const todayCut = !!s.speech && s.speech[1] > TODAY_S * RATE;
    return { s, vad, todayClip, vadClip, clipped, todayCut };
  });
}

const span = (x: [number, number] | null) => (x ? `${(x[0] / RATE).toFixed(2)}–${(x[1] / RATE).toFixed(2)}` : "-");
const pct = (a: number, b: number) => `${a}/${b}`;
const med = (xs: number[]) => { const v = [...xs].sort((a, b) => a - b); return v.length ? v[Math.floor(v.length / 2)] : NaN; };

function offlineReport(rows: Row[]) {
  const speech = rows.filter((r) => r.s.speech);
  const empty = rows.filter((r) => !r.s.speech);
  console.log(`\nSahne: ${speech.length} konuşmalı, ${empty.length} yalnız gürültü. VAD ezilen: ${process.env.VAD ?? "yok (referans)"}`);
  console.log("\nKoşul      | algılandı | yedek | kaçtı | baş kırpık | son kırpık | bugün 3 sn'de kesik | gönderilen sn (bugün → VAD) | karar anı medyan (bugün 3,0)");
  for (const c of CONDS) {
    const rs = speech.filter((r) => r.s.cond === c);
    const sp = rs.filter((r) => r.vad.kind === "speech").length, fb = rs.filter((r) => r.vad.kind === "fallback").length;
    const none = rs.filter((r) => r.vad.kind === "none").length;
    const cs = rs.filter((r) => r.clipped?.start).length, ce = rs.filter((r) => r.clipped?.end).length;
    const cut = rs.filter((r) => r.todayCut).length;
    const vsec = rs.reduce((a, r) => a + (r.vadClip?.length ?? 0) / RATE, 0) / rs.length;
    const stop = med(rs.map((r) => r.vad.stop / RATE));
    console.log(`${c.padEnd(10)} | ${pct(sp, rs.length).padEnd(9)} | ${String(fb).padEnd(5)} | ${String(none).padEnd(5)} | ${String(cs).padEnd(10)} | ${String(ce).padEnd(10)} | ${String(cut).padEnd(19)} | 3,00 → ${vsec.toFixed(2).padEnd(19)} | ${stop.toFixed(2)}`);
  }
  console.log("\nYalnız gürültü (konuşma yok): koşul → VAD kararı (gönderilen sn)");
  for (const r of empty) console.log(`  ${r.s.id.padEnd(16)} ${r.vad.kind}${r.vadClip ? ` (${(r.vadClip.length / RATE).toFixed(2)} sn)` : ""}`);
  const bad = speech.filter((r) => r.vad.kind === "none" || r.clipped?.start || r.clipped?.end);
  if (bad.length) {
    console.log("\nSorunlu konuşmalı sahneler:");
    for (const r of bad) {
      const sp = r.s.speech!;
      console.log(`  ${r.s.id.padEnd(9)} ${r.s.cond.padEnd(8)} "${r.s.expected}" ${r.s.voice.split(" ")[0]} konuşma ${(sp[0] / RATE).toFixed(2)}–${(sp[1] / RATE).toFixed(2)} → ${r.vad.kind} ${(r.vad.start / RATE).toFixed(2)}–${(r.vad.end / RATE).toFixed(2)}`);
    }
  }
  const after = speech.filter((r) => r.vad.kind === "speech").map((r) => (r.vad.stop - r.s.speech![1]) / RATE);
  console.log(`\nKonuşma bitiminden kaydın durmasına: medyan ${med(after).toFixed(2)} sn`);
}

async function azureReport(dir: string, rows: Row[]) {
  type R = { row: Row; today: { ok: boolean; heard: string }; vad: { ok: boolean; heard: string }; tSec: number; vSec: number; paLex?: string; plainLex?: string };
  const res: R[] = [];
  let n = 0;
  for (const row of rows) {
    const { s } = row;
    const t = await azureLikeProd(dir, wav(row.todayClip), s.lang, s.expected);
    const v = row.vadClip ? await azureLikeProd(dir, wav(row.vadClip), s.lang, s.expected) : null;
    res.push({
      row,
      today: verdict(t, s.lang, s.expected),
      vad: verdict(v, s.lang, s.expected),
      tSec: t.billed,
      vSec: v?.billed ?? 0,
      paLex: t.plain ? t.pa.NBest?.[0]?.Lexical : undefined,
      plainLex: t.plain?.NBest?.[0]?.Lexical,
    });
    if (++n % 20 === 0) console.log(`  … ${n}/${rows.length}`);
  }
  const speech = res.filter((r) => r.row.s.speech);
  const empty = res.filter((r) => !r.row.s.speech);
  console.log("\nAzure — doğru kabul (bugün → VAD) ve gönderilen ses");
  console.log("Koşul      | bugün | VAD  | sn bugün → VAD");
  for (const c of CONDS) {
    const rs = speech.filter((r) => r.row.s.cond === c);
    const a = rs.filter((r) => r.today.ok).length, b = rs.filter((r) => r.vad.ok).length;
    const ts = rs.reduce((x, r) => x + r.tSec, 0), vs = rs.reduce((x, r) => x + r.vSec, 0);
    console.log(`${c.padEnd(10)} | ${pct(a, rs.length).padEnd(5)} | ${pct(b, rs.length).padEnd(4)} | ${ts.toFixed(0)} → ${vs.toFixed(0)}`);
  }
  const early = speech.filter((r) => r.row.s.onset <= 1.6);
  const tot = (xs: R[], k: "tSec" | "vSec") => xs.reduce((x, r) => x + r[k], 0);
  console.log(`TOPLAM     | ${pct(speech.filter((r) => r.today.ok).length, speech.length)} | ${pct(speech.filter((r) => r.vad.ok).length, speech.length)} | ${tot(speech, "tSec").toFixed(0)} → ${tot(speech, "vSec").toFixed(0)} sn`);
  console.log(`Başlama ≤ 1,6 sn | bugün ${pct(early.filter((r) => r.today.ok).length, early.length)}  VAD ${pct(early.filter((r) => r.vad.ok).length, early.length)}`);
  console.log(`Yalnız gürültü | gönderilen sn bugün ${tot(empty, "tSec").toFixed(0)} → VAD ${tot(empty, "vSec").toFixed(0)}; uydurma (boş olmayan metin) bugün ${empty.filter((r) => r.today.heard).length}, VAD ${empty.filter((r) => r.vad.heard).length}`);
  console.log(`Genel toplam gönderilen: ${tot(res, "tSec").toFixed(0)} → ${tot(res, "vSec").toFixed(0)} sn (−%${Math.round((1 - tot(res, "vSec") / tot(res, "tSec")) * 100)})`);

  console.log("\nFarklı sonuçlanan sahneler (bugün / VAD):");
  for (const r of speech.filter((x) => x.today.ok !== x.vad.ok)) {
    console.log(`  ${r.row.s.id.padEnd(9)} ${r.row.s.cond.padEnd(8)} başlama ${r.row.s.onset} "${r.row.s.expected}" ${r.row.s.voice.split(" ")[0]}: bugün ${r.today.ok ? "✓" : `✗ "${r.today.heard}"`} / VAD ${r.vad.ok ? "✓" : `✗ "${r.vad.heard}" (${r.row.vad.kind})`}  konuşma ${span(r.row.s.speech)} klip ${span([r.row.vad.start, r.row.vad.end])}`);
  }

  // İkinci istek gerekli mi: PA yanıtının Lexical'i düz tanımanın yerini tutar mı?
  const pairs = res.filter((r) => r.plainLex !== undefined);
  const same = pairs.filter((r) => fold(r.paLex ?? "").join(" ") === fold(r.plainLex ?? "").join(" "));
  console.log(`\nİkinci istek (bugünkü kliplerde, PA kabul etmeyince): ${pairs.length} çift; PA Lexical = düz tanıma ${same.length}/${pairs.length}`);
  for (const r of pairs.filter((x) => !same.includes(x)).slice(0, 25)) console.log(`  "${r.row.s.expected || "(gürültü)"}": PA "${r.paLex ?? ""}" | düz "${r.plainLex ?? ""}"`);
}

async function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error("çalışma dizini ver");
  mkdirSync(dir, { recursive: true });
  const scenes = buildScenes(dir);
  /* Ayar denemesi: VAD='{"preRollMs":500}' gibi bir JSON, referans değerleri ezer. */
  const params: VadParams = { ...WALK_VAD, ...(process.env.VAD ? (JSON.parse(process.env.VAD) as Partial<VadParams>) : {}) };
  const rows = analyse(scenes, params);
  offlineReport(rows);
  if (process.argv.includes("--wav")) {
    mkdirSync(join(dir, "wav"), { recursive: true });
    for (const r of rows) {
      writeFileSync(join(dir, "wav", `${r.s.id}-sahne.wav`), wav(r.s.pcm.subarray(0, 6 * RATE)));
      if (r.vadClip) writeFileSync(join(dir, "wav", `${r.s.id}-vad.wav`), wav(r.vadClip));
    }
  }
  if (process.argv.includes("--azure")) await azureReport(dir, rows);
}

main().catch((e) => { console.error(e); process.exit(1); });

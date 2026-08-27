/**
 * Konuşma bölgesi bulucunun birim testi: npm run test:vad
 *
 * Sentetik 16 kHz ses: sessizlik / gürültü + kelimeyi taklit eden ton
 * demeti + sessizlik. Ölçütler, üretimde sayılan şeyler — kesilen parça
 * konuşmayı paylarıyla kapsıyor mu, pencerenin gerisi atılıyor mu, hiç
 * konuşma yoksa istek atılmıyor mu, kısa tık konuşma sayılmıyor mu.
 */
import assert from "node:assert/strict";
import { findSpeech, trimSpeech } from "../src/lib/vad";

const SR = 16_000;
const ms = (n: number) => Math.round((SR * n) / 1000);

/** Tekrarlanabilir gürültü (LCG) — testin her koşusu aynı. */
function noise(n: number, dbfs: number, seed = 7): Float32Array {
  const a = Math.pow(10, dbfs / 20);
  const out = new Float32Array(n);
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    out[i] = a * ((s / 0xffffffff) * 2 - 1) * 1.7;
  }
  return out;
}

/** Kelime taklidi: 220 Hz taşıyıcı + harmonikler, kısa girişli/çıkışlı zarf. */
function voice(durMs: number, dbfs = -20): Float32Array {
  const n = ms(durMs);
  const a = Math.pow(10, dbfs / 20);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, i / ms(30), (n - i) / ms(60));
    out[i] = a * env * (Math.sin(2 * Math.PI * 220 * t) + 0.5 * Math.sin(2 * Math.PI * 440 * t) + 0.25 * Math.sin(2 * Math.PI * 880 * t));
  }
  return out;
}

function concat(...parts: Float32Array[]): Float32Array {
  const out = new Float32Array(parts.reduce((s, p) => s + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

function mix(a: Float32Array, b: Float32Array): Float32Array {
  const out = Float32Array.from(a);
  for (let i = 0; i < out.length && i < b.length; i++) out[i] += b[i];
  return out;
}

// 1) Sessizlik + kelime + sessizlik: bölge kelimeyi paylarıyla kapsıyor, pencerenin gerisi atılıyor.
{
  const pre = ms(1500);
  const word = voice(600);
  const pcm = concat(new Float32Array(pre), word, new Float32Array(ms(2500)));
  const span = findSpeech(pcm, SR);
  assert.ok(span, "kelime bulunmalı");
  assert.ok(span.start <= pre && span.start >= pre - ms(300), `başlangıç payı: ${span.start} ~ ${pre}`);
  assert.ok(span.end >= pre + word.length && span.end <= pre + word.length + ms(350), `bitiş payı: ${span.end}`);
  const cut = trimSpeech(pcm, SR)!;
  assert.ok(cut.pcm.length < ms(1400), `kesik parça kısa olmalı: ${cut.pcm.length / SR} sn`);
  assert.ok(span.speechMs >= 500 && span.speechMs <= 700, `konuşma süresi: ${span.speechMs}`);
}

// 2) Gürültülü pencere (sokak, −38 dBFS): aynı kelime yine bulunuyor.
{
  const pre = ms(1500);
  const word = voice(600);
  const clean = concat(new Float32Array(pre), word, new Float32Array(ms(2500)));
  const pcm = mix(clean, noise(clean.length, -38));
  const span = findSpeech(pcm, SR);
  assert.ok(span, "gürültüde kelime bulunmalı");
  assert.ok(Math.abs(span.start - (pre - ms(250))) <= ms(120), `gürültüde başlangıç: ${span.start}`);
  assert.ok(span.floorDb > -45 && span.floorDb < -30, `taban gürültüyü ölçmeli: ${span.floorDb.toFixed(1)} dB`);
}

// 3) Yalnız gürültü ya da yalnız sessizlik: bölge YOK → istek atılmaz.
{
  assert.equal(findSpeech(noise(ms(6000), -38), SR), null, "düz gürültü konuşma değil");
  assert.equal(findSpeech(new Float32Array(ms(6000)), SR), null, "sessizlik konuşma değil");
  assert.equal(findSpeech(noise(ms(6000), -60), SR), null, "çok sessiz oda da konuşma değil");
}

// 4) Kısa tık (60 ms) konuşma sayılmıyor; iki parçalı kelime ("der … Kühlschrank") tek bölge.
{
  const click = concat(new Float32Array(ms(1000)), voice(60, -15), new Float32Array(ms(2000)));
  assert.equal(findSpeech(click, SR), null, "60 ms'lik tık konuşma değil");

  const two = concat(new Float32Array(ms(1000)), voice(200), new Float32Array(ms(200)), voice(500), new Float32Array(ms(2000)));
  const span = findSpeech(two, SR)!;
  assert.ok(span, "iki parçalı kelime bulunmalı");
  assert.ok(span.speechMs >= 850 && span.speechMs <= 950, `iki parça birleşmeli: ${span.speechMs} ms`);
}

// 5) Üst sınır: çok uzun konuşma 4 sn'de kesiliyor.
{
  const long = concat(new Float32Array(ms(500)), voice(6000), new Float32Array(ms(500)));
  const cut = trimSpeech(long, SR)!;
  assert.ok(cut.pcm.length <= ms(4000) + 1, `üst sınır: ${cut.pcm.length / SR} sn`);
}

console.log("test:vad — kelime/gürültü/sessizlik/tık/birleşme/üst sınır: tamam");

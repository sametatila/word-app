/*
  Vitrin videosunun müziği: bu betikte sıfırdan sentezleniyor (örnek ya da hazır
  parça yok), yani telif ve atıf sorunu yok. 120 BPM, bir ölçü 2 saniye; kurgu
  (video.mjs) sahneleri ölçü sınırına koyduğu için kesmeler vuruşa oturur.

  node scripts/store/video/music.mjs <promo|preview> <çıktı.wav>

  Düzen ölçü ölçü `ARRANGEMENTS`ta: hangi ölçüde hangi katman çalıyor, nerede
  yükselen geçiş (riser) ve vuruş (impact) var. Akor yürüyüşü Re majör
  I–V–vi–IV (D A Bm G), her ölçüde bir akor.
*/

import fs from "node:fs";

const SR = 48000;
const BPM = 120;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
const CHORDS = [
  { root: 38, pad: [62, 66, 69, 74], arp: [74, 78, 81, 86] }, // D
  { root: 33, pad: [61, 64, 69, 73], arp: [73, 76, 81, 85] }, // A
  { root: 35, pad: [62, 66, 71, 74], arp: [74, 78, 83, 86] }, // Bm
  { root: 31, pad: [62, 67, 71, 74], arp: [74, 79, 83, 86] }, // G
];

/* Katmanlar: k kick, c clap, h hat (sekizlik arası), h16 on altılık hat,
   b bas, p pad, a arpej, ao arpej oktav üstü, lp pad filtresi (0–1),
   r ölçü sonunda yükselen geçiş, i ölçü başında vuruş, roll son iki vuruşta
   trampet sıklaşması, end son akor (davul yok, uzun kuyruk). */
const FULL = { k: 1, c: 1, h: 1, b: 1, p: 1, a: 1, lp: 1 };
const ARRANGEMENTS = {
  // 40 sn: açılış 2 ölçü, konuşma 4, yürüyüş 3, günlük tur 3, sınav 3, patika 2, kapanış 3
  promo: [
    { p: 1, a: 0.5, lp: 0.25 },
    { p: 1, a: 0.7, lp: 0.55, r: 1, roll: 1 },
    { ...FULL, i: 1 }, FULL, FULL, { ...FULL, r: 0.5 },
    { ...FULL, h16: 1, i: 0.6 }, { ...FULL, h16: 1 }, { ...FULL, h16: 1, r: 0.5 },
    { ...FULL, ao: 1, i: 0.6 }, { ...FULL, ao: 1 }, { ...FULL, ao: 1, r: 0.5 },
    { ...FULL, h16: 1, i: 0.6 }, { ...FULL, h16: 1 }, { ...FULL, h16: 1, r: 1, roll: 1 },
    { ...FULL, h16: 1, ao: 1, i: 1 }, { ...FULL, h16: 1, ao: 1, r: 1 },
    { end: 1, i: 1 }, { tail: 1 }, { tail: 1 },
  ],
  // 30 sn (App Preview üst sınırı): konuşma 3, yürüyüş 3, günlük tur 3, sınav 3, patika 3
  preview: [
    { p: 1, a: 0.7, h: 1, lp: 0.5, r: 0.6 },
    { ...FULL, i: 0.8 }, { ...FULL, r: 0.5 },
    { ...FULL, h16: 1, i: 0.6 }, FULL, { ...FULL, h16: 1, r: 0.5 },
    { ...FULL, ao: 1, i: 0.6 }, { ...FULL, ao: 1 }, { ...FULL, ao: 1, r: 0.5 },
    { ...FULL, h16: 1, i: 0.6 }, { ...FULL, h16: 1 }, { ...FULL, h16: 1, r: 1, roll: 1 },
    { ...FULL, h16: 1, ao: 1, i: 1 }, { ...FULL, ao: 1 },
    { end: 1, fade: 1 },
  ],
};

// ---------- küçük DSP yardımcıları ----------
let seed = 7;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

class Biquad {
  constructor(type, f, q = 0.707) { this.set(type, f, q); this.x1 = this.x2 = this.y1 = this.y2 = 0; }
  set(type, f, q = 0.707) {
    const w = (2 * Math.PI * Math.min(f, SR * 0.45)) / SR, a = Math.sin(w) / (2 * q), c = Math.cos(w);
    let b0, b1, b2;
    if (type === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = b0; }
    else if (type === "hp") { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = b0; }
    else { b0 = a; b1 = 0; b2 = -a; } // bp
    const a0 = 1 + a;
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = (-2 * c) / a0; this.a2 = (1 - a) / a0;
  }
  run(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y;
  }
}

/* Freeverb: 8 tarak + 4 tüm geçiren süzgeç, kanal başına biraz farklı gecikme. */
function reverb(inL, inR, { room = 0.84, damp = 0.3, wet = 1 } = {}) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((n) => Math.round((n * SR) / 44100));
  const alls = [556, 441, 341, 225].map((n) => Math.round((n * SR) / 44100));
  const side = (input, spread) => {
    const out = new Float32Array(input.length);
    const cs = combs.map((n) => ({ buf: new Float32Array(n + spread), i: 0, f: 0 }));
    const as = alls.map((n) => ({ buf: new Float32Array(n + spread), i: 0 }));
    for (let t = 0; t < input.length; t++) {
      const x = input[t] * 0.015;
      let y = 0;
      for (const c of cs) {
        const o = c.buf[c.i]; c.f = o * (1 - damp) + c.f * damp; c.buf[c.i] = x + c.f * room; c.i = (c.i + 1) % c.buf.length; y += o;
      }
      for (const a of as) { const o = a.buf[a.i]; const v = -y + o; a.buf[a.i] = y + o * 0.5; a.i = (a.i + 1) % a.buf.length; y = v; }
      out[t] = y * wet;
    }
    return out;
  };
  return [side(inL, 0), side(inR, 23)];
}

function render(name) {
  const arr = ARRANGEMENTS[name];
  if (!arr) throw new Error(`bilinmeyen düzen: ${name}`);
  const N = Math.ceil((arr.length * BAR + 0.05) * SR);
  const L = new Float32Array(N), R = new Float32Array(N);
  const revL = new Float32Array(N), revR = new Float32Array(N);
  const dlyL = new Float32Array(N), dlyR = new Float32Array(N);
  const duck = new Float32Array(N).fill(1); // kick'e göre sıkıştırma (sidechain)
  const at = (s) => Math.round(s * SR);
  const add = (buf, i, v) => { if (i >= 0 && i < N) buf[i] += v; };
  const pan = (i, v, p, send = 0, bus = null) => {
    add(L, i, v * Math.cos(((p + 1) * Math.PI) / 4)); add(R, i, v * Math.sin(((p + 1) * Math.PI) / 4));
    if (send) { const [bl, br] = bus || [revL, revR]; add(bl, i, v * send * Math.cos(((p + 1) * Math.PI) / 4)); add(br, i, v * send * Math.sin(((p + 1) * Math.PI) / 4)); }
  };

  const kick = (t0, g = 1) => {
    const s = at(t0); let ph = 0;
    for (let n = 0; n < at(0.45); n++) {
      const t = n / SR, f = 46 + 110 * Math.exp(-t / 0.035);
      ph += (2 * Math.PI * f) / SR;
      const v = Math.sin(ph) * Math.exp(-t / 0.22) + (n < 96 ? rnd() * 0.25 * (1 - n / 96) : 0);
      pan(s + n, Math.tanh(v * 1.6) * 0.62 * g, 0);
    }
    for (let n = 0; n < at(BEAT); n++) duck[s + n] = Math.min(duck[s + n] ?? 1, 1 - 0.62 * Math.exp(-(n / SR) / 0.11));
  };
  const clap = (t0, g = 1) => {
    const s = at(t0), bp = new Biquad("bp", 1500, 0.9), hp = new Biquad("hp", 600);
    for (let n = 0; n < at(0.3); n++) {
      const t = n / SR;
      const env = (t < 0.03 ? [0, 0.011, 0.022].reduce((e, o) => e + (t >= o ? Math.exp(-(t - o) / 0.004) : 0), 0) : 0) + Math.exp(-Math.max(0, t - 0.022) / 0.09) * (t >= 0.022 ? 1 : 0);
      pan(s + n, hp.run(bp.run(rnd())) * env * 0.42 * g, 0.05, 0.35);
    }
  };
  const hat = (t0, g = 1, open = false, p = 0.25) => {
    const s = at(t0), hp = new Biquad("hp", 7600), hp2 = new Biquad("hp", 9000);
    const len = open ? 0.22 : 0.05;
    for (let n = 0; n < at(len); n++) pan(s + n, hp2.run(hp.run(rnd())) * Math.exp(-(n / SR) / (len / 3)) * 0.2 * g, p, 0.08);
  };
  const snare = (t0, g = 1) => {
    const s = at(t0), bp = new Biquad("bp", 2200, 0.7);
    for (let n = 0; n < at(0.16); n++) {
      const t = n / SR;
      pan(s + n, (bp.run(rnd()) * 0.8 + Math.sin(2 * Math.PI * 190 * t) * 0.35) * Math.exp(-t / 0.05) * 0.32 * g, 0, 0.25);
    }
  };
  const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));
  const bass = (t0, dur, m, g = 1) => {
    const s = at(t0), lp = new Biquad("lp", 320, 0.9), f = midi(m); let a = 0, b = 0;
    for (let n = 0; n < at(dur); n++) {
      const t = n / SR; a += f / SR; b += (f * 1.004) / SR;
      const env = Math.min(1, t / 0.006) * Math.min(1, (dur - t) / 0.02);
      const v = lp.run(saw(a) * 0.6 + saw(b) * 0.4) + Math.sin(2 * Math.PI * f * t) * 0.5;
      pan(s + n, v * env * 0.36 * g, 0);
    }
  };
  const pad = (t0, dur, notes, cut, g = 1) => {
    const s = at(t0);
    const voices = notes.flatMap((m, vi) => [-11, -4, 4, 11].map((cents, k) => ({
      f: midi(m) * Math.pow(2, cents / 1200), ph: (vi * 0.37 + k * 0.21) % 1, pan: ((k % 2 ? 1 : -1) * (0.35 + 0.15 * vi)) / 1.2,
    })));
    const lpL = new Biquad("lp", cut, 0.6), lpR = new Biquad("lp", cut, 0.6);
    for (let n = 0; n < at(dur); n++) {
      const t = n / SR;
      const env = Math.min(1, t / 0.35) * Math.min(1, Math.max(0, (dur - t) / 0.4));
      let l = 0, r = 0;
      for (const v of voices) { v.ph += v.f / SR; const x = saw(v.ph % 1); l += x * (1 - v.pan); r += x * (1 + v.pan); }
      const k = (env * 0.035 * g) / voices.length * 4;
      const yl = lpL.run(l) * k, yr = lpR.run(r) * k;
      add(L, s + n, yl); add(R, s + n, yr); add(revL, s + n, yl * 0.5); add(revR, s + n, yr * 0.5);
    }
  };
  const pluck = (t0, m, g = 1, p = 0) => {
    const s = at(t0), f = midi(m), lp = new Biquad("lp", 4000, 1.2); let a = 0, b = 0;
    for (let n = 0; n < at(0.32); n++) {
      const t = n / SR; a += f / SR; b += (f * 2.003) / SR;
      lp.set("lp", 500 + 5200 * Math.exp(-t / 0.05), 1.4);
      const v = lp.run(saw(a % 1) * 0.7 + Math.sin(2 * Math.PI * b) * 0.3) * Math.exp(-t / 0.11) * Math.min(1, t / 0.002);
      pan(s + n, v * 0.16 * g, p, 0.25, [dlyL, dlyR]);
      add(revL, s + n, v * 0.04 * g); add(revR, s + n, v * 0.04 * g);
    }
  };
  const riser = (t0, dur, g = 1) => {
    const s = at(t0), bp = new Biquad("bp", 400, 1.5);
    for (let n = 0; n < at(dur); n++) {
      const x = n / at(dur);
      bp.set("bp", 300 + 7000 * x * x, 1.8);
      const v = bp.run(rnd()) * Math.pow(x, 2.2) * 0.42 * g;
      pan(s + n, v, Math.sin(x * 9) * 0.4, 0.4);
    }
  };
  const impact = (t0, g = 1) => {
    const s = at(t0); let ph = 0; const lp = new Biquad("lp", 2500);
    for (let n = 0; n < at(2.2); n++) {
      const t = n / SR; ph += (2 * Math.PI * (38 + 40 * Math.exp(-t / 0.15))) / SR;
      const v = Math.sin(ph) * Math.exp(-t / 0.7) * 0.5 + lp.run(rnd()) * Math.exp(-t / 0.25) * 0.18;
      pan(s + n, v * g, 0, 0.9);
    }
  };

  arr.forEach((bar, bi) => {
    const t0 = bi * BAR, ch = CHORDS[bi % 4];
    if (bar.end) {
      pad(t0, BAR * 2.6, ch === CHORDS[0] ? ch.pad : CHORDS[0].pad, 2600, 1.3);
      bass(t0, BAR * 1.5, CHORDS[0].root, 1.1);
      [0, 1, 2, 3].forEach((k) => pluck(t0 + k * BEAT * 0.5, CHORDS[0].arp[k], 0.9, (k - 1.5) * 0.3));
    }
    if (bar.tail) return;
    if (bar.p) pad(t0, BAR + 0.3, ch.pad, 600 + 2600 * (bar.lp ?? 1), bar.lp ? 1 : 1);
    for (let b = 0; b < 4; b++) {
      const tb = t0 + b * BEAT;
      if (bar.k) kick(tb);
      if (bar.c && (b === 1 || b === 3)) clap(tb);
      if (bar.h) { hat(tb + BEAT / 2, 1, b === 3, 0.25); if (bar.h16) { hat(tb + BEAT / 4, 0.45, false, -0.3); hat(tb + (3 * BEAT) / 4, 0.45, false, -0.3); } }
      if (bar.b) { bass(tb + BEAT / 2, BEAT / 2 - 0.01, ch.root); if (b === 3) bass(tb + BEAT * 0.75, BEAT / 4 - 0.01, ch.root + 12, 0.7); }
      if (bar.roll && b >= 2) { const n = b === 2 ? 4 : 8; for (let k = 0; k < n; k++) snare(tb + (k * BEAT) / n, 0.35 + 0.65 * ((b - 2) * n + k) / 12); }
    }
    if (bar.a) {
      const pat = [0, 2, 1, 3, 2, 1, 0, 2, 1, 3, 2, 3, 1, 2, 0, 1];
      pat.forEach((ix, k) => pluck(t0 + k * (BEAT / 4), ch.arp[ix] + (bar.ao && k % 4 === 2 ? 12 : 0), (k % 4 === 0 ? 1 : 0.7) * bar.a, ((k % 4) - 1.5) * 0.25));
    }
    if (bar.r) riser(t0 + BAR * (1 - 0.5 * bar.r * 1.5 > 0.2 ? 0.25 : 0.25), BAR * 0.75, bar.r);
    if (bar.i) impact(t0, bar.i);
  });

  // Ping-pong gecikme (noktalı sekizlik) ve yankı
  const D = at(BEAT * 0.75);
  for (let n = D; n < N; n++) { dlyL[n] += dlyR[n - D] * 0.38; dlyR[n] += dlyL[n - D] * 0.38; }
  for (let n = 0; n < N; n++) { revL[n] += dlyL[n] * 0.3; revR[n] += dlyR[n] * 0.3; }
  const [wl, wr] = reverb(revL, revR);
  // Sıkıştırma pad/bas/arpej için ortak: kaba ama işe yarıyor (L/R zaten karışık; kick'in kendisi de biraz eğiliyor)
  let peak = 0;
  const outL = new Float32Array(N), outR = new Float32Array(N);
  const fadeFrom = arr.at(-1).fade ? N - at(BAR) : N;
  for (let n = 0; n < N; n++) {
    const d = 0.55 + 0.45 * duck[n];
    const fade = n > fadeFrom ? Math.max(0, 1 - (n - fadeFrom) / (N - fadeFrom)) : 1;
    outL[n] = Math.tanh((L[n] * d + (dlyL[n] + wl[n] * 0.9) * d) * 1.15) * fade;
    outR[n] = Math.tanh((R[n] * d + (dlyR[n] + wr[n] * 0.9) * d) * 1.15) * fade;
    peak = Math.max(peak, Math.abs(outL[n]), Math.abs(outR[n]));
  }
  const g = 0.89 / peak;
  for (let n = 0; n < N; n++) { outL[n] *= g; outR[n] *= g; }
  return [outL, outR];
}

function wav(file, [l, r]) {
  const n = l.length, buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, l[i])) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, r[i])) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(file, buf);
}

export const BAR_SECONDS = BAR;
export function bars(name) { return ARRANGEMENTS[name].length; }

if (import.meta.url === `file://${process.argv[1]}`) {
  const [name = "promo", out = `music-${name}.wav`] = process.argv.slice(2);
  const t = Date.now();
  wav(out, render(name));
  console.log(`${out}: ${ARRANGEMENTS[name].length} ölçü, ${(ARRANGEMENTS[name].length * BAR).toFixed(1)} sn, ${((Date.now() - t) / 1000).toFixed(1)} sn'de`);
}

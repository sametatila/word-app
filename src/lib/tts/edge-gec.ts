// SPDX-License-Identifier: LGPL-3.0-only
// Türev: rany2/edge-tts 7.3.1 `src/edge_tts/drm.py` (LGPLv3). Yalnız sunucuda çalışıyor.
/**
 * Edge sesli okuma ucunun `Sec-MS-GEC` jetonu, v2 (Microsoft, 2026-10-10 civarı).
 *
 * v1 düz SHA-256'ydı (`<dosya zamanı><güvenilen jeton>`). v2'de jeton
 * `<CS64 16 hex>-<SHA-256 64 hex>`: SHA-256, Microsoft'un gizli bir öneki
 * hesaba katılmış ara durumdan başlıyor, CS64 o özetle anahtarlanan 64 bitlik
 * bir sağlama. Eski jetonla uç her sürümde 403 veriyordu (sunucu ve ev
 * bağlantısından aynı; IP engeli değil).
 *
 * KAYNAK: `edge-tts` 7.3.1 (rany2/edge-tts, LGPL-3.0), `src/edge_tts/drm.py`
 * `generate_sec_ms_gec_v2`. Buradaki kod onun birebir aktarımı; sabitler
 * oradan. Bu dosya o yüzden LGPL-3.0 (ticari kullanım serbest; istemciye
 * gönderilmiyor, `edge.ts` `server-only`). Python'un sınırsız tam sayılarıyla aynı sonucu vermesi için BigInt
 * kullanılıyor (jeton beş dakikada bir değişiyor ve önbellekte; hız önemsiz).
 * Doğrulama: `npm run test:edge-gec` aynı zaman damgalarında Python'un
 * ürettiği değerlerle karşılaştırıyor. Microsoft yeniden değiştirirse önce o
 * kütüphanenin yeni sürümüne bak.
 */

const M = 0xffffffffn;

const SHA256_INITIAL = [0x6a09e667n, 0xbb67ae85n, 0x3c6ef372n, 0xa54ff53an, 0x510e527fn, 0x9b05688cn, 0x1f83d9abn, 0x5be0cd19n];
const SHA256_STATE = [0xfd9fbea2n, 0x91243ce7n, 0xbe499094n, 0xcd2e1e0an, 0x6c006f49n, 0x04bd35abn, 0xfeb0a7e4n, 0x03effbd2n];
const SHA256_SCHEDULE = [
  0xeb24bf9en, 0x1558691fn, 0xa0c09ee2n, 0x0cfa32ban, 0xa622ee8cn, 0xd1dd9491n, 0xc0dd25a0n,
  0xf9e70ab6n, 0xf0c31573n, 0x7058ce4en, 0x7188e606n, 0x00e5ab33n, 0xd258b060n, 0x72766564n,
];
const K = [
  0x428a2f98n, 0x71374491n, 0xb5c0fbcfn, 0xe9b5dba5n, 0x3956c25bn, 0x59f111f1n, 0x923f82a4n, 0xab1c5ed5n,
  0xd807aa98n, 0x12835b01n, 0x243185ben, 0x550c7dc3n, 0x72be5d74n, 0x80deb1fen, 0x9bdc06a7n, 0xc19bf174n,
  0xe49b69c1n, 0xefbe4786n, 0x0fc19dc6n, 0x240ca1ccn, 0x2de92c6fn, 0x4a7484aan, 0x5cb0a9dcn, 0x76f988dan,
  0x983e5152n, 0xa831c66dn, 0xb00327c8n, 0xbf597fc7n, 0xc6e00bf3n, 0xd5a79147n, 0x06ca6351n, 0x14292967n,
  0x27b70a85n, 0x2e1b2138n, 0x4d2c6dfcn, 0x53380d13n, 0x650a7354n, 0x766a0abbn, 0x81c2c92en, 0x92722c85n,
  0xa2bfe8a1n, 0xa81a664bn, 0xc24b8b70n, 0xc76c51a3n, 0xd192e819n, 0xd6990624n, 0xf40e3585n, 0x106aa070n,
  0x19a4c116n, 0x1e376c08n, 0x2748774cn, 0x34b0bcb5n, 0x391c0cb3n, 0x4ed8aa4an, 0x5b9cca4fn, 0x682e6ff3n,
  0x748f82een, 0x78a5636fn, 0x84c87814n, 0x8cc70208n, 0x90befffan, 0xa4506cebn, 0xbef9a3f7n, 0xc67178f2n,
];
const SHA256_ADJUSTMENT = 0xc9dc06a7n;
/** İlk bloğun 14. turu farklı sabitle koşuyor. */
const K_BLOCK = [...K.slice(0, 14), SHA256_ADJUSTMENT, ...K.slice(15)];
const SIGMA0_ADJUSTMENT = 0x059c0b80n;
const SIGMA1_ADJUSTMENT = 0x000b92c0n;

const CS64_COEFFICIENTS: [bigint, bigint][] = [
  [0xe82e91b1n, 0xb32700d0n], [0x44de24c6n, 0x88dff51dn], [0x3beb65bcn, 0x29514038n], [0xc89c5933n, 0xb328cbdfn],
  [0x8d1ec211n, 0xd405b4d5n], [0x314ef5d5n, 0x26e55f3cn], [0xe92491b1n, 0x607801c6n], [0xf0a5b9d5n, 0x82b2c1fbn],
  [0x06064cf3n, 0xfa51a3dan], [0xda79fa60n, 0x207cc464n], [0xbed20560n, 0x3c3c74f3n], [0x89f9c9f8n, 0xd2d14b61n],
  [0x35fa38c6n, 0xbb04a2c1n], [0xcb49e3c6n, 0xc5626167n],
];
const CS64_FACTOR = 0x82893933n;
const CS64_ADJUSTMENT0 = 0xf2f90b1an;
const CS64_ADJUSTMENT1 = 0x0b1a0000n;

const rol16 = (v: bigint) => {
  v &= M;
  return ((v << 16n) | (v >> 16n)) & M;
};
const sigma0 = (v: bigint) => ((v >> 7n) ^ (v << 25n) ^ (v >> 18n) ^ (v << 14n) ^ (v >> 3n)) & M;
const sigma1 = (v: bigint) => ((v >> 17n) ^ (v << 15n) ^ (v >> 19n) ^ (v << 13n) ^ (v >> 10n)) & M;
const beWord = (b: Uint8Array, at: number, n = 4) => {
  let v = 0n;
  for (let i = 0; i < n; i++) v = (v << 8n) | BigInt(b[at + i]);
  return v;
};
const leWord = (b: Uint8Array, at: number) =>
  BigInt(b[at]) | (BigInt(b[at + 1]) << 8n) | (BigInt(b[at + 2]) << 16n) | (BigInt(b[at + 3]) << 24n);

/** SHA-256 turları; `firstRound` 14 ise ilk bloğun ortasından devam. */
function rounds(state: bigint[], w: bigint[], firstRound = 0): bigint[] {
  let [a, b, c, d, e, f, g, h] = state;
  const k = firstRound === 14 ? K_BLOCK : K;
  for (let i = firstRound; i < 64; i++) {
    const re = e * 0x100000001n;
    const ra = a * 0x100000001n;
    const t1 = h + ((re >> 6n) ^ (re >> 11n) ^ (re >> 25n)) + (g ^ (e & (f ^ g))) + k[i] + w[i];
    const t2 = ((ra >> 2n) ^ (ra >> 13n) ^ (ra >> 22n)) + ((a & b) | (c & (a | b)));
    [a, b, c, d, e, f, g, h] = [(t1 + t2) & M, a, b, c, (d + t1) & M, e, f, g];
  }
  return [a, b, c, d, e, f, g, h];
}

function expand(w: bigint[], firstWord = 16): void {
  for (let i = firstWord; i < 64; i++) {
    const x = w[i - 2];
    const y = w[i - 15];
    const s1 = (x >> 17n) ^ (x << 15n) ^ (x >> 19n) ^ (x << 13n) ^ (x >> 10n);
    const s0 = (y >> 7n) ^ (y << 25n) ^ (y >> 18n) ^ (y << 14n) ^ (y >> 3n);
    w.push((s1 + w[i - 7] + s0 + w[i - 16]) & M);
  }
}

/** Gizli önekli ilk bloğun ara durumu (verinin ilk yedi baytıyla). */
function initState(data7: Uint8Array): bigint[] {
  const w: bigint[] = [...Array<bigint>(14).fill(0n), beWord(data7, 0, 3), beWord(data7, 3, 4)];
  for (let i = 16; i < 30; i++) {
    let v = SHA256_SCHEDULE[i - 16];
    if (i - 2 >= 14) v += i === 16 ? sigma1(w[i - 2]) ^ SIGMA1_ADJUSTMENT : sigma1(w[i - 2]);
    if (i - 7 >= 14) v += w[i - 7];
    if (i - 15 >= 14) v += i === 29 ? sigma0(w[i - 15]) ^ SIGMA0_ADJUSTMENT : sigma0(w[i - 15]);
    w.push(v & M);
  }
  w.push((sigma1(w[28]) + w[23] + sigma0(w[15]) + w[14] + SHA256_ADJUSTMENT - K[14]) & M);
  expand(w, 31);
  const working = rounds(SHA256_STATE, w, 14);
  return SHA256_INITIAL.map((x, i) => (x + working[i]) & M);
}

function sha256Digest(data: Uint8Array): Uint8Array {
  const length = 57 + data.length;
  const zeros = (((55 - length) % 64) + 64) % 64;
  const padded = new Uint8Array(data.length - 7 + 1 + zeros + 8);
  padded.set(data.subarray(7), 0);
  padded[data.length - 7] = 0x80;
  new DataView(padded.buffer).setBigUint64(padded.length - 8, BigInt(length * 8));
  let state = initState(data.subarray(0, 7));
  for (let off = 0; off < padded.length; off += 64) {
    const w: bigint[] = [];
    for (let i = 0; i < 16; i++) w.push(beWord(padded, off + i * 4));
    expand(w);
    const working = rounds(state, w);
    state = state.map((x, i) => (x + working[i]) & M);
  }
  const out = new Uint8Array(32);
  const dv = new DataView(out.buffer);
  state.forEach((x, i) => dv.setUint32(i * 4, Number(x)));
  return out;
}

function cs64Digest(data: Uint8Array, digest: Uint8Array): [bigint, bigint] {
  const keyA = leWord(digest, 0) | 1n;
  const keyB = leWord(digest, 4) | 1n;
  const factors = [(keyA * CS64_FACTOR) & M, (keyB * CS64_FACTOR) & M];
  const terms = CS64_COEFFICIENTS.map(([c], i) => (c * factors[i % 2]) & M);
  const offsets = CS64_COEFFICIENTS.map(([, o]) => o);

  // b"\x00" + data, dörde tamamlanıp küçük uçlu kelimeler, kelime sayısı çift.
  const raw = new Uint8Array(1 + data.length + ((4 - ((1 + data.length) % 4)) % 4));
  raw.set(data, 1);
  const words: bigint[] = [];
  for (let at = 0; at < raw.length; at += 4) words.push(leWord(raw, at));
  if (words.length % 2) words.push(0n);

  words.forEach((word, i) => {
    let term = word * (i % 2 === 0 ? keyA : keyB);
    let offset = rol16(word) * (i % 2 === 0 ? 0xef0569fbn : 0xc31713dbn);
    if (i === 0) {
      term += CS64_ADJUSTMENT0 * factors[0];
      offset += CS64_ADJUSTMENT1;
    }
    terms.push(term & M);
    offsets.push(offset & M);
  });

  let swapAcc = 0n;
  let swapLast = 0n;
  let state = 0n;
  let acc = 0n;
  for (let i = 0; i < terms.length; i += 2) {
    const x = terms[i];
    const y = terms[i + 1];
    let t = rol16((offsets[i] + x) & M);
    let q = (t * 0x76f50f34n) & M;
    swapAcc += (rol16(q) * 0xc3efea97n + q) & M;
    t = rol16((offsets[i + 1] + y) & M);
    q = (t * 0x1881ce3cn) & M;
    swapLast = (rol16(q) * 0x35bd1ec9n + q) & M;
    swapAcc = (swapAcc + swapLast) & M;

    state = (state * keyA + x) & M;
    state = (rol16(state) * 0xcf98b111n) & M;
    state = (rol16(state) * 0x87085b9fn) & M;
    state = (rol16(state) * 0x12ceb96dn) & M;
    state = (rol16(state) * 0x257e1d83n) & M;
    acc += state;
    t = (state * keyB + y) & M;
    t = (rol16(t) * 0xa27416f5n) & M;
    t = (rol16(t) * 0xd38396ffn) & M;
    state = (rol16((rol16(t) * 0x7c932b89n) & M) * 0xbfa49f69n) & M;
    acc = (acc + state) & M;
  }
  return [swapLast ^ state, swapAcc ^ acc];
}

const hex = (b: Uint8Array) => Buffer.from(b).toString("hex").toUpperCase();

let cache: { key: string; value: string } | null = null;

/**
 * v2 `Sec-MS-GEC`. `unixSeconds` yalnız sınama için; dosya zamanı beş dakikaya
 * yuvarlanıyor, aynı pencere içinde sonuç önbellekten.
 */
export function secMsGecV2(trustedToken: string, unixSeconds = Date.now() / 1000): string {
  let ticks = unixSeconds + 11_644_473_600;
  ticks -= ticks % 300;
  // ×1e7 tam sayı ve kesin: BigInt ile, Python'un `f"{ticks:.0f}"` çıktısıyla aynı.
  const key = `${BigInt(Math.round(ticks)) * 10_000_000n}${trustedToken}`;
  if (cache?.key === key) return cache.value;
  const data = new TextEncoder().encode(key);
  const digest = sha256Digest(data);
  const [lo, hi] = cs64Digest(data, digest);
  const cs = new Uint8Array(8);
  const dv = new DataView(cs.buffer);
  dv.setUint32(0, Number(lo), true);
  dv.setUint32(4, Number(hi), true);
  const value = `${hex(cs)}-${hex(digest)}`;
  cache = { key, value };
  return value;
}

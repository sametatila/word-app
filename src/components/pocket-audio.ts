"use client";

import { WALK_NOTES, type WalkCue } from "@/lib/sfx";

/**
 * Yürüyüş seslerinin `<audio>` öğesiyle çalınan hâli.
 *
 * Yürüyüş işaretleri normalde WebAudio ile çalıyor (`lib/sfx`). `AudioContext`
 * çalışmadığında (henüz uyandırılmadı ya da askıya alındı) o yol susuyor; ses
 * ÖĞELERİ ise çalmaya devam ediyor. Kullanıcı ekrana bakmadığı için mikrofonun
 * açıldığını ve kapandığını yalnızca kulağıyla anlayabiliyor — işaret
 * duyulmazsa ya boşluğa konuşuyor ya da sessizce bekliyor.
 *
 * (Eskiden burada ekran kapalıyken sekmeyi canlı tutan sessiz döngü ve
 * MediaSession da vardı; ekran kapalı cep yoluyla birlikte kaldırıldı,
 * 2026-09-17.)
 */

/**
 * WAV üreteci — 48 kHz, 16 bit, tek kanal.
 *
 * Dosya olarak eklenmedi: çalışma anında üretmek hem depoyu hem bir ağ
 * isteğini gereksiz kılıyor.
 *
 * Oran ve derinlik bilerek cihazın kendi oranında: önceki hâl 8 kHz/8 bit'ti
 * ve bip 8 bitte kaba duyuluyordu.
 *
 * `fill` örneği üretir; verilmezse sessizlik.
 */
function wavUrl(ms: number, fill?: (i: number, rate: number) => number): string {
  const rate = 48_000;
  const samples = Math.round((rate * ms) / 1000);
  const bytes = samples * 2;
  const buf = new ArrayBuffer(44 + bytes);
  const view = new DataView(buf);
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  ascii(0, "RIFF");
  view.setUint32(4, 36 + bytes, true);
  ascii(8, "WAVEfmt ");
  view.setUint32(16, 16, true); // fmt bloğu uzunluğu
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // tek kanal
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true); // bayt/sn
  view.setUint16(32, 2, true); // blok hizası
  view.setUint16(34, 16, true); // bit derinliği
  ascii(36, "data");
  view.setUint32(40, bytes, true);
  if (fill) {
    for (let i = 0; i < samples; i++) {
      view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, Math.round(fill(i, rate)))), true);
    }
  }
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

/**
 * Kısa bir bip — ses ÖĞESİ olarak.
 *
 * Konuşmanın işitsel işaretleri (`lib/conversations/cues`) WebAudio ile üretiliyor ve
 * ekran kapandığında `AudioContext` askıya alındığı için tam ihtiyaç duyulan
 * yerde susuyorlar. Cepteki kullanıcı mikrofonun açıldığını yalnızca kulağıyla
 * anlayabiliyor; işaret duyulmazsa ya boşluğa konuşuyor ya da sessizce
 * bekliyor.
 */
function beepUrl(freq: number, ms: number): string {
  return wavUrl(ms, (i, rate) => {
    const n = Math.round((rate * ms) / 1000);
    // Kenarlar yumuşatılıyor: sert başlayan bir ton kulakta "tık" oluyor.
    const fade = Math.min(1, i / 480, (n - i) / 480);
    return 9000 * fade * Math.sin((2 * Math.PI * freq * i) / rate);
  });
}

let cue: HTMLAudioElement | null = null;

/**
 * YÜRÜYÜŞ SESLERİNİ `<audio>` İLE ÇALAR — WebAudio değil.
 *
 * Ekran kapalıyken `AudioContext` askıya alınıyor, yani `lib/sfx.ts`teki
 * WebAudio sentezi susuyor. Tam da bu yüzden `pocketCue` bir `<audio>` öğesiyle
 * çalışıyordu — ama o tek bir bip'ti ve mobildeki sesle ilgisi yoktu.
 *
 * Burada aynı NOTA TABLOSU (`WALK_NOTES`, mobilden birebir kopya) WAV'a
 * çiziliyor ve `<audio>` ile çalınıyor. Böylece üç yerde de tek ses var:
 * webde WebAudio, webde `<audio>` (bu), mobilde (native sentez).
 * Kullanıcı ekrana bakmadığı için modun öğrenilmesi tamamen sese bağlı;
 * "mikrofon açıldı" işareti duruma göre değişirse mod öğrenilmiyor.
 *
 * Sentez modeli `lib/sfx.ts`teki `playNotes` ile aynı: üstel zarf, isteğe bağlı
 * alçak geçiren süzgeç (biquad, Q 0.7), pluck ya da tut-ve-in.
 */
const walkCueCache = new Map<WalkCue, HTMLAudioElement>();

function renderWalkCue(cue: WalkCue): string {
  const notes = WALK_NOTES[cue];
  const total = Math.max(...notes.map((n) => n[1] + n[2])) + 0.05;
  const rate = 48_000;
  const n = Math.round(rate * total);
  const buf = new Float32Array(n);

  for (const [f, st, dur, peak, wave, glide, lp, atkRaw, hold, rel] of notes) {
    const atk = atkRaw || 0.004;
    const i0 = Math.round(st * rate);
    const len = Math.round(dur * rate);
    const tmp = new Float32Array(len);
    let phase = 0;
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      // Frekans kayması: üstel, notanın süresi boyunca.
      const fr = glide > 0 ? f * Math.pow(Math.max(20, glide) / f, t / dur) : f;
      phase += (2 * Math.PI * fr) / rate;
      const sn = Math.sin(phase);
      const v = wave === 2 ? Math.sign(sn) : wave === 1 ? (2 / Math.PI) * Math.asin(sn) : sn;
      // Zarf: 0.0001 → peak (atak), sonra pluck ya da tut-ve-in.
      let g: number;
      if (t < atk) g = 0.0001 * Math.pow(peak / 0.0001, t / atk);
      else if (hold >= 0.5 && t < dur - rel) g = peak;
      else {
        const p0 = hold >= 0.5 ? dur - rel : atk;
        g = peak * Math.pow(0.0001 / peak, (t - p0) / Math.max(1e-6, dur - p0));
      }
      tmp[i] = v * g;
    }
    if (lp > 0) lowpass(tmp, lp, rate);
    for (let i = 0; i < len; i++) {
      const j = i0 + i;
      if (j < n) buf[j] += tmp[i];
    }
  }

  return wavUrl(total * 1000, (i) => 9000 * 2.2 * (buf[i] ?? 0));
}

/** Biquad alçak geçiren (RBJ, Q 0.7) — WebAudio'nun `lowpass`ıyla aynı katsayılar. */
function lowpass(x: Float32Array, freq: number, rate: number): void {
  const w0 = (2 * Math.PI * freq) / rate;
  const alpha = Math.sin(w0) / (2 * 0.7);
  const c = Math.cos(w0);
  const b0 = (1 - c) / 2, b1 = 1 - c, b2 = (1 - c) / 2;
  const a0 = 1 + alpha, a1 = -2 * c, a2 = 1 - alpha;
  let z1 = 0, z2 = 0;
  for (let i = 0; i < x.length; i++) {
    const inp = x[i];
    const out = (b0 / a0) * inp + z1;
    z1 = (b1 / a0) * inp - (a1 / a0) * out + z2;
    z2 = (b2 / a0) * inp - (a2 / a0) * out;
    x[i] = out;
  }
}

/** Yürüyüş sesini `<audio>` öğesiyle çalar (mobil ile aynı ses). */
export function pocketWalkCue(cue: WalkCue): void {
  if (typeof window === "undefined") return;
  let el = walkCueCache.get(cue);
  if (!el) {
    el = new Audio(renderWalkCue(cue));
    el.preload = "auto";
    walkCueCache.set(cue, el);
  }
  try { el.currentTime = 0; } catch { /* henüz yüklenmediyse önemsiz */ }
  void el.play().catch(() => {});
}

/** Mikrofonun açıldığını kulağa söyler — kayıt yolunun kısa bipi. */
export function pocketCue() {
  if (typeof window === "undefined") return;
  if (!cue) {
    cue = new Audio(beepUrl(880, 140));
    cue.preload = "auto";
  }
  try {
    cue.currentTime = 0;
  } catch {
    /* henüz yüklenmediyse önemsiz */
  }
  void cue.play().catch(() => {});
}

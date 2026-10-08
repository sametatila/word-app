/**
 * Yürüyüş modu, ekran kapalı dinleme: cihazda konuşma algılama (VAD) — REFERANS.
 *
 * Native kayıt (Android `LernomiSpeechModule`, iOS `LernomiSpeech`) bu algoritmanın
 * birebir kopyası olmalı; masaüstü ölçümü (`scripts/walk-vad-eval.ts`) bunun üzerinde.
 * Yalnız geçmişe bakar (akış hâlinde, 20 ms'lik dilimler): native taraf aynı karar
 * anında kaydı durdurur.
 *
 *  - Dilim enerjisi 300 Hz ikinci dereceden yüksek geçirenden sonra (RBJ biquad, Q 0,707):
 *    rüzgâr uğultusu ve adım gümlemesi konuşma bandının altında kalıyor. Gönderilen ses filtresiz.
 *  - SESLİLİK (periyodiklik): enerji tek başına kumaş hışırtısını, rüzgârı, trafiği konuşmadan
 *    ayıramıyor (ölçüm: cepte gürültü 4,3 sn "konuşma" sayıldı). Ünlüler periyodik: önceki +
 *    bu dilim (40 ms) üzerinde, ön vurgulu sinyalin 80–400 Hz gecikmelerindeki en yüksek
 *    normalize öz-ilinti ≥ voicedR ise dilim sesli. Başlangıç için koşudaki dilimlerden en az
 *    `onsetVoiced` tanesi sesli olmalı; konuşma son sesli dilimden `voicedBridgeMs` sonrasına
 *    kadar enerjiyle uzar (ünsüzler), ötesinde yalnız sesli dilim uzatır.
 *  - İlk `skipMs` karar dışı: kayıt "micon" sesiyle aynı anda açılıyor (~0,26 sn).
 *  - Gürültü tabanı: aşağı hızlı, yukarı yavaş izlenir (yürürken değişir).
 *  - Başlangıç: taban + onsetDb üstünde `onsetFrames` ardışık dilim (ve mutlak alt sınır);
 *    an, aynı kesintisiz taban + holdDb koşusunun başına geri alınır.
 *  - Bitiş: taban + holdDb altında `endSilenceMs`; konuşma en çok `maxSpeechMs`.
 *  - Gönderilen: başlangıçtan `preRollMs` önce → son sesli dilimden `tailMs` sonra.
 *  - Başlangıç yoksa ama tepe tabanın `fallbackDb` üstündeyse: tepenin çevresi (kısık ses).
 *  - Hiçbiri yoksa: gönderim yok ("duyamadım").
 */
export const WALK_VAD = {
  rate: 16_000,
  frameMs: 20,
  skipMs: 300,
  hpfHz: 300,
  onsetDb: 10,
  holdDb: 6,
  onsetFrames: 3,
  onsetVoiced: 2,
  voicedR: 0.5,
  voicedBridgeMs: 300,
  minF0: 80,
  maxF0: 400,
  minDbfs: -55,
  floorCapDbfs: -45,
  floorRise: 0.02,
  endSilenceMs: 650,
  maxSpeechMs: 4_000,
  maxWaitMs: 5_000,
  preRollMs: 500,
  tailMs: 500,
  fallbackDb: 6,
  fallbackBeforeMs: 500,
  fallbackAfterMs: 1_000,
};

export type VadParams = typeof WALK_VAD;

export type VadResult = {
  kind: "speech" | "fallback" | "none";
  /** Gönderilecek parça (örnek indisi, [start, end)). none'da 0,0. */
  start: number;
  end: number;
  /** Kaydın durduğu an (örnek): karar burada veriliyor. */
  stop: number;
};

/** Akış: her 20 ms'lik dilimden sonra `push` → true dönerse kayıt durur. */
export class WalkVad {
  readonly frame: number;
  private x1 = 0; private x2 = 0; private y1 = 0; private y2 = 0;
  private readonly bq: [number, number, number, number, number];
  /** Önceki + bu dilimin ön vurgulu, filtreli örnekleri (seslilik penceresi). */
  private readonly win: Float64Array;
  private readonly sq: Float64Array;
  private pe = 0;
  private runVoiced = 0;
  private lastPeriodic = -1;
  /** taban + holdDb üstündeki kesintisiz koşunun ilk dilimi (yumuşak başlayan ünsüz). */
  private softStart = -1;
  private i = 0;
  private floor = Number.NaN;
  private state: "wait" | "speech" | "done" = "wait";
  private run = 0;
  private runStart = 0;
  private onset = -1;
  private lastVoiced = -1;
  private peakOver = -Infinity;
  private peakAt = -1;
  result: VadResult | null = null;

  constructor(readonly p: VadParams = WALK_VAD) {
    this.frame = Math.round((p.rate * p.frameMs) / 1000);
    this.win = new Float64Array(this.frame * 2);
    this.sq = new Float64Array(this.frame * 2 + 1);
    // RBJ yüksek geçiren, Q = 1/√2: [b0, b1, b2, a1, a2] (a0'a bölünmüş)
    const w0 = (2 * Math.PI * p.hpfHz) / p.rate;
    const alpha = Math.sin(w0) / (2 * Math.SQRT1_2);
    const cos = Math.cos(w0);
    const a0 = 1 + alpha;
    this.bq = [(1 + cos) / 2 / a0, -(1 + cos) / a0, (1 + cos) / 2 / a0, (-2 * cos) / a0, (1 - alpha) / a0];
  }

  private ms(frames: number) { return frames * this.p.frameMs; }
  private sample(frameIdx: number) { return frameIdx * this.frame; }

  /** Bir dilim (tam `frame` örnek). true: kayıt bitti, `result` dolu. */
  push(x: Int16Array): boolean {
    if (this.state === "done") return true;
    let sum = 0;
    const n = this.frame;
    this.win.copyWithin(0, n);
    const [b0, b1, b2, a1, a2] = this.bq;
    for (let k = 0; k < n; k++) {
      const y = b0 * x[k] + b1 * this.x1 + b2 * this.x2 - a1 * this.y1 - a2 * this.y2;
      this.x2 = this.x1; this.x1 = x[k]; this.y2 = this.y1; this.y1 = y;
      sum += y * y;
      this.win[n + k] = y - 0.9 * this.pe;
      this.pe = y;
    }
    const e = 10 * Math.log10(sum / n / (32768 * 32768) + 1e-12);
    const i = this.i++;
    const p = this.p;
    if (this.ms(i + 1) <= p.skipMs) return false;
    const above = e > this.floor + p.holdDb;
    if (!above) this.softStart = -1;
    else if (this.softStart < 0) this.softStart = i;
    const voiced = above && this.periodicity() >= p.voicedR;
    if (voiced) this.lastPeriodic = i;
    if (Number.isNaN(this.floor)) this.floor = Math.min(e, p.floorCapDbfs);

    if (this.state === "wait") {
      if (e > Math.max(this.floor + p.onsetDb, p.minDbfs)) {
        if (this.run === 0) { this.runStart = i; this.runVoiced = 0; }
        this.run++;
        if (voiced) this.runVoiced++;
        if (this.run >= p.onsetFrames && this.runVoiced >= p.onsetVoiced) {
          this.state = "speech";
          // Başlangıç, eşiğe yetişmeyen yumuşak girişe kadar geri alınır ("sich", "f…").
          this.onset = this.softStart >= 0 ? Math.min(this.runStart, this.softStart) : this.runStart;
          this.lastVoiced = i;
        }
      } else {
        this.run = 0;
        this.floor = e < this.floor ? e : this.floor + (e - this.floor) * p.floorRise;
      }
      if (this.state === "wait") {
        const over = e - this.floor;
        if (voiced && over > this.peakOver) { this.peakOver = over; this.peakAt = i; }
        if (this.ms(i + 1) >= p.maxWaitMs) return this.finishWait(i);
        return false;
      }
    }
    // speech
    if (e > this.floor + p.holdDb && (voiced || this.ms(i - this.lastPeriodic) <= p.voicedBridgeMs)) this.lastVoiced = i;
    const silentMs = this.ms(i - this.lastVoiced);
    if (silentMs >= p.endSilenceMs || this.ms(i + 1 - this.onset) >= p.maxSpeechMs) {
      const stop = this.sample(i + 1);
      const start = Math.max(0, this.sample(this.onset) - (p.rate * p.preRollMs) / 1000);
      const end = Math.min(stop, this.sample(this.lastVoiced + 1) + (p.rate * p.tailMs) / 1000);
      this.result = { kind: "speech", start, end, stop };
      this.state = "done";
      return true;
    }
    return false;
  }

  /** Pencerede (80–400 Hz gecikme) en yüksek normalize öz-ilinti, 0–1. */
  private periodicity(): number {
    const w = this.win;
    const len = w.length;
    const sq = this.sq;
    for (let k = 0; k < len; k++) sq[k + 1] = sq[k] + w[k] * w[k];
    const minLag = Math.floor(this.p.rate / this.p.maxF0);
    const maxLag = Math.ceil(this.p.rate / this.p.minF0);
    let best = 0;
    for (let lag = minLag; lag <= maxLag && lag < len - 32; lag++) {
      let num = 0;
      for (let k = 0; k + lag < len; k++) num += w[k] * w[k + lag];
      const e0 = sq[len - lag];
      const e1 = sq[len] - sq[lag];
      if (e0 > 0 && e1 > 0) {
        const r = num / Math.sqrt(e0 * e1);
        if (r > best) best = r;
      }
    }
    return best;
  }

  private finishWait(i: number): boolean {
    const p = this.p;
    const stop = this.sample(i + 1);
    if (this.peakOver >= p.fallbackDb && this.peakAt >= 0) {
      const at = this.sample(this.peakAt);
      const start = Math.max(0, at - (p.rate * p.fallbackBeforeMs) / 1000);
      const end = Math.min(stop, at + (p.rate * p.fallbackAfterMs) / 1000);
      this.result = { kind: "fallback", start, end, stop };
    } else {
      this.result = { kind: "none", start: 0, end: 0, stop };
    }
    this.state = "done";
    return true;
  }
}

/** Kaydın tamamı elde: akışı dilim dilim besler (kayıt ne zaman dursaydı orada durur). */
export function runVad(samples: Int16Array, p: VadParams = WALK_VAD): VadResult {
  const vad = new WalkVad(p);
  for (let at = 0; at + vad.frame <= samples.length; at += vad.frame) {
    if (vad.push(samples.subarray(at, at + vad.frame))) return vad.result!;
  }
  return { kind: "none", start: 0, end: 0, stop: samples.length };
}

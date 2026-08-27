/**
 * Konuşma bölgesi bulucu (enerji tabanlı VAD) — saf, tarayıcıdan bağımsız.
 *
 * Yürürken modunun cep yolu Azure'a kayıt gönderiyor ve Azure'un ücretsiz
 * katmanı ayda beş saat. Kaydedicinin kestiği pencere 4–7 saniyeydi ve çoğu
 * sessizlikti; üstelik uzun sessizlik doğruluğu da düşürüyordu (ölçüldü:
 * "der Weg" altı saniyelik temiz pencerede "der" olarak okundu, kırpılmış
 * hâli 0,92 güvenle tam). Burada 16 kHz PCM üstünde konuşmanın başı ve sonu
 * bulunuyor; yalnız o parça (küçük paylarla) gönderiliyor. Altı kelimelik
 * deneyde gönderilen ses 34,4 → 6,9 saniye, güven aynı ya da daha yüksek.
 *
 * Yöntem bilerek basit: 20 ms çerçevelerde RMS (dBFS), gürültü tabanı pencerenin
 * alt yüzdeliği, eşik tabanın 8 dB üstü. Ceptekinin kumaş hışırtısı ve sokak
 * gürültüsü taban olarak ölçülüyor; konuşma onun epey üstünde. Hiç bölge yoksa
 * `null`: çağıran taraf isteği hiç atmıyor — "duyamadım" kotaya dokunmuyor.
 * Kaydedicideki bayt-boyu ölçütü kaydı KAPATMAK için kalıyor; kırpmayı bu
 * yapıyor, çünkü bayt boyu 200 ms'lik parça çözünürlüğünde ve kodlayıcıya bağlı.
 */

export type SpeechSpan = {
  /** Örnek indisleri: [start, end) — paylar dâhil. */
  start: number;
  end: number;
  /** Gürültü tabanı ve tepe (dBFS) — telemetri ve eşik ayarı için. */
  floorDb: number;
  peakDb: number;
  /** İlk bölgenin başından son bölgenin sonuna, pay hariç (ms). */
  speechMs: number;
};

export type VadOptions = {
  /** Çerçeve uzunluğu (ms). */
  frameMs?: number;
  /** Tabanın kaçıncı yüzdelik olduğu (0–1). */
  floorPercentile?: number;
  /** Konuşma sayılmak için tabanın kaç dB üstü gerekiyor. */
  aboveFloorDb?: number;
  /** Eşiğin mutlak alt sınırı (dBFS) — çok sessiz ortamda nefesi konuşma sanmamak için. */
  minThresholdDb?: number;
  /** Bölge sayılmak için gereken ardışık çerçeve. */
  minRunFrames?: number;
  /** Bu kadar kısa boşlukla ayrılan bölgeler birleşir (ms). */
  mergeGapMs?: number;
  /** Bulunan konuşmanın toplam süresi bunun altındaysa yok sayılır (ms) — tık, nefes. */
  minSpeechMs?: number;
  /** Başa ve sona eklenen pay (ms). */
  preMs?: number;
  postMs?: number;
  /** Kesilen parçanın en fazla süresi (ms) — tek kelime için fazlasıyla geniş. */
  maxMs?: number;
  /**
   * Bölge bulunamasa bile tepe bunun üstündeyse pencere OLDUĞU GİBİ gidiyor.
   *
   * Yüzdelik taban, konuşma pencerenin neredeyse tamamını doldurduğunda
   * konuşmanın kendisine kuruluyor ve hiçbir çerçeve eşiği geçemiyor. Öyle
   * bir klibi "sessiz" sayıp atmak, yanlış kabulden çok daha kötü olan yanlış
   * reddi üretir (bu modun tarihinde bir kez oldu: "her cevap duyamadım").
   * Yüksek sesli bir pencereyi kesemiyorsak bütününü göndeririz; bedeli
   * yalnızca kota.
   */
  loudDb?: number;
};

const DEFAULTS: Required<VadOptions> = {
  frameMs: 20,
  floorPercentile: 0.1,
  aboveFloorDb: 8,
  minThresholdDb: -50,
  minRunFrames: 3,
  mergeGapMs: 300,
  minSpeechMs: 150,
  preMs: 250,
  postMs: 300,
  maxMs: 4000,
  loudDb: -35,
};

/** Çerçeve başına RMS, dBFS. */
export function frameLevels(pcm: Float32Array, sampleRate: number, frameMs = DEFAULTS.frameMs): Float32Array {
  const size = Math.max(1, Math.round((sampleRate * frameMs) / 1000));
  const frames = Math.floor(pcm.length / size);
  const db = new Float32Array(frames);
  for (let i = 0; i < frames; i++) {
    let sum = 0;
    const base = i * size;
    for (let j = 0; j < size; j++) {
      const x = pcm[base + j];
      sum += x * x;
    }
    db[i] = 10 * Math.log10(sum / size + 1e-12);
  }
  return db;
}

/**
 * Konuşma bölgesini bulur; yoksa `null`.
 *
 * Bölge = eşiği geçen en az `minRunFrames` ardışık çerçeve. Birbirine
 * `mergeGapMs`'ten yakın bölgeler tek sayılıyor — kelime içi kısa duraklar
 * (patlamalı ünsüzler, "der … Kühlschrank" arası) klibi bölmesin diye.
 */
export function findSpeech(pcm: Float32Array, sampleRate: number, options: VadOptions = {}): SpeechSpan | null {
  const o = { ...DEFAULTS, ...options };
  const size = Math.max(1, Math.round((sampleRate * o.frameMs) / 1000));
  const db = frameLevels(pcm, sampleRate, o.frameMs);
  if (!db.length) return null;

  const sorted = Float32Array.from(db).sort();
  const floorDb = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * o.floorPercentile))];
  const peakDb = sorted[sorted.length - 1];
  const threshold = Math.max(floorDb + o.aboveFloorDb, o.minThresholdDb);

  const regions: [number, number][] = [];
  let i = 0;
  while (i < db.length) {
    if (db[i] < threshold) {
      i++;
      continue;
    }
    let j = i;
    while (j < db.length && db[j] >= threshold) j++;
    if (j - i >= o.minRunFrames) regions.push([i, j]);
    i = j;
  }
  if (!regions.length) {
    if (peakDb < o.loudDb) return null;
    // Kesilemeyen ama sesli pencere: bütünü, üst sınıra kadar.
    const end = Math.min(pcm.length, Math.round((sampleRate * o.maxMs) / 1000));
    return { start: 0, end, floorDb, peakDb, speechMs: Math.round((end / sampleRate) * 1000) };
  }

  const gapFrames = Math.round(o.mergeGapMs / o.frameMs);
  const merged: [number, number][] = [];
  for (const r of regions) {
    const last = merged[merged.length - 1];
    if (last && r[0] - last[1] <= gapFrames) last[1] = r[1];
    else merged.push([r[0], r[1]]);
  }

  const firstFrame = merged[0][0];
  const lastFrame = merged[merged.length - 1][1];
  const speechMs = (lastFrame - firstFrame) * o.frameMs;
  if (speechMs < o.minSpeechMs) return null;

  const start = Math.max(0, firstFrame * size - Math.round((sampleRate * o.preMs) / 1000));
  const wanted = Math.min(pcm.length, lastFrame * size + Math.round((sampleRate * o.postMs) / 1000));
  const end = Math.min(wanted, start + Math.round((sampleRate * o.maxMs) / 1000));
  return { start, end, floorDb, peakDb, speechMs };
}

/** Konuşma bölgesini keser; yoksa `null`. */
export function trimSpeech(pcm: Float32Array, sampleRate: number, options?: VadOptions): { pcm: Float32Array; span: SpeechSpan } | null {
  const span = findSpeech(pcm, sampleRate, options);
  if (!span) return null;
  return { pcm: pcm.subarray(span.start, span.end), span };
}

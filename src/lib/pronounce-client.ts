"use client";

import type { PronounceScore } from "@/lib/pronounce";
import type { SpeechConfusion } from "@/lib/skills/types";

/**
 * Telaffuz puanı istemci yardımcıları (WP-20).
 *
 * `captureClip` tarayıcı tanıyıcısıyla PARALEL çalışan bir kayıt: öğrenci
 * mikrofona dokununca tanıyıcı da kayıt da başlar; tanıyıcı sustuğunda kayıt
 * durdurulur ve klip `/api/pronounce`'a gider. Tanıyıcının anlık kararı
 * (anlaşıldı mı) hemen görünür, puan ve ısı haritası bir–iki saniye sonra
 * gelir — bekletmez, ekler.
 *
 * WAV 16 kHz mono'ya çevrilir: sağlayıcıların "bozuk dosya" (400) verdiği
 * webm dilimleri sorunu böyle kapanıyor; decode edilemezse ham klip gider.
 */
export type Capture = { stop: () => Promise<Blob | null> };

export function captureClip(maxMs = 15_000): Promise<Capture | null> {
  if (typeof window === "undefined" || typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) return Promise.resolve(null);
  return navigator.mediaDevices
    .getUserMedia({ audio: { echoCancellation: false, noiseSuppression: true, channelCount: 1 } })
    .then((stream) => {
      const type = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find((t) => MediaRecorder.isTypeSupported?.(t)) ?? "";
      const rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
      const parts: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && parts.push(e.data);
      let stopped = false;
      const done = new Promise<Blob | null>((resolve) => {
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(parts.length ? new Blob(parts, { type: type || "audio/webm" }) : null);
        };
        rec.onerror = () => resolve(null);
      });
      rec.start();
      const guard = setTimeout(() => stop(), maxMs);
      function stop() {
        if (stopped) return;
        stopped = true;
        clearTimeout(guard);
        try {
          rec.state !== "inactive" ? rec.stop() : null;
        } catch {
          /* zaten kapalı */
        }
      }
      return {
        stop: async () => {
          stop();
          const blob = await done;
          return blob ? await toWav(blob).catch(() => blob) : null;
        },
      };
    })
    .catch(() => null);
}

/** Klibi 16 kHz mono PCM WAV'a çevirir — her sağlayıcının anladığı biçim. */
export async function toWav(blob: Blob, sampleRate = 16_000): Promise<Blob> {
  return encodeWav(await decodePcm(blob, sampleRate), sampleRate);
}

/**
 * Klibi tek kanal PCM'e çözer (varsayılan 16 kHz).
 *
 * Yürürken modu bunu ayrıca istiyor: WAV'a çevirmeden önce konuşma bölgesini
 * bulup yalnız onu gönderiyor (bkz. lib/vad).
 *
 * Çözme baştan sona **OfflineAudioContext** ile. Sebebi ölçülmüş bir arıza:
 * `new AudioContext()` telefon kilitliyken SUSPENDED başlıyor ve o bağlamda
 * `decodeAudioData` çözülmüyor — üretimde ekran kapanır kapanmaz her klip ham
 * webm olarak gitti ve Azure "desteklenmeyen biçim", ötekiler "bozuk dosya"
 * dedi (`die Verfügung` ekran daha açıkken çözülüp Azure'a WAV gittiği için
 * duyulmuştu, sonrakiler değil). OfflineAudioContext donanıma bağlı değil,
 * render güdümlü — kilitli ekranda da çözüyor. Sessiz döngü sekmeyi canlı
 * tuttuğu için `startRendering` de ilerliyor.
 */
export async function decodePcm(blob: Blob, sampleRate = 16_000): Promise<Float32Array> {
  const OAC =
    (typeof OfflineAudioContext !== "undefined" ? OfflineAudioContext : undefined) ||
    (window as unknown as { webkitOfflineAudioContext?: typeof OfflineAudioContext }).webkitOfflineAudioContext;
  if (!OAC) throw new Error("OfflineAudioContext yok");
  const buf = await blob.arrayBuffer();
  // Çözme için bir çerçevelik bağlam yeter; `decodeAudioData` kaynağın kendi
  // oranında döner, yeniden örnekleme ikinci bağlamda.
  const decoded = await new OAC(1, 1, sampleRate).decodeAudioData(buf);
  const length = Math.max(1, Math.ceil(decoded.duration * sampleRate));
  const off = new OAC(1, length, sampleRate);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const out = await off.startRendering();
  return out.getChannelData(0);
}

export function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + samples.length * 2, true);
  str(8, "WAVE");
  str(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, "data");
  v.setUint32(40, samples.length * 2, true);
  let o = 44;
  for (let i = 0; i < samples.length; i++, o += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buf], { type: "audio/wav" });
}

export type PronounceResponse = { ok: true; score: PronounceScore & { provider: string; hasWordTiming: boolean } } | { ok: false; reason: "not_configured" | "rate_limited" | "quota" | "failed" | "network" };

export async function askPronounce(blob: Blob, target: string, opts: { exerciseId?: string; confusions?: SpeechConfusion[]; language?: string } = {}): Promise<PronounceResponse> {
  const form = new FormData();
  form.append("audio", blob, blob.type.includes("wav") ? "clip.wav" : "clip.webm");
  form.append("target", target);
  if (opts.exerciseId) form.append("exerciseId", opts.exerciseId);
  if (opts.language) form.append("language", opts.language);
  if (opts.confusions?.length) form.append("confusions", JSON.stringify(opts.confusions.slice(0, 8)));
  try {
    const res = await fetch("/api/pronounce", { method: "POST", body: form, signal: AbortSignal.timeout(20_000) });
    if (res.ok) return { ok: true, score: (await res.json()) as PronounceScore & { provider: string; hasWordTiming: boolean } };
    if (res.status === 503) return { ok: false, reason: "not_configured" };
    if (res.status === 429) {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      return { ok: false, reason: d.error === "quota" ? "quota" : "rate_limited" };
    }
    return { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

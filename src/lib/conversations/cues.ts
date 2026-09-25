"use client";

/**
 * Dersin işitsel işaretleri — konuşma tabanlı arayüzün "imleç"leri.
 *
 * Ekrana bakmadan kullanılan bir akışta durum ancak sesle anlatılabiliyor:
 * mikrofonun açıldığını görmeyen kullanıcı boşluğa konuşuyor ya da açık
 * mikrofona sessiz kalıyor; cevap beklerken hiçbir şey duymayan kullanıcı
 * "takıldı mı?" diye ekrana dönüyor. İki işaret bu iki boşluğu dolduruyor:
 *
 *   - `cueListen`  — mikrofon gerçekten açıldığı anda kısa, yükselen iki nota.
 *     Telefonların kendi asistanlarının kullandığı dille aynı: "seni
 *     dinliyorum".
 *   - `startThinking` — cevap beklenirken saniyede bir yumuşak tık. Bekleme
 *     dolduran değil durum bildiren bir ses: "çalışıyorum, kopmadık".
 *
 * Sesler dosya değil, WebAudio ile yerinde üretiliyor: indirilecek şey yok,
 * gecikme yok ve ses seviyesi tek yerden ayarlı. Hepsi kısık (gain ≤ 0.06) —
 * işaret konuşmanın önüne geçmemeli.
 */

import { sharedAudioContext } from "@/lib/audio-context";

function tone(at: number, freq: number, dur: number, peak: number) {
  const c = sharedAudioContext();
  if (!c || c.state !== "running") return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  const t = c.currentTime + at;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Mikrofon açıldı: kısa, yükselen iki nota — "seni dinliyorum". */
export function cueListen() {
  tone(0, 660, 0.09, 0.06);
  tone(0.09, 880, 0.12, 0.06);
}

/**
 * Cevap beklenirken yumuşak tık döngüsü. Dönen işlev döngüyü durdurur;
 * çağıran taraf durdurma sözü vermeden başlatmamalı.
 */
export function startThinking(): () => void {
  const tick = () => tone(0, 520, 0.05, 0.03);
  // İlk tık hemen değil: kısa cevaplarda hiç ses çıkmaması en iyisi.
  const first = setTimeout(() => {
    tick();
  }, 700);
  const loop = setInterval(tick, 1100);
  return () => {
    clearTimeout(first);
    clearInterval(loop);
  };
}

/**
 * Koç ucunun istemci tarafı.
 *
 * Tek kural burada toplanıyor: **koç hiçbir zaman hata göstermez.** Sağlayıcı
 * limiti dolmuşsa, ağ kesikse ya da cevap boşsa boş string döner ve çağıran
 * taraf kendi çevrimdışı cevabında kalır. Alıştırmanın çalışması modele bağlı
 * olmamalı — model yalnızca cevabı iyileştiriyor.
 */

type SpeakingAsk = {
  kind: "speaking";
  target: string;
  heard: string[];
  missing: string[];
};

type DialogueAsk = {
  kind: "dialogue";
  ask: string;
  cue: string;
  heard: string;
  expected: string[];
};

/** Koç geç kalırsa alıştırma beklemez; çevrimdışı cevap zaten ekranda. */
const TIMEOUT_MS = 12_000;

export async function askCoach(payload: SpeakingAsk | DialogueAsk): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("/api/coach", {
      method: "POST",
      signal: controller.signal,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return "";
    const data = (await res.json()) as { text?: unknown };
    return typeof data.text === "string" ? data.text : "";
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

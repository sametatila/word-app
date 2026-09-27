"use client";

import type { PronounceScore } from "@/lib/pronounce";
import type { SpeechConfusion } from "@/lib/skills/types";
import { apiFetch } from "@/lib/api-fetch";

/**
 * Telaffuz puanı istemci yardımcısı (WP-20).
 *
 * SES GÖNDERİLMİYOR (Samet, 2026-09-27). Öğrencinin söylediğini tarayıcının
 * kendi tanıyıcısı yazıya çeviriyor (`captureSpeech`, components/microphone);
 * `/api/pronounce`a giden yalnız o döküm ve hedef cümle. Puan dökümle hedefin
 * karşılaştırması: kelime kelime durum (ısı haritası) var, zamanlama yok
 * (`hasWordTiming: false`). Boş döküm geçerli bir istek — "hiçbir şey
 * duyulmadı", puanı sıfır.
 *
 * Metin sunucudan dışarı çıkmadığı için ses rızası sorulmuyor.
 */
export type PronounceResponse =
  | { ok: true; score: PronounceScore & { provider: string; hasWordTiming: boolean; scoreToken?: string } }
  | { ok: false; reason: "not_configured" | "rate_limited" | "quota" | "failed" | "network" };

export async function askPronounce(transcript: string, target: string, opts: { exerciseId?: string; confusions?: SpeechConfusion[]; language?: string; examToken?: string } = {}): Promise<PronounceResponse> {
  const body = {
    transcript,
    target,
    ...(opts.exerciseId ? { exerciseId: opts.exerciseId } : {}),
    ...(opts.examToken ? { examToken: opts.examToken } : {}),
    ...(opts.language ? { language: opts.language } : {}),
    ...(opts.confusions?.length ? { confusions: opts.confusions.slice(0, 8) } : {}),
  };
  try {
    const res = await apiFetch("/api/pronounce", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      timeoutMs: 20_000,
    });
    if (res.ok) return { ok: true, score: (await res.json()) as PronounceScore & { provider: string; hasWordTiming: boolean; scoreToken?: string } };
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

import { api } from "../api/client";
import { t as tx } from "./i18n";
import type { TargetLang } from "./courses";
import { todayStr } from "../game/session";

/**
 * Yapay zekâ kontrolü — yerel hakem cevabı geçirmediğinde tek soru: bu cümle
 * kaynağın doğru bir karşılığı mı (anlam aynı, dilbilgisi doğru)?
 *
 * Çeviri turunun ikinci şansıyla (`game/rounds` `TranslateRound`) AYNI istek:
 * görev metni `assess.ai_translate` ("Çevir: …"), tek `target`, kısıt ve
 * alıştırma kimliği yok; sunucu bu biçimi tanıyıp iki soruluk istemi kullanıyor
 * (`lib/translate-check`). Eşik ve bekleme çeviri turununkiyle aynı sayılar
 * (parity "YAZILAN CEVAP HAKEMI"). Web `lib/sentence-rescue` karşılığı.
 *
 * Misafirde model yok (uç 403): istek atılmıyor. Hata, süre aşımı, ret →
 * `false`: yerel hüküm geçerli kalır.
 */
export const RESCUE_WAIT_MS = 6000;
export const RESCUE_ACCEPT = 75;

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

export async function rescueSentence(
  o: { source: string; target: string; typed: string; level?: string | null; lang: TargetLang; guest: boolean },
): Promise<boolean> {
  if (o.guest) return false;
  const level = LEVELS.find((l) => l === String(o.level ?? "").toUpperCase()) ?? "A1";
  try {
    const d = await api<{ result?: { score?: { overall?: number; task?: number } } }>("/api/assess", {
      method: "POST",
      replay: true, // aynı metnin tekrarı önbellekten döner (lib/assess hash), yeni kayıt açmaz
      timeoutMs: RESCUE_WAIT_MS,
      body: JSON.stringify({
        kind: "sentence",
        level,
        task: { prompt: tx("assess.ai_translate", { source: o.source }), target: o.target },
        answer: { text: o.typed },
        lang: o.lang,
        day: todayStr(),
      }),
    });
    const sc = d?.result?.score;
    return (sc?.overall ?? 0) >= RESCUE_ACCEPT && (sc?.task ?? 0) >= 3;
  } catch {
    return false;
  }
}

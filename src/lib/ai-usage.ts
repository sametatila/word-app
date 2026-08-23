import "server-only";
import { db } from "@/lib/db";
import { aiUsage } from "@/lib/db/schema";

/**
 * AI çağrılarının muhasebesi.
 *
 * Amaç bir süre sonra dönüp "hangi sağlayıcı gerçekten çalışıyor, hangisi
 * sürekli düşüyor, ne kadara mal oluyor, ne kadar yavaş" sorularını
 * cevaplayabilmek. Bu yüzden BAŞARISIZ çağrılar da yazılıyor — zincir düşen
 * sağlayıcıyı sessizce atladığı için, kaydedilmeyen bir hata hiç olmamış
 * gibi duruyor.
 *
 * Yazma hiçbir zaman hata fırlatmıyor ve beklenmiyor: muhasebe, muhasebesi
 * tutulan işi bekletmemeli.
 */

export type AiKind = "roleplay" | "coach" | "stt";

export type AiCallRecord = {
  kind: AiKind;
  provider: string;
  model: string;
  ok: boolean;
  status?: number;
  error?: string;
  ms?: number;
  promptTokens?: number;
  completionTokens?: number;
  audioSeconds?: number;
  limits?: Record<string, string>;
};

/** Hata metni kısaltılıyor: ayıklamaya yeter, tabloyu şişirmez. */
const MAX_ERROR = 300;

export function recordAiUsage(userId: string | null, call: AiCallRecord): void {
  void (async () => {
    try {
      await db.insert(aiUsage).values({
        userId,
        day: new Date().toISOString().slice(0, 10),
        kind: call.kind,
        provider: call.provider,
        model: call.model,
        ok: call.ok,
        status: Math.max(0, Math.round(call.status ?? 0)),
        error: call.error ? call.error.slice(0, MAX_ERROR) : null,
        ms: Math.max(0, Math.round(call.ms ?? 0)),
        promptTokens: call.promptTokens ?? null,
        completionTokens: call.completionTokens ?? null,
        audioSeconds: call.audioSeconds ?? null,
        limits: call.limits && Object.keys(call.limits).length ? call.limits : null,
      });
    } catch (err) {
      console.error("[ai-usage] yazılamadı", call.kind, call.provider, err);
    }
  })();
}

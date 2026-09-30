import "server-only";
import { chatChain, sttProviders } from "@/lib/chat-providers";
import { azureConfigured } from "@/lib/tts/azure";

/**
 * ŞU AN ETKİN yapay zekâ sağlayıcıları — izlemenin tek kaynağı.
 *
 * `ai_usage` geçmişi anlatıyor, bu fonksiyon bugünü: zincirler koddan ve
 * env'den kuruluyor (anahtarı olmayan sağlayıcı yok sayılıyor), elle tutulan
 * bir liste yok. Sağlayıcı eklemek ya da çıkarmak burayı değiştirmeyi
 * gerektirmiyor; uyarı motoru (`lib/alerts`) ve panel (Operasyon › Yapay zekâ
 * sağlığı) kendiliğinden izler.
 *
 * Adlar `ai_usage.provider` ile aynı (`recordAiUsage`e yazılan ad). Bir ad
 * birden çok rolde olabilir (Groq sohbet ve STT, Azure STT ve TTS).
 */
export type AiRole = "chat" | "stt" | "tts";
export type ActiveAiProvider = { name: string; role: AiRole; model: string; order: number };

export function activeAiProviders(): ActiveAiProvider[] {
  const chat = chatChain().map((p, i) => ({ name: p.name as string, role: "chat" as const, model: p.model, order: i + 1 }));
  const stt = sttProviders().map((p, i) => ({ name: p.name, role: "stt" as const, model: p.model, order: i + 1 }));
  /* Seslendirme sırası lib/tts/synth: Edge (anahtarsız, her zaman) → Azure (anahtar varsa). */
  const tts: ActiveAiProvider[] = [{ name: "edge", role: "tts", model: "edge-read-aloud", order: 1 }];
  if (azureConfigured()) tts.push({ name: "azure", role: "tts", model: "neural", order: 2 });
  return [...chat, ...stt, ...tts];
}

/** Etkin sağlayıcı adları (rol fark etmeksizin). */
export function activeAiProviderNames(): Set<string> {
  return new Set(activeAiProviders().map((p) => p.name));
}

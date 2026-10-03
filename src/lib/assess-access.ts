import "server-only";
import type { AssessKind } from "@/lib/assess-prompts";
import { findConversation } from "@/lib/conversations";
import { isPremium, takeUsage } from "@/lib/premium";
import { claimTiered, type Access, type AccessReason } from "@/lib/premium/access";
import type { PremiumGate } from "@/lib/premium/gates";
import { claimSkillAi } from "@/lib/premium/skill-access";
import { getExercise } from "@/lib/skills";

/**
 * Kimliği bir maddeye çözülmeyen yazma/konuşma/sohbet değerlendirmesi —
 * ücretsiz hesapta günlük hak (aşağıda "KİMLİKSİZ DEĞERLENDİRME").
 */
export const UNLINKED_FREE_PER_DAY = 3;

export type AssessDenied = { error: "premium_required"; reason: AccessReason; gate: PremiumGate };

/**
 * DEĞERLENDİRMENİN PREMIUM KAPISI — `/api/assess` ve `/api/assess/queue`.
 *
 * Kural `docs/premium/README.md` §2. Hangi sayacın düştüğünü İSTEK değil MADDE
 * belirliyor (`exerciseId` sunucudaki içerikten çözülüyor): Patika Yazma adımı
 * Patika Yazma sayacına, Beceriler alıştırması Beceriler sayacına, `chat`
 * konuşmanın kendi hakkına (`:scored` eki atılıyor). `sentence` bilerek
 * dışarıda. Hak alıştırmanın İLK değerlendirmesinde düşüyor (`claimTiered`).
 *
 * KİMLİKSİZ DEĞERLENDİRME DE SAYILIYOR (güvenlik denetimi 2026-10-03, O9).
 * Kapı yalnız `exerciseId` bir maddeye çözülünce çalışıyordu: kimliği
 * göndermeyen (ya da uydurma kimlik gönderen) ücretsiz istemci hak düşmeden,
 * yalnız emniyet tavanıyla sınırlı değerlendirme alıyordu. Meşru kimliksiz
 * çağrı tek: modül/seviye sınavının yazma bölümü, mobilin 2026-10-03 öncesi
 * sürümlerinde (madde kimliği ve mühürlü kâğıt yok). Ona yetecek kadar
 * küçük, AYRI bir günlük hak; premium'da yok.
 *
 * Çağıran misafiri ve mühürlü sınav görevini (`examVerified`) buraya
 * SOKMUYOR: misafirin sınırı kendi tek deneme hakkı, sınav yazması hak
 * düşürmüyor. Kuyruk da aynı kapıdan geçiyor; yoksa sağlayıcı kapalı
 * görünen bir istek kapıyı kuyruk üzerinden atlardı.
 */
export async function claimAssessAccess(userId: string, kind: AssessKind, exerciseId: string | null): Promise<AssessDenied | null> {
  if (kind !== "writing" && kind !== "speaking" && kind !== "chat") return null;
  let resolved = false;
  let gate: Access | null = null;
  if (exerciseId) {
    if (kind === "chat") {
      const conversation = await findConversation(exerciseId.replace(/:scored$/, ""));
      if (conversation) {
        resolved = true;
        gate = await claimTiered(userId, "conversation", conversation.level, conversation.id);
      }
    } else {
      const exercise = await getExercise(exerciseId);
      if (exercise) {
        resolved = true;
        gate = await claimSkillAi(userId, exercise);
      }
    }
  }
  if (gate && !gate.allowed) return { error: "premium_required", reason: gate.reason, gate: gate.gate };
  if (!resolved && !(await isPremium(userId)) && !(await takeUsage(userId, "ai_assess_unlinked", "day", UNLINKED_FREE_PER_DAY))) {
    return { error: "premium_required", reason: "quota_spent", gate: kind === "chat" ? "conversation" : kind };
  }
  return null;
}

import "server-only";
import { and, eq, like } from "drizzle-orm";
import { db } from "@/lib/db";
import { usageCounters } from "@/lib/db/schema";
import type { SkillExercise } from "@/lib/skills/types";
import type { SkillMeta } from "@/lib/skills";
import { canAiPractice, type Access } from "./access";
import { bumpUsage, getUsage, takeUsage } from "./quota";

/**
 * BECERİLER KÜTÜPHANESİNİN PREMIUM KAPISI.
 *
 * Kural `docs/premium/README.md` §2'de: okuma, dinleme ve dil bilgisi iki
 * katmanda da sınırsız; YAPAY ZEKÂYLA DEĞERLENDİRİLEN yazma ve konuşma
 * becerisinde ücretsiz hesapta 2 + 2 ömürlük hak, bitince haftada 2 yenilenen
 * hak (`canAiPractice(…, "skill")`). Premium'da günlük adil kullanım tavanı.
 *
 * Kural yazılıydı ama hiçbir yerde İŞLEMİYORDU: hakkı düşen `/api/premium/consume`
 * ucunu hiçbir istemci çağırmıyordu, `/api/assess` becerileri ders kotasıyla
 * soruyordu ve listelerde kilit çizilmiyordu — Beceriler'de her şey açıktı.
 *
 * HAK ALIŞTIRMA BAŞINA, İLK DEĞERLENDİRMEDE düşüyor ve bunu SUNUCU yapıyor:
 *   - Maliyet değerlendirme anında doğuyor; alıştırmayı açıp bakmak hak yakmamalı.
 *   - Bir alıştırma birden çok değerlendirme üretir (yaz, düzelt, yeniden
 *     gönder). Hakkı her çağrıda saymak iki hakkı tek alıştırmada bitirirdi.
 *   - İstemciye bırakılan sayaç sayaç değildir.
 * Hakkı düşmüş alıştırma "sahiplenilmiş" sayılıyor (`skill_ai:<id>`, ömürlük) ve
 * sonra kota bitse bile açık kalıyor — başladığın yazıyı bitirebilmelisin.
 *
 * Patika'nın (ünite) yazma adımları bu kapıdan GEÇMİYOR: onlar müfredat, kütüphane
 * değil; ders kotası ayrı bir karar.
 */

const OWNED_PREFIX = "skill_ai:";

/** Değerlendirmesi yapay zekâyla yapılan kütüphane alıştırması mı — hangi kota? */
export function gatedSkillKind(e: Pick<SkillExercise, "skill" | "unit"> & { monologue?: unknown }): "writing" | "speaking" | null {
  if (e.unit != null) return null;
  if (e.skill === "writing") return "writing";
  // A1–A2 söyleyiş drilli cihazın tanıyıcısıyla eşleşiyor, maliyeti yok; kilit
  // yalnız yapay zekânın puanladığı monologda.
  if (e.skill === "speaking" && e.monologue) return "speaking";
  return null;
}

/** Liste satırı için aynı karar — meta içerik taşımadığı için tür bilgisi ayrıca veriliyor. */
export function gatedMetaKind(m: Pick<SkillMeta, "skill" | "unit" | "level">): "writing" | "speaking" | null {
  if (m.unit != null) return null;
  if (m.skill === "writing") return "writing";
  // Kütüphanede konuşma A1–A2'de drill, B1'den itibaren monolog (bkz. 90-beceri-kutuphanesi).
  if (m.skill === "speaking" && m.level !== "A1" && m.level !== "A2") return "speaking";
  return null;
}

/** Hakkı düşmüş (sahiplenilmiş) kütüphane alıştırmaları. */
export async function ownedSkillIds(userId: string): Promise<string[]> {
  try {
    const rows = await db
      .select({ key: usageCounters.key })
      .from(usageCounters)
      .where(and(eq(usageCounters.userId, userId), eq(usageCounters.period, "all"), like(usageCounters.key, `${OWNED_PREFIX}%`)));
    return rows.map((r) => r.key.slice(OWNED_PREFIX.length));
  } catch {
    return [];
  }
}

export type SkillLibraryAccess = {
  writing: Access;
  speaking: Access;
  /** Hakkı düşmüş alıştırmalar — kota bitse de açık. */
  owned: string[];
};

/** Beceriler listesinin kilit görünümü — SAYMAZ. */
export async function skillLibraryAccess(userId: string, level: string): Promise<SkillLibraryAccess> {
  const [writing, speaking, owned] = await Promise.all([
    canAiPractice(userId, "writing", "skill", level),
    canAiPractice(userId, "speaking", "skill", level),
    ownedSkillIds(userId),
  ]);
  return { writing, speaking, owned };
}

/** Satır kilitli mi: kapılı tür, sahiplenilmemiş ve hak yok. */
export function isSkillLocked(m: Pick<SkillMeta, "id" | "skill" | "unit" | "level">, access: SkillLibraryAccess | null): boolean {
  if (!access) return false;
  const kind = gatedMetaKind(m);
  if (!kind) return false;
  if (access.owned.includes(m.id)) return false;
  return !access[kind].allowed;
}

/**
 * Değerlendirme isteğinin kapısı — `/api/assess` çağırıyor.
 *
 * Kapılı değilse `null` (çağıran kendi kuralına bakar). Sahiplenilmişse
 * sayılmadan geçer. Değilse hak sorulur; varsa alıştırma sahiplenilir ve hak
 * ANCAK sahiplenme bu istekte olduysa düşer — aynı anda gelen iki istek hakkı
 * iki kez yakmasın (`takeUsage` tek ifadede kontrol + yazma).
 */
export async function claimSkillAi(userId: string, exercise: SkillExercise, level: string): Promise<Access | null> {
  const kind = gatedSkillKind(exercise as SkillExercise & { monologue?: unknown });
  if (!kind) return null;
  const key = OWNED_PREFIX + exercise.id;
  if ((await getUsage(userId, key, "all")) > 0) return { allowed: true, reason: "free_quota", gate: kind };
  const access = await canAiPractice(userId, kind, "skill", level);
  if (!access.allowed) return access;
  if ((await takeUsage(userId, key, "all", 1)) && access.counter) {
    await bumpUsage(userId, access.counter.key, access.counter.period);
  }
  return access;
}

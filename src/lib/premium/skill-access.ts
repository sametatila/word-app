import "server-only";
import type { SkillExercise } from "@/lib/skills/types";
import type { SkillMeta } from "@/lib/skills";
import { claimTiered, unlockOverview, type Access, type TieredSurface } from "./access";
import type { TieredUnlock } from "./unlock";

/**
 * BECERİLER KÜTÜPHANESİNİN VE PATİKA YAZMA ADIMININ PREMIUM KAPISI.
 *
 * Kural `docs/premium/README.md` §2'de (2026-09-25): okuma, dinleme, dil bilgisi
 * ve A1–A2 konuşma drili iki katmanda da sınırsız; YAPAY ZEKÂYLA DEĞERLENDİRİLEN
 * Beceriler yazma ve B1+ konuşma (monolog) SEVİYE BAŞINA 2'şer + "bitir ve 7
 * günlük seri yap" dilimleri. Patika Yazma adımı (ünite egzersizi) da seviye
 * başına 2 + aynı dilimler ama AYRI sayaç. Premium'da günlük kötüye kullanım tavanı.
 *
 * HAK ALIŞTIRMA BAŞINA, İLK DEĞERLENDİRMEDE düşüyor ve bunu SUNUCU yapıyor:
 *   - Maliyet değerlendirme anında doğuyor; alıştırmayı açıp bakmak hak yakmamalı.
 *   - Bir alıştırma birden çok değerlendirme üretir (yaz, düzelt, yeniden
 *     gönder). Hakkı her çağrıda saymak iki hakkı tek alıştırmada bitirirdi.
 *   - İstemciye bırakılan sayaç sayaç değildir.
 * Hakkı düşmüş alıştırma "sahiplenilmiş" sayılıyor (`skill_ai:<id>`,
 * `owned_lesson:<id>`, ömürlük) ve sonra kota bitse bile açık kalıyor —
 * başladığın yazıyı bitirebilmelisin.
 */

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

/** Liste kilidinin tek seviyelik görünümü. */
function asAccess(state: TieredUnlock, gate: "writing" | "speaking"): Access {
  if (state.premium) return { allowed: true, reason: "premium", gate };
  return {
    allowed: state.remaining > 0,
    reason: state.remaining > 0 ? "free_quota" : "quota_spent",
    gate,
    quota: { allowed: state.remaining > 0, used: state.used, limit: state.open, remaining: state.remaining, period: "all" },
  };
}

export type SkillLibraryAccess = {
  /** `level` seviyesinin yazma kapısı — eski istemciler bunu okuyor. */
  writing: Access;
  /** `level` seviyesinin konuşma kapısı — eski istemciler bunu okuyor. */
  speaking: Access;
  /** Hakkı düşmüş alıştırmalar — kota bitse de açık. */
  owned: string[];
  /** Seviye başına kapılar — hak 2026-09-25'ten beri seviye başına. */
  levels: Record<string, { writing: Access; speaking: Access }>;
};

/** Beceriler listesinin kilit görünümü — SAYMAZ. Hesap `unlockOverview`in aynısı. */
export async function skillLibraryAccess(userId: string, level: string): Promise<SkillLibraryAccess> {
  const o = await unlockOverview(userId);
  const levels: SkillLibraryAccess["levels"] = {};
  for (const [l, v] of Object.entries(o.levels)) {
    levels[l] = { writing: asAccess(v.skillWriting, "writing"), speaking: asAccess(v.skillSpeaking, "speaking") };
  }
  const here = levels[level] ?? levels.A1;
  return { writing: here.writing, speaking: here.speaking, owned: o.owned.skills, levels };
}

/** Satır kilitli mi: kapılı tür, sahiplenilmemiş ve O SEVİYEDE hak yok. */
export function isSkillLocked(m: Pick<SkillMeta, "id" | "skill" | "unit" | "level">, access: SkillLibraryAccess | null): boolean {
  if (!access) return false;
  const kind = gatedMetaKind(m);
  if (!kind) return false;
  if (access.owned.includes(m.id)) return false;
  return !(access.levels[m.level]?.[kind] ?? access[kind]).allowed;
}

/**
 * Değerlendirme isteğinin kapısı — `/api/assess` çağırıyor.
 *
 * Kapılı değilse `null` (çağıran kendi kuralına bakar). Kütüphane alıştırması
 * Beceriler sayacına, Patika'nın yazma adımı (ünite egzersizi) Patika Yazma
 * sayacına düşüyor — ikisi AYRI (2026-09-25). Seviye alıştırmanın KENDİ
 * seviyesi; istemcinin gönderdiği seviyeye bakılmıyor, yoksa bir seviyenin
 * hakkı başka seviyenin alıştırmasına harcanabilirdi.
 */
export async function claimSkillAi(userId: string, exercise: SkillExercise): Promise<Access | null> {
  const surface = exerciseSurface(exercise);
  if (!surface) return null;
  return claimTiered(userId, surface, exercise.level, exercise.id);
}

/** Alıştırmanın hangi kotalı yüzeye düştüğü — yoksa null. */
export function exerciseSurface(exercise: SkillExercise): TieredSurface | null {
  if (exercise.unit != null) return exercise.skill === "writing" ? "path_writing" : null;
  const kind = gatedSkillKind(exercise as SkillExercise & { monologue?: unknown });
  return kind === "writing" ? "skill_writing" : kind === "speaking" ? "skill_speaking" : null;
}

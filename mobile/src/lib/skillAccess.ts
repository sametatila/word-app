import { api } from "../api/client";

/**
 * Beceriler kütüphanesinin premium kilidi — mobil tarafı.
 *
 * Karar SUNUCUDA (`src/lib/premium/skill-access.ts`, `/api/skills/access`);
 * burası yalnız çiziyor. Kural: yapay zekâyla değerlendirilen yazma ve konuşma
 * (B1+ monolog) alıştırmalarında ücretsiz hak bitince, daha önce hakkı düşmemiş
 * alıştırma kilitli. Okuma, dinleme, dil bilgisi ve A1–A2 söyleyiş drilli açık.
 * Kapıyı `/api/assess` tutuyor; kilit okunamazsa liste açık çizilir.
 */
export type SkillGate = {
  allowed: boolean;
  reason: string;
  quota?: { remaining: number; limit: number; period: "day" | "week" | "all" };
};

/**
 * `levels`: hak 2026-09-25'ten beri SEVİYE BAŞINA — her seviyenin kapısı.
 * Üst düzeydeki `writing`/`speaking` eski sunucunun tek (seviyesiz) kapısı.
 */
export type SkillAccess = { writing: SkillGate; speaking: SkillGate; owned: string[]; levels?: Record<string, { writing: SkillGate; speaking: SkillGate }> };

export async function fetchSkillAccess(): Promise<SkillAccess | null> {
  try {
    const r = await api<{ access: SkillAccess | null }>("/api/skills/access");
    return r.access;
  } catch {
    return null;
  }
}

/** Web `gatedMetaKind` ile aynı karar. */
export function gatedMetaKind(m: { skill: string; level: string; unit?: number | null }): "writing" | "speaking" | null {
  if (m.unit != null) return null;
  if (m.skill === "writing") return "writing";
  if (m.skill === "speaking" && m.level !== "A1" && m.level !== "A2") return "speaking";
  return null;
}

/** Web `isSkillLocked` ile aynı karar. */
export function isSkillLocked(m: { id: string; skill: string; level: string; unit?: number | null }, access: SkillAccess | null): boolean {
  if (!access) return false;
  const kind = gatedMetaKind(m);
  if (!kind) return false;
  if (access.owned.includes(m.id)) return false;
  return !(access.levels?.[m.level]?.[kind] ?? access[kind]).allowed;
}

/** Bir seviyenin kapısı — eski sunucuda seviyesiz kapıya düşer. */
export function levelGate(access: SkillAccess | null, level: string, kind: "writing" | "speaking"): SkillGate | null {
  if (!access) return null;
  return access.levels?.[level]?.[kind] ?? access[kind];
}

/** Web `lib/premium/gate-note` ile aynı: hangi anahtar, hangi sayı. */
export function gateNote(g: SkillGate | null | undefined): { key: string; n: number } | null {
  if (!g) return null;
  if (g.reason === "premium") return null;
  if (g.reason === "fair_use") return { key: "gate.fair_use", n: g.quota?.limit ?? 0 };
  /* Haftada yenilenen hak 2026-09-25'te kalktı: hak bitince yol seri +
     bitirmekten ya da Premium'dan geçiyor (bkz. `ui/UnlockProgress`). */
  if (!g.allowed) return { key: "gate.quota_spent_total", n: 0 };
  if (!g.quota) return null;
  return { key: g.quota.period === "day" ? "gate.quota_left_day" : "gate.quota_left_total", n: g.quota.remaining };
}

/**
 * Patika ünite öğeleri — tür etiketleri ve tipler. İçerik sunucudan (immersion
 * track) gelir; burada yalnız paylaşılan tipler ve Türkçe tür adları var.
 */
export type ItemKind = "lesson" | "read" | "listen" | "write" | "grammar" | "quiz" | "checkpoint";
export type ItemStatus = "done" | "current" | "locked";
export type UnitItem = { id: string; kind: ItemKind; title: string; status: ItemStatus };

export const KIND_LABEL: Record<ItemKind, string> = {
  lesson: "Ders",
  read: "Okuma",
  listen: "Dinleme",
  write: "Yazma",
  grammar: "Dil bilgisi",
  quiz: "Tekrar",
  checkpoint: "Kontrol",
};

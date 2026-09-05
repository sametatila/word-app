/**
 * Patika ünite öğeleri — tür etiketleri ve tipler. İçerik sunucudan (immersion
 * track) gelir; burada yalnız paylaşılan tipler ve Türkçe tür adları var.
 */
export type ItemKind = "lesson" | "read" | "listen" | "write" | "speak" | "grammar" | "quiz" | "checkpoint";
export type ItemStatus = "done" | "current" | "locked";
export type UnitItem = { id: string; kind: ItemKind; title: string; status: ItemStatus };

/** Tür -> sözlük anahtarı; etiket kullanım anında t() ile çözülür. */
export const KIND_KEY: Record<ItemKind, string> = {
  lesson: "unitkind.lesson",
  read: "unitkind.read",
  listen: "unitkind.listen",
  write: "unitkind.write",
  speak: "unitkind.speaking",
  grammar: "unitkind.grammar",
  quiz: "unitkind.quiz",
  checkpoint: "unitkind.checkpoint",
};

/**
 * Patika ünite öğeleri — tür etiketleri ve tipler. İçerik sunucudan (immersion
 * track) gelir; burada yalnız paylaşılan tipler ve Türkçe tür adları var.
 */
/*
  Sunucunun ürettiği tür kümesiyle BİREBİR (`src/lib/immersion/types`
  `ImmersionItemKind`). Burada fazladan bir `speak` vardı: sunucu onu hiç
  üretmiyor, mobilin yerel patika kurucusu üretmiyor ve `UnitScreen` de
  dallanmıyordu - yani hiçbir ünitede çıkamayan bir düğüm türü. Sözlük
  anahtarı (`unitkind.speaking`) DURUYOR, çünkü onu Yapabildiklerim ve
  Yazılarım ekranları beceri adı olarak kullanıyor.
*/
export type ItemKind = "conversation" | "read" | "listen" | "write" | "grammar" | "quiz" | "unitQuiz";
export type ItemStatus = "done" | "current" | "locked";
export type UnitItem = { id: string; kind: ItemKind; title: string; status: ItemStatus };

/** Tür -> sözlük anahtarı; etiket kullanım anında t() ile çözülür. */
export const KIND_KEY: Record<ItemKind, string> = {
  conversation: "unitkind.conversation",
  read: "unitkind.read",
  listen: "unitkind.listen",
  write: "unitkind.write",
  grammar: "unitkind.grammar",
  quiz: "unitkind.quiz",
  unitQuiz: "unitkind.unit_quiz",
};

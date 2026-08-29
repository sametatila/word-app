/**
 * Demo ünite içeriği — Patika ünite-detay ekranını API'siz göstermek için.
 * Gerçek item'lar immersion track'ten (www.exfe.me) gelecek; bu, "Tanışma ve
 * ben" (A1 · Ünite 2) adımlarının temsili bir dizisi.
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

export const DEMO_UNIT_ITEMS: UnitItem[] = [
  { id: "u2-1", kind: "lesson", title: "Merhaba, ben Emma", status: "done" },
  { id: "u2-2", kind: "read", title: "Ich heiße Emma", status: "done" },
  { id: "u2-3", kind: "grammar", title: "sein fiili: bin/bist/ist", status: "done" },
  { id: "u2-4", kind: "listen", title: "Ich heiße Emma", status: "current" },
  { id: "u2-5", kind: "lesson", title: "Nereden geliyorsun?", status: "locked" },
  { id: "u2-6", kind: "write", title: "Kendini tanıt", status: "locked" },
  { id: "u2-7", kind: "read", title: "Woher kommst du?", status: "locked" },
  { id: "u2-8", kind: "grammar", title: "Soru kelimeleri: wer/wie/woher", status: "locked" },
  { id: "u2-9", kind: "listen", title: "Im Deutschkurs", status: "locked" },
  { id: "u2-10", kind: "quiz", title: "Ara tekrar", status: "locked" },
  { id: "u2-11", kind: "lesson", title: "Yaş ve numara", status: "locked" },
  { id: "u2-12", kind: "write", title: "Kısa bir mesaj yaz", status: "locked" },
  { id: "u2-13", kind: "checkpoint", title: "Ünite kontrolü", status: "locked" },
];

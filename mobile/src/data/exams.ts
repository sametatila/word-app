import { courseOrDefault, type CourseId } from "../lib/courses";

/**
 * Sınav kataloğu — HEDEF DİLE göre.
 *
 * Modül ve beceri adları sınavın kendi terimleridir (Almanca isimlendirilir)
 * ve çevrilmez; altlarındaki beceri adı arayüz dilinde gösterilir. Katalog
 * eskiden ExamPrepScreen'de sabit bir diziydi: İngilizce kursu seçen
 * kullanıcıya Almanca sınav modülleri gösteriliyordu — o kursta karşılığı
 * olmayan bir sınav vaadi.
 *
 * SINAV ADI ARTIK ÜÇÜNCÜ TARAF SERTİFİKASI DEĞİL. Burada "telc Deutsch"
 * yazıyordu, ama o sınava özel bir hazırlık yapmıyoruz: bizim sınavımız
 * `lib/exam.ts`teki modül sınavı (A1.1 … A1.10, her biri o modülün kendi
 * sahnesinden) ve seviye sınavıdır. Bir sertifikanın adını yazmak
 * hazırlamadığımız bir şeyin sözünü vermek olurdu; başlık artık sınavın ne
 * olduğunu söylüyor, kimin olduğunu değil.
 *
 * Hedef dile bağlanması bilinçli: Zürih Almancası kursunun hedefi de Almanca,
 * dolayısıyla aynı sınava hazırlanır. İngilizcenin sınav içeriği henüz yok;
 * boş katalog ekranın dürüst boş durumunu açıyor.
 */
export type ExamSkill = "reading" | "listening" | "writing" | "speaking";

export type ExamModule = {
  key: string;
  /** Sınavın kendi terimi — çevrilmez. */
  label: string;
  /** Altındaki beceri adının sözlük anahtarı — arayüz dilinde. */
  subKey: string;
  skill: ExamSkill;
  kind: "read" | "listen" | "write" | "speak";
  tint: string;
  premium: boolean;
};

export type ExamCatalog = {
  /** Sınav adları (sekme başlıkları) — çevrilmez. */
  exams: string[];
  modules: ExamModule[];
};

const GERMAN: ExamCatalog = {
  exams: ["Deutschprüfung"],
  modules: [
    { key: "lesen", label: "Lesen", subKey: "unitkind.read", skill: "reading", kind: "read", tint: "info", premium: false },
    { key: "hoeren", label: "Hören", subKey: "unitkind.listen", skill: "listening", kind: "listen", tint: "accent", premium: false },
    { key: "schreiben", label: "Schreiben", subKey: "unitkind.write", skill: "writing", kind: "write", tint: "success", premium: true },
    { key: "sprechen", label: "Sprechen", subKey: "unitkind.speaking", skill: "speaking", kind: "speak", tint: "primary", premium: true },
  ],
};

const EMPTY: ExamCatalog = { exams: [], modules: [] };

const BY_TARGET: Record<string, ExamCatalog> = { de: GERMAN };

export function examCatalogFor(course: CourseId): ExamCatalog {
  return BY_TARGET[courseOrDefault(course).targetLang] ?? EMPTY;
}

export function hasExams(course: CourseId): boolean {
  return examCatalogFor(course).modules.length > 0;
}

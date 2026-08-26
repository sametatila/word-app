import type { ExamCando } from "@/lib/lessons/module-exam";
import type { CefrLevel, SpeechConfusion, WritingTask } from "@/lib/skills/types";
import type { Segment } from "@/lib/lessons/types";
import type { Round } from "@/lib/types";

/**
 * Sınav kâğıdının SAF yarısı: tipler, bölüm adları, ağırlıklar, puanlama.
 *
 * `lib/exam.ts` sunucuya bağlı (veritabanı, sağlayıcı yoklaması, olay
 * kaydı) ve `server-only` taşıyor. Oynatıcı ise bir istemci bileşeni ve
 * aynı sabitlere ihtiyaç duyuyor — bölüm başlıkları, sıra, ağırlıklar.
 * İkisini tek dosyada tutmak, istemci paketine sunucu modülünü sokuyordu.
 *
 * Buradaki hiçbir şey veriye dokunmuyor; `scoreSections` de saf ve bu yüzden
 * birim testinden (e2e §42) doğrudan çağrılabiliyor.
 */

export type ExamKind = "module" | "level";
export type ExamSectionId = "vocab" | "grammar" | "produce" | "reading" | "listening" | "speaking" | "writing";

/** Bölümlerin kâğıttaki sırası — hem sunucu hem oynatıcı bunu izliyor. */
export const SECTION_ORDER: ExamSectionId[] = ["vocab", "grammar", "produce", "reading", "listening", "speaking", "writing"];

export const SECTION_TITLE: Record<ExamSectionId, string> = {
  vocab: "Kelime",
  grammar: "Dilbilgisi",
  produce: "Cümle kurma",
  reading: "Okuma",
  listening: "Dinleme",
  speaking: "Konuşma",
  writing: "Yazma",
};

/** Bölümlerin Almanca adı — sınav havası kâğıdın dilinden başlıyor. */
export const SECTION_TITLE_DE: Record<ExamSectionId, string> = {
  vocab: "Wortschatz",
  grammar: "Grammatik",
  produce: "Satzbau",
  reading: "Lesen",
  listening: "Hören",
  speaking: "Sprechen",
  writing: "Schreiben",
};

/**
 * Bölümün toplam puandaki payı (yüzde).
 *
 * Kâğıtta bulunmayan bölüm (AI ya da STT sağlayıcısı yoksa) payını
 * bırakır ve kalan bölümler oranlarını koruyarak %100'e ölçeklenir.
 */
export const SECTION_WEIGHT: Record<ExamKind, Record<ExamSectionId, number>> = {
  module: { vocab: 12, grammar: 18, produce: 25, reading: 8, listening: 12, speaking: 15, writing: 10 },
  level: { vocab: 12, grammar: 18, produce: 20, reading: 12, listening: 12, speaking: 14, writing: 12 },
};

export type GrammarItem =
  | {
      /** Tablo hücresi: satır anahtarı + sütun başlığı → biçim. */
      kind: "cell";
      id: string;
      sheet: string;
      key: string;
      label: string;
      options: string[];
      answer: number;
    }
  | {
      /** Hüküm: modülün dersinden gelen cümle doğru mu yanlış mı. */
      kind: "judge";
      id: string;
      statement: string;
      answer: boolean;
      /** Gerekçe — sınav sırasında değil, sonundaki dökümde okunur. */
      why: Segment[];
    };

/** Üretim maddesi: Türkçe yönerge → Almanca cümle. */
export type ProduceExamItem = {
  id: string;
  prompt: string;
  de: string;
  accept: string[];
  /** "type" boş satıra yazdırır, "order" parçaları sıralatır. */
  mode: "type" | "order";
  /** order modunda karışık parçalar. */
  chunks?: string[];
};

export type TextItem = {
  id: string;
  title: string;
  titleTr?: string;
  /** Metin türü ya da dinleme durumu — Türkçe, sorudan önce okunur. */
  genre?: string;
  situation?: string;
  text?: string;
  segments?: { speaker?: string; text: string; tr?: string }[];
  questions: { text: string; textTr?: string; options: string[]; answer: number }[];
};

export type WritingItem = { id: string; task: Extract<WritingTask, { kind: "free" }> };
/** Söyleyiş maddesi: durum, cümle, Türkçesi — puan `/api/pronounce`tan. */
export type SpeakingItem = { id: string; de: string; tr: string; situation?: string; hint?: string; confusions?: SpeechConfusion[] };

/** Kâğıdın kapağı: hangi modül, ne ölçüyor, geçince ne kazanılıyor. */
export type ExamCover = {
  code: string;
  titleDe: string;
  titleTr: string;
  focus: { de: string; tr: string }[];
  canDo: ExamCando[];
};

export type ExamPaper = {
  kind: ExamKind;
  level: CefrLevel;
  module: number | null;
  /** Ön koşul sağlanmadıysa true: sonuç sayılmaz. */
  trial: boolean;
  /** Toplam süre (saniye). */
  seconds: number;
  cover: ExamCover | null;
  sections: {
    vocab: Round[];
    grammar: GrammarItem[];
    produce: ProduceExamItem[];
    reading: TextItem[];
    listening: TextItem[];
    speaking: SpeakingItem[];
    writing: WritingItem[];
  };
  seed: string;
};

export const MODULE_SECONDS = 25 * 60;
export const LEVEL_SECONDS = 45 * 60;
export const PASS_TOTAL = 70;
export const PASS_SECTION = 50;
export const MODULE_PREREQ = 0.8;

export type SectionScore = { id: ExamSectionId; correct: number; total: number; pct: number; weight: number };

export type ExamSubmission = {
  /** Bölüm başına doğru/toplam — nesnel bölümler istemcide sayılır, sunucu sınırlar. */
  sections: { id: ExamSectionId; correct: number; total: number }[];
  /** Kelime bölümünün cevapları — SRS'e ve hata tipine yazılır. */
  vocabAnswers?: { wordId: number; game: string; correct: boolean; quality?: number; errorType?: string; detail?: string }[];
  /** Yazma bölümü rubrik puanı (0–100) — `/api/assess` sonucundan. */
  writingScore?: number | null;
  /** Konuşma bölümü: maddelerin telaffuz puanı ortalaması (0–100) — `/api/pronounce`. */
  speakingScore?: number | null;
  seconds: number;
};

export type ExamResult = {
  id: number;
  kind: ExamKind;
  level: CefrLevel;
  module: number | null;
  trial: boolean;
  sections: SectionScore[];
  total: number;
  passed: boolean;
  at: string;
};

export function scoreSections(sub: ExamSubmission, kind: ExamKind = "module"): { sections: SectionScore[]; total: number; passed: boolean } {
  const weights = SECTION_WEIGHT[kind];
  const present = sub.sections.filter((s) => s.total > 0);
  const weightSum = present.reduce((a, s) => a + (weights[s.id] ?? 0), 0) || 1;
  const sections: SectionScore[] = present.map((s) => {
    const rubric = s.id === "writing" ? sub.writingScore : s.id === "speaking" ? sub.speakingScore : null;
    const correct = typeof rubric === "number" ? Math.round((Math.max(0, Math.min(100, rubric)) / 100) * s.total * 100) / 100 : Math.max(0, Math.min(s.total, s.correct));
    return {
      id: s.id,
      correct,
      total: s.total,
      pct: Math.round((100 * correct) / s.total),
      // Eksik bölümün payı kalanlara oranla dağılıyor; kâğıtta olmayan bölüm
      // ne ceza ne armağan.
      weight: Math.round((100 * (weights[s.id] ?? 0)) / weightSum),
    };
  });
  const total = Math.round(sections.reduce((a, s) => a + (s.pct * (weights[s.id] ?? 0)) / weightSum, 0));
  const passed = total >= PASS_TOTAL && sections.every((s) => s.pct >= PASS_SECTION);
  return { sections, total, passed };
}


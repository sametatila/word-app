import { api } from "../api/client";
import { todayStr } from "./session";

/**
 * GERÇEK seviye testi — web ile aynı sözleşme (/api/placement, DEPLOY EDİLMİŞ).
 * Kelime maddeleri sunucudan (seviye seviye), puanlama da sunucuda. Demo YOK:
 * oturum açık kullanıcı gerçek testi alır, misafir ekranda demo'ya düşer.
 */
export type PlacementVocab = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  de: string;
  artikel: string | null;
  options: string[];
  answer: number; // doğru şıkkın index'i
};

type PlacementTest = { vocab: Record<string, PlacementVocab[]>; grammar: Record<string, PlacementGrammar[]>; reading: PlacementText[]; listening: PlacementText[] };

export type PlacementAnswer = {
  /* Dört aşama: sunucu `PlacementStage` olarak dördünü de doğruluyor ve
     `perSkill` her biri için ayrı bir seviye çıkarıyor. */
  stage: "vocab" | "grammar" | "reading" | "listening";
  level: PlacementVocab["level"];
  itemId: string;
  correct: boolean;
};

export type PlacementRecord = {
  id: number;
  suggested: string;
  score: number;
  perSkill: Record<string, string | null>;
};

const LEVELS: PlacementVocab["level"][] = ["A1", "A2", "B1", "B2"];

/**
 * SON ALMA + YENİDEN ALINABİLİR Mİ.
 *
 * `GET /api/placement` bunu baştan beri veriyor ve web soruyor: test 30 günde
 * bir alınabiliyor, arada "N gün sonra" deniyor. MOBİL HİÇ SORMUYORDU - ve
 * sunucu bu bekleme süresini ZORLAMIYOR (yalnız bildiriyor), yani Android'de
 * test istenildiği kadar tekrarlanabiliyor ve her bitiş yeni bir kayıt yazıp
 * seviyeyi değiştirebiliyordu. Sık tekrar seviye tahminini "ezber"e çevirir;
 * kuralın kendisi `RETAKE_DAYS` yorumunda yazılı.
 */
export type PlacementStatus = {
  last: (PlacementRecord & { at: string; accepted: string | null }) | null;
  canRetake: boolean;
  retakeDays: number;
};

export function fetchPlacementStatus(): Promise<PlacementStatus> {
  return api<PlacementStatus>("/api/placement");
}

/**
 * DÖRT AŞAMA — kelime, dil bilgisi, okuma, dinleme.
 *
 * Sunucu dördünü de baştan beri gönderiyor; mobil tipi YALNIZCA `vocab`
 * taşıyordu, yani Android'de seviye testi kelime ölçüyor, öteki üç beceri hiç
 * sorulmuyor ve sonuçtaki `perSkill` üç alanı boş dönüyordu (web-parity
 * §11.119'da "üç ekran + ses yolu gerekiyor" diye kayıtlıydı — gereken parça
 * mobilde zaten vardı: şıklı tur, metin bloğu ve TTS).
 *
 * Maddeler DÜZLEŞTİRİLİYOR: web aşama içinde uyarlanarak seviye atlıyor
 * (`nextLevel`), mobil hepsini soruyor. Bu Android'in kelime aşamasında
 * baştan beri yaptığı şey ve puanlama sunucuda cevap başına seviyeye baktığı
 * için sonuç DAHA doğru oluyor; bedeli testin biraz uzaması.
 */
export type PlacementQuestion =
  | { kind: "vocab" | "grammar"; level: PlacementVocab["level"]; itemId: string; question: string; options: string[]; answer: number; label?: string }
  | { kind: "reading" | "listening"; level: PlacementVocab["level"]; itemId: string; question: string; options: string[]; answer: number; title: string; text?: string; segments?: { speaker?: string; text: string }[] };

export type PlacementGrammar = { id: string; level: PlacementVocab["level"]; sheet: string; key: string; label: string; options: string[]; answer: number };
export type PlacementText = {
  id: string;
  level: PlacementVocab["level"];
  title: string;
  text?: string;
  segments?: { speaker?: string; text: string }[];
  questions: { text: string; options: string[]; answer: number }[];
};

/** Testi başlatır ve dört aşamanın maddelerini tek sıraya düzleştirir. */
export async function startPlacement(): Promise<PlacementQuestion[]> {
  const r = await api<{ test: PlacementTest }>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "start" }),
  });
  const out: PlacementQuestion[] = [];
  for (const lvl of LEVELS) {
    for (const it of r.test?.vocab?.[lvl] ?? []) {
      out.push({ kind: "vocab", level: it.level, itemId: it.id, question: withArtikel(it.artikel, it.de), options: it.options, answer: it.answer });
    }
  }
  for (const lvl of LEVELS) {
    for (const g of r.test?.grammar?.[lvl] ?? []) {
      out.push({ kind: "grammar", level: g.level, itemId: g.id, question: g.label, options: g.options, answer: g.answer, label: g.sheet });
    }
  }
  for (const kind of ["reading", "listening"] as const) {
    for (const t of r.test?.[kind] ?? []) {
      t.questions.forEach((q, qi) => {
        out.push({ kind, level: t.level, itemId: `${t.id}#${qi}`, question: q.text, options: q.options, answer: q.answer, title: t.title, text: t.text, segments: t.segments });
      });
    }
  }
  return out;
}

const withArtikel = (a: string | null, de: string) => (a ? `${a} ${de}` : de);

/** Cevapları sunucuya verir; gerçek önerilen seviyeyi (sunucu puanlaması) döndürür. */
export async function finishPlacement(answers: PlacementAnswer[]): Promise<PlacementRecord> {
  return api<PlacementRecord>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "finish", answers, day: todayStr() }),
  });
}

/** Önerilen seviyeyi kabul eder — profili günceller (sunucu tarafı). */
export async function acceptPlacement(id: number, level: string): Promise<void> {
  await api("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "accept", id, level }),
  });
}

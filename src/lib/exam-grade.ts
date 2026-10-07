import "server-only";
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { matchSentence } from "@/lib/sentence-match";
import type { TargetLang } from "@/lib/courses";
import { translate, type NativeLang } from "@/lib/i18n/dict";
import type { ExamKind, ExamPaper } from "@/lib/exam-types";

/**
 * Sunucu-tarafı nesnel sınav puanlaması — güvenlik denetimi F7'nin kalıntısı.
 *
 * SORUN: `/api/exam` finish, nesnel bölümlerin (dilbilgisi, okuma, dinleme,
 * üretim) doğru/toplam sayısını İSTEMCİDEN alıyordu. İstemci hepsini "doğru"
 * bildirip gerçek cevap vermeden geçer sınav + sertifika üretebiliyordu.
 *
 * ÇÖZÜM (durum-suz, şema-suz, geriye-uyumlu): start'ta sunucu kâğıdın nesnel
 * CEVAP ANAHTARINI çıkarıp AES-256-GCM ile MÜHÜRLÜYOR (`sealKey`) ve istemciye
 * opak bir `keyToken` olarak veriyor. İstemci onu okuyamaz (şifreli) ve
 * kurcalayamaz (GCM etiketi). Finish'te istemci `keyToken` + ham `responses`
 * (her sorudaki SEÇİMİ) gönderiyor; sunucu anahtarı açıp puanı KENDİSİ
 * hesaplıyor. keyToken/responses yoksa (eski mobil istemci) sonuç kaydediliyor
 * ama DOĞRULANMAMIŞ sayılıyor: sertifika, modül tacı ve seviye geçişi vermiyor
 * (2026-10-03 denetimi O1; önceden istemci sayımıyla "geçti" yazılabiliyordu).
 *
 * Kelime (vocab) bölümü SRS'e bağlı ve oyun-bulanık eşleşmeli; o istemci-sayımı
 * (sınırlı) kalıyor. Yazma/konuşma zaten AI-rubriği (/api/assess, /api/pronounce).
 */

export type ObjectiveKey = {
  /**
   * BAĞLAMA (güvenlik denetimi 2026-10-03, O1): anahtar kâğıdı başlatan
   * kullanıcıya, sınav türüne, seviyeye/modüle ve bir son kullanma anına
   * bağlı. Eskiden bağsızdı: kolay bir A1 kâğıdının anahtarıyla C1 bitirilebiliyor,
   * başkasının jetonu kullanılabiliyordu. Bu alanları taşımayan (eski) jeton
   * `openKeyFor`dan geçmez.
   */
  u: string;
  kind: ExamKind;
  module: number | null;
  /** Son kullanma (ms, epoch). */
  exp: number;
  /**
   * Deneme kimliği (güvenlik denetimi 2026-10-07). Bitiş cevap anahtarını
   * (`objectiveReview`) döndürüyor; aynı jetonla ikinci bitiş açıklanmış
   * cevaplarla "doğrulanmış" tam puan alıyordu. İlk bitiş bu kimliği kayda
   * yazıyor, ikincisi reddediliyor. Eski jetonlarda yok.
   */
  j?: string;
  /** Kelime bölümünün madde sayısı — bölüm SRS-bulanık, doğruyu istemci sayar ama toplamı kâğıt belirler. */
  vocabTotal: number;
  grammar: ({ kind: "cell"; answer: number } | { kind: "judge"; answer: boolean })[];
  reading: number[][];
  listening: number[][];
  produce: { de: string; accept: string[] }[];
  lang: TargetLang;
  /** Kâğıttaki yazma/konuşma madde id'leri — imzalı skor jetonu bunlara bağlanır. */
  writingIds: string[];
  speakingIds: string[];
  /** Sınav seviyesi — assess override'ında rubrik seviyesi buradan (istemciden değil). */
  level: string;
  /** Yazma görevleri — assess, istemci task'ı yerine bunları puanlar. */
  writingTasks: { id: string; prompt: string; constraints: string[] }[];
  /** Konuşma hedef cümleleri — pronounce, istemci target'ı yerine bunları puanlar. */
  speakingTargets: { id: string; de: string }[];
};

export type ExamResponses = {
  grammar?: unknown;
  reading?: unknown;
  listening?: unknown;
  produce?: unknown;
};

export type SectionCount = { correct: number; total: number };

/** Anahtarın ömrü: sınav en çok 45 dk, yazma/konuşma değerlendirmesi ve ağ için bol pay. */
export const KEY_TTL_MS = 3 * 3600 * 1000;

/** Kâğıttan nesnel cevap anahtarını çıkarır (istemciye ASLA açık gitmez). */
export function buildAnswerKey(
  paper: ExamPaper,
  lang: TargetLang,
  /** Yazma kısıtının dili — öğrencinin anadili; istemci de aynı dilde gönderiyor (`assess.ai_min_words`). */
  native: NativeLang,
  /** Kâğıdı başlatan kullanıcı — anahtar yalnız onun bitirişinde açılır. */
  userId: string,
  now: number = Date.now(),
): ObjectiveKey {
  return {
    u: userId,
    kind: paper.kind,
    module: paper.module ?? null,
    exp: now + KEY_TTL_MS,
    j: randomBytes(12).toString("base64url"),
    vocabTotal: paper.sections.vocab.length,
    grammar: paper.sections.grammar.map((g) =>
      g.kind === "cell" ? { kind: "cell", answer: g.answer } : { kind: "judge", answer: g.answer },
    ),
    reading: paper.sections.reading.map((t) => t.questions.map((q) => q.answer)),
    listening: paper.sections.listening.map((t) => t.questions.map((q) => q.answer)),
    produce: paper.sections.produce.map((p) => ({ de: p.de, accept: p.accept })),
    lang,
    writingIds: paper.sections.writing.map((w) => w.id),
    speakingIds: paper.sections.speaking.map((s) => s.id),
    level: paper.level,
    writingTasks: paper.sections.writing.map((w) => ({
      id: w.id,
      prompt: w.task.prompt,
      constraints: [...(w.task.checklist ?? []), translate(native, "assess.ai_min_words", { n: w.task.minWords })],
    })),
    speakingTargets: paper.sections.speaking.map((s) => ({ id: s.id, de: s.de })),
  };
}

/** Mühürlü kâğıttan yazma görevi (assess override'ı için) — istemci task'ına güvenilmez. */
export function examWritingTask(key: ObjectiveKey, exerciseId: string): { prompt: string; constraints: string[]; level: string } | null {
  const w = key.writingTasks.find((x) => x.id === exerciseId);
  return w ? { prompt: w.prompt, constraints: w.constraints, level: key.level } : null;
}

/** Mühürlü kâğıttan konuşma hedef cümlesi (pronounce override'ı için). */
export function examSpeakingTarget(key: ObjectiveKey, exerciseId: string): string | null {
  return key.speakingTargets.find((x) => x.id === exerciseId)?.de ?? null;
}

/**
 * KÖR KÂĞIT — güvenlik denetimi F7 (airtight): nesnel bölümlerin DOĞRU CEVAPLARINI
 * istemciye gitmeden önce siler. Sınavda anlık geri bildirim olmadığı için istemci
 * cevapları oyun sırasında GÖRMEYE ihtiyaç duymaz; sıyrılınca değiştirilmiş bir
 * istemci "cevabı oku + doğru gönder" yapamaz. Cevaplar yalnız mühürlü keyToken'da
 * kalır; sunucu kör puanlar, döküm/review finish cevabından gelir. Kelime bölümü
 * SRS-oyun (istemci-sayımı) olduğu için dokunulmaz; nesnel bölümler + pass buna bağlı.
 * Render için gerekenler (options, prompt, chunks, statement) korunur.
 */
export function blindPaper<T extends ExamPaper>(paper: T): T {
  const s = paper.sections;
  return {
    ...paper,
    sections: {
      ...s,
      grammar: s.grammar.map((g) => (g.kind === "cell" ? { ...g, answer: -1 } : { ...g, answer: false })),
      reading: s.reading.map((t) => ({ ...t, questions: t.questions.map((q) => ({ ...q, answer: -1 })) })),
      listening: s.listening.map((t) => ({ ...t, questions: t.questions.map((q) => ({ ...q, answer: -1 })) })),
      produce: s.produce.map((p) => ({ ...p, de: "", accept: [] })),
    },
  };
}

/** Finish'te istemciye dönen döküm anahtarı — kör moddaki review için (cevaplar sınav BİTTİKTEN sonra açılır). */
export type ObjectiveReview = {
  grammar: ({ kind: "cell"; answer: number } | { kind: "judge"; answer: boolean })[];
  reading: number[][];
  listening: number[][];
  produce: string[];
};
export function objectiveReview(key: ObjectiveKey): ObjectiveReview {
  return { grammar: key.grammar, reading: key.reading, listening: key.listening, produce: key.produce.map((p) => p.de) };
}

/**
 * İmzalı skor jetonu — güvenlik denetimi F7 kalıntısı (yazma/konuşma).
 *
 * Yazma/konuşma AI-rubriği ve puanı sunucuda (/api/assess, /api/pronounce)
 * hesaplanıyor ama İSTEMCİ relay ediyordu — değiştirilmiş istemci hiç AI çağırmadan
 * writingScore:100 gönderebiliyordu. Artık o uçlar puanı (userId+kind+exerciseId+
 * score+zaman) üzerinde HMAC-SHA256 ile İMZALIYOR; istemci opak jetonu sınav
 * finish'ine relay ediyor, sunucu imzayı + TTL'yi doğrulayıp exam maddesine bağlı
 * İMZALI skoru kullanıyor (istemcinin ham skoru yok sayılır). Görev ve hedef
 * cümle de mühürlü anahtardan geliyor (`examWritingTask`, `examSpeakingTarget`).
 *
 * KALINTI (bilinçli): konuşmada döküm (transcript) cihazın/tarayıcının
 * tanıyıcısından, yani istemciden geliyor; değiştirilmiş bir istemci hedef
 * cümleyi döküm diye gönderip 100 alabilir. Sunucuda ses tanıma yalnız ekran
 * kapalı yürüyüşte (bkz. `api/stt`), sınavda yok. Konuşma payı tek başına
 * geçirmiyor: öteki bölümler sunucuda puanlanıyor ve her bölüm ≥ %50 isteniyor.
 */
const SCORE_TTL_MS = 3 * 3600 * 1000; // sınav süresi (max 45dk) + bol pay

export function signScore(userId: string, kind: "writing" | "speaking", exerciseId: string, score: number): string {
  const payload = { u: userId, k: kind, e: exerciseId, s: Math.max(0, Math.min(100, Math.round(score))), t: Date.now() };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", keyBytes()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyScore(token: string, userId: string): { kind: "writing" | "speaking"; exerciseId: string; score: number } | null {
  try {
    const dot = token.indexOf(".");
    if (dot < 1) return null;
    const body = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expect = createHmac("sha256", keyBytes()).update(body).digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expect);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { u: string; k: string; e: string; s: number; t: number };
    if (p.u !== userId) return null;
    const age = Date.now() - Number(p.t);
    if (!(age >= -60_000 && age <= SCORE_TTL_MS)) return null; // gelecek/eski jeton reddi
    if (p.k !== "writing" && p.k !== "speaking") return null;
    return { kind: p.k, exerciseId: String(p.e), score: Math.max(0, Math.min(100, Number(p.s))) };
  } catch {
    return null;
  }
}

/**
 * Yazma/konuşma skorlarını imzalı jetonlardan SUNUCUDA çözer. Jeton bu sınavın
 * maddesine bağlı (exerciseId ∈ key ids) ve imzası/TTL'si geçerliyse kabul edilir.
 *
 * Konuşma çok maddeli: kâğıttaki HER madde sayılır, geçerli jetonu olmayan
 * madde 0 (web oynatıcısı da arızalı maddeyi 0 sayıyor). Eskiden yalnız
 * gönderilen jetonlar ortalanıyordu: istemci en iyi maddesinin jetonunu
 * gönderip kötülerini saklayabiliyordu. Kâğıtta konuşma yoksa null.
 *
 * Yazma tek madde: geçerli jeton yoksa null — çağıran sınavı "doğrulanmamış"
 * sayar (yazma değerlendirmesi düştüğünde istemci yerel bir tahmin gösteriyor,
 * o tahmin sertifikaya sayılmamalı).
 */
export function resolveSpokenWritten(
  key: ObjectiveKey,
  userId: string,
  writingToken: unknown,
  speakingTokens: unknown,
): { writingScore: number | null; speakingScore: number | null } {
  let writingScore: number | null = null;
  if (typeof writingToken === "string" && key.writingIds.length) {
    const v = verifyScore(writingToken, userId);
    if (v && v.kind === "writing" && key.writingIds.includes(v.exerciseId)) writingScore = v.score;
  }

  let speakingScore: number | null = null;
  if (key.speakingIds.length) {
    const byId = new Map<string, number>();
    for (const tk of Array.isArray(speakingTokens) ? speakingTokens : []) {
      if (typeof tk !== "string") continue;
      const v = verifyScore(tk, userId);
      // Aynı madde jetonu bir kez sayılır (ortalamayı tekrarla şişirme engeli).
      if (v && v.kind === "speaking" && key.speakingIds.includes(v.exerciseId) && !byId.has(v.exerciseId)) byId.set(v.exerciseId, v.score);
    }
    speakingScore = Math.round(key.speakingIds.reduce((a, id) => a + (byId.get(id) ?? 0), 0) / key.speakingIds.length);
  }
  return { writingScore, speakingScore };
}

// 32-baytlık anahtar, sunucu sırrından türetilir. Sır placeholder/boş olsa bile
// (geliştirme) mühürleme çalışır; üretimde gerçek BETTER_AUTH_SECRET kullanılır.
function keyBytes(): Buffer {
  const secret = process.env.BETTER_AUTH_SECRET ?? "build-time-placeholder-secret-change-me";
  return createHash("sha256").update(`${secret}|exam-obj-key-v1`).digest();
}

/** Anahtarı AES-256-GCM ile mühürler → base64(iv|tag|ct). */
export function sealKey(key: ObjectiveKey): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyBytes(), iv);
  const ct = Buffer.concat([cipher.update(JSON.stringify(key), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString("base64");
}

/**
 * keyToken'ı açar VE bağlamayı doğrular: sahibi bu kullanıcı, süresi geçmemiş,
 * (verildiyse) türü/seviyesi/modülü bu bitirişle aynı. Sınav bitirişi, yazma
 * ve konuşma değerlendirmesi anahtarı yalnız bununla açar.
 */
export function openKeyFor(
  token: string,
  userId: string,
  expect?: { kind: ExamKind; level: string; module: number | null },
  now: number = Date.now(),
): ObjectiveKey | null {
  const key = openKey(token);
  if (!key || typeof key.u !== "string" || key.u !== userId) return null;
  if (typeof key.exp !== "number" || now > key.exp) return null;
  if (expect && (key.kind !== expect.kind || key.level !== expect.level || (key.module ?? null) !== expect.module)) return null;
  return key;
}

/** keyToken'ı açar (yalnız şifre/etiket doğrulaması; bağlama için `openKeyFor`). */
export function openKey(token: string): ObjectiveKey | null {
  try {
    const buf = Buffer.from(token, "base64");
    if (buf.length < 28) return null;
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const ct = buf.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", keyBytes(), iv);
    decipher.setAuthTag(tag);
    const pt = Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
    return JSON.parse(pt) as ObjectiveKey;
  } catch {
    return null;
  }
}

const asNumberGrid = (v: unknown): number[][] =>
  Array.isArray(v) ? v.map((row) => (Array.isArray(row) ? row.map((n) => Number(n)) : [])) : [];
const asNumberList = (v: unknown): number[] => (Array.isArray(v) ? v.map((n) => Number(n)) : []);
const asStringList = (v: unknown): string[] => (Array.isArray(v) ? v.map((s) => (typeof s === "string" ? s : "")) : []);

function gradeMcGrid(key: number[][], resp: unknown): SectionCount {
  const given = asNumberGrid(resp);
  let correct = 0;
  let total = 0;
  key.forEach((qs, t) => {
    qs.forEach((ans, q) => {
      total++;
      if (given[t]?.[q] === ans) correct++;
    });
  });
  return { correct, total };
}

/**
 * Nesnel bölümleri anahtar + istemci seçimlerinden SUNUCUDA puanlar.
 * Dönen sayılar istemci `sections`'ındakilerin yerine geçer; toplam da
 * anahtardan gelir (istemci uydurma toplam gönderemez).
 */
export function gradeObjective(
  key: ObjectiveKey,
  resp: ExamResponses,
): { grammar: SectionCount; reading: SectionCount; listening: SectionCount; produce: SectionCount } {
  // dilbilgisi
  const gGiven = asNumberList(resp.grammar);
  let gCorrect = 0;
  key.grammar.forEach((item, i) => {
    const chosen = gGiven[i];
    if (item.kind === "cell") {
      if (chosen === item.answer) gCorrect++;
    } else {
      // judge: istemci 0 = "doğru/richtig", 1 = "yanlış"
      if (chosen === (item.answer ? 0 : 1)) gCorrect++;
    }
  });

  // üretim: matchSentence ile (sıra/yazım toleransı sunucuda aynı)
  const pGiven = asStringList(resp.produce);
  let pCorrect = 0;
  key.produce.forEach((item, i) => {
    const typed = (pGiven[i] ?? "").trim();
    if (!typed) return;
    const m = matchSentence(typed, item.de, item.accept, key.lang);
    if (m.verdict === "exact" || m.verdict === "spelling") pCorrect++;
  });

  return {
    grammar: { correct: gCorrect, total: key.grammar.length },
    reading: gradeMcGrid(key.reading, resp.reading),
    listening: gradeMcGrid(key.listening, resp.listening),
    produce: { correct: pCorrect, total: key.produce.length },
  };
}

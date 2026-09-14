import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { matchSentence } from "@/lib/sentence-match";
import type { TargetLang } from "@/lib/courses";
import type { ExamPaper } from "@/lib/exam-types";

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
 * hesaplıyor. keyToken/responses yoksa (eski mobil istemci) çağıran eski
 * sınırlı istemci-sayımına düşüyor — kimse kırılmıyor.
 *
 * Kelime (vocab) bölümü SRS'e bağlı ve oyun-bulanık eşleşmeli; o istemci-sayımı
 * (sınırlı) kalıyor. Yazma/konuşma zaten AI-rubriği (/api/assess, /api/pronounce).
 */

export type ObjectiveKey = {
  grammar: ({ kind: "cell"; answer: number } | { kind: "judge"; answer: boolean })[];
  reading: number[][];
  listening: number[][];
  produce: { de: string; accept: string[] }[];
  lang: TargetLang;
};

export type ExamResponses = {
  grammar?: unknown;
  reading?: unknown;
  listening?: unknown;
  produce?: unknown;
};

export type SectionCount = { correct: number; total: number };

/** Kâğıttan nesnel cevap anahtarını çıkarır (istemciye ASLA açık gitmez). */
export function buildAnswerKey(paper: ExamPaper, lang: TargetLang): ObjectiveKey {
  return {
    grammar: paper.sections.grammar.map((g) =>
      g.kind === "cell" ? { kind: "cell", answer: g.answer } : { kind: "judge", answer: g.answer },
    ),
    reading: paper.sections.reading.map((t) => t.questions.map((q) => q.answer)),
    listening: paper.sections.listening.map((t) => t.questions.map((q) => q.answer)),
    produce: paper.sections.produce.map((p) => ({ de: p.de, accept: p.accept })),
    lang,
  };
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

/** keyToken'ı açar/doğrular; kurcalanmış/geçersizse null. */
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

import "server-only";
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
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
    writingIds: paper.sections.writing.map((w) => w.id),
    speakingIds: paper.sections.speaking.map((s) => s.id),
    level: paper.level,
    writingTasks: paper.sections.writing.map((w) => ({
      id: w.id,
      prompt: w.task.prompt,
      constraints: [...(w.task.checklist ?? []), `en az ${w.task.minWords} kelime`],
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
 * İMZALI skoru kullanıyor (istemcinin ham skoru yok sayılır). Jeton yoksa/geçersizse
 * (eski istemci) çağıran istemci skoruna düşer — geriye uyumlu.
 *
 * NOT (dürüst kalıntı): görev tanımı (task/constraints) hâlâ istemciden gel, yani
 * özel istemci + gerçek yazma emeğiyle daha kolay bir görevden yüksek puan
 * alınabilir — ama "yoktan 100" ve eski-skoru-replay artık kapalı; tam kapatma
 * görev tanımını da sunucuya taşımayı gerektirir (kendi kredin, düşük etki).
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
 * maddesine bağlı (exerciseId ∈ key ids) ve imzası/TTL'si geçerliyse kabul edilir;
 * konuşma çok maddeli → her maddenin doğrulanmış skoru bir kez sayılıp ortalanır.
 * Bir bölüm için geçerli jeton yoksa null döner (çağıran istemci skoruna düşer).
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
  if (Array.isArray(speakingTokens) && key.speakingIds.length) {
    const scores: number[] = [];
    const seen = new Set<string>();
    for (const tk of speakingTokens) {
      if (typeof tk !== "string") continue;
      const v = verifyScore(tk, userId);
      // Aynı madde jetonu bir kez sayılır (ortalamayı tekrarla şişirme engeli).
      if (v && v.kind === "speaking" && key.speakingIds.includes(v.exerciseId) && !seen.has(v.exerciseId)) {
        seen.add(v.exerciseId);
        scores.push(v.score);
      }
    }
    if (scores.length) speakingScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
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

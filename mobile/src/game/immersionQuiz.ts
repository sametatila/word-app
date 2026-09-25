/**
 * Ünite quiz/unitQuiz sorularını CİHAZDA türetir — web'in brief.ts +
 * quiz.ts'inin mobil portu. İçerik yazımı gerekmez: sorular ünitenin kendi
 * kelime/kalıplarından (4 konuşması), distraktörler seviyenin havuzundan. Tema
 * hizalı, deterministik (RNG yok → aynı ünite hep aynı quiz). SkillQuestion
 * üretir; QuestionList aynen render eder.
 */
import { conversationsForLevel } from "../data/conversations";
import { seededShuffle } from "../lib/shuffle";
import { moduleTheme } from "../data/moduleThemes";
import { t, targetLangName } from "../lib/i18n";
import { currentCourseId } from "../lib/courses";
import { MOCK_LABELS } from "../data/exams";
import type { SkillQuestion } from "../data/skills";

const UNIT_CONVERSATIONS = 4;
const MODULE_SIZE = 10;
type VocabItem = { de: string; tr: string };
type PatternItem = { de: string; tr: string };


function dedupeBy<T>(xs: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of xs) { const k = key(x); if (seen.has(k)) continue; seen.add(k); out.push(x); }
  return out;
}

/** Soru havuzu — web `lib/immersion/quiz` `QuizPool` ile aynı. */
export type QuizPool = { vocab: VocabItem[]; patterns: PatternItem[] };

export type UnitBrief = {
  /** `${kurs}-${seviye}-uNN` — web `lib/immersion/brief` ile aynı; quiz tohumu. */
  unitId: string;
  /** Ünitenin sırası (1-tabanlı) — tekrar havuzunun başlangıcı buna bağlı. */
  index: number;
  vocab: VocabItem[];
  patterns: PatternItem[];
  theme: string;
  conversationTitles: string[];
};

export function buildUnitBrief(level: string, unitIndex: number): UnitBrief {
  const conversations = conversationsForLevel(level);
  const u = unitIndex - 1;
  const unitConversations = conversations.slice(u * UNIT_CONVERSATIONS, u * UNIT_CONVERSATIONS + UNIT_CONVERSATIONS);
  const theme = moduleTheme(currentCourseId(), level, Math.floor((u * UNIT_CONVERSATIONS) / MODULE_SIZE)) || t("path.unit_fallback", { level: level, n: unitIndex });
  return {
    unitId: `${currentCourseId()}-${String(level).toLowerCase()}-u${String(unitIndex).padStart(2, "0")}`,
    index: unitIndex,
    vocab: dedupeBy(unitConversations.flatMap((l) => l.vocab), (v) => v.de),
    patterns: dedupeBy(unitConversations.flatMap((l) => l.patterns), (p) => p.de),
    theme,
    conversationTitles: unitConversations.map((l) => l.title),
  };
}

/**
 * BU üniteden ÖNCEKİ ünitelerin havuzu — quiz'in üçte biri buradan gelir.
 *
 * Web bunu çağrı yerinde kuruyor (`app/(app)/immersion/quiz/[unit]/page`);
 * mobilde ekran konuşma listesine erişmediği için burada kuruluyor. Ünite 1'de
 * boş döner ve `deriveQuiz` tekrar sorusu üretmez.
 */
export function earlierPool(level: string, unitIndex: number): QuizPool {
  const conversations = conversationsForLevel(level).slice(0, Math.max(0, unitIndex - 1) * UNIT_CONVERSATIONS);
  return { vocab: conversations.flatMap((l) => l.vocab), patterns: conversations.flatMap((l) => l.patterns) };
}

export function levelPool(level: string): QuizPool {
  const conversations = conversationsForLevel(level);
  return { vocab: conversations.flatMap((l) => l.vocab), patterns: conversations.flatMap((l) => l.patterns) };
}

/**
 * Çeldirici adayı: şıkta görünen metin, taşıdığı anlam ve kelimenin başlığı.
 *
 * TEK DOĞRU CEVAP. Çeldirici yalnız doğru cevapla birebir aynı metin değilse
 * alınıyordu; bu yüzden aynı Almanca başlığın başka bir konuşmadaki karşılığı
 * ("der Name" → "isim" doğruyken "ad") ve anlam paylaşan kelimeler ikinci bir
 * doğru şık olabiliyordu, iki çeldirici de birbirinin aynısı olabiliyordu.
 * Aday şu durumlarda elenir: metni aynı, başlığı aynı ya da anlam parçaları
 * (virgül, noktalı virgül, eğik çizgiyle ayrılmış) kesişiyor. Seçilen
 * çeldiriciler birbirine karşı da aynı kuraldan geçer. Seçim yine
 * deterministik (aynı ünite hep aynı quiz'i verir).
 */
type QuizCand = { text: string; mean: string; head: string };

const quizNorm = (x: string) =>
  x.toLowerCase().replace(/i̇/g, "i").replace(/[…«»"“”„]/g, "").replace(/\s+/g, " ").trim();
const quizHead = (x: string) => quizNorm(x).replace(/^(der|die|das|the|to)\s+/, "");
const quizParts = (x: string) => new Set(x.split(/[,;/]/).map(quizNorm).filter(Boolean));

function quizClash(a: QuizCand, b: QuizCand): boolean {
  if (quizNorm(a.text) === quizNorm(b.text) || quizHead(a.head) === quizHead(b.head)) return true;
  const own = quizParts(a.mean);
  for (const m of quizParts(b.mean)) if (own.has(m)) return true;
  return false;
}

/* TOHUM ÜNİTEDEN — web `lib/immersion/quiz` ile BİREBİR aynı kural (gerekçe
   orada): çeldiriciler ve cevabın yeri `ünite | soru sayısı | soru` tohumuyla
   `seededShuffle`dan. Eskiden yalnız soru sırasından geliyordu ve aynı sıradaki
   soru her ünitede aynı çeldiricilerle, aynı konumda çıkıyordu. */
function pickDistractors(correct: QuizCand, pool: QuizCand[], seed: string, n = 3): string[] {
  const uniqPool: QuizCand[] = [];
  for (const c of pool) {
    if (!c.text || quizClash(correct, c)) continue;
    if (!uniqPool.some((u) => quizNorm(u.text) === quizNorm(c.text))) uniqPool.push(c);
  }
  const out: QuizCand[] = [];
  for (const cand of seededShuffle(uniqPool, seed)) {
    if (out.length >= n) break;
    if (!out.some((o) => quizClash(o, cand))) out.push(cand);
  }
  return out.map((c) => c.text);
}

function placeAnswer(correct: string, distractors: string[], seed: string): { options: string[]; answer: number } {
  const options = [...distractors];
  const answer = seededShuffle([...Array(distractors.length + 1).keys()], `${seed}|yer`)[0];
  options.splice(answer, 0, correct);
  return { options, answer };
}

/**
 * Tekrar kelimeleri — ÖNCEKİ ünitelerden seçim.
 *
 * Web `lib/immersion/quiz` `pickReview` ile aynı mantık; mobilde hiç yoktu,
 * yani Android öğrencisi ünite quizinde yalnız o ünitenin kelimelerini
 * görüyordu. Seçim başlangıcı ASAL bir çarpanla kayıyor: düz `index % pool`
 * her ünitede yalnız bir kayma verir ve yirmi beş ünite havuzun hep aynı dar
 * bandına düşer. `take` de başlangıca giriyor, yoksa aynı ünitenin quiz'i (2
 * tekrar) ile unitQuiz'i (4 tekrar) aynı yerden başlar ve büyük ölçüde aynı
 * kelimeleri sorardı.
 */
function pickReview(brief: UnitBrief, review: QuizPool | undefined, n: number): VocabItem[] {
  if (!review || n <= 0) return [];
  const own = new Set(brief.vocab.map((v) => v.de));
  const seen = new Set<string>();
  const pool = review.vocab.filter((v) => {
    if (!v.de || !v.tr || own.has(v.de) || seen.has(v.de)) return false;
    seen.add(v.de);
    return true;
  });
  if (!pool.length) return [];
  const take = Math.min(n, pool.length);
  const step = Math.max(1, Math.floor(pool.length / take));
  const out: VocabItem[] = [];
  let idx = (brief.index * 37 + take * 13) % pool.length;
  for (let guard = 0; out.length < take && guard < pool.length * 2; guard++) {
    const cand = pool[idx % pool.length];
    if (!out.includes(cand)) out.push(cand);
    idx += step;
  }
  return out;
}

/** Tekrar soruları kendi sorularının ARASINA serpilir — sona yığılmaz. */
function interleave(own: SkillQuestion[], back: SkillQuestion[]): SkillQuestion[] {
  if (!back.length) return own;
  const out: SkillQuestion[] = [];
  const gap = Math.max(1, Math.ceil(own.length / (back.length + 1)));
  let b = 0;
  for (let i = 0; i < own.length; i++) {
    out.push(own[i]);
    if (b < back.length && (i + 1) % gap === 0) out.push(back[b++]);
  }
  while (b < back.length) out.push(back[b++]);
  return out;
}

/** count: quiz ~8, unitQuiz ~12. Kelime hatırlama çoğunluk + birkaç kalıp. */
export function deriveQuiz(
  brief: UnitBrief,
  pool: QuizPool,
  count = 8,
  review?: QuizPool,
): SkillQuestion[] {
  const qs: SkillQuestion[] = [];
  const vocabCands = pool.vocab.map((v) => ({ text: v.tr, mean: v.tr, head: v.de }));
  const dePatternCands = pool.patterns.map((p) => ({ text: p.de, mean: p.tr, head: p.de }));
  const patTarget = brief.patterns.length ? Math.min(2, brief.patterns.length) : 0;
  const reviewWords = pickReview(brief, review, Math.floor(count / 3));
  const vocabTarget = Math.min(brief.vocab.length, count - patTarget - reviewWords.length);

  /* Aynı quizde iki soru aynı doğru cevabı taşımasın (web ile aynı kural). */
  const seed = `${brief.unitId}|${count}`;
  const used = new Set<string>();
  const fresh = (v: VocabItem) => {
    const k = quizNorm(v.tr);
    if (used.has(k)) return false;
    used.add(k);
    return true;
  };
  const own: SkillQuestion[] = [];
  for (const v of brief.vocab) {
    if (own.length >= vocabTarget) break;
    if (!fresh(v)) continue;
    const i = own.length;
    const { options, answer } = placeAnswer(v.tr, pickDistractors({ text: v.tr, mean: v.tr, head: v.de }, vocabCands, `${seed}|k${i}`), `${seed}|k${i}`);
    own.push({ kind: "mcq", text: t("quiz.what_means", { word: v.de }), options, answer, explain: `${v.de} = ${v.tr}.` });
  }
  const back: SkillQuestion[] = reviewWords.filter(fresh).map((v, i) => {
    const { options, answer } = placeAnswer(v.tr, pickDistractors({ text: v.tr, mean: v.tr, head: v.de }, vocabCands, `${seed}|t${i}`), `${seed}|t${i}`);
    /* Soru metni ipucu vermez; açıklama nereden geldiğini söyler. */
    return {
      kind: "mcq" as const,
      text: t("quiz.what_means", { word: v.de }),
      options,
      answer,
      explain: `${v.de} = ${v.tr}. ${t("quiz.from_earlier")}`.trim(),
    };
  });
  qs.push(...interleave(own, back));
  /* KALIP SORUSUNUN YÖNÜ KURSA BAĞLI. Almanca kursta kalıbın `tr` alanı
     çeviri ("Ich heiße …" → "adım …"), yani "nasıl denir?" doğru bir üretim
     sorusu. İngilizce kursta `tr` bir KULLANIM NOTU ("adını söylerken
     kullanılır") ve aynı soru "«adını söylerken kullanılır» İngilizce nasıl
     denir?" diye okunuyordu. Orada soru tersine dönüyor; web tarafı da öyle
     (bkz. `src/lib/immersion/quiz.ts` `PatternAsk`). */
  const meaning = currentCourseId() === "en";
  const trPatternCands = pool.patterns.map((p) => ({ text: p.tr, mean: p.tr, head: p.de }));
  for (let j = 0; j < patTarget && qs.length < count; j++) {
    const p = brief.patterns[j];
    if (meaning) {
      const { options, answer } = placeAnswer(p.tr, pickDistractors({ text: p.tr, mean: p.tr, head: p.de }, trPatternCands, `${seed}|m${j}`), `${seed}|m${j}`);
      qs.push({ kind: "mcq", text: t("quiz.what_means", { word: p.de }), options, answer, explain: `${p.de} = ${p.tr}` });
      continue;
    }
    const { options, answer } = placeAnswer(p.de, pickDistractors({ text: p.de, mean: p.tr, head: p.de }, dePatternCands, `${seed}|m${j}`), `${seed}|m${j}`);
    qs.push({ kind: "mcq", text: t("quiz.how_to_say", { pattern: p.tr, target: targetLangName() }), options, answer, explain: `${p.tr} → ${p.de}` });
  }
  return qs.slice(0, count);
}

/* ─────────────────────────── GRAMER ─────────────────────────── */

/* KARIŞTIRMA `lib/shuffle`DEN. Burada `seededOrder` diye AYRI bir uygulama
   duruyordu ve yorumu "web'deki seededShuffle ile aynı amaç" diyordu — amaç
   aynıydı, ALGORİTMA değil: tohumlama ikisinde de FNV-1a ama bu kopya
   xorshift + `Math.abs(h) % (i+1)` kullanıyordu, web (ve mobilin kendi
   `lib/shuffle`ı) mulberry32 + `Math.floor(rand() * (i+1))`. Sıra farkı
   masum değildi: hüküm sayısı yarıdan çoksa dilimleme SEÇİMİ de değiştiriyor,
   yani aynı ünitede iki platform farklı gramer sorusu soruyordu. */

/**
 * Ünitenin gramer adımı — ünitenin KENDİ konuşmalarından türetilir.
 *
 * Web'deki `lib/immersion/grammar.ts` ile aynı kural, aynı iki kaynak:
 * konuşmanın hüküm adımları (gerekçesiyle birlikte) ve üretim hedefleri (dizme
 * sorusu olarak). Mobilde ayrı bir uygulama olmasının sebebi quiz ile aynı:
 * cihaz kendi patikasını kurabiliyor ve ağ beklemiyor.
 *
 * İki uygulama ayrışırsa aynı ünite iki platformda başka soru verir; o yüzden
 * kural burada da BİREBİR aynı tutuluyor — dört hüküm, dört dizme, 4-8 sözcük
 * sınırı, tohumlu sıra.
 */
export function deriveGrammar(level: string, unitIndex: number, count = 8): SkillQuestion[] {
  const conversations = conversationsForLevel(level).slice((unitIndex - 1) * 4, (unitIndex - 1) * 4 + 4);
  /* Tohum web ile AYNI biçimde kurulmalı: `${kurs}-${seviye}-uNN`
     (bkz. `lib/immersion/brief` `unitId`). "de-" SABİT yazılıydı, yani
     İngilizce kursta mobilin tohumu webinkinden farklıydı ve aynı ünitede
     iki platform farklı soru seçiyordu. */
  const unitId = `${currentCourseId()}-${String(level).toLowerCase()}-u${String(unitIndex).padStart(2, "0")}`;
  const judges: SkillQuestion[] = [];
  const orders: SkillQuestion[] = [];

  for (const conversation of conversations as { title: string; lecture?: { expect?: Record<string, unknown> }[] }[]) {
    for (const step of conversation.lecture ?? []) {
      const e = step.expect as { kind?: string; statement?: string; answer?: boolean; why?: { text: string }[]; target?: string } | undefined;
      if (e?.kind === "truefalse" && e.statement) {
        judges.push({
          kind: "truefalse",
          text: e.statement,
          /* Hüküm şıkları KURSUN dilinde: sabit "Richtig/Falsch" İngilizce
             kursta da Almanca çıkıyordu ve İngilizce konuşmalarda yüz tane hüküm
             adımı var. Deneme sınavı aynı çifti kursa göre veriyor
             (`MOCK_LABELS[course].bool`), buraya da oradan geliyor. */
          options: [...MOCK_LABELS[currentCourseId() === "en" ? "en" : "de"].bool],
          answer: e.answer ? 0 : 1,
          explain: (e.why ?? []).map((w) => w.text).join(" ").replace(/\s+([.,!?;:])/g, "$1").trim(),
        });
      } else if (e?.kind === "produce" && e.target) {
        const parts = e.target.trim().replace(/\s+/g, " ").split(" ");
        if (parts.length < 4 || parts.length > 8) continue;
        orders.push({
          kind: "order",
          text: e.target.endsWith("?") ? t("quiz.order_question") : t("quiz.order_sentence"),
          options: [],
          answer: 0,
          items: parts,
          explain: `„${e.target}“ — ${conversation.title}`,
        });
      }
    }
  }

  const half = Math.ceil(count / 2);
  const picked = seededShuffle(judges, `${unitId}|judge`).slice(0, Math.min(judges.length, half));
  const rest = seededShuffle(orders, `${unitId}|order`).slice(0, Math.max(0, count - picked.length));
  return [...picked, ...rest];
}

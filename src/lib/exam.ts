import "server-only";
import { passesExamRules } from "@/lib/exam-types";
import { conversationPassed } from "@/lib/conversations/chat-const";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { practiceWordsOf } from "@/lib/practice-words";
import { exams, userConversations, userSkills, words } from "@/lib/db/schema";
import { chatConfigured } from "@/lib/chat-providers";
import { track } from "@/lib/events";
import { conversationsForLevel } from "@/lib/conversations";
import { MODULE_SIZE } from "@/lib/conversations/modules";
import {
  moduleContent,
  moduleProduce,
  taughtSense,
  conversationModuleCount,
  selfAnswering,
  type ProduceItem as ConversationProduceItem,
} from "@/lib/conversations/module-content";
import { courseExams, moduleExamPlan, type ExamCando, type ModuleExamPlan } from "@/lib/conversations/module-exam";
import { localiseExam, localiseExercise } from "@/lib/conversations/native-server";
import { attachTypingSynonyms, makeRound, toRoundWord, weekStart , ensureProfile } from "@/lib/session";
import { seededShuffle } from "@/lib/shuffle";
import { BUNDLED_EXERCISES } from "@/lib/skills/bundled";
import {
  scoreSections,
  LEVEL_SECONDS,
  MODULE_PREREQ,
  MODULE_SECONDS,
  type ExamCover,
  type ExamKind,
  type ExamPaper,
  type ExamResult,
  type ExamSubmission,
  type GrammarItem,
  type ProduceExamItem,
  type SectionScore,
  type SpeakingItem,
  type TextItem,
  type WritingItem,
} from "@/lib/exam-types";
import type { CefrLevel, WritingTask, SkillExercise } from "@/lib/skills/types";
import type { Round } from "@/lib/types";
import { nativeOf, type NativeLang } from "@/lib/courses";
import { translate } from "@/lib/i18n/dict";

/**
 * Modül ve seviye sınavı (plan WP-41, v3).
 *
 * **Neyi ölçüyor.** Konuşmalar konuşma üzerine kurulu: her konuşma bir kalıp
 * öğretiyor, Türkçe bir cümleyi Almanca kurduruyor, bozuk bir cümle hakkında
 * hüküm verdiriyor ve sonunda rol yaptırıyor. Sınav uzun süre bunun hiçbirini
 * ölçmüyordu — modülden yalnızca KELİME listesi alınıyor, geri kalan bölümler
 * (dilbilgisi, okuma, dinleme, yazma) SEVİYE havuzundan çekiliyordu. Sonuç:
 * "A1 Modül 3 · Yeme-içme" sınavında tren garı metni ve Perfekt sorusu.
 *
 * v3'te modül sınavının her bölümü modülün kendisinden geliyor:
 *
 *   Bölüm        madde  ağırlık  kaynak
 *   Wortschatz     6      %12    modülün kelimeleri → çeviri / yazma
 *   Grammatik      6      %18    modülün odak tabloları + konuşmaların hüküm cümleleri
 *   Satzbau        5      %25    konuşmaların ÜRETİM adımları (Türkçe → Almanca)
 *   Lesen          2      %8     modül temalı yazılı metin (elle yazılı)
 *   Hören          3      %12    modül sahnesinde geçen diyalog (elle yazılı)
 *   Sprechen       2      %15    modülün durumunda söylenecek cümleler
 *   Schreiben      1      %10    modül temalı görev → AI rubriği
 *
 * **Ağırlık neden var.** Eskiden puan madde sayısına göre hesaplanıyordu ve
 * yazma bölümü 24 maddenin 1'iydi: yani kâğıdın %4'ü. Konuşma tabanlı bir
 * kursta üretim bölümlerinin toplam ağırlığı %50 olmalı — `SECTION_WEIGHT`
 * bunu söylüyor, madde sayısı değil.
 *
 * **Geçme:** toplam ≥ %60 ve hiçbir bölüm < %50 (2026-10-03'e dek %70). Ön koşul: modül konuşmalarının
 * ≥ %60'ı geçilmiş; değilse sınav "deneme" (sayılmaz, sertifika yok).
 *
 * Maddeler tohumlu: aynı kullanıcı, aynı sınav, aynı hafta → aynı kâğıt.
 */

export type {
  ExamKind,
  ExamSectionId,
  GrammarItem,
  ProduceExamItem,
  TextItem,
  WritingItem,
  SpeakingItem,
  ExamCover,
  ExamPaper,
  SectionScore,
  ExamSubmission,
  ExamResult,
} from "@/lib/exam-types";
export {
  SECTION_ORDER,
  SECTION_TITLE_KEYS,
  SECTION_TITLE_DE,
  SECTION_TITLE_TARGET,
  SECTION_WEIGHT,
  MODULE_SECONDS,
  LEVEL_SECONDS,
  PASS_TOTAL,
  PASS_SECTION,
  MODULE_PREREQ,
  scoreSections,
} from "@/lib/exam-types";


/* Kapak da bu sayıları okuyor (`/api/exam` GET): madde sayısı kâğıt
   üretilmeden bilinebiliyor ve kapağı açmak haftanın kâğıdını harcamamalı. */
export const COUNTS: Record<ExamKind, { vocab: number; grammar: number; produce: number; text: number; speaking: number; writing: number }> = {
  module: { vocab: 6, grammar: 6, produce: 5, text: 1, speaking: 2, writing: 1 },
  level: { vocab: 12, grammar: 12, produce: 6, text: 2, speaking: 3, writing: 1 },
};

/** Dilbilgisi hücresinin cevabı bu uzunluğu aşarsa madde değil örnektir. */

export function examKindKey(kind: ExamKind, level: CefrLevel, module: number | null): string {
  return kind === "module" ? `module:${level}:${module ?? 0}` : `level:${level}`;
}

/**
 * Modülün konuşmalarının yeterince geçilip geçilmediği. Geçilmediyse kâğıt
 * "deneme" olur ve sonucu sayılmaz — kullanıcıya bunu BAŞLAMADAN önce
 * söyleyebilmek için kapak ucu da bunu soruyor (bkz. api/exam GET).
 */
export async function modulePrereq(userId: string, course: string, level: CefrLevel, module: number): Promise<boolean> {
  const chunk = (await conversationsForLevel(course, level)).filter((l) => l.course === course).slice(module * MODULE_SIZE, (module + 1) * MODULE_SIZE);
  if (!chunk.length) return false;
  const rows = await db
    .select({ conversationId: userConversations.conversationId, correct: userConversations.correct, total: userConversations.total, chatDone: userConversations.chatDone, chatWaived: userConversations.chatWaived })
    .from(userConversations)
    .where(and(eq(userConversations.userId, userId), inArray(userConversations.conversationId, chunk.map((l) => l.id))));
  const passed = rows.filter(conversationPassed).length;
  return passed / chunk.length >= MODULE_PREREQ;
}

/**
 * Çeldirici havuzu: cevaptan farklı, birbirinden de farklı kardeşler.
 *
 * Tablonun aynı sütununda aynı biçim birden çok satırda geçiyor (çekim
 * tablosunda "ich soll" ile "er soll" aynı hücreyi taşır). Kardeş listesi
 * ham hâliyle kullanılınca aynı şık iki kez basılıyor ve soru kendini ele
 * veriyordu — iki özdeş şıkkın ikisi de doğru olamaz.
 */

/** Üretim adımlarından sınav maddesi: bir kısmı yazma, bir kısmı dizme. */
function produceItems(source: ConversationProduceItem[], seed: string, count: number): ProduceExamItem[] {
  const usable = source.filter((p) => !selfAnswering(p) && p.de.trim().split(/\s+/).length >= 2);
  const picked = seededShuffle(usable, `${seed}|produce`).slice(0, count);
  return picked.map((p, i) => {
    const words = p.de.trim().split(/\s+/);
    // Maddelerin yarısı dizme: yazma cümlenin tamamını (kelime + biçim +
    // sıra), dizme yalnız SIRAYI sınar. İkisi bir arada olunca kelimeyi
    // bilip sırayı bilmeyen öğrenci ile ikisini de bilmeyen öğrenci
    // ayrışıyor; ayrıca beş maddenin beşi de boş satır olsaydı bölüm A1'de
    // ölçmekten çok yıldırırdı.
    const order = i % 2 === 1 && words.length >= 4 && words.length <= 10;
    return {
      id: `p:${p.id}`,
      prompt: p.prompt,
      de: p.de,
      accept: p.accept,
      mode: order ? "order" : "type",
      ...(order ? { chunks: seededShuffle(words, `${seed}|chunks|${p.id}`) } : {}),
    };
  });
}

/**
 * Şıkları karıştırır ve doğru dizini yeniden hesaplar.
 *
 * Elle yazılan sorularda doğru şık farkında olmadan hep aynı sıraya
 * düşebiliyor (yazarken "doğru cevabı ikinci sıraya koyma" alışkanlığı).
 * Sınavda bu, soruyu okumadan cevaplanabilir hâle getirir. Karıştırma
 * tohumlu: aynı kâğıt aynı hafta aynı sırayı gösteriyor, ama iki kullanıcının
 * kâğıdı aynı değil.
 */
function shuffleQuestion(q: { text: string; textTr?: string; options: string[]; answer: number }, seed: string) {
  const right = q.options[q.answer];
  const options = seededShuffle(q.options, seed);
  return { ...q, options, answer: options.indexOf(right) };
}

/** Elle yazılmış modül diyaloğundan dinleme maddesi. */
function planListening(plan: ModuleExamPlan, count: number, seed: string): TextItem[] {
  return [
    {
      id: `l:${plan.code}`,
      title: plan.listening.title,
      titleTr: plan.listening.titleTr,
      situation: plan.listening.situation,
      segments: plan.listening.turns.map((t) => ({ speaker: t.speaker, text: t.de, tr: t.tr })),
      questions: plan.listening.questions.slice(0, count).map((q, i) => shuffleQuestion({ text: q.de, textTr: q.tr, options: q.options, answer: q.answer }, `${seed}|hoeren|${i}`)),
    },
  ];
}

/**
 * Bir beceri egzersizinin SINAVDA kullanılabilir soruları.
 *
 * Sınav kâğıdı soruyu yalnız şıklara basarak çiziyor (`exam-player.tsx`,
 * `options(q.options, …)`). Beceri bölümünde ise boşluk doldurma, kısa cevap ve
 * dikte soruları var ve bunların `options` alanı BOŞ — beceri oynatıcısı onları
 * yazarak cevaplatıyor. Bu sorular süzülmeden sınava girerse ekranda hiç düğme
 * çizilmez ve seviye sınavı o soruda kilitlenir: ilerlemenin başka yolu yok.
 *
 * Modül sınavı kendi planını kullandığı için etkilenmiyordu; açık yalnız
 * seviye sınavındaydı (`module === null`), yani bankadan çekildiği yerde.
 */
function examQuestions(ex: SkillExercise) {
  const qs = "questions" in ex ? ex.questions : [];
  return qs.filter((q) => Array.isArray(q.options) && q.options.length >= 2);
}

function planReading(plan: ModuleExamPlan, count: number, seed: string): TextItem[] {
  return [
    {
      id: `r:${plan.code}`,
      title: plan.reading.title,
      titleTr: plan.reading.titleTr,
      genre: plan.reading.genre,
      text: plan.reading.text,
      questions: plan.reading.questions.slice(0, count).map((q, i) => shuffleQuestion({ text: q.de, textTr: q.tr, options: q.options, answer: q.answer }, `${seed}|lesen|${i}`)),
    },
  ];
}

export async function buildExam(userId: string, course: string, level: CefrLevel, module: number | null, today: string): Promise<ExamPaper> {
  // Seviye sınavının kelime turları da anadilde.
  const native = nativeOf((await ensureProfile(userId))?.nativeLang);
  const kind: ExamKind = module === null ? "level" : "module";
  const seed = `${userId}|${examKindKey(kind, level, module)}|${weekStart(today)}`;
  const c = COUNTS[kind];
  const trial = kind === "module" ? !(await modulePrereq(userId, course, level, module!)) : false;
  /* Kâğıdın Türkçe yarısı öğrencinin ana dilinde: yönerge, durum, replik
     karşılığı ve soru kökünün altı. Almanca yarısı — ölçülen şey — sabit. */
  const plan = await localiseExam(kind === "module" ? moduleExamPlan(course, level, module!) : undefined, native);
  const content = kind === "module" ? await moduleContent(course, level, module!) : null;

  // Kelime: modül kelimeleri (konuşma başlıkları) ya da seviyenin sık kelimeleri.
  const pool = await db
    .select()
    .from(words)
    .where(and(practiceWordsOf(course), eq(words.niveau, level)))
    .orderBy(asc(sql`coalesce(${words.rank}, 999999)`), asc(words.id))
    .limit(400);
  let candidates = pool;
  if (content) {
    const heads = new Set(content.words.map((w) => w.head));
    const inModule = taughtSense(pool.filter((w) => heads.has(w.de.toLocaleLowerCase("de-DE"))), content.words);
    if (inModule.length >= c.vocab) candidates = inModule;
  }
  const vocab: Round[] = [];
  let seq = 0;
  const nextId = () => `x${++seq}`;
  for (const w of seededShuffle(candidates, `${seed}|vocab`)) {
    if (vocab.length >= c.vocab) break;
    const word = toRoundWord(w, false);
    const r = makeRound(vocab.length % 2 === 0 ? "translate" : "typing", word, pool, nextId, "strong", native) ?? makeRound("typing", word, pool, nextId, "strong", native);
    if (r) vocab.push(r);
  }
  /* Eş anlamlı da doğru (günlük turla aynı kural, QA F-0056: "affetmek" isteminde verzeihen yanlış sayılıyordu). */
  await attachTypingSynonyms(vocab, course, native);

  // Dilbilgisi kaldırıldı (2026-08): cheatsheet gitti, immersion'da yeniden.
  const grammar: GrammarItem[] = [];

  // Cümle kurma: konuşmaların üretim adımları. Seviye sınavında seviyenin bütün
  // modülleri havuz.
  /* Yönergeler anadilde (`moduleProduce`): `content.produce` kaynak dilde,
     yani Türkçe — İngilizce/Almanca okur Türkçe cümle kurmaya çağrılıyordu. */
  const produceSource: ConversationProduceItem[] = content
    ? await moduleProduce(course, level, module!, native)
    : (await conversationsForLevel(course, level)).filter((l) => l.course === course).length
      ? await allModuleProduce(course, level, native)
      : [];
  const produce = produceItems(produceSource, seed, c.produce);

  // Okuma / dinleme: modülde elle yazılmış metin, seviyede beceri bankası.
  const done = new Set((await db.select({ id: userSkills.exerciseId }).from(userSkills).where(eq(userSkills.userId, userId))).map((r) => r.id));
  /*
   * BANKA KURSUN KENDİSİNDEN.
   *
   * Süzgeç `course === "gsw-zh" ? "gsw-zh" : "de"` diye yazılıydı: yalnız iki
   * kurs varken doğruydu, İngilizce kurs eklenince İngilizce öğrenen birinin
   * seviye sınavına ALMANCA okuma ve dinleme metinleri koymaya başladı.
   * Katalogda İngilizce beceri var (seviye başına 25-57); süzgeç artık kursun
   * kendisine bakıyor. Züritüütsch davranışı değişmiyor - onun bankası zaten
   * kendi kimliğiyle süzülüyordu.
   */
  /* BANKA ANADİLDE. Egzersizler olduğu gibi alınıyordu: başlık, Türkçe soru
     kökü/şıkkı ve yazma görevinin yönergesi/kontrol listesi İngilizce/Almanca
     okura Türkçe geliyordu. Beceri sayfalarının çözücüsü (`localiseExercise`,
     hep-ya-hiç) burada da koşuyor; kimlikler ve doğru şık dizini değişmiyor. */
  const bank = await Promise.all(
    BUNDLED_EXERCISES.filter((e) => (e.course ?? "de") === course && e.level === level).map((e) => localiseExercise(e, native)),
  );
  const pickTexts = (skill: "reading" | "listening"): TextItem[] => {
    const list = bank.filter((e) => e.skill === skill && examQuestions(e).length > 0);
    const ordered = [...seededShuffle(list.filter((e) => !done.has(e.id)), `${seed}|${skill}`), ...seededShuffle(list.filter((e) => done.has(e.id)), `${seed}|${skill}|used`)];
    return ordered.slice(0, c.text).map((ex) => ({
      id: `${skill[0]}:${ex.id}`,
      title: ex.title,
      genre: ex.genre,
      text: ex.skill === "reading" ? ex.text : undefined,
      segments: ex.skill === "listening" ? ex.segments.slice(0, 3).map((s) => ({ speaker: s.speaker, text: s.text })) : undefined,
      questions: examQuestions(ex).slice(0, 3).map((q, i) => shuffleQuestion({ text: q.text, options: q.options, answer: q.answer }, `${seed}|${skill}|${ex.id}|${i}`)),
    }));
  };
  const reading = plan ? planReading(plan, 2, seed) : pickTexts("reading");
  const listening = plan ? planListening(plan, 3, seed) : pickTexts("listening");

  // Yazma: modülün kendi görevi; seviyede bankadan serbest görev. Sağlayıcı
  // yoksa bölüm kâğıtta hiç yok.
  const writing: WritingItem[] = [];
  /* ALT SINIR GÖREVİN METNİNDE (QA, 2026-10-09). Hakem "en az 30 kelime"yi ölçüyordu ama A1 modül görevinin
     metni bunu hiç söylemiyordu: dört maddeyi de yazan öğrenci "Görev 2/4" aldı. Sayı `minWords`ten, metin
     hakemin kullandığı aynı anahtardan (`assess.ai_min_words`); metin sayıyı zaten söylüyorsa eklenmiyor. */
  const withMin = (t: Extract<WritingTask, { kind: "free" }>) =>
    !t.minWords || new RegExp(`(?<!\\d)${t.minWords}(?!\\d)`).test(t.prompt)
      ? t
      : { ...t, prompt: `${t.prompt} (${translate(native, "assess.ai_min_words", { n: t.minWords })})` };
  if (chatConfigured()) {
    if (plan) {
      writing.push({ id: `w:${plan.code}`, task: withMin({ kind: "free", ...plan.writing }) });
    } else {
      const tasks = bank
        .filter((e) => e.skill === "writing")
        .flatMap((e) => (e.skill === "writing" ? e.tasks.filter((t): t is Extract<WritingTask, { kind: "free" }> => t.kind === "free").map((t, i) => ({ id: `w:${e.id}:${i}`, task: withMin(t) })) : []));
      writing.push(...seededShuffle(tasks, `${seed}|writing`).slice(0, c.writing));
    }
  }

  // Konuşma: modülün durumunda söylenecek cümleler; seviyede ses çalışması
  // cümleleri. Sunucu STT'sine bağlı DEĞİL (2026-09-27): cümleyi cihazın ya da
  // tarayıcının tanıyıcısı yazıya çeviriyor, puan `/api/pronounce`ta metinden.
  const speaking: SpeakingItem[] = [];
  {
    if (plan) {
      speaking.push(...plan.speaking.slice(0, c.speaking).map((s, i) => ({ id: `s:${plan.code}:${i}`, de: s.de, tr: s.tr, situation: s.situation })));
    } else {
      // Seviye sınavı: o seviyenin MODÜL kâğıtlarındaki konuşma cümleleri
      // havuzlanır. Eskiden ayrı "Ses çalışması" beceri egzersizlerinden
      // besleniyordu; o katman kaldırıldı (konuşma artık konuşmanın kendisi, ayrı
      // beceri düğümü yok) ve zaten yalnız A1 ile B1'de vardı — A2/B2/C1
      // seviye sınavları sessizce konuşmasız kalıyordu. Modül kâğıtları elle
      // yazılmış ve her seviyede fazlasıyla madde taşıyor.
      /* Seviye sınavının konuşma maddeleri modül kâğıtlarından geliyor, yani
         `plan` boşken de ana dile çevrilmeleri gerekiyor — yukarıdaki tek
         kâğıtlık çeviri buraya ulaşmıyor. */
      /* Havuz KÂĞITLARIN KENDİSİNDEN kuruluyor, sayarak değil.
         Önce `moduleExamPlan(course, level, i + 1)` ile index'leniyordu ve iki
         ayrı kusuru vardı: `i + 1` sıfır tabanlı index'i kaydırdığı için
         seviyenin BİRİNCİ kâğıdı havuza hiç girmiyordu, `moduleCount` ise o
         gün kursu bilmiyordu (tablo yalnız seviyeye göre anahtarlıydı ve
         ölçü Almanca kursundu) — İngilizce B1'de on kâğıt için on sekiz kez
         soruluyordu. Tablo sonradan kursa göre bölündü; havuzun kâğıtları
         doğrudan okuması yine de doğrusu, çünkü aradaki sayı bir varsayım.
         `moduleExamPlan` yoksa `undefined` döndüğü ve `flatMap` onu düşürdüğü
         için ikisi de hiçbir yerde hata vermiyordu; biri bir kâğıdı sessizce
         hiç sormuyor, öteki boşuna sekiz kez arıyordu. */
      const havuz = (
        await Promise.all(
          courseExams(course)
            .filter((p) => p.level === level)
            .map((p) => localiseExam(p, native)),
        )
      ).flatMap((p) => (p ? p.speaking.map((sp, i) => ({ ...sp, code: p.code, i })) : []));
      for (const sp of seededShuffle(havuz, `${seed}|speaking`)) {
        if (speaking.length >= c.speaking) break;
        speaking.push({ id: `s:${sp.code}:${sp.i}`, de: sp.de, tr: sp.tr, situation: sp.situation });
      }
    }
  }

  const cover: ExamCover | null = plan
    ? { code: plan.code, titleDe: plan.titleDe, titleTr: plan.titleTr, focus: plan.focus, canDo: plan.canDo }
    : null;

  return {
    kind,
    level,
    module,
    trial,
    seconds: kind === "module" ? MODULE_SECONDS : LEVEL_SECONDS,
    cover,
    sections: { vocab, grammar, produce, reading, listening, speaking, writing },
    seed,
  };
}

/**
 * `verified`: bölümler sunucuda, mühürlü anahtara karşı puanlandı mı (bkz.
 * `api/exam` finish). Doğrulanmamış kayıt `answers.verified = false` taşıyor
 * ve okuyan her yer onu deneme gibi sayıyor: sertifika yok, modül tacı yok,
 * seviye geçişi yok (güvenlik denetimi 2026-10-03, O1). Alanı olmayan eski
 * kayıtlar doğrulanmış sayılıyor — değiştirilmiş kayıt geriye dönük yazılamaz.
 */
export async function finishExam(
  userId: string,
  paper: Pick<ExamPaper, "kind" | "level" | "module" | "trial">,
  sub: ExamSubmission,
  day: string,
  /** `keyJti`: bitişi yapan anahtarın deneme kimliği; `reviewed`: bu bitiş cevap anahtarını döndürdü. */
  opts: { verified: boolean; keyJti?: string; reviewed?: boolean },
): Promise<ExamResult> {
  const { sections, total, passed } = scoreSections(sub, paper.kind);
  const key = examKindKey(paper.kind, paper.level, paper.module);
  const answers = {
    sections, passed, trial: paper.trial, verified: opts.verified, seconds: sub.seconds, vocab: sub.vocabAnswers ?? [],
    ...(opts.keyJti ? { keyJti: opts.keyJti } : {}),
    ...(opts.reviewed ? { reviewed: true } : {}),
  };
  const correct = Math.round(sections.reduce((a, s) => a + s.correct, 0));
  const items = sections.reduce((a, s) => a + s.total, 0);
  /* Doğrulanmamış sonuç (pratik, eski istemci) aynı günün DOĞRULANMIŞ GEÇİŞİNİN
     üstüne yazılmıyor: geçmiş sınavı yeniden çözen kullanıcı sertifikasını
     kaybetmesin (güvenlik denetimi 2026-10-07, anahtar görülmüş hafta). */
  const keepPass = sql`not (coalesce(${exams.answers}->>'verified', 'true') <> 'false' and coalesce(${exams.answers}->>'trial', 'false') <> 'true' and ${exams.answers}->>'passed' = 'true')`;
  let [row] = await db
    .insert(exams)
    .values({ userId, kind: key, week: day, level: paper.level, score: total, correct, total: items, answers })
    .onConflictDoUpdate({
      target: [exams.userId, exams.kind, exams.week],
      set: { score: total, correct, total: items, answers },
      ...(opts.verified ? {} : { setWhere: keepPass }),
    })
    .returning({ id: exams.id, at: exams.createdAt });
  if (!row) {
    [row] = await db
      .select({ id: exams.id, at: exams.createdAt })
      .from(exams)
      .where(and(eq(exams.userId, userId), eq(exams.kind, key), eq(exams.week, day)));
  }
  await track(userId, "exam_finish", day, total, `${paper.kind}:${paper.level}`);
  /* İstemciye `trial` "sayılmaz" anlamında gidiyor: doğrulanmamış sonuç da
     sertifika düğmesi göstermesin (eski istemciler `verified`'ı bilmiyor). */
  return { id: row.id, kind: paper.kind, level: paper.level, module: paper.module, trial: paper.trial || !opts.verified, sections, total, passed, at: row.at.toISOString() };
}

/**
 * BU HAFTA CEVAP ANAHTARI AÇIKLANMIŞ DENEMELER (güvenlik denetimi 2026-10-07).
 *
 * Kâğıt kullanıcı + tür + HAFTA başına sabit (`buildExam` tohumu), kayıt ise
 * gün başına. Bitiş cevap anahtarını döndürdüğü için aynı hafta yeniden
 * başlatılan sınav aynı soruları, cevapları bilinen hâlde getiriyor. Dönen
 * `jtis` aynı jetonun tekrarını, `any` anahtar görülmüş haftayı yakalıyor.
 */
export async function reviewedThisWeek(
  userId: string,
  kind: ExamKind,
  level: CefrLevel,
  module: number | null,
  day: string,
): Promise<{ any: boolean; jtis: Map<string, number> }> {
  const rows = await db
    .select({ id: exams.id, answers: exams.answers })
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, examKindKey(kind, level, module)), sql`${exams.week} >= ${weekStart(day)}`));
  const jtis = new Map<string, number>();
  let any = false;
  for (const r of rows) {
    const a = r.answers as { reviewed?: boolean; keyJti?: string } | null;
    if (a?.reviewed) any = true;
    if (a?.keyJti) jtis.set(a.keyJti, r.id);
  }
  return { any, jtis };
}

export async function examHistory(userId: string, limit = 10): Promise<ExamResult[]> {
  const rows = await db
    .select()
    .from(exams)
    .where(and(eq(exams.userId, userId), sql`${exams.kind} like 'module:%' or ${exams.kind} like 'level:%'`))
    .orderBy(desc(exams.createdAt))
    .limit(limit);
  return rows.map((r) => {
    const [kind, level, mod] = r.kind.split(":");
    const a = r.answers as { sections: SectionScore[]; passed: boolean; trial: boolean; verified?: boolean };
    return { id: r.id, kind: kind as ExamKind, level: level as CefrLevel, module: mod ? Number(mod) : null, trial: Boolean(a?.trial) || a?.verified === false, sections: a?.sections ?? [], total: r.score, passed: passesExamRules(r.score, a?.sections ?? []), at: r.createdAt.toISOString() };
  });
}

export async function examById(userId: string, id: number): Promise<ExamResult | null> {
  const list = await examHistory(userId, 200);
  return list.find((e) => e.id === id) ?? null;
}

/**
 * Geçilmiş modül sınavları: "A1:2" → en iyi toplam puan.
 *
 * Yol haritasındaki taç buradan okuyor. Deneme kayıtları sayılmıyor: modül
 * konuşmaları bitmeden girilen sınav bir kanıt değil, bir ön izleme.
 */
export async function passedModuleExams(userId: string): Promise<Map<string, number>> {
  const rows = await db
    .select({ kind: exams.kind, score: exams.score, answers: exams.answers })
    .from(exams)
    .where(and(eq(exams.userId, userId), sql`${exams.kind} like 'module:%'`));
  const out = new Map<string, number>();
  for (const r of rows) {
    const a = r.answers as { sections?: SectionScore[]; trial?: boolean; verified?: boolean } | null;
    /* Bayrak değil BUGÜNKÜ kural (`passesExamRules`): eşik inince eski %60–69 da sayılır. */
    if (!passesExamRules(r.score, a?.sections ?? []) || a?.trial || a?.verified === false) continue;
    const [, level, mod] = r.kind.split(":");
    const key = `${level}:${Number(mod)}`;
    out.set(key, Math.max(out.get(key) ?? 0, r.score));
  }
  return out;
}

/** Sınavı geçilmiş modülün yapabilirlik satırları — sertifika ve profil için. */
export function examCando(course: string, level: string, module: number | null): ExamCando[] {
  if (module === null) return [];
  return moduleExamPlan(course, level, module)?.canDo ?? [];
}

/**
 * Seviyenin BÜTÜN modüllerinin üretim adımları — seviye sınavının havuzu.
 *
 * Modül içeriği artık async (yayın hattından okunuyor), o yüzden döngü ayrı
 * bir işleve alındı: ifade içinde `await` ile kurulan `Array.from` okunaksız
 * ve tip çıkarımı da orada şaşıyor.
 */
async function allModuleProduce(course: string, level: string, native: NativeLang): Promise<ConversationProduceItem[]> {
  const n = await conversationModuleCount(course, level);
  const out: ConversationProduceItem[] = [];
  for (let i = 0; i < n; i++) out.push(...(await moduleProduce(course, level, i, native)));
  return out;
}

import "server-only";
import { and, eq, gte, isNotNull, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments, exams, reviews, userLessons, userSkills, words } from "@/lib/db/schema";
import { findLesson } from "@/lib/lessons";
import { type GameId } from "@/lib/types";
import { listExerciseMeta } from "@/lib/skills";
import { nextLesson } from "@/lib/lessons/progress";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { computeProficiency, DECAY_DAYS, PROFICIENCY_LABELS, weakestSkill, type Evidence, type Proficiency, type ProficiencySkill } from "@/lib/proficiency";
import type { Assessment } from "@/lib/assess-prompts";

/**
 * Yetkinlik kanıtlarını toplar (WP-50, adım 2) ve "sıradaki en iyi adım"ı
 * önerir (adım 4).
 *
 * Model başlangıçta üç kaynak okuyordu — beceri egzersizleri, AI
 * değerlendirmeleri ve sınavlar — ve bu, uygulamada geçirilen zamanın
 * AZINLIĞIYDI. Kullanıcı günlerce kelime oyunu oynayıp ders bitiriyor,
 * dilbilgisi çalışıyor, sonra "yetkinlik" panosunda "ölçülmedi" görüyordu.
 * Ölçülmemiş değildi; ölçülene bakılmıyordu.
 *
 * Kaynaklar:
 *   exam       — `exams` (weekly → kelime, diğerleri → dilbilgisi)
 *   assessment — `assessments.result.score.overall` (writing → yazma,
 *                sentence → dilbilgisi, speaking/roleplay → konuşma)
 *   lesson     — `user_lessons` doğru/toplam (dersin seviyesi, dilbilgisi)
 *   exercise   — `user_skills.last_score` (beceri, seviye, son deneme)
 *   drill      — `cheat_progress` (dilbilgisi çalışması, sayfanın seviyesi)
 *   game       — `reviews` × `words.niveau` (oyun türüne göre beceri)
 *
 * Yerleştirme (placements) kanıta girmiyor: puanı beceri başına değil, seviye
 * tahmini; ayrı gösteriliyor.
 */

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);

/**
 * Oyun → beceri.
 *
 * Çoğu oyun kelime tanımayı ölçüyor ama hepsi değil: "Kulaktan Tanı" sesten
 * anlamaya gidiyor, "Sesli Söyle" üretim; "Cümleyi Diz", "Cümleyi Tamamla",
 * "Artikel Yarışı" ve "Çoğul Bilmece" ise kelimenin BİÇİMİNİ soruyor, yani
 * dilbilgisi. Hepsini kelimeye yazmak, dilbilgisi çalışan birinin dilbilgisi
 * kutusunu boş bırakırdı.
 */
const GAME_SKILL: Partial<Record<GameId, ProficiencySkill>> = {
  listen: "listening",
  speak: "speaking",
  cloze: "grammar",
  order: "grammar",
  artikel: "grammar",
  plural: "grammar",
};

/**
 * Bir oyun kanıtının sayılması için gereken en az cevap.
 *
 * Tek cevaplık bir grup ya 0 ya 100 verir ve ikisi de yalan: tek soruyu
 * bilmek ustalık, tek soruyu kaçırmak çöküş değil. Üç, gürültüyü kesen en
 * küçük sayı.
 */
const MIN_GAME_ANSWERS = 3;

/**
 * `now` hem pencerenin sonu hem sönümün başlangıcı.
 *
 * Sorgular başlangıçta yalnızca alt sınır koyuyordu (`>= since`). Gelişim
 * raporu "4 hafta önce neredeydi" anlık görüntüsünü `gatherEvidence(id,
 * dörtHaftaÖnce)` ile alıyor ve üst sınır olmadığı için o görüntüye BUGÜNÜN
 * kanıtları da giriyordu — üstelik sönümsüz, çünkü `decay` gelecekteki bir
 * tarihe tam ağırlık veriyor. Sonuç: "önce" ile "şimdi" birbirine yaklaşıyor
 * ve ilerleme okları olduğundan küçük çıkıyordu.
 */
export async function gatherEvidence(userId: string, now = new Date()): Promise<Evidence[]> {
  const since = new Date(now.getTime() - DECAY_DAYS * 86400000);
  const out: Evidence[] = [];

  const skills = await db
    .select({ skill: userSkills.skill, level: userSkills.level, lastScore: userSkills.lastScore, lastAt: userSkills.lastAt })
    .from(userSkills)
    .where(and(eq(userSkills.userId, userId), gte(userSkills.lastAt, since), lte(userSkills.lastAt, now), isNotNull(userSkills.lastScore)));
  for (const r of skills) {
    if (!r.skill || !r.level || !LEVELS.has(r.level) || r.lastScore === null) continue;
    out.push({ skill: r.skill as SkillId, level: r.level as CefrLevel, score: r.lastScore, source: "exercise", at: r.lastAt });
  }

  const ai = await db
    .select({ kind: assessments.kind, level: assessments.level, result: assessments.result, createdAt: assessments.createdAt })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), gte(assessments.createdAt, since), lte(assessments.createdAt, now), isNotNull(assessments.result)));
  for (const r of ai) {
    const score = (r.result as Assessment | null)?.score?.overall;
    if (typeof score !== "number" || !LEVELS.has(r.level)) continue;
    const skill: ProficiencySkill = r.kind === "writing" ? "writing" : r.kind === "sentence" ? "grammar" : "speaking";
    out.push({ skill, level: r.level as CefrLevel, score, source: "assessment", at: r.createdAt });
  }

  const ex = await db
    .select({ kind: exams.kind, level: exams.level, score: exams.score, createdAt: exams.createdAt })
    .from(exams)
    .where(and(eq(exams.userId, userId), gte(exams.createdAt, since), lte(exams.createdAt, now)));
  for (const r of ex) {
    if (!LEVELS.has(r.level)) continue;
    out.push({ skill: r.kind === "weekly" ? "vocab" : "grammar", level: r.level as CefrLevel, score: r.score, source: "exam", at: r.createdAt });
  }

  out.push(...(await lessonEvidence(userId, since, now)));
  out.push(...(await gameEvidence(userId, since, now)));
  return out;
}

/**
 * Dersler.
 *
 * Bir ders bir dilbilgisi kuralını öğretip hemen ölçüyor (`correct`/`total`),
 * yani puanı olan bir bütün — kanıt olarak sınavın altında, tek egzersiğin
 * üstünde. Seviye ders kimliğinden değil ders tanımından okunuyor: kimlik
 * biçimi ("de-a1-familie") kural değil gelenek ve değişirse sessizce yanlış
 * seviyeye yazardı.
 *
 * Rol oynama puansız olduğu için kanıta girmiyor; yapıldı bilgisi ilerleme
 * hesabında, ölçümde değil.
 */
async function lessonEvidence(userId: string, since: Date, until: Date): Promise<Evidence[]> {
  const rows = await db
    .select({ lessonId: userLessons.lessonId, correct: userLessons.correct, total: userLessons.total, lastAt: userLessons.lastAt })
    .from(userLessons)
    .where(and(eq(userLessons.userId, userId), gte(userLessons.lastAt, since), lte(userLessons.lastAt, until)));
  const out: Evidence[] = [];
  for (const r of rows) {
    if (!r.total) continue;
    const level = findLesson(r.lessonId)?.level;
    if (!level || !LEVELS.has(level)) continue;
    out.push({
      skill: "grammar",
      level: level as CefrLevel,
      score: Math.round((r.correct / r.total) * 100),
      source: "lesson",
      at: r.lastAt,
    });
  }
  return out;
}

/**
 * Dilbilgisi çalışması.
 *
 * Burada cevap cevap bir günlük yok, tekrar durumu var; puanı ondan türetmek
 * gerekiyor. Kullanılan ölçü ART ARDA DOĞRU sayısı, ömür boyu doğruluk değil:
 * yetkinlik "şu anda biliyor mu" sorusu, "bir zamanlar kaç kere bildi"
 * sorusu değil. Üst üste bir kez yanlış cevaplamak seriyi sıfırlıyor ve bu,
 * modelin görmesi gereken şeyin ta kendisi.
 *
 * Eşleme: 0 → 0, 1 → 60, 2 → 80, 3 ve üstü → 100. Sıfırdan altmışa sıçrama
 * bilinçli; tek doğru "başlangıç" değil ama "sağlam" da değil.
 */

/**
 * Kelime oyunları.
 *
 * Uygulamada geçirilen zamanın çoğu burada ve model bunu hiç görmüyordu.
 * Kelimenin seviyesi `words.niveau`dan geliyor — oyunun değil, SORULAN
 * KELİMENİN seviyesi, çünkü B1 çalışan birinin turunda A1 kelimeleri de var
 * ve onları bilmek B1 kanıtı değil.
 *
 * Toplama GÜN × SEVİYE × BECERİ başına, oyun türü başına değil. Cevap başına
 * kanıt üretmek yoğun bir günü bir sınavın altmış katı ağırlığa çıkarırdı;
 * oyun türü başına toplamak ise daha ince bir biçimde aynı hatayı yapıyordu —
 * aynı gün beş farklı kelime oyunu oynayan biri, tek bir günü beş kez
 * saydırıyordu. Beceri başına günde tek ölçüm, "o gün o beceride ne kadar
 * doğru cevapladı" sorusunun tam karşılığı.
 *
 * Birleştirme cevap sayısıyla ağırlıklı: kırk cevaplık bir oyunla üç cevaplık
 * bir oyunu eşit saymak, günün ortalamasını küçük olanın lehine bozardı.
 */
async function gameEvidence(userId: string, since: Date, until: Date): Promise<Evidence[]> {
  const rows = await db
    .select({
      day: sql<string>`(${reviews.createdAt} at time zone 'utc')::date::text`,
      game: reviews.game,
      niveau: words.niveau,
      correct: sql<number>`count(*) filter (where ${reviews.correct})::int`,
      total: sql<number>`count(*)::int`,
      at: sql<Date>`max(${reviews.createdAt})`,
    })
    .from(reviews)
    .innerJoin(words, eq(words.id, reviews.wordId))
    .where(and(eq(reviews.userId, userId), gte(reviews.createdAt, since), lte(reviews.createdAt, until)))
    .groupBy(sql`(${reviews.createdAt} at time zone 'utc')::date`, reviews.game, words.niveau);

  const merged = new Map<string, { skill: ProficiencySkill; level: string; correct: number; total: number; at: Date }>();
  for (const r of rows) {
    if (!LEVELS.has(r.niveau)) continue;
    const skill = GAME_SKILL[r.game as GameId] ?? "vocab";
    const key = `${r.day}|${r.niveau}|${skill}`;
    const at = new Date(r.at);
    const a = merged.get(key) ?? { skill, level: r.niveau, correct: 0, total: 0, at };
    a.correct += r.correct;
    a.total += r.total;
    if (at > a.at) a.at = at;
    merged.set(key, a);
  }

  const out: Evidence[] = [];
  for (const a of merged.values()) {
    // Eşik birleştirmeden SONRA: üç cevaplık iki oyun, birlikte altı cevaplık
    // bir gün demek ve o gün gürültü değil.
    if (a.total < MIN_GAME_ANSWERS) continue;
    out.push({
      skill: a.skill,
      level: a.level as CefrLevel,
      score: Math.round((a.correct / a.total) * 100),
      source: "game",
      at: a.at,
    });
  }
  return out;
}

export type NextStep = {
  skill: ProficiencySkill;
  label: string;
  /** Neden bu: "kelime B1 ölçülmedi" / "dinleme A2 47 — gelişiyor". */
  reason: string;
  href: string;
  title: string;
  minutes: number;
};

/**
 * En düşük kanıtlı beceri × mevcut seviye → o beceriden yapılmamış bir
 * egzersiz; beceri egzersizi olmayan beceriler (kelime, dilbilgisi) için
 * kelime turu / dilbilgisi çalışması; hiçbiri yoksa sıradaki ders.
 */
export async function nextStep(userId: string, course: string, level: CefrLevel, prof: Proficiency): Promise<NextStep | null> {
  const metas = (await listExerciseMeta(course)).filter((m) => m.level === level);
  const done = new Set(
    (await db.select({ exerciseId: userSkills.exerciseId }).from(userSkills).where(eq(userSkills.userId, userId))).map((r) => r.exerciseId),
  );
  const order = [...PROFICIENCY_SKILLSORDERED].sort((a, b) => (prof[a]?.[level]?.score ?? -1) - (prof[b]?.[level]?.score ?? -1));
  for (const skill of order) {
    const cell = prof[skill]?.[level];
    const reason = cell ? `${PROFICIENCY_LABELS[skill]} ${level} ${cell.score} — ${cell.band}` : `${PROFICIENCY_LABELS[skill]} ${level} henüz ölçülmedi`;
    if (skill === "vocab") return { skill, label: PROFICIENCY_LABELS[skill], reason, href: "/learn", title: "Kelime turu", minutes: 6 };
    if (skill === "grammar") return { skill, label: PROFICIENCY_LABELS[skill], reason, href: "/lessons", title: "Dilbilgisi çalışması", minutes: 5 };
    const open = metas.find((m) => m.skill === skill && !done.has(m.id));
    if (open) return { skill, label: PROFICIENCY_LABELS[skill], reason, href: `/immersion/skill/${open.id}`, title: open.title, minutes: open.minutes };
  }
  const lesson = await nextLesson(userId, course, level);
  if (lesson) return { skill: "speaking", label: "Ders", reason: "sıradaki ders", href: `/lessons/${lesson.lesson.id}`, title: lesson.lesson.title, minutes: lesson.lesson.minutes };
  return null;
}

/** Öneri sırası: dört beceri önce; kelime ve dilbilgisi zaten günlük turda çalışılıyor, en sona. */
const PROFICIENCY_SKILLSORDERED: ProficiencySkill[] = ["reading", "listening", "writing", "speaking", "grammar", "vocab"];

export async function proficiencyFor(userId: string, course: string, level: CefrLevel) {
  const evidence = await gatherEvidence(userId);
  const prof = computeProficiency(evidence);
  const next = await nextStep(userId, course, level, prof);
  return { proficiency: prof, next, evidenceCount: evidence.length, weakest: weakestSkill(prof, level) };
}

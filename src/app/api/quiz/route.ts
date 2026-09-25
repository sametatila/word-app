import { NextResponse } from "next/server";
import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, userWords, weeklyQuizAttempts, words } from "@/lib/db/schema";
import { getUserInfo } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile, submitAnswers } from "@/lib/session";
import { nativeOf, targetLangOf } from "@/lib/courses";
import { glossFor, withArtikel } from "@/lib/option-label";
import { practiceWordsOf } from "@/lib/practice-words";
import { track } from "@/lib/events";
import { quizForWeek } from "@/lib/weekly-quiz";
import { personalItem, selectItems, weekIndexOf, weekStartOf, type PersonalWord } from "@/lib/weekly-quiz/build";
import { disabledItemsOf } from "@/lib/content/read";
import { quizPack, packCourseOf } from "@/lib/content/packs";
import { resolveByIds, resolveItem, scoreQuiz, toClient } from "@/lib/weekly-quiz/scoring";
import type { QuizCourse, QuizItem, QuizLevel, QuizNative } from "@/lib/weekly-quiz/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Haftalık quiz — İSTEMCİNİN TEK UCU.
 *
 * MANİPÜLASYONA KAPALI OLMANIN ÜÇ KURALI, hepsi burada:
 *
 *  1. HAFTA SUNUCUDAN. İstemci gün göndermiyor; hafta `now()`dan türüyor.
 *     Eski haftalık sınavın açığı buradaydı — gün istemciden geliyor ve
 *     `clampDay` ±1 güne izin veriyordu, yani pazartesi "dün" göndermek
 *     önceki haftanın satırını açıyordu.
 *  2. ÖRNEK AÇILIŞTA SAKLANIYOR. Hangi maddelerin sorulduğuna istemci karar
 *     vermiyor; ilk GET'te seçim yapılıp deftere yazılıyor. Sonraki her istek
 *     aynı örneği görüyor.
 *  3. PUANLAMA SUNUCUDA. İstemci yalnız HANGİ ŞIKKI seçtiğini gönderiyor,
 *     doğru olup olmadığını değil. Cevap anahtarı hiçbir yanıtta yer almıyor
 *     — bitene kadar.
 *
 * `exams` SATIRI KORUNUYOR. Gelişim grafiği, başarımlar ve yeterlilik kanıtı
 * `exams` tablosundaki `kind='weekly'` satırlarını okuyor (growth, achievements,
 * proficiency-data). Quiz bitince o satır da yazılıyor, yoksa üç ayrı yüzey
 * sessizce boşalırdı.
 */

/** Sunucu günü — istemcinin gönderdiği hiçbir değer bu karara girmiyor. */
const serverDay = (): string => new Date().toISOString().slice(0, 10);

type Attempt = typeof weeklyQuizAttempts.$inferSelect;

/**
 * Kişisel blok için sözcük çeker: sırada olan (due) bir sözcük hedef,
 * yakınındakiler çeldirici.
 *
 * Çeldiriciler ÖĞRENCİNİN KENDİ havuzundan: rastgele sözcükler yerine
 * gerçekten karıştırılabilecek, aynı kurstan ve aynı bantta sözcükler.
 */
async function personalPool(userId: string, course: string, native: QuizNative): Promise<PersonalWord[]> {
  try {
    const rows = await db
      .select({ id: words.id, term: words.de, artikel: words.artikel, tr: words.tr, en: words.en, deGloss: words.deGloss })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(and(eq(userWords.userId, userId), practiceWordsOf(course), sql`${userWords.reps} > 0`))
      .orderBy(asc(userWords.dueAt))
      .limit(24);
    /* Soru kökü ANADİLDE (`glossFor`): `tr ?? en` İngilizce anadilli öğrenciye
       Türkçe kök veriyordu. Anadilde karşılığı olmayan sözcük havuza girmiyor.
       Şık artikelli (`withArtikel`): kelime oyunlarıyla aynı biçim. */
    return rows.flatMap((r) => {
      const gloss = glossFor(r, native)?.text;
      return gloss ? [{ wordId: r.id, term: withArtikel({ de: r.term, artikel: r.artikel }), gloss }] : [];
    });
  } catch {
    return [];
  }
}

/** Yazılı bloklar + (varsa) kişisel blok. */
async function buildItems(userId: string, course: QuizCourse, level: QuizLevel, week: string, weekIx: number, native: QuizNative): Promise<{ quizId: string; items: QuizItem[] } | null> {
  const pack = quizForWeek(course, level, weekIx);
  if (!pack) return null;
  const seed = `${userId}:${week}`;
  /* KAPATILMIŞ MADDELER HAVUZDAN DÜŞÜYOR.
     Haftalık quiz içeriği yayın hattında DEĞİL (sunucuda kuruluyor, istemciye
     paket olarak inmiyor) ama kapatma listesi sürümden bağımsız: olmayan bir
     paketin maddesi de kapatılabiliyor. Bozuk soru böylece bir sonraki
     yayını beklemeden düşüyor. */
  const items = selectItems(pack, { seed, disabled: await disabledItemsOf(quizPack(packCourseOf(pack.course))) });

  const pool = await personalPool(userId, course, native);
  if (pool.length >= 3) {
    const personal = personalItem(pool[0], pool.slice(1), seed, native);
    if (personal) items.push(personal);
  }
  return { quizId: pack.id, items };
}

/** Saklanan örneği koddan yeniden çözer — kişisel madde dahil. */
async function rehydrate(attempt: Attempt, course: QuizCourse, level: QuizLevel, weekIx: number): Promise<QuizItem[]> {
  const pack = quizForWeek(course, level, weekIx);
  const ids = (attempt.itemIds as string[]) ?? [];
  const byId = new Map((pack?.items ?? []).map((i) => [i.id, i]));
  const out: QuizItem[] = [];
  let personalId: string | null = null;
  for (const id of ids) {
    const it = byId.get(id);
    if (it) out.push(it);
    else if (id.startsWith("personal-")) personalId = id;
  }
  if (personalId) {
    /* Kişisel madde üretiliyor, yazılı havuzda yok. Aynı tohumla yeniden
       kurulması gerekiyor; sözcük havuzu değiştiyse kurulamaz ve madde
       sessizce düşer — puanlama kalan maddeler üzerinden yapılır. */
    const wordId = Number(personalId.slice("personal-".length));
    const native = attempt.native as QuizNative;
    const pool = await personalPool(attempt.userId, course, native);
    const target = pool.find((w) => w.wordId === wordId);
    if (target) {
      const p = personalItem(target, pool.filter((w) => w.wordId !== wordId), `${attempt.userId}:${attempt.week}`, native);
      if (p) out.push(p);
    }
  }
  return out;
}

async function context(userId: string) {
  const profile = await ensureProfile(userId);
  const course = (targetLangOf(profile.course) === "en" ? "en" : "de") as QuizCourse;
  const level = (profile.level ?? "A1") as QuizLevel;
  const native = nativeOf(profile.nativeLang) as QuizNative;
  const day = serverDay();
  return { course, level, native, week: weekStartOf(day), weekIx: weekIndexOf(day), day };
}

/* ── GET: durum + (gerekirse) örnek ───────────────────────────────────── */

export async function GET() {
  const who = await getUserInfo();
  if (!who?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = who.id;

  try {
    const { course, level, native, week, weekIx } = await context(userId);
    const [existing] = await db
      .select()
      .from(weeklyQuizAttempts)
      .where(and(eq(weeklyQuizAttempts.userId, userId), eq(weeklyQuizAttempts.week, week)))
      .limit(1);

    /* BİTMİŞ: sonuç dökümü dönüyor — açıklamalar (`why`) ancak burada iniyor. */
    if (existing?.state === "done") {
      const items = await rehydrate(existing, course, level, weekIx);
      const resolved = items.map((i) => resolveItem(i, existing.native as QuizNative));
      const score = scoreQuiz(resolved, (existing.answers as Record<string, number>) ?? {});
      return NextResponse.json(
        {
          week,
          done: true,
          score,
          quiz: null,
        },
        { headers: { "cache-control": "no-store" } },
      );
    }

    const pack = quizForWeek(course, level, weekIx);
    if (!pack) {
      // O kurs/seviye için içerik yok: ekran bunu dürüstçe söylüyor.
      return NextResponse.json({ week, done: false, quiz: null, empty: true }, { headers: { "cache-control": "no-store" } });
    }

    let items: QuizItem[];
    let quizId: string;
    if (existing) {
      items = await rehydrate(existing, course, level, weekIx);
      quizId = existing.quizId;
    } else {
      const built = await buildItems(userId, course, level, week, weekIx, native);
      if (!built) return NextResponse.json({ week, done: false, quiz: null, empty: true });
      items = built.items;
      quizId = built.quizId;
      await db
        .insert(weeklyQuizAttempts)
        .values({ userId, week, quizId, native, itemIds: items.map((i) => i.id), total: items.length })
        .onConflictDoNothing();
      /* Olay sözlüğü sabit (bkz. lib/events): quiz eski haftalık sınavın yerine
         geçtiği için aynı olay adlarını kullanıyor — geçmiş ölçüm kesilmesin. */
      void track(userId, "exam_start", serverDay(), 0, `usage:${level}`);
    }

    const useNative = (existing?.native as QuizNative) ?? native;
    return NextResponse.json(
      {
        week,
        done: false,
        quiz: {
          id: quizId,
          theme: pack.theme,
          themeTr: pack.themeTr,
          level: pack.level,
          stimuli: pack.stimuli,
          items: items.map((i) => toClient(resolveItem(i, useNative))),
        },
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[quiz] GET", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/* ── POST: cevaplar → SUNUCU puanlaması ───────────────────────────────── */

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const who = await getUserInfo();
  if (!who?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = who.id;

  let raw: unknown;
  try {
    raw = (await req.json()) as unknown;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  /* İSTEMCİ YALNIZ ŞIK SIRASI GÖNDERİYOR. Gövdede `correct` gibi bir alan
     olsa bile okunmuyor; puanlayıcı yalnız bu haritayı görüyor. */
  const body = (raw ?? {}) as { answers?: Record<string, unknown> };
  const answers: Record<string, number> = {};
  for (const [k, v] of Object.entries(body.answers ?? {})) {
    if (typeof k === "string" && k.length <= 64 && Number.isInteger(v)) answers[k] = v as number;
  }

  try {
    const { course, level, week, weekIx, day } = await context(userId);
    const [attempt] = await db
      .select()
      .from(weeklyQuizAttempts)
      .where(and(eq(weeklyQuizAttempts.userId, userId), eq(weeklyQuizAttempts.week, week)))
      .limit(1);
    if (!attempt) return NextResponse.json({ error: "no_attempt" }, { status: 409 });

    const items = await rehydrate(attempt, course, level, weekIx);
    const resolved = resolveByIds(
      { items } as unknown as Parameters<typeof resolveByIds>[0],
      (attempt.itemIds as string[]) ?? [],
      attempt.native as QuizNative,
    );

    /* TEK HAK. İkinci gönderim yeni bir puan üretmiyor, mevcut sonucu
       döndürüyor — ağ koptuğunda tekrar gönderen öğrenci ceza görmesin. */
    if (attempt.state === "done") {
      const prev = scoreQuiz(resolved, (attempt.answers as Record<string, number>) ?? {});
      return NextResponse.json({ saved: false, score: prev });
    }

    const score = scoreQuiz(resolved, answers);

    await db
      .update(weeklyQuizAttempts)
      .set({
        answers,
        state: "done",
        correct: score.correct,
        total: score.total,
        score: score.pct,
        finishedAt: new Date(),
      })
      .where(eq(weeklyQuizAttempts.id, attempt.id));

    /* `exams` satırı: gelişim grafiği, başarımlar ve yeterlilik kanıtı bunu
       okuyor. Aynı hafta ikinci satır yazılmıyor (tabloda benzersiz). */
    await db
      .insert(exams)
      .values({
        userId,
        kind: "weekly",
        week,
        level,
        score: score.pct,
        correct: score.correct,
        total: score.total,
        answers: score.items.map((i) => ({ itemId: i.itemId, block: i.block, correct: i.correct })),
      })
      .onConflictDoNothing();

    /* KİŞİSEL MADDE SRS'E DÖNÜYOR. Yanlış bilinen sözcük tekrar kuyruğuna
       düşüyor — eski haftalık sınavın "dürüst ölçüm" davranışı korunuyor.
       Doğruluk kararı SUNUCUNUN, istemcinin değil. */
    const personal = score.items.find((i) => i.block === "personal");
    if (personal) {
      const wordId = Number(personal.itemId.slice("personal-".length));
      if (Number.isInteger(wordId)) {
        await submitAnswers(
          userId,
          [{ wordId, game: "choice", correct: personal.correct, latencyMs: 0, quality: personal.correct ? 4 : 2 }],
          day,
          0,
        ).catch(() => {});
      }
    }

    void track(userId, "exam_finish", day, score.pct, `usage:${level}`);
    return NextResponse.json({ saved: true, score });
  } catch (err) {
    console.error("[quiz] POST", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

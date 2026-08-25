import "server-only";
import { and, desc, eq, gte, isNotNull, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { events, reviews, userLessons, userSkills, userWords } from "@/lib/db/schema";
import { ERROR_LABELS, ERROR_TARGET_GAME, isErrorType } from "@/lib/errors";
import { GAME_LABELS, type GameId } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";
import { computeProficiency } from "@/lib/proficiency";
import { gatherEvidence, nextStep } from "@/lib/proficiency-data";
import { nextLesson } from "@/lib/lessons/progress";
import { weeklyStatus } from "@/lib/weekly";

/**
 * Bugünkü plan (plan WP-60).
 *
 * /learn bir "modlar listesi"ydi: tur, günün turu, hayatta kalma, yürüyüş,
 * dilbilgisi, görevler — hepsi eşit ağırlıkta, hiçbiri "bugün ne yapmalıyım"
 * demiyor. Plan o soruya cevap: 3–4 öğe, tahmini süre, tek "Başla".
 *
 * Öğeler ve kaynakları:
 *   1. Tekrar turu — SRS: vadesi gelen kelime sayısı (`user_words.due_at`).
 *   2. Sıradaki ders — `nextLesson` (vadesi gelen ya da ilk açılmamış).
 *   3. Bir beceri egzersizi — seviyede en az çalışılmış beceriden, yapılmamış
 *      ilk egzersiz (WP-50 yetkinlik modeli gelene kadar geçici kural:
 *      "en az yapılan beceri" = en zayıf varsayımı).
 *   4. Hedefli çalışma — son 14 günün en sık hata tipi (≥ 5 kez): o tipin
 *      oyunuyla tek oyunlu tur (WP-51 drill motoru gelene kadar).
 *   (Haftalık sınav WP-42 ile gelir.)
 *
 * "Yapıldı" işareti bugünün kayıtlarından türetilir; ayrı bir tablo yok —
 * plan bir öneri, bir sözleşme değil; kullanıcı sırayı bozarsa plan yine
 * doğru sayar.
 */

export type PlanItem = {
  id: "review" | "lesson" | "skill" | "weak" | "weekly";
  title: string;
  detail: string;
  minutes: number;
  done: boolean;
  /** Sayfa açan öğe; `session` ise tur başlatılır. */
  href?: string;
  action?: "session";
};

export type Plan = {
  items: PlanItem[];
  /** Kalan öğelerin toplam dakikası. */
  minutes: number;
  /** Hepsi bitti mi. */
  complete: boolean;
};


export async function buildPlan(
  userId: string,
  today: string,
  course: string,
  level: string,
  dailyGoal: number,
): Promise<Plan> {
  const now = new Date();
  const items: PlanItem[] = [];

  // 1. Tekrar turu
  const [{ due }] = await db
    .select({ due: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now)));
  const [doneToday] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(events)
    .where(and(eq(events.userId, userId), eq(events.name, "session_done"), eq(events.day, today)));
  const reviewDone = (doneToday?.n ?? 0) > 0;
  items.push({
    id: "review",
    title: "Kelime turu",
    detail: due > 0 ? `${due} tekrar bekliyor · yeni kelimeler` : `hedef ${dailyGoal} tekrar · yeni kelimeler`,
    minutes: 6,
    done: reviewDone,
    action: "session",
  });

  // 2. Sıradaki ders
  try {
    const next = await nextLesson(userId, course, level);
    if (next) {
      const [row] = await db
        .select({ lastAt: userLessons.lastAt })
        .from(userLessons)
        .where(and(eq(userLessons.userId, userId), eq(userLessons.lessonId, next.lesson.id)));
      const doneT = row ? row.lastAt.toISOString().slice(0, 10) >= today : false;
      items.push({
        id: "lesson",
        title: next.due ? `Ders tekrarı: ${next.lesson.title}` : `Ders: ${next.lesson.title}`,
        detail: next.lesson.titleTr,
        minutes: next.lesson.minutes,
        done: doneT,
        href: `/lessons/${next.lesson.id}`,
      });
    }
  } catch (err) {
    console.error("[plan] ders okunamadı", err);
  }

  // 3. Sıradaki en iyi adım — yetkinlik modeli (WP-50): en düşük kanıtlı
  //    beceriden yapılmamış egzersiz; kelime/dilbilgisi zaten 1. öğede.
  try {
    const lv = (["A1", "A2", "B1", "B2", "C1"].includes(level) ? level : "A1") as CefrLevel;
    const prof = computeProficiency(await gatherEvidence(userId));
    const step = await nextStep(userId, course, lv, prof);
    if (step && step.href.startsWith("/skills/")) {
      const rows = await db
        .select({ skill: userSkills.skill, lastAt: userSkills.lastAt })
        .from(userSkills)
        .where(eq(userSkills.userId, userId));
      const skillDoneToday = rows.some((r) => r.skill === step.skill && r.lastAt.toISOString().slice(0, 10) >= today);
      items.push({
        id: "skill",
        title: `${step.label}: ${step.title}`,
        detail: step.reason,
        minutes: step.minutes,
        done: skillDoneToday,
        href: step.href,
      });
    }
  } catch (err) {
    console.error("[plan] beceri okunamadı", err);
  }

  // 4. Hedefli çalışma — son 14 günün en sık hata tipi
  try {
    const since = new Date(now.getTime() - 14 * 86400000);
    const [top] = await db
      .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
      .from(reviews)
      .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, since)))
      .groupBy(reviews.errorType)
      .orderBy(desc(sql`count(*)`))
      .limit(1);
    if (top && isErrorType(top.type) && top.n >= 5 && ERROR_TARGET_GAME[top.type]) {
      const target = { game: ERROR_TARGET_GAME[top.type]!, label: GAME_LABELS[ERROR_TARGET_GAME[top.type] as GameId] };
      const dayStart = new Date(`${today}T00:00:00`);
      const [todayRows] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(reviews)
        .where(and(eq(reviews.userId, userId), eq(reviews.game, target.game), gte(reviews.createdAt, dayStart)));
      items.push({
        id: "weak",
        title: `Zayıf nokta: ${ERROR_LABELS[top.type]}`,
        detail: `son 14 günde ${top.n} hata · ${target.label} turu`,
        minutes: 4,
        done: (todayRows?.n ?? 0) >= 5,
        href: `/learn?game=${target.game}`,
      });
    }
  } catch (err) {
    console.error("[plan] hata tipi okunamadı", err);
  }

  // 5. Haftanın kullanım sınavı (WP-42): en az 15 çalışılmış kelime varsa.
  try {
    const [{ studied }] = await db
      .select({ studied: sql<number>`count(*)::int` })
      .from(userWords)
      .where(and(eq(userWords.userId, userId), gte(userWords.reps, 1)));
    if (studied >= 15) {
      const ws = await weeklyStatus(userId, today);
      items.push({
        id: "weekly",
        title: ws.short ? "Haftanın kısa kontrolü" : "Haftanın kullanım sınavı",
        detail: ws.done ? `skor ${ws.score}` : "15 soru · yazarak · tek hak",
        minutes: 8,
        done: ws.done,
        href: "/learn/haftalik",
      });
    }
  } catch (err) {
    console.error("[plan] haftalık sınav okunamadı", err);
  }

  const remaining = items.filter((i) => !i.done);
  return {
    items,
    minutes: remaining.reduce((a, i) => a + i.minutes, 0),
    complete: items.length > 0 && remaining.length === 0,
  };
}

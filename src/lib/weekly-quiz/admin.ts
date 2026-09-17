import "server-only";
import { desc, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { weeklyQuizAttempts } from "@/lib/db/schema";
import { QUIZ_WEEKS, quizForWeek, quizWeeksFor } from ".";
import { weekIndexOf, weekStartOf } from "./build";
import { resolveItem } from "./scoring";
import type { QuizBlock, QuizCourse, QuizLevel, QuizNative } from "./types";

/**
 * Haftalık quiz'in YÖNETİM görünümü.
 *
 * NE İŞE YARAR. Quiz içeriği elle yazılıyor ve kontrol betiği yalnız
 * MEKANİK kusuru yakalayabiliyor (cevap anahtarı geçerli mi, şık dağılımı
 * dengeli mi). Bir maddenin gerçekten çalışıp çalışmadığını ancak öğrenciler
 * cevapladıktan sonra anlarsın: doğruluk oranı %10'da kalan bir madde büyük
 * ihtimalle bozuktur — ya cevap anahtarı yanlış, ya soru belirsiz, ya da iki
 * şık birden savunulabiliyor. Bu dosya o sinyali çıkarıyor.
 *
 * DOĞRULUK BURADA YENİDEN HESAPLANIYOR, denemede saklanmıyor. Saklanan şey
 * öğrencinin SEÇTİĞİ şık; anahtar kodda. Böylece bir maddenin anahtarı
 * düzeltildiğinde geçmiş denemeler de yeni anahtara göre okunuyor ve
 * "bu madde bozuktu, düzelttik" sonrasında istatistik kendini toparlıyor.
 *
 * ÖLÇEK NOTU: denemeler JS tarafında geziliyor (SQL'de değil), çünkü cevap
 * anahtarı veritabanında yok. Bugünkü kullanıcı sayısında bu ucuz; on binlerce
 * denemede toplama işi bir özet tablosuna taşınmalı.
 */

const LIMIT = 800;

export type QuizWeekSummary = { week: string; started: number; finished: number; avgScore: number };
export type QuizItemStat = {
  itemId: string;
  quizId: string;
  block: QuizBlock;
  stem: string;
  asked: number;
  correct: number;
  pct: number;
};
export type QuizBlockStat = { block: QuizBlock; correct: number; total: number; pct: number };
export type QuizLive = { course: QuizCourse; level: QuizLevel; quizId: string; theme: string; no: number };
export type QuizCatalogRow = { level: QuizLevel; de: number; en: number };

export type QuizAdminData = {
  /** Bu hafta hangi paket canlı — kurs ve seviye başına. */
  live: QuizLive[];
  /** Son haftalar: kaç kişi başladı, kaç kişi bitirdi, ortalama skor. */
  weeks: QuizWeekSummary[];
  /** Yetkinlik kırılımı — tüm bitmiş denemelerin toplamı. */
  blocks: QuizBlockStat[];
  /**
   * EN DÜŞÜK doğruluk oranlı maddeler. Sıralama bilerek ters: listenin başı
   * "gözden geçir" listesidir.
   */
  items: QuizItemStat[];
  /** Katalog kapsaması — hangi seviyede kaç paket var. */
  catalog: QuizCatalogRow[];
  /** Kaç deneme okundu (ölçeğin nerede olduğunu göstermek için). */
  scanned: number;
  /** İçinde bulunulan ISO haftası (pazartesi) — sunucu gününden. */
  thisWeek: string;
};

const LEVELS: QuizLevel[] = ["A1", "A2", "B1", "B2", "C1"];

export async function quizAdminData(): Promise<QuizAdminData> {
  const day = new Date().toISOString().slice(0, 10);
  const thisWeek = weekStartOf(day);
  const weekIx = weekIndexOf(day);

  /* Bu hafta canlı olan paketler — takvim indeksinden, her kurs/seviye için. */
  const live: QuizLive[] = [];
  for (const course of ["de", "en"] as QuizCourse[]) {
    for (const level of LEVELS) {
      const pack = quizForWeek(course, level, weekIx);
      if (pack) live.push({ course, level, quizId: pack.id, theme: pack.themeTr || pack.theme, no: pack.no });
    }
  }

  const catalog: QuizCatalogRow[] = LEVELS.map((level) => ({
    level,
    de: quizWeeksFor("de", level).length,
    en: quizWeeksFor("en", level).length,
  }));

  let rows: (typeof weeklyQuizAttempts.$inferSelect)[] = [];
  try {
    rows = await db
      .select()
      .from(weeklyQuizAttempts)
      .where(gte(weeklyQuizAttempts.week, weekStartOf(shift(day, -7 * 12))))
      .orderBy(desc(weeklyQuizAttempts.week))
      .limit(LIMIT);
  } catch {
    // Tablo yoksa ya da okunamıyorsa panel yine çizilsin; sayılar boş kalır.
    return { live, weeks: [], blocks: [], items: [], catalog, scanned: 0, thisWeek };
  }

  /* Haftalık özet */
  const byWeek = new Map<string, { started: number; finished: number; sum: number }>();
  for (const r of rows) {
    const w = byWeek.get(r.week) ?? { started: 0, finished: 0, sum: 0 };
    w.started++;
    if (r.state === "done") {
      w.finished++;
      w.sum += r.score;
    }
    byWeek.set(r.week, w);
  }
  const weeks: QuizWeekSummary[] = [...byWeek]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([week, v]) => ({ week, started: v.started, finished: v.finished, avgScore: v.finished ? Math.round(v.sum / v.finished) : 0 }));

  /* Madde ve blok istatistiği — yalnız BİTMİŞ denemeler. */
  const packById = new Map(QUIZ_WEEKS.map((w) => [w.id, w]));
  const itemAgg = new Map<string, QuizItemStat>();
  const blockAgg = new Map<QuizBlock, { correct: number; total: number }>();

  for (const r of rows) {
    if (r.state !== "done") continue;
    const pack = packById.get(r.quizId);
    if (!pack) continue;
    const answers = (r.answers as Record<string, number>) ?? {};
    const byId = new Map(pack.items.map((i) => [i.id, i]));
    for (const id of (r.itemIds as string[]) ?? []) {
      const raw = byId.get(id);
      /* Kişisel madde yazılı havuzda yok (çalışma anında üretiliyor): madde
         analizine girmiyor, çünkü her öğrencide başka bir sözcük. */
      if (!raw) continue;
      const it = resolveItem(raw, r.native as QuizNative);
      const ok = answers[id] === it.answer;

      const cur = itemAgg.get(id) ?? { itemId: id, quizId: pack.id, block: it.block, stem: it.stem, asked: 0, correct: 0, pct: 0 };
      cur.asked++;
      if (ok) cur.correct++;
      itemAgg.set(id, cur);

      const b = blockAgg.get(it.block) ?? { correct: 0, total: 0 };
      b.total++;
      if (ok) b.correct++;
      blockAgg.set(it.block, b);
    }
  }

  const items = [...itemAgg.values()]
    .map((i) => ({ ...i, pct: i.asked ? Math.round((100 * i.correct) / i.asked) : 0 }))
    /* Az cevaplanan madde gürültüdür: üç cevabın altı sıralamaya girmiyor. */
    .filter((i) => i.asked >= 3)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 25);

  const blocks: QuizBlockStat[] = [...blockAgg]
    .map(([block, v]) => ({ block, ...v, pct: v.total ? Math.round((100 * v.correct) / v.total) : 0 }))
    .sort((a, b) => a.pct - b.pct);

  return { live, weeks, blocks, items, catalog, scanned: rows.length, thisWeek };
}

function shift(day: string, delta: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

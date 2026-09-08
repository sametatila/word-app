import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";

/**
 * Deneme sınavı istatistiği — üç kırılım + yarım kalanlar.
 *
 * Üçü üç ayrı soruya cevap veriyor: BÖLÜM "hangi becerim zayıf", SEVİYE "bu
 * seviyeyi geçiyor muyum", GEÇMİŞ "ilerliyor muyum". Dördüncü blok yarım
 * kalan denemeler — sınav yarıda bırakıldıysa kullanıcı bunu ancak burada
 * görür.
 *
 * `/api/mock-exam?stats=1` ucunun İÇİNDEYDİ. İstatistiğin kendi sayfası
 * gelince (`/mock-exams/stats`) iki çağıranı oldu: sunucu bileşeni aynı
 * sorguyu kendi çalıştırıyor, uç mobil için duruyor. Rota dosyası içe
 * aktarılamayacağı için ortak yer burası.
 */
export type MockStats = Awaited<ReturnType<typeof mockStats>>;

export async function mockStats(userId: string) {
  const rows = await db
    .select()
    .from(mockExamAttempts)
    .where(and(eq(mockExamAttempts.userId, userId), isNotNull(mockExamAttempts.finishedAt)))
    .orderBy(desc(mockExamAttempts.finishedAt))
    .limit(200);

  const bySkill = new Map<string, { attempts: number; correct: number; total: number; best: number }>();
  const byLevel = new Map<string, { attempts: number; passed: number }>();
  for (const r of rows) {
    if (r.total > 0) {
      const s = bySkill.get(r.skill) ?? { attempts: 0, correct: 0, total: 0, best: 0 };
      s.attempts++;
      s.correct += r.correct;
      s.total += r.total;
      s.best = Math.max(s.best, r.score);
      bySkill.set(r.skill, s);
    }
    const l = byLevel.get(r.level) ?? { attempts: 0, passed: 0 };
    l.attempts++;
    if (r.passed) l.passed++;
    byLevel.set(r.level, l);
  }

  return {
    attempts: rows.length,
    bySkill: [...bySkill.entries()].map(([skill, v]) => ({
      skill,
      attempts: v.attempts,
      pct: v.total ? Math.round((100 * v.correct) / v.total) : 0,
      best: v.best,
    })),
    byLevel: [...byLevel.entries()].map(([level, v]) => ({ level, ...v })),
    recent: rows.slice(0, 20).map((r) => ({
      id: r.id,
      paperId: r.paperId,
      skill: r.skill,
      level: r.level,
      score: r.score,
      correct: r.correct,
      total: r.total,
      passed: r.passed,
      finishedAt: r.finishedAt,
    })),
    // Devam eden denemeler ayrı: "yarım kalan sınavın var" uyarısı buradan.
    running: (
      await db
        .select({ id: mockExamAttempts.id, paperId: mockExamAttempts.paperId, skill: mockExamAttempts.skill, level: mockExamAttempts.level, taskIx: mockExamAttempts.taskIx })
        .from(mockExamAttempts)
        .where(and(eq(mockExamAttempts.userId, userId), eq(mockExamAttempts.state, "running")))
        .orderBy(desc(mockExamAttempts.startedAt))
        .limit(10)
    ),
  };
}

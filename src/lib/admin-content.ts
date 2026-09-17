import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";
import { pointer, releasePacks, releases } from "@/lib/content/read";
import { flagKey } from "@/lib/content/ids";
import { lessonPack, levelOfId, packCourseOfId, paperPack, skillPack } from "@/lib/content/packs";
import { packItems } from "@/lib/content/serve";
import type { Lesson } from "@/lib/lessons/types";
import { mockPaperById } from "@/lib/mock-exams";
import { scorePart } from "@/lib/mock-exams/scoring";
import type { MockSkill } from "@/lib/mock-exams/types";

/**
 * PANELİN İÇERİK YÜZÜ — sürüm, kapatma ve madde analizi.
 *
 * İçerik panelden DÜZENLENMİYOR (AGENTS.md "İçerik teslim hattı"): doğruluk
 * kaynağı `data/**` ve git. Panelin iki yazma yetkisi var, ikisi de
 * `lib/content/publish`te: bozuk maddeyi kapatmak (`content_flags`) ve bir
 * sürümü canlıya almak (geri alma dahil). Bu dosya o iki kararın DAYANAĞINI
 * topluyor: hangi sürüm canlı, ne kapalı, hangi madde öğrencileri
 * düşürüyor.
 *
 * MADDE ANALİZİ neden burada. Haftalık quiz'in madde analizi vardı, daha çok
 * kullanılan dersler, beceriler ve deneme sınavlarının yoktu. Çok düşük bir
 * başarı oranı çoğunlukla öğrencinin değil maddenin kusurudur (yanlış anahtar,
 * belirsiz soru); kontrol betikleri bunu göremez, ancak cevaplar birikince
 * görünür. Her satır kapatılabileceği paketi de taşıyor.
 */

export type ContentFlag = { pack: string; item: string; reason: string; by: string; at: string };
export type ContentRelease = { version: number; status: string; commit: string; note: string; by: string; liveAt: string; goLiveAt: string; createdAt: string; items: number };

export type ContentAdminData = {
  live: number;
  releases: ContentRelease[];
  packs: { pack: string; items: number; bytes: number }[];
  flags: ContentFlag[];
  issues: QueryIssue[];
};

const iso = (v: unknown) => (v ? new Date(String(v)).toISOString() : "");

export async function contentAdminData(): Promise<ContentAdminData> {
  const issues: QueryIssue[] = [];
  const guard = async <T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      issues.push({ source: `içerik: ${label}`, message: (err as Error).message.slice(0, 200) });
      return fallback;
    }
  };
  const { rows } = queryRunner("içerik");
  const [ptr, rel, flags] = await Promise.all([
    guard("gösterge", () => pointer(), { r: 0, d: [] }),
    guard("sürümler", () => releases(40), []),
    guard("kapatmalar", async () =>
      rows(sql`select pack, item, coalesce(reason, '') reason, coalesce(disabled_by, '') by, created_at from content_flags order by created_at desc`), []),
  ]);
  const packs = ptr.r ? await guard("paketler", () => releasePacks(ptr.r), []) : [];
  return {
    live: ptr.r,
    releases: rel.map((r) => ({
      version: r.version, status: r.status, commit: r.commit ?? "", note: r.note ?? "", by: r.publishedBy ?? "",
      liveAt: iso(r.liveAt), goLiveAt: iso(r.goLiveAt), createdAt: iso(r.createdAt), items: Number(r.items) || 0,
    })),
    packs: packs.map((p) => ({ pack: p.pack, items: Number(p.items) || 0, bytes: Number(p.bytes) || 0 })),
    flags: flags.map((f) => ({ pack: String(f.pack), item: String(f.item), reason: String(f.reason), by: String(f.by), at: iso(f.created_at) })),
    issues,
  };
}

/* ── Madde analizi ─────────────────────────────────────────────────────── */

/** Kapatılabilir satır: `pack` boşsa madde yayın hattında değil (patika adımı gibi). */
export type AnalysisRow = {
  id: string;
  title: string;
  level: string;
  users: number;
  attempts: number;
  /** 0-100 başarı. */
  pct: number;
  pack: string;
  disabled: boolean;
};

export type MockItemRow = {
  paperId: string;
  skill: string;
  itemId: string;
  label: string;
  asked: number;
  correct: number;
  pct: number;
  pack: string;
  disabled: boolean;
};

export type LearningAnalysis = {
  lessons: AnalysisRow[];
  skills: AnalysisRow[];
  path: AnalysisRow[];
  mockItems: MockItemRow[];
  /** Deneme sınavı analizinde okunan bitmiş deneme sayısı. */
  mockScanned: number;
  issues: QueryIssue[];
};

/** Analize girmek için gereken en az cevap: tek öğrenci gürültüdür. */
export const MIN_ANSWERS = 3;

/**
 * Bitmiş deneme kâğıtlarından madde başına doğru oranı. SAF: kâğıt ve puanlama
 * dışarıdan veriliyor, test edilebilir.
 */
export function aggregateMockItems(
  attempts: { paperId: string; skill: string; answers: Record<string, string> }[],
  score: (paperId: string, skill: string, answers: Record<string, string>) => { id: string; correct: boolean }[] | null,
  labelOf: (paperId: string, itemId: string) => string,
): Omit<MockItemRow, "pack" | "disabled">[] {
  const agg = new Map<string, { paperId: string; skill: string; itemId: string; asked: number; correct: number }>();
  for (const a of attempts) {
    const items = score(a.paperId, a.skill, a.answers);
    if (!items) continue;
    for (const it of items) {
      const key = `${a.paperId}|${a.skill}|${it.id}`;
      const row = agg.get(key) ?? { paperId: a.paperId, skill: a.skill, itemId: it.id, asked: 0, correct: 0 };
      row.asked++;
      if (it.correct) row.correct++;
      agg.set(key, row);
    }
  }
  return [...agg.values()]
    .filter((r) => r.asked >= MIN_ANSWERS)
    .map((r) => ({ ...r, label: labelOf(r.paperId, r.itemId), pct: Math.round((r.correct / r.asked) * 100) }))
    .sort((a, b) => a.pct - b.pct || b.asked - a.asked);
}

function mockItemLabel(paperId: string, itemId: string): string {
  const paper = mockPaperById(paperId);
  if (!paper) return "";
  for (const part of paper.parts) {
    for (const task of part.tasks) {
      const it = task.items?.find((x) => x.id === itemId);
      if (it) return `Teil ${task.no} · ${"text" in it && it.text ? it.text : ""}`.slice(0, 160);
    }
  }
  return "";
}

export async function learningAnalysis(): Promise<LearningAnalysis> {
  const { rows, issues } = queryRunner("madde analizi");
  const packOf = (id: string, make: typeof lessonPack) => {
    const level = levelOfId(id);
    return level ? make(packCourseOfId(id), level) : "";
  };  const [ptr, lessonRows, skillRows, pathRows, mockRows] = await Promise.all([
    pointer().catch(() => ({ r: 0, d: [] as string[] })),
    rows(sql`
      select lesson_id id, count(*)::int users, coalesce(sum(attempts), 0)::int attempts,
        round(avg(case when total > 0 then correct * 100.0 / total end))::int pct
      from user_lessons group by 1 having count(*) >= ${MIN_ANSWERS} order by pct asc nulls last limit 60`),
    rows(sql`
      select s.exercise_id id, coalesce(e.title, '') title, coalesce(e.level, '') level, count(*)::int users,
        coalesce(sum(s.attempts), 0)::int attempts,
        round(avg(case when s.total > 0 then s.correct * 100.0 / s.total end))::int pct
      from user_skills s left join skill_exercises e on e.id = s.exercise_id
      group by 1, 2, 3 having count(*) >= ${MIN_ANSWERS} order by pct asc nulls last limit 60`),
    rows(sql`
      select item_id id, count(*)::int users, coalesce(sum(attempts), 0)::int attempts, round(avg(best_pct))::int pct
      from user_path_items group by 1 having count(*) >= ${MIN_ANSWERS} order by pct asc limit 60`),
    rows(sql`
      select paper_id, skill, answers from mock_exam_attempts
      where state = 'done' and skill in ('reading', 'listening') order by finished_at desc nulls last limit 3000`),
  ]);
  /* Başlık için YALNIZ listede geçen derslerin paketleri okunuyor. Bütün
     ders kataloğu (`allLessons`, ~7 MB) her önbellek tazelemesinde okunup
     ayrıştırılıyordu; ilk açılış 24 saniye sürdü. */
  const lessonPacks = [...new Set(lessonRows.map((r) => packOf(String(r.id), lessonPack)).filter(Boolean))];
  const lessons = (await Promise.all(lessonPacks.map((pk) => packItems<Lesson>(pk).catch(() => [] as Lesson[])))).flat();
  const flagged = new Set(ptr.d);
  const title = new Map(lessons.map((l) => [l.id, `${l.title}${l.titleTr ? ` · ${l.titleTr}` : ""}`]));
  const row = (r: Record<string, unknown>, pack: string, t: string): AnalysisRow => {
    const id = String(r.id);
    return {
      id, title: t, level: String(r.level || levelOfId(id) || ""), users: Number(r.users) || 0,
      attempts: Number(r.attempts) || 0, pct: Number(r.pct) || 0, pack, disabled: pack ? flagged.has(flagKey(pack, id)) : false,
    };
  };


  const mockItems = aggregateMockItems(
    mockRows.map((r) => ({ paperId: String(r.paper_id), skill: String(r.skill), answers: (r.answers ?? {}) as Record<string, string> })),
    (paperId, skill, answers) => scorePart(paperId, skill as MockSkill, answers)?.items ?? null,
    mockItemLabel,
  )
    .slice(0, 80)
    .map((m) => {
      const pack = paperPack(packCourseOfId(m.paperId));
      return { ...m, pack, disabled: flagged.has(flagKey(pack, m.paperId)) };
    });

  return {
    lessons: lessonRows.map((r) => row(r, packOf(String(r.id), lessonPack), title.get(String(r.id)) ?? "")),
    skills: skillRows.map((r) => row(r, packOf(String(r.id), skillPack), String(r.title))),
    path: pathRows.map((r) => row(r, "", "")),
    mockItems,
    mockScanned: mockRows.length,
    issues,
  };
}

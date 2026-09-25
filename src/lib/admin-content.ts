import "server-only";
import { sql } from "drizzle-orm";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";
import { pointer, releaseDiff, releasePacks, releases, type ReleaseDiff } from "@/lib/content/read";
import { flagKey } from "@/lib/content/ids";
import { conversationPack, levelOfId, packCourseOfId, paperPack, skillPack } from "@/lib/content/packs";
import { packItems, packItemsAt } from "@/lib/content/serve";
import { classifyItem } from "@/lib/content/analytics";
import type { Conversation } from "@/lib/conversations/types";
import { isItemCorrect, isOpenTask } from "@/lib/mock-exams/scoring";
import type { MockPaper } from "@/lib/mock-exams/types";

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
 * kullanılan konuşmalar, beceriler ve deneme sınavlarının yoktu. Çok düşük bir
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
  /**
   * Canlı sürüm ile ÖNCEKİ sürüm arasındaki fark.
   *
   * Geri alma düğmesinin dayanağı: neyi geri aldığını bilmeden basılan bir
   * düğme, olmayan düğmeden kötü. Boş dizi "ilk sürüm" ya da "fark yok"
   * demek; ikisi de sayfada dürüstçe söylenebiliyor.
   */
  diff: { from: number; to: number; packs: ReleaseDiff[] };
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
  /* Önceki sürüm = canlıdan KÜÇÜK en büyük numara; sürüm numarası zaman
     sırasını izliyor, dolayısıyla "geri alınacak olan" bu. */
  const previous = rel.map((r) => r.version).filter((v) => v < ptr.r).sort((a, b) => b - a)[0] ?? 0;
  const diffPacks = previous && ptr.r ? await guard("fark", () => releaseDiff(previous, ptr.r), []) : [];
  return {
    live: ptr.r,
    releases: rel.map((r) => ({
      version: r.version, status: r.status, commit: r.commit ?? "", note: r.note ?? "", by: r.publishedBy ?? "",
      liveAt: iso(r.liveAt), goLiveAt: iso(r.goLiveAt), createdAt: iso(r.createdAt), items: Number(r.items) || 0,
    })),
    packs: packs.map((p) => ({ pack: p.pack, items: Number(p.items) || 0, bytes: Number(p.bytes) || 0 })),
    flags: flags.map((f) => ({ pack: String(f.pack), item: String(f.item), reason: String(f.reason), by: String(f.by), at: iso(f.created_at) })),
    diff: { from: previous, to: ptr.r, packs: diffPacks },
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
  /**
   * AYIRT ETME GÜCÜ — "zor" ile "bozuk"u ayıran sayı.
   *
   * Maddeyi doğru cevaplayanların KÂĞIT PUANI ortalaması eksi yanlış
   * cevaplayanların ortalaması. Pozitifse madde ayırıyor (zor olabilir, işini
   * görüyor); sıfır ya da negatifse sınavın geri kalanında iyi olanlar burada
   * yanılıyor — klasik yanlış anahtar imzası.
   *
   * Sıralama bu yüzden doğruluk oranına göre DEĞİL: %30'da kalan bir madde
   * zor olabilir ve onu listenin başına koymak, müfredatın en öğretici
   * sorularını kapatmaya davet etmek olurdu (bkz. `lib/content/analytics`).
   */
  discrimination: number;
  suspect: boolean;
  /** Şüphenin sebebi, olduğu gibi gösteriliyor. */
  why: string;
  pack: string;
  disabled: boolean;
};

export type LearningAnalysis = {
  conversations: AnalysisRow[];
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
  attempts: { paperId: string; skill: string; release: number | null; score: number; answers: Record<string, string> }[],
  score: (paperId: string, skill: string, release: number | null, answers: Record<string, string>) => { id: string; correct: boolean }[] | null,
  labelOf: (paperId: string, itemId: string) => string,
): Omit<MockItemRow, "pack" | "disabled">[] {
  type Agg = {
    paperId: string;
    skill: string;
    itemId: string;
    asked: number;
    correct: number;
    /** Maddeyi doğru/yanlış yapanların KÂĞIT puanları — ayırt etme gücü için. */
    rightScores: number[];
    wrongScores: number[];
  };
  const agg = new Map<string, Agg>();
  for (const a of attempts) {
    const items = score(a.paperId, a.skill, a.release, a.answers);
    if (!items) continue;
    for (const it of items) {
      const key = `${a.paperId}|${a.skill}|${it.id}`;
      const row = agg.get(key) ?? { paperId: a.paperId, skill: a.skill, itemId: it.id, asked: 0, correct: 0, rightScores: [], wrongScores: [] };
      row.asked++;
      if (it.correct) {
        row.correct++;
        row.rightScores.push(a.score);
      } else {
        row.wrongScores.push(a.score);
      }
      agg.set(key, row);
    }
  }
  return [...agg.values()]
    .filter((r) => r.asked >= MIN_ANSWERS)
    .map((r) => {
      /* Karar paylaşılan SAF kuralda: eşik, ayırt etme gücü ve mutlak dip tek
         yerde yazılı ve kapısı `test:content-analytics`. Panelin kendi
         eşiğini icat etmesi iki ölçütün sessizce ayrışması demekti. */
      const v = classifyItem({ asked: r.asked, correct: r.correct, rightScores: r.rightScores, wrongScores: r.wrongScores, reports: 0 });
      return {
        paperId: r.paperId,
        skill: r.skill,
        itemId: r.itemId,
        asked: r.asked,
        correct: r.correct,
        label: labelOf(r.paperId, r.itemId),
        pct: v.pct,
        discrimination: v.discrimination,
        suspect: v.suspect,
        why: v.why,
      };
    })
    /* ŞÜPHELİ OLANLAR ÖNCE, sonra en negatif ayırt etme gücü. Doğruluk oranı
       yalnız eşitlik bozucu: tek başına bozukluk göstergesi değil. */
    .sort((a, b) => (a.suspect === b.suspect ? a.discrimination - b.discrimination || a.pct - b.pct : a.suspect ? -1 : 1));
}

/**
 * Kâğıtlar YAYIN PAKETİNDEN okunuyor (`papers/<kurs>`), `lib/mock-exams`in
 * arama işlevlerinden değil: o katman kâğıdı koddan yayın hattına taşıyor ve
 * arayüzü (senkron → asenkron) değişiyor. Panel paketi doğrudan okuyup
 * maddeleri paylaşılan `isItemCorrect` ile puanlıyor, yani ikisinin geçişinden
 * etkilenmiyor. Açık görevler (yazma, konuşma) nesnel puan taşımadığı için dışarıda.
 */
function paperScorer(papers: Map<string, MockPaper>) {
  return (paperId: string, skill: string, release: number | null, answers: Record<string, string>) => {
    /* KÂĞIT DENEMENİN SABİTLENMİŞ SÜRÜMÜNDEN. Canlı sürümden okumak, bir
       içerik yayınından sonra eski cevapları YENİ kâğıda göre puanlamak
       olurdu: düzeltilmiş bir madde geçmişteki denemeleri haksız yere yanlış
       gösterir ve analiz kendi kuyruğunu ısırır. */
    const part = papers.get(`${release ?? 0}|${paperId}`)?.parts.find((x) => x.skill === skill)
      ?? papers.get(paperId)?.parts.find((x) => x.skill === skill);
    if (!part) return null;
    return part.tasks.filter((task) => !isOpenTask(task)).flatMap((task) => task.items.map((it) => ({ id: it.id, correct: isItemCorrect(it, answers[it.id]) })));
  };
}

function paperLabeler(papers: Map<string, MockPaper>) {
  return (paperId: string, itemId: string): string => {
    for (const part of papers.get(paperId)?.parts ?? []) {
      for (const task of part.tasks) {
        const it = task.items?.find((x) => x.id === itemId);
        if (it) return `Teil ${task.no} · ${"text" in it && it.text ? it.text : ""}`.slice(0, 160);
      }
    }
    return "";
  };
}

export async function learningAnalysis(): Promise<LearningAnalysis> {
  const { rows, issues } = queryRunner("madde analizi");
  const packOf = (id: string, make: typeof conversationPack) => {
    const level = levelOfId(id);
    return level ? make(packCourseOfId(id), level) : "";
  };  const [ptr, conversationRows, skillRows, pathRows, mockRows] = await Promise.all([
    pointer().catch(() => ({ r: 0, d: [] as string[] })),
    rows(sql`
      select conversation_id id, count(*)::int users, coalesce(sum(attempts), 0)::int attempts,
        round(avg(case when total > 0 then correct * 100.0 / total end))::int pct
      from user_conversations group by 1 having count(*) >= ${MIN_ANSWERS} order by pct asc nulls last limit 60`),
    rows(sql`
      select s.exercise_id id, coalesce(e.title, '') title, coalesce(e.level, '') level, count(*)::int users,
        coalesce(sum(s.attempts), 0)::int attempts,
        round(avg(case when s.total > 0 then s.correct * 100.0 / s.total end))::int pct
      from user_skills s left join skill_exercises e on e.id = s.exercise_id
      group by 1, 2, 3 having count(*) >= ${MIN_ANSWERS} order by pct asc nulls last limit 60`),
    rows(sql`
      select item_id id, count(*)::int users, coalesce(sum(attempts), 0)::int attempts, round(avg(best_pct))::int pct
      from user_path_items group by 1 having count(*) >= ${MIN_ANSWERS} order by pct asc limit 60`),
    /* `release` ve `score` de okunuyor: kâğıt denemenin sabitlenmiş
       sürümünden puanlanıyor ve ayırt etme gücü kâğıt puanını istiyor. */
    rows(sql`
      select paper_id, skill, release, coalesce(score, 0) score, answers from mock_exam_attempts
      where state = 'done' and skill in ('reading', 'listening') order by finished_at desc nulls last limit 3000`),
  ]);
  /* Başlık için YALNIZ listede geçen konuşmaların paketleri okunuyor. Bütün
     konuşma kataloğu (`allConversations`, ~7 MB) her önbellek tazelemesinde okunup
     ayrıştırılıyordu; ilk açılış 24 saniye sürdü. */
  const conversationPacks = [...new Set(conversationRows.map((r) => packOf(String(r.id), conversationPack)).filter(Boolean))];
  const conversations = (await Promise.all(conversationPacks.map((pk) => packItems<Conversation>(pk).catch(() => [] as Conversation[])))).flat();
  const flagged = new Set(ptr.d);
  const title = new Map(conversations.map((l) => [l.id, `${l.title}${l.titleTr ? ` · ${l.titleTr}` : ""}`]));
  const row = (r: Record<string, unknown>, pack: string, t: string): AnalysisRow => {
    const id = String(r.id);
    return {
      id, title: t, level: String(r.level || levelOfId(id) || ""), users: Number(r.users) || 0,
      attempts: Number(r.attempts) || 0, pct: Number(r.pct) || 0, pack, disabled: pack ? flagged.has(flagKey(pack, id)) : false,
    };
  };


  /*
    KÂĞITLAR SÜRÜM SÜRÜM OKUNUYOR.

    Her deneme açıldığı içerik sürümüne sabitli (`mock_exam_attempts.release`)
    ve doğru puanlama o sürümün kâğıdını istiyor. Canlı sürümden okumak, bir
    yayından sonra geçmiş denemeleri yeni kâğıda göre puanlamak olurdu.

    Okunan paket sayısı sınırlı: pratikte bir iki sürüm dolaşıyor ve
    `packItemsAt` her sürüm+paketi süreç belleğinde tutuyor.
  */
  const wanted = new Set<string>();
  for (const r of mockRows) wanted.add(`${Number(r.release) || 0}|${paperPack(packCourseOfId(String(r.paper_id)))}`);
  const papers = new Map<string, MockPaper>();
  for (const key of wanted) {
    const [rel, pk] = [Number(key.split("|")[0]), key.slice(key.indexOf("|") + 1)];
    const list = await (rel ? packItemsAt<MockPaper>(rel, pk) : packItems<MockPaper>(pk)).catch(() => [] as MockPaper[]);
    /* İki anahtarla da yazılıyor: sürümlü arama (puanlama) ve sade kimlik
       (etiket) — etiket için hangi sürüm olduğu önemsiz. */
    for (const pp of list) {
      papers.set(`${rel}|${pp.id}`, pp);
      if (!papers.has(pp.id)) papers.set(pp.id, pp);
    }
  }
  const mockItems = aggregateMockItems(
    mockRows.map((r) => ({
      paperId: String(r.paper_id),
      skill: String(r.skill),
      release: Number(r.release) || null,
      score: Number(r.score) || 0,
      answers: (r.answers ?? {}) as Record<string, string>,
    })),
    paperScorer(papers),
    paperLabeler(papers),
  )
    .slice(0, 80)
    .map((m) => {
      const pack = paperPack(packCourseOfId(m.paperId));
      return { ...m, pack, disabled: flagged.has(flagKey(pack, m.paperId)) };
    });

  return {
    conversations: conversationRows.map((r) => row(r, packOf(String(r.id), conversationPack), title.get(String(r.id)) ?? "")),
    skills: skillRows.map((r) => row(r, packOf(String(r.id), skillPack), String(r.title))),
    path: pathRows.map((r) => row(r, "", "")),
    mockItems,
    mockScanned: mockRows.length,
    issues,
  };
}

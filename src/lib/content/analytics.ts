import "server-only";
import { desc, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentReports, mockExamAttempts, weeklyQuizAttempts } from "@/lib/db/schema";
import { mockPaperAt } from "@/lib/mock-exams/serve";
import { scorePart } from "@/lib/mock-exams/scoring";
import { QUIZ_WEEKS } from "@/lib/weekly-quiz";
import { resolveItem } from "@/lib/weekly-quiz/scoring";
import type { MockSkill } from "@/lib/mock-exams/types";
import type { QuizNative } from "@/lib/weekly-quiz/types";
import { packCourseOf, packCourseOfId, paperPack, quizPack } from "./packs";

/**
 * BOZUK MADDEYİ BULMA — "zor" ile "bozuk" ayrı şeyler.
 *
 * `/admin/quiz` uzun süre yalnız doğruluk oranını gösterdi ve bu tek başına
 * yanıltıcı: %30'da kalan bir madde ZOR olabilir, bozuk olmak zorunda değil.
 * Doğruluk oranına bakıp madde kapatmak, müfredatın en zor ama en öğretici
 * sorularını ayıklamak olurdu.
 *
 * ASIL SİNYAL AYIRT ETME GÜCÜ (item discrimination): maddeyi DOĞRU
 * cevaplayanların genel puan ortalaması ile YANLIŞ cevaplayanların ortalaması
 * arasındaki fark.
 *
 *   fark > 0   sağlıklı: iyi öğrenci doğru yapıyor, zayıf öğrenci yapamıyor.
 *              Madde zor olabilir ama AYIRIYOR — işini görüyor.
 *   fark ≤ 0   şüpheli: sınavın geri kalanında iyi olanlar bu maddede
 *              yanılıyor. En sık sebebi yanlış anahtar; ikinci sebebi
 *              cevaplanamaz ya da iki doğru şıklı madde.
 *
 * İkinci sinyal mutlak dip: doğruluk oranı %10'un altındaysa madde ya bozuk
 * ya cevaplanamaz. Gerçekten zor bir madde bile bu kadar dibe inmiyor.
 *
 * EŞİK ALTI ÖLÇÜLMÜYOR: yirmi cevaptan az veri gürültü. Birkaç kullanıcının
 * yanıldığı bir maddeyi kapatmak, istatistik değil kura.
 *
 * SONUÇ EYLEME BAĞLI: her satır kapatma anahtarının hedefini (`pack` + `item`)
 * taşıyor, yani panel bulduğu maddeyi tek tıkla yayından kaldırabiliyor
 * (`disableItem`). Ölçüp bir şey yapamamak, `/admin/quiz`in baştan beri
 * eksiği olan fiildi.
 */

/** Altında istatistiğin anlamı olmadığı cevap sayısı. */
export const MIN_ASKED = 20;
/** Bu oranın altı: madde ya bozuk ya cevaplanamaz. */
export const FLOOR_PCT = 10;
/** Taranan en son bitmiş deneme sayısı — maliyeti sınırlıyor. */
const SCAN = 600;

export type SuspectItem = {
  /** Kapatma anahtarının hedefi. */
  pack: string;
  item: string;
  source: "quiz" | "mock";
  /**
   * KAPATMANIN NE KADARINI ALDIĞI — panel bunu yazmak zorunda.
   *
   * `item`: bayrak tam o maddeyi gizliyor (haftalık quiz; madde paketin
   *         kendi maddesi).
   * `paper`: bayrak KÂĞIDIN TAMAMINI gizliyor. Deneme sınavı paketinin
   *         maddesi kâğıt, tek soru değil — bir soru için kâğıdı kapatmak
   *         büyük bir karar ve panelde öyle görünmeli.
   */
  scope: "item" | "paper";
  /** İnsanın tanıyacağı etiket: soru kökü ya da kâğıt/bölüm. */
  label: string;
  asked: number;
  correct: number;
  pct: number;
  /**
   * Ayırt etme gücü (yüzde puanı): doğru cevaplayanların genel puan
   * ortalaması eksi yanlış cevaplayanların ortalaması.
   */
  discrimination: number;
  /** Kullanıcı raporu sayısı (`content_reports`). */
  reports: number;
  suspect: boolean;
  /** Şüphenin sebebi — panelde olduğu gibi gösteriliyor. */
  why: string;
};

type Bucket = {
  pack: string;
  item: string;
  source: "quiz" | "mock";
  scope: "item" | "paper";
  label: string;
  asked: number;
  correct: number;
  /** Doğru cevaplayanların genel puanları. */
  rightScores: number[];
  /** Yanlış cevaplayanların genel puanları. */
  wrongScores: number[];
};

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, x) => a + x, 0) / xs.length : 0);

/**
 * KARARIN KENDİSİ — saf, veritabanısız, test edilebilir.
 *
 * Ölçümün değeri bu işlevin "zor" ile "bozuk"u ayırmasında. Kural veritabanı
 * sorgusunun içine gömülü kalsaydı, sınanamaz ve sessizce kayabilirdi;
 * kapısı `test:content-analytics`.
 */
export function classifyItem(input: {
  asked: number;
  correct: number;
  rightScores: number[];
  wrongScores: number[];
  reports: number;
}): { pct: number; discrimination: number; suspect: boolean; why: string } {
  const pct = input.asked ? Math.round((100 * input.correct) / input.asked) : 0;
  /* Her iki taraf da doluysa ayırt etme gücü tanımlı; biri boşsa (herkes
     doğru ya da herkes yanlış) 0 sayılıyor ve karar mutlak dibe kalıyor. */
  const discrimination =
    input.rightScores.length && input.wrongScores.length
      ? Math.round(mean(input.rightScores) - mean(input.wrongScores))
      : 0;

  const reasons: string[] = [];
  if (input.asked < MIN_ASKED) {
    /* Eşik altı: ölçüm YAPILMIYOR. Birkaç cevaba bakıp madde kapatmak
       istatistik değil kura. */
    return { pct, discrimination, suspect: false, why: "" };
  }
  if (input.rightScores.length && input.wrongScores.length && discrimination <= 0) {
    reasons.push(`sınavın geri kalanında iyi olanlar bu maddede yanılıyor (ayırt etme ${discrimination})`);
  }
  if (pct <= FLOOR_PCT) reasons.push(`doğruluk %${pct} — zor değil, cevaplanamaz görünüyor`);
  if (input.reports > 0) reasons.push(`${input.reports} kullanıcı raporu`);
  return { pct, discrimination, suspect: reasons.length > 0, why: reasons.join(" · ") };
}

function add(buckets: Map<string, Bucket>, key: string, seed: Omit<Bucket, "asked" | "correct" | "rightScores" | "wrongScores">, ok: boolean, score: number) {
  const b = buckets.get(key) ?? { ...seed, asked: 0, correct: 0, rightScores: [], wrongScores: [] };
  b.asked++;
  if (ok) {
    b.correct++;
    b.rightScores.push(score);
  } else {
    b.wrongScores.push(score);
  }
  buckets.set(key, b);
}

/**
 * Haftalık quiz maddeleri.
 *
 * Kayıt öğrencinin SEÇTİĞİ şıkkı tutuyor, anahtarı değil (bkz.
 * `weekly-quiz/admin`): anahtar düzeltilince eski kayıtlar kendiliğinden
 * doğru sayılıyor ve istatistik toparlanıyor.
 */
async function quizBuckets(buckets: Map<string, Bucket>): Promise<void> {
  const rows = await db
    .select({
      quizId: weeklyQuizAttempts.quizId,
      native: weeklyQuizAttempts.native,
      itemIds: weeklyQuizAttempts.itemIds,
      answers: weeklyQuizAttempts.answers,
      score: weeklyQuizAttempts.score,
    })
    .from(weeklyQuizAttempts)
    .where(eq(weeklyQuizAttempts.state, "done"))
    .orderBy(desc(weeklyQuizAttempts.id))
    .limit(SCAN);

  const packById = new Map(QUIZ_WEEKS.map((w) => [w.id, w]));
  for (const r of rows) {
    const pack = packById.get(r.quizId);
    if (!pack) continue;
    const answers = (r.answers as Record<string, number>) ?? {};
    const byId = new Map(pack.items.map((i) => [i.id, i]));
    for (const id of ((r.itemIds as string[]) ?? [])) {
      const raw = byId.get(id);
      /* Kişisel madde havuzda yok (çalışma anında üretiliyor, her öğrencide
         başka sözcük): ölçüme girmiyor. */
      if (!raw) continue;
      const it = resolveItem(raw, r.native as QuizNative);
      add(
        buckets,
        `quiz:${id}`,
        {
          pack: quizPack(packCourseOf(pack.course)),
          item: id,
          source: "quiz",
          scope: "item",
          label: `${pack.id} · ${it.stem.slice(0, 60)}`,
        },
        answers[id] === it.answer,
        r.score,
      );
    }
  }
}

/**
 * Deneme sınavı maddeleri.
 *
 * Kâğıt denemenin SABİTLENMİŞ sürümünden okunuyor: öğrenci hangi kâğıtla
 * sınava girdiyse ölçüm de onunla yapılıyor, yoksa sonradan düzeltilmiş bir
 * madde eski cevapları haksız yere yanlış gösterirdi.
 */
async function mockBuckets(buckets: Map<string, Bucket>): Promise<void> {
  const rows = await db
    .select({
      paperId: mockExamAttempts.paperId,
      skill: mockExamAttempts.skill,
      release: mockExamAttempts.release,
      answers: mockExamAttempts.answers,
      score: mockExamAttempts.score,
    })
    .from(mockExamAttempts)
    .where(isNotNull(mockExamAttempts.finishedAt))
    .orderBy(desc(mockExamAttempts.id))
    .limit(SCAN);

  for (const r of rows) {
    const paper = await mockPaperAt(r.release, r.paperId);
    if (!paper) continue;
    const scored = scorePart(paper, r.skill as MockSkill, (r.answers ?? {}) as Record<string, string>);
    if (!scored) continue;
    for (const it of scored.items) {
      add(
        buckets,
        `mock:${r.paperId}:${it.id}`,
        {
          pack: paperPack(packCourseOfId(r.paperId)),
          /* Kapatma hedefi KÂĞIT: deneme paketinin maddesi kâğıdın tamamı. */
          item: r.paperId,
          source: "mock",
          scope: "paper",
          label: `${r.paperId} · ${r.skill} · madde ${it.no}`,
        },
        it.correct,
        r.score ?? 0,
      );
    }
  }
}

/** Kullanıcı raporları — madde kimliği `ref` içinde geçiyorsa sayılıyor. */
async function reportCounts(): Promise<Map<string, number>> {
  const rows = await db
    .select({ ref: contentReports.ref, n: sql<number>`count(*)::int` })
    .from(contentReports)
    .where(eq(contentReports.status, "open"))
    .groupBy(contentReports.ref);
  const out = new Map<string, number>();
  for (const r of rows) out.set(r.ref, Number(r.n));
  return out;
}

/**
 * Şüpheli maddeler, en kötüsü başta.
 *
 * Sıralama ayırt etme gücüne göre: en negatif olan en şüpheli. Doğruluk oranı
 * ikincil ölçüt — yukarıdaki gerekçeyle, tek başına bozukluk göstergesi değil.
 */
export async function suspectItems(limit = 40): Promise<SuspectItem[]> {
  const buckets = new Map<string, Bucket>();
  await quizBuckets(buckets);
  await mockBuckets(buckets);
  const reports = await reportCounts();

  const out: SuspectItem[] = [];
  for (const b of buckets.values()) {
    if (b.asked < MIN_ASKED) continue;
    const reportCount = reports.get(b.item) ?? 0;
    const verdict = classifyItem({
      asked: b.asked,
      correct: b.correct,
      rightScores: b.rightScores,
      wrongScores: b.wrongScores,
      reports: reportCount,
    });

    out.push({
      pack: b.pack,
      item: b.item,
      source: b.source,
      scope: b.scope,
      label: b.label,
      asked: b.asked,
      correct: b.correct,
      pct: verdict.pct,
      discrimination: verdict.discrimination,
      reports: reportCount,
      suspect: verdict.suspect,
      why: verdict.why,
    });
  }

  return out
    .sort((a, b) => (a.suspect === b.suspect ? a.discrimination - b.discrimination : a.suspect ? -1 : 1))
    .slice(0, limit);
}

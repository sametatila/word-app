import { mockPaperById } from "./index";
import type { MockItem, MockPaper, MockPart, MockSkill, MockTask } from "./types";
import { MOCK_PASS_PCT } from "./types";

/**
 * Deneme sınavının puanlanması — SAF, sunucuya bağlı değil.
 *
 * Puanlama sunucuda yapılıyor (`/api/mock-exam` action:"finish"): istemci
 * yalnız cevapları gönderiyor, puanı kendisi hesaplayıp göndermiyor. Sebep
 * basit — istemcinin hesapladığı puan istatistiğe girerse istatistik hiçbir
 * şey ölçmez.
 *
 * Mobil oynatıcı aynı kuralın bir kopyasını taşıyor ama yalnız EKRAN için:
 * "kaç madde cevaplandı" göstergesi ve ağ yokken gösterilen geçici sonuç.
 * Resmî sayı buradan çıkanıdır.
 */

/**
 * Cevap karşılaştırma katlaması.
 *
 * Mobil tarafta `MockExamScreen` içinde AYNI kural bir kez daha yazılı
 * (paket `src/` göremiyor). İkisi birlikte değişir; ayrılırlarsa öğrenci
 * ekranda doğru görünen bir cevabın sunucuda yanlış sayıldığını görür.
 *
 * Umlaut açılıyor çünkü telefonda `ä` yazmak zahmetli ve boşluk doldurma
 * maddelerinde ölçülen şey imla değil, doğru sözcüğü bulmak.
 */
export function foldAnswer(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[.,!?;:"'’„“”()[\]{}\-–—/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tek maddenin doğruluğu. Boş cevap her zaman yanlış. */
export function isItemCorrect(item: MockItem, ans: string | undefined): boolean {
  if (ans == null || ans.trim() === "") return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldAnswer(a) === foldAnswer(ans));
}

/** Yazma/konuşma görevi mi — nesnel puanı olmayan görevler. */
export const isOpenTask = (t: MockTask) => t.format === "writing" || t.format === "speaking";

export type ScoredItem = {
  id: string;
  no: number;
  taskId: string;
  taskNo: number;
  goal: string;
  correct: boolean;
  /** Öğrencinin verdiği cevap, ham hâliyle. */
  given: string;
  /** Doğru cevabın okunur hâli — dökümde gösterilir. */
  expected: string;
};

export type MockScore = {
  paperId: string;
  level: string;
  skill: MockSkill;
  correct: number;
  total: number;
  /** 0–100. Nesnel madde yoksa 0. */
  pct: number;
  passed: boolean;
  /** Ölçüm hedefine göre kırılım — zayıf beceriyi burası gösteriyor. */
  byGoal: { goal: string; correct: number; total: number }[];
  /** Teil'e göre kırılım. */
  byTask: { taskId: string; taskNo: number; format: string; goal: string; correct: number; total: number }[];
  items: ScoredItem[];
};

function expectedLabel(item: MockItem, task: MockTask): string {
  if (item.kind === "mcq") return item.options[item.answer] ?? "";
  if (item.kind === "bool") return item.answer ? "richtig" : "falsch";
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === item.answer);
    return o ? `${o.key}) ${o.label}` : item.answer;
  }
  return item.accept[0];
}

export function findPart(paper: MockPaper, skill: MockSkill): MockPart | null {
  return paper.parts.find((p) => p.skill === skill) ?? null;
}

/**
 * Bir bölümün cevaplarını puanlar.
 *
 * `answers` madde kimliğinden cevaba: şıklı maddede dizin ("2"), doğru/yanlış
 * maddesinde "true"/"false", eşleştirmede şık harfi, boşlukta yazılan metin.
 */
export function scorePart(paperId: string, skill: MockSkill, answers: Record<string, string>): MockScore | null {
  const paper = mockPaperById(paperId);
  const part = paper ? findPart(paper, skill) : null;
  if (!paper || !part) return null;

  const items: ScoredItem[] = [];
  const byTask: MockScore["byTask"] = [];
  const goals = new Map<string, { correct: number; total: number }>();

  for (const task of part.tasks) {
    if (isOpenTask(task)) continue;
    let c = 0;
    for (const it of task.items) {
      const ok = isItemCorrect(it, answers[it.id]);
      if (ok) c++;
      const g = goals.get(task.goal) ?? { correct: 0, total: 0 };
      g.total++;
      if (ok) g.correct++;
      goals.set(task.goal, g);
      items.push({
        id: it.id,
        no: it.no,
        taskId: task.id,
        taskNo: task.no,
        goal: task.goal,
        correct: ok,
        given: answers[it.id] ?? "",
        expected: expectedLabel(it, task),
      });
    }
    byTask.push({ taskId: task.id, taskNo: task.no, format: task.format, goal: task.goal, correct: c, total: task.items.length });
  }

  const total = items.length;
  const correct = items.filter((i) => i.correct).length;
  const pct = total ? Math.round((100 * correct) / total) : 0;
  return {
    paperId,
    level: paper.level,
    skill,
    correct,
    total,
    pct,
    // Nesnel maddesi olmayan bölüm (yazma/konuşma) "geçti" diye işaretlenmez;
    // orada geçme kararı rubrikle verilir, sayıyla değil.
    passed: total > 0 && pct >= MOCK_PASS_PCT,
    byGoal: [...goals.entries()].map(([goal, v]) => ({ goal, ...v })),
    byTask,
    items,
  };
}

import { api, ApiError } from "../api/client";
import { todayStr } from "./session";
import { isOpenTask, type MockItem, type MockPart, type MockSkill, type MockTask } from "../data/exams";

/**
 * Deneme sınavı: puanlama kuralı ve oturum çağrıları.
 *
 * PUAN SUNUCUDA. Resmî sayı `/api/mock-exam` action:"finish"ten geliyor;
 * buradaki `localScore` yalnız iki iş için var — ekrandaki "kaç madde
 * cevaplandı" göstergesi ve ağ yokken gösterilen geçici sonuç. İstemcinin
 * hesapladığı puan hiçbir zaman istatistiğe yazılmıyor.
 */

/**
 * Cevap karşılaştırma katlaması — `src/lib/mock-exams/scoring.ts` içindeki
 * `foldAnswer` ile AYNI kural. İkisi birlikte değişir; ayrılırlarsa öğrenci
 * ekranda doğru görünen bir cevabın sunucuda yanlış sayıldığını görür.
 *
 * Kesme işareti siliniyor, boşluğa çevrilmiyor: "don't" ile "dont" aynı cevap
 * sayılmalı. Almancada görünmeyen bir kusurdu, İngilizce boşluk doldurma ve
 * dönüştürme maddelerinde doğru cevabı yanlış sayıyordu.
 */
export function foldAnswer(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/['’‘`´]/g, "")
    .replace(/[.,!?;:"„“”()[\]{}\-–—/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isItemCorrect(item: MockItem, ans: string | undefined): boolean {
  if (ans == null || ans.trim() === "") return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldAnswer(a) === foldAnswer(ans));
}

export function localScore(part: MockPart, answers: Record<string, string>): { correct: number; total: number; pct: number } {
  let correct = 0;
  let total = 0;
  for (const task of part.tasks) {
    if (isOpenTask(task)) continue;
    for (const it of task.items) {
      total++;
      if (isItemCorrect(it, answers[it.id])) correct++;
    }
  }
  return { correct, total, pct: total ? Math.round((100 * correct) / total) : 0 };
}

/** Bölümde boş kalan nesnel madde sayısı. */
export function blankCount(part: MockPart, answers: Record<string, string>): number {
  let n = 0;
  for (const task of part.tasks) {
    if (isOpenTask(task)) continue;
    for (const it of task.items) if (!(answers[it.id] ?? "").trim()) n++;
  }
  return n;
}

/* ── oturum ───────────────────────────────────────────────────────────────── */

export type OpenScore = {
  /** 0–100; sağlayıcı yoksa null. */
  score: number | null;
  tip?: string;
  praise?: string;
  corrected?: string;
  errors?: { wrong?: string; right?: string; why_tr?: string }[];
  reason?: string;
};

export type Attempt = {
  id: number;
  paperId: string;
  skill: MockSkill;
  state: "running" | "done";
  answers: Record<string, string>;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  taskIx: number;
  secondsLeft: number;
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  ai: MockFeedback | null;
};

export type MockTodo = { title: string; why: string; how: string };
export type MockFeedback = { summary: string; strengths: string[]; todo: MockTodo[]; source: "ai" | "rules" };

export type ScoredItem = {
  id: string;
  no: number;
  taskId: string;
  taskNo: number;
  goal: string;
  correct: boolean;
  given: string;
  expected: string;
};
export type MockScore = {
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
  byGoal: { goal: string; correct: number; total: number }[];
  byTask: { taskId: string; taskNo: number; format: string; goal: string; correct: number; total: number }[];
  items: ScoredItem[];
};

/**
 * Sunucuya neden ulaşılamadı.
 *
 * Üçü üç ayrı şey ve öğrenciye üçü ayrı söylenmeli: 404 "uygulama sunucudan
 * yeni, uç henüz yayında değil" demek — kullanıcının yapabileceği bir şey yok;
 * 401 "oturum düşmüş" demek — tekrar giriş yeter; geri kalanı gerçekten
 * ulaşamamak. Hepsine "bağlantı yok" demek yanlış teşhis koyuyordu.
 */
export type FailReason = "not_deployed" | "unauthorized" | "locked" | "unreachable";

export function failReason(err: unknown): FailReason {
  if (err instanceof ApiError) {
    if (err.status === 404 || err.status === 501) return "not_deployed";
    /*
     * 403 İKİ AYRI ŞEY. Uç hem köken denetimi için ("forbidden") hem de kâğıt
     * kilitliyken ("premium_required") 403 dönüyor. İkisini birden "oturumun
     * düşmüş" diye okumak, kilitli kâğıda dokunan kullanıcıyı boş yere giriş
     * ekranına gönderiyordu - hesabında bir sorun yok, kâğıt açık değil.
     * `ApiError.message` sunucunun `error` alanını taşıyor (bkz. api/client).
     */
    if (err.status === 403 && err.message === "premium_required") return "locked";
    if (err.status === 401 || err.status === 403) return "unauthorized";
  }
  return "unreachable";
}

export function startAttempt(paperId: string, skill: MockSkill): Promise<{ attempt: Attempt; resumed: boolean }> {
  return api("/api/mock-exam", {
    method: "POST",
    body: JSON.stringify({ action: "start", paper: paperId, skill, day: todayStr() }),
  });
}

/**
 * Anlık kayıt. Çağıran her cevapta çağırıyor; hata YUTULUYOR çünkü ağ
 * kesintisi sınavı durdurmamalı — cevaplar ekranda duruyor ve bir sonraki
 * kayıt denemesi hepsini birden gönderiyor.
 */
export async function saveAttempt(
  id: number,
  patch: { answers?: Record<string, string>; open?: Record<string, string>; taskIx?: number; secondsLeft?: number },
): Promise<boolean> {
  try {
    await api("/api/mock-exam", { method: "POST", body: JSON.stringify({ action: "save", id, ...patch }) });
    return true;
  } catch {
    return false;
  }
}

export function assessOpen(id: number, taskId: string, text: string): Promise<{ result: OpenScore; configured: boolean }> {
  return api("/api/mock-exam", {
    method: "POST",
    body: JSON.stringify({ action: "assess", id, taskId, text, day: todayStr() }),
  });
}

export function finishAttempt(id: number, answers: Record<string, string>): Promise<{ attempt: Attempt; score: MockScore; ai: MockFeedback }> {
  return api("/api/mock-exam", {
    method: "POST",
    body: JSON.stringify({ action: "finish", id, answers, day: todayStr() }),
  });
}

export type MockStats = {
  attempts: number;
  bySkill: { skill: MockSkill; attempts: number; pct: number; best: number }[];
  byLevel: { level: string; attempts: number; passed: number }[];
  recent: { id: number; paperId: string; skill: MockSkill; level: string; score: number; correct: number; total: number; passed: boolean; finishedAt: string }[];
  running: { id: number; paperId: string; skill: MockSkill; level: string; taskIx: number }[];
};

export function fetchMockStats(): Promise<MockStats> {
  return api("/api/mock-exam?stats=1");
}

/**
 * Ağ yokken kullanılan yerel sonuç — sunucu puanıyla aynı biçimde.
 *
 * `passed` burada da %60 eşiğine bakıyor ama bu sonuç KAYDEDİLMİYOR ve
 * istatistiğe girmiyor; ekran bunu ayrıca söylüyor.
 */
export function offlineScore(part: MockPart, answers: Record<string, string>): MockScore {
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
        id: it.id, no: it.no, taskId: task.id, taskNo: task.no, goal: task.goal,
        correct: ok, given: answers[it.id] ?? "", expected: expectedLabel(it, task),
      });
    }
    byTask.push({ taskId: task.id, taskNo: task.no, format: task.format, goal: task.goal, correct: c, total: task.items.length });
  }
  const total = items.length;
  const correct = items.filter((i) => i.correct).length;
  const pct = total ? Math.round((100 * correct) / total) : 0;
  return {
    correct, total, pct, passed: total > 0 && pct >= 60,
    byGoal: [...goals.entries()].map(([goal, v]) => ({ goal, ...v })),
    byTask, items,
  };
}

export function expectedLabel(item: MockItem, task: MockTask): string {
  if (item.kind === "mcq") return item.options[item.answer] ?? "";
  if (item.kind === "bool") return item.answer ? "richtig" : "falsch";
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === item.answer);
    return o ? `${o.key}) ${o.label}` : item.answer;
  }
  return item.accept[0];
}

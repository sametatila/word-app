import type { MockUnlock } from "../lib/premium";
import { api, ApiError } from "../api/client";
import { todayStr } from "./session";
import { isOpenTask, type MockPart, type MockSkill } from "../data/exams";
import type { DeliveredPaper } from "../content/mockPaper";

/**
 * Deneme sınavı: puanlama kuralı ve oturum çağrıları.
 *
 * PUAN YALNIZ SUNUCUDA. Resmî sayı `/api/mock-exam` action:"finish"ten
 * geliyor ve başka hiçbir yerde hesaplanmıyor: cevap anahtarı cihaza inmediği
 * için hesaplanamaz da. Ekranın kendi hesapladığı tek şey "kaç madde boş
 * kaldı" (`blankCount`) — o da anahtara bakmıyor.
 */

/*
  CEVAP KARŞILAŞTIRMASI ARTIK BURADA DEĞİL.

  `foldAnswer`, `isItemCorrect`, `localScore`, `offlineScore` ve
  `expectedLabel` kaldırıldı: beşi de maddenin `answer`/`accept` alanlarını
  okuyordu ve o alanlar cihaza HİÇ inmiyor (bkz. `src/lib/mock-exams/deliver`).
  Cevap anahtarını cihazda tutmak, kâğıdı ücretsiz uygulamanın içinde
  taşımakla aynı açığın ta kendisiydi.

  Puanı sunucu veriyor (`finishAttempt` → `MockScore`) ve döküm de oradan
  geliyor: hangi madde doğru (`items[].correct`), doğrusu neydi
  (`items[].expected`), neden (`items[].explain`). Sunucuya ulaşılamıyorsa
  puan YOK — uydurulmuş bir puan, puan olmamasından kötü.
*/

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
  /** Uyaran kimliği → kaç kez oynatıldı; oynatma bütçesi de sınavın kısıtı. */
  plays: Record<string, number>;
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  ai: MockFeedback | null;
};

export type MockTodo = { title: string; why: string; how: string };
export type MockFeedback = { summary: string; strengths: string[]; todo: MockTodo[]; source: "ai" | "rules" };

export type ScoredItem = {
  /**
   * Maddenin gerekçesi — sunucudan, kâğıtla değil SONUÇLA geliyor.
   * Kâğıt `explain` taşımadan iniyor; gerekçe cevabı ele verir.
   */
  explain?: string;
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

export function startAttempt(
  paperId: string,
  skill: MockSkill,
): Promise<{ attempt: Attempt; resumed: boolean; paper: DeliveredPaper | null }> {
  return api("/api/mock-exam", {
    method: "POST",
    body: JSON.stringify({ action: "start", paper: paperId, skill, day: todayStr() }),
  });
}

/**
 * KÂĞIDIN KENDİSİ — sınavı başlatmadan.
 *
 * Kapak ekranı bölümün yönergesini ve görev sayısını gösteriyor; bunlar
 * kâğıdın içinde ve kâğıt artık ikilide değil. Kapağa bakmak sınavı
 * başlatmamalı, o yüzden `start` değil bu çağrılıyor: `start` bir deneme
 * satırı açıyor ve saati işletiyor.
 *
 * Kilitli kâğıtta 403 dönüyor — kapı burada da aynı kapı.
 */
export function fetchMockPaper(paperId: string, skill: MockSkill): Promise<{ paper: DeliveredPaper }> {
  return api(`/api/mock-exam?paper=${encodeURIComponent(paperId)}&skill=${encodeURIComponent(skill)}`);
}

/**
 * Anlık kayıt. Çağıran her cevapta çağırıyor; hata YUTULUYOR çünkü ağ
 * kesintisi sınavı durdurmamalı — cevaplar ekranda duruyor ve bir sonraki
 * kayıt denemesi hepsini birden gönderiyor.
 */
export async function saveAttempt(
  id: number,
  patch: { answers?: Record<string, string>; open?: Record<string, string>; taskIx?: number; secondsLeft?: number; plays?: Record<string, number> },
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

/**
 * Bir seviyedeki kâğıtların açık/kilitli durumu.
 *
 * Kilit sunucuda hep vardı ama yalnız sınav BAŞLARKEN sınanıyordu: liste
 * kâğıtların hepsini açık gibi çiziyor, kullanıcı kilitli bir kâğıda giriyor
 * ve ancak orada 403 alıyordu. Liste artık kilidi önceden soruyor.
 */
export type MockAccess = {
  premium: boolean;
  /** Açık kâğıt kimlikleri. */
  unlocked: string[];
  /** Ücretsiz hesapta seviye başına taban kâğıt sayısı. */
  freeLimit: number;
  /** Bitirilmiş kâğıtlar (sunucu; eski sunucuda yok). */
  finished?: string[];
  /**
   * Sonraki kâğıdın/paketin nasıl açılacağı (sunucu `lib/premium/unlock`).
   * Ücretsiz: bitir + 7 günlük seri → +1. Premium: paketteki kâğıtların hepsi
   * bitince sonraki paket. Eski sunucuda yok. (%60 koşulu 2026-09-25'te kalktı.)
   */
  unlock?: MockUnlock;
};

export function fetchMockAccess(level: string): Promise<MockAccess> {
  return api(`/api/mock-exam?access=1&level=${encodeURIComponent(level)}`);
}

export function fetchMockStats(): Promise<MockStats> {
  return api("/api/mock-exam?stats=1");
}

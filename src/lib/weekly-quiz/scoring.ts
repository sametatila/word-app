import type { QuizBlock, QuizItem, QuizNative, QuizWeek } from "./types";

/**
 * Quiz puanlaması — SAF ve SUNUCUDA.
 *
 * NEDEN AYRI VE SAF. Eski haftalık sınav (`api/weekly/route.ts`, artık KALDIRILDI)
 * doğruluğu İSTEMCİDEN alıyordu — gelen cevapta yalnız `typeof a.correct === "boolean"`
 * denetlenip `correct` olduğu gibi yazılıyordu, yani skor da SRS durumu da
 * uydurulabiliyordu (güvenlik denetimi F1). Quiz o ucun yerine geçti ve kurgusu
 * bunun tam tersi: istemci yalnız HANGİ ŞIKKI seçtiğini gönderiyor (`api/quiz`
 * POST gövdedeki `correct`i OKUMUYOR), doğru olup olmadığına sunucu karar veriyor.
 * Cevap anahtarı hiçbir zaman istemciye inmiyor.
 *
 * Deneme sınavlarındaki `mock-exams/scoring.ts` ile aynı desen: puanlayıcı saf,
 * kâğıdı koddan okuyor, istemcinin gönderdiği tek şey cevaplar.
 *
 * ANADİL VARYANTI PUANLAMANIN PARÇASI. Bir maddenin şıkları öğrencinin anadiline
 * göre değişebiliyor (`byNative`), yani doğru şıkkın SIRASI da değişebiliyor.
 * Puanlama bu yüzden varyantı çözmeden yapılamaz; hangi varyantın gösterildiği
 * denemeyle birlikte saklanıyor (bkz. `weeklyQuizAttempts.native`), profil
 * hafta ortasında değişse bile öğrenci gördüğü şıklara göre puanlanıyor.
 */

/** Bir maddenin belirli bir anadil için çözülmüş hâli. */
export type ResolvedItem = {
  id: string;
  block: QuizBlock;
  ref?: string;
  stem: string;
  options: string[];
  /** SUNUCUDA KALIR — `toClient` bunu düşürüyor. */
  answer: number;
  why: string;
  targets: string[];
};

/**
 * Maddeyi anadile göre çözer.
 *
 * Varyantı olmayan anadil taban şıklarla devam ediyor; her madde her öğrenci
 * için çalışıyor (bkz. `types.ts` `byNative`).
 */
export function resolveItem(it: QuizItem, native: QuizNative): ResolvedItem {
  const v = it.byNative?.[native];
  return {
    id: it.id,
    block: it.block,
    ref: it.ref,
    stem: it.stem,
    options: v?.options ?? it.options,
    answer: v?.answer ?? it.answer,
    why: v?.why ?? it.why,
    targets: it.targets,
  };
}

/** İstemciye giden biçim — cevap anahtarı ve açıklama YOK. */
export type ClientItem = Omit<ResolvedItem, "answer" | "why">;

/**
 * Cevap anahtarını ve açıklamayı düşürür.
 *
 * `why` de düşüyor: quiz sırasında gösterilmiyor, sonuçta sunucudan ayrıca
 * geliyor. İkisi birlikte inseydi istemcide duran bir cevap anahtarı olurdu ve
 * bütün kurgu anlamsızlaşırdı.
 */
export function toClient(it: ResolvedItem): ClientItem {
  /* Alanlar TEK TEK kopyalanıyor, ayıklanarak değil. Ayıklama (`...rest`)
     `ResolvedItem`e yarın eklenecek bir alanı SESSİZCE istemciye taşırdı;
     burada yeni alan eklendiğinde derleme bu satırı gösteriyor. */
  return { id: it.id, block: it.block, ref: it.ref, stem: it.stem, options: it.options, targets: it.targets };
}

export type ScoredItem = {
  itemId: string;
  block: QuizBlock;
  /** Öğrencinin seçtiği şık; cevaplanmadıysa `null`. */
  chosen: number | null;
  answer: number;
  correct: boolean;
  /** Yanlıştan sonra gösterilen açıklama — sonuç ekranının kendisi. */
  why: string;
  targets: string[];
};

export type QuizScore = {
  correct: number;
  total: number;
  /** 0–100. Geçme çizgisi YOK: quiz sınav değil, skor yalnız geri bildirim. */
  pct: number;
  /** Yetkinlik kırılımı — "neye çalış" yönlendirmesi buradan çıkıyor. */
  byBlock: { block: QuizBlock; correct: number; total: number }[];
  items: ScoredItem[];
  /**
   * Geri bildirim bandının çeviri anahtarı.
   *
   * Puanın YANINDA duruyor, ayrı hesaplanmıyor: iki istemci de aynı eşiği
   * kendi tarafında yeniden yazsaydı üç kopya olurdu ve biri kayardı.
   */
  band: string;
};

/**
 * Denemeyi puanlar.
 *
 * `itemIds` denemenin AÇILDIĞI anda saklanmış sıra: istemci hangi maddelerin
 * sorulduğunu belirleyemiyor, yalnız cevaplıyor. Listede olmayan bir kimlik
 * için gelen cevap sessizce yok sayılıyor; eksik cevap yanlış sayılıyor
 * (boş bırakmak bir cevaptır).
 */
export function scoreQuiz(
  items: ResolvedItem[],
  answers: Record<string, number>,
): QuizScore {
  const scored: ScoredItem[] = items.map((it) => {
    const raw = answers[it.id];
    const chosen = Number.isInteger(raw) && raw >= 0 && raw < it.options.length ? raw : null;
    return {
      itemId: it.id,
      block: it.block,
      chosen,
      answer: it.answer,
      correct: chosen === it.answer,
      why: it.why,
      targets: it.targets,
    };
  });

  const byBlock = new Map<QuizBlock, { correct: number; total: number }>();
  for (const s of scored) {
    const b = byBlock.get(s.block) ?? { correct: 0, total: 0 };
    b.total++;
    if (s.correct) b.correct++;
    byBlock.set(s.block, b);
  }

  const correct = scored.filter((s) => s.correct).length;
  const total = scored.length;
  return {
    correct,
    total,
    pct: total ? Math.round((100 * correct) / total) : 0,
    byBlock: [...byBlock].map(([block, v]) => ({ block, ...v })),
    items: scored,
    band: feedbackKey(total ? Math.round((100 * correct) / total) : 0),
  };
}

/**
 * Bir sonraki hafta hangi yetkinliğe ağırlık verileceği.
 *
 * En düşük oranlı blok dönüyor; beraberlikte blok sırası karar veriyor
 * (deterministik olması önemli — aynı geçmiş aynı öneriyi vermeli). Hiç yanlış
 * yoksa `null`: ağırlıklandıracak bir zayıflık yok demektir.
 */
export function weakestBlock(score: QuizScore): QuizBlock | null {
  const ranked = score.byBlock
    .filter((b) => b.total > 0 && b.correct < b.total)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
  return ranked[0]?.block ?? null;
}

/**
 * Skorun geri bildirim bandı — `QUIZ_FEEDBACK_BANDS` anahtarını veriyor.
 *
 * Eşik yalnız SÖZE dönüyor, kapıya değil: quiz'i "geçmek" diye bir şey yok.
 */
export function feedbackKey(pct: number): string {
  if (pct >= 90) return "wquiz.band_strong";
  if (pct >= 60) return "wquiz.band_solid";
  return "wquiz.band_practice";
}

/** Bir haftanın maddelerini kimliğe göre çözer (puanlama girişi). */
export function resolveByIds(week: QuizWeek, ids: string[], native: QuizNative): ResolvedItem[] {
  const map = new Map(week.items.map((i) => [i.id, i]));
  const out: ResolvedItem[] = [];
  for (const id of ids) {
    const it = map.get(id);
    if (it) out.push(resolveItem(it, native));
  }
  return out;
}

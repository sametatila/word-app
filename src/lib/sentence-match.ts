import { classifyOrder, levenshtein, type ErrorType } from "@/lib/errors";

/**
 * Cümle eşleştirme — "Çevir" turunun hakemi (plan WP-10).
 *
 * Kelime yazma oyununda cevap tek kelimedir ve "doğru/yanlış" yeter. Cümlede
 * yetmez: "Heute ich gehe ins Kino" cümlesi yanlıştır ama kelimelerin hepsi
 * doğrudur, yalnız sıra bozuktur; "Ich gehe heute ins Kinno" ise bir harf
 * hatasıdır. İkisine de "yanlış, doğrusu şu" demek öğrenciye hiçbir şey
 * öğretmez ve emeğini sıfırlar. Bu modül farkı üç katmanda ölçer:
 *
 *   1. Katlama — büyük/küçük harf, noktalama, ß/ss, ae/oe/ue: bunlar cevabı
 *      değiştirmez (kelime oyunlarındaki `foldSpelling` ile aynı ilke).
 *   2. Kelime dizisi — en uzun ortak alt dizi ile hizalama: eksik, fazla,
 *      yer değiştirmiş, yanlış yazılmış kelimeler AYRI AYRI işaretlenir.
 *      Ekrandaki fark vurgusu buradan çıkar.
 *   3. Karar — tam / yazım / sıra / yanlış → SRS kalite puanı 5 / 4 / 3 / 1
 *      ve hata tipi. Sıra hatası "yanlış" sayılır (istatistik ve hata tipi)
 *      ama kelime lapse etmez (kalite 3): kelime bilinmiş, cümle kurulamamış.
 *
 * Saf: istemcide cevap anında çalışır, sunucuda test edilir.
 */

export type Verdict = "exact" | "spelling" | "order" | "wrong";

export type TokenMark = "same" | "missing" | "extra" | "moved" | "typo";

export type SentenceMatch = {
  verdict: Verdict;
  /** SRS kalite puanı 0–5. */
  quality: 5 | 4 | 3 | 1;
  /** Yanlışsa hata tipi; tam doğruda yok. */
  errorType?: ErrorType;
  /** Hedef cümlenin kelimeleri, işaretli: missing = öğrenci yazmadı, moved = yeri yanlış, typo = yazımı yanlış. */
  target: { text: string; mark: TokenMark }[];
  /** Öğrencinin kelimeleri, işaretli: extra = hedefte yok, moved, typo. */
  typed: { text: string; mark: TokenMark }[];
  /** Eşleşen hedef (alternatifler arasından en yakını). */
  matched: string;
};

/** Katlama: karşılaştırma için; ekranda hep orijinal metin gösterilir. */
export function foldSentence(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[.,!?;:„“”"'’()–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const tokens = (s: string) => s.split(/\s+/).filter(Boolean);
const foldTokens = (s: string) => tokens(foldSentence(s));
/** Orijinal kelimeler, noktalama atılmış — ekranda işaretlenecek parçalar. */
const showTokens = (s: string) => tokens(s.replace(/[.,!?;:„“”"()]/g, " "));

/** Yazım hatası toleransı: kelime uzunluğuna göre 1–2 harf. */
function nearlySame(a: string, b: string): boolean {
  if (a === b) return false;
  const tol = Math.max(a.length, b.length) >= 6 ? 2 : 1;
  return levenshtein(a, b) <= tol;
}

/** En uzun ortak alt dizi: hedef ve yazılan dizinin hizalı indeks çiftleri. */
function lcs(a: string[], b: string[]): [number, number][] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const pairs: [number, number][] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      pairs.push([i, j]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}

function compare(typedRaw: string, targetRaw: string) {
  const t = foldTokens(targetRaw);
  const u = foldTokens(typedRaw);
  const targetMarks: TokenMark[] = new Array(t.length).fill("missing");
  const typedMarks: TokenMark[] = new Array(u.length).fill("extra");
  for (const [i, j] of lcs(t, u)) {
    targetMarks[i] = "same";
    typedMarks[j] = "same";
  }
  // Hizalanmayan hedef kelimesi yazılanda başka yerde geçiyorsa yer değiştirmiş;
  // benzer yazımla geçiyorsa yazım hatası. Her yazılan kelime bir kez kullanılır.
  const freeTyped = new Set(u.map((_, j) => j).filter((j) => typedMarks[j] === "extra"));
  for (let i = 0; i < t.length; i++) {
    if (targetMarks[i] !== "missing") continue;
    const exact = [...freeTyped].find((j) => u[j] === t[i]);
    if (exact !== undefined) {
      targetMarks[i] = "moved";
      typedMarks[exact] = "moved";
      freeTyped.delete(exact);
    }
  }
  for (let i = 0; i < t.length; i++) {
    if (targetMarks[i] !== "missing") continue;
    const near = [...freeTyped].find((j) => nearlySame(u[j], t[i]));
    if (near !== undefined) {
      targetMarks[i] = "typo";
      typedMarks[near] = "typo";
      freeTyped.delete(near);
    }
  }
  const count = (marks: TokenMark[], m: TokenMark) => marks.filter((x) => x === m).length;
  const missing = count(targetMarks, "missing");
  const extra = count(typedMarks, "extra");
  const moved = count(targetMarks, "moved");
  const typo = count(targetMarks, "typo");
  const same = count(targetMarks, "same");
  // Yakınlık: eşleşen + yer değiştirmiş + yazım hatalı kelime oranı — aday seçimi için.
  const score = t.length ? (same + moved + typo * 0.8 - missing * 0.5 - extra * 0.5) / t.length : 0;
  return { t, u, targetMarks, typedMarks, missing, extra, moved, typo, same, score };
}

/**
 * Yazılan cümleyi hedef ve alternatiflerle karşılaştırır.
 *
 * Karar sırası: tam eşleşme → yalnız yazım sapmaları (kelime sayısı aynı,
 * eksik/fazla yok, hataların hepsi yakın yazım) → yalnız sıra (kelime kümesi
 * aynı, eksik/fazla/yazım yok, sıra farklı) → yanlış. Karma durumlar (hem
 * sıra hem yazım) sıraya sayılır: kelimeler bilinmiş, cümle kurulamamış.
 */
export function matchSentence(typed: string, target: string, alternatives: string[] = []): SentenceMatch {
  const candidates = [target, ...alternatives.filter((a) => a && a.trim())];
  const typedShown = showTokens(typed);
  let best: { cand: string; c: ReturnType<typeof compare> } | null = null;
  for (const cand of candidates) {
    const c = compare(typed, cand);
    if (!best || c.score > best.c.score) best = { cand, c };
  }
  const { cand, c } = best!;
  const targetShown = showTokens(cand);
  const targetOut = c.t.map((_, i) => ({ text: targetShown[i] ?? c.t[i], mark: c.targetMarks[i] }));
  const typedOut = c.u.map((_, j) => ({ text: typedShown[j] ?? c.u[j], mark: c.typedMarks[j] }));

  const tail = cand.match(/[.!?…]+$/)?.[0] ?? "";
  if (c.missing === 0 && c.extra === 0 && c.moved === 0 && c.typo === 0 && c.t.length === c.u.length) {
    return { verdict: "exact", quality: 5, target: targetOut, typed: typedOut, matched: cand };
  }
  if (c.missing === 0 && c.extra === 0 && c.moved === 0 && c.typo > 0 && c.t.length === c.u.length) {
    return { verdict: "spelling", quality: 4, errorType: "spelling", target: targetOut, typed: typedOut, matched: cand };
  }
  if (c.missing === 0 && c.extra === 0 && c.moved > 0 && c.t.length === c.u.length) {
    const errorType = classifyOrder(c.u, c.t, tail);
    return { verdict: "order", quality: 3, errorType, target: targetOut, typed: typedOut, matched: cand };
  }
  return { verdict: "wrong", quality: 1, errorType: "meaning", target: targetOut, typed: typedOut, matched: cand };
}

/** Şerit metni: karar → Türkçe kısa başlık. */
export const VERDICT_TEXT: Record<Verdict, string> = {
  exact: "Harika! Cümle tam doğru.",
  spelling: "Neredeyse — yalnız yazım.",
  order: "Kelimeler doğru, sıra değil.",
  wrong: "Doğrusu:",
};

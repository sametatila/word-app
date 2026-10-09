import { classifyOrder, levenshtein, type ErrorType } from "@/lib/errors";
import { foldContractions } from "@/lib/contractions";
import { foldEnglishSpelling } from "@/lib/en-spelling";
import { foldNumbers } from "@/lib/numbers";
import type { TargetLang } from "@/lib/courses";
import { FORM_CUES, ORDER_CUES } from "@/lib/hint-cues";

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
  /**
   * Hedef cümlenin kelimeleri, işaretli: missing = öğrenci yazmadı, moved = yeri
   * yanlış, typo = yazımı yanlış. `typed`: yazım hatasında öğrencinin o kelime
   * için yazdığı biçim — sonuç katmanı "Kinno → Kino" diye gösteriyor.
   */
  target: { text: string; mark: TokenMark; typed?: string }[];
  /** Öğrencinin kelimeleri, işaretli: extra = hedefte yok, moved, typo. */
  typed: { text: string; mark: TokenMark }[];
  /** Eşleşen hedef (alternatifler arasından en yakını). */
  matched: string;
};

/**
 * Katlama: karşılaştırma için; ekranda hep orijinal metin gösterilir.
 *
 * DİLE BAKIYOR. Küçültme `de-DE` ve umlaut katlaması SABİTTİ: İngilizce
 * kursta "five" sayı olarak katlanmıyordu ("um fünf Uhr" ↔ "um 5 Uhr" çalışıp
 * "at five o'clock" ↔ "at 5 o'clock" çalışmıyordu) ve küçültme yanlış yerel
 * ile yapılıyordu. Mobil `lib/textFold` `foldCase` karşılığı.
 */
export function foldSentence(s: string, lang: TargetLang = "de"): string {
  // Sayı sözcükleri rakama: tanıyıcı/yazan "fünf"ü "5" verebiliyor, hedef
  // "fünf". Cümlede "um fünf Uhr" ↔ "um 5 Uhr" eşleşsin.
  // Kısaltma açılıyor (aşağıdaki noktalama temizliği kesme işaretini boşluğa
  // çeviriyor; "I'm" ile "I am" yoksa buluşamaz — `lib/contractions.ts`).
  const lower = foldNumbers(
    foldEnglishSpelling(
      foldContractions(s.toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US"), lang),
      lang,
    ),
    lang,
  );
  const folded =
    lang === "de"
      ? lower.replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      : lower;
  return folded
    .replace(/[.,!?;:„“”"'’()–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const tokens = (s: string) => s.split(/\s+/).filter(Boolean);
const foldTokens = (s: string, lang: TargetLang) => tokens(foldSentence(s, lang));
/** Orijinal kelimeler, noktalama atılmış — ekranda işaretlenecek parçalar. */
const showTokens = (s: string) => tokens(s.replace(/[.,!?;:„“”"()]/g, " "));

/**
 * Yazım hatası toleransı: kelime uzunluğuna göre 1–2 harf.
 *
 * SAYILAR MUAF. Katlama sayı sözcüklerini rakama indiriyor, dolayısıyla
 * "at six o'clock" ile "at 5 o'clock" tek karakterlik bir fark ("6" ↔ "5")
 * hâline geliyordu ve yazım hatası sayılıyordu: öğrenci yanlış saati yazıp
 * kalite 4 (yazım) alıyordu, oysa yanlış olan şey cümlenin BİLGİSİ. Rakam
 * ile rakam arasındaki fark hiçbir zaman yazım hatası değildir.
 *
 * DİLBİLGİSİ FARKI DA YAZIM HATASI DEĞİL (QA 2026-10-09). Tolerans yalnız
 * harf sayısına bakıyordu ve çekim hatalarını "küçük yazım hatası" diye
 * geçiriyordu: "Ich habe keine Katze." istenirken "Ich habe kein Katze.",
 * "Woher kommen Sie?" istenirken "Woher kommst Sie?" doğru sayıldı — yeniden
 * yaz görevinin ölçtüğü şey tam da bu çekim. Üç fark artık yazım değil:
 *   1. yalnız umlaut farkı (schon/schön, Mutter/Mütter): ayrı kelime/biçim;
 *   2. iki kapalı sınıf sözcüğü (artikel, kein, iyelik, dies-/jed-, şahıs
 *      zamiri, sein/haben/werden çekimi, am/im/zum…): biri ötekinin yerine
 *      yazılmışsa seçilen biçim yanlış, harf değil;
 *   3. aynı gövde, yalnız çekim eki farklı (kommst/kommen, Katze/Katzen,
 *      mache/machst; İngilizcede s/es/ed/ing).
 * Gerçek yazım hataları (Shule, Wohnug, Kinno, harf yer değişimi) yine yazım.
 * `loose` eski davranış: telaffuz puanı tanıyıcının çekim sapmasını "yakın"
 * saymaya devam ediyor (`lib/pronounce`), orada ölçülen anlaşılırlık.
 */
const CLOSED_STEMS: Record<string, { stems: string[]; endings: string[]; words: string[] }> = {
  de: {
    stems: ["ein", "kein", "mein", "dein", "sein", "ihr", "unser", "eur", "euer", "dies", "jed", "welch", "manch", "solch", "jen", "all"],
    endings: ["", "e", "en", "em", "er", "es"],
    words: [
      "der", "die", "das", "den", "dem", "des",
      "ich", "mich", "mir", "du", "dich", "dir", "er", "ihn", "ihm", "sie", "es", "wir", "uns", "euch", "ihnen", "man",
      "bin", "bist", "ist", "sind", "seid", "war", "warst", "waren", "wart",
      "habe", "hast", "hat", "haben", "habt", "hatte", "hattest", "hatten", "hattet",
      "werde", "wirst", "wird", "werden", "werdet", "wurde", "wurdest", "wurden", "wurdet",
      "an", "am", "ans", "in", "im", "ins", "zu", "zum", "zur", "von", "vom", "bei", "beim",
    ],
  },
  en: {
    stems: [],
    endings: [],
    /* Tek dizgi: ham metin taraması tek başına "her"i Türkçe sanıyor. */
    words: (
      "a an the this that these those i me my mine you your yours he him his she her hers it its " +
      "we us our ours they them their theirs is am are was were be been being has have had do does did"
    ).split(" "),
  },
};
const CLOSED: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(CLOSED_STEMS).map(([l, c]) => [l, new Set([...c.words, ...c.stems.flatMap((s) => c.endings.map((e) => s + e))])]),
);
const ENDINGS: Record<string, Set<string>> = {
  de: new Set(["", "e", "en", "er", "es", "em", "n", "s", "st", "t", "et", "est", "te", "ten", "tet", "test", "tes"]),
  en: new Set(["", "s", "es", "ed", "d", "ing", "e", "y", "ies", "ied", "er", "est"]),
};

/** Aynı gövde (en az iki harf), iki ayrı çekim eki: kommst/kommen, Katze/Katzen. */
function sameStem(a: string, b: string, endings: Set<string>): boolean {
  let p = 0;
  while (p < a.length && p < b.length && a[p] === b[p]) p++;
  for (let s = p; s >= 2; s--) {
    const ea = a.slice(s);
    const eb = b.slice(s);
    if (ea !== eb && endings.has(ea) && endings.has(eb)) return true;
  }
  return false;
}

/** Fark dilbilgisel mi (umlaut, kapalı sınıf, çekim eki)? Katlanmış kelimelerde. */
function grammaticalPair(a: string, b: string, lang: string): boolean {
  const closed = CLOSED[lang];
  if (closed && closed.has(a) && closed.has(b)) return true;
  const endings = ENDINGS[lang];
  if (endings && sameStem(a, b, endings)) return true;
  if (lang === "de") {
    const plain = (x: string) => x.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u");
    const pa = plain(a);
    const pb = plain(b);
    if (pa === pb || (endings && sameStem(pa, pb, endings))) return true;
  }
  return false;
}

function nearlySame(a: string, b: string, lang: string, loose = false): boolean {
  if (a === b) return false;
  if (/^\d+(st|nd|rd|th)?$/.test(a) || /^\d+(st|nd|rd|th)?$/.test(b)) return false;
  const tol = Math.max(a.length, b.length) >= 6 ? 2 : 1;
  if (levenshtein(a, b) > tol) return false;
  return loose || !grammaticalPair(a, b, lang);
}

/**
 * Bütün cevapta küçük sapma YAZIM mı, DİLBİLGİSİ mi? Tek kelimelik/kısa yazılı
 * cevaplar (boşluk doldurma, kısa cevap, dikte, form alanı: `written`) bütün
 * dizede tek harf toleransı veriyordu ve "Hunden" istenirken "Hunde" doğru
 * sayıldı (QA #36) — cümle hakemindeki aynı kusur. Ölçüt `nearlySame`inkiyle
 * aynı: katlanmış iki metnin farklı kelimeleri arasında dilbilgisel bir çift
 * (umlaut, kapalı sınıf, çekim eki) varsa yazım hatası değil. Kelime sayısı
 * farklıysa (boşluk unutulmuş) yazım sayılır.
 */
export function typoOnly(typedFolded: string, targetFolded: string, lang: string): boolean {
  const a = typedFolded.split(/\s+/).filter(Boolean);
  const b = targetFolded.split(/\s+/).filter(Boolean);
  if (a.length !== b.length) return true;
  return a.every((w, i) => w === b[i] || !grammaticalPair(w, b[i], lang));
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

function compare(typedRaw: string, targetRaw: string, lang: TargetLang, loose: boolean) {
  const t = foldTokens(targetRaw, lang);
  const u = foldTokens(typedRaw, lang);
  const targetMarks: TokenMark[] = new Array(t.length).fill("missing");
  /** Yazım hatası eşi: hedef indeksi → yazılan indeksi. */
  const typoPair = new Map<number, number>();
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
    const near = [...freeTyped].find((j) => nearlySame(u[j], t[i], lang, loose));
    if (near !== undefined) {
      targetMarks[i] = "typo";
      typedMarks[near] = "typo";
      typoPair.set(i, near);
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
  // Yer değiştirmiş kelime tam eşleşmeden AZ sayılıyor: ikisi eşit sayılınca sıra
  // farkıyla ayrışan adaylar ("Ich höre um sechs auf" / "Um sechs höre ich auf")
  // berabere kalıyor ve ilk aday kazanıyordu; öğrencinin birebir yazdığı kabul
  // edilen biçim "sıra hatası" diye işaretlendi (QA, modül sınavı 2026-10-09).
  const score = t.length ? (same + moved * 0.9 + typo * 0.8 - missing * 0.5 - extra * 0.5) / t.length : 0;
  return { t, u, targetMarks, typedMarks, typoPair, missing, extra, moved, typo, same, score };
}

/**
 * Yazılan cümleyi hedef ve alternatiflerle karşılaştırır.
 *
 * Karar sırası: tam eşleşme → yalnız yazım sapmaları (kelime sayısı aynı,
 * eksik/fazla yok, hataların hepsi yakın yazım) → yalnız sıra (kelime kümesi
 * aynı, eksik/fazla/yazım yok, sıra farklı) → yanlış. Karma durumlar (hem
 * sıra hem yazım) sıraya sayılır: kelimeler bilinmiş, cümle kurulamamış.
 */
/** `loose`: çekim/umlaut farkını da yakın say (yalnız telaffuz puanı; bkz. `nearlySame`). */
export type MatchOptions = { loose?: boolean };

export function matchSentence(typed: string, target: string, alternatives: string[] = [], lang: TargetLang = "de", opts: MatchOptions = {}): SentenceMatch {
  const candidates = [target, ...alternatives.filter((a) => a && a.trim())];
  const typedShown = showTokens(typed);
  let best: { cand: string; c: ReturnType<typeof compare> } | null = null;
  for (const cand of candidates) {
    const c = compare(typed, cand, lang, opts.loose === true);
    if (!best || c.score > best.c.score) best = { cand, c };
  }
  const { cand, c } = best!;
  const targetShown = showTokens(cand);
  const targetOut = c.t.map((_, i) => {
    const j = c.typoPair.get(i);
    return j === undefined
      ? { text: targetShown[i] ?? c.t[i], mark: c.targetMarks[i] }
      : { text: targetShown[i] ?? c.t[i], mark: c.targetMarks[i], typed: typedShown[j] ?? c.u[j] };
  });
  const typedOut = c.u.map((_, j) => ({ text: typedShown[j] ?? c.u[j], mark: c.typedMarks[j] }));

  const tail = cand.match(/[.!?…]+$/)?.[0] ?? "";
  if (c.missing === 0 && c.extra === 0 && c.moved === 0 && c.typo === 0 && c.t.length === c.u.length) {
    return { verdict: "exact", quality: 5, target: targetOut, typed: typedOut, matched: cand };
  }
  if (c.missing === 0 && c.extra === 0 && c.moved === 0 && c.typo > 0 && c.t.length === c.u.length) {
    return { verdict: "spelling", quality: 4, errorType: "spelling", target: targetOut, typed: typedOut, matched: cand };
  }
  if (c.missing === 0 && c.extra === 0 && c.moved > 0 && c.t.length === c.u.length) {
    const errorType = classifyOrder(c.u, c.t, tail, lang);
    return { verdict: "order", quality: 3, errorType, target: targetOut, typed: typedOut, matched: cand };
  }
  return { verdict: "wrong", quality: 1, errorType: "meaning", target: targetOut, typed: typedOut, matched: cand };
}

/**
 * Şerit metni: karar → sözlük anahtarı.
 *
 * Metnin kendisi burada durmuyor: hakem hem sunucuda hem istemcide çalışıyor,
 * çeviri ise gösterildiği yerde yapılıyor (kullanıcının dili orada biliniyor).
 */
export const VERDICT_KEYS: Record<Verdict, string> = {
  exact: "match.exact",
  spelling: "match.spelling",
  order: "match.order",
  wrong: "match.wrong",
};

/**
 * Konuşma anlatımındaki üretim adımının YANLIŞ cevabına hangi geri bildirim.
 *
 * Adımın elle yazılmış ipucu (`hint`) tipik hatayı söylüyor: "'weil'den sonra
 * fiil en sona gider: …". Oynatıcılar onu her yanlışta okuyordu ve cevap
 * istenenden BAŞKA bir cümleyse ipucu yanlış teşhis oluyordu: "Bu pozisyonu
 * istiyorum çünkü Almanca konuşuyorum" istenirken "Ich möchte diese Stelle,
 * weil ich viel Erfahrung habe." yazan öğrenci fiili doğru yere koymuştu ama
 * "fiil en sona gider" uyarısı aldı (denetim T16).
 *
 * Üretim adımı serbest cümle değil ÇEVİRİ (3342 adımın hepsinde tek hedef ve
 * eşdeğer biçimler, `accept`); başka anlamdaki cümleyi doğru saymak adımın
 * ölçtüğünü bozardı. Burada değişen yalnız SÖYLENEN: cevap hedefin bozulmuş
 * hâli değil de başka bir cümleyse "istenen cümleden farklı, istenen şu"
 * deniyor ve kural uyarısı verilmiyor.
 *
 * Ölçü hakemin kendi hizalaması (`matchSentence`):
 *   - sıra ya da yazım sapması → "hint": kelimeler bilinmiş, kurulum bozuk;
 *     ipucunun konusu tam olarak bu.
 *   - hedefin en az iki kelimesi yok VE en az iki yabancı kelime var → "other":
 *     öğrenci başka bir şey söylemiş.
 *   - hedefin hepsi sırasıyla var, üstüne en az iki kelime eklenmiş → "other":
 *     cümle kurulmuş, fazlası istenmemiş (kural uyarısı haksız olurdu).
 *   - tek kelimelik fark (yanlış çekim, fazladan "zu", eksik artikel) →
 *     "hint": ipuçlarının çoğu tam bu hataları anlatıyor.
 */
export type ProduceMiss = "hint" | "other";

export function produceMiss(typed: string, target: string, alternatives: string[] = [], lang: TargetLang = "de"): ProduceMiss {
  const m = matchSentence(typed, target, alternatives, lang);
  if (m.verdict !== "wrong") return "hint";
  const missing = m.target.filter((t) => t.mark === "missing").length;
  const moved = m.target.filter((t) => t.mark === "moved").length;
  const extra = m.typed.filter((t) => t.mark === "extra").length;
  if (extra >= 2 && missing >= 2) return "other";
  if (extra >= 2 && missing === 0 && moved === 0) return "other";
  return "hint";
}

/**
 * Farklar, satır satır ve EŞLENMİŞ (QA F-0020).
 *
 * Hakemin işaretleri kelime başına: "Die Lieferung dauert zwei Tage." istenirken
 * "… zwei Tag." yazana hedefte `Tage` eksik, yazılanda `Tag` fazla diyordu —
 * iki ayrı satır ("Tage yazılmamış", "Tag fazla"). Oysa hata tek: Tag → Tage.
 * Aynı boşlukta (iki ortak kelime arasında) kalan eksik ve fazla kelime
 * eşleniyor:
 *   - dilbilgisel çift (çekim eki, umlaut, artikel/zamir; `grammaticalPair`)
 *     → "form": kelime doğru, biçimi yanlış;
 *   - boşlukta tek eksik ve tek fazla kaldıysa → "word": o yere başka kelime
 *     yazılmış ("nach → in");
 *   - kalanlar eksik / fazla.
 * Sıra hedef cümlenin sırası, eşlenmemiş fazlalar sonda. Saf ve iki platformda
 * aynı gövde: sonuç katmanının "Farklar"ı ve konuşmadaki üretim adımının
 * geri bildirimi bunu çiziyor.
 */
export type DiffLineKind = "missing" | "typo" | "form" | "word" | "moved" | "extra";
export type DiffLine = { kind: DiffLineKind; word: string; typed?: string };
type DiffToken = { text: string; mark: TokenMark; typed?: string };

export function diffLines(target: DiffToken[], typed: DiffToken[], lang: TargetLang = "de"): DiffLine[] {
  /* LCS çiftleri sıralı: hedefteki k. ortak kelime yazılandaki k. ortak
     kelimeyle eşleşmiş. Boşluk g = (g-1). ile g. ortak kelime arası. */
  const gapsOf = (list: DiffToken[]) => {
    const gaps: number[][] = [[]];
    list.forEach((k, i) => (k.mark === "same" ? gaps.push([]) : gaps[gaps.length - 1].push(i)));
    return gaps;
  };
  const tg = gapsOf(target);
  const ug = gapsOf(typed);
  const pairOf = new Map<number, { typed: string; kind: "form" | "word" }>();
  const pairedTyped = new Set<number>();
  tg.forEach((gap, g) => {
    const miss = gap.filter((i) => target[i].mark === "missing");
    const free = (ug[g] ?? []).filter((j) => typed[j].mark === "extra");
    for (const i of miss) {
      const a = foldSentence(target[i].text, lang);
      const at = free.findIndex((j) => grammaticalPair(foldSentence(typed[j].text, lang), a, lang));
      if (at < 0) continue;
      const j = free.splice(at, 1)[0];
      pairOf.set(i, { typed: typed[j].text, kind: "form" });
      pairedTyped.add(j);
    }
    const left = miss.filter((i) => !pairOf.has(i));
    if (left.length === 1 && free.length === 1) {
      pairOf.set(left[0], { typed: typed[free[0]].text, kind: "word" });
      pairedTyped.add(free[0]);
    }
  });
  const lines: DiffLine[] = [];
  target.forEach((k, i) => {
    if (k.mark === "missing") {
      const p = pairOf.get(i);
      lines.push(p ? { kind: p.kind, word: k.text, typed: p.typed } : { kind: "missing", word: k.text });
    } else if (k.mark === "typo") lines.push(k.typed ? { kind: "typo", word: k.text, typed: k.typed } : { kind: "typo", word: k.text });
    else if (k.mark === "moved") lines.push({ kind: "moved", word: k.text });
  });
  typed.forEach((k, j) => {
    if (k.mark === "extra" && !pairedTyped.has(j)) lines.push({ kind: "extra", word: k.text });
  });
  return lines;
}

/**
 * Üretim ipucunun KONUSU: sıra mı, biçim mi (QA F-0020).
 *
 * Adımın elle yazılmış ipucu çoğu zaman tek bir şeyi anlatıyor: "Önce
 * teslimat, sonra fiil, en sonda süre" (sıra) ya da "Anne dişil bir kelime,
 * iyelik sonuna bir harf alır" (biçim). Oynatıcı ipucunu her yanlışta
 * okuyordu: "zwei Tag" yazan öğrenciye kelime sırası anlatıldı, hatası çoğul
 * ekiydi. İpucu artık yalnız hatanın türüne uyuyorsa okunuyor; uymuyorsa
 * hakemin farkı ("Tag → Tage") ve doğru cümle yeter.
 *
 * Ölçü anlatım dilindeki ipucu metninde (Türkçe, İngilizce, Almanca) konum
 * sözcükleri: başta/sonda/önce…sonra, first/at the end, am Ende/zuerst.
 * Biçim sözcükleri (dişil, çoğul, hâl, ek; plural, case, ending; Plural,
 * Dativ, Endung) ipucunu karma yapar. Konum sözcüğü olmayan ipucu biçim/genel
 * sayılır — eski davranış, yanlış teşhis riski yalnız sıra ipucunda.
 */
export type HintFocus = { order: boolean; form: boolean };

export function hintFocus(text: string): HintFocus {
  const order = ORDER_CUES.test(text);
  return { order, form: !order || FORM_CUES.test(text) };
}

/**
 * Üretim adımında yanlış cevabın geri bildirimi (QA F-0020; `produceMiss`in
 * üstünde).
 *
 *   - "other": cevap başka bir cümle — "istenen cümleden farklı, istenen şu".
 *   - "diff": hedefin bozulmuş hâli — hakemin farkı (`diffLines`) gösteriliyor;
 *     `hint` adımın ipucu da okunsun mu: ipucu hatanın türüne uyuyorsa (sıra
 *     ipucu yalnız sıra hatasında, biçim/genel ipucu yalnız kelime/biçim
 *     hatasında). Cevap bir eşdeğer biçime (`accept`) daha yakınsa ipucu o
 *     biçimi anlatmıyor: `matched` doğru cümle olarak gösteriliyor.
 *
 * `hintText`: ipucunun anlatım dilindeki metni (hedef dildeki örnekler hariç).
 */
export type ProduceFeedback = { kind: "other" } | { kind: "diff"; lines: DiffLine[]; matched: string; hint: boolean };

export function produceFeedback(
  typed: string,
  target: string,
  alternatives: string[],
  hintText: string,
  lang: TargetLang = "de",
): ProduceFeedback {
  if (produceMiss(typed, target, alternatives, lang) === "other") return { kind: "other" };
  const m = matchSentence(typed, target, alternatives, lang);
  const lines = diffLines(m.target, m.typed, lang);
  if (!lines.length) return { kind: "diff", lines, matched: target, hint: true };
  const order = lines.some((l) => l.kind === "moved");
  const other = lines.some((l) => l.kind !== "moved");
  const f = hintFocus(hintText);
  const hint = m.matched === target && ((order && f.order) || (other && f.form));
  return { kind: "diff", lines, matched: m.matched, hint };
}

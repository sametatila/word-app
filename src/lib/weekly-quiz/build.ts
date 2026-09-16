import { QUIZ_PLAN, type QuizItem, type QuizWeek } from "./types";

/**
 * Quiz örneğinin kurulması — HANGİ maddeler, hangi sırada.
 *
 * SAF. Veritabanına dokunmuyor; kişisel blok için gereken sözcükler dışarıdan
 * veriliyor. Sebebi `access.ts`'teki `computePacks` ile aynı: kilidin ve
 * seçimin doğru davranması ancak veritabanısız sınanabilirse gerçekten
 * sınanabilir.
 *
 * BLUEPRINT SAYILARI DEĞİŞMİYOR. Uyarlama "zayıf bloktan bir madde fazla
 * sormak" değil, AYNI bloktan HANGİ maddenin seçileceği. Sayılar kayarsa iki
 * haftanın skoru karşılaştırılamaz hâle gelir ve quiz'in gelişim göstergesi
 * olma özelliği gider — deneme sınavlarındaki `PLAN` tablosuyla aynı gerekçe.
 */

/** Takvim haftası indeksinin başlangıcı — bir pazartesi. */
const ANCHOR = "2026-01-05";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Bir günün ISO haftasının pazartesisi. `lib/session` `weekStart` ile aynı
 * kural; burada yeniden yazılmasının sebebi bu modülün `server-only`
 * olmaması — saf kalması sınanabilirliğin şartı.
 */
export function weekStartOf(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  const dow = d.getUTCDay(); // 0 pazar … 6 cumartesi
  d.setUTCDate(d.getUTCDate() - ((dow + 6) % 7));
  return d.toISOString().slice(0, 10);
}

/**
 * Takvim haftası indeksi — içerik sırası buradan geliyor.
 *
 * SUNUCU GÜNÜNDEN türetiliyor, istemcinin gönderdiği `day`den DEĞİL. Bugünkü
 * haftalık sınavın açığı tam buradaydı: gün istemciden geliyor ve ±1 güne
 * izin veriliyordu, yani hafta sınırında ikinci bir hak açılabiliyordu.
 */
export function weekIndexOf(day: string): number {
  const a = Date.parse(`${ANCHOR}T00:00:00Z`);
  const w = Date.parse(`${weekStartOf(day)}T00:00:00Z`);
  return Math.floor((w - a) / (7 * DAY_MS));
}

/* ── Deterministik seçim ──────────────────────────────────────────────── */

/**
 * Tohumlu karıştırma.
 *
 * `Math.random` KULLANILMIYOR: aynı öğrenci aynı haftada sayfayı yenilediğinde
 * aynı quiz'i görmeli. Örnek zaten açılışta saklanıyor (asıl garanti o), ama
 * seçim de deterministik olunca sınanabiliyor ve bir kayıt kaybında aynı quiz
 * yeniden kuruluyor.
 */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededOrder<T>(arr: T[], seed: string): T[] {
  return arr
    .map((v, i) => ({ v, k: hash(`${seed}:${i}`) }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.v);
}

export type SelectOpts = {
  /**
   * Öğrencinin geçmiş quizlerde KAÇIRDIĞI hedefler.
   *
   * Seçim bunlara ağırlık veriyor: aynı bloktan iki madde varsa, öğrencinin
   * daha önce yanlış yaptığı hedefi yoklayan seçiliyor. Uyarlamanın çekirdeği
   * bu — quiz her hafta biraz daha öğrencinin zayıf olduğu yere bakıyor.
   */
  missedTargets?: readonly string[];
  /** Deterministik sıra için tohum; kullanıcı + hafta öneriliyor. */
  seed: string;
};

/**
 * Haftanın havuzundan blueprint'e göre madde seçer.
 *
 * Sıra bloklara göre: önce tanıma (okuma/dinleme), sonra biçim (dilbilgisi),
 * sonra anlam (kelime). Zorluk eğrisi bilerek bu yönde — quiz'e tanıdık bir
 * şeyle başlamak, sınav kaygısını azaltan en ucuz karar.
 */
export function selectItems(week: QuizWeek, opts: SelectOpts): QuizItem[] {
  const missed = new Set(opts.missedTargets ?? []);
  const out: QuizItem[] = [];

  for (const [block, need] of Object.entries(QUIZ_PLAN) as [keyof typeof QUIZ_PLAN, number][]) {
    const pool = week.items.filter((i) => i.block === block);
    /* Önce kaçırılan hedefi yoklayanlar, sonra ötekiler; her grup kendi
       içinde tohumlu sırada. `sort` kararlı olmadığı için gruplama ayrı
       yapılıyor — aynı girdi her koşuda aynı çıktıyı vermeli. */
    const ordered = seededOrder(pool, `${opts.seed}:${block}`);
    const hot = ordered.filter((i) => i.targets.some((t) => missed.has(t)));
    const rest = ordered.filter((i) => !i.targets.some((t) => missed.has(t)));
    out.push(...[...hot, ...rest].slice(0, need));
  }

  return out;
}

/* ── Kişisel blok ─────────────────────────────────────────────────────── */

/** Kişisel madde için gereken sözcük — çağıran SRS'ten getiriyor. */
export type PersonalWord = {
  wordId: number;
  /** Hedef dildeki biçim (şık olarak görünür). */
  term: string;
  /** Anadildeki karşılığı (soru kökü olarak görünür). */
  gloss: string;
};

/**
 * Öğrencinin kendi tekrar kuyruğundan üretilen madde.
 *
 * NEDEN ÜRETİLİYOR, YAZILMIYOR. Bu bloğun bütün değeri kişiye özel olmasında:
 * yazılı bir havuzdan gelemez, çünkü hangi sözcüğün sorulacağını öğrencinin
 * kendi geçmişi belirliyor. Yazılı bloklarla aynı biçimde (şıklı, tek doğru)
 * üretiliyor ki aynı puanlayıcıdan geçebilsin — sunucu puanlamasının dışında
 * kalan tek bir madde, bütün kurguyu delerdi.
 *
 * Çeldiriciler öğrencinin KENDİ havuzundan geliyor: rastgele sözcükler yerine
 * gerçekten karıştırılabilecek, aynı seviyeden sözcükler.
 */
export function personalItem(
  target: PersonalWord,
  distractors: readonly PersonalWord[],
  seed: string,
): QuizItem | null {
  const picks = seededOrder(
    distractors.filter((d) => d.wordId !== target.wordId && d.term !== target.term),
    `${seed}:d`,
  ).slice(0, 3);
  if (picks.length < 2) return null; // iki çeldirici bulunamadıysa madde kurulmaz

  const options = seededOrder([target, ...picks], `${seed}:o`).map((w) => w.term);
  return {
    id: `personal-${target.wordId}`,
    block: "personal",
    stem: target.gloss,
    options,
    answer: options.indexOf(target.term),
    why: "Bu sözcük senin kendi tekrar listenden geldi — quiz onu yeni bir bağlamda bir kez daha yokluyor.",
    targets: [`personal.word.${target.wordId}`],
  };
}

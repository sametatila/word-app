import "server-only";
import { and, desc, eq, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { reviews, words } from "@/lib/db/schema";
import { CONFUSION_GAMES, confusionKind, errorLabel, ERROR_TARGET_GAME, isErrorType, type ErrorType } from "@/lib/errors";
import { GAME_LABEL_KEYS, type GameId } from "@/lib/types";
import { weakRules } from "@/lib/conversations/progress";
import { DEFAULT_NATIVE, translate, type NativeLang } from "@/lib/i18n/dict";
import { glossFor } from "@/lib/option-label";

/**
 * Hata analitiği (plan WP-51) — "zayıf noktaların".
 *
 * WP-02 her yanlışa tip ve ayrıntı yazıyordu; burası onları okur:
 *   1. Son 30 günün hata tipi dağılımı (pay ve sayı).
 *   2. Karıştırma çiftleri: "anlam" hatasında hangi kelime hangi karşılıkla
 *      karıştırıldı (`reviews.detail` = seçilen şık / yazılan kelime).
 *   3. Zayıf kurallar: konuşmalar (`weakRules`).
 * Her hata tipine tek dokunuşla hedefli çalışma: o tipin oyunuyla tek oyunlu
 * tur (`/learn?game=…`). WP-11 drill motoru geldiğinde dilbilgisi tipleri
 * drill'e yönlenir.
 */

export type ErrorShare = {
  type: ErrorType;
  label: string;
  n: number;
  /** Bütün yanlışlar içindeki pay, 0–100. */
  pct: number;
  /** Hedefli çalışma. */
  href: string | null;
  gameLabel: string | null;
};

export type ConfusionPair = {
  wordId: number;
  de: string;
  artikel: string | null;
  /** Türkçe karşılık — kurulu eski istemciler bunu okuyor, kalıyor. */
  tr: string;
  /** Kelimenin ÖĞRENCİNİN ANADİLİNDEKİ karşılığı (Türkçe okurda `tr` ile aynı). */
  gloss: string;
  /** Karıştırıldığı karşılık / yazılan. */
  with: string;
  n: number;
};

export type ErrorReport = {
  days: number;
  totalWrong: number;
  types: ErrorShare[];
  confusions: ConfusionPair[];
  weakRules: string[];
};

/** Yazılan ayrıntının başındaki artikel: sözlükte kelime artikelsiz duruyor. */
const ARTICLE_PREFIX = /^(?:der|die|das|den|dem|des|ein|eine|einen|einem|einer|the|a|an|to)\s+/i;

export async function errorReport(
  userId: string,
  course: string,
  days = 30,
  lang: NativeLang = DEFAULT_NATIVE,
): Promise<ErrorReport> {
  const since = new Date(Date.now() - days * 86400000);
  const rows = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, since)))
    .groupBy(reviews.errorType)
    .orderBy(desc(sql`count(*)`));
  const totalWrong = rows.reduce((a, r) => a + r.n, 0);
  const types: ErrorShare[] = rows
    .filter((r): r is { type: ErrorType; n: number } => isErrorType(r.type))
    .map((r) => {
      const game = ERROR_TARGET_GAME[r.type] ?? null;
      return {
        type: r.type,
        label: errorLabel(r.type, lang),
        n: r.n,
        pct: totalWrong ? Math.round((100 * r.n) / totalWrong) : 0,
        href: game ? `/learn/game?game=${game}` : null,
        // Etiket ÇEVRİLİYOR: `label` gibi bu da doğrudan ekrana gidiyor ve
        // ham anahtar olarak dönerse arayüzde "games.article_race" yazıyordu.
        gameLabel: game ? translate(lang, GAME_LABEL_KEYS[game as GameId]) : null,
      };
    });

  /*
    KARŞILIK ANADİLDE. Yalnız `words.tr` okunuyor ve cevap Türkçeyle
    karşılaştırılıyordu: anadili İngilizce/Almanca olan öğrencinin seçtiği şık
    (kendi dilinde) Türkçe karşılıkla hiç eşleşmediği için doğru cevabın aynısı
    bile "karıştırma" sayılıyor, ekranda da Türkçe anlam görünüyordu. Karşılık
    tur oyunlarıyla aynı çözücüden (`glossFor`); yeni alan `gloss`, `tr`
    geriye uyum için duruyor.
  */
  const conf = await db
    .select({
      wordId: reviews.wordId,
      game: reviews.game,
      detail: reviews.detail,
      n: sql<number>`count(*)::int`,
      de: words.de,
      artikel: words.artikel,
      tr: words.tr,
      en: words.en,
      deGloss: words.deGloss,
    })
    .from(reviews)
    .innerJoin(words, eq(words.id, reviews.wordId))
    .where(
      and(
        eq(reviews.userId, userId),
        eq(reviews.correct, false),
        eq(reviews.errorType, "meaning"),
        isNotNull(reviews.detail),
        inArray(reviews.game, CONFUSION_GAMES),
        gte(reviews.createdAt, since),
      ),
    )
    .groupBy(reviews.wordId, reviews.game, reviews.detail, words.de, words.artikel, words.tr, words.en, words.deGloss)
    .orderBy(desc(sql`count(*)`))
    .limit(60);
  const locale = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US";
  /*
    YALNIZ İKİ KELİME ARASINDAKİ KARIŞTIRMA (QA F-0059). "hallo = merhaba, x
    değil", "das Land = ülke, Hallo, wie geht's? değil" çıkıyordu: çeviri
    turunun cümlesi ve yazılan anlamsız harfler de çift sayılıyordu. Ölçü
    `confusionKind` (kayıtla aynı); yazılan ayrıntı ayrıca SÖZLÜKTE olmalı
    (artikelsiz, büyük/küçük harf farkı yok) — "x", "jfjf" kelime değil. Eski
    kayıtlar okurken süzülüyor, silinmiyor. Aynı çift iki oyundan gelirse
    sayıları toplanıyor.
  */
  const bare = (d: string) => d.trim().replace(ARTICLE_PREFIX, "").toLocaleLowerCase("de-DE");
  const typed = [...new Set(conf.filter((c) => confusionKind(c.game, c.detail) === "typed").map((c) => bare(c.detail!)))];
  const known = new Set(
    typed.length
      ? (await db.select({ de: sql<string>`lower(${words.de})` }).from(words).where(inArray(sql`lower(${words.de})`, typed))).map((r) => r.de)
      : [],
  );
  const merged = new Map<string, ConfusionPair>();
  for (const c of conf) {
    const kind = confusionKind(c.game, c.detail);
    if (!kind || (kind === "typed" && !known.has(bare(c.detail!)))) continue;
    const gloss = glossFor(c, lang)?.text ?? c.tr;
    const detail = c.detail!.replace(/\s+/g, " ").trim();
    if (detail.toLocaleLowerCase(locale) === gloss.toLocaleLowerCase(locale)) continue;
    if (bare(detail) === c.de.toLocaleLowerCase("de-DE")) continue;
    const key = `${c.wordId}\u0000${detail.toLocaleLowerCase(locale)}`;
    const prev = merged.get(key);
    if (prev) prev.n += c.n;
    else merged.set(key, { wordId: c.wordId, de: c.de, artikel: c.artikel, tr: c.tr, gloss, with: detail, n: c.n });
  }
  const confusions = [...merged.values()].sort((a, b) => b.n - a.n).slice(0, 8);

  let rules: string[] = [];
  try {
    rules = await weakRules(userId, 3);
  } catch {
    rules = [];
  }
  void course;
  return { days, totalWrong, types, confusions, weakRules: rules };
}

/**
 * Son 14 günde ≥ 5 kez görülen hata tipleri — SRS ağırlığı için (WP-51).
 * `submitAnswers` bu kümeyi okur: kelimenin son yanlışı bu tiplerden biriyse
 * aralık ×0,75 (yoksa `ERROR_SRS_WEIGHT` varsayılanı).
 */
export const FREQUENT_ERROR_DAYS = 14;
export const FREQUENT_ERROR_MIN = 5;
export const FREQUENT_ERROR_WEIGHT = 0.75;

export async function frequentErrorTypes(userId: string): Promise<Set<ErrorType>> {
  const since = new Date(Date.now() - FREQUENT_ERROR_DAYS * 86400000);
  const rows = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, since)))
    .groupBy(reviews.errorType);
  const out = new Set<ErrorType>();
  for (const r of rows) if (isErrorType(r.type) && r.n >= FREQUENT_ERROR_MIN) out.add(r.type);
  return out;
}

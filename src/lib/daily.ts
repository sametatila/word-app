import "server-only";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyScores, profiles, words } from "@/lib/db/schema";
import { firstExample } from "@/lib/example";
import { pluralChoices } from "@/lib/german";
import type { GameId, Option, Round, RoundWord } from "@/lib/types";

/**
 * Günün ortak turu.
 *
 * Uygulamadaki her tur kişiye özeldi ve bunun bir bedeli vardı: iki kişinin
 * sonucu karşılaştırılamıyordu. Paylaşılabilir bir sonuç ekranı bile
 * karşısındakine "iyi mi kötü mü" sorusunun cevabını vermiyordu, çünkü herkes
 * başka kelimelerle oynuyordu.
 *
 * Burada aynı kurs ve seviyedeki herkes **aynı kelimeleri aynı sırayla** ve
 * aynı oyunlarla görüyor. Bunun tek yolu turun rastgele değil, günden
 * TÜRETİLMİŞ olması: aynı gün + aynı seviye her zaman aynı turu üretir,
 * hiçbir yerde saklanmasına gerek kalmaz.
 */

const ROUNDS = 20;

/**
 * Tohumlu rastgelelik (mulberry32).
 *
 * `Math.random()` kullanılamaz: tur sunucuda her istekte yeniden üretiliyor ve
 * iki kullanıcının — hatta aynı kullanıcının iki isteğinin — aynı turu görmesi
 * ancak üretim deterministikse mümkün.
 */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Gün + kurs + seviye → sayısal tohum. */
function seedOf(day: string, course: string, level: string): number {
  const key = `${day}|${course}|${level}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffleSeeded<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function toRoundWord(w: typeof words.$inferSelect): RoundWord {
  return {
    id: w.id,
    de: w.de,
    artikel: w.artikel,
    tr: w.tr,
    en: w.en,
    typ: w.typ,
    niveau: w.niveau,
    formen: w.formen,
    beispiel: w.beispiel,
    beispielTr: w.beispielTr,
    beispielEn: w.beispielEn,
    isNew: false,
  };
}

/**
 * Günün turunu kurar. Kullanıcıdan bağımsız — yalnızca gün, kurs ve seviyeye
 * bakar, bu yüzden aynı gruptaki herkes aynı turu alır.
 *
 * Tanıtım kartı yok ve olmamalı: bu bir öğrenme turu değil, bir ölçüm turu.
 * Kelimeler seviyenin en yaygın 300 kelimesinden seçiliyor — herkesin
 * karşılaşmış olma ihtimali en yüksek olanlar.
 */
export async function buildDailyRounds(
  course: string,
  level: string,
  day: string,
): Promise<Round[]> {
  const rand = rng(seedOf(day, course, level));

  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, course), eq(words.niveau, level)))
    .orderBy(asc(sql`coalesce(${words.rank}, 999999)`), asc(words.id))
    .limit(300);

  if (pool.length < 8) return [];

  const picked = shuffleSeeded(pool, rand).slice(0, ROUNDS);
  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `d${++seq}`;

  for (const w of picked) {
    const word = toRoundWord(w);
    // Kelimeye hangi oyunların kurulabileceği kelimenin kendisine bağlı
    // (artikel yalnızca isimde, cümle oyunları örnek cümlesi olanda). Uygun
    // olanlar arasından seçim yine tohumdan geliyor.
    const options = playableFor(word);
    const game = options[Math.floor(rand() * options.length)];
    const round = makeDailyRound(game, word, pool, nextId, rand);
    if (round) rounds.push(round);
  }

  return rounds;
}

/** Bu kelimeyle kurulabilecek oyunlar. */
function playableFor(word: RoundWord): GameId[] {
  const list: GameId[] = ["choice", "listen", "truefalse"];
  if (word.artikel) list.push("artikel");
  if (word.beispiel && firstExample(word.beispiel)) list.push("cloze");
  if (word.de.length >= 3 && word.de.length <= 12) list.push("scramble");
  if (word.artikel && word.formen) list.push("plural");
  return list;
}

/**
 * Turu kurar. `session.ts`'teki `makeRound` yeniden kullanılamıyor çünkü orası
 * `Math.random()` ile çalışıyor; buradaki her karar tohumdan gelmek zorunda.
 */
function makeDailyRound(
  game: GameId,
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  nextId: () => string,
  rand: () => number,
): Round | null {
  switch (game) {
    case "choice": {
      const direction = rand() < 0.35 ? "tr-de" : "de-tr";
      return {
        id: nextId(),
        game: "choice",
        word,
        options: seededOptions(word, pool, direction, rand),
        direction,
      };
    }
    case "artikel":
      return word.artikel ? { id: nextId(), game: "artikel", word } : null;
    case "listen":
      return { id: nextId(), game: "listen", word, options: seededOptions(word, pool, "de-tr", rand) };
    case "truefalse": {
      const isTrue = rand() < 0.5;
      if (isTrue)
        return {
          id: nextId(),
          game: "truefalse",
          word,
          claim: { text: word.tr, sub: word.en },
          isTrue: true,
        };
      const others = pool.filter((p) => p.id !== word.id && p.tr !== word.tr);
      if (!others.length) return null;
      const wrong = others[Math.floor(rand() * others.length)];
      return {
        id: nextId(),
        game: "truefalse",
        word,
        claim: { text: wrong.tr, sub: wrong.en },
        isTrue: false,
      };
    }
    case "scramble":
      return { id: nextId(), game: "scramble", word };
    case "cloze": {
      const ex = word.beispiel ? firstExample(word.beispiel) : null;
      if (!ex) return null;
      const blanked = blank(ex, word.de);
      if (!blanked) return null;
      // Çeldiriciler havuzdan, yine tohumla: boşluğa dört aday konuyor.
      const wrong = shuffleSeeded(
        [...new Set(pool.filter((p) => p.id !== word.id).map((p) => p.de))],
        rand,
      ).slice(0, 3);
      return {
        id: nextId(),
        game: "cloze",
        word,
        sentence: blanked.sentence,
        sentenceTr: word.beispielTr,
        sentenceEn: word.beispielEn,
        answer: blanked.answer,
        options: shuffleSeeded([blanked.answer, ...wrong], rand),
      };
    }
    case "plural": {
      const choices = pluralChoices(word.de, word.formen ?? "", 4, rand);
      if (!choices) return null;
      return {
        id: nextId(),
        game: "plural",
        word,
        answer: choices.answer,
        options: shuffleSeeded([choices.answer, ...choices.distractors], rand),
      };
    }
    default:
      return null;
  }
}

/** Çeldiriciler de tohumdan: herkesin şıkları aynı olmalı. */
function seededOptions(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  direction: "de-tr" | "tr-de",
  rand: () => number,
): Option[] {
  // Anlam sorulan yönde şık iki dillidir; Almanca sorulan yönde ikinci satır
  // yoktur — orada sorulan şey anlam değil, kelimenin kendisi.
  const label = (p: { de: string; tr: string; en: string | null }): Option =>
    direction === "de-tr" ? { text: p.tr, sub: p.en } : { text: p.de, sub: null };
  const correct = label(word);
  const seen = new Set([correct.text]);
  const distractors: Option[] = [];
  for (const p of pool) {
    if (p.id === word.id) continue;
    const option = label(p);
    if (!option.text || seen.has(option.text)) continue;
    seen.add(option.text);
    distractors.push(option);
  }
  return shuffleSeeded([correct, ...shuffleSeeded(distractors, rand).slice(0, 3)], rand);
}

/** Cümledeki hedef kelimeyi boşluğa çevirir. */
function blank(sentence: string, de: string): { sentence: string; answer: string } | null {
  const stem = de.replace(/\(.*?\)/g, "").trim().split(/\s+/)[0];
  if (stem.length < 3) return null;
  const re = new RegExp(`\\b${stem.slice(0, Math.max(3, stem.length - 2))}\\w*`, "i");
  const m = sentence.match(re);
  if (!m) return null;
  return { sentence: sentence.replace(re, "_____"), answer: m[0] };
}

export type DailyBoardRow = {
  rank: number;
  name: string | null;
  score: number;
  correct: number;
  total: number;
  isMe: boolean;
};

/** Günün tablosu: aynı kurs ve seviyede oynayanlar. */
export async function dailyBoard(
  userId: string,
  day: string,
  course: string,
  level: string,
  limit = 10,
): Promise<DailyBoardRow[]> {
  const rows = await db
    .select({
      userId: dailyScores.userId,
      name: profiles.displayName,
      score: dailyScores.score,
      correct: dailyScores.correct,
      total: dailyScores.total,
    })
    .from(dailyScores)
    .innerJoin(profiles, eq(profiles.userId, dailyScores.userId))
    .where(
      and(
        eq(dailyScores.day, day),
        eq(dailyScores.course, course),
        eq(dailyScores.level, level),
      ),
    )
    .orderBy(desc(dailyScores.score), asc(dailyScores.seconds))
    .limit(limit);

  return rows.map((r, i) => ({
    rank: i + 1,
    name: r.name,
    score: r.score,
    correct: r.correct,
    total: r.total,
    isMe: r.userId === userId,
  }));
}

/** Kullanıcının bugünkü sonucu — varsa tur yeniden oynanamaz. */
export async function todaysResult(userId: string, day: string) {
  const [row] = await db
    .select()
    .from(dailyScores)
    .where(and(eq(dailyScores.userId, userId), eq(dailyScores.day, day)))
    .limit(1);
  return row ?? null;
}

/**
 * Sonucu kaydeder. İkinci kayıt sessizce yok sayılır — tek hak kuralı burada,
 * arayüzde değil: arayüz atlansa bile ikinci bir skor tabloya giremez.
 */
export async function saveDailyResult(input: {
  userId: string;
  day: string;
  course: string;
  level: string;
  score: number;
  correct: number;
  total: number;
  bestCombo: number;
  seconds: number;
}): Promise<{ saved: boolean }> {
  const res = await db
    .insert(dailyScores)
    .values(input)
    .onConflictDoNothing({ target: [dailyScores.userId, dailyScores.day] })
    .returning({ userId: dailyScores.userId });
  return { saved: res.length > 0 };
}

import "server-only";
import { and, asc, desc, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { placements, profiles, words } from "@/lib/db/schema";
import { CHEAT_ITEMS } from "@/lib/cheatsheet/items";
import { BUNDLED_EXERCISES } from "@/lib/skills/bundled";
import type { CefrLevel } from "@/lib/skills/types";
import { track } from "@/lib/events";
import { scorePlacement, type PlacementAnswer, type PlacementResult } from "@/lib/placement-score";

/**
 * Yerleştirme testi — madde bankası ve kayıt (plan WP-40).
 *
 * Maddeler mevcut içerikten çekilir, yeni içerik yazılmaz:
 *   kelime     — seviyenin en yaygın 60 kelimesinden 6'sı (rank), Türkçe
 *                anlam şıklı; çeldiriciler aynı seviyeden.
 *   dilbilgisi — dilbilgisi sayfalarının tablo hücreleri (`CHEAT_ITEMS`),
 *                seviye başına 3 madde, kardeş hücreler çeldirici.
 *   okuma      — A2 ve B1'den birer okuma egzersizi, ilk 3 soru.
 *   dinleme    — A2 ve B1'den birer dinleme egzersizi, ilk 2 bölüm + 3 soru.
 *
 * Kelime ve dilbilgisi uyarlanabilir (istemci seviye seviye ilerler,
 * `nextLevel`); okuma/dinleme sabit iki metin. Toplam ≤ 15 dakika: en çok
 * 24 kelime + 12 dilbilgisi + 6 + 6 soru.
 *
 * Doğru cevaplar istemciye GİDER (test bir sınav değil, kendini ölçme;
 * kopya çekmenin kimseye faydası yok) — puanlama yine sunucuda, gelen
 * `correct` işaretleri madde kimliğiyle doğrulanır.
 */

export type VocabItem = { id: string; level: CefrLevel; de: string; artikel: string | null; options: string[]; answer: number };
export type GrammarItem = { id: string; level: CefrLevel; sheet: string; key: string; label: string; options: string[]; answer: number };
export type TextItem = {
  id: string;
  level: CefrLevel;
  title: string;
  /** Okuma: metin; dinleme: okunacak bölümler. */
  text?: string;
  segments?: { speaker?: string; text: string }[];
  questions: { text: string; options: string[]; answer: number }[];
};

export type PlacementTest = {
  vocab: Record<CefrLevel, VocabItem[]>;
  grammar: Record<CefrLevel, GrammarItem[]>;
  reading: TextItem[];
  listening: TextItem[];
};

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
const VOCAB_PER_LEVEL = 6;
const GRAMMAR_PER_LEVEL = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function buildPlacement(course: string): Promise<PlacementTest> {
  const vocab = {} as PlacementTest["vocab"];
  const grammar = {} as PlacementTest["grammar"];
  for (const level of LEVELS) {
    const rows = await db
      .select({ id: words.id, de: words.de, artikel: words.artikel, tr: words.tr, en: words.en })
      .from(words)
      .where(and(eq(words.course, course), eq(words.niveau, level), isNotNull(words.rank)))
      .orderBy(sql`${words.rank} asc nulls last`, asc(words.id))
      .limit(60);
    const picked = shuffle(rows).slice(0, VOCAB_PER_LEVEL);
    vocab[level] = picked.map((w) => {
      const distractors = shuffle(rows.filter((r) => r.id !== w.id && r.tr !== w.tr)).slice(0, 3).map((r) => r.tr);
      const options = shuffle([w.tr, ...distractors]);
      return { id: `v${w.id}`, level, de: w.de, artikel: w.artikel, options, answer: options.indexOf(w.tr) };
    });

    const items = CHEAT_ITEMS.filter((it) => it.level === level && it.siblings.length >= 3 && !it.speak);
    grammar[level] = shuffle(items)
      .slice(0, GRAMMAR_PER_LEVEL)
      .map((it) => {
        const options = shuffle([it.answer, ...shuffle(it.siblings.filter((s) => s !== it.answer)).slice(0, 3)]);
        return { id: `g:${it.id}`, level, sheet: it.sheetTitle, key: it.key, label: it.label, options, answer: options.indexOf(it.answer) };
      });
  }

  const pool = BUNDLED_EXERCISES.filter((e) => (e.course ?? "de") === (course === "gsw-zh" ? "gsw-zh" : "de"));
  const textFor = (skill: "reading" | "listening", level: CefrLevel): TextItem | null => {
    const list = pool.filter((e) => e.skill === skill && e.level === level);
    const ex = shuffle(list)[0];
    if (!ex) return null;
    const questions = ("questions" in ex ? ex.questions : []).slice(0, 3).map((q) => ({ text: q.text, options: q.options, answer: q.answer }));
    if (!questions.length) return null;
    return {
      id: `${skill[0]}:${ex.id}`,
      level,
      title: ex.title,
      text: ex.skill === "reading" ? ex.text : undefined,
      segments: ex.skill === "listening" ? ex.segments.slice(0, 2).map((s) => ({ speaker: s.speaker, text: s.text })) : undefined,
      questions,
    };
  };
  const reading = (["A2", "B1"] as CefrLevel[]).map((l) => textFor("reading", l)).filter((x): x is TextItem => x !== null);
  const listening = (["A2", "B1"] as CefrLevel[]).map((l) => textFor("listening", l)).filter((x): x is TextItem => x !== null);
  return { vocab, grammar, reading, listening };
}

export type PlacementRecord = {
  id: number;
  at: string;
  suggested: CefrLevel;
  accepted: CefrLevel | null;
  perSkill: PlacementResult["perSkill"];
  score: number;
};

/** Sonucu hesaplar ve kaydeder; `placement_finish` olayı (kind = önerilen seviye, value = doğru %). */
export async function finishPlacement(userId: string, answers: PlacementAnswer[], day: string): Promise<PlacementRecord> {
  const result = scorePlacement(answers);
  const [row] = await db
    .insert(placements)
    .values({ userId, suggested: result.suggested, accepted: null, perSkill: result.perSkill, answers, score: result.score })
    .returning({ id: placements.id, at: placements.at });
  await track(userId, "placement_finish", day, result.score, result.suggested);
  return { id: row.id, at: row.at.toISOString(), suggested: result.suggested, accepted: null, perSkill: result.perSkill, score: result.score };
}

/** Kullanıcı öneriyi (ya da kendi seçtiği seviyeyi) kabul eder: profil seviyesi güncellenir. */
export async function acceptPlacement(userId: string, id: number, level: CefrLevel): Promise<boolean> {
  const rows = await db
    .update(placements)
    .set({ accepted: level })
    .where(and(eq(placements.userId, userId), eq(placements.id, id)))
    .returning({ id: placements.id });
  if (!rows.length) return false;
  await db.update(profiles).set({ level }).where(eq(profiles.userId, userId));
  return true;
}

export async function lastPlacement(userId: string): Promise<PlacementRecord | null> {
  const [row] = await db.select().from(placements).where(eq(placements.userId, userId)).orderBy(desc(placements.at)).limit(1);
  if (!row) return null;
  return {
    id: row.id,
    at: row.at.toISOString(),
    suggested: row.suggested as CefrLevel,
    accepted: (row.accepted as CefrLevel | null) ?? null,
    perSkill: row.perSkill as PlacementResult["perSkill"],
    score: row.score,
  };
}

/** Yeniden alma sıklığı: 30 gün. Sık tekrar seviye tahminini "ezber"e çevirir. */
export const RETAKE_DAYS = 30;

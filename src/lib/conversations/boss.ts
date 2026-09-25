import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { practiceWordsOf } from "@/lib/practice-words";
import { moduleClears, words } from "@/lib/db/schema";
import { ensureProfile, makeRound, toRoundWord } from "@/lib/session";
import { conversationsForLevel } from "./index";
import { conversationBoard } from "./progress";
import { MODULE_SIZE, moduleTheme } from "./modules";
import { moduleContent } from "./module-content";
import type { Round } from "@/lib/types";
import { nativeOf } from "@/lib/courses";
import { hasGloss } from "@/lib/option-label";

/**
 * Modül sınavı — ders yolunun patron turu.
 *
 * Yol on derslik modüllere bölünmüştü ama modülün bitişi yalnızca bir
 * pankarttaki kupaydı: on ders bitince hiçbir şey OLMUYORDU. Sınav o boşluğu
 * dolduruyor ve iki şeyi birden yapıyor — modülün kelimelerini bir arada,
 * baskı altında kullandırıyor; ve yola bir varış noktası koyuyor.
 *
 * Hayatta kalma turundan farkı bir kaybetme koşulu olması. Hayatta kalma
 * turunda amaç puanı büyütmek, bir "kayıp" yok; sınavda ise on beş turu süre
 * bitmeden bitirmek zorundasın. Patron turu tam olarak budur: yenilebilir bir
 * şey.
 *
 * Kelimeler ders içeriğinden geliyor ama sorular kelime tablosundan
 * kuruluyor: ders `vocab`'ı yalnızca "das Frühstück / kahvaltı" ikilisi, oysa
 * oyunların artikele, çoğula ve örnek cümleye ihtiyacı var. İkisi başlıktan
 * eşleştiriliyor; eşleşme oranı modül başına %64–98 (ortalama ~%86), yani her
 * modülde 32–49 kelime kalıyor — on beş tur için fazlasıyla yeterli.
 */

/** Sınavdaki tur sayısı. */
export const BOSS_ROUNDS = 15;
/* Başlangıç süresi istemciye de iniyor: bkz. `lib/conversations/boss-const`. */
export { BOSS_SECONDS } from "@/lib/conversations/boss-const";
/** Doğru cevabın kazandırdığı süre. */
export const BOSS_BONUS = 3;
/** Yanlışın yaktığı süre. */
export const BOSS_PENALTY = 5;
/** Süre tavanı — sınav sonsuza uzamasın. */
export const BOSS_MAX_SECONDS = 90;

/** Sınav kurulabilmesi için gereken en az kelime. */
const MIN_WORDS = 8;

export type BossMeta = {
  level: string;
  moduleIndex: number;
  title: string;
  /** Modülün on dersinden kaçı bitmiş — sınav bunu bekliyor ama zorlamıyor. */
  conversationsDone: number;
  conversationsTotal: number;
  /** Daha önce geçildiyse kalan en iyi süre. */
  bestLeft: number | null;
};

export type BossPayload = { meta: BossMeta; rounds: Round[]; pool: number };

/**
 * Modülün derslerindeki kelimeler — tekrarsız, ders sırasıyla, artikelsiz.
 *
 * Türetme `module-content.ts`'te: aynı liste modül sınavının kelime bölümünü
 * de besliyor ve iki yerde ayrı ayrı hesaplanması, birinde artikel kırpma
 * kuralı değişince ikisinin sessizce ayrışması demekti.
 */
export async function moduleVocab(course: string, level: string, moduleIndex: number): Promise<string[]> {
  return (await moduleContent(course, level, moduleIndex)).words.map((w) => w.head);
}

export async function buildModuleBoss(
  userId: string,
  level: string,
  moduleIndex: number,
): Promise<BossPayload> {
  const profile = await ensureProfile(userId);
  const course = profile.course;
  const native = nativeOf(profile.nativeLang);

  const inLevel = (await conversationsForLevel(course, level)).filter((l) => l.course === course);
  const chunk = inLevel.slice(moduleIndex * MODULE_SIZE, (moduleIndex + 1) * MODULE_SIZE);

  const [clear] = await db
    .select()
    .from(moduleClears)
    .where(
      and(
        eq(moduleClears.userId, userId),
        eq(moduleClears.course, course),
        eq(moduleClears.level, level),
        eq(moduleClears.moduleIndex, moduleIndex),
      ),
    )
    .limit(1);

  // Modülün kaç dersi bitmiş. Sınav bunu ZORLAMIYOR — yol haritasındaki
  // kilitler de engellemiyor, görsel bir sıralama iması taşıyor. Sayı yalnızca
  // hazır olmadan girene ne beklediğini söylemek için.
  const board = await conversationBoard(userId, course);
  const done = new Set(
    board.filter((c) => c.state?.chatDone).map((c) => c.conversation.id),
  );

  const meta: BossMeta = {
    level,
    moduleIndex,
    title: moduleTheme(course, level, moduleIndex, native),
    conversationsDone: chunk.filter((l) => done.has(l.id)).length,
    conversationsTotal: chunk.length,
    bestLeft: clear?.bestLeft ?? null,
  };

  const heads = await moduleVocab(course, level, moduleIndex);
  if (!heads.length) return { meta, rounds: [], pool: 0 };

  // Modülün kelimeleri. Eşleşmeyen madde sessizce düşüyor: ders içeriği ile
  // kelime listesi ayrı kaynaklar ve birebir örtüşmeleri beklenmiyor.
  /* ANADİLDE KARŞILIĞI OLAN kelimeler — soru olarak da, şık olarak da. Kelime
     turlarının kuralının aynısı (`hasGloss`): süzülmeseydi karşılığı olmayan
     kelimenin çoktan seçmelisi boş şıkla, doğru/yanlış turu hiç kurulmadan
     gelir; çeldirici havuzunda ise boş şık görünürdü. */
  const rows = (
    await db
      .select()
      .from(words)
      .where(
        and(
          practiceWordsOf(course),
          inArray(sql`lower(${words.de})`, heads),
        ),
      )
  ).filter((w) => hasGloss(w, native));

  if (rows.length < MIN_WORDS) return { meta, rounds: [], pool: rows.length };

  // Çeldirici havuzu: aynı seviyeden geniş bir küme. Modülün kendi kelimeleri
  // çeldirici olarak yetmez — on beş turda hepsi şıklarda görünür ve sorular
  // birbirini ele verirdi.
  const pool = (
    await db
      .select()
      .from(words)
      .where(and(practiceWordsOf(course), eq(words.niveau, level)))
      .orderBy(sql`random()`)
      .limit(140)
  ).filter((w) => hasGloss(w, native));

  const distractors = pool.length >= 8 ? pool : rows;

  /**
   * Oyun sırası.
   *
   * Sıra sabit ve dönüşümlü: rastgele seçim on beş turda aynı oyunu üst üste
   * getirebiliyor ve sınav tekdüzeleşiyor. Üretim oyunları (yazma, harf
   * bulmacası) araya serpiştirilmiş — sınav tanımayı değil kullanmayı
   * ölçmeli.
   */
  const order: Round["game"][] = [
    "choice",
    "artikel",
    "listen",
    "typing",
    "truefalse",
    "scramble",
    "choice",
    "cloze",
  ];

  const shuffled = [...rows].sort(() => Math.random() - 0.5);
  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `b${++seq}`;

  // Kelime sayısı tur sayısından azsa liste başa dönüyor: sınav on beş turdan
  // kısa olmamalı, yoksa "bitirdim" hissi tur sayısına göre değişirdi.
  for (let i = 0; rounds.length < BOSS_ROUNDS && i < BOSS_ROUNDS * 4; i++) {
    const word = shuffled[i % shuffled.length];
    const game = order[i % order.length];
    const round = makeRound(game, toRoundWord(word, false), distractors, nextId, "solid", native);
    if (round) rounds.push(round);
  }

  return { meta, rounds, pool: rows.length };
}

/**
 * Sınav sonucunu kaydeder.
 *
 * Yalnızca GEÇME yazılıyor. Kaybedilen deneme bir kayıt bırakmıyor çünkü
 * tutulan şey bir istatistik değil, yol haritasındaki taç: modül ya geçildi
 * ya geçilmedi. Denemeler sayılıyor ama yalnızca geçen kayıtta.
 */
export async function recordBossClear(
  userId: string,
  level: string,
  moduleIndex: number,
  secondsLeft: number,
): Promise<{ bestLeft: number; isRecord: boolean }> {
  const profile = await ensureProfile(userId);
  const left = Math.max(0, Math.min(BOSS_MAX_SECONDS, Math.round(secondsLeft)));

  const [existing] = await db
    .select()
    .from(moduleClears)
    .where(
      and(
        eq(moduleClears.userId, userId),
        eq(moduleClears.course, profile.course),
        eq(moduleClears.level, level),
        eq(moduleClears.moduleIndex, moduleIndex),
      ),
    )
    .limit(1);

  const isRecord = !existing || left > existing.bestLeft;

  await db
    .insert(moduleClears)
    .values({
      userId,
      course: profile.course,
      level,
      moduleIndex,
      bestLeft: left,
      attempts: 1,
    })
    .onConflictDoUpdate({
      target: [moduleClears.userId, moduleClears.course, moduleClears.level, moduleClears.moduleIndex],
      set: {
        bestLeft: sql`greatest(${moduleClears.bestLeft}, ${left})`,
        attempts: sql`${moduleClears.attempts} + 1`,
      },
    });

  return { bestLeft: Math.max(left, existing?.bestLeft ?? 0), isRecord };
}

/** Kullanıcının geçtiği modüller — yol haritası tacı buradan okuyor. */
export async function clearedModules(
  userId: string,
  course: string,
): Promise<Map<string, number>> {
  const rows = await db
    .select()
    .from(moduleClears)
    .where(and(eq(moduleClears.userId, userId), eq(moduleClears.course, course)));
  return new Map(rows.map((r) => [`${r.level}:${r.moduleIndex}`, r.bestLeft]));
}

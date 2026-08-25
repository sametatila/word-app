import type { CheatItem } from "./items";

/**
 * Çalışma turunun soru biçimleri.
 *
 * Kelime oyunlarının aynı ailesinden ve bilinçli olarak aynı adları taşıyor:
 * öğrenci "Doğru Anlam"ı zaten biliyor, dilbilgisi tarafında yeni bir arayüz
 * öğrenmesi gerekmiyor. Aradaki tek fark sorunun kaynağı — kelime yerine
 * tablo hücresi.
 */
export type CheatRound =
  | { kind: "choice"; item: CheatItem; options: string[] }
  | { kind: "truefalse"; item: CheatItem; shown: string; expected: boolean }
  | { kind: "scramble"; item: CheatItem; letters: string[] }
  | { kind: "typing"; item: CheatItem };

export const CHEAT_GAME_LABELS: Record<CheatRound["kind"], string> = {
  choice: "Doğru Biçim",
  truefalse: "Doğru mu Yanlış mı",
  scramble: "Harf Bulmacası",
  typing: "Yazarak Hatırla",
};

/** Maddenin bilinme durumu — soru biçimini bu belirliyor. */
export type ItemState = { reps: number; lapses: number };

function pick<T>(arr: T[], n: number, rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/** Tek kelimelik ve kısa cevaplar harf bulmacasına uygun. */
function scrambleable(answer: string): boolean {
  return !answer.includes(" ") && answer.length >= 3 && answer.length <= 12;
}

/**
 * Maddeye uygun soru biçimi.
 *
 * Sıra TANIMADAN ÜRETMEYE doğru gidiyor ve bu kelime tarafındaki ilkeyle aynı:
 * ilk karşılaşmada dört şıktan seçmek, cevabı hiç görmeden yazmaktan çok daha
 * öğretici. Yazma en sona bırakılıyor çünkü orada yanlış yapmanın bedeli
 * "bilmiyorum" değil "yazamadım" oluyor ve ikisi aynı şey değil.
 *
 * Takılan madde (lapses) geri çekiliyor: dört kez unutulmuş bir biçimi yazdırmak
 * öğrenciyi aynı duvara tekrar tekrar çarptırmak demek.
 */
function kindFor(item: CheatItem, state: ItemState, rnd: () => number): CheatRound["kind"] {
  const struggling = state.lapses >= 3;
  const reps = struggling ? Math.min(state.reps, 1) : state.reps;

  if (reps === 0) return "choice";
  if (reps === 1) return "truefalse";
  if (reps === 2) return scrambleable(item.answer) ? "scramble" : "choice";
  // Üçüncü tekrardan sonra yazma ile seçme dönüşümlü: her seferinde yazdırmak
  // uzun cevaplarda turu yorucu bir yazım alıştırmasına çeviriyordu.
  if (!scrambleable(item.answer) && item.answer.length > 24) return "choice";
  return rnd() < 0.65 ? "typing" : "choice";
}

/**
 * Çeldirici seçimi.
 *
 * Aynı SÜTUNDAN geliyor — yani "Perfekt" sorulduğunda şıkların hepsi Perfekt
 * biçimi. Farklı sütunlardan çekilseydi şıklar biçimlerinden ayırt edilirdi
 * ("hat …" olan tek şık doğrudur) ve soru dilbilgisini değil biçim tanımayı
 * ölçerdi.
 *
 * Uzunluğa göre sıralanıp yakınlar tercih ediliyor: dört harflik bir cevabın
 * yanında yirmi harflik bir şık, okumadan elenir.
 */
function distractors(item: CheatItem, n: number, rnd: () => number): string[] {
  const unique = [...new Set(item.siblings)];
  if (unique.length <= n) return unique;
  const near = unique
    .map((v) => ({ v, d: Math.abs(v.length - item.answer.length) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, Math.max(n * 3, 8))
    .map((x) => x.v);
  return pick(near, n, rnd);
}

/** Tek maddeden tur kurar. Çeldirici yoksa biçim kendiliğinden düşüyor. */
export function buildRound(
  item: CheatItem,
  state: ItemState,
  rnd: () => number = Math.random,
): CheatRound {
  let kind = kindFor(item, state, rnd);
  const pool = distractors(item, 3, rnd);

  // Çeldirici bulunamayan madde (tek satırlık tablo) seçmeli soruya uygun
  // değil: tek şıklı bir soru cevabı kendisi söyler.
  if ((kind === "choice" || kind === "truefalse") && pool.length === 0) {
    kind = scrambleable(item.answer) ? "scramble" : "typing";
  }

  if (kind === "choice") {
    const options = pick([item.answer, ...pool], pool.length + 1, rnd);
    return { kind, item, options };
  }
  if (kind === "truefalse") {
    const truthy = rnd() < 0.5;
    return {
      kind,
      item,
      shown: truthy ? item.answer : pool[0],
      expected: truthy,
    };
  }
  if (kind === "scramble") {
    return { kind, item, letters: pick([...item.answer], item.answer.length, rnd) };
  }
  return { kind, item };
}

/**
 * Cevap doğru mu.
 *
 * Yazma turunda büyük/küçük harf ve fazladan boşluk bağışlanıyor; umlaut
 * BAĞIŞLANMIYOR çünkü "schon" ile "schön" ayrı kelimeler ve bu tablolarda
 * sorulan şeyin kendisi çoğu zaman o harf. Almanca klavyesi olmayanlar için
 * ae/oe/ue/ss yazımı kabul ediliyor — bu, umlautu düşürmek değil, standart
 * karşılığını yazmak.
 */
export function accepts(answer: string, typed: string): boolean {
  return fold(typed) === fold(answer);
}

function fold(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");
}

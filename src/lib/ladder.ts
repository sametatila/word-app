import type { GameId, Round, RoundWord } from "@/lib/types";

/**
 * Oyun merdiveni: tanıma → üretim (plan WP-14).
 *
 * Kelimenin gücü hangi oyunların açık olduğunu belirler. Eskiden üretim
 * oyunları yalnız "oturmuş" kelimelerde açılıyordu ve ölçüm bunun ne demek
 * olduğunu gösterdi: yeni bir hesapta haftalarca yalnız şık seçiliyor,
 * üretim payı sıfıra yakın kalıyordu. Merdiven her basamağa bir üretim
 * dokunuşu koyar — yeni kelimede bile (ipuçlu yazma) — ve basamak çıktıkça
 * destek azalır: harf bulmacası → ipuçlu yazma → yazma → cümle diz →
 * cümle yaz.
 *
 * Bu modül SAF ve istemci-güvenli: sunucu tur kurarken (`session.ts`),
 * istemci oturum içinde basamak inerken (`easeRound`) ve rapor üretim payını
 * sayarken aynı listeye bakar. Üç ayrı liste olsaydı üçü de sessizce
 * birbirinden uzaklaşırdı.
 */

export type Strength = "fresh" | "shaky" | "solid" | "strong";

/**
 * Öğrenciden bir şey KURMASINI isteyen oyunlar; tanıma oyunlarında doğru
 * cevap zaten ekranda. KPI 2 (üretim oranı) buradan sayılır: production /
 * (production + recognition) ≥ %40 hedefi.
 */
export const PRODUCTION_GAMES: readonly GameId[] = ["typing", "scramble", "order", "translate", "speak"];

export function isProductionGame(game: string): boolean {
  return (PRODUCTION_GAMES as readonly string[]).includes(game);
}

/**
 * Basamağa göre aday oyunlar. Sıra rastgele karıştırılıp az çıkan öne alınır
 * (session.ts); burada yalnız KÜME ve kelimeye bağlı koşullar.
 *
 *   fresh  — tanıma + harf bulmacası + ipuçlu yazma (assist, composeRounds'ta ayrı)
 *   shaky  — tanıma ağırlıklı; harf bulmacası kalır (takılan kelimeyi yazdırmak yıldırır)
 *   solid  — tanıma + yazma + cümle diz + cümle yaz + yazarak tamamlama
 *   strong — üretim önde: cümle yaz, yazma, yazarak tamamlama; tanıma azınlık
 */
export function gamesFor(strength: Strength, word: Pick<RoundWord, "de" | "artikel">): Round["game"][] {
  const short = word.de.length <= 12;
  const c: Round["game"][] = [];
  if (strength === "fresh") {
    c.push("choice", "cloze", "listen", "truefalse");
    if (word.artikel) c.push("artikel");
    if (short) c.push("scramble");
  } else if (strength === "shaky") {
    c.push("choice", "cloze", "listen", "truefalse");
    if (word.artikel) c.push("artikel");
    if (short) c.push("scramble");
  } else if (strength === "solid") {
    c.push("choice", "cloze", "order", "listen", "truefalse", "translate");
    if (word.artikel) c.push("artikel", "plural");
    if (short) c.push("scramble");
    if (word.de.length <= 14) c.push("typing");
  } else {
    // Üretim önde ve ÇİFT yazılı: karıştırma sonrası öne çıkma olasılığı artar
    // (bkz. session.ts `tuned` mantığı).
    c.push("translate", "typing", "order", "translate", "typing", "cloze", "choice", "listen", "truefalse");
    if (word.artikel) c.push("artikel", "plural");
    if (short) c.push("scramble");
  }
  return c;
}

/**
 * Yazarak tamamlama olasılığı: cloze turu şık yerine giriş ister.
 * Yeni/takılan kelimede hiç (şık orada bir öğretmen), oturmuşta dörtte bir,
 * sağlamda yarı yarıya.
 */
export function clozeTypeChance(strength: Strength): number {
  return strength === "strong" ? 0.5 : strength === "solid" ? 0.25 : 0;
}

/**
 * Oturum içi bir basamak aşağı: art arda üç üretim yanlışında istemci turları
 * hafifletir — kalıcı değil, o oturum için. Sunucu turları önceden kurduğu
 * için dönüşüm burada, elde olan veriyle yapılır:
 *   translate → order  (aynı cümle, parçalar karışık)
 *   cloze/type → cloze/şıklı (şıklar zaten turda)
 *   typing → typing/assist (iskelet baştan açık, ceza yok)
 * Diğer turlar olduğu gibi kalır.
 */
export function easeRound(round: Round): Round {
  switch (round.game) {
    case "translate": {
      const raw = round.sentence.de.trim();
      const tail = raw.match(/[.!?…]+$/)?.[0] ?? "";
      const answer = (tail ? raw.slice(0, -tail.length) : raw).trim().split(/\s+/).filter(Boolean);
      if (answer.length < 3) return round;
      let tokens = shuffle(answer);
      for (let i = 0; i < 6 && tokens.join(" ") === answer.join(" "); i++) tokens = shuffle(answer);
      return {
        id: round.id,
        game: "order",
        word: round.word,
        tokens,
        answer,
        tail,
        sentenceTr: round.sentence.tr,
        sentenceEn: round.sentence.en,
      };
    }
    case "cloze":
      return round.mode === "type" ? { ...round, mode: undefined } : round;
    case "typing":
      return round.assist ? round : { ...round, assist: true };
    default:
      return round;
  }
}

/** Art arda kaç üretim yanlışı basamağı indirir. */
export const EASE_AFTER_MISSES = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

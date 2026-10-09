import { foldTight } from "@/components/games/types";
import type { TargetLang } from "@/lib/courses";
import { matchSentence, type SentenceMatch } from "@/lib/sentence-match";
import { sameTiles } from "@/lib/arrange";

/**
 * Yazılan ve dizilen cevabın YEREL hükmü — konuşma anlatımı (yazılan üretim/
 * tekrar), cümle kurma (parçalar) ve sıralama. Mobil `lib/typedAnswer` ile
 * birebir (parity "YAZILAN CEVAP HAKEMI").
 *
 * NEDEN (QA 2026-10-09). Konuşma anlatımında yazılan cevap iki platformda iki
 * ayrı kuraldan geçiyordu: web konuşma tanıyıcının kelime torbasını
 * (`judgeSpeech`, sıra yok sayılır) kullanıyor ve "Zum Frühstück ich trinke
 * einen Tee" gibi V2 hatasını doğru sayıyordu; mobil katlanmış tam eşitlik
 * istiyor ve "Meine Mutter und mein Vater kommen zum Fest" gibi doğru bir
 * başka kuruluşu reddediyordu. Kural artık tek: cümle hakemi (tam ya da yalnız
 * yazım geçer; sıra ve yanlış "henüz değil"), üç kelimeden uzun cevapta yerel
 * hüküm düşerse yapay zekâ kontrolü (`lib/sentence-rescue`). Sesli yol
 * (mikrofon) eskisi gibi tanıyıcı hakeminde.
 */

/** Yapay zekâ kontrolüne gidecek en kısa cevap — çeviri turuyla aynı eşik. */
export const RESCUE_MIN_WORDS = 3;

export type TypedJudgement = {
  /** Yerel olarak geçti mi (tam, yazım sapması ya da boşluksuz eşitlik). */
  pass: boolean;
  match: SentenceMatch;
  /** Yerel hüküm düştü ve cevap yapay zekâya sorulacak kadar uzun. */
  rescuable: boolean;
};

export function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export function judgeTyped(typed: string, target: string, accept: string[], lang: TargetLang): TypedJudgement {
  const match = matchSentence(typed, target, accept, lang);
  /* Boşluksuz yedek: kesmesiz "dont" ↔ "don't" (mobil `ConversationScreen`
     eşitliği baştan bunu da kabul ediyordu). */
  const tight = foldTight(typed, lang);
  const pass =
    match.verdict === "exact" ||
    match.verdict === "spelling" ||
    (!!tight && [target, ...accept].some((c) => foldTight(c, lang) === tight));
  return { pass, match, rescuable: !pass && wordCount(typed) >= RESCUE_MIN_WORDS };
}

/**
 * Dizilen cevap yapay zekâya sorulabilir mi: hedefin AYNI parçaları, başka
 * sırada, en az üç kelime. Parçalar sözcükse (cümle dizme) anlamlı; madde
 * sıralamasında (olay sırası) parçalar cümle ve sıra bilgiyi taşır — orada
 * sorulmaz.
 */
export function arrangedRescuable(arranged: string, target: string, items: string[]): boolean {
  return items.every((x) => !/\s/.test(x.trim())) && sameTiles(arranged, target) && wordCount(arranged) >= RESCUE_MIN_WORDS;
}

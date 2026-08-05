import { parseReply } from "./chat-format";
import type { ChatMessage } from "./chat-providers";

/**
 * Konuşma özeti — sohbet bittiğinde ne olduğunun dökümü.
 *
 * Bu, rakip uygulamaların ortak eksiği: konuşma bitiyor ve öğrenci ne
 * öğrendiğini bilmeden kapatıyor. Düzeltmeler konuşma sırasında tek tek
 * geçiyor, ama akış içinde okunup unutuluyorlar; toplu hâlde görüldüğünde
 * örüntü ortaya çıkıyor ("üç kez artikel hatası yaptım").
 *
 * Özet **ölçülen veriden** kuruluyor, modelden değil. Sebebi şu: modele
 * "konuşmayı özetle" demek uydurma bir değerlendirme üretme riski taşıyor —
 * "harika gidiyorsun, akıcılığın arttı" gibi doğrulanamayan cümleler. Oysa
 * elimizde gerçek veri var: kaç tur konuşuldu, model hangi düzeltmeleri
 * yazdı, çalışılan kelimelerden hangileri fiilen kullanıldı. Sayılabilir
 * olanı sayıyoruz, gerisini uydurmuyoruz.
 *
 * Aynı sebeple "puan" yok. Bir konuşmanın kalitesini ölçen bir sayı üretmek,
 * telaffuz notunda kaçındığımız şeyin aynısı olurdu (bkz. lib/speech.ts).
 */

export type ChatSummary = {
  /** Öğrencinin söz aldığı tur sayısı. */
  turns: number;
  /** Model tarafından yazılan düzeltmeler, sırayla. */
  corrections: string[];
  /** Çalışılan kelimelerden konuşmada fiilen geçenler. */
  usedFocus: string[];
  /** Çalışılan ama hiç geçmeyenler — bir sonraki konuşmanın hedefi. */
  unusedFocus: string[];
};

/** Karşılaştırma için sadeleştirme: büyük/küçük harf ve noktalama elenir. */
function fold(text: string): string {
  return text
    .toLocaleLowerCase("de-DE")
    .replace(/[.,!?;:„“”"'`´()\[\]…-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Bir hedef kelimenin konuşmada geçip geçmediği.
 *
 * Artikel atılıyor ("die Arbeit" → "arbeit") çünkü öğrenci kelimeyi cümle
 * içinde çekimli ve artikelsiz kullanmış olabilir; kök eşleşmesi gerekiyor ki
 * "arbeite" ve "arbeiten" de sayılsın.
 *
 * Ama kök **kelime başında** aranıyor, alt dize olarak değil. Düz alt dize
 * araması "Art" kökünü "Karte" içinde bulur ve öğrenciyi kullanmadığı bir
 * kelimeyi kullanmış sayardı — özet ölçülen veriye dayandığını iddia ederken
 * uydurma sayı üretmiş olurdu. Almancada çekim sona ek getirdiği için başa
 * bakmak doğru olan: "arbeiten" sayılır, "bearbeiten" sayılmaz.
 */
function mentions(haystack: string, word: string): boolean {
  const stem = fold(word).replace(/^(der|die|das)\s+/, "");
  if (stem.length < 3) return false;
  return haystack.split(" ").some((token) => token.startsWith(stem));
}

/**
 * Konuşmadan özet çıkarır.
 *
 * Yalnızca öğrencinin yazdıkları taranıyor: modelin cevabında geçen kelime
 * öğrencinin o kelimeyi kullandığını göstermez — tam tersine, model onu
 * kullandığı için öğrenci hiç kullanmamış bile olabilir.
 */
export function summarize(
  messages: ChatMessage[],
  focus: { de: string; tr: string }[],
): ChatSummary {
  const userText = fold(
    messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join(" "),
  );

  const corrections = messages
    .filter((m) => m.role === "assistant")
    .flatMap((m) => parseReply(m.content).corrections);

  const used: string[] = [];
  const unused: string[] = [];
  for (const word of focus) {
    (mentions(userText, word.de) ? used : unused).push(word.de);
  }

  return {
    turns: messages.filter((m) => m.role === "user").length,
    corrections,
    usedFocus: used,
    unusedFocus: unused,
  };
}

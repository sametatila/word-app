/**
 * Sohbet cevabının biçimi — sistem istemiyle arayüzün ortak sözleşmesi.
 *
 * Model cevabı üç parça taşıyor: gövde, düzeltme satırları ve önerilen
 * cevaplar. Bunları JSON yerine satır başındaki tek karakterle ayırıyoruz;
 * küçük modellerde şema hem kuralı kaçırtıyor hem akışı zorlaştırıyor
 * (yarım JSON ayrıştırılamaz, işaret ise satır tamamlandığı an okunur).
 *
 * İşaretler burada tanımlı ve **hem istem hem ayrıştırıcı buradan okuyor**:
 * iki tarafta ayrı yazılsalardı biri değiştiğinde öneriler hatasız biçimde
 * kaybolurdu — ekranda eksilen bir şey olmaz, sadece bir daha hiç görünmezdi.
 */

export const CORRECTION_MARK = "✏️";
export const SUGGESTION_MARK = "💬";

export type ParsedReply = {
  /** Konuşmanın kendisi. */
  body: string;
  /** Tek satırlık düzeltmeler (işaret çıkarılmış). */
  corrections: string[];
  /** Öğrencinin dokunup gönderebileceği hazır cevaplar. */
  suggestions: string[];
};

/**
 * Markdown vurgusu — arayüz düz metin gösteriyor, yıldızlar ekrana çıkıyor.
 *
 * Koç tarafında bu zaten temizleniyordu; sohbette atlanmıştı ve model
 * cevaplarında düzenli olarak `**kalın**` ve `*italik*` kullanıyor. Aynı
 * kural iki yerde de geçerli: metin ne ise o görünmeli.
 */
const EMPHASIS = /\*\*?([^*\n]+)\*\*?/g;

function stripEmphasis(line: string): string {
  return line.replace(EMPHASIS, "$1");
}

/**
 * İstemdeki bölüm başlığının cevaba sızıp sızmadığı.
 *
 * Model, sistem isteminde gördüğü „— ÖNERİLEN CEVAPLAR“ başlığını bazen
 * cevabın içine kopyalıyor. Marker taşımadığı için gövdeye düşüyor ve Almanca
 * bir sohbetin ortasında Türkçe bir başlık olarak kullanıcıya görünüyordu.
 *
 * İstemde „bu başlığı yazma“ demek yardımcı oluyor ama garanti değil — model
 * kararlı değil. Burada süzmek kesin çözüm: başlık ekrana hiç çıkmıyor.
 */
function isSectionHeader(line: string): boolean {
  if (!line) return false;
  const bare = line.replace(/^[—–-]+\s*/, "").replace(/[:：]\s*$/, "").trim();
  if (!bare) return false;
  // Başlıklar kısa, tamamı büyük harf ve noktalama taşımıyor.
  if (bare.length > 40) return false;
  if (/[.!?]/.test(bare)) return false;
  return bare === bare.toLocaleUpperCase("tr-TR") && /[A-ZÇĞİÖŞÜ]/.test(bare);
}

export function parseReply(text: string): ParsedReply {
  const body: string[] = [];
  const corrections: string[] = [];
  const suggestions: string[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith(CORRECTION_MARK)) {
      const value = stripEmphasis(trimmed.slice(CORRECTION_MARK.length).trim());
      if (value) corrections.push(value);
    } else if (trimmed.startsWith(SUGGESTION_MARK)) {
      // Model bazen öneriyi tırnak içine alıyor ya da numaralandırıyor;
      // düğmeye basılacak metin bunlardan arınmış olmalı.
      const value = stripEmphasis(trimmed.slice(SUGGESTION_MARK.length).trim())
        .replace(/^\d+[.)]\s*/, "")
        .replace(/^["“„']|["”“']$/g, "")
        .trim();
      if (value) suggestions.push(value);
    } else if (!isSectionHeader(trimmed)) {
      body.push(stripEmphasis(line));
    }
  }

  return { body: body.join("\n").trim(), corrections, suggestions };
}

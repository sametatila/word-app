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

export function parseReply(text: string): ParsedReply {
  const body: string[] = [];
  const corrections: string[] = [];
  const suggestions: string[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith(CORRECTION_MARK)) {
      const value = trimmed.slice(CORRECTION_MARK.length).trim();
      if (value) corrections.push(value);
    } else if (trimmed.startsWith(SUGGESTION_MARK)) {
      // Model bazen öneriyi tırnak içine alıyor ya da numaralandırıyor;
      // düğmeye basılacak metin bunlardan arınmış olmalı.
      const value = trimmed
        .slice(SUGGESTION_MARK.length)
        .trim()
        .replace(/^\d+[.)]\s*/, "")
        .replace(/^["“„']|["”“']$/g, "")
        .trim();
      if (value) suggestions.push(value);
    } else {
      body.push(line);
    }
  }

  return { body: body.join("\n").trim(), corrections, suggestions };
}

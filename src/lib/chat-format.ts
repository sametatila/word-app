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

/*
 * İşaretler emoji DEĞİL: emoji her platformda ayrı çiziliyor, bazı küçük
 * modeller varyasyon seçicisini (U+FE0F) düşürüp işareti bozuyor ve arayüz
 * emojisiz bir dil kullanıyor. Köşeli parantezli ASCII etiket hem her modelde
 * birebir üretiliyor hem de bir cümlenin başında kazara oluşamıyor.
 */
export const CORRECTION_MARK = "[FIX]";
export const SUGGESTION_MARK = "[SAY]";

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
  const dashed = /^[—–-]+\s*/.test(line);
  const bare = line.replace(/^[—–-]+\s*/, "").replace(/[:：]\s*$/, "").trim();
  if (!bare) return false;
  // Başlıklar kısa, tamamı büyük harf ve noktalama taşımıyor.
  if (bare.length > 40) return false;
  if (/[.!?]/.test(bare)) return false;
  // Tek kelime başlık sayılmıyor: model kısa ve vurgulu bir cevap verebilir
  // („JA“, „SUPER“) ve onu silmek mesajı yok etmek olurdu. Gözlenen sızıntı
  // hep çok kelimeliydi („— ÖNERİLEN CEVAPLAR“); tire ile başlıyorsa tek
  // kelime de başlık sayılıyor, çünkü cevap tire ile başlamaz.
  if (!dashed && !bare.includes(" ")) return false;
  return bare === bare.toLocaleUpperCase("tr-TR") && /[A-ZÇĞİÖŞÜ]/.test(bare);
}

/**
 * Yalnızca büyük/küçük harf ya da noktalama farkı taşıyan düzeltmeler.
 *
 * Öğrenci konuşarak cevap veriyor ve tanıyıcı metni büyük harf ve noktalama
 * olmadan döndürüyor: „ich arbeite auch“. Bunu „Ich arbeite auch.“ diye
 * düzeltmek öğrencinin YAPMADIĞI bir hatayı ona yüklemek oluyor — söylediği
 * cümlede öyle bir hata yok, yazıya dökülürken oluşmuş bir fark var. Sesli
 * konuşurken imla düzeltmesi almak dersin güvenilirliğini düşürüyor.
 *
 * İstemde „bunu yapma“ demek yardımcı oluyor ama garanti değil. Burada
 * süzmek kesin: iki tarafı harf ve sayı olarak aynı olan satır hiç
 * gösterilmiyor.
 */
function isCosmetic(correction: string): boolean {
  const parts = correction.split(/→|->/);
  if (parts.length < 2) return false;
  // Sağ taraftaki kural etiketi „(V2-Regel)“ karşılaştırmaya girmemeli.
  const bare = (t: string) =>
    t
      .replace(/\([^)]*\)\s*$/, "")
      .toLocaleLowerCase("de-DE")
      .replace(/[^\p{L}\p{N}]+/gu, "");
  const left = bare(parts[0]);
  const right = bare(parts.slice(1).join("→"));
  return left.length > 0 && left === right;
}

export function parseReply(text: string): ParsedReply {
  const body: string[] = [];
  const corrections: string[] = [];
  const suggestions: string[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith(CORRECTION_MARK)) {
      const value = stripEmphasis(trimmed.slice(CORRECTION_MARK.length).trim());
      if (value && !isCosmetic(value)) corrections.push(value);
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

/**
 * Açıklama metinlerindeki ters tırnak (`…`) işaretlemesini okunur tırnağa çevirir.
 *
 * Haftalık quiz (`why`, ~980 dize) ve deneme sınavı (`explain`, ~1.350 dize)
 * açıklamaları sözcük anmayı Markdown tarzı ters tırnakla yazıyor: "`wann`
 * zamanı sorar". Web ve mobil bu alanları DÜZ METİN basıyor; öğrenci ham ` işaretini
 * görüyordu (QA F-0045). İçerik ve çeviri katmanları (`data/weekly-quiz/prose`,
 * `data/mock-exams/prose`) aynı dizeyi anahtar olarak kullandığı için kaynağı
 * değiştirmek binlerce satırı yeniden anahtarlamak demekti; çeviri bittikten sonra,
 * istemciye giden son noktada çevriliyor. Ev tırnağı „…“ (beceri açıklamaları
 * da bunu kullanıyor).
 *
 * Eşleşmeyen tek ` olduğu gibi kalır; satır sonunu aşan eşleşme yapılmaz.
 */
export function plainQuotes(s: string): string;
export function plainQuotes(s: string | undefined): string | undefined;
export function plainQuotes(s: string | undefined): string | undefined {
  if (!s || !s.includes("`")) return s;
  return s.replace(/`([^`\n]+)`/g, "„$1“");
}

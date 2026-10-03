/**
 * CSV hücresi — panelin bütün CSV dışa aktarımları buradan (istemci ve sunucu).
 *
 * FORMÜL ENJEKSİYONU: `=`, `+`, `-`, `@`, sekme ya da satır başıyla başlayan
 * hücre Excel/Sheets'te formül olarak çalışıyor. Görünen ad gibi kullanıcının
 * yazdığı bir alan `=HYPERLINK(…)` ya da DDE olursa, CSV'yi açan yöneticinin
 * makinesinde tablodaki öteki satırları (e-postalar) dışarı taşıyabiliyordu
 * (güvenlik denetimi 2026-10-03, D21). Böyle hücrenin önüne kesme işareti
 * konuyor; hesap tablosu onu metin sayıyor. Salt sayı (`-5`, `+3,5`, `-12%`)
 * formül olamaz, sayı olarak kalıyor.
 */
export function csvCell(v: string | number): string {
  const t = String(v);
  const safe = /^[=+\-@\t\r]/.test(t) && !/^[+-]?\d+(?:[.,]\d+)?%?$/.test(t) ? `'${t}` : t;
  return /[",\n\r;]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

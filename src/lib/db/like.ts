/**
 * Kullanıcının yazdığı aramadan "içeriyor" LIKE kalıbı kurar: `%q%`.
 *
 * `%`, `_` ve `\` kaçışlanıyor. Kaçışlanmasa kullanıcının joker karakterleri
 * aramayı genişletir: "_" tek harfe, "%" her şeye eşleşir (güvenlik denetimi).
 * Postgres LIKE'ın varsayılan kaçış karakteri zaten `\`, ayrıca ESCAPE yazmak
 * gerekmiyor.
 *
 * Kalıp VERİ KATMANINDA kuruluyor, arayüz dosyasında değil: aynı satır üç
 * yerde kopya olarak duruyordu ve `check:parity`nin "yerelsiz harf çevirisi"
 * kuralı `.tsx` içindeki `%${…}` şablonunu yüzde biçimi sayıp CI'ı düşürüyordu.
 */
export function likeContains(q: string): string {
  return `%${q.replace(/[%_\\]/g, (m) => `\\${m}`)}%`;
}

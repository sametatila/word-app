/**
 * Yerel gün — "bugün" ne zaman biter.
 *
 * Seri, günün turu, günlük görevler, adil kullanım sayaçları ve deneme
 * kayıtlarının hepsi bu tarihe göre gün değiştiriyor, yani kural TEK olmak
 * zorunda: iki yüzey günü farklı anda çevirirse aynı çalışma bir yerde
 * "bugün" bir yerde "dün" sayılır.
 *
 * Web'de bu fonksiyon ON İKİ dosyaya kopyalanmıştı (üç ayrı biçimde yazılmış
 * ama üçü de aynı sonucu veriyordu). Bugün bir sorun çıkarmıyordu ama
 * birinde yapılacak tek bir düzeltme ötekilere geçmezdi. Mobil bunu baştan
 * tek yerde tutuyor (`M/src/game/session.ts` `todayStr`).
 *
 * UTC DEĞİL, CİHAZIN YEREL GÜNÜ: kullanıcı için gün gece yarısı bulunduğu
 * yerde biter. Sunucu da aynı tarihi `clampDay` ile alıp saklıyor.
 */
export function localDay(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

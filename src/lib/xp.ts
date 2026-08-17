/**
 * XP tablosu — uygulamadaki tek referans noktası.
 *
 * Neden tek dosya: XP kuralları üç ayrı yere dağılmıştı ve sonuç ölçüldüğünde
 * sistem öğrenmeyi çarpıtıyordu. Gerçek kullanımda kelime oyunları dakikada
 * ~100 XP veriyordu (3.959 cevap · 397 dakika · 39.541 XP); aynı sürede bir
 * okuma alıştırması ~9 XP, bir ders ise **sıfır** kazandırıyordu. Sekiz ders
 * ve sekiz rol yapma turu tamamlanmıştı ve hiçbiri sayılmamıştı.
 *
 * Bunun sonucu bir teşvik hatası: sıralamada yükselmek isteyen öğrenci kelime
 * kartı çevirmek zorundaydı, çünkü okumak, dinlemek, yazmak, konuşmak ve
 * dilbilgisi çalışmak puan cinsinden değersizdi. Oysa bunlar dilin asıl
 * öğrenildiği yerler.
 *
 * İlke: **XP harcanan çabayı ölçer, aktivitenin türünü değil.** Aynı beş
 * dakika hangi yolla geçirilirse geçirilsin benzer puan kazandırır. Taban
 * bilerek kelime oyunlarının ölçülen oranına eşitlendi — diğer yolları
 * yükseltmek, mevcut kullanıcıların birikimini düşürmekten adil.
 */

/** Dakikada kazanılan taban XP — kelime oyunlarında ölçülen orana eşit. */
export const XP_PER_MINUTE = 100;

/**
 * Çaba/başarı ayrımı.
 *
 * Puanın bir kısmı işi YAPMAYA, kalanı DOĞRU yapmaya bağlı. Tamamen doğruluğa
 * bağlansaydı, zorlanan öğrenci hem yanlış yapıp hem puansız kalırdı — yani
 * sistem en çok desteğe ihtiyacı olanı en çok cezalandırırdı. Tamamen katılıma
 * bağlansaydı bu kez dikkatsizce tıklamak da aynı puanı kazandırırdı.
 */
const EFFORT_SHARE = 0.5;

/** Oranı [0,1] aralığına sıkıştırır; toplam sıfırsa katılım payı verilir. */
function successRatio(correct: number, total: number): number {
  if (total <= 0) return 1;
  return Math.max(0, Math.min(1, correct / total));
}

/** Süre × oran hesabının ortak gövdesi. */
function timedXp(minutes: number, ratio: number, effortShare = EFFORT_SHARE): number {
  const safeMinutes = Math.max(0.5, Math.min(60, minutes));
  const weight = effortShare + (1 - effortShare) * ratio;
  return Math.round(safeMinutes * XP_PER_MINUTE * weight);
}

/**
 * Beceri alıştırması (okuma · dinleme · yazma · konuşma).
 *
 * Süre alıştırmanın kendi `minutes` alanından geliyor — istemciden değil.
 * Öğrencinin ekranda ne kadar oyalandığı manipüle edilebilir bir sayı;
 * alıştırmanın tasarlanmış uzunluğu ise sabit.
 */
export function xpForSkill(minutes: number, correct: number, total: number): number {
  return timedXp(minutes, successRatio(correct, total));
}

/**
 * Ders (dilbilgisi anlatımı + alıştırmalar + rol yapma).
 *
 * Rol yapma ayrı ağırlık taşıyor çünkü dersin asıl parçası o: kural bilmek
 * ile kuralı konuşurken kurabilmek aynı şey değil. Rol yapmayı atlayıp
 * yalnızca şıkları işaretleyen öğrenci dersi bitirmiş sayılmıyor, puanı da
 * bunu yansıtıyor.
 */
export function xpForLesson(
  minutes: number,
  correct: number,
  total: number,
  roleplayDone: boolean,
): number {
  const ratio = successRatio(correct, total);
  const combined = 0.6 * ratio + 0.4 * (roleplayDone ? 1 : 0);
  return timedXp(minutes, combined, 0.35);
}

/**
 * Hayatta kalma turunda rekor kırma ödülü.
 *
 * Turun kendisi zaten cevap başına XP kazandırıyor (cevaplar `/api/answers`
 * üzerinden geçiyor); burada ödüllendirilen şey **rekorun kırılması**.
 * Aradaki farkla orantılı ama tavanlı: rekorunu her seferinde bir puan
 * geçerek XP toplamak da, tek bir turda sınırsız puan kazanmak da mümkün
 * olmamalı.
 */
export function xpForChallengeRecord(score: number, previous: number): number {
  if (score <= previous) return 0;
  const gain = Math.round((score - previous) / 8);
  return Math.max(25, Math.min(400, gain));
}

/**
 * Kazanılan XP'nin ne kadarının yeni olduğunu bulur.
 *
 * Aynı alıştırmayı tekrar çözmek XP kasmaya dönüşmemeli: yalnızca en iyi
 * sonucun İYİLEŞME farkı ekleniyor. İlk çözümde önceki puan yok, tamamı
 * eklenir.
 */
export function xpDelta(nextXp: number, previousXp: number | null): number {
  if (previousXp === null) return Math.max(0, nextXp);
  return Math.max(0, nextXp - previousXp);
}

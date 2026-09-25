/**
 * XP tablosu — uygulamadaki tek referans noktası.
 *
 * Neden tek dosya: XP kuralları üç ayrı yere dağılmıştı ve sonuç ölçüldüğünde
 * sistem öğrenmeyi çarpıtıyordu. Gerçek kullanımda kelime oyunları dakikada
 * ~100 XP veriyordu (3.959 cevap · 397 dakika · 39.541 XP); aynı sürede bir
 * okuma alıştırması ~9 XP, bir konuşma ise **sıfır** kazandırıyordu. Sekiz konuşma
 * ve sekiz sohbet turu tamamlanmıştı ve hiçbiri sayılmamıştı.
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
 * Bir günde `/api/answers` üzerinden kazanılabilecek XP tavanı (güvenlik
 * denetimi 2026-09-14, #2).
 *
 * `/api/answers` istemcinin bildirdiği `correct`'e güveniyor ve sunucu sözlü ya
 * da serbest bir cevabı yeniden puanlayamıyor; dolayısıyla uydurma cevaplarla
 * lig (dailyStats.xp'den sıralanıyor) SONSUZ şişirilebiliyordu. Tavan bir güne
 * sığabilecek XP'yi sınırlar. Bilerek YÜKSEK: ölçülen en uç gerçek gün ~40.000
 * XP (100 XP/dk × ~6,6 saat). 60.000, en çalışkan kullanıcıyı bile kırpmadan
 * (xp.ts felsefesi) uydurmayı "bir günde erişilemez" bölgede tutar. Beceri/konuşma
 * XP'si ayrı yollardan gelir; bu tavan yalnız kelime-oyunu yolunu bağlar.
 */
export const ANSWERS_DAILY_XP_CAP = 60_000;

/**
 * Günlük tavanı uygular: bugün kazanılan XP'ye göre kalan bütçeye kırpar.
 * Saf fonksiyon (DB'siz test edilebilir); asıl okuma/yazma çağırıcıda.
 */
export function cappedDailyXp(usedToday: number, xpGained: number, cap = ANSWERS_DAILY_XP_CAP): number {
  return Math.max(0, Math.min(xpGained, cap - Math.max(0, usedToday)));
}

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
 * Konuşma (dilbilgisi anlatımı + alıştırmalar + sohbet).
 *
 * Sohbet ayrı ağırlık taşıyor çünkü konuşmanın asıl parçası o: kural bilmek
 * ile kuralı konuşurken kurabilmek aynı şey değil. Sohbeti atlayıp
 * yalnızca şıkları işaretleyen öğrenci konuşmayı bitirmiş sayılmıyor, puanı da
 * bunu yansıtıyor.
 */
export function xpForConversation(
  minutes: number,
  correct: number,
  total: number,
  chatDone: boolean,
): number {
  const ratio = successRatio(correct, total);
  const combined = 0.6 * ratio + 0.4 * (chatDone ? 1 : 0);
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

/**
 * Bahisli etabın sonucu.
 *
 * Etap sınırında kullanıcı isterse "bahse girer": sonraki beş turu hatasız
 * bitirirse o etabın puanı ikiye katlanır, iki ya da daha çok yanlışta etap
 * hiç puan kazandırmamış olur. Bir yanlış ne kazandırır ne kaybettirir.
 *
 * İki kural bunu adil tutuyor:
 *
 *   1. **Tamamen isteğe bağlı.** Bahse girmeyen hiçbir şey kaybetmez ve
 *      kaybedebileceği bir şey olduğunu da bilmez — oyunun zorluğu değişmez.
 *   2. **Kayıp yalnızca o etaba ait.** Kaybedilen en fazla, o beş turda az
 *      önce kazanılan puandır. Dünkü emeğe dokunulmaz. Bir öğrenme
 *      uygulamasının kullanıcıyı GERİ götürmesi savunulamaz; "bu etap
 *      boşa gitti" ise gergin ama dürüst.
 *
 * Bahsin varlık sebebi zorluk değil GERİLİM: ana turda kaybedilecek hiçbir
 * şey yoktu, dolayısıyla kazanılacak bir şey de yoktu. Hayatta kalma turunda
 * ölçülen odak farkını ana tura taşıyan şey bu.
 */
export function xpForWager(correct: number, total: number, stake: number): number {
  if (total <= 0) return 0;
  // Pay istemciden geliyor (sunucu etabın kendi toplamını ayrıca tutmuyor),
  // bu yüzden tavanlı: bozuk ya da abartılı bir sayı puan basamaz.
  const safeStake = Math.max(0, Math.min(250, Math.round(stake)));
  const wrong = total - correct;
  if (wrong === 0) return safeStake;
  if (wrong === 1) return 0;
  return -safeStake;
}
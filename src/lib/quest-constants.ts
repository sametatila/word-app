/**
 * Görev panosunun İSTEMCİNİN de bilmesi gereken iki sabiti.
 *
 * `lib/quests` `server-only` — kartı (istemci bileşeni) oradan içe alamıyor.
 * Sabitler orada kaldığı sürece kart hem ödülü ("+300 XP", `claim_xp`) hem de
 * toplu görevin kimliğini ("all", üç yerde) ELLE yazmak zorundaydı: sunucudaki
 * ödül değiştiğinde web kullanıcısına yanlış miktar yazar, kimlik değiştiğinde
 * düğme sessizce çalışmaz. Mobil tarafta böyle bir sorun yoktu, çünkü orada
 * sabitler `game/quests` içinde ve ekran onları içe alıyor.
 *
 * Bu dosya `server-only` DEĞİL — `lib/quests` buradan okuyup yeniden dışa
 * veriyor, kart da doğrudan buradan alıyor. Sayı tek yerde yazılı kalıyor.
 */

/** Üçünü birden bitirmenin ödülü — ayrı bir "görev" gibi talep edilir. */
export const ALL_DONE_ID = "all";
export const ALL_DONE_XP = 300;

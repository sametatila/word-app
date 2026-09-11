/**
 * Davet kutusunun gördüğü biçim — SUNUCU ile İSTEMCİNİN ortak tipi.
 *
 * `premium/referral` `server-only`; web ödeme duvarı biçimi kendi içinde
 * TEKRAR yazıyordu (`type Referral = { code; invited; rewarded; earnedDays }`)
 * ve mobil de üçüncü bir kopyasını tutuyordu. Sunucuya bir alan eklendiğinde
 * istemci onu hiç görmezdi — `rewardDays` eklenirken tam bu oldu.
 */
export type ReferralStats = {
  code: string;
  /** Kodla kayıt olan toplam kişi. */
  invited: number;
  /** Ödeme yapıp ödül üreten kişi. */
  rewarded: number;
  /** Kazanılan toplam gün. */
  earnedDays: number;
  /**
   * Davet başına ödül (gün) — PANELDEN ayarlanıyor.
   *
   * İki platformun davet kutusu da "sana 7 gün Premium veriyoruz" cümlesini
   * ELLE yazılmış bir 7 ile kuruyordu. Ödül panelden değiştirilince sunucu
   * yeni süreyi verir, iki ekran da eski sayıyı söylemeye devam ederdi — kod
   * değişmeden bozulan bir söz, yani hiçbir kapının göremeyeceği bir yanlış.
   */
  rewardDays: number;
};

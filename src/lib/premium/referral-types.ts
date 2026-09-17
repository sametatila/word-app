/**
 * Davet kutusunun gördüğü biçim — SUNUCU ile İSTEMCİNİN ortak tipi.
 *
 * `premium/referral` `server-only`; web ödeme duvarı biçimi kendi içinde TEKRAR
 * yazıyordu ve mobil de üçüncü bir kopyasını tutuyordu. Sunucuya bir alan
 * eklendiğinde istemci onu hiç görmezdi. Tek tanım, üç taraf.
 *
 * Davetin karşılığı bir TAHSİSAT değil bir BAĞLANTI: bağ kurulunca davet
 * edilenden davetçiye arkadaşlık isteği gidiyor (`lib/referral-link`).
 * Gösterilecek tek sayı bu yüzden "kaç kişi katıldı" — kazanılmış bir süre yok.
 */
export type ReferralStats = {
  code: string;
  /** Kodla kayıt olan toplam kişi. */
  invited: number;
};

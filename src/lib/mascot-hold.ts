/**
 * Erdi'nin cevap şeridini sürükleyerek getirme koreografisi sürerken turun
 * kapanmasını bekleten ortak saat.
 *
 * Koreografi şeridin içinde, tur kapanışı ise oyunun kendisinde (okuma
 * bitince ilerle). İkisi birbirini tanımıyor; ilk sürümde tur, mirket daha
 * şeridi getirmeyi bitirmeden ilerliyor ve animasyon yarıda kesiliyordu.
 * Şerit koreografiye başlarken buraya "şu ana kadar bekle" yazıyor; tur
 * kapanışı (use-round-exit) ilerlemeden önce kalan süreye bakıyor.
 *
 * Modül kapsamı bilinçli: oyun bileşeni ile şerit ayrı ağaçlarda ve her tur
 * yeniden kuruluyor — ortak bir ata üzerinden prop taşımak, on bir oyunun
 * hepsine dokunmak demekti.
 */
let holdUntil = 0;

/** Kapanışı en az `ms` boyunca beklet (daha uzun bir bekleme varsa o kalır). */
export function holdRound(ms: number) {
  holdUntil = Math.max(holdUntil, Date.now() + ms);
}

/** Kapanmadan önce beklenecek kalan süre (ms). */
export function roundHoldRemaining() {
  return Math.max(0, holdUntil - Date.now());
}

/**
 * Uzak push bu cihazda çalışıyor mu — tek satırlık ortak durum.
 *
 * Ayrı bir dosyada duruyor çünkü iki modül de buna bakıyor: jetonu yazan
 * `pushDevice` ve hatırlatmayı zamanlayan `notifications`. Bayrağı ikisinden
 * birinin içinde tutmak, ikisi arasında DAİRESEL bir içe aktarma kurardı
 * (`notifications` jetonu sorar, `pushDevice` yerel kopyaları iptal eder) —
 * Metro bunu çoğu zaman yutar ama yükleme sırasına bağlı, sessiz bir
 * `undefined` riski taşır.
 */
let hasDevice = false;

/** Sunucu bu cihaza bildirim gönderebiliyor mu. */
export function hasPushDevice(): boolean {
  return hasDevice;
}

export function setPushDevice(value: boolean): void {
  hasDevice = value;
}

"use client";

/**
 * Yürüyüş modu mikrofon onayı — mobil `M/src/lib/micConsent.ts`in karşılığı.
 *
 * Mobilde bu ekran Play'in "belirgin açıklama ve rıza" kuralı yüzünden var:
 * ses ekran kapalıyken de kaydedilip sunucuya ve konuşma tanıma
 * sağlayıcılarına gittiği için sistem izin diyaloğundan AYRI, uygulama içi
 * bir açıklama ve olumlu onay gerekiyor. Web'de böyle bir mağaza kuralı yok
 * ama TOPLANAN VERİ AYNI: web de sesi `/api/stt`e gönderiyor. Kullanıcıya
 * telefonda söylenen şeyin tarayıcıda söylenmemesi için sebep yok.
 *
 * Onay cihazda tutuluyor (hesaba yazılmıyor, mobilde de öyle) ve Ayarlar'dan
 * geri alınabiliyor — geri alınca ekran yeniden geliyor. Anahtardaki sürüm,
 * açıklama metni anlamlı değişirse artırılır ve onay yeniden sorulur.
 */
const KEY = "lernomi:mic-consent:v1";

export function hasMicConsent(): boolean {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    // Depolama kapalıysa onay saklanamaz. "Verilmemiş" saymak doğrusu:
    // ekran her seferinde gelir, hiç sorulmadan mikrofon açılmaz.
    return false;
  }
}

export function setMicConsent(on: boolean): void {
  try {
    if (on) localStorage.setItem(KEY, new Date().toISOString());
    else localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}

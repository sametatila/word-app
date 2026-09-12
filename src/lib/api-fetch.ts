/**
 * Zaman aşımlı `fetch` — mobil `api/client.ts`in karşılığı.
 *
 * ASILI KALAN İSTEK SONSUZA KADAR ASILI KALIYORDU. Tarayıcının `fetch`i
 * kendiliğinden vazgeçmiyor: kaptif portalda, zayıf hücresel bağlantıda ya da
 * sunucu yanıt vermeyi bıraktığında istek yıllarca bekleyebilir. Ekranda
 * duran şey de iskeletin kendisi oluyor — kullanıcı "yükleniyor" görüyor,
 * oysa hiçbir şey yüklenmiyor ve bir daha da yüklenmeyecek.
 *
 * Android'de böyle değil: HER çağrı `api()`den geçiyor ve 25 saniyede
 * vazgeçip hatayı fırlatıyor; ekranların zaten yazılı olan "yüklenemedi ·
 * tekrar dene" dalı devreye giriyor. Web'de ölçüm elli yedi istemci
 * çağrısından elli dördünün hiçbir sınırı olmadığını gösterdi.
 *
 * Süre MOBİLDEKİYLE AYNI SAYI ve burada adı var: iki taraf ayrı ayrı
 * değiştirilemesin.
 *
 * DEĞERLENDİRME ÇAĞRILARI BUNUN DIŞINDA ve öyle kalmalı: yapay zekâ yanıtı
 * 25 saniyeden uzun sürebiliyor, o yüzden kendi (daha uzun) süreleri var ve
 * ikisi de iki platformda eşleştirilmiş durumda (`ASSESS_TIMEOUT_MS`,
 * `ASSESS_ROLEPLAY_TIMEOUT_MS`).
 */
export const API_TIMEOUT_MS = 25_000;

export function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  /* Çağıran kendi sinyalini verdiyse ona dokunulmuyor: iptal edilebilir bir
     istek (ekrandan çıkınca durduruluyor) zaten kendi ömrünü yönetiyor. */
  return fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(API_TIMEOUT_MS) });
}

/**
 * SSML yardımcıları — Edge ve Azure yolları aynı belgeyi üretiyor.
 *
 * Tek kaynakta durmasının sebebi somut: iki yolun ürettiği SSML birbirinden
 * ayrılırsa yedeğe düşüldüğünde ses fark edilir biçimde değişir (farklı hız,
 * farklı kaçırma) — oysa yedeğin tüm amacı kullanıcının farkı duymaması.
 */

/** SSML'e gömülecek metin — açılı ayraç ve & kaçırılmazsa belge bozulur. */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Edge ve Azure'un ikisine de giden SSML belgesi.
 *
 * `rate` çağırandan geliyor (voices.ts, rateFor): hız politikası ses
 * kataloğunun işi, belge kurmanın değil.
 *
 * Sessizlik ayarı BİLEREK yok. Nöral seslerin MP3'lerinde ölçülen gömülü
 * sessizlikler (cümle arası ~1.05 sn, klip sonu ~1.0 sn, başı ~0.2 sn)
 * `mstts:silence` ile kısılmak istendi; Edge'in ücretsiz ucu mstts etiketi
 * gören SSML'i sentezlemeden bağlantıyı kapatıyor — hem `-exact` hem düz
 * türler denendi, ikisi de 503'e düştü. Uç yalnızca voice+prosody alt
 * kümesini kabul ediyor. Bu yüzden sessizlik yönetimi istemcide: ders akışı
 * sesi WebAudio ile çözüp kenar sessizliklerini kırpıyor ve uzun duraklamaları
 * sıkıştırıyor (bkz. components/speak-button, speakSegments).
 */
export function buildSsml(clean: string, voice: string, rate: string): string {
  const lang = voice.slice(0, 5);
  return (
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'>` +
    `<voice name='${voice}'><prosody rate='${rate}' pitch='+0Hz'>` +
    `${escapeXml(clean)}</prosody></voice></speak>`
  );
}

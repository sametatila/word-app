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

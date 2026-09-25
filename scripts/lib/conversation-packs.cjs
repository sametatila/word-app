/**
 * Seviye seviye konuşma paketleri — kelime kapılarının konuşma kaynağı.
 *
 * Kapılar kümülatif kümeyi eskiden `mobile/src/data/conversations/<kurs>-<sv>.json`
 * dökümlerinden okuyordu. 74ce0a05'te A2-C1 dökümleri mobil paketten çıktı
 * (konuşmalar artık sunucudan iniyor) ve kapılar SESSİZCE yarım kaldı: İngilizce
 * kapı olmayan dosyayı boş liste sayıyordu, Almanca kapının ünite yolu hatayı
 * yutuyordu, yalnız `check:unitvocab` ENOENT ile düşüyordu.
 *
 * Artık döküm dosyası değil dökümün PROJEKSİYONU okunuyor (`buildConversationDump`):
 * aynı alanlar, aynı sıra, kaynaktan. Dosya diskte olsun olmasın aynı sonuç.
 * Betikler tsx altında koştuğu için `.ts` doğrudan `require` edilebiliyor.
 */
const bellek = new Map();

/** Bir kursun bir seviyedeki konuşmaları, kaynaktaki sırayla. Konuşmayı olmayan seviye boş. */
function konusmaPaketi(course, lv) {
  if (!bellek.has(course)) {
    const { buildConversationDump } = require("../dump-conversations-mobile.ts");
    const m = new Map();
    for (const p of buildConversationDump(course)) m.set(p.level.toLowerCase(), JSON.parse(p.json));
    bellek.set(course, m);
  }
  return bellek.get(course).get(String(lv).toLowerCase()) ?? [];
}

module.exports = { konusmaPaketi };

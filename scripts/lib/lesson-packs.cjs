/**
 * Seviye seviye ders paketleri — kelime kapılarının ders kaynağı.
 *
 * Kapılar kümülatif kümeyi eskiden `mobile/src/data/lessons/<kurs>-<sv>.json`
 * dökümlerinden okuyordu. 74ce0a05'te A2-C1 dökümleri mobil paketten çıktı
 * (dersler artık sunucudan iniyor) ve kapılar SESSİZCE yarım kaldı: İngilizce
 * kapı olmayan dosyayı boş liste sayıyordu, Almanca kapının ünite yolu hatayı
 * yutuyordu, yalnız `check:unitvocab` ENOENT ile düşüyordu.
 *
 * Artık döküm dosyası değil dökümün PROJEKSİYONU okunuyor (`buildLessonDump`):
 * aynı alanlar, aynı sıra, kaynaktan. Dosya diskte olsun olmasın aynı sonuç.
 * Betikler tsx altında koştuğu için `.ts` doğrudan `require` edilebiliyor.
 */
const bellek = new Map();

/** Bir kursun bir seviyedeki dersleri, kaynaktaki sırayla. Dersi olmayan seviye boş. */
function dersPaketi(course, lv) {
  if (!bellek.has(course)) {
    const { buildLessonDump } = require("../dump-lessons-mobile.ts");
    const m = new Map();
    for (const p of buildLessonDump(course)) m.set(p.level.toLowerCase(), JSON.parse(p.json));
    bellek.set(course, m);
  }
  return bellek.get(course).get(String(lv).toLowerCase()) ?? [];
}

module.exports = { dersPaketi };

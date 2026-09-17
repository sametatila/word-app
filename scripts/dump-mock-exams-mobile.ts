/**
 * Deneme sınavlarını mobil pakete döker — KAYNAKTAN.
 *
 * Kâğıtlar `src/lib/mock-exams` altında TypeScript olarak duruyor: web ve
 * doğrulayıcı onları doğrudan okuyor. Mobil bunu yapamaz (RN paketine
 * `src/` girmiyor), bu yüzden aynı liste tek bir JSON'a yazılıyor ve
 * `mobile/src/data/exams.ts` yalnız onu import ediyor.
 *
 * Beceri paketiyle aynı mantık (bkz. `dump-skills-mobile.ts`): tek kaynak
 * web tarafında, mobil türev. Kâğıt değiştiğinde bu betik yeniden
 * çalıştırılmazsa mobil eski içerikte kalır — bu yüzden dökümün sonunda
 * kâğıt ve madde sayısı basılıyor, fark gözden kaçmasın.
 *
 * Kullanım: npm run dump:mock-exams
 */
import { MOCK_PAPERS } from "../src/lib/mock-exams";

/**
 * Kursun mobil paketi: dosya yolu + yazılacak JSON.
 *
 * `check-dumps` aynı işlevi çağırıp dosyayla BAYT BAYT karşılaştırıyor.
 * Yukarıdaki "kâğıt değiştiğinde bu betik yeniden çalıştırılmazsa mobil eski
 * içerikte kalır" cümlesi 2026-09-12'de ÖLÇÜLDÜ: `papers-en.json` bir
 * gerekçede hâlâ «Ayşe» taşıyordu, kaynak ise c2f714b8'te «Ayse»ye
 * çekilmişti. Sayı basmak yetmemiş; kapı artık metne bakıyor.
 */
export function buildPaperDump(course: string) {
  const keep = MOCK_PAPERS.filter((p) => p.course === course);
  const file =
    course === "de" ? "mobile/src/data/exams/papers.json" : `mobile/src/data/exams/papers-${course}.json`;
  return { file, json: JSON.stringify(keep), rows: keep };
}

/*
  DÖKÜM KOLU KALDIRILDI — yazılacak dosya kalmadı.

  `papers.json` ve `papers-en.json` mobil paketten çıkarıldı (premium kâğıtlar
  ücretsiz ikilinin içinde, cevap anahtarlarıyla duruyordu). Kâğıt artık
  sunucudan iniyor, künye de içerik hattından yayınlanıyor.

  `buildPaperDump` YAŞIYOR ve tek projeksiyon olarak kalıyor:
  `scripts/content-publish` künyeleri ondan üretiyor. İki yerde iki
  projeksiyon olsaydı yayınlanan içerik sessizce kaynaktan ayrılırdı.
*/

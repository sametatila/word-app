/**
 * Sahte içerik teslim hattı — sınav kurucusunun kuru provası için.
 *
 * NEDEN GEREKTİ. `buildExam` dersleri artık yayın hattından okuyor
 * (`lessonsForLevel` → `packItems`, içerik hattı 2026-09-17) ve o yol
 * veritabanına gidiyor. Kuru prova ise veritabanını saplıyor
 * (`stub-db.ts`): gösterge sorgusu boş dönüyor, `packItems` "bu paketi
 * bilmiyorum" diye boş dizi veriyor ve kâğıdın TÜRETİLEN yarısı — kelime,
 * cümle kurma, hüküm — her modülde boş çıkıyordu. Ölçüldü (2026-09-21):
 * 58 modülün 58'i `cümle kurma 0` veriyordu, yani kapı tasarım gereği
 * kırmızıydı ve gerçek bir kusuru örtecek durumdaydı.
 *
 * Saplama veritabanına yayın hattını öğretmek (sürüm, madde, gövde, gzip)
 * yayın betiğini ikinci kez yazmak olurdu. Onun yerine paket OKUYUCUSU
 * saplanıyor ve KAYNAKTAN besleniyor — doğrulama betiklerinin geri kalanı
 * zaten aynısını yapıyor (`module-content-source`). Kuru provanın sorusu
 * "kâğıt kurulabiliyor mu", "yayın hattı çalışıyor mu" değil; onu
 * `test:content-db` soruyor.
 *
 * Yalnız `lessons/*` paketi doldurulıyor: kurucunun okuduğu tek paket o.
 * Beceri bankası (seviye sınavının okuma/dinlemesi) statik içe alımla
 * geliyor, anadil sözlüğü ise kuru provada hiç açılmıyor (profil yok →
 * anadil Türkçe → çevirici kâğıda dokunmuyor).
 */
import { sourceLessonsFor } from "../src/lib/lessons/source";
import type { PackCourse } from "../src/lib/content/packs";

/** `lessons/de-a1` → { course: "de", level: "A1" } */
function parseLessonPack(pack: string): { course: PackCourse; level: string } | null {
  const m = /^lessons\/(de|en)-([abc][12])$/.exec(pack);
  return m ? { course: m[1] as PackCourse, level: m[2].toUpperCase() } : null;
}

export async function packItems<T>(pack: string): Promise<T[]> {
  const at = parseLessonPack(pack);
  if (!at) return [];
  /* Paket kursu HEDEF DİLE göre (`packCourseOf`), ders alanı ise kursun
     kendisine: Züritüütsch dersleri Almanca pakette duruyor. Kuru provada
     ikisi de kâğıdı etkilemiyor, yine de süzgeç aynı kuralı taşıyor. */
  return sourceLessonsFor(at.course).filter((l) => l.level === at.level) as unknown as T[];
}

export async function packItemsAt<T>(_release: number, pack: string): Promise<T[]> {
  return packItems<T>(pack);
}

export async function packItemsAll<T>(packList: string[]): Promise<T[]> {
  const out: T[] = [];
  for (const pack of packList) out.push(...(await packItems<T>(pack)));
  return out;
}

/** Anadil sözlüğü kuru provada okunmuyor; "yayın yok" doğru cevap. */
export async function packObject<T>(pack: string): Promise<Record<string, T> | null> {
  void pack;
  return null;
}

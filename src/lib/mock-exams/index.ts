export * from "./types";

/**
 * DENEME SINAVI — SAF KATMAN (tip ve hesap).
 *
 * Kâğıtların kendisi burada DEĞİL. Üç ayrı yerde duruyorlar ve ayrım bilinçli:
 *
 *   ./types    tipler, etiketler, süre hesabı — istemci de okuyor
 *   ./source   elle yazılmış kâğıtlar; yalnız doğrulama betikleri ve yayın
 *   ./serve    yayın hattından okuma; `server-only`
 *
 * Bu dosya İSTEMCİ BİLEŞENLERİ tarafından da içe alınıyor (deneme oynatıcısı
 * tipleri ve `taskSeconds`ı buradan alıyor), o yüzden veritabanına bakan
 * hiçbir şey buraya girmiyor. Girdiğinde derleme "'server-only' cannot be
 * imported from a Client Component" diye kırılıyor — ölçüldü.
 */

/**
 * Kursun deneme sınavı KATALOĞU var mı.
 *
 * Seviyeden bağımsız ve AĞA ÇIKMIYOR: kâğıdı olan kurslar kapalı bir liste ve
 * bu soru Öğren merkezindeki kama çizilirken her istekte soruluyor. Yeni bir
 * kursa kâğıt yazıldığında buraya da eklenecek — eklenmezse o kursta kama hiç
 * görünmez.
 *
 * Mobil karşılığı `mobile/src/data/exams/index.ts` `supportsMockExams`.
 */
const MOCK_COURSES = ["de", "en"];

export function supportsMockExams(course: string): boolean {
  return MOCK_COURSES.includes(course);
}

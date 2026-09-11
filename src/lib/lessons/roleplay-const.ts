/**
 * Rol yapma sınavının sabitleri (WP-22) — istemciye de iniyor, o yüzden
 * `server-only` olan roleplay.ts'den ayrı.
 */
export const EXAM_TURNS = 5;
export const EXAM_SECONDS = 180;

/**
 * Geçme eşiği — bütünsel puan yüzdesi.
 *
 * Sayı hiçbir yerde sabit değildi: iki platformun ekranı `overall >= 60` diye
 * ELLE karşılaştırıyordu ve eşiği söyleyen cümle ("eşiğin altında (60)") altı
 * sözlük dizgesinde ayrıca yazılıydı. Sekiz yer; biri değişse ötekiler
 * sessizce eski kalır, kullanıcı geçtiğini sandığı bir sınavı geçemezdi.
 */
export const EXAM_PASS_SCORE = 60;

/** Rol yapmada bir dersin isteyebileceği en çok tur (bkz. LessonRoleplay.minTurns). */
export const MAX_MIN_TURNS = 9;

/**
 * Ders adımında bir öğrencinin deneme hakkı.
 *
 * Sayı hiçbir yerde sabit değildi: iki oynatıcı da `>= 3` diye ELLE
 * karşılaştırıyordu (`lesson-player` `attempts`, Android `LessonScreen`
 * `tries`). Biri değişse öteki sessizce eski kalır ve aynı ders iki
 * platformda farklı sayıda hak verirdi.
 *
 * Mobil karşılığı `mobile/src/lib/learningRules.ts` `LESSON_TRY_CEILING`.
 */
export const LESSON_TRY_CEILING = 3;

/**
 * Sunucuya taşınan geçmiş mesaj sayısı.
 *
 * Sabit 16'ydı ve tur sayısı dörtken sorun değildi. Dokuz tura çıkınca sessiz
 * bir kırılma oldu: dokuzuncu turda dizi 19 mesaja ulaşıyor, son 16'ya
 * kırpılınca açılış düşüyor ve sunucudaki `userTurns` sayımı EKSİK çıkıyordu.
 * Sonuç, düzeltilmeye çalışılan kusurun ta kendisi — model kapanış fazına hiç
 * geçmiyor, konuşma asılı bir sorunun üstünde bitiyordu.
 *
 * Bu yüzden sayı artık türetiliyor: en uzun konuşma (açılış + dokuz tur
 * karşılıklı) 19 mesaj; iki mesajlık pay güvenlik için.
 */
export const MAX_HISTORY = MAX_MIN_TURNS * 2 + 3;

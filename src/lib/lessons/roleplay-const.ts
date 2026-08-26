/**
 * Rol yapma sınavının sabitleri (WP-22) — istemciye de iniyor, o yüzden
 * `server-only` olan roleplay.ts'den ayrı.
 */
export const EXAM_TURNS = 5;
export const EXAM_SECONDS = 180;

/** Rol yapmada bir dersin isteyebileceği en çok tur (bkz. LessonRoleplay.minTurns). */
export const MAX_MIN_TURNS = 9;

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

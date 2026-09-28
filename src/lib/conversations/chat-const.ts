/**
 * Puanlı kısmın sabitleri (WP-22) — istemciye de iniyor, o yüzden
 * `server-only` olan chat.ts'den ayrı.
 */
export const SCORED_TURNS = 5;
export const SCORED_SECONDS = 180;

/**
 * Geçme eşiği — bütünsel puan yüzdesi.
 *
 * Sayı hiçbir yerde sabit değildi: iki platformun ekranı `overall >= 60` diye
 * ELLE karşılaştırıyordu ve eşiği söyleyen cümle ("eşiğin altında (60)") altı
 * sözlük dizgesinde ayrıca yazılıydı. Sekiz yer; biri değişse ötekiler
 * sessizce eski kalır, kullanıcı geçtiğini sandığı bir sınavı geçemezdi.
 */
export const SCORED_PASS_SCORE = 60;

/** Sohbette bir konuşmanın isteyebileceği en çok tur (bkz. ConversationChat.minTurns). */
export const MAX_MIN_TURNS = 9;

/**
 * Konuşma adımında bir öğrencinin deneme hakkı.
 *
 * Sayı hiçbir yerde sabit değildi: iki oynatıcı da `>= 3` diye ELLE
 * karşılaştırıyordu (`conversation-player` `attempts`, Android `ConversationScreen`
 * `tries`). Biri değişse öteki sessizce eski kalır ve aynı konuşma iki
 * platformda farklı sayıda hak verirdi.
 *
 * Mobil karşılığı `mobile/src/lib/learningRules.ts` `CONVERSATION_TRY_CEILING`.
 */
export const CONVERSATION_TRY_CEILING = 3;

/**
 * Konuşmanın "geçildi" sayılma eşiği: anlatımın puanlanan adımlarında
 * (üretim + doğru/yanlış) ilk denemede doğru oranı.
 *
 * Sayı `lib/conversations/progress` içinde sunucuya gömülüydü ve istemci onu
 * bilmiyordu: özet `passed === false` gördüğünde SEBEBİNİ bilemiyor, her
 * olumsuz hükmü "asgari tur dolmadı" diye okuyordu (denetim T16: 10/9 turla
 * biten konuşma "en az 9 tur gerekiyor" dedi, asıl sebep 2/3 isabetti). Sabit
 * burada, çünkü bu dosya istemciye de iniyor; sunucu da buradan okuyor.
 *
 * "Geçildi" yalnız TEKRAR MERDİVENİNİ yürütüyor (bkz. `recordConversation`):
 * Patika adımı `chatDone`a, günlük görev "bugün bir kayıt var mı"ya, XP
 * isabete bakıyor. Eşiğin altında kalan konuşma sayılıyor; yalnız aralığı
 * uzamıyor.
 *
 * Mobil karşılığı `mobile/src/lib/learningRules.ts` `CONVERSATION_PASS_RATIO`.
 */
export const CONVERSATION_PASS_RATIO = 0.7;

/**
 * Eşiği geçmek için gereken en az doğru sayısı.
 *
 * Oran sunucudaki karşılaştırmanın (`correct / total >= oran`) AYNISIYLA
 * sayılıyor, çarpıp yuvarlayarak değil: 0,7 × 3 kayan noktada 2,0999… ve
 * yuvarlama hatası özete sunucunun vermediği bir hüküm yazdırırdı. Üç
 * puanlı adımlı konuşmada gereken 3/3 — tek hata eşiğin altında bırakıyor.
 */
export function conversationPassNeed(total: number): number {
  for (let k = 0; k <= total; k++) if (k / total >= CONVERSATION_PASS_RATIO) return k;
  return total;
}

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

/**
 * Web'e ÖZEL arayüz metinleri — mobilde karşılığı olmayan ekranların anahtarları.
 *
 * Buraya yalnız web'de var olan yüzeylerin metni girer (açılış sayfası, yönetim
 * ekranı, kurulum rehberi, hayatta kalma modu gibi). Mobilde de olan bir metin
 * BURAYA yazılmaz: onun yeri `mobile/src/i18n/tr.ts` ve oradan
 * `scripts/i18n-pull.mjs` ile geliyor. İki yerde birden tanımlı bir anahtarda
 * bu dosya kazanır (bkz. lib/i18n/dict.ts) — yani yanlışlıkla kopyalanan bir
 * anahtar sessizce mobilden ayrışır.
 */
export const trWeb: Record<string, string> = {
  /*
   * Kahraman kartındaki iki rozet. Mobilde bu iki metin ekranın İÇİNDE sabit
   * yazılı (`M/src/screens/LearnScreen.tsx`) — yani orada da çevrilmiyor.
   * Anahtar burada açıldı; mobil tarafa da taşınması gereken bir eksik.
   */
  "learn.due_count": "{n} tekrar",
  "learn.new_count": "{n} yeni",
  /* Hayatta kalma modu web'e özel: mobilde böyle bir mod yok. */
  "learn.survival": "Hayatta kalma",
  "learn.survival_pitch": "40 sn · süre bitene kadar",
  /*
   * Süre birimi. Dakika için paylaşılan `skills.dk` var; saatli biçimin
   * anahtarı yoktu — mobilde `formatDuration` "3s 20dk" diye SABİT yazıyor,
   * yani orada da çevrilmiyor. Web bunu anahtara bağladı; mobil tarafın da
   * kapatması gereken bir eksik.
   */
  "common.hours_minutes": "{h} sa {m} dk",
  "common.hours": "{h} sa",
  /*
   * Günün görevleri. Etiketler SUNUCUDA Türkçe sabit yazılıydı ve API'den öyle
   * geliyordu — yani mobil uygulama da, arayüzü İngilizce ya da Almanca olsa
   * bile, görevleri Türkçe gösteriyordu. Anahtar sunucuda çözülüyor (bkz.
   * lib/quests.ts): tek değişiklik iki platformu birden düzeltiyor, mobilin
   * yayınlanmış sürümleri dâhil.
   */
  "quest.reviews10": "10 kelime tekrar et",
  "quest.reviews25": "25 kelime tekrar et",
  "quest.newWords3": "3 yeni kelime öğren",
  "quest.artikel5": "5 artikel doğru bil",
  "quest.listen5": "5 kelimeyi duyarak bul",
  "quest.daily": "Günün turunu oyna",
  "quest.skill1": "Bir beceri alıştırması bitir",
  "quest.lesson1": "Bir konuşma tamamla",
  "quests.resets_midnight": "gece yarısı yenilenir",
  "quests.all_three_done": "Günün üçü de tamam",
  "quests.all_three_done_sub": "Üçünü birden bitirdin",
  /*
   * Başarımlar. Metin SUNUCUDA Türkçe sabit yazılıydı ve `/api/achievements`
   * öyle dönüyordu — yani mobil uygulama da rozetleri Türkçe gösteriyordu.
   * Görev etiketleriyle aynı desen, aynı çözüm: anahtar sunucuda çözülüyor.
   */
  "ach.streak3.title": "İlk kıvılcım",
  "ach.streak3.hint": "3 gün üst üste çalış",
  "ach.streak7.title": "Bir hafta",
  "ach.streak7.hint": "7 gün üst üste çalış",
  "ach.streak30.title": "Alışkanlık",
  "ach.streak30.hint": "30 gün üst üste çalış",
  "ach.streak100.title": "Yüz gün",
  "ach.streak100.hint": "100 gün üst üste çalış",
  "ach.streak365.title": "Bir yıl",
  "ach.streak365.hint": "365 gün üst üste çalış",
  "ach.words50.title": "Elli kelime",
  "ach.words50.hint": "50 kelimeyi pekiştir",
  "ach.words250.title": "Küçük sözlük",
  "ach.words250.hint": "250 kelimeyi pekiştir",
  "ach.words1000.title": "Bin kelime",
  "ach.words1000.hint": "1.000 kelimeyi pekiştir",
  "ach.words3000.title": "Kelime hazinesi",
  "ach.words3000.hint": "3.000 kelimeyi pekiştir",
  "ach.answers500.title": "Beş yüz cevap",
  "ach.answers500.hint": "500 soruyu doğru bil",
  "ach.answers2500.title": "İki bin beş yüz",
  "ach.answers2500.hint": "2.500 soruyu doğru bil",
  "ach.answers10000.title": "On bin cevap",
  "ach.answers10000.hint": "10.000 soruyu doğru bil",
  "ach.artikel300.title": "Artikel avcısı",
  "ach.artikel300.hint": "300 artikeli doğru bil",
  "ach.listen200.title": "Kulak dolgunluğu",
  "ach.listen200.hint": "200 kelimeyi duyarak bul",
  "ach.typing200.title": "Parmak hafızası",
  "ach.typing200.hint": "200 kelimeyi sıfırdan yaz",
  "ach.order150.title": "Cümle mimarı",
  "ach.order150.hint": "150 cümleyi doğru diz",
  "ach.plural150.title": "Çoğul ustası",
  "ach.plural150.hint": "150 çoğul biçimi doğru bil",
  "ach.speak100.title": "Ekransız",
  "ach.speak100.hint": "Yürürken modunda 100 kelimeyi sesli söyle",
  "ach.speak500.title": "Ağızdan çıkan",
  "ach.speak500.hint": "Yürürken modunda 500 kelimeyi sesli söyle",
  "ach.translate200.title": "Çevirmen",
  "ach.translate200.hint": "200 cümleyi doğru çevir",
  "ach.allGames.title": "Hepsini denedin",
  "ach.allGames.hint": "On bir oyunun hepsinde en az bir doğru yap",
  "ach.drill50.title": "Biçim bilgisi",
  "ach.drill50.hint": "50 dilbilgisi maddesini pekiştir",
  "ach.drill250.title": "Tablolar ezberde",
  "ach.drill250.hint": "250 dilbilgisi maddesini pekiştir",
  "ach.drill1000.title": "Çekim ustası",
  "ach.drill1000.hint": "1.000 dilbilgisi maddesini pekiştir",
  "ach.lesson1.title": "İlk konuşma",
  "ach.lesson1.hint": "Bir konuşmayı rol yapmayla birlikte bitir",
  "ach.lesson10.title": "Bir modül",
  "ach.lesson10.hint": "10 konuşma tamamla",
  "ach.lesson50.title": "Yarı yol",
  "ach.lesson50.hint": "50 konuşma tamamla",
  "ach.lesson100.title": "Bir seviye",
  "ach.lesson100.hint": "100 konuşma tamamla",
  "ach.boss1.title": "Modül fatihi",
  "ach.boss1.hint": "Bir modül sınavını süre bitmeden geç",
  "ach.boss10.title": "Sınav ustası",
  "ach.boss10.hint": "10 modül sınavını geç",
  "ach.exam1.title": "İlk sınav",
  "ach.exam1.hint": "Bir sınavı tamamla",
  "ach.exam10.title": "Sınav rutini",
  "ach.exam10.hint": "10 sınav tamamla",
  "ach.exam90.title": "Neredeyse kusursuz",
  "ach.exam90.hint": "Bir sınavdan 90 puan al",
  "ach.skill1.title": "Dört beceri",
  "ach.skill1.hint": "Bir beceri alıştırmasını bitir",
  "ach.skill10.title": "Okur yazar",
  "ach.skill10.hint": "10 beceri alıştırmasını bitir",
  "ach.skill40.title": "Dört koldan",
  "ach.skill40.hint": "40 beceri alıştırmasını bitir",
  "ach.writing1.title": "İlk yazın",
  "ach.writing1.hint": "Bir yazını değerlendirt",
  "ach.writing15.title": "Kalem alışkanlığı",
  "ach.writing15.hint": "15 yazı değerlendirt",
  "ach.writing85.title": "Temiz kalem",
  "ach.writing85.hint": "Bir yazından 85 puan al",
  "ach.speaking25.title": "Sesli düşünen",
  "ach.speaking25.hint": "25 konuşma ya da rol yapma değerlendirt",
  "ach.daily1.title": "Günün turu",
  "ach.daily1.hint": "Günün turunu bir kez oyna",
  "ach.daily10.title": "Her gün aynı saat",
  "ach.daily10.hint": "Günün turunu 10 kez oyna",
  "ach.daily50.title": "Turun müdavimi",
  "ach.daily50.hint": "Günün turunu 50 kez oyna",
  "ach.dailyPerfect.title": "Günü kusursuz",
  "ach.dailyPerfect.hint": "Günün turunu hatasız bitir",
  "ach.challenge500.title": "Hayatta kaldın",
  "ach.challenge500.hint": "Hayatta kalma turunda 500 puan",
  "ach.challenge1500.title": "Soğukkanlı",
  "ach.challenge1500.hint": "Hayatta kalma turunda 1.500 puan",
  "ach.challenge3000.title": "Zamana karşı",
  "ach.challenge3000.hint": "Hayatta kalma turunda 3.000 puan",
  "ach.night50.title": "Gece kuşu",
  "ach.night50.hint": "Gece yarısıyla 05:00 arası 50 soru cevapla",
  "ach.early50.title": "Erken kalkan",
  "ach.early50.hint": "05:00 ile 08:00 arası 50 soru cevapla",
  "ach.marathon150.title": "Maraton",
  "ach.marathon150.hint": "Tek günde 150 tekrar yap",
  "ach.days30.title": "Sadık",
  "ach.days30.hint": "30 farklı gün çalış",
  "ach.days100.title": "Demirbaş",
  "ach.days100.hint": "100 farklı gün çalış",
  "ach.bilingual.title": "İki kurs",
  "ach.bilingual.hint": "Hem Almanca hem Zürihçe kursunda çalış",
  "ach.quests20.title": "Günü kapatan",
  "ach.quests20.hint": "20 gün, günün üç görevini de bitir",
  /*
   * Yetkinlik panosu ve gelişim raporu. Bant adları TİPİN İÇİNDE Türkçe
   * sözcüklerdi ("başlangıç" | "gelişiyor" | …), yani tip sistemi bir dili
   * dayatıyordu. Artık kararlı kimlik + sözlük.
   */
  "band.beginner": "başlangıç",
  "band.developing": "gelişiyor",
  "band.solid": "sağlam",
  "band.mastered": "ustalaştı",
  "growth.first_good_writing": "İlk 70+ puanlı yazı",
  "growth.first_lesson": "İlk konuşma rol yapmayla tamamlandı",
  "growth.last_week": "Geçen hafta: {parts}.",
  "growth.last_week_empty": "Geçen hafta çalışma yok — bu hafta küçük bir turla başla.",
  "proficiency.not_measured": "{skill} {level} henüz ölçülmedi",
  "proficiency.grammar_practice": "Dilbilgisi çalışması",
  "proficiency.next_conversation": "sıradaki konuşma",
  "plan.word_round": "Kelime turu",
};

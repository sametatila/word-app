/**
 * PROFİL ALANLARININ SINIRLARI — uç ile arayüzün tek ortak kaynağı.
 *
 * Aynı üç sınır beş yerde yazılıydı: uç (`api/profile` `clampInt`/`slice`),
 * web ayar formundaki iki kaydırıcı ve ad kutusu, mobilin aynı üç kutusu.
 * Beşi de aynıydı; biri değişse ötekiler sessizce eski kalır ve kullanıcı
 * **seçebildiği** bir değerin kaydedilmediğini görürdü — arayüz kabul ediyor,
 * uç kırpıyor.
 *
 * Mobil bu dosyayı içe aktaramıyor (ayrı paket); orada aynı sayılar
 * `lib/profileDefaults` içinde duruyor ve `check:parity` ikisini
 * karşılaştırıyor.
 */
export const PROFILE_LIMITS = {
  /** Günlük tekrar hedefi. */
  dailyGoal: { min: 5, max: 120 },
  /** Günde yeni kelime — sıfır geçerli: "yeni kelime istemiyorum". */
  newPerDay: { min: 0, max: 40 },
  /** Görünen adın karakter sınırı. */
  displayNameMax: 40,
} as const;

/**
 * HATIRLATMA SAATİ SEÇENEKLERİ — üç yerin tek ortak kaynağı.
 *
 * Aynı liste üç yerde ayrı yazılıydı ve ÜÇÜ AYNI DEĞİLDİ: web ayarları ve
 * mobil `NotificationsScreen` beş saat sunuyordu (9/12/15/19/21), mobilin
 * bildirim izni ekranı ise üç saat — ve ikisi listede YOKTU (13:00 ve
 * 20:00). "Öğle" ya da "Akşam" seçen kullanıcı sonra ayarları açtığında
 * günlük hatırlatmayı AÇIK, saat çiplerinin hiçbirini seçili görmüyordu:
 * kendi seçtiği saat orada teklif bile edilmiyordu. Erişilebilirlik tarafında
 * da kusur — değeri olan bir `radiogroup`ta hiçbir seçenek `aria-checked`
 * değil.
 *
 * İzin ekranının üç seçeneği artık bu listenin üç elemanı (sabah, öğle,
 * akşam). Mobil bu dosyayı içe aktaramıyor; karşılığı `lib/profileDefaults`
 * ve `check:parity` ikisini karşılaştırıyor.
 */
export const REMINDER_HOURS = [9, 12, 15, 19, 21] as const;

/**
 * BİLDİRİM İZNİ ERTELEME PENCERESİ — gün.
 *
 * Kartı kapatan ("sonra") kullanıcıya soru üç hafta sonra yeniden geliyor:
 * izin bir kere reddedilirse tarayıcıda kalıcıdır, o yüzden soru ısrarla
 * değil ARALIKLA sorulmak zorunda.
 *
 * Sayı burada, çünkü mobil AYNI kararı veriyor ve orada KALICI bir bayrakla
 * veriliyordu: "Belki sonra"ya basan biri bildirim iznini bir daha HİÇ
 * teklif edilmeden kullanıyordu — webde aynı kullanıcıya 21 gün sonra
 * yeniden soruluyor. Mobil karşılığı `mobile/src/lib/profileDefaults`
 * `PUSH_PRIME_SNOOZE_DAYS`; `check:parity` ikisini karşılaştırıyor.
 */
export const PUSH_PRIME_SNOOZE_DAYS = 21;

/** İzin ekranının sabah / öğle / akşam seçenekleri — listenin kendi elemanları. */
export const PRIME_HOURS = { morning: REMINDER_HOURS[0], midday: REMINDER_HOURS[1], evening: REMINDER_HOURS[3] } as const;

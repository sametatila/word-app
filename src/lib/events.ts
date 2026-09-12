import "server-only";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";

/**
 * Ürün olayları.
 *
 * Bugüne kadarki kararlar ölçümle alındı ama ölçülebilen yalnızca ARDINDA iz
 * bırakan şeylerdi: cevaplar, dersler, XP. Görülemeyen sorular tam da en çok
 * merak edilenlerdi — kaç kişi başlangıç kartını görüp hiç başlamadan çıktı,
 * hangi sekmeye hiç dokunulmadı, bildirime tıklayıp gelen kaç kişi tur bitirdi.
 *
 * Liste bilerek SABİT. Serbest olay adı kabul edilseydi tablo altı ayda
 * kimsenin ne anlama geldiğini bilmediği yüzlerce adla dolardı; kapalı liste
 * hem şemayı hem de sorguları okunur tutuyor.
 */
export const EVENT_NAMES = [
  "session_start", // tur başlatıldı
  "session_resume", // yarım tura devam edildi
  "stage_done", // beşli etap bitti (value = kaçıncı etap)
  "session_done", // tur tamamlandı (value = doğru sayısı)
  "session_stop", // etap sonunda "şimdilik yeter"
  "challenge_play", // hayatta kalma turu oynandı
  "walk_start", // yürürken (ekransız) modu başlatıldı (value = kaçıncı turdan)
  // Mikrofon gerçekte hangi kısıtlarla açıldı (value = yankı bastırma açık mı).
  // İstemek ile almak aynı şey değil: cihaz kısıtı sessizce yok sayabiliyor ve
  // yankı bastırma açık kalırsa Android ses ÇIKIŞINI konuşma yoluna alıyor,
  // yani turun tamamı bozuk duyuluyor. Ses kalitesi şikâyetinde bakılacak yer.
  "walk_capture",
  /*
    Yürüyüş NASIL bitti (value = sebep).

      1 kullanıcı "hayır" dedi        4 mikrofona ulaşılamadı
      2 tur kalmadı                   5 ekran kapandı, kayıt yolu yok
      3 duyulmama sınırı aşıldı       6 elle duraklatıldı / çıkıldı

    Sebebi olmayan bir bitiş, dışarıdan "takıldı"dan ayırt edilemiyor.
    Kullanıcı cepteki telefondan yalnızca sesi duyuyor ve bir daha hiçbir şey
    olmadığında bunun hangisi olduğunu söyleyemiyor — biz de tahmin ediyorduk.
  */
  "walk_end",
  /*
    Yürüyüşte her dinlemenin sonucu — hangi yol, ne oldu.

      kind  = "browser:ok" | "browser:no-speech" | "browser:aborted" |
              "browser:not-allowed" … | "<sağlayıcı>:ok" | "<sağlayıcı>:silent" |
              "<sağlayıcı>:empty" | "<sağlayıcı>:low_confidence" | "deadline"
      value = sunucuya giden ses, onda bir saniye (tarayıcı yolunda 0)

    "Web Speech gerçekten devrede mi, mikrofon tutulurken bozuluyor mu, Azure'a
    ne kadar ses gidiyor" soruları ancak buradan cevaplanıyor; tahminle değil.
  */
  "walk_listen",
  // Yakalama yolu değişti (value = 1 cebe geçti / 0 ekrana döndü, kind = sebep: hidden|visible|handoff).
  "walk_switch",
  "boss_play", // modül sınavına girildi (value = modül sırası)
  "boss_clear", // modül sınavı geçildi (value = kalan saniye)
  "quest_claim", // görev ödülü alındı
  "achievement_unlock", // rozet açıldı (value = rozet sayısı)
  /*
   * Bildirim izni hazırlık ekranı — YALNIZ MOBİL yazıyor
   * (`screens/NotifPrimeScreen`: value 1 saat seçildi / 0 atlandı, kind = saat).
   *
   * Sözlükte YOKTU ve uç bilinmeyen adı 204 ile sessizce düşürüyor
   * (`api/events`: `isEventName` geçmezse gövde hiç yazılmıyor). Yani mobilin
   * bu olayı hiç kaydedilmedi ve hiçbir yerde görünmedi.
   */
  "notif_prime",
  "nav", // sekme açıldı (value = sekme sırası)
  "push_open", // bildirimden gelindi
  "sound_toggle", // ses açıldı/kapandı (value = 1 açık, 0 kapalı)
  "invite_open", // davet bağlantısıyla gelindi
  "share", // sonuç paylaşıldı

  /*
    Öğrenme ölçümü (plan WP-00).

    Buraya kadarki olaylar ÜRÜNÜ ölçüyordu: kim nereye tıkladı, tur bitti mi.
    "Daha iyi öğreniyorlar mı" sorusu bunlarla cevaplanamıyordu; XP ve doğruluk
    öğrenme sonucunu değil çabayı ölçer. Aşağıdakiler sonuç olayları. Hepsinde
    `kind` kapalı sözlükten kısa bir etiket, `value` bir sayı; serbest metin
    (öğrencinin yazdığı cümle, konuşma dökümü) hiçbir zaman buraya yazılmaz —
    o içerik kendi tablosunda durur (`assessments`), burada yalnız puanı var.
  */
  /*
    Üretim görevi puanlandı; `value` = 0–100.

    `kind` YALNIZ DÖRT DEĞER ALIYOR ve bunu yazmak gerekiyor: bu satır uzun
    süre `translate|transform|free_sentence|writing_free|speaking_drill|roleplay`
    diye altı değer sayıyordu, oysa `translate` ve `transform` hiçbir yerde
    ÜRETİLMİYOR. Dört değerin tamamı tek yerden geliyor (`lib/assess`
    `productionKind`): serbest cümle, serbest yazma, konuşma alıştırması, rol
    yapma.
    Yani çeviri ve dönüştürme turları bu olayı hiç yazmıyor ve panonun
    "üretim görevleri" kırılımında (bkz. `lib/admin`, `kind`e göre gruplama)
    o iki satır hiç görünmüyor. Bunun sebebi ölçüm TANIMI: iki tur yerel
    hakemle de geçilebiliyor, yani puan her zaman 0–100 aralığında bir
    değerlendirmeden gelmiyor; "doğru=100/yanlış=0" yazmak ortalamayı bambaşka
    bir şeye çevirirdi. Karar ürün tarafında (bkz. web-parity §11.310).
  */
  "production_attempt",
  "exam_start", // sınava girildi (kind = sınav türü:seviye, örn. "level:B1")
  "exam_finish", // sınav bitti (kind = sınav türü:seviye, value = puan 0–100)
  "mock_exam_start", // deneme sınavı bölümü açıldı (kind = "B1:reading")
  "mock_exam_finish", // deneme sınavı bölümü bitti (kind = "B1:reading", value = puan 0–100)
  "placement_finish", // yerleştirme testi bitti (kind = bulunan seviye, value = puan 0–100)
  "error_recorded", // yanlış cevabın hata tipi (kind = ErrorType, bkz. lib/errors.ts)
  "feedback_why_opened", // "neden?" açıklaması açıldı (kind = ErrorType)
  "skill_finish", // beceri egzersizi bitti (kind = beceri:seviye, örn. "reading:A2", value = puan 0–100)
  "pronounce", // telaffuz puanı (kind = egzersiz kimliği, value = 0–100) — WP-20
  "srs_weight", // tekrar aralığına hata tipi ağırlığı uygulandı (kind = ErrorType, value = ağırlık×100) — WP-51 ölçümü

  /*
    Takip katmanı (WP-80): "veri yok" durumuna düşmemek için.

    Buraya kadar ölçülen şey TUR ve SONUÇ'tu. Ölçülmeyen: hangi ekrana ne kadar
    girildiği (alt gezinmeden çıkarılan ekranlar görünmez olmuştu), katlı
    bölümlerin açılıp açılmadığı, ders adımının sesle mi yazıyla mı geçildiği,
    söyleyişte öğrencinin kendi kararı, ayarların değişip değişmediği, cihaz,
    istemci hataları, bildirim hunisinin gönderim ucu. Aşağıdakiler bunlar.
    Ekran anahtarları `lib/screens.ts`'teki kapalı listeden.
  */
  "page_view", // ekran açıldı (kind = ekran anahtarı)
  "time_spent", // ekranda görünür geçen süre (kind = ekran anahtarı, value = saniye; ayrılırken yazılır)
  /*
   * Günün ilk açılışı. `kind` = platform:görünüm.
   *   platform: ios | android | desktop
   *   görünüm:  standalone (ana ekrana eklenmiş web) | browser | native
   *
   * `native` YEREL UYGULAMA ve sonradan eklendi: olay mobilde hiç
   * yazılmıyordu, oysa yönetim panosundaki PLATFORM TABLOSU yalnız bundan
   * doluyor (`lib/admin.ts`). Tabloyu okuyan biri yerel uygulamaların hiç
   * kullanıcısı olmadığını sanıyordu ve oradaki `ios`/`android` satırları
   * uygulamalar değil MOBİL TARAYICILARDI.
   *
   * value = ekran genişliği px.
   */
  "app_open",
  "client_error", // yakalanmamış istemci hatası (kind = ekran anahtarı, value = 1 hata sınırı / 0 pencere olayı; dakikada en çok bir)
  "panel_open", // katlı bölüm açıldı/kapandı (kind = bölüm: weak_detail | sheet:<tablo> | words_progress | single_game, value = 1 açık / 0 kapalı)
  "lesson_start", // ders başladı (kind = ders kimliği, value = 1 kaldığı yerden / 0 baştan)
  /* Ders adımı sonuçlandı. kind = adım:yol → repeat|produce|truefalse :
     mic|typed|tap|skip. value = 2 ilk denemede doğru / 1 sonraki denemede doğru
     / 0 geçilemedi ya da atlandı. `tap` doğru/yanlış adımının düğme yolu:
     eskiden o yol `inputMode`u değiştirmediği için "mic" diye sayılıyordu.
     `skip` yalnız webde var - Android'de adım atlama düğmesi yok. */
  "lesson_step",
  "lesson_finish", // ders bitti (kind = ders kimliği, value = puanlı adımlarda doğru yüzdesi; geçme user_lessons'ta)
  /* Onboarding adımı görüldü. value = adım sırası (platforma göre değişir), kind
     = adımın adı. Android: welcome | lang | course | level | goal. Web:
     welcome | motivation | level | goal | ready. Ortak kelimeler aynı soruyu
     anlatıyor - `goal` iki tarafta da GÜNLÜK HEDEF. Webin `pace` adı bu yüzden
     `goal` oldu ve güdü adımı `motivation`a taşındı: eskiden `goal` kovası iki
     ayrı soruyu topluyordu. Platforma özgü adımlar (Android lang/course, web
     motivation/ready) karşılıksız, çünkü akışlar gerçekten farklı. */
  "onboarding_step",
  // Giriş ÖNCESİ ısınma: hesap açmadan önce oynatılan beş kelime. Huni burada
  // kritik — kaç ziyaretçi ısınmayı görüyor, kaçı sonuna kadar gidiyor, kaçı
  // hesap açıyor. `first_practice` kelime başına (value = sıra),
  // `first_practice_done` bir kez (value = kelime sayısı).
  "first_practice",
  "first_practice_done",
  "onboarding_existing_account", // akıştan "zaten hesabım var" ile çıkıldı (kind = çıkılan adım, value = adım sırası)
  "coach_show", // koç balonu gösterildi (kind = an)
  "tts_play", // sesli okuma çalındı (kind = ekran anahtarı; ekran açılışı başına bir kez)
  "tts_fallback", // nöral ses çalınamadı, alt basamağa düşüldü (kind = basamak: element | browser; ekran açılışı başına bir kez)
  "search", // arama yapıldı (kind = words|cheatsheet, value = sorgu uzunluğu; ekran açılışı başına ilk)
  /* Ayar değişti. kind = alan: name | daily_goal | new_per_day | level | course |
     voice | theme | lang | remind_daily | remind_streak | remind_weekly. value =
     sayısal ayarlarda yeni değer, anahtarlarda 1 açık / 0 kapalı, temada
     0 açık / 1 koyu / 2 sistem, dilde `NATIVE_LANGS` sırası. Liste `lang` ve üç
     hatırlatma anahtarını saymıyordu; yazılan kind'lar sayılmadığında bu yorum
     sözlüğü okuyanı yanıltıyor. */
  "setting_change",
  "push_optin", // bildirim izni (value = 1 verildi / 0 reddedildi / 2 sonra dedi)
  "install_prompt", // ana ekrana ekleme (value = 1 eklendi / 0 reddedildi / 2 iOS ipucu gösterildi)
  /*
   * Bildirim HUNİSİ üç basamak ve üçü ayrı ayrı yazılıyor. Eskiden iki
   * basamak vardı ve ortadaki eksikti: `push_sent` "denedik" demek, ama
   * `social/notify` onu YALNIZ TESLİMAT OLUNCA yazıyordu. Yani aynı olay iki
   * yerde "denendi", bir yerde "ulaştı" anlamına geliyordu ve pano üçünü
   * topluyordu - sayı hiçbirini söylemiyordu. Üstelik "CTR" etiketi
   * açılan/DENENEN oranını gösteriyordu; teslim edilmeyen bildirim CTR'yi
   * haksız yere düşürüyordu.
   */
  "push_sent", // DENENDİ: sunucu göndermeye çalıştı (kind = reminder|summary|social:<tür>)
  "push_deliver", // ULAŞTI: kaç kanala teslim edildi (value = kanal sayısı, kind aynı)
  /*
   * Giden e-postanın sonucu (kind = `<tür>:<sonuç>`, value = 1 gitti / 0 gitmedi).
   *   tür:   verify | reset | pw_changed | exists | twofa
   *   sonuç: ok | fail | cap
   *
   * NEDEN OLAY: e-posta gönderimi yalnız `console.error`a düşüyordu. Oysa
   * doğrulama postası ZORUNLU bir kapı - SMTP sağlayıcısı reddetmeye
   * başladığında (kota, alan adı, kimlik) her yeni kayıt kalıcı olarak
   * kilitli kalıyor ve tek iz kimsenin grep'lemediği bir sunucu log satırı
   * oluyordu. `cap` de sessizdi: alıcı başına saatlik tavan postayı düşürüyor
   * ve kullanıcı hiç gelmeyen bir postayı bekliyordu.
   */
  "mail_sent",

  /*
    Dönüşüm hunisi — premium (WP-90, dönüşüm planı §4).

    "Paywall'ı gören kaç kişi satın aldı" sorusu ancak buradan cevaplanır:
    paywall_view (kind = nereden gelindi: exam|walk|limit|profile|nav) →
    purchase_start (plan seçildi, kind = monthly|yearly) → purchase_done
    (kind = plan, value = aylık kuruş). premium_gate ise bir premium özelliğin
    kilide takıldığı an — paywall'ı hangi kısıt besliyor, oradan görülür.

    KIND SUNUCUNUN KENDİ SÖZLÜĞÜNDEN: `lib/premium/gates` `PremiumGate` —
    mock_exam · weekly_exam · pocket_walk · speaking · writing. Burada önce
    uydurma bir liste yazılıydı (speaking|exam_full|unlimited_tour) ve olay
    ZATEN hiç gönderilmiyordu: iki platform da adı kayıt defterine yazmış,
    çağırmayı unutmuştu (bkz. web-parity §11.211).
  */
  "paywall_view", // paywall açıldı (kind = kaynak)
  "premium_gate", // premium özellik kilide takıldı (kind = özellik)
  "purchase_start", // satın alma başladı (kind = plan)
  "purchase_done", // satın alma tamamlandı (kind = plan, value = aylık kuruş)
  /*
    Sosyal katman (docs/plan/social.md). Huni: arkadaş isteği → kabul →
    tepki/dürtme/görev. "Arkadaşı olan kullanıcı daha çok kalıyor mu" sorusu
    ancak bu olaylar `session_done` ile yan yana konunca cevaplanır.
  */
  "friend_request", // arkadaşlık isteği gönderildi
  "friend_accept", // istek kabul edildi
  "reaction_send", // bir akış olayına tepki verildi (kind = tepki türü)
  "nudge_send", // arkadaş dürtüldü (kind = remind|cheer)
  "quest_invite", // ortak görev daveti gönderildi
  "quest_complete", // ortak görev tamamlandı (value = hedef XP)
  "feed_view", // arkadaş akışı açıldı (value = gösterilen olay sayısı)
  "block_user", // kullanıcı engellendi
  "social_settings", // kullanıcı adı/görünürlük değişti (kind = alan)
  "league_up", // bir üst lige yükseldi (value = yeni lig, kind = lig slug'ı)
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const VALID = new Set<string>(EVENT_NAMES);

export function isEventName(name: string): name is EventName {
  return VALID.has(name);
}

/**
 * `kind` etiketi: küçük harf, rakam, alt çizgi, iki nokta, tire; en çok 32
 * karakter. Bu bir serbest metin alanı DEĞİL — oyun adı, hata tipi, "level:B1"
 * gibi kapalı sözlük etiketleri için var. Uymayan değer sessizce düşer; olay
 * yine yazılır çünkü etiket bilgi katmanı, olayın kendisi değil.
 *
 * BU KARAKTER KÜMESİ GİZLİLİK POLİTİKASINDA VERİLMİŞ BİR SÖZ (§8). Etiketin
 * ne olabileceğini o cümle tarif ediyor; kümeyi genişletmek politikayı
 * değiştirmek demektir. Küme boşluk, nokta, "@" ve "+" kabul etmediği için
 * e-posta, bağlantı ve ayraçlı telefon numarası yazılamıyor.
 */
const KIND_RE = /^[a-z0-9_:-]{1,32}$/i;

/**
 * Salt rakamdan oluşan etiket reddediliyor: hiçbir meşru etiket çıplak bir
 * sayı değil (egzersiz kimlikleri "a1-l1" biçiminde, oyun ve ekran adları
 * harfli), buna karşılık ayraçsız bir telefon numarası karakter kümesinden
 * geçebiliyordu. Kümenin tek açık kalan kişisel-veri şekli buydu.
 */
const DIGITS_ONLY = /^\d+$/;

export function cleanKind(kind: unknown): string | null {
  if (typeof kind !== "string") return null;
  const k = kind.trim();
  if (!KIND_RE.test(k)) return null;
  return DIGITS_ONLY.test(k) ? null : k;
}

/**
 * Bir olayı yazar.
 *
 * Hiçbir zaman hata fırlatmıyor: ölçüm, ölçtüğü şeyi bozmamalı. Olay
 * yazılamadığında kaybedilen tek şey bir satırlık istatistiktir; kullanıcının
 * turu bundan etkilenmemeli.
 */
export async function track(
  userId: string,
  name: EventName,
  day: string,
  value = 0,
  kind?: string | null,
): Promise<void> {
  try {
    await db
      .insert(events)
      .values({ userId, name, day, value: Math.round(value), kind: cleanKind(kind) });
  } catch (err) {
    console.error("[events] yazılamadı", name, err);
  }
}

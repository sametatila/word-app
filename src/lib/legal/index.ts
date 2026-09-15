/**
 * Hukuki metinlerin tek kaynağı: kimlik bilgileri, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı.
 *
 * KİMLİK: İKİ TARAF, İKİ AYRI ROL
 *
 * Roller eskiden tek kişide toplanıyordu; artık ayrı:
 *
 *   - VERİ SORUMLUSU (controller*): amaç ve araçlara karar veren, Almanya'da
 *     yerleşik gerçek kişi. Veri koruma yükümlülüğü onda.
 *   - YAYINCI (publisher*): uygulamayı Google Play'de ve App Store'da
 *     yayımlayan, mağazalardan ödeme alan ve Türkiye'de vergilenen gerçek
 *     kişi. Veri sorumlusunun talimatıyla hareket eden VERİ İŞLEYEN sıfatını
 *     da taşıyor (Play Console ve App Store Connect'te sipariş, abone ve yorum
 *     verisine erişim). Aralarında GDPR m.28 / KVKK m.12 işleme sözleşmesi
 *     gerekiyor.
 *
 * Bu ayrımın iki büyük sonucu var ve ikisi de birbirinin aynası:
 *
 *   1. Veri sorumlusu AB'de yerleşik olduğu için GDPR m.3(1) üzerinden
 *      uygulanıyor, m.3(2) üzerinden değil. m.27 AB TEMSİLCİSİ YÜKÜMLÜLÜĞÜ YOK
 *      (m.27 yalnız m.3(2) hâlinde işliyor). Denetim otoritesi, yerleşim yerine
 *      göre Kuzey Ren-Vestfalya (LDI NRW).
 *   2. Buna karşılık veri sorumlusu Türkiye'de YERLEŞİK DEĞİL ve Türkiye'deki
 *      başvurular için bir veri sorumlusu temsilcisi belirlenmiştir (yayıncı).
 *      VERBİS kaydı YAPILMAYACAK: yıllık çalışan sayısı 50'den az ve mali
 *      bilanço eşiğinin altında kalan veri sorumluları Kurul kararlarıyla kayıt
 *      yükümlülüğünden istisna tutuluyor. Bu istisnanın yurt dışında yerleşik
 *      veri sorumlusuna da uygulanıp uygulanmadığı tartışmalı; karar bilinçli
 *      alındı ve metin kayıtlı olduğunu İDDİA ETMİYOR — yalnız temsilciyi
 *      gösteriyor. Kayıt yapılırsa bu not ve metin birlikte güncellenir.
 *
 * Vergi tarafı yayıncıya ait: Gelir Vergisi Kanunu mükerrer m.20/B'deki mobil
 * uygulama geliştiriciliği kazanç istisnası, platformdan kazancı elde eden kişiye
 * uygulanır. İstisnanın koşulları (Türkiye'de banka hesabı, hasılatın yalnız o
 * hesaptan tahsili, istisna belgesi, GVK m.103 dördüncü dilim sınırı) mali
 * müşavirle doğrulanır; istisna yalnız Play/App Store kazancını kapsar.
 *
 * TCKN/VKN buraya YAZILMAZ: sayfalar herkese açık, kimlik numarası yayımlamak
 * kimlik hırsızlığına davetiye. Tanıtıcı bilgi için ad, adres, vergi dairesi ve
 * iletişim kanalı yeterli. Doldurulmamış alanlar [[...]] biçiminde kalır ve
 * sayfalarda vurguyla basılır (bkz. legal-shell Ph).
 */
import { SPEECH_LOG_RETENTION_DAYS } from "@/lib/lessons/log-const";
import { SESSION_MAX_DAYS } from "@/lib/auth/session-config";
import { DAILY_QUOTAS } from "@/lib/quotas";
/**
 * Yürürlük tarihi ve sürüm. İkisi de EN YENİ değişikliği anlatır ve
 * LEGAL_CHANGELOG'un ilk kaydıyla aynı olmak zorundadır — kapı
 * `scripts/test-legal.ts`.
 *
 * SÜRÜM GEÇMİŞİ 2026-09-09'DA SIFIRLANDI, ve bu bilinçli.
 *
 * Numara 1.1'den 1.3.1'e kadar yürümüştü ama o yürüyüşün tamamı geliştirme
 * sırasında oldu. Kayıtların anlattığı değişikliklerin çoğu HENÜZ YAYINDA
 * OLMAYAN özelliklerin maddeleriydi: abonelik fiyatlandırması, promosyon kodu,
 * davet ödülü, App Store ek koşulları. Hiçbiri bugün satın alınabilir değil.
 *
 * Kimsenin kabul ettiği bir sürüm de değişmedi: kabul edilen sürüm hiçbir yerde
 * saklanmıyor (şemada böyle bir sütun yok), uygulama hiçbir mağazada
 * yayımlanmadı, web tarafındaki hesaplar geliştirme ve test hesapları.
 *
 * Sürüm geçmişinin tek işi, okuyucunun DAHA ÖNCE OKUDUĞU metnin neresinin
 * oynadığını görmesi. Kimsenin okumadığı beş sürümü listelemek o işi yapmıyor;
 * yalnız metni olduğundan daha oynak gösteriyor ve gerçek ilk sürüm geldiğinde
 * onu kalabalığın içinde bırakıyor. Sayaç bu yüzden "1.0"a çekildi.
 *
 * KURAL DEĞİŞMEDİ, yalnız başlangıç noktası değişti: metin değişince tarih ve
 * sürüm güncellenir (§14'ün kendi sözü) ve kayıt düşmeden sürüm artırılmaz.
 * Hak ya da yükümlülüğü değiştiren değişiklik ikinci basamağı (1.1), yalnız
 * düzelten değişiklik yama basamağını (1.0.1) alır.
 *
 * 1.1 iOS YAYIN GÜNÜNÜ BEKLEMEDİ (2026-09-14). Plan, sürümü App Store'daki
 * yayın günü artırmaktı ve plan yanlıştı: App Review gönderimde gizlilik
 * politikasını, şartları ve destek sayfasını açıp okuyor, yani metnin iOS
 * uygulamasını İNCELEMEDEN ÖNCE kapsaması gerekiyor. Aynı sürüm yapay zekâ
 * rızasını, bildirim jetonunu ve mikrofonun gerçek kapsamını da metne yazdı;
 * ayrıntı LEGAL_PLATFORMS notunda ve kaydın kendisinde.
 *
 * 1.2 (2026-09-15) şartların cayma maddesini gerçek satın alma akışına çekti:
 * eski metin, uygulamada hiç olmayan bir "satın alma ekranındaki onay"a
 * dayanıyordu (mağaza ön inceleme B35).
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-15";
export const LEGAL_VERSION = "1.2";

export const LEGAL_ENTITY = {
  /** Veri sorumlusu: amaç ve araçlara karar veren gerçek kişi (AB'de yerleşik). */
  controllerName: "Samet Atila",
  controllerAddress: "Emil-Figge-Str. 9, Zimmer 421, 44227 Dortmund, Almanya",

  /** Yayıncı: Play ve App Store hesabı sahibi, tahsilat tarafı ve veri işleyen (Türkiye'de yerleşik). */
  publisherName: "Musa Atila",
  publisherAddress: "Akpınar Mah. Akpınar Merkez Küme Evler No:6, Tufanbeyli, Adana, Türkiye",
  /** Yayıncının bağlı olduğu vergi dairesi — ticaret sicil/MERSİS yok, tacir değil. */
  publisherTaxOffice: "Tufanbeyli Vergi Dairesi",

  /**
   * KVKK veri sorumlusu temsilcisi: Türkiye'de yerleşik olmayan veri sorumlusu
   * için zorunlu. Bu görevi YAYINCI üstleniyor — aynı kişi, aynı adres; adres
   * değişirse ikisini birlikte güncelle.
   *
   * Temsilci olabilmenin şartı Türkiye'de yerleşik Türk vatandaşı gerçek kişi ya
   * da Türkiye'de kurulu tüzel kişi olmak; yayıncı bunu karşılıyor. Atama, veri
   * sorumlusunun yazılı kararıyla yapılıp Kuruma bildiriliyor ve VERBİS kaydı
   * temsilci üzerinden açılıyor. VERBİS ayrıca bir "irtibat kişisi" istiyor
   * (Türkiye'de yerleşik Türk vatandaşı); bu alan Sicil'e girilen bir bilgi,
   * yayımlanan metnin parçası değil.
   *
   * DİKKAT: aşağıdaki metin "temsilci atanmıştır" diyor. Atama kararı
   * imzalanmadan yayına çıkarsa bu cümle doğru olmaz.
   */
  trRepresentative: "Musa Atila, Akpınar Mah. Akpınar Merkez Küme Evler No:6, Tufanbeyli, Adana, Türkiye",

  /**
   * Veri hakları başvuruları iki ayrı adrese gidiyor çünkü iki ayrı rejim ve iki
   * ayrı süre var: KVKK m.13 otuz gün, GDPR m.12(3) bir ay + gerekirse iki ay
   * uzatma. Türkçe metin KVKK adresini, İngilizce ve Almanca metinler GDPR
   * adresini öne çıkarıyor; hakların anlatıldığı bölümde ikisi de yazılı.
   */
  privacyEmailTr: "kvkk@lernomi.app",
  privacyEmailEu: "gdpr@lernomi.app",
  /** Genel destek e-postası. */
  supportEmail: "support@lernomi.app",
  /**
   * Destek yanıt süresi taahhüdü (iş günü) — destek sayfasında yazılı.
   *
   * Apple Guidelines 1.2 kullanıcı içeriği taşıyan uygulamalardan yalnız bir
   * bildirme düğmesi değil, "zamanında yanıt" da istiyor; bir sayı vermeyen
   * destek sayfası o beklentiyi karşılamıyor. Sayı buraya konuldu ki söz tek
   * yerde dursun ve üç dilde birden değişsin. Veri koruma başvuruları bunun
   * DIŞINDA: onların süresi kanunla belirli (KVKK m.13 otuz gün, GDPR m.12(3)
   * bir ay) ve gizlilik politikasında yazılı.
   */
  supportResponseDays: "5",
  /** Türkiye'deki uyuşmazlıklarda yetkili mahkeme ve icra dairelerinin ili. */
  court: "Adana",
  /**
   * Sunucu yedeklerinin en uzun saklama süresi (gün) — silinen hesabın yedekten
   * düşme süresi. 30 gün seçildi ve seçim keyfî değil:
   *
   *   - Uygulamadaki öteki iki saklama penceresiyle aynı (oturum kaydı en çok
   *     30 gün, rol yapma kaydı 30 gün); tek bir üst sınır akılda kalıyor.
   *   - KVKK m.13 otuz gün, GDPR m.12(3) bir ay içinde cevap istiyor. Yedek
   *     penceresi de 30 gün olunca silme talebi cevaplandığında veri gerçekten
   *     her yerden düşmüş oluyor; "sildik ama yedekte duruyor" boşluğu kalmıyor.
   *   - Haftalar sonra fark edilen bir bozulmadan dönmeye yetecek kadar uzun.
   *
   * Bunu karşılayan basit bir düzen: gecelik pg_dump, 7 günlük + 3 haftalık
   * kopya (en eskisi 28 gün) — hepsi 30 günün içinde kalır.
   */
  backupRetentionDays: "30",

  /**
   * Konuşma pratiği kaydının ve oturum kaydının saklama süresi (gün).
   *
   * Bu ikisi ÖTEKİ alanlardan farklı: değerleri elle yazılmıyor, kuralı
   * uygulayan sabitten okunuyor. Sebep, politikanın verdiği sözü kodun
   * TUTMASI gerektiği: "konuşma kayıtları 30 gün sonra silinir" cümlesi
   * `lib/lessons/log-const` içindeki sayıyla, "oturum en çok 30 gün" cümlesi
   * `lib/auth/session-config` içindekiyle aynı olmak zorunda. Metne düz sayı
   * yazıldığı sürece biri değişip öteki eski sözü söylemeye devam edebilirdi
   * — ve bu sayfa Play Console ile App Store Connect'e URL olarak verilmiş
   * durumda, yani tutulmayan bir taahhüt olurdu.
   */
  speechLogDays: String(SPEECH_LOG_RETENTION_DAYS),
  sessionMaxDays: String(SESSION_MAX_DAYS),
} as const;

/** Adil kullanım sınırları — koddaki gerçek kotalar (route dosyalarındaki sabitler). */
export const FAIR_USE = {
  roleplayTurnsPerDay: DAILY_QUOTAS.roleplayTurns,
  sttRequestsPerDay: DAILY_QUOTAS.sttRequests,
  pronounceRequestsPerDay: DAILY_QUOTAS.pronounceRequests,
  reportsPerDay: DAILY_QUOTAS.reports,
} as const;

export type LegalField = keyof typeof LEGAL_ENTITY;

/** Yer tutucu mu (henüz doldurulmamış)? */
export function isLegalPlaceholder(value: string): boolean {
  return /^\[\[.+\]\]$/.test(value.trim());
}

/**
 * Alan bu kimlik için uygulanmıyor mu? Boş dize "bu profilde yok" demek (ör. KEP);
 * satırı ve ona atıf yapan cümleyi tamamen düşürmek için kullanılıyor. Yer tutucu
 * boş sayılmaz — o "henüz doldurulmadı" demek ve vurguyla görünmeye devam eder.
 */
export function isLegalOmitted(value: string): boolean {
  return value.trim() === "";
}


export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  /**
   * Destek sayfası — App Store Connect'in **Support URL** alanına girilen adres
   * ve Apple Guidelines 1.2'nin istediği "yayımlanmış iletişim bilgisi".
   *
   * Ayrı bir sayfa olmasının sebebi: adres bugüne kadar yalnız /privacy ve
   * /terms'in içinde geçiyordu. İnceleyen Support URL'yi açıp destek bilgisi
   * arıyor; onu on bölümlük bir hukuk metninin ortasında aratmak hem inceleme
   * riski hem de kullanıcıya kötü davranmak.
   */
  support: "/support",
  deleteAccount: "/account/delete",
} as const;

/**
 * Sürüm geçmişi — iki belge de aynı LEGAL_VERSION'ı taşıdığı için tek liste.
 *
 * Sürüm numarası değişip "ne değişti" yazılmazsa, okuyucunun kabul ettiği metnin
 * neresinin oynadığını anlamasının yolu yok. Yeni sürümde buraya bir kayıt
 * eklenmeden LEGAL_VERSION artırılmamalı. En yeni kayıt başa yazılır.
 */
/**
 * Metinlerin KAPSADIĞI platformlar. `ios` 2026-09-14'te AÇILDI (sürüm 1.1).
 *
 * Bayrak açıkken üç şey oluyor: kapsam cümlesi "Android ve iOS uygulamalarını"
 * diyor, şartlardaki Apple maddeleri (satın alma, iptal, iade, App Store ek
 * koşulları) basılıyor ve alıcılar tablosuna "Apple (App Store)" satırı giriyor.
 *
 * NEDEN YAYINDAN ÖNCE. Bayrak, "App Store'da yayımlanmadan iOS uygulamamız
 * demek iddia/gerçek ayrışması olur" diye kapalı tutuluyordu. İnceleme sırası
 * tersini istiyor: App Review gönderimde gizlilik politikasını, şartları ve
 * destek sayfasını okuyor, ve yalnız Android'i sayan, App Store satın almasını
 * ve iptal yolunu hiç anmayan bir metin iOS uygulamasının metni sayılmıyor
 * (Guideline 5.1.1(i), 3.1.2). Bir metnin bir uygulamayı KAPSAMASI, onun
 * yayında olduğunu söylemiyor; sürüm kaydı da "yayımlandı" demiyor.
 *
 * ESKİ KAPININ SEBEBİ KALKTI. Bayrak bir de "Apple (Sign-In)" satırını basacağı
 * için kapalıydı: `APPLE_BUNDLE_ID` boşken Apple ile giriş kurulmuyordu ve veri
 * alması imkânsız bir alıcıyı beyan etmek olurdu (Google Gemini ve OpenRouter
 * tablodan tam bu sebeple çıktı, bkz. PROCESSORS notu). 2026-09-14'te canlı
 * `/api/config` `"apple":true,"appleWeb":true` diyor: Apple ile giriş web'de
 * ve Android'de de açık. O satır bu yüzden artık bayraktan BAĞIMSIZ
 * (`PROCESSORS`); bayrağa yalnız App Store satırı bağlı.
 *
 * PANEL ÜSTYAZIMI: BURADAKİ BAYRAK TEK BAŞINA YETMEYEBİLİR.
 *
 * Hukuki yapılandırma panelden düzenlenebiliyor ve kayıt kodun ÖNÜNE geçiyor:
 * `parseLegalConfig` `ios`u `bool(pf.ios, d.platforms.ios)` ile okuyor, yani
 * `app_settings["legal.config"]` satırı varsa oradaki değer kazanıyor
 * (bkz. lib/legal/shape.ts). Satır, panelden HERHANGİ bir alan bir kez
 * kaydedildiğinde doğuyor ve `platforms.ios`u o günkü hâliyle donduruyor.
 * Aynı şey `visibleProcessors` üzerinden Apple (App Store) satırını da etkiler.
 *
 * ÖLÇÜLDÜ (2026-09-14, salt okuma): üretimde `app_settings` BOŞ ve
 * `legal_documents` 0 satır — bugün her şey kod varsayılanından geliyor ve
 * bayrak tek başına çalışıyor. Panelden kayıt yapılmışsa önce oradaki
 * `platforms.ios` değerine bak.
 *
 * Metin dışında iOS için bitmesi gereken iş (Apple Developer hesabı, cihaz
 * doğrulaması, App Store Connect etiketleri) `docs/plan/ios-parity.md` §6'da.
 */
export const LEGAL_PLATFORMS = { android: true, ios: true } as const;

/** Metinlerde platformların sayıldığı yer — tek kaynak, üç dil. */
export const PLATFORM_TEXT: Record<LegalLocale, string> = {
  tr: LEGAL_PLATFORMS.ios ? "Android ve iOS uygulamalarını" : "Android uygulamasını",
  en: LEGAL_PLATFORMS.ios ? "the Android and iOS apps" : "the Android app",
  de: LEGAL_PLATFORMS.ios ? "die Android- und iOS-App" : "die Android-App",
};

/** iOS yayındaysa App Store'a özgü maddeler basılıyor. */
export function hasIos(): boolean {
  return LEGAL_PLATFORMS.ios;
}

export type LegalChangelogEntry = {
  version: string;
  date: string;
  changes: Record<LegalLocale, readonly string[]>;
};

export const LEGAL_CHANGELOG: readonly LegalChangelogEntry[] = [
  {
    /*
      İKİNCİ BASAMAK: tüketici hakkının anlatımı değişti. Eski madde cayma
      hakkının "satın alma ekranında istenen onayla" sona erdiğini söylüyordu;
      uygulamada böyle bir onay hiç yoktu ve satışı mağaza yapıyor. Yeni madde
      hakkı daraltmıyor, mağazanın yoluna ve yasal haklara bağlıyor.

      Aynı sürüm misafir kullanımını da kapsıyor (mağaza ön inceleme B24): yeni
      bir veri işleme (misafir kimliği), saklama süresi ve silme yolu. İkisi de
      yayımlanmadan aynı gün yazıldığı için tek sürüm.
    */
    version: "1.2",
    date: "2026-09-15",
    changes: {
      tr: [
        "Şartların cayma maddesi (7) gerçek satın alma akışına göre yeniden yazıldı. Eski metin cayma hakkının satın alma ekranında verilen bir onayla sona erdiğini söylüyordu, oysa uygulama böyle bir onay hiç istemiyordu. Premium'u mağaza satar: satın almayı mağazanın ödeme ekranında onaylarsın, cayma ve iade taleplerini mağazanın şartlarına göre mağaza üzerinden kullanırsın. Tüketici olarak yasal hakların saklıdır; satın alma ekranı da bunu kısaca söylüyor.",
        "Mobil uygulama artık hesapsız (misafir olarak) da kullanılabiliyor. Politika misafir kimliğini anlatıyor: e-posta, ad ya da parola alınmıyor; ilerlemen rastgele bir kimlikle sunucuda tutuluyor, jetonu yalnız cihazında duruyor. Misafirde sosyal özellikler, yapay zekâya gönderim, bildirim ve satın alma yok. Hesap oluşturursan ilerlemen hesabına taşınıyor, var olan hesabına girersen onunla birleşiyor; misafir kimliği 30 gün kullanılmazsa en geç 7 gün içinde siliniyor ve Profil › Misafir verilerini sil ile istediğin an silinebiliyor. Şartlara (3) misafir kullanımına da 18 yaş sınırının uygulandığı yazıldı.",
      ],
      en: [
        "The withdrawal clause of the terms (7) was rewritten to match the actual purchase flow. The old text said the right of withdrawal ended with a consent given on the purchase screen, but the app never asked for such a consent. Premium is sold by the store: you confirm the purchase on the store's payment screen and exercise withdrawal and refund requests through the store under its terms. Your statutory rights as a consumer are not affected; the purchase screen now says this briefly too.",
        "The mobile app can now be used without an account (as a guest). The policy describes the guest identity: no e-mail, name or password is collected; your progress is kept on the server under a random identity whose token stays only on your device. Guests have no social features, nothing is sent to AI, and there are no notifications or purchases. If you create an account your progress moves into it, and if you sign in to an existing account it is combined with it; a guest identity is deleted within 7 days after 30 days without use and can be deleted at any time under Profile › Delete guest data. The terms (3) now state that the minimum age of 18 applies to guest use too.",
      ],
      de: [
        "Die Widerrufsklausel der Nutzungsbedingungen (7) wurde an den tatsächlichen Kaufablauf angepasst. Der alte Text sagte, das Widerrufsrecht erlösche mit einer Zustimmung auf dem Kaufbildschirm, doch die App hat nie eine solche Zustimmung eingeholt. Premium verkauft der Store: Du bestätigst den Kauf auf dessen Zahlungsbildschirm und machst Widerruf und Erstattung über den Store nach dessen Bedingungen geltend. Deine gesetzlichen Rechte als Verbraucher bleiben unberührt; das sagt jetzt auch kurz der Kaufbildschirm.",
        "Die mobile App lässt sich jetzt auch ohne Konto (als Gast) nutzen. Die Datenschutzerklärung beschreibt die Gastidentität: Es werden weder E-Mail-Adresse noch Name noch Passwort erhoben; dein Fortschritt liegt unter einer zufälligen Kennung auf dem Server, deren Token nur auf deinem Gerät gespeichert ist. Gäste haben keine sozialen Funktionen, es wird nichts an eine KI gesendet, und es gibt keine Benachrichtigungen oder Käufe. Erstellst du ein Konto, wird dein Fortschritt übernommen; meldest du dich bei einem bestehenden Konto an, wird er damit zusammengeführt. Eine Gastidentität wird nach 30 Tagen ohne Nutzung innerhalb von 7 Tagen gelöscht und lässt sich jederzeit unter Profil › Gastdaten löschen löschen. Die Nutzungsbedingungen (3) sagen jetzt, dass das Mindestalter von 18 Jahren auch für die Nutzung als Gast gilt.",
      ],
    },
  },
  {
    /*
      İKİNCİ BASAMAK: hak ve yükümlülük değişti. Metinler yeni bir platformu
      kapsıyor, yapay zekâ ve ses gönderimlerinin hukuki dayanağı açık rızaya
      döndü, alıcılar tablosuna iki Apple satırı girdi.

      Kayıt "App Store'da yayımlandı" DEMİYOR: sürüm incelemeden önce çıktı
      (bkz. LEGAL_PLATFORMS notu). Yayın günü için hazır bekleyen eski kayıt
      tam olarak bunu diyordu; o yüzden kullanılmadı ve silindi.
    */
    version: "1.1",
    date: "2026-09-14",
    changes: {
      tr: [
        "Metinler artık iOS uygulamasını da kapsıyor. Şartlara \"Apple App Store için ek koşullar\" bölümü (13a) eklendi: sözleşme yalnız seninle bizim aramızda, uygulamadan ve desteğinden yalnız biz sorumluyuz, Apple bu sözleşmenin üçüncü taraf lehtarı. iOS'ta abonelik satın alma, yenileme, iptal ve iade Apple üzerinden yürüyor; metinler Ayarlar › Apple Hesabı › Abonelikler yolunu ve reportaproblem.apple.com adresini gösteriyor. Apple (App Store) alıcılar tablosuna eklendi.",
        "Apple ile giriş web'de ve Android'de de sunulduğu için veri kaynağı ve alıcı olarak yazıldı: bu yolu seçersen Apple hesabı kimliğin, adın ve e-postan (istersen Apple'ın gizli aktarma adresi) kullanılır. Şartların üçüncü taraf hizmetleri maddesine (7b) Apple ile giriş eklendi.",
        "Yazdıkların ve söylediklerin dil modeli sağlayıcılarına, sunucuda yazıya çevrilecek ses kayıtların konuşma tanıma sağlayıcılarına artık ancak uygulama içinde, sağlayıcıları adıyla gösteren ekranda izin verdikten sonra gönderiliyor. Bu gönderimlerin hukuki dayanağı açık rıza oldu; iki beyanın metni politikada, kural şartların yapay zekâ maddesinde (6) de yazılı. İzin vermezsen alıştırmalar yapay zekâsız sürüyor; kararını Ayarlar › Gizlilik'ten değiştirebilirsin.",
        "Bildirimler gerçekte çalıştığı gibi anlatıldı: hatırlatma tercihlerin ve saat dilimin hesabında tutuluyor; bildirimlere izin verirsen cihazının bildirim jetonu saklanıyor ve bildirimler Firebase Cloud Messaging üzerinden iletiliyor. \"Cihaz kimliği toplanmaz\" ifadesi bu yüzden donanım kimlikleriyle sınırlandı.",
        "Mikrofon bölümü genişletildi: mikrofon yürüyüş modunun yanında derslerde, konuşma alıştırmalarında, sınavlarda ve rol yapmada da, yalnız sen konuşarak cevap verdiğinde açılıyor. Web'de telaffuz puanı ve sınavlardaki konuşma cevapları için de kısa kayıtların, izin verirsen, sunucuya gittiği yazıldı.",
      ],
      en: [
        "These texts now cover the iOS app too. The terms gained an \"Additional terms for the Apple App Store\" section (13a): the agreement is between you and us only, we alone are responsible for the app and its support, and Apple is a third-party beneficiary of it. On iOS, buying, renewing, cancelling and refunding a subscription goes through Apple; the texts point to Settings › Apple Account › Subscriptions and to reportaproblem.apple.com. Apple (App Store) was added to the table of recipients.",
        "Because Sign in with Apple is also offered on the web and on Android, Apple is now listed as a data source and recipient: if you choose it, your Apple account id, name and e-mail (or, if you prefer, Apple's private relay address) are used. Sign in with Apple was added to the third-party services clause of the terms (7b).",
        "What you write and say is now sent to language model providers, and recordings to be transcribed on the server to speech recognition providers, only after you allow it in the app on a screen that names the providers. The legal ground for these transfers is now explicit consent; both declarations are quoted in the policy, and the rule is also stated in the AI clause of the terms (6). If you decline, practice continues without AI; you can change your decision under Settings › Privacy.",
        "Notifications are now described as they actually work: your reminder preferences and time zone are kept in your account; if you allow notifications, your device's notification token is stored and notifications are delivered through Firebase Cloud Messaging. The statement that no device identifier is collected was therefore narrowed to hardware identifiers.",
        "The microphone section was broadened: besides walk mode, the microphone opens in lessons, speaking practice, exams and roleplay, but only when you answer by speaking. It now also says that on the web, short recordings for pronunciation scores and spoken exam answers go to the server if you allow it.",
      ],
      de: [
        "Diese Texte gelten jetzt auch für die iOS-App. Die Nutzungsbedingungen haben einen Abschnitt \"Zusätzliche Bedingungen für den Apple App Store\" (13a) bekommen: Der Vertrag besteht nur zwischen dir und uns, für die App und ihren Support sind allein wir verantwortlich, und Apple ist Drittbegünstigter dieses Vertrags. Unter iOS laufen Kauf, Verlängerung, Kündigung und Erstattung eines Abonnements über Apple; die Texte verweisen auf Einstellungen › Apple-Account › Abonnements und auf reportaproblem.apple.com. Apple (App Store) wurde in die Empfängertabelle aufgenommen.",
        "Da die Anmeldung mit Apple auch im Web und unter Android angeboten wird, ist Apple jetzt als Datenquelle und Empfänger aufgeführt: Wählst du sie, werden deine Apple-Konto-ID, dein Name und deine E-Mail-Adresse (auf Wunsch die private Weiterleitungsadresse von Apple) verwendet. Die Anmeldung mit Apple wurde in die Klausel über Drittanbieterdienste der Nutzungsbedingungen (7b) aufgenommen.",
        "Was du schreibst und sagst, geht jetzt erst an Sprachmodell-Anbieter, und Aufnahmen, die auf dem Server verschriftlicht werden, erst an Spracherkennungsanbieter, wenn du es in der App auf einem Bildschirm erlaubt hast, der die Anbieter namentlich nennt. Rechtsgrundlage dieser Übermittlungen ist jetzt die ausdrückliche Einwilligung; beide Erklärungen stehen im Wortlaut in der Datenschutzerklärung, und die Regel steht auch in der KI-Klausel der Nutzungsbedingungen (6). Lehnst du ab, übst du ohne KI weiter; deine Entscheidung kannst du unter Einstellungen › Datenschutz ändern.",
        "Benachrichtigungen werden jetzt so beschrieben, wie sie tatsächlich funktionieren: Deine Erinnerungseinstellungen und deine Zeitzone werden in deinem Konto gespeichert; erlaubst du Benachrichtigungen, wird das Benachrichtigungs-Token deines Geräts gespeichert, und die Zustellung läuft über Firebase Cloud Messaging. Die Aussage, es werde keine Geräte-ID erhoben, wurde deshalb auf Hardwarekennungen beschränkt.",
        "Der Mikrofonabschnitt wurde erweitert: Außer im Gehmodus öffnet sich das Mikrofon in Lektionen, Sprechübungen, Prüfungen und im Rollenspiel, aber nur, wenn du sprechend antwortest. Außerdem steht jetzt darin, dass im Web kurze Aufnahmen für die Aussprachebewertung und gesprochene Prüfungsantworten mit deiner Erlaubnis an den Server gehen.",
      ],
    },
  },
  {
    /*
      YAMA SÜRÜMÜ: yalnız anlatım değişti, hak ya da yükümlülük değişmedi —
      bu yüzden ikinci basamak değil yama basamağı (bkz. dosya başındaki kural).

      Tarih SABİT, `LEGAL_EFFECTIVE_DATE`e bağlı DEĞİL: o değişken en yeni
      sürümün tarihini taşıyor ve iOS yayın günü ileri alınacak. Bağlansaydı bu
      kayıt da o gün kendiliğinden ileri kayardı, yani okuyucuya "1.0.1 o gün
      yayımlandı" derdi.
    */
    version: "1.0.1",
    date: "2026-09-10",
    changes: {
      tr: [
        "Yalnız anlatım: gizlilik politikası artık birinci çoğul konuşmuyor (\"işleriz\", \"sunucularımız\"). Veri sorumlusu tek bir gerçek kişi olduğu için metin ya veri sorumlusunu adıyla anıyor ya da edilgen anlatım kullanıyor. Hak ve yükümlülükler aynı kaldı.",
      ],
      en: [
        "Wording only: the privacy policy no longer speaks in the first person plural (\"we process\", \"our servers\"). A single natural person is the controller, so the text now names the controller or uses the passive voice. No rights or obligations changed.",
      ],
      de: [
        "Nur sprachlich: Die Datenschutzerklärung spricht nicht mehr in der Wir-Form (\"wir verarbeiten\", \"unsere Server\"). Verantwortlicher ist eine einzelne natürliche Person, daher nennt der Text jetzt den Verantwortlichen oder verwendet das Passiv. Rechte und Pflichten sind unverändert.",
      ],
    },
  },
  {
    version: "1.0",
    date: "2026-09-09",
    changes: {
      tr: ["İlk yayımlanan sürüm."],
      en: ["First published version."],
      de: ["Erste veröffentlichte Fassung."],
    },
  },
];

export type LegalDoc = keyof typeof LEGAL_PATHS;

/**
 * Hukuki metinlerin dilleri. Türkçe BAĞLAYICI metindir (şartlar §12b); en ve de
 * bilgi amaçlı çeviridir. Uygulamanın arayüzü üç dilde olduğu için mobil,
 * kullanıcının diline göre bağlantı veriyor — Türkçe olmayan bir arayüzden
 * yalnız Türkçe bir gizlilik politikasına düşmek Play için de kabul edilebilir
 * bir sunum değil.
 */
export const LEGAL_LOCALES = ["tr", "en", "de"] as const;
export type LegalLocale = (typeof LEGAL_LOCALES)[number];
export const LEGAL_DEFAULT_LOCALE: LegalLocale = "tr";

export function isLegalLocale(value: string): value is LegalLocale {
  return (LEGAL_LOCALES as readonly string[]).includes(value);
}

/** Türkçe kanonik yolda kalır (/terms); çeviriler alt yolda (/terms/en). */
export function legalPath(doc: LegalDoc, locale: LegalLocale = LEGAL_DEFAULT_LOCALE): string {
  const base = LEGAL_PATHS[doc];
  if (locale === LEGAL_DEFAULT_LOCALE) return base;
  return doc === "deleteAccount" ? base : `${base}/${locale}`;
}

/**
 * Sağlayıcı tablosunun metinleri ANAHTARLA tutuluyor, düz Türkçe dizgiyle değil.
 *
 * Tablo üç dilde basılıyor ve alanların çoğu tekrar ediyor (aynı amaç sekiz
 * sağlayıcıda, aynı güvence dokuzunda). Türkçe dizgiyi anahtar yapan bir çeviri
 * sözlüğü, bir dizgi değişince sessizce Türkçeye düşerdi; İngilizce sayfada
 * Türkçe bir hücre, eksik çeviriden daha kötü çünkü fark edilmez. Anahtarla
 * tutulunca eksik çeviri derleme hatası oluyor.
 */
export type Trio = { tr: string; en: string; de: string };

const PROCESSOR_NAMES = {
  smtp: { tr: "Resend (e-posta, SMTP ile)", en: "Resend (e-mail, over SMTP)", de: "Resend (E-Mail, über SMTP)" },
} as const satisfies Record<string, Trio>;

const PURPOSES = {
  sttTts: { tr: "Konuşma tanıma ve seslendirme", en: "Speech recognition and speech synthesis", de: "Spracherkennung und Sprachausgabe" },
  sttWhisperLlm: { tr: "Konuşma tanıma (Whisper) ve dil modeli", en: "Speech recognition (Whisper) and language model", de: "Spracherkennung (Whisper) und Sprachmodell" },
  sttWhisper: { tr: "Konuşma tanıma (Whisper)", en: "Speech recognition (Whisper)", de: "Spracherkennung (Whisper)" },
  stt: { tr: "Konuşma tanıma", en: "Speech recognition", de: "Spracherkennung" },
  sttLlm: { tr: "Konuşma tanıma ve dil modeli", en: "Speech recognition and language model", de: "Spracherkennung und Sprachmodell" },
  llm: { tr: "Dil modeli", en: "Language model", de: "Sprachmodell" },
  googleSignIn: { tr: "Google ile giriş", en: "Sign-in with Google", de: "Anmeldung mit Google" },
  appleSignIn: { tr: "Apple ile giriş", en: "Sign-in with Apple", de: "Anmeldung mit Apple" },
  distribution: { tr: "Uygulama dağıtımı ve abonelik ödemeleri", en: "App distribution and subscription payments", de: "App-Vertrieb und Abonnementzahlungen" },
  subscriptionState: { tr: "Abonelik durumu yönetimi", en: "Subscription state management", de: "Verwaltung des Abonnementstatus" },
  transactionalMail: { tr: "Doğrulama ve parola sıfırlama e-postaları", en: "Verification and password reset e-mails", de: "Bestätigungs- und Passwort-Reset-E-Mails" },
  pushDelivery: { tr: "Bildirim gönderimi", en: "Push notification delivery", de: "Zustellung von Push-Benachrichtigungen" },
} as const satisfies Record<string, Trio>;

const DATA_KINDS = {
  audioAndTtsText: { tr: "Ses kaydı (geçici), seslendirilecek metin", en: "Audio recording (temporary), text to be spoken", de: "Audioaufnahme (temporär), zu sprechender Text" },
  audioAndTexts: { tr: "Ses kaydı (geçici), konuşma ve değerlendirme metinleri", en: "Audio recording (temporary), conversation and assessment texts", de: "Audioaufnahme (temporär), Gesprächs- und Bewertungstexte" },
  audio: { tr: "Ses kaydı (geçici)", en: "Audio recording (temporary)", de: "Audioaufnahme (temporär)" },
  texts: { tr: "Konuşma ve değerlendirme metinleri", en: "Conversation and assessment texts", de: "Gesprächs- und Bewertungstexte" },
  googleIdentity: { tr: "Google hesabı kimliği, ad, e-posta", en: "Google account id, name, e-mail", de: "Google-Konto-ID, Name, E-Mail" },
  appleIdentity: {
    tr: "Apple hesabı kimliği, ad, e-posta (kullanıcı isterse Apple'ın gizli aktarma adresi)",
    en: "Apple account id, name, e-mail (Apple's private relay address if the user chooses it)",
    de: "Apple-Konto-ID, Name, E-Mail (auf Wunsch die private Weiterleitungsadresse von Apple)",
  },
  purchase: { tr: "Satın alma bilgisi", en: "Purchase information", de: "Kaufinformationen" },
  userAndPurchase: { tr: "Kullanıcı kimliği, satın alma bilgisi", en: "User id, purchase information", de: "Nutzer-ID, Kaufinformationen" },
  email: { tr: "E-posta adresi", en: "E-mail address", de: "E-Mail-Adresse" },
  pushToken: {
    tr: "Cihaz bildirim jetonu, bildirimin başlığı ve metni",
    en: "Device notification token, the notification's title and text",
    de: "Geräte-Token für Benachrichtigungen, Titel und Text der Benachrichtigung",
  },
} as const satisfies Record<string, Trio>;

const REGIONS = {
  eu: { tr: "AB", en: "EU", de: "EU" },
  us: { tr: "ABD", en: "USA", de: "USA" },
  uk: { tr: "Birleşik Krallık", en: "United Kingdom", de: "Vereinigtes Königreich" },
  globalNetwork: { tr: "Küresel ağ", en: "Global network", de: "Globales Netz" },
} as const satisfies Record<string, Trio>;

const SAFEGUARDS = {
  scc: {
    tr: "Standart sözleşme hükümleri + veri işleme sözleşmesi",
    en: "Standard contractual clauses + data processing agreement",
    de: "Standardvertragsklauseln + Auftragsverarbeitungsvertrag",
  },
  euAdequacy: { tr: "AB içi (yeterlilik)", en: "Within the EU (adequacy)", de: "Innerhalb der EU (Angemessenheit)" },
  adequacyPlusDpa: {
    tr: "Yeterlilik kararı + veri işleme sözleşmesi",
    en: "Adequacy decision + data processing agreement",
    de: "Angemessenheitsbeschluss + Auftragsverarbeitungsvertrag",
  },
} as const satisfies Record<string, Trio>;

const OCCASIONS = {
  always: { tr: "Her zaman", en: "Always", de: "Immer" },
  walkAndTts: {
    tr: "Yürüyüş modu (ekran kapalı / cepte) ve seslendirme",
    en: "Walk mode (screen off / in pocket) and speech synthesis",
    de: "Gehmodus (Bildschirm aus / in der Tasche) und Sprachausgabe",
  },
  googleSignInChosen: { tr: "Google ile giriş seçilirse", en: "If sign-in with Google is chosen", de: "Wenn die Anmeldung mit Google gewählt wird" },
  appleSignInChosen: { tr: "Apple ile giriş seçilirse", en: "If sign-in with Apple is chosen", de: "Wenn die Anmeldung mit Apple gewählt wird" },
  androidAndSubscription: { tr: "Android uygulaması ve abonelik", en: "Android app and subscription", de: "Android-App und Abonnement" },
  iosAndSubscription: { tr: "iOS uygulaması ve abonelik", en: "iOS app and subscription", de: "iOS-App und Abonnement" },
  premiumEnabled: { tr: "Premium abonelik açılınca", en: "Once a Premium subscription is active", de: "Sobald ein Premium-Abonnement aktiv ist" },
  pushAllowed: { tr: "Bildirimlere izin verilirse", en: "If notifications are allowed", de: "Wenn Benachrichtigungen erlaubt sind" },
} as const satisfies Record<string, Trio>;

export type Processor = {
  /** Sağlayıcının kendi adı — marka, çevrilmez. Türkçe bir tanım ise anahtar. */
  name: string | keyof typeof PROCESSOR_NAMES;
  purpose: keyof typeof PURPOSES;
  data: keyof typeof DATA_KINDS;
  region: keyof typeof REGIONS;
  /** Aktarım güvencesi (KVKK m.9 / GDPR Bölüm V). */
  safeguard: keyof typeof SAFEGUARDS;
  /** Yalnız belirli özellikte devreye giren sağlayıcı; yoksa "her zaman". */
  when?: keyof typeof OCCASIONS;
};

/** Verinin ulaştığı hizmet sağlayıcılar (KVKK "aktarım", GDPR "işleyici", Play "paylaşım"). */
/**
 * Yalnız metinler iOS'u kapsarken basılan satırlar.
 *
 * Ayrı bir sabit olmasının sebebi sınanabilirlik: satır `PROCESSORS`ın içine
 * koşulla gömülü olsaydı bayrak kapalıyken var olmazdı ve kapı
 * (`scripts/test-legal.ts`) ona ait sözlük anahtarlarını "ölü" sanardı.
 *
 * "Apple (Sign-In)" 2026-09-14'te buradan `PROCESSORS`a taşındı. Burada durduğu
 * sürece Apple ile giriş web'de ve Android'de AÇIKKEN tabloda görünmüyordu:
 * yalnız iOS'ta bulunan bir giriş yolu varsayılmıştı, oysa sağlayıcı üç
 * istemcide de kurulu (bkz. LEGAL_PLATFORMS notu).
 */
const IOS_PROCESSORS: Processor[] = [
  { name: "Apple (App Store)", purpose: "distribution", data: "purchase", region: "us", safeguard: "scc", when: "iosAndSubscription" },
];

/**
 * Yalnız iOS'a ait satırların adları — panelin varsayılan yapılandırması
 * (`lib/legal/shape`) bunlara `iosOnly` işareti koyuyor. Liste orada ELLE
 * tutuluyordu ve Apple ile giriş taşınınca geride kalabilirdi; artık buradan.
 */
export const IOS_ONLY_PROCESSOR_NAMES: readonly string[] = IOS_PROCESSORS.map((p) => p.name);

/**
 * ALICILAR — kullanıcının verisinin gerçekten ulaştığı üçüncü taraflar.
 *
 * Liste `lib/chat-providers.ts` kataloğuyla ve `docs/play/data-safety.md`
 * beyanıyla AYNI kümeyi anlatmak zorunda; üçü birlikte değişir.
 *
 * Google Gemini ve OpenRouter 2026-09-09'da çıkarıldı: katalogda duruyorlardı
 * ama anahtarları hiçbir env dosyasında yoktu, yani hiç kullanılmamışlardı.
 * Fazla beyan bir ihlal değil — ama bu tablonun işi kullanıcıya verisinin
 * NEREYE gittiğini söylemek, ve gitmediği bir yeri saymak o işi yapmıyor.
 * Katalogdan da silindiler, çünkü tabloyu doğru tutmanın tek yapısal yolu
 * kullanılmayacak sağlayıcıyı kullanılabilir bırakmamak.
 */
export const PROCESSORS: Processor[] = [
  { name: "Microsoft Azure Speech", purpose: "sttTts", data: "audioAndTtsText", region: "eu", safeguard: "euAdequacy", when: "walkAndTts" },
  { name: "Groq", purpose: "sttWhisperLlm", data: "audioAndTexts", region: "us", safeguard: "scc" },
  { name: "Cloudflare Workers AI", purpose: "sttWhisper", data: "audio", region: "globalNetwork", safeguard: "scc" },
  { name: "Speechmatics", purpose: "stt", data: "audio", region: "uk", safeguard: "adequacyPlusDpa" },
  { name: "Deepgram", purpose: "stt", data: "audio", region: "us", safeguard: "scc" },
  { name: "Mistral AI", purpose: "sttLlm", data: "audioAndTexts", region: "eu", safeguard: "euAdequacy" },
  { name: "Cerebras", purpose: "llm", data: "texts", region: "us", safeguard: "scc" },
  { name: "Google (Sign-In)", purpose: "googleSignIn", data: "googleIdentity", region: "us", safeguard: "scc", when: "googleSignInChosen" },
  /*
    Apple ile giriş web'de, Android'de ve iOS'ta açık (canlı `/api/config`:
    "apple":true,"appleWeb":true), yani bayraktan bağımsız. Google (Sign-In)
    satırının simetriği: aynı şey oluyor, sağlayıcı farklı.
  */
  { name: "Apple (Sign-In)", purpose: "appleSignIn", data: "appleIdentity", region: "us", safeguard: "scc", when: "appleSignInChosen" },
  { name: "Google Play", purpose: "distribution", data: "purchase", region: "us", safeguard: "scc", when: "androidAndSubscription" },
  /*
    Firebase Cloud Messaging 2026-09-10'da açıldı ve o güne kadar bu satır DOĞRU
    biçimde yoktu: uzak bildirim yapılandırılmamıştı, web push ise kendi
    sunucumuzda (VAPID) ve üçüncü tarafa uğramıyor. Sunucu kimlik bilgileri
    girildiği an cihaz jetonu ve bildirimin metni Google'a gitmeye başladı.
  */
  { name: "Google (Firebase Cloud Messaging)", purpose: "pushDelivery", data: "pushToken", region: "us", safeguard: "scc", when: "pushAllowed" },
  ...(LEGAL_PLATFORMS.ios ? IOS_PROCESSORS : []),
  { name: "RevenueCat", purpose: "subscriptionState", data: "userAndPurchase", region: "us", safeguard: "scc", when: "premiumEnabled" },
  /*
    Sağlayıcı ADIYLA yazılıyor: tablonun işi alıcıyı tanınabilir kılmak ve öteki
    on satırın hepsi adını veriyor. Bölge "ABD": kullanılan uç `smtp.resend.com`,
    yani Resend'in küresel ucu; AB veri ikametgâhı ayrı bir uç ve seçilmedi.
    Eskiden burada "AB (yeterlilik)" yazıyordu ve bu, aktarımı olduğundan
    güvenli gösteren bir beyandı.
  */
  { name: "smtp", purpose: "transactionalMail", data: "email", region: "us", safeguard: "scc" },
];

/**
 * Bayraktan BAĞIMSIZ tam küme — yalnız denetim için, hiçbir sayfa bunu basmaz.
 * Sözlükte ölü anahtar aramak ancak tam küme üzerinden anlamlı.
 */
export const ALL_PROCESSORS: Processor[] = LEGAL_PLATFORMS.ios
  ? PROCESSORS
  : [...PROCESSORS, ...IOS_PROCESSORS];

/**
 * Sözlüklerin anahtar kümeleri — `scripts/test-legal.ts` kapısı için.
 *
 * Bir sağlayıcı tablodan çıkınca yalnız ona ait olan amaç/veri/bölge anahtarı
 * ÖLÜ kalıyor ve bunu kimse fark etmiyor: `llmRouting` tam olarak öyle oldu,
 * OpenRouter'dan başka kullanan yoktu ve satır silinince arkada kaldı. Kapı
 * artık kullanılmayan anahtarı sayıyor.
 */
export const LEGAL_VOCAB = {
  purposes: Object.keys(PURPOSES),
  dataKinds: Object.keys(DATA_KINDS),
  regions: Object.keys(REGIONS),
  safeguards: Object.keys(SAFEGUARDS),
  occasions: Object.keys(OCCASIONS),
} as const;

/** Tablonun bir satırı, istenen dilde. */
export function processorRow(p: Processor, locale: LegalLocale): {
  name: string; purpose: string; data: string; region: string; safeguard: string; when: string;
} {
  const named = (PROCESSOR_NAMES as Record<string, Trio>)[p.name];
  return {
    name: named ? named[locale] : p.name,
    purpose: PURPOSES[p.purpose][locale],
    data: DATA_KINDS[p.data][locale],
    region: REGIONS[p.region][locale],
    safeguard: SAFEGUARDS[p.safeguard][locale],
    when: OCCASIONS[p.when ?? "always"][locale],
  };
}

/** Sunucuların bulunduğu yer (Netcup VPS) — üç dilde. */
export const LEGAL_HOSTING_TEXT: Trio = {
  tr: "Netcup GmbH, Almanya (AB)",
  en: "Netcup GmbH, Germany (EU)",
  de: "Netcup GmbH, Deutschland (EU)",
};

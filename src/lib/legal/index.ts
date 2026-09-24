/**
 * Hukuki metinlerin tek kaynağı: kimlik bilgileri, yürürlük tarihi ve veri işleyen
 * üçüncü taraflar. Gizlilik politikası (/privacy), kullanım şartları (/terms) ve Play
 * Veri Güvenliği beyanı (docs/play/data-safety.md) bu listeyle tutarlı olmalı.
 *
 * KİMLİK: TEK TARAF + AB TEMSİLCİSİ (2026-09-24, sürüm 1.7)
 *
 * 1.6'ya kadar roller iki kişiye bölünmüştü: veri sorumlusu Dortmund'da
 * (Samet Atila), yayıncı ve veri işleyen Türkiye'de (Musa Atila). Mağaza
 * hesapları (Play ve App Store) Türk hesabı ve geliştirici Musa olduğu için
 * yapı sadeleşti:
 *
 *   - HİZMET SAĞLAYICI = VERİ SORUMLUSU = YAYINCI (provider*): Türkiye'de
 *     yerleşik gerçek kişi Musa Atila. Amaç ve araçlara o karar veriyor,
 *     uygulamayı mağazalarda o yayımlıyor, ödemeyi o alıyor, sözleşmenin
 *     karşı tarafı o. Play'deki görünen ad "RumpusKit" onun hesabı.
 *   - AB TEMSİLCİSİ (euRepresentative*): Dortmund'da yerleşik Samet Atila,
 *     GDPR m.27. Veri sorumlusu DEĞİL, veri işleyen de değil; AB'deki
 *     kullanıcıların ve denetim otoritelerinin muhatabı.
 *
 * NEDEN publisher* ALANLARI SİLİNDİ, controller'a EŞİTLENMEDİ. Aynı kişiyi iki
 * alan kümesinde tutmak panelde iki ayrı düzenlenebilir kopya demekti: biri
 * değişir, öteki eski adresi basmaya devam eder. Tek küme kaldı. Alanlar
 * `controller*` değil `provider*` diye YENİDEN ADLANDIRILDI, bilerek: panel
 * `app_settings["legal.config"]` satırında bütün kimlik nesnesini saklıyor ve
 * `parseLegalConfig` bilinen anahtarları oradan okuyor. Anahtar adı aynı
 * kalsaydı, panelden bir kez kaydedilmiş eski bir satır `controllerName`
 * olarak "Samet Atila"yı basmaya devam ederdi; yeni adlar eski satırı
 * kendiliğinden devre dışı bırakıyor (eski anahtarlar yok sayılıyor).
 *
 * Bu yapının sonuçları:
 *
 *   1. GDPR artık m.3(1) değil m.3(2) üzerinden uygulanıyor (hizmet AB'deki
 *     kişilere sunuluyor). m.27 AB TEMSİLCİSİ ZORUNLU; metinlerde kimliği
 *     gösteriliyor. Tek durak mekanizması (m.56) işlemiyor: her üye devletin
 *     otoritesi kendi ülkesindeki kullanıcılar için yetkili; LDI NRW yalnız
 *     temsilcinin bulunduğu eyaletin otoritesi olarak anılıyor.
 *     Temsilcinin YAZILI GÖREVLENDİRMESİ (m.27(1) "in writing") Musa'nın
 *     imzalayıp Samet'e vereceği bir belge; metin "yazılı görevlendirmeyle"
 *     DEMİYOR, yalnız temsilcinin kimliğini gösteriyor.
 *     TODO(Samet/Musa): yazılı görevlendirmeyi imzala ve sakla.
 *   2. KVKK'da veri sorumlusu Türkiye'de yerleşik: "Türkiye temsilcisi"
 *     kavramı KALKTI. VERBİS kaydı YAPILMIYOR: yıllık çalışan sayısı 50'den az
 *     ve yıllık mali bilanço toplamı Kurul'un belirlediği eşiğin altında
 *     kalan, ana faaliyeti özel nitelikli veri işlemek olmayan veri
 *     sorumluları Kurul kararlarıyla kayıttan istisna. Metin kayıtlı olduğunu
 *     İDDİA ETMİYOR ve VERBİS'ten hiç söz etmiyor.
 *   3. Sunucular Almanya'da (Netcup) kaldığı için Türkiye'deki kullanıcıların
 *     verisi YURT DIŞINA AKTARILIYOR (KVKK m.9). Yeterlilik kararı yok;
 *     dayanak standart sözleşme + 5 iş günü içinde Kurul'a bildirim. İmzalı
 *     sözleşme olmadığı için metin güvence İDDİA ETMİYOR (1.5 ilkesi), yalnız
 *     aktarımı söylüyor. TODO(Musa): Netcup ve yurt dışı sağlayıcılarla KVKK
 *     standart sözleşmesi + bildirim.
 *   4. AB kullanıcıları açısından veri sorumlusu üçüncü ülkede (Türkiye, AB
 *     Komisyonu yeterlilik kararı yok) ve verilere oradan erişiyor. Metin bunu
 *     söylüyor; hangi güvencenin (ör. SCC modül 4) gerektiği hukukçuya
 *     soruldu, cevap gelmeden güvence yazılmıyor.
 *
 * Vergi tarafı hizmet sağlayıcıya (Musa) ait: Gelir Vergisi Kanunu mükerrer m.20/B'deki mobil
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
import { ATTESTATION_RETENTION_DAYS } from "@/lib/auth/attestation-const";
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
 *
 * 1.3 (2026-09-15) misafir kullanımının kapsamını değiştirdi: misafire tek
 * yapay zekâ değerlendirmesi (açık rızayla), cihaz içi hatırlatmalar, jetonun
 * güvenli depoda saklanması, e-postayla yerinde hesap ve var olan hesaba
 * girişte "eklensin mi" sorusu. Yapay zekâya gönderim misafire ilk kez
 * açıldığı için hak ve yükümlülük değişikliği sayıldı (ikinci basamak).
 *
 * 1.4 (2026-09-16) profildeki kısa tanıtımı (biyografi) kaldırdı: alan artık
 * yok ve yazılmış metinler sunucudan silindi. Toplanan bir veri kategorisinin
 * düşmesi işlemenin kapsamını değiştiriyor, o yüzden ikinci basamak.
 *
 * 1.5 (2026-09-23) yayın öncesi hukuki denetimin (LEG-1..20, CNT-7) sonucu:
 * metin, sistemin gerçekte yaptığını söylemiyordu. Cloudflare (vekil,
 * Turnstile, R2 yedeği) ve Edge seslendirme ucu alıcı olarak hiç yazılı
 * değildi, anonim hata raporu ve sunucu günlükleri sayılmamıştı, ve birkaç
 * güvence cümlesi henüz imzalanmamış belgelere dayanıyordu. Yeni alıcılar
 * eklendiği için ikinci basamak.
 *
 * 1.6 (2026-09-24) Android'de "Hesapsız devam et"teki cihaz doğrulamasını
 * (Google Play Integrity, docs/plan/device-attestation.md) yazdı: yeni bir
 * işleme (bütünlük sonucu, 90 gün) ve yeni bir alıcı. Kayıt kipi canlıda
 * açılmadan ÖNCE yayımlandı; metin açık olmayan bir işlemeyi önceden
 * söylüyor, tersini değil. İkinci basamak.
 */
export const LEGAL_EFFECTIVE_DATE = "2026-09-24";
export const LEGAL_VERSION = "1.6";

export const LEGAL_ENTITY = {
  /** Hizmet sağlayıcı, veri sorumlusu ve yayıncı: tek gerçek kişi (Türkiye'de yerleşik). */
  providerName: "Musa Atila",
  providerAddress: "Akpınar Mah. Akpınar Merkez Küme Evler No:6, Tufanbeyli, Adana, Türkiye",
  /** Bağlı olduğu vergi dairesi — ticaret sicil/MERSİS yok, tacir değil. */
  providerTaxOffice: "Tufanbeyli Vergi Dairesi",
  /**
   * Google Play'deki GÖRÜNEN geliştirici adı. Play bireysel hesapta da ayrı bir
   * geliştirici adı kullanmaya izin veriyor ve hesap "RumpusKit" adıyla açık
   * (Samet, 2026-09-23). App Store'da bireysel hesap satıcı olarak kişinin kendi
   * adını gösteriyor (Musa Atila), orada ayrı bir ad YOK. Mağaza sayfasındaki
   * ad ile metindeki tarafın bağı kurulabilsin diye kimlik bloğunda basılıyor.
   */
  providerPlayName: "RumpusKit",

  /**
   * GDPR m.27 AB temsilcisi. Veri sorumlusu Birlik'te yerleşik değil ve hizmeti
   * AB'deki kişilere sunuyor; temsilci, kullanıcıların bulunduğu üye
   * devletlerden birinde yerleşik olmak zorunda (m.27(3)) — Almanya bunu
   * karşılıyor. İletişim kanalı ayrı bir alan DEĞİL: `privacyEmailEu`
   * (aşağıdaki not). Adres değişirse künye ve gizlilik politikası birlikte
   * değişir, ikisi de buradan okuyor.
   */
  euRepresentativeName: "Samet Atila",
  euRepresentativeAddress: "Emil-Figge-Str. 9, Zimmer 421, 44227 Dortmund, Almanya",

  /**
   * Veri hakları başvuruları iki ayrı adrese gidiyor çünkü iki ayrı rejim ve iki
   * ayrı süre var: KVKK m.13 otuz gün, GDPR m.12(3) bir ay + gerekirse iki ay
   * uzatma. Türkçe metin KVKK adresini, İngilizce ve Almanca metinler GDPR
   * adresini öne çıkarıyor; hakların anlatıldığı bölümde ikisi de yazılı.
   *
   * `privacyEmailEu` 1.7'den beri AB TEMSİLCİSİNİN de iletişim kanalı: GDPR
   * başvuruları zaten oraya gidiyor ve m.27(4) temsilcinin bu başvuruların
   * muhatabı olmasını istiyor. Ayrı bir alan açmak aynı kutuya iki ad vermek
   * olurdu. Anahtar adı değişmedi (metinlerde ve silme sayfasında belirteç).
   * TODO(Samet): gdpr@ kutusuna temsilci olarak erişimin olduğunu doğrula.
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
   *
   * HARİCİ KOPYA BU SÖZÜN İÇİNDE (1.5'ten beri metinde adıyla). Gecelik döküm
   * gpg ile şifrelenip Cloudflare R2'ye (AB yargı bölgesi, `.eu.` uç) de
   * gidiyor; orada Bucket Lock 30 gün silmeyi engelliyor ve budamayı R2
   * lifecycle kuralı yapıyor. Kural 30 günde silerse silme asenkron olduğu
   * için fiilen 30-31 gün olur.
   * TODO(Samet): Cloudflare panelinde lifecycle'ı "29 günden eski nesneleri
   * sil", kilidi 29 gün yap — yoksa bu sayı R2 için tutulmuyor (denetim LEG-20).
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
  /** Cihaz doğrulaması kaydı (`guest_attestations`); süpürme `lib/auth/play-integrity`. Aynı gerekçe. */
  attestationDays: String(ATTESTATION_RETENTION_DAYS),
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
  /**
   * Künye (Impressum) — §5 DDG ve §18 MStV. Veri sorumlusu Dortmund'da yerleşik
   * ve Premium ücretli, yani Almanya'dan sunulan ticari bir dijital hizmet:
   * "kolay tanınır, doğrudan erişilebilir, sürekli mevcut" bir künye zorunlu.
   * 2026-09-23'e kadar yoktu (denetim LEG-5). Öteki belgelerden farklı olarak
   * kanonik dili ALMANCA (bkz. `legalPath`): yükümlülük Alman hukukundan.
   */
  impressum: "/impressum",
} as const;

/**
 * Belgenin kanonik (alt yolsuz) dili. Künye Almanca, gerisi Türkçe.
 *
 * Künyenin kanonik dili Almanca çünkü onu isteyen Alman hukuku ve onu arayan
 * okur (ve rakip avukatı) "/impressum"u Almanca bekliyor. Öteki belgelerde
 * Türkçe bağlayıcı metin (şartlar §12b); künye bir sözleşme değil, kimlik
 * beyanı, o yüzden "bağlayıcı dil" sorusu doğmuyor.
 */
export function legalCanonicalLocale(doc: LegalDoc): LegalLocale {
  return doc === "impressum" ? "de" : LEGAL_DEFAULT_LOCALE;
}

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
      İKİNCİ BASAMAK: yeni bir işleme (Android misafir açılışında cihaz
      bütünlüğü sonucu, 90 gün) ve alıcılar tablosuna yeni bir alıcı
      (Google Play Integrity). Kayıt kipi canlıda açılmadan önce yazıldı.

      Yapay zekâ rızası ETKİLENMİYOR: yeni veri türü (`integrityToken`) rıza
      amaçlarının hiçbirine girmiyor, parmak izi aynı kalıyor ve kimseden
      izin yeniden istenmiyor. Sürüm değiştiği için "şartlar güncellendi"
      şeridi (`termsUpdateFor`) her hesapta bir kez görünüyor.
    */
    version: "1.6",
    date: "2026-09-24",
    changes: {
      tr: [
        "Android uygulamasında \"Hesapsız devam et\"e dokunduğunda cihaz bütünlüğü kontrolü yapılabiliyor: uygulama Google Play Integrity'den imzalı bir belge alıyor, Lernomi sunucusu belgeyi Google'a doğrulatıyor ve yalnız sonucu (uygulama tanındı mı, cihaz bütünlüğü, lisans durumu) ve sebebini misafir kimliğine bağlı olarak 90 gün tutuyor; belgenin kendisi saklanmıyor, hesap ya da misafir kimliği silinince kayıt kimlikten ayrılıyor. Amaç sahte ve otomatik açılan misafir hesaplarını önlemek; bu aşamada kimse reddedilmiyor. Toplanan veriler tablosuna, saklama sürelerine ve alıcılar tablosuna (Google Play Integrity) eklendi; iOS'ta ve web'de bu kontrol yok.",
      ],
      en: [
        "When you tap \"Continue without an account\" in the Android app, a device integrity check may be carried out: the app obtains a signed token from Google Play Integrity, the Lernomi server has Google verify it, and only the result (whether the app is recognised, device integrity, licence status) and its reason are kept for 90 days, linked to the guest identity; the token itself is not stored, and when the account or guest identity is deleted the record is detached from it. The purpose is to prevent fake and automatically created guest accounts; at this stage nobody is refused. It was added to the table of collected data, the retention periods and the table of recipients (Google Play Integrity); there is no such check on iOS or the web.",
      ],
      de: [
        "Wenn du in der Android-App auf \"Ohne Konto fortfahren\" tippst, kann eine Geräteintegritätsprüfung stattfinden: Die App holt ein signiertes Token von Google Play Integrity, der Lernomi-Server lässt es von Google prüfen und bewahrt nur das Ergebnis (ob die App erkannt wird, Geräteintegrität, Lizenzstatus) und seinen Grund 90 Tage lang, der Gastidentität zugeordnet, auf; das Token selbst wird nicht gespeichert, und bei Löschung des Kontos oder der Gastidentität wird der Eintrag davon getrennt. Zweck ist, gefälschte und automatisiert angelegte Gastkonten zu verhindern; in dieser Phase wird niemand abgewiesen. Die Prüfung wurde in die Tabelle der erhobenen Daten, die Speicherfristen und die Empfängertabelle (Google Play Integrity) aufgenommen; unter iOS und im Web gibt es diese Prüfung nicht.",
      ],
    },
  },
  {
    /*
      İKİNCİ BASAMAK: alıcılar tablosuna yeni alıcılar girdi (Cloudflare,
      Cloudflare R2, Microsoft Edge seslendirme) ve yeni işlemeler yazıldı
      (anonim hata raporu, sunucu günlükleri, şartları kabul kaydı).
      Hiçbiri 1.5'te BAŞLAMADI; metin gerçekte olanı geç de olsa söylüyor.
      Kayıt bunu saklamıyor.

      Maddeler üç dilde AYNI SAYIDA (kapı `scripts/test-legal.ts`).
    */
    version: "1.5",
    date: "2026-09-23",
    changes: {
      tr: [
        "Alıcılar tablosu gerçek duruma getirildi. Siteye ve uygulamaya giden trafik Cloudflare'in ağından geçiyor (ters vekil ve kayıt, giriş ve parola sıfırlamadaki Turnstile bot koruması) ve veritabanı yedeğinin şifreli bir kopyası Cloudflare R2'de (AB) tutuluyor; ikisi de artık tabloda. Seslendirme önce Microsoft'un Edge sesli okuma servisine, o çalışmazsa Azure'a (AB) gidiyor; Edge için veri işleme sözleşmesi olmadığı ve yalnız seslendirilecek metnin, hesap bilgisi olmadan sunucudan gönderildiği yazıldı. RevenueCat'in mobil uygulama açıldığında (misafirde anonim kimlikle) devreye girdiği yazıldı; hesap silinince RevenueCat'teki müşteri kaydının silinmesi de isteniyor.",
        "Yurt dışı aktarım güvenceleri yalnız var olanı söyleyecek biçimde daraltıldı: güvence sütunu sağlayıcıya göre AB Standart Sözleşme Hükümleri, sağlayıcının kendi şartları ya da bağımsız veri sorumlusu diye ayrıldı; yayıncıyla işleme sözleşmesine, Türkiye temsilcisine, KVKK standart sözleşmesine ve sağlayıcıların eğitim taahhüdüne dair cümleler, belgeler tamamlanana kadar kaldırıldı.",
        "Toplanan veriler tablosuna üç satır eklendi: anonim hata raporu (hata iletisi, yığın izi, ekran adı, uygulama sürümü; kullanıcı kimliği olmadan, yalnız Lernomi sunucusuna), sunucu günlükleri (erişim günlükleri IP adresiyle 14 gün, sistem günlükleri 30 gün) ve Cloudflare Turnstile bot koruması. Üçüncü taraf çökme raporlama SDK'sı kullanılmadığı açıkça yazıldı.",
        "Ses kaydı cümlesi kesinleştirildi: ses Lernomi sunucusunda saklanmaz, Speechmatics'e gönderilen ses iş bitince silinir, Deepgram'da model eğitimine katılım kapalıdır. Konuşma pratiği kayıtları süre dolduktan sonra en geç bir gün içinde siliniyor; kapanan bildirimler kapanıştan 1 yıl sonra siliniyor.",
        "\"Kullanım verisi gönder\" tercihi artık hesabına kaydediliyor ve sunucu da ona uyuyor; kullanım ölçümü için cihazına bir şey yazılmıyor. Kabul ettiğin şartların sürümü ve tarihi hesabına kaydediliyor (şartlar 12b). Şartlara (4, 5) uygunsuz içerik ve kötü niyetli kullanıcılara tolerans gösterilmediği, bildirimlerin 24 saat içinde incelendiği ve bildirene sonucun iletildiği yazıldı; şartların özeti hizmetin Almanya'dan işletildiğini doğru söylüyor. Künye (Impressum) sayfası eklendi.",
      ],
      en: [
        "The table of recipients now matches reality. Traffic to the site and the app passes through Cloudflare's network (reverse proxy, and Turnstile bot protection on sign-up, sign-in and password reset), and an encrypted copy of the database backup is kept in Cloudflare R2 (EU); both are now in the table. Speech synthesis goes first to Microsoft's Edge Read Aloud service and, if that fails, to Azure (EU); the policy now says there is no data processing agreement for Edge and that only the text to be spoken is sent, from the server and without account data. It now says RevenueCat starts when the mobile app opens (under an anonymous id for guests); when an account is deleted, deletion of the RevenueCat customer record is also requested.",
        "The transfer safeguards were narrowed to what actually exists: the safeguard column now distinguishes, per provider, EU Standard Contractual Clauses, the provider's own terms, or an independent controller; the sentences about a processing agreement with the publisher, a representative in Türkiye, the KVKK standard contract and the providers' no-training commitment were removed until the documents are in place.",
        "Three rows were added to the table of collected data: the anonymous error report (error message, stack trace, screen name, app version; without a user id, only to Lernomi's server), server logs (access logs with IP addresses 14 days, system logs 30 days) and Cloudflare Turnstile bot protection. The policy now states explicitly that no third-party crash reporting SDK is used.",
        "The statement on audio was made precise: audio is not stored on the Lernomi server, audio sent to Speechmatics is deleted when the job finishes, and participation in model training is switched off at Deepgram. Speaking practice logs are deleted within one day after the period ends; closed reports are deleted 1 year after closing.",
        "The \"Send usage data\" choice is now saved to your account and respected by the server; nothing is written to your device for usage measurement. The version and date of the terms you accepted are recorded on your account (terms 12b). The terms (4, 5) now state zero tolerance for objectionable content and abusive users, that reports are reviewed within 24 hours and that the reporter is told the outcome; the summary of the terms now correctly says the service is operated from Germany. An imprint (Impressum) page was added.",
      ],
      de: [
        "Die Empfängertabelle entspricht jetzt der Wirklichkeit. Der Datenverkehr zu Website und App läuft durch das Netz von Cloudflare (Reverse Proxy sowie Turnstile-Botschutz bei Registrierung, Anmeldung und Passwort-Reset), und eine verschlüsselte Kopie der Datenbanksicherung liegt bei Cloudflare R2 (EU); beides steht jetzt in der Tabelle. Die Sprachausgabe geht zuerst an den Edge-Vorlesedienst von Microsoft und, wenn der ausfällt, an Azure (EU); für Edge steht jetzt darin, dass kein Auftragsverarbeitungsvertrag besteht und nur der vorzulesende Text vom Server aus und ohne Kontodaten gesendet wird. Es steht jetzt darin, dass RevenueCat beim Öffnen der mobilen App startet (bei Gästen unter einer anonymen Kennung); bei der Kontolöschung wird auch die Löschung des Kundendatensatzes bei RevenueCat veranlasst.",
        "Die Garantien für Übermittlungen ins Ausland wurden auf das tatsächlich Vorhandene beschränkt: Die Garantiespalte unterscheidet je Anbieter EU-Standardvertragsklauseln, die eigenen Bedingungen des Anbieters oder einen eigenständig Verantwortlichen; die Sätze zum Auftragsverarbeitungsvertrag mit dem Herausgeber, zum Vertreter in der Türkei, zum KVKK-Standardvertrag und zur Zusage der Anbieter, nicht zu trainieren, wurden entfernt, bis die Unterlagen vorliegen.",
        "Die Tabelle der erhobenen Daten hat drei neue Zeilen: den anonymen Fehlerbericht (Fehlermeldung, Stacktrace, Bildschirmname, App-Version; ohne Nutzer-ID, nur an den Lernomi-Server), Server-Logs (Zugriffsprotokolle mit IP-Adressen 14 Tage, Systemprotokolle 30 Tage) und den Cloudflare-Turnstile-Botschutz. Es steht jetzt ausdrücklich darin, dass kein Absturzberichts-SDK Dritter verwendet wird.",
        "Die Aussage zu Audio wurde präzisiert: Audio wird nicht auf dem Lernomi-Server gespeichert, an Speechmatics gesendetes Audio wird nach Abschluss des Auftrags gelöscht, und bei Deepgram ist die Teilnahme am Modelltraining abgeschaltet. Protokolle der Sprechpraxis werden spätestens einen Tag nach Fristende gelöscht; abgeschlossene Meldungen 1 Jahr nach Abschluss.",
        "Die Wahl \"Nutzungsdaten senden\" wird jetzt in deinem Konto gespeichert und vom Server beachtet; für die Nutzungsmessung wird nichts auf deinem Gerät gespeichert. Version und Datum der von dir angenommenen Bedingungen werden in deinem Konto gespeichert (Nutzungsbedingungen 12b). Die Nutzungsbedingungen (4, 5) nennen jetzt null Toleranz für anstößige Inhalte und missbräuchliche Nutzer, die Prüfung von Meldungen innerhalb von 24 Stunden und die Mitteilung des Ergebnisses an die meldende Person; die Kurzfassung der Nutzungsbedingungen sagt jetzt richtig, dass der Dienst aus Deutschland betrieben wird. Eine Impressumsseite wurde ergänzt.",
      ],
    },
  },
  {
    /*
      İKİNCİ BASAMAK: toplanan bir veri kategorisi DÜŞTÜ. Kısa tanıtım artık
      hiç sorulmuyor ve yazılmış metinler sunucudan silindi; kullanıcı lehine
      bir daralma ama yine de işlemenin kapsamı değişti.
    */
    version: "1.4",
    date: "2026-09-16",
    changes: {
      tr: [
        "Profildeki kısa tanıtım (biyografi) kaldırıldı. Sosyal profilde artık böyle bir alan yok, daha önce yazdığın metin sunucudan kalıcı olarak silindi. Toplanan veri tablosundaki sosyal profil satırı ve herkese açık profilin anlatımı buna göre güncellendi; kullanıcı adı, seviye ve seri aynı kaldı.",
      ],
      en: [
        "The short bio on your profile was removed. The social profile no longer has such a field, and any text you had written was permanently deleted from the server. The social profile row in the collected-data table and the description of the public profile were updated accordingly; username, level and streak are unchanged.",
      ],
      de: [
        "Die Kurzbeschreibung (Bio) im Profil wurde entfernt. Das soziale Profil hat dieses Feld nicht mehr, und ein zuvor geschriebener Text wurde dauerhaft vom Server gelöscht. Die Zeile zum sozialen Profil in der Datentabelle und die Beschreibung des öffentlichen Profils wurden entsprechend angepasst; Benutzername, Niveau und Serie bleiben gleich.",
      ],
    },
  },
  {
    /*
      İKİNCİ BASAMAK: misafirin verisi yapay zekâ sağlayıcısına (açık rızayla,
      tek değerlendirme) gidebiliyor; bu yeni bir işleme. Aynı gün 1.2'den
      sonra yayımlandığı için ayrı sürüm: 1.2'yi okuyan misafir farkı görmeli.
    */
    version: "1.3",
    date: "2026-09-15",
    changes: {
      tr: [
        "Hesapsız (misafir) kullanım genişledi. Misafir kimliği başına tek bir yazma ya da konuşma değerlendirmesi yapay zekâ sağlayıcısına, hesaptaki gibi ancak açık rızanla gönderilebiliyor; rıza kararın misafir kimliğine yazılıyor ve Ayarlar › Gizlilik'ten geri alınabiliyor. Hatırlatmalar misafirde de açık ve yalnız cihazında kuruluyor. Misafir jetonu cihazının güvenli deposunda (iOS Anahtar Zinciri, Android Keystore) saklanıyor ve oturumu geri kurmak için de kullanılıyor. E-postayla hesap oluşturursan misafir kimliği hesabının kendisi oluyor; var olan ve ilerleme bulunan bir hesaba girersen ilerlemeyi eklemek isteyip istemediğin soruluyor, eklemezsen misafir verileri siliniyor. Şartlar (3) buna göre güncellendi.",
      ],
      en: [
        "Using the app without an account (guest) was extended. A single writing or speaking assessment per guest identity can be sent to an AI provider, as with an account only with your explicit consent; your decision is recorded under the guest identity and can be withdrawn under Settings › Privacy. Reminders are available to guests too and are set up only on your device. The guest token is stored in your device's secure storage (iOS Keychain, Android Keystore) and is also used to restore the session. If you create an account with e-mail, the guest identity becomes your account itself; if you sign in to an existing account that already has progress, you are asked whether to add the progress, and if you don't, the guest data is deleted. The terms (3) were updated accordingly.",
      ],
      de: [
        "Die Nutzung ohne Konto (Gast) wurde erweitert. Eine einzige Schreib- oder Sprechbewertung pro Gastidentität kann an einen KI-Anbieter gesendet werden, wie beim Konto nur mit deiner ausdrücklichen Einwilligung; deine Entscheidung wird unter der Gastidentität gespeichert und lässt sich unter Einstellungen › Datenschutz widerrufen. Erinnerungen gibt es jetzt auch für Gäste, nur auf deinem Gerät eingerichtet. Das Gast-Token liegt im sicheren Speicher deines Geräts (iOS-Schlüsselbund, Android Keystore) und dient auch dazu, die Sitzung wiederherzustellen. Erstellst du ein Konto per E-Mail, wird die Gastidentität zu deinem Konto selbst; meldest du dich bei einem bestehenden Konto mit Fortschritt an, wirst du gefragt, ob du den Fortschritt hinzufügen willst, und wenn nicht, werden die Gastdaten gelöscht. Die Nutzungsbedingungen (3) wurden entsprechend angepasst.",
      ],
    },
  },
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

/**
 * Kanonik dil alt yolsuz kalır (/terms Türkçe, /impressum Almanca); çeviriler
 * alt yolda (/terms/en, /impressum/tr). Dil verilmezse kanonik yol.
 */
export function legalPath(doc: LegalDoc, locale?: LegalLocale): string {
  const base = LEGAL_PATHS[doc];
  if (!locale || locale === legalCanonicalLocale(doc)) return base;
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
  edgeTts: {
    tr: "Microsoft (Edge sesli okuma servisi)",
    en: "Microsoft (Edge Read Aloud service)",
    de: "Microsoft (Edge-Vorlesedienst)",
  },
  cloudflareEdge: {
    tr: "Cloudflare (ağ, ters vekil ve Turnstile bot koruması)",
    en: "Cloudflare (network, reverse proxy and Turnstile bot protection)",
    de: "Cloudflare (Netzwerk, Reverse Proxy und Turnstile-Botschutz)",
  },
  cloudflareR2: {
    tr: "Cloudflare R2 (şifreli yedek kopya)",
    en: "Cloudflare R2 (encrypted backup copy)",
    de: "Cloudflare R2 (verschlüsselte Sicherungskopie)",
  },
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
  tts: { tr: "Seslendirme", en: "Speech synthesis", de: "Sprachausgabe" },
  network: {
    tr: "Siteye ve uygulamaya giden trafiğin iletimi, saldırı ve bot koruması",
    en: "Delivering traffic to the site and the app, attack and bot protection",
    de: "Weiterleitung des Datenverkehrs zu Website und App, Angriffs- und Botschutz",
  },
  integrityCheck: {
    tr: "Cihaz ve uygulama bütünlüğü doğrulaması (sahte misafir hesaplarını önleme)",
    en: "Device and app integrity verification (preventing fake guest accounts)",
    de: "Prüfung der Geräte- und App-Integrität (Verhinderung gefälschter Gastkonten)",
  },
  offsiteBackup: {
    tr: "Felaket kurtarma için harici yedek",
    en: "Off-site backup for disaster recovery",
    de: "Externe Sicherung für die Notfallwiederherstellung",
  },
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
  /*
    Yapay zekâ rızasının alıcı listesine GİRMEYEN bir veri türü, bilerek:
    `lib/ai-consent` alıcıları veri türüne göre seçiyor ve seslendirme
    kullanıcının sesi ya da yazdığı metin değil. Buraya "audio…" diye bir tür
    konsaydı rızanın parmak izi değişir ve herkesten izin yeniden istenirdi.
  */
  ttsText: {
    tr: "Seslendirilecek metin (ders içerikleri, konuşma pratiğinde karakterin yanıtı); istek Lernomi sunucusundan gider, hesap bilgisi ve IP adresin gönderilmez",
    en: "Text to be spoken (lesson content, the character's reply in speaking practice); the request comes from the Lernomi server, no account data and not your IP address",
    de: "Vorzulesender Text (Lektionsinhalte, die Antwort der Figur in der Sprechpraxis); die Anfrage kommt vom Lernomi-Server, ohne Kontodaten und ohne deine IP-Adresse",
  },
  traffic: {
    tr: "IP adresi, tarayıcı/cihaz sinyalleri, iletilen istekler ve cevaplar (bağlantı şifrelemesi Cloudflare'de de çözülür)",
    en: "IP address, browser/device signals, the requests and responses passed through (the connection encryption is also terminated at Cloudflare)",
    de: "IP-Adresse, Browser-/Gerätesignale, die durchgeleiteten Anfragen und Antworten (die Verbindungsverschlüsselung wird auch bei Cloudflare entschlüsselt)",
  },
  /*
    Sinyalleri cihazdaki Google Play hizmetleri topluyor ve belgeyi Google
    şifreliyor; Lernomi yalnız o belgeyi Google'a çözdürüyor. İstekte hesap
    bilgisi yok: `requestHash` her açılışta yeni, rastgele bir nonce'un özeti.
  */
  integrityToken: {
    tr: "Play Integrity belgesi (cihaz ve uygulama bütünlük sinyalleri, isteğe özgü rastgele özet); hesap bilgisi gönderilmez",
    en: "Play Integrity token (device and app integrity signals, a random per-request hash); no account data is sent",
    de: "Play-Integrity-Token (Geräte- und App-Integritätssignale, ein zufälliger anfragebezogener Hash); es werden keine Kontodaten gesendet",
  },
  encryptedBackup: {
    tr: "Veritabanının şifreli kopyası (anahtar yalnız Lernomi sunucusunda; Cloudflare içeriği okuyamaz)",
    en: "Encrypted copy of the database (the key is only on the Lernomi server; Cloudflare cannot read the content)",
    de: "Verschlüsselte Kopie der Datenbank (der Schlüssel liegt nur auf dem Lernomi-Server; Cloudflare kann den Inhalt nicht lesen)",
  },
} as const satisfies Record<string, Trio>;

const REGIONS = {
  eu: { tr: "AB", en: "EU", de: "EU" },
  us: { tr: "ABD", en: "USA", de: "USA" },
  uk: { tr: "Birleşik Krallık", en: "United Kingdom", de: "Vereinigtes Königreich" },
  globalNetwork: { tr: "Küresel ağ", en: "Global network", de: "Globales Netz" },
  usGlobal: {
    tr: "ABD / küresel (bölge garantisi yok)",
    en: "USA / global (no region guarantee)",
    de: "USA / global (keine Regionsgarantie)",
  },
} as const satisfies Record<string, Trio>;

/*
  GÜVENCE SÜTUNU YALNIZ VAR OLANI SÖYLÜYOR (1.5, denetim LEG-7).

  Eskiden her ABD satırında "standart sözleşme hükümleri + veri işleme
  sözleşmesi" yazıyordu; imzalı/kabul edilmiş bir sözleşmenin kaydı depoda
  yoktu. Şimdi üç ayrı durum var:

    - `scc`: sağlayıcının herkese sunduğu veri işleme koşulları AB Standart
      Sözleşme Hükümlerini içeriyor ve hesap açılınca geçerli oluyor
      (Groq, Deepgram, Resend, RevenueCat, Firebase, Cloudflare).
    - `providerTerms`: sağlayıcının API şartları geçerli ama SCC'nin
      kapsamda olduğu doğrulanmadı (Cerebras). İddia edilmiyor.
    - `independentController`: mağazalar ve giriş sağlayıcıları bizim
      işleyenimiz değil, kendi hizmetleri için kendileri sorumlu; aktarım
      kullanıcının seçtiği hizmetin kendisi için gerekli.

  TODO(Samet): her sağlayıcının DPA'sını hesapta kabul et/indir ve bir
  klasörde sakla; Cerebras'ta SCC'li DPA varsa satırı `scc`e çek.
*/
const SAFEGUARDS = {
  scc: {
    tr: "AB Standart Sözleşme Hükümleri (sağlayıcının veri işleme koşullarında)",
    en: "EU Standard Contractual Clauses (in the provider's data processing terms)",
    de: "EU-Standardvertragsklauseln (in den Auftragsverarbeitungsbedingungen des Anbieters)",
  },
  providerTerms: {
    tr: "Sağlayıcının API ve veri işleme şartları",
    en: "The provider's API and data processing terms",
    de: "API- und Datenverarbeitungsbedingungen des Anbieters",
  },
  independentController: {
    tr: "Sağlayıcı kendi hizmeti için bağımsız veri sorumlusu; aktarım seçtiğin hizmet için gerekli",
    en: "The provider is an independent controller for its own service; the transfer is necessary for the service you chose",
    de: "Der Anbieter ist für seinen eigenen Dienst selbst verantwortlich; die Übermittlung ist für den von dir gewählten Dienst erforderlich",
  },
  euAdequacy: { tr: "AB içi (yeterlilik)", en: "Within the EU (adequacy)", de: "Innerhalb der EU (Angemessenheit)" },
  ukAdequacy: {
    tr: "Birleşik Krallık için yeterlilik kararı",
    en: "Adequacy decision for the United Kingdom",
    de: "Angemessenheitsbeschluss für das Vereinigte Königreich",
  },
  /*
    Edge sesli okuma ucu tüketici ürünü: sözleşmesi, bölge garantisi ve veri
    işleme koşulu yok. Satırın dürüst yazılabilmesinin tek sebebi gönderilen
    şeyin dar olması (yalnız seslendirilecek metin, sunucudan, kimliksiz).
  */
  none: {
    tr: "Veri işleme sözleşmesi yok; yalnız seslendirilecek metin gönderilir",
    en: "No data processing agreement; only the text to be spoken is sent",
    de: "Kein Auftragsverarbeitungsvertrag; nur der vorzulesende Text wird gesendet",
  },
} as const satisfies Record<string, Trio>;

const OCCASIONS = {
  always: { tr: "Her zaman", en: "Always", de: "Immer" },
  walkAndTts: {
    tr: "Yürüyüş modu (ekran kapalı / cepte); seslendirmede yedek yol",
    en: "Walk mode (screen off / in pocket); fallback for speech synthesis",
    de: "Gehmodus (Bildschirm aus / in der Tasche); Ausweichweg für die Sprachausgabe",
  },
  tts: { tr: "Bir metin seslendirildiğinde", en: "When a text is read aloud", de: "Wenn ein Text vorgelesen wird" },
  nightly: { tr: "Her gece", en: "Every night", de: "Jede Nacht" },
  googleSignInChosen: { tr: "Google ile giriş seçilirse", en: "If sign-in with Google is chosen", de: "Wenn die Anmeldung mit Google gewählt wird" },
  appleSignInChosen: { tr: "Apple ile giriş seçilirse", en: "If sign-in with Apple is chosen", de: "Wenn die Anmeldung mit Apple gewählt wird" },
  androidAndSubscription: { tr: "Android uygulaması ve abonelik", en: "Android app and subscription", de: "Android-App und Abonnement" },
  iosAndSubscription: { tr: "iOS uygulaması ve abonelik", en: "iOS app and subscription", de: "iOS-App und Abonnement" },
  /*
    RevenueCat SDK'sı ödeme ekranında değil, mobil uygulama açılınca
    kuruluyor (AuthContext → configureBilling), misafirde de anonim bir
    RevenueCat kimliğiyle. Eski "Premium abonelik açılınca" bunu saklıyordu
    (denetim LEG-8).
  */
  appOpenBilling: {
    tr: "Mobil uygulama açıldığında (satın alma altyapısı; misafir dahil, anonim kimlikle)",
    en: "When the mobile app opens (purchase infrastructure; guests included, under an anonymous id)",
    de: "Beim Öffnen der mobilen App (Kaufinfrastruktur; auch für Gäste, unter einer anonymen Kennung)",
  },
  pushAllowed: { tr: "Bildirimlere izin verilirse", en: "If notifications are allowed", de: "Wenn Benachrichtigungen erlaubt sind" },
  androidGuest: {
    tr: "Android'de hesapsız devam edilirse",
    en: "If you continue without an account on Android",
    de: "Wenn du unter Android ohne Konto fortfährst",
  },
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
  { name: "Apple (App Store)", purpose: "distribution", data: "purchase", region: "us", safeguard: "independentController", when: "iosAndSubscription" },
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
  /*
    Cloudflare İLK SATIR, çünkü her istek ondan geçiyor: www.lernomi.app
    Cloudflare vekili arkasında (`server: cloudflare`), TLS orada açılıyor;
    Turnstile kayıt, giriş ve parola sıfırlamada (web ve mobil WebView)
    çalışıyor. 1.5'e kadar tabloda yalnız "Workers AI" olarak geçiyordu
    (denetim LEG-2).
  */
  { name: "cloudflareEdge", purpose: "network", data: "traffic", region: "globalNetwork", safeguard: "scc" },
  /* Gecelik gpg şifreli döküm; uç `.eu.r2.cloudflarestorage.com` = AB yargı bölgesi (sunucuda okundu, 2026-09-23). */
  { name: "cloudflareR2", purpose: "offsiteBackup", data: "encryptedBackup", region: "eu", safeguard: "scc", when: "nightly" },
  /*
    SESLENDİRME ÖNCE BURAYA GİDİYOR (lib/tts/synth: Edge → Azure). Edge ucu
    Microsoft'un tüketici "sesli okuma" ucu, resmî bir API değil; sözleşme ve
    bölge garantisi yok. Satır bu yüzden dürüstçe "sözleşme yok" diyor
    (denetim LEG-3).

    KALDIRMA YOLU: seslendirme Azure'a (AB, germanywestcentral) ya da kendi
    seslerimize (`lib/tts/own`, sunucudaki dosya, alıcı yok) taşınırsa bu
    satır silinir ve sürüm kaydı düşülür. Hukuken önerilen yol o.
  */
  { name: "edgeTts", purpose: "tts", data: "ttsText", region: "usGlobal", safeguard: "none", when: "tts" },
  { name: "Microsoft Azure Speech", purpose: "sttTts", data: "audioAndTtsText", region: "eu", safeguard: "euAdequacy", when: "walkAndTts" },
  { name: "Groq", purpose: "sttWhisperLlm", data: "audioAndTexts", region: "us", safeguard: "scc" },
  { name: "Cloudflare Workers AI", purpose: "sttWhisper", data: "audio", region: "globalNetwork", safeguard: "scc" },
  { name: "Speechmatics", purpose: "stt", data: "audio", region: "uk", safeguard: "ukAdequacy" },
  { name: "Deepgram", purpose: "stt", data: "audio", region: "us", safeguard: "scc" },
  { name: "Mistral AI", purpose: "sttLlm", data: "audioAndTexts", region: "eu", safeguard: "euAdequacy" },
  { name: "Cerebras", purpose: "llm", data: "texts", region: "us", safeguard: "providerTerms" },
  { name: "Google (Sign-In)", purpose: "googleSignIn", data: "googleIdentity", region: "us", safeguard: "independentController", when: "googleSignInChosen" },
  /*
    Apple ile giriş web'de, Android'de ve iOS'ta açık (canlı `/api/config`:
    "apple":true,"appleWeb":true), yani bayraktan bağımsız. Google (Sign-In)
    satırının simetriği: aynı şey oluyor, sağlayıcı farklı.
  */
  { name: "Apple (Sign-In)", purpose: "appleSignIn", data: "appleIdentity", region: "us", safeguard: "independentController", when: "appleSignInChosen" },
  { name: "Google Play", purpose: "distribution", data: "purchase", region: "us", safeguard: "independentController", when: "androidAndSubscription" },
  /*
    PLAY INTEGRITY (1.6, docs/plan/device-attestation.md). Güvence
    `independentController`, `scc` DEĞİL: Google'ın kendi belgesi
    (developer.android.com/google/play/integrity/terms) API'yi "Play Store ile
    çalışma zamanı arayüzü" diye tanımlıyor ve Play Store'un bu sırada
    yürüttüğü veri işlemenin Google Play Hizmet Şartları'na tabi olduğunu
    söylüyor. Sinyalleri Lernomi değil cihazdaki Google Play hizmetleri
    topluyor. FCM'deki `scc`in dayanağı olan Firebase veri işleme koşulları
    bu hizmeti kapsamıyor ve Play Integrity için SCC'li ayrı bir veri işleme
    koşulu bulamadık; yalnız var olanı söyleyen kural (bkz. SAFEGUARDS notu)
    Google Play satırıyla aynı seçimi istiyor.
  */
  { name: "Google (Play Integrity)", purpose: "integrityCheck", data: "integrityToken", region: "us", safeguard: "independentController", when: "androidGuest" },
  /*
    Firebase Cloud Messaging 2026-09-10'da açıldı ve o güne kadar bu satır DOĞRU
    biçimde yoktu: uzak bildirim yapılandırılmamıştı, web push ise kendi
    sunucumuzda (VAPID) ve üçüncü tarafa uğramıyor. Sunucu kimlik bilgileri
    girildiği an cihaz jetonu ve bildirimin metni Google'a gitmeye başladı.
  */
  { name: "Google (Firebase Cloud Messaging)", purpose: "pushDelivery", data: "pushToken", region: "us", safeguard: "scc", when: "pushAllowed" },
  ...(LEGAL_PLATFORMS.ios ? IOS_PROCESSORS : []),
  { name: "RevenueCat", purpose: "subscriptionState", data: "userAndPurchase", region: "us", safeguard: "scc", when: "appOpenBilling" },
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

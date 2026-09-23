/**
 * PREMIUM SINIRLARININ TEK KAYNAĞI — üç platform da buradan besleniyor.
 *
 * Bu dosya iki şey yapıyor: sınırların BİÇİMİNİ (tip) ve VARSAYILANINI tanımlıyor.
 * Gerçekte yürürlükte olan değerler `config.ts` üzerinden geliyor ve admin
 * panelinden değiştirilebiliyor (`app_settings`); buradaki sayılar yalnız taban.
 *
 * NEDEN TEK DOSYA: aynı kilit web'de, Android'de ve iOS'ta AYNI davranmak
 * zorunda. Üç yerde üç sayı tutulsaydı ilki kayardı ve "telefonda açılıyor
 * webde açılmıyor" diye bir hata sınıfı doğardı. Mobil bu değerleri sunucudan
 * çekiyor (`/api/premium/status`), kendi kopyasını taşımıyor.
 *
 * NEDEN "sınırsız" YAZMIYORUZ: premium'un da bir adil kullanım tavanı var
 * (`fairUse`). Tavanı olan bir şeyi "sınırsız" diye pazarlamak App Store 3.1.2
 * ve Play'in abonelik beyanı kurallarına aykırı — tavan kullanıcıya YAZILIR
 * (bkz. `describeLimits`). Tavan normal kullanımda hiç görülmeyecek kadar
 * yüksek; işi bütçeyi tek bir hesabın yakmasından korumak.
 */
import { MOCK_PASS_PCT } from "@/lib/mock-exams/types";

/** Ücretsiz katmanın sınırları. */
export type FreeLimits = {
  /** Seviye başına ücretsiz deneme sınavı kâğıdı sayısı. */
  mockPapersPerLevel: number;
  /**
   * Cebe/ekran kapalı yürüyüş turu — 0 = ücretsizde hiç yok.
   *
   * Ekran AÇIK yürüyüş her iki katmanda da serbest ve sınırsız: cihazın kendi
   * tanıyıcısı kullanılıyor, bize maliyeti yok. Ekran kapalıyken sunucu STT'ye
   * (Azure) düşülüyor ve maliyet orada. Bölme bu yüzden "yürüyüş modu" değil,
   * "cepte yürüyüş" üzerinden yapılıyor — ücretsiz kullanıcı özelliği her gün
   * kullanabiliyor ama faturayı premium ödüyor.
   */
  pocketWalksPerDay: number;
  /**
   * Ömürlük konuşma hakkı — PATİKA VE BECERİLER ORTAK.
   *
   * İki ayrı hak değil: patika ünitesindeki ve Beceriler kütüphanesindeki
   * alıştırma AYNI içerik (`lib/skills/content`), iki ayrı giriş kapısı.
   * Kota alıştırmanın kimliğine düşüyor (`claimSkillAi`), hangi kapıdan
   * açıldığına değil. Bir dönem paywall ikisini ayrı satır olarak sayıyordu
   * (`speakingLessonsPerLevel`) ve o satırın karşılığı olan ayrı bir hak hiç
   * yoktu — vaat, olmayan bir yüzeyi anlatıyordu (2026-09-17'de kaldırıldı).
   */
  speakingSkills: number;
  /** Ömürlük yazma hakkı — patika ve Beceriler ortak (bkz. üstteki not). */
  writingSkills: number;
  /**
   * KARARLILIK KADEMESİ. Ücretsiz kullanıcının kapasitesi uygulamadaki
   * düzenliliğe bağlı: her `streakStep` günlük seri kademesi `streakBonus`
   * kadar konuşma VE yazma hakkı açıyor, `streakMaxTiers` kademeye kadar.
   *
   * Deneme sınavı ilerlemesiyle aynı fikir (`MockProgression`): hak edilen
   * şey açılıyor. Kazanılan geri alınmıyor — ölçü `longest_streak`.
   */
  streakStep: number;
  streakBonus: number;
  streakMaxTiers: number;
  /**
   * Ömürlük hak bittikten SONRA her hafta yenilenen konuşma+yazma hakkı.
   *
   * Ömürlük kota tek başına bir duvar: kullanıcı onu tüketir, özelliği bir daha
   * hiç görmez ve premium'u hatırlatan hiçbir şey kalmaz. Yenilenen küçük bir
   * hak ise kilidi her hafta yeniden gösteriyor — hem elde tutuyor hem
   * dönüştürüyor. Maliyeti sınırlı: kullanıcı başına haftada bu kadar AI
   * değerlendirmesi.
   */
  weeklyAiPractice: number;
};

/** Premium'un adil kullanım tavanı — kullanıcıya AÇIKÇA yazılır. */
export type FairUse = {
  /** Günde en fazla cepte yürüyüş turu. */
  pocketWalksPerDay: number;
  /** Günde en fazla AI değerlendirmesi (konuşma + yazma toplamı). */
  aiPracticePerDay: number;
};

/** Deneme sınavı paket ilerlemesi (premium). */
export type MockProgression = {
  /** Bir pakette kaç kâğıt açılır. */
  packSize: number;
  /**
   * Sonraki paketi açan başarı yüzdesi.
   *
   * Varsayılan `MOCK_PASS_PCT` ile aynı olmalı: uygulamanın zaten bir geçme notu
   * var, ikinci bir eşik icat etmek kullanıcıya iki farklı "başarı" tanımı
   * göstermek olurdu.
   */
  unlockPct: number;
  /**
   * Puan yetmese de paketin tamamı çözülünce sonraki paket açılsın mı.
   *
   * VARSAYILAN AÇIK ve bu bilinçli bir güvenlik kararı. Kapalıyken %60'ı hiç
   * tutturamayan bir kullanıcı parasını ödeyip HİÇBİR yeni kâğıt göremez —
   * iadenin, tek yıldızın ve "aldattılar" yorumunun en sık sebebi bu. Açıkken
   * ilerleme yine sıralı ve başarı yine hızlandırıyor, ama kimse kilitli
   * kalmıyor. Kapatılırsa paywall metni bunu AÇIKÇA söylemek zorunda.
   */
  unlockOnComplete: boolean;
};

/**
 * Plan kataloğu — ürün kimlikleri, deneme süresi ve GÖSTERİM fiyatları.
 *
 * MOBİLDE FİYATIN TEK KAYNAĞI MAĞAZADIR. Apple ve Google, uygulamanın mağazadan
 * gelen yerelleştirilmiş fiyatı göstermesini şart koşuyor: kullanıcının parası,
 * vergisi ve bölgesi bizim tablomuzda değil, mağazada. Bu yüzden mobil paywall
 * fiyatı RevenueCat'in döndürdüğü paketten okuyor, buradan DEĞİL.
 *
 * Buradaki fiyatlar iki yerde kullanılıyor:
 *   1. Web paywall'ı (mağaza yok, satın alma da yok — bilgi amaçlı).
 *   2. Mağaza kataloğu kurulurken referans: hangi ürüne hangi tutarı gireceğin.
 * Yani burada bir sayı değiştirmek mağazadaki fiyatı DEĞİŞTİRMEZ; ikisi elle
 * eşitlenir ve panelde bunu söyleyen bir uyarı var.
 */
export type PlanPrice = {
  /** Bölge etiketi — "TR", "EU". Yalnız gösterim ve mağaza kurulumu için. */
  region: string;
  currency: string;
  monthly: string;
  yearly: string;
  /** Yıllığın aylığa göre kazandırdığı yüzde — rozet metni bundan üretiliyor. */
  yearlySavePct: number;
};

export type Plans = {
  /** Mağazadaki ürün kimlikleri — RevenueCat offering'i bunlara bağlanır. */
  productMonthly: string;
  productYearly: string;
  /** Ücretsiz deneme (gün). Mağazada da AYNI değer tanımlanmalı. 28-31 "1 ay"
   *  diye gösteriliyor: iki mağazanın denemesi de takvim ayı (P1M,
   *  `free-trial-1m`), sabit 30 gün değil. */
  trialDays: number;
  prices: PlanPrice[];
};

export type PremiumConfig = {
  free: FreeLimits;
  fairUse: FairUse;
  mock: MockProgression;
  plans: Plans;
};

/**
 * TABAN DEĞERLER. Panelde bir anahtar silinirse buraya dönülür.
 *
 * Sayıların gerekçesi:
 *  - `mockPapersPerLevel: 1` — kullanıcı kendi seviyesinde TAM bir deneme çözüp
 *    değeri görüyor; satın alma kararı bilgiyle veriliyor.
 *  - `pocketWalksPerDay: 0` — cepte yürüyüş premium'un vitrini ve maliyetin
 *    tamamı orada.
 *  - `2` ders + `2` beceri — müfredatın tadına bakmaya yetiyor, bitirmeye yetmiyor.
 *  - `weeklyAiPractice: 2` — ömürlük hak bitince haftada iki kez hatırlatma.
 *  - `fairUse` değerleri normal kullanımın çok üstünde: gerçek bir kullanıcı
 *    günde 20 yürüyüş turu yapmaz; tavan yalnız kötüye kullanımı durduruyor.
 */
export const DEFAULT_PREMIUM_CONFIG: PremiumConfig = {
  free: {
    mockPapersPerLevel: 1,
    pocketWalksPerDay: 0,
    speakingSkills: 2,
    writingSkills: 2,
    streakStep: 7,
    streakBonus: 2,
    streakMaxTiers: 5,
    weeklyAiPractice: 2,
  },
  fairUse: {
    pocketWalksPerDay: 20,
    aiPracticePerDay: 30,
  },
  mock: {
    packSize: 3,
    /* Sayı DEĞİL sabit: aynı olması gerektiğini söyleyen bir yorum vardı
       (bkz. `unlockPct` alanının açıklaması), ölçen bir şey yoktu. İkisi
       ayrışsaydı kullanıcıya iki farklı "başarı" tanımı gösterilirdi —
       kâğıdı "geçti" diye işaretlenen biri sonraki paketi açamazdı. */
    unlockPct: MOCK_PASS_PCT,
    unlockOnComplete: true,
  },
  plans: {
    productMonthly: "lernomi_premium_monthly",
    productYearly: "lernomi_premium_yearly",
    trialDays: 30,
    prices: [
      // Yıllık aylığın 12 katı değil ~6 katı: yıllığa geçiş hem nakit akışını
      // öne çeker hem iptal oranını düşürür, indirim bu yüzden agresif.
      { region: "TR", currency: "TRY", monthly: "199,99 ₺", yearly: "1.199,99 ₺", yearlySavePct: 50 },
      { region: "EU", currency: "EUR", monthly: "4,99 €", yearly: "29,99 €", yearlySavePct: 50 },
      // GLOBAL = TR ve AB dışındaki HER yer. Mağazalar ülke başına fiyat
      // istiyor ve listede olmayan bir ülke için taban fiyattan kendileri
      // dönüştürüyor; o taban bu satır. Olmasaydı üçüncü bir bölgeden gelen
      // kullanıcı mağazanın kur dönüşümüne kalırdı ve web vitrini ona hiçbir
      // fiyat gösteremezdi.
      { region: "GLOBAL", currency: "USD", monthly: "4,99 $", yearly: "29,99 $", yearlySavePct: 50 },
    ],
  },
};

/**
 * Kilitlenen yetenekler — ANAHTARLARI sözleşme, değerleri değil.
 *
 * Anahtar üç şey birden: telemetriye giden ad (`premium_gate` olayının
 * `kind`'ı), kota anahtarı ön eki ve `PremiumGate` tipinin kendisi. Buraya
 * eklenen her yetenek üç platformda da aynı adla ölçülüyor.
 *
 * DEĞERLER ARAYÜZE GİTMİYOR ve gitmemeli. Türkçe yazılı duruyorlar ve hiçbir
 * bileşen onları okumuyor (ölçüldü: `PREMIUM_GATES` yalnız bu dosya, `index`
 * ve bir yorumda geçiyor) — paywall'ın söylediği her satır ANAHTAR + PARAMETRE
 * olarak dönüyor (hemen aşağıda, `premiumScopeLines`), çeviri katmanı istemcide
 * kalıyor. Buradaki metinler yalnız okuyan insana "bu kapı neydi" diyen
 * etiketler. Biri bunları ekrana basarsa arayüzü Almanca olan kullanıcı Türkçe
 * görür; o yüzden yeni bir kapı eklerken metni buraya değil sözlüğe yaz.
 */
export const PREMIUM_GATES = {
  mock_exam: "Deneme sınavları",
  pocket_walk: "Cepte yürüyüş (ekran kapalı)",
  speaking: "Konuşma alıştırmaları",
  writing: "Yazma alıştırmaları",
} as const;

export type PremiumGate = keyof typeof PREMIUM_GATES;

/**
 * Aboneliğin kapsamını kullanıcıya anlatan satırlar — paywall bunu gösterir.
 *
 * METİN DEĞİL, ANAHTAR + PARAMETRE dönüyor. Sunucuda Türkçe cümle üretmek
 * arayüzün üç dilini (tr/en/de) kırardı: sunucu kullanıcının dilini bilmek
 * zorunda kalır, mobil sözlükler devre dışı kalır ve aynı cümle iki yerde
 * yaşamaya başlardı. Anahtar dönünce çeviri katmanı olduğu yerde kalıyor.
 *
 * Satırlar YAPILANDIRMADAN üretiliyor, elle yazılmıyor. Kural: panelden bir
 * sınır değiştirildiğinde paywall'ın söylediği şey de değişmek ZORUNDA, yoksa
 * beyan gerçekle ayrışır ve iki mağazanın da yanıltıcı beyan kuralına takılır
 * (App Store 2.3.1 / 3.1.2, Play Yanıltıcı Davranış). Elle yazılan bir metin er
 * geç ayrışır; üretilen metin ayrışamaz.
 */
export type CopyLine = { key: string; params?: Record<string, string | number> };

export function describeLimits(cfg: PremiumConfig): { free: CopyLine[]; premium: CopyLine[] } {
  const { free, fairUse, mock } = cfg;
  return {
    free: [
      { key: "plan.free_core" },
      { key: "plan.free_walk" },
      { key: "plan.free_mock", params: { n: free.mockPapersPerLevel } },
      /* Haftalık quiz ÜCRETSİZ (karar 2026-09-16) ve bu satır ücretsiz
         sütununda kalıyor. Premium sütunundaki karşılığı (`plan.pro_weekly`)
         KALDIRILDI: "havuzun tamamı ve geçmiş haftalar" diye bir şey hiç
         yapılmadı, yani ödeme yapan kullanıcı o satır karşılığında hiçbir şey
         almıyordu. Vaadi silmek, teslim edilmeyen bir vaadi taşımaktan iyidir
         (App Store 2.3.1 / 3.1.2, Play yanıltıcı beyan). */
      /* SAYI ARTIK AYARDAN GELMİYOR, SABİT 1 — ve bu doğru: haftada bir quiz
         bir kota değil, `weekly_quiz_user_week_idx` benzersiz kısıtı. Ama
         parametre KALDIRILMIYOR: eski paketlerdeki cümle `{n}` taşıyor ve
         parametre gelmezse ekranda literal "{n}" görünüyor (emülatörde
         görüldü). Fazladan parametre zararsız, eksik parametre bozuk metin. */
      { key: "plan.free_weekly", params: { n: 1 } },
      /* TEK SATIR, TEK HAVUZ. Eskiden burada iki satır vardı ("seviye başına N
         ders" + "kütüphanede N") ve bu, iki ayrı hak olduğunu ima ediyordu.
         Oysa patika ünitesindeki ve Beceriler'deki alıştırma aynı içerik, kota
         da aynı — birinci satırın karşılığı olan ayrı bir hak hiç yoktu. */
      /* ANAHTAR YENİDEN KULLANILIYOR, YENİSİ UYDURULMUYOR. Paywall satırları
         sunucudan ANAHTAR olarak iniyor ve çeviri istemcinin GÖMÜLÜ sözlüğünden
         geliyor (`lib/i18n` `bul(key) ?? key`): sunucuya yeni bir anahtar
         eklemek, o anahtarı bilmeyen kurulu sürümlerde ekrana HAM ANAHTAR
         bastırıyor. Emülatörde görüldü (2026-09-17). `plan.free_skills` eski
         paketlerde de var; metni değişti, anahtar durdu — eski sürüm okunur
         bir cümle gösteriyor, yeni sürüm doğrusunu. */
      { key: "plan.free_skills", params: { s: free.speakingSkills, w: free.writingSkills } },
      /* KARARLILIK SATIRI. Ücretsiz katmanın kapasitesi düzenli kullanıma bağlı
         ve bunu SÖYLÜYORUZ: kilidi "paran yetmiyor" diye değil "devam edersen
         açılır" diye kurmak, hem doğru hem de kullanıcıyı uygulamada tutan şey.
         Kademe kapalıysa (panelden 0) satır hiç çizilmiyor — olmayan bir vaadi
         anlatmamak için. */
      ...(free.streakBonus > 0 && free.streakMaxTiers > 0
        ? [{ key: "plan.free_streak_ai", params: { d: free.streakStep, n: free.streakBonus } }]
        : []),
      { key: "plan.free_weekly_ai", params: { n: free.weeklyAiPractice } },
    ],
    premium: [
      { key: "plan.pro_pocket_walk" },
      { key: "plan.pro_mock", params: { n: mock.packSize } },
      { key: "plan.pro_ai", params: { n: fairUse.aiPracticePerDay } },
      { key: "plan.pro_walk_cap", params: { n: fairUse.pocketWalksPerDay } },
    ],
  };
}

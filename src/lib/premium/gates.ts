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
/**
 * Ücretsiz katmanın sınırları — 2026-09-25 kararları (`docs/premium/README.md` §2).
 *
 * KOTALI BEŞ YÜZEY, HEPSİ AYRI SAYAÇ. Patika Konuşma, Patika Yazma, Beceriler
 * konuşma ve Beceriler yazma seviye başına; deneme sınavı seviye başına; yürüyüş
 * modu gün başına. Bir dönem "Patika ve Beceriler ortak / tek havuz" diye
 * anlatılıyordu ve kod bunu hiç yapmıyordu (sayaçlar ayrıydı); karar artık
 * ayrı sayaçları AÇIKÇA söylüyor.
 *
 * HAK NASIL KAZANILIYOR: taban + her "tamamla ve 7 günlük seri yap" dilimi.
 * Hesap tek yerde, `unlock.ts`.
 */
export type FreeLimits = {
  /** Seviye başına açık deneme sınavı kâğıdı (taban). */
  mockPapersPerLevel: number;
  /** Deneme sınavında her dilimin açtığı kâğıt (kararda 1). */
  mockStreakBonus: number;
  /**
   * Yürüyüş modu, günde oturum — yalnız EKRAN AÇIK.
   *
   * Oturum sunucuda, yürüyüş kuyruğunun (`/api/session?walk=1`) açıldığı anda
   * sayılıyor (`walkSession`); istemcinin "başladım" demesine bakılmıyor. Ekran
   * KAPALI yol (sunucu ses tanıma, maliyetin tamamı orada) ücretsizde hiç yok.
   * 0 = yürüyüş modu ücretsizde kapalı.
   */
  walkSessionsPerDay: number;
  /**
   * Patika Konuşma adımı, seviye başına (taban).
   *
   * Konuşma adımı = Türkçe anlatım + yapay zekâ sohbeti + isteğe bağlı puanlı
   * kısım; hepsi TEK hak. Hak ilk yapay zekâ turunda düşüyor ve adım
   * "sahipleniliyor" — yeniden açmak hak yemiyor.
   */
  conversationsPerLevel: number;
  /** Patika Yazma (yapay zekâ değerlendirmesi), seviye başına (taban). */
  pathWritingPerLevel: number;
  /** Beceriler konuşma (B1+ monolog), seviye başına (taban). A1–A2 drili yapay zekâsız ve sınırsız. */
  speakingSkills: number;
  /** Beceriler yazma, seviye başına (taban). */
  writingSkills: number;
  /** Seri adımı (gün) — "7 günlük seri". */
  streakStep: number;
  /** Patika ve Beceriler'de her dilimin açtığı hak. */
  streakBonus: number;
  /**
   * Kademe tavanı — seri kaç kez hak açabilir. 0 = SINIRSIZ.
   *
   * Karar verilmedi (2026-09-25); varsayılan tavansız. Ücretsiz katmanın premium'un
   * yerine geçmesini tavan değil "bitir" koşulu frenliyor: her dilim önceki
   * dilimdeki hakların hepsinin bitirilmesini istiyor.
   */
  maxTiers: number;
};

/**
 * Premium'un kötüye kullanım tavanları — kullanıcıya AÇIKÇA yazılır, "sınırsız"
 * denmez (App Store 3.1.2, Play abonelik beyanı).
 */
export type FairUse = {
  /**
   * Günde yürüyüş oturumu (ekran açık + kapalı). Ücretsizdeki sayaçla AYNI
   * sayaç, yani duyurulan sayı gerçekten sayılıyor. Eskiden burada "günde 20
   * tur" duruyordu ve o turu hiçbir yer saymıyordu.
   */
  walkSessionsPerDay: number;
  /** Günde en fazla yapay zekâ değerlendirmesi (alıştırma başına ilk değerlendirme). */
  aiPracticePerDay: number;
};

/**
 * Deneme sınavı paketleri (premium): paketteki kâğıtların HEPSİ bitirilince
 * sonraki paket açılır. Bir dönem %60 başarı da açıyordu ("ya da bitir"
 * supabıyla); 2026-09-25'te kalktı — tek kural "bitir".
 */
export type MockProgression = {
  /** Bir pakette kaç kâğıt açılır. */
  packSize: number;
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
 * Sayıların gerekçesi (kararlar `docs/premium/README.md` §2, 2026-09-25):
 *  - Patika Konuşma/Yazma ve Beceriler konuşma/yazma seviye başına `2` — müfredatın
 *    tadına bakmaya yetiyor, bitirmeye yetmiyor. Üstü "bitir + 7 günlük seri" ile
 *    ikişer ikişer açılıyor (`streakBonus`).
 *  - Deneme sınavı seviye başına `1` + her dilimde `1`.
 *  - Yürüyüş modu günde `3` oturum, yalnız ekran açık (cihazın tanıyıcısı, maliyet
 *    yok); ekran kapalı yol premium.
 *  - `maxTiers: 0` — kademe tavanı yok (karar verilmedi, panelden ayarlanabilir).
 *  - `fairUse` değerleri normal kullanımın çok üstünde; iş bütçeyi tek bir hesabın
 *    yakmasından korumak.
 */
export const DEFAULT_PREMIUM_CONFIG: PremiumConfig = {
  free: {
    mockPapersPerLevel: 1,
    mockStreakBonus: 1,
    walkSessionsPerDay: 3,
    conversationsPerLevel: 2,
    pathWritingPerLevel: 2,
    speakingSkills: 2,
    writingSkills: 2,
    streakStep: 7,
    streakBonus: 2,
    maxTiers: 0,
  },
  fairUse: {
    walkSessionsPerDay: 20,
    aiPracticePerDay: 30,
  },
  mock: {
    packSize: 3,
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
  walk: "Yürüyüş modu oturumu (günlük)",
  conversation: "Patika Konuşma adımı",
  speaking: "Konuşma değerlendirmesi (Beceriler)",
  writing: "Yazma değerlendirmesi (Patika Yazma, Beceriler)",
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
  const tiers = free.streakBonus > 0 && free.streakStep > 0;
  return {
    /*
      SATIRLAR 2026-09-25 TABLOSUYLA BİREBİR (`docs/premium/README.md` §2).

      VAR OLAN ANAHTARLAR YENİDEN KULLANILIYOR, yenisi yalnız gerçekten yeni bir
      satır için: satırlar sunucudan ANAHTAR olarak iniyor, çeviri istemcinin
      GÖMÜLÜ sözlüğünden geliyor ve bilinmeyen anahtar kurulu eski sürümde ham
      basılıyor (`bul(key) ?? key`, emülatörde görüldü 2026-09-17). Eski sürüm
      yeniden kullanılan anahtarda eski cümlesini gösteriyor; yenisi doğrusunu.
      Parametre ÇIKARILMIYOR, fazlası zararsız (`plan.free_weekly` bu yüzden
      kullanmadığı `n`'yi taşıyor).

      KALKANLAR: "patika ve Beceriler ortak" (`plan.free_skills`in eski metni),
      haftada yenilenen hak (`plan.free_weekly_ai`), cepte yürüyüşte sayılmayan
      "günde 20 tur" (`plan.pro_walk_cap` premium listesinden çıktı; tavan artık
      gerçekten sayılan oturum ve adil kullanım satırında).
    */
    free: [
      { key: "plan.free_core" },
      /* Haftalık quiz iki katmanda da haftada bir — kota değil, benzersiz kısıt. */
      { key: "plan.free_weekly", params: { n: 1 } },
      ...(free.walkSessionsPerDay > 0 ? [{ key: "plan.free_walk", params: { n: free.walkSessionsPerDay } }] : []),
      { key: "plan.free_mock", params: { n: free.mockPapersPerLevel } },
      { key: "plan.free_path_ai", params: { c: free.conversationsPerLevel, w: free.pathWritingPerLevel } },
      { key: "plan.free_skills", params: { s: free.speakingSkills, w: free.writingSkills } },
      /* HAKKIN NASIL KAZANILDIĞI. Kilidi "paran yetmiyor" değil "bitir ve devam
         et, açılır" diye kurmak hem doğru hem kullanıcıyı uygulamada tutan şey.
         Kademe kapalıysa (panelden bonus 0) satır çizilmiyor — olmayan bir vaadi
         anlatmamak için. */
      ...(tiers
        ? [{ key: "plan.free_streak_ai", params: { d: free.streakStep, n: free.streakBonus, m: free.mockStreakBonus } }]
        : []),
      ...(tiers && free.maxTiers > 0 ? [{ key: "plan.free_streak_cap", params: { n: free.maxTiers } }] : []),
    ],
    premium: [
      { key: "plan.pro_pocket_walk" },
      { key: "plan.pro_mock", params: { n: mock.packSize } },
      /* `n` KALIYOR: eski sürümlerin cümlesi "günde {n} değerlendirmeye kadar"
         ve parametresiz kalırsa ekranda literal "{n}" görünür. */
      { key: "plan.pro_ai", params: { n: fairUse.aiPracticePerDay } },
    ],
  };
}


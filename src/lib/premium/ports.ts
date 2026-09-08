import "server-only";

/**
 * SAĞLAYICI SÖZLEŞMESİ — RevenueCat'ten (ya da yarınki her ne ise) bağımsızlığın durduğu yer.
 *
 * Kural tek cümle: **RevenueCat adı bu klasörün dışında geçmez.** Uygulamanın
 * geri kalanı "premium mi" diye sorar, kimin sattığını bilmez. Sağlayıcıya özgü
 * her şey — olay adları, alan isimleri, imza doğrulaması — bir adaptörün içinde
 * kalır ve dışarıya yalnız `StoreEvent` çıkar.
 *
 * Sağlayıcı değiştirmek bu yüzden tek dosyalık iş: yeni bir `StoreAdapter` yazıp
 * `providers/index.ts`teki kayda eklemek. Gating, promo, referans, admin paneli,
 * mobil ve web hiç değişmez. Ayrılırken taşınacak veri de hazır: `premium_grants`
 * defterinde her hareket duruyor, `entitlements` tablosu kimin ne zamana kadar
 * hakkı olduğunu söylüyor — yeni sağlayıcıya geçerken kimse yetkisini kaybetmez.
 *
 * Bugün tek adaptör var (RevenueCat). İkincisi geldiğinde (App Store Server
 * Notifications, Google RTDN, Stripe) bu dosya değişmez.
 */

/** Aboneliğin sağlayıcıdan bağımsız durumu. */
export type StoreState =
  | "trial" // ücretsiz deneme sürüyor — yetki VAR
  | "active" // ödenmiş ve sürüyor
  | "grace" // ödeme alınamadı, mağaza yeniden deniyor — yetki sürüyor
  | "canceled" // otomatik yenileme kapatıldı, süre dolana dek yetki SÜRER
  | "expired" // süre doldu
  | "refunded" // iade edildi — yetki DERHAL biter
  | "paused"; // kullanıcı dondurdu (Play)

/** Yetkiyi sürdüren durumlar. `canceled` bilerek burada: süresi dolana dek premium'dur. */
export const STATE_GRANTS: ReadonlySet<StoreState> = new Set<StoreState>([
  "trial",
  "active",
  "grace",
  "canceled",
]);

/**
 * Normalleştirilmiş mağaza olayı — adaptörlerin ürettiği TEK biçim.
 *
 * `expiresAt` sağlayıcının bildirdiği mutlak bitiş. Biz uzatmayız, üzerine
 * yazarız: tek kaynak sağlayıcıdır. Bonus (promo/referans) bundan tamamen ayrı
 * bir bileşen olduğu için üzerine yazmak hiçbir hediyeyi silmez.
 */
export type StoreEvent = {
  /** Sağlayıcı adı — `entitlements.store_provider`e yazılır. */
  provider: string;
  /** Sağlayıcıdaki olay kimliği. Tekrarlanan teslimatları elemek için ZORUNLU. */
  eventId: string;
  /** Bizim kullanıcı kimliğimiz. */
  userId: string;
  state: StoreState;
  /** Abonelik bitişi. `refunded`/`expired` olaylarında null olabilir. */
  expiresAt: Date | null;
  /** ios | android | web — iptal yönergesi ve raporlama için. */
  platform: "ios" | "android" | "web" | null;
  /** Mağazadaki ürün kimliği. */
  productId: string | null;
  /** Sağlayıcıdaki abonelik kimliği (aynı aboneliğin olaylarını eşler). */
  ref: string | null;
  /**
   * Bu olayda GERÇEK para alındı mı (deneme değil).
   *
   * Referans ödülünün tetiği bu tek alan: deneme başlangıcı ödül üretmez.
   * Adaptör bunu sağlayıcının kendi alanlarından çıkarır (RevenueCat'te
   * `period_type !== "TRIAL"`), çağıran taraf sağlayıcının kelime dağarcığını
   * hiç görmez.
   */
  paid: boolean;
};

/** Webhook'un sonucu — uç bunu HTTP durumuna çeviriyor. */
export type WebhookResult =
  | { ok: true; event: StoreEvent }
  | { ok: false; status: 401 | 400 | 503; reason: string };

/**
 * Bir mağaza sağlayıcısının adaptörü.
 *
 * `configured` false ise webhook 503 döner ve HİÇBİR ŞEY yazılmaz — yapılandırma
 * eksikken sessizce çalışıyormuş gibi yapmak, yetkinin yazılmadığını aylar sonra
 * fark etmek demek.
 */
export type StoreAdapter = {
  name: string;
  /** Sır tanımlı mı; değilse uç 503 döner. */
  configured(): boolean;
  /**
   * Ham isteği doğrular ve normalleştirir.
   *
   * Doğrulama adaptörün işi çünkü her sağlayıcı farklı yapıyor: RevenueCat
   * paylaşılan sır başlığı, Apple imzalı JWS, Stripe HMAC. Dışarıdaki uç
   * yalnız sonucu görür.
   */
  parse(req: Request, raw: string): Promise<WebhookResult>;
};

/**
 * PROFİLİN VARSAYILANLARI — sunucudaki şemayla aynı sayılar.
 *
 * Profil daha yüklenmemişken ekranlar bir değer göstermek zorunda ve o değer
 * ekranın kendi içinde yazılıydı: günde yeni kelime için **10**, oysa şemanın
 * varsayılanı 15 (`profiles.new_per_day`). Sunucuda 15 duran bir hesapta ayar
 * ekranı kısa bir an 10 gösteriyor ve kullanıcı o anda kaydırıcıya
 * dokunursa 10 yazılıyordu — yani ekranın tahmini gerçeğin yerine geçiyordu.
 * Web'de bu sorun yok: sayfa sunucuda çiziliyor ve gerçek değerle geliyor.
 *
 * Sayılar burada TEK YERDE ve `check:parity` şemayla karşılaştırıyor: şemada
 * bir varsayılan değişirse kapı düşer.
 */
export const PROFILE_DEFAULTS = {
  dailyGoal: 20,
  newPerDay: 15,
  level: "A1",
  course: "de",
  /** Hatırlatma saati — `lib/notifications` de aynı sayıyı kullanıyor. */
  reminderHour: 12,
} as const;

/**
 * PROFİL ALANLARININ SINIRLARI — sunucudaki `lib/profile-limits` ile aynı
 * sayılar. Uç bu sınırlarla kırpıyor (`api/profile`); arayüz onları kendi
 * içinde tutarsa kullanıcı SEÇEBİLDİĞİ bir değerin kaydedilmediğini görür.
 * `check:parity` bu sayıları sunucuyla karşılaştırıyor.
 */
export const PROFILE_LIMITS = {
  dailyGoal: { min: 5, max: 120 },
  newPerDay: { min: 0, max: 40 },
  displayNameMax: 40,
} as const;

/**
 * SOSYAL PROFİLİN SINIRLARI — sunucudaki `lib/social/username` ile aynı
 * sayılar. Kullanıcı adı 20, biyografi 140 karakterdi ve ikisi de ekranın
 * içinde yazılıydı; sunucu aynı sayıları kendi kuralında tutuyor. Üç yerde
 * yazılı bir sınır, biri değişince sessizce ayrışır: kullanıcı yazabildiği
 * bir adın reddedildiğini görür. `check:parity` bu sayıları sunucuyla
 * karşılaştırıyor.
 */
export const SOCIAL_LIMITS = {
  usernameMax: 20,
  bioMax: 140,
} as const;

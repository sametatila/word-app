import type { NextConfig } from "next";

/**
 * Güvenlik başlıkları.
 *
 * CSP bilinçli olarak dar tutuldu: yalnızca hiçbir işlevi bozmayan ama gerçek
 * saldırıları kesen yönergeler var. Tam bir script-src politikası Next.js'in
 * ve Tailwind'in ürettiği satır içi kodlar yüzünden nonce altyapısı gerektirir;
 * bu uygulamanın risk profiline göre gereksiz karmaşıklık olurdu.
 */
const SECURITY_HEADERS = [
  // Oturum açmış kullanıcıyı tıklama hırsızlığına (clickjacking) karşı korur.
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'none'", // sayfa hiçbir yerde çerçevelenemez
      "base-uri 'self'", // <base> ile göreli yollar kaçırılamaz
      "form-action 'self'", // form gönderimi dışarı yönlendirilemez
      "object-src 'none'", // eklenti içeriği yok
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Güçlü aygıt izinleri kapalı; mikrofon yalnızca kendi origin'imize açık.
  //
  // `microphone=()` her origin'i — kendimiz dahil — engeller ve tarayıcı izin
  // istemini hiç göstermez. Konuşma alıştırmaları eklenene kadar bu doğruydu,
  // sonrasında özelliği sessizce çalışmaz hâle getirdi: kullanıcı mikrofona
  // dokunuyor, hiçbir şey olmuyordu. `self` yalnızca bu siteye izin verir,
  // üçüncü taraf çerçevelere değil.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), payment=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // "x-powered-by: Next.js" sürüm/altyapı bilgisini gereksizce açık ediyordu.
  poweredByHeader: false,

  /**
   * Dağıtım kimliği — blue-green geçişinde SÜRÜM KAYMASI koruması.
   *
   * Sorun log'da görünüyordu: her deploy'dan sonra sunucu "Failed to find
   * Server Action. This request might be from an older or newer deployment"
   * hataları basıyor. Sebebi, deploy anında açık duran bir sekmenin ESKİ
   * yapıya ait bir eylem kimliğini YENİ instance'a göndermesi; yeni yapıda o
   * kimlik yok ve istek hataya düşüyor.
   *
   * `deploymentId` verilince Next yanıta `x-nextjs-deployment-id` koyuyor ve
   * istemci kendi kimliğiyle uyuşmadığını görünce istemci-içi gezinme yerine
   * TAM SAYFA YENİLEME yapıyor: eylem hiç gönderilmiyor, kullanıcı yeni yapıya
   * geçmiş oluyor. Statik varlıklara da `?dpl=` ekleniyor, yani tarayıcı ve CDN
   * eski parçaları yeni sürümle karıştırmıyor.
   *
   * Değeri deploy betiği veriyor (`NEXT_DEPLOYMENT_ID`, commit kısası). Yerelde
   * tanımsız: özellik kapalı kalır, geliştirmede zaten tek sürüm var.
   */
  deploymentId: process.env.NEXT_DEPLOYMENT_ID,

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Service worker önbelleğe alınmamalı: bildirim davranışındaki bir
        // düzeltmenin kullanıcıya ulaşması, tarayıcının eski kopyayı ne zaman
        // bırakacağına kalmamalı. Kapsam başlığı da burada — dosya kökten
        // servis edildiği için `/` kapsamı zaten hakkı, ama açıkça yazmak
        // taşınma ihtimaline karşı niyeti belgeliyor.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // İlerleme sayfası Profil'e taşındı; eski yer imleri ve PWA kısayolları kırılmasın.
      { source: "/progress", destination: "/profile", permanent: false },
      // Türkçe yol adları İngilizceye taşındı; eski bağlantılar, bildirim URL'leri
      // ve yer imleri kırılmasın.
      { source: "/beceriler", destination: "/skills", permanent: true },
      { source: "/learn/haftalik", destination: "/learn/weekly", permanent: true },
      { source: "/lessons/sinav/:level/:module", destination: "/lessons/boss/:level/:module", permanent: true },
      { source: "/profile/ayarlar", destination: "/profile/settings", permanent: true },
      { source: "/profile/yazilarim", destination: "/profile/writings", permanent: true },
      // Hukuki sayfalar: Türkçe kısa adresler (mağaza listesi, e-posta imzası).
      { source: "/gizlilik", destination: "/privacy", permanent: true },
      { source: "/kullanim-sartlari", destination: "/terms", permanent: true },
      { source: "/hesap-sil", destination: "/account/delete", permanent: true },
    ];
  },
};

export default nextConfig;

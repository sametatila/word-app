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
    ];
  },
};

export default nextConfig;

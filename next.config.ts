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
  // Uygulamanın kullanmadığı güçlü aygıt izinleri baştan kapatılır.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // "x-powered-by: Next.js" sürüm/altyapı bilgisini gereksizce açık ediyordu.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

};

export default nextConfig;

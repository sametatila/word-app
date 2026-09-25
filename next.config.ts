import type { NextConfig } from "next";

/** Cloudflare Turnstile — tarayıcının bağlandığı TEK dış köken (giriş/kayıt formları). */
const TURNSTILE = "https://challenges.cloudflare.com";

const isDev = process.env.NODE_ENV === "development";

/**
 * Güvenlik başlıkları.
 *
 * CSP'DE ARTIK KAYNAK YÖNERGELERİ DE VAR. Önceki politika yalnız çerçeveleme,
 * <base>, form ve eklentiyi kısıyordu; `default-src` olmadığı için listelenmeyen
 * her yönerge "her şeye izin" sayılıyordu. Bir XSS araya girerse
 * `<script src=başka-site>`, `fetch()` ya da `<img>` ile veri dışarı
 * sızdırılabilirdi (güvenlik denetimi 2026-09-14, #6). Artık yükleme ve bağlantı
 * yalnız kendi kökenimize ve Turnstile'a açık.
 *
 * ENVANTER (2026-09-14, kaynak + derlenmiş parçalar tarandı): tarayıcı dış
 * olarak yalnız Turnstile'a gidiyor. Ses `/api/tts`ten aynı kökenden;
 * `blob:` maskot animasyonu (img), kayıt ve bip sesleri (media) için; `data:`
 * iOS ses kilidini açan sessiz MP3 için (media). Wasm, worker, dış font, dış
 * görsel, analitik yok. Yeni bir dış kaynak eklenirse buraya eklenmeden
 * tarayıcıda ENGELLENİR: bu kasıtlı.
 *
 * NEDEN 'unsafe-inline' (nonce değil). Next'in App Router'ı her sayfaya
 * sayfaya özgü satır içi betik basıyor; hash bunları kapsayamıyor. Nonce ise
 * her sayfayı dinamik render'a zorluyor (Next CSP rehberi), içerik ağırlıklı
 * bu uygulamada gerçek bir maliyet. 'unsafe-inline' satır içi enjeksiyonu
 * açık bırakıyor ama dış betik yüklemeyi ve veri sızdırmayı kapatıyor. Stil
 * tarafında zaten zorunlu: yüzlerce `style={…}` özniteliği var ve nonce
 * özniteliği kapsamıyor.
 *
 * Mobil WebView'ın açtığı iki HTML sayfası (`/api/turnstile`, `/tts-bridge`)
 * da bu politikayla çalışıyor: satır içi betik + Turnstile + `/api/tts`.
 * Native `injectJavaScript` CSP'ye tabi değil.
 *
 * Geliştirmede React hata yığınları için `eval`, hot reload için WebSocket
 * gerekiyor; ikisi yalnız `next dev`te ekleniyor.
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob:",
  "media-src 'self' blob: data:",
  `connect-src 'self' ${TURNSTILE}${isDev ? " ws: wss:" : ""}`,
  `frame-src ${TURNSTILE}`,
  "worker-src 'self'",
  "manifest-src 'self'",
  "font-src 'self'",
  "frame-ancestors 'none'", // sayfa hiçbir yerde çerçevelenemez
  "base-uri 'self'", // <base> ile göreli yollar kaçırılamaz
  "form-action 'self'", // form gönderimi dışarı yönlendirilemez
  "object-src 'none'", // eklenti içeriği yok
].join("; ");

const SECURITY_HEADERS = [
  // Oturum açmış kullanıcıyı tıklama hırsızlığına (clickjacking) karşı korur.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: CSP },
  /*
    Köken yalıtımı (#13). COOP: başka bir sitenin açtığı pencere bizim
    penceremize `window.opener` üzerinden erişemez. `allow-popups`: bizim
    açtığımız pencereler (sertifika, gizlilik bağlantısı) çalışmaya devam eder.
    Sosyal giriş açılır pencere değil tam sayfa yönlendirme, etkilenmez.
    CORP `same-site`: yanıtlarımızı başka SİTELER gömemez; apex ile www aynı
    site sayılıyor. Tarayıcı dışı istemciler (mobil uygulama, e-posta görsel
    vekilleri, önizleme botları) CORP'a tabi değil.
  */
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
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
        /*
          Uygulamaya giriş devri: adres tek kullanımlık bir jeton taşıyor
          (`?ott=`, /auth/handoff). Sayfa uygulama kurulu değilse görünüyor ve
          "web'de devam et" bağlantısı var; varsayılan politika aynı kökene
          TAM adresi Referer olarak gönderir, jeton bir sonraki isteğin
          başlığına ve sunucu günlüğüne taşınırdı (#15). Önbelleğe de
          alınmamalı. Bu kural genelden SONRA: aynı anahtarda son eşleşen
          geçerli (Next headers belgesi).
        */
        source: "/auth/app",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
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
      { source: "/profile/ayarlar", destination: "/profile/settings", permanent: true },
      { source: "/profile/yazilarim", destination: "/profile/writings", permanent: true },
      { source: "/ilk-kelimeler", destination: "/first-words", permanent: true },
      // Hukuki sayfalar: Türkçe kısa adresler (mağaza listesi, e-posta imzası).
      { source: "/gizlilik", destination: "/privacy", permanent: true },
      { source: "/kullanim-sartlari", destination: "/terms", permanent: true },
      { source: "/hesap-sil", destination: "/account/delete", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import { FALLBACK_HOST } from "./src/lib/site";

/** Cloudflare Turnstile — tarayıcının bağlandığı TEK dış köken (giriş/kayıt formları). */
const TURNSTILE = "https://challenges.cloudflare.com";

const isDev = process.env.NODE_ENV === "development";

/** Dağıtım kimliği: deploy betiğinin verdiği, yoksa üretimde checkout'un commit kısası (bkz. `deploymentId`). */
function deploymentId(): string | undefined {
  if (process.env.NEXT_DEPLOYMENT_ID) return process.env.NEXT_DEPLOYMENT_ID;
  if (process.env.NODE_ENV !== "production") return undefined;
  try {
    return execSync("git rev-parse --short HEAD", { cwd: process.cwd(), stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

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
   * Arayüz sözlükleri TARAYICI DERLEMESİNE GİRMİYOR: orada boş kayıt
   * (`dicts-browser`), yalnız arayüz dili sonradan yükleniyor. Gerekçe ve
   * akış `src/lib/i18n/dicts-all.ts`. Sunucu ve betikler asıl modülü görüyor.
   */
  /**
   * Künyeyi <head>'de BEKLETEREK alan botlar (2026-10-02).
   *
   * Next 16 `generateMetadata`ı akıtıyor: künye geç çözülürse (ör. hukuki ve
   * destek metinleri veritabanından) etiketler <body> sonuna ekleniyor. Next'in
   * varsayılan listesi yalnız JavaScript çalıştırmayan arama/önizleme botları;
   * Googlebot ve yapay zekâ tarayıcıları (GPTBot, ClaudeBot, Perplexity…) dışarıda
   * kalıyordu. Ölçüm: klasik Googlebot kimliğiyle /support'ta açıklama ve kanonik
   * <body>'deydi; JS çalıştırmayan yapay zekâ botları onları hiç görmez. Bu
   * botlarda künye artık her zaman <head>'de; bedeli yalnız bu botlara birkaç ms.
   *
   * Next'in listesinin AYNISI + ekler (geçersiz kılınca varsayılan devre dışı
   * kalıyor): Next yükseltilince `next/dist/shared/lib/router/utils/html-bots.js`
   * ile karşılaştır.
   *
   * TEK FARK BİLEREK: Next'in `[\w-]+-Google|Google-[\w-]+` parçası burada
   * `[\w-]-Google|Google-[\w-]`. Desen her HTML isteğinde User-Agent'a
   * `.test()` ile uygulanıyor; `+` uzun bir UA'da ikinci dereceden geri izleme
   * yapıyordu (16 KB'ta ~200 ms, tek çekirdek kilitli; güvenlik denetimi
   * 2026-10-03, D22). `.test()` için anlam aynı: "bir [\w-] ardından -Google"
   * ancak "bir ya da daha çok [\w-] ardından -Google" varsa vardır.
   */
  htmlLimitedBots:
    /[\w-]-Google|Google-[\w-]|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|Googlebot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|CCBot|Amazonbot|meta-externalagent|Bytespider|cohere-ai|MistralAI-User|DuckAssistBot/i,

  turbopack: {
    resolveAlias: {
      "@/lib/i18n/dicts-all": { browser: "./src/lib/i18n/dicts-browser.ts" },
    },
  },

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
   * Değeri deploy betiği veriyor (`NEXT_DEPLOYMENT_ID`, commit kısası).
   *
   * ÇALIŞIRKEN DE AYNI DEĞER (2026-10-02). Bu dosya `next start`ta yeniden
   * okunuyor ve değişken yalnız derlemede veriliyordu: çalışan instance'ta
   * kimlik boştu. Sonuç iki kat kötüydü: yanıtta `x-nextjs-deployment-id`
   * yoktu (yukarıdaki koruma canlıda hiç çalışmıyordu) ve HTML aynı JS ve
   * yazı tipi dosyasını hem `?dpl=` ile hem eksiz yazıyordu, tarayıcı ikisini
   * de indiriyordu (sayfa başına ~450 KB). Değişken yoksa üretimde kimlik aynı
   * checkout'un commit'inden okunuyor; deploy betiği de aynı komutu kullanıyor,
   * derleme ve çalışma aynı değeri görüyor. Geliştirmede kapalı.
   */
  deploymentId: deploymentId(),

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        /*
          YEDEK ALAN ADI dizine girmesin (bkz. lib/site FALLBACK_ORIGIN). Aynı
          uygulama iki adreste servis ediliyor; yedek yalnız asıl adresi
          engelleyen ağlardaki mobil API trafiği için. Sayfalar zaten asıl
          adresi kanonik gösteriyor (`metadataBase`), bu başlık ikinci kopyanın
          arama sonuçlarına hiç düşmemesini garantiliyor. Yönlendirme YOK:
          API isteklerini yönlendirmek yedeğin var olma sebebini bozardı.
        */
        source: "/:path*",
        has: [{ type: "host", value: FALLBACK_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
        /*
          Aynı gerekçe e-posta bağlantılarının açtığı iki sayfada: parola
          sıfırlama adresi `?token=` (kullanılmamış jetonla parola
          değiştirilebilir), doğrulama sayfası `?email=` taşıyor. Varsayılan
          politikada sayfanın kendi kökenine yaptığı her istek (JS, font,
          /api/auth) tam adresi Referer olarak taşıyor ve erişim günlüğüne
          yazıyordu (güvenlik denetimi 2026-10-03, D23).
        */
        source: "/:page(reset-password|verify-email)",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        /*
          NOMİ 3B AVATAR KATALOĞU sürümlü bir kök: `/avatar/v<n>` bir kez
          yayınlanınca değişmiyor (yeni katalog yeni kök: v1 → v2). Katmanlar ve
          ikonlar bir yıl `immutable`; düzenleyici ve profil sahnesi her açılışta
          yeniden doğrulama isteği atmasın. `katalog.json` hariç tutulmuyor:
          kökle birlikte sürümleniyor.
        */
        source: "/avatar/:version(v\\d+)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
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
      /* Taşınan uygulama sayfaları (Search Console 404'leri, 2026-10-07): ders → konuşma
         (2026-09-25), günlük tur, rozetler, eski sohbet ve kopya kâğıdı. */
      { source: "/lessons", destination: "/immersion", permanent: true },
      { source: "/lessons/boss/:level/:module", destination: "/boss/:level/:module", permanent: true },
      { source: "/lessons/:id/exam", destination: "/conversations/:id/scored", permanent: true },
      { source: "/lessons/:id", destination: "/conversations/:id", permanent: true },
      { source: "/learn/daily", destination: "/learn", permanent: true },
      { source: "/profile/rozetler", destination: "/profile/achievements", permanent: true },
      { source: "/sohbet", destination: "/immersion", permanent: true },
      { source: "/cheatsheet/:path*", destination: "/learn", permanent: true },
      { source: "/indir", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

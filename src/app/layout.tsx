import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * Paylaşılan bağlantının nasıl göründüğü.
 *
 * Mutlak adres gerekiyor: `og:image` göreli bir yol kabul etmiyor, sosyal ağ
 * bunu kendi alan adında arar ve önizleme boş çıkardı. NEXT_PUBLIC_SITE_URL
 * verilmemişse uygulamanın kök adresi (BETTER_AUTH_URL) kullanılıyor; o da
 * yoksa üretim adresi.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL || "https://www.exfe.me";

const description =
  "A1'den C1'e 7.392 kelime, on oyun ve kendi kendini ayarlayan tekrar sistemiyle Almanca kelime uygulaması. Hochdeutsch ve Zürih Almancası, Türkçe anlatımıyla.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wortspiel — Almanca Kelime",
  description,
  applicationName: "Wortspiel",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Wortspiel",
    title: "Wortspiel — Almanca kelimeleri oynayarak öğren",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Wortspiel — Almanca kelimeleri oynayarak öğren",
    description,
  },
  appleWebApp: { capable: true, title: "Wortspiel", statusBarStyle: "black-translucent" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#14100e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

const themeScript = `
try {
  var stored = localStorage.getItem('wortspiel-theme');
  var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/*
          iOS'un ESKİ adı — Next yalnızca standart `mobile-web-app-capable`
          etiketini üretiyor ve Safari onu bu iş için tanımıyor.

          Sonucu ölçüldü: bu etiket olmadan `apple-mobile-web-app-status-bar-style:
          black-translucent` yok sayılıyor ve ana ekrandan açılan uygulama
          kenardan kenara çizmiyor. Sistem web görünümünü güvenli alanın İÇİNE
          yerleştiriyor, ama `env(safe-area-inset-bottom)` yine de fiziksel payı
          (34pt) bildirmeye devam ediyor. İkisi toplanınca alt gezinmenin
          altında ~70 piksellik bir bant kalıyordu: 34'ü sistemin ayırdığı,
          34'ü bizim eklediğimiz.

          Etiket geldiğinde sayfa gerçekten ekranın dibine uzanıyor, o bant
          gezinme çubuğunun KENDİ zeminine dönüşüyor ve boşluk kapanıyor.
          Üstteki durum çubuğu payı zaten `.safe-top` ile karşılanıyor.
        */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}

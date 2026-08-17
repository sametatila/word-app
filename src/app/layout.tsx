import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * Paylaşılan bağlantının nasıl göründüğü.
 *
 * Mutlak adres gerekiyor: `og:image` göreli bir yol kabul etmiyor, sosyal ağ
 * bunu kendi alan adında arar ve önizleme boş çıkardı. Vercel önizleme
 * dağıtımlarında adres her seferinde değiştiği için ortamdan okunuyor;
 * yoksa üretim adresi kullanılıyor.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://exfe.me");

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
    { media: "(prefers-color-scheme: light)", color: "#f7f8fd" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1020" },
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}

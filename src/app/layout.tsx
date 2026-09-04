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
  process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL || "https://www.lernomi.app";

// Tek dile kilitlenmeyen tanım: kurs listesi büyüdükçe (Almanca-İngilizce
// paritesi) burayı yeniden yazmak gerekmesin.
const description =
  "A1–C1 kelimelerini on oyunla çalış; tekrarı uygulama planlar. Almanca (Hochdeutsch ve Zürih Almancası) ve İngilizce, Türkçe anlatımıyla.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lernomi — Almanca ve İngilizce Kelime",
  description,
  applicationName: "Lernomi",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Lernomi",
    title: "Lernomi — kelimeleri oynayarak öğren",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lernomi — kelimeleri oynayarak öğren",
    description,
  },
  appleWebApp: { capable: true, title: "Lernomi", statusBarStyle: "black-translucent" },
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

/**
 * Uygulama adı iki kez değişti: Wortspiel -> Nomi (2026-08-31) -> Lernomi
 * (2026-09-04). Cihazdaki tercih ve önbellek anahtarları eski öneklerle
 * duruyor; tema okunmadan ÖNCE bir kez yeni öneke taşınır ki kimse temasını,
 * kursunu, sesini ya da ilerlemesini kaybetmesin. Her iki eski önek de
 * doğrudan Lernomi'ye gelir; "lernomi" öneki "nomi" ile başlamadığı için
 * script kendi çıktısını yeniden işlemez.
 *
 * Anahtarlar her geçişte önce fotoğraflanır, sonra taşınır: döngü sırasında
 * setItem yeni anahtar eklediği için indeks üzerinden gezmek atlama yapabilirdi.
 *
 * Önekler YENİDEN ESKİYE işlenir. İki dönemin anahtarı birden duruyorsa
 * (yarım kalmış göç) çakışmada Nomi dönemindeki GÜNCEL değer kazanmalı;
 * ters sırada Wortspiel dönemindeki bayat tercih yenisini eziyordu.
 */
const themeScript = `
try {
  var pres = ['nomi', 'wortspiel'];
  for (var pi = 0; pi < pres.length; pi++) {
    var p = pres[pi];
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      if (!k || k.indexOf(p) !== 0) continue;
      var nk = 'lernomi' + k.slice(p.length);
      if (localStorage.getItem(nk) === null) localStorage.setItem(nk, localStorage.getItem(k));
      localStorage.removeItem(k);
    }
  }
} catch (e) {}
try {
  var stored = localStorage.getItem('lernomi-theme');
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

import type { Metadata, Viewport } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wortspiel — Almanca Kelime",
  description:
    "Goethe A1–B1 kelime listeleriyle, oyunlaştırılmış ve kendi kendine ayarlanan tekrar sistemine sahip Almanca kelime uygulaması.",
  applicationName: "Wortspiel",
  appleWebApp: { capable: true, title: "Wortspiel", statusBarStyle: "default" },
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
  const content = (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );

  if (!stackServerApp) return content;

  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>{content}</StackTheme>
    </StackProvider>
  );
}

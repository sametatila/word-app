import type { MetadataRoute } from "next";

/** Ana ekrana eklendiğinde uygulama gibi açılması için PWA tanımı. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wortspiel — Almanca Kelime",
    short_name: "Wortspiel",
    description:
      "Goethe A1–C1 kelimeleriyle, tekrarı kendi planlayan oyunlaştırılmış Almanca kelime uygulaması.",
    start_url: "/learn",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0e1020",
    theme_color: "#6366f1",
    lang: "tr",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

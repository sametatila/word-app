import type { MetadataRoute } from "next";

/** Ana ekrana eklendiğinde uygulama gibi açılması için PWA tanımı. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nomi — Almanca Kelime",
    short_name: "Nomi",
    description:
      "Goethe A1–C1 kelimeleriyle, tekrarı kendi planlayan oyunlaştırılmış Almanca kelime uygulaması.",
    start_url: "/learn",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#14100e",
    theme_color: "#c87318",
    lang: "tr",
    categories: ["education"],
    // Ana ekran simgesine uzun basınca çıkan hızlı erişimler.
    shortcuts: [
      { name: "Öğren", url: "/learn" },
      { name: "Patika", url: "/immersion" },
    ],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

import type { MetadataRoute } from "next";
import { getLang } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dict";

/**
 * Ana ekrana eklendiğinde uygulama gibi açılması için PWA tanımı.
 *
 * Ad, açıklama ve kısayollar arayüz dilinde (bkz. `layout.tsx`
 * `generateMetadata`): sabit Türkçeydi ve İngilizce arayüzle kurulan
 * uygulamanın kısayolları "Öğren / Patika" diye çıkıyordu.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const lang = await getLang();
  const t = (key: string) => translate(lang, key);
  return {
    name: t("meta.title"),
    short_name: "Lernomi",
    description: t("meta.description"),
    start_url: "/learn",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    /*
     * AÇILIŞ EKRANI ANDROİD'İNKİYLE AYNI.
     *
     * `background_color` Chrome'un PWA açılış ekranının zemini; koyu mürekkep
     * yazılıydı, Android'in açılış ekranı ise MARKA TURUNCUSU üstünde
     * launcher ikonu (`values/styles.xml` `Theme.Lernomi.Splash` →
     * `ic_launcher_background` #FA7C13). Aynı ürün iki ayrı açılışla
     * başlıyordu; değer artık o XML'deki renk.
     *
     * `theme_color` kurulu uygulamanın durum çubuğu rengi ve SÜRESİ GEÇMİŞ
     * kehribar (#c87318) yazılıydı — marka mobilden gelen turuncuya geçtiğinde
     * (bkz. globals.css `--color-brand-*`) burası güncellenmemişti. Sayfanın
     * zemini yazılıyor; temaya göre okunan değeri `layout.tsx` `themeColor`
     * veriyor, bu yalnız onun yetişemediği yerdeki yedek.
     */
    background_color: "#fa7c13",
    theme_color: "#fbf7f2",
    lang,
    categories: ["education"],
    // Ana ekran simgesine uzun basınca çıkan hızlı erişimler.
    shortcuts: [
      { name: t("nav.learn"), url: "/learn" },
      { name: t("nav.path"), url: "/immersion" },
    ],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

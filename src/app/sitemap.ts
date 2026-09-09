import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LEGAL_LOCALES, LEGAL_DEFAULT_LOCALE, LEGAL_EFFECTIVE_DATE, legalPath } from "@/lib/legal";

/**
 * İndekslenecek sayfalar — YALNIZ oturum istemeyenler.
 *
 * Uygulamanın kendisi (`(app)` grubu) oturum arkasında, dolayısıyla burada yok:
 * bir arama sonucu kullanıcıyı giriş ekranına düşürürse o sonuç kötüdür.
 * Geriye vitrin ve hukuki metinler kalıyor; ikincisi mağazaların da istediği
 * herkese açık adresler.
 *
 * DİLLER `alternates.languages` ile veriliyor, ayrı girdi olarak değil: aynı
 * belgenin üç çevirisi ayrı sayfa değil, aynı sayfanın dilleridir — ayrı girdi
 * yazmak arama motoruna üç rakip sayfa gösterir ve üçü birbirinin sırasını
 * yer. Kanonik yol Türkçe (`/privacy`), çeviriler alt yolda (`/privacy/en`);
 * kural `legalPath()` ile tek yerden geliyor.
 *
 * `lastModified` hukuki metinlerde YÜRÜRLÜK TARİHİ: metin değiştiğinde o tarih
 * de değişiyor, yani gerçekten anlamlı bir sinyal. Vitrin sayfalarında derleme
 * anı kullanılmıyor — her dağıtımda "değişti" demek sinyali değersizleştirir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => `${SITE_URL}${path}`;
  const legal = (doc: "privacy" | "terms" | "support") => ({
    url: abs(legalPath(doc, LEGAL_DEFAULT_LOCALE)),
    lastModified: new Date(LEGAL_EFFECTIVE_DATE),
    changeFrequency: "yearly" as const,
    priority: 0.5,
    alternates: {
      languages: Object.fromEntries(
        LEGAL_LOCALES.map((l) => [l, abs(legalPath(doc, l))]),
      ),
    },
  });

  return [
    {
      url: abs("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // Kelime listesi vitrinin içerik tarafı: herkese açık ve aramadan gelen
      // kullanıcının ilk karşılaştığı sayfa olabilir.
      url: abs("/ilk-kelimeler"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    legal("privacy"),
    legal("terms"),
    legal("support"),
  ];
}

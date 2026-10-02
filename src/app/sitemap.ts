import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LEGAL_LOCALES, LEGAL_DEFAULT_LOCALE, LEGAL_EFFECTIVE_DATE, legalPath } from "@/lib/legal";
import { offeredNativeLangs } from "@/lib/courses";
import { landingLanguages, landingPath } from "@/lib/landing-path";

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
 * YALNIZ İNDEKSLENECEKLER (2026-10-02): `noindex` taşıyan sayfa burada
 * olmamalı, ikisi çelişen sinyal. Gizlilik, Kullanım Şartları ve künye
 * aramaya kapalı (marka aramasında ana sayfanın önüne geçiyorlardı, bkz.
 * `legal-shell` NOINDEX_DOCS); `/first-words` ve `/level-test` istemcide
 * çizilen huni adımları, sunucu çıktısı boş. Tanıtım sayfası dil başına
 * (`/`, `/en`, `/de`; bkz. `lib/landing-path`).
 *
 * `lastModified` hukuki metinlerde YÜRÜRLÜK TARİHİ: metin değiştiğinde o tarih
 * de değişiyor, yani gerçekten anlamlı bir sinyal. Vitrin sayfalarında derleme
 * anı kullanılmıyor — her dağıtımda "değişti" demek sinyali değersizleştirir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => `${SITE_URL}${path}`;
  const legal = (doc: "support") => ({
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

  const languages = landingLanguages(abs);
  return [
    ...offeredNativeLangs().map((l) => ({
      url: abs(landingPath(l)),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
    })),
    legal("support"),
  ];
}

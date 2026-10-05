# Arama motorları ve yapay zekâ asistanları (SEO)

Sitenin arama motorlarına ve dil modellerine nasıl göründüğünün tek kaydı. Kod nerede, sunucuda ne
var, konsollarda ne yapıldı, ne açık.

## Neden (2026-10-02)

Google marka aramasında Kullanım Şartları, Gizlilik ve Impressum'u ana sayfanın önüne koyuyordu.
Sebepler: ana sayfada `canonical`/`hreflang` yoktu (hukuki sayfalarda vardı); ana sayfanın dili
çereze ya da Accept-Language'a göre değişiyordu, Googlebot yalnız Türkçeyi görüyordu; çıplak
`lernomi.app` aynı sayfayı 200 ile ikinci kez veriyordu. Alan adı yeni (2026-09-04), dış bağlantı yok.

## Kodda ne var

| Ne | Nerede |
|---|---|
| Dile sabit tanıtım adresleri: `/` Türkçe (+ x-default, ziyaretçiye uyum sürüyor), `/en`, `/de` | `src/lib/landing-path.ts`; dil `src/proxy.ts`te `x-lernomi-lang` başlığına yazılıyor, `getLang` çerezden önce okuyor |
| Kanonik + hreflang, paylaşım künyesi, `WebSite` + `Organization` JSON-LD | `src/app/page.tsx` (`generateMetadata`, `StructuredData`); `/en` ve `/de` aynı sayfayı dışa aktarıyor, paylaşım görselleri `src/app/{en,de}/opengraph-image.tsx` |
| Dil düğmeleri gerçek bağlantı (`hrefLang`) | `src/components/landing/landing-lang.tsx` |
| Başlık şablonu `… · Lernomi` | `src/app/layout.tsx` |
| `noindex, follow`: Gizlilik, Şartlar, Impressum, `/first-words`, `/level-test` (+ `/licenses`) | `src/components/legal-shell.tsx` `NOINDEX_DOCS`, `src/app/impressum/impressum-page.tsx`, `src/lib/page-meta.ts` `titleMeta(…, { noindex })` |
| Sitemap: yalnız indekslenecekler (`/`, `/en`, `/de` dil eşleriyle, `/support`) | `src/app/sitemap.ts` |
| robots.txt (`/api`, giriş akışı, `/admin`… kapalı; yapay zekâ botları dahil herkese açık) | `src/app/robots.ts` |
| `/llms.txt`: dil modelleri için ürün özeti, vitrin metninden (`src/content/landing.ts`) üretiliyor | `src/app/llms.txt/route.ts` |
| Yedek adres `lernomi.rumpuskit.com` `noindex, nofollow` | `next.config.ts` |

**Arama metinleri (2026-10-05, vitrin provası):** meta açıklama (`src/i18n/web/<dil>.ts` `meta.description`)
"sıfırdan C1'e / from zero to C1 / von null bis C1" + "Ücretsiz başla, reklam yok" (tr 167, en 151, de 162 karakter);
mağazalarla aynı mesaj (`docs/store/README.md` "Vitrin provası 2. tur"). Hedef sorgu: "sıfırdan almanca" türü
başlangıç aramaları; "A1–C1" ad ve başlıklarda duruyor. `/llms.txt` girişi "from complete beginner (A1) to advanced (C1)".

Kural: `noindex` sayfa sitemap'e girmez; yeni herkese açık sayfa ya sitemap'e ya `noindex`e yazılır.
İstemcide çizilen (sunucu çıktısı boş) sayfa `noindex`.

## Sunucuda (git dışı)

Çıplak `lernomi.app` → `https://www.lernomi.app` 301; yalnız GET/HEAD, `/api/`, `/gh-webhook`,
`/.well-known/` hariç (webhook ve POST kırılmasın): `/etc/nginx/conf.d/lernomi-maps.conf`
`$lernomi_apex_redirect` + site bloğunun başındaki `if`. Yedekler `/root/lernomi-*.bak-20261002-*`.

## Konsollar

| Ne | Durum | Ayrıntı |
|---|---|---|
| Google Search Console | ✅ 2026-10-02 (Samet) | "Alan adı" mülkü `lernomi.app` (www + çıplak + http/https hepsi kapsamda), Cloudflare DNS TXT ile doğrulandı (`google-site-verification` kaydı DNS'te; silinirse mülk düşer). Sitemap gönderildi; `/`, `/en`, `/de` için URL denetimi + "Dizine eklenmesini iste" yapıldı |
| Bing Webmaster Tools | ✅ 2026-10-02 (Samet) | Mülk `https://www.lernomi.app` ("Add site" www için "Site already added" diyor). Doğrulama Cloudflare DNS'te `verify.bing.com`a giden CNAME kaydıyla (DNS only; silinirse mülk düşer). Sitemap gönderildi; `/`, `/en`, `/de` URL Submission ile gönderildi. Bing; DuckDuckGo, Ecosia ve ChatGPT aramasını da besliyor |
| Mağaza kayıtlarında web sitesi alanı | ✅ | 2026-10-02 API salt okuması: ASC 1.0.0 `marketingUrl` üç dilde `https://www.lernomi.app`, Play `contactWebsite` `https://www.lernomi.app`. Web'de satın alma yolu yok (Premium yalnız mağaza içi), tanıtım sayfasında fiyat yok: 3.1.1/3.1.3 açısından vitrin bağlantısı sorunsuz |
| Dış bağlantılar | ⏳ Samet | Sosyal profiller, Product Hunt, AlternativeTo, dil öğrenme toplulukları |
| Cloudflare yapay zekâ bot engeli | ✅ kapalı | 2026-10-02 nginx günlüğü: GPTBot, ClaudeBot, OAI-SearchBot, Amazonbot, meta-externalagent 200 alıyor. "Block AI bots" açılırsa asistanlar siteyi okuyamaz |

## Kontrol

- Yaklaşık 2026-10-23: "lernomi" aramasında ana sayfa üstte mi; Search Console › Sayfalar'da `/en`
  ve `/de` dizinde mi, hukuki sayfalar "noindex ile hariç tutuldu" mu; Bing › URL Inspection'da
  üç adres "Indexed" mi.
- Canlı künye: `curl -s https://www.lernomi.app/en | grep -oE '<link rel="(canonical|alternate)"[^>]*>'`

## Performans (Lighthouse, 2026-10-02)

Son ölçüm (canlı, mobil benzetim): `/` 98–100, `/en` 90–91, `/de` 91–97, `/support` 99; masaüstü `/` 97.
Erişilebilirlik 96 (tek bulgu aşağıda), en iyi uygulamalar 100, SEO 100. Sayfa 1,2 MB → 532 KB, CLS 0.
Mobil puanı belirleyen: ilk çizimden ÖNCE istenen her bayt (Lighthouse bunları LCP tahminine katıyor;
çizimden sonra istenenler girmiyor). Yeni bir şey eklerken buna bak.

| Ne | Kazanç | Commit |
|---|---|---|
| Dağıtım kimliği çalışırken de aynı: statik dosyalar çift inmiyordu (`?dpl=` ile + eksiz); sürüm kayması koruması ilk kez çalışıyor | ~450 KB | fa4090fb8 |
| Next.js 16.3.5 → 16.3.8 (güvenlik: next/og RCE, görsel SSRF, önbellek zehirlenmesi) | — | e8c921544 |
| Tarayıcıya yalnız arayüz dilinin sözlüğü, çizimden sonra (`lib/i18n/dicts-all`, `turbopack.resolveAlias`) | 161 → 51 KB, LCP dışı | 24c9f2376 |
| Tanıtımda framer-motion yok (`MotionProvider` tanıtımda çizmiyor, `ThemeSetting` ayrı dosya, `Confetti` sonradan) | ~60 KB | bc871f405 |
| Tanıtım yazı tipi sitede, kırpılmış (`src/app/fonts/`, üretim komutu `page.tsx`'te) | 182 → 91 KB | ba010f6d7 |
| Googlebot + yapay zekâ botları künyeyi hep `<head>`'de alır (`htmlLimitedBots`) | SEO | acfd33769 |

Kurallar: istemci bileşeni `@/lib/i18n/dict`ten alabilir (sözlük gelmez), ama `dicts/*` ya da
`dicts-all`ı doğrudan içe aktarmaz. Tanıtım sayfasına framer-motion'a bağlı bileşen girmez. Next
yükseltilince `htmlLimitedBots` listesini Next'in varsayılanıyla karşılaştır.

Açık: CTA düğmesi beyaz yazı / #fb8f2a kontrastı 2,31 (WCAG 3; erişilebilirliği 96'da tutan tek
bulgu, marka rengi kararı Samet'te). Tanıtım görselleri 4 saat önbellekte (kazanç küçük, bırakıldı).

## Sıradaki fırsat (karar Samet'te)

Asıl trafik içerikten gelir: herkese açık rehber ve kelime listesi sayfaları ("Almanca A1 kelime
listesi", "Goethe B1 nasıl"), kelime veritabanından seviye başına üretilebilir. Henüz planlanmadı.

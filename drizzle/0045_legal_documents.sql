-- Hukuki belgelerin gövdeleri veritabanına taşındı.
--
-- Bugüne kadar metin JSX olarak koddaydı (src/app/{privacy,terms}/page.tsx ve
-- src/content/legal/*.tsx, ~1.800 satır) ve her düzeltme bir commit + bir deploy
-- demekti. Kimlik alanları, sürüm, alıcılar tablosu ve adil kullanım sayıları da
-- öyleydi — oysa bunların hepsi ürün değil, BİLGİ: adres değişir, sağlayıcı
-- değişir, sürüm artar. Panelden düzenlenebilmeleri istendi.
--
-- Gövde MARKDOWN olarak tutuluyor, HTML olarak değil. Sebep güvenlik: HTML
-- saklansaydı sayfaya basmak için ya `dangerouslySetInnerHTML` gerekirdi ya da
-- bir arındırıcı. Markdown, tanıdığımız birkaç düğüme (başlık, paragraf, liste,
-- tablo, bağlantı, kalın) çevrilip REACT ÖĞESİ olarak basılıyor; ham HTML
-- hiçbir zaman oluşmuyor, dolayısıyla enjeksiyon yüzeyi de yok.
--
-- Dinamik parçalar belirteçle: {{supportEmail}}, {{processorsTable}},
-- {{entityBlock:controller:contact}}, {{ifIos}}…{{/ifIos}}, {{link:privacy}}.
-- Belirteç sözlüğü KAPALI ve kodda; tanınmayan belirteç kaydedilirken reddedilir.
--
-- KOD VARSAYILANI KALIYOR. Bu tablo boşsa ya da okunamazsa sayfalar koddaki
-- varsayılan metinle basılıyor (premium yapılandırmasındaki desenin aynısı).
-- Yani veritabanı kesintisi gizlilik politikasını yayından kaldırmıyor — bir
-- mağaza incelemesinin tam ortasında olabilecek en kötü şeylerden biri buydu.
CREATE TABLE IF NOT EXISTS "legal_documents" (
  -- 'privacy' | 'terms' | 'support'
  "doc" text NOT NULL,
  -- 'tr' | 'en' | 'de'
  "locale" text NOT NULL,
  "title" text NOT NULL,
  -- Sayfa <meta description>'ı; boş bırakılabilir.
  "description" text NOT NULL DEFAULT '',
  -- "Kısaca" kutusundaki maddeler (string[]). Gövdenin parçası değil, çünkü
  -- makalenin üstünde ayrı bir kartta basılıyor.
  "summary" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "body" text NOT NULL,
  "updated_by" text,
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "legal_documents_pk" PRIMARY KEY ("doc", "locale")
);

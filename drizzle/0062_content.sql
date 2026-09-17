-- İÇERİK TESLİM HATTI: değişmez gövdeler + yayın sürümleri + kapatma listesi.
--
-- İçerik bugün iki uygulamanın ikilisine gömülü (mobilde 27,7 MB statik
-- import). Bu dört tablo onu sunucudan servis edilebilir hâle getiriyor:
-- gövde kendi hash'iyle adresleniyor (sonsuza kadar önbelleklenebilir,
-- nginx Node'a uğratmadan servis ediyor), değişen tek şey küçük gösterge.
--
-- İÇERİK BURADA YAZILMIYOR: doğruluk kaynağı `data/**` ve git. `content:publish`
-- yayınlıyor, panel yalnız okuyor + `content_flags` ile madde kapatıyor +
-- `content_releases.status` ile sürüm çeviriyor.
--
-- Hepsi ADDİTİF: canlı kod henüz bakmıyor, önce uygulanması güvenli.
-- Tanımlar `schema.ts`te de var — deploy `drizzle-kit push --force` koştuğu
-- için şemada olmayan tablo bir sonraki deploy'da düşer (bkz. 0061 uyarısı).

-- Değişmez gövdeler. Aynı gövde on sürümde geçse de tek satır: kimlik burada
-- değil, üyelik content_release_items'te.
-- İki sıkıştırma birden saklanıyor ve istek anında hiç sıkıştırma yapılmıyor:
-- br %23 daha küçük ama her istemci çözemiyor, gz evrensel emniyet.
CREATE TABLE IF NOT EXISTS "content_items" (
  -- Ham gövdenin sha-256'sının ilk 32 hex hanesi. Adres bu.
  "hash" text PRIMARY KEY NOT NULL,
  -- Sıkıştırılmamış uzunluk: istemci indirme bütçesini buna göre planlıyor.
  "bytes" integer NOT NULL,
  -- Kapılı gövde: herkese açık uçlardan hiç servis edilmiyor. Deneme sınavı
  -- kâğıtları da bu hattan yayınlanıyor (tek üretim yolu) ama manifestte
  -- görünmüyor ve /api/content/i/ onları reddediyor. Bayrak paketin değil
  -- gövdenin üstünde: gövde ucu eline yalnız bir hash alıyor.
  "gated" boolean DEFAULT false NOT NULL,
  "br" bytea NOT NULL,
  "gz" bytea NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

-- Yayın sürümü — panelin birimi madde metni değil, bu. draft: yayınlanmış ama
-- canlıya alınmamış (panelden önizlenebilir). live: göstergeye yazılan tek
-- sürüm. Geri alma bir içerik işlemi değil, göstergeyi çevirmek.
CREATE TABLE IF NOT EXISTS "content_releases" (
  "version" serial PRIMARY KEY NOT NULL,
  -- draft | live | retired
  "status" text DEFAULT 'draft' NOT NULL,
  -- Yayını üreten commit: sürümden içeriğin kaynağına dönülebilsin.
  "commit" text,
  "note" text,
  "published_by" text,
  -- Dolu ve gelecekteyse: saati gelince canlıya alınacak taslak.
  "go_live_at" timestamp with time zone,
  "live_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_releases_status_idx" ON "content_releases" USING btree ("status","version");--> statement-breakpoint

-- Sürümün içindekiler: paket × madde → gövde hash'i. Manifest deltası bu
-- tablonun iki sürümü arasındaki fark.
-- item = '*' ayrılmış: paketin TAMAMININ tek arşivi (sıfırdan dolan istemci
-- tek istekte alıyor). Arşiv de hash adresli bir gövde, ikinci uç gerekmiyor.
CREATE TABLE IF NOT EXISTS "content_release_items" (
  "release" integer NOT NULL,
  -- "lessons/de-a1" · "papers/de" · "native/en" · "skills/de-b1"
  "pack" text NOT NULL,
  -- Paket içindeki kimlik ("de-a1-b03"), ya da "*" paket arşivi.
  "item" text NOT NULL,
  "hash" text NOT NULL,
  CONSTRAINT "content_release_items_pk" PRIMARY KEY ("release","pack","item")
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_release_items_pack_idx" ON "content_release_items" USING btree ("release","pack");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_release_items_hash_idx" ON "content_release_items" USING btree ("hash");--> statement-breakpoint

-- Kapatılan maddeler: panelin tek yazma yetkisi ve SÜRÜMDEN BAĞIMSIZ.
-- Göstergeye düştüğü için cihazda gövdesi zaten olan istemci de gizliyor.
-- Sürümden bağımsızlık bilinçli: geri alınan bir sürüm kapatmayı sessizce
-- açmasın.
CREATE TABLE IF NOT EXISTS "content_flags" (
  "pack" text NOT NULL,
  "item" text NOT NULL,
  -- broken | reported | legal | other
  "reason" text,
  "disabled_by" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "content_flags_pk" PRIMARY KEY ("pack","item")
);

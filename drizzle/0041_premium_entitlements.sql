-- Premium yetki defteri, promo kodları, davet zinciri, kota sayaçları ve
-- panelden düzenlenen ayarlar.
--
-- NEDEN: premium bugüne kadar tek bir sütundu (`profiles.premium_until`) ve o
-- sütuna yalnız mağaza webhook'u yazıyordu. Üç şey bu kurguya sığmıyor:
--
--   1. Mağazadan GELMEYEN yetki — promo kodu, davet ödülü, elle verilen süre.
--   2. BİRİKEN yetki — davet ödülleri üst üste eklenmeli; oysa sağlayıcı her
--      yenilemede MUTLAK bir bitiş tarihi bildiriyor ve tek sütunlu kurguda o
--      tarih hediyelerin üzerine yazıp hepsini siliyordu.
--   3. DENETLENEBİLİRLİK — "bu kullanıcı neden premium" sorusunun cevabı yoktu.
--
-- Çözüm: yetki iki BAĞIMSIZ bileşene ayrıldı (mağaza penceresi + bonus bakiyesi)
-- ve her hareket deftere yazılıyor. `profiles.premium_until` KALIYOR ama artık
-- türev bir önbellek; okuyan kod değişmedi.
--
-- GERİ ALINABİLİR: hiçbir sütun düşürülmüyor, hiçbir veri dönüştürülmüyor.
-- Tablolar boş başlıyor ve mevcut premium kullanıcılar `profiles.premium_until`
-- üzerinden çalışmaya devam ediyor (aşağıdaki taşıma bloğu onları deftere de
-- işliyor, ama yetkileri o blok çalışmasa da sürüyor).

-- Kullanıcı başına yetki durumu.
CREATE TABLE IF NOT EXISTS "entitlements" (
  "user_id"        text PRIMARY KEY,
  -- Mağaza penceresi: sağlayıcı bildirir, her olayda ÜZERİNE YAZILIR.
  "store_until"    timestamp with time zone,
  "store_provider" text,
  "store_platform" text,
  "store_product"  text,
  "store_state"    text,
  "store_ref"      text,
  -- İlk GERÇEK ödemenin anı. Davet ödülünün tetiği bu: deneme başlangıcı ödül
  -- üretmiyor, yoksa sahte hesapla hafta üretmek serbest kalırdı.
  "store_paid_at"  timestamp with time zone,
  -- Harcanmamış bonus (dakika). Promo + davet + elle. Mağaza kapsamı varken
  -- BEKLER, yanmaz.
  "bonus_minutes"  integer NOT NULL DEFAULT 0,
  -- Şu an çalışan bonus penceresi.
  "bonus_until"    timestamp with time zone,
  "updated_at"     timestamp with time zone NOT NULL DEFAULT now()
);

-- Yetki hareketleri — EKLEME YAPILIR, güncellenmez.
CREATE TABLE IF NOT EXISTS "premium_grants" (
  "id"         serial PRIMARY KEY,
  "user_id"    text NOT NULL,
  -- store | promo | referral | manual
  "source"     text NOT NULL,
  "minutes"    integer,
  "until"      timestamp with time zone,
  -- Promo kodu, davet edilen kullanıcı ya da sağlayıcı olay kimliği.
  "ref"        text,
  "actor"      text,
  "note"       text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "premium_grants_user_idx" ON "premium_grants" ("user_id", "created_at");
-- Tekrar teslimat elemesi: aynı sağlayıcı olayı iki kez işlenmesin. Kısmi
-- indeks, çünkü `ref` yalnız `store` kaynağında olay kimliği taşıyor; promo ve
-- davet satırlarında aynı `ref` (kod / davet edilen) birden çok kez geçebilir.
CREATE INDEX IF NOT EXISTS "premium_grants_store_ref_idx"
  ON "premium_grants" ("ref") WHERE "source" = 'store';

-- Promo kodları.
CREATE TABLE IF NOT EXISTS "promo_codes" (
  "id"          serial PRIMARY KEY,
  "code"        text NOT NULL,
  "days"        integer NOT NULL,
  "max_uses"    integer NOT NULL DEFAULT 1,
  "uses"        integer NOT NULL DEFAULT 0,
  "expires_at"  timestamp with time zone,
  "campaign"    text,
  "note"        text,
  "created_by"  text,
  -- Kod SİLİNMEZ, kapatılır: kullananların geçmişi ayakta kalsın.
  "disabled_at" timestamp with time zone,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "promo_codes_code_idx" ON "promo_codes" ("code");
CREATE INDEX IF NOT EXISTS "promo_codes_campaign_idx" ON "promo_codes" ("campaign");

-- Kod kullanımları. (kod, kullanıcı) benzersiz: çok kullanımlık kampanya
-- kodunu aynı kişi tekrar tekrar bozduramaz.
CREATE TABLE IF NOT EXISTS "promo_redemptions" (
  "id"         serial PRIMARY KEY,
  "code_id"    integer NOT NULL,
  "user_id"    text NOT NULL,
  "minutes"    integer NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "promo_redemptions_once_idx" ON "promo_redemptions" ("code_id", "user_id");
CREATE INDEX IF NOT EXISTS "promo_redemptions_user_idx" ON "promo_redemptions" ("user_id");

-- Davet zinciri. Bir satır = bir davet edilen kullanıcı.
CREATE TABLE IF NOT EXISTS "referrals" (
  "id"              serial PRIMARY KEY,
  "inviter_user_id" text NOT NULL,
  "invitee_user_id" text NOT NULL,
  "code"            text NOT NULL,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  -- null = davet edilen henüz ödeme yapmadı, ödül düşmedi.
  "rewarded_at"     timestamp with time zone,
  "reward_minutes"  integer
);
-- Bir kişi yalnız BİR kez davet edilmiş sayılır; yoksa aynı hesap birden çok
-- davetçiye ödül üretirdi.
CREATE UNIQUE INDEX IF NOT EXISTS "referrals_invitee_idx" ON "referrals" ("invitee_user_id");
CREATE INDEX IF NOT EXISTS "referrals_inviter_idx" ON "referrals" ("inviter_user_id", "created_at");

-- Kota sayaçları. `period`: "2026-09-08" günlük · "2026-W37" haftalık · "all" ömürlük.
CREATE TABLE IF NOT EXISTS "usage_counters" (
  "user_id"    text NOT NULL,
  "key"        text NOT NULL,
  "period"     text NOT NULL,
  "count"      integer NOT NULL DEFAULT 0,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY ("user_id", "key", "period")
);

-- Panelden düzenlenen çalışma zamanı ayarları (premium sınırları, fiyat vitrini).
-- Boş kalabilir: kod varsayılanı taban, bu tablo yalnız üstüne yazar.
CREATE TABLE IF NOT EXISTS "app_settings" (
  "key"        text PRIMARY KEY,
  "value"      jsonb NOT NULL,
  "updated_by" text,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);

-- Davet kodu kullanıcıya ait ve ömür boyu sabit: değişirse dağıtılmış her
-- bağlantı ölür. Null = henüz üretilmedi (ilk istendiğinde üretilir), bu yüzden
-- eski hesaplar için veri göçü GEREKMİYOR.
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "referral_code" text;
CREATE UNIQUE INDEX IF NOT EXISTS "profiles_referral_code_idx" ON "profiles" ("referral_code");

-- Mevcut premium kullanıcıları deftere taşı.
--
-- Yetkileri zaten çalışıyor (`profiles.premium_until` okunuyor), ama defterde
-- karşılıkları olmazsa ilk `resolveEntitlement` çağrısında önbellek boş bir
-- yetkiyle EŞİTLENİR ve premium'ları sessizce sıfırlanırdı. Bu blok onları
-- "elle verilmiş süre" olarak kaydediyor: kaynağı gerçekten bilmiyoruz, çünkü
-- eski kurguda kaynak yazılmıyordu.
INSERT INTO "entitlements" ("user_id", "bonus_until", "updated_at")
SELECT "user_id", "premium_until", now()
FROM "profiles"
WHERE "premium_until" IS NOT NULL AND "premium_until" > now()
ON CONFLICT ("user_id") DO NOTHING;

INSERT INTO "premium_grants" ("user_id", "source", "until", "actor", "note")
SELECT "user_id", 'manual', "premium_until", 'migration', 'eski premium_until sütunundan taşındı'
FROM "profiles"
WHERE "premium_until" IS NOT NULL AND "premium_until" > now();

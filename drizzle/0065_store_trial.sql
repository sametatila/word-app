-- GRUP KODU: "2 AY ÜCRETSİZ, SONRA ÜCRETLİ" KAMPANYASI + SANDBOX İŞARETİ.
--
-- 1. `promo_codes.kind`: 'bonus' (bugünkü kodlar, bakiyeye gün yazar) ya da
--    'store_trial' (mağazanın 2 aylık deneme teklifine kapı açar, gün vermez).
--    Varsayılan 'bonus': var olan her kod davranışını koruyor.
-- 2. `promo_codes.group_label`: kodun dağıtıldığı grup; karşılama sayfasında
--    görünüyor, o yüzden yöneticinin iç notundan (`note`) ayrı.
-- 3. `store_trial_claims`: kim hangi grup kodunu talep etti, deneme başladı mı,
--    ücretliye döndü mü (webhook doldurur).
-- 4. `store_trial_clicks`: iOS'ta grup kodu uygulamada girilmiyor (App Store
--    Guideline 3.1.1); webdeki karşılama sayfası Apple'ın teklif kodu
--    sayfasına yönlendiriyor ve bu tablo o yönlendirmeleri ANONİM sayıyor.
-- 5. `entitlements.store_environment`: sandbox olayları artık yetki yazıyor
--    (denetim IAP-1) ve gelir sayımları onları bu sütunla dışarıda bırakıyor.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile şemayı zaten kurmuş
-- olabilir; tekrar koşmak zararsız.
ALTER TABLE "promo_codes" ADD COLUMN IF NOT EXISTS "kind" text DEFAULT 'bonus' NOT NULL;
--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN IF NOT EXISTS "group_label" text;
--> statement-breakpoint
ALTER TABLE "entitlements" ADD COLUMN IF NOT EXISTS "store_environment" text;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_trial_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"code_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"platform" text NOT NULL,
	"plan" text NOT NULL,
	"claimed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"started_at" timestamp with time zone,
	"converted_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"expired_at" timestamp with time zone,
	"store_ref" text,
	"environment" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "store_trial_claims_once_idx" ON "store_trial_claims" USING btree ("code_id","user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_trial_claims_user_idx" ON "store_trial_claims" USING btree ("user_id");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_trial_clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"code_id" integer NOT NULL,
	"platform" text NOT NULL,
	"plan" text NOT NULL,
	"clicked_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_trial_clicks_code_idx" ON "store_trial_clicks" USING btree ("code_id");

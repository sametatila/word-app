-- HESAPTA DURAN İKİ HUKUKİ KAYIT (hukuk denetimi 2026-09-23).
--
-- 1. `profiles.analytics_opt_out` (LEG-9): "Kullanım verisi gönder" tercihi
--    artık hesapta. Eskiden yalnız cihazda (localStorage / AsyncStorage)
--    duruyordu; sunucunun kendi yazdığı ürün olayları ona hiç bakmıyordu ve
--    tercih başka cihazda geçerli değildi. `lib/events` `track` her yazmada
--    okuyor (işletimsel olaylar hariç, liste orada).
-- 2. `profiles.terms_version` + `terms_accepted_at` (LEG-11): Şartlar §12b
--    "kabul ettiğin sürümü ve tarihini isteyebilirsin" diyor, kayıt yoktu.
--    Yeni profil doğarken yazılıyor; var olan satırlar NULL kalıyor (hangi
--    sürümü kabul ettikleri bilinmiyor, uydurulmuyor) ve istemci onlara bir
--    kez "şartlar güncellendi" şeridi gösteriyor.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile şemayı zaten kurmuş
-- olabilir; tekrar koşmak zararsız.
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "analytics_opt_out" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "terms_version" text;
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "terms_accepted_at" timestamp with time zone;

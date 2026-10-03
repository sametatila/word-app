-- entitlements.store_event_at: yetkiye son yazılan mağaza olayının sağlayıcıdaki zamanı
-- (RevenueCat event_timestamp_ms). Webhook sırasız ve yeniden teslim edilebiliyor; bundan
-- eski olay yetki alanlarını yazmıyor (iadeden sonra geç gelen eski yenileme erişimi
-- geri açıyordu; güvenlik denetimi 2026-10-03, D7). Eski satırlarda boş: ilk olay yazar.
--
-- IF NOT EXISTS: deploy `drizzle-kit push` sütunu migration'dan önce kurabilir; tekrar koşmak zararsız.
ALTER TABLE "entitlements" ADD COLUMN IF NOT EXISTS "store_event_at" timestamp with time zone;

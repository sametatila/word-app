-- entitlements.trial_reminder_for: deneme bitiş hatırlatmasının gönderildiği deneme bitişi.
-- Paywall "bitmeden 2 gün önce hatırlatırız" diyor; günlük tur (lib/premium/trial-reminder) bir denemeye
-- bir kez bildirim + e-posta gönderiyor ve gönderdiği bitişi buraya yazıyor. Bitiş değişirse eşleşme bozulur
-- ve yeni deneme yeniden hatırlatılır.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile sütunu önce kurabilir; tekrar koşmak zararsız.
ALTER TABLE "entitlements" ADD COLUMN IF NOT EXISTS "trial_reminder_for" timestamp with time zone;

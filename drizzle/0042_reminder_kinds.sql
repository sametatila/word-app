-- Hatırlatma kategorileri: mobildeki üç anahtarın sunucu karşılığı.
--
-- Günlük hatırlatmanın kendisi ve saati zaten vardı (`reminders_enabled`,
-- `reminder_hour`) ama arayüzde görünmüyordu. Eksik olan iki kategori:
-- seri koruma (akşam, seri tehlikedeyken) ve haftalık sınav çağrısı.
--
-- İkisi de VARSAYILAN AÇIK: bugünkü davranışta bu bildirimler hiç
-- gönderilmiyordu, yani açık gelmeleri kimsenin sustuğu bir kanalı
-- açmıyor; kapatan kullanıcı ise kararını bu sütunlara yazıyor.
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "streak_alert" boolean NOT NULL DEFAULT true;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "weekly_reminder" boolean NOT NULL DEFAULT true;

-- Mobil cihaz jetonları — uygulamanın uzak bildirim adresi.
--
-- Bugüne kadar tek push kanalı Web Push'tu (VAPID, `push_subscriptions`) ve o
-- yalnız tarayıcıda çalışıyor. Native uygulamada uzak bildirim HİÇ yoktu:
-- arkadaşlık isteği, dürtme, ortak görev daveti ve "görev tamamlandı" satırı
-- gelen kutusuna yazılıyor ama kullanıcı uygulamayı kendiliğinden açana kadar
-- kimseye ulaşmıyordu. Sosyal katmanın geri çağırma kanalı eksikti.
--
-- Jeton CİHAZA ait, hesaba değil — aynı hesap iki telefonda iki satır. Jeton
-- benzersiz: aynı cihaz başka bir hesapla giriş yaparsa satır el değiştirir,
-- kopyalanmaz (bildirim önceki kullanıcıya gitmemeli).
CREATE TABLE IF NOT EXISTS "device_tokens" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	-- ios | android — FCM ikisini de taşıyor, ayrım yalnız ölçüm ve ayıklama için.
	"platform" text NOT NULL,
	-- Web Push'taki ile aynı mantık: kalıcı hata sayılır, ısrar ederse jeton düşer.
	"failures" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"seen_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "device_tokens_user_idx" ON "device_tokens" USING btree ("user_id");

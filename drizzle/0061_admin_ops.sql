-- YÖNETİMİN İKİNCİ KATI: işlem kaydı, hata grupları, özet tablo, mağaza defteri.
--
-- Eleştirel denetimin (2026-09-17) dört açığına karşılık:
--   * admin işlemleri parça parça kaydediliyordu, tek "kim ne yaptı" yoktu;
--   * istemci hataları yalnız ekran adı + sayı tutuyordu (mesaj, yığın yok);
--   * pano her açılışta `reviews`i baştan sona tarıyordu;
--   * gelir metriği için olay geçmişi yoktu (yalnız şu anki yetki durumu).
-- Hepsi ADDİTİF: canlı kod bakmıyor, önce uygulanması güvenli.

-- Admin işlem kaydı. Kişi silindiğinde de kalır: hedef kimliği bir
-- kullanıcıya işaret edebilir ama kayıt yönetimin hesap verebilirliği için.
CREATE TABLE IF NOT EXISTS "admin_audit" (
  "id" serial PRIMARY KEY NOT NULL,
  "admin_email" text NOT NULL,
  -- ör. premium.grant_days, users.delete, app.save_control
  "action" text NOT NULL,
  -- Hedef: kullanıcı kimliği, kod kimliği, belge adı...
  "target" text,
  "detail" jsonb,
  "ip" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_audit_created_idx" ON "admin_audit" USING btree ("created_at");--> statement-breakpoint

-- İstemci hata grupları: aynı hata (platform + ad + mesajın sayısız hâli +
-- yığının ilk kendi karesi) tek satır. Kişisel veri YOK: kullanıcı kimliği
-- tutulmuyor, mesaj sunucuda e-posta/sayı temizliğinden geçiyor.
CREATE TABLE IF NOT EXISTS "client_error_groups" (
  "fingerprint" text PRIMARY KEY NOT NULL,
  -- web | android | ios
  "platform" text NOT NULL,
  "name" text,
  "message" text NOT NULL,
  "stack" text,
  "screen" text,
  "app_version" text,
  "count" integer DEFAULT 1 NOT NULL,
  "first_seen" timestamp with time zone DEFAULT now() NOT NULL,
  "last_seen" timestamp with time zone DEFAULT now() NOT NULL,
  -- Panelden "çözüldü" işareti; aynı hata yeniden gelirse boşalır.
  "resolved_at" timestamp with time zone
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_error_groups_seen_idx" ON "client_error_groups" USING btree ("last_seen");--> statement-breakpoint

-- Cevap özeti: gün × oyun. Pano `reviews`i taramak yerine buradan okuyor;
-- uyarı motoru bugünü ve dünü her koşuda yeniden hesaplıyor.
CREATE TABLE IF NOT EXISTS "reviews_daily" (
  "day" date NOT NULL,
  "game" text NOT NULL,
  "n" integer NOT NULL,
  "correct" integer NOT NULL,
  CONSTRAINT "reviews_daily_pk" PRIMARY KEY ("day", "game")
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reviews_created_idx" ON "reviews" USING btree ("created_at");--> statement-breakpoint

-- Mağaza olay defteri: webhook'a gelen her olay (satın alma, yenileme, iptal,
-- iade, ödeme sorunu). `entitlements` yalnız ŞU ANKİ durumu tutuyor; gelir,
-- dönüşüm ve kayıp ancak olay geçmişinden hesaplanabiliyor. Mali kayıt:
-- hesap silmede satır kalır, kullanıcı kimliği boşaltılır (politika §11).
CREATE TABLE IF NOT EXISTS "store_events" (
  "id" serial PRIMARY KEY NOT NULL,
  "provider" text NOT NULL,
  "event_id" text,
  -- INITIAL_PURCHASE | RENEWAL | CANCELLATION | EXPIRATION | REFUND | BILLING_ISSUE ...
  "type" text NOT NULL,
  "user_id" text,
  "platform" text,
  "product" text,
  -- TRIAL | INTRO | NORMAL | PROMOTIONAL
  "period_type" text,
  "environment" text,
  -- Sağlayıcının USD karşılığı ve yerel tutar.
  "price_usd" real,
  "currency" text,
  "price_local" real,
  "event_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "store_events_event_idx" ON "store_events" USING btree ("provider", "event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_events_at_idx" ON "store_events" USING btree ("event_at");

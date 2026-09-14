-- YAPAY ZEKÂYA VERİ GİTMEDEN ÖNCE AÇIK İZİN.
--
-- Kullanıcının yazdığı ve söylediği metin dil modeli sağlayıcılarına, ekran
-- kapalı yürüyüşteki ve telaffuz puanındaki ses konuşma tanıma sağlayıcılarına
-- gidiyordu; uygulama bunu bir bilgi notuyla söylüyor ama İZİN İSTEMİYORDU.
-- App Store 5.1.2(i) (Kasım 2025) ve Google Play Kullanıcı Verileri politikası
-- (26 Ağustos 2026) üçüncü taraf yapay zekâya paylaşımdan ÖNCE açık izin istiyor.
--
-- Eklemeli defter: her karar bir satır, yürürlükteki durum son satır. Önceki
-- satırlar verinin geçmişte hangi izinle gönderildiğini gösteriyor (GDPR m.7(1)).
-- Kullanıcıya bağlı: hesap silmede `lib/account/purge` siliyor.
--
-- DEPLOY'DAN ÖNCE UYGULANMALI: uçlar kapıda bu tabloyu okuyor; tablo yokken
-- yapay zekâ uçları 503 döner (izin doğrulanamadan veri gönderilmez).
CREATE TABLE IF NOT EXISTS "user_consents" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  -- ai_text | ai_voice
  "purpose" text NOT NULL,
  -- true = izin verdi, false = reddetti ya da geri aldı
  "granted" boolean NOT NULL,
  -- Kararın verildiği metin sürümü (lib/ai-consent-shared AI_CONSENT_VERSIONS).
  "version" integer NOT NULL,
  -- ios | android | web
  "platform" text,
  "decided_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_consents_user_purpose_idx" ON "user_consents" USING btree ("user_id","purpose","decided_at");

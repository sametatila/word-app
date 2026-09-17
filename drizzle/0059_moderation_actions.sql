-- ŞİKÂYETLERİN KAPATILDIĞI GÖRÜNÜYOR.
--
-- İki bildirim kuyruğu var: `content_reports` (yapay zekâ yanıtı /
-- değerlendirme) ve `user_reports` (sosyal: bir kullanıcıyı şikâyet etme).
-- İkincisi panoda HİÇ görünmüyordu; birincisi görünüyordu ama kapatılamıyordu.
-- Mağazaların kullanıcı içeriği kuralı (App Store 1.2, Play UGC) şikâyetin
-- okunduğunu ve işlendiğini ister; ikisi de ancak burada izlenebilir oluyor.
--
-- NEDEN AYRI TABLO. Karar kaydı (kim, ne zaman, ne not düştü) şikâyet
-- satırının bir sütunu olamayacak kadar çok alan taşıyor.
--
-- DÜZELTME (2026-09-17): ilk yazımda gerekçe olarak "deploy migration
-- uygulamıyor" yazılmıştı; YANLIŞ. `deploy.sh` her dağıtımda
-- `drizzle-kit push --force` çalıştırıyor, veritabanı `schema.ts`e ZORLA
-- eşitleniyor. Bu dosya belgedir; kalıcılığı sağlayan şemadaki tanım.
--
-- Kullanıcıya bağlı DEĞİL: yalnız admin e-postası ve kayıt kimliği tutuyor.
CREATE TABLE IF NOT EXISTS "moderation_actions" (
  "id" serial PRIMARY KEY NOT NULL,
  -- content_report | user_report
  "target" text NOT NULL,
  "ref_id" integer NOT NULL,
  -- resolved (gereği yapıldı) | dismissed (asılsız)
  "action" text NOT NULL,
  "actor" text,
  "note" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "moderation_actions_target_idx" ON "moderation_actions" USING btree ("target","ref_id");

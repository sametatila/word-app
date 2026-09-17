-- ŞİKÂYETLERİN KAPATILDIĞI GÖRÜNÜYOR.
--
-- İki bildirim kuyruğu var: `content_reports` (yapay zekâ yanıtı /
-- değerlendirme) ve `user_reports` (sosyal: bir kullanıcıyı şikâyet etme).
-- İkincisi panoda HİÇ görünmüyordu; birincisi görünüyordu ama kapatılamıyordu.
-- Mağazaların kullanıcı içeriği kuralı (App Store 1.2, Play UGC) şikâyetin
-- okunduğunu ve işlendiğini ister; ikisi de ancak burada izlenebilir oluyor.
--
-- NEDEN `user_reports`'a sütun EKLENMEDİ. Deploy migration uygulamıyor ve
-- Drizzle insert'i tablodaki her sütunu adıyla yazıyor: şemaya `status`
-- eklenip bu dosya canlıya uygulanmadan push edilirse şikâyet etme ucu
-- "column does not exist" ile kırılır. Ayrı tablo bu sırayı önemsizleştiriyor
-- ve karar kaydını (kim, ne zaman, ne not düştü) da veriyor.
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

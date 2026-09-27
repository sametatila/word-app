-- İÇERİK GERİ BİLDİRİMİ (docs/plan/content-feedback.md): `content_reports` her ekrandaki "Bildir"i de taşıyor.
--
-- Yeni tablo değil, mevcut tablo genişliyor: sütunların hepsi boş olabilir, eski satırlar ve eski istemcinin
-- gövdesi aynen geçerli. Kullanıcı kimliği taşıyan yeni sütun yok (silme/misafir birleştirme `user_id`e bakıyor).
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile şemayı zaten kurmuş olabilir; tekrar koşmak zararsız.
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "surface" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "target_type" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "target_id" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "target_sub" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "game" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "pack" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "item" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "detail" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "platform" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "app_version" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "course" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "native_lang" text;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "content_version" integer;
--> statement-breakpoint
ALTER TABLE "content_reports" ADD COLUMN IF NOT EXISTS "group_key" text;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_reports_group_idx" ON "content_reports" USING btree ("group_key","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_reports_surface_idx" ON "content_reports" USING btree ("status","surface","created_at");

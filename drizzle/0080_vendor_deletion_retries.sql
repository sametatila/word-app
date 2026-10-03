-- vendor_deletion_retries: üçüncü tarafta tamamlanamayan silmeler (RevenueCat müşteri kaydı).
-- Günlük cron yeniden deniyor, bir günü geçen satır uyarı motorunda (lib/account/revenuecat-delete,
-- güvenlik denetimi 2026-10-03 D27). subject_id silinmiş hesabın opak kimliği; silme bitince satır gidiyor.
CREATE TABLE IF NOT EXISTS "vendor_deletion_retries" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor" text NOT NULL,
	"subject_id" text NOT NULL,
	"attempts" integer DEFAULT 1 NOT NULL,
	"last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "vendor_deletion_retries_subject_idx" ON "vendor_deletion_retries" USING btree ("vendor","subject_id");

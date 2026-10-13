-- Stüdyo istatistikleri (2026-10-12): YouTube başlığı (yayın bilgisi, sürüm açmaz) ve sosyal işçilerin yazdığı geçmiş
-- (scripts/social/lib/stats.mjs): gönderi anlık görüntüleri ve günlük takipçi.
ALTER TABLE "social_episodes" ADD COLUMN IF NOT EXISTS "yt_title" text;--> statement-breakpoint
ALTER TABLE "social_episodes" ADD COLUMN IF NOT EXISTS "origin_yt_title" text;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_post_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"platform" text NOT NULL,
	"metrics" jsonb NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_post_snapshots_post_idx" ON "social_post_snapshots" USING btree ("post_id","at");--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_account_days" (
	"platform" text NOT NULL,
	"day" date NOT NULL,
	"followers" integer NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "social_account_days_platform_day_pk" PRIMARY KEY("platform","day")
);

-- social_posts: sosyal medya bölümlerinin platformdaki durumu (panel › Sosyal medya, 2026-10-09).
-- Plan depoda (data/social/plan.json); burada yalnız bölüm × platform durumu, bağlantı ve metrikler.
CREATE TABLE IF NOT EXISTS "social_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"episode_id" text,
	"platform" text NOT NULL,
	"status" text NOT NULL,
	"external_id" text,
	"url" text,
	"published_at" timestamp with time zone,
	"metrics" jsonb,
	"metrics_at" timestamp with time zone,
	"note" text,
	"updated_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "social_posts_episode_uq" ON "social_posts" USING btree ("episode_id","platform");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "social_posts_external_uq" ON "social_posts" USING btree ("platform","external_id");

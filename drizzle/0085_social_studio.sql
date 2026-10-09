-- Sosyal video stüdyosu (2026-10-09): bölümler (düzenlenebilir veri, saat, onay), sürümler, sunucuda video üretimi.
CREATE TABLE IF NOT EXISTS "social_episodes" (
	"id" text PRIMARY KEY NOT NULL,
	"template" text NOT NULL,
	"slot" text,
	"data" jsonb NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL,
	"spoken" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"origin" jsonb NOT NULL,
	"origin_hash" text NOT NULL,
	"origin_slot" text,
	"origin_spoken" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"used" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"edited" boolean DEFAULT false NOT NULL,
	"origin_changed" boolean DEFAULT false NOT NULL,
	"approved_revision" integer,
	"approved_by" text,
	"approved_at" timestamp with time zone,
	"updated_by" text,
	"archived_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_episodes_slot_idx" ON "social_episodes" USING btree ("slot");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_revisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"episode_id" text NOT NULL,
	"revision" integer NOT NULL,
	"data" jsonb NOT NULL,
	"spoken" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"slot" text,
	"author" text NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "social_revisions_uq" ON "social_revisions" USING btree ("episode_id","revision");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_renders" (
	"id" serial PRIMARY KEY NOT NULL,
	"episode_id" text NOT NULL,
	"revision" integer NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"requested_by" text,
	"error" text,
	"duration" real,
	"bytes" integer,
	"lufs" real,
	"true_peak" real,
	"dir" text,
	"progress" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"heartbeat_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_renders_status_idx" ON "social_renders" USING btree ("status","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_renders_episode_idx" ON "social_renders" USING btree ("episode_id","created_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"episode_id" text NOT NULL,
	"kind" text DEFAULT 'audio' NOT NULL,
	"texts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"requested_by" text NOT NULL,
	"note" text,
	"reply" text,
	"history" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"requester_seen" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_requests_status_idx" ON "social_requests" USING btree ("status","updated_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "social_requests_episode_idx" ON "social_requests" USING btree ("episode_id");

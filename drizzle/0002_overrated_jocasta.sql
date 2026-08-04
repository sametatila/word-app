ALTER TABLE "profiles" ADD COLUMN "active_level" text DEFAULT 'A1' NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "level_score" integer DEFAULT 0 NOT NULL;
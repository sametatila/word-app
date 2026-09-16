CREATE TABLE IF NOT EXISTS "weekly_quiz_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"week" date NOT NULL,
	"quiz_id" text NOT NULL,
	"native" text NOT NULL,
	"item_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"state" text DEFAULT 'running' NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "weekly_quiz_user_week_idx" ON "weekly_quiz_attempts" USING btree ("user_id","week");

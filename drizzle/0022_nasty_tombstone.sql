CREATE TABLE "ai_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"day" date NOT NULL,
	"kind" text NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"ok" boolean NOT NULL,
	"status" integer DEFAULT 0 NOT NULL,
	"error" text,
	"ms" integer DEFAULT 0 NOT NULL,
	"prompt_tokens" integer,
	"completion_tokens" integer,
	"audio_seconds" integer,
	"limits" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "ai_usage_day_idx" ON "ai_usage" USING btree ("day","kind");--> statement-breakpoint
CREATE INDEX "ai_usage_provider_idx" ON "ai_usage" USING btree ("provider","created_at");
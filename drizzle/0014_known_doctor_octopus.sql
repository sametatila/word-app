ALTER TABLE "roleplay_logs" ADD COLUMN "provider" text;--> statement-breakpoint
ALTER TABLE "roleplay_logs" ADD COLUMN "model" text;--> statement-breakpoint
ALTER TABLE "roleplay_logs" ADD COLUMN "limits" jsonb;
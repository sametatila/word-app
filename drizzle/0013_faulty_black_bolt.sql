CREATE TABLE "roleplay_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"turn" integer NOT NULL,
	"said" text NOT NULL,
	"reply" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "roleplay_logs_user_idx" ON "roleplay_logs" USING btree ("user_id","created_at");
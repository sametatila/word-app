CREATE TABLE "assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"kind" text NOT NULL,
	"exercise_id" text,
	"level" text NOT NULL,
	"day" date NOT NULL,
	"answer" text NOT NULL,
	"result" jsonb NOT NULL,
	"provider" text,
	"hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "assessments_user_idx" ON "assessments" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "assessments_user_day_idx" ON "assessments" USING btree ("user_id","day");--> statement-breakpoint
CREATE INDEX "assessments_hash_idx" ON "assessments" USING btree ("user_id","hash");
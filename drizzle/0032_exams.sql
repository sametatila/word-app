CREATE TABLE "exams" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"kind" text NOT NULL,
	"week" date NOT NULL,
	"level" text NOT NULL,
	"score" integer NOT NULL,
	"correct" integer NOT NULL,
	"total" integer NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "exams_user_idx" ON "exams" USING btree ("user_id","kind","week");--> statement-breakpoint
CREATE UNIQUE INDEX "exams_user_kind_week_idx" ON "exams" USING btree ("user_id","kind","week");
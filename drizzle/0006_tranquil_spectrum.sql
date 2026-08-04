ALTER TABLE "profiles" ADD COLUMN "course" text DEFAULT 'de' NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "course_chosen_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "skill_exercises" ADD COLUMN "course" text DEFAULT 'de' NOT NULL;--> statement-breakpoint
ALTER TABLE "words" ADD COLUMN "course" text DEFAULT 'de' NOT NULL;--> statement-breakpoint
CREATE INDEX "words_course_rank_idx" ON "words" USING btree ("course","niveau","rank");
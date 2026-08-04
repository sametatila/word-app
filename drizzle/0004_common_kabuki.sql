CREATE TABLE "skill_exercises" (
	"id" text PRIMARY KEY NOT NULL,
	"skill" text NOT NULL,
	"level" text NOT NULL,
	"title" text NOT NULL,
	"genre" text NOT NULL,
	"minutes" integer NOT NULL,
	"items" integer NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE INDEX "skill_exercises_level_idx" ON "skill_exercises" USING btree ("level","skill","position");
CREATE TABLE "placements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL,
	"suggested" text NOT NULL,
	"accepted" text,
	"per_skill" jsonb NOT NULL,
	"answers" jsonb NOT NULL,
	"score" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX "placements_user_idx" ON "placements" USING btree ("user_id","at");
CREATE TABLE "cheat_progress" (
	"user_id" text NOT NULL,
	"item_id" text NOT NULL,
	"state" integer DEFAULT 0 NOT NULL,
	"ease" real DEFAULT 2.5 NOT NULL,
	"interval_days" real DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"correct_streak" integer DEFAULT 0 NOT NULL,
	"leech" boolean DEFAULT false NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	CONSTRAINT "cheat_progress_user_id_item_id_pk" PRIMARY KEY("user_id","item_id")
);
--> statement-breakpoint
CREATE INDEX "cheat_progress_due_idx" ON "cheat_progress" USING btree ("user_id","due_at");
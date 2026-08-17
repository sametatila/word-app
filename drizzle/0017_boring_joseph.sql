CREATE TABLE "daily_scores" (
	"user_id" text NOT NULL,
	"day" date NOT NULL,
	"course" text NOT NULL,
	"level" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"best_combo" integer DEFAULT 0 NOT NULL,
	"seconds" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "daily_scores_user_id_day_pk" PRIMARY KEY("user_id","day")
);
--> statement-breakpoint
CREATE INDEX "daily_scores_board_idx" ON "daily_scores" USING btree ("day","course","level","score");
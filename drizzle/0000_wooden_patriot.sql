CREATE TABLE "daily_stats" (
	"user_id" text NOT NULL,
	"day" date NOT NULL,
	"reviews" integer DEFAULT 0 NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"new_words" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"seconds" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_stats_user_id_day_pk" PRIMARY KEY("user_id","day")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"display_name" text,
	"daily_goal" integer DEFAULT 20 NOT NULL,
	"new_per_day" integer DEFAULT 8 NOT NULL,
	"level" text DEFAULT 'A1' NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"last_active_day" date,
	"total_xp" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"word_id" integer NOT NULL,
	"game" text NOT NULL,
	"correct" boolean NOT NULL,
	"quality" integer NOT NULL,
	"latency_ms" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_words" (
	"user_id" text NOT NULL,
	"word_id" integer NOT NULL,
	"state" integer DEFAULT 0 NOT NULL,
	"ease" real DEFAULT 2.5 NOT NULL,
	"interval_days" real DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"correct_streak" integer DEFAULT 0 NOT NULL,
	"leech" boolean DEFAULT false NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	CONSTRAINT "user_words_user_id_word_id_pk" PRIMARY KEY("user_id","word_id")
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" integer PRIMARY KEY NOT NULL,
	"de" text NOT NULL,
	"artikel" text,
	"tr" text NOT NULL,
	"formen" text,
	"typ" text NOT NULL,
	"niveau" text NOT NULL,
	"beispiel" text
);
--> statement-breakpoint
ALTER TABLE "user_words" ADD CONSTRAINT "user_words_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "daily_stats_user_day_idx" ON "daily_stats" USING btree ("user_id","day");--> statement-breakpoint
CREATE INDEX "reviews_user_idx" ON "reviews" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "user_words_due_idx" ON "user_words" USING btree ("user_id","due_at");--> statement-breakpoint
CREATE INDEX "user_words_state_idx" ON "user_words" USING btree ("user_id","state");--> statement-breakpoint
CREATE INDEX "words_niveau_idx" ON "words" USING btree ("niveau");--> statement-breakpoint
CREATE INDEX "words_typ_idx" ON "words" USING btree ("typ");
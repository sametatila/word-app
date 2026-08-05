CREATE TABLE "user_lessons" (
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"rule_id" text NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"roleplay_done" boolean DEFAULT false NOT NULL,
	"attempts" integer DEFAULT 1 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"interval_days" integer DEFAULT 0 NOT NULL,
	"last_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_lessons_user_id_lesson_id_pk" PRIMARY KEY("user_id","lesson_id")
);

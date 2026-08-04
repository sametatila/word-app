CREATE TABLE "user_skills" (
	"user_id" text NOT NULL,
	"exercise_id" text NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"attempts" integer DEFAULT 1 NOT NULL,
	"last_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_skills_user_id_exercise_id_pk" PRIMARY KEY("user_id","exercise_id")
);

CREATE TABLE "session_state" (
	"user_id" text PRIMARY KEY NOT NULL,
	"day" date NOT NULL,
	"course" text DEFAULT 'de' NOT NULL,
	"rounds" jsonb NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	"correct" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"missed" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

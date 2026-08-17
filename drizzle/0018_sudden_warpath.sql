CREATE TABLE "quest_claims" (
	"user_id" text NOT NULL,
	"day" date NOT NULL,
	"quest_id" text NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"claimed_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quest_claims_user_id_day_quest_id_pk" PRIMARY KEY("user_id","day","quest_id")
);

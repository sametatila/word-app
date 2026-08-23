CREATE TABLE "achievements" (
	"user_id" text NOT NULL,
	"achievement_id" text NOT NULL,
	"unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
	"seen" boolean DEFAULT false NOT NULL,
	CONSTRAINT "achievements_user_id_achievement_id_pk" PRIMARY KEY("user_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"day" date NOT NULL,
	"name" text NOT NULL,
	"value" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "achievements_user_idx" ON "achievements" USING btree ("user_id","unlocked_at");--> statement-breakpoint
CREATE INDEX "events_user_idx" ON "events" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "events_name_day_idx" ON "events" USING btree ("name","day");
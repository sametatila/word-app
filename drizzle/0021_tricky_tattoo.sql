CREATE TABLE "module_clears" (
	"user_id" text NOT NULL,
	"course" text NOT NULL,
	"level" text NOT NULL,
	"module_index" integer NOT NULL,
	"best_left" integer DEFAULT 0 NOT NULL,
	"attempts" integer DEFAULT 1 NOT NULL,
	"cleared_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "module_clears_user_id_course_level_module_index_pk" PRIMARY KEY("user_id","course","level","module_index")
);

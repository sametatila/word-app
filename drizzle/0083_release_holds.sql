-- release_holds: "sonraki sürümde düzelecek" denilen bildirimler (içerik grubu, yapay zekâ bildirimi).
-- Her bildirenin uygulaması `build`e geçince o kişinin bildirimi kapanır ve sonuç gider (2026-10-06).
CREATE TABLE IF NOT EXISTS "release_holds" (
	"id" serial PRIMARY KEY NOT NULL,
	"queue" text NOT NULL,
	"ref" text NOT NULL,
	"build" integer NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"note" text,
	"actor" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"done_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "release_holds_item_uq" ON "release_holds" USING btree ("queue","ref");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "release_holds_status_idx" ON "release_holds" USING btree ("status","created_at");

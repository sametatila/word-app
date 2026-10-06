-- claude_tasks: panelde "Claude'a bırak" denilen bildirimler (içerik grubu, yapay zekâ bildirimi,
-- kullanıcı şikâyeti). Bildirim kapanmıyor; Claude bitirince 'done', Samet kapatınca 'closed' (2026-10-06).
CREATE TABLE IF NOT EXISTS "claude_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"queue" text NOT NULL,
	"ref" text NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"note" text,
	"result" text,
	"assigned_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"done_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "claude_tasks_item_uq" ON "claude_tasks" USING btree ("queue","ref");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "claude_tasks_status_idx" ON "claude_tasks" USING btree ("status","created_at");

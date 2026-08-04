ALTER TABLE "profiles" ALTER COLUMN "new_per_day" SET DEFAULT 15;--> statement-breakpoint
ALTER TABLE "words" ADD COLUMN "rank" integer;--> statement-breakpoint
CREATE INDEX "words_rank_idx" ON "words" USING btree ("niveau","rank");
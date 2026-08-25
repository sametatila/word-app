ALTER TABLE "user_skills" ADD COLUMN "skill" text;--> statement-breakpoint
ALTER TABLE "user_skills" ADD COLUMN "level" text;--> statement-breakpoint
ALTER TABLE "user_skills" ADD COLUMN "last_score" integer;--> statement-breakpoint
ALTER TABLE "user_skills" ADD COLUMN "first_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "user_skills_skill_level_idx" ON "user_skills" USING btree ("skill","level");--> statement-breakpoint
-- Eski satırların doldurulması: beceri/seviye egzersiz tablosundan, son puan en
-- iyi denemeden (elimizde yalnız o var), ilk deneme tarihi son denemeden (daha
-- iyi bir tahmin yok; yeni satırlar gerçek değeri alır).
UPDATE "user_skills" us SET "skill" = se."skill", "level" = se."level"
  FROM "skill_exercises" se WHERE se."id" = us."exercise_id" AND us."skill" IS NULL;--> statement-breakpoint
UPDATE "user_skills" SET "last_score" = ROUND(100.0 * LEAST("correct", "total") / NULLIF("total", 0))
  WHERE "last_score" IS NULL;--> statement-breakpoint
UPDATE "user_skills" SET "first_at" = "last_at" WHERE "first_at" > "last_at";

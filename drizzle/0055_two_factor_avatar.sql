-- ŞEMADA OLUP MIGRATION'I YAZILMAMIŞ ÜÇ ALAN (sürüklenme onarımı).
--
-- İki özellik şemaya girdi ama migration'ı yazılmadı:
--   - iki adımlı doğrulama (e55691a9): user."twoFactorEnabled" ve "twoFactor",
--   - hesapta duran avatar (a472c7ee): profiles.avatar.
-- Canlıda üçü de VAR, çünkü deploy şemayı `drizzle-kit push --force` ile
-- uyguluyor. Eksik kalan, boş veritabanından kurulum: CI'ın ve yerel docker'ın
-- `migrate-all`'ı bu alanları kurmuyordu. `schema-check` sapma veriyordu,
-- profiles'a yazan her veritabanı testi de (test:entitlement,
-- test:guest-merge) "column avatar does not exist" ile düşüyordu.
--
-- Tanımlar canlının şema dökümünden birebir alındı, kısıt adları dahil.
-- IF NOT EXISTS sayesinde canlıya ya da bu alanları zaten taşıyan bir kopyaya
-- uygulanması hiçbir şey değiştirmez.
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "twoFactorEnabled" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactor" (
  "id" text PRIMARY KEY NOT NULL,
  "secret" text NOT NULL,
  "backupCodes" text NOT NULL,
  "userId" text NOT NULL CONSTRAINT "twoFactor_userId_user_id_fk" REFERENCES "user"("id") ON DELETE CASCADE,
  "verified" boolean DEFAULT true NOT NULL,
  "failedVerificationCount" integer DEFAULT 0 NOT NULL,
  "lockedUntil" timestamp
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "avatar" text;

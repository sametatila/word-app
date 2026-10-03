-- profiles.placement_nudge: ilk hafta seviye önerisine verilen karar ("up:B2:yes",
-- "down:A1:no"); doluysa öneri bir daha gösterilmez (lib/placement-nudge, seviye testi v2).
-- Olay kaydında tutulmuyor: analitiği kapatanda olay yazılmaz ve öneri her açılışta dönerdi.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile sütunu önce kurdu (2026-10-03); tekrar koşmak zararsız.
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "placement_nudge" text;

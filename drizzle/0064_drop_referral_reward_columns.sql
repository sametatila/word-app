-- DAVET ÖDÜLÜNÜN ESKİ İKİ SÜTUNU MİGRATION ZİNCİRİNDEN DE DÜŞÜYOR.
--
-- 0041 `referrals` tablosunu `rewarded_at` ve `reward_minutes` ile kurdu.
-- 9c51c15f'te davetin karşılığı premium süresi olmaktan çıktı (arkadaşlık
-- bağı oldu) ve iki sütun `schema.ts`ten silindi; düşüren migration
-- yazılmadı. Canlıda `drizzle-kit push --force` onları çoktan düşürdü, ama zincir düşürmediği için boş veritabanına sıfırdan kurulan şema
-- (CI, yerel docker) koddan iki sütun fazla kalıyordu ve `schema-check`
-- kırılıyordu. IF EXISTS: canlıda sütun yok, tekrar koşmak zararsız.
ALTER TABLE "referrals" DROP COLUMN IF EXISTS "rewarded_at";
--> statement-breakpoint
ALTER TABLE "referrals" DROP COLUMN IF EXISTS "reward_minutes";

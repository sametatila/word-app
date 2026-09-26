-- KELİME KARTINDA KULLANIM BİLGİSİ (659e8972, lib/usage): hâl, söz dizimi, kayıt ve İngilizce kursta "brit" etiketi.
--
-- Sütun schema.ts'e eklenmiş, canlıda deploy `drizzle-kit push` ile kurulmuştu ama göçü yazılmamıştı; CI
-- veritabanı göçlerden kurulduğu için şema denetimi "SÜTUN YOK: words.usage" ile düşüyordu.
--
-- IF NOT EXISTS: canlıda sütun zaten var; tekrar koşmak zararsız.
ALTER TABLE "words" ADD COLUMN IF NOT EXISTS "usage" text;

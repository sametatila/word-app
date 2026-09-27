-- session_state.native_lang: turun kurulduğu anadil (schema.ts'te bc5b97eb ile geldi, göçü yazılmamıştı;
-- CI göç zinciri `schema-check`te "SÜTUN YOK" diyordu). Boş = sütundan önceki satır, o günün turu kabul edilir.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile sütunu zaten kurdu; tekrar koşmak zararsız.
ALTER TABLE "session_state" ADD COLUMN IF NOT EXISTS "native_lang" text;

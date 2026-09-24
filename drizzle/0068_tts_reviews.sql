-- KENDİ SESLERİMİZİN KULAK KONTROLÜ KARARLARI (Defne/Aras; docs/plan/tts-own-voices.md).
--
-- Kararlar yalnız kontrol sayfasının deposunda ve üretim makinesindeki bir JSON dosyasında duruyordu; başka bir
-- oturum ya da yeni bir Whisper taraması onaylanmış sesi yine getiriyordu. Karar SESE bağlı: `file` yayındaki
-- içerik adresli m4a adı, ses yeniden üretilirse yeni satır. Okuma/yazma: `npm run tts:reviews`.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile şemayı zaten kurmuş olabilir; tekrar koşmak zararsız.
CREATE TABLE IF NOT EXISTS "tts_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"voice" text NOT NULL,
	"lang" text NOT NULL,
	"text" text NOT NULL,
	"file" text DEFAULT '' NOT NULL,
	"verdict" text NOT NULL,
	"note" text,
	"source" text,
	"decided_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tts_reviews_item_uq" ON "tts_reviews" USING btree ("voice","lang","text","file");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tts_reviews_file_idx" ON "tts_reviews" USING btree ("file");

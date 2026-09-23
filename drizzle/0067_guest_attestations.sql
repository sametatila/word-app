-- MİSAFİR AÇILIŞINDA CİHAZ DOĞRULAMASI — KAYIT KİPİ (docs/plan/device-attestation.md Aşama 2).
--
-- "Hesapsız devam et" (`POST /api/auth/sign-in/anonymous`) e-postasız bir kimlik
-- açıyor ve tek koruma IP başına saatte 10 kimlik. Android istemci artık bu
-- istekte bir Play Integrity belgesi gönderiyor; sunucu belgeyi Google'a
-- çözdürüp sonucu bu tabloya yazıyor, KİMSEYİ REDDETMİYOR. Engelleme (Aşama 3)
-- ancak buradaki oranlar temiz çıkarsa açılacak.
--
-- Belgenin kendisi saklanmıyor. `request_hash` istemcinin tek kullanımlık
-- rastgele değerinin özeti: aynı belgenin tekrar kullanıldığını görmek için.
-- Hesap silinince `user_id` boşalıyor (lib/account/purge), satır kalıyor.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile şemayı zaten kurmuş
-- olabilir; tekrar koşmak zararsız.
CREATE TABLE IF NOT EXISTS "guest_attestations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"platform" text,
	"build" integer,
	"mode" text NOT NULL,
	"result" text NOT NULL,
	"reasons" text,
	"app_verdict" text,
	"device_verdict" text,
	"licensing_verdict" text,
	"request_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guest_attestations_at_idx" ON "guest_attestations" USING btree ("created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guest_attestations_user_idx" ON "guest_attestations" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guest_attestations_hash_idx" ON "guest_attestations" USING btree ("request_hash");

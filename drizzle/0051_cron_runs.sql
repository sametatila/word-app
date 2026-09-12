-- ZAMANLANMIŞ İŞİN ÇALIŞTIĞI GÖRÜNÜYOR.
--
-- Beş cron ucu vardı ve hepsi yalnız `console`a yazıyordu. Bu tam olarak bir
-- kez başımıza geldi: `vercel.json`daki üç cron Vercel bırakılınca çağıransız
-- kaldı ve uçlar AYLARCA hiç çalışmadı (bkz. AGENTS.md "Zamanlanmış işler").
-- Timer'ın susması, `CRON_SECRET`in kayması ya da işin içinde bir hata -
-- üçünün de tek izi kimsenin grep'lemediği bir log satırıydı.
--
-- Tablo kullanıcıya bağlı DEĞİL: kişisel veri tutmuyor, hesap silmede
-- silinecek bir şeyi yok.
CREATE TABLE IF NOT EXISTS "cron_runs" (
  "id" serial PRIMARY KEY NOT NULL,
  -- reminders | assess | summary | streak-alert | weekly-reminder
  "name" text NOT NULL,
  "ok" boolean NOT NULL,
  -- İşin sürdüğü süre (ms).
  "ms" integer DEFAULT 0 NOT NULL,
  -- Kısa sonuç ya da hata: "hedef 12 · gönderilen 9" / "denied" / hata metni.
  "detail" text,
  "ran_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cron_runs_name_idx" ON "cron_runs" USING btree ("name","ran_at");

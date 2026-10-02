-- answer_batches: /api/answers gönderiminin tekrar kimliği (istemcinin `batch`i).
-- Bağlantı yanıttan önce koptuğunda istemci aynı turu yeniden gönderiyor (anlık tekrar,
-- kuyruk, sendBeacon); uç ilk kopyayı işleyip yanıtı `result`a yazıyor, aynı kimlikle
-- gelen kopya turu yeniden saymadan o yanıtı alıyor (bkz. lib/answer-batches).
-- İçeriksiz ayıklama kaydı: 7 günde siliniyor (cron/assess), hesap silmede siliniyor.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile tabloyu önce kurabilir; tekrar koşmak zararsız.
CREATE TABLE IF NOT EXISTS "answer_batches" (
  "user_id" text NOT NULL,
  "batch" text NOT NULL,
  "result" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "answer_batches_user_id_batch_pk" PRIMARY KEY("user_id","batch")
);
CREATE INDEX IF NOT EXISTS "answer_batches_created_idx" ON "answer_batches" USING btree ("created_at");

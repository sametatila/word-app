-- PATİKANIN PRATİK ADIMLARI: dil bilgisi, tekrar (quiz), kontrol noktası.
--
-- Bu üç adım ünitenin derslerinden türetiliyor ve bir egzersiz kaydı yok; bu
-- yüzden "bitti" bilgisi hiçbir yerde tutulmuyordu. Ünite 13 adım gösterirken
-- sayaç 10, Patika kartları 4 üzerinden sayıyordu. Anahtar patika öğesinin
-- kimliği ("de-a1-u03-quiz1"). Kullanıcıya bağlı: `lib/account/purge` siliyor.
CREATE TABLE IF NOT EXISTS "user_path_items" (
  "user_id" text NOT NULL,
  "item_id" text NOT NULL,
  "last_pct" integer NOT NULL,
  "best_pct" integer NOT NULL,
  "attempts" integer DEFAULT 1 NOT NULL,
  "passed_at" timestamp with time zone,
  "last_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "user_path_items_user_id_item_id_pk" PRIMARY KEY("user_id","item_id")
);

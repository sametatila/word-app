-- UYGULAMA İŞLETİMİ: sürüm, askıya alma, silme kaydı, toplu bildirim.
--
-- Dördü de yönetim panelinden yönetilen işler ve dördü de bugüne kadar
-- yapılamıyordu ya da iz bırakmıyordu (denetim 2026-09-17):
--   * hangi kullanıcının uygulamanın hangi sürümünü kullandığı bilinmiyordu,
--     zorunlu güncellemenin kime etki edeceği de bilinemiyordu;
--   * kuralı çiğneyen bir hesabı durdurmanın tek yolu veritabanıydı;
--   * hesap silmeleri hiçbir iz bırakmıyordu (kaç kişi, hangi yoldan);
--   * herkese duyuru göndermenin yolu yoktu.
--
-- Hepsi ADDİTİF: canlıdaki kod bu tablolara bakmıyor, önce uygulanması güvenli.

-- İstemci sürümü: platform başına son görülen sürüm ve build.
-- Mobil her istekte `x-lernomi-client: <platform>/<semver>/<build>` gönderiyor;
-- `/api/me` bunu okuyup yazıyor. Kullanıcıya bağlı: hesap silmede siliniyor,
-- misafir birleşmesinde taşınıyor.
CREATE TABLE IF NOT EXISTS "user_clients" (
  "user_id" text NOT NULL,
  -- ios | android
  "platform" text NOT NULL,
  "app_version" text NOT NULL,
  "build" integer NOT NULL,
  "first_seen" timestamp with time zone DEFAULT now() NOT NULL,
  "last_seen" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "user_clients_pk" PRIMARY KEY ("user_id", "platform")
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_clients_build_idx" ON "user_clients" USING btree ("platform", "build");--> statement-breakpoint

-- Askıya alma. Satır varken ve `lifted_at` boşken (ve süresi dolmamışken)
-- hesap yeni oturum AÇAMIYOR; askıya alma anında mevcut oturumlar siliniyor.
-- Kullanıcıya bağlı: hesap silinirse kayıt da gidiyor.
CREATE TABLE IF NOT EXISTS "account_suspensions" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  -- Kullanıcıya gösterilmeyen iç gerekçe (moderasyon notu).
  "reason" text NOT NULL,
  -- Boşsa süresiz.
  "until" timestamp with time zone,
  "admin_email" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "lifted_at" timestamp with time zone,
  "lifted_by" text
);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_suspensions_user_idx" ON "account_suspensions" USING btree ("user_id", "lifted_at");--> statement-breakpoint

-- Hesap silme kaydı. KİŞİSEL VERİ YOK, bilerek: kimlik, e-posta, ad
-- tutulmuyor (gizlilik politikası §11 "kalıcı olarak silinir"). Tutulan tek
-- şey kaç silmenin hangi yoldan olduğu - ürün ve destek sorusu.
CREATE TABLE IF NOT EXISTS "account_deletions" (
  "id" serial PRIMARY KEY NOT NULL,
  -- self (kullanıcı kendisi) | admin (panel) | guest (misafir verisi)
  "source" text NOT NULL,
  -- Panel silmesinde admin e-postası; kullanıcı silmesinde boş.
  "admin_email" text,
  -- Panel silmesinde kısa gerekçe kategorisi (spam, istek, kural ihlali...).
  "reason" text,
  -- Silinen hesap misafir miydi, kaç gündür vardı - kohort sorusu için.
  "was_guest" boolean DEFAULT false NOT NULL,
  "age_days" integer,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint

-- Toplu bildirim kaydı: kim, ne, kime, kaç cihaza ulaştı.
CREATE TABLE IF NOT EXISTS "push_broadcasts" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  -- Uygulama içi hedef (ör. "/learn") - boşsa ana ekran.
  "url" text,
  -- Hedef kitle filtresi (JSON): { native, course, platform, test }.
  "audience" jsonb NOT NULL,
  "admin_email" text,
  -- Hedeflenen kullanıcı / ulaşılan kanal sayısı.
  "targeted" integer DEFAULT 0 NOT NULL,
  "delivered" integer DEFAULT 0 NOT NULL,
  -- sending | done | failed
  "state" text DEFAULT 'sending' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "finished_at" timestamp with time zone
);

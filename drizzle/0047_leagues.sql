-- Haftalık ligler — genel sıralamanın yerine geçen küme yapısı.
--
-- Bugüne kadar sıralama TEK ve DÜZ bir tabloydu: bu haftanın XP'si, ilk on
-- kişi ve bir de kullanıcının kendi satırı. On iki kullanıcıda bu iyi çalışır.
-- Büyüdükçe tersine döner — 400. sırada olmak bir hedef değil, bir yargıdır;
-- ölçülen etki de bu yönde: küresel tablolar ilk yüzdeliği motive edip geri
-- kalanı kırıyor. Çözüm tabloyu kaldırmak değil, KÜÇÜLTMEK: herkes kendi
-- boyundaki otuz kişiyle yarışır, hafta sonunda yükselir ya da düşer.
--
-- XP SÜTUNU BİR SAYAÇ DEĞİL. Hafta sürerken sıralama `daily_stats`ten canlı
-- hesaplanıyor (getLeaderboard ve ortak görev ile aynı kaynak). `final_xp`
-- yalnız hafta kapanırken yazılıyor: geçmiş hafta dondurulmalı, yoksa eski
-- bir günün istatistiği düzeltildiğinde kapanmış bir ligin sırası değişirdi.
--
-- Satır kullanıcı o hafta İLK XP'sini kazandığında açılıyor (bkz.
-- lib/social/leagues.ts joinLeague, XP kancasından çağrılıyor). Hiç
-- çalışmayanın tabloda yeri yok: yarışmayan biri yarışanın sırasını bozmamalı.
CREATE TABLE IF NOT EXISTS "league_members" (
	"user_id" text NOT NULL,
	"week_start" date NOT NULL,
	"tier" integer DEFAULT 0 NOT NULL,
	"cohort" integer DEFAULT 0 NOT NULL,
	"final_xp" integer DEFAULT 0 NOT NULL,
	"rank" integer,
	"outcome" text,
	"seen" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "league_members_pk" PRIMARY KEY("user_id","week_start")
);--> statement-breakpoint
-- Grup tablosu okunurken kullanılan tek sorgu: bir haftanın bir ligindeki bir grubu getir.
CREATE INDEX IF NOT EXISTS "league_members_group_idx" ON "league_members" USING btree ("week_start","tier","cohort");--> statement-breakpoint
-- "Bu kullanıcının son ligi ne?" — yeni haftanın ligini belirlerken.
CREATE INDEX IF NOT EXISTS "league_members_user_idx" ON "league_members" USING btree ("user_id","week_start");

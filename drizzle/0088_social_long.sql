-- Stüdyo: yatay (YouTube uzun video) bölümleri (2026-10-13). Dikey bölümler "dikey"; yatay bölümün şablonu
-- scripts/social/yatay/sablonlar/<şablon>.js, verisi data/social/yatay/<şablon>-<NNN>.mjs, sesleri dört karakter.
ALTER TABLE "social_episodes" ADD COLUMN IF NOT EXISTS "format" text DEFAULT 'dikey' NOT NULL;

-- Stüdyo: üretimin yeri (2026-10-14). server (sunucu işçisi) · mac (Samet'in Mac'i, yalnız yatay uzun video).
ALTER TABLE "social_renders" ADD COLUMN IF NOT EXISTS "target" text DEFAULT 'server' NOT NULL;

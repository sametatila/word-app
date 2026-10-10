-- Instagram otomatik yayın (2026-10-10): social_posts.job (kap kimliği, deneme, hata). Durumlar: auto · publishing · failed.
ALTER TABLE "social_posts" ADD COLUMN IF NOT EXISTS "job" jsonb;

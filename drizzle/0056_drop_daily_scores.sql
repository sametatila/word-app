-- GÜNÜN TURU KALDIRILDI (2026-09-15, ürün sahibinin kararı).
--
-- Öğren › Daha fazlası'ndaki Günün turu iki platformdan çıktı (8bc1c1a9); onun
-- tek tablosu `daily_scores` artık okunmuyor ve yazılmıyor. Canlıda deploy
-- şemayı `drizzle-kit push --force` ile uyguladığı için tablo ilk deploy'da
-- düşüyor; bu dosya boş veritabanından kurulumu (CI, yerel docker) aynı yere
-- getiriyor. IF EXISTS: zaten düşmüş bir kopyaya uygulanması bir şey değiştirmez.
DROP TABLE IF EXISTS "daily_scores";

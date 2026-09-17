-- DENEME SINAVINI AÇILDIĞI İÇERİK SÜRÜMÜNE SABİTLER.
--
-- Kâğıtlar yayın hattından okunuyor (0062) ve yayın sınav sürerken
-- değişebiliyor. Sürüm sabitlenmezse öğrencinin cevapları başka bir kâğıt
-- sürümüne göre puanlanabilir: soru kayar, doğru şık değişir ve öğrenci
-- hatayı asla göremez. Sessiz ve en pahalı kusur türü.
--
-- NULL kalması meşru: bu sütundan ÖNCE açılmış denemeler canlı sürümle
-- puanlanıyor, çünkü başka bir doğru cevap yok.
ALTER TABLE "mock_exam_attempts" ADD COLUMN IF NOT EXISTS "release" integer;

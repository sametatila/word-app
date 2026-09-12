-- SESLENDİRMENİN BEDELİ KARAKTERDE ÖLÇÜLÜYOR.
--
-- `ai_usage` muhasebesi jetonla (metin modelleri) ve saniyeyle (yazıya
-- çevirme) çalışıyordu; seslendirme ise karakter başına ücretlendiriliyor
-- (Azure'un ücretsiz katmanı ayda 500.000 karakter). Kolon o yüzden ayrı:
-- jeton alanına yazmak birimleri karıştırırdı.
ALTER TABLE "ai_usage" ADD COLUMN IF NOT EXISTS "chars" integer;

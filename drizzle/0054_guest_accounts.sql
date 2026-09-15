-- MİSAFİR KİMLİĞİ (mağaza ön inceleme B24, App Store 5.1.1(v)).
--
-- Mobil uygulama artık hesapsız kullanılabiliyor: "Hesapsız devam et" sunucuda
-- e-postasız, adsız bir kullanıcı açıyor (better-auth `anonymous` eklentisi) ve
-- öğrenme uçları bugünkü gibi çalışıyor. Eklentinin kullanıcıya eklediği tek
-- alan bu bayrak; auth tablolarının öteki sütunları gibi camelCase.
--
-- Varsayılan FALSE ve NOT NULL: var olan her hesap gerçek hesap. NULL kalsaydı
-- "misafir mi" sorusu eski satırlar için belirsizleşir, hesap isteyen kapılar
-- (sosyal, yapay zekâ, satın alma, bildirim) o satırlarda yanlış karar verirdi.
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "isAnonymous" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
-- Kısmi dizin: haftalık temizlik yalnız misafirleri tarıyor ve gerçek hesaplar
-- dizine hiç girmiyor (bkz. lib/account/guest).
CREATE INDEX IF NOT EXISTS "user_is_anonymous_idx" ON "user" ("createdAt") WHERE "isAnonymous";

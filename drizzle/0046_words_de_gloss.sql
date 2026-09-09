-- Anadil ekseninin Almanca yüzü: kelimenin ve örnek cümlenin Almanca karşılığı.
--
-- `words` bugüne kadar iki anadile bakıyordu — `tr`/`beispiel_tr` ve
-- `en`/`beispiel_en`. Üçüncüsü, Almanca, hiç yoktu; oysa `NATIVE_LANGS` üç dil
-- sayıyor ve çözücü (`glossFor`) `deGloss` alanını ZATEN okuyor. Yani kod
-- hazırdı, sütun yoktu: `check:pairs` de tam bu yüzden Almanca anadilli her
-- çifti "karşılık 0%" diye ölçüyordu.
--
-- İKİSİ DE NULLABLE ve öyle kalacak. Almanca anadilli bir kullanıcıya Almanca
-- kursu sunulmuyor (`coursesForNative` kendi dilini eliyor), dolayısıyla
-- `course='de'` satırlarında bu iki alan hiç okunmuyor — doldurulmaları
-- 8.707 satırlık bir kopya olurdu. Boş bırakılıyorlar ve bu bilinçli:
-- doluluk ölçümü (`check:pairs`) zaten kursu anadille eşleşen çifti atlıyor.
--
-- DEĞERLER ÜRETİLİYOR, YAZILMIYOR — en azından büyük çoğunluğu:
--   gsw-zh : Almanca karşılık = kaynak satırın başlığı (`formen` alanındaki
--            "HD: …" köprüsünün ta kendisi), Almanca cümle = kaynak satırın
--            cümlesi. Lehçe cümleleri Almanca cümlenin karşılığı olacak
--            biçimde hizalandığı için (167/167 paket) ikisi de 8.267/8.267.
--   en     : Almanca karşılık = kaynak satırın başlığı. İngilizce kurs Almanca
--            havuzdan türetilmiş ve kaynak satırın `en` alanı ile İngilizce
--            başlık 6.975/6.975 birebir aynı — ölçüldü. Kaynağı olmayan 200
--            madde elle yazılacak.
--   en     : Almanca CÜMLE türetilemiyor. İngilizce örnek cümleler Almanca
--            cümlenin çevirisi DEĞİL, aynı kelime için bağımsız yazılmış
--            cümleler ("pflegen" → "Sie pflegt ihre kranke Mutter" ↔ "Nurses
--            care for patients day and night"). 7.175'i de çevrilecek.
ALTER TABLE "words" ADD COLUMN IF NOT EXISTS "de_gloss" text;
ALTER TABLE "words" ADD COLUMN IF NOT EXISTS "beispiel_de" text;

-- Almanca anadilli kullanıcı yalnız `de` dışındaki kurslara bakıyor; sorgu da
-- kurs + doluluk üzerinden gidiyor.
CREATE INDEX IF NOT EXISTS "words_de_gloss_idx" ON "words" ("course") WHERE "de_gloss" IS NOT NULL;

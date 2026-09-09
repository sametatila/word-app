-- Mağaza olayı eleme indeksi BENZERSİZ oldu.
--
-- 0041 ve 0043'te bu indeks yalnız aramayı hızlandırıyordu; eleme işini kodun
-- kendisi yapıyordu: önce `select … where source='store' and ref=<olay>`, satır
-- yoksa uygula. Bu bir "kontrol et, sonra davran" yarışı. Aynı olay eşzamanlı
-- iki kez teslim edilirse ikisi de seçimden geçer.
--
-- BUGÜNKÜ KODDA ZARARSIZ OLMASI YETMİYOR. Ölçüldü: mağaza alanlarının hepsi
-- MUTLAK yazılıyor, iki işleyici aynı satırı okuyup aynı değeri hesaplıyor;
-- hediye iadesi ve davet ödülü de kendi koşullu UPDATE'leriyle korunuyor. Yani
-- bugün çift teslimat yalnız deftere fazladan bir satır bırakıyor.
--
-- Ama bu bir DURUM tespiti, yapısal bir garanti değil. `applyStoreEvent`e
-- yarın artıran tek bir yazma eklenirse (ör. "her yenilemede X gün hediye")
-- koruma sessizce delinir ve kimse fark etmez — ödeme webhook'larında hatanın
-- para tarafına düştüğü yer tam olarak burasıdır. Sektör pratiği bu yüzden
-- tektir: olay kimliği bir idempotans anahtarıdır ve veritabanı kısıtıyla
-- zorlanır. Kod artık deftere yazmayı KAPI olarak kullanıyor (çakışırsa olay
-- zaten işlenmiştir) ve yazma ile durum güncellemesi tek işlemde.
--
-- Aynı adı DÜŞÜRÜP yeniden kuruyoruz: 0043'te benzersiz olmayan hâli oluşmuştu.
-- Tablo şu an boş (premium henüz canlı değil), dolayısıyla yinelenen `ref`
-- yüzünden oluşturma düşemez; boş olmasaydı bu dosya önce yinelenenleri
-- ayıklamak zorunda kalırdı.
DROP INDEX IF EXISTS "premium_grants_store_ref_idx";

CREATE UNIQUE INDEX IF NOT EXISTS "premium_grants_store_ref_idx"
  ON "premium_grants" ("ref") WHERE "source" = 'store';

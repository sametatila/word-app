-- user_clients.test_lab: satırı Firebase Test Lab cihazı yazdı (Play'in yayın öncesi raporu robotları).
-- Robotlar her yeni build'de Google test hesaplarıyla giriş yapıyor ve misafir açıyor; kullanıcı listesi ve
-- ölçümler kirleniyordu. Mobil o cihazlarda `x-lernomi-test-lab: 1` gönderiyor, `/api/me` işaretliyor
-- (lib/app-control recordClient). Yapışkan: kod onu hiç geri false yapmıyor. Panel ölçümleri bu hesapları
-- saymıyor (lib/test-lab); silme panelden ELLE (kullanıcılar, "Test Lab" süzgeci).
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile sütunu önce kurabilir; tekrar koşmak zararsız.
ALTER TABLE "user_clients" ADD COLUMN IF NOT EXISTS "test_lab" boolean DEFAULT false NOT NULL;

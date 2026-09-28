-- user_conversations.last_finish_id: son işlenen konuşma bitirişinin kimliği (istemcinin `finishId`i).
-- Ağ hatasındaki yeniden deneme ve kuyruktan yeniden gönderim aynı kimliği taşıyor; uç aynı kimliği
-- ikinci kez yazmıyor (bkz. lib/conversations/progress `recordConversation`). Boş = kimlik göndermeyen
-- eski sürüm ya da sütundan önceki satır: o istekler eskisi gibi işleniyor.
--
-- IF NOT EXISTS: canlıda deploy `drizzle-kit push` ile sütunu önce kurabilir; tekrar koşmak zararsız.
ALTER TABLE "user_conversations" ADD COLUMN IF NOT EXISTS "last_finish_id" text;

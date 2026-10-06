-- user_conversations.chat_waived: sohbet muafiyeti (yapay zekâ izni reddedilmiş ya da misafir).
-- Çevrimdışı senaryolu sohbet kaldırıldı (2026-10-05); izin yokken sohbet atlanıyor, konuşma
-- anlatım puanıyla geçiliyor. chat_done yapılmış sohbet olarak kalıyor (XP, başarımlar).
ALTER TABLE "user_conversations" ADD COLUMN IF NOT EXISTS "chat_waived" boolean DEFAULT false NOT NULL;

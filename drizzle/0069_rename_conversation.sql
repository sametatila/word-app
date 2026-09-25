-- 0069 — "DERS" VE "ROL YAPMA" ADLARININ KALKIŞI (2026-09-25).
--
-- Patika'da "ders" diye bir yapı yok: bugünkü ders Patika'nın KONUŞMA adımı
-- (`conversation`), adımın yapay zekâ sohbeti `chat` (docs/premium/README.md
-- §2 Sözlük). Bu dosya veritabanındaki adları ve kalıcı değerleri VERİ
-- KAYBETMEDEN yeni sözlüğe taşıyor: yalnız RENAME ve UPDATE; hiçbir tablo ya
-- da sütun silinmiyor.
--
-- NEDEN ELLE VE DEPLOY'DAN ÖNCE. `deploy.sh` şemayı `drizzle-kit push --force`
-- ile uyguluyor ve şemada olmayan tabloyu VERİSİYLE siliyor. Yeni şemada
-- `user_lessons` yok, `user_conversations` var: bu dosya koşmadan push
-- koşarsa eski tablo silinip boş bir yenisi açılabilir. Sıra:
--
--   1. yedek:  ssh lernomi 'sudo -u postgres pg_dump -Fc lernomi > /opt/lernomi/backups/predeploy/pre-0069.dump'
--   2. bu dosya (tek transaction, hata olursa hiçbir şey değişmez):
--        sudo -u postgres psql -d lernomi -v ON_ERROR_STOP=1 -f drizzle/0069_rename_conversation.sql
--   3. push → deploy.sh (şema artık birebir; push boş fark görmeli)
--   4. deploy BİTİNCE aynı dosya BİR KEZ DAHA: eski renk swap'e kadar eski
--      adlarla yazmaya devam ediyordu (ör. `roleplay` türlü ölçüm, eski sayaç
--      anahtarı). Dosya idempotent; ikinci koşu yalnız o artıkları taşır.
--
-- Swap'e kadar eski renk yeniden adlandırılmış tablolara eski adla
-- erişemiyor: Konuşma adımı, rozet ve plan uçları birkaç dakika 500 verir.
-- Uygulama yayında değil (yalnız test kullanıcıları), bu pencere kabul edildi.
--
-- KAPSAM (eski → yeni):
--   tablolar   user_lessons → user_conversations · roleplay_logs → chat_logs
--   sütunlar   lesson_id → conversation_id · roleplay_done → chat_done
--   kısıt/indeks/dizi adları içindeki user_lessons/roleplay_logs/lesson_id
--   usage_counters.key   writing_lesson: → path_writing: · owned_lesson: → path_writing_owned:
--                        writing_skill: → skill_writing: · speaking_skill: → skill_speaking:
--                        skill_ai: → skill_owned: · roleplay_turns → chat_turns (günlük)
--   events.name          lesson_start/step/finish → conversation_start/step/finish
--   events.kind          lesson → conversation · lessons → conversations · Lesson → Conversation
--                        RoleplayExam → ConversationScored · roleplay → chat
--                        first_lesson → first_conversation · roleplay_exam[:…] → conversation_scored[:…]
--   achievements         lesson1/10/50/100 → conversation1/10/50/100
--   quest_claims         lesson1 → conversation1
--   ai_usage.kind, assessments.kind, content_reports.kind   roleplay → chat
--   content_flags.pack   lessons/… → conversations/…
--   puanlı kısım         chat_logs.mode exam → scored · assessments.exercise_id <id>:exam → <id>:scored
--                        content_reports.ref <id>:exam:<tur> → <id>:scored:<tur>
--   user_path_items      <ünite>-checkpoint1 → <ünite>-unitQuiz1
--
-- Tek transaction: migrate-all ve apply-migration dosyayı tek cümle olarak
-- gönderiyor (statement-breakpoint yok), psql de BEGIN/COMMIT'e uyuyor.

BEGIN;

-- ── 1. user_lessons → user_conversations ───────────────────────────────────
DO $$
DECLARE r record;
BEGIN
  IF to_regclass('public.user_lessons') IS NOT NULL AND to_regclass('public.user_conversations') IS NULL THEN
    ALTER TABLE public.user_lessons RENAME TO user_conversations;
  END IF;
  IF to_regclass('public.user_conversations') IS NULL THEN
    RETURN; -- boş kurulumda tablo daha sonra push ile açılır
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = 'user_conversations' AND column_name = 'lesson_id') THEN
    ALTER TABLE public.user_conversations RENAME COLUMN lesson_id TO conversation_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = 'user_conversations' AND column_name = 'roleplay_done') THEN
    ALTER TABLE public.user_conversations RENAME COLUMN roleplay_done TO chat_done;
  END IF;
  -- Kısıtlar (birincil anahtarın indeksi de kısıtla birlikte yeniden adlanır).
  FOR r IN SELECT conname FROM pg_constraint
           WHERE conrelid = 'public.user_conversations'::regclass AND conname ~ '(user_lessons|lesson_id)' LOOP
    EXECUTE format('ALTER TABLE public.user_conversations RENAME CONSTRAINT %I TO %I', r.conname,
      replace(replace(r.conname, 'user_lessons', 'user_conversations'), 'lesson_id', 'conversation_id'));
  END LOOP;
  -- Kısıta bağlı olmayan indeksler.
  FOR r IN SELECT indexname FROM pg_indexes
           WHERE schemaname = 'public' AND tablename = 'user_conversations' AND indexname ~ '(user_lessons|lesson_id)' LOOP
    EXECUTE format('ALTER INDEX public.%I RENAME TO %I', r.indexname,
      replace(replace(r.indexname, 'user_lessons', 'user_conversations'), 'lesson_id', 'conversation_id'));
  END LOOP;
END $$;

-- ── 2. roleplay_logs → chat_logs ───────────────────────────────────────────
DO $$
DECLARE r record;
BEGIN
  IF to_regclass('public.roleplay_logs') IS NOT NULL AND to_regclass('public.chat_logs') IS NULL THEN
    ALTER TABLE public.roleplay_logs RENAME TO chat_logs;
  END IF;
  IF to_regclass('public.chat_logs') IS NULL THEN
    RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = 'chat_logs' AND column_name = 'lesson_id') THEN
    ALTER TABLE public.chat_logs RENAME COLUMN lesson_id TO conversation_id;
  END IF;
  FOR r IN SELECT conname FROM pg_constraint
           WHERE conrelid = 'public.chat_logs'::regclass AND conname ~ '(roleplay_logs|lesson_id)' LOOP
    EXECUTE format('ALTER TABLE public.chat_logs RENAME CONSTRAINT %I TO %I', r.conname,
      replace(replace(r.conname, 'roleplay_logs', 'chat_logs'), 'lesson_id', 'conversation_id'));
  END LOOP;
  FOR r IN SELECT indexname FROM pg_indexes
           WHERE schemaname = 'public' AND tablename = 'chat_logs' AND indexname ~ '(roleplay_logs|lesson_id)' LOOP
    EXECUTE format('ALTER INDEX public.%I RENAME TO %I', r.indexname,
      replace(replace(r.indexname, 'roleplay_logs', 'chat_logs'), 'lesson_id', 'conversation_id'));
  END LOOP;
  -- `serial` sütununun dizisi (varsayılan değer OID ile bağlı, adı değişince kendiliğinden izliyor).
  IF to_regclass('public.roleplay_logs_id_seq') IS NOT NULL AND to_regclass('public.chat_logs_id_seq') IS NULL THEN
    ALTER SEQUENCE public.roleplay_logs_id_seq RENAME TO chat_logs_id_seq;
  END IF;
END $$;

-- ── 3. usage_counters anahtarları ─────────────────────────────────────────
-- Yeni anahtar zaten varsa (ikinci koşu: eski renk swap'e kadar eski adla
-- yazdı) birleştiriliyor: kullanılmış hak sayıları TOPLANIYOR, sahiplik
-- işaretleri (sayı 1) en büyüğüyle kalıyor. Sonra eski satır siliniyor.
CREATE TEMP TABLE _counter_map (old_prefix text, new_prefix text, additive boolean) ON COMMIT DROP;
INSERT INTO _counter_map VALUES
  ('writing_lesson:', 'path_writing:',       true),
  ('owned_lesson:',   'path_writing_owned:', false),
  ('writing_skill:',  'skill_writing:',      true),
  ('speaking_skill:', 'skill_speaking:',     true),
  ('skill_ai:',       'skill_owned:',        false),
  ('roleplay_turns',  'chat_turns',          true); -- günlük sohbet mesajı sayacı (tam anahtar)

INSERT INTO usage_counters (user_id, key, period, count, updated_at)
SELECT c.user_id, m.new_prefix || substr(c.key, length(m.old_prefix) + 1), c.period, c.count, c.updated_at
FROM usage_counters c JOIN _counter_map m ON starts_with(c.key, m.old_prefix) AND m.additive
ON CONFLICT (user_id, key, period) DO UPDATE
  SET count = usage_counters.count + excluded.count,
      updated_at = greatest(usage_counters.updated_at, excluded.updated_at);

INSERT INTO usage_counters (user_id, key, period, count, updated_at)
SELECT c.user_id, m.new_prefix || substr(c.key, length(m.old_prefix) + 1), c.period, c.count, c.updated_at
FROM usage_counters c JOIN _counter_map m ON starts_with(c.key, m.old_prefix) AND NOT m.additive
ON CONFLICT (user_id, key, period) DO UPDATE
  SET count = greatest(usage_counters.count, excluded.count),
      updated_at = greatest(usage_counters.updated_at, excluded.updated_at);

DELETE FROM usage_counters c USING _counter_map m WHERE starts_with(c.key, m.old_prefix);

-- ── 4. Ölçüm olayları ─────────────────────────────────────────────────────
UPDATE events SET name = 'conversation_' || substr(name, length('lesson_') + 1)
WHERE name IN ('lesson_start', 'lesson_step', 'lesson_finish');

UPDATE events SET kind = CASE kind
    WHEN 'lesson' THEN 'conversation'
    WHEN 'lessons' THEN 'conversations'
    WHEN 'Lesson' THEN 'Conversation'
    WHEN 'RoleplayExam' THEN 'ConversationScored'
    WHEN 'roleplay' THEN 'chat'
    WHEN 'first_lesson' THEN 'first_conversation'
    WHEN 'roleplay_exam' THEN 'conversation_scored'
  END
WHERE kind IN ('lesson', 'lessons', 'Lesson', 'RoleplayExam', 'roleplay', 'first_lesson', 'roleplay_exam');

UPDATE events SET kind = 'conversation_scored:' || substr(kind, length('roleplay_exam:') + 1)
WHERE starts_with(kind, 'roleplay_exam:');

-- ── 5. Rozetler ve görevler (birincil anahtar çakışırsa eski satır düşer) ──
UPDATE achievements a SET achievement_id = 'conversation' || substr(a.achievement_id, length('lesson') + 1)
WHERE a.achievement_id IN ('lesson1', 'lesson10', 'lesson50', 'lesson100')
  AND NOT EXISTS (SELECT 1 FROM achievements b
                  WHERE b.user_id = a.user_id AND b.achievement_id = 'conversation' || substr(a.achievement_id, length('lesson') + 1));
DELETE FROM achievements WHERE achievement_id IN ('lesson1', 'lesson10', 'lesson50', 'lesson100');

UPDATE quest_claims q SET quest_id = 'conversation1'
WHERE q.quest_id = 'lesson1'
  AND NOT EXISTS (SELECT 1 FROM quest_claims b WHERE b.user_id = q.user_id AND b.day = q.day AND b.quest_id = 'conversation1');
DELETE FROM quest_claims WHERE quest_id = 'lesson1';

-- ── 6. Tür değerleri ──────────────────────────────────────────────────────
UPDATE ai_usage SET kind = 'chat' WHERE kind = 'roleplay';
UPDATE assessments SET kind = 'chat' WHERE kind = 'roleplay';
UPDATE content_reports SET kind = 'chat' WHERE kind = 'roleplay';

-- ── 7. İçerik kapatmaları: Konuşma adımı paketi `lessons/` → `conversations/` ─
-- Yayın artık `conversations/<kurs>-<sv>` paketlerini yayınlıyor (build 6 için
-- eski adlı paketler de, bkz. lib/legacy-names); kapatma yeni adla tutuluyor,
-- gösterge onu eski adla da bildiriyor. Eski sürümlerin `content_release_items`
-- satırlarına dokunulmuyor: geçmiş sürüm olduğu gibi kalıyor.
UPDATE content_flags f SET pack = 'conversations/' || substr(f.pack, length('lessons/') + 1)
WHERE starts_with(f.pack, 'lessons/')
  AND NOT EXISTS (SELECT 1 FROM content_flags g
                  WHERE g.pack = 'conversations/' || substr(f.pack, length('lessons/') + 1) AND g.item = f.item);
DELETE FROM content_flags WHERE starts_with(pack, 'lessons/');

-- ── 8. Konuşma adımının puanlı kısmı: `exam` → `scored` ─────────────────────
-- Eskiden "sınav olarak dene" adıyla `exam` kipindeydi; artık adımın isteğe
-- bağlı PUANLI kısmı. Sohbet kaydının kipi, değerlendirmenin madde kimliği
-- (`<id>:exam`) ve bildirimin kaynağı (`<id>:exam:<tur>`) yeni adla.
UPDATE chat_logs SET mode = 'scored' WHERE mode = 'exam';
UPDATE assessments SET exercise_id = left(exercise_id, length(exercise_id) - length(':exam')) || ':scored'
WHERE kind = 'chat' AND exercise_id LIKE '%:exam';
UPDATE content_reports SET ref = regexp_replace(ref, ':exam(:|$)', ':scored\1')
WHERE kind = 'chat' AND ref ~ ':exam(:|$)';

-- ── 9. Patika: Kontrol noktası → Ünite quizi (`<ünite>-checkpoint1` → `<ünite>-unitQuiz1`) ─
UPDATE user_path_items p SET item_id = regexp_replace(p.item_id, '-checkpoint(\d+)$', '-unitQuiz\1')
WHERE p.item_id ~ '-checkpoint\d+$'
  AND NOT EXISTS (SELECT 1 FROM user_path_items q
                  WHERE q.user_id = p.user_id AND q.item_id = regexp_replace(p.item_id, '-checkpoint(\d+)$', '-unitQuiz\1'));
DELETE FROM user_path_items WHERE item_id ~ '-checkpoint\d+$';

COMMIT;

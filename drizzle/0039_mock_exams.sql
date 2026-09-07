-- Deneme sınavı denemeleri (mock exam attempts).
--
-- `exams` tablosu bu iş için kullanılamıyor: orada (user, kind, week) üzerinde
-- benzersiz indeks var, yani haftada tek kayıt. Deneme sınavı bunun tersi —
-- aynı kâğıdın aynı bölümü istendiği kadar çözülebilir ve her deneme kendi
-- satırında durur.
--
-- Satır sınav BAŞLARKEN açılıyor ve her cevapta güncelleniyor (anlık kayıt):
-- uygulama kapansa, telefon kilitlense, ağ kopsa bile kaldığı yerden devam
-- edilir. `state` bunun için var: 'running' yarım kalan denemedir, 'done'
-- puanlanmış olandır.
CREATE TABLE IF NOT EXISTS "mock_exam_attempts" (
  "id"            serial PRIMARY KEY,
  "user_id"       text NOT NULL,
  "paper_id"      text NOT NULL,
  "skill"         text NOT NULL,
  "level"         text NOT NULL,
  "state"         text NOT NULL DEFAULT 'running',
  -- madde kimliği → cevap (şık dizini, "true"/"false", şık harfi ya da metin)
  "answers"       jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- açık görev kimliği → yazılan metin ya da konuşmanın dökümü
  "open"          jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- açık görevlerin yapay zekâ değerlendirmesi: görev kimliği → puan + geri bildirim
  "open_scores"   jsonb NOT NULL DEFAULT '{}'::jsonb,
  "task_ix"       integer NOT NULL DEFAULT 0,
  "seconds_left"  integer NOT NULL DEFAULT 0,
  "correct"       integer NOT NULL DEFAULT 0,
  "total"         integer NOT NULL DEFAULT 0,
  "score"         integer NOT NULL DEFAULT 0,
  "passed"        boolean NOT NULL DEFAULT false,
  -- yapay zekâ geri bildirimi ve yapılacaklar listesi (finish'ten sonra)
  "ai"            jsonb,
  "started_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "finished_at"   timestamp with time zone
);

-- Devam eden denemeyi bulmak ve aynı bölümün geçmişini listelemek için.
CREATE INDEX IF NOT EXISTS "mock_attempts_user_part_idx"
  ON "mock_exam_attempts" ("user_id", "paper_id", "skill", "started_at" DESC);

-- İstatistik ekranı: kullanıcının bitmiş denemeleri, yeniden eskiye.
CREATE INDEX IF NOT EXISTS "mock_attempts_done_idx"
  ON "mock_exam_attempts" ("user_id", "finished_at" DESC);

# Faz 0 — Temel altyapı

Bu fazdaki paketler diğer her şeyin üstüne oturduğu zemin: ölçüm, sunucuda tutulan beceri verisi, hata sınıflandırması, tek bir AI değerlendirme servisi ve sağlayıcı yokken çalışan yedekler.

---

## WP-00 · Öğrenme ölçüm çerçevesi

**Amaç.** "Daha iyi öğreniyorlar mı?" sorusuna veriyle cevap verebilmek. Bugün ölçüm XP ve cevap doğruluğu; öğrenme sonucu ölçülmüyor.

**Etkilediği puan.** İlerleme/analitik (pedagoji, ölçme); bütün fazların kabul metriklerinin kaynağı.

**Mevcut kod.** `src/lib/track.ts` (`track(name, value)` → `/api/events`, tablo `events`), `src/lib/ai-usage.ts` (`aiUsage`), `dailyStats`, `reviews`, `userWords`. Raporlama betikleri: `scripts/report-events.ts`, `scripts/report-providers.ts`.

**Tasarım.**
- Olay sözlüğü genişletilir (`EventName` birliği): `session_round`(game, correct, latency), `production_attempt`(kind: translate|transform|free_sentence|writing_free|speaking_drill|roleplay, score), `exam_start/finish`(kind, level, score), `placement_finish`, `error_recorded`(type), `feedback_why_opened`, `skill_finish`(skill, level, score).
- KPI tanımları (`docs/plan/kpi.md` olarak WP çıktısı): haftalık aktif öğrenen, **üretim oranı** (üretim cevapları / tüm cevaplar), **kullanım sınavı skoru** (WP-42), beceri yetkinlik değişimi (WP-50), ders geçme oranı, rol yapma tamamlama oranı, hata tipi dağılımı, 7/30 gün tutunma.
- `scripts/report-learning.ts`: bu KPI'ları haftalık tablo hâlinde basar (mevcut `report-events.ts` deseni).

**Adımlar.**
1. `EventName` birliğine yeni olayları ekle; `track()` çağrısı olan bileşenlerde mevcut olayları koru.
2. `docs/plan/kpi.md` yaz: her KPI için tanım, hesap SQL'i, hedef değer.
3. `scripts/report-learning.ts` betiği; `package.json`'a `report:learning`.
4. Kullanıcı gizliliği: olaylarda serbest metin yok (yazma içeriği `events`'e yazılmaz; yalnız puan).

**Kabul kriterleri.** `npm run report:learning` üretim DB'sinde çalışır ve 8 KPI'yı basar; yeni özellikler bu olayları kullanır (kod incelemesinde kontrol).

**Süre.** 2–3 gün. **Bağımlılık.** Yok.

**Durum (2026-08-25).** Bitti. Olay adları eklendi (`src/lib/events.ts`), `events.kind` sütunu + migrasyon `0026_learning_events.sql` (üretim DB'sine uygulandı), `docs/plan/kpi.md` (8 KPI, SQL, hedef), `scripts/report-learning.ts` (`npm run report:learning` üretimde çalıştı: 4 haftalık WAU/ders/tutunma basıyor; üretim, sınav, beceri, hata satırları ilgili WP'ler gelene kadar boş). `session_round` bilinçli olarak yazılmıyor (STATUS karar kaydı).

---

## WP-01 · Beceri ilerlemesini sunucuya taşı

**Amaç.** Okuma/dinleme/yazma/konuşma tamamlanma ve puanları bugün `localStorage`'da (`src/lib/skills/progress.ts`); cihaz değişince kaybolur, analitikte görünmez, sınav/yetkinlik hesabına giremez.

**Mevcut kod.** `src/lib/skills/progress.ts` (`readSkillProgress`, `recordSkillResult`), `src/components/skills/player-shell.tsx` (`useSkillFinish` → `POST /api/skills` yalnız XP/seri için), şema: `skillExercises`, `userSkills` (içeriğine bak; muhtemelen bitirme kaydı var — doğrula ve genişlet).

**Tasarım.**
- `userSkills` tablosu: `userId, exerciseId, skill, level, bestCorrect, bestTotal, attempts, lastScore (0–100), lastAt, firstAt`. Serbest yazma/konuşma için `lastScore` rubrik puanı (WP-03).
- `GET /api/skills?level=` → kullanıcının o seviyedeki tüm egzersiz durumları; `POST /api/skills` mevcut sözleşme + `score` alanı.
- İstemci: `readSkillProgress` sunucudan okur, `localStorage` yalnız çevrimdışı önbellek; ilk açılışta yerel kayıtlar sunucuya taşınır (tek seferlik `migrate` çağrısı).

**Adımlar.**
1. Şemayı incele/genişlet; migrasyon.
2. API'yi genişlet (GET + score).
3. `progress.ts`'i sunucu-öncelikli yap; yerel → sunucu taşıma.
4. `skills-hub.tsx` tamamlanma sayılarını sunucudan al.
5. e2e (`scripts/e2e.ts`) içine bir beceri kaydı senaryosu ekle.

**Kabul.** İki farklı tarayıcıda aynı hesap aynı tamamlanma durumunu görür; `report:learning` beceri puanlarını okur.

**Süre.** 2–3 gün. **Bağımlılık.** WP-00 (olay adları).

**Durum (2026-08-25).** Bitti. `user_skills` + `skill, level, last_score, first_at` (migrasyon `0027_skill_progress.sql`, eski satırlar dolduruldu, üretime uygulandı). Kayıt mantığı `src/lib/skills/record.ts`'e taşındı (`recordSkillAttempt` → `skill_finish` olayı, `listSkillStatus`, `importSkillRecords`). `/api/skills`: GET `?level=`, POST `+score`, PUT taşıma. `progress.ts` sunucu-öncelikli (`syncSkillProgress`, tek seferlik taşıma bayrağı), `skills-hub` senkron + olay dinliyor, `useSkillFinish(correct, score?)`. e2e §27 (11 kontrol) yeşil.

---

## WP-02 · Hata taksonomisi

**Amaç.** Her yanlış cevabın **ne tür** hata olduğunu bilmek; geri bildirimin "neden"i, hata analitiği ve hataya göre tekrar planı buna dayanır.

**Mevcut kod.** `src/lib/session.ts` (`submitAnswers`: kalite puanı, SRS), `reviews` tablosu (cevap kaydı), oyun bileşenleri `src/components/games/*` (`GameResult`), `src/lib/srs.ts`.

**Tasarım.**
- Tip: `type ErrorType = "article" | "plural" | "case" | "verb_position" | "conjugation" | "spelling" | "meaning" | "word_order" | "pronunciation" | "listening"`.
- Sınıflandırma **istemcide, oyun bilir**: Artikel Yarışı → `article`; Çoğul → `plural`; Doğru Anlam/Doğru-Yanlış/Eşleştirme → `meaning`; Kulaktan Tanı → `listening`; Yazarak Hatırla → Levenshtein ≤ 2 ise `spelling`, değilse `meaning`; Cümleyi Diz → `word_order` (fiil yanlış konumdaysa `verb_position`); Cümleyi Tamamla → `meaning`; Sesli Söyle → `pronunciation`; WP-10/11/12'nin AI değerlendirmesi kendi tipini döner.
- `GameResult`'a `errorType?: ErrorType` ve `detail?: string` (örn. seçilen yanlış artikel). `Answer` → sunucu → `reviews.error_type` sütunu (ekleyici migrasyon).
- `src/lib/errors.ts`: tip listesi, Türkçe adları, her tipin dilbilgisi sayfası bağlantısı (`/cheatsheet#…` anahtarları), SRS ağırlığı.
- SRS: `schedule()`'a hata tipi ağırlığı (örn. `article` tekrarında aralık ×0.8) — küçük, ölçülebilir; varsayılan 1.0, WP-51 ayarlar.

**Adımlar.**
1. `errors.ts` + tipler; migrasyon (`reviews.error_type text null`).
2. Her oyuna sınıflandırma (11 oyun; küçük, mekanik değişiklikler).
3. `submitAnswers` alanı kaydeder; `track("error_recorded", …)`.
4. `getProgress` hata tipi dağılımını döner (WP-51'in tüketeceği ham veri).
5. e2e: yanlış artikel → `reviews.error_type = 'article'`.

**Kabul.** Bir turluk oyunda her yanlış için tip kaydı var; dağılım sorgusu çalışır.

**Süre.** 3 gün. **Bağımlılık.** WP-00.

**Durum (2026-08-25).** Bitti. `src/lib/errors.ts` (10 tip, Türkçe ad, cheatsheet bağlantısı, SRS ağırlığı, `miss`, `classifyTyping` Levenshtein ≤ 2, `classifyOrder` fiil konumu kuralı). `GameResult`/`Answer` → `errorType`, `detail`; 10 oyun + yürüyüş (`pronunciation`) sınıflandırıyor; `/api/answers` listeden doğruluyor; `submitAnswers` `reviews.error_type/detail` yazıyor, `error_recorded` olaylarını toplu atıyor, SRS ağırlığını uyguluyor; `getProgress().errors` 30 günlük dağılım. Migrasyon `0028_review_error_type.sql` üretime uygulandı. e2e §28 (17 kontrol) yeşil.

---

## WP-03 · AI değerlendirme servisi (`/api/assess`)

**Amaç.** Serbest cümle, serbest yazma, konuşma transkripti ve rol yapma için **tek** değerlendirme ucu; rubrikli, yapılandırılmış JSON döner; sağlayıcı yoksa dürüst yedek.

**Mevcut kod.** `src/lib/chat-providers.ts` (`chatProviders`, `completeChat`, `readLimits`), `src/lib/coach.ts` (`coachSpeech`, `coachDialogue` — tek cümlelik teşhis deseni), `src/app/api/coach/route.ts` (istek doğrulama, 503 deseni), `src/lib/ai-usage.ts`.

**Tasarım.**
- `POST /api/assess` gövde: `{ kind: "sentence"|"writing"|"speaking"|"roleplay", level, task: {prompt, target?, targets?, constraints?}, answer: {text, transcript?, words?}, locale: "tr" }`.
- Cevap: `{ score: {task:0-4, grammar:0-4, vocab:0-4, structure:0-4, overall:0-100}, errors: [{span:[start,end], type: ErrorType, fix, why_tr}], corrected: string, praise_tr: string, next_tip_tr: string }`.
- Uygulama: `src/lib/assess.ts` — seviye ve türe göre sistem istemi (Türkçe açıklama, Almanca düzeltme); `completeChat` ile JSON modu (sağlayıcı desteklemiyorsa çıktıyı ayrıştır ve doğrula — `zod` yoksa elle doğrula, geçersizse 502).
- Sınırlar: metin ≤ 1.500 karakter; kullanıcı başına günlük kota (`readLimits` desenine ek: `ASSESS_DAILY_LIMIT`, varsayılan 60); önbellek (aynı answer+task hash → 24 sa).
- Yedek: sağlayıcı yoksa 503 `not_configured`; istemci bileşenleri **kural tabanlı asgari değerlendirme** gösterir (kelime sayısı, kontrol listesi, kalıp kullanımı) ve "AI değerlendirmesi şu an kapalı" der.
- Kayıt: `assessments` tablosu (`userId, kind, exerciseId?, level, answer text, result jsonb, provider, createdAt`) — WP-52 gelişim grafiği buradan.

**Adımlar.**
1. `assess.ts` + istem şablonları (türe göre 4 şablon), JSON doğrulama.
2. Route + kota + önbellek + `recordAiUsage`.
3. `assessments` tablosu ve migrasyon.
4. İstemci yardımcı `src/lib/assess-client.ts` (`askAssess`, zaman aşımı 20 sn, iptal).
5. Kalite testi: 20 örnek cevap (doğru/yanlış/karışık, A1–B2) ile manuel değerlendirme; sonuçlar `docs/plan/assess-samples.md`'ye.

**Kabul.** 20 örnekte rubrik puanları insan değerlendirmesiyle ±1 içinde; hata span'leri metinde doğru yeri gösteriyor; sağlayıcı kapatılınca 503 ve istemci yedeği görünüyor.

**Süre.** 4–5 gün. **Bağımlılık.** WP-02 (hata tipleri).

---

## WP-04 · Çevrimdışı rol yapma yedeği

**Amaç.** Ders geçme koşulu `passed = roleplayDone && oran ≥ 0.7` (`src/lib/lessons/progress.ts:129`); sağlayıcı erişilemezse rol yapma bitmez, ders geçilemez. Yedek: senaryolu, niyet eşleştirmeli yerel diyalog.

**Mevcut kod.** `src/lib/dialogue.ts` (`matchReply`, `usedTargets` — beceri diyaloglarının motoru), `src/lib/lessons/roleplay.ts` (`streamRoleplay`), `src/components/lessons/lesson-player.tsx` (satır ~690: 503 dalı), ders içeriği `roleplay: { opening, minTurns, … }`.

**Tasarım.**
- Ders içeriğine isteğe bağlı `roleplay.script: DialogueTurn[]` (WP-70 şeması) — kapalı temalı, 3–5 turluk, `minTurns` kadar dal.
- `lesson-player`: `/api/roleplay` 503 dönerse (ya da `chatConfigured()` yanlışsa, sunucu `GET /api/roleplay/status` ile bildirir) `script` ile yerel akışa geç; UI'da "Konuşma servisi kapalı — senaryolu konuşma" rozeti; `roleplayDone` yerel akışta da sayılır.
- Senaryo yoksa: `usedTargets` mantığıyla "hedef kalıpları kullan" görevine düşülür (kullanıcı 3 hedef kalıbı sesli/yazılı söyler → tamamlandı).
- İçerik: 220 dersin senaryosu WP-71/72 içinde üretilir; bu WP motor + 10 örnek ders.

**Adımlar.**
1. Ders tipine `script` alanı; `dialogue.ts` motorunu ders bağlamında kullanan `src/lib/lessons/offline-roleplay.ts`.
2. `lesson-player` dal seçimi ve rozet.
3. 10 A1 dersine senaryo (içerik).
4. e2e: sağlayıcısız ortamda ders geçilebilir.

**Kabul.** `CHAT_PROVIDER`/anahtarlar yokken A1 dersi baştan sona geçilir, `userLessons.passed = true`.

**Süre.** 3 gün. **Bağımlılık.** Yok (WP-70 şemasıyla uyumlu olmalı).

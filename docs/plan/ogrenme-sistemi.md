# Öğrenme sistemi — ne kuruldu, nerede

Ağustos 2026 yol haritası (WP-00…WP-80) uygulandı. Bu belge onun özeti: her alan için
kodda nerede durduğu, sonradan kaldırılanlar, uyulan ilkeler ve açık işler. KPI ve olay
sözlüğü `kpi.md`de; Beceriler kütüphanesi `90-beceri-kutuphanesi.md`de; Patika
`immersion.md`de.

## Alanlar

| WP | Ne | Kodda |
|---|---|---|
| 00, 80 | Ölçüm: kapalı olay sözlüğü, ekran anahtarları, KPI raporu | `lib/events.ts`, `lib/track.ts`, `lib/screens.ts`, `components/telemetry.tsx`, `scripts/report-learning.ts` (bkz. `kpi.md`) |
| 01 | Beceri ilerlemesi sunucuda | `lib/skills/record.ts`, `/api/skills`, `user_skills` |
| 02 | Hata taksonomisi, SRS hata ağırlığı | `lib/errors.ts`, `reviews.error_type/detail` |
| 03 | AI değerlendirme (rubrik 0–4, span, önbellek, kota) | `/api/assess`, `lib/assess.ts`, `lib/assess-prompts.ts`, `lib/assess-client.ts`; kalite ölçümü `assess-samples.md` |
| 04 | Sağlayıcısız sohbet yedeği | `lib/conversations/offline-chat.ts`, `content/scripts-a1.ts` |
| 10 | Çeviri turu | `lib/sentence-match.ts`, `lib/session.ts` |
| 12 | Serbest cümle | `components/games/free-sentence-game.tsx` |
| 13, 61 | "Neden" satırı ve fark vurgusu | `lib/why.ts`, `components/feedback/*`, `/demo-feedback` (canlıda yalnız admin) |
| 14 | Tanımadan üretime merdiven | `lib/ladder.ts` (`PRODUCTION_GAMES`) |
| 20 | Telaffuz puanı (kelime düzeyi) | `lib/stt.ts`, `/api/pronounce`, `lib/pronounce.ts`, `lib/pronounce-client.ts` (bkz. `pronunciation-providers.md`) |
| 21 | Monolog görevi | `components/skills/monologue-player.tsx` |
| 22 | Puanlı konuşma (sınav kipi) | `/conversations/[id]/scored`, `components/conversations/conversation-scored.tsx` |
| 23 | Açık diyalog (LLM + senaryo yedeği) | `lib/dialogue.ts`, `lib/conversations/chat.ts` (`dialoguePrompt`) |
| 30 | Serbest yazma değerlendirmesi, Yazılarım | `components/skills/writing-player.tsx`, `/api/assess/queue`, `/profile/writings` |
| 31 | Yazılı soru türleri (gapfill, short_answer, dictation, order) | `components/skills/quiz.tsx`, `lib/skills/types.ts` |
| 40 | Yerleştirme testi | `/placement`, `lib/placement.ts`, `lib/placement-score.ts`, `/api/placement` |
| 41 | Seviye ve modül sınavı, başarı belgesi | `lib/exam.ts`, `/exam/[level]`, `/api/exam`, `/api/certificate` |
| 43 | CEFR can-do haritası | `lib/cando.ts`, `lib/cando-map.ts`, `lib/cando-progress.ts`, `/api/cando`, `/profile/cando` |
| 50, 52 | Yetkinlik modeli ve gelişim raporu | `lib/proficiency.ts`, `lib/proficiency-data.ts`, `lib/growth.ts`, `/api/growth`, `components/progress-panel.tsx`, `/api/cron/summary` |
| 51 | Hata analitiği | `lib/error-analytics.ts`, `/api/errors`, `components/weak-spots-card.tsx` |
| 60 | Öğren merkezi | `components/learn/learn-hub.tsx`; tur `/learn/game` |
| 62 | Konuşma oynatıcı akışı | `components/conversations/conversation-player.tsx` |
| 63 | Beceriler (serbest çalışma kütüphanesi) | `/skills`, `components/skills/skill-browser.tsx` (bkz. `90-beceri-kutuphanesi.md`) |
| 65 | Onboarding + yerleştirme | `components/course-onboarding.tsx` (mobilin beş ekranıyla eş) |
| 66 | Koç cümlesi | `lib/coach-lines.ts`, `components/coach-line.tsx` |
| 70–72 | İçerik şeması, doğrulayıcı, konuşma ve beceri içeriği | `data/content/SPEC.md`, `npm run test:content` (`scripts/check-content.ts`), `lib/conversations/content`, `lib/skills/content` |
| 73 | Karıştırılan kelime çiftleri | `lib/confusables.ts`, `npm run content:confusables` |

Yollar `src/` altında.

## Sonradan kaldırılanlar

| Ne | Commit | Yerine |
|---|---|---|
| Dilbilgisi tabloları (cheatsheet), dönüştürme drilleri (WP-11), kural parçacıkları (WP-73) | 3bbae3a4 | Patika'da ünitenin konuşmalarından türetilen dilbilgisi adımı (`lib/immersion/grammar.ts`) |
| Altı sekmeli `/skills` beceri merkezi (WP-63) | a6eeb239 | Patika; `/skills` sonra kütüphane olarak geri geldi (WP-90) |
| Plan kartı / "Bugünkü plan" (WP-60) | 9d2c9311, e558b37e, dosya 0c001fb6 | Öğren merkezi; sıradaki ders Patika kartında |
| Haftalık kullanım sınavı ve `/api/weekly` (WP-42) | dd8cea71 | Haftalık quiz (`/api/quiz`, `lib/weekly-quiz`); `/learn/weekly` adresi ve `exams` satırı korundu |
| Dört adımlı web onboarding (WP-65) | c3cf81bd | Mobilin beş ekranı |
| Koç balonu ve turdaki maskot (WP-66) | 25a4e1df | Koçun cümlesi kaldı (`CoachLine`); Erdi yalnız günlük tur kutusunda |

## İlkeler

1. **AI yalnız tek yoldan.** Sohbet ve STT çağrıları `lib/chat-providers.ts` üzerinden, her deneme `recordAiUsage` ile `ai_usage`a yazılır.
2. **Sağlayıcı yoksa dürüst yedek.** Akış kilitlenmez: senaryo sohbeti, kural tabanlı değerlendirme (`fallbackAssessment`), öz değerlendirme; ekran bunu söyler.
3. **Her yeni yüzey ölçülür.** En az bir `track()` olayı; yeni ekran `screens.ts`e anahtar alır (bkz. `kpi.md`).
4. **Şema yalnız ekleyici.** Sütun silme ya da yeniden adlandırma yok. Yeni tablo, sütun, indeks `schema.ts`e de yazılır: deploy `drizzle-kit push --force` çalıştırıyor ve şemada olmayanı verisiyle siler.

## Açık işler

- **Sınavlarda dilbilgisi bölümü boş.** Yerleştirme (`lib/placement.ts:111`), seviye ve modül sınavı (`lib/exam.ts:259`) cheatsheet gidince boş kaldı. Yerleştirmenin 10 kişilik kalibrasyonu Samet'te.
- **İçerik kusuru.** `b1-u26-l2` 4. soru "Die Kanne steht schon auf ___ Tisch" dinleme metninde yok (metin: "Die Kanne mit Tee steht schon da."; `lib/skills/content/b1-u26.ts`). Okuma metni uzunluk uyarısı alt sınırın 0,6 katında (`scripts/check-content.ts:308`); gevşek.
- **Gerçek ses kaydı yok.** Dinleme `segments[].audio` alanı hiçbir içerikte dolu değil; ses sunucu TTS'inden.
- **Telaffuz.** Fonem düzeyi (faz 2) isteğe bağlı. Azure telaffuz puanı bağlı değil; bağlanacaksa önce gerçek kayıtla kalibrasyon. Puanlı konuşmada (WP-22) telaffuz ortalaması yok.
- **Bilerek yapılmadı:** WP-14 A/B bayrağı, WP-41 rozetleri, WP-42 görev (quest) bağlantısı.
- **Temizlik kararı bekleyen ölü kod.** `/api/plan` ve `lib/plan.ts` hiçbir yerden çağrılmıyor (`lib/weekly.ts` yalnız ona hizmet ediyor). `scripts/report-learning.ts` sözlükte artık olmayan olayları sorguluyor: `speak_self` (10. bölüm), `drill_finish` ve `drill` (11. bölüm, satır 225–240); satır 256 da ölü `drill`/`cheatsheet` ekran anahtarlarını sayıyor.
- **iOS monolog.** Mobil monologun `listenOnce` döngüsü iOS cihazında doğrulanmadı.

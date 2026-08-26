# Faz 8 — Takip katmanı (WP-80)

**Amaç.** "İleriye yönelik geliştirme için elimizde veri yok" durumuna hiçbir zaman düşmemek. Kullanıcının gelişimini ölçen her sinyal ve ürünü geliştirmeye yarayacak her davranış sinyali sunucuda, kapalı sözlükle, sorgulanabilir biçimde birikir; okuyan bir rapor vardır; yazılmayan olay testte patlar.

**Sahip.** Claude · başlangıç 2026-08-26 · durum: `inceleme`.

## 1. İlke

- **Kapalı sözlük.** Olay adı `src/lib/events.ts`'teki listeden, `kind` etiketi `[a-z0-9_:-]{1,32}`; serbest metin (öğrenci cümlesi, döküm) olaylara asla yazılmaz — içerik `assessments`'ta durur, olayda yalnız puanı vardır.
- **Ekran anahtarı.** Yol değil kapalı anahtar (`src/lib/screens.ts`): `learn, weekly, lessons, lesson, roleplay_exam, skills, skill, cheatsheet, drill, words, profile, settings, badges, writings, exam, placement, home, other`. Alt gezinme yeniden düzenlense de tarihsel veri kırılmaz.
- **Silinmez.** `events`, `reviews`, `daily_stats`, `user_lessons`, `user_skills`, `exams`, `placements`, `assessments`, `cheat_progress`, `ai_usage` için silme yolu yok. Süresi dolan yalnız `roleplay_logs` (konuşma dökümü, gizlilik) ve geçersiz `push_subscriptions`.
- **Ölçüm ölçtüğünü bozmaz.** İstemci `track()` beklemez, `keepalive` ile atar; sunucu 204 döner, hata fırlatmaz.
- **Yazılmayan olay hata.** `npm run test:events` kaynağı tarar: sözlükte olmayan ad, bozuk `kind`, yazan yeri olmayan olay → test düşer.

## 2. Ne ölçülüyor — tam envanter

### 2.1 Öğrenme sonucu (kullanıcının gelişimi)

| Sinyal | Kaynak | Ne cevaplar |
|---|---|---|
| Her kelime cevabı: oyun, doğru/yanlış, gecikme, kalite, **hata tipi** | `reviews` (+ `error_recorded`, `srs_weight` olayları) | tanıma/üretim oranı, hata taksonomisi, SRS ağırlığı |
| Ders: en iyi doğru, rol yapma bitti mi, deneme sayısı | `user_lessons` | ders geçme |
| **Ders başlangıcı / adım / bitiş** (yeni) | `lesson_start`, `lesson_step` (repeat·produce·truefalse × mic·typed·skip; 2 ilk denemede / 1 sonra / 0 geçilemedi), `lesson_finish` (bu denemenin yüzdesi) | adımlar sesle mi yazıyla mı geçiliyor, atlanıyor mu, ders başına gelişim trendi |
| Beceri egzersizi: en iyi doğru, son puan, deneme | `user_skills` + `skill_finish` | beceri yetkinliği (WP-50) |
| **Söyleyiş kararı** (yeni) | `speak_self` (asr / self, doğru/zorlandı) | drill sınıyor mu, öz-değerlendirmeye mi kaçılıyor |
| Telaffuz puanı | `pronounce` (egzersiz, 0–100) | telaffuz gelişimi |
| Üretim görevi puanı | `production_attempt` (translate·transform·free_sentence·writing_free·speaking_drill·roleplay) + `assessments` (rubrik, düzeltme) | üretim kalitesi trendi |
| Dilbilgisi drill cevabı ve **set bitişi** (yeni) | `drill` (hata tipi) + `drill_finish` (tablo, yüzde) + `cheat_progress` | hangi tablo çalışılıyor, ne kadar doğru |
| Sınav, yerleştirme, haftalık | `exams`, `placements`, `exam_start/finish`, `placement_finish` | ölçme katmanı |
| Rol yapma sınavı | `nav kind=roleplay_exam:*`, `assessments kind=roleplay` | konuşma sınavı |
| Can-do ilerlemesi | `lib/cando-progress.ts` (üstteki tablolardan türetilir) | "yapabildiklerim" |
| Günlük çaba | `daily_stats` (cevap, doğru, yeni, XP, saniye) | WAU, tutunma |

### 2.2 Ürün davranışı (uygulamayı geliştirmek için)

| Sinyal | Olay | Not |
|---|---|---|
| Ekran açılışı — sekme dışı ekranlar dâhil | `page_view` (ekran anahtarı) | Kelimeler/Profil alt gezinmeden çıkınca "kimse açmıyor mu" ancak böyle görülür |
| Ekranda görünür süre | `time_spent` (ekran, saniye; ayrılırken, ≥ 3 sn) | öğrenme yüzeylerinde geçen dakika |
| Sekme | `nav` (kind = learn/lessons/skills; eski satırlar sıra numarası) | 26 Ağu'da sıra değişti, rapor ada bakar |
| Katlı bölüm açılması | `panel_open` (weak_detail, sheet:<tablo>, single_game, plan, words_progress) | sahibin panoya taşıyıp katladığı ölçüm kartları görülüyor mu |
| Tur türü | `session_start kind` = mixed / single:<oyun> / extra | üretim oranı düşükken tek oyun tercihi |
| Onboarding hunisi | `onboarding_step` (welcome→goal→level→ready) + `placement_finish` | nerede bırakılıyor |
| Koç balonu | `coach_show` (an) | hangi an ne sıklıkta |
| Sesli okuma | `tts_play` (ekran, açılış başına bir) | dinleme kullanımı |
| Arama | `search` (words / cheatsheet, sorgu uzunluğu) | keşif |
| Ayar değişimi | `setting_change` (name, daily_goal, new_per_day, level, course, voice, theme) | "seviyeyi kimse değiştirmiyor" |
| Ses | `sound_toggle` | — |
| Bildirim hunisi | `push_optin` (1/0/2) → `push_sent` (reminder/summary, sunucu) → `push_open` (sw.js `src=push` ekler) | gönderim/açılış oranı |
| Ana ekrana ekleme | `install_prompt` (1 eklendi / 0 red / 2 iOS ipucu) | PWA benimseme |
| Davet | `invite_open` (`/?src=invite`) | paylaşımın dönüşü |
| Cihaz | `app_open` (ios/android/desktop : standalone/browser, genişlik; günde bir) | cihaz karışımı |
| İstemci hatası | `client_error` (ekran; 1 hata sınırı / 0 pencere olayı; dakikada bir) | "bir şeyler ters gitti"yi kim, nerede gördü |
| AI/STT sağlığı | `ai_usage` (tür, sağlayıcı, ok, gecikme, ses saniyesi) | kota ve düşüş; `report:stt` |
| Tur hunisi, görev, rozet, paylaşım, yürüyüş bitiş sebebi | önceki olaylar (`start_card`… `walk_end`) | değişmedi |

### 2.3 Bilerek ölçülmeyen

- `session_round` — `reviews` aynı satırı taşıyor (kpi.md).
- Kelime düzeyinde arama sorgusu metni, yazı/konuşma içeriği olaylarda yok (gizlilik; içerik `assessments`).
- Tıklama ısı haritası / oturum kaydı yok — soru sorulmadan veri toplanmaz.

## 3. Okuma

| Komut | Ne basar |
|---|---|
| `npm run report:events [gün]` | tur hunisi, sekmeler, **ekranlar (açılış·kişi·dakika·kalış)**, **katlı bölümler**, **onboarding hunisi**, **cihaz**, **bildirim/davet/yükleme hunisi**, **ayar·arama·ses·koç·hata**, günlük |
| `npm run report:learning [hafta]` | 8 KPI + **9 ders adımları**, **10 söyleyiş kararı + telaffuz**, **11 drill setleri**, **12 tur türleri**, **13 öğrenme yüzeylerinde süre**, **14 AI/STT sağlığı + istemci hataları** |
| `npm run report:stt` | STT kota modeli (`docs/plan/stt-capacity.md`) |
| `npm run report:all` | üçü art arda |
| `npm run test:events` | sözlük doğrulaması (CI'da çalıştırılmalı) |

Kullanıcı bazında gelişim: `GET /api/growth`, `/api/profile`, `/api/errors`, `/api/cando` — Beceriler panosu bunları çizer.

## 4. Bakım kuralları

1. Yeni bir ekran → `screens.ts`'e anahtar.
2. Yeni katlı bölüm → düğmeye `data-panel="…"` (aria-expanded ile birlikte); `telemetry.tsx` kendiliğinden sayar.
3. Yeni olay → `events.ts`'e yorumla; yazan yer; `report:*`'a satır; `test:events` yeşil.
4. Alt gezinme/ekran adı değişirse olay adı DEĞİŞMEZ; eşleme raporda yapılır (`nav` örneği).
5. Tablo silme/temizleme cron'u yazılmaz; büyürse arşivlenir (kopyalanır), silinmez.

## 5. Kanıt

- `npm run test:events` → 50 olay, hepsi yazılıyor.
- `npm run report:events 30`, `report:learning 4` üretimde çalışıyor (yeni bölümler ilk gün boş — beklenen).
- Kod: `src/lib/screens.ts`, `src/components/telemetry.tsx`, `src/lib/track.ts` (`trackOnce`), `public/sw.js` (`src=push`), çağrı yerleri `scripts/test-events.ts` ile görülür.

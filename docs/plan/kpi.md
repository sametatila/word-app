# Öğrenme KPI'ları ve takip katmanı

"Daha iyi öğreniyorlar mı?" sorusunun ölçülebilir hâli. `npm run report:learning [hafta]`
(`scripts/report-learning.ts`) sekiz KPI'yı haftalık basar; aşağıdaki SQL betikle **aynı**
tutulur, biri değişirse öteki de. Betik aynı sorguları son N hafta süzgeciyle koşar.

Haftalar Pazartesi başlar (`date_trunc('week', …)`). Sayılar hem olay hem kişi olarak verilir;
az kullanıcıda oran tek başına yanıltır.

## Veri kaynakları

| Kaynak | Ne taşır | Not |
|---|---|---|
| `events` | ürün ve öğrenme olayları; `name` kapalı liste, `kind` kısa etiket, `value` sayı | serbest metin yok (`src/lib/events.ts`) |
| `reviews` | her kelime cevabı: oyun, doğru/yanlış, gecikme, kalite, `error_type`, `detail` | tur ölçümü buradan; `session_round` bu yüzden yazılmıyor |
| `daily_stats` | gün başına cevap, doğru, yeni kelime, XP, saniye | aktiflik, tutunma |
| `user_conversations` | konuşma başına en iyi doğru, toplam, sohbet bitti mi, deneme | konuşma geçme, sohbet |
| `user_skills` | egzersiz başına en iyi doğru/toplam, son puan | beceri yetkinliği |
| `assessments` | AI değerlendirme sonuçları | yazma/konuşma puanı; öğrenci metni yalnız burada |

## KPI'lar

### 1. Haftalık aktif öğrenen (WAU)
O hafta en az bir cevap vermiş ya da XP kazanmış kişi. Hedef: artan; kayıtlıların ≥ %40'ı.
```sql
select date_trunc('week', day)::date as week, count(distinct user_id) as wau
from daily_stats where reviews > 0 or xp > 0 group by 1 order by 1;
```

### 2. Üretim oranı
Üretim turu / bütün turlar. Üretim = `PRODUCTION_GAMES` (`lib/ladder.ts`: typing, scramble, order,
translate, speak) + `production_attempt` olayları. Tanıma turu sayılır: tanıtım kartı 0, eşleştirme
turu beş cevap yazsa da 1 tur (0,2 ağırlık). Hedef ≥ %40. Oyun listesi `lib/ladder.ts` ile aynı tutulur.
```sql
with p as (
  select date_trunc('week', day)::date as week, count(*) as n
  from events where name = 'production_attempt' group by 1),
r as (
  select date_trunc('week', created_at)::date as week,
         count(*) filter (where game in ('typing','scramble','order','translate','speak')) as prod,
         round(sum(case when game = 'match' then 0.2 when game = 'intro' then 0
                        when game in ('typing','scramble','order','translate','speak') then 0 else 1 end)) as recog
  from reviews group by 1)
select coalesce(p.week, r.week) as week,
       coalesce(p.n,0) + coalesce(r.prod,0) as production, coalesce(r.recog,0) as recognition
from p full join r on p.week = r.week order by 1;
```

### 3. Sınav skorları
`exam_finish` (`kind = '<tür>:<seviye>'`, `value` = puan). Tür `usage` = haftalık quiz (`/api/quiz`),
öbürleri seviye/modül sınavı (`lib/exam.ts`). Hedef: haftalık quiz ortalaması ≥ 70.
```sql
select date_trunc('week', day)::date as week, split_part(kind, ':', 1) as exam,
       round(avg(value)) as avg_score, count(*) as exams, count(distinct user_id) as people
from events where name = 'exam_finish' group by 1, 2 order by 1, 2;
```

### 4. Beceri puanları
`skill_finish` (`kind = '<beceri>:<seviye>'`). Hedef: aktif seviyede her beceride 8 haftada ≥ +10.
```sql
select date_trunc('week', day)::date as week, kind as skill_level,
       round(avg(value)) as avg_score, count(*) as finishes, count(distinct user_id) as people
from events where name = 'skill_finish' group by 1, 2 order by 1, 2;
```

### 5–6. Konuşma geçme ve sohbet tamamlama
Geçme = sohbet bitti ve doğru/toplam ≥ 0,7 (`lib/conversations/progress.ts`). Hedef: geçme %60–80,
sohbet tamamlama ≥ %85 (sağlayıcı kapalıyken de).
```sql
select date_trunc('week', last_at)::date as week, count(*) as conversations,
       count(*) filter (where chat_done and correct::float / nullif(total,0) >= 0.7) as passed,
       count(*) filter (where chat_done) as chat_done, count(distinct user_id) as people
from user_conversations group by 1 order by 1;
```

### 7. Hata tipi dağılımı
`error_recorded` (`kind` = hata tipi). Hedef: toplam hata/cevap %25–40 bandında.
```sql
select date_trunc('week', day)::date as week, kind as error_type, count(*) as n
from events where name = 'error_recorded' group by 1, 2 order by 1, 3 desc;
```

### 8. Tutunma (1 ve 4 hafta)
İlk aktif haftası W olanların W+1 ve W+4'te geri gelme oranı. Hedef %50 / %30.
```sql
with first as (
  select user_id, date_trunc('week', min(day))::date as cohort
  from daily_stats where reviews > 0 or xp > 0 group by 1),
active as (
  select distinct user_id, date_trunc('week', day)::date as week
  from daily_stats where reviews > 0 or xp > 0)
select f.cohort, count(*) as users,
       count(*) filter (where exists (select 1 from active a where a.user_id = f.user_id and a.week = f.cohort + 7)) as back_w1,
       count(*) filter (where exists (select 1 from active a where a.user_id = f.user_id and a.week = f.cohort + 28)) as back_w4
from first f group by 1 order by 1;
```

## Takip katmanı

### İlkeler
- **Kapalı sözlük.** Olay adı `EVENT_NAMES`ten (`src/lib/events.ts`), `kind` `[a-z0-9_:-]{1,32}`, salt rakam reddedilir. Öğrenci metni olaya yazılmaz; içerik `assessments`ta, olayda yalnız puan.
- **Ekran anahtarı yol değil** (`src/lib/screens.ts`): home, learn, weekly, immersion, premium, conversations, conversation, conversation_scored, skills, skill, words, profile, settings, badges, writings, exam, placement, other. Gezinme değişse de geçmiş veri kırılmaz.
- **Analitik kapalıysa yazılmaz.** Tercih hesapta (`profiles.analytics_opt_out`); `track` her yazmada bakar. Kapalıyken yalnız hizmet için zorunlu olaylar yazılır: push_sent, push_deliver, mail_sent, client_error, placement_finish.
- **Hesap silinince silinir.** Kullanıcının olayları `src/lib/account/purge.ts` ile gider. Onun dışında olaylar için süre sınırlı silme yok.
- **Ölçüm akışı bozmaz.** İstemci beklemez; sunucu hata fırlatmaz.
- **Yazılmayan olay test hatası.** `npm run test:events`: sözlükte olmayan ad, bozuk `kind`, yazan yeri olmayan olay düşürür.

### Olay envanteri (72 olay)

| Grup | Olaylar |
|---|---|
| Tur ve oyun | session_start, session_resume, stage_done, session_done, session_stop, challenge_play, boss_play, boss_clear, quest_claim, achievement_unlock, share |
| Yürüyüş | walk_start, walk_end, walk_listen, walk_switch |
| Öğrenme sonucu | production_attempt, exam_start, exam_finish, mock_exam_start, mock_exam_finish, placement_finish, error_recorded, feedback_why_opened, skill_finish, pronounce, srs_weight, conversation_start, conversation_step, conversation_finish |
| Ekran ve davranış | page_view, time_spent, nav, panel_open, app_open, client_error, coach_show, tts_play, tts_fallback, search, setting_change, sound_toggle |
| Onboarding ve misafir | onboarding_step, first_practice, first_practice_done, onboarding_existing_account, guest_start, guest_nudge, guest_upgrade |
| Bildirim, posta, davet | notif_prime, push_optin, push_sent, push_deliver, push_open, mail_sent, install_prompt, invite_open |
| Premium | paywall_view, premium_gate, store_redirect, purchase_start, purchase_done, trial_code_claim |
| Sosyal | friend_request, friend_accept, reaction_send, nudge_send, quest_invite, quest_complete, feed_view, block_user, social_settings, league_up |

Her olayın `kind`/`value` anlamı `events.ts`te yanında yazılı. Bilerek ölçülmeyen: `session_round`
(`reviews` aynı satırı taşıyor), arama metni, tıklama ısı haritası, oturum kaydı. AI/STT sağlığı
olay değil `ai_usage` tablosunda.

### Raporlar

| Komut | Ne basar |
|---|---|
| `npm run report:learning [hafta]` | 8 KPI + konuşma adımları, söyleyiş, tur türleri, öğrenme yüzeylerinde süre, AI/STT sağlığı |
| `npm run report:events [gün]` | tur hunisi, ekranlar, katlı bölümler, onboarding, cihaz, bildirim hunisi, ayarlar |
| `npm run report:stt` | STT kota modeli (`stt-capacity.md`) |
| `npm run report:all` | üçü art arda |

### Bakım
1. Yeni ekran → `screens.ts`e anahtar.
2. Yeni katlı bölüm → düğmeye `data-panel="…"`; `telemetry.tsx` kendiliğinden sayar.
3. Yeni olay → `events.ts`e yorumuyla, yazan yer, gerekiyorsa rapora satır; `test:events` yeşil.
4. Ekran ya da sekme adı değişirse olay adı değişmez; eşleme raporda yapılır.
5. Analitik kapalıyken de yazılması gereken olay `OPERATIONAL` listesine gerekçesiyle girer; bu gizlilik politikasında "zorunlu kayıt" demektir.

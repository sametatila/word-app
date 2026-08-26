# Öğrenme KPI'ları (WP-00)

"Daha iyi öğreniyorlar mı?" sorusunun ölçülebilir hâli. Her KPI için: tanım, kaynak, hesap SQL'i, hedef. Hepsini `npm run report:learning [hafta]` haftalık tablo olarak basar (`scripts/report-learning.ts`); SQL burada betikle **aynı** tutulur — biri değişirse öteki de.

Haftalar Pazartesi başlar (`date_trunc('week', …)`). Sayılar hem olay hem kişi olarak verilir; yedi kişilik bir uygulamada oran tek başına yanıltıcıdır.

## Veri kaynakları

Tam envanter ve davranış olayları (ekran, süre, ders adımı, bildirim hunisi…): `docs/plan/80-takip.md` (WP-80). Sözlük doğrulaması `npm run test:events`.

| Kaynak | Ne taşır | Notlar |
|---|---|---|
| `events` | ürün ve öğrenme olayları; `name` kapalı liste, `kind` kısa etiket, `value` sayı | serbest metin yok (bkz. `src/lib/events.ts`) |
| `reviews` | her kelime cevabı: oyun, doğru/yanlış, gecikme, kalite, **hata tipi** (WP-02: `error_type`) | tur turu ölçüm buradan; `session_round` olayı bu yüzden yazılmıyor — aynı satırı iki tabloya yazmak sorguyu değil yalnız hacmi büyütürdü |
| `daily_stats` | gün başına cevap, doğru, yeni kelime, XP, saniye | aktiflik ve tutunma |
| `user_lessons` | ders başına en iyi doğru, toplam, rol yapma bitti mi, deneme | ders geçme, rol yapma |
| `user_skills` | egzersiz başına en iyi doğru/toplam, son puan (WP-01) | beceri yetkinlik hammaddesi |
| `assessments` | AI değerlendirme sonuçları (WP-03) | yazma/konuşma puan trendi |

Gizlilik: `events`'e hiçbir zaman öğrenci metni yazılmaz; yazma/konuşma içeriği yalnız `assessments`'ta durur ve KPI'lara **puan** olarak girer.

## KPI'lar

### 1. Haftalık aktif öğrenen (WAU)
**Tanım.** O hafta en az bir cevap vermiş ya da ders/egzersiz bitirmiş kullanıcı sayısı.
**Kaynak.** `daily_stats` (reviews > 0 veya xp > 0).
```sql
select date_trunc('week', day)::date as week, count(distinct user_id) as wau
from daily_stats
where (reviews > 0 or xp > 0) and day >= current_date - 7 * :weeks
group by 1 order by 1;
```
**Hedef.** Artan; kayıtlı kullanıcının ≥ %40'ı.

### 2. Üretim oranı
**Tanım.** *(26 Ağu düzeltmesi: payda TUR sayar — tanıtım kartı hariç, eşleştirme turu beş cevap yazsa da 1 tur (0,2 ağırlık); eski tanım cevap sayıyordu ve pay yarı yarıya düşük görünüyordu.)* Öğrencinin kendisinin ürettiği cevaplar / bütün cevaplar. Üretim = kelime turunda üretim oyunları (`lib/ladder.ts` `PRODUCTION_GAMES`: yazma, harf bulmacası, cümle diz, çeviri, sesli) + üretim görevleri (`production_attempt`: serbest cümle, yazma, konuşma drill'i, rol yapma). Tanıma = çoktan seçmeli, eşleştirme, doğru-yanlış, artikel, çoğul, dinleme.
**Kaynak.** `events.production_attempt` + `reviews.game`.
```sql
with p as (
  select date_trunc('week', day)::date as week, count(*) as n
  from events where name = 'production_attempt' group by 1),
r as (
  select date_trunc('week', created_at)::date as week,
         count(*) filter (where game in ('typing','scramble','order','translate','speak')) as prod,
         count(*) filter (where game not in ('typing','scramble','order','translate','speak')) as recog
  from reviews group by 1)
select coalesce(p.week, r.week) as week,
       coalesce(p.n,0) + coalesce(r.prod,0) as production, coalesce(r.recog,0) as recognition,
       round(100.0 * (coalesce(p.n,0) + coalesce(r.prod,0)) / nullif(coalesce(p.n,0) + coalesce(r.prod,0) + coalesce(r.recog,0), 0)) as production_pct
from p full join r on p.week = r.week order by 1;
```
**Hedef.** ≥ %40 (WP-14 merdiveni); Faz 3 sonunda ≥ %45. Oyun listesi `lib/ladder.ts` ile aynı tutulur.

### 3. Kullanım sınavı skoru
**Tanım.** Haftalık kullanım sınavının (WP-42) ortalama puanı ve giren kişi sayısı. Seviye/modül sınavları ayrı satırda.
**Kaynak.** `events.exam_finish` (`kind = '<tür>:<seviye>'`, `value = puan`).
```sql
select date_trunc('week', day)::date as week,
       split_part(kind, ':', 1) as exam, round(avg(value)) as avg_score,
       count(*) as exams, count(distinct user_id) as people
from events where name = 'exam_finish' group by 1, 2 order by 1, 2;
```
**Hedef.** Kullanım sınavı ortalaması ≥ 70; 4 haftada kişi başına artış.

### 4. Beceri yetkinlik değişimi
**Tanım.** Beceri × seviye başına haftalık ortalama egzersiz puanı (0–100) ve önceki haftaya göre fark. WP-50 modeli gelene kadar ham ortalama.
**Kaynak.** `events.skill_finish` (`kind = '<beceri>:<seviye>'`, `value = puan`). Kalıcı en iyi puanlar `user_skills`'ta.
```sql
select date_trunc('week', day)::date as week, kind as skill_level,
       round(avg(value)) as avg_score, count(*) as finishes, count(distinct user_id) as people
from events where name = 'skill_finish' group by 1, 2 order by 1, 2;
```
**Hedef.** Aktif seviyede her beceri için 8 haftada ≥ +10 puan.

### 5. Ders geçme oranı
**Tanım.** O hafta çalışılan derslerden geçilenlerin oranı. Geçme = rol yapma bitti **ve** doğru/toplam ≥ 0,7 (`src/lib/lessons/progress.ts`).
**Kaynak.** `user_lessons` (`last_at` haftası).
```sql
select date_trunc('week', last_at)::date as week,
       count(*) as lessons,
       count(*) filter (where roleplay_done and correct::float / nullif(total,0) >= 0.7) as passed,
       round(100.0 * count(*) filter (where roleplay_done and correct::float / nullif(total,0) >= 0.7) / count(*)) as pass_pct,
       count(distinct user_id) as people
from user_lessons group by 1 order by 1;
```
**Hedef.** %60–80 (çok yüksekse ders kolay, çok düşükse akış kırık).

### 6. Rol yapma tamamlama oranı
**Tanım.** Çalışılan derslerde rol yapmanın bitirilme oranı; AI ve senaryolu (WP-04) ayrımı `events.production_attempt kind='roleplay'` ile.
**Kaynak.** `user_lessons.roleplay_done`.
```sql
select date_trunc('week', last_at)::date as week,
       count(*) as lessons, count(*) filter (where roleplay_done) as roleplay_done,
       round(100.0 * count(*) filter (where roleplay_done) / count(*)) as done_pct
from user_lessons group by 1 order by 1;
```
**Hedef.** ≥ %85 (sağlayıcı kapalıyken de — WP-04).

### 7. Hata tipi dağılımı
**Tanım.** Yanlış cevapların hata tipine göre haftalık dağılımı (WP-02 taksonomisi).
**Kaynak.** `events.error_recorded` (`kind = ErrorType`). Kelime bazında ayrıntı `reviews.error_type`.
```sql
select date_trunc('week', day)::date as week, kind as error_type, count(*) as n
from events where name = 'error_recorded' group by 1, 2 order by 1, 3 desc;
```
**Hedef.** Tek bir tipin payı 4 hafta üst üste düşmüyorsa hedefli tekrar (WP-51) devreye girer; toplam hata/cevap oranı %25–40 bandında (SRS zorluk ayarı).

### 8. Tutunma (7 / 30 gün)
**Tanım.** İlk aktif haftası W olan kullanıcıların, W+1 ve W+4 haftasında yeniden aktif olma oranı (kohort).
**Kaynak.** `daily_stats`.
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
**Hedef.** 7 gün ≥ %50, 30 gün ≥ %30.

## Olay sözlüğü (öğrenme)

| Olay | `kind` | `value` | Kim yazar |
|---|---|---|---|
| `production_attempt` | translate / transform / free_sentence / writing_free / speaking_drill / roleplay | puan 0–100 | üretim görevleri (WP-10/11/12/21/30), rol yapma bitişi (WP-04) |
| `exam_start` / `exam_finish` | `<tür>:<seviye>` (level, module, usage, placement) | finish: puan 0–100 | sınavlar (WP-40/41/42) |
| `placement_finish` | bulunan seviye | puan 0–100 | WP-40 |
| `error_recorded` | ErrorType | 1 | sunucu, `submitAnswers` (WP-02) |
| `feedback_why_opened` | ErrorType | 0 | "neden?" bileşeni (WP-13/61) |
| `skill_finish` | `<beceri>:<seviye>` | puan 0–100 | `player-shell` (WP-01) |

Kullanılmayan ad: `session_round` — `reviews` zaten oyun, doğruluk ve gecikmeyi satır satır tutuyor; aynı bilgiyi `events`'e ikinci kez yazmak yalnız hacim üretirdi. Bir gün istemcide kaydedilmeyen turlar (deneme oyunları) ölçülmek istenirse bu ad hazır.

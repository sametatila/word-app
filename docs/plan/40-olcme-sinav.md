# Faz 4 — Ölçme ve sınav

Rapor: yerleştirme yok (seviye kullanıcı seçiyor), seviye/beceri sınavı yok, can-do yok, sertifika yok; tek "sınav" 15 soruluk süreli kelime tanıma. Bu faz ürünün ölçme katmanını sıfırdan kurar. Önce WP-43 (can-do haritası) — diğer üçü ona bağlanır.

---

## WP-43 · CEFR can-do haritası

**Amaç.** Her ders, egzersiz, drill ve sınav bölümü bir can-do ifadesine bağlı olsun; profilde "yapabildiklerim".

**Tasarım.**
- `src/lib/cando.ts`: `{ id: "A1.SPK.1", level, skill, text_tr, text_de?, source: "CEFR/Profile Deutsch" }` — seviye başına 4 beceri × 5–8 ifade (toplam ~130). Kaynak: CEFR Companion Volume + Profile Deutsch kalıpları; Türkçe sade yazım.
- İçerik şemalarına `cando: string[]` (ders, beceri egzersizi, drill, monolog, sınav bölümü). Doğrulayıcı: bilinmeyen kimlik hata.
- Sunucu: `userCando` görünümü (materialize edilmez; sorguyla): bir can-do "kanıtlı" sayılır ⇔ bağlı öğelerden ≥ 2'si tamamlandı ve son sınav bölümü ≥ %70 (WP-41/42).
- UI: profil "Yapabildiklerim" (WP-64), beceri merkezi filtre, ders/egzersiz kartında küçük etiket.

**Adımlar.** 1. Liste (içerik). 2. Şema alanı + doğrulayıcı. 3. Mevcut 220 ders + 345 egzersizin etiketlenmesi (toplu, LLM yardımıyla + gözden geçirme; WP-70 paketi). 4. Sorgu + API (`GET /api/profile` içine). 5. UI (WP-64 ile).

**Kabul.** Tüm içerik etiketli (doğrulayıcı geçiyor); profil ilk can-do'yu bir ders + bir egzersiz sonrasında gösteriyor.

**Süre.** 4 gün (+ etiketleme). **Bağımlılık.** WP-70.

---

## WP-40 · Yerleştirme testi

**Amaç.** İlk girişte (ve istendiğinde) 10–15 dakikalık uyarlanabilir test → seviye önerisi; kullanıcı yine kendisi onaylar.

**Mevcut kod.** `src/app/setup/page.tsx` + `src/components/course-onboarding.tsx` (kurs + seviye seçimi), `profiles.level`, `words.rank/niveau`, beceri içerikleri, WP-03/20.

**Tasarım.**
- Aşamalar (her biri ayrı bileşen, atlanabilir):
  1. **Kelime** (3 dk): `words`'ten seviye başına 8 kelime (rank'e göre örnekleme), "biliyorum / emin değilim / bilmiyorum" + 8 kontrol sorusu (Doğru Anlam) — bildiğini iddia edip yanlış yapana ağırlık düzeltmesi. Uyarlanabilir: A1'den başlar, %75+ ise bir seviye yukarı.
  2. **Dilbilgisi** (3 dk): WP-11 drill havuzundan seviye başına 3 yazılı madde (artikel/hal, fiil konumu, Perfekt, yan cümle, Konjunktiv…).
  3. **Okuma** (2 dk): iki kısa metin (A2, B1) × 3 soru.
  4. **Dinleme** (2 dk): iki kısa segment.
  5. **Yazma** (3 dk, isteğe bağlı): 3 cümlelik kendini tanıtma → WP-03.
  6. **Konuşma** (1 dk, isteğe bağlı): 2 cümle oku → WP-20.
- Puanlama: her aşama seviye tahmini; ağırlıklı medyan → önerilen seviye + beceri başına kısa profil ("okuman A2, konuşman A1"). Sonuç ekranı: öneri, gerekçe, "kabul et / değiştir".
- Kayıt: `placements` tablosu (`userId, at, suggested, accepted, perSkill jsonb, answers jsonb`). Tekrar alınabilir (profilden, 30 günde bir).
- Onboarding: kurs seçimi → "seviyeni ölçelim mi? (12 dk) / biliyorum" → test → seviye.

**Adımlar.** 1. Madde bankası seçimi ve uyarlama kuralı (`src/lib/placement.ts`, saf, birim testli). 2. Aşama bileşenleri (`src/components/placement/*`). 3. Sonuç + kayıt + profil güncelleme. 4. Onboarding entegrasyonu (WP-65). 5. Kalibrasyon: 10 gerçek kullanıcıyla karşılaştırma (proje sahibi + çevresi); eşikler `placement.ts`'te.

**Kabul.** Test 15 dk altında bitiyor; sonuç seviye + beceri profili; profilden yeniden alınabiliyor; 10 kişilik kalibrasyonda önerilen seviye ±1 içinde.

**Süre.** 7 gün. **Bağımlılık.** WP-11 (drill maddeleri), WP-03, WP-20 (isteğe bağlı aşamalar), WP-43.

---

## WP-41 · Seviye ve modül sınavı v2

**Amaç.** Modül patron turu "hız turu" olarak kalır; ayrıca **gerçek sınav**: dört beceri + dilbilgisi, üretim ağırlıklı, zamanlı, geçme eşiği, sertifika.

**Mevcut kod.** `src/lib/lessons/boss.ts` (`BOSS_*`, `moduleClears`), `src/components/boss-player.tsx`, `/lessons/sinav/[level]/[module]`, `/api/boss`.

**Tasarım.**
- İki düzey: **Modül sınavı v2** (ders modülü sonu, 20 dk) ve **Seviye sınavı** (seviye sonu, 45 dk). Bölümler ve ağırlıklar:
  | Bölüm | Modül | Seviye | Kaynak |
  |---|---|---|---|
  | Kelime (üretim: çeviri, yazma) | 6 | 12 | WP-10, modül/seviye kelimeleri |
  | Dilbilgisi (dönüştürme/boşluk) | 6 | 12 | WP-11 |
  | Okuma | 3 | 8 | beceri bankası, kullanılmamış |
  | Dinleme | 3 | 8 | beceri bankası |
  | Yazma (1 görev) | 1 | 2 | WP-30 |
  | Konuşma (2 cümle + 1 rol yapma sınav turu) | 1 | 1 | WP-20, WP-22 |
- Kurallar: zaman sınırı, geri dönüş yok, ipucu yok, her bölüm ayrı puan; geçme: toplam ≥ %70 ve hiçbir bölüm < %50. Ders modülünde ön koşul: modül derslerinin ≥ %80'i geçilmiş (aksi hâlde "deneme" — sayılmaz).
- Sonuç: bölüm puanları, hata tipi dağılımı (WP-02), can-do kanıtları (WP-43), önerilen çalışma (WP-51), sertifika (paylaşılabilir görsel + PDF: `/api/certificate/[id]`; `share-result.tsx` deseni).
- Kayıt: `exams` (`userId, kind, level, module?, startedAt, finishedAt, sections jsonb, total, passed`). Rozetler: "Sınav ustası" grubu genişler.
- Erişim: `/lessons/sinav/[level]/[module]` mevcut → "Hız turu" ve "Sınav" sekmeleri; `/skills` ve `/learn`'de "Seviye sınavı" kartı (WP-60/63).

**Adımlar.** 1. Sınav kurucu (`src/lib/exam.ts`: bölüm madde seçimi, kullanılmamış madde tercihi, tohumlu rastgelelik). 2. `exam-player.tsx` (bölüm geçişleri, zamanlayıcı, kayıt/devam). 3. Değerlendirme (nesnel + WP-03/20 çağrıları) ve sonuç ekranı. 4. Sertifika. 5. Rozet/quest bağları. 6. e2e: sınav kurulumu deterministik.

**Kabul.** A1 seviye sınavı 45 dk içinde 6 bölümüyle tamamlanıyor; bölüm puanları ve sertifika üretiliyor; geçme kuralı uygulanıyor.

**Süre.** 8 gün. **Bağımlılık.** WP-10, 11, 30, 20, 22, 43, 02.

---

## WP-42 · Haftalık kullanım sınavı

**Amaç.** "Öğrendiğini kullanabiliyor musun?" — kullanıcının kendi pekişmiş kelimelerinden, yalnız üretim oyunlarıyla, haftalık 15 soruluk kısa sınav; sonucu tekrar planından ayrı bir metrik.

**Mevcut kod.** `src/lib/session.ts` (pekişmiş bant: `intervalDays ≥ 21`; tek oyun dolgusu), `quests.ts`, `daily-player.tsx` (tek hak, tablo deseni).

**Tasarım.**
- Kurulum: haftada bir (Pazartesi), kullanıcının pekişmiş kelimelerinden 15 (rastgele, son 4 haftada sınanmamış), oyunlar: Çevir (5), Yazarak Hatırla (4), Cümleyi Tamamla-yazarak (3), Serbest cümle (2, AI), Sesli Söyle (1, WP-20; yoksa yazma).
- Sonuç: "kullanım skoru" (0–100), kelime başına doğru/yanlış; yanlışlar SRS'te kalite 2 ile geri gelir (pekişmişten düşer — dürüst ölçüm).
- Kayıt: `exams` (kind: weekly). Profilde haftalık trend (WP-52). Görev kartında "Haftanın sınavı" (quest).
- Pekişmiş kelimesi < 30 olan kullanıcıda: "öğreniliyor" bandından 15 kelime, etiket "kısa kontrol".

**Adımlar.** 1. Kurucu + rota `/learn/haftalik`. 2. Oynatıcı (session-player alt akışı; tek hak, ipuçsuz). 3. Sonuç + SRS geri yazımı + kayıt. 4. Quest + bildirim. 5. KPI: kullanım skoru.

**Kabul.** Pazartesi kart görünüyor; 15 soru; sonuç ve trend; yanlış kelimeler tekrar kuyruğuna dönüyor.

**Süre.** 4 gün. **Bağımlılık.** WP-10, WP-14, WP-02.

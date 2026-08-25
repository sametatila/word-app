# Faz 6 — Arayüz ve kompozisyon

Rapor: arayüz kalitesi yüksek (8–9) ama kompozisyon "oyun listesi" mantığında; öğrenme odaklı bir akış (bugün ne yapmalı, neden, sonra ne) yok; tek oyun/dilbilgisi gömülü; geri bildirim tek satır; ders ekranında sessizlikler. Bu fazda her ekran "öğrenme planı" fikrinin etrafında yeniden kurulur. Tasarım sistemi korunur (renkler, kartlar, Erdi); yeni bileşenler mevcut `card`, `btn`, `verdict` sınıflarını genişletir.

Genel ilkeler (her WP için):
- **Mobil ilk, tek el:** okuma üstte, dokunma altta (game-shell'in üç bölge kuralı).
- **Her ekranda bir sonraki adım tek düğme;** ikincil seçenekler ghost.
- **Geri bildirim üç katman:** sonuç (renk+simge) → gerekçe (tek satır) → derinleşme (bağlantı). Asla yalnız renk.
- **Erdi = koç sesi:** kutlama ve teşvik onun; hata açıklaması metin (WP-66).
- **Ölçüm:** her yeni kart/düğme bir `track` olayı.
- **Kanıt:** her WP mobil (390px) ve masaüstü (1024px) ekran görüntüsüyle kapanır.

---

## WP-60 · /learn yeniden kompozisyonu — "Bugünkü planın"

**Amaç.** /learn'i "modlar listesi"nden "kişisel öğrenme planı"na çevirmek.

**Mevcut kod.** `src/components/session-player.tsx` (ready ekranı: karşılama kartı, tekrar/yeni sayıları, başla, "Başka türlü oyna", görevler, tek oyun, sıralama), `daily-card`, `challenge-card`, `walk-card`, `cheatsheet-card`, `quest-card`, `leaderboard`.

**Tasarım (yukarıdan aşağıya):**
1. **Karşılama** (mevcut) + seviye + seri; Erdi.
2. **Bugünkü plan kartı** (yeni): 3–4 öğe, tahmini süre, tek "Başla": (a) tekrar turu (SRS: N kelime), (b) sıradaki en iyi adım (WP-50 önerisi: bir beceri egzersizi ya da ders), (c) hedefli çalışma (WP-51 zayıf nokta, varsa), (d) haftanın sınavı (WP-42, Pazartesi). Tamamlananlar tik alır; plan `dailyStats`'a yazılır (`plan_done`).
3. **Modlar** yatay kaydırmalı kompakt kartlar: Günün turu, Hayatta kalma, Yürürken, **Tek oyun** (artık görünür, oyun seçimiyle), **Dilbilgisi çalışması** (drill girişi).
4. **Sınavlar** kartı: yerleştirme (henüz alınmadıysa), seviye sınavı durumu, son sınav puanı.
5. Görevler (mevcut), sıralama (mevcut).

- Boş durumlar: yeni kullanıcı → "önce seviyeni ölçelim" (WP-40) ya da "ilk tur".
- Yükleme iskeletleri mevcut desenle.

**Adımlar.** 1. Plan verisi API'si (`GET /api/plan`: SRS sayıları + öneri + zayıf nokta + sınav durumu; `src/lib/plan.ts`). 2. `plan-card.tsx`. 3. Modlar şeridi + tek oyun/dilbilgisi kartları. 4. Sınavlar kartı. 5. Ölçüm olayları; A/B bayrağı (`profiles.flags.learnV2`).

**Kabul.** Yeni kullanıcı ve olgun kullanıcı için iki farklı plan; "Başla" planı sırayla oynatıyor (tur → egzersiz → drill); plan tamamlanınca kart "bugünlük tamam" diyor.

**Süre.** 5 gün. **Bağımlılık.** WP-50 (öneri; yoksa geçici kural), WP-42, WP-40.

---

## WP-61 · Geri bildirim bileşeni ve fark vurgusu

**Amaç.** WP-13'ün tasarım karşılığı: `FeedbackLine` ve `DiffText` bileşenleri; şerit, soru, drill, çeviri, yazma değerlendirmesi hepsi aynı dili konuşur.

**Tasarım.**
- `FeedbackLine`: [etiket: hata tipi renk+simge] [gerekçe metni] [Kural ↗]. Şeritte 2. satır; kartlarda liste.
- `DiffText`: doğru cümle üstünde kullanıcı farkı: silinen (üstü çizili kırmızı), eklenen (yeşil), yer değiştiren (sarı ok). Ekran okuyucu için metin açıklaması.
- `AssessmentCard` (WP-12/30): halkalar + span vurguları + düzeltme + öneri; "bir daha dene".
- Animasyon: hareket azaltmada durağan; şerit yüksekliği sabit (dokunma bölgesini itmez — game-shell notu).

**Adımlar.** 1. Bileşenler (`src/components/feedback/*`) + hikâye sayfası `/demo-feedback` (demo-games deseni). 2. Entegrasyonlar (şerit, quiz, drill, çeviri, yazma). 3. Ekran görüntüleri.

**Süre.** 3 gün. **Bağımlılık.** WP-13.

---

## WP-62 · Ders oynatıcı akışı

**Amaç.** Ders adımlarının %73'ü "tekrar et"; mikrofon beklerken sessizlik; rol yapma yedeği; ders sonu → drill/ölçme köprüsü.

**Mevcut kod.** `lesson-player.tsx` (3 faz: anlatım, konuşma, özet; eller serbest; yazılı yedek; adım atlama), ders içerik şeması (WP-70/71).

**Tasarım.**
- Adım türleri: `repeat` payını %40'a çek, `produce` %35, yeni `transform` (WP-11 motoru: "şimdi aynı cümleyi 'siz' ile söyle"), `choose` (2 seçenekli hızlı karar), `truefalse` — içerik WP-71 ile.
- Mikrofon: 4 sn ses gelmezse otomatik "yazarak cevapla" alanı açılır (mikrofon açık kalır); eller serbest kapalıyken tek dokunuş.
- İlerleme çubuğu adım türü renkleriyle (tekrar/üret/dönüştür).
- Rol yapma: senaryo yedeği (WP-04), sınav modu düğmesi (WP-22).
- Özet: puan, kullanılan kalıplar, **"pekiştir: 5 soruluk drill"** (WP-11), can-do etiketi, sıradaki ders.

**Adımlar.** 1. Adım türleri UI. 2. Mikrofon zaman aşımı davranışı. 3. Özet köprüleri. 4. Ekran görüntüleri ve kısa kullanıcı testi (3 kişi).

**Süre.** 4 gün. **Bağımlılık.** WP-04, WP-11, WP-71.

---

## WP-63 · Beceri merkezi

**Amaç.** `/skills`'i "liste"den "yetkinlik panosu + sınav girişi"ne çevirmek.

**Tasarım.** Üstte beceri × seviye yetkinlik çubukları (WP-50) ve "önerilen sıradaki"; sekmeler: Okuma, Dinleme, Yazma, Konuşma, **Dilbilgisi** (drill'ler, WP-11), **Sınav** (seviye sınavı, haftalık, yerleştirme). Egzersiz kartında tür etiketi (mcq/dikte/serbest/monolog), süre, can-do, son puan. Filtre: yapılmamış / geliştir / tamam.

**Adımlar.** 1. Pano. 2. Sekmeler + kart. 3. Filtreler. 4. Görüntüler.

**Süre.** 3 gün. **Bağımlılık.** WP-01, WP-50, WP-41.

---

## WP-64 · Profil ve analitik sayfası

**Amaç.** Kelime metriklerinin yanına beceri, hata, gelişim, can-do; yazılar/konuşmalar arşivi.

**Tasarım.** Sıra: kimlik + seri → **Yetkinlik** (5 beceri × seviye) → **Zayıf noktaların** (WP-51) → **Gelişim** (WP-52) → **Yapabildiklerim** (WP-43) → Sınavlarım (WP-41/42, sertifikalar) → Rozetler → CEFR kelime kapsamı (mevcut) → Yazılarım → Ayarlar (mevcut). Grafikler `dataviz` becerisine göre.

**Adımlar.** 1. Bölüm sırası + veri kaynakları. 2. Grafikler. 3. Arşiv + silme. 4. Görüntüler.

**Süre.** 4 gün. **Bağımlılık.** WP-50, 51, 52, 43.

---

## WP-65 · Onboarding ve yerleştirme akışı

**Amaç.** İlk deneyim: kurs → hedef ("neden Almanca?": iş, günlük, sınav, İsviçre) → yerleştirme (isteğe bağlı) → ilk plan.

**Mevcut kod.** `course-onboarding.tsx`, `/setup`.

**Tasarım.** 4 ekran; her biri tek karar; ilerleme noktaları; Erdi rehber. Hedef seçimi görev ve içerik önerisini etkiler (`profiles.goal`). Yerleştirme WP-40; atlanırsa seviye seçimi mevcut. Son ekran: "Bugünkü planın hazır" (WP-60'a çıkış).

**Adımlar.** 1. Akış bileşenleri. 2. `profiles.goal` + migrasyon. 3. Görüntüler; 3 kişilik test.

**Süre.** 3 gün. **Bağımlılık.** WP-40, WP-60.

---

## WP-66 · Erdi koç sesi

**Amaç.** Maskot (3. nesil klipler, `mascot.tsx`, `mascot-fx.tsx`, sahne kilidi) yalnız kutlama değil, öğrenme anlarında da rol alsın — ama hata açıklaması metin olarak kalır.

**Tasarım.**
- Anlar: plan kartı (sabah selamı `wave`), sınav girişi (`think`), sınav sonucu (`celebrate`/`sad` + kısa Türkçe cümle), zayıf nokta çalışması bitince (`thumbsup`), haftalık özet (`peek` ile "bak ne oldu").
- Koç balonu: Erdi'nin yanında 1 cümlelik Türkçe metin (`coach-bubble.tsx`), 4 sn, hareket azaltmada yalnız metin.
- Tek Erdi kuralı (`mascot-stage.ts`) korunur; balon sahneyi almaz.

**Adımlar.** 1. `coach-bubble.tsx`. 2. Anlara bağlama (5 yer). 3. Metin listesi (`src/lib/coach-lines.ts`, 40 cümle, tekrar etmeyen seçim).

**Süre.** 2 gün. **Bağımlılık.** WP-60, WP-41, WP-52.

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

**Durum (2026-08-25).** Adım 1, 2, 5 bitti; 3–4 ertelendi (STATUS karar kaydı). `src/lib/plan.ts` `buildPlan`: (1) kelime turu — vadesi gelen sayı, `session_done` ile yapıldı; (2) sıradaki ders — `nextLesson`, bugün `lastAt` ile yapıldı; (3) seviyede en az çalışılan beceriden ilk yapılmamış egzersiz; (4) son 14 günün en sık hata tipi (≥5) → o tipin tek oyunlu turu (`/learn?game=…`), bugün ≥5 cevapla yapıldı. `GET /api/plan?day=`; `src/components/plan-card.tsx` (iskelet, tik, ~dk, "Başla: …" ilk bitmemiş öğe, `plan_start` olayı kind=öğe). Karşılama kartının hemen altında. e2e §34 (6 kontrol). Kanıt: `reports/shots/wp60-plan.png`.

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

**Durum (2026-08-25).** Bitti. `src/components/feedback/`: `feedback-line.tsx` (WP-13), `diff-text.tsx` (`CharDiff` harf farkı, `TokenDiff`/`TypedTokens` cümle farkı — eksik altı çizili, ↔ yer değiştirmiş, noktalı yazım, üstü çizili fazla; ekran okuyucu için düz metin `aria-label`; `DiffLegend`), `assessment-card.tsx` (WP-12). Şerit, çeviri turu ve serbest cümle aynı bileşenleri kullanıyor; `/demo-feedback` hikâye sayfası 10 hata tipini, harf/cümle farklarını, AI ve yedek değerlendirme kartlarını tek sayfada gösteriyor. Şerit yüksekliği korunuyor (gerekçe küçük yazı, sarar). Kanıt: `reports/shots/wp61-feedback.png`.

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

**Durum (2026-08-25).** Adım 2 ve 3 bitti, 1 kısmen (mevcut dört türün gösterimi; `transform`/`choose` WP-11 + WP-71 ile), 4'ün görüntüsü var, 3 kişilik test sahibinde. `lesson-player.tsx`: `TYPE_AFTER_MS` 4000 — kendiliğinden açılan mikrofona ses gelmezse `typing` açılır, mikrofon açık kalır (`heard` bayrağı `onresult`'ta); `LectureProgress` adım başına parça + tür lejantı (`STEP_TONE`/`STEP_LABEL`); özet: kalıp çipleri (`patternUsed`: kalıbın "…" öncesi gövdesi kullanıcı turlarında), "Yapabildiklerim" satırı, "Sıradaki ders" düğmesi. `lessons/[id]/page.tsx` `LessonExtras` (can-do metinleri `candoForLesson`→`candoById`, `nextLesson` aynı ders değilse). Kanıt: `reports/shots/wp62-lesson-progress.png`.

---

## WP-63 · Beceri merkezi

**Amaç.** `/skills`'i "liste"den "yetkinlik panosu + sınav girişi"ne çevirmek.

**Tasarım.** Üstte beceri × seviye yetkinlik çubukları (WP-50) ve "önerilen sıradaki"; sekmeler: Okuma, Dinleme, Yazma, Konuşma, **Dilbilgisi** (drill'ler, WP-11), **Sınav** (seviye sınavı, haftalık, yerleştirme). Egzersiz kartında tür etiketi (mcq/dikte/serbest/monolog), süre, can-do, son puan. Filtre: yapılmamış / geliştir / tamam.

**Adımlar.** 1. Pano. 2. Sekmeler + kart. 3. Filtreler. 4. Görüntüler.

**Süre.** 3 gün. **Bağımlılık.** WP-01, WP-50, WP-41.

**Durum (2026-08-25).** Adım 1–4 bitti. `src/app/(app)/skills/page.tsx` panoyu (`proficiencyFor`), sınav geçmişini (`examHistory` 5), haftalık durumu, son yerleştirmeyi ve egzersiz başına can-do metnini (`candoForExercise` → `candoById().tr`) ve `user_skills.last_score/attempts`'i sayfayla indiriyor; her bölüm ayrı denenir, okunamayan görünmez. `src/components/skills/skills-hub.tsx`: seviye çipleri → yetkinlik panosu (6 çubuk, "Önerilen sıradaki" yalnız çalışma seviyesinde) → sekmeler (Okuma/Dinleme/Yazma/Konuşma/Dilbilgisi/Sınav; varsayılan en zayıf beceri, oturumda hatırlanır) → süzgeç çipleri (Hepsi/Yapılmamış/Geliştir/Tamam, boş olan gizli) → kartlar (tür etiketi, dk, madde, can-do, "tamam/geliştir" rozeti, son % ve deneme sayısı). Kanıt: `reports/shots/wp63-hub-{default,grammar,exam}.png`.

---

## WP-64 · Profil ve analitik sayfası

**Amaç.** Kelime metriklerinin yanına beceri, hata, gelişim, can-do; yazılar/konuşmalar arşivi.

**Tasarım.** Sıra: kimlik + seri → **Yetkinlik** (5 beceri × seviye) → **Zayıf noktaların** (WP-51) → **Gelişim** (WP-52) → **Yapabildiklerim** (WP-43) → Sınavlarım (WP-41/42, sertifikalar) → Rozetler → CEFR kelime kapsamı (mevcut) → Yazılarım → Ayarlar (mevcut). Grafikler `dataviz` becerisine göre.

**Adımlar.** 1. Bölüm sırası + veri kaynakları. 2. Grafikler. 3. Arşiv + silme. 4. Görüntüler.

**Süre.** 4 gün. **Bağımlılık.** WP-50, 51, 52, 43.

**Durum (2026-08-25).** Adım 1–4 bitti. `src/app/(app)/profile/page.tsx` bölüm sırası: kimlik + seri (ProfileForm başlığı) → Yetkinlik → Zayıf noktaların → Gelişim → Yapabildiklerim → Sınavlarım (`src/components/exams-card.tsx`: son 8 seviye/modül sınavı, geçti/geçmedi, sertifika bağlantısı; son 8 haftalık kullanım puanı çubuk; seviye sınavı ve haftalık giriş bağlantıları) → Seviye testi → Rozetler → kelime kapsamı/ilerleme (ProgressView) → Yazılarım (silme) → Öğrenme/Uygulama/Hesap ayarları. Sınav verisi okunamazsa kart boş görünür, sayfa açılır. Kanıt: `reports/shots/wp64-profile-full.png`, `wp64-exams-card.png`.

---

## WP-65 · Onboarding ve yerleştirme akışı

**Amaç.** İlk deneyim: kurs → hedef ("neden Almanca?": iş, günlük, sınav, İsviçre) → yerleştirme (isteğe bağlı) → ilk plan.

**Mevcut kod.** `course-onboarding.tsx`, `/setup`.

**Tasarım.** 4 ekran; her biri tek karar; ilerleme noktaları; Erdi rehber. Hedef seçimi görev ve içerik önerisini etkiler (`profiles.goal`). Yerleştirme WP-40; atlanırsa seviye seçimi mevcut. Son ekran: "Bugünkü planın hazır" (WP-60'a çıkış).

**Adımlar.** 1. Akış bileşenleri. 2. `profiles.goal` + migrasyon. 3. Görüntüler; 3 kişilik test.

**Süre.** 3 gün. **Bağımlılık.** WP-40, WP-60.

**Durum (2026-08-25).** Adım 1–2 bitti, 3'ün görüntüleri var, 3 kişilik test proje sahibinde. `src/components/course-onboarding.tsx`: dört adım — (1) isim + kurs + ses, (2) "Neden Almanca?" iş/günlük/sınav/İsviçre, (3) "Seviyemi ölçelim" (profil A1 ile kaydedilir → `/placement`) ya da "Seviyemi biliyorum" (A1–C1 çipi, kısa açıklama), (4) "Bugünkü planın hazır, {isim}" → `/learn`. Başlıkta "Adım n / 4", ilerleme çubuğu, her adımda Erdi'nin bir cümlesi; Geri düğmesi. `profiles.goal` (migrasyon 0033, üretime uygulandı), `POST /api/profile` `goal` kabul ediyor; `nav` olayı kind `onboarding:<adım>`. Kanıt: `reports/shots/wp65-onboarding-{1..4}.png` (demo kullanıcının `course_chosen_at` alanı sıfırlanıp akış baştan yürütüldü; profil A2 · daily ile yazıldı).

---

## WP-66 · Erdi koç sesi

**Amaç.** Maskot (3. nesil klipler, `mascot.tsx`, `mascot-fx.tsx`, sahne kilidi) yalnız kutlama değil, öğrenme anlarında da rol alsın — ama hata açıklaması metin olarak kalır.

**Tasarım.**
- Anlar: plan kartı (sabah selamı `wave`), sınav girişi (`think`), sınav sonucu (`celebrate`/`sad` + kısa Türkçe cümle), zayıf nokta çalışması bitince (`thumbsup`), haftalık özet (`peek` ile "bak ne oldu").
- Koç balonu: Erdi'nin yanında 1 cümlelik Türkçe metin (`coach-bubble.tsx`), 4 sn, hareket azaltmada yalnız metin.
- Tek Erdi kuralı (`mascot-stage.ts`) korunur; balon sahneyi almaz.

**Adımlar.** 1. `coach-bubble.tsx`. 2. Anlara bağlama (5 yer). 3. Metin listesi (`src/lib/coach-lines.ts`, 40 cümle, tekrar etmeyen seçim).

**Süre.** 2 gün. **Bağımlılık.** WP-60, WP-41, WP-52.

**Durum (2026-08-25).** Adım 1–3 bitti. `src/components/coach-bubble.tsx` (`moment`, `mood`, `vars`, `hold` 4000, `tone` card/dark, `role=status`; balon kapanır, Erdi kalır; hareket azaltmada yalnız metin), `src/lib/coach-lines.ts` (8 an × 5 = 40 cümle; `pickCoachLine` cihazda son söylenenleri dışlar, `fillCoachLine` isim yoksa virgülüyle düşürür, `planMoment` saat → sabah/gün/akşam). Bağlanan anlar: plan kartı selamı (`wave`, ada göre), haftalık özet Pzt–Sal (`peek`, "bak ne oldu"), sınav girişi (`think`), sınav sonucu (`cheer`/`sad` + puan ve seviye), hedefli tur özeti (`thumbsup`/`sad`, `/learn?game=` ile açılan tur). `Mood`'a `peek` eklendi (klip `peek.webp`). Birim test `npm run test:coach-lines` (mevcut `test:coach` AI koç değerlendirmesiydi, ad çakışmasın diye). Kanıt: `reports/shots/wp66-coach-{plan,exam-intro,exam-result,targeted-start,weak-done}.png`.

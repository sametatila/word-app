# Faz 5 — Analitik ve profil

Rapor: profil yalnız kelime metrikleri; beceri yetkinliği, hata tipleri, zaman içinde gelişim yok.

---

## WP-50 · Beceri yetkinlik modeli

**Amaç.** Okuma/dinleme/yazma/konuşma/dilbilgisi için seviye bazlı yetkinlik tahmini; profilde çubuklar; sınav ve yerleştirme aynı modeli besler.

**Mevcut kod.** `userSkills` (WP-01), `assessments` (WP-03), `exams` (WP-41/42), `placements` (WP-40), `reviews` (hata tipi), `getProgress` (`src/lib/session.ts`).

**Tasarım.**
- Basit ve açıklanabilir model: beceri × seviye için **kanıt puanı** = son 30 gündeki puanlı öğelerin ağırlıklı ortalaması (sınav ×3, egzersiz ×1, AI değerlendirme ×2; zaman sönümü 30 gün). Yetkinlik: `< 40 başlangıç`, `40–69 gelişiyor`, `70–84 sağlam`, `≥ 85 ustalaştı`. Elo/IRT bilinçli olarak yok: veri az, açıklanabilirlik önemli.
- `src/lib/proficiency.ts` (saf, birim testli) + `GET /api/profile` içinde `proficiency: { reading: {A1: 82, A2: 55…}, … }`.
- "Sıradaki en iyi adım" önerisi: en düşük kanıtlı beceri × mevcut seviye → o beceriden yapılmamış egzersiz/drill (WP-60 kartı besler).

**Adımlar.** 1. Model + testler. 2. API. 3. Profil çubukları (WP-64). 4. Öneri motoru (`src/lib/next-step.ts`).

**Kabul.** Profilde 5 beceri × seviye çubuğu; bir sınav sonrası çubuk değişiyor; öneri kartı tıklanabilir.

**Süre.** 4 gün. **Bağımlılık.** WP-01, 03, 40–42.

**Durum (2026-08-25).** Bitti. `src/lib/proficiency.ts` (saf: `computeProficiency` ağırlıklı ortalama sınav ×3 / AI ×2 / egzersiz ×1, 30 gün doğrusal sönüm, `bandOf`, `weakestSkill`); `proficiency-data.ts` (`gatherEvidence` üç tablodan, `nextStep`: en düşük kanıtlı beceriden yapılmamış egzersiz → kelime turu / dilbilgisi → sıradaki ders, `proficiencyFor`); `GET /api/profile` (seviye + yetkinlik + sıradaki adım); profilde `ProficiencyCard` (seviye sekmeleri, 6 çubuk, bant, kanıt sayısı, "Sıradaki en iyi adım"); plan kartı 3. öğesi artık bu motordan. e2e §39 (10 kontrol). Kanıt: `reports/shots/wp50-proficiency.png`.

---

## WP-51 · Hata analitiği ve hedefli tekrar

**Amaç.** "Zayıf noktaların": hata tipi dağılımı, karıştırılan kelime çiftleri, zayıf kurallar; her birine tek dokunuşla hedefli drill; SRS ağırlığı hata tipine göre.

**Mevcut kod.** `reviews.error_type` (WP-02), `weakRules` (`lessons/progress.ts`), WP-11 drill'ler, `cheatProgress`.

**Tasarım.**
- Sorgular: son 30 gün hata tipi dağılımı; karıştırma çiftleri (`meaning` hatasında seçilen ↔ doğru); zayıf kurallar (drill + ders).
- Profil bölümü "Zayıf noktaların": ilk 3 hata tipi → "10 soruluk hedefli çalışma" (WP-11 drill motoru; artikel için kelime havuzundan artikel turu; kelime karıştırma için ikili karşılaştırma turu).
- SRS: `srs.ts` `schedule()`'a `errorWeight` (WP-02'de iskelet): hata tipi son 14 günde ≥ 5 kez ise o tipteki kelimelerin aralığı ×0.75.
- Bildirim: haftalık "bu hafta en çok artikel hatası yaptın — 5 dakikalık çalışma" (push, mevcut altyapı).

**Adımlar.** 1. Sorgular + API. 2. Profil bölümü + hedefli çalışma rotaları. 3. SRS ağırlığı (bayraklı, ölçülebilir). 4. Haftalık bildirim (cron).

**Kabul.** Artikel hatası biriktiren hesapta bölüm görünüyor ve 10 soruluk artikel çalışması başlıyor; SRS ağırlığı `report:learning`'de izleniyor.

**Süre.** 4 gün. **Bağımlılık.** WP-02, WP-11, WP-50.

---

## WP-52 · Gelişim raporu

**Amaç.** Zaman içinde gelişim: yazma/konuşma puanları, kullanım sınavı trendi, yetkinlik değişimi; haftalık özet.

**Tasarım.**
- Profil "Gelişim" bölümü: 8 haftalık çizgiler (yazma puanı, konuşma puanı, kullanım skoru), yetkinlik değişimi okları, kilometre taşları (ilk sınav, ilk can-do…). Grafikler `dataviz` becerisine göre (tek sistem, tema uyumlu).
- Haftalık özet bildirimi/kartı: "Bu hafta: 3 egzersiz, yazma 62→71, en çok hata: Dativ". `quest-card` deseninde `/learn` üstünde Pazartesi kartı (WP-60).
- "Yazılarım / konuşmalarım": `assessments` listesi, açınca metin + düzeltme; silme.

**Adımlar.** 1. Sorgular. 2. Grafik bileşenleri. 3. Haftalık özet üretimi (cron) + kart + push. 4. Yazılarım listesi.

**Kabul.** 3 haftalık veri olan hesapta trend çizgileri; Pazartesi özet kartı; yazılar listeleniyor ve silinebiliyor.

**Süre.** 4 gün. **Bağımlılık.** WP-30, WP-42, WP-50.

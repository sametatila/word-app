# Faz 7 — İçerik üretim hattı

Rapor: dersler A1/A2 100'er, B1 20, B2/C1 0; konuşma 24 egzersiz; okuma/dinleme yalnız çoktan seçmeli; gerekçe yok. Kod tarafındaki her paket içerik ister; içerik de kod gibi şemalı, doğrulanan ve gözden geçirilen bir hatla üretilmeli. Mevcut desen (`data/skills/SPEC.md`, `make-packets.mjs`, `check.mjs`, `apply-*.ts`) korunur ve genelleştirilir.

---

## WP-70 · İçerik şeması ve doğrulayıcı (tek hat)

**Amaç.** Her içerik türü için tek şema kaynağı, tek doğrulayıcı, tek üretim/uygulama akışı.

**Mevcut kod.** `src/lib/skills/types.ts`, `src/lib/lessons/types.ts`, `src/lib/cheatsheet/types.ts`, `data/skills/*`, `data/meanings/*`, `data/zurich/*`, `scripts/apply-*.ts`, `scripts/seed-skills.ts`.

**Tasarım.**
- `data/content/SPEC.md`: tür başına alanlar, dil kuralları (Türkçe sade açıklama; Almanca doğal; tek doğal karşılık ilkesi), seviye ölçütleri (kelime/yapı listeleri), can-do etiketi zorunlu, `why_tr` zorunlu (soru/drill), yasaklar (İngilizce açıklama yok, çeviri yerine örnek).
- Şema eklemeleri: `SkillQuestion.kind/why_tr`, `WritingTask` yeni türler (WP-31), `SpeakingMonologueExercise` (WP-21), `Lesson.roleplay.script` (WP-04), ders adımı `transform/choose` (WP-62), `Drill` (WP-11), `cando[]` (WP-43).
- `data/content/check.mjs`: tüm içerik dosyalarını yükler (TS → `tsx` ile), şema + iş kuralları (kimlik benzersiz, can-do var, seviye kelime havuzu dışına çıkan kelime uyarısı — `words` tablosuyla karşılaştırma, umlaut/ß tutarlılığı, Almanca cümle uzunluğu) → CI'da `npm run test:content`.
- Üretim akışı: `make-packets` → LLM (istem şablonu SPEC'ten) → `check` → insan gözden geçirme listesi (`data/content/review/*.md`, 5 maddede 1 örneklem) → `apply`.

**Adımlar.** 1. SPEC. 2. Şema alanları (tipler). 3. Doğrulayıcı + CI. 4. Paket/apply genelleştirme. 5. Mevcut içeriğin doğrulayıcıdan geçirilip uyarıların kapatılması.

**Kabul.** `npm run test:content` yeşil; yeni içerik türü eklemek yalnız SPEC + tip + doğrulayıcı kuralı gerektiriyor.

**Süre.** 4 gün. **Bağımlılık.** Yok (en başta).

**Durum (2026-08-25).** Adım 1–3 ve 5 bitti; adım 4 WP-71 pilotuna ertelendi (STATUS karar kaydı). `data/content/SPEC.md` (türler, yerler, dil kuralları, zorunlu alanlar/iş kuralları, üretim akışı); tip eklemeleri: `SkillQuestion.kind?`, `ExerciseBase.cando?`, `Lesson.cando?`, `LESSON_ICONS` çalışma zamanı listesi (`Lesson.roleplay.script` WP-04'te eklendi); `scripts/check-content.ts` → `npm run test:content`: 344 egzersiz, 220 ders, 60 sayfa; 0 hata, 2.227 uyarı etiket başına bütçede (`data/content/baseline.json`). `explain` alanı soru gerekçesi (`why_tr`) rolünü üstleniyor.

---

## WP-71 · Ders kapsamı: B1 100, B2 100, C1 60 + adım dengesi

**Amaç.** Ders yolu becerilerin gerisinde; B2/C1 yok. Ayrıca mevcut derslerde tekrar/üret dengesi.

**Tasarım.**
- Modül temaları `src/lib/lessons/modules.ts`'de var (B1–C1 için tamamla); ders başına: 10–14 adım (tekrar ≤ %40, üret ≥ %35, dönüştür ≥ %15), kelime 6–8 (havuzdan), rol yapma (AI istemi + senaryo yedeği), can-do, özet kalıpları, ilgili dilbilgisi tablosu.
- Üretim: modül başına paket → LLM → doğrulayıcı → gözden geçirme (her modülde 2 ders tam okuma) → apply. Mevcut 220 derse senaryo yedeği ve adım dengesi (yalnız ekleme: `transform` adımları).
- Sıra: B1 (20→100) → B2 (100) → C1 (60).

**Adımlar.** 1. B1 temaları + 10 pilot ders (kalite kalibrasyonu). 2. B1 kalanı. 3. Mevcut 220'ye senaryo + dönüştürme adımları. 4. B2. 5. C1.

**Kabul.** Her seviyede modül/ders sayısı hedefte; doğrulayıcı yeşil; her derste rol yapma senaryosu.

**Süre.** Sürekli; pilot 4 gün, B1 tamamı ~2 hafta içerik.

**Durum (2026-08-26).** Adım 1 (pilot) bitti: `src/lib/lessons/content/de-b1-b03.ts` — modül 3 "Bağlaç ustalığı" 10 ders (damit, um…zu, obwohl/trotzdem, als/wenn, nachdem, bevor/während, deshalb, je…desto, entweder…oder, anlatı). Kalıp: 14 adım — onay, bağlam, 4 kelime (tekrar), kalıp açıklaması, 1 örnek tekrarı, 4 üretim, 1 doğru/yanlış, geçiş; rol yapma 4–5 tur, açık istem (senaryo yedeği yok; `offline-roleplay` genel görevine düşer). Doğrulayıcı uyarısız. Kalan: B1 modül 4–10 (70 ders), B2 100, C1 60; mevcut derslere senaryo yedeği.

---

## WP-72 · Konuşma, yazma, okuma/dinleme içerik genişletme

**Hedefler.** Konuşma drill 24→60+, monolog 20, diyalog 7→25; yazma her seviyede yeni tür görevleri (reply/form/rewrite/summary); okuma/dinlemede her egzersize ≥ 2 üretim/gapfill sorusu + `why_tr`; dinleme için gerçek insan sesi kayıtları (öncelik B1+; TTS yedek) — `ListeningSegment.audio`.
**Yöntem.** WP-70 hattı; konuşma drilleri için `confusions` listesi Türkçe ses bilgisi uzmanı gözden geçirmesi; ses kayıtları için ana dil konuşuru (stüdyo değil, temiz oda).
**Kabul.** Doğrulayıcı yeşil; beceri merkezinde her seviyede her türden en az 4 egzersiz.
**Süre.** Sürekli (S4–S8).

**Durum (2026-08-26).** Telaffuz drill 10 → 50 (`speaking-2a.ts`, `speaking-2b.ts`: ü/ö/r/h/sch/ei/sayı/tonlama, eu/ng/pf/vurgu/schwa/ch/h-uzatma, -ig/chs/r-ünlüleşme/-tion/cümle vurgusu/v/st-ortada/ie-i, ä/kn/Glottisschlag/yabancı vurgu/ünsüz kümesi/-en/ts/ritim, Fransızca-Yunanca alıntılar/nazal/bileşik vurgu/ironi/Auslaut/kısaltmalar/heceleme/akıcılık); monolog 20 (`monologue.ts`); diyalog 7 → 25 (`dialogue-2.ts`, hepsi temalı); yazma: 40 egzersize `form/rewrite/reply/summary` (`writing-extra.ts`); okuma/dinleme: 224 egzersize 412 türetilmiş yazılı soru (`derived-questions.ts`, `npm run content:derive`). Kalan: 51 egzersizde ikinci yazılı soru (türetilemedi, elle), gerçek ses kayıtları (`segments[].audio`).

---

## WP-73 · Gerekçe ve kural parçacıkları

**Amaç.** WP-13 "neden" satırları ve WP-11 drill'leri için kural bilgisi: her dilbilgisi tablosuna kısa Türkçe kural parçacıkları, istisnalar, örnekler; her artikel/çoğul kalıbına kural; sık karıştırılan kelime çiftlerine ayrım cümlesi.

**Tasarım.** `src/lib/cheatsheet/rules.ts`: `{ id, tableId?, trigger: {errorType, pattern}, why_tr, example_de, link }`; `why.ts` (WP-13) bunlardan seçer. Drill maddeleri (`drills.ts`) her tabloya 10–15. Karıştırma çiftleri `data/content/confusables.json` (500 çift; LLM + kelime havuzu benzerliğinden aday üretimi + gözden geçirme).

**Adımlar.** 1. Kural şeması + 30 kural (A1/A2). 2. 5 tablo drill (WP-11 pilotu). 3. Kalan tablolar (60). 4. Karıştırma çiftleri.

**Kabul.** Her hata tipi için en az bir gerekçe üretiliyor; 60 tablonun hepsinde drill; doğrulayıcı yeşil.

**Süre.** Pilot 3 gün; tamamı ~2 hafta içerik.

**Durum (2026-08-26, güncel).** Adım 1 (35 kural), 2 (5 tablo), 3 kısmen (A1 15 + A2 13 tablo = 28/60, 336 drill; `drills-a1.ts`, `drills-a2.ts`, şema `drill-schema.ts`), 4 (150 elle çift `src/lib/confusables.ts`, `why.ts` anlam hatasında ayrım cümlesi; 1 458 aday `data/content/confusables.json`). Kalan: B1 15, B2 ≈10, C1 ≈7 tablo drill'i.

**Durum (2026-08-26).** Adım 1 ve 2 bitti. `src/lib/cheatsheet/rules.ts`: `Rule {id, level, trigger {errorType, pattern?}, why, example, link}`; 35 kural — hâl 8 (Dativ/Akkusativ edatları, yer edatları, Dativ fiiller, eril Akkusativ, Dativ çoğul -n, zamir hâli, genel), çekim 10 (Perfekt yardımcı, sein, haben, modal, Partizip II, ayrılabilen, kök değişimi, Präteritum, emir, genel), fiil yeri 7, kelime sırası 4, diğer tiplere genel. `ruleFor`, `ruleById`, `uncoveredErrorTypes`. `why.ts`: `whyFromRule` + `contextOf` (doğru cümle + yazılan + kelime). Test `scripts/test-rules.ts` (`npm run test:rules`: ≥30, her tipte genel kural, tekil kimlik, bağlantılar var, 19 bağlam → kural, 4 why.ts bağı). Adım 2 (5 tablo × 12 drill) WP-11'de. Kalan: 55 tablo drill (adım 3), karıştırma çiftleri `data/content/confusables.json` (adım 4) — LLM aday üretimi + gözden geçirme, sahibin onayıyla.

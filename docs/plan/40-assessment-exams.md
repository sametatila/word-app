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

**Durum (2026-08-25).** Adım 1, 2, 4, 5 bitti; adım 3 kural tabanlı (STATUS karar kaydı). `src/lib/cando.ts`: 121 ifade (5 seviye × RD/LS/WR/SPK/GR, Türkçe "…yapabilirim", CEFR-CV/Profile Deutsch kaynağı, kalıcı kimlik `A1.SPK.1`). `cando-map.ts`: `candoForLesson` (simge teması × seviye → SPK; focusId → GR), `candoForExercise` (beceri × seviye × tür). Doğrulayıcı: bilinmeyen kimlik ve etiketsiz içerik hata (bugün 0). `cando-progress.ts` `candoSummary` (kanıtlı ≥2, gelişiyor 1) + `GET /api/cando`; profilde `CandoCard` (seviye sekmeleri, beceri başına ifadeler, kanıt sayacı). e2e §36 (8 kontrol). Kanıt: `reports/shots/wp43-cando.png`.

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

**Durum (2026-08-25).** Adım 1–3 bitti; 4 (onboarding) WP-65'e, 5 (kalibrasyon) proje sahibine. `src/lib/placement-score.ts` (saf: `nextLevel` %75 uyarlaması, `estimateStage` sınanmayan seviyeyi atlar, `scorePlacement` alt medyan, `describePerSkill`); `src/lib/placement.ts` (`buildPlacement`: seviye başına 6 kelime rank'tan + 3 dilbilgisi hücresi, A2/B1 okuma ve dinleme egzersizleri; `finishPlacement` → `placements` + `placement_finish` olayı; `acceptPlacement` profil seviyesi; `lastPlacement`; 30 günde bir). `POST/GET /api/placement`; `/placement` sayfası (`placement-test.tsx`: dört aşama, "Bilmiyorum", aşama atlama, sonuç ekranı "kabul et / değiştir"); profilde `PlacementCard`. Migrasyon `0031_placements.sql` üretime uygulandı. e2e §37 (10 kontrol). Tarayıcıda uçtan uca (tümü "Bilmiyorum") ~1 dk: `reports/shots/wp40-placement-{intro,vocab,stage,result}.png`.

**Süre.** 7 gün. **Bağımlılık.** WP-11 (drill maddeleri), WP-03, WP-20 (isteğe bağlı aşamalar), WP-43.

---

## WP-41 · Seviye ve modül sınavı v2

**Amaç.** Modül patron turu "hız turu" olarak kalır; ayrıca **gerçek sınav**: dört beceri + dilbilgisi, üretim ağırlıklı, zamanlı, geçme eşiği, sertifika.

**Mevcut kod.** `src/lib/lessons/boss.ts` (`BOSS_*`, `moduleClears`), `src/components/boss-player.tsx`, `/lessons/boss/[level]/[module]`, `/api/boss`.

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
- Erişim: `/lessons/boss/[level]/[module]` mevcut → "Hız turu" ve "Sınav" sekmeleri; `/skills` ve `/learn`'de "Seviye sınavı" kartı (WP-60/63).

**Adımlar.** 1. Sınav kurucu (`src/lib/exam.ts`: bölüm madde seçimi, kullanılmamış madde tercihi, tohumlu rastgelelik). 2. `exam-player.tsx` (bölüm geçişleri, zamanlayıcı, kayıt/devam). 3. Değerlendirme (nesnel + WP-03/20 çağrıları) ve sonuç ekranı. 4. Sertifika. 5. Rozet/quest bağları. 6. e2e: sınav kurulumu deterministik.

**Kabul.** A1 seviye sınavı 45 dk içinde 6 bölümüyle tamamlanıyor; bölüm puanları ve sertifika üretiliyor; geçme kuralı uygulanıyor.

**Süre.** 8 gün. **Bağımlılık.** WP-10, 11, 30, 20, 22, 43, 02.

**Durum (2026-08-25).** Adım 1–4 bitti (konuşma bölümü ve rozetler hariç — STATUS karar kaydı). `src/lib/exam.ts`: `buildExam` (modül 6/6/1/1/1, seviye 12/12/2/2/1; kelime = modül/seviye kelimelerinden çeviri+yazma, dilbilgisi = tablo hücreleri, okuma/dinleme = kullanılmamış egzersiz önce, yazma = serbest görev; tohum kullanıcı+sınav+hafta; modül ön koşulu %80 ders → değilse `trial`), `scoreSections` (toplam ≥70 ve her bölüm ≥50), `finishExam` (`exams`, `exam_finish` kind `level:A1`/`module:A1`), `examHistory/examById`; `POST/GET /api/exam` (kelime cevapları SRS'e de gider); `/exam/[level]` (45 dk) ve `/exam/[level]/[module]` (20 dk) → `exam-player.tsx` (tek zamanlayıcı, süre dolunca gönderir, bölüm puanları, sertifika düğmesi); `/api/certificate/[id]` SVG; hız turu sayfasından ve profil seviye kartından bağlantı. e2e §42 (12 kontrol). Tarayıcıda uçtan uca modül sınavı: `reports/shots/wp41-exam-{intro,vocab,grammar,writing,result}.png`.

---

## WP-42 · Haftalık kullanım sınavı

**Amaç.** "Öğrendiğini kullanabiliyor musun?" — kullanıcının kendi pekişmiş kelimelerinden, yalnız üretim oyunlarıyla, haftalık 15 soruluk kısa sınav; sonucu tekrar planından ayrı bir metrik.

**Mevcut kod.** `src/lib/session.ts` (pekişmiş bant: `intervalDays ≥ 21`; tek oyun dolgusu), `quests.ts`, `daily-player.tsx` (tek hak, tablo deseni).

**Tasarım.**
- Kurulum: haftada bir (Pazartesi), kullanıcının pekişmiş kelimelerinden 15 (rastgele, son 4 haftada sınanmamış), oyunlar: Çevir (5), Yazarak Hatırla (4), Cümleyi Tamamla-yazarak (3), Serbest cümle (2, AI), Sesli Söyle (1, WP-20; yoksa yazma).
- Sonuç: "kullanım skoru" (0–100), kelime başına doğru/yanlış; yanlışlar SRS'te kalite 2 ile geri gelir (pekişmişten düşer — dürüst ölçüm).
- Kayıt: `exams` (kind: weekly). Profilde haftalık trend (WP-52). Görev kartında "Haftanın sınavı" (quest).
- Pekişmiş kelimesi < 30 olan kullanıcıda: "öğreniliyor" bandından 15 kelime, etiket "kısa kontrol".

**Adımlar.** 1. Kurucu + rota `/learn/weekly`. 2. Oynatıcı (session-player alt akışı; tek hak, ipuçsuz). 3. Sonuç + SRS geri yazımı + kayıt. 4. Quest + bildirim. 5. KPI: kullanım skoru.

**Kabul.** Pazartesi kart görünüyor; 15 soru; sonuç ve trend; yanlış kelimeler tekrar kuyruğuna dönüyor.

**Süre.** 4 gün. **Bağımlılık.** WP-10, WP-14, WP-02.

**Durum (2026-08-25).** Adım 1–3, 5 bitti; 4 (quest + bildirim) ertelendi. `src/lib/weekly.ts`: `buildWeeklyExam` (pekişmiş ≥21 gün, son 4 haftada sınanmamış, 15 kelime; oyunlar çeviri 5 / yazma 4 / yazarak tamamla 3 / serbest cümle 2 (AI varsa) / yazma 1; pekişmiş < 30 → öğreniliyor bandı, "kısa kontrol"), `finishWeekly` (yanlış → kalite 2, `exams` satırı, `exam_finish` kind `usage:<seviye>`, tek hak), `weeklyStatus`, `weeklyHistory`; `GET/POST /api/weekly`; `/learn/weekly` (`weekly-player.tsx`: tek hak, ipuçsuz, sonuçta yanlış kelimeler); plan kartına "Haftanın kullanım sınavı" öğesi (≥15 çalışılmış kelime). Migrasyon `0032_exams.sql` üretime uygulandı. KPI 3 (`report:learning`) bu olaydan okuyor. e2e §38 (11 kontrol). Kanıt: `reports/shots/wp42-weekly.png`.

## Ek (2026-08-26): modül sınavı v3 — modülün kendi sınavı

**Sorun.** v2 kâğıdında modül yalnızca KELİME bölümünü belirliyordu; dilbilgisi seviye tablolarından, okuma/dinleme seviye beceri bankasından, yazma ve konuşma yine seviyeden geliyordu. "A1 Modül 3 · Yeme-içme" sınavında tren garı metni ve Perfekt sorusu çıkabiliyordu. Dersler ise konuşma üzerine kurulu: her ders bir kalıp öğretiyor, Türkçe cümleyi Almanca kurduruyor, bozuk cümle hakkında hüküm verdiriyor. Sınav bunların hiçbirini ölçmüyordu.

**Yapılanlar.**
- `src/lib/lessons/module-content.ts` (saf): modülün on dersinden üretim adımları (`produce` → Türkçe yönerge + Almanca hedef; yönerge çerçeve cümlelerinden ve ders ipuçlarından arındırılıyor, cevabı ele veren madde `selfAnswering` ile düşüyor), hüküm cümleleri (`truefalse` + gerekçe), kalıplar, kelimeler, sahneler; `FOCUS_SHEETS` ders odağı → cheatsheet sayfası köprüsü (65 odak).
- `src/lib/lessons/module-exam/` (elle yazılı, 23 modül): kâğıdın kapağı (kod, Almanca/Türkçe ad, ölçülen yapılar), **yapabilirlik listesi** (de/tr/en, 4–5 satır), modül sahnesinde geçen **dinleme diyaloğu** (4–8 replik + 3 soru), modül dünyasından **okuma metni** (+2 soru), modül durumunda **konuşma cümleleri** (2), modül temalı **yazma görevi** (kontrol listesi, kalıplar, örnek cevap).
- Kâğıt (`lib/exam.ts` v3, 25 dk): Wortschatz 6 · Grammatik 6 (3 tablo hücresi + 3 ders hükmü) · **Satzbau 5** (yeni bölüm: 3 yazma + 2 dizme, derslerin üretim adımlarından) · Lesen 2 · Hören 3 · Sprechen 2 · Schreiben 1.
- **Bölüm ağırlığı** (`SECTION_WEIGHT`): madde sayısı yerine ağırlık. Modülde Wortschatz 12 · Grammatik 18 · Satzbau 25 · Lesen 8 · Hören 12 · Sprechen 15 · Schreiben 10; üretim bölümleri toplam %50. (Eskiden yazma bölümü 24 maddenin 1'iydi, yani kâğıdın %4'ü.) Kâğıtta bulunmayan bölüm payını bırakır, kalanlar %100'e ölçeklenir.
- Şıklar tohumlu karıştırılıyor (`shuffleQuestion`): elle yazarken doğru şıkkın hep aynı sıraya düşmesi kullanıcıya ulaşmıyor. Tablo hücrelerinde çeldiriciler artık cevaptan VE birbirinden farklı (aynı biçim iki satırda geçebiliyordu; v2'de aynı şık iki kez basılıyordu).
- Oynatıcı: kapak (ne ölçülüyor, kaç bölüm, kural) → bölüm arası kartı (Teil n/N · Satzbau) → maddeler (geri dönüş, ipucu, anında geri bildirim yok) → sonuç. Sonuçta bölüm yüzdeleri **ağırlığıyla**, "artık şunları yapabiliyorsun" listesi (de/tr/en) ve **kaçırılan maddelerin dökümü** (doğru cevap, senin cevabın, ders hükmünün gerekçesi, cümle farkı). İpucu düğmeleri sınavda gizli (`components/games/no-hints.tsx` bağlamı; dört oyun okuyor).
- Sertifika: kod + Almanca modül adı + bölüm yüzdeleri + "DAS KANN ICH JETZT" listesi.
- Yol haritası: modülün çıkış düğümü artık **sınava** gidiyor (taç ve %puan sınavdan), hız turu altındaki ikincil satır.
- Doğrulayıcılar: `npm run test:exams` (23 modülün planı, madde bütçesi, odak haritası, soru gövdeleri) ve `npm run test:exam-build` (veritabanısız kuru prova: 23 kâğıt kurulur, bölüm sayıları, dizinler, aidiyet, ağırlık toplamı, tam doğru %100 / boş %0). e2e §42 v3'e göre yenilendi.

**Kanıt.** `reports/shots/wp41v3-exam-{kapak,grammatik,satzbau,hoeren,sonuc,dokum}.png` — demo sunucuda A1.3 kâğıdı uçtan uca oynandı (7 bölüm, sonuç ve döküm dahil).

**Kapsam (2026-08-26 akşamı).** B1 modül 4–10 üretilince kâğıtları da yazıldı: kurs artık A1 10 + A2 10 + B1 10 = **30 modülün hepsinde** yedi bölümlük bir modül geçiş sınavı taşıyor (`test:exam-build` otuzunu da veritabanısız kuruyor). Açık kalan yalnızca B2/C1: ders içeriği üretilince plan dosyalarına eklenecek, `test:exams` plansız modülü hata sayıyor.

## Ek (2026-08-26): konuşma bölümü

WP-41 kâğıdına `speaking` bölümü eklendi: seviyenin ses çalışması cümlelerinden modül sınavında 2, seviye sınavında 3 madde (egzersiz başına en çok bir cümle, tohumlu). Puan `/api/pronounce` kelime düzeyi telaffuz puanı (WP-20); bölüm puanı maddelerin ortalaması, `scoreSections` yazma gibi rubrik olarak işler; bölüm eşiği %50 geçerli. STT sağlayıcısı yoksa bölüm kâğıtta yer almaz (yazma bölümüyle aynı ilke). Teknik arıza iki denemede sürerse madde 0 sayılır, sınav durmaz. Sertifika bölüm etiketi "Konuşma".

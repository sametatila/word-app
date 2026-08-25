# Faz 1 — Üretim odaklı alıştırma

Raporun ana bulgusu: 12 oyunun 7'si tanıma; cümle kurma yalnız parça dizme; kullanıcının kendi cümlesini kurup düzeltme aldığı yer yok. Bu faz her tanıma noktasına bir üretim eşi koyar ve geri bildirime "neden"i ekler.

---

## WP-10 · Çeviri oyunu — "Çevir" (TR → DE yazılı cümle)

**Amaç.** Kelime turuna gerçek cümle üretimi: Türkçe cümle verilir, Almancası yazılır. Kelimenin örnek cümlesi (`words.example`, Türkçe çevirisi var) kaynak.

**Etkilediği puan.** Cümle kurma içerik/pedagoji/geri bildirim; kelime turu pedagoji.

**Mevcut kod.** `src/lib/types.ts` (`Round`, `PLAYABLE_GAMES`, `GAME_LABELS`), `src/lib/session.ts` (`composeRounds`, `makeRound`, oyun seçimi ve `MIN_MATURE`), `src/components/games/typing-game.tsx` (toleranslı eşleştirme: `alternatives`, eş anlamlılar; umlaut tuşları), `src/components/games/game-shell.tsx`, `src/components/game-switch.tsx`, `src/components/games/order-game.tsx` (cümle kaynağı mantığı).

**Tasarım.**
- Yeni oyun `translate`: `Round { game: "translate", word, sentence: {tr, de, en}, tokens }`. Kelime "solid/strong" ise ve örnek cümle 4–12 kelimeyse kurulur.
- Eşleştirme üç katman: (1) normalize (büyük/küçük, noktalama, ß/ss, umlaut sadeleştirme uyarısı), (2) kelime dizisi karşılaştırma → **fark vurgusu** (eksik/fazla/yanlış kelime, yanlış sıra), (3) kabul edilebilir varyantlar: `alternatives` içerikten + WP-03 `assess(kind:"sentence")` ile "anlamca doğru, biçimce farklı" onayı (sağlayıcı varsa; yoksa yalnız 1–2).
- Puanlama SRS'e: tam doğru = kalite 5; küçük yazım = 4; sıra hatası = 3 (`word_order`/`verb_position` hata tipi); anlam hatası = 1.
- Geri bildirim şeridi (WP-13 bileşeni): doğru cümle, vurgulu fark, tek satır "neden" (örn. "Yan cümlede fiil sona gider").
- İpucu: ilk kelime, kelime sayısı, üç dilli örnek gizli (dokununca açılır, kalite 3'e düşer).

**Adımlar.**
1. Tip ve `GAME_LABELS` ("Çevir"); `composeRounds`'ta seçim kuralı (olgun kelime, cümle uzunluğu); tek oyun modunda seçilebilir.
2. `translate-game.tsx`: giriş, umlaut tuşları, ipucu, kontrol; `useRoundExit`.
3. Eşleştirme kütüphanesi `src/lib/sentence-match.ts` (saf fonksiyon, birim testli: `scripts/test-sentence-match.ts`).
4. Fark vurgusu bileşeni (WP-13 ile ortak).
5. AI onayı (isteğe bağlı, WP-03).
6. `submitAnswers` kalite eşlemesi; hata tipi.
7. `/demo-games` sayfasına ekle; profil "Oyun performansı"na satır.

**Kabul.** 20 turluk oturumda olgun kelimelerde çeviri turu çıkıyor; yanlış sırada yazılan cümlede hangi kelimenin yer değiştirdiği vurgulanıyor; `reviews.error_type` doluyor; test betiği geçiyor.

**Süre.** 5 gün. **Bağımlılık.** WP-02, (isteğe bağlı) WP-03.

---

## WP-11 · Dönüştürme drilleri (dilbilgisi tablolarına bağlı)

**Amaç.** Dilbilgisi sayfası (60 tablo) okunuyor, uygulanmıyor. Her tabloya hedefli, yazılı üretim drilleri: Präsens → Perfekt, ana cümle → yan cümle (weil/dass), olumlu → olumsuz, Nominativ → Akkusativ/Dativ, tekil → çoğul, Sie → du.

**Mevcut kod.** `src/lib/cheatsheet/*` (tablolar `de-a1..b2.ts`, `types.ts`, `items.ts`, `quiz.ts` — mevcut "sütun gizleme" çalışması), `src/components/cheatsheet/cheatsheet-view.tsx`, `cheat-quiz.tsx`, `/api/cheat` (ilerleme), `cheatProgress` tablosu.

**Tasarım.**
- İçerik şeması `src/lib/cheatsheet/drills.ts`: `{ id, tableId, level, kind: "transform"|"fill"|"reorder"|"translate", prompt: {de?, tr}, answer, alternatives?, errorType, why_tr }`. Her tabloya 10–15 madde (WP-73 üretir; bu WP 5 tabloyla başlar).
- UI: tablo başlığında "Çalış (12)" düğmesi → drill oynatıcı (`drill-player.tsx`): yazılı giriş, WP-10 eşleştirme kütüphanesi, fark vurgusu, "neden" satırı, tablo satırına geri bağlantı.
- İlerleme: `cheatProgress`'e drill sonuçları (tablo başına doğruluk), zayıf kural = `weakRules` (lessons/progress) ile birleşik → WP-51 "zayıf noktaların".
- Dersle bağ: ders özetinde ilgili tablonun drilline "5 soru çöz" bağlantısı (WP-62).
- Kelime turuna sızma: WP-14 merdiveninde `transform` turu olarak (olgun kelimelerle, tablo hedefli) günde en çok 2.

**Adımlar.**
1. Şema + doğrulayıcı (`data/cheatsheet/check.mjs`: cevap tabloda geçen biçimi içeriyor mu, hata tipi geçerli mi).
2. 5 tablo × 12 madde içerik (A1: artikel/hal, Perfekt, kişi zamirleri; A2: weil/dass, Dativ edatları).
3. `drill-player.tsx` + rota `/cheatsheet/[table]/drill`.
4. İlerleme kaydı + tablo kartında doğruluk rozeti.
5. Ders özeti bağlantısı.

**Kabul.** Bir tablo için 12 maddelik drill baştan sona oynanıyor; yanlışlarda fark + neden; ilerleme kalıcı; içerik doğrulayıcı CI'da (`npm run test:cheat`).

**Süre.** 5 gün (+ içerik). **Bağımlılık.** WP-02, WP-10 (eşleştirme kütüphanesi), WP-73 (içerik ölçekleme).

---

## WP-12 · Serbest cümle görevi ("bu üç kelimeyle cümle kur")

**Amaç.** Gerçek üretim: verilen 2–3 kelimeyle (biri hedef kelime, biri tetik kalıp) özgün cümle; AI rubrik + hata vurgusu + düzeltilmiş sürüm.

**Mevcut kod.** WP-03 servisi; `writing-player.tsx` serbest görev UI'ı (textarea, umlaut, kalıp çipleri); `session.ts` olgun kelime seçimi.

**Tasarım.**
- Kelime turunda tur tipi `free_sentence` (kelime "strong" ve günde en çok 2; WP-14). Beceri tarafında yazma egzersizlerine 4. görev türü olarak (`kind: "sentence"`).
- UI: hedef kelimeler çip olarak, textarea, "Değerlendir" → WP-03 sonucu: puan halkaları (görev/dilbilgisi/kelime), span vurgulu hatalar, "düzeltilmiş" kart, "neden" satırları, "Örnek cümle" (kelimenin gerçek örneği).
- Sağlayıcı yoksa: kural tabanlı asgari (hedef kelimeler geçiyor mu, fiil var mı, uzunluk) + "AI değerlendirmesi kapalı".
- SRS: overall ≥ 70 → kalite 4/5; 40–69 → 3; altı → 2; hata tipleri kaydedilir.
- Kayıt: `assessments`.

**Adımlar.**
1. Tur tipi + seçim kuralı; `free-sentence-game.tsx`.
2. Değerlendirme sonucu bileşeni (`assessment-card.tsx`; WP-30 ile ortak).
3. Yazma egzersizi görev türü.
4. Yedek değerlendirme.
5. Olay + kota gözlemi (`report:learning`).

**Kabul.** Sağlayıcı açıkken 3 kelimelik cümleye 10 sn içinde puanlı, vurgulu geri bildirim; kapalıyken yedek metin; hata tipleri `reviews`/`assessments`'ta.

**Süre.** 4 gün. **Bağımlılık.** WP-03, WP-13 (bileşen).

---

## WP-13 · "Neden" geri bildirimi (şerit ve soru geri bildirimleri)

**Amaç.** Geri bildirim "ne" diyor, "neden" demiyor. Her yanlışta tek satır gerekçe + dilbilgisi bağlantısı + hata etiketi.

**Mevcut kod.** `src/components/games/game-shell.tsx` (`VerdictBar`), oyunların `feedback` prop'u, `src/components/skills/quiz.tsx` (okuma/dinleme soruları), `src/components/lessons/lesson-player.tsx` (produce/repeat sonucu), `src/lib/german.ts` (artikel/çoğul kuralları var mı — incele).

**Tasarım.**
- `src/lib/why.ts`: hata tipi + kelime/veri → Türkçe tek cümle gerekçe üreten saf fonksiyonlar:
  - `article`: son ek kuralları (-ung/-heit/-keit → die; -chen/-lein → das; -er meslek → der…), istisna ise "istisna, ezberle" + kelimenin kendi artikel notu (varsa `words.note`).
  - `plural`: kalıp (-e, -er, umlaut, -n/-en, -s) + kural.
  - `case`/`verb_position`/`word_order`: kalıp adı + tablo bağlantısı.
  - `meaning`: yanlış seçilen kelimenin anlamı ("Konsum = tüketim; karıştırma") — karıştırma çifti kaydı.
  - `spelling`: fark vurgusu (harf düzeyinde).
- `FeedbackLine` bileşeni: gerekçe metni, `[Kural ↗]` bağlantısı (`/cheatsheet?item=…`), hata etiketi (renk + simge), "Anladım" yok — otomatik ilerleme korunur; şeritte yer darsa 2. satır.
- Okuma/dinleme sorularına içerikte `why_tr` alanı (WP-70 şeması; olmayanlarda gösterilmez).
- Ders adımlarında `produce` yanlışında beklenen kalıp + neden.
- Ölçüm: `feedback_why_opened`.

**Adımlar.**
1. `why.ts` + birim testleri (50 kelimelik örneklem).
2. `FeedbackLine` + `VerdictBar` entegrasyonu (şerit yüksekliği korunur; taşarsa gerekçe küçük yazı).
3. Soru geri bildirimi (`quiz.tsx`) `why_tr` gösterimi.
4. Ders `produce` geri bildirimi.
5. Cheatsheet derin bağlantı (`?item=`) ve vurgulu açılış.

**Kabul.** Artikel yanlışında kural cümlesi; çoğul yanlışında kalıp; okuma sorusunda (içerik varsa) gerekçe; bağlantı ilgili tabloyu açıp vurguluyor.

**Süre.** 4 gün. **Bağımlılık.** WP-02.

**Durum (2026-08-25).** Bitti. `src/lib/why.ts` (`whyFor`: artikel son ek kuralları hep/genelde/istisna, çoğul kalıbı, harf farkı `charDiff` + Türkçe ses ipuçları, fiil konumu ana/yan/soru cümlesi, hâl/çekim/anlam/dinleme/telaffuz metinleri; her tip cheatsheet bağlantısı), `src/components/feedback/feedback-line.tsx` (etiket + gerekçe + "Kural ↗" → `feedback_why_opened`), `GameShell.why` → şeridin ikinci satırı (yalnız yanlışta), 9 oyun bağlı; `/cheatsheet#<sheetId>` derin bağlantı (seviye geçişi, kart açık, kaydırma, çerçeve vurgusu). `npm run test:why` (50 isim + çoğul/yazım/sıra, 80 kontrol) yeşil. Adım 3/4 mevcut mekanizmalarla karşılandı (STATUS karar kaydı). Kanıt: `reports/shots/wp13-why-{artikel,plural,typing}.png`, `wp13-cheat-link.png`.

---

## WP-14 · Oyun merdiveni: tanıma → üretim

**Amaç.** Üretim oyunları oturmuş kelimelere açık (`MIN_MATURE`), yani başlangıçta haftalarca yalnız şık seçiliyor. Kelime gücüne göre kademeli merdiven: fresh → tanıma; learning → kolay üretim (ipuçlu yazma, harf bulmacası, cloze yazarak); solid → çeviri/dönüştürme; strong → serbest cümle.

**Mevcut kod.** `src/lib/session.ts` (`wordStrength`, `pickGame`/oyun seçimi, `bias`, `MIN_MATURE`), `src/lib/srs.ts`.

**Tasarım.**
- Merdiven tablosu (`src/lib/ladder.ts`): güç × izin verilen oyunlar × ağırlık. Günlük üretim payı hedefi: tüm cevapların ≥ %40'ı üretim (KPI).
- Cloze'a "yazarak" varyantı (şık yerine giriş; ipuçlu) — mevcut `cloze-game`'e `mode: "type"`.
- Yeni kelime akışı: tanıtım → tanıma → **aynı oturumda** ipuçlu yazma (ilk harf + uzunluk) — üretime erken dokunuş.
- Zorluk uyarlama: kullanıcı üretimde art arda 3 yanlış → o oturumda merdiven bir basamak iner (oturum içi, kalıcı değil).
- A/B için bayrak: `profiles.flags.ladder = "v2"` (ölçüm karşılaştırması).

**Adımlar.**
1. `ladder.ts` + `composeRounds` entegrasyonu; cloze yazma modu.
2. Yeni kelime akışına ipuçlu yazma.
3. Oturum içi uyarlama.
4. KPI: üretim oranı raporu.

**Kabul.** 20 turluk karışık oturumda üretim oranı ≥ %40; yeni kelime aynı oturumda bir kez yazılıyor; test betiği (`scripts/playtest.mjs`) tamamlanma oranı düşmüyor.

**Süre.** 4 gün. **Bağımlılık.** WP-10, WP-02.

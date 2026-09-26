# Web paritesi — arşiv notu

Web (`src/`) ile mobil (`mobile/`) arasındaki envanter ve ölçü ölçü karşılaştırma
bitti; ayrıntılı kayıt arşivde.

Tam metin: `git show fc5c6973:docs/plan/web-parity.md`; kodda geçen '§11.x' numaraları
o sürüme göredir (§6, §7, §8, "Şerit T" gibi başlıklar da).

## Yöntem

- Referans mobil: Android genelde ileride, fark bulununca web ona çekilir.
  Beceri kütüphanesinde yön ters (aşağıda); orada kural körlemesine uygulanmaz.
- Tahmin yok: iki tarafın kaynağı yan yana okunur, fark ölçülür, düzeltilir.
- Kalıcı fark ya kapıya bağlanır (`scripts/parity-check.mjs`, `scripts/i18n-check.mjs`,
  `scripts/palette-check.mjs`, `scripts/check-colors.mjs`, `scripts/check-endpoints.mjs`)
  ya da gerekçesiyle kodda yazılır.
- Kapıyı yazan onu bozarak da dener: kusur geri konunca kapı kırmızı yanmalı.

## T-KARAR-1 — dolu turuncu üstünde beyaz yazı (sahibin kararı)

Marka rengi iki platformda da `#f87612`, dolu butonun yazısı beyaz. Kontrast
**2.77**, AA eşiğinin (4.5) altında. Bilerek seçildi: iki uygulamanın aynı
görünmesi bu tek eşleşmedeki kontrastın önüne geçti.

| Reddedilen seçenek | Kontrast | Neden |
|---|---|---|
| zemin `#f87612`, yazı `#2f1911` | 5.99 | mobil açık temada beyaz kullanıyor |
| zemin `#b44909`, yazı beyaz | 5.39 | marka rengi gözle görülür değişiyor |
| ikisini de `#b44909`'a çekmek | 5.39 | mobilin görünümü de değişirdi |

- Sınır: yalnız marka yüzeyleri. Rengin tek taşıyıcı olduğu yerde (CEFR rozetleri,
  der/die/das) katı eşik geçerli; B2 rozeti bu yüzden turuncu 700.
- Ölçüm gizlenmiyor: `scripts/palette-check.mjs` değeri "kabul edilmiş sapma" diye
  yazdırır, çıkışı bozmaz. Koddaki işaret: `src/app/globals.css` (`.brand-gradient` notu).

## Açık kalanlar

| Konu | Durum (2026-09-26 kodda doğrulandı) | Karar |
|---|---|---|
| §11.7 Beceri kütüphanesi | Web her tür için ayrı oynatıcı (`src/components/skills/*-player.tsx`); mobil tek ekran `ItemScreen` + `game/skillQuiz.tsx`, `game/skillLibrary.tsx`. Kapanış kartı eşitlendi (XP, seri, çevrimdışı notu, tekrar notu). Eksik: web kapanış kartındaki "Sıradaki egzersiz" bağlantısı mobilde yok. | ürün kararı |
| §11.139 Konuşma puanı | Seviye sınavının konuşma bölümünde web klibi `/api/pronounce`a gönderip söyleyişi puanlıyor (ağ yoksa madde 0); mobil cihaz tanıyıcısının metnini `spokenMatches` ile eşliyor. Mobil sonuç ekranı ne ölçtüğünü yazıyor. Kayıt: `scripts/check-endpoints.mjs` `WEB_ONLY_METHOD` / `WEB_ONLY`. | Samet |
| §11.458 Hatırlatma ayarı | Mobil `loadPrefs` yerel kararı her açılışta `syncPrefs` ile sunucuya yazıyor; web yalnız sunucuya yazıyor. Webde değiştirilen saat mobil açılınca geri alınır. Doğru çözüm "son değişen kazanır" ve değişiklik zamanı için yeni kolon ister. | Samet |

§11.16 (maskot `think`/`wow` klipleri) kapandı: maskot iki platformda da yalnız Öğren
ekranındaki günlük tur kutusunda (`learn-hub`, `LearnScreen`; 25a4e1df).

## Bilerek Türkçe kalanlar (Şerit I)

| Kalem | Bugün |
|---|---|
| Konuşma, sınav, beceri içeriği, can-do | Kaynak Türkçe; İngilizce ve Almanca anadil için çözücüyle çevriliyor (`docs/plan/native-language.md`) |
| Kelime karşılıkları | `words.tr`, `en`, `de_gloss`; karşılığı olmayan kelime havuzdan düşer |
| Karıştırma çiftleri (`src/lib/confusables.ts`) | Yalnız Türkçe anadilde gösteriliyor (`src/lib/why.ts`); öteki dillerde genel açıklama. Çiftlerin seçimi Türkçe konuşana göre, yeniden seçmek içerik kararı |
| Yönetim paneli, `console.error` günlükleri, modele giden istemler | Türkçe; istem modelden cevabı kullanıcının dilinde istiyor |

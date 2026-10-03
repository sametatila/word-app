# Seviye testi v2 — onboarding'de doğru ve kısa ölçüm

Durum (2026-10-03): aşama 1–5 kodda ve canlıda (web); mobil yeni build ile testçilere gider. Kalan: cihaz kontrolü ve testçilerle doğrulama (aşama 6), canlı kalibrasyon raporu.

## Neden

Kapalı testte 3–4 testçi aynı şeyi söyledi: "B2 çıktı ama değilim", "B1 çıktı ama C1'im".
Onboarding'deki "Testle belirle" hesap açılmadan çalıştığı için gerçek testi değil 8 soruluk
sabit örnek seti (`placement-demo`) oynatıyordu:

| Kusur | Etkisi |
|---|---|
| 8 soru, 4 şık, puan = doğru sayısı (0–2 A1 … 7–8 B2) | Hiç bilmeyen ortalama 2 doğru yapar; 1–2 şanslı tahmin bir seviye atlatır |
| Tavan B2, tek B2 sorusu | C1 hiç çıkamaz; C1'lik biri bir soruyu kaçırınca B1 |
| Hangi seviyenin sorusunun bilindiğine bakılmıyor | A1'i yanlış, B1'i doğru yapan aynı puanı alır |
| "Bilmiyorum" yok | Herkes tahmine zorlanır, sonuç şişer |
| 7/8 dilbilgisi, okuma ve dinleme yok | Tek beceri ölçülüyor |
| Herkese aynı 8 soru | Tekrar alan ezberler |

Hesaplı kullanıcının asıl testi (`/api/placement`) de kusurlu: okuma/dinleme yalnız A2–B1
metni, sonuç becerilerin ALT ortancası → C1'lik biri B1'in üstüne zor çıkıyor.

## Kararlar (Samet, 2026-10-03)

- Süre ~4 dakika. Dinleme 1–2 kısa soru ("Şu an dinleyemiyorum" ile atlanabilir).
- Sonuçta kullanıcı ±1 seviye seçebilir (gerekçeyle); daha uzağı Ayarlar'dan.
- Soruları Claude yazar, kapılar doğrular; Samet örnekleri gözden geçirir.
- Tek test: misafir de hesaplı kullanıcı da aynı motoru çözer (eski 8 soru ve 4 aşamalı test kalkar).

## Akış (~4 dk)

0. **Başlangıç:** "Sıfırdan başlıyorum" (test yok, A1) · "Seviyemi testle belirle" · "Seviyemi biliyorum" (seç).
1. **Kendini değerlendirme (10 sn):** beş "yapabilirim" cümlesinden kendine en uyanı (seviye başına bir
   cümle, arayüz dilinde). Yalnız BAŞLANGIÇ noktası; sonucu belirlemez. "Hiç bilmiyorum" → testi
   atla, A1 öner.
2. **Kelime kartları (≈60 sn):** 32 kart, "Biliyorum / Bilmiyorum". 24 gerçek kelime (A1–C1, seviye
   başına ~5) + 8 UYDURMA kelime. Uydurmaya "biliyorum" diyen tahmin ediyor demek: o oran kelime
   modelinin tahmin payı olur. Anlam sorulmadığı için anadilden bağımsız; kolayca tahmin edilen
   ortak kelimeler (Argumentation, Kontroverse, These) listeye alınmaz.
3. **Uyarlanabilir sorular (8–15 soru, ortalama 13, ≈2,5 dk):** boşluk doldurma, kısa okuma, 1–2 dinleme. Her
   soruda "Bilmiyorum". Doğruda zorlaşır, yanlışta kolaylaşır; seviye yeterince kesinleşince durur.
4. **Sonuç:** seviye + o seviyede yapabileceği 3 şey ("bu benim" dedirten kısım) + yakınlık ("B2'ye
   yakın"). ±1 seviye çipi, seçince ne değişeceği yazar. "Bu seviyeyle başla".

## Ölçüm modeli

- Yetenek θ (logit). Madde zorluğu seviyeden: A1 −2, A2 −1, B1 0, B2 +1, C1 +2; madde başına
  ±0,3 ince ayar (kolay/çekirdek/zor). 3PL benzeri: ayırt edicilik 1,0 (bilerek temkinli: etiket
  gürültüsünde 1,2 erken kesinliğe kapılıyordu); tahmin payı 1/şık sayısı.
  "Bilmiyorum" yanlış sayılır ve tahmin payı yoktur (tahminden daha güçlü kanıt).
- Tahmin: θ ızgarasında (−4…+4) sonsal; seviye = en çok olasılığı toplayan bant. Sonraki soru:
  hedefe en yakın zorluktaki 3 kullanılmamış maddeden rastgele biri; türler dönüşümlü; dinleme 4.
  ve 8. sırada.
- Durma: en az 8 soru, sonsal olasılığın ≥ %85'i tek seviyenin bandında VE o seviyeden ≥ 2,
  komşularından ≥ 1'er soru sorulmuş; ya da 15 soru. Soru seçimi tahmine en yakın SEVİYE
  SINIRINA göre (sınıflandırma testlerinin yerleşik seçimi).
- Kelime kartları kendi başına özet bir tahmine iner ve önsele girer (kartlar birbirine bağlı;
  her kartı ayrı kanıt saymak 30 kartın soruları ezmesi demekti). Uydurmaların 8'de 3'üne
  "biliyorum" diyenin kartları hiç sayılmaz.
- Seviye: θ < −1,5 A1 · < −0,5 A2 · < 0,5 B1 · < 1,5 B2 · ≥ 1,5 C1. "Yakın" = komşu kesime 0,25'ten yakın.

## Doğrulama (ölçümün doğru olduğundan nasıl emin olacağız)

1. **Benzetim kapısı (CI, `npm run test:placement`):** her seviye × üç davranış (dürüst, tahminci,
   uydurma kelimeye kanan) için 400 sanal kullanıcı. Motorun modeline BİLEREK uymayan veri: maddenin
   gerçek zorluğu etiketinden sapar (σ 0,35), ayırt edicilik 0,8–1,6, insanlar seviyesini ±1 yanlış bilir.
   Ölçülen (2026-10-03, dört tohum): tam isabet ~%72, kabul (tam ya da sınırdaki kişide komşu) ~%88,
   ±1 içinde ~%99,6, iki seviye sapma ~%0,4, ortalama 13 soru. ESKİ 8 soruluk test aynı insanlarla:
   tam %38, iki seviye sapma %7, C1'i hiç bulamıyor. Kapı: tam ≥ %70, kabul ≥ %85, ±1 ≥ %99,5,
   2+ ≤ %0,5. Sıfır hata 4 dakikada gerçekçi değil; sınırdaki kişi için sonuç "X'e yakın" der, ±1
   seçtirir, ilk hafta düzeltir.
2. **Madde bankası kapısı:** her madde tek doğru cevap, şık tekrarı yok, seviye dağılımı tam, uydurma
   kelimeler sözlükte YOK (Almanca: kelime bankası + ek liste; İngilizce: sistem sözlüğü), ortak
   kelime (cognate) listesi dışarıda.
3. **Kapalı testte doğrulama:** seviyesini bilen testçiler (B1 ve C1 diyenler dahil) yeniden çözer;
   sonuç ve hissettikleri kaydedilir (`docs/play/closed-test.md`).
4. **Canlıda kalibrasyon:** her cevap kaydedilir (madde, doğru/yanlış/bilmiyorum, süre). İlk haftanın
   başarısıyla karşılaştırılıp madde zorlukları düzeltilir (`npm run report:placement`).

## İlk hafta düzeltmesi (emniyet ağı, `lib/placement-nudge`)

Hiçbir test tek seferde kusursuz değil. Başlangıçtan (son test ya da hesap açılışı) sonraki 10 gün
içinde, kişinin SEVİYESİNDEKİ kelimelerle ≥ 30 İLK karşılaşmada doğruluk ≥ %90 ise bir üst, ≤ %50
ise bir alt seviye BİR KEZ önerilir ("Çok kolay geliyor gibi, B2'ye geçelim mi?"). Toplam doğruluk
kullanılmıyor: canlıda B1 kullanıcıları zaten %94, A1 %80 (tekrar doğruluğu seviye bilgisi değil).
Karar `profiles.placement_nudge`; seviye yalnız kabulde değişir. Öğren ekranında kart (iki platform).

## Yapı

- Madde bankası: `data/placement/<hedef dil>.json` (de, en) + `data/placement/SPEC.md`.
- Motor: `src/lib/placement-engine.ts` (saf TS) — `npm run placement:sync` mobil kopyayı
  (`mobile/src/lib/placementEngine.ts`) ve banka modüllerini üretir; `check:parity` birebir eşitliği denetler.
- Misafir: banka uygulamanın içinde (çevrimdışı çalışır), sonuç ve cevaplar onboarding tercihlerine;
  hesap açılınca sunucuya (`/api/placement` `record`: sonuç sunucuda aynı motorla yeniden hesaplanır,
  `placements` cevaplarla). Eski start/finish/accept build 17 ve öncesi için duruyor.
- Hesaplı yeniden alma (Ayarlar/Patika): aynı motor; 30 gün kuralı kalır.
- Web: `/level-test` ve `/placement` aynı motora geçer.

## Aşamalar

1. Motor + benzetim kapısı (eski testle karşılaştırma).
2. Madde bankası (de, en) + SPEC + banka kapısı.
3. Mobil akış (onboarding + yeniden alma) + i18n (tr/en/de).
4. Web akışı + parity.
5. Sunucu kaydı + rapor + ilk hafta düzeltmesi.
6. Cihaz kontrolü, testçilerle doğrulama, build.

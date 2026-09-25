# Üretim Prompt Şablonları

İçerik, partiler hâlinde üretilir (önerilen parti: 10 ders — jeton dostu;
20'ye kadar çıkabilir). Aşağıdaki şablonu kopyala, köşeli parantezleri doldur,
ajana ver. Ajan her partide YALNIZCA şu üç şeyi okumalı: `SPEC.md`, ilgili
seviyenin konu dosyasındaki hedef satırlar ve bir örnek içerik dosyası —
bütün müfredatı okutmak jeton israfıdır.

## Parti şablonu

```
data/lessons-plan/SPEC.md dosyasını oku ve harfiyen uygula.
data/lessons-plan/topics-[a1].md dosyasından [001–010] numaralı konuları al.
Örnek olarak src/lib/lessons/content/de-a1.ts dosyasındaki dersleri incele —
kalite çıtası bu; ondan daha iyi yaz, daha kötü değil.

Görev: bu [10] konuyu tam derslere dönüştür.
- Dosya: src/lib/lessons/content/de-[a1]-b[01].ts
  (export const de[A1]B[01]: Lesson[] — konu numarası sırasıyla)
- ✔ işaretli konular varsa: mevcut dersi İLGİLİ ESKİ DOSYADAN buraya birebir
  taşı (içeriğini değiştirme), eski dosyayı sil, importları güncelle.
- src/lib/lessons/index.ts içindeki LESSONS dizisine partiyi, konu numarası
  sırası bozulmayacak şekilde ekle.

Bitirmeden önce sırayla çalıştır ve temiz çıkana kadar düzelt:
1) npx tsc --noEmit
2) npm run check:lessons   (sıfır HATA; uyarıları oku, haklıysa düzelt)

Ardından ürettiğin HER dersi tek tek yeniden oku ve şu üç soruya göre elden
geçir: (1) Almanca cümleler ana dili Almanca birine doğal geliyor mu?
(2) Türkçe anlatım çeviri kokuyor mu, yoksa sıcak bir öğretmen gibi mi?
(3) Üretim alıştırmaları gerçekten bu dersin kalıbını mı sınıyor?
Emin olmadığın cümleyi daha basitiyle değiştir.

Kapsam dışı: başka dosyaya dokunma, tip/motor/ikon değiştirme, konu
dosyasındaki id-başlık-ikon-odak alanlarını değiştirme.
```

## Parti takvimi (önerilen)

Her seviye 10 parti × 10 ders: `b01` (001–010) … `b10` (091–100).
Sıra önemli: bir seviyenin partileri numara sırasıyla üretilmeli — sarmal
tekrar, önceki derslerin kelimelerini bilinen sayar. Seviyeler arası sıra
serbest ama A1 → C1 gitmek, örneklerin birikmesi açısından en sağlıklısı.

İlk partiler (mevcut dersleri taşıdıkları için özel):
- A1 b01: 001 hallo ✔ taşınır (de-a1.ts silinir; cafe ✔ 021'de, b03'e kadar
  de-a1.ts'te sadece cafe kalır — b03 üretilirken o da taşınır ve dosya silinir).
- A2 b01: 001 urlaub ✔ taşınır; arzt ✔ 021 → b03'te taşınır.
- B1 b01: 001 bewerbung ✔ taşınır; wohnung ✔ 011 → b02'de taşınır.

## Gözden geçirme partisi (opsiyonel, her 3-5 partide bir)

```
data/lessons-plan/SPEC.md kriterlerine göre src/lib/lessons/content/de-[a1]-b[01..03].ts
dosyalarındaki dersleri denetle. Her ders için: Almanca doğallık, Türkçe
doğallık, alıştırma isabeti, çeşitlilik (girişler/sahneler tekrara düşmüş mü),
doğru/yanlış cevap dengesi. Bulduğun her sorunu doğrudan düzelt; sonunda
npm run check:lessons ve npx tsc --noEmit temiz çıksın. Değişen dersleri ve
gerekçeleri kısa bir listeyle raporla.
```

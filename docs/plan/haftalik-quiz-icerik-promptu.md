# Haftalık quiz — içerik devir promptu

Bu belge **bir sonraki seviyenin içeriğini yazacak ajana verilecek promptu** tutuyor.
A1 yazılıp kontrolden geçtikten sonra kullanılır; A2 için hazır, üst seviyeler için
tema tablosu değiştirilerek aynen kullanılır.

Kararların kaydı ve faz takibi: artifact
`https://claude.ai/code/artifact/91486c81-6819-43a1-be35-87b5b606d90c`

Neden ayrı bir belge: içerik üretimi tekrar eden ve uzun süren bir iş. Kuralların
sohbet geçmişinde kalması, üçüncü seviyede şablonun sessizce kaymasına yol açar —
repodaki `data/**/SPEC.md` dosyalarının var oluş sebebiyle aynı sebep.

---

## Prompt (olduğu gibi kopyalanır)

```
Depo: /home/linkinqark/Desktop/workspace-linux/word-app

GÖREV
Haftalık quiz için A2 seviyesinde 5 haftalık içerik yaz: kurs `de` ve kurs `en`
için beşer paket (toplam 10 dosya). A1 paketleri YAZILDI ve kontrolden geçti —
onları önce oku ve şablonu birebir izle:
  src/lib/weekly-quiz/de/a1-w01.ts .. a1-w05.ts
  src/lib/weekly-quiz/en/a1-w01.ts .. a1-w05.ts
Tip tanımları ve her alanın gerekçesi: src/lib/weekly-quiz/types.ts

DEĞİŞMEYEN KURALLAR (A1 ile aynı)
1. Blok dağılımı hafta başına sabit: read 2 · listen 2 · grammar 3 · vocab 2.
   `personal` blok yazılmaz — çalışma anında öğrencinin SRS'inden üretilir.
   Havuzu ~14 madde yaz; quiz 10 tanesini seçiyor.
2. Sözcük bütçesi: her madde yalnız o kursun A2 (ve altı) kelime listesindeki
   sözcükleri kullanabilir. Liste veritabanında:
     select de, tr, en from words where course='de' and niveau in ('A1','A2');
   `npm run check:quiz` bunu ölçüyor ve ihlali HATA sayıyor.
3. Her maddede `why` dolu (Türkçe, ≥20 karakter): yanlıştan sonra gösterilen
   açıklama. Kuralı söyler, cevabı tekrar etmez.
4. Çeldiriciler anadil girişiminden üretilir ve `native` etiketi taşır:
     kurs de → native "tr" ve native "en" varyantı
     kurs en → native "tr" ve native "de" varyantı
   tr→de: cinsiyet/artikel, durum ekleri, V2 sözdizimi (Türkçede fiil sonda).
   en→de: Akkusativ/Dativ ayrımı, ayrılabilir fiiller, sahte dostlar.
   tr→en: artikel yokluğu (a/the), present simple ↔ continuous ayrımı.
   de→en: do-desteği, sıfat sırası, sahte dostlar (also, handy, become).
   Çeldirici rastgele değil: öğrencinin GERÇEKTEN yapacağı hatayı temsil eder.
5. Aralıklı tekrar: her haftanın ≥1 maddesi önceki haftaların bir hedefini
   yeniden yokluyor (`targets` alanıyla). W5 saf tekrar değil TRANSFER haftası —
   önceki sözcükler yeni bağlamlarda.
6. Uyaran (okuma metni, dinleme diyaloğu) kurs başına BİR kez yazılır; anadile
   göre değişen tek şey çeldiriciler ve `why` metni.
7. Marka adı geçmez (Goethe, telc, ÖSD, Cambridge, IELTS…) — kontrol betiği
   tarıyor, hata veriyor.
8. Cevap dağılımı dengeli: aynı şık konumu maddelerin %60'ından fazlasında
   doğru olamaz; doğru şık sistematik olarak en uzun olamaz.

A2 TEMALARI (A1'in üstüne kurulur, tekrar etmez)
  W1 Geçmiş zaman anlatımı   W2 Sağlık ve randevu   W3 Seyahat ve yol tarifi
  W4 İş ve başvuru           W5 Transfer (W1–W4 yeni bağlamlarda)

TESLİM
- 10 dosya + index.ts kaydı
- `npm run check:quiz` HATASIZ geçmeli (uyarı varsa gerekçesi baseline'a yazılır)
- `npx tsc --noEmit` temiz
- Değişiklikleri TEK atomik commit olarak yerelde bırak, push etme.

KALİTE ÖLÇÜSÜ
Bu bir sınav değil, gelişim aracı. Maddeler öğrenciyi yakalamaya değil,
ne bildiğini ve neyi karıştırdığını göstermeye çalışır. Bir madde yalnızca
"öğrenci bunu bilmiyorsa hangi yanlışı yapar" sorusunun net bir cevabı varsa
iyidir — `why` o cevabı açıklar.
```

---

## Üst seviyeler için

Yalnız iki şey değişir: **tema tablosu** ve **sözcük bütçesi sorgusundaki
`niveau` listesi** (B1 için `('A1','A2','B1')` gibi — bütçe her zaman kümülatif).
Blok dağılımı, çeldirici kuralı, `why` zorunluluğu ve aralıklı tekrar kuralı
seviyeden bağımsızdır; değiştirilirse quiz'ler seviyeler arasında
karşılaştırılamaz hâle gelir.

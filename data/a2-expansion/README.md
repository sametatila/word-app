# A2 genişletme hattı

Havuzun A2 katmanını üç katına çıkarmak için kurulan üretim ve denetim hattı.
Almanca havuz yeniden genişletilecekse aynı adımlar tekrar işler.

## Neden üretim

Önce iki ucuz yol denendi, ikisi de elendi:

- **Resmî Goethe A2 listesi tükenmiş.** `data/goethe_a2.csv` 1.159 satır ama
  bunların çoğu A1 kelimelerinin tekrarı; havuzda hiç bulunmayan yalnızca 9
  madde çıktı, onlar da başlık temizliğinde yeniden adlandırılmış olanlardı.
- **Ham sıklık listesi tek başına yetmiyor.** Havuzda olmayan 42.499 aday var
  ama başı `mir`, `den`, `sind` gibi çekimli biçimler, devamı `hollywood`,
  `mommy` gibi altyazı gürültüsü. Sözlük biçimini çekimden ayırmak dilbilgisi
  kararı gerektiriyor.

Bu yüzden: anlamsal alanlara bölünmüş üretim, sıklık listesi ise **kalite
kapısı** olarak. "Bu kelime A2 mi" sorusu özneldir; "50 bin kelimelik günlük
dil listesinde geçiyor mu" nesneldir.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `SPEC.md` | Üretim şartnamesi — bir ajana verilecek metin |
| `existing.txt` | Havuzdaki tüm kelimeler; benzersizlik buna karşı denetlenir |
| `de_50k.txt` | Sıklık listesi (OpenSubtitles türevi), seviye kapısı |
| `check.ts` | Kalite kapısı; `out/*.json` okur, `accepted.json` yazar |
| `merge.ts` | Kabul edilenlere id atar, `words.json` ve `beispiel-tr.json`'a yazar |

## Akış

1. `existing.txt`'i güncelle (havuz değiştiyse).
2. Alanları paylaştır; her ajana `SPEC.md` + alan + tür kotası ver.
   Çıktılar `out/<alan>.json`.
3. `npx tsx data/a2-expansion/check.ts` — eleme ve rapor.
4. `npx tsx data/a2-expansion/merge.ts` — havuza kat.
5. Zürih tarafı: `data/zurich/pending/make-packets.ts` ile yeni id'lerden paket
   üret, `SPEC-ZH.md` ile lehçe karşılıklarını yaptır.

## Öğrenilenler

**Tematik alanlar isim üretir.** İlk iki pakette 113 isim, 5 fiil çıktı. Bir dil
yalnızca isimlerden öğrenilmez; şartnameye tür kotası eklendi ve ayrıca
yalnızca fiil / yalnızca sıfat-zarf paketleri açıldı.

**"Cümle kelimeyi içermeli" kuralı ret değil uyarıdır.** Almanca çekimi sezgisel
bir kuralla yakalanamıyor: `anhalten` cümlede "hält an", `eintreffen` "trifft
ein" olur (gövde ünlüsü değişir), `edel` niteleyici olunca "edle" olur. İyi
kelimeyi elemek, kusurlu bir sezgiyi memnun etmekten kötüdür. Betik şüphelileri
listeler, insan bakar — ilk turda listelenen 7 maddenin hepsi doğru çıktı.
O maddeler yalnızca boşluk doldurma turuna giremez; kalan dokuz oyun kapsar.

**Aynı kontrolü iki kez yanlış yazdık.** Cümle-kelime kontrolü hem burada hem
Zürih denetleyicisinde ayrı ayrı yazıldı ve ikisi de ayrılabilen fiilleri
eledi. Mantık `src/lib/headword.ts`'e taşındı; iki denetleyici de oradan
kullanıyor.

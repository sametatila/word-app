# WP-74 — İngilizce ders kapsamı B1–C1

**Durum:** planlandı · **Sahip:** Claude · **Açılış:** 2026-09-11

## Kusur

İngilizce kursun ders katmanı A2'de bitiyor. Ölçüldü (2026-09-11):

| katman | A1 | A2 | B1 | B2 | C1 |
|---|---|---|---|---|---|
| ders (Patika) | 100 | 100 | **0** | **0** | **0** |
| beceri | 57 | 57 | 25 | 25 | 25 |
| deneme kâğıdı | 12 | 12 | 12 | 12 | 12 |

Almanca kursta aynı satır 100 / 100 / 180 / 100 / 100. Yani İngilizce
öğrencisi B1'e çıktığında beceri kütüphanesi ve deneme sınavı çalışıyor,
**Patika boş**. Ekran bunu dürüstçe söylüyor (`immersion/page.tsx`, "bu
seviyede ünite yok") ama söylemek çözmek değil: kursun bel kemiği olan
ders akışı yarıda kesiliyor. Kurs kartı da `English · CEFR A1–C1` diyor.

## Kapsam

Modül başına 10 ders, seviye başına 10 modül: **B1 100 + B2 100 + C1 100
= 300 ders**. Almanca B1'in 18 modülü buraya taşınmıyor — o genişleme
Almanca kelime havuzunun kapsanmayan 1059 maddesinden çıkmıştı
(`b1-yeniden-kurgu.md` §5), İngilizce havuzun kendi ölçümü yapılmadan
aynı sayı varsayılmaz.

Modül temaları `MODULE_THEMES` tablosundan geliyor ve tablo SEVİYE
anahtarlı, kurs anahtarlı değil: İngilizce B1 de Almanca B1'in ilk on
temasını kullanacak. A1/A2'de bu zaten böyle ve tutuyor (İngilizce A1
modül 3 «Yeme-içme», modül 9 «Sağlık ve vücut» — birebir oturuyor).
Tutmazsa tabloyu kursa göre bölmek ayrı bir iştir, önce ölçülür.

## Sözleşme (ders başına)

2026-09-11'de sahibin kararıyla İngilizce kurs Almanca kursun
sözleşmesine getirildi; yeni dersler o sözleşmeyle doğar:

- 8 sözlükçe maddesi, her biri kendi tekrar adımıyla
- 3 kalıp; üçü de modellenir, **üçü de üretilir**
- 19 adım: onay + giriş + 8 kelime + kural köprüsü + 3 kalıp tekrarı
  + 3 üretim + 1 doğru-yanlış + kapanış
- üretim adımlarında `accept` dizisi (İngilizce kursun A1/A2'de kurduğu
  şey; eşdeğer doğru cevaplar reddedilmez)
- rol yapma: 6–9 tur, senaryolu yedeği ile
- `tekrar adımı payı` %60'ı geçmez, `puanlanan adım` ≥ 4

Biçim JSON (`src/lib/lessons/content/en-b1.json`), TS değil — İngilizce
katman baştan böyle kuruldu.

## Yazmak ile bağlamak ayrı iki iş

Ders yazmak işin yarısı. Her yeni Türkçe dize **Almanca anadil ekseninde**
de karşılık ister (Almanca anadilli öğrenci İngilizce kursu alıyor):

1. `src/lib/lessons/content/en-b1.json` — ders
2. `node data/lessons/prose-de/make.mjs` → yeni Türkçe dizeler `in/`'e düşer
3. elle `data/lessons/prose-de/out/` paketleri — Almanca karşılıklar
4. `npm run check:native-de` → "ders 300/300" demeli
5. `npm run dump:native` → `mobile/src/data/native/de.json`

Kapılar: `check:lessons`, `test:content`, `check:native-de`, `test:gloss`.
Biri kırmızıyken modül bitmiş sayılmaz.

## Sıra

Modül modül, her modül tek commit. B1 1→10, sonra B2, sonra C1.
Her modülün sonunda dört kapı da yeşil olacak.

## Tamamlanma ölçütü

- `LESSONS` içinde `course: "en"` için B1/B2/C1 100'er ders
- dört kapı yeşil, `test:content` bütçesi büyümemiş
- `mobile/src/data/native/de.json` güncel
- `docs/plan/STATUS.md` WP-74 satırı `bitti`

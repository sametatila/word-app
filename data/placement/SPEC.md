# Seviye testi bankası — yazım kuralları

Plan ve ölçüm modeli: `docs/plan/placement-v2.md`. Motor: `src/lib/placement-engine.ts`.
Bu dosyalar kaynak; uygulama üretilmiş kopyaları kullanır: `npm run placement:sync`
(`src/lib/placement-bank.ts`, `mobile/src/data/placementBank.ts`, mobil motor kopyası). Kapı:
`npm run check:placement` (CI) ve `npm run test:placement` (benzetim, CI).

## Dosya

`<hedef dil>.json` (`de`, `en`). Hedef dil = öğrenilen dil; arayüz dili (anadil) bankayı
etkilemez: kelime kartları anlam sormaz, sorular ve şıklar hedef dilde, yönergeler çeviriden.

## Kelime kartları (`cards`)

- Seviye başına 8 gerçek kelime (oturumda 5'i rastgele). İsimler artikeliyle (`die Miete`).
- Seviyeyi AYIRT EDEN kelime seç: o seviyenin orta sıklıktakileri. Kolayca tahmin edilen ortak
  kelimeler (Almancada `Argumentation`, `Kontroverse`, `These`; İngilizcede Almancayla ortak
  `analysis`, `deficit`, `aphorism`) ALINMAZ: dili bilmeden tanınırlar, seviyeyi şişirirler.
- `pseudo`: en az 12 UYDURMA kelime (oturumda 8'i). Dilin ses yapısına uygun ama YOK. Kontrol:
  kapı kelime bankasında olmadığını denetler; ayrıca sözlükle (LibreOffice hunspell de_DE / en_US /
  en_GB, `/usr/share/dict/words`) bakılır. Gerçek bir kelimeye çok benzeyen (`Bläde`~blöde,
  `Knöbel`~Knobel, `chistle`~chisel) alınmaz: tanıdık gelir, tahminciyi değil dikkatsizi cezalandırır.

## Sorular (`items`)

| Tür | Seviye başına | Şık | Alanlar |
|---|---|---|---|
| `cloze` boşluk doldurma | ≥ 5 (yazılı 6) | 4 | `text` içinde tam bir `___` |
| `reading` kısa okuma | ≥ 3 (yazılı 4) | 4 | `text` (1–3 cümle), `question` |
| `listening` dinleme | ≥ 3 | 3 | `audio` (TTS, ≤ 300 karakter), `question` |

- Kimlik `<dil>-<seviye>-<c|r|l><n>`; seviye ve tür harfi kimlikle uyuşur.
- **Doğru şık her zaman İLK sırada** yazılır; üretim karıştırır.
- **Tek doğru cevap.** Her çeldiriciyi ayrı ayrı cümleye koyup oku: dilbilgisel ve anlamca da
  yanlış olmalı. Örnek: "Gestern ___ ich lange geschlafen." şıklarında `hatte` olamaz
  (Plusquamperfekt de doğru); "If it rains tomorrow, we ___" şıklarında `could` olamaz.
- Seviye CEFR'ye göre (Almanca: Profile Deutsch dilbilgisi listeleri; İngilizce: English Profile).
  `offset` −0,3 (seviyenin kolayı) … +0,3 (zoru); seviye içi sıralama için, seviye etiketini değil
  ince ayarı belirtir.
- Okuma ve dinleme sorusu METNİN ANLAMINI ölçer, genel kültürü değil: metni okumadan doğru
  tahmin edilememeli.
- Kişi, yer, marka adları nötr; siyaset, din, sağlık tavsiyesi yok.

## Değişiklikten sonra

`npm run placement:sync && npm run check:placement && npm run test:placement`. Madde zorlukları
canlı veriyle kalibre edilir (plan, Doğrulama 4); elle `offset` değiştirmek yerine raporla.

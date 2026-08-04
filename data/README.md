# Goethe Kelime Verisi

Kaynak: Goethe-Institut resmî Wortliste PDF'leri (`pdf/`). Goethe yalnızca B1'e kadar
resmî kelime listesi yayınlıyor; B2/C1 için liste yok.

## Dosyalar

| Dosya | Satır | Açıklama |
|---|---|---|
| `goethe_wortschatz.csv` | 5.318 | Tüm seviyeler, UTF-8 (BOM'suz), virgül ayraçlı |
| `goethe_wortschatz_excel.csv` | 5.318 | UTF-8 BOM + noktalı virgül — Excel'de umlaut/Türkçe karakter bozulmaz |
| `goethe_a1_fit_in_deutsch_1.csv` | 532 | A1 (gençler) |
| `goethe_a1_start_deutsch_1.csv` | 689 | A1 (yetişkinler) |
| `goethe_a2.csv` | 1.159 | A2 |
| `goethe_b1.csv` | 2.938 | B1 |
| `app/words.json` | 3.192 | Seviyeler arası tekilleştirilmiş, uygulamaya hazır |
| `app/words.csv` | 3.192 | Aynı verinin CSV hâli |

## Sütunlar

`niveau, wort, artikel, turkce, formen, typ, beispiele, eintrag, quelle`

- `wort` — Almanca madde başı (artikelsiz), `artikel` — der/die/das
- `turkce` — doğal Türkçe karşılık (en yaygın 1-3 anlam, virgülle)
- `formen` — çoğul eki (isim) veya çekim formları (fiil)
- `typ` — Nomen / Verb / Sonstiges (sezgisel)
- `beispiele` — PDF'teki örnek cümleler
- `eintrag` — PDF'teki ham madde metni, `quelle` — kaynak PDF

`app/words.json` alanları: `id, de, artikel, tr, formen, typ, niveau, beispiel`

## Üretim

1. `parse_goethe.py pdf <çıktı_dizini>` — PDF'lerden koordinat tabanlı ayrıştırma
   (iki sütunlu sayfa düzeni, satır kaydırmaları, satır sonu tirelemesi çözülür).
2. Çeviri: 27 paket hâlinde paralel çeviri, ardından 16 paketlik bağımsız doğrulama turu.
3. `merge_tr.py` — çevirileri ve düzeltmeleri birleştirip bu dosyaları üretir.

## Doğrulama durumu

- 3.192/3.192 madde çevrildi, boş çeviri yok.
- Tüm çiftler ikinci bir turda kelime-çeviri-örnek uyumu için denetlendi; 6 düzeltme uygulandı.
- Almanca `ä/ß` kalıntısı, bozuk kodlama, çeviride kalmış artikel: 0.
- "CD, Film, Internet, Pizza" gibi 37 madde Türkçede de aynı olduğu için birebir aynıdır.

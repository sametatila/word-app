# Konuşma Üretim Şartnamesi

Konuşma (Patika'nın "Konuşma" adımı) üreten ajanın sözleşmesi. Kapı
`npm run check:conversations` (`scripts/check-conversations.ts`); bu belge ile
kapı çelişirse kapı geçerlidir, belge düzeltilir. Belirsizlikte aynı seviyedeki
mevcut konuşmalar emsaldir.

Müfredat: Almanca kurs için `topics-a1.md … topics-c1.md` (her satır bir
konuşma). Modül adları `src/lib/conversations/modules.ts` (`MODULE_THEMES`).

## 1. Ürün

Türkçe konuşan yetişkine hedef dili öğreten sesli, etkileşimli senaryo. İki faz:

1. **Anlatım (`lecture`):** öğretmen anadilde anlatır, hedefler hedef dilde.
   Kelime söyletilir, kalıp açıklanır, örnek tekrar ettirilir, öğrenci kendi
   cümlesini üretir, doğru/yanlışla sınanır. Metin sesli okunur: yazı dili değil,
   sıcak konuşma dili.
2. **Sohbet (`chat`):** model sahnedeki karakteri oynar. Sen yalnız sahneyi,
   rolü, açılışı ve amacı yazarsın.

## 2. Dosya ve kayıt

| Kurs | Dosya | Biçim |
|---|---|---|
| Almanca (`de`) | `src/lib/conversations/content/de-<seviye>-b<NN>.ts`, `export const deA1B01: Conversation[]` | TS, `tr()`/`de()` yardımcıları `../types`'tan |
| İngilizce (`en`) | `src/lib/conversations/content/en-<seviye>.json` | JSON, segment dili `tr`/`en` |

- Yeni dosya `src/lib/conversations/source.ts` içindeki `CONVERSATIONS`'a,
  katalog sırasını bozmadan eklenir. Harita konuşmaları katalog sırasıyla 10'arlı
  modüllere, 4'erli ünitelere böler: sıra müfredatın kendisidir.
- Kimlik `<kurs>-<seviye>-<slug>` (`de-a1-hallo`, `en-b1-…`). **Kimlik bir kez
  yayımlandıktan sonra değişmez, silinmez, yeniden kullanılmaz:**
  `user_conversations` birincil anahtarı `(user_id, conversation_id)`.
- Konu satırı varsa id, başlık, ikon, `focusId` oradan birebir alınır.
- **Konu satırı yoksa** (Almanca B1 modül 11–18, İngilizce kurs): tema
  `MODULE_THEMES`'ten; ikon `CONVERSATION_ICONS` listesinden
  (`src/lib/conversations/types.ts`, 65 simge), `focusId` aynı modüldeki komşu
  konuşmaların kullandığı odaklardan seçilir. Yeni simge ya da odak uydurulmaz.

## 3. Konuşma başına sözleşme

| Alan | Kural (kapı) |
|---|---|
| `vocab` | **tam 8 kelime**; her biri bir `repeat` hedefinde geçer |
| `patterns` | 2–3 kalıp |
| `lecture` | 14–24 adım; ilk adım `confirm`, son adım beklentisiz |
| puanlanan adım | en az 2 `produce` + en az 1 `truefalse` (toplam ≥ 3) |
| `minutes` | 6–15 |
| `summary` | tek cümle (> 15 karakter) |
| `chat.minTurns` | 6–9 |
| `chat.goal` | > 25 karakter, `scene`'in kopyası değil |
| `chat.opening` | soru işareti içerir |

Yeni konuşmanın hedefi (İngilizce kursta B1–C1 böyle yazıldı): 8 kelime,
3 kalıbın üçü de modellenir ve **üçü de üretilir**, her `produce` adımında
eşdeğer doğru cevaplar `accept` dizisinde.

Bugünkü değerler (yeni konuşma komşularına uyar):

| Seviye | `minutes` de / en | `minTurns` de / en |
|---|---|---|
| A1 | 8–9 / 8–9 | 6–7 / 6–7 |
| A2 | 10 / 8–9 | 8 / 6–7 |
| B1 | 10–12 / 10–11 | 8–9 / 7–8 |
| B2 | 12 / 11 | 8–9 / 7 |
| C1 | 14 / 12–14 | 8–9 / 8–9 |

`minTurns` `goal`'un kaç sonuç istediğine göre seçilir: üç ve daha çok sonuçlu
amaç bir tur fazlasını alır. Çevrimdışı `script` varsa tur sayısı `minTurns`'ten
az olamaz.

## 4. Anlatım iskeleti

1. **Onay** (`confirm`): konuşmanın vaadini somut söyler, "Başlamaya hazır mısın?"
2. **Çerçeve** (beklentisiz `say`): kalıpların ne işe yaradığı; sonu kelimelere köprü.
3. **8 kelime, her biri kendi `repeat` adımıyla:** sıra sözü ("İlk kelimemiz:",
   "Sıradaki", "Son kelimemiz:") + hedef dil segmenti + "Türkçesi '…' demek" +
   tekrar isteği. Aynı kelime aynı konuşmada iki kez "yeni" diye öğretilmez.
4. **Kalıp blokları:** açıklama `say` → örnek `repeat` → `produce`.
5. **`truefalse`:** yargılanan cümlenin tamamı adımın hedef dil segmentinde geçer.
6. **Kapanış** (beklentisiz): tek cümle özet + sohbet sahnesine köprü.

## 5. Dil

**Türkçe anlatım**
- Sen-diliyle, kısa, sıcak cümleler; çeviri kokusu yok ("Bunu çok kullanacaksın").
- Terim az; kullanılırsa bir kez tanımlanır ("belirtme hâli, yani Akkusativ").
- Kural Türkçeyle karşıtlık üzerinden anlatılır.
- Çeviriler doğal Türkçe.

**Hedef dil**
- Kusursuz ve seviyeye uygun; kelimeler havuzun o seviyedeki katmanından
  (`data/content/SPEC.md` › Havuz ve seviye kuralları).
- Almanca adlar artikelli (`das Fieber`), fiiller mastar, dönüşlüler `sich` ile.
- İngilizce **Amerikan yazımı ve Amerikan sözcük seçimi** (anadil hatlarında
  kapı `data/conversations/spelling.mjs`).
- Hedef cümle konuşulabilir: tanıyıcı dostu, 3–9 kelime, yaygın özel adlar.

**Segment disiplini**
- Anadil metni `tr` segmentinde, hedef dil kendi segmentinde; karışmaz. Türkçe
  segmentte alıntılanmış hedef dil cümlesi kapı hatasıdır (yanlış sesle okunur).
  Tek terim ("Plusquamperfekt", "I would like") serbest.
- Parantezli açıklama yok (seslendirme okumaz). Markdown, madde işareti yok.

## 6. Alıştırma tasarımı

- **`produce` ipucu:** önce hatanın tipik sebebi, sonra doğru cümlenin
  **tamamı** hedef dil segmentinde, sonunda "Tekrar dene." (kapı tam cümleyi arar).
- **`truefalse`:** tek ve net bir hata ya da doğru cümle. Doğru cevap payı kurs ×
  seviye başına %25–60 (kapı uyarısı). `why` hatayı adlandırır, doğrusunu verir.
- Üretim hedefleri ve hüküm cümleleri katalogda benzersiz.
- Önceki konuşmaların kelimeleri örneklerde yeniden kullanılır, ama `vocab`'a
  yalnız yeni öğretilen kelime girer; seviye içinde bir kelime iki kez "yeni" olmaz.
- **Övgü yazılmaz:** `repeat`/`produce` sonrası adım övgüyle başlamaz; övgüyü
  motor ekler (yanlış cevapta eklemez).

## 7. Sohbet ve meta alanlar

- `scene`: Türkçe, emir kipiyle öğrencinin ne yapacağı, kalıplara işaret (> 30 karakter).
- `partner`: Türkçe sıfat + rol ("sabırsız ama iyi kalpli bir satıcı").
- `opening`: hedef dilde en çok 2 cümle, soruyla biter; `openingTr` doğal Türkçesi.
  Açılış ve başlık seviye içinde yinelenmez.
- `goal`: konuşma NE OLUNCA biter, bir sonuç ("Sipariş verilmiş ve hesap
  istenmiş olur."). Bu alan olmadan sohbet bitmiyor, kesiliyor.
- `title` hedef dilde, `titleTr` kısa Türkçesi, `summary` ne öğrettiğini söyler.

## 8. Anadil eksenleri

Her yeni Türkçe dize öteki anadillerde de karşılık ister:

| Kaynak | Hat | Kapı |
|---|---|---|
| Almanca kurs konuşmaları | `data/conversations/{lecture,chat,meta,patterns,vocab,…}` → İngilizce | `check:conversations-native` |
| İngilizce kurs konuşmaları | `data/conversations/prose-de` → Almanca | `check:native-de` |

Mobil anadil dökümü `npm run dump:native`.

## 9. Kapılar

```
npx tsc --noEmit
npm run check:conversations     # sıfır HATA; yeni uyarı taban dosyasına girmeden düşürür
npm run test:content -- conversations
npm run check:native-de         # İngilizce kurs
npm run check:dumps             # mobil döküm kaynakla aynı
```

Kapıyı `npx tsx scripts/check-conversations.ts` ile doğrudan çağırma:
`server-only` importu yüzünden sessizce çöker. Hep `npm run` ile.

Son okuma: her hedef dil cümlesini anadili o dil olan biri gibi, her Türkçe
cümleyi anadili Türkçe biri gibi oku. Emin olmadığın cümleyi daha basitiyle değiştir.

# Anadil ekseni — en→de ve de→en pariteleri

Kullanıcıya iki eksen sunuluyor: **anadil** (`profiles.native_lang`, aynı zamanda
arayüz dili) ve **hedef dil** (`profiles.course`). Bu, sektörün yaptığı şey —
Duolingo'nun bütün kataloğu `(from, to)` çifti üzerine kurulu ve "from" aynı
zamanda arayüz dili; Babbel ve Busuu'da da öyle. Ayrı bir üçüncü "arayüz dili"
ekseni yok ve olmayacak: aynı soruyu iki kez sormak (*"zaten bildiğim dil
hangisi"*) durum uzayını üçe katlar, tek bir yeni içerik üretmez.

## Sunulan çiftler

`coursesForNative()` hedefi anadille aynı olan kursu eliyor (kendi dilini
öğretmek anlamsız). Geriye kalanlar:

| Çift | Kelime verisi | Beceri | Ders |
|---|---|---|---|
| tr → de | ✅ | ✅ | ✅ |
| tr → gsw | ✅ | ✅ | ✅ |
| tr → en | ✅ | ✅ | ✅ |
| **en → de** | ✅ (8707/8707 İngilizce karşılık) | ❌ Türkçe | ❌ Türkçe |
| **en → gsw** | ⚠️ karşılık ✅, örnek çevirisi 0/8266 | ❌ | ❌ |
| **de → en** | ❌ Almanca karşılık sütunu yok | ❌ | ❌ |

## Ölçülen eksikler (2026-09-09)

```
words          gsw örnek cümle · İngilizce      8.266
words          gsw örnek cümle · Türkçe            351
words          en kursu · Almanca karşılık       7.175
words          en kursu · Almanca örnek çevirisi 7.175
skill_exercises  intro + gloss + açıklama       ~9.400 dize × 2 dil
lessons (780)    başlık, özet, sözcük, kalıp,
                 ANLATIM METNİ, rol yapma      ~44.000 alan × 2 dil
```

Derslerin `lecture` alanı öğretmenin **konuşma metni** ve tamamı Türkçe. Yani
en→de "eksik çeviri" değil, kursun o dilde yeniden anlatılması.

## Faz 1 — kod ✅ (bu commit)

Anadil ekseni artık kelime katmanında **gerçekten** çalışıyor.

- `glossFor(word, native)` — tek çözücü. Ana satır anadilde, ikinci satır
  İngilizce ayırt edici (ana satır zaten İngilizceyken düşer).
- **Karşılık yoksa `null` döner, Türkçeye DÜŞMEZ.** Kelime havuzdan elenir.
  Düşülseydi Alman kullanıcıya Türkçe anlam gösterirdik — eksik çevirinin en
  kötü biçimi, çünkü görünürde çalışıyor.
- Sunucu: `daily.ts`, `session.ts`, `weekly.ts`, `exam.ts`, `lessons/boss.ts` —
  soru, şık, çeldirici, yanlış iddia, benzerlik puanı, yazma eşanlamlıları.
  `makeRound`'un `native` parametresi **zorunlu**: varsayılan verilseydi yeni
  bir çağıran sessizce Türkçeye düşerdi.
- İstemci: on oyun + `why.ts` açıklamaları + yürüyüş modunun okuduğu metin.
- Kapı: `npm run test:gloss`, CI'da.

Bunun somut sonucu: **en→de kelime katmanında bugün çalışıyor** — yeni veri
istemiyor, veri zaten vardı; eksik olan koddu.

## Faz 2 — parite tamlık kapısı (sıradaki)

Her (anadil, hedef) çifti için tamlık **veriden ölçülür**, elle beyan edilmez;
eksik çift kullanıcıya **hiç sunulmaz**. Böylece hiçbir aşamada yarım çeviri
yayına çıkmaz ve fazlar birbirini beklemez.

- `coursesForNative` + `offeredToNewUsers` web kayıt defterine de gelecek
  (bugün yalnız mobilde var; web'de iki elle yazılmış liste duruyor ve
  İngilizce kursu web'den seçilemiyor).
- API çift doğrulaması: `nativeLang=en + course=en` sunucuda kabul ediliyor.
- Ayar başlığı "Uygulama dili" → **"Ana dilim"**: alan ikisini birden
  belirliyor ve kurs listesini de değiştiriyor.

## Faz 3 — veri

Sıra, en az veriyle en çok pariteyi açacak biçimde:

1. `words` · gsw örnek çevirileri (8.266 + 351) → **en→gsw** kelime katmanı
2. `words` · Almanca karşılık + örnek (7.175 + 7.175) → **de→en** kelime katmanı
3. `skill_exercises` · intro/gloss/açıklama
4. `lessons` · anlatım metni

Kaynak `data/app/words-*.json` (JSONL) ve `data/skills/`; tohumlama
`scripts/seed-*.ts`. Çeviriler **doğal** olmak zorunda: sözlük karşılığı değil,
o dilde nasıl söyleniyorsa öyle. Üretim parti parti ve her parti ölçülerek
yazılır (`data/meanings` hattının deseni).

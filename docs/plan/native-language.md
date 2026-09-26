# Anadil ekseni — en→de ve de→en

## İki eksen, üçüncüsü yok

Kullanıcının iki seçimi var: **anadil** (`profiles.native_lang`, aynı zamanda arayüz
dili) ve **hedef dil** (`profiles.course`). Duolingo, Babbel ve Busuu da `(from, to)`
çiftiyle çalışıyor. Ayrı bir "arayüz dili" ekseni yok ve olmayacak: aynı soruyu iki kez
sormak durum uzayını üçe katlar, yeni içerik üretmez.

## Sunulan çiftler

`coursesForNative()` hedefi anadille aynı olan kursu eler. Sunum bir beyan:
`PAIR_READY` (`src/lib/courses.ts` ve `mobile/src/lib/courses.ts`, ikisi birlikte değişir).

| Çift | Durum |
|---|---|
| tr → de, tr → en | açık |
| tr → gsw-zh | açık; yalnız Türkçe anadil için, yeni iş harcanmaz (Samet, 2026-09-10) |
| en → de | açık (2026-09-10) |
| de → en | açık (2026-09-11) |
| en → gsw-zh | kapsam dışı |

`offeredNativeLangs()` yalnız hazır çifti olan anadili seçtirir; kurssuz bir anadil
seçilemez.

## Nasıl çalışıyor

| Katman | Kaynak | Çözüm |
|---|---|---|
| Kelime | `words.tr`, `words.en`, `words.de_gloss`, `beispiel_*` | `glossFor(word, native)` (`src/lib/option-label.ts`) |
| Konuşma, beceri, deneme sınavı, haftalık quiz, can-do | Kaynak Türkçe yüz + yazılmış çeviri hatları (`data/conversations/*`, `data/skills/prose*`, `data/skills/task*`, `data/mock-exams/prose`, `data/weekly-quiz/prose`) | Sözlük `src/lib/conversations/generated/native-{en,de}.json`, çözücü `native.ts` / `native-de.ts` |
| Mobil | Aynı sözlük ve çözücü | `npm run dump:native` döker, `check:dumps` bayt bayt karşılaştırır |

Kurallar:

- **Karşılık yoksa Türkçeye düşülmez.** `glossFor` `null` döner, kelime havuzdan elenir.
  Türkçeye düşmek görünürde çalışan en kötü eksik çeviridir.
- `makeRound`un `native` parametresi zorunlu; varsayılan olsaydı yeni bir çağıran sessizce
  Türkçeye düşerdi.
- Çözücü hep-ya-hiç: bir dizenin karşılığı yoksa o konuşma tümden çevrilmez.
- Sözlük build anında kurulur (`conversations:apply`: `vocab/triage.mjs` + `apply.mjs`).
  Türetilen `data/conversations/vocab/derived.json` commit edilmez; `apply.mjs` girdisi
  yoksa patlar.

## Kapılar

| Kapı | Ne ölçer | Tür |
|---|---|---|
| `check:pairs` | Beyan ile veri tutuyor mu (kelime katmanı, üretim veritabanından okur); hazır olmayan çift tamamlandıysa uyarır | beyan |
| `test:gloss` | `glossFor` ve oyunların anadil davranışı | kod |
| `check:en-de` | İngilizce kursun Almanca karşılık ve örnek çevirileri (`data/en-de`) | yazılan |
| `check:skills-task`, `check:skills-task-de` | Beceri görev metni | yazılan |
| `check:mock-prose`, `check:mock-prose-de` | Deneme sınavı metni | yazılan |
| `check:conversations-prose-de`, `check:skills-prose-de` | Konuşma ve beceri düz metninin Almancası | yazılan |
| `check:quiz-prose`, `check:quiz-prose-de` | Haftalık quiz metni | yazılan |
| `check:conversations-cando`, `check:conversations-cando-de` | Can-do köprüsü (çözücüden geçmez, eksik ifade sessizce düşer) | yazılan |
| `check:conversations-native` | Çözülmüş konuşma çıktısı | varan |
| `check:skills-native`, `check:mock-native`, `check:quiz-native` | Çözülmüş egzersiz, sınav, quiz çıktısı | varan |
| `check:native-de` | `native-de.json`ı açıp İngilizce kursun konuşma, egzersiz ve kâğıtlarında çözücüyü çalıştırır; çıktıda Türkçe kaldı mı alan adına bakmadan tarar | varan |
| `check:conversations-swap` | Takas tablosu kaynakla tutuyor mu, karara bağlanmamış iz kaldı mı | içerik |
| `report:native` | Envanter raporu (kapı değil) | rapor |

CI'da "Ana dil çözücüsü" adımı (`.github/workflows/checks.yml`); `check:en-de`,
`check:dumps`, `test:gloss` ayrı adımlarda. `check:pairs` üretimi okuduğu için CI'da değil.

### Yazılanı ölçen kapı, uygulamaya varanı göremez

İki ayrı soru var: "hat yazıldı mı" ve "yazılan uygulamaya ulaşıyor mu". Bir hat
tamamlanıp çözücüye hiç bağlanmamış olabilir. Örnek: `data/mock-exams/prose/`
6.627/6.627 yazılmıştı, `check:mock-prose` yeşildi, ama `apply.mjs` dizini okumuyordu ve
hiçbir dize uygulamaya ulaşmıyordu. Bu yüzden her yazan hattın bir **varan** çifti var
(`-native` ekliler, `check:native-de`).

Aynı ayrım taramada da geçerli: "çözücü doğru yerde çağrılıyor mu" ile "çözücü nesnenin
tamamını kapsıyor mu" ayrı sorular. Alan adına bakan ölçüt yalnız bildiği alanları görür;
bu yüzden varan kapılar çıktının her dizesini tarar.

## Anadile bağlı içerik

Türkçe yüzün bir kısmı Almanca hakkında değil, öğrencinin anadili hakkında konuşuyor.
Böyle cümleler çevrilmez, yeniden kurulur.

| Durum | Karar |
|---|---|
| Sözlük istemi ("Türkçesi '…' demek") | Taşınan şey cümle değil karşılık; hedef dildeki karşılık yazılır |
| İddia yeni anadil için **yanlış** ("Türkçede 'haftada iki kez' deriz, Almancada sıra ters" — İngilizcede sıra Almancayla aynı) | Cümle o anadile göre yeniden kurulur; gerekirse olmayan karşıtlık eklenir ("oturuyorum" / `I have lived`) |
| İddia doğru ama ilgisiz ("Türkçe ile Almanca akraba değil") | Çevrilir; Almanca alanla birlikte karara bırakılır |
| Örnek ad, şehir ("Soyadım Yılmaz") | Olduğu gibi kalır |
| **Kişi olgusu**: diyalogdaki biri Türkiyeli | Kalır |
| **Öğrencinin kendi örnek cevabı**: "Ich komme aus der Türkei" | Takas edilir (aşağıda) |

Tarama iki durumu ayıramaz; ayıran şey cümlenin konuşmadaki rolü. Aynı dize iki
konuşmada farklı karar alabilir, bu yüzden takas anahtarı konuşmaya bağlı.

### Takas katmanı (`data/conversations/swap/en.json`)

Elle yazılan karar tablosu: `swap[(konuşma, özgün Almanca)]` ve
`swapEn[(konuşma, özgün İngilizce)]`, her satırın gerekçesi yanında.

- **Sıra:** önce Türkçe→İngilizce çözülür (özgün Almancayla, anahtarlar tutsun), sonra
  Almanca takas edilir. Ekrana giden metin takaslı, anahtar özgün.
- Tanıma hedefi de takas edilir; yoksa öğrenci ekrandaki cümleyi söyler ve yanlış sayılır.
- Takas atomik parçaya uygulanır, çalışma anında kurulan bitmiş satıra değil.
- **Takasın birimi anlamı taşıyan birimdir:** anlatımda cümle, diyalogda replik.
  Replikler birbirini kısıtlar; tek kelime takası konuşmayı çelişkiye düşürebilir.
- Taramanın kör noktaları: `fallback.example`, `chat.openingTr`, Türkçe parçaya gömülü
  Almanca cümle. `Türk` ölçütü `die Türklingel`i yakalar; `Türk(?=[ei])` kullanılır.

## Dersler

- **"Eksikse kendini kapat" çalışma anı politikası olabilir, build anı politikası
  olamaz.** `native-server.ts` sözlüğü bulamayınca özelliği sessizce kapatıyordu;
  `derived.json` `.gitignore`da olduğu için sunucu build'inde İngilizce kurs hiç
  açılmıyordu ve hiçbir yerde hata yoktu. Çözüm: dosyayı üret, girdi yoksa patla, CI'da
  varan kapıyı koş.
- **Kapı yanlış öterse önce ölç.** Almanca ölçütü daraltmak 3 yanlış pozitifi
  düzeltirken 107 gerçek açıklığı kaybediyordu; Türkçe tarafı genişletmek aynı üçünü
  düzeltip gerçekleri korudu. Kanıtı korumak gürültüyü susturmaktan önce gelir.
- **Görünürlük sezgisi kapsam ölçmez.** Deneme sınavları 4.920 dize sanıldı, 6.627
  çıktı. Kapsam alandan sayılır, dizeye bakan sezgiden değil.
- **Yarım hat kapıya bağlanmaz.** Aylarca kırmızı yanan kapı okunmaz; okunmayan kapı
  olmayan kapıdır. Hat tamamlanınca CI'ya alınır.
- **Yazılıp hiç çalışmayan kural** kapının en sessiz kusurudur: liste dolar, ölçüm
  değişmez. Yeni kural enjeksiyonla denenir (ör. ASCII `\b` Türkçe harfte çalışmaz).
- Çeviri turu Türkçe kaynağın hatasını da görür; bulunan kaynak hatası kaynakta düzeltilir.

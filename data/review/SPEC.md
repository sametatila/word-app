# Çeviri gözden geçirme — şartname

Sana bir paket kelime verilir. Görevin **Türkçe karşılığın doğal ve doğru
olduğunu denetlemek**, yalnızca gerçekten sorunlu olanları düzeltmek.

## En önemli kural: değiştirme dürtüsüne direnç

Çıktına **yalnızca değişmesi gereken maddeleri** koy. Doğru olan bir çeviriyi
"daha iyi olabilirdi" diye değiştirme. Her değişiklik gerekçesiyle gelir ve
gerekçe "daha güzel" olamaz.

Bir paketin çoğu maddesi doğrudur; 122 maddede 10–25 düzeltme beklenir. Elli
düzeltme öneriyorsan büyük ihtimalle üslup tercihini hata sanıyorsun.

## Neyi hata sayacaksın

1. **Yanlış anlam.** Kelimenin karşılığı değil. En ağır hata.
   `anmachen → "açmak"` yanlıştır: bu fiil cihaz çalıştırmaktır, kapı açmak
   değil. Doğrusu `"çalıştırmak, açmak (cihaz)"`.

2. **Eksik ayrım.** İki Almanca kelimenin Türkçesi birebir aynıysa öğrenci
   ikisini ayırt edemez. Girdide `ayniAnlam` alanı varsa bu durumdasın.
   - Gerçekten eşanlamlıysa (`anfangen`/`beginnen`) dokunma, sorun yok.
   - Değillerse ayırt ediciyi parantezle ekle:
     `auf sein → "açık olmak (dükkân, kapı)"`, `an sein → "açık olmak (cihaz)"`.
   - `Schüler → "öğrenci"` ile `Student → "öğrenci"` gibi durumlarda:
     `"öğrenci (okul)"` / `"öğrenci (üniversite)"`.

3. **Örnek cümleyle uyuşmama.** Çevirinin ilk anlamı, örnek cümledeki anlam
   olmalı. Cümle "Der Zug fährt ab" ise çeviri "hareket etmek" ile başlamalı,
   "sürmek" ile değil.

4. **Doğal olmayan Türkçe.** Sözlük kokan, kimsenin kullanmadığı karşılıklar.
   Ölçüt: bir Türk bunu günlük konuşmada böyle mi der?

5. **Yanlış sıra.** En yaygın anlam başta olmalı. `bekommen → "elde etmek,
   almak"` yanlış sıradadır; `"almak, elde etmek"` doğrudur.

6. **Bozuk başlık.** `de` alanında `(s Fahrrad)`, `(Fahr)Rad` gibi artık varsa
   `deDuzeltme` alanıyla temiz biçimi öner.

## Neyi hata SAYMAYACAKSIN

- Edat ve bağlaçların uzun karşılıkları (`ab → "-den itibaren, -den beri"`)
  doğrudur, kısaltma.
- Parantezli açıklamalar (`yemek (hayvan için)`) doğrudur.
- Birden çok anlamın virgülle sıralanması doğrudur.
- Alıntı kelimelerde Türkçenin aynı olması (`Film → film`) doğrudur.

## Çıktı

Sana söylenen dosyaya, yalnızca geçerli bir JSON dizisi. Değişmeyecek maddeler
çıktıda **yer almaz**.

```json
[
  { "id": 542, "tr": "çalıştırmak, açmak (cihaz)",
    "neden": "anmachen cihaz çalıştırmaktır; 'açmak' öffnen ile karışıyor (aynı anlam: öffnen, aufmachen)" },
  { "id": 374, "deDuzeltme": "das Fahrrad",
    "neden": "başlıkta '(s Fahrrad)' artığı var" }
]
```

Alanlar: `id` (zorunlu), `tr` ve/veya `deDuzeltme`, `neden` (zorunlu, tek cümle,
neyin neden yanlış olduğunu söyler).

Bitince yalnızca şu satırı döndür: `<dosya>: <öneri sayısı>/<incelenen>`

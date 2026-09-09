# İngilizce örnek cümlelerin Almanca çevirisi

Amaç tek bir eksiği kapatmak: `de→en` paritesinde örnek cümlenin Almanca
çevirisi 0/7.175. Karşılık katmanı kapandı (7.175/7.175), kalan tek şey bu.

## Neden türetilemiyor

Ölçüldü: İngilizce örnek cümleler Almanca cümlenin çevirisi **değil**, aynı
kelime için bağımsız yazılmış cümleler.

    «pflegen»  Almanca : Sie pflegt ihre kranke Mutter seit zwei Jahren.
               İngilizce: Nurses care for patients day and night.

Sayı kümeleri %99.6 örtüşüyor ama bu yanıltıcı — cümlelerin çoğunda sayı yok.
Devralınsaydı kullanıcı cümleyle ilgisiz bir çeviri görürdü.

## Kural

Almanca cümle, İNGİLİZCE CÜMLENİN çevirisi olmak zorunda — kelimenin başka bir
örneği değil. Kullanıcı ekranda İngilizce cümleyi görüyor ve altında bunu
okuyor; ikisi başka şey söylerse çeviri yalan söyler.

Çeviri **doğal Almanca** olmalı: sözlük karşılığı değil, o dilde nasıl
söyleniyorsa öyle. Kelimesi kelimesine çeviri ("I am afraid" → "Ich bin
ängstlich") bir Almanın kurmayacağı cümledir.

## Denetim (`check.mjs`)

Hata (üretimi durdurur):

- boş
- nokta/ünlem/soru işaretiyle bitmiyor
- birden çok cümle — kullanıcı tek satır görüyor
- sayı kümesi İngilizceyle aynı değil
- soru/düz cümle uyuşmuyor
- uzunluk 3–16 kelime dışında (iki havuz da 3–14 arasında; Almancaya pay var)
- Almanca karşılık cümlede geçmiyor (`data/meanings/contains.mjs` ile — bu
  denetleyici 8.267 madde üzerinde çalışılmış, yeniden yazılmıyor)

Uyarı (durdurmaz):

- İngilizce cümlenin aynısı — büyük ihtimalle çevrilmemiş
- İngilizceden üçte birden fazla uzun ya da kısa

## Hat

    node data/en-de/make-packets.mjs        # in/ üretir (gitignore)
    <paketi yaz>                            # out/<paket>.json
    node data/en-de/check.mjs [paket|seviye|all]

`in/` üretiliyor ve kaynaktan her an yeniden kurulabiliyor; repoda durması
yalnız gürültü. `out/` commit'lenir — tohumlama oradan okuyor.

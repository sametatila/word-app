# Züritüütsch örnek cümle yenileme — şartname

Almanca örnek cümleler baştan yazıldı: her kelime artık tek, tam ve kelimeyi
gerçekten içeren bir cümle taşıyor. Züritüütsch kursu aynı kelimeleri gösterdiği
için lehçe cümlelerinin de bu yeni cümlelerle **aynı cümle** olması gerekiyor.

Neden aynı cümle: Türkçe ve İngilizce çeviriler tek bir yerde tutuluyor ve iki
kursta da aynı satırdan okunuyor. Lehçe cümlesi başka bir şey anlatırsa çeviri
yalan söyler — ve bu daha önce başa geldi: yerelleştirilmiş cümlelerde
(`Ich wohne in Berlin` → `Ich wohne z Züri`) devralınan çeviri yanlış kaldığı
için 352 maddede çeviri hiç gösterilemiyor.

## Görev

Her madde için tek bir alan üretirsin: `beispiel` — Almanca cümlenin doğal
Züritüütsch karşılığı.

**Önce elindekine bak.** Pakette `currentGsw` alanı var: o maddenin bugünkü
lehçe cümlesi. Bu cümle
- yeni Almanca cümlenin sadık bir karşılığıysa,
- tek cümleyse,
- ve `gsw` alanındaki kelimeyi taşıyorsa

**aynen koru**. Değiştirmek için sebep gerekir; "daha iyi olabilirdi" sebep
değildir. Paketin çoğu maddesinde cümle değişmemiştir.

Aksi hâlde `beispielDe` alanındaki **yeni** Almanca cümleyi Züritüütsch'e çevir.

## Bağlayıcı kurallar

Yazım, ses denklikleri, dil bilgisi ve İsviçre sözcük tercihleri için
`data/zurich/style-guide.md` bağlayıcıdır — onu oku, buradaki kurallar onun
üstüne biner.

1. **Cümle `gsw` alanındaki kelime biçimini içerir.** Çekimli hâl kabul;
   Züritüütsch kökü taşımalı. Boşluk doldurma turu bu kelimeyi cümlede arıyor.
2. **Tek cümle**, 3–13 kelime, nokta/soru/ünlem ile biter.
3. **Präteritum yok**: Präsens ya da Perfekt.
4. **Yer adları yerelleştirilmez.** Bu bir değişiklik: eskiden Berlin → Züri
   yapılıyordu ve çeviri bu yüzden yanlış kalıyordu. Almanca cümlede Berlin
   geçiyorsa lehçe cümlede de Berlin geçer. Zürihli biri de Berlin'den söz
   edebilir; kastedilen doğallık şehir değil, dilin kendisi.
5. **Sayılar, özel isimler ve saatler aynen kalır.** Çeviri onlara dayanıyor.
6. **Helvetismus korunur**: Almanca cümlede `Fahrrad` geçiyorsa lehçe cümlede
   `Velo` olur — bu bir yer adı değil, kelimenin İsviçre'deki karşılığı ve
   çeviriyi bozmaz ("bisiklet" / "bike" ikisi için de doğru).

## Çıktı

Sana söylenen dosyaya, yalnızca geçerli bir JSON dizisi. Paketteki her madde
çıktıda yer alır, kaynakla aynı sırada, id değiştirilmeden.

```json
[{ "id": 3, "beispiel": "De Zug faart grad ab." }]
```

Yazdıktan sonra kendin denetle:

```
node data/zurich/beispiel/check.mjs <paket-adı>
```

Temiz çıktı alana kadar düzelt. Bitince yalnızca şu satırı döndür:
`<paket>: <madde sayısı> tamam, <korunan> korundu, <yazılan> yeniden yazıldı`.

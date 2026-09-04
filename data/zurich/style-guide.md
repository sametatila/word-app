# Züritüütsch Dönüşüm Stil Rehberi

Bu rehber, havuzdaki Standart Almanca (Hochdeutsch) maddelerin
Zürih Almancasına (Züritüütsch) çevrilmesinde **bağlayıcıdır**. Amaç: tutarlı,
doğal, Zürih şehrinde konuşulan güncel dil. Yazım: **Dieth-Schreibung'a dayalı,
sadeleştirilmiş** (aşağıdaki kurallar neyse o; başka kaynakla çelişirse bu rehber kazanır).

## Yazım ve ses denklikleri

1. **Söz başı K → Ch**: Kind→Chind, kaufen→chaufe, Küche→Chuchi, kalt→chalt.
   İstisna: yabancı/alıntı kelimeler K kalır (Kino, Kamera, Kaffi).
2. **Mastar -en → -e**: mache, wohne, arbeite; -ern→-ere (wandere), -eln→-le (sammle).
3. **Uzun ünlüler çift yazılır**: mhd. î → ii (Zeit→Ziit, bleiben→bliibe),
   uu (Haus→Huus, brauchen→bruuche), üü (Leute→Lüüt, Häuser→Hüüser).
4. **mhd. ei kalır äi/ei**: zwei→zwäi, Ei→Äi, heiss→häiss. (Wein→Wii değil Wäi DEĞİL —
   Wein mhd. î'dir: Wii. Emin değilsen: Almanca "ei" İngilizce kökteşinde "i/o" ise ii
   (Wein/wine→Wii, Zeit/tide→Ziit); kökteşte "o/oa" ise äi (zwei/two→zwäi, Stein/stone→Stäi).)
5. **İç seste -st-/-sp- → -scht-/-schp-**: Fest→Fäscht, bester→bescht, Wespe→Wäschpi.
   Söz başı st-/sp- zaten scht-/schp- okunur ve öyle yazılır: Strasse→Straass, spielen→schpile.
6. **Küçültme -chen/-lein → -li**: Mädchen→Meitli, Brötchen→Brötli.
7. **Sondaki -e çoğunlukla düşer**: Sprache→Spraach, Farbe→Farb, Woche→Wuche→Wuche (kalır!)
   — tek heceye inecekse veya kulağa doğal geliyorsa düşür; emin değilsen düşürme.
8. **ß asla kullanılmaz**: her zaman ss.
9. **e sesi kapalı/açık ayrımı**: vurgulu açık e için ä kullan (Fest→Fäscht, Mensch→Mäntsch).

## Dil bilgisi

10. **Belirli artikel**: der→**de**, die→**d**, das→**s**. Çıktıdaki `artikel` alanına
    yalnızca bu üç değerden biri (isim değilse null) yazılır.
11. **Belirsiz artikel** (örnek cümlelerde): en (er.), e (diş.), es (nö.).
12. **Präteritum yok**: örnek cümleler Präsens veya Perfekt olur.
13. **Genitiv yok**: "vom Vater" tipi çözümler: em Vatter sis Huus / s Huus vom Vatter.
14. **İlgi cümlesi "wo"**: de Maa, wo dört wohnt.
15. **Yaygın çekimler**: ich bi, du bisch, er isch, mir sind, ich ha, du häsch, er hät,
    mir händ, ich gaa/gang, ich chume, ich weiss/wäiss.

## Düzensiz/temel kelimeler (değişmez liste)

sein→sii · haben→haa · gehen→gaa · kommen→choo · sehen→gsee · geben→gää ·
nehmen→nää · stehen→schtaa · lassen→laa · tun→tue · wissen→wüsse · sagen→säge ·
nicht→nöd · etwas→öppis · jemand→öpper · nichts→nüüt · auch→au · auf→uf ·
aus→us · schon→scho · jetzt→jetz · heute→hüt · morgen→morn · gestern→geschter ·
immer→immer · sehr→sehr · schön→schöön · klein→chlii · gross→grooss ·
Frau→Frau · Mann→Maa · Kind→Chind · Haus→Huus · Jahr→Jaar · arbeiten→schaffe ·
sprechen→rede · schauen/sehen (bakmak)→luege · hören (dinlemek)→lose

## İsviçre sözcük tercihleri (Helvetismus — Almanca kelimeyi ÇEVİRME, İsviçre karşılığını KOY)

Fahrrad→**s Velo** · Fahrkarte→**s Billett** · Straßenbahn→**s Tram** ·
Frühstück→**s Zmorge** · Mittagessen→**de Zmittag** · Abendessen→**de Znacht** ·
Friseur→**de Coiffeur** · Eis(creme)→**d Glace** · Gehsteig→**s Trottoir** ·
grillen→**grilliere** · parken→**parkiere** · Guten Tag→**Grüezi** ·
Tschüss→**Ade / Tschau** · Junge→**de Bueb** · Mädchen→**s Meitli**

## Örnek cümle kuralları

- Verilen Almanca `beispiel` cümlesini **doğal Züritüütsch'e** çevir; birebir kelime
  çevirisi değil, Zürihli birinin söyleyeceği hâli.
- Cümle **mutlaka `gsw` alanındaki kelime biçimini içermeli** (boşluk doldurma oyunu
  bu kelimeyi cümlede arar). Çekimli hâl kabul (gsw kökünü taşımalı).
- Kaynakta beispiel yoksa boş bırak ("").

## Çıktı biçimi

Her madde için TAM OLARAK şu alanlar:
```json
{ "id": 123, "gsw": "s Velo yerine yalnız Velo — artikel ayrı alanda", "artikel": "s", "beispiel": "Ich fahre jede Tag mit em Velo i d Schtadt." }
```
- `id`: kaynaktaki id, DEĞİŞTİRME.
- `gsw`: kelimenin Züritüütsch biçimi, artikelsiz. Fiiller mastar hâlde.
- `artikel`: "de" | "d" | "s" | null.
- `beispiel`: Züritüütsch örnek cümle ya da "".
- Kaynaktaki `tr`, `typ`, `niveau`, `rank` aynen devralınır; çıktına YAZMA.
- Sıra ve madde sayısı kaynak parçayla birebir aynı olmalı.

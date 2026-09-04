# B1 — havuz boşluğunun vetosu (Adım 3)

`docs/plan/b1-yeniden-kurgu.md` §5 Adım 3'ün çıktısı. B1 derslerinin öğrettiği
500 kelimeden **116'sı havuzda hiç yoktu**. Hepsi tek tek karara bağlandı.

Bu tablo dersleri yeniden kurgularken kaynak olarak kullanılacak: **D** satırındaki
hiçbir kelime yeni sözlükçeye girmeyecek, **A** satırındakiler havuzun yazımıyla
yazılacak.

## Karar kuralları — vetodan ÖNCE yazıldı, sonra harfiyen uygulandı

| | Kural | Sonuç |
|---|---|---|
| **A** | Havuzda aynı anlamı taşıyan kayıt zaten var; ders varyant yazmış | Havuza dokunma, **dersi havuzun yazımına çevir** |
| **B** | §4.4 anlamında türev: çoğul, Partizip, derece | Madde başı değil; ders başka kelime alır |
| **C** | Gerçek B1 madde başı | **Havuza ekle** (id 8450+, rank `de_50k.txt`'ten) |
| **D** | Şeffaf bileşik · üretken türetme · seviye üstü · çok dar | Havuza ekleme, **dersten çıkar** |

C ile D arasındaki ayrım üç ölçüte dayandı:

1. **Türetilebilir mi?** Parçaları havuzda olan şeffaf bileşik (`der Abendkurs`
   = `der Abend` + `der Kurs`) öğrenciye yeni bir şey öğretmiyor. Üretken
   sonekler de öyle: `-ung`, `-bar`, `-los`, `-sam`, `-er`.
2. **Sıklık.** `data/a2-expansion/de_50k.txt` satır numarası. Tek başına karar
   vermedi — `die WG` 31263. sırada ama kısaltma olduğu için listede düşük
   görünüyor, oysa Almanya'da yaşamanın çekirdek sözcüğü.
3. **Kökü hangi seviyede?** Kökü B2/C1 olan bir türev B1 maddesi olamaz:
   `zuversichtlich` ← `die Zuversicht` [B2] · `der Gutachter` ← `das Gutachten` [C1] ·
   `der Ausbau` ← `ausbauen` [B2] · `der Hauptdarsteller` ← `der Darsteller` [B2].

Gloss gözle okundu (brief §5 Adım 4, tuzak 5). İki yerde ders ile havuz aynı
yazımda ANLAMCA ayrışıyordu ve bu ayrım C kararını verdi: havuzdaki `einsetzen`
görevlendirmek, `sich einsetzen` savunmak; havuzdaki `wenden` U dönüşü yapmak,
`sich wenden` başvurmak.

## Sonuç

| Karar | Sayı | Havuza etkisi |
|---|---|---|
| A — havuzda zaten var | 3 | yok |
| B — türev | 3 | yok |
| C — havuza eklendi | 32 | B1 katmanı 1797 → **1829** |
| D — dersten çıkar | 78 | yok |
| **toplam** | **116** | |

Payda büyüdüğü için hedef kapsama yeniden hesaplandı: 1296 B1 slotu ÷ 1815
normalize başlık = **%71,4** (eklemeden önce %72,7). Ders sayısı kararı (180)
değişmedi.

---

## A — havuzda zaten var (3)

| Ders kelimesi | Gerekçe |
|---|---|
| `sich entscheiden` | havuzda `entscheiden` [B1] = 'karar vermek' — birebir aynı anlam |
| `sich leisten` | havuzda `leisten` [B1] = 'gücü yetmek' — havuzun glossu zaten dönüşlü anlamı veriyor |
| `sich melden` | havuzda `melden` [B1] = 'bildirmek' — aynı lemma, dönüşlü kullanım aynı maddede öğretilir |

## B — türev, madde başı değil (3)

| Ders kelimesi | Gerekçe |
|---|---|
| `die Gefühle` | `das Gefühl` [B1] çoğulu — §4.4: çoğul madde başı değil |
| `die Wurzeln` | `die Wurzel` [A2] çoğulu — hem türev hem seviye altı |
| `renoviert` | `renovieren` [A2] Partizip II'si — §4.4: Partizip madde başı değil |

## C — havuza eklendi (32)

| id | Madde | Türkçesi | rank | Gerekçe |
|---|---|---|---|---|
| 8450 | `offensichtlich` | besbelli | 1235 | kanı bildirmenin çekirdeği; havuzda karşılığı yok |
| 8451 | `die Panik` | panik | 2170 | sınav/acil durum dersleri taşıyıcısı; türetilemez |
| 8452 | `bewusst` | bilinçli | 2172 | sık ve türetilemez sıfat |
| 8453 | `weiterhin` | bundan böyle de | 2181 | `weiter`den anlamca ayrı bağlaç zarfı |
| 8454 | `der Trick` | numara, hile | 2261 | sık, türetilemez |
| 8455 | `hiermit` | işbu yazıyla | 2704 | resmî mektubun kalıp sözcüğü; B1 yazma becerisi bunu istiyor |
| 8456 | `die Stärke` | güçlü yön | 2773 | `stark` [A2] var ama isim ayrı bir kavram; iş görüşmesinin çekirdeği |
| 8457 | `zusehen` | seyretmek | 2965 | `sehen`den anlamca ayrı ayrılabilir fiil |
| 8458 | `berühren` | dokunmak, duygulandırmak | 3343 | `rühren` [A2] ile anlamca ilgisiz |
| 8459 | `die Schwäche` | zayıf yön | 3813 | `die Stärke` ile çift; ikisi bir arada öğretiliyor |
| 8460 | `sich einsetzen` | savunmak, çaba göstermek | 4250 | havuzdaki `einsetzen` 'görevlendirmek' — dönüşlüsü ayrı kavram |
| 8461 | `sich wenden` | başvurmak, birine yönelmek | 3329 | havuzdaki `wenden` 'U dönüşü yapmak' — dönüşlüsü ayrı kavram |
| 8462 | `der Vorfall` | olay, vaka | 4265 | sigorta/resmî dil çekirdeği; `Fall`dan anlamca ayrı |
| 8463 | `der Charakter` | karakter | 4493 | insan betimlemenin çekirdeği; türetilemez |
| 8464 | `die Ansicht` | kanı, görüş | 5454 | 'meiner Ansicht nach' B1 fikir kalıbı |
| 8465 | `unsicher` | emin olmayan, güvensiz | 5533 | `sicher` [A1] olumsuzu ama anlamı öngörülemez (güvensiz/kararsız) |
| 8466 | `die Haltung` | duruş, tutum | 5973 | hem beden hem tutum; `Halt`tan ayrı |
| 8467 | `sich beschäftigen` | bir işle uğraşmak | 6061 | havuzdaki `beschäftigen` 'çalıştırmak' — dönüşlüsü ayrı kavram |
| 8468 | `der Bezirk` | semt, ilçe | 6181 | şehir ve resmî dilde sık; türetilemez |
| 8469 | `die Dosis` | doz | 6345 | eczane/ilaç dersinin taşıyıcısı |
| 8470 | `das Argument` | argüman, sav | 6995 | tartışma modülünün çekirdeği |
| 8471 | `die Konzentration` | konsantrasyon | 7212 | öğrenme yöntemleri dersinin çekirdeği |
| 8472 | `die Branche` | sektör | 7373 | iş dünyası modülünde sık; türetilemez |
| 8473 | `die Tonne` | konteyner, varil | 10473 | çöp ayrıştırma dersinin taşıyıcısı; bağımsız bir isim |
| 8474 | `ablaufen` | süresi dolmak | 10739 | vize/belge dilinin çekirdeği; `laufen`dan anlamca ayrı |
| 8475 | `die Motivation` | motivasyon | 12544 | başvuru mektubu ve öğrenme derslerinin ortak sözcüğü |
| 8476 | `flüssig` | akıcı | 16949 | havuzda `die Flüssigkeit` [B1] var ama sıfatı yok — gerçek boşluk |
| 8477 | `sich wohlfühlen` | kendini iyi hissetmek | 17216 | günlük dilin çekirdek kalıbı; `fühlen`den ayrı |
| 8478 | `die Hochschule` | yükseköğretim kurumu | 20942 | kurum adı; 'high school' sanılan gerçek bir yanlış dost |
| 8479 | `die WG` | paylaşımlı ev | 31263 | Almanya'da yaşamanın çekirdek sözcüğü; kısaltma olduğu için sıklık listesinde düşük görünüyor |
| 8480 | `schwerfallen` | zor gelmek | 38238 | 'es fällt mir schwer' B1 konuşmasının kalıbı |
| 8481 | `das Grundgesetz` | anayasa | — | vatandaşlık dersinin taşıyıcısı; Grund+Gesetz'ten anlamca türetilemez |

## D — havuza eklenmedi, dersten çıkacak (78)

| Ders kelimesi | Gerekçe |
|---|---|
| `im Nachhinein` | sıklık 20955; havuzda `nachher` [B1] ve `danach` [B1] zaten var |
| `die Fremde` | `fremd` [A1] adlaşmış hâli; yazın dili |
| `die Vision` | sıklık 4098 ama Türkçeye 'vizyon' diye geçen boş bir alıntı; öğretecek şeyi yok |
| `der Regisseur` | tek bir film dersine bağlı dar sözcük |
| `die Ferne` | `fern` adlaşmış hâli; yazın dili |
| `der Transporter` | tek derse bağlı dar sözcük |
| `der Nachfolger` | brief'in kendisi iş yeri jargonu diye işaretlemiş; sıklık 7650 |
| `zerrissen` | Partizip II, kökü (`zerreißen`) havuzda yok; mecazi kullanım B2 |
| `sich anvertrauen` | kökü `anvertrauen` [A2]; dönüşlü kullanımı B2 kaydı |
| `die Beobachtung` | `beobachten` [B1] + -ung; üretken adlaştırma |
| `der Helfer` | `helfen` [A1] + -er; üretken fail adı |
| `effektiv` | alıntı sıfat; B1 `gut`/`nützlich` ile aynı işi görür |
| `zuversichtlich` | kökü `die Zuversicht` [B2] |
| `zäh` | mecazi ve dar |
| `der Mentor` | alıntı, dar |
| `schiefgehen` | `schief` [B1] + `gehen` [A1]; şeffaf |
| `endlos` | `das Ende` [A1] + -los; üretken |
| `wiederfinden` | `wieder` [A1] + `finden` [A1]; şeffaf |
| `die Vorliebe` | sıklık 12653, dar; `mögen`/`der Geschmack` yeter |
| `die Wendung` | `wenden` [B1] + -ung; dar (olay dönüşü) |
| `die Demo` | `die Demonstration` [B2] kısaltması |
| `die Abrechnung` | `die Rechnung` [A1] türevi; bürokratik ve dar |
| `der Einblick` | `der Blick` [A1] + ein-; mecazi |
| `das Tierheim` | `das Tier` + `das Heim` [B1]; şeffaf bileşik |
| `dazugehören` | `gehören` [A1] + dazu; şeffaf |
| `sich einschreiben` | dar; `sich anmelden` aynı işi görüyor |
| `vorhersehbar` | üretken -bar türetmesi |
| `verspannt` | Partizip, kökü havuzda yok; dar |
| `die Besuchszeit` | `der Besuch` + `die Zeit` [A1]; şeffaf |
| `zeitlich` | `die Zeit` [A1] + -lich; üretken |
| `der Hauptdarsteller` | `der Darsteller` [B2] bileşiği |
| `die Nutzung` | `nutzen` [B1] + -ung; üretken adlaştırma |
| `kombinieren` | alıntı; `zusammen benutzen` yeter |
| `zusammenhängen` | havuzda `der Zusammenhang` [B1] zaten var; fiil sıklığı 24091 |
| `der Steuerberater` | `die Steuer` [B1] + `der Berater` [A2]; şeffaf |
| `zurückblicken` | `zurück` + `blicken`; şeffaf |
| `der Gutachter` | kökü `das Gutachten` [C1] |
| `auftanken` | `tanken` [B1] mecazi kullanımı |
| `der Zeitdruck` | `die Zeit` [A1] + `der Druck` [B1]; şeffaf |
| `entmutigt` | Partizip, kökü havuzda yok |
| `sich weiterentwickeln` | `entwickeln` [B1] + weiter-; şeffaf, sıklık 30457 |
| `belastend` | Partizip I, kökü `belasten` [B2] |
| `abstrakt` | sanat dersine bağlı dar alıntı |
| `abwechseln` | `wechseln` [A2] + ab- |
| `mitsingen` | `singen` [A2] + mit-; şeffaf |
| `das Transparent` | dar (pankart); ayrıca `transparent` sıfatıyla karışır |
| `der Verbrauch` | `verbrauchen` [B1] adlaştırması |
| `der Fahrlehrer` | `fahren` + `der Lehrer` [A1]; şeffaf |
| `die Fahrstunde` | `fahren` + `die Stunde` [A1]; şeffaf |
| `der Ausbau` | kökü `ausbauen` [B2] |
| `die Einarbeitung` | brief'in kendisi iş yeri jargonu diye işaretlemiş |
| `die Kernzeit` | brief'in kendisi 'B1 için fazla olabilir' diye işaretlemiş |
| `brutto` | brief'in kendisi 'B1 için fazla olabilir' diye işaretlemiş |
| `der Putzplan` | `putzen` [A2] + `der Plan` [A1]; şeffaf |
| `die Nachzahlung` | `die Zahlung` [B1] + nach-; bürokratik ve dar |
| `der Zwischenmieter` | `der Mieter` [B1] + zwischen-; çok dar |
| `der Sehtest` | `sehen` [A1] + `der Test` [A1]; şeffaf |
| `der Ersatztermin` | `der Ersatz` [B1] + `der Termin` [A1]; şeffaf |
| `das Lernziel` | `lernen` [A1] + `das Ziel` [A2]; şeffaf |
| `messbar` | `messen` [B1] + -bar; üretken |
| `der Zwischenschritt` | `der Schritt` [B1] + zwischen-; şeffaf |
| `der Abendkurs` | `der Abend` [A1] + `der Kurs` [A1]; şeffaf |
| `der Einstufungstest` | üç parçalı şeffaf bileşik, çok dar |
| `die Gruppengröße` | `die Gruppe` [A1] + `die Größe` [A1]; şeffaf |
| `die Karteikarte` | `die Karte` [A1] bileşiği; dar |
| `die Bildschirmzeit` | `der Bildschirm` [B1] + `die Zeit` [A1]; şeffaf |
| `empfehlenswert` | `empfehlen` [A1] + `wert` [B1]; şeffaf |
| `der Liedtext` | `das Lied` + `der Text` [A1]; şeffaf |
| `die Geschmackssache` | `der Geschmack` [B1] + `die Sache` [A1]; şeffaf |
| `der Beipackzettel` | `der Zettel` [A2] bileşiği; dar |
| `erholsam` | `sich erholen` [B1] + -sam; üretken |
| `der Impfpass` | `impfen` [A2] + `der Pass` [A1]; şeffaf |
| `die Auffrischung` | kökü `auffrischen` havuzda yok; ayrıca `die Impfung` bile [B2] |
| `der Gemeinschaftsgarten` | `die Gemeinschaft` [B1] + `der Garten` [A1]; şeffaf |
| `sorgenfrei` | `die Sorge` [B1] + `frei` [A1]; şeffaf |
| `unerfüllt` | `erfüllen` [B1] Partizip II'sinin olumsuzu |
| `die Zwischenbilanz` | kökü `die Bilanz` [B2] |
| `die Ausbildung abschließen` | iki A2 sözcüğünden kurulu eşdizim; madde başı değil |

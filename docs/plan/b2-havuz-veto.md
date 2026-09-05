# B2 — havuz boşluğunun vetosu (Adım 3)

`docs/plan/b2-yeniden-kurgu.md` §5 Adım 3'ün çıktısı. B2 derslerinin öğrettiği
500 kelimeden **166'sı havuzda hiç yoktu**. Hepsi tek tek karara bağlandı.

Bu tablo dersleri yeniden kurgularken kaynak: **D** ve **B** satırındaki hiçbir
kelime yeni sözlükçeye girmeyecek, **A** satırındakiler havuzun yazımıyla
yazılacak, **C** satırındakiler havuza eklendi.

## Ölçüm brief'ten altı yuva farklı çıktı

Brief 160 diyor, ölçüm 166 veriyor. Fark, dönüşlü ve edatlı biçimlerde:
`sich melden`, `sich entscheiden`, `sich vernetzen`, `sich steigern`,
`sich aufhalten`, `sich erweisen als`. Havuzda dönüşlüsüz kayıt var, ama
"dönüşlüsü aynı madde midir" bir karardır, otomatik eşleşme değil — B1'de tam
bu ayrım `sich einsetzen`, `sich wenden` ve `sich beschäftigen`'i havuza ayrı
madde olarak soktu. Bu yüzden hepsi eşleştirilmedi, aşağıda tek tek karara
bağlandı: beşi A (havuz kaydı aynı kavram), biri C (`sich aufhalten` —
havuzdaki `aufhalten` 'alıkoymak').

## Karar kuralları — B1 vetosundan devralındı

| | Kural | Sonuç |
|---|---|---|
| **A** | Havuzda aynı anlamı taşıyan kayıt zaten var; ders varyant yazmış | Havuza dokunma, **dersi havuzun yazımına çevir** |
| **B** | Türev: çoğul, Partizip I/II, üretken sonek (-ung, -heit, -keit, -bar, -sam, -schaft, -lich, -er) | Madde başı değil; ders başka kelime alır |
| **C** | Gerçek B2 madde başı | **Havuza ekle** (id 8535+, rank `de_50k.txt`'ten) |
| **D** | Şeffaf bileşik · üretken türetme · havuzda karşılığı var · çok dar | Havuza ekleme, **dersten çıkar** |

C ile D arasındaki ayrımda B1'in üç ölçütüne bir dördüncüsü eklendi:

1. **Türetilebilir mi?** Parçaları havuzda olan şeffaf bileşik
   (`der Ablaufplan` = `der Ablauf` [B2] + `der Plan` [A1]) yeni bir şey
   öğretmiyor.
2. **Sıklık.** `data/a2-expansion/de_50k.txt` satır numarası. Tek başına karar
   vermiyor: `die Maßnahme` tekil olarak 20180. sırada ama çoğulu
   (`Maßnahmen`) 7510 — kurum dilinde kelime neredeyse hep çoğul geçiyor.
   Aynı çarpıtma `der Umstand`ta da var (tekil 18592, çoğul 3215).
3. **Kökü hangi seviyede?** Kökü havuzda ve alt seviyedeyse türev, madde başı
   değil.
4. **Havuzda o kavram zaten var mı?** B2 katmanı 2041 madde ve ders yalnız 800
   yuva taşıyor — arz bol. B1'de oran darken (1296 yuva / 1815 madde) havuza
   eklemek makuldü; B2'de eklemenin eşiği yüksek. Bu yüzden `der Anstieg`
   eklenmedi (`die Zunahme` [B2] var), `die Kooperation` eklenmedi
   (`die Zusammenarbeit` [B1] var), `die Inspektion` eklenmedi
   (`die Wartung` [B2] var).

## Partizip kovası — kural kaybı değil, yuva kaybı

B kovasının önemli bir bölümü Partizip I ve Partizip II'nin sıfat kullanımı:
`laufend`, `steigend`, `zunehmend`, `erprobt`, `zugelassen`, `gestellt`,
`geregelt`, `verschlossen`, `gekippt`. Bunlar tam olarak `de-b2-partizip-1` ve
`de-b2-partizip-2` derslerinin **öğrettiği dilbilgisi**.

Sözlükçe yuvasında duramazlar: havuzda madde başı değiller, dolayısıyla SRS
kuyruğuna hiç girmezler ve ders onları bir kez gösterip bırakır. Ama
`patterns` ve `lecture` içinde havuzdaki fiilden türetilerek öğretilebilirler —
kural öğretilmeye devam eder, yuva havuzdaki bir kelimeye gider.

## Sonuç

| Karar | Sayı | Havuza etkisi |
|---|---|---|
| A — havuzda zaten var | 7 | yok |
| B — türev | 53 | yok |
| C — havuza eklendi | 20 | B2 katmanı 2041 → **2061** |
| D — dersten çıkar | 86 | yok |
| **toplam** | **166** | |

Payda büyüdüğü için kapsama tavanı yeniden hesaplandı: 800 yuva ÷ 2061 madde =
**%38,8** (eklemeden önce %39,2).

---

## C — havuza eklendi (20)

| id | Madde | Türkçesi | rank | Gerekçe |
|---|---|---|---|---|
| 8535 | `der Überblick` | genel bakış | 12709 | sunum dilinin çekirdeği; havuzda karşılığı yok (`die Zusammenfassung` özet demek, genel bakış değil) |
| 8536 | `das Anliegen` | talep, mesele | 9923 | resmî dilde bir kişinin "derdi"; `an`+`liegen`'den türetilemez |
| 8537 | `eingehen auf` | değinmek, üzerinde durmak | 3837 | tartışma ve sunumun taşıyıcısı; `eingehen` havuzda hiç yok |
| 8538 | `der Austausch` | fikir alışverişi | 6101 | havuzdaki `der Umtausch` [B1] mal değişimi; bu ayrı kavram |
| 8539 | `infolge` | sonucunda, yüzünden | 25324 | Genitiv edatı; sebep-sonuç dersinin dilbilgisi konusu, türetilemez |
| 8540 | `bestehen auf` | ısrar etmek | 3195 | havuzdaki `bestehen` [A2] 'sınavı geçmek' — edatlısı ayrı lexeme |
| 8541 | `bedenken` | göz önünde bulundurmak | 4187 | `denken` [A1] ile anlamca ilgisiz; müzakere dilinin çekirdeği |
| 8542 | `angeblich` | iddiaya göre, sözde | 2694 | dolaylı anlatım dersinin çekirdeği; havuzda karşılığı yok |
| 8543 | `sich aufhalten` | bulunmak (bir yerde) | 1311 | havuzdaki `aufhalten` [B1] 'alıkoymak' — dönüşlüsü ayrı kavram |
| 8544 | `der Anlass` | vesile, sebep | 4926 | `aus diesem Anlass` kalıbı; `der Grund`/`die Ursache` bu kullanımı örtmüyor |
| 8545 | `der Durchbruch` | atılım | 6963 | `durch`+`Bruch` [C1]'ten anlamca türetilemez; bilim/teknoloji modülünün taşıyıcısı |
| 8546 | `zulassen` | izin vermek, ruhsat vermek | 2167 | `lassen` [A1]'dan anlamca ayrı; ilaç/araç ruhsatı dilinin çekirdeği |
| 8547 | `der Umstand` | durum, koşul | 18592 | `unter Umständen` kalıbının başı; çoğulu 3215. sırada |
| 8548 | `betreffen` | ilgilendirmek | 13270 | `was … betrifft` B2 konuşmasının kalıbı; `be`+`treffen`'den ayrı |
| 8549 | `die Maßnahme` | tedbir, önlem | 20180 | kurum dilinin çekirdeği; çoğulu 7510. sırada, havuzda karşılığı yok |
| 8550 | `der Wechsel` | geçiş, değişim | 8388 | isim olarak bağımsız ve çok sık; `wechseln` [A2] fiili bu kullanımı örtmüyor |
| 8551 | `die Lücke` | boşluk, açık | 10015 | havuzda 'boşluk/açık' kavramı hiç yok |
| 8552 | `die Geste` | jest, el hareketi | 6389 | beden dili dersinin çekirdeği; `die Gebärde` de havuzda yok |
| 8553 | `die Hürde` | engel | 29949 | havuzda 'engel' karşılığı yok — `das Hindernis` ve `die Barriere` de yok |
| 8554 | `das Wachstum` | büyüme | 12874 | ekonomi modülünün çekirdeği; `-tum` üretken bir sonek değil |

## A — havuzda zaten var (7)

| Ders kelimesi | Gerekçe |
|---|---|
| `zurückkommen auf` | havuzda zurückkommen [A2] |
| `sich vernetzen` | havuzda vernetzen [B2] |
| `sich melden` | havuzda melden [B1] (B1 vetosunda da A) |
| `sich erweisen als` | havuzda sich erweisen [C1] — seviye üstü |
| `stammen aus` | havuzda stammen [B1] |
| `sich entscheiden` | havuzda entscheiden [B1] (B1 vetosunda da A) |
| `sich steigern` | havuzda steigern [B2] |

## B — türev, madde başı değil (53)

| Ders kelimesi | Gerekçe |
|---|---|
| `die Abstimmung` | -ung ← abstimmen [B1] |
| `die Anwesenheit` | -heit ← anwesend [B1] |
| `die Regelung` | -ung ← Regel [B1]/regeln [B1] |
| `betrieblich` | -lich ← der Betrieb [B1] |
| `die Erreichbarkeit` | -keit ← erreichbar ← erreichen [A2] |
| `die Konditionen` | çoğul; havuzda die Bedingung [B1] |
| `die Bearbeitung` | -ung ← bearbeiten [B2] |
| `die Einigung` | -ung ← sich einigen [B1] |
| `wirksam` | -sam ← wirken [B1] |
| `die Nachbesserung` | -ung ← nachbessern [B2] |
| `unbrauchbar` | -bar ← brauchen |
| `wertschätzend` | Partizip I; havuzda die Wertschätzung [B2] |
| `verschlossen` | Partizip II ← verschließen [A2] |
| `gekippt` | Partizip II ← kippen [A2] |
| `dauerhaft` | -haft ← dauern [A1] |
| `umsetzbar` | -bar ← umsetzen [B2] |
| `die Umsetzung` | -ung ← umsetzen [B2] |
| `vermeidbar` | -bar ← vermeiden [B1] |
| `die Herstellung` | -ung ← herstellen [A2] |
| `unbestätigt` | olumsuz Partizip II ← bestätigen [A2] |
| `abschließend` | Partizip I ← abschließen [A2] |
| `erschütternd` | Partizip I ← erschüttern |
| `die Aufzeichnung` | -ung; havuzda die Aufnahme [B1] |
| `die Hörerschaft` | -schaft ← der Hörer [B1] |
| `laufend` | Partizip I ← laufen [A1] |
| `steigend` | Partizip I ← steigen [B1] |
| `die Beobachtung` | -ung ← beobachten [B1] (B1 vetosunda da D) |
| `erprobt` | Partizip II ← erproben [C1] |
| `zugelassen` | Partizip II ← zulassen |
| `verblüffend` | Partizip I ← verblüffen |
| `bemannt` | Partizip II ← bemannen |
| `klinisch` | -isch ← Klinik |
| `heilbar` | -bar ← heilen/heil [A2] |
| `bahnbrechend` | Partizip I bileşiği |
| `händeringend` | Partizip I bileşiği |
| `qualifiziert` | Partizip II ← qualifizieren |
| `unverzichtbar` | -bar ← verzichten [B1] |
| `die Ausgaben` | çoğul ← die Ausgabe [B1] |
| `gestellt` | Partizip II ← stellen [A1] |
| `beißend` | Partizip I ← beißen [B1] |
| `die Anpassung` | -ung ← anpassen |
| `die Kundschaft` | -schaft ← der Kunde [A1] |
| `der Erhalt` | adlaştırma ← erhalten [B1] |
| `der Verzicht` | adlaştırma ← verzichten [B1] |
| `die Gewissheit` | -heit; havuzda die Sicherheit [B1] |
| `die Überwindung` | -ung ← überwinden [B2] |
| `der Auslöser` | -er ← auslösen [B2] |
| `beständig` | be+ständig[B1] — üretken |
| `preislich` | -lich ← der Preis [A1] |
| `geregelt` | Partizip II ← regeln [B1] |
| `zusammenfassend` | Partizip I ← zusammenfassen [B1] |
| `die Einschränkung` | -ung ← einschränken [B2] |
| `gezielt` | Partizip II ← zielen |

## D — havuza eklenmedi, dersten çıkacak (86)

| Ders kelimesi | Gerekçe |
|---|---|
| `der Anstieg` | havuzda die Zunahme [B2] var |
| `der Tagesordnungspunkt` | Tagesordnung[B2]+Punkt — şeffaf |
| `anmerken` | havuzda anmerken yok ama erwähnen/bemerken alanı dolu · r15346 |
| `die Rückfrage` | Rück+Frage[A1] — şeffaf |
| `der Abgabetermin` | Abgabe[B2]+Termin[A1] — şeffaf |
| `dazwischenkommen` | dazwischen+kommen — şeffaf |
| `der Puffer` | dar, tek derse bağlı · r28408 |
| `die Fachkonferenz` | Fach[A1]+Konferenz[B1] — şeffaf |
| `der Referent` | havuzda der Redner [B2] var |
| `sich gezwungen sehen` | eşdizim, madde başı değil |
| `die Warteschleife` | dar; warten+Schleife |
| `beiderseitig` | -ig türetmesi, dar |
| `die Kündigungsbestätigung` | Kündigung[B1]+Bestätigung — şeffaf |
| `der Zaun` | dar, tek derse bağlı somut ad |
| `die Grundstücksgrenze` | Grundstück[B1]+Grenze[B1] — şeffaf |
| `gütlich` | dar, hukuk dili |
| `das Einvernehmen` | r42785, dar |
| `auf Augenhöhe` | deyim, madde başı değil |
| `originalgetreu` | original[B1]+treu[B1] — şeffaf |
| `verständigen` | havuzda informieren/benachrichtigen alanı dolu |
| `garen` | dar, mutfak jargonu |
| `abschmecken` | ab+schmecken[A1] — dar |
| `köcheln` | çok dar |
| `die Inspektion` | havuzda die Wartung [B2] var |
| `erneuern` | havuzda erneut [A2]/ersetzen alanı dolu |
| `zuteilen` | zu+teilen[A2] — şeffaf |
| `der Aufbau` | auf+Bau[B1] — şeffaf |
| `der Ablaufplan` | Ablauf[B2]+Plan[A1] — şeffaf |
| `anregen` | an+regen — şeffaf, r34741 |
| `die Kooperation` | havuzda die Zusammenarbeit [B1] var |
| `kennzeichnen` | r40525, dar |
| `nachprüfen` | nach+prüfen[A2] — şeffaf |
| `die Raumfahrt` | Raum[A1]+Fahrt — dar |
| `die Umlaufbahn` | dar, gökbilim |
| `die Mission` | alıntı, dar |
| `der Neustart` | neu[A1]+Start[B1] — şeffaf |
| `umständlich` | kökü havuzda yok, r31915 |
| `abwarten` | ab+warten[A1] — şeffaf |
| `die Serienreife` | Serie+Reife — şeffaf ve dar |
| `skeptisch` | alıntı; havuzda zweifeln[B1]/der Zweifel[B1] |
| `das Vorjahr` | vor+Jahr[A1] — şeffaf |
| `die Preissteigerung` | Preis[A1]+Steigerung — şeffaf |
| `übersteigen` | über+steigen[B1] — şeffaf |
| `abwandern` | ab+wandern[A1] — şeffaf |
| `profitieren` | alıntı; havuzda nutzen/der Vorteil alanı dolu |
| `fesseln` | mecazi ve dar |
| `der Applaus` | dar, tek derse bağlı |
| `erbauen` | er+bauen[A2] — şeffaf |
| `die Gänsehaut` | dar, tek derse bağlı |
| `der Bildausschnitt` | Bild[A1]+Ausschnitt — şeffaf, dar |
| `einfangen` | ein+fangen[B1] — şeffaf |
| `authentisch` | alıntı; havuzda echt [A2] |
| `erhaltenswert` | erhalten[B1]+-wert — üretken |
| `der Beton` | dar, somut yapı malzemesi |
| `das Gelände` | havuzda das Grundstück[B1]/der Bereich[B1] |
| `der Seitenhieb` | çok dar |
| `durchschauen` | durch+schauen[B1] — şeffaf |
| `die Auktion` | dar, tek derse bağlı |
| `ersteigern` | er+steigern[B2] — şeffaf |
| `knüpfen` | 'Kontakte knüpfen' eşdizimine bağlı, dar |
| `weiterempfehlen` | weiter+empfehlen[A1] — şeffaf |
| `sich herumsprechen` | dar |
| `der Neuanfang` | neu[A1]+Anfang[A1] — şeffaf |
| `vorsorgen` | havuzda die Vorsorge [B2] var |
| `das Zusatzeinkommen` | Zusatz+Einkommen[B1] — şeffaf |
| `verschlingen` | mecazi ve dar |
| `sich verstellen` | dar |
| `verschränken` | r44865, çok dar |
| `durchziehen` | mecazi kullanım, şeffaf bileşik |
| `sich angewöhnen` | havuzda sich gewöhnen an [B1] var |
| `urteilen` | havuzda das Urteil [B1] var |
| `die Ich-Botschaft` | Botschaft[B1] bileşiği, jargon |
| `der Maßstab` | havuzda die Norm [B2] var |
| `sich quälen` | dar |
| `die Komfortzone` | r49551, moda deyimi |
| `der Rückschritt` | Rück+Schritt[B1] — şeffaf |
| `anbei` | r49287, eskimiş mektup kalıbı |
| `verbleiben` | ver+bleiben[A1] — dar, resmî kapanış |
| `die Anfrage` | an+Frage[A1] — şeffaf |
| `der Leistungsumfang` | Leistung[B1]+Umfang[B2] — şeffaf |
| `abrunden` | mecazi, dar |
| `dazugehören` | B1 vetosunda da D |
| `hapern` | çok dar |
| `der Feinschliff` | mecazi bileşik, dar |
| `die Schwachstelle` | schwach[A2]+Stelle[A1] — şeffaf |
| `der Rückblick` | Rück+Blick[A1] — şeffaf, r39159 |

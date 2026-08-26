import { d, type Drill } from "./drill-schema";

/** A2 drilleri (WP-73 adım 3) — tablo başına 12 madde; a2-nebensatz ve a2-wechselpraepositionen `drills.ts`'te (pilot). */

const PRAETERITUM: Drill[] = [
  d("a2-praeteritum", "A2", 1, "transform", "Präteritum'a çevir (yazı dili)", "Er macht die Hausaufgaben.", "Er machte die Hausaufgaben.", "conjugation", "Düzenli: kök + -te; er ek almaz: machte."),
  d("a2-praeteritum", "A2", 2, "transform", "Präteritum'a çevir", "Wir gehen nach Hause.", "Wir gingen nach Hause.", "conjugation", "Düzensiz gövde ging + -en: gingen."),
  d("a2-praeteritum", "A2", 3, "transform", "Präteritum'a çevir", "Sie bringt den Kaffee.", "Sie brachte den Kaffee.", "conjugation", "Karışık: gövde değişir (brach-) + -te: brachte."),
  d("a2-praeteritum", "A2", 4, "transform", "Präteritum'a çevir", "Du machst einen Fehler.", "Du machtest einen Fehler.", "conjugation", "du eki -test: machtest."),
  d("a2-praeteritum", "A2", 5, "transform", "Präteritum'a çevir", "Ihr geht früh.", "Ihr gingt früh.", "conjugation", "ihr eki -t: gingt."),
  d("a2-praeteritum", "A2", 6, "transform", "Präteritum'a çevir", "Ich komme spät.", "Ich kam spät.", "conjugation", "kommen gövdesi kam; ich ek almaz."),
  d("a2-praeteritum", "A2", 7, "transform", "Präteritum'a çevir", "Er sieht den Film.", "Er sah den Film.", "conjugation", "sehen gövdesi sah."),
  d("a2-praeteritum", "A2", 8, "transform", "Präteritum'a çevir", "Es gibt keinen Platz.", "Es gab keinen Platz.", "conjugation", "es gibt → es gab."),
  d("a2-praeteritum", "A2", 9, "transform", "Konuşma diline uygun geçmiş (Perfekt mi Präteritum mu?)", "Ich arbeite den ganzen Tag.", "Ich habe den ganzen Tag gearbeitet.", "conjugation", "Konuşmada sıradan fiiller Perfekt ile; Präteritum yazı dili."),
  d("a2-praeteritum", "A2", 10, "transform", "Konuşma diline uygun geçmiş (sein!)", "Ich bin müde.", "Ich war müde.", "conjugation", "sein konuşmada da Präteritum: war."),
  d("a2-praeteritum", "A2", 11, "transform", "Konuşma diline uygun geçmiş (modal!)", "Ich kann nicht kommen.", "Ich konnte nicht kommen.", "conjugation", "Modal fiiller konuşmada Präteritum: konnte."),
  d("a2-praeteritum", "A2", 12, "translate", "Almancaya çevir (hikâye dili): Vaktimiz yoktu. (die Zeit)", undefined, "Wir hatten keine Zeit.", "conjugation", "haben Präteritum wir: hatten."),
];

const PARTIZIP: Drill[] = [
  d("a2-perfekt-partizip", "A2", 1, "fill", "Partizip II'yi yaz: arbeiten", "Ich habe gestern ___.", "Ich habe gestern gearbeitet.", "conjugation", "Kök -t ile bitince araya e: gearbeitet.", ["gearbeitet"]),
  d("a2-perfekt-partizip", "A2", 2, "fill", "Partizip II'yi yaz: einkaufen", "Wir haben im Supermarkt ___.", "Wir haben im Supermarkt eingekauft.", "conjugation", "Ayrılabilen fiilde ge- önekten sonra: ein-ge-kauft.", ["eingekauft"]),
  d("a2-perfekt-partizip", "A2", 3, "fill", "Partizip II'yi yaz: verstehen", "Ich habe alles ___.", "Ich habe alles verstanden.", "conjugation", "ver- ayrılmaz, ge- yok: verstanden.", ["verstanden"]),
  d("a2-perfekt-partizip", "A2", 4, "fill", "Partizip II'yi yaz: telefonieren", "Sie hat lange ___.", "Sie hat lange telefoniert.", "conjugation", "-ieren fiilinde ge- yok: telefoniert.", ["telefoniert"]),
  d("a2-perfekt-partizip", "A2", 5, "fill", "Yardımcı fiili seç: fliegen (wir)", "Wir ___ nach Berlin geflogen.", "Wir sind nach Berlin geflogen.", "conjugation", "Yer değiştirme → sein: sind geflogen.", ["sind"]),
  d("a2-perfekt-partizip", "A2", 6, "fill", "Yardımcı fiili seç: aufwachen (ich)", "Ich ___ um sechs aufgewacht.", "Ich bin um sechs aufgewacht.", "conjugation", "Durum değişimi → sein: bin aufgewacht.", ["bin"]),
  d("a2-perfekt-partizip", "A2", 7, "fill", "Yardımcı fiili seç: sich freuen (ich)", "Ich ___ mich sehr gefreut.", "Ich habe mich sehr gefreut.", "conjugation", "Dönüşlü fiiller hep haben.", ["habe"]),
  d("a2-perfekt-partizip", "A2", 8, "fill", "Yardımcı fiili seç: passieren (es)", "Was ___ passiert?", "Was ist passiert?", "conjugation", "passieren istisna: sein.", ["ist"]),
  d("a2-perfekt-partizip", "A2", 9, "transform", "Perfekt'e çevir", "Ich fahre das Auto.", "Ich habe das Auto gefahren.", "conjugation", "Nesne varsa haben — hareket fiili olsa bile."),
  d("a2-perfekt-partizip", "A2", 10, "transform", "Perfekt'e çevir", "Er steigt in den Bus.", "Er ist in den Bus gestiegen.", "conjugation", "steigen yer değiştirme → sein: ist gestiegen."),
  d("a2-perfekt-partizip", "A2", 11, "transform", "Perfekt'e çevir", "Wir studieren in München.", "Wir haben in München studiert.", "conjugation", "-ieren: studiert, ge- yok; haben."),
  d("a2-perfekt-partizip", "A2", 12, "transform", "Perfekt'e çevir", "Das Kind wächst schnell.", "Das Kind ist schnell gewachsen.", "conjugation", "wachsen durum değişimi → sein: ist gewachsen."),
];

const ADJEKTIVE: Drill[] = [
  d("a2-adjektive", "A2", 1, "fill", "Sıfatı çek: der + gut + Wein (Nominativ)", "Das ist ___ Wein.", "Das ist der gute Wein.", "case", "der sonrası Nominativ tekil: -e.", ["der gute"]),
  d("a2-adjektive", "A2", 2, "fill", "Sıfatı çek: den + gut + Wein (Akkusativ)", "Ich trinke ___ Wein.", "Ich trinke den guten Wein.", "case", "Eril Akkusativ: den guten (zayıf çekim -en).", ["den guten"]),
  d("a2-adjektive", "A2", 3, "fill", "Sıfatı çek: ein + gut + Wein (Nominativ)", "Das ist ___ Wein.", "Das ist ein guter Wein.", "case", "ein cinsiyeti göstermez; sıfat -er alır: ein guter.", ["ein guter"]),
  d("a2-adjektive", "A2", 4, "fill", "Sıfatı çek: ein + gut + Brot (Nominativ)", "Das ist ___ Brot.", "Das ist ein gutes Brot.", "case", "Nötr, ein sonrası: -es: ein gutes.", ["ein gutes"]),
  d("a2-adjektive", "A2", 5, "fill", "Sıfatı çek: eine + gut + Suppe (Akkusativ)", "Ich esse ___ Suppe.", "Ich esse eine gute Suppe.", "case", "Dişil Akkusativ: eine gute.", ["eine gute"]),
  d("a2-adjektive", "A2", 6, "fill", "Sıfatı çek: dem + gut + Wein (Dativ)", "Mit ___ Wein schmeckt es besser.", "Mit dem guten Wein schmeckt es besser.", "case", "Dativ hep -en: dem guten.", ["dem guten"]),
  d("a2-adjektive", "A2", 7, "fill", "Sıfatı çek: artikelsiz, schwarz + Kaffee (Akkusativ)", "Ich trinke gern ___ Kaffee.", "Ich trinke gern schwarzen Kaffee.", "case", "Artikel yoksa sıfat artikelin ekini alır: schwarzen (← den).", ["schwarzen"]),
  d("a2-adjektive", "A2", 8, "fill", "Sıfatı çek: artikelsiz, gut + Wein (Dativ)", "Mit ___ Wein wird alles besser.", "Mit gutem Wein wird alles besser.", "case", "Güçlü çekim Dativ eril: gutem (← dem).", ["gutem"]),
  d("a2-adjektive", "A2", 9, "fill", "Sıfatı çek: die + gut + Weine (çoğul Nominativ)", "___ Weine kommen aus Italien.", "Die guten Weine kommen aus Italien.", "case", "Çoğul, belirli artikel sonrası: -en.", ["Die guten", "die guten"]),
  d("a2-adjektive", "A2", 10, "fill", "Sıfatı çek: ein + hoch + Turm", "Das ist ___ Turm.", "Das ist ein hoher Turm.", "case", "hoch çekilince c düşer: hoher.", ["ein hoher"]),
  d("a2-adjektive", "A2", 11, "fill", "Sıfatı çek: ein + teuer + Auto", "Er hat ___ Auto.", "Er hat ein teures Auto.", "case", "teuer çekilince e düşer: teures.", ["ein teures"]),
  d("a2-adjektive", "A2", 12, "transform", "Sıfatı ismin önüne al", "Der Wein ist gut.", "Das ist ein guter Wein.", "case", "Fiilden sonra çekilmez, ismin önünde çekilir: ein guter Wein.", ["Der gute Wein."]),
];

const KOMPARATIV: Drill[] = [
  d("a2-komparativ", "A2", 1, "fill", "Karşılaştır: alt", "Mein Bruder ist ___ als ich.", "Mein Bruder ist älter als ich.", "meaning", "Tek heceli sıfat umlaut alır: älter; -den daha = als.", ["älter", "aelter"]),
  d("a2-komparativ", "A2", 2, "fill", "Karşılaştır: groß", "Berlin ist ___ als Köln.", "Berlin ist größer als Köln.", "meaning", "groß → größer.", ["größer", "groesser"]),
  d("a2-komparativ", "A2", 3, "fill", "Karşılaştır: gut", "Dein Deutsch ist ___ als meins.", "Dein Deutsch ist besser als meins.", "meaning", "gut düzensiz: besser.", ["besser"]),
  d("a2-komparativ", "A2", 4, "fill", "Karşılaştır: viel", "Er arbeitet ___ als ich.", "Er arbeitet mehr als ich.", "meaning", "viel düzensiz: mehr.", ["mehr"]),
  d("a2-komparativ", "A2", 5, "fill", "Karşılaştır: gern", "Ich trinke Tee ___ als Kaffee.", "Ich trinke Tee lieber als Kaffee.", "meaning", "gern düzensiz: lieber.", ["lieber"]),
  d("a2-komparativ", "A2", 6, "fill", "En üstünlük: schnell", "Der ICE ist ___.", "Der ICE ist am schnellsten.", "meaning", "Fiilden sonra en: am + -sten.", ["am schnellsten"]),
  d("a2-komparativ", "A2", 7, "fill", "En üstünlük: gut + Film (isimden önce)", "Das ist ___ Film des Jahres.", "Das ist der beste Film des Jahres.", "meaning", "İsimden önce der/die/das + -ste: der beste.", ["der beste"]),
  d("a2-komparativ", "A2", 8, "fill", "En üstünlük: alt", "Mein Opa ist ___ in der Familie.", "Mein Opa ist am ältesten in der Familie.", "meaning", "-t ile biten sıfatta -esten: am ältesten.", ["am ältesten", "am aeltesten"]),
  d("a2-komparativ", "A2", 9, "fill", "Eşitlik: so … wie", "Anna ist ___ groß ___ Ben.", "Anna ist so groß wie Ben.", "meaning", "Eşitlik so … wie; als değil.", ["so … wie", "so wie"]),
  d("a2-komparativ", "A2", 10, "transform", "Karşılaştırmayı tersine çevir (Ben daha kısa)", "Anna ist größer als Ben.", "Ben ist kleiner als Anna.", "meaning", "klein → kleiner als."),
  d("a2-komparativ", "A2", 11, "fill", "Gittikçe daha: warm", "Es wird ___ ___.", "Es wird immer wärmer.", "meaning", "immer + Komparativ: immer wärmer.", ["immer wärmer", "immer waermer"]),
  d("a2-komparativ", "A2", 12, "translate", "Almancaya çevir: Bu çok daha iyi.", undefined, "Das ist viel besser.", "meaning", "viel + Komparativ: viel besser."),
];

const REFLEXIV: Drill[] = [
  d("a2-reflexiv", "A2", 1, "fill", "Dönüşlü zamir: ich + sich freuen", "Ich freue ___ auf den Urlaub.", "Ich freue mich auf den Urlaub.", "case", "ich → mich (Akkusativ).", ["mich"]),
  d("a2-reflexiv", "A2", 2, "fill", "Dönüşlü zamir: du + sich beeilen", "Beeil ___!", "Beeil dich!", "case", "du → dich.", ["dich"]),
  d("a2-reflexiv", "A2", 3, "fill", "Dönüşlü zamir: er + sich interessieren", "Er interessiert ___ für Musik.", "Er interessiert sich für Musik.", "case", "3. kişi hep sich.", ["sich"]),
  d("a2-reflexiv", "A2", 4, "fill", "Dönüşlü zamir: wir + sich treffen", "Wir treffen ___ um acht.", "Wir treffen uns um acht.", "case", "wir → uns.", ["uns"]),
  d("a2-reflexiv", "A2", 5, "fill", "Dönüşlü zamir: ihr + sich setzen", "Setzt ___ bitte!", "Setzt euch bitte!", "case", "ihr → euch.", ["euch"]),
  d("a2-reflexiv", "A2", 6, "fill", "Dönüşlü zamir: Sie + sich setzen", "Setzen Sie ___ bitte.", "Setzen Sie sich bitte.", "case", "Sie → sich.", ["sich"]),
  d("a2-reflexiv", "A2", 7, "fill", "mich mi mir mi? Ich wasche … die Hände.", "Ich wasche ___ die Hände.", "Ich wasche mir die Hände.", "case", "Akkusativ nesne (die Hände) varsa zamir Dativ: mir.", ["mir"]),
  d("a2-reflexiv", "A2", 8, "fill", "mich mi mir mi? Ich wasche … (nesne yok)", "Ich wasche ___.", "Ich wasche mich.", "case", "Nesne yoksa zamir Akkusativ: mich.", ["mich"]),
  d("a2-reflexiv", "A2", 9, "fill", "mich mi mir mi? Ich kaufe … ein Auto.", "Ich kaufe ___ ein Auto.", "Ich kaufe mir ein Auto.", "case", "ein Auto Akkusativ → zamir Dativ: mir.", ["mir"]),
  d("a2-reflexiv", "A2", 10, "transform", "Perfekt'e çevir", "Ich freue mich sehr.", "Ich habe mich sehr gefreut.", "conjugation", "Dönüşlü fiiller Perfekt'te haben."),
  d("a2-reflexiv", "A2", 11, "transform", "Perfekt'e çevir", "Der Zug verspätet sich.", "Der Zug hat sich verspätet.", "conjugation", "ver- ge- almaz: verspätet; haben."),
  d("a2-reflexiv", "A2", 12, "translate", "Almancaya çevir: Kendimi iyi hissetmiyorum.", undefined, "Ich fühle mich nicht gut.", "case", "sich fühlen + Akkusativ: mich."),
];

const DATIVVERBEN: Drill[] = [
  d("a2-dativverben", "A2", 1, "fill", "Zamiri hâle koy: helfen + ich", "Kannst du ___ helfen?", "Kannst du mir helfen?", "case", "helfen Dativ: mir.", ["mir"]),
  d("a2-dativverben", "A2", 2, "fill", "Zamiri hâle koy: gefallen + du", "Das Bild gefällt ___.", "Das Bild gefällt dir.", "case", "gefallen: beğenilen şey özne, kişi Dativ: dir.", ["dir"]),
  d("a2-dativverben", "A2", 3, "fill", "İsmi hâle koy: gehören + mein Bruder", "Das Auto gehört ___.", "Das Auto gehört meinem Bruder.", "case", "gehören Dativ: meinem Bruder.", ["meinem Bruder"]),
  d("a2-dativverben", "A2", 4, "fill", "Zamiri hâle koy: danken + Sie", "Ich danke ___.", "Ich danke Ihnen.", "case", "danken Dativ: Ihnen.", ["Ihnen"]),
  d("a2-dativverben", "A2", 5, "fill", "Zamiri hâle koy: fehlen + ich", "Du fehlst ___.", "Du fehlst mir.", "case", "fehlen: özlenen özne, özleyen Dativ: mir.", ["mir"]),
  d("a2-dativverben", "A2", 6, "fill", "Zamiri hâle koy: wehtun + ich", "Mein Kopf tut ___ weh.", "Mein Kopf tut mir weh.", "case", "wehtun Dativ: mir.", ["mir"]),
  d("a2-dativverben", "A2", 7, "fill", "İki nesne: geben + das Kind + das Buch", "Ich gebe ___ ___.", "Ich gebe dem Kind das Buch.", "case", "İsimlerde önce Dativ (dem Kind), sonra Akkusativ (das Buch).", ["dem Kind das Buch"]),
  d("a2-dativverben", "A2", 8, "transform", "Her iki ismi zamirle değiştir", "Ich gebe dem Kind das Buch.", "Ich gebe es ihm.", "word_order", "İki zamirde sıra tersine döner: es ihm."),
  d("a2-dativverben", "A2", 9, "transform", "Nesneyi zamirle değiştir (das Buch)", "Ich gebe dem Kind das Buch.", "Ich gebe es dem Kind.", "word_order", "Zamir isimden önce gelir: es dem Kind."),
  d("a2-dativverben", "A2", 10, "fill", "İsmi hâle koy: schenken + meine Mutter", "Ich schenke ___ Blumen.", "Ich schenke meiner Mutter Blumen.", "case", "schenken kime → Dativ: meiner Mutter.", ["meiner Mutter"]),
  d("a2-dativverben", "A2", 11, "translate", "Almancaya çevir: Bu çorba hoşuma gidiyor. (schmecken, die Suppe)", undefined, "Die Suppe schmeckt mir.", "case", "schmecken: yemek özne, kişi Dativ."),
  d("a2-dativverben", "A2", 12, "translate", "Almancaya çevir: Sana inanıyorum.", undefined, "Ich glaube dir.", "case", "glauben (kişiye) Dativ: dir."),
];

const HOEFLICH: Drill[] = [
  d("a2-hoeflich", "A2", 1, "transform", "Kibar ricaya çevir (könnten, du)", "Hilf mir!", "Könntest du mir helfen?", "conjugation", "Emir yerine Konjunktiv II soru: Könntest du …?"),
  d("a2-hoeflich", "A2", 2, "transform", "Kibar ricaya çevir (könnten, Sie)", "Geben Sie mir die Speisekarte!", "Könnten Sie mir bitte die Speisekarte geben?", "conjugation", "Resmî rica: Könnten Sie … geben?", ["Könnten Sie mir die Speisekarte geben?"]),
  d("a2-hoeflich", "A2", 3, "transform", "Kibar siparişe çevir (hätte gern)", "Ich will einen Kaffee.", "Ich hätte gern einen Kaffee.", "conjugation", "Sipariş: Ich hätte gern …; ich will kaba."),
  d("a2-hoeflich", "A2", 4, "transform", "Kibar siparişe çevir (möchten)", "Ich will ein Bier.", "Ich möchte ein Bier.", "conjugation", "möchten kibar isteme."),
  d("a2-hoeflich", "A2", 5, "transform", "Öneriye çevir (könnten, wir)", "Wir gehen ins Kino.", "Wir könnten ins Kino gehen.", "conjugation", "Öneri: Wir könnten … gehen."),
  d("a2-hoeflich", "A2", 6, "transform", "Yumuşat (wäre)", "Das ist gut.", "Das wäre gut.", "conjugation", "sein Konjunktiv II: wäre."),
  d("a2-hoeflich", "A2", 7, "transform", "Yumuşatılmış soru (hätten, du)", "Hast du Zeit?", "Hättest du Zeit?", "conjugation", "haben Konjunktiv II du: hättest."),
  d("a2-hoeflich", "A2", 8, "transform", "Tavsiyeye çevir (würde)", "Ich mache das nicht.", "Ich würde das nicht machen.", "conjugation", "Diğer fiiller würde + mastar."),
  d("a2-hoeflich", "A2", 9, "fill", "würde'yi çek: ihr", "___ ihr mitkommen?", "Würdet ihr mitkommen?", "conjugation", "würden ihr: würdet.", ["Würdet", "würdet", "wuerdet"]),
  d("a2-hoeflich", "A2", 10, "fill", "könnten'i çek: Sie", "___ Sie mir helfen?", "Könnten Sie mir helfen?", "conjugation", "können Konjunktiv II Sie: könnten.", ["Könnten", "könnten", "koennten"]),
  d("a2-hoeflich", "A2", 11, "translate", "Almancaya çevir: Seve seve gelirdim. (mitkommen)", undefined, "Ich würde gern mitkommen.", "conjugation", "würde gern + mastar."),
  d("a2-hoeflich", "A2", 12, "translate", "Almancaya çevir: Bir çay alabilir miyim? (könnten, bekommen)", undefined, "Könnte ich einen Tee bekommen?", "conjugation", "Könnte ich … bekommen? kibar istek.", ["Könnte ich bitte einen Tee bekommen?"]),
];

const IMPERATIV: Drill[] = [
  d("a2-imperativ", "A2", 1, "transform", "Emir yap (du)", "Du kommst.", "Komm!", "conjugation", "du çekiminden -st atılır: Komm!"),
  d("a2-imperativ", "A2", 2, "transform", "Emir yap (du)", "Du sprichst lauter.", "Sprich lauter!", "conjugation", "e → i değişimi emirde kalır: Sprich!"),
  d("a2-imperativ", "A2", 3, "transform", "Emir yap (du)", "Du fährst langsam.", "Fahr langsam!", "conjugation", "a → ä değişimi emirde düşer: Fahr!"),
  d("a2-imperativ", "A2", 4, "transform", "Emir yap (du)", "Du nimmst den Bus.", "Nimm den Bus!", "conjugation", "nehmen → Nimm!"),
  d("a2-imperativ", "A2", 5, "transform", "Emir yap (ihr)", "Ihr wartet hier.", "Wartet hier!", "conjugation", "ihr biçimi çekimle aynı, özne düşer."),
  d("a2-imperativ", "A2", 6, "transform", "Emir yap (Sie)", "Sie kommen morgen.", "Kommen Sie morgen!", "conjugation", "Sie biçimi: mastar + Sie."),
  d("a2-imperativ", "A2", 7, "transform", "Emir yap (du) — ayrılabilen fiil", "Du rufst mich an.", "Ruf mich an!", "verb_position", "Önek sonda: Ruf … an!"),
  d("a2-imperativ", "A2", 8, "transform", "Emir yap (du) — dönüşlü", "Du setzt dich.", "Setz dich!", "conjugation", "Dönüşlü zamir kalır: Setz dich!"),
  d("a2-imperativ", "A2", 9, "transform", "Emir yap (Sie) — dönüşlü", "Sie setzen sich.", "Setzen Sie sich!", "conjugation", "Setzen Sie sich!"),
  d("a2-imperativ", "A2", 10, "transform", "Emir yap (du) — sein", "Du bist leise.", "Sei leise!", "conjugation", "sein düzensiz: Sei!"),
  d("a2-imperativ", "A2", 11, "transform", "Ricaya yumuşat (bitte, doch mal)", "Komm vorbei!", "Komm doch mal vorbei!", "meaning", "doch mal emri davete çevirir."),
  d("a2-imperativ", "A2", 12, "translate", "Almancaya çevir: Lütfen kapıyı açın. (Sie, aufmachen, die Tür)", undefined, "Machen Sie bitte die Tür auf!", "verb_position", "Sie emri + önek sonda.", ["Öffnen Sie bitte die Tür!", "Machen Sie die Tür bitte auf!"]),
];

const VERB_PRAEP: Drill[] = [
  d("a2-verben-praeposition", "A2", 1, "fill", "Edat + hâl: warten (der Bus)", "Ich warte ___ Bus.", "Ich warte auf den Bus.", "case", "warten auf + Akkusativ: auf den.", ["auf den"]),
  d("a2-verben-praeposition", "A2", 2, "fill", "Edat + hâl: sich freuen (der Urlaub, iple çekmek)", "Ich freue mich ___ Urlaub.", "Ich freue mich auf den Urlaub.", "case", "İleriye dönük sevinç: auf + Akk.", ["auf den"]),
  d("a2-verben-praeposition", "A2", 3, "fill", "Edat + hâl: sich freuen (das Geschenk, sevinmek)", "Sie freut sich ___ Geschenk.", "Sie freut sich über das Geschenk.", "case", "Olmuş şeye sevinç: über + Akk.", ["über das", "ueber das"]),
  d("a2-verben-praeposition", "A2", 4, "fill", "Edat + hâl: denken (du)", "Ich denke oft ___.", "Ich denke oft an dich.", "case", "denken an + Akk: an dich.", ["an dich"]),
  d("a2-verben-praeposition", "A2", 5, "fill", "Edat + hâl: sich interessieren (die Politik)", "Er interessiert sich ___ Politik.", "Er interessiert sich für Politik.", "case", "sich interessieren für + Akk.", ["für"]),
  d("a2-verben-praeposition", "A2", 6, "fill", "Edat + hâl: sprechen (der Chef, biriyle)", "Ich spreche ___ Chef.", "Ich spreche mit dem Chef.", "case", "sprechen mit + Dativ: mit dem.", ["mit dem"]),
  d("a2-verben-praeposition", "A2", 7, "fill", "Edat + hâl: Angst haben (Hunde)", "Ich habe Angst ___ Hunden.", "Ich habe Angst vor Hunden.", "case", "Angst haben vor + Dativ (çoğul -n: Hunden).", ["vor"]),
  d("a2-verben-praeposition", "A2", 8, "fill", "Edat + hâl: teilnehmen (der Kurs)", "Sie nimmt ___ Kurs teil.", "Sie nimmt am Kurs teil.", "case", "teilnehmen an + Dativ: an dem → am.", ["am", "an dem"]),
  d("a2-verben-praeposition", "A2", 9, "fill", "Edat + hâl: träumen (eine Reise)", "Ich träume ___ Reise.", "Ich träume von einer Reise.", "case", "träumen von + Dativ: von einer.", ["von einer"]),
  d("a2-verben-praeposition", "A2", 10, "fill", "Edat + hâl: bitten (die Hilfe)", "Ich bitte dich ___ Hilfe.", "Ich bitte dich um Hilfe.", "case", "bitten um + Akk.", ["um"]),
  d("a2-verben-praeposition", "A2", 11, "fill", "Edat + hâl: gratulieren (die Prüfung)", "Ich gratuliere dir ___ Prüfung.", "Ich gratuliere dir zur Prüfung.", "case", "gratulieren zu + Dativ: zu der → zur.", ["zur", "zu der"]),
  d("a2-verben-praeposition", "A2", 12, "translate", "Almancaya çevir: Proje hakkında konuşuyoruz. (das Projekt)", undefined, "Wir sprechen über das Projekt.", "case", "sprechen über + Akk."),
];

const ORDINAL: Drill[] = [
  d("a2-ordinalzahlen", "A2", 1, "fill", "Sıra sayısını yaz: 3.", "Heute ist der ___ Mai.", "Heute ist der dritte Mai.", "spelling", "3. düzensiz: dritte.", ["dritte"]),
  d("a2-ordinalzahlen", "A2", 2, "fill", "Sıra sayısını yaz: 7.", "Er wohnt im ___ Stock.", "Er wohnt im siebten Stock.", "spelling", "7. düzensiz: siebte; Dativ'de siebten.", ["siebten"]),
  d("a2-ordinalzahlen", "A2", 3, "fill", "Sıra sayısını yaz: 1. (Nominativ, der Tag)", "Das ist der ___ Tag.", "Das ist der erste Tag.", "spelling", "1. düzensiz: erste.", ["erste"]),
  d("a2-ordinalzahlen", "A2", 4, "fill", "Sıra sayısını yaz: 20. (am …)", "Ich komme am ___ Juni.", "Ich komme am zwanzigsten Juni.", "spelling", "20'den sonra -ste; Dativ -sten: zwanzigsten.", ["zwanzigsten"]),
  d("a2-ordinalzahlen", "A2", 5, "fill", "Sıra sayısını yaz: 8.", "Der Kurs beginnt am ___ März.", "Der Kurs beginnt am achten März.", "spelling", "acht + te = achte (tek t); Dativ achten.", ["achten"]),
  d("a2-ordinalzahlen", "A2", 6, "fill", "Tarih sor: Bugün ayın kaçı?", "Der ___ ist heute?", "Der Wievielte ist heute?", "meaning", "Tarih sorusu: Der Wievielte ist heute?", ["Wievielte"]),
  d("a2-ordinalzahlen", "A2", 7, "transform", "Tarihi cümlede söyle: 12.6.1990 doğumlu", "12. Juni 1990", "Ich bin am zwölften Juni 1990 geboren.", "case", "Doğum tarihi: am + -ten + yıl.", ["Ich bin am 12. Juni 1990 geboren."]),
  d("a2-ordinalzahlen", "A2", 8, "fill", "Kaçıncı kez: 1.", "Ich bin ___ Mal hier.", "Ich bin zum ersten Mal hier.", "case", "zum + -ten Mal.", ["zum ersten"]),
  d("a2-ordinalzahlen", "A2", 9, "fill", "Kaçıncı kat: 3.", "Ich wohne ___ Stock.", "Ich wohne im dritten Stock.", "case", "im + -ten Stock.", ["im dritten"]),
  d("a2-ordinalzahlen", "A2", 10, "fill", "Sıra sayısı Akkusativ: mein + 1. + Job", "Das war ___ Job.", "Das war mein erster Job.", "case", "Sıra sayısı erste sıfat gibi çekilir; ein-tipi eril Nominativ: mein erster.", ["mein erster"]),
  d("a2-ordinalzahlen", "A2", 11, "translate", "Almancaya çevir: Bugün Mayıs'ın üçü.", undefined, "Heute ist der dritte Mai.", "spelling", "der + -te + ay."),
  d("a2-ordinalzahlen", "A2", 12, "translate", "Almancaya çevir: Toplantı Nisan'ın onunda. (das Treffen)", undefined, "Das Treffen ist am zehnten April.", "case", "am + -ten + ay."),
];

const VERBEN_A2: Drill[] = [
  d("a2-verben", "A2", 1, "transform", "Perfekt'e çevir", "Ich bringe den Kaffee.", "Ich habe den Kaffee gebracht.", "conjugation", "bringen karışık: gebracht."),
  d("a2-verben", "A2", 2, "transform", "Perfekt'e çevir", "Sie hilft mir.", "Sie hat mir geholfen.", "conjugation", "helfen: hat geholfen (e → o)."),
  d("a2-verben", "A2", 3, "transform", "Perfekt'e çevir", "Wir finden den Weg.", "Wir haben den Weg gefunden.", "conjugation", "finden: hat gefunden."),
  d("a2-verben", "A2", 4, "transform", "Perfekt'e çevir", "Er läuft schnell.", "Er ist schnell gelaufen.", "conjugation", "laufen: ist gelaufen."),
  d("a2-verben", "A2", 5, "transform", "Präteritum'a çevir", "Ich denke an dich.", "Ich dachte an dich.", "conjugation", "denken karışık: dachte."),
  d("a2-verben", "A2", 6, "transform", "Präteritum'a çevir", "Sie weiß es.", "Sie wusste es.", "conjugation", "wissen: wusste."),
  d("a2-verben", "A2", 7, "transform", "Präteritum'a çevir", "Wir fahren nach Köln.", "Wir fuhren nach Köln.", "conjugation", "fahren: fuhr + -en."),
  d("a2-verben", "A2", 8, "transform", "Präteritum'a çevir", "Er gibt mir das Buch.", "Er gab mir das Buch.", "conjugation", "geben: gab."),
  d("a2-verben", "A2", 9, "transform", "Präsens'e çevir (er)", "treffen", "Er trifft seine Freunde.", "conjugation", "treffen er'de e → i: trifft.", ["Er trifft."]),
  d("a2-verben", "A2", 10, "transform", "Perfekt'e çevir", "Ich vergesse den Termin.", "Ich habe den Termin vergessen.", "conjugation", "vergessen: ge- yok (ver-), Partizip vergessen."),
  d("a2-verben", "A2", 11, "transform", "Perfekt'e çevir", "Sie steht früh auf.", "Sie ist früh aufgestanden.", "conjugation", "aufstehen: ist aufgestanden."),
  d("a2-verben", "A2", 12, "transform", "Präteritum'a çevir", "Ich schlafe gut.", "Ich schlief gut.", "conjugation", "schlafen: schlief."),
];

export const DRILLS_A2: Drill[] = [
  ...PRAETERITUM,
  ...PARTIZIP,
  ...ADJEKTIVE,
  ...KOMPARATIV,
  ...REFLEXIV,
  ...DATIVVERBEN,
  ...HOEFLICH,
  ...IMPERATIV,
  ...VERB_PRAEP,
  ...ORDINAL,
  ...VERBEN_A2,
];

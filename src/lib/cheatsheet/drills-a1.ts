import { d, type Drill } from "./drill-schema";

/**
 * A1 drilleri (WP-73 adım 3) — tablo başına 12 madde.
 *
 * Her tablo için karışım: dönüştür (kuralı cümle üstünde işlet), boşluk
 * (tek biçim), çevir (Türkçeden). Cevaplar tablodaki biçimlerle sınırlı;
 * kelime dağarcığı A1. Gerekçe tabloya bakan tek cümle.
 */

const POSSESSIV: Drill[] = [
  d("a1-possessiv", "A1", 1, "fill", "Boşluğu doldur: benim kitabım (ich, das Buch)", "Das ist ___ Buch.", "Das ist mein Buch.", "case", "ich → mein; nötr Nominativ'de ek yok.", ["mein"]),
  d("a1-possessiv", "A1", 2, "fill", "Boşluğu doldur: senin kız kardeşin (du, die Schwester)", "Ist das ___ Schwester?", "Ist das deine Schwester?", "case", "du → dein; dişil isimde -e: deine.", ["deine"]),
  d("a1-possessiv", "A1", 3, "fill", "Boşluğu doldur: onun (Anna'nın) arabası (sie, das Auto)", "Anna kommt mit ___ Auto.", "Anna kommt mit ihrem Auto.", "case", "sie (dişil) → ihr; mit Dativ, nötr → ihrem.", ["ihrem"]),
  d("a1-possessiv", "A1", 4, "fill", "Boşluğu doldur: onun (Tom'un) köpeği, nesne (er, der Hund)", "Ich sehe ___ Hund.", "Ich sehe seinen Hund.", "case", "er → sein; eril Akkusativ -en: seinen.", ["seinen"]),
  d("a1-possessiv", "A1", 5, "fill", "Boşluğu doldur: bizim evimiz (wir, das Haus)", "___ Haus ist klein.", "Unser Haus ist klein.", "case", "wir → unser; nötr Nominativ ek yok.", ["Unser", "unser"]),
  d("a1-possessiv", "A1", 6, "fill", "Boşluğu doldur: sizin daireniz (ihr, die Wohnung)", "___ Wohnung ist groß.", "Eure Wohnung ist groß.", "case", "ihr → euer; ek alınca e düşer: eure.", ["Eure", "eure"]),
  d("a1-possessiv", "A1", 7, "fill", "Boşluğu doldur: sizin (resmî) adınız (Sie, der Name)", "Wie ist ___ Name?", "Wie ist Ihr Name?", "case", "Resmî Sie → Ihr, büyük harfle.", ["Ihr"]),
  d("a1-possessiv", "A1", 8, "transform", "Kız kardeşim için söyle (die Schwester → meine …)", "Das ist der Hund von meiner Schwester.", "Das ist der Hund meiner Schwester.", "case", "von + Dativ yerine iyelik: meiner Schwester (dişil Dativ/Genitiv -er).", ["Das ist ihr Hund."]),
  d("a1-possessiv", "A1", 9, "fill", "Boşluğu doldur: anne babama (ich, die Eltern, çoğul)", "Ich fahre zu ___ Eltern.", "Ich fahre zu meinen Eltern.", "case", "zu Dativ; çoğul Dativ -en: meinen Eltern.", ["meinen"]),
  d("a1-possessiv", "A1", 10, "fill", "Boşluğu doldur: onların çocukları (sie çoğul, die Kinder)", "___ Kinder spielen im Park.", "Ihre Kinder spielen im Park.", "case", "sie (onlar) → ihr; çoğul Nominativ -e: ihre.", ["Ihre", "ihre"]),
  d("a1-possessiv", "A1", 11, "translate", "Almancaya çevir: Senin oğlunu tanıyorum. (der Sohn)", undefined, "Ich kenne deinen Sohn.", "case", "kennen Akkusativ; eril → deinen."),
  d("a1-possessiv", "A1", 12, "translate", "Almancaya çevir: Bu bizim öğretmenimiz. (die Lehrerin)", undefined, "Das ist unsere Lehrerin.", "case", "wir → unser; dişil Nominativ -e: unsere."),
];

const PRAESENS: Drill[] = [
  d("a1-praesens", "A1", 1, "fill", "Fiili çek: du + lernen", "Du ___ Deutsch.", "Du lernst Deutsch.", "conjugation", "du eki -st: lernst.", ["lernst"]),
  d("a1-praesens", "A1", 2, "fill", "Fiili çek: er + arbeiten", "Er ___ in Berlin.", "Er arbeitet in Berlin.", "conjugation", "Kök -t ile bitince araya e girer: arbeitet.", ["arbeitet"]),
  d("a1-praesens", "A1", 3, "fill", "Fiili çek: du + heißen", "Wie ___ du?", "Wie heißt du?", "conjugation", "Kök -ß ile bitince du eki yalnız -t: heißt.", ["heißt", "heisst"]),
  d("a1-praesens", "A1", 4, "fill", "Fiili çek: ihr + kommen", "Woher ___ ihr?", "Woher kommt ihr?", "conjugation", "ihr eki -t: kommt.", ["kommt"]),
  d("a1-praesens", "A1", 5, "fill", "Fiili çek: sie (o, dişil) + fahren", "Sie ___ nach Köln.", "Sie fährt nach Köln.", "conjugation", "fahren du/er'de a → ä: fährt.", ["fährt", "faehrt"]),
  d("a1-praesens", "A1", 6, "fill", "Fiili çek: du + sprechen", "___ du Deutsch?", "Sprichst du Deutsch?", "conjugation", "sprechen du'da e → i: sprichst.", ["Sprichst", "sprichst"]),
  d("a1-praesens", "A1", 7, "fill", "Fiili çek: er + lesen", "Er ___ ein Buch.", "Er liest ein Buch.", "conjugation", "lesen er'de e → ie: liest.", ["liest"]),
  d("a1-praesens", "A1", 8, "fill", "Fiili çek: du + essen", "Was ___ du?", "Was isst du?", "conjugation", "essen du'da e → i, -ss sonrası yalnız -t: isst.", ["isst"]),
  d("a1-praesens", "A1", 9, "fill", "Fiili çek: ihr + fahren", "___ ihr mit dem Zug?", "Fahrt ihr mit dem Zug?", "conjugation", "Ünlü değişimi ihr'de YOK: fahrt.", ["Fahrt", "fahrt"]),
  d("a1-praesens", "A1", 10, "transform", "Özneyi \"er\" yap", "Ich nehme den Bus.", "Er nimmt den Bus.", "conjugation", "nehmen er'de nimmt (e → i, h düşer)."),
  d("a1-praesens", "A1", 11, "transform", "Özneyi \"du\" yap", "Ich schlafe lange.", "Du schläfst lange.", "conjugation", "schlafen du'da a → ä + -st: schläfst."),
  d("a1-praesens", "A1", 12, "translate", "Almancaya çevir: O (eril) bana yardım ediyor. (helfen)", undefined, "Er hilft mir.", "conjugation", "helfen er'de e → i: hilft; helfen Dativ alır (mir)."),
];

const SEIN_HABEN: Drill[] = [
  d("a1-sein-haben", "A1", 1, "fill", "sein'i çek: du", "___ du müde?", "Bist du müde?", "conjugation", "sein: du bist.", ["Bist", "bist"]),
  d("a1-sein-haben", "A1", 2, "fill", "sein'i çek: ihr", "___ ihr aus Izmir?", "Seid ihr aus Izmir?", "conjugation", "sein: ihr seid.", ["Seid", "seid"]),
  d("a1-sein-haben", "A1", 3, "fill", "haben'i çek: du", "___ du Zeit?", "Hast du Zeit?", "conjugation", "haben du'da b düşer: hast.", ["Hast", "hast"]),
  d("a1-sein-haben", "A1", 4, "fill", "haben'i çek: er", "Er ___ Hunger.", "Er hat Hunger.", "conjugation", "haben er'de hat.", ["hat"]),
  d("a1-sein-haben", "A1", 5, "fill", "werden'i çek: du", "Du ___ Arzt.", "Du wirst Arzt.", "conjugation", "werden du'da wirst.", ["wirst"]),
  d("a1-sein-haben", "A1", 6, "fill", "werden'i çek: er", "Es ___ kalt.", "Es wird kalt.", "conjugation", "werden er/es'te wird.", ["wird"]),
  d("a1-sein-haben", "A1", 7, "transform", "Geçmişe çevir (Präteritum)", "Ich bin müde.", "Ich war müde.", "conjugation", "sein geçmişte Präteritum: war."),
  d("a1-sein-haben", "A1", 8, "transform", "Geçmişe çevir (Präteritum)", "Wir haben keine Zeit.", "Wir hatten keine Zeit.", "conjugation", "haben geçmişte Präteritum: hatten."),
  d("a1-sein-haben", "A1", 9, "transform", "Geçmişe çevir (Präteritum)", "Du bist in Berlin.", "Du warst in Berlin.", "conjugation", "sein Präteritum du: warst."),
  d("a1-sein-haben", "A1", 10, "transform", "Geçmişe çevir (Präteritum)", "Ihr habt Glück.", "Ihr hattet Glück.", "conjugation", "haben Präteritum ihr: hattet."),
  d("a1-sein-haben", "A1", 11, "translate", "Almancaya çevir: Dün hastaydım. (krank)", undefined, "Gestern war ich krank.", "conjugation", "sein geçmişte war; Gestern başta → fiil ikinci sırada.", ["Ich war gestern krank."]),
  d("a1-sein-haben", "A1", 12, "translate", "Almancaya çevir: Bir kardeşin var mı? (der Bruder)", undefined, "Hast du einen Bruder?", "conjugation", "haben du: hast; einen Bruder Akkusativ."),
];

const MODAL: Drill[] = [
  d("a1-modalverben", "A1", 1, "fill", "Modal fiili çek: ich + können", "Ich ___ gut schwimmen.", "Ich kann gut schwimmen.", "conjugation", "können tekilde kann; ich ve er aynı.", ["kann"]),
  d("a1-modalverben", "A1", 2, "fill", "Modal fiili çek: du + müssen", "Du ___ jetzt gehen.", "Du musst jetzt gehen.", "conjugation", "müssen du: musst (umlaut düşer).", ["musst"]),
  d("a1-modalverben", "A1", 3, "fill", "Modal fiili çek: er + wollen", "Er ___ Arzt werden.", "Er will Arzt werden.", "conjugation", "wollen er: will.", ["will"]),
  d("a1-modalverben", "A1", 4, "fill", "Modal fiili çek: ihr + dürfen", "___ ihr hier parken?", "Dürft ihr hier parken?", "conjugation", "dürfen ihr: dürft.", ["Dürft", "dürft", "duerft"]),
  d("a1-modalverben", "A1", 5, "fill", "Modal fiili çek: wir + möchten", "Wir ___ zwei Kaffee.", "Wir möchten zwei Kaffee.", "conjugation", "möchten wir: möchten.", ["möchten", "moechten"]),
  d("a1-modalverben", "A1", 6, "transform", "\"können\" ile söyle: yüzebiliyorum", "Ich schwimme.", "Ich kann schwimmen.", "verb_position", "Modal çekilir, asıl fiil mastarla sona gider."),
  d("a1-modalverben", "A1", 7, "transform", "\"müssen\" ile söyle: bugün çalışmak zorundayım", "Ich arbeite heute.", "Ich muss heute arbeiten.", "verb_position", "muss ikinci sırada, arbeiten sonda."),
  d("a1-modalverben", "A1", 8, "transform", "\"wollen\" ile söyle", "Wir fahren nach Berlin.", "Wir wollen nach Berlin fahren.", "verb_position", "wollen çekilir, fahren mastarla sona."),
  d("a1-modalverben", "A1", 9, "transform", "\"müssen\" ile söyle; ayrılabilen fiil birleşir", "Ich rufe dich morgen an.", "Ich muss dich morgen anrufen.", "verb_position", "Sona giden ayrılabilen fiil birleşir: anrufen."),
  d("a1-modalverben", "A1", 10, "translate", "Almancaya çevir: Burada sigara içmek yasak. (man, rauchen)", undefined, "Hier darf man nicht rauchen.", "conjugation", "Yasak = nicht dürfen; nicht müssen 'gerek yok' demek.", ["Man darf hier nicht rauchen."]),
  d("a1-modalverben", "A1", 11, "translate", "Almancaya çevir: Gelmen gerekmiyor. (kommen)", undefined, "Du musst nicht kommen.", "conjugation", "Gerek yok = nicht müssen; yasak değil."),
  d("a1-modalverben", "A1", 12, "transform", "Geçmişe çevir (Präteritum)", "Ich kann nicht kommen.", "Ich konnte nicht kommen.", "conjugation", "Modal Präteritum: umlaut düşer, -te: konnte."),
];

const TRENNBAR: Drill[] = [
  d("a1-trennbar", "A1", 1, "transform", "Cümle kur: ich + aufstehen + um sieben", "aufstehen", "Ich stehe um sieben auf.", "verb_position", "Ayrılan önek (auf) cümlenin sonuna gider."),
  d("a1-trennbar", "A1", 2, "transform", "Cümle kur: ich + anrufen + dich später", "anrufen", "Ich rufe dich später an.", "verb_position", "an sona; rufe ikinci sırada."),
  d("a1-trennbar", "A1", 3, "transform", "Cümle kur: wir + einkaufen + im Supermarkt", "einkaufen", "Wir kaufen im Supermarkt ein.", "verb_position", "ein sona gider."),
  d("a1-trennbar", "A1", 4, "transform", "Soru kur: du + mitkommen", "mitkommen", "Kommst du mit?", "verb_position", "Soruda fiil başta, önek yine sonda."),
  d("a1-trennbar", "A1", 5, "transform", "Cümle kur: der Zug + abfahren + um acht", "abfahren", "Der Zug fährt um acht ab.", "verb_position", "ab sona; fahren er'de fährt."),
  d("a1-trennbar", "A1", 6, "transform", "Cümle kur: ich + bezahlen + die Rechnung", "bezahlen", "Ich bezahle die Rechnung.", "verb_position", "be- ayrılmaz: bezahle tek parça."),
  d("a1-trennbar", "A1", 7, "transform", "Cümle kur: ich + verstehen + dich nicht", "verstehen", "Ich verstehe dich nicht.", "verb_position", "ver- ayrılmaz; nicht sonda."),
  d("a1-trennbar", "A1", 8, "transform", "\"müssen\" ile söyle", "Ich stehe früh auf.", "Ich muss früh aufstehen.", "verb_position", "Mastar hâlinde önek yeniden birleşir: aufstehen."),
  d("a1-trennbar", "A1", 9, "transform", "Perfekt'e çevir", "Ich rufe dich an.", "Ich habe dich angerufen.", "conjugation", "Perfekt'te ge araya girer: an-ge-rufen."),
  d("a1-trennbar", "A1", 10, "transform", "\"dass\" ile bağla: Ich weiß, …", "Der Zug fährt um acht ab.", "Ich weiß, dass der Zug um acht abfährt.", "verb_position", "Yan cümlede önek ve fiil sonda birleşir: abfährt."),
  d("a1-trennbar", "A1", 11, "translate", "Almancaya çevir: Akşamları televizyon izliyorum. (fernsehen)", undefined, "Abends sehe ich fern.", "verb_position", "Abends başta → sehe ich; fern sonda.", ["Ich sehe abends fern."]),
  d("a1-trennbar", "A1", 12, "translate", "Almancaya çevir: Lütfen kapıyı kapat. (zumachen, die Tür)", undefined, "Mach bitte die Tür zu.", "verb_position", "Emirde fiil başta, önek sonda.", ["Mach die Tür bitte zu."]),
];

const SATZBAU: Drill[] = [
  d("a1-satzbau", "A1", 1, "transform", "\"Heute\" ile başla", "Ich lerne heute Deutsch.", "Heute lerne ich Deutsch.", "verb_position", "Birinci sıraya zaman gelince fiil ikinci, özne üçüncü."),
  d("a1-satzbau", "A1", 2, "transform", "\"In Berlin\" ile başla", "Meine Schwester wohnt in Berlin.", "In Berlin wohnt meine Schwester.", "verb_position", "Öne çekilen öğe + fiil + özne."),
  d("a1-satzbau", "A1", 3, "transform", "\"Morgen\" ile başla", "Wir fahren morgen nach Köln.", "Morgen fahren wir nach Köln.", "verb_position", "Fiil hep ikinci: Morgen fahren wir."),
  d("a1-satzbau", "A1", 4, "transform", "Evet/hayır sorusu yap", "Du lernst Deutsch.", "Lernst du Deutsch?", "verb_position", "Evet/hayır sorusunda fiil birinci sıraya."),
  d("a1-satzbau", "A1", 5, "transform", "\"Wann\" ile soru yap", "Du lernst Deutsch.", "Wann lernst du Deutsch?", "verb_position", "Soru kelimesi + fiil + özne."),
  d("a1-satzbau", "A1", 6, "transform", "Emir yap (du)", "Du lernst Deutsch.", "Lern Deutsch!", "verb_position", "Emirde özne yok, fiil başta, -st düşer.", ["Lerne Deutsch!"]),
  d("a1-satzbau", "A1", 7, "reorder", "Doğru sıraya koy: nach Berlin / ich / fahre / morgen / mit dem Zug", "morgen · mit dem Zug · nach Berlin · ich · fahre", "Ich fahre morgen mit dem Zug nach Berlin.", "word_order", "TeKaMoLo: zaman (morgen) – tarz (mit dem Zug) – yer (nach Berlin)."),
  d("a1-satzbau", "A1", 8, "reorder", "Doğru sıraya koy: ins Kino / wir / heute / gehen", "heute · ins Kino · wir · gehen", "Wir gehen heute ins Kino.", "word_order", "Zaman yerden önce: heute ins Kino.", ["Heute gehen wir ins Kino."]),
  d("a1-satzbau", "A1", 9, "transform", "\"wollen\" ile söyle", "Ich arbeite heute nicht.", "Ich will heute nicht arbeiten.", "verb_position", "Cümle çerçevesi: will … arbeiten; nicht mastardan önce."),
  d("a1-satzbau", "A1", 10, "transform", "Perfekt'e çevir", "Ich arbeite gestern.", "Ich habe gestern gearbeitet.", "verb_position", "Perfekt çerçevesi: habe … gearbeitet."),
  d("a1-satzbau", "A1", 11, "translate", "Almancaya çevir: Yarın Berlin'e gidiyorum. (fahren)", undefined, "Morgen fahre ich nach Berlin.", "verb_position", "Morgen başta → fahre ich; Türkçedeki gibi özne öne gelmez.", ["Ich fahre morgen nach Berlin."]),
  d("a1-satzbau", "A1", 12, "translate", "Almancaya çevir: Ne zaman geliyorsun? (kommen)", undefined, "Wann kommst du?", "verb_position", "W-sorusu: Wann + fiil + özne."),
];

const WFRAGEN: Drill[] = [
  d("a1-wfragen", "A1", 1, "fill", "Soru kelimesi: nerede", "___ wohnst du?", "Wo wohnst du?", "meaning", "wo = nerede (durağan).", ["Wo", "wo"]),
  d("a1-wfragen", "A1", 2, "fill", "Soru kelimesi: nereye", "___ gehst du?", "Wohin gehst du?", "meaning", "wohin = nereye (hareket).", ["Wohin", "wohin"]),
  d("a1-wfragen", "A1", 3, "fill", "Soru kelimesi: nereden", "___ kommst du?", "Woher kommst du?", "meaning", "woher = nereden.", ["Woher", "woher"]),
  d("a1-wfragen", "A1", 4, "fill", "Soru kelimesi: kime (Dativ)", "___ gehört das Buch?", "Wem gehört das Buch?", "case", "gehören Dativ alır → wem.", ["Wem", "wem"]),
  d("a1-wfragen", "A1", 5, "fill", "Soru kelimesi: kimi (Akkusativ)", "___ rufst du an?", "Wen rufst du an?", "case", "anrufen Akkusativ alır → wen.", ["Wen", "wen"]),
  d("a1-wfragen", "A1", 6, "fill", "Soru kelimesi: kaç tane", "___ Kinder hast du?", "Wie viele Kinder hast du?", "meaning", "Sayılabilen için wie viele.", ["Wie viele", "wie viele"]),
  d("a1-wfragen", "A1", 7, "fill", "Soru kelimesi: ne kadar (fiyat)", "___ kostet das?", "Wie viel kostet das?", "meaning", "Sayılamayan/miktar için wie viel.", ["Wie viel", "wie viel"]),
  d("a1-wfragen", "A1", 8, "fill", "Soru kelimesi: ne kadar süre", "___ bleibst du?", "Wie lange bleibst du?", "meaning", "Süre için wie lange.", ["Wie lange", "wie lange"]),
  d("a1-wfragen", "A1", 9, "fill", "Soru kelimesi: hangi (das Buch)", "___ Buch liest du?", "Welches Buch liest du?", "case", "Belirli seçenek → welch-; nötr: welches.", ["Welches", "welches"]),
  d("a1-wfragen", "A1", 10, "transform", "Altı çizili öğeyi sor: „um acht Uhr“", "Der Kurs beginnt um acht Uhr.", "Wann beginnt der Kurs?", "verb_position", "Zaman → wann; fiil ikinci sırada."),
  d("a1-wfragen", "A1", 11, "transform", "Altı çizili öğeyi sor: „Deutsch“", "Ich lerne Deutsch.", "Was lernst du?", "verb_position", "Nesne → was; özne du'ya döner."),
  d("a1-wfragen", "A1", 12, "translate", "Almancaya çevir: Neden Almanca öğreniyorsun?", undefined, "Warum lernst du Deutsch?", "verb_position", "warum + fiil + özne."),
];

const ZAHLEN: Drill[] = [
  d("a1-zahlen", "A1", 1, "fill", "Sayıyı yaz: 21", "___", "einundzwanzig", "spelling", "İki basamaklı sayılar tersten: bir-ve-yirmi.", ["einundzwanzig"]),
  d("a1-zahlen", "A1", 2, "fill", "Sayıyı yaz: 16", "___", "sechzehn", "spelling", "sechs → sechzehn: s düşer.", ["sechzehn"]),
  d("a1-zahlen", "A1", 3, "fill", "Sayıyı yaz: 70", "___", "siebzig", "spelling", "sieben → siebzig: en düşer.", ["siebzig"]),
  d("a1-zahlen", "A1", 4, "fill", "Sayıyı yaz: 30", "___", "dreißig", "spelling", "dreißig ß ile yazılır, -zig değil.", ["dreißig", "dreissig"]),
  d("a1-zahlen", "A1", 5, "fill", "Sayıyı yaz: 345", "___", "dreihundertfünfundvierzig", "spelling", "yüzler + tersten onlar: drei-hundert-fünf-und-vierzig.", ["dreihundertfünfundvierzig", "dreihundertfuenfundvierzig"]),
  d("a1-zahlen", "A1", 6, "fill", "Saati günlük dille yaz: 13:30", "Es ist ___.", "Es ist halb zwei.", "meaning", "Yarım saat bir SONRAKİ saate göre: halb zwei = 1:30.", ["halb zwei"]),
  d("a1-zahlen", "A1", 7, "fill", "Saati günlük dille yaz: 13:15", "Es ist ___.", "Es ist Viertel nach eins.", "meaning", "Çeyrek geçe: Viertel nach.", ["Viertel nach eins", "viertel nach eins"]),
  d("a1-zahlen", "A1", 8, "fill", "Saati günlük dille yaz: 13:45", "Es ist ___.", "Es ist Viertel vor zwei.", "meaning", "Çeyrek kala: Viertel vor + gelecek saat.", ["Viertel vor zwei", "viertel vor zwei"]),
  d("a1-zahlen", "A1", 9, "fill", "Boşluğu doldur: Pazartesi günü (der Montag)", "Der Kurs ist ___.", "Der Kurs ist am Montag.", "case", "Günde am + gün.", ["am Montag"]),
  d("a1-zahlen", "A1", 10, "fill", "Boşluğu doldur: Haziranda (der Juni)", "Wir fahren ___ in Urlaub.", "Wir fahren im Juni in Urlaub.", "case", "Ayda im + ay.", ["im Juni"]),
  d("a1-zahlen", "A1", 11, "fill", "Boşluğu doldur: saat sekizde", "Der Film beginnt ___.", "Der Film beginnt um acht Uhr.", "case", "Saatte um + saat.", ["um acht Uhr", "um acht"]),
  d("a1-zahlen", "A1", 12, "translate", "Almancaya çevir: Bir yıldır Almanca öğreniyorum. (das Jahr)", undefined, "Ich lerne seit einem Jahr Deutsch.", "case", "…den beri: seit + Dativ (einem Jahr).", ["Seit einem Jahr lerne ich Deutsch."]),
];

const PLURAL: Drill[] = [
  d("a1-plural", "A1", 1, "fill", "Çoğulu yaz: der Tisch", "zwei ___", "zwei Tische", "plural", "Eril, -e eki: Tische.", ["Tische"]),
  d("a1-plural", "A1", 2, "fill", "Çoğulu yaz: der Stuhl", "drei ___", "drei Stühle", "plural", "Eril, umlaut + -e: Stühle.", ["Stühle", "Stuehle"]),
  d("a1-plural", "A1", 3, "fill", "Çoğulu yaz: das Kind", "zwei ___", "zwei Kinder", "plural", "Kısa nötr, -er: Kinder.", ["Kinder"]),
  d("a1-plural", "A1", 4, "fill", "Çoğulu yaz: das Buch", "viele ___", "viele Bücher", "plural", "Nötr, umlaut + -er: Bücher.", ["Bücher", "Buecher"]),
  d("a1-plural", "A1", 5, "fill", "Çoğulu yaz: die Frau", "zwei ___", "zwei Frauen", "plural", "Dişil, -en: Frauen.", ["Frauen"]),
  d("a1-plural", "A1", 6, "fill", "Çoğulu yaz: die Straße", "viele ___", "viele Straßen", "plural", "-e ile biten dişil, -n: Straßen.", ["Straßen", "Strassen"]),
  d("a1-plural", "A1", 7, "fill", "Çoğulu yaz: die Lehrerin", "zwei ___", "zwei Lehrerinnen", "plural", "-in → -nen: Lehrerinnen.", ["Lehrerinnen"]),
  d("a1-plural", "A1", 8, "fill", "Çoğulu yaz: das Auto", "drei ___", "drei Autos", "plural", "Yabancı kelime, -s: Autos.", ["Autos"]),
  d("a1-plural", "A1", 9, "fill", "Çoğulu yaz: der Lehrer", "zwei ___", "zwei Lehrer", "plural", "-er ile biten eril değişmez: Lehrer.", ["Lehrer"]),
  d("a1-plural", "A1", 10, "fill", "Çoğulu yaz: der Vater", "die ___", "die Väter", "plural", "Yalnız umlaut: Väter.", ["Väter", "Vaeter"]),
  d("a1-plural", "A1", 11, "fill", "Çoğulu yaz: das Haus", "zwei ___", "zwei Häuser", "plural", "au → äu + -er: Häuser.", ["Häuser", "Haeuser"]),
  d("a1-plural", "A1", 12, "transform", "Çoğul yap", "Der Mann kommt.", "Die Männer kommen.", "plural", "der Mann → die Männer (eril ama -er); fiil çoğul: kommen."),
];

const PRAEP: Drill[] = [
  d("a1-praepositionen", "A1", 1, "fill", "Boşluğu doldur: parkın içinden (durch, der Park)", "Wir gehen ___ Park.", "Wir gehen durch den Park.", "case", "durch Akkusativ: den Park.", ["durch den"]),
  d("a1-praepositionen", "A1", 2, "fill", "Boşluğu doldur: annem için (für, meine Mutter)", "Das ist ___ Mutter.", "Das ist für meine Mutter.", "case", "für Akkusativ; dişil meine.", ["für meine"]),
  d("a1-praepositionen", "A1", 3, "fill", "Boşluğu doldur: şekersiz (ohne, der Zucker)", "Ich trinke Kaffee ___ Zucker.", "Ich trinke Kaffee ohne Zucker.", "case", "ohne Akkusativ; artikelsiz isim.", ["ohne"]),
  d("a1-praepositionen", "A1", 4, "fill", "Boşluğu doldur: otobüsle (mit, der Bus)", "Ich fahre ___ Bus.", "Ich fahre mit dem Bus.", "case", "mit Dativ: dem Bus.", ["mit dem"]),
  d("a1-praepositionen", "A1", 5, "fill", "Boşluğu doldur: Türkiye'den (aus, die Türkei)", "Ich komme ___ Türkei.", "Ich komme aus der Türkei.", "case", "aus Dativ; dişil der Türkei.", ["aus der"]),
  d("a1-praepositionen", "A1", 6, "fill", "Boşluğu doldur: doktora (zu, der Arzt)", "Ich gehe ___ Arzt.", "Ich gehe zum Arzt.", "case", "Kişi/kurum için zu; zu dem → zum.", ["zum", "zu dem"]),
  d("a1-praepositionen", "A1", 7, "fill", "Boşluğu doldur: Berlin'e (nach / zu?)", "Ich fliege ___ Berlin.", "Ich fliege nach Berlin.", "case", "Şehir ve ülke için nach.", ["nach"]),
  d("a1-praepositionen", "A1", 8, "fill", "Boşluğu doldur: bir yıldır (seit, ein Jahr)", "Ich lerne ___ Jahr Deutsch.", "Ich lerne seit einem Jahr Deutsch.", "case", "seit Dativ: einem Jahr.", ["seit einem"]),
  d("a1-praepositionen", "A1", 9, "fill", "Boşluğu doldur: annemden hediye (von, meine Mutter)", "Das ist ein Geschenk ___ Mutter.", "Das ist ein Geschenk von meiner Mutter.", "case", "von Dativ; dişil meiner.", ["von meiner"]),
  d("a1-praepositionen", "A1", 10, "fill", "Boşluğu doldur: İsviçre'ye (in, die Schweiz)", "Wir fahren ___ Schweiz.", "Wir fahren in die Schweiz.", "case", "Artikelli ülke: in die Schweiz (nach değil).", ["in die"]),
  d("a1-praepositionen", "A1", 11, "translate", "Almancaya çevir: Eve gidiyorum.", undefined, "Ich gehe nach Hause.", "case", "nach Hause kalıp; zu Hause = evde."),
  d("a1-praepositionen", "A1", 12, "translate", "Almancaya çevir: Kız arkadaşıma gidiyorum. (meine Freundin)", undefined, "Ich gehe zu meiner Freundin.", "case", "Kişi için zu + Dativ: meiner Freundin."),
];

const NEGATION: Drill[] = [
  d("a1-negation", "A1", 1, "transform", "Olumsuz yap", "Ich habe ein Auto.", "Ich habe kein Auto.", "meaning", "ein'li isim → kein."),
  d("a1-negation", "A1", 2, "transform", "Olumsuz yap", "Ich trinke Kaffee.", "Ich trinke keinen Kaffee.", "case", "Artikelsiz isim → kein; eril Akkusativ keinen."),
  d("a1-negation", "A1", 3, "transform", "Olumsuz yap", "Ich kenne den Mann.", "Ich kenne den Mann nicht.", "word_order", "Belirli artikelli isim → nicht, sonda."),
  d("a1-negation", "A1", 4, "transform", "Olumsuz yap", "Das ist mein Buch.", "Das ist nicht mein Buch.", "word_order", "İyelikli isim → nicht, önünde."),
  d("a1-negation", "A1", 5, "transform", "Olumsuz yap", "Ich komme heute.", "Ich komme heute nicht.", "word_order", "Yalın fiil: nicht sona."),
  d("a1-negation", "A1", 6, "transform", "Olumsuz yap", "Ich kann heute kommen.", "Ich kann heute nicht kommen.", "word_order", "nicht mastardan hemen önce."),
  d("a1-negation", "A1", 7, "transform", "Olumsuz yap", "Ich rufe dich an.", "Ich rufe dich nicht an.", "word_order", "nicht ayrılan önekten önce."),
  d("a1-negation", "A1", 8, "transform", "Olumsuz yap", "Ich habe ihn gesehen.", "Ich habe ihn nicht gesehen.", "word_order", "nicht Partizip'ten önce."),
  d("a1-negation", "A1", 9, "transform", "Olumsuz yap", "Das Auto ist neu.", "Das Auto ist nicht neu.", "word_order", "Sıfat → nicht sıfattan önce."),
  d("a1-negation", "A1", 10, "transform", "Olumsuz yap", "Wir haben Zeit.", "Wir haben keine Zeit.", "case", "Artikelsiz dişil isim → keine."),
  d("a1-negation", "A1", 11, "fill", "Olumsuz soruya olumlu cevap: „Hast du keine Zeit?“ — (var!)", "___, ich habe Zeit.", "Doch, ich habe Zeit.", "meaning", "Olumsuz soruya 'evet' = doch.", ["Doch", "doch"]),
  d("a1-negation", "A1", 12, "translate", "Almancaya çevir: Kardeşim yok. (der Bruder)", undefined, "Ich habe keinen Bruder.", "case", "haben + kein; eril Akkusativ keinen."),
];

const VERBEN: Drill[] = [
  d("a1-verben", "A1", 1, "transform", "Perfekt'e çevir", "Ich gehe ins Kino.", "Ich bin ins Kino gegangen.", "conjugation", "gehen: ist gegangen (hareket → sein)."),
  d("a1-verben", "A1", 2, "transform", "Perfekt'e çevir", "Er kommt spät.", "Er ist spät gekommen.", "conjugation", "kommen: ist gekommen."),
  d("a1-verben", "A1", 3, "transform", "Perfekt'e çevir", "Wir essen Pizza.", "Wir haben Pizza gegessen.", "conjugation", "essen: hat gegessen."),
  d("a1-verben", "A1", 4, "transform", "Perfekt'e çevir", "Ich trinke Tee.", "Ich habe Tee getrunken.", "conjugation", "trinken: hat getrunken (i → u)."),
  d("a1-verben", "A1", 5, "transform", "Perfekt'e çevir", "Sie liest ein Buch.", "Sie hat ein Buch gelesen.", "conjugation", "lesen: hat gelesen."),
  d("a1-verben", "A1", 6, "transform", "Perfekt'e çevir", "Ich schreibe eine E-Mail.", "Ich habe eine E-Mail geschrieben.", "conjugation", "schreiben: hat geschrieben (ei → ie)."),
  d("a1-verben", "A1", 7, "transform", "Perfekt'e çevir", "Wir fahren nach Köln.", "Wir sind nach Köln gefahren.", "conjugation", "fahren: ist gefahren."),
  d("a1-verben", "A1", 8, "transform", "Perfekt'e çevir", "Ich nehme den Bus.", "Ich habe den Bus genommen.", "conjugation", "nehmen: hat genommen."),
  d("a1-verben", "A1", 9, "transform", "Perfekt'e çevir", "Er spricht gut Deutsch.", "Er hat gut Deutsch gesprochen.", "conjugation", "sprechen: hat gesprochen (e → o)."),
  d("a1-verben", "A1", 10, "transform", "Perfekt'e çevir", "Ich sehe den Film.", "Ich habe den Film gesehen.", "conjugation", "sehen: hat gesehen."),
  d("a1-verben", "A1", 11, "transform", "Perfekt'e çevir", "Wir bleiben zu Hause.", "Wir sind zu Hause geblieben.", "conjugation", "bleiben: ist geblieben (istisna)."),
  d("a1-verben", "A1", 12, "transform", "Präsens'e çevir (er)", "schlafen", "Er schläft.", "conjugation", "schlafen er'de a → ä: schläft."),
];

export const DRILLS_A1: Drill[] = [
  ...POSSESSIV,
  ...PRAESENS,
  ...SEIN_HABEN,
  ...MODAL,
  ...TRENNBAR,
  ...SATZBAU,
  ...WFRAGEN,
  ...ZAHLEN,
  ...PLURAL,
  ...PRAEP,
  ...NEGATION,
  ...VERBEN,
];

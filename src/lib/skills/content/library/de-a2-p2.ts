import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 1 duyuru, telefon ve mesaj kullanıyordu; burada röportaj, mağaza
 * anonsu ve resmî bir e-posta var. Söyleyiş odağı „r“ sesinin iki biçimi;
 * dil bilgisi yer edatlarında Dativ ile Akkusativ ayrımı.
 */
export const deA2P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r2",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Der Bücherschrank an der Ecke",
    genre: "Röportaj",
    intro: "Sokaktaki açık kitap dolabına bakan bir kadınla yapılmış kısa söyleşiyi okuyacaksın.",
    gloss: [
      { de: "der Bücherschrank", tr: "kitap dolabı", en: "book cabinet" },
      { de: "die Telefonzelle", tr: "telefon kulübesi", en: "phone booth" },
      { de: "streichen", tr: "boyamak", en: "to paint" },
      { de: "feucht", tr: "nemli", en: "damp" },
      { de: "aufräumen", tr: "toplamak", en: "to tidy up" },
      { de: "der Karton", tr: "koli", en: "box" },
    ],
    minutes: 5,
    text:
      "DER BÜCHERSCHRANK AN DER ECKE\nEin Gespräch mit Marta Riedl, 68\n\n" +
      "Frau Riedl, seit wann steht der Schrank hier?\n" +
      "Seit vier Jahren. Er war früher eine alte Telefonzelle. Ein Nachbar hat Regale hineingebaut, " +
      "und wir haben ihn zusammen grün gestrichen.\n\n" +
      "Wie funktioniert das?\n" +
      "Ganz einfach: Man nimmt ein Buch mit und stellt irgendwann ein anderes hinein. " +
      "Niemand kontrolliert etwas, und es kostet nichts.\n\n" +
      "Gibt es Probleme?\n" +
      "Manchmal ja. Im Winter wird das Papier feucht, deshalb habe ich eine kleine Tür repariert. " +
      "Und ab und zu bringt jemand zwanzig Kartons auf einmal. Dann ist der Schrank voll und ich muss aufräumen.\n\n" +
      "Was war Ihr schönster Moment?\n" +
      "Ein Junge hat mir letzte Woche gesagt: „Hier habe ich mein erstes richtiges Buch gefunden.“ " +
      "Für so etwas mache ich das.",
    questions: [
      {
        text: "Was ist der Bücherschrank?",
        options: ["ein Ort zum Tauschen von Büchern", "ein kleiner Buchladen im Viertel", "eine Bibliothek mit Ausweis"],
        answer: 0,
        explain: "„Man nimmt ein Buch mit und stellt irgendwann ein anderes hinein“ — takas, satış ya da üyelik değil.",
      },
      {
        text: "Was war der Schrank früher?",
        options: ["eine Telefonzelle", "ein Regal aus einer Schule", "ein Kiosk an der Ecke"],
        answer: 0,
        explain: "„Er war früher eine alte Telefonzelle.“",
      },
      {
        kind: "truefalse",
        text: "Man muss für die Bücher bezahlen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Niemand kontrolliert etwas, und es kostet nichts.“",
      },
      {
        kind: "gapfill",
        text: "Im Winter wird das Papier ___.",
        options: [],
        answer: 0,
        accept: ["feucht"],
        explain: "„Im Winter wird das Papier feucht, deshalb habe ich eine kleine Tür repariert.“",
      },
      {
        kind: "short_answer",
        text: "Wer hat die Regale gebaut?",
        options: [],
        answer: 0,
        accept: ["ein Nachbar", "Nachbar", "ein Nachbar von Frau Riedl"],
        explain: "„Ein Nachbar hat Regale hineingebaut …“",
      },
      {
        text: "Warum macht Frau Riedl diese Arbeit?",
        options: [
          "Solche Momente wie mit dem Jungen freuen sie.",
          "Die Stadt bezahlt sie für diese Arbeit.",
          "Ihre Nachbarn haben sie darum gebeten.",
        ],
        answer: 0,
        explain: "Son cevap „Für so etwas mache ich das“ — az önce anlattığı çocuk anısını kastediyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l2",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Durchsage im Möbelhaus",
    genre: "Anons",
    intro: "Mobilya mağazasında kapanış anonsunu dinleyeceksin: indirim, restoran saati, kaybolan çocuk ve teslim alma.",
    gloss: [
      { de: "das Möbelhaus", tr: "mobilyacı", en: "furniture store" },
      { de: "das Angebot", tr: "indirim", en: "special offer" },
      { de: "die Bestellung", tr: "sipariş", en: "order" },
      { de: "die Abholung", tr: "teslim alma", en: "pick-up" },
      { de: "markieren", tr: "işaretlemek", en: "to mark" },
      { de: "die Beratung", tr: "danışma", en: "consultation" },
    ],
    minutes: 5,
    segments: [
      { text: "Liebe Kundinnen und Kunden, herzlich willkommen im Möbelhaus Nord. Wir schließen heute um zwanzig Uhr." },
      { text: "Im Erdgeschoss finden Sie diese Woche alle Lampen zwanzig Prozent günstiger. Das Angebot gilt nur bis Samstag." },
      { text: "Unser Restaurant im zweiten Stock nimmt die letzten Bestellungen um neunzehn Uhr an. Danach gibt es nur noch Kaffee und Kuchen." },
      { text: "Wer heute eine Küche plant, bekommt einen Termin bei unserer Beratung im dritten Stock. Bitte melden Sie sich vorher an." },
      { text: "Eine wichtige Durchsage: Ein kleiner Junge mit einer roten Jacke sucht seine Mutter. Er wartet bei der Information am Ausgang." },
      { text: "Kunden mit großen Möbeln fahren bitte zur Abholung hinter dem Haus. Der Weg ist gelb markiert." },
      { text: "Wir wünschen Ihnen noch einen schönen Einkauf. Ihr Team vom Möbelhaus Nord." },
    ],
    questions: [
      {
        text: "Wo hört man diese Durchsage?",
        options: ["in einem Möbelhaus", "in einem Supermarkt", "in einem Kaufhaus für Kleidung"],
        answer: 0,
        explain: "„Herzlich willkommen im Möbelhaus Nord“ — mutfak danışmanlığı ve mobilya teslimi de bunu gösteriyor.",
      },
      {
        text: "Wie lange gilt das Angebot für Lampen?",
        options: ["bis Samstag", "bis zwanzig Uhr", "die ganze nächste Woche"],
        answer: 0,
        explain: "„Das Angebot gilt nur bis Samstag.“ Saat yirmi kapanış saati.",
      },
      {
        kind: "truefalse",
        text: "Nach neunzehn Uhr kann man im Restaurant noch warm essen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Danach gibt es nur noch Kaffee und Kuchen.“ — sıcak yemek yok.",
      },
      {
        kind: "short_answer",
        text: "Wo wartet der Junge?",
        options: [],
        answer: 0,
        accept: ["bei der Information am Ausgang", "bei der Information", "an der Information", "am Ausgang"],
        explain: "„Er wartet bei der Information am Ausgang.“",
      },
      {
        kind: "dictation",
        text: "Teslim alma yolunu anlatan cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Der Weg ist gelb markiert.", "Der Weg ist gelb markiert"],
        explain: "„Der Weg ist gelb markiert.“ — durum bildiren edilgen: sein + Partizip II.",
      },
      {
        text: "Was muss man für eine Küchenberatung tun?",
        options: ["sich vorher anmelden", "in den zweiten Stock gehen", "hinter dem Haus parken"],
        answer: 0,
        explain: "„Bitte melden Sie sich vorher an.“ İkinci kat restoran, arka taraf ise teslim alma yeri.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w2",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Ich habe Ihre Geldbörse gefunden",
    genre: "E-posta",
    intro: "İçinde adres olan bir cüzdan buldun; önce iki cümle kur, sonra sahibine kısa bir e-posta yaz.",
    gloss: [
      { de: "die Geldbörse", tr: "cüzdan", en: "wallet" },
      { de: "der Ausweis", tr: "kimlik", en: "ID card" },
      { de: "zurückgeben", tr: "geri vermek", en: "to give back" },
      { de: "erreichen", tr: "ulaşmak", en: "to reach" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Cüzdanı dün akşam parkta buldum.",
        answer: "Ich habe die Geldbörse gestern Abend im Park gefunden.",
        alternatives: ["Gestern Abend habe ich die Geldbörse im Park gefunden."],
        hint: "Perfekt iki parçalıdır: yardımcı fiil (habe) ikinci sırada, Partizip II (gefunden) en sonda.",
      },
      {
        kind: "build",
        tr: "Adresinizi kimliğinizde buldum.",
        answer: "Auf Ihrem Ausweis habe ich Ihre Adresse gefunden.",
        alternatives: ["Ihre Adresse habe ich auf Ihrem Ausweis gefunden."],
        hint: "Cümlenin başına yer ya da nesne alabilirsin; çekimli fiil yine ikinci sırada kalır.",
      },
      {
        kind: "free",
        prompt:
          "İçinde kimlik ve adres olan bir cüzdan buldun. Sahibine e-posta yaz: neyi nerede ve ne zaman buldun, içinde ne var, nasıl ve ne zaman geri alabilir, sana nasıl ulaşabilir.",
        checklist: [
          "Neyi nerede ve ne zaman bulduğunu yaz",
          "Nasıl adresi bulduğunu açıkla",
          "İçinde ne olduğunu kısaca say",
          "Teslim yerini, saatini ve iletişim bilgini yaz",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich habe … gefunden.", tr: "… buldum." },
          { de: "Auf Ihrem Ausweis steht …", tr: "Kimliğinizde … yazıyor" },
          { de: "In der Börse sind …", tr: "Cüzdanın içinde … var" },
          { de: "Sie können … abholen.", tr: "… gelip alabilirsiniz." },
          { de: "Sie erreichen mich unter …", tr: "Bana … numarasından ulaşabilirsiniz." },
        ],
        sample:
          "Sehr geehrte Frau Doblinger, ich habe gestern Abend im Stadtpark eine schwarze Geldbörse gefunden. " +
          "Auf Ihrem Ausweis habe ich Ihre Adresse gefunden, deshalb schreibe ich Ihnen. " +
          "In der Börse sind ein Ausweis, eine Buskarte und etwas Kleingeld. Ich wohne in der Wielandstraße 14 " +
          "und bin abends ab achtzehn Uhr zu Hause. Sie können die Börse dort abholen. " +
          "Sie erreichen mich auch unter null eins sieben sechs, acht acht, zwei eins, vier null. " +
          "Mit freundlichen Grüßen, Yasin Aydın",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s2",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Das deutsche r hat zwei Gesichter",
    genre: "Ses çalışması",
    intro: "Hece başındaki „r“ boğazdan gelir, hece sonundaki „r“ ise neredeyse bir „a“ sesine dönüşür.",
    gloss: [
      { de: "das Krankenhaus", tr: "hastane", en: "hospital" },
      { de: "wirklich", tr: "gerçekten", en: "really" },
      { de: "hinter", tr: "arkasında", en: "behind" },
      { de: "zurückkommen", tr: "geri dönmek", en: "to come back" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Rufst du mich morgen wieder an?",
        tr: "Yarın beni yine arar mısın?",
        hint: "Baştaki r boğazdan, gargara yapar gibi. Türkçedeki dil ucu r'si değil.",
        confusions: [
          { heard: ["Ruufst du", "Luft du", "Rufst du mich morgen an"], fix: "Dil ucunu titretme; ses küçük dilin olduğu yerden, boğazın arkasından çıkar.", expected: "Rufst" },
        ],
      },
      {
        de: "Der Regen hört bald auf.",
        tr: "Yağmur birazdan duracak.",
        hint: "„Regen“ başta boğaz r'si; „Der“ ve „hört“ sonundaki r ise „a“ gibi zayıflar: dea, höat.",
        confusions: [
          { heard: ["Der Regen hörrt", "Der Regen hört bald ab"], fix: "Kelime sonundaki r'yi yuvarlama: höat, dea. Yalnız „Regen“de gerçek r var.", expected: "hört" },
        ],
      },
      {
        de: "Mein Bruder arbeitet im Krankenhaus.",
        tr: "Erkek kardeşim hastanede çalışıyor.",
        hint: "„Bruder“ içinde iki farklı r: BRUU-da — ilki boğazdan, sonuncusu „a“.",
        confusions: [
          { heard: ["Bruderr arbeitet", "Bru-der arbeitet"], fix: "Sondaki -er hecesini „er“ diye söyleme, „a“ gibi bitir: bruuda, arbaytet.", expected: "Bruder" },
        ],
      },
      {
        de: "Die Kinder spielen hinter dem Haus.",
        tr: "Çocuklar evin arkasında oynuyor.",
        hint: "„Kinder“ ve „hinter“ sonundaki -er hep aynı: KİN-da, HİN-ta.",
        confusions: [
          { heard: ["Die Kinderr", "hinterr dem Haus"], fix: "İki kelimede de son hece „-da“ ve „-ta“ gibi hafif; r duyulmaz.", expected: "hinter" },
        ],
      },
      {
        de: "Das Wasser ist wirklich sehr kalt.",
        tr: "Su gerçekten çok soğuk.",
        hint: "„Wasser“ sonu „a“; „wirklich“ ve „sehr“ farklı: biri hece içinde zayıf r, öteki sonda „a“.",
        confusions: [
          { heard: ["Wasserr ist", "sehrr kalt"], fix: "„Wasser“ = VA-sa, „sehr“ = zea. İkisinde de sondaki r yutulur.", expected: "sehr" },
        ],
      },
      {
        de: "Herr Krause fährt heute nach Berlin.",
        tr: "Bay Krause bugün Berlin'e gidiyor.",
        hint: "„Herr“ ve „Krause“ boğaz r'si ister; „fährt“ sonunda ise r yine „a“ olur: FEEAT.",
        confusions: [
          { heard: ["Her Krause fahrt", "Herr Krause fährrt"], fix: "Baştaki r boğazdan, sondaki r „a“: her ama KRAU-ze, fee-at.", expected: "fährt" },
        ],
      },
      {
        de: "Meine Schwester kommt im Sommer zurück.",
        tr: "Kız kardeşim yazın geri dönüyor.",
        hint: "Üç kez zayıf r: Schwesta, Somma, tsu-RÜK — sonuncuda ise gerçek boğaz r'si var.",
        confusions: [
          { heard: ["Schwesterr", "Sommerr", "zurruck"], fix: "-er ile bitenlerde r yok, „a“ var; „zurück“ ortasındaki r ise boğazdan çıkar.", expected: "zurück" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g2",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Wo? Dativ. Wohin? Akkusativ.",
    genre: "Kural",
    intro: "Dokuz yer edatı iki hâl arasında gidip gelir: durum anlatırsan Dativ, hareket anlatırsan Akkusativ.",
    focus: "Wechselpräpositionen: wo (Dativ) ↔ wohin (Akkusativ)",
    gloss: [
      { de: "hängen", tr: "asmak", en: "to hang" },
      { de: "die Wand", tr: "duvar", en: "wall" },
      { de: "stellen", tr: "dik koymak", en: "to put upright" },
      { de: "die Tasche", tr: "çanta", en: "bag" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Türkçede ek, Almancada hâl",
        tr: "Türkçede fark ekte görünür: masada duruyor, masaya koyuyorum. Almancada edat aynı kalır (auf), değişen artikeldir: auf dem Tisch (Dativ, yer) ↔ auf den Tisch (Akkusativ, yön). Dokuz edat böyle çalışır: in, an, auf, unter, über, vor, hinter, neben, zwischen.",
        examples: [
          { de: "Das Buch liegt auf dem Tisch.", tr: "Kitap masada duruyor.", note: "wo? → Dativ" },
          { de: "Ich lege das Buch auf den Tisch.", tr: "Kitabı masaya koyuyorum.", note: "wohin? → Akkusativ" },
          { de: "Die Kinder sind im Garten.", tr: "Çocuklar bahçede.", note: "in dem = im" },
        ],
      },
      {
        heading: "Fiil sana hangisini söyler",
        tr: "Cümledeki fiile bak. Durum fiilleri Dativ ister: liegen, stehen, sitzen, hängen, sein, bleiben. Hareket fiilleri Akkusativ ister: legen, stellen, setzen, hängen, gehen, fahren, kommen.",
        examples: [
          { de: "Die Jacke hängt im Schrank.", tr: "Ceket dolapta asılı.", note: "hängen, durum → Dativ" },
          { de: "Ich hänge die Jacke in den Schrank.", tr: "Ceketi dolaba asıyorum.", note: "hängen, hareket → Akkusativ" },
          { de: "Wir fahren an den See.", tr: "Göle gidiyoruz.", note: "yön → Akkusativ" },
        ],
      },
      {
        heading: "Kaynaşmalar",
        tr: "Edat ve artikel çoğu zaman birleşir. Dativ'de in dem = im, an dem = am; Akkusativ'de in das = ins, an das = ans. Bu kısaltmalar hangi hâlde olduğunu da ele verir.",
        examples: [
          { de: "Wir sind im Kino.", tr: "Sinemadayız.", note: "in dem" },
          { de: "Wir gehen ins Kino.", tr: "Sinemaya gidiyoruz.", note: "in das" },
          { de: "Das Bild hängt an der Wand.", tr: "Resim duvarda asılı." },
        ],
      },
    ],
    questions: [
      {
        text: "Das Buch liegt auf ___ Tisch.",
        options: ["dem", "den", "das"],
        answer: 0,
        explain: "„liegen“ durum anlatır, soru wo? — o yüzden Dativ: auf dem Tisch.",
      },
      {
        text: "Ich lege das Buch auf ___ Tisch.",
        options: ["den", "dem", "das"],
        answer: 0,
        explain: "„legen“ hareket anlatır, soru wohin? — eril kelimede Akkusativ: auf den Tisch.",
      },
      {
        text: "Wir gehen heute Abend ___ Kino.",
        options: ["ins", "im", "am"],
        answer: 0,
        explain: "„gehen“ yön bildirir: in das = ins Kino.",
      },
      {
        kind: "gapfill",
        text: "Die Lampe hängt über ___ Sofa. (das Sofa)",
        options: [],
        answer: 0,
        accept: ["dem"],
        explain: "Asılı durma bir durumdur, soru wo? — nötr kelimede Dativ: dem Sofa.",
      },
      {
        kind: "gapfill",
        text: "Häng das Bild bitte an ___ Wand. (die Wand)",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "Burada asma eylemi bir harekettir, soru wohin? — dişil Akkusativ: die Wand.",
      },
      {
        kind: "gapfill",
        text: "Der Schlüssel liegt in ___ Tasche. (die Tasche)",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "Yer soruluyor, dişil kelimenin Dativ artikeli der'dir: in der Tasche.",
      },
      {
        kind: "gapfill",
        text: "Stell die Flasche bitte in ___ Kühlschrank. (der Kühlschrank)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "„stellen“ hareket bildirir; eril Akkusativ: in den Kühlschrank.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die", "Tasse", "steht", "auf", "dem", "Tisch"],
        explain: "„stehen“ durum fiilidir, bu yüzden Dativ: Die Tasse steht auf dem Tisch.",
      },
      {
        kind: "truefalse",
        text: "„Wir fahren in die Berge.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„fahren“ yön bildirir; çoğulda Akkusativ artikeli die'dir, cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Das Kind sitzt auf den Stuhl.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„sitzen“ durum fiilidir, Dativ ister; doğrusu „Das Kind sitzt auf dem Stuhl.“",
      },
    ],
  },
];

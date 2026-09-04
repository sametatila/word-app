import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 16 — "Rota, otel, bavul, havalimanı".
 *
 * Dört ders: Wohin fahren wir? · An der Rezeption · Der Koffer ist gepackt ·
 * Am Flughafen. İçerik ünite 1-16'nın kelimeleriyle sınırlı.
 *
 *   Ünite 16: der Reiseplan, die Landkarte, die Anreise, die Abreise,
 *             der Zwischenstopp, das Verkehrsmittel, der Hinweg, wegfahren ·
 *             das Hotelzimmer, der Zimmerschlüssel, das Doppelbett,
 *             die Unterkunft, die Jugendherberge, reservieren, buchen,
 *             einchecken · die Reisetasche, das Handgepäck, die Wäsche,
 *             verstauen, die Badehose, füllen, der Laptop, aufbewahren ·
 *             die Bordkarte, die Passkontrolle, die Sicherheitskontrolle,
 *             der Flugbegleiter, der Flug, der Sitzplatz, die Ankunftszeit,
 *             der Rückflug
 *   Kalıplar: Wir fahren ans Meer. · Sie müssen in Mannheim umsteigen. ·
 *             Ich habe ein Zimmer reserviert. · Ab wann kann ich einchecken? ·
 *             Hast du die Badehose eingepackt? · Ich nehme nur Handgepäck mit. ·
 *             Sie müssen zur Sicherheitskontrolle. · Wann ist die Ankunftszeit?
 *
 * İki dilbilgisi noktası burada aynı anda ölçülüyor, çünkü seyahat ikisini de
 * aynı cümlede istiyor: nereye gidildiğini söyleyen yön edatları (ans Meer,
 * in die Berge) ve ayrılabilen fiillerin Perfekt'i (eingepackt, mitgenommen).
 * İkincisi A2'nin en çok atlanan ayrıntısı — ön ek ile ge- arasındaki sıra
 * yalnız gerçek bir bavul listesinde tekrarlanınca yerleşiyor.
 */
export const a2U16: SkillExercise[] = [
  {
    id: "a2-u16-r1",
    level: "A2",
    skill: "reading",
    unit: 16,
    title: "Unser Reiseplan",
    genre: "E-posta",
    intro: "Bir arkadaşa yazılan rota planı. Nereye, nasıl, hangi molalarla?",
    gloss: [
      { de: "der Reiseplan", tr: "seyahat planı", en: "travel plan" },
      { de: "die Anreise", tr: "gidiş yolculuğu", en: "outward journey" },
      { de: "der Zwischenstopp", tr: "ara mola", en: "stopover" },
      { de: "das Verkehrsmittel", tr: "ulaşım aracı", en: "means of transport" },
      { de: "der Hinweg", tr: "gidiş yolu", en: "the way there" },
      { de: "die Unterkunft", tr: "konaklama", en: "accommodation" },
      { de: "die Abreise", tr: "dönüş, ayrılış", en: "departure" },
    ],
    minutes: 4,
    text:
      "Hallo Selin,\n\n" +
      "hier endlich unser Reiseplan.\n\n" +
      "Die Anreise ist am Freitag. Wir fahren ans Meer, aber nicht direkt: um 8:14 geht der Zug ab Köln, in Mannheim müssen wir umsteigen. Ein Zwischenstopp von 40 Minuten, das reicht für einen Kaffee.\n\n" +
      "Auf dem Hinweg nehmen wir den Zug, zurück fliegen wir. Das Verkehrsmittel ist also nicht dasselbe — pass auf, dein Rückflug geht schon um sechs Uhr morgens.\n\n" +
      "Die Unterkunft habe ich gebucht: eine kleine Jugendherberge, zehn Minuten zu Fuß vom Strand. Kein Doppelbett, zwei einzelne Betten, aber sauber und günstig.\n\n" +
      "Die Abreise ist am Dienstag. Schau bitte noch mal auf die Landkarte, ob der Weg vom Bahnhof stimmt.\n\n" +
      "Bis Freitag!\nJonas",
    questions: [
      {
        text: "Wo müssen sie umsteigen?",
        options: ["In Köln", "In Mannheim", "Am Meer"],
        answer: 1,
        explain: "„um 8:14 geht der Zug ab Köln, in Mannheim müssen wir umsteigen“.",
      },
      {
        kind: "gapfill",
        text: "Wir fahren ___ Meer.",
        options: [],
        answer: 0,
        accept: ["ans"],
        explain: "Yön sorulduğunda (wohin) an + Akkusativ gelir; an das kısalıp ans olur.",
      },
      {
        text: "Wie kommen sie zurück?",
        options: ["Mit dem Zug", "Mit dem Flugzeug", "Mit dem Auto"],
        answer: 1,
        explain: "„Auf dem Hinweg nehmen wir den Zug, zurück fliegen wir.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert der Zwischenstopp?",
        options: [],
        answer: 0,
        accept: ["40 Minuten", "vierzig Minuten", "40"],
        explain: "„Ein Zwischenstopp von 40 Minuten, das reicht für einen Kaffee.“",
      },
      {
        text: "In der Unterkunft gibt es ein Doppelbett.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Kein Doppelbett, zwei einzelne Betten“.",
      },
    ],
  },
  {
    id: "a2-u16-r2",
    level: "A2",
    skill: "reading",
    unit: 16,
    title: "Hausordnung der Jugendherberge",
    genre: "Duyuru",
    intro: "Hostel kuralları. Ne zaman giriş, ne zaman çıkış, eşyalar nerede?",
    gloss: [
      { de: "die Jugendherberge", tr: "gençlik hosteli", en: "youth hostel" },
      { de: "einchecken", tr: "giriş yapmak", en: "to check in" },
      { de: "der Zimmerschlüssel", tr: "oda anahtarı", en: "room key" },
      { de: "aufbewahren", tr: "saklamak", en: "to keep, store" },
      { de: "die Wäsche", tr: "çamaşır", en: "laundry" },
      { de: "das Handgepäck", tr: "el bagajı", en: "hand luggage" },
      { de: "reservieren", tr: "yer ayırtmak", en: "to reserve" },
    ],
    minutes: 4,
    text:
      "JUGENDHERBERGE AM STRAND — GUT ZU WISSEN\n\n" +
      "ANKUNFT. Einchecken können Sie ab 15 Uhr. Kommen Sie früher an, stellen Sie Ihr Gepäck bitte in den Raum neben der Rezeption; dort können wir es bis 15 Uhr aufbewahren.\n\n" +
      "ZIMMERSCHLÜSSEL. Jeder Gast bekommt einen Schlüssel. Bei Verlust zahlen Sie 20 Euro. Legen Sie ihn nicht ins Zimmer und schließen Sie die Tür nicht von außen zu.\n\n" +
      "ABREISE. Die Zimmer sind bis 10 Uhr frei zu machen. Wer später fährt, kann die Reisetasche wieder unten lassen.\n\n" +
      "WÄSCHE. Im Keller stehen zwei Maschinen, drei Euro pro Waschgang. Kleingeld bekommen Sie an der Rezeption.\n\n" +
      "FRÜHSTÜCK. 7 bis 9:30 Uhr. Wer ein Zimmer ohne Frühstück reserviert hat, kann für sechs Euro dazubuchen.",
    questions: [
      {
        text: "Ab wann kann man einchecken?",
        options: ["Ab 10 Uhr", "Ab 15 Uhr", "Ab 7 Uhr"],
        answer: 1,
        explain: "„Einchecken können Sie ab 15 Uhr.“",
      },
      {
        kind: "gapfill",
        text: "Bei Verlust des Zimmerschlüssels zahlen Sie ___ Euro.",
        options: [],
        answer: 0,
        accept: ["20", "zwanzig"],
        explain: "Anahtar kaybında 20 euro — kuralın ikinci bölümünde yazıyor.",
      },
      {
        text: "Was macht man mit dem Gepäck, wenn man vor 15 Uhr ankommt?",
        options: [
          "Man wartet draußen.",
          "Man stellt es in den Raum neben der Rezeption.",
          "Man nimmt es mit an den Strand.",
        ],
        answer: 1,
        explain: "„stellen Sie Ihr Gepäck bitte in den Raum neben der Rezeption“ — orada saat 15'e kadar saklanıyor.",
      },
      {
        kind: "short_answer",
        text: "Was kostet ein Waschgang?",
        options: [],
        answer: 0,
        accept: ["drei Euro", "3 Euro", "3"],
        explain: "„Im Keller stehen zwei Maschinen, drei Euro pro Waschgang.“",
      },
      {
        text: "Das Frühstück ist bei jedem Zimmer dabei.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: kahvaltısız oda ayırtanlar altı euroya sonradan ekletiyor.",
      },
    ],
  },
  {
    id: "a2-u16-l1",
    level: "A2",
    skill: "listening",
    unit: 16,
    title: "An der Rezeption",
    genre: "Diyalog",
    intro: "Otel resepsiyonu. Rezervasyon var mı, oda hangi katta?",
    gloss: [
      { de: "reservieren", tr: "yer ayırtmak", en: "to reserve" },
      { de: "das Hotelzimmer", tr: "otel odası", en: "hotel room" },
      { de: "der Zimmerschlüssel", tr: "oda anahtarı", en: "room key" },
      { de: "einchecken", tr: "giriş yapmak", en: "to check in" },
      { de: "das Doppelbett", tr: "çift kişilik yatak", en: "double bed" },
      { de: "die Abreise", tr: "ayrılış", en: "departure" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Solak", text: "Guten Abend. Ich habe ein Zimmer reserviert, auf den Namen Solak." },
      { speaker: "Rezeption", text: "Einen Moment … ja, hier. Ein Doppelzimmer für drei Nächte, richtig?" },
      { speaker: "Frau Solak", text: "Für vier Nächte eigentlich. Abreise ist Sonntag." },
      { speaker: "Rezeption", text: "Oh, dann korrigiere ich das gleich. Sonntag, kein Problem, das Zimmer ist frei." },
      { speaker: "Frau Solak", text: "Danke. Hat das Zimmer ein Doppelbett?" },
      { speaker: "Rezeption", text: "Ja, Zimmer 214 im zweiten Stock. Hier ist Ihr Zimmerschlüssel." },
      { speaker: "Frau Solak", text: "Und mein Mann kommt erst morgen früh. Ab wann kann er einchecken?" },
      { speaker: "Rezeption", text: "Er hat ja Ihren Namen — er kann jederzeit kommen, auch nachts." },
      { speaker: "Frau Solak", text: "Sehr gut. Wann gibt es Frühstück?" },
      { speaker: "Rezeption", text: "Von halb sieben bis zehn, im Raum hinter der Treppe." },
    ],
    questions: [
      {
        text: "Wie lange bleibt Frau Solak?",
        options: ["Drei Nächte", "Vier Nächte", "Eine Woche"],
        answer: 1,
        explain: "Rezervasyonda üç gece yazıyordu, o düzeltti: „Für vier Nächte eigentlich.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ein Zimmer ___, auf den Namen Solak.",
        options: [],
        answer: 0,
        accept: ["reserviert"],
        explain: "Yabancı kökenli -ieren fiilleri Perfekt'te ge- almaz: reserviert, nicht gereserviert.",
      },
      {
        text: "In welchem Stock ist das Zimmer?",
        options: ["Im ersten", "Im zweiten", "Im dritten"],
        answer: 1,
        explain: "„Zimmer 214 im zweiten Stock.“",
      },
      {
        kind: "short_answer",
        text: "Wann gibt es Frühstück?",
        options: [],
        answer: 0,
        accept: ["von halb sieben bis zehn", "halb sieben bis zehn", "6:30 bis 10"],
        explain: "„Von halb sieben bis zehn, im Raum hinter der Treppe.“",
      },
    ],
  },
  {
    id: "a2-u16-l2",
    level: "A2",
    skill: "listening",
    unit: 16,
    title: "Am Flughafen",
    genre: "Diyalog",
    intro: "Check-in kuyruğu. Bagaj kaça çıkıyor, hangi kapıdan gidiliyor?",
    gloss: [
      { de: "die Bordkarte", tr: "biniş kartı", en: "boarding pass" },
      { de: "das Handgepäck", tr: "el bagajı", en: "hand luggage" },
      { de: "die Sicherheitskontrolle", tr: "güvenlik kontrolü", en: "security check" },
      { de: "die Passkontrolle", tr: "pasaport kontrolü", en: "passport control" },
      { de: "der Sitzplatz", tr: "koltuk", en: "seat" },
      { de: "die Ankunftszeit", tr: "varış saati", en: "arrival time" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Mitarbeiter", text: "Guten Morgen, Ihren Pass bitte. Geben Sie einen Koffer auf?" },
      { speaker: "Herr Nowak", text: "Nein, ich nehme nur Handgepäck mit." },
      { speaker: "Mitarbeiter", text: "Sehr gut, dann geht es schneller. Hier ist Ihre Bordkarte." },
      { speaker: "Herr Nowak", text: "Danke. Kann ich einen Sitzplatz am Fenster bekommen?" },
      { speaker: "Mitarbeiter", text: "Am Fenster ist leider alles voll. Gang, Reihe 12 — geht das?" },
      { speaker: "Herr Nowak", text: "Ja, in Ordnung. Wohin muss ich jetzt?" },
      { speaker: "Mitarbeiter", text: "Sie müssen zur Sicherheitskontrolle, dort links, dann zur Passkontrolle." },
      { speaker: "Herr Nowak", text: "Und wann ist die Ankunftszeit in Wien?" },
      { speaker: "Mitarbeiter", text: "Planmäßig 11:40 Ortszeit. Der Flug dauert eine Stunde zwanzig." },
      { speaker: "Herr Nowak", text: "Perfekt, dann schaffe ich meinen Termin." },
    ],
    questions: [
      {
        text: "Wie viel Gepäck gibt Herr Nowak auf?",
        options: ["Einen Koffer", "Zwei Koffer", "Keinen — nur Handgepäck"],
        answer: 2,
        explain: "„Nein, ich nehme nur Handgepäck mit.“",
      },
      {
        kind: "gapfill",
        text: "Sie müssen ___ Sicherheitskontrolle, dort links.",
        options: [],
        answer: 0,
        accept: ["zur"],
        explain: "Bir yere yönelirken zu + Dativ: zu der kısalıp zur olur.",
      },
      {
        text: "Welchen Sitzplatz bekommt er?",
        options: ["Am Fenster", "Am Gang", "In der ersten Reihe"],
        answer: 1,
        explain: "Pencere kenarı dolu: „Gang, Reihe 12 — geht das?“",
      },
      {
        kind: "dictation",
        text: "Herr Nowak'ın varış saatini sorduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Und wann ist die Ankunftszeit in Wien?", "Wann ist die Ankunftszeit in Wien?"],
        explain: "Havalimanında saat sormanın en doğrudan yolu.",
      },
    ],
  },
  {
    id: "a2-u16-w1",
    level: "A2",
    skill: "writing",
    unit: 16,
    title: "Ayrılabilen fiil, geçmiş zaman",
    genre: "Dil bilgisi",
    intro: "Ön ek başta kalır, ge- ortaya girer: einpacken → eingepackt.",
    gloss: [
      { de: "einpacken", tr: "bavula koymak", en: "to pack" },
      { de: "die Badehose", tr: "mayo", en: "swimming trunks" },
      { de: "mitnehmen", tr: "yanına almak", en: "to take along" },
      { de: "verstauen", tr: "yerleştirmek", en: "to stow" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Mayoyu bavula koydun mu?",
        answer: "Hast du die Badehose eingepackt",
        hint: "Ayrılabilen fiilde ge- ön ekle kökün arasına girer: ein-ge-packt.",
      },
      {
        kind: "build",
        tr: "Sadece el bagajı alıyorum.",
        answer: "Ich nehme nur Handgepäck mit",
        hint: "Şimdiki zamanda ön ek ayrılır ve cümlenin sonuna gider.",
      },
      {
        kind: "build",
        tr: "Bir oda ayırttım.",
        answer: "Ich habe ein Zimmer reserviert",
        hint: "-ieren ile biten fiiller Perfekt'te ge- almaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: ayrılabilen fiilin geçmiş biçimi yanlış kurulmuş.",
        source: "Ich habe den Laptop gemitgenommen.",
        answer: "Ich habe den Laptop mitgenommen.",
        alternatives: ["Ich habe den Laptop mitgenommen"],
        why: "ge- kelimenin başına değil, ön ekten sonra gelir — mit-ge-nommen.",
      },
    ],
  },
  {
    id: "a2-u16-w2",
    level: "A2",
    skill: "writing",
    unit: 16,
    title: "Eine Zimmerreservierung",
    genre: "Resmî yazı",
    intro: "Otele yaz: hangi tarih, kaç kişi, hangi oda, hangi soru?",
    gloss: [
      { de: "buchen", tr: "rezervasyon yapmak", en: "to book" },
      { de: "die Unterkunft", tr: "konaklama", en: "accommodation" },
      { de: "das Doppelbett", tr: "çift kişilik yatak", en: "double bed" },
      { de: "einchecken", tr: "giriş yapmak", en: "to check in" },
      { de: "die Anreise", tr: "geliş", en: "arrival" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Otele bir rezervasyon e-postası yaz. Hangi tarihlerde ve kaç kişi kalacağını, nasıl bir oda istediğini yaz, giriş saatini sor ve fiyatı öğrenmek istediğini belirt.",
        stimulus:
          "HOTEL AM PARK\n\n" +
          "Einzelzimmer ab 65 € / Nacht · Doppelzimmer ab 89 € / Nacht\n" +
          "Frühstück 9 € pro Person · Parkplatz vorhanden\n" +
          "Check-in ab 15 Uhr, Check-out bis 11 Uhr\n\n" +
          "Anfragen bitte an: info@hotel-am-park.de",
        checklist: [
          "Resmî hitapla ve konu cümlesiyle başladın mı?",
          "Tarihleri ve kişi sayısını yazdın mı?",
          "Nasıl bir oda istediğini söyledin mi?",
          "En az bir soru sordun mu (giriş saati, kahvaltı ya da fiyat)?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich möchte ein Doppelzimmer buchen.", tr: "çift kişilik bir oda ayırtmak istiyorum", en: "I'd like to book a double room" },
          { de: "Ab wann kann ich einchecken?", tr: "saat kaçtan itibaren giriş yapabilirim", en: "from when can I check in" },
          { de: "Wie hoch ist der Preis pro Nacht?", tr: "gecelik fiyat ne kadar", en: "how much is it per night" },
        ],
        sample:
          "Betreff: Zimmerreservierung 12.–15. Juni\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich möchte bei Ihnen ein Doppelzimmer buchen, vom 12. bis zum 15. Juni, für zwei Personen. Wenn möglich, hätten wir gern ein Zimmer mit Doppelbett und ruhig zum Hof.\n\n" +
          "Unsere Anreise ist am Freitag gegen 13 Uhr. Ab wann kann ich einchecken? Können wir das Gepäck vorher bei Ihnen lassen?\n\n" +
          "Außerdem: wie hoch ist der Preis pro Nacht mit Frühstück?\n\n" +
          "Vielen Dank im Voraus.\n\n" +
          "Mit freundlichen Grüßen\nDeniz Solak",
      },
    ],
  },
];

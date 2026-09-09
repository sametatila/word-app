import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Konu seçimi Patika'nın A2 derslerinin dışından: orada tatil, sağlık, ev,
 * iş, alışveriş ve kutlama sahneleri zaten var. Burada mahalle inisiyatifi
 * (tamir kafesi), dil değişimi (tandem) ve yeni bir hobiye davet var; üçü de
 * A2'nin işini yapıyor — geçmişi anlatmak, karşılaştırmak, anlaşmak.
 *
 * Dil bilgisi odağı A2'nin belirleyicisi: Perfekt. Söyleyiş drilli Almancanın
 * Türkçede hiç bulunmayan iki „ch“ sesine ayrıldı.
 */
export const deA2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r1",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Repair-Café im Stadtteilzentrum",
    genre: "phone",
    intro: "Mahalle merkezinin panosundaki duyuruyu okuyacaksın: kim ne tamir ediyor, ne zaman ve hangi kuralla.",
    gloss: [
      { de: "das Werkzeug", tr: "alet", en: "tool" },
      { de: "funktionieren", tr: "çalışmak", en: "to work" },
      { de: "wegwerfen", tr: "atmak", en: "to throw away" },
      { de: "der Eintritt", tr: "giriş ücreti", en: "entrance fee" },
      { de: "kostenlos", tr: "ücretsiz", en: "free" },
      { de: "der Stadtteil", tr: "semt", en: "district" },
    ],
    minutes: 5,
    text:
      "REPAIR-CAFÉ IM STADTTEILZENTRUM\n\n" +
      "Ist Ihre Lampe kaputt? Funktioniert Ihr altes Radio nicht mehr? Werfen Sie es nicht weg. Bringen Sie es zu uns.\n\n" +
      "Wir treffen uns einmal im Monat, immer am zweiten Samstag, von 14 bis 18 Uhr im Erdgeschoss vom Stadtteilzentrum. " +
      "Zehn Nachbarn helfen hier: Sie reparieren Lampen, Radios, Fahrräder und alte Uhren. Niemand von uns ist Profi, " +
      "aber wir machen das seit vier Jahren.\n\n" +
      "Wichtig: Wir reparieren nicht für Sie, wir reparieren mit Ihnen. Sie sitzen daneben, Sie halten das Werkzeug, " +
      "und Sie lernen dabei etwas. Beim nächsten Mal können Sie es vielleicht selbst.\n\n" +
      "Der Eintritt ist kostenlos. Kaffee und Kuchen kosten zwei Euro. Eine Anmeldung brauchen Sie nicht. " +
      "Aber kommen Sie früh, denn nach 16 Uhr ist es oft sehr voll.\n\n" +
      "Und noch etwas: Nicht alles wird wieder gut. Ungefähr sieben von zehn Sachen funktionieren am Ende wieder.",
    questions: [
      {
        text: "Was ist das Repair-Café?",
        options: [
          "Nachbarn reparieren zusammen mit den Besuchern kaputte Sachen.",
          "Ein Geschäft repariert alte Geräte für wenig Geld.",
          "Ein Kurs, in dem man einen Beruf lernen kann.",
        ],
        answer: 0,
        explain: "„Zehn Nachbarn helfen hier“ ve „Wir reparieren nicht für Sie, wir reparieren mit Ihnen“ — dükkân da kurs da değil, ortak bir çalışma.",
      },
      {
        text: "Wie oft findet das Repair-Café statt?",
        options: ["einmal im Monat", "jeden Samstag", "zweimal im Monat"],
        answer: 0,
        explain: "„Wir treffen uns einmal im Monat, immer am zweiten Samstag.“ — „am zweiten Samstag“ ayın hangi cumartesi olduğunu söylüyor, sayıyı değil.",
      },
      {
        kind: "truefalse",
        text: "Die Besucher schauen nur zu und warten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Sie sitzen daneben, Sie halten das Werkzeug“ — ziyaretçi işin içinde, seyirci değil.",
      },
      {
        kind: "gapfill",
        text: "Der Eintritt ist ___.",
        options: [],
        answer: 0,
        accept: ["kostenlos", "frei"],
        explain: "„Der Eintritt ist kostenlos.“ Yalnız kahve ve kek iki euro tutuyor.",
      },
      {
        kind: "short_answer",
        text: "Wo im Haus ist das Repair-Café?",
        options: [],
        answer: 0,
        accept: ["im Erdgeschoss", "Erdgeschoss", "im Erdgeschoss vom Stadtteilzentrum"],
        explain: "„… im Erdgeschoss vom Stadtteilzentrum.“ — zemin katta.",
      },
      {
        text: "Warum soll man früh kommen?",
        options: [
          "Später ist es oft sehr voll.",
          "Nach 16 Uhr kostet der Eintritt Geld.",
          "Am Nachmittag gehen die Helfer nach Hause.",
        ],
        answer: 0,
        explain: "„… kommen Sie früh, denn nach 16 Uhr ist es oft sehr voll.“ Kapanış saati 18, giriş hep ücretsiz.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l1",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Ein Tandem-Partner",
    genre: "phone",
    intro: "Lena, kütüphanedeki ilana cevap veriyor. İkisi dil değişimi için nasıl bir düzen kurduklarını konuşuyor.",
    gloss: [
      { de: "die Anzeige", tr: "ilan", en: "advert" },
      { de: "der Fehler", tr: "hata", en: "mistake" },
      { de: "korrigieren", tr: "düzeltmek", en: "to correct" },
      { de: "nervös", tr: "gergin", en: "nervous" },
      { de: "einverstanden", tr: "anlaştık", en: "agreed" },
      { de: "eine halbe Stunde", tr: "yarım saat", en: "half an hour" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Lena", text: "Hallo, hier ist Lena Brandt. Ich habe deine Anzeige in der Bibliothek gelesen." },
      { speaker: "Murat", text: "Hallo Lena! Schön, dass du anrufst. Du suchst also einen Tandem-Partner?" },
      { speaker: "Lena", text: "Genau. Ich lerne seit einem Jahr Türkisch, aber ich spreche fast nie." },
      { speaker: "Murat", text: "Bei mir ist es andersherum. Ich wohne seit zwei Jahren hier und verstehe schon viel, aber ich mache noch viele Fehler." },
      { speaker: "Lena", text: "Dann passt das gut. Wie machen wir das? Eine Stunde Deutsch und eine Stunde Türkisch?" },
      { speaker: "Murat", text: "Lieber eine halbe Stunde und eine halbe Stunde. Zwei Stunden sind mir zu lang." },
      { speaker: "Lena", text: "Einverstanden. Wann hast du Zeit?" },
      { speaker: "Murat", text: "Am Dienstagnachmittag, so gegen fünf. Und du?" },
      { speaker: "Lena", text: "Dienstag ist perfekt. Treffen wir uns im Café neben der Bibliothek?" },
      { speaker: "Murat", text: "Gern. Aber bitte korrigier mich nicht bei jedem Wort. Das macht mich nervös." },
      { speaker: "Lena", text: "Verstanden, nur am Ende. Dann bis Dienstag!" },
    ],
    questions: [
      {
        text: "Warum ruft Lena an?",
        options: [
          "Sie hat eine Anzeige gelesen und sucht einen Tandem-Partner.",
          "Sie möchte einen Türkischkurs in der Bibliothek buchen.",
          "Sie sucht eine Arbeit als Lehrerin.",
        ],
        answer: 0,
        explain: "„Ich habe deine Anzeige in der Bibliothek gelesen“ ve Murat'ın sorusu bunu onaylıyor: „Du suchst also einen Tandem-Partner?“",
      },
      {
        text: "Was ist Lenas Problem?",
        options: [
          "Sie lernt Türkisch, aber sie spricht fast nie.",
          "Sie versteht Türkisch überhaupt nicht.",
          "Sie hat keine Zeit für einen Kurs.",
        ],
        answer: 0,
        explain: "„Ich lerne seit einem Jahr Türkisch, aber ich spreche fast nie.“ Hiç anlamamak Murat'ın değil, kimsenin durumu değil.",
      },
      {
        kind: "truefalse",
        text: "Murat möchte jedes Mal zwei Stunden üben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Lieber eine halbe Stunde und eine halbe Stunde. Zwei Stunden sind mir zu lang.“ — toplam bir saat.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag treffen sie sich?",
        options: [],
        answer: 0,
        accept: ["am Dienstag", "Dienstag", "dienstags", "am Dienstagnachmittag"],
        explain: "„Am Dienstagnachmittag, so gegen fünf“ — Lena „Dienstag ist perfekt“ diyor.",
      },
      {
        kind: "dictation",
        text: "Murat kendi durumunu anlatıyor: hataları hakkındaki cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["aber ich mache noch viele Fehler", "ich mache noch viele Fehler"],
        explain: "„… aber ich mache noch viele Fehler.“ — „noch“ burada „hâlâ“ demek.",
      },
      {
        text: "Was möchte Murat nicht?",
        options: [
          "Lena soll ihn nicht bei jedem Wort korrigieren.",
          "Er möchte sich nicht in einem Café treffen.",
          "Er möchte kein Türkisch sprechen.",
        ],
        answer: 0,
        explain: "„Bitte korrigier mich nicht bei jedem Wort. Das macht mich nervös.“ Kafeye ve Türkçeye itirazı yok.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w1",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Mein neues Hobby",
    genre: "message",
    intro: "Yeni bir şeye başladın. Önce iki cümle kur, sonra bir arkadaşına yazıp onu da çağır.",
    gloss: [
      { de: "anfangen", tr: "başlamak", en: "to start" },
      { de: "der Chor", tr: "koro", en: "choir" },
      { de: "die Probe", tr: "prova", en: "rehearsal" },
      { de: "Lust haben", tr: "canı istemek", en: "to feel like" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Geçen hafta yeni bir kursa başladım.",
        answer: "Letzte Woche habe ich einen neuen Kurs angefangen.",
        alternatives: ["Ich habe letzte Woche einen neuen Kurs angefangen."],
        hint: "Perfekt iki parçalıdır: yardımcı fiil (habe) ikinci sırada, ortaç cümlenin SONUNDA. Ayrılabilen fiilde ge- ortaya girer: an-ge-fangen.",
      },
      {
        kind: "build",
        tr: "Cumartesi günü arkadaşlarımla tiyatroya gittim.",
        answer: "Am Samstag bin ich mit meinen Freunden ins Theater gegangen.",
        alternatives: ["Ich bin am Samstag mit meinen Freunden ins Theater gegangen."],
        hint: "„gehen“ bir yer değişimi, o yüzden Perfekt'i „sein“ ile kurulur: bin … gegangen. Zaman başa gelince fiil yine ikinci sırada.",
      },
      {
        kind: "free",
        prompt:
          "Birkaç haftadır yeni bir şey yapıyorsun (spor, koro, kurs, gönüllülük — sen seç). Bir arkadaşına yaz: ne zaman başladın, nasıl gidiyor, ilk gün nasıldı ve onu da çağır.",
        checklist: [
          "Ne zaman ve neye başladığını yaz",
          "İlk günü geçmiş zamanla anlat",
          "Şimdi nasıl gittiğini söyle",
          "Arkadaşını çağır ve bir gün öner",
        ],
        minWords: 40,
        phrases: [
          { de: "Seit … mache ich …", tr: "…'den beri … yapıyorum" },
          { de: "Am Anfang war es …", tr: "Başta … idi" },
          { de: "Inzwischen …", tr: "Artık …" },
          { de: "Hast du Lust, …?", tr: "… ister misin?" },
          { de: "Melde dich, wenn …", tr: "… olursa haber ver" },
        ],
        sample:
          "Hallo Jana, ich habe eine Neuigkeit: Seit drei Wochen singe ich in einem Chor. Eine Kollegin hat mich mitgenommen. " +
          "Am Anfang war es furchtbar, denn ich habe die Texte nicht gekannt und war ziemlich nervös. " +
          "Inzwischen macht es mir richtig Spaß, und die Leute sind sehr nett. " +
          "Wir proben immer am Mittwoch um 19 Uhr im Stadtteilzentrum. Hast du Lust, einmal mitzukommen? " +
          "Melde dich, wenn du am Mittwoch Zeit hast. Liebe Grüße, Ayla",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s1",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Zwei ch-Laute",
    genre: "pronounce",
    intro: "Almancada „ch“ iki ayrı sestir: ince ünlüden sonra yumuşak (ich), kalın ünlüden sonra boğazdan (Buch). İkisi de Türkçede yok.",
    gloss: [
      { de: "die Tochter", tr: "kız evlat", en: "daughter" },
      { de: "der Mittwoch", tr: "çarşamba", en: "Wednesday" },
      { de: "die Küche", tr: "mutfak", en: "kitchen" },
      { de: "besuchen", tr: "ziyaret etmek", en: "to visit" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich möchte einen Kaffee.",
        tr: "Bir kahve istiyorum.",
        hint: "„ich“ ve „möchte“: ince ch. Dilin ortası damağa yaklaşır, hava süzülür — „iş“ değil, „ik“ hiç değil.",
        confusions: [
          { heard: ["isch möchte", "ik möchte", "is mochte"], fix: "„ich“ sonunu „ş“ ya da „k“ yapma; yumuşak bir üfleme sesi ver.", expected: "ich" },
        ],
      },
      {
        de: "Das Buch liegt auf dem Tisch.",
        tr: "Kitap masanın üstünde.",
        hint: "„Buch“: kalın ch. Ses boğazın arkasından gelir, „u“ sesinin devamı gibi.",
        confusions: [
          { heard: ["das buk", "das butsch", "das buh"], fix: "„Buch“ sonunu „k“ yapma; sesi boğazda sürdür.", expected: "Buch" },
        ],
      },
      {
        de: "Meine Tochter kocht sehr gut.",
        tr: "Kızım çok iyi yemek yapıyor.",
        hint: "„Tochter“ ve „kocht“: ikisinde de kalın ch, çünkü öncesinde „o“ var.",
        confusions: [
          { heard: ["tokter", "toschter", "kokt"], fix: "„o“dan sonra ch boğazdan gelir, „k“ değil.", expected: "Tochter" },
        ],
      },
      {
        de: "Am Mittwoch habe ich frei.",
        tr: "Çarşamba günü iznim var.",
        hint: "„Mittwoch“: kalın ch. „ich“: ince ch. İkisi aynı cümlede.",
        confusions: [
          { heard: ["mittwok", "mittwosch"], fix: "Aynı cümlede iki ayrı ch var; „Mittwoch“ boğazdan, „ich“ damaktan.", expected: "Mittwoch" },
        ],
      },
      {
        de: "Die Küche ist noch nicht fertig.",
        tr: "Mutfak henüz hazır değil.",
        hint: "„Küche“ ve „nicht“: ince ch, çünkü öncesinde ü ve i var.",
        confusions: [
          { heard: ["kuke", "kusche", "nischt"], fix: "„ü“den sonra ch incedir; „ş“ sesine kaydırma.", expected: "Küche" },
        ],
      },
      {
        de: "Wir besuchen am Sonntag meine Schwester.",
        tr: "Pazar günü kız kardeşimi ziyaret ediyoruz.",
        hint: "„besuchen“: kalın ch. „Schwester“ başındaki „sch“ ise tek bir „ş“ sesidir.",
        confusions: [
          { heard: ["besuken", "besuschen"], fix: "„u“dan sonra ch boğazdan; „sch“ ile karıştırma.", expected: "besuchen" },
        ],
      },
      {
        de: "Ich mache das nicht noch einmal.",
        tr: "Bunu bir daha yapmam.",
        hint: "„mache“: kalın ch. „ich“ ve „nicht“: ince ch. Üçü bir cümlede.",
        confusions: [
          { heard: ["ik make", "isch mache das nischt"], fix: "„a“dan sonra kalın, „i“den sonra ince; ikisini de „ş“ yapma.", expected: "mache" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g1",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "haben oder sein?",
    genre: "grammar",
    intro: "Geçmişi anlatmanın konuşma dilindeki yolu: iki parçalı Perfekt ve doğru yardımcı fiil.",
    focus: "Perfekt: haben ya da sein + Partizip II",
    gloss: [
      { de: "einkaufen", tr: "alışveriş yapmak", en: "to shop" },
      { de: "anrufen", tr: "telefon etmek", en: "to call" },
      { de: "bleiben", tr: "kalmak", en: "to stay" },
      { de: "verkaufen", tr: "satmak", en: "to sell" },
      { de: "backen", tr: "fırında pişirmek", en: "to bake" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İki parça, iki ayrı yer",
        tr: "Türkçede geçmiş tek ekle biter: „çalıştım“. Almancada iki parça var ve ikisi cümlenin iki ucunda durur: yardımcı fiil ikinci sırada, asıl fiilin ortacı en sonda. Aradaki her şey bu iki parçanın arasına girer.",
        examples: [
          { de: "Ich habe gestern lange gearbeitet.", tr: "Dün uzun çalıştım.", note: "habe ikinci sırada, gearbeitet sonda" },
          { de: "Wir haben einen guten Film gesehen.", tr: "İyi bir film izledik." },
        ],
      },
      {
        heading: "Partizip II nasıl kurulur",
        tr: "Çoğu fiilde ge- + kök + -t: kaufen → gekauft. Güçlü fiillerde -en ile biter ve ünlü değişebilir: sehen → gesehen. Ayrılabilen fiillerde ge- ortaya girer: einkaufen → eingekauft. -ieren ile bitenler ve be-, ver-, er- ile başlayanlar ge- ALMAZ.",
        examples: [
          { de: "Ich habe im Supermarkt eingekauft.", tr: "Süpermarkette alışveriş yaptım.", note: "ein-ge-kauft" },
          { de: "Sie hat mich gestern angerufen.", tr: "Dün beni aradı.", note: "an-ge-rufen" },
          { de: "Wir haben lange telefoniert.", tr: "Uzun konuştuk.", note: "-ieren: ge- yok" },
          { de: "Er hat sein Auto verkauft.", tr: "Arabasını sattı.", note: "ver-: ge- yok" },
        ],
      },
      {
        heading: "haben mı sein mi",
        tr: "Fiillerin çoğu haben alır. Bir yerden bir yere gitmeyi (gehen, fahren, kommen, fliegen) ve durum değişimini (aufstehen, einschlafen, werden) anlatanlar sein alır. „bleiben“ ve „sein“ de sein ile gider — kural değil, ezber.",
        examples: [
          { de: "Ich bin nach Hause gegangen.", tr: "Eve gittim.", note: "yer değişimi → sein" },
          { de: "Ich habe zu Hause gegessen.", tr: "Evde yemek yedim.", note: "yer değişimi yok → haben" },
          { de: "Wir sind drei Tage in Wien geblieben.", tr: "Üç gün Viyana'da kaldık.", note: "bleiben → sein" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ gestern einen Film gesehen.",
        options: ["habe", "bin", "war"],
        answer: 0,
        explain: "„sehen“ bir yer değişimi değil, o yüzden haben: Ich habe … gesehen.",
      },
      {
        text: "Wir ___ am Samstag nach Berlin gefahren.",
        options: ["sind", "haben", "waren"],
        answer: 0,
        explain: "„fahren“ bir yerden bir yere gitmek demek; Perfekt'i sein ile kurulur.",
      },
      {
        text: "Wie heißt das Partizip II von „kaufen“?",
        options: ["gekauft", "gekaufen", "kaufte"],
        answer: 0,
        explain: "Zayıf fiil: ge- + kök + -t → gekauft. „kaufte“ Präteritum, ortaç değil.",
      },
      {
        kind: "gapfill",
        text: "Sie hat mich gestern ___. (anrufen)",
        options: [],
        answer: 0,
        accept: ["angerufen"],
        explain: "Ayrılabilen fiilde ge- ön ekle kökün arasına girer: an-ge-rufen.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ drei Tage in Hamburg ___. (bleiben)",
        options: [],
        answer: 0,
        accept: ["bin geblieben", "bin ... geblieben"],
        explain: "„bleiben“ sein ile gider ve ortacı geblieben: Ich bin … geblieben.",
      },
      {
        kind: "gapfill",
        text: "Wir haben eine Stunde ___. (telefonieren)",
        options: [],
        answer: 0,
        accept: ["telefoniert"],
        explain: "-ieren ile biten fiiller ge- almaz: telefoniert.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "habe", "das Buch", "gelesen"],
        explain: "Özne, yardımcı fiil ikinci sırada, nesne ortada, ortaç sonda: Ich habe das Buch gelesen.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe nach Hause gegangen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„gehen“ yer değişimidir, sein ister: Ich bin nach Hause gegangen.",
      },
      {
        kind: "truefalse",
        text: "„Wir haben einen Kuchen gebacken.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„backen“ yer değişimi değil; haben doğru, ortacı da gebacken.",
      },
      {
        text: "Perfekt cümlesinde ortaç (Partizip II) nerede durur?",
        options: ["cümlenin sonunda", "yardımcı fiilin hemen yanında", "cümlenin başında"],
        answer: 0,
        explain: "İki parça cümlenin iki ucundadır: yardımcı fiil ikinci sırada, ortaç en sonda.",
      },
    ],
  },
];

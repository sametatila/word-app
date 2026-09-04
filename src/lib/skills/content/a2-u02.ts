import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 2 — "Aksilikler ve eski günler".
 *
 * Dört ders: Chaos am Montag · Ein altes Foto · Früher war alles anders ·
 * Mein erstes Mal. İçerik ünite 1-2'nin kelimeleriyle sınırlı.
 *
 *   Ünite 2: verschlafen, verpassen, sich verspäten, anhalten, stehenbleiben,
 *            nass, hektisch, schrecklich · damals, das Gesicht, blond,
 *            schüchtern, brav, verspielt, die Grundschule, fotografieren ·
 *            anders, modern, altmodisch, das Gegenteil, jahrelang,
 *            der Fernseher, der Wagen, verschieden · nervös, plötzlich,
 *            die Erfahrung, erleichtert, der Führerschein, aufregend,
 *            der Club, überrascht
 *   Kalıplar: Ich habe verschlafen. · Ich habe … verpasst. · Damals war ich … ·
 *             Wir hatten keinen … · Früher war alles anders. ·
 *             Das war eine … Erfahrung.
 *
 * Ünite 1 Perfekt'i kurdu; burada ikinci geçmiş biçimi devreye giriyor:
 * olmak ve sahip olmak fiillerinin kısa geçmişi (war / hatte). İki biçim
 * bilerek yan yana çalışıyor — olay Perfekt ile, durum ve tarif war/hatte ile.
 */
export const a2U02: SkillExercise[] = [
  {
    id: "a2-u02-r1",
    level: "A2",
    skill: "reading",
    unit: 2,
    title: "Ein schrecklicher Montag",
    genre: "Blog yazısı",
    intro: "Ters giden bir sabahın anlatımı. Sırayla ne oldu?",
    gloss: [
      { de: "verschlafen", tr: "uyuyakalmak", en: "to oversleep" },
      { de: "verpassen", tr: "kaçırmak", en: "to miss" },
      { de: "sich verspäten", tr: "gecikmek", en: "to be late" },
      { de: "stehenbleiben", tr: "olduğu yerde durmak", en: "to stop" },
      { de: "nass", tr: "ıslak", en: "wet" },
      { de: "hektisch", tr: "telaşlı", en: "hectic" },
      { de: "schrecklich", tr: "korkunç", en: "terrible" },
    ],
    minutes: 3,
    text:
      "Manche Tage gehen einfach schief. Mein Montag war so ein Tag.\n\n" +
      "Zuerst habe ich verschlafen, weil mein Wecker nicht geklingelt hat. Ich bin um Viertel nach acht aufgewacht — eine Stunde zu spät. Ich habe mich nicht geduscht, nur schnell angezogen, und bin aus dem Haus gelaufen.\n\n" +
      "An der Haltestelle habe ich dann den Bus verpasst. Der nächste kam erst nach zwanzig Minuten, und es hat die ganze Zeit geregnet. Meine Schuhe und meine Jacke waren komplett nass.\n\n" +
      "Im Bus ist dann auch noch die Heizung stehengeblieben. Alle Leute waren nass und schlecht gelaunt. Im Büro habe ich mich um fast eine Stunde verspätet. Mein Chef hat nichts gesagt, aber der ganze Vormittag war hektisch.\n\n" +
      "Am Abend war ich einfach nur müde. Ein schrecklicher Tag — zum Glück nur einer.",
    questions: [
      {
        text: "Warum hat der Autor verschlafen?",
        options: ["Er ist spät ins Bett gegangen.", "Sein Wecker hat nicht geklingelt.", "Er war krank."],
        answer: 1,
        explain: "„weil mein Wecker nicht geklingelt hat“ — sebep yan cümlede veriliyor.",
      },
      {
        kind: "gapfill",
        text: "An der Haltestelle habe ich den Bus ___.",
        options: [],
        answer: 0,
        accept: ["verpasst"],
        explain: "„verpassen“ vurgusuz bir ön ekle başlar, o yüzden ortaç „ge“ almaz: verpasst.",
      },
      {
        text: "Wie lange hat er auf den nächsten Bus gewartet?",
        options: ["Zehn Minuten", "Zwanzig Minuten", "Eine Stunde"],
        answer: 1,
        explain: "„Der nächste kam erst nach zwanzig Minuten.“ Bir saat, işe geç kalma süresi.",
      },
      {
        kind: "short_answer",
        text: "Um wie viel Uhr ist er aufgewacht?",
        options: [],
        answer: 0,
        accept: ["um Viertel nach acht", "Viertel nach acht", "8 Uhr 15"],
        explain: "„Ich bin um Viertel nach acht aufgewacht — eine Stunde zu spät.“",
      },
      {
        text: "Der Chef war sehr wütend.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Mein Chef hat nichts gesagt.“ Metinde kızgınlıktan söz edilmiyor.",
      },
    ],
  },
  {
    id: "a2-u02-r2",
    level: "A2",
    skill: "reading",
    unit: 2,
    title: "Früher und heute",
    genre: "Dergi yazısı",
    intro: "Bir dergi yazısı: yetmişli yıllarda evler nasıldı, bugün nasıl?",
    gloss: [
      { de: "damals", tr: "o zamanlar", en: "back then" },
      { de: "anders", tr: "başka türlü", en: "different" },
      { de: "altmodisch", tr: "eski moda", en: "old-fashioned" },
      { de: "modern", tr: "modern", en: "modern" },
      { de: "der Fernseher", tr: "televizyon", en: "television set" },
      { de: "der Wagen", tr: "otomobil", en: "car" },
      { de: "jahrelang", tr: "yıllarca", en: "for years" },
      { de: "verschieden", tr: "farklı", en: "different" },
    ],
    minutes: 3,
    text:
      "Wie hat eine normale Familie vor fünfzig Jahren gelebt? Wir haben mit Frau Bergmann gesprochen. Sie ist 78 Jahre alt.\n\n" +
      "„Damals war alles anders“, sagt sie. „Wir hatten keinen Wagen. Mein Mann ist jahrelang mit dem Rad zur Arbeit gefahren, bei jedem Wetter. Und wir hatten nur einen Fernseher im ganzen Haus. Am Abend haben alle zusammen im Wohnzimmer gesessen.“\n\n" +
      "Heute ist das Gegenteil normal: viele Familien haben zwei Autos, und jeder hat einen eigenen Bildschirm. Die Wohnungen sind moderner, aber die Möbel von damals findet Frau Bergmann gar nicht altmodisch.\n\n" +
      "„Die Zeiten sind verschieden“, sagt sie. „Nicht besser, nicht schlechter. Einfach anders.“",
    questions: [
      {
        text: "Wie ist Herr Bergmann zur Arbeit gefahren?",
        options: ["Mit dem Wagen", "Mit dem Rad", "Mit dem Bus"],
        answer: 1,
        explain: "„Mein Mann ist jahrelang mit dem Rad zur Arbeit gefahren.“ Otomobilleri yoktu.",
      },
      {
        kind: "gapfill",
        text: "Wir hatten keinen ___.",
        options: [],
        answer: 0,
        accept: ["Wagen"],
        explain: "„Wir hatten keinen Wagen.“ Eril isim nesne olunca olumsuzluk kelimesi de eril belirtme hâlini alır.",
      },
      {
        text: "Wie viele Fernseher hatte die Familie?",
        options: ["Einen", "Zwei", "Keinen"],
        answer: 0,
        explain: "„wir hatten nur einen Fernseher im ganzen Haus“ — bu yüzden akşamları herkes bir odadaydı.",
      },
      {
        kind: "short_answer",
        text: "Wie alt ist Frau Bergmann?",
        options: [],
        answer: 0,
        accept: ["78", "78 Jahre", "78 Jahre alt"],
        explain: "„Sie ist 78 Jahre alt.“",
      },
      {
        text: "Frau Bergmann findet die alten Möbel altmodisch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „die Möbel von damals findet Frau Bergmann gar nicht altmodisch“.",
      },
    ],
  },
  {
    id: "a2-u02-l1",
    level: "A2",
    skill: "listening",
    unit: 2,
    title: "Warum kommst du so spät?",
    genre: "Diyalog",
    intro: "Bir buluşmaya geç kalan arkadaş sebebini anlatıyor.",
    gloss: [
      { de: "sich verspäten", tr: "gecikmek", en: "to be late" },
      { de: "verschlafen", tr: "uyuyakalmak", en: "to oversleep" },
      { de: "anhalten", tr: "durmak", en: "to stop" },
      { de: "verpassen", tr: "kaçırmak", en: "to miss" },
      { de: "nass", tr: "ıslak", en: "wet" },
      { de: "erleichtert", tr: "içi rahatlamış", en: "relieved" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Lena", text: "Da bist du ja endlich! Ich warte seit vierzig Minuten." },
      { speaker: "Kerem", text: "Es tut mir wirklich leid. Ich habe mich verspätet, und mein Handy war leer." },
      { speaker: "Lena", text: "Hast du wieder verschlafen?" },
      { speaker: "Kerem", text: "Nein, diesmal nicht. Ich bin pünktlich losgegangen, aber die Bahn ist zwischen zwei Stationen einfach angehalten." },
      { speaker: "Lena", text: "Und wie lange?" },
      { speaker: "Kerem", text: "Fast eine halbe Stunde. Danach habe ich auch noch den Anschlussbus verpasst und bin zu Fuß gelaufen. Jetzt bin ich komplett nass." },
      { speaker: "Lena", text: "Okay, dann bin ich erleichtert. Ich dachte schon, du hast unseren Termin vergessen." },
    ],
    questions: [
      {
        text: "Wie lange hat Lena gewartet?",
        options: ["Zwanzig Minuten", "Vierzig Minuten", "Eine Stunde"],
        answer: 1,
        explain: "„Ich warte seit vierzig Minuten.“ Yarım saat trenin durduğu süre.",
      },
      {
        kind: "gapfill",
        text: "Die Bahn ist zwischen zwei Stationen einfach ___.",
        options: [],
        answer: 0,
        accept: ["angehalten"],
        explain: "„anhalten“ hem ayrılabilen hem kuralsız: ortaç angehalten, yardımcı fiil „ist“.",
      },
      {
        text: "Warum ist Kerem nass?",
        options: ["Er ist zu Fuß gelaufen.", "Er hat geduscht.", "Es hat im Bus geregnet."],
        answer: 0,
        explain: "Otobüsü kaçırınca yürümüş: „bin zu Fuß gelaufen. Jetzt bin ich komplett nass.“",
      },
      {
        kind: "dictation",
        text: "Kerem'in geç kalma sebebini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ich habe mich verspätet, und mein Handy war leer."],
        explain: "Dönüşlü fiil: „sich verspäten“ → habe mich verspätet. Zamir yardımcı fiilden hemen sonra durur.",
      },
    ],
  },
  {
    id: "a2-u02-l2",
    level: "A2",
    skill: "listening",
    unit: 2,
    title: "Wer ist das auf dem Foto?",
    genre: "Diyalog",
    intro: "İki arkadaş eski bir okul fotoğrafına bakıyor. Kim kimdi, nasıl biriydi?",
    gloss: [
      { de: "damals", tr: "o zamanlar", en: "back then" },
      { de: "die Grundschule", tr: "ilkokul", en: "primary school" },
      { de: "blond", tr: "sarışın", en: "blond" },
      { de: "schüchtern", tr: "utangaç", en: "shy" },
      { de: "verspielt", tr: "oyunbaz", en: "playful" },
      { de: "das Gesicht", tr: "yüz", en: "face" },
      { de: "fotografieren", tr: "fotoğraf çekmek", en: "to photograph" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nora", text: "Schau mal, was ich gefunden habe! Ein Foto aus der Grundschule." },
      { speaker: "Timo", text: "Oh nein. Bist du das in der ersten Reihe? Du warst ja blond!" },
      { speaker: "Nora", text: "Ja, damals war ich blond. Und ich war furchtbar schüchtern — ich habe fast nie etwas gesagt." },
      { speaker: "Timo", text: "Das kann ich mir gar nicht vorstellen. Und wer ist der Junge daneben?" },
      { speaker: "Nora", text: "Das ist mein Bruder. Er war sehr verspielt und nie brav. Meine Eltern hatten wirklich keine ruhige Zeit." },
      { speaker: "Timo", text: "Sein Gesicht sieht heute noch genauso aus. Wer hat das Foto denn fotografiert?" },
      { speaker: "Nora", text: "Unsere Lehrerin. Sie hat jedes Jahr im Juni die ganze Klasse fotografiert." },
    ],
    questions: [
      {
        text: "Wo war Nora auf dem Foto?",
        options: ["In der ersten Reihe", "Ganz hinten", "Neben der Lehrerin"],
        answer: 0,
        explain: "Timo soruyor: „Bist du das in der ersten Reihe?“ ve Nora onaylıyor.",
      },
      {
        kind: "gapfill",
        text: "Damals war ich ___.",
        options: [],
        answer: 0,
        accept: ["blond"],
        explain: "„Ja, damals war ich blond.“ Olmak fiilinin kısa geçmişi: war.",
      },
      {
        text: "Wie war Noras Bruder als Kind?",
        options: ["Sehr brav", "Sehr schüchtern", "Sehr verspielt"],
        answer: 2,
        explain: "„Er war sehr verspielt und nie brav.“ Utangaç olan Nora'ydı.",
      },
      {
        kind: "short_answer",
        text: "Wer hat das Foto gemacht?",
        options: [],
        answer: 0,
        accept: ["die Lehrerin", "unsere Lehrerin", "Lehrerin"],
        explain: "„Unsere Lehrerin. Sie hat jedes Jahr im Juni die ganze Klasse fotografiert.“",
      },
    ],
  },
  {
    id: "a2-u02-w1",
    level: "A2",
    skill: "writing",
    unit: 2,
    title: "war und hatte",
    genre: "Dil bilgisi",
    intro: "İki fiilin kısa geçmişi: durum ve sahip olmak. Perfekt ile karışmaz.",
    gloss: [
      { de: "damals", tr: "o zamanlar", en: "back then" },
      { de: "schüchtern", tr: "utangaç", en: "shy" },
      { de: "der Fernseher", tr: "televizyon", en: "television set" },
      { de: "verschlafen", tr: "uyuyakalmak", en: "to oversleep" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "O zamanlar çok utangaçtım.",
        answer: "Damals war ich sehr schüchtern",
        hint: "Olmak fiili geçmişte Perfekt kurmaz, kısa biçimini alır: war. Zaman ifadesi başta olunca özne arkaya düşer.",
      },
      {
        kind: "build",
        tr: "Bizim televizyonumuz yoktu.",
        answer: "Wir hatten keinen Fernseher",
        hint: "„Yoktu“ = sahip olmak fiilinin kısa geçmişi artı olumsuzluk. Eril isimde: keinen.",
      },
      {
        kind: "build",
        tr: "Bu sabah uyuyakaldım.",
        answer: "Heute Morgen habe ich verschlafen",
        hint: "Olay anlatıldığı için Perfekt: „verschlafen“ vurgusuz ön ekli, ortaç „ge“ almaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi geçmiş zamana çevir.",
        source: "Ich bin nervös und habe keine Zeit.",
        answer: "Ich war nervös und hatte keine Zeit.",
        alternatives: ["Ich war nervös und hatte keine Zeit"],
        why: "Bu iki fiil konuşmada Perfekt'e girmez: bin → war, habe → hatte.",
      },
    ],
  },
  {
    id: "a2-u02-w2",
    level: "A2",
    skill: "writing",
    unit: 2,
    title: "Mein erstes Mal",
    genre: "Forum mesajı",
    intro: "Bir foruma ilk deneyimini anlat: ne oldu ve o an nasıl hissettin?",
    gloss: [
      { de: "nervös", tr: "gergin", en: "nervous" },
      { de: "aufregend", tr: "heyecan verici", en: "exciting" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "erleichtert", tr: "içi rahatlamış", en: "relieved" },
      { de: "der Führerschein", tr: "ehliyet", en: "driving licence" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki soruya cevap yaz. Bir şeyi ilk kez yaptığın anı anlat: ne oldu, o sırada nasıl hissettin, sonunda ne düşündün.",
        stimulus:
          "FORUM · Erste Male\n\nHallo zusammen! Ich habe gestern zum ersten Mal allein ein Auto gefahren. Ich war so nervös, dass meine Hände gezittert haben. Aber am Ende war ich richtig erleichtert.\n\nWie war euer erstes Mal — egal bei was?",
        checklist: [
          "Olayı Perfekt ile anlattın mı (habe … gemacht / bin … gefahren)?",
          "O anki duyguyu „war“ ile söyledin mi (Ich war nervös / aufregend)?",
          "Sonunda ne düşündüğünü yazdın mı?",
          "En az bir kez „Das war eine … Erfahrung“ kalıbını kullandın mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Zum ersten Mal habe ich …", tr: "ilk kez … yaptım", en: "for the first time I …" },
          { de: "Ich war sehr nervös.", tr: "çok gergindim", en: "I was very nervous" },
          { de: "Das war eine gute Erfahrung.", tr: "bu iyi bir deneyimdi", en: "that was a good experience" },
        ],
        sample:
          "Hallo!\n\nBei mir war es der Führerschein. Ich habe die Prüfung im letzten Sommer gemacht. Vorher war ich furchtbar nervös, weil ich nachts fast nicht geschlafen habe.\n\nDer Prüfer hat wenig gesagt, und plötzlich war die Fahrt zu Ende. Ich habe bestanden! In dem Moment war ich einfach nur erleichtert.\n\nHeute finde ich: das war eine sehr gute Erfahrung. Und aufregend war es auch. Ich fahre jetzt jede Woche.\n\nViele Grüße\nEmre",
      },
    ],
  },
];

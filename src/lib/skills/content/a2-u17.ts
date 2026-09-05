import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 17 — "Hava, günübirlik gezi, kamp, şehir turu".
 *
 * Dört ders: Der Wetterbericht · Der Tagesausflug · Auf dem Campingplatz ·
 * Die Stadtführung. İçerik ünite 1-17'nin kelimeleriyle sınırlı.
 *
 *   Ünite 17: bewölkt, sonnig, neblig, windig, schneien, das Gewitter,
 *             stürmisch, die Wolke · der Spaziergang, die Bootsfahrt,
 *             der Freizeitpark, der Zoo, die Raststätte, die Eintrittskarte,
 *             die Tour, bummeln · der Campingplatz, das Zelt, das Lagerfeuer,
 *             das Wohnmobil, angeln, das Messer, der Bach, braten ·
 *             die Kunst, das Schloss, der Teich, die Ausstellung, golden,
 *             der Brunnen, der Rückweg, der Tourist
 *   Kalıplar: Morgen wird es sonnig. · Es gibt heute Abend ein Gewitter. ·
 *             Wenn das Wetter gut ist, machen wir eine Bootsfahrt. ·
 *             Wie viel kostet die Eintrittskarte? · Gibt es hier Duschen? ·
 *             Es gibt einen Bach hinter dem Platz. · Dieses Schloss ist fast
 *             800 Jahre alt. · Früher war hier ein Markt.
 *
 * Ünitenin dört dersi dört ayrı zaman kipini deniyor: gelecek (werden),
 * koşul (wenn), var olma (es gibt) ve geçmiş (war/hatte). Hava durumu bunları
 * tek konuda birleştiren nadir bağlamlardan biri — yarın ne olacağı, iyi
 * olursa ne yapılacağı, orada ne olduğu ve eskiden ne olduğu aynı sohbette
 * geçiyor. Egzersizler de bu dört kipi ayırt ettirmek üzere kuruldu.
 */
export const a2U17: SkillExercise[] = [
  {
    id: "a2-u17-r1",
    level: "A2",
    skill: "reading",
    unit: 17,
    title: "Das Wochenendwetter",
    genre: "Hava raporu",
    intro: "Hafta sonu hava tahmini. Ne zaman güneş, ne zaman fırtına?",
    gloss: [
      { de: "bewölkt", tr: "bulutlu", en: "cloudy" },
      { de: "neblig", tr: "sisli", en: "foggy" },
      { de: "windig", tr: "rüzgârlı", en: "windy" },
      { de: "stürmisch", tr: "fırtınalı", en: "stormy" },
      { de: "das Gewitter", tr: "gök gürültülü sağanak", en: "thunderstorm" },
      { de: "schneien", tr: "kar yağmak", en: "to snow" },
      { de: "die Wolke", tr: "bulut", en: "cloud" },
    ],
    minutes: 4,
    text:
      "DAS WETTER AM WOCHENENDE\n\n" +
      "Freitag: Am Morgen ist es neblig, besonders in den Tälern. Ab Mittag wird es sonnig, 21 Grad. Ein guter Tag für einen Spaziergang.\n\n" +
      "Samstag: Die Wolken kommen zurück. Am Nachmittag wird es stark bewölkt und windig, am Abend gibt es ein Gewitter. Wer draußen isst, sollte früh anfangen.\n\n" +
      "Sonntag: Nach dem Gewitter wird es kühler — nur noch 14 Grad, aber trocken. Am Vormittag stürmisch, am Nachmittag ruhiger.\n\n" +
      "Und die nächste Woche? Es wird kalt. In den Bergen über 1200 Meter wird es sogar schneien. Im September ist das früh, aber nicht unmöglich.",
    questions: [
      {
        text: "Wie ist das Wetter am Freitagmorgen?",
        options: ["Sonnig", "Neblig", "Stürmisch"],
        answer: 1,
        explain: "„Am Morgen ist es neblig, besonders in den Tälern.“ Güneş öğleden sonra çıkıyor.",
      },
      {
        kind: "gapfill",
        text: "Ab Mittag ___ es sonnig, 21 Grad.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Gelecek zaman werden ile kurulur; hava raporunun temel fiili budur.",
      },
      {
        text: "Wann gibt es ein Gewitter?",
        options: ["Freitagabend", "Samstagabend", "Sonntagvormittag"],
        answer: 1,
        explain: "„am Abend gibt es ein Gewitter“ — cumartesi bölümünde geçiyor.",
      },
      {
        kind: "short_answer",
        text: "Wie warm wird es am Sonntag?",
        options: [],
        answer: 0,
        accept: ["14 Grad", "vierzehn Grad", "14"],
        explain: "„nur noch 14 Grad, aber trocken“.",
      },
      {
        text: "Nächste Woche wird es in den Bergen schneien.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „In den Bergen über 1200 Meter wird es sogar schneien.“",
      },
    ],
  },
  {
    id: "a2-u17-r2",
    level: "A2",
    skill: "reading",
    unit: 17,
    title: "Das Schloss am Teich",
    genre: "Broşür",
    intro: "Şehir turu broşürü. Bu şato ne kadar eski, eskiden burada ne vardı?",
    gloss: [
      { de: "das Schloss", tr: "şato", en: "castle" },
      { de: "der Teich", tr: "gölet", en: "pond" },
      { de: "die Ausstellung", tr: "sergi", en: "exhibition" },
      { de: "der Brunnen", tr: "çeşme", en: "fountain" },
      { de: "golden", tr: "altın rengi", en: "golden" },
      { de: "die Kunst", tr: "sanat", en: "art" },
      { de: "der Tourist", tr: "turist", en: "tourist" },
      { de: "der Rückweg", tr: "dönüş yolu", en: "way back" },
    ],
    minutes: 4,
    text:
      "STADTFÜHRUNG — SCHLOSS UND ALTSTADT\n\n" +
      "Dieses Schloss ist fast 800 Jahre alt. Zuerst war es nur ein Turm aus Holz; Stein kam erst 300 Jahre später.\n\n" +
      "Vor dem Schloss liegt ein Teich. Früher war hier kein Teich, sondern ein Markt — dreimal in der Woche, mit Fisch, Brot und Tieren. Die Familie im Schloss hatte damals das Recht auf den Markt und nahm Geld von jedem Händler.\n\n" +
      "Im Hof steht ein goldener Brunnen aus dem Jahr 1720. Er ist nicht aus Gold, nur bemalt — das enttäuscht viele Touristen.\n\n" +
      "Im ersten Stock gibt es eine kleine Ausstellung: Kunst aus der Region, etwa vierzig Bilder. Der Eintritt kostet 6 Euro, mit Führung 9 Euro.\n\n" +
      "Auf dem Rückweg lohnt sich die Bäckerei an der Ecke. Sie ist seit 1890 in derselben Familie.",
    questions: [
      {
        text: "Woraus war das Schloss zuerst?",
        options: ["Aus Stein", "Aus Holz", "Aus Gold"],
        answer: 1,
        explain: "„Zuerst war es nur ein Turm aus Holz; Stein kam erst 300 Jahre später.“",
      },
      {
        kind: "gapfill",
        text: "Früher ___ hier kein Teich, sondern ein Markt.",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "sein fiilinin geçmiş biçimi; anlatı diline Perfekt değil bu biçim yakışıyor.",
      },
      {
        text: "Was stimmt über den Brunnen?",
        options: ["Er ist aus Gold.", "Er ist nur bemalt.", "Er ist neu."],
        answer: 1,
        explain: "„Er ist nicht aus Gold, nur bemalt — das enttäuscht viele Touristen.“",
      },
      {
        kind: "short_answer",
        text: "Was kostet der Eintritt mit Führung?",
        options: [],
        answer: 0,
        accept: ["9 Euro", "neun Euro", "9"],
        explain: "„Der Eintritt kostet 6 Euro, mit Führung 9 Euro.“",
      },
      {
        text: "In der Ausstellung hängen etwa vierzig Bilder.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Kunst aus der Region, etwa vierzig Bilder“.",
      },
    ],
  },
  {
    id: "a2-u17-l1",
    level: "A2",
    skill: "listening",
    unit: 17,
    title: "Was machen wir am Sonntag?",
    genre: "Diyalog",
    intro: "İki arkadaş pazar gününü planlıyor. Hava nasıl olursa ne yapacaklar?",
    gloss: [
      { de: "die Bootsfahrt", tr: "tekne turu", en: "boat trip" },
      { de: "die Eintrittskarte", tr: "giriş bileti", en: "entrance ticket" },
      { de: "bummeln", tr: "gezinmek", en: "to stroll" },
      { de: "der Zoo", tr: "hayvanat bahçesi", en: "zoo" },
      { de: "die Raststätte", tr: "dinlenme tesisi", en: "motorway services" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ayla", text: "Hast du den Wetterbericht gesehen? Sonntag soll es trocken sein." },
      { speaker: "Mert", text: "Trocken, aber nur 14 Grad. Was schlägst du vor?" },
      { speaker: "Ayla", text: "Wenn das Wetter gut ist, machen wir eine Bootsfahrt. Und wenn nicht, gehen wir ins Museum." },
      { speaker: "Mert", text: "Bei 14 Grad auf dem Wasser? Da friere ich." },
      { speaker: "Ayla", text: "Stimmt. Dann lieber der Zoo — draußen, aber man bewegt sich." },
      { speaker: "Mert", text: "Gute Idee. Wie viel kostet die Eintrittskarte?" },
      { speaker: "Ayla", text: "Zwölf Euro, für Studenten acht. Du hast doch noch deinen Ausweis?" },
      { speaker: "Mert", text: "Ja, der gilt noch bis Dezember. Und danach?" },
      { speaker: "Ayla", text: "Danach bummeln wir durch die Altstadt und trinken irgendwo einen Kaffee." },
      { speaker: "Mert", text: "Und auf dem Rückweg halten wir kurz an der Raststätte, ja? Ich habe dann immer Hunger." },
      { speaker: "Mert", text: "Abgemacht. Ich hole dich um zehn ab." },
    ],
    questions: [
      {
        text: "Was machen sie am Sonntag?",
        options: ["Eine Bootsfahrt", "Sie gehen in den Zoo", "Sie bleiben zu Hause"],
        answer: 1,
        explain: "14 derecede tekne soğuk geliyor: „Dann lieber der Zoo — draußen, aber man bewegt sich.“",
      },
      {
        kind: "gapfill",
        text: "___ das Wetter gut ist, machen wir eine Bootsfahrt.",
        options: [],
        answer: 0,
        accept: ["Wenn"],
        explain: "Koşul yan cümlesi wenn ile başlar ve fiili sona atar.",
      },
      {
        text: "Was kostet die Eintrittskarte für Studenten?",
        options: ["Acht Euro", "Zwölf Euro", "Vierzehn Euro"],
        answer: 0,
        explain: "„Zwölf Euro, für Studenten acht.“",
      },
      {
        kind: "short_answer",
        text: "Was machen sie nach dem Zoo?",
        options: [],
        answer: 0,
        accept: [
          "sie bummeln durch die Altstadt",
          "durch die Altstadt bummeln",
          "bummeln und Kaffee trinken",
        ],
        explain: "„Danach bummeln wir durch die Altstadt und trinken irgendwo einen Kaffee.“",
      },
    ],
  },
  {
    id: "a2-u17-l2",
    level: "A2",
    skill: "listening",
    unit: 17,
    title: "Auf dem Campingplatz",
    genre: "Diyalog",
    intro: "Kamp alanına varış. Neresi boş, orada ne var, ne yasak?",
    gloss: [
      { de: "das Zelt", tr: "çadır", en: "tent" },
      { de: "das Wohnmobil", tr: "karavan", en: "camper van" },
      { de: "das Lagerfeuer", tr: "kamp ateşi", en: "campfire" },
      { de: "der Bach", tr: "dere", en: "stream" },
      { de: "angeln", tr: "balık tutmak", en: "to fish" },
      { de: "braten", tr: "kızartmak", en: "to fry, grill" },
      { de: "der Campingplatz", tr: "kamp alanı", en: "campsite" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Ott", text: "Guten Tag, haben Sie noch einen Platz frei? Wir sind zu dritt mit einem Zelt." },
      { speaker: "Platzwart", text: "Mit Zelt ja, hinten links. Für Wohnmobile ist heute alles voll." },
      { speaker: "Herr Ott", text: "Gut, wir haben nur das Zelt. Gibt es hier Duschen?" },
      { speaker: "Platzwart", text: "Ja, im weißen Haus in der Mitte. Warmes Wasser kostet einen Euro, Kleingeld brauchen Sie." },
      { speaker: "Herr Ott", text: "Verstanden. Und die Kinder fragen schon: darf man ein Lagerfeuer machen?" },
      { speaker: "Platzwart", text: "Nur an der festen Feuerstelle beim Bach, nicht am Zelt. Und nur bis 22 Uhr." },
      { speaker: "Herr Ott", text: "Es gibt einen Bach hier?" },
      { speaker: "Platzwart", text: "Ja, hinter dem Platz. Angeln dürfen Sie dort aber nicht, das ist verboten." },
      { speaker: "Herr Ott", text: "Schade. Dann braten wir eben Würstchen über dem Feuer." },
      { speaker: "Platzwart", text: "Das machen hier alle. Der Laden vorne hat welche." },
      { speaker: "Herr Ott", text: "Gut. Was kostet die Nacht?" },
      { speaker: "Platzwart", text: "Neun Euro pro Person, Kinder unter zehn die Hälfte." },
    ],
    questions: [
      {
        text: "Was ist heute voll?",
        options: ["Die Zeltplätze", "Die Plätze für Wohnmobile", "Die Duschen"],
        answer: 1,
        explain: "„Mit Zelt ja, hinten links. Für Wohnmobile ist heute alles voll.“",
      },
      {
        kind: "gapfill",
        text: "___ es hier Duschen?",
        options: [],
        answer: 0,
        accept: ["Gibt"],
        explain: "Bir yerde bir şey olup olmadığı es gibt kalıbıyla sorulur.",
      },
      {
        text: "Wo darf man ein Lagerfeuer machen?",
        options: ["Am Zelt", "An der festen Feuerstelle beim Bach", "Nirgendwo"],
        answer: 1,
        explain: "„Nur an der festen Feuerstelle beim Bach, nicht am Zelt.“ Saat 22'ye kadar.",
      },
      {
        kind: "short_answer",
        text: "Was kostet eine Nacht pro Person?",
        options: [],
        answer: 0,
        accept: ["neun Euro", "9 Euro", "9"],
        explain: "„Neun Euro pro Person, Kinder unter zehn die Hälfte.“",
      },
    ],
  },
  {
    id: "a2-u17-w1",
    level: "A2",
    skill: "writing",
    unit: 17,
    title: "Yarın, koşulsa, eskiden",
    genre: "Dil bilgisi",
    intro: "Üç ayrı zaman: gelecek werden, koşul wenn, geçmiş war.",
    gloss: [
      { de: "sonnig", tr: "güneşli", en: "sunny" },
      { de: "die Bootsfahrt", tr: "tekne turu", en: "boat trip" },
      { de: "das Gewitter", tr: "gök gürültülü sağanak", en: "thunderstorm" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Yarın hava güneşli olacak.",
        answer: "Morgen wird es sonnig",
        hint: "Gelecek zamanda werden çekilir, hava için özne es kalır.",
      },
      {
        kind: "build",
        tr: "Hava iyi olursa tekne turu yapacağız.",
        answer: "Wenn das Wetter gut ist, machen wir eine Bootsfahrt",
        hint: "wenn yan cümlesinde fiil sona gider; ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Eskiden burada bir pazar vardı.",
        answer: "Früher war hier ein Markt",
        hint: "Anlatıda sein fiilinin geçmişi Perfekt değil, tek kelimelik biçim.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: wenn yan cümlesinde fiilin yeri yanlış.",
        source: "Wenn es regnet morgen, bleiben wir zu Hause.",
        answer: "Wenn es morgen regnet, bleiben wir zu Hause.",
        alternatives: ["Wenn es morgen regnet, bleiben wir zu Hause"],
        why: "Yan cümlede çekimli fiil en sona gider; zaman zarfı fiilin önünde kalır.",
      },
    ],
  },
  {
    id: "a2-u17-w2",
    level: "A2",
    skill: "writing",
    unit: 17,
    title: "Ausflug am Sonntag?",
    genre: "Mesaj",
    intro: "Arkadaşının mesajına cevap ver: hava nasıl olursa ne yapılacak?",
    gloss: [
      { de: "der Ausflug", tr: "gezi", en: "excursion" },
      { de: "die Eintrittskarte", tr: "giriş bileti", en: "entrance ticket" },
      { de: "der Freizeitpark", tr: "lunapark", en: "amusement park" },
      { de: "bewölkt", tr: "bulutlu", en: "cloudy" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Arkadaşına cevap yaz. Hava iyi olursa ne yapmak istediğini ve kötü olursa neyi tercih ettiğini söyle, bir saat öner ve bir soru sor.",
        stimulus:
          "Hey! Sonntag habe ich endlich frei. Wollen wir was machen?\n\n" +
          "Der Wetterbericht sagt: vormittags bewölkt, nachmittags vielleicht Sonne, 16 Grad. Also nicht super, aber trocken.\n\n" +
          "Ich hätte Lust auf den Freizeitpark, aber der ist teuer (29 Euro!). Zoo oder Stadtführung ginge auch. Sag mal, was du denkst — und wann du kannst.\n\nBis dann, Kerem",
        checklist: [
          "İyi hava için bir plan yazdın mı (wenn ile)?",
          "Kötü hava için bir alternatif verdin mi?",
          "Bir buluşma saati önerdin mi?",
          "En az bir soru sordun mu?",
        ],
        minWords: 40,
        phrases: [
          { de: "Wenn die Sonne kommt, gehen wir …", tr: "güneş açarsa … gideriz", en: "if the sun comes out, we'll go …" },
          { de: "Wenn es regnet, lieber …", tr: "yağmur yağarsa daha çok …", en: "if it rains, rather …" },
          { de: "Passt dir elf Uhr?", tr: "saat on bir sana uyar mı", en: "does eleven work for you" },
        ],
        sample:
          "Hallo Kerem,\n\n" +
          "schön, dass du Sonntag frei hast!\n\n" +
          "Wenn die Sonne am Nachmittag kommt, gehen wir in den Zoo — bei 16 Grad läuft man gut, und die Eintrittskarte kostet nur zwölf Euro. Der Freizeitpark ist mir mit 29 Euro wirklich zu teuer.\n\n" +
          "Wenn es doch bewölkt bleibt oder regnet, mache ich lieber die Stadtführung. Die ist drinnen und dauert nur eine Stunde.\n\n" +
          "Passt dir elf Uhr am Hauptbahnhof? Danach können wir noch durch die Altstadt bummeln.\n\n" +
          "Hast du deinen Studentenausweis noch? Damit wird es billiger.\n\nBis Sonntag, Ayla",
      },
    ],
  },
];

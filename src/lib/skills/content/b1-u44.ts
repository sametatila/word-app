import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 44 — "Kutlama, yarışma, doğa" (dersler 173–176).
 *
 * Dersler: Ein Fest feiern · Sport treiben · Der Wettkampf ·
 * Natur erleben.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   süre ve ölçü      Almancada süre ve ölçü EDATSIZ ve Akkusativ ile
 *   Akkusativ'dedir   verilir: einen Monat lang, zwei Meter hoch,
 *                     drei Kilometer weit, den ganzen Tag. Türkçede bu
 *                     bilgiler yalın isimdir ('bir ay boyunca'), o yüzden
 *                     öğrenci ya edat ekliyor ya yanlış hâl seçiyor.
 *   erst ↔ schon      Türkçe 'daha' ve 'zaten' bu iki sözcüğü tam
 *                     karşılamaz ve bağlama göre kayar. Almanca ayırır:
 *                     erst = beklenenden AZ ('daha saat sekiz'),
 *                     schon = beklenenden ÇOK ('saat sekiz olmuş bile').
 *                     Aynı saat, iki ayrı değerlendirme.
 *
 * Yeni 32 kelime: der Karneval, der Fasching, die Garderobe, anhaben,
 * sich amüsieren, sich vergnügen, vergnügt, grüßen, die Sportart,
 * das Stadion, der Profi, der Trainer, der Spieler, das Hallenbad,
 * kräftig, schlank, der Sieger, der Sieg, siegen, der Gegner,
 * der Verlierer, der Rekord, unentschieden, das Tor, der Rasen,
 * das Feld, der Hof, blühen, klettern, springen, tauchen, zelten.
 */
export const b1U44: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u44-r1",
    level: "B1",
    skill: "reading",
    unit: 44,
    title: "Drei Tage Karneval",
    genre: "Kutlama yazısı",
    intro: "Bir karnaval anlatılıyor. Ne kadar sürüyor, kim ne giyiyor?",
    minutes: 5,
    gloss: [
      { de: "der Karneval", tr: "karnaval", en: "carnival" },
      { de: "die Garderobe", tr: "vestiyer / kıyafet", en: "cloakroom" },
      { de: "anhaben", tr: "üzerinde olmak", en: "to have on" },
      { de: "sich amüsieren", tr: "eğlenmek", en: "to enjoy oneself" },
      { de: "grüßen", tr: "selamlamak", en: "to greet" },
    ],
    text:
      "Bei uns dauert der Karneval drei Tage. Am ersten Abend ist der " +
      "Saal schon um sieben voll, obwohl es offiziell erst um acht " +
      "losgeht.\n\n" +
      "Fast alle haben etwas an, das sie sonst nie tragen würden. " +
      "In der Garderobe hängen zweihundert Mäntel, und niemand findet " +
      "am Ende den richtigen. Das gehört dazu.\n\n" +
      "Man grüßt hier auch Leute, die man nicht kennt. Wer das seltsam " +
      "findet, hat den Punkt verpasst: drei Tage lang ist das ganze Dorf " +
      "eine Gruppe, danach wieder nicht.\n\n" +
      "Am dritten Abend sind alle müde. Um zehn ist es schon fast leer, " +
      "obwohl es sonst bis zwei geht. Wir haben uns trotzdem gut " +
      "amüsiert — vielleicht gerade deshalb.",
    questions: [
      {
        text: "Wie lange dauert der Karneval?",
        options: ["Drei Tage", "Eine Woche", "Zwei Tage"],
        answer: 0,
        explain: "„Bei uns dauert der Karneval drei Tage.“",
      },
      {
        text: "Wann ist der Saal am ersten Abend voll?",
        options: ["Um sieben", "Um acht", "Um zehn"],
        answer: 0,
        explain: "„Am ersten Abend ist der Saal schon um sieben voll …“",
      },
      {
        text: "Was ist am dritten Abend anders?",
        options: ["Um zehn ist es fast leer", "Es gibt mehr Leute", "Es dauert länger"],
        answer: 0,
        explain: "„Um zehn ist es schon fast leer, obwohl es sonst bis zwei geht.“",
      },
      {
        kind: "gapfill",
        text: "Der Saal ist ___ um sieben voll, obwohl es offiziell ___ um acht losgeht.",
        options: [],
        answer: 0,
        accept: ["schon erst", "schon / erst"],
        explain: "schon = beklenenden ÇOK; erst = beklenenden AZ. Aynı saat, iki bakış.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Mäntel hängen in der Garderobe?",
        options: [],
        answer: 0,
        accept: ["zweihundert", "200"],
        explain: "„In der Garderobe hängen zweihundert Mäntel …“",
      },
    ],
  },
  {
    id: "b1-u44-r2",
    level: "B1",
    skill: "reading",
    unit: 44,
    title: "Das Spiel am Sonntag",
    genre: "Spor haberi",
    intro: "Bir maç raporu. Skor ne, kim ne yaptı?",
    minutes: 5,
    gloss: [
      { de: "der Sieger", tr: "galip", en: "winner" },
      { de: "der Gegner", tr: "rakip", en: "opponent" },
      { de: "unentschieden", tr: "berabere", en: "drawn" },
      { de: "das Tor", tr: "gol / kale", en: "goal" },
      { de: "der Rekord", tr: "rekor", en: "record" },
    ],
    text:
      "Das Spiel am Sonntag endete unentschieden, eins zu eins. " +
      "Einen Sieger gab es also nicht, und beide Seiten waren " +
      "danach unzufrieden.\n\n" +
      "Unsere Mannschaft spielte eine Stunde lang sehr gut. Das erste " +
      "Tor fiel schon nach zwölf Minuten. Danach wurde es schwerer: " +
      "der Gegner war kräftiger und lief mehr.\n\n" +
      "Im Stadion waren viertausend Zuschauer, ein Rekord für diesen " +
      "Verein. Der Trainer sagte danach, das Publikum habe die " +
      "Mannschaft zwanzig Minuten lang getragen.\n\n" +
      "Der beste Spieler war ein Profi, der erst seit einem Monat hier " +
      "ist. Er ist nicht groß und nicht besonders schlank, aber er läuft " +
      "neunzig Minuten lang gleich schnell. Das können wenige.",
    questions: [
      {
        text: "Wie endete das Spiel?",
        options: ["Unentschieden", "Zwei zu eins", "Ohne Tore"],
        answer: 0,
        explain: "„Das Spiel am Sonntag endete unentschieden, eins zu eins.“",
      },
      {
        text: "Wann fiel das erste Tor?",
        options: ["Nach zwölf Minuten", "Nach einer Stunde", "In der letzten Minute"],
        answer: 0,
        explain: "„Das erste Tor fiel schon nach zwölf Minuten.“",
      },
      {
        text: "Was war ein Rekord?",
        options: ["Die Zahl der Zuschauer", "Die Zahl der Tore", "Die Länge des Spiels"],
        answer: 0,
        explain: "„Im Stadion waren viertausend Zuschauer, ein Rekord für diesen Verein.“",
      },
      {
        kind: "gapfill",
        text: "Er läuft ___ ___ ___ gleich schnell.",
        options: [],
        answer: 0,
        accept: ["neunzig Minuten lang"],
        explain: "Süre EDATSIZ ve Akkusativ: neunzig Minuten lang.",
      },
      {
        kind: "short_answer",
        text: "Seit wann ist der beste Spieler hier?",
        options: [],
        answer: 0,
        accept: ["seit einem Monat", "erst seit einem Monat", "einen Monat"],
        explain: "„… ein Profi, der erst seit einem Monat hier ist.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u44-l1",
    level: "B1",
    skill: "listening",
    unit: 44,
    title: "Welche Sportart?",
    genre: "Spor konuşması",
    intro: "Bir spor seçiliyor. Hangisi kime uygun?",
    minutes: 4,
    gloss: [
      { de: "die Sportart", tr: "spor dalı", en: "sport" },
      { de: "das Hallenbad", tr: "kapalı havuz", en: "indoor pool" },
      { de: "tauchen", tr: "dalmak", en: "to dive" },
      { de: "klettern", tr: "tırmanmak", en: "to climb" },
    ],
    segments: [
      { text: "Ich will wieder anfangen, aber ich weiß nicht welche Sportart." },
      { text: "Was hast du früher gemacht?" },
      { text: "Ich bin geklettert. Aber das ist mir jetzt zu viel." },
      { text: "Dann geh ins Hallenbad. Schwimmen kann man jeden Tag." },
      { text: "Ich schwimme nicht gern lang. Nach zehn Minuten ist mir langweilig." },
      { text: "Dann tauch mal. Da ist die Zeit ganz anders." },
      { text: "Stimmt, das habe ich als Kind gern gemacht." },
      { text: "Fang klein an. Zwanzig Minuten lang reicht am Anfang." },
    ],
    questions: [
      {
        text: "Was hat die Person früher gemacht?",
        options: ["Geklettert", "Geschwommen", "Getaucht"],
        answer: 0,
        explain: "„Ich bin geklettert. Aber das ist mir jetzt zu viel.“",
      },
      {
        text: "Warum schwimmt sie nicht gern lang?",
        options: ["Es ist zu kalt", "Nach zehn Minuten ist ihr langweilig", "Es ist zu teuer"],
        answer: 1,
        explain: "„Nach zehn Minuten ist mir langweilig.“",
      },
      {
        text: "Was schlägt die zweite Person vor?",
        options: ["Tauchen", "Klettern", "Laufen"],
        answer: 0,
        explain: "„Dann tauch mal. Da ist die Zeit ganz anders.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ ___ reicht am Anfang.",
        options: [],
        answer: 0,
        accept: ["Zwanzig Minuten lang"],
        explain: "Süre edatsız Akkusativ: zwanzig Minuten lang.",
      },
      {
        kind: "short_answer",
        text: "Was hat sie als Kind gern gemacht?",
        options: [],
        answer: 0,
        accept: ["getaucht", "tauchen", "sie ist gern getaucht"],
        explain: "„Stimmt, das habe ich als Kind gern gemacht.“",
      },
    ],
  },
  {
    id: "b1-u44-l2",
    level: "B1",
    skill: "listening",
    unit: 44,
    title: "Zelten am Feld",
    genre: "Doğa planı",
    intro: "Bir kamp planlanıyor. Nerede, ne zaman?",
    minutes: 4,
    gloss: [
      { de: "zelten", tr: "kamp yapmak", en: "to camp" },
      { de: "das Feld", tr: "tarla", en: "field" },
      { de: "der Rasen", tr: "çimen", en: "lawn" },
      { de: "blühen", tr: "çiçek açmak", en: "to bloom" },
    ],
    segments: [
      { text: "Wollen wir am Wochenende zelten?" },
      { text: "Gern. Aber nicht auf dem Rasen im Park, das ist verboten." },
      { text: "Nein, hinter dem Feld beim Hof von Familie Klein." },
      { text: "Haben die das erlaubt?" },
      { text: "Ja, ich habe gestern gefragt. Zwei Nächte lang dürfen wir." },
      { text: "Perfekt. Um diese Zeit blüht dort alles." },
      { text: "Genau. Und morgens um sechs ist es noch ganz still." },
      { text: "Dann packe ich heute Abend. Es ist erst Mittwoch, wir haben Zeit." },
    ],
    questions: [
      {
        text: "Wo wollen sie zelten?",
        options: ["Im Park", "Hinter dem Feld beim Hof", "Am Fluss"],
        answer: 1,
        explain: "„Nein, hinter dem Feld beim Hof von Familie Klein.“",
      },
      {
        text: "Wie lange dürfen sie bleiben?",
        options: ["Eine Nacht", "Zwei Nächte", "Eine Woche"],
        answer: 1,
        explain: "„Ja, ich habe gestern gefragt. Zwei Nächte lang dürfen wir.“",
      },
      {
        text: "Wie ist es morgens um sechs?",
        options: ["Ganz still", "Sehr laut", "Zu kalt"],
        answer: 0,
        explain: "„Und morgens um sechs ist es noch ganz still.“",
      },
      {
        kind: "gapfill",
        text: "Es ist ___ Mittwoch, wir haben Zeit.",
        options: [],
        answer: 0,
        accept: ["erst"],
        explain: "Beklenenden AZ → erst. „schon Mittwoch“ tersini söylerdi.",
      },
      {
        kind: "short_answer",
        text: "Warum nicht im Park?",
        options: [],
        answer: 0,
        accept: ["das ist verboten", "es ist verboten", "verboten"],
        explain: "„Aber nicht auf dem Rasen im Park, das ist verboten.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u44-w1",
    level: "B1",
    skill: "writing",
    unit: 44,
    title: "Ein Spiel beschreiben",
    genre: "Spor raporu",
    intro: "Bir maçı ya da antrenmanı anlat. Süre ve ölçü edatsız gelir.",
    minutes: 8,
    gloss: [
      { de: "der Spieler", tr: "oyuncu", en: "player" },
      { de: "der Trainer", tr: "antrenör", en: "coach" },
      { de: "das Stadion", tr: "stat", en: "stadium" },
      { de: "springen", tr: "sıçramak", en: "to jump" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Takımımız bir saat boyunca çok iyi oynadı.",
        answer: "Unsere Mannschaft spielte im Stadion eine Stunde lang sehr gut.",
        hint: "Süre edatsız Akkusativ: eine Stunde lang.",
      },
      {
        kind: "build",
        tr: "İki metre yükseğe sıçradı.",
        answer: "Er ist zwei Meter hoch gesprungen.",
        hint: "Ölçü de edatsız Akkusativ.",
      },
      {
        kind: "build",
        tr: "Bütün gün antrenman yaptık.",
        answer: "Wir haben den ganzen Tag trainiert.",
        hint: "„den ganzen Tag“ — edat yok, Akkusativ var.",
      },
      {
        kind: "form",
        prompt: "Maç kartını doldur.",
        facts: "Gün: pazar; sonuç: 1-1 berabere; ilk gol: 12. dakika; seyirci: 4000, rekor; en iyi oyuncu: bir ay önce gelen profesyonel.",
        fields: [
          { label: "Tag", answer: "Sonntag", accept: ["am Sonntag"] },
          { label: "Ergebnis", answer: "unentschieden", accept: ["1:1", "eins zu eins"] },
          { label: "Erstes Tor", answer: "12. Minute", accept: ["nach zwölf Minuten", "12"] },
          { label: "Zuschauer", answer: "4000", accept: ["viertausend", "Rekord"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Süre ve ölçü bildiriminde fazla edatı kaldır.",
        source: "Wir haben für eine Stunde gespielt und er ist auf zwei Meter gesprungen.",
        answer: "Wir haben eine Stunde lang gespielt und er ist zwei Meter hoch gesprungen.",
        why: "Türkçede süre ve ölçü yalın isimdir ('bir saat boyunca', 'iki metre'), o yüzden Almancada bir edat aranıyor ve 'für' ya da 'auf' ekleniyor. Almanca bunları EDATSIZ ve Akkusativ ile verir: eine Stunde lang, zwei Meter hoch, drei Kilometer weit, den ganzen Tag. 'für' yalnız PLANLANAN bir süre için gelir (ünite 20).",
      },
    ],
  },
  {
    id: "b1-u44-w2",
    level: "B1",
    skill: "writing",
    unit: 44,
    title: "Ein Fest planen",
    genre: "Plan metni",
    intro: "Bir kutlama planla. 'daha' ve 'bile' Almancada iki ayrı sözcük.",
    minutes: 12,
    gloss: [
      { de: "der Fasching", tr: "karnaval", en: "carnival" },
      { de: "sich vergnügen", tr: "eğlenmek", en: "to have fun" },
      { de: "vergnügt", tr: "neşeli", en: "cheerful" },
      { de: "der Hof", tr: "avlu / çiftlik", en: "yard" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Saat daha yedi ve salon şimdiden dolu.",
        answer: "Es ist erst sieben und der Saal ist schon voll.",
        hint: "erst = az; schon = çok.",
      },
      {
        kind: "build",
        tr: "Daha çarşamba, vaktimiz var.",
        answer: "Es ist erst Mittwoch, wir haben Zeit.",
        hint: "Beklenenden az → erst.",
      },
      {
        kind: "free",
        prompt: "Bir kutlama ya da doğa günü planla: ne, nerede, ne zaman ve ne kadar sürecek, kim ne getiriyor, ve neyin ters gidebileceği. En az iki süre bildirimi (edatsız Akkusativ) ve en az bir 'erst' ya da 'schon' kullan.",
        checklist: [
          "Etkinlik ve yer net mi?",
          "Zaman ve süre verilmiş mi?",
          "Kimin ne getireceği yazılmış mı?",
          "Bir risk düşünülmüş mü?",
          "En az iki edatsız süre ve bir erst/schon var mı?",
        ],
        minWords: 70,
        sample:
          "Wir feiern am Samstag im Hof hinter dem Haus. Es geht um vier " +
          "los und dauert wahrscheinlich den ganzen Abend.\n\n" +
          "Beim Fasching vergnügen sich alle, und am Ende gehen alle vergnügt nach Hause. Jeder bringt etwas mit: Aylin den Salat, ich das Brot, Nuri die " +
          "Getränke. Musik machen wir selbst, zwei Stunden lang, dann " +
          "reicht es auch den Nachbarn.\n\n" +
          "Ein Risiko gibt es: das Wetter. Wenn es regnet, gehen wir nach " +
          "drinnen, aber dann sind wir zu zwanzig in einem Zimmer. " +
          "Ich frage vorher, ob wir den Raum im Erdgeschoss haben können.\n\n" +
          "Und noch etwas: bitte kommt nicht erst um acht. Letztes Mal war " +
          "es schon dunkel, als die Hälfte ankam, und wir haben uns nur " +
          "eine Stunde lang wirklich gesehen.",
        phrases: [
          { de: "Es geht um vier los.", tr: "Saat dörtte başlıyor.", en: "It starts at four." },
          { de: "zwei Stunden lang", tr: "iki saat boyunca", en: "for two hours" },
          { de: "Kommt nicht erst um acht.", tr: "Sekizi bulmayın.", en: "Don't come only at eight." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„erst“ ve „schon“u anlamına göre düzelt.",
        source: "Es ist schon sieben, wir haben noch viel Zeit, und der Saal ist erst voll.",
        answer: "Es ist erst sieben, wir haben noch viel Zeit, und der Saal ist schon voll.",
        why: "Türkçe 'daha' ve 'bile / zaten' bu iki sözcüğü tam karşılamaz ve bağlama göre kayar, o yüzden ikisi birbirinin yerine kullanılıyor. Almanca ayırır ve fark DEĞERLENDİRMEDİR: erst = beklenenden AZ ('daha saat yedi, vaktimiz var'), schon = beklenenden ÇOK ('salon şimdiden dolu'). Aynı sayı, iki ayrı bakış — cümlenin geri kalanı hangisinin doğru olduğunu söyler.",
      },
    ],
  },
];

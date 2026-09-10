import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: forum tartışması, dükkân diyaloğu ve uzun bir mektup.
 * Söyleyiş odağı kelime vurgusu; dil bilgisi iyelik ve sıfat çekimine giriş.
 */
export const deA2P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r5",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Zusammen wohnen — wer macht was?",
    genre: "forum",
    intro: "Bir forumda ev arkadaşlığı soruluyor; soruyu ve üç farklı cevabı okuyacaksın.",
    gloss: [
      { de: "der Abwasch", tr: "bulaşık", en: "dishwashing" },
      { de: "sauer", tr: "kızgın", en: "annoyed" },
      { de: "die Aufgabe", tr: "görev", en: "task" },
      { de: "verpassen", tr: "kaçırmak", en: "to miss" },
      { de: "nerven", tr: "sinir etmek", en: "to annoy" },
      { de: "der Streit", tr: "kavga", en: "argument" },
    ],
    minutes: 5,
    text:
      "FORUM: ZUSAMMEN WOHNEN\n\n" +
      "Frage von Nils, 24:\n" +
      "Wir sind zu dritt in einer Wohnung. Der Abwasch bleibt immer an mir hängen und ich werde langsam sauer. " +
      "Wie macht ihr das?\n\n" +
      "Antwort von Bea:\n" +
      "Bei uns hängt ein Plan an der Kühlschranktür. Jede Woche wechselt die Aufgabe: Küche, Bad, Müll. " +
      "Wer seine Woche verpasst, kocht am Sonntag für alle. Das klingt streng, funktioniert aber seit zwei Jahren.\n\n" +
      "Antwort von Aleksandar:\n" +
      "Wir haben keinen Plan, aber eine Regel: Man wäscht sofort ab, sonst gar nicht. " +
      "Wichtiger als der Plan ist bei uns das Reden. Einmal im Monat sitzen wir zwanzig Minuten zusammen " +
      "und sagen ehrlich, was uns nervt.\n\n" +
      "Antwort von Meryem:\n" +
      "Ehrlich? Wir haben eine Putzhilfe geteilt. Zwölf Euro pro Person und Monat, und der Streit war weg. " +
      "Nicht romantisch, aber billiger als eine neue Wohnung.",
    questions: [
      {
        text: "Was ist das Problem von Nils?",
        options: [
          "Er macht den Abwasch meistens allein.",
          "Er findet keine passende Wohnung.",
          "Seine Mitbewohner sind ihm zu laut.",
        ],
        answer: 0,
        explain: "„Der Abwasch bleibt immer an mir hängen und ich werde langsam sauer.“",
      },
      {
        text: "Wie löst Bea das Problem?",
        options: [
          "mit einem Plan, der jede Woche wechselt",
          "mit einem gemeinsamen Gespräch im Monat",
          "mit einer Putzhilfe für alle drei",
        ],
        answer: 0,
        explain: "„Bei uns hängt ein Plan … Jede Woche wechselt die Aufgabe.“ Aylık konuşma Aleksandar'ın, temizlikçi Meryem'in çözümü.",
      },
      {
        kind: "truefalse",
        text: "Aleksandar findet den Plan wichtiger als das Reden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Wichtiger als der Plan ist bei uns das Reden.“ — tam tersi.",
      },
      {
        kind: "gapfill",
        text: "Bei Meryem kostet die Putzhilfe ___ Euro pro Person.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„Zwölf Euro pro Person und Monat …“",
      },
      {
        kind: "short_answer",
        text: "Was macht bei Bea eine Person, die ihre Woche verpasst?",
        options: [],
        answer: 0,
        accept: ["kocht am Sonntag für alle", "sie kocht am Sonntag", "am Sonntag kochen", "kocht für alle"],
        explain: "„Wer seine Woche verpasst, kocht am Sonntag für alle.“",
      },
      {
        text: "Wie beurteilt Meryem ihre Lösung?",
        options: ["nicht romantisch, aber günstig", "romantisch und sehr günstig", "teuer, aber sehr romantisch"],
        answer: 0,
        explain: "„Nicht romantisch, aber billiger als eine neue Wohnung.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l5",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Kleider abgeben",
    genre: "dialogue",
    intro: "Bir müşteri ikinci el dükkânına kıyafet getiriyor: neler alınıyor, karşılığında ne veriliyor, ne gerekiyor.",
    gloss: [
      { de: "abgeben", tr: "teslim etmek", en: "to hand in" },
      { de: "der Fleck", tr: "leke", en: "stain" },
      { de: "der Ärmel", tr: "kol", en: "sleeve" },
      { de: "spenden", tr: "bağışlamak", en: "to donate" },
      { de: "die Quittung", tr: "makbuz", en: "receipt" },
      { de: "die Möglichkeit", tr: "seçenek", en: "option" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Verkäufer", text: "Guten Tag! Sie haben eine große Tasche dabei — wollen Sie etwas abgeben?" },
      { speaker: "Kundin", text: "Ja, ich habe zu Hause aufgeräumt. Hier sind Pullover, zwei Jacken und ein paar Hosen." },
      { speaker: "Verkäufer", text: "Sehr gern. Wir nehmen alles, was sauber und ganz ist. Kaputte Sachen leider nicht." },
      { speaker: "Kundin", text: "Alles ist gewaschen. Eine Jacke hat aber einen kleinen Fleck am Ärmel." },
      { speaker: "Verkäufer", text: "Das ist kein Problem, die legen wir in die Kiste für einen Euro." },
      { speaker: "Kundin", text: "Und bekomme ich etwas dafür?" },
      { speaker: "Verkäufer", text: "Sie haben zwei Möglichkeiten: dreißig Prozent vom Verkaufspreis, oder Sie spenden alles." },
      { speaker: "Kundin", text: "Ich spende. Aber schicken Sie mir bitte eine Quittung für das Finanzamt." },
      { speaker: "Verkäufer", text: "Mache ich. Schreiben Sie hier bitte Ihren Namen und Ihre Adresse auf." },
    ],
    questions: [
      {
        text: "Wo findet das Gespräch statt?",
        options: ["in einem Secondhand-Laden", "in einer Reinigung", "bei der Post"],
        answer: 0,
        explain: "Kıyafet teslim ediliyor, satış fiyatından pay ya da bağış seçeneği var — ikinci el dükkânı.",
      },
      {
        text: "Welche Sachen nimmt der Laden nicht?",
        options: ["kaputte Kleidung", "gewaschene Pullover", "Jacken mit Flecken"],
        answer: 0,
        explain: "„Wir nehmen alles, was sauber und ganz ist. Kaputte Sachen leider nicht.“ Lekeli ceket bir euroluk kutuya giriyor.",
      },
      {
        kind: "truefalse",
        text: "Die Kundin verzichtet auf das Geld.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İki seçenek sunuluyor ve müşteri „Ich spende“ diyor — payı almıyor.",
      },
      {
        kind: "short_answer",
        text: "Was möchte die Kundin vom Laden?",
        options: [],
        answer: 0,
        accept: ["eine Quittung", "Quittung", "eine Quittung für das Finanzamt"],
        explain: "„Aber schicken Sie mir bitte eine Quittung für das Finanzamt.“",
      },
      {
        kind: "dictation",
        text: "Satıcının neyi kabul ettiklerini söylediği cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Wir nehmen alles, was sauber und ganz ist.", "Wir nehmen alles was sauber und ganz ist"],
        explain: "„Wir nehmen alles, was sauber und ganz ist.“ — „was“ yan cümlesinde fiil sona gider.",
      },
      {
        text: "Was passiert mit der Jacke mit dem Fleck?",
        options: ["Sie kommt in die Ein-Euro-Kiste.", "Sie geht an die Kundin zurück.", "Sie wird noch einmal gewaschen."],
        answer: 0,
        explain: "„Das ist kein Problem, die legen wir in die Kiste für einen Euro.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w5",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Brief an eine alte Freundin",
    genre: "letter",
    intro: "Uzun süredir yazmadığın bir arkadaşına mektup yazacaksın; önce iki cümle kur, sonra mektubu yaz.",
    gloss: [
      { de: "der Balkon", tr: "balkon", en: "balcony" },
      { de: "vermissen", tr: "özlemek", en: "to miss" },
      { de: "sich verändern", tr: "değişmek", en: "to change" },
      { de: "ziehen", tr: "taşınmak", en: "to move" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Altı aydır sana yazmadım.",
        answer: "Seit sechs Monaten habe ich dir nicht geschrieben.",
        alternatives: ["Ich habe dir seit sechs Monaten nicht geschrieben."],
        hint: "„seit“ süre anlatır ve Dativ ister; Perfekt'te Partizip II cümlenin sonunda kalır.",
      },
      {
        kind: "build",
        tr: "Geçen ay yeni bir daireye taşındık.",
        answer: "Letzten Monat sind wir in eine neue Wohnung gezogen.",
        alternatives: ["Wir sind letzten Monat in eine neue Wohnung gezogen."],
        hint: "Yön bildiren „in“ Akkusativ ister; „ziehen“ hareket anlattığı için Perfekt'i sein ile kurulur.",
      },
      {
        kind: "free",
        prompt:
          "Yurt dışında yaşayan eski bir arkadaşına mektup yaz: uzun süre yazmadığın için özür dile, hayatında ne değiştiğini anlat, ona da sor, ziyarete çağır ve güzel bir kapanış yaz.",
        checklist: [
          "Uzun sessizlik için özür dile",
          "Sende ne değiştiğini iki üç cümleyle anlat",
          "Ona da soru sor",
          "Ziyarete çağır ve vedalaş",
        ],
        minWords: 40,
        phrases: [
          { de: "Es tut mir leid, dass …", tr: "… için üzgünüm", en: "I'm sorry that …" },
          { de: "Bei mir hat sich viel verändert.", tr: "Bende çok şey değişti.", en: "A lot has changed for me." },
          { de: "Und wie geht es dir?", tr: "Peki sen nasılsın?", en: "And how are you?" },
          { de: "Möchtest du uns besuchen?", tr: "Bizi ziyaret etmek ister misin?", en: "Would you like to visit us?" },
          { de: "Ich vermisse dich!", tr: "Seni özlüyorum!", en: "I miss you!" },
        ],
        sample:
          "Liebe Ayşe, seit sechs Monaten habe ich dir nicht geschrieben, das tut mir leid. " +
          "Bei mir hat sich viel verändert. Letzten Monat sind wir in eine neue Wohnung gezogen, " +
          "jetzt haben wir endlich einen Balkon. Ich arbeite noch in derselben Firma, aber nur vier Tage " +
          "pro Woche. Der freie Freitag tut mir sehr gut. Und wie geht es dir? Gefällt dir die Arbeit " +
          "in Wien noch? Möchtest du uns im Sommer besuchen? Ab Juli haben wir ein freies Zimmer. " +
          "Schreib mir bald, ich vermisse dich! Herzliche Grüße, Derya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s5",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Wo liegt die Betonung?",
    genre: "pronounce",
    intro: "Almancada vurgu yeri anlamı taşır: ayrılabilen ön ek vurgulu, ayrılmayan ön ek vurgusuz, birleşik kelimede ilk parça öne çıkar.",
    gloss: [
      { de: "der Bahnhof", tr: "tren istasyonu", en: "train station" },
      { de: "die Informatik", tr: "bilişim", en: "computer science" },
      { de: "die Großeltern", tr: "büyükanne ve büyükbaba", en: "grandparents" },
      { de: "der Marktplatz", tr: "pazar meydanı", en: "market square" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich rufe dich später an.",
        tr: "Seni sonra ararım.",
        hint: "Ayrılabilen ön ek vurguyu taşır: cümlenin sonundaki „AN“ güçlü söylenir.",
        confusions: [
          { heard: ["Ich RUFE dich später an", "Ich rufe dich später AN?"], fix: "Vurgu fiil kökünde değil, sondaki ön ekte: … şpeeta AN.", expected: "an" },
        ],
      },
      {
        de: "Wir bezahlen heute mit Karte.",
        tr: "Bugün kartla ödüyoruz.",
        hint: "„be-“ ayrılmayan ön ektir ve hiç vurgu almaz: be-TSAA-len.",
        confusions: [
          { heard: ["BE-zahlen", "bezahlen mit Betonung vorn"], fix: "Ön eki yutar gibi hafif söyle, vurgu kökte: betsaalen.", expected: "bezahlen" },
        ],
      },
      {
        de: "Der Bahnhof liegt neben dem Krankenhaus.",
        tr: "İstasyon hastanenin yanında.",
        hint: "Birleşik kelimede ilk parça vurgulanır: BAAN-hof, KRAN-ken-haus.",
        confusions: [
          { heard: ["Bahn-HOF", "Kranken-HAUS"], fix: "İkinci parçayı yükseltme; ilk parça baskın: BAAN-hof.", expected: "Bahnhof" },
        ],
      },
      {
        de: "Meine Tochter studiert Informatik.",
        tr: "Kızım bilişim okuyor.",
        hint: "Yabancı kökenli kelimelerde vurgu genelde sona kayar: ştu-DİİRT, in-for-MAA-tik.",
        confusions: [
          { heard: ["STU-diert", "IN-formatik"], fix: "Bu iki kelimede vurgu baştaki hecede değil, sondan bir önceki hecede.", expected: "Informatik" },
        ],
      },
      {
        de: "Wir besuchen morgen unsere Großeltern.",
        tr: "Yarın büyüklerimizi ziyaret ediyoruz.",
        hint: "„be-suchen“ vurgusuz ön ek, „GROSS-eltern“ ise birleşik: ilk parça vurgulu.",
        confusions: [
          { heard: ["BE-suchen", "Groß-ELTERN"], fix: "Bir kelimede vurgu kökte, ötekinde ilk parçada: be-ZUU-hen, GROOS-eltern.", expected: "Großeltern" },
        ],
      },
      {
        de: "Das Restaurant ist am Marktplatz.",
        tr: "Restoran pazar meydanında.",
        hint: "„Restaurant“ sonda vurgulanır, „Marktplatz“ ise başta.",
        confusions: [
          { heard: ["RES-taurant", "Markt-PLATZ"], fix: "Yabancı kelime sonda, Almanca birleşik kelime başta vurgulanır.", expected: "Restaurant" },
        ],
      },
      {
        de: "Steh bitte etwas früher auf.",
        tr: "Lütfen biraz daha erken kalk.",
        hint: "Emir cümlesinde de ayrılan ön ek sonda ve vurgulu kalır: … früher AUF.",
        confusions: [
          { heard: ["STEH bitte etwas früher auf", "aufsteh bitte"], fix: "Ön ek fiile geri yapışmaz ve vurgu onda kalır: şteh … AUF.", expected: "auf" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g5",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "mein, meine und ein kleines Haus",
    genre: "grammar",
    intro: "İyelik kelimesi sahibine değil, sahip olunan ismin cinsine göre biçim alır; aynı kutu sıfat ekini de belirler.",
    focus: "Possessivartikel ve sıfat çekimine giriş",
    gloss: [
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "suchen", tr: "aramak", en: "to look for" },
      { de: "das Zimmer", tr: "oda", en: "room" },
      { de: "neu", tr: "yeni", en: "new" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Ek değil, ayrı kelime",
        tr: "Türkçede iyelik isme ek olarak gelir: kardeş-im, kız kardeş-im. Almancada ayrı bir kelime olur ve SAHİBİNE değil, sahip olunan ismin cinsine bakar: mein Bruder (eril), meine Schwester (dişil), mein Kind (nötr), meine Eltern (çoğul).",
        examples: [
          { de: "Das ist mein Bruder.", tr: "Bu benim erkek kardeşim.", note: "der Bruder → mein" },
          { de: "Das ist meine Schwester.", tr: "Bu benim kız kardeşim.", note: "die Schwester → meine" },
          { de: "Das ist mein Kind.", tr: "Bu benim çocuğum.", note: "das Kind → mein" },
        ],
      },
      {
        heading: "Nesne olunca yine yalnız eril değişir",
        tr: "Akkusativ'de kural artikeldeki gibi: yalnız eril kelime -en alır. mein → meinen, dein → deinen, unser → unseren. Dişil, nötr ve çoğul biçim aynı kalır.",
        examples: [
          { de: "Ich besuche meinen Bruder.", tr: "Erkek kardeşimi ziyaret ediyorum.", note: "eril → meinen" },
          { de: "Ich besuche meine Schwester.", tr: "Kız kardeşimi ziyaret ediyorum.", note: "dişil değişmez" },
          { de: "Sie sucht ihre Tasche.", tr: "Çantasını arıyor." },
        ],
      },
      {
        heading: "Sıfat ne zaman ek alır?",
        tr: "„ein“, „kein“ ve iyelik kelimelerinden sonra sıfat, artikelin göstermediği cinsi kendisi gösterir: ein kleiner Tisch, eine kleine Lampe, ein kleines Haus. „der/die/das“ zaten cinsi gösterdiği için sıfat sade kalır: der kleine Tisch.",
        examples: [
          { de: "Wir haben ein kleines Zimmer.", tr: "Küçük bir odamız var.", note: "das Zimmer → kleines" },
          { de: "Das ist ein neuer Kollege.", tr: "Bu yeni bir iş arkadaşı.", note: "der Kollege → neuer" },
          { de: "Der neue Kollege heißt Timo.", tr: "Yeni iş arkadaşının adı Timo.", note: "der'den sonra sade -e" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist ___ Schwester.",
        options: ["meine", "mein", "meinen"],
        answer: 0,
        explain: "„die Schwester“ dişildir, bu yüzden iyelik kelimesi -e alır: meine.",
      },
      {
        text: "Ich besuche ___ Bruder.",
        options: ["meinen", "mein", "meine"],
        answer: 0,
        explain: "Nesne eril olunca -en gelir: meinen Bruder.",
      },
      {
        text: "Wo ist ___ Handy?",
        options: ["dein", "deine", "deinen"],
        answer: 0,
        explain: "„das Handy“ nötrdür ve özne durumundadır: dein Handy.",
      },
      {
        text: "Wir haben ein ___ Zimmer.",
        options: ["kleines", "kleiner", "kleine"],
        answer: 0,
        explain: "„ein“ nötrü göstermez, o yüzden sıfat gösterir: ein kleines Zimmer.",
      },
      {
        kind: "gapfill",
        text: "Das ist ___ (wir) Wohnung.",
        options: [],
        answer: 0,
        accept: ["unsere"],
        explain: "„die Wohnung“ dişildir: unsere Wohnung.",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ (ich) Schlüssel vergessen. (der Schlüssel)",
        options: [],
        answer: 0,
        accept: ["meinen"],
        explain: "Eril nesne Akkusativ'de -en alır: meinen Schlüssel.",
      },
      {
        kind: "gapfill",
        text: "Sie sucht ___ (sie) Tasche.",
        options: [],
        answer: 0,
        accept: ["ihre"],
        explain: "Sahip dişil olsa da biçimi belirleyen „die Tasche“dır: ihre Tasche.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das", "ist", "unser", "neues", "Auto"],
        explain: "„das Auto“ nötr, iyelik eksiz kalır ve sıfat cinsi gösterir: unser neues Auto.",
      },
      {
        kind: "truefalse",
        text: "„Ich sehe meine Vater.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„der Vater“ eril ve nesne durumunda; doğrusu „Ich sehe meinen Vater.“",
      },
      {
        kind: "truefalse",
        text: "„Sie hat eine schöne Wohnung.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil kelimede „eine“ cinsi zaten gösterir, sıfat -e alır; cümle doğru.",
      },
    ],
  },
];

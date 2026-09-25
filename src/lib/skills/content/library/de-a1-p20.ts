import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 20.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan son parti. Şehirde duyurular ve ilanlar hattı:
 * itfaiyenin açık kapı günü, radyoda yeni açılan dondurmacının reklamı,
 * arabayla yol arkadaşı arayan ilan. Söyleyiş odağı sayarken ve seçenek
 * sorarken ezgi; dil bilgisi wie viel / wie viele / wie oft / wie lange.
 */
export const deA1P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r20",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Tag der offenen Tür bei der Feuerwehr",
    genre: "ad",
    intro: "Mahalledeki itfaiye bir afişle herkesi davet ediyor: ne zaman, neler var, çocuklar ne yapabilir, nasıl gelinir.",
    gloss: [
      { de: "die Feuerwehr", tr: "itfaiye", en: "fire department" },
      { de: "das Feuer", tr: "ateş", en: "fire" },
      { de: "einsteigen", tr: "binmek", en: "to get on" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "die Wurst", tr: "sosis", en: "sausage" },
      { de: "der Parkplatz", tr: "otopark", en: "parking lot" },
    ],
    minutes: 4,
    text:
      "TAG DER OFFENEN TÜR — FEUERWEHR NORDSTADT\n\n" +
      "Am Samstag zeigen wir Ihnen unser Haus! Von zehn bis sechzehn Uhr sind alle herzlich willkommen. Der Eintritt ist frei.\n\n" +
      "Das Programm:\n" +
      "Um elf Uhr und um vierzehn Uhr machen wir vor der Halle ein kleines Feuer und zeigen: So arbeitet die Feuerwehr.\n" +
      "Kinder können in das große rote Auto einsteigen und Fotos machen.\n" +
      "In der Halle beantworten wir gern alle Fragen.\n\n" +
      "Es gibt Wurst, Salat und Kuchen. Das Geld ist für neue Jacken für unsere Jugendgruppe.\n\n" +
      "Bitte kommen Sie mit dem Bus oder mit dem Rad. Es gibt leider keine Parkplätze.",
    questions: [
      {
        text: "Wer lädt die Leute ein?",
        options: ["die Polizei", "die Feuerwehr", "die Schule"],
        answer: 1,
        explain: "Başlık „Tag der offenen Tür — Feuerwehr Nordstadt“: itfaiye cumartesi binasını herkese açıyor.",
      },
      {
        text: "Was können Kinder machen?",
        options: ["in das rote Auto einsteigen", "vor der Halle ein Feuer machen", "in der Halle Kuchen verkaufen"],
        answer: 0,
        explain: "„Kinder können in das große rote Auto einsteigen und Fotos machen.“",
      },
      {
        kind: "truefalse",
        text: "Der Eintritt kostet Geld.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Der Eintritt ist frei“; para yalnız yiyecekler için.",
      },
      {
        kind: "gapfill",
        text: "Man sieht das Feuer um elf Uhr und um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„Um elf Uhr und um vierzehn Uhr machen wir vor der Halle ein kleines Feuer.“",
      },
      {
        kind: "short_answer",
        text: "Wofür ist das Geld vom Essen?",
        options: [],
        answer: 0,
        accept: ["für neue Jacken", "neue Jacken", "für neue Jacken für die Jugendgruppe"],
        explain: "„Das Geld ist für neue Jacken für unsere Jugendgruppe.“",
      },
      {
        text: "Wie soll man kommen?",
        options: ["mit dem Auto", "zu Fuß aus der Stadt", "mit dem Bus oder mit dem Rad"],
        answer: 2,
        explain: "„Bitte kommen Sie mit dem Bus oder mit dem Rad. Es gibt leider keine Parkplätze.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l20",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Radiowerbung: Eiscafé Dolce",
    genre: "ad",
    intro: "Yerel radyoda yeni açılan bir dondurmacının reklamı çıkıyor: nerede, ne zaman açık, neler yeni, ne kadar.",
    gloss: [
      { de: "das Eis", tr: "dondurma", en: "ice cream" },
      { de: "die Sorte", tr: "çeşit", en: "variety" },
      { de: "der Zucker", tr: "şeker", en: "sugar" },
      { de: "öffnen", tr: "açmak", en: "to open" },
      { de: "gratis", tr: "bedava", en: "free" },
      { de: "frisch", tr: "taze", en: "fresh" },
    ],
    minutes: 4,
    segments: [
      { text: "Endlich ist der Sommer da — und endlich öffnet das Eiscafé Dolce in der Bahnhofstraße!" },
      { text: "Ab Freitag gibt es bei uns dreißig Sorten Eis, alle frisch und von uns selbst gemacht." },
      { text: "Neu in diesem Jahr: Eis ohne Milch und ohne Zucker. Fragen Sie einfach an der Kasse." },
      { text: "Am ersten Tag bekommt jedes Kind ein kleines Eis gratis." },
      { text: "Wir sind jeden Tag von elf bis zweiundzwanzig Uhr für Sie da, auch am Sonntag." },
      { text: "Ein kleines Eis kostet einen Euro achtzig. Eiscafé Dolce — gleich neben dem Kino. Wir freuen uns auf Sie!" },
    ],
    questions: [
      {
        text: "Was ist neu in der Bahnhofstraße?",
        options: ["ein Eiscafé", "ein Kino", "ein Supermarkt"],
        answer: 0,
        explain: "„endlich öffnet das Eiscafé Dolce in der Bahnhofstraße“; sinema zaten yanında.",
      },
      {
        text: "Was bekommen Kinder am ersten Tag?",
        options: ["einen Euro achtzig", "ein Eis ohne Zucker", "ein kleines Eis gratis"],
        answer: 2,
        explain: "„Am ersten Tag bekommt jedes Kind ein kleines Eis gratis.“",
      },
      {
        kind: "truefalse",
        text: "Das Eiscafé ist am Sonntag geschlossen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„jeden Tag von elf bis zweiundzwanzig Uhr für Sie da, auch am Sonntag“.",
      },
      {
        kind: "gapfill",
        text: "Es gibt ___ Sorten Eis.",
        options: [],
        answer: 0,
        accept: ["dreißig", "30"],
        explain: "„Ab Freitag gibt es bei uns dreißig Sorten Eis.“",
      },
      {
        kind: "short_answer",
        text: "Wo ist das Eiscafé?",
        options: [],
        answer: 0,
        accept: ["neben dem Kino", "gleich neben dem Kino", "in der Bahnhofstraße"],
        explain: "Bahnhofstraße'de, „gleich neben dem Kino“.",
      },
      {
        text: "Was kostet ein kleines Eis?",
        options: ["achtzig Cent", "einen Euro achtzig", "zwei Euro"],
        answer: 1,
        explain: "„Ein kleines Eis kostet einen Euro achtzig.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w20",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Wer fährt nach Hamburg?",
    genre: "ad",
    intro: "Hafta sonu başka bir şehre gitmek istiyorsun ve arabayla giden birini arıyorsun: önce iki cümle kur, sonra kısa bir ilan yaz.",
    gloss: [
      { de: "die Mitfahrgelegenheit", tr: "yol paylaşımı", en: "ride share" },
      { de: "das Benzin", tr: "benzin", en: "gasoline" },
      { de: "zurück", tr: "geri", en: "back" },
      { de: "rauchen", tr: "sigara içmek", en: "to smoke" },
      { de: "der Rucksack", tr: "sırt çantası", en: "backpack" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Cuma öğleden sonra Hamburg'a gitmek istiyorum.",
        answer: "Ich möchte am Freitagnachmittag nach Hamburg fahren.",
        alternatives: ["Am Freitagnachmittag möchte ich nach Hamburg fahren."],
        hint: "„möchte“ ikinci sırada, „fahren“ sonda; şehre gidiş „nach“ ile söylenir.",
      },
      {
        kind: "build",
        tr: "Benzini memnuniyetle öderim.",
        answer: "Ich bezahle gern das Benzin.",
        alternatives: ["Das Benzin bezahle ich gern."],
        hint: "Nesne başa gelince fiil yine ikinci sırada kalır ve özne arkasına geçer.",
      },
      {
        kind: "free",
        prompt:
          "Bir paylaşım sitesine kısa bir ilan yaz: nereden nereye ve ne zaman gitmek istediğini söyle, kaç kişi olduğunuzu ve ne kadar eşyanız olduğunu yaz, ne ödeyebileceğini belirt ve nasıl ulaşılacağını söyle.",
        checklist: [
          "Nereden nereye ve ne zaman gideceğini yaz",
          "Kaç kişi olduğunuzu ve eşyanızı söyle",
          "Ne ödeyebileceğini belirt",
          "Telefon numaranı yaz ve teşekkür et",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich suche eine Mitfahrgelegenheit von … nach …", tr: "…'den …'e yol paylaşımı arıyorum.", en: "I'm looking for a ride from … to …" },
          { de: "Ich möchte am … fahren.", tr: "… günü gitmek istiyorum.", en: "I would like to go on …" },
          { de: "Wir haben nur …", tr: "Yalnız …'miz var.", en: "We only have …" },
          { de: "Ich bezahle gern …", tr: "…'i memnuniyetle öderim.", en: "I'm happy to pay …" },
          { de: "Bitte ruf mich an: …", tr: "Lütfen beni ara: …", en: "Please call me: …" },
        ],
        sample:
          "Hallo, ich suche eine Mitfahrgelegenheit von Bremen nach Hamburg. Ich möchte am Freitagnachmittag fahren, " +
          "zurück am Sonntagabend. Wir sind zwei Personen, meine Schwester und ich. Wir haben nur zwei kleine Rucksäcke. " +
          "Ich bezahle gern das Benzin, zum Beispiel zehn Euro pro Person. Wir sind freundlich und rauchen nicht. " +
          "Bitte ruf mich an: 0152 34 56 78. Danke, Burak",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s20",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Brot, Milch und Käse",
    genre: "pronounce",
    intro: "Bir şeyleri sayarken ses her maddede hafifçe askıda kalır, son maddede düşer; „oder“ ile iki seçenek sorarken önce yükselir, sonra iner. Altı cümlede bu ezgiyi çalış.",
    gloss: [
      { de: "die Milch", tr: "süt", en: "milk" },
      { de: "der Käse", tr: "peynir", en: "cheese" },
      { de: "das Hobby", tr: "hobi", en: "hobby" },
      { de: "der Kurs", tr: "kurs", en: "course" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich brauche Brot, Milch und Käse.",
        tr: "Ekmeğe, süte ve peynire ihtiyacım var.",
        hint: "„Brot“ ve „Milch“te ses askıda kalır, „Käse“de düşer: liste orada biter.",
        confusions: [
          {
            heard: [],
            fix: "Her maddede sesi düşürürsen liste bitmiş gibi duyulur; son maddeye kadar askıda tut.",
            expected: "Käse",
          },
        ],
      },
      {
        de: "Wir fahren nach Köln, Bonn und Mainz.",
        tr: "Köln'e, Bonn'a ve Mainz'a gidiyoruz.",
        hint: "Her şehir adında ton hafif yükselir, „Mainz“ta iner.",
        confusions: [
          {
            heard: [],
            fix: "Virgüllerde tam durma; ses bir sonraki maddeyi bekler gibi kalsın.",
            expected: "Mainz",
          },
        ],
      },
      {
        de: "Möchtest du Tee oder Kaffee?",
        tr: "Çay mı istersin, kahve mi?",
        hint: "Seçenek sorusu: „Tee“de ses yükselir, „Kaffee“de düşer — iki seçenek var, başkası yok.",
        confusions: [
          {
            heard: [],
            fix: "Sonda sesi yükseltirsen soru „başka bir şey de olur mu“ gibi duyulur; „Kaffee“de indir.",
            expected: "Kaffee",
          },
        ],
      },
      {
        de: "Kommst du am Montag oder am Dienstag?",
        tr: "Pazartesi mi geliyorsun, salı mı?",
        hint: "„Montag“da yükselir, „Dienstag“da düşer: karşındakinden birini seçmesini istiyorsun.",
        confusions: [
          {
            heard: [],
            fix: "İki seçenekte de aynı tonu kullanma; ilk seçenek yukarıda, ikincisi aşağıda.",
            expected: "Dienstag",
          },
        ],
      },
      {
        de: "Am Montag, am Mittwoch und am Freitag habe ich Kurs.",
        tr: "Pazartesi, çarşamba ve cuma kursum var.",
        hint: "Üç gün bir liste: ilk ikisinde ton askıda, „Freitag“ta hafifçe iner, cümle sonunda tamamen düşer.",
        confusions: [
          {
            heard: [],
            fix: "Listeyi parça parça söyleme; üç günü tek bir ezgi yayı içinde topla.",
            expected: "Freitag",
          },
        ],
      },
      {
        de: "Meine Hobbys sind Lesen, Kochen und Tanzen.",
        tr: "Hobilerim okumak, yemek pişirmek ve dans etmek.",
        hint: "„Lesen“ ve „Kochen“da ses askıda, „Tanzen“de iner.",
        confusions: [
          {
            heard: [],
            fix: "Son madde „und“dan sonra gelir ve cümlenin en alçak tonunu taşır.",
            expected: "Tanzen",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g20",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Wie viel? Wie viele? Wie oft?",
    genre: "grammar",
    intro: "Türkçedeki „kaç, ne kadar, ne sıklıkla“ Almancada „wie“ ile kurulan dört soruya dağılır; hangisinin ne zaman kullanıldığını öğren.",
    focus: "wie-soruları: wie viel, wie viele, wie oft, wie lange — sayılan mı, sayılmayan mı, sıklık mı, süre mi",
    gloss: [
      { de: "das Geld", tr: "para", en: "money" },
      { de: "die Geschwister", tr: "kardeşler", en: "siblings" },
      { de: "dauern", tr: "sürmek", en: "to last" },
      { de: "der Monat", tr: "ay", en: "month" },
      { de: "die Milch", tr: "süt", en: "milk" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "wie viel mi, wie viele mi?",
        tr: "Sayılamayan şeyler (para, su, zaman) için „wie viel“ kullanılır ve isim tekil kalır. Tek tek sayılan şeyler için „wie viele“ kullanılır ve isim çoğuldur. Fiyat her zaman „wie viel“ ile sorulur.",
        examples: [
          { de: "Wie viel Geld hast du dabei?", tr: "Yanında ne kadar para var?", note: "sayılamaz → wie viel" },
          { de: "Wie viele Kinder haben Sie?", tr: "Kaç çocuğunuz var?", note: "sayılır → wie viele + çoğul" },
          { de: "Wie viel kostet die Fahrkarte?", tr: "Bilet ne kadar?", note: "fiyat → wie viel" },
        ],
      },
      {
        heading: "wie oft ve wie lange",
        tr: "„wie oft“ sıklığı sorar: ne sıklıkla? Cevabı „einmal, zweimal, jeden Tag“ gibidir. „wie lange“ süreyi sorar: ne kadar süre? Cevabı „zwei Stunden, drei Monate“ ya da „seit …“ gibidir.",
        examples: [
          { de: "Wie oft gehst du schwimmen? — Zweimal pro Woche.", tr: "Ne sıklıkla yüzmeye gidiyorsun? — Haftada iki kez.", note: "sıklık" },
          { de: "Wie lange dauert der Kurs? — Drei Monate.", tr: "Kurs ne kadar sürüyor? — Üç ay.", note: "süre" },
          { de: "Wie lange wohnst du schon hier? — Seit zwei Jahren.", tr: "Ne zamandır burada oturuyorsun? — İki yıldır.", note: "süre + seit" },
        ],
      },
      {
        heading: "Soru grubu birinci sırada",
        tr: "„wie viel Geld“ ya da „wie viele Zimmer“ gibi soru grubu tek bir öge sayılır ve birinci sıraya gelir. Çekimli fiil ikinci sıradadır, özne arkasından gelir.",
        examples: [
          { de: "Wie viele Zimmer hat die Wohnung?", tr: "Dairenin kaç odası var?", note: "soru grubu + fiil + özne" },
          { de: "Wie viel Zeit brauchst du?", tr: "Ne kadar zamana ihtiyacın var?", note: "Zeit sayılamaz" },
          { de: "Wie oft kommt der Bus?", tr: "Otobüs ne sıklıkla geliyor?", note: "fiil ikinci" },
        ],
      },
    ],
    questions: [
      {
        text: "___ Geschwister hast du?",
        options: ["Wie viel", "Wie viele", "Wie oft"],
        answer: 1,
        explain: "Kardeşler tek tek sayılır ve isim çoğul: wie viele.",
      },
      {
        text: "Wie lange dauert der Film?",
        options: ["Jeden Tag.", "Zweimal.", "Zwei Stunden."],
        answer: 2,
        explain: "„wie lange“ süre sorar; cevap bir süre olmalı: zwei Stunden.",
      },
      {
        text: "___ Milch brauchen wir für den Kuchen?",
        options: ["Wie viel", "Wie viele", "Wie lange"],
        answer: 0,
        explain: "Süt sayılamaz; miktar wie viel ile sorulur.",
      },
      {
        kind: "gapfill",
        text: "Wie ___ gehst du ins Kino? — Einmal im Monat.",
        options: [],
        answer: 0,
        accept: ["oft"],
        explain: "Cevap bir sıklık (ayda bir): wie oft.",
      },
      {
        kind: "gapfill",
        text: "Wie ___ wohnst du schon in Berlin? — Seit drei Jahren.",
        options: [],
        answer: 0,
        accept: ["lange"],
        explain: "Cevap bir süre (üç yıldır): wie lange.",
      },
      {
        kind: "gapfill",
        text: "Wie ___ Personen kommen zur Party? — Zwölf.",
        options: [],
        answer: 0,
        accept: ["viele"],
        explain: "Kişiler sayılır ve isim çoğul: wie viele Personen.",
      },
      {
        kind: "gapfill",
        text: "Wie ___ kostet die Jacke? — Vierzig Euro.",
        options: [],
        answer: 0,
        accept: ["viel"],
        explain: "Fiyat her zaman wie viel ile sorulur.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wie viele", "Zimmer", "hat", "die Wohnung"],
        explain: "Soru grubu „wie viele Zimmer“ birinci, fiil ikinci, özne arkada: Wie viele Zimmer hat die Wohnung?",
      },
      {
        kind: "truefalse",
        text: "„Wie viel Kinder hast du?“ — Bu soru doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Çocuklar sayılır ve isim çoğul; doğrusu „Wie viele Kinder hast du?“",
      },
      {
        kind: "truefalse",
        text: "„Wie oft fährt der Bus? — Alle zehn Minuten.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„wie oft“ sıklık sorar; „her on dakikada bir“ bir sıklık cevabıdır.",
      },
    ],
  },
];

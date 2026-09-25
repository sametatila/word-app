import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 11.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerin ilki. Aile ve çocuk hattı: anaokulunun
 * gezi mektubu, büyükannenin sesli mesajı, bakıcıya bırakılan not. Söyleyiş
 * odağı sayılar: -zehn mi -zig mi; dil bilgisi und / aber / oder / denn
 * — sıfır konumdaki bağlaçlar.
 */
export const deA1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r11",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Ausflug in den Wald",
    genre: "letter",
    intro: "Anaokulu velilere bir mektup göndermiş: çocuklar nereye gidiyor, yanlarına ne alacaklar, ne kadar tutuyor.",
    gloss: [
      { de: "der Ausflug", tr: "gezi", en: "trip" },
      { de: "der Wald", tr: "orman", en: "forest" },
      { de: "der Rucksack", tr: "sırt çantası", en: "backpack" },
      { de: "die Flasche", tr: "şişe", en: "bottle" },
      { de: "nass", tr: "ıslak", en: "wet" },
      { de: "der Umschlag", tr: "zarf", en: "envelope" },
    ],
    minutes: 4,
    text:
      "Liebe Eltern,\n\n" +
      "am Donnerstag macht die Gruppe Blau einen Ausflug in den Wald. Wir fahren um neun Uhr mit dem Bus " +
      "vom Kindergarten los und sind um vierzehn Uhr wieder zurück.\n\n" +
      "Bitte geben Sie Ihrem Kind einen kleinen Rucksack mit: eine Flasche Wasser, ein Brot und einen Apfel. " +
      "Schokolade brauchen die Kinder an diesem Tag nicht.\n\n" +
      "Im Wald ist es oft nass. Die Kinder brauchen gute Schuhe und eine Jacke für den Regen.\n\n" +
      "Der Ausflug kostet drei Euro für den Bus. Bitte geben Sie das Geld bis Montag in einem Umschlag ab.\n\n" +
      "Viele Grüße\nIhr Team vom Kindergarten Sonnenblume",
    questions: [
      {
        text: "Warum schreibt der Kindergarten diesen Brief?",
        options: [
          "Der Kindergarten ist am Donnerstag zu.",
          "Die Kinder machen einen Ausflug.",
          "Die Eltern sollen mit dem Bus fahren.",
        ],
        answer: 1,
        explain: "Mektup perşembe günkü orman gezisini duyuruyor: „macht die Gruppe Blau einen Ausflug in den Wald“.",
      },
      {
        text: "Was soll im Rucksack sein?",
        options: ["Schokolade und Saft", "Geld und ein Handy", "Wasser, ein Brot und ein Apfel"],
        answer: 2,
        explain: "„eine Flasche Wasser, ein Brot und einen Apfel“; çikolata o gün gerekmiyor.",
      },
      {
        kind: "truefalse",
        text: "Die Kinder sind um vier Uhr am Nachmittag zurück.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„um vierzehn Uhr wieder zurück“ — saat on dört, yani öğleden sonra ikide dönüyorlar.",
      },
      {
        kind: "gapfill",
        text: "Der Bus kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„Der Ausflug kostet drei Euro für den Bus.“",
      },
      {
        kind: "short_answer",
        text: "Was brauchen die Kinder für den Regen?",
        options: [],
        answer: 0,
        accept: ["eine Jacke", "Jacke", "eine Jacke für den Regen"],
        explain: "„Die Kinder brauchen gute Schuhe und eine Jacke für den Regen.“",
      },
      {
        text: "Bis wann geben die Eltern das Geld ab?",
        options: ["bis Montag", "bis Donnerstag", "bis vierzehn Uhr"],
        answer: 0,
        explain: "„Bitte geben Sie das Geld bis Montag in einem Umschlag ab“ — gezi günü perşembe.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l11",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Eine Sprachnachricht von Oma",
    genre: "phone",
    intro: "Büyükanne torununa sesli mesaj bırakıyor: ne zaman geliyor, kim onu karşılayacak, ne kadar kalacak.",
    gloss: [
      { de: "die Oma", tr: "nine", en: "grandma" },
      { de: "der Koffer", tr: "bavul", en: "suitcase" },
      { de: "das Gleis", tr: "peron", en: "platform" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "das Gemüse", tr: "sebze", en: "vegetable" },
      { de: "leer", tr: "boş", en: "empty" },
    ],
    minutes: 4,
    segments: [
      { text: "Hallo Sina, hier ist Oma. Ich habe eine gute Nachricht: Ich komme am Samstag zu euch nach Kassel!" },
      { text: "Mein Zug kommt um elf Uhr zwanzig an, auf Gleis vier. Kannst du mich bitte am Bahnhof abholen? Mein Koffer ist so schwer." },
      { text: "Ich bringe einen Kuchen mit. Für die Kinder habe ich zwei Bücher gekauft." },
      { text: "Ich bleibe bis Dienstag. Am Dienstag fahre ich um neun Uhr morgens wieder nach Hause." },
      { text: "Ach ja, und bitte kocht kein Fleisch für mich. Ich esse jetzt nur noch Gemüse und Fisch." },
      { text: "Mein Handy ist fast leer. Ruf mich bitte heute Abend zu Hause an. Bis Samstag, ich freue mich!" },
    ],
    questions: [
      {
        text: "Warum soll Sina ihre Oma am Bahnhof abholen?",
        options: ["Oma kennt den Weg nicht.", "Der Zug hat Verspätung.", "Oma hat einen schweren Koffer."],
        answer: 2,
        explain: "„Kannst du mich bitte am Bahnhof abholen? Mein Koffer ist so schwer.“",
      },
      {
        text: "Was hat Oma für die Kinder gekauft?",
        options: ["zwei Bücher", "einen Kuchen", "einen Fisch"],
        answer: 0,
        explain: "„Für die Kinder habe ich zwei Bücher gekauft“; pastayı herkes için getiriyor.",
      },
      {
        kind: "truefalse",
        text: "Oma möchte am Wochenende Fleisch essen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„bitte kocht kein Fleisch für mich“ — artık yalnız sebze ve balık yiyor.",
      },
      {
        kind: "gapfill",
        text: "Omas Zug kommt auf Gleis ___ an.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„Mein Zug kommt um elf Uhr zwanzig an, auf Gleis vier.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann bleibt Oma in Kassel?",
        options: [],
        answer: 0,
        accept: ["bis Dienstag", "Dienstag", "bis zum Dienstag"],
        explain: "„Ich bleibe bis Dienstag.“",
      },
      {
        text: "Warum soll Sina am Abend zu Hause anrufen?",
        options: ["Oma hat eine neue Nummer.", "Omas Handy ist fast leer.", "Oma ist am Abend nicht da."],
        answer: 1,
        explain: "„Mein Handy ist fast leer. Ruf mich bitte heute Abend zu Hause an.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w11",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Ein Zettel für die Babysitterin",
    genre: "message",
    intro: "Bu akşam dışarı çıkıyorsun ve çocuk bakıcısına not bırakıyorsun: önce iki cümle kur, sonra kısa bir not yaz.",
    gloss: [
      { de: "der Zettel", tr: "not kâğıdı", en: "note" },
      { de: "das Bett", tr: "yatak", en: "bed" },
      { de: "der Kühlschrank", tr: "buzdolabı", en: "refrigerator" },
      { de: "dürfen", tr: "izinli olmak", en: "to be allowed" },
      { de: "später", tr: "daha sonra", en: "later" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Çocuklar saat yedide yemek yiyor.",
        answer: "Die Kinder essen um sieben Uhr.",
        alternatives: ["Um sieben Uhr essen die Kinder."],
        hint: "Saat „um“ ile söylenir; zaman başa gelirse fiil yine ikinci sırada kalır.",
      },
      {
        kind: "build",
        tr: "Lütfen onları saat sekizde yatır.",
        answer: "Bitte bring sie um acht Uhr ins Bett.",
        alternatives: ["Bring sie bitte um acht Uhr ins Bett."],
        hint: "du'ya emir: özne düşer ve fiil başa geçer; „sie“ burada çoğul: onları.",
      },
      {
        kind: "free",
        prompt:
          "Bakıcıya kısa bir not yaz: ne zaman döneceğini söyle, yemeğin nerede olduğunu ve çocukların kaçta yatacağını yaz, neye izin olmadığını belirt ve sorun olursa nasıl ulaşılacağını yaz.",
        checklist: [
          "Ne zaman döneceğini yaz",
          "Yemeği ve yatma saatini anlat",
          "Neye izin olmadığını söyle",
          "Telefon numaranı yaz ve teşekkür et",
        ],
        minWords: 35,
        phrases: [
          { de: "Wir sind um … wieder zu Hause.", tr: "Saat …'de yine evdeyiz.", en: "We'll be back home at …" },
          { de: "Das Essen steht im Kühlschrank.", tr: "Yemek buzdolabında.", en: "The food is in the fridge." },
          { de: "Die Kinder dürfen …", tr: "Çocuklar … yapabilir.", en: "The children are allowed to …" },
          { de: "Bitte kein Fernsehen.", tr: "Lütfen televizyon yok.", en: "No television, please." },
          { de: "Bei Problemen ruf mich bitte an.", tr: "Sorun olursa lütfen beni ara.", en: "If there are problems, please call me." },
        ],
        sample:
          "Liebe Clara, wir sind um elf Uhr wieder zu Hause. Das Essen steht im Kühlschrank: Nudeln mit Tomatensoße. " +
          "Die Kinder essen um sieben Uhr. Danach dürfen sie noch eine halbe Stunde spielen, aber bitte kein Fernsehen. " +
          "Bitte bring sie um acht Uhr ins Bett. Bei Problemen ruf mich bitte an: 0171 23 45 67. " +
          "Danke und bis später! Maria",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s11",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "dreizehn oder dreißig?",
    genre: "pronounce",
    intro: "On üç ile otuz, on dört ile kırk: Almancada sayıların sonu -zehn ya da -zig'dir ve birler basamağı önce söylenir. Altı cümlede ikisini ayır.",
    gloss: [
      { de: "das Jahr", tr: "yıl", en: "year" },
      { de: "kosten", tr: "tutmak", en: "to cost" },
      { de: "die Minute", tr: "dakika", en: "minute" },
      { de: "die Person", tr: "kişi", en: "person" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Mein Sohn ist dreizehn Jahre alt.",
        tr: "Oğlum on üç yaşında.",
        hint: "-zehn = TSEEN, uzun e ile: DRAY-tseen. Vurgu ilk hecede ama son hece de tam söylenir.",
        confusions: [
          {
            heard: ["dreißig"],
            fix: "Son hece silikleşirse on üç otuza döner; sondaki TSEEN'i uzat ve net bitir.",
            expected: "dreizehn",
          },
        ],
      },
      {
        de: "Das Buch kostet dreißig Euro.",
        tr: "Kitap otuz avro.",
        hint: "dreißig = DRAY-sih: ortada ts yok, yumuşak bir s var; sondaki -ig = -ih.",
        confusions: [
          {
            heard: ["dreizehn"],
            fix: "„dreißig“ içinde z sesi yoktur; ß'yi s gibi söyle ve -ih ile bitir.",
            expected: "dreißig",
          },
        ],
      },
      {
        de: "Der Bus kommt in vierzehn Minuten.",
        tr: "Otobüs on dört dakika sonra geliyor.",
        hint: "vierzehn = FİR-tseen: sayının içinde „vier“ kısalır, sonu yine uzun -zehn.",
        confusions: [
          {
            heard: ["vierzig"],
            fix: "-zehn ile -zig'in farkı son hecede: TSEEN mi TSİH mi, bekleme süresi buna bağlı.",
            expected: "vierzehn",
          },
        ],
      },
      {
        de: "Meine Oma ist siebzig.",
        tr: "Ninem yetmiş yaşında.",
        hint: "siebzig = ZİİP-tsih: „sieben“in -en'i düşer ve b burada p gibi duyulur.",
        confusions: [
          {
            heard: ["siebzehn"],
            fix: "Sonu -zig ise kısa ve -ih ile biter; uzun TSEEN on yedi demektir.",
            expected: "siebzig",
          },
        ],
      },
      {
        de: "Wir sind einundzwanzig Personen.",
        tr: "Yirmi bir kişiyiz.",
        hint: "Almancada birler önce gelir: bir-ve-yirmi = AYN-unt-tsvan-tsih, tek kelime gibi.",
        confusions: [
          {
            heard: ["zwanzig"],
            fix: "Baştaki „einund“ yutulursa sayı yirmiye düşer; önce birleri, sonra onları söyle.",
            expected: "einundzwanzig",
          },
        ],
      },
      {
        de: "Um sechzehn Uhr habe ich Zeit.",
        tr: "Saat on altıda vaktim var.",
        hint: "sechzehn = ZEH-tseen: „sechs“teki s düşer, ch yumuşaktır.",
        confusions: [
          {
            heard: ["sechzig"],
            fix: "Saat altmış olmaz; sondaki TSEEN'i uzun ve net söyle.",
            expected: "sechzehn",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g11",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "und, aber, oder, denn",
    genre: "grammar",
    intro: "İki cümleyi bağlayan dört küçük kelime cümlenin sırasını hiç değiştirmez; neden öyle olduğunu ve hangisinin ne anlattığını öğren.",
    focus: "Bağlaçlar: und, aber, oder, denn — sıfır konum, sıra değişmez",
    gloss: [
      { de: "müde", tr: "yorgun", en: "tired" },
      { de: "krank", tr: "hasta", en: "sick" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "hell", tr: "aydınlık", en: "bright" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Sıfırıncı konum",
        tr: "„und, aber, oder, denn“ iki ana cümleyi birbirine bağlar ama kendileri cümlenin bir ögesi sayılmaz: sıfırıncı konumda dururlar. Bu yüzden arkalarından tam, normal bir cümle gelir ve çekimli fiil yine ikinci sıradadır.",
        examples: [
          { de: "Ich trinke Tee und mein Mann trinkt Kaffee.", tr: "Ben çay içiyorum, kocam da kahve içiyor.", note: "und + özne + fiil" },
          { de: "Das Zimmer ist klein, aber es ist hell.", tr: "Oda küçük ama aydınlık.", note: "aber + es + ist" },
          { de: "Heute arbeite ich, aber morgen habe ich frei.", tr: "Bugün çalışıyorum ama yarın izinliyim.", note: "aber'den sonra zaman birinci, fiil ikinci" },
        ],
      },
      {
        heading: "Hangisi ne anlatır?",
        tr: "„und“ ekler, „aber“ karşıtlık kurar, „oder“ seçenek sunar, „denn“ sebep verir. „denn“ Türkçedeki „çünkü“ gibidir: sebebi söyleyen cümle arkadan gelir ve onun da sırası değişmez.",
        examples: [
          { de: "Ich bleibe zu Hause, denn ich bin krank.", tr: "Evde kalıyorum, çünkü hastayım.", note: "denn: sebep" },
          { de: "Nimmst du den Bus oder fährst du mit dem Rad?", tr: "Otobüse mi biniyorsun, yoksa bisikletle mi gidiyorsun?", note: "oder: seçenek" },
          { de: "Wir gehen nicht in den Park, denn es regnet.", tr: "Parka gitmiyoruz, çünkü yağmur yağıyor.", note: "denn + es + regnet" },
        ],
      },
      {
        heading: "Virgül ve tekrar",
        tr: "„aber“ ve „denn“dan önce virgül konur; „und“ ile „oder“dan önce genellikle konmaz. Özne iki cümlede aynıysa „und“ ile „oder“dan sonra tekrar edilmeyebilir; „denn“den sonra ise özne hep söylenir.",
        examples: [
          { de: "Sie steht auf und macht Frühstück.", tr: "Kalkıyor ve kahvaltı hazırlıyor.", note: "özne tekrarlanmadı" },
          { de: "Die Jacke ist schön, aber sie ist teuer.", tr: "Ceket güzel ama pahalı.", note: "aber'den önce virgül" },
          { de: "Ich gehe früh ins Bett, denn ich bin müde.", tr: "Erken yatıyorum, çünkü yorgunum.", note: "denn'den sonra özne var" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich bleibe heute zu Hause, ___ ich bin krank.",
        options: ["oder", "aber", "denn"],
        answer: 2,
        explain: "İkinci cümle birinci cümlenin sebebini söylüyor; sebep bağlacı denn'dir.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich lerne Deutsch, denn ich arbeite in Berlin.",
          "Ich lerne Deutsch, denn arbeite ich in Berlin.",
          "Ich lerne Deutsch, denn ich in Berlin arbeite.",
        ],
        answer: 0,
        explain: "„denn“ sıfır konumdadır; arkasından özne birinci, fiil ikinci gelir.",
      },
      {
        text: "Das Essen ist gut, ___ es ist sehr teuer.",
        options: ["oder", "aber", "denn"],
        answer: 1,
        explain: "İyi ama pahalı: iki bilgi karşıt, bu yüzden aber.",
      },
      {
        kind: "gapfill",
        text: "Möchtest du Tee ___ Kaffee?",
        options: [],
        answer: 0,
        accept: ["oder"],
        explain: "İki seçenek sunuluyor; seçenek bağlacı oder'dir.",
      },
      {
        kind: "gapfill",
        text: "Heute habe ich keine Zeit, ___ morgen komme ich gern.",
        options: [],
        answer: 0,
        accept: ["aber"],
        explain: "Bugün değil ama yarın: karşıtlık aber ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "Wir gehen nicht spazieren, ___ es regnet.",
        options: [],
        answer: 0,
        accept: ["denn"],
        explain: "Yağmur, yürüyüşe çıkmamanın sebebi: denn.",
      },
      {
        kind: "gapfill",
        text: "Am Montag arbeite ich und am Dienstag ___ ich frei. (haben)",
        options: [],
        answer: 0,
        accept: ["habe"],
        explain: "„und“dan sonraki cümle normal sıradadır: zaman birinci, fiil ikinci, özne arkada.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich bin müde,", "denn", "ich", "arbeite", "viel"],
        explain: "„denn“dan sonra özne birinci, fiil ikinci: Ich bin müde, denn ich arbeite viel.",
      },
      {
        kind: "truefalse",
        text: "„Ich lerne viel, denn habe ich morgen eine Prüfung.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„denn“ bir öge sayılmaz, özne yer değiştirmez; doğrusu „denn ich habe morgen eine Prüfung“.",
      },
      {
        kind: "truefalse",
        text: "„Er ist nett, aber er kommt immer zu spät.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„aber“dan önce virgül var ve arkasından normal sıralı bir cümle geliyor.",
      },
    ],
  },
];

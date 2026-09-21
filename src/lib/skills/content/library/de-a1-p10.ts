import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 10.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * A1 hücresini ONA tamamlayan son parti. Ev ve şehir hattı: çöp ayırma
 * yönergesi, müze sesli rehberi, ev arkadaşlığı başvurusu. Söyleyiş odağı
 * cümle ezgisi; dil bilgisi A1'in çatısı — fiilin ikinci sıradaki yeri.
 */
export const deA1P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r10",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Müll richtig trennen",
    genre: "info",
    intro: "Apartmanın girişindeki tabela çöpün nasıl ayrılacağını anlatıyor: hangi kutu neye, hangi gün ne için.",
    gloss: [
      { de: "der Müll", tr: "çöp", en: "rubbish" },
      { de: "die Tonne", tr: "çöp kutusu", en: "bin" },
      { de: "das Papier", tr: "kâğıt", en: "paper" },
      { de: "die Flasche", tr: "şişe", en: "bottle" },
      { de: "der Keller", tr: "bodrum", en: "cellar" },
      { de: "sauber", tr: "temiz", en: "clean" },
    ],
    minutes: 4,
    text:
      "MÜLL RICHTIG TRENNEN — Lindenweg 4\n\n" +
      "Blaue Tonne: Papier und Karton. Bitte große Kartons klein machen.\n\n" +
      "Gelbe Tonne: Plastik und Dosen. Alles muss sauber sein.\n\n" +
      "Braune Tonne: Essen und Reste aus der Küche. Kein Plastik!\n\n" +
      "Graue Tonne: der Rest.\n\n" +
      "Flaschen aus Glas gehören nicht in die Tonne. Der Container steht vor dem Supermarkt.\n\n" +
      "Die blaue Tonne wird am Dienstag geleert, die gelbe am Freitag. " +
      "Bitte stellen Sie die Tonnen am Abend vorher an die Straße.\n\n" +
      "Alte Möbel und Elektro bitte nicht in den Keller stellen. Fragen? Herr Peters, Wohnung 2.",
    questions: [
      {
        text: "Was kommt in die braune Tonne?",
        options: ["Plastik und Dosen", "Papier und Karton", "Essen aus der Küche"],
        answer: 2,
        explain: "„Braune Tonne: Essen und Reste aus der Küche.“ Plastik sarı kutuya gidiyor.",
      },
      {
        text: "Wo gibt man Flaschen aus Glas ab?",
        options: ["im Container vor dem Supermarkt", "in der grauen Tonne", "im Keller"],
        answer: 0,
        explain: "„Der Container steht vor dem Supermarkt“ — cam kutulara girmiyor.",
      },
      {
        kind: "truefalse",
        text: "Alte Möbel darf man in den Keller stellen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Alte Möbel und Elektro bitte nicht in den Keller stellen.“",
      },
      {
        kind: "gapfill",
        text: "Die gelbe Tonne wird am ___ geleert.",
        options: [],
        answer: 0,
        accept: ["Freitag"],
        explain: "„die blaue Tonne wird am Dienstag geleert, die gelbe am Freitag“.",
      },
      {
        kind: "short_answer",
        text: "Wen fragt man bei Problemen?",
        options: [],
        answer: 0,
        accept: ["Herrn Peters", "Herr Peters", "Peters"],
        explain: "„Fragen? Herr Peters, Wohnung 2.“",
      },
      {
        text: "Wann stellt man die Tonnen an die Straße?",
        options: ["am Morgen", "am Abend vorher", "am Wochenende"],
        answer: 1,
        explain: "„Bitte stellen Sie die Tonnen am Abend vorher an die Straße.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l10",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Der Audioguide im Stadtmuseum",
    genre: "monologue",
    intro: "Müzenin sesli rehberi giriş açıklamasını okuyor: nerede başlanır, ne kadar sürer, neye izin var.",
    gloss: [
      { de: "das Museum", tr: "müze", en: "museum" },
      { de: "der Eingang", tr: "giriş", en: "entrance" },
      { de: "das Bild", tr: "tablo", en: "painting" },
      { de: "der Führer", tr: "rehber", en: "guide" },
      { de: "dauern", tr: "sürmek", en: "to last" },
      { de: "verboten", tr: "yasak", en: "forbidden" },
    ],
    minutes: 4,
    segments: [
      { text: "Herzlich willkommen im Stadtmuseum Weimar. Dieser Audioguide führt Sie durch das ganze Haus." },
      { text: "Der Rundgang beginnt hier am Eingang und dauert ungefähr fünfzig Minuten." },
      { text: "Im ersten Raum sehen Sie Bilder aus dem Jahr achtzehnhundert. Bitte drücken Sie die Nummer eins." },
      { text: "Im zweiten Stock finden Sie alte Fotos von der Stadt. Dort ist auch ein kleines Café." },
      { text: "Fotos ohne Blitz sind erlaubt. Essen und Trinken sind in den Räumen verboten." },
      { text: "Der Führer kostet nichts. Bitte geben Sie ihn am Ende wieder am Eingang ab. Viel Freude!" },
    ],
    questions: [
      {
        text: "Wie lange dauert der Rundgang?",
        options: ["ungefähr fünfzehn Minuten", "ungefähr fünfzig Minuten", "den ganzen Tag"],
        answer: 1,
        explain: "„dauert ungefähr fünfzig Minuten“ — yaklaşık elli dakika.",
      },
      {
        text: "Was ist in den Räumen verboten?",
        options: ["Essen und Trinken", "Fotos ohne Blitz", "der Audioguide"],
        answer: 0,
        explain: "„Essen und Trinken sind in den Räumen verboten“; flaşsız fotoğraf serbest.",
      },
      {
        kind: "truefalse",
        text: "Der Audioguide kostet zehn Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Der Führer kostet nichts“ — ücretsiz, yalnız sonunda geri veriliyor.",
      },
      {
        kind: "gapfill",
        text: "Im ___ Stock findet man alte Fotos von der Stadt.",
        options: [],
        answer: 0,
        accept: ["zweiten", "2."],
        explain: "„Im zweiten Stock finden Sie alte Fotos von der Stadt.“",
      },
      {
        kind: "short_answer",
        text: "Wo beginnt der Rundgang?",
        options: [],
        answer: 0,
        accept: ["am Eingang", "Eingang", "hier am Eingang"],
        explain: "„Der Rundgang beginnt hier am Eingang.“",
      },
      {
        text: "Was macht man am Ende mit dem Gerät?",
        options: ["Man nimmt es mit.", "Man gibt es am Eingang ab.", "Man lässt es im Café."],
        answer: 1,
        explain: "„Bitte geben Sie ihn am Ende wieder am Eingang ab.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w10",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Bewerbung für ein WG-Zimmer",
    genre: "profile",
    intro: "Paylaşımlı bir eve başvuruyorsun: önce iki cümle kur, sonra kendini tanıtan kısa bir metin yaz.",
    gloss: [
      { de: "das Zimmer", tr: "oda", en: "room" },
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "ruhig", tr: "sakin", en: "quiet" },
      { de: "einziehen", tr: "taşınmak", en: "to move in" },
      { de: "putzen", tr: "temizlik yapmak", en: "to clean" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yirmi iki yaşındayım ve Leipzig'de okuyorum.",
        answer: "Ich bin zweiundzwanzig Jahre alt und studiere in Leipzig.",
        alternatives: ["Ich bin 22 Jahre alt und studiere in Leipzig."],
        hint: "İki ana cümle „und“ ile bağlanır; ikinci cümlede özne tekrarlanmayabilir.",
      },
      {
        kind: "build",
        tr: "Ekim ayında taşınabilirim.",
        answer: "Im Oktober kann ich einziehen.",
        alternatives: ["Ich kann im Oktober einziehen."],
        hint: "„einziehen“ ayrılır ama modal fiille birlikte mastar hâlinde sonda kalır.",
      },
      {
        kind: "free",
        prompt:
          "Ev ilanına kısa bir cevap yaz: kendini tanıt, ne iş yaptığını ya da nerede okuduğunu söyle, nasıl biri olduğunu anlat, ne zaman taşınabileceğini yaz ve odayı görmek istediğini belirt.",
        checklist: [
          "Kendini tanıt: ad, yaş, iş ya da okul",
          "Nasıl biri olduğunu yaz",
          "Ne zaman taşınabileceğini söyle",
          "Odayı görmek istediğini yaz ve vedalaş",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich interessiere mich für das Zimmer.", tr: "Odayla ilgileniyorum.", en: "I am interested in the room." },
          { de: "Ich bin … Jahre alt.", tr: "… yaşındayım.", en: "I am … years old." },
          { de: "Ich bin ruhig und ordentlich.", tr: "Sakin ve düzenliyim.", en: "I am quiet and tidy." },
          { de: "Ich kann ab … einziehen.", tr: "…'den itibaren taşınabilirim.", en: "I can move in from …" },
          { de: "Kann ich das Zimmer sehen?", tr: "Odayı görebilir miyim?", en: "Can I see the room?" },
        ],
        sample:
          "Hallo, ich heiße Melis und interessiere mich für das Zimmer. " +
          "Ich bin zweiundzwanzig Jahre alt und studiere in Leipzig Biologie. " +
          "Ich bin ruhig und ordentlich, ich koche gern und putze auch gern. " +
          "Rauchen tue ich nicht. Ich kann ab Oktober einziehen und zahle die Miete immer pünktlich. " +
          "Kann ich das Zimmer am Wochenende sehen? Viele Grüße, Melis",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s10",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Frage oder Aussage?",
    genre: "pronounce",
    intro: "Aynı sözcükler, iki ayrı ezgi: sesin sonda yükselmesi ya da düşmesi cümlenin türünü söyler.",
    gloss: [
      { de: "die Frage", tr: "soru", en: "question" },
      { de: "bezahlen", tr: "ödemek", en: "to pay" },
      { de: "das Zimmer", tr: "oda", en: "room" },
      { de: "gleich", tr: "birazdan", en: "shortly" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Du kommst morgen.",
        tr: "Yarın geliyorsun.",
        hint: "Düz cümle: ses son hecede DÜŞER. Sonuna doğru tonu indir.",
        confusions: [
          {
            heard: ["Du kommst morgen?"],
            fix: "Sonda ton yükselirse aynı sözcükler soruya dönüşür; burada düşürmen gerekiyor.",
            expected: "morgen",
          },
        ],
      },
      {
        de: "Du kommst morgen?",
        tr: "Yarın mı geliyorsun?",
        hint: "Soru sözcüğü yok, fiil de başa geçmedi: türü yalnız ezgi söylüyor, son hecede tonu YÜKSELT.",
        confusions: [
          {
            heard: ["Du kommst morgen."],
            fix: "Bu biçimde soru işaretini ses taşır; ton düz kalırsa karşı taraf soru olduğunu anlamaz.",
            expected: "morgen",
          },
        ],
      },
      {
        de: "Wie viel kostet das Zimmer?",
        tr: "Oda ne kadar?",
        hint: "W-sorusunda ton sonda DÜŞER, çünkü soru sözcüğü türü zaten söylemiştir.",
        confusions: [
          {
            heard: ["Wie viel kostet das Zimmer"],
            fix: "Soru sözcüğü varsa ezgi düz cümledeki gibi iner; yükseltmek tereddüt gibi duyulur.",
            expected: "Zimmer",
          },
        ],
      },
      {
        de: "Kann ich hier bezahlen?",
        tr: "Burada ödeyebilir miyim?",
        hint: "Evet-hayır sorusu: fiil başta ve ton sonda YÜKSELİR.",
        confusions: [
          {
            heard: ["Kann ich hier bezahlen."],
            fix: "Fiil başa geçtiğinde de ezgi yükselmeli; iki işaret birlikte çalışır.",
            expected: "bezahlen",
          },
        ],
      },
      {
        de: "Ich komme gleich, kein Problem.",
        tr: "Hemen geliyorum, sorun değil.",
        hint: "Virgülde ton hafif yükselir, cümle sonunda düşer — iki parça tek nefeste söylenir.",
        confusions: [
          {
            heard: ["Ich komme gleich. Kein Problem."],
            fix: "Virgülde tam durma; ses biraz askıda kalır ve cümle devam eder.",
            expected: "gleich",
          },
        ],
      },
      {
        de: "Entschuldigung, ist hier frei?",
        tr: "Affedersiniz, burası boş mu?",
        hint: "„Entschuldigung“ sonunda ton askıda kalır, soru sonunda yükselir.",
        confusions: [
          {
            heard: ["Entschuldigung ist hier frei"],
            fix: "Hitap ile soru arasında kısa bir duraklama olur; sonda ses yükselir.",
            expected: "frei",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g10",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Das Verb steht auf Platz zwei",
    genre: "grammar",
    intro: "Almanca cümlenin tek değişmez kuralı: çekimli fiilin yeri. Nerede durduğunu ve ne zaman yer değiştirdiğini öğren.",
    focus: "Cümle dizilişi: fiil ikinci sırada, soruda başta",
    gloss: [
      { de: "heute", tr: "bugün", en: "today" },
      { de: "der Supermarkt", tr: "süpermarket", en: "supermarket" },
      { de: "arbeiten", tr: "çalışmak", en: "to work" },
      { de: "das Frühstück", tr: "kahvaltı", en: "breakfast" },
      { de: "manchmal", tr: "bazen", en: "sometimes" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İkinci sıra, ikinci kelime değil",
        tr: "Düz cümlede çekimli fiil her zaman İKİNCİ ögedir. Birinci öge tek bir kelime olmak zorunda değil: „Am nächsten Montag“ tek ögedir. Türkçede fiil sona gider; Almancada yeri sabittir ve geri kalan ögeler onun etrafında dizilir.",
        examples: [
          { de: "Ich arbeite heute zu Hause.", tr: "Bugün evde çalışıyorum.", note: "1: Ich — 2: arbeite" },
          { de: "Heute arbeite ich zu Hause.", tr: "Bugün evde çalışıyorum.", note: "zaman başa geçti, fiil yine ikinci" },
          { de: "Am Montag kaufe ich im Supermarkt ein.", tr: "Pazartesi süpermarketten alışveriş yapıyorum.", note: "ön ek yine sonda" },
        ],
      },
      {
        heading: "Başa ne gelirse özne arkaya geçer",
        tr: "Cümleye zaman, yer ya da bir nesne ile başlarsan özne fiilin ARKASINA geçer. Bu bir seçim değil zorunluluk: fiilin ikinci sırası korunmak zorundadır. „Heute ich arbeite“ bu yüzden yanlıştır.",
        examples: [
          { de: "Manchmal koche ich abends.", tr: "Bazen akşamları yemek pişiririm.", note: "özne fiilin arkasında" },
          { de: "Das Frühstück macht mein Mann.", tr: "Kahvaltıyı eşim hazırlar.", note: "nesne başta, özne arkada" },
          { de: "In Hamburg wohnt meine Schwester.", tr: "Hamburg'da kız kardeşim oturuyor.", note: "yer başta" },
        ],
      },
      {
        heading: "Soruda fiil öne çıkar",
        tr: "Evet-hayır sorusunda çekimli fiil BİRİNCİ sıraya geçer ve özne hemen arkasından gelir. W-sorusunda ise soru sözcüğü birinci, fiil yine ikinci sıradadır. Yani fiil ya birinci ya ikinci sıradadır; üçüncü sırada asla durmaz.",
        examples: [
          { de: "Arbeitest du heute?", tr: "Bugün çalışıyor musun?", note: "evet-hayır: fiil birinci" },
          { de: "Wann arbeitest du?", tr: "Ne zaman çalışıyorsun?", note: "W-soru: fiil ikinci" },
          { de: "Wo kaufst du ein?", tr: "Nerede alışveriş yapıyorsun?", note: "ön ek yine sonda" },
        ],
      },
    ],
    questions: [
      {
        text: "Welcher Satz ist richtig?",
        options: ["Heute ich gehe ins Kino.", "Heute gehe ich ins Kino.", "Ich heute gehe ins Kino."],
        answer: 1,
        explain: "Zaman sözcüğü başa gelince özne fiilin arkasına geçer; fiil ikinci sırada kalır.",
      },
      {
        text: "Wie fragt man nach „ja“ oder „nein“?",
        options: ["Du arbeitest heute?", "Arbeitest du heute?", "Wann arbeitest du?"],
        answer: 1,
        explain: "Evet-hayır sorusunda çekimli fiil birinci sıraya geçer.",
      },
      {
        text: "In Hamburg ___ meine Schwester.",
        options: ["wohnt", "wohnen", "wohne"],
        answer: 0,
        explain: "Özne „meine Schwester“ tekildir ve fiilden sonra gelir: wohnt.",
      },
      {
        kind: "gapfill",
        text: "Am Montag ___ ich im Supermarkt ein. (einkaufen)",
        options: [],
        answer: 0,
        accept: ["kaufe"],
        explain: "Çekimli kök ikinci sırada, ayrılan ön ek cümlenin sonunda kalır.",
      },
      {
        kind: "gapfill",
        text: "___ du morgen Zeit? (haben)",
        options: [],
        answer: 0,
        accept: ["Hast", "hast"],
        explain: "Evet-hayır sorusunda fiil başa geçer ve özneye göre çekilir.",
      },
      {
        kind: "gapfill",
        text: "Manchmal ___ wir am Sonntag ins Museum. (gehen)",
        options: [],
        answer: 0,
        accept: ["gehen"],
        explain: "„Manchmal“ birinci öge; fiil ikinci sırada ve özne arkasından gelir.",
      },
      {
        kind: "gapfill",
        text: "Wann ___ der Kurs? (beginnen)",
        options: [],
        answer: 0,
        accept: ["beginnt"],
        explain: "W-sorusunda soru sözcüğü birinci, fiil ikinci sıradadır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Am Wochenende", "besuchen", "wir", "meine Eltern"],
        explain: "Zaman başta, fiil ikinci, özne arkasında: Am Wochenende besuchen wir meine Eltern.",
      },
      {
        kind: "truefalse",
        text: "„Morgen ich fahre nach Berlin.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Fiil üçüncü sıraya düşmüş; doğrusu „Morgen fahre ich nach Berlin.“",
      },
      {
        kind: "truefalse",
        text: "„Das Frühstück macht mein Mann.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Nesne başta, fiil ikinci, özne arkada — kural korunuyor.",
      },
    ],
  },
];

import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 15.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 15 dernek kurma hattı: bir derneğin nasıl kurulduğunu anlatan rehber,
 * bir korosunun kuruluş toplantısı, mahalle grubuna ilk buluşma çağrısı. Dil
 * bilgisi edatlı sıfatlar (stolz auf, zufrieden mit, abhängig von) — parti
 * 8'deki edatlı fiillerin sıfat karşılığı: hâli sıfatın edatı belirler,
 * dass-cümlesinden önce edat da(r)- biçiminde kalır.
 */
export const deB1P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r15",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "In fünf Schritten zum eigenen Verein",
    genre: "guide",
    intro: "Bir rehber metin: tescilli bir dernek kurmak için neler yapılmalı, sıra nasıl, işler en çok nerede takılıyor.",
    gloss: [
      { de: "die Satzung", tr: "tüzük", en: "statutes" },
      { de: "der Zweck", tr: "amaç", en: "purpose" },
      { de: "festlegen", tr: "belirlemek", en: "to set" },
      { de: "das Protokoll", tr: "tutanak", en: "minutes" },
      { de: "einreichen", tr: "teslim etmek", en: "to submit" },
      { de: "die Verzögerung", tr: "gecikme", en: "delay" },
    ],
    minutes: 6,
    text:
      "In fünf Schritten zum eigenen Verein\n\n" +
      "Sie treffen sich jede Woche zum Singen, Gärtnern oder Schachspielen und möchten das auf eine feste " +
      "Grundlage stellen? Dann lohnt sich ein eingetragener Verein. Unser Überblick zeigt, was dafür " +
      "getan werden muss.\n\n" +
      "1. Mitglieder finden: Für die Gründung braucht man mindestens sieben Personen. Später dürfen es " +
      "weniger sein, aber nie unter drei.\n\n" +
      "2. Die Satzung schreiben: Darin muss festgelegt werden, wie der Verein heißt, welchen Zweck er hat " +
      "und wie der Vorstand gewählt wird. Muster gibt es im Internet, sie sollten aber immer an den " +
      "eigenen Verein angepasst werden.\n\n" +
      "3. Die Gründungsversammlung: Die Satzung wird von allen Anwesenden unterschrieben, und der Vorstand " +
      "wird gewählt. Darüber muss ein Protokoll geschrieben werden.\n\n" +
      "4. Die Anmeldung: Satzung und Protokoll müssen beim Amtsgericht eingereicht werden. Die " +
      "Unterschriften des Vorstands müssen vorher von einem Notar bestätigt werden; das kostet etwa " +
      "fünfzig Euro.\n\n" +
      "5. Das Konto: Erst nach der Eintragung kann ein Konto auf den Namen des Vereins eröffnet werden.\n\n" +
      "Unser Tipp: Planen Sie für den ganzen Weg zwei bis drei Monate ein. Die meisten Verzögerungen " +
      "entstehen nicht beim Amt, sondern weil irgendwo eine Unterschrift fehlt.",
    questions: [
      {
        text: "Wie viele Personen braucht man mindestens für die Gründung?",
        options: ["drei", "sieben", "zehn"],
        answer: 1,
        explain: "„Für die Gründung braucht man mindestens sieben Personen.“ Üç sayısı sonraki alt sınır.",
      },
      {
        text: "Was muss in der Satzung stehen?",
        options: [
          "Name, Zweck und die Wahl des Vorstands",
          "die Adressen aller Mitglieder",
          "die Kosten für den Notar",
        ],
        answer: 0,
        explain: "„… wie der Verein heißt, welchen Zweck er hat und wie der Vorstand gewählt wird.“",
      },
      {
        kind: "truefalse",
        text: "Ein Konto für den Verein kann erst nach der Eintragung eröffnet werden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Beşinci adım: „Erst nach der Eintragung kann ein Konto … eröffnet werden.“",
      },
      {
        kind: "gapfill",
        text: "Die Bestätigung beim Notar kostet etwa ___ Euro.",
        options: [],
        answer: 0,
        accept: ["fünfzig", "50"],
        explain: "„… von einem Notar bestätigt werden; das kostet etwa fünfzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Wo müssen Satzung und Protokoll eingereicht werden?",
        options: [],
        answer: 0,
        accept: ["beim Amtsgericht", "Amtsgericht", "am Amtsgericht"],
        explain: "Dördüncü adım: „Satzung und Protokoll müssen beim Amtsgericht eingereicht werden.“",
      },
      {
        text: "Woran liegen die meisten Verzögerungen?",
        options: ["an einem langsamen Amt", "an zu wenigen Mitgliedern", "an einer fehlenden Unterschrift"],
        answer: 2,
        explain: "„… nicht beim Amt, sondern weil irgendwo eine Unterschrift fehlt.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l15",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Gründungsversammlung: Chor am Kanal",
    genre: "meeting",
    intro: "Yeni bir koronun kuruluş toplantısı: ad nasıl seçiliyor, aidat ne kadar olacak, tutanağı kim yazacak.",
    gloss: [
      { de: "der Vorschlag", tr: "öneri", en: "suggestion" },
      { de: "abstimmen", tr: "oy vermek", en: "to vote" },
      { de: "die Enthaltung", tr: "çekimser oy", en: "abstention" },
      { de: "der Beitrag", tr: "aidat", en: "membership fee" },
      { de: "proben", tr: "prova yapmak", en: "to rehearse" },
      { de: "korrigieren", tr: "düzeltmek", en: "to correct" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Vogt", text: "Schön, dass alle da sind. Wir sind zwölf, also genug für die Gründung. Heute muss die Satzung unterschrieben und der Vorstand gewählt werden." },
      { speaker: "Frau Vogt", text: "Vorher noch der Name. Auf der Liste stehen drei Vorschläge: „Stimmwerk“, „Chor am Kanal“ und „Die Donnerstagssänger“." },
      { speaker: "Herr Weiler", text: "Ich bin für „Chor am Kanal“. Dann weiß jeder sofort, wo wir proben, und man kann es sich leicht merken." },
      { speaker: "Frau Sander", text: "Einverstanden. „Stimmwerk“ klingt nach einer Firma." },
      { speaker: "Frau Vogt", text: "Dann stimmen wir ab. Zehn dafür, zwei Enthaltungen. Damit heißen wir ab heute „Chor am Kanal“." },
      { speaker: "Herr Weiler", text: "Und der Beitrag? Ich würde sagen, zwei Euro im Monat reichen. Die Noten kopieren wir sowieso selbst." },
      { speaker: "Frau Sander", text: "Zwei Euro sind zu wenig. Der Raum im Gemeindehaus muss ab Januar bezahlt werden, und er kostet dreißig Euro im Monat." },
      { speaker: "Frau Vogt", text: "Dann schlage ich fünf Euro vor, für Schüler und Studierende die Hälfte. Wer ist dafür?" },
      { speaker: "Herr Weiler", text: "Das ist fair. Wer schreibt eigentlich das Protokoll? Es muss ja auch zum Notar gebracht werden." },
      { speaker: "Frau Sander", text: "Das mache ich. Ich schicke es bis Sonntag an alle, dann kann es noch korrigiert werden." },
    ],
    questions: [
      {
        text: "Was muss an diesem Abend erledigt werden?",
        options: [
          "die Satzung unterschreiben und den Vorstand wählen",
          "einen neuen Raum für die Proben suchen",
          "das erste Konzert planen",
        ],
        answer: 0,
        explain: "„Heute muss die Satzung unterschrieben und der Vorstand gewählt werden.“",
      },
      {
        text: "Warum gefällt Herrn Weiler der Name „Chor am Kanal“?",
        options: [
          "weil er lustig klingt",
          "weil man sofort weiß, wo der Chor probt",
          "weil er kürzer ist als die anderen",
        ],
        answer: 1,
        explain: "„Dann weiß jeder sofort, wo wir proben, und man kann es sich leicht merken.“",
      },
      {
        kind: "truefalse",
        text: "Bei der Abstimmung über den Namen hat niemand dagegen gestimmt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "On evet, iki çekimser oy var; hayır oyu yok.",
      },
      {
        kind: "gapfill",
        text: "Der Raum im Gemeindehaus kostet ___ Euro im Monat.",
        options: [],
        answer: 0,
        accept: ["dreißig", "30"],
        explain: "„… und er kostet dreißig Euro im Monat.“ İki euroluk aidat bu yüzden yetmiyor.",
      },
      {
        kind: "short_answer",
        text: "Wie viel sollen Studierende nach Frau Vogts Vorschlag zahlen?",
        options: [],
        answer: 0,
        accept: ["2,50 Euro", "zwei Euro fünfzig", "2,50", "die Hälfte", "zweieinhalb Euro", "2,50 €", "2.50 Euro", "zwei fünfzig", "die Hälfte von fünf Euro", "Hälfte"],
        explain: "Aidat beş euro, öğrenciler için yarısı: iki buçuk euro.",
      },
      {
        text: "Wer schreibt das Protokoll?",
        options: ["Frau Vogt", "Herr Weiler", "Frau Sander"],
        answer: 2,
        explain: "Frau Sander „Das mache ich“ diyor ve pazara kadar herkese gönderecek.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w15",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Einladung zum ersten Treffen",
    genre: "message",
    intro: "Mahallende küçük bir dernek kurmak istiyorsun: önce iki cümle kur, sonra mahalle grubuna ilk buluşma için bir çağrı yaz.",
    gloss: [
      { de: "der Spielplatz", tr: "oyun parkı", en: "playground" },
      { de: "gründen", tr: "kurmak", en: "to found" },
      { de: "das Mitglied", tr: "üye", en: "member" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "streichen", tr: "boyamak", en: "to paint" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Oyun parkı her yıl onarılmalı.",
        answer: "Der Spielplatz muss jedes Jahr repariert werden.",
        alternatives: ["Jedes Jahr muss der Spielplatz repariert werden."],
        hint: "Modal fiilli edilgen: modal ikinci sırada, en sonda Partizip II + „werden“.",
      },
      {
        kind: "build",
        tr: "Bu iş tek başına yapılamaz.",
        answer: "Diese Arbeit kann nicht allein gemacht werden.",
        alternatives: ["Allein kann diese Arbeit nicht gemacht werden."],
        hint: "„kann … gemacht werden“: çekimli olan modal fiil, „werden“ ise mastar olarak en sonda.",
      },
      {
        kind: "free",
        prompt:
          "Mahalle grubuna bir çağrı yaz: kim olduğunu ve neden bir dernek kurmak istediğini söyle, derneğin somut olarak ne yapacağını anlat, ilk buluşmanın yerini ve saatini yaz, katılmak isteyenlerden ne beklediğini söyle.",
        checklist: [
          "Kendini tanıt ve fikri bir cümlede söyle",
          "Derneğin somut görevlerini yaz",
          "Buluşmanın yerini ve saatini ver",
          "Katılanlardan ne beklediğini söyle",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich wohne in der … und möchte …", tr: "…'de oturuyorum ve … istiyorum", en: "I live in … and would like to …" },
          { de: "Die Idee ist, dass …", tr: "Fikir şu: …", en: "The idea is that …" },
          { de: "Dafür muss … gemacht werden.", tr: "Bunun için … yapılmalı.", en: "For this, … has to be done." },
          { de: "Das erste Treffen findet am … um … statt.", tr: "İlk buluşma … günü saat …'de.", en: "The first meeting will be on … at …" },
          { de: "Jeder ist willkommen, auch wenn …", tr: "… olsa bile herkes davetli.", en: "Everyone is welcome, even if …" },
        ],
        sample:
          "Liebe Nachbarinnen und Nachbarn, ich heiße Leyla Aydin, wohne in der Birkenstraße und möchte " +
          "mit euch einen kleinen Verein für unseren Spielplatz gründen. Die Idee ist, dass wir uns selbst " +
          "um den Platz kümmern, statt jedes Jahr auf die Stadt zu warten. Der Spielplatz muss jedes Jahr " +
          "repariert werden, der Sand muss im Frühling getauscht werden, und die Bänke sollten neu " +
          "gestrichen werden. Diese Arbeit kann nicht allein gemacht werden, aber mit fünfzehn Leuten ist " +
          "sie an zwei Samstagen erledigt. Als Verein können wir außerdem Spenden sammeln. Das erste Treffen " +
          "findet am Mittwoch, dem 8. Mai, um 19 Uhr im Café Linde statt. Dort sprechen wir über die " +
          "Regeln und über einen Namen. Jeder ist willkommen, auch wenn er nur ab und zu Zeit hat. " +
          "Viele Grüße, Leyla",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s15",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Hobby allein oder in der Gruppe?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: kendi deneyiminle bir tercih yap ve dezavantajını da söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bir hobiyi tek başına mı yapmayı tercih edersin, yoksa bir grupta ya da dernekte mi? Görüşünü söyle, kendi hobinden bir örnek ver, tercihinin bir dezavantajını söyle ve bir öneriyle bitir.",
      bulletsTr: [
        "Tercihini tek cümleyle söyle",
        "Kendi hobinden bir örnek ver",
        "Tercihinin bir dezavantajını kabul et",
        "Başkalarına bir öneride bulun",
      ],
      targets: [
        { de: "Mir persönlich macht … mehr Spaß, weil …", tr: "Bana kişisel olarak … daha çok keyif veriyor çünkü …" },
        { de: "In einer Gruppe muss vieles abgesprochen werden.", tr: "Bir grupta pek çok şeyin konuşulup kararlaştırılması gerekir." },
        { de: "Der Nachteil ist allerdings, dass …", tr: "Ama dezavantajı şu: …" },
        { de: "Wer unsicher ist, sollte zuerst …", tr: "Kararsız olan önce … yapmalı" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Mir persönlich macht ein Hobby in der Gruppe mehr Spaß, weil ich allein zu schnell aufgebe. " +
        "Ich habe zwei Jahre lang allein Gitarre gelernt, mit Videos im Internet. Nach jeder schwierigen " +
        "Stelle habe ich eine Pause gemacht, und aus der Pause wurden oft Wochen. Seit ich in einer kleinen " +
        "Band spiele, übe ich regelmäßig, denn am Dienstag warten vier Leute auf mich. Der Nachteil ist " +
        "allerdings, dass in einer Gruppe vieles abgesprochen werden muss: welche Lieder, welcher Raum, " +
        "welcher Termin. Manchmal reden wir länger, als wir spielen. Wer unsicher ist, sollte zuerst ein " +
        "paar Wochen allein ausprobieren, ob das Hobby überhaupt passt, und dann eine Gruppe suchen. " +
        "So weiß man, was man will, bevor man anderen Leuten etwas verspricht.",
      rubricHint:
        "Kişisel bir örnek ve dengeli bir sonuç beklenir; modal fiilli edilgen („muss abgesprochen werden“), „seit“ ve „bevor“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g15",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "stolz auf, zufrieden mit",
    genre: "grammar",
    intro: "Bazı sıfatlar yanında hep aynı edatla kullanılır; hâli sıfatın kendisi değil, o edat belirler. Dernek toplantılarında bu kalıplar sık geçer.",
    focus: "Edatlı sıfatlar: stolz auf, zufrieden mit, abhängig von, interessiert an, bekannt für — sabit edat, hâl ve da(r)- / wo(r)- biçimleri",
    gloss: [
      { de: "stolz", tr: "gururlu", en: "proud" },
      { de: "zufrieden", tr: "memnun", en: "satisfied" },
      { de: "abhängig", tr: "bağımlı", en: "dependent" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Edat sıfata aittir",
        tr: "Edatı sabit fiilleri (warten auf, denken an) biliyorsun. Bazı SIFATLAR da sabit bir edatla kalıplaşır ve hâli o edat belirler: „stolz auf“ ve „bekannt für“ Akkusativ, „zufrieden mit“ Dativ ister. Edat Türkçedeki hâl ekinden tahmin edilemez; sıfatla birlikte öğrenilir.",
        examples: [
          { de: "Wir sind stolz auf unseren neuen Chor.", tr: "Yeni koromuzla gurur duyuyoruz.", note: "stolz auf + Akkusativ" },
          { de: "Der Verein ist bekannt für sein Sommerfest.", tr: "Dernek yaz şenliğiyle tanınıyor.", note: "bekannt für + Akkusativ" },
          { de: "Die Mitglieder sind mit dem Vorstand zufrieden.", tr: "Üyeler yönetim kurulundan memnun.", note: "zufrieden mit + Dativ" },
        ],
      },
      {
        heading: "Dativ isteyenler ve bir tuzak",
        tr: "„abhängig von“ ve „interessiert an“ da Dativ ister. Dikkat: fiil „sich interessieren für“ Akkusativ alırken sıfat „interessiert an“ Dativ alır. Anlam aynı, edat ve hâl farklı; ikisini karıştırmak en sık yapılan hatadır.",
        examples: [
          { de: "Der Verein ist von Spenden abhängig.", tr: "Dernek bağışlara bağımlı.", note: "abhängig von + Dativ" },
          { de: "Viele Nachbarn sind an einem Gemeinschaftsgarten interessiert.", tr: "Birçok komşu ortak bir bahçeyle ilgileniyor.", note: "an einem: Dativ" },
          { de: "Sie interessiert sich für den Garten.", tr: "Bahçeyle ilgileniyor.", note: "fiil: für + Akkusativ" },
        ],
      },
      {
        heading: "Soru, gönderme ve dass-cümlesi",
        tr: "Eşya ve durumlarda soru wo(r)-, gönderme da(r)- ile kurulur: „Womit bist du zufrieden? — Damit.“ Arkadan bir dass-cümlesi ya da zu-mastarı geliyorsa edat „da(r)-“ biçiminde ana cümlede kalır ve ileriyi gösterir. Kişilerde ise edat + zamir kullanılır: „stolz auf sie“.",
        examples: [
          { de: "Womit seid ihr nicht zufrieden? — Mit dem Raum.", tr: "Neyden memnun değilsiniz? — Salondan.", note: "wo + mit" },
          { de: "Wir sind stolz darauf, dass der Chor schon vierzig Mitglieder hat.", tr: "Koronun şimdiden kırk üyesi olmasıyla gurur duyuyoruz.", note: "darauf, dass …" },
          { de: "Die Kinder sind stolz auf sie.", tr: "Çocuklar onunla gurur duyuyor.", note: "kişi → auf sie, darauf değil" },
        ],
      },
    ],
    questions: [
      {
        text: "Der Verein ist ___ sein Sommerfest bekannt.",
        options: ["für", "mit", "von"],
        answer: 0,
        explain: "„bekannt für“ sabit bir kalıptır ve Akkusativ ister: für sein Sommerfest.",
      },
      {
        text: "Wir sind sehr zufrieden ___ dem neuen Raum.",
        options: ["auf", "an", "mit"],
        answer: 2,
        explain: "„zufrieden mit“ + Dativ: mit dem neuen Raum.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Viele sind für dem Projekt interessiert.",
          "Viele sind an dem Projekt interessiert.",
          "Viele sind an das Projekt interessiert.",
        ],
        answer: 1,
        explain: "Sıfat „interessiert an“ + Dativ ister: an dem Projekt. „für“ yalnız fiil „sich interessieren“ ile gelir.",
      },
      {
        kind: "gapfill",
        text: "Unser Verein ist ___ Spenden abhängig.",
        options: [],
        answer: 0,
        accept: ["von"],
        explain: "„abhängig von“ sabit bir kalıptır: von Spenden abhängig.",
      },
      {
        kind: "gapfill",
        text: "Wir sind stolz auf ___ neuen Vorstand. (unser)",
        options: [],
        answer: 0,
        accept: ["unseren"],
        explain: "„stolz auf“ Akkusativ ister; eril isimde unser → unseren.",
      },
      {
        kind: "gapfill",
        text: "Viele Mitglieder sind an ___ Kurs interessiert. (der)",
        options: [],
        answer: 0,
        accept: ["dem"],
        explain: "„interessiert an“ Dativ ister; der Kurs → an dem Kurs.",
      },
      {
        kind: "gapfill",
        text: "___ bist du nicht zufrieden? — Mit dem Termin.",
        options: [],
        answer: 0,
        accept: ["Womit", "womit"],
        explain: "Cevap bir durum ve edat „mit“; soru wo + mit = womit.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir sind", "stolz darauf,", "dass der Chor", "so schnell", "gewachsen ist"],
        explain: "Edat darauf olarak ana cümlede kalır; dass-cümlesinde çekimli fiil (ist) en sona gider.",
      },
      {
        kind: "truefalse",
        text: "„Ich bin sehr interessiert für den Kurs.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Sıfat „für“ değil „an“ + Dativ ister: „interessiert am Kurs“.",
      },
      {
        kind: "truefalse",
        text: "„Wir sind stolz darauf, dass so viele Nachbarn helfen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Arkadan dass-cümlesi geldiği için edat darauf biçiminde ana cümlede duruyor; cümle doğru.",
      },
    ],
  },
];

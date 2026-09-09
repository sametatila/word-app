import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler parti 1'den ayrı: okur mektubu, podcast ve forum katkısı. Monolog
 * bu kez karşılaştırmalı bir değer sorusu; dil bilgisi ilgi cümlesi.
 */
export const deB1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r2",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Zweimal im Jahr dasselbe",
    genre: "opinion",
    intro: "Bir gazeteye gönderilmiş okur mektubunu okuyacaksın: yazar neye karşı çıkıyor, hangi gerekçeleri sıralıyor, ne öneriyor.",
    gloss: [
      { de: "die Umstellung", tr: "saat değişimi", en: "clock change" },
      { de: "der Frühdienst", tr: "sabah vardiyası", en: "early shift" },
      { de: "gereizt", tr: "huysuz", en: "irritable" },
      { de: "die Ersparnis", tr: "tasarruf", en: "saving" },
      { de: "die Abschaffung", tr: "kaldırma", en: "abolition" },
      { de: "sich einigen", tr: "anlaşmak", en: "to agree" },
      { de: "verschieben", tr: "kaydırmak", en: "to shift" },
    ],
    minutes: 7,
    text:
      "LESERBRIEF\n\n" +
      "Zweimal im Jahr dasselbe: Ende März verlieren wir eine Stunde, Ende Oktober bekommen wir sie zurück. " +
      "In Ihrer Zeitung stand letzte Woche, das sei „nur eine Kleinigkeit“. Für mich ist es das nicht.\n\n" +
      "Ich arbeite als Busfahrerin. Wenn die Uhren umgestellt werden, ändert sich mein ganzer Rhythmus. " +
      "In der ersten Woche danach fahre ich müder, und ich bin nicht die Einzige: Kollegen, die den Frühdienst " +
      "haben, erzählen dasselbe. Auch meine Tochter, die in die zweite Klasse geht, schläft schlechter und ist " +
      "am Nachmittag gereizt.\n\n" +
      "Man sagt uns immer, die Umstellung spare Energie. Diese Rechnung stammt aus einer Zeit, in der man abends " +
      "Licht brauchte und sonst kaum Strom verbrauchte. Heute laufen Kühlschränke, Rechner und Klimageräte rund " +
      "um die Uhr. Die Ersparnis, die man einmal versprochen hat, ist längst verschwunden.\n\n" +
      "Ich verstehe, dass eine Abschaffung nicht einfach ist. Die Länder, die zusammen Handel treiben, müssen " +
      "sich einigen, und das dauert. Aber genau deshalb sollte man endlich anfangen, statt jedes Jahr wieder " +
      "darüber zu diskutieren.\n\n" +
      "Bis dahin habe ich einen kleinen Rat: Verschieben Sie in der Woche vor der Umstellung Ihr Abendessen " +
      "jeden Tag um zehn Minuten. Es hilft mehr, als man denkt.\n\n" +
      "Ilona Feddersen, Neumünster",
    questions: [
      {
        text: "Was will die Autorin?",
        options: [
          "Die Zeitumstellung soll abgeschafft werden.",
          "Die Zeitung soll öfter über Busfahrer schreiben.",
          "Die Menschen sollen abends weniger Strom verbrauchen.",
        ],
        answer: 0,
        explain: "Mektup boyunca gerekçeler sıralanıyor ve „genau deshalb sollte man endlich anfangen“ deniyor.",
      },
      {
        text: "Warum ist das Energie-Argument für die Autorin veraltet?",
        options: [
          "Heute laufen viele Geräte den ganzen Tag.",
          "Die Menschen gehen heute später schlafen.",
          "Strom ist heute deutlich billiger geworden.",
        ],
        answer: 0,
        explain: "„Heute laufen Kühlschränke, Rechner und Klimageräte rund um die Uhr.“ Fiyattan hiç söz edilmiyor.",
      },
      {
        kind: "truefalse",
        text: "Auch das Kind der Autorin merkt die Umstellung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Auch meine Tochter … schläft schlechter und ist am Nachmittag gereizt.“",
      },
      {
        kind: "gapfill",
        text: "Die Autorin arbeitet als ___.",
        options: [],
        answer: 0,
        accept: ["Busfahrerin"],
        explain: "„Ich arbeite als Busfahrerin.“",
      },
      {
        kind: "short_answer",
        text: "Was rät sie für die Woche vor der Umstellung?",
        options: [],
        answer: 0,
        accept: ["das Abendessen verschieben", "das Essen verschieben", "später essen"],
        explain: "„Verschieben Sie … Ihr Abendessen jeden Tag um zehn Minuten.“",
      },
      {
        text: "Wie steht die Autorin zu dem Satz aus der Zeitung?",
        options: ["Sie widerspricht ihm deutlich.", "Sie stimmt ihm im Kern zu.", "Sie findet ihn zu streng."],
        answer: 0,
        explain: "Gazete „nur eine Kleinigkeit“ demiş; yazar hemen „Für mich ist es das nicht“ diye karşı çıkıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l2",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Eine Stunde ist eine Stunde",
    genre: "phone",
    intro: "Bir podcast bölümünde zaman takasına dayalı bir mahalle ağı anlatılıyor: nasıl işliyor, ne işe yarıyor, sorunu ne.",
    gloss: [
      { de: "der Tauschring", tr: "takas ağı", en: "exchange network" },
      { de: "der Wasserhahn", tr: "musluk", en: "tap" },
      { de: "die Gründerin", tr: "kurucu", en: "founder" },
      { de: "sich schämen", tr: "utanmak", en: "to feel ashamed" },
      { de: "die Fähigkeit", tr: "beceri", en: "skill" },
      { de: "gefragt", tr: "rağbet gören", en: "in demand" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Moderator", text: "Willkommen bei Viertelstunde, dem Podcast über kleine Ideen mit großer Wirkung. Heute geht es um den Tauschring Ostpark." },
      { speaker: "Moderator", text: "Die Idee ist einfach: Wer etwas kann, bietet es an. Wer etwas braucht, fragt. Bezahlt wird nicht mit Geld, sondern mit Zeit." },
      { speaker: "Ruth", text: "Eine Stunde ist eine Stunde. Ob ich einen Wasserhahn repariere oder jemandem beim Steuerformular helfe, spielt keine Rolle. Beides bringt eine Stunde auf mein Konto." },
      { speaker: "Moderator", text: "Ruth Barnickel gehört zu den Gründerinnen. Angefangen haben sie im Jahr zweitausendneunzehn zu siebt, heute sind es hundertvierzig Mitglieder." },
      { speaker: "Ruth", text: "Am Anfang dachten viele, das sei Nachbarschaftshilfe mit extra Bürokratie. Aber das Konto macht etwas Wichtiges: Man muss sich nicht bedanken und schämen. Man hat ja bezahlt." },
      { speaker: "Moderator", text: "Probleme gibt es trotzdem. Manche Fähigkeiten sind viel gefragter als andere." },
      { speaker: "Ruth", text: "Wer Fahrräder repariert, hat ein volles Konto und findet nichts, was er selbst braucht. Deshalb sammeln wir jetzt auch Stunden für den Verein, zum Beispiel für das Sommerfest." },
      { speaker: "Moderator", text: "Wer mitmachen will, kommt am ersten Dienstag im Monat um neunzehn Uhr ins Bürgerhaus. Nächste Woche geht es um ein Café, das niemandem gehört." },
    ],
    questions: [
      {
        text: "Was ist ein Tauschring?",
        options: [
          "Man tauscht Leistungen gegen Zeit.",
          "Man verkauft alte Sachen im Viertel.",
          "Man leiht sich Werkzeug gegen Geld.",
        ],
        answer: 0,
        explain: "„Bezahlt wird nicht mit Geld, sondern mit Zeit.“",
      },
      {
        text: "Wie viel ist eine Stunde wert?",
        options: [
          "immer gleich viel, egal welche Arbeit",
          "mehr, wenn die Arbeit schwierig ist",
          "weniger, wenn man neu dabei ist",
        ],
        answer: 0,
        explain: "„Ob ich einen Wasserhahn repariere oder jemandem beim Steuerformular helfe, spielt keine Rolle.“",
      },
      {
        kind: "truefalse",
        text: "Der Tauschring hat heute sieben Mitglieder.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yedi kişi başlangıçtaki sayı; „heute sind es hundertvierzig Mitglieder“.",
      },
      {
        kind: "short_answer",
        text: "Wann trifft sich die Gruppe?",
        options: [],
        answer: 0,
        accept: ["am ersten Dienstag im Monat", "erster Dienstag im Monat", "jeden ersten Dienstag"],
        explain: "„… kommt am ersten Dienstag im Monat um neunzehn Uhr ins Bürgerhaus.“",
      },
      {
        kind: "dictation",
        text: "Ruth'un takasın temel kuralını söylediği cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Eine Stunde ist eine Stunde.", "Eine Stunde ist eine Stunde"],
        explain: "„Eine Stunde ist eine Stunde.“ — bütün sistemin dayandığı cümle.",
      },
      {
        text: "Welches Problem nennt Ruth?",
        options: [
          "Manche Leistungen sind viel gefragter.",
          "Für das Sommerfest fehlen Stunden auf den Konten.",
          "Die Gründerinnen haben zu wenig Zeit.",
        ],
        answer: 0,
        explain: "„Wer Fahrräder repariert, hat ein volles Konto und findet nichts, was er selbst braucht.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w2",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Trinkbrunnen für die Stadt?",
    genre: "forum",
    intro: "Bir şehir forumunda çeşme tartışması var; önce iki cümle kur, sonra kendi görüşünü gerekçeleriyle yaz.",
    gloss: [
      { de: "der Trinkbrunnen", tr: "çeşme", en: "drinking fountain" },
      { de: "die Verschwendung", tr: "israf", en: "waste" },
      { de: "die Wartung", tr: "bakım", en: "maintenance" },
      { de: "die Hitze", tr: "sıcak", en: "heat" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Sıcakta dışarıda çalışan insanların suya ihtiyacı var.",
        answer: "Menschen, die bei Hitze draußen arbeiten, brauchen Wasser.",
        alternatives: ["Wasser brauchen Menschen, die bei Hitze draußen arbeiten."],
        hint: "İlgi cümlesi ismin hemen arkasına girer, iki virgülle ayrılır ve içindeki fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Çocukların oynadığı park çok sıcak oluyor.",
        answer: "Der Park, in dem die Kinder spielen, wird sehr heiß.",
        alternatives: ["Sehr heiß wird der Park, in dem die Kinder spielen."],
        hint: "Edatlı ilgi cümlesinde edat başa gelir ve artikel Dativ olur: in dem.",
      },
      {
        kind: "free",
        prompt:
          "Forumda şehrin çeşme yaptırıp yaptırmaması tartışılıyor. Katkını yaz: net bir tutum al, iki gerekçe ver, karşı tarafın haklı bulduğun bir argümanını kabul et ve somut bir öneriyle bitir.",
        stimulus:
          "Unsere Stadt will an zehn Plätzen Trinkbrunnen bauen. Kosten: rund achtzigtausend Euro plus Wartung. " +
          "Die einen sagen, das ist längst überfällig, die anderen halten es für Verschwendung. Was meint ihr?",
        checklist: [
          "Tutumunu ilk cümlede net söyle",
          "İki gerekçe ver ve birini örnekle",
          "Karşı argümanın haklı yanını kabul et",
          "Somut, uygulanabilir bir öneriyle bitir",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich bin dafür, allerdings …", tr: "Yanayım, ancak …" },
          { de: "Erstens … Zweitens …", tr: "Birincisi … İkincisi …" },
          { de: "Das Gegenargument verstehe ich.", tr: "Karşı argümanı anlıyorum." },
          { de: "Deshalb mein Vorschlag: …", tr: "Bu yüzden önerim: …" },
          { de: "Man sollte zuerst …", tr: "Önce … yapmalı" },
        ],
        sample:
          "Ich bin dafür, allerdings nicht an zehn Plätzen gleichzeitig. Erstens gibt es Menschen, die den ganzen " +
          "Tag draußen arbeiten oder unterwegs sind, und für sie ist kostenloses Wasser keine Kleinigkeit, sondern " +
          "Gesundheitsschutz. Zweitens verschwindet mit jedem Brunnen ein Teil der Plastikflaschen, die abends in " +
          "den Parks liegen. Das Gegenargument mit den Kosten verstehe ich trotzdem. Achtzigtausend Euro sind viel " +
          "Geld, und die Wartung im Winter kostet jedes Jahr weiter. Deshalb mein Vorschlag: Die Stadt baut in " +
          "diesem Jahr drei Brunnen dort, wo im Sommer die meisten Menschen sind, misst ein Jahr lang die Nutzung " +
          "und entscheidet dann über den Rest.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s2",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Geschenke oder Zeit?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: iki seçenek arasında tercih yap ve gerekçelendir.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bazıları özel günlerde hediye almayı önemli bulur, bazıları birlikte vakit geçirmenin daha değerli olduğunu söyler. Sen ne düşünüyorsun? Tercihini söyle ve en az iki gerekçeyle destekle.",
      bulletsTr: [
        "Tercihini tek cümleyle söyle",
        "En az iki gerekçe ver (hatıra, emek, mesafe, para…)",
        "Kendi görüşüne bir karşı örnek bul",
        "Kısa bir sonuçla bitir",
      ],
      targets: [
        { de: "Wenn ich wählen müsste, …", tr: "Seçmek zorunda olsam …" },
        { de: "Der erste Grund ist …", tr: "İlk gerekçe …" },
        { de: "Natürlich gibt es Gegenbeispiele.", tr: "Elbette karşı örnekler var." },
        { de: "Deshalb würde ich sagen: …", tr: "Bu yüzden derdim ki: …" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "Ich finde, beides gehört zusammen, aber wenn ich wählen müsste, wäre mir gemeinsame Zeit wichtiger. " +
        "Der erste Grund ist ganz praktisch: Ein Geschenk sucht man in zwanzig Minuten aus, ein gemeinsamer " +
        "Nachmittag kostet einen halben Tag. Genau deshalb sagt er mehr. Zweitens erinnere ich mich an fast " +
        "keine Geschenke aus meiner Kindheit, aber sehr genau an einen Ausflug mit meinem Onkel. " +
        "Natürlich gibt es Gegenbeispiele. Wer weit weg wohnt, kann keine Zeit schenken, und ein Paket ist " +
        "dann ein Zeichen, dass man nicht vergessen wurde. Deshalb würde ich sagen: Zeit, wenn sie möglich " +
        "ist, und sonst ein Geschenk, das den anderen wirklich trifft.",
      rubricHint:
        "Tercih tek cümleyle net olmalı, en az iki gerekçe ve bir karşı örnek bulunmalı; „wenn“ ve „dass“ yan cümlelerinde fiil sonda olmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g2",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Die Wohnung, die ich suche",
    genre: "grammar",
    intro: "Bir ismi uzun uzun tarif etmenin Almanca yolu: ismin arkasına der, die ya da das ile başlayan bir yan cümle eklersin.",
    focus: "Relativsatz: der / die / das ile ilgi cümlesi",
    gloss: [
      { de: "der Kollege", tr: "iş arkadaşı", en: "colleague" },
      { de: "vertrauen", tr: "güvenmek", en: "to trust" },
      { de: "gehören", tr: "ait olmak", en: "to belong" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçede önde, Almancada arkada",
        tr: "Türkçede tarif ismin ÖNÜNE gelir: „aradığım daire“. Almancada ise ismin ARKASINA tam bir yan cümle eklenir ve bu cümle der, die ya da das ile başlar. Yan cümle olduğu için çekimli fiil sona gider.",
        examples: [
          { de: "Die Wohnung, die ich suche, hat einen Balkon.", tr: "Aradığım dairenin balkonu var.", note: "tarif isimden sonra" },
          { de: "Das Fahrrad, das mir gehört, steht im Keller.", tr: "Bana ait olan bisiklet bodrumda." },
          { de: "Der Kollege, der neben mir sitzt, kommt aus Kiel.", tr: "Yanımda oturan iş arkadaşı Kiel'den." },
        ],
      },
      {
        heading: "Cins isimden, hâl yan cümleden",
        tr: "İlgi zamiri cinsini ve tekil-çoğulluğunu ANLATTIĞI isimden alır, ama hâlini yan cümledeki görevinden alır. Özneyse der, nesneyse den, yönelme hâliyse dem olur.",
        examples: [
          { de: "der Mann, der wartet", tr: "bekleyen adam", note: "özne → der" },
          { de: "der Mann, den ich kenne", tr: "tanıdığım adam", note: "nesne → den" },
          { de: "die Ärztin, der ich vertraue", tr: "güvendiğim doktor", note: "vertrauen Dativ ister → der" },
        ],
      },
      {
        heading: "Edat varsa başa geçer",
        tr: "Yan cümlede bir edat gerekiyorsa, o edat ilgi zamirinin ÖNÜNE gelir ve hâli edat belirler. Türkçedeki „içinde yaşadığım şehir“ burada „die Stadt, in der ich lebe“ olur.",
        examples: [
          { de: "die Stadt, in der ich lebe", tr: "yaşadığım şehir", note: "in + Dativ → in der" },
          { de: "der Freund, mit dem ich fahre", tr: "birlikte gittiğim arkadaş" },
          { de: "ein Buch, das ich sehr empfehlen kann", tr: "çok tavsiye edebileceğim bir kitap" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist der Kollege, ___ mir geholfen hat.",
        options: ["der", "den", "dem"],
        answer: 0,
        explain: "Yan cümlede „helfen“in öznesi o kişi olduğu için eril yalın hâl gelir: der.",
      },
      {
        text: "Das ist der Film, ___ ich sehen möchte.",
        options: ["den", "der", "dem"],
        answer: 0,
        explain: "Film burada „sehen“in nesnesidir; eril nesne den olur.",
      },
      {
        text: "Die Frau, ___ ich das Buch gegeben habe, ist Lehrerin.",
        options: ["der", "die", "den"],
        answer: 0,
        explain: "„geben“ kime sorusunu Dativ ile sorar; dişil Dativ der'dir.",
      },
      {
        kind: "gapfill",
        text: "Das Haus, ___ wir gekauft haben, ist alt.",
        options: [],
        answer: 0,
        accept: ["das"],
        explain: "„das Haus“ nötr ve yan cümlede nesne; nötrde yalın ile nesne biçimi aynıdır: das.",
      },
      {
        kind: "gapfill",
        text: "Die Stadt, in ___ ich wohne, ist klein.",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "„in“ yer bildirdiği için Dativ ister; dişil Dativ der'dir.",
      },
      {
        kind: "gapfill",
        text: "Kennst du die Leute, ___ dort stehen?",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "Çoğul ve yan cümlede özne: die.",
      },
      {
        kind: "gapfill",
        text: "Der Freund, mit ___ ich fahre, kommt aus Bremen.",
        options: [],
        answer: 0,
        accept: ["dem"],
        explain: "„mit“ her zaman Dativ ister; eril Dativ dem'dir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das", "ist", "der", "Mann", "der", "wartet"],
        explain: "İlgi cümlesi ismin arkasına gelir ve fiili sonda kalır: Das ist der Mann, der wartet.",
      },
      {
        kind: "truefalse",
        text: "„Das ist der Mann, der ich gesehen habe.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Adam burada nesne; doğrusu „der Mann, den ich gesehen habe“.",
      },
      {
        kind: "truefalse",
        text: "„Die Kinder, die dort spielen, sind meine Nachbarn.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Çoğul ve yan cümlede özne olduğu için die doğru; fiil de sonda.",
      },
    ],
  },
];

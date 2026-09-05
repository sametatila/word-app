import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 7 — "Hazırlıksız konuşma, sunuculuk, hazırcevaplık, anlatı".
 *
 * Dört ders: Aus dem Stegreif · Durch den Abend führen · Die schlagfertige
 * Antwort · Die Kunst des Erzählens.
 *
 *   Kelime: improvisieren, einfallen, die Denkpause, gliedern, routiniert,
 *           das Manuskript, die Rhetorik, das Streben · begrüßen, der Auftakt,
 *           die Überleitung, ankündigen, der Programmpunkt, das Ritual, die
 *           Übertragung, flüchtig · die Schlagfertigkeit, kontern, gelassen,
 *           die Spitze, parieren, leugnen, die Komödie, der Hang · die Pointe,
 *           der Spannungsbogen, die Wendung, schildern, lebendig, die Tragödie,
 *           das Drama, ergreifen
 *
 * Dört dersin ortak sorusu: METİN YOKKEN YAPI NEREDEN GELİR? Hazırlıksız
 * konuşan, sunuculuk yapan, laf çevirmek zorunda kalan ve hikâye anlatan —
 * dördü de önceden yazılmış cümleye güvenemez. C1'de ölçülen, o anda bir
 * iskelet kurabilmek: üç bölüm, bir geçiş, bir dönüş noktası.
 *
 * Bu yüzden egzersizler doğaçlamayı yetenek değil TEKNİK olarak ele alıyor.
 * Metinler tek tek kalıpları değil, kalıpların ne zaman devreye girdiğini
 * ölçüyor.
 */
export const c1U07: SkillExercise[] = [
  {
    id: "c1-u07-r1",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "Spontan ist auch nur vorbereitet",
    genre: "Deneme",
    intro: "Doğaçlama üstüne bir yazı. Hazırlıksız konuşan neye dayanıyor?",
    gloss: [
      { de: "improvisieren", tr: "doğaçlama yapmak", en: "to improvise" },
      { de: "die Denkpause", tr: "düşünme molası", en: "pause for thought" },
      { de: "gliedern", tr: "bölümlemek", en: "to structure" },
      { de: "routiniert", tr: "alışkanlıkla, deneyimli", en: "practised" },
      { de: "das Manuskript", tr: "yazılı metin", en: "manuscript" },
      { de: "die Rhetorik", tr: "retorik", en: "rhetoric" },
      { de: "einfallen", tr: "aklına gelmek", en: "to occur to someone" },
    ],
    minutes: 7,
    text:
      "SPONTAN IST AUCH NUR VORBEREITET\n\n" +
      "Wer wirkt, als spräche er frei, hat meist nicht weniger vorbereitet als andere — nur etwas anderes. Nicht Sätze, sondern Fächer.\n\n" +
      "Ein Redner, der aus dem Stegreif antworten muss, greift auf drei bis vier Ordnungen zurück, die er beliebig füllen kann: Vergangenheit — Gegenwart — Zukunft. Ursache — Wirkung — Vorschlag. Was wir wissen — was wir vermuten — was offen ist. Wer diese Muster im Kopf hat, muss nicht wissen, WAS er sagt, sondern nur, WIE er es gliedert.\n\n" +
      "Der zweite Trick ist die Denkpause. Anfänger füllen sie mit „ähm“, weil Stille ihnen länger vorkommt, als sie ist. Zwei Sekunden Schweigen wirken auf den Sprecher wie zehn und auf das Publikum wie nichts. Routinierte Sprecher nutzen die Pause sogar: Sie markiert, dass jetzt etwas Überlegtes kommt.\n\n" +
      "Ein Manuskript hilft übrigens weniger, als man denkt. Wer abliest, verliert den Blickkontakt genau dann, wenn er ihn braucht — bei der Pointe.\n\n" +
      "Die alte Rhetorik kannte das längst. Sie hat Improvisation nie als Gegenteil von Vorbereitung verstanden, sondern als deren höchste Stufe: Man bereitet keine Rede vor, sondern die Fähigkeit, jede Rede zu halten.",
    questions: [
      {
        text: "Was bereitet ein guter Stegreifredner laut Text vor?",
        options: [
          "Ganze Sätze",
          "Ordnungsmuster, die er füllen kann",
          "Ein detailliertes Manuskript",
        ],
        answer: 1,
        explain: "„Nicht Sätze, sondern Fächer“ — üç bölümlü iskeletler.",
      },
      {
        kind: "gapfill",
        text: "Zwei Sekunden Schweigen wirken auf den Sprecher wie zehn und auf das ___ wie nichts.",
        options: [],
        answer: 0,
        accept: ["Publikum"],
        explain: "Sessizliğin algısı iki tarafta farklı; bunu bilmek duraklamayı kullanılabilir kılıyor.",
      },
      {
        text: "Warum hilft ein Manuskript laut Text weniger als gedacht?",
        options: [
          "Weil es zu lang ist",
          "Weil man den Blickkontakt bei der Pointe verliert",
          "Weil man es nicht auswendig lernt",
        ],
        answer: 1,
        explain: "„verliert den Blickkontakt genau dann, wenn er ihn braucht — bei der Pointe“.",
      },
      {
        kind: "short_answer",
        text: "Wie verstand die alte Rhetorik das Verhältnis von Improvisation und Vorbereitung?",
        options: [],
        answer: 0,
        accept: [
          "Improvisation als höchste Stufe der Vorbereitung",
          "nicht als Gegenteil, sondern als höchste Stufe",
          "man bereitet die Fähigkeit vor, nicht die Rede",
        ],
        explain: "„Man bereitet keine Rede vor, sondern die Fähigkeit, jede Rede zu halten.“",
      },
      {
        kind: "short_answer",
        text: "Nenne eines der drei Ordnungsmuster aus dem Text.",
        options: [],
        answer: 0,
        accept: [
          "Vergangenheit — Gegenwart — Zukunft",
          "Ursache — Wirkung — Vorschlag",
          "Was wir wissen — was wir vermuten — was offen ist",
        ],
        explain: "Üçü de üç bölümlü; doğaçlamanın iskeleti bunlar.",
      },
    ],
  },
  {
    id: "c1-u07-r2",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "Wie eine Geschichte trägt",
    genre: "Rehber yazısı",
    intro: "Anlatı tekniği üstüne bir yazı. Gerilim nereden geliyor?",
    gloss: [
      { de: "der Spannungsbogen", tr: "gerilim yayı", en: "narrative arc" },
      { de: "die Wendung", tr: "dönüş noktası", en: "turn" },
      { de: "die Pointe", tr: "can alıcı nokta", en: "punchline" },
      { de: "schildern", tr: "tasvir etmek", en: "to depict" },
      { de: "lebendig", tr: "canlı", en: "vivid" },
      { de: "ergreifen", tr: "derinden etkilemek", en: "to move deeply" },
      { de: "die Tragödie", tr: "trajedi", en: "tragedy" },
    ],
    minutes: 7,
    text:
      "DREI TEILE, EINE WENDUNG\n\n" +
      "Jede Geschichte, die trägt, hat dieselbe Statik: eine Lage, eine Wendung, eine Folge. Fehlt die Wendung, entsteht ein Bericht; fehlt die Folge, entsteht eine Anekdote ohne Grund.\n\n" +
      "„Es begann damit, dass unsere größte Kundin absagte.“ Das ist die Lage. Sie muss knapp bleiben — Zuhörer verzeihen fast alles, nur nicht eine lange Vorgeschichte.\n\n" +
      "Die Wendung ist der Satz, ab dem etwas anders läuft als erwartet. Sie darf nicht angekündigt werden. „Und dann kam etwas Überraschendes“ nimmt der Überraschung genau das, was sie ausmacht.\n\n" +
      "Die Folge beantwortet die stumme Frage des Zuhörers: Warum erzählst du mir das? Wer sie ausspart, hinterlässt Ratlosigkeit, auch wenn die Geschichte gut war.\n\n" +
      "Ein häufiger Fehler ist das Schildern. Ein lebendiges Detail — die kalte Kaffeetasse, das leere Büro — ergreift mehr als fünf. Wer alles beschreibt, beschreibt nichts.\n\n" +
      "Und die Pointe? Sie steht am Ende, nicht in der Mitte, und der Erzähler lacht nicht vorher. Das ist der Unterschied zwischen einer Komödie und einer Tragödie im Vortragssaal: nicht das Thema, sondern das Timing.",
    questions: [
      {
        text: "Was entsteht laut Text, wenn die Wendung fehlt?",
        options: ["Eine Anekdote", "Ein Bericht", "Eine Tragödie"],
        answer: 1,
        explain: "„Fehlt die Wendung, entsteht ein Bericht.“",
      },
      {
        kind: "gapfill",
        text: "Es begann damit, ___ unsere größte Kundin absagte.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Anlatının standart açılışı: dass yan cümlesi durumu tek cümlede kuruyor.",
      },
      {
        text: "Warum soll die Wendung nicht angekündigt werden?",
        options: [
          "Weil das die Geschichte verlängert",
          "Weil die Ankündigung der Überraschung ihre Wirkung nimmt",
          "Weil Zuhörer es nicht mögen",
        ],
        answer: 1,
        explain: "„nimmt der Überraschung genau das, was sie ausmacht“.",
      },
      {
        kind: "short_answer",
        text: "Welche stumme Frage beantwortet die Folge?",
        options: [],
        answer: 0,
        accept: [
          "Warum erzählst du mir das?",
          "warum erzählst du mir das",
          "wozu die Geschichte",
        ],
        explain: "Bu cevaplanmazsa hikâye iyi olsa bile şaşkınlık bırakıyor.",
      },
      {
        text: "Der Text empfiehlt, möglichst viele Details zu schildern.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wer alles beschreibt, beschreibt nichts.“ Tek canlı ayrıntı beşten etkili.",
      },
    ],
  },
  {
    id: "c1-u07-l1",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "Zwei Minuten, kein Manuskript",
    genre: "Etkinlik",
    intro: "Sunucu bir aksilikle karşılaşıyor. Boşluğu nasıl dolduruyor?",
    gloss: [
      { de: "der Auftakt", tr: "açılış", en: "opening" },
      { de: "die Überleitung", tr: "geçiş", en: "transition" },
      { de: "der Programmpunkt", tr: "program maddesi", en: "item on the programme" },
      { de: "ankündigen", tr: "duyurmak", en: "to announce" },
      { de: "improvisieren", tr: "doğaçlama yapmak", en: "to improvise" },
      { de: "die Denkpause", tr: "düşünme molası", en: "pause for thought" },
      { de: "flüchtig", tr: "kısa, üstünkörü", en: "fleeting" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Moderatorin", text: "… und damit kommen wir zum nächsten Programmpunkt. Frau Bergmann?" },
      { speaker: "Technik", text: "Der Laptop startet neu. Zwei Minuten." },
      { speaker: "Moderatorin", text: "Zwei Minuten. Gut." },
      { speaker: "Moderatorin", text: "Dann nutze ich die Zeit für etwas, das ich sonst am Ende sage. Sie sitzen heute in einem Saal, den es vor drei Jahren noch nicht gab." },
      { speaker: "Moderatorin", text: "Damals stand hier eine Lagerhalle. Die Stadt wollte abreißen, ein Verein wollte kaufen, und keiner von beiden hatte Geld." },
      { speaker: "Moderatorin", text: "Was dann passiert ist, erzählt Ihnen Frau Bergmann gleich besser als ich — es ist nämlich genau ihr Thema." },
      { speaker: "Technik", text: "Läuft wieder." },
      { speaker: "Moderatorin", text: "Perfekt. Frau Bergmann, Sie haben das Wort — und die Überleitung habe ich Ihnen schon gebaut." },
      { speaker: "Frau Bergmann", text: "Die nehme ich gern. Und die Lagerhalle war übrigens meine Idee." },
      { speaker: "Moderatorin", text: "Sehen Sie, das nenne ich einen Auftakt." },
    ],
    questions: [
      {
        text: "Wie füllt die Moderatorin die zwei Minuten?",
        options: [
          "Mit einer Entschuldigung für die Technik",
          "Mit einer Geschichte, die zum nächsten Beitrag führt",
          "Mit einer Pause",
        ],
        answer: 1,
        explain: "Hikâye boşluğu doldurmakla kalmıyor, geçişi de kuruyor.",
      },
      {
        kind: "gapfill",
        text: "Und die ___ habe ich Ihnen schon gebaut.",
        options: [],
        answer: 0,
        accept: ["Überleitung"],
        explain: "Doğaçlama, boşluğu bir sonraki konuşmacının işine yarayacak biçimde doldurmak.",
      },
      {
        text: "Warum funktioniert ihre Improvisation besonders gut?",
        options: [
          "Weil sie kurz war",
          "Weil die Geschichte genau das Thema der nächsten Rednerin ist",
          "Weil die Technik schnell wieder lief",
        ],
        answer: 1,
        explain: "„es ist nämlich genau ihr Thema“ — ve Frau Bergmann bunu devralıyor.",
      },
      {
        kind: "dictation",
        text: "Sunucunun hikâyeye başlarken kurduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Sie sitzen heute in einem Saal, den es vor drei Jahren noch nicht gab.",
          "Sie sitzen heute in einem Saal, den es vor drei Jahren noch nicht gab",
        ],
        explain: "İlgi cümlesi durumu tek hamlede kuruyor; uzun bir önhikâyeye gerek kalmıyor.",
      },
    ],
  },
  {
    id: "c1-u07-l2",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "Schlagfertig, aber nicht scharf",
    genre: "Diyalog",
    intro: "İğneleyici bir söz geliyor. Cevap nasıl veriliyor?",
    gloss: [
      { de: "die Schlagfertigkeit", tr: "hazırcevaplık", en: "quick wit" },
      { de: "kontern", tr: "karşılık vermek", en: "to counter" },
      { de: "die Spitze", tr: "iğneleme", en: "barb" },
      { de: "parieren", tr: "savuşturmak", en: "to parry" },
      { de: "gelassen", tr: "sakin", en: "unruffled" },
      { de: "der Hang", tr: "eğilim, düşkünlük", en: "tendency" },
      { de: "leugnen", tr: "inkâr etmek", en: "to deny" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kollege", text: "Na, wieder eine Folie mehr als beim letzten Mal? Sie haben ja einen Hang zur Gründlichkeit." },
      { speaker: "Frau Alp", text: "Gut, dass Sie das ansprechen. Es sind zwei weniger — ich habe Ihre Kritik von damals ernst genommen." },
      { speaker: "Kollege", text: "Das habe ich nicht gesagt." },
      { speaker: "Frau Alp", text: "Sie haben es angedeutet. Ich leugne nicht, dass es damals zu viele waren." },
      { speaker: "Kollege", text: "Hm. Trotzdem: vierzig Minuten für ein Quartalsergebnis?" },
      { speaker: "Frau Alp", text: "Dreißig. Die letzten zehn sind für Ihre Fragen — die kommen ja erfahrungsgemäß." },
      { speaker: "Kollege", text: "Touché." },
      { speaker: "Frau Alp", text: "Das sehe ich sportlich. Wenn Sie mir vorher sagen, was Sie interessiert, spare ich uns beiden zehn Minuten." },
      { speaker: "Kollege", text: "Die Margen im Süden." },
      { speaker: "Frau Alp", text: "Dann fange ich damit an. Sehen Sie, das war jetzt produktiv." },
    ],
    questions: [
      {
        text: "Wie pariert Frau Alp die erste Spitze?",
        options: [
          "Sie ignoriert sie.",
          "Sie greift sie auf und dreht sie in ein Kompliment an den Kollegen.",
          "Sie kontert mit einer eigenen Spitze.",
        ],
        answer: 1,
        explain: "„ich habe Ihre Kritik von damals ernst genommen“ — iğnelemeyi kabule çeviriyor.",
      },
      {
        kind: "gapfill",
        text: "Gut, dass Sie das ___.",
        options: [],
        answer: 0,
        accept: ["ansprechen"],
        explain: "Hazırcevaplığın en güvenli kalıbı: saldırıyı davete çeviriyor.",
      },
      {
        text: "Womit endet der Wortwechsel?",
        options: [
          "Mit einem Streit",
          "Mit einer konkreten Absprache",
          "Ohne Ergebnis",
        ],
        answer: 1,
        explain: "„Die Margen im Süden.“ — „Dann fange ich damit an.“ Atışma bilgiye dönüşüyor.",
      },
      {
        kind: "short_answer",
        text: "Wie nennt Frau Alp ihre Haltung gegenüber der Stichelei?",
        options: [],
        answer: 0,
        accept: [
          "Das sehe ich sportlich.",
          "sie sieht es sportlich",
          "sportlich",
        ],
        explain: "Kalıp, alınmadığını göstermenin ve konuyu kapatmanın kısa yolu.",
      },
    ],
  },
  {
    id: "c1-u07-w1",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "Anlatı iskeleti ve geçiş",
    genre: "Dil bilgisi",
    intro: "Lage, Wendung, Folge — üç hamle; ve iki cümleyi bağlayan geçiş.",
    gloss: [
      { de: "die Wendung", tr: "dönüş noktası", en: "turn" },
      { de: "die Überleitung", tr: "geçiş", en: "transition" },
      { de: "die Pointe", tr: "can alıcı nokta", en: "punchline" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "En büyük müşterimizin iptal etmesiyle başladı.",
        answer: "Es begann damit, dass unsere größte Kundin absagte",
        hint: "damit + dass: durumu tek cümlede kuran anlatı açılışı.",
      },
      {
        kind: "build",
        tr: "Kısaca söylemek gerekirse: rakam tutmuyor.",
        answer: "Um es auf den Punkt zu bringen: Die Zahl stimmt nicht",
        hint: "um … zu kalıbı doğaçlamada toparlayıcı geçiş.",
      },
      {
        kind: "build",
        tr: "Sıradaki program maddesine geçelim.",
        answer: "Kommen wir zum nächsten Programmpunkt",
        hint: "Sunuculukta geçişin standart cümlesi; fiil başta, dilek kipi değil.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: anlatıcı dönüş noktasını önceden duyurmuş.",
        source: "Und dann kam etwas völlig Überraschendes: Der Lieferant meldete sich selbst.",
        answer: "Der Lieferant meldete sich selbst.",
        alternatives: [
          "Der Lieferant meldete sich selbst",
          "Zwei Tage später meldete sich der Lieferant selbst.",
        ],
        why: "Sürprizi duyurmak sürprizi bitirir. Dönüş noktası kendini göstermeli; anlatıcı onu adlandırdığı anda dinleyici beklemeye başlar ve etki kaybolur.",
      },
    ],
  },
  {
    id: "c1-u07-w2",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "Zwei Minuten füllen",
    genre: "Konuşma metni",
    intro: "Teknik arıza: elinde metin yok. Boşluğu bir hikâyeyle doldur ve geçişi kur.",
    gloss: [
      { de: "die Überleitung", tr: "geçiş", en: "transition" },
      { de: "der Spannungsbogen", tr: "gerilim yayı", en: "narrative arc" },
      { de: "die Wendung", tr: "dönüş noktası", en: "turn" },
      { de: "improvisieren", tr: "doğaçlama yapmak", en: "to improvise" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Sunuculuk yapıyorsun ve teknik iki dakika istiyor. Boşluğu doldur: kısa bir durum kur, bir dönüş noktası ver (duyurmadan), bir sonuç söyle ve sonunda bir sonraki konuşmacıya geçişi bağla. Elinde metin yok, o yüzden kısa cümleler kur. Dönüş noktasını önceden haber verme.",
        stimulus:
          "ETKİNLİK: Bir mahalle derneğinin yıllık toplantısı.\n\n" +
          "BİLDİKLERİN:\n" +
          "— Salon eskiden bir marangozhaneydi, iki yıl boş kaldı\n" +
          "— Dernek kirayı ödeyemedi, kapanmak üzereydi\n" +
          "— Bir komşu, kızının düğününü burada yapmayı önerdi; kira o gün çıktı\n" +
          "— Bugün salon haftada dört gün dolu\n" +
          "— Sıradaki konuşmacı: mekân kirası üstüne konuşacak olan Frau Winter",
        checklist: [
          "Durum kısa mı (iki-üç cümle)?",
          "Dönüş noktası duyurulmadan geldi mi?",
          "Sonuç var mı (neden anlatıldığı belli mi)?",
          "Bir sonraki konuşmacıya geçiş kuruldu mu?",
        ],
        minWords: 80,
        phrases: [
          { de: "Es begann damit, dass …", tr: "…-mesiyle başladı", en: "it began with …" },
          { de: "Um es auf den Punkt zu bringen, …", tr: "kısaca söylemek gerekirse", en: "to put it in a nutshell" },
          { de: "Damit sind wir schon bei …", tr: "böylece …-e gelmiş olduk", en: "which brings us to …" },
        ],
        sample:
          "Solange die Technik überlegt, erzähle ich Ihnen, wo Sie gerade sitzen.\n\n" +
          "Es begann damit, dass dieser Raum zwei Jahre leer stand. Eine Schreinerei war ausgezogen, der Verein konnte die Miete nicht zahlen, und im Februar lag die Kündigung auf dem Tisch.\n\n" +
          "Dann fragte eine Nachbarin, ob ihre Tochter hier heiraten könne. An einem einzigen Samstag kam die Miete für zwei Monate zusammen.\n\n" +
          "Heute ist dieser Saal an vier Tagen die Woche belegt. Um es auf den Punkt zu bringen: Gerettet hat ihn kein Konzept, sondern eine Frage.\n\n" +
          "Damit sind wir schon beim nächsten Thema. Frau Winter spricht über Mieten für Veranstaltungsräume — und über die Frage, warum sie so selten jemand stellt.",
      },
    ],
  },
];

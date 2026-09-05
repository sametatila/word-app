import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 17 — "Yaşananı anlatmak".
 *
 * Dört ders: Warum berührt uns Musik? · Der entscheidende Moment ·
 * Beton oder Altbau? · Auf dem Festival. Ünite deneyimi anlatmanın dilini
 * kuruyor: indem bir etkinin nasıl doğduğunu söyler, ortaç sıfatı anı
 * dondurur, dessen/deren yapıyı sahibiyle birlikte anar, adlaştırma ise
 * kalabalığın hâlini tek öbeğe sığdırır.
 *
 *   Ünite 17: der Rhythmus, die Melodie, das Gedächtnis, das Unterbewusstsein,
 *             die Wahrnehmung, die Prägung, die Sehnsucht, die Zuneigung ·
 *             der Wettkampf, das Turnier, die Meisterschaft, die Niederlage,
 *             der Schiedsrichter, der Anhänger, besiegen, anfeuern ·
 *             der Altbau, der Grundriss, das Dachgeschoss, die Dämmung,
 *             der Bebauungsplan, umgestalten, geräumig, abreißen ·
 *             das Volksfest, der Brauch, die Tracht, die Hochsaison,
 *             die Tribüne, der Andrang, ausgebucht, durchhalten
 *   Kalıplar: …, indem sie … · ins Gedächtnis gehen · der gefeierte Sieger ·
 *             ein Gebäude, dessen Fassade … · beim Auftritt der Band ·
 *             die Stimmung der Menge
 *
 * Deneyim anlatımının tuzağı sıfat yığmaktır. Bu ünite bunun yerine yapıyı
 * çalıştırıyor: bir anı "harika"yla değil, ne olduğunu söyleyen bir ortaçla
 * ya da adlaştırmayla anlatmak.
 */
export const b2U17: SkillExercise[] = [
  {
    id: "b2-u17-r1",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "Warum berührt uns Musik?",
    genre: "Popüler bilim yazısı",
    intro: "Müziğin neden etkilediğini anlatan bir yazı. Nasıl sorusunun cevaplarına dikkat et.",
    gloss: [
      { de: "der Rhythmus", tr: "ritim", en: "rhythm" },
      { de: "die Melodie", tr: "melodi", en: "melody" },
      { de: "das Gedächtnis", tr: "hafıza", en: "memory" },
      { de: "das Unterbewusstsein", tr: "bilinçaltı", en: "subconscious" },
      { de: "die Wahrnehmung", tr: "algı", en: "perception" },
      { de: "die Prägung", tr: "şekillenme", en: "imprinting" },
      { de: "die Sehnsucht", tr: "özlem", en: "longing" },
      { de: "die Zuneigung", tr: "sevgi", en: "affection" },
    ],
    minutes: 6,
    text:
      "WARUM BERÜHRT UNS MUSIK?\n\n" +
      "Fast jeder kennt den Effekt: Vier Takte genügen, und man ist plötzlich siebzehn. Musik geht schneller ins Gedächtnis als jeder Text, und sie bleibt dort länger.\n\n" +
      "Ein Grund liegt im Rhythmus. Der Körper reagiert auf einen regelmäßigen Takt, bevor die Wahrnehmung ihn bewusst verarbeitet — Puls und Atmung passen sich an, indem sie sich am äußeren Takt orientieren. Deshalb wirkt langsame Musik beruhigend, ohne dass man ihr zuhören müsste.\n\n" +
      "Der zweite Grund ist die Prägung. Zwischen etwa vierzehn und zweiundzwanzig hört man Musik intensiver als je wieder, und was in diesen Jahren läuft, verbindet sich mit allem anderen, was gerade passiert. Eine Melodie speichert deshalb nicht nur sich selbst, sondern auch das Zimmer, den Sommer und die Person, die daneben saß.\n\n" +
      "Damit erklärt sich auch die Sehnsucht, die viele beim Hören alter Lieder empfinden. Sie gilt selten der Musik. Sie gilt dem Zustand, in dem man war, als man sie zum ersten Mal gehört hat — und diesen Zustand ruft das Unterbewusstsein zuverlässiger auf als jedes Foto.\n\n" +
      "Und die Zuneigung zu einem bestimmten Stück? Sie entsteht nicht dadurch, dass ein Lied besonders gut ist, sondern indem man es oft hört. Vertrautheit schlägt Qualität — jedenfalls beim Lieblingslied.\n\n" +
      "Wer das weiß, hört sich selbst anders zu. Man lernt, zwischen zwei Fragen zu unterscheiden: Ist das gut? Und: Gehört das mir?",
    questions: [
      {
        text: "Warum wirkt langsame Musik beruhigend?",
        options: [
          "weil Puls und Atmung sich am Takt orientieren",
          "weil man ihr bewusst zuhören muss",
          "weil sie leiser ist",
        ],
        answer: 0,
        explain: "„Puls und Atmung passen sich an, indem sie sich am äußeren Takt orientieren.“",
      },
      {
        kind: "gapfill",
        text: "Zuneigung entsteht nicht dadurch, dass ein Lied gut ist, sondern ___ man es oft hört.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "indem 'nasıl' sorusuna cevap verir; yan cümlede fiil sona gider.",
      },
      {
        kind: "short_answer",
        text: "In welchem Alter hört man Musik am intensivsten?",
        options: [],
        answer: 0,
        accept: ["zwischen 14 und 22", "vierzehn bis zweiundzwanzig", "als Jugendlicher"],
        explain: "„Zwischen etwa vierzehn und zweiundzwanzig hört man Musik intensiver als je wieder.“",
      },
      {
        text: "Wem gilt die Sehnsucht beim Hören alter Lieder?",
        options: [
          "der Musik selbst",
          "dem Zustand, in dem man damals war",
          "den Musikern",
        ],
        answer: 1,
        explain: "„Sie gilt dem Zustand, in dem man war, als man sie zum ersten Mal gehört hat.“",
      },
      {
        text: "Beim Lieblingslied schlägt Qualität die Vertrautheit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Vertrautheit schlägt Qualität — jedenfalls beim Lieblingslied.“",
      },
    ],
  },

  {
    id: "b2-u17-r2",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "Beton oder Altbau?",
    genre: "Mimarlık yazısı",
    intro: "Eski yapı ile yeni yapı tartışması. Binaları anlatan ilgi cümlelerine dikkat et.",
    gloss: [
      { de: "der Altbau", tr: "eski yapı", en: "old building" },
      { de: "der Grundriss", tr: "kat planı", en: "floor plan" },
      { de: "das Dachgeschoss", tr: "çatı katı", en: "attic floor" },
      { de: "die Dämmung", tr: "yalıtım", en: "insulation" },
      { de: "der Bebauungsplan", tr: "imar planı", en: "development plan" },
      { de: "umgestalten", tr: "yeniden düzenlemek", en: "to redesign" },
      { de: "geräumig", tr: "ferah", en: "spacious" },
      { de: "abreißen", tr: "yıkmak", en: "to demolish" },
    ],
    minutes: 6,
    text:
      "BETON ODER ALTBAU?\n\n" +
      "Die Debatte läuft seit Jahrzehnten mit denselben Argumenten, und beide Seiten haben in einem Punkt recht.\n\n" +
      "Für den Altbau spricht der Grundriss. Ein Gebäude, dessen Räume drei Meter hoch sind und deren Fenster bis fast zum Boden reichen, wirkt geräumig, auch wenn die Quadratmeterzahl kleiner ist als im Neubau. Dazu kommt etwas Unromantisches: Häuser, die hundert Jahre gestanden haben, haben bewiesen, dass sie stehen bleiben.\n\n" +
      "Gegen den Altbau spricht die Dämmung. Eine Fassade, deren Stuck man erhalten will, lässt sich von außen nicht dämmen; von innen geht es, kostet aber Fläche und braucht Sorgfalt, sonst schimmelt es. Das Dachgeschoss ist im Sommer heiß und im Winter kalt, solange nichts gemacht wird.\n\n" +
      "Und der Neubau? Er ist rechnerisch sparsamer, und das ist kein kleines Argument. Der Haken steckt in der Bilanz davor: Ein Haus abzureißen und neu zu bauen verbraucht so viel Energie, dass der Vorsprung erst nach Jahrzehnten hereinkommt. Wer den Bestand umgestaltet statt ihn abzureißen, hat diese Rechnung schon gewonnen.\n\n" +
      "Was viele unterschätzen, ist der Bebauungsplan. Er entscheidet über Höhe, Abstand und Nutzung — und damit darüber, ob überhaupt etwas möglich ist. Die schönste Idee scheitert an zwei Zeilen, die 1968 geschrieben wurden.\n\n" +
      "Ein Vorschlag zur Güte: weniger über Stile streiten, mehr über Grundrisse. Ein gut geschnittener Neubau ist besser als ein schlecht geschnittener Altbau — und umgekehrt.",
    questions: [
      {
        kind: "gapfill",
        text: "Ein Gebäude, ___ Räume drei Meter hoch sind, wirkt geräumig.",
        options: [],
        answer: 0,
        accept: ["dessen"],
        explain: "Sahip nötr (das Gebäude) olduğu için dessen; ardından gelen ad artikel almaz.",
      },
      {
        text: "Warum lässt sich eine Stuckfassade nicht von außen dämmen?",
        options: [
          "weil der Stuck erhalten werden soll",
          "weil es verboten ist",
          "weil die Fassade zu hoch ist",
        ],
        answer: 0,
        explain: "„Eine Fassade, deren Stuck man erhalten will, lässt sich von außen nicht dämmen.“",
      },
      {
        kind: "short_answer",
        text: "Warum rechnet sich ein Abriss oft nicht?",
        options: [],
        answer: 0,
        accept: ["wegen der Energie beim Bau", "der Neubau verbraucht Energie", "wegen der Bilanz davor"],
        explain: "„Ein Haus abzureißen und neu zu bauen verbraucht so viel Energie, dass der Vorsprung erst nach Jahrzehnten hereinkommt.“",
      },
      {
        text: "Worüber entscheidet der Bebauungsplan?",
        options: [
          "über Höhe, Abstand und Nutzung",
          "über die Farbe der Fassade",
          "über die Miete",
        ],
        answer: 0,
        explain: "„Er entscheidet über Höhe, Abstand und Nutzung.“",
      },
      {
        text: "Der Text empfiehlt, mehr über Stile zu streiten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…weniger über Stile streiten, mehr über Grundrisse.“",
      },
    ],
  },

  {
    id: "b2-u17-l1",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "Der entscheidende Moment",
    genre: "Diyalog",
    intro: "İki taraftar dünkü maçı konuşuyor. Anı anlatan sıfatlara dikkat et.",
    gloss: [
      { de: "der Wettkampf", tr: "müsabaka", en: "competition" },
      { de: "das Turnier", tr: "turnuva", en: "tournament" },
      { de: "die Meisterschaft", tr: "şampiyona", en: "championship" },
      { de: "die Niederlage", tr: "yenilgi", en: "defeat" },
      { de: "der Schiedsrichter", tr: "hakem", en: "referee" },
      { de: "der Anhänger", tr: "taraftar", en: "supporter" },
      { de: "besiegen", tr: "yenmek", en: "to defeat" },
      { de: "anfeuern", tr: "tezahürat yapmak", en: "to cheer on" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Cem", text: "Warst du gestern da? Der gefeierte Sieger stand am Ende ganz woanders, als alle dachten." },
      { speaker: "Ruth", text: "Ich war da. Bis zur achtzigsten Minute sah es nach einer klaren Niederlage aus." },
      { speaker: "Cem", text: "Und dann dieser eine Moment." },
      { speaker: "Ruth", text: "Der Schiedsrichter hat richtig entschieden, das sage ich als Anhängerin der anderen Seite." },
      { speaker: "Cem", text: "Sehe ich auch so. Es gab Pfiffe, aber die Bilder waren eindeutig." },
      { speaker: "Ruth", text: "Was mich beeindruckt hat, war die Stimmung. Die haben bis zum Schluss angefeuert." },
      { speaker: "Cem", text: "Bei diesem Stand hätten die meisten das Stadion längst verlassen." },
      { speaker: "Ruth", text: "Und jetzt? Reicht das für die Meisterschaft?" },
      { speaker: "Cem", text: "Rechnerisch ja. Sie müssen aber im Turnier nächste Woche mindestens einmal gewinnen." },
      { speaker: "Ruth", text: "Gegen wen?" },
      { speaker: "Cem", text: "Gegen die Mannschaft, die sie im Hinspiel deutlich besiegt hat. Das wird schwer." },
      { speaker: "Ruth", text: "Der Wettkampf ist also noch offen. Umso besser." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ruth'un hakem kararı hakkındaki cümlesini yaz.",
        options: [],
        answer: 0,
        accept: ["Der Schiedsrichter hat richtig entschieden, das sage ich als Anhängerin der anderen Seite."],
        explain: "Anhängerin dişil biçim; cümle taraf tutmayı açıkça belirtiyor.",
      },
      {
        text: "Wie sah es bis zur achtzigsten Minute aus?",
        options: [
          "nach einem klaren Sieg",
          "nach einer klaren Niederlage",
          "nach einem Unentschieden",
        ],
        answer: 1,
        explain: "„Bis zur achtzigsten Minute sah es nach einer klaren Niederlage aus.“",
      },
      {
        kind: "short_answer",
        text: "Was hat Ruth am meisten beeindruckt?",
        options: [],
        answer: 0,
        accept: ["die Stimmung", "das Anfeuern", "die Fans"],
        explain: "„Was mich beeindruckt hat, war die Stimmung. Die haben bis zum Schluss angefeuert.“",
      },
      {
        text: "Gegen wen müssen sie nächste Woche spielen?",
        options: [
          "gegen die Mannschaft, die sie im Hinspiel besiegt hat",
          "gegen den Tabellenletzten",
          "das steht noch nicht fest",
        ],
        answer: 0,
        explain: "„Gegen die Mannschaft, die sie im Hinspiel deutlich besiegt hat. Das wird schwer.“",
      },
      {
        text: "Die Meisterschaft ist rechnerisch schon entschieden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Rechnerisch ja. Sie müssen aber im Turnier nächste Woche mindestens einmal gewinnen.“",
      },
    ],
  },

  {
    id: "b2-u17-l2",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "Auf dem Volksfest",
    genre: "Diyalog",
    intro: "Festivalden dönen iki kişi konuşuyor. Adlaştırılmış ifadelere dikkat et.",
    gloss: [
      { de: "das Volksfest", tr: "halk şenliği", en: "public festival" },
      { de: "der Brauch", tr: "görenek", en: "custom" },
      { de: "die Tracht", tr: "yöresel kıyafet", en: "traditional dress" },
      { de: "die Hochsaison", tr: "yüksek sezon", en: "peak season" },
      { de: "die Tribüne", tr: "tribün", en: "stand" },
      { de: "der Andrang", tr: "izdiham", en: "crush" },
      { de: "ausgebucht", tr: "tamamen dolu", en: "fully booked" },
      { de: "durchhalten", tr: "dayanmak", en: "to hold out" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Tine", text: "Und? Wie war es auf dem Volksfest?" },
      { speaker: "Ozan", text: "Beim Auftritt der Band war die Stimmung der Menge unglaublich. Der Rest war anstrengend." },
      { speaker: "Tine", text: "Der Andrang war groß?" },
      { speaker: "Ozan", text: "Sehr. Es ist Hochsaison, alle Pensionen im Ort sind ausgebucht." },
      { speaker: "Tine", text: "Und du hattest keinen Platz auf der Tribüne?" },
      { speaker: "Ozan", text: "Doch, aber erst nach zwei Stunden Warten. Ich habe durchgehalten, das war es wert." },
      { speaker: "Tine", text: "Haben viele Tracht getragen?" },
      { speaker: "Ozan", text: "Etwa die Hälfte. Bei den Jüngeren mehr, als ich erwartet hätte." },
      { speaker: "Tine", text: "Interessant. Ich dachte, das verschwindet." },
      { speaker: "Ozan", text: "Im Gegenteil. Der Brauch ist zurück, nur anders — halb ernst, halb Kostüm." },
      { speaker: "Tine", text: "Und der Umzug am Sonntag?" },
      { speaker: "Ozan", text: "Den habe ich verpasst. Nach zwei Tagen Festival war ich fertig." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ozan'ın konser anını anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Beim Auftritt der Band war die Stimmung der Menge unglaublich."],
        explain: "İki adlaştırma yan yana: beim Auftritt ve die Stimmung der Menge.",
      },
      {
        text: "Warum sind alle Pensionen ausgebucht?",
        options: ["wegen des Umzugs", "weil Hochsaison ist", "wegen einer Messe"],
        answer: 1,
        explain: "„Es ist Hochsaison, alle Pensionen im Ort sind ausgebucht.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange hat Ozan auf den Platz gewartet?",
        options: [],
        answer: 0,
        accept: ["zwei Stunden", "2 Stunden", "zwei Stunden lang"],
        explain: "„Doch, aber erst nach zwei Stunden Warten.“",
      },
      {
        text: "Wie beschreibt Ozan den Brauch?",
        options: [
          "Er verschwindet.",
          "Er ist zurück, aber anders: halb ernst, halb Kostüm.",
          "Er ist unverändert geblieben.",
        ],
        answer: 1,
        explain: "„Der Brauch ist zurück, nur anders — halb ernst, halb Kostüm.“",
      },
      {
        text: "Ozan hat den Umzug am Sonntag gesehen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Den habe ich verpasst. Nach zwei Tagen Festival war ich fertig.“",
      },
    ],
  },

  {
    id: "b2-u17-w1",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "Anı kur",
    genre: "Cümle kurma",
    intro: "indem etkiyi, ortaç sıfatı anı, adlaştırma ise hâli tek öbeğe sığdırır.",
    gloss: [
      { de: "der Rhythmus", tr: "ritim", en: "rhythm" },
      { de: "besiegen", tr: "yenmek", en: "to defeat" },
      { de: "abreißen", tr: "yıkmak", en: "to demolish" },
      { de: "der Andrang", tr: "izdiham", en: "crush" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Nabız dış ritme uyum sağlayarak kendini ayarlıyor.",
        answer: "Der Puls passt sich an, indem er sich am äußeren Rhythmus orientiert",
        hint: "indem yan cümlesinde özne tekrarlanır, çekimli fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Alkışlanan galip sonunda bambaşka biriydi.",
        answer: "Der gefeierte Sieger war am Ende ein ganz anderer",
        hint: "Ortaç II sıfatı: alkışlanan, yani edilgen ve bitmiş.",
      },
      {
        kind: "build",
        tr: "Cephesindeki alçı korunmak istenen bir bina.",
        answer: "Ein Gebäude, dessen Stuck man erhalten will",
        hint: "Sahip nötr olduğu için dessen; ardından gelen ad artikelsiz.",
      },
      {
        kind: "build",
        tr: "Grubun sahne aldığı anda kalabalığın havası inanılmazdı.",
        answer: "Beim Auftritt der Band war die Stimmung der Menge unglaublich",
        hint: "İki adlaştırma: beim Auftritt ve die Stimmung der Menge.",
      },
      {
        kind: "rewrite",
        prompt: "Sıfat yığınını yapıyla değiştir: ne olduğunu söyle.",
        source: "Das Konzert war einfach wunderschön und toll und super.",
        answer: "Beim Auftritt der Band war die Stimmung der Menge unglaublich.",
        alternatives: [
          "Beim Auftritt der Band war die Stimmung der Menge unglaublich",
          "Beim Auftritt der Band war die Stimmung im Publikum unglaublich.",
        ],
        why: "Deneyim anlatımında üç sıfat üst üste yığmak hiçbir şey söylemez; okuyucu neyin nasıl olduğunu bilmez. Adlaştırma -beim Auftritt, die Stimmung der Menge- olayı ve anı adlandırır, böylece tek bir nitelik sıfatı yeterli hale gelir.",
      },
    ],
  },

  {
    id: "b2-u17-w2",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "Der Erlebnisbericht",
    genre: "Deneyim yazısı",
    intro: "Bir anı anlat — sıfat yığmadan, ne olduğunu söyleyerek.",
    gloss: [
      { de: "die Tribüne", tr: "tribün", en: "stand" },
      { de: "durchhalten", tr: "dayanmak", en: "to hold out" },
      { de: "die Wahrnehmung", tr: "algı", en: "perception" },
      { de: "das Gedächtnis", tr: "hafıza", en: "memory" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Aklında kalan bir günü anlat: bir konser, bir maç, bir şenlik, bir yolculuk. Şu sırayı tut: nereye gittiğin ve neyi beklediğin, orada ne olduğu, en çok aklında kalan tek an ve bugün geriye bakınca ne düşündüğün. Kural: 'harika', 'süper', 'çok güzel' gibi sıfatlarla geçiştirme. Bunun yerine en az bir kez indem ile etkiyi anlat, en az bir kez adlaştırma kullan -beim Auftritt …, die Stimmung der Menge- ve bir kez de ortaç sıfatı.",
        checklist: [
          "Beklenti ile yaşanan ayrı ayrı anlatıldı mı?",
          "En az bir indem cümlesi var mı?",
          "En az bir adlaştırma ve bir ortaç sıfatı var mı?",
          "Tek bir an ayrıntısıyla verildi mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Beim Auftritt der Band …", tr: "grup sahne alınca …", en: "when the band came on …" },
          { de: "…, indem sie einfach weitergespielt haben", tr: "sadece çalmaya devam ederek", en: "by simply playing on" },
          { de: "Das ist mir ins Gedächtnis gegangen.", tr: "bu hafızama kazındı", en: "that stayed with me" },
        ],
        sample:
          "ZWEI STUNDEN WARTEN\n\n" +
          "Ich war im Juli auf dem Volksfest in Waldkirch, zum ersten Mal. Erwartet hatte ich wenig: laute Musik, teures Essen, viele Menschen.\n\n" +
          "Der Andrang war tatsächlich groß. Auf die Tribüne kam ich erst nach zwei Stunden Warten, und ich hätte fast aufgegeben. Durchgehalten habe ich nur, weil neben mir zwei ältere Frauen standen, die seit vierzig Jahren jedes Jahr kommen und die ganze Zeit erzählt haben.\n\n" +
          "Beim Auftritt der Band hat sich die Stimmung der Menge innerhalb von zwei Minuten gedreht. Es fing an zu regnen, richtig, nicht ein bisschen. Die Band hat darauf reagiert, indem sie einfach weitergespielt hat, ohne ein Wort. Niemand ist gegangen.\n\n" +
          "Ins Gedächtnis gegangen ist mir aber etwas anderes: der gefeierte Sänger stand am Ende ohne Mikrofon vorn an der Bühne, und die Leute haben für ihn gesungen. Vielleicht dreißig Sekunden.\n\n" +
          "Heute glaube ich, dass es nicht am Konzert lag, sondern am Warten davor. Ohne die zwei Stunden hätte meine Wahrnehmung das gar nicht so aufgenommen.",
      },
    ],
  },
];

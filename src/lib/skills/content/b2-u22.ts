import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 22 — "Kendini ve ötekini yönetmek".
 *
 * Dört ders: Der innere Schweinehund · Die Macht der Gewohnheit ·
 * Mitgefühl zeigen · Fair streiten. Ünite iç dünyanın dilini kuruyor:
 * edilgen yerine geçenler engeli failsiz adlandırır, indem alışkanlığın nasıl
 * kurulduğunu söyler, Konjunktiv II başkasının yerine geçmeyi mümkün kılar,
 * iki parçalı bağlaçlar ise tartışmada iki tarafı birden tutar.
 *
 *   Ünite 22: die Hürde, der Antrieb, die Willenskraft, die Selbstbeherrschung,
 *             die Bewältigung, die Überforderung, der Ehrgeiz, aufschieben ·
 *             die Neigung, die Veranlagung, sich anpassen, aushalten,
 *             die Sturheit, das Wohlbefinden, der Rückfall, nachsichtig ·
 *             das Mitgefühl, die Empathie, mitfühlen, das Mitleid,
 *             die Fürsorge, die Hilfsbereitschaft, die Ausgrenzung,
 *             die Einsamkeit · der Zorn, der Neid, die Reue, die Ablehnung,
 *             der Vertrauensbruch, die Versöhnung, sich zerstreiten, ermahnen
 *   Kalıplar: … lässt sich überwinden · Es hilft, … zu … ·
 *             …, indem man sie wiederholt · sich an etwas anpassen ·
 *             An seiner Stelle hätte ich … · Wie würdest du dich fühlen? ·
 *             weder … noch … · einerseits … andererseits …
 *
 * "An seiner Stelle hätte ich …" kalıbı empatinin dilbilgisel biçimi:
 * gerçekleşmemiş bir durumu kurar, o yüzden Konjunktiv II ister. Türkçede
 * "onun yerinde olsam" derken de kip değişir — bu yüzden burada aktarım kolay.
 */
export const b2U22: SkillExercise[] = [
  {
    id: "b2-u22-r1",
    level: "B2",
    skill: "reading",
    unit: 22,
    title: "Die Macht der Gewohnheit",
    genre: "Popüler bilim yazısı",
    intro: "Alışkanlıkların nasıl kurulduğunu anlatan bir yazı.",
    gloss: [
      { de: "die Neigung", tr: "eğilim", en: "tendency" },
      { de: "die Veranlagung", tr: "yatkınlık", en: "predisposition" },
      { de: "sich anpassen", tr: "uyum sağlamak", en: "to adapt" },
      { de: "aushalten", tr: "katlanmak", en: "to endure" },
      { de: "die Sturheit", tr: "inatçılık", en: "stubbornness" },
      { de: "das Wohlbefinden", tr: "iyilik hâli", en: "wellbeing" },
      { de: "der Rückfall", tr: "nüks", en: "relapse" },
      { de: "nachsichtig", tr: "müsamahakâr", en: "lenient" },
    ],
    minutes: 6,
    text:
      "DIE MACHT DER GEWOHNHEIT\n\n" +
      "Eine Gewohnheit entsteht nicht dadurch, dass man sie beschließt, sondern indem man sie wiederholt — an derselben Stelle, zur selben Zeit, nach demselben Auslöser. Der Beschluss ist die leichteste Sekunde des ganzen Vorgangs.\n\n" +
      "Deshalb funktioniert das Anhängen besser als das Neuanfangen. Wer nach dem Zähneputzen zehn Minuten liest, hat eine Gewohnheit; wer sich vornimmt, „mehr zu lesen“, hat einen Vorsatz. Der Unterschied ist der Auslöser: Das Zähneputzen passiert ohnehin, und das Gehirn passt sich an eine Kette schneller an als an eine Absicht.\n\n" +
      "Über Veranlagung wird in diesem Zusammenhang zu viel geredet. Natürlich gibt es Unterschiede in der Neigung, Dinge durchzuhalten. Sie erklären aber weniger, als man denkt — und vor allem entschuldigen sie nichts, weil die Umgebung stärker wirkt als der Charakter. Wer die Schokolade nicht kauft, braucht keine Selbstbeherrschung im Wohnzimmer.\n\n" +
      "Der wichtigste Punkt betrifft den Rückfall. Er ist keine Ausnahme, sondern Teil des Vorgangs. Untersuchungen zeigen: Nicht der Aussetzer bricht die Gewohnheit, sondern das Aufgeben nach dem Aussetzer. Wer einmal auslässt, hat nichts verloren; wer nach dem einen Mal aufhört, schon.\n\n" +
      "Und das Wohlbefinden? Es kommt später als erwartet. Die ersten zwei Wochen fühlen sich nach Sturheit an, nicht nach Freude. Man muss diese Phase aushalten — und in ihr mit sich selbst nachsichtig sein, ohne nachlässig zu werden. Das ist der schmale Grat, an dem die meisten Vorsätze scheitern.",
    questions: [
      {
        kind: "gapfill",
        text: "Eine Gewohnheit entsteht, ___ man sie wiederholt.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "indem yöntemi bildirir: alışkanlık kararla değil tekrarla kurulur.",
      },
      {
        text: "Warum funktioniert das Anhängen besser?",
        options: [
          "weil der Auslöser ohnehin passiert",
          "weil es weniger Zeit kostet",
          "weil es niemand merkt",
        ],
        answer: 0,
        explain: "„Das Zähneputzen passiert ohnehin, und das Gehirn passt sich an eine Kette schneller an als an eine Absicht.“",
      },
      {
        kind: "short_answer",
        text: "Was bricht die Gewohnheit laut Text?",
        options: [],
        answer: 0,
        accept: ["das Aufgeben nach dem Aussetzer", "das Aufgeben", "nicht der Aussetzer"],
        explain: "„Nicht der Aussetzer bricht die Gewohnheit, sondern das Aufgeben nach dem Aussetzer.“",
      },
      {
        text: "Was wirkt laut Text stärker als der Charakter?",
        options: ["die Veranlagung", "die Umgebung", "der Ehrgeiz"],
        answer: 1,
        explain: "„…weil die Umgebung stärker wirkt als der Charakter.“",
      },
      {
        text: "Die ersten zwei Wochen fühlen sich nach Freude an.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die ersten zwei Wochen fühlen sich nach Sturheit an, nicht nach Freude.“",
      },
    ],
  },

  {
    id: "b2-u22-r2",
    level: "B2",
    skill: "reading",
    unit: 22,
    title: "Fair streiten",
    genre: "Deneme",
    intro: "Tartışma kültürü üzerine bir yazı. İki tarafı birden anan cümlelere dikkat et.",
    gloss: [
      { de: "der Zorn", tr: "gazap", en: "wrath" },
      { de: "der Neid", tr: "haset", en: "envy" },
      { de: "die Reue", tr: "pişmanlık", en: "remorse" },
      { de: "die Ablehnung", tr: "reddetme", en: "rejection" },
      { de: "der Vertrauensbruch", tr: "güven ihlali", en: "breach of trust" },
      { de: "die Versöhnung", tr: "barışma", en: "reconciliation" },
      { de: "sich zerstreiten", tr: "bozuşmak", en: "to fall out" },
      { de: "ermahnen", tr: "ikaz etmek", en: "to admonish" },
    ],
    minutes: 6,
    text:
      "FAIR STREITEN\n\n" +
      "Streiten ist keine Störung der Beziehung, sondern ein Teil von ihr. Wer nie streitet, hat entweder nichts zu verlieren oder sagt nicht, was er denkt. Interessant ist deshalb nicht, ob gestritten wird, sondern wie.\n\n" +
      "Die erste Regel ist alt und wird trotzdem ständig gebrochen: Man streitet über eine Sache, nicht über die Person. „Du hast den Termin vergessen“ ist ein Streit. „Du bist unzuverlässig“ ist ein Urteil, und ein Urteil klingt wie Ablehnung der ganzen Person — dagegen kann man sich nur verteidigen, nicht einigen.\n\n" +
      "Die zweite Regel betrifft den Zeitpunkt. Zorn ist kein guter Ratgeber, aber Warten auch nicht: Wer drei Wochen sammelt, bringt am Ende nicht ein Thema, sondern zwölf. Weder das sofortige Losbrechen noch das monatelange Schweigen führt irgendwohin. Am besten funktioniert der nächste ruhige Moment.\n\n" +
      "Einerseits braucht ein Streit Klarheit, andererseits einen Ausgang. Wer nur recht behalten will, gewinnt vielleicht das Gespräch und verliert die Beziehung. Deshalb gehört zu einem fairen Streit die Frage, was der andere jetzt braucht — nicht als Höflichkeitsfloskel, sondern als echte Frage.\n\n" +
      "Manches ist allerdings kein Streit, sondern ein Vertrauensbruch. Da hilft keine Technik. Dort geht es um Reue und darum, ob eine Versöhnung überhaupt gewollt ist. Freundschaften zerstreiten sich selten wegen eines Konflikts; sie zerstreiten sich, weil danach niemand den ersten Schritt macht.\n\n" +
      "Und Neid? Er ist in Streitigkeiten häufiger, als zugegeben wird. Wer ihn bei sich bemerkt, muss ihn nicht aussprechen — aber er sollte sich selbst ermahnen, bevor er ein Sachargument sucht, das eigentlich keines ist.",
    questions: [
      {
        text: "Worüber sollte man laut Text streiten?",
        options: ["über die Person", "über eine Sache", "über die Vergangenheit"],
        answer: 1,
        explain: "„Man streitet über eine Sache, nicht über die Person.“",
      },
      {
        kind: "gapfill",
        text: "___ das sofortige Losbrechen noch das monatelange Schweigen führt irgendwohin.",
        options: [],
        answer: 0,
        accept: ["Weder"],
        explain: "weder … noch iki seçeneği birden dışlar; yapı zaten olumsuzdur.",
      },
      {
        kind: "short_answer",
        text: "Wann streitet man laut Text am besten?",
        options: [],
        answer: 0,
        accept: ["im nächsten ruhigen Moment", "in einem ruhigen Moment", "beim nächsten ruhigen Moment"],
        explain: "„Am besten funktioniert der nächste ruhige Moment.“",
      },
      {
        text: "Warum zerstreiten sich Freundschaften laut Text?",
        options: [
          "wegen eines Konflikts",
          "weil danach niemand den ersten Schritt macht",
          "wegen Neid allein",
        ],
        answer: 1,
        explain: "„…sie zerstreiten sich, weil danach niemand den ersten Schritt macht.“",
      },
      {
        text: "Bei einem Vertrauensbruch hilft dieselbe Technik wie beim Streit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Da hilft keine Technik.“",
      },
    ],
  },

  {
    id: "b2-u22-l1",
    level: "B2",
    skill: "listening",
    unit: 22,
    title: "Der innere Schweinehund",
    genre: "Diyalog",
    intro: "Ertelemekten yakınan biri konuşuyor. Engel nasıl adlandırılıyor?",
    gloss: [
      { de: "die Hürde", tr: "engel", en: "hurdle" },
      { de: "der Antrieb", tr: "itici güç", en: "drive" },
      { de: "die Willenskraft", tr: "irade gücü", en: "willpower" },
      { de: "die Selbstbeherrschung", tr: "kendine hâkim olma", en: "self-control" },
      { de: "die Bewältigung", tr: "başa çıkma", en: "coping" },
      { de: "die Überforderung", tr: "altından kalkamama", en: "being overwhelmed" },
      { de: "der Ehrgeiz", tr: "hırs", en: "ambition" },
      { de: "aufschieben", tr: "ertelemek", en: "to put off" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Jana", text: "Ich schiebe diesen Bericht seit drei Wochen auf. Mir fehlt einfach die Willenskraft." },
      { speaker: "Bo", text: "Vielleicht fehlt sie gar nicht. Vielleicht ist die Hürde zu hoch gesetzt." },
      { speaker: "Jana", text: "Wie meinst du das?" },
      { speaker: "Bo", text: "Was steht auf deiner Liste? Wahrscheinlich: Bericht schreiben. Das lässt sich nicht anfangen." },
      { speaker: "Jana", text: "Stimmt, so steht es da." },
      { speaker: "Bo", text: "Schreib stattdessen: Überschriften sammeln, zwanzig Minuten. Das lässt sich überwinden." },
      { speaker: "Jana", text: "Und wenn ich nach zwanzig Minuten aufhöre?" },
      { speaker: "Bo", text: "Dann hast du Überschriften. Meistens hört man nicht auf, aber das ist ein Nebeneffekt." },
      { speaker: "Jana", text: "Bei mir ist es eher Überforderung als fehlender Ehrgeiz." },
      { speaker: "Bo", text: "Eben. Und Überforderung ist keine Frage der Selbstbeherrschung, sondern der Portionierung." },
      { speaker: "Jana", text: "Es hilft also, kleiner zu planen." },
      { speaker: "Bo", text: "Genau. Der Antrieb kommt beim Anfangen, nicht davor. Das ist die eigentliche Bewältigung." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Bo'nun küçük adımı önerdiği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Schreib stattdessen: Überschriften sammeln, zwanzig Minuten."],
        explain: "Somut ve küçük görev, 'Bericht schreiben' gibi başlanamayacak bir görevin yerine geçiyor.",
      },
      {
        text: "Was ist laut Bo das eigentliche Problem?",
        options: [
          "fehlende Willenskraft",
          "eine zu hoch gesetzte Hürde",
          "zu wenig Ehrgeiz",
        ],
        answer: 1,
        explain: "„Vielleicht fehlt sie gar nicht. Vielleicht ist die Hürde zu hoch gesetzt.“",
      },
      {
        kind: "short_answer",
        text: "Wovon ist Überforderung laut Bo eine Frage?",
        options: [],
        answer: 0,
        accept: ["der Portionierung", "Portionierung", "der Aufteilung"],
        explain: "„…keine Frage der Selbstbeherrschung, sondern der Portionierung.“",
      },
      {
        text: "Wann kommt der Antrieb?",
        options: ["vor dem Anfangen", "beim Anfangen", "gar nicht"],
        answer: 1,
        explain: "„Der Antrieb kommt beim Anfangen, nicht davor.“",
      },
      {
        text: "Jana sagt, ihr fehle vor allem der Ehrgeiz.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Bei mir ist es eher Überforderung als fehlender Ehrgeiz.“",
      },
    ],
  },

  {
    id: "b2-u22-l2",
    level: "B2",
    skill: "listening",
    unit: 22,
    title: "Was hättest du gesagt?",
    genre: "Diyalog",
    intro: "Zor durumdaki bir arkadaşa nasıl davranılacağı konuşuluyor.",
    gloss: [
      { de: "das Mitgefühl", tr: "empati", en: "compassion" },
      { de: "die Empathie", tr: "empati", en: "empathy" },
      { de: "mitfühlen", tr: "empati kurmak", en: "to empathise" },
      { de: "das Mitleid", tr: "acıma", en: "pity" },
      { de: "die Fürsorge", tr: "şefkat", en: "care" },
      { de: "die Hilfsbereitschaft", tr: "yardımseverlik", en: "willingness to help" },
      { de: "die Ausgrenzung", tr: "dışlama", en: "exclusion" },
      { de: "die Einsamkeit", tr: "yalnızlık", en: "loneliness" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ada", text: "Ich wusste gestern nicht, was ich sagen soll. Sie hat die Stelle verloren." },
      { speaker: "Mert", text: "Was hast du gesagt?" },
      { speaker: "Ada", text: "Dass sie schnell etwas Neues findet. Es klang hohl, kaum war es raus." },
      { speaker: "Mert", text: "An deiner Stelle hätte ich wahrscheinlich dasselbe gesagt." },
      { speaker: "Ada", text: "Was wäre besser gewesen?" },
      { speaker: "Mert", text: "Eine Frage statt eines Trostes. Wie würdest du dich an ihrer Stelle fühlen?" },
      { speaker: "Ada", text: "Wütend. Und peinlich berührt, obwohl ich nichts falsch gemacht hätte." },
      { speaker: "Mert", text: "Genau. Und wer das hört, will kein Mitleid, sondern Mitgefühl — dass jemand mitfühlt." },
      { speaker: "Ada", text: "Der Unterschied ist mir noch nie so klar gewesen." },
      { speaker: "Mert", text: "Mitleid schaut von oben. Empathie setzt sich daneben." },
      { speaker: "Ada", text: "Soll ich Hilfe anbieten? Sie hat nach niemandem gefragt." },
      { speaker: "Mert", text: "Biete etwas Konkretes an. Allgemeine Hilfsbereitschaft und Fürsorge nimmt niemand in Anspruch." },
      { speaker: "Ada", text: "Ich frage einfach, ob sie Samstag Zeit hat." },
      { speaker: "Mert", text: "Gut. Das Schlimmste an so einer Zeit ist ohnehin die Einsamkeit, fast schon eine stille Ausgrenzung." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Mert'in Ada'nın yerine kendini koyduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["An deiner Stelle hätte ich wahrscheinlich dasselbe gesagt."],
        explain: "An deiner Stelle artı Konjunktiv II: gerçekleşmemiş bir durumun kipi.",
      },
      {
        text: "Was wäre laut Mert besser gewesen als Trost?",
        options: ["eine Frage", "ein Geschenk", "Schweigen"],
        answer: 0,
        explain: "„Eine Frage statt eines Trostes.“",
      },
      {
        kind: "short_answer",
        text: "Wie unterscheidet Mert Mitleid und Empathie?",
        options: [],
        answer: 0,
        accept: ["Mitleid schaut von oben", "Empathie setzt sich daneben", "von oben statt daneben"],
        explain: "„Mitleid schaut von oben. Empathie setzt sich daneben.“",
      },
      {
        text: "Welche Hilfe soll Ada anbieten?",
        options: [
          "etwas Konkretes",
          "allgemeine Hilfsbereitschaft",
          "Geld",
        ],
        answer: 0,
        explain: "„Biete etwas Konkretes an. Allgemeine Hilfsbereitschaft und Fürsorge nimmt niemand in Anspruch.“",
      },
      {
        text: "Ada hat gestern genau die richtigen Worte gefunden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Es klang hohl, kaum war es raus.“",
      },
    ],
  },

  {
    id: "b2-u22-w1",
    level: "B2",
    skill: "writing",
    unit: 22,
    title: "Onun yerinde olsam",
    genre: "Cümle kurma",
    intro: "Konjunktiv II başkasının yerine geçirir; indem alışkanlığı kurar.",
    gloss: [
      { de: "aufschieben", tr: "ertelemek", en: "to put off" },
      { de: "die Hürde", tr: "engel", en: "hurdle" },
      { de: "mitfühlen", tr: "empati kurmak", en: "to empathise" },
      { de: "die Versöhnung", tr: "barışma", en: "reconciliation" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Onun yerinde olsam aynı şeyi söylerdim.",
        answer: "An seiner Stelle hätte ich dasselbe gesagt",
        hint: "An seiner Stelle artı Konjunktiv II: gerçekleşmemiş durum.",
      },
      {
        kind: "build",
        tr: "Bu engel aşılabilir.",
        answer: "Diese Hürde lässt sich überwinden",
        hint: "lassen artı dönüşlü zamir edilgen yerine geçer.",
      },
      {
        kind: "build",
        tr: "Alışkanlık tekrarlayarak kurulur.",
        answer: "Eine Gewohnheit entsteht, indem man sie wiederholt",
        hint: "indem yöntemi bildirir; yan cümlede fiil sonda.",
      },
      {
        kind: "build",
        tr: "Ne hemen patlamak ne de aylarca susmak bir yere götürür.",
        answer: "Weder das Losbrechen noch das Schweigen führt irgendwohin",
        hint: "weder … noch yapısı zaten olumsuz; ek olumsuzluk istemez.",
      },
      {
        kind: "rewrite",
        prompt: "Teselli cümlesini empati sorusuna çevir.",
        source: "Du findest bestimmt schnell etwas Neues.",
        answer: "Wie würdest du dich an ihrer Stelle fühlen?",
        alternatives: [
          "Wie würdest du dich an ihrer Stelle fühlen",
          "Wie geht es dir damit?",
        ],
        why: "Teselli cümlesi konuşanın rahatlamasına yarar, dinleyenin değil; üstelik geleceğe dair bir vaat verir ve o vaadi tutamaz. Konjunktiv II ile kurulan soru ise karşı tarafı kendi durumunun içine davet eder - Türkçedeki 'onun yerinde olsan' kalıbıyla aynı işi görür ve orada da kip değişir.",
      },
    ],
  },

  {
    id: "b2-u22-w2",
    level: "B2",
    skill: "writing",
    unit: 22,
    title: "Die schwierige Nachricht",
    genre: "Kişisel mesaj",
    intro: "Zor bir dönemden geçen birine yaz — teselli etmeden, yanında durarak.",
    gloss: [
      { de: "das Mitgefühl", tr: "empati", en: "compassion" },
      { de: "die Fürsorge", tr: "şefkat", en: "care" },
      { de: "die Einsamkeit", tr: "yalnızlık", en: "loneliness" },
      { de: "nachsichtig", tr: "müsamahakâr", en: "lenient" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Zor bir dönemden geçen birine mesaj yaz: iş kaybı, hastalık, bir ayrılık, taşınma. Şu sırayı tut: neyi duyduğun, o kişinin durumunu nasıl gördüğün, kendini onun yerine koyduğunda ne hissettiğin ve somut bir teklif. Boş teselliden kaçın - 'bestimmt wird alles gut' yazma. En az bir kez An deiner Stelle ya da Wie würdest du dich fühlen kalıbını kullan ve teklifi somut yap: gün, saat, iş.",
        checklist: [
          "Boş teselli cümlesinden kaçınıldı mı?",
          "En az bir Konjunktiv II kalıbı var mı?",
          "Karşı tarafın hissi ciddiye alınmış mı?",
          "Teklif somut mu - gün, saat ya da belirli bir iş?",
        ],
        minWords: 80,
        phrases: [
          { de: "An deiner Stelle wäre ich auch wütend.", tr: "senin yerinde olsam ben de kızardım", en: "in your place I would be angry too" },
          { de: "Ich muss nichts sagen, ich kann auch zuhören.", tr: "bir şey söylemem şart değil, dinleyebilirim de", en: "I don't have to say anything, I can listen" },
          { de: "Hättest du Samstag Zeit?", tr: "cumartesi vaktin var mı", en: "would you have time on Saturday?" },
        ],
        sample:
          "Liebe Nadia,\n\n" +
          "Jonas hat mir gestern erzählt, dass deine Stelle gestrichen wurde. Ich habe lange überlegt, was ich schreiben soll, und dann gemerkt: Ich weiß es nicht.\n\n" +
          "Was ich nicht schreibe, ist, dass du bestimmt schnell etwas Neues findest. Das mag stimmen, aber es hilft heute niemandem, und ich kann es auch gar nicht wissen.\n\n" +
          "An deiner Stelle wäre ich vor allem wütend — und wahrscheinlich zusätzlich verlegen, obwohl es überhaupt nichts mit dir zu tun hat. Betriebsbedingt heißt betriebsbedingt. Sei mit dir in den nächsten Wochen nachsichtig; ich glaube, das ist gerade der schwierigste Teil.\n\n" +
          "Ganz konkret: Hättest du Samstagvormittag Zeit? Ich wollte sowieso auf den Markt und danach Kaffee trinken. Wenn du reden willst, reden wir; wenn nicht, reden wir über etwas anderes. Beides ist völlig in Ordnung.\n\n" +
          "Und falls du bei Bewerbungen jemanden brauchst, der gegenliest — ich mache das gern und bin ehrlich dabei.\n\n" +
          "Melde dich, wann es dir passt.\nDeine Ela",
      },
    ],
  },
];

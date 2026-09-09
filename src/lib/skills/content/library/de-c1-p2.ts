import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler parti 1'den ayrı: vaka analizi, panel tartışması ve kurum içi
 * değerlendirme notu. Üçü de geriye dönük yargı kurar; dil bilgisi bu
 * yüzden Konjunktiv II'nin geçmiş biçimi ve „als ob“.
 */
export const deC1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r2",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Die Reserve, die niemand bezahlen wollte",
    genre: "Vaka analizi",
    intro: "Bir kış aksaklığının ardından yazılmış çözümlemeyi okuyacaksın: hangi kararlar tek tek makuldü ve sistem yine de neden çöktü.",
    gloss: [
      { de: "abfedern", tr: "yumuşatmak", en: "to cushion" },
      { de: "vertretbar", tr: "savunulabilir", en: "defensible" },
      { de: "die Nachlässigkeit", tr: "ihmal", en: "negligence" },
      { de: "die Personaldecke", tr: "personel mevcudu", en: "staffing level" },
      { de: "der Springerdienst", tr: "yedek vardiya", en: "float shift" },
      { de: "gutschreiben", tr: "hesabına yazmak", en: "to credit" },
      { de: "die Kennzahl", tr: "gösterge", en: "metric" },
      { de: "anmieten", tr: "kiralamak", en: "to lease" },
    ],
    minutes: 10,
    text:
      "DIE RESERVE, DIE NIEMAND BEZAHLEN WOLLTE\n" +
      "Eine Nachbetrachtung zum Winter im Kreis Nordheim\n\n" +
      "Am Morgen des zwölften Januar fielen im Kreis Nordheim vierundsechzig von einhundertzwei Buslinien aus. " +
      "Schnee lag, aber nicht viel; die Straßen waren geräumt. Ausgefallen war etwas anderes: die Menschen. " +
      "Ein Infekt hatte innerhalb einer Woche knapp ein Fünftel des Fahrpersonals erwischt.\n\n" +
      "Rückblickend liest sich die Kette einfach, und genau das macht sie verdächtig. Hätte der Kreis mehr " +
      "Fahrerinnen und Fahrer unter Vertrag gehabt, wäre der Ausfall abgefedert worden. Hätte man die " +
      "Reservefahrzeuge nicht drei Jahre zuvor abgegeben, hätte sich zumindest der Schulverkehr aufrechterhalten " +
      "lassen. Beide Sätze stimmen. Beide erklären wenig.\n\n" +
      "Denn die Entscheidungen, die im Januar zusammenliefen, waren einzeln jeweils vertretbar. Der Verzicht auf " +
      "die Reservefahrzeuge sparte im Jahr etwa neunzigtausend Euro; das Geld floss in zwei zusätzliche " +
      "Abendfahrten, die tatsächlich genutzt wurden. Die knappe Personaldecke war nicht das Ergebnis von " +
      "Nachlässigkeit, sondern eines Tarifs, der Springerdienste schlechter stellte als feste Touren. Wer die " +
      "Reserve verteidigen wollte, musste jedes Jahr aufs Neue etwas verteidigen, das nichts tut — und das ist " +
      "in einer Haushaltsdebatte die schwächste aller Positionen.\n\n" +
      "Hier liegt das eigentliche Muster. Reserve ist ein Kostenposten mit sichtbarem Preis und unsichtbarem " +
      "Nutzen. Ihr Nutzen zeigt sich nur in Jahren, in denen sie gebraucht wird, und in diesen Jahren wird er " +
      "niemandem gutgeschrieben: Fällt nichts aus, so tut man, als sei nichts zu erwarten gewesen.\n\n" +
      "Was hätte geholfen? Nicht ein größeres Budget, sondern eine andere Buchführung. Drei Kreise in " +
      "Norddeutschland weisen seit zwei Jahren eine Kennzahl aus, die den Anteil der Fahrten angibt, der ohne " +
      "Springer nicht zu leisten wäre. Die Zahl kostet nichts und verändert die Debatte, weil sie den " +
      "unsichtbaren Nutzen sichtbar macht.\n\n" +
      "Der Kreis Nordheim hat im März wieder vier Fahrzeuge angemietet. Ob sie im nächsten Sparjahr überleben, " +
      "hängt nicht davon ab, ob sie gebraucht werden, sondern davon, ob jemand sie zu zählen weiß.",
    questions: [
      {
        text: "Was ist die zentrale These des Textes?",
        options: [
          "Reserve scheitert an ihrer Buchführung, nicht am Geld.",
          "Der Kreis hat im Winter grob fahrlässig gehandelt.",
          "Ein größeres Budget hätte den Ausfall verhindert.",
        ],
        answer: 0,
        explain: "„Nicht ein größeres Budget, sondern eine andere Buchführung“ — sorun görünmeyen faydanın sayılmaması.",
      },
      {
        text: "Wodurch fielen die Linien aus?",
        options: [
          "durch krankheitsbedingten Personalmangel",
          "durch außergewöhnlich starken Schneefall",
          "durch defekte Fahrzeuge im Depot",
        ],
        answer: 0,
        explain: "„Ausgefallen war etwas anderes: die Menschen. Ein Infekt hatte … ein Fünftel des Fahrpersonals erwischt.“",
      },
      {
        kind: "truefalse",
        text: "Der Verzicht auf die Reservefahrzeuge war laut Text von Anfang an unvernünftig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Die Entscheidungen … waren einzeln jeweils vertretbar“; tasarruf edilen para gerçekten kullanılan seferlere gitti.",
      },
      {
        kind: "gapfill",
        text: "Der Verzicht auf die Reservefahrzeuge sparte im Jahr etwa ___ Euro.",
        options: [],
        answer: 0,
        accept: ["neunzigtausend", "90000", "90.000"],
        explain: "„Der Verzicht auf die Reservefahrzeuge sparte im Jahr etwa neunzigtausend Euro.“",
      },
      {
        kind: "short_answer",
        text: "Was weisen drei norddeutsche Kreise seit zwei Jahren aus?",
        options: [],
        answer: 0,
        accept: ["eine Kennzahl", "eine neue Kennzahl", "Kennzahl"],
        explain: "„Drei Kreise in Norddeutschland weisen seit zwei Jahren eine Kennzahl aus …“",
      },
      {
        text: "Warum steht Reserve in Haushaltsdebatten schwach da?",
        options: [
          "Ihr Nutzen bleibt unsichtbar.",
          "Sie ist besonders teuer.",
          "Sie wird gesetzlich nicht verlangt.",
        ],
        answer: 0,
        explain: "„Reserve ist ein Kostenposten mit sichtbarem Preis und unsichtbarem Nutzen.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l2",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Wem gehört die Nacht?",
    genre: "Panel tartışması",
    intro: "Üç konuşmacılı bir panel dinleyeceksin: gürültü kimin sorunu, ölçüm neyi kaçırıyor, hangi önlem işe yarıyor.",
    gloss: [
      { de: "bestreiten", tr: "inkâr etmek", en: "to deny" },
      { de: "die Auflage", tr: "koşul", en: "condition" },
      { de: "die Vorhersagbarkeit", tr: "öngörülebilirlik", en: "predictability" },
      { de: "erwartbar", tr: "beklenebilir", en: "expectable" },
      { de: "auswerten", tr: "değerlendirmek", en: "to analyze" },
      { de: "verordnen", tr: "buyurmak", en: "to decree" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Moderatorin", text: "Willkommen zur Podiumsdiskussion. Unser Thema klingt poetisch, ist aber sehr konkret: Wem gehört die Nacht? Frau Perl, Sie leiten das Ordnungsamt." },
      { speaker: "Frau Perl", text: "Und ich fange mit einer unangenehmen Zahl an. Achtzig Prozent unserer Lärmbeschwerden betreffen vier Straßen. Es ist kein stadtweites Problem, es ist ein Verteilungsproblem." },
      { speaker: "Herr Ruck", text: "Genau deshalb sitze ich hier. Ich betreibe einen Club in einer dieser vier Straßen. Als wir aufgemacht haben, war das Viertel leer. Jetzt sind wir schuld daran, dass es voll ist." },
      { speaker: "Frau Perl", text: "Das bestreite ich gar nicht. Aber Lärmschutz ist kein Geschmacksurteil. Wer nachts arbeitet und tagsüber schlafen muss, verliert hier zuerst." },
      { speaker: "Moderatorin", text: "Frau Idrissi, Sie forschen zu Stadtlärm. Was übersehen beide Seiten?" },
      { speaker: "Frau Idrissi", text: "Beide reden über Dezibel, und Dezibel erklären erstaunlich wenig. Entscheidend ist die Vorhersagbarkeit. Ein Zug alle zwanzig Minuten stört messbar mehr und subjektiv weniger als unregelmäßige Stimmen im Hof." },
      { speaker: "Frau Idrissi", text: "Deshalb wirken Maßnahmen, die niemand für Lärmschutz hält: eine besetzte Tür, ein anderer Ausgang, eine Taxispur. Sie machen den Lärm nicht leiser, sie machen ihn erwartbar." },
      { speaker: "Herr Ruck", text: "Das deckt sich mit unserer Erfahrung. Seit wir zwei Leute vor der Tür haben, sind die Beschwerden um die Hälfte zurückgegangen, obwohl drinnen dieselbe Musik läuft." },
      { speaker: "Moderatorin", text: "Frau Perl, verändert das Ihre Praxis?" },
      { speaker: "Frau Perl", text: "Teilweise. Wir können Auflagen machen, aber wir können nicht verordnen, dass jemand freundlich ist. Was wir tun können: Beschwerden nicht mehr nur zählen, sondern nach Uhrzeit und Ort auswerten." },
      { speaker: "Frau Idrissi", text: "Und eines noch: Fragen Sie die, die nicht anrufen. Wer sich nicht beschwert, ist nicht unbedingt einverstanden. Er ist manchmal nur ausgezogen." },
      { speaker: "Moderatorin", text: "Ein guter Schlusssatz. Wir machen zehn Minuten Pause, danach nehmen wir Fragen aus dem Publikum." },
    ],
    questions: [
      {
        text: "Was ist laut Frau Perl das Kernproblem?",
        options: [
          "die ungleiche Verteilung des Lärms",
          "die insgesamt zu hohe Lautstärke",
          "die fehlenden gesetzlichen Regeln",
        ],
        answer: 0,
        explain: "„Es ist kein stadtweites Problem, es ist ein Verteilungsproblem.“",
      },
      {
        text: "Was ist laut Frau Idrissi entscheidend?",
        options: ["die Vorhersagbarkeit des Lärms", "die gemessene Lautstärke", "die Zahl der Beschwerden"],
        answer: 0,
        explain: "„Beide reden über Dezibel, und Dezibel erklären erstaunlich wenig. Entscheidend ist die Vorhersagbarkeit.“",
      },
      {
        kind: "truefalse",
        text: "Herr Ruck bestreitet, dass sein Club Lärm verursacht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kendi deneyimini paylaşıyor ve tedbirlerin işe yaradığını söylüyor; inkâr eden taraf o değil.",
      },
      {
        kind: "short_answer",
        text: "Was hat die Beschwerden bei Herrn Ruck halbiert?",
        options: [],
        answer: 0,
        accept: ["zwei Leute vor der Tür", "Personal vor der Tür", "eine besetzte Tür"],
        explain: "„Seit wir zwei Leute vor der Tür haben, sind die Beschwerden um die Hälfte zurückgegangen.“",
      },
      {
        kind: "dictation",
        text: "Frau Idrissi'nin son uyarısındaki ana cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Wer sich nicht beschwert, ist nicht unbedingt einverstanden.", "Wer sich nicht beschwert ist nicht unbedingt einverstanden"],
        explain: "„Wer sich nicht beschwert, ist nicht unbedingt einverstanden.“ — „wer“ cümlesi özneyi taşır ve fiili sonda kalır.",
      },
      {
        text: "Was will Frau Perl in ihrer Praxis ändern?",
        options: [
          "Beschwerden nach Zeit und Ort auswerten",
          "nachts deutlich mehr Kontrollen anordnen",
          "die Öffnungszeiten der Clubs verkürzen",
        ],
        answer: 0,
        explain: "„… Beschwerden nicht mehr nur zählen, sondern nach Uhrzeit und Ort auswerten.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w2",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Nachbetrachtung zu einem Vorfall",
    genre: "Değerlendirme notu",
    intro: "Ekibin için geriye dönük bir değerlendirme notu yazacaksın; önce iki cümle kur, sonra notu yaz.",
    gloss: [
      { de: "die Nachbetrachtung", tr: "geriye dönük değerlendirme", en: "retrospective" },
      { de: "die Abwägung", tr: "tartma", en: "weighing up" },
      { de: "leichtfertig", tr: "hafife alarak", en: "carelessly" },
      { de: "die Zuständigkeit", tr: "sorumluluk alanı", en: "responsibility" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bunu daha erken fark edebilirdik.",
        answer: "Wir hätten das früher bemerken können.",
        alternatives: ["Früher hätten wir das bemerken können."],
        hint: "Geçmişteki gerçekleşmemiş olanak: „hätte“ + iki mastar; modal fiil Partizip'e değil mastara döner.",
      },
      {
        kind: "build",
        tr: "Sanki hiç uyarı gelmemiş gibi davranıldı.",
        answer: "Man tat so, als wäre nie eine Warnung gekommen.",
        alternatives: ["Man tat so, als sei nie eine Warnung gekommen."],
        hint: "„als“ tek başına kullanılınca fiil hemen arkasından gelir; Konjunktiv I ya da II ikisi de doğrudur.",
      },
      {
        kind: "free",
        prompt:
          "Bir aksaklıktan sonra ekip için değerlendirme notu yaz: ne olduğu, o gün neyin neden savunulabilir olduğu, neyin başka türlü yapılabileceği, arkasındaki örüntü ve iki somut sonuç. Başlıklar kullan.",
        checklist: [
          "Olanı sayıyla ve zaman aralığıyla yaz",
          "O günkü kararın gerekçesini adil biçimde aktar",
          "Neyin başka türlü olabileceğini Konjunktiv II ile söyle",
          "Örüntüyü adlandır ve iki somut sonuç çıkar",
        ],
        minWords: 120,
        phrases: [
          { de: "Was passiert ist: …", tr: "Ne oldu: …" },
          { de: "Die Abwägung war damals vertretbar.", tr: "O günkü tercih savunulabilirdi." },
          { de: "Wir hätten … bemerken können.", tr: "… fark edebilirdik." },
          { de: "Rückblickend zeigt sich, dass …", tr: "Geriye bakınca … görülüyor" },
          { de: "Daraus folgen zwei Konsequenzen: …", tr: "Bundan iki sonuç çıkıyor: …" },
        ],
        sample:
          "Nachbetrachtung: Ausfall der Anmeldung am vierzehnten September\n\n" +
          "Was passiert ist: Zwischen acht und elf Uhr war das Anmeldeformular für die Herbstkurse nicht " +
          "erreichbar. Von zweihundertvierzig erwarteten Anmeldungen gingen in diesem Fenster vierzehn ein; " +
          "am Vortag waren es zur gleichen Zeit einhundertdrei.\n\n" +
          "Was damals entschieden wurde: Wir haben im Juni bewusst auf den Testlauf verzichtet, weil das " +
          "Formular seit zwei Jahren unverändert lief und die Zeit für die Übersetzung der Kursbeschreibungen " +
          "gebraucht wurde. Die Abwägung war damals vertretbar; sie war nicht leichtfertig.\n\n" +
          "Was anders hätte laufen können: Wir hätten die Änderung an der Bezahlseite früher bemerken können, " +
          "denn der Anbieter hatte sie drei Wochen vorher angekündigt. Die Mail lag in einem Postfach, das " +
          "niemandem zugeordnet war. Hätte es eine benannte Zuständigkeit gegeben, wäre der Hinweis nicht liegen " +
          "geblieben. Rückblickend zeigt sich außerdem, dass wir die Zahl der Anmeldungen behandelt haben, als " +
          "wäre sie ein Zufallswert; sie ist unsere wichtigste Kennzahl.\n\n" +
          "Muster: Nicht die Technik hat versagt, sondern die Zuordnung. Ein System ohne Namen dahinter meldet " +
          "sich nicht selbst.\n\n" +
          "Daraus folgen zwei Konsequenzen: Erstens bekommt jedes externe Postfach bis Monatsende eine " +
          "namentlich benannte Person. Zweitens läuft vor jeder Anmeldephase ein Testlauf von zwanzig Minuten; " +
          "er steht ab sofort im Kalender und nicht in einer Aufgabenliste.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s2",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Hätte man es wissen können?",
    genre: "Monolog",
    intro: "İki dakikaya kadar konuşacaksın: yaygın bir yargıyı sına, karşı tarafı hakkıyla anlat ve kendi ölçütünü kur.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir aksaklıktan sonra sık sık „bu önceden görülebilirdi“ denir. Bu yargı ne zaman haklı, ne zaman haksızdır? Bir konum al, karşı tarafı hakkıyla anlat ve kendi ölçütünü koy.",
      bulletsTr: [
        "Yargının neden hem doğru hem işe yaramaz olduğunu göster",
        "Yargıyı tümden reddetmenin neden kolaycılık olduğunu söyle",
        "Kendi ölçütünü parçalara ayır",
        "Ölçüt tutmadığında nereye varıldığını söyle",
      ],
      targets: [
        { de: "Wahr ist er, weil …", tr: "Doğru, çünkü …" },
        { de: "Trotzdem wäre es zu bequem, …", tr: "Yine de … fazla kolaycı olurdu" },
        { de: "Mein Kriterium hat drei Teile.", tr: "Ölçütümün üç parçası var." },
        { de: "… und tut so, als sei …", tr: "… ve sanki … gibi davranır" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Der Satz „Das hätte man wissen können“ ist fast immer wahr und fast immer wertlos. Wahr ist er, weil " +
        "sich nach einem Ereignis ein Pfad zeichnen lässt, auf dem jede Warnung an ihrem Platz steht. Wertlos " +
        "ist er, weil dieser Pfad vorher einer von zwanzig war und die anderen neunzehn danach niemand mehr " +
        "aufschreibt. Trotzdem wäre es zu bequem, den Vorwurf ganz abzuräumen. Es gibt Fälle, in denen er " +
        "berechtigt ist, und man kann sie erkennen. Mein Kriterium hat drei Teile. Erstens: Gab es eine benannte " +
        "Stelle, die den Hinweis hätte prüfen müssen? Zweitens: Wurde der Hinweis nicht nur gesendet, sondern " +
        "auch verstanden, also in einer Form, die eine Entscheidung ermöglicht hätte? Und drittens: Wäre die " +
        "Gegenmaßnahme im Rahmen dessen gewesen, was damals verfügbar war? Treffen alle drei zu, ist der Vorwurf " +
        "berechtigt, und zwar unabhängig davon, wie unwahrscheinlich das Ereignis war. Fehlt einer, redet man " +
        "nicht über Verantwortung, sondern über Glück — und tut so, als sei Glück eine Leistung.",
      rubricHint:
        "Konjunktiv II geçmiş biçimi beklenir (hätte prüfen müssen, wäre gewesen) ve ölçüt en az iki parçaya ayrılmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g2",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Hätte, wäre — und als ob",
    genre: "Kural",
    intro: "Geriye dönük yargının dili: olmamış bir geçmişi kurmak ve gerçekdışı bir benzetme yapmak.",
    focus: "Konjunktiv II geçmiş zaman ve als ob / als",
    gloss: [
      { de: "bemerken", tr: "fark etmek", en: "to notice" },
      { de: "geschehen", tr: "olmak", en: "to happen" },
      { de: "die Zuständigkeit", tr: "sorumluluk alanı", en: "responsibility" },
      { de: "liegen bleiben", tr: "el değmeden kalmak", en: "to be left lying" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Geçmişte tek bir biçim",
        tr: "Türkçede „gelseydi, görecektik“ gibi iki ayrı çekim vardır. Almancada Konjunktiv II'nin geçmişi için TEK bir biçim vardır: hätte ya da wäre + Partizip II. Hangi yardımcı fiilin geleceğini fiilin Perfekt'i belirler.",
        examples: [
          { de: "Wir hätten das früher bemerkt.", tr: "Bunu daha erken fark ederdik.", note: "haben ile" },
          { de: "Sie wäre gern gekommen.", tr: "Seve seve gelirdi.", note: "sein ile" },
          { de: "Hätte es eine Zuständigkeit gegeben, wäre der Hinweis nicht liegen geblieben.", tr: "Bir sorumlu olsaydı, uyarı el değmeden kalmazdı." },
        ],
      },
      {
        heading: "Modal fiil varsa çift mastar",
        tr: "Cümlede bir modal fiil varsa Partizip II kullanılmaz; iki mastar arka arkaya sona dizilir. „Wir hätten das bemerken können“ doğrudur, „gekonnt“ yanlıştır.",
        examples: [
          { de: "Wir hätten früher anrufen sollen.", tr: "Daha erken aramalıydık.", note: "anrufen sollen" },
          { de: "Das hätte man sehen müssen.", tr: "Bunun görülmesi gerekirdi." },
          { de: "Er hätte nicht gehen dürfen.", tr: "Gitmemesi gerekirdi." },
        ],
      },
      {
        heading: "als ob mı, als mı?",
        tr: "Gerçekdışı benzetmede iki dizim vardır. „als ob“ bir yan cümle açar ve fiili SONA atar. „als“ tek başına kullanılırsa fiil HEMEN arkasından gelir. İkisinde de Konjunktiv gerekir; Konjunktiv I ve II ikisi de kabul edilir.",
        examples: [
          { de: "Er tut so, als ob nichts geschehen wäre.", tr: "Sanki hiçbir şey olmamış gibi davranıyor.", note: "als ob, fiil sonda" },
          { de: "Er tut so, als wäre nichts geschehen.", tr: "Sanki hiçbir şey olmamış gibi davranıyor.", note: "als, fiil hemen arkada" },
          { de: "Sie redet, als sei sie dabei gewesen.", tr: "Sanki oradaymış gibi konuşuyor." },
        ],
      },
    ],
    questions: [
      {
        text: "Wir ___ das früher bemerken können.",
        options: ["hätten", "haben", "würden"],
        answer: 0,
        explain: "Geçmişte gerçekleşmemiş olanak „hätte“ + çift mastar ile kurulur.",
      },
      {
        text: "Wenn es nicht geregnet ___, wären wir gefahren.",
        options: ["hätte", "wäre", "hat"],
        answer: 0,
        explain: "„regnen“ Perfekt'te haben ile çekilir, bu yüzden hätte gelir.",
      },
      {
        text: "Er tut so, ___ nichts geschehen wäre.",
        options: ["als ob", "wie ob", "als dass"],
        answer: 0,
        explain: "Fiil sonda olduğu için yan cümle açan biçim gerekir: als ob.",
      },
      {
        kind: "gapfill",
        text: "Er tut so, als ___ nichts geschehen. (sein)",
        options: [],
        answer: 0,
        accept: ["wäre", "sei"],
        explain: "„als“ tek başına kullanıldığında fiil hemen arkasından gelir: als wäre nichts geschehen.",
      },
      {
        kind: "gapfill",
        text: "Sie ___ gestern gern gekommen, aber sie war krank. (sein)",
        options: [],
        answer: 0,
        accept: ["wäre"],
        explain: "„kommen“ Perfekt'te sein ile çekilir: sie wäre gekommen.",
      },
      {
        kind: "gapfill",
        text: "Wir hätten früher ___ (anrufen) sollen.",
        options: [],
        answer: 0,
        accept: ["anrufen"],
        explain: "Modal fiilin yanında Partizip değil mastar gelir: anrufen sollen.",
      },
      {
        kind: "gapfill",
        text: "Hätte es eine Zuständigkeit ___ (geben), wäre der Hinweis nicht liegen geblieben.",
        options: [],
        answer: 0,
        accept: ["gegeben"],
        explain: "Koşul yarısı da geçmiş Konjunktiv II'dir: hätte … gegeben.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "hätten", "das", "früher", "sehen", "müssen"],
        explain: "İki mastar sona ve modal en arkaya gider: Wir hätten das früher sehen müssen.",
      },
      {
        kind: "truefalse",
        text: "„Wir hätten das gekonnt bemerken.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Modal fiil Partizip'e dönmez; doğrusu „Wir hätten das bemerken können.“",
      },
      {
        kind: "truefalse",
        text: "„Er redet, als ob er dabei gewesen wäre.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„als ob“ yan cümle açar, fiil sonda ve Konjunktiv II geçmiş biçiminde; cümle doğru.",
      },
    ],
  },
];

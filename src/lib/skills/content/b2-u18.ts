import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 18 — "Ne kadar eder?".
 *
 * Dört ders: Angeblich sehenswert · Was ist Kunst wert? ·
 * Mehr Gehalt, bitte · Sparen oder anlegen? Dördü de bir değer iddiasıyla
 * uğraşıyor: kulaktan duyma tavsiye, piyasa fiyatı, kendi emeğinin karşılığı
 * ve paranın zaman içindeki değeri. Değer iddiası öznel kiple işaretlenir,
 * je-desto ile karşılaştırılır, Konjunktiv II ile pazarlığa açılır.
 *
 *   Ünite 18: der Reiseveranstalter, die Pauschalreise, die Besichtigung,
 *             der Fremdenverkehr, abgelegen, unberührt, malerisch,
 *             atemberaubend · die Sammlung, der Investor, die Spekulation,
 *             die Wertsteigerung, der Marktanteil, lukrativ, rentabel,
 *             umstritten · die Vergütung, die Gehaltserhöhung,
 *             der Stundenlohn, die Prämie, der Tarifvertrag,
 *             die Festanstellung, die Aufstiegschance, angemessen ·
 *             die Rendite, streuen, anlegen, die Ersparnis, das Guthaben,
 *             die Aktie, das Wertpapier, das Vermögen
 *   Kalıplar: … soll sehenswert sein · Ausgebucht sein dürfte … ·
 *             Je seltener …, desto wertvoller … · Ich hätte mir …
 *             vorgestellt · Gemessen an … · Je höher …, desto größer … ·
 *             Auf lange Sicht …
 *
 * Konjunktiv II'nin pazarlıktaki işlevi kibarlık değil, mesafe: "ich hätte mir
 * … vorgestellt" istenen rakamı söyler ama geri adım atmayı da açık bırakır.
 * Türkçedeki "düşünmüştüm" ile aynı işi görür.
 */
export const b2U18: SkillExercise[] = [
  {
    id: "b2-u18-r1",
    level: "B2",
    skill: "reading",
    unit: 18,
    title: "Was ist Kunst wert?",
    genre: "Deneme",
    intro: "Sanat piyasasının fiyatı nasıl kurduğunu anlatan bir yazı.",
    gloss: [
      { de: "die Sammlung", tr: "koleksiyon", en: "collection" },
      { de: "der Investor", tr: "yatırımcı", en: "investor" },
      { de: "die Spekulation", tr: "spekülasyon", en: "speculation" },
      { de: "die Wertsteigerung", tr: "değer artışı", en: "increase in value" },
      { de: "der Marktanteil", tr: "pazar payı", en: "market share" },
      { de: "lukrativ", tr: "kazançlı", en: "lucrative" },
      { de: "rentabel", tr: "kârlı", en: "profitable" },
      { de: "umstritten", tr: "tartışmalı", en: "contested" },
    ],
    minutes: 6,
    text:
      "WAS IST KUNST WERT?\n\n" +
      "Je seltener ein Werk ist, desto wertvoller wird es — so lautet die einfachste Regel des Kunstmarkts, und sie stimmt ungefähr so weit wie jede einfache Regel.\n\n" +
      "Denn Seltenheit allein reicht nicht. Es gibt Tausende seltene Bilder, für die niemand etwas zahlt. Ein Preis entsteht erst, wenn drei Dinge zusammenkommen: ein Werk, das schwer zu bekommen ist, eine Geschichte, die man erzählen kann, und mindestens zwei Menschen, die es beide wollen. Fehlt der dritte Punkt, hilft der Rest nicht.\n\n" +
      "Seit etwa zwanzig Jahren hat sich dabei etwas verschoben. Früher kauften Sammler, heute kaufen auch Investoren — Menschen also, die ein Bild nicht aufhängen, sondern einlagern. Für sie ist Kunst eine Anlageklasse unter anderen, und die Frage lautet nicht „gefällt es mir“, sondern „ist es rentabel“. Der Marktanteil dieser Käufergruppe ist umstritten; niemand weiß ihn genau, weil viele Käufe über Gesellschaften laufen.\n\n" +
      "Was folgt daraus? Erstens: Die Preise oben steigen schneller als die Preise unten. Die teuersten zwei Prozent der Werke machen einen erheblichen Teil des gesamten Umsatzes aus. Zweitens: Die Wertsteigerung ist keineswegs sicher. Für jedes Werk, das lukrativ weiterverkauft wird, gibt es mehrere, die nach zehn Jahren weniger bringen als der Kaufpreis — nur redet darüber niemand.\n\n" +
      "Und die Spekulation? Sie ist alt. Neu ist die Geschwindigkeit: Ein Werk, das früher fünfzehn Jahre in einer Sammlung blieb, wechselt heute oft nach drei Jahren wieder den Besitzer. Wer damit rechnet, kauft keine Kunst. Er kauft ein Wertpapier mit Rahmen.",
    questions: [
      {
        kind: "gapfill",
        text: "Je seltener ein Werk ist, ___ wertvoller wird es.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "je yan cümlede, desto ana cümlede; iki yarı da karşılaştırma biçimi ister.",
      },
      {
        text: "Was muss für einen Preis zusammenkommen?",
        options: [
          "nur Seltenheit",
          "Seltenheit, eine Geschichte und mindestens zwei Interessenten",
          "ein Investor und eine Sammlung",
        ],
        answer: 1,
        explain: "„…ein Werk, das schwer zu bekommen ist, eine Geschichte … und mindestens zwei Menschen, die es beide wollen.“",
      },
      {
        kind: "short_answer",
        text: "Was fragen Investoren statt „gefällt es mir“?",
        options: [],
        answer: 0,
        accept: ["ist es rentabel", "ob es rentabel ist", "lohnt es sich"],
        explain: "„…die Frage lautet nicht 'gefällt es mir', sondern 'ist es rentabel'.“",
      },
      {
        text: "Warum ist der Marktanteil der Investoren umstritten?",
        options: [
          "weil viele Käufe über Gesellschaften laufen",
          "weil es keine Investoren gibt",
          "weil Museen nicht mitzählen",
        ],
        answer: 0,
        explain: "„…niemand weiß ihn genau, weil viele Käufe über Gesellschaften laufen.“",
      },
      {
        text: "Eine Wertsteigerung ist bei Kunst sicher.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Wertsteigerung ist keineswegs sicher.“",
      },
    ],
  },

  {
    id: "b2-u18-r2",
    level: "B2",
    skill: "reading",
    unit: 18,
    title: "Sparen oder anlegen?",
    genre: "Tüketici rehberi",
    intro: "Bir tüketici derneğinin birikim rehberi. Risk ile getiri arasındaki bağa dikkat et.",
    gloss: [
      { de: "die Rendite", tr: "getiri", en: "return" },
      { de: "streuen", tr: "riski dağıtmak", en: "to diversify" },
      { de: "anlegen", tr: "yatırmak", en: "to invest" },
      { de: "die Ersparnis", tr: "birikim", en: "savings" },
      { de: "das Guthaben", tr: "bakiye", en: "balance" },
      { de: "die Aktie", tr: "hisse senedi", en: "share" },
      { de: "das Wertpapier", tr: "menkul kıymet", en: "security" },
      { de: "das Vermögen", tr: "servet", en: "wealth" },
    ],
    minutes: 6,
    text:
      "SPAREN ODER ANLEGEN? VIER SÄTZE, DIE REICHEN\n\n" +
      "Erstens: Je höher die erwartete Rendite, desto größer das Risiko. Diesen Satz kann man nicht umgehen. Wer Ihnen hohe Rendite ohne Risiko verspricht, hat entweder etwas nicht verstanden oder rechnet damit, dass Sie es nicht verstehen.\n\n" +
      "Zweitens: Bevor Sie anlegen, brauchen Sie eine Reserve. Drei Nettogehälter als Guthaben auf einem jederzeit verfügbaren Konto — nicht als Rendite gedacht, sondern damit Sie bei einer kaputten Waschmaschine nicht zum falschen Zeitpunkt verkaufen müssen.\n\n" +
      "Drittens: Streuen Sie. Eine einzelne Aktie kann alles verlieren, ein breit gestreutes Wertpapier auf hunderte Unternehmen praktisch nicht. Das ist keine Meinung, das ist Arithmetik. Streuen kostet außerdem nichts — im Gegenteil, breite Produkte sind meist die billigsten.\n\n" +
      "Viertens: Auf lange Sicht zählt vor allem die Zeit. Wer mit dreißig anfängt und monatlich einen kleinen Betrag anlegt, steht mit sechzig besser da als jemand, der mit fünfzig das Doppelte einzahlt. Nicht weil er klüger ist, sondern weil er länger dabei war.\n\n" +
      "Und die Ersparnis auf dem Sparbuch? Sie ist nicht falsch, aber sie ist kein Vermögensaufbau. Bei zwei Prozent Inflation verliert Geld, das gar nichts bringt, in zehn Jahren rund ein Fünftel seiner Kaufkraft — langsam genug, dass es niemand merkt.\n\n" +
      "Was wir nicht sagen können: welches Produkt für Sie passt. Das hängt davon ab, wie lange Sie das Geld nicht brauchen — und wie ruhig Sie schlafen wollen.",
    questions: [
      {
        kind: "gapfill",
        text: "Je höher die erwartete Rendite, ___ größer das Risiko.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "je-desto iki niceliği bağlar; burada fiil elipsle düşmüş, kalıp yine de tanınır.",
      },
      {
        text: "Wozu dient die Reserve von drei Nettogehältern?",
        options: [
          "zur Rendite",
          "damit man nicht zum falschen Zeitpunkt verkaufen muss",
          "als Anzahlung für eine Wohnung",
        ],
        answer: 1,
        explain: "„…damit Sie bei einer kaputten Waschmaschine nicht zum falschen Zeitpunkt verkaufen müssen.“",
      },
      {
        kind: "short_answer",
        text: "Was zählt auf lange Sicht vor allem?",
        options: [],
        answer: 0,
        accept: ["die Zeit", "die Dauer", "wie lange man dabei ist"],
        explain: "„Auf lange Sicht zählt vor allem die Zeit.“",
      },
      {
        text: "Was passiert mit Geld ohne Ertrag bei zwei Prozent Inflation?",
        options: [
          "Es verliert in zehn Jahren rund ein Fünftel seiner Kaufkraft.",
          "Es bleibt gleich viel wert.",
          "Es verdoppelt sich in zehn Jahren.",
        ],
        answer: 0,
        explain: "„…verliert Geld, das gar nichts bringt, in zehn Jahren rund ein Fünftel seiner Kaufkraft.“",
      },
      {
        text: "Streuen ist teuer.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Streuen kostet außerdem nichts — im Gegenteil, breite Produkte sind meist die billigsten.“",
      },
    ],
  },

  {
    id: "b2-u18-l1",
    level: "B2",
    skill: "listening",
    unit: 18,
    title: "Angeblich sehenswert",
    genre: "Diyalog",
    intro: "Bir tatil önerisi konuşuluyor — ama bilgi hep başkasından geliyor.",
    gloss: [
      { de: "der Reiseveranstalter", tr: "tur operatörü", en: "tour operator" },
      { de: "die Pauschalreise", tr: "paket tur", en: "package holiday" },
      { de: "die Besichtigung", tr: "gezme", en: "sightseeing" },
      { de: "der Fremdenverkehr", tr: "turist hareketliliği", en: "tourism" },
      { de: "abgelegen", tr: "ücra", en: "remote" },
      { de: "unberührt", tr: "el değmemiş", en: "untouched" },
      { de: "malerisch", tr: "resim gibi", en: "picturesque" },
      { de: "atemberaubend", tr: "nefes kesici", en: "breathtaking" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Jonna", text: "Kollegen haben mir das Tal empfohlen. Es soll wirklich sehenswert sein." },
      { speaker: "Ansgar", text: "Wer sagt das? Der Reiseveranstalter oder jemand, der da war?" },
      { speaker: "Jonna", text: "Beides. Aber ehrlich gesagt weiß ich nicht mehr, wer was gesagt hat." },
      { speaker: "Ansgar", text: "Genau das ist das Problem. Im Prospekt ist jedes Tal malerisch." },
      { speaker: "Jonna", text: "Die Fotos sind jedenfalls atemberaubend. Unberührte Landschaft, keine Menschen drauf." },
      { speaker: "Ansgar", text: "Keine Menschen auf dem Foto heißt nicht keine Menschen im Tal." },
      { speaker: "Jonna", text: "Stimmt. Angeblich ist es aber ziemlich abgelegen." },
      { speaker: "Ansgar", text: "Dann prüf den Fremdenverkehr für Juli. Ausgebucht sein dürfte dort alles." },
      { speaker: "Jonna", text: "Es gibt eine Pauschalreise mit Bus und zwei Besichtigungen." },
      { speaker: "Ansgar", text: "Und was steht im Kleingedruckten? Zwei Besichtigungen können zwei Stunden sein." },
      { speaker: "Jonna", text: "Ich schaue nach. Vielleicht fahren wir doch selbst." },
      { speaker: "Ansgar", text: "Wäre mir lieber. Dann entscheiden wir vor Ort, was sich lohnt." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Jonna'nın vadiyi ilk anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Es soll wirklich sehenswert sein."],
        explain: "sollen öznel kip: bilgi başkasından geliyor, konuşan sahiplenmiyor.",
      },
      {
        text: "Warum überzeugt Ansgar das Foto nicht?",
        options: [
          "weil keine Menschen auf dem Foto keine Menschen im Tal bedeutet",
          "weil das Foto alt ist",
          "weil er das Tal kennt",
        ],
        answer: 0,
        explain: "„Keine Menschen auf dem Foto heißt nicht keine Menschen im Tal.“",
      },
      {
        kind: "short_answer",
        text: "Was soll Jonna für Juli prüfen?",
        options: [],
        answer: 0,
        accept: ["den Fremdenverkehr", "ob alles ausgebucht ist", "die Auslastung"],
        explain: "„Dann prüf den Fremdenverkehr für Juli. Ausgebucht sein dürfte dort alles.“",
      },
      {
        text: "Was ist in der Pauschalreise enthalten?",
        options: ["Bus und zwei Besichtigungen", "nur der Bus", "Flug und Hotel"],
        answer: 0,
        explain: "„Es gibt eine Pauschalreise mit Bus und zwei Besichtigungen.“",
      },
      {
        text: "Jonna weiß genau, wer ihr das Tal empfohlen hat.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…ehrlich gesagt weiß ich nicht mehr, wer was gesagt hat.“",
      },
    ],
  },

  {
    id: "b2-u18-l2",
    level: "B2",
    skill: "listening",
    unit: 18,
    title: "Mehr Gehalt, bitte",
    genre: "Diyalog",
    intro: "Maaş görüşmesi. Rakam nasıl söyleniyor, geri adım nasıl açık bırakılıyor?",
    gloss: [
      { de: "die Vergütung", tr: "ücretlendirme", en: "remuneration" },
      { de: "die Gehaltserhöhung", tr: "maaş zammı", en: "pay rise" },
      { de: "der Stundenlohn", tr: "saat ücreti", en: "hourly wage" },
      { de: "die Prämie", tr: "prim", en: "bonus" },
      { de: "der Tarifvertrag", tr: "toplu iş sözleşmesi", en: "collective agreement" },
      { de: "die Festanstellung", tr: "kadrolu iş", en: "permanent position" },
      { de: "die Aufstiegschance", tr: "yükselme fırsatı", en: "promotion prospect" },
      { de: "angemessen", tr: "makul", en: "appropriate" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Pelin", text: "Danke für den Termin. Ich möchte über meine Vergütung sprechen." },
      { speaker: "Vogt", text: "Gerne. Sie sind seit zwei Jahren in Festanstellung, richtig?" },
      { speaker: "Pelin", text: "Seit zweieinhalb. Gemessen an dem, was ich übernommen habe, wäre eine Anpassung angemessen." },
      { speaker: "Vogt", text: "An welche Größenordnung denken Sie?" },
      { speaker: "Pelin", text: "Ich hätte mir sieben Prozent vorgestellt." },
      { speaker: "Vogt", text: "Eine Gehaltserhöhung in dieser Höhe ist deutlich mehr, als wir üblicherweise machen." },
      { speaker: "Pelin", text: "Das ist mir bewusst. Ich führe seit einem Jahr das Team und habe zwei Projekte übernommen." },
      { speaker: "Vogt", text: "Wir sind allerdings an den Tarifvertrag gebunden, beim Stundenlohn wie beim Gehalt." },
      { speaker: "Pelin", text: "Beim Grundgehalt ja. Eine Prämie wäre davon unabhängig, wenn ich das richtig sehe." },
      { speaker: "Vogt", text: "Das stimmt. Vier Prozent könnte ich zusagen, plus eine Prämie im Frühjahr." },
      { speaker: "Pelin", text: "Und die Aufstiegschance auf die Teamleitung — bleibt das ein Thema?" },
      { speaker: "Vogt", text: "Ja. Die Stelle wird im Herbst ausgeschrieben, das sage ich Ihnen jetzt schon." },
      { speaker: "Pelin", text: "Dann nehme ich die vier Prozent und komme im Herbst wieder." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Pelin'in beklediği rakamı söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ich hätte mir sieben Prozent vorgestellt."],
        explain: "Konjunktiv II rakamı söyler ama geri adımı açık bırakır — kibarlık değil, mesafe.",
      },
      {
        text: "Wie lange arbeitet Pelin schon dort?",
        options: ["zwei Jahre", "zweieinhalb Jahre", "ein Jahr"],
        answer: 1,
        explain: "„Seit zweieinhalb.“",
      },
      {
        kind: "short_answer",
        text: "Was bietet Vogt am Ende an?",
        options: [],
        answer: 0,
        accept: ["vier Prozent und eine Prämie", "vier Prozent", "4 Prozent plus Prämie"],
        explain: "„Vier Prozent könnte ich zusagen, plus eine Prämie im Frühjahr.“",
      },
      {
        text: "Warum ist eine Prämie möglich?",
        options: [
          "weil sie vom Tarifvertrag unabhängig ist",
          "weil der Tarifvertrag sie vorschreibt",
          "weil Pelin befristet arbeitet",
        ],
        answer: 0,
        explain: "„Beim Grundgehalt ja. Eine Prämie wäre davon unabhängig.“",
      },
      {
        text: "Die Teamleitungsstelle wird nicht ausgeschrieben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Stelle wird im Herbst ausgeschrieben, das sage ich Ihnen jetzt schon.“",
      },
    ],
  },

  {
    id: "b2-u18-w1",
    level: "B2",
    skill: "writing",
    unit: 18,
    title: "Değer, karşılaştırma, pazarlık",
    genre: "Cümle kurma",
    intro: "soll iddiayı, je-desto karşılaştırmayı, Konjunktiv II ise pazarlık payını taşır.",
    gloss: [
      { de: "malerisch", tr: "resim gibi", en: "picturesque" },
      { de: "die Rendite", tr: "getiri", en: "return" },
      { de: "angemessen", tr: "makul", en: "appropriate" },
      { de: "anlegen", tr: "yatırmak", en: "to invest" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Vadi gerçekten görülmeye değermiş.",
        answer: "Das Tal soll wirklich sehenswert sein",
        hint: "sollen öznel kip: bilgi başkasından, konuşan sahiplenmiyor.",
      },
      {
        kind: "build",
        tr: "Beklenen getiri ne kadar yüksekse risk o kadar büyüktür.",
        answer: "Je höher die erwartete Rendite ist, desto größer ist das Risiko",
        hint: "je yan cümlede fiil sonda; desto'dan sonra fiil hemen gelir.",
      },
      {
        kind: "build",
        tr: "Yüzde yedi düşünmüştüm.",
        answer: "Ich hätte mir sieben Prozent vorgestellt",
        hint: "Konjunktiv II: rakam söylenir ama kapı kapanmaz.",
      },
      {
        kind: "build",
        tr: "Üstlendiklerime bakılırsa bir düzenleme makul olurdu.",
        answer: "Gemessen an dem, was ich übernommen habe, wäre eine Anpassung angemessen",
        hint: "gemessen an ölçütü verir; ana cümlede yine Konjunktiv II.",
      },
      {
        kind: "rewrite",
        prompt: "Doğrudan talebi Konjunktiv II ile pazarlığa açık hale getir.",
        source: "Ich will zehn Prozent mehr.",
        answer: "Ich hätte mir zehn Prozent vorgestellt.",
        alternatives: [
          "Ich hätte mir zehn Prozent vorgestellt",
          "Ich hätte an zehn Prozent gedacht.",
        ],
        why: "Konjunktiv II burada kibarlık değil müzakere tekniği: rakam açıkça söylenir, ama biçim geri adım atmayı utandırıcı olmaktan çıkarır. 'Ich will' ise tek bir cevaba yer bırakır - evet ya da hayır. Türkçedeki 'düşünmüştüm' de aynı işi görür.",
      },
    ],
  },

  {
    id: "b2-u18-w2",
    level: "B2",
    skill: "writing",
    unit: 18,
    title: "Die Anfrage vor dem Gespräch",
    genre: "Resmî e-posta",
    intro: "Maaş görüşmesi iste ve gerekçeni önceden yaz — rakamı söyle ama kapıyı kapatma.",
    gloss: [
      { de: "die Vergütung", tr: "ücretlendirme", en: "remuneration" },
      { de: "die Gehaltserhöhung", tr: "maaş zammı", en: "pay rise" },
      { de: "die Festanstellung", tr: "kadrolu iş", en: "permanent position" },
      { de: "die Aufstiegschance", tr: "yükselme fırsatı", en: "promotion prospect" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Yöneticine bir e-posta yaz ve ücretini konuşmak için görüşme iste. Şu sırayı tut: kısa selam ve konu, ne zamandır ve hangi görevde olduğun, bu süre içinde neyin değiştiği, beklediğin büyüklük ve bir görüşme önerisi. Rakamı Konjunktiv II ile ver -ich hätte mir … vorgestellt- ve gerekçeyi gemessen an ile bağla. Duygusal olma, tehdit etme; sayılabilir şeyler yaz.",
        checklist: [
          "Konu ilk iki cümlede belli mi?",
          "Üstlenilen işler somut olarak sayılmış mı?",
          "Rakam Konjunktiv II ile verilmiş mi?",
          "Sonda somut bir görüşme önerisi var mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Ich hätte mir … vorgestellt.", tr: "… düşünmüştüm", en: "I had in mind …" },
          { de: "Gemessen an den übernommenen Aufgaben …", tr: "üstlendiğim işlere bakılırsa …", en: "measured against the tasks taken on …" },
          { de: "Über einen Termin würde ich mich freuen.", tr: "bir randevu için sevinirim", en: "I would be glad of an appointment" },
        ],
        sample:
          "Betreff: Bitte um ein Gespräch über meine Vergütung\n\n" +
          "Sehr geehrte Frau Kern,\n\n" +
          "ich möchte Sie um einen Termin bitten, in dem wir über meine Vergütung sprechen.\n\n" +
          "Ich bin seit zweieinhalb Jahren im Haus und seit einem Jahr in der Festanstellung. In dieser Zeit haben sich meine Aufgaben deutlich verändert: Ich betreue seit März die beiden großen Kunden allein, habe die Einarbeitung von zwei neuen Kolleginnen übernommen und führe seit dem Sommer die wöchentliche Planung.\n\n" +
          "Gemessen an diesen Aufgaben hätte ich mir eine Anpassung um sieben Prozent vorgestellt. Mir ist bewusst, dass das Grundgehalt an den Tarif gebunden ist; über die Form — Erhöhung, Prämie oder eine Kombination — würde ich gern mit Ihnen sprechen.\n\n" +
          "Außerdem würde mich interessieren, wie Sie meine Aufstiegschancen für das kommende Jahr einschätzen.\n\n" +
          "Über einen Termin in den nächsten zwei Wochen würde ich mich freuen.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];

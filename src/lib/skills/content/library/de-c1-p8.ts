import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 çalışma hayatının yazılmamış kuralları: bir blog yazısı, bir
 * tartışma yayını, eski bir meslektaşa mektup. Dil bilgisi genişletilmiş
 * niteleyiciler — C1 metninin yoğunluğu buradan geliyor.
 */
export const deC1P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r8",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Die Regeln, die niemand aufschreibt",
    genre: "blog",
    intro: "Bir blog yazısı: işe yeni girenin göremediği sessiz kurallar ve bunların kime yaradığı.",
    gloss: [
      { de: "die Gepflogenheit", tr: "teamül", en: "custom" },
      { de: "die Einarbeitung", tr: "uyum süreci", en: "induction" },
      { de: "das Selbstverständnis", tr: "kendini görme biçimi", en: "self-image" },
      { de: "verunsichern", tr: "tedirgin etmek", en: "to unsettle" },
      { de: "die Besprechung", tr: "toplantı", en: "meeting" },
      { de: "entschlüsseln", tr: "çözmek", en: "to decode" },
    ],
    minutes: 10,
    text:
      "Die Regeln, die niemand aufschreibt\n\n" +
      "Jede Organisation hat zwei Regelwerke. Das eine steht im Handbuch und wird in der " +
      "Einarbeitung durchgegangen. Das andere steht nirgends und entscheidet trotzdem darüber, " +
      "ob jemand nach einem halben Jahr dazugehört.\n\n" +
      "Zu diesem zweiten Regelwerk gehören Sätze, die niemand als Regel erkennt: " +
      "wie lange man auf eine Mail wartet, bevor man nachfragt; ob man in einer Besprechung " +
      "unterbricht oder die Hand hebt; ob ein am Freitagabend verschickter Entwurf als " +
      "Fleiß oder als Belästigung gilt.\n\n" +
      "Die verbreitete Erklärung lautet, dass sich solche Gepflogenheiten von selbst vermitteln. " +
      "Genau das tun sie aber nicht. Sie vermitteln sich an Menschen, die den Leuten, " +
      "die sie schon kennen, ähnlich genug sind, um sie abzulesen. " +
      "Wer aus einer anderen Branche kommt, aus einem anderen Land oder aus einer Familie " +
      "ohne Bürobiografie, entschlüsselt dieselben Signale langsamer und zahlt dafür mit " +
      "Fehlern, die wie Charakterfehler aussehen.\n\n" +
      "Der in solchen Fällen gern gegebene Rat — „frag doch einfach“ — verkennt das Problem. " +
      "Man kann nur nach Regeln fragen, von deren Existenz man weiß. " +
      "Die wirksamsten ungeschriebenen Regeln sind aber gerade die, die für alle Beteiligten " +
      "so selbstverständlich sind, dass sie als Regel gar nicht wahrgenommen werden.\n\n" +
      "Was hilft, ist unspektakulär: eine Liste. Nicht das Handbuch, sondern eine halbe Seite, " +
      "auf der drei Leute aufschreiben, was sie im ersten Jahr falsch gemacht haben. " +
      "Eine solche Liste verunsichert niemanden; sie nimmt nur einer Sache den Anschein " +
      "des Natürlichen.",
    questions: [
      {
        text: "Was unterscheidet das zweite Regelwerk vom ersten?",
        options: [
          "Es ist strenger.",
          "Es steht nirgends, entscheidet aber über Zugehörigkeit.",
          "Es gilt nur für Führungskräfte.",
        ],
        answer: 1,
        explain: "El kitabı yerine hiçbir yerde yazmıyor ama aidiyeti belirliyor.",
      },
      {
        text: "Warum vermitteln sich die Regeln laut Text NICHT von selbst?",
        options: [
          "Sie sind zu kompliziert.",
          "Sie erreichen nur die, die den Vorhandenen ähnlich genug sind.",
          "Sie ändern sich ständig.",
        ],
        answer: 1,
        explain: "Metin aktarımın benzerliğe bağlı olduğunu söylüyor.",
      },
      {
        kind: "truefalse",
        text: "Der Text hält den Rat „frag doch einfach“ für unzureichend.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Varlığını bilmediğin bir kuralı soramazsın; bu yüzden öğüt sorunu ıskalıyor.",
      },
      {
        kind: "gapfill",
        text: "Der Vorschlag am Ende ist eine halbe Seite von ___ Leuten.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„auf der drei Leute aufschreiben, was sie im ersten Jahr falsch gemacht haben“.",
      },
      {
        kind: "short_answer",
        text: "Wie sehen die Fehler von Neuen laut Text aus?",
        options: [],
        answer: 0,
        accept: ["wie Charakterfehler", "als Charakterfehler", "wie Charakterfehler aussehen"],
        explain: "„zahlt dafür mit Fehlern, die wie Charakterfehler aussehen“.",
      },
      {
        text: "Was bewirkt die vorgeschlagene Liste?",
        options: [
          "Sie nimmt den Regeln den Anschein des Natürlichen.",
          "Sie ersetzt das Handbuch.",
          "Sie verhindert alle Fehler.",
        ],
        answer: 0,
        explain: "Son cümle tam bunu söylüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l8",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Streitgespräch: Transparenz oder Takt?",
    genre: "opinion",
    intro: "İki konuk tartışıyor: maaşların açıklanması adalet mi getirir, huzursuzluk mu.",
    gloss: [
      { de: "die Offenlegung", tr: "açıklama", en: "disclosure" },
      { de: "die Bezeichnung", tr: "unvan", en: "job title" },
      { de: "die Verhandlung", tr: "pazarlık", en: "negotiation" },
      { de: "die Vermutung", tr: "tahmin", en: "assumption" },
      { de: "die Unzufriedenheit", tr: "hoşnutsuzluk", en: "dissatisfaction" },
      { de: "die Zumutung", tr: "kabul edilemez şey", en: "imposition" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Frau Lehmann", text: "Solange Gehälter Privatsache sind, verhandelt jeder gegen ein Gerücht. Wer gut verhandeln gelernt hat, gewinnt — nicht, wer gute Arbeit macht." },
      { speaker: "Herr Bartsch", text: "Das bestreite ich gar nicht. Ich bestreite, dass die Offenlegung das löst. Sie verschiebt den Streit nur von der Verhandlung in den Flur." },
      { speaker: "Frau Lehmann", text: "Der Streit im Flur ist immerhin ein Streit über etwas Nachprüfbares. Heute streiten die Leute über Vermutungen." },
      { speaker: "Herr Bartsch", text: "Und über Zahlen, die den Fall nicht erklären. Zwei Kollegen mit derselben Bezeichnung können völlig unterschiedliche Aufgaben haben." },
      { speaker: "Frau Lehmann", text: "Dann beschreibt die Bezeichnung die Aufgabe schlecht. Das ist ein Argument für bessere Beschreibungen, nicht gegen Transparenz." },
      { speaker: "Herr Bartsch", text: "Zugestanden. Trotzdem sehe ich, was in Betrieben passiert, die es eingeführt haben: In den ersten Monaten steigt die Unzufriedenheit deutlich." },
      { speaker: "Frau Lehmann", text: "Und danach? In den Untersuchungen, die ich kenne, sinkt sie unter das Ausgangsniveau, sobald die Bänder erklärt sind." },
      { speaker: "Herr Bartsch", text: "Wenn sie erklärt werden. Genau daran scheitert es meistens: Man veröffentlicht Zahlen und nennt das Transparenz." },
      { speaker: "Frau Lehmann", text: "Da sind wir uns einig. Eine Zahl ohne Begründung ist keine Transparenz, sondern eine Zumutung." },
    ],
    questions: [
      {
        text: "Was kritisiert Frau Lehmann am jetzigen Zustand?",
        options: [
          "dass jeder gegen ein Gerücht verhandelt",
          "dass zu viel über Geld gesprochen wird",
          "dass die Gehälter zu niedrig sind",
        ],
        answer: 0,
        explain: "İyi pazarlık eden kazanıyor, iyi iş yapan değil.",
      },
      {
        text: "Was ist Herrn Bartschs Haupteinwand?",
        options: [
          "Offenlegung verschiebt den Streit nur.",
          "Offenlegung ist rechtlich unmöglich.",
          "Niemand interessiert sich dafür.",
        ],
        answer: 0,
        explain: "„Sie verschiebt den Streit nur von der Verhandlung in den Flur.“",
      },
      {
        kind: "truefalse",
        text: "Die beiden finden am Ende keinen gemeinsamen Punkt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Gerekçesiz bir sayının şeffaflık olmadığında anlaşıyorlar.",
      },
      {
        kind: "gapfill",
        text: "Laut Frau Lehmann sinkt die Unzufriedenheit, sobald die ___ erklärt sind.",
        options: [],
        answer: 0,
        accept: ["Bänder", "Bandbreiten"],
        explain: "„sobald die Bänder erklärt sind“.",
      },
      {
        kind: "short_answer",
        text: "Was passiert laut Bartsch in den ersten Monaten?",
        options: [],
        answer: 0,
        accept: [
          "die Unzufriedenheit steigt",
          "Unzufriedenheit steigt",
          "sie steigt deutlich",
        ],
        explain: "„In den ersten Monaten steigt die Unzufriedenheit deutlich.“",
      },
      {
        text: "Wie reagiert Frau Lehmann auf das Argument mit den gleichen Bezeichnungen?",
        options: [
          "Sie hält es für ein Argument für bessere Beschreibungen.",
          "Sie bestreitet die Tatsache.",
          "Sie hält es für entscheidend.",
        ],
        answer: 0,
        explain: "Argümanı şeffaflığa değil, tanımlara çeviriyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w8",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Brief an eine Nachfolgerin",
    genre: "letter",
    intro: "Bıraktığın görevi devralan kişiye yazıyorsun: önce iki cümle kur, sonra yazılmamış kuralları aktaran bir mektup yaz.",
    gloss: [
      { de: "die Nachfolgerin", tr: "halef", en: "successor" },
      { de: "die Übergabe", tr: "devir", en: "handover" },
      { de: "die Eigenart", tr: "kendine özgü yan", en: "peculiarity" },
      { de: "bevormunden", tr: "vesayet altına almak", en: "to patronise" },
      { de: "die Zurückhaltung", tr: "çekingenlik", en: "restraint" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Cuma akşamı gönderilen bir taslak burada rahatsız edici sayılır.",
        answer: "Ein am Freitagabend verschickter Entwurf gilt hier als Belästigung.",
        alternatives: ["Ein Entwurf, der am Freitagabend verschickt wird, gilt hier als Belästigung."],
        hint: "Genişletilmiş niteleyici: Partizip II, artikel ile isim arasına girer.",
      },
      {
        kind: "build",
        tr: "Yıllardır tartışılan konu hâlâ çözülmedi.",
        answer: "Die seit Jahren diskutierte Frage ist noch immer ungeklärt.",
        alternatives: ["Die Frage, die seit Jahren diskutiert wird, ist noch immer ungeklärt."],
        hint: "Süre bildiren öbek de niteleyicinin içine girer ve sıfat gibi çekimlenir.",
      },
      {
        kind: "free",
        prompt:
          "Görevi devralan kişiye mektup yaz: neyi devrettiğini kısaca söyle, işin yazılmamış üç kuralını adlandır ve nereden geldiklerini açıkla, hangisine uymamanı tavsiye ettiğini yaz, kendi yanılgılarından birini kabul et ve yardım önerisiyle bitir.",
        checklist: [
          "Neyi devrettiğini ve mektubun amacını yaz",
          "Üç yazılmamış kuralı adlandır ve kaynağını açıkla",
          "Hangisine uymaması gerektiğini söyle",
          "Kendi yanılgını kabul et ve yardım öner",
        ],
        minWords: 150,
        phrases: [
          { de: "Vieles steht im Handbuch, dies hier nicht.", tr: "Çoğu şey el kitabında var, bunlar yok.", en: "A lot is in the handbook; this is not." },
          { de: "Es hat sich eingebürgert, dass …", tr: "… yerleşmiş durumda", en: "It has become customary that …" },
          { de: "Dahinter steckt weniger eine Regel als …", tr: "Arkasında bir kuraldan çok … var", en: "Behind it lies less a rule than …" },
          { de: "Ich würde dir raten, dich gerade daran nicht zu halten.", tr: "Tam da buna uymamanı tavsiye ederim.", en: "I would advise you not to follow that one." },
          { de: "Rückblickend habe ich unterschätzt, wie sehr …", tr: "Geriye bakınca … olduğunu hafife almışım", en: "In hindsight I underestimated how much …" },
        ],
        sample:
          "Liebe Frau Neumann, vieles steht im Handbuch, dies hier nicht — und genau deshalb " +
          "schreibe ich es auf, bevor ich es vergesse. " +
          "Erstens: Es hat sich eingebürgert, dass Anfragen an die Fachabteilung erst nach " +
          "drei Tagen nachgefasst werden. Dahinter steckt weniger eine Regel als die Erinnerung " +
          "an eine Kollegin, die vor Jahren für zu häufiges Nachfragen kritisiert wurde. " +
          "Zweitens: Ein am Freitagabend verschickter Entwurf gilt hier als Belästigung, " +
          "auch wenn niemand das je gesagt hat. Ich habe das in meinem ersten Monat zweimal " +
          "getan und bis heute nicht verstanden, warum die Reaktionen so kühl waren. " +
          "Drittens: In der Montagsrunde spricht man nicht als Erste, sondern wartet, " +
          "bis die Leitung eine Richtung angedeutet hat. " +
          "An diese dritte Gepflogenheit würde ich dir raten, dich gerade nicht zu halten. " +
          "Sie schützt niemanden, sie verlängert nur die Sitzung, und die seit Jahren " +
          "diskutierte Frage der Zuständigkeiten ist auch deshalb ungeklärt. " +
          "Rückblickend habe ich unterschätzt, wie sehr solche Kleinigkeiten darüber " +
          "entscheiden, ob man gehört wird. " +
          "Wenn du in den ersten Wochen etwas seltsam findest, schreib mir; " +
          "ich kann dir meistens sagen, woher es kommt.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s8",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Sollten Gehälter offenliegen?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir konum al, karşı tarafın en iyi argümanını kendin kur.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kurumlar maaş aralıklarını açıklamalı mı? Konumunu söyle, karşı tarafın en güçlü argümanını kendin kur ve ona cevap ver, açıklamanın hangi koşulda zarar vereceğini anlat ve bir uygulama biçimi öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Karşı tarafın en güçlü argümanını kendin kur",
        "Ona cevap ver ve bir koşul ekle",
        "Somut bir uygulama biçimi öner",
      ],
      targets: [
        { de: "Ich halte die Offenlegung für richtig, allerdings nicht in der Form, …", tr: "Açıklamayı doğru buluyorum, ama … biçiminde değil" },
        { de: "Das beste Gegenargument ist nicht …, sondern …", tr: "En iyi karşı argüman … değil, …" },
        { de: "Schaden richtet sie dann an, wenn …", tr: "… olduğunda zarar verir" },
        { de: "In der Umsetzung würde ich deshalb …", tr: "Uygulamada bu yüzden … yapardım" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Ich halte die Offenlegung für richtig, allerdings nicht in der Form, in der sie " +
        "meistens eingeführt wird. " +
        "Das beste Gegenargument ist nicht der Neid, den man gern unterstellt, sondern die " +
        "Beobachtung, dass eine Zahl ohne Kontext systematisch falsch gelesen wird: " +
        "Zwei Personen mit identischer Bezeichnung können völlig verschiedene Aufgaben haben, " +
        "und die Differenz wirkt dann wie Willkür, obwohl sie begründet ist. " +
        "Darauf lässt sich allerdings antworten, dass dieses Problem ohne Offenlegung " +
        "nicht verschwindet, sondern nur unsichtbar bleibt — es trifft dann diejenigen, " +
        "die schlechter verhandeln, und zwar dauerhaft. " +
        "Schaden richtet die Offenlegung dann an, wenn sie bei der Veröffentlichung aufhört. " +
        "Eine Tabelle ohne Erklärung ist keine Transparenz, sondern eine Einladung, " +
        "sich zu vergleichen, ohne die Gründe zu kennen. " +
        "In der Umsetzung würde ich deshalb nicht einzelne Gehälter, sondern Bänder " +
        "veröffentlichen, jedes mit zwei Sätzen dazu, welche Aufgaben und welche Erfahrung " +
        "ein Band voraussetzt, und diese Beschreibung jährlich mit den Betroffenen prüfen. " +
        "Ohne diesen zweiten Teil würde ich davon abraten.",
      rubricHint:
        "Karşı argümanın dürüstçe kurulması ve bir uygulama biçimi beklenir; „allerdings nicht in der Form, in der“, „darauf lässt sich antworten“ ve „abraten von“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g8",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Der am Freitag verschickte Entwurf",
    genre: "grammar",
    intro: "Almanca, koca bir yan cümleyi artikel ile ismin arasına sıkıştırabilir; C1 metninin yoğunluğu buradan gelir.",
    focus: "Genişletilmiş niteleyiciler: Partizip I ve II ile erweiterte Attribute",
    gloss: [
      { de: "der Entwurf", tr: "taslak", en: "draft" },
      { de: "die Frage", tr: "soru", en: "question" },
      { de: "diskutieren", tr: "tartışmak", en: "to discuss" },
      { de: "wachsen", tr: "büyümek", en: "to grow" },
      { de: "beschließen", tr: "karara bağlamak", en: "to decide" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "İlgi cümlesi niteleyiciye dönüşür",
        tr: "„der Entwurf, der am Freitag verschickt wurde“ cümlesi sıkıştırılabilir: „der am Freitag verschickte Entwurf“. İlgi zamiri ve yardımcı fiil düşer, Partizip sıfat gibi çekimlenir ve tüm öbek artikel ile ismin ARASINA girer. Yazılı dilde çok yaygındır, konuşmada neredeyse hiç kullanılmaz.",
        examples: [
          { de: "der am Freitag verschickte Entwurf", tr: "cuma günü gönderilen taslak", note: "= der verschickt wurde" },
          { de: "die seit Jahren diskutierte Frage", tr: "yıllardır tartışılan soru", note: "süre öbeği içeride" },
          { de: "das gestern beschlossene Konzept", tr: "dün karara bağlanan konsept", note: "Partizip II: edilgen ve bitmiş" },
        ],
      },
      {
        heading: "Partizip I ile Partizip II arasındaki fark",
        tr: "Partizip II (verschickt, beschlossen) EDİLGEN ve tamamlanmış bir eylem bildirir. Partizip I (mastar + d: wachsend, steigend) ETKEN ve sürmekte olan bir eylem bildirir. Yanlış seçim anlamı tersine çevirir: „die wachsende Zahl“ artan sayı, „die gewachsene Zahl“ artmış olan sayı demektir.",
        examples: [
          { de: "die wachsende Zahl der Anträge", tr: "başvuruların artan sayısı", note: "Partizip I: sürüyor" },
          { de: "die gewachsene Zahl der Anträge", tr: "artmış olan başvuru sayısı", note: "Partizip II: olmuş bitmiş" },
          { de: "der in der Sitzung sprechende Kollege", tr: "toplantıda konuşan meslektaş", note: "etken ve süren" },
        ],
      },
      {
        heading: "Okuma stratejisi: sondan başa",
        tr: "Uzun bir niteleyiciyi çözmenin yolu, önce artikeli ve ismi bulup arayı sonradan okumaktır: „die — nach langer Diskussion im Ausschuss beschlossene — Maßnahme“. Ayrıca „zu + Partizip I“ biçimi vardır ve zorunluluk + edilgenlik taşır: „die zu klärende Frage“ = açıklığa kavuşturulması gereken soru.",
        examples: [
          { de: "die nach langer Diskussion beschlossene Maßnahme", tr: "uzun tartışmadan sonra karara bağlanan önlem", note: "önce artikel + isim" },
          { de: "die noch zu klärende Frage", tr: "henüz açıklığa kavuşturulması gereken soru", note: "zu + Partizip I" },
          { de: "der von allen erwartete Beschluss", tr: "herkesin beklediği karar", note: "eyleyen von ile" },
        ],
      },
    ],
    questions: [
      {
        text: "„der Entwurf, der am Freitag verschickt wurde“ — Welche Kurzform ist richtig?",
        options: [
          "der am Freitag verschickte Entwurf",
          "der am Freitag verschickend Entwurf",
          "der Entwurf am Freitag verschickte",
        ],
        answer: 0,
        explain: "Partizip II sıfat gibi çekimlenir ve öbek artikel ile ismin arasına girer.",
      },
      {
        text: "Welche Form bedeutet, dass die Zahl gerade steigt?",
        options: ["die gewachsene Zahl", "die wachsende Zahl", "die zu wachsende Zahl"],
        answer: 1,
        explain: "Partizip I etken ve süren bir eylem bildirir.",
      },
      {
        text: "„die noch zu klärende Frage“ bedeutet:",
        options: [
          "die Frage, die geklärt werden muss",
          "die Frage, die geklärt wurde",
          "die Frage, die klärt",
        ],
        answer: 0,
        explain: "„zu + Partizip I“ zorunluluk ve edilgenlik taşır.",
      },
      {
        kind: "gapfill",
        text: "die seit Jahren ___ Frage (diskutieren, Partizip II)",
        options: [],
        answer: 0,
        accept: ["diskutierte"],
        explain: "Edilgen ve süregelen bir tartışma; dişil yalın hâlde -e alır.",
      },
      {
        kind: "gapfill",
        text: "das gestern ___ Konzept (beschließen, Partizip II)",
        options: [],
        answer: 0,
        accept: ["beschlossene"],
        explain: "Düzensiz Partizip II: beschlossen, nötr yalında -e alır.",
      },
      {
        kind: "gapfill",
        text: "der in der Sitzung ___ Kollege (sprechen, Partizip I)",
        options: [],
        answer: 0,
        accept: ["sprechende"],
        explain: "Partizip I mastar + d ile kurulur ve sıfat gibi çekimlenir.",
      },
      {
        kind: "gapfill",
        text: "der von allen ___ Beschluss (erwarten, Partizip II)",
        options: [],
        answer: 0,
        accept: ["erwartete"],
        explain: "Eyleyen „von“ ile niteleyicinin içine girer.",
      },
      {
        kind: "order",
        text: "Öbeği doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["die", "nach langer Diskussion", "beschlossene", "Maßnahme"],
        explain: "Artikel, sonra genişletme, sonra Partizip, en sonda isim.",
      },
      {
        kind: "truefalse",
        text: "„die gewachsene Zahl“ und „die wachsende Zahl“ bedeuten dasselbe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Biri tamamlanmış, öteki süren bir artışı bildirir.",
      },
      {
        kind: "truefalse",
        text: "„der am Freitag verschickte Entwurf“ — Bu öbek doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Partizip II eril yalın hâlde belirli artikelden sonra -e alır.",
      },
    ],
  },
];

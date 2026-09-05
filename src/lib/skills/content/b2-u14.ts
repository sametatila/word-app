import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 14 — "Rakamın arkasındaki cümle".
 *
 * Dört ders: Alles wird teurer · Der enge Markt · Fachkräfte gesucht ·
 * Ohne Ehrenamt läuft nichts. Ünitenin dördü de ekonomi ve toplum
 * tartışmalarının diliyle uğraşıyor: adlaştırma rakamı başlığa sıkıştırır,
 * je-desto iki eğilimi birbirine bağlar, edilgen yerine geçenler eksikliği
 * failsiz söyler, indem ise bir katkının nasıl ortaya çıktığını anlatır.
 *
 *   Ünite 14: die Inflation, spürbar, die Konjunktur, die Rezession,
 *             der Aufschwung, der Verbraucher, die Verschuldung, schwanken ·
 *             der Wohnraum, der Neubau, der Leerstand, die Sozialwohnung,
 *             die Wohnfläche, der Mietspiegel, die Gentrifizierung,
 *             der Makler · die Fachkraft, der Fachkräftemangel,
 *             der Mindestlohn, die Erwerbstätigkeit, sich qualifizieren,
 *             befristet, unbefristet, wettbewerbsfähig · das Ehrenamt,
 *             ehrenamtlich, sich engagieren, die Zivilgesellschaft,
 *             die Solidarität, der Zusammenhalt, die Bürgerinitiative,
 *             das Gemeinwohl
 *   Kalıplar: die Zunahme der Preise · im Vergleich zum letzten Jahr ·
 *             Je …, desto … · … sind kaum zu besetzen · Es mangelt an … ·
 *             …, indem sie …
 *
 * je-desto Türkçedeki "ne kadar … o kadar" yapısına denk düşer, ama Almanca
 * ilk yarıyı yan cümle yapar (fiil sonda), ikinci yarıyı ana cümle (fiil
 * hemen desto'dan sonra). Sıra hatası bu ünitenin en tipik kusuru.
 */
export const b2U14: SkillExercise[] = [
  {
    id: "b2-u14-r1",
    level: "B2",
    skill: "reading",
    unit: 14,
    title: "Der enge Markt",
    genre: "Ekonomi yazısı",
    intro: "Konut piyasası üzerine bir yazı. İki eğilimi birbirine bağlayan cümlelere dikkat et.",
    gloss: [
      { de: "der Wohnraum", tr: "konut", en: "housing" },
      { de: "der Neubau", tr: "yeni yapı", en: "new build" },
      { de: "der Leerstand", tr: "boş konut", en: "vacancy" },
      { de: "die Sozialwohnung", tr: "sosyal konut", en: "social housing unit" },
      { de: "die Wohnfläche", tr: "kullanım alanı", en: "living space" },
      { de: "der Mietspiegel", tr: "kira endeksi", en: "rent index" },
      { de: "die Gentrifizierung", tr: "soylulaştırma", en: "gentrification" },
      { de: "der Makler", tr: "emlakçı", en: "estate agent" },
    ],
    minutes: 6,
    text:
      "DER ENGE MARKT\n\n" +
      "Je knapper der Wohnraum wird, desto lauter wird über Neubau gesprochen. Das ist verständlich, greift aber zu kurz — denn gebaut wird längst, nur nicht das, was fehlt.\n\n" +
      "Ein Blick auf die Zahlen. Die durchschnittliche Wohnfläche pro Person ist seit 1990 von 35 auf 48 Quadratmeter gestiegen. Anders gesagt: Bei gleicher Einwohnerzahl bräuchte eine Stadt heute deutlich mehr Wohnungen als damals. Ein Teil der Knappheit entsteht also nicht durch Zuzug, sondern durch veränderte Ansprüche — und durch Haushalte, die kleiner geworden sind.\n\n" +
      "Gleichzeitig gibt es Leerstand, und zwar erheblichen: in Regionen, aus denen junge Menschen wegziehen. Wohnungen sind nicht transportierbar. Genau deshalb hilft die bundesweite Statistik bei der örtlichen Frage so wenig.\n\n" +
      "Was ist mit dem Mietspiegel? Er bildet ab, was in den letzten Jahren neu vereinbart wurde, nicht was alle zahlen. Wer lange in derselben Wohnung wohnt, taucht darin kaum auf. Je häufiger gewechselt wird, desto schneller steigt er.\n\n" +
      "Und die Gentrifizierung? Der Begriff wird oft zu breit benutzt. Gemeint ist ursprünglich ein enger Vorgang: Ein Viertel wird aufgewertet, die alten Mieter können die neuen Mieten nicht zahlen und ziehen weg. Nicht jede neue Bäckerei ist Gentrifizierung; ein Makler, der im Schaufenster die Preise von vorletztem Jahr durchgestrichen hat, ist schon ein Hinweis.\n\n" +
      "Der wirksamste Hebel ist unbeliebt, weil er langsam ist: Sozialwohnungen mit langer Bindung. Sie wirken erst nach Jahren — und genau deshalb werden sie in kurzen Wahlperioden selten beschlossen.",
    questions: [
      {
        kind: "gapfill",
        text: "Je knapper der Wohnraum wird, ___ lauter wird über Neubau gesprochen.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "je yan cümlede, desto ana cümlede; ikinci yarıda fiil hemen desto öbeğinden sonra gelir.",
      },
      {
        text: "Warum bräuchte eine Stadt heute mehr Wohnungen als 1990?",
        options: [
          "weil die Wohnfläche pro Person gestiegen ist",
          "weil mehr Menschen dort leben",
          "weil weniger gebaut wird",
        ],
        answer: 0,
        explain: "„Die durchschnittliche Wohnfläche pro Person ist seit 1990 von 35 auf 48 Quadratmeter gestiegen.“",
      },
      {
        kind: "short_answer",
        text: "Was bildet der Mietspiegel ab?",
        options: [],
        answer: 0,
        accept: ["neu vereinbarte Mieten", "was neu vereinbart wurde", "die neuen Verträge"],
        explain: "„Er bildet ab, was in den letzten Jahren neu vereinbart wurde, nicht was alle zahlen.“",
      },
      {
        text: "Warum hilft die bundesweite Statistik örtlich wenig?",
        options: [
          "weil sie zu alt ist",
          "weil Wohnungen nicht transportierbar sind",
          "weil sie den Leerstand nicht erfasst",
        ],
        answer: 1,
        explain: "„Wohnungen sind nicht transportierbar. Genau deshalb hilft die bundesweite Statistik bei der örtlichen Frage so wenig.“",
      },
      {
        text: "Sozialwohnungen mit langer Bindung wirken sofort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sie wirken erst nach Jahren — und genau deshalb werden sie … selten beschlossen.“",
      },
    ],
  },

  {
    id: "b2-u14-r2",
    level: "B2",
    skill: "reading",
    unit: 14,
    title: "Ohne Ehrenamt läuft nichts",
    genre: "Deneme",
    intro: "Gönüllü emeğin ne taşıdığını anlatan bir yazı. Nasıl sorusuna verilen cevaplara dikkat et.",
    gloss: [
      { de: "das Ehrenamt", tr: "gönüllü görev", en: "voluntary work" },
      { de: "ehrenamtlich", tr: "fahri", en: "voluntary" },
      { de: "sich engagieren", tr: "angaje olmak", en: "to get involved" },
      { de: "die Zivilgesellschaft", tr: "sivil toplum", en: "civil society" },
      { de: "die Solidarität", tr: "dayanışma", en: "solidarity" },
      { de: "der Zusammenhalt", tr: "birlik duygusu", en: "cohesion" },
      { de: "die Bürgerinitiative", tr: "yurttaş girişimi", en: "citizens' initiative" },
      { de: "das Gemeinwohl", tr: "kamu yararı", en: "common good" },
    ],
    minutes: 6,
    text:
      "OHNE EHRENAMT LÄUFT NICHTS\n\n" +
      "Rechnen wir kurz. Die Feuerwehr in kleinen Gemeinden, die Sportvereine, die Tafeln, die Nachbarschaftshilfe, die Schöffen an den Gerichten: All das wird ehrenamtlich getragen. Würde man diese Arbeit bezahlen, ginge kein Haushalt dieser Republik auf.\n\n" +
      "Trotzdem redet man über das Ehrenamt meist in einem seltsam feierlichen Ton, der wenig hilft. Nützlicher ist die konkrete Frage: Wodurch entsteht dieser Beitrag eigentlich?\n\n" +
      "Menschen engagieren sich nicht, indem sie sich für das Gemeinwohl begeistern, sondern indem sie an einem Dienstagabend erscheinen. Vereine funktionieren nicht dadurch, dass alle mitmachen, sondern dadurch, dass wenige verlässlich sind. Und eine Bürgerinitiative erreicht etwas nicht dadurch, dass sie recht hat, sondern indem sie über Jahre zu denselben Sitzungen geht.\n\n" +
      "Wo es hakt, ist bekannt. Der Zusammenhalt in Vereinen leidet weniger an fehlender Solidarität als an fehlender Zeit: Wer befristet arbeitet und pendelt, kann keine feste Verpflichtung am Mittwoch übernehmen. Hinzu kommt der Papierkram, der auch für kleine Vereine gewachsen ist.\n\n" +
      "Was hilft, ist unspektakulär: klar begrenzte Aufgaben statt offener Ämter, Verantwortung auf mehrere Schultern, und ein Verein, der sagt, wie viele Stunden im Monat es wirklich sind. Die Zivilgesellschaft ist kein Gefühl, sondern ein Terminkalender.",
    questions: [
      {
        kind: "gapfill",
        text: "Menschen engagieren sich, ___ sie an einem Dienstagabend erscheinen.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "indem 'nasıl' sorusuna cevap verir ve yan cümle kurar.",
      },
      {
        text: "Wodurch funktionieren Vereine laut Text?",
        options: [
          "dadurch, dass alle mitmachen",
          "dadurch, dass wenige verlässlich sind",
          "dadurch, dass sie bezahlt werden",
        ],
        answer: 1,
        explain: "„…nicht dadurch, dass alle mitmachen, sondern dadurch, dass wenige verlässlich sind.“",
      },
      {
        kind: "short_answer",
        text: "Woran leidet der Zusammenhalt vor allem?",
        options: [],
        answer: 0,
        accept: ["an fehlender Zeit", "Zeitmangel", "an der fehlenden Zeit"],
        explain: "„…leidet weniger an fehlender Solidarität als an fehlender Zeit.“",
      },
      {
        text: "Was empfiehlt der Text den Vereinen?",
        options: [
          "klar begrenzte Aufgaben statt offener Ämter",
          "mehr feierliche Reden",
          "Bezahlung der Mitglieder",
        ],
        answer: 0,
        explain: "„…klar begrenzte Aufgaben statt offener Ämter, Verantwortung auf mehrere Schultern.“",
      },
      {
        text: "Eine Bürgerinitiative erreicht etwas vor allem dadurch, dass sie recht hat.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…nicht dadurch, dass sie recht hat, sondern indem sie über Jahre zu denselben Sitzungen geht.“",
      },
    ],
  },

  {
    id: "b2-u14-l1",
    level: "B2",
    skill: "listening",
    unit: 14,
    title: "Alles wird teurer",
    genre: "Diyalog",
    intro: "İki kişi fiyat artışlarını konuşuyor. Rakam ile hissedilen arasındaki farka dikkat et.",
    gloss: [
      { de: "die Inflation", tr: "enflasyon", en: "inflation" },
      { de: "spürbar", tr: "hissedilir", en: "noticeable" },
      { de: "die Konjunktur", tr: "konjonktür", en: "economic cycle" },
      { de: "die Rezession", tr: "resesyon", en: "recession" },
      { de: "der Aufschwung", tr: "ekonomik canlanma", en: "upturn" },
      { de: "der Verbraucher", tr: "tüketici", en: "consumer" },
      { de: "die Verschuldung", tr: "borçlanma", en: "debt" },
      { de: "schwanken", tr: "dalgalanmak", en: "to fluctuate" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ayla", text: "Im Radio hieß es, die Inflation sinke. Ich merke davon nichts." },
      { speaker: "Rolf", text: "Das ist kein Widerspruch. Gesunken ist die Zunahme der Preise, nicht das Preisniveau." },
      { speaker: "Ayla", text: "Also wird alles trotzdem teurer, nur langsamer?" },
      { speaker: "Rolf", text: "Genau. Und die Preise, die den Verbraucher täglich treffen, schwanken stärker als der Durchschnitt." },
      { speaker: "Ayla", text: "Deshalb ist es beim Einkaufen so spürbar." },
      { speaker: "Rolf", text: "Ja. Ein Index mittelt über hunderte Waren. Dein Einkaufskorb ist ein anderer." },
      { speaker: "Ayla", text: "Und wie steht es um die Konjunktur? Reden alle von einer Rezession?" },
      { speaker: "Rolf", text: "Zwei schwache Quartale gab es. Ob daraus eine Rezession wird, weiß niemand sicher." },
      { speaker: "Ayla", text: "Und ein Aufschwung?" },
      { speaker: "Rolf", text: "Wird für nächstes Jahr erwartet. Erwartet worden ist er allerdings auch letztes Jahr." },
      { speaker: "Ayla", text: "Was mir Sorgen macht, ist die Verschuldung bei jungen Haushalten." },
      { speaker: "Rolf", text: "Zu Recht. Wer variabel finanziert hat, spürt jede Zinsänderung sofort." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Rolf'un çelişki olmadığını açıkladığı ikinci cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Gesunken ist die Zunahme der Preise, nicht das Preisniveau."],
        explain: "Adlaştırma: 'die Zunahme der Preise' bir cümleyi ad öbeğine sıkıştırır.",
      },
      {
        text: "Was ist gesunken?",
        options: [
          "das Preisniveau",
          "die Zunahme der Preise",
          "die Verschuldung",
        ],
        answer: 1,
        explain: "„Gesunken ist die Zunahme der Preise, nicht das Preisniveau.“",
      },
      {
        kind: "short_answer",
        text: "Warum ist die Teuerung beim Einkaufen spürbarer als der Index?",
        options: [],
        answer: 0,
        accept: ["der Einkaufskorb ist anders", "der Index mittelt", "andere Waren"],
        explain: "„Ein Index mittelt über hunderte Waren. Dein Einkaufskorb ist ein anderer.“",
      },
      {
        text: "Wie viele schwache Quartale gab es?",
        options: ["eins", "zwei", "vier"],
        answer: 1,
        explain: "„Zwei schwache Quartale gab es.“",
      },
      {
        text: "Der Aufschwung wurde auch letztes Jahr schon erwartet.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Erwartet worden ist er allerdings auch letztes Jahr.“",
      },
    ],
  },

  {
    id: "b2-u14-l2",
    level: "B2",
    skill: "listening",
    unit: 14,
    title: "Die Stelle ist kaum zu besetzen",
    genre: "Diyalog",
    intro: "Bir işletmede boş kadro konuşuluyor. Eksikliğin nasıl dile getirildiğini dinle.",
    gloss: [
      { de: "die Fachkraft", tr: "nitelikli eleman", en: "skilled worker" },
      { de: "der Fachkräftemangel", tr: "nitelikli eleman eksikliği", en: "skills shortage" },
      { de: "der Mindestlohn", tr: "asgari ücret", en: "minimum wage" },
      { de: "die Erwerbstätigkeit", tr: "gelir getiren çalışma", en: "gainful employment" },
      { de: "sich qualifizieren", tr: "hak kazanmak", en: "to qualify" },
      { de: "befristet", tr: "süreli", en: "fixed-term" },
      { de: "unbefristet", tr: "süresiz", en: "permanent" },
      { de: "wettbewerbsfähig", tr: "rekabetçi", en: "competitive" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Katrin", text: "Die Stelle ist seit sieben Monaten offen. So etwas ist kaum zu besetzen." },
      { speaker: "Ilker", text: "Es mangelt nicht an Bewerbungen. Es mangelt an passenden." },
      { speaker: "Katrin", text: "Wir sagen Fachkräftemangel, meinen aber oft etwas anderes." },
      { speaker: "Ilker", text: "Nämlich?" },
      { speaker: "Katrin", text: "Dass wir eine Fachkraft zu Bedingungen suchen, die nicht wettbewerbsfähig sind." },
      { speaker: "Ilker", text: "Das Gehalt liegt deutlich über dem Mindestlohn." },
      { speaker: "Katrin", text: "Der Mindestlohn ist nicht der Maßstab. Der Maßstab ist, was zwei Straßen weiter gezahlt wird." },
      { speaker: "Ilker", text: "Und die Befristung? Wir bieten zwei Jahre befristet an." },
      { speaker: "Katrin", text: "Genau da verlieren wir sie. Wer aus sicherer Erwerbstätigkeit wechselt, will unbefristet." },
      { speaker: "Ilker", text: "Eine unbefristete Stelle ist aber schwer zu genehmigen." },
      { speaker: "Katrin", text: "Schwerer als sieben Monate ohne Besetzung? Das ist zu rechnen, nicht zu glauben." },
      { speaker: "Ilker", text: "Fair. Und wenn wir jemanden nehmen, der sich bei uns qualifiziert?" },
      { speaker: "Katrin", text: "Dann brauchen wir einen Plan dafür. Sonst ist es nur eine Hoffnung." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Katrin'in kadronun doldurulamadığını söylediği ikinci cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["So etwas ist kaum zu besetzen."],
        explain: "sein + zu + mastar edilgen yerine geçer: 'doldurulması neredeyse imkânsız'.",
      },
      {
        text: "Woran mangelt es laut Ilker?",
        options: [
          "an Bewerbungen",
          "an passenden Bewerbungen",
          "an Stellen",
        ],
        answer: 1,
        explain: "„Es mangelt nicht an Bewerbungen. Es mangelt an passenden.“",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Katrin der richtige Maßstab beim Gehalt?",
        options: [],
        answer: 0,
        accept: ["was andere zahlen", "die Konkurrenz", "der Marktpreis"],
        explain: "„Der Maßstab ist, was zwei Straßen weiter gezahlt wird.“",
      },
      {
        text: "Warum springen Bewerber ab?",
        options: [
          "wegen der Befristung",
          "wegen des Mindestlohns",
          "wegen des Arbeitsorts",
        ],
        answer: 0,
        explain: "„Genau da verlieren wir sie. Wer aus sicherer Erwerbstätigkeit wechselt, will unbefristet.“",
      },
      {
        text: "Katrin hält Qualifizierung im Betrieb ohne Plan für ausreichend.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Dann brauchen wir einen Plan dafür. Sonst ist es nur eine Hoffnung.“",
      },
    ],
  },

  {
    id: "b2-u14-w1",
    level: "B2",
    skill: "writing",
    unit: 14,
    title: "Ne kadar, o kadar",
    genre: "Cümle kurma",
    intro: "je-desto iki eğilimi bağlar; adlaştırma rakamı başlığa sıkıştırır.",
    gloss: [
      { de: "der Wohnraum", tr: "konut", en: "housing" },
      { de: "die Inflation", tr: "enflasyon", en: "inflation" },
      { de: "sich engagieren", tr: "angaje olmak", en: "to get involved" },
      { de: "die Fachkraft", tr: "nitelikli eleman", en: "skilled worker" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Konut ne kadar azalırsa, yeni yapı o kadar çok konuşulur.",
        answer: "Je knapper der Wohnraum wird, desto lauter wird über Neubau gesprochen",
        hint: "je yan cümlede fiil sonda; desto'dan sonra fiil hemen gelir.",
      },
      {
        kind: "build",
        tr: "Düşen, fiyat düzeyi değil fiyat artışıdır.",
        answer: "Gesunken ist die Zunahme der Preise, nicht das Preisniveau",
        hint: "Adlaştırma: die Zunahme der Preise. Ortaç öne çekilince vurgu oraya biner.",
      },
      {
        kind: "build",
        tr: "Böyle bir kadro neredeyse doldurulamaz.",
        answer: "So eine Stelle ist kaum zu besetzen",
        hint: "sein + zu + mastar: edilgen yerine geçer, burada olanaksızlık bildirir.",
      },
      {
        kind: "build",
        tr: "İnsanlar salı akşamı orada olarak angaje oluyorlar.",
        answer: "Menschen engagieren sich, indem sie am Dienstagabend erscheinen",
        hint: "indem yan cümlesinde özne tekrarlanır, fiil sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "İki cümleyi je-desto ile birleştir.",
        source: "Es wird häufig gewechselt. Der Mietspiegel steigt schnell.",
        answer: "Je häufiger gewechselt wird, desto schneller steigt der Mietspiegel.",
        alternatives: ["Je häufiger gewechselt wird, desto schneller steigt der Mietspiegel"],
        why: "je-desto iki niceliği birbirine bağlar ve her iki yarıda da karşılaştırma biçimi ister. Türkçedeki 'ne kadar … o kadar' aynı ilişkiyi kurar, ama sıra farkı kritiktir: Almancada ilk yarı yan cümledir, çekimli fiil sona gider; ikinci yarıda fiil desto öbeğinin hemen ardından gelir.",
      },
    ],
  },

  {
    id: "b2-u14-w2",
    level: "B2",
    skill: "writing",
    unit: 14,
    title: "Ihr Beitrag zur Debatte",
    genre: "Tartışma yazısı",
    intro: "Bir toplumsal tartışmada tutum al — ama rakamı ve karşı tarafı da hesaba kat.",
    gloss: [
      { de: "der Verbraucher", tr: "tüketici", en: "consumer" },
      { de: "die Sozialwohnung", tr: "sosyal konut", en: "social housing unit" },
      { de: "das Gemeinwohl", tr: "kamu yararı", en: "common good" },
      { de: "wettbewerbsfähig", tr: "rekabetçi", en: "competitive" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir toplumsal tartışmaya kısa bir katkı yaz: konut, fiyatlar, iş gücü ya da gönüllülük. Şu yapıyı tut: sorunun ne olduğu, en sık duyulan açıklamanın neden eksik kaldığı, senin gördüğün asıl neden ve somut bir öneri. En az bir je-desto cümlesi ve en az bir adlaştırılmış rakam ifadesi kullan. Karşı görüşe bir cümle ayır ve ciddiye al.",
        checklist: [
          "Sorun ve yaygın açıklama ayrı ayrı verildi mi?",
          "En az bir je-desto cümlesi var mı?",
          "Rakam ya da eğilim adlaştırma ile ifade edildi mi?",
          "Karşı görüş ciddiye alınıp somut öneri verildi mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Je …, desto …", tr: "ne kadar …, o kadar …", en: "the more …, the more …" },
          { de: "die Zunahme der Mieten im Vergleich zum Vorjahr", tr: "geçen yıla göre kiralardaki artış", en: "the rise in rents compared with last year" },
          { de: "Dagegen spricht, dass …", tr: "buna karşı şu söylenebilir …", en: "against this one can say that …" },
        ],
        sample:
          "WARUM NEUBAU ALLEIN NICHT REICHT\n\n" +
          "In unserer Stadt fehlen Wohnungen — das bestreitet niemand. Die übliche Antwort lautet: mehr bauen. Je knapper der Wohnraum wird, desto lauter wird diese Forderung. Sie greift trotzdem zu kurz.\n\n" +
          "Gebaut wird nämlich längst. Nur entstehen fast ausschließlich Wohnungen im oberen Preissegment, weil sich anderes für private Bauherren nicht rechnet. Die Zunahme der Mieten im Vergleich zum Vorjahr betrifft deshalb genau die Gruppen, für die nicht gebaut wird.\n\n" +
          "Dagegen spricht, dass Sozialwohnungen teuer sind und langsam wirken — das stimmt, und man sollte es nicht kleinreden. Eine Bindung über zwanzig Jahre kostet die Stadt heute Geld für eine Wirkung, die erst der übernächste Rat sieht.\n\n" +
          "Mein Vorschlag: die Belegungsbindung an bestehende Gebäude knüpfen statt nur an Neubauten. Das ist billiger, geht schneller und schafft keinen einzigen Quadratmeter — aber es hält Menschen in Wohnungen, die es schon gibt.",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 15 — "Kim ödüyor, kim vaat ediyor?".
 *
 * Dört ders: Jung und Alt · Stadt oder Land? · Wofür zahlen wir? ·
 * Vor der Wahl. Ünitenin tamamı kamusal tartışmanın diliyle uğraşıyor:
 * iki parçalı bağlaçlar iki tarafı birden anar, je-desto iki eğilimi bağlar,
 * edilgen paranın nereden geldiğini failsiz söyler, öznel kip ise vaadi
 * vaat olarak işaretler.
 *
 *   Ünite 15: der Umgang, das Vorurteil, prägen, die Bevölkerungsgruppe,
 *             der Wandel, die Lebenserwartung, die Ungleichheit,
 *             die Gerechtigkeit · die Infrastruktur, der Ballungsraum,
 *             der Zuzug, der Pendler, der Nahverkehr, die Stadtentwicklung,
 *             das Stadtviertel, die Innenstadt · die Steuerlast,
 *             die Steuererklärung, die Steuererhöhung, die Sozialabgabe,
 *             die Sozialleistung, die Investition, erheben, kürzen ·
 *             das Wahlversprechen, der Wahlkampf, die Hochrechnung,
 *             die Beteiligung, die Koalition, die Opposition, kandidieren,
 *             umsetzen
 *   Kalıplar: sowohl … als auch … · weder … noch … · Je größer …, desto … ·
 *             … wird aus … finanziert · … wird erhoben ·
 *             Die Partei will … erreicht haben · … dürfte knapp werden
 *
 * weder … noch Türkçedeki "ne … ne de" ile birebir örtüşüyor gibi durur ama
 * bir tuzağı vardır: Almancada yapının kendisi olumsuzdur, ayrıca nicht ya da
 * kein eklenmez. Türkçede yüklem de olumsuzlandığı için bu fazladan olumsuzluk
 * çok sık yazılıyor.
 */
export const b2U15: SkillExercise[] = [
  {
    id: "b2-u15-r1",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "Wofür zahlen wir eigentlich?",
    genre: "Bilgilendirme yazısı",
    intro: "Verginin nereye gittiğini anlatan bir yazı. Paranın kaynağı nasıl söyleniyor?",
    gloss: [
      { de: "die Steuerlast", tr: "vergi yükü", en: "tax burden" },
      { de: "die Steuererklärung", tr: "vergi beyannamesi", en: "tax return" },
      { de: "die Steuererhöhung", tr: "vergi artışı", en: "tax increase" },
      { de: "die Sozialabgabe", tr: "sosyal güvenlik kesintisi", en: "social contribution" },
      { de: "die Sozialleistung", tr: "sosyal yardım", en: "social benefit" },
      { de: "die Investition", tr: "yatırım", en: "investment" },
      { de: "erheben", tr: "tahsil etmek", en: "to levy" },
      { de: "kürzen", tr: "kısmak", en: "to cut" },
    ],
    minutes: 6,
    text:
      "WOFÜR ZAHLEN WIR EIGENTLICH?\n\n" +
      "Auf der Gehaltsabrechnung stehen zwei Blöcke, die gern verwechselt werden. Steuern werden vom Staat erhoben und finanzieren den Haushalt: Schulen, Straßen, Gerichte, Verwaltung. Sozialabgaben sind etwas anderes — sie gehen nicht in den Haushalt, sondern in die Versicherungen für Rente, Gesundheit, Pflege und Arbeitslosigkeit. Wer über „die Steuerlast“ spricht und dabei beides zusammenzählt, redet über eine Zahl, die es so nicht gibt.\n\n" +
      "Wohin fließt das Geld? Der größte Einzelposten im Bundeshaushalt ist seit Jahren die Rente; sie wird zu einem erheblichen Teil aus Steuermitteln bezuschusst, weil die Beiträge allein nicht reichen. Straßen und Schienen werden ebenfalls aus dem Haushalt finanziert, Schulen dagegen fast vollständig von Ländern und Kommunen.\n\n" +
      "Was passiert bei einer Steuererhöhung? Nicht unbedingt das, was man erwartet. Ein höherer Satz bringt nicht automatisch mehr ein, weil sich Verhalten ändert und weil ein Teil der Wirtschaft grenznah ist. Umgekehrt gilt dasselbe: Wenn Sätze gesenkt werden, bricht selten so viel weg, wie zunächst gerechnet wird.\n\n" +
      "Und wenn gekürzt wird? Nicht unbedingt bei den Sozialleistungen, obwohl darüber am lautesten gestritten wird. Gekürzt wird fast immer dort, wo es kurzfristig am wenigsten weh tut: bei Investitionen. Eine nicht sanierte Brücke fällt in diesem Jahr niemandem auf. In zwölf Jahren kostet sie das Dreifache.\n\n" +
      "Ein praktischer Hinweis zum Schluss: Wer eine Steuererklärung abgibt, bekommt im Schnitt eine vierstellige Summe zurück. Viele geben trotzdem keine ab — nicht aus Überzeugung, sondern weil das Formular abschreckt.",
    questions: [
      {
        text: "Was ist der Unterschied zwischen Steuern und Sozialabgaben?",
        options: [
          "Es sind zwei Wörter für dasselbe.",
          "Steuern finanzieren den Haushalt, Sozialabgaben gehen in die Versicherungen.",
          "Sozialabgaben zahlen nur Selbstständige.",
        ],
        answer: 1,
        explain: "„Sozialabgaben … gehen nicht in den Haushalt, sondern in die Versicherungen.“",
      },
      {
        kind: "gapfill",
        text: "Steuern ___ vom Staat erhoben.",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Şimdiki zaman edilgeni: werden çekimli, ortaç sonda. Fail söylense de yapı edilgen.",
      },
      {
        kind: "short_answer",
        text: "Was ist der größte Einzelposten im Bundeshaushalt?",
        options: [],
        answer: 0,
        accept: ["die Rente", "Rente", "die Rentenzuschüsse"],
        explain: "„Der größte Einzelposten im Bundeshaushalt ist seit Jahren die Rente.“",
      },
      {
        text: "Wo wird laut Text meist gekürzt?",
        options: [
          "bei den Sozialleistungen",
          "bei den Investitionen",
          "bei der Verwaltung",
        ],
        answer: 1,
        explain: "„Gekürzt wird fast immer dort, wo es kurzfristig am wenigsten weh tut: bei Investitionen.“",
      },
      {
        text: "Eine höhere Steuer bringt automatisch mehr Geld ein.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein höherer Satz bringt nicht automatisch mehr ein, weil sich Verhalten ändert.“",
      },
    ],
  },

  {
    id: "b2-u15-r2",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "Stadt oder Land?",
    genre: "Deneme",
    intro: "Kır ile kent arasındaki dengeyi ele alan bir yazı. Bağlantılı eğilimlere dikkat et.",
    gloss: [
      { de: "die Infrastruktur", tr: "altyapı", en: "infrastructure" },
      { de: "der Ballungsraum", tr: "yığılma bölgesi", en: "conurbation" },
      { de: "der Zuzug", tr: "gelip yerleşme", en: "influx" },
      { de: "der Pendler", tr: "banliyö yolcusu", en: "commuter" },
      { de: "der Nahverkehr", tr: "toplu taşıma", en: "local transport" },
      { de: "die Stadtentwicklung", tr: "kentsel gelişim", en: "urban development" },
      { de: "das Stadtviertel", tr: "semt", en: "district" },
      { de: "die Innenstadt", tr: "şehir merkezi", en: "city centre" },
    ],
    minutes: 6,
    text:
      "STADT ODER LAND?\n\n" +
      "Je größer der Ballungsraum wird, desto teurer wird das Wohnen in seiner Mitte — und desto weiter ziehen die Menschen hinaus, die dort arbeiten. Das ist keine Naturgesetzlichkeit, sondern das Ergebnis von Entscheidungen, die meistens nicht gemeinsam getroffen werden.\n\n" +
      "Der Zuzug in die großen Städte hat sich zuletzt verlangsamt, ist aber nicht gestoppt. Gleichzeitig wächst der Kranz drum herum. Wer heute pendelt, tut das oft nicht aus Liebe zum Land, sondern weil in der Innenstadt keine Wohnung zu finden ist, die für eine Familie reicht.\n\n" +
      "Damit wird der Nahverkehr zur eigentlichen Frage. Ein Stadtviertel am Rand ist attraktiv, wenn man in zwanzig Minuten in der Innenstadt ist — und unattraktiv, wenn der Bus zweimal am Tag fährt. Die Infrastruktur entscheidet, ob Fläche Wohnraum wird oder nur Fläche bleibt.\n\n" +
      "Auf dem Land ist das Bild uneinheitlich. Orte mit Bahnanschluss und Grundschule wachsen wieder; Orte ohne beides verlieren weiter, unabhängig davon, wie schön sie liegen. Die Frage lautet also selten „Stadt oder Land“, sondern „angebunden oder nicht“.\n\n" +
      "Für die Stadtentwicklung folgt daraus etwas Unbequemes: Neue Baugebiete am Rand ohne gleichzeitigen Ausbau des Nahverkehrs erzeugen genau den Verkehr, über den man sich anschließend beschwert. Je später die Linie kommt, desto schwerer ist sie durchzusetzen — denn dann sind alle schon aufs Auto eingerichtet.",
    questions: [
      {
        kind: "gapfill",
        text: "Je größer der Ballungsraum wird, ___ teurer wird das Wohnen in seiner Mitte.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "je yan cümlede, desto ana cümlede; her iki yarı da karşılaştırma biçimi ister.",
      },
      {
        text: "Warum pendeln viele Menschen?",
        options: [
          "aus Liebe zum Land",
          "weil in der Innenstadt keine ausreichend große Wohnung zu finden ist",
          "weil der Nahverkehr dort besser ist",
        ],
        answer: 1,
        explain: "„…weil in der Innenstadt keine Wohnung zu finden ist, die für eine Familie reicht.“",
      },
      {
        kind: "short_answer",
        text: "Welche Orte auf dem Land wachsen wieder?",
        options: [],
        answer: 0,
        accept: ["Orte mit Bahnanschluss und Grundschule", "angebundene Orte", "Orte mit Anbindung"],
        explain: "„Orte mit Bahnanschluss und Grundschule wachsen wieder.“",
      },
      {
        text: "Was entsteht durch Baugebiete ohne Nahverkehrsausbau?",
        options: [
          "genau der Verkehr, über den man sich danach beschwert",
          "günstiger Wohnraum in der Mitte",
          "weniger Zuzug",
        ],
        answer: 0,
        explain: "„Neue Baugebiete am Rand ohne gleichzeitigen Ausbau des Nahverkehrs erzeugen genau den Verkehr, über den man sich anschließend beschwert.“",
      },
      {
        text: "Die eigentliche Frage lautet laut Text „Stadt oder Land“.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Frage lautet also selten 'Stadt oder Land', sondern 'angebunden oder nicht'.“",
      },
    ],
  },

  {
    id: "b2-u15-l1",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "Jung und Alt",
    genre: "Diyalog",
    intro: "İki kuşak arasındaki tartışma. İki tarafı birden anan bağlaçlara dikkat et.",
    gloss: [
      { de: "der Umgang", tr: "ilişki biçimi", en: "way of dealing" },
      { de: "das Vorurteil", tr: "önyargı", en: "prejudice" },
      { de: "prägen", tr: "biçimlendirmek", en: "to shape" },
      { de: "die Bevölkerungsgruppe", tr: "nüfus grubu", en: "population group" },
      { de: "der Wandel", tr: "değişim", en: "change" },
      { de: "die Lebenserwartung", tr: "ortalama ömür", en: "life expectancy" },
      { de: "die Ungleichheit", tr: "eşitsizlik", en: "inequality" },
      { de: "die Gerechtigkeit", tr: "adalet", en: "fairness" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Erhan", text: "In der Zeitung stand wieder, die Jungen zahlten für die Alten. Ich finde das zu einfach." },
      { speaker: "Britta", text: "Ich auch. Sowohl die Jungen als auch die Alten zahlen — nur zu verschiedenen Zeiten." },
      { speaker: "Erhan", text: "Genau. Meine Mutter hat vierzig Jahre eingezahlt." },
      { speaker: "Britta", text: "Und trotzdem stimmt etwas nicht am Verhältnis. Die Lebenserwartung ist gestiegen, die Einzahlungsdauer nicht." },
      { speaker: "Erhan", text: "Das ist ein Wandel, den niemand geplant hat. Aber es ist weder ein Skandal noch jemandes Schuld." },
      { speaker: "Britta", text: "Nein. Trotzdem muss man darüber reden, ohne gleich eine Bevölkerungsgruppe zum Gegner zu machen." },
      { speaker: "Erhan", text: "Der Umgang miteinander ist ja das Problem. Kaum sagt jemand Rente, sind die Vorurteile da." },
      { speaker: "Britta", text: "Und dabei ist die Ungleichheit innerhalb der Generationen größer als zwischen ihnen." },
      { speaker: "Erhan", text: "Das habe ich auch gelesen. Zwei Rentner können völlig verschieden leben." },
      { speaker: "Britta", text: "Eben. Wer nur Alt gegen Jung stellt, verfehlt die Frage nach Gerechtigkeit." },
      { speaker: "Erhan", text: "Was hat dich eigentlich geprägt in dieser Sache?" },
      { speaker: "Britta", text: "Meine Großmutter. Sie hat gearbeitet bis siebzig und nie darüber geklagt." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Britta'nın iki tarafın da ödediğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Sowohl die Jungen als auch die Alten zahlen — nur zu verschiedenen Zeiten."],
        explain: "sowohl … als auch iki tarafı birden kapsar; fiil çoğul olur.",
      },
      {
        text: "Was ist laut Erhan der Wandel?",
        options: [
          "ein Skandal",
          "etwas, das niemand geplant hat",
          "die Schuld der Jungen",
        ],
        answer: 1,
        explain: "„Das ist ein Wandel, den niemand geplant hat. Aber es ist weder ein Skandal noch jemandes Schuld.“",
      },
      {
        kind: "short_answer",
        text: "Wo ist die Ungleichheit laut Britta größer?",
        options: [],
        answer: 0,
        accept: ["innerhalb der Generationen", "in den Generationen", "innerhalb einer Generation"],
        explain: "„…die Ungleichheit innerhalb der Generationen größer als zwischen ihnen.“",
      },
      {
        text: "Was ist gestiegen?",
        options: ["die Einzahlungsdauer", "die Lebenserwartung", "die Zahl der Beitragszahler"],
        answer: 1,
        explain: "„Die Lebenserwartung ist gestiegen, die Einzahlungsdauer nicht.“",
      },
      {
        text: "Britta hält den Streit Alt gegen Jung für die richtige Frage.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wer nur Alt gegen Jung stellt, verfehlt die Frage nach Gerechtigkeit.“",
      },
    ],
  },

  {
    id: "b2-u15-l2",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "Vor der Wahl",
    genre: "Diyalog",
    intro: "Seçim öncesi bir sohbet. Vaat ile tahmin arasındaki farkı dinle.",
    gloss: [
      { de: "das Wahlversprechen", tr: "seçim vaadi", en: "election promise" },
      { de: "der Wahlkampf", tr: "seçim kampanyası", en: "election campaign" },
      { de: "die Hochrechnung", tr: "seçim tahmini", en: "projection" },
      { de: "die Beteiligung", tr: "katılım", en: "turnout" },
      { de: "die Koalition", tr: "koalisyon", en: "coalition" },
      { de: "die Opposition", tr: "muhalefet", en: "opposition" },
      { de: "kandidieren", tr: "aday olmak", en: "to run for office" },
      { de: "umsetzen", tr: "hayata geçirmek", en: "to implement" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Marek", text: "Hast du dich schon entschieden? Sonntag ist Wahl." },
      { speaker: "Ida", text: "Fast. Der Wahlkampf hat mir wenig geholfen, ehrlich gesagt." },
      { speaker: "Marek", text: "Warum?" },
      { speaker: "Ida", text: "Weil überall dasselbe versprochen wird. Die Partei will das schon zweimal erreicht haben." },
      { speaker: "Marek", text: "Und, hat sie?" },
      { speaker: "Ida", text: "Teilweise. Zwei von fünf Wahlversprechen sind umgesetzt worden, das ist nicht wenig." },
      { speaker: "Marek", text: "Was sagen die Umfragen?" },
      { speaker: "Ida", text: "Es dürfte knapp werden. Aber eine Hochrechnung am Wahlabend ist keine Umfrage vorher." },
      { speaker: "Marek", text: "Stimmt. Und die Beteiligung?" },
      { speaker: "Ida", text: "Bei der letzten Kommunalwahl lag sie unter fünfzig Prozent. Das entscheidet mehr als jedes Plakat." },
      { speaker: "Marek", text: "Wer kandidiert bei euch im Wahlkreis?" },
      { speaker: "Ida", text: "Vier Leute, davon zwei zum ersten Mal. Eine kenne ich aus dem Elternbeirat." },
      { speaker: "Marek", text: "Und wenn es zu keiner Mehrheit reicht?" },
      { speaker: "Ida", text: "Dann eine Koalition, und die Opposition wird ein Jahr lang sagen, sie habe es vorher gewusst." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ida'nın sonucun kıl payı olacağını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Es dürfte knapp werden."],
        explain: "dürfte tahmin bildirir: 'kıl payı olacak gibi görünüyor'.",
      },
      {
        text: "Wie viele Wahlversprechen wurden umgesetzt?",
        options: ["keines", "zwei von fünf", "alle fünf"],
        answer: 1,
        explain: "„Zwei von fünf Wahlversprechen sind umgesetzt worden, das ist nicht wenig.“",
      },
      {
        kind: "short_answer",
        text: "Wie hoch war die Beteiligung bei der letzten Kommunalwahl?",
        options: [],
        answer: 0,
        accept: ["unter fünfzig Prozent", "unter 50 Prozent", "knapp die Hälfte"],
        explain: "„Bei der letzten Kommunalwahl lag sie unter fünfzig Prozent.“",
      },
      {
        text: "Wie viele Personen kandidieren im Wahlkreis?",
        options: ["zwei", "vier", "fünf"],
        answer: 1,
        explain: "„Vier Leute, davon zwei zum ersten Mal.“",
      },
      {
        text: "Ida hält eine Umfrage vorher für dasselbe wie eine Hochrechnung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…eine Hochrechnung am Wahlabend ist keine Umfrage vorher.“",
      },
    ],
  },

  {
    id: "b2-u15-w1",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "İki taraf birden",
    genre: "Cümle kurma",
    intro: "sowohl … als auch kapsar, weder … noch dışlar — ve fazladan olumsuzluk istemez.",
    gloss: [
      { de: "erheben", tr: "tahsil etmek", en: "to levy" },
      { de: "der Ballungsraum", tr: "yığılma bölgesi", en: "conurbation" },
      { de: "umsetzen", tr: "hayata geçirmek", en: "to implement" },
      { de: "die Gerechtigkeit", tr: "adalet", en: "fairness" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Hem gençler hem yaşlılar ödüyor.",
        answer: "Sowohl die Jungen als auch die Alten zahlen",
        hint: "sowohl … als auch iki özneyi kapsar, fiil çoğuldur.",
      },
      {
        kind: "build",
        tr: "Bu ne bir skandal ne de birinin suçu.",
        answer: "Das ist weder ein Skandal noch jemandes Schuld",
        hint: "weder … noch yapısı zaten olumsuz; ayrıca nicht ya da kein eklenmez.",
      },
      {
        kind: "build",
        tr: "Vergiler devlet tarafından tahsil edilir.",
        answer: "Steuern werden vom Staat erhoben",
        hint: "Şimdiki zaman edilgeni; fail von ile verilir.",
      },
      {
        kind: "build",
        tr: "Yığılma bölgesi ne kadar büyürse merkez o kadar pahalılaşır.",
        answer: "Je größer der Ballungsraum wird, desto teurer wird die Mitte",
        hint: "je yan cümlede fiil sonda; desto'dan sonra fiil hemen gelir.",
      },
      {
        kind: "rewrite",
        prompt: "Fazladan olumsuzluğu kaldır.",
        source: "Die Partei hat weder das eine nicht umgesetzt noch das andere.",
        answer: "Die Partei hat weder das eine noch das andere umgesetzt.",
        alternatives: ["Die Partei hat weder das eine noch das andere umgesetzt"],
        why: "weder … noch yapısının kendisi olumsuzdur, içine ikinci bir nicht girmez. Türkçe konuşan bu hatayı sık yapar, çünkü Türkçede 'ne … ne de' kurulurken yüklem de olumsuz görünür: 'ne o ne bu yapıldı' değil, 'ne o ne bu yapılmadı' demeyiz ama ek olumsuzluk kulağa yanlış gelmez.",
      },
    ],
  },

  {
    id: "b2-u15-w2",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "Zwei Minuten am Mikrofon",
    genre: "Konuşma metni",
    intro: "Bir halk toplantısında iki dakikalık konuşma yaz — kısa, açık ve karşı tarafı anan.",
    gloss: [
      { de: "die Investition", tr: "yatırım", en: "investment" },
      { de: "der Nahverkehr", tr: "toplu taşıma", en: "local transport" },
      { de: "die Beteiligung", tr: "katılım", en: "turnout" },
      { de: "das Vorurteil", tr: "önyargı", en: "prejudice" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir halk toplantısında iki dakikalık bir konuşma metni yaz — konu bir yatırım, bir hat, bir bütçe kalemi ya da bir kapanma olabilir. Konuşma olduğu için cümleler kısa olsun ve dinleyene doğrudan seslen. En az bir kez sowohl … als auch ya da weder … noch kullan, bir kez de je-desto. Karşı görüşü kendi ağzından değil, en güçlü hâliyle aktar ve sonra cevapla. Sonda tek bir somut talep bırak.",
        checklist: [
          "Konuşma dili mi — kısa cümleler, doğrudan hitap?",
          "sowohl … als auch ya da weder … noch var mı?",
          "Bir je-desto cümlesi var mı?",
          "Karşı görüş anıldı ve tek somut talep verildi mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Sowohl … als auch … sind betroffen.", tr: "hem … hem … etkileniyor", en: "both … and … are affected" },
          { de: "Weder … noch … hilft hier weiter.", tr: "ne … ne de … burada işe yarar", en: "neither … nor … helps here" },
          { de: "Je länger wir warten, desto teurer wird es.", tr: "ne kadar beklersek o kadar pahalıya gelir", en: "the longer we wait, the more expensive it gets" },
        ],
        sample:
          "Guten Abend. Ich wohne seit elf Jahren in Bergfeld und spreche für niemanden außer für mich.\n\n" +
          "Es geht heute Abend um die Buslinie 4. Ich sage gleich, worum ich bitte: Nehmen Sie die Streichung zurück und entscheiden Sie erst nach dem Winter.\n\n" +
          "Warum? Betroffen sind sowohl die Schülerinnen aus dem Neubaugebiet als auch die Leute, die zur Frühschicht fahren. Das sind keine großen Zahlen, aber es sind genau die, die kein Auto haben. Weder ein Ruftaxi noch ein Fahrradweg ersetzt eine Linie um halb sechs.\n\n" +
          "Ich verstehe das Gegenargument. Die Linie ist schlecht ausgelastet, und Geld gibt es nicht. Das stimmt. Nur ist der Grund für die Auslastung der Takt: Wer zweimal am Tag fahren kann, richtet sich aufs Auto ein. Je länger wir warten, desto weniger Fahrgäste haben wir — und desto leichter fällt die nächste Streichung.\n\n" +
          "Deshalb meine Bitte: erst zählen, dann streichen. Vielen Dank.",
      },
    ],
  },
];

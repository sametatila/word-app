import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 çalışma süresi hattı: dört günlük hafta denemesinin raporu, yarım
 * güne geçmek isteyen bir çalışanın görüşmesi, konuyla ilgili bir yorum.
 * Dil bilgisi sıfat çekimi — B1'in en çok hata yapılan tablosu.
 */
export const deB1P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r6",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Ein Jahr Vier-Tage-Woche",
    genre: "report",
    intro: "Bir firmanın bir yıllık denemesinin raporu: ne değişti, neyin bedeli oldu, sonuç ne.",
    gloss: [
      { de: "der Versuch", tr: "deneme", en: "trial" },
      { de: "die Belegschaft", tr: "çalışanlar", en: "workforce" },
      { de: "der Umsatz", tr: "ciro", en: "turnover" },
      { de: "die Erreichbarkeit", tr: "ulaşılabilirlik", en: "availability" },
      { de: "die Besprechung", tr: "toplantı", en: "meeting" },
      { de: "einführen", tr: "uygulamaya koymak", en: "to introduce" },
    ],
    minutes: 6,
    text:
      "Bericht über den Versuch „Vier-Tage-Woche“\n\n" +
      "Vor genau einem Jahr hat unsere Firma die Vier-Tage-Woche eingeführt: gleicher Lohn, " +
      "ein Arbeitstag weniger. Das Ergebnis fällt gemischt aus, aber klar genug für eine Entscheidung.\n\n" +
      "Der Umsatz ist nicht gesunken, sondern leicht gestiegen. Das überrascht uns selbst. " +
      "Der wichtigste Grund ist banal: Wir haben die Zahl der Besprechungen halbiert. " +
      "Was früher eine Stunde im Raum gedauert hat, steht heute in drei Sätzen in einer Nachricht.\n\n" +
      "Die Zufriedenheit der Belegschaft ist deutlich besser geworden. " +
      "In der letzten Umfrage haben achtzig Prozent gesagt, dass sie erholter in die Woche starten. " +
      "Auch die Zahl der Krankheitstage ist um ein Fünftel gefallen.\n\n" +
      "Es gibt aber ein echtes Problem: die Erreichbarkeit. " +
      "Kunden rufen freitags an und finden niemanden. " +
      "Zwei größere Aufträge sind uns deshalb verloren gegangen. " +
      "Ab Januar wird deshalb eine kleine Gruppe freitags im Dienst sein, dafür montags frei haben.\n\n" +
      "Unser Fazit: Der freie Tag ist keine Belohnung, sondern ein Grund, ehrlich zu prüfen, " +
      "welche Arbeit wirklich nötig ist.",
    questions: [
      {
        text: "Was ist mit dem Umsatz passiert?",
        options: ["Er ist stark gefallen.", "Er ist leicht gestiegen.", "Er ist gleich geblieben."],
        answer: 1,
        explain: "„Der Umsatz ist nicht gesunken, sondern leicht gestiegen.“",
      },
      {
        text: "Was nennt der Bericht als wichtigsten Grund dafür?",
        options: [
          "Es gibt nur noch halb so viele Besprechungen.",
          "Die Firma hat neue Leute eingestellt.",
          "Die Kunden bezahlen mehr.",
        ],
        answer: 0,
        explain: "„Wir haben die Zahl der Besprechungen halbiert“ — gerekçe olarak bu veriliyor.",
      },
      {
        kind: "truefalse",
        text: "Der Versuch hat keine Nachteile gezeigt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Es gibt aber ein echtes Problem: die Erreichbarkeit“ — iki iş de kaybedilmiş.",
      },
      {
        kind: "gapfill",
        text: "Die Zahl der Krankheitstage ist um ein ___ gefallen.",
        options: [],
        answer: 0,
        accept: ["Fünftel"],
        explain: "„Auch die Zahl der Krankheitstage ist um ein Fünftel gefallen.“",
      },
      {
        kind: "short_answer",
        text: "Wer arbeitet ab Januar freitags?",
        options: [],
        answer: 0,
        accept: ["eine kleine Gruppe", "kleine Gruppe", "eine Gruppe"],
        explain: "„wird deshalb eine kleine Gruppe freitags im Dienst sein“ — karşılığında pazartesi izinli.",
      },
      {
        text: "Wie versteht der Bericht den freien Tag am Ende?",
        options: [
          "als Belohnung für gute Arbeit",
          "als Anlass, unnötige Arbeit zu erkennen",
          "als Nachteil für die Kunden",
        ],
        answer: 1,
        explain: "Son cümle tam bunu söylüyor: ödül değil, işin gerekliliğini sınama sebebi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l6",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Weniger Stunden, gleiche Aufgaben?",
    genre: "dialogue",
    intro: "Bir çalışan çalışma saatlerini azaltmak istiyor; yöneticisiyle neyin mümkün olduğunu konuşuyorlar.",
    gloss: [
      { de: "reduzieren", tr: "azaltmak", en: "to reduce" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "einarbeiten", tr: "yetiştirmek", en: "to train up" },
      { de: "verteilen", tr: "dağıtmak", en: "to distribute" },
      { de: "befristet", tr: "süreli", en: "for a limited period" },
      { de: "anteilig", tr: "orantılı", en: "proportional" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Molnar", text: "Sie wollten über Ihre Stunden sprechen. Erzählen Sie mir, was Sie sich vorstellen." },
      { speaker: "Herr Kaya", text: "Ich würde gern auf dreißig Stunden reduzieren, am liebsten ab April, erst einmal befristet auf ein Jahr." },
      { speaker: "Frau Molnar", text: "Befristet klingt vernünftig. Was passiert dann mit den Projekten, die bei Ihnen liegen?" },
      { speaker: "Herr Kaya", text: "Das größte Projekt läuft im März aus. Die beiden kleineren könnte ich behalten, wenn ich die Berichte abgebe." },
      { speaker: "Frau Molnar", text: "Die Berichte sind aber genau der Teil, den sonst niemand machen kann. Wir müssten jemanden einarbeiten." },
      { speaker: "Herr Kaya", text: "Das stimmt. Ich könnte Frau Reuter drei Monate lang einarbeiten, bevor ich reduziere." },
      { speaker: "Frau Molnar", text: "Damit kann ich arbeiten. Schreiben Sie mir den Antrag bitte bis Ende der Woche, mit einem Vorschlag, wie die Aufgaben verteilt werden." },
      { speaker: "Herr Kaya", text: "Mache ich. Und die Frage nach dem Gehalt?" },
      { speaker: "Frau Molnar", text: "Das Gehalt sinkt natürlich anteilig. Aber der Urlaub bleibt in Tagen gleich, weil Sie weiter an fünf Tagen kommen." },
    ],
    questions: [
      {
        text: "Was möchte Herr Kaya?",
        options: [
          "die Stelle wechseln",
          "auf dreißig Stunden reduzieren",
          "ein halbes Jahr unbezahlt frei nehmen",
        ],
        answer: 1,
        explain: "„Ich würde gern auf dreißig Stunden reduzieren, am liebsten ab April.“",
      },
      {
        text: "Welches Problem sieht Frau Molnar?",
        options: [
          "Die Berichte kann sonst niemand machen.",
          "Das größte Projekt läuft zu spät aus.",
          "Der Urlaub müsste gekürzt werden.",
        ],
        answer: 0,
        explain: "„Die Berichte sind aber genau der Teil, den sonst niemand machen kann.“",
      },
      {
        kind: "truefalse",
        text: "Herr Kaya soll seine Stunden sofort reduzieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Önce üç ay Frau Reuter'i yetiştirecek; başvuruyu da hafta bitmeden yazacak.",
      },
      {
        kind: "gapfill",
        text: "Der Antrag soll bis ___ der Woche kommen.",
        options: [],
        answer: 0,
        accept: ["Ende"],
        explain: "„Schreiben Sie mir den Antrag bitte bis Ende der Woche.“",
      },
      {
        kind: "short_answer",
        text: "An wie vielen Tagen kommt Herr Kaya weiterhin?",
        options: [],
        answer: 0,
        accept: ["an fünf Tagen", "fünf", "fünf Tage"],
        explain: "„weil Sie weiter an fünf Tagen kommen“ — gün sayısı değişmiyor.",
      },
      {
        text: "Wie reagiert Frau Molnar insgesamt?",
        options: [
          "Sie lehnt den Wunsch ab.",
          "Sie stimmt unter einer Bedingung zu.",
          "Sie will erst die Geschäftsführung fragen.",
        ],
        answer: 1,
        explain: "„Damit kann ich arbeiten“ — koşul, görevlerin dağıtımını içeren bir başvuru.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w6",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Vier Tage arbeiten — ein Kommentar",
    genre: "opinion",
    intro: "Bir haber sitesinin yorum bölümüne yazıyorsun: önce iki cümle kur, sonra dengeli bir görüş yazısı yaz.",
    gloss: [
      { de: "die Arbeitszeit", tr: "çalışma süresi", en: "working hours" },
      { de: "der Vorteil", tr: "avantaj", en: "advantage" },
      { de: "der Nachteil", tr: "dezavantaj", en: "disadvantage" },
      { de: "die Branche", tr: "sektör", en: "sector" },
      { de: "einschätzen", tr: "değerlendirmek", en: "to assess" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Çalışma süresi kısalırsa daha odaklı çalışılır.",
        answer: "Wenn die Arbeitszeit kürzer wird, arbeitet man konzentrierter.",
        alternatives: ["Man arbeitet konzentrierter, wenn die Arbeitszeit kürzer wird."],
        hint: "Yan cümle başta: ana cümlenin çekimli fiili virgülden hemen sonra gelir.",
      },
      {
        kind: "build",
        tr: "Hastanelerde bu modelin uygulanması zordur.",
        answer: "In Krankenhäusern ist dieses Modell schwer umzusetzen.",
        alternatives: ["Dieses Modell ist in Krankenhäusern schwer umzusetzen."],
        hint: "„schwer zu + mastar“ yapısı edilgen bir anlam verir: „uygulanması zor“.",
      },
      {
        kind: "free",
        prompt:
          "Dört günlük çalışma haftası üzerine bir yorum yaz: konuyu kısaca tanıt, iki gerekçeyle görüşünü savun, karşı tarafın en güçlü itirazını yaz ve ona cevap ver, sonunda kendi sonucunu söyle.",
        checklist: [
          "Konuyu bir iki cümleyle tanıt ve görüşünü söyle",
          "Görüşünü iki gerekçeyle destekle",
          "En güçlü karşı görüşü yaz ve ona cevap ver",
          "Kendi sonucunu bir cümleyle bağla",
        ],
        minWords: 90,
        phrases: [
          { de: "In letzter Zeit wird viel über … diskutiert.", tr: "Son zamanlarda … çok tartışılıyor.", en: "Recently there has been a lot of discussion about …" },
          { de: "Meiner Meinung nach spricht dafür, dass …", tr: "Bence bunun lehine olan şey …", en: "In my opinion, what speaks for it is that …" },
          { de: "Der stärkste Einwand ist sicher, dass …", tr: "En güçlü itiraz elbette … olması", en: "The strongest objection is surely that …" },
          { de: "Das lässt sich aber entkräften, weil …", tr: "Ama bu çürütülebilir çünkü …", en: "However, this can be countered because …" },
          { de: "Unter dem Strich halte ich … für sinnvoll.", tr: "Sonuç olarak …'i mantıklı buluyorum.", en: "All in all, I consider … to be sensible." },
        ],
        sample:
          "In letzter Zeit wird viel über die Vier-Tage-Woche diskutiert, und die ersten Firmen haben sie " +
          "schon eingeführt. Meiner Meinung nach spricht dafür, dass kürzere Arbeitszeiten die Zahl der " +
          "unnötigen Besprechungen senken: Wenn die Arbeitszeit kürzer wird, arbeitet man konzentrierter. " +
          "Zweitens profitieren Familien, weil ein ganzer Tag für Arzttermine und Behörden frei wird. " +
          "Der stärkste Einwand ist sicher, dass das Modell nicht überall passt. In Krankenhäusern ist dieses " +
          "Modell schwer umzusetzen, denn Patienten kann man nicht auf Montag verschieben. " +
          "Das lässt sich aber entkräften, weil niemand eine Regel für alle Branchen fordert; " +
          "in der Pflege wären mehr Leute und bessere Schichtpläne wichtiger als ein freier Freitag. " +
          "Unter dem Strich halte ich den Versuch dort für sinnvoll, wo die Arbeit am Schreibtisch stattfindet.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s6",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Weniger arbeiten, gleich viel schaffen?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir iddiayı kendi deneyiminle sına.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "„Daha az saat çalışan da aynı işi çıkarır“ deniyor. Buna katılıyor musun? Görüşünü söyle, kendi günlük düzeninden bir örnek ver ve bu iddianın hangi işte geçerli olmadığını söyle.",
      bulletsTr: [
        "İddiaya katılıp katılmadığını tek cümleyle söyle",
        "Kendi çalışma ya da ders düzeninden somut bir örnek ver",
        "İddianın işlemediği bir durumu anlat",
        "Ne olursa fikrinin değişeceğini söyle",
      ],
      targets: [
        { de: "Das stimmt nur unter einer Bedingung: …", tr: "Bu yalnız bir koşulla doğru: …" },
        { de: "Bei mir selbst sehe ich das daran, dass …", tr: "Bunu kendimde şundan görüyorum: …" },
        { de: "Nicht übertragbar ist das auf …", tr: "Bu şuna aktarılamaz: …" },
        { de: "Meine Meinung würde sich ändern, wenn …", tr: "Görüşüm … olursa değişir" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Das stimmt nur unter einer Bedingung: Die Arbeit muss sich überhaupt verdichten lassen. " +
        "Bei mir selbst sehe ich das daran, dass ich an einem kurzen Tag kaum ins Internet schaue, " +
        "während ich an einem langen Tag zwischendurch eine halbe Stunde verliere, ohne es zu merken. " +
        "Als ich im letzten Semester nur vier Tage in der Bibliothek war, habe ich trotzdem gleich viel " +
        "geschafft, einfach weil ich vorher geplant habe, was an dem Tag fertig werden muss. " +
        "Nicht übertragbar ist das auf Arbeit, bei der jemand anwesend sein muss: In einer Bäckerei " +
        "oder auf einer Station kann man Kunden und Patienten nicht schneller machen. " +
        "Meine Meinung würde sich ändern, wenn Studien zeigen würden, dass die Fehler zunehmen, " +
        "sobald die Zeit knapper wird.",
      rubricHint:
        "Somut bir örnek ve bir sınır beklenir; „nur unter einer Bedingung“, „während“ ve „sobald“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g6",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "ein guter Plan, der gute Plan",
    genre: "grammar",
    intro: "Sıfatın eki, önündeki sözcüğün ne kadar bilgi verdiğine bağlıdır; üç durumu birbirinden ayır.",
    focus: "Sıfat çekimi: belirli, belirsiz ve artikelsiz",
    gloss: [
      { de: "der Plan", tr: "plan", en: "plan" },
      { de: "die Lösung", tr: "çözüm", en: "solution" },
      { de: "der Kollege", tr: "iş arkadaşı", en: "colleague" },
      { de: "frisch", tr: "taze", en: "fresh" },
      { de: "das Ergebnis", tr: "sonuç", en: "result" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Artikel bilgiyi taşıyorsa sıfat dinlenir",
        tr: "„der/die/das“ ismin cinsini ve hâlini zaten söyler. O yüzden sıfat yalnız iki ek alır: yalın tekilde ve dişil/nötr belirtme hâlinde -e (die neue Lösung, das neue Haus), geri kalan her yerde -en. Buna zayıf çekim denir ve en kolay tablodur.",
        examples: [
          { de: "Der gute Plan hat gefehlt.", tr: "İyi plan eksikti.", note: "yalın eril → -e" },
          { de: "Wir haben den guten Plan verworfen.", tr: "İyi planı reddettik.", note: "belirtme → -en" },
          { de: "Mit der neuen Lösung geht es schneller.", tr: "Yeni çözümle daha hızlı oluyor.", note: "Dativ → -en" },
        ],
      },
      {
        heading: "„ein“ bazı yerlerde susar, sıfat konuşur",
        tr: "„ein“ eril yalın ve nötr yalın/belirtme hâlinde ek almaz, yani cinsi söylemez. Orada bilgiyi sıfat taşır: eril -er, nötr -es. Geri kalan yerlerde tablo yine zayıf çekimle aynıdır. Aynısı „kein“ ve iyelik sözcükleri için de geçerli.",
        examples: [
          { de: "Das ist ein guter Plan.", tr: "Bu iyi bir plan.", note: "ein susuyor → -er" },
          { de: "Ich kaufe ein frisches Brot.", tr: "Taze bir ekmek alıyorum.", note: "nötr → -es" },
          { de: "Ich habe einen neuen Kollegen.", tr: "Yeni bir iş arkadaşım var.", note: "eril belirtme → -en" },
        ],
      },
      {
        heading: "Artikel hiç yoksa sıfat artikelin işini yapar",
        tr: "Çoğullarda ve sayılamayan isimlerde artikel düşebilir. O zaman sıfat, belirli artikelin ekini alır: „gute Pläne“, „frisches Brot“, „mit gutem Willen“. Ek listesi belirli artikelin son harfleriyle aynıdır.",
        examples: [
          { de: "Gute Pläne brauchen Zeit.", tr: "İyi planlar zaman ister.", note: "çoğul yalın → -e" },
          { de: "Wir arbeiten mit frischen Ideen.", tr: "Taze fikirlerle çalışıyoruz.", note: "çoğul Dativ → -en" },
          { de: "Das ist ein Ergebnis guter Arbeit.", tr: "Bu iyi bir çalışmanın sonucu.", note: "Genitiv dişil → -er" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist ein ___ Plan.",
        options: ["guter", "gute", "guten"],
        answer: 0,
        explain: "„ein“ eril yalında ek almaz; bilgiyi sıfat taşır: guter.",
      },
      {
        text: "Der ___ Plan hat trotzdem gefehlt.",
        options: ["guter", "gute", "guten"],
        answer: 1,
        explain: "Belirli artikel yalın erilde bilgiyi verir; sıfat yalnız -e alır.",
      },
      {
        text: "Wir arbeiten mit ___ Ideen.",
        options: ["frische", "frischer", "frischen"],
        answer: 2,
        explain: "Çoğul Dativ'de artikel olmadan sıfat -en alır.",
      },
      {
        kind: "gapfill",
        text: "Ich habe einen ___ Kollegen. (neu)",
        options: [],
        answer: 0,
        accept: ["neuen"],
        explain: "Eril belirtme hâlinde „einen“ eki taşıyor; sıfat -en alır.",
      },
      {
        kind: "gapfill",
        text: "Ich kaufe ein ___ Brot. (frisch)",
        options: [],
        answer: 0,
        accept: ["frisches"],
        explain: "Nötr yalın ve belirtmede „ein“ susar; sıfat -es alır.",
      },
      {
        kind: "gapfill",
        text: "Mit der ___ Lösung geht es schneller. (neu)",
        options: [],
        answer: 0,
        accept: ["neuen"],
        explain: "Belirli artikelden sonra Dativ'de sıfat her cinste -en alır.",
      },
      {
        kind: "gapfill",
        text: "___ Pläne brauchen Zeit. (gut, Plural ohne Artikel)",
        options: [],
        answer: 0,
        accept: ["Gute", "gute"],
        explain: "Artikelsiz çoğul yalında sıfat belirli artikelin ekini alır: -e.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "haben", "den", "guten", "Plan", "verworfen"],
        explain: "Belirli artikel + belirtme hâli: sıfat -en alır ve Partizip sonda kalır.",
      },
      {
        kind: "truefalse",
        text: "„Das ist ein gutes Idee.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„die Idee“ dişildir; doğrusu „eine gute Idee“.",
      },
      {
        kind: "truefalse",
        text: "„Das ist ein Ergebnis guter Arbeit.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Artikelsiz dişil Genitiv'de sıfat -er alır.",
      },
    ],
  },
];

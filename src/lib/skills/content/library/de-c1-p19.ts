import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 19 sade idari dil hattı: bir belediyenin yazılarını yeniden
 * kaleme alışı, bir anlaşılırlık araştırmacısının konuşması, bir resmî
 * yazının sade dille yeniden yazımı. Dil bilgisi isimlerin edat
 * bağımlılıkları — Kritik an, Verzicht auf, Einfluss auf, mit Bezug auf; B2'deki
 * edatlı fiillerin isim tarafı ve resmî yazının kalıplaşmış öbekleri.
 */
export const deC1P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r19",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Wie eine Stadt ihre Briefe neu schrieb",
    genre: "article",
    intro: "Bir dergi yazısı: bir belediye resmî yazılarını sade dille yeniden yazdı; ne kazanıldı, ne kaybedildi.",
    gloss: [
      { de: "das Schreiben", tr: "resmî yazı", en: "official letter" },
      { de: "ernüchternd", tr: "hayal kırıcı", en: "sobering" },
      { de: "nachreichen", tr: "sonradan teslim etmek", en: "to submit later" },
      { de: "die Neufassung", tr: "yeni metin", en: "revised version" },
      { de: "die Rechtsgrundlage", tr: "yasal dayanak", en: "legal basis" },
      { de: "die Rückfrage", tr: "ek soru", en: "query" },
    ],
    minutes: 10,
    text:
      "Wie eine Stadt ihre Briefe neu schrieb\n\n" +
      "Als die Stadtverwaltung von Kellheim vor drei Jahren beschloss, ihre Standardschreiben " +
      "zu überarbeiten, begann sie nicht mit den Texten, sondern mit den Anrufen. Ein Jahr lang " +
      "wurde notiert, weshalb Bürgerinnen und Bürger beim Bürgerservice anriefen. Das Ergebnis " +
      "war ernüchternd: Fast jeder dritte Anruf galt nicht einem Problem, sondern einem " +
      "Schreiben, das jemand nicht verstanden hatte.\n\n" +
      "Am schlechtesten schnitt ausgerechnet das häufigste Schreiben ab, die Aufforderung, " +
      "fehlende Unterlagen nachzureichen. Der alte Text begann mit zwei Paragrafen und nannte " +
      "das Wesentliche erst im vierten Absatz: welches Dokument fehlt und bis wann.\n\n" +
      "Die Neufassung dreht die Reihenfolge um. Der erste Satz sagt, was zu tun ist, der " +
      "zweite, bis wann, der dritte, was geschieht, wenn nichts geschieht. Die Rechtsgrundlage " +
      "steht weiterhin im Brief, aber am Ende und in kleinerer Schrift. Aus „Der " +
      "Antragstellende wird gebeten“ wurde „Bitte schicken Sie uns“.\n\n" +
      "Die Wirkung war messbar. Die Zahl der Rückfragen zu diesem Schreiben sank im ersten " +
      "Jahr um mehr als die Hälfte, und Anträge waren im Durchschnitt elf Tage früher " +
      "vollständig.\n\n" +
      "Widerstand kam nicht von den Bürgern, sondern aus der Rechtsabteilung. Ihre Sorge: Ein " +
      "einfacher Text sei ungenau, und Ungenauigkeit könne vor Gericht teuer werden. Die " +
      "Verwaltung nahm das ernst und ließ jede Neufassung juristisch prüfen. In zwei von " +
      "vierzig Fällen blieb es bei der alten Formulierung, weil sich das Gemeinte nicht " +
      "vereinfachen ließ, ohne es zu verändern.\n\n" +
      "Das Erstaunlichste am ganzen Vorhaben war aber etwas anderes. Die Mitarbeitenden, die " +
      "die Briefe schreiben, empfanden das Umschreiben zunächst als Kritik an ihrer Arbeit. " +
      "Beim Überarbeiten merkten viele, dass sie die alten Texte selbst nie ganz verstanden " +
      "hatten.",
    questions: [
      {
        text: "Womit begann die Stadt ihr Vorhaben?",
        options: [
          "mit einer Schulung der Mitarbeitenden",
          "mit einer Auswertung der Anrufe",
          "mit einem neuen Gesetz",
        ],
        answer: 1,
        explain: "Bir yıl boyunca vatandaşların neden aradığı not edildi; metinlerden önce aramalara bakıldı.",
      },
      {
        text: "Was war das Problem des alten Schreibens?",
        options: [
          "Es war viel zu kurz.",
          "Die Rechtsgrundlage fehlte.",
          "Das Wesentliche kam erst spät.",
        ],
        answer: 2,
        explain: "Hangi belgenin eksik olduğu ve ne zamana kadar gönderilmesi gerektiği ancak dördüncü paragrafta söyleniyordu.",
      },
      {
        kind: "truefalse",
        text: "Die Rechtsgrundlage steht auch im neuen Brief.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Hukuki dayanak kalıyor, yalnız sona ve daha küçük yazıyla.",
      },
      {
        kind: "gapfill",
        text: "Anträge waren im Durchschnitt ___ Tage früher vollständig.",
        options: [],
        answer: 0,
        accept: ["elf", "11"],
        explain: "„Anträge waren im Durchschnitt elf Tage früher vollständig.“",
      },
      {
        kind: "short_answer",
        text: "Woher kam der Widerstand gegen die neuen Briefe?",
        options: [],
        answer: 0,
        accept: ["aus der Rechtsabteilung", "von der Rechtsabteilung", "Rechtsabteilung"],
        explain: "Direniş vatandaşlardan değil hukuk biriminden geldi.",
      },
      {
        text: "Was merkten viele Mitarbeitende beim Überarbeiten?",
        options: [
          "dass sie die Texte selbst nie ganz verstanden hatten",
          "dass die Bürger zu wenig lasen",
          "dass die Juristen im Recht waren",
        ],
        answer: 0,
        explain: "Eski metinleri kendilerinin de hiçbir zaman tam anlamadığını fark ettiler.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l19",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Vortrag: Warum Fristen verpasst werden",
    genre: "info",
    intro: "Bir konferans konuşmasından bölüm: resmî mektuplardaki süreler neden kaçırılıyor, bir deneyde ne değişti?",
    gloss: [
      { de: "die Frist", tr: "süre", en: "deadline" },
      { de: "die Mahnung", tr: "ihtarname", en: "reminder notice" },
      { de: "die Rückfrage", tr: "soru", en: "query" },
      { de: "übersehen", tr: "gözden kaçırmak", en: "to overlook" },
      { de: "fett gedruckt", tr: "kalın harflerle", en: "in bold" },
      { de: "die Entlastung", tr: "rahatlama", en: "relief" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Moderator", text: "Auf einer Fachtagung zur Verwaltungssprache sprach die Sozialforscherin Frau Prof. Engel darüber, warum so viele Menschen Fristen in Behördenbriefen verpassen. Ein Auszug aus ihrem Vortrag." },
      { speaker: "Frau Prof. Engel", text: "Die übliche Antwort lautet: Die Leute kümmern sich nicht. Das stimmt fast nie. Die meisten, die eine Frist verpassen, haben den Brief geöffnet und sogar gelesen." },
      { speaker: "Frau Prof. Engel", text: "Wir haben mit einer mittelgroßen Stadt zusammengearbeitet und dreitausend Mahnungen verschickt, die Hälfte in der alten Fassung, die andere Hälfte neu gestaltet." },
      { speaker: "Frau Prof. Engel", text: "In der alten Fassung stand die Frist auf Seite zwei, mitten in einem Absatz. In der neuen stand sie ganz oben, fett gedruckt, zusammen mit dem Betrag und einer Telefonnummer." },
      { speaker: "Frau Prof. Engel", text: "Das Ergebnis hat uns selbst überrascht. Mit dem neuen Brief zahlten fast doppelt so viele Menschen pünktlich, und die Zahl der Rückfragen im Bürgerbüro sank um ein Drittel." },
      { speaker: "Frau Prof. Engel", text: "Interessant ist, dass es kaum einen Unterschied nach Bildung gab. Auch Menschen mit Hochschulabschluss hatten die Frist im alten Brief übersehen. Sie waren nur geduldiger am Telefon." },
      { speaker: "Frau Prof. Engel", text: "Daraus folgt etwas Unbequemes. Ein verständlicher Brief ist keine Rücksicht auf Schwache, sondern eine Entlastung für alle, auch für die Verwaltung selbst, die weniger Mahnungen schreiben muss." },
      { speaker: "Frau Prof. Engel", text: "Man hat uns oft vorgeworfen, wir wollten Behördenbriefe so stark vereinfachen, bis rechtlich nichts mehr stimmt. Das Gegenteil ist der Fall. Der rechtliche Teil bleibt vollständig, er steht nur weiter unten." },
      { speaker: "Moderator", text: "Der vollständige Vortrag ist in der Mediathek der Tagung abrufbar, zusammen mit den Folien und den Messdaten." },
    ],
    questions: [
      {
        text: "Warum verpassen laut Frau Prof. Engel viele Menschen eine Frist?",
        options: [
          "weil sie sich nicht kümmern",
          "weil sie den Brief nie öffnen",
          "weil die Frist im Brief schwer zu finden ist",
        ],
        answer: 2,
        explain: "Çoğu insan mektubu açıp okumuş; eski mektupta süre ikinci sayfada, bir paragrafın ortasında duruyordu.",
      },
      {
        text: "Wo stand die Frist im neuen Brief?",
        options: [
          "ganz oben, fett gedruckt",
          "auf Seite zwei",
          "im letzten Absatz",
        ],
        answer: 0,
        explain: "Yeni mektupta süre en üstte, kalın harflerle, tutar ve bir telefon numarasıyla birlikte duruyordu.",
      },
      {
        kind: "truefalse",
        text: "Menschen mit Hochschulabschluss haben die Frist im alten Brief nicht übersehen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Üniversite mezunları da süreyi gözden kaçırmıştı; yalnız telefonda daha sabırlıydılar.",
      },
      {
        kind: "gapfill",
        text: "Die Zahl der Rückfragen im Bürgerbüro sank um ein ___.",
        options: [],
        answer: 0,
        accept: ["Drittel"],
        explain: "„…und die Zahl der Rückfragen im Bürgerbüro sank um ein Drittel.“",
      },
      {
        kind: "short_answer",
        text: "Was ist ein verständlicher Brief laut Engel für alle?",
        options: [],
        answer: 0,
        accept: ["eine Entlastung", "Entlastung", "eine Entlastung für alle"],
        explain: "Zayıflara gösterilen bir özen değil, idarenin kendisi dâhil herkes için bir rahatlama.",
      },
      {
        text: "Was wirft man der Forschung oft vor?",
        options: [
          "Sie sei für Behörden zu teuer.",
          "Sie vereinfache die Briefe zu stark.",
          "Sie messe die falschen Dinge.",
        ],
        answer: 1,
        explain: "Mektupları hukuken doğru bir şey kalmayana dek sadeleştirmek istedikleri söyleniyor; oysa hukuki kısım eksiksiz kalıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w19",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Ein Schreiben verständlich neu fassen",
    genre: "formal",
    intro: "Bir resmî yazıyı sade dille yeniden kaleme alıyorsun: önce iki cümle kur, sonra yeni metni ve yaptığın değişiklikleri açıklayan kısa bir not yaz.",
    gloss: [
      { de: "die Neufassung", tr: "yeni metin", en: "revised version" },
      { de: "die Frist", tr: "son tarih", en: "deadline" },
      { de: "der Antragsteller", tr: "başvuru sahibi", en: "applicant" },
      { de: "das Wesentliche", tr: "esas olan", en: "the essentials" },
      { de: "ansprechen", tr: "hitap etmek", en: "to address" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "12 Nisan tarihli başvurunuza atfen belirtelim: bir belge hâlâ eksik.",
        answer: "Mit Bezug auf Ihren Antrag vom 12. April fehlt uns noch ein Dokument.",
        alternatives: ["Uns fehlt mit Bezug auf Ihren Antrag vom 12. April noch ein Dokument."],
        hint: "„Bezug“ „auf“ + Akkusativ ister: mit Bezug auf Ihren Antrag.",
      },
      {
        kind: "build",
        tr: "Uzmanlık terimlerinden vazgeçmek içeriği değiştirmiyor.",
        answer: "Der Verzicht auf Fachbegriffe verändert den Inhalt nicht.",
        alternatives: ["Den Inhalt verändert der Verzicht auf Fachbegriffe nicht."],
        hint: "„verzichten auf“ fiilinden gelen „der Verzicht“ da „auf“ + Akkusativ ister.",
      },
      {
        kind: "free",
        prompt:
          "Şu resmî cümleyi anlamını koruyarak sade bir belediye yazısına çevir, ardından ayrı bir notta yaptığın üç değişikliği gerekçelendir: „Seitens des Antragstellers ist die Nachreichung der fehlenden Unterlagen innerhalb einer Frist von vierzehn Tagen ab Zugang dieses Schreibens zu veranlassen, widrigenfalls eine Entscheidung nach Aktenlage erfolgt.“",
        checklist: [
          "Okura doğrudan hitap et ve ne yapacağını ilk cümlede söyle",
          "Süreyi ve süre dolarsa ne olacağını açıkça yaz",
          "Anlamdan hiçbir şey eksiltme",
          "Ayrı bir notta üç değişikliği gerekçelendir",
        ],
        minWords: 150,
        phrases: [
          { de: "Bitte schicken Sie uns bis zum … …", tr: "Lütfen bize … tarihine kadar … gönderin", en: "Please send us … by …" },
          { de: "Wenn wir bis dahin nichts von Ihnen erhalten, …", tr: "O zamana kadar sizden bir şey gelmezse …", en: "If we have not heard from you by then, …" },
          { de: "In der Neufassung habe ich …", tr: "Yeni metinde … yaptım", en: "In the revised version I have …" },
          { de: "Erhalten bleibt dabei …", tr: "Bu arada … korunuyor", en: "What is preserved is …" },
          { de: "Gestrichen habe ich lediglich …", tr: "Yalnızca … çıkardım", en: "All I have removed is …" },
        ],
        sample:
          "Sehr geehrte Frau Sommer, für Ihren Antrag auf Wohngeld fehlt uns noch Ihr aktueller " +
          "Mietvertrag. Bitte schicken Sie uns bis zum 14. Mai eine Kopie. Sie können sie per " +
          "Post schicken, bei uns abgeben oder im Online-Portal hochladen. Wenn wir bis dahin " +
          "nichts von Ihnen erhalten, entscheiden wir mit den Unterlagen, die uns vorliegen. Das " +
          "kann bedeuten, dass wir Ihren Antrag ablehnen müssen. Haben Sie Fragen, erreichen Sie " +
          "uns montags bis freitags von 8 bis 12 Uhr. Mit freundlichen Grüßen, Ihre Wohngeldstelle\n\n" +
          "Notiz zur Neufassung: In der Neufassung habe ich erstens die Leserin direkt " +
          "angesprochen, statt vom Antragsteller in der dritten Person zu reden. Zweitens steht " +
          "das Wesentliche jetzt am Anfang: welches Dokument fehlt und bis wann. Die Frist habe " +
          "ich als Datum angegeben, weil kaum jemand weiß, wann ein Schreiben rechtlich als " +
          "zugegangen gilt. Drittens habe ich die „Entscheidung nach Aktenlage“ ausgeschrieben " +
          "und ihre mögliche Folge offen genannt. Erhalten bleibt dabei die volle Bedeutung des " +
          "Originals; gestrichen habe ich lediglich das Amtsdeutsch, denn der Verzicht auf " +
          "Fachbegriffe verändert den Inhalt nicht.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s19",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Darf Verständlichkeit Genauigkeit kosten?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: iki değer arasında bir öncelik kur ve sınırını söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Resmî ya da uzman metinler herkesin anlayacağı dilde yazılırken bir miktar kesinlik kaybı kabul edilebilir mi? Hangisine öncelik verdiğini söyle, bir örnekle göster, önceliğinin nerede durduğunu belirt ve bu metinleri yazanlara bir tavsiye ver.",
      bulletsTr: [
        "Önceliğini ve gerekçesini söyle",
        "Bir örnekle göster",
        "Önceliğinin nerede durduğunu belirt",
        "Yazanlara bir tavsiye ver",
      ],
      targets: [
        { de: "Im Zweifel ziehe ich … vor, und zwar aus einem schlichten Grund: …", tr: "Şüphe hâlinde …'i tercih ederim, basit bir nedenle: …" },
        { de: "Ein Beispiel macht das greifbar: …", tr: "Bir örnek bunu somutlaştırır: …" },
        { de: "Aufhören würde ich dort, wo …", tr: "… olduğu noktada dururdum" },
        { de: "Wer solche Texte schreibt, sollte …", tr: "Bu tür metinleri yazan kişi … -meli" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Im Zweifel ziehe ich die Verständlichkeit vor, und zwar aus einem schlichten Grund: " +
        "Ein Text, den niemand versteht, ist nicht genau, sondern nur unangreifbar. Die " +
        "Genauigkeit existiert dann auf dem Papier, aber nicht im Kopf der Person, die danach " +
        "handeln soll. " +
        "Ein Beispiel macht das greifbar: Auf einem Beipackzettel stand einmal, das Medikament " +
        "sei bei eingeschränkter Nierenfunktion kontraindiziert. Meine Großmutter hat das " +
        "gelesen und das Mittel trotzdem genommen, weil sie das Wort nicht kannte. Ein Satz wie " +
        "„Nehmen Sie es nicht, wenn Ihre Nieren nicht richtig arbeiten“ wäre weniger fachlich " +
        "gewesen, aber genauer, weil er angekommen wäre. " +
        "Aufhören würde ich dort, wo das Vereinfachen den Inhalt verändert, etwa bei Fristen " +
        "oder bei Ausnahmen. Dort muss der genaue Wortlaut bleiben, aber er kann erklärt werden. " +
        "Wer solche Texte schreibt, sollte sie deshalb einer Person vorlegen, die das Fach nicht " +
        "kennt, und sie fragen, was sie jetzt tun würde. Stimmt die Antwort, ist der Text gut.",
      rubricHint:
        "Açık bir öncelik, somut bir örnek ve bir sınır beklenir; „im Zweifel“, Konjunktiv II („wäre … gewesen“) ve „dort, wo“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g19",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "die Kritik an, der Verzicht auf",
    genre: "grammar",
    intro: "Almancada birçok isim, türediği fiil gibi sabit bir edat ister; edatı yanlış seçmek cümleyi anlaşılmaz değil ama hemen yabancı kılar.",
    focus: "İsimlerin edat bağımlılıkları: Einfluss auf, Kritik an, Verzicht auf, Bezug auf, im Hinblick auf (B2'deki edatlı fiillerin isim tarafı)",
    gloss: [
      { de: "der Verzicht", tr: "feragat", en: "renunciation" },
      { de: "der Fachbegriff", tr: "uzmanlık terimi", en: "technical term" },
      { de: "der Einfluss", tr: "etki", en: "influence" },
      { de: "das Verständnis", tr: "anlama", en: "understanding" },
      { de: "das Interesse", tr: "ilgi", en: "interest" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Fiilden isme: edat çoğu zaman kalır",
        tr: "„verzichten auf“ → „der Verzicht auf“, „sich beziehen auf“ → „der Bezug auf“: edat çoğu zaman fiilden isme geçer, ama her zaman değil — „kritisieren“ ve „beeinflussen“ edatsızdır, „die Kritik“ ise „an“, „der Einfluss“ „auf“ ister. Edatın hâli de sabittir: burada „auf“ Akkusativ, „an“ Dativ ister.",
        examples: [
          { de: "Der Verzicht auf Fachbegriffe hat den Brief verständlicher gemacht.", tr: "Uzmanlık terimlerinden vazgeçmek yazıyı daha anlaşılır yaptı.", note: "auf + Akkusativ" },
          { de: "Die Kritik an den alten Briefen kam aus dem Bürgerservice.", tr: "Eski yazılara yönelik eleştiri vatandaş hizmetleri biriminden geldi.", note: "an + Dativ" },
          { de: "Der Einfluss der Satzlänge auf das Verständnis ist geringer als gedacht.", tr: "Cümle uzunluğunun anlamaya etkisi sanıldığından az.", note: "Einfluss auf" },
        ],
      },
      {
        heading: "Türkçeyle örtüşmeyen edatlar",
        tr: "Türkçe konuşan, edatı çoğu zaman Türkçedeki hâl ekinden tahmin eder ve yanılır: „-e ilgi“ „das Interesse an“ (Dativ), „-den korku“ „die Angst vor“, „-e cevap“ „die Antwort auf“, „… sorusu“ „die Frage nach“. Bu yüzden isim her zaman edatıyla birlikte öğrenilir.",
        examples: [
          { de: "Das Interesse an einfachen Texten ist groß.", tr: "Sade metinlere ilgi büyük.", note: "an + Dativ" },
          { de: "Viele Menschen haben Angst vor Briefen vom Amt.", tr: "Birçok insan resmî dairelerden gelen mektuplardan korkuyor.", note: "vor + Dativ" },
          { de: "Die Frage nach der Frist steht jetzt am Anfang.", tr: "Süreye dair soru artık başta duruyor.", note: "nach + Dativ" },
        ],
      },
      {
        heading: "Kalıplaşmış öbekler: mit Bezug auf, im Hinblick auf",
        tr: "Resmî yazıda bazı isim + edat öbekleri tek bir edat gibi kullanılır: „mit Bezug auf“ (… -e atfen), „im Hinblick auf“ (… açısından), „in Bezug auf“ (… konusunda). Üçü de „auf“ + Akkusativ ister ve yazıların ilk cümlesinde sık görülür.",
        examples: [
          { de: "Mit Bezug auf Ihr Schreiben vom 3. Mai teilen wir Ihnen Folgendes mit.", tr: "3 Mayıs tarihli yazınıza atfen size şunu bildiriyoruz.", note: "yazı açılışı" },
          { de: "Im Hinblick auf die Frist bitten wir um eine schnelle Antwort.", tr: "Süre açısından hızlı bir yanıt rica ediyoruz.", note: "im Hinblick auf" },
          { de: "In Bezug auf das Verständnis hat sich viel verbessert.", tr: "Anlaşılırlık konusunda çok şey iyileşti.", note: "in Bezug auf" },
        ],
      },
    ],
    questions: [
      {
        text: "Der Verzicht ___ Fachbegriffe hat den Brief verständlicher gemacht.",
        options: ["auf", "an", "von"],
        answer: 0,
        explain: "„verzichten auf“ fiilinden gelen isim de „auf“ + Akkusativ ister.",
      },
      {
        text: "Welche Verbindung ist richtig?",
        options: [
          "die Kritik über den Briefen",
          "die Kritik auf die Briefe",
          "die Kritik an den Briefen",
        ],
        answer: 2,
        explain: "„die Kritik“ „an“ + Dativ ister, fiili „kritisieren“ edatsız olsa da.",
      },
      {
        text: "„Im Hinblick auf die Frist …“ — Was bedeutet das?",
        options: ["trotz der Frist", "was die Frist betrifft", "nach der Frist"],
        answer: 1,
        explain: "„im Hinblick auf“ … açısından, … bakımından demektir.",
      },
      {
        kind: "gapfill",
        text: "Das Interesse ___ einfachen Texten ist groß.",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "„das Interesse“ „an“ + Dativ ister; Türkçedeki „-e“ yanıltıcıdır.",
      },
      {
        kind: "gapfill",
        text: "Viele Menschen haben Angst ___ Briefen vom Amt.",
        options: [],
        answer: 0,
        accept: ["vor"],
        explain: "„die Angst“ her zaman „vor“ + Dativ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "Mit Bezug ___ Ihr Schreiben vom 3. Mai teilen wir Ihnen Folgendes mit.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "„mit Bezug auf“ kalıplaşmış bir öbektir ve Akkusativ ister: Ihr Schreiben.",
      },
      {
        kind: "gapfill",
        text: "Die Frage ___ der Frist steht jetzt am Anfang.",
        options: [],
        answer: 0,
        accept: ["nach"],
        explain: "Bir şeyi soran soru „die Frage nach“ + Dativ ile kurulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Einfluss", "der Satzlänge", "auf das Verständnis", "ist geringer als gedacht"],
        explain: "Genitiv tamlama isme bağlanır, edat öbeği onun arkasından gelir.",
      },
      {
        kind: "truefalse",
        text: "Nach „Kritik an“ steht der Akkusativ.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„die Kritik an“ Dativ ister: die Kritik an den Briefen.",
      },
      {
        kind: "truefalse",
        text: "Ein Nomen übernimmt oft, aber nicht immer die Präposition seines Verbs.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„der Verzicht auf“ fiilinden gelir; „die Kritik an“ ise fiilde edat yokken ortaya çıkar.",
      },
    ],
  },
];

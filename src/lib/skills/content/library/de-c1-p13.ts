import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 13 müze ve iade hattı: bir müzenin kamuya açıklaması, bir köken
 * araştırmacısıyla söyleşi, danışma kuruluna bir öneri. Dil bilgisi
 * „es“in görevleri — zorunlu özne, Vorfeld'de yer tutucu ve korelat.
 */
export const deC1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r13",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Erklärung zur Rückgabe eines Türpfostens",
    genre: "report",
    intro: "Bir müzenin kamuya açıklaması: oymalı bir kapı direği neden iade ediliyor ve kanıtlanamayan şey nasıl tartılıyor.",
    gloss: [
      { de: "die Rückgabe", tr: "iade", en: "return" },
      { de: "das Inventarbuch", tr: "envanter defteri", en: "inventory register" },
      { de: "der Vermerk", tr: "şerh", en: "note" },
      { de: "nachweisen", tr: "belgelemek", en: "to prove" },
      { de: "die Provenienz", tr: "menşe", en: "provenance" },
      { de: "lückenhaft", tr: "eksik", en: "incomplete" },
    ],
    minutes: 10,
    text:
      "Erklärung des Städtischen Museums zur Rückgabe eines geschnitzten Türpfostens\n\n" +
      "Das Städtische Museum wird einen geschnitzten Türpfosten, der seit 1911 zu seiner " +
      "Sammlung gehört, an die Gemeinde zurückgeben, aus der er stammt. Der Beschluss ist " +
      "einstimmig gefallen, und wir möchten offenlegen, wie er zustande kam.\n\n" +
      "Es gibt kein Dokument, das einen Raub belegt. Es gibt allerdings auch keines, das " +
      "einen Kauf belegt. Im Inventarbuch stehen lediglich der Name eines Händlers und der " +
      "Vermerk „erworben auf Reisen“. Aus der Korrespondenz dieses Händlers wissen wir, dass " +
      "er in denselben Jahren mehrere Objekte aus Dörfern erhielt, die unter militärischer " +
      "Besatzung standen.\n\n" +
      "Lange galt in unserem Haus der Grundsatz, dass ein Objekt nur dann zurückgegeben " +
      "wird, wenn ein Unrecht nachgewiesen ist. Wir halten diesen Grundsatz nicht mehr für " +
      "haltbar. Er verlangt den Beweis ausgerechnet von der Seite, die keinen Zugang zu den " +
      "Akten hat, und er belohnt jede Lücke in unserer eigenen Dokumentation, statt sie uns " +
      "anzulasten.\n\n" +
      "Wir haben uns deshalb gefragt, welche Erklärung die wahrscheinlichere ist, und nicht, " +
      "welche sich beweisen lässt. Die Antwort fiel eindeutig aus, auch wenn sie keinen " +
      "Beweis ersetzt.\n\n" +
      "Es ist uns bewusst, dass diese Entscheidung Fragen nach anderen Objekten nach sich " +
      "ziehen wird. Wir begrüßen das. Die Provenienz von rund dreihundert weiteren Stücken " +
      "ist ähnlich lückenhaft, und wir werden die Ergebnisse unserer Prüfung bis Ende " +
      "nächsten Jahres vollständig veröffentlichen, auch dort, wo sie für uns unangenehm " +
      "sind.\n\n" +
      "Die Gemeinde hat angeboten, den Türpfosten für eine gemeinsame Ausstellung erneut " +
      "auszuleihen. Wir nehmen dieses Angebot dankbar an. Es ändert aber nichts an der " +
      "Reihenfolge: zuerst die Rückgabe, dann die Leihgabe. Wir danken der Gemeinde für " +
      "ihre Geduld.",
    questions: [
      {
        text: "Welche Unterlagen gibt es zu dem Türpfosten?",
        options: [
          "einen Kaufvertrag des Händlers",
          "nur einen knappen Eintrag im Inventarbuch",
          "einen Bericht über einen Raub",
        ],
        answer: 1,
        explain: "Envanter defterinde yalnız satıcının adı ve „erworben auf Reisen“ notu var.",
      },
      {
        text: "Warum hält das Museum seinen alten Grundsatz nicht mehr für haltbar?",
        options: [
          "Er verlangt den Beweis von der falschen Seite.",
          "Er wurde vom Stadtrat aufgehoben.",
          "Er galt nur für Gemälde.",
        ],
        answer: 0,
        explain: "Kanıtı dosyalara erişimi olmayan taraftan istiyor ve müzenin kendi boşluklarını ödüllendiriyor.",
      },
      {
        kind: "truefalse",
        text: "Das Museum entschied nach der wahrscheinlicheren Erklärung, nicht nach der beweisbaren.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„welche Erklärung die wahrscheinlichere ist, und nicht, welche sich beweisen lässt“.",
      },
      {
        kind: "gapfill",
        text: "Die Provenienz von rund ___ weiteren Stücken ist ähnlich lückenhaft.",
        options: [],
        answer: 0,
        accept: ["dreihundert", "300"],
        explain: "„Die Provenienz von rund dreihundert weiteren Stücken ist ähnlich lückenhaft.“",
      },
      {
        kind: "short_answer",
        text: "Welcher Vermerk steht im Inventarbuch?",
        options: [],
        answer: 0,
        accept: ["erworben auf Reisen", "auf Reisen erworben"],
        explain: "Satıcının adının yanında yalnız „erworben auf Reisen“ yazıyor.",
      },
      {
        text: "Was gilt für die gemeinsame Ausstellung?",
        options: [
          "Sie ersetzt die Rückgabe.",
          "Sie findet vor der Rückgabe statt.",
          "Sie folgt erst auf die Rückgabe.",
        ],
        answer: 2,
        explain: "Sıra değişmiyor: önce iade, sonra ödünç verme.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l13",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Interview: Wie man eine Lücke liest",
    genre: "interview",
    intro: "Bir köken araştırmacısıyla söyleşi: eksik kayıtlardan nasıl sonuç çıkarılıyor ve araştırmanın sınırı nerede.",
    gloss: [
      { de: "die Lücke", tr: "boşluk", en: "gap" },
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "die Rechnung", tr: "fatura", en: "invoice" },
      { de: "der Stempel", tr: "damga", en: "stamp" },
      { de: "die Herkunft", tr: "köken", en: "origin" },
      { de: "aussagekräftig", tr: "açıklayıcı", en: "meaningful" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Frau Lenz", text: "Herr Dr. Okafor, Sie verbringen Ihre Tage mit alten Inventarbüchern und Frachtlisten. Was suchen Sie darin eigentlich?" },
      { speaker: "Herr Dr. Okafor", text: "Meistens das, was fehlt: einen Eintrag ohne Preis, ein Datum, das nicht zur Reiseroute passt, einen Händler, der plötzlich auftaucht und wieder verschwindet. Die Lücke ist oft aussagekräftiger als der Eintrag." },
      { speaker: "Frau Lenz", text: "Aber eine Lücke allein beweist doch noch gar nichts, oder?" },
      { speaker: "Herr Dr. Okafor", text: "Allein nicht. Sie wird erst zu einem Hinweis, wenn man sie neben andere Quellen legt: Briefe, Frachtlisten, Zeitungen, manchmal auch die Tagebücher von Soldaten." },
      { speaker: "Herr Dr. Okafor", text: "In einem Fall hatten wir eine Rechnung, sauber, mit Stempel. Erst der Vergleich mit dem Tagebuch eines Offiziers zeigte, dass der angebliche Verkäufer zu diesem Zeitpunkt gar nicht mehr lebte." },
      { speaker: "Frau Lenz", text: "Wie oft kommen Sie am Ende zu einem wirklich eindeutigen Ergebnis?" },
      { speaker: "Herr Dr. Okafor", text: "Ehrlich gesagt selten. Bei etwa einem Viertel der Objekte können wir die Herkunft lückenlos klären, und zwar in beide Richtungen. Der Rest bleibt eine Frage der Wahrscheinlichkeit." },
      { speaker: "Frau Lenz", text: "Und wer entscheidet dann, was mit diesem Rest geschieht?" },
      { speaker: "Herr Dr. Okafor", text: "Nicht wir. Wir legen offen, was wir wissen und was nicht, und zwar in derselben Form für alle Objekte. Die Entscheidung trifft die Leitung, oft gemeinsam mit den Herkunftsgemeinschaften." },
      { speaker: "Herr Dr. Okafor", text: "Was ich mir wünsche, ist weniger Tempo als Öffentlichkeit. Jede Datenbank, die wir online stellen, bringt Hinweise von Menschen, an die wir nie gedacht hätten." },
      { speaker: "Herr Dr. Okafor", text: "Letztes Jahr hat uns eine Lehrerin geschrieben, deren Urgroßvater auf einem unserer Fotos zu sehen ist. Ihr Brief hat mehr geklärt als drei Monate Arbeit im Archiv." },
      { speaker: "Herr Dr. Okafor", text: "Solche Hinweise lassen sich nicht planen. Man kann ihnen nur die Tür öffnen, und genau das tun wir mit jeder Veröffentlichung." },
    ],
    questions: [
      {
        text: "Wonach sucht Herr Dr. Okafor in Inventarbüchern vor allem?",
        options: ["nach auffälligen Preisen", "nach berühmten Namen", "nach dem, was fehlt"],
        answer: 2,
        explain: "Fiyatı olmayan kayıt, rotaya uymayan tarih: boşluk çoğu zaman kaydın kendisinden çok şey söylüyor.",
      },
      {
        text: "Was zeigte der Vergleich mit dem Tagebuch eines Offiziers?",
        options: [
          "Der Verkäufer lebte damals nicht mehr.",
          "Die Rechnung war viel zu hoch.",
          "Der Stempel war nachgemacht.",
        ],
        answer: 0,
        explain: "Temiz, damgalı faturadaki satıcı o tarihte artık hayatta değildi.",
      },
      {
        kind: "truefalse",
        text: "Bei den meisten Objekten lässt sich die Herkunft eindeutig klären.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yalnız dörtte birinde köken eksiksiz netleşiyor; gerisi bir olasılık meselesi.",
      },
      {
        kind: "gapfill",
        text: "Bei etwa einem ___ der Objekte lässt sich die Herkunft lückenlos klären.",
        options: [],
        answer: 0,
        accept: ["Viertel"],
        explain: "„Bei etwa einem Viertel der Objekte können wir die Herkunft lückenlos klären.“",
      },
      {
        kind: "short_answer",
        text: "Wer trifft am Ende die Entscheidung?",
        options: [],
        answer: 0,
        accept: ["die Leitung", "die Museumsleitung", "die Leitung des Museums"],
        explain: "Araştırmacılar yalnız bilineni ve bilinmeyeni açıklıyor; kararı yönetim veriyor.",
      },
      {
        text: "Was hat der Brief einer Lehrerin bewirkt?",
        options: [
          "Er führte zu einer Klage.",
          "Er klärte mehr als monatelange Archivarbeit.",
          "Er bestätigte eine alte Rechnung.",
        ],
        answer: 1,
        explain: "„Ihr Brief hat mehr geklärt als drei Monate Arbeit im Archiv.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w13",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Empfehlung an den Museumsbeirat",
    genre: "report",
    intro: "Bir müzenin danışma kuruluna yazıyorsun: önce iki cümle kur, sonra belirsiz bir durumda gerekçeli bir öneri yaz.",
    gloss: [
      { de: "der Beirat", tr: "danışma kurulu", en: "advisory board" },
      { de: "die Schenkung", tr: "bağış", en: "donation" },
      { de: "die Wahrscheinlichkeit", tr: "olasılık", en: "probability" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
      { de: "offenlegen", tr: "beyan etmek", en: "to disclose" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Bu kararın başka sorular doğuracağının farkındayız.",
        answer: "Es ist uns bewusst, dass diese Entscheidung weitere Fragen aufwirft.",
        alternatives: ["Uns ist es bewusst, dass diese Entscheidung weitere Fragen aufwirft."],
        hint: "Buradaki „es“ arkadan gelen „dass“ cümlesini önceden haber verir; yan cümlede fiil sonda.",
      },
      {
        kind: "build",
        tr: "Bir haksızlığı kanıtlamak her zaman mümkün değildir.",
        answer: "Es ist nicht immer möglich, ein Unrecht nachzuweisen.",
        alternatives: ["Nicht immer ist es möglich, ein Unrecht nachzuweisen."],
        hint: "Başka bir öge öne geçse de „es“ fiilin arkasında kalır; mastarlı öbeği haber veriyor.",
      },
      {
        kind: "free",
        prompt:
          "Müzenin danışma kuruluna, nasıl edinildiği belgelenemeyen bir obje hakkında öneri yaz: objeyi ve eldeki kaynakları kısaca tanıt, bilinenle bilinmeyeni ayır, hangi ölçüte göre karar verilmesini önerdiğini gerekçelendir, önerinin riskini adlandır ve somut bir sonraki adımla bitir.",
        checklist: [
          "Objeyi ve eldeki kaynakları kısaca tanıt",
          "Bilinenle bilinmeyeni açıkça ayır",
          "Önerdiğin ölçütü gerekçelendir",
          "Riski adlandır ve somut bir adım öner",
        ],
        minWords: 150,
        phrases: [
          { de: "Gegenstand dieser Empfehlung ist …", tr: "Bu önerinin konusu …", en: "The subject of this recommendation is …" },
          { de: "Belegt ist lediglich, dass …", tr: "Kanıtlanmış olan yalnızca şu: …", en: "All that is documented is that …" },
          { de: "Ungeklärt bleibt dagegen, …", tr: "Buna karşılık belirsiz kalan şu: …", en: "What remains unclear, by contrast, is …" },
          { de: "Ich empfehle, nicht nach …, sondern nach … zu entscheiden.", tr: "…'e göre değil …'e göre karar verilmesini öneririm.", en: "I recommend deciding not by … but by …" },
          { de: "Das Risiko dieser Empfehlung liegt darin, dass …", tr: "Bu önerinin riski … olmasında yatıyor", en: "The risk of this recommendation lies in the fact that …" },
        ],
        sample:
          "Gegenstand dieser Empfehlung ist eine Sammlung von vierzehn Pfeifenköpfen aus Ton, " +
          "die 1928 als Schenkung in das Museum gelangte. " +
          "Belegt ist lediglich, dass der Schenker sie von einer Forschungsreise mitbrachte; " +
          "eine Rechnung oder ein Tauschvermerk existiert nicht. " +
          "Ungeklärt bleibt dagegen, ob die Stücke gekauft, getauscht oder ohne Zustimmung " +
          "mitgenommen wurden. Es ist uns bewusst, dass sich diese Frage mit den vorhandenen " +
          "Quellen nicht abschließend beantworten lässt. " +
          "Ich empfehle deshalb, nicht nach der Beweisbarkeit, sondern nach der " +
          "Wahrscheinlichkeit zu entscheiden, und zwar mit einem Maßstab, der für alle " +
          "vergleichbaren Fälle gilt. Dafür spricht vor allem, dass die bisherige Praxis den " +
          "Beweis von der Seite verlangt, die keinen Zugang zu unseren Akten hat. " +
          "Das Risiko dieser Empfehlung liegt darin, dass wir in einzelnen Fällen Objekte " +
          "abgeben, die rechtmäßig erworben wurden. Dieses Risiko halte ich für kleiner als das " +
          "umgekehrte. " +
          "Als nächsten Schritt schlage ich vor, die gesamte Dokumentation bis zum Frühjahr " +
          "offenzulegen und erst danach Kontakt mit der Herkunftsgemeinde aufzunehmen, damit " +
          "das Gespräch auf derselben Grundlage beginnt.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s13",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Was muss ein Museum zurückgeben?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: kanıtın eksik olduğu bir durumda nasıl karar verileceğine dair bir ilke öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir müze, nasıl edinildiği kanıtlanamayan bir objeyi iade etmeli mi? Bir karar ilkesi öner, ilkeyi bir örnekle sına, ilkenin kötüye kullanılabileceği bir durumu kabul et ve ilkeni bir usulle güvenceye al.",
      bulletsTr: [
        "Bir karar ilkesi öner",
        "İlkeyi bir örnekle sına",
        "İlkenin kötüye kullanılabileceği durumu kabul et",
        "İlkeyi bir usulle güvenceye al",
      ],
      targets: [
        { de: "Mein Grundsatz wäre: Im Zweifel …", tr: "İlkem şu olurdu: şüphe hâlinde …" },
        { de: "An einem Beispiel lässt sich das prüfen: …", tr: "Bunu bir örnekle sınamak mümkün: …" },
        { de: "Missbrauchen ließe sich das, wenn …", tr: "… olursa bu kötüye kullanılabilirdi" },
        { de: "Absichern würde ich das durch …", tr: "Bunu … ile güvenceye alırdım" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Mein Grundsatz wäre: Im Zweifel entscheidet nicht, was sich beweisen lässt, sondern " +
        "welche Erklärung wahrscheinlicher ist. Der Beweis ist nämlich ungleich verteilt; " +
        "die Museen haben die Akten, die Herkunftsgemeinden meistens nur ihre Erinnerung. " +
        "An einem Beispiel lässt sich das prüfen: Ein Objekt wurde in einem Jahr erworben, in " +
        "dem die Region besetzt war, und der Händler ist aus anderen Fällen als Hehler " +
        "bekannt. Einen Kaufvertrag gibt es nicht. Nach dem alten Grundsatz bliebe das Objekt " +
        "hier, nach meinem ginge es zurück. " +
        "Missbrauchen ließe sich das, wenn man jede Lücke automatisch als Unrecht läse, auch " +
        "dort, wo ein Kauf schlicht nicht aufgeschrieben wurde, weil das damals niemand für " +
        "nötig hielt. " +
        "Absichern würde ich den Grundsatz deshalb durch ein Verfahren: Jede Entscheidung " +
        "wird mit ihren Gründen veröffentlicht, und ein Gremium, in dem auch die " +
        "Herkunftsseite sitzt, prüft sie. Dann kann man über einzelne Fälle streiten, ohne " +
        "den Grundsatz selbst aufzugeben.",
      rubricHint:
        "Bir ilke, bir örnekle sınama, kötüye kullanımın kabulü ve bir usul beklenir; „im Zweifel“, Konjunktiv II („bliebe“, „ginge“) ve „absichern durch“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g13",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Es ist uns bewusst, dass …",
    genre: "grammar",
    intro: "Küçük „es“ Almancada birkaç ayrı iş görür; hangisi olduğunu bilmeyen onu yanlış yere koyar ya da gereksiz yere atar.",
    focus: "„es“in görevleri: zorunlu özne, Vorfeld'de yer tutucu ve korelat",
    gloss: [
      { de: "die Schenkung", tr: "bağış", en: "donation" },
      { de: "der Beleg", tr: "kanıt", en: "proof" },
      { de: "der Zeuge", tr: "tanık", en: "witness" },
      { de: "ablehnen", tr: "reddetmek", en: "to refuse" },
      { de: "bewusst", tr: "farkında", en: "aware" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Zorunlu es: anlamsal öznesi olmayan fiiller",
        tr: "Hava fiilleri ve bazı kalıplar (es gibt, es geht um, es handelt sich um) anlam bakımından bir özne taşımaz, ama Almanca cümle bir özne ister. Bu „es“ hiçbir konumda düşmez; başka bir öge öne geçerse fiilin arkasına geçer. Türkçede öznesiz kurulan pek çok cümle Almancada bu „es“i alır.",
        examples: [
          { de: "Es gibt kein Dokument, das einen Kauf belegt.", tr: "Satın almayı kanıtlayan bir belge yok.", note: "es gibt" },
          { de: "Hier handelt es sich um eine Schenkung.", tr: "Burada söz konusu olan bir bağış.", note: "yer değiştirir ama kalır" },
          { de: "Im Depot regnet es durch das Dach.", tr: "Depoda çatıdan yağmur sızıyor.", note: "hava fiili" },
        ],
      },
      {
        heading: "Vorfeld-es: yalnız ilk yeri doldurur",
        tr: "Bazen „es“ yalnız fiilden önceki yeri doldurmak için gelir; asıl özne arkada durur: „Es meldeten sich drei Zeugen.“ Fiil gerçek özneye göre çekimlenir. Başka bir öge öne geçince bu yer tutucu tamamen kaybolur. Öznesiz edilgende de aynı şey olur.",
        examples: [
          { de: "Es meldeten sich drei Zeugen.", tr: "Üç tanık başvurdu.", note: "fiil çoğul: özne Zeugen" },
          { de: "Gestern meldeten sich drei Zeugen.", tr: "Dün üç tanık başvurdu.", note: "es kayboldu" },
          { de: "Im Beirat wurde lange diskutiert.", tr: "Kurulda uzun uzun tartışıldı.", note: "öznesiz edilgen, es yok" },
        ],
      },
      {
        heading: "Korelat es: arkadaki cümleyi haber verir",
        tr: "„Es ist uns bewusst, dass …“ cümlesinde „es“ arkadan gelen „dass“ cümlesini ya da mastarlı öbeği önceden haber verir. Yan cümle öne geçince bu „es“ çoğunlukla düşer. Bazı fiillerde (ablehnen, genießen, schaffen) korelat nesne görevindedir ve orta alanda kalır.",
        examples: [
          { de: "Es ist uns bewusst, dass die Frage offen bleibt.", tr: "Sorunun açık kaldığının farkındayız.", note: "es = dass-cümlesi" },
          { de: "Dass die Frage offen bleibt, ist uns bewusst.", tr: "Sorunun açık kaldığının farkındayız.", note: "yan cümle önde: es düşer" },
          { de: "Das Museum lehnt es ab, die Akten zu schließen.", tr: "Müze dosyaları kapatmayı reddediyor.", note: "nesne korelatı" },
        ],
      },
    ],
    questions: [
      {
        text: "Gestern ___ sich drei Zeugen.",
        options: ["meldete es", "meldeten", "meldete"],
        answer: 1,
        explain: "Başka bir öge öne geçince yer tutucu „es“ düşer; fiil çoğul özneye uyar.",
      },
      {
        text: "In welchem Satz bleibt „es“, auch wenn ein anderes Satzglied vorne steht?",
        options: [
          "Es kamen viele Besucher.",
          "Es wurde lange diskutiert.",
          "Es gibt keinen Beleg.",
        ],
        answer: 2,
        explain: "„es gibt“ zorunlu öznedir: „Heute gibt es keinen Beleg.“",
      },
      {
        text: "„Dass die Frage offen bleibt, ist uns bewusst.“ — Warum fehlt hier „es“?",
        options: [
          "weil der dass-Satz selbst vorne steht",
          "weil „bewusst“ kein „es“ erlaubt",
          "weil der Satz im Passiv steht",
        ],
        answer: 0,
        explain: "Korelatın haber verdiği yan cümle öne geçince „es“e gerek kalmaz.",
      },
      {
        kind: "gapfill",
        text: "Hier handelt ___ sich um eine Schenkung.",
        options: [],
        answer: 0,
        accept: ["es"],
        explain: "„es handelt sich um“ zorunlu „es“ taşır; Vorfeld dolu olsa da düşmez.",
      },
      {
        kind: "gapfill",
        text: "Das Museum lehnt ___ ab, die Akten zu schließen.",
        options: [],
        answer: 0,
        accept: ["es"],
        explain: "„ablehnen“ mastarlı öbeği nesne korelatı „es“ ile haber verir.",
      },
      {
        kind: "gapfill",
        text: "Im Beirat ___ lange diskutiert. (werden, Präteritum)",
        options: [],
        answer: 0,
        accept: ["wurde"],
        explain: "Öznesiz edilgende Vorfeld doluysa „es“ gelmez; fiil tekil kalır.",
      },
      {
        kind: "gapfill",
        text: "___ gibt keinen Beleg für einen Kauf.",
        options: [],
        answer: 0,
        accept: ["Es", "es"],
        explain: "„es gibt“ kalıbında „es“ zorunlu öznedir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Heute", "gibt", "es", "keinen Beleg", "mehr"],
        explain: "Zorunlu „es“ Vorfeld başka bir ögeyle dolunca fiilin arkasına geçer ama düşmez.",
      },
      {
        kind: "truefalse",
        text: "In „Es kamen viele Besucher“ ist „es“ das Subjekt des Satzes.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Özne „viele Besucher“dır; „es“ yalnız ilk yeri doldurur ve fiil çoğuldur.",
      },
      {
        kind: "truefalse",
        text: "Steht der dass-Satz am Anfang, fällt das Korrelat „es“ meistens weg.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Haber verilecek cümle zaten öndeyse korelata gerek kalmaz.",
      },
    ],
  },
];

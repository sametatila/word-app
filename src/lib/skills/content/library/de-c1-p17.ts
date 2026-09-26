import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 17 miras ve aile hattı: kısa bir anlatı, bir noterin sesli rehberi,
 * kardeşlere bir mektup. Dil bilgisi resmî Genitiv edatları — angesichts,
 * infolge, mangels, ungeachtet, zugunsten; B1'deki wegen/trotz'un ötesinde
 * hukuk ve yönetim dilinin taşıyıcıları.
 */
export const deC1P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r17",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Das Haus in der Lindenstraße",
    genre: "story",
    intro: "Kısa bir anlatı: üç kardeş anne babalarının evini boşaltırken mirasın aslında neyi bölüştürdüğünü fark ediyor.",
    gloss: [
      { de: "die Beerdigung", tr: "cenaze töreni", en: "funeral" },
      { de: "das Testament", tr: "vasiyetname", en: "will" },
      { de: "erben", tr: "miras almak", en: "to inherit" },
      { de: "der Makler", tr: "emlakçı", en: "real estate agent" },
      { de: "schätzen", tr: "değer biçmek", en: "to value" },
      { de: "die Anerkennung", tr: "takdir", en: "recognition" },
    ],
    minutes: 10,
    text:
      "Das Haus in der Lindenstraße\n\n" +
      "Drei Wochen nach der Beerdigung trafen sich die Geschwister zum ersten Mal wieder im " +
      "Haus ihrer Eltern. Jana kam mit Umzugskartons, Tobias mit einer Liste, und Marek, der " +
      "Jüngste, kam als Letzter und ohne alles.\n\n" +
      "Die Liste war vernünftig. Tobias hatte den Wert der Möbel schätzen lassen, das Konto " +
      "aufgeteilt und einen Makler angefragt. Nach dem Testament erbten alle drei zu gleichen " +
      "Teilen, und angesichts der Zahlen gab es eigentlich nichts zu besprechen.\n\n" +
      "Es gab trotzdem etwas. Jana hatte die Mutter in ihren letzten beiden Jahren fast " +
      "täglich besucht, sie zum Arzt gefahren und ihre Post erledigt. Sie hatte nie Geld dafür " +
      "verlangt und verlangte auch jetzt keines. Aber als Tobias den Schreibtisch des Vaters " +
      "für den Verkauf fotografierte, sagte sie: „Den nicht.“\n\n" +
      "Ungeachtet seines geringen Werts wollte sie ausgerechnet dieses Stück. Tobias verstand " +
      "es nicht, und das war ihm anzusehen. Marek, der bis dahin geschwiegen hatte, fragte, ob " +
      "man den Schreibtisch nicht einfach aus der Rechnung herausnehmen könne. Tobias " +
      "antwortete, dann könne man gleich alles herausnehmen.\n\n" +
      "Es war der erste Streit seit Jahren, und er drehte sich um ein Möbelstück, das keiner " +
      "von ihnen brauchte. Erst am Abend, beim Einpacken der Küche, sagte Jana, worum es ihr " +
      "ging: nicht um den Tisch, sondern darum, dass jemand anerkannte, was sie getan hatte. " +
      "Mangels einer anderen Form war der Tisch diese Anerkennung.\n\n" +
      "Tobias strich ihn von der Liste. Das Haus wurde im Frühjahr verkauft, die Summe durch " +
      "drei geteilt. Der Schreibtisch steht jetzt in Janas Arbeitszimmer. Wenn Tobias sie " +
      "besucht, legt er manchmal die Hand darauf, sagt aber nichts.",
    questions: [
      {
        text: "Was brachte Tobias zum ersten Treffen mit?",
        options: ["eine Liste", "Umzugskartons", "gar nichts"],
        answer: 0,
        explain: "Jana kolilerle, Tobias bir listeyle, Marek ise eli boş geldi.",
      },
      {
        text: "Warum wollte Jana den Schreibtisch?",
        options: [
          "weil er viel Geld wert war",
          "weil sie einen Tisch brauchte",
          "weil er ihre Mühe anerkennen sollte",
        ],
        answer: 2,
        explain: "Mesele masa değil, annesine yaptığı bakımın görülmesiydi.",
      },
      {
        kind: "truefalse",
        text: "Laut Testament erbten die drei Geschwister zu gleichen Teilen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Nach dem Testament erbten alle drei zu gleichen Teilen.“",
      },
      {
        kind: "gapfill",
        text: "Jana hatte die Mutter in ihren letzten ___ Jahren fast täglich besucht.",
        options: [],
        answer: 0,
        accept: ["beiden", "zwei", "2"],
        explain: "„in ihren letzten beiden Jahren fast täglich“.",
      },
      {
        kind: "short_answer",
        text: "Wo steht der Schreibtisch heute?",
        options: [],
        answer: 0,
        accept: ["in Janas Arbeitszimmer", "bei Jana", "in ihrem Arbeitszimmer"],
        explain: "„Der Schreibtisch steht jetzt in Janas Arbeitszimmer.“",
      },
      {
        text: "Was tut Tobias heute, wenn er Jana besucht?",
        options: [
          "Er verlangt den Tisch zurück.",
          "Er legt manchmal die Hand darauf.",
          "Er meidet das Arbeitszimmer.",
        ],
        answer: 1,
        explain: "Elini bazen masanın üstüne koyuyor ama bir şey söylemiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l17",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Ratgeber: Wenn ein Testament Streit sät",
    genre: "guide",
    intro: "Bir sesli rehber: bir noter vasiyetnamede en sık yapılan hataları ve kardeşler arası kavgayı önlemenin yollarını anlatıyor.",
    gloss: [
      { de: "handschriftlich", tr: "el yazısıyla", en: "handwritten" },
      { de: "unwirksam", tr: "hükümsüz", en: "void" },
      { de: "der Nachlass", tr: "tereke", en: "estate" },
      { de: "berücksichtigen", tr: "dikkate almak", en: "to take into account" },
      { de: "der Pflichtteil", tr: "saklı pay", en: "compulsory portion" },
      { de: "hinterlegen", tr: "emanet bırakmak", en: "to deposit" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Moderatorin", text: "Die meisten Streitigkeiten ums Erbe entstehen nicht aus Gier, sondern aus Missverständnissen, und viele davon hätten sich mit wenigen Sätzen vermeiden lassen, hätte man sie rechtzeitig aufgeschrieben." },
      { speaker: "Herr Dr. Falk", text: "Der häufigste Fehler ist ein Testament, das nur Anteile regelt. Wer schreibt, alle Kinder erben zu gleichen Teilen, sagt nichts darüber, wer das Haus bekommt und wer es räumen muss." },
      { speaker: "Moderatorin", text: "Ein handschriftliches Testament ist gültig, wenn es vollständig mit der Hand geschrieben und unterschrieben ist. Ein am Computer geschriebener Text mit Unterschrift reicht dagegen nicht." },
      { speaker: "Herr Dr. Falk", text: "Das überrascht jede Woche jemanden in meiner Kanzlei. Ausgerechnet die ordentlichsten Menschen tippen ihr Testament, weil es sauberer aussieht, und machen es damit unwirksam." },
      { speaker: "Moderatorin", text: "Der zweite Fehler betrifft die Pflege. Wenn ein Kind die Eltern jahrelang gepflegt hat, wird das im Nachlass nur unter bestimmten Bedingungen berücksichtigt." },
      { speaker: "Herr Dr. Falk", text: "Wer möchte, dass diese Arbeit anerkannt wird, sollte es ausdrücklich hineinschreiben, mit einem Betrag oder einem bestimmten Gegenstand. Sonst bleibt es dem Streit der Geschwister überlassen." },
      { speaker: "Moderatorin", text: "Drittens: Auch wer enterbt wird, geht meistens nicht leer aus. Kinder haben Anspruch auf einen Pflichtteil, der die Hälfte ihres gesetzlichen Erbteils beträgt." },
      { speaker: "Herr Dr. Falk", text: "Ich rate außerdem zu einem Brief, der rechtlich nicht bindend ist, aber erklärt, warum man etwas so entschieden hat. Er verhindert keinen Prozess, aber erstaunlich oft den Bruch." },
      { speaker: "Moderatorin", text: "Und schließlich, ganz praktisch: Das Testament sollte dort liegen, wo es auch gefunden wird. Beim Amtsgericht kann man es gegen eine geringe Gebühr hinterlegen." },
      { speaker: "Herr Dr. Falk", text: "Ein Testament in der Schublade ist gut gemeint. Ein Testament, das niemand findet, ist gar keines, so sorgfältig es auch geschrieben sein mag." },
    ],
    questions: [
      {
        text: "Woraus entstehen laut Beitrag die meisten Erbstreitigkeiten?",
        options: ["aus Gier", "aus Missverständnissen", "aus hohen Steuern"],
        answer: 1,
        explain: "Açgözlülükten değil yanlış anlamalardan; çoğu birkaç cümleyle önlenebilirdi.",
      },
      {
        text: "Wann ist ein handschriftliches Testament gültig?",
        options: [
          "wenn alles von Hand geschrieben ist",
          "wenn es am Computer unterschrieben ist",
          "wenn zwei Zeugen dabei sind",
        ],
        answer: 0,
        explain: "Tamamı elle yazılıp imzalanmalı; bilgisayarda yazılıp imzalanan metin yetmiyor.",
      },
      {
        kind: "truefalse",
        text: "Wer enterbt wird, bekommt grundsätzlich nichts.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Çocukların yasal paylarının yarısı kadar bir saklı pay hakkı var.",
      },
      {
        kind: "gapfill",
        text: "Der Pflichtteil beträgt die ___ des gesetzlichen Erbteils.",
        options: [],
        answer: 0,
        accept: ["Hälfte"],
        explain: "„der die Hälfte ihres gesetzlichen Erbteils beträgt“.",
      },
      {
        kind: "short_answer",
        text: "Was empfiehlt Dr. Falk zusätzlich zum Testament?",
        options: [],
        answer: 0,
        accept: ["einen erklärenden Brief", "einen Brief", "einen Brief mit Begründung"],
        explain: "Hukuken bağlayıcı olmayan ama kararın nedenini açıklayan bir mektup öneriyor.",
      },
      {
        text: "Wo kann man das Testament laut Beitrag hinterlegen?",
        options: ["bei der Bank", "bei der Gemeinde", "beim Amtsgericht"],
        answer: 2,
        explain: "Küçük bir ücret karşılığında sulh mahkemesine emanet edilebiliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w17",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Brief an die Geschwister",
    genre: "personal",
    intro: "Kardeşlerine yazıyorsun: önce iki cümle kur, sonra ortak bir mirası bölüşmek için duyguyu da hesabı da ciddiye alan bir mektup yaz.",
    gloss: [
      { de: "der Erlös", tr: "satış geliri", en: "proceeds" },
      { de: "die Aufteilung", tr: "paylaşım", en: "division" },
      { de: "das Erinnerungsstück", tr: "hatıra eşya", en: "keepsake" },
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "die Anrechnung", tr: "mahsup", en: "offsetting" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Evin durumu göz önüne alındığında satışı en adil çözüm buluyorum.",
        answer: "Angesichts des Zustands des Hauses halte ich einen Verkauf für die fairste Lösung.",
        alternatives: ["Einen Verkauf halte ich angesichts des Zustands des Hauses für die fairste Lösung."],
        hint: "„angesichts“ Genitiv ister: des Zustands; arkasındaki tamlama da Genitiv'dedir.",
      },
      {
        kind: "build",
        tr: "Değerine bakılmaksızın bu tablo kız kardeşimize kalmalı.",
        answer: "Ungeachtet seines Werts sollte das Bild an unsere Schwester gehen.",
        alternatives: ["Das Bild sollte ungeachtet seines Werts an unsere Schwester gehen."],
        hint: "„ungeachtet“ Genitiv ister ve „… -e bakmaksızın“ anlamına gelir; „trotz“tan daha resmîdir.",
      },
      {
        kind: "free",
        prompt:
          "Kardeşlerine, anne babanızdan kalan evin ve eşyaların nasıl paylaşılacağına dair bir mektup yaz: önce duygusal bir noktayı adlandır, parasal bölüşüm için somut bir öneri getir, bir kardeşin özel katkısının nasıl tanınabileceğini öner, anlaşamazsanız ne yapılacağını söyle ve sıcak bir kapanışla bitir.",
        checklist: [
          "Duygusal bir noktayı açıkça adlandır",
          "Parasal bölüşüm için somut bir öneri getir",
          "Bir kardeşin katkısının nasıl tanınacağını öner",
          "Anlaşamazsanız ne yapılacağını söyle ve sıcak bir kapanış yaz",
        ],
        minWords: 150,
        phrases: [
          { de: "Bevor wir über Zahlen sprechen, möchte ich etwas anderes sagen: …", tr: "Rakamlardan önce başka bir şey söylemek istiyorum: …", en: "Before we talk about numbers, I would like to say something else: …" },
          { de: "Mein Vorschlag für die Aufteilung ist folgender: …", tr: "Paylaşım için önerim şu: …", en: "My proposal for the division is as follows: …" },
          { de: "Zugunsten von … würde ich vorschlagen, dass …", tr: "…'in lehine şunu öneririm: …", en: "In favor of …, I would suggest that …" },
          { de: "Sollten wir uns nicht einigen, …", tr: "Anlaşamazsak …", en: "Should we fail to agree, …" },
          { de: "Wichtiger als jede Summe ist mir, dass …", tr: "Benim için her tutardan önemli olan şu: …", en: "More important to me than any sum is that …" },
        ],
        sample:
          "Liebe Jana, lieber Marek, bevor wir über Zahlen sprechen, möchte ich etwas anderes " +
          "sagen: Ich habe beim letzten Treffen gemerkt, dass ich zu schnell zur Liste " +
          "übergegangen bin, und das tut mir leid. " +
          "Mein Vorschlag für die Aufteilung ist folgender: Angesichts des Zustands des Hauses " +
          "halte ich einen Verkauf für die fairste Lösung, weil keiner von uns die Renovierung " +
          "allein tragen könnte. Der Erlös wird, wie im Testament vorgesehen, gedrittelt. " +
          "Zugunsten von Jana würde ich vorschlagen, dass sie sich vorab drei Erinnerungsstücke " +
          "aussucht, ungeachtet ihres Werts und ohne Anrechnung auf ihren Anteil. Das ist kein " +
          "Lohn für die zwei Jahre, in denen sie Mama begleitet hat; das ließe sich gar nicht " +
          "bezahlen. Es ist nur ein Zeichen, dass wir es gesehen haben. " +
          "Sollten wir uns bei einzelnen Dingen nicht einigen, schlage ich vor, dass wir " +
          "abwechselnd wählen, statt zu streiten. " +
          "Wichtiger als jede Summe ist mir, dass wir uns nach dem Verkauf noch gern besuchen. " +
          "Ich rufe euch am Sonntag an. Euer Tobias",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s17",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Gleich erben oder gerecht erben?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: eşitlik ile hakkaniyet arasında bir ayrım kur ve kendi tercihini gerekçelendir.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir miras kardeşler arasında her zaman eşit mi bölünmeli, yoksa bakım ya da ihtiyaç gibi durumlar hesaba katılmalı mı? Eşit ile adil arasındaki farkı tanımla, bir örnekle sına, kendi tercihinin riskini kabul et ve bir kural öner.",
      bulletsTr: [
        "Eşit ile adil arasındaki farkı tanımla",
        "Farkı bir örnekle sına",
        "Tercihinin riskini kabul et",
        "Bir kural öner",
      ],
      targets: [
        { de: "Gleich ist nicht dasselbe wie gerecht: …", tr: "Eşit, adil ile aynı şey değil: …" },
        { de: "Deutlich wird das an einem Fall wie diesem: …", tr: "Bu, şöyle bir durumda netleşiyor: …" },
        { de: "Das Risiko meiner Position liegt darin, dass …", tr: "Konumumun riski … olmasında yatıyor" },
        { de: "Als Regel würde ich vorschlagen: …", tr: "Kural olarak şunu öneririm: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Gleich ist nicht dasselbe wie gerecht: Gleich heißt, dass jeder denselben Anteil " +
        "bekommt, gerecht heißt, dass berücksichtigt wird, was jemand gegeben oder gebraucht hat. " +
        "Deutlich wird das an einem Fall wie diesem: Eine Tochter pflegt ihren Vater fünf Jahre " +
        "lang, reduziert dafür ihre Arbeitszeit und verliert Rentenansprüche, während ihr Bruder " +
        "im Ausland lebt und zweimal im Jahr anruft. Eine Teilung zu gleichen Teilen wäre hier " +
        "formal korrekt, aber sie würde die Pflege behandeln, als hätte es sie nie gegeben. " +
        "Das Risiko meiner Position liegt darin, dass man jede Leistung aufrechnen könnte, bis " +
        "Geschwister einander Rechnungen schreiben, und das zerstört genau die Familie, um die " +
        "es geht. " +
        "Als Regel würde ich deshalb vorschlagen: grundsätzlich gleich, mit einer einzigen " +
        "Ausnahme für Pflege, die über längere Zeit geleistet wurde, und zwar festgelegt von " +
        "den Eltern selbst, solange sie es noch können. Dann streiten die Kinder nicht über den " +
        "Wert der Pflege, sondern respektieren eine Entscheidung.",
      rubricHint:
        "İki kavramın ayrımı, somut bir örnek ve kendi konumunun riskinin kabulü beklenir; „nicht dasselbe wie“, „als hätte“ ve „das Risiko liegt darin, dass“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g17",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "angesichts, infolge, ungeachtet",
    genre: "grammar",
    intro: "Resmî ve hukuki Almanca birçok ilişkiyi yan cümle yerine tek bir Genitiv edatıyla kurar; bu edatları tanımak metni açar.",
    focus: "Resmî Genitiv edatları: angesichts, infolge, mangels, ungeachtet, zugunsten (wegen/trotz'un ötesi)",
    gloss: [
      { de: "das Testament", tr: "vasiyetname", en: "will" },
      { de: "unwirksam", tr: "hükümsüz", en: "void" },
      { de: "der Formfehler", tr: "şekil hatası", en: "formal error" },
      { de: "verzichten", tr: "vazgeçmek", en: "to renounce" },
      { de: "die Erbfolge", tr: "mirasçılık sırası", en: "order of succession" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Gerekçe ve sonuç: angesichts, infolge, aufgrund",
        tr: "„angesichts“ (… göz önüne alınınca) bir durumu gerekçe yapar; „infolge“ (… sonucunda) bir olayın sonucunu bağlar; „aufgrund“ (… nedeniyle) „wegen“in resmî karşılığıdır. Üçü de Genitiv ister ve bir yan cümlenin yerini tutar: „weil die Zahlen so waren“ yerine „angesichts der Zahlen“.",
        examples: [
          { de: "Angesichts der Zahlen gab es nichts zu besprechen.", tr: "Rakamlar göz önüne alınınca konuşacak bir şey yoktu.", note: "= weil die Zahlen so waren" },
          { de: "Infolge des Streits wurde der Verkauf verschoben.", tr: "Tartışma sonucunda satış ertelendi.", note: "sonuç" },
          { de: "Aufgrund eines Formfehlers ist das Testament unwirksam.", tr: "Bir şekil hatası nedeniyle vasiyetname geçersiz.", note: "resmî „wegen“" },
        ],
      },
      {
        heading: "Eksiklik ve karşıtlık: mangels, ungeachtet",
        tr: "„mangels“ (… olmadığından) bir eksikliği gerekçe yapar; artikelsiz çoğulda Genitiv görünmezse Dativ'e kayar. „ungeachtet“ (… -e bakmaksızın) bir engeli önemsiz sayar; „trotz“un daha resmî ve daha vurgulu kardeşidir ve ismin arkasına da gelebilir.",
        examples: [
          { de: "Mangels eines Testaments gilt die gesetzliche Erbfolge.", tr: "Vasiyetname olmadığından yasal mirasçılık sırası geçerli.", note: "eksiklik" },
          { de: "Ungeachtet seines geringen Werts wollte sie den Tisch.", tr: "Değerinin düşüklüğüne bakmaksızın masayı istedi.", note: "≈ trotz, daha resmî" },
          { de: "Mangels Beweisen wurde das Verfahren eingestellt.", tr: "Kanıt bulunmadığından dava durduruldu.", note: "artikelsiz çoğul: Dativ" },
        ],
      },
      {
        heading: "Lehine ve yerine: zugunsten, anstelle",
        tr: "„zugunsten“ (… lehine) ve „anstelle“ (… yerine) de Genitiv alır. Özel adlarla ya da artikelsiz kullanımda „von“ ile kurulurlar: „zugunsten von Jana“. Bu edatlar sözleşme ve vasiyet dilinde sık görülür.",
        examples: [
          { de: "Er verzichtete zugunsten seiner Schwester auf das Haus.", tr: "Kız kardeşinin lehine evden vazgeçti.", note: "Genitiv" },
          { de: "Zugunsten von Jana wurde eine Ausnahme gemacht.", tr: "Jana'nın lehine bir istisna yapıldı.", note: "özel adla „von“" },
          { de: "Anstelle eines Verkaufs schlug er eine Vermietung vor.", tr: "Satış yerine kiraya vermeyi önerdi.", note: "anstelle + Genitiv" },
        ],
      },
    ],
    questions: [
      {
        text: "___ der Zahlen gab es nichts zu besprechen.",
        options: ["Mangels", "Ungeachtet", "Angesichts"],
        answer: 2,
        explain: "Rakamlar bir gerekçe olarak öne sürülüyor: „angesichts“ (göz önüne alınınca).",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Infolge dem Streit wurde der Verkauf verschoben.",
          "Infolge des Streits wurde der Verkauf verschoben.",
          "Infolge der Streit wurde der Verkauf verschoben.",
        ],
        answer: 1,
        explain: "„infolge“ Genitiv ister: des Streits.",
      },
      {
        text: "„Ungeachtet seines Werts wollte sie den Tisch.“ — Was bedeutet „ungeachtet“?",
        options: ["ohne Rücksicht auf", "wegen", "anstelle von"],
        answer: 0,
        explain: "„ungeachtet“ bir engeli hesaba katmamayı bildirir: … -e bakmaksızın.",
      },
      {
        kind: "gapfill",
        text: "___ eines Testaments gilt die gesetzliche Erbfolge. (weil es fehlt)",
        options: [],
        answer: 0,
        accept: ["Mangels", "mangels"],
        explain: "Bir eksikliği gerekçe yapan edat „mangels“tir ve Genitiv alır.",
      },
      {
        kind: "gapfill",
        text: "Er verzichtete zugunsten ___ Schwester auf das Haus. (seine)",
        options: [],
        answer: 0,
        accept: ["seiner"],
        explain: "„zugunsten“ Genitiv ister; dişil tekil Genitiv: seiner.",
      },
      {
        kind: "gapfill",
        text: "Aufgrund ___ Formfehlers ist das Testament unwirksam. (ein)",
        options: [],
        answer: 0,
        accept: ["eines"],
        explain: "Eril tekil Genitiv: eines Formfehlers; isim de -s alır.",
      },
      {
        kind: "gapfill",
        text: "Anstelle ___ Verkaufs schlug er eine Vermietung vor. (ein)",
        options: [],
        answer: 0,
        accept: ["eines"],
        explain: "„anstelle“ Genitiv ister: eines Verkaufs.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Infolge", "des Streits", "wurde", "der Verkauf", "verschoben"],
        explain: "Edat öbeği ilk yeri doldurur, ardından çekimli fiil ve özne gelir.",
      },
      {
        kind: "truefalse",
        text: "„angesichts“ verlangt den Dativ.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„angesichts“ Genitiv ister: angesichts der Zahlen.",
      },
      {
        kind: "truefalse",
        text: "„ungeachtet“ ist eine formellere Entsprechung zu „trotz“.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İkisi de bir engeli önemsiz sayar; „ungeachtet“ daha resmî ve vurguludur.",
      },
    ],
  },
];

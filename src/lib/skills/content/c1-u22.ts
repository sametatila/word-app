import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 22 — "Lehçe, du/Sie, iltifat, gaf".
 *
 * Dört ders: Hochdeutsch mit Farbe · Das heikle Du ·
 * Loben auf Deutsch · Der Fettnapf.
 *
 *   Kelime: der Dialekt, die Mundart, die Färbung, regional, sich
 *           verständigen, verblassen, die Wellenlänge, die Dichte · heikel,
 *           der Umgangston, vertraulich, ablehnen, die Gepflogenheit,
 *           die Ehrfurcht, die Demut, verehren · das Kompliment, die
 *           Anerkennung, aufrichtig, übertrieben, verlegen, die
 *           Aufrichtigkeit, aufdringlich, der Hochmut · ins Fettnäpfchen
 *           treten, Schwamm drüber, sich herausreden, peinlich, die Panne,
 *           die Scham, missachten, bereinigen
 *
 * Ünitenin çekirdeği: İNCE AYAR. Dördü de hiçbir ders kitabının
 * anlatmadığı ama "içeride" olup olmadığını belirleyen küçük ayarlar —
 * hangi zamiri seçtiğin, övgüyü ne kadar yüksek tuttuğun, gafı silip
 * silmediğin.
 *
 * Türkçe konuşan için du/Sie tuzağı kategorilerde değil geçiş
 * kurallarında: sen/siz ayrımı zaten var, ama Türkçede yaşı büyük olan
 * hitabı belirler ve teklif çoğu zaman gerekmez. Almancada teklif
 * yukarıdan gelir, REDDEDİLEBİLİR, ve bir kez du'ya geçilince geri
 * dönülmez.
 *
 * Ünite 21 ile bilinçli bir karşıtlık taşıyor: orada geri alınamayacak
 * bir şey vardı ve "Schwamm drüber" işlemiyordu. Burada gerçekten
 * silinebilen şeyler var. İkisini birbirinden ayırmak becerinin kendisi.
 */
export const c1U22: SkillExercise[] = [
  {
    id: "c1-u22-r1",
    level: "C1",
    skill: "reading",
    unit: 22,
    title: "Das heikle Du",
    genre: "Rehber yazısı",
    intro: "Sen'e geçiş: kim teklif eder, nasıl reddedilir, geri dönülür mü?",
    gloss: [
      { de: "heikel", tr: "nazik, riskli", en: "delicate" },
      { de: "die Gepflogenheit", tr: "teamül", en: "custom" },
      { de: "der Umgangston", tr: "hitap tonu", en: "tone of interaction" },
      { de: "vertraulich", tr: "samimi, mahrem", en: "familiar" },
      { de: "ablehnen", tr: "reddetmek", en: "to decline" },
      { de: "verlegen", tr: "mahcup", en: "embarrassed" },
      { de: "die Demut", tr: "alçakgönüllülük", en: "humility" },
    ],
    minutes: 8,
    text:
      "EINE ENTSCHEIDUNG, DIE MAN NICHT ZURÜCKNIMMT\n\n" +
      "Wer aus einer Sprache kommt, die ebenfalls zwischen zwei Anredeformen unterscheidet, hält das deutsche Du für vertrautes Gelände. Die Kategorien stimmen auch. Die Regeln für den Wechsel nicht.\n\n" +
      "Erstens: Wer bietet an? Im Beruf geht das Angebot von der ranghöheren oder deutlich älteren Person aus, nicht von der jüngeren. Wer als Neuer im Team die Chefin duzt, weil sie freundlich war, hat keine Nähe hergestellt, sondern eine Stufe übersprungen.\n\n" +
      "Zweitens: Man darf ablehnen. „Ich bleibe lieber beim Sie, wenn es Ihnen recht ist“ ist ein vollständiger, höflicher Satz. Er wirkt kühl, ist aber vorgesehen — und in manchen Berufen (Justiz, Medizin, Verwaltung) die Regel.\n\n" +
      "Drittens, und das ist der eigentliche Unterschied: Der Weg führt nur in eine Richtung. Ein Du lässt sich nicht sauber zurücknehmen. Wer nach einem Streit wieder zum Sie übergeht, sagt damit etwas Deutliches, und alle im Raum hören es.\n\n" +
      "Viertens: Die Gepflogenheiten haben sich verschoben und sind nicht einheitlich. In Start-ups duzen sich alle ab dem ersten Tag, in Handwerksbetrieben oft auch. In Behörden, Banken und Kanzleien gilt weiter das Sie. Es hilft wenig, die eigene Regel mitzubringen; es hilft, zwei Tage zuzuhören.\n\n" +
      "Bleibt der Zwischenfall, den fast jeder einmal erlebt: Man hat versehentlich geduzt. Die richtige Reaktion ist klein. „Entschuldigung, das ist mir rausgerutscht“ genügt, und in neun von zehn Fällen kommt zurück: „Kein Problem — wollen wir ohnehin?“",
    questions: [
      {
        text: "Von wem geht im Beruf das Du-Angebot aus?",
        options: [
          "Von der jüngeren Person",
          "Von der ranghöheren oder deutlich älteren Person",
          "Von wem zuerst spricht",
        ],
        answer: 1,
        explain: "Yeni gelenin patronu 'sen'lemesi yakınlık değil, atlanmış basamak.",
      },
      {
        kind: "gapfill",
        text: "Ich bleibe lieber beim ___, wenn es Ihnen recht ist.",
        options: [],
        answer: 0,
        accept: ["Sie"],
        explain: "Reddetmek öngörülmüş bir seçenek, kabalık değil.",
      },
      {
        text: "Was ist der eigentliche Unterschied laut Text?",
        options: [
          "Das Du ist informeller",
          "Der Weg führt nur in eine Richtung — ein Du nimmt man nicht zurück",
          "Das Sie stirbt aus",
        ],
        answer: 1,
        explain: "Kavgadan sonra 'siz'e dönmek herkesin duyduğu bir mesaj.",
      },
      {
        kind: "short_answer",
        text: "Was rät der Text statt der eigenen Regel?",
        options: [],
        answer: 0,
        accept: [
          "zwei Tage zuzuhören",
          "erst zuhören, wie es im Betrieb gehandhabt wird",
          "zuhören",
        ],
        explain: "Teamül sektöre göre değişiyor, tek kural yok.",
      },
      {
        kind: "short_answer",
        text: "Wie reagiert man laut Text auf ein versehentliches Du?",
        options: [],
        answer: 0,
        accept: [
          "klein: Entschuldigung, das ist mir rausgerutscht",
          "mit einer kurzen Entschuldigung",
          "Entschuldigung, das ist mir rausgerutscht",
        ],
        explain: "Küçük tutmak doğru ölçek — büyütmek asıl utandıran.",
      },
    ],
  },
  {
    id: "c1-u22-r2",
    level: "C1",
    skill: "reading",
    unit: 22,
    title: "Loben auf Deutsch",
    genre: "Dil yazısı",
    intro: "Övgü neden bu kadar kısık? Ve sıcak övgü neden ters teper?",
    gloss: [
      { de: "das Kompliment", tr: "iltifat", en: "compliment" },
      { de: "die Anerkennung", tr: "takdir", en: "recognition" },
      { de: "aufrichtig", tr: "içten", en: "sincere" },
      { de: "übertrieben", tr: "abartılı", en: "excessive" },
      { de: "aufdringlich", tr: "sırnaşık, rahatsız edici", en: "intrusive" },
      { de: "verlegen", tr: "mahcup", en: "embarrassed" },
      { de: "der Hochmut", tr: "kibir", en: "arrogance" },
    ],
    minutes: 7,
    text:
      "„ALLE ACHTUNG“ IST VIEL\n\n" +
      "Zwei Wörter, kein Ausrufezeichen nötig, und es ist hohes Lob. Wer aus einer Kultur kommt, in der man wärmer und häufiger lobt, unterschätzt diesen Satz und überschätzt seinen eigenen.\n\n" +
      "Deutsches Lob ist im Regelfall leiser und spezifischer. „Gut gemacht“ ist freundlich. „Das war ein starker Vortrag, besonders der Teil zur Finanzierung“ ist deutlich mehr, weil es zeigt, dass jemand zugehört hat. Die Spezifik trägt das Gewicht, nicht die Lautstärke.\n\n" +
      "Umgekehrt hat sehr warmes Lob eine unangenehme Wirkung, die selten beabsichtigt ist. „Du bist unglaublich, ich habe noch nie jemanden wie dich gesehen“ klingt für viele nicht herzlich, sondern aufdringlich — oder es weckt den Verdacht, gleich komme eine Bitte. Der Empfänger wird verlegen und weiß nicht, was er zurückgeben soll.\n\n" +
      "Ebenso wichtig ist die Antwort auf ein Kompliment. Der Reflex „Ach, das war nichts“ ist verbreitet, gilt aber zunehmend als unnötig klein. Ein knappes „Danke, das freut mich“ ist angemessen und wirkt weder eitel noch demonstrativ bescheiden.\n\n" +
      "Ein letzter Punkt, der Lernenden oft entgeht: Anerkennung wird häufig nicht als Kompliment ausgesprochen, sondern als Handlung. Wer gefragt wird, ob er den nächsten Punkt übernimmt, ist gelobt worden. Wer nach seiner Einschätzung gefragt wird, ebenfalls. Wer darauf wartet, dass jemand es ausdrücklich sagt, hält sich für übersehen — und ist es nicht.",
    questions: [
      {
        text: "Worin liegt laut Text das Gewicht eines deutschen Lobes?",
        options: [
          "In der Lautstärke",
          "In der Spezifik",
          "In der Wiederholung",
        ],
        answer: 1,
        explain: "Ayrıntı, birinin gerçekten dinlediğini gösteriyor.",
      },
      {
        kind: "gapfill",
        text: "___ Achtung! Das war ein starker Vortrag.",
        options: [],
        answer: 0,
        accept: ["Alle"],
        explain: "İki sözcüklük yüksek övgü.",
      },
      {
        text: "Wie wirkt sehr warmes Lob oft?",
        options: [
          "Herzlich",
          "Aufdringlich oder als Vorbote einer Bitte",
          "Professionell",
        ],
        answer: 1,
        explain: "Alıcı mahcup oluyor ve ne vereceğini bilemiyor.",
      },
      {
        kind: "short_answer",
        text: "Welche Antwort auf ein Kompliment empfiehlt der Text?",
        options: [],
        answer: 0,
        accept: [
          "Danke, das freut mich",
          "ein knappes Danke, das freut mich",
          "Danke",
        ],
        explain: "„Ach, das war nichts“ gereğinden fazla küçültüyor.",
      },
      {
        kind: "short_answer",
        text: "Wie wird Anerkennung laut Schluss oft ausgedrückt?",
        options: [],
        answer: 0,
        accept: [
          "als Handlung, nicht als Kompliment",
          "durch Aufgaben und die Frage nach der Einschätzung",
          "nicht ausgesprochen, sondern durch Handlungen",
        ],
        explain: "Bir sonraki maddeyi üstlenmen istenmişse övülmüşsün.",
      },
    ],
  },
  {
    id: "c1-u22-l1",
    level: "C1",
    skill: "listening",
    unit: 22,
    title: "Verstehen, nicht sprechen",
    genre: "Diyalog",
    intro: "Lehçe karşısındaki gerçekçi hedef.",
    gloss: [
      { de: "der Dialekt", tr: "lehçe", en: "dialect" },
      { de: "die Mundart", tr: "yerel ağız", en: "vernacular" },
      { de: "die Färbung", tr: "renk, tını", en: "colouring" },
      { de: "sich verständigen", tr: "anlaşmak", en: "to communicate" },
      { de: "verblassen", tr: "solmak", en: "to fade" },
      { de: "regional", tr: "bölgesel", en: "regional" },
      { de: "die Dichte", tr: "yoğunluk", en: "density" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ayşe", text: "Ich verstehe im Büro alles und beim Bäcker nichts." },
      { speaker: "Kollege", text: "Weil im Büro alle Hochdeutsch mit Färbung sprechen. Der Bäcker spricht Mundart." },
      { speaker: "Ayşe", text: "Muss ich das jetzt auch lernen?" },
      { speaker: "Kollege", text: "Nein. Das Ziel ist verstehen, nicht sprechen. Wer als Zugezogener Dialekt spricht, klingt fast immer wie eine Imitation." },
      { speaker: "Ayşe", text: "Das beruhigt mich." },
      { speaker: "Kollege", text: "Und es reichen erstaunlich wenige Wörter. Zwanzig Ausdrücke decken das meiste ab, dazu ein paar Lautverschiebungen." },
      { speaker: "Ayşe", text: "Zum Beispiel?" },
      { speaker: "Kollege", text: "„Servus“ im Süden, „Moin“ im Norden — und „Moin“ geht den ganzen Tag, nicht nur morgens." },
      { speaker: "Ayşe", text: "Das habe ich falsch gemacht, monatelang." },
      { speaker: "Kollege", text: "Das machen alle falsch. Wichtiger ist: Wenn du etwas nicht verstehst, frag nach dem Wort, nicht nach dem Satz. „Was heißt ‚Feierabend machen‘?“ funktioniert. „Können Sie das wiederholen?“ bringt denselben Satz noch einmal." },
      { speaker: "Ayşe", text: "Und verblasst der Dialekt nicht sowieso?" },
      { speaker: "Kollege", text: "In den Städten ja, auf dem Land kaum. Und die Färbung bleibt überall — die hört man auch bei Nachrichtensprechern, wenn man einmal darauf achtet." },
    ],
    questions: [
      {
        text: "Was ist laut Kollege das realistische Ziel?",
        options: [
          "Dialekt sprechen lernen",
          "Verstehen, nicht sprechen",
          "Nur Hochdeutsch verwenden",
        ],
        answer: 1,
        explain: "Sonradan gelen lehçe konuşunca taklit gibi duyuluyor.",
      },
      {
        kind: "gapfill",
        text: "„Servus“ im Süden, „___“ im Norden.",
        options: [],
        answer: 0,
        accept: ["Moin"],
        explain: "Ve „Moin“ bütün gün geçerli, sadece sabah değil.",
      },
      {
        text: "Welchen praktischen Rat gibt der Kollege beim Nichtverstehen?",
        options: [
          "Nach dem ganzen Satz fragen",
          "Nach dem einzelnen Wort fragen",
          "Später nachschlagen",
        ],
        answer: 1,
        explain: "Tekrar isteyince aynı cümle bir daha geliyor.",
      },
      {
        kind: "dictation",
        text: "Kollege'nin lehçenin şehirde ve kırsalda durumunu anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "In den Städten ja, auf dem Land kaum.",
          "In den Städten ja, auf dem Land kaum",
        ],
        explain: "Renk (Färbung) ise her yerde kalıyor.",
      },
    ],
  },
  {
    id: "c1-u22-l2",
    level: "C1",
    skill: "listening",
    unit: 22,
    title: "Ins Fettnäpfchen getreten",
    genre: "Diyalog",
    intro: "Gaf yapıldı. Silinebilen ile silinemeyeni ayırmak.",
    gloss: [
      { de: "ins Fettnäpfchen treten", tr: "pot kırmak", en: "to put one's foot in it" },
      { de: "Schwamm drüber", tr: "geçmiş olsun, unutalım", en: "let's forget it" },
      { de: "sich herausreden", tr: "mazeret uydurmak", en: "to talk one's way out" },
      { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
      { de: "die Panne", tr: "aksilik", en: "mishap" },
      { de: "bereinigen", tr: "gidermek", en: "to clear up" },
      { de: "die Scham", tr: "utanç", en: "shame" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Katrin", text: "Ich habe Frau Roth gefragt, wann das Baby kommt. Sie ist nicht schwanger." },
      { speaker: "Sven", text: "Oh." },
      { speaker: "Katrin", text: "Ich stand da und habe angefangen zu erklären, warum ich das dachte." },
      { speaker: "Sven", text: "Das war der zweite Fehler, und der war größer als der erste." },
      { speaker: "Katrin", text: "Was hätte ich tun sollen?" },
      { speaker: "Sven", text: "„Entschuldigung, das war unaufmerksam von mir.“ Punkt. Nicht erklären, nicht herausreden. Die Erklärung verlängert nur den Moment, den beide hinter sich bringen wollen." },
      { speaker: "Katrin", text: "Und jetzt? Soll ich ihr schreiben?" },
      { speaker: "Sven", text: "Nein. Da war nichts Verletzendes, nur etwas Peinliches. So etwas bereinigt sich von allein — Schwamm drüber." },
      { speaker: "Katrin", text: "Woher weiß ich, wann das gilt und wann nicht?" },
      { speaker: "Sven", text: "Frag dich, wer die Kosten trägt. Bei einer Panne trägst du sie: dir ist es unangenehm. Wenn jemand herabgesetzt wurde, trägt der andere sie — dann reicht kein Schwamm." },
      { speaker: "Katrin", text: "Und beim nächsten Treffen?" },
      { speaker: "Sven", text: "Normal weitermachen. Wenn du betont freundlich bist, machst du die Sache wieder groß." },
    ],
    questions: [
      {
        text: "Was war laut Sven der größere Fehler?",
        options: [
          "Die Frage selbst",
          "Das Erklären danach",
          "Dass Katrin nicht geschrieben hat",
        ],
        answer: 1,
        explain: "Açıklama herkesin bitirmek istediği anı uzatıyor.",
      },
      {
        kind: "gapfill",
        text: "Da war nichts Verletzendes, nur etwas Peinliches. ___ drüber.",
        options: [],
        answer: 0,
        accept: ["Schwamm"],
        explain: "Schwamm drüber: silinebilen için kalıp.",
      },
      {
        text: "Wie unterscheidet man beide Fälle?",
        options: [
          "An der Lautstärke",
          "Daran, wer die Kosten trägt",
          "An der Anzahl der Zeugen",
        ],
        answer: 1,
        explain: "Utanç sende ise silinir; karşı taraf küçük düşürüldüyse silinmez.",
      },
      {
        kind: "short_answer",
        text: "Was rät Sven für das nächste Treffen?",
        options: [],
        answer: 0,
        accept: [
          "normal weitermachen",
          "sich normal verhalten, nicht betont freundlich",
          "nicht betont freundlich sein",
        ],
        explain: "Abartılı nezaket meseleyi yeniden büyütüyor.",
      },
    ],
  },
  {
    id: "c1-u22-w1",
    level: "C1",
    skill: "writing",
    unit: 22,
    title: "İnce ayarın kalıpları",
    genre: "Dil bilgisi",
    intro: "duzen teklifi, kibar ret, Schwamm drüber, ölçülü övgü.",
    gloss: [
      { de: "heikel", tr: "nazik", en: "delicate" },
      { de: "die Anerkennung", tr: "takdir", en: "recognition" },
      { de: "Schwamm drüber", tr: "unutalım", en: "let's forget it" },
      { de: "aufdringlich", tr: "rahatsız edici", en: "intrusive" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Birbirimize sen desek mi?",
        answer: "Wollen wir uns duzen",
        hint: "Dönüşlü uns ile; teklif soru biçiminde gelir.",
      },
      {
        kind: "build",
        tr: "Sizin için de uygunsa ben 'siz'de kalayım.",
        answer: "Ich bleibe lieber beim Sie, wenn es Ihnen recht ist",
        hint: "beim Sie bleiben: sabit öbek, Sie büyük harf.",
      },
      {
        kind: "build",
        tr: "Takdirimi belirtmek isterim.",
        answer: "Ich möchte meine Anerkennung aussprechen",
        hint: "aussprechen: ayrılabilen ön ek mastarla sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "İltifatı düzelt: sıcaklık burada aşırı ve ters etki yapıyor.",
        source: "Du bist unglaublich, ich habe noch nie jemanden wie dich gesehen, das war einfach perfekt!",
        answer: "Das war ein starker Vortrag, besonders der Teil zur Finanzierung.",
        alternatives: [
          "Das war ein starker Vortrag, besonders der Teil zur Finanzierung",
          "Alle Achtung — vor allem der Teil zur Finanzierung war stark.",
        ],
        why: "Almanca övgüde ağırlığı yükseklik değil ayrıntı taşıyor: belirli bir bölümü adlandırmak birinin gerçekten dinlediğini gösteriyor. Çok sıcak övgü ise sık sık ters okunuyor — ya sırnaşık ya da arkasından bir rica gelecek gibi; alıcı mahcup olup ne söyleyeceğini bilemiyor.",
      },
    ],
  },
  {
    id: "c1-u22-w2",
    level: "C1",
    skill: "writing",
    unit: 22,
    title: "Veda konuşması",
    genre: "Konuşma metni",
    intro: "Ölçüsünü kaçırmadan övmek — ve kendi gafını kullanmak.",
    gloss: [
      { de: "die Anerkennung", tr: "takdir", en: "recognition" },
      { de: "aufrichtig", tr: "içten", en: "sincere" },
      { de: "übertrieben", tr: "abartılı", en: "excessive" },
      { de: "ins Fettnäpfchen treten", tr: "pot kırmak", en: "to put one's foot in it" },
      { de: "die Gepflogenheit", tr: "teamül", en: "custom" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "free",
        prompt:
          "Emekliye ayrılan meslektaşın için üç dakikalık bir veda konuşması yaz. Kurallar: (1) övgü SOMUT olsun — sıfat yığmak yerine tek bir olay anlat; (2) en az bir yerde kendi hatanı, gülünecek biçimde ve karşı tarafı küçültmeden kullan; (3) abartıya düşme — „unglaublich, einmalig, der beste Mensch“ gibi ifadeler yasak; (4) sonu bir dilekle bitir, ağlamaklı bir kapanışla değil. Dinleyici on beş kişilik bir ekip; ton sıcak ama ölçülü.",
        stimulus:
          "NOTLAR\n\n" +
          "Renate Hüsken, 41 yıl aynı kurumda, son 12 yıl arşiv sorumlusu. Cuma son günü.\n\n" +
          "· Yeni gelen herkese ilk hafta arşivi kendi gezdirirdi — kimse istemeden.\n" +
          "· 2019'daki su baskınında iki gece kalıp 600 klasörü kurtardı; bunu hiç anlatmadı, başkalarından duyuldu.\n" +
          "· Sabahları 6:40'ta gelir, 7'de kahve makinesini çalıştırırdı.\n" +
          "· Espri anlayışı kuru; en sevdiği cümle: „Das haben wir 1998 auch schon versucht.“\n" +
          "· SENİN GAFIN: İlk haftanda onu temizlik görevlisi sanıp arşive nasıl gidileceğini sormuştun. „Ich zeig's Ihnen“ deyip seni gezdirmiş, kim olduğunu bir hafta sonra öğrenmiştin.",
        checklist: [
          "Övgü somut bir olay üzerinden mi verildi?",
          "Kendi gafı anlatıldı ve Renate'yi küçültmüyor mu?",
          "Abartılı sıfatlardan kaçınıldı mı?",
          "Kapanış bir dilekle mi bitiyor?",
        ],
        minWords: 170,
        phrases: [
          { de: "Ich möchte meine Anerkennung aussprechen.", tr: "takdirimi belirtmek isterim", en: "I would like to express my appreciation" },
          { de: "Da bin ich ins Fettnäpfchen getreten.", tr: "orada pot kırdım", en: "that's where I put my foot in it" },
          { de: "Alle Achtung.", tr: "helal olsun", en: "hats off" },
        ],
        sample:
          "Liebe Renate, liebe Kolleginnen und Kollegen,\n\n" +
          "ich fange mit meinem eigenen ersten Arbeitstag an. Ich stand im dritten Stock, sah eine Frau mit einem Stapel Ordner und fragte sie, wie ich zum Archiv komme — im festen Glauben, sie arbeite dort für die Reinigung. Sie sagte nur „Ich zeig's Ihnen“, ging mit mir zwei Stockwerke hinunter und erklärte mir vierzig Minuten lang die Systematik. Wer sie war, habe ich eine Woche später erfahren. Da bin ich ins Fettnäpfchen getreten, gründlich, und Renate hat es nie erwähnt.\n\n" +
          "Genau das ist der Punkt, den ich hervorheben möchte. Diese Führung hat nie jemand angeordnet. Sie hat sie einundvierzig Jahre lang jedem Neuen gegeben, weil sie fand, dass man wissen sollte, wo die Dinge liegen.\n\n" +
          "Ein Zweites, das sie selbst nie erzählt hat: 2019, der Wassereinbruch. Zwei Nächte im Keller, sechshundert Ordner gerettet. Wir wissen es von anderen. Alle Achtung.\n\n" +
          "Was wir nicht ersetzen können, ist der Satz „Das haben wir 1998 auch schon versucht“ — meistens gefolgt von der Erklärung, warum es damals scheiterte. Es hat uns mehr Zeit gespart, als in irgendeiner Statistik steht.\n\n" +
          "Liebe Renate, ich möchte Ihnen meine Anerkennung aussprechen, und ich wünsche Ihnen ab Montag lange Morgen, an denen niemand um sieben Uhr Kaffee braucht.",
      },
    ],
  },
];

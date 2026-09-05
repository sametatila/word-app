import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 20 — "Sorumluluk kime yazılır, sınırı kim çizer".
 *
 * Dört ders: Darf KI das? · Wer zahlt für wen? ·
 * Die Grenzen des Sagbaren · Deutschland 2050.
 *
 *   Kelime: zurechnen, die Instanz, simulieren, empfinden, haftbar,
 *           skrupellos, die Intervention, der Vorsatz · der
 *           Generationenvertrag, solidarisch, die Umverteilung, zulasten,
 *           die Beitragslast, kollektiv, die Bürokratie, der Egoismus ·
 *           die Meinungsfreiheit, insofern, hierbei, abgrenzen, die
 *           Herabwürdigung, die Verleumdung, die Propaganda, die
 *           Unterdrückung · entwerfen, der Entwurf, utopisch, denkbar,
 *           das Szenario, wiederbeleben, verschmelzen, die Diktatur
 *
 * Ünitenin çekirdeği: SORUMLULUK BULUNMAZ, YAZILIR. Makineye sorumluluk
 * "atfedilemiyor" derken keşfedilen bir gerçekten değil, bir karardan
 * söz ediyoruz: muhatap alınabilecek bir merci gerekiyor. Kuşak
 * sözleşmesinde yük kimin üstünde, ifade özgürlüğünde sınır nerede,
 * gelecek tasarımında hangi senaryo düşünülebilir — dördü de aynı
 * işlemin farklı alanları.
 *
 * Dil tarafında ünitenin can damarı ayrım yapma dili: "Davon zu
 * unterscheiden ist …", "insofern", "hierbei". Almanca tartışma çoğu
 * zaman karşı çıkarak değil AYIRARAK ilerliyor, ve "insofern hast du
 * recht" gibi kısmi onay Türkçede kolayca ya tam onaya ya tam redde
 * dönüşüyor. Bu yapı olmadan C1 tartışması kaba kalıyor.
 */
export const c1U20: SkillExercise[] = [
  {
    id: "c1-u20-r1",
    level: "C1",
    skill: "reading",
    unit: 20,
    title: "Wem rechnet man es zu?",
    genre: "Deneme",
    intro: "Makine karar verirse sorumluluk kime yazılır?",
    gloss: [
      { de: "zurechnen", tr: "atfetmek, yüklemek", en: "to attribute" },
      { de: "die Instanz", tr: "merci", en: "authority, entity" },
      { de: "haftbar", tr: "sorumlu (hukuken)", en: "liable" },
      { de: "der Vorsatz", tr: "kasıt", en: "intent" },
      { de: "simulieren", tr: "benzetimini yapmak", en: "to simulate" },
      { de: "empfinden", tr: "hissetmek", en: "to feel" },
      { de: "die Intervention", tr: "müdahale", en: "intervention" },
    ],
    minutes: 7,
    text:
      "DIE FALSCHE FRAGE\n\n" +
      "„Kann eine Maschine Schuld haben?“ ist die Frage, die am häufigsten gestellt wird, und die am wenigsten weiterführt.\n\n" +
      "Schuld setzt Vorsatz voraus — jemanden, der anders hätte handeln können und es nicht wollte. Ein System, das Muster fortschreibt, hat keinen Vorsatz. Es wirkt, als ob Maschinen entschieden, und in gewissem Sinn tun sie es auch; aber sie wollen nichts.\n\n" +
      "Die brauchbare Frage lautet anders: Wem wird die Verantwortung zugerechnet? Zurechnung ist keine Entdeckung, sondern eine Entscheidung. Eine Rechtsordnung braucht eine Instanz, die man ansprechen, verklagen, zur Änderung zwingen kann. Bei einem fehlerhaften Bremssystem fragt niemand, ob das Steuergerät Schuld empfindet.\n\n" +
      "Dass ein System Verstehen simuliert, ändert daran nichts. Die Simulation ist gut genug, um Menschen zu täuschen, und genau deshalb ist die Frage nach der Zurechnung dringender geworden, nicht schwieriger.\n\n" +
      "Damit verschiebt sich die Debatte von der Maschine zu den Menschen um sie herum. Wer hat das System eingesetzt, für welchen Zweck, mit welchen Daten, und wer hätte die Intervention auslösen können, als es schiefging?\n\n" +
      "Zwei Ausweichbewegungen kehren regelmäßig wieder. Die erste: „Das war der Algorithmus.“ Sie macht ein Werkzeug zum Täter und den Betreiber zum Zuschauer. Die zweite ist umgekehrt und ebenso bequem: „Am Ende entscheidet immer ein Mensch.“ Das stimmt formal und beschreibt selten die Praxis — wer dreihundert Vorschläge am Tag bestätigt, entscheidet nicht, er unterschreibt.\n\n" +
      "Wer haftbar ist, lässt sich regeln. Ob eine Maschine etwas empfindet, lässt sich nicht klären — und muss es für diese Frage auch nicht.",
    questions: [
      {
        text: "Warum ist „Kann eine Maschine Schuld haben?“ laut Text die falsche Frage?",
        options: [
          "Weil Maschinen zu neu sind",
          "Weil Schuld Vorsatz voraussetzt und ein System nichts will",
          "Weil Juristen sie nicht beantworten dürfen",
        ],
        answer: 1,
        explain: "Kasıt olmadan suç kurulamıyor; soru başka yerde.",
      },
      {
        kind: "gapfill",
        text: "Wem wird die Verantwortung ___?",
        options: [],
        answer: 0,
        accept: ["zugerechnet"],
        explain: "zurechnen: atfetmek — keşif değil, karar.",
      },
      {
        text: "Was ist die zweite Ausweichbewegung?",
        options: [
          "„Das war der Algorithmus.“",
          "„Am Ende entscheidet immer ein Mensch.“",
          "„Die Daten waren falsch.“",
        ],
        answer: 1,
        explain: "Biçimsel olarak doğru, pratikte nadiren geçerli.",
      },
      {
        kind: "short_answer",
        text: "Warum beschreibt der zweite Satz die Praxis oft nicht?",
        options: [],
        answer: 0,
        accept: [
          "wer dreihundert Vorschläge am Tag bestätigt, entscheidet nicht, er unterschreibt",
          "er unterschreibt nur, er entscheidet nicht",
          "bei dreihundert Bestätigungen täglich entscheidet niemand wirklich",
        ],
        explain: "Onay ile karar aynı şey değil.",
      },
      {
        kind: "short_answer",
        text: "Warum braucht eine Rechtsordnung laut Text eine Instanz?",
        options: [],
        answer: 0,
        accept: [
          "man muss jemanden ansprechen, verklagen und zur Änderung zwingen können",
          "damit man jemanden verklagen kann",
          "um jemanden zur Änderung zwingen zu können",
        ],
        explain: "Sorumluluk muhatap alınabilirlik demek.",
      },
    ],
  },
  {
    id: "c1-u20-r2",
    level: "C1",
    skill: "reading",
    unit: 20,
    title: "Die Grenzen des Sagbaren",
    genre: "Bilgilendirme",
    intro: "İfade özgürlüğü neyi koruyor, neyi korumuyor?",
    gloss: [
      { de: "die Meinungsfreiheit", tr: "ifade özgürlüğü", en: "freedom of expression" },
      { de: "abgrenzen", tr: "sınırını çizmek", en: "to delimit" },
      { de: "die Verleumdung", tr: "iftira", en: "defamation" },
      { de: "die Herabwürdigung", tr: "aşağılama", en: "denigration" },
      { de: "insofern", tr: "bu bakımdan", en: "in that respect" },
      { de: "hierbei", tr: "bu noktada", en: "in this context" },
      { de: "die Unterdrückung", tr: "baskı", en: "suppression" },
    ],
    minutes: 8,
    text:
      "DREI DINGE, DIE OFT VERWECHSELT WERDEN\n\n" +
      "Artikel 5 des Grundgesetzes schützt die Meinungsfreiheit. Er schützt sie ausdrücklich auch dann, wenn die Meinung falsch, scharf oder unbequem ist. Er endet an den „allgemeinen Gesetzen“ — und hierbei beginnt die Arbeit des Abgrenzens.\n\n" +
      "Erstens: Meinung und Tatsachenbehauptung. Eine Meinung ist eine Bewertung und kann nicht wahr oder falsch sein. Eine Tatsachenbehauptung kann es. „Dieses Restaurant ist schlecht“ ist geschützt; „In dieser Küche wurden Ratten gefunden“ ist es nur, wenn es stimmt. Davon zu unterscheiden ist die bewusste Falschbehauptung über eine Person — die Verleumdung —, die kein Meinungsäußerungsproblem ist, sondern eine Straftat.\n\n" +
      "Zweitens: Kritik und Herabwürdigung. Scharfe Kritik an Handlungen ist weit geschützt, auch polemische. Die Grenze verläuft dort, wo nicht mehr eine Sache angegriffen wird, sondern die Person als Person entwertet wird. Insofern ist die viel zitierte Formel „Man wird ja wohl noch sagen dürfen“ meist richtig — nur betrifft sie einen anderen Fall als den, in dem sie vorgebracht wird.\n\n" +
      "Drittens, und am häufigsten verwechselt: Staat und Plattform. Grundrechte binden zuerst den Staat. Wenn ein privates Netzwerk einen Beitrag löscht, ist das rechtlich keine Zensur im Sinne des Artikels 5 — Zensur meint dort staatliche Vorabkontrolle. Man kann die Löschpraxis privater Anbieter für falsch halten und darüber streiten; nur ist es ein Streit über Marktmacht und Hausrecht, nicht über Unterdrückung durch den Staat.\n\n" +
      "Die drei Unterscheidungen ändern nichts an der Schärfe der Debatte. Sie sorgen nur dafür, dass die Beteiligten über dieselbe Sache streiten.",
    questions: [
      {
        text: "Worin unterscheiden sich Meinung und Tatsachenbehauptung?",
        options: [
          "In der Länge",
          "Eine Meinung kann nicht wahr oder falsch sein, eine Tatsachenbehauptung schon",
          "Eine Meinung ist immer geschützt, eine Tatsache nie",
        ],
        answer: 1,
        explain: "„Dieses Restaurant ist schlecht“ ile fare iddiası aynı türden değil.",
      },
      {
        kind: "gapfill",
        text: "Davon zu ___ ist die bewusste Falschbehauptung über eine Person.",
        options: [],
        answer: 0,
        accept: ["unterscheiden"],
        explain: "„Davon zu unterscheiden ist …“ ayrım yapmanın standart kalıbı.",
      },
      {
        text: "Warum ist die Löschung eines Beitrags durch ein privates Netzwerk rechtlich keine Zensur?",
        options: [
          "Weil sie selten vorkommt",
          "Weil Zensur in Artikel 5 staatliche Vorabkontrolle meint",
          "Weil Nutzer zugestimmt haben",
        ],
        answer: 1,
        explain: "Temel haklar öncelikle devleti bağlıyor; tartışma başka bir zeminde.",
      },
      {
        kind: "short_answer",
        text: "Wo verläuft die Grenze zwischen Kritik und Herabwürdigung?",
        options: [],
        answer: 0,
        accept: [
          "wo nicht mehr eine Sache angegriffen, sondern die Person als Person entwertet wird",
          "wenn die Person statt der Sache angegriffen wird",
          "wenn die Person als Person entwertet wird",
        ],
        explain: "Sertlik değil, hedefin değişmesi belirleyici.",
      },
      {
        kind: "short_answer",
        text: "Was leisten die drei Unterscheidungen laut Schluss?",
        options: [],
        answer: 0,
        accept: [
          "dass die Beteiligten über dieselbe Sache streiten",
          "sie sorgen dafür, dass man über dieselbe Sache streitet",
          "die Debatte wird nicht milder, nur genauer",
        ],
        explain: "Tartışmayı yumuşatmıyor, aynı konuya odaklıyor.",
      },
    ],
  },
  {
    id: "c1-u20-l1",
    level: "C1",
    skill: "listening",
    unit: 20,
    title: "Wer zahlt für wen?",
    genre: "Aile sohbeti",
    intro: "Kuşak sözleşmesi: yük kimin üstünde?",
    gloss: [
      { de: "der Generationenvertrag", tr: "kuşak sözleşmesi", en: "generational contract" },
      { de: "die Beitragslast", tr: "prim yükü", en: "contribution burden" },
      { de: "zulasten", tr: "-in aleyhine", en: "at the expense of" },
      { de: "solidarisch", tr: "dayanışmacı", en: "solidary" },
      { de: "die Umverteilung", tr: "yeniden dağıtım", en: "redistribution" },
      { de: "der Egoismus", tr: "bencillik", en: "selfishness" },
      { de: "kollektiv", tr: "kolektif", en: "collective" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Jan", text: "Ich zahle jeden Monat in eine Rente ein, die es geben wird, wenn ich alt bin — vielleicht." },
      { speaker: "Vater", text: "Genau das habe ich mit dreißig auch gesagt. Der Generationenvertrag stand damals schon in der Zeitung, angeblich kurz vor dem Ende." },
      { speaker: "Jan", text: "Bei dir waren es drei Beitragszahler pro Rentner. Bei mir werden es unter zwei sein. Das ist kein Gefühl, das ist Arithmetik." },
      { speaker: "Vater", text: "Nichtsdestotrotz funktioniert das System seit siebzig Jahren. Es wurde mehrfach umgebaut und hat jedes Mal gehalten." },
      { speaker: "Jan", text: "Umgebaut heißt: zulasten der Jüngeren. Höhere Beiträge, späterer Renteneintritt." },
      { speaker: "Vater", text: "Und zulasten der Älteren: Das Niveau ist gesunken. Meine Rente ist real niedriger als die deines Großvaters, gemessen am Durchschnittslohn." },
      { speaker: "Jan", text: "Das wusste ich nicht." },
      { speaker: "Vater", text: "Es steht in jedem Rentenbericht. Nur liest es keiner, weil beide Seiten lieber sagen, die andere sei egoistisch." },
      { speaker: "Jan", text: "Was wäre denn ehrlich?" },
      { speaker: "Vater", text: "Dass eine Umverteilung ansteht und jemand sie tragen muss. Solidarisch heißt nicht, dass es niemanden trifft — es heißt, dass wir entscheiden, wen und wie viel." },
      { speaker: "Jan", text: "Kollektiv entscheiden heißt am Ende: jemand zahlt und jemand nicht." },
      { speaker: "Vater", text: "So ist es. Nur steht dann wenigstens fest, wer." },
      { speaker: "Jan", text: "Und wer entscheidet das?" },
      { speaker: "Vater", text: "Ihr. Ihr seid mehr Wähler als wir es in zwanzig Jahren sein werden. Das ist der Teil, den meine Generation ungern ausspricht." },
    ],
    questions: [
      {
        text: "Welches Argument bringt der Vater gegen Jans Vorwurf?",
        options: [
          "Dass die Arithmetik falsch ist",
          "Dass auch die Älteren getragen haben: das Rentenniveau ist real gesunken",
          "Dass Jan zu jung sei",
        ],
        answer: 1,
        explain: "Yük tek yöne değil, iki yöne dağılmış.",
      },
      {
        kind: "gapfill",
        text: "Umgebaut heißt: ___ der Jüngeren.",
        options: [],
        answer: 0,
        accept: ["zulasten"],
        explain: "zulasten + Genitiv: kimin aleyhine olduğunu tek sözcükte söylüyor.",
      },
      {
        text: "Was heißt „solidarisch“ laut Vater?",
        options: [
          "Dass es niemanden trifft",
          "Dass wir entscheiden, wen es trifft und wie viel",
          "Dass der Staat zahlt",
        ],
        answer: 1,
        explain: "Dayanışma yükü ortadan kaldırmıyor, dağıtımını konu ediyor.",
      },
      {
        kind: "dictation",
        text: "Babanın kendi kuşağının söylemekten kaçındığı gerçeği anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Ihr seid mehr Wähler als wir es in zwanzig Jahren sein werden.",
          "Ihr seid mehr Wähler als wir es in zwanzig Jahren sein werden",
        ],
        explain: "Karar gücü zamanla yer değiştiriyor.",
      },
    ],
  },
  {
    id: "c1-u20-l2",
    level: "C1",
    skill: "listening",
    unit: 20,
    title: "Rückblickend aus dem Jahr 2050",
    genre: "Atölye",
    intro: "Senaryo çalışması: gelecekten geriye bakmak.",
    gloss: [
      { de: "entwerfen", tr: "tasarlamak", en: "to draft" },
      { de: "der Entwurf", tr: "taslak", en: "draft" },
      { de: "utopisch", tr: "ütopik", en: "utopian" },
      { de: "denkbar", tr: "düşünülebilir", en: "conceivable" },
      { de: "das Szenario", tr: "senaryo", en: "scenario" },
      { de: "verschmelzen", tr: "kaynaşmak", en: "to merge" },
      { de: "wiederbeleben", tr: "yeniden canlandırmak", en: "to revive" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Leiterin", text: "Wir schreiben heute keine Prognose. Wir entwerfen ein Szenario und schauen rückblickend darauf." },
      { speaker: "Teilnehmer", text: "Wo ist der Unterschied?" },
      { speaker: "Leiterin", text: "Eine Prognose behauptet etwas über die Zukunft. Ein Szenario fragt: Stellte man sich vor, es gäbe im Jahr 2050 keine privaten Autos in Städten — welche Schritte lägen dann dazwischen?" },
      { speaker: "Teilnehmerin", text: "Und der Entwurf soll dann was zeigen?" },
      { speaker: "Leiterin", text: "Wo er scheitert. Alles andere ist Werbung." },
      { speaker: "Teilnehmerin", text: "Das klingt utopisch." },
      { speaker: "Leiterin", text: "Utopisch ist kein Einwand, solange die Zwischenschritte denkbar bleiben. Genau darauf prüfen wir es." },
      { speaker: "Teilnehmer", text: "Dann fange ich rückwärts an. 2049 wäre der letzte Parkplatz umgewidmet worden." },
      { speaker: "Teilnehmerin", text: "Vorher hätte der Nahverkehr die Kapazität haben müssen. Also 2040 fertig gebaut, was heute nicht mal geplant ist." },
      { speaker: "Leiterin", text: "Sehen Sie? Der Bruch liegt nicht in 2050, er liegt in 2040. Genau dafür machen wir das." },
      { speaker: "Teilnehmer", text: "Also ist das Szenario widerlegt." },
      { speaker: "Leiterin", text: "Nein, es ist präzisiert. Wir wissen jetzt, welche Entscheidung wann fallen müsste. Ein Szenario, das an einer Jahreszahl scheitert, hat seine Arbeit getan." },
      { speaker: "Teilnehmer", text: "In manchen Szenarien verschmelzen ja zwei Städte zu einer Region, oder man belebt eine alte Bahnstrecke wieder." },
      { speaker: "Leiterin", text: "Beides ist denkbar, und beides prüfen wir genauso: Welche Entscheidung müsste wann fallen?" },
      { speaker: "Teilnehmerin", text: "Und wenn jemand sagt, das sei alles Fantasie?" },
      { speaker: "Leiterin", text: "Dann fragen Sie ihn nach seinem eigenen Bild von 2050. Er hat eines — er hat es nur nie aufgeschrieben." },
    ],
    questions: [
      {
        text: "Worin unterscheidet sich ein Szenario von einer Prognose?",
        options: [
          "Es ist genauer",
          "Es behauptet nichts, sondern fragt nach den Zwischenschritten",
          "Es liegt weiter in der Zukunft",
        ],
        answer: 1,
        explain: "Öngörü iddia eder, senaryo yolu sorar.",
      },
      {
        kind: "gapfill",
        text: "___ man sich vor, es gäbe im Jahr 2050 keine privaten Autos in Städten.",
        options: [],
        answer: 0,
        accept: ["Stellte"],
        explain: "Bağlaçsız irreal koşul, Konjunktiv II ile: Stellte man sich vor …",
      },
      {
        text: "Was folgert die Leiterin aus dem Problem mit 2040?",
        options: [
          "Das Szenario ist widerlegt",
          "Das Szenario ist präzisiert: man weiß, welche Entscheidung wann fallen müsste",
          "Das Szenario ist utopisch",
        ],
        answer: 1,
        explain: "Bir yılda tökezleyen senaryo işini yapmış oluyor.",
      },
      {
        kind: "short_answer",
        text: "Was rät die Leiterin gegenüber jemandem, der alles für Fantasie hält?",
        options: [],
        answer: 0,
        accept: [
          "ihn nach seinem eigenen Bild von 2050 fragen",
          "nach seinem eigenen Bild fragen",
          "fragen, wie er sich 2050 vorstellt",
        ],
        explain: "Herkesin bir tasavvuru var, çoğu yazılmamış.",
      },
    ],
  },
  {
    id: "c1-u20-w1",
    level: "C1",
    skill: "writing",
    unit: 20,
    title: "Ayır, sonra itiraz et",
    genre: "Dil bilgisi",
    intro: "Davon zu unterscheiden ist …, insofern, zulasten, Stellte man sich vor.",
    gloss: [
      { de: "insofern", tr: "bu bakımdan", en: "in that respect" },
      { de: "abgrenzen", tr: "sınırını çizmek", en: "to delimit" },
      { de: "zulasten", tr: "-in aleyhine", en: "at the expense of" },
      { de: "denkbar", tr: "düşünülebilir", en: "conceivable" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bundan ayırt edilmesi gereken, bir kişi hakkındaki bilinçli yalan iddiadır.",
        answer: "Davon zu unterscheiden ist die bewusste Falschbehauptung über eine Person",
        hint: "Kalıp cümlenin başında durur, özne sona kayar.",
      },
      {
        kind: "build",
        tr: "Bu bakımdan haklısın — ama başka bir durumdan söz ediyorsun.",
        answer: "Insofern hast du recht",
        hint: "Insofern zarf: birinci konumda, fiil hemen ardından.",
      },
      {
        kind: "build",
        tr: "Yeniden yapılandırma gençlerin aleyhine oldu.",
        answer: "Der Umbau ging zulasten der Jüngeren",
        hint: "zulasten Genitiv ister.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: kısmi onay tam onaya dönüşmüş, ayrım kaybolmuş.",
        source: "Du hast recht, aber trotzdem finde ich das falsch.",
        answer: "Insofern hast du recht, als die Zahlen stimmen; die Schlussfolgerung teile ich gleichwohl nicht.",
        alternatives: [
          "Insofern hast du recht, als die Zahlen stimmen; die Schlussfolgerung teile ich gleichwohl nicht",
          "Insofern hast du recht, als die Zahlen stimmen — der Schlussfolgerung widerspreche ich dennoch.",
        ],
        why: "„Du hast recht, aber …“ önce her şeyi verip sonra geri alıyor ve neyin kabul edildiği belirsiz kalıyor. Almanca tartışma karşı çıkarak değil ayırarak ilerliyor: „insofern …, als …“ tam olarak neyin onaylandığını sınırlıyor ve itirazın nereye düştüğünü gösteriyor.",
      },
    ],
  },
  {
    id: "c1-u20-w2",
    level: "C1",
    skill: "writing",
    unit: 20,
    title: "Sorumluluk kime yazılacak",
    genre: "Kurumsal görüş",
    intro: "Bir yapay zekâ kararının ardından sorumluluk zincirini yaz.",
    gloss: [
      { de: "zurechnen", tr: "atfetmek", en: "to attribute" },
      { de: "die Instanz", tr: "merci", en: "entity" },
      { de: "haftbar", tr: "sorumlu", en: "liable" },
      { de: "die Intervention", tr: "müdahale", en: "intervention" },
      { de: "abgrenzen", tr: "sınırını çizmek", en: "to delimit" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir iç görüş notu (Stellungnahme) yaz. Olay aşağıda. İki kaçış hareketinin ikisini de reddet — ne „algoritma yaptı“ ne de „nihai kararı insan verdi“ — ve sorumluluğun hangi mercilere hangi gerekçeyle yazılacağını somut yaz. En az bir yerde „Davon zu unterscheiden ist …“ ya da „insofern …, als …“ kullan. Sonda üç somut önlem öner.",
        stimulus:
          "OLAY NOTU\n\n" +
          "Kredi başvurusu ön eleme sistemi, altı ay boyunca belirli bir posta kodundaki başvuruları ortalamanın üç katı oranında reddetti. Sistem posta kodunu doğrudan kullanmıyor; gelir istikrarı ve adres değiştirme sıklığı üzerinden dolaylı olarak aynı sonuca varmış.\n\n" +
          "Süreç: Sistem bir puan ve bir öneri üretiyor. Öneriyi bir çalışan onaylıyor. Ölçüm: Çalışanlar önerilerin %98'ini değiştirmeden onaylıyor; ortalama inceleme süresi başvuru başına 40 saniye.\n\n" +
          "Sistemi bir tedarikçi geliştirdi; eğitim verisi bankanın kendi geçmiş kararları. Ürün sahibi pazarlama bölümü, teknik işletim BT, denetim iç denetim biriminde.",
        checklist: [
          "„Algoritma yaptı“ savı açıkça reddedildi mi?",
          "„Nihai kararı insan verir“ savı ölçümle çürütüldü mü (%98, 40 saniye)?",
          "Sorumluluk somut mercilere gerekçeli olarak dağıtıldı mı?",
          "Ayrım kalıbı ve üç somut önlem var mı?",
        ],
        minWords: 160,
        phrases: [
          { de: "Die Verantwortung ist nicht dem System zuzurechnen.", tr: "sorumluluk sisteme atfedilemez", en: "responsibility is not attributable to the system" },
          { de: "Davon zu unterscheiden ist die Frage der Haftung.", tr: "bundan ayırt edilmesi gereken sorumluluk sorusudur", en: "the question of liability must be distinguished from this" },
          { de: "Insofern trifft der Einwand zu, als …", tr: "itiraz şu bakımdan yerinde: …", en: "the objection holds insofar as …" },
        ],
        sample:
          "Interne Stellungnahme — Vorprüfung Kreditanträge\n\n" +
          "Die Verantwortung ist nicht dem System zuzurechnen. Es hat kein Merkmal verwendet, das ihm untersagt war, und es hat keinen Vorsatz. Es hat fortgeschrieben, was in unseren eigenen Altentscheidungen enthalten war. Damit ist die Frage, ob „der Algorithmus diskriminiert hat“, nicht die Frage, die wir zu beantworten haben.\n\n" +
          "Ebenso wenig trägt die zweite Auskunft. Formal bestätigt eine Mitarbeiterin jede Ablehnung. Insofern trifft der Einwand zu, als der Ablauf eine menschliche Entscheidung vorsieht; die Messung widerlegt ihn jedoch: 98 Prozent der Vorschläge bleiben unverändert, die durchschnittliche Prüfzeit beträgt vierzig Sekunden. Wer in vierzig Sekunden bestätigt, entscheidet nicht, er unterschreibt. Der Prozess war so gebaut, dass er diese Unterschrift erzeugt.\n\n" +
          "Zurechnung schlage ich wie folgt vor. Die fachliche Verantwortung liegt beim Produktverantwortlichen im Marketing: Der Zweck und die akzeptierte Fehlerquote wurden dort festgelegt. Die Prüfverantwortung liegt bei der Innenrevision, die sechs Monate ohne Merkmalskontrolle hat laufen lassen. Die Betriebsverantwortung der IT beschränkt sich auf die Verfügbarkeit; sie hatte weder Auftrag noch Zugriff auf die Bewertungslogik. Davon zu unterscheiden ist die Haftung gegenüber den abgelehnten Antragstellern — diese trifft das Haus als Ganzes, unabhängig von der internen Aufteilung.\n\n" +
          "Drei Maßnahmen: Erstens eine monatliche Auswertung der Ablehnungsquoten nach Region, mit Schwellenwert und automatischer Meldung an die Revision. Zweitens eine verbindliche Mindestprüfzeit und eine Begründungspflicht bei Abweichung vom Vorschlag — ohne beides bleibt die Bestätigung eine Formalie. Drittens die vertragliche Pflicht des Anbieters, die verwendeten Ersatzmerkmale offenzulegen; ohne diese Offenlegung können wir die Prüfung nicht führen, zu der wir verpflichtet sind.",
      },
    ],
  },
];

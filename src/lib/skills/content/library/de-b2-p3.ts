import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: deneme, uzman sunumu ve köşe yazısı. Üçü de ortaçları sıfat olarak
 * yoğun kullanır; dil bilgisi tam olarak bu yapı.
 */
export const deB2P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r3",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Die fehlende Rampe",
    genre: "Deneme",
    intro: "Erişilebilirliğin neden binada değil günlük işleyişte kazanıldığını savunan bir deneme okuyacaksın.",
    gloss: [
      { de: "die Barrierefreiheit", tr: "erişilebilirlik", en: "accessibility" },
      { de: "der Aufsteller", tr: "reklam panosu", en: "advertising board" },
      { de: "sehbehindert", tr: "az gören", en: "visually impaired" },
      { de: "der Verband", tr: "birlik", en: "association" },
      { de: "die Anforderung", tr: "koşul", en: "requirement" },
      { de: "der Ablauf", tr: "süreç", en: "procedure" },
      { de: "zustellen", tr: "önünü kapatmak", en: "to block" },
    ],
    minutes: 9,
    text:
      "DIE FEHLENDE RAMPE\n\n" +
      "Wer über Barrierefreiheit spricht, landet schnell bei Rampen und Aufzügen. Das ist verständlich, aber es " +
      "verfehlt den Kern. Eine gebaute Rampe nützt wenig, wenn davor ein aufgestellter Werbeaufsteller steht, " +
      "und ein funktionierender Aufzug nützt nichts, wenn niemand weiß, ob er heute läuft.\n\n" +
      "Ein Beispiel aus einer mittelgroßen Stadt. Das im letzten Jahr sanierte Bürgeramt hat alles, was eine " +
      "Prüfliste verlangt: eine breite Tür, einen zweiten Schalter in niedriger Höhe, ein Leitsystem am Boden. " +
      "Trotzdem berichten Betroffene von Fehlversuchen. Die Nummernvergabe läuft über einen Bildschirm, dessen " +
      "Text für sehbehinderte Besucher zu klein ist, und der rufende Lautsprecher nennt nur die Nummer, nicht " +
      "den Schalter. Das Gebäude ist barrierefrei, der Vorgang ist es nicht.\n\n" +
      "Der Fehler liegt selten in der Absicht. Er liegt in der Reihenfolge. Zuerst wird geplant, dann gebaut, " +
      "und erst am Ende werden die betroffenen Menschen gefragt — meistens über einen Verband, der eine " +
      "Stellungnahme schreibt. Was dabei herauskommt, ist eine Liste erfüllter Anforderungen und ein weiterhin " +
      "unbenutzbarer Ablauf.\n\n" +
      "Städte, die es anders machen, drehen die Reihenfolge um. In einer westfälischen Stadt begleiten seit drei " +
      "Jahren wechselnde Testgruppen jeden Umbau: eine Rollstuhlfahrerin, ein blinder Nutzer, eine ältere Person " +
      "mit Rollator, ein Vater mit Kinderwagen. Sie kommen zweimal, einmal während der Planung und einmal vier " +
      "Wochen nach der Eröffnung. Die zweite Runde ist die wichtigere, weil erst dann sichtbar wird, was der " +
      "laufende Betrieb wieder zustellt.\n\n" +
      "Barrierefreiheit ist keine Eigenschaft eines Gebäudes. Sie ist ein Zustand, der jeden Tag neu hergestellt " +
      "wird — auch von Menschen, die einen Aufsteller nicht in den Weg stellen.",
    questions: [
      {
        text: "Was ist die Hauptaussage des Textes?",
        options: [
          "Barrierefreiheit entsteht erst im täglichen Betrieb.",
          "Eine Prüfliste erfasst alles, worauf es ankommt.",
          "Rampen und Aufzüge sind die teuersten Posten.",
        ],
        answer: 0,
        explain: "Son paragraf bunu açıkça söylüyor: „ein Zustand, der jeden Tag neu hergestellt wird“.",
      },
      {
        text: "Warum scheitert die Nummernvergabe im Bürgeramt?",
        options: [
          "Der Text ist zu klein, die Ansage unvollständig.",
          "Der zweite Schalter ist zu hoch gebaut.",
          "Die Eingangstür ist für Rollstühle zu schmal.",
        ],
        answer: 0,
        explain: "„… dessen Text für sehbehinderte Besucher zu klein ist, und der rufende Lautsprecher nennt nur die Nummer.“",
      },
      {
        kind: "truefalse",
        text: "Der Text sieht die Ursache in fehlendem gutem Willen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Der Fehler liegt selten in der Absicht. Er liegt in der Reihenfolge.“",
      },
      {
        kind: "gapfill",
        text: "Die Testgruppen kommen ___ Wochen nach der Eröffnung wieder.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„… einmal während der Planung und einmal vier Wochen nach der Eröffnung.“",
      },
      {
        kind: "short_answer",
        text: "Welche Runde hält der Text für wichtiger?",
        options: [],
        answer: 0,
        accept: ["die zweite", "die zweite Runde", "zweite"],
        explain: "„Die zweite Runde ist die wichtigere …“",
      },
      {
        text: "Was kritisiert der Text an der üblichen Reihenfolge?",
        options: [
          "Betroffene werden erst am Ende gefragt.",
          "Die Prüfliste wird zu spät ausgefüllt.",
          "Die Stellungnahme des Verbands wird nicht gelesen.",
        ],
        answer: 0,
        explain: "„Zuerst wird geplant, dann gebaut, und erst am Ende werden die betroffenen Menschen gefragt.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l3",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Welche Bäume die Stadt noch verträgt",
    genre: "Sunum",
    intro: "Bir uzmanın halka açık sunumunu dinleyeceksin: şehir ağaçları nasıl seçiliyor, neden değişti, hangi kural konuldu.",
    gloss: [
      { de: "verdunsten", tr: "buharlaştırmak", en: "to evaporate" },
      { de: "der Wurzelraum", tr: "kök alanı", en: "root space" },
      { de: "verdichtet", tr: "sıkışmış", en: "compacted" },
      { de: "absterbend", tr: "kuruyan", en: "dying" },
      { de: "die Trockenheit", tr: "kuraklık", en: "drought" },
      { de: "der Schädling", tr: "zararlı böcek", en: "pest" },
    ],
    minutes: 9,
    segments: [
      { text: "Guten Abend. Ich zeige Ihnen heute, warum wir in dieser Stadt nicht mehr dieselben Bäume pflanzen wie vor dreißig Jahren." },
      { text: "Beginnen wir mit einer Zahl. Ein ausgewachsener Straßenbaum verdunstet an einem heißen Tag bis zu vierhundert Liter Wasser. Das kühlt seine Umgebung um mehrere Grad." },
      { text: "Damit er das kann, braucht er zwei Dinge: Wurzelraum und Wasser. Beides fehlt an einer typischen Straße. Unter dem Pflaster liegen Leitungen, und der verdichtete Boden lässt kaum Luft durch." },
      { text: "Die früher gepflanzten Arten kamen damit zurecht, solange die Sommer kürzer waren. Seit den heißen Jahren sehen wir bei manchen von ihnen absterbende Kronen." },
      { text: "Wir arbeiten deshalb mit einer erweiterten Liste. Wichtig ist nicht die Herkunft eines Baumes, sondern seine Toleranz gegenüber Trockenheit, Salz und wenig Platz." },
      { text: "Ein Beispiel ist die Hopfenbuche. Sie bleibt kleiner als eine Linde, das stimmt. Dafür übersteht sie Wochen ohne Regen und wirft im Herbst weniger Laub auf die Gehwege." },
      { text: "Und ganz wichtig: Wir pflanzen nicht mehr eine Art pro Straße. Wenn ein Schädling kommt, verlieren Sie sonst in einem einzigen Sommer die ganze Allee." },
      { text: "Noch eine Bemerkung zu den Flächen rund um den Stamm. Bepflanzte Baumscheiben sehen schön aus, aber Rindenmulch hält das Wasser besser als blühende Stauden." },
      { text: "Zum Schluss die häufigste Frage: Warum fällen Sie gesunde Bäume? Wir fällen sie nicht gern, sondern nur dort, wo eine Leitung erneuert werden muss." },
      { text: "Die erste Bewässerung übernehmen wir drei Jahre lang. Danach entscheidet sich, ob ein Baum bleibt. Wer eine Patenschaft übernehmen möchte, meldet sich nachher bei meiner Kollegin." },
    ],
    questions: [
      {
        text: "Was ist das Thema des Vortrags?",
        options: ["die Auswahl von Straßenbäumen", "die Kosten der Bewässerung", "die Geschichte einer alten Allee"],
        answer: 0,
        explain: "„… warum wir in dieser Stadt nicht mehr dieselben Bäume pflanzen wie vor dreißig Jahren.“",
      },
      {
        text: "Warum kühlt ein großer Baum seine Umgebung?",
        options: ["Er verdunstet sehr viel Wasser.", "Er hält den warmen Wind ab.", "Sein Laub speichert die Kälte."],
        answer: 0,
        explain: "„… verdunstet an einem heißen Tag bis zu vierhundert Liter Wasser. Das kühlt seine Umgebung.“",
      },
      {
        kind: "truefalse",
        text: "Die Stadt bewässert einen neuen Baum mehrere Jahre lang.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die erste Bewässerung übernehmen wir drei Jahre lang.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange bewässert die Stadt einen neuen Baum?",
        options: [],
        answer: 0,
        accept: ["drei Jahre", "3 Jahre", "drei Jahre lang"],
        explain: "„Die erste Bewässerung übernehmen wir drei Jahre lang.“",
      },
      {
        kind: "dictation",
        text: "Tek tür ekimiyle ilgili kuralı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Wir pflanzen nicht mehr eine Art pro Straße.", "Wir pflanzen nicht mehr eine Art pro Straße"],
        explain: "„Wir pflanzen nicht mehr eine Art pro Straße.“ — „nicht mehr“ eskiden yapılanın bırakıldığını söyler.",
      },
      {
        text: "Warum werden verschiedene Arten gepflanzt?",
        options: [
          "wegen der Gefahr durch Schädlinge",
          "wegen der unterschiedlichen Blütezeit",
          "wegen der Wünsche der Anwohner",
        ],
        answer: 0,
        explain: "„Wenn ein Schädling kommt, verlieren Sie sonst in einem einzigen Sommer die ganze Allee.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w3",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Wem gehört der Gehweg?",
    genre: "Yorum yazısı",
    intro: "Bir gazete için kısa bir köşe yazısı yazacaksın; önce iki cümle kur, sonra yorumu yaz.",
    gloss: [
      { de: "der Gehweg", tr: "kaldırım", en: "sidewalk" },
      { de: "abstellen", tr: "bırakmak", en: "to park" },
      { de: "der Anspruch", tr: "talep", en: "claim" },
      { de: "ausweichen", tr: "başka yola sapmak", en: "to step aside" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kaldırıma bırakılmış scooterlar yolu kapatıyor.",
        answer: "Die auf dem Gehweg abgestellten Roller blockieren den Weg.",
        alternatives: ["Den Weg blockieren die auf dem Gehweg abgestellten Roller."],
        hint: "Partizip II sıfat olarak isimden önce gelir ve sıfat gibi çekilir: abgestellt → abgestellten.",
      },
      {
        kind: "build",
        tr: "Yürüyen insanlar en zayıf taraftır.",
        answer: "Die zu Fuß gehenden Menschen sind die schwächste Seite.",
        alternatives: ["Die schwächste Seite sind die zu Fuß gehenden Menschen."],
        hint: "Partizip I süren bir eylemi anlatır (gehen → gehend) ve o da sıfat gibi çekilir.",
      },
      {
        kind: "free",
        prompt:
          "Kaldırımın kime ait olduğu üzerine kısa bir köşe yazısı yaz: gözlemini somut anlat, çatışmayı adlandır, en az iki tarafın çıkarını tart, net bir tutum al ve tek bir somut önlemle bitir.",
        checklist: [
          "Somut bir sahneyle başla",
          "Çatışmanın gerçekte ne üzerine olduğunu söyle",
          "İki tarafın da haklı yanını tart",
          "Net bir tutum ve tek bir önlemle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Der Streit wird gern als … geführt.", tr: "Tartışma çoğu zaman … olarak yürütülür" },
          { de: "Beide Seiten haben Argumente.", tr: "İki tarafın da argümanı var." },
          { de: "Ansprüche wiegen nicht gleich, wenn …", tr: "… ise talepler eşit ağırlıkta değildir" },
          { de: "Deshalb: …", tr: "Bu yüzden: …" },
          { de: "Eine Maßnahme reicht für den Anfang: …", tr: "Başlangıç için tek bir önlem yeter: …" },
        ],
        sample:
          "Auf zwei Metern Gehweg treffen an einem normalen Dienstagmorgen mehr Ansprüche aufeinander als auf " +
          "jeder Fahrbahn. Der Bäcker stellt seinen Aufsteller heraus, das Café verlängert seine Reihe um einen " +
          "Tisch, drei geliehene Roller liegen quer, und dazwischen soll ein Kinderwagen durch. " +
          "Der Streit wird gern als Streit um Verkehrsmittel geführt. Das ist er nicht. Er ist ein Streit um eine " +
          "Fläche, die nie als Fläche geplant wurde: Der Gehweg gilt als Rest, als das, was übrig bleibt, wenn " +
          "Fahrbahn und Parkstreifen vermessen sind. Genau deshalb greift jeder zu, der Platz braucht. " +
          "Beide Seiten haben Argumente. Das Café schafft Leben und zahlt Gewerbesteuer, die abgestellten Roller " +
          "ersetzen manche Autofahrt. Aber Ansprüche wiegen nicht gleich, wenn eine Seite ausweichen kann und die " +
          "andere nicht. Wer zu Fuß geht, hat keine Alternative. Deshalb: Der Gehweg gehört den Gehenden, alles " +
          "andere ist Gast. Eine Maßnahme reicht für den Anfang: eine durchgehende, markierte Spur von einem Meter " +
          "fünfzig, die frei bleibt. Nicht als Bitte, sondern als Linie, die man sieht.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s3",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Barrierefreiheit: Pflicht oder Freiwilligkeit?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki yaklaşımı karşılaştır ve kendi ölçütünü söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Küçük işletmeler için erişilebilirlik zorunlu mu olmalı, yoksa teşvikle gönüllü mü bırakılmalı? İki yaklaşımı karşılaştır, birer zayıf noktasını göster ve kendi ölçütünü söyle.",
      bulletsTr: [
        "İki yaklaşımı kısaca adlandır",
        "Zorunluluğun güçlü ve zayıf yanını söyle",
        "Gönüllülüğün güçlü ve zayıf yanını söyle",
        "Kendi ölçütünü ver: hangi durumda hangisi",
      ],
      targets: [
        { de: "Der entscheidende Unterschied liegt darin, dass …", tr: "Belirleyici fark, … olmasıdır" },
        { de: "Eine Pflicht wirkt schnell, aber …", tr: "Zorunluluk hızlı işler ama …" },
        { de: "Freiwilligkeit erreicht nur die, die ohnehin …", tr: "Gönüllülük yalnız zaten … olanlara ulaşır" },
        { de: "Mein Kriterium wäre …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Der entscheidende Unterschied liegt darin, dass eine Pflicht auch die erreicht, die nicht von selbst " +
        "anfangen. Eine gesetzliche Vorgabe wirkt schnell und sie wirkt überall gleich; darin liegt ihre Stärke. " +
        "Ihre Schwäche ist, dass sie am Gebäude misst und nicht am Nutzen. Ein eingebauter Treppenlift auf der " +
        "Prüfliste hilft niemandem, wenn er montags abgeschlossen ist. Freiwilligkeit hat das umgekehrte Profil: " +
        "Wer sich selbst entscheidet, denkt eher an den Ablauf als an die Vorschrift, erreicht aber nur die " +
        "Betriebe, die ohnehin aufgeschlossen sind. Nach zwanzig Jahren freiwilliger Programme sieht man das " +
        "deutlich. Mein Kriterium wäre deshalb nicht die Größe des Betriebes, sondern die Art des Zugangs: " +
        "Wo eine Leistung ohne Alternative ist — eine Arztpraxis, ein Amt, die einzige Apotheke im Ort —, " +
        "muss es eine Pflicht sein. Wo es Alternativen gibt, reicht ein Anreiz und eine ehrliche Kennzeichnung.",
      rubricHint:
        "İki yaklaşımın da güçlü ve zayıf yanı geçmeli; sonuç tek bir ölçütle ayrıştırılmalı, „hepsi zorunlu olsun“ gibi düz bir cevap yeterli değil.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g3",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Die wartenden Gäste, der gedeckte Tisch",
    genre: "Kural",
    intro: "Fiilden sıfat üretmenin iki yolu: biri süren eylemi, öteki tamamlanmış olanı anlatır.",
    focus: "Partizip I ve Partizip II sıfat olarak",
    gloss: [
      { de: "decken", tr: "sofra kurmak", en: "to set the table" },
      { de: "passen", tr: "uymak", en: "to fit" },
      { de: "lösen", tr: "çözmek", en: "to solve" },
      { de: "ankommen", tr: "varmak", en: "to arrive" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçedeki iki ortaç",
        tr: "Türkçede iki ayrı ortaç vardır: „bekleyen misafirler“ (eylemi yapan) ve „kurulmuş masa“ (eylemin yapıldığı). Almancada da iki biçim var: Partizip I süren eylemi, Partizip II tamamlanmış olanı anlatır. İkisi de isimden önce gelir ve sıfat gibi çekilir.",
        examples: [
          { de: "die wartenden Gäste", tr: "bekleyen misafirler", note: "Partizip I, etkin" },
          { de: "der gedeckte Tisch", tr: "kurulmuş masa", note: "Partizip II, edilgin" },
          { de: "das lesende Kind und das gelesene Buch", tr: "okuyan çocuk ve okunan kitap" },
        ],
      },
      {
        heading: "Nasıl kurulur",
        tr: "Partizip I için mastara -d eklersin: warten → wartend, passen → passend. Partizip II fiilin üçüncü biçimidir: decken → gedeckt, schreiben → geschrieben. Sonra ikisine de normal sıfat eki gelir.",
        examples: [
          { de: "eine passende Lösung", tr: "uygun bir çözüm", note: "passen + d + e" },
          { de: "das geschriebene Wort", tr: "yazılı söz", note: "Partizip II + e" },
          { de: "ein gelöstes Problem", tr: "çözülmüş bir sorun" },
        ],
      },
      {
        heading: "Bir istisna",
        tr: "Hareket bildiren ve „sein“ ile çekilen fiillerde Partizip II edilgin değil, TAMAMLANMIŞ etkin anlam taşır: „der angekommene Zug“ trenin geldiğini söyler, birinin treni getirdiğini değil.",
        examples: [
          { de: "der angekommene Zug", tr: "gelmiş olan tren", note: "etkin, tamamlanmış" },
          { de: "die eingeschlafenen Kinder", tr: "uyuyakalmış çocuklar" },
          { de: "der ankommende Zug", tr: "gelmekte olan tren", note: "Partizip I, süren" },
        ],
      },
    ],
    questions: [
      {
        text: "Die ___ Gäste stehen noch vor der Tür. (warten)",
        options: ["wartenden", "gewarteten", "wartend"],
        answer: 0,
        explain: "Misafirler bekleme eylemini kendileri yapıyor: Partizip I + sıfat eki.",
      },
      {
        text: "Der ___ Tisch sieht festlich aus. (decken)",
        options: ["gedeckte", "deckende", "gedeckt"],
        answer: 0,
        explain: "Masayı biri kurmuştur; tamamlanmış ve edilgin anlam Partizip II ister.",
      },
      {
        text: "Das ___ Kind sitzt am Fenster. (lesen)",
        options: ["lesende", "gelesene", "lesend"],
        answer: 0,
        explain: "Çocuk okuma eylemini yapıyor: lesend + e.",
      },
      {
        kind: "gapfill",
        text: "Das ___ (schreiben) Wort bleibt, das gesprochene vergeht.",
        options: [],
        answer: 0,
        accept: ["geschriebene"],
        explain: "Söz yazılmıştır: Partizip II + sıfat eki.",
      },
      {
        kind: "gapfill",
        text: "Wir suchen eine ___ (passen) Lösung.",
        options: [],
        answer: 0,
        accept: ["passende"],
        explain: "Mastara -d, sonra sıfat eki: passend + e.",
      },
      {
        kind: "gapfill",
        text: "Der gerade ___ (ankommen) Zug hat Verspätung.",
        options: [],
        answer: 0,
        accept: ["angekommene"],
        explain: "Hareket fiilinde Partizip II tamamlanmış etkin anlam taşır: der angekommene Zug.",
      },
      {
        kind: "gapfill",
        text: "Aus „ein Problem, das gelöst wurde“ wird: „ein ___ Problem“.",
        options: [],
        answer: 0,
        accept: ["gelöstes"],
        explain: "İlgi cümlesi ortaca dönüşür ve nötr belirsiz artikelde -es eki gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die", "spielenden", "Kinder", "sind", "ziemlich", "laut"],
        explain: "Ortaç sıfat gibi isimden önce durur: Die spielenden Kinder sind ziemlich laut.",
      },
      {
        kind: "truefalse",
        text: "„die gelesende Zeitung“ — Bu ifade doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Böyle karma bir biçim yoktur: ya „die lesende Frau“ ya da „die gelesene Zeitung“.",
      },
      {
        kind: "truefalse",
        text: "„der angekommene Zug“ — Bu ifade doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„ankommen“ sein ile çekilir; Partizip II burada tamamlanmış etkin anlam taşır, ifade doğrudur.",
      },
    ],
  },
];

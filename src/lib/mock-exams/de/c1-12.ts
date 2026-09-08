import type { MockPaper } from "../types";

/**
 * C1 · Deneme 12 — "Bild und Beweis".
 *
 * PLAN kâğıt 1–11 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (özet tamamlama 10 · deneme metni 10 · yapısal boşluk 5)
 *   Hören  40 dk · 25 madde   (not tamamlama 10 · panel 15)
 *   Schreiben 80 dk · 10 madde (görüş yazısı ~200 kelime + boşluklu resmî mektup 10)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: bir görüntünün neyi kanıtladığı. C1'in ölçtüğü ayrım burada
 * çok keskin: fotoğraf, objektifin önünde bir şeyin bulunduğunu kanıtlar —
 * o şeyin ne anlama geldiğini kanıtlamaz. Aradaki mesafeyi dolduran şey
 * kadraj ve altyazıdır, ve ikisi de karardır.
 *
 * DİKKAT EDİLEN: metinler görüntüye güvenmemeyi öğretmiyor. Sahtecilik
 * konusu bilerek ikinci planda; asıl mesele hiçbir şeyi değiştirilmemiş bir
 * fotoğrafın da tek başına bir iddiayı taşıyamaması.
 *
 * Deneme metninin doğru şıkları baştan parafraz olarak yazıldı — c1-11'de
 * aynı görevin üç maddesi metinden birebir parça taşımıştı.
 */
export const C1_12: MockPaper = {
  id: "de-c1-12",
  course: "de",
  level: "C1",
  no: 12,
  theme: "Bild und Beweis",
  themeTr: "Görüntü ve kanıt",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen Essay auswerten und einen Text strukturell schließen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, bir deneme metnini çözümlemek ve bir metni yapısal olarak kapatmak.",
      tasks: [
        {
          id: "de-c1-12-l1",
          no: 1,
          format: "gap",
          goal: "gist",
          prompt:
            "Lesen Sie den Text und die Zusammenfassung darunter. Ergänzen Sie die Lücken 1 bis 10 sinngemäß. Schreiben Sie in jede Lücke ein Wort. Die Wörter stehen nicht immer wörtlich im Text.",
          promptTr:
            "Metni ve altındaki özeti oku. 1–10. boşlukları anlama uygun biçimde tamamla. Her boşluğa bir sözcük yaz. Sözcükler metinde her zaman birebir geçmiyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Was ein Bild nicht zeigt",
              body: `Eine Fotografie beweist, dass sich etwas vor der Linse befunden hat. Sie beweist nicht, was es bedeutet. Zwischen beiden Sätzen liegt der gesamte Streit über Bilder als Beleg.

Die öffentliche Debatte hat sich indes fast vollständig auf die Fälschung verlagert. Gefragt wird, ob ein Bild verändert wurde. Das ist eine sinnvolle Frage und beantwortet die schwierigere nicht: Ein technisch unangetastetes Bild kann in die Irre führen, ohne dass ein einziges Pixel bewegt worden wäre.

Verantwortlich dafür sind zwei Entscheidungen, die kein Betrachter sieht. Die erste ist der Ausschnitt. Was außerhalb des Rahmens geschieht, existiert für das Bild nicht, und der Rahmen wird gewählt.

Die zweite ist der Zeitpunkt. Eine Geste dauert Sekunden und zerfällt in Aufnahmen, von denen einige das Gegenteil der anderen nahelegen. Wer eine davon veröffentlicht, veröffentlicht zwangsläufig eine Behauptung.

Hinzu kommt die Bildunterschrift. Sie gilt als Beiwerk und leistet in Wahrheit die Hauptarbeit, denn sie sagt, worauf zu achten ist. Dasselbe Foto trägt unter zwei Zeilen zwei verschiedene Aussagen.

Ein Einwand liegt nahe: Dann sei eben jedes Bild wertlos. Er ließe sich gleichwohl entkräften, denn dieselbe Überlegung gilt für jeden Zeugen, und Zeugen werden nicht abgeschafft, sondern befragt.

Was daraus folgt, ist unbequem für die Praxis: Ein Bild braucht dieselbe Behandlung wie eine Aussage — Herkunft, Zeitpunkt, Umstände. Wer nur nach Fälschung sucht, prüft die leichtere Hälfte.`,
              gloss: [
                { de: "der Beleg", tr: "kanıt, belge", en: "evidence" },
                { de: "unangetastet", tr: "dokunulmamış", en: "untouched" },
                { de: "der Ausschnitt", tr: "kadraj, kesit", en: "frame, crop" },
                { de: "das Beiwerk", tr: "yan unsur", en: "accessory, trimming" },
                { de: "entkräften", tr: "çürütmek", en: "to refute" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Eine Fotografie belegt nur, dass sich etwas vor der {{1}} befunden hat, nicht aber, was es bedeutet.

Die öffentliche Debatte hat sich nach Ansicht des Autors fast vollständig auf die {{2}} verlagert. Diese Frage sei sinnvoll, beantworte die schwierigere jedoch nicht: Auch ein technisch {{3}} Bild könne in die Irre führen.

Verantwortlich seien zwei unsichtbare Entscheidungen. Die erste ist der {{4}}: Was außerhalb des Rahmens geschieht, existiert für das Bild nicht.

Die zweite ist der {{5}}. Eine Geste zerfällt in Aufnahmen, von denen einige das {{6}} der anderen nahelegen; wer eine davon veröffentlicht, veröffentlicht eine Behauptung.

Hinzu kommt die {{7}}, die als Beiwerk gilt und in Wahrheit die Hauptarbeit leistet, weil sie sagt, worauf zu achten ist.

Den Einwand, damit sei jedes Bild wertlos, entkräftet der Autor mit einem Vergleich: Dieselbe Überlegung gelte auch für jeden {{8}}, und diese würden nicht abgeschafft, sondern {{9}}.

Sein Schluss lautet, dass ein Bild dieselbe Behandlung brauche wie eine Aussage — Herkunft, Zeitpunkt, Umstände — und dass Fälschungsprüfung allein nur die {{10}} Hälfte abdecke.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-12-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Linse", "Kamera", "Optik"],
              explain:
                "İlk cümle bunu tam olarak söylüyor: \"dass sich etwas vor der Linse befunden hat\".",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Fälschung", "Manipulation", "Bearbeitung"],
              explain:
                "\"Die öffentliche Debatte hat sich indes fast vollständig auf die Fälschung verlagert.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["unangetastetes", "unverändertes", "unbearbeitetes"],
              explain:
                "Metin bunu vurguluyor: \"Ein technisch unangetastetes Bild kann in die Irre führen, ohne dass ein einziges Pixel bewegt worden wäre.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["Ausschnitt", "Rahmen", "Bildausschnitt"],
              explain:
                "\"Die erste ist der Ausschnitt. Was außerhalb des Rahmens geschieht, existiert für das Bild nicht.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Zeitpunkt", "Moment", "Augenblick"],
              explain:
                "İkinci karar açıkça adlandırılıyor: \"Die zweite ist der Zeitpunkt.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Gegenteil", "Gegenteilige"],
              explain:
                "Bir jest saniyeler sürüyor ve kareler arasında bazıları \"das Gegenteil der anderen\" düşündürüyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Bildunterschrift", "Unterschrift", "Bildzeile"],
              explain:
                "\"Hinzu kommt die Bildunterschrift. Sie gilt als Beiwerk und leistet in Wahrheit die Hauptarbeit.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Zeugen", "Zeuge", "Augenzeugen"],
              explain:
                "Çürütme bir karşılaştırmaya dayanıyor: \"dieselbe Überlegung gilt für jeden Zeugen\".",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["befragt", "vernommen", "geprüft"],
              explain:
                "Karşılaştırmanın ikinci yarısı: tanıklar \"nicht abgeschafft, sondern befragt\" ediliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["leichtere", "einfachere"],
              explain:
                "Son cümle: \"Wer nur nach Fälschung sucht, prüft die leichtere Hälfte.\"",
            },
          ],
        },
        {
          id: "de-c1-12-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Essay und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d?",
          promptTr: "Deneme metnini ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Essay",
              genreTr: "Deneme",
              title: "Der Ausschnitt, den ich gewählt habe",
              body: `Ich habe siebzehn Jahre lang Bilder für eine Tageszeitung ausgewählt. Gefragt wurde ich in dieser Zeit fast ausschließlich, ob ein Foto echt sei.

Das war selten das Problem. Gefälschte Bilder sind mir in siebzehn Jahren vier untergekommen, und drei davon waren plump. Was mich nachts beschäftigt hat, war ein anderes.

Im Sommer 2011 habe ich ein Bild von einer Demonstration gewählt. Darauf steht ein junger Mann, den Arm erhoben, das Gesicht angespannt. Neben ihm ein Polizist. Ich habe das Bild gedruckt, und es war nicht manipuliert.

Auf dem Bild daneben, aus derselben Serie, reicht derselbe Mann demselben Polizisten eine Flasche Wasser. Diesen Ausschnitt habe ich nicht genommen, weil er langweilig war.

Ich behaupte nicht, dass ich gelogen habe. Ich behaupte, dass beide Bilder wahr sind und beide unvollständig, und dass ich die Unvollständigkeit ausgewählt habe, die mehr Wirkung hatte.

Man könnte einwenden, jede Auswahl sei so beschaffen, auch die eines Textes. Der Einwand stimmt und trägt gleichwohl nicht weit. Ein Text zeigt, dass jemand ausgewählt hat; ein Bild verbirgt es. Wer einen Satz liest, weiß, dass ihn jemand formuliert hat. Wer ein Foto sieht, glaubt zunächst, er sehe.

Was ich daraus gelernt habe, ist unspektakulär. Ich habe von 2013 an neben jedes Aufmacherbild eine Zeile gesetzt, in der stand, was unmittelbar davor oder danach passiert ist. Die Redaktion hielt das für pedantisch. Nach drei Jahren haben zwei andere Blätter es übernommen.

Mein früherer Chef sagt bis heute, ich hätte damit den Bildern ihre Kraft genommen. Er hat recht. Ich halte das inzwischen für den Preis und nicht für den Fehler.`,
              gloss: [
                { de: "plump", tr: "kaba, beceriksiz", en: "crude" },
                { de: "angespannt", tr: "gergin", en: "tense" },
                { de: "unvollständig", tr: "eksik", en: "incomplete" },
                { de: "das Aufmacherbild", tr: "manşet fotoğrafı", en: "lead photograph" },
                { de: "pedantisch", tr: "kılı kırk yaran", en: "pedantic" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-12-l2-11",
              no: 11,
              ref: "t2",
              text: "Welche Frage wurde der Autorin fast immer gestellt?",
              options: [
                "Ob ein Motiv angemessen sei.",
                "Wer ein Foto aufgenommen habe.",
                "Ob die Aufnahme unverfälscht sei.",
                "Warum ein Bild groß gedruckt werde.",
              ],
              answer: 2,
              explain:
                "\"Gefragt wurde ich in dieser Zeit fast ausschließlich, ob ein Foto echt sei\" — ve bunun asıl sorun olmadığını hemen ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-12",
              no: 12,
              ref: "t2",
              text: "Wie beurteilt sie die Bedeutung von Fälschungen?",
              options: [
                "Als seltenes und meist leicht erkennbares Problem.",
                "Als wachsende Gefahr für die Redaktionen.",
                "Als überschätzt, weil Technik sie ohnehin aufdeckt.",
                "Als Kern der Auseinandersetzung um Bilder.",
              ],
              answer: 0,
              explain:
                "\"Gefälschte Bilder sind mir in siebzehn Jahren vier untergekommen, und drei davon waren plump\" — teknik tespitten hiç söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-13",
              no: 13,
              ref: "t2",
              text: "Was war an dem gedruckten Foto von 2011 bemerkenswert?",
              options: [
                "Es war nachträglich bearbeitet worden.",
                "Es stammte von einem unbekannten Fotografen.",
                "Es zeigte eine Szene, die nie stattfand.",
                "Es war unverändert und trotzdem einseitig.",
              ],
              answer: 3,
              explain:
                "\"Ich habe das Bild gedruckt, und es war nicht manipuliert\" — sorun aynı seriden başka bir karenin seçilmemesi.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-14",
              no: 14,
              ref: "t2",
              text: "Warum hat sie das andere Bild nicht genommen?",
              options: [
                "Es war technisch unbrauchbar.",
                "Es wirkte auf sie uninteressant.",
                "Es kam zu spät in die Redaktion.",
                "Es zeigte den Polizisten zu deutlich.",
              ],
              answer: 1,
              explain:
                "Gerekçesini tek sözcükle veriyor: \"weil er langweilig war\" — su şişesi uzatılan kare aynı seriden.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-15",
              no: 15,
              ref: "t2",
              text: "Wie beschreibt sie ihr eigenes Handeln?",
              options: [
                "Als Wahl zwischen zwei halben Wahrheiten.",
                "Als bewusste Täuschung der Leserschaft.",
                "Als Fehler, der ihr erst später auffiel.",
                "Als Vorgabe der damaligen Chefredaktion.",
              ],
              answer: 0,
              explain:
                "Yalan söylediğini reddediyor: \"beide Bilder sind wahr und beide unvollständig\" — seçtiği şey \"die Unvollständigkeit …, die mehr Wirkung hatte\".",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-16",
              no: 16,
              ref: "t2",
              text: "Wie geht sie mit dem Vergleich zum Text um?",
              options: [
                "Sie hält den Einwand für sachfremd.",
                "Sie lässt ihn ohne Grenze gelten.",
                "Sie stimmt zu und begrenzt ihn.",
                "Sie hält ihn für stärker als ihr eigenes Argument.",
              ],
              answer: 2,
              explain:
                "\"Der Einwand stimmt und trägt gleichwohl nicht weit\" — çünkü metin seçildiğini gösterir, fotoğraf gizler.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-17",
              no: 17,
              ref: "t2",
              text: "Worin liegt für sie der Unterschied zwischen Satz und Foto?",
              options: [
                "In der Größe des Ausschnitts.",
                "In der Sichtbarkeit der Auswahl.",
                "In der Zahl der Zeilen unter dem Bild.",
                "In der Kraft der Redaktion.",
              ],
              answer: 1,
              explain:
                "Cümleyi okuyan birinin onu kurduğunu bilir; fotoğrafı gören ise \"glaubt zunächst, er sehe\".",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-18",
              no: 18,
              ref: "t2",
              text: "Welche Konsequenz hat sie gezogen?",
              options: [
                "Sie hat auf große Aufmacherbilder verzichtet.",
                "Sie hat nur noch eigene Serien verwendet.",
                "Sie hat die Auswahl an Kollegen abgegeben.",
                "Sie hat den Kontext dazugeschrieben.",
              ],
              answer: 3,
              explain:
                "2013'ten itibaren her manşet fotoğrafının yanına \"was unmittelbar davor oder danach passiert ist\" yazan bir satır koymuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-19",
              no: 19,
              ref: "t2",
              text: "Wie wurde diese Praxis aufgenommen?",
              options: [
                "Zuerst abgelehnt, später übernommen.",
                "Sofort in mehreren Häusern eingeführt.",
                "Von der Redaktion als Vorbild gelobt.",
                "Nach kurzer Zeit wieder abgeschafft.",
              ],
              answer: 0,
              explain:
                "\"Die Redaktion hielt das für pedantisch. Nach drei Jahren haben zwei andere Blätter es übernommen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l2-20",
              no: 20,
              ref: "t2",
              text: "Wie reagiert sie auf den Vorwurf ihres früheren Chefs?",
              options: [
                "Sie bestreitet die Wirkung ihrer Zeilen.",
                "Sie führt sie auf einen Irrtum zurück.",
                "Sie gibt ihm recht und bewertet es anders.",
                "Sie hält den Vorwurf für nachträglich erfunden.",
              ],
              answer: 2,
              explain:
                "\"Er hat recht. Ich halte das inzwischen für den Preis und nicht für den Fehler.\"",
            },
          ],
        },
        {
          id: "de-c1-12-l3",
          no: 3,
          format: "gapMcq",
          goal: "structure",
          prompt: "Lesen Sie den Text und ergänzen Sie die Lücken 21 bis 25. Welche Lösung passt: a, b, c oder d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi seçenek uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Zeitschriftentext",
              genreTr: "Dergi metni",
              title: "Die Zeile unter dem Bild",
              body: `Seit der Richtlinie sind Redaktionen gehalten, die Herkunft jedes Fotos zu dokumentieren. Umgesetzt wird das {{21}} lückenhaft.

Am Aufwand liegt es selten. Ein Vermerk, {{22}} Erstellung zwei Minuten dauert, scheitert nicht an der Zeit. Er scheitert daran, dass niemand ihn liest.

Hinzu kommt ein Anreizproblem. Wer den Kontext dazuschreibt, schwächt die Wirkung des eigenen Aufmachers, {{23}} sich die Sorgfalt für die Redaktion messbar auszahlt.

Fachleute fordern deshalb weniger eine strengere Pflicht {{24}} eine sichtbare Zeile. Was unter dem Bild steht, wird gelesen; was im Archiv steht, nicht.

Was sich sagen lässt: Eine Angabe wirkt erst dort, {{25}} sie derselbe Blick erfasst wie das Bild.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-12-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["keineswegs", "bislang", "nirgends", "zu keiner Zeit"],
              answer: 1,
              explain:
                "Cümle bir yükümlülüğün eksik uygulandığını söylüyor; `bislang` bunu zaman içine yerleştirir. Üç olumsuz seçenek `lückenhaft` ile birlikte anlamsız bir yığılma yaratırdı.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["den", "dem", "deren", "dessen"],
              answer: 3,
              explain:
                "İlgi cümlesi `Vermerk` adına ait bir tamlayan istiyor: \"ein Vermerk, dessen Erstellung zwei Minuten dauert\". `Vermerk` eril olduğu için `dessen` gerekir.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["ohne dass", "damit", "sofern", "als ob"],
              answer: 0,
              explain:
                "Manşetin etkisi zayıflıyor ama karşılığında ölçülebilir bir kazanç yok; bu eksikliği `ohne dass` kurar. `damit` amaç, `sofern` koşul bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "denn", "als", "sondern"],
              answer: 2,
              explain:
                "`weniger …` karşılaştırması `als` ister: \"weniger eine strengere Pflicht als eine sichtbare Zeile\". `sondern` önünde olumsuzlama gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["wobei", "womit", "worin", "wo"],
              answer: 3,
              explain:
                "`erst dort` bir yer belirteci; onu karşılayan ilgi sözcüğü `wo`: \"erst dort, wo sie derselbe Blick erfasst\".",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Podiumsdiskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: notları tamamlamak ve bir panel tartışmasını çözümlemek.",
      tasks: [
        {
          id: "de-c1-12-h1",
          no: 1,
          format: "notes",
          goal: "detail",
          prompt:
            "Sie hören eine Informationsveranstaltung. Ergänzen Sie die Notizen 1 bis 10. Schreiben Sie höchstens drei Wörter in jede Lücke. Sie hören den Text einmal.",
          promptTr:
            "Bir bilgilendirme konuşması dinleyeceksin. 1–10. notları tamamla. Her boşluğa en çok üç sözcük yaz. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Informationsveranstaltung",
              genreTr: "Bilgilendirme konuşması",
              title: "Bildprüfstelle am Landesarchiv — Vorstellung",
              situation: "Eyalet arşivinden biri yeni bir birimi anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Ines Lindqvist, ich leite das Landesarchiv. Ich stelle Ihnen die neue Bildprüfstelle vor und beginne mit dem, was sie nicht ist: Sie ist keine Zensurstelle. Wir entscheiden nicht, was veröffentlicht wird.",
                },
                {
                  text: "Der Auftrag ist enger. Wir prüfen die Herkunft von Bildern, die Behörden und Gerichte uns vorlegen. Im letzten Jahr waren das siebenhundertvierzig Aufnahmen.",
                },
                {
                  text: "Ein Punkt, der oft missverstanden wird: Fälschung ist bei uns der seltenere Fall. Bei vierzehn Bildern war die Datei verändert. Bei zweihundertsechs war die Zuordnung falsch — richtiges Bild, falscher Ort oder falsches Jahr.",
                },
                {
                  text: "Wir arbeiten in zwei Stufen. Zuerst technisch, dann inhaltlich. Die zweite Stufe dauert im Schnitt drei Tage, die erste unter einer Stunde.",
                },
                {
                  text: "Zur Ausstattung: Wir sind derzeit fünf Personen, davon zwei mit historischer Ausbildung. Genau diese beiden Stellen sind die schwer zu besetzenden.",
                },
                {
                  text: "Zur Finanzierung: Der Betrieb kostet dreihundertzwanzigtausend Euro im Jahr. Getragen wird das je zur Hälfte vom Land und von den anfragenden Stellen.",
                },
                {
                  text: "Was ich nicht beschönigen will: Bei einundvierzig Aufnahmen konnten wir gar nichts feststellen. Das Ergebnis lautet dann ausdrücklich ungeklärt, nicht echt und nicht gefälscht.",
                },
                {
                  text: "Was wir messen: die Bearbeitungsdauer, den Anteil ungeklärter Fälle und die Zahl der Widersprüche. Berichtet wird jährlich an den Landtag.",
                },
                {
                  text: "Ein Hinweis zur Nutzung: Private Anfragen nehmen wir nicht an. Wenden Sie sich bitte an eine der drei zugelassenen Prüfstellen; die Liste steht auf unserer Seite.",
                },
                {
                  text: "Und was wir von Ihnen brauchen: Rückmeldungen zum Verfahren bitte bis zum fünfzehnten Januar an mein Büro. Danach geht der Entwurf in die Anhörung.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Ausdrücklich keine {{1}} — es wird nicht über Veröffentlichung entschieden.

Geprüfte Aufnahmen im letzten Jahr: {{2}}.

Datei verändert bei {{3}} Bildern.

Falsche Zuordnung bei {{4}} Bildern.

Zweite Prüfstufe dauert im Schnitt {{5}}.

Personal: fünf Personen, davon zwei mit {{6}} Ausbildung.

Betriebskosten pro Jahr: {{7}} Euro.

Ungeklärt geblieben: {{8}} Aufnahmen.

Private Anfragen: {{9}}, stattdessen drei zugelassene Prüfstellen.

Rückmeldungen zum Verfahren bis {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-12-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Zensurstelle", "Zensur"],
              explain:
                "Konuşma bu ayrımla açılıyor: \"Sie ist keine Zensurstelle. Wir entscheiden nicht, was veröffentlicht wird.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["740", "siebenhundertvierzig"],
              explain:
                "\"Wir prüfen die Herkunft von Bildern, die Behörden und Gerichte uns vorlegen. Im letzten Jahr waren das siebenhundertvierzig Aufnahmen.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["14", "vierzehn"],
              explain:
                "Sahtecilik daha seyrek: \"Bei vierzehn Bildern war die Datei verändert.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["206", "zweihundertsechs"],
              explain:
                "Asıl büyük grup: \"Bei zweihundertsechs war die Zuordnung falsch — richtiges Bild, falscher Ort oder falsches Jahr.\"",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["drei Tage", "3 Tage", "drei Tagen"],
              explain:
                "İki aşama karşılaştırılıyor: içerik aşaması \"im Schnitt drei Tage\", teknik aşama bir saatin altında.",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["historischer", "historische", "geschichtlicher"],
              explain:
                "\"Wir sind derzeit fünf Personen, davon zwei mit historischer Ausbildung\" — ve doldurulması zor olan kadrolar tam bunlar.",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["320.000", "320000", "dreihundertzwanzigtausend"],
              explain:
                "\"Der Betrieb kostet dreihundertzwanzigtausend Euro im Jahr\" — yarısı eyalet, yarısı başvuran kurumlar.",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["41", "einundvierzig"],
              explain:
                "\"Bei einundvierzig Aufnahmen konnten wir gar nichts feststellen\" — sonuç açıkça belirsiz sayılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["nicht angenommen", "abgelehnt", "keine"],
              explain:
                "\"Private Anfragen nehmen wir nicht an\" — bunun yerine üç yetkili kuruma yönlendiriliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["15. Januar", "fünfzehnten Januar", "15.01."],
              explain:
                "\"Rückmeldungen zum Verfahren bitte bis zum fünfzehnten Januar an mein Büro. Danach geht der Entwurf in die Anhörung.\"",
            },
          ],
        },
        {
          id: "de-c1-12-h2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Podiumsdiskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text zweimal.",
          promptTr:
            "Bir panel tartışması dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              title: "Was ein Bild beweist",
              situation: "Bir görüntü editörü, bir hâkim ve bir arşivci tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Frau Baumert, Sie haben siebzehn Jahre Bilder ausgewählt. Was war Ihr größtes Problem?",
                },
                {
                  speaker: "Frau Baumert",
                  text: "Nicht die Fälschung. Die kam mir viermal unter. Mein Problem war der Ausschnitt: Aus derselben Serie lassen sich zwei Bilder wählen, die einander widersprechen, und beide sind echt.",
                },
                { speaker: "Moderator", text: "Herr Prochnow, Sie sitzen am Gericht. Wie gehen Sie damit um?" },
                {
                  speaker: "Herr Prochnow",
                  text: "Wir behandeln ein Bild wie einen Zeugen. Herkunft, Zeitpunkt, Umstände. Was mich beunruhigt, ist etwas anderes: Auf Bilder wird im Saal seltener nachgefragt als auf Aussagen.",
                },
                { speaker: "Moderator", text: "Woran liegt das?" },
                {
                  speaker: "Herr Prochnow",
                  text: "An der Unmittelbarkeit. Ein Zeuge spricht, und alle wissen, dass er sich irren kann. Ein Bild wirkt, als spräche niemand. Genau das ist die Täuschung, und sie ist keineswegs neu.",
                },
                {
                  speaker: "Frau Lindqvist",
                  text: "Unsere Zahlen stützen das. Von siebenhundertvierzig Prüfungen betraf die Fälschung vierzehn Fälle. Die falsche Zuordnung betraf zweihundertsechs. Wir suchen also überwiegend am falschen Ort.",
                },
                { speaker: "Moderator", text: "Frau Baumert, würde eine Pflicht zur Kontextzeile helfen?" },
                {
                  speaker: "Frau Baumert",
                  text: "Eine Pflicht allein nicht. Ich habe die Zeile freiwillig eingeführt, und die Redaktion hielt sie für pedantisch. Entscheidend war nicht die Pflicht, sondern dass die Zeile unter dem Bild stand und nicht im Archiv.",
                },
                {
                  speaker: "Herr Prochnow",
                  text: "Das deckt sich mit unserer Erfahrung. Was in der Akte steht, liest im Zweifel niemand. Was auf der Leinwand steht, wird gelesen.",
                },
                { speaker: "Moderator", text: "Frau Lindqvist, was fehlt Ihnen am meisten?" },
                {
                  speaker: "Frau Lindqvist",
                  text: "Personal mit historischer Ausbildung. Die technische Prüfung dauert eine Stunde und lässt sich lernen. Die inhaltliche dauert Tage und setzt voraus, dass jemand weiß, wie eine Straße 1994 ausgesehen hat.",
                },
                {
                  speaker: "Frau Baumert",
                  text: "Das ist der Punkt, an dem mein Beruf und Ihrer sich treffen. Beide brauchen Leute, die etwas wissen, und beide werden mit Software beworben.",
                },
                { speaker: "Moderator", text: "Ein Einwand: Wird damit nicht jedes Bild entwertet?" },
                {
                  speaker: "Herr Prochnow",
                  text: "Der Einwand kommt in jedem Verfahren. Er trägt nicht: Wir schaffen Zeugen ja auch nicht ab, weil sie sich erinnern müssen. Wir befragen sie.",
                },
                {
                  speaker: "Frau Lindqvist",
                  text: "Wobei ich eines einräume: Unser häufigstes Ergebnis ist nicht echt und nicht gefälscht, sondern ungeklärt. Damit umzugehen, fällt Gerichten schwerer als mit einem klaren Befund.",
                },
                { speaker: "Moderator", text: "Ein gemeinsamer Vorschlag zum Schluss?" },
                {
                  speaker: "Frau Baumert",
                  text: "Kontext sichtbar dazu, Prüfung inhaltlich statt nur technisch, und das Wort ungeklärt aushalten. Wer nur das Erste macht, hat eine Zeile und keine Prüfung.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-12-h2-11",
              no: 11,
              ref: "d1",
              text: "Was war für Frau Baumert das größere Problem?",
              options: [
                "Die Zahl gefälschter Aufnahmen.",
                "Die Wahl des Bildausschnitts.",
                "Der Zeitdruck in der Redaktion.",
              ],
              answer: 1,
              explain:
                "\"Nicht die Fälschung. Die kam mir viermal unter.\" Asıl sorun: aynı seriden \"zwei Bilder wählen, die einander widersprechen, und beide sind echt\".",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-12",
              no: 12,
              ref: "d1",
              text: "Wie behandelt Herr Prochnow ein Bild vor Gericht?",
              options: [
                "Wie einen Zeugen.",
                "Wie ein Sachverständigengutachten.",
                "Wie ein nachrangiges Indiz.",
              ],
              answer: 0,
              explain:
                "\"Wir behandeln ein Bild wie einen Zeugen\" — ve ölçütleri sayıyor: \"Herkunft, Zeitpunkt, Umstände.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-13",
              no: 13,
              ref: "d1",
              text: "Was beunruhigt ihn dabei?",
              options: [
                "Die Kosten der Prüfung.",
                "Die Dauer der Verfahren.",
                "Das seltene Nachfragen bei Bildern.",
              ],
              answer: 2,
              explain:
                "\"Auf Bilder wird im Saal seltener nachgefragt als auf Aussagen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-14",
              no: 14,
              ref: "d1",
              text: "Womit erklärt er das?",
              options: [
                "Mit fehlender Schulung der Beteiligten.",
                "Mit dem Eindruck der Unmittelbarkeit.",
                "Mit der Menge des Bildmaterials.",
              ],
              answer: 1,
              explain:
                "Tanık konuşur ve yanılabileceği bilinir; \"Ein Bild wirkt, als spräche niemand.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-15",
              no: 15,
              ref: "d1",
              text: "Was zeigen die Zahlen von Frau Lindqvist?",
              options: [
                "Die Zuordnung ist häufiger falsch als die Datei.",
                "Die Fälschungen nehmen deutlich zu.",
                "Die meisten Prüfungen bleiben ohne Ergebnis.",
              ],
              answer: 0,
              explain:
                "Yedi yüz kırk incelemede sahtecilik on dört, yanlış atıf iki yüz altı vaka — \"Wir suchen also überwiegend am falschen Ort.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-16",
              no: 16,
              ref: "d1",
              text: "Wie beurteilt Frau Baumert eine gesetzliche Pflicht?",
              options: [
                "Als einzig wirksames Mittel.",
                "Als rechtlich nicht durchsetzbar.",
                "Als für sich genommen unzureichend.",
              ],
              answer: 2,
              explain:
                "\"Eine Pflicht allein nicht\" — belirleyici olan satırın arşivde değil fotoğrafın altında durması.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-17",
              no: 17,
              ref: "d1",
              text: "Wie reagierte ihre Redaktion damals?",
              options: [
                "Sie hielt die Zeile für pedantisch.",
                "Sie machte die Zeile zur Vorschrift.",
                "Sie lehnte die Bilder daraufhin ab.",
              ],
              answer: 0,
              explain:
                "Satırı gönüllü olarak koymuş ve \"die Redaktion hielt sie für pedantisch\".",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-18",
              no: 18,
              ref: "d1",
              text: "Wie bestätigt Herr Prochnow diesen Punkt?",
              options: [
                "Mit der Zahl der Berufungen.",
                "Mit dem Unterschied von Akte und Leinwand.",
                "Mit einer Umfrage unter Richtern.",
              ],
              answer: 1,
              explain:
                "\"Was in der Akte steht, liest im Zweifel niemand. Was auf der Leinwand steht, wird gelesen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-19",
              no: 19,
              ref: "d1",
              text: "Was fehlt Frau Lindqvist am meisten?",
              options: [
                "Bessere technische Ausstattung.",
                "Eine klarere Rechtsgrundlage.",
                "Fachkräfte mit historischem Wissen.",
              ],
              answer: 2,
              explain:
                "Teknik inceleme bir saat sürüyor ve öğrenilebiliyor; içerik incelemesi bir sokağın 1994'te nasıl göründüğünü bilmeyi gerektiriyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-20",
              no: 20,
              ref: "d1",
              text: "Worin sieht Frau Baumert die Gemeinsamkeit beider Berufe?",
              options: [
                "Beide werden technisch überschätzt.",
                "Beide leiden unter Zeitdruck.",
                "Beide sind rechtlich kaum geschützt.",
              ],
              answer: 0,
              explain:
                "İkisi de bir şey bilen insanlara ihtiyaç duyuyor, \"und beide werden mit Software beworben\".",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie begegnet Herr Prochnow dem Einwand der Entwertung?",
              options: [
                "Mit dem Hinweis auf die Technik.",
                "Mit dem Vergleich zum Zeugen.",
                "Mit einem Verweis auf die Praxis anderer Länder.",
              ],
              answer: 1,
              explain:
                "\"Wir schaffen Zeugen ja auch nicht ab, weil sie sich erinnern müssen. Wir befragen sie.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-22",
              no: 22,
              ref: "d1",
              text: "Was räumt Frau Lindqvist ein?",
              options: [
                "Die Prüfung dauert zu lange.",
                "Die Zahlen sind nicht belastbar.",
                "Das häufigste Ergebnis ist ungeklärt.",
              ],
              answer: 2,
              explain:
                "\"Unser häufigstes Ergebnis ist nicht echt und nicht gefälscht, sondern ungeklärt\" — ve bununla başa çıkmak mahkemeler için daha zor.",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-23",
              no: 23,
              ref: "d1",
              text: "Welche drei Punkte nennt Frau Baumert zum Schluss?",
              options: [
                "Kontext, inhaltliche Prüfung, Umgang mit Unklarheit.",
                "Pflicht, Technik, Ausbildung.",
                "Archiv, Leinwand, Berufung.",
              ],
              answer: 0,
              explain:
                "\"Kontext sichtbar dazu, Prüfung inhaltlich statt nur technisch, und das Wort ungeklärt aushalten.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-24",
              no: 24,
              ref: "d1",
              text: "Was geschieht nach ihr, wenn nur der erste Punkt umgesetzt wird?",
              options: [
                "Die Kosten steigen ohne Nutzen.",
                "Die Redaktionen verlieren Leser.",
                "Man hat eine Zeile ohne Prüfung.",
              ],
              answer: 2,
              explain:
                "Uyarı son cümlede: \"Wer nur das Erste macht, hat eine Zeile und keine Prüfung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-12-h2-25",
              no: 25,
              ref: "d1",
              text: "Worin stimmen alle drei überein?",
              options: [
                "Dass Software die Prüfung künftig übernimmt.",
                "Dass die Fälschungsprüfung allein zu kurz greift.",
                "Dass Bilder vor Gericht seltener zugelassen werden sollten.",
              ],
              answer: 1,
              explain:
                "Üçü de teknik incelemenin ötesine geçilmesini istiyor: \"Prüfung inhaltlich statt nur technisch\". Yazılım tersine eleştiriliyor ve kimse görüntülerin dışlanmasını önermiyor.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Stellungnahme und einen förmlichen Brief mit Lücken.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve boşluklu resmî bir mektup.",
      tasks: [
        {
          id: "de-c1-12-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Wochenzeitung stand: \"Solange ein Foto nicht bearbeitet wurde, zeigt es die Wahrheit.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir haftalık gazetede şöyle yazdı: \"Bir fotoğraf işlenmemişse gerçeği gösterir.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Die These verwechselt Unversehrtheit mit Vollständigkeit. Dass an einer Datei nichts verändert wurde, sagt etwas über die Datei und nichts über die Behauptung, die mit ihr aufgestellt wird. Ein Bild belegt, dass sich etwas vor der Linse befunden hat; was es bedeutet, entsteht erst durch Ausschnitt, Zeitpunkt und Bildunterschrift — und diese drei sieht der Betrachter nicht.

Prüfen lässt sich das an einer Bildserie von einer Demonstration. Auf der einen Aufnahme steht ein Mann mit erhobenem Arm neben einem Polizisten, auf der nächsten reicht derselbe Mann demselben Polizisten eine Flasche Wasser. Beide Bilder sind unbearbeitet, beide sind wahr, und sie legen Entgegengesetztes nahe. Wer eines davon druckt, veröffentlicht zwangsläufig eine Auswahl, die als Beobachtung gelesen wird.

Gegen meine Position spricht ein ernstes Argument: Wer so argumentiert, entwertet am Ende jeden Beleg, denn Auswahl steckt in jeder Darstellung. Der Einwand trifft und lässt sich gleichwohl einordnen. Zeugen erinnern sich unvollständig, und niemand fordert deshalb ihre Abschaffung; sie werden befragt.

Was sich daraus ergibt, ist keine Geringschätzung der Fotografie, sondern eine andere Behandlung. Meine Schlussfolgerung lautet daher: Ein Bild braucht dieselbe Behandlung wie eine Aussage — Herkunft, Zeitpunkt, Umstände. Die Frage nach der Bearbeitung ist berechtigt und deckt nur die leichtere Hälfte ab.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — hangi ayrım kurulmadan sav ayakta duruyor?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik ve gerçekten güçlü mü?",
              "Sonuç itirazdan sonra hâlâ ayakta mı?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-12-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben als Redakteurin an das Landesarchiv und geben eine Rückmeldung zum Verfahren der Bildprüfstelle. Ergänzen Sie die Lücken 1 bis 10 im Schreiben. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Bir editör olarak eyalet arşivine yazıyor ve görüntü inceleme biriminin usulü hakkında görüş bildiriyorsun. Yazıdaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "An das Landesarchiv, Bildprüfstelle",
              body: `Sehr geehrte Frau Lindqvist,

{{1}} auf Ihre Vorstellung der Bildprüfstelle vom 12. Dezember übersende ich Ihnen fristgerecht eine Rückmeldung.

Vorab: Die Trennung von technischer und inhaltlicher Prüfung halte ich für richtig. Meine Anmerkungen richten sich {{2}} gegen das Verfahren, sondern gegen zwei Einzelheiten.

Erstens werden private Anfragen {{3}} zurückgewiesen, obwohl die drei zugelassenen Prüfstellen nach meiner Erfahrung überlastet sind. Wartezeiten von acht Wochen sind dort keine Ausnahme.

Zweitens ist das Ergebnis „ungeklärt" im Entwurf {{4}} erläutert, um von Redaktionen richtig verstanden zu werden. In der Praxis wird es regelmäßig als Freigabe gelesen.

Ich rege {{5}} an, für den Befund „ungeklärt" eine kurze Erläuterung vorzusehen und die Kapazität der zugelassenen Stellen {{6}} zu überprüfen.

Meine eigene Redaktion setzt {{7}} 2013 unter jedes Aufmacherbild eine Kontextzeile. Ich stelle Ihnen die Formulierungen gern zur Verfügung.

Für Rückfragen stehe ich Ihnen {{8}} zur Verfügung. Über eine Eingangsbestätigung {{9}} zum 15. Januar wäre ich Ihnen verbunden.

Mit freundlichen Grüßen
Vera {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-12-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf eine Veranstaltung)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Yazı bir tanıtım toplantısına gönderme yaparak açılıyor ve cümle `auf` ile sürüyor; buraya `Bezugnehmend` ya da ayrık yazımıyla `Bezug nehmend` girer.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung vor „sondern“)",
              accept: ["nicht"],
              explain:
                "Cümle `sondern` ile devam ediyor; bu bağlaç kendinden önce bir olumsuzlama ister — itiraz usulün kendisine değil, iki ayrıntıya yönelik.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-3",
              no: 3,
              text: "Lücke 3 (Ausnahmslosigkeit)",
              accept: ["ausnahmslos", "grundsätzlich", "generell"],
              explain:
                "Sonraki `obwohl` cümlesi bir gerekçe sunuyor; ondan önce reddin istisnasız olduğunu belirten bir belirteç gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-4",
              no: 4,
              text: "Lücke 4 (Vergleich mit „um … zu“)",
              accept: ["zu"],
              explain:
                "`zu knapp erläutert, um … verstanden zu werden` yapısı gerekiyor: açıklama, redaksiyonların doğru anlamasına yetecek kadar ayrıntılı değil.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-5",
              no: 5,
              text: "Lücke 5 (Folgerung im Mittelfeld)",
              accept: ["daher", "deshalb", "folglich"],
              explain:
                "Açıkça sıralanan iki noktadan (\"Erstens … Zweitens …\") sonra öneri geliyor; bu belirteç çıkarımı taşır ve `anregen` fiilinin ardında durur.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-6",
              no: 6,
              text: "Lücke 6 (Wiederholung einer Prüfung)",
              accept: ["erneut", "nochmals", "regelmäßig"],
              explain:
                "Kapasitenin bir kez daha gözden geçirilmesi isteniyor; `überprüfen` fiili bu tekrarı bildiren bir belirteçle tamamlanır.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-7",
              no: 7,
              text: "Lücke 7 (Beginn eines andauernden Zustands)",
              accept: ["seit"],
              explain:
                "Uygulama bugün hâlâ sürdüğü için başlangıcı `seit` ile verilir: \"setzt seit 2013 … eine Kontextzeile\". `ab` geleceğe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-8",
              no: 8,
              text: "Lücke 8 (Bereitwilligkeit)",
              accept: ["gern", "jederzeit", "selbstverständlich"],
              explain:
                "Kapanış kalıbı `zur Verfügung stehen` burada bir isteklilik belirteciyle yumuşatılıyor; kalıbın kendisi değişmiyor, önüne bir sözcük geliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-9",
              no: 9,
              text: "Lücke 9 (Frist)",
              accept: ["bis"],
              explain:
                "Arşivin kendi verdiği son tarih yineleniyor: `bis zum 15. Januar`. `ab` süreyi başlatır, `seit` geçmişe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-12-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname der Absenderin)",
              accept: ["Baumert"],
              explain:
                "Yazan kişi panelde konuşan görüntü editörüyle aynı: on yedi yıl fotoğraf seçen Vera Baumert.",
            },
          ],
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und gemeinsam eine Entscheidung treffen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve birlikte karar vermek.",
      tasks: [
        {
          id: "de-c1-12-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Was beweist ein Bild?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Bir görüntü neyi kanıtlar?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "Begriffe klären", tr: "Kavramları açmak" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "eigene Position mit Einwand", tr: "Kendi konumun ve ona itiraz" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte darüber sprechen, was ein Bild beweist. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Beweis meine ich hier zweierlei, und die Verwechslung der beiden erzeugt den ganzen Streit: den Nachweis, dass etwas vor der Linse war, und den Nachweis, was es bedeutet. Für die Verlässlichkeit von Bildern spricht, dass sie festhalten, was keine Erinnerung so genau behält. In der Aufarbeitung von Unfällen ist eine Aufnahme regelmäßig genauer als fünf Aussagen. Dagegen spricht, dass jedes Bild einen Rahmen hat und dass dieser Rahmen gewählt wurde. Aus derselben Serie einer Demonstration lassen sich zwei Bilder auswählen, die einander widersprechen, und beide sind unbearbeitet. Meine Position ist deshalb, dass ein Bild wie eine Zeugenaussage zu behandeln ist: Herkunft, Zeitpunkt, Umstände. Der Einwand dagegen wiegt schwer — wer so argumentiert, kann am Ende jeden Beleg relativieren, und im Zweifel nutzt das dem, der etwas zu verbergen hat. Ich halte die Position gleichwohl, weil wir Zeugen ja auch nicht abschaffen, sondern befragen. Zusammenfassend: Ein Bild ist kein schlechterer Beleg als eine Aussage. Es ist nur einer, dem man seine Auswahl nicht ansieht.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı — iki kanıt türü ayrıldı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-12-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Redaktion hat Mittel für eine Maßnahme und muss vier Fragen klären: technische Prüfsoftware oder eine zusätzliche Stelle? Kontextzeile unter jedem Bild oder nur bei Aufmachern? Verpflichtend oder freiwillig? Was geschieht bei ungeklärten Fällen? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir yazı işlerinin tek bir önlem için kaynağı var ve dört soruyu çözmesi gerekiyor: teknik inceleme yazılımı mı, ek bir kadro mu? Bağlam satırı her fotoğrafın altında mı, yalnız manşetlerde mi? Zorunlu mu, gönüllü mü? Belirsiz kalan vakalarda ne olacak? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne: Ich wäre für die Prüfsoftware. Sie arbeitet rund um die Uhr und kostet einmalig. Was meinen Sie?",
              tr: "Ben başlayayım: İnceleme yazılımından yanayım. Yirmi dört saat çalışıyor ve tek seferlik maliyeti var. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'tek seferlik maliyet' gerekçesini doğrudan ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zur Kontextzeile: Unter jedem Bild ist unrealistisch, wir drucken vierzig am Tag. Nur bei Aufmachern wirkt willkürlich. Wie lösen Sie das?",
              tr: "Bağlam satırı meselesi: Her fotoğrafın altında gerçekçi değil, günde kırk tane basıyoruz. Yalnız manşetlerde ise keyfî görünüyor. Bunu nasıl çözersin?",
            },
            {
              who: "you",
              hint: "Bir ölçüt öner ve keyfîlik itirazını karşıla.",
              expect: "bir ölçüt önermek ve keyfîlik itirazını karşılamak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Und wenn eine Prüfung ungeklärt endet? Dann steht die Redaktion vor dem Nichts.",
              tr: "Peki inceleme belirsiz sonuçlanırsa? O zaman yazı işleri elinde hiçbir şey olmadan kalıyor.",
            },
            {
              who: "you",
              hint: "Belirsizlikle nasıl çalışılacağını somut olarak söyle.",
              expect: "belirsiz bir sonuçla nasıl çalışılacağını somut olarak anlatmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben, einschließlich der Punkte, die offen bleiben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin — açık kalan noktalar da dâhil?",
            },
            {
              who: "you",
              hint: "Anlaşmayı ve açık kalanları eksiksiz özetle.",
              expect: "anlaşmayı ve açık kalan noktaları eksiksiz özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "eine Position begründen", tr: "Bir konumu gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "einen Kompromiss formulieren", tr: "Bir uzlaşı biçimlendirmek" },
              { de: "Ergebnis und offene Punkte zusammenfassen", tr: "Sonucu ve açık noktaları özetlemek" },
            ],
            sample:
              "Dass die Software einmalig kostet, stimmt und ist genau der Grund für meine Skepsis. Sie prüft die Datei, und die Datei ist selten das Problem: In der Statistik des Landesarchivs betraf die Fälschung vierzehn von siebenhundertvierzig Fällen, die falsche Zuordnung zweihundertsechs. Für diese zweihundertsechs braucht es jemanden, der weiß, wie eine Straße vor dreißig Jahren aussah. Ich bin deshalb für die Stelle. Zur Kontextzeile schlage ich ein Kriterium statt einer Quote vor: überall dort, wo das Bild eine Handlung zeigt, die sich anders deuten lässt. Das ist nachprüfbar und wirkt weniger willkürlich als eine Beschränkung auf Aufmacher. Bei ungeklärten Fällen würde ich das Wort ausschreiben, statt das Bild wegzulassen: eine Zeile, die sagt, was wir nicht wissen. Ein weggelassenes Bild erzeugt keine Vorsicht, es erzeugt nur eine Lücke. Zusammengefasst: eine zusätzliche Stelle statt Software, Kontextzeile nach Kriterium, ungeklärt sichtbar benennen. Offen bleibt ausdrücklich, wer das im Nachtdienst entscheidet — dafür haben wir bisher keine Regelung, und ich möchte das nicht durch eine optimistische Annahme verdecken.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Keyfîlik itirazına somut bir ölçüt getirildi mi?",
              "Belirsiz sonuçla çalışma yolu somut olarak anlatıldı mı?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, offenlegen)?",
            ],
          },
        },
      ],
    },
  ],
};

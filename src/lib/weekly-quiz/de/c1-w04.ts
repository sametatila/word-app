import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 4 · Teknik ve sorumluluk.
 *
 * ÖLÇÜLEN ŞEY: sorumluluğun dilde nasıl gizlendiğini görmek. Edilgen çatı
 * bir eylemi FAİLSİZ anlatabiliyor ("Fehler wurden gemacht") ve bu bir
 * dilbilgisi ayrıntısı değil, bir retorik araç. C1 okuru bunu fark
 * edebilmeli; maddeler tam olarak bunu yokluyor.
 *
 * `w04-r2` ve `w04-g1` birlikte çalışıyor: biri metinde failin silindiğini
 * FARK ETTİRİYOR, öteki aynı yapıyı KURDURUYOR. Tanıma ile üretim aynı
 * haftada, aynı hedefte.
 *
 * ARALIKLI TEKRAR: `w04-g2` W1'in Konjunktiv I hedefine dönüyor; `w04-v1`
 * W2'nin işlev fiili öbeklerini üçüncü bir örnekle yokluyor.
 */
export const DE_C1_W04: QuizWeek = {
  id: "de-c1-w04",
  course: "de",
  level: "C1",
  no: 4,
  theme: "Technik und Verantwortung",
  themeTr: "Teknik ve sorumluluk",
  canDo: ["C1.RD.4", "C1.LS.4", "C1.GR.4", "C1.WR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Bericht",
      genreTr: "Haber analizi",
      title: "Wenn niemand entschieden haben will",
      body:
        "Nach dem Ausfall des Buchungssystems hieß es zunächst, es seien Fehler gemacht worden. " +
        "Wer sie gemacht hat, wurde in der Mitteilung nicht erwähnt. Diese Form der Darstellung ist verbreitet: " +
        "Das Passiv erlaubt es, ein Ereignis zu schildern, ohne einen Verantwortlichen zu nennen.\n\n" +
        "Technisch lag die Ursache in einer Aktualisierung, die am Freitagabend eingespielt worden war. " +
        "Sie hätte vorher getestet werden müssen, doch der dafür vorgesehene Schritt wurde übersprungen. " +
        "Ob das aus Zeitdruck geschah oder weil niemand sich zuständig fühlte, ist bis heute unklar.\n\n" +
        "Fachleute weisen indes darauf hin, dass die eigentliche Schwäche tiefer liegt. " +
        "Ein System, dessen Ausfall Tausende betrifft, darf nicht von einer einzigen unbemerkten Änderung " +
        "abhängig sein — zumal Warnungen davor seit Jahren vorliegen.\n\n" +
        "Verantwortung lässt sich nicht an die Technik abgeben. Sie muss zugewiesen werden, " +
        "und zwar bevor etwas ausfällt.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Podcast",
      genreTr: "Söyleşi programı",
      plays: 2,
      segments: [
        { speaker: "Host", text: "Herr Vogel, war das ein technisches oder ein organisatorisches Versagen?" },
        { speaker: "Vogel", text: "Technisch war es banal. Organisatorisch war es das eigentliche Problem." },
        { speaker: "Host", text: "Das müssen Sie erklären." },
        { speaker: "Vogel", text: "Der Test war vorgesehen. Nur war nicht festgelegt, wer ihn durchführt." },
        { speaker: "Host", text: "Also ein Zuständigkeitsproblem." },
        { speaker: "Vogel", text: "Genau. Und solche Lücken fallen erst auf, wenn etwas schiefgeht." },
        { speaker: "Host", text: "Wurde daraus gelernt?" },
        { speaker: "Vogel", text: "Teilweise. Die Regel steht jetzt auf dem Papier. Ob sie gelebt wird, sehen wir beim nächsten Mal." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-c1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Was war die technische Ursache des Ausfalls?",
      options: [
        "Ein gezielter Angriff von außen auf das Buchungssystem",
        "Eine nicht getestete Aktualisierung",
        "Ein längerer Stromausfall am Freitagabend",
        "Eine ungewöhnlich hohe Zahl gleichzeitiger Buchungen",
      ],
      answer: 1,
      why: "\"Technisch lag die Ursache in einer Aktualisierung … Sie hätte vorher getestet werden müssen, doch der … Schritt wurde übersprungen.\" Cuma akşamı güncellemenin ZAMANI, sebebi değil.",
      targets: ["lesen.detail", "argumentation.ursache"],
    },
    {
      id: "de-c1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Warum nennt der Text die Formulierung „es seien Fehler gemacht worden\" bemerkenswert?",
      options: [
        "Weil sie grammatisch fehlerhaft gebildet worden ist",
        "Weil sie das Ereignis ohne Verantwortlichen schildert",
        "Weil sie den Umfang des Ausfalls deutlich verharmlost",
        "Weil sie für Leser ohne Fachkenntnis zu technisch ist",
      ],
      answer: 1,
      why: "Metin bunu doğrudan söylüyor: \"Das Passiv erlaubt es, ein Ereignis zu schildern, ohne einen Verantwortlichen zu nennen.\" Yani eleştiri dil bilgisine değil, edilgen çatının FAİLİ SİLME imkânına yönelik.",
      targets: ["lesen.sprachkritik", "passiv"],
    },
    {
      id: "de-c1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Worin sehen die Fachleute die eigentliche Schwäche?",
      options: [
        "In der seit Jahren nicht erneuerten Software des Hauses",
        "In der Abhängigkeit von einer einzigen unbemerkten Änderung",
        "Im Zeitdruck, unter dem die Beschäftigten seit Monaten stehen",
        "In der verspäteten Mitteilung an die betroffenen Kunden",
      ],
      answer: 1,
      why: "\"Ein System, dessen Ausfall Tausende betrifft, darf nicht von einer einzigen unbemerkten Änderung abhängig sein.\" Zaman baskısı metinde olası bir sebep olarak anılıyor ama uzmanların işaret ettiği yer yapısal.",
      targets: ["lesen.differenzierung", "genitiv"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-c1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Wie ordnet Herr Vogel das Versagen ein?",
      options: [
        "Als rein technisches Problem ohne weitere Bedeutung",
        "Als technisch banal, organisatorisch schwerwiegend",
        "Als unvermeidbaren Einzelfall ohne strukturelle Ursache",
        "Als unmittelbare Folge eines Angriffs von außen",
      ],
      answer: 1,
      why: "\"Technisch war es banal. Organisatorisch war es das eigentliche Problem.\" İki cümle bir karşıtlık kuruyor ve ağırlık ikincisinde — `eigentlich` tam olarak bunu işaretliyor.",
      targets: ["hoeren.haltung", "konnektor.gegensatz"],
    },
    {
      id: "de-c1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "Was genau fehlte laut Vogel?",
      options: [
        "Der Test war von Anfang an gar nicht vorgesehen",
        "Es gab keine geeignete Software für den Test",
        "Der Test wurde durchgeführt, aber falsch ausgewertet",
        "Es war nicht festgelegt, wer den Test durchführt",
      ],
      answer: 3,
      why: "\"Der Test war vorgesehen. Nur war nicht festgelegt, wer ihn durchführt.\" İlk cümle testin planlandığını söylüyor; eksik olan plan değil, SORUMLU. `nur` bu düzeltmeyi işaretliyor.",
      targets: ["hoeren.detail", "hoeren.korrektur"],
    },
    {
      id: "de-c1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie beurteilt Vogel die gezogene Lehre?",
      options: [
        "Die Lehre ist vollständig umgesetzt und überprüft",
        "Der Versuch ist aus seiner Sicht gescheitert",
        "Zurückhaltend: Regel ja, Praxis noch offen",
        "Eine Lehre war aus seiner Sicht nicht nötig",
      ],
      answer: 2,
      why: "\"Die Regel steht jetzt auf dem Papier. Ob sie gelebt wird, sehen wir beim nächsten Mal.\" `auf dem Papier` ile `gelebt` arasındaki karşıtlık, temkinli bir değerlendirme kuruyor — ne onay ne ret.",
      targets: ["hoeren.haltung", "redewendung"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-c1-w04-g1",
      block: "grammar",
      stem: "Die Aktualisierung ___ vorher getestet werden ___.",
      options: ["hätte … müssen", "hätte … gemusst", "wäre … müssen", "würde … müssen"],
      answer: 0,
      why: "Modal fiille kurulan edilgen, geçmişe dönük gerçek dışılıkta `hätte + Infinitiv + Modalinfinitiv` alır: `hätte getestet werden müssen`. Modal fiil bu yapıda Partizip (`gemusst`) olmaz — buna Ersatzinfinitiv denir.",
      targets: ["passiv.modal", "konjunktiv2.irreal"],
      byNative: {
        en: {
          options: ["hätte … müssen", "hätte … gemusst", "wäre … müssen", "würde … müssen"],
          answer: 0,
          why: "İngilizcede `should have been tested` üç parçayla kurulur ve modal başta durur. Almancada modal SONA gider ve mastar hâlinde kalır; `gemusst` sezgisi İngilizcedeki `-ed` beklentisinden geliyor.",
        },
      },
    },
    {
      id: "de-c1-w04-g2",
      block: "grammar",
      stem: "In der Mitteilung hieß es, es ___ Fehler gemacht worden.",
      options: ["sind", "waren", "seien", "wären"],
      answer: 2,
      why: "Aktarımda Konjunktiv I kullanılır ve çoğul `sein` için ayırt edici biçim vardır: `seien`. `wären` Konjunktiv II'dir ve burada gereksiz bir mesafe/şüphe katar; Indikativ ise aktarımı kaldırır.",
      targets: ["konjunktiv1.indirekte-rede", "passiv"],
      byNative: {
        tr: {
          options: ["sind", "waren", "seien", "wären"],
          answer: 2,
          why: "Türkçede aktarım `-miş` ile yapılır ve bu kanıtsallık eki bazen şüphe de katar; o çağrışımla `wären` seçiliyor. Almancada tarafsız aktarım Konjunktiv I ister: `seien`.",
        },
      },
    },
    {
      id: "de-c1-w04-g3",
      block: "grammar",
      stem: "Fachleute weisen ___ darauf hin, dass die Schwäche tiefer liegt.",
      options: ["indes", "indem", "seitdem", "nachdem"],
      answer: 0,
      why: "`indes` yazı dilinde bir karşıtlık bağlayıcısıdır: buna karşılık. `indem` araç, `seitdem` ve `nachdem` zaman bildirir ve üçü de yan cümle kurar — cümlede yan cümle yok, ara söz var.",
      targets: ["konnektor.indes", "konnektor.gegensatz"],
    },
    {
      id: "de-c1-w04-g4",
      block: "grammar",
      stem: "Ein System, ___ Ausfall Tausende betrifft, darf nicht so gebaut sein.",
      options: ["das", "deren", "welchem", "dessen"],
      answer: 3,
      why: "İlgi cümlesinde `Ausfall` sistemin arızası, yani iyelik ilişkisi var: nötr `System` için Genitiv ilgi zamiri `dessen`. `deren` dişil ve çoğul içindir.",
      targets: ["relativsatz.genitiv", "genitiv"],
    },
    {
      id: "de-c1-w04-g5",
      block: "grammar",
      stem: "Verantwortung lässt sich nicht abgeben. Sie muss ___.",
      options: ["zuweisen", "zugewiesen werden", "zuzuweisen", "zuweisend gewesen sein"],
      answer: 1,
      why: "Özne (`sie` = Verantwortung) eylemi yapan değil, eyleme uğrayan. O yüzden modal fiil edilgen mastar ister: `zugewiesen werden`. Etken mastar sorumluluğun kendisini fail yapardı.",
      targets: ["passiv.modal", "passiv"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-c1-w04-v1",
      block: "vocab",
      stem: "Warnungen davor ___ seit Jahren vor.",
      options: ["liegen", "stehen", "kommen", "gehen"],
      answer: 0,
      why: "`vorliegen` bir belgenin ya da bulgunun mevcut olması demek ve yerleşik bir öbektir. Öteki üç fiil `vor` önekiyle başka anlamlar kurar (vorstehen, vorkommen, vorgehen) ve hiçbiri 'elde mevcut' anlamına gelmez.",
      targets: ["verb.vorliegen", "funktionsverbgefuege"],
    },
    {
      id: "de-c1-w04-v2",
      block: "vocab",
      stem: "Der dafür vorgesehene Schritt wurde ___.",
      options: ["übergeben", "überzeugt", "übersprungen", "überschritten"],
      answer: 2,
      why: "`überspringen` bir adımı atlamak demek. Öteki üçü de `über-` önekli gerçek fiiller ama bambaşka alanlara ait: teslim etmek, ikna etmek, aşmak. Önek benzerliği anlam yakınlığı değildir.",
      targets: ["verb.ueberspringen", "wortbildung.praefix"],
    },
    {
      id: "de-c1-w04-v3",
      block: "vocab",
      stem: "Die Regel steht jetzt auf dem ___.",
      options: ["Papier", "Blatt", "Zettel", "Buch"],
      answer: 0,
      why: "`auf dem Papier stehen` deyimi bir kuralın yazılı olduğunu ama uygulanmadığını ima eder. Deyim sabittir: `Blatt` ya da `Zettel` fiziksel kâğıdı anlatır, bu ikinci anlamı taşımaz.",
      targets: ["redewendung", "praeposition.feste-wendung"],
    },
  ],
};

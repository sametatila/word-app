import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 5 · Transfer.
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün hedefleri yeni bağlamlarda ve yeni metin
 * türlerinde soruluyor: köşe yazısı, arka plan yazısı, deneme ve haber
 * analizinden sonra bu hafta bir OKUR MEKTUBU ve bir toplantı tutanağı —
 * ikisi de savunma ve itiraz dili taşıyan, kişisel tonu olan türler.
 *
 * C1'DE TRANSFERİN ANLAMI: alt seviyelerde aynı kuralı başka bir cümlede
 * sormak yetiyordu. Burada kural aynı ama METNİN AMACI değişiyor — okur
 * mektubunda Konjunktiv I aktarım değil, MESAFE koymak için kullanılıyor
 * ("angeblich"). Aynı biçim, başka iş.
 *
 * Hiçbir madde yeni bir kural getirmiyor; yeni olan bağlam ve işlev.
 */
export const DE_C1_W05: QuizWeek = {
  id: "de-c1-w05",
  course: "de",
  level: "C1",
  no: 5,
  theme: "Einspruch und Abwägung",
  themeTr: "Transfer — itiraz ve tartma",
  canDo: ["C1.RD.1", "C1.LS.2", "C1.GR.2", "C1.WR.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Leserbrief",
      genreTr: "Okur mektubu",
      title: "Zu Ihrem Beitrag über die neue Gebühr",
      body:
        "In Ihrem Beitrag heißt es, die Gebühr sei mit den Betroffenen abgestimmt worden. " +
        "Das trifft so nicht zu. Eingeladen wurden drei Verbände; gehört wurde am Ende einer.\n\n" +
        "Ich räume ein, dass die Stadt unter Druck steht und dass die Kosten irgendwo gedeckt werden müssen. " +
        "Dennoch wäre eine gestaffelte Lösung möglich gewesen, wie sie andernorts längst praktiziert wird. " +
        "Hätte man die Vorschläge der Verbände geprüft, stünde heute ein tragfähigeres Modell zur Debatte.\n\n" +
        "Mich stört indes weniger die Höhe der Gebühr als die Darstellung des Verfahrens. " +
        "Ein Beschluss, dessen Zustandekommen nicht offengelegt wird, verliert an Rückhalt — " +
        "zumal gerade in einer Frage, die alle Haushalte betrifft.\n\n" +
        "Eine Richtigstellung wäre angebracht.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Sitzung",
      genreTr: "Toplantı",
      plays: 2,
      segments: [
        { speaker: "Vorsitz", text: "Der Vorwurf lautet, das Verfahren sei intransparent gewesen. Frau Roth?" },
        { speaker: "Roth", text: "Formal war alles korrekt. Das bestreitet auch niemand." },
        { speaker: "Vorsitz", text: "Der Leserbrief bestreitet es aber sehr wohl." },
        { speaker: "Roth", text: "Er bestreitet die Wirkung, nicht die Form. Das ist ein Unterschied." },
        { speaker: "Vorsitz", text: "Ein Unterschied, der draußen niemanden interessiert." },
        { speaker: "Roth", text: "Zugegeben. Wir hätten früher erklären müssen, warum nur ein Verband gehört wurde." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-c1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Was wirft der Verfasser dem Beitrag vor?",
      options: [
        "Die Gebühr sei zu hoch angesetzt",
        "Die Darstellung des Verfahrens sei unzutreffend",
        "Die Stadt habe gar keine Kosten",
        "Andere Städte hätten dieselbe Lösung",
      ],
      answer: 1,
      why: "\"Mich stört indes weniger die Höhe der Gebühr als die Darstellung des Verfahrens.\" `weniger … als` bir öncelik sıralaması kuruyor: itiraz tutara değil, sürecin anlatılışına.",
      targets: ["lesen.differenzierung", "syntax.weniger-als"],
    },
    {
      id: "de-c1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Was räumt der Verfasser selbst ein?",
      options: [
        "Dass die Verbände nicht eingeladen waren",
        "Dass die Stadt unter Druck steht und Kosten gedeckt werden müssen",
        "Dass eine gestaffelte Lösung unmöglich ist",
        "Dass der Beschluss offengelegt wurde",
      ],
      answer: 1,
      why: "\"Ich räume ein, dass die Stadt unter Druck steht …\" C1 argümantasyonunda `einräumen` bir taktiktir: karşı tarafın haklı yanını kabul etmek, kendi itirazını güçlendirir. Kabul edilen şey itirazın kendisi değildir.",
      targets: ["verb.einraeumen", "argumentation.konzession"],
    },
    {
      id: "de-c1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Was wäre laut Verfasser bei Prüfung der Vorschläge anders?",
      options: [
        "Es stünde ein tragfähigeres Modell zur Debatte",
        "Die Gebühr wäre abgeschafft",
        "Die Verbände hätten geklagt",
        "Die Stadt hätte keine Kosten mehr",
      ],
      answer: 0,
      why: "\"Hätte man die Vorschläge geprüft, stünde heute ein tragfähigeres Modell zur Debatte.\" Bağlaçsız gerçek dışı koşul; ana cümle de Konjunktiv II ile kuruluyor ve olmamış bir bugünü anlatıyor.",
      targets: ["konjunktiv2.irreal", "syntax.konditional-ohne-wenn"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-c1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Wie verteidigt Frau Roth das Verfahren zunächst?",
      options: [
        "Sie bestreitet den Vorwurf vollständig",
        "Sie verweist darauf, dass formal alles korrekt war",
        "Sie gibt dem Leserbrief recht",
        "Sie verschiebt die Antwort",
      ],
      answer: 1,
      why: "\"Formal war alles korrekt.\" `formal` savunmayı daraltıyor: yalnız biçim savunuluyor, sonuç değil. Bu daraltma C1'de bir konumun tamamını değil sınırını gösterir.",
      targets: ["hoeren.haltung", "argumentation.einschraenkung"],
    },
    {
      id: "de-c1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Worin besteht der Unterschied, auf den Frau Roth besteht?",
      options: [
        "Zwischen Form und Wirkung des Verfahrens",
        "Zwischen Stadt und Verbänden",
        "Zwischen Kosten und Gebühr",
        "Zwischen Presse und Sitzung",
      ],
      answer: 0,
      why: "\"Er bestreitet die Wirkung, nicht die Form.\" Roth itirazın hedefini yeniden tanımlıyor — tartışmayı kazanmak değil, sınırlandırmak için. Başkanın cevabı (`der draußen niemanden interessiert`) bu ayrımın işe yaramadığını söylüyor.",
      targets: ["hoeren.argument", "argumentation.unterscheidung"],
    },
    {
      id: "de-c1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie endet Frau Roths Beitrag?",
      options: [
        "Mit einem Rücktritt",
        "Mit einer Zurückweisung des Vorwurfs",
        "Mit dem Eingeständnis, zu spät erklärt zu haben",
        "Mit der Ankündigung einer Klage",
      ],
      answer: 2,
      why: "\"Zugegeben. Wir hätten früher erklären müssen …\" `zugegeben` ve ardından gelen gerçek dışı geçmiş birlikte bir kabul kuruyor: yapılmamış olan söyleniyor.",
      targets: ["hoeren.konsens", "konjunktiv2.irreal"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-c1-w05-g1",
      block: "grammar",
      stem: "In Ihrem Beitrag heißt es, die Gebühr ___ abgestimmt worden.",
      options: ["ist", "sei", "wäre", "war"],
      answer: 1,
      why: "Aktarımda Konjunktiv I: `sei`. Burada ek bir işlev daha var — yazar aktardığı iddiadan MESAFE alıyor ve hemen ardından onu çürütüyor (`Das trifft so nicht zu`). Indikativ kullansaydı iddiayı sahiplenmiş olurdu.",
      targets: ["konjunktiv1.indirekte-rede", "pragmatik.distanz"],
      byNative: {
        tr: {
          options: ["ist", "sei", "wäre", "war"],
          answer: 1,
          why: "Türkçede bu mesafe `-miş` ile kurulur ('uzlaşılmış') ve aynı zamanda şüphe katar. Almancada tarafsız aktarım Konjunktiv I (`sei`), şüphe katmak istenirse Konjunktiv II (`wäre`) — burada istenen birincisi.",
        },
        en: {
          options: ["ist", "sei", "wäre", "war"],
          answer: 1,
          why: "İngilizcede bu mesafe `reportedly`/`is said to` gibi sözcüklerle kurulur, kip değişmez. O yüzden Indikativ `ist` doğal görünüyor; Almancada mesafeyi kipin kendisi taşıyor.",
        },
      },
    },
    {
      id: "de-c1-w05-g2",
      block: "grammar",
      stem: "Eine gestaffelte Lösung ___ möglich gewesen.",
      options: ["hätte", "wäre", "würde", "sollte"],
      answer: 1,
      why: "`möglich sein` yapısı `sein` fiiliyle kurulur, yani geçmişe dönük gerçek dışılıkta `wäre … gewesen` olur. `hätte` yalnız `haben` ile çekilen fiillerde gelir ve burada yardımcı fiil `sein`.",
      targets: ["konjunktiv2.irreal", "hilfsverb.sein-haben"],
    },
    {
      id: "de-c1-w05-g3",
      block: "grammar",
      stem: "Ein Beschluss, ___ Zustandekommen nicht offengelegt wird, verliert an Rückhalt.",
      options: ["der", "den", "dessen", "dem"],
      answer: 2,
      why: "`Zustandekommen` kararın oluşumu — iyelik ilişkisi. Eril `Beschluss` için Genitiv ilgi zamiri `dessen`. W4'te aynı yapı nötr bir isimle sorulmuştu; biçim değişmiyor, cinsiyet değişiyor.",
      targets: ["relativsatz.genitiv", "genitiv"],
    },
    {
      id: "de-c1-w05-g4",
      block: "grammar",
      stem: "Mich stört ___ weniger die Höhe ___ die Darstellung.",
      options: ["sowohl … als auch", "weder … noch", "nicht … sondern", "zwar … aber"],
      answer: 2,
      why: "`weniger … als` yapısı zaten bir karşılaştırma kuruyor; boşluklara gelen çift bağlaç de aynı yönde olmalı: birini eleyip ötekini öne çıkaran `nicht … sondern`. Öteki üçü iki öğeyi eşitler ya da ikisini birden dışlar.",
      targets: ["syntax.nicht-sondern", "konnektor.doppelt"],
    },
    {
      id: "de-c1-w05-g5",
      block: "grammar",
      stem: "Eine gestaffelte Lösung, wie sie andernorts längst ___ wird.",
      options: ["praktiziert", "praktizierend", "zu praktizieren", "praktizieren"],
      answer: 0,
      why: "`wird` + Partizip II edilgen kurar: uygulanıyor. Ortaç (`praktizierend`) etken niteleme, `zu`lu biçim ise gereklilik bildirir — ikisi de cümlenin edilgen yapısına girmez.",
      targets: ["passiv", "partizipialattribut"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-c1-w05-v1",
      block: "vocab",
      stem: "Das ___ so nicht zu.",
      options: ["gilt", "trifft", "gehört", "steht"],
      answer: 1,
      why: "`zutreffen` bir ifadenin doğru olması demek ve `zu-` önekiyle bir bütündür. `gelten` geçerlilik, `gehören` aidiyet bildirir; ikisi de doğruluk yargısı taşımaz.",
      targets: ["verb.zutreffen", "wortfeld.argumentation"],
    },
    {
      id: "de-c1-w05-v2",
      block: "vocab",
      stem: "Ein Beschluss ohne offenes Verfahren verliert ___ Rückhalt.",
      options: ["an", "auf", "über", "für"],
      answer: 0,
      why: "`an etwas verlieren` bir niteliğin azalmasını anlatır: destek kaybetmek. Edat sabittir ve tek tek anlamlardan çıkarılamaz — `verlieren` doğrudan nesne aldığında ise başka bir anlam kurar (bir şeyi yitirmek).",
      targets: ["praeposition.feste-wendung", "verb.verlieren"],
    },
    {
      id: "de-c1-w05-v3",
      block: "vocab",
      stem: "Eine Richtigstellung wäre ___.",
      options: ["angebracht", "angekommen", "angeboten", "angenommen"],
      answer: 0,
      why: "`angebracht sein` yerinde/uygun olmak demek. Öteki üçü de `an-` önekli gerçek ortaçlar ama başka anlamlar taşır: varmak, sunmak, kabul etmek. Önek ortaklığı anlam ortaklığı değildir.",
      targets: ["adjektiv.angebracht", "wortbildung.praefix"],
    },
  ],
};

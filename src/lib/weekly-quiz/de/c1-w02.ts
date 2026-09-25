import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 2 · Değişen çalışma hayatı.
 *
 * ÖLÇÜLEN ŞEY: iki tarafın da haklı olduğu bir tartışmayı izlemek ve üslubun
 * taşıyıcılarını seçmek — işlev fiili öbekleri (`zur Verfügung stellen`,
 * `in Kauf nehmen`), `-bar` ile edilgen karşılığı ve kip parçacıkları.
 *
 * MODALPARTIKEL BU HAFTANIN ÖZEL MADDESİ (`w02-g4`). Almancanın en görünmez
 * katmanı: cümlenin anlamını değil TUTUMUNU taşıyor. İngilizcede karşılığı
 * hiç yok — o yüzden İngiliz öğrenci parçacığı atlıyor ya da bir bağlaçla
 * karşılamaya çalışıyor. Türkçede ise var ("ya", "işte", "canım") ve bu bir
 * avantaj değil ayrı bir tuzak: eşleşme birebir olmadığı için yanlış
 * parçacık seçiliyor.
 *
 * ARALIKLI TEKRAR: `w02-g2` W1'in `passiversatz` hedefine bu kez `-bar`
 * üzerinden dönüyor; `w02-v3` işlev fiili öbeğini ikinci bir örnekle yokluyor.
 */
export const DE_C1_W02: QuizWeek = {
  id: "de-c1-w02",
  course: "de",
  level: "C1",
  no: 2,
  theme: "Arbeit im Wandel",
  themeTr: "Değişen çalışma hayatı",
  canDo: ["C1.RD.2", "C1.LS.2", "C1.GR.2", "C1.SPK.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Hintergrundartikel",
      genreTr: "Arka plan yazısı",
      title: "Zu Hause arbeiten — für wen rechnet es sich?",
      body:
        "Die Zahl der Beschäftigten, die zumindest teilweise von zu Hause arbeiten, ist in wenigen Jahren stark gestiegen. " +
        "Viele Firmen stellen ihren Mitarbeitern inzwischen Technik zur Verfügung, die vor kurzem noch als Luxus galt.\n\n" +
        "Die Vorteile liegen auf der Hand: weniger Fahrzeit, mehr Ruhe, eine freiere Einteilung des Tages. " +
        "Doch die Rechnung geht nicht für alle auf. Wer zu Hause arbeitet, nimmt in Kauf, dass die Grenze " +
        "zwischen Arbeit und Freizeit unschärfer wird. Und wer selten im Büro ist, wird bei Beförderungen " +
        "leicht übersehen — ein Effekt, der sich schwer messen, aber kaum bestreiten lässt.\n\n" +
        "Gewerkschaften fordern deshalb klare Regeln. Erreichbarkeit nach Feierabend müsse freiwillig bleiben, " +
        "sagen sie; andernfalls werde aus Flexibilität schlicht längere Arbeitszeit.\n\n" +
        "Arbeitgeber halten dagegen, starre Vorgaben seien bei Kunden in mehreren Zeitzonen nicht durchführbar. " +
        "Beide Seiten haben recht — und genau deshalb ist die Frage bis heute ungelöst.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Betriebsgespräch",
      genreTr: "İş yeri konuşması",
      plays: 2,
      segments: [
        { speaker: "Yilmaz", text: "Sie wollen die Anwesenheitspflicht wieder einführen? Das ist doch ein Rückschritt." },
        { speaker: "Leitung", text: "Nicht ganz. Zwei feste Tage im Büro, den Rest entscheiden Sie selbst." },
        { speaker: "Yilmaz", text: "Und wenn jemand weiter weg wohnt?" },
        { speaker: "Leitung", text: "Dann suchen wir eine Lösung. Ausnahmen sind möglich, sie müssen nur begründet sein." },
        { speaker: "Yilmaz", text: "Das klingt vernünftig. Mich stört eher, dass die Entscheidung ohne uns gefallen ist." },
        { speaker: "Leitung", text: "Der Einwand ist berechtigt. Beim nächsten Mal binden wir das Team früher ein." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-c1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Welchen Nachteil nennt der Text für Beschäftigte im Homeoffice?",
      options: [
        "Sie verdienen weniger als ihre Kollegen",
        "Sie werden bei Beförderungen leichter übersehen",
        "Sie erhalten keine Technik von der Firma",
        "Sie dürfen ihren Tag nicht frei einteilen",
      ],
      answer: 1,
      why: "\"Wer selten im Büro ist, wird bei Beförderungen leicht übersehen.\" Teknik ve serbest zaman düzeni metinde AVANTAJ olarak geçiyor; maaş hiç anılmıyor. Metnin verdiği bilgiyi tersine çevirmemek gerekiyor.",
      targets: ["lesen.detail", "argumentation.nachteil"],
    },
    {
      id: "de-c1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Was fordern die Gewerkschaften?",
      options: [
        "Ein vollständiges Verbot von Homeoffice",
        "Höhere Löhne für Arbeit zu Hause",
        "Dass Erreichbarkeit nach Feierabend freiwillig bleibt",
        "Dass alle Firmen dieselben Zeitzonen nutzen",
      ],
      answer: 2,
      why: "Talep tek cümlede: `Erreichbarkeit nach Feierabend müsse freiwillig bleiben`. Konjunktiv I burada aktarımı işaretliyor — metin sendikanın sözünü aktarıyor, kendi görüşünü söylemiyor.",
      targets: ["lesen.detail", "konjunktiv1.indirekte-rede"],
    },
    {
      id: "de-c1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Wie bewertet der Text die Auseinandersetzung am Ende?",
      options: [
        "Beide Seiten haben teilweise recht, deshalb bleibt die Frage offen",
        "Die Arbeitgeber haben eindeutig recht",
        "Die Gewerkschaften setzen sich durch",
        "Die Frage ist längst entschieden",
      ],
      answer: 0,
      why: "\"Beide Seiten haben recht — und genau deshalb ist die Frage bis heute ungelöst.\" `genau deshalb` çözümsüzlüğün SEBEBİNİ iki tarafın da haklı olmasına bağlıyor; bu bir taraf tutma değil, bir teşhis.",
      targets: ["lesen.wertung", "konnektor.deshalb"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-c1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Was schlägt die Leitung vor?",
      options: [
        "Vollständige Rückkehr ins Büro",
        "Zwei feste Bürotage, der Rest frei wählbar",
        "Dauerhaftes Arbeiten von zu Hause",
        "Eine Entscheidung erst im nächsten Jahr",
      ],
      answer: 1,
      why: "\"Zwei feste Tage im Büro, den Rest entscheiden Sie selbst.\" Yilmaz'ın `Anwesenheitspflicht` sözü tam dönüşü ima ediyor ama yönetim bunu düzeltiyor — ilk söylenen değil, düzeltilmiş hâli geçerli.",
      targets: ["hoeren.detail", "hoeren.korrektur"],
    },
    {
      id: "de-c1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Was stört Yilmaz am meisten?",
      options: [
        "Die Zahl der Bürotage",
        "Die Entfernung zum Büro",
        "Dass Ausnahmen begründet werden müssen",
        "Dass die Entscheidung ohne das Team gefallen ist",
      ],
      answer: 3,
      why: "\"Mich stört eher, dass die Entscheidung ohne uns gefallen ist.\" `eher` bir düzeltme yapıyor: asıl itiraz kuralın İÇERİĞİ değil, kuruluş BİÇİMİ. C1'de bu kayma en sık kaçırılan şeydir.",
      targets: ["hoeren.haltung", "wortfeld.einwand"],
    },
    {
      id: "de-c1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie reagiert die Leitung auf diesen Einwand?",
      options: [
        "Sie weist ihn zurück",
        "Sie erkennt ihn an und sagt Beteiligung zu",
        "Sie verschiebt das Gespräch",
        "Sie droht mit Konsequenzen",
      ],
      answer: 1,
      why: "\"Der Einwand ist berechtigt. Beim nächsten Mal binden wir das Team früher ein.\" Önce kabul, sonra somut söz — bu iki adım birlikte 'anerkennen und zusagen' demek.",
      targets: ["hoeren.konsens", "verb.einraeumen"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-c1-w02-g1",
      block: "grammar",
      stem: "Die Firma ___ ihren Mitarbeitern moderne Technik zur Verfügung.",
      options: ["gibt", "stellt", "setzt", "bringt"],
      answer: 1,
      why: "`zur Verfügung stellen` yerleşik bir işlev fiili öbeğidir ve fiili değişmez. Öbeğin anlamı tek tek sözcüklerden türetilemez; `geben` ya da `bringen` anlamca yakın olsa da öbeği bozar.",
      targets: ["funktionsverbgefuege", "kollokation.verfuegung"],
      byNative: {
        en: {
          options: ["gibt", "stellt", "setzt", "bringt"],
          answer: 1,
          why: "İngilizcede `provide` ya da `make available` tek fiille kurulur, o yüzden `geben` sezgisel görünüyor. Almancada bu anlam sabit bir öbekle taşınır ve öbeğin fiili `stellen`.",
        },
      },
    },
    {
      id: "de-c1-w02-g2",
      block: "grammar",
      stem: "Starre Vorgaben sind bei Kunden in mehreren Zeitzonen nicht ___.",
      options: ["durchführbar", "durchgeführt", "durchzuführen gewesen", "durchführend"],
      answer: 0,
      why: "`-bar` eki edilgen bir YAPILABİLİRLİK bildirir: uygulanabilir değil. `durchgeführt` olup bitmiş bir eylemi, `durchführend` ise eylemi yapanı anlatır — ikisi de imkânı değil olguyu bildirir.",
      targets: ["passiversatz.bar", "passiversatz.sich-lassen"],
      byNative: {
        tr: {
          options: ["durchführbar", "durchgeführt", "durchzuführen gewesen", "durchführend"],
          answer: 0,
          why: "Türkçede imkân doğrudan fiile eklenir ('uygulanabilir'), yani ek arama sezgisi doğru; tuzak hangi ek olduğunda. Ortaç ekleri (`-t`, `-end`) olguyu bildirir, imkânı `-bar` taşır.",
        },
      },
    },
    {
      id: "de-c1-w02-g3",
      block: "grammar",
      stem: "Ein Effekt, der sich schwer messen, aber kaum ___ lässt.",
      options: ["bestreiten", "bestritten", "zu bestreiten", "bestreitend"],
      answer: 0,
      why: "`sich lassen` yapısı MASTAR ister ve cümlede iki mastar aynı yapıya bağlanıyor: `messen … lässt` ve `bestreiten … lässt`. Ortaç ya da `zu`lu biçim bu yapıya girmez.",
      targets: ["passiversatz.sich-lassen", "syntax.ellipse"],
    },
    {
      id: "de-c1-w02-g4",
      block: "grammar",
      stem: "Sie wollen die Anwesenheitspflicht wieder einführen? Das ist ___ ein Rückschritt.",
      options: ["ja", "doch", "wohl", "eben"],
      answer: 1,
      why: "`doch` burada bir itirazı işaretler: konuşan, karşı tarafın beklemediği bir şey söylediğini vurguluyor. `ja` bilinen bir şeyi, `wohl` tahmini, `eben` kaçınılmazlığı bildirir — dördü de dil bilgisel, ama tutumları başka.",
      targets: ["modalpartikel", "pragmatik.haltung"],
      byNative: {
        tr: {
          options: ["ja", "doch", "wohl", "eben"],
          answer: 1,
          why: "Türkçede de tutum parçacıkları var ('ya', 'işte', 'canım') ve bu bir avantaj değil ayrı bir tuzak: eşleşme birebir olmadığı için 'işte' sezgisiyle `eben` seçiliyor. İtiraz vurgusunu taşıyan parçacık `doch`.",
        },
        en: {
          options: ["ja", "doch", "wohl", "eben"],
          answer: 1,
          why: "İngilizcede kip parçacığı YOK; tutum tonlamayla ya da `surely`/`after all` gibi sözcüklerle taşınır. O yüzden parçacık ya atlanıyor ya da rastgele seçiliyor. İtirazı işaretleyen `doch`.",
        },
      },
    },
    {
      id: "de-c1-w02-g5",
      block: "grammar",
      stem: "___ die Regeln freiwillig bleiben, ist Flexibilität ein Gewinn.",
      options: ["Obwohl", "Sofern", "Zumal", "Indem"],
      answer: 1,
      why: "`sofern` koşul kurar: kurallar gönüllü KALDIĞI SÜRECE. `obwohl` karşıtlık, `zumal` ek gerekçe, `indem` araç bildirir — cümlenin ikinci yarısı bir sonuç olduğu için yalnız koşul anlamlı.",
      targets: ["konnektor.sofern", "konnektor.bedingung"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-c1-w02-v1",
      block: "vocab",
      stem: "Wer zu Hause arbeitet, ___ in Kauf, dass die Grenzen unschärfer werden.",
      options: ["nimmt", "gibt", "macht", "hält"],
      answer: 0,
      why: "`in Kauf nehmen` bir dezavantajı göze almak demek ve fiili sabittir. Öbek bir bütün olarak öğrenilir; `machen` ya da `geben` ile kurulan bir karşılığı yoktur.",
      targets: ["funktionsverbgefuege", "kollokation.inkauf"],
    },
    {
      id: "de-c1-w02-v2",
      block: "vocab",
      stem: "Die Arbeitgeber ___ dagegen, dass starre Regeln nicht funktionieren.",
      options: ["halten", "stellen", "setzen", "legen"],
      answer: 0,
      why: "`dagegenhalten` karşı argüman sunmak demek. Cümlede `dagegen` ayrı yazılmış ve gövde `halten` — öteki üç fiil `dagegen` ile bu anlamı kurmaz.",
      targets: ["verb.dagegenhalten", "wortfeld.argumentation"],
    },
    {
      id: "de-c1-w02-v3",
      block: "vocab",
      stem: "Die Vorteile liegen auf der ___.",
      options: ["Seite", "Stelle", "Hand", "Sicht"],
      answer: 2,
      why: "`auf der Hand liegen` apaçık olmak demek ve deyimin hiçbir parçası değiştirilemez. C1'de deyim bilgisi tam olarak bu: anlamı parçalarından çıkarılamayan birimi bütün olarak tanımak.",
      targets: ["redewendung", "praeposition.feste-wendung"],
    },
  ],
};

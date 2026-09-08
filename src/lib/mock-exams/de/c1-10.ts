import type { MockPaper } from "../types";

/**
 * C1 · Deneme 10 — "Nähe und Distanz".
 *
 * PLAN kâğıt 1–9 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (özet tamamlama 10 · deneme metni 10 · yapısal boşluk 5)
 *   Hören  40 dk · 25 madde   (not tamamlama 10 · panel 15)
 *   Schreiben 80 dk · 10 madde (görüş yazısı ~200 kelime + boşluklu resmî mektup 10)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: mesleki mesafe. C1'in ölçtüğü ayrım burada tek cümlede
 * duruyor: mesafe soğukluk değil, güvenilirliğin koşulu — ama aynı sözcük
 * hem koşulu hem de kayıtsızlığın örtüsünü adlandırıyor. Metinler bu iki
 * kullanımı birbirinden ayırmayı istiyor, birini savunmayı değil.
 *
 * ŞIK UZUNLUKLARI görev görev planlandı; çeldiriciler metnin kendi
 * sözcüklerinden besleniyor. Boşluklu mektubun açıklamaları bu kâğıdın
 * kendi cümlelerine bağlandı — c1-09'da iki açıklama c1-08'inkiyle birebir
 * aynı çıkmıştı.
 */
export const C1_10: MockPaper = {
  id: "de-c1-10",
  course: "de",
  level: "C1",
  no: 10,
  theme: "Nähe und Distanz",
  themeTr: "Yakınlık ve mesafe",
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
          id: "de-c1-10-l1",
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
              title: "Die Grenze, die trägt",
              body: `Professionelle Distanz gilt als Tugend der helfenden Berufe. Was damit gemeint ist, wird indes selten auseinandergehalten.

Im Ausbildungskontext bezeichnet der Begriff eine Fähigkeit: die Fähigkeit, ein Schicksal ernst zu nehmen, ohne es zum eigenen zu machen. Im Alltag der Einrichtungen bezeichnet dasselbe Wort mitunter etwas anderes — eine Erlaubnis, nicht hinzusehen. Zwei Bedeutungen unter einem Namen, und die zweite lebt von der Achtung, die der ersten gilt.

Der Unterschied lässt sich an einer Frage prüfen: Wem nützt die Grenze? Eine Grenze, die den Patienten vor der Willkür wechselnder Zuneigung schützt, ist professionell. Eine Grenze, die allein die Pflegekraft vor dem Anblick schützt, ist es nicht — sie ist verständlich, aber sie trägt keinen anderen.

Praktisch ist die Unterscheidung folgenreich. Wer Distanz als Fähigkeit begreift, verlangt Ausbildung, Reflexion und Zeit. Wer sie als Erlaubnis begreift, verlangt nichts; sie ist ohnehin schon da.

Die Forschung ist hier klarer, als die Debatte es vermuten lässt. Untersuchungen zur Belastung in der Pflege zeigen regelmäßig, dass nicht die Nähe erschöpft, sondern das Fehlen eines Rahmens, in dem über sie gesprochen werden kann. Supervision senkt die Erschöpfungswerte deutlicher als jede Verkürzung der Kontaktzeit.

Ein Einwand liegt nahe: Auch Supervision kostet Zeit, die im Dienstplan fehlt. Er ist berechtigt und lässt sich gleichwohl umdrehen, denn was ohne Rahmen entsteht, ist selten Distanz. Es ist Rückzug — und Rückzug kostet die Einrichtung mehr, nur später und in einer anderen Spalte.

Was daraus folgt, ist unbequem: Distanz ist keine Haltung, die man mitbringt, sondern eine Leistung, die organisiert werden muss.`,
              gloss: [
                { de: "die Willkür", tr: "keyfîlik", en: "arbitrariness" },
                { de: "die Zuneigung", tr: "yakınlık duyma", en: "affection" },
                { de: "die Supervision", tr: "meslekî danışmanlık oturumu", en: "professional supervision" },
                { de: "die Erschöpfung", tr: "tükenme", en: "exhaustion" },
                { de: "der Rückzug", tr: "geri çekilme", en: "withdrawal" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Professionelle Distanz gilt als {{1}} der helfenden Berufe, wird nach Ansicht des Autors aber selten auseinandergehalten.

In der Ausbildung meint der Begriff eine {{2}}: ein Schicksal ernst zu nehmen, ohne es zum eigenen zu machen. Im Alltag der Einrichtungen meint dasselbe Wort mitunter eine {{3}}, nicht hinzusehen.

Der Unterschied lässt sich an einer Frage prüfen: Wem {{4}} die Grenze? Schützt sie den Patienten vor wechselnder Zuneigung, ist sie professionell; schützt sie allein die {{5}} vor dem Anblick, ist sie es nicht.

Praktisch ist das folgenreich: Wer Distanz als Fähigkeit versteht, verlangt Ausbildung, {{6}} und Zeit; wer sie als Erlaubnis versteht, verlangt nichts.

Die Forschung zeigt, dass nicht die Nähe erschöpft, sondern das Fehlen eines {{7}}, in dem über sie gesprochen werden kann. {{8}} senkt die Erschöpfungswerte stärker als eine kürzere Kontaktzeit.

Den Einwand, auch das koste Zeit, dreht der Autor um: Was ohne Rahmen entsteht, sei nicht Distanz, sondern {{9}}.

Sein Schluss lautet, Distanz sei keine mitgebrachte Haltung, sondern eine Leistung, die {{10}} werden müsse.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-10-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Tugend", "Ideal", "Selbstverständlichkeit"],
              explain:
                "İlk cümlenin yüklemi: \"Professionelle Distanz gilt als Tugend der helfenden Berufe.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Fähigkeit", "Kompetenz", "Leistung"],
              explain:
                "\"Im Ausbildungskontext bezeichnet der Begriff eine Fähigkeit: die Fähigkeit, ein Schicksal ernst zu nehmen, ohne es zum eigenen zu machen.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Erlaubnis", "Rechtfertigung", "Entschuldigung"],
              explain:
                "İkinci anlam metinde bu sözcükle veriliyor: \"eine Erlaubnis, nicht hinzusehen\".",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["nützt", "dient", "hilft"],
              explain:
                "Ayırt edici soru metinde birebir: \"Der Unterschied lässt sich an einer Frage prüfen: Wem nützt die Grenze?\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Pflegekraft", "Fachkraft", "Mitarbeiterin"],
              explain:
                "\"Eine Grenze, die allein die Pflegekraft vor dem Anblick schützt, ist es nicht — sie ist verständlich, aber sie trägt keinen anderen.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Reflexion", "Nachdenken", "Begleitung"],
              explain:
                "Üç şey birlikte sayılıyor: \"verlangt Ausbildung, Reflexion und Zeit\".",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Rahmens", "Rahmen"],
              explain:
                "Araştırmanın bulgusu: \"nicht die Nähe erschöpft, sondern das Fehlen eines Rahmens, in dem über sie gesprochen werden kann\".",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Supervision", "Begleitung"],
              explain:
                "\"Supervision senkt die Erschöpfungswerte deutlicher als jede Verkürzung der Kontaktzeit.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Rückzug", "Abwendung"],
              explain:
                "İtirazın çevrilme noktası: \"was ohne Rahmen entsteht, ist selten Distanz. Es ist Rückzug\".",
            },
            {
              kind: "gap",
              id: "de-c1-10-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["organisiert", "hergestellt", "ermöglicht"],
              explain:
                "Son cümle: \"sondern eine Leistung, die organisiert werden muss\".",
            },
          ],
        },
        {
          id: "de-c1-10-l2",
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
              title: "Der Stuhl neben dem Bett",
              body: `In meinem ersten Jahr auf der Station habe ich mich nie hingesetzt. Ich stand am Fußende, das Klemmbrett in der Hand, und hielt das für Haltung. Es war Angst.

Die Regel, an die ich mich klammerte, hieß: nicht zu nah. Sie stammte aus dem Unterricht und war dort richtig begründet worden. In meinem Gebrauch war sie etwas anderes geworden — eine Erlaubnis, den Raum schnell wieder zu verlassen.

Verändert hat das eine Kollegin, die mich nicht ermahnt, sondern gefragt hat, warum ich stehe. Ich hatte keine Antwort, und das war die Antwort.

Seither setze ich mich. Das klingt nach einer kleinen Geste und ist eine große Entscheidung, denn im Sitzen dauert alles länger, und Zeit ist die Währung, in der die Station rechnet. Ich sitze gleichwohl, weil ein Mensch, der über einem steht, nicht zuhört, sondern kontrolliert. Das ist keine Metapher, das ist Statik.

Nun wäre es leicht, daraus eine Botschaft zu machen: mehr Nähe, weniger Abstand. Ich halte diese Botschaft für falsch, und zwar aus meiner eigenen Erfahrung. Ich habe im vierten Jahr eine Patientin gehabt, deren Sterben ich nicht ausgehalten habe, weil ich sie zu sehr gemocht hatte. Ich war für sie die schlechtere Pflegekraft, gerade weil ich ihr nahe war. Wer das leugnet, hat es nicht erlebt.

Was ich gelernt habe, ist unspektakulärer als beide Parolen. Nähe und Distanz sind keine Gegensätze auf einer Skala, sondern zwei Werkzeuge, die man beide beherrschen muss. Der Fehler liegt nicht darin, das eine zu wählen, sondern darin, nur eines zu haben.

Meine Kollegin ist inzwischen in Rente. Sie hat mir zum Abschied gesagt, sie habe dreißig Jahre lang nicht gewusst, ob sie es richtig mache. Ich habe das damals für Bescheidenheit gehalten. Heute halte ich es für die genaueste Beschreibung des Berufs, die ich kenne.`,
              gloss: [
                { de: "das Klemmbrett", tr: "sıkıştırmalı yazı tahtası", en: "clipboard" },
                { de: "sich klammern an", tr: "sıkı sıkı tutunmak", en: "to cling to" },
                { de: "ermahnen", tr: "uyarmak", en: "to admonish" },
                { de: "die Währung", tr: "para birimi", en: "currency" },
                { de: "die Parole", tr: "slogan", en: "slogan" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-10-l2-11",
              no: 11,
              ref: "t2",
              text: "Wie deutet die Autorin ihr Stehen im ersten Jahr heute?",
              options: [
                "Als bewusste Umsetzung des Gelernten.",
                "Als Zeichen mangelnder Erfahrung im Beruf.",
                "Als Angst, die sie für Haltung hielt.",
                "Als Ausdruck der damaligen Stationsregeln.",
              ],
              answer: 2,
              explain:
                "İki cümlelik düzeltme: \"und hielt das für Haltung. Es war Angst.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-12",
              no: 12,
              ref: "t2",
              text: "Was sagt sie über die Regel „nicht zu nah“?",
              options: [
                "Im Unterricht begründet, im Gebrauch verschoben.",
                "Im Unterricht falsch, in der Praxis brauchbar.",
                "Von Anfang an eine bloße Ausrede der Station.",
                "Eine Vorschrift, die niemand ernsthaft befolgte.",
              ],
              answer: 0,
              explain:
                "\"Sie stammte aus dem Unterricht und war dort richtig begründet worden. In meinem Gebrauch war sie etwas anderes geworden.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-13",
              no: 13,
              ref: "t2",
              text: "Was hat die Kollegin bewirkt?",
              options: [
                "Sie hat eine Ermahnung ausgesprochen.",
                "Sie hat der Autorin die Regel neu erklärt.",
                "Sie hat sich demonstrativ neben das Bett gesetzt.",
                "Sie hat eine Frage gestellt, die unbeantwortet blieb.",
              ],
              answer: 3,
              explain:
                "\"eine Kollegin, die mich nicht ermahnt, sondern gefragt hat, warum ich stehe. Ich hatte keine Antwort, und das war die Antwort.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-14",
              no: 14,
              ref: "t2",
              text: "Warum nennt sie das Sitzen eine große Entscheidung?",
              options: [
                "Weil ihre Kollegin es ihr abgeraten hatte.",
                "Weil dabei Zeit verbraucht wird.",
                "Weil die Station es als Nachlässigkeit wertet.",
                "Weil es der Regel aus der Ausbildung widerspricht.",
              ],
              answer: 1,
              explain:
                "Karar büyük, çünkü sayaç orada işliyor: \"im Sitzen dauert alles länger, und Zeit ist die Währung, in der die Station rechnet\".",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-15",
              no: 15,
              ref: "t2",
              text: "Womit begründet sie das Sitzen sachlich?",
              options: [
                "Mit dem Wunsch der Patienten nach Zuwendung.",
                "Mit einer Empfehlung aus der Ausbildung.",
                "Mit der Wirkung der Körperhöhe auf das Zuhören.",
                "Mit der Erfahrung ihrer langjährigen Kollegin.",
              ],
              answer: 2,
              explain:
                "Metafor olmadığını kendisi vurguluyor: \"ein Mensch, der über einem steht, nicht zuhört, sondern kontrolliert. Das ist keine Metapher, das ist Statik.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-16",
              no: 16,
              ref: "t2",
              text: "Wie steht sie zur Botschaft „mehr Nähe, weniger Abstand“?",
              options: [
                "Sie teilt sie mit kleinen Einschränkungen.",
                "Sie hält sie für richtig, aber unrealistisch.",
                "Sie überlässt die Entscheidung den Lesern.",
                "Sie hält sie aus eigener Erfahrung für falsch.",
              ],
              answer: 3,
              explain:
                "\"Ich halte diese Botschaft für falsch, und zwar aus meiner eigenen Erfahrung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-17",
              no: 17,
              ref: "t2",
              text: "Was belegt ihre Erfahrung im vierten Jahr?",
              options: [
                "Nähe kann die Arbeit verschlechtern.",
                "Sterbebegleitung verlangt besondere Schulung.",
                "Die Station lässt für Abschiede zu wenig Raum.",
                "Kollegen greifen in solchen Fällen zu selten ein.",
              ],
              answer: 0,
              explain:
                "Kendi hakkındaki yargı sert: \"Ich war für sie die schlechtere Pflegekraft, gerade weil ich ihr nahe war.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-18",
              no: 18,
              ref: "t2",
              text: "Wie beschreibt sie das Verhältnis von Nähe und Distanz?",
              options: [
                "Als Skala, auf der man einen Punkt wählt.",
                "Als zwei Werkzeuge, die beide nötig sind.",
                "Als Gegensatz, der sich nicht auflösen lässt.",
                "Als Frage, die jede Einrichtung selbst regelt.",
              ],
              answer: 1,
              explain:
                "\"keine Gegensätze auf einer Skala, sondern zwei Werkzeuge, die man beide beherrschen muss\".",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-19",
              no: 19,
              ref: "t2",
              text: "Worin liegt für sie der eigentliche Fehler?",
              options: [
                "In der Wahl der falschen Seite.",
                "In der Missachtung der Vorschriften.",
                "In der Beschränkung auf ein Werkzeug.",
                "In der Übernahme fremder Erfahrungen.",
              ],
              answer: 2,
              explain:
                "\"Der Fehler liegt nicht darin, das eine zu wählen, sondern darin, nur eines zu haben.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l2-20",
              no: 20,
              ref: "t2",
              text: "Wie hat sich ihre Deutung des Abschiedssatzes geändert?",
              options: [
                "Von Bescheidenheit zu genauer Beschreibung.",
                "Von genauer Beschreibung zu leerer Floskel.",
                "Von Resignation zu einer Warnung an Jüngere.",
                "Von Kritik am Beruf zu Kritik an der Leitung.",
              ],
              answer: 0,
              explain:
                "\"Ich habe das damals für Bescheidenheit gehalten. Heute halte ich es für die genaueste Beschreibung des Berufs, die ich kenne.\"",
            },
          ],
        },
        {
          id: "de-c1-10-l3",
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
              title: "Die Stunde, die niemand hat",
              body: `Supervision ist in den meisten Einrichtungen vorgesehen. Stattfinden tut sie {{21}} unregelmäßig.

Der Grund ist selten Ablehnung. Eine Stunde, {{22}} Ausfall am selben Tag niemandem auffällt, ist die Stunde, die als Erste gestrichen wird. Der Dienstplan kennt keine Zeile dafür.

Hinzu kommt ein Missverständnis über den Zweck. Wer Supervision für ein Angebot an Belastete hält, meldet sich erst an, {{23}} es zu spät ist. Als Regeltermin für alle verliert sie diesen Beigeschmack.

Fachleute empfehlen deshalb weniger eine höhere Frequenz {{24}} eine feste Verankerung im Plan. Ausgesprochen wird das ungern, weil es eine Personalfrage ist.

Was sich sagen lässt: Ein Angebot wirkt erst dann, {{25}} es niemand mehr beantragen muss.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-10-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["keineswegs", "vielerorts", "nirgendwo", "zu keiner Zeit"],
              answer: 1,
              explain:
                "Karşıtlık öngörülen ile gerçekleşen arasında; `vielerorts` düzensizliği yerel olarak sınırlar. Üç olumsuz seçenek `unregelmäßig` ile birlikte anlamsız bir yığılma yaratırdı.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["die", "dem", "den", "deren"],
              answer: 3,
              explain:
                "İlgi cümlesi `Stunde` adına ait bir tamlayan istiyor: \"eine Stunde, deren Ausfall … niemandem auffällt\". `Stunde` dişil olduğu için `deren` gerekir.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["wenn", "damit", "obwohl", "sofern"],
              answer: 0,
              explain:
                "Zaman bildiren yan cümle gerekiyor: \"meldet sich erst an, wenn es zu spät ist\". `damit` amaç, `obwohl` ödün, `sofern` koşul bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "denn", "als", "sondern"],
              answer: 2,
              explain:
                "`weniger …` karşılaştırması `als` ister: \"weniger eine höhere Frequenz als eine feste Verankerung\". `sondern` önünde olumsuzlama gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["wobei", "wenn", "womit", "worin"],
              answer: 1,
              explain:
                "`erst dann` bir zaman belirteci; onu karşılayan bağlaç `wenn`: \"erst dann, wenn es niemand mehr beantragen muss\".",
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
          id: "de-c1-10-h1",
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
              title: "Fallbesprechung am Haus Uhlenhorst — Vorstellung",
              situation: "Bir bakım kurumunun müdürü yeni bir düzenlemeyi anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, mein Name ist Almut Terhorst, ich leite das Haus Uhlenhorst. Ich stelle Ihnen die neue Fallbesprechung vor und beginne mit dem, was sie nicht ist: Sie ist kein Angebot für Belastete. Sie ist ein Regeltermin für alle.",
                },
                {
                  text: "Der Termin liegt donnerstags von vierzehn bis fünfzehn Uhr. Er steht ab Januar fest im Dienstplan, und zwar als Arbeitszeit, nicht als Freizeit.",
                },
                {
                  text: "Geleitet wird die Besprechung von einer externen Supervisorin. Das ist bewusst so entschieden: Wer die Beurteilungen schreibt, sitzt nicht im Raum. Ich selbst nehme also nicht teil.",
                },
                {
                  text: "Pro Termin werden zwei Fälle besprochen, ausgewählt von den Teilnehmenden selbst. Die Auswahl trifft nicht die Leitung, und sie wird auch nicht protokolliert.",
                },
                {
                  text: "Zur Verbindlichkeit: Die Teilnahme ist verpflichtend, die Wortmeldung nicht. Wer eine Stunde lang schweigt, hat die Regel eingehalten. Das ist mir wichtig.",
                },
                {
                  text: "Zu den Kosten: Wir rechnen mit vierzehntausend Euro im Jahr für die externe Leitung. Getragen wird das aus dem Fortbildungsbudget, nicht aus dem Personalbudget.",
                },
                {
                  text: "Ein Punkt, den ich nicht beschönigen will: In den ersten Monaten wird der Dienst dünner besetzt sein. Wir haben das durchgerechnet, und es geht, aber es ist unangenehm.",
                },
                {
                  text: "Was wir aus anderen Häusern wissen: Dort ist die Zahl der Krankheitstage in zwei Jahren um neun Prozent gesunken. Das ist kein Versprechen, das ist eine Erfahrung.",
                },
                {
                  text: "Was wir messen werden: die Teilnahmequote, die Zahl der besprochenen Fälle und die Fluktuation. Ausgewertet wird nach achtzehn Monaten, gemeinsam mit dem Betriebsrat.",
                },
                {
                  text: "Und was ich von Ihnen brauche: Rückmeldungen zum Termin bitte bis zum zwanzigsten Dezember an mich. Danach steht er, und dann ändere ich ihn ein Jahr lang nicht.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Ausdrücklich kein Angebot für {{1}} — Regeltermin für alle.

Zeit: donnerstags {{2}} Uhr, ab Januar im Dienstplan.

Leitung: eine {{3}} Supervisorin; die Heimleitung nimmt nicht teil.

Pro Termin besprochene Fälle: {{4}}, ausgewählt von den Teilnehmenden.

Verpflichtend ist die Teilnahme, nicht die {{5}}.

Kosten pro Jahr: {{6}} Euro.

Finanziert aus dem {{7}}, nicht aus dem Personalbudget.

Andere Häuser: Krankheitstage in zwei Jahren um {{8}} Prozent gesunken.

Auswertung nach {{9}}, gemeinsam mit dem Betriebsrat.

Rückmeldungen zum Termin bis {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-10-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Belastete", "Belasteten", "Überlastete"],
              explain:
                "Konuşma bu ayrımla açılıyor: \"Sie ist kein Angebot für Belastete. Sie ist ein Regeltermin für alle.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["14 bis 15", "vierzehn bis fünfzehn", "14-15"],
              explain:
                "\"Der Termin liegt donnerstags von vierzehn bis fünfzehn Uhr\" — ve mesai saati sayılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["externe", "externen", "unabhängige"],
              explain:
                "Gerekçesiyle veriliyor: \"Wer die Beurteilungen schreibt, sitzt nicht im Raum. Ich selbst nehme also nicht teil.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["zwei", "2"],
              explain:
                "\"Pro Termin werden zwei Fälle besprochen, ausgewählt von den Teilnehmenden selbst.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["Wortmeldung", "Teilnahme am Gespräch", "Beteiligung"],
              explain:
                "\"Die Teilnahme ist verpflichtend, die Wortmeldung nicht. Wer eine Stunde lang schweigt, hat die Regel eingehalten.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["14.000", "14000", "vierzehntausend"],
              explain:
                "\"Wir rechnen mit vierzehntausend Euro im Jahr für die externe Leitung.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["Fortbildungsbudget", "Fortbildungsetat"],
              explain:
                "Ayrım özellikle vurgulanıyor: \"Getragen wird das aus dem Fortbildungsbudget, nicht aus dem Personalbudget.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["9", "neun"],
              explain:
                "\"Dort ist die Zahl der Krankheitstage in zwei Jahren um neun Prozent gesunken. Das ist kein Versprechen, das ist eine Erfahrung.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["18 Monaten", "achtzehn Monaten", "18 Monate"],
              explain:
                "\"Ausgewertet wird nach achtzehn Monaten, gemeinsam mit dem Betriebsrat.\"",
            },
            {
              kind: "gap",
              id: "de-c1-10-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["20. Dezember", "zwanzigsten Dezember", "20. 12."],
              explain:
                "\"Rückmeldungen zum Termin bitte bis zum zwanzigsten Dezember an mich. Danach steht er.\"",
            },
          ],
        },
        {
          id: "de-c1-10-h2",
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
              title: "Professionelle Distanz — Schutz oder Ausrede?",
              situation: "Bir hemşire, bir sağlık iktisatçısı ve bir etik araştırmacısı tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Frau Buschmann, Sie arbeiten seit zweiundzwanzig Jahren in der Pflege. Was hören Sie, wenn jemand professionelle Distanz sagt?",
                },
                {
                  speaker: "Frau Buschmann",
                  text: "Das kommt darauf an, wer es sagt. Aus dem Unterricht höre ich eine Fähigkeit. Auf dem Flur höre ich meistens eine Erklärung dafür, warum jemand nicht in ein Zimmer gegangen ist. Dasselbe Wort, zwei verschiedene Dinge.",
                },
                {
                  speaker: "Moderator",
                  text: "Herr Nissl, Sie rechnen für Träger. Lässt sich diese Unterscheidung überhaupt abbilden?",
                },
                {
                  speaker: "Herr Nissl",
                  text: "Ehrlich gesagt nicht. Wir erfassen Kontaktminuten, Fallzahlen, Krankheitstage. Ob eine Grenze schützt oder abschirmt, steht in keiner Spalte. Was nicht erfasst wird, existiert im Haushalt nicht.",
                },
                {
                  speaker: "Moderator",
                  text: "Frau Öztunç, Sie forschen zur Ethik in Einrichtungen. Ist das ein Erfassungsproblem?",
                },
                {
                  speaker: "Frau Öztunç",
                  text: "Auch. Vor allem aber ein Sprachproblem. Solange dasselbe Wort beides bezeichnet, kann sich der Rückzug hinter der Tugend verstecken. Ich plädiere deshalb dafür, im Haus zwei Begriffe zu verwenden, so unelegant das klingt.",
                },
                {
                  speaker: "Frau Buschmann",
                  text: "Das würde bei uns nichts ändern. Wir haben keine Zeit für den zweiten Begriff, wir haben kaum Zeit für den ersten. Reden Sie mit uns über den Dienstplan, dann reden wir über Sprache.",
                },
                {
                  speaker: "Frau Öztunç",
                  text: "Der Einwand trifft, und ich nehme ihn ernst. Nur ist es umgekehrt genauso: Wer keine Sprache für den Unterschied hat, kann ihn im Dienstplan auch nicht verteidigen.",
                },
                {
                  speaker: "Herr Nissl",
                  text: "Da bin ich ausnahmsweise auf Ihrer Seite. Ich habe Anträge gesehen, die an genau dieser Stelle gescheitert sind. Nicht am Geld — daran, dass niemand sagen konnte, wofür die Stunde ist.",
                },
                {
                  speaker: "Moderator",
                  text: "Herr Nissl, wie steht es um die Wirtschaftlichkeit der Supervision?",
                },
                {
                  speaker: "Herr Nissl",
                  text: "Die Zahlen sind besser, als mir lieb ist. Neun Prozent weniger Krankheitstage über zwei Jahre, das trägt sich. Mir ist nur unwohl dabei, weil wir damit eine ethische Frage ökonomisch begründen. Das geht so lange gut, wie die Zahl stimmt.",
                },
                {
                  speaker: "Frau Öztunç",
                  text: "Diesen Vorbehalt teile ich vollständig. Eine Begründung, die von einer Kennzahl abhängt, fällt mit ihr.",
                },
                {
                  speaker: "Frau Buschmann",
                  text: "Ich sehe das pragmatischer. Wenn die Zahl uns die Stunde bringt, nehme ich die Zahl. Wir haben zwölf Jahre lang mit dem guten Argument verloren.",
                },
                {
                  speaker: "Moderator",
                  text: "Was müsste sich Ihrer Meinung nach zuerst ändern?",
                },
                {
                  speaker: "Frau Buschmann",
                  text: "Die Stunde muss im Plan stehen, nicht im Angebot. Alles, was beantragt werden muss, wird von denen nicht beantragt, die es am nötigsten hätten.",
                },
                {
                  speaker: "Frau Öztunç",
                  text: "Dem stimme ich zu, mit einer Ergänzung: Die Leitung darf nicht im Raum sitzen. Sonst wird aus der Besprechung eine Beurteilung, und dann schweigen alle.",
                },
                {
                  speaker: "Herr Nissl",
                  text: "Einverstanden, und ich füge etwas Unangenehmes hinzu: In den ersten Monaten ist der Dienst dünner besetzt. Wer das verschweigt, verliert die Belegschaft beim ersten Engpass.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-10-h2-11",
              no: 11,
              ref: "d1",
              text: "Wovon hängt für Frau Buschmann die Bedeutung des Begriffs ab?",
              options: [
                "Vom Ausbildungsstand der Person.",
                "Von der Situation, in der er fällt.",
                "Von der Größe der Einrichtung.",
              ],
              answer: 1,
              explain:
                "Ayrımı yerle veriyor: derste bir yeti, koridorda \"eine Erklärung dafür, warum jemand nicht in ein Zimmer gegangen ist\".",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-12",
              no: 12,
              ref: "d1",
              text: "Was sagt Herr Nissl über die Erfassbarkeit?",
              options: [
                "Sie ist mit Aufwand herstellbar.",
                "Sie gelingt nur in großen Häusern.",
                "Der Unterschied taucht nirgends auf.",
              ],
              answer: 2,
              explain:
                "\"Ob eine Grenze schützt oder abschirmt, steht in keiner Spalte. Was nicht erfasst wird, existiert im Haushalt nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-13",
              no: 13,
              ref: "d1",
              text: "Worin sieht Frau Öztunç das Hauptproblem?",
              options: [
                "In der Sprache, nicht nur in der Erfassung.",
                "In der Ausbildung der Pflegekräfte.",
                "In der Haltung der Einrichtungsleitungen.",
              ],
              answer: 0,
              explain:
                "\"Auch. Vor allem aber ein Sprachproblem\" — aynı sözcük ikisini birden adlandırdıkça geri çekilme erdemin arkasına saklanabiliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-14",
              no: 14,
              ref: "d1",
              text: "Was schlägt sie deshalb vor?",
              options: [
                "Eine schriftliche Definition im Leitbild.",
                "Zwei getrennte Begriffe im Haus.",
                "Eine Schulung für alle Führungskräfte.",
              ],
              answer: 1,
              explain:
                "\"Ich plädiere deshalb dafür, im Haus zwei Begriffe zu verwenden, so unelegant das klingt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-15",
              no: 15,
              ref: "d1",
              text: "Wie reagiert Frau Buschmann auf diesen Vorschlag?",
              options: [
                "Sie hält ihn für theoretisch folgenlos.",
                "Sie hält ihn für sprachlich unpräzise.",
                "Sie hält ihn für sofort umsetzbar.",
              ],
              answer: 0,
              explain:
                "\"Wir haben keine Zeit für den zweiten Begriff, wir haben kaum Zeit für den ersten\" — önce nöbet çizelgesi konuşulsun diyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-16",
              no: 16,
              ref: "d1",
              text: "Wie geht Frau Öztunç mit diesem Einwand um?",
              options: [
                "Sie nimmt ihn an und dreht ihn um.",
                "Sie hält ihn für ein Missverständnis.",
                "Sie verweist auf andere Einrichtungen.",
              ],
              answer: 0,
              explain:
                "Önce kabul (\"Der Einwand trifft\"), sonra ters yön: \"Wer keine Sprache für den Unterschied hat, kann ihn im Dienstplan auch nicht verteidigen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-17",
              no: 17,
              ref: "d1",
              text: "Womit stützt Herr Nissl diese Position?",
              options: [
                "Mit einer Studie aus dem eigenen Haus.",
                "Mit dem Vergleich zweier Bundesländer.",
                "Mit gescheiterten Anträgen.",
              ],
              answer: 2,
              explain:
                "\"Nicht am Geld — daran, dass niemand sagen konnte, wofür die Stunde ist.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-18",
              no: 18,
              ref: "d1",
              text: "Wie bewertet er die Zahlen zur Supervision?",
              options: [
                "Als zu unsicher für eine Entscheidung.",
                "Als günstiger, als ihm angenehm ist.",
                "Als ausschlaggebend für seine Empfehlung.",
              ],
              answer: 1,
              explain:
                "\"Die Zahlen sind besser, als mir lieb ist\" — yüzde dokuz iki yılda, ve bu kendini finanse ediyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-19",
              no: 19,
              ref: "d1",
              text: "Warum ist ihm dabei unwohl?",
              options: [
                "Eine ethische Frage wird ökonomisch begründet.",
                "Die Erhebung stammt von interessierter Seite.",
                "Die Häuser sind untereinander nicht vergleichbar.",
              ],
              answer: 0,
              explain:
                "Kendi sınırını söylüyor: \"Das geht so lange gut, wie die Zahl stimmt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-20",
              no: 20,
              ref: "d1",
              text: "Wie verhält sich Frau Öztunç zu diesem Vorbehalt?",
              options: [
                "Sie hält ihn für übertrieben vorsichtig.",
                "Sie hält ihn für weniger dringlich.",
                "Sie teilt ihn ohne Einschränkung.",
              ],
              answer: 2,
              explain:
                "\"Diesen Vorbehalt teile ich vollständig. Eine Begründung, die von einer Kennzahl abhängt, fällt mit ihr.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie begründet Frau Buschmann ihre pragmatische Haltung?",
              options: [
                "Mit dem Druck aus der Belegschaft.",
                "Mit zwölf Jahren erfolgloser Argumente.",
                "Mit der Erfahrung anderer Berufsgruppen.",
              ],
              answer: 1,
              explain:
                "\"Wenn die Zahl uns die Stunde bringt, nehme ich die Zahl. Wir haben zwölf Jahre lang mit dem guten Argument verloren.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-22",
              no: 22,
              ref: "d1",
              text: "Was müsste sich für sie zuerst ändern?",
              options: [
                "Die Stunde gehört in den Plan.",
                "Die Leitung muss teilnehmen.",
                "Die Fälle müssen protokolliert werden.",
              ],
              answer: 0,
              explain:
                "Gerekçesiyle: \"Alles, was beantragt werden muss, wird von denen nicht beantragt, die es am nötigsten hätten.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-23",
              no: 23,
              ref: "d1",
              text: "Welche Ergänzung nennt Frau Öztunç?",
              options: [
                "Eine feste Obergrenze für die Gruppengröße.",
                "Eine Auswertung nach achtzehn Monaten.",
                "Die Abwesenheit der Leitung.",
              ],
              answer: 2,
              explain:
                "Sonucuyla birlikte veriyor: \"Sonst wird aus der Besprechung eine Beurteilung, und dann schweigen alle.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-24",
              no: 24,
              ref: "d1",
              text: "Was fügt Herr Nissl am Ende hinzu?",
              options: [
                "Eine offene Warnung vor Engpässen.",
                "Eine Zusage über die Finanzierung.",
                "Einen Vorbehalt gegen externe Leitung.",
              ],
              answer: 0,
              explain:
                "İlk aylarda nöbet daha seyrek dolacak: \"Wer das verschweigt, verliert die Belegschaft beim ersten Engpass.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-10-h2-25",
              no: 25,
              ref: "d1",
              text: "Worin sind sich am Ende alle drei einig?",
              options: [
                "Dass die Kennzahl die beste Begründung ist.",
                "Dass die Stunde verbindlich werden muss.",
                "Dass zwei Begriffe eingeführt werden sollen.",
              ],
              answer: 1,
              explain:
                "Üçü de plana bağlanmasında birleşiyor; iki terim önerisine Frau Buschmann karşı çıkmış, kilit rakamı ise ikisi çekinceyle karşılamıştı.",
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
          id: "de-c1-10-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Fachzeitschrift stand: \"Professionelle Distanz ist in den meisten Fällen nur ein anderes Wort für Gleichgültigkeit.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir meslek dergisinde şöyle yazdı: \"Mesleki mesafe çoğu durumda kayıtsızlığın başka bir adıdır.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Die These beschreibt einen realen Missbrauch und erklärt ihn zur Regel. Damit trifft sie etwas Richtiges und verfehlt das Entscheidende. Richtig ist, dass dasselbe Wort zwei Dinge bezeichnet: eine Fähigkeit, die im Unterricht begründet wird, und eine Erlaubnis, ein Zimmer nicht zu betreten. Falsch ist der Schluss, die zweite Bedeutung sei die eigentliche. Wer das annimmt, spricht der ersten die Existenz ab und nimmt damit denen das Argument, die sie tatsächlich ausüben.

Prüfen lässt sich das an der Frage, wem die Grenze nützt. Eine Pflegekraft, die einem Sterbenden nicht die eigene Erschütterung zumutet, schützt den Patienten. Eine Pflegekraft, die dasselbe Zimmer meidet, schützt sich. Beide berufen sich auf Distanz, und der Unterschied ist am Verhalten ablesbar, nicht am Wort.

Gegen meine Position spricht ein starkes Argument: In der Praxis lässt sich diese Frage kaum stellen, weil niemand von außen sieht, was in einem Zimmer geschieht. Eine Unterscheidung, die sich nicht überprüfen lässt, schützt am Ende die Bequemen. Diesen Einwand kann ich nicht entkräften, sondern nur einordnen: Er zeigt, wo die Unterscheidung endet, nicht dass sie falsch wäre.

Meine Schlussfolgerung lautet daher: Nicht der Begriff ist das Problem, sondern seine Unbeobachtbarkeit. Wer den Missbrauch bekämpfen will, braucht keinen schärferen Verdacht, sondern einen Rahmen, in dem über einzelne Fälle gesprochen wird.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — iki anlam ayrıldı mı?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik ve gerçekten güçlü mü?",
              "Sonuç itirazdan sonra hâlâ ayakta mı, yoksa itirazı yok mu sayıyor?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-10-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben als Mitarbeiterin an die Leitung des Hauses Uhlenhorst und melden sich zum neuen Termin zurück. Ergänzen Sie die Lücken 1 bis 10 im Schreiben. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Bir çalışan olarak Haus Uhlenhorst yönetimine yazıyor ve yeni toplantı hakkında görüş bildiriyorsun. Yazıdaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "An die Heimleitung",
              body: `Sehr geehrte Frau Terhorst,

{{1}} auf Ihre Vorstellung der Fallbesprechung vom 2. Dezember melde ich mich fristgerecht mit einer Rückmeldung.

Vorab: Die Entscheidung, den Termin in den Dienstplan aufzunehmen, halte ich für richtig. Meine Anmerkungen richten sich {{2}} gegen das Vorhaben, sondern gegen zwei Einzelheiten.

Erstens liegt der Termin donnerstags um vierzehn Uhr, {{3}} die Übergabe der Frühschicht regelmäßig länger dauert. Wer aus dem Frühdienst kommt, wird {{4}} zu spät erscheinen.

Zweitens ist der Hinweis auf die dünnere Besetzung {{5}} nicht beziffert worden. Angesichts der genannten achtzehn Monate halte ich eine Angabe für {{6}}.

Ich rege {{7}} an, den Termin auf halb drei zu verschieben und den Besetzungsplan für das erste Quartal offenzulegen.

Für Rückfragen stehe ich Ihnen gern zur {{8}}. Über eine kurze Antwort {{9}} zum 20. Dezember wäre ich Ihnen verbunden.

Mit freundlichen Grüßen
Marlies {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-10-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf eine Veranstaltung)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Yazı bir sunuma gönderme yaparak açılıyor ve cümle `auf` ile sürüyor; buraya `Bezugnehmend` ya da ayrık yazımıyla `Bezug nehmend` girer.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung vor „sondern“)",
              accept: ["nicht"],
              explain:
                "Cümle `sondern` ile devam ediyor; bu bağlaç kendinden önce bir olumsuzlama ister — itiraz projenin kendisine değil, iki ayrıntıya yönelik.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-3",
              no: 3,
              text: "Lücke 3 (Gleichzeitigkeit mit Gegensatz)",
              accept: ["obwohl", "obgleich", "während"],
              explain:
                "Saat ile devir teslimin uzaması arasında karşıtlık var: \"um vierzehn Uhr, obwohl die Übergabe … regelmäßig länger dauert\".",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-4",
              no: 4,
              text: "Lücke 4 (unvermeidliche Folge)",
              accept: ["zwangsläufig", "regelmäßig", "unweigerlich"],
              explain:
                "Sonuç kaçınılmaz olarak sunuluyor: devir teslim uzuyorsa sabah vardiyasından gelen \"zwangsläufig zu spät erscheinen\" wird.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-5",
              no: 5,
              text: "Lücke 5 (Einschränkung: bis jetzt)",
              accept: ["bislang", "bisher", "noch"],
              explain:
                "Eksiklik zaman içinde yerleştiriliyor — \"bislang nicht beziffert worden\": şimdiye kadarki durum anlatılıyor, kalıcı bir yargı değil.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-6",
              no: 6,
              text: "Lücke 6 (Notwendigkeit)",
              accept: ["erforderlich", "geboten", "notwendig"],
              explain:
                "On sekiz aylık süre karşısında bir sayı verilmesi gerekiyor; `halte ich für` yapısı bu yargıyı sıfatla tamamlar.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-7",
              no: 7,
              text: "Lücke 7 (Folgerung im Mittelfeld)",
              accept: ["daher", "deshalb", "folglich"],
              explain:
                "İki gerekçe sıralandıktan sonra öneri geliyor; `anregen` fiilinin ardındaki bu belirteç iki noktayı öneriye bağlar.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-8",
              no: 8,
              text: "Lücke 8 (feste Wendung: zur … stehen)",
              accept: ["Verfügung"],
              explain:
                "Kapanış kalıbı sabit: `zur Verfügung stehen`. Kalıptaki ad başka bir sözcükle değiştirilemez.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-9",
              no: 9,
              text: "Lücke 9 (Frist)",
              accept: ["bis"],
              explain:
                "Yönetimin kendi verdiği son tarih yineleniyor: `bis zum 20. Dezember`. `ab` süreyi başlatır, `seit` geçmişe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-10-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname der Absenderin)",
              accept: ["Buschmann"],
              explain:
                "Yazan kişi panelde konuşan hemşireyle aynı: yirmi iki yıldır bakımda çalışan Marlies Buschmann.",
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
          id: "de-c1-10-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Muss man Abstand halten, um helfen zu können?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Yardım edebilmek için mesafe koymak gerekir mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
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
              "Ich möchte darüber sprechen, ob Abstand eine Bedingung des Helfens ist. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Abstand meine ich nicht Kälte, sondern die Fähigkeit, ein fremdes Schicksal ernst zu nehmen, ohne es zum eigenen zu machen. Mit Nähe meine ich die Bereitschaft, im Raum zu bleiben, wenn nichts mehr zu tun ist. Für den Abstand spricht die Verlässlichkeit. Wer heute besonders zugewandt ist und morgen erschöpft, behandelt seine Patienten nach der eigenen Tagesform; eine Grenze schützt sie davor. In meiner Familie hat eine Pflegerin das einmal so gesagt: Sie sei nicht für alle gleich freundlich, aber für alle gleich zuverlässig. Für die Nähe spricht, dass viele Dinge nur im Vertrauen gesagt werden. Wer nie neben dem Bett sitzt, erfährt manches nie. Meine Position ist, dass die Frage falsch gestellt ist: Nähe und Distanz sind keine Punkte auf einer Skala, sondern zwei Werkzeuge. Der Einwand dagegen wiegt schwer — in einem Beruf mit knapper Zeit läuft die Rede von zwei Werkzeugen praktisch auf das bequemere hinaus. Ich halte die Position gleichwohl, weil auch die Alternative Zeit kostet, nur später. Zusammenfassend: Der Fehler liegt nicht in der Wahl, sondern darin, nur eines von beiden zu beherrschen.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı — mesafe ile soğukluk ayrıldı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-10-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Einrichtung will die Belastung der Pflegekräfte senken und muss vier Fragen klären: Supervision oder kürzere Kontaktzeiten? Verpflichtend oder freiwillig? Interne oder externe Leitung? Was passiert bei einem Personalengpass? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir kurum bakım personelinin yükünü azaltmak istiyor ve dört soruyu çözmesi gerekiyor: Süpervizyon mu, daha kısa hasta teması mı? Zorunlu mu, gönüllü mü? İç yönetim mi, dış yönetim mi? Personel darboğazında ne olacak? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne: Ich wäre für kürzere Kontaktzeiten. Das entlastet sofort und kostet keine zusätzliche Stunde. Was meinen Sie?",
              tr: "Ben başlayayım: Hasta temas sürelerini kısaltmaktan yanayım. Hemen rahatlatır ve fazladan bir saate mal olmaz. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'fazladan saate mal olmaz' gerekçesini doğrudan ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zur Verpflichtung: Wer gezwungen wird zu reden, redet nicht ehrlich. Spricht das nicht für Freiwilligkeit?",
              tr: "Zorunluluk meselesi: Konuşmaya zorlanan kişi dürüst konuşmaz. Bu, gönüllülüğü gerektirmiyor mu?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir ayrım öner (katılım ile söz alma gibi).",
              expect: "itirazı ele almak ve gerekirse ayrımlı bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Eine externe Leitung kostet vierzehntausend im Jahr. Eine interne wäre umsonst. Können wir uns das Externe wirklich leisten?",
              tr: "Dış yönetim yılda on dört bin avroya mal oluyor. İçeriden biri bedava olurdu. Dışarıdan birini gerçekten karşılayabilir miyiz?",
            },
            {
              who: "you",
              hint: "Bir seçim yap ve maliyet gerekçesini de tart.",
              expect: "gerekçeli bir seçim yapmak ve maliyet argümanını tartmak",
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
              "Ihr Argument mit der sofortigen Entlastung stimmt für den Dienstplan, nicht für die Belastung. Die Untersuchungen zeigen, dass nicht die Nähe erschöpft, sondern das Fehlen eines Rahmens; kürzere Kontaktzeiten nehmen den Rahmen zusätzlich weg. Ich schlage deshalb die Supervision vor, eine Stunde alle zwei Wochen, fest im Plan. Zur Verpflichtung würde ich unterscheiden: Die Teilnahme ist verbindlich, die Wortmeldung nicht. Damit ist niemand zum Reden gezwungen, und zugleich meldet sich niemand ab, der es nötig hätte. Genau das ist bei freiwilligen Angeboten das Muster. Bei der Leitung entscheide ich mich trotz der Kosten für die externe. Wer die Beurteilungen schreibt, darf nicht im Raum sitzen — sonst wird aus der Besprechung eine Beurteilung, und dann schweigen alle, und wir haben die Stunde ohne den Nutzen. Zusammengefasst: Supervision statt kürzerer Kontaktzeiten, Teilnahme verbindlich und Wortmeldung frei, externe Leitung aus dem Fortbildungsbudget. Offen bleibt ausdrücklich der Engpass: In den ersten Monaten ist der Dienst dünner besetzt, und ich möchte das nicht durch eine optimistische Annahme verdecken.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Zorunluluk itirazına ayrımlı bir çözüm getirildi mi?",
              "Maliyet argümanı tartıldı mı, yoksa yok mu sayıldı?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, unterscheiden, offenlegen)?",
            ],
          },
        },
      ],
    },
  ],
};

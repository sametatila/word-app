import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 14 çocuk sporu ve rekabet hattı: bir dergi yazısı, iki antrenörün
 * tartışması, ailelere bir mektup. Dil bilgisi yarı modal fiiller —
 * scheinen, drohen, versprechen, pflegen ve vermögen + zu.
 */
export const deC1P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r14",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Spielen ohne Tabelle",
    genre: "article",
    intro: "Bir dergi yazısı: bir spor federasyonu küçük yaş gruplarında puan tablosunu kaldırdı; iki sezon sonra ne değişti.",
    gloss: [
      { de: "der Verband", tr: "federasyon", en: "association" },
      { de: "die Tabelle", tr: "puan tablosu", en: "league table" },
      { de: "der Stammplatz", tr: "kadroda sabit yer", en: "regular place" },
      { de: "der Betreuer", tr: "gözetmen", en: "supervisor" },
      { de: "ausrichten", tr: "göre ayarlamak", en: "to align" },
      { de: "der Widerstand", tr: "direniş", en: "resistance" },
    ],
    minutes: 10,
    text:
      "Spielen ohne Tabelle\n\n" +
      "Seit zwei Spielzeiten gibt es im Kinderfußball des Landesverbands keine Tabellen mehr. " +
      "Bis zum Alter von zehn Jahren wird nur noch zu dritt oder zu fünft gespielt, auf " +
      "mehreren kleinen Feldern gleichzeitig, und Ergebnisse werden nirgends festgehalten. " +
      "Die Reform schien anfangs am Widerstand der Eltern zu scheitern; inzwischen droht sie " +
      "eher am Mangel an Betreuern zu scheitern, denn für viele kleine Felder braucht man " +
      "mehr Erwachsene.\n\n" +
      "Die Begründung des Verbands war nüchtern. In der alten Form berührte ein " +
      "durchschnittliches Kind den Ball in einem Spiel kaum ein Dutzend Mal. Die Stärksten " +
      "spielten, die anderen standen, und wer mit acht Jahren keinen Stammplatz hatte, hatte " +
      "mit elf meistens keine Lust mehr. Auf den kleinen Feldern kommt jedes Kind auf ein " +
      "Vielfaches an Ballkontakten.\n\n" +
      "Der Protest kam vor allem von Erwachsenen. Kinder, so hieß es, wollten gewinnen, und " +
      "wer ihnen die Tabelle nehme, nehme ihnen den Ernst. Ein Trainer sprach öffentlich von " +
      "„Kuschelsport“.\n\n" +
      "Die Beobachtungen nach zwei Jahren sprechen eine andere Sprache. Die Kinder zählen " +
      "nach wie vor mit, oft genauer als jeder Schiedsrichter, und sie wissen am Ende sehr " +
      "wohl, wer gewonnen hat. Was fehlt, ist nur die Rechnung über Wochen: der Tabellenplatz, " +
      "an dem ein Verein seine Jugendarbeit ausrichtet und mit dem Trainer ihren Wert " +
      "belegen.\n\n" +
      "Genau darin liegt der eigentliche Konflikt. Die Tabelle diente weniger den Kindern als " +
      "den Erwachsenen, die für sie verantwortlich sind. Seit sie fehlt, müssen Trainer ihre " +
      "Arbeit anders begründen, etwa mit der Zahl der Kinder, die nach zwei Jahren noch dabei " +
      "sind. Diese Zahl ist in den Vereinen, die früh umgestellt haben, spürbar gestiegen.\n\n" +
      "Ob sich das auf Dauer bestätigt, lässt sich noch nicht sagen. Leiser wird die " +
      "Diskussion trotzdem nicht, und sie pflegt sich immer an denselben Wochenenden zu " +
      "entzünden: bei den Turnieren, zu denen die Eltern kommen.",
    questions: [
      {
        text: "Woran schien die Reform anfangs zu scheitern?",
        options: [
          "an zu wenigen Sportplätzen",
          "an fehlendem Geld im Verband",
          "am Widerstand der Eltern",
        ],
        answer: 2,
        explain: "Başta ailelerin direnişi vardı; bugün asıl sorun gözetmen eksikliği.",
      },
      {
        text: "Was war das wichtigste Argument des Verbands?",
        options: [
          "mehr Ballkontakte für jedes Kind",
          "geringere Kosten für die Vereine",
          "zu wenige Schiedsrichter",
        ],
        answer: 0,
        explain: "Eskiden bir çocuk topa maç başına ancak bir düzine kez dokunuyordu.",
      },
      {
        kind: "truefalse",
        text: "Seit der Reform wissen die Kinder nicht mehr, wer gewonnen hat.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Çocuklar saymaya devam ediyor ve kimin kazandığını gayet iyi biliyor.",
      },
      {
        kind: "gapfill",
        text: "Früher berührte ein durchschnittliches Kind den Ball kaum ein ___ Mal.",
        options: [],
        answer: 0,
        accept: ["Dutzend"],
        explain: "„kaum ein Dutzend Mal“ — yani bir maçta on ikiden az.",
      },
      {
        kind: "short_answer",
        text: "Wem diente die Tabelle laut Text vor allem?",
        options: [],
        answer: 0,
        accept: ["den Erwachsenen", "Erwachsenen", "den Trainern und Vereinen"],
        explain: "„Die Tabelle diente weniger den Kindern als den Erwachsenen.“",
      },
      {
        text: "Womit begründen Trainer ihre Arbeit heute zum Beispiel?",
        options: [
          "mit dem Platz in der Tabelle",
          "mit der Zahl der Kinder, die bleiben",
          "mit der Zahl der erzielten Tore",
        ],
        answer: 1,
        explain: "İki yıl sonra hâlâ takımda olan çocuk sayısıyla; bu sayı erken geçen kulüplerde artmış.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l14",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Zwei Trainer, ein Spielfeld",
    genre: "dialogue",
    intro: "İki antrenör tartışıyor: çocukların bir puan tablosuna ihtiyacı var mı, yoksa tablo yetişkinlerin mi derdi.",
    gloss: [
      { de: "der Ehrgeiz", tr: "hırs", en: "ambition" },
      { de: "die Niederlage", tr: "yenilgi", en: "defeat" },
      { de: "verkraften", tr: "kaldırmak", en: "to cope with" },
      { de: "der Vergleich", tr: "karşılaştırma", en: "comparison" },
      { de: "die Sichtung", tr: "yetenek taraması", en: "scouting" },
      { de: "aufhören", tr: "bırakmak", en: "to quit" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Frau Kraus", text: "Ich trainiere seit elf Jahren Kinder, und ich habe noch keines erlebt, das nicht gewinnen wollte. Ehrgeiz ist nichts, was man ihnen austreiben muss." },
      { speaker: "Herr Pohl", text: "Das bestreitet niemand. Die Frage ist, ob sie dafür eine Tabelle brauchen, die über eine ganze Saison geführt wird. Ein Spiel zu gewinnen und eine Liga zu gewinnen sind zwei verschiedene Dinge." },
      { speaker: "Frau Kraus", text: "Aber an der Tabelle lernen sie, mit einer Niederlage umzugehen. Wer nie verliert, weil nichts gezählt wird, verkraftet es später umso schlechter." },
      { speaker: "Herr Pohl", text: "Sie verlieren doch trotzdem, jeden Samstag, auf dem Platz. Was ihnen erspart bleibt, ist nur der zehnte Tabellenplatz im März, und den nehmen vor allem die Eltern persönlich." },
      { speaker: "Frau Kraus", text: "Da ist etwas dran. Trotzdem fehlt mir etwas. Die Kinder aus meiner Mannschaft fragen mich, wo wir stehen, und ich habe keine Antwort." },
      { speaker: "Herr Pohl", text: "Dann antworte mit dem, was du siehst: wer sich verbessert hat, wer sich mehr traut. Das ist auch ein Vergleich, nur einer mit sich selbst." },
      { speaker: "Frau Kraus", text: "Mit Achtjährigen funktioniert das. Mit Zwölfjährigen nicht mehr, die wollen sich mit anderen messen, und das ist auch richtig so." },
      { speaker: "Herr Pohl", text: "Einverstanden. Deshalb endet die Reform ja mit zehn. Streiten können wir darüber, ob das die richtige Grenze ist, aber nicht über das Prinzip." },
      { speaker: "Frau Kraus", text: "Dann sage ich dir, was mich eigentlich stört: Seit es keine Tabelle gibt, hören weniger Kinder auf, aber die guten wechseln früher zu großen Vereinen." },
      { speaker: "Herr Pohl", text: "Das ist ein echtes Problem, aber es hat mit den großen Vereinen zu tun, nicht mit der Tabelle. Die Sichtung findet jetzt eben früher statt." },
      { speaker: "Frau Kraus", text: "Vielleicht. Ich schlage vor, wir lassen die Frage offen und schauen uns die Zahlen in zwei Jahren noch einmal gemeinsam an." },
    ],
    questions: [
      {
        text: "Was sagt Frau Kraus über den Ehrgeiz von Kindern?",
        options: [
          "Man muss ihn ihnen austreiben.",
          "Jedes Kind will gewinnen.",
          "Er entsteht erst durch Tabellen.",
        ],
        answer: 1,
        explain: "On bir yılda kazanmak istemeyen tek bir çocuk görmemiş.",
      },
      {
        text: "Was bleibt den Kindern laut Herrn Pohl erspart?",
        options: [
          "ein schlechter Platz über die Saison",
          "jede Niederlage auf dem Platz",
          "das Training am Wochenende",
        ],
        answer: 0,
        explain: "Her cumartesi yine kaybediyorlar; yalnız sezon boyu süren kötü sıralamadan kurtuluyorlar.",
      },
      {
        kind: "truefalse",
        text: "Herr Pohl hält auch den Vergleich mit sich selbst für einen Vergleich.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Das ist auch ein Vergleich, nur einer mit sich selbst.“",
      },
      {
        kind: "gapfill",
        text: "Die Reform gilt nur bis zum Alter von ___ Jahren.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„Deshalb endet die Reform ja mit zehn.“",
      },
      {
        kind: "short_answer",
        text: "Was stört Frau Kraus eigentlich?",
        options: [],
        answer: 0,
        accept: [
          "dass gute Kinder früher wechseln",
          "die guten wechseln früher",
          "frühe Wechsel zu großen Vereinen",
        ],
        explain: "Daha az çocuk bırakıyor ama iyi oyuncular büyük kulüplere daha erken geçiyor.",
      },
      {
        text: "Worauf einigen sich die beiden am Ende?",
        options: [
          "die Tabelle wieder einzuführen",
          "die Altersgrenze zu senken",
          "die Zahlen später anzuschauen",
        ],
        answer: 2,
        explain: "Soruyu açık bırakıp iki yıl sonra sayılara birlikte bakmayı öneriyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w14",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Elternbrief vor der neuen Saison",
    genre: "letter",
    intro: "Bir çocuk takımının antrenörü olarak ailelere yazıyorsun: önce iki cümle kur, sonra yeni kuralı açıklayan ve itirazları önceden karşılayan bir mektup yaz.",
    gloss: [
      { de: "die Saison", tr: "sezon", en: "season" },
      { de: "die Umstellung", tr: "geçiş", en: "changeover" },
      { de: "befürchten", tr: "endişe etmek", en: "to fear" },
      { de: "der Spielfeldrand", tr: "saha kenarı", en: "touchline" },
      { de: "zuschauen", tr: "izlemek", en: "to watch" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Reform ilk bakışta çocukların hırsını frenliyor gibi görünüyor.",
        answer: "Die Reform scheint auf den ersten Blick den Ehrgeiz der Kinder zu bremsen.",
        alternatives: ["Auf den ersten Blick scheint die Reform den Ehrgeiz der Kinder zu bremsen."],
        hint: "„scheinen + zu“ bir izlenim bildirir; „zu“lu mastar cümlenin sonuna gider.",
      },
      {
        kind: "build",
        tr: "Saha kenarından gelen bağırışlar en küçük oyuncuların kafasını karıştırma tehlikesi taşıyor.",
        answer: "Die Rufe vom Spielfeldrand drohen die jüngsten Spieler zu verunsichern.",
        alternatives: ["Vom Spielfeldrand drohen die Rufe die jüngsten Spieler zu verunsichern."],
        hint: "„drohen + zu“ burada birini tehdit etmeyi değil, kötü bir sonucun yaklaştığını bildirir.",
      },
      {
        kind: "free",
        prompt:
          "Takımındaki çocukların ailelerine yeni sezon öncesi bir mektup yaz: puan tablosunun neden kaldırıldığını kısaca açıkla, ailelerin en yaygın kaygısını dile getir ve yanıtla, maç günleri için iki somut rica belirt, çocukların gelişimini nasıl paylaşacağını söyle ve bir davetle bitir.",
        checklist: [
          "Değişikliği ve gerekçesini kısaca açıkla",
          "En yaygın kaygıyı adlandır ve yanıtla",
          "Maç günleri için iki somut rica yaz",
          "Gelişimi nasıl paylaşacağını söyle ve bir davetle kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Vor dem Start der neuen Saison möchte ich Sie über … informieren.", tr: "Yeni sezon başlamadan önce sizi … hakkında bilgilendirmek istiyorum.", en: "Before the new season starts, I would like to inform you about …" },
          { de: "Viele von Ihnen befürchten, dass …", tr: "Birçoğunuz … diye endişe ediyor", en: "Many of you fear that …" },
          { de: "Diese Sorge scheint mir verständlich, trifft aber nicht ganz zu: …", tr: "Bu kaygı bana anlaşılır görünüyor ama tam isabetli değil: …", en: "This concern seems understandable to me, but it is not quite accurate: …" },
          { de: "An den Spieltagen bitte ich Sie um zwei Dinge: …", tr: "Maç günlerinde sizden iki şey rica ediyorum: …", en: "On match days I ask you for two things: …" },
          { de: "Wer sich selbst ein Bild machen möchte, ist herzlich eingeladen, …", tr: "Kendi gözüyle görmek isteyen herkes … için davetlidir", en: "Anyone who wants to see for themselves is warmly invited to …" },
        ],
        sample:
          "Liebe Eltern, vor dem Start der neuen Saison möchte ich Sie über eine Umstellung " +
          "informieren, die viele von Ihnen schon aus der Zeitung kennen: In der Altersklasse " +
          "unserer Kinder werden keine Tabellen mehr geführt, und gespielt wird auf vier kleinen " +
          "Feldern gleichzeitig. Der Grund ist einfach: Jedes Kind soll möglichst oft am Ball " +
          "sein, nicht nur die drei Stärksten. " +
          "Viele von Ihnen befürchten, dass den Kindern damit der Ehrgeiz genommen wird. Diese " +
          "Sorge scheint mir verständlich, trifft aber nicht ganz zu: Die Kinder zählen weiterhin " +
          "jedes Tor und wissen nach dem Spiel genau, wer gewonnen hat. Es fehlt nur die " +
          "Rechnung über die ganze Saison. " +
          "An den Spieltagen bitte ich Sie um zwei Dinge. Erstens: Bleiben Sie hinter der " +
          "Absperrung, auch wenn es spannend wird. Zweitens: Verzichten Sie auf Anweisungen vom " +
          "Spielfeldrand; sie drohen die Kinder zu verunsichern, weil diese dann zwei Trainer " +
          "gleichzeitig hören. " +
          "Wie sich Ihr Kind entwickelt, bespreche ich gern zweimal im Jahr persönlich mit Ihnen. " +
          "Wer sich selbst ein Bild machen möchte, ist herzlich eingeladen, bei einem Training " +
          "zuzuschauen. Viele Grüße, Ihr Trainer Lukas Brandt",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s14",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Wie viel Wettbewerb brauchen Kinder?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir sınır öner ve onu kendi deneyiminle sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çocukların sporda, okulda ya da müzikte ne kadar rekabete ihtiyacı var? Bir sınır öner, bunu kendi çocukluğundan bir deneyimle sına, karşı görüşün haklı olduğu noktayı kabul et ve yetişkinlere düşen görevi söyle.",
      bulletsTr: [
        "Rekabet için bir sınır ya da ölçüt öner",
        "Bunu kendi deneyiminle sına",
        "Karşı görüşün haklı olduğu noktayı kabul et",
        "Yetişkinlere düşen görevi söyle",
      ],
      targets: [
        { de: "Entscheidend ist für mich nicht, ob …, sondern wann …", tr: "Benim için belirleyici olan … olup olmadığı değil, ne zaman olduğu" },
        { de: "Ich erinnere mich an …", tr: "… hatırlıyorum" },
        { de: "Recht hat die Gegenseite, wenn sie sagt, dass …", tr: "Karşı taraf … dediğinde haklı" },
        { de: "Die Aufgabe der Erwachsenen wäre dann, …", tr: "O zaman yetişkinlerin görevi … olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Entscheidend ist für mich nicht, ob Kinder Wettbewerb brauchen, sondern wann und in " +
        "welcher Form. Ein Spiel zu gewinnen gehört zum Spielen dazu; eine Rangliste, die über " +
        "Monate geführt wird, ist dagegen eine Erfindung für Erwachsene. " +
        "Ich erinnere mich an meine Zeit im Schwimmverein. Mit neun wurde ich bei jedem " +
        "Wettkampf Letzte oder Vorletzte, und das hat mich nicht angespornt, sondern nur dazu " +
        "gebracht, Ausreden zu erfinden. Aufgehört habe ich ein Jahr später, obwohl ich " +
        "eigentlich gern im Wasser war. " +
        "Recht hat die Gegenseite allerdings, wenn sie sagt, dass ältere Kinder den Vergleich " +
        "suchen und dass man ihnen etwas vorenthält, wenn man ihn verweigert. Mit dreizehn " +
        "wollte ich wissen, wo ich stehe, und hätte mich über jede Zeit gefreut, die sich " +
        "messen ließ. " +
        "Die Aufgabe der Erwachsenen wäre dann, den Übergang zu gestalten, statt ihn " +
        "vorzuverlegen: erst das Spiel, dann das Ergebnis, dann die Tabelle — und nicht " +
        "umgekehrt, bloß weil ein Verein einen Platz vorweisen möchte.",
      rubricHint:
        "Bir ölçüt, kişisel bir deneyimle sınama ve karşı tarafa hak verme beklenir; „nicht, ob …, sondern wann“, Konjunktiv II ve „statt … zu“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g14",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "scheinen, drohen, pflegen",
    genre: "grammar",
    intro: "Bazı fiiller „zu“lu mastarla birleşince kendi anlamlarını kısmen bırakır ve modal fiil gibi bir tutum bildirir.",
    focus: "Yarı modal fiiller: scheinen, drohen, versprechen, pflegen, vermögen + zu",
    gloss: [
      { de: "wirken", tr: "etki etmek", en: "to take effect" },
      { de: "scheitern", tr: "başarısız olmak", en: "to fail" },
      { de: "vorhersagen", tr: "öngörmek", en: "to predict" },
      { de: "der Ausgang", tr: "sonuç", en: "outcome" },
      { de: "eskalieren", tr: "çığırından çıkmak", en: "to escalate" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "scheinen: bir izlenim",
        tr: "„scheinen + zu“ konuşanın izlenimini bildirir: öyle görünüyor ama emin değilim. Geçmişe dönük izlenimde mastar geçmişe konur: „Er scheint es gewusst zu haben.“ Tek başına „scheinen“ (ışımak) başka bir fiildir; yarı modal kullanımda hep „zu“lu mastar gelir.",
        examples: [
          { de: "Die Reform scheint zu wirken.", tr: "Reform işe yarıyor gibi görünüyor.", note: "şimdiki izlenim" },
          { de: "Der Trainer scheint das vergessen zu haben.", tr: "Antrenör bunu unutmuş görünüyor.", note: "geçmiş: Partizip II + zu haben" },
          { de: "Es scheint, als hätten die Eltern recht.", tr: "Aileler haklıymış gibi görünüyor.", note: "es scheint + als" },
        ],
      },
      {
        heading: "drohen ve versprechen: iki yönlü tahmin",
        tr: "„drohen + zu“ kötü bir gelişmenin yaklaştığını, „versprechen + zu“ iyi bir gelişmenin beklendiğini bildirir. Özne çoğunlukla bir insan değil bir durumdur. Bu kullanımda „drohen“ kimseyi tehdit etmez, „versprechen“ de kimseye söz vermez.",
        examples: [
          { de: "Das Projekt droht zu scheitern.", tr: "Proje başarısız olma tehlikesiyle karşı karşıya.", note: "olumsuz tahmin" },
          { de: "Die neue Saison verspricht spannend zu werden.", tr: "Yeni sezon heyecanlı geçecek gibi.", note: "olumlu tahmin" },
          { de: "Der Streit drohte zu eskalieren.", tr: "Tartışma kızışmak üzereydi.", note: "Präteritum" },
        ],
      },
      {
        heading: "pflegen ve vermögen: yazılı dilin biçimleri",
        tr: "„pflegen + zu“ bir alışkanlığı bildirir ve yazılı dile özgüdür. „vermögen + zu“ ise „können“in resmî karşılığıdır. İkisi de tek başına kullanılınca (den Rasen pflegen, das Vermögen) anlamı tamamen değişir; yarı modallığı „zu“lu mastar belirler.",
        examples: [
          { de: "Sie pflegt vor dem Spiel nichts zu essen.", tr: "Maçtan önce hiçbir şey yememek onun alışkanlığıdır.", note: "alışkanlık" },
          { de: "Niemand vermochte den Ausgang vorherzusagen.", tr: "Kimse sonucu önceden kestiremedi.", note: "= konnte" },
          { de: "Er pflegt den Rasen selbst.", tr: "Çimlere kendisi bakıyor.", note: "tam fiil: „zu“ yok" },
        ],
      },
    ],
    questions: [
      {
        text: "„Die Reform scheint zu wirken.“ — Was drückt der Satz aus?",
        options: [
          "einen Eindruck des Sprechers",
          "eine sichere Tatsache",
          "eine Absicht der Reform",
        ],
        answer: 0,
        explain: "„scheinen + zu“ kesinlik değil, konuşanın izlenimini bildirir.",
      },
      {
        text: "Welcher Satz sagt, dass etwas Schlechtes bevorsteht?",
        options: [
          "Die Saison verspricht spannend zu werden.",
          "Das Projekt droht zu scheitern.",
          "Er pflegt früh aufzustehen.",
        ],
        answer: 1,
        explain: "„drohen + zu“ kötü bir gelişmenin yaklaştığını söyler.",
      },
      {
        text: "Der Trainer scheint das vergessen ___.",
        options: ["hat", "haben zu", "zu haben"],
        answer: 2,
        explain: "Geçmişe dönük izlenimde „zu“ yardımcı fiilin önüne gelir: vergessen zu haben.",
      },
      {
        kind: "gapfill",
        text: "Die neue Saison ___ spannend zu werden. (versprechen)",
        options: [],
        answer: 0,
        accept: ["verspricht"],
        explain: "Olumlu bir tahmin „versprechen + zu“ ile kurulur; fiil özneye göre çekimlenir.",
      },
      {
        kind: "gapfill",
        text: "Der Streit ___ zu eskalieren. (drohen, Präteritum)",
        options: [],
        answer: 0,
        accept: ["drohte"],
        explain: "„drohen“ düzenli bir fiildir: drohte; tehlike o anda yaklaşıyordu.",
      },
      {
        kind: "gapfill",
        text: "Niemand ___ den Ausgang vorherzusagen. (vermögen, Präteritum)",
        options: [],
        answer: 0,
        accept: ["vermochte"],
        explain: "„vermögen“ düzensizdir: vermochte; anlamı „konnte“ ile aynıdır.",
      },
      {
        kind: "gapfill",
        text: "Sie pflegt vor dem Spiel nichts ___ essen.",
        options: [],
        answer: 0,
        accept: ["zu"],
        explain: "Alışkanlık anlamında „pflegen“ her zaman „zu“lu mastar ister.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das Projekt", "droht", "an den Kosten", "zu scheitern"],
        explain: "Yarı modal fiil ikinci sırada çekimlenir, „zu“lu mastar en sonda durur.",
      },
      {
        kind: "truefalse",
        text: "In „Das Projekt droht zu scheitern“ bedroht jemand das Projekt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Burada kimse tehdit etmiyor; „drohen“ yalnız kötü bir sonucun yaklaştığını bildiriyor.",
      },
      {
        kind: "truefalse",
        text: "„pflegen + zu“ drückt eine Gewohnheit aus.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Er pflegt früh aufzustehen“ onun alışkanlığını anlatır.",
      },
    ],
  },
];

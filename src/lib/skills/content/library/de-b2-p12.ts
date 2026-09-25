import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 12.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 12 zanaat ve onarım hattı: bir onarım kafesi üzerine yazı, bir
 * marangozla evde yapılan görüşme, bir atölyeye yazılan bilgi talebi. Dil
 * bilgisi kipli edilgen — modal fiil + Partizip II + „werden“, yan cümlede ve
 * geçmişte.
 */
export const deB2P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r12",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Die Werkstatt im Gemeindehaus",
    genre: "article",
    intro: "Bir onarım kafesini anlatan bir yazı: nasıl çalışıyor, neyi başarıyor ve nerede duruyor.",
    gloss: [
      { de: "das Werkzeug", tr: "alet", en: "tool" },
      { de: "der Schraubenzieher", tr: "tornavida", en: "screwdriver" },
      { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
      { de: "haften", tr: "sorumlu olmak", en: "to be liable" },
      { de: "kleben", tr: "yapıştırmak", en: "to glue" },
      { de: "der Hersteller", tr: "üretici", en: "manufacturer" },
    ],
    minutes: 8,
    text:
      "Die Werkstatt im Gemeindehaus\n\n" +
      "Jeden zweiten Samstag stehen im Gemeindehaus von Lindental sechs Tische mit Werkzeug, " +
      "Lötkolben und einer Nähmaschine. Wer einen kaputten Toaster, eine Lampe oder eine Hose " +
      "mit Loch mitbringt, bekommt hier Hilfe — kostenlos, aber nicht ohne Bedingung.\n\n" +
      "„Die wichtigste Regel ist, dass der Besitzer den Schraubenzieher selbst in der Hand hält“, " +
      "sagt Gerd Wallner, ein pensionierter Elektriker, der das Reparaturcafé vor vier Jahren " +
      "gegründet hat. „Wir erklären und zeigen, aber repariert werden muss das Gerät von dem, " +
      "dem es gehört.“ Das hat nicht nur pädagogische Gründe: So haftet niemand aus dem Team " +
      "für einen Schaden.\n\n" +
      "Etwa sechzig Prozent der Dinge verlassen den Raum wieder funktionsfähig. Oft muss nur " +
      "ein Kabel ersetzt oder ein Kontakt gereinigt werden. Schwieriger wird es bei neueren " +
      "Geräten. Viele sind geklebt statt geschraubt und können nicht geöffnet werden, ohne dass " +
      "sie dabei kaputtgehen. Für andere gibt es keine Ersatzteile, oder diese kosten mehr als " +
      "ein neues Gerät.\n\n" +
      "Eine Grenze zieht das Team selbst: Alles, was mit Gas arbeitet, darf hier nicht " +
      "repariert werden, auch wenn es technisch möglich wäre.\n\n" +
      "Wallner hat sich angewöhnt, nach jedem Termin die gescheiterten Fälle aufzuschreiben: " +
      "Gerät, Marke, Grund. „Die Liste schicke ich einmal im Jahr an die Hersteller“, sagt er. " +
      "„Geantwortet hat bisher einer.“",
    questions: [
      {
        text: "Was ist laut Wallner die wichtigste Regel?",
        options: [
          "Jedes Gerät wird vorher geprüft.",
          "Der Besitzer repariert selbst.",
          "Nur Elektrogeräte werden angenommen.",
        ],
        answer: 1,
        explain: "„dass der Besitzer den Schraubenzieher selbst in der Hand hält“ — ekip yalnız anlatıp gösteriyor.",
      },
      {
        text: "Warum sind neuere Geräte oft schwieriger?",
        options: [
          "Sie haben zu viele Kabel.",
          "Sie sind zu schwer zum Tragen.",
          "Sie lassen sich kaum öffnen.",
        ],
        answer: 2,
        explain: "Vidalı değil yapıştırılmış oldukları için kırılmadan açılamıyorlar.",
      },
      {
        kind: "truefalse",
        text: "Im Reparaturcafé werden auch Gasgeräte repariert, wenn es technisch geht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Ekip bu sınırı kendisi çiziyor: gazla çalışan hiçbir şey orada onarılmıyor.",
      },
      {
        kind: "gapfill",
        text: "Etwa ___ Prozent der Dinge funktionieren danach wieder.",
        options: [],
        answer: 0,
        accept: ["sechzig", "60"],
        explain: "„Etwa sechzig Prozent der Dinge verlassen den Raum wieder funktionsfähig.“",
      },
      {
        kind: "short_answer",
        text: "Wohin schickt Wallner die Liste der gescheiterten Fälle?",
        options: [],
        answer: 0,
        accept: ["an die Hersteller", "die Hersteller", "zu den Herstellern"],
        explain: "Listeyi yılda bir kez üreticilere gönderiyor.",
      },
      {
        text: "Was zeigt der letzte Satz?",
        options: [
          "Die Hersteller reagieren kaum.",
          "Die Liste hat viel bewirkt.",
          "Wallner will bald aufhören.",
        ],
        answer: 0,
        explain: "„Geantwortet hat bisher einer“ — üreticilerden neredeyse hiç yanıt gelmiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l12",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Die alten Fenster",
    genre: "dialogue",
    intro: "Bir ev sahibi, pencerelerine bakan marangozla konuşuyor: ne değiştirilmeli, ne kurtarılabilir, ne izne bağlı.",
    gloss: [
      { de: "der Tischler", tr: "marangoz", en: "carpenter" },
      { de: "der Rahmen", tr: "çerçeve", en: "frame" },
      { de: "austauschen", tr: "değiştirmek", en: "to replace" },
      { de: "der Denkmalschutz", tr: "tarihî eser koruma", en: "heritage protection" },
      { de: "genehmigen", tr: "onaylamak", en: "to approve" },
      { de: "der Kostenvoranschlag", tr: "fiyat teklifi", en: "cost estimate" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Frau Köhler", text: "Herr Brandt, danke, dass Sie so schnell kommen konnten. Die Fenster im ersten Stock schließen nicht mehr richtig, und im Winter zieht es überall." },
      { speaker: "Herr Brandt", text: "Ich habe mir alle zwölf angesehen. Die gute Nachricht: Das Holz ist bei zehn Fenstern noch gesund. Die müssen nicht ausgetauscht werden." },
      { speaker: "Frau Köhler", text: "Und die anderen zwei?" },
      { speaker: "Herr Brandt", text: "Bei denen ist der untere Rahmen verfault. Die könnten zwar geflickt werden, aber das würde fast so viel kosten wie ein neues Fenster." },
      { speaker: "Frau Köhler", text: "Mein Nachbar meint, ich sollte gleich alles durch Kunststofffenster ersetzen lassen. Das sei auf lange Sicht billiger." },
      { speaker: "Herr Brandt", text: "In den ersten Jahren vielleicht. Aber Ihr Haus steht unter Denkmalschutz. Da dürfen die Fenster nicht einfach durch Kunststoff ersetzt werden." },
      { speaker: "Herr Brandt", text: "Das müsste erst von der Stadt genehmigt werden, und bei Häusern wie Ihrem passiert das selten." },
      { speaker: "Frau Köhler", text: "Das wusste ich nicht. Was schlagen Sie also vor?" },
      { speaker: "Herr Brandt", text: "Die zehn guten Fenster werden abgeschliffen, neu gestrichen und bekommen neue Dichtungen. Die zwei schlechten baue ich neu, aus Holz und genau nach dem alten Muster." },
      { speaker: "Frau Köhler", text: "Und wie lange wird das dauern?" },
      { speaker: "Herr Brandt", text: "Etwa drei Wochen. Die neuen Fenster können aber erst im April eingebaut werden, weil die Farbe bei Frost nicht richtig trocknet." },
      { speaker: "Herr Brandt", text: "Den Kostenvoranschlag schicke ich Ihnen bis Freitag, dann können Sie in Ruhe vergleichen." },
    ],
    questions: [
      {
        text: "In welchem Zustand sind die meisten Fenster?",
        options: [
          "Das Holz ist noch gesund.",
          "Sie müssen ersetzt werden.",
          "Sie sind frisch gestrichen.",
        ],
        answer: 0,
        explain: "On pencerede ahşap hâlâ sağlam; „Die müssen nicht ausgetauscht werden.“",
      },
      {
        text: "Warum sind Kunststofffenster hier kaum möglich?",
        options: [
          "weil sie teurer sind als Holzfenster",
          "weil der Nachbar dagegen ist",
          "weil das Haus unter Denkmalschutz steht",
        ],
        answer: 2,
        explain: "Koruma altındaki bir evde plastik pencere belediyenin onayını ister ve bu onay nadiren çıkar.",
      },
      {
        kind: "truefalse",
        text: "Die zwei schlechten Fenster werden neu aus Holz gebaut.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die zwei schlechten baue ich neu, aus Holz und genau nach dem alten Muster.“",
      },
      {
        kind: "gapfill",
        text: "Bei zwei Fenstern ist der untere ___ verfault.",
        options: [],
        answer: 0,
        accept: ["Rahmen"],
        explain: "„Bei denen ist der untere Rahmen verfault.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann bekommt Frau Köhler den Kostenvoranschlag?",
        options: [],
        answer: 0,
        accept: ["bis Freitag", "Freitag", "am Freitag"],
        explain: "„Den Kostenvoranschlag schicke ich Ihnen bis Freitag.“",
      },
      {
        text: "Warum können die neuen Fenster erst im April eingebaut werden?",
        options: [
          "weil der Tischler vorher keine Zeit hat",
          "weil die Farbe bei Frost nicht trocknet",
          "weil die Genehmigung so lange dauert",
        ],
        answer: 1,
        explain: "„weil die Farbe bei Frost nicht richtig trocknet“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w12",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Anfrage an eine Tischlerei",
    genre: "email",
    intro: "Eski bir dolabı onartmak istiyorsun: önce iki cümle kur, sonra bir atölyeye açık ve ayrıntılı bir bilgi talebi yaz.",
    gloss: [
      { de: "der Schrank", tr: "dolap", en: "cupboard" },
      { de: "der Zustand", tr: "durum", en: "condition" },
      { de: "ersetzen", tr: "yenisiyle değiştirmek", en: "to replace" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "erreichbar", tr: "ulaşılabilir", en: "reachable" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bir kapıda menteşenin değiştirilmesi gerekiyor.",
        answer: "An einer Tür muss das Scharnier ersetzt werden.",
        alternatives: ["Das Scharnier an einer Tür muss ersetzt werden."],
        hint: "Kipli edilgen: modal fiil ikinci sırada, sonda Partizip II + „werden“.",
      },
      {
        kind: "build",
        tr: "Dolabın gelip alınması gerekip gerekmediğini bilmiyorum.",
        answer: "Ich weiß nicht, ob der Schrank abgeholt werden muss.",
        alternatives: ["Ob der Schrank abgeholt werden muss, weiß ich nicht."],
        hint: "Yan cümlede çekimli modal fiil en sona geçer: „abgeholt werden muss“.",
      },
      {
        kind: "free",
        prompt:
          "Büyükannenden kalan eski bir dolabı onartmak istiyorsun. Bir marangoz atölyesine e-posta yaz: eşyayı ve senin için değerini anlat, hasarları somut tarif et, hangi işlerin şart hangilerinin ertelenebilir olduğunu sor, masraf ve taşıma konusunu sor ve bir görüşme öner.",
        checklist: [
          "Eşyayı ve senin için değerini anlat",
          "Hasarları somut tarif et",
          "Şart olan ve ertelenebilecek işleri sor",
          "Masrafı ve taşımayı sor, bir görüşme öner",
        ],
        minWords: 120,
        phrases: [
          { de: "… und wende mich deshalb an Ihre Werkstatt.", tr: "… ve bu yüzden atölyenize başvuruyorum.", en: "… and am therefore contacting your workshop." },
          { de: "… ist in keinem guten Zustand.", tr: "… iyi durumda değil.", en: "… is not in good condition." },
          { de: "Welche Arbeiten müssen unbedingt gemacht werden?", tr: "Hangi işlerin mutlaka yapılması gerekiyor?", en: "Which work absolutely has to be done?" },
          { de: "Mit welchen Kosten muss ich ungefähr rechnen?", tr: "Aşağı yukarı ne kadar masraf beklemeliyim?", en: "Roughly what costs should I expect?" },
          { de: "Gern können Sie sich … vorher ansehen.", tr: "… önceden gelip bakabilirsiniz.", en: "You are welcome to look at … beforehand." },
        ],
        sample:
          "Sehr geehrte Damen und Herren, von meiner Großmutter habe ich einen Kleiderschrank aus Eichenholz " +
          "geerbt, der etwa hundert Jahre alt ist. Viel wert ist er wohl nicht, aber für mich hat er einen " +
          "persönlichen Wert. Ich möchte ihn gern wieder benutzen und wende mich deshalb an Ihre Werkstatt. " +
          "Leider ist der Schrank in keinem guten Zustand. Die linke Tür hängt schief und schließt nicht " +
          "mehr; ich vermute, dass dort das Scharnier ersetzt werden muss. Außerdem hat die Rückwand einen " +
          "langen Riss, und an einer Seite löst sich die Farbe. " +
          "Welche Arbeiten müssen unbedingt gemacht werden, und was könnte man auf später verschieben? " +
          "Mit welchen Kosten muss ich ungefähr rechnen? Unklar ist mir auch, ob der Schrank zu Ihnen in " +
          "die Werkstatt gebracht werden muss oder ob manches bei mir erledigt werden kann; er steht im " +
          "dritten Stock ohne Aufzug. " +
          "Gern können Sie sich den Schrank vorher ansehen. Ich bin werktags ab 15 Uhr erreichbar. " +
          "Mit freundlichen Grüßen, Jonas Weber",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s12",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Gehört Handwerk in jeden Lehrplan?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir ders önerisini savun ve en güçlü itiraza cevap ver.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Okullarda herkes için zorunlu bir atölye dersi olmalı mı? Bugünkü durumu kısaca değerlendir, bu derste neyin öğrenileceğini söyle, en güçlü itirazı ciddiye al ve dersin işlemesi için neyin gerektiğini anlat.",
      bulletsTr: [
        "Bugünkü durumu kısaca değerlendir",
        "Bu derste neyin öğrenileceğini söyle",
        "En güçlü itiraza cevap ver",
        "Dersin işlemesi için neyin gerektiğini anlat",
      ],
      targets: [
        { de: "Was dabei gelernt wird, lässt sich nicht …", tr: "Orada öğrenilen şey … olmaz" },
        { de: "Der naheliegende Einwand lautet, dass …", tr: "Akla ilk gelen itiraz şu: …" },
        { de: "Dem würde ich entgegenhalten, dass …", tr: "Buna karşı şunu söylerdim: …" },
        { de: "Damit das funktioniert, müssten … werden.", tr: "Bunun işlemesi için … gerekirdi" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "In der Schule lernt man, wie ein Gedicht aufgebaut ist, aber nicht, wie man ein Regal an die " +
        "Wand bringt. Ich finde, ein Werkstattfach gehört in jeden Lehrplan, und zwar nicht als Hobby, " +
        "sondern als Pflicht. Was dabei gelernt wird, lässt sich nicht aus einem Buch holen: dass Material " +
        "Widerstand leistet, dass man planen muss, bevor man sägt, und dass ein Fehler sichtbar bleibt. " +
        "Der naheliegende Einwand lautet, dass die Stundenpläne schon voll sind und Mathematik wichtiger ist. " +
        "Dem würde ich entgegenhalten, dass gerade die Werkstatt Mathematik brauchbar macht: Wer einen " +
        "Tisch baut, rechnet freiwillig und prüft sein Ergebnis mit dem Zollstock. " +
        "Damit das funktioniert, müssten allerdings Räume ausgestattet und Lehrkräfte ausgebildet werden, " +
        "und das kostet Geld. Ohne diese Investition würde ich das Fach lieber gar nicht einführen, denn " +
        "ein Werkraum ohne Werkzeug ist schlimmer als gar keiner.",
      rubricHint:
        "Somut bir öğrenme kazanımı ve itiraza gerçek bir cevap beklenir; „lässt sich nicht“, „entgegenhalten“ ve kipli edilgen („müssten … werden“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g12",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Das kann nicht repariert werden",
    genre: "grammar",
    intro: "Edilgen modal fiille birleşince üç fiil yan yana gelir; hangisi nerede durur, yan cümlede ve geçmişte ne değişir.",
    focus: "Kipli edilgen: modal fiil + Partizip II + werden, yan cümlede ve geçmişte",
    gloss: [
      { de: "ersetzen", tr: "yerine koymak", en: "to replace" },
      { de: "das Kabel", tr: "kablo", en: "cable" },
      { de: "das Gerät", tr: "cihaz", en: "device" },
      { de: "streichen", tr: "boyamak", en: "to paint" },
      { de: "flicken", tr: "yamamak", en: "to patch" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Kuruluş: modal + Partizip + werden",
        tr: "Etken cümledeki „Man muss das Kabel ersetzen“ edilgende „Das Kabel muss ersetzt werden“ olur. Modal fiil çekimlenir ve ikinci sırada durur; cümlenin sonuna asıl fiilin Partizip II'si ve mastar hâlinde „werden“ gelir. Yapanı söylemek gerekirse „von“ + Dativ eklenir.",
        examples: [
          { de: "Das Kabel muss ersetzt werden.", tr: "Kablonun değiştirilmesi gerekiyor.", note: "müssen: zorunluluk" },
          { de: "Gasgeräte dürfen hier nicht repariert werden.", tr: "Gazlı cihazların burada onarılması yasak.", note: "nicht dürfen: yasak" },
          { de: "Das Gerät kann von jedem geöffnet werden.", tr: "Cihazı herkes açabilir.", note: "von + Dativ: yapan" },
        ],
      },
      {
        heading: "Yan cümlede üç fiil",
        tr: "Yan cümlede çekimli modal fiil en sona geçer ve üç parçalı öbek oluşur: Partizip + werden + modal fiil. En sık yapılan hata, ana cümledeki gibi modal fiili ortada bırakmaktır.",
        examples: [
          { de: "Ich weiß nicht, ob das Fenster ersetzt werden muss.", tr: "Pencerenin değiştirilmesi gerekip gerekmediğini bilmiyorum.", note: "muss en sonda" },
          { de: "Er sagt, dass der Rahmen geflickt werden kann.", tr: "Çerçevenin yamanabileceğini söylüyor.", note: "kann en sonda" },
          { de: "Alles, was nicht repariert werden kann, kommt auf die Liste.", tr: "Onarılamayan her şey listeye giriyor.", note: "ilgi cümlesi de aynı" },
        ],
      },
      {
        heading: "Geçmişte: Präteritum ve Konjunktiv II",
        tr: "Geçmişte modal fiil Präteritum'a girer: „musste ersetzt werden“. Gerekli olup da yapılmamış bir şey için Konjunktiv II'nin geçmişi kullanılır: „hätte ersetzt werden müssen“. Burada modal fiil de mastar olur ve en sona geçer.",
        examples: [
          { de: "Das Kabel musste ersetzt werden.", tr: "Kablonun değiştirilmesi gerekti.", note: "Präteritum" },
          { de: "Der Toaster konnte nicht mehr gerettet werden.", tr: "Tost makinesi artık kurtarılamadı.", note: "können → konnte" },
          { de: "Das Fenster hätte früher gestrichen werden müssen.", tr: "Pencerenin daha önce boyanması gerekirdi.", note: "yapılmadı: hätte … müssen" },
        ],
      },
    ],
    questions: [
      {
        text: "„Man muss das Kabel ersetzen.“ — Wie lautet der Satz im Passiv?",
        options: [
          "Das Kabel muss ersetzen werden.",
          "Das Kabel wird ersetzt müssen.",
          "Das Kabel muss ersetzt werden.",
        ],
        answer: 2,
        explain: "Modal fiil ikinci sırada, sonda Partizip II („ersetzt“) ve mastar „werden“.",
      },
      {
        text: "Welcher Satz drückt ein Verbot aus?",
        options: [
          "Gasgeräte dürfen nicht repariert werden.",
          "Gasgeräte müssen nicht repariert werden.",
          "Gasgeräte können repariert werden.",
        ],
        answer: 0,
        explain: "„nicht dürfen“ yasak bildirir; „nicht müssen“ yalnız gerek olmadığını söyler.",
      },
      {
        text: "„Das Fenster hätte gestrichen werden müssen.“ — Was bedeutet das?",
        options: [
          "Das Fenster wird bald gestrichen.",
          "Es war nötig, ist aber nicht passiert.",
          "Es darf nicht gestrichen werden.",
        ],
        answer: 1,
        explain: "Geçmiş Konjunktiv II, gerekli olup da yapılmamış bir işi anlatır.",
      },
      {
        kind: "gapfill",
        text: "Das Gerät kann ohne Werkzeug nicht geöffnet ___.",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Kipli edilgende sona mastar hâlinde „werden“ gelir.",
      },
      {
        kind: "gapfill",
        text: "Ich weiß nicht, ob der Rahmen ersetzt werden ___. (müssen)",
        options: [],
        answer: 0,
        accept: ["muss"],
        explain: "Yan cümlede çekimli modal fiil en sona geçer: ersetzt werden muss.",
      },
      {
        kind: "gapfill",
        text: "Der Toaster ___ nicht mehr gerettet werden. (können, Präteritum)",
        options: [],
        answer: 0,
        accept: ["konnte"],
        explain: "Geçmişte modal fiil Präteritum'a girer: konnte … gerettet werden.",
      },
      {
        kind: "gapfill",
        text: "Das Fenster hätte früher gestrichen werden ___. (müssen)",
        options: [],
        answer: 0,
        accept: ["müssen"],
        explain: "„hätte“ ile kurulan geçmişte modal fiil mastar kalır: gestrichen werden müssen.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Er sagt,", "dass", "der Rahmen", "geflickt werden", "kann"],
        explain: "Yan cümlede sıra Partizip + werden + çekimli modal fiildir.",
      },
      {
        kind: "truefalse",
        text: "„Ich glaube, dass das Gerät kann repariert werden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yan cümlede modal fiil sona gider: „dass das Gerät repariert werden kann“.",
      },
      {
        kind: "truefalse",
        text: "„Das Kabel musste von einer Fachfirma ersetzt werden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Präteritum'da modal fiil ikinci sırada; yapan „von“ + Dativ ile veriliyor.",
      },
    ],
  },
];

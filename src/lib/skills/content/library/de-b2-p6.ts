import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 konut hattı: kira freni üzerine bir görüş yazısı, belediye meclisinin
 * komisyon toplantısı, bir denetim raporu. Dil bilgisi edilgenin yerine geçen
 * biçimler — B2'de edilgen artık tek kalıp değil, bir aile.
 */
export const deB2P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r6",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Die Bremse, die nicht bremst",
    genre: "opinion",
    intro: "Bir köşe yazısı kira frenini tartışıyor: ölçü doğru mu, yanlış olan kural mı uygulama mı.",
    gloss: [
      { de: "die Mietpreisbremse", tr: "kira freni", en: "rent cap" },
      { de: "die Ausnahme", tr: "istisna", en: "exception" },
      { de: "der Neubau", tr: "yeni yapı", en: "new build" },
      { de: "der Verstoß", tr: "ihlal", en: "violation" },
      { de: "nachweisen", tr: "kanıtlamak", en: "to prove" },
      { de: "die Behauptung", tr: "iddia", en: "claim" },
    ],
    minutes: 8,
    text:
      "Die Bremse, die nicht bremst\n\n" +
      "Seit acht Jahren gibt es die Mietpreisbremse, und seit acht Jahren streiten sich zwei Lager " +
      "über dieselbe Zahl. Die einen sagen, die Mieten seien trotzdem gestiegen, also wirke das " +
      "Instrument nicht. Die anderen halten dagegen, ohne die Regel wären sie stärker gestiegen. " +
      "Beide Behauptungen lassen sich mit den heutigen Daten kaum sauber nachweisen.\n\n" +
      "Interessanter ist eine dritte Frage, die selten gestellt wird: Warum berufen sich so " +
      "wenige Mieterinnen und Mieter überhaupt auf die Bremse? In einer Untersuchung aus dem " +
      "letzten Jahr kannten zwar achtundsechzig Prozent der Befragten das Wort, aber nur " +
      "neun Prozent wussten, dass die zu viel gezahlte Miete zurückgefordert werden kann.\n\n" +
      "Dazu kommt die lange Liste der Ausnahmen. Neubauten sind ausgenommen, umfassend " +
      "sanierte Wohnungen ebenfalls, und wer vorher schon mehr verlangt hat, darf das weiter tun. " +
      "Eine Regel mit so vielen Türen ist schwer durchzusetzen.\n\n" +
      "Das eigentliche Problem ist damit nicht der Preis, sondern das Verfahren. " +
      "Eine Mieterin, die sich beschwert, muss selbst aktiv werden, selbst rechnen und im " +
      "Zweifel selbst klagen — gegen jemanden, der über ihren nächsten Mietvertrag entscheidet.\n\n" +
      "Wer die Bremse verteidigen will, sollte deshalb weniger über Prozentzahlen reden und " +
      "mehr darüber, wer das Risiko trägt. Ein Verstoß, den niemand meldet, bleibt folgenlos, " +
      "und eine Regel ohne Folgen ist am Ende nur eine Empfehlung.",
    questions: [
      {
        text: "Wie bewertet der Text den Streit über die Zahlen?",
        options: [
          "Eine Seite hat eindeutig recht.",
          "Beide Behauptungen sind kaum sauber zu belegen.",
          "Die Zahlen sind gefälscht.",
        ],
        answer: 1,
        explain: "„Beide Behauptungen lassen sich mit den heutigen Daten kaum sauber nachweisen.“",
      },
      {
        text: "Welche Frage hält der Autor für wichtiger?",
        options: [
          "warum die Regel so selten genutzt wird",
          "warum Neubauten teurer sind",
          "warum die Mieten überhaupt steigen",
        ],
        answer: 0,
        explain: "„Warum berufen sich so wenige Mieterinnen und Mieter überhaupt auf die Bremse?“",
      },
      {
        kind: "truefalse",
        text: "Die meisten Befragten wussten, dass zu viel gezahlte Miete zurückgefordert werden kann.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yalnız yüzde dokuz biliyordu; yüzde altmış sekiz yalnız terimi duymuştu.",
      },
      {
        kind: "gapfill",
        text: "___ Prozent der Befragten kannten das Wort.",
        options: [],
        answer: 0,
        accept: ["Achtundsechzig", "achtundsechzig", "68"],
        explain: "„kannten zwar achtundsechzig Prozent der Befragten das Wort“.",
      },
      {
        kind: "short_answer",
        text: "Worüber sollte man laut Autor stattdessen reden?",
        options: [],
        answer: 0,
        accept: ["wer das Risiko trägt", "über das Risiko", "das Risiko"],
        explain: "„mehr darüber, wer das Risiko trägt“.",
      },
      {
        text: "Was meint der letzte Satz?",
        options: [
          "Ohne Kontrolle bleibt die Regel wirkungslos.",
          "Die Regel sollte abgeschafft werden.",
          "Empfehlungen wirken besser als Gesetze.",
        ],
        answer: 0,
        explain: "Kimsenin bildirmediği bir ihlal sonuçsuz kalıyor, kural da tavsiyeye dönüşüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l6",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Ausschuss: Wohnraum für Auszubildende",
    genre: "meeting",
    intro: "Belediye meclisinin komisyonu tartışıyor: çırak konutu için hangi seçenek, hangi bedelle.",
    gloss: [
      { de: "der Beschluss", tr: "karar", en: "resolution" },
      { de: "der Auszubildende", tr: "çırak", en: "apprentice" },
      { de: "das Grundstück", tr: "arsa", en: "plot of land" },
      { de: "die Förderung", tr: "destek", en: "subsidy" },
      { de: "die Belegung", tr: "kullanım", en: "occupancy" },
      { de: "befürworten", tr: "desteklemek", en: "to support" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Frau Dr. Winter", text: "Wir haben zwei Vorlagen. Erstens der Neubau auf dem städtischen Grundstück, zweitens die Anmietung von Wohnungen im Bestand." },
      { speaker: "Herr Feldmann", text: "Der Neubau ist zweifellos die sauberere Lösung, aber wir reden über frühestens vier Jahre. Die Azubis von heute sind dann fertig." },
      { speaker: "Frau Ünal", text: "Deshalb befürworte ich die Anmietung. Vierzig Wohnungen wären kurzfristig zu haben, und die Förderung läuft nur noch bis zum Jahresende." },
      { speaker: "Herr Feldmann", text: "Kurzfristig ja, aber wir zahlen dann dauerhaft Marktmiete und besitzen am Ende nichts." },
      { speaker: "Frau Dr. Winter", text: "Beides schließt sich nicht aus. Denkbar wäre, jetzt anzumieten und parallel zu bauen." },
      { speaker: "Frau Ünal", text: "Rechnerisch schon, politisch schwierig. Sobald wir vierzig Wohnungen haben, ist der Druck weg und der Neubau verschwindet in der Schublade." },
      { speaker: "Herr Feldmann", text: "Dann müsste der Beschluss beides binden: Anmietung nur, wenn der Bauantrag bis Juni eingereicht wird." },
      { speaker: "Frau Dr. Winter", text: "Das ließe sich formulieren. Ich lasse einen entsprechenden Entwurf vorbereiten und wir stimmen in der nächsten Sitzung ab." },
      { speaker: "Frau Ünal", text: "Einverstanden, solange die Belegung klar geregelt ist. Sonst wohnen dort in zwei Jahren keine Auszubildenden mehr." },
    ],
    questions: [
      {
        text: "Was ist Herrn Feldmanns Einwand gegen die Anmietung?",
        options: [
          "Sie dauert zu lange.",
          "Die Stadt zahlt dauerhaft Miete und besitzt nichts.",
          "Es gibt keine geeigneten Wohnungen.",
        ],
        answer: 1,
        explain: "„wir zahlen dann dauerhaft Marktmiete und besitzen am Ende nichts“.",
      },
      {
        text: "Warum drängt Frau Ünal auf eine schnelle Entscheidung?",
        options: [
          "Die Förderung läuft zum Jahresende aus.",
          "Das Grundstück wird verkauft.",
          "Die Mieten steigen im Januar.",
        ],
        answer: 0,
        explain: "„die Förderung läuft nur noch bis zum Jahresende“.",
      },
      {
        kind: "truefalse",
        text: "Der Ausschuss stimmt in dieser Sitzung ab.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„wir stimmen in der nächsten Sitzung ab“ — önce taslak hazırlanacak.",
      },
      {
        kind: "gapfill",
        text: "Der Bauantrag soll bis ___ eingereicht werden.",
        options: [],
        answer: 0,
        accept: ["Juni"],
        explain: "„Anmietung nur, wenn der Bauantrag bis Juni eingereicht wird“.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Wohnungen wären kurzfristig zu haben?",
        options: [],
        answer: 0,
        accept: ["vierzig", "40", "vierzig Wohnungen"],
        explain: "„Vierzig Wohnungen wären kurzfristig zu haben.“",
      },
      {
        text: "Welche Sorge äußert Frau Ünal zum Schluss?",
        options: [
          "dass die Kosten steigen",
          "dass dort später keine Auszubildenden mehr wohnen",
          "dass der Neubau zu klein wird",
        ],
        answer: 1,
        explain: "Kullanım kuralı net olmazsa iki yıl sonra orada çırak kalmayabilir.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w6",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Prüfbericht: Zwei Modelle im Vergleich",
    genre: "report",
    intro: "İki seçeneği karşılaştıran bir rapor yazıyorsun: önce iki cümle kur, sonra ölçütlerle değerlendir.",
    gloss: [
      { de: "das Kriterium", tr: "ölçüt", en: "criterion" },
      { de: "die Abwägung", tr: "tartma", en: "weighing up" },
      { de: "die Umsetzung", tr: "uygulama", en: "implementation" },
      { de: "die Empfehlung", tr: "tavsiye", en: "recommendation" },
      { de: "kurzfristig", tr: "kısa vadeli", en: "short-term" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bu çözüm kısa vadede uygulanabilir.",
        answer: "Diese Lösung lässt sich kurzfristig umsetzen.",
        alternatives: ["Diese Lösung ist kurzfristig umzusetzen."],
        hint: "„sich lassen + mastar“ edilgenin yerine geçer: „umgesetzt werden kann“ ile aynı anlam.",
      },
      {
        kind: "build",
        tr: "Maliyetler ancak ikinci yıldan itibaren karşılaştırılabilir.",
        answer: "Die Kosten sind erst ab dem zweiten Jahr zu vergleichen.",
        alternatives: ["Die Kosten lassen sich erst ab dem zweiten Jahr vergleichen."],
        hint: "„sein + zu + mastar“ da edilgen anlam taşır: „verglichen werden können“.",
      },
      {
        kind: "free",
        prompt:
          "İki seçeneği karşılaştıran kısa bir rapor yaz: raporun amacını söyle, üç ölçüt belirle, her seçeneği bu ölçütlere göre değerlendir, hangi bilginin eksik olduğunu yaz ve gerekçeli bir tavsiye ver.",
        checklist: [
          "Raporun amacını ve iki seçeneği yaz",
          "Üç ölçüt belirle ve iki seçeneği bunlara göre karşılaştır",
          "Hangi bilginin eksik olduğunu söyle",
          "Gerekçeli bir tavsiyeyle bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "Gegenstand dieses Berichts ist …", tr: "Bu raporun konusu …", en: "The subject of this report is …" },
          { de: "Als Kriterien wurden … herangezogen.", tr: "Ölçüt olarak … kullanıldı.", en: "The criteria used were …" },
          { de: "Variante A ist … überlegen, Variante B dagegen …", tr: "A seçeneği … üstün, B seçeneği ise …", en: "Option A is superior in …, whereas option B …" },
          { de: "Offen bleibt die Frage, ob …", tr: "… olup olmadığı açık kalıyor", en: "The question remains open whether …" },
          { de: "Empfohlen wird daher …", tr: "Bu yüzden … tavsiye edilir", en: "It is therefore recommended …" },
        ],
        sample:
          "Gegenstand dieses Berichts ist die Frage, wie die Stadt kurzfristig Wohnraum für Auszubildende " +
          "bereitstellen kann. Verglichen werden ein Neubau auf städtischem Grundstück (Variante A) und " +
          "die Anmietung von vierzig Wohnungen im Bestand (Variante B). " +
          "Als Kriterien wurden Zeit bis zur Verfügbarkeit, Kosten über zehn Jahre und Steuerbarkeit der " +
          "Belegung herangezogen. Variante B ist auf der Zeitachse klar überlegen: " +
          "Diese Lösung lässt sich kurzfristig umsetzen, während Variante A frühestens in vier Jahren wirkt. " +
          "Bei den Kosten kehrt sich das Bild um; die Kosten sind allerdings erst ab dem zweiten Jahr " +
          "seriös zu vergleichen, weil die Förderung im ersten Jahr beide Varianten verzerrt. " +
          "Bei der Belegung schneidet Variante A besser ab, da die Stadt als Eigentümerin die Vergabe " +
          "dauerhaft steuern kann. Offen bleibt die Frage, ob sich die vierzig Wohnungen über fünf Jahre " +
          "binden lassen. Empfohlen wird daher ein kombinierter Beschluss: Anmietung ab sofort, " +
          "verbunden mit der Auflage, den Bauantrag bis Juni einzureichen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s6",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Soll die Stadt selbst bauen?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir politika tercihini gerekçelendir ve kendi konumunu sınırla.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Belediyeler konut yapmalı mı, yoksa piyasadan kiralayıp mı dağıtmalı? Bir tarafı seç, iki gerekçe ver, en güçlü karşı görüşü söyle ve onu nasıl karşıladığını anlat.",
      bulletsTr: [
        "Tercihini tek cümleyle söyle",
        "İki farklı türden gerekçe ver",
        "En güçlü karşı görüşü dürüstçe aktar",
        "Karşı görüşe cevabını ve bir koşulunu söyle",
      ],
      targets: [
        { de: "Ich neige eindeutig zu …, und zwar aus zwei Gründen.", tr: "Açıkça …'e eğilimliyim, iki sebepten." },
        { de: "Der zweite Grund ist weniger offensichtlich: …", tr: "İkinci sebep daha az açık: …" },
        { de: "Das stärkste Gegenargument lautet, dass …", tr: "En güçlü karşı argüman şu: …" },
        { de: "Ich halte das für berechtigt, sehe aber …", tr: "Bunu haklı buluyorum ama … görüyorum" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Ich neige eindeutig zum eigenen Bauen, und zwar aus zwei Gründen. " +
        "Der erste ist banal: Wer besitzt, entscheidet, wer einzieht. Eine Stadt, die nur anmietet, " +
        "verliert diese Entscheidung in dem Moment, in dem der Vertrag ausläuft. " +
        "Der zweite Grund ist weniger offensichtlich: Öffentlicher Bestand wirkt auf den Markt, " +
        "auch auf Wohnungen, die gar nicht der Stadt gehören, weil er den Vergleichspreis mitbestimmt. " +
        "Das stärkste Gegenargument lautet, dass Bauen zu lange dauert und die Menschen, um die es " +
        "geht, in vier Jahren längst woanders sind. Ich halte das für berechtigt, sehe darin aber " +
        "kein Argument gegen den Bau, sondern eines für eine Brücke: anmieten, um die Lücke zu " +
        "schließen, und gleichzeitig bauen. Einer Anmietung würde ich nur dann zustimmen, " +
        "wenn der Beschluss den Bauantrag verbindlich mit einer Frist verknüpft. " +
        "Ohne diese Verknüpfung wird aus der Übergangslösung erfahrungsgemäß der Dauerzustand.",
      rubricHint:
        "İki farklı türden gerekçe, dürüst bir karşı argüman ve bir koşul beklenir; „und zwar“, „in dem Moment, in dem“ ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g6",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Das lässt sich machen",
    genre: "grammar",
    intro: "Edilgen tek kalıp değil: aynı anlamı veren üç yapı var ve yazıda hepsi kullanılıyor.",
    focus: "Edilgen yerine geçen biçimler: sich lassen, sein + zu, man",
    gloss: [
      { de: "die Lösung", tr: "çözüm", en: "solution" },
      { de: "umsetzen", tr: "uygulamak", en: "to implement" },
      { de: "vergleichen", tr: "karşılaştırmak", en: "to compare" },
      { de: "lösen", tr: "çözmek", en: "to solve" },
      { de: "die Frist", tr: "süre", en: "deadline" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "sich lassen + mastar",
        tr: "„Das kann gemacht werden“ yerine yazıda sık sık „Das lässt sich machen“ denir. Yapı etken görünür ama anlamı edilgendir ve içinde bir „können“ taşır. Özne, yapılan şeydir; yapan kişi söylenmez.",
        examples: [
          { de: "Die Lösung lässt sich kurzfristig umsetzen.", tr: "Çözüm kısa vadede uygulanabilir.", note: "= kann umgesetzt werden" },
          { de: "Das Problem lässt sich nicht mit Geld lösen.", tr: "Sorun parayla çözülemez.", note: "olumsuzu da aynı" },
          { de: "Diese Zahlen lassen sich leicht vergleichen.", tr: "Bu sayılar kolayca karşılaştırılabilir.", note: "çoğul: lassen sich" },
        ],
      },
      {
        heading: "sein + zu + mastar",
        tr: "„sein + zu + mastar“ da edilgen anlam verir ve bağlama göre „können“ ya da „müssen“ taşır. Resmî yazıda çok sık geçer: „Der Antrag ist bis Juni einzureichen“ — yani verilmesi GEREKİR.",
        examples: [
          { de: "Der Antrag ist bis Juni einzureichen.", tr: "Başvuru haziran ayına kadar verilmelidir.", note: "= muss eingereicht werden" },
          { de: "Die Kosten sind erst später zu vergleichen.", tr: "Maliyetler ancak sonra karşılaştırılabilir.", note: "= können verglichen werden" },
          { de: "Diese Frist ist nicht zu verlängern.", tr: "Bu süre uzatılamaz.", note: "olumsuzda genelde „können“" },
        ],
      },
      {
        heading: "man ve öteki seçenekler",
        tr: "En basit karşılık „man“dır ve konuşma diline en yakın olanıdır. Ayrıca „-bar“ sıfatları da aynı işi yapar: „lösbar“, „machbar“, „vergleichbar“. Seçim üsluptur: „man“ konuşmada, „sich lassen“ tarafsız yazıda, „sein + zu“ resmî metinde.",
        examples: [
          { de: "Man kann das Problem nicht mit Geld lösen.", tr: "Sorunu parayla çözemezsin.", note: "konuşma dili" },
          { de: "Das Problem ist nicht lösbar.", tr: "Sorun çözülebilir değil.", note: "-bar sıfatı" },
          { de: "Die Frist ist einzuhalten.", tr: "Süreye uyulmalıdır.", note: "resmî üslup" },
        ],
      },
    ],
    questions: [
      {
        text: "„Das kann leicht gemacht werden.“ — Welche Form sagt dasselbe?",
        options: ["Das lässt sich leicht machen.", "Das lässt leicht machen.", "Das ist leicht machen."],
        answer: 0,
        explain: "„sich lassen + mastar“ edilgen + können anlamını taşır; dönüşlü zamir zorunludur.",
      },
      {
        text: "Der Antrag ___ bis Juni einzureichen.",
        options: ["hat", "ist", "wird"],
        answer: 1,
        explain: "„sein + zu + mastar“ yapısı: ist einzureichen.",
      },
      {
        text: "Welcher Satz ist am formellsten?",
        options: [
          "Man muss die Frist einhalten.",
          "Die Frist lässt sich einhalten.",
          "Die Frist ist einzuhalten.",
        ],
        answer: 2,
        explain: "„sein + zu“ resmî metnin kalıbıdır; „man“ en konuşma dilidir.",
      },
      {
        kind: "gapfill",
        text: "Diese Zahlen ___ sich leicht vergleichen. (lassen)",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "Özne çoğul olduğu için fiil de çoğul çekilir: lassen sich.",
      },
      {
        kind: "gapfill",
        text: "Die Kosten sind erst später zu ___. (vergleichen)",
        options: [],
        answer: 0,
        accept: ["vergleichen"],
        explain: "„sein + zu“ yapısında fiil mastar hâlinde kalır.",
      },
      {
        kind: "gapfill",
        text: "Das Problem ist leider nicht ___. (lösen, -bar)",
        options: [],
        answer: 0,
        accept: ["lösbar"],
        explain: "-bar eki „yapılabilir“ anlamı veren sıfat kurar: lösbar.",
      },
      {
        kind: "gapfill",
        text: "Die Lösung ___ sich kurzfristig umsetzen. (lassen)",
        options: [],
        answer: 0,
        accept: ["lässt"],
        explain: "Tekil özne: lässt sich umsetzen.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Diese", "Frist", "ist", "nicht", "zu verlängern"],
        explain: "„sein“ ikinci sırada, „zu + mastar“ cümlenin sonunda durur.",
      },
      {
        kind: "truefalse",
        text: "„Das lässt leicht machen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Dönüşlü zamir eksik; doğrusu „Das lässt sich leicht machen.“",
      },
      {
        kind: "truefalse",
        text: "„Der Antrag ist bis Juni einzureichen.“ — Bu cümle bir zorunluluk bildiriyor mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Bu bağlamda „sein + zu“ „müssen“ anlamı taşır: verilmesi gerekir.",
      },
    ],
  },
];

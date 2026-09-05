import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 10 — "Kim söylüyor, ne kazanıyor?".
 *
 * Dört ders: Im eigenen Podcast · Vierte Gewalt · Werbung oder Meinung? ·
 * Die Ente. Ünite 9 iddianın kaynağını işaretlemeyi öğretti; onuncu ünite
 * kaynağın çıkarını soruyor. Aynı cümle, para kimden geliyorsa başka anlama
 * geliyor.
 *
 *   Ünite 10: die Plattform, der Nutzer, die Zielgruppe, sich widmen,
 *             verlinken, unterhaltsam, abwechslungsreich, eintönig ·
 *             die Pressefreiheit, unabhängig, die Zensur, recherchieren,
 *             die Quelle, die Berichterstattung, objektiv, tendenziös ·
 *             die Reichweite, glaubwürdig, die Kennzeichnung, der Werbespot,
 *             die Kampagne, der Slogan, werben, irreführend ·
 *             die Falschmeldung, die Behauptung, die Fehlinformation,
 *             die Glaubwürdigkeit, die Medienkompetenz, der Skandal,
 *             manipulieren, aufdecken
 *   Kalıplar: Thema der heutigen Folge ist … · Es dürfte klar sein, dass … ·
 *             … sollen … behaupten · die beworbenen Produkte ·
 *             gekennzeichnet werden müssen · Es wurde behauptet, … sei … ·
 *             Tatsächlich aber …
 *
 * dürfte burada zorunluluk değil tahmin bildiriyor — Türkçedeki "olsa gerek"
 * karşılığı. Bu kullanım B2'nin en sık gözden kaçan öznel kip anlamı.
 */
export const b2U10: SkillExercise[] = [
  {
    id: "b2-u10-r1",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "Wozu eine vierte Gewalt?",
    genre: "Deneme",
    intro: "Basın özgürlüğünün ne işe yaradığını anlatan bir yazı. Tahmin bildiren kipleri ayır.",
    gloss: [
      { de: "die Pressefreiheit", tr: "basın özgürlüğü", en: "freedom of the press" },
      { de: "unabhängig", tr: "bağımsız", en: "independent" },
      { de: "die Zensur", tr: "sansür", en: "censorship" },
      { de: "recherchieren", tr: "araştırmak", en: "to research" },
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "die Berichterstattung", tr: "habercilik", en: "coverage" },
      { de: "objektiv", tr: "nesnel", en: "objective" },
      { de: "tendenziös", tr: "taraflı", en: "biased" },
    ],
    minutes: 6,
    text:
      "WOZU EINE VIERTE GEWALT?\n\n" +
      "Es dürfte klar sein, dass niemand eine Zeitung braucht, die schreibt, was ohnehin alle wissen. Presse wird erst dort nützlich, wo jemand etwas lieber nicht gedruckt sähe.\n\n" +
      "Deshalb ist Pressefreiheit kein Geschenk an Journalisten, sondern eine Einrichtung für alle anderen. Sie funktioniert nur, wenn Redaktionen unabhängig arbeiten können: unabhängig vom Staat, aber auch von den Firmen, die Anzeigen schalten. Das zweite ist heute oft das schwierigere.\n\n" +
      "Zensur im klassischen Sinn — ein Amt, das Texte vor dem Druck streicht — gibt es in Deutschland nicht. Die wirksamere Form ist leiser: Wer nicht recherchieren kann, weil die Redaktion aus vier Leuten besteht und täglich zwanzig Meldungen liefern muss, schreibt am Ende ab, was ihm zugeschickt wird. Man braucht keine Streichung, wenn nie jemand nachfragt.\n\n" +
      "Manche sollen behaupten, Journalismus müsse objektiv sein. Das ist ein Missverständnis. Eine Auswahl ist nie objektiv — schon die Entscheidung, worüber berichtet wird, ist eine Wertung. Was man verlangen kann, ist etwas anderes: dass die Quelle genannt wird, dass Gegenpositionen vorkommen und dass eine tendenziöse Berichterstattung als Meinung gekennzeichnet ist.\n\n" +
      "Wie erkennt man das als Leser? An drei Fragen. Wer sagt es? Woher weiß er es? Und was hätte er davon, wenn ich es glaube? Wer diese drei Fragen stellt, braucht kein Medienstudium.",
    questions: [
      {
        kind: "gapfill",
        text: "Es ___ klar sein, dass niemand eine Zeitung braucht, die nur Bekanntes schreibt.",
        options: [],
        answer: 0,
        accept: ["dürfte"],
        explain: "dürfte burada izin değil TAHMİN bildirir: 'olsa gerek'. Öznel kip anlamı.",
      },
      {
        text: "Welche Unabhängigkeit ist laut Text heute schwieriger?",
        options: [
          "die vom Staat",
          "die von den Firmen, die Anzeigen schalten",
          "die von den Lesern",
        ],
        answer: 1,
        explain: "„…aber auch von den Firmen, die Anzeigen schalten. Das zweite ist heute oft das schwierigere.“",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Text die wirksamere Form der Zensur?",
        options: [],
        answer: 0,
        accept: ["fehlende Zeit zum Recherchieren", "keine Zeit zu recherchieren", "zu wenig Personal"],
        explain: "„Wer nicht recherchieren kann … schreibt am Ende ab, was ihm zugeschickt wird.“",
      },
      {
        text: "Was kann man laut Text von Journalismus verlangen?",
        options: [
          "dass er objektiv ist",
          "dass die Quelle genannt wird und Gegenpositionen vorkommen",
          "dass er keine Meinung enthält",
        ],
        answer: 1,
        explain: "„…dass die Quelle genannt wird, dass Gegenpositionen vorkommen und dass eine tendenziöse Berichterstattung als Meinung gekennzeichnet ist.“",
      },
      {
        text: "Eine Auswahl von Themen kann objektiv sein.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Eine Auswahl ist nie objektiv — schon die Entscheidung, worüber berichtet wird, ist eine Wertung.“",
      },
    ],
  },

  {
    id: "b2-u10-r2",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "Werbung oder Meinung?",
    genre: "Tüketici bilgilendirmesi",
    intro: "Bir tüketici derneğinin sosyal medya reklamları üzerine bilgilendirme metni.",
    gloss: [
      { de: "die Reichweite", tr: "erişim", en: "reach" },
      { de: "glaubwürdig", tr: "inandırıcı", en: "credible" },
      { de: "die Kennzeichnung", tr: "etiketleme", en: "labelling" },
      { de: "der Werbespot", tr: "reklam filmi", en: "advertising spot" },
      { de: "die Kampagne", tr: "kampanya", en: "campaign" },
      { de: "der Slogan", tr: "slogan", en: "slogan" },
      { de: "werben", tr: "reklam yapmak", en: "to advertise" },
      { de: "irreführend", tr: "yanıltıcı", en: "misleading" },
    ],
    minutes: 6,
    text:
      "WERBUNG ODER MEINUNG? WAS SIE WISSEN SOLLTEN\n\n" +
      "Ein klassischer Werbespot ist leicht zu erkennen: Er dauert dreißig Sekunden, hat einen Slogan und läuft zwischen zwei Sendungen. Niemand verwechselt ihn mit einer Empfehlung von Freunden.\n\n" +
      "Anders in sozialen Netzwerken. Dort erscheint das beworbene Produkt mitten in einem Beitrag, der aussieht wie jeder andere. Genau darin liegt sein Wert: Eine als Meinung gelesene Empfehlung wirkt stärker als jede Anzeige. Deshalb wird für Reichweite bezahlt, nicht für Zuschauerzahlen im alten Sinn.\n\n" +
      "Die Rechtslage ist eindeutig. Bezahlte Beiträge müssen gekennzeichnet werden, und zwar am Anfang, nicht am Ende und nicht versteckt zwischen zwanzig Schlagwörtern. Eine unklare oder nachgeschobene Kennzeichnung gilt als irreführend.\n\n" +
      "Was tun Unternehmen stattdessen? Sie schicken Produkte ohne Vertrag. Wer nichts bekommen hat außer einem Paket, muss nach der geltenden Rechtsprechung trotzdem kennzeichnen, sobald ein Gegenwert im Spiel ist — aber die Grenze ist unscharf, und in dieser Unschärfe läuft ein großer Teil der Kampagnen.\n\n" +
      "Unser Rat ist einfach. Prüfen Sie nicht, ob jemand glaubwürdig wirkt — das ist genau die Eigenschaft, für die bezahlt wird. Prüfen Sie stattdessen, ob dieselbe Person je etwas kritisiert hat. Wer seit zwei Jahren für alles wirbt und nie abrät, sagt Ihnen mit dieser Bilanz mehr als jede Kennzeichnung.",
    questions: [
      {
        text: "Warum wirkt Werbung in sozialen Netzwerken stärker?",
        options: [
          "weil sie länger dauert",
          "weil eine als Meinung gelesene Empfehlung stärker wirkt",
          "weil sie billiger ist",
        ],
        answer: 1,
        explain: "„Eine als Meinung gelesene Empfehlung wirkt stärker als jede Anzeige.“",
      },
      {
        kind: "gapfill",
        text: "Bezahlte Beiträge müssen gekennzeichnet ___.",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Kipli edilgen: müssen + ortaç + werden.",
      },
      {
        kind: "short_answer",
        text: "Wo muss die Kennzeichnung stehen?",
        options: [],
        answer: 0,
        accept: ["am Anfang", "gleich am Anfang", "zu Beginn"],
        explain: "„…und zwar am Anfang, nicht am Ende und nicht versteckt.“",
      },
      {
        text: "Was empfiehlt der Text den Leserinnen und Lesern?",
        options: [
          "zu prüfen, ob jemand glaubwürdig wirkt",
          "zu prüfen, ob dieselbe Person je etwas kritisiert hat",
          "soziale Netzwerke zu meiden",
        ],
        answer: 1,
        explain: "„Prüfen Sie stattdessen, ob dieselbe Person je etwas kritisiert hat.“",
      },
      {
        text: "Wer ein Produkt geschenkt bekommt, muss nie kennzeichnen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…muss nach der geltenden Rechtsprechung trotzdem kennzeichnen, sobald ein Gegenwert im Spiel ist.“",
      },
    ],
  },

  {
    id: "b2-u10-l1",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "Folge sieben",
    genre: "Diyalog",
    intro: "İki kişi kendi podcast'lerinin yeni bölümünü planlıyor.",
    gloss: [
      { de: "die Plattform", tr: "platform", en: "platform" },
      { de: "der Nutzer", tr: "kullanıcı", en: "user" },
      { de: "die Zielgruppe", tr: "hedef kitle", en: "target audience" },
      { de: "sich widmen", tr: "kendini adamak", en: "to devote oneself" },
      { de: "verlinken", tr: "bağlantı vermek", en: "to link" },
      { de: "unterhaltsam", tr: "eğlenceli", en: "entertaining" },
      { de: "abwechslungsreich", tr: "çeşitli", en: "varied" },
      { de: "eintönig", tr: "tekdüze", en: "monotonous" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sami", text: "Thema der heutigen Folge ist Wohnen. Aber wir müssen den Aufbau ändern." },
      { speaker: "Ela", text: "Warum? Folge sechs lief gut." },
      { speaker: "Sami", text: "Die Zahlen ja. Aber drei Nutzer haben geschrieben, der Mittelteil sei eintönig." },
      { speaker: "Ela", text: "Weil wir uns zwanzig Minuten am Stück einem einzigen Punkt widmen." },
      { speaker: "Sami", text: "Genau. Abwechslungsreicher wäre: kurzer Bericht, dann Gespräch, dann Frage." },
      { speaker: "Ela", text: "Und wer ist eigentlich unsere Zielgruppe? Wir haben das nie festgelegt." },
      { speaker: "Sami", text: "Leute zwischen fünfundzwanzig und vierzig, die zum ersten Mal umziehen." },
      { speaker: "Ela", text: "Dann sollten wir weniger erklären und mehr Beispiele bringen." },
      { speaker: "Sami", text: "Einverstanden. Unterhaltsam heißt nicht albern, es heißt: nicht zäh." },
      { speaker: "Ela", text: "Verlinken wir die Mietrechtsstelle in der Beschreibung?" },
      { speaker: "Sami", text: "Ja, und diesmal ganz oben. Auf der Plattform sieht sonst niemand den Link." },
      { speaker: "Ela", text: "Gut. Aufnahme Donnerstag, Schnitt Freitag?" },
      { speaker: "Sami", text: "Passt. Und wir bleiben unter dreißig Minuten, das war der andere Wunsch." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Sami'nin bölümün konusunu duyurduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Thema der heutigen Folge ist Wohnen."],
        explain: "Adlaştırılmış açılış: fiil yerine ad öbeği. Sunum dilinin standart kalıbı.",
      },
      {
        text: "Was kritisierten drei Nutzer?",
        options: [
          "die Länge der Folge",
          "dass der Mittelteil eintönig sei",
          "die Tonqualität",
        ],
        answer: 1,
        explain: "„…drei Nutzer haben geschrieben, der Mittelteil sei eintönig.“",
      },
      {
        kind: "short_answer",
        text: "Wer ist die Zielgruppe?",
        options: [],
        answer: 0,
        accept: ["Leute zwischen 25 und 40", "Erstumziehende", "junge Menschen beim Umzug"],
        explain: "„Leute zwischen fünfundzwanzig und vierzig, die zum ersten Mal umziehen.“",
      },
      {
        text: "Wo soll der Link stehen?",
        options: ["ganz oben in der Beschreibung", "am Ende der Folge", "gar nicht"],
        answer: 0,
        explain: "„Ja, und diesmal ganz oben. Auf der Plattform sieht sonst niemand den Link.“",
      },
      {
        text: "Die Folge soll länger als dreißig Minuten werden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Und wir bleiben unter dreißig Minuten, das war der andere Wunsch.“",
      },
    ],
  },

  {
    id: "b2-u10-l2",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "Das mit dem Wasser stimmt nicht",
    genre: "Diyalog",
    intro: "Bir yalan haber konuşuluyor. İddia ile gerçeği ayır.",
    gloss: [
      { de: "die Falschmeldung", tr: "yalan haber", en: "false report" },
      { de: "die Behauptung", tr: "iddia", en: "claim" },
      { de: "die Fehlinformation", tr: "yanlış bilgi", en: "misinformation" },
      { de: "die Glaubwürdigkeit", tr: "inandırıcılık", en: "credibility" },
      { de: "die Medienkompetenz", tr: "medya okuryazarlığı", en: "media literacy" },
      { de: "der Skandal", tr: "skandal", en: "scandal" },
      { de: "manipulieren", tr: "manipüle etmek", en: "to manipulate" },
      { de: "aufdecken", tr: "ortaya çıkarmak", en: "to uncover" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ferit", text: "Hast du das gelesen? Angeblich ist das Leitungswasser hier belastet." },
      { speaker: "Ute", text: "Ich habe es gesehen. Es wurde behauptet, der Wert sei zehnmal zu hoch." },
      { speaker: "Ferit", text: "Zehnmal! Das wäre ein Skandal." },
      { speaker: "Ute", text: "Wäre es. Tatsächlich aber steht in dem Bericht, auf den sich alle beziehen, etwas anderes." },
      { speaker: "Ferit", text: "Nämlich?" },
      { speaker: "Ute", text: "Ein Einzelwert an einer Baustelle lag über dem Grenzwert. Eine Probe, ein Tag." },
      { speaker: "Ferit", text: "Und aus dieser Behauptung wird eine Falschmeldung für die ganze Stadt." },
      { speaker: "Ute", text: "So entsteht Fehlinformation meistens: nicht erfunden, sondern falsch verallgemeinert." },
      { speaker: "Ferit", text: "Wer hat das aufgedeckt?" },
      { speaker: "Ute", text: "Ein Lokalreporter, der einfach den Originalbericht gelesen hat. Mehr war nicht nötig." },
      { speaker: "Ferit", text: "Das Bild dazu sah trotzdem echt aus." },
      { speaker: "Ute", text: "Das Bild ist echt, nur drei Jahre alt. Man muss nichts manipulieren, um zu täuschen." },
      { speaker: "Ferit", text: "Und jetzt? Die Leute kaufen schon Flaschen." },
      { speaker: "Ute", text: "Jetzt kostet es Glaubwürdigkeit — und zeigt, wozu Medienkompetenz gut ist." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ute'nin ortadaki iddiayı aktardığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Es wurde behauptet, der Wert sei zehnmal zu hoch."],
        explain: "Edilgen artı Konjunktiv I: iddia aktarılıyor, sahiplenilmiyor.",
      },
      {
        text: "Was stand tatsächlich im Bericht?",
        options: [
          "dass die ganze Stadt betroffen ist",
          "dass ein Einzelwert an einer Baustelle über dem Grenzwert lag",
          "dass alles unbedenklich ist",
        ],
        answer: 1,
        explain: "„Ein Einzelwert an einer Baustelle lag über dem Grenzwert. Eine Probe, ein Tag.“",
      },
      {
        kind: "short_answer",
        text: "Wie entsteht Fehlinformation laut Ute meistens?",
        options: [],
        answer: 0,
        accept: ["durch falsche Verallgemeinerung", "falsch verallgemeinert", "nicht erfunden sondern verallgemeinert"],
        explain: "„…nicht erfunden, sondern falsch verallgemeinert.“",
      },
      {
        text: "Was stimmt am Bild nicht?",
        options: [
          "Es ist bearbeitet.",
          "Es ist drei Jahre alt.",
          "Es zeigt eine andere Stadt.",
        ],
        answer: 1,
        explain: "„Das Bild ist echt, nur drei Jahre alt. Man muss nichts manipulieren, um zu täuschen.“",
      },
      {
        text: "Ein Lokalreporter hat die Sache aufgeklärt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ein Lokalreporter, der einfach den Originalbericht gelesen hat.“",
      },
    ],
  },

  {
    id: "b2-u10-w1",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "Tahmin mi, iddia mı?",
    genre: "Cümle kurma",
    intro: "dürfte tahmindir, sollen başkasının iddiasıdır — ve ortaç sıfatı cümleyi kısaltır.",
    gloss: [
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "werben", tr: "reklam yapmak", en: "to advertise" },
      { de: "die Kennzeichnung", tr: "etiketleme", en: "labelling" },
      { de: "die Behauptung", tr: "iddia", en: "claim" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kaynağın adının anılması gerektiği açık olsa gerek.",
        answer: "Es dürfte klar sein, dass die Quelle genannt werden muss",
        hint: "dürfte tahmin bildirir; yan cümlede kipli edilgen sona düşer.",
      },
      {
        kind: "build",
        tr: "Bazıları gazeteciliğin nesnel olması gerektiğini iddia ediyormuş.",
        answer: "Manche sollen behaupten, Journalismus müsse objektiv sein",
        hint: "sollen başkasının iddiasını işaretler; aktarılan sözde Konjunktiv I.",
      },
      {
        kind: "build",
        tr: "Reklamı yapılan ürünler etiketlenmek zorunda.",
        answer: "Die beworbenen Produkte müssen gekennzeichnet werden",
        hint: "Ortaç II sıfatı artikel ile ad arasına girer ve edilgen anlam taşır.",
      },
      {
        kind: "build",
        tr: "Değerin on kat yüksek olduğu iddia edildi.",
        answer: "Es wurde behauptet, der Wert sei zehnmal zu hoch",
        hint: "Edilgen artı Konjunktiv I: iddia aktarılıyor, sahiplenilmiyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi öznel kip ile yaz: bilgi başkasına ait olsun.",
        source: "Nach Angaben mehrerer Nutzer ist der Mittelteil zu lang.",
        answer: "Der Mittelteil soll zu lang sein.",
        alternatives: ["Der Mittelteil soll zu lang sein"],
        why: "sollen öznel kip olarak 'başkaları öyle diyor' anlamına gelir ve 'nach Angaben von …' gibi uzun bir kaynak belirtecinin yerini tek kelimeyle tutar. Türkçedeki '-mış' ekiyle işlevi neredeyse aynı; fark, Almancanın bu işi kip fiiline yüklemesi.",
      },
    ],
  },

  {
    id: "b2-u10-w2",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "Die Richtigstellung",
    genre: "Düzeltme metni",
    intro: "Yayılmış bir yanlış bilgiyi düzelt — iddiayı, gerçeği ve kaynağı ayrı ayrı ver.",
    gloss: [
      { de: "die Falschmeldung", tr: "yalan haber", en: "false report" },
      { de: "die Fehlinformation", tr: "yanlış bilgi", en: "misinformation" },
      { de: "aufdecken", tr: "ortaya çıkarmak", en: "to uncover" },
      { de: "die Glaubwürdigkeit", tr: "inandırıcılık", en: "credibility" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Çevrende yayılmış bir yanlış bilgiyi düzelten kısa bir metin yaz — mahalle grubuna, iş yerine ya da bir topluluğa. Dört adımı ayrı tut: ortada dolaşan iddia, iddianın nereden geldiği, gerçekte ne olduğu ve okuyanın bundan sonra ne yapması gerektiği. İddiayı aktarırken Konjunktiv I ya da soll kullan, gerçeği düz haber cümlesiyle ver. Suçlayıcı olma; amaç kimseyi mahcup etmek değil, bilgiyi düzeltmek.",
        checklist: [
          "İddia ile gerçek açıkça ayrılmış mı?",
          "İddia aktarılırken Konjunktiv I ya da soll kullanıldı mı?",
          "Kaynak ya da kaynağın eksikliği söylendi mi?",
          "Sonda somut bir öneri var mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Es wurde behauptet, … sei …", tr: "… olduğu iddia edildi", en: "it was claimed that … was …" },
          { de: "Tatsächlich aber …", tr: "gerçekte ise …", en: "in fact, however, …" },
          { de: "Die Quelle dafür fehlt.", tr: "buna dair kaynak yok", en: "there is no source for this" },
        ],
        sample:
          "Kurz zur Sache mit dem Leitungswasser.\n\n" +
          "Seit gestern kursiert bei uns die Behauptung, das Wasser sei belastet; der Wert soll zehnmal über dem Grenzwert liegen. Verbreitet wurde das über einen Beitrag mit einem Foto von einer Baustelle.\n\n" +
          "Woher stammt das? Aus einem echten Prüfbericht der Stadt — aber nicht aus dem, was dort steht. Der Bericht nennt einen einzelnen Messwert an einer Baustelle, an einem Tag, an einer Zapfstelle. Von der Versorgung der Stadt ist darin nirgends die Rede. Das Foto ist ebenfalls echt und drei Jahre alt.\n\n" +
          "Tatsächlich liegen alle anderen Proben unter dem Grenzwert; der Bericht ist öffentlich und zwei Seiten lang. Aufgedeckt hat das ein Lokalreporter, der ihn einfach gelesen hat.\n\n" +
          "Was das heißt: Niemand muss Flaschen kaufen. Und bevor wir so etwas weitergeben, lohnt ein Blick in die Quelle — sonst kostet es am Ende die Glaubwürdigkeit derer, die es gut meinen.",
      },
    ],
  },
];

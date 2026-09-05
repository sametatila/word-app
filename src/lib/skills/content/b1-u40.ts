import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 40 — "İş bulmak, iş kurmak, işten memnun olmak" (dersler 157–160).
 *
 * Dersler: Stellensuche · Ein Projekt präsentieren · Selbstständig ·
 * Arbeitszufriedenheit.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   mir ist langweilig  Türkçe 'sıkılıyorum' der ve özne kişidir, o yüzden
 *                       Almancada "ich bin langweilig" çıkıyor — ama bu
 *                       "ben sıkıcıyım" demektir. Anlam tam tersine
 *                       dönüyor ve cümle dilbilgisel olarak kusursuz
 *                       kaldığı için kimse düzeltmiyor. Doğrusu
 *                       "mir ist langweilig" ya da "ich langweile mich".
 *   die meisten +       'çoğu', 'birkaç', 'birçok' Türkçede ismi tekil
 *   çoğul               bırakır ('çoğu çalışan'). Almancada bu belirteçler
 *                       ÇOĞUL ister: isim çoğul olur, sıfat -en alır ve
 *                       fiil de çoğul çekilir — die meisten Angestellten
 *                       sind zufrieden.
 *
 * Yeni 32 kelime: die Arbeitsstelle, der Arbeiter, der Bauer,
 * die Bestätigung, der Kandidat, das Vorstellungsgespräch, die Umfrage,
 * üblich, die Studie, analysieren, erstellen, enthalten, insgesamt,
 * ausreichend, gering, häufig, gründen, produzieren, der Handel, handeln,
 * die Aktion, garantieren, fällig, weltweit, anstrengend, sich langweilen,
 * die Langeweile, sich bemühen, angenehm, gewohnt, körperlich, nebenbei.
 */
export const b1U40: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u40-r1",
    level: "B1",
    skill: "reading",
    unit: 40,
    title: "Vom Brief zum Vertrag",
    genre: "İş arama rehberi",
    intro: "Bir başvurunun aşamaları. Ne zaman ne beklenir?",
    minutes: 5,
    gloss: [
      { de: "die Arbeitsstelle", tr: "iş yeri / kadro", en: "job" },
      { de: "der Kandidat", tr: "aday", en: "candidate" },
      { de: "das Vorstellungsgespräch", tr: "iş görüşmesi", en: "job interview" },
      { de: "die Bestätigung", tr: "teyit", en: "confirmation" },
      { de: "üblich", tr: "alışılmış", en: "customary" },
    ],
    text:
      "Zwischen Brief und Vertrag liegen meistens vier Wochen. Wer nach " +
      "zehn Tagen nichts hört, sollte sich nicht sofort Sorgen machen — " +
      "das ist üblich.\n\n" +
      "Nach dem Brief kommt eine kurze Bestätigung, oft automatisch. " +
      "Sie sagt nur, dass Ihr Brief angekommen ist, sonst nichts. " +
      "Danach wird sortiert, und erst dann werden Kandidaten eingeladen.\n\n" +
      "Beim Vorstellungsgespräch fragen die meisten Betriebe dasselbe: " +
      "warum diese Arbeitsstelle, warum Sie, was können Sie nicht. " +
      "Die dritte Frage ist die wichtigste, und viele Kandidaten bemühen " +
      "sich, nicht darauf zu antworten. Das fällt auf.\n\n" +
      "Fragen Sie am Ende selbst etwas. Nicht zum Gehalt, sondern zur " +
      "Arbeit: wie sieht ein normaler Tag aus, wer war vorher auf der " +
      "Stelle. Antworten darauf sagen mehr als jede Anzeige.",
    questions: [
      {
        text: "Wie lange dauert es meistens?",
        options: ["Vier Wochen", "Zehn Tage", "Ein halbes Jahr"],
        answer: 0,
        explain: "„Zwischen Brief und Vertrag liegen meistens vier Wochen.“",
      },
      {
        text: "Was sagt die erste Bestätigung?",
        options: ["Dass der Brief angekommen ist", "Dass man eingeladen ist", "Dass man abgelehnt ist"],
        answer: 0,
        explain: "„Sie sagt nur, dass Ihr Brief angekommen ist, sonst nichts.“",
      },
      {
        text: "Welche Frage ist die wichtigste?",
        options: ["Warum diese Stelle", "Warum Sie", "Was Sie nicht können"],
        answer: 2,
        explain: "„Die dritte Frage ist die wichtigste …“",
      },
      {
        kind: "gapfill",
        text: "Beim Vorstellungsgespräch fragen ___ ___ Betriebe dasselbe.",
        options: [],
        answer: 0,
        accept: ["die meisten"],
        explain: "„die meisten“ çoğul ister: isim de fiil de çoğul.",
      },
      {
        kind: "short_answer",
        text: "Worüber soll man am Ende fragen?",
        options: [],
        answer: 0,
        accept: ["zur Arbeit", "über die Arbeit", "wie ein normaler Tag aussieht"],
        explain: "„Nicht zum Gehalt, sondern zur Arbeit …“",
      },
    ],
  },
  {
    id: "b1-u40-r2",
    level: "B1",
    skill: "reading",
    unit: 40,
    title: "Was macht zufrieden?",
    genre: "Anket raporu",
    intro: "Bir iş memnuniyeti anketi. Hangi etken önde?",
    minutes: 5,
    gloss: [
      { de: "die Umfrage", tr: "anket", en: "survey" },
      { de: "die Studie", tr: "araştırma", en: "study" },
      { de: "insgesamt", tr: "toplamda", en: "in total" },
      { de: "gering", tr: "düşük", en: "low" },
      { de: "anstrengend", tr: "yorucu", en: "exhausting" },
    ],
    text:
      "Eine Umfrage hat achthundert Angestellte gefragt. Die Studie zeigt: " +
      "insgesamt sind " +
      "die meisten Angestellten zufrieden — aber nicht aus den Gründen, " +
      "die man erwartet.\n\n" +
      "Das Gehalt steht erst an vierter Stelle. Wichtiger sind: eine " +
      "Arbeit, die einen Sinn hat, ein Team, das man mag, und Zeiten, " +
      "die zum Leben der Leute passen.\n\n" +
      "Interessant ist auch, was unzufrieden macht. Nicht die " +
      "anstrengende Arbeit — die meisten Arbeiter nennen sie sogar " +
      "angenehm, wenn sie körperlich ist und ein Ende hat. Unzufrieden " +
      "macht die Langeweile: wer sich häufig langweilt, geht früher.\n\n" +
      "Die Studie enthält eine Zahl, die uns überrascht hat: bei den " +
      "unter Dreißigjährigen ist der Wunsch nach mehr Geld am geringsten. " +
      "Sie wollen etwas anderes, und wer sie halten will, sollte danach " +
      "fragen.",
    questions: [
      {
        text: "Wie viele Angestellte wurden gefragt?",
        options: ["Achthundert", "Achtzig", "Achttausend"],
        answer: 0,
        explain: "„Eine Umfrage hat achthundert Angestellte gefragt.“",
      },
      {
        text: "An welcher Stelle steht das Gehalt?",
        options: ["An erster", "An vierter", "Es kommt nicht vor"],
        answer: 1,
        explain: "„Das Gehalt steht erst an vierter Stelle.“",
      },
      {
        text: "Was macht laut Studie unzufrieden?",
        options: ["Anstrengende Arbeit", "Die Langeweile", "Das Team"],
        answer: 1,
        explain: "„Unzufrieden macht die Langeweile: wer sich häufig langweilt, geht früher.“",
      },
      {
        kind: "gapfill",
        text: "Insgesamt ___ die meisten Angestellten zufrieden.",
        options: [],
        answer: 0,
        accept: ["sind"],
        explain: "„die meisten“ sonrası fiil ÇOĞUL: sind, ist değil.",
      },
      {
        kind: "short_answer",
        text: "Bei welcher Gruppe ist der Wunsch nach Geld am geringsten?",
        options: [],
        answer: 0,
        accept: ["bei den unter Dreißigjährigen", "unter dreißig", "die Jungen"],
        explain: "„… bei den unter Dreißigjährigen ist der Wunsch nach mehr Geld am geringsten.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u40-l1",
    level: "B1",
    skill: "listening",
    unit: 40,
    title: "Das Projekt vorstellen",
    genre: "Sunum öncesi",
    intro: "Bir sunum planlanıyor. Ne gösterilecek, ne söz verilecek?",
    minutes: 4,
    gloss: [
      { de: "produzieren", tr: "üretmek", en: "to produce" },
      { de: "garantieren", tr: "garanti etmek", en: "to guarantee" },
      { de: "weltweit", tr: "dünya çapında", en: "worldwide" },
      { de: "die Aktion", tr: "kampanya", en: "campaign" },
    ],
    segments: [
      { text: "Wie lange habe ich morgen für die Präsentation?" },
      { text: "Zwölf Minuten, danach Fragen." },
      { text: "Dann zeige ich nur drei Zahlen und ein Bild." },
      { text: "Gut. Sag aber dazu, was wir wirklich produzieren können." },
      { text: "Klar. Ich garantiere nichts, was wir nicht schaffen." },
      { text: "Genau das meine ich. Letztes Jahr war das anders." },
      { text: "Ich weiß. Diesmal sage ich lieber eine kleinere Zahl." },
      { text: "Richtig. Und die weltweite Aktion lässt du besser weg." },
    ],
    questions: [
      {
        text: "Wie lange dauert die Präsentation?",
        options: ["Zwölf Minuten", "Zwanzig Minuten", "Eine Stunde"],
        answer: 0,
        explain: "„Zwölf Minuten, danach Fragen.“",
      },
      {
        text: "Was zeigt die Person?",
        options: ["Drei Zahlen und ein Bild", "Zehn Folien", "Nur Text"],
        answer: 0,
        explain: "„Dann zeige ich nur drei Zahlen und ein Bild.“",
      },
      {
        text: "Was soll weggelassen werden?",
        options: ["Die weltweite Aktion", "Die Zahlen", "Das Bild"],
        answer: 0,
        explain: "„Und die weltweite Aktion lässt du besser weg.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ nichts, was wir nicht schaffen.",
        options: [],
        answer: 0,
        accept: ["garantiere"],
        explain: "„garantieren“ ayrılmayan fiil, ortaçta da ge- almaz.",
      },
      {
        kind: "short_answer",
        text: "Was sagt die Person diesmal lieber?",
        options: [],
        answer: 0,
        accept: ["eine kleinere Zahl", "kleinere Zahl"],
        explain: "„Diesmal sage ich lieber eine kleinere Zahl.“",
      },
    ],
  },
  {
    id: "b1-u40-l2",
    level: "B1",
    skill: "listening",
    unit: 40,
    title: "Selbstständig — ja oder nein?",
    genre: "Karar konuşması",
    intro: "Biri kendi işini kurmayı düşünüyor. Ne konuşuluyor?",
    minutes: 4,
    gloss: [
      { de: "gründen", tr: "kurmak", en: "to found" },
      { de: "nebenbei", tr: "yan iş olarak", en: "on the side" },
      { de: "fällig", tr: "vadesi gelmiş", en: "due" },
      { de: "sich bemühen", tr: "çabalamak", en: "to make an effort" },
    ],
    segments: [
      { text: "Ich überlege, im Frühling etwas Eigenes zu gründen." },
      { text: "Ganz oder nebenbei?" },
      { text: "Erst nebenbei. Ich kann nicht sofort alles aufgeben." },
      { text: "Klug. Und die Steuer? Die ist im ersten Jahr fällig." },
      { text: "Das weiß ich. Ich habe mich schon bei einer Beratung bemüht." },
      { text: "Sehr gut. Und wie lange willst du beides machen?" },
      { text: "Ein Jahr. Wenn es dann nicht läuft, höre ich damit auf." },
      { text: "Klingt ehrlich. Die meisten geben sich diese Grenze nicht." },
    ],
    questions: [
      {
        text: "Wie fängt die Person an?",
        options: ["Ganz", "Nebenbei", "Gar nicht"],
        answer: 1,
        explain: "„Erst nebenbei. Ich kann nicht sofort alles aufgeben.“",
      },
      {
        text: "Was ist im ersten Jahr fällig?",
        options: ["Die Steuer", "Die Miete", "Eine Prüfung"],
        answer: 0,
        explain: "„Und die Steuer? Die ist im ersten Jahr fällig.“",
      },
      {
        text: "Wie lange will sie beides machen?",
        options: ["Ein Jahr", "Drei Jahre", "Solange es geht"],
        answer: 0,
        explain: "„Ein Jahr. Wenn es dann nicht läuft, höre ich damit auf.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ geben sich diese Grenze nicht.",
        options: [],
        answer: 0,
        accept: ["Die meisten"],
        explain: "„die meisten“ tek başına da çoğuldur → fiil çoğul.",
      },
      {
        kind: "short_answer",
        text: "Wo hat sie sich schon bemüht?",
        options: [],
        answer: 0,
        accept: ["bei einer Beratung", "eine Beratung", "Beratung"],
        explain: "„Ich habe mich schon bei einer Beratung bemüht.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u40-w1",
    level: "B1",
    skill: "writing",
    unit: 40,
    title: "Bin ich zufrieden?",
    genre: "Kişisel değerlendirme",
    intro: "İşinden memnun musun? 'Sıkılıyorum' Almancada özneyi değiştirir.",
    minutes: 8,
    gloss: [
      { de: "sich langweilen", tr: "sıkılmak", en: "to be bored" },
      { de: "die Langeweile", tr: "can sıkıntısı", en: "boredom" },
      { de: "angenehm", tr: "hoş", en: "pleasant" },
      { de: "körperlich", tr: "bedensel", en: "physical" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Öğleden sonraları sıkılıyorum.",
        answer: "Nachmittags langweile ich mich.",
        alternatives: ["Nachmittags ist mir langweilig."],
        hint: "Dönüşlü fiil ya da Dativ kalıbı — ama „ich bin langweilig“ olmaz.",
      },
      {
        kind: "build",
        tr: "İş yorucu ama hoş.",
        answer: "Die Arbeit ist anstrengend, aber angenehm.",
        hint: "Burada özne gerçekten iş → sıfat işi niteler.",
      },
      {
        kind: "build",
        tr: "Bedensel çalışmaya alışkınım.",
        answer: "Ich bin körperliche Arbeit gewohnt.",
        hint: "„gewohnt sein“ + Akkusativ.",
      },
      {
        kind: "form",
        prompt: "Memnuniyet kartını doldur.",
        facts: "Kişi: Sedef Aydın; iş: bedensel, yorucu; iyi yön: takım; kötü yön: öğleden sonra sıkılma; sonuç: genelde memnun.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Art der Arbeit", answer: "körperlich", accept: ["körperliche Arbeit", "anstrengend"] },
          { label: "Positiv", answer: "das Team", accept: ["Team", "die Kollegen"] },
          { label: "Negativ", answer: "Langeweile am Nachmittag", accept: ["Langeweile", "nachmittags"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Özneyi düzelt — anlam ters dönmüş.",
        source: "Ich bin langweilig am Nachmittag, aber die Arbeit ist interessiert.",
        answer: "Mir ist langweilig am Nachmittag, aber die Arbeit ist interessant.",
        why: "Türkçe 'sıkılıyorum' der ve özne KİŞİDİR, o yüzden Almancada 'ich bin langweilig' çıkıyor — ama bu 'ben sıkıcıyım' demektir. Anlam tam tersine döner ve cümle dilbilgisel olarak kusursuz kaldığı için kimse düzeltmez. Doğrusu: mir ist langweilig ya da ich langweile mich. Aynı tuzak interessiert (ilgili) ↔ interessant (ilginç) için de geçerlidir.",
      },
    ],
  },
  {
    id: "b1-u40-w2",
    level: "B1",
    skill: "writing",
    unit: 40,
    title: "Ergebnisse einer Umfrage",
    genre: "Anket raporu",
    intro: "Bir anketi raporla. 'çoğu' Almancada ismi ve fiili çoğullar.",
    minutes: 12,
    gloss: [
      { de: "die Umfrage", tr: "anket", en: "survey" },
      { de: "analysieren", tr: "çözümlemek", en: "to analyse" },
      { de: "enthalten", tr: "içermek", en: "to contain" },
      { de: "häufig", tr: "sık", en: "frequently" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Sorulanların çoğu memnun.",
        answer: "Die meisten Angestellten sind zufrieden.",
        hint: "isim çoğul + sıfat -en + fiil çoğul.",
      },
      {
        kind: "build",
        tr: "Birçok çalışan işini yorucu buluyor.",
        answer: "Viele Angestellte finden ihre Arbeit anstrengend.",
        hint: "„viele“ de çoğul ister.",
      },
      {
        kind: "free",
        prompt: "Küçük bir anketi raporla (gerçek ya da düşünülmüş): kaç kişiye soruldu, en sık verilen üç yanıt, şaşırtan bir sonuç, ve bundan çıkan öneri. En az üç 'die meisten / viele / einige' cümlesi kullan.",
        checklist: [
          "Katılımcı sayısı verilmiş mi?",
          "En az üç yanıt sıralanmış mı?",
          "Şaşırtan bir sonuç var mı?",
          "Bir öneri var mı?",
          "die meisten/viele sonrası isim ve fiil çoğul mu?",
        ],
        minWords: 70,
        sample:
          "Wir haben achtzig Angestellte in unserem Betrieb gefragt und die " +
          "Antworten insgesamt analysiert.\n\n" +
          "Die meisten Angestellten sind zufrieden, aber nicht wegen des " +
          "Gehalts. Viele Kollegen nennen zuerst das Team, einige die " +
          "Arbeitszeiten. Das Gehalt steht erst an vierter Stelle.\n\n" +
          "Überrascht hat uns eine Zahl: die meisten Jüngeren wünschen sich " +
          "nicht mehr Geld, sondern klarere Aufgaben. Wer sich häufig " +
          "langweilt, denkt eher ans Aufhören — das sagen alle Altersgruppen.\n\n" +
          "Unser Vorschlag ist deshalb einfach. Die Umfrage enthält genug " +
          "Hinweise für einen ersten Schritt: einmal im Quartal ein kurzes " +
          "Gespräch über Aufgaben, nicht über Zahlen. Das kostet wenig und " +
          "trifft genau den Punkt, den die Leute selbst genannt haben.",
        phrases: [
          { de: "Die meisten Angestellten sind …", tr: "Çalışanların çoğu …", en: "Most employees are …" },
          { de: "Überrascht hat uns eine Zahl.", tr: "Bir sayı bizi şaşırttı.", en: "One figure surprised us." },
          { de: "Unser Vorschlag ist deshalb …", tr: "Bu yüzden önerimiz …", en: "Our suggestion is therefore …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Çoğul uyumunu düzelt.",
        source: "Die meisten Angestellte ist zufrieden und viele Kollege sagt dasselbe.",
        answer: "Die meisten Angestellten sind zufrieden und viele Kollegen sagen dasselbe.",
        why: "Türkçede 'çoğu' ve 'birçok' ismi TEKİL bırakır ('çoğu çalışan memnun'), o yüzden Almancada da tekil biçim kullanılıyor. Almancada bu belirteçler çoğul ister ve üç yerde birden işaretlenir: isim çoğul olur (Angestellten, Kollegen), sıfat -en alır, ve fiil de çoğul çekilir (sind, sagen).",
      },
    ],
  },
];

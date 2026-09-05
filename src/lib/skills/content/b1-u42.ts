import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 42 — "Resmî dilin iki alışkanlığı" (dersler 165–168).
 *
 * Dersler: Über Politik reden · Vor Gericht · Ein Verbrechen melden ·
 * Regeln verstehen.
 *
 * Bu ünitenin dili RESMÎ ve iki aktarım hatası tam oradan çıkıyor:
 *   ortaç sıfat       Almanca Partizip II'yi isimden önce SIFAT gibi
 *   olunca çekilir    kullanır ve o zaman çeker: der verurteilte Täter,
 *                     die begrenzte Zeit, ein verhafteter Mann. Türkçede
 *                     sıfat-fiil hiç çekilmediği için ek düşüyor.
 *   yer tutucu es +   Türkçede öznesiz cümle olağandır ('gerekli ki
 *   dass              gelesiniz'), o yüzden Almancada da cümle öznesiz
 *                     başlıyor. Almanca yan cümleyi sona atıp başa bir
 *                     yer tutucu koyar: "Es ist erforderlich, dass …".
 *                     Ünite 22 hava ve varlık cümlelerindeki es'i almıştı;
 *                     bu ayrı bir görev — es burada bir CÜMLENİN yerini
 *                     tutuyor.
 *
 * Yeni 32 kelime: die Politik, der Politiker, die Versammlung,
 * die Reaktion, die Realität, die Wirklichkeit, die Theorie, gerecht,
 * der Richter, die Richterin, das Urteil, der Prozess, verurteilen,
 * verhaften, die Anwältin, die Zeugin, der Verbrecher, die Verbrecherin,
 * die Kriminalpolizei, das Gefängnis, die Polizistin, strafbar,
 * untersagt, das Ereignis, begrenzt, beschränken, behindern,
 * erforderlich, zugänglich, ausschließen, die Ausnahme, die Begründung.
 */
export const b1U42: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u42-r1",
    level: "B1",
    skill: "reading",
    unit: 42,
    title: "Was vor Gericht passiert",
    genre: "Bilgilendirme metni",
    intro: "Bir duruşma nasıl işler? Kim ne yapar?",
    minutes: 5,
    gloss: [
      { de: "der Richter", tr: "hâkim", en: "judge" },
      { de: "das Urteil", tr: "karar", en: "verdict" },
      { de: "die Zeugin", tr: "tanık", en: "witness", note: "kadın biçimi" },
      { de: "verurteilen", tr: "mahkûm etmek", en: "to convict" },
      { de: "die Begründung", tr: "gerekçe", en: "reasoning" },
    ],
    text:
      "Ein Prozess beginnt nicht mit dem Urteil, sondern mit den Fragen. " +
      "Der Richter hört zuerst die Anwältin, dann die Zeugin, dann die " +
      "andere Seite.\n\n" +
      "Ein verhafteter Mensch ist noch kein verurteilter Mensch. Das klingt " +
      "selbstverständlich, wird aber in den Nachrichten ständig " +
      "durcheinandergebracht. Bis zum Urteil ist niemand schuldig.\n\n" +
      "Es ist erforderlich, dass das Gericht seine Begründung schriftlich " +
      "gibt. Ohne Begründung könnte niemand prüfen, ob ein Urteil gerecht " +
      "war. Genau dafür ist sie da.\n\n" +
      "Der Prozess ist meistens öffentlich und für alle zugänglich. " +
      "Es gibt Ausnahmen — bei Kindern zum Beispiel — aber die " +
      "beschränkte Öffentlichkeit muss begründet werden. Auch das steht " +
      "im Gesetz.",
    questions: [
      {
        text: "Womit beginnt ein Prozess?",
        options: ["Mit dem Urteil", "Mit den Fragen", "Mit der Begründung"],
        answer: 1,
        explain: "„Ein Prozess beginnt nicht mit dem Urteil, sondern mit den Fragen.“",
      },
      {
        text: "Was gilt bis zum Urteil?",
        options: ["Niemand ist schuldig", "Jeder ist schuldig", "Es gibt keine Regel"],
        answer: 0,
        explain: "„Bis zum Urteil ist niemand schuldig.“",
      },
      {
        text: "Warum ist die Begründung nötig?",
        options: ["Damit man prüfen kann, ob das Urteil gerecht war", "Für die Zeitung", "Für die Anwältin"],
        answer: 0,
        explain: "„Ohne Begründung könnte niemand prüfen, ob ein Urteil gerecht war.“",
      },
      {
        kind: "gapfill",
        text: "Ein ___ Mensch ist noch kein ___ Mensch.",
        options: [],
        answer: 0,
        accept: ["verhafteter verurteilter", "verhafteter / verurteilter"],
        explain: "Ortaç isimden önce gelince SIFAT gibi çekilir: verhafteter, verurteilter.",
      },
      {
        kind: "short_answer",
        text: "Bei wem gibt es Ausnahmen?",
        options: [],
        answer: 0,
        accept: ["bei Kindern", "Kinder", "bei Kindern zum Beispiel"],
        explain: "„Es gibt Ausnahmen — bei Kindern zum Beispiel …“",
      },
    ],
  },
  {
    id: "b1-u42-r2",
    level: "B1",
    skill: "reading",
    unit: 42,
    title: "Was gilt bei einer Versammlung?",
    genre: "Kural metni",
    intro: "Toplantı ve gösteri kuralları. Ne serbest, ne değil?",
    minutes: 5,
    gloss: [
      { de: "die Versammlung", tr: "toplanma", en: "assembly" },
      { de: "untersagt", tr: "yasak", en: "prohibited" },
      { de: "strafbar", tr: "cezalandırılabilir", en: "punishable" },
      { de: "behindern", tr: "engellemek", en: "to obstruct" },
      { de: "erforderlich", tr: "gerekli", en: "required" },
    ],
    text:
      "Eine angemeldete Versammlung ist erlaubt, auch wenn die Mehrheit " +
      "anderer Meinung ist. Das ist keine Höflichkeit, sondern ein Recht.\n\n" +
      "Es ist erforderlich, dass Sie die Versammlung vorher anmelden — " +
      "meistens achtundvierzig Stunden vorher. Ohne Anmeldung ist sie " +
      "nicht automatisch strafbar, aber die Polizei kann sie beenden.\n\n" +
      "Untersagt ist nur, was andere ernsthaft behindert: eine gesperrte " +
      "Autobahn zum Beispiel, oder ein gesperrter Rettungsweg. " +
      "Die begrenzte Störung eines normalen Tages gehört dagegen dazu — " +
      "eine Versammlung, die niemand merkt, hätte keinen Sinn.\n\n" +
      "Es ist wichtig, dass Sie ruhig bleiben, wenn die Polizei Sie " +
      "anspricht. Nennen Sie Ihre Personalien und sonst nichts. " +
      "Alles Weitere klärt später eine Anwältin.",
    questions: [
      {
        text: "Wann ist eine Versammlung erlaubt?",
        options: ["Wenn die Mehrheit zustimmt", "Wenn sie angemeldet ist", "Immer"],
        answer: 1,
        explain: "„Eine angemeldete Versammlung ist erlaubt, auch wenn die Mehrheit anderer Meinung ist.“",
      },
      {
        text: "Wie früh soll man anmelden?",
        options: ["48 Stunden vorher", "Eine Woche vorher", "Am selben Tag"],
        answer: 0,
        explain: "„… meistens achtundvierzig Stunden vorher.“",
      },
      {
        text: "Was ist untersagt?",
        options: ["Jede Störung", "Was andere ernsthaft behindert", "Nichts"],
        answer: 1,
        explain: "„Untersagt ist nur, was andere ernsthaft behindert …“",
      },
      {
        kind: "gapfill",
        text: "___ ist erforderlich, dass Sie die Versammlung vorher anmelden.",
        options: [],
        answer: 0,
        accept: ["Es"],
        explain: "Yan cümle sona atılınca başa yer tutucu „es“ gelir.",
      },
      {
        kind: "short_answer",
        text: "Was soll man der Polizei nennen?",
        options: [],
        answer: 0,
        accept: ["die Personalien", "Ihre Personalien", "nur die Personalien"],
        explain: "„Nennen Sie Ihre Personalien und sonst nichts.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u42-l1",
    level: "B1",
    skill: "listening",
    unit: 42,
    title: "Eine Anzeige erstatten",
    genre: "Karakolda",
    intro: "Bir olay bildiriliyor. Hangi bilgi isteniyor?",
    minutes: 4,
    gloss: [
      { de: "die Polizistin", tr: "polis", en: "police officer", note: "kadın biçimi" },
      { de: "das Ereignis", tr: "olay", en: "incident" },
      { de: "der Verbrecher", tr: "suçlu", en: "criminal" },
      { de: "die Kriminalpolizei", tr: "asayiş şubesi", en: "criminal police" },
    ],
    segments: [
      { text: "Guten Tag. Ich möchte etwas melden." },
      { text: "Setzen Sie sich. Wann war das Ereignis?" },
      { text: "Gestern gegen zehn Uhr abends, vor meinem Haus." },
      { text: "Haben Sie jemanden gesehen?" },
      { text: "Zwei Personen, aber nur von hinten. Ich kann nichts Genaues sagen." },
      { text: "Das ist in Ordnung. Erfundene Angaben helfen niemandem." },
      { text: "Was passiert jetzt?" },
      { text: "Ich nehme das auf, dann geht es an die Kriminalpolizei. Eine Polizistin meldet sich bei Ihnen, wenn wir den Verbrecher finden." },
    ],
    questions: [
      {
        text: "Wann war das Ereignis?",
        options: ["Gestern gegen zehn Uhr abends", "Heute Morgen", "Vor einer Woche"],
        answer: 0,
        explain: "„Gestern gegen zehn Uhr abends, vor meinem Haus.“",
      },
      {
        text: "Was hat die Person gesehen?",
        options: ["Zwei Personen von hinten", "Ein Auto", "Nichts"],
        answer: 0,
        explain: "„Zwei Personen, aber nur von hinten.“",
      },
      {
        text: "Wohin geht die Anzeige danach?",
        options: ["An die Kriminalpolizei", "An das Gericht", "An die Anwältin"],
        answer: 0,
        explain: "„Ich nehme das auf, dann geht es an die Kriminalpolizei.“",
      },
      {
        kind: "gapfill",
        text: "___ Angaben helfen niemandem.",
        options: [],
        answer: 0,
        accept: ["Erfundene"],
        explain: "Ortaç isimden önce çekilir: erfundene Angaben.",
      },
      {
        kind: "short_answer",
        text: "Wo war das Ereignis?",
        options: [],
        answer: 0,
        accept: ["vor meinem Haus", "vor ihrem Haus", "vor dem Haus"],
        explain: "„… vor meinem Haus.“",
      },
    ],
  },
  {
    id: "b1-u42-l2",
    level: "B1",
    skill: "listening",
    unit: 42,
    title: "Theorie und Wirklichkeit",
    genre: "Siyaset sohbeti",
    intro: "Bir yasa tartışılıyor. Kâğıt üstünde ne, gerçekte ne?",
    minutes: 4,
    gloss: [
      { de: "die Theorie", tr: "kuram", en: "theory" },
      { de: "die Wirklichkeit", tr: "gerçeklik", en: "reality" },
      { de: "gerecht", tr: "adil", en: "just" },
      { de: "die Reaktion", tr: "tepki", en: "reaction" },
    ],
    segments: [
      { text: "In der Theorie ist das neue Gesetz gerecht." },
      { text: "Und in der Wirklichkeit?" },
      { text: "Da hängt es davon ab, wer eine Anwältin bezahlen kann." },
      { text: "Also gilt es nicht für alle gleich." },
      { text: "Auf dem Papier schon. In der Praxis nicht immer." },
      { text: "Was war die Reaktion der Politiker?" },
      { text: "Die meisten sagen, das sei ein Einzelfall." },
      { text: "Ein oft genannter Einzelfall ist keiner mehr." },
    ],
    questions: [
      {
        text: "Wie ist das Gesetz in der Theorie?",
        options: ["Gerecht", "Ungerecht", "Unklar"],
        answer: 0,
        explain: "„In der Theorie ist das neue Gesetz gerecht.“",
      },
      {
        text: "Wovon hängt es in der Wirklichkeit ab?",
        options: ["Vom Wohnort", "Davon, wer eine Anwältin bezahlen kann", "Vom Alter"],
        answer: 1,
        explain: "„Da hängt es davon ab, wer eine Anwältin bezahlen kann.“",
      },
      {
        text: "Was sagen die meisten Politiker?",
        options: ["Es ist ein Einzelfall", "Das Gesetz ist schlecht", "Nichts"],
        answer: 0,
        explain: "„Die meisten sagen, das sei ein Einzelfall.“",
      },
      {
        kind: "gapfill",
        text: "Ein oft ___ Einzelfall ist keiner mehr.",
        options: [],
        answer: 0,
        accept: ["genannter"],
        explain: "Ortaç sıfat olarak çekilir: ein oft genannter Fall.",
      },
      {
        kind: "short_answer",
        text: "Wo gilt das Gesetz für alle gleich?",
        options: [],
        answer: 0,
        accept: ["auf dem Papier", "in der Theorie"],
        explain: "„Auf dem Papier schon. In der Praxis nicht immer.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u42-w1",
    level: "B1",
    skill: "writing",
    unit: 42,
    title: "Ein Ereignis melden",
    genre: "Resmî bildirim",
    intro: "Bir olayı bildir. Ortaç isimden önce gelirse çekilir.",
    minutes: 8,
    gloss: [
      { de: "verhaften", tr: "tutuklamak", en: "to arrest" },
      { de: "das Gefängnis", tr: "cezaevi", en: "prison" },
      { de: "die Anwältin", tr: "avukat", en: "lawyer", note: "kadın biçimi" },
      { de: "die Ausnahme", tr: "istisna", en: "exception" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Tutuklanan bir insan hemen cezaevine girmez.",
        answer: "Ein verhafteter Mensch kommt nicht sofort ins Gefängnis.",
        hint: "İki ortaç da sıfat gibi çekilir.",
      },
      {
        kind: "build",
        tr: "Sınırlı kamuya açıklık gerekçelendirilmelidir.",
        answer: "Die beschränkte Öffentlichkeit muss begründet werden.",
        hint: "Ortaç + edilgen.",
      },
      {
        kind: "build",
        tr: "Duruşma herkese açıktır, istisnayı avukatın gerekçelendirmesi gerekir.",
        answer: "Der Prozess ist für alle zugänglich, eine Ausnahme muss die Anwältin begründen.",
        hint: "Yüklemdeki sıfat çekilmez.",
      },
      {
        kind: "form",
        prompt: "Bildirim kartını doldur.",
        facts: "Bildiren: Sedef Aydın; olay: gece 22'de ev önünde; görülen: iki kişi arkadan; kesin bilgi: yok; sonraki adım: asayiş şubesi.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Zeit", answer: "22 Uhr", accept: ["zehn Uhr abends", "gegen zehn"] },
          { label: "Ort", answer: "vor dem Haus", accept: ["vor meinem Haus", "Haus"] },
          { label: "Weiter an", answer: "Kriminalpolizei", accept: ["die Kriminalpolizei", "Polizei"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Ortaçların çekimini düzelt.",
        source: "Ein verhaftet Mensch ist noch kein verurteilt Mensch, und die beschränkt Öffentlichkeit braucht eine Begründung.",
        answer: "Ein verhafteter Mensch ist noch kein verurteilter Mensch, und die beschränkte Öffentlichkeit braucht eine Begründung.",
        why: "Türkçede sıfat-fiil hiç çekilmez ('tutuklanan insan'), o yüzden Almancada da çıplak ortaç bırakılıyor. Almanca Partizip II'yi isimden ÖNCE kullanınca onu sıfat gibi çeker ve artikel neyse ona uyar: ein verhafteteR Mensch, die beschränktE Öffentlichkeit, das genannteN Beispiel. Yüklemde ise çekilmez: der Mensch ist verhaftet.",
      },
    ],
  },
  {
    id: "b1-u42-w2",
    level: "B1",
    skill: "writing",
    unit: 42,
    title: "Regeln erklären",
    genre: "Kural metni",
    intro: "Bir kuralı açıkla. Yan cümle sona giderse başa 'es' gelir.",
    minutes: 12,
    gloss: [
      { de: "erforderlich", tr: "gerekli", en: "required" },
      { de: "untersagt", tr: "yasak", en: "prohibited" },
      { de: "ausschließen", tr: "dışlamak", en: "to exclude" },
      { de: "die Versammlung", tr: "toplanma", en: "assembly" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Toplantıyı önceden bildirmeniz gereklidir.",
        answer: "Es ist erforderlich, dass Sie die Versammlung vorher anmelden.",
        hint: "Başta yer tutucu es, yan cümle sonda.",
      },
      {
        kind: "build",
        tr: "Sakin kalmanız önemlidir.",
        answer: "Es ist wichtig, dass Sie ruhig bleiben.",
        hint: "Aynı kalıp.",
      },
      {
        kind: "free",
        prompt: "Bir kuralı açıkla (işyeri, bina, kurs — seçim senin): kural ne, kime uygulanır, istisnası var mı, uyulmazsa ne olur, ve neden böyle bir kural var. En az iki 'Es ist …, dass …' cümlesi kullan.",
        checklist: [
          "Kural tek cümlede net mi?",
          "Kapsam (kime) söylenmiş mi?",
          "İstisna var mı?",
          "Sonuç söylenmiş mi?",
          "En az iki 'Es ist …, dass …' cümlesi var mı?",
        ],
        minWords: 70,
        sample:
          "In unserem Haus gilt seit Januar eine neue Regel für den Hof.\n\n" +
          "Es ist erforderlich, dass jeder sein Rad im hinteren Bereich " +
          "abstellt. Der Grund ist einfach: ein gesperrter Weg behindert " +
          "im Notfall die Feuerwehr, und das ist untersagt.\n\n" +
          "Die Regel gilt für alle Bewohner. Es gibt eine Ausnahme für " +
          "Besucher, die nur kurz bleiben — aber auch sie sollen den " +
          "Rettungsweg frei lassen.\n\n" +
          "Es ist wichtig, dass niemand das persönlich nimmt. Wir schließen " +
          "niemanden aus; die Regel richtet sich nicht gegen einzelne " +
          "Personen, sondern gegen eine Situation, die uns alle betrifft.\n\n" +
          "Wer sein Rad zweimal falsch abstellt, bekommt einen Zettel, " +
          "keinen Brief. So war das gemeint.",
        phrases: [
          { de: "Es ist erforderlich, dass …", tr: "… gereklidir.", en: "It is required that …" },
          { de: "Es gibt eine Ausnahme für …", tr: "… için bir istisna var.", en: "There is an exception for …" },
          { de: "Die Regel richtet sich nicht gegen …", tr: "Kural … kişilere karşı değil.", en: "The rule is not aimed at …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Eksik yer tutucuyu ekle.",
        source: "Ist erforderlich, dass Sie anmelden, und ist wichtig, dass Sie ruhig bleiben.",
        answer: "Es ist erforderlich, dass Sie anmelden, und es ist wichtig, dass Sie ruhig bleiben.",
        why: "Türkçede öznesiz cümle olağandır ('gelmeniz gereklidir'), o yüzden Almancada da cümle doğrudan fiille başlıyor. Almanca yan cümleyi sona atınca başa bir YER TUTUCU koyar: es. Ünite 22 hava ve varlık cümlelerindeki es'i almıştı; buradaki görev başka — es bir CÜMLENİN yerini tutuyor ve o cümle geldiğinde de yerinde kalıyor.",
      },
    ],
  },
];

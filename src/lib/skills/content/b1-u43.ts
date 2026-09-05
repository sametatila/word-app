import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 43 — "Kültür ve katılım" (dersler 169–172).
 *
 * Dersler: Religion und Frieden · Bürgerengagement · Oper und Konzert ·
 * Literatur lesen.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   Dativ çoğul -n   Almancada çoğul isim DATİV'de -n alır, çoğulu zaten
 *                    -n ile bitmiyorsa: mit den Zuhörern, in den Museen,
 *                    von den Kindern. Türkçede çoğul tek ektir ve hâl
 *                    ondan sonra gelir, o yüzden bu ikinci ek büsbütün
 *                    düşüyor.
 *   ohne … zu        Ünite 21 'statt … zu' kalıbını çalıştı; bu onun
 *                    kardeşi ve aynı tuzağı taşıyor. Türkçe '-meden' bir
 *                    ULAÇTIR, öznesi yoktur; Almanca zu'lu mastar ister
 *                    ve özneyi yalnız ana cümlede söyler.
 *
 * Yeni 32 kelime: die Religion, der Gott, der Friede, die Mauer,
 * das Unglück, die Katastrophe, tödlich, geheim, streiken, fördern,
 * eintreten, unterscheiden, die Aktivität, der Beitrag, traditionell,
 * vergeblich, die Oper, das Orchester, das Ballett, die Flöte,
 * die Galerie, der Zuhörer, die Eröffnung, eröffnen, die Literatur,
 * das Märchen, der Dialog, die Recherche, vorlesen, abschreiben,
 * die Journalistin, der Schauspieler.
 */
export const b1U43: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u43-r1",
    level: "B1",
    skill: "reading",
    unit: 43,
    title: "Was ein Beitrag bewirkt",
    genre: "Katılım yazısı",
    intro: "Küçük katkılar ne işe yarar? Bir dernek anlatıyor.",
    minutes: 5,
    gloss: [
      { de: "der Beitrag", tr: "katkı / aidat", en: "contribution" },
      { de: "fördern", tr: "desteklemek", en: "to support" },
      { de: "eintreten", tr: "savunmak", en: "to stand up for" },
      { de: "die Aktivität", tr: "etkinlik", en: "activity" },
      { de: "vergeblich", tr: "boşuna", en: "in vain" },
    ],
    text:
      "Unser Verein hat neunzig Mitglieder. Der Beitrag ist klein, aber " +
      "mit den kleinen Beiträgen von neunzig Leuten kann man mehr machen, " +
      "als die meisten denken.\n\n" +
      "Wir fördern drei Aktivitäten: Hausaufgabenhilfe, einen Chor und " +
      "einen Garten. Für alles andere treten wir nur ein, ohne es selbst " +
      "zu organisieren — sonst wäre es zu viel.\n\n" +
      "Nicht alles funktioniert. Zwei Jahre lang haben wir vergeblich " +
      "versucht, einen Raum von der Stadt zu bekommen. Wir haben " +
      "aufgehört, ohne böse zu werden, und mieten jetzt privat.\n\n" +
      "Was mich am meisten überrascht hat: Die Arbeit mit den Kindern " +
      "ist leichter als die mit den Erwachsenen. Kinder kommen oder " +
      "kommen nicht. Erwachsene sagen zu und kommen dann doch nicht.",
    questions: [
      {
        text: "Wie viele Mitglieder hat der Verein?",
        options: ["Neunzig", "Neunzehn", "Neunhundert"],
        answer: 0,
        explain: "„Unser Verein hat neunzig Mitglieder.“",
      },
      {
        text: "Welche drei Aktivitäten werden gefördert?",
        options: ["Hausaufgabenhilfe, Chor, Garten", "Sport, Musik, Theater", "Nur der Garten"],
        answer: 0,
        explain: "„Wir fördern drei Aktivitäten: Hausaufgabenhilfe, einen Chor und einen Garten.“",
      },
      {
        text: "Was hat zwei Jahre lang nicht geklappt?",
        options: ["Der Chor", "Einen Raum von der Stadt zu bekommen", "Die Hausaufgabenhilfe"],
        answer: 1,
        explain: "„Zwei Jahre lang haben wir vergeblich versucht, einen Raum von der Stadt zu bekommen.“",
      },
      {
        kind: "gapfill",
        text: "Die Arbeit mit den ___ ist leichter als die mit den ___.",
        options: [],
        answer: 0,
        accept: ["Kindern Erwachsenen", "Kindern / Erwachsenen"],
        explain: "Dativ çoğulda isim -n alır: mit den KindERN, den ErwachsenEN.",
      },
      {
        kind: "short_answer",
        text: "Was machen Erwachsene laut Text?",
        options: [],
        answer: 0,
        accept: ["sie sagen zu und kommen dann nicht", "sie sagen zu und kommen doch nicht", "zusagen und nicht kommen"],
        explain: "„Erwachsene sagen zu und kommen dann doch nicht.“",
      },
    ],
  },
  {
    id: "b1-u43-r2",
    level: "B1",
    skill: "reading",
    unit: 43,
    title: "Vorlesen für Erwachsene",
    genre: "Etkinlik yazısı",
    intro: "Yetişkinlere sesli okuma. Neden işe yarıyor?",
    minutes: 5,
    gloss: [
      { de: "vorlesen", tr: "sesli okumak", en: "to read aloud" },
      { de: "die Literatur", tr: "edebiyat", en: "literature" },
      { de: "das Märchen", tr: "masal", en: "fairy tale" },
      { de: "der Zuhörer", tr: "dinleyici", en: "listener" },
      { de: "der Dialog", tr: "diyalog", en: "dialogue" },
    ],
    text:
      "Seit einem Jahr lesen wir donnerstags vor — nicht für Kinder, " +
      "sondern für Erwachsene. Am Anfang kamen vier Leute, jetzt sind es " +
      "zwanzig.\n\n" +
      "Wir lesen kurze Literatur: eine Erzählung, manchmal ein Märchen, " +
      "einmal im Monat einen Dialog mit zwei Stimmen. Nach dem Lesen " +
      "reden wir mit den Zuhörern darüber, aber nur zehn Minuten. " +
      "Wer nichts sagen will, sagt nichts.\n\n" +
      "Viele hören zum ersten Mal seit der Schule wieder zu, ohne " +
      "gleichzeitig etwas anderes zu tun. Das ist der eigentliche " +
      "Punkt. Eine Zuhörerin hat gesagt, sie habe zu Hause nie Ruhe " +
      "dafür.\n\n" +
      "Ein Schauspieler hilft uns seit dem Frühling. Er liest anders " +
      "als wir: langsamer, mit mehr Pausen. Von ihm haben wir mehr " +
      "gelernt als aus jedem Buch über das Vorlesen.",
    questions: [
      {
        text: "Für wen wird vorgelesen?",
        options: ["Für Kinder", "Für Erwachsene", "Für Schüler"],
        answer: 1,
        explain: "„… nicht für Kinder, sondern für Erwachsene.“",
      },
      {
        text: "Wie lange wird nach dem Lesen geredet?",
        options: ["Zehn Minuten", "Eine Stunde", "Gar nicht"],
        answer: 0,
        explain: "„Nach dem Lesen reden wir mit den Zuhörern darüber, aber nur zehn Minuten.“",
      },
      {
        text: "Was ist am Schauspieler anders?",
        options: ["Er liest langsamer, mit mehr Pausen", "Er liest lauter", "Er liest kürzer"],
        answer: 0,
        explain: "„Er liest anders als wir: langsamer, mit mehr Pausen.“",
      },
      {
        kind: "gapfill",
        text: "Viele hören wieder zu, ___ gleichzeitig etwas anderes ___ ___.",
        options: [],
        answer: 0,
        accept: ["ohne zu tun", "ohne / zu tun"],
        explain: "„ohne … zu“ + mastar; özne yalnız ana cümlede.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Leute kommen jetzt?",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„Am Anfang kamen vier Leute, jetzt sind es zwanzig.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u43-l1",
    level: "B1",
    skill: "listening",
    unit: 43,
    title: "Vor der Eröffnung",
    genre: "Konser öncesi",
    intro: "Bir konser başlamak üzere. Program ne?",
    minutes: 4,
    gloss: [
      { de: "die Oper", tr: "opera", en: "opera" },
      { de: "das Orchester", tr: "orkestra", en: "orchestra" },
      { de: "die Eröffnung", tr: "açılış", en: "opening" },
      { de: "die Flöte", tr: "flüt", en: "flute" },
    ],
    segments: [
      { text: "Hast du das Programm gesehen? Was spielen sie zuerst?" },
      { text: "Etwas Kurzes zur Eröffnung, dann eine Stunde Orchester." },
      { text: "Und nach der Pause?" },
      { text: "Ein Stück aus einer Oper, mit zwei Sängerinnen." },
      { text: "Meine Tochter spielt Flöte, sie sitzt ganz hinten." },
      { text: "Dann setzen wir uns lieber auf die Galerie." },
      { text: "Gute Idee. Von dort sieht man das ganze Orchester." },
      { text: "Und wir stören niemanden, wenn wir früher gehen müssen." },
    ],
    questions: [
      {
        text: "Was kommt zuerst?",
        options: ["Etwas Kurzes zur Eröffnung", "Eine Oper", "Die Pause"],
        answer: 0,
        explain: "„Etwas Kurzes zur Eröffnung, dann eine Stunde Orchester.“",
      },
      {
        text: "Was kommt nach der Pause?",
        options: ["Ein Stück aus einer Oper", "Ballett", "Nichts"],
        answer: 0,
        explain: "„Ein Stück aus einer Oper, mit zwei Sängerinnen.“",
      },
      {
        text: "Warum setzen sie sich auf die Galerie?",
        options: ["Es ist billiger", "Von dort sieht man das ganze Orchester", "Dort ist es wärmer"],
        answer: 1,
        explain: "„Von dort sieht man das ganze Orchester.“",
      },
      {
        kind: "gapfill",
        text: "Wir stören niemanden, wenn wir früher gehen ___.",
        options: [],
        answer: 0,
        accept: ["müssen"],
        explain: "Yan cümlede kipli fiil en sonda.",
      },
      {
        kind: "short_answer",
        text: "Was spielt die Tochter?",
        options: [],
        answer: 0,
        accept: ["Flöte", "die Flöte"],
        explain: "„Meine Tochter spielt Flöte …“",
      },
    ],
  },
  {
    id: "b1-u43-l2",
    level: "B1",
    skill: "listening",
    unit: 43,
    title: "Nach der Katastrophe",
    genre: "Yardım konuşması",
    intro: "Bir felaketten sonra yardım örgütleniyor. Ne gerekiyor?",
    minutes: 4,
    gloss: [
      { de: "die Katastrophe", tr: "felaket", en: "disaster" },
      { de: "das Unglück", tr: "kaza / talihsizlik", en: "misfortune" },
      { de: "der Friede", tr: "barış", en: "peace" },
      { de: "traditionell", tr: "geleneksel", en: "traditional" },
    ],
    segments: [
      { text: "Die Bilder von der Katastrophe sind schwer zu sehen." },
      { text: "Ja. Wir sammeln ab morgen im Gemeindehaus." },
      { text: "Was wird gebraucht? Kleidung?" },
      { text: "Nein, vor allem Geld. Kleidung liegt schon in den Hallen." },
      { text: "Verstehe. Dann sage ich es den Nachbarn weiter." },
      { text: "Sehr gut. Und sag dazu, wofür genau das Geld ist." },
      { text: "Mache ich. Sonst geben die Leute nichts, ohne zu fragen." },
      { text: "Genau. Traditionell hilft hier jeder — aber jeder will wissen, wem." },
    ],
    questions: [
      {
        text: "Wo wird gesammelt?",
        options: ["Im Gemeindehaus", "In der Halle", "Auf der Straße"],
        answer: 0,
        explain: "„Ja. Wir sammeln ab morgen im Gemeindehaus.“",
      },
      {
        text: "Was wird vor allem gebraucht?",
        options: ["Kleidung", "Geld", "Essen"],
        answer: 1,
        explain: "„Nein, vor allem Geld. Kleidung liegt schon in den Hallen.“",
      },
      {
        text: "Was will jeder wissen?",
        options: ["Wem das Geld hilft", "Wie viel andere geben", "Wann es endet"],
        answer: 0,
        explain: "„Traditionell hilft hier jeder — aber jeder will wissen, wem.“",
      },
      {
        kind: "gapfill",
        text: "Dann sage ich es den ___ weiter.",
        options: [],
        answer: 0,
        accept: ["Nachbarn"],
        explain: "Dativ çoğul: den Nachbarn — çoğul zaten -n ile bitiyor.",
      },
      {
        kind: "short_answer",
        text: "Was soll man den Nachbarn sagen?",
        options: [],
        answer: 0,
        accept: ["wofür das Geld ist", "wofür genau das Geld ist"],
        explain: "„Und sag dazu, wofür genau das Geld ist.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u43-w1",
    level: "B1",
    skill: "writing",
    unit: 43,
    title: "Ein Abend im Konzert",
    genre: "Etkinlik yazısı",
    intro: "Bir konseri anlat. Çoğul isim Dativ'de bir ek daha alır.",
    minutes: 8,
    gloss: [
      { de: "das Ballett", tr: "bale", en: "ballet" },
      { de: "die Galerie", tr: "balkon", en: "gallery" },
      { de: "der Zuhörer", tr: "dinleyici", en: "listener" },
      { de: "eröffnen", tr: "açmak", en: "to open" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Okumadan sonra dinleyicilerle konuştuk.",
        answer: "Nach dem Lesen haben wir mit den Zuhörern geredet.",
        hint: "Dativ çoğul: den ZuhörerN.",
      },
      {
        kind: "build",
        tr: "Kıyafetler zaten salonlarda duruyor.",
        answer: "Die Kleidung liegt schon in den Hallen.",
        hint: "in + Dativ çoğul: den HallEN.",
      },
      {
        kind: "build",
        tr: "Balkondan bütün orkestra görünüyor.",
        answer: "Von der Galerie sieht man das ganze Orchester.",
        hint: "Yer öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "form",
        prompt: "Konser kartını doldur.",
        facts: "Etkinlik: konser; açılış: kısa bir parça; birinci bölüm: 1 saat orkestra; aradan sonra: opera parçası; oturulan yer: balkon.",
        fields: [
          { label: "Eröffnung", answer: "etwas Kurzes", accept: ["ein kurzes Stück", "kurz"] },
          { label: "Erster Teil", answer: "eine Stunde Orchester", accept: ["Orchester", "eine Stunde"] },
          { label: "Nach der Pause", answer: "Oper", accept: ["ein Stück aus einer Oper", "eine Oper"] },
          { label: "Platz", answer: "Galerie", accept: ["auf der Galerie", "die Galerie"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Dativ çoğuldaki eksik eki tamamla.",
        source: "Wir reden mit den Zuhörer und die Kleidung liegt in den Halle.",
        answer: "Wir reden mit den Zuhörern und die Kleidung liegt in den Hallen.",
        why: "Türkçede çoğul TEK ektir ve hâl ondan sonra gelir ('dinleyicilerle'), o yüzden Almancada ikinci bir ek beklenmiyor. Almancada çoğul isim DATİV'de -n alır, çoğulu zaten -n ile bitmiyorsa: mit den Zuhörern, in den Hallen, von den Kindern. Çoğulu -s ile bitenler istisnadır (mit den Autos).",
      },
    ],
  },
  {
    id: "b1-u43-w2",
    level: "B1",
    skill: "writing",
    unit: 43,
    title: "Warum ich mitmache",
    genre: "Katılım yazısı",
    intro: "Bir gönüllü işi anlat. '-meden' Almancada zu'lu mastar ister.",
    minutes: 12,
    gloss: [
      { de: "der Beitrag", tr: "katkı", en: "contribution" },
      { de: "streiken", tr: "grev yapmak", en: "to strike" },
      { de: "unterscheiden", tr: "ayırt etmek", en: "to distinguish" },
      { de: "die Aktivität", tr: "etkinlik", en: "activity" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kızmadan bıraktık.",
        answer: "Wir haben aufgehört, ohne böse zu werden.",
        hint: "ohne + zu'lu mastar.",
      },
      {
        kind: "build",
        tr: "İnsanlar sormadan bir şey vermiyor.",
        answer: "Die Leute geben nichts, ohne zu fragen.",
        hint: "Yine ohne … zu.",
      },
      {
        kind: "free",
        prompt: "Katıldığın (ya da katılmak istediğin) bir gönüllü işi anlat: ne, nerede, ne zamandan beri, ne işe yarıyor, ne işe yaramadı, ve başkalarına ne dersin. En az iki 'ohne … zu' cümlesi kullan.",
        checklist: [
          "İş somut anlatılmış mı?",
          "Süre ve yer verilmiş mi?",
          "İşe yarayan bir şey var mı?",
          "İşe yaramayan bir şey dürüstçe söylenmiş mi?",
          "En az iki 'ohne … zu' cümlesi var mı?",
        ],
        minWords: 70,
        sample:
          "Seit zwei Jahren bin ich in einem kleinen Verein bei uns im " +
          "Viertel. Wir sind neunzig Mitglieder, und der Beitrag ist klein.\n\n" +
          "Wir fördern drei Aktivitäten: Hausaufgabenhilfe, einen Chor und " +
          "einen Garten. Für anderes treten wir ein, ohne es selbst zu " +
          "organisieren — sonst wäre es zu viel für uns.\n\n" +
          "Nicht alles hat geklappt. Zwei Jahre lang haben wir vergeblich " +
          "um einen Raum bei der Stadt gefragt. Irgendwann haben wir " +
          "aufgehört, ohne böse zu werden, und mieten jetzt privat.\n\n" +
          "Wer mitmachen will, soll einfach einmal kommen. Man muss nichts " +
          "können und nichts versprechen. Zwei Stunden im Monat sind mehr " +
          "wert als ein großer Plan, den am Ende niemand macht.",
        phrases: [
          { de: "Wir treten dafür ein, ohne … zu …", tr: "… -meden bunu savunuyoruz.", en: "We stand up for it without …" },
          { de: "Nicht alles hat geklappt.", tr: "Her şey yürümedi.", en: "Not everything worked." },
          { de: "Man muss nichts können.", tr: "Bir şey bilmek gerekmiyor.", en: "You don't need any skills." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Ulacı zu'lu mastara çevir.",
        source: "Wir haben aufgehört, ohne dass böse und die Leute geben nichts, ohne Fragen.",
        answer: "Wir haben aufgehört, ohne böse zu werden, und die Leute geben nichts, ohne zu fragen.",
        why: "Ünite 21 'statt … zu' kalıbını çalışmıştı; bu onun kardeşi ve aynı tuzağı taşıyor. Türkçe '-meden' bir ULAÇTIR: öznesi yoktur, fiil çekilmez, o yüzden Almancada isim ya da çıplak sıfat bırakılıyor. Almanca ohne'den sonra zu'lu MASTAR ister ve özneyi yalnız ana cümlede söyler: ohne zu fragen, ohne böse zu werden.",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 36 — "Teknik ve arıza" (dersler 141–144).
 *
 * Dersler: Ein Gerät anschließen · Computerprobleme · Netzstörung ·
 * Werkzeug leihen.
 *
 * Bu ünitenin sözlükçesi ayrılabilen ve ayrılmayan fiilleri yan yana
 * getiriyor (anschließen, einschalten ↔ unterbrechen, verbinden,
 * gebrauchen) ve iki aktarım hatası buradan çıkıyor:
 *   ge- var mı yok mu  Türkçede önek diye bir sınıf yoktur, o yüzden
 *                      ortaç hep aynı kalıpla kuruluyor. Almanca ayırır:
 *                      AYRILABİLEN fiilde ge- önekle gövdenin arasına
 *                      girer (angeschlossen), AYRILMAYAN fiilde ge- HİÇ
 *                      GELMEZ (unterbrochen, verbunden).
 *   çoğul-only isim    die Daten, die Kosten, die Leute, die Eltern,
 *                      die Ferien Almancada yalnız ÇOĞULDUR ve fiil de
 *                      çoğul çekilir. Türkçede 'veri' tekildir, o yüzden
 *                      "das Daten ist weg" çıkıyor.
 *
 * Yeni 32 kelime: die Steckdose, anschließen, einschalten, der Lautsprecher,
 * die Klimaanlage, die Technik, die Anleitung, gebrauchen, der Monitor,
 * die Tastatur, die Taste, die Festplatte, der Klick, die Daten, löschen,
 * sichern, das Netzwerk, das Netz, die Störung, unterbrechen, verbinden,
 * technisch, weshalb, normalerweise, der Hammer, die Zange, der Nagel,
 * die Leiter, das Loch, kleben, die Mühe, umsonst.
 */
export const b1U36: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u36-r1",
    level: "B1",
    skill: "reading",
    unit: 36,
    title: "Das Gerät anschließen",
    genre: "Kurulum kılavuzu",
    intro: "Bir cihaz kuruluyor. Hangi adım hangi sırada?",
    minutes: 5,
    gloss: [
      { de: "anschließen", tr: "bağlamak", en: "to connect" },
      { de: "die Steckdose", tr: "priz", en: "socket" },
      { de: "einschalten", tr: "açmak", en: "to switch on" },
      { de: "der Lautsprecher", tr: "hoparlör", en: "loudspeaker" },
      { de: "die Anleitung", tr: "kılavuz", en: "manual" },
    ],
    text:
      "Lesen Sie die Anleitung, bevor Sie etwas anschließen. Das klingt " +
      "langweilig, spart aber die meiste Mühe.\n\n" +
      "Stecken Sie zuerst das Kabel in die Steckdose, dann den Lautsprecher " +
      "an das Gerät. Erst danach schalten Sie ein. Wenn Sie das Gerät " +
      "eingeschaltet haben und dann erst anschließen, kann etwas kaputtgehen.\n\n" +
      "Hat es nicht funktioniert? Prüfen Sie drei Dinge, in dieser " +
      "Reihenfolge: Steckdose, Kabel, Gerät. Normalerweise liegt es an " +
      "einem losen Kabel und nicht an der Technik.\n\n" +
      "Wenn Sie alles richtig angeschlossen haben und trotzdem nichts " +
      "passiert, rufen Sie an. Bringen Sie das Gerät nicht zurück, ohne " +
      "vorher gefragt zu haben — die Hälfte der Rückgaben ist umsonst.",
    questions: [
      {
        text: "Was soll man zuerst tun?",
        options: ["Die Anleitung lesen", "Einschalten", "Das Kabel prüfen"],
        answer: 0,
        explain: "„Lesen Sie die Anleitung, bevor Sie etwas anschließen.“",
      },
      {
        text: "Wann schaltet man ein?",
        options: ["Zuerst", "Erst nach dem Anschließen", "Egal"],
        answer: 1,
        explain: "„Erst danach schalten Sie ein.“",
      },
      {
        text: "Woran liegt es normalerweise?",
        options: ["An einem losen Kabel", "An der Technik", "Am Gerät"],
        answer: 0,
        explain: "„Normalerweise liegt es an einem losen Kabel und nicht an der Technik.“",
      },
      {
        kind: "gapfill",
        text: "Wenn Sie alles richtig ___ haben und trotzdem nichts passiert, rufen Sie an.",
        options: [],
        answer: 0,
        accept: ["angeschlossen"],
        explain: "Ayrılabilen fiilde ge- önekle gövdenin ARASINA girer: an-ge-schlossen.",
      },
      {
        kind: "short_answer",
        text: "Welche drei Dinge soll man prüfen?",
        options: [],
        answer: 0,
        accept: ["Steckdose, Kabel, Gerät", "Steckdose Kabel Gerät"],
        explain: "„… in dieser Reihenfolge: Steckdose, Kabel, Gerät.“",
      },
    ],
  },
  {
    id: "b1-u36-r2",
    level: "B1",
    skill: "reading",
    unit: 36,
    title: "Die Daten sind weg",
    genre: "Bilgisayar rehberi",
    intro: "Veriler kayboldu. Ne yapılır, ne yapılmaz?",
    minutes: 5,
    gloss: [
      { de: "die Daten", tr: "veriler", en: "data" },
      { de: "sichern", tr: "yedeklemek", en: "to back up" },
      { de: "löschen", tr: "silmek", en: "to delete" },
      { de: "die Festplatte", tr: "sabit disk", en: "hard drive" },
      { de: "der Klick", tr: "tıklama", en: "click" },
    ],
    text:
      "Wenn die Daten weg sind, sind sie meistens nicht wirklich weg. " +
      "Ein falscher Klick löscht den Namen, nicht den Inhalt — jedenfalls " +
      "nicht sofort.\n\n" +
      "Das Wichtigste zuerst: Arbeiten Sie nicht weiter auf derselben " +
      "Festplatte. Jede neue Datei kann genau die Stelle überschreiben, " +
      "an der Ihre alten Daten noch liegen.\n\n" +
      "Schalten Sie den Rechner aus und fragen Sie jemanden, der sich " +
      "auskennt. Die Kosten sind bei einem Fachbetrieb hoch, aber sie sind " +
      "kleiner als der Verlust von zehn Jahren Fotos.\n\n" +
      "Und danach: sichern Sie regelmäßig. Nicht einmal im Jahr, sondern " +
      "automatisch. Wer seine Daten von Hand sichert, sichert sie nach " +
      "drei Monaten nicht mehr.",
    questions: [
      {
        text: "Was löscht ein falscher Klick meistens?",
        options: ["Den Inhalt", "Den Namen", "Die ganze Festplatte"],
        answer: 1,
        explain: "„Ein falscher Klick löscht den Namen, nicht den Inhalt …“",
      },
      {
        text: "Was soll man NICHT tun?",
        options: ["Auf derselben Festplatte weiterarbeiten", "Den Rechner ausschalten", "Jemanden fragen"],
        answer: 0,
        explain: "„Arbeiten Sie nicht weiter auf derselben Festplatte.“",
      },
      {
        text: "Wie soll man sichern?",
        options: ["Von Hand", "Automatisch", "Einmal im Jahr"],
        answer: 1,
        explain: "„Nicht einmal im Jahr, sondern automatisch.“",
      },
      {
        kind: "gapfill",
        text: "Wenn die Daten weg ___, ___ sie meistens nicht wirklich weg.",
        options: [],
        answer: 0,
        accept: ["sind sind", "sind / sind"],
        explain: "„die Daten“ yalnız çoğuldur → fiil de çoğul: sind, ist değil.",
      },
      {
        kind: "short_answer",
        text: "Womit vergleicht der Text die Kosten?",
        options: [],
        answer: 0,
        accept: ["mit dem Verlust", "zehn Jahre Fotos", "dem Verlust der Fotos"],
        explain: "„… aber sie sind kleiner als der Verlust von zehn Jahren Fotos.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u36-l1",
    level: "B1",
    skill: "listening",
    unit: 36,
    title: "Störung im Netz",
    genre: "Teknik destek",
    intro: "Bir ağ arızası. Sorun nerede, ne kadar sürecek?",
    minutes: 4,
    gloss: [
      { de: "die Störung", tr: "arıza", en: "fault" },
      { de: "unterbrechen", tr: "kesmek", en: "to interrupt" },
      { de: "verbinden", tr: "bağlamak", en: "to connect" },
      { de: "weshalb", tr: "bu yüzden / neden", en: "which is why" },
    ],
    segments: [
      { text: "Seit heute Morgen habe ich keine Verbindung." },
      { text: "Einen Moment. Ja, bei Ihnen ist die Leitung unterbrochen." },
      { text: "Weshalb denn? Gestern war alles normal." },
      { text: "Es gibt eine Störung im ganzen Netzwerk, seit vier Uhr." },
      { text: "Und wie lange dauert das noch?" },
      { text: "Bis heute Abend, sagen die Kollegen." },
      { text: "Kann ich in der Zeit etwas machen?" },
      { text: "Verbinden Sie das Gerät mit dem Telefon, das geht meistens." },
    ],
    questions: [
      {
        text: "Seit wann hat die Person keine Verbindung?",
        options: ["Seit heute Morgen", "Seit gestern", "Seit vier Uhr"],
        answer: 0,
        explain: "„Seit heute Morgen habe ich keine Verbindung.“",
      },
      {
        text: "Was ist der Grund?",
        options: ["Ein kaputtes Kabel", "Eine Störung im ganzen Netzwerk", "Ein falscher Klick"],
        answer: 1,
        explain: "„Es gibt eine Störung im ganzen Netzwerk, seit vier Uhr.“",
      },
      {
        text: "Bis wann dauert es?",
        options: ["Bis heute Abend", "Bis morgen", "Eine Stunde"],
        answer: 0,
        explain: "„Bis heute Abend, sagen die Kollegen.“",
      },
      {
        kind: "gapfill",
        text: "Bei Ihnen ist die Leitung ___.",
        options: [],
        answer: 0,
        accept: ["unterbrochen"],
        explain: "Ayrılmayan fiilde ge- HİÇ gelmez: unterbrochen, „geunterbrochen“ değil.",
      },
      {
        kind: "short_answer",
        text: "Was kann die Person in der Zeit machen?",
        options: [],
        answer: 0,
        accept: ["mit dem Telefon verbinden", "das Telefon nehmen", "über das Telefon"],
        explain: "„Verbinden Sie das Gerät mit dem Telefon, das geht meistens.“",
      },
    ],
  },
  {
    id: "b1-u36-l2",
    level: "B1",
    skill: "listening",
    unit: 36,
    title: "Hast du eine Leiter?",
    genre: "Komşudan alet isteme",
    intro: "Bir komşudan alet isteniyor. Ne için, ne zaman geri?",
    minutes: 4,
    gloss: [
      { de: "die Leiter", tr: "merdiven", en: "ladder" },
      { de: "der Nagel", tr: "çivi", en: "nail" },
      { de: "die Zange", tr: "pense", en: "pliers" },
      { de: "das Loch", tr: "delik", en: "hole" },
    ],
    segments: [
      { text: "Du, hast du zufällig eine Leiter?" },
      { text: "Klar. Wofür brauchst du sie?" },
      { text: "Ich will oben im Flur eine Lampe anschließen." },
      { text: "Dann nimm auch die Zange mit, die brauchst du sowieso." },
      { text: "Stimmt. Und einen Hammer für den Nagel." },
      { text: "Das Loch ist schon da, oder?" },
      { text: "Ja, vom Vormieter. Ich habe mir viel Mühe gespart." },
      { text: "Gut. Bring alles zurück, wenn du fertig bist." },
    ],
    questions: [
      {
        text: "Wofür braucht die Person die Leiter?",
        options: ["Um eine Lampe anzuschließen", "Um zu putzen", "Um ein Bild aufzuhängen"],
        answer: 0,
        explain: "„Ich will oben im Flur eine Lampe anschließen.“",
      },
      {
        text: "Was soll sie noch mitnehmen?",
        options: ["Die Zange", "Ein Kabel", "Eine Bürste"],
        answer: 0,
        explain: "„Dann nimm auch die Zange mit, die brauchst du sowieso.“",
      },
      {
        text: "Woher ist das Loch?",
        options: ["Vom Vormieter", "Neu gemacht", "Es gibt keins"],
        answer: 0,
        explain: "„Ja, vom Vormieter. Ich habe mir viel Mühe gespart.“",
      },
      {
        kind: "gapfill",
        text: "Ich will oben im Flur eine Lampe ___.",
        options: [],
        answer: 0,
        accept: ["anschließen"],
        explain: "Kipli fiilden sonra ayrılabilen fiil bütün hâlde gelir.",
      },
      {
        kind: "short_answer",
        text: "Wann soll alles zurückkommen?",
        options: [],
        answer: 0,
        accept: ["wenn sie fertig ist", "wenn du fertig bist", "nach der Arbeit"],
        explain: "„Bring alles zurück, wenn du fertig bist.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u36-w1",
    level: "B1",
    skill: "writing",
    unit: 36,
    title: "Eine kurze Anleitung",
    genre: "Kurulum notu",
    intro: "Bir kurulum notu yaz. Ortaçta 'ge-' her fiile gelmez.",
    minutes: 8,
    gloss: [
      { de: "einschalten", tr: "açmak", en: "to switch on" },
      { de: "die Klimaanlage", tr: "klima", en: "air conditioning" },
      { de: "technisch", tr: "teknik", en: "technical" },
      { de: "die Mühe", tr: "zahmet", en: "effort" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Cihazı bağladım ve sonra açtım.",
        answer: "Ich habe das Gerät angeschlossen und danach eingeschaltet.",
        hint: "İki ayrılabilen fiil: ge- araya girer.",
      },
      {
        kind: "build",
        tr: "Hat kesildi ve yeniden bağlandı.",
        answer: "Die Leitung wurde unterbrochen und neu verbunden.",
        hint: "İki ayrılmayan fiil: ge- yok.",
      },
      {
        kind: "build",
        tr: "Klimayı hiç kullanmadım.",
        answer: "Die Klimaanlage habe ich nie gebraucht.",
        hint: "„gebrauchen“ ayrılmaz ama ge- ile başlar — kök öyle.",
      },
      {
        kind: "form",
        prompt: "Kurulum kartını doldur.",
        facts: "Cihaz: hoparlör; adım 1: kabloyu prize; adım 2: cihaza bağla; adım 3: aç; sorun olursa: priz, kablo, cihaz sırasıyla.",
        fields: [
          { label: "Gerät", answer: "Lautsprecher", accept: ["der Lautsprecher", "ein Lautsprecher"] },
          { label: "Schritt 1", answer: "Kabel in die Steckdose", accept: ["Steckdose", "das Kabel einstecken"] },
          { label: "Schritt 3", answer: "einschalten", accept: ["Gerät einschalten", "anschalten"] },
          { label: "Bei Problemen", answer: "Steckdose, Kabel, Gerät", accept: ["Steckdose Kabel Gerät", "in dieser Reihenfolge"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Ortaçlardaki 'ge-' kullanımını düzelt.",
        source: "Ich habe das Kabel anschlossen und die Leitung geunterbrochen.",
        answer: "Ich habe das Kabel angeschlossen und die Leitung unterbrochen.",
        why: "Türkçede önek diye bir sınıf yoktur, o yüzden ortaç hep aynı kalıpla kuruluyor. Almanca ikiye ayırır: AYRILABİLEN fiilde (an-, ein-, auf-, mit-) ge- önekle gövdenin ARASINA girer — angeschlossen, eingeschaltet. AYRILMAYAN fiilde (be-, ver-, ent-, unter-, über-) ge- HİÇ gelmez — unterbrochen, verbunden, bezahlt.",
      },
    ],
  },
  {
    id: "b1-u36-w2",
    level: "B1",
    skill: "writing",
    unit: 36,
    title: "Datenverlust melden",
    genre: "Sorun bildirimi",
    intro: "Bir veri kaybını bildir. Bazı isimler Almancada yalnız çoğuldur.",
    minutes: 12,
    gloss: [
      { de: "die Daten", tr: "veriler", en: "data" },
      { de: "die Festplatte", tr: "sabit disk", en: "hard drive" },
      { de: "sichern", tr: "yedeklemek", en: "to back up" },
      { de: "das Netzwerk", tr: "ağ", en: "network" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Veriler dünden beri kayıp.",
        answer: "Die Daten sind seit gestern weg.",
        hint: "„die Daten“ çoğul → sind.",
      },
      {
        kind: "build",
        tr: "Masraflar sandığımdan yüksek.",
        answer: "Die Kosten sind höher, als ich gedacht habe.",
        hint: "„die Kosten“ da yalnız çoğuldur.",
      },
      {
        kind: "free",
        prompt: "Bir teknik sorunu bildir: ne oldu ve ne zaman, ne denedin, şu an ne çalışmıyor, ne yapılmasını istiyorsun ve ne zamana kadar. Resmî hitap ve kapanış kullan.",
        checklist: [
          "Sorun ve tarih net mi?",
          "Denenenler sayılmış mı?",
          "Şu anki durum söylenmiş mi?",
          "İstek ve tarih var mı?",
          "Resmî hitap ve kapanış var mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "seit gestern Morgen sind auf meinem Rechner alle Daten aus dem " +
          "Ordner „Projekt“ verschwunden. Gelöscht habe ich nichts.\n\n" +
          "Ich habe zuerst das Gerät neu eingeschaltet und danach die " +
          "Verbindung zum Netzwerk unterbrochen und wieder verbunden. " +
          "Das hat nichts geändert. Seitdem arbeite ich nicht mehr auf " +
          "derselben Festplatte, damit nichts überschrieben wird.\n\n" +
          "Die Daten sind für ein laufendes Projekt nötig, und die Kosten " +
          "einer Wiederherstellung sind kleiner als der Verlust. " +
          "Ich bitte Sie deshalb, das Gerät bis Freitag anzusehen.\n\n" +
          "Für einen Rückruf am Vormittag wäre ich dankbar.\n\n" +
          "Mit freundlichen Grüßen\nNuri Öz",
        phrases: [
          { de: "Seit gestern sind die Daten weg.", tr: "Dünden beri veriler kayıp.", en: "The data has been gone since yesterday." },
          { de: "Gelöscht habe ich nichts.", tr: "Hiçbir şey silmedim.", en: "I didn't delete anything." },
          { de: "Ich bitte Sie, … anzusehen.", tr: "… bakmanızı rica ederim.", en: "I ask you to look at …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Çoğul-only isimlerin fiilini düzelt.",
        source: "Das Daten ist weg und die Kosten ist hoch.",
        answer: "Die Daten sind weg und die Kosten sind hoch.",
        why: "Türkçede 'veri' ve 'masraf' tekildir ve çoğul eki isteğe bağlıdır, o yüzden Almancada tekil artikel ve tekil fiil seçiliyor. Almancada bu isimler YALNIZ çoğuldur: die Daten, die Kosten, die Leute, die Eltern, die Ferien. Tekil biçimleri yoktur — artikel de fiil de çoğul olmak zorunda.",
      },
    ],
  },
];

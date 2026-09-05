import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 5 — "Ev ve kira dünyası" sonu (dersler 17–20).
 *
 * Dersler: Die Nebenkostenabrechnung · Mein Einrichtungsstil ·
 * Der Umzugstag · Zur Untermiete.
 *
 * Ünitenin yayı taşınmanın kendi sırası: hesap gelir, ev döşenir, taşınma
 * günü planlanır, oda kısa süreliğine devredilir. Zaman bağlaçları
 * (bevor, während, sobald, solange) burada ilk kez bir arada çalışıyor,
 * o yüzden iki egzersiz doğrudan sıralamayı ölçüyor.
 *
 * Yeni 32 kelime: berechnen, prüfen, die Zahlung, der Betrag, die Summe,
 * die Höhe, das Recht, der Grund, die Einrichtung, der Stil, der Teppich,
 * das Regal, die Wand, der Sessel, der Spiegel, die Kerze, bevor, während,
 * erledigen, sobald, solange, die Kiste, bereits, schließlich, möbliert,
 * trotzdem, zwar, die Wahl, ziemlich, bestimmt, das Kissen, die Decke.
 */
export const b1U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u5-r1",
    level: "B1",
    skill: "reading",
    unit: 5,
    title: "Die Nebenkostenabrechnung",
    genre: "Hesap dökümü",
    intro: "Yıllık gider hesabı geldi ve tutar yüksek. Neyin nasıl hesaplandığını oku.",
    minutes: 5,
    gloss: [
      { de: "berechnen", tr: "hesaplamak", en: "to calculate" },
      { de: "der Betrag", tr: "tutar", en: "amount" },
      { de: "die Höhe", tr: "yükseklik / tutar", en: "level" },
      { de: "die Summe", tr: "toplam", en: "total" },
      { de: "das Recht", tr: "hak", en: "right" },
    ],
    text:
      "Einmal im Jahr kommt die Abrechnung für Heizung, Wasser und die Reinigung im Haus. " +
      "Im letzten Jahr wurde für unsere Wohnung ein Betrag von neunhundert Euro berechnet. " +
      "Bezahlt hatten wir bereits siebenhundertzwanzig, also fehlen hundertachtzig Euro.\n\n" +
      "Die Summe wird nicht für jede Wohnung gleich berechnet. Meistens zählt die Fläche: " +
      "wer mehr Quadratmeter hat, zahlt mehr. Beim Wasser wird oft die Zahl der Personen genommen. " +
      "Die Höhe der Kosten hängt also nicht nur von Ihnen ab.\n\n" +
      "Sie haben das Recht, die Abrechnung genau zu prüfen. Fragen Sie nach den Zahlen, " +
      "bevor Sie zahlen. Wenn ein Grund fehlt oder eine Zahl falsch ist, schreiben Sie " +
      "sofort. Die Frist dafür ist zwölf Monate.\n\n" +
      "Trotzdem lohnt sich Ruhe: meistens ist es kein Fehler. Meistens war der Winter einfach kalt. " +
      "Bestimmt hilft ein kurzes Gespräch mehr als ein böser Brief.",
    questions: [
      {
        text: "Wie hoch war der Betrag im letzten Jahr?",
        options: ["Siebenhundertzwanzig Euro", "Neunhundert Euro", "Hundertachtzig Euro"],
        answer: 1,
        explain: "„… wurde für unsere Wohnung ein Betrag von neunhundert Euro berechnet.“",
      },
      {
        text: "Wonach wird meistens gerechnet?",
        options: ["Nach der Fläche", "Nach der Etage", "Nach dem Alter"],
        answer: 0,
        explain: "„Meistens zählt die Fläche: wer mehr Quadratmeter hat, zahlt mehr.“",
      },
      {
        text: "Was ist Ihr Recht als Mieter?",
        options: ["Nicht zu zahlen", "Die Abrechnung zu prüfen", "Sofort auszuziehen"],
        answer: 1,
        explain: "„Sie haben das Recht, die Abrechnung genau zu prüfen.“",
      },
      {
        text: "Wie lang ist die Frist für eine Antwort?",
        options: ["Drei Monate", "Sechs Monate", "Zwölf Monate"],
        answer: 2,
        explain: "„Die Frist dafür ist zwölf Monate.“",
      },
      {
        kind: "gapfill",
        text: "Fragen Sie nach den Zahlen, ___ Sie zahlen.",
        options: [],
        answer: 0,
        accept: ["bevor"],
        explain: "Önceyi gösteren bağlaç: „bevor“. Fiil yan cümlenin sonuna gider.",
      },
      {
        kind: "short_answer",
        text: "Wie viel wurde schon bezahlt?",
        options: [],
        answer: 0,
        accept: ["siebenhundertzwanzig Euro", "siebenhundertzwanzig", "720"],
        explain: "„Bezahlt hatten wir bereits siebenhundertzwanzig …“",
      },
    ],
  },
  {
    id: "b1-u5-r2",
    level: "B1",
    skill: "reading",
    unit: 5,
    title: "Möbliert oder leer?",
    genre: "Forum yazısı",
    intro: "Eşyalı mı boş mu tutmalı? Bir forumda iki görüş. Zıtlık bağlaçlarına dikkat.",
    minutes: 5,
    gloss: [
      { de: "möbliert", tr: "eşyalı", en: "furnished" },
      { de: "die Einrichtung", tr: "döşeme / dekorasyon", en: "furnishing" },
      { de: "die Wahl", tr: "seçim", en: "choice" },
      { de: "trotzdem", tr: "yine de", en: "nevertheless" },
      { de: "zwar", tr: "gerçi", en: "admittedly" },
    ],
    text:
      "Frage: Ich komme für ein Jahr in die Stadt. Soll ich möbliert oder leer mieten?\n\n" +
      "Antwort 1: Nimm möbliert. Du hast zwar weniger Wahl bei der Einrichtung, aber du sparst " +
      "sehr viel Zeit. Ein Regal, ein Sessel, ein Teppich — das kostet zusammen schnell " +
      "tausend Euro. Für ein Jahr ist das ziemlich teuer. Kissen und Decken sind meistens " +
      "auch schon da. Trotzdem solltest du genau schauen, in welchem Zustand die Möbel sind.\n\n" +
      "Antwort 2: Ich sehe das anders. Möbliert ist bequem, aber die Miete ist höher. " +
      "Solange du bleibst, zahlst du jeden Monat für Sachen, die dir nicht gehören. " +
      "Bevor ich das mache, kaufe ich lieber gebraucht. Sobald ich wieder ausziehe, " +
      "verkaufe ich alles zurück. Schließlich ist ein Spiegel oder eine Kerze kein " +
      "Grund für dreihundert Euro mehr im Monat.\n\n" +
      "Antwort 3: Beide haben recht. Es hängt davon ab, wie viel Zeit du hast.",
    questions: [
      {
        text: "Was ist der Vorteil von möbliert nach Antwort 1?",
        options: ["Man spart Zeit", "Die Miete ist niedriger", "Man hat mehr Wahl"],
        answer: 0,
        explain: "„Du hast zwar weniger Wahl bei der Einrichtung, aber du sparst sehr viel Zeit.“",
      },
      {
        text: "Worauf soll man laut Antwort 1 achten?",
        options: ["Auf die Etage", "Auf den Zustand der Möbel", "Auf die Nachbarn"],
        answer: 1,
        explain: "„Trotzdem solltest du genau schauen, in welchem Zustand die Möbel sind.“",
      },
      {
        text: "Was macht Antwort 2 lieber?",
        options: ["Möbliert mieten", "Gebraucht kaufen und später verkaufen", "Gar nichts kaufen"],
        answer: 1,
        explain: "„… kaufe ich lieber gebraucht. Sobald ich wieder ausziehe, verkaufe ich alles zurück.“",
      },
      {
        text: "Was sagt Antwort 3?",
        options: ["Möbliert ist besser", "Leer ist besser", "Es hängt von der Zeit ab"],
        answer: 2,
        explain: "„Es hängt davon ab, wie viel Zeit du hast.“",
      },
      {
        kind: "gapfill",
        text: "___ ich wieder ausziehe, verkaufe ich alles zurück.",
        options: [],
        answer: 0,
        accept: ["Sobald"],
        explain: "„Sobald ich wieder ausziehe …“ — bir şey olur olmaz.",
      },
      {
        kind: "short_answer",
        text: "Wie lange kommt die Person in die Stadt?",
        options: [],
        answer: 0,
        accept: ["für ein Jahr", "ein Jahr"],
        explain: "„Ich komme für ein Jahr in die Stadt.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u5-l1",
    level: "B1",
    skill: "listening",
    unit: 5,
    title: "Der Umzugstag",
    genre: "Planlama konuşması",
    intro: "Taşınma günü planlanıyor. Dinle: hangi iş hangisinden önce, kim ne yapıyor?",
    minutes: 4,
    gloss: [
      { de: "die Kiste", tr: "sandık / koli", en: "box" },
      { de: "erledigen", tr: "halletmek", en: "to get done" },
      { de: "solange", tr: "-dığı sürece", en: "as long as" },
      { de: "schließlich", tr: "en sonunda", en: "finally" },
    ],
    segments: [
      { text: "Also, morgen um acht. Was machen wir zuerst?" },
      { text: "Bevor der Wagen kommt, tragen wir alle Kisten in den Flur." },
      { text: "Gut. Und während du unten packst, reinige ich die Küche." },
      { text: "Solange die Küche nicht fertig ist, können wir den Schlüssel nicht geben." },
      { text: "Sobald alles unten ist, fahren wir los." },
      { text: "Wer erledigt das mit dem Amt?" },
      { text: "Das mache ich am Montag. Schließlich muss die neue Adresse gemeldet werden." },
      { text: "Sehr gut. Dann bringe ich am Abend etwas zu essen mit." },
    ],
    questions: [
      {
        text: "Was passiert, bevor der Wagen kommt?",
        options: ["Die Küche wird gereinigt", "Die Kisten kommen in den Flur", "Der Schlüssel wird gegeben"],
        answer: 1,
        explain: "„Bevor der Wagen kommt, tragen wir alle Kisten in den Flur.“",
      },
      {
        text: "Was macht die zweite Person, während die erste packt?",
        options: ["Sie reinigt die Küche", "Sie fährt zum Amt", "Sie kauft Essen"],
        answer: 0,
        explain: "„Und während du unten packst, reinige ich die Küche.“",
      },
      {
        text: "Wann kann der Schlüssel gegeben werden?",
        options: ["Sofort", "Wenn die Küche fertig ist", "Am Montag"],
        answer: 1,
        explain: "„Solange die Küche nicht fertig ist, können wir den Schlüssel nicht geben.“",
      },
      {
        kind: "gapfill",
        text: "___ alles unten ist, fahren wir los.",
        options: [],
        answer: 0,
        accept: ["Sobald"],
        explain: "„Sobald alles unten ist, fahren wir los.“",
      },
      {
        kind: "short_answer",
        text: "Wann wird die neue Adresse gemeldet?",
        options: [],
        answer: 0,
        accept: ["am Montag", "Montag"],
        explain: "„Das mache ich am Montag.“",
      },
    ],
  },
  {
    id: "b1-u5-l2",
    level: "B1",
    skill: "listening",
    unit: 5,
    title: "Ein Zimmer zur Untermiete",
    genre: "Oda gösterme",
    intro: "Kısa dönem bir oda gösteriliyor. Dinle: ne var, ne yok, ne kadar süre?",
    minutes: 4,
    gloss: [
      { de: "möbliert", tr: "eşyalı", en: "furnished" },
      { de: "der Sessel", tr: "koltuk", en: "armchair" },
      { de: "die Decke", tr: "battaniye / tavan", en: "blanket" },
      { de: "das Regal", tr: "raf", en: "shelf" },
    ],
    segments: [
      { text: "Das Zimmer ist möbliert. Bett, Regal und ein Sessel sind da." },
      { text: "Und Decken oder Kissen?" },
      { text: "Zwei Decken sind im Regal. Kissen bringst du bitte selbst mit." },
      { text: "Wie lange kann ich bleiben?" },
      { text: "Von Oktober bis Februar. Danach kommt die Studentin zurück." },
      { text: "Zwar ist das kurz, aber für mich passt es genau." },
      { text: "Gut. Der Spiegel im Flur gehört auch dazu." },
      { text: "Dann würde ich gern nehmen. Wann kann ich einziehen?" },
    ],
    questions: [
      {
        text: "Was ist im Zimmer schon da?",
        options: ["Bett, Regal und Sessel", "Nur ein Bett", "Nichts"],
        answer: 0,
        explain: "„Bett, Regal und ein Sessel sind da.“",
      },
      {
        text: "Was soll der neue Mieter mitbringen?",
        options: ["Decken", "Kissen", "Einen Spiegel"],
        answer: 1,
        explain: "„Kissen bringst du bitte selbst mit.“",
      },
      {
        text: "Wie lange ist das Zimmer frei?",
        options: ["Von Oktober bis Februar", "Ein ganzes Jahr", "Nur einen Monat"],
        answer: 0,
        explain: "„Von Oktober bis Februar.“",
      },
      {
        kind: "gapfill",
        text: "___ ist das kurz, aber für mich passt es genau.",
        options: [],
        answer: 0,
        accept: ["Zwar"],
        explain: "„Zwar ist das kurz, aber …“ — önce kabul, sonra çekince.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Decken sind im Regal?",
        options: [],
        answer: 0,
        accept: ["zwei", "zwei Decken"],
        explain: "„Zwei Decken sind im Regal.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u5-w1",
    level: "B1",
    skill: "writing",
    unit: 5,
    title: "Widerspruch zur Abrechnung",
    genre: "Resmî itiraz",
    intro: "Gider hesabındaki bir sayı yanlış. Kişisiz, tarihli ve gerekçeli yaz.",
    minutes: 8,
    gloss: [
      { de: "die Summe", tr: "toplam", en: "total" },
      { de: "prüfen", tr: "kontrol etmek", en: "to check" },
      { de: "der Grund", tr: "sebep", en: "reason" },
      { de: "die Zahlung", tr: "ödeme", en: "payment" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Hesabı dikkatlice kontrol ettim.",
        answer: "Ich habe die Abrechnung genau geprüft.",
        hint: "Yardımcı fiil ikinci sırada, ortaç sonda.",
      },
      {
        kind: "build",
        tr: "Su için hesaplanan toplam bana çok yüksek geliyor.",
        answer: "Die Summe für das Wasser kommt mir zu hoch vor.",
        hint: "Ayrılabilen fiil: önek cümlenin sonunda kalır.",
      },
      {
        kind: "build",
        tr: "Sebep açıklanana kadar ödemeyle bekliyorum.",
        answer: "Ich warte mit der Zahlung, solange der Grund nicht erklärt ist.",
        alternatives: ["Solange der Grund nicht erklärt ist, warte ich mit der Zahlung."],
        hint: "„solange“ yan cümle kurar; fiil sona gider.",
      },
      {
        kind: "form",
        prompt: "İtiraz yazısının künyesini doldur.",
        facts: "Kiracı: Ayla Yıldız, 2. kat; hesap yılı geçen yıl; itiraz edilen kalem su; tutar 180 avro; istenen: yeni hesap.",
        fields: [
          { label: "Mieterin", answer: "Ayla Yıldız", accept: ["Ayla", "Yıldız"] },
          { label: "Position", answer: "Wasser", accept: ["das Wasser", "Kosten für Wasser"] },
          { label: "Betrag", answer: "180 Euro", accept: ["hundertachtzig Euro", "180"] },
          { label: "Wunsch", answer: "neue Abrechnung", accept: ["eine neue Abrechnung", "Prüfung"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İyelik yapısını düzelt.",
        source: "Die Höhe von die Kosten ist zu hoch.",
        answer: "Die Höhe der Kosten ist zu hoch.",
        why: "Türkçedeki '-in hâli' Almancada Genitiv ile kurulur: 'von die Kosten' değil, 'der Kosten'.",
      },
    ],
  },
  {
    id: "b1-u5-w2",
    level: "B1",
    skill: "writing",
    unit: 5,
    title: "Das Zimmer weitergeben",
    genre: "İlan metni",
    intro: "Odanı kısa süreliğine devredeceksin. Bir ilan yaz: ne var, ne kadar süre, hangi koşullar.",
    minutes: 12,
    gloss: [
      { de: "möbliert", tr: "eşyalı", en: "furnished" },
      { de: "die Einrichtung", tr: "döşeme / dekorasyon", en: "furnishing" },
      { de: "der Teppich", tr: "halı", en: "carpet" },
      { de: "die Wand", tr: "duvar", en: "wall" },
      { de: "bestimmt", tr: "kesinlikle", en: "certainly" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Oda eşyalı ve ekim ayından şubata kadar boş.",
        answer: "Das Zimmer ist möbliert und von Oktober bis Februar frei.",
        hint: "İki bilgi bağlaçla birleşiyor; fiil ikinci sırada kalıyor.",
      },
      {
        kind: "build",
        tr: "Ben yokken bitkilere bakman gerekiyor.",
        answer: "Solange ich weg bin, musst du dich um die Pflanzen kümmern.",
        alternatives: ["Du musst dich um die Pflanzen kümmern, solange ich weg bin."],
        hint: "„solange“ yan cümlesi; ana cümle fiille başlar.",
      },
      {
        kind: "free",
        prompt: "Odanı beş ay için devretmek istiyorsun. Bir ilan yaz: odanın büyüklüğü ve döşemesi, hangi tarihler arası boş, kira ve giderler, ev arkadaşları hakkında bir cümle, ve kimin uygun olduğu.",
        checklist: [
          "Oda ve döşeme somut anlatılmış mı (en az üç eşya)?",
          "Tarih aralığı net mi?",
          "Kira ve giderler ayrı ayrı yazılmış mı?",
          "Ev arkadaşları ve kurallar hakkında bir cümle var mı?",
          "Kimin uygun olduğunu söyledin mi?",
        ],
        minWords: 70,
        sample:
          "Zimmer zur Untermiete, achtzehn Quadratmeter, möbliert.\n\n" +
          "Frei von Oktober bis Februar, also fünf Monate. Die Einrichtung ist einfach, " +
          "aber alles ist da: Bett, Regal, Sessel, ein großer Spiegel und ein Teppich. " +
          "An der Wand ist Platz für deine Sachen. Zwei Decken bekommst du, Kissen bitte " +
          "selbst mitbringen.\n\n" +
          "Die Miete ist dreihundert Euro, die Kosten für Heizung und Wasser sind " +
          "zusätzlich etwa achtzig Euro im Monat.\n\n" +
          "Wir sind zu dritt in der WG. Jeder reinigt eine Woche lang die Küche, " +
          "und ab elf ist es bei uns still. Ein Haustier geht leider nicht.\n\n" +
          "Wenn du ruhig bist und nur kurz bleibst, passt das bestimmt. " +
          "Melde dich einfach, dann zeige ich dir alles.",
        phrases: [
          { de: "frei von … bis …", tr: "…'den …'e kadar boş", en: "available from … to …" },
          { de: "Die Miete ist …, zusätzlich …", tr: "Kira …, ayrıca …", en: "The rent is …, in addition …" },
          { de: "Melde dich einfach.", tr: "Sadece haber ver.", en: "Just get in touch." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Cümle başındaki 'zwar' sonrası sırayı düzelt.",
        source: "Zwar das Zimmer ist klein, aber es ist möbliert.",
        answer: "Zwar ist das Zimmer klein, aber es ist möbliert.",
        why: "'zwar' cümlenin başındaysa birinci öğedir; çekimli fiil hemen arkasından gelir (ist das Zimmer), özne üçüncü sıraya kayar.",
      },
    ],
  },
];

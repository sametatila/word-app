import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: yerel haber, kurum telefonu ve resmî başvuru. Monolog bir değer
 * sorusunu tartıştırır; dil bilgisi edilgen çatının şimdiki zamanı.
 */
export const deB1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r4",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Der Markt zieht um",
    genre: "Haber",
    intro: "Yerel bir haber okuyacaksın: pazar neden taşınıyor, kim itiraz ediyor, şehir ne söz veriyor.",
    gloss: [
      { de: "der Stadtrat", tr: "belediye meclisi", en: "city council" },
      { de: "das Pflaster", tr: "kaldırım taşı", en: "pavement" },
      { de: "erneuern", tr: "yenilemek", en: "to renew" },
      { de: "die Kundschaft", tr: "müşteri kitlesi", en: "customers" },
      { de: "die Standgebühr", tr: "tezgâh ücreti", en: "stall fee" },
      { de: "einrichten", tr: "kurmak", en: "to set up" },
      { de: "zurückkehren", tr: "geri dönmek", en: "to return" },
    ],
    minutes: 7,
    text:
      "DER MARKT ZIEHT UM\n\n" +
      "Ab dem ersten Oktober wird der Wochenmarkt nicht mehr auf dem Kirchplatz aufgebaut, sondern auf dem " +
      "Vorplatz des Bahnhofs. Das hat der Stadtrat am Dienstag mit knapper Mehrheit beschlossen.\n\n" +
      "Der Grund liegt unter dem Pflaster: Auf dem Kirchplatz werden im Herbst die Wasserleitungen erneuert. " +
      "Die Arbeiten dauern nach Angaben der Stadtwerke mindestens vierzehn Monate. So lange kann der Platz " +
      "nur zur Hälfte genutzt werden.\n\n" +
      "Nicht alle sind zufrieden. „Meine Kundschaft ist über achtzig und kommt zu Fuß“, sagt Gemüsehändlerin " +
      "Silke Ohm. „Zum Bahnhof sind es zwölf Minuten mehr. Das klingt wenig, ist es aber nicht.“ " +
      "Andere Händler sehen eine Chance: Am Bahnhof werden täglich mehr als zehntausend Menschen gezählt, " +
      "viele davon zwischen sechzehn und dreißig.\n\n" +
      "Die Stadt verspricht drei Dinge. Der Platz wird vor jedem Markttag gereinigt, die Standgebühr wird im " +
      "ersten halben Jahr nicht erhöht, und zwei zusätzliche Bushaltestellen werden eingerichtet.\n\n" +
      "Ob der Markt danach zurückkehrt, ist offen. Im Rat wurde bereits gefragt, ob der Bahnhofsvorplatz nicht " +
      "der bessere Ort sei. Wer den Markt kennt, weiß aber: Entschieden wird das am Ende von den Kundinnen " +
      "und Kunden.",
    questions: [
      {
        text: "Was ist die Nachricht?",
        options: [
          "Der Wochenmarkt bekommt einen neuen Ort.",
          "Der Kirchplatz wird zu einem Parkplatz.",
          "Der Wochenmarkt wird ganz abgeschafft.",
        ],
        answer: 0,
        explain: "İlk cümle taşınmayı duyuruyor: „… nicht mehr auf dem Kirchplatz aufgebaut, sondern auf dem Vorplatz des Bahnhofs.“",
      },
      {
        text: "Warum zieht der Markt um?",
        options: [
          "Auf dem Kirchplatz wird gebaut.",
          "Der Kirchplatz ist zu klein geworden.",
          "Die Händler haben darum gebeten.",
        ],
        answer: 0,
        explain: "„Auf dem Kirchplatz werden im Herbst die Wasserleitungen erneuert.“",
      },
      {
        kind: "truefalse",
        text: "Die Standgebühr steigt sofort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„… die Standgebühr wird im ersten halben Jahr nicht erhöht.“",
      },
      {
        kind: "gapfill",
        text: "Die Arbeiten dauern mindestens ___ Monate.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„Die Arbeiten dauern nach Angaben der Stadtwerke mindestens vierzehn Monate.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel länger ist der Weg zum Bahnhof?",
        options: [],
        answer: 0,
        accept: ["zwölf Minuten", "12 Minuten", "zwölf Minuten mehr"],
        explain: "„Zum Bahnhof sind es zwölf Minuten mehr.“",
      },
      {
        text: "Warum sehen manche Händler eine Chance?",
        options: [
          "Am Bahnhof kommen mehr junge Leute vorbei.",
          "Am Bahnhof ist die Standgebühr günstiger.",
          "Am Bahnhof gibt es mehr Platz für Stände.",
        ],
        answer: 0,
        explain: "„… werden täglich mehr als zehntausend Menschen gezählt, viele davon zwischen sechzehn und dreißig.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l4",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Zum ersten Mal spenden",
    genre: "Telefon konuşması",
    intro: "Biri kan bağışı için telefonla bilgi alıyor: koşullar, süre, öncesi ve sonrası için ne öneriliyor.",
    gloss: [
      { de: "spenden", tr: "bağışlamak", en: "to donate" },
      { de: "wiegen", tr: "ağırlığında olmak", en: "to weigh" },
      { de: "der Fragebogen", tr: "anket formu", en: "questionnaire" },
      { de: "nüchtern", tr: "aç karnına", en: "on an empty stomach" },
      { de: "der Magen", tr: "mide", en: "stomach" },
      { de: "die Auskunft", tr: "bilgi", en: "information" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Mitarbeiterin", text: "Blutspendedienst Mitte, Kalinowski, guten Tag." },
      { speaker: "Anrufer", text: "Guten Tag. Ich würde gern zum ersten Mal Blut spenden und habe ein paar Fragen." },
      { speaker: "Mitarbeiterin", text: "Sehr gern. Zuerst das Wichtigste: Sie müssen mindestens achtzehn sein und über fünfzig Kilo wiegen." },
      { speaker: "Anrufer", text: "Das passt. Wie lange dauert das Ganze?" },
      { speaker: "Mitarbeiterin", text: "Rechnen Sie mit einer Stunde. Die Spende selbst dauert acht bis zehn Minuten, der Rest ist Fragebogen, Untersuchung und Ruhepause." },
      { speaker: "Anrufer", text: "Muss ich nüchtern kommen?" },
      { speaker: "Mitarbeiterin", text: "Im Gegenteil. Essen Sie normal und trinken Sie vorher mindestens einen halben Liter Wasser. Auf keinen Fall mit leerem Magen kommen." },
      { speaker: "Anrufer", text: "Und danach? Ich habe abends Training." },
      { speaker: "Mitarbeiterin", text: "Das würde ich verschieben. Sport wird am Spendetag nicht empfohlen, auch langes Stehen in der Sonne nicht." },
      { speaker: "Anrufer", text: "Verstanden. Brauche ich einen Termin?" },
      { speaker: "Mitarbeiterin", text: "Beim ersten Mal ja, und bringen Sie bitte einen Ausweis mit. Ich hätte Donnerstag um halb fünf frei." },
      { speaker: "Anrufer", text: "Den nehme ich. Vielen Dank für die Auskunft." },
    ],
    questions: [
      {
        text: "Warum ruft der Mann an?",
        options: [
          "Er will zum ersten Mal Blut spenden.",
          "Er möchte einen Termin verschieben.",
          "Er sucht Arbeit beim Spendedienst.",
        ],
        answer: 0,
        explain: "„Ich würde gern zum ersten Mal Blut spenden und habe ein paar Fragen.“",
      },
      {
        text: "Wie lange dauert die Spende selbst?",
        options: ["acht bis zehn Minuten", "eine ganze Stunde", "eine halbe Stunde"],
        answer: 0,
        explain: "„Die Spende selbst dauert acht bis zehn Minuten“ — bir saat ise her şey dahil süre.",
      },
      {
        kind: "truefalse",
        text: "Man soll nüchtern zur Spende kommen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Im Gegenteil. Essen Sie normal … Auf keinen Fall mit leerem Magen kommen.“",
      },
      {
        kind: "short_answer",
        text: "Was soll der Mann mitbringen?",
        options: [],
        answer: 0,
        accept: ["einen Ausweis", "Ausweis", "seinen Ausweis"],
        explain: "„… und bringen Sie bitte einen Ausweis mit.“",
      },
      {
        kind: "dictation",
        text: "Aç karnına gelmemek için söylenen uyarıyı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Auf keinen Fall mit leerem Magen kommen.", "Auf keinen Fall mit leerem Magen kommen"],
        explain: "„Auf keinen Fall mit leerem Magen kommen.“ — „auf keinen Fall“ kesin bir yasak bildirir.",
      },
      {
        text: "Was rät die Mitarbeiterin für den Abend?",
        options: ["das Training zu verschieben", "noch mehr Wasser zu trinken", "früh schlafen zu gehen"],
        answer: 0,
        explain: "„Das würde ich verschieben. Sport wird am Spendetag nicht empfohlen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w4",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Antrag auf einen ermäßigten Beitrag",
    genre: "Başvuru yazısı",
    intro: "Bir dernekten indirimli aidat isteyeceksin; önce iki cümle kur, sonra resmî başvuru yazısını yaz.",
    gloss: [
      { de: "der Beitrag", tr: "aidat", en: "membership fee" },
      { de: "die Ermäßigung", tr: "indirim", en: "reduction" },
      { de: "die Bescheinigung", tr: "belge", en: "certificate" },
      { de: "befristet", tr: "süreli", en: "fixed-term" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Aidat her yılın başında hesaptan çekiliyor.",
        answer: "Der Beitrag wird am Anfang jedes Jahres abgebucht.",
        alternatives: ["Am Anfang jedes Jahres wird der Beitrag abgebucht."],
        hint: "Edilgen çatı „werden + Partizip II“ ile kurulur: werden ikinci sırada, Partizip cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Belge ek olarak gönderiliyor.",
        answer: "Die Bescheinigung wird als Anhang mitgeschickt.",
        alternatives: ["Als Anhang wird die Bescheinigung mitgeschickt."],
        hint: "Edilgen cümlede eylemi kimin yaptığı söylenmeyebilir; öne çıkan, işin kendisidir.",
      },
      {
        kind: "free",
        prompt:
          "Üyesi olduğun bir dernekten indirimli aidat iste. Kim olduğunu ve ne zamandır üye olduğunu yaz, durumunda ne değiştiğini açıkla, tam olarak ne istediğini söyle, hangi belgeyi eklediğini belirt ve kibar bir kapanış yaz.",
        checklist: [
          "Kendini tanıt ve üyelik süreni yaz",
          "Durumundaki değişikliği açıkla",
          "İstediğin şeyi ve süresini net söyle",
          "Eklediğin belgeyi belirt ve kibarca bitir",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich bin seit … Mitglied.", tr: "… yıldır üyeyim." },
          { de: "Meine Situation hat sich geändert.", tr: "Durumum değişti." },
          { de: "Deshalb möchte ich fragen, ob …", tr: "Bu yüzden … olup olmadığını sormak istiyorum" },
          { de: "Eine Bescheinigung wird mitgeschickt.", tr: "Bir belge ekte gönderiliyor." },
          { de: "Für eine kurze Rückmeldung wäre ich dankbar.", tr: "Kısa bir dönüş için minnettar olurum." },
        ],
        sample:
          "Sehr geehrte Frau Reinhardt, mein Name ist Kerem Aksoy, ich bin seit vier Jahren Mitglied im Turnverein " +
          "Ostheim und trainiere zweimal pro Woche in der Volleyballgruppe. Seit dem ersten Juli arbeite ich nur " +
          "noch halbtags; mein Vertrag wurde befristet auf zwanzig Stunden geändert. Der volle Jahresbeitrag von " +
          "zweihundertvierzig Euro ist für mich im Moment schwer zu tragen. Deshalb möchte ich fragen, ob mir für " +
          "zwölf Monate der ermäßigte Beitrag gewährt werden kann. Eine Bescheinigung meines Arbeitgebers wird " +
          "als Anhang mitgeschickt; weitere Unterlagen reiche ich gern nach. Ich würde den Verein sehr ungern " +
          "verlassen und hoffe deshalb auf eine Lösung. Für eine kurze Rückmeldung wäre ich Ihnen dankbar. " +
          "Mit freundlichen Grüßen, Kerem Aksoy",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s4",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Muss man seine Nachbarn kennen?",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: soruya net bir cevap ver ve iki farklı türde gerekçe kullan.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Komşularını tanımak gerekli mi? Görüşünü söyle, biri pratik biri insani olmak üzere en az iki gerekçe ver ve karşı görüşe de yer aç.",
      bulletsTr: [
        "Sorunun cevabını tek cümleyle ver",
        "Pratik bir gerekçe söyle",
        "Kişisel bir örnek ya da gözlem anlat",
        "Karşı görüşü kabul et ve sonuçla bitir",
      ],
      targets: [
        { de: "Der praktische Grund ist …", tr: "Pratik gerekçe şu: …" },
        { de: "In dem Haus, in dem ich …", tr: "Oturduğum evde …" },
        { de: "Ich verstehe trotzdem, dass …", tr: "Yine de … olduğunu anlıyorum" },
        { de: "Es reicht, wenn man …", tr: "… olması yeter" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "Ich glaube, man muss seine Nachbarn nicht mögen, aber man sollte sie kennen. Der praktische Grund ist " +
        "einfach: Wenn im Winter das Wasser abgestellt wird oder ein Paket ankommt, wird alles viel leichter, " +
        "wenn man drei Namen und eine Nummer hat. Der zweite Grund ist mir wichtiger. In dem Haus, in dem ich " +
        "vorher gewohnt habe, kannte niemand niemanden. Als eine ältere Frau zwei Wochen nicht mehr aus der " +
        "Wohnung kam, ist es keinem aufgefallen. Ich verstehe trotzdem, dass viele einfach ihre Ruhe wollen; " +
        "Nachbarschaft darf keine Pflicht sein. Deshalb würde ich sagen: Man muss nicht zusammen Kaffee trinken. " +
        "Es reicht, wenn man sich grüßt und weiß, wer hinter welcher Tür wohnt.",
      rubricHint:
        "İki farklı türde gerekçe beklenir (pratik ve insani) ve karşı görüş kabul edilmelidir; „wenn“ ve „dass“ yan cümlelerinde fiil sonda olmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g4",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Wer es macht, ist egal",
    genre: "Kural",
    intro: "Kurum dilinin temel çatısı: eylemi kimin yaptığı değil, neyin yapıldığı öne çıkar.",
    focus: "Passiv Präsens: werden + Partizip II",
    gloss: [
      { de: "abgeben", tr: "teslim etmek", en: "to hand in" },
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
      { de: "annehmen", tr: "teslim almak", en: "to accept" },
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçede ek, Almancada iki kelime",
        tr: "Türkçede edilgen fiilin içine girer: yap-ılıyor, gönder-iliyor. Almancada iki kelime gerekir: „werden“ ikinci sırada çekilir, Partizip II cümlenin sonuna gider. Etken cümlenin nesnesi, edilgen cümlenin öznesi olur.",
        examples: [
          { de: "Man repariert die Heizung.", tr: "Kaloriferi tamir ediyorlar.", note: "etken" },
          { de: "Die Heizung wird repariert.", tr: "Kalorifer tamir ediliyor.", note: "edilgen" },
          { de: "Die Formulare werden am Schalter abgegeben.", tr: "Formlar gişede teslim ediliyor." },
        ],
      },
      {
        heading: "Faili söylemek gerekirse",
        tr: "Genelde fail hiç söylenmez; söylemek gerekirse kişi için „von“ + Dativ, araç ya da sebep için „durch“ + Akkusativ kullanılır.",
        examples: [
          { de: "Der Brief wird von der Chefin unterschrieben.", tr: "Mektup müdür tarafından imzalanıyor.", note: "kişi → von" },
          { de: "Das Paket wird von dem Nachbarn angenommen.", tr: "Paketi komşu teslim alıyor." },
          { de: "Die Tür wird durch den Wind geschlossen.", tr: "Kapı rüzgârla kapanıyor.", note: "araç → durch" },
        ],
      },
      {
        heading: "İki karışma noktası",
        tr: "„werden“ tek başına „olmak“ demektir (Er wird Arzt) ve gelecek zamanı da kurar; edilgen olduğunu anlamak için sondaki Partizip II'ye bak. Ayrıca „sein + Partizip II“ süreci değil, sonucu anlatır.",
        examples: [
          { de: "Das Fenster wird geschlossen.", tr: "Pencere kapatılıyor.", note: "işlem sürüyor" },
          { de: "Das Fenster ist geschlossen.", tr: "Pencere kapalı.", note: "sonuç, durum" },
          { de: "Meine Schwester wird Lehrerin.", tr: "Kız kardeşim öğretmen oluyor.", note: "edilgen değil" },
        ],
      },
    ],
    questions: [
      {
        text: "Das Formular ___ am Schalter abgegeben.",
        options: ["wird", "ist", "hat"],
        answer: 0,
        explain: "Süren bir işlem anlatılıyor: werden + Partizip II.",
      },
      {
        text: "Die Fenster ___ jeden Monat geputzt.",
        options: ["werden", "wird", "sind"],
        answer: 0,
        explain: "Özne çoğul olduğu için yardımcı fiil de çoğul: werden.",
      },
      {
        text: "Der Brief wird von der Chefin ___.",
        options: ["unterschrieben", "unterschreiben", "unterschreibt"],
        answer: 0,
        explain: "Edilgende sondaki biçim Partizip II'dir: unterschrieben.",
      },
      {
        kind: "gapfill",
        text: "Hier ___ nicht geraucht.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Öznesiz edilgende yardımcı fiil hep tekildir: hier wird nicht geraucht.",
      },
      {
        kind: "gapfill",
        text: "Die Rechnungen ___ am Monatsende geschickt.",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Çoğul özne çoğul yardımcı fiil ister: werden … geschickt.",
      },
      {
        kind: "gapfill",
        text: "Das Paket wird von dem Nachbarn ___. (annehmen)",
        options: [],
        answer: 0,
        accept: ["angenommen"],
        explain: "Ayrılabilen fiilin Partizip'inde ge- ön ekle kökün arasına girer: an-ge-nommen.",
      },
      {
        kind: "gapfill",
        text: "Aktiv: „Man repariert die Heizung.“ — Passiv: „Die Heizung ___ repariert.“",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Etkenin nesnesi edilgenin öznesi olur ve tekil olduğu için wird gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die", "Tür", "wird", "um", "acht", "geschlossen"],
        explain: "„wird“ ikinci sırada, Partizip II en sonda: Die Tür wird um acht geschlossen.",
      },
      {
        kind: "truefalse",
        text: "„Der Kuchen wird von meiner Mutter gebacken.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Fail bir kişi olduğu için „von“ + Dativ doğru; yapı da werden + Partizip II.",
      },
      {
        kind: "truefalse",
        text: "„Die Tür wird von einem Schlüssel geöffnet.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Anahtar kişi değil araçtır; doğrusu „mit einem Schlüssel“ ya da „durch einen Schlüssel“.",
      },
    ],
  },
];

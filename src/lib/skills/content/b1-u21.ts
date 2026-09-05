import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 21 — "Çevre ve gündelik karar" (dersler 81–84).
 *
 * Dersler: Mülltrennung · Energie sparen · Verkehrswende ·
 * Nachhaltig einkaufen.
 *
 * Bu ünitenin sözlükçesi bileşik isimlerle dolu (Umweltschutz, Kraftwerk,
 * Fußgängerzone, Verkehrszeichen, Landwirtschaft, Umweltverschmutzung) ve
 * bu Türkçe konuşan için görünmez bir tuzak yaratıyor:
 *   bileşiğin cinsi  Türkçede isimlerin cinsi YOKTUR, o yüzden artikel
 *                    zaten tahminle seçiliyor; uzun bir bileşikte tahmin
 *                    daha da zorlaşıyor. Oysa kural kesin: cins DAİMA SON
 *                    parçadan gelir — der Schutz → der Umweltschutz,
 *                    das Werk → das Kraftwerk, die Zone → die Fußgängerzone.
 *                    Bilinmeyen bir bileşiğin artikeli tahmin edilmez,
 *                    ÇÖZÜLÜR.
 *   statt … zu       Türkçe '-mek yerine' tek kalıptır ve fiil çekimsizdir;
 *                    Almanca aynı şeyi zu'lu mastarla kurar, çekimli fiille
 *                    değil: "Statt mit dem Auto zu fahren, …".
 *
 * Yeni 32 kelime: entsorgen, die Tonne, das Pfand, sortieren, der Abfall,
 * verschmutzen, die Umweltverschmutzung, der Umweltschutz, der Strom,
 * das Kraftwerk, elektrisch, verbrauchen, staubsaugen, der Schutz,
 * die Wärme, die Kälte, die Luft, die Strecke, der Fußgänger,
 * der Radfahrer, die Fußgängerzone, das Verkehrszeichen, die Tankstelle,
 * die Ausfahrt, regional, die Herkunft, vermeiden, die Landwirtschaft,
 * der Bauernhof, die Kundin, die Ware, Bio.
 */
export const b1U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u21-r1",
    level: "B1",
    skill: "reading",
    unit: 21,
    title: "Welche Tonne für was?",
    genre: "Bina duyurusu",
    intro: "Atık ayrımı kuralları. Hangi çöp hangi kutuya?",
    minutes: 5,
    gloss: [
      { de: "die Tonne", tr: "çöp konteyneri", en: "bin" },
      { de: "sortieren", tr: "ayırmak", en: "to sort" },
      { de: "der Abfall", tr: "atık", en: "waste" },
      { de: "das Pfand", tr: "depozito", en: "deposit" },
      { de: "entsorgen", tr: "atmak / bertaraf etmek", en: "to dispose of" },
    ],
    text:
      "Im Hof stehen vier Tonnen. Wer den Abfall richtig sortiert, hilft mehr " +
      "als er denkt: falsch sortierter Müll wird am Ende oft ganz verbrannt.\n\n" +
      "Die blaue Tonne ist für Papier, die gelbe für Verpackungen, die braune " +
      "für Reste aus der Küche. Alles andere kommt in die graue Tonne. " +
      "Flaschen mit Pfand gehören in keine Tonne — die bringen Sie zurück " +
      "in den Laden.\n\n" +
      "Alte Geräte dürfen Sie nicht im Hof entsorgen. Dafür gibt es einen " +
      "Platz am Bahnhof, zweimal im Monat samstags. Ein altes Gerät im Müll " +
      "verschmutzt mehr als eine Woche Autofahren.\n\n" +
      "Der Umweltschutz fängt hier an, im Hof, nicht in großen Reden. " +
      "Es dauert zwei Wochen, bis es zur Gewohnheit wird — danach denkt man " +
      "gar nicht mehr darüber nach.",
    questions: [
      {
        text: "Wie viele Tonnen stehen im Hof?",
        options: ["Zwei", "Vier", "Sechs"],
        answer: 1,
        explain: "„Im Hof stehen vier Tonnen.“",
      },
      {
        text: "Wohin kommen Flaschen mit Pfand?",
        options: ["In die gelbe Tonne", "In die graue Tonne", "Zurück in den Laden"],
        answer: 2,
        explain: "„Flaschen mit Pfand gehören in keine Tonne — die bringen Sie zurück in den Laden.“",
      },
      {
        text: "Wo kann man alte Geräte abgeben?",
        options: ["Im Hof", "Am Bahnhof", "Im Laden"],
        answer: 1,
        explain: "„Dafür gibt es einen Platz am Bahnhof, zweimal im Monat samstags.“",
      },
      {
        kind: "gapfill",
        text: "___ Umweltschutz fängt hier an, im Hof.",
        options: [],
        answer: 0,
        accept: ["Der"],
        explain: "Bileşiğin cinsi SON parçadan gelir: der Schutz → der Umweltschutz.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert es, bis es zur Gewohnheit wird?",
        options: [],
        answer: 0,
        accept: ["zwei Wochen", "2 Wochen"],
        explain: "„Es dauert zwei Wochen, bis es zur Gewohnheit wird …“",
      },
    ],
  },
  {
    id: "b1-u21-r2",
    level: "B1",
    skill: "reading",
    unit: 21,
    title: "Wo der Strom bleibt",
    genre: "Bilgilendirme",
    intro: "Evde enerji nereye gidiyor? Hangi öneri ne kadar kazandırıyor?",
    minutes: 5,
    gloss: [
      { de: "der Strom", tr: "elektrik", en: "electricity" },
      { de: "verbrauchen", tr: "tüketmek", en: "to consume" },
      { de: "die Wärme", tr: "ısı", en: "warmth" },
      { de: "das Kraftwerk", tr: "santral", en: "power plant" },
      { de: "elektrisch", tr: "elektrikli", en: "electric" },
    ],
    text:
      "Die meisten glauben, dass elektrische Geräte den größten Teil " +
      "verbrauchen. Das stimmt nicht. Den größten Teil frisst die Wärme: " +
      "Heizung und warmes Wasser.\n\n" +
      "Ein Grad weniger im Wohnzimmer spart etwa sechs Prozent. Das merkt " +
      "man kaum, aber das Kraftwerk schon. Wer kurz lüftet statt das Fenster " +
      "stundenlang zu kippen, verliert auch weniger Wärme — die Wand kühlt " +
      "dann nicht aus, und die kalte Luft ist nach fünf Minuten wieder warm.\n\n" +
      "Beim Strom lohnt sich vor allem eines: Geräte ganz ausschalten. " +
      "Ein Rechner im Schlafmodus verbraucht das ganze Jahr Strom, ohne " +
      "dass jemand ihn benutzt. Staubsaugen können Sie ruhig weiter — " +
      "das ist nicht das Problem.\n\n" +
      "Rechnen Sie einmal nach, statt nur zu glauben. Auf der Rechnung steht, " +
      "wie viel Sie im letzten Jahr verbraucht haben.",
    questions: [
      {
        text: "Was verbraucht den größten Teil?",
        options: ["Elektrische Geräte", "Die Wärme", "Das Licht"],
        answer: 1,
        explain: "„Den größten Teil frisst die Wärme: Heizung und warmes Wasser.“",
      },
      {
        text: "Wie viel spart ein Grad weniger?",
        options: ["Etwa sechs Prozent", "Etwa zwanzig Prozent", "Nichts"],
        answer: 0,
        explain: "„Ein Grad weniger im Wohnzimmer spart etwa sechs Prozent.“",
      },
      {
        text: "Was lohnt sich beim Strom vor allem?",
        options: ["Geräte ganz ausschalten", "Weniger staubsaugen", "Kaltes Wasser"],
        answer: 0,
        explain: "„Beim Strom lohnt sich vor allem eines: Geräte ganz ausschalten.“",
      },
      {
        kind: "gapfill",
        text: "Rechnen Sie einmal nach, statt nur ___ ___.",
        options: [],
        answer: 0,
        accept: ["zu glauben"],
        explain: "„statt“ sonrası zu'lu MASTAR gelir, çekimli fiil değil.",
      },
      {
        kind: "short_answer",
        text: "Was verbraucht ein Rechner im Schlafmodus?",
        options: [],
        answer: 0,
        accept: ["Strom", "das ganze Jahr Strom", "er verbraucht Strom"],
        explain: "„Ein Rechner im Schlafmodus verbraucht das ganze Jahr Strom …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u21-l1",
    level: "B1",
    skill: "listening",
    unit: 21,
    title: "Die neue Fußgängerzone",
    genre: "Sokak röportajı",
    intro: "Yeni yaya bölgesi konuşuluyor. Kim memnun, kim değil?",
    minutes: 4,
    gloss: [
      { de: "die Fußgängerzone", tr: "yaya bölgesi", en: "pedestrian zone" },
      { de: "der Radfahrer", tr: "bisikletli", en: "cyclist" },
      { de: "die Strecke", tr: "güzergâh", en: "route" },
      { de: "die Ausfahrt", tr: "çıkış", en: "exit" },
    ],
    segments: [
      { text: "Seit Mai ist die Marktstraße eine Fußgängerzone. Wie finden Sie das?" },
      { text: "Sehr gut. Ich gehe hier mit den Kindern, statt Angst zu haben." },
      { text: "Und Sie?" },
      { text: "Für mich ist die Strecke jetzt länger. Ich muss zwei Ausfahrten weiter." },
      { text: "Aber die Luft ist besser geworden, das merkt man." },
      { text: "Das schon. Nur die Radfahrer fahren zu schnell durch." },
      { text: "Da kommt bald ein Verkehrszeichen hin, hat die Stadt gesagt." },
      { text: "Dann bin ich zufrieden. Statt zu streiten, sollten wir es probieren." },
    ],
    questions: [
      {
        text: "Seit wann ist die Marktstraße eine Fußgängerzone?",
        options: ["Seit Mai", "Seit Januar", "Seit letztem Jahr"],
        answer: 0,
        explain: "„Seit Mai ist die Marktstraße eine Fußgängerzone.“",
      },
      {
        text: "Was ist für die zweite Person schlechter?",
        options: ["Die Luft", "Die Strecke ist länger", "Der Lärm"],
        answer: 1,
        explain: "„Für mich ist die Strecke jetzt länger.“",
      },
      {
        text: "Was stört an den Radfahrern?",
        options: ["Sie fahren zu schnell durch", "Es sind zu wenige", "Sie parken falsch"],
        answer: 0,
        explain: "„Nur die Radfahrer fahren zu schnell durch.“",
      },
      {
        kind: "gapfill",
        text: "Ich gehe hier mit den Kindern, statt Angst ___ ___.",
        options: [],
        answer: 0,
        accept: ["zu haben"],
        explain: "„statt“ + zu'lu mastar — Türkçedeki '-mek yerine'.",
      },
      {
        kind: "short_answer",
        text: "Was kommt bald hin?",
        options: [],
        answer: 0,
        accept: ["ein Verkehrszeichen", "Verkehrszeichen"],
        explain: "„Da kommt bald ein Verkehrszeichen hin …“",
      },
    ],
  },
  {
    id: "b1-u21-l2",
    level: "B1",
    skill: "listening",
    unit: 21,
    title: "Woher kommt das?",
    genre: "Pazar konuşması",
    intro: "Bir pazar tezgâhında konuşma. Ürünün kaynağı ne?",
    minutes: 4,
    gloss: [
      { de: "die Herkunft", tr: "menşe", en: "origin" },
      { de: "regional", tr: "yöresel", en: "regional" },
      { de: "der Bauernhof", tr: "çiftlik", en: "farm" },
      { de: "vermeiden", tr: "kaçınmak", en: "to avoid" },
    ],
    segments: [
      { text: "Entschuldigung, woher kommen diese Kartoffeln?" },
      { text: "Vom Bauernhof meiner Schwester, dreißig Kilometer von hier." },
      { text: "Also wirklich regional. Steht die Herkunft irgendwo?" },
      { text: "Auf dem Schild hinten. Wir schreiben es bei jeder Ware dazu." },
      { text: "Sehr gut. Ich versuche, lange Strecken zu vermeiden." },
      { text: "Dann nehmen Sie die hier statt der Ware aus dem Laden." },
      { text: "Mache ich. Ist das auch Bio?" },
      { text: "Nein, aber ohne Chemie. Fragen Sie ruhig, das machen wenige Kundinnen." },
    ],
    questions: [
      {
        text: "Woher kommen die Kartoffeln?",
        options: ["Vom Bauernhof der Schwester", "Aus dem Laden", "Aus dem Ausland"],
        answer: 0,
        explain: "„Vom Bauernhof meiner Schwester, dreißig Kilometer von hier.“",
      },
      {
        text: "Wo steht die Herkunft?",
        options: ["Auf dem Schild hinten", "Auf der Ware", "Nirgends"],
        answer: 0,
        explain: "„Auf dem Schild hinten. Wir schreiben es bei jeder Ware dazu.“",
      },
      {
        text: "Ist die Ware Bio?",
        options: ["Ja", "Nein, aber ohne Chemie", "Das weiß der Verkäufer nicht"],
        answer: 1,
        explain: "„Nein, aber ohne Chemie.“",
      },
      {
        kind: "gapfill",
        text: "Ich versuche, lange Strecken ___ ___.",
        options: [],
        answer: 0,
        accept: ["zu vermeiden"],
        explain: "„versuchen“ zu'lu mastar ister.",
      },
      {
        kind: "short_answer",
        text: "Wie weit ist der Bauernhof?",
        options: [],
        answer: 0,
        accept: ["dreißig Kilometer", "30 Kilometer", "dreißig"],
        explain: "„… dreißig Kilometer von hier.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u21-w1",
    level: "B1",
    skill: "writing",
    unit: 21,
    title: "Aushang für das Haus",
    genre: "Bina duyurusu",
    intro: "Atık ayrımı için bir duyuru yaz. Bileşik ismin artikeli son parçadan gelir.",
    minutes: 8,
    gloss: [
      { de: "der Umweltschutz", tr: "çevre koruma", en: "environmental protection" },
      { de: "die Umweltverschmutzung", tr: "çevre kirliliği", en: "pollution" },
      { de: "verschmutzen", tr: "kirletmek", en: "to pollute" },
      { de: "der Schutz", tr: "koruma", en: "protection" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Çevre koruma burada, avluda başlıyor.",
        answer: "Der Umweltschutz fängt hier an, im Hof.",
        hint: "der Schutz → der Umweltschutz.",
      },
      {
        kind: "build",
        tr: "Çevre kirliliği büyük konuşmalarla azalmıyor.",
        answer: "Die Umweltverschmutzung wird durch große Reden nicht kleiner.",
        hint: "die Verschmutzung → die Umweltverschmutzung.",
      },
      {
        kind: "build",
        tr: "Eski aletleri avluya atmayın.",
        answer: "Entsorgen Sie alte Geräte nicht im Hof.",
        hint: "Resmî emir: fiil başta, Sie arkasında.",
      },
      {
        kind: "form",
        prompt: "Atık duyurusu kartını doldur.",
        facts: "Mavi: kâğıt; sarı: ambalaj; kahverengi: mutfak artığı; gri: geri kalanı; depozitolu şişe: dükkâna.",
        fields: [
          { label: "Blaue Tonne", answer: "Papier", accept: ["für Papier", "das Papier"] },
          { label: "Gelbe Tonne", answer: "Verpackungen", accept: ["für Verpackungen", "Verpackung"] },
          { label: "Braune Tonne", answer: "Reste aus der Küche", accept: ["Küchenreste", "Reste"] },
          { label: "Pfandflaschen", answer: "zurück in den Laden", accept: ["in den Laden", "Laden"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Bileşik isimlerin artikellerini düzelt.",
        source: "Das Umweltschutz und der Kraftwerk und der Fußgängerzone.",
        answer: "Der Umweltschutz und das Kraftwerk und die Fußgängerzone.",
        why: "Türkçede isimlerin cinsi YOKTUR, o yüzden artikel zaten tahminle seçiliyor ve uzun bileşiklerde tahmin daha da kötüleşiyor. Oysa kural kesindir ve ezber gerektirmez: bileşiğin cinsi DAİMA SON parçadan gelir. der Schutz → der Umweltschutz, das Werk → das Kraftwerk, die Zone → die Fußgängerzone. Bilinmeyen bir bileşiğin artikeli tahmin edilmez, çözülür.",
      },
    ],
  },
  {
    id: "b1-u21-w2",
    level: "B1",
    skill: "writing",
    unit: 21,
    title: "Was ich anders mache",
    genre: "Kişisel yazı",
    intro: "Bir alışkanlığını yaz. '… yerine' derken zu'lu mastar kullan.",
    minutes: 12,
    gloss: [
      { de: "vermeiden", tr: "kaçınmak", en: "to avoid" },
      { de: "die Strecke", tr: "güzergâh", en: "route" },
      { de: "regional", tr: "yöresel", en: "regional" },
      { de: "die Ware", tr: "mal / ürün", en: "goods" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Arabayla gitmek yerine bisiklete biniyorum.",
        answer: "Statt mit dem Auto zu fahren, nehme ich das Rad.",
        hint: "„statt“ + zu'lu mastar; yan cümle önde, ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Sadece inanmak yerine faturayı okudum.",
        answer: "Statt nur zu glauben, habe ich die Rechnung gelesen.",
        hint: "Yine statt + zu'lu mastar.",
      },
      {
        kind: "free",
        prompt: "Çevre için değiştirdiğin bir alışkanlığı anlat: eskiden ne yapıyordun, şimdi ne yapıyorsun, bu değişiklik ne kadar zor oldu, ve başkalarına ne önerirsin. En az iki 'statt … zu' cümlesi kullan.",
        checklist: [
          "Eski alışkanlık anlatılmış mı?",
          "Yeni davranış somut mu?",
          "Zorluk dürüstçe söylenmiş mi?",
          "En az iki 'statt … zu' cümlesi var mı?",
          "Bir öneri var mı?",
        ],
        minWords: 70,
        sample:
          "Früher bin ich jeden Morgen mit dem Auto zur Arbeit gefahren, " +
          "obwohl die Strecke nur vier Kilometer lang ist.\n\n" +
          "Seit dem Frühling nehme ich das Rad. Statt an der Tankstelle zu " +
          "halten, fahre ich einfach durch die neue Fußgängerzone. Im Winter " +
          "war die Kälte am Anfang schwer, das gebe ich zu. Nach zwei Wochen " +
          "ging es.\n\n" +
          "Beim Einkaufen achte ich jetzt auf die Herkunft. Statt lange " +
          "Strecken zu bezahlen, nehme ich regionale Ware vom Markt. " +
          "Der Bauernhof ist dreißig Kilometer weg, das reicht mir.\n\n" +
          "Ich empfehle, mit einer Sache anzufangen. Wer alles " +
          "gleichzeitig ändern will, hört nach einem Monat wieder auf. " +
          "Der Umweltschutz ist keine Prüfung, sondern eine Gewohnheit.",
        phrases: [
          { de: "Statt … zu …, …", tr: "… -mek yerine …", en: "Instead of …, …" },
          { de: "Ich achte auf die Herkunft.", tr: "Menşeye dikkat ediyorum.", en: "I pay attention to the origin." },
          { de: "Ich empfehle, mit … anzufangen.", tr: "… ile başlamanızı öneririm.", en: "I recommend starting with …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„statt“ cümlesini mastara çevir.",
        source: "Statt ich fahre mit dem Auto, nehme ich das Rad.",
        answer: "Statt mit dem Auto zu fahren, nehme ich das Rad.",
        why: "Türkçe '-mek yerine' tek kalıptır ve fiil çekimsizdir ('gitmek yerine'), ama öğrenci Almancada 'statt'ı bir bağlaç sanıp arkasına çekimli cümle koyuyor. Almanca burada zu'lu MASTAR ister: statt zu fahren, statt zu schätzen, statt Angst zu haben. Özne yalnız ana cümlede söylenir.",
      },
    ],
  },
];

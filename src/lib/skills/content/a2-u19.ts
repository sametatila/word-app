import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 19 — "Ev hediyesi, düğün, bayramlar, davet iptali".
 *
 * Dört ders: Was bringen wir mit? · Auf einer Hochzeit · Feste in Deutschland ·
 * Ich muss leider absagen. İçerik ünite 1-19'un kelimeleriyle sınırlı.
 *
 *   Ünite 19: der Gastgeber, schenken, der Blumenstrauß, die Rose, überreichen,
 *             bewirten, gastfreundlich, bescheiden · die Braut, der Bräutigam,
 *             der Trauzeuge, der Hochzeitstag, anstoßen, die Schwiegermutter,
 *             der Schwiegervater, feierlich · der Weihnachtsbaum, schmücken,
 *             das Festival, die Messe, die Veranstaltung, staatlich,
 *             das Weihnachtsgeld, die Laterne · die Absage, bedauern,
 *             ausnahmsweise, noch mal, stattdessen, derzeit, zusammenkommen,
 *             enttäuscht
 *   Kalıplar: Ich bringe der Gastgeberin einen Blumenstrauß mit. ·
 *             Was schenken wir ihnen? · Wir stoßen auf das Brautpaar an. ·
 *             Ich finde, dass die Rede schön war. · Im Dezember gibt es viele
 *             Feste. · Bei uns feiert man das anders. · Ich kann leider nicht
 *             kommen, weil ich arbeiten muss. · Können wir es noch mal versuchen?
 *
 * Ünitenin ölçtüğü şey gerekçe: weil yan cümlesi fiili sona atar, denn atmaz.
 * A2 öğrencisi ikisini eşanlamlı sanıp "weil ich muss arbeiten" diyor. Davet
 * iptali bu yapıyı zorunlu kılan tek gerçek durum — kimse gerekçesiz iptal
 * etmiyor. Bayram metni ise es gibt kalıbını, konukluk metni yönelme hâlini
 * bir kez daha döndürüyor.
 */
export const a2U19: SkillExercise[] = [
  {
    id: "a2-u19-r1",
    level: "A2",
    skill: "reading",
    unit: 19,
    title: "Feste im deutschen Jahr",
    genre: "Dergi yazısı",
    intro: "Yıl boyunca hangi kutlamalar var, hangisi resmî tatil?",
    gloss: [
      { de: "das Fest", tr: "bayram, kutlama", en: "festival" },
      { de: "staatlich", tr: "devlete ait, resmî", en: "official, state" },
      { de: "der Weihnachtsbaum", tr: "yılbaşı ağacı", en: "Christmas tree" },
      { de: "schmücken", tr: "süslemek", en: "to decorate" },
      { de: "die Laterne", tr: "fener", en: "lantern" },
      { de: "die Messe", tr: "fuar", en: "trade fair" },
      { de: "die Veranstaltung", tr: "etkinlik", en: "event" },
      { de: "das Weihnachtsgeld", tr: "yılbaşı ikramiyesi", en: "Christmas bonus" },
    ],
    minutes: 4,
    text:
      "Im Dezember gibt es viele Feste — aber das Jahr ist auch sonst voll.\n\n" +
      "Im Februar feiert man Karneval, vor allem im Westen. In manchen Städten haben die Geschäfte dann zu, in anderen läuft alles normal weiter. Es ist kein staatlicher Feiertag.\n\n" +
      "Im November gehen die Kinder mit Laternen durch die Straßen und singen. Viele Kindergärten machen die Laternen selbst; es ist eine kleine Veranstaltung, aber die Eltern kommen alle.\n\n" +
      "Im Dezember wird der Weihnachtsbaum geschmückt, meistens erst kurz vor dem 24. Viele Firmen zahlen im November Weihnachtsgeld — nicht alle, es steht im Vertrag.\n\n" +
      "Und im Sommer? Da gibt es Festivals und Messen in fast jeder größeren Stadt. Bei uns feiert man das anders als bei Ihnen vielleicht: eher draußen, eher mit Nachbarn als mit der ganzen Familie.",
    questions: [
      {
        text: "Ist Karneval ein staatlicher Feiertag?",
        options: ["Ja, überall", "Nein", "Nur im Dezember"],
        answer: 1,
        explain: "„Es ist kein staatlicher Feiertag.“ Bazı şehirlerde dükkânlar kapalı, bazılarında değil.",
      },
      {
        kind: "gapfill",
        text: "Im Dezember ___ es viele Feste.",
        options: [],
        answer: 0,
        accept: ["gibt"],
        explain: "Bir şeyin var olduğunu söylemenin standart yolu: es gibt.",
      },
      {
        text: "Was machen die Kinder im November?",
        options: [
          "Sie schmücken den Weihnachtsbaum.",
          "Sie gehen mit Laternen durch die Straßen.",
          "Sie gehen auf eine Messe.",
        ],
        answer: 1,
        explain: "„Im November gehen die Kinder mit Laternen durch die Straßen und singen.“",
      },
      {
        kind: "short_answer",
        text: "Wann zahlen viele Firmen Weihnachtsgeld?",
        options: [],
        answer: 0,
        accept: ["im November", "November"],
        explain: "„Viele Firmen zahlen im November Weihnachtsgeld — nicht alle, es steht im Vertrag.“",
      },
      {
        text: "Alle Firmen zahlen Weihnachtsgeld.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „nicht alle, es steht im Vertrag“ — sözleşmeye bağlı.",
      },
    ],
  },
  {
    id: "a2-u19-r2",
    level: "A2",
    skill: "reading",
    unit: 19,
    title: "Eingeladen — und jetzt?",
    genre: "Bilgilendirme",
    intro: "Almanya'da eve davet: ne getirilir, ne zaman gelinir, ne beklenir?",
    gloss: [
      { de: "der Gastgeber", tr: "ev sahibi", en: "host" },
      { de: "der Blumenstrauß", tr: "çiçek buketi", en: "bouquet" },
      { de: "überreichen", tr: "takdim etmek", en: "to hand over" },
      { de: "bewirten", tr: "ağırlamak", en: "to entertain guests" },
      { de: "gastfreundlich", tr: "misafirperver", en: "hospitable" },
      { de: "bescheiden", tr: "mütevazı", en: "modest" },
      { de: "schenken", tr: "hediye etmek", en: "to give as a gift" },
    ],
    minutes: 4,
    text:
      "ZU BESUCH — EIN PAAR REGELN\n\n" +
      "PÜNKTLICHKEIT. Steht 19 Uhr in der Einladung, kommen Sie um 19 Uhr. Zehn Minuten später ist noch in Ordnung, eine halbe Stunde nicht.\n\n" +
      "DAS MITBRINGSEL. Man kommt nicht mit leeren Händen. Ich bringe der Gastgeberin meistens einen Blumenstrauß mit — aber keine roten Rosen, die sagen etwas anderes. Wein oder Schokolade gehen auch. Überreichen Sie es gleich an der Tür.\n\n" +
      "DIE SCHUHE. Fragen Sie kurz. In vielen Wohnungen zieht man sie aus, in manchen nicht.\n\n" +
      "AM TISCH. Warten Sie, bis alle etwas haben. Die Gastgeber bewirten gern und fragen zweimal nach — sagen Sie ruhig ehrlich, wenn Sie satt sind.\n\n" +
      "GEHEN. Nach dem Essen bleibt man noch eine Weile. Aber um Mitternacht ist meistens Schluss, auch wenn alle gastfreundlich sind.",
    questions: [
      {
        text: "Wie pünktlich soll man kommen?",
        options: ["Eine halbe Stunde später ist normal.", "Höchstens zehn Minuten später.", "Immer früher."],
        answer: 1,
        explain: "„Zehn Minuten später ist noch in Ordnung, eine halbe Stunde nicht.“",
      },
      {
        kind: "gapfill",
        text: "Ich bringe ___ Gastgeberin meistens einen Blumenstrauß mit.",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "Hediyenin verildiği kişi yönelme hâlinde; dişil isimde belirlilik takısı der olur.",
      },
      {
        text: "Was rät der Text zu roten Rosen?",
        options: ["Sie sind das beste Geschenk.", "Man bringt sie besser nicht mit.", "Nur zu Weihnachten."],
        answer: 1,
        explain: "„aber keine roten Rosen, die sagen etwas anderes“ — başka bir anlama geliyor.",
      },
      {
        kind: "short_answer",
        text: "Was soll man wegen der Schuhe machen?",
        options: [],
        answer: 0,
        accept: ["kurz fragen", "fragen", "man fragt kurz"],
        explain: "„Fragen Sie kurz. In vielen Wohnungen zieht man sie aus, in manchen nicht.“",
      },
      {
        text: "Nach dem Essen geht man sofort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Nach dem Essen bleibt man noch eine Weile.“",
      },
    ],
  },
  {
    id: "a2-u19-l1",
    level: "A2",
    skill: "listening",
    unit: 19,
    title: "Auf einer Hochzeit",
    genre: "Diyalog",
    intro: "Düğünde iki misafir sohbet ediyor. Kim kimin nesi, konuşma nasıldı?",
    gloss: [
      { de: "die Braut", tr: "gelin", en: "bride" },
      { de: "der Bräutigam", tr: "damat", en: "groom" },
      { de: "der Trauzeuge", tr: "nikâh şahidi", en: "witness" },
      { de: "anstoßen", tr: "kadeh kaldırmak", en: "to toast" },
      { de: "die Schwiegermutter", tr: "kaynana", en: "mother-in-law" },
      { de: "feierlich", tr: "tören havasında", en: "solemn, festive" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nora", text: "Und, wie findest du die Feier?" },
      { speaker: "Emre", text: "Sehr schön. Ich finde, dass die Rede vom Trauzeugen richtig gut war." },
      { speaker: "Nora", text: "Ja, lustig und trotzdem feierlich. So etwas ist schwer." },
      { speaker: "Emre", text: "Wer ist eigentlich die Frau im blauen Kleid neben der Braut?" },
      { speaker: "Nora", text: "Das ist die Schwiegermutter — also die Mutter vom Bräutigam." },
      { speaker: "Emre", text: "Ach so. Sie hat vorhin geweint, glaube ich." },
      { speaker: "Nora", text: "Die hat den ganzen Tag geweint. Aber vor Freude, sagt sie." },
      { speaker: "Emre", text: "Wann stoßen wir eigentlich auf das Brautpaar an?" },
      { speaker: "Nora", text: "Gleich nach dem Essen, mit dem Sekt. In etwa zwanzig Minuten." },
      { speaker: "Emre", text: "Gut, dann hole ich uns schon mal zwei Gläser." },
    ],
    questions: [
      {
        text: "Wie fand Emre die Rede?",
        options: ["Zu lang", "Richtig gut", "Zu ernst"],
        answer: 1,
        explain: "„Ich finde, dass die Rede vom Trauzeugen richtig gut war.“",
      },
      {
        kind: "gapfill",
        text: "Ich finde, ___ die Rede richtig gut war.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Görüş bildiren cümleler dass ile bağlanır ve fiil sona gider — war en sonda.",
      },
      {
        text: "Wer ist die Frau im blauen Kleid?",
        options: ["Die Mutter der Braut", "Die Mutter des Bräutigams", "Die Trauzeugin"],
        answer: 1,
        explain: "„Das ist die Schwiegermutter — also die Mutter vom Bräutigam.“",
      },
      {
        kind: "short_answer",
        text: "Wann stoßen sie auf das Brautpaar an?",
        options: [],
        answer: 0,
        accept: [
          "gleich nach dem Essen",
          "nach dem Essen",
          "in etwa zwanzig Minuten",
        ],
        explain: "„Gleich nach dem Essen, mit dem Sekt. In etwa zwanzig Minuten.“",
      },
    ],
  },
  {
    id: "a2-u19-l2",
    level: "A2",
    skill: "listening",
    unit: 19,
    title: "Ich muss leider absagen",
    genre: "Telefon görüşmesi",
    intro: "Bir davet iptal ediliyor. Sebep ne, yerine ne öneriliyor?",
    gloss: [
      { de: "die Absage", tr: "iptal", en: "cancellation" },
      { de: "bedauern", tr: "üzülmek", en: "to regret" },
      { de: "ausnahmsweise", tr: "istisna olarak", en: "as an exception" },
      { de: "stattdessen", tr: "onun yerine", en: "instead" },
      { de: "enttäuscht", tr: "hayal kırıklığına uğramış", en: "disappointed" },
      { de: "zusammenkommen", tr: "bir araya gelmek", en: "to get together" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "Hallo Marie, ich rufe wegen morgen an." },
      { speaker: "Marie", text: "Oh nein. Das klingt nach einer Absage." },
      { speaker: "Deniz", text: "Leider ja. Ich kann nicht kommen, weil ich arbeiten muss. Meine Kollegin ist krank." },
      { speaker: "Marie", text: "Schade! Ich bin ehrlich gesagt ein bisschen enttäuscht." },
      { speaker: "Deniz", text: "Das verstehe ich, und es tut mir wirklich leid. Ich bedauere das sehr." },
      { speaker: "Marie", text: "Kannst du wenigstens später kommen? Wir sitzen sicher bis elf." },
      { speaker: "Deniz", text: "Ich bin erst um halb elf fertig, und dann komme ich noch eine Stunde mit dem Bus." },
      { speaker: "Marie", text: "Verstehe. Dann lassen wir es." },
      { speaker: "Deniz", text: "Können wir es noch mal versuchen? Nächsten Samstag habe ich frei." },
      { speaker: "Marie", text: "Nächsten Samstag passt. Dann kommen wir eben stattdessen bei mir zusammen." },
    ],
    questions: [
      {
        text: "Warum kann Deniz nicht kommen?",
        options: ["Deniz ist krank.", "Deniz muss arbeiten.", "Der Bus fährt nicht."],
        answer: 1,
        explain: "„Ich kann nicht kommen, weil ich arbeiten muss. Meine Kollegin ist krank.“",
      },
      {
        kind: "gapfill",
        text: "Ich kann nicht kommen, ___ ich arbeiten muss.",
        options: [],
        answer: 0,
        accept: ["weil"],
        explain: "Gerekçe weil ile verilir ve çekimli fiil (muss) en sona gider.",
      },
      {
        text: "Warum kommt Deniz nicht wenigstens später?",
        options: [
          "Deniz hat keine Lust.",
          "Deniz wird erst um halb elf fertig und braucht eine Stunde mit dem Bus.",
          "Marie will das nicht.",
        ],
        answer: 1,
        explain: "„Ich bin erst um halb elf fertig, und dann komme ich noch eine Stunde mit dem Bus.“",
      },
      {
        kind: "dictation",
        text: "Deniz'in yeni bir tarih önerdiği soruyu yaz.",
        options: [],
        answer: 0,
        accept: ["Können wir es noch mal versuchen?"],
        explain: "İptalden sonra kapıyı açık bırakan cümle — bu ünitenin kalıbı.",
      },
    ],
  },
  {
    id: "a2-u19-w1",
    level: "A2",
    skill: "writing",
    unit: 19,
    title: "weil, denn, dass",
    genre: "Dil bilgisi",
    intro: "Üçü de gerekçe ya da içerik veriyor, ama fiilin yeri farklı.",
    gloss: [
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "der Blumenstrauß", tr: "çiçek buketi", en: "bouquet" },
      { de: "anstoßen", tr: "kadeh kaldırmak", en: "to toast" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Maalesef gelemiyorum, çünkü çalışmam gerekiyor.",
        answer: "Ich kann leider nicht kommen, weil ich arbeiten muss",
        hint: "weil'den sonra çekimli fiil (muss) en sona gider.",
      },
      {
        kind: "build",
        tr: "Ev sahibine bir çiçek buketi getiriyorum.",
        answer: "Ich bringe der Gastgeberin einen Blumenstrauß mit",
        hint: "Hediyeyi alan kişi yönelme hâlinde; ayrılabilen ön ek sona gider.",
      },
      {
        kind: "build",
        tr: "Konuşmanın güzel olduğunu düşünüyorum.",
        answer: "Ich finde, dass die Rede schön war",
        hint: "dass yan cümlesinde de fiil sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: weil yan cümlesinde fiilin yeri yanlış.",
        source: "Ich sage ab, weil ich muss arbeiten.",
        answer: "Ich sage ab, weil ich arbeiten muss.",
        alternatives: ["Ich sage ab, weil ich arbeiten muss"],
        why: "weil fiili sona atar; denn atmaz. İkisi anlamca yakın ama cümle düzeni farklı — denn ile 'denn ich muss arbeiten' doğru olurdu.",
      },
    ],
  },
  {
    id: "a2-u19-w2",
    level: "A2",
    skill: "writing",
    unit: 19,
    title: "Eine höfliche Absage",
    genre: "Mesaj",
    intro: "Daveti iptal et: sebep ne, ne kadar üzgünsün, ne öneriyorsun?",
    gloss: [
      { de: "die Absage", tr: "iptal", en: "cancellation" },
      { de: "bedauern", tr: "üzülmek", en: "to regret" },
      { de: "stattdessen", tr: "onun yerine", en: "instead" },
      { de: "zusammenkommen", tr: "bir araya gelmek", en: "to get together" },
      { de: "der Gastgeber", tr: "ev sahibi", en: "host" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Davete iptal cevabı yaz. Gelemeyeceğini söyle, sebebini weil ile açıkla, üzüntünü belirt ve yerine somut bir alternatif öner.",
        stimulus:
          "Hallo!\n\n" +
          "Am Samstag um 19 Uhr feiern wir Einzug in der neuen Wohnung — Kaiserstraße 40, dritter Stock.\n\n" +
          "Es gibt Suppe und viel zu viel Kuchen. Bringt nichts mit, wirklich nicht.\n\n" +
          "Sagt bitte bis Donnerstag Bescheid, damit ich weiß, wie viele Stühle ich brauche.\n\nLiebe Grüße, Marie",
        checklist: [
          "Gelemeyeceğini açıkça yazdın mı?",
          "Sebebi weil ile verdin mi (fiil sonda)?",
          "Üzüntünü ya da özrünü belirttin mi?",
          "Somut bir alternatif önerdin mi (gün ya da yer)?",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich kann leider nicht kommen, weil …", tr: "maalesef gelemiyorum, çünkü …", en: "unfortunately I can't come because …" },
          { de: "Ich bedauere das sehr.", tr: "buna çok üzüldüm", en: "I really regret it" },
          { de: "Können wir es noch mal versuchen?", tr: "bir daha deneyelim mi", en: "shall we try again" },
        ],
        sample:
          "Liebe Marie,\n\n" +
          "vielen Dank für die Einladung — und herzlichen Glückwunsch zur neuen Wohnung!\n\n" +
          "Leider kann ich am Samstag nicht kommen, weil meine Kollegin krank ist und ich ihre Schicht übernehmen muss. Ich bin erst um halb elf fertig, und dann fährt kein Bus mehr zu euch.\n\n" +
          "Ich bedauere das wirklich sehr. Ausnahmsweise geht es diesmal nicht.\n\n" +
          "Können wir es noch mal versuchen? Nächsten Samstag habe ich frei. Wenn ihr wollt, kommen wir stattdessen bei mir zusammen, dann koche ich.\n\n" +
          "Viele Grüße und viel Spaß am Samstag!\nDeniz",
      },
    ],
  },
];

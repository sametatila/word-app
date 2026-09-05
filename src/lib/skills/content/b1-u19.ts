import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 19 — "Bedene bakmak" (dersler 73–76).
 *
 * Dersler: In der Apotheke · Gesunde Ernährung · Rückenschmerzen ·
 * Besser schlafen.
 *
 * Ünitenin dili TALİMAT ve GEREKÇE. İki aktarım hatası buradan çıkıyor:
 *   Sie-emri      Türkçede emir çıplak gövdedir ve özne söylenmez ('alın').
 *                 Almanca resmî emirde zamiri ZORUNLU tutar ve fiili başa
 *                 alır: "Nehmen Sie …". Zamir düşünce cümle emir olmaktan
 *                 çıkıyor, öznesiz bir parça kalıyor.
 *   fiil öbeğinin  Türkçede yan cümlede kipli fiil de asıl fiil de sonda
 *   sırası         ama sıra terstir ('kalkmam gerektiği için'). Almancada
 *                 yan cümlede önce asıl fiil, EN SONDA kipli fiil gelir:
 *                 "weil ich früh aufstehen muss".
 *
 * Yeni 32 kelime: einnehmen, die Dosis, die Pille, die Salbe, die Nadel,
 * warnen, harmlos, die Gefahr, die Ernährung, verzichten, schwerfallen,
 * die Diät, abnehmen, die Kantine, satt, die Portion, die Haltung,
 * die Übung, die Bewegung, sich ausruhen, rennen, entspannend,
 * der Sportler, die Wanderung, der Schlaf, aufwachen, wach, der Wecker,
 * erschöpft, die Energie, die Laune, vermutlich.
 */
export const b1U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u19-r1",
    level: "B1",
    skill: "reading",
    unit: 19,
    title: "Der Beipackzettel",
    genre: "İlaç kullanım bilgisi",
    intro: "Bir ilacın kullanım bilgisi. Ne kadar, ne zaman, neye dikkat?",
    minutes: 5,
    gloss: [
      { de: "einnehmen", tr: "almak", en: "to take", note: "ilaç için" },
      { de: "die Dosis", tr: "doz", en: "dose" },
      { de: "die Salbe", tr: "merhem", en: "ointment" },
      { de: "warnen", tr: "uyarmak", en: "to warn" },
      { de: "harmlos", tr: "zararsız", en: "harmless" },
    ],
    text:
      "Nehmen Sie die Pille zweimal am Tag ein, morgens und abends, mit etwas " +
      "Wasser. Die Dosis für Erwachsene ist eine Pille pro Mal. Nehmen Sie " +
      "niemals zwei auf einmal, auch wenn Sie eine vergessen haben.\n\n" +
      "Tragen Sie die Salbe dünn auf und waschen Sie danach die Hände. " +
      "Die Salbe ist harmlos, aber sie gehört nicht in die Augen.\n\n" +
      "Wir warnen ausdrücklich vor der Einnahme zusammen mit anderen " +
      "Medikamenten. Sprechen Sie vorher mit dem Arzt oder in der Apotheke. " +
      "Die Gefahr ist klein, aber sie ist nicht null.\n\n" +
      "Wenn Sie nach drei Tagen keine Wirkung merken, hören Sie auf und " +
      "kommen Sie wieder. Und bitte: Werfen Sie alte Pillen nicht in den " +
      "Müll, sondern bringen Sie sie zurück.",
    questions: [
      {
        text: "Wie oft nimmt man die Pille?",
        options: ["Einmal am Tag", "Zweimal am Tag", "Dreimal am Tag"],
        answer: 1,
        explain: "„Nehmen Sie die Pille zweimal am Tag ein, morgens und abends …“",
      },
      {
        text: "Was macht man, wenn man eine vergessen hat?",
        options: ["Zwei auf einmal nehmen", "Niemals zwei auf einmal nehmen", "Aufhören"],
        answer: 1,
        explain: "„Nehmen Sie niemals zwei auf einmal, auch wenn Sie eine vergessen haben.“",
      },
      {
        text: "Was soll man mit alten Pillen tun?",
        options: ["In den Müll werfen", "Zurückbringen", "Behalten"],
        answer: 1,
        explain: "„Werfen Sie alte Pillen nicht in den Müll, sondern bringen Sie sie zurück.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ die Salbe dünn auf und waschen Sie danach die Hände.",
        options: [],
        answer: 0,
        accept: ["Tragen Sie"],
        explain: "Resmî emirde zamir ZORUNLU ve fiil başta: „Tragen Sie …“.",
      },
      {
        kind: "short_answer",
        text: "Nach wie vielen Tagen ohne Wirkung soll man aufhören?",
        options: [],
        answer: 0,
        accept: ["nach drei Tagen", "drei Tagen", "drei"],
        explain: "„Wenn Sie nach drei Tagen keine Wirkung merken, hören Sie auf …“",
      },
    ],
  },
  {
    id: "b1-u19-r2",
    level: "B1",
    skill: "reading",
    unit: 19,
    title: "Essen in der Kantine",
    genre: "Deneyim yazısı",
    intro: "Biri beslenme alışkanlığını değiştirmiş. Ne değişti, neden?",
    minutes: 5,
    gloss: [
      { de: "die Ernährung", tr: "beslenme", en: "nutrition" },
      { de: "verzichten", tr: "vazgeçmek", en: "to do without" },
      { de: "die Kantine", tr: "yemekhane", en: "canteen" },
      { de: "die Portion", tr: "porsiyon", en: "portion" },
      { de: "satt", tr: "tok", en: "full" },
    ],
    text:
      "Ich habe ein Jahr lang jeden Mittag in der Kantine gegessen, ohne " +
      "darüber nachzudenken. Danach war ich immer müde. Nachmittags konnte " +
      "ich mich kaum konzentrieren.\n\n" +
      "Meine ganze Ernährung wollte ich nicht ändern. Ich habe nur zwei " +
      "Dinge geändert. " +
      "Erstens nehme ich jetzt eine kleinere Portion. Zweitens esse ich " +
      "abends früher, weil ich sonst schlecht schlafen kann.\n\n" +
      "Auf Brot habe ich nicht verzichtet — das fällt mir zu schwer. " +
      "Ich esse einfach weniger davon und dafür mehr Gemüse. Nach zwanzig " +
      "Minuten bin ich genauso satt wie vorher.\n\n" +
      "Abgenommen habe ich vermutlich zwei Kilo, aber darum ging es nicht. " +
      "Wichtiger ist die Energie am Nachmittag. Meine Laune ist auch besser, " +
      "und das merken sogar die Kollegen.",
    questions: [
      {
        text: "Wie fühlte sich die Person nach dem Essen?",
        options: ["Wach", "Immer müde", "Hungrig"],
        answer: 1,
        explain: "„Danach war ich immer müde.“",
      },
      {
        text: "Welche zwei Dinge hat sie geändert?",
        options: ["Kleinere Portion und früher essen", "Diät und Sport", "Kein Brot und kein Gemüse"],
        answer: 0,
        explain: "„Erstens nehme ich jetzt eine kleinere Portion. Zweitens esse ich abends früher …“",
      },
      {
        text: "Worauf hat sie NICHT verzichtet?",
        options: ["Auf Gemüse", "Auf Brot", "Auf das Mittagessen"],
        answer: 1,
        explain: "„Auf Brot habe ich nicht verzichtet …“",
      },
      {
        kind: "gapfill",
        text: "Zweitens esse ich abends früher, weil ich sonst schlecht schlafen ___.",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Yan cümlede önce asıl fiil (schlafen), EN SONDA kipli fiil (kann).",
      },
      {
        kind: "short_answer",
        text: "Was ist ihr wichtiger als das Gewicht?",
        options: [],
        answer: 0,
        accept: ["die Energie am Nachmittag", "die Energie", "Energie"],
        explain: "„Wichtiger ist die Energie am Nachmittag.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u19-l1",
    level: "B1",
    skill: "listening",
    unit: 19,
    title: "Der Rücken tut weh",
    genre: "Fizyoterapi konuşması",
    intro: "Sırt ağrısı konuşuluyor. Hangi öneri, hangi sebep?",
    minutes: 4,
    gloss: [
      { de: "die Haltung", tr: "duruş", en: "posture" },
      { de: "die Übung", tr: "egzersiz", en: "exercise" },
      { de: "sich ausruhen", tr: "dinlenmek", en: "to rest" },
      { de: "entspannend", tr: "rahatlatıcı", en: "relaxing" },
    ],
    segments: [
      { text: "Seit zwei Wochen tut mir der Rücken weh, vor allem morgens." },
      { text: "Sitzen Sie viel? Wie ist Ihre Haltung am Rechner?" },
      { text: "Vermutlich schlecht. Ich merke es erst, wenn es weh tut." },
      { text: "Stellen Sie den Bildschirm höher. Das ist der erste Schritt. Dazu eine kurze Übung am Morgen." },
      { text: "Soll ich mich mehr ausruhen oder mich mehr bewegen?" },
      { text: "Bewegen. Liegen hilft nur am Anfang, danach macht es alles schlechter." },
      { text: "Rennen mag ich nicht besonders." },
      { text: "Dann eine Wanderung am Wochenende. Das ist entspannend und reicht." },
    ],
    questions: [
      {
        text: "Wann tut der Rücken am meisten weh?",
        options: ["Morgens", "Abends", "Nachts"],
        answer: 0,
        explain: "„Seit zwei Wochen tut mir der Rücken weh, vor allem morgens.“",
      },
      {
        text: "Was ist der erste Schritt?",
        options: ["Den Bildschirm höher stellen", "Eine Salbe nehmen", "Weniger arbeiten"],
        answer: 0,
        explain: "„Stellen Sie den Bildschirm höher. Das ist der erste Schritt.“",
      },
      {
        text: "Was empfiehlt die Fachkraft: Ruhe oder Bewegung?",
        options: ["Ruhe", "Bewegung", "Beides gleich viel"],
        answer: 1,
        explain: "„Bewegen. Liegen hilft nur am Anfang …“",
      },
      {
        kind: "gapfill",
        text: "___ ___ den Bildschirm höher.",
        options: [],
        answer: 0,
        accept: ["Stellen Sie"],
        explain: "Resmî emir: fiil başta, zamir hemen arkasında.",
      },
      {
        kind: "short_answer",
        text: "Was wird statt Rennen empfohlen?",
        options: [],
        answer: 0,
        accept: ["eine Wanderung", "Wanderung", "eine Wanderung am Wochenende"],
        explain: "„Dann eine Wanderung am Wochenende.“",
      },
    ],
  },
  {
    id: "b1-u19-l2",
    level: "B1",
    skill: "listening",
    unit: 19,
    title: "Warum wache ich immer auf?",
    genre: "Uyku üzerine sohbet",
    intro: "İki kişi uykuyu konuşuyor. Sorun ne, ne deneniyor?",
    minutes: 4,
    gloss: [
      { de: "aufwachen", tr: "uyanmak", en: "to wake up" },
      { de: "der Wecker", tr: "çalar saat", en: "alarm clock" },
      { de: "erschöpft", tr: "bitkin", en: "exhausted" },
      { de: "die Laune", tr: "keyif / ruh hâli", en: "mood" },
    ],
    segments: [
      { text: "Ich wache jede Nacht um drei auf und bin dann eine Stunde wach." },
      { text: "Schaust du dann auf die Uhr?" },
      { text: "Immer. Und dann rechne ich, wie viel Schlaf noch bleibt." },
      { text: "Genau das ist das Problem. Dreh den Wecker um." },
      { text: "Meinst du, das hilft?" },
      { text: "Bei mir schon. Ich war jeden Morgen erschöpft, jetzt geht es." },
      { text: "Ich probiere es. Meine Laune ist im Moment wirklich schlecht." },
      { text: "Und iss abends früher, weil du sonst schlecht einschlafen kannst." },
    ],
    questions: [
      {
        text: "Wann wacht die erste Person auf?",
        options: ["Um drei", "Um fünf", "Um sechs"],
        answer: 0,
        explain: "„Ich wache jede Nacht um drei auf …“",
      },
      {
        text: "Was ist laut der zweiten Person das Problem?",
        options: ["Auf die Uhr schauen", "Zu früh ins Bett gehen", "Zu viel Kaffee"],
        answer: 0,
        explain: "„Schaust du dann auf die Uhr?“ — „Genau das ist das Problem.“",
      },
      {
        text: "Was rät sie?",
        options: ["Den Wecker umdrehen", "Einen neuen Wecker kaufen", "Länger liegen bleiben"],
        answer: 0,
        explain: "„Dreh den Wecker um.“",
      },
      {
        kind: "gapfill",
        text: "Iss abends früher, weil du sonst schlecht einschlafen ___.",
        options: [],
        answer: 0,
        accept: ["kannst"],
        explain: "Yan cümlede kipli fiil EN SONA gider: einschlafen kannst.",
      },
      {
        kind: "short_answer",
        text: "Wie lange bleibt sie nachts wach?",
        options: [],
        answer: 0,
        accept: ["eine Stunde", "eine Stunde lang"],
        explain: "„… und bin dann eine Stunde wach.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u19-w1",
    level: "B1",
    skill: "writing",
    unit: 19,
    title: "Eine Anleitung schreiben",
    genre: "Kullanım talimatı",
    intro: "Bir ilacın nasıl kullanılacağını yaz. Resmî emirde zamiri unutma.",
    minutes: 8,
    gloss: [
      { de: "einnehmen", tr: "almak", en: "to take", note: "ilaç için" },
      { de: "die Dosis", tr: "doz", en: "dose" },
      { de: "die Gefahr", tr: "tehlike", en: "danger" },
      { de: "warnen", tr: "uyarmak", en: "to warn" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Hapı günde iki kez suyla alın.",
        answer: "Nehmen Sie die Pille zweimal am Tag mit Wasser ein.",
        hint: "Fiil başta, zamir arkasında, ayrılan önek sonda.",
      },
      {
        kind: "build",
        tr: "Merhemi ince sürün ve sonra ellerinizi yıkayın.",
        answer: "Tragen Sie die Salbe dünn auf und waschen Sie danach die Hände.",
        hint: "İki emir de kendi „Sie“sini alır.",
      },
      {
        kind: "build",
        tr: "Üç gün sonra etki görmezseniz tekrar gelin, yoksa tehlike büyür.",
        answer: "Wenn Sie nach drei Tagen keine Wirkung merken, kommen Sie wieder, sonst wächst die Gefahr.",
        hint: "Yan cümle önde → ana cümle fiille başlar, zamir arkasında.",
      },
      {
        kind: "form",
        prompt: "İlaç kartını doldur.",
        facts: "İlaç: hap; sıklık: günde 2; yetişkin dozu: 1 hap; uyarı: başka ilaçla birlikte alma; süre: 3 gün.",
        fields: [
          { label: "Form", answer: "Pille", accept: ["die Pille", "eine Pille"] },
          { label: "Wie oft", answer: "zweimal am Tag", accept: ["zweimal", "2x am Tag"] },
          { label: "Dosis", answer: "eine Pille", accept: ["1 Pille", "eine"] },
          { label: "Warnung", answer: "nicht mit anderen Medikamenten", accept: ["andere Medikamente", "mit anderen Medikamenten"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Resmî emri tamamla.",
        source: "Nehmen die Pille zweimal am Tag und waschen danach die Hände.",
        answer: "Nehmen Sie die Pille zweimal am Tag und waschen Sie danach die Hände.",
        why: "Türkçede emir çıplak gövdedir ve özne söylenmez ('alın', 'yıkayın'), o yüzden Almancada da zamir atlanıyor. Almancada resmî emir zamiri ZORUNLU tutar: fiil birinci, 'Sie' hemen ikinci sırada. Zamir düşerse cümle emir olmaktan çıkar ve öznesiz bir parça kalır. Her emir kendi 'Sie'sini alır — bağlaçtan sonra tekrarlanır.",
      },
    ],
  },
  {
    id: "b1-u19-w2",
    level: "B1",
    skill: "writing",
    unit: 19,
    title: "Was ich geändert habe",
    genre: "Kişisel yazı",
    intro: "Bir alışkanlığını nasıl değiştirdiğini yaz. Yan cümlede kipli fiili sona koy.",
    minutes: 12,
    gloss: [
      { de: "die Bewegung", tr: "hareket", en: "movement" },
      { de: "die Energie", tr: "enerji", en: "energy" },
      { de: "abnehmen", tr: "kilo vermek", en: "to lose weight" },
      { de: "vermutlich", tr: "muhtemelen", en: "presumably" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Akşam erken yiyorum çünkü sonra iyi uyuyamıyorum.",
        answer: "Ich esse abends früher, weil ich sonst schlecht schlafen kann.",
        hint: "Yan cümlede: asıl fiil, sonra kipli fiil.",
      },
      {
        kind: "build",
        tr: "Erken kalkmam gerektiği için saat onda yatıyorum.",
        answer: "Weil ich früh aufstehen muss, gehe ich um zehn ins Bett.",
        hint: "aufstehen + muss, ikisi de sonda, kipli en sonda.",
      },
      {
        kind: "free",
        prompt: "Sağlığın için değiştirdiğin bir alışkanlığı anlat: eskiden nasıldı, neyi neden değiştirdin, ilk hafta nasıl geçti, ve şimdi ne fark ediyorsun. En az iki yan cümlede kipli fiil kullan (weil … kann / muss / will).",
        checklist: [
          "Eski durum anlatılmış mı?",
          "Değişiklik somut mu?",
          "İlk hafta anlatılmış mı?",
          "Bugünkü fark söylenmiş mi?",
          "En az iki yan cümlede kipli fiil sonda mı?",
        ],
        minWords: 70,
        sample:
          "Früher habe ich jeden Mittag in der Kantine gegessen, ohne " +
          "nachzudenken. Nachmittags war ich dann immer müde. Bewegung hatte ich fast keine.\n\n" +
          "Ich habe zwei Dinge geändert. Ich nehme eine kleinere Portion, " +
          "und ich esse abends früher, weil ich sonst schlecht einschlafen " +
          "kann. Auf Brot habe ich nicht verzichtet — das wäre mir zu " +
          "schwergefallen.\n\n" +
          "Die erste Woche war nicht leicht. Um vier hatte ich Hunger, und " +
          "einmal habe ich abends doch spät gegessen. Danach ging es besser, " +
          "weil der Körper das lernen kann.\n\n" +
          "Heute merke ich vor allem die Energie am Nachmittag. Abgenommen " +
          "habe ich vermutlich zwei Kilo, aber darum ging es nie. Meine Laune " +
          "ist besser, und ich wache morgens nicht mehr erschöpft auf.",
        phrases: [
          { de: "Früher habe ich …, heute …", tr: "Eskiden … , şimdi …", en: "I used to …, today …" },
          { de: "…, weil ich sonst … kann.", tr: "… çünkü yoksa … -amıyorum.", en: "…, because otherwise I can't …" },
          { de: "Darum ging es nie.", tr: "Mesele o değildi.", en: "That was never the point." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yan cümledeki fiil sırasını düzelt.",
        source: "Ich gehe früh ins Bett, weil ich muss früh aufstehen.",
        answer: "Ich gehe früh ins Bett, weil ich früh aufstehen muss.",
        why: "Türkçede yan cümlede de her şey sonda toplanır ama sıra terstir ('kalkmam gerektiği için' — önce asıl eylem, sonra gereklilik). Almancada aynı mantık geçerlidir ve bu yüzden aslında kolaydır: yan cümlede önce ASIL fiil (aufstehen), EN SONDA kipli fiil (muss). Hata, ana cümledeki 'muss ich früh aufstehen' sırasının yan cümleye taşınmasından çıkıyor.",
      },
    ],
  },
];

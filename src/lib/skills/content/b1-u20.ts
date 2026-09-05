import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 20 — "Acil olan ve içeride olan" (dersler 77–80).
 *
 * Dersler: Psychische Gesundheit · In der Notaufnahme · Die Impfung ·
 * Krankenhausbesuch.
 *
 * Ünitenin dili SÜRE ve GEÇMİŞ ANLATI. İki aktarım hatası buraya düşüyor:
 *   seit ↔ für     Türkçe '-den beri' ile 'için' birbirine yakın durur
 *                  ('üç gündür hastayım' · 'üç gün için'), Almanca ayırır:
 *                  SÜREN bir durum için seit + Dativ ve ŞİMDİKİ zaman;
 *                  für yalnız planlanan bir süreyi anlatır.
 *   kipli fiilin   Türkçede geçmiş tek biçimdir ('gelemedim'), Almanca
 *   geçmişi        konuşmada çoğu fiil için Perfekt kullanır ama KİPLİ
 *                  fiillerde Präteritum kullanır: "ich konnte nicht kommen",
 *                  "ich habe nicht kommen gekonnt" değil.
 *
 * Yeni 32 kelime: die Therapie, einsam, der Druck, die Krise, die Beratung,
 * wütend, fühlen, die Sucht, die Notaufnahme, stürzen, der Verdacht,
 * sich verletzen, die Verletzung, der Notruf, der Krankenwagen,
 * der Knochen, auftreten, der Virus, schützen, das Blut, die Bevölkerung,
 * die Haut, die Kontrolle, die Möglichkeit, die Station, die Besserung,
 * der Kranke, aufmuntern, der Besuch, die Kraft, behalten, zumindest.
 */
export const b1U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u20-r1",
    level: "B1",
    skill: "reading",
    unit: 20,
    title: "Wann ist es mehr als schlechte Laune?",
    genre: "Rehber metin",
    intro: "Ne zaman yardım aranmalı? Ölçüt süre ve etki.",
    minutes: 5,
    gloss: [
      { de: "einsam", tr: "yalnız", en: "lonely" },
      { de: "der Druck", tr: "baskı", en: "pressure" },
      { de: "die Krise", tr: "kriz", en: "crisis" },
      { de: "die Beratung", tr: "danışmanlık", en: "counselling" },
      { de: "die Therapie", tr: "terapi", en: "therapy" },
    ],
    text:
      "Jeder ist manchmal traurig oder wütend. Das gehört dazu. Die Frage ist " +
      "nicht, ob es vorkommt, sondern wie lange es bleibt.\n\n" +
      "Wer sich seit Wochen einsam fühlt, morgens kaum aufstehen kann und " +
      "nichts mehr gern macht, sollte mit jemandem reden. Der Druck bei der " +
      "Arbeit oder in der Familie kann zu einer Krise führen, und eine Krise " +
      "ist keine Schwäche.\n\n" +
      "Die erste Möglichkeit ist eine Beratung. Das ist noch keine Therapie: " +
      "man spricht einmal, kostenlos, und entscheidet danach selbst. " +
      "Viele merken schon dabei, dass es nicht nur ihnen so geht.\n\n" +
      "Warten Sie nicht, bis nichts mehr geht. Zumindest ein Gespräch " +
      "kostet nichts. Und wenn Sie jemanden kennen, dem es schlecht geht: " +
      "fragen Sie einfach nach. Das reicht öfter, als man denkt.",
    questions: [
      {
        text: "Was ist laut Text die entscheidende Frage?",
        options: ["Ob man traurig ist", "Wie lange es bleibt", "Wer schuld ist"],
        answer: 1,
        explain: "„Die Frage ist nicht, ob es vorkommt, sondern wie lange es bleibt.“",
      },
      {
        text: "Was ist die erste Möglichkeit?",
        options: ["Eine Therapie", "Eine Beratung", "Ein Medikament"],
        answer: 1,
        explain: "„Die erste Möglichkeit ist eine Beratung.“",
      },
      {
        text: "Was kostet eine Beratung?",
        options: ["Nichts", "Zwanzig Euro", "Es hängt ab"],
        answer: 0,
        explain: "„… man spricht einmal, kostenlos, und entscheidet danach selbst.“",
      },
      {
        kind: "gapfill",
        text: "Wer sich ___ Wochen einsam fühlt, sollte mit jemandem reden.",
        options: [],
        answer: 0,
        accept: ["seit"],
        explain: "Hâlâ SÜREN bir durum → „seit“ + Dativ, şimdiki zamanla.",
      },
      {
        kind: "short_answer",
        text: "Was soll man tun, wenn man jemanden kennt, dem es schlecht geht?",
        options: [],
        answer: 0,
        accept: ["nachfragen", "einfach nachfragen", "fragen"],
        explain: "„… fragen Sie einfach nach.“",
      },
    ],
  },
  {
    id: "b1-u20-r2",
    level: "B1",
    skill: "reading",
    unit: 20,
    title: "In der Notaufnahme",
    genre: "Deneyim yazısı",
    intro: "Acil serviste bir gece. Ne oldu, ne kadar sürdü — sırayla takip et.",
    minutes: 5,
    gloss: [
      { de: "die Notaufnahme", tr: "acil servis", en: "emergency room" },
      { de: "stürzen", tr: "düşmek", en: "to fall" },
      { de: "sich verletzen", tr: "yaralanmak", en: "to injure oneself" },
      { de: "der Verdacht", tr: "şüphe", en: "suspicion" },
      { de: "der Knochen", tr: "kemik", en: "bone" },
    ],
    text:
      "Am Samstagabend ist meine Mutter auf der Treppe gestürzt. Sie hat sich " +
      "am Arm verletzt und konnte ihn nicht mehr bewegen. Ich habe sofort den " +
      "Notruf gewählt.\n\n" +
      "Der Krankenwagen war nach zwölf Minuten da. In der Notaufnahme mussten " +
      "wir dann drei Stunden warten, weil zwei schwerere Fälle vor uns kamen. " +
      "Das war richtig so, auch wenn es lang war.\n\n" +
      "Der Verdacht war, dass der Knochen kaputt ist. Nach dem Bild wussten " +
      "wir: er ist heil, es ist nur eine schwere Verletzung. Sie durfte nach " +
      "Hause, mit einer Salbe und der Anweisung, den Arm ruhig zu halten.\n\n" +
      "Seit einer Woche geht es ihr besser. Sie kann den Arm wieder heben, " +
      "zumindest langsam. Ich habe gelernt: Bei einem Sturz wählt man den " +
      "Notruf und wartet, statt selbst zu fahren.",
    questions: [
      {
        text: "Wo ist die Mutter gestürzt?",
        options: ["Auf der Treppe", "Im Bad", "Auf der Straße"],
        answer: 0,
        explain: "„Am Samstagabend ist meine Mutter auf der Treppe gestürzt.“",
      },
      {
        text: "Wie lange mussten sie in der Notaufnahme warten?",
        options: ["Zwölf Minuten", "Eine Stunde", "Drei Stunden"],
        answer: 2,
        explain: "„In der Notaufnahme mussten wir dann drei Stunden warten …“",
      },
      {
        text: "Was war das Ergebnis?",
        options: ["Der Knochen war kaputt", "Nur eine schwere Verletzung", "Nichts"],
        answer: 1,
        explain: "„… er ist heil, es ist nur eine schwere Verletzung.“",
      },
      {
        kind: "gapfill",
        text: "Sie hat sich am Arm verletzt und ___ ihn nicht mehr bewegen.",
        options: [],
        answer: 0,
        accept: ["konnte"],
        explain: "Kipli fiilin geçmişi Präteritum ile: „konnte“, „hat gekonnt“ değil.",
      },
      {
        kind: "short_answer",
        text: "Nach wie vielen Minuten war der Krankenwagen da?",
        options: [],
        answer: 0,
        accept: ["nach zwölf Minuten", "zwölf Minuten", "12 Minuten"],
        explain: "„Der Krankenwagen war nach zwölf Minuten da.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u20-l1",
    level: "B1",
    skill: "listening",
    unit: 20,
    title: "Die Impfung",
    genre: "Muayenehane konuşması",
    intro: "Bir aşı öncesi konuşma. Ne koruyor, ne yan etki var?",
    minutes: 4,
    gloss: [
      { de: "der Virus", tr: "virüs", en: "virus" },
      { de: "schützen", tr: "korumak", en: "to protect" },
      { de: "auftreten", tr: "ortaya çıkmak", en: "to occur" },
      { de: "die Haut", tr: "cilt", en: "skin" },
    ],
    segments: [
      { text: "Sie bekommen heute die Impfung. Haben Sie noch Fragen?" },
      { text: "Wie lange schützt sie denn?" },
      { text: "Etwa fünf Jahre. Danach kommen Sie zur Kontrolle. Der Virus bleibt nur kurze Zeit gefährlich." },
      { text: "Und was kann danach auftreten?" },
      { text: "Die Haut wird an der Stelle rot, manchmal für zwei Tage." },
      { text: "Ist das gefährlich?" },
      { text: "Nein, harmlos. Wenn Sie Fieber bekommen, rufen Sie an." },
      { text: "Gut. Ich konnte letztes Jahr nicht kommen, deshalb bin ich froh." },
    ],
    questions: [
      {
        text: "Wie lange schützt die Impfung?",
        options: ["Etwa fünf Jahre", "Ein Jahr", "Für immer"],
        answer: 0,
        explain: "„Etwa fünf Jahre. Danach kommen Sie zur Kontrolle.“",
      },
      {
        text: "Was kann danach auftreten?",
        options: ["Rote Haut an der Stelle", "Husten", "Nichts"],
        answer: 0,
        explain: "„Die Haut wird an der Stelle rot, manchmal für zwei Tage.“",
      },
      {
        text: "Was soll man bei Fieber tun?",
        options: ["Warten", "Anrufen", "Noch eine Impfung holen"],
        answer: 1,
        explain: "„Wenn Sie Fieber bekommen, rufen Sie an.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ letztes Jahr nicht kommen, deshalb bin ich froh.",
        options: [],
        answer: 0,
        accept: ["konnte"],
        explain: "Kipli fiil geçmişte Präteritum alır: konnte, musste, durfte.",
      },
      {
        kind: "short_answer",
        text: "Wie lange bleibt die Haut manchmal rot?",
        options: [],
        answer: 0,
        accept: ["für zwei Tage", "zwei Tage"],
        explain: "„Die Haut wird an der Stelle rot, manchmal für zwei Tage.“",
      },
    ],
  },
  {
    id: "b1-u20-l2",
    level: "B1",
    skill: "listening",
    unit: 20,
    title: "Der Besuch auf Station 3",
    genre: "Hastane ziyareti",
    intro: "Bir hasta ziyareti. Kim nasıl, ne getirilmiş?",
    minutes: 4,
    gloss: [
      { de: "die Station", tr: "servis / kat", en: "ward" },
      { de: "die Besserung", tr: "iyileşme", en: "recovery" },
      { de: "aufmuntern", tr: "neşelendirmek", en: "to cheer up" },
      { de: "die Kraft", tr: "güç", en: "strength" },
    ],
    segments: [
      { text: "Gute Besserung! Wir haben dir etwas zu lesen mitgebracht." },
      { text: "Danke, das ist lieb. Setzt euch." },
      { text: "Wie war die Nacht?" },
      { text: "Kurz. Um sechs wurde schon Blut abgenommen. Auf der Station wird man früh geweckt." },
      { text: "Und heute? Musstest du wieder zur Untersuchung?" },
      { text: "Ja, um zehn. Danach hatte ich keine Kraft mehr." },
      { text: "Dann bleiben wir nicht lang. Wir wollten dich nur aufmuntern." },
      { text: "Das hat schon geholfen. Kommt zumindest am Wochenende wieder." },
    ],
    questions: [
      {
        text: "Was haben die Besucher mitgebracht?",
        options: ["Blumen", "Etwas zu lesen", "Essen"],
        answer: 1,
        explain: "„Wir haben dir etwas zu lesen mitgebracht.“",
      },
      {
        text: "Was ist um sechs passiert?",
        options: ["Es wurde Blut abgenommen", "Der Arzt kam", "Das Frühstück kam"],
        answer: 0,
        explain: "„Um sechs wurde schon Blut abgenommen.“",
      },
      {
        text: "Warum bleiben die Besucher nicht lang?",
        options: ["Sie haben keine Zeit", "Der Kranke hat keine Kraft", "Der Besuch ist verboten"],
        answer: 1,
        explain: "„Danach hatte ich keine Kraft mehr.“ — „Dann bleiben wir nicht lang.“",
      },
      {
        kind: "gapfill",
        text: "___ du wieder zur Untersuchung?",
        options: [],
        answer: 0,
        accept: ["Musstest"],
        explain: "Kipli fiilin geçmişi: „musstest du“, „hast du gemusst“ değil.",
      },
      {
        kind: "short_answer",
        text: "Wann soll der Besuch wiederkommen?",
        options: [],
        answer: 0,
        accept: ["am Wochenende", "Wochenende"],
        explain: "„Kommt zumindest am Wochenende wieder.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u20-w1",
    level: "B1",
    skill: "writing",
    unit: 20,
    title: "Wie lange schon?",
    genre: "Durum bildirimi",
    intro: "Bir durumu ve ne kadar sürdüğünü yaz. Süren mi, planlanan mı?",
    minutes: 8,
    gloss: [
      { de: "sich verletzen", tr: "yaralanmak", en: "to injure oneself" },
      { de: "die Verletzung", tr: "yaralanma", en: "injury" },
      { de: "der Notruf", tr: "acil çağrı", en: "emergency call" },
      { de: "die Kontrolle", tr: "kontrol", en: "check-up" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üç gündür kolumu hareket ettiremiyorum.",
        answer: "Seit drei Tagen kann ich den Arm nicht bewegen.",
        hint: "Süren durum → seit + Dativ, şimdiki zaman.",
      },
      {
        kind: "build",
        tr: "Merhemi iki hafta boyunca sürüp sonra kontrole gelmem gerekiyor.",
        answer: "Ich muss die Salbe für zwei Wochen benutzen und danach zur Kontrolle kommen.",
        hint: "Planlanan süre → für + Akkusativ.",
      },
      {
        kind: "build",
        tr: "Dün acile gidemedim, acil çağrı hattı meşguldü.",
        answer: "Gestern konnte ich nicht in die Notaufnahme gehen, der Notruf war besetzt.",
        hint: "Kipli fiil geçmişte Präteritum.",
      },
      {
        kind: "form",
        prompt: "Acil kayıt kartını doldur.",
        facts: "Hasta: Sedef Aydın; olay: merdivende düşme; gün: cumartesi akşamı; yaralanma: kol; çağrı: acil çağrı yapıldı.",
        fields: [
          { label: "Patientin", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Vorfall", answer: "Sturz auf der Treppe", accept: ["Sturz", "gestürzt"] },
          { label: "Zeit", answer: "Samstagabend", accept: ["am Samstagabend", "Samstag"] },
          { label: "Verletzung", answer: "am Arm", accept: ["Arm", "der Arm"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Süre edatını düzelt.",
        source: "Ich bin krank für drei Tage und ich nehme die Pille seit morgen.",
        answer: "Ich bin seit drei Tagen krank und ich nehme die Pille für eine Woche.",
        why: "Türkçede '-den beri' ile 'için' birbirine yakın durur ve ikisi de süre anlatır, o yüzden karışıyor. Almanca ayırır: HÂLÂ SÜREN bir durum seit + Dativ ister ve şimdiki zamanla kurulur ('seit drei Tagen krank'); für ise PLANLANAN bir süreyi anlatır ('für eine Woche'). 'seit morgen' olmaz, çünkü yarın henüz başlamadı.",
      },
    ],
  },
  {
    id: "b1-u20-w2",
    level: "B1",
    skill: "writing",
    unit: 20,
    title: "Eine Nachricht an die Kranke",
    genre: "Geçmiş olsun mesajı",
    intro: "Hasta bir tanıdığına yaz. Geçmişte kipli fiili Präteritum ile kur.",
    minutes: 12,
    gloss: [
      { de: "die Besserung", tr: "iyileşme", en: "recovery" },
      { de: "aufmuntern", tr: "neşelendirmek", en: "to cheer up" },
      { de: "der Besuch", tr: "ziyaret", en: "visit" },
      { de: "zumindest", tr: "hiç değilse", en: "at least" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Dün gelemedim çünkü çalışmak zorundaydım.",
        answer: "Gestern konnte ich nicht kommen, weil ich arbeiten musste.",
        hint: "İki kipli fiil de Präteritum; yan cümlede en sonda.",
      },
      {
        kind: "build",
        tr: "Hafta sonu ziyarete gelmek isterdim.",
        answer: "Am Wochenende würde ich gern zu Besuch kommen.",
        hint: "Kibar dilek: Konjunktiv II.",
      },
      {
        kind: "free",
        prompt: "Hastanede yatan bir tanıdığına mesaj yaz: geçmiş olsun dile, neden ziyarete gelemediğini anlat (geçmişte kipli fiille), ne getirmek istediğini söyle, ne zaman geleceğini öner, ve neşelendirici bir cümleyle bitir.",
        checklist: [
          "Geçmiş olsun dileği var mı?",
          "Gelememe sebebi geçmiş kipli fiille anlatılmış mı?",
          "Ne getirileceği söylenmiş mi?",
          "Somut bir ziyaret zamanı önerilmiş mi?",
          "Neşelendirici bir kapanış var mı?",
        ],
        minWords: 70,
        sample:
          "Liebe Aylin,\n\n" +
          "gute Besserung! Ich habe erst gestern Abend gehört, dass du auf " +
          "Station 3 liegst.\n\n" +
          "Ich konnte diese Woche leider nicht kommen. Am Dienstag musste ich " +
          "bis acht arbeiten, und am Donnerstag durfte ich das Auto nicht " +
          "nehmen. Es tut mir leid, dass es so lange gedauert hat.\n\n" +
          "Am Samstag habe ich Zeit. Ich bringe dir etwas zu lesen mit und " +
          "zumindest einen richtigen Kaffee. Vielleicht kann ich dich damit ein bisschen aufmuntern. Sag Bescheid, wenn du lieber " +
          "Ruhe haben möchtest — dann komme ich nur kurz.\n\n" +
          "Ich denke oft an dich. Die Kraft kommt zurück, auch wenn es gerade " +
          "langsam geht. Bis Samstag!\n\n" +
          "Nuri",
        phrases: [
          { de: "Gute Besserung!", tr: "Geçmiş olsun!", en: "Get well soon!" },
          { de: "Ich konnte leider nicht kommen.", tr: "Ne yazık ki gelemedim.", en: "Unfortunately I couldn't come." },
          { de: "Sag Bescheid, wenn …", tr: "… ise haber ver.", en: "Let me know if …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Kipli fiilin geçmişini düzelt.",
        source: "Ich habe gestern nicht kommen gekonnt, weil ich habe arbeiten gemusst.",
        answer: "Ich konnte gestern nicht kommen, weil ich arbeiten musste.",
        why: "Türkçede geçmiş tek biçimdir ('gelemedim', 'çalışmak zorundaydım'), o yüzden Almancada da her fiil aynı geçmişle kuruluyor — ve konuşma dilinde Perfekt öğrenildiği için ona benzetiliyor. Almanca KİPLİ fiillerde bunu yapmaz: können, müssen, dürfen, wollen, sollen geçmişte Präteritum alır (konnte, musste, durfte). 'habe gekonnt' biçimi yalnız kipli fiil tek başınayken ve o da nadiren kullanılır.",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 20 — "İltifat, özür, özlem, yeni yıl kararı" (yalnız yazma).
 *
 * Dört ders: Das steht dir gut! · Es tut mir leid · Meine Familie ist weit
 * weg · Im neuen Jahr mehr Sport. İçerik ünite 1-20'nin kelimeleriyle sınırlı.
 *
 *   Ünite 20: edel, attraktiv, modisch, lässig, schlicht, super, talentiert,
 *             humorvoll · streiten, sich zanken, anschreien, beleidigt,
 *             vergeben, absichtlich, gemein, vorwerfen · der Kontakt,
 *             die Webcam, die Sprachnachricht, chatten, mailen, zurückschreiben,
 *             die Umarmung, zusammenhalten · boxen, das Tennis, sportlich,
 *             das Training, motiviert, freiwillig, verringern, machbar
 *   Kalıplar: Das steht dir gut! · Die Hose passt mir nicht mehr. · Es tut mir
 *             leid, dass ich das gesagt habe. · Ich habe das nicht absichtlich
 *             gemacht. · Wenn ich sie sehe, freue ich mich sehr. · Wir haben
 *             jeden Tag Kontakt. · Ich will dieses Jahr mehr Sport machen. ·
 *             Das ist schwer, aber machbar.
 *
 * Ölçtüğü nokta yönelme hâlindeki kişi zamiri — Almancada beğenmek, yakışmak ve
 * uymak fiillerinin öznesi giysidir, kişi ise mir/dir olarak yan durur.
 * Türkçe tam tersini söylediği için bu grup A2 boyunca yanlış kuruluyor.
 */
export const a2U20: SkillExercise[] = [
  {
    id: "a2-u20-r1",
    level: "A2",
    skill: "reading",
    unit: 20,
    title: "Komplimente — aber richtig",
    genre: "Dergi yazısı",
    intro: "İltifat etme rehberi. Hangisi hoş, hangisi fazla kişisel?",
    gloss: [
      { de: "edel", tr: "zarif, kaliteli", en: "elegant" },
      { de: "schlicht", tr: "sade", en: "plain" },
      { de: "attraktiv", tr: "çekici", en: "attractive" },
      { de: "talentiert", tr: "yetenekli", en: "talented" },
      { de: "humorvoll", tr: "espritüel", en: "humorous" },
      { de: "modisch", tr: "modaya uygun", en: "fashionable" },
      { de: "lässig", tr: "rahat, havalı", en: "casual" },
    ],
    minutes: 4,
    text:
      "KOMPLIMENTE — ABER RICHTIG\n\n" +
      "In Deutschland macht man weniger Komplimente als in vielen anderen Ländern. Das heißt nicht, dass niemand etwas Nettes denkt — man sagt es nur seltener.\n\n" +
      "Am einfachsten sind Komplimente über Kleidung. „Das steht dir gut!“ funktioniert fast immer. Auch „Die Jacke ist schön schlicht“ oder „Der Mantel ist wirklich edel“ hört jeder gern. Bei „modisch“ und „lässig“ muss man vorsichtig sein: nicht jeder will lässig aussehen.\n\n" +
      "Vorsicht bei Komplimenten über das Aussehen. „Du siehst heute attraktiv aus“ klingt unter Kollegen schnell zu persönlich. Besser ist etwas über die Arbeit: „Du bist wirklich talentiert“ oder „Ich finde dich sehr humorvoll“. Das freut die Leute und ist nie unangenehm.\n\n" +
      "Und wenn Sie selbst ein Kompliment bekommen? Sagen Sie einfach „Danke“. Viele antworten „Ach, das ist alt“ oder „Die Hose passt mir sowieso nicht mehr“. Das ist bescheiden, aber der andere weiß dann nicht, was er noch sagen soll.",
    questions: [
      {
        text: "Was sagt der Text über Komplimente in Deutschland?",
        options: ["Man macht sehr viele.", "Man macht sie seltener als anderswo.", "Man macht nie welche."],
        answer: 1,
        explain: "„In Deutschland macht man weniger Komplimente als in vielen anderen Ländern.“",
      },
      {
        kind: "gapfill",
        text: "Das steht ___ gut!",
        options: [],
        answer: 0,
        accept: ["dir"],
        explain: "Yakışan şey öznedir; iltifat edilen kişi yönelme hâlinde yanda durur.",
      },
      {
        text: "Welches Kompliment ist unter Kollegen problematisch?",
        options: ["Über die Arbeit", "Über das Aussehen", "Über die Jacke"],
        answer: 1,
        explain: "„Du siehst heute attraktiv aus“ klingt unter Kollegen schnell zu persönlich.",
      },
      {
        kind: "short_answer",
        text: "Wie soll man auf ein Kompliment antworten?",
        options: [],
        answer: 0,
        accept: ["Danke", "einfach Danke", "mit Danke"],
        explain: "„Sagen Sie einfach ‚Danke‘.“ Fazla mütevazı cevap karşıdakini zor durumda bırakıyor.",
      },
      {
        text: "Der Text findet „Ach, das ist alt“ eine gute Antwort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: mütevazı ama „der andere weiß dann nicht, was er noch sagen soll“.",
      },
    ],
  },
  {
    id: "a2-u20-r2",
    level: "A2",
    skill: "reading",
    unit: 20,
    title: "Zweitausend Kilometer",
    genre: "Forum yazısı",
    intro: "Ailesi uzakta olan biri anlatıyor. Bağı ne ayakta tutuyor?",
    gloss: [
      { de: "der Kontakt", tr: "iletişim", en: "contact" },
      { de: "die Sprachnachricht", tr: "sesli mesaj", en: "voice message" },
      { de: "zurückschreiben", tr: "geri yazmak", en: "to write back" },
      { de: "die Webcam", tr: "kamera", en: "webcam" },
      { de: "chatten", tr: "yazışmak", en: "to chat" },
      { de: "mailen", tr: "e-posta atmak", en: "to email" },
      { de: "die Umarmung", tr: "sarılma", en: "hug" },
      { de: "zusammenhalten", tr: "birbirine kenetlenmek", en: "to stick together" },
    ],
    minutes: 4,
    text:
      "Meine Familie ist weit weg — fast zweitausend Kilometer. Am Anfang habe ich jeden Abend geweint.\n\n" +
      "Heute ist es besser, und das liegt vor allem an einer Sache: Wir haben jeden Tag Kontakt. Nicht lange, oft nur zwei Minuten. Meine Mutter schickt mir morgens eine Sprachnachricht, ich schreibe abends zurück.\n\n" +
      "Sonntags telefonieren wir richtig, mit Webcam. Mein Vater hält das Tablet immer falsch, so dass ich eine halbe Stunde lang nur seine Stirn sehe. Wir lachen jedes Mal darüber.\n\n" +
      "Meine Schwester chattet lieber, mein Onkel mailt sogar noch. Jeder macht es anders, und das ist in Ordnung.\n\n" +
      "Wenn ich sie im Sommer sehe, freue ich mich sehr. Zwei Wochen, jedes Jahr. Die erste Umarmung am Flughafen ist jedes Mal zu kurz.\n\n" +
      "Was ich gelernt habe: Die Entfernung ist nicht das Problem. Das Problem ist, wenn man aufhört zu schreiben. Wir halten zusammen, weil wir es jeden Tag tun — nicht weil wir uns oft sehen.",
    questions: [
      {
        text: "Wie oft hat die Familie Kontakt?",
        options: ["Jeden Tag", "Nur sonntags", "Zweimal im Jahr"],
        answer: 0,
        explain: "„Wir haben jeden Tag Kontakt. Nicht lange, oft nur zwei Minuten.“",
      },
      {
        kind: "gapfill",
        text: "Meine Mutter schickt mir morgens eine ___, ich schreibe abends zurück.",
        options: [],
        answer: 0,
        accept: ["Sprachnachricht"],
        explain: "Uzun konuşma yerine kısa sesli mesaj — metnin anlattığı düzen bu.",
      },
      {
        text: "Was passiert beim Telefonieren mit dem Vater?",
        options: [
          "Die Verbindung ist schlecht.",
          "Er hält das Tablet falsch.",
          "Er hat keine Webcam.",
        ],
        answer: 1,
        explain: "„Mein Vater hält das Tablet immer falsch, so dass ich … nur seine Stirn sehe.“",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Text das eigentliche Problem?",
        options: [],
        answer: 0,
        accept: [
          "wenn man aufhört zu schreiben",
          "aufhören zu schreiben",
          "wenn man nicht mehr schreibt",
        ],
        explain: "„Die Entfernung ist nicht das Problem. Das Problem ist, wenn man aufhört zu schreiben.“",
      },
      {
        text: "Die Familie sieht sich jedes Jahr zwei Wochen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Zwei Wochen, jedes Jahr.“",
      },
    ],
  },
  {
    id: "a2-u20-l1",
    level: "A2",
    skill: "listening",
    unit: 20,
    title: "Das war nicht so gemeint",
    genre: "Diyalog",
    intro: "Tartışmadan sonra barışma. Kim ne yaptı, nasıl çözülüyor?",
    gloss: [
      { de: "sich zanken", tr: "atışmak", en: "to squabble" },
      { de: "anschreien", tr: "bağırmak", en: "to shout at" },
      { de: "beleidigt", tr: "gücenmiş", en: "offended" },
      { de: "absichtlich", tr: "bilerek", en: "on purpose" },
      { de: "vergeben", tr: "affetmek", en: "to forgive" },
      { de: "gemein", tr: "kırıcı", en: "mean" },
      { de: "vorwerfen", tr: "suçlamak, başa kakmak", en: "to reproach" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Timo", text: "Hast du kurz Zeit? Wegen gestern." },
      { speaker: "Sara", text: "Hm. Ich bin ehrlich gesagt noch beleidigt." },
      { speaker: "Timo", text: "Das verstehe ich. Es tut mir leid, dass ich dich vor allen angeschrien habe." },
      { speaker: "Sara", text: "Es war nicht nur das Schreien. Du hast mir vorgeworfen, dass ich nie zuhöre." },
      { speaker: "Timo", text: "Ich weiß. Das war gemein, und es stimmt nicht einmal." },
      { speaker: "Sara", text: "Wir zanken uns sonst nie so. Was war denn los?" },
      { speaker: "Timo", text: "Ich hatte einen furchtbaren Tag im Büro. Aber das ist keine Entschuldigung." },
      { speaker: "Sara", text: "Doch, ein bisschen schon. Ich habe auch zu laut geantwortet." },
      { speaker: "Timo", text: "Ich habe das jedenfalls nicht absichtlich gemacht. Kannst du mir vergeben?" },
      { speaker: "Sara", text: "Ja. Aber beim nächsten Mal sag mir einfach, dass der Tag schlecht war." },
    ],
    questions: [
      {
        text: "Was ist gestern passiert?",
        options: [
          "Timo hat Sara vor allen angeschrien.",
          "Sara hat Timo nicht zugehört.",
          "Beide haben nicht miteinander geredet.",
        ],
        answer: 0,
        explain: "„Es tut mir leid, dass ich dich vor allen angeschrien habe.“",
      },
      {
        kind: "gapfill",
        text: "Du hast mir ___, dass ich nie zuhöre.",
        options: [],
        answer: 0,
        accept: ["vorgeworfen"],
        explain: "Sara'yı asıl kıran bağırmak değil, bu suçlama.",
      },
      {
        text: "Warum war Timo so gereizt?",
        options: ["Er war krank.", "Er hatte einen schlechten Tag im Büro.", "Sara war zu spät."],
        answer: 1,
        explain: "„Ich hatte einen furchtbaren Tag im Büro. Aber das ist keine Entschuldigung.“",
      },
      {
        kind: "dictation",
        text: "Timo'nun bunu bilerek yapmadığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Ich habe das jedenfalls nicht absichtlich gemacht.",
          "Ich habe das nicht absichtlich gemacht.",
        ],
        explain: "Özür dilerken niyeti ayırmak: yaptığını kabul et, ama kasıtlı olmadığını söyle.",
      },
    ],
  },
  {
    id: "a2-u20-l2",
    level: "A2",
    skill: "listening",
    unit: 20,
    title: "Im neuen Jahr mehr Sport",
    genre: "Diyalog",
    intro: "Yılbaşı kararları. Hangi plan gerçekçi, hangisi değil?",
    gloss: [
      { de: "boxen", tr: "boks yapmak", en: "to box" },
      { de: "das Tennis", tr: "tenis", en: "tennis" },
      { de: "sportlich", tr: "sportif", en: "sporty" },
      { de: "motiviert", tr: "istekli", en: "motivated" },
      { de: "freiwillig", tr: "gönüllü olarak", en: "voluntarily" },
      { de: "verringern", tr: "azaltmak", en: "to reduce" },
      { de: "machbar", tr: "yapılabilir", en: "doable" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Rana", text: "Also, ich will dieses Jahr mehr Sport machen. Fünfmal die Woche." },
      { speaker: "Jonas", text: "Fünfmal? Du warst noch nie besonders sportlich." },
      { speaker: "Rana", text: "Eben deshalb! Ich bin gerade sehr motiviert." },
      { speaker: "Jonas", text: "Im Januar sind alle motiviert. Im März ist das Studio wieder leer." },
      { speaker: "Rana", text: "Danke für die Unterstützung." },
      { speaker: "Jonas", text: "Ich meine es ernst. Fang mit zweimal an. Das ist schwer, aber machbar." },
      { speaker: "Rana", text: "Zweimal klingt nach nichts." },
      { speaker: "Jonas", text: "Zweimal ein ganzes Jahr ist mehr als fünfmal für sechs Wochen. Was willst du denn machen?" },
      { speaker: "Rana", text: "Tennis, glaube ich. Oder boxen — eine Freundin geht dienstags." },
      { speaker: "Jonas", text: "Dann geh mit ihr. Allein hört man auf, zu zweit nicht so schnell." },
      { speaker: "Rana", text: "Gut. Zweimal die Woche, und den Kaffee verringere ich auch." },
      { speaker: "Jonas", text: "Eins nach dem anderen, bitte." },
    ],
    questions: [
      {
        text: "Wie oft will Rana zuerst Sport machen?",
        options: ["Zweimal die Woche", "Dreimal die Woche", "Fünfmal die Woche"],
        answer: 2,
        explain: "„Ich will dieses Jahr mehr Sport machen. Fünfmal die Woche.“",
      },
      {
        kind: "gapfill",
        text: "Das ist schwer, aber ___.",
        options: [],
        answer: 0,
        accept: ["machbar"],
        explain: "Jonas'ın önerisi: hedef zor olsun ama yapılabilir kalsın.",
      },
      {
        text: "Warum rät Jonas, mit einer Freundin zu gehen?",
        options: [
          "Weil es billiger ist.",
          "Weil man allein schneller aufhört.",
          "Weil sie besser boxt.",
        ],
        answer: 1,
        explain: "„Allein hört man auf, zu zweit nicht so schnell.“",
      },
      {
        kind: "short_answer",
        text: "Was will Rana außerdem verringern?",
        options: [],
        answer: 0,
        accept: ["den Kaffee", "Kaffee"],
        explain: "„Zweimal die Woche, und den Kaffee verringere ich auch.“",
      },
    ],
  },
  {
    id: "a2-u20-w1",
    level: "A2",
    skill: "writing",
    unit: 20,
    title: "Bana yakışıyor, sana uyuyor",
    genre: "Dil bilgisi",
    intro: "Beğenmek, yakışmak, uymak: Almancada özne kişi değil, şeydir.",
    gloss: [
      { de: "stehen", tr: "yakışmak", en: "to suit" },
      { de: "passen", tr: "uymak", en: "to fit" },
      { de: "gefallen", tr: "hoşuna gitmek", en: "to please" },
      { de: "modisch", tr: "modaya uygun", en: "fashionable" },
      { de: "lässig", tr: "rahat, havalı", en: "casual" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bu sana çok yakışıyor!",
        answer: "Das steht dir gut",
        hint: "Yakışan şey öznedir; kişi yönelme hâlinde yanda durur — dir.",
      },
      {
        kind: "build",
        tr: "Pantolon artık bana olmuyor.",
        answer: "Die Hose passt mir nicht mehr",
        hint: "Uyan şey öznedir: die Hose passt, kişi mir.",
      },
      {
        kind: "build",
        tr: "Bu ceket hoşuma gidiyor.",
        answer: "Diese Jacke gefällt mir",
        hint: "gefallen fiilinde beğenilen şey özne olur, beğenen kişi mir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: Türkçedeki özne Almancada özne değil.",
        source: "Ich gefalle das Kleid.",
        answer: "Das Kleid gefällt mir.",
        alternatives: ["Das Kleid gefällt mir", "Mir gefällt das Kleid."],
        why: "Böyle yazılınca anlam tersine döner: 'elbise beni beğeniyor'. gefallen fiilinde beğenilen şey özne, beğenen kişi yönelme hâlindedir.",
      },
    ],
  },
  {
    id: "a2-u20-w2",
    level: "A2",
    skill: "writing",
    unit: 20,
    title: "Eine Entschuldigung",
    genre: "Mesaj",
    intro: "Tartıştığın arkadaşına yaz: ne oldu, ne için özür diliyorsun?",
    gloss: [
      { de: "streiten", tr: "tartışmak", en: "to argue" },
      { de: "beleidigt", tr: "gücenmiş", en: "offended" },
      { de: "absichtlich", tr: "bilerek", en: "on purpose" },
      { de: "vergeben", tr: "affetmek", en: "to forgive" },
      { de: "gemein", tr: "kırıcı, kötü", en: "mean" },
      { de: "die Umarmung", tr: "sarılma", en: "hug" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Arkadaşının mesajına özür dileyen bir cevap yaz. Neye üzüldüğünü dass ile söyle, bilerek yapmadığını belirt ve barışmak için somut bir şey öner.",
        stimulus:
          "Hey,\n\n" +
          "ich bin ehrlich gesagt immer noch beleidigt. Vor allen Leuten zu sagen, dass ich nie pünktlich bin — das war gemein.\n\n" +
          "Vielleicht hast du es lustig gemeint. Bei mir kam es nicht so an.\n\n" +
          "Ich will nicht streiten, aber ich wollte, dass du es weißt.\n\nJana",
        checklist: [
          "Neye üzüldüğünü dass ile söyledin mi?",
          "Bilerek yapmadığını belirttin mi?",
          "Onun ne hissettiğini kabul ettin mi?",
          "Barışmak için somut bir şey önerdin mi?",
        ],
        minWords: 40,
        phrases: [
          { de: "Es tut mir leid, dass ich das gesagt habe.", tr: "bunu söylediğim için özür dilerim", en: "I'm sorry I said that" },
          { de: "Ich habe das nicht absichtlich gemacht.", tr: "bilerek yapmadım", en: "I didn't do it on purpose" },
          { de: "Können wir darüber reden?", tr: "bunu konuşabilir miyiz", en: "can we talk about it" },
        ],
        sample:
          "Liebe Jana,\n\n" +
          "danke, dass du es mir direkt gesagt hast. Es tut mir wirklich leid, dass ich das vor allen gesagt habe.\n\n" +
          "Ich habe das nicht absichtlich gemacht und wollte dich nicht verletzen. Aber du hast recht: lustig war es nur für mich, nicht für dich. Das war gemein.\n\n" +
          "Ich verstehe, dass du beleidigt bist. Können wir darüber reden? Ich lade dich am Donnerstag zum Kaffee ein, dann sage ich es dir auch persönlich.\n\n" +
          "Bitte schreib mir zurück.\nKerem",
      },
    ],
  },
];

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
 * Bu ünite yalnız yazma taşıyor: okuma ve dinleme havuzları ünite 19'da
 * 50'ye doldu, yazma ise 25 üniteye yayılan desende hâlâ eksikti. Ölçtüğü
 * nokta yönelme hâlindeki kişi zamiri — Almancada beğenmek, yakışmak ve
 * uymak fiillerinin öznesi giysidir, kişi ise mir/dir olarak yan durur.
 * Türkçe tam tersini söylediği için bu grup A2 boyunca yanlış kuruluyor.
 */
export const a2U20: SkillExercise[] = [
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

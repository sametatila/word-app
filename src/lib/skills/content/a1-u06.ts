import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 6 — "Kafe, kahvaltı, büfe ve lokanta".
 *
 * Dört ders: Im Café · Das Frühstück · Am Imbiss · Im Restaurant.
 * İçerik ünite 1-6'nın kelimeleriyle sınırlı.
 *
 *   Ünite 6: der Kaffee, der Tee, das Wasser, bestellen, die Rechnung,
 *            die Tasse, das Glas, der Kakao · das Frühstück, das Brot,
 *            der Käse, essen, trinken, das Brötchen, die Butter,
 *            die Marmelade · der Imbiss, die Wurst, die Pommes, das Getränk,
 *            kosten, der Hunger, der Durst, die Pizza · das Restaurant,
 *            die Speisekarte, die Vorspeise, die Suppe, bezahlen, der Wein,
 *            das Bier, der Appetit
 *   Kalıplar: Ich möchte … · Die Rechnung, bitte! · Ich esse/trinke … ·
 *            Einmal … bitte · Was kostet …? · Ich hätte gern …
 *
 * Fiyatlar RAKAMLA yazılıyor: A1'de yazıyla bilinen sayılar yalnız zehn,
 * zwanzig ve hundert; "drei Euro fünfzig" demek bu üniteye kadar
 * öğretilmeyen sayıları gerektirirdi.
 */
export const a1U06: SkillExercise[] = [
  {
    id: "a1-u6-r1",
    level: "A1",
    skill: "reading",
    unit: 6,
    title: "Die Speisekarte",
    genre: "Menü",
    intro: "Bir kafenin menüsünü okuyacaksın. Ne var, ne kadar?",
    gloss: [
      { de: "die Speisekarte", tr: "yemek listesi", en: "menu" },
      { de: "kosten", tr: "fiyatı olmak", en: "to cost" },
      { de: "das Getränk", tr: "içecek", en: "drink" },
      { de: "die Rechnung", tr: "hesap", en: "bill" },
    ],
    minutes: 3,
    text:
      "CAFÉ SONNE — Speisekarte\n\nGETRÄNKE\nKaffee (eine Tasse) — 2,50 Euro\nTee (ein Glas) — 2,00 Euro\nKakao — 3,00 Euro\nWasser — 1,50 Euro\n\nESSEN\nBrötchen mit Butter und Marmelade — 3,50 Euro\nBrot mit Käse — 4,00 Euro\nSuppe (Vorspeise) — 4,50 Euro\nPizza — 8,00 Euro\n\nFrühstück (Brötchen, Käse, Butter, Marmelade und Kaffee) — 9,00 Euro\n\nWein und Bier gibt es nicht. Wir sind ein Café, kein Restaurant!",
    questions: [
      {
        text: "Was kostet ein Kakao?",
        options: ["3,00 Euro", "2,50 Euro", "1,50 Euro"],
        answer: 0,
        explain: "Menüde „Kakao — 3,00 Euro“. 2,50 kahve, 1,50 su.",
      },
      {
        text: "Richtig oder falsch? Man kann hier Bier bestellen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wein und Bier gibt es nicht.“ Burası kafe, lokanta değil.",
      },
      {
        text: "Was ist im Frühstück?",
        options: [
          "Brötchen, Käse, Butter, Marmelade und Kaffee",
          "Suppe und Pizza",
          "nur Brot und Wasser",
        ],
        answer: 0,
        explain: "Menüde kahvaltının içeriği parantez içinde yazıyor.",
      },
      {
        kind: "gapfill",
        text: "Eine Suppe kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["4,50", "4.50"],
        explain: "„Suppe (Vorspeise) — 4,50 Euro“.",
      },
    ],
  },
  {
    id: "a1-u6-r2",
    level: "A1",
    skill: "reading",
    unit: 6,
    title: "Mein Frühstück",
    genre: "Forum mesajı",
    intro: "Üç kişi kahvaltıda ne yediğini yazıyor.",
    gloss: [
      { de: "das Frühstück", tr: "kahvaltı", en: "breakfast" },
      { de: "der Hunger", tr: "açlık", en: "hunger" },
      { de: "der Durst", tr: "susuzluk", en: "thirst" },
    ],
    minutes: 3,
    text:
      "Mia: Ich esse zum Frühstück ein Brötchen mit Butter und Marmelade. Ich trinke eine Tasse Kaffee. Ohne Kaffee bin ich müde!\n\nTom: Ich habe morgens keinen Hunger. Ich trinke nur ein Glas Wasser. Am Mittag habe ich dann viel Hunger und esse eine Pizza.\n\nElif: Bei uns gibt es Brot mit Käse und Tee. Meine Kinder trinken Kakao. Kaffee trinke ich nicht gern — ich trinke lieber Tee.",
    questions: [
      {
        text: "Was trinkt Mia zum Frühstück?",
        options: ["Kaffee", "Tee", "Kakao"],
        answer: 0,
        explain: "„Ich trinke eine Tasse Kaffee.“",
      },
      {
        text: "Richtig oder falsch? Tom isst viel zum Frühstück.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich habe morgens keinen Hunger.“ — sadece su içiyor.",
      },
      {
        text: "Wer trinkt Kakao?",
        options: ["Elifs Kinder", "Mia", "Tom"],
        answer: 0,
        explain: "„Meine Kinder trinken Kakao.“",
      },
      {
        kind: "gapfill",
        text: "Elif trinkt lieber ___ als Kaffee.",
        options: [],
        answer: 0,
        accept: ["Tee"],
        explain: "„Kaffee trinke ich nicht gern — ich trinke lieber Tee.“",
      },
    ],
  },
  {
    id: "a1-u6-l1",
    level: "A1",
    skill: "listening",
    unit: 6,
    title: "Im Café bestellen",
    genre: "Diyalog",
    intro: "Kafede sipariş veriliyor. Ne isteniyor, hesap ne kadar?",
    gloss: [
      { de: "bestellen", tr: "sipariş etmek", en: "to order" },
      { de: "die Rechnung", tr: "hesap", en: "bill" },
      { de: "bezahlen", tr: "ödemek", en: "to pay" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag! Was möchten Sie bestellen?" },
      { text: "Ich möchte einen Kaffee und ein Brötchen, bitte." },
      { text: "Gern. Möchten Sie auch Butter und Marmelade?" },
      { text: "Ja, bitte. Und ein Glas Wasser." },
      { text: "Die Rechnung, bitte! — Das macht 7,00 Euro." },
    ],
    questions: [
      {
        text: "Was bestellt die Person?",
        options: ["einen Kaffee und ein Brötchen", "einen Tee und Pizza", "eine Suppe"],
        answer: 0,
        explain: "„Ich möchte einen Kaffee und ein Brötchen, bitte.“",
      },
      {
        kind: "gapfill",
        text: "Die Rechnung ist ___ Euro.",
        options: [],
        answer: 0,
        accept: ["7,00", "7", "7.00"],
        explain: "„Das macht 7,00 Euro.“",
      },
      {
        text: "Was trinkt die Person außer Kaffee?",
        options: ["ein Glas Wasser", "einen Kakao", "ein Bier"],
        answer: 0,
        explain: "„Und ein Glas Wasser.“",
      },
      {
        text: "Richtig oder falsch? Die Person möchte keine Marmelade.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, bitte.“ diyor — tereyağı ve reçel istiyor.",
      },
    ],
  },
  {
    id: "a1-u6-l2",
    level: "A1",
    skill: "listening",
    unit: 6,
    title: "Am Imbiss",
    genre: "Diyalog",
    intro: "Büfede sipariş. Kaç tane, ne kadar, burada mı paket mi?",
    gloss: [
      { de: "der Imbiss", tr: "büfe", en: "snack bar" },
      { de: "die Pommes", tr: "patates kızartması", en: "fries" },
      { de: "die Wurst", tr: "sosis", en: "sausage" },
    ],
    minutes: 2,
    segments: [
      { text: "Einmal Wurst mit Pommes, bitte." },
      { text: "Möchten Sie auch ein Getränk?" },
      { text: "Ja, ein Wasser bitte. Was kostet das zusammen?" },
      { text: "Das kostet 6,50 Euro." },
      { text: "Zum Mitnehmen, bitte." },
    ],
    questions: [
      {
        text: "Was bestellt die Person?",
        options: ["Wurst mit Pommes und ein Wasser", "Pizza und Bier", "Suppe und Brot"],
        answer: 0,
        explain: "„Einmal Wurst mit Pommes“ + „ein Wasser bitte“.",
      },
      {
        kind: "gapfill",
        text: "Alles zusammen kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["6,50", "6.50"],
        explain: "„Das kostet 6,50 Euro.“",
      },
      {
        text: "Isst die Person am Imbiss?",
        options: ["Nein, sie nimmt es mit", "Ja, sie isst dort", "Sie isst nichts"],
        answer: 0,
        explain: "„Zum Mitnehmen, bitte.“ — paket, yani yanına alıyor.",
      },
      {
        text: "Richtig oder falsch? Die Person bestellt kein Getränk.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, ein Wasser bitte.“",
      },
    ],
  },
  {
    id: "a1-u6-w1",
    level: "A1",
    skill: "writing",
    unit: 6,
    title: "Bestellen und bezahlen",
    genre: "Dil bilgisi",
    intro: "Sipariş ve ödeme kalıplarını yaz.",
    gloss: [
      { de: "möchten", tr: "istemek", en: "would like" },
      { de: "die Rechnung", tr: "hesap", en: "bill" },
      { de: "kosten", tr: "fiyatı olmak", en: "to cost" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir kahve istiyorum.",
        answer: "Ich möchte einen Kaffee",
        hint: "„möchten“ Akkusativ ister: der Kaffee → einen Kaffee. Dişilde eine, nötrde ein.",
      },
      {
        kind: "build",
        tr: "Bu ne kadar?",
        answer: "Was kostet das",
        hint: "Fiyat sorarken „Was kostet …?“ kullanılır; „Wie viel kostet …?“ de olur.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi kibar sipariş biçimine çevir.",
        source: "Ich will eine Suppe.",
        answer: "Ich möchte eine Suppe.",
        alternatives: ["Ich hätte gern eine Suppe."],
        why: "„Ich will“ kaba durur; sipariş verirken „Ich möchte“ ya da „Ich hätte gern“ denir.",
      },
    ],
  },
  {
    id: "a1-u6-w2",
    level: "A1",
    skill: "writing",
    unit: 6,
    title: "Was isst du zum Frühstück?",
    genre: "Forum mesajı",
    intro: "Kahvaltıda ne yiyip içtiğini yaz.",
    gloss: [
      { de: "zum Frühstück", tr: "kahvaltıda", en: "for breakfast" },
      { de: "gern", tr: "severek", en: "gladly" },
      { de: "der Appetit", tr: "iştah", en: "appetite" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Kahvaltıda ekmek ve peynir yerim.",
        answer: "Ich esse zum Frühstück Brot und Käse",
        hint: "Zaman bilgisi („zum Frühstück“) fiilden hemen sonra gelir, nesne ondan sonra.",
      },
      {
        kind: "free",
        prompt:
          "Foruma kahvaltını anlat (4-5 cümle). Ne yiyorsun, ne içiyorsun, neyi sevmiyorsun?",
        minWords: 30,
        checklist: [
          "Ne yediğini yazdın mı? (Ich esse …)",
          "Ne içtiğini yazdın mı? (Ich trinke …)",
          "„zum Frühstück“ kalıbını kullandın mı?",
          "Sevmediğin bir şey yazdın mı? (Ich trinke … nicht gern.)",
        ],
        phrases: [
          { de: "Ich esse zum Frühstück …", tr: "Kahvaltıda … yerim", en: "For breakfast I eat …" },
          { de: "Ich trinke gern …", tr: "… içmeyi severim", en: "I like drinking …" },
          { de: "Ich habe keinen Hunger.", tr: "Aç değilim.", en: "I'm not hungry." },
        ],
        sample:
          "Hallo!\n\nIch esse zum Frühstück ein Brötchen mit Butter und Marmelade. Manchmal esse ich auch Brot mit Käse.\n\nIch trinke gern eine Tasse Tee. Kaffee trinke ich nicht gern.\n\nManchmal habe ich mehr Zeit. Dann esse ich zusammen mit meiner Familie und wir trinken Kakao.\n\nUnd ihr? Was esst ihr zum Frühstück?",
      },
    ],
  },
];

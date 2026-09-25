import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA2P8: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s8",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "-tion, -sion, -ture",
    genre: "pronounce",
    intro: "Uzun kelimelerin sonundaki bu üç ek hep aynı okunur; tanıyınca yüzlerce kelime çözülür.",
    gloss: [
      { de: "station", tr: "istasyon" },
      { de: "decision", tr: "karar" },
      { de: "picture", tr: "resim" },
      { de: "nature", tr: "doğa" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "The station is near the information desk.",
        tr: "İstasyon danışmanın yanında.",
        hint: "„-tion“ her zaman ŞIN okunur: STEY-şın, in-fı-MEY-şın. Vurgu ekten hemen ÖNCEKİ hecededir.",
        confusions: [
          { heard: [], fix: "t ve ion ayrı okunmaz; tek bir ş sesi verir.", expected: "station" },
        ],
      },
      {
        de: "It was a difficult decision.",
        tr: "Zor bir karardı.",
        hint: "„-sion“ ünlüden sonra JIN okunur: di-Sİ-jın. „television“ da öyle: TE-li-vi-jın.",
        confusions: [
          { heard: [], fix: "Ünlüden sonra gelen -sion yumuşak j sesi taşır.", expected: "decision" },
        ],
      },
      {
        de: "This picture shows nature in winter.",
        tr: "Bu resim kışın doğayı gösteriyor.",
        hint: "„-ture“ ÇIR okunur: PİK-çır, NEY-çır. t ile u birleşip ç verir.",
        confusions: [
          { heard: [], fix: "-ture eki ayrı bir t taşımaz; tek bir ç sesi çıkar.", expected: "picture" },
        ],
      },
      {
        de: "The discussion was about education.",
        tr: "Tartışma eğitim üzerineydi.",
        hint: "„discussion“ sessizden sonra ŞIN (dis-KA-şın), „education“ da ŞIN (e-cu-KEY-şın).",
        confusions: [
          { heard: [], fix: "İki ekte de tek bir ş sesi vardır.", expected: "discussion" },
        ],
      },
      {
        de: "The temperature will be higher in the future.",
        tr: "Gelecekte sıcaklık daha yüksek olacak.",
        hint: "„temperature“ üç heceye iner: TEM-pri-çır. „future“ = FYUU-çır.",
        confusions: [
          { heard: [], fix: "Uzun görünen kelimeler konuşmada hece kaybeder.", expected: "temperature" },
        ],
      },
      {
        de: "The question is about a solution.",
        tr: "Soru bir çözümle ilgili.",
        hint: "„question“ istisnadır: ŞIN değil ÇIN okunur (KWES-çın). „solution“ ise normal: sı-LUU-şın.",
        confusions: [
          { heard: [], fix: "„question“ içindeki -tion s'den sonra geldiği için ç olur.", expected: "question" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g8",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "quick or quickly?",
    genre: "grammar",
    intro: "Sıfat ismi, zarf fiili anlatır; İngilizcede ikisi ayrı biçimlerdir ve karıştırmak sık bir hatadır.",
    focus: "Sıfat ve zarf ayrımı, -ly eki ve düzensizler",
    gloss: [
      { de: "careful", tr: "dikkatli" },
      { de: "slowly", tr: "yavaşça" },
      { de: "hard", tr: "sıkı" },
      { de: "well", tr: "iyi" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Sıfat isme, zarf fiile",
        tr: "Sıfat bir ismi niteler: „a quick car“. Zarf ise fiili niteler: „he drives quickly“. Çoğu zarf sıfata -ly eklenerek kurulur. Yazımda küçük kurallar vardır: -y ile bitenlerde y, i olur (easy → easily), -le ile bitenlerde e düşer (simple → simply).",
        examples: [
          { de: "She is a careful driver.", tr: "Dikkatli bir sürücü.", note: "sıfat + isim" },
          { de: "She drives carefully.", tr: "Dikkatli araba kullanıyor.", note: "zarf + fiil" },
          { de: "Please speak slowly.", tr: "Lütfen yavaş konuş.", note: "fiili niteliyor" },
        ],
      },
      {
        heading: "„be“ fiilinden sonra sıfat gelir",
        tr: "„be, look, feel, sound, taste, seem“ fiillerinden sonra ZARF değil SIFAT kullanılır, çünkü bu fiiller özneyi niteler: „She is happy“, „It sounds good“ — „It sounds well“ değil. Bu fiiller bir eylem değil bir durum bildirir.",
        examples: [
          { de: "That sounds good.", tr: "Kulağa iyi geliyor.", note: "sound + sıfat" },
          { de: "You look tired.", tr: "Yorgun görünüyorsun.", note: "look + sıfat" },
          { de: "The soup tastes strange.", tr: "Çorbanın tadı tuhaf.", note: "taste + sıfat" },
        ],
      },
      {
        heading: "Düzensizler: good, hard, fast",
        tr: "„good“ sıfattır, zarfı „well“dir: „a good singer“ ama „she sings well“. „hard“ ve „fast“ ise hem sıfat hem zarftır ve -ly ALMAZ: „a hard test“, „she works hard“. Dikkat: „hardly“ ayrı bir kelimedir ve „neredeyse hiç“ demektir.",
        examples: [
          { de: "She sings very well.", tr: "Çok iyi şarkı söylüyor.", note: "good → well" },
          { de: "He works hard every day.", tr: "Her gün sıkı çalışıyor.", note: "hard: zarf olarak da aynı" },
          { de: "I hardly know him.", tr: "Onu neredeyse hiç tanımıyorum.", note: "hardly: başka anlam" },
        ],
      },
    ],
    questions: [
      {
        text: "She drives very ___.",
        options: ["careful", "carefully", "care"],
        answer: 1,
        explain: "Fiili niteliyor; zarf biçimi gerekir.",
      },
      {
        text: "That sounds ___.",
        options: ["well", "good", "goodly"],
        answer: 1,
        explain: "„sound“ durum fiilidir ve arkasından sıfat gelir.",
      },
      {
        text: "He works ___ every day.",
        options: ["hardly", "hard", "hardily"],
        answer: 1,
        explain: "„hard“ zarf olarak da aynı kalır; „hardly“ başka anlam taşır.",
      },
      {
        kind: "gapfill",
        text: "Please speak ___. (slow)",
        options: [],
        answer: 0,
        accept: ["slowly"],
        explain: "Fiili niteleyen biçim -ly alır.",
      },
      {
        kind: "gapfill",
        text: "She sings very ___. (good)",
        options: [],
        answer: 0,
        accept: ["well"],
        explain: "„good“ sıfatının zarfı well'dir.",
      },
      {
        kind: "gapfill",
        text: "You look ___ today. (tired)",
        options: [],
        answer: 0,
        accept: ["tired"],
        explain: "„look“ durum fiilidir; sıfat olduğu gibi kalır.",
      },
      {
        kind: "gapfill",
        text: "He finished the test ___. (easy)",
        options: [],
        answer: 0,
        accept: ["easily"],
        explain: "-y ile biten sıfatlarda y, i olur: easily.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "is", "a careful", "driver"],
        explain: "Sıfat ismin önünde durur: a careful driver.",
      },
      {
        kind: "truefalse",
        text: "„It sounds well.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„sound“ arkasından sıfat ister: „It sounds good.“",
      },
      {
        kind: "truefalse",
        text: "„I hardly know him.“ — Bu cümle „onu çok iyi tanıyorum“ demek mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "„hardly“ neredeyse hiç demektir; „hard“ ile karıştırılmamalı.",
      },
    ],
  },
];

import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA2P9: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s9",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "bought, caught, thought",
    genre: "pronounce",
    intro: "„gh“ harf ikilisi çoğu kelimede hiç okunmaz ama önündeki ünlüyü uzatır; düzensiz fiillerde bu kalıp her yerde.",
    gloss: [
      { de: "to buy", tr: "satın almak" },
      { de: "to catch", tr: "yakalamak" },
      { de: "to think", tr: "düşünmek" },
      { de: "daughter", tr: "kız evlat" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I bought a ticket and caught the train.",
        tr: "Bilet aldım ve trene yetiştim.",
        hint: "„bought“ = BOOT, „caught“ = KOOT. gh susar, o uzar ve sonda t duyulur.",
        confusions: [
          { heard: [], fix: "g ve h söylenmez; yalnız uzun o ile t kalır.", expected: "bought" },
        ],
      },
      {
        de: "I thought it was easy.",
        tr: "Kolay sanmıştım.",
        hint: "„thought“ = THOOT. Başta dilin ucu dişlerin arasında, sonda yalnız t.",
        confusions: [
          { heard: ["I taught it was easy", "I sought it was easy"], fix: "Baştaki th, t ya da s değildir; dil dişlerin arasına gelir.", expected: "thought" },
        ],
      },
      {
        de: "My daughter taught me that.",
        tr: "Bunu bana kızım öğretti.",
        hint: "„daughter“ = DOO-dır, „taught“ = TOOT. Aynı uzun o, aynı susan gh.",
        confusions: [
          { heard: [], fix: "Kelimeyi harfleyerek okuma; gh sessizdir.", expected: "daughter" },
        ],
      },
      {
        de: "He brought enough food.",
        tr: "Yeterince yemek getirdi.",
        hint: "Burada gh iki ayrı iş yapıyor: „brought“ içinde susar (BROOT), „enough“ içinde f olur (i-NAF).",
        confusions: [
          { heard: [], fix: "Aynı harf ikilisi iki ayrı biçimde davranır; kelimeyle birlikte öğrenilir.", expected: "enough" },
        ],
      },
      {
        de: "The night flight was long.",
        tr: "Gece uçuşu uzundu.",
        hint: "„night“ = NAYT, „flight“ = FLAYT. Burada gh yine susar ama ünlü uzun o değil ay olur.",
        confusions: [
          { heard: [], fix: "gh yazılır, okunmaz; önündeki i ay sesine döner.", expected: "night" },
        ],
      },
      {
        de: "That's a tough question, though.",
        tr: "Yine de bu zor bir soru.",
        hint: "„tough“ = TAF (gh = f), „though“ = DOU (gh susar). Yazımları neredeyse aynı, sesleri ayrı.",
        confusions: [
          { heard: [], fix: "İki kelime birbirine benzer ama ortak bir kural yoktur.", expected: "though" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g9",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "too, enough, very",
    genre: "grammar",
    intro: "Üçü de miktar bildirir ama „too“ bir sorun, „enough“ bir yeterlilik, „very“ yalnız bir derece söyler.",
    focus: "too, enough ve very: yer ve anlam farkı",
    gloss: [
      { de: "expensive", tr: "pahalı" },
      { de: "room", tr: "yer" },
      { de: "tired", tr: "yorgun" },
      { de: "warm", tr: "sıcak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "too: gereğinden fazla",
        tr: "„too“ olumsuz bir yargı taşır: gereğinden fazla, bu yüzden bir sorun var. „This is too expensive“ — alamıyorum demektir. „very“ ise yalnız derecedir ve sorun bildirmez: „This is very expensive, but I'll buy it.“ İkisini karıştırmak anlamı tersine çevirir.",
        examples: [
          { de: "This coat is too expensive.", tr: "Bu palto fazla pahalı.", note: "sorun var" },
          { de: "This coat is very expensive.", tr: "Bu palto çok pahalı.", note: "yalnız derece" },
          { de: "It's too cold to sit outside.", tr: "Dışarıda oturmak için fazla soğuk.", note: "too … to + fiil" },
        ],
      },
      {
        heading: "enough: sıfattan sonra, isimden önce",
        tr: "„enough“ yeterliliği bildirir ve yeri sabittir: SIFATTAN ve ZARFTAN SONRA („warm enough“, „quickly enough“), ama İSİMDEN ÖNCE („enough room“, „enough time“). Bu sıra karıştırıldığında cümle hemen yanlış duyulur.",
        examples: [
          { de: "The room isn't warm enough.", tr: "Oda yeterince sıcak değil.", note: "sıfattan sonra" },
          { de: "We don't have enough time.", tr: "Yeterli vaktimiz yok.", note: "isimden önce" },
          { de: "He didn't run fast enough.", tr: "Yeterince hızlı koşmadı.", note: "zarftan sonra" },
        ],
      },
      {
        heading: "Kalıplar: too … to, enough … to",
        tr: "İkisi de „to + fiil“ ile tamamlanabilir ve o zaman bir sonucu bildirir: „too tired to work“ (yorgun olduğu için çalışamıyor), „old enough to drive“ (araba kullanacak yaşta). Kimin için olduğunu söylemek istersen araya „for“ girer: „too difficult for me“.",
        examples: [
          { de: "I'm too tired to cook.", tr: "Yemek yapamayacak kadar yorgunum.", note: "sonuç: yapamıyor" },
          { de: "She's old enough to drive.", tr: "Araba kullanacak yaşta.", note: "yeterli" },
          { de: "This is too difficult for me.", tr: "Bu benim için fazla zor.", note: "for + kişi" },
        ],
      },
    ],
    questions: [
      {
        text: "I can't buy it — it's ___ expensive.",
        options: ["very", "too", "enough"],
        answer: 1,
        explain: "Alamıyorsa bir sorun var; „too“ gerekir.",
      },
      {
        text: "The room isn't ___.",
        options: ["enough warm", "warm enough", "too warm"],
        answer: 1,
        explain: "„enough“ sıfattan sonra gelir.",
      },
      {
        text: "We don't have ___.",
        options: ["time enough", "enough time", "too time"],
        answer: 1,
        explain: "„enough“ isimden önce gelir.",
      },
      {
        kind: "gapfill",
        text: "It's ___ cold to sit outside.",
        options: [],
        answer: 0,
        accept: ["too"],
        explain: "Sonuç bildiren kalıp: too + sıfat + to + fiil.",
      },
      {
        kind: "gapfill",
        text: "She's old ___ to drive.",
        options: [],
        answer: 0,
        accept: ["enough"],
        explain: "Sıfattan sonra enough gelir ve „to + fiil“ ile tamamlanır.",
      },
      {
        kind: "gapfill",
        text: "This coat is ___ expensive, but I'll buy it. (sorun yok)",
        options: [],
        answer: 0,
        accept: ["very"],
        explain: "Alıyorsa sorun yoktur; yalnız derece bildirilir.",
      },
      {
        kind: "gapfill",
        text: "This is too difficult ___ me.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Kimin için olduğunu „for“ söyler.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I'm", "too tired", "to", "cook"],
        explain: "too + sıfat + to + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„We don't have time enough.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "İsimden önce gelmeli: „enough time“.",
      },
      {
        kind: "truefalse",
        text: "„This coat is very expensive, but I'll buy it.“ — Bu cümle tutarlı mı?",
        options: ["True", "False"],
        answer: 0,
        explain: "„very“ sorun bildirmez, bu yüzden almak çelişki değildir.",
      },
    ],
  },
];

import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti yalnız KONUŞMA ve DİL BİLGİSİ hücrelerini taşır (gerekçe: parti
 * 18 başlığı). Kurallar ve emsal: `en-a2.ts` (parti 1) ve
 * `data/content/SPEC.md`.
 *
 * Parti 19 amaç ve düzeltme hattı. Söyleyiş odağı bir bilgiyi düzeltirken
 * yapılan karşıtlık vurgusu (I said TUESDAY); dil bilgisi amaç bildirmek:
 * to + yalın fiil ve for + isim.
 */
export const enA2P19: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s19",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "No, I said TUESDAY",
    genre: "pronounce",
    intro: "Bir yanlışı düzeltirken yalnız düzeltilen kelime vurgulanır; vurgu başka kelimeye kayarsa cümle başka bir şeyi düzeltir.",
    gloss: [
      { de: "Tuesday", tr: "salı" },
      { de: "floor", tr: "kat" },
      { de: "order", tr: "sipariş vermek" },
      { de: "meeting", tr: "toplantı" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "No, I said TUESDAY, not Thursday.",
        tr: "Hayır, perşembe değil salı dedim.",
        hint: "Ağırlık yalnız düzeltilen günde: TUES-day, daha yüksek ve daha uzun. Geri kalan hızlı ve alçak.",
        confusions: [
          { heard: [], fix: "Her kelimeyi eşit vurgulama; yalnız salıyı öne çıkar.", expected: "TUESDAY" },
        ],
      },
      {
        de: "It's the RED bag, not the blue one.",
        tr: "Kırmızı çanta, mavi olan değil.",
        hint: "Düzeltilen renk: RED. „bag“ normalde vurgulu olsa da burada alçak kalır.",
        confusions: [
          { heard: [], fix: "Vurguyu „bag“e koyarsan çantayı düzeltiyormuşsun gibi duyulur.", expected: "RED" },
        ],
      },
      {
        de: "I ordered COFFEE, not tea.",
        tr: "Çay değil kahve sipariş ettim.",
        hint: "Garsona yanlışı söylerken: kof-Fİİ değil KOF-fi, ilk hece güçlü ve yüksek.",
        confusions: [
          { heard: [], fix: "„ordered“ı vurgularsan sipariş verip vermediğini tartışıyormuşsun gibi olur.", expected: "COFFEE" },
        ],
      },
      {
        de: "SHE called, not her brother.",
        tr: "Kardeşi değil, kendisi aradı.",
        hint: "Zamirler normalde vurgusuzdur; burada kimin aradığı düzeltildiği için „she“ güçlü ve uzun: Şİİ.",
        confusions: [
          { heard: [], fix: "Zamiri zayıf söylersen düzeltme duyulmaz.", expected: "SHE" },
        ],
      },
      {
        de: "We live on the THIRD floor.",
        tr: "Üçüncü katta oturuyoruz.",
        hint: "Karşındaki „second“ dedi: sıra sayısı vurgulanır, „floor“ alçak kalır.",
        confusions: [
          { heard: [], fix: "Ağırlığı „floor“a verme; düzeltilen şey katın numarası.", expected: "THIRD" },
        ],
      },
      {
        de: "The meeting is at TEN, not two.",
        tr: "Toplantı ikide değil, onda.",
        hint: "Saat düzeltiliyor: TEN yüksek ve uzun, „meeting“ alçak.",
        confusions: [
          { heard: [], fix: "Düzeltme cümlesinde tek bir güçlü kelime olur.", expected: "TEN" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g19",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "to buy bread, for bread",
    genre: "grammar",
    intro: "Türkçede amacı „-mek için“ söyler; İngilizcede „için“ kelimesini „for“ ile çevirmek çoğu zaman yanlıştır, çünkü fiilden önce „to“ gelir.",
    focus: "Amaç bildirmek: to + yalın fiil ve for + isim („for buy“ değil)",
    gloss: [
      { de: "stamp", tr: "pul" },
      { de: "post office", tr: "postane" },
      { de: "save", tr: "biriktirmek" },
      { de: "practice", tr: "pratik yapmak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Neden? — to + yalın fiil",
        tr: "Bir şeyi neden yaptığını söylerken fiilin önüne „to“ gelir: „I went to the shop to buy bread.“ Türkçedeki „almak için“ burada tek bir „to“ ile karşılanır; ayrıca „for“ eklenmez.",
        examples: [
          { de: "I went to the shop to buy bread.", tr: "Ekmek almak için dükkâna gittim." },
          { de: "She called to ask about the time.", tr: "Saati sormak için aradı." },
          { de: "We are saving money to buy a car.", tr: "Araba almak için para biriktiriyoruz." },
        ],
      },
      {
        heading: "for + isim",
        tr: "„for“ amaç bildirirken arkasından İSİM gelir: for bread, for a coffee, for work. Arkasına yalın fiil koymak („for buy“, „for learn“) Türkçe konuşanların en sık hatasıdır.",
        examples: [
          { de: "I went to the shop for some bread.", tr: "Biraz ekmek için dükkâna gittim.", note: "for + isim" },
          { de: "Let's meet for a coffee.", tr: "Bir kahve için buluşalım." },
          { de: "He came here for work.", tr: "Buraya iş için geldi." },
        ],
      },
      {
        heading: "Soru ve kısa cevap",
        tr: "Amacı sormanın en kısa yolu „Why?“ ya da „What for?“dur. Cevap tek başına „to“ ile başlayabilir: „Why are you learning English? — To find a better job.“",
        examples: [
          { de: "Why did you go to the post office? — To buy stamps.", tr: "Postaneye neden gittin? — Pul almak için." },
          { de: "Why are you learning English? — To find a better job.", tr: "Neden İngilizce öğreniyorsun? — Daha iyi bir iş bulmak için." },
          { de: "I watch films in English to practice.", tr: "Pratik yapmak için İngilizce film izliyorum." },
        ],
      },
    ],
    questions: [
      {
        text: "I came to this city ___ English.",
        options: ["for learn", "to learn", "for learning to"],
        answer: 1,
        explain: "Amaç fiille söyleniyor: to + yalın fiil.",
      },
      {
        text: "Let's meet ___ a coffee after work.",
        options: ["for", "to", "for to"],
        answer: 0,
        explain: "Arkada isim var (a coffee): for.",
      },
      {
        text: "Why did you go to the post office? — ___",
        options: ["For buy stamps.", "For to buy stamps.", "To buy stamps."],
        answer: 2,
        explain: "Kısa cevap da to + yalın fiil ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "She called ___ ask about the time.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "Aramanın amacı bir fiil: to ask.",
      },
      {
        kind: "gapfill",
        text: "He came here ___ work. (+ noun)",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "„work“ burada isim: for work.",
      },
      {
        kind: "gapfill",
        text: "We are saving money to ___ (buy) a car.",
        options: [],
        answer: 0,
        accept: ["buy"],
        explain: "„to“ arkasından yalın fiil gelir: to buy.",
      },
      {
        kind: "gapfill",
        text: "I went to the market ___ some tomatoes.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Arkada fiil yok, isim var (some tomatoes): for.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "reads the news", "to practice", "her English"],
        explain: "Amaç eylemden sonra gelir: She reads the news to practice her English.",
      },
      {
        kind: "truefalse",
        text: "„I went to the bank for get some money.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Fiilden önce for gelmez: I went to the bank to get some money.",
      },
      {
        kind: "truefalse",
        text: "„We stopped at a café for lunch.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„lunch“ bir isim; for + isim doğru.",
      },
    ],
  },
];

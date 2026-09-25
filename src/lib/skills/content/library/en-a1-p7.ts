import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 * Yalnız konuşma ve dil bilgisi hücreleri (gerekçe: parti 6 başlığı).
 */
export const enA1P7: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s7",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "car, four, teacher",
    genre: "pronounce",
    intro: "Amerikan İngilizcesinde kelime sonundaki r söylenir: dilin ucu hafifçe geri kıvrılır ve Türkçedeki gibi titremez. Bu alıştırma o r'yi çalışıyor.",
    gloss: [
      { de: "car", tr: "araba" },
      { de: "teacher", tr: "öğretmen" },
      { de: "door", tr: "kapı" },
      { de: "sister", tr: "kız kardeş" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "My car is near the door.",
        tr: "Arabam kapının yanında.",
        hint: "„car“ = KAR, „door“ = DOR. Sondaki r söylenir ama titremez: dilin ucu geri kıvrılır, damağa değmez.",
        confusions: [
          { heard: [], fix: "r'yi atlama ve titretme; dili hafifçe geri kıvırıp sesi orada bitir.", expected: "car" },
        ],
      },
      {
        de: "My sister is a teacher.",
        tr: "Kız kardeşim öğretmen.",
        hint: "Sondaki -er, r ile kaynaşmış kısa bir ı'dır: SİS-tır, TİİÇ-ır. Vurgu ilk hecededir.",
        confusions: [
          { heard: [], fix: "-er sonu vurgusuzdur; kısa ı ile r'yi birlikte söyle, ayrı bir e yok.", expected: "teacher" },
        ],
      },
      {
        de: "There are four chairs here.",
        tr: "Burada dört sandalye var.",
        hint: "„four“ = FOR, „chairs“ = ÇERZ, „here“ = HİİR. Üçünde de r ünlünün hemen ardından duyulur.",
        confusions: [
          { heard: [], fix: "Türkçedeki titrek r buraya girmez; dil geriye kıvrılır, ses yumuşak kalır.", expected: "four" },
        ],
      },
      {
        de: "The car is over there.",
        tr: "Araba şurada.",
        hint: "„car is“ = KA-rız: r bir sonraki ünlüye bağlanır. „there“ = DER, sonda yine r.",
        confusions: [
          { heard: [], fix: "car ile is arasında durma; r'yi ikinci kelimeye bağlayıp tek akışta söyle.", expected: "car is" },
        ],
      },
      {
        de: "Her brother works here.",
        tr: "Onun erkek kardeşi burada çalışıyor.",
        hint: "„her“ = HÖR, „brother“ = BRA-dır, „works“ = WÖRKS. Üçünde de ünlü ile r tek bir ses gibi kaynaşır.",
        confusions: [
          { heard: [], fix: "Üç kelimede de r söylenir; ünlüyü uzatıp r'yi düşürme.", expected: "brother" },
        ],
      },
      {
        de: "Water, please. It's warmer today.",
        tr: "Su lütfen. Bugün daha sıcak.",
        hint: "„water“ = WA-dır: ortadaki t yumuşayıp d'ye yaklaşır, sonda r söylenir. „warmer“ = WOR-mır.",
        confusions: [
          { heard: [], fix: "Karşılaştırma eki -er'in sonunda da r söylenir: WOR-mır.", expected: "warmer" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g7",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "always, usually, never",
    genre: "grammar",
    intro: "Sıklık bildiren sözcüklerin cümledeki yeri sabittir; yanlış yere koymak cümleyi bozar.",
    focus: "Sıklık zarfları ve cümledeki yerleri",
    gloss: [
      { de: "always", tr: "her zaman" },
      { de: "usually", tr: "genellikle" },
      { de: "never", tr: "asla" },
      { de: "breakfast", tr: "kahvaltı" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Fiilden ÖNCE",
        tr: "„always, usually, often, sometimes, never“ gibi sözcükler normal fiilden ÖNCE gelir: „I always walk to work.“ Türkçede bu sözcükler çoğunlukla başa konur; İngilizcede başa koymak yalnız „sometimes“ ve „usually“ için doğaldır.",
        examples: [
          { de: "I always have breakfast at seven.", tr: "Her zaman yedide kahvaltı ederim.", note: "özne + zarf + fiil" },
          { de: "She never drinks coffee.", tr: "Asla kahve içmez.", note: "fiilden önce" },
          { de: "We often go to the movies.", tr: "Sık sık sinemaya gideriz.", note: "aynı yer" },
        ],
      },
      {
        heading: "„be“ fiilinden SONRA",
        tr: "İlk istisna „to be“ fiilidir: orada sıklık zarfı fiilden SONRA gelir. „He is always late“ — „He always is late“ değil. Yardımcı fiil varsa da zarf yardımcı ile asıl fiilin arasına girer: „I have never been to London.“",
        examples: [
          { de: "He is always late.", tr: "Her zaman geç kalır.", note: "be → sonra" },
          { de: "They are usually at home.", tr: "Genellikle evdedirler.", note: "be → sonra" },
          { de: "I have never been to London.", tr: "Londra'ya hiç gitmedim.", note: "yardımcı + zarf + fiil" },
        ],
      },
      {
        heading: "never zaten olumsuzdur",
        tr: "„never“ tek başına olumsuzluk taşır, bu yüzden yanında „don't“ KULLANILMAZ: „I never eat meat“ doğru, „I don't never eat meat“ yanlıştır. Ayrıca sıklığı soran soru „How often …?“ ile kurulur.",
        examples: [
          { de: "I never eat meat.", tr: "Hiç et yemem.", note: "don't gerekmez" },
          { de: "How often do you cook?", tr: "Ne sıklıkla yemek yaparsın?", note: "sıklık sorusu" },
          { de: "Sometimes I work at home.", tr: "Bazen evde çalışırım.", note: "sometimes başa gelebilir" },
        ],
      },
    ],
    questions: [
      {
        text: "I ___ breakfast at seven.",
        options: ["have always", "always", "always have"],
        answer: 2,
        explain: "Normal fiilden önce: özne + zarf + fiil.",
      },
      {
        text: "He ___ late.",
        options: ["always is", "is always", "always"],
        answer: 1,
        explain: "„be“ fiilinden sonra gelir.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I don't never eat meat.",
          "I never eat meat.",
          "I never don't eat meat.",
        ],
        answer: 1,
        explain: "„never“ zaten olumsuzdur; ikinci bir olumsuzluk gelmez.",
      },
      {
        kind: "gapfill",
        text: "She ___ drinks coffee. (never)",
        options: [],
        answer: 0,
        accept: ["never"],
        explain: "Zarf normal fiilden önce durur.",
      },
      {
        kind: "gapfill",
        text: "They ___ usually at home in the evening. (be)",
        options: [],
        answer: 0,
        accept: ["are"],
        explain: "„be“ fiili zarftan ÖNCE gelir: are usually.",
      },
      {
        kind: "gapfill",
        text: "___ often do you cook?",
        options: [],
        answer: 0,
        accept: ["How", "how"],
        explain: "Sıklık „How often …?“ ile sorulur.",
      },
      {
        kind: "gapfill",
        text: "I have ___ been to London. (never)",
        options: [],
        answer: 0,
        accept: ["never"],
        explain: "Yardımcı fiil ile asıl fiilin arasına girer.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We", "often", "go", "to the movies"],
        explain: "Özne + sıklık zarfı + fiil + yer.",
      },
      {
        kind: "truefalse",
        text: "„He always is late.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„be“ fiilinde zarf sonra gelir: „He is always late.“",
      },
      {
        kind: "truefalse",
        text: "„Sometimes I work at home.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„sometimes“ cümlenin başında da durabilir.",
      },
    ],
  },
];

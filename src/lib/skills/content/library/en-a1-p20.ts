import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 20.
 *
 * Hücreleri YİRMİYE tamamlayan son parti; A1'in konuşma ve dil bilgisi
 * hücreleri burada yirmiye ulaşır. Kurallar ve emsal: `en-a1.ts` (parti 1)
 * ve `data/content/SPEC.md`.
 *
 * Bu parti yalnız KONUŞMA ve DİL BİLGİSİ taşır. Parti 20 günlük sohbet
 * hattı: söyleyiş odağı çift yazılan sessizin tek okunması (dinner,
 * coffee); dil bilgisi boş özne „it“: hava, saat, gün ve mesafe.
 *
 * Söyleyiş drilindeki `heard` dizileri bilerek boş: çift sessizin
 * uzatılması tanıyıcının yazısına geçmez (gerekçe `types.ts`
 * `SpeechConfusion`; emsal parti 10'daki ezgi dersi).
 */
export const enA1P20: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s20",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "dinner, coffee, summer",
    genre: "pronounce",
    intro: "İngilizcede çift yazılan sessiz tek bir ses gibi okunur; Türkçedeki „anne, elli“ gibi uzatılmaz ve iki heceye bölünmez.",
    gloss: [
      { de: "dinner", tr: "akşam yemeği" },
      { de: "summer", tr: "yaz" },
      { de: "letter", tr: "mektup" },
      { de: "happy", tr: "mutlu" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Dinner is at seven.",
        tr: "Akşam yemeği yedide.",
        hint: "„dinner“ = Dİ-nı: n bir kez ve kısa söylenir; iki n için duraklama yok.",
        confusions: [
          { heard: [], fix: "Türkçedeki „anne“ gibi uzun bir n söyleme; tek ve kısa bir n yeter.", expected: "dinner" },
        ],
      },
      {
        de: "A cup of coffee, please.",
        tr: "Bir fincan kahve lütfen.",
        hint: "„coffee“ = KO-fi: f tek ve kısa; hece sınırında durma.",
        confusions: [
          { heard: [], fix: "Çift f'yi uzatma; iki hece arasında beklemeden geç.", expected: "coffee" },
        ],
      },
      {
        de: "We swim a lot in summer.",
        tr: "Yazın çok yüzeriz.",
        hint: "„summer“ = SA-mı: m bir kez söylenir; „swim“ da tek m ile biter.",
        confusions: [
          { heard: [], fix: "m'yi uzatırsan kelime iki parçaya bölünmüş gibi duyulur; kısa tut.", expected: "summer" },
        ],
      },
      {
        de: "My sister has a letter for you.",
        tr: "Kız kardeşimin sana bir mektubu var.",
        hint: "„letter“ = LE-tı: t bir kez ve kısa; „sister“ ile aynı ritim.",
        confusions: [
          { heard: [], fix: "Türkçedeki „itti“ gibi çift t söyleme; dil dişe bir kez değer.", expected: "letter" },
        ],
      },
      {
        de: "The apple is very small.",
        tr: "Elma çok küçük.",
        hint: "„apple“ = E-pıl: yazılışta iki p, seste tek p; „small“ da tek bir l ile biter.",
        confusions: [
          { heard: [], fix: "pp yazılır ama tek p okunur; dudakları bir kez aç.", expected: "apple" },
        ],
      },
      {
        de: "Hello, I'm happy to see you.",
        tr: "Merhaba, seni gördüğüme sevindim.",
        hint: "„hello“ içindeki ll ve „happy“ içindeki pp birer sestir; kelimeler kısa ve akıcı çıkar.",
        confusions: [
          { heard: [], fix: "Çift harfi uzatmak cümleyi keser; iki kelimeyi de tek sessizle, akıcı söyle.", expected: "happy" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g20",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "It's cold, it's late",
    genre: "grammar",
    intro: "Türkçede „Soğuk.“ ya da „Saat beş.“ demek yeter; İngilizcede her cümlenin bir öznesi olmalı ve bu boşluğu „it“ doldurur.",
    focus: "Boş özne it: hava, saat, gün ve mesafe (Türkçedeki öznesiz cümleler)",
    gloss: [
      { de: "cold", tr: "soğuk" },
      { de: "rain", tr: "yağmur yağmak" },
      { de: "far", tr: "uzak" },
      { de: "birthday", tr: "doğum günü" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Hava",
        tr: "Havadan söz ederken özne her zaman „it“tir: It's cold. It's raining. Türkçedeki „Soğuk.“ ve „Yağmur yağıyor.“ cümlelerinde ayrı bir özne yoktur; İngilizcede „Is cold.“ ya da yalnız „Raining.“ demek yanlıştır.",
        examples: [
          { de: "It's very cold today.", tr: "Bugün çok soğuk." },
          { de: "It's raining again.", tr: "Yine yağmur yağıyor." },
          { de: "Is it sunny in Antalya?", tr: "Antalya'da hava güneşli mi?", note: "soruda it yine özne" },
        ],
      },
      {
        heading: "Saat, gün ve tarih",
        tr: "Saat, gün ve tarih de „it“ ile söylenir: It's five o'clock. It's Monday. Soruda da „it“ öznedir: What time is it? What day is it today?",
        examples: [
          { de: "It's half past five.", tr: "Saat beş buçuk." },
          { de: "What day is it today? — It's Friday.", tr: "Bugün günlerden ne? — Cuma." },
          { de: "It's my birthday tomorrow.", tr: "Yarın doğum günüm." },
        ],
      },
      {
        heading: "Mesafe ve yol süresi",
        tr: "Uzaklık ve yol süresi de „it“ ile söylenir: It's far. It's ten minutes to the station. Soruda da özne „it“tir: How far is it? Türkçedeki „Uzak mı?“ sorusunda özne yoktur.",
        examples: [
          { de: "Is it far? — No, it's near.", tr: "Uzak mı? — Hayır, yakın." },
          { de: "It's ten minutes to the station.", tr: "İstasyona on dakika." },
          { de: "How far is it to the park? — It's two kilometers.", tr: "Parka ne kadar uzak? — İki kilometre.", note: "soruda da it" },
        ],
      },
    ],
    questions: [
      {
        text: "___ very cold today.",
        options: ["Is", "It's", "There is"],
        answer: 1,
        explain: "Havadan söz ederken özne it'tir: It's very cold.",
      },
      {
        text: "What time ___?",
        options: ["is it", "it is", "is"],
        answer: 0,
        explain: "Saat sorusunda da özne it'tir ve soruda is başa geçer: What time is it?",
      },
      {
        text: "___ ten minutes to the station.",
        options: ["Is", "There are", "It's"],
        answer: 2,
        explain: "Yol süresi it ile söylenir: It's ten minutes to the station.",
      },
      {
        kind: "gapfill",
        text: "___ raining again.",
        options: [],
        answer: 0,
        accept: ["It's", "It is", "it's", "it is"],
        explain: "Yağmurun öznesi de it'tir: It's raining.",
      },
      {
        kind: "gapfill",
        text: "What day is ___ today?",
        options: [],
        answer: 0,
        accept: ["it"],
        explain: "Gün sorusunun öznesi it'tir: What day is it today?",
      },
      {
        kind: "gapfill",
        text: "„Is it far?“ — „No, ___ near.“",
        options: [],
        answer: 0,
        accept: ["it's", "it is"],
        explain: "Mesafe cevabında da özne it'tir: No, it's near.",
      },
      {
        kind: "gapfill",
        text: "Is ___ sunny in Antalya?",
        options: [],
        answer: 0,
        accept: ["it"],
        explain: "Hava sorusunda is başa geçer, it hemen arkasından gelir.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["What", "time", "is", "it"],
        explain: "Soru sözcüğü + is + it: What time is it?",
      },
      {
        kind: "truefalse",
        text: "„Is cold today.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Özne eksik; hava için it gerekir: „It's cold today.“",
      },
      {
        kind: "truefalse",
        text: "„It's Friday today.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Gün de it ile söylenir; cümle doğru.",
      },
    ],
  },
];

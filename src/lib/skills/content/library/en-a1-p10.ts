import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 10.
 *
 * İngilizce kursun A1 konuşma ve dil bilgisi hücrelerini ONA tamamlayan son
 * parti. Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 */
export const enA1P10: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s10",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "up or down at the end?",
    genre: "pronounce",
    intro: "Aynı sözcükler, iki ayrı ezgi: sesin sonda yükselmesi ya da inmesi cümlenin türünü söyler.",
    gloss: [
      { de: "ready", tr: "hazır" },
      { de: "coffee", tr: "kahve" },
      { de: "to sit down", tr: "oturmak" },
      { de: "address", tr: "adres" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "You're ready.",
        tr: "Hazırsın.",
        hint: "Düz cümlede ses son hecede İNER. Tonu aşağı bırak.",
        confusions: [
          { heard: [], fix: "Sonda yükseltirsen aynı sözcükler soruya dönüşür.", expected: "ready" },
        ],
      },
      {
        de: "You're ready?",
        tr: "Hazır mısın?",
        hint: "Soru sözcüğü yok, fiil de başa geçmedi: türü yalnız ezgi söylüyor. Sonda tonu YÜKSELT.",
        confusions: [
          { heard: [], fix: "Bu biçimde soru işaretini yalnız ses taşır.", expected: "ready" },
        ],
      },
      {
        de: "Would you like some coffee?",
        tr: "Kahve ister misin?",
        hint: "Evet-hayır sorusunda ton sonda yükselir: KO-fi↗.",
        confusions: [
          { heard: [], fix: "Ton düz kalırsa teklif emir gibi duyulur.", expected: "coffee" },
        ],
      },
      {
        de: "Where do you live?",
        tr: "Nerede oturuyorsun?",
        hint: "Soru sözcüğü varsa ton sonda İNER, çünkü türü zaten „where“ söylemiştir.",
        confusions: [
          { heard: [], fix: "W- sorularında ezgi düz cümledeki gibi iner; yükseltmek tereddüt duyulur.", expected: "live" },
        ],
      },
      {
        de: "Please sit down and wait.",
        tr: "Lütfen otur ve bekle.",
        hint: "Ricada ton inmelidir ama sert değil; „please“ ile başlayıp sakin bitir.",
        confusions: [
          { heard: [], fix: "Yükselen ton ricayı belirsiz ve sabırsız gösterir.", expected: "wait" },
        ],
      },
      {
        de: "Your address is Green Street, right?",
        tr: "Adresin Green Street, değil mi?",
        hint: "Ek soruda („right?“, „isn't it?“) ton yükselirse gerçekten soruyorsun, inerse onay bekliyorsun.",
        confusions: [
          { heard: [], fix: "Ek soruyu aynı tonla söyleme; sonda küçük bir yükselme gerekir.", expected: "right" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g10",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "I like swimming, I'd like a coffee",
    genre: "grammar",
    intro: "„like“ iki ayrı şey söyler: genel bir sevgi ve şu andaki bir istek. Biçimleri de farklıdır.",
    focus: "like / love / hate + -ing ve would like",
    gloss: [
      { de: "to swim", tr: "yüzmek" },
      { de: "to cook", tr: "yemek pişirmek" },
      { de: "tea", tr: "çay" },
      { de: "early", tr: "erken" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "like + -ing: genel sevgi",
        tr: "„like, love, hate, enjoy, don't mind“ fiillerinden sonra ikinci fiil çoğunlukla -ing alır: „I like swimming.“ „like, love, hate“ ile „to + fiil“ de doğrudur ve Amerikan İngilizcesinde çok yaygındır (I like to swim); „enjoy“ ve „don't mind“ ise yalnız -ing alır. Bu yapı genel bir tercihi anlatır — her zaman geçerli olan bir şeyi. Türkçedeki „-mayı severim“ yapısının karşılığıdır.",
        examples: [
          { de: "I like swimming in the sea.", tr: "Denizde yüzmeyi severim.", note: "like + -ing" },
          { de: "She loves cooking for friends.", tr: "Arkadaşlarına yemek yapmayı çok sever.", note: "love + -ing" },
          { de: "They hate getting up early.", tr: "Erken kalkmaktan nefret ederler.", note: "hate + -ing" },
        ],
      },
      {
        heading: "would like: şu andaki istek",
        tr: "„would like“ genel bir sevgiyi değil, ŞU ANDAKİ bir isteği anlatır; kibar bir istek ya da teklif bildirir: „I'd like a coffee.“ Arkasından isim ya da „to + fiil“ gelir, ASLA -ing gelmez. Kısaltması I'd, he'd, we'd biçimindedir.",
        examples: [
          { de: "I'd like a cup of tea, please.", tr: "Bir bardak çay istiyorum lütfen.", note: "would like + isim" },
          { de: "Would you like to sit down?", tr: "Oturmak ister misiniz?", note: "would like + to + fiil" },
          { de: "We'd like to book a table.", tr: "Masa ayırtmak istiyoruz.", note: "to + fiil" },
        ],
      },
      {
        heading: "İkisini karıştırmamak",
        tr: "„Do you like coffee?“ genel bir soru — kahveyi sever misin. „Would you like a coffee?“ ise bir teklif — şimdi ister misin. İlkine „Yes, I do“, ikincisine „Yes, please“ diye cevap verilir. Cevabı da biçim belirler.",
        examples: [
          { de: "Do you like tea? — Yes, I do.", tr: "Çayı sever misin? — Evet.", note: "genel" },
          { de: "Would you like tea? — Yes, please.", tr: "Çay ister misin? — Evet, lütfen.", note: "teklif" },
          { de: "I don't like swimming, but I'd like to learn.", tr: "Yüzmeyi sevmem ama öğrenmek isterim.", note: "iki yapı yan yana" },
        ],
      },
    ],
    questions: [
      {
        text: "I like ___ in the sea.",
        options: ["swim", "to swimming", "swimming"],
        answer: 2,
        explain: "„like“ fiilinden sonra -ing gelir (ya da to + yalın fiil: to swim); yalın „swim“ ve „to swimming“ olmaz.",
      },
      {
        text: "I'd like ___ a table, please.",
        options: ["booking", "to book", "book"],
        answer: 1,
        explain: "„would like“ arkasından „to + fiil“ gelir, -ing gelmez.",
      },
      {
        text: "„Would you like a coffee?“ — What is the best answer?",
        options: ["Yes, I do.", "Yes, please.", "Yes, I like."],
        answer: 1,
        explain: "Bu bir tekliftir; teklife „Yes, please“ denir.",
      },
      {
        kind: "gapfill",
        text: "She loves ___ for friends. (cook)",
        options: [],
        answer: 0,
        accept: ["cooking", "to cook"],
        explain: "„love“ fiilinden sonra -ing biçimi gelir (to cook da doğrudur).",
      },
      {
        kind: "gapfill",
        text: "They hate ___ up early. (get)",
        options: [],
        answer: 0,
        accept: ["getting", "to get"],
        explain: "Kısa ünlüden sonra son ünsüz ikizleşir: getting (to get da doğrudur).",
      },
      {
        kind: "gapfill",
        text: "___ you like to sit down? (polite offer)",
        options: [],
        answer: 0,
        accept: ["Would", "would"],
        explain: "Teklif „Would you like …?“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "I ___ like a cup of tea, please. (kısaltmanın açık biçimi)",
        options: [],
        answer: 0,
        accept: ["would"],
        explain: "„I'd“ açılımı „I would“dur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We'd", "like", "to book", "a table"],
        explain: "would like + to + fiil + nesne.",
      },
      {
        kind: "truefalse",
        text: "„I'd like swimming now.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„would like“ -ing almaz: „I'd like to swim now.“",
      },
      {
        kind: "truefalse",
        text: "„I don't like swimming, but I'd like to learn.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "İlk yapı genel sevgi (-ing), ikincisi istek (to + fiil).",
      },
    ],
  },
];

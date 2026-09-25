import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ taşır. Parti 16 arkadaşlar ve
 * boş zaman hattı: kamp için bir arkadaştan çadır ödünç isteme mesajı.
 * Söyleyiş odağı kayan /eɪ/ sesi (late/let); dil bilgisi and, but, or,
 * because ve so.
 */
export const enA1P16: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w16",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "Can I Borrow Your Tent?",
    genre: "message",
    intro: "Arkadaşlarınla kampa gidiyorsun ama çadırın yok; önce iki cümle kur, sonra bir arkadaşından çadırını ödünç isteyen kısa bir mesaj yaz.",
    gloss: [
      { de: "borrow", tr: "ödünç almak" },
      { de: "tent", tr: "çadır" },
      { de: "give back", tr: "geri vermek" },
      { de: "pick up", tr: "gidip almak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Gelecek hafta sonu göle gidiyoruz.",
        answer: "We are going to the lake next weekend.",
        alternatives: ["Next weekend we are going to the lake."],
        hint: "Kararlaştırılmış bir plan için be + -ing kullanılır: we are going. Zaman ifadesi başa da alınabilir.",
      },
      {
        kind: "build",
        tr: "Çadırı pazartesi sana geri verebilirim.",
        answer: "I can give the tent back to you on Monday.",
        alternatives: ["On Monday I can give the tent back to you."],
        hint: "„give back“ iki parçalı bir fiildir ve nesne araya girer: give the tent back. Kime verildiği „to you“ ile söylenir.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşlarınla kampa gidiyorsun ama çadırın yok. Bir arkadaşına mesaj yaz: nereye, ne zaman ve kiminle gittiğini söyle, çadırını ödünç iste, onu ne zaman alıp ne zaman geri vereceğini yaz ve ona küçük bir şey teklif et.",
        checklist: [
          "Planını yaz: nereye, ne zaman, kiminle",
          "Çadırı kibarca ödünç iste",
          "Alma ve geri verme gününü söyle",
          "Teşekkür et ve küçük bir şey teklif et",
        ],
        minWords: 30,
        phrases: [
          { de: "Can I borrow your …?", tr: "…'ını ödünç alabilir miyim?" },
          { de: "We are going to … on …", tr: "… günü …'e gidiyoruz." },
          { de: "I can pick it up on …", tr: "… günü gelip alabilirim." },
          { de: "I can give it back on …", tr: "… günü geri verebilirim." },
          { de: "Can I bring you …?", tr: "Sana … getireyim mi?" },
        ],
        sample:
          "Hi Arda, how are you? We are going to the lake next weekend with Sinan and Tom. We want to sleep there on " +
          "Saturday night, but I haven't got a tent. Can I borrow your tent, please? I can pick it up on Friday evening " +
          "after work, and I can give the tent back to you on Monday. Can I bring you some fish from the lake? Thanks a lot! Umut",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s16",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "late or let?",
    genre: "pronounce",
    intro: "İngilizcede „a“ harfi çoğu zaman e'den i'ye kayan iki parçalı bir ses verir: name = NEYM. Düz bir e söylenirse kelime değişir.",
    gloss: [
      { de: "late", tr: "geç" },
      { de: "to wait", tr: "beklemek" },
      { de: "paper", tr: "kâğıt" },
      { de: "to taste", tr: "tadına bakmak" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Sorry, I'm late.",
        tr: "Kusura bakma, geç kaldım.",
        hint: "„late“ = LEYT: e ile başla ve i'ye doğru kay.",
        confusions: [
          { heard: ["let"], fix: "Kayma olmazsa „let“ (izin vermek) duyulur; sesi e'den i'ye taşı.", expected: "late" },
        ],
      },
      {
        de: "Wait here, please.",
        tr: "Burada bekle lütfen.",
        hint: "„wait“ = WEYT; „wet“ (ıslak) kısa ve düz bir e taşır.",
        confusions: [
          { heard: ["wet"], fix: "Düz e ile „wet“ olur; ünlüyü uzatıp i'ye kaydır.", expected: "wait" },
        ],
      },
      {
        de: "The paper is on the table.",
        tr: "Kâğıt masanın üstünde.",
        hint: "„paper“ = PEY-pı, „table“ = TEY-bıl; iki kelimenin ilk hecesinde aynı kayan ses.",
        confusions: [
          { heard: ["pepper"], fix: "İlk hece düz e olursa „pepper“ (biber) duyulur.", expected: "paper" },
        ],
      },
      {
        de: "There's a big sale today.",
        tr: "Bugün büyük bir indirim var.",
        hint: "„sale“ = SEYL; „sell“ (satmak) kısa bir e ile söylenir.",
        confusions: [
          { heard: ["sell"], fix: "Kısa e ile „sell“ duyulur; indirim için sesi kaydır.", expected: "sale" },
        ],
      },
      {
        de: "Can I taste the cake?",
        tr: "Kekin tadına bakabilir miyim?",
        hint: "„taste“ ve „cake“: iki kez aynı kayan ses, TEYST, KEYK.",
        confusions: [
          { heard: ["test"], fix: "Düz e ile „test“ olur; tadına bakmak için e'den i'ye kay.", expected: "taste" },
        ],
      },
      {
        de: "Meet me at the gate at eight.",
        tr: "Sekizde kapıda buluşalım.",
        hint: "„gate“ ve „eight“ aynı sesle biter: GEYT, EYT.",
        confusions: [
          { heard: ["get"], fix: "Kısa e ile „get“ duyulur; kapı anlamındaki „gate“ iki parçalı.", expected: "gate" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g16",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "and, but, because, so",
    genre: "grammar",
    intro: "Kısa cümleleri beş küçük kelime birleştirir: and, but, or, because ve so. En çok son ikisi karıştırılır: biri nedeni, öteki sonucu söyler.",
    focus: "Bağlaçlar: and, but, or, because ve so (neden mi, sonuç mu; because of / due to B2'de)",
    gloss: [
      { de: "ill", tr: "hasta" },
      { de: "tired", tr: "yorgun" },
      { de: "cheap", tr: "ucuz" },
      { de: "closed", tr: "kapalı" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "and, but, or",
        tr: "„and“ ekler (ve), „but“ karşıtlık kurar (ama), „or“ seçenek sunar (ya da). Soru sorarken „or“ iki seçeneği yan yana koyar ve cevap da bunlardan biri olur.",
        examples: [
          { de: "I have a cat and a dog.", tr: "Bir kedim ve bir köpeğim var." },
          { de: "The flat is small but cheap.", tr: "Daire küçük ama ucuz.", note: "karşıtlık" },
          { de: "Do you want tea or coffee?", tr: "Çay mı istersin, kahve mi?", note: "seçenek" },
        ],
      },
      {
        heading: "because: neden",
        tr: "„because“ nedeni söyler ve arkasından tam bir cümle gelir: because I am ill. Türkçede neden cümlenin önünde durur (hasta olduğum için evdeyim); İngilizcede ana cümle önce, „because“ ile neden sonra gelir.",
        examples: [
          { de: "I'm at home because I'm ill.", tr: "Hasta olduğum için evdeyim." },
          { de: "She's happy because it's her birthday.", tr: "Doğum günü olduğu için mutlu." },
          { de: "Why are you tired? — Because I work a lot.", tr: "Neden yorgunsun? — Çünkü çok çalışıyorum.", note: "why sorusunun cevabı" },
        ],
      },
      {
        heading: "so: sonuç",
        tr: "„so“ sonucu söyler: önce neden, sonra so ile sonuç. Aynı olay iki yoldan anlatılabilir: I'm ill, so I stay at home = I stay at home because I'm ill. „so“dan önce çoğunlukla virgül konur.",
        examples: [
          { de: "I'm ill, so I stay at home.", tr: "Hastayım, bu yüzden evde kalıyorum." },
          { de: "It's raining, so we take the bus.", tr: "Yağmur yağıyor, bu yüzden otobüse biniyoruz." },
          { de: "The shop is closed, so we go home.", tr: "Dükkân kapalı, o yüzden eve gidiyoruz." },
        ],
      },
    ],
    questions: [
      {
        text: "The flat is small ___ cheap.",
        options: ["because", "but", "or"],
        answer: 1,
        explain: "„küçük“ bir eksi, „ucuz“ bir artı; karşıtlık but ile kurulur.",
      },
      {
        text: "It's raining, ___ we take the bus.",
        options: ["because", "or", "so"],
        answer: 2,
        explain: "Önce neden (yağmur), sonra sonuç (otobüs) geliyor; sonuç so ile bağlanır.",
      },
      {
        text: "I'm at home ___ I'm ill.",
        options: ["because", "so", "but"],
        answer: 0,
        explain: "İkinci cümle evde olmanın nedenini söylüyor; neden because ile gelir.",
      },
      {
        kind: "gapfill",
        text: "Do you want tea ___ coffee?",
        options: [],
        answer: 0,
        accept: ["or"],
        explain: "İki seçenek sunuluyor; seçenek or ile bağlanır.",
      },
      {
        kind: "gapfill",
        text: "I have a cat ___ a dog.",
        options: [],
        answer: 0,
        accept: ["and"],
        explain: "İki şey toplanıyor, and ile bağlanır.",
      },
      {
        kind: "gapfill",
        text: "„Why are you tired?“ — „___ I work a lot.“",
        options: [],
        answer: 0,
        accept: ["Because", "because"],
        explain: "why sorusunun cevabı nedeni söyler ve because ile başlar.",
      },
      {
        kind: "gapfill",
        text: "The shop is closed, ___ we go home.",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "Dükkânın kapalı olması neden, eve gitmek sonuç; sonuç so ile gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She's happy", "because", "it's", "her birthday"],
        explain: "Önce ana cümle, sonra because ile neden: She's happy because it's her birthday.",
      },
      {
        kind: "truefalse",
        text: "„I'm ill, because I stay at home.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Evde kalmak sonuç, bu yüzden so gerekir: „I'm ill, so I stay at home.“",
      },
      {
        kind: "truefalse",
        text: "„I stay at home because I'm ill.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Hastalık evde kalmanın nedeni; neden because ile doğru bağlanmış.",
      },
    ],
  },
];

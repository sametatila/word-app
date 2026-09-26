import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ hücrelerini taşır. Kurallar ve
 * emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 16 eski günler ve nezaket hattı: yıllar önce yardım etmiş bir
 * öğretmene yazılan teşekkür mektubu. Söyleyiş odağı cümle ritmi: vurgulu
 * kelimeler vuruşu taşır (DOGS EAT MEAT); dil bilgisi kibar rica ve izin
 * (Could I …?, Could you …?, Would you mind + -ing?).
 */
export const enA2P16: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w16",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "A Letter to My Old Teacher",
    genre: "letter",
    intro: "Yıllar önce sana çok yardım etmiş bir öğretmene yazacaksın; önce iki cümle kur, sonra teşekkür mektubunu yaz.",
    gloss: [
      { de: "afraid", tr: "korkmuş" },
      { de: "whole", tr: "bütün" },
      { de: "thanks to", tr: "sayesinde" },
      { de: "these days", tr: "bugünlerde" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Okula başladığımda tek kelime İngilizce konuşamıyordum.",
        answer: "When I started school, I couldn't speak a word of English.",
        alternatives: ["I couldn't speak a word of English when I started school."],
        hint: "„can“ın geçmişi „could“dur, olumsuzu „couldn't“; arkasından yalın fiil gelir.",
      },
      {
        kind: "build",
        tr: "Sonunda sınavı geçmeyi başardım.",
        answer: "In the end I was able to pass the exam.",
        alternatives: ["I was able to pass the exam in the end."],
        hint: "Tek seferlik bir başarıyı anlatırken olumlu cümlede „could“ yerine „was able to“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Yıllar önce sana çok yardım etmiş bir öğretmene mektup yaz: kim olduğunu hatırlat, o zaman neyi yapamadığını ve onun sana nasıl yardım ettiğini anlat, şimdi ne yaptığını söyle ve teşekkür et.",
        checklist: [
          "Kim olduğunu ve hangi yıl sınıfında olduğunu hatırlat",
          "O zaman neyi yapamadığını „couldn't“ ile yaz",
          "Öğretmenin ne yaptığını ve sonucunu anlat",
          "Şimdi ne yaptığını söyle ve teşekkür et",
        ],
        minWords: 40,
        phrases: [
          { de: "You may not remember me, but …", tr: "Beni hatırlamayabilirsiniz ama …" },
          { de: "At that time I couldn't …", tr: "O zamanlar … yapamıyordum" },
          { de: "Thanks to you, I was able to …", tr: "Sizin sayenizde … yapabildim" },
          { de: "These days I …", tr: "Bugünlerde …" },
          { de: "I just wanted to say thank you.", tr: "Yalnızca teşekkür etmek istedim." },
        ],
        sample:
          "Dear Mrs. Ward, you may not remember me, but I was in your class in 2012. I was the quiet boy who sat next to " +
          "the window. At that time I couldn't read well, and I was afraid of every test. You stayed after school with " +
          "me twice a week and gave me easy books about animals. Thanks to you, I was able to read a whole book in one " +
          "month, and I never stopped after that. These days I work in a library in Izmir, and I read stories to " +
          "children every Saturday. I often think of you when I do it. I just wanted to say thank you. Best wishes, Kaan Demir",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s16",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "DOGS EAT MEAT",
    genre: "pronounce",
    intro: "İngilizcede cümlenin ritmini vurgulu kelimeler belirler: isim, fiil, sıfat güçlüdür; the, a, to, and gibi küçük kelimeler aralara sıkışır. Kelime eklenince süre pek uzamaz.",
    gloss: [
      { de: "meat", tr: "et" },
      { de: "shop", tr: "dükkân" },
      { de: "walk", tr: "yürüyüş" },
      { de: "nice", tr: "güzel" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Dogs eat meat.",
        tr: "Köpekler et yer.",
        hint: "Üç güçlü vuruş, eşit aralıklı: DOGS – EAT – MEAT.",
        confusions: [
          { heard: [], fix: "Üç kelimeyi aynı ritimle, bir saat tıkırtısı gibi söyle.", expected: "Dogs eat meat" },
        ],
      },
      {
        de: "The dogs will eat the meat.",
        tr: "Köpekler eti yiyecek.",
        hint: "Yine üç vuruş: dı-DOGZ-wıl-İİT-dı-MİİT. the ve will aralara sıkışır; süre ilk cümleye yakın kalsın.",
        confusions: [
          { heard: [], fix: "Eklenen küçük kelimeleri vurgulama; ritmi büyük kelimeler taşır.", expected: "The dogs will eat the meat" },
        ],
      },
      {
        de: "I want to go to the shop.",
        tr: "Dükkâna gitmek istiyorum.",
        hint: "WANT, GO, SHOP güçlü; to ve the kısa: ay-WAN-tı-GOU-tı-dı-ŞOP.",
        confusions: [
          { heard: [], fix: "„to“ ve „the“yi „tuu“, „dii“ diye uzatırsan ritim bozulur.", expected: "want to go to the shop" },
        ],
      },
      {
        de: "Tom and Mia are coming at ten.",
        tr: "Tom ve Mia onda geliyor.",
        hint: "TOM, MI-a, COM-ing, TEN güçlü; „and“ = ın, „are“ = ır, „at“ = ıt.",
        confusions: [
          { heard: [], fix: "Bağlaç ve yardımcı fiil zayıf kalır; dört güçlü vuruşu duyur.", expected: "Tom and Mia" },
        ],
      },
      {
        de: "It's a nice day for a walk.",
        tr: "Yürüyüş için güzel bir gün.",
        hint: "NICE, DAY, WALK güçlü; „for a“ = fı-rı, hızlı ve alçak.",
        confusions: [
          { heard: [], fix: "„for“ ile „a“ birleşip tek zayıf hece olur.", expected: "for a walk" },
        ],
      },
      {
        de: "She bought a new bag in town.",
        tr: "Şehirde yeni bir çanta aldı.",
        hint: "BOUGHT, NEW, BAG, TOWN güçlü; „a“ ve „in“ aralara düşer.",
        confusions: [
          { heard: [], fix: "Sıfat ve isim ikisi de güçlü: NEW BAG; „a“ neredeyse duyulmaz.", expected: "a new bag" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g16",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "Could I …? Would you mind …?",
    genre: "grammar",
    intro: "Aynı isteği „ver“ diye de „verebilir misiniz“ diye de söyleyebilirsin; İngilizcede kibarlığın derecesini seçtiğin kalıp belirler.",
    focus: "Kibar rica ve izin: Can / Could / May I …?, Could you …?, Would you mind + -ing?",
    gloss: [
      { de: "borrow", tr: "ödünç almak" },
      { de: "salt", tr: "tuz" },
      { de: "mind", tr: "sakıncası olmak" },
      { de: "pass", tr: "uzatmak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İzin istemek: Can I / Could I / May I",
        tr: "Kendin bir şey yapmak için izin isterken „I“ ile sorarsın. „Can I“ günlük, „Could I“ daha kibar, „May I“ en resmî olanıdır. Üçünde de arkasından yalın fiil gelir.",
        examples: [
          { de: "Can I sit here?", tr: "Buraya oturabilir miyim?", note: "günlük" },
          { de: "Could I use your phone?", tr: "Telefonunuzu kullanabilir miyim?", note: "kibar" },
          { de: "May I come in?", tr: "İçeri girebilir miyim?", note: "resmî" },
        ],
      },
      {
        heading: "Rica etmek: Can you / Could you / Would you",
        tr: "Karşındakinden bir şey yapmasını isterken „you“ ile sorarsın. „Could you“ ve „Would you“ „Can you“dan daha naziktir; sonuna „please“ eklemek kibarlığı artırır. Fiil yine yalın kalır, „to“ almaz.",
        examples: [
          { de: "Can you pass the salt?", tr: "Tuzu uzatır mısın?" },
          { de: "Could you speak more slowly, please?", tr: "Biraz daha yavaş konuşabilir misiniz lütfen?" },
          { de: "Would you close the door, please?", tr: "Kapıyı kapatır mısınız lütfen?" },
        ],
      },
      {
        heading: "Would you mind + -ing ve cevaplar",
        tr: "„Would you mind …?“ en nazik rica kalıplarındandır ve arkasından fiil -ing alır. Anlamı „sakıncası var mı?“ olduğu için olumlu cevap „No, not at all.“ (hayır, sakıncası yok) olur; „Yes“ demek reddetmektir.",
        examples: [
          { de: "Would you mind closing the window?", tr: "Pencereyi kapatır mısınız?", note: "mind + -ing" },
          { de: "Would you mind waiting a minute? — No, not at all.", tr: "Bir dakika bekler misiniz? — Tabii, sorun değil." },
          { de: "Could I borrow your pen? — Sure, here you are.", tr: "Kaleminizi ödünç alabilir miyim? — Tabii, buyurun." },
        ],
      },
    ],
    questions: [
      {
        text: "___ you help me with this bag, please?",
        options: ["May", "Could", "Shall"],
        answer: 1,
        explain: "Karşındakinden rica ediyorsun: Could you …?",
      },
      {
        text: "Would you mind ___ the window?",
        options: ["opening", "to open", "open"],
        answer: 0,
        explain: "„Would you mind“ arkasından fiil -ing alır.",
      },
      {
        text: "„Would you mind waiting?“ — Which answer means „Sorun değil, beklerim“?",
        options: ["Yes, I would.", "Yes, please.", "No, not at all."],
        answer: 2,
        explain: "Soru „sakıncası var mı?“ diyor; sakıncası olmadığını „No, not at all“ söyler.",
      },
      {
        kind: "gapfill",
        text: "Could I ___ your pen for a minute? (take it and give it back)",
        options: [],
        answer: 0,
        accept: ["borrow"],
        explain: "Geri vermek üzere almak: borrow. İzin istediği için „Could I“.",
      },
      {
        kind: "gapfill",
        text: "___ I come in? (the most formal way)",
        options: [],
        answer: 0,
        accept: ["May", "may"],
        explain: "İzin istemenin en resmî biçimi „May I“dır.",
      },
      {
        kind: "gapfill",
        text: "Would you mind ___ (wait) a minute?",
        options: [],
        answer: 0,
        accept: ["waiting"],
        explain: "mind + -ing: waiting.",
      },
      {
        kind: "gapfill",
        text: "Could you ___ (pass) the salt, please?",
        options: [],
        answer: 0,
        accept: ["pass"],
        explain: "„Could you“ arkasından yalın fiil gelir: pass.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Could", "you", "close", "the door,", "please?"],
        explain: "Rica: Could you + yalın fiil + nesne + please.",
      },
      {
        kind: "truefalse",
        text: "„Could you to help me?“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„Could you“ arkasından „to“ gelmez: Could you help me?",
      },
      {
        kind: "truefalse",
        text: "„May I sit here?“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Resmî izin: May I + yalın fiil; cümle doğru.",
      },
    ],
  },
];

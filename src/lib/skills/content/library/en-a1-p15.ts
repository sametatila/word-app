import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ taşır. Parti 15 iş hattı: iş
 * arkadaşına vardiya değiştirme mesajı. Söyleyiş odağı kayan /əʊ/ sesi
 * (note/not); dil bilgisi sıfatlar: a/an + sıfat + isim sırası, çoğul
 * almaması ve iki sıfatın sırası (karşılaştırma ve -ly zarfları A2'de,
 * one / ones C1'de).
 */
export const enA1P15: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w15",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "Can We Change Days?",
    genre: "message",
    intro: "Cumartesi vardiyana gidemiyorsun; önce iki cümle kur, sonra iş arkadaşına günleri değiştirmeyi soran kısa bir mesaj yaz.",
    gloss: [
      { de: "shift", tr: "vardiya" },
      { de: "wedding", tr: "düğün" },
      { de: "change", tr: "değiştirmek" },
      { de: "boss", tr: "patron" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi günü çalışamıyorum.",
        answer: "I can't work on Saturday.",
        alternatives: ["On Saturday I can't work."],
        hint: "can't + yalın fiil: can't work. Gün adından önce „on“ gelir ve bu ifade başa da alınabilir.",
      },
      {
        kind: "build",
        tr: "Pazartesi senin yerine çalışabilirim.",
        answer: "I can work for you on Monday.",
        alternatives: ["On Monday I can work for you."],
        hint: "„senin yerine“ burada „for you“ ile söylenir ve fiilin hemen arkasına gelir.",
      },
      {
        kind: "free",
        prompt:
          "Cumartesi vardiyan var ama o gün önemli bir işin çıktı. İş arkadaşına mesaj yaz: neden çalışamadığını söyle, günleri değiştirmeyi öner, hangi gün onun yerine çalışabileceğini yaz ve ne zamana kadar cevap istediğini belirt.",
        checklist: [
          "Cumartesi çalışamadığını ve nedenini yaz",
          "Günleri değiştirmeyi kibarca sor",
          "Onun yerine hangi gün ve saatte çalışabileceğini söyle",
          "Ne zamana kadar cevap beklediğini yaz ve teşekkür et",
        ],
        minWords: 30,
        phrases: [
          { de: "I have a problem with my shift on …", tr: "… günkü vardiyamla ilgili bir sorunum var." },
          { de: "Can we change days?", tr: "Günleri değiştirebilir miyiz?" },
          { de: "I can work for you on …", tr: "… günü senin yerine çalışabilirim." },
          { de: "Please tell me by …", tr: "Lütfen …'e kadar haber ver." },
          { de: "Thanks a lot!", tr: "Çok teşekkürler!" },
        ],
        sample:
          "Hi Onur, I have a problem with my shift on Saturday. My brother's wedding is on Saturday afternoon, so I can't " +
          "work that day. Can we change days? I can work for you on Monday from eight to four. Please tell me by Thursday, " +
          "because I must talk to our boss. Thanks a lot! Kerem",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s15",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "note or not?",
    genre: "pronounce",
    intro: "İngilizcede „o“ çoğu zaman düz bir o değil, o'dan u'ya kayan iki parçalı bir sestir: go = GOU. Düz o söylenirse kelime değişebilir.",
    gloss: [
      { de: "note", tr: "not" },
      { de: "coat", tr: "palto" },
      { de: "road", tr: "yol" },
      { de: "boat", tr: "tekne" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Please write a note.",
        tr: "Lütfen bir not yaz.",
        hint: "„note“ = NOUT: o ile başla, dudakları u'ya doğru topla.",
        confusions: [
          { heard: ["not", "nut"], fix: "Düz ve kısa bir o „not“ (değil) gibi duyulur; sesi sona doğru u'ya kaydır.", expected: "note" },
        ],
      },
      {
        de: "My coat is on the chair.",
        tr: "Paltom sandalyenin üstünde.",
        hint: "„coat“ = KOUT; kısa ve düz bir o değil.",
        confusions: [
          { heard: ["cot", "caught"], fix: "Kayma olmazsa „cot“ ya da „caught“ duyulur; o'dan u'ya geç.", expected: "coat" },
        ],
      },
      {
        de: "The road is closed today.",
        tr: "Yol bugün kapalı.",
        hint: "„road“ ve „closed“ aynı kayan sesi taşır: ROUD, KLOUZD.",
        confusions: [
          { heard: ["rod"], fix: "Kısa bir o ile „rod“ (çubuk) olur; ünlüyü uzatıp u'ya kaydır.", expected: "road" },
        ],
      },
      {
        de: "We go home by boat.",
        tr: "Eve tekneyle gidiyoruz.",
        hint: "„go“, „home“ ve „boat“: üçünde de aynı kayan o. „boat“ = BOUT.",
        confusions: [
          { heard: ["bought", "but"], fix: "Uzun düz bir o „bought“, kısa açık bir ses „but“ verir; o'dan u'ya kay.", expected: "boat" },
        ],
      },
      {
        de: "Show me your old photos.",
        tr: "Bana eski fotoğraflarını göster.",
        hint: "„show“, „old“ ve „photos“: aynı ses üç kez. „old“ = OULD.",
        confusions: [
          { heard: ["all"], fix: "„old“ düz bir o ile „all“ (hepsi) gibi duyulur; kaymayı unutma.", expected: "old" },
        ],
      },
      {
        de: "I hope it snows.",
        tr: "Umarım kar yağar.",
        hint: "„hope“ = HOUP, „snows“ = SNOUZ; iki kelimede de kayan o.",
        confusions: [
          { heard: ["hop"], fix: "Kısa bir o ile „hop“ (sıçramak) olur; ünlü iki parçalı kalsın.", expected: "hope" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g15",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "a big house, two red bags",
    genre: "grammar",
    intro: "Türkçede „bir“ sıfattan sonra gelir (büyük bir ev); İngilizcede en başta durur ve sıfat hiç değişmez.",
    focus: "Sıfatlar: a/an + sıfat + isim sırası, çoğul almaması ve iki sıfatın sırası",
    gloss: [
      { de: "old", tr: "eski" },
      { de: "bag", tr: "çanta" },
      { de: "clean", tr: "temiz" },
      { de: "tall", tr: "uzun boylu" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "a / an en başta",
        tr: "Türkçede „bir“ sıfattan sonra gelir: büyük bir ev. İngilizcede „a“ en başta durur: a big house. „a“ mı „an“ mı olacağına ismin değil, hemen arkasındaki kelimenin, yani sıfatın ilk sesi karar verir: an old car, ama a new car.",
        examples: [
          { de: "It's a big house.", tr: "Büyük bir ev.", note: "a + sıfat + isim" },
          { de: "She has an old car.", tr: "Eski bir arabası var.", note: "old → an" },
          { de: "He's a nice man.", tr: "Hoş bir adam." },
        ],
      },
      {
        heading: "Sıfat değişmez",
        tr: "Sıfat tekilde ve çoğulda aynı kalır, -s almaz: a red bag, two red bags. İsim söylenmiyorsa sıfat „be“ fiilinden sonra tek başına durur ve yine değişmez: The rooms are small.",
        examples: [
          { de: "I have two red bags.", tr: "İki kırmızı çantam var.", note: "reds değil" },
          { de: "The rooms are small but clean.", tr: "Odalar küçük ama temiz." },
          { de: "My sisters are tall.", tr: "Kız kardeşlerim uzun boylu.", note: "talls değil" },
        ],
      },
      {
        heading: "İki sıfat yan yana",
        tr: "İki sıfat varsa aralarına „and“ girmez ve sıraları sabittir: önce fikir (nice), sonra boyut (big, small), sonra yaş (old, new), en son renk. Bu dördü arasında renk her zaman isme en yakın durur: a big black dog.",
        examples: [
          { de: "We have a big black dog.", tr: "Büyük siyah bir köpeğimiz var.", note: "boyut → renk" },
          { de: "It's a nice old house.", tr: "Güzel, eski bir ev.", note: "fikir → yaş" },
          { de: "She has a small white cat.", tr: "Küçük beyaz bir kedisi var.", note: "boyut → renk" },
        ],
      },
    ],
    questions: [
      {
        text: "She has ___ car.",
        options: ["old an", "an old", "a old"],
        answer: 1,
        explain: "a/an en başta durur ve „old“ ünlüyle başladığı için an gelir: an old car.",
      },
      {
        text: "I have two ___ bags.",
        options: ["red", "reds", "a red"],
        answer: 0,
        explain: "Sıfat çoğulda da değişmez: two red bags.",
      },
      {
        text: "We have a ___ dog.",
        options: ["black big", "blacks big", "big black"],
        answer: 2,
        explain: "Boyut renkten önce gelir ve sıfat çoğul almaz: a big black dog.",
      },
      {
        kind: "gapfill",
        text: "It's ___ big house. (a / an)",
        options: [],
        answer: 0,
        accept: ["a"],
        explain: "„big“ ünsüzle başlıyor, bu yüzden a gelir.",
      },
      {
        kind: "gapfill",
        text: "He has ___ orange bike. (a / an)",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "Seçimi sıfat belirler: „orange“ ünlüyle başladığı için an.",
      },
      {
        kind: "gapfill",
        text: "They live in a ___ house. (old, big)",
        options: [],
        answer: 0,
        accept: ["big old"],
        explain: "Boyut yaştan önce gelir: a big old house.",
      },
      {
        kind: "gapfill",
        text: "Her bags are ___. (red)",
        options: [],
        answer: 0,
        accept: ["red"],
        explain: "be'den sonra gelen sıfat da çoğul eki almaz: Her bags are red.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She has", "an", "old", "car"],
        explain: "Önce a/an, sonra sıfat, en sonda isim: She has an old car.",
      },
      {
        kind: "truefalse",
        text: "„I have two reds bags.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Sıfat çoğul eki almaz: „two red bags“.",
      },
      {
        kind: "truefalse",
        text: "„It's a nice old house.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Fikir bildiren sıfat (nice) yaştan (old) önce gelir; a da en başta.",
      },
    ],
  },
];

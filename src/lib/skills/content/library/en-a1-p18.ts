import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti yalnız KONUŞMA ve DİL BİLGİSİ taşır (okuma, dinleme ve yazma
 * hücreleri 13 ve 17'de yirmiye ulaştı). Parti 18 giysi ve günlük hayat
 * hattı: söyleyiş odağı „ow / ou“ yazılışının kayan /aʊ/ sesi (now/no);
 * dil bilgisi hep çoğul isimler (jeans, trousers, glasses) ve a pair of.
 */
export const enA1P18: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s18",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "now or no?",
    genre: "pronounce",
    intro: "„ow“ ve „ou“ yazılışları çoğu zaman a'dan u'ya kayan bir ses verir: now = NAU. Düz bir o ya da „ov“ okunursa kelime değişir.",
    gloss: [
      { de: "now", tr: "şimdi" },
      { de: "brown", tr: "kahverengi" },
      { de: "town", tr: "kasaba" },
      { de: "loud", tr: "gürültülü" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Come here now, please.",
        tr: "Şimdi buraya gel lütfen.",
        hint: "„now“ = NAU: ağzı a için aç, sonra dudakları u'ya topla. w burada v değil.",
        confusions: [
          { heard: ["no"], fix: "Düz bir o ile „no“ (hayır) duyulur ve anlam tersine döner; önce a, sonra u.", expected: "now" },
        ],
      },
      {
        de: "Our house is brown.",
        tr: "Evimiz kahverengi.",
        hint: "„our“, „house“ ve „brown“: üçünde de aynı AU sesi.",
        confusions: [
          { heard: ["hose"], fix: "„house“ o ile söylenirse „hose“ (hortum) gibi duyulur; sesi a'dan başlat.", expected: "house" },
        ],
      },
      {
        de: "The town is very old.",
        tr: "Kasaba çok eski.",
        hint: "„town“ = TAUN; „ow“yu „ov“ diye okuma.",
        confusions: [
          { heard: ["tone"], fix: "o ile söylenirse „tone“ (ton) duyulur; a'dan u'ya kay.", expected: "town" },
        ],
      },
      {
        de: "Please don't shout.",
        tr: "Lütfen bağırma.",
        hint: "„shout“ = ŞAUT; „ou“ yazılışı burada u sesi vermez.",
        confusions: [
          { heard: ["shoot"], fix: "Düz bir u ile „shoot“ (ateş etmek) duyulur; ağzı önce a için aç.", expected: "shout" },
        ],
      },
      {
        de: "The music is too loud.",
        tr: "Müzik çok yüksek.",
        hint: "„loud“ = LAUD; ağız geniş açılarak başlar.",
        confusions: [
          { heard: ["load"], fix: "o ile „load“ (yük) olur; a'dan başlayıp u'ya kay.", expected: "loud" },
        ],
      },
      {
        de: "How are you today?",
        tr: "Bugün nasılsın?",
        hint: "„how“ = HAU; soru kelimesi a ile açılır.",
        confusions: [
          { heard: ["who"], fix: "u ile başlarsan „who“ (kim) duyulur ve soru değişir; önce a, sonra u.", expected: "how" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g18",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "a pair of jeans",
    genre: "grammar",
    intro: "İki parçalı bazı eşyalar İngilizcede hep çoğuldur: jeans, pants, glasses. Türkçede „bir pantolon“ tekildir; İngilizcede bu farkı „a pair of“ kapatır.",
    focus: "Hep çoğul isimler: jeans, pants, glasses, shorts ve a pair of",
    gloss: [
      { de: "jeans", tr: "kot pantolon" },
      { de: "pants", tr: "pantolon" },
      { de: "glasses", tr: "gözlük" },
      { de: "pair", tr: "çift" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "İki parçalı eşyalar hep çoğul",
        tr: "İki bacaklı ya da iki camlı eşyalar tek bir eşya olsa da İngilizcede çoğul isimdir: jeans, pants, shorts, glasses. Bu yüzden fiil „are“ olur ve isimden önce „a“ gelmez.",
        examples: [
          { de: "My jeans are blue.", tr: "Kot pantolonum mavi.", note: "tek pantolon, fiil are" },
          { de: "Where are my glasses?", tr: "Gözlüğüm nerede?" },
          { de: "These pants are new.", tr: "Bu pantolon yeni.", note: "these + are" },
        ],
      },
      {
        heading: "Saymak için: a pair of",
        tr: "Kaç tane olduğunu söylemek için „a pair of“ (bir çift) kullanılır: a pair of jeans, two pairs of pants. Bu kalıpla fiil „pair“e uyar ve tekil olur: This pair of glasses is new.",
        examples: [
          { de: "I need a pair of jeans.", tr: "Bir kot pantolona ihtiyacım var." },
          { de: "She has three pairs of shorts.", tr: "Üç şortu var.", note: "çoğul: pairs" },
          { de: "This pair of glasses is ninety dollars.", tr: "Bu gözlük doksan dolar.", note: "pair → is" },
        ],
      },
      {
        heading: "Zamir de çoğul: they, them",
        tr: "Bu isimlerin yerine „it“ değil „they“ ya da „them“ kullanılır. Türkçede „Yeni mi?“ deriz; İngilizcede „Are they new?“ denir, çünkü isim çoğuldur.",
        examples: [
          { de: "I love your jeans! Are they new?", tr: "Kot pantolonuna bayıldım! Yeni mi?", note: "it değil they" },
          { de: "Where are my glasses? I can't find them.", tr: "Gözlüğüm nerede? Bulamıyorum.", note: "it değil them" },
          { de: "How much are these pants? — They're thirty dollars.", tr: "Bu pantolon ne kadar? — Otuz dolar." },
        ],
      },
    ],
    questions: [
      {
        text: "My jeans ___ blue.",
        options: ["is", "are", "am"],
        answer: 1,
        explain: "jeans çoğul bir isimdir, bu yüzden fiil are olur.",
      },
      {
        text: "I need ___ jeans.",
        options: ["a pair of", "a", "one"],
        answer: 0,
        explain: "jeans ile a ya da one kullanılmaz; tek bir tanesi a pair of ile söylenir.",
      },
      {
        text: "I love your glasses! Are ___ new?",
        options: ["it", "this", "they"],
        answer: 2,
        explain: "glasses çoğul olduğu için zamiri de çoğul olur: they.",
      },
      {
        kind: "gapfill",
        text: "Where ___ my glasses?",
        options: [],
        answer: 0,
        accept: ["are"],
        explain: "glasses çoğul, bu yüzden are.",
      },
      {
        kind: "gapfill",
        text: "She has three ___ of shorts.",
        options: [],
        answer: 0,
        accept: ["pairs"],
        explain: "Birden çok çift varsa pair çoğul olur: three pairs of.",
      },
      {
        kind: "gapfill",
        text: "This pair of glasses ___ ninety dollars. (be)",
        options: [],
        answer: 0,
        accept: ["is"],
        explain: "Fiil tekil olan „pair“e uyar: This pair … is.",
      },
      {
        kind: "gapfill",
        text: "I can't find my pants. Where are ___?",
        options: [],
        answer: 0,
        accept: ["they"],
        explain: "pants çoğul; soruda zamiri de they olur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "need", "a pair of", "pants"],
        explain: "Özne + fiil + a pair of + isim: I need a pair of pants.",
      },
      {
        kind: "truefalse",
        text: "„My pants is black.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "pants çoğul bir isimdir: „My pants are black.“",
      },
      {
        kind: "truefalse",
        text: "„How much are these jeans?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "jeans çoğul olduğu için these ve are ile soruluyor; doğru.",
      },
    ],
  },
];

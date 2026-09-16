import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 4 · Ev ve çevre.
 *
 * ÖLÇÜLEN ŞEY: nerede oturduğunu ve bir şeyin nerede olduğunu anlatmak —
 * yer edatlarıyla Dativ, `es gibt` yapısı ve `wo`/`wohin` ayrımı.
 *
 * ARALIKLI TEKRAR ÜÇ HEDEFTE: `w04-g1` W3'ün Akkusativ'ini yeniden yokluyor
 * ama bu kez Dativ ile AYIRMAK zorunda; `w04-g4` W1'in V2 kuralına yeni bir
 * bağlamda (başta yer tümleci) dönüyor; `w04-g5` W1'deki `fragewort.wo`yu
 * `wohin` ile karşı karşıya getiriyor. Üçü de "aynı soruyu yeniden sormak"
 * değil, aynı bilgiyi bir ayrımın içinde sınamak.
 */
export const DE_A1_W04: QuizWeek = {
  id: "de-a1-w04",
  course: "de",
  level: "A1",
  no: 4,
  theme: "Wohnen",
  themeTr: "Ev ve çevre",
  canDo: ["A1.SPK.5", "A1.LS.1", "A1.RD.4", "A1.GR.1", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Beschreibung",
      genreTr: "Tanıtım",
      title: "Meine Wohnung",
      body:
        "Ich wohne in einer kleinen Wohnung in der Stadt. Die Wohnung hat zwei Zimmer. " +
        "Mein Zimmer ist klein, aber schön. Da sind ein Bett und ein Tisch. " +
        "Auf dem Tisch sind meine Bücher. Unter dem Bett schläft mein Hund. " +
        "Die Tür ist alt. Vor dem Haus ist eine Straße. Dort steht mein Auto. " +
        "Ich finde die Wohnung gut, denn die Schule ist nicht weit.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Gespräch",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Lea", text: "Wo wohnst du jetzt?" },
        { speaker: "Jan", text: "Ich wohne bei meiner Mutter. Das Haus ist groß." },
        { speaker: "Lea", text: "Hast du ein Zimmer?" },
        { speaker: "Jan", text: "Ja, mein Zimmer ist oben. Es ist klein, aber schön." },
        { speaker: "Lea", text: "Und wo ist dein Auto?" },
        { speaker: "Jan", text: "Ich habe kein Auto. Ich fahre mit dem Bus." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-a1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Wo sind die Bücher?",
      options: ["Unter dem Bett", "Vor dem Haus", "Auf dem Tisch", "In der Schule"],
      answer: 2,
      why: "\"Auf dem Tisch sind meine Bücher.\" Metinde dört ayrı yer bildirimi var ve her biri başka bir nesneye ait — edatı değil, edatın BAĞLANDIĞI şeyi takip etmek gerekiyor.",
      targets: ["lesen.detail", "praeposition.ort"],
    },
    {
      id: "de-a1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Wo schläft der Hund?",
      options: ["Auf dem Tisch", "Unter dem Bett", "Vor dem Haus", "In der Stadt"],
      answer: 1,
      why: "\"Unter dem Bett schläft mein Hund.\" Bir önceki cümle masadan söz ediyor; iki cümle arka arkaya iki ayrı yer veriyor.",
      targets: ["lesen.detail", "praeposition.ort"],
    },
    {
      id: "de-a1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Warum findet die Person die Wohnung gut?",
      options: ["Sie ist groß", "Sie ist billig", "Sie ist neu", "Die Schule ist nicht weit"],
      answer: 3,
      why: "`denn` sebep bildiriyor: \"…, denn die Schule ist nicht weit.\" Metin evi küçük diye anlatıyor, yani `groß` doğru bile değil.",
      targets: ["lesen.zusammenhang", "konnektor.denn"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-a1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Bei wem wohnt Jan?",
      options: ["Bei Freunden", "Allein", "Bei seiner Mutter", "Bei seinem Vater"],
      answer: 2,
      why: "\"Ich wohne bei meiner Mutter.\" `bei` + kişi, birinin yanında oturmayı anlatıyor.",
      targets: ["hoeren.detail", "praeposition.bei"],
    },
    {
      id: "de-a1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "Wo ist Jans Zimmer?",
      options: ["Unten", "Oben", "Vor dem Haus", "In der Stadt"],
      answer: 1,
      why: "\"Mein Zimmer ist oben.\" `oben` yukarıda demek; `unten` tam karşıtı ve konuşmada hiç geçmiyor.",
      targets: ["hoeren.detail", "wortfeld.ort"],
    },
    {
      id: "de-a1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie fährt Jan?",
      options: ["Mit dem Auto", "Mit dem Bus", "Mit dem Zug"],
      answer: 1,
      why: "\"Ich habe kein Auto. Ich fahre mit dem Bus.\" Araba konuşmada geçiyor ama OLMADIĞINI söylemek için — sözcüğü duymak yetmiyor.",
      targets: ["hoeren.zusammenhang", "negation.kein"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-a1-w04-g1",
      block: "grammar",
      stem: "Das Buch ist auf ___ Tisch.",
      options: ["der", "den", "dem", "das"],
      answer: 2,
      why: "Yer bildiren `auf` (nerede?) Dativ ister. Eril `der Tisch` Dativ'de `dem Tisch` olur; `den` Akkusativ'dir ve yön bildirirken kullanılır.",
      targets: ["artikel.dativ", "artikel.akkusativ", "praeposition.ort"],
      byNative: {
        tr: {
          options: ["der", "den", "dem", "das"],
          answer: 2,
          why: "Türkçede yer eki isme gelir (\"masada\"); Almancada isim değişmez, ARTİKEL değişir. `auf` yer bildirirken Dativ ister: `dem Tisch`.",
        },
        en: {
          options: ["der", "den", "dem", "das"],
          answer: 2,
          why: "İngilizcede `on the table` hiç değişmez, o yüzden hangi biçimin seçileceği görünmez bir karar. Almancada `auf` yer bildirirken Dativ ister: eril `dem`.",
        },
      },
    },
    {
      id: "de-a1-w04-g2",
      block: "grammar",
      stem: "In der Stadt gibt es ___ Schule.",
      options: ["einer", "einem", "ein", "eine"],
      answer: 3,
      why: "`es gibt` her zaman Akkusativ ister. `die Schule` dişil ve dişil isimlerde Akkusativ yalın hâlle aynı görünür: `eine`.",
      targets: ["struktur.esgibt", "artikel.akkusativ"],
    },
    {
      id: "de-a1-w04-g3",
      block: "grammar",
      stem: "Ich ___ ein Zimmer in der Stadt.",
      options: ["willst", "wollen", "will", "wollt"],
      answer: 2,
      why: "Modal fiiller tekilde düzensiz çekilir ve `ich` ile ek ALMAZ: ich will, du willst, er will.",
      targets: ["modalverb.wollen", "verb.praesens"],
    },
    {
      id: "de-a1-w04-g4",
      block: "grammar",
      stem: "Vor dem Haus ___ eine Straße.",
      options: ["ist", "sind", "es ist", "ist es"],
      answer: 0,
      why: "Başta yer tümleci olsa bile çekimli fiil ikinci sırada kalır ve özne arkaya geçer. Özne tekil (`eine Straße`) olduğu için `ist`.",
      targets: ["wortstellung.v2", "sein.praesens"],
      byNative: {
        en: {
          options: ["ist", "sind", "es ist", "ist es"],
          answer: 0,
          why: "İngilizcede bu cümle `There is a street` diye kurulur ve `there` gerekir, o yüzden `es ist` doğru görünür. Almancada başta yer tümleci varsa ikinci sıraya doğrudan fiil gelir.",
        },
      },
    },
    {
      id: "de-a1-w04-g5",
      block: "grammar",
      stem: "___ gehst du?",
      options: ["Wo", "Wohin", "Woher", "Wann"],
      answer: 1,
      why: "`gehen` hareket bildiriyor, yani yön soruluyor: `wohin`. `wo` sabit yeri, `woher` kaynağı sorar.",
      targets: ["fragewort.wohin", "fragewort.wo"],
      byNative: {
        en: {
          options: ["Wo", "Wohin", "Woher", "Wann"],
          answer: 1,
          why: "İngilizcede günlük dilde `Where are you going?` deniyor ve `to` düşüyor, o yüzden `Wo` doğru görünür. Almancada yön ayrı bir sözcük: `wohin`.",
        },
      },
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-a1-w04-v1",
      block: "vocab",
      stem: "Meine Wohnung ist nicht groß, sie ist ___.",
      options: ["alt", "teuer", "schön", "klein"],
      answer: 3,
      why: "`groß`un karşıtı `klein`. Öteki üç sıfat da bir evi anlatabilir ama cümle `nicht … , sie ist …` ile açık bir zıtlık kuruyor.",
      targets: ["adjektiv.gegensatz", "wortfeld.wohnen"],
    },
    {
      id: "de-a1-w04-v2",
      block: "vocab",
      stem: "Ich ___ in einer Wohnung in der Stadt.",
      options: ["wohne", "stehe", "fahre", "komme"],
      answer: 0,
      why: "`wohnen` bir yerde ikamet etmek demek. `stehen` ayakta durmak, `kommen` gelmek — üçü de bir yerle kurulabilir ama anlamları başka.",
      targets: ["verb.wohnen", "wortfeld.wohnen"],
    },
    {
      id: "de-a1-w04-v3",
      block: "vocab",
      stem: "Die Schule ist nicht ___ von meinem Haus.",
      options: ["groß", "weit", "alt", "gut"],
      answer: 1,
      why: "Mesafe için `weit` kullanılır: \"nicht weit von …\" = uzak değil. Öteki sıfatlar okulu anlatır, arasındaki mesafeyi değil.",
      targets: ["wortfeld.ort", "adjektiv.weit"],
    },
  ],
};

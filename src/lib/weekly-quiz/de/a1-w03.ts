import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 3 · Alışveriş ve fiyat.
 *
 * ÖLÇÜLEN ŞEY: alışveriş konuşmasını izlemek, fiyat sormak ve Akkusativ'i
 * bağlamda kurmak. Bu hafta durum (Kasus) ilk kez ölçülüyor: W1'de artikel
 * yalnız yalın hâlde (Nominativ) sorulmuştu.
 *
 * ARALIKLI TEKRAR: `w03-g1` W1'in `artikel.nominativ` hedefini yeniden
 * yokluyor, ama bu kez yalın hâl ile Akkusativ'i AYIRMAK zorunda —
 * aynı bilgi yeni bir bağlamda. `w03-g4` W1'deki `haben.praesens`e dönüyor.
 *
 * `Euro` sözcük listesinde yok ve olması da gerekmiyor: para birimi adı
 * öğrenilecek bir sözcük değil, kontrol betiğinde özel ad sayılıyor.
 */
export const DE_A1_W03: QuizWeek = {
  id: "de-a1-w03",
  course: "de",
  level: "A1",
  no: 3,
  theme: "Einkaufen",
  themeTr: "Alışveriş",
  canDo: ["A1.SPK.3", "A1.LS.2", "A1.RD.1", "A1.GR.1", "A1.GR.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Notiz",
      genreTr: "Not",
      title: "Einkaufen",
      body:
        "Heute gehe ich in den Supermarkt. Ich brauche Brot, Milch und Wasser. " +
        "Das Brot kostet 3 Euro. Die Milch ist billig, nur 1 Euro. " +
        "Ich kaufe auch einen Kaffee für die Arbeit. " +
        "Der Kaffee ist teuer, aber ich trinke ihn gern. " +
        "Ich habe 20 Euro. Das ist genug. " +
        "Am Abend gehe ich noch in den Laden in der Straße und kaufe ein Buch.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Im Laden",
      genreTr: "Dükkânda",
      plays: 2,
      segments: [
        { speaker: "Kunde", text: "Guten Tag! Was kostet das Buch?" },
        { speaker: "Laden", text: "Das Buch kostet 12 Euro." },
        { speaker: "Kunde", text: "Das ist teuer. Und die Zeitung?" },
        { speaker: "Laden", text: "Die Zeitung kostet 2 Euro." },
        { speaker: "Kunde", text: "Gut, ich nehme die Zeitung. Ich habe nur 10 Euro." },
        { speaker: "Laden", text: "Kein Problem. Danke!" },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-a1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Was ist billig?",
      options: ["Der Kaffee", "Die Milch", "Das Buch", "Das Brot"],
      answer: 1,
      why: "\"Die Milch ist billig, nur 1 Euro.\" Kahve için tam tersi yazıyor: `teuer`. Metin iki sıfatı da açıkça veriyor.",
      targets: ["lesen.detail", "wortfeld.preis"],
    },
    {
      id: "de-a1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "Wie viel Geld hat die Person?",
      options: ["3 Euro", "1 Euro", "20 Euro", "12 Euro"],
      answer: 2,
      why: "\"Ich habe 20 Euro.\" Öteki tutarlar ürünlerin fiyatı — metinde üç tutar geçiyor ve yalnız biri cüzdandaki para.",
      targets: ["lesen.detail", "wortfeld.preis"],
    },
    {
      id: "de-a1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "Wo kauft die Person am Abend ein Buch?",
      options: ["Im Supermarkt", "In der Schule", "Im Laden in der Straße", "In der Stadt"],
      answer: 2,
      why: "Son cümle: \"…gehe ich noch in den Laden in der Straße und kaufe ein Buch.\" Supermarkt metnin başındaki alışveriş, akşama bağlı değil.",
      targets: ["lesen.detail", "fragewort.wo"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-a1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "Was kostet das Buch?",
      options: ["2 Euro", "10 Euro", "12 Euro", "20 Euro"],
      answer: 2,
      why: "\"Das Buch kostet 12 Euro.\" 2 Euro gazetenin fiyatı, 10 Euro müşterinin parası — üç sayı da konuşmada geçiyor.",
      targets: ["hoeren.detail", "wortfeld.preis"],
    },
    {
      id: "de-a1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "Was kauft der Kunde?",
      options: ["Das Buch", "Die Zeitung", "Beides", "Nichts"],
      answer: 1,
      why: "\"Gut, ich nehme die Zeitung.\" Kitabı `teuer` bulup almıyor; kitaptan vazgeçtiğini doğrudan söylemiyor, fiyatı yorumlayarak belli ediyor.",
      targets: ["hoeren.zusammenhang", "verb.nehmen"],
    },
    {
      id: "de-a1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Warum kauft der Kunde das Buch nicht?",
      options: ["Es ist teuer", "Es ist zu klein", "Er hat es schon", "Der Laden ist zu"],
      answer: 0,
      why: "\"Das ist teuer\" diyor ve sonra yalnız 10 Euro'su olduğunu ekliyor. Sebep iki cümleye yayılmış.",
      targets: ["hoeren.zusammenhang", "wortfeld.preis"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-a1-w03-g1",
      block: "grammar",
      stem: "Ich kaufe ___ Kaffee.",
      options: ["ein", "einem", "einen", "der"],
      answer: 2,
      why: "`kaufen` nesnesini Akkusativ'de ister ve `Kaffee` eril: `der` → `den`, `ein` → `einen`. Yalın hâl (`ein Kaffee`) yalnız öznede kullanılır.",
      targets: ["artikel.akkusativ", "artikel.nominativ"],
      byNative: {
        tr: {
          options: ["ein", "einem", "einen", "der"],
          answer: 2,
          why: "Türkçede nesne `-i` ekiyle işaretlenir (\"kahveyi\"); Almancada ek fiile değil ARTİKELE gelir. Eril isimde Akkusativ `einen`.",
        },
        en: {
          options: ["ein", "einem", "einen", "der"],
          answer: 2,
          why: "İngilizcede nesne biçim değiştirmez (`I buy a coffee`), o yüzden `ein` doğru görünür. Almancada nesne Akkusativ'e girer ve eril artikel `einen` olur.",
        },
      },
    },
    {
      id: "de-a1-w03-g2",
      block: "grammar",
      stem: "___ Milch ist billig.",
      options: ["Der", "Die", "Das", "Den"],
      answer: 1,
      why: "`Milch` dişil: `die Milch`. Cümlede özne olduğu için yalın hâlde kalıyor.",
      targets: ["artikel.nominativ", "nomen.milch"],
    },
    {
      id: "de-a1-w03-g3",
      block: "grammar",
      stem: "Ich habe ___ Geld.",
      options: ["nicht", "kein", "nein", "nichts"],
      answer: 1,
      why: "İsmi olumsuzlamak için `kein` kullanılır: kein Geld, keine Zeit. `nicht` fiili ya da cümleyi olumsuzlar.",
      targets: ["negation.kein", "negation.nicht"],
      byNative: {
        en: {
          options: ["nicht", "kein", "nein", "nichts"],
          answer: 1,
          why: "İngilizcede tek bir olumsuzlama var (`I don't have money`), Almancada isim için `kein`, fiil için `nicht` diye ikiye ayrılıyor.",
        },
      },
    },
    {
      id: "de-a1-w03-g4",
      block: "grammar",
      stem: "___ ihr Geld?",
      options: ["Habt", "Habe", "Hast", "Haben"],
      answer: 0,
      why: "`ihr` (siz, teklifsiz çoğul) ile `haben` fiili `habt` olur. `hast` `du` için, `haben` `wir/sie` için.",
      targets: ["haben.praesens", "haben.2pl"],
    },
    {
      id: "de-a1-w03-g5",
      block: "grammar",
      stem: "___ kostet das Buch?",
      options: ["Wie viel", "Wie", "Was für", "Wo"],
      answer: 0,
      why: "Fiyat sorusu `Wie viel kostet …?` ya da `Was kostet …?` biçiminde kurulur. `Wie` tek başına yolu ya da biçimi sorar.",
      targets: ["fragewort.wieviel", "wortfeld.preis"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-a1-w03-v1",
      block: "vocab",
      stem: "Das Buch ist nicht billig, es ist ___.",
      options: ["klein", "teuer", "neu", "gut"],
      answer: 1,
      why: "`billig`in karşıtı `teuer`. Öteki üç sıfat da kitabı anlatabilir ama cümle bir zıtlık kuruyor (`nicht … , es ist …`).",
      targets: ["wortfeld.preis", "adjektiv.gegensatz"],
    },
    {
      id: "de-a1-w03-v2",
      block: "vocab",
      stem: "Ich ___ Brot und Milch.",
      options: ["koste", "kaufe", "kenne", "komme"],
      answer: 1,
      why: "`kaufen` satın almak; `kosten` bir şeyin fiyatının olması demek ve öznesi ürün olur (\"Das Brot kostet…\"), insan değil.",
      targets: ["verb.kaufen-kosten", "wortfeld.einkaufen"],
    },
    {
      id: "de-a1-w03-v3",
      block: "vocab",
      stem: "Ich brauche nur 15 Euro, und ich habe 20 Euro. Das ist ___.",
      options: ["genug", "wenig", "teuer", "billig"],
      answer: 0,
      why: "`genug` yeterli demek ve para için doğrudan kullanılır. `teuer`/`billig` paranın değil ÜRÜNÜN niteliğidir — para pahalı olmaz.",
      targets: ["wortfeld.menge", "wortfeld.preis"],
    },
  ],
};

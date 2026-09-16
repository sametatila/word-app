import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 5 · Transfer.
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün hedefleri burada YENİ BAĞLAMLARDA sorulıyor:
 * aynı kural, başka bir cümle, başka bir metin türü. Gerekçe basit — aynı
 * bağlamda tekrar sormak TANIMAYI ölçer (öğrenci cevabı hatırlar), yeni
 * bağlamda sormak ÖĞRENMEYİ ölçer. Beşinci hafta bu yüzden "tekrar haftası"
 * diye değil "transfer haftası" diye kuruldu.
 *
 * Metin türü de bilerek değişti: ilk dört hafta tanıtım/blog/not/betimleme
 * gördü, bu hafta bir MEKTUP — aynı dil, tanıdık olmayan çerçeve.
 *
 * Her blok önceki haftalardan en az bir hedefi taşıyor; hiçbir madde yeni bir
 * kural getirmiyor. Yeni olan tek şey bağlam.
 */
export const DE_A1_W05: QuizWeek = {
  id: "de-a1-w05",
  course: "de",
  level: "A1",
  no: 5,
  theme: "Ein Brief aus Berlin",
  themeTr: "Transfer — Berlin'den mektup",
  canDo: ["A1.SPK.1", "A1.RD.2", "A1.LS.4", "A1.GR.3", "A1.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Brief",
      genreTr: "Mektup",
      title: "Hallo Tim!",
      body:
        "Hallo Tim! Ich bin jetzt in Berlin. " +
        "Ich wohne in einem kleinen Zimmer bei einer Familie. " +
        "Ich stehe um 7 Uhr auf und fahre mit dem Bus in die Schule. Ich lerne Deutsch. " +
        "Am Abend gehe ich in den Supermarkt und kaufe Brot und Milch. Das ist nicht teuer. " +
        "Manchmal treffe ich Freunde in der Stadt. Die Stadt ist groß und schön. " +
        "Wie geht es dir? Bis bald!",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Telefon",
      genreTr: "Telefon konuşması",
      plays: 2,
      segments: [
        { speaker: "Tim", text: "Hallo! Wie geht es dir in Berlin?" },
        { speaker: "Nina", text: "Gut, danke. Aber ich habe wenig Zeit." },
        { speaker: "Tim", text: "Warum? Was machst du den Tag?" },
        { speaker: "Nina", text: "Ich lerne Deutsch und arbeite auch. Ich stehe um 6 Uhr auf." },
        { speaker: "Tim", text: "Und wo wohnst du?" },
        { speaker: "Nina", text: "Bei einer Familie. Mein Zimmer ist klein, aber das Haus ist schön." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-a1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Wo wohnt die Person?",
      options: ["In einem Haus allein", "Bei einer Familie", "In der Schule", "Bei Freunden"],
      answer: 1,
      why: "\"Ich wohne in einem kleinen Zimmer bei einer Familie.\" Arkadaşlar mektupta geçiyor ama şehirde buluşulan kişiler olarak, ev arkadaşı olarak değil.",
      targets: ["lesen.detail", "praeposition.bei"],
    },
    {
      id: "de-a1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Was kauft die Person am Abend?",
      options: ["Ein Buch", "Einen Kaffee", "Brot und Milch", "Nichts"],
      answer: 2,
      why: "\"…gehe ich in den Supermarkt und kaufe Brot und Milch.\" Akşamla alışveriş aynı cümlede bağlı.",
      targets: ["lesen.detail", "wortfeld.einkaufen"],
    },
    {
      id: "de-a1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Wie fährt die Person in die Schule?",
      options: ["Mit dem Bus", "Mit dem Auto", "Mit dem Zug"],
      answer: 0,
      why: "\"…und fahre mit dem Bus in die Schule.\" Kalkma saati ve araç aynı cümlede veriliyor.",
      targets: ["lesen.detail", "wortfeld.verkehr"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-a1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Wann steht Nina auf?",
      options: ["Um 7 Uhr", "Um 5 Uhr", "Um 6 Uhr", "Um 8 Uhr"],
      answer: 2,
      why: "\"Ich stehe um 6 Uhr auf.\" Mektuptaki kişi 7'de kalkıyordu — iki ayrı kişi, iki ayrı saat; hangisinin sorulduğuna dikkat.",
      targets: ["hoeren.detail", "zeitangabe.uhrzeit"],
    },
    {
      id: "de-a1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Warum hat Nina wenig Zeit?",
      options: ["Sie ist krank", "Sie lernt und arbeitet", "Sie wohnt weit", "Sie hat kein Auto"],
      answer: 1,
      why: "\"Ich lerne Deutsch und arbeite auch.\" Sebep `warum` sorusundan sonra geliyor ama `weil` gibi bir bağlaçla işaretlenmiyor — iki cümleyi birleştirmek gerekiyor.",
      targets: ["hoeren.zusammenhang", "fragewort.warum"],
    },
    {
      id: "de-a1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie ist Ninas Zimmer?",
      options: ["Groß", "Klein", "Neu", "Teuer"],
      answer: 1,
      why: "\"Mein Zimmer ist klein, aber das Haus ist schön.\" `aber` iki ayrı şeyi karşılaştırıyor: oda küçük, EV güzel — sıfatı yanlış özneye bağlamamak gerekiyor.",
      targets: ["hoeren.detail", "konnektor.aber"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-a1-w05-g1",
      block: "grammar",
      stem: "Am Abend ___ ich in den Supermarkt.",
      options: ["gehe", "gehen", "geht", "ich gehe"],
      answer: 0,
      why: "Başta zaman tümleci var, yani ikinci sırayı fiil tutuyor ve özne arkaya geçiyor. Fiil `ich`e göre çekilir: `gehe`.",
      targets: ["wortstellung.v2", "verb.praesens"],
    },
    {
      id: "de-a1-w05-g2",
      block: "grammar",
      stem: "Ich kaufe ___ Brot.",
      options: ["einem", "einen", "ein", "einer"],
      answer: 2,
      why: "`Brot` nötr (`das Brot`) ve nötr isimlerde Akkusativ yalın hâlle aynı görünür: `ein`. W3'teki `einen Kaffee` erildi — fark cinsiyetten geliyor.",
      targets: ["artikel.akkusativ", "artikel.nominativ"],
      byNative: {
        en: {
          options: ["einem", "einen", "ein", "einer"],
          answer: 2,
          why: "W3'te `einen Kaffee` öğrenildi ve buraya da `einen` taşınıyor. Ama Akkusativ eki YALNIZ eril isimlerde görünür; `Brot` nötr olduğu için biçim değişmiyor: `ein`.",
        },
      },
    },
    {
      id: "de-a1-w05-g3",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Ich stehe auf um 6 Uhr.",
        "Ich aufstehe um 6 Uhr.",
        "Um 6 Uhr stehe ich auf.",
        "Um 6 Uhr ich stehe auf.",
      ],
      answer: 2,
      why: "İki kural aynı cümlede: ayrılabilir fiilin öneki sona gider VE başta zaman tümleci varsa fiil ikinci sırada kalır, özne arkaya geçer.",
      targets: ["verb.trennbar", "wortstellung.v2"],
      byNative: {
        tr: {
          options: [
            "Ich stehe auf um 6 Uhr.",
            "Ich aufstehe um 6 Uhr.",
            "Um 6 Uhr stehe ich auf.",
            "Um 6 Uhr ich stehe auf.",
          ],
          answer: 2,
          why: "Türkçede \"Saat 6'da ben kalkıyorum\" sıralaması doğal, o yüzden `Um 6 Uhr ich stehe auf` doğru görünür. Almancada özne fiilden sonra gelmek zorunda.",
        },
        en: {
          options: [
            "Ich stehe auf um 6 Uhr.",
            "Ich aufstehe um 6 Uhr.",
            "Um 6 Uhr stehe ich auf.",
            "Um 6 Uhr ich stehe auf.",
          ],
          answer: 2,
          why: "İngilizcede hem `I get up at 6` hem `At 6 I get up` kurulabiliyor ve özne hep fiilden önce. Almancada başa bir öğe gelince özne fiilin arkasına düşer.",
        },
      },
    },
    {
      id: "de-a1-w05-g4",
      block: "grammar",
      stem: "Das Buch ist ___ dem Tisch.",
      options: ["auf", "in", "an", "zu"],
      answer: 0,
      why: "Bir yüzeyin üstünde olmak `auf` ile kurulur. `in` içinde olmayı anlatır; `zu` yön bildirir ve yer için kullanılmaz.",
      targets: ["praeposition.ort", "artikel.dativ"],
    },
    {
      id: "de-a1-w05-g5",
      block: "grammar",
      stem: "___ kommst du?",
      options: ["Wann", "Wo", "Woher", "Wohin"],
      answer: 2,
      why: "`kommen` kaynağı ister: `woher` (nereden). `wohin` yönü, `wo` sabit yeri sorar — üçü Türkçede de İngilizcede de tek sözcüğe düşebiliyor.",
      targets: ["fragewort.woher", "fragewort.wohin", "fragewort.wo"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-a1-w05-v1",
      block: "vocab",
      stem: "Das Brot ist nicht teuer, es ist ___.",
      options: ["groß", "billig", "neu", "weit"],
      answer: 1,
      why: "`teuer`in karşıtı `billig`. W3'te aynı çift ters yönden sorulmuştu — burada zıtlığın öteki ucu isteniyor.",
      targets: ["wortfeld.preis", "adjektiv.gegensatz"],
    },
    {
      id: "de-a1-w05-v2",
      block: "vocab",
      stem: "Manchmal ___ ich Freunde in der Stadt.",
      options: ["treffe", "stehe", "koste", "wohne"],
      answer: 0,
      why: "Biriyle buluşmak `treffen`. `wohnen` oturmak, `kosten` fiyat bildirmek — ikisi de kişiyle kurulmaz.",
      targets: ["verb.treffen", "wortfeld.vorstellung"],
    },
    {
      id: "de-a1-w05-v3",
      block: "vocab",
      stem: "Ich habe ___ Zeit, denn ich arbeite und lerne.",
      options: ["viel", "genug", "wenig", "spät"],
      answer: 2,
      why: "`denn` sebebi veriyor: hem çalışıp hem öğrendiği için zamanı AZ. W2'de aynı sözcük `aber` ile sorulmuştu; burada bağlaç değişti, sonuç aynı yöne çıkıyor.",
      targets: ["wortfeld.menge", "konnektor.denn"],
    },
  ],
};

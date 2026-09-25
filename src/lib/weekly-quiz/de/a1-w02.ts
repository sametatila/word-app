import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 2 · Günlük rutin.
 *
 * ÖLÇÜLEN ŞEY: bir günü anlatmak — düzenli fiil çekimi, ayrılabilir fiiller,
 * zaman edatları (`um` / `am`) ve saatler.
 *
 * ARALIKLI TEKRAR: `w02-g1` ve `w02-g4` geçen haftanın iki hedefini yeniden
 * yokluyor (`wortstellung.v2`, `sein.praesens`). Bu bilerek: V2 kuralı A1'in
 * en çok kayan kuralı ve bir hafta sonra yeni bir bağlamda (ayrılabilir fiil)
 * sorulunca tanıma değil öğrenme ölçülüyor.
 *
 * SAATLER RAKAMLA. Sayı sözcükleri (`sechs`, `sieben`) A1 kelime listesinde
 * yok; metin onları yazıyla kullansaydı öğrenciye görmediği sözcük sorulmuş
 * olurdu. Almanca metinlerde saat zaten rakamla yazılıyor.
 */
export const DE_A1_W02: QuizWeek = {
  id: "de-a1-w02",
  course: "de",
  level: "A1",
  no: 2,
  theme: "Mein Tag",
  themeTr: "Günlük rutin",
  canDo: ["A1.SPK.4", "A1.LS.2", "A1.RD.5", "A1.GR.2", "A1.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Blogtext",
      genreTr: "Blog yazısı",
      title: "Mein Tag",
      body:
        "Mein Tag ist lang. Ich stehe um 6 Uhr auf. " +
        "Ich trinke Kaffee und esse Brot. " +
        "Um 7 Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite von 8 bis 16 Uhr. " +
        "Am Abend lese ich ein Buch. Manchmal gehe ich mit Freunden in die Stadt. " +
        "Ich habe wenig Zeit, aber ich lerne Deutsch in der Schule. Das macht Spaß. " +
        "Ich schlafe immer spät.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Gespräch",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Ben", text: "Wann stehst du auf?" },
        { speaker: "Mia", text: "Ich stehe früh auf, um 5 Uhr." },
        { speaker: "Ben", text: "So früh? Warum?" },
        { speaker: "Mia", text: "Ich arbeite von 6 bis 14 Uhr." },
        { speaker: "Ben", text: "Ich stehe um 7 Uhr auf. Und am Abend?" },
        { speaker: "Mia", text: "Am Abend bin ich zu Hause. Ich lese oder höre Musik." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-a1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Wann steht die Person auf?",
      options: ["Um 7 Uhr", "Um 6 Uhr", "Um 8 Uhr", "Um 16 Uhr"],
      answer: 1,
      why: "\"Ich stehe um 6 Uhr auf.\" Metinde dört ayrı saat geçiyor (6, 7, 8, 16) ve her biri başka bir işe ait — hangi saatin hangi cümlede olduğunu ayırmak gerekiyor.",
      targets: ["lesen.detail", "zeitangabe.uhrzeit"],
    },
    {
      id: "de-a1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Wie fährt die Person zur Arbeit?",
      options: ["Mit dem Auto", "Mit dem Zug", "Mit dem Bus"],
      answer: 2,
      why: "\"Um 7 Uhr fahre ich mit dem Bus zur Arbeit.\" Öteki iki araç metinde hiç geçmiyor.",
      targets: ["lesen.detail", "wortfeld.verkehr"],
    },
    {
      id: "de-a1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Was macht die Person am Abend?",
      options: ["Sie arbeitet", "Sie liest ein Buch", "Sie geht in die Stadt", "Sie lernt Deutsch"],
      answer: 1,
      why: "\"Am Abend lese ich ein Buch.\" Stadt'a gitmek `manchmal` oluyor, yani akşama bağlı değil; Deutsch lernen okulda oluyor.",
      targets: ["lesen.detail", "zeitangabe.tagesteil"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-a1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Wann steht Mia auf?",
      options: ["Um 7 Uhr", "Um 6 Uhr", "Um 5 Uhr", "Um 14 Uhr"],
      answer: 2,
      why: "Mia \"um 5 Uhr\" diyor. 7 Uhr Ben'in kalkma saati, 6 ve 14 Mia'nın çalışma saatleri — konuşmada dört saat geçiyor ve üçü çeldirici.",
      targets: ["hoeren.detail", "zeitangabe.uhrzeit"],
    },
    {
      id: "de-a1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Warum steht Mia so früh auf?",
      options: ["Sie hört Musik", "Sie lernt Deutsch", "Sie arbeitet früh", "Sie geht in die Schule"],
      answer: 2,
      why: "\"Warum?\" sorusunun cevabı hemen ardından geliyor: \"Ich arbeite von 6 bis 14 Uhr.\" Sebep açıkça söylenmiyor, saatten çıkarılıyor.",
      targets: ["hoeren.zusammenhang", "fragewort.warum"],
    },
    {
      id: "de-a1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Was macht Mia am Abend?",
      options: ["Sie arbeitet", "Sie ist zu Hause", "Sie fährt mit dem Bus", "Sie steht auf"],
      answer: 1,
      why: "\"Am Abend bin ich zu Hause.\" Çalışmak sabaha ait, akşam değil.",
      targets: ["hoeren.detail", "zeitangabe.tagesteil"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-a1-w02-g1",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Ich aufstehe um 6 Uhr.",
        "Ich stehe um 6 Uhr auf.",
        "Ich stehe auf um 6 Uhr.",
        "Um 6 Uhr ich stehe auf.",
      ],
      answer: 1,
      why: "`aufstehen` ayrılabilir bir fiil: ana cümlede gövde (`stehe`) ikinci sırada kalır, önek (`auf`) cümlenin SONUNA gider.",
      targets: ["verb.trennbar", "wortstellung.v2"],
      byNative: {
        tr: {
          options: [
            "Ich aufstehe um 6 Uhr.",
            "Ich stehe um 6 Uhr auf.",
            "Ich stehe auf um 6 Uhr.",
            "Um 6 Uhr ich stehe auf.",
          ],
          answer: 1,
          why: "Türkçede fiil tek parçadır ve sona gelir (\"kalkıyorum\"), o yüzden fiilin ikiye bölünüp bir parçasının sona atılması alışılmadık geliyor. Almancada gövde ikinci sırada, önek sonda.",
        },
        en: {
          options: [
            "Ich aufstehe um 6 Uhr.",
            "Ich stehe um 6 Uhr auf.",
            "Ich stehe auf um 6 Uhr.",
            "Um 6 Uhr ich stehe auf.",
          ],
          answer: 1,
          why: "İngilizcede `get up` iki sözcük ama yan yana durur, o yüzden `Ich stehe auf um 6 Uhr` doğru görünür. Almancada önek cümlenin sonuna atılır: `… um 6 Uhr auf`.",
        },
      },
    },
    {
      id: "de-a1-w02-g2",
      block: "grammar",
      stem: "Du ___ um 7 Uhr auf.",
      options: ["stehen", "steht", "stehe", "stehst"],
      answer: 3,
      why: "Düzenli fiiller `du` ile `-st` alır: du stehst, du arbeitest, du lernst.",
      targets: ["verb.praesens", "verb.2sg"],
    },
    {
      id: "de-a1-w02-g3",
      block: "grammar",
      stem: "___ Abend lese ich ein Buch.",
      options: ["Um", "An", "Am", "In"],
      answer: 2,
      why: "Günün bölümleri `am` ile kurulur: am Abend, am Tag. Saat ise `um` ile: um 6 Uhr. `am` aslında `an dem`in kısası.",
      targets: ["praeposition.zeit"],
      byNative: {
        en: {
          options: ["Um", "An", "Am", "In"],
          answer: 2,
          why: "İngilizcede `in the evening` deniyor, o yüzden `In` doğru görünür. Almancada günün bölümü `am` ister; `in` ay ve mevsimlerle kullanılır (`im Mai`, `im Winter`).",
        },
      },
    },
    {
      id: "de-a1-w02-g4",
      block: "grammar",
      stem: "Wir ___ heute zu Hause.",
      options: ["seid", "sind", "ist", "bin"],
      answer: 1,
      why: "`wir` ile `sein` fiili `sind` olur. `seid` `ihr` için, `ist` tekil üçüncü kişi için.",
      targets: ["sein.praesens", "sein.1pl"],
    },
    {
      id: "de-a1-w02-g5",
      block: "grammar",
      stem: "___ stehst du auf?",
      options: ["Wo", "Was", "Wer", "Wann"],
      answer: 3,
      why: "Cevap bir saat olduğuna göre soru zamanı soruyor: `wann`. `wo` yeri, `wer` kişiyi sorar.",
      targets: ["fragewort.wann", "fragewort.wo"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-a1-w02-v1",
      block: "vocab",
      stem: "Ich ___ mit dem Bus zur Arbeit.",
      options: ["gehe", "stehe", "fahre", "lese"],
      answer: 2,
      why: "Bir araçla gitmek `fahren`; `gehen` yürüyerek gitmek demek. Türkçede ikisi de \"gitmek\" olduğu için ayrım görünmez.",
      targets: ["verb.fahren-gehen", "wortfeld.verkehr"],
      byNative: {
        en: {
          options: ["gehe", "stehe", "fahre", "lese"],
          answer: 2,
          why: "İngilizcede `go by bus` deniyor ve `go` = `gehen` sanılıyor. Almancada araçla gitmek `fahren`, `gehen` yalnız yürümek.",
        },
      },
    },
    {
      id: "de-a1-w02-v2",
      block: "vocab",
      stem: "Ich habe ___ Zeit, aber ich lerne Deutsch.",
      options: ["viel", "wenig", "oft", "spät"],
      answer: 1,
      why: "`aber` bir zıtlık kuruyor: zaman az olmasına RAĞMEN öğreniyor. `viel Zeit` olsaydı zıtlık kalmazdı.",
      targets: ["wortfeld.menge", "konnektor.aber"],
    },
    {
      id: "de-a1-w02-v3",
      block: "vocab",
      /* Önceki hâli "Ich ___ acht Stunden am Tag" idi ve BOZUKTU: `arbeite`
         doğru sayılıyordu ama `fahre` de tamamen doğru Almanca ("günde sekiz
         saat araba kullanıyorum"). İki şıkkı da savunulabilen bir madde ölçüm
         yapmaz. Nesne belirleyici olacak şekilde yeniden yazıldı. */
      stem: "Ich ___ Kaffee und esse Brot.",
      options: ["trinke", "fahre", "lese", "stehe"],
      answer: 0,
      why: "`Kaffee` nesnesiyle kurulan tek fiil `trinken`. Öteki üçü de çekimli ve doğru biçimde ama bu nesneyi almıyor — burada seçimi yapan dil bilgisi değil, fiilin nesnesi.",
      targets: ["verb.trinken", "wortfeld.alltag"],
    },
  ],
};

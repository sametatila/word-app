import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 4 · Ev ve çevre (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: nerede oturduğunu ve bir şeyin nerede olduğunu anlatmak —
 * `there is`/`there are`, yer edatları ve iyelik `'s`.
 *
 * ARALIKLI TEKRAR: `w04-g1` W3'ün sayılabilirlik hedefine `there is/are`
 * üzerinden dönüyor; `w04-g4` W2 ve W3'te iki kez geçen `verb.3sg-s`
 * kuralını bu kez `have`/`has` ile sınıyor — aynı kural, üçüncü bağlam.
 *
 * `far`, `near`, `because` ve sayı sözcükleri (`two`) A1 listesinde yok;
 * metin rakam ve doğrulanmış sözcüklerle kuruldu.
 */
export const EN_A1_W04: QuizWeek = {
  id: "en-a1-w04",
  course: "en",
  level: "A1",
  no: 4,
  theme: "My home",
  themeTr: "Ev ve çevre",
  canDo: ["A1.SPK.5", "A1.LS.1", "A1.RD.4", "A1.GR.1", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Description",
      genreTr: "Tanıtım",
      title: "My home",
      body:
        "I live in a small house in the city. The house has 2 rooms. " +
        "My room is small but good. There is a bed and a table. " +
        "My books are on the table. My dog sleeps under the bed. " +
        "The door is old. Next to the house there is a yard. My bicycle is there. " +
        "I like the house. I go to school by bicycle.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Lea", text: "Where do you live now?" },
        { speaker: "Jan", text: "I live with my mother. The house is big." },
        { speaker: "Lea", text: "Do you have a room?" },
        { speaker: "Jan", text: "Yes, my room is small but good." },
        { speaker: "Lea", text: "And where is your bicycle?" },
        { speaker: "Jan", text: "I do not have a bicycle. I go by bus." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-a1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Where are the books?",
      options: ["Under the bed", "Next to the house", "On the table", "In the yard"],
      answer: 2,
      why: "\"My books are on the table.\" Metinde dört ayrı yer bildirimi var ve her biri başka bir nesneye ait — edatı değil, edatın BAĞLANDIĞI şeyi takip etmek gerekiyor.",
      targets: ["reading.detail", "preposition.place"],
    },
    {
      id: "en-a1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Where is the dog?",
      options: ["On the table", "Under the bed", "In the yard", "In the street"],
      answer: 1,
      why: "\"My dog sleeps under the bed.\" Bir önceki cümle masadan söz ediyor; iki cümle arka arkaya iki ayrı yer veriyor.",
      targets: ["reading.detail", "preposition.place"],
    },
    {
      id: "en-a1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "How does the person go to school?",
      options: ["By bicycle", "By bus", "On foot"],
      answer: 0,
      why: "Son cümle: \"I go to school by bicycle.\" Otobüs bu metinde hiç geçmiyor — dinleme parçasındaki kişi otobüse biniyor, o başka biri.",
      targets: ["reading.detail", "wordfield.transport"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-a1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Who does Jan live with?",
      options: ["With friends", "Alone", "With his mother", "With his father"],
      answer: 2,
      why: "\"I live with my mother.\" `with` + kişi, biriyle birlikte oturmayı anlatıyor.",
      targets: ["listening.detail", "preposition.with"],
    },
    {
      id: "en-a1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "How is Jan's room?",
      options: ["Big", "Small", "New", "Expensive"],
      answer: 1,
      why: "\"My room is small but good.\" `but` iki şeyi karşılaştırıyor; ev büyük, ODA küçük — sıfatı yanlış özneye bağlamamak gerekiyor.",
      targets: ["listening.detail", "connector.but"],
    },
    {
      id: "en-a1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "How does Jan go?",
      options: ["By bicycle", "By train", "By bus"],
      answer: 2,
      why: "\"I do not have a bicycle. I go by bus.\" Bisiklet konuşmada geçiyor ama OLMADIĞINI söylemek için — sözcüğü duymak yetmiyor.",
      targets: ["listening.inference", "negation.do-not"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-a1-w04-g1",
      block: "grammar",
      stem: "___ 2 books on the table.",
      options: ["It is", "They are", "There is", "There are"],
      answer: 3,
      why: "Bir şeyin varlığını bildiren yapı `there is`/`there are`; özne çoğul olduğu için `there are`. `they are` zaten bilinen bir şeyi anlatır, yeni bir şeyin varlığını değil.",
      targets: ["structure.there-is", "noun.countable"],
      byNative: {
        tr: {
          options: ["It is", "They are", "There is", "There are"],
          answer: 3,
          why: "Türkçede \"var\" tekil-çoğul ayrımı yapmaz (\"iki kitap var\"), o yüzden `there is`/`there are` seçimi görünmez bir karar. Çoğulda `there are`.",
        },
        de: {
          options: ["It is", "They are", "There is", "There are"],
          answer: 3,
          why: "Almancada `es gibt` hep aynı kalır (`es gibt zwei Bücher`); İngilizcede yapı özneye göre değişiyor: çoğulda `there are`.",
        },
      },
    },
    {
      id: "en-a1-w04-g2",
      block: "grammar",
      stem: "This is ___ room.",
      options: ["Jan", "Jans", "Jan's", "Jan is"],
      answer: 2,
      why: "İyelik `'s` ile kurulur: Jan's room. Kesme işareti olmadan yazılan `Jans` İngilizcede iyelik değil, çoğul gibi okunur.",
      targets: ["possessive.s"],
      byNative: {
        de: {
          options: ["Jan", "Jans", "Jan's", "Jan is"],
          answer: 2,
          why: "Almancada `Jans Zimmer` kesme işaretsiz yazılır ve doğrudur, o yüzden `Jans` doğru görünür. İngilizcede kesme işareti zorunlu: `Jan's`.",
        },
      },
    },
    {
      id: "en-a1-w04-g3",
      block: "grammar",
      stem: "I live ___ a small house.",
      options: ["in", "on", "at", "by"],
      answer: 0,
      why: "Bir binanın içinde oturmak `in` ile kurulur. `at` bir noktayı (at school, at work), `on` bir yüzeyi anlatır.",
      targets: ["preposition.place"],
    },
    {
      id: "en-a1-w04-g4",
      block: "grammar",
      stem: "My house ___ 2 rooms.",
      options: ["has", "have", "is", "are"],
      answer: 0,
      why: "Özne üçüncü tekil (`my house`), o yüzden `have` → `has`. Bu, W2 ve W3'teki `-s` kuralının düzensiz biçimi.",
      targets: ["verb.have-has", "verb.3sg-s"],
    },
    {
      id: "en-a1-w04-g5",
      block: "grammar",
      stem: "___ do you live?",
      options: ["When", "Where", "Who", "What"],
      answer: 1,
      why: "Cevap bir yer olduğuna göre soru sözcüğü `where`. `when` zamanı, `who` kişiyi sorar.",
      targets: ["question.where", "question.words"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-a1-w04-v1",
      block: "vocab",
      stem: "My house is not big, it is ___.",
      options: ["old", "expensive", "good", "small"],
      answer: 3,
      why: "`big`in karşıtı `small`. Öteki üç sıfat da bir evi anlatabilir ama cümle `not … , it is …` ile açık bir zıtlık kuruyor.",
      targets: ["adjective.opposite", "wordfield.home"],
    },
    {
      id: "en-a1-w04-v2",
      block: "vocab",
      stem: "I ___ in a small house in the city.",
      options: ["live", "stand", "go", "come"],
      answer: 0,
      why: "`live` bir yerde ikamet etmek demek. `stand` ayakta durmak, `come` gelmek — üçü de bir yerle kurulabilir ama anlamları başka.",
      targets: ["verb.live", "wordfield.home"],
    },
    {
      id: "en-a1-w04-v3",
      block: "vocab",
      stem: "The yard is not in the house; it is ___ the house.",
      options: ["under", "on", "in", "next to"],
      answer: 3,
      why: "Bir şeyin yanında olmak `next to`. Cümlenin ilk yarısı `in`i zaten eliyor, yani seçim içinde/üstünde değil YANINDA olmak üzerine.",
      targets: ["preposition.place", "wordfield.home"],
    },
  ],
};

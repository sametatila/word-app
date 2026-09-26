import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 1 · Tanışma (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: Almanca W1 ile AYNI yetkinlikler ve aynı blok dağılımı —
 * iki kursun aynı haftası karşılaştırılabilir olmak zorunda. Farklı olan tek
 * şey hedef dil ve çeldiricilerin dayandığı girişim.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ. Bu kursta anadiller `tr` (taban) ve `de`:
 *  - `w01-g2` (`do`-desteği): Almancada soru fiili başa alarak kurulur
 *    (`Wohnst du…?`), Türkçede soru EKİ ile. İkisinde de yardımcı fiil yok,
 *    yani iki öğrenci de "Live you in London?" kuruyor — ama biri fiili öne
 *    aldığı için, öteki ek beklediği için.
 *  - `w01-g4` (geniş zaman ↔ şimdiki zaman): Türkçede ve Almancada tek biçim
 *    var, İngilizcede ikiye ayrılıyor. Bu ayrım A1'de en çok karıştırılan şey.
 *  - `w01-v3` (`job`/`work`): Almanca `Arbeit` ikisini birden karşılıyor,
 *    Türkçe `iş` de öyle. Ayrım İngilizceye özgü, o yüzden taban açıklama da
 *    ayrımı anlatıyor.
 */
export const EN_A1_W01: QuizWeek = {
  id: "en-a1-w01",
  course: "en",
  level: "A1",
  no: 1,
  theme: "Introductions",
  themeTr: "Tanışma",
  canDo: ["A1.SPK.1", "A1.LS.5", "A1.RD.4", "A1.GR.2", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Profile",
      genreTr: "Tanıtım yazısı",
      title: "Hello!",
      body:
        "Hello! My name is Emma. I am from Ireland. I live in London now. " +
        "I am 23 years old. I am a student and I study English and music. " +
        "My family is not here. My mother and my father live in Dublin. " +
        "I have a brother. His name is Jack and he is young. " +
        "I like music and I read books. " +
        "Today I am meeting a friend in the city. We want to drink coffee and speak English.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Jack", text: "Hello, I am Jack. What is your name?" },
        { speaker: "Deniz", text: "My name is Deniz. Hello Jack!" },
        { speaker: "Jack", text: "Where are you from?" },
        { speaker: "Deniz", text: "I am from Türkiye. And you?" },
        { speaker: "Jack", text: "I am from London. And what do you do here in London?" },
        { speaker: "Deniz", text: "I learn English. I am a student." },
        { speaker: "Jack", text: "Good! Where do you live?" },
        { speaker: "Deniz", text: "I live in the city now." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-a1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Where is Emma from?",
      options: ["England", "Türkiye", "Ireland", "Scotland"],
      answer: 2,
      why: "Metin \"I am from Ireland\" diyor. London onun ŞU AN yaşadığı yer; nereli olduğu ile nerede yaşadığı ayrı iki bilgi ve metin ikisini arka arkaya veriyor.",
      targets: ["reading.detail", "question.where-from"],
    },
    {
      id: "en-a1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Who lives in Dublin?",
      options: ["Her brother", "Her parents", "Emma", "Her friend"],
      answer: 1,
      why: "\"My mother and my father live in Dublin\" — yani annesi ve babası. Metin kardeşinin nerede yaşadığını hiç söylemiyor; söylenmeyeni çıkarım yapmadan bırakmak gerekiyor.",
      targets: ["reading.detail", "wordfield.family"],
    },
    {
      id: "en-a1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "What does Emma do today?",
      options: ["She works", "She goes to Dublin", "She studies music", "She meets a friend"],
      answer: 3,
      why: "\"Today I am meeting a friend\" cümlesi bugünü anlatıyor. Music ve Dublin metinde geçiyor ama bugüne bağlı değil — doğru sözcüğü görmek yetmiyor, hangi cümlede geçtiği önemli.",
      targets: ["reading.detail", "time.today"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-a1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Where is Deniz from?",
      options: ["Türkiye", "London", "Ireland", "Dublin"],
      answer: 0,
      why: "Deniz \"I am from Türkiye\" diyor. London, Jack'in geldiği yer — iki kişi arka arkaya konuşurken hangi bilginin kime ait olduğunu takip etmek gerekiyor.",
      targets: ["listening.detail", "question.where-from"],
    },
    {
      id: "en-a1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "What does Deniz do in London?",
      options: ["Works", "Plays music", "Learns English", "Reads books"],
      answer: 2,
      why: "\"I learn English. I am a student.\" Soru mesleği değil, ne YAPILDIĞINI soruyor ve konuşmada ikisi tek nefeste geçiyor.",
      targets: ["listening.detail", "verb.learn"],
    },
    {
      id: "en-a1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Where does Deniz live now?",
      options: ["In Türkiye", "In the city", "With Jack", "In Ireland"],
      answer: 1,
      why: "Son cümle: \"I live in the city now.\" `now` sözcüğü bilginin şimdiki duruma ait olduğunu söylüyor, geldiği yere değil.",
      targets: ["listening.detail", "question.where"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-a1-w01-g1",
      block: "grammar",
      stem: "I ___ a student.",
      options: ["is", "are", "be", "am"],
      answer: 3,
      why: "`be` fiili kişiye göre değişiyor: I am, you are, he/she/it is. `I` ile her zaman `am`.",
      targets: ["verb.be", "be.1sg"],
    },
    {
      id: "en-a1-w01-g2",
      block: "grammar",
      stem: "___ you live in London?",
      options: ["Do", "Are", "Live", "Does"],
      answer: 0,
      why: "İngilizcede geniş zaman sorusu `do/does` yardımcı fiiliyle kurulur. Türkçede soru EKİ var (-mı), ayrı bir yardımcı fiil yok — o yüzden `do` unutuluyor.",
      targets: ["question.do-support"],
      byNative: {
        de: {
          options: ["Do", "Are", "Live", "Does"],
          answer: 0,
          why: "Almancada soru, fiili başa alarak kurulur (`Wohnst du in London?`), bu yüzden `Live you in London?` doğru görünür. İngilizcede bunun yerine `do` yardımcı fiili gelir ve asıl fiil yalın kalır.",
        },
      },
    },
    {
      id: "en-a1-w01-g3",
      block: "grammar",
      stem: "My brother ___ in Dublin.",
      options: ["live", "lives", "living", "is live"],
      answer: 1,
      why: "Üçüncü tekil kişide fiile `-s` eklenir: he/she/it lives. Türkçede kişiye göre ek fiile zaten geliyor ama İngilizcede DEĞİŞEN TEK kişi bu, o yüzden gözden kaçıyor.",
      targets: ["verb.3sg-s"],
      byNative: {
        de: {
          options: ["live", "lives", "living", "is live"],
          answer: 1,
          why: "Almancada her kişi ayrı çekiliyor (`ich wohne, du wohnst, er wohnt`), İngilizcede ise yalnız üçüncü tekil değişiyor. Tek istisna olduğu için unutulması kolay: `he lives`.",
        },
      },
    },
    {
      id: "en-a1-w01-g4",
      block: "grammar",
      /* `every day` yazılıydı: `day` İngilizce kelime listesinde HİÇ yok
         (kontrol betiği yakaladı). Alışkanlığı `always` ile kuruyoruz — o A1'de. */
      stem: "I ___ coffee in the morning.",
      options: ["am drinking", "drinks", "drink", "drinking"],
      answer: 2,
      why: "Alışkanlık bildiren cümle geniş zaman ister (`drink`); `am drinking` şu anda sürmekte olanı anlatır. Türkçede ikisi de \"içerim/içiyorum\" olabildiği için ayrım görünmez.",
      targets: ["tense.present-simple", "tense.present-continuous"],
      byNative: {
        de: {
          options: ["am drinking", "drinks", "drink", "drinking"],
          answer: 2,
          why: "Almancada tek bir şimdiki zaman var (`ich trinke`), İngilizcede ikiye ayrılıyor. Cümle alışkanlık bildirdiği için geniş zaman: `drink`.",
        },
      },
    },
    {
      id: "en-a1-w01-g5",
      block: "grammar",
      stem: "___ are you from?",
      options: ["Who", "What", "How", "Where"],
      answer: 3,
      why: "`where` yer sorar. Cevap bir ülke ya da şehir olduğuna göre soru sözcüğü `where` olmalı.",
      targets: ["question.where", "question.words"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-a1-w01-v1",
      block: "vocab",
      stem: "My mother and my father are my ___.",
      options: ["children", "people", "parents", "friends"],
      answer: 2,
      why: "`parents` anne ve babanın ikisi birden demek ve yalnız çoğul kullanılır. `people` genel olarak insanlar, akrabalık bildirmez.",
      targets: ["wordfield.family", "noun.parents"],
    },
    {
      id: "en-a1-w01-v2",
      block: "vocab",
      stem: "— What is your ___? — My name is Emma.",
      options: ["name", "city", "year", "school"],
      answer: 0,
      why: "Cevap bir isim olduğuna göre soru `name` sormuş olmalı. Şıkların hepsi tanışma alanından; ayırt eden şey cevabın kendisi.",
      targets: ["wordfield.introduction", "noun.name"],
    },
    {
      id: "en-a1-w01-v3",
      block: "vocab",
      stem: "— What is your ___? — I am a teacher.",
      options: ["work", "job", "school", "study"],
      answer: 1,
      why: "`job` sayılabilir bir meslek; `work` ise genel olarak çalışma ve sayılamaz, o yüzden `What is your work?` kurulmaz. Türkçede ikisi de \"iş\" olduğu için ayrım görünmez.",
      targets: ["wordfield.job", "noun.job-work"],
      byNative: {
        de: {
          options: ["work", "job", "school", "study"],
          answer: 1,
          why: "Almanca `Arbeit` hem mesleği hem çalışmayı karşılıyor; İngilizcede meslek sorulurken `job` kullanılır. `work` sayılamaz bir isim, `a work` denmez.",
        },
      },
    },
  ],
};

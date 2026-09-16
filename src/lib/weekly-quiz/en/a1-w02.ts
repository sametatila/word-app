import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 2 · Günlük rutin (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: Almanca W2 ile aynı yetkinlikler — bir günü anlatmak. Hedef
 * dilin kendi zorlukları başka: burada geniş zaman üçüncü tekil `-s`, zaman
 * edatları (`at`/`in`) ve sıklık zarflarının cümledeki YERİ ölçülüyor.
 *
 * ARALIKLI TEKRAR: `w02-g1` W1'in `verb.3sg-s` hedefine, `w02-g3` ise
 * `question.do-support` hedefine yeni bir bağlamda dönüyor.
 *
 * `day`, `evening`, `night` ve `week` İngilizce A1 listesinde YOK (ölçüldü);
 * metin bu yüzden `morning` ve saatlerle kuruldu. W1'de tam bu tuzağa
 * düşülmüştü — kontrol betiği yakaladı.
 */
export const EN_A1_W02: QuizWeek = {
  id: "en-a1-w02",
  course: "en",
  level: "A1",
  no: 2,
  theme: "My routine",
  themeTr: "Günlük rutin",
  canDo: ["A1.SPK.4", "A1.LS.2", "A1.RD.5", "A1.GR.2", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Blog",
      genreTr: "Blog yazısı",
      title: "My routine",
      body:
        "I get up at 6 in the morning. I have breakfast and drink coffee. " +
        "Then I go to work by bus. I work from 8 to 4. " +
        "Then I go to my house and read a book. " +
        "Sometimes I meet friends in the city. " +
        "I do not have much time, but I learn English at school. " +
        "I always sleep late.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Ben", text: "When do you get up?" },
        { speaker: "Mia", text: "I get up early, at 5. And you?" },
        { speaker: "Ben", text: "I get up at 7. Why do you get up early?" },
        { speaker: "Mia", text: "I work from 6 to 2." },
        { speaker: "Ben", text: "And then?" },
        { speaker: "Mia", text: "Then I am at my house. I read or play music." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-a1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "When does the person get up?",
      options: ["At 8", "At 6", "At 4", "At 5"],
      answer: 1,
      why: "\"I get up at 6 in the morning.\" Metinde dört saat geçiyor (6, 8, 4, ve `late`) ve her biri başka bir işe ait.",
      targets: ["reading.detail", "time.clock"],
    },
    {
      id: "en-a1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "How does the person go to work?",
      options: ["By train", "By bus", "On foot"],
      answer: 1,
      why: "\"Then I go to work by bus.\" Öteki iki seçenek metinde hiç geçmiyor.",
      targets: ["reading.detail", "wordfield.transport"],
    },
    {
      id: "en-a1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Where does the person learn English?",
      options: ["At work", "In the city", "At school", "At home"],
      answer: 2,
      why: "\"…but I learn English at school.\" Şehir ve iş metinde geçiyor ama başka cümlelerde — sözcüğü görmek yetmiyor.",
      targets: ["reading.detail", "question.where"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-a1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "When does Mia get up?",
      options: ["At 7", "At 6", "At 5", "At 2"],
      answer: 2,
      why: "Mia \"at 5\" diyor. 7 Ben'in kalkma saati, 6 ve 2 Mia'nın çalışma saatleri — dört sayı da konuşmada var.",
      targets: ["listening.detail", "time.clock"],
    },
    {
      id: "en-a1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Why does Mia get up early?",
      options: ["She plays music", "She learns English", "She works early", "She reads books"],
      answer: 2,
      why: "\"Why…?\" sorusunun cevabı hemen ardından geliyor: \"I work from 6 to 2.\" Sebep açıkça söylenmiyor, saatten çıkarılıyor.",
      targets: ["listening.inference", "question.why"],
    },
    {
      id: "en-a1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "What does Mia do after work?",
      options: ["She works", "She is at her house", "She goes to school", "She gets up"],
      answer: 1,
      why: "\"Then I am at my house. I read or play music.\" `then` işten sonrasını gösteriyor.",
      targets: ["listening.detail", "time.sequence"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-a1-w02-g1",
      block: "grammar",
      stem: "My friend ___ up at 7.",
      options: ["get", "gets", "getting", "is get"],
      answer: 1,
      why: "Üçüncü tekil kişide fiile `-s` eklenir: he/she/my friend gets. Özne bir kişi adı ya da `my friend` olunca bu kolayca unutuluyor.",
      targets: ["verb.3sg-s", "tense.present-simple"],
      byNative: {
        de: {
          options: ["get", "gets", "getting", "is get"],
          answer: 1,
          why: "Almancada her kişi ayrı çekiliyor, İngilizcede yalnız üçüncü tekil. Tek istisna olduğu için unutuluyor: `my friend gets`.",
        },
      },
    },
    {
      id: "en-a1-w02-g2",
      block: "grammar",
      stem: "I get up ___ 6 ___ the morning.",
      options: ["at / in", "in / at", "on / at", "at / on"],
      answer: 0,
      why: "Saat `at` ile, günün bölümü `in` ile kurulur: at 6, in the morning. `on` yalnız günlerde kullanılır.",
      targets: ["preposition.time"],
      byNative: {
        de: {
          options: ["at / in", "in / at", "on / at", "at / on"],
          answer: 0,
          why: "Almancada ikisi de `um`/`am` ile kurulup benzer görünüyor (`um 6`, `am Morgen`). İngilizcede saat `at`, günün bölümü `in` ister.",
        },
      },
    },
    {
      id: "en-a1-w02-g3",
      block: "grammar",
      stem: "___ your friend work in the city?",
      options: ["Do", "Is", "Works", "Does"],
      answer: 3,
      why: "Üçüncü tekil öznede soru `does` ile kurulur ve asıl fiil YALIN kalır: does … work. `do` yalnız I/you/we/they ile.",
      targets: ["question.do-support", "verb.3sg-s"],
      byNative: {
        de: {
          options: ["Do", "Is", "Works", "Does"],
          answer: 3,
          why: "Almancada soru fiili başa alarak kurulur (`Arbeitet dein Freund…?`), o yüzden `Works your friend…?` doğru görünür. İngilizcede `does` gelir ve çekim ona geçer.",
        },
      },
    },
    {
      id: "en-a1-w02-g4",
      block: "grammar",
      stem: "Which sentence is correct?",
      options: [
        "I sleep always late.",
        "Always I sleep late.",
        "I always sleep late.",
        "I sleep late always.",
      ],
      answer: 2,
      why: "`always`, `sometimes`, `often` gibi sıklık zarfları asıl fiilden ÖNCE gelir: I always sleep. Tek istisna `be` fiilidir, o zaman sonra gelir (`I am always late`).",
      targets: ["adverb.frequency", "word-order.adverb"],
      byNative: {
        de: {
          options: [
            "I sleep always late.",
            "Always I sleep late.",
            "I always sleep late.",
            "I sleep late always.",
          ],
          answer: 2,
          why: "Almancada zarf fiilden sonra durur (`Ich schlafe immer spät`), o yüzden `I sleep always late` doğru görünür. İngilizcede sıklık zarfı fiilden önce gelir.",
        },
      },
    },
    {
      id: "en-a1-w02-g5",
      block: "grammar",
      stem: "___ do you get up?",
      options: ["Where", "What", "Who", "When"],
      answer: 3,
      why: "Cevap bir saat olduğuna göre soru zamanı soruyor: `when`. `where` yeri, `who` kişiyi sorar.",
      targets: ["question.when", "question.words"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-a1-w02-v1",
      block: "vocab",
      /* Önceki hâli "I ___ breakfast at 7" idi ve BOZUKTU: `have` doğru
         sayılıyordu ama `eat breakfast` da tamamen doğru İngilizce. Yerine
         gerçekten belirleyici bir eşdizim kondu — ve bu yenisi üstelik her iki
         anadilde de aynı hatayı üretiyor, yani ölçtüğü şey daha değerli. */
      stem: "I ___ my homework in the morning.",
      options: ["do", "make", "have", "take"],
      answer: 0,
      why: "`homework` ile kullanılan fiil `do`. Türkçe 'yapmak' hem `do` hem `make` karşıladığı için `make homework` doğru görünüyor, ama `make` bir şeyi ÜRETMEK demek — ödev üretilmez, yapılır.",
      targets: ["collocation.do-make", "wordfield.routine"],
      byNative: {
        de: {
          options: ["do", "make", "have", "take"],
          answer: 0,
          why: "Almanca `Hausaufgaben machen` → `make homework` aktarımı. `machen` İngilizcede ikiye ayrılıyor: üretmek `make`, bir işi yerine getirmek `do`. Ödev `do` alır.",
        },
      },
    },
    {
      id: "en-a1-w02-v2",
      block: "vocab",
      stem: "I do not have ___ time, but I learn English.",
      options: ["many", "much", "often", "late"],
      answer: 1,
      why: "`time` sayılamaz bir isim, o yüzden `much` alır. `many` sayılabilir isimlerle kullanılır (many books).",
      targets: ["quantifier.much-many", "wordfield.quantity"],
      byNative: {
        de: {
          options: ["many", "much", "often", "late"],
          answer: 1,
          why: "Almancada `viel`/`viele` ayrımı var ama sayılabilirlik İngilizcedeki kadar sıkı değil. `time` sayılamaz: `much time`.",
        },
      },
    },
    {
      id: "en-a1-w02-v3",
      block: "vocab",
      stem: "I go to work ___ bus.",
      options: ["with", "in", "by", "on"],
      answer: 2,
      why: "Ulaşım aracı `by` ile kurulur: by bus, by train. `with` kişiyle birlikte olmayı anlatır (`with friends`).",
      targets: ["preposition.transport", "wordfield.transport"],
      byNative: {
        de: {
          options: ["with", "in", "by", "on"],
          answer: 2,
          why: "Almancada `mit dem Bus` deniyor ve `mit` = `with` sanılıyor. İngilizcede ulaşım aracı `by` ister.",
        },
      },
    },
  ],
};

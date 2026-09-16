import type { QuizWeek } from "../types";

/**
 * İngilizce A2, hafta 1 — geçmişi anlatmak.
 *
 * Omurga: past simple (düzensiz fiil, `did` ile soru), past continuous ile
 * kesilen eylem ve `ago`. Almanca anadilli için asıl tuzak Perfekt'i İngilizceye
 * taşımak (`yesterday I have met`) ve fiili başa alarak soru kurmak; Türk
 * öğrenci için düzensiz fiile `-ed` eklemek ve `önce` → `before`.
 */
export const EN_A2_W01: QuizWeek = {
  id: "en-a2-w01",
  course: "en",
  level: "A2",
  no: 1,
  theme: "Telling stories about the past",
  themeTr: "Geçmişi anlatmak",
  canDo: ["A2.GR.11", "A2.GR.12", "A2.LS.3"],
  stimuli: [
    {
      kind: "text",
      id: "en-a2-w01-t1",
      genre: "Blog post",
      genreTr: "blog yazısı",
      title: "A terrible Friday",
      body:
        "Last Friday was a terrible day. My alarm clock didn't ring, so I woke up late. " +
        "I ran to the bus stop, but the bus left just before I arrived. " +
        "While I was waiting for the next bus, it started to rain, and I didn't have an umbrella. " +
        "When I finally got to the office, my boss was already in the meeting. " +
        "After work I wanted to relax, so I went to my favourite restaurant. But it was closed! " +
        "In the end I bought a pizza and ate it on the sofa at home. " +
        "It wasn't a great day, but the pizza was really good, and I slept for ten hours.",
    },
    {
      kind: "audio",
      id: "en-a2-w01-a1",
      genre: "Conversation",
      genreTr: "sohbet",
      plays: 2,
      segments: [
        { speaker: "Tom", text: "Hi Lisa! How was your holiday in Spain?" },
        { speaker: "Lisa", text: "Great, thanks! We stayed in a small hotel near the beach." },
        { speaker: "Tom", text: "Did you have good weather?" },
        { speaker: "Lisa", text: "Yes, but it rained on the first day, so we went to a museum." },
        { speaker: "Tom", text: "And what did you do on the other days?" },
        { speaker: "Lisa", text: "We swam in the sea every morning. One day, while we were swimming, my brother lost his glasses!" },
        { speaker: "Tom", text: "Oh no! Did he find them?" },
        { speaker: "Lisa", text: "No, he didn't. He had to buy new ones in the town." },
      ],
    },
  ],
  items: [
    // ── Okuma ──────────────────────────────────────────────────────────
    {
      id: "en-a2-w01-r1",
      block: "read",
      ref: "en-a2-w01-t1",
      stem: "Why did the writer miss the bus?",
      options: ["It started to rain.", "The boss called.", "The writer woke up late.", "The bus was early."],
      answer: 2,
      why: "Metin bir sebep-sonuç zinciri kuruyor: saat çalmadı → geç uyandı → otobüsü kaçırdı. Yağmur otobüsü beklerken başladı, yani kaçırmanın sonucu, sebebi değil. `so` ve `while` olayların sırasını gösteriyor.",
      targets: ["reading.detail", "past.continuous"],
    },
    {
      id: "en-a2-w01-r2",
      block: "read",
      ref: "en-a2-w01-t1",
      stem: "Where did the writer have dinner?",
      options: ["at home", "at the favourite restaurant", "at the office", "at a friend's home"],
      answer: 0,
      why: "`wanted to relax, so I went to…` bir planı anlatıyor, ama hemen sonraki `But it was closed!` planı bozuyor. Restorana gitmek olmuş, orada yemek olmamış; `But` ile gelen cümleyi atlayınca plan sonuç gibi okunuyor.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w01-r3",
      block: "read",
      ref: "en-a2-w01-t1",
      stem: "Which sentence is true?",
      options: ["The writer had an umbrella.", "The restaurant was open.", "The pizza was not good.", "The writer got wet at the bus stop."],
      answer: 3,
      why: "Metin 'ıslandım' demiyor; yağmur başladı ve şemsiye yoktu, iki bilgiyi birleştirmek gerekiyor. Öteki üç seçenek metindeki bir cümleyi tersine çeviriyor (`didn't have`, `was closed`, `really good`): olumsuzluğu atlayarak okumak tipik hata.",
      targets: ["reading.inference"],
    },
    // ── Dinleme ────────────────────────────────────────────────────────
    {
      id: "en-a2-w01-l1",
      block: "listen",
      ref: "en-a2-w01-a1",
      stem: "What did Lisa do on the first day?",
      options: ["She swam in the sea.", "She went to a museum.", "She bought new glasses.", "She stayed at the hotel."],
      answer: 1,
      why: "`so` bir sonuç getirir: yağmur yağdı, bu yüzden müzeye gittiler. Denizde yüzmek `every morning` ile anlatılan olağan düzen; ilk gün yağmur bu düzeni bozdu. Tekrarlanan etkinliği tek bir güne yapıştırmak dinlemede sık hata.",
      targets: ["listening.detail"],
    },
    {
      id: "en-a2-w01-l2",
      block: "listen",
      ref: "en-a2-w01-a1",
      stem: "What happened while they were swimming?",
      options: ["It started to rain.", "Her brother found his glasses.", "Her brother lost his glasses.", "They went to the town."],
      answer: 2,
      why: "`while we were swimming` süren arka plan eylemi, `lost` o sırada olan kısa olay. Gözlük bulunmadı (`No, he didn't`); kasabaya gidiş ise sonradan, yeni gözlük almak için.",
      targets: ["listening.detail", "past.continuous"],
    },
    {
      id: "en-a2-w01-l3",
      block: "listen",
      ref: "en-a2-w01-a1",
      stem: "Did her brother find his glasses?",
      options: ["Yes, in the sea.", "No, he bought new ones.", "Yes, in the town.", "No, but Lisa found them."],
      answer: 1,
      why: "`No, he didn't` kısa cevabı `Did he find them?` sorusunu olumsuzluyor. `in the town` yeni gözlüğün alındığı yer, eskisinin bulunduğu yer değil; yer adını duyup soruya bağlamak tuzak.",
      targets: ["listening.detail", "past.did_question"],
    },
    // ── Dilbilgisi ─────────────────────────────────────────────────────
    {
      id: "en-a2-w01-g1",
      block: "grammar",
      stem: "Yesterday I ___ my friend in the park.",
      options: ["meet", "met", "meeted", "have met"],
      answer: 1,
      why: "Belli bir geçmiş zaman (`yesterday`) past simple ister ve `meet` düzensizdir: `met`. Türkçede '-di' eki her fiile aynı biçimde eklendiği için düzensiz fiile de `-ed` eklenebileceği sanılıyor.",
      targets: ["past.irregular", "tense.past_vs_present_perfect"],
      byNative: {
        de: {
          options: ["have met", "meet", "met", "meeted"],
          answer: 2,
          why: "Almancada `Gestern habe ich … getroffen` doğal, çünkü konuşmada geçmiş Perfekt'le anlatılır. İngilizcede `yesterday` gibi bitmiş bir zaman `have met`i dışarıda bırakır: yalnız past simple.",
        },
      },
    },
    {
      id: "en-a2-w01-g2",
      block: "grammar",
      stem: "Which question is correct?",
      options: [
        "Did you see the film last night?",
        "Did you saw the film last night?",
        "Have you seen the film last night?",
        "You saw the film last night?",
      ],
      answer: 0,
      why: "Geçmiş zaman sorusu `did` + yalın fiil ile kurulur. Zamanı `did` taşıdığı için ana fiil ikinci kez geçmiş olmaz (`saw` değil `see`). Türkçede soru eki fiile yapıştığı için ayrı bir yardımcı fiil gereği görünmüyor.",
      targets: ["past.did_question", "question.do_support"],
      byNative: {
        de: {
          options: [
            "Saw you the film last night?",
            "Did you see the film last night?",
            "Have you seen the film last night?",
            "Did you saw the film last night?",
          ],
          answer: 1,
          why: "Almancada soru fiili başa alarak kurulur (`Sahst du den Film?`). İngilizcede ana fiil başa geçmez; `do`/`did` desteği gerekir. `last night` bitmiş zaman olduğu için `Have you seen` de olmaz.",
        },
      },
    },
    {
      id: "en-a2-w01-g3",
      block: "grammar",
      stem: "While I ___ dinner, the phone rang.",
      options: ["am cooking", "were cooking", "cook", "was cooking"],
      answer: 3,
      why: "Kısa bir olay (`rang`) sürmekte olan bir eylemi böldüğünde, süren eylem `was/were + -ing` olur. Özne `I` olduğu için `was`; `were` you, we ve they ile gelir. `am cooking` şimdiki zaman, cümle ise geçmişte.",
      targets: ["past.continuous"],
      byNative: {
        de: {
          options: ["cook", "was cooking", "am cooking", "were cooking"],
          answer: 1,
          why: "Almancada süren geçmiş için ayrı bir biçim yok (`Während ich kochte`). İngilizcede arka planda süren eylem `was cooking` ile işaretlenir; olayın kendisi (`rang`) past simple kalır.",
        },
      },
    },
    {
      id: "en-a2-w01-g4",
      block: "grammar",
      stem: "I started this job three years ___.",
      options: ["before", "ago", "since", "for"],
      answer: 1,
      why: "Bugünden geriye sayılan geçmiş an `ago` ile anlatılır ve süreden sonra gelir. 'Üç yıl önce'deki 'önce' `before` diye çevriliyor ama `before` başka bir olaydan önceyi anlatır, bugünden değil.",
      targets: ["time.ago"],
      byNative: {
        de: {
          options: ["since", "for", "ago", "before"],
          answer: 2,
          why: "Almanca `vor drei Jahren`de `vor` başta, İngilizce `ago` sonda. `since` Almanca `seit` gibi görünür ama bitmiş bir anla (`started`) gelmez; `for` da süre ölçer.",
        },
      },
    },
    {
      id: "en-a2-w01-g5",
      block: "grammar",
      stem: "There ___ a lot of people at the party last night.",
      options: ["was", "had", "were", "are"],
      answer: 2,
      why: "`there was/were` arkasındaki isme uyar ve `people` çoğuldur, tekil görünse de. Türkçe 'vardı' tekil ile çoğul arasında ayrım yapmadığı için `was` seçiliyor.",
      targets: ["past.was_were"],
      byNative: {
        de: {
          options: ["was", "had", "were", "are"],
          answer: 2,
          why: "Almanca `es gab` her isimle aynı kalır. İngilizcede `there was/were` arkasındaki isme uyar ve `people` çoğul: `there were`.",
        },
      },
    },
    // ── Sözcük ─────────────────────────────────────────────────────────
    {
      id: "en-a2-w01-v1",
      block: "vocab",
      stem: "We ___ a lot of photos on holiday.",
      options: ["made", "pulled", "took", "did"],
      answer: 2,
      why: "İngilizcede fotoğraf 'alınır': `take photos`. Türkçe 'çekmek'ten `pulled`, 'yapmak'tan `made` geliyor. Kalıbın fiili sözcük sözcük çeviriyle bulunmaz.",
      targets: ["collocation.take"],
      byNative: {
        de: {
          options: ["made", "pulled", "took", "did"],
          answer: 2,
          why: "Almanca `Fotos machen`den `made photos` aktarılıyor. İngilizce kalıp `take photos`; fiil dile göre değişiyor.",
        },
      },
    },
    {
      id: "en-a2-w01-v2",
      block: "vocab",
      stem: "She ___ me a funny story about her trip.",
      options: ["said", "told", "spoke", "talked"],
      answer: 1,
      why: "`tell` kime anlatıldığını doğrudan alır (`told me`), `say` almaz (`said to me`). Hikâye anlatmak da `tell a story`. Türkçede iki fiil de kişiyi '-e' ile aldığı için fark görünmüyor.",
      targets: ["lex.say_tell"],
      byNative: {
        de: {
          options: ["told", "said", "spoke", "talked"],
          answer: 0,
          why: "Almanca `sagen` → `say` ve `erzählen` → `tell`: hikâye anlatmak `tell a story`. `said me` İngilizcede kurulamaz, kişiden önce `to` gerekir.",
        },
      },
    },
    {
      id: "en-a2-w01-v3",
      block: "vocab",
      stem: "I got to the station late and ___ my train.",
      options: ["lost", "forgot", "left", "missed"],
      answer: 3,
      why: "Bir aracı ya da fırsatı kaçırmak `miss`; `lose` bir eşyayı kaybetmek, `leave` bir yerden ayrılmak. 'Kaçırmak' ile 'kaybetmek' yakın sezildiği için `lost` seçiliyor.",
      targets: ["lex.miss"],
      byNative: {
        de: {
          options: ["lost", "missed", "forgot", "left"],
          answer: 1,
          why: "Almanca `verpassen` → `miss`, `verlieren` → `lose`. `lost my train` treni bir eşya gibi kaybetmek olur.",
        },
      },
    },
  ],
};

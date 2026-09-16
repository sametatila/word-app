import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 2 · Medya ve haberler (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: bir yerel haberde sebebi sonradan gelen durumdan ayırmak,
 * aktarılan sözü (`said that … would`) ve bir kişinin görüşünü okumak; bir
 * sohbette bir paylaşımın kaynağını ve çürütülmesini izlemek. Dilbilgisi:
 * edilgen çatı (`was built`, `by`), dolaylı anlatımda zaman kayması ve
 * `say`/`tell`.
 *
 * ARALIKLI TEKRAR: `w02-g4` W1'in `tense.past-vs-present-perfect` hedefine
 * edilgen bir cümleyle dönüyor (`has been shared … since last night`).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g2` (`by`): Türkçede `şehir tarafından` doğru eşleşiyor ama
 *    `şehirden ödenecek` de doğal ve `from` getiriyor; Almanca `von` ise hem
 *    `from` hem `of`.
 *  - `w02-g3` (backshift): Türkçede aktarılan sözün zamanı değişmiyor;
 *    Almanca dolaylı anlatım Konjunktiv I ile kuruluyor ve zamanı kaydırmıyor.
 *  - `w02-g5` (`told`): iki dilde de TEK fiil var (`söylemek`, `sagen`) ve
 *    kişi nesnesi Türkçede `-e`, Almancada Dativ ile geliyor — `said reporters`.
 *  - `w02-v3` (`announce`): Türkçe `bildirmek`, Almanca `mitteilen/informieren`
 *    → `was informed`.
 */
export const EN_B1_W02: QuizWeek = {
  id: "en-b1-w02",
  course: "en",
  level: "B1",
  no: 2,
  theme: "Media and the news",
  themeTr: "Medya ve haberler",
  canDo: ["B1.LS.2", "B1.RD.3", "B1.LS.1", "B1.GR.16", "B1.GR.17", "B1.GR.11"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Local news report",
      genreTr: "Yerel haber",
      title: "Old cinema to become a youth center",
      body:
        "The old Rex Cinema on Market Street, which was built in 1932, is going to become a youth center. " +
        "The plan was announced on Monday after a long discussion.\n\n" +
        "The cinema was closed ten years ago because too few people were buying tickets. " +
        "Since then, the building has been empty, and many people in the area have complained that it looks dangerous.\n\n" +
        "The project will cost a lot of money. Most of it will be paid by the city, but local businesses have also promised to help. " +
        "The mayor said that the work would start in March and that the center would open one year later.\n\n" +
        "Not everyone is happy. Some neighbors told reporters that they were worried about noise in the evenings. " +
        "Others said they would prefer a new cinema. " +
        "\"Young people in this town have nowhere to go,\" said Sara Malik, 17, who wrote to the mayor about the idea last year. " +
        "\"This is the best news I have heard for a long time.\"\n\n" +
        "The city has promised to talk to the neighbors before the plans are finished.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation",
      genreTr: "Sohbet",
      plays: 2,
      segments: [
        { speaker: "Leo", text: "Have you seen this? It says a big snake has escaped from the zoo and was seen near the river." },
        { speaker: "Emma", text: "A snake? In the city? Where did you read that?" },
        { speaker: "Leo", text: "Someone posted it last night. It has been shared by lots of people already." },
        { speaker: "Emma", text: "That doesn't mean it's true. Is there a photo?" },
        { speaker: "Leo", text: "Yes, but it's quite dark. It could also be a piece of old plastic." },
        { speaker: "Emma", text: "Look, the local newspaper wrote about it this morning. The zoo said that no animals had escaped." },
        { speaker: "Leo", text: "Oh. So someone invented the whole story?" },
        { speaker: "Emma", text: "Probably. The article says the photo was taken two years ago in another country." },
        { speaker: "Leo", text: "Wow. And I almost sent it to my mother." },
        { speaker: "Emma", text: "Well, now you know: check first, share later." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Why was the cinema closed?",
      options: [
        "The building looked dangerous.",
        "Not enough people were buying tickets.",
        "The city needed the money.",
        "Neighbors complained about noise.",
      ],
      answer: 1,
      why: "Sebep `because` ile veriliyor. Binanın tehlikeli görünmesi `Since then` ile gelen, kapandıktan SONRAKİ durum; gürültü endişesi ise gelecekteki gençlik merkezi için. Metindeki olumsuz bilgilerin hangi zamana ait olduğunu ayırmak gerekiyor.",
      targets: ["reading.detail", "tense.past-vs-present-perfect"],
    },
    {
      id: "en-b1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "What did the mayor say?",
      options: [
        "The work would start in March.",
        "The work had already started.",
        "The center would open in March.",
        "The neighbors would decide about the plan.",
      ],
      answer: 0,
      why: "Aktarılan sözde `would start`, başkanın o anki `will start` sözünün geriye kaymış hâli: gelecek bir plan. `had started` bitmiş bir iş olurdu. Mart başlangıç tarihi, açılış değil; açılış `one year later`.",
      targets: ["reading.detail", "reported.backshift"],
    },
    {
      id: "en-b1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "What does Sara Malik think about the plan?",
      options: [
        "She would prefer a new cinema.",
        "She is worried about noise.",
        "She wants to talk to the neighbors first.",
        "She thinks it is very good news.",
      ],
      answer: 3,
      why: "Sara'nın görüşü tırnak içinde, kendi sözleriyle: `the best news I have heard for a long time`. Yeni sinema ve gürültü `Others`/`Some neighbors`a ait; komşularla konuşma sözünü ise şehir veriyor. Haberde her görüşün kime ait olduğunu izlemek gerekiyor.",
      targets: ["reading.opinion"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Where did Leo first see the story?",
      options: [
        "in the local newspaper",
        "on the zoo's website",
        "in a post online",
        "on the TV news",
      ],
      answer: 2,
      why: "`Someone posted it last night`: ilk kaynak bir paylaşım. Yerel gazete bu sabah yazdı ve hikâyeyi ÇÜRÜTTÜ. İki kaynak konuşmada geçiyor; sorunun `first` sözcüğü hangisinin önce geldiğini soruyor.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "What did the zoo say?",
      options: [
        "A snake had escaped.",
        "They would look for the snake.",
        "The photo was taken at the zoo.",
        "No animals had escaped.",
      ],
      answer: 3,
      why: "`The zoo said that no animals had escaped`: dolaylı anlatımda past perfect, `No animals escaped` sözünün geriye kaymış hâli. Olumsuzluk özneye bağlı (`no animals`), fiilde değil; dinlerken kolayca kaçıyor.",
      targets: ["listening.detail", "reported.backshift"],
    },
    {
      id: "en-b1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "What is true about the photo?",
      options: [
        "It was taken last night.",
        "Leo sent it to his mother.",
        "It was taken two years ago in a different country.",
        "It shows a snake near the river.",
      ],
      answer: 2,
      why: "`the photo was taken two years ago`: edilgen geçmiş, çekildiği zaman ve yer belli. `last night` paylaşımın zamanı, fotoğrafın değil. `almost sent` ise Leo'nun fotoğrafı GÖNDERMEDİĞİNİ söylüyor.",
      targets: ["listening.detail", "passive.past"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b1-w02-g1",
      block: "grammar",
      stem: "The Rex Cinema ___ in 1932.",
      options: ["was built", "built", "has built", "is built"],
      answer: 0,
      why: "Sinema inşa EDİLEN şey, yani edilgen gerekiyor: `be` + fiilin üçüncü hâli, bitmiş bir zaman için `was built`. `built` tek başına etken past simple ve sinemayı bir şey inşa eden özne yapar.",
      targets: ["passive.past"],
      byNative: {
        tr: {
          options: ["was built", "built", "has built", "is built"],
          answer: 0,
          why: "Türkçede edilgenlik fiile eklenen bir ekle kuruluyor (`inşa edildi`) ve ayrı bir yardımcı fiil yok. İngilizcede `be` zorunlu: `was built`. Yalnız `built` yazınca cümle `sinema bir şey inşa etti` anlamına geliyor.",
        },
      },
    },
    {
      id: "en-b1-w02-g2",
      block: "grammar",
      stem: "Most of the money will be paid ___ the city.",
      options: ["from", "of", "by", "with"],
      answer: 2,
      why: "Edilgen cümlede işi yapan `by` ile verilir. `from` bir kaynak ya da çıkış noktası bildirir, `of` bir parçayı ya da aitliği; `with` bir araç.",
      targets: ["passive.by"],
      byNative: {
        tr: {
          options: ["from", "of", "by", "with"],
          answer: 2,
          why: "Türkçede `şehirden ödenecek` de doğal bir cümle ve `-den` → `from` aktarımını getiriyor. İngilizce edilgende parayı ödeyen, yani işi YAPAN, `by` ile verilir.",
        },
        de: {
          options: ["from", "of", "by", "with"],
          answer: 2,
          why: "Almanca edilgende yapan `von` ile gelir (`von der Stadt`) ve `von` hem `from` hem `of` diye öğreniliyor. İngilizcede edilgenin yapanı yalnız `by` ile verilir.",
        },
      },
    },
    {
      id: "en-b1-w02-g3",
      block: "grammar",
      stem: "A zoo worker said, \"We checked all the animals.\" → The worker said that they ___ all the animals.",
      options: ["checks", "had checked", "has checked", "is checking"],
      answer: 1,
      why: "Aktarma fiili geçmişte (`said`) olunca aktarılan zaman bir basamak geriye kayar: past simple → past perfect. `has checked` ve `is checking` sözün söylendiği andan bugüne bakar, geçmişte söylenmiş bir sözü aktarmaz.",
      targets: ["reported.backshift"],
      byNative: {
        tr: {
          options: ["checks", "had checked", "has checked", "is checking"],
          answer: 1,
          why: "Türkçede aktarılan sözün zamanı kaymıyor: `kontrol ettiklerini söyledi`. İngilizcede `said` geçmişte olduğu için anlatılan olay ondan da önceye, past perfect'e geçer: `had checked`.",
        },
        de: {
          options: ["checks", "had checked", "has checked", "is checking"],
          answer: 1,
          why: "Almancada dolaylı anlatım zamanı kaydırmıyor, kipi değiştiriyor (`sie hätten … kontrolliert`) ve Perfekt'ten `has checked` geliyor. İngilizcede aktarma fiili geçmişteyse zaman bir basamak geriye kayar: `had checked`.",
        },
      },
    },
    {
      id: "en-b1-w02-g4",
      block: "grammar",
      stem: "The story ___ by lots of people since last night.",
      options: ["was shared", "is shared", "shared", "has been shared"],
      answer: 3,
      why: "`since last night` bugüne kadar süren bir dönemi ölçer: present perfect. Cümle edilgen olduğu için `has been` + fiilin üçüncü hâli. `was shared` dönemi kapatır ve `since` ile birleşmez.",
      targets: ["tense.past-vs-present-perfect", "present-perfect.since-for", "passive.present-perfect"],
      byNative: {
        de: {
          options: ["was shared", "is shared", "shared", "has been shared"],
          answer: 3,
          why: "Almancada `Die Geschichte wird seit gestern Abend geteilt` düz Präsens'le kuruluyor, bu da `is shared`ı çağırıyor. İngilizcede `since` ile bugüne uzanan dönem present perfect ister, edilgende `has been shared`.",
        },
        tr: {
          options: ["was shared", "is shared", "shared", "has been shared"],
          answer: 3,
          why: "Türkçede `dün akşamdan beri paylaşılıyor` şimdiki zaman, `paylaşıldı` ise geçmiş; ikisi de İngilizceye uymuyor. `since` bugüne uzanan dönemi ölçer ve present perfect ister: `has been shared`.",
        },
      },
    },
    {
      id: "en-b1-w02-g5",
      block: "grammar",
      stem: "Some neighbors ___ reporters that they were worried about noise.",
      options: ["said", "told", "talked", "spoke"],
      answer: 1,
      why: "Kişi nesnesi doğrudan geliyorsa (`reporters`) fiil `tell` olur: `tell someone that …`. `say` kişiyi doğrudan nesne almaz; `talk` ve `speak` ise `that` cümlesiyle bir söz aktarmaz.",
      targets: ["reported.say-tell"],
      byNative: {
        tr: {
          options: ["said", "told", "talked", "spoke"],
          answer: 1,
          why: "Türkçede tek fiil var: `gazetecilere söyledi`. İngilizcede kişi nesnesi varsa `tell` (`told reporters`), yoksa `say` (`said that`). `said reporters` Türkçedeki `-e söylemek` kalıbının aktarımı.",
        },
        de: {
          options: ["said", "told", "talked", "spoke"],
          answer: 1,
          why: "Almancada `sagen` kişiyi Dativ'de alır (`den Reportern sagen`), bu da `said reporters` üretiyor. İngilizcede kişi doğrudan nesne olunca fiil `tell`: `told reporters`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b1-w02-v1",
      block: "vocab",
      stem: "Many people only read the ___ and never the whole article.",
      options: ["channel", "program", "headline", "page"],
      answer: 2,
      why: "Bir haberin tamamıyla karşılaştırılan kısa, büyük yazılmış satır `headline`. `channel` ve `program` televizyon ya da radyoya aittir ve okunmaz; `page` bir makaleden daha büyük bir birim.",
      targets: ["wordfield.media"],
    },
    {
      id: "en-b1-w02-v2",
      block: "vocab",
      stem: "The photo looked real, but it was ___ taken two years ago.",
      options: ["actually", "currently", "recently", "eventually"],
      answer: 0,
      why: "Görünüşle çelişen gerçeği `actually` getirir: `but` karşıtlığı kuruyor. `currently` ve `recently` iki yıl önceki bir olayla çelişir; `eventually` bir sürecin sonunu bildirir.",
      targets: ["falsefriend.actually"],
      byNative: {
        de: {
          options: ["actually", "currently", "recently", "eventually"],
          answer: 0,
          why: "`actually` = eigentlich, in Wirklichkeit; Almanca `aktuell` İngilizcede `currently`. Cümle bir karşıtlık kuruyor (`looked real, but …`), bir zaman değil.",
        },
      },
    },
    {
      id: "en-b1-w02-v3",
      block: "vocab",
      stem: "The plan ___ on Monday after a long discussion.",
      options: ["was informed", "was told", "was noticed", "was announced"],
      answer: 3,
      why: "Bir karar ya da plan kamuya `announce` edilir. `inform` ve `tell` KİŞİYİ nesne alır (`inform people about the plan`), yani edilgende özne bilgilendirilen kişi olur, plan değil.",
      targets: ["wordfield.media", "passive.past"],
      byNative: {
        tr: {
          options: ["was informed", "was told", "was noticed", "was announced"],
          answer: 3,
          why: "Türkçede `plan bildirildi` doğal ve `bildirmek` → `inform` diye öğreniliyor. Ama `inform` kişiyi nesne alır; bir planın kamuya duyurulması `announce`.",
        },
        de: {
          options: ["was informed", "was told", "was noticed", "was announced"],
          answer: 3,
          why: "Almanca `Der Plan wurde mitgeteilt` → `was informed` aktarımı geliyor. İngilizcede `inform` bilgilendirilen kişiyi nesne alır; bir planı kamuya duyurmak `announce`.",
        },
      },
    },
  ],
};

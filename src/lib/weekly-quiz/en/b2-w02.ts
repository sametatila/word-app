import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 2 · Bilim ve teknoloji (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: plastik yiyen bir organizma üzerine bilim haberini ve uyku takip
 * uygulamaları üzerine bir podcast'i anlamak; edilgen bildirme kalıbı (`is said
 * to`), present perfect continuous, `must have`, tanımlayan ↔ tanımlamayan ilgi
 * cümlesi, soyut isimde tanımlık. Geri dönüş: `tense.past-perfect` ve
 * `conditional.third` (W1), `relative.non-defining` (W1), `style.verbal` (W1).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g1` (`is said to`): Türkçe `-miş`/`-diği söyleniyor` özneyi organizma
 *    yaptığı için etken `says` kuruluyor; Almanca `soll … produzieren` modal
 *    aktarımı `should`a götürüyor.
 *  - `w02-g3` (virgül): Almancada ilgi cümlesinin virgülü zorunlu ve anlam
 *    ayırmıyor; İngilizcede virgül 'bütün şişeler' ile 'bazı şişeler'i ayırıyor.
 *  - `w02-v3` (`Science`): Türkçede belirlilik tanımlıkla işaretlenmiyor ama
 *    öğrenci İngilizcede genelleme yaparken `the` ekliyor; Almanca `Die
 *    Wissenschaft` genel anlamda da artikelli.
 *  - `w02-v2` (`eventually`): yalnız Almanca `eventuell` için sahte dost.
 */
export const EN_B2_W02: QuizWeek = {
  id: "en-b2-w02",
  course: "en",
  level: "B2",
  no: 2,
  theme: "Science and technology",
  themeTr: "Bilim ve teknoloji",
  canDo: ["B2.GR.11", "B2.GR.13", "B2.GR.17", "B2.RD.3", "B2.LS.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Science news",
      genreTr: "Bilim haberi",
      title: "An organism that eats plastic?",
      body:
        "For decades, scientists have been searching for a way to break down plastic waste without burning it. " +
        "Now a team at a university in Japan is reported to have found a promising candidate: an organism that feeds on the type of plastic used in most drinking bottles.\n\n" +
        "The organism was discovered almost by accident. The researchers had been collecting samples outside a factory where old bottles are collected when they noticed that some bottles lying on the ground were covered in a thin layer of living cells. " +
        "Back at the university, they found that the organism produces two enzymes which, working together, turn the plastic into simple materials that can be used again.\n\n" +
        "The discovery has been widely covered in the media, and some headlines have described it as the end of the plastic problem. " +
        "The researchers themselves, however, are far more careful. The process is said to take several weeks at a temperature of around thirty degrees, which would make it too slow and too expensive for use in factories. " +
        "It is also unclear whether the organism could survive in the real world.\n\n" +
        "Other experts point out that the findings, while interesting, should not distract from the real problem. " +
        "\"Even if the process worked perfectly, it would only deal with one type of plastic,\" says an environmental scientist who was not involved in the study. " +
        "\"We need to produce less plastic in the first place.\"\n\n" +
        "Since the results were published, several companies have contacted the team. " +
        "The researchers are now trying to change the enzymes so that they work faster. They estimate that it could take at least ten years before the method is ready for use.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Podcast",
      genreTr: "Podcast",
      plays: 2,
      segments: [
        { speaker: "Host", text: "Welcome back. My guest today is Dr Amir Khan, who has been studying sleep-tracking apps for the last three years. Amir, do these apps actually work?" },
        { speaker: "Dr Khan", text: "It depends what you mean by 'work'. They're quite good at measuring how long you've been lying still. They're much less reliable when it comes to telling you how deeply you slept." },
        { speaker: "Host", text: "So the colourful graphs I see in the morning aren't accurate?" },
        { speaker: "Dr Khan", text: "Not necessarily. They're estimates. Some of the cheaper apps are thought to be wrong about half the time when it comes to deep sleep." },
        { speaker: "Host", text: "That's surprising. I've been using one for months." },
        { speaker: "Dr Khan", text: "You're not alone. And to be fair, there's a positive side: people who track their sleep tend to go to bed at more regular times." },
        { speaker: "Host", text: "Is there a negative side?" },
        { speaker: "Dr Khan", text: "There can be. We've seen patients who had slept perfectly well for years but became anxious after an app told them their sleep was poor. Some of them ended up sleeping worse." },
        { speaker: "Host", text: "Because they were worrying about the numbers?" },
        { speaker: "Dr Khan", text: "Exactly. If they hadn't looked at the data every morning, they probably wouldn't have had a problem at all." },
        { speaker: "Host", text: "So what would you recommend?" },
        { speaker: "Dr Khan", text: "Use the app to notice patterns over several weeks, not single nights. And if you feel rested, trust that feeling more than the graph." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b2-w02-r1",
      block: "read",
      ref: "t1",
      stem: "How was the organism found?",
      options: [
        "The team had been looking for it on purpose for decades.",
        "A company that collects bottles sent it to the university for tests.",
        "They noticed it on bottles while collecting samples.",
        "It was found inside a drinking bottle at the university.",
      ],
      answer: 2,
      why: "`had been collecting samples … when they noticed` arka planda süren işi ve o sırada olan keşfi birlikte anlatıyor; `almost by accident` da özel bir arama olmadığını söylüyor. Onlarca yıllık arayış bilim dünyasının genel çabası, bu ekibin değil.",
      targets: ["reading.detail", "tense.past-perfect-continuous"],
    },
    {
      id: "en-b2-w02-r2",
      block: "read",
      ref: "t1",
      stem: "How do the researchers see their discovery?",
      options: [
        "as interesting, but not yet practical",
        "as the end of the whole plastic problem, as the headlines say",
        "as ready for use in industry",
        "as a failure that should be stopped",
      ],
      answer: 0,
      why: "Manşetlerin iddiası (`the end of the plastic problem`) ile araştırmacıların tutumu `however` ile ayrılıyor: `far more careful`. `is said to take several weeks` ve `too slow and too expensive` pratikte henüz kullanılamayacağını söylüyor. Medyanın yorumunu kaynağın görüşü sanmak bilim haberlerinde tipik hata.",
      targets: ["reading.detail", "passive.reporting"],
    },
    {
      id: "en-b2-w02-r3",
      block: "read",
      ref: "t1",
      stem: "What is the environmental scientist's main point?",
      options: [
        "The organism will not survive in the real world.",
        "The study was badly designed and should be repeated.",
        "Companies should invest more money in the method.",
        "Using less plastic matters more than new methods.",
      ],
      answer: 3,
      why: "Uzmanın sözü iki parçalı: `Even if … would only deal with one type` bir sınırlama, asıl mesaj son cümle `We need to produce less plastic in the first place`. `in the first place` 'en baştan' demek; ilk yarıdaki koşul cümlesini ana fikir sanmak hata.",
      targets: ["reading.inference"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b2-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "According to Dr Khan, what are sleep-tracking apps good at?",
      options: [
        "measuring how deeply people sleep",
        "measuring how long people lie still",
        "solving people's sleep problems",
        "predicting health problems",
      ],
      answer: 1,
      why: "`quite good at` ile `much less reliable` arasındaki karşıtlık ölçülü bir dille veriliyor. Derin uyku uygulamanın en zayıf olduğu alan. İki ölçüm aynı cevapta geçtiği için hangisinin övüldüğünü `good` ve `less reliable` ayırıyor.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b2-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "What happened to some of Dr Khan's patients?",
      options: [
        "They had always slept badly, long before they started using the app.",
        "They slept better once they started using the app.",
        "They stopped using the apps after a few nights.",
        "They started sleeping worse after worrying about the app's data.",
      ],
      answer: 3,
      why: "`had slept perfectly well for years` past perfect: uygulamadan ÖNCE iyi uyuyorlardı. Sonra `became anxious` ve `ended up sleeping worse`. `end up` 'sonunda … hâle gelmek' anlamında deyimsel fiil; sıralama kaçınca hastaların zaten kötü uyuduğu sanılıyor.",
      targets: ["listening.detail", "tense.past-perfect"],
    },
    {
      id: "en-b2-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "What does Dr Khan mean when he says, \"If they hadn't looked at the data every morning, they probably wouldn't have had a problem\"?",
      options: [
        "They did not look at the data every morning.",
        "They looked at the data, and that caused one.",
        "They will stop looking at the data in the future.",
        "Looking at the data solved their problem.",
      ],
      answer: 1,
      why: "Üçüncü tip koşul gerçekleşmemiş bir geçmişi anlatır: veriye baktılar ve sorun çıktı. Cümle olumsuz (`hadn't looked`) ama gerçekte olan olumlu; koşul cümlesini düz okumak anlamı tersine çeviriyor.",
      targets: ["listening.inference", "conditional.third"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b2-w02-g1",
      block: "grammar",
      stem: "The organism ___ to produce two different enzymes.",
      options: ["says", "is said", "is saying", "said"],
      answer: 1,
      why: "Kaynağı belli olmayan bilgi edilgen bildirme kalıbıyla verilir: `is said to`. Türkçe 'ürettiği söyleniyor' ya da 'üretiyormuş' kalıbında organizma özne gibi durduğu için etken `says` kuruluyor, yani organizma bir şey söylüyormuş gibi.",
      targets: ["passive.reporting"],
      byNative: {
        de: {
          options: ["should", "is said", "says", "is saying"],
          answer: 1,
          why: "Almanca `Der Organismus soll … produzieren` modal fiille aktarım yapar; bu `should` diye taşınıyor, ama İngilizce `should` 'meli' demek. Aktarım `is said to` ya da `is thought to` ile.",
        },
      },
    },
    {
      id: "en-b2-w02-g2",
      block: "grammar",
      stem: "Scientists ___ for a solution to plastic waste for decades.",
      options: ["are searching", "had been searching", "have been searching", "searched"],
      answer: 2,
      why: "Geçmişte başlayıp bugün de süren eylem `have been + -ing` ile anlatılır. Türkçe 'onlarca yıldır arıyorlar' şimdiki zamanla kurulduğu için `are searching` seçiliyor. `had been searching` ise bugüne değil, geçmişteki bir andan önceye kadar süreni anlatır.",
      targets: ["tense.present-perfect-continuous", "present-perfect.since-for"],
      byNative: {
        de: {
          options: ["have been searching", "are searching", "searched", "had searched"],
          answer: 0,
          why: "Almanca `Wissenschaftler suchen seit Jahrzehnten` şimdiki zamanla kurulur. İngilizcede `for decades` ile bugüne uzanan süreç `have been searching` ister.",
        },
      },
    },
    {
      id: "en-b2-w02-g3",
      block: "grammar",
      stem: "Which sentence says that there were also OTHER bottles that were not on the ground?",
      options: [
        "The bottles, which were on the ground, were covered in cells.",
        "The bottles which were on the ground were covered in cells.",
        "The bottles, that were on the ground, were covered in cells.",
        "The bottles were on the ground, which were covered in cells.",
      ],
      answer: 1,
      why: "Virgülsüz ilgi cümlesi hangi şişelerden söz edildiğini sınırlar: yerdekiler, yani başkaları da var. Virgüllü olan bütün şişelere ek bilgi verir. Türkçe 'yerdeki şişeler' iki okumayı da taşıdığı için virgülün anlamı değiştirdiği gözden kaçıyor; virgülden sonra `that` ise hiç kullanılmaz.",
      targets: ["relative.defining", "relative.non-defining"],
      byNative: {
        de: {
          options: [
            "The bottles, that were on the ground, were covered in cells.",
            "The bottles, which were on the ground, were covered in cells.",
            "The bottles were on the ground, which were covered in cells.",
            "The bottles which were on the ground were covered in cells.",
          ],
          answer: 3,
          why: "Almancada ilgi cümlesinden önce virgül her zaman zorunlu ve anlam ayırmaz, bu yüzden virgüllü biçim doğal görünüyor. İngilizcede virgül ek bilgiyi işaretler (bütün şişeler); virgülsüz cümle ise yerdeki şişeleri ötekilerden ayırır.",
        },
      },
    },
    {
      id: "en-b2-w02-g4",
      block: "grammar",
      stem: "The bottles were covered in cells, so the organism ___ there for a long time.",
      options: ["should have lived", "must live", "can't have lived", "must have lived"],
      answer: 3,
      why: "Kanıta dayanan geçmiş çıkarım `must have` + fiilin üçüncü hâli. `should have lived` 'yaşaması gerekirdi' anlamında bir eleştiri, `can't have` ise ters yönde bir çıkarım. Türkçe '-miş olmalı' çıkarımı tek ekte taşıdığı için `must live` ile geçmiş düşüyor.",
      targets: ["modal-perfect.must-have"],
      byNative: {
        de: {
          options: ["must lived", "must have lived", "should have lived", "can't have lived"],
          answer: 1,
          why: "Almanca `muss dort lange gelebt haben` sırasında Partizip ortada; İngilizceye `must lived` diye taşınıyor. İngilizcede modal + `have` + üçüncü hâl: `must have lived`.",
        },
      },
    },
    {
      id: "en-b2-w02-g5",
      block: "grammar",
      stem: "Which sentence is best for a science news website?",
      options: [
        "The researchers are engaged in the acceleration of the functioning of the enzymes.",
        "An increase in the speed of the working of the enzymes is being attempted.",
        "The researchers are trying to make the enzymes work faster.",
        "The researchers are in the process of the making faster of the enzymes.",
      ],
      answer: 2,
      why: "Haber dili de fiil yeğler: `are trying to make … work faster`. İsim zincirleri bilgi eklemez, okuru yavaşlatır. Türkçe haber dilindeki '-me/-ma' isimleştirmeleri ('hızlandırılmasına çalışılıyor') İngilizceye taşınınca ağır ve yapay cümleler çıkıyor.",
      targets: ["style.verbal"],
      byNative: {
        de: {
          options: [
            "The researchers are trying to make the enzymes work faster.",
            "The researchers are engaged in the acceleration of the functioning of the enzymes.",
            "The researchers are in the process of the making faster of the enzymes.",
            "An increase in the speed of the working of the enzymes is being attempted.",
          ],
          answer: 0,
          why: "Almanca bilim dilinin isim üslubu (`die Beschleunigung der Funktionsweise`) İngilizceye taşınınca ağır ve yapay cümleler çıkıyor. İngilizce aynı bilgiyi fiille ve daha kısa verir.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b2-w02-v1",
      block: "vocab",
      stem: "The team ___ a series of experiments before publishing the results.",
      options: ["carried away", "carried out", "carried off", "carried over"],
      answer: 1,
      why: "Deney, araştırma ya da anket `carry out` ile yapılır. Türkçe 'deney yapmak' karşılığında parçacık olmadığı için parçacık tahmin ediliyor; oysa anlam parçacıkta: `carried away` kendinden geçmek, `carry over` bir sonrakine aktarmak.",
      targets: ["phrasal-verb.carry-out"],
      byNative: {
        de: {
          options: ["carried over", "carried off", "carried away", "carried out"],
          answer: 3,
          why: "Almanca `durchführen` → `carry through`/`carry over` gibi harfiyen aktarım yanlış anlam verir. Deney yapmak `carry out`.",
        },
      },
    },
    {
      id: "en-b2-w02-v2",
      block: "vocab",
      stem: "In \"The researchers believe they will eventually find a solution\", what does \"eventually\" mean?",
      options: ["possibly, but nobody knows for sure", "at the moment", "in the end, after a long time", "in fact"],
      answer: 2,
      why: "`eventually` 'uzun bir süreden sonra, sonunda' demek. Türkçede benzer bir sözcük olmadığı için bağlamdan 'belki' tahmin ediliyor; oysa cümle bir ihtimali değil, zamanla gelecek bir sonucu anlatıyor.",
      targets: ["falsefriend.eventually"],
      byNative: {
        de: {
          options: ["in the end, after a long time", "possibly", "in fact", "at the moment"],
          answer: 0,
          why: "Almanca `eventuell` 'belki' demek; İngilizce `eventually` ise 'sonunda'. Aynı tuzak `actually` ↔ `aktuell` için de geçerli: `actually` 'aslında'.",
        },
      },
    },
    {
      id: "en-b2-w02-v3",
      block: "vocab",
      stem: "___ science cannot solve every environmental problem.",
      options: ["The", "A", "(no word)", "An"],
      answer: 2,
      why: "Genel anlamda kullanılan soyut ya da sayılamayan isim tanımlık almaz: `science`, `society`, `technology`. Türkçede belirlilik tanımlıkla işaretlenmediği için İngilizcede genel bir anlatımda da `the` eklemek güvenli sanılıyor.",
      targets: ["article.abstract-noun"],
      byNative: {
        de: {
          options: ["(no word)", "The", "A", "An"],
          answer: 0,
          why: "Almanca `Die Wissenschaft kann nicht …` genel anlamda da artikel alır. İngilizcede genel soyut isim artikelsiz kullanılır: `Science cannot …`.",
        },
      },
    },
  ],
};

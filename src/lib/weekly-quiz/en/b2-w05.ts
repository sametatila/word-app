import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 5 · Transfer (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: saf tekrar değil. W1–W4'ün hedefleri yeni bağlamlarda ve BAŞKA
 * metin türlerinde (bir forum yazışması, işe alımda yapay zekâ üzerine bir
 * podcast) karşılanıyor. Maddelerin çoğu iki kuralı üst üste bindiriyor
 * (`should have` + edilgen + deyimsel fiil, karma koşul + `might`), çünkü B2'de
 * transferin zor kısmı kuralların aynı cümlede buluşması.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g3` (`should have been pointed out`): Almanca `hätte … angesprochen
 *    werden sollen` sırası `should be`/`should had been` diye taşınıyor; Türkçe
 *    'belirtilmeliydi' edilgeni ve gerekliliği tek yüklemde birleştiriyor.
 *  - `w05-g5` (fiil üslubu, özgeçmiş): Almanca özgeçmiş dilinin isim zinciri
 *    İngilizceye taşınıyor; dinleme parçası da aynı noktayı söylüyor, yani
 *    madde metinle konuşuyor.
 *  - `w05-v2` (`sensible`): bu kez anlam sorusu değil, bir cümle içinde.
 */
export const EN_B2_W05: QuizWeek = {
  id: "en-b2-w05",
  course: "en",
  level: "B2",
  no: 5,
  theme: "Putting it all together",
  themeTr: "Hepsi bir arada: yeni durumlar",
  canDo: ["B2.GR.11", "B2.GR.12", "B2.GR.13", "B2.GR.17", "B2.GR.19", "B2.GR.20", "B2.RD.1", "B2.LS.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Online forum",
      genreTr: "Çevrimiçi forum",
      title: "Our old bookstore is closing – should we have done more?",
      body:
        "Posted by Clara_M\n\n" +
        "I've just heard that Harper's, the bookstore on Mill Street which has been part of our town for over sixty years, is closing at the end of the month. " +
        "I knew it had been having difficulties for a while, but I honestly hadn't realized how bad things were.\n\n" +
        "The family who run the store are said to have tried everything: evenings with authors, a small café, even an online store. " +
        "Apparently none of it was enough. The building is going to be turned into offices for a software company, which, to be fair, will bring some jobs into the town center.\n\n" +
        "What bothers me is that most of us must have seen this coming. How many times did we look at a book in Harper's and then order it online because it was two pounds cheaper? " +
        "I'm not blaming anyone, because I did it myself. But if more of us had bought our books there, the store might still be open today.\n\n" +
        "I also think the town could have done something. Other towns have reduced taxes for independent stores, and it seems to have worked.\n\n" +
        "Reply from Dan_K\n\n" +
        "I understand how you feel, but I'm not sure we should blame ourselves. Bookstores like Harper's have been closing all over the country, so it is probably a much bigger problem than one town's shopping habits. " +
        "That said, I agree about the town. The problem should at least have been pointed out at a public meeting before the building was sold.\n\n" +
        "The good news is that the family are apparently planning to open a smaller store near the station. If they do, I'll definitely be buying my books there.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Podcast interview",
      genreTr: "Podcast söyleşisi",
      plays: 2,
      segments: [
        { speaker: "Host", text: "Today we're talking about software that helps companies choose new staff. With me is Priya Shah, who advises companies on hiring. Priya, how common is it now?" },
        { speaker: "Priya", text: "More common than most people think. Many large companies are believed to use software to check job applications before a person ever reads them." },
        { speaker: "Host", text: "And does it work?" },
        { speaker: "Priya", text: "It can save a lot of time. But there have been some well-known failures. One company had been using a system for two years before they realized it was rejecting most female applicants." },
        { speaker: "Host", text: "How could that happen?" },
        { speaker: "Priya", text: "The system had been trained on the applications of people who had been hired in the past, and most of them were men. So it simply learned to prefer men." },
        { speaker: "Host", text: "Surely someone should have noticed that earlier." },
        { speaker: "Priya", text: "They should have, yes. If the company had tested the results regularly, they would have found the problem within weeks." },
        { speaker: "Host", text: "So would you advise companies not to use these tools?" },
        { speaker: "Priya", text: "Not necessarily. I'd say they're useful, as long as a person checks the decisions. The mistake is to give the whole responsibility to the machine." },
        { speaker: "Host", text: "And what about applicants? Is there anything they can do?" },
        { speaker: "Priya", text: "Keep the language in your application clear and simple. Long, complicated noun phrases tend to confuse the software, and, to be honest, they confuse human readers too." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b2-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Why is Harper's closing, according to Clara?",
      options: [
        "A software company forced the family to leave the building.",
        "It had been having difficulties for some time.",
        "The family wanted to retire after sixty years.",
        "The town increased the taxes for small stores.",
      ],
      answer: 1,
      why: "`it had been having difficulties for a while` past perfect continuous: kapanış haberinden önce süren bir zorluk. Yazılım şirketi binaya sonradan gelecek olan; dükkânı çıkardığı söylenmiyor. Sonucu (binanın yeni kullanımı) sebep sanmak sık yapılan bir okuma hatası.",
      targets: ["reading.detail", "tense.past-perfect-continuous"],
    },
    {
      id: "en-b2-w05-r2",
      block: "read",
      ref: "t1",
      stem: "What does Clara think about the people in her town?",
      options: [
        "They are completely to blame for the closing.",
        "They didn't know that the store was there.",
        "They probably helped cause the problem by buying online.",
        "They tried very hard to save the store.",
      ],
      answer: 2,
      why: "`must have seen this coming` bir çıkarım; `I'm not blaming anyone … I did it myself` suçlamayı yumuşatıyor. Karma koşul (`if more of us had bought …, the store might still be open today`) geçmişte yapılmayan alışverişi bugünkü sonuca bağlıyor.",
      targets: ["reading.inference", "modal-perfect.must-have", "conditional.mixed"],
    },
    {
      id: "en-b2-w05-r3",
      block: "read",
      ref: "t1",
      stem: "On what point do Clara and Dan agree?",
      options: [
        "The town should have done more.",
        "The people in the town are to blame.",
        "The bookstore will definitely open again.",
        "The software company is bad for the town.",
      ],
      answer: 0,
      why: "Dan `I'm not sure we should blame ourselves` ile Clara'nın bir görüşüne katılmıyor, `That said, I agree about the town` ile ötekine katılıyor. `That said` yönü değiştiren bir işaret; ondan önceki itirazı bütün cevaba yaymak ortak noktayı kaçırıyor. Yeniden açılış ise yalnız bir plan (`apparently planning`).",
      targets: ["reading.detail", "hedging.careful", "modal-perfect.should-have"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b2-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "What went wrong at the company Priya describes?",
      options: [
        "The software was much too slow to be useful.",
        "The system rejected most female applicants for two years.",
        "The staff ignored the software's decisions.",
        "The applications were badly written.",
      ],
      answer: 1,
      why: "`had been using a system for two years before they realized` past perfect continuous: sorun iki yıl sürdü ve ancak sonra fark edildi. Sorun yavaşlık değil, seçimdeki önyargıydı; Priya sistemin tam tersine zaman kazandırdığını söylüyor.",
      targets: ["listening.detail", "tense.past-perfect-continuous"],
    },
    {
      id: "en-b2-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Why did the system prefer men?",
      options: [
        "The company had told it to choose men on purpose.",
        "Women had sent far fewer applications to the company.",
        "It had learned from past hiring decisions, which mostly involved men.",
        "The software was built by a team that did not include any women.",
      ],
      answer: 2,
      why: "`had been trained on the applications of people who had been hired in the past` iki past perfect ile nedeni geriye taşıyor: geçmişteki işe alımlar çoğunlukla erkekti ve sistem bunu öğrendi. Bilerek yapıldığını `simply learned` reddediyor.",
      targets: ["listening.detail", "relative.defining"],
    },
    {
      id: "en-b2-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "What is Priya's view on these tools?",
      options: [
        "They should not be used at all.",
        "They are better than human decision makers.",
        "They should make the final decision alone.",
        "They are useful if a person checks the decisions.",
      ],
      answer: 3,
      why: "`Not necessarily` yasaklama fikrini reddediyor; görüşü `as long as a person checks the decisions` koşuluna bağlı. `give the whole responsibility to the machine` ise son kararı makineye bırakmanın hata olduğunu söylüyor.",
      targets: ["listening.detail", "hedging.careful"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b2-w05-g1",
      block: "grammar",
      stem: "The family who run the store ___ to have tried everything.",
      options: ["say", "are said", "are saying", "have said"],
      answer: 1,
      why: "Kaynağı belirsiz, geçmişe dair bilgi `are said to have` + üçüncü hâl ile verilir. Türkçe 'her şeyi denemişler' kanıtsallık ekiyle kurulduğu için aile özne olarak kalıyor ve etken `say` seçiliyor; ama sözü söyleyen aile değil.",
      targets: ["passive.reporting"],
      byNative: {
        de: {
          options: ["have said", "say", "are said", "are saying"],
          answer: 2,
          why: "Almanca `Man sagt, die Familie habe alles versucht` etken bir yapı ve `say`/`have said` kurduruyor. İngilizcede aile özne olunca kalıp edilgen: `are said to have tried`.",
        },
      },
    },
    {
      id: "en-b2-w05-g2",
      block: "grammar",
      stem: "If more of us had bought our books there, the store ___ still open today.",
      options: ["might have been", "might be", "would have", "had been"],
      answer: 1,
      why: "Koşul geçmişte, sonuç bugünde (`today`): karma koşul, sonuç tarafı `might/would be`. `might have been` sonucu da geçmişe taşır ve `today` ile çelişir. Öğrenciyi geçmişe çeken `if` tarafındaki past perfect; sonuç tarafı ise `today` ile bugüne bağlı.",
      targets: ["conditional.mixed", "conditional.third"],
      byNative: {
        de: {
          options: ["had been", "might have been", "might be", "would have"],
          answer: 2,
          why: "Almanca `wäre … heute noch geöffnet` bugünü kiple anlatır, ama koşuldaki `hätten … gekauft` tüm cümleyi geçmişe çekiyor. İngilizcede bugünkü sonuç `might be`; `had been` ise koşul tarafının biçimi.",
        },
      },
    },
    {
      id: "en-b2-w05-g3",
      block: "grammar",
      stem: "The problem ___ at a public meeting before the building was sold.",
      options: [
        "should be pointed out",
        "should have pointed out",
        "should have been pointed out",
        "should had been pointed out",
      ],
      answer: 2,
      why: "Geçmişe dönük eleştiri edilgen olunca üç parça gerekir: `should have been` + üçüncü hâl; deyimsel fiilin parçacığı da sonda kalır. Özne `the problem` belirtilen şey, belirten değil; `should have pointed out` onu etken yapar. Türkçe 'belirtilmeliydi' edilgeni, gerekliliği ve geçmişi tek yüklemde birleştirdiği için İngilizcedeki üç parça ayrı ayrı görülmüyor.",
      targets: ["modal-perfect.should-have", "phrasal-verb.point-out"],
      byNative: {
        de: {
          options: [
            "should have been pointed out",
            "should had been pointed out",
            "should be pointed out",
            "should have pointed out",
          ],
          answer: 0,
          why: "Almanca `hätte … angesprochen werden sollen` sırası İngilizceye `should be pointed out` ya da `should had been` diye taşınıyor. İngilizcede modal + `have been` + üçüncü hâl: `should have been pointed out`.",
        },
      },
    },
    {
      id: "en-b2-w05-g4",
      block: "grammar",
      stem: "Which sentence suggests that there is only ONE bookstore in the town?",
      options: [
        "The bookstore which is on Mill Street is closing.",
        "The bookstore that is on Mill Street is closing.",
        "The bookstore is on Mill Street which is closing.",
        "The bookstore, which is on Mill Street, is closing.",
      ],
      answer: 3,
      why: "Virgüllü ilgi cümlesi yalnız ek bilgi verir: kasabada tek bir kitapçı var ve o da Mill Street'te. Virgülsüz ve `that`li cümleler kitapçıyı ötekilerden ayırır, yani başka kitapçılar da olabilir. Türkçe 'Mill Street'teki kitapçı' iki okumayı da taşıyor.",
      targets: ["relative.non-defining", "relative.defining"],
      byNative: {
        de: {
          options: [
            "The bookstore, which is on Mill Street, is closing.",
            "The bookstore which is on Mill Street is closing.",
            "The bookstore that is on Mill Street is closing.",
            "The bookstore is on Mill Street which is closing.",
          ],
          answer: 0,
          why: "Almancada ilgi cümlesinden önce virgül her zaman zorunlu ve anlam ayırmaz. İngilizcede virgül, tek bir kitapçı ile birkaç kitapçıdan biri arasındaki farkı işaretliyor.",
        },
      },
    },
    {
      id: "en-b2-w05-g5",
      block: "grammar",
      stem: "Priya advises keeping the language in job applications clear and simple. Which sentence follows her advice?",
      options: [
        "Responsible for the realisation of the reduction of costs and the management of a team.",
        "Management of a team of five persons and realisation of a cost reduction of ten percent.",
        "I led a team of five and reduced costs by ten percent.",
        "In charge of the carrying out of the management of five members of staff.",
      ],
      answer: 2,
      why: "İş başvurusunda da fiil yeğlenir: `I led`, `reduced`. İsim zincirleri (`the realisation of the reduction`) bilgi eklemez; hem okuru hem yazılımı zorlar. Türkçe özgeçmişteki '… sorumluluğu', '… gerçekleştirilmesi' kalıpları İngilizceye taşınınca aynı ağırlık çıkıyor.",
      targets: ["style.verbal"],
      byNative: {
        de: {
          options: [
            "I led a team of five and reduced costs by ten percent.",
            "Responsible for the realisation of the reduction of costs and the management of a team.",
            "In charge of the carrying out of the management of five members of staff.",
            "Management of a team of five persons and realisation of a cost reduction of ten percent.",
          ],
          answer: 0,
          why: "Almanca özgeçmiş dili isim üslubunu sever (`Durchführung der Kostenreduzierung`, `Leitung eines Teams`) ve İngilizceye taşınınca ağır cümleler çıkıyor. İngilizce aynı bilgiyi fiille ve birinci kişiyle verir: `I led …, reduced …`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b2-w05-v1",
      block: "vocab",
      stem: "Don't ___ updating your job application until you really need a new job.",
      options: ["put up", "put off", "put away", "put out"],
      answer: 1,
      why: "Bağlam değişse de kalıp aynı: ertelemek `put off` ve arkasından fiil `-ing` alır. Parçacık anlamı taşıyor: `put up` asmak, `put away` kaldırmak, `put out` söndürmek.",
      targets: ["phrasal-verb.put-off"],
      byNative: {
        de: {
          options: ["put away", "put out", "put up", "put off"],
          answer: 3,
          why: "Almanca `aufschieben` → `put up` gibi öneki harfiyen eşlemek başka bir anlam verir. Ertelemek `put off`; arkasından gelen fiil de `-ing` alır.",
        },
      },
    },
    {
      id: "en-b2-w05-v2",
      block: "vocab",
      stem: "It would be ___ to check the software's decisions before trusting them.",
      options: ["sensible", "sensibly", "sense", "sensed"],
      answer: 0,
      why: "`It would be` bir sıfat bekliyor ve 'makul, mantıklı' anlamı `sensible`. `sensibly` zarf, `sense` isim. Türkçe 'mantıklı olur' kalıbında sıfat da zarf da aynı biçimde durabildiği için sözcük türü gözden kaçıyor.",
      targets: ["falsefriend.sensible"],
      byNative: {
        de: {
          options: ["sensitive", "sensible", "reasonably", "sense"],
          answer: 1,
          why: "Almanca `sensibel` 'hassas' → `sensible` eşlemesi yüzünden 'mantıklı' için `sensible`den kaçılıp `sensitive` ya da zarf `reasonably` seçiliyor. İngilizce `sensible` tam olarak 'mantıklı' (`vernünftig`) ve cümle bir sıfat bekliyor; `sensitive` 'hassas'.",
        },
      },
    },
    {
      id: "en-b2-w05-v3",
      block: "vocab",
      stem: "What does \"tend to\" show in \"Long noun phrases tend to confuse the software\"?",
      options: [
        "This always happens, without exception.",
        "This happens often, but not in every case.",
        "This happened once in the past.",
        "This should happen in the future.",
      ],
      answer: 1,
      why: "`tend to` bir eğilim bildirir: çoğu zaman olur ama her zaman değil. Ölçülü dilin bir aracı; iddiayı genelleştirmeden yapmayı sağlar. Türkçe '-ma eğiliminde' ya da '-abiliyor' karşılığı yerine 'her zaman' okumak konuşanın ne kadar emin olduğunu abartıyor.",
      targets: ["hedging.careful"],
      byNative: {
        de: {
          options: [
            "This happens often, but not in every case.",
            "This always happens, without exception.",
            "This should happen in the future.",
            "This happened once in the past.",
          ],
          answer: 0,
          why: "Almanca `neigen dazu` ya da `in der Regel` aynı ölçülülüğü taşır; İngilizce `tend to` 'genellikle, çoğu zaman' demek, 'her zaman' değil.",
        },
      },
    },
  ],
};

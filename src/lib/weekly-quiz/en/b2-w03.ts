import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 3 · Kültür, sanat ve kimlik (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: ikinci dilde yazan bir yazar üzerine bir portre yazısını ve bir
 * müzenin ünlü bir tabloyu satma kararı üzerine sohbeti anlamak; past perfect
 * continuous, karma koşul, `must have`/`could have`, edilgen bildirme
 * kalıbının geçmişi, ölçülü dil. Geri dönüş: `relative.non-defining` (W1–W2),
 * `conditional.third` (W1–W2), `passive.reporting` (W2), `modal-perfect.must-have` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w03-g3` (karma koşul): Türkçe `-meseydi` bugünü ve geçmişi ayırmadığı için
 *    ikinci tipe (`didn't learn`) kayılıyor; Almanca `Wenn sie … nicht gelernt
 *    hätte` koşul tarafında kip taşıdığı için `wouldn't have learnt` kuruluyor.
 *  - `w03-v2` (`grew up`): Almanca `ist aufgewachsen` Perfekt'i `sein` ile
 *    kurduğu için `is/was grown up`; bu tuzak Almancaya özgü.
 *  - `w03-g5` (ölçülü dil): İngilizce resmî tartışmada iddiayı yumuşatmak
 *    bekleniyor; Almanca `muss` vurgusu İngilizcede bir çıkarım gibi okunuyor.
 */
export const EN_B2_W03: QuizWeek = {
  id: "en-b2-w03",
  course: "en",
  level: "B2",
  no: 3,
  theme: "Culture, art and identity",
  themeTr: "Kültür, sanat ve kimlik",
  canDo: ["B2.GR.11", "B2.GR.12", "B2.GR.13", "B2.GR.20", "B2.RD.1", "B2.LS.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Magazine profile",
      genreTr: "Dergi portresi",
      title: "Writing in a borrowed language",
      body:
        "When Elif Demir published her first novel in English, few readers knew that English was her third language. " +
        "Born in Izmir to a Turkish father and a Greek mother, she had grown up speaking two languages at home and only started learning English at the age of fourteen.\n\n" +
        "Her novel, which has since been translated into eleven languages, tells the story of a young woman who returns to her grandmother's village after thirty years abroad. " +
        "Critics have praised its precise, almost musical style. Some have even suggested that it could only have been written by someone who was not a native speaker. " +
        "\"You notice things about a language that people who grew up with it never think about,\" Demir explains.\n\n" +
        "Writing in English, however, has not always been easy. She admits that she had been working on the book for six years before she found a publisher. " +
        "\"At first, several publishers told me my sentences sounded strange. Looking back, they were probably right about some of them, but that was also what made the book mine.\"\n\n" +
        "The question of identity runs through the whole novel. The main character feels at home neither in the city where she has built her life nor in the village her family comes from. " +
        "Many readers who have moved to another country say they see themselves in her.\n\n" +
        "Demir is currently working on her second book, which she is writing in Turkish for the first time. " +
        "\"It feels like coming home,\" she says, \"and at the same time like visiting a foreign country. I guess that is what identity means for people like me.\"",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Conversation between friends",
      genreTr: "Arkadaş sohbeti",
      plays: 2,
      segments: [
        { speaker: "Anna", text: "Did you see the news? The city museum wants to sell one of its most famous paintings." },
        { speaker: "Ben", text: "I heard. Apparently they need the money to keep the museum open." },
        { speaker: "Anna", text: "I think someone should have stopped it. That painting has been in this city for over a hundred years. It's part of who we are." },
        { speaker: "Ben", text: "I'm not sure. If the museum hadn't had money problems for years, they wouldn't be selling it now." },
        { speaker: "Anna", text: "But surely the city could find the money in another way?" },
        { speaker: "Ben", text: "Maybe. But I read that the buyer, who lives abroad, has promised to lend it back to the museum every summer." },
        { speaker: "Anna", text: "Oh, I didn't know that. That sounds more reasonable." },
        { speaker: "Ben", text: "And the money is going to pay for free art classes for children, which I think is the most important part." },
        { speaker: "Anna", text: "I'd agree with that. Although I do think the museum could have asked people first. Lots of people are angry that nobody asked them." },
        { speaker: "Ben", text: "Apparently there was an online survey last spring." },
        { speaker: "Anna", text: "Was there? I must have missed it. I guess I'm one of the people who didn't pay attention." },
        { speaker: "Ben", text: "Well, there's a public meeting next month, if you want to give your opinion." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-b2-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Which statement about Demir's languages is true?",
      options: [
        "She grew up speaking English with her parents at home.",
        "English was the third language she learnt.",
        "She wrote her first novel in Turkish and then translated it.",
        "She learnt Greek at school when she was fourteen.",
      ],
      answer: 1,
      why: "`had grown up speaking two languages at home` past perfect ile sırayı veriyor: Türkçe ve Rumca evde, İngilizce sonra, on dört yaşında. Metin `her third language` diyor. Ev dilleriyle romanın dilini karıştırmak ilk paragrafın sıralamasını kaçırmaktan geliyor; Türkçe yazılan ikinci kitap, ilki değil.",
      targets: ["reading.detail", "tense.past-perfect"],
    },
    {
      id: "en-b2-w03-r2",
      block: "read",
      ref: "t1",
      stem: "What do some critics suggest about the novel?",
      options: [
        "Its style is too strange to be good literature.",
        "It should have been written in Turkish from the start.",
        "It was probably corrected by a native speaker before it was published.",
        "Its style may come from the writer seeing English from the outside.",
      ],
      answer: 3,
      why: "`could only have been written by someone who was not a native speaker` modal perfect ile bir çıkarım: üslup yazarın dile dışarıdan bakışından geliyor olmalı. 'Garip cümleler' yayıncıların ilk tepkisiydi, eleştirmenlerin yargısı değil.",
      targets: ["reading.inference", "modal-perfect.could-have"],
    },
    {
      id: "en-b2-w03-r3",
      block: "read",
      ref: "t1",
      stem: "How does Demir feel about writing her second book in Turkish?",
      options: [
        "It feels both familiar and foreign to her.",
        "It is simply easier than writing in English.",
        "She regrets that she ever wrote in English.",
        "She finds it boring because she knows the language too well.",
      ],
      answer: 0,
      why: "`like coming home … and at the same time like visiting a foreign country` iki zıt duyguyu birlikte söylüyor. `I guess` ölçülü bir dil; yazar kesin bir yargı değil, kendi yorumunu veriyor.",
      targets: ["reading.detail", "hedging.careful"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-b2-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "What will happen to the painting?",
      options: [
        "It will stay in the museum, and the museum will close.",
        "The city will buy it back with money from another source.",
        "It will be sold, but it will return to the museum every summer.",
        "It will be given to a museum in another country.",
      ],
      answer: 2,
      why: "Satış kararlaştırılmış, ama alıcı `has promised to lend it back to the museum every summer`. Anna'nın 'para başka yerden bulunabilir' sözü bir soru ve bir itiraz, alınmış bir karar değil. `lend it back` 'geri ödünç vermek' demek; satışın kalıcı bir kayıp olmadığını gösteriyor.",
      targets: ["listening.detail"],
    },
    {
      id: "en-b2-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "What does Anna criticise at the end?",
      options: [
        "that the museum didn't ask people before deciding",
        "that the painting is being sold at all",
        "that the money is used for art classes",
        "that there was no online survey",
      ],
      answer: 0,
      why: "`could have asked people first` modal perfect ile geçmişe dönük bir eleştiri: yapılabilirdi ama yapılmadı. `Although I do think` ile gelen kısım Anna'nın son itirazı; satışa karşı ilk tepkisini ise alıcının teklifini duyunca yumuşatıyor (`more reasonable`).",
      targets: ["listening.detail", "modal-perfect.could-have"],
    },
    {
      id: "en-b2-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Why didn't Anna know about the survey?",
      options: [
        "There was no survey at all.",
        "She was not allowed to take part.",
        "The survey took place after the decision.",
        "She probably didn't notice it.",
      ],
      answer: 3,
      why: "`I must have missed it` kanıta dayalı bir çıkarım: anket vardı ve büyük ihtimalle gözünden kaçtı. `Apparently` Ben'in bilgisinin kesin olmadığını söylüyor, ama Anna kendi dikkatsizliğini kabul ediyor (`didn't pay attention`).",
      targets: ["listening.detail", "modal-perfect.must-have"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-b2-w03-g1",
      block: "grammar",
      stem: "Her novel, ___ has been translated into eleven languages, tells the story of a young woman.",
      options: ["that", "which", "who", "what"],
      answer: 1,
      why: "Virgüllü, ek bilgi veren ilgi cümlesinde `that` kullanılmaz; nesne ya da kavram için `which`. Türkçede ilgi cümlesi '-en/-dığı' ortacıyla kurulduğu için virgülün bir ayrım yaptığı görülmüyor ve `that` her yere uyar sanılıyor.",
      targets: ["relative.non-defining"],
      byNative: {
        de: {
          options: ["which", "that", "what", "who"],
          answer: 0,
          why: "Almanca tanımlayan ve tanımlamayan ilgi cümlesini aynı zamirle (`der`) ve her zaman virgülle kurar; ayrım yapmaz. İngilizcede virgüllü ilgi cümlesinde `that` olmaz; `what` ise ilgi zamiri olarak kullanılmaz.",
        },
      },
    },
    {
      id: "en-b2-w03-g2",
      block: "grammar",
      stem: "She ___ on the book for six years before she found a publisher.",
      options: ["has been working", "was working", "had been working", "is working"],
      answer: 2,
      why: "Geçmişteki bir andan (`before she found`) önce başlayıp o ana kadar süren eylem `had been + -ing` ile anlatılır. `has been working` olayı bugüne bağlar, oysa yayıncı bulmak geçmişte kaldı. Türkçe 'altı yıldır üzerinde çalışıyordu' '-yordu' ile kurulduğu için `was working` seçiliyor.",
      targets: ["tense.past-perfect-continuous"],
      byNative: {
        de: {
          options: ["had been working", "was working", "has been working", "is working"],
          answer: 0,
          why: "Almanca `Sie arbeitete schon seit sechs Jahren daran` Präteritum ile kurulur ve bu süreyi `was working` diye taşıtıyor. İngilizcede geçmişteki bir ana kadar süren eylem `had been working`.",
        },
      },
    },
    {
      id: "en-b2-w03-g3",
      block: "grammar",
      stem: "If she ___ English at fourteen, she wouldn't be a writer today.",
      options: ["didn't learn", "hadn't learnt", "wouldn't have learnt", "hasn't learnt"],
      answer: 1,
      why: "Koşul geçmişte (`at fourteen`), sonuç bugünde (`today`): karma koşul. Koşul tarafı past perfect (`hadn't learnt`), sonuç tarafı `wouldn't be`. Türkçe `-meseydi` geçmişi ve bugünü ayırmadığı için ikinci tip koşula (`didn't learn`) kayılıyor.",
      targets: ["conditional.mixed", "conditional.third"],
      byNative: {
        de: {
          options: ["wouldn't have learnt", "didn't learn", "hasn't learnt", "hadn't learnt"],
          answer: 3,
          why: "Almanca `Wenn sie … nicht gelernt hätte` koşul tarafında da kip taşıdığı için `wouldn't have learnt` kuruluyor. İngilizcede `if` tarafına `would` gelmez: `hadn't learnt`.",
        },
      },
    },
    {
      id: "en-b2-w03-g4",
      block: "grammar",
      stem: "The painting ___ to have been painted around 1890.",
      options: ["believes", "is believing", "is believed", "has believed"],
      answer: 2,
      why: "Kaynağı belirsiz, geçmişe dair bilgi `is believed to have been` + üçüncü hâl ile verilir: bugünkü inanç, geçmişteki olay. Türkçe '1890 civarında yapıldığı düşünülüyor' kişisiz bir yapı; İngilizcede tabloyu özne yapan kalıp tanıdık olmadığı için etken `believes` kuruluyor ve tablo inanan kişi oluyor.",
      targets: ["passive.reporting"],
      byNative: {
        de: {
          options: ["is believed", "believes", "is believing", "has believed"],
          answer: 0,
          why: "Almanca `Man glaubt, dass das Bild um 1890 gemalt wurde` etken bir yapı; İngilizceye `believes`/`has believed` diye taşınıyor. İngilizcede tablo özne olunca kalıp edilgen: `is believed to have been painted`.",
        },
      },
    },
    {
      id: "en-b2-w03-g5",
      block: "grammar",
      stem: "In a public discussion, which sentence gives an opinion in the most careful way?",
      options: [
        "The painting definitely belongs to this city and nowhere else.",
        "Everyone who knows anything about art knows the painting belongs here.",
        "The painting must belong to this city. There is no question.",
        "It could be said that the painting belongs to this city.",
      ],
      answer: 3,
      why: "Ölçülü dil iddiayı yumuşatır ve karşı görüşe yer bırakır: `It could be said that`, `apparently`, `tend to`. `definitely`, `Everyone … knows` ve `there is no question` tartışmayı kapatır; İngilizce resmî bir tartışmada bu doğrudanlık sert duyulur.",
      targets: ["hedging.careful"],
      byNative: {
        de: {
          options: [
            "It could be said that the painting belongs to this city.",
            "The painting must belong to this city. There is no question.",
            "The painting definitely belongs to this city and nowhere else.",
            "Everyone who knows anything about art knows the painting belongs here.",
          ],
          answer: 0,
          why: "Almanca tartışma üslubu doğrudan bir yargıyı (`Das Bild gehört in diese Stadt`) kaba saymaz ve `muss` vurgu katar. İngilizcede aynı doğrudanlık sert duyulur ve `must` çıkarım gibi okunur; yumuşatma `It could be said that`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-b2-w03-v1",
      block: "vocab",
      stem: "In \"It would be sensible to ask people before selling the painting\", what does \"sensible\" mean?",
      options: ["easily hurt", "reasonable", "very emotional", "very important"],
      answer: 1,
      why: "`sensible` 'makul, mantıklı' demek. Karışıklık İngilizcenin kendi içinde: benzer görünen `sensitive` 'hassas, kolay incinen' anlamına gelir ve iki sözcük sık karıştırılır.",
      targets: ["falsefriend.sensible"],
      byNative: {
        de: {
          options: ["reasonable", "easily hurt", "very emotional", "very important"],
          answer: 0,
          why: "Almanca `sensibel` 'hassas, duygusal' demek ve İngilizce `sensible` onunla aynı sanılıyor. İngilizce `sensible` ise 'mantıklı' (`vernünftig`); 'hassas' anlamı `sensitive`.",
        },
      },
    },
    {
      id: "en-b2-w03-v2",
      block: "vocab",
      stem: "Demir ___ in Izmir, but she has lived in London for twenty years.",
      options: ["was grown up", "grew up", "grew out", "is grown up"],
      answer: 1,
      why: "`grow up` edilgen olmayan bir deyimsel fiil: kişinin kendisi büyür ve bitmiş geçmişte past simple gelir. `was grown up` kurulamaz, `grew out` ise 'büyüyüp sığmaz olmak'. Çocuğu büyüten kişinin fiili başkadır (`raise`).",
      targets: ["phrasal-verb.grow-up"],
      byNative: {
        de: {
          options: ["is grown up", "was grown up", "grew out", "grew up"],
          answer: 3,
          why: "Almanca `Sie ist in Izmir aufgewachsen` Perfekt'i `sein` ile kurduğu için `is grown up` ya da `was grown up` doğal geliyor. İngilizcede bitmiş geçmiş past simple ile: `grew up`.",
        },
      },
    },
    {
      id: "en-b2-w03-v3",
      block: "vocab",
      stem: "Among all the new novels this year, hers really ___ because of its unusual style.",
      options: ["stands up", "stands for", "stands out", "stands by"],
      answer: 2,
      why: "Ötekiler arasında dikkat çekmek, sivrilmek `stand out`. Türkçe 'öne çıkmak' karşılığında parçacık yok, bu yüzden parçacık tahmin ediliyor: `stand up` ayağa kalkmak, `stand for` temsil etmek, `stand by` yanında durmak.",
      targets: ["phrasal-verb.stand-out"],
      byNative: {
        de: {
          options: ["stands out", "stands up", "stands by", "stands for"],
          answer: 0,
          why: "Almanca `herausragen` ya da `auffallen` anlamı doğru sezdiriyor; tuzak parçacıkta: `stand up` ayağa kalkmak, `stand for` temsil etmek. Dikkat çekmek `stand out`.",
        },
      },
    },
  ],
};

import type { MockPaper } from "../types";

/**
 * B1 · Deneme 12 — "Rest, Weekends and Doing Nothing".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Dinlenme B1 için verimli
 * çünkü sav sayıya bağlanabiliyor: insanlar boş cumartesi istediğini söylüyor,
 * anket boş cumartesinin doldurulduğunu gösteriyor. Söylenen ile yapılan
 * arasındaki bu açık, karşılaştırma ve koşul yapılarını doğal kılıyor.
 *
 * On birinci kâğıt birinci tekil bir sav yürütüyordu; bu kâğıdın uzun metni
 * bilerek üçüncü tekil ve sayı temelli bir anket raporu. Söyleşi de uzman
 * değil, on bir yıldır hafta sonu çalışan biriyle: sorulan varsayımı
 * düzelten bir tanık anlatısı.
 */
export const EN_B1_12: MockPaper = {
  id: "en-b1-12",
  course: "en",
  level: "B1",
  no: 12,
  theme: "Rest, Weekends and Doing Nothing",
  themeTr: "Dinlenme, hafta sonları ve hiçbir şey yapmamak",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read short texts, adverts, an article and three texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Kısa metinler, ilanlar, bir yazı ve boşluklu üç metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-12-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Sign on a shop door",
              genreTr: "Dükkân kapısındaki tabela",
              title: "SUNDAYS",
              body: `We used to open on Sundays and we have stopped. The takings on a Sunday were good, and the four of us were tired every Tuesday. We are open Monday to Saturday and the phone is off at six.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a library",
              genreTr: "Kütüphane duyurusu",
              title: "THE QUIET ROOM",
              body: `First floor, behind the stairs.

No phones, no laptops, no conversations.

You do not have to be reading. Sitting is also allowed, although most people arrive with a book and then put it down.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Saturday",
              body: `Dear Neda, thank you for asking me again. I am not coming on Saturday and it is nothing to do with the walk. I have been out every weekend since the middle of June and I want one day in which nothing is arranged. Ask me for the following week.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice at a swimming pool",
              genreTr: "Yüzme havuzu duyurusu",
              title: "EARLY SWIM",
              body: `Weekdays, 6.30 to 8.00.

Half price, and the lanes are empty.

We do not run this session at the weekend, because the staff who would open it are the ones it is meant for.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "It did not work",
              body: `Rasim, I did what you said. I kept Sunday completely free and by eleven I had cleaned the oven, answered nine emails and bought a lamp I do not need. Doing nothing turns out to be a thing you have to practise.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-l1-1",
              no: 1,
              ref: "m1",
              text: "Why did the shop stop opening on Sundays?",
              options: ["Because Sunday takings were low", "Because a new shop opened nearby", "Because of the effect on the staff"],
              answer: 2,
              explain:
                "Tabela kazancı açıkça eliyor: «The takings on a Sunday were good», gerekçe yorgunluk: «the four of us were tired every Tuesday».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l1-2",
              no: 2,
              ref: "m2",
              text: "What does the notice say about the room?",
              options: ["You need not be reading there", "You must book a place first", "It is only open in the morning"],
              answer: 0,
              explain:
                "Duyuru izni açıkça veriyor: «You do not have to be reading. Sitting is also allowed». Kayıt ya da saat kısıtından söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l1-3",
              no: 3,
              ref: "m3",
              text: "Why is the writer not coming?",
              options: ["She does not enjoy walking", "She wants a day with no plans", "She is away for the whole weekend"],
              answer: 1,
              explain:
                "E-posta yürüyüşü açıkça dışarıda bırakıyor: «it is nothing to do with the walk», ve istediğini söylüyor: «one day in which nothing is arranged».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l1-4",
              no: 4,
              ref: "m4",
              text: "Why is there no early session at the weekend?",
              options: ["Too few people come at that hour", "The lanes are cleaned on those two days", "The staff would lose their own rest"],
              answer: 2,
              explain:
                "Duyuru gerekçeyi veriyor: «the staff who would open it are the ones it is meant for». Katılım ya da temizlikten söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l1-5",
              no: 5,
              ref: "m5",
              text: "What did the writer find?",
              options: ["An empty day fills itself", "The advice was easy to follow", "Sunday is the wrong day for this"],
              answer: 0,
              explain:
                "İleti listeyi sayıyor: «by eleven I had cleaned the oven, answered nine emails and bought a lamp I do not need», sonra alıştırma gerektiğini söylüyor.",
            },
          ],
        },
        {
          id: "en-b1-12-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "The Quiet Room", body: "First floor of the library, open all week. No phones and no talking. Nobody asks you what you are working on." },
            { key: "b", label: "Early Swim", body: "Weekdays from half past six. Half price and empty lanes. Not available on Saturday or Sunday." },
            { key: "c", label: "Saturday Walks", body: "Two hours, easy pace, meet at the bridge. Different route every week and no need to book." },
            { key: "d", label: "One Free Hour", body: "A short course on Tuesday evenings: how to keep one hour a day that nothing else is allowed into." },
            { key: "e", label: "Night Shift Breakfast", body: "For people who finish work at seven in the morning. Hot food from 7.15, four days a week." },
            { key: "f", label: "The Garden", body: "Open every day until dark. Benches, water, no music and no charge. Dogs on a lead." },
            { key: "g", label: "Sunday Cinema", body: "One film every Sunday at three o'clock. Six euros, and the same seat every week if you want it." },
            { key: "h", label: "Repair Café", body: "Bring a broken thing on the first Saturday of the month. Volunteers help you mend it yourself." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-12-l2-6",
              no: 6,
              text: "Miko finishes work at seven in the morning and does not want to go straight home.",
              answer: "e",
              explain:
                "İlan tam bu saati karşılıyor: «For people who finish work at seven in the morning. Hot food from 7.15».",
            },
            {
              kind: "match",
              id: "en-b1-12-l2-7",
              no: 7,
              text: "Livia wants somewhere she can sit without buying anything or hearing music.",
              answer: "f",
              explain:
                "İlan üç koşulu birden veriyor: «Benches, water, no music and no charge».",
            },
            {
              kind: "match",
              id: "en-b1-12-l2-8",
              no: 8,
              text: "Cosmin cannot plan ahead and wants exercise on a Saturday morning.",
              answer: "c",
              explain:
                "İlan hem günü hem kayıt gerektirmemeyi veriyor: «Different route every week and no need to book».",
            },
            {
              kind: "match",
              id: "en-b1-12-l2-9",
              no: 9,
              text: "Tove wants to learn how to protect a small part of every day.",
              answer: "d",
              explain:
                "İlan tam bunu öğretiyor: «how to keep one hour a day that nothing else is allowed into».",
            },
            {
              kind: "match",
              id: "en-b1-12-l2-10",
              no: 10,
              text: "Yrsa wants the same thing at the same time every week without deciding anything.",
              answer: "g",
              explain:
                "İlan tekrarı veriyor: «One film every Sunday at three o'clock» ve «the same seat every week if you want it».",
            },
          ],
        },
        {
          id: "en-b1-12-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "What the town did with its free Saturday",
              body: `Last spring a town of nineteen thousand people was asked a simple question: what would you do with a completely free Saturday? Four hundred and twelve people answered, and almost all of them described something restful. Reading was mentioned most often, then walking, then sleeping.

In September the same four hundred and twelve people were asked what they had actually done on the previous Saturday. Reading came ninth. The three activities at the top were shopping, cleaning and driving somebody somewhere.

The researcher who ran the study, Radu Petran, says the gap is not dishonesty. People described what they wanted, and then Saturday arrived with the things nobody counts as plans: a boiler, a lift to the station, a birthday.

He argues that the interesting number is elsewhere. Of the people who reported a genuinely empty Saturday, seven in ten described it as uncomfortable. Several used the word guilty. If a day has nothing in it, they said, they would rather fill it than sit in it.

That result changed what the town did next. The council had planned a campaign asking people to rest more. Instead of the campaign, it opened a quiet room in the library and a garden that closes at dark. The argument was that people will use a place before they will use advice.

Petran is careful about how far the study goes. Four hundred people in one town is not a country, and the second question was asked in September, when everybody is busy. However, he says one finding has held everywhere he has looked: people do not fail to rest because they do not want to. They fail because rest is the only thing in the week that nobody else is expecting from them.`,
              gloss: [
                { de: "a researcher", tr: "araştırmacı", en: "researcher" },
                { de: "a campaign", tr: "kampanya", en: "campaign" },
                { de: "guilty", tr: "suçluluk duyan", en: "guilty" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-l3-11",
              no: 11,
              text: "What did the first question show?",
              options: [
                "Most people wanted a busier Saturday",
                "Nearly everybody described a restful day",
                "Very few people answered the question",
                "Younger people gave different answers from older ones",
              ],
              answer: 1,
              explain:
                "İlk paragraf sonucu veriyor: «Four hundred and twelve people answered, and almost all of them described something restful». Yaş kırılımından hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l3-12",
              no: 12,
              text: "What happened when the same people were asked in September?",
              options: [
                "Their answers were almost the same",
                "Half of them refused to answer",
                "Reading had fallen a long way down",
                "Walking had become the most common activity",
              ],
              answer: 2,
              explain:
                "İkinci paragraf düşüşü sayıyla veriyor: «Reading came ninth», ve ilk üç sırayı alışveriş, temizlik ve birini bir yere götürmek alıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l3-13",
              no: 13,
              text: "How does Petran explain the gap?",
              options: [
                "Unplanned jobs take up the day",
                "People were not honest in the first study",
                "The two questions were badly written",
                "The town is unusual in this respect",
              ],
              answer: 0,
              explain:
                "Üçüncü paragraf dürüstlüğü açıkça eliyor: «the gap is not dishonesty», ve örnekleri sayıyor: kombi, istasyona bırakma, doğum günü.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l3-14",
              no: 14,
              text: "What does he say is the most interesting finding?",
              options: [
                "Shopping was the commonest activity",
                "Most people slept longer than they said",
                "The study was repeated in other towns",
                "An empty day made most people uneasy",
              ],
              answer: 3,
              explain:
                "Dördüncü paragraf oranı veriyor: «seven in ten described it as uncomfortable», ve bazıları «guilty» sözcüğünü kullanmış.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l3-15",
              no: 15,
              text: "Why did the council open a room and a garden?",
              options: [
                "The campaign had already failed once",
                "A place is used before advice is",
                "The library had space that was empty",
                "It was cheaper than the campaign",
              ],
              answer: 1,
              explain:
                "Beşinci paragraf gerekçeyi veriyor: «people will use a place before they will use advice». Maliyet karşılaştırması yapılmıyor.",
            },
          ],
        },
        {
          id: "en-b1-12-l4",
          no: 4,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One sentence is missing from each of the gaps 16 to 20. Which sentence a to f fits which gap? One sentence fits nowhere.",
          promptTr:
            "Metni oku. 16–20. boşluklarda birer cümle eksik. a–f cümlelerinden hangisi hangi boşluğa uyar? Bir cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Magazine text",
              genreTr: "Dergi metni",
              title: "Sleep is not the same as rest",
              body: `A person who sleeps eight hours and wakes up tired has not necessarily slept badly. {{16}}

Sleep is one thing the body does, and it is measured, counted and worried about. Rest is a larger and vaguer word, and almost nobody keeps a record of it. {{17}}

The confusion matters because the two are treated as one. A tired person is told to go to bed earlier, which is sometimes right and sometimes exactly wrong. {{18}}

There is a second confusion, between rest and enjoyment. An evening with friends can be one of the best hours of the week and still leave you with nothing left. {{19}}

None of this is an argument against sleep, which nothing replaces. It is an argument for noticing what kind of tiredness you have. {{20}}`,
              gloss: [
                { de: "vague", tr: "belirsiz, muğlak", en: "vague" },
                { de: "to recover", tr: "kendine gelmek", en: "recover" },
                { de: "a record", tr: "kayıt", en: "record" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The evening was worth having, and it was not rest, and both of those can be true at once." },
            { key: "b", label: "b", body: "It may simply be that nothing in the day allowed the person to stop." },
            { key: "c", label: "c", body: "The one you have decides whether the answer is a bed or an empty afternoon." },
            { key: "d", label: "d", body: "For somebody who has slept seven hours and had no quiet minute since Monday, an earlier bedtime solves nothing." },
            { key: "e", label: "e", body: "What gets counted gets managed, and rest has never been counted." },
            { key: "f", label: "f", body: "The average person in this country walks about six thousand steps a day." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-12-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "b",
              explain:
                "Açılış uykuyu suçlamayı reddediyor: «has not necessarily slept badly». (b) yerine geçecek açıklamayı veriyor: gün boyunca durmaya izin veren bir şey olmamıştır.",
            },
            {
              kind: "match",
              id: "en-b1-12-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "e",
              explain:
                "Paragraf uykunun ölçüldüğünü, dinlenmenin kaydının tutulmadığını söylüyor. (e) bunu kurala bağlıyor: «What gets counted gets managed».",
            },
            {
              kind: "match",
              id: "en-b1-12-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "d",
              explain:
                "Paragraf öğüdün sınırını veriyor: «which is sometimes right and sometimes exactly wrong». (d) o ters durumu somutluyor: yedi saat uyumuş ama pazartesiden beri sessiz bir dakikası olmamış kişi.",
            },
            {
              kind: "match",
              id: "en-b1-12-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "a",
              explain:
                "Paragraf keyifle dinlenmeyi ayırıyor: «can be one of the best hours of the week and still leave you with nothing left». (a) iki yargıyı birlikte tutuyor: değerliydi ve dinlenme değildi.",
            },
            {
              kind: "match",
              id: "en-b1-12-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "c",
              explain:
                "Son paragraf ölçütü veriyor: «an argument for noticing what kind of tiredness you have». (c) o ayrımın sonucunu veriyor: yatak mı, boş bir öğleden sonra mı. (f) günde altı bin adımdan söz ediyor ve metinde yürüyüş hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-12-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Advice text",
              genreTr: "Öğüt metni",
              title: "How to keep one free afternoon",
              body: `An afternoon that is free because nothing happened to be arranged is not free at all. It is simply {{21}} claimed yet.

Put it in the same place every week. An afternoon {{22}} moves is an afternoon somebody else will book.

Tell one person. If you tell nobody, you {{23}} give it away by Wednesday to whoever asks first.

Do not fill it with a good activity. A course, a swim and a museum are three things, and three things {{24}} an afternoon into a schedule.

I {{25}} to defend mine by explaining it. Now I say I am busy, which is shorter and, on that afternoon, true.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["not", "never", "no", "none"],
              answer: 0,
              explain:
                "`is simply not claimed yet` yapısı edilgen bir sıfat-fiili olumsuzluyor. `never` ile `yet` çelişir, `no` ad öbeğini olumsuzlar, `none` ise adıldır ve fiil önünde durmaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["who", "that", "whose", "where"],
              answer: 1,
              explain:
                "Eksik öğe özne görevinde bir ilgi adılı ve öncül `An afternoon`, yani bir kişi değil. `that` uyar; `who` kişiler için, `whose` iyelik, `where` ise yer bildirir.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["would", "have", "will", "are"],
              answer: 2,
              explain:
                "`If you tell nobody, you ___ give it away` birinci tip koşul: gerçek bir olasılık, sonuç `will` ile kurulur. `would` varsayımı, `have` ile `are` ise burada eksik bir yapıyı verir.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["make", "turn", "put", "take"],
              answer: 1,
              explain:
                "`turn something into something` bir şeyi başka bir şeye dönüştürmeyi anlatır ve cümlede `into` var. `make` bu edatı almaz, `put into` yerleştirmedir, `take into` ise bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["used", "am used", "was using", "use"],
              answer: 0,
              explain:
                "`used to + yalın fiil` artık sürmeyen bir geçmiş alışkanlığı bildirir ve sonraki cümle bunu doğruluyor: «Now I say I am busy». `am used to` alışkın olmayı anlatır ve `-ing` ister.",
            },
          ],
        },
        {
          id: "en-b1-12-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Note left for a colleague",
              genreTr: "Meslektaşa bırakılan not",
              title: "Thursday afternoon",
              body: `I am not in on Thursday afternoon and I am not ill. I have kept that half day free {{26}} March.

If anybody asks {{27}} me, say I am not available and do not explain further.

The desk will be tidy and the phone {{28}} be off. Everything urgent is finished.

I know this looks odd in an office {{29}} nobody leaves before six. It looked odd to me too for the first month.

Please do not book anything in it, {{30}} the building is on fire.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-12-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["since"],
              explain:
                "`have kept … since March` başlangıç noktası olan bir ay adı ister ve yakın zamanlı geçmiş bunu `since` ile alır. `for` süre uzunluğu isterdi, ay adı değil.",
            },
            {
              kind: "gap",
              id: "en-b1-12-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["for"],
              explain:
                "`ask for somebody` birini aramak, birini istemek anlamındadır. `ask about me` hakkımda soru sormak olurdu ve not, arayan kişiyi anlatıyor.",
            },
            {
              kind: "gap",
              id: "en-b1-12-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["will"],
              explain:
                "Cümlenin ilk yarısı `The desk will be tidy`, ikinci yarısı aynı gelecek zamanı sürdürüyor: «the phone will be off».",
            },
            {
              kind: "gap",
              id: "en-b1-12-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["where"],
              explain:
                "Öncül `an office`, yani bir yer, ve eksik öğe bir yer belirten ilgi sözcüğü. `which` özne ya da nesne görevi isterdi; burada ikisi de dolu.",
            },
            {
              kind: "gap",
              id: "en-b1-12-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["unless"],
              explain:
                "Yasak tek bir istisnaya bağlanıyor: bina yanmıyorsa hiçbir şey konmayacak. `unless` bu olumsuz koşulu kurar; `if` tersini söylerdi.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 35,
      instruction:
        "This part has four tasks. You hear short extracts, conversations, some information and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir bilgilendirme ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-12-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici boş bir günü anlatıyor.",
              plays: 2,
              segments: [
                { text: "I had the whole Sunday and I had planned nothing, which is what everybody says they want. By eleven the oven was clean and I had bought a lamp. I am not proud of it and I do not think I am unusual." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At the library",
              genreTr: "Kütüphanede",
              situation: "Bir ziyaretçi sessiz odayı soruyor.",
              plays: 2,
              segments: [
                { text: "Do I need to book the quiet room?" },
                { text: "No. First floor, behind the stairs, and it is open all week." },
                { text: "Do I have to be studying?" },
                { text: "You do not have to be doing anything. Most people bring a book and stop reading it after ten minutes, and that is fine." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "Biri bir daveti geri çeviriyor.",
              plays: 2,
              segments: [
                { text: "You are not coming on Saturday." },
                { text: "I am not." },
                { text: "Is it the walk? You always liked the walk." },
                { text: "It is not the walk. I have been out every weekend since June and I want one day with nothing in it. Ask me the week after." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Havuzda erken seans duyuruluyor.",
              plays: 2,
              segments: [
                { text: "A reminder that the early swim runs on weekdays only, half past six to eight, at half price. We are often asked to add a Saturday session. We will not, because the people who would work it are the people it exists for." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Researcher",
              genreTr: "Araştırmacı",
              situation: "Bir araştırmacı bulgusunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "The number that surprised us was not the shopping or the cleaning. It was that seven in ten people with a genuinely empty Saturday found it uncomfortable. Several of them used the word guilty, and nobody had suggested it to them." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri bir düzenlemeyi bildiriyor.",
              plays: 2,
              segments: [
                { text: "Hello, it is Livia from the office. I have moved your appointment from Thursday afternoon to Friday morning at ten. Thursday afternoon is the one half day I keep clear, and I should have said so when we arranged it." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı yaygın öğüdü ele alıyor.",
              plays: 2,
              segments: [
                { text: "The usual advice is to go to bed earlier, and for a lot of tired people that is the right answer. For the rest it is exactly wrong. If you have slept seven hours and had no quiet minute since Monday, an earlier bedtime will not touch it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-h1-1",
              no: 1,
              ref: "a1",
              text: "What happened on the speaker's free Sunday?",
              options: ["He slept until the middle of the afternoon", "He filled it with small jobs", "He went out with friends"],
              answer: 1,
              explain:
                "Konuşmacı saati ve işleri veriyor: «By eleven the oven was clean and I had bought a lamp».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the assistant say about the room?",
              options: ["It must be booked in advance", "It is only for students working on an essay", "Studying there is not required"],
              answer: 2,
              explain:
                "Görevli iki şeyi de söylüyor: kayıt gerekmiyor ve «You do not have to be doing anything».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-3",
              no: 3,
              ref: "a3",
              text: "Why is the speaker staying at home?",
              options: ["She wants an unplanned day", "She has hurt her leg and cannot walk far", "She dislikes the group"],
              answer: 0,
              explain:
                "Konuşmacı yürüyüşü eliyor: «It is not the walk», ve istediğini söylüyor: «one day with nothing in it».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the announcement refuse to do?",
              options: ["Lower the price any further", "Open the session at the weekend", "Extend the session by an hour"],
              answer: 1,
              explain:
                "Duyuru isteği ve reddi birlikte veriyor: «We are often asked to add a Saturday session. We will not».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-5",
              no: 5,
              ref: "a5",
              text: "What surprised the researcher?",
              options: ["How much people shopped", "How little people slept", "How uneasy an empty day was"],
              answer: 2,
              explain:
                "Araştırmacı alışverişi açıkça eliyor ve oranı veriyor: «seven in ten people with a genuinely empty Saturday found it uncomfortable».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-6",
              no: 6,
              ref: "a6",
              text: "Why has Livia changed the appointment?",
              options: ["She keeps that half day free", "The room she uses was already taken", "She will be away that week"],
              answer: 0,
              explain:
                "İleti gerekçeyi veriyor: «Thursday afternoon is the one half day I keep clear», ve bunu baştan söylemesi gerektiğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the speaker's point about going to bed earlier?",
              options: ["It is always the best advice", "It suits some tired people only", "It is impossible for shift workers"],
              answer: 1,
              explain:
                "Konuşmacı ikiye ayırıyor: «for a lot of tired people that is the right answer. For the rest it is exactly wrong».",
            },
          ],
        },
        {
          id: "en-b1-12-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Between colleagues",
              genreTr: "Meslektaşlar arasında",
              situation: "İki meslektaş bir yarım günü konuşuyor.",
              plays: 2,
              segments: [
                { text: "You are out on Thursday afternoons now." },
                { text: "Every week since March." },
                { text: "Does nobody mind?" },
                { text: "Somebody minded for about a fortnight. Then it became a fact about Thursday, like the meeting on Monday, and nobody has mentioned it since." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir akşamı değerlendiriyor.",
              plays: 2,
              segments: [
                { text: "Was it not a good evening?" },
                { text: "It was one of the best evenings of the year." },
                { text: "So why do you look like that?" },
                { text: "Because it was four hours of talking and I have nothing left for tomorrow. Both things are true and people keep telling me they cannot be." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri bir öneriye karşılık veriyor.",
              plays: 2,
              segments: [
                { text: "So the plan is a course on Tuesday, the pool on Thursday and the walk on Sunday." },
                { text: "That is three things." },
                { text: "It is three good things." },
                { text: "It is still three things, and the week they go into is the same length as it was this morning." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "At the council office",
              genreTr: "Belediyede",
              situation: "İki görevli bir kararı konuşuyor.",
              plays: 2,
              segments: [
                { text: "So we are not doing the campaign." },
                { text: "No. We are opening the room and the garden instead." },
                { text: "The campaign was cheaper." },
                { text: "It was, and a poster telling people to rest is a poster telling people they are doing it wrong. A bench does not say anything." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi bir alışkanlığı tartışıyor.",
              plays: 2,
              segments: [
                { text: "You go to the same film at the same time every Sunday." },
                { text: "Same seat as well." },
                { text: "You could see something different." },
                { text: "I could, and then I would have to choose, and choosing is the part of the week I am trying to get away from." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi hafta sonu çalışmayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "It must be hard, working Saturdays." },
                { text: "The Saturday is fine. The hard part is that my free day is Tuesday, and on a Tuesday everybody I know is at work." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-h2-8",
              no: 8,
              ref: "b1",
              text: "What is the second speaker saying?",
              options: ["The objection did not last", "Her manager still refuses", "She may have to stop it"],
              answer: 0,
              explain:
                "Konuşmacı süreyi veriyor: «Somebody minded for about a fortnight», sonra durum sıradanlaşmış ve kimse bir daha söz etmemiş.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h2-9",
              no: 9,
              ref: "b2",
              text: "What is the main point?",
              options: ["The evening was disappointing", "A good evening can still tire you", "She should have stayed at home"],
              answer: 1,
              explain:
                "Konuşmacı iki yargıyı birlikte tutuyor: yılın en iyi akşamlarından biri, ama «four hours of talking and I have nothing left for tomorrow».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the second speaker's objection?",
              options: ["The activities are too expensive", "The days do not suit her", "Good things still take time"],
              answer: 2,
              explain:
                "Konuşmacı niteliği değil sayıyı sorun ediyor: «It is still three things, and the week they go into is the same length».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h2-11",
              no: 11,
              ref: "b4",
              text: "Why did they choose the room and the garden?",
              options: ["A campaign would cost more", "The garden was already there", "A poster carries a criticism"],
              answer: 2,
              explain:
                "Görevli maliyeti kabul edip gerekçeyi başka yere koyuyor: «a poster telling people to rest is a poster telling people they are doing it wrong».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h2-12",
              no: 12,
              ref: "b5",
              text: "Why does she always see the same film?",
              options: ["She wants to avoid choosing", "The seat is cheaper on Sunday", "She has seen everything else"],
              answer: 0,
              explain:
                "Konuşmacı gerekçeyi veriyor: «then I would have to choose, and choosing is the part of the week I am trying to get away from».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h2-13",
              no: 13,
              ref: "b6",
              text: "What does the speaker say is difficult?",
              options: ["Working on a Saturday", "Getting up early enough", "Being free when others are not"],
              answer: 2,
              explain:
                "Konuşmacı cumartesiyi açıkça eliyor: «The Saturday is fine», güçlük «on a Tuesday everybody I know is at work».",
            },
          ],
        },
        {
          id: "en-b1-12-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a new quiet room. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Yeni bir sessiz oda hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli yeni odayı anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good morning. The quiet room opens on the fourteenth and it is on the first floor, behind the stairs. It is open every day until eight in the evening; the rest of the library closes at six. There are twelve chairs and you cannot book one. Phones are not allowed in the room, and there is a shelf outside for them. The room was paid for out of the money left from the garden.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "The quiet room — notes",
              body: `Opens on the:        {{14}}
Floor:               {{15}}
The room is open until: {{16}}
Number of chairs:    {{17}}
Not allowed:         {{18}}
Paid for with money left from the {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-12-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["14", "fourteenth", "14th"],
              explain:
                "Kayıt açılış gününü veriyor: «The quiet room opens on the fourteenth». Birinci kat ayrı bir bilgi.",
            },
            {
              kind: "gap",
              id: "en-b1-12-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["first", "1", "1st"],
              explain:
                "«it is on the first floor, behind the stairs» — kat bilgisi. Merdiven arkası konumu tarif ediyor, kat değil.",
            },
            {
              kind: "gap",
              id: "en-b1-12-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["8", "eight"],
              explain:
                "«open every day until eight in the evening» — odanın kapanış saati. Altı, kütüphanenin geri kalanının kapanış saati.",
            },
            {
              kind: "gap",
              id: "en-b1-12-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["12", "twelve"],
              explain:
                "«There are twelve chairs and you cannot book one» — sandalye sayısı ve kayıt yok.",
            },
            {
              kind: "gap",
              id: "en-b1-12-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["phones", "phone"],
              explain:
                "«Phones are not allowed in the room, and there is a shelf outside for them» — yasak olan şey. Raf, telefonların bırakıldığı yer.",
            },
            {
              kind: "gap",
              id: "en-b1-12-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["garden"],
              explain:
                "«The room was paid for out of the money left from the garden» — paranın kaynağı.",
            },
          ],
        },
        {
          id: "en-b1-12-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who works at weekends. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Hafta sonları çalışan bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, on bir yıldır hafta sonu çalışan Yrsa ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You have worked weekends for eleven years. That must be the hardest part of the job." },
                { text: "It is not, and everybody asks it in that order. Saturday is a day like any other once you have done it for a month. What is hard is Tuesday." },
                { text: "Tuesday?" },
                { text: "My free day. Everybody I know is at work, the swimming pool is empty and the town is quiet. It sounds ideal and it is quite lonely." },
                { text: "Does the quiet not help you rest?" },
                { text: "It helps me sleep, which is not the same thing. I sleep beautifully on a Tuesday. I still arrive on Wednesday feeling as though nothing has been put back." },
                { text: "What would you change if you could?" },
                { text: "Not the shifts. I would move one thing: I would have a fixed hour on a Tuesday when somebody is expecting me. That is the piece I am missing, and it is small." },
                { text: "Have you tried joining something?" },
                { text: "I joined a course, and I left after six weeks. It was on a Tuesday, so that part worked. It was also a course, which means homework, and I had swapped one obligation for another." },
                { text: "So what does work?" },
                { text: "Two things, and neither is organised. A friend who also works weekends, and a garden that does not close until dark. I have gone there most Tuesdays since the spring, and it is the only hour that has held." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-12-h4-20",
              no: 20,
              ref: "d1",
              text: "What does Yrsa say about working on Saturdays?",
              options: ["It becomes ordinary quite fast", "It is the hardest part of the job", "It pays better than weekdays"],
              answer: 0,
              explain:
                "Yrsa sunucunun varsayımını düzeltiyor: «Saturday is a day like any other once you have done it for a month».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h4-21",
              no: 21,
              ref: "d1",
              text: "What is difficult about Tuesday?",
              options: ["The pool is closed that day", "She is free when others are not", "She has to work in the evening"],
              answer: 1,
              explain:
                "Yrsa günü tarif ediyor: «Everybody I know is at work, the swimming pool is empty», ve sonucu «quite lonely».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h4-22",
              no: 22,
              ref: "d1",
              text: "What does she say about the quiet?",
              options: ["It stops her sleeping", "It has got worse recently", "It helps her sleep, not rest"],
              answer: 2,
              explain:
                "Yrsa ayrımı kuruyor: «It helps me sleep, which is not the same thing», ve çarşamba günü hâlâ boş geldiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h4-23",
              no: 23,
              ref: "d1",
              text: "What one change would she make?",
              options: ["An hour when she is expected", "A different set of shifts", "One extra day off a month"],
              answer: 0,
              explain:
                "Yrsa vardiyaları açıkça dışarıda bırakıyor: «Not the shifts», istediği «a fixed hour on a Tuesday when somebody is expecting me».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h4-24",
              no: 24,
              ref: "d1",
              text: "Why did she leave the course?",
              options: ["It was on the wrong day", "It became another duty", "It was too expensive to keep"],
              answer: 1,
              explain:
                "Yrsa günü onaylıyor: «It was on a Tuesday, so that part worked», sorun ödevle birlikte «I had swapped one obligation for another».",
            },
            {
              kind: "mcq",
              id: "en-b1-12-h4-25",
              no: 25,
              ref: "d1",
              text: "What has worked for her?",
              options: ["A club she joined in spring", "Two things nobody organised", "Working fewer weekends"],
              answer: 1,
              explain:
                "Yrsa ikisini sayıyor ve niteliğini veriyor: «Two things, and neither is organised» — hafta sonu çalışan bir arkadaş ve karanlığa kadar açık bir bahçe.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and a description.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir betimleme.",
      tasks: [
        {
          id: "en-b1-12-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "A friend has invited you to something every weekend for the last two months. Write an email to your friend. Write about 100 words and cover all the points.",
          promptTr:
            "Bir arkadaşın son iki aydır her hafta sonu seni bir şeye çağırıyor. Arkadaşına bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Thank your friend and say what you have enjoyed.", tr: "Arkadaşına teşekkür et ve neyi sevdiğini söyle." },
              { de: "Say clearly that you are not coming this time, and why.", tr: "Bu sefer gelmediğini ve nedenini açıkça söyle." },
              { de: "Suggest something else, with a date.", tr: "Tarih vererek başka bir şey öner." },
            ],
            sample: `Hi Neda,

Thank you for asking me again, and please do not read this as a no to the walks. The June one along the river was the best day I had all summer.

I am not coming this Saturday. It is nothing to do with the group. I have been out every weekend since the middle of June, and I want one day in which nothing is arranged and nobody is waiting for me anywhere.

Could we do the same walk on the twentieth instead? I will be a much better person to walk with by then, and I will bring the coffee.

Livia`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Ret açık mı, yoksa belirsiz mi bırakılmış?",
              "Gerekçe kişiselleştirilip arkadaşı suçlamadan verildi mi?",
              "Öneri tarihli mi?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-12-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a text for a website with this title: \"A place where I do nothing\". Describe the place, say when you go and explain why it works for you. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir metin yaz: \"Hiçbir şey yapmadığım bir yer\". Yeri betimle, ne zaman gittiğini söyle ve neden işe yaradığını açıkla. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Describe the place.", tr: "Yeri betimle." },
              { de: "Say when you go there.", tr: "Oraya ne zaman gittiğini söyle." },
              { de: "Explain why it works for you.", tr: "Neden işe yaradığını açıkla." },
            ],
            sample: `There is a garden behind the old station with four benches, a tap and no music. It is open until dark and it costs nothing, and on a weekday afternoon there are usually two other people in it.

I go on Tuesdays, between three and four, because that is my free day and because the hour is fixed.

It works for the reason a café never did. In a café I am a customer and something is expected of me, even if it is only ordering a second coffee. On that bench nobody is waiting for anything, and after an hour I am ready for Wednesday.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Betimleme somut mu, birkaç ayrıntı verildi mi?",
              "Zaman belirtildi mi?",
              "Gerekçe bir karşılaştırmayla desteklendi mi?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has four tasks: an interview, a long turn, a task we do together, and a general conversation.",
      instructionTr: "Bu bölümde dört görev var: söyleşi, tek başına konuşma, birlikte yapılan bir görev ve genel sohbet.",
      tasks: [
        {
          id: "en-b1-12-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about weekends, free time and rest.",
          promptTr: "Sana hafta sonları, boş zaman ve dinlenme hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. What does a normal Saturday look like for you?", tr: "Günaydın. Senin için sıradan bir cumartesi nasıl geçiyor?" },
            { who: "you", hint: "Günü anlat ve bir ayrıntı ver.", expect: "sıradan bir günü ayrıntıyla anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Tell me about a day when you planned nothing at all.", tr: "Teşekkürler. Hiçbir şey planlamadığın bir günü anlat." },
            { who: "you", hint: "Tek bir günü anlat ve sonunda ne olduğunu söyle.", expect: "geçmişte tek bir günü sonucuyla anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had one extra free day every month, what would you do with it?", tr: "Her ay fazladan bir boş günün olsa onu ne yapardın?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a routine with a detail", tr: "Bir düzeni ayrıntıyla anlatmak" },
              { de: "narrate one day and its outcome", tr: "Tek bir günü sonucuyla anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "A normal Saturday starts late and then turns into jobs, because the week leaves them there and Saturday is where they land. I did once keep a whole Sunday free, and by eleven I had cleaned the oven and answered nine emails, which was not the plan. If I had one extra free day every month, I would keep it on a weekday and tell nobody about it, because a Saturday gets claimed and a Tuesday does not.",
            criteria: [
              "İlk cevapta somut bir ayrıntı verildi mi?",
              "Anlatı tek bir güne bağlı mı ve sonucu verildi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-12-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of resting: a free day with nothing arranged, or a free day with one fixed thing in it. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Dinlenmenin şu iki yolunu karşılaştır: hiçbir şeyin ayarlanmadığı boş bir gün mü, içinde tek bir sabit şey olan boş bir gün mü? Hangisini tercih edeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two kinds of day", tr: "İki gün türünü karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin günün bir olumsuz yanını da söyle" },
            ],
            sample:
              "A day with nothing arranged sounds like the better one, and in my experience it gets filled by half past ten with jobs I did not choose. A day with one fixed thing is smaller on paper and it holds, because the fixed hour gives the rest of the day a shape to sit around. I would take the second one. The disadvantage is real: one arrangement can become an obligation, and then you are getting ready for it from breakfast onwards, which is exactly what the day was supposed to be free of.",
            criteria: [
              "İki gün türü de gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (sounds like, smaller on paper, exactly what)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-12-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our town can spend a small amount of money on one thing for people who never stop. Talk with me about the options and decide together.",
          promptTr:
            "Kasabamız hiç durmayan insanlar için tek bir şeye küçük bir bütçe ayırabiliyor. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a quiet room in the library, a garden that stays open until dark, a poster campaign about resting, or a free swim early on weekdays. Which is worth the money?", tr: "Seçenekler: kütüphanede sessiz bir oda, karanlığa kadar açık bir bahçe, dinlenme üzerine afiş kampanyası ya da hafta içi erken saatte ücretsiz yüzme. Hangisi paraya değer?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I would defend the campaign. It reaches the whole town, and a room reaches the people who already go to the library. Does that change your mind?", tr: "Kampanyayı savunurum. Bütün kasabaya ulaşır, oda ise zaten kütüphaneye gidenlere ulaşır. Bu fikrini değiştirir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "All right. So what do we recommend?", tr: "Peki. Ne öneriyoruz?" },
            { who: "you", hint: "Ortak bir karar ver ve kısaca özetle.", expect: "ortak bir karara varmak ve gerekçesini özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give an opinion with a reason", tr: "Görüşü gerekçesiyle vermek" },
              { de: "answer an objection directly", tr: "Bir itiraza doğrudan karşılık vermek" },
              { de: "reach a decision together", tr: "Birlikte bir karara varmak" },
            ],
            sample:
              "I would put the money into the garden, because it is the only option that is open when somebody actually needs it, which is often after work and in the dark half of the year. Your point about reach is the strongest one against me and I will concede half of it: a room does reach fewer people. But a poster that tells a tired person to rest is also telling them they are getting it wrong. So let us recommend the garden, and ask the library to keep the room if it costs nothing.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-12-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether shops and offices should close on one day a week.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: dükkânlar ve iş yerleri haftada bir gün kapanmalı mı.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some people say every shop should close on the same day each week. Is that a good idea?", tr: "Kimileri bütün dükkânların haftanın aynı günü kapanmasını söylüyor. İyi bir fikir mi?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Others say that it would only move the work to another day and would hurt people who are paid by the hour. Would you agree?", tr: "Kimileri de bunun işi başka bir güne kaydıracağını ve saat başı ödenen kişilere zarar vereceğini söylüyor. Katılır mısın?" },
            { who: "you", hint: "Kısmen katıl ya da karşı çık; iki yanı da anmaya çalış.", expect: "bir iddiaya kısmen katılmak ya da karşı çıkmak, iki yanı da anmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "agree or disagree in a nuanced way", tr: "Katılırken ya da karşı çıkarken ince ayrım yapmak" },
            ],
            sample:
              "The same day for everybody is the part I like, because a free day is only worth much if the people you know have it too. My neighbour has Tuesdays off and spends them alone in an empty town. I partly agree about the hourly pay, and it is the serious objection: fewer hours can mean less money, and nobody who says this is a small problem is being paid that way. But moving the work is not automatic, and a shop that closes on Sunday does not usually sell less in the week.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, although)",
              "İki yan da anıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

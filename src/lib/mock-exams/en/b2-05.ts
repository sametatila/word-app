import type { MockPaper } from "../types";

/**
 * B2 · Deneme 5 — "Sport, Money and Fairness".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Spor B2 için verimli
 * çünkü aynı metinde sayı, kural dili ve çıkar çatışması bir arada
 * bulunuyor. Dinleme 4'ün söyleşisi de bilerek başka bir yay izliyor:
 * önceki iki kâğıtta "küçülen kurum" anlatısı vardı, burada konu bir
 * mesleği bırakma değil, sürdürebilme koşulları.
 *
 * B2 İMZALARI: edilgen, ileri bağlayıcı, üçüncü tip koşul ve ortaç öbeği
 * boşluksuz metinlerde geçiyor — imza taraması `{{n}}` işaretini sözcük
 * saymadığı için boşluklu görevlere yerleştirilemez.
 */
export const EN_B2_05: MockPaper = {
  id: "en-b2-05",
  course: "en",
  level: "B2",
  no: 5,
  theme: "Sport, Money and Fairness",
  themeTr: "Spor, para ve adalet",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. The first four are about vocabulary and grammar; the last three are reading tasks. Choose or write the correct answer for each question.",
      instructionTr:
        "Bu bölümde yedi görev var. İlk dördü kelime ve dilbilgisi, son üçü okuma görevi. Her soruda doğru cevabı seç ya da yaz.",
      tasks: [
        {
          id: "en-b2-05-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en uygun seçeneği bul. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "The season ticket problem",
              body: `A club that raises the price of a season ticket is usually described as {{1}} in on its own supporters, which is a strange way to describe a market.

Most clubs are now owned by people who did not grow up nearby, and that {{2}} for a good deal of what follows. A stadium is a fixed asset; a crowd is not.

Economists who study the sector {{3}} out that the largest share of income comes from broadcasting rather than from the gate. Blaming the ticket office alone therefore {{4}} the point.

Several leagues now limit the price of away tickets. Early evidence suggests that attendance rises modestly and that the clubs {{5}} very little, which the designers had not expected.

That result is worth {{6}} in mind, because a limit that costs nothing is also a limit that changes nothing.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-05-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["taking", "bringing", "calling", "cashing"],
              answer: 3,
              explain:
                "`cash in on somebody` bir durumdan haksız kazanç sağlamak demektir ve boşluktan sonra `in on` geliyor. `take in`, `bring in` ve `call in` bu edat dizisiyle bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["counts", "accounts", "answers", "allows"],
              answer: 1,
              explain:
                "`account for something` bir olguyu açıklamak demektir ve boşluktan sonra `for` var. `count for` değer taşımak, `answer for` hesap vermek, `allow for` payını bırakmak anlamındadır.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["point", "take", "bring", "set"],
              answer: 0,
              explain:
                "`point out that …` bir savı öne çıkarmanın kalıbıdır. `bring out` bir özelliği belirginleştirir ama `that` yan cümlesi almaz; `take out` ve `set out` bambaşka anlamlar taşır.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["loses", "fails", "misses", "drops"],
              answer: 2,
              explain:
                "`miss the point` bir savın özünü kaçırmak demektir. `lose the point` bir tartışmada puan kaybını çağrıştırır; `fail` bu adla doğrudan kullanılmaz ve `drop the point` konuyu bırakmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["miss", "lose", "drop", "fall"],
              answer: 1,
              explain:
                "`lose money` gelir kaybını anlatan yerleşik kullanımdır ve cümledeki özne kulüpler. `miss` kaçırmayı, `drop` düşürmeyi bildirir; `fall` geçişsizdir ve `very little` nesnesini alamaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["holding", "carrying", "taking", "bearing"],
              answer: 3,
              explain:
                "`bear something in mind` akılda tutmak demektir ve `worth` ardından ulaç ister: «worth bearing in mind». `hold`, `carry` ve `take` bu kalıpta kullanılmaz.",
            },
          ],
        },
        {
          id: "en-b2-05-l2",
          no: 2,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and think of the word which best fits each gap, 7 to 12. Use only ONE word in each gap.",
          promptTr: "Metni oku ve 7–12. boşluklara en uygun sözcüğü bul. Her boşluğa YALNIZ BİR sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Report extract",
              genreTr: "Rapor bölümü",
              title: "Where the money went",
              body: `Nobody disputes that the money in professional sport has grown. What is disputed is {{7}} it has gone.

A league that sells its broadcasting rights collectively can share the income; one that sells them club {{8}} club cannot.

The difference is easy to state and, {{9}} the evidence of the last twenty years, easy to underestimate.

In the first system the gap between the richest and the poorest club is about four to one. In the second, {{10}} is closer to twenty.

Neither arrangement is natural. Both were chosen, and both can {{11}} chosen again, which is the only sentence in this report that anybody is likely to argue {{12}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-05-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["where"],
              explain:
                "Cümle bir yer sorusunu ad cümlesine çeviriyor: paranın nereye gittiği tartışmalı. `where` bu yan cümleyi kurar. `that` bir olguyu bildirir ve tartışmanın konusunu belirsiz bırakırdı.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["by"],
              explain:
                "`club by club` tek tek, birimlerin ayrı ayrı ele alındığını bildiren bir kalıptır (one by one, day by day). `to` ya da `for` bu yapıda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["on"],
              explain:
                "`on the evidence of …` kanıta dayanarak demektir. `with the evidence` ya da `by the evidence` bu belirteç öbeğini kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["it"],
              explain:
                "Boşluk önceki cümledeki `the gap` öznesine gönderme yapıyor ve tekil: «In the second, it is closer to twenty». `there` yeni bir varlık tanıtır, oysa burada bilinen bir öznenin yeni değeri veriliyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["be"],
              explain:
                "Kip fiilinden (`can`) sonra yalın hâl gerekir ve cümle edilgen: «can be chosen again». `is` kip fiiliyle yan yana gelemez, `been` ise `have` ister.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["with", "about"],
              explain:
                "`argue with something` bir savı karşısına almayı, `argue about` bir konu üzerinde tartışmayı bildirir; ilgi cümlesinde edat sona kaldığı için ikisi de doğaldır. `argue against` da anlamca yakındır ama `that` ile kurulan bu yapıda seyrek kullanılır.",
            },
          ],
        },
        {
          id: "en-b2-05-l3",
          no: 3,
          format: "gap",
          goal: "structure",
          prompt:
            "Read the text and use the word given in capitals at the end of each line to form a word that fits the gap, 13 to 18.",
          promptTr:
            "Metni oku ve 13–18. maddelerde büyük harfle verilen kökten boşluğa uyan sözcüğü türet.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Encyclopaedia entry",
              genreTr: "Ansiklopedi maddesi",
              title: "Amateur status",
              body: `Amateur status was the rule by which an athlete could compete only if they received no payment for their {{13}}.

Its defenders described it as a protection. Its critics pointed to its {{14}}: the rule never applied equally to somebody with money and somebody without.

Neither description is complete. The rule rarely stopped payment, and it was not {{15}} to, because the payments moved into expenses and into jobs that existed on paper.

What it did do is narrower and still worth naming: it gave governing bodies a way of removing an athlete without a {{16}}.

Several sports abandoned the rule in the nineteen-eighties. The most visible result was a marked {{17}} in the number of countries winning medals.

The most likely future is therefore an open one, with different sports drawing the line according to their own {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-05-l3-13",
              no: 13,
              text: "PARTICIPATE",
              accept: ["participation"],
              explain:
                "`payment for their ___` yapısında iyelik sıfatından sonra bir ad gerekiyor: `participation`. Fiil biçimi bu konumda duramaz; `participant` ise bir kişiyi adlandırır ve ödeme bir kişi için değil, katılım için yapılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l3-14",
              no: 14,
              text: "HYPOCRITE",
              accept: ["hypocrisy"],
              explain:
                "İki nokta üst üstenin ardındaki açıklama kuralın eşitsiz uygulandığını söylüyor; eleştiri İKİYÜZLÜLÜĞE yapılıyor. `its` iyelik sıfatı bir ad ister ve `hypocrite` bir kişiyi adlandırır, bir niteliği değil.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l3-15",
              no: 15,
              text: "INTEND",
              accept: ["intended"],
              explain:
                "`it was not ___ to` yapısı edilgen bir ortaç ister: kural bunun için TASARLANMAMIŞTI. `intend` fiilinin üçüncü hâli bu edilgeni kurar; ad biçimi (`intention`) `to` mastarıyla bu yapıyı kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l3-16",
              no: 16,
              text: "HEAR",
              accept: ["hearing"],
              explain:
                "`without a ___` yapısında belirsiz tanımlıktan sonra bir ad geliyor ve bağlam hukuki: savunma hakkı tanımadan uzaklaştırmak. `a hearing` bu duruşma anlamını taşır; fiil biçimi burada duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l3-17",
              no: 17,
              text: "WIDE",
              accept: ["widening"],
              explain:
                "`a marked ___ in the number` yapısında `a` ile `in` arasında bir ad var ve süreç bildiren biçim gerekiyor: `widening`. Sıfat (`wide`) belirsiz tanımlıkla tek başına ad öbeği kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l3-18",
              no: 18,
              text: "HISTORY",
              accept: ["histories"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different sports`), dolayısıyla ad da çoğul. `historical` sıfattır ve bu konumda duramaz.",
            },
          ],
        },
        {
          id: "en-b2-05-l4",
          no: 4,
          format: "transform",
          goal: "structure",
          prompt:
            "Complete the second sentence so that it has a similar meaning to the first, using the word given. Do NOT change the word given. Write between two and five words.",
          promptTr:
            "İkinci cümleyi, birincisiyle aynı anlama gelecek biçimde tamamla; verilen sözcüğü kullan ve DEĞİŞTİRME. İki ile beş sözcük arası yaz.",
          items: [
            {
              kind: "gap",
              id: "en-b2-05-l4-19",
              no: 19,
              text: "They will not announce the result until the second test is finished.\nThe result ______ until the second test is finished.",
              cue: "ANNOUNCED",
              accept: ["will not be announced"],
              explain:
                "Etken gelecek zaman edilgene çevriliyor: «The result will not be announced». Anahtar sözcük üçüncü hâl olduğu için `be` zorunlu; `will not announce` özneyi eyleyen yapar ve anlamı bozar.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l4-20",
              no: 20,
              text: "It was a mistake to let the club sign the contract.\nThe club ______ to sign the contract.",
              cue: "ALLOWED",
              accept: ["should not have been allowed"],
              explain:
                "«It was a mistake to let …» yapısı geçmişe dönük bir eleştiriye çevriliyor ve cümle edilgen: `should not have been allowed`. Anahtar sözcük üçüncü hâl olduğu için zincir `have been` ile tamamlanıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l4-21",
              no: 21,
              text: "The committee only realised the problem after the season had ended.\nNot until the season had ended ______ the problem.",
              cue: "DID",
              accept: ["did the committee realise", "did the committee realize"],
              explain:
                "Olumsuz bir zaman öbeği cümle başına geçtiğinde özne ile yardımcı fiil devrilir: «Not until … did the committee realise». Anahtar sözcük `did` bu devrik yapının yardımcı fiili ve ardından yalın fiil gelir.",
            },
            {
              kind: "gap",
              id: "en-b2-05-l4-22",
              no: 22,
              text: "I regret that we sold the training ground.\nI wish ______ the training ground.",
              cue: "SOLD",
              accept: ["we had not sold"],
              explain:
                "Geçmişe dair pişmanlık `wish + past perfect` ile kurulur ve pişmanlık yapılmış bir şeye ait olduğu için yapı olumsuza döner: «I wish we had not sold». `wish we did not sell` şimdiki bir durumu anlatırdı.",
            },
          ],
        },
        {
          id: "en-b2-05-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–27. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Newspaper column",
              genreTr: "Gazete köşe yazısı",
              title: "Eleven years as a club secretary",
              body: `For eleven years I was the secretary of a small athletics club, and I want to describe what that involved, because the answer is not what people assume and it explains something about amateur sport.

The visible work is the smallest part. Two training sessions a week and eight meetings a year come to perhaps two hundred hours, which anybody can find. The invisible work is the rest: the forms, the insurance, which is checked by nobody until it matters, and the four hours spent finding out why a bill was wrong. Add the two evenings a month on the telephone to people who had promised something and then not done it.

I kept a record for one year, because a friend asked me to. The total was six hundred and forty hours. At the minimum wage that is about nine thousand pounds of unpaid work, and the club's entire annual income was eleven thousand. Faced with those two numbers side by side, I did nothing for a fortnight. If I had known the figure in the first year, I would have asked for help long before I did.

I should be careful here, because the obvious conclusion is the wrong one. The answer is not that clubs should employ somebody, since almost none of them could afford it. Nor is it that volunteers should stop, which would close half the sport in this country within a season.

What I have changed is smaller. When somebody now says that a club runs on goodwill, I ask them to put an hour figure on it. Nevertheless, I remain uncertain what the right arrangement is, and anybody who is certain has probably not done the arithmetic.`,
              gloss: [
                { de: "a secretary", tr: "yazman", en: "club secretary" },
                { de: "insurance", tr: "sigorta", en: "insurance" },
                { de: "goodwill", tr: "iyi niyet", en: "goodwill" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-05-l5-23",
              no: 23,
              text: "What does the writer say about the visible work?",
              options: ["It is the most demanding part", "It is done entirely by other volunteers", "It is a small fraction of the total", "It has increased in recent years"],
              answer: 2,
              explain:
                "Metin oranı veriyor: görünür iş «perhaps two hundred hours», toplam ise altı yüz kırk saat. «The visible work is the smallest part» cümlesi de bunu doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l5-24",
              no: 24,
              text: "Why did the writer keep a record?",
              options: ["A friend suggested it", "The club's accountant required it", "She wanted to resign", "The insurance company asked for it"],
              answer: 0,
              explain:
                "Gerekçe cümlenin içinde: «I kept a record for one year, because a friend asked me to». Sigorta ve muhasebe metinde başka bağlamlarda geçiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l5-25",
              no: 25,
              text: "What does the comparison of the two figures show?",
              options: ["The club was badly managed", "The club should raise its fees", "The club was losing money in every single year", "The unpaid work was worth most of the club's income"],
              answer: 3,
              explain:
                "İki sayı yan yana konuyor: «about nine thousand pounds of unpaid work» ve «the club's entire annual income was eleven thousand». Kulübün zarar ettiği ya da kötü yönetildiği hiçbir yerde söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l5-26",
              no: 26,
              text: "Why does the writer reject the idea of employing somebody?",
              options: ["Because the volunteers do the work better", "Because almost no club could afford it", "Because the committee would not agree", "Because it would close half the sport"],
              answer: 1,
              explain:
                "Gerekçe doğrudan veriliyor: «since almost none of them could afford it». Yarım sporun kapanması ise ötekini, gönüllülerin bırakmasını reddetme gerekçesi.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-l5-27",
              no: 27,
              text: "What has the writer changed?",
              options: ["She has left the club", "She now employs a part-time assistant", "She asks people to quantify goodwill", "She has stopped keeping any records at all"],
              answer: 2,
              explain:
                "Son paragraf: «When somebody now says that a club runs on goodwill, I ask them to put an hour figure on it». Yazının kendisi çözümden emin olmadığını da açıkça söylüyor.",
            },
          ],
        },
        {
          id: "en-b2-05-l6",
          no: 6,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One sentence is missing from each of the gaps 28 to 31. Which sentence a to e fits which gap? One sentence fits nowhere.",
          promptTr:
            "Metni oku. 28–31. boşluklarda birer cümle eksik. a–e cümlelerinden hangisi hangi boşluğa uyar? Bir cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Sports feature",
              genreTr: "Spor yazısı",
              title: "Why a level playing field is harder than it sounds",
              body: `Every governing body says that it wants fair competition, and almost every rule it writes makes the field less level in some direction. {{28}}

Consider a limit on how much a club may spend on wages. The number is the same for everybody and the effect is not. {{29}}

The same difficulty appears with equipment. A rule that allows any suit made from an approved material sounds neutral, and it favours whoever can afford to test forty of them. {{30}}

Some federations now publish the expected effect of a rule before adopting it. The change is small and it is resisted, mainly because it makes the trade-off visible. {{31}}

None of this is an argument against rules, which are the only thing standing between sport and an auction. It is an argument for saying which unfairness you have chosen.`,
              gloss: [
                { de: "a governing body", tr: "federasyon, yönetim kurulu", en: "governing body" },
                { de: "a trade-off", tr: "ödünleşim", en: "trade-off" },
                { de: "an auction", tr: "açık artırma", en: "auction" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "A club with a large existing squad can keep it; one hoping to build a squad cannot afford to." },
            { key: "b", label: "b", body: "That resistance is itself informative, since it shows what the vagueness was protecting." },
            { key: "c", label: "c", body: "The testing is the advantage, and the rule does not mention testing at all." },
            { key: "d", label: "d", body: "This is the harder lesson, because it cannot be fixed by writing the rule more carefully." },
            { key: "e", label: "e", body: "Attendance at international finals has grown in every decade since the nineteen-sixties." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-05-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "d",
              explain:
                "İlk cümle bir çelişki kuruyor: adalet isteyen her kural sahayı bir yönde eğiyor. (d) bunu «the harder lesson» diye adlandırıyor ve kuralı daha dikkatli yazmanın çözmediğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-05-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "a",
              explain:
                "Önceki cümle «The number is the same for everybody and the effect is not» diyor; (a) bu farkı somutlaştırıyor: kadrosu olan kulüp tutabilir, kadro kuracak olan kuramaz.",
            },
            {
              kind: "match",
              id: "en-b2-05-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "c",
              explain:
                "Paragraf avantajı adlandırıyor: kural «favours whoever can afford to test forty of them». (c) bu avantajın kuralda hiç anılmadığını ekleyerek tarafsızlık görüntüsünü çürütüyor.",
            },
            {
              kind: "match",
              id: "en-b2-05-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Önceki cümle direnci ve gerekçesini veriyor: «because it makes the trade-off visible». (b) direncin kendisinden bir çıkarım yapıyor. (e) uluslararası final seyirci sayısından söz ediyor ve metnin hiçbir yerinde seyirci sayısı tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-05-l7",
          no: 7,
          format: "match",
          goal: "detail",
          reuseOptions: true,
          prompt:
            "Read the four short texts a to d. For questions 32 to 36, decide which text says this. The texts may be chosen more than once.",
          promptTr:
            "a'dan d'ye dört kısa metni oku. 32–36. maddeler için bunu hangi metin söylüyor, karar ver. Bir metin birden çok kez seçilebilir.",
          options: [
            {
              key: "a",
              label: "a — Bertan, club treasurer",
              body: "We put the junior fee up by three pounds a month and lost nine families in a term. Nobody complained; they simply stopped coming. I would do it again, because the alternative was closing, but anybody who says a small rise costs nothing has not watched the register.",
            },
            {
              key: "b",
              label: "b — Nadja, physiotherapist",
              body: "Coaches are blamed for injuries that begin with the fixture list. A body that plays sixty matches has a different risk from one that plays forty, and nobody who writes the calendar has ever had to explain that to a nineteen-year-old. The problem starts above us.",
            },
            {
              key: "c",
              label: "c — Osku, ticket manager",
              body: "My job is to fill the stadium and I am judged on that alone. Nobody has ever asked me whether the people in the seats are the same people who were there ten years ago. Change what you measure me on and the prices will change within a season.",
            },
            {
              key: "d",
              label: "d — Saga, teacher",
              body: "My pupils can name every player in two leagues. What defeats them is the idea that a club is an organisation with accounts and choices, because there is nothing dramatic to hold on to. That is the harder thing to teach and we barely try.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-05-l7-32",
              no: 32,
              text: "Which text says the problem begins above the person speaking?",
              answer: "b",
              explain:
                "Nadja sorumluluğu fikstürü yazanlara taşıyor: «nobody who writes the calendar has ever had to explain that to a nineteen-year-old. The problem starts above us».",
            },
            {
              kind: "match",
              id: "en-b2-05-l7-33",
              no: 33,
              text: "Which text describes a decision that had a measurable cost?",
              answer: "a",
              explain:
                "Bertan kararı ve bedelini birlikte veriyor: aylık üç poundluk zam ve bir dönemde dokuz aile. Kimse şikâyet etmemiş, «they simply stopped coming».",
            },
            {
              kind: "match",
              id: "en-b2-05-l7-34",
              no: 34,
              text: "Which text says that changing an incentive would change behaviour quickly?",
              answer: "c",
              explain:
                "Osku koşulu ve süreyi birlikte söylüyor: «Change what you measure me on and the prices will change within a season». Ölçüt değişirse davranış hızla değişir.",
            },
            {
              kind: "match",
              id: "en-b2-05-l7-35",
              no: 35,
              text: "Which text identifies a difficulty that has nothing dramatic in it?",
              answer: "d",
              explain:
                "Saga öğrencileri asıl zorlayan şeyi tarif ediyor: kulübün hesapları ve seçimleri olan bir kurum olduğu fikri, «because there is nothing dramatic to hold on to».",
            },
            {
              kind: "match",
              id: "en-b2-05-l7-36",
              no: 36,
              text: "Which text challenges people who claim a change is painless?",
              answer: "a",
              explain:
                "Bertan doğrudan bir itiraz kuruyor: «anybody who says a small rise costs nothing has not watched the register». Zammı savunuyor ama bedelini inkâr edenleri karşısına alıyor.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction:
        "This part has four tasks. You hear short extracts, a talk, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-05-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Maç öncesi stadyumda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A short announcement before kick-off. The away end will be opened at half past two, not at two, because of a problem with the turnstiles. Tickets bought online are being checked by hand, so please have your phone ready." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir kulüp üyeye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your junior membership. The fee for the new season is one hundred and eight pounds, which is nine pounds a month. If that is difficult, please ring me rather than simply not renewing; we have a fund and almost nobody uses it." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki görevli seyirci sayısını konuşuyor.",
              plays: 2,
              segments: [
                { text: "How many came on Saturday?" },
                { text: "Four hundred and ten." },
                { text: "That is up." },
                { text: "It is up on last month and down on last season. Everybody quotes the first number." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman dinleyici sorusunu yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "Listeners ask me every week whether the wage limit works. The honest answer is that the question is badly formed: works for what? For keeping clubs alive, the evidence is reasonable. For making the league competitive it is much weaker, and for the players it depends entirely on the position." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Gönüllülere görev öncesi bilgi veriliyor.",
              plays: 2,
              segments: [
                { text: "A note for everybody on the gate. Anything found in the stand goes to the office, not to the bin, except food. Lost phones are the one thing we are asked about all week, and we log every single one." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir gönüllü pazar günü için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Sunday. I can do the gate and the programmes, but I have to leave at four for my mother. If we open at one we will have the queue clear by then, and Xenia said she can stay to the end." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir danışman kulüp kuranlara sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of running a club is pricing from your own costs. Your costs are not interesting to a parent. Price from what a family can pay in February, and then find the rest somewhere else." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "At a match",
              genreTr: "Maçta",
              situation: "İki seyirci boş bir tribünü konuşuyor.",
              plays: 2,
              segments: [
                { text: "Why is this stand so empty?" },
                { text: "It is the most expensive one." },
                { text: "Cheaper than the one opposite?" },
                { text: "Twelve pounds more, and the view is worse. Everybody knows and nobody changes it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-05-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the problem?",
              options: ["The match starts later", "One entrance opens later", "Online tickets are not valid"],
              answer: 1,
              explain:
                "Anons tek bir gecikme bildiriyor: «The away end will be opened at half past two, not at two». Maç saati değişmiyor; çevrim içi biletler geçerli, yalnız elle kontrol ediliyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the club asking members to do?",
              options: ["Pay for the whole year at once", "Renew before the end of the current month", "Get in touch if the fee is a problem"],
              answer: 2,
              explain:
                "İleti tek bir rica taşıyor: «please ring me rather than simply not renewing; we have a fund and almost nobody uses it». Peşin ödeme ya da son tarih hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the second speaker's point?",
              options: ["The comparison depends on the period", "Attendance has been rising steadily all year", "The figures are unreliable"],
              answer: 0,
              explain:
                "Aynı sayı iki karşılaştırmada zıt sonuç veriyor: «up on last month and down on last season». Rakamın doğruluğu sorgulanmıyor, seçilen dönem sorgulanıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say about the question?",
              options: ["It has a clear answer", "It needs to be made more specific", "Nobody asks it often enough to matter"],
              answer: 1,
              explain:
                "Konuşmacı sorunun kuruluşunu eleştiriyor: «the question is badly formed: works for what?» ve üç ayrı ölçüt için üç ayrı cevap veriyor. Soru haftada bir soruluyor, yani seyrek değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-5",
              no: 5,
              ref: "a5",
              text: "What must volunteers do with a lost phone?",
              options: ["Put it in the bin with the food", "Keep it at the gate until the Monday", "Take it to the office and log it"],
              answer: 2,
              explain:
                "Talimat iki adım veriyor: bulunan her şey ofise gidiyor ve «we log every single one». Yalnız yiyecek istisna; kapıda tutmaktan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Agreeing to help within a time limit", "Asking somebody to take her place all day", "Cancelling"],
              answer: 0,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can do the gate and the programmes, but I have to leave at four». Xenia yerine geçmiyor, sona kadar KALIYOR.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Reducing the costs during the first year", "Explaining the costs to parents", "Pricing from what families can afford"],
              answer: 2,
              explain:
                "Öğüt açık: «Price from what a family can pay in February, and then find the rest somewhere else». Maliyet velinin ilgilendiği bir şey değil, sonradan kapatılacak bir açık.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the second speaker say?",
              options: ["The stand is closed", "The price does not match the view", "The stand opposite is completely empty too"],
              answer: 1,
              explain:
                "İki bilgi yan yana: bu tribün on iki pound daha pahalı «and the view is worse». Tribün kapalı değil, boş; karşı tribünün doluluğu hiç söylenmiyor.",
            },
          ],
        },
        {
          id: "en-b2-05-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting three years of results from a sports club. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir spor kulübünün üç yıllık sonuçlarını anlatan bir kadını dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Kulüp sorumlusu üç yıllık sonuçları anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. I will give you our three-year figures and I will not pretend that all of them are comfortable. We began with sixty junior members and we now have two hundred and forty. In three years we have run about nine hundred training sessions. Here is the first surprise: the group that grows fastest is not the under-twelves, it is the over-fifties, because that is where nothing else in the town exists. Second, the day matters more than the price. A session on Saturday morning fills within an hour; the same session on Tuesday evening is half empty, and that pattern has held for three years. Third, the format of the newsletter. We tried a video, a long email and a single card in the bag, and the card outperformed the other two, which disappointed the two of us who like writing. Fourth, a caution: our own survey shows that the families who leave are the ones who never came to a social event, and we have not solved that. And finally, money. Seventy per cent of our income comes from one grant, and that is the risk that keeps me awake, not the weather.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Sports club — three-year results",
              body: `The club began with {{9}} junior members.

It now has {{10}} members.

About {{11}} training sessions have been run in three years.

The group that grows fastest is the {{12}}.

A session on {{13}} morning fills within an hour.

The most effective format was the {{14}}.

The families who leave never came to a {{15}}.

{{16}} per cent of the income comes from one grant.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-05-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["60", "sixty"],
              explain:
                "«We began with sixty junior members» — başlangıçtaki sayı. İki yüz kırk bugünkü sayı; iki sayı aynı cümlede geçtiği için ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["240", "two hundred and forty"],
              explain:
                "«we now have two hundred and forty» — bugünkü üye sayısı. Altmış, kulübün kurulduğu andaki sayı.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["900", "nine hundred"],
              explain:
                "«In three years we have run about nine hundred training sessions» — üç yıllık antrenman sayısı. Cümlede `About` zaten yazılı olduğu için yalnız sayı isteniyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["over-fifties"],
              explain:
                "Kayıt beklentiyi bozuyor: «not the under-twelves, it is the over-fifties», çünkü kasabada bu yaş için başka hiçbir şey yok. On iki yaş altını yazan öğrenci çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["Saturday"],
              explain:
                "«A session on Saturday morning fills within an hour» — hızlı dolan gün. Salı akşamı karşılaştırmanın öteki ucu ve yarı boş kalıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["card"],
              explain:
                "Üç biçim denenmiş ve «the card outperformed the other two». Video ile uzun e-posta elenen biçimler; kart çantaya konan tek sayfalık not.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["social event", "social"],
              explain:
                "En rahatsız edici bulgu: ayrılan aileler «the ones who never came to a social event». Sorun antrenmanda değil, kulübe bağlanma anında.",
            },
            {
              kind: "gap",
              id: "en-b2-05-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["70", "seventy"],
              explain:
                "«Seventy per cent of our income comes from one grant» — tek kaynağa bağlılık oranı. Konuşmacı asıl riskin hava değil bu olduğunu ekliyor.",
            },
          ],
        },
        {
          id: "en-b2-05-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about sport and money, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Spor ve para üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The public is blamed for a failure that belongs to the organisers." },
            { key: "b", label: "A true figure can still give a false impression." },
            { key: "c", label: "The incentives reward the wrong behaviour." },
            { key: "d", label: "The speaker has changed their own practice." },
            { key: "e", label: "Things are better than they used to be." },
            { key: "f", label: "The problem is the scale, not the principle." },
            { key: "g", label: "Clubs should refuse to sell broadcasting rights." },
            { key: "h", label: "New rules help far less than people assume." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı lisans kurallarından söz ediyor.",
              plays: 2,
              segments: [
                { text: "We adopted the new licensing rules four years ago. The paperwork was honest and the inspector was thorough. Two clubs in our division have failed since then, and both failed for exactly the reason the rules were written to catch." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı taraftara verilen öğütleri ele alıyor.",
              plays: 2,
              segments: [
                { text: "It is easy to say that people should support their local club. Show me where, at what time on a Saturday, and at what price for a family of four, and then we can have that conversation." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı eski fikstürleri yeniden okuyor.",
              plays: 2,
              segments: [
                { text: "I have kept the fixture lists since 1994 and I read them again last month. There are fewer midweek matches, the travel is shorter and somebody now asks the players. On the things that can be measured, this is a better decade." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı zincirdeki ölçütlerden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Nobody in this chain is acting badly. The coach is judged on results, the chairman on the league position, the sponsor on television minutes. Each of them behaves reasonably and the result is a nineteen-year-old playing sixty matches." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kendi sitelerindeki bir rakamı anlatıyor.",
              plays: 2,
              segments: [
                { text: "The figure on our website is correct: ninety per cent of our players come from within thirty miles. What it does not say is that those players get about a fifth of the minutes on the pitch." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı velilere yolladığı bir notu anlatıyor.",
              plays: 2,
              segments: [
                { text: "I now send every parent a note listing the three things our club does badly. The questions I get back are completely different, and much better. I should have started years ago." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-05-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "h",
              explain:
                "Kurallar dört yıldır uygulanıyor ve denetim düzgün, ama «both failed for exactly the reason the rules were written to catch». Kuralları kötülemiyor, etkisinin sanılandan küçük olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-05-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı öğüdün koşullarını soruyor: «at what price for a family of four». Sorumluluk taraftara yükleniyor ama gerçekte önünde bir seçenek yok.",
            },
            {
              kind: "match",
              id: "en-b2-05-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "1994'ten beri fikstür saklayan konuşmacı üç somut fark sayıyor: daha az hafta içi maç, daha kısa yolculuk ve oyuncuya sorulması. «this is a better decade» değerlendirmesi bunlara dayanıyor.",
            },
            {
              kind: "match",
              id: "en-b2-05-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Kimse kötü niyetli değil ama ölçütler ayrı: sonuç, lig sırası, televizyon dakikası. «Each of them behaves reasonably and the result is a nineteen-year-old playing sixty matches».",
            },
            {
              kind: "match",
              id: "en-b2-05-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Rakamın doğruluğu kabul ediliyor ama tamamlanıyor: «those players get about a fifth of the minutes on the pitch». Doğru bir sayı yanlış bir izlenim bırakabiliyor.",
            },
            {
              kind: "match",
              id: "en-b2-05-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "d",
              explain:
                "Konuşmacı kendi uygulamasını değiştirmiş: her veliye kulübün kötü yaptığı üç şeyi yazıyor ve gelen sorular değişmiş. «I should have started years ago» bunu pekiştiriyor.",
            },
          ],
        },
        {
          id: "en-b2-05-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who trains new match officials. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "Yeni hakemleri yetiştiren bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında hakem eğitmeniyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Xenia, you refereed for fifteen years and you now train new officials. How many of the people you train are still refereeing after two seasons?" },
                { speaker: "Xenia", text: "About four in ten, and that number is the whole conversation. Everything else people say about refereeing follows from it." },
                { speaker: "Host", text: "Why do the other six stop?" },
                { speaker: "Xenia", text: "Not for the reason that gets written about. The abuse is real and it is not the main cause; most of them stop because they were left alone. A new official does thirty matches in a first season and nobody watches a single one of them." },
                { speaker: "Host", text: "What would help?" },
                { speaker: "Xenia", text: "An experienced official standing on the touchline, saying nothing during the match and twenty minutes afterwards. It is not expensive and it is not glamorous, and I have been asking for it since 2014." },
                { speaker: "Host", text: "Has anything improved?" },
                { speaker: "Xenia", text: "Yes, and I want to be clear about it, because people in my position are expected to say no. Clubs are fined properly now, the reporting takes ten minutes instead of an hour, and the county association answers within a week. Those are real." },
                { speaker: "Host", text: "What do people get wrong about referees?" },
                { speaker: "Xenia", text: "They think we want to be liked. We want to be predictable. A referee who is inconsistent and pleasant is much harder to play against than one who is strict and the same every week." },
                { speaker: "Host", text: "Do you miss refereeing?" },
                { speaker: "Xenia", text: "The Saturdays, honestly. Ninety minutes in which nothing else exists is a rare thing, and anybody who says otherwise has not had it. I miss it, and I stopped at the right time." },
                { speaker: "Host", text: "What would you say to somebody thinking about it?" },
                { speaker: "Xenia", text: "Do not start alone. Find the person in your league who has done it for twenty years and ask them to come to three of your matches. If they say no, ask somebody else; and if nobody says yes, that tells you what the league is like before you find out the hard way." },
              ],
              gloss: [
                { de: "a match official", tr: "maç hakemi", en: "match official" },
                { de: "the touchline", tr: "taç çizgisi", en: "touchline" },
                { de: "to be fined", tr: "para cezası almak", en: "be fined" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-05-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Xenia say about the retention figure?",
              options: ["It is better than in most sports", "It has improved recently", "Everything else follows from it"],
              answer: 2,
              explain:
                "Xenia sayıyı merkeze koyuyor: «that number is the whole conversation. Everything else people say about refereeing follows from it». Başka sporlarla karşılaştırma yapmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-24",
              no: 24,
              ref: "d1",
              text: "Why do most new officials stop?",
              options: ["They are not supported", "They are abused by spectators", "They cannot get enough matches"],
              answer: 0,
              explain:
                "Xenia yaygın açıklamayı sınırlıyor: «The abuse is real and it is not the main cause; most of them stop because they were left alone». Maç sayısı da eksik değil: ilk sezonda otuz maç.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-25",
              no: 25,
              ref: "d1",
              text: "What does she want?",
              options: ["Considerably higher fees for new officials", "An experienced official at the match", "Fewer matches in the first season"],
              answer: 1,
              explain:
                "İstek somut: «An experienced official standing on the touchline, saying nothing during the match and twenty minutes afterwards». Ücret ya da maç sayısı hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-26",
              no: 26,
              ref: "d1",
              text: "What does she say has improved?",
              options: ["The behaviour of spectators at every level", "The number of new officials each season", "The fines and the reporting system"],
              answer: 2,
              explain:
                "Üç somut iyileşme sayıyor: «Clubs are fined properly now, the reporting takes ten minutes instead of an hour, and the county association answers within a week». Seyirci davranışı için böyle bir şey söylemiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-27",
              no: 27,
              ref: "d1",
              text: "What do people get wrong about referees?",
              options: ["They assume referees want to be liked", "They assume referees are paid too much", "They assume referees enjoy conflict"],
              answer: 0,
              explain:
                "Xenia düzeltmeyi kendisi yapıyor: «They think we want to be liked. We want to be predictable». Ücret ve çatışma sevgisi kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-28",
              no: 28,
              ref: "d1",
              text: "What does she miss?",
              options: ["The travel to matches every weekend", "The ninety minutes of nothing else", "The other officials"],
              answer: 1,
              explain:
                "«The Saturdays, honestly. Ninety minutes in which nothing else exists is a rare thing». Özlediği şey bu yoğunlaşma; yine de doğru zamanda bıraktığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-29",
              no: 29,
              ref: "d1",
              text: "What is her advice to a new official?",
              options: ["Find an experienced person to attend matches", "Start in the lowest league that will have you", "Referee only during the summer months"],
              answer: 0,
              explain:
                "Öğüt açık: «Find the person in your league who has done it for twenty years and ask them to come to three of your matches». Lig düzeyi ya da mevsim hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-05-h4-30",
              no: 30,
              ref: "d1",
              text: "What does she say a refusal would tell you?",
              options: ["That the person is too busy", "That you should referee somewhere else entirely", "Something about the league itself"],
              answer: 2,
              explain:
                "Son cümle: «if nobody says yes, that tells you what the league is like before you find out the hard way». Ret tek bir kişi hakkında değil, ortam hakkında bilgi veriyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 70,
      instruction: "This part has two tasks. Write 140 to 190 words for each. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var. Her biri için 140–190 kelime yaz. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-b2-05-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed sport and money. Now write an essay for your teacher, answering this question: \"Should there be a limit on how much a club can spend?\" Use the two ideas below and add one idea of your own.\n\nIdeas: whether it makes the competition closer — who would enforce it",
          promptTr:
            "İngilizce dersinde sporu ve parayı tartıştınız. Öğretmenin için bir deneme yaz: \"Bir kulübün harcamasına sınır konmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: rekabeti yakınlaştırır mı — bunu kim denetler",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss whether a limit makes the competition closer.", tr: "Sınırın rekabeti yakınlaştırıp yakınlaştırmadığını tartış." },
              { de: "Discuss who would enforce it.", tr: "Bunu kimin denetleyeceğini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost everyone agrees that a competition in which one club always wins is not worth watching. The disagreement begins as soon as somebody asks what a spending limit would actually do.

The evidence on competitiveness is mixed. Where limits have been introduced, the gap between the top and the bottom has narrowed slightly, but the same clubs still win, because a limit protects the position of whoever is already large. That is an argument for designing the limit carefully rather than against limits themselves.

The second objection is stronger. A rule of this kind has to be checked by somebody, and the body that checks it is usually funded by the clubs it is checking. Without independent auditing the limit becomes a document rather than a rule.

My own view is that the interesting number is not the total but the share spent on players under twenty-one. A limit that says nothing about where the money goes will simply move it.

Leagues should therefore set a limit, but tie it to an independent audit and to a floor for youth spending.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Karşı görüşün gücü kabul edildi mi, yoksa zayıf bir hâli mi kuruldu?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (although, in my view, whereas)",
              "140–190 kelime aralığında mı?",
              "Kayıt deneme yazısına uygun mu?",
            ],
          },
        },
        {
          id: "en-b2-05-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You write for a student website. Write a review of a sports club, a gym or a team you have joined recently. Say what it offers, what it does well, and who would be disappointed by it. Write 140 to 190 words.",
          promptTr:
            "Bir öğrenci sitesi için yazıyorsun. Yakınlarda katıldığın bir spor kulübünün, salonun ya da takımın değerlendirmesini yaz. Neler sunduğunu, neyi iyi yaptığını ve kimin hayal kırıklığına uğrayacağını söyle. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what it offers.", tr: "Neler sunduğunu söyle." },
              { de: "Say what it does well, with an example.", tr: "Neyi iyi yaptığını bir örnekle söyle." },
              { de: "Say who would be disappointed, and why.", tr: "Kimin hayal kırıklığına uğrayacağını ve nedenini söyle." },
            ],
            sample: `The Riverside Running Club meets three times a week and it is far less intimidating than that description suggests.

There are four groups by pace, and the slowest one is genuinely slow: on my first evening I finished last by two minutes and three people had waited at the corner. The Tuesday session is on the track and the Sunday one is on grass, which the club insists on because it says legs need one soft surface a week.

What it does particularly well is refuse to pretend that everybody is an athlete. Nobody asked me for a time, nothing is measured unless you ask, and the noticeboard has a column for people who came and walked.

It is not for everyone. If you want structured coaching towards a specific race, you will be disappointed, because there is no plan beyond the session in front of you. Anybody who dislikes talking should also be warned: the last twenty minutes are in a café.

For somebody starting again after years away, however, it is the easiest door I have found.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "\"İyi yaptığı şey\" somut bir örnekle mi desteklendi?",
              "Olumsuz taraf gerçekten söylendi mi, yoksa yalnız övgü mü var?",
              "Değerlendirme kaydı tutarlı mı? Okuyucuya seslenen bir ton kurulmuş mu?",
              "140–190 kelime aralığında mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: an interview, a long turn, and a task we do together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, tek başına konuşma ve birlikte yapılan bir görev.",
      tasks: [
        {
          id: "en-b2-05-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about sport, clubs and what people pay for.",
          promptTr: "Sana spor, kulüpler ve insanların neye para ödediği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Do you belong to any club or group, and has that changed over the years?", tr: "Günaydın. Bir kulübe ya da gruba üye misin, bu yıllar içinde değişti mi?" },
            { who: "you", hint: "Şimdiki durumu ve değişimi anlat, bir gerekçe ver.", expect: "bir alışkanlığı ve zaman içindeki değişimini gerekçesiyle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Can you think of a time when the price of something stopped you from taking part?", tr: "Teşekkürler. Bir şeyin fiyatının katılmanı engellediği bir anı hatırlıyor musun?" },
            { who: "you", hint: "Somut bir örnek ver ve kararını çözümle.", expect: "somut bir örnek vermek ve kendi kararını çözümlemek", seconds: 45 },
            { who: "partner", de: "And what makes you think that a club is well run rather than simply popular?", tr: "Bir kulübün yalnız popüler değil, iyi yönetildiğini düşünmeni ne sağlıyor?" },
            { who: "you", hint: "Bir ölçüt söyle ve sınırını da kabul et.", expect: "bir ölçüt öne sürmek ve sınırını kabul etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give developed answers with reasons", tr: "Gerekçeli, geliştirilmiş cevaplar vermek" },
              { de: "analyse your own earlier decision", tr: "Kendi eski kararını çözümlemek" },
            ],
            sample:
              "I swam with a club until I was seventeen and then stopped for eleven years; I joined a running group last spring, mainly because it meets at a time I can actually reach. The price stopped me once: a gym near my old flat cost fifty a month and I told myself it was about time, which was not true. What makes me think a club is well run now is whether it can tell you where its money goes, although I have to admit I have only asked twice.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Somut bir örnek verildi mi, yoksa genel mi konuşuldu?",
              "Kendi kararı çözümlendi mi, yalnız anlatıldı mı?",
              "Öne sürülen ölçütün sınırı kabul edildi mi?",
            ],
          },
        },
        {
          id: "en-b2-05-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of funding a small sports club, say which is better and explain one problem with your choice: charging members what it actually costs, or keeping fees low and depending on grants.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Küçük bir spor kulübünü finanse etmenin şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: üyelerden gerçek maliyeti almak mı, aidatı düşük tutup hibelere dayanmak mı?",
          prepSeconds: 60,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "compare the two approaches", tr: "İki yaklaşımı karşılaştır" },
              { de: "state and justify a preference", tr: "Bir tercihi belirt ve gerekçelendir" },
              { de: "identify a problem with your own choice", tr: "Kendi seçiminde bir sorunu adlandır" },
            ],
            sample:
              "Charging the real cost is honest and it makes the club independent: nobody can withdraw a grant in March and close you in April. The difficulty is arithmetical rather than moral, because the real cost usually excludes exactly the families the club says it exists for. Grants keep the fee low and buy time, but they come with reporting, and a small club spends the equivalent of one volunteer a year writing applications. I would charge closer to the real cost and hold a quiet fund for the families who cannot pay it. The problem with my own choice is that a quiet fund depends on somebody asking, and the people least likely to ask are the ones it was created for.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (independence, reporting, exclude)",
            ],
          },
        },
        {
          id: "en-b2-05-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A league wants more people to keep refereeing after their first season. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir lig, hakemlerin ilk sezondan sonra devam etmesini istiyor. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: an experienced official at three matches in the first season, higher fees, automatic fines for clubs whose supporters abuse officials, and a rule that no new official works alone. Which of these would actually keep people refereeing?", tr: "Fikirler: ilk sezonda üç maçta deneyimli bir hakemin bulunması, daha yüksek ücret, taraftarı hakeme hakaret eden kulüplere otomatik para cezası ve yeni hakemin tek başına görev yapmaması kuralı. Sence bunlardan hangisi insanları hakemlikte tutar?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the automatic fines. A club cannot control every spectator, and a fine falls on the volunteers who run it, not on the person who shouted. Does that change your view?", tr: "Otomatik para cezasını sorgularım. Bir kulüp her seyirciyi denetleyemez ve ceza bağıran kişiye değil, kulübü çeviren gönüllülere düşer. Bu görüşünü değiştirir mi?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "Fair. So which two do we recommend, and which one do we reject?", tr: "Peki. Hangi ikisini öneriyoruz, hangisini reddediyoruz?" },
            { who: "you", hint: "İki öneri ve bir ret kararı ver, her birini kısaca gerekçelendir.", expect: "ortak bir karara varmak ve hem seçimi hem reddi gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "evaluate the options against each other", tr: "Seçenekleri birbirine karşı değerlendirmek" },
              { de: "handle an objection", tr: "Bir itirazı karşılamak" },
              { de: "reach a joint decision with reasons", tr: "Gerekçeli ortak bir karara varmak" },
            ],
            sample:
              "The strongest one is the experienced official at three matches, because the reason people leave is being alone rather than being shouted at. You are right that a fine lands on the wrong people, so I would keep it only for repeated cases and publish the record instead of raising the amount. Higher fees seem worse than the disease: they attract people for the money and the money is never enough. So I would recommend the mentoring and the rule about not working alone, and reject the higher fees.",
            criteria: [
              "Seçenekler birbirine karşı mı değerlendirildi?",
              "İtiraza doğrudan karşılık verildi mi ve kısmi kabul yapılabildi mi?",
              "Hem iki öneri hem bir ret gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı? (You are right that …)",
            ],
          },
        },
      ],
    },
  ],
};

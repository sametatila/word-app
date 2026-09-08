import type { MockPaper } from "../types";

/**
 * B2 · Deneme 8 — "Old Age, Care and Living Alone".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Konu B2 için elverişli
 * çünkü bütün malzeme tek bir kavram karışıklığının üstünde duruyor: yalnız
 * yaşamak ile yalnızlık aynı sözcükle anılıyor ve yanlış hizmet bu yüzden
 * gidiyor. Bu, tanım-sonuç kuruluşuna ve edilgen yapıya doğal zemin veriyor.
 *
 * Metin mimarisi bilerek yedinci denemeden ayrı: orada uzun yazı birinci
 * tekil bir itiraftı, burada üçüncü tekil bir habercilik ve sonucu belirsiz.
 * Dinlemedeki söyleşi de uzmanla değil hizmeti dokuz yıldır alan kişiyle;
 * yani bu kâğıtta konuyu en iyi bilen kişi onu yönetmeyen kişi.
 */
export const EN_B2_08: MockPaper = {
  id: "en-b2-08",
  course: "en",
  level: "B2",
  no: 8,
  theme: "Old Age, Care and Living Alone",
  themeTr: "Yaşlılık, bakım ve yalnız yaşamak",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. You complete texts, transform sentences, read an article and match texts and sentences.",
      instructionTr:
        "Bu bölümde yedi görev var. Metinleri tamamlayacak, cümleleri dönüştürecek, bir yazı okuyacak ve metin/cümle eşleyeceksin.",
      tasks: [
        {
          id: "en-b2-08-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en iyi uyan cevabı seç. a, b, c ya da d.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Feature article",
              genreTr: "Dergi yazısı",
              title: "One word for two different things",
              body: `Living alone and being lonely are not the same thing, and the two are constantly run {{1}} in the way services are designed.

About a third of people over seventy-five live on their own. Most of them do not describe themselves as lonely, and the ones who do are not always the ones on their own; the loneliest people in a survey frequently {{2}} out to share a house with somebody.

Confusing the two {{3}} in a practical problem. A service designed for loneliness sends somebody to talk. A service designed for living alone sends somebody who can reach a high shelf. Very few schemes ask which of the two is needed.

The visit that is usually offered {{4}} place once every two weeks and lasts twenty minutes, which is long enough to be observed and not long enough to be known.

Nobody set out to design it that way. It is what you are {{5}} with when a budget is divided by a number of households.

The alternative is not more money, or not only that. It is asking one question at the start and {{6}} on the answer.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-08-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["over", "together", "through", "across"],
              answer: 1,
              explain:
                "`run two things together` onları ayırt etmeden birleştirmek demektir ve cümlenin savı tam budur. `run over` ezmek ya da gözden geçirmek, `run through` baştan sona geçmek, `run across` ise rastlamaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["work", "come", "find", "turn"],
              answer: 3,
              explain:
                "`turn out to be` beklenenin tersinin ortaya çıkmasını bildirir ve cümle tam bir şaşırtıcı bulgu veriyor. `come out` ortaya çıkmak anlamına gelse de `to` mastarıyla bu kalıbı kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["results", "leads", "causes", "brings"],
              answer: 0,
              explain:
                "`result in something` bir şeye yol açmak demektir ve `in` edatını alır. `lead` bu anlamda `to` ister, `cause` ve `bring` ise doğrudan nesne alır, edatsız.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["makes", "has", "takes", "gives"],
              answer: 2,
              explain:
                "`take place` bir olayın gerçekleşmesini bildiren yerleşik eşdizimdir. `make place` ya da `give place` bu anlamda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["gone", "left", "kept", "held"],
              answer: 1,
              explain:
                "`be left with something` istenmeden elde kalanı bildirir ve cümle bunun tasarlanmadığını söylüyor: «Nobody set out to design it that way». Öteki ortaçlar `with` ile bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["working", "taking", "moving", "acting"],
              answer: 3,
              explain:
                "`act on something` eldeki bilgiye göre davranmak demektir ve cümle soruyu sormanın tek başına yetmediğini söylüyor. `work on` üzerinde çalışmak, `take on` üstlenmek, `move on` ise geçmektir.",
            },
          ],
        },
        {
          id: "en-b2-08-l2",
          no: 2,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and think of the word which best fits each gap, 7 to 12. Use only ONE word in each gap.",
          promptTr: "Metni oku ve 7–12. boşluklara en iyi uyan sözcüğü düşün. Her boşluğa yalnız TEK sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Review article",
              genreTr: "Derleme yazısı",
              title: "What the surveys measure",
              body: `Loneliness is measured {{7}} asking people to agree or disagree with a short list of statements.

The list has been in use since the 1970s, and it has the advantage {{8}} being comparable across forty years.

It also has a weakness that its authors were open about: it asks how somebody feels, {{9}} how often anybody comes to the door.

Nor {{10}} the two questions produce the same map. Rural districts score badly on contact and well on feeling. Despite that, the two are still reported as a single figure.

There is a further problem. The people least likely to answer a survey are the people {{11}} whom the answer would matter most.

{{12}} the sample is corrected for that, the published figures describe the households that were willing to open the door.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-08-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["by"],
              explain:
                "Yöntem bildiren edat `by`dir ve ardından `-ing` gelir: «measured by asking people». Başka bir edat bu araç anlamını vermez.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["of"],
              explain:
                "`the advantage of + -ing` yerleşik kalıptır: «the advantage of being comparable». `advantage` adı bu tümleci `of` ile alır.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["not"],
              explain:
                "Virgülden sonra bir karşıtlık kuruluyor: soru duyguyu soruyor, sıklığı sormuyor. Bu ikili yapı `A, not B` biçimindedir.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["do"],
              explain:
                "Cümle olumsuz `Nor` ile başlıyor ve devrik kuruluş gerektiriyor: yardımcı fiil özneden önce gelir. Özne `the two questions` çoğul olduğu için `do`.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["for"],
              explain:
                "`matter to` ve `matter for` arasından bu yapıda edat ilgi adılından önce gelir: «the people for whom the answer would matter most». `whom` bir edatın nesnesi olduğu için boşluk edatla dolar.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["unless"],
              explain:
                "Cümle bir koşulu olumsuzlayarak kuruluyor: düzeltme yapılmadıkça rakamlar yalnız kapıyı açanları anlatır. `Unless` bu olumsuz koşulu tek sözcükle verir.",
            },
          ],
        },
        {
          id: "en-b2-08-l3",
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
              title: "Home care",
              body: `Home care is the provision of practical help to people who remain in their own housing rather than moving into an institution.

Its stated aim is to postpone {{13}} on residential services for as long as it is safe to do so.

Social {{14}} is not the same as loneliness, and schemes frequently treat the two as one, with the result that the wrong service is offered.

Assessments carried out at the door have been criticised for their {{15}}: two workers visiting the same household in the same week frequently disagree.

The most common {{16}} is a short visit, typically of twenty minutes, repeated at intervals set by a budget rather than by need.

A small number of households accounts for a {{17}} share of the hours delivered.

Reviews conclude that outcomes depend less on the number of hours than on whether the person keeps the {{18}} to decide what happens in their own day.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-08-l3-13",
              no: 13,
              text: "DEPEND",
              accept: ["dependence", "dependency"],
              explain:
                "`postpone ___ on residential services` yapısında fiilin nesnesi bir ad olmalı ve `on` tümleci bu adın kendi edatıdır. Sıfat biçimi (`dependent`) `postpone` fiilinin nesnesi olamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l3-14",
              no: 14,
              text: "ISOLATE",
              accept: ["isolation"],
              explain:
                "`Social ___ is not the same as loneliness` yapısında sıfattan sonra gelen öğe cümlenin öznesi, yani bir ad: `isolation`. Fiil biçimi bu konumda özne olamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l3-15",
              no: 15,
              text: "RELY",
              accept: ["unreliability"],
              explain:
                "İki nokta üst üstenin ardındaki açıklama aynı haneyi gören iki görevlinin sık sık ayrı sonuca varmasıdır: eleştiri GÜVENİLMEZLİĞE yapılıyor. `rely` fiilinden `reliable` sıfatı, ondan `reliability` adı, ondan da olumsuzu `unreliability` türetilir.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l3-16",
              no: 16,
              text: "INTERVENE",
              accept: ["intervention"],
              explain:
                "`The most common ___ is a short visit` yapısında en üstünlük sıfatından sonra gelen öğe öznedir ve yüklem `is` olduğu için tekil bir ad gerekir.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l3-17",
              no: 17,
              text: "PROPORTION",
              accept: ["disproportionate"],
              explain:
                "`a ___ share` yapısında belirsiz tanımlıkla ad arasında bir sıfat var ve cümle küçük bir grubun payının büyüklüğünü vurguluyor: `disproportionate`. Ad biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l3-18",
              no: 18,
              text: "ABLE",
              accept: ["ability"],
              explain:
                "`keeps the ___ to decide` yapısında belirli tanımlıktan sonra bir ad geliyor ve ardından mastar tümleci var: `the ability to decide`. Sıfat biçimi bu kalıbı kurmaz.",
            },
          ],
        },
        {
          id: "en-b2-08-l4",
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
              id: "en-b2-08-l4-19",
              no: 19,
              text: "They are going to reduce the number of visits next year.\nThe number of visits ______ next year.",
              cue: "REDUCED",
              accept: ["is going to be reduced"],
              explain:
                "`be going to` ile kurulan gelecek edilgene çevriliyor. Özne `the number` tekil olduğu için `is`, anahtar sözcük üçüncü hâl olduğu için zincir `is going to be + reduced` biçimini alır.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l4-20",
              no: 20,
              text: "It is not necessary for you to fill in the form again.\nYou ______ in the form again.",
              cue: "NEED",
              accept: ["do not need to fill", "don't need to fill"],
              explain:
                "Gereksizlik `not necessary` yerine `do not need to + yalın fiil` ile veriliyor. Anahtar sözcük `need` olduğu için yasak bildiren `must not` kullanılamaz; anlam farklı olurdu.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l4-21",
              no: 21,
              text: "Although she is eighty-nine, she still does all her own cooking.\n______ eighty-nine, she still does all her own cooking.",
              cue: "SPITE",
              accept: ["in spite of being"],
              explain:
                "`Although + cümle` yapısı `in spite of + ad/-ing` yapısına çevriliyor. `in spite of` bir edat öbeği olduğu için ardından çekimli fiil değil `being` gelir.",
            },
            {
              kind: "gap",
              id: "en-b2-08-l4-22",
              no: 22,
              text: "The council has been sending somebody every two weeks since March.\nShe ______ every two weeks since March.",
              cue: "VISITED",
              accept: ["has been visited"],
              explain:
                "Mart'tan beri süren bir eylem edilgene çevriliyor ve `since` yakın geçmişin sürerliğini gerektiriyor: «has been visited». Yalın present perfect edilgeni (`has been visited` yerine `was visited`) süreyi taşımaz.",
            },
          ],
        },
        {
          id: "en-b2-08-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–27. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "News feature",
              genreTr: "Haber yazısı",
              title: "The scheme that does less",
              body: `Vesna Aro runs a service in a town of eleven thousand people, and the first thing she tells any visitor is what it does not do.

There are no scheduled visits. There is a telephone number answered by a person, a key held in a box, and a promise that somebody will come within two hours of being asked. That is the whole design.

The scheme was not built on a theory. It was built on a survey that went wrong. Aro's team had asked six hundred households what they wanted more of, expecting the answer to be company. The most common answer was notice. People wanted to know when somebody was coming, and the second most common answer was to be asked first.

Three years of figures now exist, and they are not simple. Emergency admissions in the town have fallen by about a tenth, which is more than the designers of the scheme had predicted. If the survey had gone as expected, the scheme would have looked like every other one. Reported loneliness has not moved at all.

Aro is unusually willing to say so. She points out that her service was never designed to reach loneliness, and that a scheme which cannot reach something should not be judged on it. Her critics reply that this is convenient, and one of them notes that the same argument would defend any service from any measurement whatsoever.

The awkward part is the cost. Doing less is not cheaper here: the promise of two hours requires people who are paid to be available and are frequently not called. The town accepts that bill because the money saved on emergency admissions lands in the same budget. A town where the hospital is funded from somewhere else would be paying for a benefit it never sees.`,
              gloss: [
                { de: "an admission", tr: "hastaneye yatış", en: "admission" },
                { de: "notice", tr: "önceden haber verme", en: "notice" },
                { de: "convenient", tr: "işine gelen", en: "convenient" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-08-l5-23",
              no: 23,
              text: "What is unusual about the service?",
              options: [
                "It offers nothing on a fixed timetable",
                "It is run entirely by volunteers",
                "It replaces the hospital in the town",
                "It costs less than the visits it replaced",
              ],
              answer: 0,
              explain:
                "Tasarımın tamamı üç öğeden ibaret ve ilki bir yokluk: «There are no scheduled visits». Maliyetin daha düşük olmadığı ise son paragrafta açıkça söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l5-24",
              no: 24,
              text: "What did the survey find?",
              options: [
                "That people wanted more company",
                "That people wanted much longer visits",
                "That people wanted warning and consultation",
                "That people did not want any help",
              ],
              answer: 2,
              explain:
                "Ekip arkadaşlık bekliyordu ama sonuç başka çıktı: «The most common answer was notice» ve ikincisi «to be asked first».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l5-25",
              no: 25,
              text: "What do the three years of figures show?",
              options: [
                "Both loneliness and admissions fell",
                "Neither of the two figures changed",
                "Loneliness fell but admissions did not",
                "Admissions fell but loneliness did not",
              ],
              answer: 3,
              explain:
                "İki rakam ayrı yönlerde: «Emergency admissions in the town have fallen by about a tenth» ama «Reported loneliness has not moved at all».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l5-26",
              no: 26,
              text: "How does Aro answer her critics?",
              options: [
                "She argues that the loneliness figures are wrong",
                "She says loneliness was never the aim",
                "She accepts that the scheme has failed",
                "She promises to add scheduled visits",
              ],
              answer: 1,
              explain:
                "Aro ölçütü reddediyor, rakamı değil: «her service was never designed to reach loneliness, and … a scheme which cannot reach something should not be judged on it».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-l5-27",
              no: 27,
              text: "What does the writer say about the cost?",
              options: [
                "It is only repaid where the savings return",
                "It is far lower than the previous system",
                "The town has refused to pay it",
                "It falls steadily as the scheme grows",
              ],
              answer: 0,
              explain:
                "Son cümleler koşulu kuruyor: «the money saved on emergency admissions lands in the same budget», yoksa «would be paying for a benefit it never sees». Ucuz olmadığı da açıkça söyleniyor.",
            },
          ],
        },
        {
          id: "en-b2-08-l6",
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
              genre: "Science feature",
              genreTr: "Bilim yazısı",
              title: "Two words that have been treated as one",
              body: `Public discussion has a habit of using one word where two are needed, and the cost of that habit is usually paid by whoever is being described. {{28}}

Living alone is a fact about a household. Loneliness is a report about a feeling. The first can be counted from a register in an afternoon; the second has to be asked about, and people who are asked do not always answer honestly. {{29}}

The two do overlap, which is what makes the confusion durable. Around a quarter of people who live alone report loneliness, and so do around a fifth of the people who do not. {{30}}

The consequence is visible in what gets funded. A service aimed at loneliness sends somebody to talk, and it is judged on whether people feel better. A service aimed at living alone sends somebody who can reach a shelf, and it is judged on whether anybody fell. {{31}}

The remedy is unglamorous, and it is not expensive. It is a first question, asked once, about which of the two the person in front of you actually has. Given how little that question costs, its absence from almost every form is hard to explain.`,
              gloss: [
                { de: "durable", tr: "kalıcı", en: "durable" },
                { de: "a register", tr: "kayıt, sicil", en: "register" },
                { de: "unglamorous", tr: "gösterişsiz", en: "unglamorous" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "That is a genuine overlap, and it is nowhere near large enough to justify treating the two as one thing." },
            { key: "b", label: "b", body: "In this case the two words are living alone and being lonely, and almost every service runs them together." },
            { key: "c", label: "c", body: "A household that needs the second is regularly offered the first, and is then recorded as having refused help." },
            { key: "d", label: "d", body: "One of them is therefore cheap to measure and dependable, and the other is neither of those things." },
            { key: "e", label: "e", body: "The number of single-person households in Europe passed the number of couples with children in 2011." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-08-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "b",
              explain:
                "Giriş genel bir alışkanlıktan söz ediyor: «using one word where two are needed». (b) «In this case» ile o genellemeyi bu yazının konusuna indiriyor ve iki sözcüğü adlandırıyor.",
            },
            {
              kind: "match",
              id: "en-b2-08-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "d",
              explain:
                "Paragraf ikisinin ölçülme biçimini karşılaştırıyor: biri «counted from a register in an afternoon», öteki dürüst olmayabilen bir yanıta bağlı. (d) «One of them … and the other» diye o karşıtlığı toparlıyor.",
            },
            {
              kind: "match",
              id: "en-b2-08-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "a",
              explain:
                "Paragraf iki oranı verip örtüşmeyi kabul ediyor: dörtte bir ile beşte bir. (a) örtüşmeyi «genuine» diye onaylayıp yine de yeterli olmadığını söyleyerek savı sürdürüyor.",
            },
            {
              kind: "match",
              id: "en-b2-08-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "c",
              explain:
                "Paragraf iki hizmeti ayırıyor: biri «sends somebody to talk», öteki «sends somebody who can reach a shelf». (c) yanlış eşleşmenin kayda nasıl geçtiğini ekliyor: «recorded as having refused help». (e) Avrupa'daki tek kişilik hane sayısından söz ediyor ve metnin hiçbir yerinde hane sayısının seyri tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-08-l7",
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
              label: "a — Emir, care worker",
              body: "Twenty minutes is not a visit, it is an inspection. There are about four minutes in that twenty when I could ask a real question, and I use them, and it puts me behind for the rest of the day. Nobody has ever asked me what I would do with thirty minutes. I would not spend them on conversation. I would spend them on the stairs.",
            },
            {
              key: "b",
              label: "b — Anouk, daughter",
              body: "My mother has three people coming and none of them knows the others. Each one asks her how she is and writes the answer down somewhere I cannot see. She is eighty-eight and she has become extremely good at telling three different people that she is fine. What I wanted was one person, and I would have taken one person for half the time.",
            },
            {
              key: "c",
              label: "c — Bexi, commissioner",
              body: "We buy hours because hours are what a contract can describe. I know this is the wrong unit, and I have not found a right one that survives a procurement process. When somebody shows me a contract written in outcomes that a court could actually enforce, I will sign it that afternoon.",
            },
            {
              key: "d",
              label: "d — Tomo, researcher",
              body: "The evidence for befriending schemes is thinner than their popularity suggests, and I say that as somebody who has recommended them. What the evidence does support is much duller: keeping people out of hospital by mending the bathroom. That finding has never once been on the front of a newspaper.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-08-l7-32",
              no: 32,
              text: "says that the service is bought in the wrong unit",
              answer: "c",
              explain:
                "Metin gerekçesiyle birlikte kabul ediyor: «We buy hours because hours are what a contract can describe. I know this is the wrong unit».",
            },
            {
              kind: "match",
              id: "en-b2-08-l7-33",
              no: 33,
              text: "would accept less time in exchange for one familiar person",
              answer: "b",
              explain:
                "Metin takası açıkça yapıyor: «What I wanted was one person, and I would have taken one person for half the time».",
            },
            {
              kind: "match",
              id: "en-b2-08-l7-34",
              no: 34,
              text: "has recommended something the evidence does not strongly support",
              answer: "d",
              explain:
                "Metin kendi payını da veriyor: «The evidence for befriending schemes is thinner than their popularity suggests, and I say that as somebody who has recommended them».",
            },
            {
              kind: "match",
              id: "en-b2-08-l7-35",
              no: 35,
              text: "says extra time would not be spent on talking",
              answer: "a",
              explain:
                "Metin varsayılan cevabı reddediyor: «I would not spend them on conversation. I would spend them on the stairs».",
            },
            {
              kind: "match",
              id: "en-b2-08-l7-36",
              no: 36,
              text: "has not found a workable alternative to the present method",
              answer: "c",
              explain:
                "Metin arayışı ve engeli birlikte veriyor: «I have not found a right one that survives a procurement process».",
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
        "This part has four tasks. You hear short extracts, a report, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-08-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Care worker",
              genreTr: "Bakım görevlisi",
              situation: "Bir bakım görevlisi günlük programından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I have got fourteen calls today and the drive between the last two is nineteen minutes. Whoever built the round has never driven it. I am not asking for fewer people. I am asking whoever writes the list to sit in the car once." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Daughter",
              genreTr: "Kızı",
              situation: "Bir kadın annesi için doldurduğu formu anlatıyor.",
              plays: 2,
              segments: [
                { text: "The first form asked whether she lives alone and I ticked yes. Nothing on that form asked whether she sees anybody, and she sees four people a week. She got the loneliness service, and she did not get the handrail." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Commissioner",
              genreTr: "Hizmet alım sorumlusu",
              situation: "Bir sorumlu yayımlanan rakamı savunuyor.",
              plays: 2,
              segments: [
                { text: "We publish the number of hours delivered because it is the number we can defend. If I published the number of households where anything actually changed, I would have to explain how we know, and we do not know." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Researcher",
              genreTr: "Araştırmacı",
              situation: "Bir araştırmacı arkadaşlık programlarını değerlendiriyor.",
              plays: 2,
              segments: [
                { text: "Befriending schemes are popular with everybody except the evidence. That is not an argument for stopping them; loneliness is real and people like the visits. It is an argument against reporting them as though they prevented hospital admissions, because they do not." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Man living alone",
              genreTr: "Yalnız yaşayan bir adam",
              situation: "Bir adam kendisine sunulan yardımı anlatıyor.",
              plays: 2,
              segments: [
                { text: "People keep offering me company. I have a brother who telephones every day and a card game on Thursdays. What I cannot do is get the shopping up two flights of stairs, and there is no form for that." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Alarm hizmetinde bir değişiklik duyuruluyor.",
              plays: 2,
              segments: [
                { text: "A change to the alarm service. From April the button connects you to a person in this county rather than to a call centre somewhere else. The number is unchanged and the charge is unchanged. What changes is who answers." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Between colleagues",
              genreTr: "İş arkadaşları arasında",
              situation: "İki görevli bir kaydı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did she refuse the visit?" },
                { text: "She refused the one we offered. She asked whether it could be Tuesday and we said Thursday, and the system records that as a refusal." },
                { text: "So the figures say she does not want help." },
                { text: "The figures say she does not want Thursday." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı ailelerin rolünü ele alıyor.",
              plays: 2,
              segments: [
                { text: "There is an argument that families should do this, and I have some sympathy with it, because most of it is done by families already. What the argument forgets is that the average person doing it is sixty-one and has a job. It is not a spare resource. It is a resource that is already fully used." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-08-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the speaker asking for?",
              options: ["For the round to be planned realistically", "For a reduction in the number of calls", "For a different car to be provided"],
              answer: 0,
              explain:
                "Konuşmacı isteğini karşıtıyla veriyor: «I am not asking for fewer people. I am asking whoever writes the list to sit in the car once».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-2",
              no: 2,
              ref: "a2",
              text: "What went wrong?",
              options: ["The form was completed incorrectly", "The service arrived far too late", "The wrong question was asked"],
              answer: 2,
              explain:
                "Form yalnız hane durumunu soruyor: «Nothing on that form asked whether she sees anybody». Kutu doğru işaretlenmiş, sorulan soru yanlış.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-3",
              no: 3,
              ref: "a3",
              text: "Why is that particular figure published?",
              options: ["Because it is the largest available figure", "Because it can be defended", "Because the public asked for it"],
              answer: 1,
              explain:
                "Sorumlu gerekçeyi kendisi veriyor: «it is the number we can defend», ötekini yayımlarsa nasıl bildiğini açıklaması gerekecek.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-4",
              no: 4,
              ref: "a4",
              text: "What is the speaker objecting to?",
              options: ["The claims go further than the evidence", "The schemes should be closed down at once", "Loneliness has been greatly exaggerated"],
              answer: 0,
              explain:
                "Araştırmacı programları savunuyor ama iddiayı sınırlıyor: «It is an argument against reporting them as though they prevented hospital admissions».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the speaker need?",
              options: ["Somebody to telephone him daily", "A different card game on Thursdays", "Practical help with the stairs"],
              answer: 2,
              explain:
                "Adam eksiği adlandırıyor: «What I cannot do is get the shopping up two flights of stairs». Telefon ve kart oyunu zaten var.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-6",
              no: 6,
              ref: "a6",
              text: "What is changing?",
              options: ["The number people must call", "Who answers the call", "The monthly charge for the service"],
              answer: 1,
              explain:
                "Duyuru aynı kalanları sayıp değişeni son cümlede veriyor: «The number is unchanged and the charge is unchanged. What changes is who answers».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-7",
              no: 7,
              ref: "a7",
              text: "What is wrong with the record?",
              options: ["A preference has been recorded as a refusal", "The visit was never actually offered to her", "Two visits were counted as one"],
              answer: 0,
              explain:
                "İkinci görevli ayrımı yapıyor: «The figures say she does not want Thursday», oysa sistem bunu ret olarak kaydediyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the speaker say about families?",
              options: ["They should not be expected to help", "They are the cheapest available option", "They are already doing as much as they can"],
              answer: 2,
              explain:
                "Konuşmacı savı kısmen kabul edip sınırını koyuyor: «It is not a spare resource. It is a resource that is already fully used».",
            },
          ],
        },
        {
          id: "en-b2-08-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting two years of results from a home-care programme. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir ev bakımı programının iki yıllık sonuçlarını anlatan bir kadını dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Program sorumlusu iki yıllık sonuçları sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the figures from our first two years, and I will include the ones we did not enjoy. We began with nine hundred households and we now work with two thousand. The average visit is twenty minutes, which is set by the contract and not by us. Our first finding is that the strongest predictor of a hospital admission is not age and it is not living alone; it is a fall in the previous year. Second, the households that use the most hours are a small group: eight per cent of them take a third of the time. Third, on notice — when we tell people the day before rather than on the morning, cancellations drop by half. Fourth, and this is the uncomfortable one, our own survey found that forty per cent of the people we visit could not name the person who came last. And finally, funding: the programme is paid for until 2029.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Home-care programme — two-year results",
              body: `The programme began with {{9}} households.

It now works with {{10}} households.

The average visit lasts {{11}} minutes.

The strongest predictor of admission is a {{12}} in the previous year.

Eight per cent of households take a {{13}} of the time.

Giving notice the day before halves the number of {{14}}.

{{15}} per cent could not name the person who came last.

The programme is funded until {{16}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-08-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["900", "nine hundred"],
              explain:
                "Kayıt başlangıç sayısını veriyor: «We began with nine hundred households». İki bin ise bugünkü sayı.",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["2000", "two thousand"],
              explain:
                "«we now work with two thousand» — bugünkü hane sayısı. Dokuz yüz başlangıçtı; iki sayı karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["20", "twenty"],
              explain:
                "«The average visit is twenty minutes, which is set by the contract» — süreyi belirleyen sözleşme, program değil.",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["fall"],
              explain:
                "Kayıt iki yaygın adayı eleyip cevabı veriyor: «not age and it is not living alone; it is a fall in the previous year».",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["third"],
              explain:
                "«eight per cent of them take a third of the time» — küçük bir grubun aldığı pay. Yüzde sekiz hane oranı, süre oranı değil.",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["cancellations"],
              explain:
                "«when we tell people the day before rather than on the morning, cancellations drop by half» — önceden haber vermenin yarıya indirdiği şey.",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["40", "forty"],
              explain:
                "Rahatsız edici bulgu burada: «forty per cent of the people we visit could not name the person who came last».",
            },
            {
              kind: "gap",
              id: "en-b2-08-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["2029"],
              explain:
                "«the programme is paid for until 2029» — finansmanın bitiş yılı.",
            },
          ],
        },
        {
          id: "en-b2-08-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about care at home, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Evde bakım üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The service is bought in the wrong unit." },
            { key: "b", label: "The popular option is not the one the evidence supports." },
            { key: "c", label: "The speaker was offered the opposite of what was needed." },
            { key: "d", label: "Families are already carrying more than is assumed." },
            { key: "e", label: "Something recorded as a refusal was not one." },
            { key: "f", label: "Doing less turns out to cost more, not less." },
            { key: "g", label: "The service should be closed and the money returned." },
            { key: "h", label: "Nothing can be improved without a larger budget." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı sözleşmelerin ölçü biriminden söz ediyor.",
              plays: 2,
              segments: [
                { text: "A contract can say hours. It cannot say that somebody left the house feeling like an adult. So we buy hours, and then we are surprised that hours are what we get." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kendisine sunulan hizmeti anlatıyor.",
              plays: 2,
              segments: [
                { text: "They sent a young man to sit and talk to me for half an hour every Wednesday. He was perfectly nice. I have a brother who rings every day. What I needed was somebody to look at the step by the back door, and I said so on the form." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kayıt sistemini anlatıyor.",
              plays: 2,
              segments: [
                { text: "She asks for Tuesday. We offer Thursday. She says no. That goes into the system as declined, and at the end of the year somebody counts the declines and concludes that demand is lower than we thought." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı programının bütçesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "People assume that a service without scheduled visits is the cheap option. Ours is not. Promising to arrive within two hours means paying people to be available, and most of the time nobody rings." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı ailelere yapılan çağrıyı ele alıyor.",
              plays: 2,
              segments: [
                { text: "The average person doing this unpaid is sixty-one years old and half of them are in work. When a minister says that families should step up, I want to ask which family, and what he imagines they are doing at the moment." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı kendi önerilerini gözden geçiriyor.",
              plays: 2,
              segments: [
                { text: "I have recommended befriending schemes myself and I would again, for what they are. What I will not do any more is put them in a paper about hospital admissions, because the two have almost nothing to do with each other." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-08-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı sözleşmenin neyi tarif edebildiğini ve sonucunu veriyor: «So we buy hours, and then we are surprised that hours are what we get».",
            },
            {
              kind: "match",
              id: "en-b2-08-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "c",
              explain:
                "Konuşmacıya sohbet gönderiliyor, oysa ihtiyacı başka: «What I needed was somebody to look at the step by the back door». Üstelik bunu forma da yazmış.",
            },
            {
              kind: "match",
              id: "en-b2-08-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "Konuşmacı kaydın nasıl bozulduğunu anlatıyor: salı isteniyor, perşembe öneriliyor ve «That goes into the system as declined».",
            },
            {
              kind: "match",
              id: "en-b2-08-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "f",
              explain:
                "Konuşmacı yaygın varsayımı çürütüyor: «People assume that a service without scheduled visits is the cheap option. Ours is not», çünkü hazır bekleyen personel ödeniyor.",
            },
            {
              kind: "match",
              id: "en-b2-08-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "d",
              explain:
                "Konuşmacı sayıyı verip çağrıyı boşa çıkarıyor: «The average person doing this unpaid is sixty-one years old and half of them are in work».",
            },
            {
              kind: "match",
              id: "en-b2-08-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "b",
              explain:
                "Konuşmacı programları savunuyor ama kanıtla ilişkisini kesiyor: «What I will not do any more is put them in a paper about hospital admissions».",
            },
          ],
        },
        {
          id: "en-b2-08-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a man who has received home care for nine years. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Dokuz yıldır evde bakım hizmeti alan bir adamla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, dokuz yıldır evde bakım alan Lior ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You have had some form of home care for nine years. What has changed in that time?" },
                { text: "The people have got younger and the visits have got shorter. I do not say that as a complaint about the people. The young ones are better trained than the ones who came in the beginning." },
                { text: "Shorter is usually described as a cut." },
                { text: "It is a cut. It is also, and nobody says this, sometimes an improvement. Forty minutes with somebody who does not want to be there is worse than fifteen with somebody who does." },
                { text: "What would you change if you could change one thing?" },
                { text: "The number of different people. I have had, I think, thirty-one of them in nine years. Every one asks the same four questions at the door, and I have got faster at answering them, which is not a skill I ever wanted." },
                { text: "Would you accept fewer hours in return for fewer people?" },
                { text: "Yes, and I have said so, and I was told that this is not how the contract works. I would take three hours a week from one person over five hours from four." },
                { text: "Some people say that the answer is families." },
                { text: "My daughter lives in another country and she rings me on Sundays. If she moved back to look after me, that would be two lives spoiled instead of one, and I would still need somebody who can lift." },
                { text: "Do you feel lonely?" },
                { text: "That is the question everybody asks, and it is the wrong one for me. I see four people most weeks. What I am is stuck, which is a different word, and it has a different solution: it has a ramp." },
                { text: "What would you say to somebody designing these services?" },
                { text: "Ask the first question and then act on the answer. And do not put me on a form that has only one box, because I will tick it and you will send me the wrong man." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-08-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Lior say has changed in nine years?",
              options: ["The training has become noticeably worse", "The visits have become considerably longer", "Younger staff and shorter visits"],
              answer: 2,
              explain:
                "Lior iki değişikliği birlikte veriyor: «The people have got younger and the visits have got shorter», ayrıca eğitimin iyileştiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-24",
              no: 24,
              ref: "d1",
              text: "What does he say about shorter visits?",
              options: ["They are always worse than long ones", "They can sometimes be better", "He has not noticed any difference"],
              answer: 1,
              explain:
                "Lior kısalmayı kesinti sayıyor ama tek yanlı bakmıyor: «Forty minutes with somebody who does not want to be there is worse than fifteen with somebody who does».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-25",
              no: 25,
              ref: "d1",
              text: "What would he change first?",
              options: ["The number of different people", "The time of day of the visits", "The four questions at the door"],
              answer: 0,
              explain:
                "Lior tek isteğini adlandırıyor: «The number of different people», dokuz yılda otuz bir kişi. Kapıdaki dört soru bu sorunun belirtisi.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-26",
              no: 26,
              ref: "d1",
              text: "What was he told when he asked for fewer people?",
              options: ["That it would cost a great deal more", "That the staff themselves would object to it", "That the contract does not allow it"],
              answer: 2,
              explain:
                "Lior aldığı cevabı aktarıyor: «I was told that this is not how the contract works». Maliyet ya da personel itirazı hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-27",
              no: 27,
              ref: "d1",
              text: "What does he say about his daughter?",
              options: ["She ought to move back and look after him", "Her moving back would help nobody", "She very rarely gets in touch with him"],
              answer: 1,
              explain:
                "Lior sonucu hesaplıyor: «that would be two lives spoiled instead of one, and I would still need somebody who can lift». Kızı her pazar arıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-28",
              no: 28,
              ref: "d1",
              text: "How does he answer the question about loneliness?",
              options: ["That it is the wrong question for him", "That he is lonely most weeks of the year", "He refuses to answer the question"],
              answer: 0,
              explain:
                "Lior soruyu reddediyor, duyguyu değil: «it is the wrong one for me. I see four people most weeks».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-29",
              no: 29,
              ref: "d1",
              text: "Which word does he use instead?",
              options: ["Isolated", "Forgotten", "Stuck"],
              answer: 2,
              explain:
                "Lior sözcüğü ve sonucunu birlikte veriyor: «What I am is stuck, which is a different word, and it has a different solution: it has a ramp».",
            },
            {
              kind: "mcq",
              id: "en-b2-08-h4-30",
              no: 30,
              ref: "d1",
              text: "What is his advice to the people who design these services?",
              options: ["Put a great many more questions on the form", "Ask one question and act on it", "Stop using forms altogether"],
              answer: 1,
              explain:
                "Lior öğüdünü ve gerekçesini veriyor: «Ask the first question and then act on the answer», tek kutulu form yanlış hizmeti getirir.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 70,
      instruction: "This part has two tasks: an essay and a letter.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir mektup.",
      tasks: [
        {
          id: "en-b2-08-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed care for older people. Now write an essay for your teacher, answering this question: \"Should the state pay people who look after an older relative at home?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what the payment would recognise — what happens to the carer's own work",
          promptTr:
            "İngilizce dersinde yaşlı bakımını tartıştınız. Öğretmenin için bir deneme yaz: \"Devlet, evde yaşlı bir yakınına bakan kişilere ödeme yapmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: ödeme neyi tanımış olur — bakan kişinin kendi işine ne olur",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what the payment would recognise.", tr: "Ödemenin neyi tanıyacağını tartış." },
              { de: "Discuss what happens to the carer's own work.", tr: "Bakan kişinin kendi işine ne olacağını tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Most of the care that older people receive is already given by relatives, without payment and usually without any record that it happened. The question is not whether the work is being done; it is whether it should continue to be invisible.

A payment would recognise something more precise than effort. It would recognise a cost that has already been transferred: somebody has reduced their hours, refused a promotion or left a job entirely. The average person doing this is over sixty, which makes the loss permanent rather than temporary.

The counter-argument is not weak. A payment set below the wage of a professional carer risks becoming a reason to stay at home, particularly for women, and it may quietly buy the state a cheaper service.

My own view is that the payment matters less than the pension credit attached to it, since the damage is done to the years after the caring ends.

The state should pay, provided the payment protects the carer's future income rather than merely their present one.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Karşı görüşün gücü kabul edildi mi?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (particularly, provided that, rather than)",
              "140–190 kelime aralığında mı?",
              "Kayıt deneme yazısına uygun mu?",
            ],
          },
        },
        {
          id: "en-b2-08-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "A local newspaper has printed an article claiming that older people who live alone are lonely and need more visits. You disagree with part of it. Write a letter to the newspaper. Say what the article got right, what it got wrong and what you would like to see instead. Write 140 to 190 words.",
          promptTr:
            "Yerel bir gazete, yalnız yaşayan yaşlıların yalnız olduğunu ve daha çok ziyarete ihtiyaç duyduğunu öne süren bir yazı yayımladı. Yazının bir bölümüne katılmıyorsun. Gazeteye bir mektup yaz. Yazının neyi doğru, neyi yanlış anladığını ve bunun yerine ne görmek istediğini söyle. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what the article got right.", tr: "Yazının neyi doğru anladığını söyle." },
              { de: "Say what it got wrong, with a reason.", tr: "Neyi yanlış anladığını gerekçesiyle söyle." },
              { de: "Say what you would like to see instead.", tr: "Bunun yerine ne görmek istediğini söyle." },
            ],
            sample: `Sir,

Your article of 14 March was right about one thing, and it is the thing most reports leave out: the people who need help most are the least likely to ask for it, and a service that waits to be contacted will never meet them.

Where the article went wrong was in treating living alone and being lonely as the same condition. They overlap, but they are not one thing. My neighbour is eighty-four, lives alone and sees a dozen people every week; what she cannot do is carry a basket up her front steps. When she was assessed last year, she was offered a weekly conversation and no handrail.

What I would like to see is not more visits but a different first question. Ask whether the person wants company or wants a job doing, record the answer, and send what was asked for.

That change would cost nothing and would spare a good many people a visitor they did not need.

Yours faithfully,
Anouk Persson`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yazının doğru yanı gerçekten kabul edildi mi, yoksa baştan sona itiraz mı var?",
              "İtiraz somut bir örnekle mi desteklendi?",
              "Mektup kaydı ve kapanışı uygun mu?",
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
          id: "en-b2-08-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about older people, independence and asking for help.",
          promptTr: "Sana yaşlılar, bağımsızlık ve yardım istemek hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What makes it hard for people to ask for help?", tr: "İyi günler. İnsanların yardım istemesini zorlaştıran nedir?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnekle destekle.", expect: "soyut bir soruya görüş bildirmek ve örneklendirmek", seconds: 45 },
            { who: "partner", de: "Thank you. Have you ever helped somebody who did not want to be helped?", tr: "Teşekkürler. Yardım istemeyen birine yardım ettiğin oldu mu?" },
            { who: "you", hint: "Somut bir deneyim anlat ve nasıl sonuçlandığını söyle.", expect: "geçmişte olmuş tek bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if you were eighty and living alone, what would you want somebody to ask you first?", tr: "Seksen yaşında ve yalnız yaşıyor olsan, sana ilk neyi sormalarını isterdin?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşulla varsayımsal bir durum kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "narrate one experience with its outcome", tr: "Tek bir deneyimi sonucuyla anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "Asking for help means saying out loud that something has gone, and most people would rather manage badly than say that. My grandfather went up a ladder at eighty-one because he did not want to ring anybody about a gutter; he did not fall, and he also never asked afterwards. If I were eighty and living alone, I would want somebody to ask me what I could not do any more, rather than whether I felt lonely, because the first question has an answer that somebody could act on.",
            criteria: [
              "Görüş bir örnekle mi desteklendi?",
              "Deneyim somut mu ve sonucu verildi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b2-08-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of supporting an older person who lives alone, say which is better and explain one problem with your choice: a short visit at a fixed time every week, or a telephone number that brings somebody within two hours when it is used.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Yalnız yaşayan bir yaşlıyı desteklemenin şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: her hafta sabit saatte kısa bir ziyaret mi, arandığında iki saat içinde birini getiren bir telefon numarası mı?",
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
              "The fixed visit has one advantage that is easy to underrate: it happens whether or not anybody asks, and the people in most difficulty are precisely the ones who never ask. Against that, a visit at a set time is a visit at somebody else's time, and twenty minutes on a Thursday is long enough to be inspected and not long enough to be known. The telephone line reaches the person who knows what they need, when they need it. I would choose the line. The problem with my own choice is the person who would never use it: pride, confusion or a broken handset, and the service has no way of noticing that the calls have stopped.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Karşı tarafın gücü kabul edildi mi?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika akıcı konuşuldu mu ve soyut sözcükler kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-b2-08-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A council is rewriting the form that older people fill in when they ask for help. There is room for one question at the top. Talk with me about what it should ask, and agree on the wording.",
          promptTr:
            "Bir belediye, yaşlıların yardım isterken doldurduğu formu yeniden yazıyor. Formun başında tek bir soruya yer var. Ne sorması gerektiğini benimle konuş ve sorunun nasıl yazılacağında anlaş.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The obvious question is: do you live alone? It is easy to answer and easy to count. Would you put that at the top?", tr: "Akla ilk gelen soru şu: yalnız mı yaşıyorsunuz? Cevaplaması ve sayması kolay. Bunu en üste koyar mıydın?" },
            { who: "you", hint: "Öneriyi değerlendir ve gerekçeli bir karşılık ver.", expect: "bir öneriyi değerlendirmek ve gerekçeli karşılık vermek", seconds: 45 },
            { who: "partner", de: "But a question about what somebody cannot do is harder to answer honestly, and people will leave it blank. Does that not make it useless?", tr: "Ama kişinin neyi yapamadığını soran bir soruya dürüst cevap vermek zordur ve insanlar boş bırakır. Bu onu işe yaramaz kılmıyor mu?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "All right. Give me the question as we would print it on the form.", tr: "Peki. Soruyu forma basacağımız hâliyle söyle." },
            { who: "you", hint: "Soruyu tek cümlede, uygulanabilir biçimde ver ve neden böyle yazdığını söyle.", expect: "varılan kararı açık ve uygulanabilir biçimde ifade etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "evaluate the proposal against another", tr: "Öneriyi bir başkasına karşı değerlendirmek" },
              { de: "handle an objection", tr: "Bir itirazı karşılamak" },
              { de: "agree on a precise wording", tr: "Kesin bir ifadede anlaşmak" },
            ],
            sample:
              "I would not put it at the top, because it is easy to count and it does not tell you what to send. A quarter of the people who live alone are lonely and so is a fifth of everybody else, so the answer sorts almost nobody. You are right that people leave hard questions blank, and I partly accept that; what I would do is make it concrete rather than personal, since nobody minds naming a task. So on the form: What is the one thing you would most like somebody to do for you this month? Concrete, answerable, and it produces something a service can act on.",
            criteria: [
              "Öneri gerekçeyle mi değerlendirildi?",
              "İtiraza doğrudan karşılık verildi mi ve kısmi kabul yapılabildi mi?",
              "Sonunda tek ve uygulanabilir bir soru ortaya çıktı mı?",
              "Karşı tarafın sözlerine gönderme yapıldı mı? (You are right that …)",
            ],
          },
        },
      ],
    },
  ],
};

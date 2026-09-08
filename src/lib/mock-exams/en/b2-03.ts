import type { MockPaper } from "../types";

/**
 * B2 · Deneme 3 — "Food, Farming and Price".
 *
 * Deneme 1 ve 2 ile AYNI PLAN; konu ayrı. İlk ikisi şehir/iş/dikkat ile
 * bilim/medya/güven alanlarını aldı. Gıda zinciri B2 için verimli bir alan
 * çünkü aynı metinde sayı, edilgen yapı ve çıkar çatışması bir arada
 * bulunuyor — okuma 5 ile dinleme 4'ün ölçtüğü şey tam olarak bu.
 *
 * B2 İMZALARI: edilgen, ileri bağlayıcı, üçüncü tip koşul ve ortaç öbeği
 * metinlerde geçiyor; boşluklu görevlerde değil, boşluksuz metinlerde,
 * çünkü imza taraması `{{n}}` işaretini sözcük saymaz.
 */
export const EN_B2_03: MockPaper = {
  id: "en-b2-03",
  course: "en",
  level: "B2",
  no: 3,
  theme: "Food, Farming and Price",
  themeTr: "Gıda, tarım ve fiyat",
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
          id: "en-b2-03-l1",
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
              title: "The price on the label",
              body: `The price on a supermarket label is one of the least informative numbers in the economy, and it is routinely {{1}} for a measurement.

A farmer receives a share of it that varies from about eight per cent for a loaf of bread to nearly forty for a box of eggs. Almost nobody {{2}} this variation into account when comparing two products.

Economists who study the chain {{3}} out that the largest share usually goes to processing and transport rather than to the shop itself. Blaming the retailer alone therefore {{4}} the point.

Some countries now require a second figure on the shelf, showing what the farm was paid. Early trials {{5}} that shoppers change very little, which the designers had not expected.

That result is worth {{6}} in mind, because a label that nobody acts on is a cheap way to look serious.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-03-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["confused", "misled", "mistaken", "exchanged"],
              answer: 2,
              explain:
                "`mistake something for something else` kalıbının edilgeni `be mistaken for`dur. `confused` aynı anlamı verir ama edatı `with` olur; `misled` insanı nesne alır, sayıyı değil; `exchanged for` fiziksel bir takas bildirir.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["takes", "makes", "gives", "puts"],
              answer: 0,
              explain:
                "`take something into account` sabit bir eşdizim: hesaba katmak. Bu kalıpta fiil değiştirilemez; `make`, `give` ve `put` ile kurulan biçimler İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["take", "bring", "set", "point"],
              answer: 3,
              explain:
                "`point out that …` bir savı öne çıkarmanın kalıbıdır. `bring out` bir özelliği belirginleştirir ama `that` yan cümlesi almaz; `take out` ve `set out` bambaşka anlamlar taşır.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["loses", "misses", "fails", "drops"],
              answer: 1,
              explain:
                "`miss the point` bir savın özünü kaçırmak demektir. `lose the point` bir tartışmada puan kaybetmeyi çağrıştırır; `fail` bu adla doğrudan kullanılmaz ve `drop the point` konuyu bırakmak anlamına gelir.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["propose", "advise", "recommend", "suggest"],
              answer: 3,
              explain:
                "Deneyler bir kanıt sunuyor, bir öğüt vermiyor: `suggest that` burada «gösteriyor, işaret ediyor» demektir. `propose`, `advise` ve `recommend` bir eylem önerir ve cansız bir özneyle bu anlamı taşıyamaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["bearing", "holding", "carrying", "taking"],
              answer: 0,
              explain:
                "`bear something in mind` akılda tutmak demektir ve `worth` ardından ulaç ister: «worth bearing in mind». `hold`, `carry` ve `take` bu kalıpta kullanılmaz.",
            },
          ],
        },
        {
          id: "en-b2-03-l2",
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
              title: "What a subsidy actually buys",
              body: `A payment made per hectare rewards the size of a holding, {{7}} not what happens on it.

In one region, grants {{8}} had been designed to protect hedges were claimed mainly by the largest farms, which were the only ones with staff to complete the forms.

The scheme has been revised often enough {{9}} its original purpose is now difficult to read in the rules.

What remains disputed is the measure, {{10}} matters because a different measure would move the money to different farms.

Officials are therefore being asked to think {{11}} terms of outcomes rather than area. That is harder to audit, much slower to report, and for those two reasons it has been postponed {{12}} least twice.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-03-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["and", "but"],
              explain:
                "Boşluk iki nesneyi karşı karşıya koyuyor: büyüklük ödüllendiriliyor, üzerinde olan biten değil. Hem `and not` hem `but not` bu karşıtlığı kurar ve ikisi de doğal İngilizcedir; `or not` ise bir seçenek listesi kurar ve cümleyi anlamsızlaştırır.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["that", "which"],
              explain:
                "Boşluk `grants` adını niteleyen bir yan cümle başlatıyor ve öncül cansız, bu yüzden `that` ya da `which` gelir. `who` yalnız kişiler için kullanılır; `whose` ise ardından bir ad ister.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["that"],
              explain:
                "`often enough that …` yapısı bir derece ve onun sonucunu bağlar. `so` burada gelemez çünkü `enough` zaten dereceyi taşıyor; `to` ise mastar ister ve ardından çekimli bir yüklem gelemez.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["which"],
              explain:
                "Virgülden sonra gelen ve önceki cümlenin tamamına gönderme yapan yan cümle `which` ile kurulur. `that` bu tür açıklayıcı yan cümlede kullanılmaz; `what` ise kendi öncülünü taşır ve buradaki gönderme yerini boş bırakırdı.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["in"],
              explain:
                "`think in terms of` sabit bir kalıptır: bir şeyi belli bir çerçeveden ele almak. `on terms` ve `with terms` başka anlamlar taşır (anlaşma koşulları).",
            },
            {
              kind: "gap",
              id: "en-b2-03-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["at"],
              explain:
                "`at least` sayıdan önce gelen bir alt sınır bildirir: en az iki kez. `in least` diye bir kalıp yoktur; `the least` ise en üstünlük derecesidir ve sayının önünde duramaz.",
            },
          ],
        },
        {
          id: "en-b2-03-l3",
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
              title: "Food certification",
              body: `Certification is the process by which a farm is judged against a written standard before it may use a protected word in its {{13}}.

Its defenders describe it as a guarantee. Its critics point to the {{14}} of the rules: two inspectors can read the same paragraph differently, and a small holding carries the same paperwork as a large one.

Neither description is complete. Certification rarely detects deliberate {{15}}, and it is not designed to, because it assumes that the records it is shown are genuine.

What it does well is narrower and still useful: it makes a claim {{16}}, so that a buyer who cares can look something up instead of trusting a picture on a box.

Several schemes have experimented with group certification, in which neighbouring farms are inspected together. Early results suggest a clear {{17}} in cost for the smallest producers.

The most likely future is therefore a mixed one, with different markets making different choices according to their own {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-03-l3-13",
              no: 13,
              text: "ADVERTISE",
              accept: ["advertising", "advertisements"],
              explain:
                "`in its ___` yapısında iyelik sıfatından sonra bir ad gerekiyor. `advertise` fiilinden `advertising` (etkinliğin adı) ya da `advertisements` (tek tek ilanlar) türetilir; fiilin kendisi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l3-14",
              no: 14,
              text: "PRECISE",
              accept: ["imprecision"],
              explain:
                "Cümlenin devamı iki denetçinin aynı paragrafı farklı okuduğunu söylüyor: eleştiri kuralların KESİN OLMAYIŞINA. `precise` sıfatından `precision` adı, ondan da olumsuzu `imprecision` türetiliyor. Olumsuzluk eki düşerse cümle tersine döner.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l3-15",
              no: 15,
              text: "DECEIVE",
              accept: ["deception"],
              explain:
                "`detects deliberate ___` yapısında sıfattan sonra bir ad geliyor. `deceive` fiilinin adı `deception`; `deceptive` sıfattır ve `deliberate` ile yan yana gelemez.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l3-16",
              no: 16,
              text: "VERIFY",
              accept: ["verifiable"],
              explain:
                "`makes a claim ___` yapısı nesnenin ardından bir sıfat ister: iddiayı doğrulanabilir kılıyor. `verify` fiilinden `verifiable` sıfatı türetiliyor; ad biçimi (`verification`) bu yapıda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l3-17",
              no: 17,
              text: "REDUCE",
              accept: ["reduction"],
              explain:
                "`a clear ___ in cost` yapısında `a` ile `in` arasında bir ad var: `reduction`. Sıfat biçimi (`reduced`) belirsiz tanımlıkla birlikte tek başına ad öbeği kuramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l3-18",
              no: 18,
              text: "CIRCUMSTANCE",
              accept: ["circumstances"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different markets`), dolayısıyla ad da çoğul olmalı. Tekil biçim bu bağlamda kullanılmaz.",
            },
          ],
        },
        {
          id: "en-b2-03-l4",
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
              id: "en-b2-03-l4-19",
              no: 19,
              text: "The inspector had not been told about the second barn.\nNobody ______ the second barn.",
              cue: "INFORMED",
              accept: ["had informed the inspector about", "had informed the inspector of"],
              explain:
                "Edilgen cümle, olumsuz bir özneyle etken cümleye çevriliyor: «Nobody had informed the inspector about …». Anahtar sözcük `informed` değişmeden kalıyor ve zaman `had been told` ile aynı düzlemde tutuluyor; `inform` fiili `about` ya da `of` edatını alır.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l4-20",
              no: 20,
              text: "They will not finish the harvest unless the rain stops.\nThe harvest ______ unless the rain stops.",
              cue: "COMPLETED",
              accept: ["will not be completed"],
              explain:
                "Etken gelecek zaman, edilgene çevriliyor: «The harvest will not be completed». Anahtar sözcük `completed` üçüncü hâl olduğu için `be` zorunlu; `will not complete` özneyi eyleyen yapar ve anlamı bozar.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l4-21",
              no: 21,
              text: "Farmers rarely see the final price of their crop.\nIt ______ for farmers to see the final price of their crop.",
              cue: "RARE",
              accept: ["is rare"],
              explain:
                "Sıklık zarfı `rarely`, `it is rare for somebody to do something` kalıbına çevriliyor. Anahtar sözcük sıfat olduğu için önüne bir bağ fiili gerekiyor; `is rarely` zarfı geri getirir ve verilen sözcüğü değiştirmiş olur.",
            },
            {
              kind: "gap",
              id: "en-b2-03-l4-22",
              no: 22,
              text: "I did not know the rules, so I filled in the wrong form.\nIf I ______ the rules, I would not have filled in the wrong form.",
              cue: "KNOWN",
              accept: ["had known"],
              explain:
                "Ana cümle `would not have filled` taşıyor, yani gerçekleşmemiş bir geçmiş kuruluyor. Bu yapının koşul yarısı `had + üçüncü hâl` ister: «If I had known». Anahtar sözcük zaten üçüncü hâl, eksik olan yardımcı fiil.",
            },
          ],
        },
        {
          id: "en-b2-03-l5",
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
              title: "The week I bought only what I could trace",
              body: `For one week last October I bought only food whose origin I could establish, and I kept a note of every failure. The result was less impressive than it sounds, and the failures were more interesting than the successes.

Bread was easy, because the bakery names its mill. Eggs were easy. Vegetables were easy in the market and impossible in the supermarket, where the country of origin was printed in small type and the farm was not named at all. A country is not an origin in any useful sense.

The first real difficulty was oil. Faced with four bottles that said nothing beyond a region, I telephoned two of the companies. One answered within a day and named a cooperative. The other never replied, which I record here without comment, because a silence is not evidence of anything.

The second difficulty was more instructive. I found that I was rewarding the farms that were already good at telling their story, and those are rarely the smallest ones. A farm with a website and a photograph of somebody standing in a field is a farm that employs a person to make that page. If I had judged only by the packaging, I would have concluded that the largest supplier in my basket was also the most careful one.

By the end of the week my shopping had cost about a fifth more and had taken roughly three extra hours. Nevertheless, I do not regret the exercise, mainly because of what it taught me about my own assumptions rather than about the food.

I am not going to recommend that anybody repeat it. What I would recommend is choosing one product, once, and following it as far back as somebody is willing to tell you. The answer matters less than the discovery that the question is often unanswerable.`,
              gloss: [
                { de: "to trace", tr: "izini sürmek", en: "trace" },
                { de: "a cooperative", tr: "kooperatif", en: "cooperative" },
                { de: "packaging", tr: "ambalaj", en: "packaging" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-03-l5-23",
              no: 23,
              text: "What does the writer say about supermarket vegetables?",
              options: ["They were cheaper than in the market", "The label gave a country but not a farm", "They were the easiest category of all", "Most of them had no label at all"],
              answer: 1,
              explain:
                "Metin ayrımı kendisi kuruyor: «the country of origin was printed in small type and the farm was not named at all», ardından «A country is not an origin in any useful sense». Etiket vardı, yani etiketsizlik yanlış; fiyat hiç tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l5-24",
              no: 24,
              text: "Why does the writer mention the company that never replied?",
              options: ["To show that the industry is dishonest", "Because it was the largest supplier", "To explain why she stopped the experiment after a week", "To record a fact while refusing to interpret it"],
              answer: 3,
              explain:
                "Yazar niyetini açıkça söylüyor: «which I record here without comment, because a silence is not evidence of anything». Yani sessizlikten bir sonuç çıkarmayı reddediyor; deney zaten planlandığı gibi bir hafta sürüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l5-25",
              no: 25,
              text: "What did the writer find most instructive?",
              options: ["That the smallest farms use the worst packaging materials", "That telephoning companies usually works", "That good storytelling is not the same as good farming", "That websites are more reliable than labels"],
              answer: 2,
              explain:
                "İkinci güçlük şu: «I was rewarding the farms that were already good at telling their story, and those are rarely the smallest ones». Anlatı becerisi ile tarım kalitesi ayrı şeyler; iki telefondan yalnız biri yanıt verdiği için «usually works» de yanlış.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l5-26",
              no: 26,
              text: "What does the writer say about the cost of the week?",
              options: ["It was higher in both money and time", "It was higher in money but not in time", "The extra cost changed her mind about the idea", "The cost was lower than she had feared"],
              answer: 0,
              explain:
                "İki bedel de sayıyla veriliyor: «about a fifth more» ve «roughly three extra hours». Yazar buna rağmen pişman değil («I do not regret the exercise»), yani maliyet fikrini değiştirmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-l5-27",
              no: 27,
              text: "What does the writer recommend?",
              options: ["Repeating the whole experiment for a week", "Tracing one product as far as possible", "Buying only from farms with a website", "Asking every company for its origin data"],
              answer: 1,
              explain:
                "Son paragraf iki şeyi ayırıyor: deneyin tekrarını önermiyor, «choosing one product, once, and following it as far back as somebody is willing to tell you» diyor. İnternet sayfası olan çiftlikler ise yazının uyardığı yanılgının kaynağı.",
            },
          ],
        },
        {
          id: "en-b2-03-l6",
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
              title: "The problem with local",
              body: `Every campaign for local food rests on a simple idea: the shorter the journey, the smaller the cost. The idea is not wrong, but it is incomplete in a way that is easy to demonstrate. {{28}}

Take tomatoes. A heated glasshouse two hours from the city can use several times the energy of a field two thousand kilometres away, and the label will call the first one local. {{29}}

Transport itself is also badly understood. A lorry carrying twenty tonnes uses very little fuel per box, whereas a customer who drives four kilometres for six items uses a great deal. {{30}}

Given all this, some retailers have begun to publish a figure that includes the journey from the shop to the home. It has been resisted, and the reason for the resistance is instructive. {{31}}

None of this argues against buying from a nearby farm, which supports things that no calculation captures. It argues for knowing which part of the journey a number describes.`,
              gloss: [
                { de: "a glasshouse", tr: "sera", en: "glasshouse" },
                { de: "a lorry", tr: "kamyon", en: "lorry" },
                { de: "fuel", tr: "yakıt", en: "fuel" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "What it leaves out is everything that happens before the journey begins." },
            { key: "b", label: "b", body: "It moves part of the responsibility onto the reader, which is not what a label is usually for." },
            { key: "c", label: "c", body: "Distance, in that case, is measuring the wrong thing entirely." },
            { key: "d", label: "d", body: "Supermarket opening hours have lengthened considerably over the last two decades." },
            { key: "e", label: "e", body: "The last four kilometres are a choice as well, and almost nobody counts them." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-03-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "a",
              explain:
                "Boşluktan önce fikrin «incomplete in a way that is easy to demonstrate» olduğu söyleniyor; (a) eksik olanı adlandırıyor: yolculuk başlamadan önce olan her şey. Sonraki paragraf da tam bunu, seradaki enerjiyi örnekliyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "c",
              explain:
                "Domates örneği yakındaki seranın uzaktaki tarladan çok enerji harcayabildiğini gösteriyor; (c) örnekten çıkarımı yapıyor: mesafe burada yanlış şeyi ölçüyor. «in that case» doğrudan örneğe gönderme.",
            },
            {
              kind: "match",
              id: "en-b2-03-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "e",
              explain:
                "Paragraf kamyonla müşteriyi karşılaştırıyor: «a customer who drives four kilometres for six items uses a great deal». (e) o son dört kilometreyi bir karar olarak adlandırıyor ve sayılmadığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Önceki cümle direnci anıp «the reason for the resistance is instructive» diyor; (b) o nedeni veriyor: sorumluluğun bir kısmı okura geçiyor. (d) market açılış saatlerinden söz ediyor ve metnin hiçbir yerinde açılış saati tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-03-l7",
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
              label: "a — Ilkay, dairy farmer",
              body: "I am paid roughly what I was paid in 2011, and my costs have doubled since then. People tell me to sell direct, and I have tried it: it is a second full-time job, and I already have one. The advice is given kindly and it is useless.",
            },
            {
              key: "b",
              label: "b — Solmaz, supermarket buyer",
              body: "We are blamed for the price we pay, and the blame is partly fair. But in eleven years no customer has ever asked me to raise a price, and I have been asked to lower one every single week.",
            },
            {
              key: "c",
              label: "c — Devrim, food researcher",
              body: "The cheapest food in history is also the most expensive, once you count the water, the soil and the health bill. Nobody pays that bill at the till, so nobody sees it. Until it appears somewhere, no label will change anything.",
            },
            {
              key: "d",
              label: "d — Nese, market gardener",
              body: "I sell everything I grow within nine kilometres and I earn less than a delivery driver. I am not complaining, because I chose this. What I object to is being used as a photograph in somebody else's advertising.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-03-l7-32",
              no: 32,
              text: "Which text says that well-meant advice does not help?",
              answer: "a",
              explain:
                "Ilkay öğüdün niyetini kabul edip sonucunu reddediyor: «The advice is given kindly and it is useless». Nese de bir şeye itiraz ediyor ama itirazı öğüde değil, kendisinin reklamda kullanılmasına.",
            },
            {
              kind: "match",
              id: "en-b2-03-l7-33",
              no: 33,
              text: "Which text claims that a real cost is invisible at the point of sale?",
              answer: "c",
              explain:
                "Devrim maliyeti ve görünmezliğini birlikte veriyor: «Nobody pays that bill at the till, so nobody sees it». Su, toprak ve sağlık faturası fiyatın dışında kalıyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-l7-34",
              no: 34,
              text: "Which text objects to being used to sell something?",
              answer: "d",
              explain:
                "Nese itirazını tam olarak sınırlıyor: kazancına değil, «being used as a photograph in somebody else's advertising» durumuna karşı çıkıyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-l7-35",
              no: 35,
              text: "Which text says that the pressure comes from one direction only?",
              answer: "b",
              explain:
                "Solmaz iki yönü karşılaştırıyor: on bir yılda kimse fiyatı yükseltmesini istememiş, düşürmesini ise «every single week» istemişler. Baskı tek yönlü.",
            },
            {
              kind: "match",
              id: "en-b2-03-l7-36",
              no: 36,
              text: "Which text mentions having already tried the solution that others suggest?",
              answer: "a",
              explain:
                "Ilkay öneriyi denediğini söylüyor: «I have tried it: it is a second full-time job». Öteki metinlerde denenmiş bir çözüm anlatılmıyor.",
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
          id: "en-b2-03-h1",
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
              situation: "Pazar açılmadan önce satıcılara anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A quick word before we open. The van with the cheese has broken down near the bridge, so stall nine will be empty this morning. Everything else is here. If a customer asks, the cheese will be back next Saturday, not this afternoon." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir tedarikçi siparişle ilgili ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the potato order. We can supply the quantity but not the grade you asked for; the small size is finished until August. I can send the next size up at the same price, or you can wait. Let me know today." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki kişi denetim sonucunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did the audit find anything?" },
                { text: "Nothing on the animals, nothing on the records. One line about the fence by the stream." },
                { text: "That is the third year running for that fence." },
                { text: "I know. It is cheaper to be written up than to build it." },
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
                { text: "Listeners ask me every week whether organic food is worth the money. The honest answer is that the question is badly formed: worth it for what? For the soil, the evidence is good. For your own health it is much weaker, and for the climate it depends entirely on the crop." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir depoda çalışanlara talimat veriliyor.",
              plays: 2,
              segments: [
                { text: "A note for everybody handling the returns. Anything that comes back in the crates goes to the compost, not to the bin, except the packaging. The packaging is the one thing we still pay to remove, and it is weighed every month." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir kişi perşembe teslimatı için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Thursday. I can bring the van and do the delivery round, but I have to be back by two for the vet. If we load at six we will have finished the town before the traffic, and Cengiz said he can do the villages." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir danışman doğrudan satış yapanlara sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of direct selling is pricing from your own costs. Your costs are not interesting to a customer. Price from what the thing is worth to them, and then check that your costs fit underneath that number." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri iki ekmek arasındaki farkı soruyor.",
              plays: 2,
              segments: [
                { text: "Why is this loaf two pounds more than that one?" },
                { text: "Different flour. That one is milled forty kilometres away and we pay about double for it." },
                { text: "Does anybody notice?" },
                { text: "About one customer in ten asks. The rest buy the cheaper one and I understand why." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-03-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the announcement about?",
              options: ["A change to the opening time of the market", "One stall that will not appear", "A new stall next Saturday"],
              answer: 1,
              explain:
                "Anons tek bir eksiği bildiriyor: «stall nine will be empty this morning». Açılış saati değişmiyor («Everything else is here») ve gelecek cumartesi yeni bir tezgâh değil, aynı peynir dönüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the supplier offering?",
              options: ["A lower price for the same size", "Delivery in August at the agreed price", "A different size for the same money"],
              answer: 2,
              explain:
                "Teklif kaydın ortasında: «I can send the next size up at the same price». Fiyat düşmüyor, aynı kalıyor; ağustos küçük boyun geri geleceği tarih, teslim tarihi değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the second speaker admit?",
              options: ["Paying the fine is cheaper than the repair", "This year's audit was unfair to the whole farm", "The records were incomplete"],
              answer: 0,
              explain:
                "Son cümle itiraf niteliğinde: «It is cheaper to be written up than to build it». Denetim kayıtlarda ve hayvanlarda hiçbir sorun bulmuyor, yani ne haksız ne de kayıtlar eksik.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say about the question?",
              options: ["It has a clear answer", "It needs to be made more specific", "Nobody asks it often enough to matter"],
              answer: 1,
              explain:
                "Konuşmacı sorunun kuruluşunu eleştiriyor: «the question is badly formed: worth it for what?» ve üç ayrı ölçüt için üç ayrı cevap veriyor. Soru haftada bir soruluyor, yani seyrek değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-5",
              no: 5,
              ref: "a5",
              text: "What must staff do with the packaging?",
              options: ["Put it in the compost", "Return it to the grower with the crates", "Keep it separate from the food waste"],
              answer: 2,
              explain:
                "Talimat ambalajı istisna yapıyor: her şey komposta gidiyor «except the packaging», çünkü kaldırılması için hâlâ ödeme yapılıyor. Üreticiye geri gönderilmesinden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Agreeing to help within a time limit", "Asking somebody to take the round instead", "Cancelling the delivery"],
              answer: 0,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can bring the van and do the delivery round, but I have to be back by two». Cengiz köyleri alıyor, onun turunu devralmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Reducing costs in the first year", "Explaining your own costs to every customer", "Setting the price from the buyer's view"],
              answer: 2,
              explain:
                "Öğüt açık: «Price from what the thing is worth to them». Maliyet müşteriye anlatılacak bir şey değil, sonradan kontrol edilecek bir alt sınır.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the assistant say about customers?",
              options: ["Most of them ask about the flour", "A small number ask about the difference", "Almost all of them prefer the more expensive loaf"],
              answer: 1,
              explain:
                "Oran veriliyor: «About one customer in ten asks». Geri kalanı ucuz olanı alıyor, yani çoğunluk ne soruyor ne de pahalıyı tercih ediyor.",
            },
          ],
        },
        {
          id: "en-b2-03-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting the results of a vegetable box scheme. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir sebze kutusu programının sonuçlarını anlatan bir kadını dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Program sorumlusu üç yıllık sonuçları anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. I will give you our three-year figures and I will not pretend that all of them are encouraging. We began with fourteen growers and we now supply two hundred households every week. In three years we have delivered about ninety thousand boxes. Here is the first surprise: the item people most often remove from the standard box is not an unfamiliar vegetable, it is the potato, because they already have some at home. Second, the day matters more than we expected. A box delivered on Thursday is empty by Saturday; the same box on Monday still has something in it on Friday, and that pattern has held across every route. Third, the format of the recipe sheet. We tried videos, printed booklets and a single card, and the single card outperformed everything else, which disappointed the two of us who like writing. Fourth, a caution: our own survey shows that the households who stay are the ones who were already cooking, and the ones we most wanted to reach leave within eight weeks. We have not solved that. And finally, money. Seventy per cent of our income comes from one contract with the council, and that is the risk that keeps me awake, not the weather.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Vegetable box scheme — three-year results",
              body: `The scheme started with {{9}} growers.

It now supplies {{10}} households every week.

About {{11}} boxes have been delivered in three years.

The item most often removed from the box is the {{12}}.

A box delivered on {{13}} is emptied fastest.

The most effective format was the single {{14}}.

The households who leave within eight weeks are the ones the scheme most wanted to {{15}}.

{{16}} per cent of the income comes from one council contract.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-03-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["14", "fourteen"],
              explain:
                "«We began with fourteen growers» — başlangıçtaki üretici sayısı. İki yüz bugünkü hane sayısı; cümle başlangıcı soruyor.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["200", "two hundred"],
              explain:
                "«we now supply two hundred households every week» — bugünkü hane sayısı. On dört üretici sayısıdır ve aynı cümlede geçtiği için karıştırılması kolay.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["90000", "ninety thousand"],
              explain:
                "«In three years we have delivered about ninety thousand boxes» — üç yıllık kutu sayısı. Cümlede `about` zaten yazılı olduğu için yalnız sayı isteniyor.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["potato", "potatoes"],
              explain:
                "Kayıt beklentiyi bozuyor: «not an unfamiliar vegetable, it is the potato, because they already have some at home». Tanıdık olmayan sebze yazan öğrenci tam olarak çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["Thursday"],
              explain:
                "«A box delivered on Thursday is empty by Saturday» — en hızlı tüketilen gün. Pazartesi kutusu cuma günü hâlâ dolu, yani karşılaştırmanın öteki ucu.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["card", "recipe card"],
              explain:
                "Üç biçim denenmiş ve «the single card outperformed everything else». Cümlede `single` zaten yazılı; video ve kitapçık elenen biçimler.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["reach"],
              explain:
                "Kayıt en can alıcı bulguyu veriyor: «the ones we most wanted to reach leave within eight weeks». Kalanlar zaten yemek pişirenler; ulaşılmak istenen kesim ise ayrılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-03-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["70", "seventy"],
              explain:
                "«Seventy per cent of our income comes from one contract with the council» — tek kaynağa bağlılık oranı. Konuşmacı asıl riskin hava değil bu olduğunu ekliyor.",
            },
          ],
        },
        {
          id: "en-b2-03-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about food and farming, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Gıda ve tarım üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The consumer is blamed for a choice they cannot really make." },
            { key: "b", label: "A true claim can still give a false impression." },
            { key: "c", label: "The incentives reward the wrong behaviour." },
            { key: "d", label: "The speaker has changed their own practice." },
            { key: "e", label: "Conditions are better than they used to be." },
            { key: "f", label: "The problem is the scale, not the intention." },
            { key: "g", label: "Producers should refuse to supply the large chains." },
            { key: "h", label: "Certification helps far less than people assume." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı bir belgelendirme deneyiminden söz ediyor.",
              plays: 2,
              segments: [
                { text: "We paid for the certificate for four years. The inspector was thorough and the paperwork was honest. Our sales did not move by a single per cent, and the buyers who actually mattered never mentioned it once." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı tüketiciye verilen öğütlerden söz ediyor.",
              plays: 2,
              segments: [
                { text: "It is easy to tell somebody on a low income to buy better food. Show me where, within a bus ride, and at what price, and then we can have that conversation." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı eski sözleşmelerini yeniden okuyor.",
              plays: 2,
              segments: [
                { text: "I have kept the contracts since 1996 and I have just read them again. The payment periods are shorter now, the standards are clearer, and the arguments are fewer. On the things that can be measured, this is a better decade." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı zincirin ölçütlerinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Nobody in this chain is acting badly. The grower is paid on weight, the packer on speed, the buyer on margin. Each of them behaves reasonably and the result is a crop that travels well and tastes of nothing." },
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
                { text: "The figure on our website is correct: ninety per cent of our suppliers are inside the region. What it does not say is that those ninety per cent provide about a fifth of what we actually sell." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı müşterilerine yolladığı bir notu anlatıyor.",
              plays: 2,
              segments: [
                { text: "I now send every new customer a note listing the three things our farm does badly. The questions I get back are completely different, and much better. I should have started doing it years ago." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-03-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "h",
              explain:
                "Belge dört yıl alınmış, denetim düzgün yapılmış, ama «Our sales did not move by a single per cent». Sistemi kötülemiyor, etkisinin sanılandan küçük olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı öğüdün koşullarını soruyor: «Show me where, within a bus ride, and at what price». Yani seçim tüketiciye yükleniyor ama gerçekte önünde bir seçenek yok.",
            },
            {
              kind: "match",
              id: "en-b2-03-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "1996'dan beri sözleşme saklayan konuşmacı üç somut ölçüt sayıyor: ödeme süreleri kısalmış, standartlar netleşmiş, tartışmalar azalmış. «this is a better decade» değerlendirmesi bunlara dayanıyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Konuşmacı kimsenin kötü niyetli olmadığını söyleyip ölçütleri sıralıyor: ağırlık, hız, kâr payı. «Each of them behaves reasonably and the result is a crop that … tastes of nothing» — sorun ödül düzeneğinde.",
            },
            {
              kind: "match",
              id: "en-b2-03-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Rakamın doğruluğu kabul ediliyor ama tamamlanıyor: «those ninety per cent provide about a fifth of what we actually sell». Doğru bir sayı yanlış bir izlenim bırakabiliyor.",
            },
            {
              kind: "match",
              id: "en-b2-03-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "d",
              explain:
                "Konuşmacı kendi uygulamasını değiştirmiş: «I now send every new customer a note listing the three things our farm does badly» ve sorular değişmiş. Son cümle bunu kendi kararı olarak pekiştiriyor.",
            },
          ],
        },
        {
          id: "en-b2-03-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who reduced the size of her farm. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "Çiftliğini küçülten bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında çiftçilikte yön değiştiren biriyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Ilkay, you farmed two hundred hectares of wheat and you now farm forty. People assume that was forced on you." },
                { speaker: "Ilkay", text: "They do, and it makes a better story than the truth. Nobody took the land from me; I sold it. I had reached the point where I could not tell you what the farm was for, beyond staying large enough to survive the next year." },
                { speaker: "Host", text: "Was the money the hardest part?" },
                { speaker: "Ilkay", text: "No. The hardest part was the neighbours. In this valley, area is the way people measure you, and I made myself smaller in public. Two men who had been at my wedding stopped speaking to me for about a year." },
                { speaker: "Host", text: "How long did the decision take?" },
                { speaker: "Ilkay", text: "Six years, which is embarrassing to say out loud. I built a very detailed spreadsheet, which is what people like me do instead of deciding. It said sell, three times, and I ignored it three times." },
                { speaker: "Host", text: "What finally moved you?" },
                { speaker: "Ilkay", text: "A dry August. I watched a younger neighbour take on more land in the same month, and I recognised exactly the reasoning he was using, because it had been mine. It was like hearing a recording of yourself." },
                { speaker: "Host", text: "And the smaller farm in practice?" },
                { speaker: "Ilkay", text: "We earn slightly less and we work slightly less, which is not the dramatic answer people want. The real change is that I now know the name of every person who eats what I grow, and I did not expect that to matter as much as it does." },
                { speaker: "Host", text: "Do you miss anything about the larger farm?" },
                { speaker: "Ilkay", text: "The machinery, honestly. There is a particular pleasure in a big field and a good machine, and anybody who says otherwise is performing. I miss it, and I would still not go back." },
                { speaker: "Host", text: "What do people get wrong about small farms?" },
                { speaker: "Ilkay", text: "They think small means safe. A bad year on forty hectares can end you just as quickly, and you have fewer places to hide it. The risk did not go away; it changed shape." },
                { speaker: "Host", text: "Would you recommend it?" },
                { speaker: "Ilkay", text: "Not as a general rule. If you have debt, or a family depending on the income, this is advice from a comfortable position and it is worth saying so. What I would recommend is writing down what the farm is for, and then reading your own sentence honestly." },
              ],
              gloss: [
                { de: "a hectare", tr: "hektar", en: "hectare" },
                { de: "machinery", tr: "makine parkı", en: "machinery" },
                { de: "a spreadsheet", tr: "hesap tablosu", en: "spreadsheet" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-03-h4-23",
              no: 23,
              ref: "d1",
              text: "Why did Ilkay reduce the size of her farm?",
              options: ["She had lost her sense of its purpose", "The bank forced her to sell part of the land", "A neighbour made her a good offer"],
              answer: 0,
              explain:
                "Ilkay zorlama savını reddedip gerekçesini veriyor: «I could not tell you what the farm was for, beyond staying large enough to survive the next year». Toprağı kimse almamış, kendisi satmış.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-24",
              no: 24,
              ref: "d1",
              text: "What was the hardest part of the change?",
              options: ["The loss of income in the first years", "The reaction of people nearby", "Learning new work"],
              answer: 1,
              explain:
                "Parayı açıkça dışarıda bırakıyor: «No. The hardest part was the neighbours». Vadide ölçü dönüm sayısı ve düğününde bulunan iki kişi bir yıl konuşmamış.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-25",
              no: 25,
              ref: "d1",
              text: "What does she say about the spreadsheet?",
              options: ["It gave her the wrong answer", "Her accountant built it for her", "She used it to avoid deciding"],
              answer: 2,
              explain:
                "Kendi sözü: «a very detailed spreadsheet, which is what people like me do instead of deciding». Tablo doğru cevabı üç kez vermiş, o üç kez yok saymış; yani sorun tabloda değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-26",
              no: 26,
              ref: "d1",
              text: "What finally moved her?",
              options: ["Recognising her own reasoning in somebody else", "A very poor harvest in the driest August for years", "Advice from an older farmer"],
              answer: 0,
              explain:
                "Kuru ağustos yalnız sahne: asıl an komşusunda kendi gerekçesini tanıması, «because it had been mine». Kimseden öğüt aldığından söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-27",
              no: 27,
              ref: "d1",
              text: "What surprised her about the smaller farm?",
              options: ["How much less she earns", "How much the personal contact matters", "How much harder the physical work turned out to be"],
              answer: 1,
              explain:
                "Kazanç ve iş yükü için «slightly less» diyor, yani sürpriz değil. Sürpriz olan şu: «I did not expect that to matter as much as it does» — yetiştirdiğini yiyen herkesin adını bilmek.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-28",
              no: 28,
              ref: "d1",
              text: "What does she say about the large machinery?",
              options: ["It was the main reason she sold the land", "She never enjoyed using it", "She misses it and says so openly"],
              answer: 2,
              explain:
                "Ilkay özlemi kabul ediyor ve inkâr edenleri eleştiriyor: «anybody who says otherwise is performing». Yine de «I would still not go back» diyor, yani özlem kararı değiştirmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-29",
              no: 29,
              ref: "d1",
              text: "What do people get wrong about small farms?",
              options: ["They assume there is less risk", "They assume the work is easier", "They assume the food is better"],
              answer: 0,
              explain:
                "«They think small means safe» ve hemen çürütülüyor: kırk hektarda kötü bir yıl da bitirebilir, üstelik «you have fewer places to hide it». Risk yok olmuyor, biçim değiştiriyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-03-h4-30",
              no: 30,
              ref: "d1",
              text: "What does she recommend?",
              options: ["Selling land before it loses any more of its value", "Writing down the purpose and reading it honestly", "Asking a neighbour for advice first"],
              answer: 1,
              explain:
                "Öğüt son cümlede: «writing down what the farm is for, and then reading your own sentence honestly». Genel bir kural olarak küçülmeyi önermiyor, tersine borcu olanlar için çekince koyuyor.",
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
          id: "en-b2-03-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed how food is priced. Now write an essay for your teacher, answering this question: \"Should supermarkets be required to show what the producer was paid?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what shoppers would do with the figure — what it would cost to check it",
          promptTr:
            "İngilizce dersinde gıda fiyatlarının nasıl oluştuğunu tartıştınız. Öğretmenin için bir deneme yaz: \"Marketler üreticiye ne ödendiğini göstermek zorunda tutulmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: alışveriş yapanlar bu sayıyla ne yapardı — sayının doğruluğunu denetlemenin maliyeti",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what shoppers would do with the figure.", tr: "Alışveriş yapanların bu sayıyla ne yapacağını tartış." },
              { de: "Discuss the cost of checking the figure.", tr: "Sayının denetlenmesinin maliyetini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost everyone agrees that a shopper should be able to find out where the money goes. The disagreement begins as soon as somebody asks what would actually change.

The evidence on behaviour is not encouraging. Where a producer price has been shown, trials suggest that very few shoppers move to a different product, mainly because the cheaper option is chosen for reasons that a label cannot touch. That is an argument against expecting too much, not against the figure itself.

The second objection is stronger. A number on a shelf has to be audited, and auditing a supply chain with four stages is expensive. If the cost falls on the producer, the rule punishes exactly the people it was written to protect.

My own view is that the figure would matter most to journalists and buyers rather than to shoppers, and that is not a weak reason. A number that is published is a number that can be compared.

Supermarkets should therefore be required to publish it, but at chain level rather than on every label.`,
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
          id: "en-b2-03-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You write for a student website. Write a review of a market, a shop or a restaurant you have used recently. Say what it offers, what it does well, and who would be disappointed by it. Write 140 to 190 words.",
          promptTr:
            "Bir öğrenci sitesi için yazıyorsun. Yakınlarda gittiğin bir pazarın, dükkânın ya da lokantanın değerlendirmesini yaz. Neler sunduğunu, neyi iyi yaptığını ve kimin hayal kırıklığına uğrayacağını söyle. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what it offers.", tr: "Neler sunduğunu söyle." },
              { de: "Say what it does well, with an example.", tr: "Neyi iyi yaptığını bir örnekle söyle." },
              { de: "Say who would be disappointed, and why.", tr: "Kimin hayal kırıklığına uğrayacağını ve nedenini söyle." },
            ],
            sample: `The Thursday market on Steel Street has about twenty stalls, and it is far better than that number suggests.

Roughly half of them sell vegetables, and the rest are bread, cheese, eggs and one man who repairs knives while you wait. The strongest stall is the third on the left, which sells only what is in season and puts the name of the farm on a piece of card. When I asked where the carrots came from, the answer was a village and a distance, not a country.

What the market does particularly well is refuse to pretend. Nothing is described as artisan, nothing has a photograph of a person in a field, and the prices are written large. Two stalls are noticeably cheaper than the supermarket; three are noticeably more expensive, and nobody hides that.

It is not for everyone. If you want one trip and a full trolley, you will be disappointed, because there is no meat and no household aisle.

For anybody who cooks from what they find, however, it is the best two hours of my week.`,
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
          id: "en-b2-03-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about food, shopping and how you decide what to buy.",
          promptTr: "Sana yemek, alışveriş ve ne alacağına nasıl karar verdiğin hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Where do you usually buy your food, and has that changed in the last few years?", tr: "Günaydın. Yiyeceğini genelde nereden alıyorsun ve bu son birkaç yılda değişti mi?" },
            { who: "you", hint: "Şimdiki durumu ve değişimi anlat, bir gerekçe ver.", expect: "bir alışkanlığı ve zaman içindeki değişimini gerekçesiyle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Can you think of a time when you paid more for something and later decided it was not worth it?", tr: "Teşekkürler. Bir şeye fazla ödeyip sonradan değmediğine karar verdiğin bir anı hatırlıyor musun?" },
            { who: "you", hint: "Somut bir örnek ver ve kendi kararını çözümle.", expect: "somut bir örnek vermek ve kendi kararını çözümlemek", seconds: 45 },
            { who: "partner", de: "And what makes you trust one label or one shop more than another?", tr: "Bir etikete ya da bir dükkâna ötekinden çok güvenmeni ne sağlıyor?" },
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
              "I used to do one big supermarket trip on Saturdays; now I buy vegetables at a market on the way home and everything else online, which is cheaper in time rather than in money. Two years ago I paid nearly double for eggs with a very convincing box, and when I finally looked the farm up it was owned by the same company as the cheap ones. What makes me trust a shop now is whether it will name a supplier when I ask, although I have to admit that most people, including me, almost never ask.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Somut bir örnek verildi mi, yoksa genel mi konuşuldu?",
              "Kendi kararı çözümlendi mi, yalnız anlatıldı mı?",
              "Öne sürülen ölçütün sınırı kabul edildi mi?",
            ],
          },
        },
        {
          id: "en-b2-03-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of helping small farms, say which is better and explain one problem with your choice: paying them a higher price through the shops, or paying them directly from public money.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Küçük çiftliklere yardımın şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: dükkânlar üzerinden daha yüksek fiyat ödemek mi, kamu parasından doğrudan ödeme yapmak mı?",
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
              "A higher price through the shops keeps the relationship simple: the person who eats the food pays for it, and nobody has to design a form. The difficulty is that it falls hardest on people with the least money, and a policy that makes food more expensive for them is hard to defend. Public payment spreads the cost across everybody and can be targeted, but it creates paperwork that the largest farms are always best at completing, which is exactly what happened with area payments. I would choose public payment, mainly because the price route cannot be aimed at anybody. The problem with my own choice is that it hides the cost: nobody sees it at the till, so nobody defends it when a government looks for savings.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (targeted, paperwork, defend)",
            ],
          },
        },
        {
          id: "en-b2-03-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A town wants to improve the food sold in its schools. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir kasaba okullarında satılan yemeği iyileştirmek istiyor. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: buy a fixed share from farms within fifty kilometres, publish what the town pays for each item, teach cooking to every class for one term, and stop selling anything sweet. Which of these would actually change what children eat?", tr: "Fikirler: alımın belli bir payını elli kilometre içindeki çiftliklerden yapmak, kasabanın her ürüne ne ödediğini yayımlamak, her sınıfa bir dönem yemek pişirme öğretmek ve tatlı olan hiçbir şeyi satmamak. Sence bunlardan hangisi çocukların yediğini gerçekten değiştirir?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the local buying rule. Fifty kilometres tells you nothing about how the food was grown, and it can cost more. Does that change your view?", tr: "Yerel alım kuralını sorgularım. Elli kilometre yiyeceğin nasıl yetiştirildiği hakkında hiçbir şey söylemiyor ve daha pahalıya da gelebiliyor. Bu görüşünü değiştirir mi?" },
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
              "The cooking term looks weakest on paper and is probably the strongest, because it changes what a child can do rather than what is on the counter. You are right that fifty kilometres measures the wrong thing, so I would replace the distance rule with a rule about how the food is grown rather than drop the idea. Banning everything sweet seems worse than the disease: children simply buy it outside the gate, and the school loses the income without changing the diet. So I would recommend the cooking term and the published prices, and reject the ban.",
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

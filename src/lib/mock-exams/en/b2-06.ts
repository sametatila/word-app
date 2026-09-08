import type { MockPaper } from "../types";

/**
 * B2 · Deneme 6 — "Energy, Waste and the Household".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Enerji ve atık B2 için
 * verimli çünkü tartışmanın merkezinde bir ölçüm sorunu var: aynı olgu
 * iki yöntemle ölçülünce iki farklı sayı veriyor. Dinleme 4'ün söyleşisi
 * de bilerek başka bir yay izliyor — konu bir kurumu küçültmek değil, bir
 * kampanyayı kazanıp uygulamayı kaybetmek.
 *
 * B2 İMZALARI: edilgen, ileri bağlayıcı, üçüncü tip koşul ve ortaç öbeği
 * boşluksuz metinlerde geçiyor.
 */
export const EN_B2_06: MockPaper = {
  id: "en-b2-06",
  course: "en",
  level: "B2",
  no: 6,
  theme: "Energy, Waste and the Household",
  themeTr: "Enerji, atık ve ev",
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
          id: "en-b2-06-l1",
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
              title: "The number on the bill",
              body: `The figure on an energy bill is one of the least useful numbers in a household, and it {{1}} for a surprising amount of what goes wrong.

A bill covers three months, arrives six weeks late and says nothing about which appliance is responsible. Almost nobody {{2}} that gap into account when reading it.

Researchers who study household energy {{3}} out that the largest savings usually come from heating rather than from anything with a light on it. Blaming the television alone therefore {{4}} the point.

Several countries now require a second figure on the bill, showing the same month a year earlier. Early trials {{5}} that households change very little, which the designers had not expected.

That result is worth {{6}} in mind, because a comparison that nobody acts on is a cheap way to look serious.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-06-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["accounts", "counts", "answers", "allows"],
              answer: 0,
              explain:
                "`account for something` bir olguyu açıklamak demektir ve boşluktan sonra `for` geliyor. `count for` değer taşımak, `answer for` hesap vermek, `allow for` payını bırakmak anlamındadır.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["puts", "makes", "takes", "gives"],
              answer: 2,
              explain:
                "`take something into account` hesaba katmak anlamında sabit bir eşdizimdir. Bu kalıpta fiil değiştirilemez; `put`, `make` ve `give` ile kurulan biçimler İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["take", "bring", "set", "point"],
              answer: 3,
              explain:
                "`point out that …` bir savı öne çıkarmanın kalıbıdır. `bring out` bir özelliği belirginleştirir ama `that` yan cümlesi almaz; `take out` ve `set out` bambaşka anlamlar taşır.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["loses", "misses", "fails", "drops"],
              answer: 1,
              explain:
                "`miss the point` bir savın özünü kaçırmak demektir. `lose the point` bir tartışmada puan kaybını çağrıştırır; `fail` bu adla doğrudan kullanılmaz ve `drop the point` konuyu bırakmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["propose", "advise", "suggest", "recommend"],
              answer: 2,
              explain:
                "Denemeler bir kanıt sunuyor, bir öğüt vermiyor: `suggest that` burada «gösteriyor, işaret ediyor» demektir. `propose`, `advise` ve `recommend` bir eylem önerir ve cansız bir özneyle bu anlamı taşıyamaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l1-6",
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
          id: "en-b2-06-l2",
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
              title: "What a recycling rate measures",
              body: `Nobody disputes that recycling rates have risen. What is disputed is {{7}} the rise actually means.

A council that weighs everything collected can report a high figure; one that weighs the material {{8}} it has been sorted reports a much lower one.

The difference is easy to state and, {{9}} practice, easy to ignore.

In the second system the figure for the same district is closer to forty, {{10}} the households have changed nothing at all.

Both methods follow a published standard, and neither {{11}} be called dishonest, which is the only sentence in this report that everybody is likely to agree {{12}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-06-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["what"],
              explain:
                "`What is disputed is what the rise means` — ikinci `what` kendi öncülünü taşıyan bir ad cümlesi kurar. `that` bir olguyu bildirir ve tartışmanın konusunu belirsiz bırakırdı.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["after", "once"],
              explain:
                "İki yöntem ölçüm ANINDA ayrılıyor: biri toplananı, öteki ayrıştırıldıktan sonrasını tartıyor. `after` ve `once` bu sırayı verir; `before` sıralamayı tersine çevirir ve düşük rakamı açıklayamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["in"],
              explain:
                "`in practice` uygulamada demektir ve kuram ile gerçeği karşı karşıya koyar. `on practice` ya da `at practice` kalıp değildir.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["although", "though"],
              explain:
                "İki yarı arasında ödün ilişkisi var: rakam düşük çıkıyor, oysa hanelerde hiçbir şey değişmemiş. `although` ve `though` bunu kurar; `because` ilişkiyi sebebe çevirir ve savı bozar.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["can", "could"],
              explain:
                "Cümle bir olanağı yadsıyor: hiçbiri sahtekârlıkla suçlanamaz. Bu yüzden bir kip fiili gerekiyor ve ardından edilgen `be called` geliyor. `is` kip fiilinin yerini tutamaz, çünkü `be` yalın hâlde duruyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["with", "on"],
              explain:
                "`agree with something` bir savı doğrulamayı, `agree on something` bir konuda uzlaşmayı bildirir; ilgi cümlesinde edat sona kaldığı için ikisi de doğaldır. `agree to` bir öneriyi kabul etmektir ve ortada öneri yok.",
            },
          ],
        },
        {
          id: "en-b2-06-l3",
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
              title: "Energy labels",
              body: `An energy label is a mark by which an appliance is placed on a scale according to its {{13}} in normal use.

Its defenders describe it as a shortcut. Its critics point to its {{14}}: the test conditions have never resembled a kitchen with a door that opens.

Neither description is complete. The label rarely misleads deliberately, and it is not {{15}} to, because the method is published and the numbers can be repeated.

What it does well is narrower and still useful: it turns a vague impression into a {{16}} ranking, so that two machines can be compared without a laboratory.

Several countries rewrote the scale in 2021. The number of appliances at the top grade fell sharply, which caused considerable {{17}} among manufacturers.

The most likely future is therefore a revised one, with different regions adjusting the scale according to their own {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-06-l3-13",
              no: 13,
              text: "CONSUME",
              accept: ["consumption"],
              explain:
                "`according to its ___ in normal use` yapısında iyelik sıfatından sonra bir ad gerekiyor: `consumption`. Fiil biçimi bu konumda duramaz; `consumer` ise bir kişiyi adlandırır.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l3-14",
              no: 14,
              text: "ACCURATE",
              accept: ["inaccuracy"],
              explain:
                "İki nokta üst üstenin ardındaki açıklama test koşullarının gerçek mutfağa benzemediğini söylüyor: eleştiri YANLIŞLIĞA yapılıyor. `accurate` sıfatından `accuracy` adı, ondan da olumsuzu `inaccuracy` türetiliyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l3-15",
              no: 15,
              text: "MEAN",
              accept: ["meant"],
              explain:
                "`it is not ___ to` yapısı edilgen bir ortaç ister: etiket bunun için TASARLANMAMIŞ. `mean` fiilinin üçüncü hâli bu edilgeni kurar; ad biçimi (`meaning`) `to` mastarıyla bu yapıyı kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l3-16",
              no: 16,
              text: "MEASURE",
              accept: ["measurable"],
              explain:
                "`a ___ ranking` yapısında belirsiz tanımlık ile ad arasında bir sıfat var ve karşıtı hemen önünde: belirsiz izlenim, ölçülebilir sıralamaya dönüşüyor. Ad biçimi (`measurement`) bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l3-17",
              no: 17,
              text: "ANNOY",
              accept: ["annoyance"],
              explain:
                "`caused considerable ___` yapısında sıfattan sonra sayılamayan bir ad geliyor: `annoyance`. Sıfat biçimi (`annoying`) `considerable` ile yan yana gelemez ve `caused` fiilinin nesnesi olamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l3-18",
              no: 18,
              text: "CONCERN",
              accept: ["concerns"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different regions`), dolayısıyla ad da çoğul. Fiil biçimi bu konumda duramaz.",
            },
          ],
        },
        {
          id: "en-b2-06-l4",
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
              id: "en-b2-06-l4-19",
              no: 19,
              text: "Somebody is reading the meters at the moment.\nThe meters ______ at the moment.",
              cue: "BEING",
              accept: ["are being read"],
              explain:
                "Şimdiki zamanın edilgeni isteniyor ve anahtar sözcük `being` bunu zorunlu kılıyor: «are being read». Özne çoğul olduğu için yardımcı fiil `are`; `is being read` özneyle uyuşmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l4-20",
              no: 20,
              text: "The company should have told the tenants about the change.\nThe tenants ______ about the change.",
              cue: "INFORMED",
              accept: ["should have been informed"],
              explain:
                "Geçmişe dönük bir gereklilik (`should have + üçüncü hâl`) edilgene çevriliyor. Anahtar sözcük üçüncü hâl olduğu için zincir `should have been` biçiminde tamamlanıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l4-21",
              no: 21,
              text: "Nobody expected the bill to be so high.\nThe bill ______ than anybody expected.",
              cue: "HIGHER",
              accept: ["was much higher", "was far higher", "was higher"],
              explain:
                "«so high» yapısı `than` ile kurulan bir karşılaştırmaya çevriliyor. Anahtar sözcük zaten karşılaştırma derecesi; eksik olan bağ fiil, `much` ve `far` ise beklentiyle arasındaki farkı pekiştirir.",
            },
            {
              kind: "gap",
              id: "en-b2-06-l4-22",
              no: 22,
              text: "I did not read the contract, so I did not notice the clause.\nIf I ______ the contract, I would have noticed the clause.",
              cue: "READ",
              accept: ["had read"],
              explain:
                "Ana cümle `would have noticed` taşıyor, yani gerçekleşmemiş bir geçmiş kuruluyor. Bu yapının koşul yarısı `had + üçüncü hâl` ister; `read` fiilinin üçüncü hâli yazımca aynı kalır, eksik olan `had`dir.",
            },
          ],
        },
        {
          id: "en-b2-06-l5",
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
              title: "I measured everything in my flat for a year",
              body: `For a year I recorded the electricity used by every appliance in my flat, and I want to describe what that taught me, because most of it was not about electricity.

The measuring itself was easy. A plug meter costs fifteen pounds and the readings are not in dispute. What took the year was working out which numbers mattered, and the answer turned out to be almost none of them.

The fridge, which I had suspected for years, used about eleven pounds a month and could not be improved without buying a new one, which would have cost more than eight years of the difference. The television used less than the router that was never turned off. The kettle, boiled roughly nine times a day, used more than everything else in the kitchen together, and I still boil it nine times a day.

I should be careful here, because the obvious conclusion is the wrong one. The point is not that individual behaviour is pointless; it is that the largest number in my flat was the heating, and the heating is a decision made by whoever owns the building. Faced with that, a plug meter is a hobby. If I had known it at the start, I would have spent the year reading the lease instead.

Nevertheless, I do not regret the year. What it changed was not my bill but my patience with a certain kind of advice, and that has been worth rather more than the fifteen pounds.`,
              gloss: [
                { de: "a plug meter", tr: "priz ölçer", en: "plug meter" },
                { de: "a router", tr: "modem, yönlendirici", en: "router" },
                { de: "a lease", tr: "kira sözleşmesi", en: "lease" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-06-l5-23",
              no: 23,
              text: "What does the writer say took the longest?",
              options: ["Buying the equipment", "Reading the meters", "Persuading the landlord to take part", "Deciding which figures mattered"],
              answer: 3,
              explain:
                "Metin ayrımı kendisi yapıyor: «The measuring itself was easy … What took the year was working out which numbers mattered». Ev sahibiyle görüşmek bu bölümde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l5-24",
              no: 24,
              text: "What does she say about the fridge?",
              options: ["It used more electricity than anything else", "Replacing it would not have paid", "It was newer than she thought", "It was the cheapest to run"],
              answer: 1,
              explain:
                "Hesap metinde: yeni bir buzdolabı «would have cost more than eight years of the difference». En çok harcayan şey ise buzdolabı değil, günde dokuz kez kaynatılan su ısıtıcısı.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l5-25",
              no: 25,
              text: "What does she say about the kettle?",
              options: ["She still uses it as often", "She now boils it considerably less often", "She has replaced it", "It uses less than the router"],
              answer: 0,
              explain:
                "Cümle ölçümü ve davranışı yan yana koyuyor: «used more than everything else in the kitchen together, and I still boil it nine times a day». Bilgi davranışı değiştirmemiş.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l5-26",
              no: 26,
              text: "What is the writer's main point?",
              options: ["Plug meters are inaccurate", "Individual behaviour is entirely pointless", "The biggest decision is not hers to make", "Landlords should pay for heating"],
              answer: 2,
              explain:
                "Dördüncü paragraf iki savı ayırıyor: «The point is not that individual behaviour is pointless; it is that the largest number in my flat was the heating», ve ısıtma binanın sahibinin kararı.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-l5-27",
              no: 27,
              text: "What does she say she gained?",
              options: ["A lower bill", "A new fridge", "A better relationship with her landlord", "Less patience with certain advice"],
              answer: 3,
              explain:
                "Son cümle: «What it changed was not my bill but my patience with a certain kind of advice». Fatura düşmemiş ve yeni bir buzdolabı alınmamış.",
            },
          ],
        },
        {
          id: "en-b2-06-l6",
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
              title: "The cheapest energy is the kind you do not use",
              body: `Every campaign about energy assumes that the decision belongs to the person who pays the bill. In rented housing that assumption fails, and it fails in a way that no amount of advice can repair. {{28}}

Consider insulation. It pays for itself in about seven years, which is a good investment for whoever owns the building and no investment at all for a tenant with a twelve-month contract. {{29}}

The same difficulty appears with appliances. A landlord buying a fridge for a flat they will never live in has no reason to pay forty pounds more for a better grade. {{30}}

Some countries now require a minimum standard before a property may be let. The change is slow and it is resisted, mainly because it turns a preference into a cost. {{31}}

None of this argues that behaviour is irrelevant, since a household that heats one room instead of four uses less whatever the walls are like. It argues for asking who holds the decision before designing the advice.`,
              gloss: [
                { de: "insulation", tr: "yalıtım", en: "insulation" },
                { de: "a tenant", tr: "kiracı", en: "tenant" },
                { de: "to let a property", tr: "kiraya vermek", en: "let a property" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The person who would benefit is not the person who would pay, and no leaflet changes that." },
            { key: "b", label: "b", body: "That resistance is itself revealing, since it names the person who was carrying the cost before." },
            { key: "c", label: "c", body: "The tenant pays the higher bill for years and never sees the invoice for the cheaper machine." },
            { key: "d", label: "d", body: "This is the harder problem, because it cannot be solved by telling anybody anything." },
            { key: "e", label: "e", body: "Domestic gas consumption in Europe fell by about a fifth between 2005 and 2019." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-06-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "d",
              explain:
                "Giriş savı kuruyor: kiralık konutta varsayım çöküyor ve «no amount of advice can repair» ediyor. (d) bunu «the harder problem» diye adlandırıp aynı gerekçeyi başka sözcüklerle veriyor.",
            },
            {
              kind: "match",
              id: "en-b2-06-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "a",
              explain:
                "Yalıtım örneği bölünmeyi veriyor: «a good investment for whoever owns the building and no investment at all for a tenant with a twelve-month contract». (a) bunu tek cümlede özetliyor: yararlanan ile ödeyen aynı kişi değil.",
            },
            {
              kind: "match",
              id: "en-b2-06-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "c",
              explain:
                "Paragraf mal sahibinin durumunu veriyor: «has no reason to pay forty pounds more for a better grade». (c) aynı olayı kiracı açısından tamamlıyor: yıllarca yüksek fatura, ucuz makinenin faturasını ise hiç görmüyor.",
            },
            {
              kind: "match",
              id: "en-b2-06-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Önceki cümle direnci ve gerekçesini veriyor: «it turns a preference into a cost». (b) direncin kendisinden bir çıkarım yapıyor. (e) Avrupa'daki gaz tüketiminden söz ediyor ve metnin hiçbir yerinde toplam tüketim tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-06-l7",
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
              label: "a — Cosmin, landlord",
              body: "I put in new windows last year and my rent has not gone up by a pound. That is fine; I own the building and I will own it in twenty years. But when people say landlords have no incentive, they are describing the tax rules, not my character, and the rules are the thing you can actually change.",
            },
            {
              key: "b",
              label: "b — Yrsa, energy adviser",
              body: "Tenants are blamed for bills that begin with the building. A flat with single glazing costs more to heat than one with double, and no amount of turning things off closes that gap. The advice we are funded to give is the advice that fits on a leaflet.",
            },
            {
              key: "c",
              label: "c — Aurel, appliance retailer",
              body: "My job is to sell machines and I am judged on volume. Nobody has ever asked me whether the customer will still be able to afford to run it. Change what I am measured on and the display in my shop will change within a month.",
            },
            {
              key: "d",
              label: "d — Bodil, teacher",
              body: "My pupils can list ten ways to save energy at home. What defeats them is a bill: a page of numbers with no unit they recognise and a total that depends on a decision made before they were born. That is the harder thing to teach.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-06-l7-32",
              no: 32,
              text: "Which text says the problem begins with the building rather than the occupant?",
              answer: "b",
              explain:
                "Yrsa sorumluluğu yapıya taşıyor: «Tenants are blamed for bills that begin with the building» ve tek camlı dairenin farkının davranışla kapanmadığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-b2-06-l7-33",
              no: 33,
              text: "Which text says the rules rather than the person should be criticised?",
              answer: "a",
              explain:
                "Cosmin ayrımı kendisi yapıyor: «they are describing the tax rules, not my character, and the rules are the thing you can actually change».",
            },
            {
              kind: "match",
              id: "en-b2-06-l7-34",
              no: 34,
              text: "Which text says that changing an incentive would change behaviour quickly?",
              answer: "c",
              explain:
                "Aurel koşulu ve süreyi birlikte söylüyor: «Change what I am measured on and the display in my shop will change within a month».",
            },
            {
              kind: "match",
              id: "en-b2-06-l7-35",
              no: 35,
              text: "Which text describes a difficulty caused by a decision taken long ago?",
              answer: "d",
              explain:
                "Bodil faturanın öğrencileri neden yendiğini açıklıyor: «a total that depends on a decision made before they were born». Bilgi eksikliği değil, karar zamanı sorun.",
            },
            {
              kind: "match",
              id: "en-b2-06-l7-36",
              no: 36,
              text: "Which text describes an improvement the speaker paid for personally?",
              answer: "a",
              explain:
                "Cosmin yatırımı ve karşılığını veriyor: «I put in new windows last year and my rent has not gone up by a pound». Bunu bir şikâyet olarak değil, kendi durumunun açıklaması olarak anlatıyor.",
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
          id: "en-b2-06-h1",
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
              genreTr: "Duyuru",
              situation: "Binada kazan bakımı duyuruluyor.",
              plays: 2,
              segments: [
                { text: "A short note about the boiler. The heating will be off between nine and two on Thursday while the new pump is fitted. Hot water is not affected. If you work from home and this is a problem, tell the office today and we will move you to Friday." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Enerji şirketi müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your account. The reading you sent is lower than the one on the meter we visited, which usually means a digit was missed. Please send a photograph rather than a number, and we will correct the bill." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki kişi yeni buzdolabını konuşuyor.",
              plays: 2,
              segments: [
                { text: "How much did the new fridge save?" },
                { text: "Four pounds a month." },
                { text: "That is not nothing." },
                { text: "It cost four hundred. I will be dead before it pays for itself, and I say that as somebody of thirty-one." },
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
                { text: "Listeners ask me every week whether it is worth turning things off at the wall. The honest answer is that the question is too small: for a flat with good heating the answer is no, and for a flat with electric heating and thin walls almost nothing else matters at all." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Ofiste atık düzeni değişiyor.",
              plays: 2,
              segments: [
                { text: "A note for everybody in the office. The bins by the desks are going. There will be one point on each floor, with four containers, and the cleaners will no longer sort anything. Anything in the wrong container goes to landfill." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir kişi teknisyen randevusu için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Thursday. I can meet the engineer and let him in, but I have to leave at twelve for the school. If he starts at eight he will be finished by then, and Quim said he can come for the afternoon." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir danışman bina yöneticilerine sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of managing a building is buying equipment before measuring. A better meter costs two hundred pounds and tells you where the money goes; a new boiler costs six thousand and might be in the wrong place entirely." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Between neighbours",
              genreTr: "Komşular arasında",
              situation: "İki komşu fatura farkını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Why is your bill so much lower than mine?" },
                { text: "Same flat, same size." },
                { text: "Exactly." },
                { text: "I am on the top floor and you are on the corner. Three outside walls against my one. Nothing I do explains it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-06-h1-1",
              no: 1,
              ref: "a1",
              text: "What can residents do if Thursday is difficult?",
              options: ["Ask to be moved to Friday", "Use the hot water instead", "Stay at home until two"],
              answer: 0,
              explain:
                "Duyuru bir seçenek sunuyor: «tell the office today and we will move you to Friday». Sıcak su zaten etkilenmiyor, yani bir çözüm değil; evde kalmak da sorunun kendisi.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the supplier want?",
              options: ["A new meter to be fitted", "A photograph of the meter", "The bill to be paid first"],
              answer: 1,
              explain:
                "İstek açık: «Please send a photograph rather than a number». Sayaç değişmiyor ve ödeme istenmiyor; tersine fatura düzeltilecek.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the second speaker's point?",
              options: ["The saving is much larger than expected", "The fridge was badly made", "The saving will never cover the cost"],
              answer: 2,
              explain:
                "Hesap kayıtta: ayda dört pound tasarruf, dört yüz pound maliyet. «I will be dead before it pays for itself» sözü bunu abartarak vurguluyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say about the question?",
              options: ["It is too narrow to be useful", "It has a clear answer", "Nobody asks it often enough any more"],
              answer: 0,
              explain:
                "Konuşmacı soruyu ölçek olarak eleştiriyor: «the question is too small», ve iki farklı daire için iki farklı cevap veriyor. Soru haftada bir soruluyor, yani seyrek değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-5",
              no: 5,
              ref: "a5",
              text: "What is changing?",
              options: ["The cleaners will sort all of the waste", "Bins move to one point per floor", "Landfill costs will be published"],
              answer: 1,
              explain:
                "Duyuru düzeni veriyor: «There will be one point on each floor, with four containers». Temizlikçiler tam tersine artık ayırmayacak.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Cancelling the appointment", "Asking somebody to replace her for the day", "Agreeing to help for part of the day"],
              answer: 2,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can meet the engineer and let him in, but I have to leave at twelve». Quim yalnız öğleden sonrayı devralıyor, günün tamamını değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Replacing the boiler first", "Measuring before buying", "Buying the cheapest equipment"],
              answer: 1,
              explain:
                "Öğüt sıraya dair: «buying equipment before measuring» hata olarak adlandırılıyor. İki yüz poundluk sayaç paranın nereye gittiğini gösteriyor; altı bin poundluk kazan yanlış yerde olabilir.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h1-8",
              no: 8,
              ref: "a8",
              text: "What explains the difference between the two bills?",
              options: ["The position of the flat", "The behaviour of the household", "The size of the flat"],
              answer: 0,
              explain:
                "Konuşmacı konumu veriyor: «I am on the top floor and you are on the corner. Three outside walls against my one». Daireler aynı büyüklükte ve «Nothing I do explains it» diyerek davranışı dışlıyor.",
            },
          ],
        },
        {
          id: "en-b2-06-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting three years of results from a housing programme. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir konut programının üç yıllık sonuçlarını anlatan bir adamı dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
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
                  text: "Thank you. I will give you our three-year figures and I will not pretend that all of them are comfortable. We began with four hundred properties on the programme and we have now completed three hundred and twenty. In that time we have carried out about twelve thousand individual measures. Here is the first finding: the measure that saves most per pound is not new windows, it is loft insulation, because it is cheap and almost nothing has been done since 1985. Second, the sequence matters more than the total. A property done in the right order costs about fifteen per cent less than the same work done piece by piece. Third, the way we tell tenants. We tried a letter, a phone call and a visit, and the visit produced three times the response of the other two, which is expensive and we are doing it anyway. Fourth, a caution: our own survey shows that the households in the worst properties are the hardest to reach, and we have not solved that. And finally, money. Ninety per cent of our funding comes from one national programme that ends in two years.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Housing programme — three-year results",
              body: `The programme began with {{9}} properties.

{{10}} properties have now been completed.

About {{11}} individual measures have been carried out.

The measure that saves most per pound is {{12}}.

Work done in the right order costs about {{13}} per cent less.

The most effective way of telling tenants was a {{14}}.

The households hardest to reach are those in the {{15}} properties.

{{16}} per cent of the funding comes from one national programme.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-06-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["400", "four hundred"],
              explain:
                "«We began with four hundred properties on the programme» — programa alınan toplam. Üç yüz yirmi ise tamamlanan sayı; iki sayı aynı cümlede geçtiği için ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["320", "three hundred and twenty"],
              explain:
                "«we have now completed three hundred and twenty» — bitirilen konut sayısı. Dört yüz programın tamamı; cümle bitirileni soruyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["12000", "twelve thousand"],
              explain:
                "«we have carried out about twelve thousand individual measures» — tek tek uygulanan iş sayısı. Cümlede `About` zaten yazılı olduğu için yalnız sayı isteniyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["loft insulation", "insulation"],
              explain:
                "Kayıt beklentiyi bozuyor: «not new windows, it is loft insulation», çünkü ucuz ve 1985'ten beri neredeyse hiç yapılmamış. Pencereyi yazan öğrenci çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["15", "fifteen"],
              explain:
                "«costs about fifteen per cent less than the same work done piece by piece» — doğru sırayla yapmanın kazancı. Cümlede `per cent less` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["visit"],
              explain:
                "Üç yöntem denenmiş ve «the visit produced three times the response of the other two». Mektup ve telefon elenen biçimler; ziyaret pahalı ama yine de sürdürülüyor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["worst"],
              explain:
                "En rahatsız edici bulgu: «the households in the worst properties are the hardest to reach». Yani programın en çok gerektiği yerde ulaşım en zor.",
            },
            {
              kind: "gap",
              id: "en-b2-06-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["90", "ninety"],
              explain:
                "«Ninety per cent of our funding comes from one national programme that ends in two years» — tek kaynağa bağlılık ve üstelik süreli.",
            },
          ],
        },
        {
          id: "en-b2-06-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about energy in housing, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Konutlarda enerji üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The public is blamed for a failure that belongs to the system." },
            { key: "b", label: "A true figure can still give a false impression." },
            { key: "c", label: "The incentives reward the wrong behaviour." },
            { key: "d", label: "The speaker has changed their own practice." },
            { key: "e", label: "Things are better than they used to be." },
            { key: "f", label: "The problem is the scale, not the principle." },
            { key: "g", label: "Households should refuse to pay the standing charge." },
            { key: "h", label: "New rules help far less than people assume." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı programın ölçeğinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I have no objection to the standard at all. My objection is arithmetical. There are twenty-eight million homes, we are doing about half a million a year, and at that rate the last one is finished in the twenty-second century." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı düşük gelirli hanelere verilen öğüdü ele alıyor.",
              plays: 2,
              segments: [
                { text: "It is easy to tell somebody on a low income to heat one room. Show me a flat where one room can be heated without the damp moving into the next one, and then we can have that conversation." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı eski teknik şartnameleri yeniden okuyor.",
              plays: 2,
              segments: [
                { text: "I have kept the specifications since 1997 and I read them again last month. The insulation is thicker, the tests are harder and the certificate now names the installer. On the things that can be measured, this is a better decade." },
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
                { text: "Nobody in this chain is acting badly. The builder is paid on completion, the assessor on volume, the landlord on rent. Each of them behaves reasonably and the result is a house that scores well and is cold." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kendi kurumlarının bir rakamını ele alıyor.",
              plays: 2,
              segments: [
                { text: "The figure on our website is correct: ninety per cent of our properties are rated C or above. What it does not say is that the rating is modelled rather than measured, and that nobody has been inside two thirds of them." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı ilanlarında yaptığı bir değişikliği anlatıyor.",
              plays: 2,
              segments: [
                { text: "I now put the estimated running cost on the advert next to the rent. The questions I get from tenants are completely different, and much better. I should have started years ago." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-06-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "f",
              explain:
                "Konuşmacı ilkeyi açıkça savunuyor: «I have no objection to the standard at all. My objection is arithmetical» ve sayıları veriyor: yirmi sekiz milyon konut, yılda yarım milyon.",
            },
            {
              kind: "match",
              id: "en-b2-06-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı öğüdün koşullarını soruyor: «Show me a flat where one room can be heated without the damp moving into the next one». Suç haneye yükleniyor ama engel yapıda.",
            },
            {
              kind: "match",
              id: "en-b2-06-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "1997'den beri şartname saklayan konuşmacı üç somut fark sayıyor: daha kalın yalıtım, daha zor testler ve uygulayıcının adının sertifikada geçmesi.",
            },
            {
              kind: "match",
              id: "en-b2-06-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Kimse kötü niyetli değil ama ölçütler ayrı: tamamlama, hacim, kira. «Each of them behaves reasonably and the result is a house that scores well and is cold».",
            },
            {
              kind: "match",
              id: "en-b2-06-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Rakamın doğruluğu kabul ediliyor ama tamamlanıyor: «the rating is modelled rather than measured, and … nobody has been inside two thirds of them».",
            },
            {
              kind: "match",
              id: "en-b2-06-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "d",
              explain:
                "Konuşmacı kendi uygulamasını değiştirmiş: ilana kiranın yanına tahmini işletme maliyetini koyuyor ve gelen sorular değişmiş. «I should have started years ago» bunu pekiştiriyor.",
            },
          ],
        },
        {
          id: "en-b2-06-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who campaigned for a housing standard. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "Bir konut standardı için kampanya yürüten bir adamla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında uzun süreli bir kampanyacıyla söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Urho, you campaigned for eleven years for a minimum standard in rented housing. It came in three years ago. Was it worth it?" },
                { speaker: "Urho", text: "Yes, and I want to say that first, because the rest of this answer sounds like regret and it is not. About sixty thousand of the worst properties were improved. That is a real number and I would do the eleven years again." },
                { speaker: "Host", text: "But?" },
                { speaker: "Urho", text: "But the rule measures a model, not a house. A property can meet the standard on paper because somebody entered the right kind of boiler, and nobody has been inside. We spent eleven years arguing about the threshold and about ten minutes on who checks." },
                { speaker: "Host", text: "Could that have been foreseen?" },
                { speaker: "Urho", text: "It was foreseen. Two people said it in a meeting in 2016 and I did not want to hear it, because it made the campaign more complicated at exactly the moment it was starting to work. That is the part I find hard." },
                { speaker: "Host", text: "What would you do differently?" },
                { speaker: "Urho", text: "I would spend the first year on enforcement and the last ten on the standard, which is the opposite of what we did. A rule nobody checks is a rule that punishes the honest landlord, and there are more of those than the campaign ever admitted." },
                { speaker: "Host", text: "Has anything else surprised you?" },
                { speaker: "Urho", text: "How quickly the argument moved. Nobody now says that a cold rented flat is acceptable. Ten years ago that was a serious position held by serious people, and it has simply gone. I did not expect to win the argument and lose the implementation." },
                { speaker: "Host", text: "What do people get wrong about campaigns like yours?" },
                { speaker: "Urho", text: "They think the hard part is persuading the public. The public was persuaded in about four years. The hard part is the eighteen months after you win, when everybody who helped goes home and the details are written by whoever is still in the room." },
                { speaker: "Host", text: "Would you recommend the work?" },
                { speaker: "Urho", text: "Not as a general rule. If you need to see results within a normal working life, this is advice from a comfortable position and it is worth saying so. What I would recommend is deciding at the start who will read the regulations, and paying that person." },
              ],
              gloss: [
                { de: "a threshold", tr: "eşik", en: "threshold" },
                { de: "enforcement", tr: "denetim, uygulama", en: "enforcement" },
                { de: "implementation", tr: "hayata geçirme", en: "implementation" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-06-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Urho say about the campaign?",
              options: ["It failed entirely in its main aim", "It achieved a real improvement", "It was too short"],
              answer: 1,
              explain:
                "Urho bunu baştan söylüyor: «About sixty thousand of the worst properties were improved. That is a real number and I would do the eleven years again».",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-24",
              no: 24,
              ref: "d1",
              text: "What is the weakness of the rule?",
              options: ["The threshold is too low", "It applies only to newly built properties", "Nobody checks the properties"],
              answer: 2,
              explain:
                "«the rule measures a model, not a house … nobody has been inside». Eşik on bir yıl tartışılmış; sorun eşiğin düzeyinde değil, denetimin yokluğunda.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-25",
              no: 25,
              ref: "d1",
              text: "What does he say about the warning in 2016?",
              options: ["The warning was unwelcome to him", "Nobody made it", "It came from somebody in the government"],
              answer: 0,
              explain:
                "«Two people said it in a meeting in 2016 and I did not want to hear it», çünkü kampanya tam işlemeye başlamışken işi karmaşıklaştırıyordu. Uyarı yapılmış, dinlenmemiş.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-26",
              no: 26,
              ref: "d1",
              text: "What would he do differently?",
              options: ["Campaign for a higher standard", "Work on enforcement first", "Involve more organisations"],
              answer: 1,
              explain:
                "«I would spend the first year on enforcement and the last ten on the standard, which is the opposite of what we did». Standardın düzeyi değil, sıra değişecek.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-27",
              no: 27,
              ref: "d1",
              text: "What has surprised him?",
              options: ["How little the rule cost", "How many landlords complied straight away", "How completely the argument was won"],
              answer: 2,
              explain:
                "«Nobody now says that a cold rented flat is acceptable … it has simply gone». Şaşırtan şey tartışmanın hızla kapanması, üstelik uygulamanın kaybedilmesiyle birlikte.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-28",
              no: 28,
              ref: "d1",
              text: "What do people get wrong about campaigns?",
              options: ["They think persuading the public is the hard part", "They think campaigns like this are far too expensive", "They think results come quickly"],
              answer: 0,
              explain:
                "«They think the hard part is persuading the public. The public was persuaded in about four years». Asıl zor kısım kazandıktan sonraki on sekiz ay.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-29",
              no: 29,
              ref: "d1",
              text: "Who writes the details, according to Urho?",
              options: ["The organisations that funded the campaign", "The public", "The people who have not left"],
              answer: 2,
              explain:
                "«the details are written by whoever is still in the room», çünkü yardım edenlerin çoğu zafer sonrası dağılıyor. Fon verenler ve halk bu aşamada anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-06-h4-30",
              no: 30,
              ref: "d1",
              text: "What does he recommend?",
              options: ["Campaigning for at least eleven years", "Naming and paying somebody to read the rules", "Avoiding this kind of work unless you are paid"],
              answer: 1,
              explain:
                "Öğüt son cümlede: «deciding at the start who will read the regulations, and paying that person». Genel bir kural olarak bu işi önermiyor ama kaçınılmasını da söylemiyor.",
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
          id: "en-b2-06-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed energy in the home. Now write an essay for your teacher, answering this question: \"Should landlords be required to improve the properties they rent out?\" Use the two ideas below and add one idea of your own.\n\nIdeas: who pays for the work — what happens to the rent afterwards",
          promptTr:
            "İngilizce dersinde evlerde enerjiyi tartıştınız. Öğretmenin için bir deneme yaz: \"Ev sahipleri kiraya verdikleri konutları iyileştirmek zorunda tutulmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: işin parasını kim öder — sonrasında kiraya ne olur",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss who pays for the work.", tr: "İşin parasını kimin ödeyeceğini tartış." },
              { de: "Discuss what happens to the rent afterwards.", tr: "Sonrasında kiraya ne olacağını tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost everyone agrees that nobody should be cold in a rented flat. The disagreement begins as soon as somebody asks who writes the cheque.

The argument about payment is the weaker of the two, in my view. A landlord who improves a property keeps the asset, so the case for the owner paying is strong. What complicates it is that many small landlords own one flat and have no capital, and a rule that assumes deep pockets will simply push those properties out of the rental market.

The second question is harder. If the work raises the rent by more than it lowers the bill, the tenant has paid for an improvement they do not own. That is not a reason to do nothing, but it is a reason to tie the two figures together in the regulation.

My own view is that the missing element is enforcement. A standard that is modelled on paper rather than checked in the building rewards whoever fills in the form best.

Landlords should be required to improve, but only alongside inspection and a limit on the rent increase.`,
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
          id: "en-b2-06-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You write for a student website. Write a review of a product or a service you bought recently in order to save money or energy. Say what it does, what it does well, and who should not buy it. Write 140 to 190 words.",
          promptTr:
            "Bir öğrenci sitesi için yazıyorsun. Para ya da enerji tasarrufu için yakınlarda aldığın bir ürünün veya hizmetin değerlendirmesini yaz. Ne yaptığını, neyi iyi yaptığını ve kimin almaması gerektiğini söyle. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what it does.", tr: "Ne yaptığını söyle." },
              { de: "Say what it does well, with an example.", tr: "Neyi iyi yaptığını bir örnekle söyle." },
              { de: "Say who should not buy it, and why.", tr: "Kimin almaması gerektiğini ve nedenini söyle." },
            ],
            sample: `A plug meter is a small device that sits between a socket and an appliance and tells you exactly what that appliance costs to run. Mine cost fifteen pounds.

What it does well is settle arguments. For three years I had blamed the television for the winter bills. The meter showed that the television used about a pound a month and that the router, which is never switched off, used more than twice that. Neither number is large, and that is itself the useful finding.

It is not for everyone. If you live in a flat with electric heating, the meter will tell you what you already know, because the heating will be four fifths of the bill and there is nothing to plug it into. Anybody who rents and cannot change an appliance should also be careful: knowing the number and being unable to act on it is worse than not knowing.

For a homeowner deciding which machine to replace first, however, it is fifteen pounds well spent.`,
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
          id: "en-b2-06-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your home, bills and what you can and cannot change.",
          promptTr: "Sana evin, faturaların ve neyi değiştirip değiştiremediğin hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Could you describe the place where you live and how easy it is to heat?", tr: "Günaydın. Yaşadığın yeri ve ısıtmasının ne kadar kolay olduğunu anlatır mısın?" },
            { who: "you", hint: "Yeri somut anlat ve ısınmayla ilgili bir ayrıntı ver.", expect: "bir yeri betimlemek ve somut bir ayrıntı vermek", seconds: 45 },
            { who: "partner", de: "Thank you. Can you think of a time when you tried to save money on something and it did not work?", tr: "Teşekkürler. Bir şeyden tasarruf etmeye çalışıp işe yaramadığı bir anı hatırlıyor musun?" },
            { who: "you", hint: "Somut bir örnek ver ve nedenini çözümle.", expect: "somut bir örnek vermek ve kendi kararını çözümlemek", seconds: 45 },
            { who: "partner", de: "And how would you decide whether a saving is real or only looks real on paper?", tr: "Bir tasarrufun gerçek mi yoksa yalnız kâğıt üzerinde mi olduğuna nasıl karar verirdin?" },
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
              "I live on the top floor of a building from about 1960, which means good light and a flat that loses heat on three sides. Two winters ago I bought a small heater for one room, thinking I would heat less; the bill went up, because I stopped opening the door and the rest of the flat got damp instead. What makes me trust a saving now is whether somebody has measured the same house before and after, although I have to admit that almost nobody publishes that.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Somut bir örnek verildi mi, yoksa genel mi konuşuldu?",
              "Kendi kararı çözümlendi mi, yalnız anlatıldı mı?",
              "Öne sürülen ölçütün sınırı kabul edildi mi?",
            ],
          },
        },
        {
          id: "en-b2-06-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of reducing energy use in housing, say which is better and explain one problem with your choice: giving households advice and information, or setting a minimum standard for the buildings themselves.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Konutlarda enerji tüketimini azaltmanın şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: hanelere bilgi ve öğüt vermek mi, binalar için asgari bir standart koymak mı?",
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
              "Advice is cheap, quick and it respects the fact that people know their own lives. The difficulty is that it addresses the person who very often does not hold the decision: a tenant cannot insulate a wall, however well informed they are. A minimum standard reaches the building instead of the occupant, and the building is where most of the loss is. I would choose the standard. The problem with my own choice is enforcement: a standard that is modelled on paper rather than inspected rewards whoever completes the form best, and the worst properties are exactly the ones nobody visits. So the honest version of my position is that a standard is better only if somebody is paid to go inside.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (enforcement, occupant, however well informed)",
            ],
          },
        },
        {
          id: "en-b2-06-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A council has money for one measure to reduce energy use in rented flats. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir belediyenin kiralık dairelerde enerji tüketimini azaltmak için tek bir önleme parası var. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: free loft insulation for the worst properties, inspectors who actually enter the buildings, a leaflet in every letterbox, and a grant towards new boilers. Which of these would actually reduce the bills?", tr: "Fikirler: en kötü durumdaki konutlara ücretsiz çatı yalıtımı, gerçekten binaya giren denetçiler, her posta kutusuna bir broşür ve yeni kazanlar için hibe. Sence bunlardan hangisi faturaları gerçekten düşürür?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the inspectors. They repair nothing at all, and a budget spent on visits is a budget not spent on insulation. Is that not the worst possible use of the money?", tr: "Denetçileri sorgularım. Hiçbir şeyi onarmıyorlar ve ziyarete harcanan bütçe yalıtıma harcanmayan bütçedir. Bu paranın olabilecek en kötü kullanımı değil mi?" },
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
              "The strongest is free loft insulation, because it is the cheapest measure per pound saved and almost nothing has been done since the nineteen-eighties. You are right that inspectors repair nothing, and I want to concede that; what I would defend is a small number of them aimed only at the properties that claim a good rating without ever having been entered. The leaflet seems worse than the disease: it moves responsibility to the person who cannot act. So I would recommend the insulation and the targeted inspection, and reject the leaflet.",
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

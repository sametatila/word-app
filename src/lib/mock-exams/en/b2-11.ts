import type { MockPaper } from "../types";

/**
 * B2 · Deneme 11 — "Repair, Spare Parts and How Long Things Last".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Tamir B2 için verimli
 * çünkü tartışma ahlaki değil hesapsal: dört euroluk parçaya doksan euroluk
 * işçilik. Edilgen çatı, üçüncü tip koşul ve karşıtlık bağlaçları bu hesabın
 * doğal dili oluyor.
 *
 * Onuncu kâğıtta uzun görüş metni bir gazeteci denemesiydi. Burada bilerek
 * karşı taraf birinci tekil konuşuyor: mühürlü gövdeyi savunan bir tasarım
 * mühendisi, savını sonuna kadar götürüp kendi sınırını kendisi koyuyor.
 */
export const EN_B2_11: MockPaper = {
  id: "en-b2-11",
  course: "en",
  level: "B2",
  no: 11,
  theme: "Repair, Spare Parts and How Long Things Last",
  themeTr: "Tamir, yedek parça ve eşyanın ömrü",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. You read texts with gaps, sentences to rewrite, an article, a text with missing sentences and four short texts.",
      instructionTr:
        "Bu bölümde yedi görev var. Boşluklu metinler, yeniden yazılacak cümleler, bir yazı, cümlesi eksik bir metin ve dört kısa metin okuyacaksın.",
      tasks: [
        {
          id: "en-b2-11-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer a, b, c or d best fits each gap, 1 to 6.",
          promptTr: "Metni oku ve 1–6. boşluklara a, b, c ya da d şıklarından hangisinin en iyi uyduğuna karar ver.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Feature article",
              genreTr: "İnceleme yazısı",
              title: "Four euros and ninety euros",
              body: `A washing machine that fails in its seventh year has not necessarily been {{1}} made.

The component that has failed may cost four euros. Reaching it may take three hours, because the motor is bonded into the drum and the drum is not designed to be opened. The bill is therefore ninety-four euros, of which four are the part.

Faced with that arithmetic, most households buy a new machine, and the decision is entirely {{2}}. It is also, in aggregate, a disaster, and no individual household is doing anything wrong.

The manufacturer is not {{3}} to keep spare parts once a model has been discontinued, and most stop within a few years. A design decision taken in one country therefore {{4}} the lifespan of a machine standing in another.

Defenders of the sealed drum point out that it is quieter, lighter and cheaper to make, and all three claims are true. The question is not whether sealing gains anything. It is whether the gain has ever been {{5}} against what it costs at the other end of the machine's life.

That comparison is difficult to make, which is not the same as impossible, and the difficulty has been allowed to stand {{6}} an answer for thirty years.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-11-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["hardly", "rarely", "badly", "lowly"],
              answer: 2,
              explain:
                "`badly made` yerleşik bir eş dizim ve cümle kötü üretimi reddediyor. `hardly made` ile `rarely made` sıklık bildirir, `lowly` ise nitelik zarfı olarak bu konumda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["rational", "reasonable", "logical", "sensible"],
              answer: 0,
              explain:
                "Paragraf tek tek doğru olan kararın toplamda felaket olduğunu söylüyor; iktisatta bu ayrımın adı `rational`dır. Öteki üçü yakın anlamlı ama toplam-birey karşıtlığını taşımaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["forced", "obliged", "demanded", "required"],
              answer: 1,
              explain:
                "`be obliged to + fiil` bir yükümlülüğün bulunmadığını bildirir. `required` edilgen kuruluşta `to` alır ama burada `not required to keep` biçimi anlamı zayıflatır; `demanded` özneyi kişi olarak istemez, `forced` ise zorlamayı bildirir.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["solves", "fixes", "handles", "settles"],
              answer: 3,
              explain:
                "Cümle bir ülkede alınan kararın başka bir ülkedeki makinenin ömrünü belirlediğini söylüyor: `settles the lifespan`. `solves` bir sorunu çözmek, `fixes` onarmak, `handles` ise ele almaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["weighed", "measured", "counted", "valued"],
              answer: 0,
              explain:
                "`weigh something against something` iki tarafı karşılaştırmayı anlatır ve cümlede `against` var. `measured against` ölçüt bildirir, `counted` ile `valued` bu edatı bu anlamda almaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["beyond", "without", "outside", "besides"],
              answer: 1,
              explain:
                "Güçlüğün otuz yıldır cevapsız bırakıldığı söyleniyor: `to stand without an answer`. `beyond` ve `outside` yer ya da sınır bildirir, `besides` ise ekleme yapar.",
            },
          ],
        },
        {
          id: "en-b2-11-l2",
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
              title: "Who decides how long a machine lasts",
              body: `The lifespan of an appliance is usually discussed as though it were a property of the object, {{7}} it is a property of a decision.

Nothing wears out on a fixed date. A machine stops working when a part fails, and it stops existing when somebody decides {{8}} to replace that part.

Nor {{9}} that decision made by the owner alone. It is made jointly by whoever set the price of the part, whoever designed the joint that has to be opened, and whoever stopped producing the part in the first place.

{{10}} the owner sees is a bill. The three decisions behind it were taken years earlier by people who will never meet the machine.

Manufacturers reply, reasonably enough, {{11}} they are not charities and that nobody is prevented from choosing a repairable model.

The difficulty with that reply is that repairability is not printed on the box, {{12}} is it discoverable before purchase by any means available to an ordinary buyer.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-11-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["whereas"],
              explain:
                "İki yarı arasında karşıtlık var: nesnenin niteliği sanılan şey aslında bir kararın niteliği. `whereas` bu karşıtlığı kurar; `because` gerekçe verirdi.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["not"],
              explain:
                "Makine, biri parçayı değiştirmemeye karar verdiğinde var olmayı bırakıyor: `decides not to replace`. Mastar öncesi olumsuzluk `not` ile kurulur.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "`Nor` ile başlayan cümle devrik kuruluş ister ve edilgen çatının yardımcı fiili özneden önce gelir: «Nor is that decision made by the owner alone».",
            },
            {
              kind: "gap",
              id: "en-b2-11-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["what"],
              explain:
                "Cümlenin öznesi bir ad tümcesi: «What the owner sees is a bill». `That` öncül isterdi, `which` ise özneyi kuramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["that"],
              explain:
                "`reply that …` yapısı bir yan tümce başlatır ve ikinci yarı da `and that nobody is prevented` ile aynı bağlacı yineliyor.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["nor"],
              explain:
                "Olumsuz bir cümleye ikinci bir olumsuz yargı ekleniyor ve devrik kuruluş sürüyor: «nor is it discoverable». `neither` de devrik alır ama önceki `not` ile eşleşen biçim `nor`dur.",
            },
          ],
        },
        {
          id: "en-b2-11-l3",
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
              title: "Repairability",
              body: `Repairability describes how easily a product can be returned to working order after a component fails, and it is distinct from {{13}}, which describes how long the product works before it fails at all.

A repair is described as {{14}} when the cost of carrying it out approaches or exceeds the price of a replacement unit.

The {{15}} of a product into bonded rather than fastened joints reduces cost and weight while placing several components beyond reach.

Manufacturers are under no general {{16}} to supply components once production has ended, and the period for which they do so varies widely between sectors.

Independent testing bodies publish {{17}} scores for domestic appliances, although these are based on repair data rather than on failure rates.

Proposals for a repairability label have been discussed since the nineteen nineties; the main {{18}} raised against them concerns who would verify the figures.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-11-l3-13",
              no: 13,
              text: "DURABLE",
              accept: ["durability"],
              explain:
                "`distinct from ___` bir ad ister ve cümle ürünün ne kadar dayandığını tanımlıyor. Sıfat `durable` bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l3-14",
              no: 14,
              text: "ECONOMY",
              accept: ["uneconomic", "uneconomical"],
              explain:
                "Maliyet yenisinin fiyatına yaklaşınca tamir ekonomik olmaktan çıkar; `described as` bir sıfat ister ve olumsuzluk ön ekle kurulur.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l3-15",
              no: 15,
              text: "ASSEMBLE",
              accept: ["assembly"],
              explain:
                "`The ___ of a product into … joints` bir ad ister ve parçaların birleştirilme biçimi anlatılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l3-16",
              no: 16,
              text: "OBLIGE",
              accept: ["obligation"],
              explain:
                "`under no general ___ to supply` yapısı ad ister; `obliged` sıfat olarak `under` ile kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l3-17",
              no: 17,
              text: "RELY",
              accept: ["reliability"],
              explain:
                "`publish ___ scores` ad ister ve ölçülen şey ürünün güvenilirliği. Sıfat `reliable` puanın adını vermez.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l3-18",
              no: 18,
              text: "OBJECT",
              accept: ["objection"],
              explain:
                "`the main ___ raised against them` yapısı ad ister ve ileri sürülen şey bir itiraz. `objective` amaç demektir ve `raised against` ile birleşmez.",
            },
          ],
        },
        {
          id: "en-b2-11-l4",
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
              id: "en-b2-11-l4-19",
              no: 19,
              text: "Manufacturers do not have to keep spare parts after a model ends.\nThere ______ on manufacturers to keep spare parts after a model ends.",
              cue: "OBLIGATION",
              accept: ["is no obligation"],
              explain:
                "Yükümlülüğün yokluğu `There is no obligation on somebody to do something` kalıbıyla bildiriliyor; anahtar sözcük ad olduğu için olumsuzluk `no` ile kurulur.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l4-20",
              no: 20,
              text: "They did not tell us that the motor was bonded into the drum.\nAt no point ______ that the motor was bonded into the drum.",
              cue: "WERE",
              accept: ["were we told"],
              explain:
                "`At no point` gibi olumsuz bir öbek cümle başına gelince devrik kuruluş zorunludur: yardımcı fiil özneden önce gelir ve yapı edilgen kalır.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l4-21",
              no: 21,
              text: "The repair would have been quick if the drum had been held by screws.\nHad the drum been held by screws, the repair ______ quick.",
              cue: "BEEN",
              accept: ["would have been"],
              explain:
                "Üçüncü tip koşulun sonuç yarısı `would have + üçüncü hâl` ister; koşul yarısı `Had` ile devrik kurulduğu için `if` düşer.",
            },
            {
              kind: "gap",
              id: "en-b2-11-l4-22",
              no: 22,
              text: "It is now four years since the company stopped producing this model.\nThis model ______ four years ago.",
              cue: "DISCONTINUED",
              accept: ["was discontinued"],
              explain:
                "`It is four years since …` yapısı `four years ago` ile geçmişe çevriliyor ve eylemi yapan silindiği için çatı edilgen olur.",
            },
          ],
        },
        {
          id: "en-b2-11-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and answer questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı oku ve 23–27. maddeleri yanıtla. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Opinion piece",
              genreTr: "Görüş yazısı",
              title: "I designed the drum you cannot open",
              body: `I have spent nineteen years designing washing machines, and I have signed off the sealed drum that repair campaigners use as their standard example. I would like to make the case for it properly before I concede what I am going to concede.

Bonding the motor into the drum was not a trick. It removed a joint, and a joint is where noise, leaks and warranty claims begin. The machine got quieter, lighter and about eleven per cent cheaper to build, and every one of those gains reached the customer. The cost I am accused of imposing, whereas that one arrives seven years later, is paid by somebody who has forgotten which model they bought.

That last clause is the whole problem, and I am not going to pretend otherwise. Given that the gain is immediate and the cost is deferred, no competitive process will ever weigh the two honestly. A designer who added the joint back would produce a machine that is louder and dearer on the shop floor and better in its seventh year, and the shop floor is where machines are chosen.

So the criticism I accept is not that the sealed drum is bad engineering. It is that the decision was made in a market that cannot see year seven, and I was paid to design for the market that exists.

What I reject is the story in which somebody in my industry sat down and planned for the machine to fail. Nobody did. If we had wanted the machine to fail, we would have made it noisier and cheaper still, and we did the opposite for reasons that were commercial rather than noble.

The remedy is not moral instruction aimed at designers. It is a rule that makes year seven visible at the point of sale: a published repair cost, verified by somebody who does not sell machines. Give me that number on the label and I will design against it within one product cycle, because that is what I have always designed against.`,
              gloss: [
                { de: "to bond", tr: "yapıştırarak birleştirmek", en: "bond" },
                { de: "deferred", tr: "ertelenmiş", en: "deferred" },
                { de: "a product cycle", tr: "ürün döngüsü", en: "product cycle" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-11-l5-23",
              no: 23,
              text: "Why does the writer say the drum was sealed?",
              options: [
                "To shorten the working life of the machine",
                "Because a joint is a source of faults",
                "Because the factory equipment demanded it",
                "To make the machine harder for rivals to copy",
              ],
              answer: 1,
              explain:
                "Yazar gerekçeyi teknik olarak veriyor: «a joint is where noise, leaks and warranty claims begin», ve kazançları üç maddede sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l5-24",
              no: 24,
              text: "What does he identify as the central difficulty?",
              options: [
                "Repair costs are impossible to calculate at all",
                "Customers do not read the label at the point of sale",
                "Campaigners have chosen an unfair example to use",
                "Benefit now, payment in year seven",
              ],
              answer: 3,
              explain:
                "Yazar sorunu kendisi adlandırıyor: «the gain is immediate and the cost is deferred», ve bu yüzden rekabetin ikisini dürüstçe tartamayacağını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l5-25",
              no: 25,
              text: "What criticism does he accept?",
              options: [
                "That year seven was invisible when he designed",
                "That the sealed drum was bad engineering",
                "That he ignored the warnings of his colleagues",
                "That the eleven per cent saving was exaggerated",
              ],
              answer: 0,
              explain:
                "Yazar kabul ettiği eleştiriyi sınırlıyor: kötü mühendislik değil, «the decision was made in a market that cannot see year seven».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l5-26",
              no: 26,
              text: "How does he answer the claim that failure was planned?",
              options: [
                "He says the evidence for it has never been published",
                "He says such a plan would have produced a worse machine",
                "He says the decision was taken above his own level",
                "He accepts that some firms in the sector have done it",
              ],
              answer: 1,
              explain:
                "Yazar varsayımı tersine çeviriyor: «If we had wanted the machine to fail, we would have made it noisier and cheaper still», oysa tam tersi yapılmış.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-l5-27",
              no: 27,
              text: "What remedy does he propose?",
              options: [
                "Training courses in ethics for design engineers",
                "A legal minimum lifespan for domestic appliances",
                "A verified repair cost shown when the machine is sold",
                "A tax on models whose parts are no longer produced",
              ],
              answer: 2,
              explain:
                "Yazar çareyi somutluyor: «a published repair cost, verified by somebody who does not sell machines», ve ahlaki öğüdü açıkça reddediyor.",
            },
          ],
        },
        {
          id: "en-b2-11-l6",
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
              genreTr: "İnceleme yazısı",
              title: "The part that costs four euros",
              body: `The most misleading number in this argument is the price of the component. {{28}}

A four-euro part sounds like an accusation on its own, and it is not one. The four euros buys a moulded plastic piece; the ninety buys the three hours needed to reach it, and those hours are worked by somebody who has to be paid properly. {{29}}

The interesting question is what determines the three hours, and the answer is almost never the difficulty of the fault. It is the order in which the machine was put together. {{30}}

This is why repairability cannot be improved at the repair stage. By the time a machine reaches a workshop, every decision that matters has already been taken, and the person holding the screwdriver is working inside somebody else's finished argument. {{31}}

None of which makes the four-euro figure useless. It is the clearest short way of saying that the failure was small and the consequence was total, and that is worth a sentence in any conversation about waste.`,
              gloss: [
                { de: "moulded", tr: "kalıplanmış", en: "moulded" },
                { de: "a workshop", tr: "atölye", en: "workshop" },
                { de: "an accusation", tr: "suçlama", en: "accusation" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "A machine assembled so that the motor goes in first can only be opened by undoing everything that went in after it." },
            { key: "b", label: "b", body: "It is quoted in every campaign, it is entirely accurate, and it explains almost nothing on its own." },
            { key: "c", label: "c", body: "The design stage is the only point at which the three hours can be turned into thirty minutes." },
            { key: "d", label: "d", body: "Nobody is overcharging for labour here; the labour is genuinely there and somebody genuinely does it." },
            { key: "e", label: "e", body: "The first domestic washing machines sold in Europe weighed more than ninety kilograms." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-11-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "b",
              explain:
                "Açılış rakamı yanıltıcı diye niteliyor: «The most misleading number in this argument is the price of the component». (b) bu nitelemeyi açıyor: doğru ama tek başına hiçbir şey açıklamıyor.",
            },
            {
              kind: "match",
              id: "en-b2-11-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "d",
              explain:
                "Paragraf emeğin gerçekliğini vurguluyor: «those hours are worked by somebody who has to be paid properly». (d) fahiş fiyat suçlamasını kapatıyor: kimse fazla almıyor, iş gerçekten yapılıyor.",
            },
            {
              kind: "match",
              id: "en-b2-11-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "a",
              explain:
                "Paragraf belirleyeni adlandırıyor: «It is the order in which the machine was put together». (a) bunu somutluyor: motor ilk giriyorsa ondan sonra girenlerin hepsi sökülüyor.",
            },
            {
              kind: "match",
              id: "en-b2-11-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "c",
              explain:
                "Paragraf atölyenin geç kaldığını söylüyor: «every decision that matters has already been taken». (c) sonucu veriyor: üç saati yarım saate indirebilecek tek aşama tasarım. (e) ilk çamaşır makinelerinin ağırlığından söz ediyor ve metinde ağırlık tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-11-l7",
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
              label: "a — Repair café volunteer",
              body: "We mend about sixty things a month and we turn away perhaps twenty. What we turn away is almost never beyond us technically. It is sealed, or the part stopped being made in 2019, and no amount of skill in this room changes either of those facts.",
            },
            {
              key: "b",
              label: "b — Design engineer",
              body: "Every gain from sealing the drum reached the buyer on the day of purchase, and the cost arrives in year seven. No market can weigh those two things against each other. Put a verified repair figure on the label and I will design against it, because a number on a label is what I have always designed against.",
            },
            {
              key: "c",
              label: "c — Economist",
              body: "Households are behaving perfectly sensibly when they replace rather than repair, and that is precisely the difficulty. A pattern of individually correct choices is producing an outcome nobody chose, which is not a moral failure and cannot be fixed by telling people to try harder.",
            },
            {
              key: "d",
              label: "d — Consumer body lawyer",
              body: "Guarantees are the wrong instrument and they always were. A two-year guarantee tells you nothing about year seven, and extending it to five would simply move the cliff. What we should be arguing about is whether the part exists at all in year seven, which is a supply question rather than a legal one.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-11-l7-32",
              no: 32,
              text: "Which text says that the obstacle is not a lack of skill?",
              answer: "a",
              explain:
                "(a) engeli teknik olmaktan çıkarıyor: «It is sealed, or the part stopped being made in 2019, and no amount of skill in this room changes either of those facts».",
            },
            {
              kind: "match",
              id: "en-b2-11-l7-33",
              no: 33,
              text: "Which text says that sensible individual choices add up to a bad result?",
              answer: "c",
              explain:
                "(c) toplamı adlandırıyor: «A pattern of individually correct choices is producing an outcome nobody chose».",
            },
            {
              kind: "match",
              id: "en-b2-11-l7-34",
              no: 34,
              text: "Which text says that a longer guarantee would not solve the problem?",
              answer: "d",
              explain:
                "(d) süre uzatmayı reddediyor: «extending it to five would simply move the cliff», çünkü sorun parçanın var olup olmadığı.",
            },
            {
              kind: "match",
              id: "en-b2-11-l7-35",
              no: 35,
              text: "Which text says that the writer would respond to a published figure?",
              answer: "b",
              explain:
                "(b) koşulu açıkça koyuyor: «Put a verified repair figure on the label and I will design against it».",
            },
            {
              kind: "match",
              id: "en-b2-11-l7-36",
              no: 36,
              text: "Which text gives a number for the work it cannot take on?",
              answer: "a",
              explain:
                "(a) iki sayıyı da veriyor: «We mend about sixty things a month and we turn away perhaps twenty».",
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
        "This part has four tasks. You hear extracts, some information, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Parçalar, bir bilgilendirme, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-11-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c for questions 1 to 8. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. 1–8. maddeler için a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In a workshop",
              genreTr: "Atölyede",
              situation: "Bir tamirci müşteriye fiyatı açıklıyor.",
              plays: 2,
              segments: [
                { text: "The part is four euros and I will not pretend otherwise. What you are paying for is three hours of getting to it, because the motor went into that drum before anything else did. If you want, I can show you the machine open." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri yedek parça soruyor.",
              plays: 2,
              segments: [
                { text: "Do you still supply the pump for this model?" },
                { text: "The model was discontinued four years ago. We hold parts for five years after that, so you are inside it, but only just." },
                { text: "And after next year?" },
                { text: "After next year nobody makes it. Not us and not anybody else." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir mühendis mühürlü gövdeyi savunuyor.",
              plays: 2,
              segments: [
                { text: "Sealing the drum removed a joint, and a joint is where the leaks start. The machine got quieter and cheaper and the customer got all of that on day one. I am not going to stand here and say it was a trick, because it was not." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Repair café",
              genreTr: "Tamir kafesi",
              situation: "Bir gönüllü ne yapabildiklerini anlatıyor.",
              plays: 2,
              segments: [
                { text: "People assume we send things away because they are too difficult. Almost nothing is too difficult. It is sealed, or the part has not been made since 2019, and there is no skill in this room that gets round either of those." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Between colleagues",
              genreTr: "Meslektaşlar arasında",
              situation: "İki kişi bir öneriyi tartışıyor.",
              plays: 2,
              segments: [
                { text: "So we extend the guarantee to five years." },
                { text: "And in year six the same person has the same bill, and we have congratulated ourselves for a year." },
                { text: "It is better than nothing." },
                { text: "It moves the edge. It does not remove it, and the argument we should be having is about whether the part still exists." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Lecture",
              genreTr: "Ders",
              situation: "Bir iktisatçı toplam sonucu anlatıyor.",
              plays: 2,
              segments: [
                { text: "Every household in this example is behaving correctly. Ninety-four euros against a new machine at three hundred, with a guarantee: replacing is the right call. And the sum of all those right calls is the outcome we are complaining about." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir belediye görevlisi yeni hizmeti duyuruyor.",
              plays: 2,
              segments: [
                { text: "From October the workshop will take two items per person rather than one, and the charge stays at twelve euros. What we cannot do is hold stock. If your part has to be ordered, expect ten days, and we will not start work until it is here." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı etiket önerisini ele alıyor.",
              plays: 2,
              segments: [
                { text: "A repairability label sounds like paperwork and it is the only proposal here that changes a decision at the moment it is taken. Everything else in this debate arrives after the machine has been bought, which is to say after it is too late to matter." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-11-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the repairer explain?",
              options: ["The part has become expensive to buy", "The labour is what the bill is for", "The machine cannot be opened at all"],
              answer: 1,
              explain:
                "Tamirci ikisini ayırıyor: «The part is four euros», ödenen şey «three hours of getting to it».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the assistant say about the pump?",
              options: ["It has never been supplied by them", "It can be ordered from another firm in the city", "It will stop being available next year"],
              answer: 2,
              explain:
                "Görevli süreyi hesaplıyor: model dört yıl önce bırakılmış, parça beş yıl tutuluyor, «After next year nobody makes it».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the engineer's position?",
              options: ["The decision brought real benefits", "The decision was taken above him by the board", "The criticism is entirely unfair"],
              answer: 0,
              explain:
                "Mühendis kazançları sayıyor: «The machine got quieter and cheaper and the customer got all of that on day one».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the volunteer say about the work they refuse?",
              options: ["It is rarely beyond their skill", "It would take far too many working hours", "It is usually electrical work"],
              answer: 0,
              explain:
                "Gönüllü varsayımı düzeltiyor: «Almost nothing is too difficult», engel mühürlü gövde ya da üretilmeyen parça.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the second speaker's objection?",
              options: ["Five years is legally impossible for us", "Guarantees are too costly for small firms", "The guarantee only moves the problem"],
              answer: 2,
              explain:
                "Konuşmacı sınırı adlandırıyor: «It moves the edge. It does not remove it», ve asıl sorunun parçanın varlığı olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the economist's point?",
              options: ["Correct choices produce a bad total", "Households miscalculate the cost of repair", "New machines are badly priced"],
              answer: 0,
              explain:
                "İktisatçı hesabı verip toplamı adlandırıyor: «the sum of all those right calls is the outcome we are complaining about».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-7",
              no: 7,
              ref: "a7",
              text: "What is changing in October?",
              options: ["The charge for each repair", "The number of items accepted", "The opening hours of the workshop"],
              answer: 1,
              explain:
                "Duyuru değişikliği veriyor: «two items per person rather than one», ücret ise on iki euroda kalıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h1-8",
              no: 8,
              ref: "a8",
              text: "Why does the speaker support the label?",
              options: ["It costs the industry very little", "It acts before the machine is bought", "It has worked in other sectors and countries"],
              answer: 1,
              explain:
                "Konuşmacı zamanlamayı öne çıkarıyor: öteki öneriler «after the machine has been bought», etiket ise kararın alındığı anda etkili.",
            },
          ],
        },
        {
          id: "en-b2-11-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a council repair workshop. Complete the notes, questions 9 to 16. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Belediyenin tamir atölyesi hakkında bilgi dinleyeceksin. 9–16. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli atölyeyi anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The workshop runs on Wednesdays, from two until seven, in the basement of the old library. The charge is twelve euros for each item, whatever it is, and from October you may bring two items rather than one. We do not take heaters, for insurance reasons, and that is the only category we refuse outright. If a part has to be ordered, allow ten days; we do not start work before it arrives. Everything we mend carries three months of cover, and you should bring the model number rather than the receipt, because the number is what we search on.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Council repair workshop — notes",
              body: `Day:                    {{9}}
Closes at:              {{10}}
Located in the:         {{11}}
Charge per item:        {{12}} euros
From October you may bring {{13}} items
Not accepted:           {{14}}
Ordered parts take:     {{15}} days
Bring the {{16}} number`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-11-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["wednesday", "wednesdays"],
              explain:
                "Kayıt günü veriyor: «The workshop runs on Wednesdays, from two until seven». Ekim, kural değişikliğinin ayı.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["7", "seven"],
              explain:
                "Kayıt iki saati birlikte veriyor: «from two until seven». Not kâğıdı kapanışı soruyor, dolayısıyla yedi; iki ise açılış saatidir ve satırın sorduğu şey değildir.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["basement"],
              explain:
                "«in the basement of the old library» — atölyenin yeri. Kütüphane binanın adı, kat değil.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["12", "twelve"],
              explain:
                "«The charge is twelve euros for each item, whatever it is» — parça başına ücret.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["2", "two"],
              explain:
                "«from October you may bring two items rather than one» — yeni üst sınır. Bir, eski sınır.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["heaters", "heater"],
              explain:
                "«We do not take heaters, for insurance reasons, and that is the only category we refuse outright» — kabul edilmeyen tek tür.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["10", "ten"],
              explain:
                "«If a part has to be ordered, allow ten days» — sipariş süresi. Üç ay, tamirin güvence süresi.",
            },
            {
              kind: "gap",
              id: "en-b2-11-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["model"],
              explain:
                "«bring the model number rather than the receipt, because the number is what we search on» — getirilecek bilgi.",
            },
          ],
        },
        {
          id: "en-b2-11-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about repairing household machines, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Ev aletlerinin tamiri üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The obstacle is the design, not the fault." },
            { key: "b", label: "The speaker has stopped giving one piece of advice." },
            { key: "c", label: "A longer guarantee would change little." },
            { key: "d", label: "The saving from the design reached the buyer." },
            { key: "e", label: "The price of the part misleads people." },
            { key: "f", label: "Nobody in the industry planned for failure." },
            { key: "g", label: "Repair should be free for older customers." },
            { key: "h", label: "The problem is that parts stop being made." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı dört euroluk parçayı anlatıyor.",
              plays: 2,
              segments: [
                { text: "Everybody quotes the four euros, and the four euros is true, and it puts the argument in the wrong place. It sounds like somebody is overcharging. Nobody is. The ninety is three hours of work that genuinely has to be done." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı atölyede karşılaştığı engeli anlatıyor.",
              plays: 2,
              segments: [
                { text: "I can fix almost any fault you bring me. What I cannot do is get into a drum that was bonded shut in a factory. The fault is easy and the machine is closed, and those are two different problems." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı tasarım kararını savunuyor.",
              plays: 2,
              segments: [
                { text: "Removing that joint made the machine eleven per cent cheaper to build, and the whole of that reached the shop price. People bought a better machine for less money. That is not nothing and it is usually left out." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı önerilen çözümü değerlendiriyor.",
              plays: 2,
              segments: [
                { text: "Two years, five years, seven years: it is the same instrument with a different number on it. The bill still lands the day after it expires, and we spend the whole debate arguing about where to draw a line instead of about supply." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı verdiği öğüdü değiştirdiğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "For years I told people to buy the more expensive model because it would last. I have stopped saying it. Price and repairability turned out to have almost no relation, and I was giving advice I could not support." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı parça tedarikini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The machine is fine, the fault is small and the pump has not been manufactured since 2019. There is nothing clever left to try at that point. The object is finished because a production line somewhere closed." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-11-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "e",
              explain:
                "Birinci konuşmacı rakamın etkisini anlatıyor: «It sounds like somebody is overcharging. Nobody is», yani dört euro tartışmayı yanlış yere koyuyor.",
            },
            {
              kind: "match",
              id: "en-b2-11-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "İkinci konuşmacı ikisini ayırıyor: «The fault is easy and the machine is closed, and those are two different problems».",
            },
            {
              kind: "match",
              id: "en-b2-11-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "d",
              explain:
                "Üçüncü konuşmacı kazancın nereye gittiğini söylüyor: «the whole of that reached the shop price».",
            },
            {
              kind: "match",
              id: "en-b2-11-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Dördüncü konuşmacı süreyi uzatmayı boş buluyor: «it is the same instrument with a different number on it», fatura yine ertesi gün geliyor.",
            },
            {
              kind: "match",
              id: "en-b2-11-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Beşinci konuşmacı öğüdünü bıraktığını söylüyor: «I have stopped saying it», çünkü fiyatla tamir edilebilirlik arasında ilişki çıkmamış.",
            },
            {
              kind: "match",
              id: "en-b2-11-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "h",
              explain:
                "Altıncı konuşmacı tıkanmayı tedariğe bağlıyor: «the pump has not been manufactured since 2019» ve «a production line somewhere closed».",
            },
          ],
        },
        {
          id: "en-b2-11-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who manages a spare parts warehouse. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Yedek parça deposu yöneten bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, yedek parça deposu yöneten Vida ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You hold parts for machines that are no longer made. How long do you keep them?" },
                { text: "Five years after a model is discontinued, which is longer than the law asks for and shorter than the machines last. That sentence is the whole industry in one line." },
                { text: "Why five?" },
                { text: "Because a shelf costs money every day and a part earns nothing until somebody asks for it. Nobody chose five for an engineering reason. It came out of a warehouse budget." },
                { text: "Could you hold them longer?" },
                { text: "We could, and the cost is not the storage. It is the guessing. I have to decide today how many pumps I will be asked for in 2032, and if I guess high I have paid to keep metal that gets scrapped." },
                { text: "What about making parts to order?" },
                { text: "That is the honest answer and it is slow. The tooling for a small plastic component costs more than the whole run of parts is worth, so it only works if several manufacturers share it, and they do not." },
                { text: "Do customers understand any of this?" },
                { text: "They understand it perfectly once you tell them. What they cannot do is find it out beforehand. Nobody has ever been shown a parts availability figure at the moment they were buying a machine." },
                { text: "Would a label change your job?" },
                { text: "It would change it completely, and I would welcome that, because at the moment the demand for my shelves is invisible until it arrives. A label makes it a number I can plan against." },
                { text: "And the criticism that firms want machines to fail?" },
                { text: "I have worked in this trade for twenty-two years and I have never seen that decision taken. What I have seen is nobody in the room whose job it is to speak for year seven, which produces the same result and is much harder to be angry about." },
                { text: "What would you change tomorrow?" },
                { text: "One thing. Make the discontinuation date public. Not the parts, not the price, just the date, because everything else in this argument can be worked out from it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-11-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Vida say about the five-year period?",
              options: ["It is shorter than the machines last", "It is set by European law for all appliances", "It is longer than customers need"],
              answer: 0,
              explain:
                "Vida iki ucu birden veriyor: «longer than the law asks for and shorter than the machines last».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-24",
              no: 24,
              ref: "d1",
              text: "Where does the five-year figure come from?",
              options: ["A test of how long parts survive", "A warehouse budget, not engineering", "An agreement between the manufacturers"],
              answer: 1,
              explain:
                "Vida kaynağı açıkça söylüyor: «Nobody chose five for an engineering reason. It came out of a warehouse budget».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-25",
              no: 25,
              ref: "d1",
              text: "What makes holding parts for longer difficult?",
              options: ["The shelves are already full", "The parts deteriorate on the shelf", "Predicting future demand"],
              answer: 2,
              explain:
                "Vida maliyeti depolamadan ayırıyor: «It is the guessing», çünkü 2032'de kaç pompa isteneceğine bugünden karar vermek gerekiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-26",
              no: 26,
              ref: "d1",
              text: "Why is making parts to order not the answer?",
              options: ["The tooling costs more than the parts", "The quality would be much lower", "No factory will accept such small orders"],
              answer: 0,
              explain:
                "Vida hesabı veriyor: «The tooling for a small plastic component costs more than the whole run of parts is worth».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-27",
              no: 27,
              ref: "d1",
              text: "What does she say about customers?",
              options: ["They rarely accept the explanation given", "They ask for parts too late", "They cannot learn this before buying"],
              answer: 2,
              explain:
                "Vida anlamayı ayırıyor: «They understand it perfectly once you tell them», sorun satın alma anında bu bilgiye ulaşılamaması.",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-28",
              no: 28,
              ref: "d1",
              text: "Why would she welcome a label?",
              options: ["It would raise the price of parts", "It would reduce her workload", "It would let her plan for demand"],
              answer: 2,
              explain:
                "Vida gerekçeyi veriyor: talep şu anda görünmez, «A label makes it a number I can plan against».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-29",
              no: 29,
              ref: "d1",
              text: "How does she answer the claim about planned failure?",
              options: ["She says nobody speaks for year seven", "She says it happens in other sectors instead", "She says the evidence is being hidden"],
              answer: 0,
              explain:
                "Vida yirmi iki yılda böyle bir karar görmediğini söylüyor: «nobody in the room whose job it is to speak for year seven, which produces the same result».",
            },
            {
              kind: "mcq",
              id: "en-b2-11-h4-30",
              no: 30,
              ref: "d1",
              text: "What single change would she make?",
              options: ["A longer legal guarantee", "Publishing the discontinuation date", "A shared warehouse for the whole sector"],
              answer: 1,
              explain:
                "Vida tek şey istiyor: «Make the discontinuation date public. Not the parts, not the price, just the date».",
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
          id: "en-b2-11-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed why household machines are replaced rather than repaired. Now write an essay for your teacher, answering this question: \"Should manufacturers be required to supply spare parts for ten years?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what the requirement would cost — what buyers can find out before they buy",
          promptTr:
            "İngilizce dersinde ev aletlerinin neden tamir edilmeyip değiştirildiğini tartıştınız. Öğretmenin için bir deneme yaz: \"Üreticiler on yıl boyunca yedek parça sağlamak zorunda bırakılmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: bu zorunluluğun maliyeti — alıcının satın almadan önce öğrenebildikleri",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what the requirement would cost.", tr: "Zorunluluğun maliyetini tartış." },
              { de: "Discuss what buyers can find out before they buy.", tr: "Alıcının satın almadan önce ne öğrenebildiğini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `A four-euro component can end the life of a machine that works in every other respect, and that fact is what makes the ten-year proposal attractive. The question is whether a requirement is the instrument that fixes it.

The cost is real and it is not mainly storage. A warehouse has to decide today how many pumps will be wanted in 2034, and a wrong guess is paid for in metal that is eventually scrapped. That cost would be added to the price of every machine, including those of buyers who replace theirs after five years anyway.

What is much harder to defend is the position of the buyer. Repairability is not printed on the box, and no ordinary purchaser can discover before paying whether the parts will exist. A market cannot reward a decision that nobody is able to see.

My own view is that the two problems have been confused. Supply is expensive; information is cheap.

I would therefore require the discontinuation date and a verified repair cost to be published, and let ten-year supply follow from demand rather than from law.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Maliyet tarafı ciddiye alındı mı, yoksa geçiştirildi mi?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (whereas, including, rather than)",
              "140–190 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-b2-11-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You paid for a repair that failed twice, and the shop has now told you the part is no longer produced. Write a letter to the company that made the machine. Set out what happened, say what you want and what you do not want, and say what you will do if there is no reply. Write 140 to 190 words.",
          promptTr:
            "Bir tamir için ödeme yaptın, tamir iki kez tutmadı ve dükkân şimdi parçanın artık üretilmediğini söyledi. Makineyi üreten şirkete bir mektup yaz. Olanları anlat, ne istediğini ve ne istemediğini söyle, yanıt gelmezse ne yapacağını belirt. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Set out what happened, with dates and amounts.", tr: "Olanları tarih ve tutarlarla anlat." },
              { de: "Say what you want and what you do not want.", tr: "Ne istediğini ve ne istemediğini söyle." },
              { de: "Say what you will do if there is no reply.", tr: "Yanıt gelmezse ne yapacağını söyle." },
            ],
            sample: `Dear Sir or Madam,

I bought your model 4120 in March 2019. It failed in June, was repaired at a cost of ninety-four euros, failed again in August and has now been declared unrepairable because the pump is no longer produced.

I want to be exact about my complaint, because I am not making the one you may expect. I am not claiming that the machine was badly built; it ran for six years without a fault, which is more than some. Nor am I asking you to replace it free of charge.

What I am asking for is the ninety-four euros, on the ground that the repair was sold to me as a repair while your own parts supply was already closing. The workshop was not told either, which is a matter between you and them.

I would also like the discontinuation date for this model in writing.

If I have had no reply within three weeks, I will send the file to the consumer body and publish the correspondence.

Yours faithfully,
Fikret Alay`,
            criteria: [
              "Olay sırası tarih ve tutarlarla verildi mi?",
              "İstenen ve istenmeyen açıkça ayrıldı mı?",
              "Kayıt kibar ama kararlı mı?",
              "Yanıt gelmezse yapılacak şey somut mu?",
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
      instruction: "This part has three tasks: an interview, a long turn with a comparison, and a discussion.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, karşılaştırmalı tek başına konuşma ve tartışma.",
      tasks: [
        {
          id: "en-b2-11-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about things you own and how long they last.",
          promptTr: "Sana sahip olduğun eşyalar ve ne kadar dayandıkları hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Tell me about something you own that has lasted much longer than you expected.", tr: "Günaydın. Beklediğinden çok daha uzun dayanan bir eşyanı anlat." },
            { who: "you", hint: "Eşyayı ve süreyi somut ver.", expect: "somut bir örneği süreyle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Have you ever had something repaired rather than replaced? How did it turn out?", tr: "Teşekkürler. Hiç bir şeyi değiştirmek yerine tamir ettirdin mi? Sonuç ne oldu?" },
            { who: "you", hint: "Tek bir olayı sonucuyla anlat.", expect: "geçmişte bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if the repair cost had been almost as much as a new one, what would you have done?", tr: "Tamir masrafı yenisine yakın olsaydı ne yapardın?" },
            { who: "you", hint: "Üçüncü tip koşulla cevapla ve gerekçelendir.", expect: "üçüncü tip koşul kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give a concrete example with a period of time", tr: "Somut bir örneği süreyle vermek" },
              { de: "narrate an event and its outcome", tr: "Bir olayı sonucuyla anlatmak" },
              { de: "use a third conditional", tr: "Üçüncü tip koşulu kullanmak" },
            ],
            sample:
              "The most surprising thing I own is a kitchen radio my grandmother bought in about 1994, which still works and has been dropped twice. I did once have a washing machine repaired: the part was cheap, the labour was three hours, and it failed again eleven weeks later. If the repair had cost almost as much as a new machine, I would have replaced it, and I would have felt slightly worse about doing the obviously sensible thing.",
            criteria: [
              "İlk cevapta somut bir süre verildi mi?",
              "Anlatı sonucuyla birlikte verildi mi?",
              "Üçüncü tip koşul doğru kuruldu mu?",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
        {
          id: "en-b2-11-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about a minute and a half. Compare two ways of making machines last longer: requiring manufacturers to supply parts for ten years, or requiring a repair cost to be printed on the label. Say which would work better and why, and mention one objection to your choice.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Makinelerin daha uzun dayanmasını sağlamanın iki yolunu karşılaştır: üreticiyi on yıl parça sağlamaya zorlamak mı, tamir maliyetini etikete yazdırmak mı? Hangisinin daha iyi işleyeceğini ve nedenini söyle, seçtiğine bir itirazı da an.",
          prepSeconds: 60,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "compare the two measures", tr: "İki önlemi karşılaştır" },
              { de: "say which would work better and why", tr: "Hangisinin daha iyi işleyeceğini ve nedenini söyle" },
              { de: "mention one objection to your own choice", tr: "Kendi seçimine bir itirazı an" },
            ],
            sample:
              "A ten-year supply rule attacks the problem directly, and it is expensive in a way that is easy to underestimate, because a warehouse is guessing about demand a decade ahead and pays for every wrong guess. The label does nothing on its own, whereas it changes the one moment at which a buyer is actually deciding, and manufacturers design against whatever appears on the label. I would choose the label. The obvious objection is that a number nobody understands gets ignored, exactly as energy ratings were ignored for years, and the answer to that is that energy ratings eventually worked, but they took a decade to start working.",
            criteria: [
              "İki önlem de karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçimine bir itiraz anıldı mı?",
              "Karşıtlık bağlaçları kullanıldı mı? (whereas, exactly as)",
              "Bir buçuk dakika sürdürüldü mü?",
            ],
          },
        },
        {
          id: "en-b2-11-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt: "We discuss the topic further together.",
          promptTr: "Konuyu birlikte biraz daha tartışıyoruz.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Some people say that buying a new machine instead of repairing an old one is an individual moral failure. Do you agree?", tr: "Kimileri eskisini tamir ettirmek yerine yenisini almayı bireysel bir ahlaki zaaf sayıyor. Katılır mısın?" },
            { who: "you", hint: "Görüşünü söyle ve bir hesapla destekle.", expect: "görüş bildirmek ve somut bir hesapla desteklemek", seconds: 45 },
            { who: "partner", de: "But if nobody is personally responsible, does anything ever change?", tr: "Peki kimse kişisel olarak sorumlu değilse hiçbir şey değişir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 45 },
            { who: "partner", de: "And who should pay for a longer parts supply: the buyer, the manufacturer or the state?", tr: "Daha uzun parça tedarikinin bedelini kim ödemeli: alıcı mı, üretici mi, devlet mi?" },
            { who: "you", hint: "Bir taraf seç ve gerekçelendir.", expect: "bir tarafı seçmek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "support an opinion with figures", tr: "Görüşü sayılarla desteklemek" },
              { de: "answer an objection directly", tr: "Bir itiraza doğrudan karşılık vermek" },
              { de: "choose a side and justify it", tr: "Bir tarafı seçip gerekçelendirmek" },
            ],
            sample:
              "I do not agree, and the arithmetic is why: ninety-four euros for a repair that may fail again, against three hundred for a new machine with a guarantee. Anybody choosing the second is being sensible, not weak. Your question is the fair one, though, and I would answer it like this: responsibility moves rather than disappears. It sits with whoever chose to bond the drum shut, and that person responds to rules, not to shame. As for paying, I would put it on the manufacturer, because they are the only party who can reduce the cost by designing differently, whereas a buyer can only pay it.",
            criteria: [
              "Görüş sayılarla desteklendi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Taraf seçimi gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

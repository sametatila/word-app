import type { MockPaper } from "../types";

/**
 * B1 · Deneme 11 — "Cooking for One and Eating Alone".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Tek kişilik yemek B1
 * için verimli çünkü sav duygusal değil sayısal: tarif dörde göre yazılmış,
 * dükkân altılı satıyor, dolayısıyla sorun yalnızlık değil bölme işlemi.
 * Bu ayrım karşılaştırma, koşul ve sonuç bağlaçlarına doğal zemin veriyor.
 *
 * Uzun metin bilerek savunma niteliğinde: dokuzuncuda üçüncü tekil bir
 * meslek profili, onuncuda birinci tekil bir başarısızlık anlatısı vardı.
 * Burada birinci tekil bir sav yürütülüyor ve karşı tarafa hak veriliyor.
 */
export const EN_B1_11: MockPaper = {
  id: "en-b1-11",
  course: "en",
  level: "B1",
  no: 11,
  theme: "Cooking for One and Eating Alone",
  themeTr: "Tek kişilik yemek ve yalnız yemek yemek",
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
          id: "en-b1-11-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note in a shared kitchen",
              genreTr: "Ortak mutfaktaki not",
              title: "The pans",
              body: `If you are cooking for one, the small pans are in the cupboard under the window. Please do not use the big one for a single portion; it takes twenty minutes to wash and somebody else is usually waiting for it.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a shop",
              genreTr: "Dükkân duyurusu",
              title: "SMALL PORTIONS",
              body: `Bread in half loaves, on the shelf by the door.

Vegetables loose, not in bags.

We do not charge more per kilo for loose vegetables, although most shops do.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "The recipe",
              body: `Dear Ines, thank you for the recipe. It says it serves four and I live alone, so I made a quarter of it and it did not work at all. I think the pan was too big. Do you have one that is written for a single person?`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice at a community centre",
              genreTr: "Toplum merkezi duyurusu",
              title: "EAT TOGETHER",
              body: `Thursday, 18.30.

Bring something or bring nothing; there is always enough.

This is not a charity meal and nobody asks you why you came.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "The soup again",
              body: `Halvard, I made the soup for six again. It is in two boxes in your freezer, and I want the boxes back. This is the third time and we both know that I will do it again in October.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the note ask people to do?",
              options: ["Cook for several people at once", "Use a small pan when only one person eats", "Wash the pans immediately after use"],
              answer: 1,
              explain:
                "Not yeri gösterip yasağı koyuyor: «the small pans are in the cupboard under the window» ve «do not use the big one for a single portion».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l1-2",
              no: 2,
              ref: "m2",
              text: "What does the shop say about the price?",
              options: ["Loose vegetables cost more here", "Half loaves cost the same as whole ones", "The price per kilo is not higher"],
              answer: 2,
              explain:
                "Duyuru kendini öteki dükkânlardan ayırıyor: «We do not charge more per kilo for loose vegetables, although most shops do».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l1-3",
              no: 3,
              ref: "m3",
              text: "What is the writer's problem?",
              options: ["The recipe was written for four people", "She does not like the food", "She has no recipe book at all"],
              answer: 0,
              explain:
                "E-posta sorunu adlandırıyor: «It says it serves four and I live alone, so I made a quarter of it and it did not work at all».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the notice make clear?",
              options: ["Everybody must bring something to share", "No one is asked why they came", "The meal costs three euros"],
              answer: 1,
              explain:
                "Duyuru iki şeyi birden söylüyor: «Bring something or bring nothing» ve «nobody asks you why you came».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l1-5",
              no: 5,
              ref: "m5",
              text: "What is the writer doing?",
              options: ["Asking for the recipe she used before", "Complaining about the freezer boxes", "Admitting a repeated habit"],
              answer: 2,
              explain:
                "İleti hem alışkanlığı hem tekrarını kabul ediyor: «This is the third time and we both know that I will do it again in October».",
            },
          ],
        },
        {
          id: "en-b1-11-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Loose and Small", body: "A shop that sells by the piece: one carrot, half a loaf, two eggs. Nothing here comes in a bag." },
            { key: "b", label: "Eat Together", body: "Thursday evenings at the community centre. Bring something or nothing. No membership and no questions." },
            { key: "c", label: "Cook Ahead", body: "A two-hour class on Saturday mornings: six meals for the week, cooked once. Fifteen euros." },
            { key: "d", label: "Recipes for One", body: "A free page from the library every month. Everything is written for a single portion, with nothing left over." },
            { key: "e", label: "Freezer Advice", body: "A free leaflet at the health centre. What freezes, what does not, and for how long." },
            { key: "f", label: "Restaurant Card", body: "Twenty per cent off from Monday to Wednesday in fourteen restaurants. Thirty euros a year." },
            { key: "g", label: "Kitchen Equipment", body: "Small pans, small dishes and one-portion boxes. Everything from four euros." },
            { key: "h", label: "Shopping Delivery", body: "Minimum order forty euros. Tuesday and Friday, between two and six." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-11-l2-6",
              no: 6,
              text: "Emir lives alone and throws away half of every packet of vegetables.",
              answer: "a",
              explain:
                "İlan tam bu sorunu çözüyor: «sells by the piece: one carrot, half a loaf, two eggs. Nothing here comes in a bag».",
            },
            {
              kind: "match",
              id: "en-b1-11-l2-7",
              no: 7,
              text: "Marta wants to eat with other people once a week without joining a club.",
              answer: "b",
              explain:
                "İlan üyeliği açıkça kaldırıyor: «No membership and no questions», ve haftada bir akşam yapılıyor.",
            },
            {
              kind: "match",
              id: "en-b1-11-l2-8",
              no: 8,
              text: "Ivo can cook but has no time between five and eight on weekdays.",
              answer: "c",
              explain:
                "İlan zamanı hafta sonuna alıyor: «Saturday mornings: six meals for the week, cooked once». Hafta içi akşamları gerekmiyor.",
            },
            {
              kind: "match",
              id: "en-b1-11-l2-9",
              no: 9,
              text: "Halvard wants recipes that do not assume four people at a table.",
              answer: "d",
              explain:
                "İlan porsiyonu açıkça veriyor: «Everything is written for a single portion, with nothing left over».",
            },
            {
              kind: "match",
              id: "en-b1-11-l2-10",
              no: 10,
              text: "Ines has a small freezer and wants to know what can go in it.",
              answer: "e",
              explain:
                "İlan tam bu soruyu yanıtlıyor: «What freezes, what does not, and for how long», üstelik ücretsiz.",
            },
          ],
        },
        {
          id: "en-b1-11-l3",
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
              title: "Nobody writes recipes for me",
              body: `People are sorry for me at dinner parties, and I have stopped correcting them. I live alone, I cook every evening, and the sympathy is aimed at the wrong thing in a way that is hard to explain quickly.

What is genuinely difficult is not the eating. It is the arithmetic. Almost every recipe in every book I own serves four, and dividing by four does not work. A quarter of an onion is a thing you can cut. A quarter of an egg is not, and a quarter of the cooking time produces something raw in the middle.

The shops are the second half of the problem. Vegetables come in bags of six when I need one, and the bag costs less than the single piece. That means the cheap option is the one where half of it goes in the bin in nine days. If the loose carrot cost the bag price, I would buy one.

I want to be fair to the recipe writers. A book of single portions sells badly, and they know it, because people who live alone buy the same books as everybody else and then adapt them, badly, in private.

What changed things for me was not a recipe at all. It was a second small pan and a decision to cook the same thing on Mondays for a year. The repetition sounds bleak, and it removed the daily decision, which was the part that actually made the evening long.

I still eat alone six nights a week. On the seventh I eat with four other people at the community centre, and nobody there asks anybody why they came.`,
              gloss: [
                { de: "sympathy", tr: "acıma, anlayış", en: "sympathy" },
                { de: "a portion", tr: "porsiyon", en: "portion" },
                { de: "bleak", tr: "iç karartıcı", en: "bleak" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-l3-11",
              no: 11,
              text: "What does the writer say about other people's sympathy?",
              options: [
                "She is glad to receive it",
                "It comes only from people at dinner parties",
                "She thinks it misses the real point",
                "She corrects it every time",
              ],
              answer: 2,
              explain:
                "Açılış bunu söylüyor: «the sympathy is aimed at the wrong thing», ve yazar düzeltmekten vazgeçtiğini de belirtiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l3-12",
              no: 12,
              text: "What does she say the real difficulty is?",
              options: [
                "Dividing recipes written for four",
                "Finding the time to cook",
                "The cost of the small pans",
                "Eating without any company",
              ],
              answer: 0,
              explain:
                "İkinci paragraf sorunu adlandırıyor: «It is the arithmetic … dividing by four does not work», ve yumurta örneğiyle gösteriyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l3-13",
              no: 13,
              text: "What does she say about the shops?",
              options: [
                "Small portions are not sold at all",
                "The vegetables are of poor quality",
                "Delivery is too expensive for one",
                "The cheaper choice produces waste",
              ],
              answer: 3,
              explain:
                "Üçüncü paragraf hesabı kuruyor: torba tek parçadan ucuz, «the cheap option is the one where half of it goes in the bin in nine days».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l3-14",
              no: 14,
              text: "Why does she defend the recipe writers?",
              options: [
                "They have tried it before and it did not work",
                "That kind of book would not make money",
                "They cook for one themselves",
                "The publishers refuse the idea",
              ],
              answer: 1,
              explain:
                "Yazar ticari gerçeği veriyor: «A book of single portions sells badly, and they know it», çünkü yalnız yaşayanlar da aynı kitapları alıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l3-15",
              no: 15,
              text: "What made the difference for her?",
              options: [
                "A new recipe book",
                "Eating out more often",
                "Not having to choose each evening",
                "Shopping on a different day",
              ],
              answer: 2,
              explain:
                "Beşinci paragraf değişimi adlandırıyor: pazartesileri aynı şeyi pişirmek «removed the daily decision, which was the part that actually made the evening long».",
            },
          ],
        },
        {
          id: "en-b1-11-l4",
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
              title: "The bag of six",
              body: `A shop is not being unkind when it sells carrots in a bag of six. It is doing the only thing that makes sense to it. {{16}}

The packet is cheaper to move, cheaper to price and cheaper to put on a shelf, and every one of those savings is real. The customer who wants one carrot is asking the shop to do more work for less money. {{17}}

What is odd is the price. In most shops the loose carrot costs more per kilo than the bagged one, sometimes a great deal more. {{18}}

Some shops have removed that difference, and the ones that have done it are usually small. A shop with four staff can decide something in an afternoon that a chain decides in a year. {{19}}

None of this is an argument for shopping in an expensive shop out of principle. It is an argument for noticing what a price is telling you. {{20}}`,
              gloss: [
                { de: "a chain", tr: "zincir mağaza", en: "chain" },
                { de: "handling", tr: "elleçleme, taşıma işi", en: "handling" },
                { de: "a household", tr: "hane", en: "household" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "That is not a punishment; it is the cost of handling, and it is genuinely there." },
            { key: "b", label: "b", body: "Every part of the way food is sold assumes a household of at least three." },
            { key: "c", label: "c", body: "Nobody in the shop is deciding to make life harder for one person; the system arrived before the person did." },
            { key: "d", label: "d", body: "It is telling you how many people the shop expects you to be." },
            { key: "e", label: "e", body: "Size is doing the work here, not virtue, and it will stop as soon as the small shop becomes a chain." },
            { key: "f", label: "f", body: "The first supermarket in this country opened in 1948 and had eleven members of staff." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-11-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "b",
              explain:
                "Açılış dükkânı savunuyor: «It is doing the only thing that makes sense to it». (b) bunu genelleştiriyor: gıdanın satılma biçiminin tamamı en az üç kişilik bir hane varsayıyor.",
            },
            {
              kind: "match",
              id: "en-b1-11-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "c",
              explain:
                "Paragraf tek havuç isteyenin dükkâna daha çok iş çıkardığını söylüyor. (c) bunun kimsenin kararı olmadığını ekliyor: «the system arrived before the person did».",
            },
            {
              kind: "match",
              id: "en-b1-11-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "a",
              explain:
                "Paragraf tuhaf bulduğu şeyi veriyor: dökme havuç kilo başına daha pahalı. (a) bunun bir ceza değil «the cost of handling» olduğunu söyleyerek açıklıyor.",
            },
            {
              kind: "match",
              id: "en-b1-11-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "e",
              explain:
                "Paragraf küçük dükkânın hızını veriyor: «A shop with four staff can decide something in an afternoon that a chain decides in a year». (e) bunun erdemle değil ölçekle ilgili olduğunu ve zincire dönüşünce biteceğini ekliyor.",
            },
            {
              kind: "match",
              id: "en-b1-11-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "d",
              explain:
                "Son paragraf fiyatın ne söylediğine bakmayı öneriyor. (d) o söylenen şeyi tamamlıyor: dükkânın seni kaç kişi saydığını. (f) 1948'de açılan ilk süpermarketten söz ediyor ve metinde marketlerin tarihi hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-11-l5",
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
              title: "If you have just started living alone",
              body: `If you have just started living alone, the first month decides a great deal.

Buy a second small pan. It sounds trivial and it {{21}} the number of evenings on which cooking feels like an event.

Do not divide a recipe written for four. Find one written for one, or accept that you {{22}} be eating it twice.

Decide one meal in advance for one day of the week. The repetition is not the point; {{23}} the decision is.

I {{24}} to think that eating alone was the difficulty. Now I think the difficulty is deciding, at seven o'clock, with nobody in the room to disagree with.

And a kitchen {{25}} runs on good intentions will produce a great deal of old bread.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["doubles", "halves", "counts", "raises"],
              answer: 1,
              explain:
                "Cümle küçük bir alışverişin büyük bir azalma sağladığını söylüyor: `halves the number`. `doubles` ve `raises` artışı bildirir, `counts` ise saymayı.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["are", "would", "have", "will"],
              answer: 3,
              explain:
                "`accept that you ___ be eating it twice` yapısı geleceğe ait bir kabulü bildiriyor ve `will be + -ing` bunu verir. `are` yalın bir şimdiki zaman, `have` ise `been` ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["removing", "remove", "removed", "to remove"],
              answer: 0,
              explain:
                "Noktalı virgülden sonra cümlenin öznesi gerekiyor ve özne bir eylem adı: `removing the decision is`. Yalın ya da çekimli biçim bu konumda özne olamaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["am used", "was using", "used", "use"],
              answer: 2,
              explain:
                "`used to + yalın fiil` artık sürmeyen bir geçmiş inancı bildirir ve sonraki cümle bunu doğruluyor: «Now I think …». `am used to` alışkın olmayı anlatır ve `-ing` ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["that", "who", "whose", "what"],
              answer: 0,
              explain:
                "Eksik öğe özne görevinde bir ilgi adılı ve öncül `a kitchen`, yani bir kişi değil. `that` uyar; `who` kişiler için, `whose` iyelik bildirir, `what` öncül almaz.",
            },
          ],
        },
        {
          id: "en-b1-11-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Note on a recipe card",
              genreTr: "Tarif kartındaki not",
              title: "My grandmother's card",
              body: `This card was written {{26}} my grandmother and it is the only recipe I have in her hand.

It serves six, {{27}} she cooked for six for forty years and never learned to write it smaller.

I have made it eleven times and it has never {{28}} out the same way twice.

The last line says: add water {{29}} it looks wrong. That is the whole instruction.

If you are cooking it for one, do not divide it. Make all of it and give half {{30}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-11-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["by"],
              explain:
                "Edilgen cümlede eylemi yapan `by` ile bildirilir: «was written by my grandmother». `from` kaynağı gösterir, yazanı değil.",
            },
            {
              kind: "gap",
              id: "en-b1-11-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["because"],
              explain:
                "İkinci yarı birincinin sebebini veriyor: altı kişilik olması, kırk yıl altı kişiye pişirmiş olmasından geliyor. `but` karşıtlık kurar ve burada karşıtlık yok.",
            },
            {
              kind: "gap",
              id: "en-b1-11-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["come"],
              explain:
                "`come out` bir yemeğin belli bir sonuç vermesini anlatır ve `has never` yardımcı fiili üçüncü hâli ister: `has never come out`.",
            },
            {
              kind: "gap",
              id: "en-b1-11-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["if"],
              explain:
                "Yönerge bir koşula bağlanıyor: yanlış göründüğü takdirde su ekle. `if` bu koşulu kurar; `when` kesin bir zaman varsayardı.",
            },
            {
              kind: "gap",
              id: "en-b1-11-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["away"],
              explain:
                "`give something away` bir şeyi başkasına vermeyi anlatır. `give half back` iade etmek olurdu ve metnin anlamına uymaz.",
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
          id: "en-b1-11-h1",
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
              situation: "Bir dinleyici asıl güçlüğü anlatıyor.",
              plays: 2,
              segments: [
                { text: "Everybody assumes the hard part is the eating. It is not. I like eating and I always have. The hard part is standing in a kitchen at seven with nobody to say: or we could just have eggs." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri tek havuç istiyor.",
              plays: 2,
              segments: [
                { text: "Can I buy one carrot?" },
                { text: "Of course. They are loose in the box." },
                { text: "Is it more expensive?" },
                { text: "Not here. In most places it is, and I have never understood why we should charge you for wanting less." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş çorbayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "You cooked for six again." },
                { text: "I did." },
                { text: "You live alone." },
                { text: "I know. The recipe is my grandmother's and it does not divide. Two boxes went to Halvard and I want them back." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Toplum merkezinde perşembe için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A reminder about Thursday. Bring something or bring nothing; there is always enough. And please do not describe it as a charity meal — half the people who come are cooking for six at home." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Cooking teacher",
              genreTr: "Yemek öğretmeni",
              situation: "Bir öğretmen kursunda ne öğrettiğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "People come to my class expecting to learn to cook. Most of them can already cook. What they cannot do is buy for one, and that is a shop problem and a maths problem, and I teach both of those instead." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri dükkândan arıyor.",
              plays: 2,
              segments: [
                { text: "Hi Marta, it is Emir. I am at the shop. The half loaves are gone and the whole ones are the same price. Shall I buy one and we split it, or do you want nothing?" },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı yaygın çözümü ele alıyor.",
              plays: 2,
              segments: [
                { text: "There is a version of this conversation in which the answer is that people should eat together more. I agree with it and it is not much help on a Tuesday. Most of us are alone on a Tuesday, and Tuesday is where the problem lives." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the speaker say is difficult?",
              options: ["Deciding what to cook", "Eating without company", "Buying the right amount"],
              answer: 0,
              explain:
                "Konuşmacı yemeyi açıkça eliyor: «I like eating and I always have», ve güçlüğü tarif ediyor: yedide mutfakta, karşısında fikir söyleyecek kimse yokken.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the assistant say?",
              options: ["Loose carrots cost more here", "This shop does not charge extra", "Only bags are available today"],
              answer: 1,
              explain:
                "Görevli kendi dükkânını ayırıyor: «Not here. In most places it is», ve uygulamayı anlamsız bulduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-3",
              no: 3,
              ref: "a3",
              text: "Why did she cook so much?",
              options: ["She was expecting visitors", "She forgot the number of people", "The recipe cannot be divided"],
              answer: 2,
              explain:
                "Konuşmacı sebebi veriyor: «The recipe is my grandmother's and it does not divide».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the announcement correct?",
              options: ["The name people give the meal", "The day of the meal", "The amount of food needed"],
              answer: 0,
              explain:
                "Anons bir adlandırmayı reddediyor: «please do not describe it as a charity meal», gerekçesiyle birlikte.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the teacher actually teach?",
              options: ["Cooking techniques", "Recipes for four people", "Shopping and amounts"],
              answer: 2,
              explain:
                "Öğretmen dersin konusunu adlandırıyor: «that is a shop problem and a maths problem, and I teach both of those instead».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-6",
              no: 6,
              ref: "a6",
              text: "What is Emir asking?",
              options: ["Whether the bread is fresh", "Whether to buy and share a loaf", "Whether the shop is still open"],
              answer: 1,
              explain:
                "İleti iki seçenek sunuyor: «Shall I buy one and we split it, or do you want nothing?»",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the speaker's point about eating together?",
              options: ["It does not solve the ordinary evening", "It is impossible in a large city", "It should be organised by the council in every district"],
              answer: 0,
              explain:
                "Konuşmacı öneriye katılıp sınırını koyuyor: «it is not much help on a Tuesday … Tuesday is where the problem lives».",
            },
          ],
        },
        {
          id: "en-b1-11-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş küçük bir alışverişi konuşuyor.",
              plays: 2,
              segments: [
                { text: "I bought the small pan." },
                { text: "And?" },
                { text: "I have used it every evening for three weeks. It cost nine euros and I do not understand why I waited two years." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi bir arkadaşlarının yemek yapmasını konuşuyor.",
              plays: 2,
              segments: [
                { text: "He says he cannot cook." },
                { text: "Can he?" },
                { text: "He made the soup on Sunday and it was fine. What he cannot do is cook for one; he made enough for eight and he was embarrassed about it." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri bir davete karşılık veriyor.",
              plays: 2,
              segments: [
                { text: "That is kind of you and no, not this Thursday. I did four of them in a row and I need one evening in my own kitchen. Ask me again next week and the answer will be yes." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "In the kitchen",
              genreTr: "Mutfakta",
              situation: "İki ev arkadaşı çöpü konuşuyor.",
              plays: 2,
              segments: [
                { text: "Somebody threw away half a cabbage again." },
                { text: "And?" },
                { text: "It is the fourth this month. It is not that people are wasteful. It is that a cabbage is sold in a size that no one person can finish." },
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
                { text: "You cannot eat the same thing every Monday." },
                { text: "I have done it for a year." },
                { text: "Does it not get boring?" },
                { text: "Monday was the worst evening of my week and now it is not. Boring is not the word I would use." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi bir tarifi konuşuyor.",
              plays: 2,
              segments: [
                { text: "The recipe says it serves four." },
                { text: "So make a quarter." },
                { text: "I tried. A quarter of an egg, and twelve minutes instead of fifty. It came out raw and I ate bread." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-h2-8",
              no: 8,
              ref: "b1",
              text: "What is the speaker doing?",
              options: ["Recommending a particular shop", "Explaining why she waited", "Saying that a small change worked"],
              answer: 2,
              explain:
                "Konuşmacı kullanımı ve fiyatı veriyor: «I have used it every evening for three weeks. It cost nine euros», ve iki yıl beklemiş olmasına şaşıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h2-9",
              no: 9,
              ref: "b2",
              text: "What is the main point?",
              options: ["The problem is the quantity, not the skill", "He should take a cooking class", "The soup was not very good"],
              answer: 0,
              explain:
                "Konuşmacı ayrımı kuruyor: çorba iyiymiş, «What he cannot do is cook for one; he made enough for eight».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the speaker doing?",
              options: ["Refusing for good", "Turning down one occasion", "Asking for an invitation"],
              answer: 1,
              explain:
                "Konuşmacı reddi tek bir güne bağlıyor: «no, not this Thursday … Ask me again next week and the answer will be yes».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h2-11",
              no: 11,
              ref: "b4",
              text: "What is the main point?",
              options: ["The people in the flat are careless", "Cabbage should not be bought at all", "The size on sale is the problem"],
              answer: 2,
              explain:
                "Konuşmacı ilk açıklamayı kendisi eliyor: «It is not that people are wasteful», sorun satılan boy.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h2-12",
              no: 12,
              ref: "b5",
              text: "What is the second speaker doing?",
              options: ["Agreeing that it is boring", "Defending a routine", "Recommending it to everybody"],
              answer: 1,
              explain:
                "Konuşmacı sonucu veriyor: «Monday was the worst evening of my week and now it is not», ve sıkıcı nitelemesini reddediyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h2-13",
              no: 13,
              ref: "b6",
              text: "What did the speaker learn?",
              options: ["Dividing a recipe does not work", "The oven is broken", "Bread is a better dinner"],
              answer: 0,
              explain:
                "Konuşmacı denemeyi ve sonucunu veriyor: «A quarter of an egg, and twelve minutes instead of fifty. It came out raw».",
            },
          ],
        },
        {
          id: "en-b1-11-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a cooking class. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir yemek kursu hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli kursu anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The Cook Ahead class runs on a Saturday, from ten to twelve. It costs fifteen euros and you take home six meals. There are eight places and you book online; we do not take names at the door. Bring three boxes with lids — we have none here. The class is in the kitchen behind the hall, and the next one is on the eighth.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Cook Ahead — notes",
              body: `Day:                 {{14}}
The class ends at:   {{15}}
Cost:                {{16}} euros
Number of places:    {{17}}
Bring {{18}} boxes with lids
The next class is on the {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-11-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["saturday"],
              explain:
                "Kayıt günü veriyor: «The Cook Ahead class runs on a Saturday». Sekiz ise hem yer sayısı hem sonraki dersin günü olarak geçiyor; gün adı ayrı.",
            },
            {
              kind: "gap",
              id: "en-b1-11-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["12", "twelve"],
              explain:
                "«from ten to twelve» — bitiş saati. On başlangıç saati; not kâğıdı bitişi soruyor.",
            },
            {
              kind: "gap",
              id: "en-b1-11-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["15", "fifteen"],
              explain:
                "«It costs fifteen euros and you take home six meals» — kurs ücreti. Altı, eve götürülen yemek sayısı.",
            },
            {
              kind: "gap",
              id: "en-b1-11-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["8", "eight"],
              explain:
                "«There are eight places and you book online» — kontenjan. Kapıda kayıt alınmıyor.",
            },
            {
              kind: "gap",
              id: "en-b1-11-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["3", "three"],
              explain:
                "«Bring three boxes with lids — we have none here» — getirilecek kap sayısı.",
            },
            {
              kind: "gap",
              id: "en-b1-11-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["8", "eighth", "8th"],
              explain:
                "«the next one is on the eighth» — sonraki dersin günü. Aynı sayı kontenjan olarak da geçiyor; not kâğıdında hangisinin sorulduğu satırdan belli.",
            },
          ],
        },
        {
          id: "en-b1-11-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who ran a cooking course. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Bir yemek kursu yürütmüş bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, dört yıl tek kişilik yemek kursu veren Ines ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You ran the course for four years. What did people come for?" },
                { text: "They came to learn to cook, and about four in five of them could already cook perfectly well. That was the first thing I got wrong, and it took me a year to see it." },
                { text: "So what were they missing?" },
                { text: "Two things, and neither of them is cooking. Buying — the shop sells in sixes and you are one. And deciding — at seven o'clock, with nobody in the room to disagree with you." },
                { text: "How did the course change?" },
                { text: "By the second year we spent the first hour in the shop and the second in the kitchen. People found that strange, and it was the hour that worked." },
                { text: "What about the food that was thrown away?" },
                { text: "It fell, but not because anybody became careful. It fell because we stopped buying the bag of six. Careful is not a plan; it is a mood." },
                { text: "Did anything not work?" },
                { text: "The recipes. I wrote thirty for a single portion, and I now think that was the least useful thing I produced. People do not want a special recipe; they want the ordinary one to be possible." },
                { text: "And the eating alone itself?" },
                { text: "I could not touch that, and I stopped pretending I could. What I could do was make the evening shorter. A person who has decided at breakfast eats at half past seven instead of half past nine, and that turns out to matter more than company." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-11-h4-20",
              no: 20,
              ref: "d1",
              text: "What did Ines get wrong at first?",
              options: ["The price of the course", "What her students needed", "The number of places"],
              answer: 1,
              explain:
                "Ines yanılgısını adlandırıyor: öğrencilerin beşte dördü zaten pişirebiliyormuş, «That was the first thing I got wrong».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h4-21",
              no: 21,
              ref: "d1",
              text: "What two things were people missing?",
              options: ["Time and equipment", "Recipes and confidence", "Buying and deciding"],
              answer: 2,
              explain:
                "Ines ikisini sayıyor: «Buying — the shop sells in sixes and you are one. And deciding — at seven o'clock».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h4-22",
              no: 22,
              ref: "d1",
              text: "How did the course change?",
              options: ["Half of it moved to the shop", "It became much longer", "It was held in the evening"],
              answer: 0,
              explain:
                "Ines yeni düzeni veriyor: «we spent the first hour in the shop and the second in the kitchen», ve işe yarayan saatin o olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h4-23",
              no: 23,
              ref: "d1",
              text: "Why did the waste fall?",
              options: ["People became more careful", "They stopped buying large packets", "The class cooked the leftovers"],
              answer: 1,
              explain:
                "Ines dikkatli olmayı açıkça eliyor: «not because anybody became careful … because we stopped buying the bag of six».",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she say about the recipes she wrote?",
              options: ["They were the least useful part", "They sold better than the course", "She would write many more"],
              answer: 0,
              explain:
                "Ines otuz tarifi değerlendiriyor: «I now think that was the least useful thing I produced», çünkü insanlar sıradan tarifin mümkün olmasını istiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-11-h4-25",
              no: 25,
              ref: "d1",
              text: "What could she change about eating alone?",
              options: ["She found people to eat with", "She taught students to enjoy it", "She made the evening shorter"],
              answer: 2,
              explain:
                "Ines sınırını ve yapabildiğini ayırıyor: yalnızlığa dokunamamış, «What I could do was make the evening shorter».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: a letter and an article.",
      instructionTr: "Bu bölümde iki görev var: bir mektup ve bir yazı.",
      tasks: [
        {
          id: "en-b1-11-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "A shop near you sells almost everything in large packets. Write a letter to the manager. Write about 100 words and cover all the points.",
          promptTr:
            "Yakınındaki bir dükkân hemen her şeyi büyük paketlerde satıyor. Müdüre bir mektup yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you buy there and what happens to it.", tr: "Oradan ne aldığını ve o şeye ne olduğunu söyle." },
              { de: "Make one exact suggestion.", tr: "Tek ve somut bir öneri yap." },
              { de: "Say what you would do differently if the shop changed.", tr: "Dükkân değişirse senin ne yapacağını söyle." },
            ],
            sample: `Dear Sir or Madam,

I shop in your branch on Mill Street two or three times a week and I live alone.

Almost everything is sold in packets for a family. I buy a bag of six peppers because there is nothing smaller, and three of them go in the bin every week. That is not a complaint about quality; it is a complaint about the size.

My suggestion is narrow: a small loose box for peppers, onions and carrots, priced by weight rather than by the piece.

If you did that, I would buy my vegetables here instead of on Saturday at the market.

Yours faithfully,
Marta Kral`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Somut sayılar ve sıklık verildi mi?",
              "Öneri tek ve uygulanabilir mi, yoksa genel bir istek mi?",
              "Kayıt kibar mı ve suçlayıcı bir dile kaymamış mı?",
              "Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-11-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"Something I do that other people find strange\". Say what it is, why you do it and what other people say about it. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Başkalarının tuhaf bulduğu bir alışkanlığım\". Ne olduğunu, neden yaptığını ve başkalarının ne dediğini yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the habit is.", tr: "Alışkanlığın ne olduğunu söyle." },
              { de: "Say why you do it.", tr: "Neden yaptığını söyle." },
              { de: "Say what other people say about it.", tr: "Başkalarının ne dediğini söyle." },
            ],
            sample: `I have eaten the same dinner every Monday for two years. Rice, an egg and whatever vegetable is open in the fridge.

I did not do it to save money. I did it because Monday used to be the evening when I stood in the kitchen at seven, opened three cupboards and ate bread at nine.

People find this bleak. My brother has called it a punishment and my colleague asks every week what I am having, which she thinks is funny and which is also, I notice, a joke about the same thing.

They are wrong. The evening is an hour shorter and I eat properly.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Alışkanlık somut mu anlatıldı?",
              "Gerekçe alışkanlıkla gerçekten bağlantılı mı?",
              "Başkalarının tepkisi örneklendi mi?",
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
          id: "en-b1-11-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about cooking, shopping and eating.",
          promptTr: "Sana yemek yapmak, alışveriş ve yemek yemek hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How do you decide what to eat in the evening?", tr: "İyi günler. Akşam ne yiyeceğine nasıl karar veriyorsun?" },
            { who: "you", hint: "Yöntemini anlat ve bir örnek ver.", expect: "bir alışkanlığı somut bir örnekle anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Have you ever thrown away food that you meant to eat?", tr: "Teşekkürler. Yemeyi planladığın bir yiyeceği hiç attın mı?" },
            { who: "you", hint: "Tek bir olayı anlat ve nedenini söyle.", expect: "geçmişte olmuş bir olayı nedeniyle anlatmak", seconds: 40 },
            { who: "partner", de: "And if you lived completely alone for a year, what would you change in your kitchen?", tr: "Bir yıl tamamen tek başına yaşasan mutfağında neyi değiştirirdin?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a habit with an example", tr: "Bir alışkanlığı örnekle anlatmak" },
              { de: "narrate one event with its reason", tr: "Tek bir olayı nedeniyle anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I decide in the morning, or I do not decide at all and I eat bread at nine. Last month I bought a bag of six peppers for a recipe that needed one, and four of them went into the bin about ten days later, which annoyed me more than the money. If I lived completely alone for a year, I would buy a second small pan and I would stop buying anything that comes in a bag.",
            criteria: [
              "İlk cevapta somut bir örnek verildi mi?",
              "Anlatı tek ve belirgin mi, nedeni verildi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-11-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of eating well when you live alone: cooking something fresh every evening, or cooking once at the weekend for the whole week. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Yalnız yaşarken iyi beslenmenin şu iki yolunu karşılaştır: her akşam taze bir şey pişirmek mi, hafta sonu bir kez pişirip bütün haftaya yaymak mı? Hangisini tercih edeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you prefer and why", tr: "Hangisini tercih ettiğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "Cooking fresh every evening sounds better and it depends on a thing nobody counts, which is having a decision in you at seven o'clock after work. Cooking once at the weekend removes that decision entirely, and it also removes the shopping problem, because a recipe for six is exactly what the shop is selling. I would cook once at the weekend. The disadvantage is real and it is not about taste: by Thursday you are eating something you chose on Sunday, and the person who chose it was in a much better mood than the person eating it.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (it depends on, entirely, by Thursday)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-11-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our community centre can add one thing for people who live alone. Talk with me about the options and decide together.",
          promptTr:
            "Toplum merkezimiz yalnız yaşayanlar için tek bir şey ekleyebiliyor. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a second evening meal each week, a cooking class for single portions, a shelf where people leave food they cannot finish, or a monthly page of recipes. Which would help most?", tr: "Seçenekler: haftada ikinci bir ortak akşam yemeği, tek porsiyonluk yemek kursu, bitirilemeyen yiyeceklerin bırakıldığı bir raf ya da aylık bir tarif sayfası. Hangisi en çok işe yarar?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I would question the class. Most people who come already know how to cook; they say so themselves. Does that change your mind?", tr: "Kursu sorgularım. Gelenlerin çoğu zaten yemek yapmayı biliyor, kendileri söylüyor. Bu fikrini değiştirir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "All right. So what do we put forward?", tr: "Peki. Ne öneriyoruz?" },
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
              "I would start with the second evening meal, because it is the only option that reaches somebody who is not going to organise anything for themselves. You are right that most people can cook, and I want to concede that, because it is the strongest argument against the class; what a class actually teaches is buying, and that could be one evening rather than eight. So let us put forward the second meal, and ask for one shopping evening in the autumn.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-11-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether shops should sell smaller quantities.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: dükkânlar daha küçük miktarlar satmalı mı.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some people say shops should be required to sell food in single portions. Is that reasonable?", tr: "Kimileri dükkânların yiyecekleri tek porsiyon satmak zorunda bırakılmasını söylüyor. Bu makul mü?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Others say that small portions mean more packaging and a higher price, so the buyer pays twice. Would you agree?", tr: "Kimileri de küçük porsiyonun daha çok ambalaj ve daha yüksek fiyat demek olduğunu, yani alıcının iki kez ödediğini söylüyor. Katılır mısın?" },
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
              "Requiring it sounds heavy to me, and there is a smaller version I would support: not charging more per kilo for loose vegetables, which is a decision a shop can take on a Tuesday. I partly agree about the packaging, because six small trays are worse than one bag and everybody knows it. But loose is not the same as packaged small, and the argument about packaging is usually made by people selling the bag.",
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

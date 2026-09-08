import type { MockPaper } from "../types";

/**
 * B1 · Deneme 7 — "Volunteering, Neighbours and Getting Things Done".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Gönüllülük B1 için
 * elverişli bir alan çünkü öneri, ret, koşul ve gerekçe dili aynı metinde
 * doğal duruyor; ayrıca metinlerin çoğu kurum değil kişi anlatıyor, bu da
 * altıncı denemedeki "kurum kuralını değiştirdi" kalıbını tekrar etmiyor.
 *
 * Üçüncü görevin yazısı bilerek olumsuz sonuçlu: anlatı iyileşmeyle değil
 * ayrılmayla bitiyor. Bir seviyede yedi kâğıt biriktiğinde en büyük risk
 * konu tekrarı değil, her metnin aynı eğriyi çizmesi.
 */
export const EN_B1_07: MockPaper = {
  id: "en-b1-07",
  course: "en",
  level: "B1",
  no: 7,
  theme: "Volunteering, Neighbours and Getting Things Done",
  themeTr: "Gönüllülük, komşuluk ve işin gerçekten yapılması",
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
          id: "en-b1-07-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "Repair evening",
              body: `The repair evening is on the first Thursday of the month, from six to nine. Bring one item only. We do not take anything that needs a part we have to order, so please ask before you carry a washing machine up the stairs. If your item is not finished by nine, you take it home and bring it back next month.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email",
              genreTr: "E-posta",
              title: "The driving group",
              body: `Dear Runa, I am leaving the driving group in March after four years. The job is one afternoon a week and a list of eleven people who need a lift. I am not asking you to say yes today; I am asking you to come once and watch. Nobody has ever said yes to this job on the telephone.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "The shelf in the hallway",
              body: `Anything on the shelf is free and anybody may take it. Please do not leave fresh food; nobody knows how long it has been there. Tins, rice and pasta are always useful. The shelf is emptied on Sunday evenings and whatever is left goes up to the kitchen on the first floor.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Email",
              genreTr: "E-posta",
              title: "Thank you for the offer",
              body: `Dear Aras, thank you for the offer of twenty hours a week. That is more than I can use. People who come for two hours and keep coming are worth more to us than people who give a great deal and stop after six weeks. Would two hours on Tuesdays work for you?`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice",
              genreTr: "Duyuru",
              title: "The garden group",
              body: `The garden group meets on Saturday mornings. There is no list and no membership. Come when you can; if nobody else comes, the person who is there waters the beds and goes home. The tools are in the green box and the key hangs inside the shed door.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-l1-1",
              no: 1,
              ref: "m1",
              text: "What happens to an item that is not finished?",
              options: ["It is thrown away at nine", "The owner takes it away and returns", "A helper keeps it until the next evening"],
              answer: 1,
              explain:
                "Duyurunun son cümlesi bunu düzenliyor: «you take it home and bring it back next month». Saat dokuz bitiş saati, atma saati değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l1-2",
              no: 2,
              ref: "m2",
              text: "What does the writer want Runa to do now?",
              options: ["Take over the driving group in March", "Telephone the eleven people on the list", "Come once and watch before deciding"],
              answer: 2,
              explain:
                "E-posta iki isteği açıkça ayırıyor: «I am not asking you to say yes today; I am asking you to come once and watch». Mart devrin tarihi, şimdiki istek değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l1-3",
              no: 3,
              ref: "m3",
              text: "What should people not leave on the shelf?",
              options: ["Food that does not keep", "Tins, rice and pasta", "Anything at all on Sundays"],
              answer: 0,
              explain:
                "Duyuru gerekçesiyle birlikte yasaklıyor: «Please do not leave fresh food; nobody knows how long it has been there». Konserve ve pirinç tam tersine isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l1-4",
              no: 4,
              ref: "m4",
              text: "Why does the writer not accept the offer?",
              options: ["There is no work at all on Tuesdays", "Small and regular is worth more", "Aras has no experience of this work"],
              answer: 1,
              explain:
                "E-posta ölçütü veriyor: «People who come for two hours and keep coming are worth more». Salı günü işin olmadığı gün değil, tam tersine önerilen gün.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l1-5",
              no: 5,
              ref: "m5",
              text: "What does the notice say about coming?",
              options: ["You must write your name on a list", "You must come every Saturday morning", "You come whenever it suits you"],
              answer: 2,
              explain:
                "Duyuru iki cümlede bunu kuruyor: «There is no list and no membership» ve «Come when you can».",
            },
          ],
        },
        {
          id: "en-b1-07-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which group is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi grup uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Homework Club", body: "Monday to Thursday, four to seven. We need adults who can sit with a child and not do the work for them. A police check is needed and we pay for it." },
            { key: "b", label: "Repair Evening", body: "First Thursday of the month, six to nine. Electrical items, wood and bicycles. Bring your own tools if you have them." },
            { key: "c", label: "Daytime Repairs", body: "We collect small electrical items and mend them in a workshop that is open on weekday mornings. There is no evening work at all." },
            { key: "d", label: "Drivers Wanted", body: "One afternoon a week, your own car, we pay for the fuel. Eleven people on the list and four drivers." },
            { key: "e", label: "Come When You Can", body: "The garden and the hallway shelf need doing every week and nobody keeps a list. Turn up, do what is there, go home." },
            { key: "f", label: "Interpreting at the Advice Desk", body: "Thursday mornings. We need people who can sit between a visitor and an official and say exactly what each of them said." },
            { key: "g", label: "River Path Group", body: "Saturday mornings, cutting back and clearing. Gloves provided, bring boots. Very little talking and a great deal of walking." },
            { key: "h", label: "Telephone Friends", body: "Twenty minutes a week on the phone with somebody who lives alone. Training in September, then one call a week." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-07-l2-6",
              no: 6,
              text: "Noor has three free hours on a Monday afternoon and wants to work with children.",
              answer: "a",
              explain:
                "İlan hem günü hem işi veriyor: «Monday to Thursday, four to seven» ve çocukla oturup ödevi onun yerine yapmamak. Başka hiçbir ilanda çocuk yok.",
            },
            {
              kind: "match",
              id: "en-b1-07-l2-7",
              no: 7,
              text: "Ilja can repair electrical things but he cannot leave the house in the evening.",
              answer: "c",
              explain:
                "İlan iki koşulu birden karşılıyor: «small electrical items» ve «open on weekday mornings. There is no evening work at all». Tamir akşamı (b) altıda başlıyor, yani akşam kısıtına takılıyor.",
            },
            {
              kind: "match",
              id: "en-b1-07-l2-8",
              no: 8,
              text: "Selma wants to help but she cannot promise the same day every week.",
              answer: "e",
              explain:
                "İlan tam bu kısıtı kaldırıyor: «nobody keeps a list. Turn up, do what is there, go home». Öteki ilanların hepsi belli bir gün istiyor.",
            },
            {
              kind: "match",
              id: "en-b1-07-l2-9",
              no: 9,
              text: "Tarek speaks four languages and wants to use them.",
              answer: "f",
              explain:
                "İlan işi tarif ediyor: «sit between a visitor and an official and say exactly what each of them said». Dil bilgisi başka hiçbir ilanda aranmıyor.",
            },
            {
              kind: "match",
              id: "en-b1-07-l2-10",
              no: 10,
              text: "Kiro wants physical work outdoors and would rather not talk to people.",
              answer: "g",
              explain:
                "İlan ikisini de veriyor: «cutting back and clearing» ve «Very little talking». Telefon arkadaşlığı (h) tam tersine konuşmaktan ibaret.",
            },
          ],
        },
        {
          id: "en-b1-07-l3",
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
              title: "Why I stopped after three years",
              body: `I gave three years to a food project and I left in February. People assume I got tired of the work. I did not. The work was the only part that made sense.

What I could not do any more was the deciding. A shelf needed moving from one wall to the other. It took four meetings and eleven weeks. In the end the shelf was moved by two people on a Sunday, when nobody was there to stop them.

I am not saying the meetings were stupid, although that is what people expect me to say. Everybody in that room had been treated badly somewhere else, and a meeting is a promise that nobody will be ignored. But a promise like that has a price, and the price was paid in shelves.

The part that hurt was what happened afterwards. They found somebody within a week. For three years I had believed the project would fall over without me, and it did not even wobble.

I have started again somewhere smaller. There are four of us and there are no meetings. In two years it will probably be twelve of us, there will be meetings, and I will have to decide what I think then.`,
              gloss: [
                { de: "to assume", tr: "varsaymak", en: "assume" },
                { de: "to wobble", tr: "sallanmak", en: "wobble" },
                { de: "to ignore", tr: "yok saymak", en: "ignore" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-l3-11",
              no: 11,
              text: "Why did the writer leave the project?",
              options: [
                "The physical work became too hard for her",
                "She disagreed with what the project was doing",
                "Decisions took too long",
                "The other people treated her badly",
              ],
              answer: 2,
              explain:
                "Yazı sebebi adlandırıp örnekliyor: «What I could not do any more was the deciding» ve bir rafın yerinin değişmesi «four meetings and eleven weeks» sürüyor. İş sevilen bölüm: «The work was the only part that made sense».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l3-12",
              no: 12,
              text: "What does the writer say about the meetings?",
              options: [
                "They came out of a real need",
                "They were held in order to waste time",
                "Only a few people were allowed to speak",
                "They were the best part of the project",
              ],
              answer: 0,
              explain:
                "Yazar toplantıları savunuyor: «Everybody in that room had been treated badly somewhere else, and a meeting is a promise that nobody will be ignored». Aptalca olduklarını açıkça reddediyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l3-13",
              no: 13,
              text: "What happened to the shelf in the end?",
              options: [
                "It stayed where it had always been",
                "It was moved after the fourth meeting agreed",
                "It was taken out of the building",
                "Two people moved it without asking",
              ],
              answer: 3,
              explain:
                "Metin sonucu veriyor: «the shelf was moved by two people on a Sunday, when nobody was there to stop them». Yani karar toplantıdan değil, kimsenin olmamasından çıkıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l3-14",
              no: 14,
              text: "How did the writer feel about the person who replaced her?",
              options: [
                "She was glad that somebody was found so fast",
                "Finding them so quickly showed her she had been wrong",
                "She thought the new person was not good enough",
                "She was angry that nobody had asked her first",
              ],
              answer: 1,
              explain:
                "Yazı inancın çöküşünü anlatıyor: «For three years I had believed the project would fall over without me, and it did not even wobble». Yeni kişi hakkında bir yargı yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l3-15",
              no: 15,
              text: "What does the writer expect of her new group?",
              options: [
                "That it will always stay at four people",
                "That it will fail within about two years",
                "That it will grow and meet the same problem",
                "That it will never have to make decisions",
              ],
              answer: 2,
              explain:
                "Son cümle beklentiyi veriyor: «In two years it will probably be twelve of us, there will be meetings». Yani sorun çözülmüş değil, ertelenmiş.",
            },
          ],
        },
        {
          id: "en-b1-07-l4",
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
              title: "The board in the hallway",
              body: `There is a board in the hallway of our building and anybody may pin anything on it. I photographed it every Monday for a year, which is a strange thing to do and I recommend it. {{16}}

The pattern was not the one I expected. Notes that asked for something were nearly always answered. Notes that offered something were nearly always ignored. {{17}}

When I show people this, they say that a request is easier to answer than an offer, because a request tells you exactly what to do. {{18}}

There was one kind of offer that did work. If the note named a day and a time, somebody came. "I will be in the yard on Saturday at ten with a saw" brought four people. "Happy to help with anything" brought nobody in twelve months. {{19}}

I should say what the board does not show. It does not show the six families who read it every week and never write anything, and it does not show whether the person who answered a note actually turned up. {{20}}`,
              gloss: [
                { de: "to pin", tr: "iğnelemek, asmak", en: "pin" },
                { de: "a request", tr: "istek, rica", en: "request" },
                { de: "generosity", tr: "cömertlik", en: "generosity" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "By the end I had fifty-two photographs and a pattern I could not argue with." },
            { key: "b", label: "b", body: "That is probably true, but it does not explain why a good offer can sit there for weeks." },
            { key: "c", label: "c", body: "The difference between those two notes is not generosity; it is that one of them can be put in a diary." },
            { key: "d", label: "d", body: "For that you would have to stand in the hallway all week, and I was not willing to go that far." },
            { key: "e", label: "e", body: "The counting was simple enough: forty-one requests, twenty-nine offers and one lost cat." },
            { key: "f", label: "f", body: "The building was put up in 1962 and the hallway has not been painted since." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-07-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "a",
              explain:
                "Boşluktan önce yöntem anlatılıyor: «I photographed it every Monday for a year». (a) o yılın sonucunu veriyor — elli iki fotoğraf, tam olarak yılın pazartesi sayısı.",
            },
            {
              kind: "match",
              id: "en-b1-07-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "e",
              explain:
                "Paragraf iki karşıt eğilimi söylüyor ama sayı vermiyor; (e) sayıları getiriyor: «forty-one requests, twenty-nine offers». (a) da sayı taşıyor ama fotoğrafların sayısı, notların değil.",
            },
            {
              kind: "match",
              id: "en-b1-07-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "b",
              explain:
                "Önceki cümle başkalarının açıklamasını aktarıyor: «a request tells you exactly what to do». (b) o açıklamayı kısmen kabul edip yetersizliğini gösteriyor ve bir sonraki paragrafın istisnasını hazırlıyor.",
            },
            {
              kind: "match",
              id: "en-b1-07-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "c",
              explain:
                "Paragraf iki notu yan yana koyuyor: testereli olan dört kişi getiriyor, «Happy to help with anything» kimseyi getirmiyor. (c) «those two notes» ile ikisine gönderme yapıp farkı adlandırıyor.",
            },
            {
              kind: "match",
              id: "en-b1-07-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "d",
              explain:
                "Son cümle panonun göremediği şeyi söylüyor: «whether the person who answered a note actually turned up». (d) «For that» ile ona bağlanıp bunu öğrenmenin bedelini veriyor. (f) binanın 1962'deki yapımından söz ediyor ve metnin hiçbir yerinde bina tarihi tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-07-l5",
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
              title: "If you are starting a group",
              body: `If you are starting a group, the hardest thing is not finding people. It is {{21}} them.

Most people who offer help mean it. Two weeks later they have heard nothing from you and the feeling has gone. Answer within a day, {{22}} the person will find something else to do.

Give the new person something small and finished on the first evening. Nobody {{23}} a job that has no end.

I {{24}} to give people the interesting work first. Now I give them the boring work first and I tell them that it is boring.

And write down what you promised. A group {{25}} runs on memory will lose somebody every spring.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["keep", "to keep", "kept", "keeping"],
              answer: 3,
              explain:
                "Cümle bir öncekiyle koşut kuruluyor: «the hardest thing is not finding people. It is … them». `finding` ile eşleşen biçim `keeping`. Yalın fiil ve geçmiş biçim bu boşluğa hiç uymuyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["even if", "otherwise", "although", "unless"],
              answer: 1,
              explain:
                "Boşluk öğüde uyulmadığında olacak şeyi bağlıyor: bir gün içinde cevap ver, aksi hâlde kişi başka iş bulur. `otherwise` bunu verir; `unless` bir koşulu olumsuzlar ve gelecek zamanla kurulmaz, `although` karşıtlık bildirir.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["enjoys", "enjoy", "is enjoying", "enjoyed"],
              answer: 0,
              explain:
                "`Nobody` tekil özne sayılır ve geniş zamanda üçüncü tekil `-s` ister. Cümle genel bir doğru bildirdiği için şimdiki zaman ya da geçmiş zaman uymaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["am used", "was using", "used", "use"],
              answer: 2,
              explain:
                "`used to + yalın fiil` artık sürmeyen bir geçmiş alışkanlığı bildirir ve sonraki cümle bunu doğruluyor: «Now I give them the boring work first». `am used to` alışkın olmayı anlatır ve ardından `-ing` ister.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["what", "that", "who", "whose"],
              answer: 1,
              explain:
                "Eksik olan öğe özne görevinde bir ilgi adılı ve öncül `a group`, yani bir kişi değil. `that` uyar; `who` kişiler için, `whose` iyelik bildirir, `what` ise öncülü olan bir ilgi cümlesi kuramaz.",
            },
          ],
        },
        {
          id: "en-b1-07-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Handover note",
              genreTr: "Devir notu",
              title: "A note for the next coordinator",
              body: `I have been doing this job {{26}} four years and I am handing it over in March.

Here is the only thing that matters: the people {{27}} keep coming are the ones who were given something small at the start.

Do not be afraid {{28}} saying no to a big offer. Twenty hours a week from somebody who disappears in May is worse than two hours that last.

The list is longer {{29}} it looks. Eleven of the names are people who have not answered since last summer.

And if you are ill, tell somebody early. Nothing here depends {{30}} one person, and it should not.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-07-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `for four years`. `since` bir başlangıç noktası ister (`since 2021`), süre değil.",
            },
            {
              kind: "gap",
              id: "en-b1-07-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["who"],
              explain:
                "Öncül `the people`, yani kişiler; özne görevindeki ilgi adılı `who` olur. `which` insanlar için kullanılmaz, `whose` ise iyelik bildirir.",
            },
            {
              kind: "gap",
              id: "en-b1-07-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["of"],
              explain:
                "`afraid` sıfatı `of` ile bağlanır ve ardından `-ing` gelir: `afraid of saying no`. Başka bir edat bu kalıbı bozar.",
            },
            {
              kind: "gap",
              id: "en-b1-07-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["than"],
              explain:
                "`longer` bir karşılaştırma biçimidir ve karşılaştırılan şey `than` ile bağlanır: «The list is longer than it looks».",
            },
            {
              kind: "gap",
              id: "en-b1-07-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["on"],
              explain:
                "`depend` fiili `on` edatını alır: `depends on one person`. Başka edatlarla bu fiil kurulmaz.",
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
          id: "en-b1-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Bir sorumlu tamir akşamı için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about Thursday. The repair evening is still on, but we are in room two and not in the hall, because the hall floor is being done. Same time, six to nine. Bring the radio and I will look at it myself." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At a desk",
              genreTr: "Danışmada",
              situation: "Biri ödev kulübünde gönüllü olmak istiyor.",
              plays: 2,
              segments: [
                { text: "I would like to help with the homework club." },
                { text: "Lovely. There is a police check first and we pay for it, but it takes about three weeks." },
                { text: "So I cannot start on Monday?" },
                { text: "Not this Monday, no." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bahçe grubuna kapanışta anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Before you all go: the garden tools are still in the green box, but the key has moved. It is not under the third stone any more. It hangs on a hook inside the shed door." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir toplantıdan söz ediyor.",
              plays: 2,
              segments: [
                { text: "Did you go to the meeting?" },
                { text: "Two hours, and we decided nothing." },
                { text: "Again?" },
                { text: "We agreed to meet in three weeks with the same paper. I could have moved that shelf myself in ten minutes." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Danışma masası için tercüman soruluyor.",
              plays: 2,
              segments: [
                { text: "Do you have somebody who speaks Arabic on Thursday mornings?" },
                { text: "Thursday, yes, but only until eleven." },
                { text: "My appointment is at half past eleven." },
                { text: "Then I would move the appointment rather than the interpreter." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir sorumlu gönüllü sayısını anlatıyor.",
              plays: 2,
              segments: [
                { text: "People ask how many volunteers we have. The number of names on the list is ninety-four. The number who did anything at all last month is thirty-one. I give the second number, because the first one has never once been true." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri cumartesi için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, it is about Saturday. I said I would drive, but my car is at the garage until Tuesday. I can still come; I just cannot bring anybody with me. Tell Selma, so she can ask somebody else." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-h1-1",
              no: 1,
              ref: "a1",
              text: "What has changed?",
              options: ["The time of the evening", "The date of the evening", "The room"],
              answer: 2,
              explain:
                "İleti tek değişikliği veriyor: «we are in room two and not in the hall». Saat ve gün duruyor: «Same time, six to nine».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the problem?",
              options: ["A check takes time", "The club costs money", "Monday is full"],
              answer: 0,
              explain:
                "Görevli süreyi veriyor: «There is a police check first … but it takes about three weeks». Ücreti kulüp ödüyor: «we pay for it».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the announcement about?",
              options: ["A new box for the tools", "Where to find the key", "The time the garden closes"],
              answer: 1,
              explain:
                "Anons yeri değiştiriyor: «It is not under the third stone any more. It hangs on a hook inside the shed door». Yeşil kutu aynı yerde.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-4",
              no: 4,
              ref: "a4",
              text: "How does the second speaker feel?",
              options: ["Pleased that a decision was made", "Worried about the state of the shelf", "Annoyed that nothing was decided"],
              answer: 2,
              explain:
                "Konuşmacı sonucu ve kendi ölçütünü veriyor: «Two hours, and we decided nothing» ve «I could have moved that shelf myself in ten minutes».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the second speaker advise?",
              options: ["To come without an interpreter", "To change the time of the appointment", "To come on a different day"],
              answer: 1,
              explain:
                "Öğüt tek cümlede: «I would move the appointment rather than the interpreter». Perşembe uygun gün, sorun saatin on biri geçmesi.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-6",
              no: 6,
              ref: "a6",
              text: "Which number does the speaker use?",
              options: ["The number of people who were active", "The number of names on the list", "Both numbers together"],
              answer: 0,
              explain:
                "Konuşmacı seçimini gerekçelendiriyor: «I give the second number», yani geçen ay bir şey yapan otuz bir kişi. Listedeki doksan dört için «has never once been true» diyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the speaker's news?",
              options: ["She cannot come on Saturday", "She has to work on Saturday", "She can come but not drive"],
              answer: 2,
              explain:
                "İleti ikisini ayırıyor: «I can still come; I just cannot bring anybody with me». Araba salıya kadar serviste.",
            },
          ],
        },
        {
          id: "en-b1-07-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "You hear six short conversations. What is the main point? Choose a, b or c. You hear every conversation twice.",
          promptTr: "Altı kısa konuşma dinleyeceksin. Ana nokta nedir? a, b ya da c'yi seç. Her konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "In the hallway",
              genreTr: "Koridorda",
              situation: "İki komşu panodaki notları konuşuyor.",
              plays: 2,
              segments: [
                { text: "I put a note up in March offering to help with the shopping. Nothing happened." },
                { text: "Nobody at all?" },
                { text: "Then in June I wrote: Tuesday at four, I will be by the door with a trolley. Three people came. Same offer, one difference." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between volunteers",
              genreTr: "Gönüllüler arasında",
              situation: "İki gönüllü reddedilen bir teklifi konuşuyor.",
              plays: 2,
              segments: [
                { text: "He offered twenty hours a week and she said no." },
                { text: "I would have taken it." },
                { text: "He did the same at the school last year. Six weeks, then nothing, and they had built the timetable round him." },
                { text: "All right, that is fair. Two hours that keep going is worth more." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri kendisine yapılan bir çağrıya karşılık veriyor.",
              plays: 2,
              segments: [
                { text: "That is kind of you to think of me, and I have to say no this time. I did the Christmas one and I was no use to my family for two weeks. Ask me again in March and the answer will probably be different." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "In the hallway",
              genreTr: "Koridorda",
              situation: "İki komşu koridordaki rafı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Somebody left a bag of tomatoes on Friday." },
                { text: "And?" },
                { text: "They were still there on Monday and now the whole shelf smells. It is not that people are careless. It is that nobody owns the shelf between Friday and Sunday." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between neighbours",
              genreTr: "Komşular arasında",
              situation: "İki kişi bahçe grubunun düzenini tartışıyor.",
              plays: 2,
              segments: [
                { text: "You cannot run a group with no list." },
                { text: "We have run it for six years." },
                { text: "What if nobody comes?" },
                { text: "Then whoever is there waters the beds, or nobody waters them for a week and nothing dies. A list would give us names and the same four people." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "At a desk",
              genreTr: "Danışmada",
              situation: "İki kişi bir yanlış anlamayı düzeltiyor.",
              plays: 2,
              segments: [
                { text: "Runa said you might take over the driving." },
                { text: "I have not said yes." },
                { text: "She said you would." },
                { text: "I said I would come on Tuesday and sit in the car. That is not the same sentence." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-h2-8",
              no: 8,
              ref: "b1",
              text: "What is the first speaker doing?",
              options: ["Complaining about her neighbours", "Explaining why one note worked", "Asking for a lift to the shops"],
              answer: 1,
              explain:
                "Konuşmacı iki notu karşılaştırıp farkı adlandırıyor: «Same offer, one difference» — ikincisi gün ve saat veriyor. Komşulardan yakınma yok.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h2-9",
              no: 9,
              ref: "b2",
              text: "What do the speakers agree about in the end?",
              options: ["The training took too long", "Twenty hours a week is a generous offer", "Steady help is worth more than a large offer"],
              answer: 2,
              explain:
                "İkinci konuşmacı fikrini değiştirip özetliyor: «Two hours that keep going is worth more». Başta o kişi teklifi kabul ederdi.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h2-10",
              no: 10,
              ref: "b3",
              text: "What is the speaker doing?",
              options: ["Turning down a request politely", "Asking for more information", "Complaining about a decision"],
              answer: 0,
              explain:
                "Konuşmacı reddediyor ama kapıyı kapatmıyor: «I have to say no this time … Ask me again in March». Bilgi istemiyor, karar da eleştirmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h2-11",
              no: 11,
              ref: "b4",
              text: "What is the main point?",
              options: ["The people who use the shelf are careless", "Fresh food does not work on the shelf", "The shelf should be taken away completely"],
              answer: 1,
              explain:
                "Konuşmacı ilk şıkkı kendisi eliyor: «It is not that people are careless». Sorun cuma ile pazar arasında rafa kimsenin bakmaması, yani bozulan yiyecek orada duramıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h2-12",
              no: 12,
              ref: "b5",
              text: "What is the second speaker doing?",
              options: ["Defending a group that keeps no list", "Asking somebody to join the group", "Suggesting that they write a list"],
              answer: 0,
              explain:
                "Konuşmacı listesizliği savunuyor: «We have run it for six years» ve «A list would give us names and the same four people».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h2-13",
              no: 13,
              ref: "b6",
              text: "What does the second speaker want?",
              options: ["To leave the driving group", "To be paid for the fuel", "To try the work before deciding"],
              answer: 2,
              explain:
                "Konuşmacı sözünün sınırını çiziyor: «I said I would come on Tuesday and sit in the car. That is not the same sentence».",
            },
          ],
        },
        {
          id: "en-b1-07-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a volunteer day. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir gönüllü günü hakkında bilgi dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir sorumlu gönüllü gününü anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The volunteer day is on Saturday the eighteenth. We start at nine in the car park, not at the main door. There are three jobs: the river path, the hallway shelf and the homework room. The river path group needs boots; we have gloves for everybody. Lunch is at one and it is free. If you are coming, tell Selma by Wednesday, because she orders the food.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Volunteer day — notes",
              body: `Date:                  Saturday the {{14}}
Meet at nine in the:   {{15}}
Number of jobs:        {{16}}
For the river path bring your own: {{17}}
Lunch at:              {{18}}
Tell Selma by:         {{19}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-07-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["18", "eighteenth", "18th"],
              explain:
                "Kayıt «on Saturday the eighteenth» diyor. Not kâğıdında `Saturday the` basılı olduğu için boşluğa yalnız gün yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-07-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["car park"],
              explain:
                "Kayıt buluşma yerini karşıtıyla veriyor: «in the car park, not at the main door». Ana kapı bilerek elenen yer.",
            },
            {
              kind: "gap",
              id: "en-b1-07-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["3", "three"],
              explain:
                "Kayıt sayıyı verip sayıyor: «There are three jobs: the river path, the hallway shelf and the homework room».",
            },
            {
              kind: "gap",
              id: "en-b1-07-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["boots"],
              explain:
                "Kayıt getirileni ve verileni ayırıyor: «The river path group needs boots; we have gloves for everybody». Eldiven istenmiyor çünkü sağlanıyor.",
            },
            {
              kind: "gap",
              id: "en-b1-07-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["1", "one"],
              explain:
                "«Lunch is at one and it is free» — yemek saati. Dokuz buluşma saati, on sekiz ise ayın günü.",
            },
            {
              kind: "gap",
              id: "en-b1-07-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["wednesday"],
              explain:
                "Kayıt son günü gerekçesiyle veriyor: «tell Selma by Wednesday, because she orders the food». Cumartesi etkinliğin kendi günü.",
            },
          ],
        },
        {
          id: "en-b1-07-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who organises volunteers. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr:
            "Gönüllüleri düzenleyen bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, gönüllüleri düzenleyen Noor ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You have a reputation for turning people away. Is that fair?" },
                { text: "It is not quite fair, but it is close. Last year I said no to about a third of the people who offered." },
                { text: "That sounds like a lot." },
                { text: "It is. In my first year I said yes to everybody, and I lost four evenings a week to people I never saw a second time. Somebody has to meet them, show them the work and check them. That work is real and nobody sees it." },
                { text: "So the cost of a new volunteer is your own time." },
                { text: "Yes, and I can put a number on it. Three hours before the person is any use at all. If they stay only six weeks, those hours will never come back. If they stay two years, they are the best three hours I ever spent." },
                { text: "And how do you know which is which?" },
                { text: "I do not, and anybody who says they can is selling something. What I do instead is ask for something small and exact. Two hours on a Tuesday. The people who say anything, any time, are the ones who go." },
                { text: "That seems hard on somebody who really is free all week." },
                { text: "It is, and I get it wrong. A man last spring offered every day and I gave him Tuesdays only. He is still here, and he still tells me I was rude." },
                { text: "Would you change anything?" },
                { text: "I would tell people why. For two years I said no and let them believe we were full. Now I say it straight: I want you for two years and not for six weeks, and the way to get two years is to start small." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-07-h4-20",
              no: 20,
              ref: "d1",
              text: "What does Noor say about her reputation?",
              options: ["It is close to the truth", "It only fitted her first year", "She has never turned anybody away"],
              answer: 0,
              explain:
                "Noor itirazını sınırlıyor: «It is not quite fair, but it is close», sonra sayı veriyor: «about a third of the people who offered».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h4-21",
              no: 21,
              ref: "d1",
              text: "What happened in her first year?",
              options: ["She had far too few volunteers", "She refused a third of the offers", "Her own week filled up with new people"],
              answer: 2,
              explain:
                "Noor bedeli anlatıyor: «I said yes to everybody, and I lost four evenings a week to people I never saw a second time». Üçte bir reddi geçen yılın sayısı.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h4-22",
              no: 22,
              ref: "d1",
              text: "What number does she put on a new volunteer?",
              options: ["Six weeks of work", "Three hours of her time", "Two years of training"],
              answer: 1,
              explain:
                "Noor maliyeti sayıyla veriyor: «Three hours before the person is any use at all». Altı hafta ile iki yıl kalış süreleri, maliyet değil.",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h4-23",
              no: 23,
              ref: "d1",
              text: "How does she decide who will stay?",
              options: ["She cannot, so she asks for something small", "She uses a test that she developed herself", "She takes only people with long experience"],
              answer: 0,
              explain:
                "Noor önce bilmediğini söylüyor: «I do not, and anybody who says they can is selling something», sonra yaptığını: «ask for something small and exact».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she say about the man who offered every day?",
              options: ["He left again after six weeks", "She was right to give him Tuesdays", "He stayed, but he has not forgiven her"],
              answer: 2,
              explain:
                "Noor sonucu ve süreni birlikte veriyor: «He is still here, and he still tells me I was rude». Kendi kararını da savunmuyor: «I get it wrong».",
            },
            {
              kind: "mcq",
              id: "en-b1-07-h4-25",
              no: 25,
              ref: "d1",
              text: "What would she do differently?",
              options: ["Say yes to a great many more people", "Explain her reason for saying no", "Stop asking people for two years"],
              answer: 1,
              explain:
                "Noor değiştireceği şeyi adlandırıyor: «I would tell people why. For two years I said no and let them believe we were full».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and an article.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir yazı.",
      tasks: [
        {
          id: "en-b1-07-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Three weeks ago you offered to help a local group and nobody has answered. Write an email to the group. Write about 100 words and cover all the points.",
          promptTr:
            "Üç hafta önce yerel bir gruba yardım teklif ettin ve kimse cevap vermedi. Gruba bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say when and how you offered to help.", tr: "Ne zaman ve nasıl yardım teklif ettiğini söyle." },
              { de: "Offer one exact thing you can do, with a day and a time.", tr: "Yapabileceğin tek bir somut şeyi gün ve saatiyle öner." },
              { de: "Say clearly what you cannot do.", tr: "Yapamayacağın şeyi açıkça söyle." },
            ],
            sample: `Dear all,

On 3 October I filled in the form on your website and offered to help with the hallway shelf. I have not had an answer, which is fine — I know you are busy.

I would like to make the offer smaller and clearer. I can be at the building every Tuesday from five to seven. I can sort what is on the shelf, throw away what has gone off and write a list of what is missing.

I cannot drive and I cannot come at weekends, because I work on Saturdays.

If Tuesdays are no use, please tell me and I will not ask again.

Best wishes,
Ilja Berg`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Teklif gün ve saat içeriyor mu? Belirsiz bir 'ne olursa yaparım' mı kalmış?",
              "Yapılamayacak şey açıkça söylendi mi?",
              "Present perfect doğru kullanıldı mı? (`I have not had an answer`)",
              "Kayıt kibar ama sitem içermeyecek biçimde mi? Yaklaşık 100 kelime var mı?",
            ],
          },
        },
        {
          id: "en-b1-07-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a local website with this title: \"The smallest useful thing I have done for other people\". Say what it was, how it started and what surprised you. Write about 100 words.",
          promptTr:
            "Yerel bir internet sitesi için şu başlıkla bir yazı yaz: \"Başkaları için yaptığım en küçük yararlı şey\". Ne olduğunu, nasıl başladığını ve seni neyin şaşırttığını yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what the small thing was.", tr: "O küçük şeyin ne olduğunu söyle." },
              { de: "Say how it started.", tr: "Nasıl başladığını söyle." },
              { de: "Say what surprised you.", tr: "Seni neyin şaşırttığını söyle." },
            ],
            sample: `For two years I have taken the bins of the flat below mine out on a Sunday evening. That is the whole thing. It takes four minutes.

It started because I heard her fall in the hallway with the bag in her hand. I did not ask her; I just did it the next week, and she did not mention it either.

What surprised me was the effect on me rather than on her. Four minutes a week has made me somebody who knows which flats are empty in August. I did not know a single neighbour before, and I had lived here for nine years.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Anlatılan şey gerçekten küçük mü, yoksa görev yanlış mı okunmuş?",
              "Başlangıç somut bir olayla mı anlatıldı?",
              "Present perfect ve geçmiş zaman doğru ayrıldı mı?",
              "Şaşırtan şey açıkça adlandırıldı mı? Yaklaşık 100 kelime var mı?",
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
          id: "en-b1-07-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about where you live and about helping other people.",
          promptTr: "Sana yaşadığın yer ve başkalarına yardım etmek hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How well do you know the people who live near you?", tr: "İyi günler. Yakınında oturanları ne kadar tanıyorsun?" },
            { who: "you", hint: "Durumu anlat ve bir örnek ver.", expect: "bir durumu betimlemek ve somut bir örnekle desteklemek", seconds: 40 },
            { who: "partner", de: "Thank you. Has anybody ever helped you without being asked?", tr: "Teşekkürler. Hiç kimse senden istenmeden yardım etti mi?" },
            { who: "you", hint: "Present perfect ya da geçmiş zamanla bir olay anlat.", expect: "geçmişte olmuş tek bir olayı anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had one free afternoon a week, who would you give it to?", tr: "Haftada bir boş öğleden sonran olsa onu kime ayırırdın?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a situation with an example", tr: "Bir durumu örnekle anlatmak" },
              { de: "tell one event from the past", tr: "Geçmişten tek bir olay anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I know two families in my building and nobody else, although I have lived there for six years. Last winter the man upstairs took my post in for a week while I was away, and he never said anything about it; I found it on my door. If I had one free afternoon a week, I would give it to the homework club at the school, because that is the only work near me where somebody would actually notice if I stopped.",
            criteria: [
              "İlk cevapta somut bir örnek verildi mi?",
              "Geçmişteki olay tek ve belirgin mi, yoksa genel mi kalmış?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-07-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of helping: giving money to an organisation every month, or giving two hours of your own time every week. Say which you would choose and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Yardımın şu iki yolunu karşılaştır: her ay bir kuruluşa para vermek mi, yoksa her hafta kendi zamanından iki saat vermek mi? Hangisini seçeceğini ve nedenini söyle.",
          prepSeconds: 60,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "compare the two ways", tr: "İki yolu karşılaştır" },
              { de: "say which you would choose and why", tr: "Hangisini seçeceğini ve nedenini söyle" },
              { de: "mention one disadvantage of your choice", tr: "Seçtiğin yolun bir olumsuz yanını da söyle" },
            ],
            sample:
              "Money is easy to give and easy to stop, and nobody in the organisation ever learns your name. Time is the opposite: it is hard to give, and after a few months people expect you. On the other hand, money buys things that volunteers cannot buy, such as a van. I would give the two hours, mainly because I want to see what actually happens to what I give. The disadvantage is honest enough: I am worth about nine euros an hour to them, and my monthly payment would be worth more.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, the opposite)",
              "Seçim gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-07-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Four of us have to look after the hallway shelf for one month. Talk with me and agree how we divide the weeks.",
          promptTr:
            "Dördümüz bir ay boyunca koridordaki rafa bakmak zorundayız. Benimle konuş ve haftaları nasıl paylaşacağımıza karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "There are four weeks and four of us, so one week each looks obvious. Do you agree?", tr: "Dört hafta ve dört kişiyiz, herkese bir hafta düşmesi apaçık görünüyor. Katılıyor musun?" },
            { who: "you", hint: "Öneriye karşılık ver: kabul et ya da başka bir bölüşüm öner ve gerekçelendir.", expect: "bir öneriye gerekçeli karşılık vermek", seconds: 40 },
            { who: "partner", de: "The problem is that two of us work at weekends, and the shelf is worst on a Sunday. How do we handle that?", tr: "Sorun şu: ikimiz hafta sonu çalışıyoruz ve raf en çok pazar günü kötü oluyor. Bunu nasıl çözeriz?" },
            { who: "you", hint: "Somut bir çözüm öner ve karşı tarafın söylediğine gönderme yap.", expect: "somut bir çözüm önermek ve karşı tarafın kısıtını hesaba katmak", seconds: 40 },
            { who: "partner", de: "All right. What do we write on the note for the others?", tr: "Peki. Ötekiler için nota ne yazıyoruz?" },
            { who: "you", hint: "Vardığınız düzeni tek tek özetle.", expect: "varılan düzeni açık ve sıralı biçimde özetlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "respond to a proposal with a reason", tr: "Bir öneriye gerekçeyle karşılık vermek" },
              { de: "solve a practical problem together", tr: "Somut bir sorunu birlikte çözmek" },
              { de: "summarise the agreement", tr: "Varılan anlaşmayı özetlemek" },
            ],
            sample:
              "One week each is fair on paper, but the weeks are not the same: the week after the food delivery is twice the work. You are right that Sunday is the problem, so let us split it: the two of you who work at weekends take the Monday to Friday jobs, and we two take the Sundays. On the note: weeks one and three, Tarek and me for Sundays; weeks two and four, you two; and everybody empties the shelf before they go on holiday.",
            criteria: [
              "İlk öneriye gerekçeli bir karşılık verildi mi?",
              "Karşı tarafın kısıtı (hafta sonu çalışma) çözüme katıldı mı?",
              "Somut bir bölüşüm ortaya çıktı mı?",
              "Sonunda anlaşma özetlendi mi?",
            ],
          },
        },
        {
          id: "en-b1-07-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether volunteers should be paid something.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: gönüllülere bir şey ödenmeli mi.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Some groups pay their volunteers' travel costs and nothing else. Is that enough?", tr: "Bazı gruplar gönüllülerin yalnız yol parasını ödüyor. Bu yeterli mi?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Other people say that as soon as you pay anything, it is a job with a bad salary. Would you agree?", tr: "Kimileri de bir şey ödemeye başladığın anda bunun kötü maaşlı bir işe dönüştüğünü söylüyor. Katılır mısın?" },
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
              "Travel money is not payment, it is simply not charging people for helping. A woman in our group spent eleven euros a week getting to the kitchen, which is a real cost and it stopped her coming. I partly agree with the other argument, because I have seen a group where the small payment became the reason people came, and the atmosphere changed within a year. But there is a difference between paying for a bus ticket and paying for an hour.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, although)",
              "İki yan da anıldı mı, yoksa tek yanlı mı kalındı?",
            ],
          },
        },
      ],
    },
  ],
};

import type { MockPaper } from "../types";

/**
 * A2 · Deneme 3 — "Homes and Neighbours".
 *
 * Deneme 1 ve 2 ile AYNI PLAN; konu ayrı. İlk ikisi sağlık/boş zaman ve
 * yolculuk/alışverişi ölçüyordu; bu üçüncüsü ev ve komşuluğu alıyor, çünkü
 * A2'de en sık geçen işlevler burada toplanıyor: kural bildirme, rica,
 * şikâyet, tarih ve fiyat söyleme.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`. Üçüncü tip
 * koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_03: MockPaper = {
  id: "en-a2-03",
  course: "en",
  level: "A2",
  no: 3,
  theme: "Homes and Neighbours",
  themeTr: "Ev ve komşuluk",
  minutes: 110,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 35,
      instruction:
        "This part has five tasks. You read short texts, adverts and a longer article, and you complete two short texts. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde beş görev var. Kısa metinler, ilanlar ve daha uzun bir yazı okuyacak, sonra iki kısa metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a2-03-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Message",
              genreTr: "İleti",
              title: "From Oskar",
              body: `Hi, a big parcel for you came this morning and the driver left it with me. I am at home after five every day this week. My flat is number 9, on the second floor.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a building",
              genreTr: "Bina duyurusu",
              title: "The lift",
              body: `The lift will not work from Monday to Wednesday. Workers are changing the doors. Please use the stairs. If you cannot use the stairs, call the office and we will help you with your shopping.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Water on Thursday",
              body: `Dear residents, the water will be off on Thursday between nine and twelve. Please fill some bottles on Wednesday evening. The heating still works as usual.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a flatmate",
              genreTr: "Ev arkadaşına not",
              title: "Back on Sunday",
              body: `Selim, I am at my sister's until Sunday. Can you water the plants on Friday? The key for the balcony door is in the kitchen drawer. Do not put the small green plant in the sun.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "Rubbish days",
              body: `From next month the yellow bags are collected on Tuesday, not on Friday. Paper stays on Friday. Please put the bags out after seven in the evening, not earlier: the street is narrow.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-03-l1-1",
              no: 1,
              ref: "m1",
              text: "What does Oskar tell his neighbour?",
              options: ["He will bring the parcel upstairs", "The parcel is in his flat", "The driver comes again tomorrow"],
              answer: 1,
              explain:
                "İleti «the driver left it with me» diyor: koli Oskar'ın yanında duruyor. Oskar onu yukarı çıkaracağını hiç söylemiyor, tersine kendi kapı numarasını veriyor; şoförün tekrar gelmesi de yazmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l1-2",
              no: 2,
              ref: "m2",
              text: "What should people do if they cannot use the stairs?",
              options: ["Phone the office for help", "Wait for the workers at the door", "Use the lift only in the morning"],
              answer: 0,
              explain:
                "Duyurunun son cümlesi tek çözümü veriyor: «call the office and we will help you with your shopping». İşçiler kapıları değiştiriyor, yardım etmiyor; asansör üç gün boyunca hiç çalışmıyor, sabah da çalışmıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l1-3",
              no: 3,
              ref: "m3",
              text: "What is the problem on Thursday?",
              options: ["The heating stops for three hours", "The bottles are not delivered", "There is no water in the morning"],
              answer: 2,
              explain:
                "Su «off on Thursday between nine and twelve», yani sabah kesik. E-posta ısıtmanın sürdüğünü açıkça söylüyor («The heating still works as usual»); şişeler teslim edilmiyor, okuyucunun çarşamba akşamı kendisi dolduracağı şeyler.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l1-4",
              no: 4,
              ref: "m4",
              text: "What must Selim do on Friday?",
              options: ["Give the plants water", "Move the green plant into the sun", "Take the key to Anja's sister"],
              answer: 0,
              explain:
                "Not tek bir rica taşıyor: «Can you water the plants on Friday?». Küçük yeşil bitki için yazılan şey tam tersi bir yasak («Do not put … in the sun»); anahtar ise balkon kapısının anahtarı, kimseye götürülmüyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l1-5",
              no: 5,
              ref: "m5",
              text: "What changes next month?",
              options: ["Paper is collected on Tuesday", "The bags must go out before seven", "The day for the yellow bags"],
              answer: 2,
              explain:
                "Değişen tek şey gün: sarı torbalar artık «on Tuesday, not on Friday». Kâğıt cumada kalıyor, yani salıya geçen o değil; torbalar da yediden önce değil «after seven» çıkarılacak.",
            },
          ],
        },
        {
          id: "en-a2-03-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Flat Share", body: "One room free in a big flat from October. Three people, one bathroom, no smoking. 320 pounds with all bills." },
            { key: "b", label: "Repair Hour", body: "Every Thursday evening in the community room. Bring a small broken thing and a helper will look at it with you. Free." },
            { key: "c", label: "Storage Boxes", body: "Clean, dry boxes near the station. From two square metres. Day and night entry with your own key. From 18 pounds a month." },
            { key: "d", label: "Garden Group", body: "We look after the small garden behind the school. Saturday mornings, tools are here. Everybody can come, no experience needed." },
            { key: "e", label: "Painting Team", body: "Two painters, ten years of work. We work Monday to Friday and a normal room takes one day. We move the furniture and put it back." },
            { key: "f", label: "Quiet Studio", body: "One person only, top floor, no lift. Small but very light. Near the university. Free from September." },
            { key: "g", label: "Furniture Van", body: "Small van and a driver for two hours. Good for a bed or a sofa. 45 pounds. We do not carry things up the stairs." },
            { key: "h", label: "Night Study Room", body: "Open until one in the morning, seven days a week. Warm, quiet, free tea. Bring your own laptop." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-03-l2-6",
              no: 6,
              text: "Sanne is moving to a smaller flat and has no place for her winter things.",
              answer: "c",
              explain:
                "İlan tam bunu satıyor: «Clean, dry boxes» ve «From two square metres». Sanne eşyayı atmıyor, bir yere koyacak yer arıyor; taşınma aracı (g) eşyayı taşır ama saklamaz.",
            },
            {
              kind: "match",
              id: "en-a2-03-l2-7",
              no: 7,
              text: "Kiran wants to change the colour of his living room but he has no time at the weekend.",
              answer: "e",
              explain:
                "İlan hem işi hem günü veriyor: «We work Monday to Friday and a normal room takes one day». Kiran hafta sonu boş değil, bu yüzden cumartesi çalışan bahçe grubu (d) ya da perşembe akşamki tamir saati (b) işe yaramaz.",
            },
            {
              kind: "match",
              id: "en-a2-03-l2-8",
              no: 8,
              text: "Oskar bought a second-hand sofa and he needs to bring it home on Saturday.",
              answer: "g",
              explain:
                "İlan nesneyi adıyla sayıyor: «Good for a bed or a sofa». İki saatlik araç ve şoför bir kanepeyi taşımak için yeter; ilan merdivenden çıkarmadığını da söylüyor ama Oskar'ın istediği şehir içi taşıma.",
            },
            {
              kind: "match",
              id: "en-a2-03-l2-9",
              no: 9,
              text: "Anja studies alone and works better late in the evening than in the morning.",
              answer: "h",
              explain:
                "İlan «Open until one in the morning, seven days a week» diyor ve sessiz. Anja tek başına çalışıyor, ev arkadaşı aramıyor; bu yüzden oda ilanı (a) ya da stüdyo (f) sorusuna cevap değil.",
            },
            {
              kind: "match",
              id: "en-a2-03-l2-10",
              no: 10,
              text: "Piotr is new in the city and would like to work together with other people outdoors at the weekend.",
              answer: "d",
              explain:
                "İlan üç ölçütü birden karşılıyor: açık hava («the small garden behind the school»), hafta sonu («Saturday mornings») ve deneyim istememesi. Tamir saati de ücretsiz ve birlikte ama perşembe akşamı ve kapalı bir odada.",
            },
          ],
        },
        {
          id: "en-a2-03-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the article and questions 11 to 14. Choose a, b or c.",
          promptTr: "Yazıyı ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "The flat above the bakery",
              body: `Two years ago I moved into a small flat above a bakery. My friends asked me one question again and again: is it not too noisy?

The answer is yes and no. The bakers start at four in the morning, and for the first week I woke up every night. Then something strange happened: after ten days I did not hear them any more. Now the machines are part of the house for me.

The flat is smaller than my old one and it has no balcony. But the rent is a hundred pounds cheaper, and the bus stop is in front of the door.

There is one more thing, and it is better than a balcony. When I come home late, the baker often gives me the bread that he cannot sell the next day. I take it, and in the morning I give half of it to the old man in flat 3.`,
              gloss: [
                { de: "a bakery", tr: "fırın", en: "bakery" },
                { de: "the rent", tr: "kira", en: "rent" },
                { de: "a balcony", tr: "balkon", en: "balcony" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-03-l3-11",
              no: 11,
              text: "Why did the writer sleep badly at the beginning?",
              options: ["Because the flat was too small", "Because the bus stopped in front of the door", "Because work in the bakery began very early"],
              answer: 2,
              explain:
                "Yazı sebebi veriyor: «The bakers start at four in the morning, and for the first week I woke up every night». Küçüklük ve otobüs durağı metinde geçiyor ama ikisi de uykuyla bağlanmıyor; durak tam tersine olumlu bir yan olarak anılıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l3-12",
              no: 12,
              text: "What happened after ten days?",
              options: ["The noise stopped waking him", "The bakers began later", "He asked for a flat with a balcony"],
              answer: 0,
              explain:
                "Metin «after ten days I did not hear them any more» diyor: ses sürüyor, yazan alışıyor. Fırıncıların saati hiç değişmiyor; balkon isteği de yazıda yok, tersine balkonsuzluğun daha iyisini bulduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l3-13",
              no: 13,
              text: "What is better in the new flat than in the old one?",
              options: ["It has a balcony and more light", "The rent is lower", "The rooms are bigger"],
              answer: 1,
              explain:
                "Karşılaştırma metinde sayıyla veriliyor: «the rent is a hundred pounds cheaper». Yeni daire hem balkonsuz hem de «smaller than my old one»; iki yanlış şık da metnin açıkça çürüttüğü şeyler.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l3-14",
              no: 14,
              text: "What does the writer do with the bread?",
              options: ["He sells it to the old man in flat 3", "He shares it with a neighbour", "He gives it back to the baker"],
              answer: 1,
              explain:
                "Son cümle veriyor: «I give half of it to the old man in flat 3» — komşuyla paylaşıyor. Satmıyor (ekmek zaten satılamadığı için ona veriliyor) ve fırıncıya geri götürmüyor.",
            },
          ],
        },
        {
          id: "en-a2-03-l4",
          no: 4,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 15 to 19. Which word fits: a, b or c?",
          promptTr: "Metni oku ve 15–19. boşlukları tamamla. Hangi sözcük uyar: a, b ya da c?",
          texts: [
            {
              kind: "text",
              id: "t4",
              genre: "Blog post",
              genreTr: "Blog yazısı",
              title: "Four years in a flat share",
              body: `I lived in flat shares for four years, and here is my advice.

Talk about money in the first week. Who pays the internet? Who buys the things that everybody {{15}}?

Write the cleaning days on a paper in the kitchen. A paper is {{16}} than a long discussion every Sunday.

A guest for one night is fine. But if somebody stays for a week, the others {{17}} know before, not after.

Next month a new person {{18}} come to our flat, and we are all a bit nervous.

And the last rule: {{19}} you take the last milk, buy new milk on the same day.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-03-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["uses", "use", "using"],
              answer: 0,
              explain:
                "Özne `everybody` biçimce tekildir, bu yüzden geniş zamanda fiil `-s` alır: «everybody uses». `use` çoğul öznelerle gelir; `using` ise çekimsiz biçimdir ve yardımcı fiil olmadan yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["good", "the best", "better"],
              answer: 2,
              explain:
                "Boşluktan sonra `than` var; `than` karşılaştırma derecesi ister ve `good` sıfatının karşılaştırması `better`dır. `the best` en üstünlük derecesidir ve `than` ile kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["can", "must", "may"],
              answer: 1,
              explain:
                "Cümle bir ev kuralını bildiriyor: bir hafta kalan misafir önceden haber ister. Zorunluluğu `must` verir. `can` ve `may` izin ya da olasılık bildirir, kural koymaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "goes to", "is going to"],
              answer: 2,
              explain:
                "Zaman belirteci `next month`, yani gelecek. Planlanmış bir gelecek için `is going to + fiil` kullanılır. `went to` geçmiş, `goes to` ise alışkanlık bildirir ve ikisi de gelecek ayı anlatamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "when", "because"],
              answer: 1,
              explain:
                "Cümle bir durumu kurala bağlıyor: sütün sonunu alan kişi aynı gün yenisini alır. `when` bu koşullu zamanı verir. `so` sonuç, `because` sebep bildirir ve ikisi de baştaki yan cümleyi kuramaz.",
            },
          ],
        },
        {
          id: "en-a2-03-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the letter and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Mektubu oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Letter to the neighbours",
              genreTr: "Komşulara mektup",
              title: "Hello from the third floor",
              body: `Hello everyone,

I moved {{20}} the flat on the third floor last week.

My name is Sanne and I come {{21}} the north of the country.

I work at home, so I am here {{22}} day. If a parcel arrives for you, I can take it.

It is the {{23}} flat in the building, but that is fine for one person.

I would like to meet you, {{24}} please knock on my door.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-03-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["into", "to"],
              explain:
                "`move into a flat` bir yere yerleşmeyi anlatan kalıptır; `move to` da yön bildirdiği için kabul edilir. `move in the flat` yerleşmeyi değil dairenin içinde hareket etmeyi anlatır.",
            },
            {
              kind: "gap",
              id: "en-a2-03-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["from"],
              explain:
                "Nereli olduğunu söylemenin kalıbı `come from`: «I come from the north». `come of` ya da `come out` bu anlamı vermez; kaynak bildiren edat `from`dur.",
            },
            {
              kind: "gap",
              id: "en-a2-03-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["all", "every"],
              explain:
                "«I am here ___ day» — evden çalıştığı için gün boyu evde. `all day` (gün boyunca) ve `every day` (her gün) ikisi de doğru İngilizcedir ve ikisi de kabul edilir; `the day` bu yapıda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-a2-03-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["smallest"],
              explain:
                "Boşluktan önce `the`, sonra `in the building` var: bu ikisi birlikte en üstünlük derecesi ister. Cümlenin devamı «that is fine for one person» diyor, yani daire en KÜÇÜK olan. `smaller` karşılaştırma derecesidir ve `the … in` yapısıyla gelmez.",
            },
            {
              kind: "gap",
              id: "en-a2-03-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["so"],
              explain:
                "İki cümle arasında sonuç ilişkisi var: tanışmak istiyor, bu yüzden kapıyı çalmayı rica ediyor. `so` sonucu verir. `because` yönü ters çevirir, `but` ise karşıtlık bildirir ve burada karşıtlık yok.",
            },
          ],
        },
      ],
    },

    /* ── LISTENING ─────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction:
        "This part has four tasks. You hear conversations, a talk and five short speakers. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, bir sunum ve beş kısa konuşmacı dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a2-03-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In the building",
              genreTr: "Binada",
              situation: "İki komşu ortak çamaşır makinesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "The machine in the cellar is broken again." },
                { text: "I know. The man comes on Wednesday, not on Monday: he was ill. Until then we can use the one in number 14, but only after six." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi kiralık daire için arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, I am calling about the flat in Garden Street. Is it still free?" },
                { text: "Yes, but there are eleven people on the list. I show the flat on Saturday at eleven, everybody together." },
                { text: "All right. How much is the rent, and do I need papers?" },
                { text: "Six hundred with the heating. And please bring a letter from your work and your passport." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In the street",
              genreTr: "Sokakta",
              situation: "İki komşu gece yapılan bir partiden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Did you hear the party last night?" },
                { text: "Of course, until three! But I did not want to call the police. I spoke to them this morning. They said sorry and it was the last time: they are moving out in April." },
                { text: "Good. The office sent a letter last month and nothing changed." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At home",
              genreTr: "Evde",
              situation: "Bir çift taşınma gününü konuşuyor.",
              plays: 2,
              segments: [
                { text: "We get the keys on the first, but the van is only free on the third." },
                { text: "Then we sleep two more nights in the old flat. No problem, the beds are still there." },
                { text: "And my brother helps us on the third. He has the whole day." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bina sakinlerine bir toplantı duyuruluyor.",
              plays: 2,
              segments: [
                { text: "Everybody, the meeting about the garden is not in the community room this month. The room is full of chairs from the school. We meet in the garden itself. If it rains, we meet in my flat, number 2." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-03-h1-1",
              no: 1,
              ref: "a1",
              text: "What can the neighbours do before Wednesday?",
              options: ["Ask the man to come on Monday", "Wash in number 14 at any time", "Use another machine after six"],
              answer: 2,
              explain:
                "Kayıt bir saat sınırı koyuyor: 14 numaradaki makine «but only after six». Tamirci pazartesi gelemiyor çünkü hastaydı; «at any time» ise kaydın açıkça çürüttüğü şey.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h1-2",
              no: 2,
              ref: "a2",
              text: "What must the caller bring on Saturday?",
              options: ["A letter and a passport", "Eleven copies of the contract", "Six hundred pounds in cash"],
              answer: 0,
              explain:
                "Son cümle istenen belgeleri sayıyor: «bring a letter from your work and your passport». Onbir kişi sayısıdır, evrak sayısı değil; altı yüz kiradır ve cumartesi ödenmesi istenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h1-3",
              no: 3,
              ref: "a3",
              text: "What did the second speaker do?",
              options: ["She called the police at three", "She talked to the neighbours", "She wrote to the office again"],
              answer: 1,
              explain:
                "Konuşmacı «I spoke to them this morning» diyor. Polisi aramak istemediğini de açıkça söylüyor; ofisin mektubu geçen ay ve başka biri tarafından gönderilmiş.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h1-4",
              no: 4,
              ref: "a4",
              text: "Why do they stay two more nights in the old flat?",
              options: ["Because the van is not free yet", "Because the brother works on the first", "Because the beds are in the new flat"],
              answer: 0,
              explain:
                "Anahtarlar ayın biri, araç ise «only free on the third»: aradaki iki gece bu yüzden. Kardeş de üçünde yardım ediyor; yataklar ise «still there», yani ESKİ dairede duruyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h1-5",
              no: 5,
              ref: "a5",
              text: "Where is the meeting if the weather is bad?",
              options: ["In the community room", "In the garden", "In flat number 2"],
              answer: 2,
              explain:
                "Koşul kaydın sonunda: «If it rains, we meet in my flat, number 2». Ortak oda bu ay okuldan gelen sandalyelerle dolu; bahçe ise yağmur yoksa geçerli olan yer.",
            },
          ],
        },
        {
          id: "en-a2-03-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk at a building meeting. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir bina toplantısındaki konuşmayı dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Konuşmayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Konuşma",
              situation: "Bina yöneticisi ayın işlerini anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening and thank you for coming. Three things tonight. First, the front door: the new lock arrives on the fourteenth of May and every flat gets two keys. Second, the cellar. We must empty it before the workers come, so please take your things out by the end of the month. Third, the garden. Twelve people put their name on the list, and we start on Saturday at ten. Bring gloves if you have them; we have the tools. And one small thing: the bin for glass is now behind the garage, not next to the door.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Building meeting — notes",
              body: `New lock arrives on:      {{6}} May
Keys for every flat:      {{7}}
Empty the cellar before:  the end of the {{8}}
Garden work starts:       Saturday at {{9}}
Glass bin is now behind:  the {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-03-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["14", "fourteenth", "14th"],
              explain:
                "Konuşma «the new lock arrives on the fourteenth of May» diyor. Not kâğıdında `May` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-03-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["2", "two"],
              explain:
                "«every flat gets two keys» — daire başına iki anahtar. Kayıtta on iki de geçiyor ama o bahçe listesine yazılan kişi sayısı; iki sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-03-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["month"],
              explain:
                "Bodrum «by the end of the month» boşaltılacak. Not kâğıdında `the end of the` basılı, bu yüzden boşluğa yalnız zaman birimi yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-03-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["10", "ten"],
              explain:
                "Bahçe işi «we start on Saturday at ten» ile veriliyor. Kayıttaki öteki sayılar (on dört, iki, on iki) tarih, anahtar ve kişi sayısı; saat yalnız bu cümlede geçiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-03-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["garage"],
              explain:
                "Son cümle yeri değiştiriyor: cam kutusu «now behind the garage, not next to the door». Kapıyı yazan öğrenci eski yeri almış olur.",
            },
          ],
        },
        {
          id: "en-a2-03-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "At a meeting",
              genreTr: "Toplantıda",
              situation: "Bir kişi bina toplantısında söz alıyor.",
              plays: 2,
              segments: [
                { text: "I know the rules say no music after ten. But I finish work at half past nine and I need thirty minutes with the guitar. Could we say half past ten, only on Friday?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Binada bir anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The blue bags are for plastic and the yellow bags are for paper. Please do not put food in either of them. Food goes in the brown bin in the yard." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir dinleyici konuşuyor.",
              plays: 2,
              segments: [
                { text: "I lived in that building for nine years and I never met the family on the top floor. Then the lift broke, we walked up together every day, and now we eat together on Sundays." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi bina ofisini arıyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is flat 7. There is water coming through my kitchen ceiling and I think it comes from the flat above me. Nobody answers the door there. Can somebody come today?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Eski bir evde oturan biri konuşuyor.",
              plays: 2,
              segments: [
                { text: "A lot of people think an old building is always cold. Our house is from 1910 and the walls are thick. In August it is the coolest place in the street, and in winter we pay less than my sister in her new flat." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-03-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Complaining about a neighbour's music", "Asking for a change to a rule", "Saying sorry for the music"],
              answer: 1,
              explain:
                "Konuşmacı kuralı biliyor ve bir istisna öneriyor: «Could we say half past ten, only on Friday?». Şikâyet eden değil, çalan kişi kendisi; özür de dilemiyor, izin istiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the announcement about?",
              options: ["A new price for the bags", "The times of the collection", "How to separate the rubbish"],
              answer: 2,
              explain:
                "Anons üç kabı ayırıyor: mavi torba plastik, sarı torba kâğıt, yemek ise «the brown bin in the yard». Fiyat ve toplama saati kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Saying how she met her neighbours", "Complaining about the broken lift in the building", "Inviting people for Sunday"],
              answer: 0,
              explain:
                "Anlatı bir tanışma hikâyesi: dokuz yıl boyunca üst kattaki aileyi hiç görmemiş, «Then the lift broke, we walked up together every day». Asansörden şikâyet etmiyor, tersine onu iyi bir şeyin başlangıcı sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person calling?",
              options: ["To say that a neighbour is away", "To report a problem in the flat", "To ask for a new kitchen"],
              answer: 1,
              explain:
                "Arayan bir arıza bildiriyor: «There is water coming through my kitchen ceiling». Üst kattan kimsenin kapıyı açmaması bir ayrıntı, aramanın sebebi değil; yeni mutfak istemiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-03-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Correcting a common idea", "Selling an old house", "Asking about heating costs"],
              answer: 0,
              explain:
                "Konuşmacı yaygın inancı anıp çürütüyor: «A lot of people think an old building is always cold», ama duvarlar kalın ve kışın kız kardeşinden az ödüyorlar. Satış ya da soru yok.",
            },
          ],
        },
        {
          id: "en-a2-03-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. Why did each person move house? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi neden taşındı? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The rent went up." },
            { key: "b", label: "The journey to work was too long." },
            { key: "c", label: "There was too much noise at night." },
            { key: "d", label: "The family got bigger." },
            { key: "e", label: "The flat was too cold in winter." },
            { key: "f", label: "The neighbours changed." },
            { key: "g", label: "The building was sold." },
            { key: "h", label: "There was no garden for the dog." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı eski dairesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "The flat was fine for two people. Then the twins arrived and suddenly two rooms were not enough." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı eski mahallesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I loved that street and I loved the flat. But I sat in the bus for eighty minutes every morning and eighty minutes every evening. In the end I could not do it any more." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı ilk kışını anlatıyor.",
              plays: 2,
              segments: [
                { text: "In the first winter I paid two hundred a month for heating and I still wore a jacket in the kitchen. The windows were from 1970." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı alt kattaki komşularından söz ediyor.",
              plays: 2,
              segments: [
                { text: "Every night from eleven the music started under my floor. I spoke to them four times. They were friendly, and nothing changed." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı gelen bir mektuptan söz ediyor.",
              plays: 2,
              segments: [
                { text: "We had the same price for six years. Then a letter came: from January, three hundred more. For that money we found something bigger in the next town." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-03-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "d",
              explain:
                "Daire iki kişiye yetiyordu, sonra «the twins arrived and suddenly two rooms were not enough» — aile büyüdü. Kira, ısınma ya da gürültü hiç anılmıyor.",
            },
            {
              kind: "match",
              id: "en-a2-03-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı sokağı da daireyi de sevdiğini söylüyor; tek sorun yol: «eighty minutes every morning and eighty minutes every evening». Komşulardan ya da fiyattan hiç söz etmiyor.",
            },
            {
              kind: "match",
              id: "en-a2-03-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "Ayda iki yüz ısınmaya gitmesine rağmen «I still wore a jacket in the kitchen» — daire soğuktu. Yüksek fatura kiranın artması değil, soğuğun sonucu.",
            },
            {
              kind: "match",
              id: "en-a2-03-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Müzik her gece on birde başlıyor ve dört konuşmadan sonra bile «nothing changed». Komşular değişmedi, davranışları değişmedi; sorun gece gürültüsü.",
            },
            {
              kind: "match",
              id: "en-a2-03-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "a",
              explain:
                "Altı yıl aynı fiyattan sonra mektup geliyor: «from January, three hundred more». Bina satılmıyor, kira artıyor; taşınma bu zamdan sonra geliyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write an email and a short text about an experience.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve bir deneyim üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-03-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are away for two weeks and your friend Kiran will look after your flat. Write an email to Kiran. Write about 50 words. Answer all three points.",
          promptTr:
            "İki hafta şehir dışındasın ve arkadaşın Kiran evine bakacak. Kiran'a bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say where the key is.", tr: "Anahtarın nerede olduğunu söyle." },
              { de: "Say what Kiran must do in the flat.", tr: "Kiran'ın evde ne yapması gerektiğini söyle." },
              { de: "Say what he should do if there is a problem.", tr: "Bir sorun olursa ne yapması gerektiğini söyle." },
            ],
            sample: `Hi Kiran,

Thank you very much! The key is with my neighbour in flat 9. He is at home after five.

Please water the plants twice a week and take the post out of the box.

If there is a problem with the water, call the office. The number is on the fridge.

See you in two weeks!
Sanne`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Anahtarın yeri somut mu verildi? (kim, nerede, ne zaman)",
              "Yapılacak işler emir ya da rica kipiyle mi yazıldı? (Please water … / Can you …)",
              "Sorun durumu bir koşul cümlesiyle mi kuruldu? (If there is …)",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-03-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a problem you had in a home. Say what the problem was, what you did and how it ended. Write about 60 words.",
          promptTr:
            "Bir evde yaşadığın bir sorunu anlat. Sorunun ne olduğunu, ne yaptığını ve nasıl bittiğini yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what the problem was.", tr: "Sorunun ne olduğunu söyle." },
              { de: "Say what you did.", tr: "Ne yaptığını söyle." },
              { de: "Say how it ended.", tr: "Nasıl bittiğini söyle." },
            ],
            sample: `Last winter the heating in our flat stopped in the middle of January. The rooms were cold and my son was ill. I called the office three times, but nobody came. Then I wrote a letter and I gave a copy to the neighbours. Two days later a man came and repaired it. Now the flat is warm, but I still keep the letter.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (was, went, wrote, came) doğru mu?",
              "Olaylar sıra bildiren sözcüklerle mi bağlandı? (then, two days later, in the end)",
              "Yaklaşık 60 kelime yazıldı mı?",
              "Sonuç açıkça söylendi mi, yoksa hikâye ortada mı kaldı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: an interview, a photograph, and a decision you make together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, fotoğraf anlatma ve birlikte karar verme.",
      tasks: [
        {
          id: "en-a2-03-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your home and your neighbours. Answer in full sentences.",
          promptTr: "Sana evin ve komşuların hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Tell me about the place where you live. Is it a flat or a house?", tr: "İyi günler. Yaşadığın yeri anlat. Daire mi ev mi?" },
            { who: "you", hint: "Evini ve bir odasını kısaca anlat.", expect: "yaşadığı yeri tam bir cümleyle betimlemek", seconds: 30 },
            { who: "partner", de: "Thank you. Do you know your neighbours well? Why, or why not?", tr: "Teşekkürler. Komşularını iyi tanır mısın? Neden ya da neden değil?" },
            { who: "you", hint: "Cevabını bir gerekçeyle destekle.", expect: "bir durumu gerekçesiyle açıklamak", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a time when you moved to a new home.", tr: "İlginç. Yeni bir eve taşındığın bir zamanı anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir taşınma anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "answer with full sentences", tr: "Tam cümlelerle cevap vermek" },
              { de: "give a reason", tr: "Bir gerekçe vermek" },
              { de: "use the past simple in the last answer", tr: "Son cevapta geçmiş zamanı kullanmak" },
            ],
            sample:
              "I live in a flat on the fourth floor. It has two rooms and a small balcony. I know two neighbours well because we take the same bus in the morning. Last year I moved from a village to the city. My brother helped me and we carried everything in one day.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Gerekçe verildi mi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Yer bildiren ifadeler kullanıldı mı? (on the fourth floor, next to …)",
            ],
          },
        },
        {
          id: "en-a2-03-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a family is moving into a flat. Two men are carrying a sofa up the stairs. A child is sitting on a box and a neighbour is watching from her door. Say what you see, what the people are doing, and whether you like moving day.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: bir aile bir daireye taşınıyor. İki adam merdivenden kanepe çıkarıyor. Bir çocuk kutunun üstünde oturuyor ve bir komşu kapısından izliyor. Ne gördüğünü, insanların ne yaptığını ve taşınma gününü sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like moving day", tr: "Taşınma gününü sevip sevmediğini söyle" },
            ],
            sample:
              "This is a moving day in an old building. Two men are carrying a big sofa up the stairs and they look tired. In front of them a little girl is sitting on a box and she is eating an apple. Behind her a neighbour is watching from her door. I do not like moving day because it is always long and something always breaks.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in front of, behind, next to)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-03-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your building has 500 pounds for one thing this year. Talk with me about the ideas and choose one together.",
          promptTr:
            "Binanızın bu yıl tek bir iş için 500 poundu var. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: new lights for the stairs, a bench and two trees in the yard, or a room for bikes. What do you think about the lights?", tr: "Üç fikir var: merdivene yeni lambalar, avluya bir bank ve iki ağaç, ya da bisiklet odası. Lambalar hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Lambalar hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But the stairs are only dark in winter, and a bike room helps every day. Is the bike room a better idea?", tr: "Anlıyorum. Ama merdiven yalnız kışın karanlık, bisiklet odası ise her gün işe yarıyor. Bisiklet odası daha mı iyi bir fikir?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So what do we choose for the building?", tr: "Peki. Bina için hangisini seçiyoruz?" },
            { who: "you", hint: "Bir seçim yap ve kısa bir gerekçe ver.", expect: "ortak bir karara varmak ve gerekçelendirmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "give your opinion with a reason", tr: "Görüşünü gerekçesiyle söylemek" },
              { de: "react to the other person", tr: "Karşı tarafa karşılık vermek" },
              { de: "make a decision together", tr: "Birlikte bir karara varmak" },
            ],
            sample:
              "I think the lights are important because a lot of older people live here and the stairs are dangerous in the dark. You are right, the bike room helps every day, but it is only for young people. So let us choose the lights, and next year we can look at the bikes again.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Yalnız kendi fikirleri sıralanmadı, karşılıklı bir konuşma oldu mu?",
            ],
          },
        },
      ],
    },
  ],
};

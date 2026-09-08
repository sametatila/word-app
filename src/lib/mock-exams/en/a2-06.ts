import type { MockPaper } from "../types";

/**
 * A2 · Deneme 6 — "Weather, Seasons and Plans".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Hava ve mevsimler A2
 * için verimli çünkü seviyenin iki ana yapısını aynı anda zorunlu kılıyor:
 * gelecek planı (`going to` / `will`) ve karşılaştırma. Koşul cümlesi de
 * burada uydurulmadan, hava tahmini bağlamında doğal olarak çıkıyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`. Üçüncü tip
 * koşul, ortaç öbeği ve devrik yapı yok.
 */
export const EN_A2_06: MockPaper = {
  id: "en-a2-06",
  course: "en",
  level: "A2",
  no: 6,
  theme: "Weather, Seasons and Plans",
  themeTr: "Hava, mevsimler ve planlar",
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
          id: "en-a2-06-l1",
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
              title: "Sunday or Saturday?",
              body: `Hi Wim, the weather for Sunday is bad: rain all day and wind in the afternoon. I think we go on Saturday instead. The museum is open both days, so we can decide in the morning.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice at a lake",
              genreTr: "Göl duyurusu",
              title: "SWIMMING LAKE",
              body: `The lake is open when the water is over eighteen degrees. In May and June we open at ten, in July and August at eight. If the flag is red, do not go in the water.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "Your holiday flat",
              body: `Dear Ms Koc, thank you for your booking in September. The heating works from the first of October, so bring a warm jumper. The beach is five minutes away, but the water is cold after August.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Note for a neighbour",
              genreTr: "Komşuya not",
              title: "Snow tonight",
              body: `Ilan, snow is coming tonight. Please move your car before ten; the men clear the street at six in the morning. My son can help you with the small one. Do not put salt on the plants!`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message to a group",
              genreTr: "Gruba ileti",
              title: "Saturday walk",
              body: `The walk on Saturday starts at nine, not at ten, because it gets dark early now. Bring a jacket and something to drink. If it rains before eight, I send a message and we go the week after.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-06-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the writer suggest?",
              options: ["Going one day earlier", "Going to the museum on Sunday", "Waiting until next week"],
              answer: 0,
              explain:
                "İleti günü öne alıyor: «I think we go on Saturday instead», çünkü pazar yağmurlu. Müze iki gün de açık, yani müze pazarı kurtarmıyor; gelecek hafta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l1-2",
              no: 2,
              ref: "m2",
              text: "When does the lake open in July?",
              options: ["When the flag is red", "At ten", "At eight"],
              answer: 2,
              explain:
                "Duyuru ayları ikiye ayırıyor: «In May and June we open at ten, in July and August at eight». Kırmızı bayrak açılış saati değil, suya girme yasağı.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the email tell the guest?",
              options: ["The heating is not working", "She should bring warm clothes", "The beach is far from the flat"],
              answer: 1,
              explain:
                "E-posta bir öneri veriyor: «so bring a warm jumper», çünkü ısıtma ekimin birinde başlıyor ve konuk eylülde geliyor. Isıtma bozuk değil, henüz açılmamış; plaj ise beş dakika uzakta.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l1-4",
              no: 4,
              ref: "m4",
              text: "What must Ilan do tonight?",
              options: ["Move his car", "Clear the street at six", "Put salt on the plants"],
              answer: 0,
              explain:
                "Not tek bir iş veriyor: «Please move your car before ten». Sokağı temizleyen görevliler, tuz ise açıkça yasaklanan şey.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l1-5",
              no: 5,
              ref: "m5",
              text: "What happens if it rains at seven in the morning?",
              options: ["The walk starts at ten", "Everybody brings a jacket and a drink", "The walk moves to another week"],
              answer: 2,
              explain:
                "Koşul iletide yazılı: «If it rains before eight, I send a message and we go the week after». Yedi, sekizden önce; ceket her durumda getiriliyor, saat ise dokuza çekilmiş durumda.",
            },
          ],
        },
        {
          id: "en-a2-06-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Winter Swimming Group", body: "Every Saturday at eight, all winter. Ten minutes in the water, then hot tea. New people always come with a partner. Free." },
            { key: "b", label: "Snow Clearing", body: "We clear your path and your car before seven in the morning, from December to February. Forty euros a month." },
            { key: "c", label: "Garden in April", body: "Six Saturday mornings. What to plant and when to plant it. Small groups, in the school garden. Bring gloves; the tools are here." },
            { key: "d", label: "Summer Camp for Children", body: "Two weeks in July, from nine to four. Sport, water and a small forest. Six to twelve years. Lunch included." },
            { key: "e", label: "Umbrella Repair", body: "At the market, first Saturday of the month. Most repairs in fifteen minutes, from three euros. We do not repair small folding ones." },
            { key: "f", label: "Ski Bus", body: "Every Saturday and Sunday in the season. Leaves the station at six and comes back at seven in the evening. Twenty euros, no booking." },
            { key: "g", label: "Weather Photos", body: "An evening course for people with a camera. We go out in bad weather, because that is when the light is interesting. Four Thursdays." },
            { key: "h", label: "Warm Room", body: "Open every afternoon from November to March. Free tea, newspapers and light. Everybody is welcome and nobody asks questions." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-06-l2-6",
              no: 6,
              text: "Tara has two children of eight and ten and she works all July.",
              answer: "d",
              explain:
                "İlan hem ayı hem yaşı veriyor: «Two weeks in July, from nine to four» ve «Six to twelve years». Sekiz ve on bu aralığa giriyor; saatler de bir iş gününü kapatıyor.",
            },
            {
              kind: "match",
              id: "en-a2-06-l2-7",
              no: 7,
              text: "Nuri goes to the mountains at the weekend and has no car.",
              answer: "f",
              explain:
                "İlan tam bu boşluğu dolduruyor: «Every Saturday and Sunday in the season», istasyondan kalkıyor ve rezervasyon istemiyor. Arabası olmayan biri için ulaşım sorunu böyle çözülüyor.",
            },
            {
              kind: "match",
              id: "en-a2-06-l2-8",
              no: 8,
              text: "Elia is often cold at home in the winter and does not like to be alone.",
              answer: "h",
              explain:
                "İlan iki ihtiyacı birden karşılıyor: «Open every afternoon from November to March» ve «Everybody is welcome and nobody asks questions». Kışın sıcak ve kalabalık bir yer.",
            },
            {
              kind: "match",
              id: "en-a2-06-l2-9",
              no: 9,
              text: "Wim wants to learn what to put in his garden and when.",
              answer: "c",
              explain:
                "İlan konuyu birebir adlandırıyor: «What to plant and when to plant it», altı cumartesi sabahı. Fotoğraf kursu (g) da dışarıda geçiyor ama bahçeyle ilgisi yok.",
            },
            {
              kind: "match",
              id: "en-a2-06-l2-10",
              no: 10,
              text: "Jara has an old umbrella from her mother and does not want to throw it away.",
              answer: "e",
              explain:
                "İlan nesneyi adıyla anıyor: «Most repairs in fifteen minutes, from three euros». Küçük katlanır şemsiyeler dışarıda ama Jara'nınki annesinden kalma eski bir şemsiye.",
            },
          ],
        },
        {
          id: "en-a2-06-l3",
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
              title: "The winter I stopped waiting for good weather",
              body: `Two years ago I decided to walk for thirty minutes every day, in any weather. My friends said I would stop in November. They were nearly right, and here is what saved it.

The first mistake was clothes. I had a good jacket and terrible shoes, and wet feet stop a walk faster than rain does. In December I bought one pair of proper boots. That was the whole change.

The second thing was time. I walked in the evening and it was dark at four, so I moved the walk to my lunch hour. Nobody at work asked where I was.

The hardest month was not January. It was March, when the weather was better and I did not have a reason to feel proud any more.

Now I walk in the morning, before work. It is colder, but the street is empty and the day starts before the day starts.`,
              gloss: [
                { de: "proper", tr: "gerçek, doğru dürüst", en: "proper" },
                { de: "boots", tr: "bot", en: "boots" },
                { de: "proud", tr: "gururlu", en: "proud" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-06-l3-11",
              no: 11,
              text: "What was the first problem?",
              options: ["The jacket was much too thin for December", "The walk was too long", "Her shoes let the water in"],
              answer: 2,
              explain:
                "Metin ceketi iyi sayıyor: «I had a good jacket and terrible shoes», sorun ayakkabılarda. «wet feet stop a walk faster than rain does» cümlesi de bunu doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l3-12",
              no: 12,
              text: "Why did she change the time of the walk?",
              options: ["Her colleagues asked questions", "There was no light after four", "The mornings were too cold"],
              answer: 1,
              explain:
                "Gerekçe cümlenin içinde: «it was dark at four, so I moved the walk to my lunch hour». İş yerinde kimse bir şey sormamış; sabah soğuğu ise bugünkü düzenin bir yanı.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l3-13",
              no: 13,
              text: "Why was March difficult?",
              options: ["She was not proud of it any more", "The weather turned bad again that month", "She had no time at lunch"],
              answer: 0,
              explain:
                "Metin ayı ve sebebi birlikte veriyor: «It was March, when the weather was better and I did not have a reason to feel proud any more». Hava kötüleşmiyor, tersine düzeliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l3-14",
              no: 14,
              text: "When does she walk now?",
              options: ["At lunch", "In the evening", "Before work"],
              answer: 2,
              explain:
                "Son paragraf: «Now I walk in the morning, before work». Öğle saati ikinci dönemin çözümü, akşam ise ilk denemesiydi.",
            },
          ],
        },
        {
          id: "en-a2-06-l4",
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
              title: "Three things about a cold flat",
              body: `I lived in a cold flat for two winters, and here is what I {{15}}.

Close the doors. A small warm room is {{16}} than a big room you never warm up.

Do not dry clothes on the heater. The room gets wet {{17}} the air cannot hold any more water.

Next winter I {{18}} put a thick curtain in front of the door, because my neighbour says it works.

And the last thing: {{19}} you feel cold at your desk, stand up and walk for two minutes.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-06-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learn", "learned", "learning"],
              answer: 1,
              explain:
                "Cümlenin ilk yarısı kapanmış bir dönemi anlatıyor: «I lived in a cold flat for two winters». Bu yüzden öğrenme de geçmişe ait: `learned`. `learn` geniş zaman, `learning` ise yardımcı fiil olmadan yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["better", "good", "the best"],
              answer: 0,
              explain:
                "Boşluktan sonra `than` var; `than` karşılaştırma derecesi ister ve `good` sıfatının karşılaştırması `better`dır. `the best` en üstünlük derecesidir ve `than` ile kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 2,
              explain:
                "İkinci yarı odanın neden nemlendiğini açıklıyor: hava daha fazla su tutamıyor. `because` sebebi verir. `so` sonuç bildirir ve yönü ters çevirir; `but` ise karşıtlık ister.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "am going to", "goes to"],
              answer: 1,
              explain:
                "Zaman belirteci `Next winter`, yani gelecek; planlanmış bir gelecek için `am going to + fiil` kullanılır. `went to` geçmiş, `goes to` ise birinci tekil kişiyle uyuşmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["when", "so", "because"],
              answer: 0,
              explain:
                "Cümle bir durumu öğüde bağlıyor: masanda üşüdüğün zaman kalk ve yürü. `when` bu koşullu zamanı verir. `so` sonuç, `because` sebep bildirir ve ikisi de baştaki yan cümleyi kuramaz.",
            },
          ],
        },
        {
          id: "en-a2-06-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the review and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Değerlendirmeyi oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Online review",
              genreTr: "İnternet değerlendirmesi",
              title: "Five days in the mountains, February",
              body: `The weather {{20}} not stop us: we walked on four of the five days.

The first morning was the coldest, {{21}} the sun came out after eleven.

We took a bus {{22}} the top of the hill and we walked down, which was much easier.

There was snow everywhere, so we could not see the path {{23}} all.

If you go in February, take boots {{24}} are really waterproof.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-06-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["did"],
              explain:
                "Geçmiş zamanın olumsuzu `did not + yalın fiil` ile kurulur: «The weather did not stop us». Cümlenin ikinci yarısı da geçmiş («we walked»); `does not` şimdiki zamana kayardı.",
            },
            {
              kind: "gap",
              id: "en-a2-06-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["but"],
              explain:
                "İki yarı karşıt: sabah en soğuk gündü, ama güneş açtı. Karşıtlığı `but` verir. `so` sonuç bildirir, `because` ise sebep kurar ve ikisi de bu beklenmedikliği taşımaz.",
            },
            {
              kind: "gap",
              id: "en-a2-06-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["to"],
              explain:
                "Yön bildiren edat `to`: «took a bus to the top». `at` bir noktada bulunmayı, `in` içinde olmayı bildirir; hareketin varış yerini yalnız `to` verir.",
            },
            {
              kind: "gap",
              id: "en-a2-06-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["at"],
              explain:
                "`not … at all` olumsuzluğu pekiştiren sabit bir kalıptır: hiç göremedik. `in all` toplamı, `for all` ise başka bir anlamı bildirir.",
            },
            {
              kind: "gap",
              id: "en-a2-06-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["that", "which"],
              explain:
                "Boşluk `boots` adını niteleyen bir yan cümle başlatıyor ve öncül cansız: `that` ya da `which` gelir. `who` yalnız kişiler için kullanılır.",
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
          id: "en-a2-06-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş pazar yürüyüşünü konuşuyor.",
              plays: 2,
              segments: [
                { text: "Is the walk still on for Sunday?" },
                { text: "They say rain from twelve." },
                { text: "Then we start at eight and finish before it." },
                { text: "Good. I bring the small tent anyway." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi kayak otobüsünü soruyor.",
              plays: 2,
              segments: [
                { text: "Hello, is the bus going on Saturday?" },
                { text: "Yes, but from the church, not from the station. There is work at the station until March." },
                { text: "Same time?" },
                { text: "Six, as always." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri kışlık bot bakıyor.",
              plays: 2,
              segments: [
                { text: "I need boots for the winter." },
                { text: "These are warm but not waterproof. Those are both, and twenty euros more." },
                { text: "I walk to work every day in the rain." },
                { text: "Then take the second ones." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Okul velilere ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Good morning. Because of the snow the school opens at ten today, not at eight. The buses run normally. Children who come early wait in the hall with a teacher." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş tatil planını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Are you going to the sea in August?" },
                { text: "In September. It is cheaper and the water is still warm." },
                { text: "And the weather?" },
                { text: "Two or three degrees less. That is not a problem for me." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-06-h1-1",
              no: 1,
              ref: "a1",
              text: "What do they decide?",
              options: ["To go on another day", "To take a tent and stay", "To start earlier"],
              answer: 2,
              explain:
                "Karar saatte: «Then we start at eight and finish before it», çünkü yağmur on ikiden sonra bekleniyor. Çadır yalnız ek bir önlem; gün değişmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h1-2",
              no: 2,
              ref: "a2",
              text: "What has changed?",
              options: ["The place the bus leaves from", "The time the bus leaves in the morning", "The price of the ticket"],
              answer: 0,
              explain:
                "Değişen kalkış yeri: «from the church, not from the station», çünkü istasyonda mart ayına kadar çalışma var. Saat için «Six, as always» deniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h1-3",
              no: 3,
              ref: "a3",
              text: "Which boots does the assistant suggest?",
              options: ["The warm ones without water protection", "The waterproof ones", "Neither"],
              answer: 1,
              explain:
                "Müşteri her gün yağmurda yürüdüğünü söyleyince görevli «Then take the second ones» diyor; ikinci çift hem sıcak hem su geçirmez, yirmi euro daha pahalı.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h1-4",
              no: 4,
              ref: "a4",
              text: "What is different today?",
              options: ["The buses are not running", "The children wait outside", "The school opens later"],
              answer: 2,
              explain:
                "İleti tek değişikliği veriyor: «the school opens at ten today, not at eight». Otobüsler normal çalışıyor ve erken gelen çocuklar dışarıda değil, salonda bekliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h1-5",
              no: 5,
              ref: "a5",
              text: "Why does the speaker go in September?",
              options: ["The weather is hotter", "It costs less", "The sea is empty"],
              answer: 1,
              explain:
                "İki gerekçe veriliyor ve ilki fiyat: «It is cheaper and the water is still warm». Hava iki üç derece DAHA SERİN, yani daha sıcak değil.",
            },
          ],
        },
        {
          id: "en-a2-06-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a summer camp. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir yaz kampı hakkında bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli velilere kampı anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Hello and thank you for coming. The camp is two weeks and it starts on the fourteenth of July. The children come at nine and go home at four. The price is two hundred euros for the two weeks, and lunch is included. Please bring a hat, a towel and shoes for the water; we have everything else. On the last Friday the parents come at three and the children cook.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Summer camp — notes",
              body: `Camp starts on:        {{6}} July
Camp is:               {{7}} weeks
Children come at:      {{8}}
Price for two weeks:   {{9}} euros
Bring a hat, a towel and shoes for the {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-06-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["14", "fourteenth", "14th"],
              explain:
                "Kayıt «it starts on the fourteenth of July» diyor. Not kâğıdında `July` basılı olduğu için boşluğa yalnız gün yazılır; rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-a2-06-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["2", "two"],
              explain:
                "«The camp is two weeks» — süre. On dört tarihtir, iki yüz ise ücret; üç sayıyı ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-a2-06-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["9", "nine"],
              explain:
                "«The children come at nine and go home at four» — geliş saati dokuz. Dört, dönüş saati; not kâğıdı geliş saatini soruyor.",
            },
            {
              kind: "gap",
              id: "en-a2-06-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["200", "two hundred"],
              explain:
                "«The price is two hundred euros for the two weeks» — iki haftanın tamamı için ücret. Not kâğıdında `euros` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-a2-06-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["water"],
              explain:
                "Kayıt getirilecekleri sayıyor: «a hat, a towel and shoes for the water». Geri kalan her şey kampta var, yani getirilmiyor.",
            },
          ],
        },
        {
          id: "en-a2-06-h3",
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
              situation: "Bir kişi göl toplantısında söz alıyor.",
              plays: 2,
              segments: [
                { text: "I know the lake closes when the water is under eighteen degrees. But it was seventeen point eight this morning and there were forty of us waiting. Could we not open on days like this?" },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Plajda anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The red flag means: do not go in the water. The yellow flag means you can swim but only near the beach. If there is no flag at all, nobody is watching." },
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
                { text: "I always thought that winter here was the hard part. Then I spent one August in the city with no garden and no water, and now I count the days to November." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir veli kamp ofisini arıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the summer camp. My daughter is on the list for July, but we now go away that week. Can she come in August instead, or is that group full?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir bisikletçi konuşuyor.",
              plays: 2,
              segments: [
                { text: "People say there is no bad weather, only bad clothes. That is true for a walk. It is not true for a bicycle at minus five, and anybody who says it is has not tried it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-06-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Complaining about the cold water", "Asking for a rule to change", "Saying sorry"],
              answer: 1,
              explain:
                "Konuşmacı kuralı biliyor ve bir esneme öneriyor: «Could we not open on days like this?». Suyun soğukluğundan şikâyet etmiyor, sınırın kıl payı kaçırıldığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h3-12",
              no: 12,
              ref: "c2",
              text: "What is the announcement about?",
              options: ["The opening hours", "The price of the beach", "What the flags mean"],
              answer: 2,
              explain:
                "Anons üç durumu ayırıyor: kırmızı bayrak yasak, sarı bayrak «only near the beach», bayrak yoksa «nobody is watching». Saat ve fiyat kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Explaining why she changed her mind", "Complaining about the winter", "Asking for advice about a city garden"],
              answer: 0,
              explain:
                "Konuşmacı eski inancını anıp bozuyor: «I always thought that winter here was the hard part», sonra bahçesiz bir ağustostan sonra «now I count the days to November» diyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the person calling?",
              options: ["To pay for the camp", "To change the week", "To ask about the price"],
              answer: 1,
              explain:
                "Arayan tarih değişikliği istiyor: «Can she come in August instead, or is that group full?». Ödeme ve fiyat kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-06-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Limiting a common saying", "Giving advice about clothes", "Advertising a bicycle"],
              answer: 0,
              explain:
                "Konuşmacı yaygın sözü kabul edip sınırlıyor: «That is true for a walk. It is not true for a bicycle at minus five». Giysi önerisi vermiyor, sözün nerede geçerli olmadığını söylüyor.",
            },
          ],
        },
        {
          id: "en-a2-06-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. Why did each person change their holiday plan? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi tatil planını neden değiştirdi? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The flights got more expensive." },
            { key: "b", label: "Somebody in the family was ill." },
            { key: "c", label: "The weather was too hot there." },
            { key: "d", label: "A friend could not come." },
            { key: "e", label: "The hotel closed." },
            { key: "f", label: "They found a cheaper place." },
            { key: "g", label: "They had to work that week." },
            { key: "h", label: "The journey was too long with children." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı güneye yaptığı plandan söz ediyor.",
              plays: 2,
              segments: [
                { text: "We had everything booked for the south. Then in May we read that it was forty degrees there in the summer, every day. With a baby that is not a holiday." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kız kardeşiyle yapacağı yolculuktan söz ediyor.",
              plays: 2,
              segments: [
                { text: "The plan was two weeks in the north with my sister. She started a new job in June and she gets no holiday in the first year. Alone it made no sense." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bilet fiyatlarından söz ediyor.",
              plays: 2,
              segments: [
                { text: "The tickets were one hundred and ten in January. In March the same flight was two hundred and forty. We went by train to the lakes instead." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı izin talebinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I asked for the second week of August and my manager said no, because two other people asked first. I take the last week of September now." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı arabayla yaptıkları yolculuktan söz ediyor.",
              plays: 2,
              segments: [
                { text: "Eleven hours in a car with a child of three is possible. It is not something you do twice. This year we go to a place two hours away." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-06-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "c",
              explain:
                "Her şey ayarlıymış, sonra sıcaklık öğrenilmiş: «it was forty degrees there in the summer, every day». Bebekle bu tatil sayılmıyor; fiyat ya da hastalık hiç anılmıyor.",
            },
            {
              kind: "match",
              id: "en-a2-06-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "d",
              explain:
                "Plan kardeşiyle birlikteydi ve o gelemiyor: «she gets no holiday in the first year. Alone it made no sense». İptalin sebebi kişi, yer değil.",
            },
            {
              kind: "match",
              id: "en-a2-06-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "a",
              explain:
                "İki fiyat yan yana veriliyor: ocakta yüz on, martta «two hundred and forty». Trenle göllere gitmek bu zammın sonucu.",
            },
            {
              kind: "match",
              id: "en-a2-06-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "g",
              explain:
                "İzin talebi reddedilmiş: «my manager said no, because two other people asked first». Ağustosun o haftasında çalışmak zorunda, bu yüzden eylüle kayıyor.",
            },
            {
              kind: "match",
              id: "en-a2-06-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "h",
              explain:
                "Sorun yolun uzunluğu: «Eleven hours in a car with a child of three … is not something you do twice». Bu yıl iki saatlik bir yer seçiliyor.",
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
          id: "en-a2-06-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your English friend Tara asks when she should visit your town. Write an email to Tara. Write about 50 words. Answer all three points.",
          promptTr:
            "İngiliz arkadaşın Tara şehrine ne zaman gelmesi gerektiğini soruyor. Tara'ya bir e-posta yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say which season is best and why.", tr: "Hangi mevsim iyi olur, neden, söyle." },
              { de: "Say what the weather is like then.", tr: "O zaman havanın nasıl olduğunu söyle." },
              { de: "Say what clothes she should bring.", tr: "Ne tür giysi getirmesi gerektiğini söyle." },
            ],
            sample: `Hi Tara,

Come in May! The town is quiet then, because the tourists come in July and August.

In May it is warm in the day, about twenty degrees, but the evenings are cool and it rains sometimes.

Bring a light jacket and good shoes for walking. We can go to the lake.

See you in May!
Jara`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Mevsim seçimi bir gerekçeyle mi verildi? (because …)",
              "Hava somut mu anlatıldı? (derece, gündüz-akşam farkı)",
              "Giysi önerisi açık mı?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-06-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a day when the weather changed your plan. Say what you wanted to do, what the weather did and what you did instead. Write about 60 words.",
          promptTr:
            "Havanın planını değiştirdiği bir günü anlat. Ne yapmak istediğini, havanın ne yaptığını ve onun yerine ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you wanted to do.", tr: "Ne yapmak istediğini söyle." },
              { de: "Say what the weather did.", tr: "Havanın ne yaptığını söyle." },
              { de: "Say what you did instead.", tr: "Onun yerine ne yaptığını söyle." },
            ],
            sample: `Last April my brother and I wanted to walk to the old castle. We took water, bread and a map, and we started at nine. After one hour the sky went black and it rained very hard for twenty minutes. We were completely wet. We ran to a small café near the river and we stayed there until two. We ate cake and we played cards. It was a better day.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (took, went, ran, ate) doğru mu?",
              "Olaylar sıra bildiren sözcüklerle mi bağlandı? (after one hour, then, until)",
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
          id: "en-a2-06-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about the weather and your plans. Answer in full sentences.",
          promptTr: "Sana hava ve planların hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What is the weather like where you live in the winter?", tr: "İyi günler. Yaşadığın yerde kışın hava nasıl olur?" },
            { who: "you", hint: "Havayı derece ve örnekle anlat.", expect: "havayı somut biçimde betimlemek", seconds: 30 },
            { who: "partner", de: "Thank you. Which season do you like best, and why?", tr: "Teşekkürler. En çok hangi mevsimi seversin, neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. What are you going to do next weekend if the weather is good?", tr: "İlginç. Hava iyi olursa gelecek hafta sonu ne yapacaksın?" },
            { who: "you", hint: "Gelecek zamanla bir plan anlat.", expect: "gelecek bir planı `going to` ile anlatmak", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe the weather concretely", tr: "Havayı somut biçimde anlatmak" },
              { de: "give a reason for the preference", tr: "Tercih için bir gerekçe vermek" },
              { de: "use `going to` for a plan", tr: "Plan için `going to` kullanmak" },
            ],
            sample:
              "In the winter it is cold here, about two or three degrees, and it rains more than it snows. I like autumn best because the light is beautiful and the town is quiet. Next weekend I am going to take the bus to the forest with my sister, if it does not rain.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Derece, mevsim ve sıklık söylenebiliyor mu?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son cevapta gelecek zaman doğru kuruldu mu?",
            ],
          },
        },
        {
          id: "en-a2-06-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a park on a cold morning in January. Two people are walking with a dog and there is snow on the grass. A woman is cleaning the snow from a bench. Say what you see, what the people are doing, and whether you like winter.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: ocak ayında soğuk bir sabah, bir park. İki kişi köpekle yürüyor ve çimende kar var. Bir kadın banktaki karı temizliyor. Ne gördüğünü, insanların ne yaptığını ve kışı sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like winter", tr: "Kışı sevip sevmediğini söyle" },
            ],
            sample:
              "This is a park on a cold morning in January. There is snow on the grass and the sky is grey. In the middle two people are walking with a big dog. Behind them a woman is cleaning the snow from a bench, and she wants to sit down. I like winter because the park is empty and everything is very quiet.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in the middle, behind, on the grass)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-06-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your group has one free day and the weather is not certain. Talk with me about the ideas and choose one together.",
          promptTr:
            "Grubunun bir boş günü var ve hava belirsiz. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a walk in the mountains, a day at the museum in the city, or a swimming pool with a warm room. What do you think about the mountains?", tr: "Üç fikir var: dağda yürüyüş, şehirdeki müzede bir gün ya da sıcak odası olan bir havuz. Dağ hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Dağ fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see your point. But they say rain after twelve, and two people in the group have no walking shoes. Is the museum a better idea?", tr: "Anlıyorum. Ama on ikiden sonra yağmur diyorlar ve grupta iki kişinin yürüyüş ayakkabısı yok. Müze daha mı iyi bir fikir?" },
            { who: "you", hint: "Karşı tarafın söylediğine gönderme yap ve katıl ya da karşı çık.", expect: "karşı tarafın söylediğine açıkça gönderme yaparak katılmak ya da karşı çıkmak", seconds: 35 },
            { who: "partner", de: "All right. So what do we choose?", tr: "Peki. Hangisini seçiyoruz?" },
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
              "I think the mountains are the best idea because we are outside all day and it costs nothing. You are right about the rain, and shoes are a real problem. If we start at eight we are back before twelve, but with two people without shoes it is not fair. So let us take the museum and go to the mountains next month.",
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

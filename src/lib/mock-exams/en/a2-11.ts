import type { MockPaper } from "../types";

/**
 * A2 · Deneme 11 — "Animals, the Vet and Looking After a Pet".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Hayvan bakımı A2 için
 * verimli: yönerge, yasak, sıklık ve fiyat aynı malzemede doğal duruyor
 * ve öğrenci başkası adına sorumluluk üstlenen bir rolde konuşuyor.
 *
 * Üçüncü görev bilerek okur mektubu ve yanıtı: dokuzuncuda öğüt yazısı,
 * onuncuda söyleşi vardı. Mektup-yanıt düzeni A2'de ilk kez geçiyor ve
 * okuma stratejisi bakımından ötekilerden ayrı — sorun birinci metinde,
 * çözüm ikincisinde duruyor.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_11: MockPaper = {
  id: "en-a2-11",
  course: "en",
  level: "A2",
  no: 11,
  theme: "Animals, the Vet and Looking After a Pet",
  themeTr: "Hayvanlar, veteriner ve bir hayvana bakmak",
  minutes: 110,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 35,
      instruction:
        "This part has five tasks. You read short texts, adverts and a letter with a reply, and you complete two short texts. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde beş görev var. Kısa metinler, ilanlar ve yanıtlı bir mektup okuyacak, sonra iki kısa metni tamamlayacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-a2-11-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note on a door",
              genreTr: "Kapıdaki not",
              title: "Until Sunday",
              body: `I am away until Sunday. The cat is inside. Please give her one small tin in the morning and fresh water. Do not let her out; she does not come back before dark and I am not here.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice at a vet",
              genreTr: "Veteriner duyurusu",
              title: "OPENING TIMES",
              body: `Open 9 to 18. Saturday 9 to 12.

For an emergency at night ring 4180.

Please bring the little book with your animal's dates. First visit: twenty euros.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "The dog is fine",
              body: `Dear Hale, the dog is fine. He ate everything and he slept on your chair, which I think is not allowed. He barks at the post every morning at eight. I am sorry about your neighbours.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice in a park",
              genreTr: "Park duyurusu",
              title: "DOGS",
              body: `On the grass without a lead.

On the path with a lead, please. There are small children on the path in the morning.

Please take the bags home with you; there is no bin here.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "The new food",
              body: `Sora, the vet says the cat must eat the new food for six weeks and nothing else. No milk, no meat from the table. I know she looks at you. Please be strong. I will ask you about it on Sunday.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-11-l1-1",
              no: 1,
              ref: "m1",
              text: "What must the neighbour not do?",
              options: ["Give the cat fresh water", "Let the cat outside", "Come to the flat before Sunday"],
              answer: 1,
              explain:
                "Not tek bir yasak taşıyor: «Do not let her out», gerekçesi de karanlıktan önce dönmemesi. Su vermek tersine isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l1-2",
              no: 2,
              ref: "m2",
              text: "What must you bring with you?",
              options: ["The book with the dates", "The twenty euros for the first visit", "A telephone number"],
              answer: 0,
              explain:
                "Duyuru bunu açıkça istiyor: «Please bring the little book with your animal's dates». Yirmi euro ilk ziyaretin ücreti, getirilecek belge değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l1-3",
              no: 3,
              ref: "m3",
              text: "What is the writer sorry about?",
              options: ["The dog is ill", "The chair is broken", "The dog wakes the neighbours"],
              answer: 2,
              explain:
                "E-posta iki şeyi bağlıyor: «He barks at the post every morning at eight. I am sorry about your neighbours». Köpek iyi ve sandalye kırılmamış.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l1-4",
              no: 4,
              ref: "m4",
              text: "What is the rule on the path?",
              options: ["Dogs are not allowed at all", "Dogs must be on a lead", "Dogs may run on the path"],
              answer: 1,
              explain:
                "Duyuru iki yeri ayırıyor: «On the grass without a lead. On the path with a lead, please», gerekçesi de yoldaki küçük çocuklar.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l1-5",
              no: 5,
              ref: "m5",
              text: "What does the writer ask?",
              options: ["To give the cat milk", "To take the cat to the vet", "To give only the new food"],
              answer: 2,
              explain:
                "İleti kuralı ve süreyi veriyor: «the new food for six weeks and nothing else. No milk, no meat from the table».",
            },
          ],
        },
        {
          id: "en-a2-11-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Dog School", body: "Tuesday evenings, eight weeks. For dogs that bark, pull or run away. Twelve euros an evening." },
            { key: "b", label: "Animal Home", body: "We look for the owner. Bring the animal to us or ring us; we come in the city for free." },
            { key: "c", label: "Holiday Care", body: "We keep cats, dogs and rabbits from three days to a month. Fourteen euros a day. Book two weeks before." },
            { key: "d", label: "The Vet Comes to You", body: "For old animals and for people without a car. Thursday afternoons. Thirty euros and then the treatment." },
            { key: "e", label: "Food Advice", body: "Free, Saturday mornings at the shop in Mill Street. Bring the vet's paper if you have one." },
            { key: "f", label: "Dog Walking", body: "One hour a day, ten euros. Mornings only, and only in this part of the city." },
            { key: "g", label: "Animal Photographs", body: "In your home, one hour, sixty euros. Two big pictures and thirty small ones." },
            { key: "h", label: "Cages and Boxes", body: "We lend a travel box for two euros a day. You need a card and an address in the city." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-11-l2-6",
              no: 6,
              text: "Vesna's dog barks when she is at work and the neighbours have complained.",
              answer: "a",
              explain:
                "İlan sorunu birebir sayıyor: «For dogs that bark, pull or run away», sekiz haftalık akşam kursu.",
            },
            {
              kind: "match",
              id: "en-a2-11-l2-7",
              no: 7,
              text: "Emir found a cat in the street and does not know who it belongs to.",
              answer: "b",
              explain:
                "İlan tam bu işi yapıyor: «We look for the owner», üstelik şehir içinde ücretsiz geliyorlar.",
            },
            {
              kind: "match",
              id: "en-a2-11-l2-8",
              no: 8,
              text: "Nils goes away for two weeks and cannot take his rabbit.",
              answer: "c",
              explain:
                "İlan hem hayvanı hem süreyi veriyor: «cats, dogs and rabbits from three days to a month». İki hafta bu aralığın içinde.",
            },
            {
              kind: "match",
              id: "en-a2-11-l2-9",
              no: 9,
              text: "Sora's old dog cannot walk far any more and she has no car.",
              answer: "d",
              explain:
                "İlan iki koşulu birden karşılıyor: «For old animals and for people without a car».",
            },
            {
              kind: "match",
              id: "en-a2-11-l2-10",
              no: 10,
              text: "Hale wants to know what to feed a cat with bad teeth.",
              answer: "e",
              explain:
                "İlan ücretsiz beslenme danışmanlığı veriyor ve veteriner kâğıdını istiyor: «Bring the vet's paper if you have one».",
            },
          ],
        },
        {
          id: "en-a2-11-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the letter and the reply, and questions 11 to 14. Choose a, b or c.",
          promptTr: "Mektubu ve yanıtı, sonra 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Letter and reply",
              genreTr: "Mektup ve yanıt",
              title: "He cannot be alone",
              body: `Dear Animal Life,

We got a dog in March. He is two years old and he came from the animal home. Everything is good except one thing: he cannot be alone.

When I go to the shop for twenty minutes, he cries. The neighbour told us and she was very kind about it. Now I take him everywhere, and that is not a life for me.

Vesna Roth

Dear Vesna,

Thank you for a letter that a great many people could have written.

Do not start with twenty minutes. Start with twenty seconds. Go out of the door, count to twenty, come back and say nothing. Do that four times a day for a week.

The hardest part is the coming back. Most people say hello in a big voice, and the dog learns that your return is the best moment of the day. Say nothing for two minutes.

And do not stop taking him out. A tired dog waits better than a bored one.

The Editor`,
              gloss: [
                { de: "an owner", tr: "sahip", en: "owner" },
                { de: "bored", tr: "canı sıkkın", en: "bored" },
                { de: "a lead", tr: "tasma kayışı", en: "lead" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-11-l3-11",
              no: 11,
              text: "What is Vesna's problem?",
              options: ["The dog cannot be alone", "The dog is much too old", "The neighbour is angry with her"],
              answer: 0,
              explain:
                "Mektup sorunu tek cümlede veriyor: «Everything is good except one thing: he cannot be alone». Komşu kibar davranmış, kızgın değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l3-12",
              no: 12,
              text: "What does the editor say about the time?",
              options: ["Twenty minutes is enough", "Four hours a day is better", "Begin with a much shorter time"],
              answer: 2,
              explain:
                "Yanıt süreyi küçültüyor: «Do not start with twenty minutes. Start with twenty seconds», ve bunu günde dört kez öneriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l3-13",
              no: 13,
              text: "Which part is the hardest?",
              options: ["Going out of the door", "Coming back home", "Counting to twenty"],
              answer: 1,
              explain:
                "Yanıt bunu adlandırıyor: «The hardest part is the coming back», çünkü yüksek sesle selamlamak dönüşü günün en iyi anı hâline getiriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l3-14",
              no: 14,
              text: "What else should Vesna do?",
              options: ["Keep taking the dog out", "Ask the neighbour for help", "Take the dog back"],
              answer: 0,
              explain:
                "Yanıtın son satırı bunu istiyor: «do not stop taking him out. A tired dog waits better than a bored one».",
            },
          ],
        },
        {
          id: "en-a2-11-l4",
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
              title: "Our cat and eighteen hours",
              body: `We got our cat in 2019, and here is what I {{15}}.

A cat from the animal home is {{16}} than a young one from a shop. She was four and she knew everything already.

She sleeps eighteen hours a day, {{17}} she is awake at exactly five in the morning.

Next month I {{18}} buy a second bowl, because she does not like the water next to the food.

And one more thing: {{19}} you go on holiday, book the animal care early. In August everything is full.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-11-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learn", "learning", "learned"],
              answer: 2,
              explain:
                "Cümlenin ilk yarısı kapanmış bir olayı anlatıyor: «We got our cat in 2019». Öğrenme de geçmişe ait: `learned`.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["easy", "easier", "the easiest"],
              answer: 1,
              explain:
                "Boşluktan sonra `than` var ve `than` karşılaştırma derecesi ister: `easier`. `the easiest` en üstünlük derecesidir ve `than` almaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["but", "so", "because"],
              answer: 0,
              explain:
                "İki bilgi karşıt: günde on sekiz saat uyuyor ama tam beşte uyanık. Karşıtlığı `but` kurar.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "goes to", "am going to"],
              answer: 2,
              explain:
                "Zaman belirteci `Next month`, yani gelecek; planlanmış bir gelecek `am going to + fiil` ile kurulur.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["so", "when", "because"],
              answer: 1,
              explain:
                "Cümle bir durumu öğüde bağlıyor: tatile çıktığın zaman erken yer ayırt. `when` bu zamanı verir.",
            },
          ],
        },
        {
          id: "en-a2-11-l5",
          no: 5,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 20 to 24. Write ONE word in each gap.",
          promptTr: "Metni oku ve 20–24. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "Two winters outside",
              body: `Our cat was born {{20}} 2015 and she came to us four years later.

She lived {{21}} her own in the street for two winters before that.

She is quieter {{22}} our old cat, and much smaller.

She sits on the window every evening {{23}} six o'clock.

I have two good chairs in the kitchen and I still {{24}} not sit on either of them.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-11-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["in"],
              explain:
                "Yıllarla `in` kullanılır: `in 2015`. `on` belirli bir gün için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-11-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["on"],
              explain:
                "`on her own` tek başına anlamında yerleşik bir öbektir. `in her own` ya da `by her own` diye bir kalıp yoktur; `by herself` ayrı bir yapıdır.",
            },
            {
              kind: "gap",
              id: "en-a2-11-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["than"],
              explain:
                "`quieter` bir karşılaştırma biçimidir ve karşılaştırılan şey `than` ile bağlanır.",
            },
            {
              kind: "gap",
              id: "en-a2-11-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["at"],
              explain:
                "Saatlerle `at` kullanılır: `at six o'clock`. `in` ay ve yıl için, `on` ise gün için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-11-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["do"],
              explain:
                "Geniş zamanın olumsuzu `do not + yalın fiil` ile kurulur ve özne birinci tekil kişi: «I still do not sit».",
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
        "This part has four tasks. You hear conversations, some information and five short speakers. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, bir bilgilendirme ve beş kısa konuşmacı dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-a2-11-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear five short conversations, questions 1 to 5. Choose a, b or c. You hear every recording twice.",
          promptTr: "Beş kısa konuşma dinleyeceksin, 1–5. maddeler. a, b ya da c'yi seç. Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir kişi veterineri arıyor.",
              plays: 2,
              segments: [
                { text: "My cat is not eating. Since yesterday." },
                { text: "Can you come at four?" },
                { text: "Yes, I can." },
                { text: "Good. Bring the little book with her dates." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş tatil bakımını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Two weeks in Italy? And the rabbit?" },
                { text: "The animal care takes him." },
                { text: "How much?" },
                { text: "Fourteen a day. That is more than the flight." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At the vet",
              genreTr: "Veterinerde",
              situation: "Bir sahip kedisinin durumunu soruyor.",
              plays: 2,
              segments: [
                { text: "Is it serious?" },
                { text: "No. It is a tooth. We take it out on Thursday." },
                { text: "And after that?" },
                { text: "Soft food for ten days, then normal food again." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Parkta köpekler için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "A reminder about dogs. On the path please use a lead, because of the children. On the grass your dog can run. And please take the bags home; the bin here is broken." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Biri bulunan kediyle ilgili ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi Emir, it is Nils. The cat you found is from number 14. The family was away and the door was open. They are very happy. Thank you!" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-11-h1-1",
              no: 1,
              ref: "a1",
              text: "What must the woman bring?",
              options: ["The book with the dates", "The cat's own food", "Twenty euros in cash"],
              answer: 0,
              explain:
                "Görevli son cümlede bunu istiyor: «Bring the little book with her dates». Yemek ve para hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h1-2",
              no: 2,
              ref: "a2",
              text: "What surprises the first speaker?",
              options: ["The flight is expensive", "The rabbit is ill", "The care costs a lot"],
              answer: 2,
              explain:
                "Konuşmacı karşılaştırma yapıyor: «Fourteen a day. That is more than the flight».",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h1-3",
              no: 3,
              ref: "a3",
              text: "What happens on Thursday?",
              options: ["The cat comes home", "The tooth comes out", "The food changes for ever"],
              answer: 1,
              explain:
                "Veteriner günü ve işi birlikte veriyor: «It is a tooth. We take it out on Thursday». Yumuşak yemek yalnız on gün.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h1-4",
              no: 4,
              ref: "a4",
              text: "What must people take home?",
              options: ["The bags", "The lead", "The children"],
              answer: 0,
              explain:
                "Anons gerekçesiyle birlikte istiyor: «please take the bags home; the bin here is broken».",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h1-5",
              no: 5,
              ref: "a5",
              text: "What has happened?",
              options: ["The cat is at the vet", "The owner is found", "The cat is lost again"],
              answer: 1,
              explain:
                "İleti sahibi buluyor: «The cat you found is from number 14», ve aile çok mutlu.",
            },
          ],
        },
        {
          id: "en-a2-11-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information from an animal care place. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir hayvan bakım yerinden bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli bakım yerini anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. We keep cats, dogs and rabbits. We are open from eight to six, and on Sunday from ten. It is fourteen euros a day for a cat and eighteen for a dog. Please book two weeks before; in August we are always full. And bring the food your animal knows — we do not change it here.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Animal care — notes",
              body: `Open from eight to: {{6}}
On Sunday from:     {{7}}
A cat costs:        {{8}} euros a day
Book:               {{9}} weeks before
Please bring the:   {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-11-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["6", "six"],
              explain:
                "«We are open from eight to six» — kapanış saati. Not kâğıdında sekiz basılı olduğu için boşluğa ikinci saat geliyor.",
            },
            {
              kind: "gap",
              id: "en-a2-11-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["10", "ten"],
              explain:
                "«on Sunday from ten» — pazar günü açılış saati. Sekiz hafta içi açılışı.",
            },
            {
              kind: "gap",
              id: "en-a2-11-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["14", "fourteen"],
              explain:
                "«fourteen euros a day for a cat and eighteen for a dog» — kedi ücreti. On sekiz köpek için.",
            },
            {
              kind: "gap",
              id: "en-a2-11-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["2", "two"],
              explain:
                "«Please book two weeks before» — yer ayırtma süresi. Ağustosta her yer dolu.",
            },
            {
              kind: "gap",
              id: "en-a2-11-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["food"],
              explain:
                "Kayıt gerekçesiyle birlikte istiyor: «bring the food your animal knows — we do not change it here».",
            },
          ],
        },
        {
          id: "en-a2-11-h3",
          no: 3,
          format: "mcq",
          goal: "gist",
          prompt: "You hear five short speakers, questions 11 to 15. What is each person doing? You hear every recording twice.",
          promptTr: "Beş kısa konuşmacı dinleyeceksin, 11–15. maddeler. Her kişi ne yapıyor? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici köpek okulunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "The dog school was twelve euros an evening for eight weeks and I said no three times. Then I counted what I paid the neighbour in flowers and apologies. I went in October." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Veterinerde pazartesi için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The vet is closed on Monday morning. Doctor Sora is at the animal home. For an emergency ring 4180. We open again at two." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici kedi ve köpeği karşılaştırıyor.",
              plays: 2,
              segments: [
                { text: "People say a cat is easy and a dog is work. My cat costs me four hundred euros a year and sleeps on my head. Easy is not the word. Quiet is the word." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir sahip randevusunu değiştirmek istiyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is about Thursday. I cannot bring the dog at four, because my train is late. Can I come at half past five, or is that too late for you?" },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici geç öğrendiği bir şeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "I took the old dog to the vet for two years in a taxi. Sixteen euros there and sixteen back, every month. Then somebody told me the vet comes to the house on Thursdays. Two years." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-11-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Complaining about the price", "Recommending the neighbour", "Explaining why she changed her mind"],
              answer: 2,
              explain:
                "Konuşmacı üç kez hayır demiş, sonra komşuya ödediği çiçek ve özürleri saymış: «I went in October». Yani fikir değişimini anlatıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h3-12",
              no: 12,
              ref: "c2",
              text: "What does the announcement say?",
              options: ["The vet opens in the afternoon", "The vet is closed all week", "The telephone number has changed"],
              answer: 0,
              explain:
                "Anons yalnız pazartesi sabahını kapatıyor: «We open again at two». Numara aynı kalıyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Saying that cats are better", "Correcting a common idea", "Asking other people for advice"],
              answer: 1,
              explain:
                "Konuşmacı yaygın inancı anıp düzeltiyor: «People say a cat is easy … Easy is not the word. Quiet is the word».",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the woman calling?",
              options: ["To cancel the visit", "To ask about the price", "To change the time"],
              answer: 2,
              explain:
                "Arayan yeni bir saat öneriyor: «Can I come at half past five?», çünkü treni gecikiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-11-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Saying she wasted money for a long time", "Complaining about the taxi driver", "Explaining why she stopped going"],
              answer: 0,
              explain:
                "Konuşmacı hesabı ve süreyi veriyor: «Sixteen euros there and sixteen back, every month», iki yıl boyunca — oysa «the vet comes to the house on Thursdays».",
            },
          ],
        },
        {
          id: "en-a2-11-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. What does each person find difficult? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi neyi zor buluyor? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "Leaving the animal alone." },
            { key: "b", label: "Paying for the food." },
            { key: "c", label: "Getting to the vet." },
            { key: "d", label: "The animal does not eat." },
            { key: "e", label: "The neighbours complain." },
            { key: "f", label: "Finding care for the holidays." },
            { key: "g", label: "The animal wakes them early." },
            { key: "h", label: "Walking far enough every day." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı temmuz planını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Two weeks in July, and everything is booked by March. I ring in April like somebody who has never had an animal, and every year I am surprised." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı köpeğinin davranışını anlatıyor.",
              plays: 2,
              segments: [
                { text: "He is fine for three hours and then he cries. I have not been to the cinema since March, and my sister thinks I am making it bigger than it is." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı sabahlarını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Five o'clock. Every morning, five o'clock, on my head. The vet says she is healthy and the internet says I should ignore her. The internet has never met her." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı ulaşımı anlatıyor.",
              plays: 2,
              segments: [
                { text: "Nine kilometres and no bus after four. My neighbour drove me twice and I cannot ask a third time. He is fifteen years old and he cannot walk to the corner." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı beslenme sorununu anlatıyor.",
              plays: 2,
              segments: [
                { text: "He looks at the food, he smells it, and he walks away. The vet says he is healthy. I have bought six different tins and he ate two of them, once." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-11-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "f",
              explain:
                "Konuşmacı zamanlamayı anlatıyor: «everything is booked by March. I ring in April», yani tatil için yer bulamıyor.",
            },
            {
              kind: "match",
              id: "en-a2-11-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı köpeğin yalnız kalamadığını anlatıyor: «He is fine for three hours and then he cries», ve marttan beri sinemaya gidememiş.",
            },
            {
              kind: "match",
              id: "en-a2-11-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "g",
              explain:
                "Konuşmacı saati iki kez söylüyor: «Every morning, five o'clock, on my head». Kedi sağlıklı, sorun uyandırma.",
            },
            {
              kind: "match",
              id: "en-a2-11-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Konuşmacı mesafeyi ve ulaşımı veriyor: «Nine kilometres and no bus after four», köpek de köşeye kadar yürüyemiyor.",
            },
            {
              kind: "match",
              id: "en-a2-11-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "d",
              explain:
                "Konuşmacı yemek sorununu anlatıyor: «He looks at the food, he smells it, and he walks away», altı ayrı konserveden yalnız ikisini bir kez yemiş.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write a message and a short text about an animal.",
      instructionTr: "Bu bölümde iki görev var: bir ileti ve bir hayvan üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-11-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You are going away and you want a place for your animal at an animal care house. Write a message to them. Write about 50 words. Answer all three points.",
          promptTr:
            "Uzağa gidiyorsun ve hayvanın için bir bakım yerinde yer istiyorsun. Onlara bir ileti yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say which animal and for which dates.", tr: "Hangi hayvan ve hangi tarihler için olduğunu söyle." },
              { de: "Ask about the price.", tr: "Fiyatı sor." },
              { de: "Say one important thing about your animal.", tr: "Hayvanınla ilgili önemli bir şeyi söyle." },
            ],
            sample: `Hello,

I would like a place for my cat from 3 to 17 August. She is six years old.

How much is it for two weeks, please?

One important thing: she takes a tablet every morning with her food. I can bring the tablets and the food.

Thank you very much!
Vesna Roth`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Tarihler açıkça verildi mi?",
              "Fiyat sorusu kibar bir kalıpla mı kuruldu? (How much is … please)",
              "Hayvanla ilgili bilgi somut mu (ilaç, yemek, alışkanlık)?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-11-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about an animal you know. Say what it is, who looks after it and one thing it does that you like or do not like. Write about 60 words.",
          promptTr:
            "Tanıdığın bir hayvanı anlat. Ne olduğunu, ona kimin baktığını ve sevdiğin ya da sevmediğin bir davranışını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what the animal is.", tr: "Hayvanın ne olduğunu söyle." },
              { de: "Say who looks after it.", tr: "Ona kimin baktığını söyle." },
              { de: "Say one thing it does.", tr: "Yaptığı bir şeyi söyle." },
            ],
            sample: `My sister has a small brown dog. His name is Nils and he is seven years old. My sister works in the morning, so our mother takes him to the park at eleven. He waits at the door twenty minutes before she comes. I like that very much, but I do not like the barking in the morning when the post arrives at eight.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Hayvan somut betimlendi mi (boyut, renk, yaş)?",
              "Geniş zaman ve sıklık ifadeleri doğru mu? (every day, at eleven)",
              "Sevilen ya da sevilmeyen davranış açıkça söylendi mi?",
              "Yaklaşık 60 kelime yazıldı mı?",
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
          id: "en-a2-11-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about animals. Answer in full sentences.",
          promptTr: "Sana hayvanlar hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Do you have an animal, or does somebody in your family?", tr: "İyi günler. Senin ya da ailenden birinin hayvanı var mı?" },
            { who: "you", hint: "Durumu anlat ve bir örnek ver.", expect: "bir durumu betimlemek ve örneklendirmek", seconds: 30 },
            { who: "partner", de: "Thank you. Is a cat or a dog better for a person who works all day? Why?", tr: "Teşekkürler. Bütün gün çalışan biri için kedi mi köpek mi daha iyi? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a time an animal was ill or lost.", tr: "İlginç. Bir hayvanın hastalandığı ya da kaybolduğu bir zamanı anlat." },
            { who: "you", hint: "Geçmiş zamanla kısa bir anı anlat.", expect: "geçmiş zamanda kısa bir anlatı vermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "answer with full sentences", tr: "Tam cümlelerle cevap vermek" },
              { de: "give a reason for the preference", tr: "Tercih için bir gerekçe vermek" },
              { de: "use the past simple in the last answer", tr: "Son cevapta geçmiş zamanı kullanmak" },
            ],
            sample:
              "My sister has a dog and I see him every Sunday. For a person who works all day I think a cat is better, because a dog cries when he is alone for four hours. Last winter our cat did not come home for two nights. We found her in the building next door, in a warm cupboard.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Sıklık ve zaman ifadeleri kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-11-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a waiting room at a vet. Four people are sitting with their animals. A woman is holding a box on her knees and a man next to her has a big dog on a lead. A child is looking at the box. Say what you see, what the people are doing, and whether you like animals.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: bir veteriner bekleme odası. Dört kişi hayvanlarıyla oturuyor. Bir kadın dizlerinde bir kutu tutuyor, yanındaki adamın tasmalı büyük bir köpeği var. Bir çocuk kutuya bakıyor. Ne gördüğünü, insanların ne yaptığını ve hayvanları sevip sevmediğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you like animals", tr: "Hayvanları sevip sevmediğini söyle" },
            ],
            sample:
              "This is a waiting room at a vet. Four people are sitting on chairs along the wall with their animals. On the left a woman is holding a box on her knees; I think there is a cat inside. Next to her a man has a big dog on a lead and the dog is sleeping. A small child is standing in front of the box and looking at it. I like animals, but I do not want one, because I am not at home in the day.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (on the left, next to, in front of)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-11-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your family is thinking about an animal. Talk with me about the ideas and choose one together.",
          promptTr:
            "Ailen bir hayvan düşünüyor. Fikirleri benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: a cat, a dog, or no animal for now. What do you think about a dog?", tr: "Üç fikir var: kedi, köpek ya da şimdilik hayvan yok. Köpek hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Köpek fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I understand. But we are all out of the house from eight to six, and a dog needs a walk in the middle of the day. Does that change anything?", tr: "Anlıyorum. Ama hepimiz sekizle altı arası evde değiliz ve bir köpeğin gün ortasında yürüyüşe ihtiyacı var. Bu bir şey değiştirir mi?" },
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
              "I would like a dog, because we all go for a walk on Sunday and a dog gives us a reason to do it every day. You are right about the middle of the day; ten hours is too long for a dog and paying somebody every day is expensive. So let us take a cat from the animal home, and we can think about a dog when I finish school.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Saat ve süre ifadeleri doğru kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

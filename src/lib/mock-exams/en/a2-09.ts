import type { MockPaper } from "../types";

/**
 * A2 · Deneme 9 — "Repairs, Machines and Waiting".
 *
 * A2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Tamir A2 için verimli
 * çünkü fiyat, süre, gün ve koşul aynı metinde zorlanmadan bir arada
 * duruyor; ayrıca öğrencinin gerçek hayatta karşılaştığı ama sekiz
 * denemenin hiçbirinde geçmeyen bir dil bu: randevu, parça bekleme,
 * ücret alınmaması.
 *
 * Üçüncü görevin yazısı bilerek birinci tekil değil: yedinci ve sekizinci
 * denemede de uzun metin kişisel anlatıydı, üçüncü kez aynı ses olmasın
 * diye burası öğüt veren bir tüketici yazısı.
 *
 * A2 SINIRI: past simple, present continuous, `going to` / `will`,
 * karşılaştırma dereceleri, `because / when / if / but / so`.
 */
export const EN_A2_09: MockPaper = {
  id: "en-a2-09",
  course: "en",
  level: "A2",
  no: 9,
  theme: "Repairs, Machines and Waiting",
  themeTr: "Tamir, makineler ve beklemek",
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
          id: "en-a2-09-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Read the five short texts and questions 1 to 5. What is the main message? Choose a, b or c.",
          promptTr: "Beş kısa metni ve 1–5. maddeleri oku. Ana mesaj nedir? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Note from a repair shop",
              genreTr: "Tamirciden not",
              title: "Your radio",
              body: `Your radio is ready. It was the cable, not the motor. Twenty-two euros. We are open until six, and on Saturday until one. Please bring this note with you.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Notice in a building",
              genreTr: "Bina duyurusu",
              title: "The lift",
              body: `The lift is out of order until Thursday. The part comes from Hamburg. If you cannot use the stairs, ring the caretaker on 214 and he will bring your shopping up.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Email",
              genreTr: "E-posta",
              title: "The machine again",
              body: `Dear Runa, the man came on Wednesday and the machine still makes a noise. He says it is normal for this model. I do not think a washing machine is normal when it walks across the kitchen. I am writing to the shop.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Notice at a shop",
              genreTr: "Dükkân duyurusu",
              title: "REPAIRS",
              body: `We repair phones, radios and small machines. We tell you the price before we start. If we cannot repair it, you pay nothing. Two weeks for parts from another country.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Message",
              genreTr: "İleti",
              title: "Not at two",
              body: `Hi Zeki, please do not come at two. The man from the gas company comes between two and six, and I must be here. Come at seven and we eat together.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-09-l1-1",
              no: 1,
              ref: "m1",
              text: "What is the note about?",
              options: ["Work that is finished", "A price that has changed", "A shop that is closed"],
              answer: 0,
              explain:
                "Not ilk cümlede sonucu veriyor: «Your radio is ready». Saatler kapanışı değil, gelme zamanını gösteriyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l1-2",
              no: 2,
              ref: "m2",
              text: "What can people do?",
              options: ["Use the second lift", "Take the stairs on Thursday", "Ask the caretaker for help"],
              answer: 2,
              explain:
                "Duyuru koşullu bir çözüm veriyor: «If you cannot use the stairs, ring the caretaker on 214». İkinci asansörden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the writer think?",
              options: ["The repair was too expensive", "The problem is not solved", "The machine is much too old"],
              answer: 1,
              explain:
                "E-posta tamirciye katılmıyor: «the machine still makes a noise» ve «I do not think a washing machine is normal when it walks across the kitchen». Fiyat ve yaş hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the shop promise?",
              options: ["No cost if there is no repair", "A new machine after two weeks", "The lowest price in the city"],
              answer: 0,
              explain:
                "Duyuru sözü açıkça veriyor: «If we cannot repair it, you pay nothing». İki hafta yurt dışından gelen parçanın süresi.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l1-5",
              no: 5,
              ref: "m5",
              text: "Why must the writer stay at home?",
              options: ["She is ill today", "She is cooking for Zeki", "Somebody is coming to the flat"],
              answer: 2,
              explain:
                "İleti sebebi veriyor: «The man from the gas company comes between two and six, and I must be here».",
            },
          ],
        },
        {
          id: "en-a2-09-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Emergency Plumber", body: "Seven days, from seven in the morning until eleven at night. We come within two hours. Fifty euros for the first hour." },
            { key: "b", label: "Repair Café", body: "Saturday mornings. Bring your own broken thing. Tools and help are free, but you do the work yourself." },
            { key: "c", label: "Old Radios and Clocks", body: "We repair machines from before 1980. We look for the parts and it takes time. Ask for Halvard." },
            { key: "d", label: "White Goods", body: "Washing machines and fridges. Repair now, pay in three months. No extra cost for that." },
            { key: "e", label: "Advice Desk", body: "Free. Tuesday and Thursday, two to five. We tell you whether a repair is worth the money." },
            { key: "f", label: "Tool Library", body: "Borrow a drill or a saw for two euros a day. You need a card and an address in the city." },
            { key: "g", label: "Phone Screens", body: "While you wait, twenty minutes. Thirty-five euros. Every model, no booking." },
            { key: "h", label: "New and Second-hand Machines", body: "Delivery on Saturday. We take your old machine away free." },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-09-l2-6",
              no: 6,
              text: "Noor's washing machine is broken and she cannot pay before her salary on the 28th.",
              answer: "d",
              explain:
                "İlan hem makineyi hem ödeme kolaylığını veriyor: «Washing machines and fridges. Repair now, pay in three months».",
            },
            {
              kind: "match",
              id: "en-a2-09-l2-7",
              no: 7,
              text: "Ilja wants to repair his own bicycle but he has no tools.",
              answer: "b",
              explain:
                "İlan tam bu durumu tarif ediyor: «Tools and help are free, but you do the work yourself». Alet kütüphanesi (f) ise günlük ücret alıyor ve yardım vermiyor.",
            },
            {
              kind: "match",
              id: "en-a2-09-l2-8",
              no: 8,
              text: "Selma has an old radio from her father and wants it to work again.",
              answer: "c",
              explain:
                "İlan yaş sınırını veriyor: «machines from before 1980». Eski radyo için parça arandığı ve zaman aldığı da söyleniyor.",
            },
            {
              kind: "match",
              id: "en-a2-09-l2-9",
              no: 9,
              text: "Aras needs somebody today because there is water on the kitchen floor.",
              answer: "a",
              explain:
                "İlan hızı ve günü veriyor: «Seven days … We come within two hours». Su acil bir durum, bekleyemez.",
            },
            {
              kind: "match",
              id: "en-a2-09-l2-10",
              no: 10,
              text: "Kiro wants to know if a repair costs more than a new machine.",
              answer: "e",
              explain:
                "İlan tam bu soruyu yanıtlıyor: «We tell you whether a repair is worth the money», üstelik ücretsiz.",
            },
          ],
        },
        {
          id: "en-a2-09-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Read the article and questions 11 to 14. Choose a, b or c.",
          promptTr: "Yazıyı ve 11–14. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Consumer article",
              genreTr: "Tüketici yazısı",
              title: "Before you call somebody",
              body: `Most people call a repair man too early. Here are three things to do first.

Look at the plug and the cable. About one machine in five is not broken at all. The cable is loose or the plug is dead, and a repair man will charge fifty euros to tell you that.

Find the number of the model. It is on a small paper on the back or under the door. With that number you can search on the internet, and often you find the answer in two minutes.

Ask about the price of the part before you say yes. A part for an old machine can cost more than a new machine, and the shop does not always tell you.

And one thing you should not do: never open a machine that uses water or gas. That is not saving money. That is a different problem.`,
              gloss: [
                { de: "a plug", tr: "fiş", en: "plug" },
                { de: "a model", tr: "model", en: "model" },
                { de: "loose", tr: "gevşek", en: "loose" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-09-l3-11",
              no: 11,
              text: "What does the article say about one machine in five?",
              options: ["It is too old to repair", "It costs a great deal to repair", "It is not really broken"],
              answer: 2,
              explain:
                "Metin oranı ve sebebi birlikte veriyor: «About one machine in five is not broken at all. The cable is loose or the plug is dead».",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l3-12",
              no: 12,
              text: "Where can you find the model number?",
              options: ["Somewhere on the machine itself", "On the plug at the end of the cable", "In the shop where you bought it"],
              answer: 0,
              explain:
                "Metin yeri tarif ediyor: «It is on a small paper on the back or under the door». Yani numara makinenin üstünde; fişte ya da dükkânda değil.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l3-13",
              no: 13,
              text: "What should you ask about before you agree?",
              options: ["The name of the repair man", "What the part will cost", "The day he can come"],
              answer: 1,
              explain:
                "Metin uyarıyı gerekçesiyle veriyor: «Ask about the price of the part before you say yes», çünkü parça yeni makineden pahalı olabiliyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l3-14",
              no: 14,
              text: "What does the article say you must not do?",
              options: ["Search for the model on the internet", "Buy a new machine", "Open a machine with water or gas"],
              answer: 2,
              explain:
                "Son paragraf tek yasağı koyuyor: «never open a machine that uses water or gas». İnternette aramak tersine öneriliyor.",
            },
          ],
        },
        {
          id: "en-a2-09-l4",
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
              title: "Two men and one fridge",
              body: `Our fridge stopped in July, and here is what I {{15}}.

The first man came on Tuesday and said the problem was the door. He was {{16}} than the second man, but he was wrong.

The second man opened the back and found the real problem in ten minutes. He was more expensive, {{17}} he was faster.

Next week I {{18}} buy a small thermometer for the fridge, so I can see a problem before the food does.

And the last thing: {{19}} something makes a new noise, write down the day. Nobody remembers in October.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-09-l4-15",
              no: 15,
              text: "Gap 15",
              options: ["learn", "learned", "learning"],
              answer: 1,
              explain:
                "Cümlenin ilk yarısı kapanmış bir olayı anlatıyor: «Our fridge stopped in July». Öğrenme de geçmişe ait: `learned`. `learning` yardımcı fiil olmadan yüklem olamaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l4-16",
              no: 16,
              text: "Gap 16",
              options: ["cheaper", "cheap", "the cheapest"],
              answer: 0,
              explain:
                "Boşluktan sonra `than` var ve `than` karşılaştırma derecesi ister: `cheaper`. `the cheapest` en üstünlük derecesidir ve `than` almaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l4-17",
              no: 17,
              text: "Gap 17",
              options: ["so", "because", "but"],
              answer: 2,
              explain:
                "İki bilgi karşıt: daha pahalı ama daha hızlı. Karşıtlığı `but` kurar; `so` sonuç, `because` sebep bildirir.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l4-18",
              no: 18,
              text: "Gap 18",
              options: ["went to", "am going to", "goes to"],
              answer: 1,
              explain:
                "Zaman belirteci `Next week`, yani gelecek; planlanmış bir gelecek `am going to + fiil` ile kurulur. `went to` geçmiş, `goes to` ise birinci tekil kişiyle uyuşmaz.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-l4-19",
              no: 19,
              text: "Gap 19",
              options: ["when", "so", "because"],
              answer: 0,
              explain:
                "Cümle bir durumu öğüde bağlıyor: yeni bir ses çıktığı zaman günü yaz. `when` bu zamanı verir; `so` sonuç, `because` sebep bildirir ve baştaki yan cümleyi kuramaz.",
            },
          ],
        },
        {
          id: "en-a2-09-l5",
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
              title: "The lift in our building",
              body: `Our building was built {{20}} 1974 and the lift is the same age.

It stops working about four times {{21}} year, always in the summer.

The caretaker is very good, {{22}} he cannot make the parts himself.

Last winter we waited {{23}} three weeks for a small piece of metal.

I live on the fourth floor and I still {{24}} not know how my neighbour on the sixth manages.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-09-l5-20",
              no: 20,
              text: "Gap 20",
              accept: ["in"],
              explain:
                "Yıllarla `in` kullanılır: `in 1974`. `on` belirli bir gün için, `at` ise saat için gelir.",
            },
            {
              kind: "gap",
              id: "en-a2-09-l5-21",
              no: 21,
              text: "Gap 21",
              accept: ["a"],
              explain:
                "Sıklık bildiren kalıp `four times a year` biçimindedir; burada `a` «her» anlamı taşır. `in a year` bir süre içinde olmayı anlatır, sıklığı değil.",
            },
            {
              kind: "gap",
              id: "en-a2-09-l5-22",
              no: 22,
              text: "Gap 22",
              accept: ["but"],
              explain:
                "İki bilgi karşıt: kapıcı çok iyi, ama parçayı kendisi yapamıyor. Karşıtlığı `but` kurar; `so` sonuç bildirir ve burada sonuç yok.",
            },
            {
              kind: "gap",
              id: "en-a2-09-l5-23",
              no: 23,
              text: "Gap 23",
              accept: ["for"],
              explain:
                "Süre uzunluğu `for` ile verilir: `waited for three weeks`. `since` bir başlangıç noktası ister, süre değil.",
            },
            {
              kind: "gap",
              id: "en-a2-09-l5-24",
              no: 24,
              text: "Gap 24",
              accept: ["do"],
              explain:
                "Geniş zamanın olumsuzu `do not + yalın fiil` ile kurulur ve özne birinci tekil kişi: «I still do not know».",
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
          id: "en-a2-09-h1",
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
              situation: "Bir müşteri tamirciyi arıyor.",
              plays: 2,
              segments: [
                { text: "Is my radio ready?" },
                { text: "The name, please?" },
                { text: "Kiro Vance." },
                { text: "Yes, it is ready. Twenty-two euros. We close at six." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "At home",
              genreTr: "Evde",
              situation: "İki kişi asansörü konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you call the caretaker?" },
                { text: "Twice. He says the part comes on Thursday." },
                { text: "Thursday? It is Monday today." },
                { text: "I know. I carry the shopping up four floors until then." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "In a shop",
              genreTr: "Dükkânda",
              situation: "Bir müşteri telefon ekranı soruyor.",
              plays: 2,
              segments: [
                { text: "How much is a new screen?" },
                { text: "Thirty-five euros, twenty minutes." },
                { text: "And a new phone?" },
                { text: "From ninety. But your phone is fine; it is only the screen." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Phone message",
              genreTr: "Telefon iletisi",
              situation: "Tamirci müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about your washing machine. The part came today, but it is the wrong one. I ordered the right one and I come on Friday. I am very sorry." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir tamir faturasını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Fifty euros to tell me the cable was loose." },
                { text: "Did you look at the cable first?" },
                { text: "No." },
                { text: "Then it is fifty euros for the lesson." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-09-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the man learn?",
              options: ["The radio cannot be repaired", "The shop is already closed", "The radio is ready"],
              answer: 2,
              explain:
                "Görevli açıkça söylüyor: «Yes, it is ready. Twenty-two euros». Dükkân altıda kapanıyor, yani hâlâ açık.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the problem?",
              options: ["The caretaker does not answer", "They must wait until Thursday", "The shopping is too heavy to buy"],
              answer: 1,
              explain:
                "Konuşma günleri karşılaştırıyor: «the part comes on Thursday» ve «It is Monday today». Kapıcıya iki kez ulaşılmış.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the assistant say?",
              options: ["The repair is the better choice", "The phone is much too old", "The screen is not the problem"],
              answer: 0,
              explain:
                "Görevli iki fiyatı verip yönlendiriyor: «your phone is fine; it is only the screen». Otuz beş euro doksanın çok altında.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h1-4",
              no: 4,
              ref: "a4",
              text: "What has happened?",
              options: ["The machine is repaired", "The price has gone up", "The wrong part came"],
              answer: 2,
              explain:
                "İleti sorunu adlandırıyor: «The part came today, but it is the wrong one». Doğrusu sipariş edildi ve cuma günü gelinecek.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the second speaker doing?",
              options: ["Saying the money was not wasted", "Offering to pay half of it", "Complaining about the repair man"],
              answer: 0,
              explain:
                "İkinci konuşmacı sorumluluğu birinciye çeviriyor: «Did you look at the cable first?» ve «it is fifty euros for the lesson».",
            },
          ],
        },
        {
          id: "en-a2-09-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information from a repair service. Complete the notes, questions 6 to 10. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Bir tamir servisinden bilgi dinleyeceksin. 6–10. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli servisin nasıl çalıştığını anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good afternoon. Here is how we work. You bring the machine to the shop between nine and five, or we come to your house for fifteen euros. We look at it and we telephone you with a price; we never start before that. Small repairs take two days. If we need a part from another country, it is three weeks. And there is no charge if we cannot repair it.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Repair service — notes",
              body: `We come to your house for:   {{6}} euros
The shop is open from nine to: {{7}}
Small repairs take:          {{8}} days
A part from another country: {{9}} weeks
If they cannot repair it, you pay: {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-a2-09-h2-6",
              no: 6,
              ref: "b1",
              text: "Gap 6",
              accept: ["15", "fifteen"],
              explain:
                "Kayıt iki yolu ayırıyor: dükkâna getirmek ücretsiz, «we come to your house for fifteen euros».",
            },
            {
              kind: "gap",
              id: "en-a2-09-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["5", "five"],
              explain:
                "«You bring the machine to the shop between nine and five» — kapanış saati. Not kâğıdında dokuz basılı olduğu için boşluğa ikinci saat geliyor.",
            },
            {
              kind: "gap",
              id: "en-a2-09-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["2", "two"],
              explain:
                "«Small repairs take two days» — küçük işlerin süresi. Üç hafta yurt dışından gelen parçaya ait.",
            },
            {
              kind: "gap",
              id: "en-a2-09-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["3", "three"],
              explain:
                "«If we need a part from another country, it is three weeks» — bekleme süresi haftayla veriliyor.",
            },
            {
              kind: "gap",
              id: "en-a2-09-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["nothing"],
              explain:
                "Kaydın son cümlesi bunu söylüyor: «there is no charge if we cannot repair it». Yani ödenecek tutar sıfır.",
            },
          ],
        },
        {
          id: "en-a2-09-h3",
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
              situation: "Bir dinleyici gelen tamirciyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "The man was here for forty minutes and he did not open his bag once. He looked at it, he listened to it, and he told me to buy a new one. He took nothing for the visit. I would call him again tomorrow." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Binada asansör için anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "The lift is out of order. The part arrives on Thursday. Please do not press the button; it does not help and the noise is very loud in flat one." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici iki makineyi karşılaştırıyor.",
              plays: 2,
              segments: [
                { text: "I bought the cheap machine and I have repaired it four times in six years. My sister bought the expensive one and she has repaired it once. She paid more at the start and less since then, and I still tell people the cheap one is fine." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Bir müşteri gelmeyen tamirciyi arıyor.",
              plays: 2,
              segments: [
                { text: "Yes, hello, this is about the visit on Tuesday. Nobody came and nobody telephoned. I took a day off work for that. I would like a new day, and I would like it in the morning." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir konuşmacı yaygın bir inancı ele alıyor.",
              plays: 2,
              segments: [
                { text: "People think a repair is always cheaper than a new machine. Usually it is. But a part for a fifteen-year-old fridge can cost two hundred euros, and then the answer is different. Ask for the price of the part first." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-a2-09-h3-11",
              no: 11,
              ref: "c1",
              text: "What is the speaker doing?",
              options: ["Complaining about a bad visit", "Praising a man who repaired nothing", "Asking for her money back"],
              answer: 1,
              explain:
                "Konuşmacı olumsuz bir sonucu olumlu anlatıyor: «He took nothing for the visit. I would call him again tomorrow». Yani şikâyet değil övgü.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h3-12",
              no: 12,
              ref: "c2",
              text: "What does the announcement ask people to do?",
              options: ["Use the other lift", "Come back on Thursday", "Leave the button alone"],
              answer: 2,
              explain:
                "Anonsun tek ricası bu: «Please do not press the button; it does not help». Perşembe parçanın geliş günü.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h3-13",
              no: 13,
              ref: "c3",
              text: "What is the speaker doing?",
              options: ["Admitting something and not changing", "Recommending the cheap machine", "Explaining how she saved money"],
              answer: 0,
              explain:
                "Konuşmacı kız kardeşinin daha az ödediğini kabul ediyor ama «I still tell people the cheap one is fine» diyor. Yani tavsiye değişmiyor.",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h3-14",
              no: 14,
              ref: "c4",
              text: "Why is the woman calling?",
              options: ["To ask for a lower price", "To arrange a new day", "To cancel the repair"],
              answer: 1,
              explain:
                "Konuşmacı isteğini sonda söylüyor: «I would like a new day, and I would like it in the morning».",
            },
            {
              kind: "mcq",
              id: "en-a2-09-h3-15",
              no: 15,
              ref: "c5",
              text: "What is the speaker doing?",
              options: ["Saying repairs are never worth it", "Explaining how to repair a fridge", "Adding a limit to a common idea"],
              answer: 2,
              explain:
                "Konuşmacı yaygın inancı önce doğruluyor sonra sınırlıyor: «Usually it is. But a part for a fifteen-year-old fridge can cost two hundred euros».",
            },
          ],
        },
        {
          id: "en-a2-09-h4",
          no: 4,
          format: "match",
          goal: "detail",
          prompt:
            "You hear five people, questions 16 to 20. What did each person decide to do? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Beş kişi dinleyeceksin, 16–20. maddeler. Her kişi ne yapmaya karar verdi? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "Buy a new machine." },
            { key: "b", label: "Repair it themselves." },
            { key: "c", label: "Wait for the part." },
            { key: "d", label: "Ask for their money back." },
            { key: "e", label: "Use a different shop next time." },
            { key: "f", label: "Borrow one from a neighbour." },
            { key: "g", label: "Take the machine to the shop." },
            { key: "h", label: "Do nothing for now." },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı buzdolabını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The part is coming from Italy and it is three weeks. Three weeks without a fridge in July sounds bad, but the new one is four hundred euros and the part is thirty. I put the milk at my mother's." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı model numarasını bulmuş.",
              plays: 2,
              segments: [
                { text: "I found the model number under the door and there is a film on the internet with ninety thousand views. It is one screw and a rubber ring. I bought the ring for four euros this morning." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı randevu değişikliklerini anlatıyor.",
              plays: 2,
              segments: [
                { text: "They told me Tuesday, then Thursday, then Tuesday again. The repair itself was fine and the price was fair. But I will not spend another week at home waiting, and the other shop gives you a time." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı eski makinesinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "It is fifteen years old. The part alone is two hundred, and the man says the motor is next. I am not spending that on a machine that is telling me it is finished." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı komşusundan söz ediyor.",
              plays: 2,
              segments: [
                { text: "My neighbour has two, because her mother left one. She says I can use it until Friday. It is one floor up and I feel silly carrying my clothes upstairs, but it is free." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-a2-09-h4-16",
              no: 16,
              ref: "d1",
              text: "Speaker 1",
              answer: "c",
              explain:
                "Konuşmacı iki fiyatı karşılaştırıp beklemeyi seçiyor: «the new one is four hundred euros and the part is thirty». Sütü de bu arada annesine bırakmış.",
            },
            {
              kind: "match",
              id: "en-a2-09-h4-17",
              no: 17,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı işi kendisi yapıyor: model numarasını bulmuş, videoyu izlemiş ve «I bought the ring for four euros this morning» diyor.",
            },
            {
              kind: "match",
              id: "en-a2-09-h4-18",
              no: 18,
              ref: "d3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "Konuşmacı işten ve fiyattan memnun: «The repair itself was fine and the price was fair». Sorun randevu, bu yüzden «the other shop gives you a time».",
            },
            {
              kind: "match",
              id: "en-a2-09-h4-19",
              no: 19,
              ref: "d4",
              text: "Speaker 4",
              answer: "a",
              explain:
                "Konuşmacı parçaya para vermeyi reddediyor: «I am not spending that on a machine that is telling me it is finished», çünkü motor da sırada.",
            },
            {
              kind: "match",
              id: "en-a2-09-h4-20",
              no: 20,
              ref: "d5",
              text: "Speaker 5",
              answer: "f",
              explain:
                "Konuşmacı komşusunun ikinci makinesini kullanıyor: «She says I can use it until Friday», üstelik ücretsiz.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "This part has two tasks: you write a message and a short text about an experience.",
      instructionTr: "Bu bölümde iki görev var: bir ileti ve bir deneyim üzerine kısa bir metin yazacaksın.",
      tasks: [
        {
          id: "en-a2-09-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "The repair man comes on Thursday between eight and twelve and you cannot be at home. Write a message to your English neighbour Selma. Write about 50 words. Answer all three points.",
          promptTr:
            "Tamirci perşembe günü sekizle on iki arası geliyor ve sen evde olamayacaksın. İngiliz komşun Selma'ya bir ileti yaz. Yaklaşık 50 kelime. Üç maddenin hepsine cevap ver.",
          items: [],
          rubric: {
            minWords: 50,
            points: [
              { de: "Say what is broken and when the man comes.", tr: "Neyin bozuk olduğunu ve adamın ne zaman geleceğini söyle." },
              { de: "Ask Selma to open the door.", tr: "Selma'dan kapıyı açmasını iste." },
              { de: "Say where the key is or how she can reach you.", tr: "Anahtarın nerede olduğunu ya da sana nasıl ulaşabileceğini söyle." },
            ],
            sample: `Hi Selma,

My washing machine is broken. The repair man comes on Thursday between eight and twelve, and I am at work.

Could you open the door for him, please? He only needs ten minutes.

The key is with the caretaker in flat 1. My number is 07700 900 412.

Thank you very much!
Noor`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi? Biri eksikse metin tam sayılmaz.",
              "Gün ve saat aralığı açıkça verildi mi?",
              "Rica kibar bir kalıpla mı kuruldu? (Could you … please)",
              "Anahtar ya da telefon gibi somut bir bilgi verildi mi?",
              "Yaklaşık 50 kelime yazıldı mı? Hitap ve veda var mı?",
            ],
          },
        },
        {
          id: "en-a2-09-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write a short text about a time when you waited a long time for something. Say what it was, how long you waited and what you did in that time. Write about 60 words.",
          promptTr:
            "Bir şeyi uzun süre beklediğin bir zamanı anlat. Neyi beklediğini, ne kadar beklediğini ve o sürede ne yaptığını yaz. Yaklaşık 60 kelime.",
          items: [],
          rubric: {
            minWords: 60,
            points: [
              { de: "Say what you waited for.", tr: "Neyi beklediğini söyle." },
              { de: "Say how long you waited.", tr: "Ne kadar beklediğini söyle." },
              { de: "Say what you did in that time.", tr: "O sürede ne yaptığını söyle." },
            ],
            sample: `Last winter our heating stopped in the middle of January. The man came and said he needed a part from Poland. We waited eighteen days. In that time we slept in the living room with two small electric heaters and we went to my sister's flat every Sunday for a hot bath. When the part came, the repair took forty minutes.`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Geçmiş zaman doğru kullanıldı mı? Düzensiz fiiller (came, said, went) doğru mu?",
              "Süre somut bir sayıyla mı verildi?",
              "Olaylar zaman ifadeleriyle mi bağlandı? (last winter, in that time, when …)",
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
          id: "en-a2-09-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about machines at home and about repairs. Answer in full sentences.",
          promptTr: "Sana evdeki makineler ve tamir hakkında sorular soracağım. Tam cümlelerle cevap ver.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Which machine in your home do you use most?", tr: "İyi günler. Evinde en çok hangi makineyi kullanıyorsun?" },
            { who: "you", hint: "Bir makine söyle ve ne sıklıkta kullandığını anlat.", expect: "bir nesneyi sıklık bildirerek anlatmak", seconds: 30 },
            { who: "partner", de: "Thank you. Do you repair things yourself, or do you call somebody? Why?", tr: "Teşekkürler. Bir şeyleri kendin mi tamir edersin, yoksa birini mi çağırırsın? Neden?" },
            { who: "you", hint: "Tercihini söyle ve bir gerekçe ver.", expect: "bir tercihi gerekçesiyle bildirmek", seconds: 30 },
            { who: "partner", de: "Interesting. Tell me about a machine that broke in your home.", tr: "İlginç. Evinde bozulan bir makineyi anlat." },
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
              "I use the washing machine most, about four times a week, because we are three people. I do not repair things myself, because I am afraid of water and electricity. Last year our fridge stopped in the summer. The man came after two days and the food was already bad.",
            criteria: [
              "Cevaplar tek sözcük değil, tam cümle mi?",
              "Tercih bir gerekçeyle mi verildi? (because …)",
              "Son soruda geçmiş zaman doğru kuruldu mu?",
              "Sıklık ve zaman ifadeleri kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-a2-09-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Describe this situation for about one minute: a repair café on a Saturday morning. Four people are sitting at two long tables. A woman is mending a lamp and a man is watching her. On the floor there is a box with tools. Say what you see, what the people are doing, and whether you would go there.",
          promptTr:
            "Şu durumu bir dakika kadar anlat: cumartesi sabahı bir tamir kafesi. İki uzun masada dört kişi oturuyor. Bir kadın bir lambayı onarıyor, bir adam onu izliyor. Yerde aletlerin olduğu bir kutu var. Ne gördüğünü, insanların ne yaptığını ve oraya gidip gitmeyeceğini söyle.",
          prepSeconds: 45,
          speakSeconds: 75,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "say what you see", tr: "Ne gördüğünü söyle" },
              { de: "say what the people are doing", tr: "İnsanların ne yaptığını söyle" },
              { de: "say if you would go there", tr: "Oraya gidip gitmeyeceğini söyle" },
            ],
            sample:
              "This is a repair café on a Saturday morning. There are two long tables and four people are sitting at them. In the middle a woman is mending an old lamp with a small tool. Next to her a man is watching and he is not helping. On the floor there is a big box with tools in it. I would go there, because I have a radio that does not work and I do not want to throw it away.",
            criteria: [
              "Şimdiki zaman (present continuous) kullanıldı mı? Bu görevin ana yapısı bu.",
              "Üç içerik noktasının üçü de işlendi mi?",
              "Yer bildiren ifadeler var mı? (in the middle, next to, on the floor)",
              "Görüş bir gerekçeyle mi verildi?",
            ],
          },
        },
        {
          id: "en-a2-09-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Your washing machine is broken. Talk with me about what to do and choose one thing together.",
          promptTr:
            "Çamaşır makineniz bozuldu. Ne yapacağınızı benimle konuş ve birlikte birini seç.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Here are three ideas: repair it now for a hundred and eighty euros, buy a new one for three hundred, or wait three weeks for a part that costs thirty. What do you think about the repair now?", tr: "Üç fikir var: şimdi yüz seksen euroya tamir ettirmek, üç yüz euroya yenisini almak ya da otuz euroluk parça için üç hafta beklemek. Şimdi tamir fikri hakkında ne düşünüyorsun?" },
            { who: "you", hint: "Tamir fikri hakkında görüşünü söyle ve bir gerekçe ver.", expect: "bir fikir hakkında görüş bildirmek ve gerekçelendirmek", seconds: 35 },
            { who: "partner", de: "I see. But the machine is nine years old, and three weeks without a machine with two children is very hard. Does that change anything?", tr: "Anlıyorum. Ama makine dokuz yaşında ve iki çocukla üç hafta makinesiz kalmak çok zor. Bu bir şey değiştirir mi?" },
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
              "I think a hundred and eighty euros is a lot for an old machine, because in two years we pay again. You are right about the children; three weeks is impossible for us. But three hundred for a new one is only a little more than the repair. So let us buy the new machine and give the old one to the shop.",
            criteria: [
              "Görüş bir gerekçeyle mi verildi? (because …)",
              "Karşı tarafın söylediğine gönderme yapıldı mı? (You are right … / That is true …)",
              "Sonunda ortak bir karara varıldı mı?",
              "Sayılar (fiyat, süre) doğru kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

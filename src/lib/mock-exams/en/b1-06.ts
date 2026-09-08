import type { MockPaper } from "../types";

/**
 * B1 · Deneme 6 — "Hobbies, Music and Being a Beginner".
 *
 * B1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Yeni bir şeye başlamak
 * B1 için verimli çünkü metnin kendisi zaman içindeki değişimi anlatmak
 * zorunda: present perfect, `used to` ve koşul cümlesi bu konuda
 * zorlanmadan çıkıyor. Okuma 3 ile dinleme 4 de görüş yerine kendi
 * deneyimini tartma becerisini ölçüyor.
 *
 * B1 İMZALARI: present perfect, ilgi cümlesi, koşul cümlesi ve
 * `however / used to` gibi ileri bağlaçlar metinlerde geçiyor.
 */
export const EN_B1_06: MockPaper = {
  id: "en-b1-06",
  course: "en",
  level: "B1",
  no: 6,
  theme: "Hobbies, Music and Being a Beginner",
  themeTr: "Uğraşlar, müzik ve acemilik",
  minutes: 155,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 55,
      instruction:
        "This part has six tasks. You read notices, adverts, an article and two texts with gaps. Choose the correct answer for each question.",
      instructionTr:
        "Bu bölümde altı görev var. Duyurular, ilanlar, bir yazı ve boşluklu iki metin okuyacaksın. Her soruda doğru cevabı işaretle.",
      tasks: [
        {
          id: "en-b1-06-l1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Read the five texts and questions 1 to 5. Choose a, b or c.",
          promptTr: "Beş metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "m1",
              genre: "Notice at a music school",
              genreTr: "Müzik okulu duyurusu",
              title: "Instrument hire",
              body: `Forty euros for the first year, twenty after that. You pay for repairs but not for normal wear. If you stop before June, bring the instrument back within two weeks; we do not return the year's fee.`,
            },
            {
              kind: "text",
              id: "m2",
              genre: "Email from a choir",
              genreTr: "Korodan e-posta",
              title: "Your audition",
              body: `Dear Katri, thank you for your interest. We do not ask anybody to sing alone at the audition; you sing in a group of four. Come on Tuesday at seven. If you cannot read music, that is fine — about half of us cannot.`,
            },
            {
              kind: "text",
              id: "m3",
              genre: "Advert",
              genreTr: "İlan",
              title: "Six evenings, three songs",
              body: `Six evenings, and you will play three songs badly by the end. That is the promise and we mean it. No instrument needed for the first evening. Groups of six, and nobody under sixteen.`,
            },
            {
              kind: "text",
              id: "m4",
              genre: "Message",
              genreTr: "İleti",
              title: "Wednesday",
              body: `Mirek, I cannot come on Wednesday: my sister arrives that evening. Can we move to Thursday? If Thursday is bad for you, I understand — you can start without me and I will catch up. Do not wait for me.`,
            },
            {
              kind: "text",
              id: "m5",
              genre: "Notice in a community centre",
              genreTr: "Toplum merkezi duyurusu",
              title: "Rooms for groups",
              body: `Rooms are free for groups of four or more. One person books, and that person is responsible for the key. Music until nine only. If nobody comes twice in a row, the room goes to another group.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-l1-1",
              no: 1,
              ref: "m1",
              text: "What does the school not do?",
              options: ["Charge for repairs", "Hire out instruments after the first year", "Give back the fee if you stop early"],
              answer: 2,
              explain:
                "Duyurunun son cümlesi bunu söylüyor: «we do not return the year's fee». Onarım için ücret AlINIYOR («You pay for repairs») ve kira ikinci yıl da sürüyor (yirmi euro), yani öteki iki şık okulun yaptığı şeyler.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l1-2",
              no: 2,
              ref: "m2",
              text: "What does the email tell Katri?",
              options: ["She will not have to sing alone", "She must be able to read music well", "The audition is on Thursday"],
              answer: 0,
              explain:
                "E-posta bunu açıkça yazıyor: «We do not ask anybody to sing alone at the audition; you sing in a group of four». Nota okuyamamak sorun değil ve gün salı.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l1-3",
              no: 3,
              ref: "m3",
              text: "What does the advert promise?",
              options: ["You will play very well after six evenings", "You will play a little after six evenings", "You can bring a child of fourteen"],
              answer: 1,
              explain:
                "İlan sonucu küçültüyor: «you will play three songs badly by the end. That is the promise and we mean it». Yaş sınırı da açık: «nobody under sixteen».",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l1-4",
              no: 4,
              ref: "m4",
              text: "What does the writer say?",
              options: ["The others should begin on their own", "She wants to move the lesson to Wednesday", "She will wait for the others on Thursday"],
              answer: 0,
              explain:
                "İleti bunu iki kez söylüyor: «you can start without me and I will catch up» ve «Do not wait for me». Erteleme isteği çarşambadan PERŞEMBEYE; beklemek ise açıkça reddediliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l1-5",
              no: 5,
              ref: "m5",
              text: "What happens if a group does not come twice in a row?",
              options: ["They pay for the room", "The key is changed", "They lose the room"],
              answer: 2,
              explain:
                "Kural son cümlede: «the room goes to another group». Odalar zaten ücretsiz, yani ödeme diye bir yaptırım yok; anahtar sorumluluğu ayrı bir madde.",
            },
          ],
        },
        {
          id: "en-b1-06-l2",
          no: 2,
          format: "match",
          goal: "orientation",
          prompt:
            "Read about five people, 6 to 10. Then read the eight adverts a to h. Which advert is right for each person? You use each advert once only.",
          promptTr:
            "6–10. maddelerdeki beş kişiyi oku. Sonra a'dan h'ye sekiz ilanı oku. Her kişiye hangi ilan uyar? Her ilan en fazla bir kez kullanılır.",
          options: [
            { key: "a", label: "Beginners' Guitar", body: "Six Monday evenings. Three songs by the end, and we say in advance that they will not be good. Guitars for the first evening are here." },
            { key: "b", label: "Repair Workshop", body: "Bring a broken instrument on the last Saturday of the month. A repairer looks at it with you and tells you what it needs. Ten euros." },
            { key: "c", label: "Choir, No Audition", body: "Every Thursday at seven. Nobody sings alone and nobody has to read music. Two concerts a year, and you decide whether to be in them." },
            { key: "d", label: "Practice Rooms", body: "By the hour, from six euros. A piano in two of the rooms. Book online; the door opens with a code, day or night." },
            { key: "e", label: "Instrument Library", body: "Borrow an instrument for three months and decide afterwards. Twenty euros, returned if you buy from us later. Adults only." },
            { key: "f", label: "Music for Under Fives", body: "Thirty minutes, Wednesday mornings, with a parent. Songs and simple percussion. No booking; just come." },
            { key: "g", label: "Recording Evening", body: "Once a month we record one song for each person who signs up. You leave with a file the same evening. Fifteen euros." },
            { key: "h", label: "Instrument Sale", body: "Second-hand instruments, all checked by a repairer. Three months' guarantee. Cash or card, and no delivery." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-06-l2-6",
              no: 6,
              text: "Tuva wants to try an instrument for a few months before she spends money on one.",
              answer: "e",
              explain:
                "İlan tam bu denemeyi satıyor: «Borrow an instrument for three months and decide afterwards», üstelik yirmi euro sonradan satın alınırsa iade ediliyor. Satış ilanı (h) ise denemeden önce ödeme ister.",
            },
            {
              kind: "match",
              id: "en-b1-06-l2-7",
              no: 7,
              text: "Goran has a violin that belonged to his father and does not know if it can be played.",
              answer: "b",
              explain:
                "İlan tam bu soruya cevap veriyor: «A repairer looks at it with you and tells you what it needs», ayda bir cumartesi ve on euro. Ödünç kütüphanesi (e) ise elindeki çalgıyla ilgilenmiyor.",
            },
            {
              kind: "match",
              id: "en-b1-06-l2-8",
              no: 8,
              text: "Hedda likes singing but has never learned to read music.",
              answer: "c",
              explain:
                "İlan iki engeli birden kaldırıyor: «Nobody sings alone and nobody has to read music». Konserlere katılmak da isteğe bağlı bırakılıyor.",
            },
            {
              kind: "match",
              id: "en-b1-06-l2-9",
              no: 9,
              text: "Viggo works nights and can only practise at four in the morning.",
              answer: "d",
              explain:
                "İlan erişimi saatten bağımsız kılıyor: «the door opens with a code, day or night». Öteki ilanların hepsi belirli bir güne ve saate bağlı.",
            },
            {
              kind: "match",
              id: "en-b1-06-l2-10",
              no: 10,
              text: "Katri wants to hear how she actually sounds.",
              answer: "g",
              explain:
                "İlan sonucu doğrudan veriyor: «we record one song for each person who signs up. You leave with a file the same evening». Kendi sesini dinlemek başka hiçbir ilanda geçmiyor.",
            },
          ],
        },
        {
          id: "en-b1-06-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 11 to 15. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 11–15. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Newspaper column",
              genreTr: "Gazete köşe yazısı",
              title: "I am still bad at the piano and I am not stopping",
              body: `I started the piano at thirty-eight. I am now forty-three and I would describe my playing as poor, which is not modesty; it is a fair description that my teacher would recognise.

The first thing nobody tells you is how much of adult learning is about the story you tell yourself. A child who plays badly is a child learning the piano. An adult who plays badly is an adult who is bad at the piano, and the difference is entirely in the sentence.

The second thing is the arithmetic of time. I practise twenty minutes a day, which is nothing next to a conservatory student and everything next to somebody who intends to start in the spring. In five years those twenty minutes have added up to about six hundred hours.

I should be honest about the limits. I will not play in public, I do not enjoy playing for other people, and the pieces I can manage are the ones written for children. If I had started at eighteen, I would probably be no better, because the problem was never the age.

However, I have started to hear things I could not hear before, and that has changed how I listen to everything else. My teacher, who has taught adults for twenty years, says this happens to everybody and that nobody mentions it, because it is not a result you can show anybody.`,
              gloss: [
                { de: "modesty", tr: "alçakgönüllülük", en: "modesty" },
                { de: "a conservatory", tr: "konservatuvar", en: "conservatory" },
                { de: "to manage", tr: "üstesinden gelmek", en: "manage" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-l3-11",
              no: 11,
              text: "How does the writer describe her playing?",
              options: ["Better than she expected", "Poor, and she means it", "Good for an adult beginner", "Not worth describing"],
              answer: 1,
              explain:
                "İlk paragraf değerlendirmeyi ve niyetini birlikte veriyor: «I would describe my playing as poor, which is not modesty». Öğretmeninin de aynı tarifi kabul edeceğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l3-12",
              no: 12,
              text: "What does the writer say about children and adults?",
              options: ["Children learn faster than adults", "Adults need more practice time", "Children are much less afraid of making mistakes", "The same playing is described differently"],
              answer: 3,
              explain:
                "İkinci paragraf iki cümleyi yan yana koyuyor ve farkı adlandırıyor: «the difference is entirely in the sentence». Öğrenme hızı ya da korku metinde tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l3-13",
              no: 13,
              text: "What is her point about twenty minutes a day?",
              options: ["It is small but it accumulates", "It is too little to be useful", "It is more than a student practises", "It is all she can find in a day"],
              answer: 0,
              explain:
                "Metin hesabı yapıyor: «In five years those twenty minutes have added up to about six hundred hours». Konservatuvar öğrencisinin yanında hiçbir şey, ama hiç başlamayanın yanında her şey.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l3-14",
              no: 14,
              text: "What does she say about playing in public?",
              options: ["She hopes to do it next year", "Her teacher has asked her to", "She will not do it", "She has done it twice"],
              answer: 2,
              explain:
                "Dördüncü paragraf açık: «I will not play in public, I do not enjoy playing for other people». Bir plan ya da geçmiş bir deneyimden söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l3-15",
              no: 15,
              text: "What has changed for her?",
              options: ["She can play pieces for adults", "She hears more when she listens", "She practises longer than before", "She has stopped comparing herself to others"],
              answer: 1,
              explain:
                "Son paragraf: «I have started to hear things I could not hear before, and that has changed how I listen to everything else». Çalabildiği parçalar hâlâ çocuklar için yazılmış olanlar.",
            },
          ],
        },
        {
          id: "en-b1-06-l4",
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
              title: "The orchestra that lets anybody in",
              body: `For thirty years the town orchestra held auditions and turned away about half the people who came. Since 2019 it has taken everybody. {{16}}

The rule that replaced the audition is short: come to two rehearsals in three, and sit where you are put. {{17}}

The first season was uncomfortable. The orchestra was suddenly ninety people, and the sound in the first concert was, by common agreement, worse. {{18}}

The change that mattered most was not musical. Players who would never have auditioned now sit in the third row and stay for years. {{19}}

The conductor is careful about recommending the model to other towns. {{20}}`,
              gloss: [
                { de: "an audition", tr: "seçme sınavı", en: "audition" },
                { de: "a rehearsal", tr: "prova", en: "rehearsal" },
                { de: "a conductor", tr: "orkestra şefi", en: "conductor" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "She points out that her orchestra has a hall it does not pay for, which is the whole reason the numbers work." },
            { key: "b", label: "b", body: "By the fourth concert it was better than anything the smaller version had ever managed." },
            { key: "c", label: "c", body: "Nobody outside the orchestra believed that the standard could survive it." },
            { key: "d", label: "d", body: "That sentence has not changed since, although a great deal else has." },
            { key: "e", label: "e", body: "Several of them had put an instrument in a cupboard at nineteen and left it there." },
            { key: "f", label: "f", body: "The town hall was rebuilt after a fire in 1974 and reopened three years later." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b1-06-l4-16",
              no: 16,
              text: "Gap 16",
              answer: "c",
              explain:
                "Boşluktan önce alışılmadık karar duyuruluyor: «Since 2019 it has taken everybody». (c) dışarıdakilerin tepkisini veriyor ve düzey kaygısını gündeme getiriyor; sonraki paragraflar da tam o kaygıyı sınıyor.",
            },
            {
              kind: "match",
              id: "en-b1-06-l4-17",
              no: 17,
              text: "Gap 17",
              answer: "d",
              explain:
                "Önceki cümle kuralı tek bir cümle olarak veriyor: «come to two rehearsals in three, and sit where you are put». (d) «That sentence» ile ona gönderme yapıp değişmediğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-b1-06-l4-18",
              no: 18,
              text: "Gap 18",
              answer: "b",
              explain:
                "Paragraf ilk konserde sesin «worse» olduğunu kabul ediyor; (b) zaman içindeki dönüşü veriyor: dördüncü konserde küçük hâlinden bile iyi. Rahatsızlık ile sonuç arasındaki bağ burada kuruluyor.",
            },
            {
              kind: "match",
              id: "en-b1-06-l4-19",
              no: 19,
              text: "Gap 19",
              answer: "e",
              explain:
                "Önceki cümle seçmeye asla girmeyecek çalgıcılardan söz ediyor; (e) «Several of them» ile onlara gönderme yapıp geçmişlerini anlatıyor: on dokuzunda dolaba konmuş bir çalgı.",
            },
            {
              kind: "match",
              id: "en-b1-06-l4-20",
              no: 20,
              text: "Gap 20",
              answer: "a",
              explain:
                "Son cümle şefin çekincesini bildiriyor: «is careful about recommending the model to other towns». (a) çekincenin gerekçesini veriyor: kirası ödenmeyen bir salon. (f) belediye binasının yangın sonrası yeniden yapılışından söz ediyor ve metnin hiçbir yerinde bina tarihi tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b1-06-l5",
          no: 5,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and complete gaps 21 to 25. Which word fits: a, b, c or d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi sözcük uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Consumer advice",
              genreTr: "Tüketici tavsiyesi",
              title: "Before you buy a second-hand instrument",
              body: `A used instrument can be a very good deal, but only if you {{21}} three things carefully.

First, ask when it was last repaired. An instrument that has stood in a cupboard for ten years may {{22}} more work than it is worth.

Second, play it, or take somebody who can. A photograph tells you nothing, and a seller who is in a hurry rarely {{23}} out that anything is wrong.

Third, agree what happens if a repairer finds a problem. A private seller does not have to {{24}} your money back, and many buyers learn this too late.

None of this takes long. An hour of questions can {{25}} you from a year of quiet regret.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-l5-21",
              no: 21,
              text: "Gap 21",
              options: ["look", "watch", "check", "see"],
              answer: 2,
              explain:
                "`check something` bir şeyi denetlemek demektir ve doğrudan nesne alır. `look` ve `see` bu anlamda edat ister (`look at`, `see to`); `watch` ise süregiden bir şeyi izlemektir.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l5-22",
              no: 22,
              text: "Gap 22",
              options: ["need", "wish", "ask", "demand"],
              answer: 0,
              explain:
                "`need work` bir nesnenin onarım gerektirdiğini söyleyen yerleşik kullanımdır. `wish` ve `ask` isteyen bir özne ister; `demand` ise cansız bir özneyle bu bağlamda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l5-23",
              no: 23,
              text: "Gap 23",
              options: ["takes", "brings", "sets", "points"],
              answer: 3,
              explain:
                "`point out that …` bir kusuru göstermenin kalıbıdır. `bring out` bir özelliği belirginleştirir ama `that` yan cümlesi almaz; `take out` ve `set out` bambaşka anlamlar taşır.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l5-24",
              no: 24,
              text: "Gap 24",
              options: ["bring", "give", "take", "put"],
              answer: 1,
              explain:
                "`give money back` iade etmenin kalıbıdır ve iade eden taraf satıcıdır. `bring back` getirmeyi, `take back` geri almayı, `put back` yerine koymayı anlatır.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-l5-25",
              no: 25,
              text: "Gap 25",
              options: ["keep", "hold", "stop", "save"],
              answer: 3,
              explain:
                "`save somebody from something` birini bir dertten kurtarmak demektir. `keep from` ve `stop from` engellemeyi bildirir ve ardından ulaç ister; `hold from` kalıp değildir.",
            },
          ],
        },
        {
          id: "en-b1-06-l6",
          no: 6,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and complete gaps 26 to 30. Write ONE word in each gap.",
          promptTr: "Metni oku ve 26–30. boşlukları tamamla. Her boşluğa TEK bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t6",
              genre: "Blog comment",
              genreTr: "Blog yorumu",
              title: "On starting late",
              body: `Nobody in my family played an instrument, {{26}} nobody told me it was difficult either.

I learned the first three chords in a week and then made no progress {{27}} nearly a year.

The teacher I found in the end was the one {{28}} was least interested in talent.

She asked me to play the same eight bars every day, {{29}} matter how bored I was.

It is the only piece of advice from that year {{30}} I still follow.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-06-l6-26",
              no: 26,
              text: "Gap 26",
              accept: ["so", "and"],
              explain:
                "İkinci yarı birincinin sonucu: ailede kimse çalmadığı için kimse zorluğundan söz etmemiş. `so` bu sonucu verir; `and` de iki olguyu yan yana koyar ve doğaldır. `but` karşıtlık ister, oysa burada karşıtlık yok.",
            },
            {
              kind: "gap",
              id: "en-b1-06-l6-27",
              no: 27,
              text: "Gap 27",
              accept: ["for"],
              explain:
                "Süre bildiren `for` bir zaman aralığının uzunluğunu verir: «for nearly a year». `since` bir başlangıç noktası ister (since March), `in` ise bir süre içinde tamamlanmayı bildirir.",
            },
            {
              kind: "gap",
              id: "en-b1-06-l6-28",
              no: 28,
              text: "Gap 28",
              accept: ["who", "that"],
              explain:
                "Boşluk `the one` öncülünü niteleyen bir yan cümle başlatıyor ve öncül bir kişi: `who` ya da `that` gelir. Ardından çekimli yüklem («was») geldiği için ilgi adılı özne konumunda ve düşürülemez.",
            },
            {
              kind: "gap",
              id: "en-b1-06-l6-29",
              no: 29,
              text: "Gap 29",
              accept: ["no"],
              explain:
                "`no matter how …` bir ödün öbeğidir: ne kadar sıkılırsam sıkılayım. `not matter` ya da `never matter` bu kalıbın yerini tutmaz.",
            },
            {
              kind: "gap",
              id: "en-b1-06-l6-30",
              no: 30,
              text: "Gap 30",
              accept: ["that", "which"],
              explain:
                "Boşluk `the only piece of advice` öncülünü niteliyor ve öncül cansız: `that` ya da `which` gelir. `what` kendi öncülünü taşıdığı için burada kullanılamaz.",
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
        "This part has four tasks. You hear short extracts, conversations, a talk and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, konuşmalar, bir sunum ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b1-06-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear seven short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Yedi kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Müzik okulunda duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "A note for everybody in the Tuesday groups. The room for the beginners moves to the hall this week, because the piano in room two is being tuned. Everything else is the same. If you cannot find the hall, it is through the door behind the desk." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir tamirhane müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the guitar you left with us. The neck is fine, but the repair costs about ninety euros, which is more than we said on the phone. Call us before Friday; we do not start work without a yes." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir koro provasından söz ediyor.",
              plays: 2,
              segments: [
                { text: "Did you join the choir?" },
                { text: "I went to one rehearsal." },
                { text: "And?" },
                { text: "Everybody was better than me and nobody cared. That was the surprise. I go again on Thursday." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir öğretmen soruları yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "Listeners ask me how long it takes to learn an instrument as an adult. The honest answer is that the question is badly formed: learn it to do what? To play alone at home is two years. To play with other people is about six months, because you only need your own part." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Provanın başında duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "Before we start: the concert is on the fourteenth, not the seventh. The hall was double-booked. Everything else stays; same time, same programme. If you told your family the seventh, tell them again." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir müzisyen cumartesi provası için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Saturday. I can bring the amplifier and set up the room, but I have to leave at three for work. If we start at eleven we will have the sound right by then, and Goran said he can stay to the end." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir eğitmen yetişkinlere ders verenlere sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first year of teaching adults is choosing pieces that are too easy. It sounds kind and it is not. An adult who plays a children's song correctly feels nothing; give them something slightly too hard and they will practise." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the change this week?",
              options: ["The time of the lesson", "The room for one group", "The teacher for the beginners"],
              answer: 1,
              explain:
                "Anons tek bir değişiklik veriyor: «The room for the beginners moves to the hall this week». Gerekçe piyanonun akort edilmesi; «Everything else is the same» diyerek saat ve öğretmeni dışarıda bırakıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the shop asking for?",
              options: ["The guitar to be collected this week", "Payment before Friday", "Permission to do the work"],
              answer: 2,
              explain:
                "Son cümle koşulu koyuyor: «we do not start work without a yes». Cuma ödeme değil, onay tarihi; gitarın alınmasından hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-3",
              no: 3,
              ref: "a3",
              text: "What surprised the speaker?",
              options: ["Nobody minded that she was worse", "The rehearsal was much shorter than expected", "She was better than she thought"],
              answer: 0,
              explain:
                "Konuşmacı sürprizi kendisi adlandırıyor: «Everybody was better than me and nobody cared. That was the surprise». Yani daha iyi olduğunu keşfetmiyor, kimsenin umursamadığını görüyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say about the question?",
              options: ["It takes two years for everybody", "The answer depends on the aim", "Adults learn faster than children"],
              answer: 1,
              explain:
                "Konuşmacı soruyu ikiye ayırıyor: «learn it to do what?» — evde tek başına iki yıl, başkalarıyla altı ay. Yani tek bir süre yok; çocuk-yetişkin karşılaştırması hiç yapılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-5",
              no: 5,
              ref: "a5",
              text: "What has changed?",
              options: ["The programme", "The time", "The date"],
              answer: 2,
              explain:
                "Duyuru tarihi düzeltiyor: «the concert is on the fourteenth, not the seventh». Saat ve program için «same time, same programme» deniyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Agreeing to help for part of the day", "Asking somebody else to take her place", "Cancelling the rehearsal"],
              answer: 0,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can bring the amplifier and set up the room, but I have to leave at three». Goran yerine geçmiyor, sona kadar KALIYOR.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Choosing very easy pieces at the beginning", "Choosing pieces that stretch the learner", "Letting the learner choose"],
              answer: 1,
              explain:
                "Öğüt son cümlede: «give them something slightly too hard and they will practise». Kolay parça seçmek tam olarak eleştirilen hata; seçimi öğrenciye bırakmak hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b1-06-h2",
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
              situation: "İki arkadaş biten bir gitar kursunu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Mirek", text: "Are you still doing the guitar course?" },
                { speaker: "Hedda", text: "I finished it." },
                { speaker: "Mirek", text: "And?" },
                { speaker: "Hedda", text: "I can play three songs badly, which is exactly what they promised. I am not disappointed at all." },
              ],
            },
            {
              kind: "audio",
              id: "b2",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki koro üyesi büyüyen koroyu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Katri", text: "The choir has ninety people now." },
                { speaker: "Viggo", text: "Is it worse?" },
                { speaker: "Katri", text: "In the first concert, yes. Now it is better than when we were forty, and I did not expect to say that." },
              ],
            },
            {
              kind: "audio",
              id: "b3",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki arkadaş ikinci el bir kemanı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Tuva", text: "How much was the violin in the end?" },
                { speaker: "Goran", text: "Two hundred, and then one hundred and forty at the repairer." },
                { speaker: "Tuva", text: "So three hundred and forty." },
                { speaker: "Goran", text: "Yes. And it is still cheaper than a new one that sounds like that." },
              ],
            },
            {
              kind: "audio",
              id: "b4",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki meslektaş çalışma alışkanlığını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Viggo", text: "Do you practise every day?" },
                { speaker: "Hedda", text: "Twenty minutes, before work." },
                { speaker: "Viggo", text: "That is not much." },
                { speaker: "Hedda", text: "It is not. It is also five days a week more than I did for ten years." },
              ],
            },
            {
              kind: "audio",
              id: "b5",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki arkadaş bir kayıttan söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Mirek", text: "Did you record the song?" },
                { speaker: "Katri", text: "Yes, and I have not listened to it." },
                { speaker: "Mirek", text: "Why not?" },
                { speaker: "Katri", text: "Because I know what I will hear, and I want to enjoy this week first." },
              ],
            },
            {
              kind: "audio",
              id: "b6",
              genre: "Between friends",
              genreTr: "Arkadaşlar arasında",
              situation: "İki kişi konser sonrasını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Goran", text: "You played in the concert, didn't you?" },
                { speaker: "Tuva", text: "I sat in the third row and I played about half the notes." },
                { speaker: "Goran", text: "Everybody does that at first." },
                { speaker: "Tuva", text: "I have been doing it for four years." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-h2-8",
              no: 8,
              ref: "b1",
              text: "How does Hedda feel about the course?",
              options: ["Satisfied, because the promise was kept", "Disappointed with the final result", "Unsure whether she should continue next year"],
              answer: 0,
              explain:
                "Hedda sonucu vaatle karşılaştırıyor: «which is exactly what they promised. I am not disappointed at all». Kötü çalması bir başarısızlık değil, baştan söylenen sonuç.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h2-9",
              no: 9,
              ref: "b2",
              text: "What does Katri say about the sound?",
              options: ["It got worse and stayed worse", "It got worse and then better", "It never changed"],
              answer: 1,
              explain:
                "Katri iki dönemi ayırıyor: «In the first concert, yes» ve «Now it is better than when we were forty». Kötüleşme geçici olmuş.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h2-10",
              no: 10,
              ref: "b3",
              text: "What is Goran's point?",
              options: ["The violin was too expensive", "The repair cost more than the violin", "The total is still good value"],
              answer: 2,
              explain:
                "Goran toplamı kabul edip karşılaştırıyor: «it is still cheaper than a new one that sounds like that». Onarım kemandan ucuz (yüz kırk ile iki yüz).",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h2-11",
              no: 11,
              ref: "b4",
              text: "What does Hedda mean?",
              options: ["A small habit is better than none", "Twenty minutes is enough for anybody", "She wants to practise more"],
              answer: 0,
              explain:
                "Hedda azlığı kabul edip karşılaştırmayı değiştiriyor: «It is also five days a week more than I did for ten years». Ölçü, ideal değil, önceki hâli.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h2-12",
              no: 12,
              ref: "b5",
              text: "Why has Katri not listened to the recording?",
              options: ["The recording file did not work on her computer", "She wants to postpone the disappointment", "She has no time at all this week"],
              answer: 1,
              explain:
                "Katri gerekçeyi kendisi veriyor: «I know what I will hear, and I want to enjoy this week first». Teknik bir sorun ya da zaman darlığı geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h2-13",
              no: 13,
              ref: "b6",
              text: "What does Tuva admit?",
              options: ["She did not play in the concert", "She was in the front row", "She is not a beginner any more"],
              answer: 2,
              explain:
                "Karşı taraf «Everybody does that at first» deyince Tuva düzeltiyor: «I have been doing it for four years». Yani bu artık acemilikle açıklanamaz.",
            },
          ],
        },
        {
          id: "en-b1-06-h3",
          no: 3,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk for new members of a community orchestra. Complete the notes, questions 14 to 19. Write ONE or TWO words or a number in each gap. You hear the talk twice.",
          promptTr:
            "Bir halk orkestrasının yeni üyelerine yapılan konuşmayı dinleyeceksin. 14–19. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Sorumlu, yeni üyelere orkestrayı anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Welcome, and thank you for coming. We began in 1998 with twelve players and we now have eighty-eight. Last year we gave five concerts, and about two thousand people came in total. There is no audition; the only rule is that you come to two rehearsals in three. Rehearsals are on Wednesday at half past seven in the school hall. The fee is thirty pounds a year, and that includes the music. New players sit in the back row for the first term, whatever their experience. And the question everybody asks: yes, we cancel for snow, but never because somebody is away.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Community orchestra — notes",
              body: `Orchestra began in:         {{14}}
Number of players now:      {{15}}
Concerts last year:         {{16}}
Rehearsals on Wednesday at: {{17}}
Fee per year:               {{18}} pounds
New players sit in the:     {{19}} row`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b1-06-h3-14",
              no: 14,
              ref: "c1",
              text: "Gap 14",
              accept: ["1998"],
              explain:
                "«We began in 1998 with twelve players» — kuruluş yılı. On iki, o andaki çalgıcı sayısı; iki sayı aynı cümlede geçtiği için ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-06-h3-15",
              no: 15,
              ref: "c1",
              text: "Gap 15",
              accept: ["88", "eighty-eight"],
              explain:
                "«we now have eighty-eight» — bugünkü çalgıcı sayısı. On iki kuruluş anına ait; not kâğıdı `now` diyerek hangisini istediğini belirtiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-06-h3-16",
              no: 16,
              ref: "c1",
              text: "Gap 16",
              accept: ["5", "five"],
              explain:
                "«Last year we gave five concerts» — konser sayısı. İki bin, o konserlere gelen toplam kişi sayısı; iki sayı arka arkaya geçiyor.",
            },
            {
              kind: "gap",
              id: "en-b1-06-h3-17",
              no: 17,
              ref: "c1",
              text: "Gap 17",
              accept: ["half past seven", "7.30", "19.30"],
              explain:
                "«Rehearsals are on Wednesday at half past seven in the school hall» — prova saati. Yazıyla da rakamla da yazılabilir; yirmi dört saatlik biçim de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b1-06-h3-18",
              no: 18,
              ref: "c1",
              text: "Gap 18",
              accept: ["30", "thirty"],
              explain:
                "«The fee is thirty pounds a year, and that includes the music» — yıllık aidat. Not kâğıdında `pounds` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b1-06-h3-19",
              no: 19,
              ref: "c1",
              text: "Gap 19",
              accept: ["back"],
              explain:
                "«New players sit in the back row for the first term, whatever their experience» — yeni gelenlerin yeri. Deneyim fark etmiyor, kural herkes için aynı.",
            },
          ],
        },
        {
          id: "en-b1-06-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who started playing an instrument at forty-one. Choose a, b or c for questions 20 to 25. You hear the interview twice.",
          promptTr: "Kırk bir yaşında çalgıya başlayan bir kadınla söyleşi dinleyeceksin. 20–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında geç başlayan bir çalgıcıyla söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Tuva, you started the cello at forty-one. People assume there was a moment." },
                { speaker: "Tuva", text: "They do, and it makes a better story than the truth. There was no illness and no birthday. A neighbour moved out and left a cello in the hall with a note saying anybody could have it, and nobody else took it for a week." },
                { speaker: "Host", text: "Was the money the hardest part?" },
                { speaker: "Tuva", text: "No. The hardest part was the noise. I live in a flat with thin walls, and for the first year I practised with a towel under the strings, which teaches you nothing about sound. I told nobody I was learning, and that was the real cost." },
                { speaker: "Host", text: "How long before you told anybody?" },
                { speaker: "Tuva", text: "Fourteen months. I made a plan, which is what people like me do instead of starting. The plan said tell somebody at six months, and I ignored it twice." },
                { speaker: "Host", text: "What changed?" },
                { speaker: "Tuva", text: "A neighbour knocked. I assumed it was a complaint. She said she had heard the same eight bars for three weeks and wanted to know what the piece was. I have not practised with a towel since." },
                { speaker: "Host", text: "And now?" },
                { speaker: "Tuva", text: "I play badly and I play in a group, which are not connected in the way I feared. The real change is that I now know what I cannot hear, and that is a stranger kind of progress than getting better." },
                { speaker: "Host", text: "Would you recommend starting at forty?" },
                { speaker: "Tuva", text: "Not as a general rule. If you need to be good at things, this is advice from a comfortable position and it is worth saying so. What I would recommend is telling one person in the first month, which costs nothing and would have saved me a year." },
              ],
              gloss: [
                { de: "a cello", tr: "çello", en: "cello" },
                { de: "a bar", tr: "ölçü (müzikte)", en: "bar in music" },
                { de: "strings", tr: "teller", en: "strings" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b1-06-h4-20",
              no: 20,
              ref: "d1",
              text: "Why did Tuva start the cello?",
              options: ["A particular birthday made her think about time", "She had always wanted to play", "An instrument was left in her building"],
              answer: 2,
              explain:
                "Tuva dramatik gerekçeleri baştan eliyor: «There was no illness and no birthday», sonra olayı anlatıyor: komşusu holde bir çello bırakmış ve bir hafta kimse almamış.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h4-21",
              no: 21,
              ref: "d1",
              text: "What was the hardest part?",
              options: ["Practising without being heard", "The cost of the lessons in the first year", "Finding a teacher"],
              answer: 0,
              explain:
                "Parayı açıkça dışarıda bırakıyor: «No. The hardest part was the noise», ve havlu altında çalışmanın sesle ilgili hiçbir şey öğretmediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h4-22",
              no: 22,
              ref: "d1",
              text: "What does she say about her plan?",
              options: ["It was written for her by a teacher", "She used it to avoid starting", "It turned out to be accurate"],
              answer: 1,
              explain:
                "Kendi sözü: «I made a plan, which is what people like me do instead of starting». Plan doğru şeyi söylemiş (altı ayda birine söyle), o iki kez yok saymış.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h4-23",
              no: 23,
              ref: "d1",
              text: "What did the neighbour want?",
              options: ["To ask her to stop playing in the evening", "To borrow the cello", "To know what the music was"],
              answer: 2,
              explain:
                "Tuva şikâyet beklemiş ama komşu «wanted to know what the piece was» demiş. Bu andan sonra havluyla çalışmayı bırakıyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she say about playing badly?",
              options: ["It does not prevent playing with others", "It has stopped her from performing in public", "It is a temporary problem"],
              answer: 0,
              explain:
                "«I play badly and I play in a group, which are not connected in the way I feared». Yani kötü çalmak toplulukta çalmaya engel değilmiş; geçici olduğunu da söylemiyor.",
            },
            {
              kind: "mcq",
              id: "en-b1-06-h4-25",
              no: 25,
              ref: "d1",
              text: "What does she recommend?",
              options: ["Starting before forty if possible", "Telling one person early", "Buying a good instrument first"],
              answer: 1,
              explain:
                "Öğüt son cümlede: «telling one person in the first month, which costs nothing and would have saved me a year». Kırk yaşından önce başlamayı ya da iyi çalgı almayı önermiyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 50,
      instruction: "This part has two tasks: an email and a longer text. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var: bir e-posta ve daha uzun bir metin. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-b1-06-w1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "You paid for a ten-week course and you have missed three weeks because of your shifts at work. Write an email to the course office. Write about 100 words and cover all the points.",
          promptTr:
            "On haftalık bir kursun ücretini ödedin ve iş vardiyaların yüzünden üç haftayı kaçırdın. Kurs ofisine bir e-posta yaz. Yaklaşık 100 kelime, bütün maddeleri işle.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say which course you are on and what you have paid.", tr: "Hangi kursta olduğunu ve ne ödediğini söyle." },
              { de: "Explain why you have missed the lessons.", tr: "Dersleri neden kaçırdığını açıkla." },
              { de: "Ask for one clear solution.", tr: "Açık tek bir çözüm iste." },
            ],
            sample: `Dear Sir or Madam,

I am on the Tuesday beginners' guitar course and I paid the full fee of 120 euros in September.

Since the middle of October my employer has moved me onto late shifts, and I have missed three of the ten lessons. I have asked to change my shifts and the answer is no before January.

I do not want a refund, because I would like to finish the course. Could I join the Thursday group for the remaining weeks, or repeat the three lessons in the spring?

I would be grateful for an answer before Friday.

Yours faithfully,
Hedda Larsen`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Tarih, tutar ve ders sayısı gibi somut bilgiler verildi mi?",
              "Present perfect doğru kullanıldı mı? (`I have missed`, `has moved`)",
              "Tek ve açık bir çözüm mü isteniyor?",
              "Kayıt resmî mi? Yaklaşık 100 kelime yazıldı mı?",
            ],
          },
        },
        {
          id: "en-b1-06-w2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Write an article for a website with this title: \"Something I am bad at and do anyway\". Say what it is, how you started and what you get from it. Write about 100 words.",
          promptTr:
            "Bir internet sitesi için şu başlıkla bir yazı yaz: \"Kötü olduğum ve yine de yaptığım bir şey\". Ne olduğunu, nasıl başladığını ve ondan ne kazandığını yaz. Yaklaşık 100 kelime.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Say what you are bad at.", tr: "Neyde kötü olduğunu söyle." },
              { de: "Say how you started.", tr: "Nasıl başladığını söyle." },
              { de: "Say what you get from it.", tr: "Ondan ne kazandığını söyle." },
            ],
            sample: `I have been drawing for six years and I am still bad at it. That is not modesty; my sister draws better with her left hand.

It started badly. I bought an expensive book, followed it for eleven days and stopped. What worked was much smaller: one page a day, in a cheap notebook, always at the same table.

What I get from it is not pictures. It is that I look at things for longer than I used to. I noticed the shape of our own front door for the first time in November, after nine years of walking through it.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Başlangıç somut bir hikâyeyle mi anlatıldı?",
              "Kazanç somut bir örnekle mi verildi, yoksa genel mi kaldı?",
              "Present perfect ve `used to` doğru kullanıldı mı?",
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
          id: "en-b1-06-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your free time and about learning new things.",
          promptTr: "Sana boş zamanın ve yeni şeyler öğrenmek hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What do you do in your free time, and how often?", tr: "İyi günler. Boş zamanında ne yapıyorsun, ne sıklıkta?" },
            { who: "you", hint: "Uğraşını sıklık ifadeleriyle anlat.", expect: "bir uğraşı sıklık ifadeleriyle anlatmak", seconds: 40 },
            { who: "partner", de: "Thank you. Have you tried to learn something new in the last few years?", tr: "Teşekkürler. Son birkaç yılda yeni bir şey öğrenmeyi denedin mi?" },
            { who: "you", hint: "Present perfect ya da `used to` ile bir değişimi anlat.", expect: "zaman içindeki bir değişimi anlatmak", seconds: 40 },
            { who: "partner", de: "And if you had six free months, what would you learn?", tr: "Altı ay boş vaktin olsa ne öğrenirdin?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşul cümlesiyle bir varsayım kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a hobby with frequency words", tr: "Bir uğraşı sıklık ifadeleriyle anlatmak" },
              { de: "describe an attempt to learn something", tr: "Yeni bir şey öğrenme denemesini anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "I read most evenings and I play football once a week, usually on Sunday morning. Two years ago I started Spanish with an app, and I used it every day for four months and then stopped; I have not opened it since March. If I had six free months, I would learn to swim properly, because I can swim badly and that is worse than not swimming at all.",
            criteria: [
              "Sıklık ifadeleri kullanıldı mı? (most evenings, once a week)",
              "`used to` ya da present perfect ile değişim anlatıldı mı?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b1-06-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one minute. Compare these two ways of learning something new: a course with a teacher and fixed times, or learning alone with videos whenever you want. Say which you would prefer and why.",
          promptTr:
            "Yaklaşık bir dakika tek başına konuş. Yeni bir şey öğrenmenin şu iki yolunu karşılaştır: öğretmenli ve sabit saatli bir kurs mu, istediğin zaman videoyla tek başına öğrenmek mi? Hangisini tercih edeceğini ve nedenini söyle.",
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
              "A course gives you a time that somebody else has decided and a person who notices when you are not there. On the other hand, it only works if that hour fits your week. Videos are flexible, but flexible often means never, and nobody tells you that you are holding the thing wrongly. I would choose the course, mainly because I need to be expected. The disadvantage is that when I miss two weeks I feel embarrassed, and embarrassment is a very good reason to miss a third.",
            criteria: [
              "İki yol da gerçekten karşılaştırıldı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (on the other hand, only works if)",
              "Tercih gerekçelendirildi mi?",
              "Seçilen yolun olumsuz yanı da söylendi mi?",
              "Bir dakika kesintisiz konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b1-06-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Our community centre has money for one new activity this year. Talk with me about the options and decide together.",
          promptTr:
            "Toplum merkezimizin bu yıl tek bir yeni etkinlik için parası var. Seçenekleri benimle konuş ve birlikte karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a choir with no audition, practice rooms open at night, a repair workshop for instruments, or a beginners' course for adults. Which do you think we should choose?", tr: "Seçenekler: seçmesiz bir koro, gece açık prova odaları, çalgılar için bir tamir atölyesi ya da yetişkinler için başlangıç kursu. Sence hangisini seçmeliyiz?" },
            { who: "you", hint: "Bir seçenek seç ve gerekçelendir.", expect: "bir seçeneği seçmek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "I understand. But a choir needs no money at all, and the practice rooms would serve maybe fifteen people. Does that change your mind?", tr: "Anlıyorum. Ama koro hiç para gerektirmiyor ve prova odaları belki on beş kişiye hizmet eder. Bu fikrini değiştirir mi?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver: kabul et ya da çürüt.", expect: "bir itiraza doğrudan karşılık vermek", seconds: 40 },
            { who: "partner", de: "Fair enough. So what do we put forward at the meeting?", tr: "Peki. Toplantıda neyi öneriyoruz?" },
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
              "I would start with the beginners' course, because it is the only option that brings in people who do not play anything yet. You are right that the choir costs nothing, and that is a strong argument; but a choir needs somebody to run it, and that person is the money. All right: let us put the choir forward, since it reaches most people, and ask for the beginners' course again next year with numbers.",
            criteria: [
              "Görüş gerekçelendirildi mi?",
              "İtiraza doğrudan mı karşılık verildi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
              "Sonunda ortak bir karar çıktı mı?",
            ],
          },
        },
        {
          id: "en-b1-06-s4",
          no: 4,
          format: "speaking",
          goal: "interaction",
          prompt: "We talk a little more about the same topic: whether it matters to be good at something.",
          promptTr: "Aynı konu üzerine biraz daha konuşuyoruz: bir şeyde iyi olmak önemli mi.",
          prepSeconds: 15,
          exchange: [
            { who: "partner", de: "Do you think there is any point in doing something you will never be good at?", tr: "Sence hiçbir zaman iyi olamayacağın bir şeyi yapmanın anlamı var mı?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnek ver.", expect: "genel bir soruya görüş bildirmek ve örneklendirmek", seconds: 40 },
            { who: "partner", de: "Some people say that adults should spend their free time on things they are already good at. Would you agree?", tr: "Bazıları yetişkinlerin boş zamanını zaten iyi oldukları şeylere ayırması gerektiğini söylüyor. Katılır mısın?" },
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
              "I think there is, although the reason is not the one people give. I have played badminton for eleven years and I lose to teenagers every week; what I get is two hours in which nobody can reach me. I partly agree that adults should use their strengths, because being bad at something in public is genuinely unpleasant, but that argument keeps most people out of everything they did not start at ten.",
            criteria: [
              "Görüş açıkça bildirildi mi?",
              "Somut bir örnek verildi mi?",
              "Kısmi katılım ifadeleri kullanıldı mı? (I partly agree, although)",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
      ],
    },
  ],
};

import type { MockPaper } from "../types";

/**
 * B2 · Deneme 7 — "Language, Accent and Getting a Job".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Konu B2 için elverişli
 * çünkü kanıt, itiraf ve çıkar çatışması aynı metinde yan yana duruyor:
 * işveren etkiyi inkâr ederken dürüst olabiliyor, çözüm önerisi ise kusuru
 * adayın üstüne yıkabiliyor. Bu ikilik edilgen yapı, ortaç öbeği ve ileri
 * bağlayıcı için doğal bir zemin veriyor.
 *
 * Uzun metinlerin kuruluşu bilerek altıncı denemeden ayrı: beşinci görev
 * mesleğini bırakan birinin itirafı, dinlemedeki söyleşi ise fikrini
 * değiştirmiş bir muhalifin geri dönüşü. Altıncı denemede ikisi de "savını
 * kazanan ama uygulamayı kaybeden kişi" idi.
 */
export const EN_B2_07: MockPaper = {
  id: "en-b2-07",
  course: "en",
  level: "B2",
  no: 7,
  theme: "Language, Accent and Getting a Job",
  themeTr: "Dil, aksan ve işe alınmak",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. You complete texts, transform sentences, read an article and match texts and sentences.",
      instructionTr:
        "Bu bölümde yedi görev var. Metinleri tamamlayacak, cümleleri dönüştürecek, bir yazı okuyacak ve metin/cümle eşleyeceksin.",
      tasks: [
        {
          id: "en-b2-07-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en iyi uyan cevabı seç. a, b, c ya da d.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Feature article",
              genreTr: "Dergi yazısı",
              title: "The eleven seconds",
              body: `Recruiters like to say that they judge on substance, and most of them believe it. The research does not {{1}} them out. In the studies that have been done, a listener forms a stable impression of competence within about eleven seconds, which is roughly the time it {{2}} to say a name and a hometown.

What is being judged in those seconds is not the argument, because no argument has yet been made. It is the voice: its speed, its vowels, and the region they {{3}} to.

The usual remedy is a course in the standard accent. Whatever else can be said for it, it puts the {{4}} on the candidate, and it works, which is why it is difficult to argue against.

Employers who take the problem seriously do something less comfortable. They {{5}} with the first minutes altogether, or they read the answers as text with no name attached.

None of this is about politeness. A firm that hires on eleven seconds is {{6}} out most of the people it was looking for.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-07-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["carry", "hold", "bear", "take"],
              answer: 2,
              explain:
                "`bear somebody out` «birini doğrulamak, sözünü desteklemek» anlamında yerleşik bir öbek fiildir ve cümle araştırmanın işverenleri doğrulamadığını söylüyor. `carry out` yürütmek, `hold out` dayanmak, `take out` ise çıkarmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["takes", "makes", "spends", "gives"],
              answer: 0,
              explain:
                "Süre için kullanılan kalıp `it takes + zaman + to + fiil`dir: «the time it takes to say a name». `spend` özne olarak kişiyi ister (`he spends an hour`), boş bir `it` öznesini değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["point", "refer", "attach", "belong"],
              answer: 3,
              explain:
                "Sesli harflerin ait olduğu bölge anlatılıyor ve `belong to` bu aidiyeti kurar. `refer to` göndermede bulunmak, `point to` işaret etmek, `attach to` ise iliştirmek anlamına gelir.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["fault", "blame", "guilt", "charge"],
              answer: 1,
              explain:
                "`put the blame on somebody` yerleşik eşdizimdir. `fault` bu kalıpta `at fault` ya da `the fault of` biçiminde gelir; `guilt` ahlaki suçluluk duygusunu, `charge` ise resmî bir suçlamayı bildirir.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["dispense", "do", "part", "deal"],
              answer: 0,
              explain:
                "`dispense with something` «onsuz yapmak» demektir ve tam olarak ilk dakikaları devre dışı bırakmayı anlatır. `deal with` ele almak, `part with` elden çıkarmak, `do with` ise bu bağlamda anlamsız kalır.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["sorting", "picking", "screening", "ruling"],
              answer: 2,
              explain:
                "`screen out` bir eleme sürecinde istenmeyeni dışarıda bırakmayı anlatır ve cümle firmanın aradığı kişileri farkında olmadan elediğini söylüyor. `sort out` düzene sokmak, `pick out` seçmek, `rule out` ise bir olasılığı dışlamaktır.",
            },
          ],
        },
        {
          id: "en-b2-07-l2",
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
              title: "What the studies actually show",
              body: `For {{7}} least forty years, researchers have played the same recording to two groups and changed nothing except the voice.

The results are consistent enough {{8}} be uncomfortable. The speaker with the regional accent is rated lower on competence and higher on warmth, whatever the words.

This is not a matter {{9}} deliberate prejudice. Most listeners cannot say afterwards what they based the judgement on.

Nor {{10}} the effect confined to one country. Similar findings have been reported wherever anybody has looked for them.

Despite the weight of that evidence, the standard reply from employers twenty years ago was that no {{11}} effect existed at all.

{{12}} is much less common now is that reply. What has replaced it is the claim that the candidate should simply learn to speak differently.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-07-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["at"],
              explain:
                "`at least` bir alt sınır bildiren yerleşik öbektir: «For at least forty years». Başka bir edat bu öbeği kurmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["to"],
              explain:
                "`enough` sıfattan sonra gelip mastarla tamamlanır: `consistent enough to be uncomfortable`. Yeterlilik yapısı bu sırayı zorunlu kılar.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["of"],
              explain:
                "`a matter of` bir şeyin neyle ilgili olduğunu bildiren yerleşik kalıptır: «not a matter of deliberate prejudice».",
            },
            {
              kind: "gap",
              id: "en-b2-07-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["is"],
              explain:
                "Cümle olumsuz bir bağlaçla (`Nor`) başlıyor ve bu, devrik kuruluş gerektirir: yardımcı fiil özneden önce gelir. Özne `the effect` tekil olduğu için `is`.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["such"],
              explain:
                "`no such effect` daha önce anılan türden bir etkiyi yok sayar. `such` bu göndermeyi yapar; sıfat ya da belirteç bu konumda aynı işi görmez.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["what"],
              explain:
                "Cümle vurgulu bir yarma yapısıyla kuruluyor: `What is much less common now is …`. Bu yapının başında öncülü olmayan `what` bulunur.",
            },
          ],
        },
        {
          id: "en-b2-07-l3",
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
              title: "Accent bias",
              body: `Accent bias is the tendency for a listener's {{13}} of a speaker to be affected by features of pronunciation rather than by content.

Experimental work usually holds the words constant and varies only the voice, so that differences in rated {{14}} can be attributed to the accent alone.

The effect is rarely deliberate. It rests on an {{15}} that the standard variety signals education, and that idea survives long after the evidence for it has gone.

Employers who accept the finding differ sharply over what follows. One response is training for the candidate; another is the {{16}} of written tasks in the first round.

Critics of the first response argue that it leaves the {{17}} untouched and merely moves the cost of it onto the person with least power.

Reviews of the field conclude that the effect is real, modest in size, and largest where the listener's own {{18}} are strongest.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-07-l3-13",
              no: 13,
              text: "JUDGE",
              accept: ["judgement", "judgment"],
              explain:
                "`a listener's ___ of a speaker` yapısında iyelikten sonra bir ad gerekiyor: `judgement`. Fiil biçimi bu konumda duramaz; `judge` bir kişiyi adlandırır ve `of a speaker` tümleciyle bu anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l3-14",
              no: 14,
              text: "COMPETENT",
              accept: ["competence"],
              explain:
                "`differences in rated ___` yapısında edat tümlecinin başı bir ad olmalı ve `rated` onu niteliyor. Sıfat biçimi (`competent`) bu konumda `in` edatının nesnesi olamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l3-15",
              no: 15,
              text: "ASSUME",
              accept: ["assumption"],
              explain:
                "`It rests on an ___ that …` yapısında belirsiz tanımlıktan sonra bir ad ve ardından açıklayıcı bir `that` cümleciği geliyor. Fiil biçimi bu iki koşulu birden karşılamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l3-16",
              no: 16,
              text: "INTRODUCE",
              accept: ["introduction"],
              explain:
                "`another is the ___ of written tasks` yapısında belirli tanımlıkla `of` arasında bir ad var; ayrıca cümle bir öncekiyle koşut kuruluyor (`training` da addır).",
            },
            {
              kind: "gap",
              id: "en-b2-07-l3-17",
              no: 17,
              text: "EQUAL",
              accept: ["inequality"],
              explain:
                "Cümle eleştiriyi taşıyor: eğitim, sorunu değil yalnız maliyetini yer değiştiriyor. Dokunulmadan kalan şey EŞİTSİZLİKTİR. `equal` sıfatından `equality` adı, ondan da olumsuzu `inequality` türetilir.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l3-18",
              no: 18,
              text: "PREFER",
              accept: ["preferences"],
              explain:
                "`the listener's own ___ are strongest` yapısında iyelikten sonra bir ad geliyor ve yüklem `are` olduğu için ad çoğul olmalı: `preferences`.",
            },
          ],
        },
        {
          id: "en-b2-07-l4",
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
              id: "en-b2-07-l4-19",
              no: 19,
              text: "Nobody has ever measured the effect in this industry.\nThe effect ______ in this industry.",
              cue: "BEEN",
              accept: ["has never been measured"],
              explain:
                "`Nobody has ever` yapısı edilgene çevrilirken olumsuzluk yükleme taşınır: «has never been measured». Anahtar sözcük `been` olduğu için zincir `has never been + üçüncü hâl` biçimini alır.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l4-20",
              no: 20,
              text: "It is a pity that I did not record the interview.\nI wish ______ the interview.",
              cue: "HAD",
              accept: ["i had recorded"],
              explain:
                "Geçmişe yönelik pişmanlık `wish + had + üçüncü hâl` ile kurulur. Birinci cümle kaydın yapılmadığını söylüyor, dolayısıyla dilek olumlu biçimde gelir: «I had recorded».",
            },
            {
              kind: "gap",
              id: "en-b2-07-l4-21",
              no: 21,
              text: "I only understood the problem after I had listened to the recording twice.\nNot until I had listened to the recording twice ______ the problem.",
              cue: "DID",
              accept: ["did i understand"],
              explain:
                "`Not until` ile başlayan cümle devrik kuruluş ister: yardımcı fiil özneden önce gelir. Geçmiş zaman olduğu için yardımcı fiil `did` ve ardından yalın fiil gelir.",
            },
            {
              kind: "gap",
              id: "en-b2-07-l4-22",
              no: 22,
              text: "The interviewer was so tired that she stopped taking notes.\nThe interviewer was ______ take notes.",
              cue: "TIRED",
              accept: ["too tired to"],
              explain:
                "`so … that` yapısı `too … to` yapısına çevriliyor: aşırılık artık sonucu değil, engellenen eylemi bildiriyor. Anahtar sözcük sıfat olduğu için çevresine `too` ve `to` gelir.",
            },
          ],
        },
        {
          id: "en-b2-07-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–27. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Opinion piece",
              genreTr: "Görüş yazısı",
              title: "I taught people to sound like somebody else",
              body: `For six years I ran courses that taught people to sound like somebody else, and I was good at it.

The courses worked. That is the part the critics of this industry tend to underplay. A person who came to me at twenty-four and left nine months later was, by any measure I could apply, more likely to be offered a job. Several of them told me so, and one sent flowers.

I stopped anyway, and not because of an argument I read.

I stopped because of a woman in her fifties who came for the third module and asked, in the break, whether her son should start now, at eleven, so that he would not have to do this later. I said something reassuring, and then I went home and sat in the car.

The honest description of my work is this: I was charging people for the cost of somebody else's prejudice, and I was charging them forty pounds an hour for it.

I am aware of the obvious reply. If the prejudice exists, my course was the only thing on offer that did anything about it this year. That reply is correct and I have no answer to it, which is why I lasted six years and not two. If I had found an answer to it, I would have stopped much sooner.

What changed my mind about the alternative was not principle but a spreadsheet. Two firms I worked with moved the first round to written tasks, and their shortlists changed shape within a year. It cost them almost nothing. Nobody had to sit in a room and be told that the way their mother spoke was a problem to be solved.`,
              gloss: [
                { de: "prejudice", tr: "önyargı", en: "prejudice" },
                { de: "a shortlist", tr: "kısa liste", en: "shortlist" },
                { de: "to underplay", tr: "önemsizleştirmek", en: "underplay" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-07-l5-23",
              no: 23,
              text: "What does the writer say about the courses she ran?",
              options: [
                "They rarely produced any measurable change",
                "They achieved what they promised",
                "They were too expensive for most of her students",
                "They needed far longer than nine months",
              ],
              answer: 1,
              explain:
                "Yazar bunu eleştirmenlere karşı savunuyor: «The courses worked … more likely to be offered a job». Dokuz ay kursun süresi, yetersizliği değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l5-24",
              no: 24,
              text: "Why did the writer stop?",
              options: [
                "An article she read changed her view",
                "The demand for the courses fell away",
                "She could no longer teach the method well",
                "A question from a student unsettled her",
              ],
              answer: 3,
              explain:
                "Yazı gerekçeyi açıkça ayırıyor: «not because of an argument I read», sonra sorunun kendisini veriyor: «whether her son should start now, at eleven».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l5-25",
              no: 25,
              text: "How does the writer describe her own work?",
              options: [
                "Charging people for another person's prejudice",
                "A service that nobody had ever actually needed",
                "Training that left her students less employable",
                "Work that she had never been any good at",
              ],
              answer: 0,
              explain:
                "Yazar kendi tanımını veriyor: «I was charging people for the cost of somebody else's prejudice». Kursun işe yaradığını da söylüyor, yani üçüncü şık metne aykırı.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l5-26",
              no: 26,
              text: "What does she say about the reply that her course was the only help available?",
              options: [
                "It rests on a mistake about the evidence",
                "It is made only by people who profit from it",
                "She accepts it and cannot answer it",
                "It applies to other industries but not to hers",
              ],
              answer: 2,
              explain:
                "Yazı karşı savı kabul ediyor ve bedelini söylüyor: «That reply is correct and I have no answer to it, which is why I lasted six years and not two».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-l5-27",
              no: 27,
              text: "What finally persuaded her that there was an alternative?",
              options: [
                "A principle she had held for a long time",
                "The reaction of her own former students",
                "A change in the law about hiring",
                "What happened at two firms she worked with",
              ],
              answer: 3,
              explain:
                "Son paragraf kaynağı adlandırıyor: «not principle but a spreadsheet» — iki firma birinci turu yazılı göreve taşıyor ve «their shortlists changed shape within a year».",
            },
          ],
        },
        {
          id: "en-b2-07-l6",
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
              title: "Why the eleven seconds are hard to remove",
              body: `Every proposal for fairer hiring runs into the same obstacle, and the obstacle is not the interviewer's opinion. It is the interviewer's speed. {{28}}

The obvious fix is to slow the process down. Give the panel a scoring sheet, make them write a sentence about each criterion, and the snap impression has to compete with something written. This helps. It helps a good deal less than the people who design the sheets expect. {{29}}

A second approach removes the voice altogether from the first round. Written tasks, marked without names, produce shortlists that look different, and firms that try it rarely go back. {{30}}

There is a third position, which is that none of this addresses the customer. A law firm whose clients expect a particular voice is not being irrational when it hires that voice. It is passing on a preference that begins somewhere else. {{31}}

That is a longer argument and a slower one. Given how few firms have ever asked a client what he actually wants, it is also the one least likely to be started. It also happens to be the only version of the problem that ends anywhere.`,
              gloss: [
                { de: "a criterion", tr: "ölçüt", en: "criterion" },
                { de: "to anonymise", tr: "kimliksizleştirmek", en: "anonymise" },
                { de: "an obstacle", tr: "engel", en: "obstacle" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The sheet gets filled in after the impression has formed, and it is remarkably good at justifying one." },
            { key: "b", label: "b", body: "Impressions of competence are formed faster than anybody can be trained to notice them forming." },
            { key: "c", label: "c", body: "The cost is a day of somebody's time, and the objection is almost always that it feels impersonal." },
            { key: "d", label: "d", body: "Answering that requires changing the client, which no hiring policy can do on its own." },
            { key: "e", label: "e", body: "Interview panels in the public sector have used scoring sheets since the late 1970s." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-07-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "b",
              explain:
                "Giriş engeli adlandırıyor: «It is the interviewer's speed». (b) hızın neden eğitimle aşılamadığını söyleyerek o cümleyi tamamlıyor ve sonraki paragrafın «yavaşlatalım» önerisini hazırlıyor.",
            },
            {
              kind: "match",
              id: "en-b2-07-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "a",
              explain:
                "Paragraf çözümü anlatıp sınırını koyuyor: «It helps a good deal less than the people who design the sheets expect». (a) o sınırın mekanizmasını veriyor: kâğıt izlenim oluştuktan sonra dolduruluyor.",
            },
            {
              kind: "match",
              id: "en-b2-07-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "c",
              explain:
                "Paragraf yöntemin işe yaradığını söylüyor: «firms that try it rarely go back». (c) hemen ardından bedelini ve tek itirazı ekliyor: bir günlük iş gücü ve «it feels impersonal». Fayda anlatıldıktan sonra gelmesi gereken bilgi budur.",
            },
            {
              kind: "match",
              id: "en-b2-07-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "d",
              explain:
                "Üçüncü konum müşteriyi işaret ediyor: «It is passing on a preference that begins somewhere else». (d) «Answering that» ile oraya bağlanıp neden uzun bir tartışma olduğunu veriyor. (e) kamu kurumlarının 1970'lerden beri puan kâğıdı kullandığını söylüyor ve metinde uygulamanın tarihi hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-07-l7",
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
              label: "a — Deniz, recruiter",
              body: "I have sat on maybe four hundred panels. The thing nobody admits is that the decision is usually made in the first two minutes and the rest of the hour is spent looking for reasons. I do not think my colleagues are prejudiced people. I think an hour is a very long time to spend defending something you decided in one hundred and twenty seconds.",
            },
            {
              key: "b",
              label: "b — Wren, speech coach",
              body: "I teach people to be understood, which is not the same as teaching them to sound like a newsreader, although half my enquiries want the second thing. I turn those down now, and I lost income by doing it. What I will not do is pretend the market is fair while I am billing somebody for the consequences of it.",
            },
            {
              key: "c",
              label: "c — Piet, employer",
              body: "We moved our first round to written work three years ago and our shortlists changed within a year. I want to be careful about the claim, though. We did not become fairer people. We removed one opportunity to be unfair, and I still have no idea what the second round is doing.",
            },
            {
              key: "d",
              label: "d — Sora, researcher",
              body: "The effect is real and it is smaller than the headlines suggest. It is about a fifth of a point on a five-point scale, which matters enormously when you are ranking forty candidates and hardly at all when you are choosing between two. Most of the arguing happens because nobody says which of those situations they mean.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-07-l7-32",
              no: 32,
              text: "describes a change that worked without making the organisation any better in itself",
              answer: "c",
              explain:
                "Metin ayrımı kendisi kuruyor: «We did not become fairer people. We removed one opportunity to be unfair». Sonuç değişiyor ama kurumun ahlakı değişmiyor.",
            },
            {
              kind: "match",
              id: "en-b2-07-l7-33",
              no: 33,
              text: "says that the importance of the effect depends on the situation",
              answer: "d",
              explain:
                "Metin iki durumu karşılaştırıyor: «matters enormously when you are ranking forty candidates and hardly at all when you are choosing between two».",
            },
            {
              kind: "match",
              id: "en-b2-07-l7-34",
              no: 34,
              text: "has refused work that is in demand",
              answer: "b",
              explain:
                "Metin hem talebi hem reddi veriyor: «half my enquiries want the second thing. I turn those down now, and I lost income by doing it».",
            },
            {
              kind: "match",
              id: "en-b2-07-l7-35",
              no: 35,
              text: "suggests that most of an interview is spent producing justifications",
              answer: "a",
              explain:
                "Metin süreyi ikiye bölüyor: karar ilk iki dakikada veriliyor ve «the rest of the hour is spent looking for reasons».",
            },
            {
              kind: "match",
              id: "en-b2-07-l7-36",
              no: 36,
              text: "admits that one stage of the process has still not been examined",
              answer: "c",
              explain:
                "Metin bunu açıkça bırakıyor: «I still have no idea what the second round is doing». Birinci tur düzeltilmiş, ikincisi incelenmemiş.",
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
        "This part has four tasks. You hear short extracts, a report, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Manager",
              genreTr: "Yönetici",
              situation: "Bir yönetici mülakat puanlama kâğıdından söz ediyor.",
              plays: 2,
              segments: [
                { text: "We had a scoring sheet and everybody filled it in. Then I looked at the sheets and found that the candidate everybody liked had scored highest on every criterion, including two that nobody had asked about. That is not a scoring sheet. That is a receipt." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Candidate",
              genreTr: "Aday",
              situation: "Bir aday mülakatlardan söz ediyor.",
              plays: 2,
              segments: [
                { text: "They asked me where I was from and I said the name of the town, and there was a pause of about half a second before the next question. Half a second is nothing. I have had eleven interviews and I can tell you exactly which four had the pause." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Adviser",
              genreTr: "Danışman",
              situation: "Bir konuşma danışmanı gelen taleplerden söz ediyor.",
              plays: 2,
              segments: [
                { text: "People come to me wanting to lose an accent, and I ask one question first: has anybody actually failed to understand you? About a third say yes, and I can help those people. The other two thirds are asking me for something else, and I tell them so." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir araştırmacı bulgunun sınırını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The finding is robust. It has been replicated in five countries. What has not been established is the size of the effect in a real hiring decision, because the studies use students rating recordings, and a student rating a recording has nothing to lose." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Employer",
              genreTr: "İşveren",
              situation: "Bir işveren yazılı birinci tura gelen tepkiyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "Written first rounds cost us a day of somebody's time, which we can afford. The complaint we get is not about the cost. It is that candidates find it impersonal, and two of them told us they would rather be judged by a human being who might be wrong." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Teacher",
              genreTr: "Öğretmen",
              situation: "Bir öğretmen kendi konumunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "I tell my students that they will be judged on their voice and that this is unjust. Then I teach them the standard forms anyway. I have not resolved that and I do not think I am going to. Pretending the world is fair does not help a nineteen-year-old in June." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "İki kişi panel notlarını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you get the notes from the panel?" },
                { text: "I did. Three of them wrote communication and none of them wrote what they meant by it." },
                { text: "Is that unusual?" },
                { text: "It is the most common word on the sheets and the least defined." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı ortak ölçünlü konuşma fikrini ele alıyor.",
              plays: 2,
              segments: [
                { text: "There is a version of this argument that ends with everybody speaking the same way, and I want to say plainly that it would be a loss. But that is not the choice in front of a person filling in an application in a town with one employer. The loss is real and it is not theirs to carry." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-07-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the speaker's point about the scoring sheet?",
              options: ["It was filled in incorrectly by the panel", "It took far too long to complete", "It recorded a decision already made"],
              answer: 2,
              explain:
                "Konuşmacı kâğıdı bir belge olarak yeniden adlandırıyor: «That is not a scoring sheet. That is a receipt». Sorulmamış iki ölçütte bile en yüksek puanın verilmesi bunu gösteriyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the speaker describing?",
              options: ["A small signal she now notices", "A question she refused to answer twice", "An interview she decided to walk out of"],
              answer: 0,
              explain:
                "Konuşmacı duraksamanın küçüklüğünü ve kendi hassaslığını birlikte veriyor: «Half a second is nothing … I can tell you exactly which four had the pause».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the speaker do with most enquiries?",
              options: ["Passes them on to a specialist colleague", "Tells them what they are really asking", "Offers them a shorter and cheaper course"],
              answer: 1,
              explain:
                "Danışman oranı verip ne yaptığını söylüyor: «The other two thirds are asking me for something else, and I tell them so».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-4",
              no: 4,
              ref: "a4",
              text: "What limit does the speaker name?",
              options: ["The finding has only been tested once", "The five countries are too similar to compare", "The studies do not resemble real decisions"],
              answer: 2,
              explain:
                "Araştırmacı yöntemin zayıf yerini gösteriyor: «the studies use students rating recordings, and a student rating a recording has nothing to lose». Bulgunun kendisi sağlam.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-5",
              no: 5,
              ref: "a5",
              text: "What objection does the speaker report?",
              options: ["That the process feels impersonal", "That the process costs the firm too much", "That the results are no different at all"],
              answer: 0,
              explain:
                "İşveren itirazı maliyetten ayırıyor: «The complaint we get is not about the cost. It is that candidates find it impersonal».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-6",
              no: 6,
              ref: "a6",
              text: "How does the speaker describe her own position?",
              options: ["She has recently changed her whole method", "She holds two views she cannot reconcile", "She thinks the problem has been exaggerated"],
              answer: 1,
              explain:
                "Öğretmen iki şeyi birden yapıyor: haksızlığı söylüyor ve ölçünlü biçimleri yine de öğretiyor: «I have not resolved that and I do not think I am going to».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the problem with the notes?",
              options: ["They arrived long after the decision", "Only three panel members wrote anything", "A key word is never explained"],
              answer: 2,
              explain:
                "İkinci konuşmacı sözcüğü adlandırıyor: «none of them wrote what they meant by it» ve ekliyor: «the most common word on the sheets and the least defined».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the speaker say about everybody speaking the same way?",
              options: ["A loss, but not the immediate question", "The only fair solution in the long term", "Something that has already happened"],
              answer: 0,
              explain:
                "Konuşmacı kaybı kabul edip önceliği ayırıyor: «it would be a loss. But that is not the choice in front of a person filling in an application in a town with one employer».",
            },
          ],
        },
        {
          id: "en-b2-07-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting the results of a three-year study. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Üç yıllık bir çalışmanın sonuçlarını anlatan bir kadını dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Araştırmacı üç yıllık çalışmanın sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. I will give you the headline numbers and then the part we did not expect. We sent the same written application to eight hundred employers, varying nothing except the recorded voice attached to it. The callback rate for the standard accent was twenty-two per cent; for the regional accents it was seventeen. That gap of five points held across every sector except construction, where it disappeared entirely. It was widest in law. We also asked the employers afterwards, and ninety-one per cent of them said that accent had played no part. Now the part we did not expect. When we repeated the study with the voice removed and the application sent as text alone, the callback rate rose to twenty-four per cent for everybody. The study took three years, and the finding people quote is the five points.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Hiring study — results",
              body: `The same application was sent to {{9}} employers.

The callback rate for the standard accent was {{10}} per cent.

The gap between the two rates was {{11}} points.

The gap disappeared in the {{12}} sector.

The gap was widest in {{13}}.

{{14}} per cent of the employers said accent had played no part.

With the voice removed, the rate rose to {{15}} per cent.

The study took {{16}} years.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-07-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["800", "eight hundred"],
              explain:
                "Kayıt örneklem büyüklüğünü veriyor: «We sent the same written application to eight hundred employers».",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["22", "twenty-two"],
              explain:
                "«The callback rate for the standard accent was twenty-two per cent» — ölçünlü aksanın oranı. On yedi bölgesel aksanların oranı.",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["5", "five"],
              explain:
                "Kayıt farkı adlandırıyor: «That gap of five points held across every sector». Yirmi iki ile on yedi arasındaki fark da bunu doğruluyor.",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["construction"],
              explain:
                "İstisna açıkça veriliyor: «every sector except construction, where it disappeared entirely».",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["law"],
              explain:
                "«It was widest in law» — farkın en büyük olduğu alan. İnşaat ise farkın yok olduğu alan; ikisi karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["91", "ninety-one"],
              explain:
                "«ninety-one per cent of them said that accent had played no part» — işverenlerin kendi beyanı.",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["24", "twenty-four"],
              explain:
                "Beklenmeyen bulgu burada: «the callback rate rose to twenty-four per cent for everybody», yani sesli hâlin en yükseğinin de üstünde.",
            },
            {
              kind: "gap",
              id: "en-b2-07-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["3", "three"],
              explain:
                "«The study took three years» — sürenin kendisi. Beş puan bulgunun büyüklüğü, süre değil.",
            },
          ],
        },
        {
          id: "en-b2-07-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about accent and hiring, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Aksan ve işe alım üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The effect is smaller than the argument that surrounds it." },
            { key: "b", label: "A fair-looking method can produce the same decision." },
            { key: "c", label: "The speaker has changed what they are willing to be paid for." },
            { key: "d", label: "The person with least power is being asked to pay." },
            { key: "e", label: "Employers are honest about the effect and still wrong about themselves." },
            { key: "f", label: "The problem cannot be settled inside the hiring process." },
            { key: "g", label: "Candidates should all be trained to sound the same." },
            { key: "h", label: "Nothing at all has improved in twenty years." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı kendi kurumundaki değişikliği ölçüyor.",
              plays: 2,
              segments: [
                { text: "We introduced the sheet, the training and the two-person panel. Last year I compared the shortlists with the ones from before all of that. If you removed the dates you could not tell which year you were looking at." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kursun maliyetini kimin taşıdığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Forty pounds an hour, paid by a twenty-four-year-old, to repair something a firm in another city is doing to her. Whatever that is, it is not a solution. It is an invoice sent to the wrong address." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı etkinin büyüklüğünü tartıyor.",
              plays: 2,
              segments: [
                { text: "It is about a fifth of a point on a five-point scale. That is a real effect, and it is not the effect people describe on the radio, and both of those sentences are worth saying out loud." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı sürecin dışındaki bir aktörü işaret ediyor.",
              plays: 2,
              segments: [
                { text: "You can anonymise the first round, and you should. But the client who rings up and says he wants somebody who sounds a certain way is not in your hiring process, and no policy of yours reaches him." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı işverenlerin beyanını yorumluyor.",
              plays: 2,
              segments: [
                { text: "I believe the employers when they say accent played no part. Ninety-one per cent of them said it and I think ninety-one per cent of them meant it. That is exactly what you would expect if the thing operates below the level where anybody notices." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı kabul ettiği işleri anlatıyor.",
              plays: 2,
              segments: [
                { text: "I still teach clarity and I always will. What I stopped taking is the enquiry that begins: I want to sound less like where I am from. I used to take those, and I was better paid then." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-07-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "b",
              explain:
                "Konuşmacı üç önlemi sayıp sonucu ölçüyor: «If you removed the dates you could not tell which year you were looking at». Yöntem adil görünüyor, çıktı değişmiyor.",
            },
            {
              kind: "match",
              id: "en-b2-07-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "d",
              explain:
                "Konuşmacı ödeyeni ve sorumluyu ayırıyor: yirmi dört yaşındaki aday ödüyor, başka şehirdeki firma sebep oluyor. «It is an invoice sent to the wrong address».",
            },
            {
              kind: "match",
              id: "en-b2-07-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "a",
              explain:
                "Konuşmacı büyüklüğü sayıyla verip iki yargıyı birden koruyor: «That is a real effect, and it is not the effect people describe on the radio».",
            },
            {
              kind: "match",
              id: "en-b2-07-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "f",
              explain:
                "Konuşmacı kimliksizleştirmeyi destekliyor ama sınırını çiziyor: müşteri «is not in your hiring process, and no policy of yours reaches him».",
            },
            {
              kind: "match",
              id: "en-b2-07-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı işverenlerin dürüstlüğünü kabul edip yine de yanıldıklarını söylüyor: «exactly what you would expect if the thing operates below the level where anybody notices».",
            },
            {
              kind: "match",
              id: "en-b2-07-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "c",
              explain:
                "Konuşmacı kabul ettiği işi daralttığını ve bedelini söylüyor: «What I stopped taking is the enquiry that begins … I used to take those, and I was better paid then».",
            },
          ],
        },
        {
          id: "en-b2-07-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a man who argued against anonymous first rounds and now runs them. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Kimliksiz birinci turlara karşı çıkmış, şimdi onları yürüten bir adamla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, hukuk bürosu ortağı Piet ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You spent two years arguing against this. What was the argument?" },
                { text: "That it was theatre. I said, in a meeting I would like back, that we would spend a fortune in order to produce the same list with more paperwork attached to it." },
                { text: "And you were wrong." },
                { text: "I was wrong about the list. I was right about the fortune, incidentally; it cost more than anybody had budgeted. The list changed shape in the first year and it has stayed changed." },
                { text: "What changed your mind?" },
                { text: "Not the argument. Two of my own hires. I had turned down a candidate in 2019, and the same person came through the anonymous round three years later and I ranked her second out of sixty. Same person, same qualifications, different process. The only variable that had moved was me not hearing her first." },
                { text: "That is a strong story." },
                { text: "It is a story, which is why I do not use it in front of the partners. I use the shortlists. But you asked what changed my mind, and the honest answer is the story." },
                { text: "What do you say to firms that tell you their clients expect a particular kind of voice?" },
                { text: "I say that I have heard it from four firms, and that in three of them nobody had ever asked a client. The fourth had asked, and the client said he did not care, which was awkward for everybody in the room." },
                { text: "Is the problem solved at your firm?" },
                { text: "No. We fixed the first round. The second round is a conversation between people in a room, and I have no idea what happens in it. We have started recording who says what, and I expect that to be uncomfortable." },
                { text: "Would you recommend it to a smaller firm?" },
                { text: "With one condition: do not do it unless you are willing to look at the result afterwards. A firm that introduces this and never checks has bought the same theatre I was warning about, and I would rather they kept the money." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-07-h4-23",
              no: 23,
              ref: "d1",
              text: "What did Piet argue two years ago?",
              options: ["That the cost would be too small to matter", "That the process would change nothing but the paperwork", "That the clients would object to the change"],
              answer: 1,
              explain:
                "Piet kendi cümlesini aktarıyor: «we would spend a fortune in order to produce the same list with more paperwork attached to it».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-24",
              no: 24,
              ref: "d1",
              text: "What does he say he was right about?",
              options: ["The shape of the shortlist", "The reaction of the partners", "The expense"],
              answer: 2,
              explain:
                "Piet iki yargısını ayırıyor: «I was wrong about the list. I was right about the fortune, incidentally; it cost more than anybody had budgeted».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-25",
              no: 25,
              ref: "d1",
              text: "What actually changed his mind?",
              options: ["A candidate he had rejected earlier", "The published research", "Pressure from younger colleagues"],
              answer: 0,
              explain:
                "Piet kaynağı adlandırıyor: «Not the argument. Two of my own hires», ardından 2019'da reddettiği adayın üç yıl sonra altmış kişi içinde ikinci sıraya çıkışını anlatıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-26",
              no: 26,
              ref: "d1",
              text: "Why does he not use that story with the partners?",
              options: ["It shows him in a poor light", "He thinks a single case proves little", "The candidate asked him not to"],
              answer: 1,
              explain:
                "Piet kanıt türünü ayırıyor: «It is a story, which is why I do not use it in front of the partners. I use the shortlists».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-27",
              no: 27,
              ref: "d1",
              text: "What does he say about firms that mention their clients' expectations?",
              options: ["Their clients are usually right", "The expectation is impossible to change", "Most of them have never asked a client"],
              answer: 2,
              explain:
                "Piet sayıyı veriyor: dört firmadan üçünde «nobody had ever asked a client», soran dördüncüde ise müşteri umursamadığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-28",
              no: 28,
              ref: "d1",
              text: "What does he say about the second round?",
              options: ["It is not yet understood", "It has been fixed as well", "It should be removed entirely"],
              answer: 0,
              explain:
                "Piet sınırı kabul ediyor: «We fixed the first round. The second round is a conversation between people in a room, and I have no idea what happens in it».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-29",
              no: 29,
              ref: "d1",
              text: "What has the firm started doing?",
              options: ["Recording the interviews on video", "Keeping a record of who says what", "Bringing in an outside panel"],
              answer: 1,
              explain:
                "Piet yeni uygulamayı ve beklentisini birlikte veriyor: «We have started recording who says what, and I expect that to be uncomfortable».",
            },
            {
              kind: "mcq",
              id: "en-b2-07-h4-30",
              no: 30,
              ref: "d1",
              text: "What condition does he attach to his recommendation?",
              options: ["The firm must be large enough", "The first round must be written", "The firm must examine the results"],
              answer: 2,
              explain:
                "Piet koşulu tek cümlede koyuyor: «do not do it unless you are willing to look at the result afterwards», yoksa aynı gösteriye para verilmiş olur.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 70,
      instruction: "This part has two tasks: an essay and a report.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir rapor.",
      tasks: [
        {
          id: "en-b2-07-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed how employers judge candidates. Now write an essay for your teacher, answering this question: \"Should employers remove the voice from the first stage of hiring?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what the change would actually fix — who carries the cost at the moment",
          promptTr:
            "İngilizce dersinde işverenlerin adayları nasıl değerlendirdiğini tartıştınız. Öğretmenin için bir deneme yaz: \"İşverenler işe alımın ilk aşamasından sesi çıkarmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: bu değişiklik neyi gerçekten düzeltir — bugün maliyeti kim taşıyor",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what the change would actually fix.", tr: "Değişikliğin neyi gerçekten düzelteceğini tartış." },
              { de: "Discuss who carries the cost at the moment.", tr: "Maliyeti bugün kimin taşıdığını tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost nobody defends judging a candidate on the sound of their voice. The disagreement begins when somebody asks what removing it would actually achieve.

The honest answer is: less than its supporters claim, and more than nothing. An anonymous first round does not make a panel fairer; it removes one occasion on which the panel can be unfair. That is a modest gain, but it is measurable, and the firms that have tried it report shortlists of a different shape.

The question of cost seems to me the stronger argument. At present the cost is carried by the candidate, who is expected to pay for lessons in order to repair a problem somebody else created. Moving that cost to the employer, who at least benefits from a better shortlist, is a fairer distribution whatever the size of the effect.

My own reservation concerns the second round, which nobody anonymises and nobody examines.

Employers should remove the voice from the first stage, provided they are willing to look at what happens after it.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Değişikliğin sınırı kabul edildi mi, yoksa abartılı bir savunma mı yapıldı?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (whereas, provided that, at present)",
              "140–190 kelime aralığında mı?",
              "Kayıt deneme yazısına uygun mu?",
            ],
          },
        },
        {
          id: "en-b2-07-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your company trialled anonymous written tasks in the first round of hiring for six months. Your manager has asked you for a short report. Say what was tried, what the results were and what you recommend for next year. Write 140 to 190 words.",
          promptTr:
            "Şirketin altı ay boyunca işe alımın ilk turunda kimliksiz yazılı görevleri denedi. Yöneticin senden kısa bir rapor istedi. Neyin denendiğini, sonuçların ne olduğunu ve gelecek yıl için ne önerdiğini yaz. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what was tried and for how long.", tr: "Neyin ve ne kadar süre denendiğini söyle." },
              { de: "Give the results, including one that is not favourable.", tr: "Sonuçları ver; olumsuz olan birini de içersin." },
              { de: "Make a clear recommendation for next year.", tr: "Gelecek yıl için açık bir öneri yap." },
            ],
            sample: `Purpose

This report sets out the results of the six-month trial of anonymous written tasks in the first round of hiring, and recommends how we should proceed.

What was tried

Between January and June, all first-round applications were marked without names, photographs or recordings. Two assessors marked each task independently. The second round was unchanged.

Results

Shortlists changed noticeably. The proportion of candidates from outside the two universities we usually draw on rose from a fifth to almost a third, and the eventual hires performed no worse in their first six months.

One result was less encouraging. Marking took approximately forty additional hours across the period, and three assessors reported that they found the process impersonal. Two candidates said the same.

Recommendation

I recommend that we continue for a further year, with one change: the second round should be monitored in the same way, since we currently have no evidence about it at all.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Olumsuz sonuç gerçekten verildi mi, yoksa yalnız iyi haber mi var?",
              "Sayılar somut mu, yoksa 'daha iyi oldu' düzeyinde mi kalmış?",
              "Rapor kaydı ve başlıklandırma uygun mu?",
              "Öneri tek ve uygulanabilir mi? 140–190 kelime aralığında mı?",
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
          id: "en-b2-07-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about interviews, first impressions and the way people speak.",
          promptTr: "Sana mülakatlar, ilk izlenimler ve insanların konuşma biçimi hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How much do you think a first impression tells you about somebody?", tr: "İyi günler. Sence ilk izlenim bir insan hakkında ne kadar şey söyler?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnekle destekle.", expect: "soyut bir soruya görüş bildirmek ve örneklendirmek", seconds: 45 },
            { who: "partner", de: "Thank you. Have you ever been judged on something that had nothing to do with your ability?", tr: "Teşekkürler. Yeteneğinle ilgisi olmayan bir şey üzerinden değerlendirildiğin oldu mu?" },
            { who: "you", hint: "Somut bir deneyim anlat ve sonucunu söyle.", expect: "geçmişte olmuş tek bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if you were designing an interview from nothing, what would you keep?", tr: "Sıfırdan bir mülakat tasarlasan neyi tutardın?" },
            { who: "you", hint: "Koşul kipiyle bir tasarım öner ve gerekçelendir.", expect: "ikinci tip koşulla varsayımsal bir tasarım kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give an opinion with an example", tr: "Görüşü bir örnekle vermek" },
              { de: "narrate one experience with its outcome", tr: "Tek bir deneyimi sonucuyla anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "A first impression tells you a great deal about how somebody wants to be seen and very little about what they can do. I once interviewed for a job in a town where I had never lived, and the first question was about my surname; I was not offered the post and I still do not know whether those two things are connected, which is exactly the difficulty. If I were designing an interview from nothing, I would keep a task the person actually does in the job and I would put it first, because a conversation can be prepared and a task cannot.",
            criteria: [
              "Görüş bir örnekle mi desteklendi?",
              "Deneyim somut mu ve sonucu verildi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Cevaplar geliştirildi mi, tek cümlede mi kaldı?",
            ],
          },
        },
        {
          id: "en-b2-07-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of dealing with accent bias in hiring, say which is better and explain one problem with your choice: training candidates to speak in the standard way, or removing the voice from the first round.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. İşe alımda aksan yanlılığıyla baş etmenin şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: adayları ölçünlü biçimde konuşmaya alıştırmak mı, birinci turdan sesi çıkarmak mı?",
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
              "Training works, and I want to concede that at the start, because the people who defend it are not fools. A candidate who takes the course is more likely to be hired this year, which is the year she needs. What the training cannot do is change the thing that made it necessary, and it sends the bill to the person with the least money. Removing the voice reaches the mechanism instead of the candidate, and the firms that have tried it report shortlists of a different shape. I would choose that. The problem with my own choice is that it stops at the first round: the second round is a conversation in a room, nobody anonymises it, and it is perfectly capable of undoing everything the first round achieved.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Karşı tarafın gücü kabul edildi mi? (I want to concede that …)",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika akıcı konuşuldu mu ve soyut sözcükler kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-b2-07-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A company is changing the way it hires and can only do one thing per year. Talk with me about these four changes, then decide which one we would do first and which one we would leave until last.",
          promptTr:
            "Bir şirket işe alım biçimini değiştiriyor ve yılda yalnız bir şey yapabiliyor. Şu dört değişikliği benimle konuş, sonra hangisini önce, hangisini en sona bırakacağımıza karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The four changes are: anonymous written tasks in the first round, a scoring sheet for the panel, training for interviewers on how impressions form, and asking clients what they actually expect. Which of these would change the shortlist?", tr: "Dört değişiklik şunlar: birinci turda kimliksiz yazılı görevler, panel için puanlama kâğıdı, mülakatçılara izlenimlerin nasıl oluştuğu üzerine eğitim ve müşterilere gerçekte ne beklediklerini sormak. Bunlardan hangisi kısa listeyi değiştirir?" },
            { who: "you", hint: "Bir ya da iki değişikliği seç ve neden sonucu değiştireceğini açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the client survey. It changes nothing inside the company and it may simply give the partners a new excuse. Is it not the weakest of the four?", tr: "Müşteri anketini sorgularım. Şirketin içinde hiçbir şeyi değiştirmiyor ve ortaklara yeni bir bahane verebilir. Dördü içinde en zayıfı bu değil mi?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "All right. So which do we do first, and which do we leave until last?", tr: "Peki. Hangisini önce yapıyoruz, hangisini en sona bırakıyoruz?" },
            { who: "you", hint: "Sıralama kararı ver ve hem ilkini hem sonuncusunu gerekçelendir.", expect: "ortak bir sıralamaya varmak ve iki ucunu da gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "evaluate the options against each other", tr: "Seçenekleri birbirine karşı değerlendirmek" },
              { de: "handle an objection", tr: "Bir itirazı karşılamak" },
              { de: "agree an order with reasons", tr: "Gerekçeli bir sıralamada anlaşmak" },
            ],
            sample:
              "The written first round is the only one of the four that changes what the panel sees, and everything else changes what the panel says afterwards. You are right that the client survey looks weak from inside the company, and I partly accept that; what I would defend is that it removes an excuse rather than creating one, because three firms out of four have never asked. The scoring sheet is the one I would leave until last, since it is filled in after the impression has already formed. So: written tasks first, then the training, then the client survey, and the sheet last.",
            criteria: [
              "Seçenekler birbirine karşı mı değerlendirildi?",
              "İtiraza doğrudan karşılık verildi mi ve kısmi kabul yapılabildi mi?",
              "Hem ilk hem son seçim gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı? (You are right that …)",
            ],
          },
        },
      ],
    },
  ],
};

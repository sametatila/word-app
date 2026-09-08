import type { MockPaper } from "../types";

/**
 * B2 · Deneme 9 — "Insurance, Small Print and What You Are Buying".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Sigorta B2 için verimli
 * çünkü tartışma dürüstlük üstünde değil anlaşılabilirlik üstünde yürüyor:
 * metin yalan söylemiyor, yine de alıcı ne satın aldığını bilemiyor. Bu
 * ayrım edilgen yapıya, ileri bağlayıcıya ve adlaştırmaya doğal zemin
 * veriyor.
 *
 * Beşinci görev bilerek tek bir cümlenin çözümlemesi: yedinci denemede
 * mesleğini bırakan birinin itirafı, sekizincide üçüncü tekil bir
 * habercilik vardı. Burada yazı bir belgeyi parçalara ayırıyor ve kişisel
 * anlatı hiç kullanılmıyor.
 */
export const EN_B2_09: MockPaper = {
  id: "en-b2-09",
  course: "en",
  level: "B2",
  no: 9,
  theme: "Insurance, Small Print and What You Are Buying",
  themeTr: "Sigorta, küçük punto ve gerçekte satın alınan şey",
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
          id: "en-b2-09-l1",
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
              title: "The document nobody reads",
              body: `An insurance policy is the only document most people buy without reading, and the industry has {{1}} matters so that reading it would not help very much.

The exclusions are not hidden. They are printed, numbered and available, and they are written in a register that {{2}} the person who most needs to understand them.

This is not the same thing as dishonesty, and the distinction matters. Nevertheless, the effect on the buyer is much the same. A clause that has been through four lawyers is precise; precision is not clarity, and the two {{3}} company at about the third draft.

What the customer is buying is a promise about a future argument. That is a strange thing to sell and a stranger thing to {{4}} down to a single number.

Regulators have tried summaries. A two-page summary of a forty-page policy is either incomplete, or it is a second document that the customer must now {{5}} as well.

None of this means the product is worthless. It means the market does not work in the way that the comparison sites {{6}}.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-09-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["arranged", "settled", "ordered", "fixed"],
              answer: 0,
              explain:
                "`arrange matters so that …` işleri belli bir sonucu verecek biçimde düzenlemeyi anlatır. `settle` bir anlaşmazlığı kapatmak, `order` sıraya koymak ya da ısmarlamak, `fix` ise onarmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["prevents", "refuses", "defeats", "denies"],
              answer: 2,
              explain:
                "`defeat somebody` burada bir metnin okuru yenmesini, onu alt etmesini anlatır. `prevent` bir eylemi engeller ve nesne olarak eylemi ister; `refuse` ve `deny` ise bir isteği ya da savı reddetmektir.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["keep", "part", "break", "take"],
              answer: 1,
              explain:
                "`part company` yollarını ayırmak demektir ve cümle kesinlik ile açıklığın ayrıştığını söylüyor. `keep company` eşlik etmektir ve savı tersine çevirir; öteki ikisi bu adla birleşmez.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["cut", "break", "put", "boil"],
              answer: 3,
              explain:
                "`boil something down to` bir şeyi özüne indirgemeyi anlatır ve cümle bunu tek bir sayıya indirmekten söz ediyor. `cut down` azaltmak, `break down` çözümlemek, `put down` ise yazmak ya da bırakmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["read", "reads", "reading", "to read"],
              answer: 0,
              explain:
                "`must` kip fiilinden sonra yalın fiil gelir: «must now read as well». Çekimli, `-ing`li ve mastarlı biçimler bu konumda duramaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["involve", "include", "imply", "insist"],
              answer: 2,
              explain:
                "`imply` açıkça söylemeden ima etmeyi anlatır ve karşılaştırma siteleri piyasanın fiyatla işlediğini ima ediyor. `involve` içermek, `include` kapsamak, `insist` ise `on` edatını ister.",
            },
          ],
        },
        {
          id: "en-b2-09-l2",
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
              title: "What a policy is for",
              body: `An insurance contract is not a purchase of safety. It is a purchase {{7}} a promise, and a promise is only as good as the process that tests it.

That process is the claim, and it is the part {{8}} which nobody looks before buying.

Nor {{9}} the customer able to look at it. Complaint figures exist, but they are published by regulator and by company, never {{10}} product.

{{11}} the figures were published by product, a buyer could compare the thing they were actually buying.

As it is, they compare the price, {{12}} is the only number anybody has troubled to make comparable.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-09-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["of"],
              explain:
                "`a purchase of something` yapısı bir öncekiyle koşut kuruluyor: «not a purchase of safety … a purchase of a promise». Başka bir edat bu koşutluğu bozar.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["at"],
              explain:
                "`look at something` öbeğinin edatı ilgi adılından önce öne çekilmiş: «the part at which nobody looks». Edat olmadan `look` nesnesini alamaz.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "Olumsuz `Nor` ile başlayan cümle devrik kuruluş ister: yardımcı fiil özneden önce gelir. Özne `the customer` tekil olduğu için `is`.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["by"],
              explain:
                "Cümle üç kırılımı aynı edatla sıralıyor: «by regulator and by company, never by product». Koşutluk `by` gerektiriyor.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["if"],
              explain:
                "Ana cümle `could compare` taşıyor, yani gerçekleşmemiş bir şimdiki durum kuruluyor. Yan cümledeki `were published` ile birlikte bu ikinci tip koşuldur ve bağlaç `If`tir.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["which"],
              explain:
                "Virgülden sonra `the price` adına gönderme yapan ilgi adılı gerekiyor. `that` virgüllü ilgi cümlesinde kullanılmaz, `what` ise öncül almaz.",
            },
          ],
        },
        {
          id: "en-b2-09-l3",
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
              title: "Policy wording",
              body: `A policy is defined less by what it covers than by its {{13}}, which are set out in a numbered list that most buyers never open.

The {{14}} carries the risk and also writes the wording, and those two functions sit uneasily together.

Regulators inspect for {{15}} with disclosure rules rather than for whether anybody understood the disclosure.

Readability tests measure sentence length, which is a poor substitute for {{16}} in a document whose difficulty is conceptual rather than grammatical.

The events an ordinary household most fears are precisely the {{17}} ones, and it is those that the exclusions most often catch.

Reviews of the field conclude that the number of {{18}} claims is a better guide to a policy than its price.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-09-l3-13",
              no: 13,
              text: "EXCLUDE",
              accept: ["exclusions"],
              explain:
                "`its ___` yapısında iyelikten sonra bir ad geliyor ve ardından `which are set out in a numbered list` çoğul yüklem taşıyor; dolayısıyla ad da çoğul olmalı.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l3-14",
              no: 14,
              text: "INSURE",
              accept: ["insurer"],
              explain:
                "Cümlenin öznesi riski taşıyan ve metni yazan taraf, yani bir kurum ya da kişi adı: `insurer`. `insurance` bir süreç adıdır ve `carries the risk` ile birleşmez.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l3-15",
              no: 15,
              text: "COMPLY",
              accept: ["compliance"],
              explain:
                "`inspect for ___ with rules` yapısında edatın nesnesi bir ad olmalı ve `comply with` fiilinden türeyen ad `compliance`tır.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l3-16",
              no: 16,
              text: "CLEAR",
              accept: ["clarity"],
              explain:
                "`a poor substitute for ___` yapısında edat bir ad ister ve cümle cümle uzunluğunun neyin yerine geçemediğini söylüyor: açıklığın. Sıfat biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l3-17",
              no: 17,
              text: "PREDICT",
              accept: ["unpredictable"],
              explain:
                "`the ___ ones` yapısında belirli tanımlıkla `ones` arasında bir sıfat var ve cümle en çok korkulan olayların önceden kestirilemeyenler olduğunu söylüyor: `unpredictable`.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l3-18",
              no: 18,
              text: "DISPUTE",
              accept: ["disputed"],
              explain:
                "`the number of ___ claims` yapısında addan önce onu niteleyen bir ortaç var: itiraz edilen talepler. Ad biçimi (`dispute`) burada `claims` ile tamlama kuramaz.",
            },
          ],
        },
        {
          id: "en-b2-09-l4",
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
              id: "en-b2-09-l4-19",
              no: 19,
              text: "Nobody told the customer about the exclusion.\nThe customer ______ about the exclusion.",
              cue: "TOLD",
              accept: ["was not told", "wasn't told"],
              explain:
                "`Nobody told …` yapısı edilgene çevrilirken olumsuzluk yükleme geçer: «was not told». Özne tekil ve zaman geçmiş olduğu için yardımcı fiil `was`.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l4-20",
              no: 20,
              text: "An ordinary reader cannot possibly understand this clause.\nThis clause ______ an ordinary reader to understand.",
              cue: "IMPOSSIBLE",
              accept: ["is impossible for"],
              explain:
                "Yetersizlik bildiren `cannot possibly`, sıfatla kurulan bir yapıya çevriliyor: `is impossible for + kişi + to + fiil`. Kişi `for` ile bağlanır.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l4-21",
              no: 21,
              text: "The company refused the claim because the form arrived late.\nHad the form arrived on time, the company ______ the claim.",
              cue: "WOULD",
              accept: ["would not have refused"],
              explain:
                "Devrik `Had + özne + üçüncü hâl` gerçekleşmemiş bir geçmiş kuruyor ve ana cümle `would have + üçüncü hâl` ister; sonuç olumsuz olduğu için araya `not` girer.",
            },
            {
              kind: "gap",
              id: "en-b2-09-l4-22",
              no: 22,
              text: "The wording of the policy matters more than its price.\nIt is the wording of the policy, ______ its price, that matters.",
              cue: "RATHER",
              accept: ["rather than"],
              explain:
                "Karşılaştırma bir yarma cümleye taşınıyor ve iki öğe `rather than` ile karşı karşıya konuyor. `rather` tek başına bu bağlantıyı kuramaz.",
            },
          ],
        },
        {
          id: "en-b2-09-l5",
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
              title: "Twenty-nine words",
              body: `I want to take one clause apart, because arguments about small print are usually conducted without any small print in them.

Here is the clause, from a household policy sold to about two hundred thousand people: "We do not pay for damage caused by water escaping from a fixed water system where the escape results from a lack of maintenance." Twenty-nine words.

Every one of them is honest. The clause does not lie and it is not hidden; it appears under a heading that says what it is. If you had read it before the pipe burst, you would have understood every word in it.

What you would not have understood is what it does. A lack of maintenance is not defined anywhere in the document, and it does not need to be, because the definition is supplied later, by the loss adjuster who visits your kitchen. That person is paid by the company. He is not dishonest either. He is applying a term that has no fixed content, and he applies it in the direction his employer would prefer.

The result is a clause that is perfectly clear as English and unknowable as a promise. You cannot tell, before the event, whether you are covered, because the thing that decides it has not been written down anywhere. Given that, the price is the only part of the offer a buyer can actually compare.

I do not think this was designed. I think it is what you get when a document is drafted to survive a court rather than to inform a buyer, and those are different tests. The second one is not applied by anybody.`,
              gloss: [
                { de: "a clause", tr: "madde, hüküm", en: "clause" },
                { de: "a loss adjuster", tr: "hasar eksperi", en: "loss adjuster" },
                { de: "maintenance", tr: "bakım", en: "maintenance" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-09-l5-23",
              no: 23,
              text: "Why does the writer quote the clause in full?",
              options: [
                "To show that it is very badly written",
                "Because it is unusually short for a policy",
                "To criticise the company that produced it",
                "Because such arguments usually avoid actual wording",
              ],
              answer: 3,
              explain:
                "Açılış gerekçeyi veriyor: «arguments about small print are usually conducted without any small print in them». Yazının ilerisi maddeyi kötü yazılmış saymıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l5-24",
              no: 24,
              text: "What does the writer say about the words themselves?",
              options: [
                "They are deliberately confusing to a reader",
                "They are honest and can be understood",
                "They are hidden in the middle of the document",
                "They contradict a clause printed earlier",
              ],
              answer: 1,
              explain:
                "Üçüncü paragraf bunu iki kez söylüyor: «Every one of them is honest» ve «you would have understood every word in it». Madde üstelik başlık altında duruyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l5-25",
              no: 25,
              text: "What is the problem with the phrase about maintenance?",
              options: [
                "Its meaning is decided afterwards",
                "It is defined far too narrowly",
                "It appears in no other policy",
                "It is a legal term with no English sense",
              ],
              answer: 0,
              explain:
                "Metin tanımın belgede olmadığını ve sonradan sağlandığını söylüyor: «the definition is supplied later, by the loss adjuster who visits your kitchen».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l5-26",
              no: 26,
              text: "What does the writer say about the loss adjuster?",
              options: [
                "He is dishonest about the damage",
                "He is not qualified for the work",
                "He applies a term without fixed content",
                "He is chosen by the customer",
              ],
              answer: 2,
              explain:
                "Yazar kişiyi suçlamıyor: «He is not dishonest either. He is applying a term that has no fixed content», ama işvereninin yönünde uyguluyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-l5-27",
              no: 27,
              text: "What is the writer's conclusion?",
              options: [
                "Such clauses ought to be made illegal",
                "The document was written for the wrong test",
                "Customers should simply read more carefully",
                "Courts have misunderstood clauses of this kind",
              ],
              answer: 1,
              explain:
                "Son paragraf iki sınavı ayırıyor: «drafted to survive a court rather than to inform a buyer, and those are different tests. The second one is not applied by anybody».",
            },
          ],
        },
        {
          id: "en-b2-09-l6",
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
              title: "Why the summary does not help",
              body: `Every few years a regulator decides that the answer to an unreadable document is a shorter document. {{28}}

The reasoning is sound as far as it goes. Most buyers will read two pages and almost none will read forty, so two pages reach more people. {{29}}

The difficulty appears as soon as anybody tries to write them. A summary that omits the exclusions is misleading, and a summary that includes them is not two pages long. {{30}}

There is a second approach, which is to standardise the product rather than the description. If every household policy covered the same eleven things, price would become the honest comparison it currently pretends to be. {{31}}

That is a larger intervention, and it is resisted for a reason that is rarely stated out loud: a market in which the products are identical is a market in which the margins are visible.`,
              gloss: [
                { de: "an exclusion", tr: "kapsam dışı hâl", en: "exclusion" },
                { de: "to standardise", tr: "standartlaştırmak", en: "standardise" },
                { de: "a margin", tr: "kâr payı", en: "margin" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "What actually appears is a third document, which the buyer must now read against the first two." },
            { key: "b", label: "b", body: "The summary has been tried in four countries and it has produced much the same result in all of them." },
            { key: "c", label: "c", body: "Nobody disputes that, and it is the last part of the argument that survives contact with a draft." },
            { key: "d", label: "d", body: "The objection to that is a real one: standard products cannot be tailored, and some households need cover that most do not." },
            { key: "e", label: "e", body: "The first insurance policy in the modern sense was written in Genoa in 1347." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-09-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "b",
              explain:
                "Açılış düzenleyicinin tekrar eden kararını anıyor: «Every few years a regulator decides». (b) o tekrarın sonucunu veriyor: dört ülkede denendi ve hepsinde aynı sonucu üretti.",
            },
            {
              kind: "match",
              id: "en-b2-09-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "c",
              explain:
                "Paragraf gerekçeyi savunuyor: «two pages reach more people». (c) bunu tartışmasız sayıp sınırını koyuyor: taslakla karşılaşınca ayakta kalan tek bölüm bu.",
            },
            {
              kind: "match",
              id: "en-b2-09-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "a",
              explain:
                "Paragraf ikilemi kuruyor: «A summary that omits the exclusions is misleading, and a summary that includes them is not two pages long». (a) uygulamadaki sonucu veriyor: «a third document, which the buyer must now read against the first two».",
            },
            {
              kind: "match",
              id: "en-b2-09-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "d",
              explain:
                "Paragraf standartlaştırmayı öneriyor. (d) buna yöneltilecek gerçek itirazı veriyor: standart ürün kişiye uyarlanamaz. (e) 1347'de Cenova'da yazılan ilk poliçeden söz ediyor ve metinde sigortanın tarihi hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-09-l7",
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
              label: "a — Claims handler",
              body: "I have refused about nine hundred claims and I would defend nearly all of them against the wording. What I would not defend is the wording. I have watched people read a clause I have quoted at them, agree that it says what I say it says, and still leave the room believing that something unfair has happened. I think they are right.",
            },
            {
              key: "b",
              label: "b — Policyholder",
              body: "I read all forty pages before I signed, because I am that sort of person. It made no difference whatsoever. I understood every sentence and I still had no idea whether a leak under the floor would be paid for, and it turns out that nobody knew, including them, until it happened.",
            },
            {
              key: "c",
              label: "c — Broker",
              body: "The comparison sites did something nobody had predicted. They did not make policies cheaper for long; they made them thinner. When price is the only visible number, the only way to win is to remove cover, and the cover you remove is the cover people cannot see.",
            },
            {
              key: "d",
              label: "d — Regulator",
              body: "Our disclosure rules are working exactly as they were written, which is the problem. We can establish that the exclusion was communicated. We cannot establish that anybody understood it, and we have never been given a test for that, because nobody can agree what such a test would look like.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-09-l7-32",
              no: 32,
              text: "says that following the rules is itself the difficulty",
              answer: "d",
              explain:
                "Metin bunu ilk cümlede kuruyor: «Our disclosure rules are working exactly as they were written, which is the problem».",
            },
            {
              kind: "match",
              id: "en-b2-09-l7-33",
              no: 33,
              text: "reports that reading the whole document changed nothing",
              answer: "b",
              explain:
                "Metin çabayı ve sonucu yan yana koyuyor: «I read all forty pages before I signed … It made no difference whatsoever».",
            },
            {
              kind: "match",
              id: "en-b2-09-l7-34",
              no: 34,
              text: "describes an unintended effect of comparing on price",
              answer: "c",
              explain:
                "Metin sonucu adlandırıyor: «They did not make policies cheaper for long; they made them thinner», çünkü görünen tek sayı fiyat.",
            },
            {
              kind: "match",
              id: "en-b2-09-l7-35",
              no: 35,
              text: "defends their own decisions but not the document",
              answer: "a",
              explain:
                "Metin ayrımı açıkça yapıyor: «I would defend nearly all of them against the wording. What I would not defend is the wording».",
            },
            {
              kind: "match",
              id: "en-b2-09-l7-36",
              no: 36,
              text: "says that a necessary test does not exist",
              answer: "d",
              explain:
                "Metin eksiği adlandırıyor: «we have never been given a test for that, because nobody can agree what such a test would look like».",
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
          id: "en-b2-09-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Claims handler",
              genreTr: "Hasar görevlisi",
              situation: "Bir görevli işinin en zor yanını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The hard calls are not the ones where somebody is trying it on. Those take four minutes. The hard ones are where the person has done nothing wrong, the clause is clear, and I have to read it to them anyway." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Policyholder",
              genreTr: "Sigortalı",
              situation: "Bir müşteri poliçeyi okuma deneyimini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I read the whole thing. Forty pages, two evenings. At the end of it I could have told you what every sentence meant and I could not have told you whether my kitchen was covered. Those are not the same skill." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Broker",
              genreTr: "Sigorta aracısı",
              situation: "Bir aracı fiyat karşılaştırmasından söz ediyor.",
              plays: 2,
              segments: [
                { text: "Everybody assumed the comparison sites would push prices down. They did for two years. What they actually pushed down was the cover, because that is the part the customer never sees on the results page." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir araştırmacı okunabilirlik ölçümünü ele alıyor.",
              plays: 2,
              segments: [
                { text: "The readability score is a real measurement and it measures the wrong thing. It counts syllables and commas. The difficulty in a policy is not the sentence; it is that a phrase like reasonable care has no content until somebody applies it." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Regulator",
              genreTr: "Düzenleyici",
              situation: "Bir düzenleyici denetimin sınırını anlatıyor.",
              plays: 2,
              segments: [
                { text: "We can prove that the document was sent, that it was in the right typeface and that the exclusion appeared under a heading. That is what the rule asks. Whether the buyer understood it is not a question the rule contains." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "İki meslektaş bir taslağı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Legal have sent the clause back again." },
                { text: "What did they change?" },
                { text: "They put reasonably back in. I took it out because nobody can price it, and they put it in because nobody can argue with it." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı ortak öneriyi ele alıyor.",
              plays: 2,
              segments: [
                { text: "The suggestion is always the same: standard wording for everybody. I have some sympathy with it and one worry. A standard policy is a policy nobody can be sold badly, and it is also a policy that fits a flat above a river exactly as badly as it fits everybody else." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici kendi deneyimini anlatıyor.",
              plays: 2,
              segments: [
                { text: "They paid the claim in full and I am still angry, which surprised me. It was not the money. It was eleven weeks of not knowing, and nothing in the policy told me it would be eleven weeks, because that number is not in there." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-09-h1-1",
              no: 1,
              ref: "a1",
              text: "Which calls does the speaker find hard?",
              options: ["Ones where somebody is lying", "Ones where the customer is blameless", "Ones that take a very long time"],
              answer: 1,
              explain:
                "Konuşmacı iki türü ayırıyor: hile denemeleri dört dakika sürüyor, zor olanlar ise «the person has done nothing wrong, the clause is clear».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the speaker say about reading the policy?",
              options: ["Understanding it did not tell her what was covered", "The document was too long to finish", "The sentences were impossible to follow"],
              answer: 0,
              explain:
                "Konuşmacı iki beceriyi ayırıyor: her cümlenin anlamını söyleyebilirdi ama mutfağının kapsanıp kapsanmadığını söyleyemezdi. «Those are not the same skill».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the broker say happened?",
              options: ["Prices fell and stayed low", "Customers began reading the cover", "The cover was reduced instead"],
              answer: 2,
              explain:
                "Aracı sonucu adlandırıyor: «What they actually pushed down was the cover», çünkü sonuç sayfasında görünmüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-4",
              no: 4,
              ref: "a4",
              text: "What is the speaker's objection to the readability score?",
              options: ["It has never actually been calculated", "It measures the wrong difficulty", "It is applied only to short documents"],
              answer: 1,
              explain:
                "Konuşmacı ölçümü gerçek sayıyor ama hedefini eleştiriyor: «It counts syllables and commas. The difficulty in a policy is not the sentence».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the regulator say the rule does not cover?",
              options: ["Whether the document was sent", "Where the exclusion appeared", "Whether the buyer understood"],
              answer: 2,
              explain:
                "Düzenleyici sınırı son cümlede koyuyor: «Whether the buyer understood it is not a question the rule contains».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-6",
              no: 6,
              ref: "a6",
              text: "Why did the lawyers restore the word?",
              options: ["Because it cannot be argued with", "Because it can be priced accurately", "Because the regulator requires it"],
              answer: 0,
              explain:
                "Konuşmacı iki gerekçeyi karşı karşıya koyuyor: «I took it out because nobody can price it, and they put it in because nobody can argue with it».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the speaker's worry about standard wording?",
              options: ["It would be too expensive to introduce", "It fits unusual cases badly", "Nobody would agree on the wording"],
              answer: 1,
              explain:
                "Konuşmacı öneriyi kısmen destekleyip kaygısını veriyor: standart poliçe «fits a flat above a river exactly as badly as it fits everybody else».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h1-8",
              no: 8,
              ref: "a8",
              text: "Why is the speaker still angry?",
              options: ["The claim was refused in the end", "The payment was smaller than expected", "The waiting time was never stated"],
              answer: 2,
              explain:
                "Konuşmacı parayı eliyor: «It was not the money. It was eleven weeks of not knowing», ve o sayının poliçede bulunmadığını söylüyor.",
            },
          ],
        },
        {
          id: "en-b2-09-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting the results of a two-year review. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "İki yıllık bir incelemenin sonuçlarını anlatan bir kadını dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir sorumlu iki yıllık şikâyet incelemesini sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the figures from the two-year review, and I will include the ones we did not enjoy. We looked at eleven thousand complaints across nine companies. Of those, sixty-one per cent concerned a refusal to pay rather than a delay. The single most common subject was water, which accounted for about a quarter on its own. When we asked complainants whether they had read the policy, forty per cent said yes, and among those the outcome of the complaint was no better. The average time from claim to decision was thirty-four days. And the finding we did not expect: the companies with the clearest wording received slightly more complaints, not fewer, which we take to mean that their customers knew what to argue about.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Complaints review — findings",
              body: `The review examined {{9}} complaints.

They came from {{10}} companies.

{{11}} per cent concerned a refusal to pay.

The most common subject was {{12}}.

{{13}} per cent of complainants had read the policy.

The average time from claim to decision was {{14}} days.

Companies with the clearest wording received {{15}} complaints.

The reviewers think those customers knew what to {{16}} about.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-09-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["11000", "eleven thousand"],
              explain:
                "Kayıt örneklem büyüklüğünü veriyor: «We looked at eleven thousand complaints across nine companies».",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["9", "nine"],
              explain:
                "Aynı cümledeki ikinci sayı şirket sayısına ait: «across nine companies».",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["61", "sixty-one"],
              explain:
                "«sixty-one per cent concerned a refusal to pay rather than a delay» — reddedilen ödemelerin payı.",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["water"],
              explain:
                "«The single most common subject was water, which accounted for about a quarter on its own» — tek başına dörtte bir.",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["40", "forty"],
              explain:
                "«forty per cent said yes» — poliçeyi okuduğunu söyleyenlerin oranı, ve sonuçları daha iyi olmamış.",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["34", "thirty-four"],
              explain:
                "«The average time from claim to decision was thirty-four days» — karara kadar geçen ortalama süre.",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["more"],
              explain:
                "Beklenmeyen bulgu burada: «the companies with the clearest wording received slightly more complaints, not fewer».",
            },
            {
              kind: "gap",
              id: "en-b2-09-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["argue"],
              explain:
                "Kayıt bulguyu yorumluyor: «their customers knew what to argue about». Yani açıklık şikâyeti azaltmıyor, hedefini belirginleştiriyor.",
            },
          ],
        },
        {
          id: "en-b2-09-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about insurance wording, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Sigorta metinleri üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "A vague word is chosen because it cannot be challenged." },
            { key: "b", label: "The rule is being followed and that is the difficulty." },
            { key: "c", label: "The speaker has changed what they are willing to sign." },
            { key: "d", label: "The person with least power is asked to do the impossible." },
            { key: "e", label: "Competition on price removed cover rather than cost." },
            { key: "f", label: "The problem cannot be settled by better writing." },
            { key: "g", label: "Policies should be banned until they are rewritten." },
            { key: "h", label: "Nothing at all has improved in twenty years." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı taslak sürecinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Every draft I send back comes to me with one word restored. Reasonable, adequate, proper. They are not there to describe anything. They are there because a court cannot say they were breached and neither can a customer." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı denetimin kapsamını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I inspected eleven firms last year and every one of them passed. The document was sent, the heading was correct, the typeface was legal. Our rule asks whether it was communicated, and all eleven communicated it perfectly to nobody." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı müşteriden bekleneni ele alıyor.",
              plays: 2,
              segments: [
                { text: "We ask a person with no legal training, at the end of a working day, to decide whether a phrase they have never seen will be read in their favour by somebody they have never met. Then we call the result an informed choice." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı fiyat rekabetinin sonucunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "For two years the premiums fell and everybody wrote that the market was working. Then somebody read the wordings from 2015 next to the wordings from 2022. The price had not moved much at all. Four things had simply gone." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kendi uygulamasını değiştirdiğini söylüyor.",
              plays: 2,
              segments: [
                { text: "I still write policies and I always will. What I stopped doing is signing off a clause that I could not explain to my mother in one sentence. I lost a client over it, and the clause is still in their document." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı yazım iyileştirmesinin sınırını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Rewrite it in plain English by all means. You will produce a document that a fifteen-year-old can read and that still cannot tell anybody whether their kitchen is covered, because the uncertainty is in the promise and not in the prose." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-09-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı sözcüklerin işlevini adlandırıyor: «They are there because a court cannot say they were breached and neither can a customer».",
            },
            {
              kind: "match",
              id: "en-b2-09-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı hepsinin kuralı geçtiğini söylüyor ve çelişkiyi kuruyor: «all eleven communicated it perfectly to nobody».",
            },
            {
              kind: "match",
              id: "en-b2-09-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "d",
              explain:
                "Konuşmacı müşteriden beklenen işi sıralayıp adlandırıyor: hukuk eğitimi olmayan biri, iş günü sonunda, hiç görmediği bir ibarenin nasıl yorumlanacağını kestirecek. «Then we call the result an informed choice».",
            },
            {
              kind: "match",
              id: "en-b2-09-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "e",
              explain:
                "Konuşmacı iki dönemin metinlerini karşılaştırıyor: «The price had not moved much at all. Four things had simply gone».",
            },
            {
              kind: "match",
              id: "en-b2-09-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "c",
              explain:
                "Konuşmacı mesleği bırakmıyor, kabul ettiği işi daraltıyor: «What I stopped doing is signing off a clause that I could not explain to my mother in one sentence».",
            },
            {
              kind: "match",
              id: "en-b2-09-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Konuşmacı sade dili destekliyor ama sınırını koyuyor: «the uncertainty is in the promise and not in the prose».",
            },
          ],
        },
        {
          id: "en-b2-09-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a man who writes insurance wordings. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Sigorta poliçesi metinleri yazan bir adamla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, poliçe metinleri yazan Halvard ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You write the small print. Do people tell you what they think of it?" },
                { text: "Constantly, and they are usually attacking the wrong thing. They attack the length. Length is not the problem; a long document that says one thing clearly is fine." },
                { text: "What is the problem, then?" },
                { text: "The words that carry no meaning until somebody applies them. Reasonable. Adequate. Proper maintenance. Those are not descriptions; they are places where a decision has been left to be made later, by us." },
                { text: "Could you write them out?" },
                { text: "I have tried, twice. If you replace reasonable care with a list of six things the customer must do, the list is either too short to cover the real cases or so long that nobody reads it, and the second draft was thirty-one pages." },
                { text: "So the vagueness is not laziness." },
                { text: "It is not laziness and it is not innocent either. Both things are true. The vague word survives because it is genuinely hard to replace and because it happens to suit whoever is holding the money." },
                { text: "What would you change if it were up to you?" },
                { text: "Not the wording. I would publish the decisions. Every quarter, every company puts out the last three hundred applications of the phrase reasonable care, anonymised. Then the phrase would have a meaning you could look up." },
                { text: "Why has that not been done?" },
                { text: "Because it would be a definition, and once it is a definition you can be held to it. That is precisely the property the current arrangement is designed to avoid." },
                { text: "Do you think the industry knows this?" },
                { text: "The people I work with know it in the way you know something you have never had to say out loud. I have been in nine meetings about clarity and none about certainty, and they are not the same subject." },
                { text: "A final question. Do you buy the policies you write?" },
                { text: "I do, and I read the exclusions before I buy, which puts me in a very small group. It has changed what I buy twice. It has never once changed what I write." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-09-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Halvard say people usually criticise?",
              options: ["The length of the document", "The price of the product", "The speed of the claims process"],
              answer: 0,
              explain:
                "Halvard eleştirinin hedefini düzeltiyor: «They attack the length. Length is not the problem; a long document that says one thing clearly is fine».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-24",
              no: 24,
              ref: "d1",
              text: "What does he say the real difficulty is?",
              options: ["Sentences that are far too long", "Headings that are hard to find", "Words whose meaning is supplied later"],
              answer: 2,
              explain:
                "Halvard sorunu adlandırıyor: «The words that carry no meaning until somebody applies them … a decision has been left to be made later, by us».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-25",
              no: 25,
              ref: "d1",
              text: "What happened when he tried to replace a vague phrase?",
              options: ["The company refused to publish it", "The list was either too short or too long", "The regulator rejected the new wording"],
              answer: 1,
              explain:
                "Halvard iki denemeyi anlatıyor: liste ya gerçek durumları kaçıracak kadar kısa oluyor ya da okunmayacak kadar uzun; «the second draft was thirty-one pages».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-26",
              no: 26,
              ref: "d1",
              text: "How does he explain the vagueness?",
              options: ["As hard to avoid and convenient at the same time", "As entirely accidental", "As something regulators have demanded"],
              answer: 0,
              explain:
                "Halvard iki gerekçeyi birden kabul ediyor: «It is not laziness and it is not innocent either. Both things are true».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-27",
              no: 27,
              ref: "d1",
              text: "What change would he make?",
              options: ["Shorten every policy to two pages", "Publish how the phrases have been applied", "Let customers write their own exclusions"],
              answer: 1,
              explain:
                "Halvard önerisini açıkça metinden ayırıyor: «Not the wording. I would publish the decisions», çeyrek dönemde son üç yüz uygulama.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-28",
              no: 28,
              ref: "d1",
              text: "Why does he think that has not happened?",
              options: ["It would cost too much to produce", "It would create a definition", "The data does not exist anywhere"],
              answer: 1,
              explain:
                "Halvard nedeni veriyor: «once it is a definition you can be held to it. That is precisely the property the current arrangement is designed to avoid».",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-29",
              no: 29,
              ref: "d1",
              text: "What does he say about the people he works with?",
              options: ["They know it without saying it", "They disagree with him openly", "They have never considered the question"],
              answer: 0,
              explain:
                "Halvard bilgi biçimini tarif ediyor: «they know it in the way you know something you have never had to say out loud», ve netlik ile kesinlik toplantılarını ayırıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-09-h4-30",
              no: 30,
              ref: "d1",
              text: "What does he say about his own purchases?",
              options: ["He avoids the products he writes", "He reads the exclusions before buying", "He asks a colleague to choose for him"],
              answer: 1,
              explain:
                "Halvard alışkanlığını ve sınırını veriyor: «I read the exclusions before I buy … It has changed what I buy twice. It has never once changed what I write».",
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
          id: "en-b2-09-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed contracts that people sign without reading. Now write an essay for your teacher, answering this question: \"Should companies be responsible for making sure customers understand what they buy?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what understanding could actually be tested — who carries the cost of a misunderstanding",
          promptTr:
            "İngilizce dersinde insanların okumadan imzaladığı sözleşmeleri tartıştınız. Öğretmenin için bir deneme yaz: \"Şirketler, müşterinin ne satın aldığını anlamasından sorumlu tutulmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: anlamanın nasıl sınanabileceği — yanlış anlamanın bedelini kim taşıyor",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss how understanding could be tested.", tr: "Anlamanın nasıl sınanabileceğini tartış." },
              { de: "Discuss who carries the cost of a misunderstanding.", tr: "Yanlış anlamanın bedelini kimin taşıdığını tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost nobody defends the present arrangement, in which a document is sent, a box is ticked and everybody agrees that a decision has been made.

The practical objection concerns testing. It is easy to prove that a document arrived and almost impossible to prove that it was understood, and any test that could be written down would immediately be taught to and passed. That is a genuine difficulty, but it is a difficulty about method rather than about principle.

The question of cost seems to me stronger. At present a misunderstanding costs the company nothing and the customer everything, which is precisely the distribution that removes any reason to improve. A rule that moved even part of that cost would change behaviour without anybody having to define comprehension.

My own reservation is that clarity and certainty are being confused. A perfectly clear sentence can still leave a buyer unable to know what will happen, because the meaning is fixed afterwards by the seller.

Companies should carry the responsibility, but the obligation should attach to publishing how their terms have been applied rather than to proving that a customer understood.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Sınama güçlüğü ciddiye alındı mı, yoksa geçiştirildi mi?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (at present, precisely, whereas)",
              "140–190 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-b2-09-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your insurance company has refused a claim, quoting a clause that you were never shown before you bought the policy. Write a letter to the company. Describe what happened, explain why you think the refusal is wrong and say what you want them to do. Write 140 to 190 words.",
          promptTr:
            "Sigorta şirketin, poliçeyi almadan önce sana hiç gösterilmemiş bir maddeye dayanarak talebini reddetti. Şirkete bir mektup yaz. Ne olduğunu anlat, reddin neden yanlış olduğunu açıkla ve ne yapmalarını istediğini söyle. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Describe what happened, with dates.", tr: "Ne olduğunu tarihleriyle anlat." },
              { de: "Explain why you think the refusal is wrong.", tr: "Reddin neden yanlış olduğunu açıkla." },
              { de: "Say exactly what you want them to do.", tr: "Tam olarak ne yapmalarını istediğini söyle." },
            ],
            sample: `Dear Sir or Madam,

I am writing about claim 4471/22, refused on 3 April.

On 11 March a pipe failed under the kitchen floor of my flat and the water damaged the floor and two cupboards. Your letter refuses the claim under clause 9.4, which excludes damage where the escape results from a lack of maintenance.

I do not dispute that the clause exists. I dispute that it was ever communicated to me. The summary document I was sent before purchase runs to two pages and does not mention maintenance at all. I have kept it and I attach a copy.

Nor has anybody explained what maintenance would have been expected of a pipe that is under a floor and cannot be inspected without lifting it.

I am asking for two things: a written explanation of what your adjuster considered a lack of maintenance in this case, and a review of the decision by somebody who was not involved in it.

I would be grateful for a reply within fourteen days.

Yours faithfully,
Selma Aro`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Tarih, numara ve madde gibi somut bilgiler verildi mi?",
              "İtiraz maddenin varlığına değil bildirimine mi yöneltilmiş?",
              "İstenen şey tek tek ve uygulanabilir mi?",
              "Kayıt resmî mi? 140–190 kelime aralığında mı?",
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
          id: "en-b2-09-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about contracts, promises and reading things before you sign them.",
          promptTr: "Sana sözleşmeler, verilen sözler ve imzalamadan önce okumak hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. When did you last sign something without reading all of it?", tr: "İyi günler. En son ne zaman bir şeyi tamamını okumadan imzaladın?" },
            { who: "you", hint: "Somut bir örnek ver ve neden okumadığını açıkla.", expect: "somut bir örnekten genel bir gerekçeye geçmek", seconds: 45 },
            { who: "partner", de: "Thank you. Has a company ever refused you something and been technically right?", tr: "Teşekkürler. Bir şirket sana bir şeyi teknik olarak haklıyken reddetti mi hiç?" },
            { who: "you", hint: "Tek bir olayı sonucuyla anlat.", expect: "geçmişte olmuş tek bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if you had to design one rule for consumer contracts, what would it be?", tr: "Tüketici sözleşmeleri için tek bir kural tasarlasan bu ne olurdu?" },
            { who: "you", hint: "Koşul kipiyle bir kural öner ve gerekçelendir.", expect: "ikinci tip koşulla bir kural önermek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "move from an example to a general reason", tr: "Örnekten genel bir gerekçeye geçmek" },
              { de: "narrate one event with its outcome", tr: "Tek bir olayı sonucuyla anlatmak" },
              { de: "propose and justify a rule", tr: "Bir kural önerip gerekçelendirmek" },
            ],
            sample:
              "I signed a phone contract in April and I read about a third of it, standing at a counter with somebody waiting behind me, which is exactly the situation the document was written for. Two years ago a bank refused to refund a payment because I had reported it on the thirty-first day and the limit was thirty; they were entirely within their rights and I closed the account a month later. If I could design one rule, I would require companies to publish how often they refuse under each clause, because a number like that is harder to argue with than a promise about clarity.",
            criteria: [
              "İlk cevap örnekten gerekçeye geçebildi mi?",
              "Anlatı tek ve belirgin mi, sonucu verildi mi?",
              "Son cevapta bir kural önerilip savunuldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-b2-09-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of protecting buyers, say which is better and explain one problem with your choice: requiring simpler wording, or requiring companies to publish how their terms have been applied in real cases.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Alıcıyı korumanın şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: daha sade bir dil zorunlu kılmak mı, şirketlerin maddelerini gerçek olaylarda nasıl uyguladıklarını yayımlamasını zorunlu kılmak mı?",
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
              "Simpler wording is easy to require and easy to inspect, and it addresses something everybody can see. Its weakness is that the difficulty in these documents is not linguistic. A sentence can be perfectly plain and still leave the reader unable to predict what will happen, because the meaning of the key phrase is fixed later by the company. Publishing the decisions attacks precisely that: it turns a vague term into something with a history you can look up. I would choose that. The problem with my own choice is volume and privacy. Three hundred anonymised decisions a quarter is a great deal of material that nobody will read, and the cases that matter most are the unusual ones, which are also the ones that are hardest to anonymise.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika akıcı konuşuldu mu ve soyut sözcükler kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-b2-09-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A consumer group can campaign for one change to insurance next year. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir tüketici örgütü gelecek yıl sigortayla ilgili tek bir değişiklik için kampanya yapabiliyor. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: a standard two-page summary, publishing refusal rates by clause, banning vague terms such as reasonable care, and a free adviser for anybody whose claim is refused. Which of these would actually change a decision?", tr: "Fikirler: standart iki sayfalık özet, ret oranlarının madde madde yayımlanması, `reasonable care` gibi belirsiz terimlerin yasaklanması ve talebi reddedilen herkes için ücretsiz danışman. Bunlardan hangisi gerçekten bir kararı değiştirir?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden sonucu değiştireceğini açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the ban on vague terms. Somebody has to write the replacement, and the drafts that have been tried run to thirty pages. Is that not the weakest of the four?", tr: "Belirsiz terimlerin yasaklanmasını sorgularım. Yerine geçecek metni birinin yazması gerekiyor ve denenen taslaklar otuz sayfaya çıkıyor. Dördü içinde en zayıfı bu değil mi?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "All right. So which two do we recommend, and which one do we reject?", tr: "Peki. Hangi ikisini öneriyoruz, hangisini reddediyoruz?" },
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
              "Publishing refusal rates by clause is the only one that changes what a company does rather than what it writes, because a bad number is visible to a competitor. You are right that the ban is hard to draft, and I want to concede that properly rather than defend it half-heartedly; what I would keep from it is a narrower version, banning the term only where the company has not published its own working definition. The free adviser helps individuals and changes no policy at all, and the two-page summary produces a third document. So I would recommend the published rates and the free adviser, and reject the summary.",
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

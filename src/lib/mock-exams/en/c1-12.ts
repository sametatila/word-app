import type { MockPaper } from "../types";

/**
 * C1 · Deneme 12 — "Queues, Priority and the Order of a List".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Sıra konusu C1 için
 * verimli çünkü kuyruk yansız görünen ama tümüyle seçilmiş bir düzendir:
 * ölçütü biri koydu, kaybedeni ölçüt belirledi. Devrik kuruluş, yarma cümle
 * ve adlaştırma bu savın doğal dili.
 *
 * On birinci kâğıdın uzun metni bir kitap eleştirisiydi, dinlemesi bir ders.
 * Burada ikisi de yeniden değişti: uzun metin bir komisyon raporuna eklenen
 * karşı oy yazısı, yani kurumsal bir tür; dinlemede ise sunucunun kurduğu
 * çerçeveyi reddeden bir konuk var.
 */
export const EN_C1_12: MockPaper = {
  id: "en-c1-12",
  course: "en",
  level: "C1",
  no: 12,
  theme: "Queues, Priority and the Order of a List",
  themeTr: "Kuyruklar, öncelik ve bir listenin sırası",
  minutes: 215,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 80,
      instruction:
        "This part has eight tasks. You read texts with gaps, sentences to rewrite, a dissenting note, five short texts, a text with missing paragraphs and four short texts.",
      instructionTr:
        "Bu bölümde sekiz görev var. Boşluklu metinler, yeniden yazılacak cümleler, bir karşı oy yazısı, beş kısa metin, paragrafı eksik bir metin ve dört kısa metin okuyacaksın.",
      tasks: [
        {
          id: "en-c1-12-l1",
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
              title: "Nobody stands in a queue by accident",
              body: `A waiting list presents itself as an administrative object and is nothing of the kind. Somebody chose the order, and the {{1}} of that choice is that some people wait while others do not.

The most common ordering rule is arrival, which has the advantage of being impossible to argue with and the {{2}} of being indifferent to consequence. Two people who arrive on the same morning may be facing wholly different costs of delay, and arrival cannot see the difference.

Ordering by need corrects that and introduces a problem of its own, because need has to be assessed, and assessment can be {{3}}. Once a judgement stands between a person and their place in a line, that judgement will be argued with, appealed against and, occasionally, arranged.

What is least often examined is the queue before the queue. A list records the people who have been {{4}} onto it, and says nothing whatever about those who were never referred, who did not know the service existed or who were turned away at an earlier stage.

The allocation of places is therefore decided twice: once by the published criteria and once, invisibly, by whatever {{5}} people to the door in the first place. Rarely is the second of these examined at all.

None of which is an argument for abandoning lists, an alternative that {{6}} to allocation by whoever shouts loudest. It is an argument for describing what a list is doing rather than what it appears to be doing.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-12-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["repercussion", "consequence", "conclusion", "aftermath"],
              answer: 1,
              explain:
                "Seçimden doğrudan doğan sonuç anlatılıyor: `the consequence of that choice`. `repercussion` dolaylı bir yankıyı, `conclusion` bir çıkarımı, `aftermath` ise bir felaket sonrasını bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["fault", "flaw", "defect", "drawback"],
              answer: 3,
              explain:
                "Cümle bir üstünlüğün karşısına bir sakıncayı koyuyor: `the advantage … and the drawback`. `fault` kusur ya da suç, `flaw` yapısal çatlak, `defect` ise üretim hatası bildirir ve `advantage` ile bu ikili karşıtlığı kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["contested", "objected", "complained", "resisted"],
              answer: 0,
              explain:
                "Değerlendirmenin tartışmaya açık olduğu söyleniyor: `assessment can be contested`. `objected` ile `complained` edilgen kuruluşta doğrudan nesne almaz ve edat ister, `resisted` ise karşı koymayı anlatır.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["introduced", "entered", "accepted", "listed"],
              answer: 2,
              explain:
                "`accepted onto a list` yerleşik kuruluştur ve kişinin listeye alınmasını anlatır. `introduced` tanıştırmayı, `entered` girişi bildirir, `listed` ise `onto` edatını almaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["takes", "leads", "carries", "brings"],
              answer: 3,
              explain:
                "İnsanları kapıya getiren şey anlatılıyor: `brings people to the door`. `takes` uzaklaştırmayı, `leads` yol göstermeyi, `carries` ise taşımayı bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["amounts", "adds", "comes", "contributes"],
              answer: 0,
              explain:
                "`amount to` bir şeyin sonuçta başka bir şeye varması demektir: `amounts to allocation by whoever shouts loudest`. `adds up to` toplamı, `comes to` ulaşmayı, `contributes to` ise katkıyı bildirir ve hiçbiri eşitlik kurmaz.",
            },
          ],
        },
        {
          id: "en-c1-12-l2",
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
              title: "The neutrality of an order",
              body: `An order of service is presented as though it had arrived from nowhere, {{7}} every list in existence was written by somebody with a rule in mind.

It is not the length of a wait that provokes the strongest objection. It is the suspicion that the order itself is arbitrary, and {{8}} suspicion is remarkably difficult to dispel once it has formed.

Nor {{9}} the difficulty removed by publishing the criteria. Published criteria are read by the people best equipped to read them, which is not the same population as the people waiting.

{{10}} makes randomisation attractive, in the narrow set of cases where no criterion can distinguish between applicants, is that it is the only rule nobody can present as a judgement about them.

At no point {{11}} the profession claimed that a queue is fair. The claim has always been the weaker and more defensible one: that it is more accountable than the arrangement it replaced.

That is by {{12}} means a small claim, although it is routinely dismissed as one.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-12-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["whereas", "although", "though"],
              explain:
                "İki yarı arasında karşıtlık var: sıra «presented as though it had arrived from nowhere» diyor, oysa listeyi bir kural gözeterek biri yazmıştır. Karşıtlık bağlacı gerekiyor; `because` gerekçe verirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["that"],
              explain:
                "Bir önceki cümlede geçen kuşkuya geri gönderme yapılıyor: `that suspicion`. `this` de gönderme yapar ama önceki cümlede adlandırılmış bir öğeye dönüşün yerleşik biçimi `that`tır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "`Nor` ile başlayan cümle devrik kuruluş ister ve edilgen çatının yardımcı fiili özneden önce gelir: «Nor is the difficulty removed».",
            },
            {
              kind: "gap",
              id: "en-c1-12-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["what"],
              explain:
                "Cümle bir yarma kuruluş: «What makes randomisation attractive … is that …». Özne konumunda ad tümcesi `what` ile kurulur.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["has"],
              explain:
                "`At no point` cümle başına gelince devrik kuruluş zorunlu olur ve yakın zamanlı geçmişin yardımcı fiili özneden önce gelir: «At no point has the profession claimed».",
            },
            {
              kind: "gap",
              id: "en-c1-12-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["no"],
              explain:
                "`by no means` kalıbı güçlü bir olumsuzlama bildirir ve cümle savın küçük olmadığını söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-12-l3",
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
              title: "Waiting lists",
              body: `A waiting list is a mechanism for rationing a service by time rather than by price, and the rule that determines {{13}} within it is the point at which its politics become visible.

The {{14}} of places may follow arrival, assessed need, expected benefit or, in a small number of documented schemes, a lottery.

Schemes differ sharply in {{15}}: some publish their criteria and their current waits in full, while others release neither.

Disputes most often concern {{16}} rather than order, since the decision to accept an applicant onto the list precedes any question of where they stand on it.

Administrative practice permits the {{17}} of a case where an applicant declines an offer, and this resets the recorded wait without changing the applicant's position in any clinical sense.

Reviews conclude that the strongest {{18}} for publishing full distributions is that a median conceals the tail, which is where the political weight of the subject actually lies.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-12-l3-13",
              no: 13,
              text: "PRIOR",
              accept: ["priority"],
              explain:
                "`determines ___ within it` bir ad ister ve belirlenen şey öncelik sırası; sıfat `prior` bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l3-14",
              no: 14,
              text: "ALLOCATE",
              accept: ["allocation"],
              explain:
                "`The ___ of places may follow …` bir ad ister ve anlatılan şey yerlerin dağıtımıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l3-15",
              no: 15,
              text: "TRANSPARENT",
              accept: ["transparency"],
              explain:
                "`differ sharply in ___` bir ad ister ve ölçütlerin yayımlanıp yayımlanmaması saydamlıkla ilgilidir.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l3-16",
              no: 16,
              text: "ELIGIBLE",
              accept: ["eligibility"],
              explain:
                "`concern ___ rather than order` bir ad ister ve tartışılan şey listeye kabul edilme hakkıdır; sıfat `eligible` bu konumda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l3-17",
              no: 17,
              text: "DEFER",
              accept: ["deferral", "deferment"],
              explain:
                "`permits the ___ of a case` bir ad ister ve anlatılan işlem bir dosyanın ertelenmesidir.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l3-18",
              no: 18,
              text: "ARGUE",
              accept: ["argument"],
              explain:
                "`the strongest ___ for publishing` bir ad ister ve ileri sürülen şey bir gerekçedir; `arguable` sıfattır ve `for` tümlecini bu anlamda almaz.",
            },
          ],
        },
        {
          id: "en-c1-12-l4",
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
              id: "en-c1-12-l4-19",
              no: 19,
              text: "Only when the list was published did anybody notice the pattern.\nNot until ______ did anybody notice the pattern.",
              cue: "PUBLISHED",
              accept: ["the list was published"],
              explain:
                "`Only when` ile `Not until` aynı zaman sınırını kurar; devrik kuruluş ana tümcede sürdüğü için yan tümce olağan sırada kalır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l4-20",
              no: 20,
              text: "People objected to the criteria, not to the delay.\nIt ______ people objected, not to the delay.",
              cue: "CRITERIA",
              accept: ["was to the criteria that"],
              explain:
                "Yarma cümle bir edat öbeğini öne çıkarıyor ve edat vurgulanan öğeyle birlikte taşınır: `It was to the criteria that …`.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l4-21",
              no: 21,
              text: "It is often said that the order of a list is a technical matter.\nThe order of a list ______ a technical matter.",
              cue: "SAID",
              accept: ["is often said to be"],
              explain:
                "Kişisiz edilgen `It is said that …` kişili edilgene çevriliyor ve yan tümcenin yüklemi mastara döner.",
            },
            {
              kind: "gap",
              id: "en-c1-12-l4-22",
              no: 22,
              text: "If the clock had not been reset, her wait would have been eleven months.\nHer wait would have been eleven months ______ reset.",
              cue: "HAD",
              accept: ["had the clock not been"],
              explain:
                "Üçüncü tip koşulda `if` düşürülünce devrik kuruluş zorunludur ve olumsuzluk özneden sonra kalır: `had the clock not been reset`.",
            },
          ],
        },
        {
          id: "en-c1-12-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the dissenting note and answer questions 23 to 26. Choose a, b, c or d.",
          promptTr: "Karşı oy yazısını oku ve 23–26. maddeleri yanıtla. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Dissenting note in a committee report",
              genreTr: "Komisyon raporuna eklenen karşı oy",
              title: "Note of dissent by Anouk Reiber",
              body: `I have signed the report and I dissent from its central recommendation, which is a combination the committee's procedures permit and its habits discourage. The reasoning below is my own and does not commit any other member.

The report recommends that the list be reordered by expected benefit. I accept the evidence assembled in chapters four and five, which is stronger than I expected when the review began, and I agree that ordering by arrival produces outcomes that nobody would choose deliberately. My objection is not to the direction of the reform but to a step the report treats as administrative.

Expected benefit must be assessed, and assessment requires an assessor. The report devotes eleven pages to the criteria and one paragraph to the people who will apply them. That paragraph states that assessors will be trained. It does not state who they are accountable to, what happens when two assessors disagree, or how an applicant contests a judgement made about their own case. These are not details. They are the whole mechanism by which a criterion becomes a place in a queue.

I am also unpersuaded by the report's treatment of the hidden queue. Chapter six estimates that eleven hundred people in the district meet the criteria and have never been referred, and then sets that figure aside as outside the review's scope. It is not outside the scope. A reform that reorders four thousand two hundred people while leaving eleven hundred invisible has improved the fairness of a list and not necessarily the fairness of anything else. That is arguably worth doing, and it is not what the recommendation claims to be doing.

My recommendation is narrower than the report's and I believe it would survive contact with practice. Publish the assessment rules, publish the appeal route, and report annually on the number of referrals declined at the door. Reorder the list afterwards, when there is something to check the reordering against.

I record my thanks to the secretariat, whose work was exemplary, and my regret that this note was necessary.`,
              gloss: [
                { de: "to dissent", tr: "karşı oy kullanmak", en: "dissent" },
                { de: "an assessor", tr: "değerlendirici", en: "assessor" },
                { de: "exemplary", tr: "örnek gösterilecek", en: "exemplary" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-12-l5-23",
              no: 23,
              text: "What is unusual about the writer's position?",
              options: [
                "She has resigned from the committee",
                "She signed the report but dissents",
                "She wrote the chapters she now criticises",
                "She refuses to accept the committee's evidence",
              ],
              answer: 1,
              explain:
                "Açılış bunu söylüyor: «I have signed the report and I dissent from its central recommendation», ve bunun usulen mümkün ama alışılmadık olduğunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l5-24",
              no: 24,
              text: "What does she say about the evidence in chapters four and five?",
              options: [
                "It rests on too few districts to be useful",
                "It repeats work published elsewhere",
                "It was gathered after the conclusions were drafted",
                "It proved stronger than she had anticipated",
              ],
              answer: 3,
              explain:
                "Yazar kanıtı kabul ediyor: «which is stronger than I expected when the review began», itirazı reformun yönüne değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l5-25",
              no: 25,
              text: "What is her main objection?",
              options: [
                "The report says almost nothing about the assessors",
                "The criteria themselves are described far too vaguely",
                "The reform would cost more than the report admits",
                "The committee met too rarely to reach a judgement",
              ],
              answer: 0,
              explain:
                "Yazar sayfa dengesini veriyor: «eleven pages to the criteria and one paragraph to the people who will apply them», ve o paragrafın hesap verme ile itiraz yolunu yazmadığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-l5-26",
              no: 26,
              text: "Why does she object to setting the hidden queue aside?",
              options: [
                "The estimate of eleven hundred is unreliable",
                "Those people would object to the reform",
                "Fairness on the list is not fairness overall",
                "The district boundary was drawn incorrectly",
              ],
              answer: 2,
              explain:
                "Yazar iki adaleti ayırıyor: dört bin iki yüz kişiyi yeniden sıralayan reform «has improved the fairness of a list and not necessarily the fairness of anything else».",
            },
          ],
        },
        {
          id: "en-c1-12-l6",
          no: 6,
          format: "match",
          goal: "opinion",
          prompt:
            "Read the five short texts a to e by different writers on the same subject. For questions 27 to 30, decide which writer this describes. You use each writer once only.",
          promptTr:
            "Aynı konuda yazan beş yazarın a'dan e'ye kısa metinlerini oku. 27–30. maddeler için bunun hangi yazarı tarif ettiğine karar ver. Her yazar en fazla bir kez kullanılır.",
          options: [
            {
              key: "a",
              label: "a — Writer A",
              body: "Ordering by arrival is the only rule that cannot be argued with, and that is exactly what recommends it. Every alternative requires a judgement about the person in front of you, and judgements attract appeals, appeals attract advocates, and advocacy is distributed with almost perfect unfairness across the population that waits.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "The argument stops at the front door and it should not. We spend our time reordering the four thousand people who are on the list and almost none on the eleven hundred who qualify and were never referred. Improving the order of a list while ignoring who gets onto it is a well-intentioned way of solving the visible half of a problem.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Where two applicants genuinely cannot be distinguished, a lottery is not an abdication; it is the honest form of a decision we are already making badly. What people find intolerable is not the randomness but the admission of it, and I have some sympathy with that, since a criterion at least offers the consolation of a reason.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "Look at what the recorded wait actually measures. Decline one offer for a reason your employer left you no choice about, and the clock restarts, and your file now shows a wait of four months where a person in different circumstances shows eighteen. The figure is accurate and it describes flexibility rather than need.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "I administered one of these lists for nine years and the reform I would want is duller than anything in this debate. Publish the appeal route in language a person can act on. Half of the unfairness I saw was not in the criteria at all; it was in the fact that two applicants in identical positions had entirely different access to somebody who knew how to complain.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-12-l6-27",
              no: 27,
              text: "Which writer says the recorded figure measures something other than need?",
              answer: "d",
              explain:
                "(d) kayıtlı süreyi çözümlüyor: teklif reddedilince saat sıfırlanıyor ve rakam «describes flexibility rather than need».",
            },
            {
              kind: "match",
              id: "en-c1-12-l6-28",
              no: 28,
              text: "Which writer defends a rule on the ground that it resists advocacy?",
              answer: "a",
              explain:
                "(a) varış sırasını savunuyor: her seçenek bir yargı gerektiriyor, «advocacy is distributed with almost perfect unfairness».",
            },
            {
              kind: "match",
              id: "en-c1-12-l6-29",
              no: 29,
              text: "Which writer identifies unfairness outside the criteria themselves?",
              answer: "e",
              explain:
                "(e) dokuz yıllık deneyimden sonuç çıkarıyor: adaletsizliğin yarısı ölçütlerde değil, şikâyet etmeyi bilen birine erişimde.",
            },
            {
              kind: "match",
              id: "en-c1-12-l6-30",
              no: 30,
              text: "Which writer says people mind the admission more than the practice?",
              answer: "c",
              explain:
                "(c) kurayı savunurken tepkiyi adlandırıyor: «What people find intolerable is not the randomness but the admission of it».",
            },
          ],
        },
        {
          id: "en-c1-12-l7",
          no: 7,
          format: "match",
          goal: "structure",
          prompt:
            "Read the text. One paragraph is missing from each of the gaps 31 to 34. Which paragraph a to e fits which gap? One paragraph fits nowhere.",
          promptTr:
            "Metni oku. 31–34. boşluklarda birer paragraf eksik. a–e paragraflarından hangisi hangi boşluğa uyar? Bir paragraf hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t7",
              genre: "Long-form article",
              genreTr: "Uzun yazı",
              title: "How a list is really ordered",
              body: `The published criteria run to eleven pages and they describe about half of what determines the order of the list. This is not a scandal, and nobody has concealed anything; the other half has simply never been written down. {{31}}

Consider what happens when an applicant declines an offered date. The rules permit deferral, the clock restarts, and the recorded wait falls. Nothing improper has occurred at any point in that sequence. {{32}}

The second unwritten rule concerns who appeals. Appeals are permitted, the route is published in a document that runs to nine hundred words, and the applicants who use it are, overwhelmingly, those who have previously used a comparable process somewhere else. {{33}}

Neither of these mechanisms was designed. Both are the residue of decisions taken for other reasons, and both are invisible in the only figures the service publishes, which report the median wait and the proportion seen within the target. {{34}}

What follows from this is not that criteria are worthless. It is that a criterion is a claim about the future which only an audit can convert into a description of the past, and the audits that would matter here have never been commissioned.`,
              gloss: [
                { de: "residue", tr: "kalıntı", en: "residue" },
                { de: "to defer", tr: "ertelemek", en: "defer" },
                { de: "an audit", tr: "denetim", en: "audit" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "The mechanism therefore rewards whoever can accept a date at short notice, which is a fact about employment and childcare rather than about clinical need, and it does so without any individual deciding that it should.",
            },
            {
              key: "b",
              label: "b",
              body: "The remaining half consists of rules that operate reliably, produce measurable effects and appear in no document, which makes them harder to reform than any of the eleven pages.",
            },
            {
              key: "c",
              label: "c",
              body: "Familiarity with such processes is not distributed evenly, and a right that is exercised by one group and not another functions, in aggregate, as a criterion of its own.",
            },
            {
              key: "d",
              label: "d",
              body: "A median cannot show either of them, because both operate by moving particular people between positions rather than by changing how long the middle of the queue waits.",
            },
            {
              key: "e",
              label: "e",
              body: "The service employs four hundred and twelve people and occupies a building completed in 1974.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-12-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış yarısının hiç yazılmadığını söylüyor: «the other half has simply never been written down». (b) o yazılmamış yarıyı tanımlıyor ve reformu neden zorlaştırdığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-12-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "a",
              explain:
                "Paragraf erteleme zincirini anlatıp usulsüzlük olmadığını söylüyor: «Nothing improper has occurred». (a) sonucu veriyor: düzenek kısa sürede tarih kabul edebilenleri ödüllendiriyor.",
            },
            {
              kind: "match",
              id: "en-c1-12-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Paragraf itirazı kimin kullandığını veriyor: «those who have previously used a comparable process somewhere else». (c) bunu genelliyor: eşit dağılmayan bir hak, toplamda kendi başına bir ölçüt gibi işliyor.",
            },
            {
              kind: "match",
              id: "en-c1-12-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Paragraf iki düzeneğin yayımlanan rakamlarda görünmediğini söylüyor: «the median wait and the proportion seen within the target». (d) nedenini veriyor: ikisi de kuyruğun ortasını değil, tek tek kişilerin yerini değiştiriyor. (e) çalışan sayısı ve bina yılından söz ediyor; metinde ne personel ne bina tartışılıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-12-l8",
          no: 8,
          format: "match",
          goal: "detail",
          reuseOptions: true,
          prompt:
            "Read the four short texts a to d. For questions 35 to 40, decide which text says this. The texts may be chosen more than once.",
          promptTr:
            "a'dan d'ye dört kısa metni oku. 35–40. maddeler için bunu hangi metin söylüyor, karar ver. Bir metin birden çok kez seçilebilir.",
          options: [
            {
              key: "a",
              label: "a — List administrator",
              body: "I spent nine years moving names up and down a screen and I never once altered a position I could not defend. The unfairness I watched was upstream of me. Two people in the same position, one with a relative who had done this before and one without, and the first was on the phone within a week while the second waited for a letter that answers nothing.",
            },
            {
              key: "b",
              label: "b — Applicant",
              body: "I turned down the first date because my employer would not release me, and the clock started again. On paper my wait is now four months. In my life it has been nineteen. Nobody did anything wrong and the number in my file is simply not describing the thing everybody thinks it describes.",
            },
            {
              key: "c",
              label: "c — Committee member",
              body: "I signed the report and I dissent from it, which our procedures allow and our habits do not encourage. The evidence for reordering is stronger than I expected. What I cannot accept is eleven pages on criteria and one paragraph on the people who will apply them, with nothing at all on how a judgement is contested.",
            },
            {
              key: "d",
              label: "d — Researcher",
              body: "The estimate that eleven hundred eligible people in this district have never been referred is the most important figure in the review and it appears in a chapter that ends by declaring it out of scope. Reordering a list of four thousand two hundred while that number sits outside the frame improves something narrower than fairness.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-12-l8-35",
              no: 35,
              text: "Which text says a recorded figure does not mean what readers assume?",
              answer: "b",
              explain:
                "(b) kayıt ile yaşanan arasındaki farkı veriyor: «On paper my wait is now four months. In my life it has been nineteen».",
            },
            {
              kind: "match",
              id: "en-c1-12-l8-36",
              no: 36,
              text: "Which text locates the unfairness before the list itself?",
              answer: "a",
              explain:
                "(a) yeri adlandırıyor: «The unfairness I watched was upstream of me», ve iki başvurucunun erişim farkını örnekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-12-l8-37",
              no: 37,
              text: "Which text objects to how a figure was set aside?",
              answer: "d",
              explain:
                "(d) bölümün sonunu eleştiriyor: en önemli sayı «appears in a chapter that ends by declaring it out of scope».",
            },
            {
              kind: "match",
              id: "en-c1-12-l8-38",
              no: 38,
              text: "Which text accepts the case for reform while rejecting part of the plan?",
              answer: "c",
              explain:
                "(c) ikisini birlikte yapıyor: «The evidence for reordering is stronger than I expected», ama değerlendiriciler ve itiraz yolu yazılmamış.",
            },
            {
              kind: "match",
              id: "en-c1-12-l8-39",
              no: 39,
              text: "Which text insists that nobody behaved improperly?",
              answer: "b",
              explain:
                "(b) suçlamayı açıkça kaldırıyor: «Nobody did anything wrong», sorun rakamın neyi tarif ettiğinde.",
            },
            {
              kind: "match",
              id: "en-c1-12-l8-40",
              no: 40,
              text: "Which text says the improvement is narrower than it is presented as being?",
              answer: "d",
              explain:
                "(d) kapsamı daraltıyor: dört bin iki yüz kişilik listeyi yeniden sıralamak «improves something narrower than fairness».",
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
        "This part has four tasks. You hear three extracts, a report, an interview and eight short monologues.",
      instructionTr:
        "Bu bölümde dört görev var. Üç parça, bir sunum, bir söyleşi ve sekiz kısa konuşma dinleyeceksin.",
      tasks: [
        {
          id: "en-c1-12-h1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear three short extracts. There are two questions on each. Choose a, b or c. You hear each extract twice.",
          promptTr: "Üç kısa parça dinleyeceksin. Her birinde iki soru var. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Extract one",
              genreTr: "Birinci parça",
              situation: "Bir gazeteci ile eski bir liste görevlisi konuşuyor.",
              plays: 2,
              segments: [
                { text: "Did you ever move somebody up?" },
                { text: "Never in nine years, and I would have been caught if I had. That is not where the problem was." },
                { text: "Where was it?" },
                { text: "Before me. Two applicants in the same position, and one of them has an aunt who has been through this and knows which office to ring on a Tuesday. That one is talking to a human being inside a week. The other is waiting for a letter that answers a question nobody asked." },
                { text: "So the criteria were fine." },
                { text: "The criteria were fine and largely beside the point, which is the sentence nobody in this argument wants to hear." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki araştırmacı kayıtlı bekleme süresini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Her file says four months." },
                { text: "And she has been waiting nineteen. She turned down a date because her employer would not release her, and the clock restarted. Nothing in that sequence broke a rule." },
                { text: "So the file is wrong." },
                { text: "The file is accurate. It is measuring something real, which is how easily a person can accept an appointment at ten days' notice. That is a fact about childcare and shift patterns, and we are publishing it as though it were about need." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Bir sunucu ile bir araştırmacı reformu konuşuyor.",
              plays: 2,
              segments: [
                { text: "You are against reordering the list." },
                { text: "I am not against it. I am against calling it a fairness reform when eleven hundred eligible people in the district have never been referred at all." },
                { text: "That was outside the review's remit." },
                { text: "It was declared outside the remit, in the final paragraph of the chapter that estimated it, which is a different thing. Reorder the four thousand two hundred by all means. Just do not describe the result as fairness, because the word is doing work the reform has not done." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-12-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the former administrator say about his own conduct?",
              options: ["He was once investigated for it", "He bent the rules on rare occasions", "He never altered anybody's position"],
              answer: 2,
              explain:
                "Görevli kesin konuşuyor: «Never in nine years, and I would have been caught if I had».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h1-2",
              no: 2,
              ref: "a1",
              text: "What is his view of the criteria?",
              options: ["They were sound but largely irrelevant", "They were written far too loosely", "They were changed too often to work"],
              answer: 0,
              explain:
                "Görevli ikisini birlikte söylüyor: «The criteria were fine and largely beside the point».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h1-3",
              no: 3,
              ref: "a2",
              text: "What do the researchers say about the woman's file?",
              options: ["It contains a clerical error", "It records a real but different thing", "It was altered after her refusal"],
              answer: 1,
              explain:
                "Araştırmacı dosyayı doğru sayıyor: «The file is accurate. It is measuring something real», ama ölçtüğü şey ihtiyaç değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h1-4",
              no: 4,
              ref: "a2",
              text: "What does the recorded wait actually reflect?",
              options: ["The severity of a person's condition", "The distance from the applicant's home", "How easily an appointment can be taken"],
              answer: 2,
              explain:
                "Araştırmacı ölçüleni adlandırıyor: «how easily a person can accept an appointment at ten days' notice», yani çocuk bakımı ve vardiya düzeni.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h1-5",
              no: 5,
              ref: "a3",
              text: "What is the researcher objecting to?",
              options: ["The reordering of the existing list", "The word used to describe the reform", "The size of the estimate in chapter six"],
              answer: 1,
              explain:
                "Araştırmacı sıralamaya karşı olmadığını söylüyor; itirazı adlandırmaya: «do not describe the result as fairness».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h1-6",
              no: 6,
              ref: "a3",
              text: "How does he answer the point about the remit?",
              options: ["He says it was declared, not found", "He says the remit was never published", "He says the estimate came too late"],
              answer: 0,
              explain:
                "Araştırmacı ayrımı kuruyor: «It was declared outside the remit, in the final paragraph of the chapter that estimated it».",
            },
          ],
        },
        {
          id: "en-c1-12-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting the results of a review of a waiting list. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir bekleme listesi incelemesinin sonuçlarını sunan bir adamı dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir uzman inceleme sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. The list we examined holds four thousand two hundred names. The median wait is thirty-one weeks; the longest wait we located was ninety-four. In seven per cent of cases the recorded clock had been reset at least once, in every instance because an offered date was declined. Our estimate of the hidden queue — people who meet the criteria and have never been referred — is eleven hundred. Priority is decided by a panel of three, which meets every two weeks. Our single recommendation is that the service publish the range alongside the median, since the median conceals precisely the cases this committee was convened to examine.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Review of the waiting list",
              body: `The list holds {{7}} names.

The median wait is {{8}} weeks.

The longest wait located was {{9}} weeks.

The clock had been reset in {{10}} per cent of cases.

The hidden queue is estimated at {{11}} people.

Priority is decided by a panel of {{12}}.

The panel meets every {{13}} weeks.

The recommendation is to publish the {{14}} alongside the median.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-12-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["4200", "4,200"],
              explain:
                "Sunum listenin büyüklüğünü veriyor: «The list we examined holds four thousand two hundred names». Bin yüz, hiç sevk edilmemiş kişilerin sayısıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["31", "thirty-one"],
              explain:
                "«The median wait is thirty-one weeks» — ortanca süre. Doksan dört, bulunan en uzun süredir.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["94", "ninety-four"],
              explain:
                "«the longest wait we located was ninety-four» — en uzun süre; ortanca ile karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["7", "seven"],
              explain:
                "«In seven per cent of cases the recorded clock had been reset at least once» — sıfırlama oranı ve her seferinde nedeni reddedilen bir tarih.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["1100", "1,100"],
              explain:
                "«Our estimate of the hidden queue … is eleven hundred» — ölçütleri karşılayıp hiç sevk edilmemiş kişiler.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["3", "three"],
              explain:
                "«Priority is decided by a panel of three» — kurul üye sayısı. İki, toplanma sıklığıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["2", "two"],
              explain:
                "«which meets every two weeks» — toplanma sıklığı; üç ise üye sayısıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-12-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["range"],
              explain:
                "«publish the range alongside the median» — tek öneri, çünkü ortanca tam da incelenen durumları gizliyor.",
            },
          ],
        },
        {
          id: "en-c1-12-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who chaired a review of a waiting list. Choose a, b, c or d for questions 15 to 22. You hear the recording ONCE only.",
          promptTr:
            "Bir bekleme listesi incelemesine başkanlık etmiş bir kadınla söyleşi dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, incelemeye başkanlık etmiş Hale Turhan ile konuşuyor; Hale sunucunun kurduğu çerçeveyi kabul etmiyor.",
              plays: 1,
              segments: [
                { text: "Your review found a system that is failing patients." },
                { text: "It found a system that is doing exactly what it was designed to do, which is a more uncomfortable finding and I would rather we started there." },
                { text: "That sounds like a defence of it." },
                { text: "It is a description. If you tell people the machinery is broken, they will ask who broke it, and the answer will be nobody, and the conversation will stop. The machinery is working. The design is the problem." },
                { text: "You must have found somebody at fault." },
                { text: "I kept looking, and I want to be honest about that, because I began this review expecting to find one. There is no individual in the file who did anything I would not have done in the same chair with the same rules." },
                { text: "The clock resets. Somebody chose to allow that." },
                { text: "Somebody allowed it in 1998 for a reason that was sound at the time: a service should not be penalised when an applicant declines a date. What nobody modelled was who declines dates, and the answer turns out to be people with inflexible employment and no childcare." },
                { text: "So you would abolish the reset." },
                { text: "No, and this is where I part company with our own submissions. Abolish it and services stop offering dates at short notice, because every unaccepted offer now counts against them. You would remove a visible unfairness and create an invisible one." },
                { text: "Then what does your report recommend?" },
                { text: "Publish the range, not the median, and report resets separately. Neither is exciting and both are checkable, and I have come to distrust any recommendation in this field that cannot be checked by somebody who dislikes me." },
                { text: "One of your members dissented." },
                { text: "She did, and her note is the most useful thing in the volume. She is right that we wrote eleven pages on criteria and one paragraph on assessors. I would defend the order of our work and not the proportions of it." },
                { text: "Will any of this be implemented?" },
                { text: "The publishing changes, probably, because they cost nothing. The referral work, which is the half that actually matters, requires somebody to own a problem that currently belongs to no department, and I have been in this trade long enough not to promise you that." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-12-h3-15",
              no: 15,
              ref: "c1",
              text: "How does Hale respond to the interviewer's opening description?",
              options: [
                "She accepts it with minor corrections",
                "She replaces it with a harder finding",
                "She says the evidence is not yet complete",
                "She refers the question to her committee",
              ],
              answer: 1,
              explain:
                "Hale çerçeveyi değiştiriyor: sistem «is doing exactly what it was designed to do, which is a more uncomfortable finding».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-16",
              no: 16,
              ref: "c1",
              text: "Why does she avoid saying the system is broken?",
              options: [
                "The phrase would upset the staff involved",
                "It would understate the scale of the failure",
                "It would end the conversation at the wrong point",
                "Her committee agreed not to use the word",
              ],
              answer: 2,
              explain:
                "Hale sonucu öngörüyor: kırık denirse kimin kırdığı sorulur, cevap «nobody» olur «and the conversation will stop».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-17",
              no: 17,
              ref: "c1",
              text: "What does she say about looking for somebody at fault?",
              options: [
                "She expected to find one and did not",
                "She was prevented from naming individuals",
                "She thinks blame is always unhelpful",
                "She found several but omitted them",
              ],
              answer: 0,
              explain:
                "Hale kendi beklentisini açıklıyor: «I began this review expecting to find one», ama dosyada aynı kurallarla farklı davranacağı biri yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-18",
              no: 18,
              ref: "c1",
              text: "What was not considered when the reset rule was introduced?",
              options: [
                "How often dates would be offered",
                "The cost of administering the rule",
                "Which applicants would decline dates",
                "Whether services would object to it",
              ],
              answer: 2,
              explain:
                "Hale eksiği adlandırıyor: «What nobody modelled was who declines dates», cevap esnek olmayan işler ve çocuk bakımı.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-19",
              no: 19,
              ref: "c1",
              text: "Why does she oppose abolishing the reset?",
              options: [
                "The rule protects applicants who move house",
                "Short-notice offers would become rare",
                "The change would take several years to implement",
                "Her committee could not agree on a replacement",
              ],
              answer: 1,
              explain:
                "Hale sonucu kuruyor: kabul edilmeyen her teklif aleyhe sayılırsa hizmetler kısa süreli tarih vermeyi bırakır, «You would remove a visible unfairness and create an invisible one».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-20",
              no: 20,
              ref: "c1",
              text: "What does she value about her own recommendations?",
              options: [
                "They can be verified by opponents",
                "They can be introduced within a year",
                "They were agreed unanimously",
                "They require no new legislation",
              ],
              answer: 0,
              explain:
                "Hale ölçütünü veriyor: kendisinden hoşlanmayan birinin denetleyebileceği öneriler, «I have come to distrust any recommendation in this field that cannot be checked».",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-21",
              no: 21,
              ref: "c1",
              text: "How does she treat the dissenting note?",
              options: [
                "She says it misreads the evidence",
                "She regrets that it was published",
                "She calls it the most useful part",
                "She answers it point by point",
              ],
              answer: 2,
              explain:
                "Hale karşı oyu övüyor: «her note is the most useful thing in the volume», ve sayfa dengesizliğini kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-12-h3-22",
              no: 22,
              ref: "c1",
              text: "What does she expect to happen to the referral work?",
              options: [
                "It will be funded before the publishing changes",
                "It will be handed to an independent body",
                "It will be completed within two years",
                "It will stall because no department owns it",
              ],
              answer: 3,
              explain:
                "Hale engeli adlandırıyor: bu iş «requires somebody to own a problem that currently belongs to no department», ve söz vermeyeceğini söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-12-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about waiting lists and priority. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Bekleme listeleri ve öncelik üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to explain why a rule produces an effect nobody intended" },
            { key: "b", label: "to argue that a proposed remedy would create a new problem" },
            { key: "c", label: "to object to the word used for a reform" },
            { key: "d", label: "to locate the unfairness before the list begins" },
            { key: "e", label: "to defend a rule on the ground that it cannot be argued with" },
            { key: "f", label: "to admit that a personal expectation was not borne out" },
            { key: "g", label: "to complain about the length of official documents" },
            { key: "h", label: "to recommend a change that opponents could verify" },
            { key: "i", label: "to describe what a published figure actually measures" },
            { key: "j", label: "to propose deciding some cases at random" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı bir kuralın istenmeyen etkisini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The reset was written in 1998 to stop services being punished when somebody turns a date down, and as a rule that is perfectly sensible. Nobody asked which people turn dates down. It is the ones who cannot get an afternoon off, and the rule has been quietly sorting by employment ever since." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı önerilen çareyi eleştiriyor.",
              plays: 2,
              segments: [
                { text: "Abolish the reset and watch what happens next. Every offer that is not accepted counts against the service, so the service stops making offers at ten days' notice and starts making them at six weeks. You have removed something you could see and produced something you cannot." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı reformun adlandırılmasına itiraz ediyor.",
              plays: 2,
              segments: [
                { text: "Reorder the list. I have no objection and the evidence supports it. What I will not accept is the word fairness on the front of it while eleven hundred people who qualify have never been referred and are not counted anywhere in the document." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı adaletsizliğin yerini gösteriyor.",
              plays: 2,
              segments: [
                { text: "Nine years, and I never moved a name I could not justify. The gap opened before anybody reached my screen: one applicant with a relative who knew which office to ring, the other holding a letter that answered a question she had not asked." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı varış sırasını savunuyor.",
              plays: 2,
              segments: [
                { text: "Say what you like about ordering by arrival: nobody can appeal against a date. The moment you introduce judgement you introduce appeals, and appeals are won by whoever has somebody articulate in the family. I would rather have a blunt rule than a subtle one that sorts by confidence." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı beklentisinin boşa çıktığını kabul ediyor.",
              plays: 2,
              segments: [
                { text: "I went into that review looking for the person who had made the decision, and I said so at the first meeting. There is nobody. Every choice in that file is one I would have made in the same chair with the same rules, and that took me longer to accept than it should have." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı denetlenebilir bir öneri sunuyor.",
              plays: 2,
              segments: [
                { text: "Publish the range instead of the median and report the resets on their own line. Neither of those is interesting and both can be checked next April by somebody who thinks I am wrong, which is the only property I now look for in a recommendation." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı kayıtlı rakamın ne ölçtüğünü anlatıyor.",
              plays: 2,
              segments: [
                { text: "Her file says four months and she has been waiting nineteen, and the file is not lying. It is recording how easily she could take a date at ten days' notice. That is a measurement of shift patterns, and we print it in a column headed need." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-12-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Birinci konuşmacı kuralın istenmeyen sonucunu anlatıyor: «the rule has been quietly sorting by employment ever since».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "İkinci konuşmacı çarenin yeni bir sorun üreteceğini gösteriyor: «You have removed something you could see and produced something you cannot».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Üçüncü konuşmacı sıralamaya değil adlandırmaya itiraz ediyor: «What I will not accept is the word fairness on the front of it».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Dördüncü konuşmacı açığın nerede oluştuğunu söylüyor: «The gap opened before anybody reached my screen».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Beşinci konuşmacı kuralın tartışılamazlığını savunuyor: «nobody can appeal against a date», yargı girince itirazlar başlıyor.",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Altıncı konuşmacı beklentisinin boşa çıktığını kabul ediyor: «I went into that review looking for the person who had made the decision … There is nobody».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "h",
              explain:
                "Yedinci konuşmacı denetlenebilirliği ölçüt yapıyor: öneriler «can be checked next April by somebody who thinks I am wrong».",
            },
            {
              kind: "match",
              id: "en-c1-12-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "i",
              explain:
                "Sekizinci konuşmacı rakamın ölçtüğünü adlandırıyor: «It is recording how easily she could take a date at ten days' notice», yani vardiya düzeni.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "This part has two tasks: an essay and a note of dissent.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir karşı oy yazısı.",
      tasks: [
        {
          id: "en-c1-12-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have read an article arguing that waiting lists disguise choices as procedures. Write an essay for your tutor discussing which of the following should determine a person's place in a queue, and explaining why the other two are weaker: the order of arrival, an assessment of need, or a lottery among comparable cases. Write 220 to 260 words.",
          promptTr:
            "Bekleme listelerinin seçimleri usul gibi gösterdiğini savunan bir yazı okudun. Danışmanın için bir deneme yaz: bir kişinin kuyruktaki yerini aşağıdakilerden hangisi belirlemeli ve öteki ikisi neden daha zayıftır? Varış sırası, ihtiyaç değerlendirmesi ya da benzer durumlar arasında kura. 220–260 kelime.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Choose one rule and argue for it.", tr: "Bir kuralı seçip savun." },
              { de: "Explain why each of the other two is weaker.", tr: "Öteki ikisinin neden daha zayıf olduğunu açıkla." },
              { de: "Concede at least one point to a rule you reject.", tr: "Reddettiğin bir kurala en az bir noktada hak ver." },
              { de: "Reach a conclusion that follows from the argument.", tr: "Gövdeden çıkan bir sonuca var." },
            ],
            sample: `Every ordering rule distributes the same scarcity differently, and the useful question is therefore not which rule is fair but which unfairness we are prepared to see.

Assessment of need is the rule I would adopt, for the plain reason that it is the only one of the three that attends to what the queue exists for. A person who will lose their employment within a month and a person who will not are in materially different positions, and both arrival and the lottery are constructed so as to be unable to notice this. The objection to assessment is real and I want to state it properly: a judgement invites an appeal, and appeals are exercised disproportionately by applicants who have encountered such processes before. That is an argument for publishing the appeal route in usable language, not for abandoning judgement.

Ordering by arrival is defended precisely because it cannot be contested, and its advocates are right that unarguable rules resist manipulation. What they concede too little is that indifference is not neutrality. A rule that treats two unlike cases identically has made a decision about them, and has merely declined to say so.

The lottery is the most honest of the three in the narrow band where cases genuinely cannot be distinguished, and outside that band it is an evasion dressed as modesty.

I would assess need, publish both the criteria and the route by which a decision can be challenged, and use a lottery only where the assessment itself reports that it cannot separate two applicants.`,
            criteria: [
              "Bir kural seçildi mi ve savunuldu mu?",
              "Öteki ikisi ayrı ayrı çürütüldü mü?",
              "Reddedilen bir görüşe hak verildi mi?",
              "Kayıt akademik mi ve bağlayıcılar çeşitli mi?",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-12-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You sit on a committee whose report you have signed but partly disagree with. Write a note of dissent to be published with the report. State what you accept, set out precisely what you object to and why, and give one narrower recommendation of your own. Write 220 to 260 words.",
          promptTr:
            "İmzaladığın ama bir bölümüne katılmadığın bir komisyon raporunun üyesisin. Raporla birlikte yayımlanacak bir karşı oy yazısı yaz. Neyi kabul ettiğini söyle, neye ve neden itiraz ettiğini kesin biçimde ortaya koy ve kendi daha dar önerini ver. 220–260 kelime.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "State clearly what you accept in the report.", tr: "Raporda neyi kabul ettiğini açıkça söyle." },
              { de: "Set out the objection precisely, with reasons.", tr: "İtirazını gerekçeleriyle kesin biçimde ortaya koy." },
              { de: "Give one narrower recommendation of your own.", tr: "Kendi daha dar önerini ver." },
            ],
            sample: `Note of dissent

I have signed this report and I dissent from its second recommendation. I set out below what I accept, since a dissent that misrepresents the majority is of no use to anybody.

I accept the evidence in chapters four and five in full. It is more thorough than the material available to the previous review, and it establishes that ordering by arrival produces outcomes that no member of this committee would defend if asked to choose them deliberately. I accept, too, that reordering is within our remit and that delay has a cost.

My objection concerns a step the report treats as procedural. Reordering by assessed need requires assessors, and the report gives eleven pages to the criteria and a single paragraph to the people who will apply them. That paragraph promises training. It is silent on accountability, silent on what occurs when two assessors reach different conclusions, and silent on how an applicant contests a judgement made about their own case. Those omissions are not incidental to the reform; they are the machinery by which a criterion becomes a position in a queue, and an unexamined machinery will be filled by whoever already knows how such things work.

I recommend, more narrowly than the report, that we publish the assessment rules and the appeal route in language an applicant can act on, and report annually the number of referrals declined before the list is reached. Reordering should follow once there is something against which to check it.`,
            criteria: [
              "Kabul edilen bölüm açıkça belirtildi mi?",
              "İtiraz kesin ve gerekçeli mi?",
              "Öneri rapordan daha dar ve uygulanabilir mi?",
              "Kurumsal kayıt korundu mu?",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
      ],
    },

    /* ── SPEAKING ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "This part has three tasks: an interview, a long turn, and a discussion.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, tek başına konuşma ve tartışma.",
      tasks: [
        {
          id: "en-c1-12-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about waiting and priority.",
          promptTr: "Sana beklemek ve öncelik hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Tell me about a time you waited for something and the order seemed unfair.", tr: "Günaydın. Bir şey için beklediğin ve sıranın adaletsiz göründüğü bir zamanı anlat." },
            { who: "you", hint: "Durumu somut ver ve neyi adaletsiz bulduğunu adlandır.", expect: "somut bir durumu anlatıp itirazı adlandırmak", seconds: 45 },
            { who: "partner", de: "Thank you. Did you know how the order had been decided?", tr: "Teşekkürler. Sıranın nasıl belirlendiğini biliyor muydun?" },
            { who: "you", hint: "Bilgi eksikliğinin etkisini tartış.", expect: "bilgi eksikliğinin sonucunu tartışmak", seconds: 45 },
            { who: "partner", de: "And if the rule had been published in advance, would that have changed how you felt?", tr: "Kural önceden yayımlanmış olsaydı hissettiklerin değişir miydi?" },
            { who: "you", hint: "Üçüncü tip koşulla cevapla ve dürüst ol.", expect: "üçüncü tip koşul kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "describe a situation and name the objection", tr: "Bir durumu anlatıp itirazı adlandırmak" },
              { de: "discuss the effect of not knowing the rule", tr: "Kuralı bilmemenin etkisini tartışmak" },
              { de: "use a third conditional", tr: "Üçüncü tip koşulu kullanmak" },
            ],
            sample:
              "I waited eleven months for a housing appointment and watched two people I know receive theirs in six, and what I objected to was not the wait but the fact that I could not find out what separated us. Nobody would tell me the rule, and in the absence of a rule you assume the worst available explanation, which in my case was probably unfair to the office. Had the criteria been published in advance, I think I would have waited just as long and complained considerably less, and I am slightly uncomfortable admitting that, because it suggests my objection was partly to being kept in the dark rather than to the delay itself.",
            criteria: [
              "Durum somut mu ve itiraz adlandırıldı mı?",
              "Bilgi eksikliğinin etkisi tartışıldı mı?",
              "Üçüncü tip koşul doğru kuruldu mu?",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
        {
          id: "en-c1-12-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. A service with more applicants than places can order them by arrival, by assessed need, or by lottery among comparable cases. Evaluate the three and say which you would choose, including what your choice costs and who pays it.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Yerinden çok başvurusu olan bir hizmet, başvuranları varış sırasına, değerlendirilen ihtiyaca ya da benzer durumlar arasında kuraya göre sıralayabilir. Üçünü değerlendir ve hangisini seçeceğini, bedeliyle ve o bedeli kimin ödediğiyle birlikte söyle.",
          prepSeconds: 60,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "evaluate all three rules", tr: "Üç kuralı da değerlendir" },
              { de: "choose one and justify the choice", tr: "Birini seçip gerekçelendir" },
              { de: "say what the choice costs and who pays it", tr: "Seçimin bedelini ve bedeli kimin ödediğini söyle" },
            ],
            sample:
              "Ordering by arrival has the single great merit of being unarguable, and its cost is paid by whoever happens to be in the worst position on an ordinary Tuesday, which is a form of indifference rather than of neutrality. A lottery is the honest rule inside the narrow band where two cases genuinely cannot be told apart, and outside that band it is modesty used as an excuse. Assessment of need is the one I would choose, and I want to be exact about what it costs: it introduces a judgement, and every judgement can be appealed, and appeals are won disproportionately by applicants who have met a process like this before or who know somebody who has. That cost is paid by the least practised applicant, which is close to the worst possible distribution of it. The answer is not to abandon assessment but to publish the appeal route in language somebody can actually act on, and to report every year how many people used it and who they were.",
            criteria: [
              "Üç kural da değerlendirildi mi?",
              "Seçim gerekçelendirildi mi?",
              "Bedel ve bedeli ödeyen adlandırıldı mı?",
              "Söylem işaretleyicileri ve adlaştırma kullanıldı mı?",
              "İki dakika sürdürüldü mü?",
            ],
          },
        },
        {
          id: "en-c1-12-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt: "We discuss the topic further together.",
          promptTr: "Konuyu birlikte biraz daha tartışıyoruz.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "If a rule produces unfair results and nobody intended them, has anybody actually done anything wrong?", tr: "Bir kural kimsenin istemediği adaletsiz sonuçlar üretiyorsa gerçekten biri yanlış bir şey yapmış olur mu?" },
            { who: "you", hint: "Sorumluluğu nereye koyduğunu açıkla.", expect: "sorumluluğu konumlandırmak ve gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "But that risks letting everybody off. Where does responsibility actually sit?", tr: "Ama bu herkesi aklama riski taşıyor. Sorumluluk tam olarak nerede?" },
            { who: "you", hint: "İtirazı ciddiye al ve daha kesin ol.", expect: "bir itirazı ciddiye alıp daha kesin bir yanıt vermek", seconds: 50 },
            { who: "partner", de: "And should a service publish the longest wait it has recorded, or only the median?", tr: "Bir hizmet kaydettiği en uzun süreyi mi yayımlamalı, yalnız ortancayı mı?" },
            { who: "you", hint: "Bir taraf seç ve sakıncasını da an.", expect: "bir tarafı seçmek ve sakıncasını anmak", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "locate responsibility and justify the placement", tr: "Sorumluluğu konumlandırmak ve gerekçelendirmek" },
              { de: "take an objection seriously and sharpen the answer", tr: "Bir itirazı ciddiye alıp yanıtı keskinleştirmek" },
              { de: "choose a side and admit its drawback", tr: "Bir tarafı seçip sakıncasını kabul etmek" },
            ],
            sample:
              "Nobody did anything wrong in the ordinary sense, and that is precisely what makes the case difficult rather than what makes it innocent. Your objection is fair and it deserves a sharper answer than I gave: responsibility sits with whoever holds the power to revise the rule once its effects are known, which in this instance is the department that has received three reports on it. Ignorance was excusable in 1998 and stopped being excusable at the second report. On publication, I would publish the longest wait as well as the median, and the drawback is not trivial — a single extreme case will be quoted in every subsequent debate and will distort the discussion in its own way. I would accept that, because a distortion everybody can see is cheaper than a tail that nobody knows exists.",
            criteria: [
              "Sorumluluk açıkça konumlandırıldı mı?",
              "İtiraz ciddiye alındı ve yanıt keskinleştirildi mi?",
              "Taraf seçildi ve sakıncası kabul edildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

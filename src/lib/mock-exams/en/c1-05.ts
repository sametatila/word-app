import type { MockPaper } from "../types";

/**
 * C1 · Deneme 5 — "Work, Automation and the Shape of a Job".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Bu kâğıtta okuma 5,
 * okuma 6, okuma 7 ve dinleme 3 bilerek başka yaylar izliyor: önceki
 * denemelerde "görünmeyen emek" denemesi, "beş yazar" dizilimi, "uzmanı
 * kayda geçirme" araştırması ve "tek sayı yayımlansın mı" paneli
 * tekrarlanır olmuştu. Aynı kalıp beşinci kez gelseydi öğrenci savı
 * değil şablonu tanırdı.
 *
 * C1 İMZALARI: devrik yapı, yarma cümle, çekimserlik belirteci ve
 * adlaştırma boşluksuz metinlerde geçiyor.
 */
export const EN_C1_05: MockPaper = {
  id: "en-c1-05",
  course: "en",
  level: "C1",
  no: 5,
  theme: "Work, Automation and the Shape of a Job",
  themeTr: "İş, otomasyon ve bir işin biçimi",
  minutes: 215,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 80,
      instruction:
        "This part has eight tasks. The first four are about vocabulary and grammar; the last four are reading tasks. Choose or write the correct answer for each question.",
      instructionTr:
        "Bu bölümde sekiz görev var. İlk dördü kelime ve dilbilgisi, son dördü okuma görevi. Her soruda doğru cevabı seç ya da yaz.",
      tasks: [
        {
          id: "en-c1-05-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en uygun seçeneği bul. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Feature article",
              genreTr: "Dosya yazısı",
              title: "The post that was never advertised again",
              body: `Seldom has an occupation disappeared as quietly as the switchboard operator. There was no announcement and no campaign; the posts simply {{1}} to be filled as the people in them retired.

The usual explanation is the machine, and it explains less than the retellings suggest. An exchange that dials itself {{2}} away the task, which settles the matter for most accounts. What that story leaves out is that the work did not vanish; it was distributed across everybody else in the building, and nobody has ever counted it.

A second factor tends to be {{3}} over. An occupation that disappears takes its training with it, and the apprenticeships that carried it were the first thing to go when the posts {{4}} unfilled.

Whether any of this could have been managed differently is an open question. Several countries tried retraining schemes, and the evidence for them remains {{5}} at best. What does seem to work is nothing so grand: a long notice period and somebody whose actual job {{6}} of finding the next one.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-05-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["stopped", "ceased", "ended", "finished"],
              answer: 1,
              explain:
                "`cease to do something` bir sürecin sessizce sona ermesini anlatır ve mastar alır. `stop` ardından ulaç ister (`stop being filled`); `end` ve `finish` bu yapıda mastarla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["puts", "gives", "sets", "takes"],
              answer: 3,
              explain:
                "`take something away` bir şeyi ortadan kaldırmaktır ve boşluktan sonra `away` geliyor. `give away` bağışlamak, `put away` kaldırıp saklamak, `set away` ise kalıp değildir.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["gone", "looked", "passed", "seen"],
              answer: 2,
              explain:
                "`pass over something` bir konuyu atlamaktır ve edilgen biçimde de bu anlamı korur. `go over` gözden geçirmek, `look over` incelemek demektir; ikisi de tam tersini söyler.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["went", "fell", "came", "got"],
              answer: 0,
              explain:
                "`go unfilled`, `go unnoticed`, `go unpunished` — `go` + olumsuz sıfat kalıbı bir şeyin gerçekleşmeden kalmasını anlatır. `fall`, `come` ve `get` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["broad", "narrow", "light", "thin"],
              answer: 3,
              explain:
                "`thin evidence` kanıtın yetersizliğini anlatan yerleşik eşdizimdir ve `at best` ile çekimser bir yargı kurar. `narrow` kapsam darlığını bildirir; `light evidence` İngilizcede kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["makes", "consists", "stands", "holds"],
              answer: 1,
              explain:
                "`consist of something` bir şeyin neden oluştuğunu bildirir ve boşluktan sonra `of` geliyor. `make of` başka bir yapıdır, `stand of` ve `hold of` ise bu anlamı vermez.",
            },
          ],
        },
        {
          id: "en-c1-05-l2",
          no: 2,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and think of the word which best fits each gap, 7 to 12. Use only ONE word in each gap.",
          promptTr: "Metni oku ve 7–12. boşluklara en uygun sözcüğü bul. Her boşluğa YALNIZ BİR sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Academic prose",
              genreTr: "Akademik metin",
              title: "One word doing three jobs",
              body: `The word automation does more work in this debate {{7}} any single word should.

It covers a machine that replaces a task, a system that changes who decides, and a piece of software that does neither but requires everybody {{8}} learn it.

Treating these as one phenomenon is convenient, and it is the reason two careful people can look at the same workplace and disagree {{9}} what they saw.

There is, in addition, a timing problem. The costs arrive in the first year and fall on identifiable people; the benefits arrive later and are spread {{10}} thinly that nobody experiences them as a benefit at all.

None of this means that the benefits are imaginary. {{11}} follows is narrower: a distribution of this shape will always produce more testimony about the costs, and testimony is the material {{12}} which most policy is made.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-05-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["than"],
              explain:
                "`more … than` karşılaştırması cümleye yayılmış: sözcük gereğinden fazla iş görüyor. `as` yalnız `as … as` yapısında gelir ve orada `more` kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["to"],
              explain:
                "`require somebody to do something` yapısı nesnenin ardından mastar ister. `require that` da olurdu ama o zaman `everybody` özne olur ve `learn` yalın kalırdı; buradaki dizilim nesne + mastar.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["about", "on"],
              explain:
                "`disagree about something` ve `disagree on something` bir konu üzerinde anlaşamamayı bildirir; ikisi de doğaldır. `disagree with` ise bir kişiye ya da bir sava karşı çıkmaktır ve buradaki nesne bir kişi değil.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["so"],
              explain:
                "`so … that` derece ve sonucu bağlar: o kadar ince yayılıyor ki kimse fark etmiyor. `too thinly` bir sınırın aşıldığını bildirir ve `that` yan cümlesi almaz.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["what"],
              explain:
                "`What follows is …` kendi öncülünü taşıyan bir ad cümlesi kurar ve cümlenin öznesi olur. `That follows` bir gönderme yapar ama özne olamaz; `it` ise ardından `that` gerektirirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["from", "of"],
              explain:
                "`be made from` ve `be made of` bir şeyin hangi malzemeden yapıldığını bildirir; ilgi cümlesinde edat öne çekildiği için `which`in önünde duruyor. `by` faili gösterir ve burada fail değil malzeme anlatılıyor.",
            },
          ],
        },
        {
          id: "en-c1-05-l3",
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
              genre: "Reference text",
              genreTr: "Başvuru metni",
              title: "Task displacement",
              body: `Task displacement is the process by which parts of an occupation are taken over by machinery, usually with a gain in speed and a loss that is difficult to {{13}}.

The gain is easy to record. A displaced task can be counted, timed and priced; without such counting, large organisations could not plan at all.

The loss is not a matter of principle but of {{14}}. In a small workshop the remaining tasks are redistributed by whoever is standing there; in a body of forty thousand they are redistributed by a document, and the two are not equivalent.

Critics of the concept are sometimes accused of {{15}}, as though any attention to what is lost were a wish to stop the machines. The better versions of the argument are more specific.

They point out that the tasks which survive automation are not a random sample: they are the ones that were hardest to write down, which tends to make the surviving job less {{16}} and more exhausting.

Whether that is a price worth paying is a political question rather than a technical one, and pretending otherwise has been remarkably {{17}} to the quality of the debate, with different fields reaching quite different {{18}} from the same evidence.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-05-l3-13",
              no: 13,
              text: "QUANTITY",
              accept: ["quantify"],
              explain:
                "`difficult to ___` yapısı mastar ister, yani bir fiil: `quantify`. `quantity` addır ve `to` mastarının ardında duramaz; `quantifiable` ise sıfattır ve `difficult to` ile değil `hard to be` benzeri bir yapıyla gelirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l3-14",
              no: 14,
              text: "ORGANISE",
              accept: ["organisation", "organization"],
              explain:
                "`not a matter of principle but of ___` yapısı `of` edatının ardında bir ad ister ve karşıtlık ilkeyle kuruluyor: sorun düzenleme biçiminde. Britanya ve Amerika yazımı ikisi de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l3-15",
              no: 15,
              text: "ROMANCE",
              accept: ["romanticism"],
              explain:
                "`accused of ___` yapısı bir ad ister ve suçlama bir tutuma yöneliyor: geçmişi güzelleştirmek. `romantic` sıfattır, `romance` ise bu bağlamda başka bir anlam taşır.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l3-16",
              no: 16,
              text: "VARY",
              accept: ["varied"],
              explain:
                "`less ___ and more exhausting` yapısı iki sıfatı karşılaştırıyor. `vary` fiilinin sıfat biçimi `varied`dir; ad biçimi (`variety`) `less` ile bu dizilimi kuramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l3-17",
              no: 17,
              text: "DESTROY",
              accept: ["destructive"],
              explain:
                "`has been remarkably ___ to` yapısı bir sıfat ister ve `to` edatını alan biçim `destructive`tir. Ad (`destruction`) belirteçle nitelenmez ve `has been` ardından bu dizilimi kurmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l3-18",
              no: 18,
              text: "CONCLUDE",
              accept: ["conclusions"],
              explain:
                "`reaching quite different ___` yapısında sıfattan sonra bir ad geliyor ve `different` çoğul ister: `conclusions`. Fiil biçimi bu konumda duramaz.",
            },
          ],
        },
        {
          id: "en-c1-05-l4",
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
              id: "en-c1-05-l4-19",
              no: 19,
              text: "It is possible that the post was left unfilled deliberately.\nThe post ______ unfilled deliberately.",
              cue: "HAVE",
              accept: ["may have been left", "might have been left", "could have been left"],
              explain:
                "Geçmişe dair olasılık `may/might/could + have + üçüncü hâl` ile kurulur ve cümle edilgen olduğu için `been` de gerekiyor. Anahtar sözcük `have` zincirin ortasında değişmeden duruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l4-20",
              no: 20,
              text: "The company should have consulted the staff before the change.\nThe staff ______ before the change.",
              cue: "CONSULTED",
              accept: ["should have been consulted"],
              explain:
                "Geçmişe dönük bir gereklilik edilgene çevriliyor. Anahtar sözcük üçüncü hâl olduğu için zincir `should have been` biçiminde tamamlanıyor; `should be consulted` geçmişi kaybederdi.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l4-21",
              no: 21,
              text: "There is no way of establishing who first proposed the system.\nIt ______ to establish who first proposed the system.",
              cue: "IMPOSSIBLE",
              accept: ["is impossible"],
              explain:
                "`There is no way of + ulaç` yapısı `it is impossible to + fiil` kalıbına çevriliyor. Anahtar sözcük sıfat olduğu için önüne bir bağ fiil gerekiyor ve ardından mastar geliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-05-l4-22",
              no: 22,
              text: "They only admitted the error after the third complaint.\nOnly after the third complaint ______ the error.",
              cue: "DID",
              accept: ["did they admit"],
              explain:
                "`Only after …` öbeği cümle başına geçtiğinde özne ile yardımcı fiil devrilir: «did they admit». Anahtar sözcük `did` bu devrik yapının yardımcı fiili ve ardından yalın fiil gelir.",
            },
          ],
        },
        {
          id: "en-c1-05-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 26. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–26. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Essay",
              genreTr: "Deneme",
              title: "The interview that cannot be failed",
              body: `Every organisation I have worked for has believed that it selects well, and every one of them has been unable to say what it selects for. This is not a complaint about incompetence. It is an observation about a task that looks straightforward and is not.

Consider what a selection process actually has to do. It must predict performance in a role that will change within two years, using evidence gathered in ninety minutes from a person who is performing, against criteria written by somebody who no longer does the job. Put like that, the surprise is not that the process is unreliable; it is that anybody expects otherwise.

The research is unusually clear for a social science, and it has been clear for forty years. Structured interviews predict better than unstructured ones, work samples predict better than either, and the confidence an interviewer feels bears almost no relation to the accuracy of their judgement. Almost every organisation knows this. Almost none of them acts on it, and the reason is not ignorance.

What the panel is really doing is something else, and the something else is what the organisation wants. An unstructured conversation allows a panel to feel that the decision was theirs, it produces a story they can tell about why this candidate, and it distributes responsibility so thinly that no individual has to own the appointment. A work sample removes all three. Faced with a method that is more accurate and less comfortable, most institutions choose comfort and call it judgement.

I am not going to pretend that I stand outside this. I have sat on panels where the structured questions were asked, scored and then set aside for a conversation about fit, and I did not object, because objecting would have meant saying that I did not trust the room. Rarely does a panel record why it set the scores aside, and the reluctance of employers to record it is not an accident. On balance I think the room was wrong. I also think that anybody who has never been in that position is describing a workplace I have not worked in.`,
              gloss: [
                { de: "a work sample", tr: "iş örneği sınavı", en: "work sample" },
                { de: "a panel", tr: "seçme kurulu", en: "interview panel" },
                { de: "fit", tr: "uyum", en: "fit" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-05-l5-23",
              no: 23,
              text: "What does the writer say about selection processes?",
              options: ["They are asked to do something very difficult", "They are usually run by incompetent panels", "They have improved considerably in forty years", "They should be abolished"],
              answer: 0,
              explain:
                "İkinci paragraf görevin koşullarını sayıyor: «predict performance in a role that will change within two years, using evidence gathered in ninety minutes from a person who is performing». Yazı beceriksizlik savını da açıkça reddediyor: «This is not a complaint about incompetence».",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l5-24",
              no: 24,
              text: "What does the research show, according to the writer?",
              options: ["Interviewers who feel confident are usually right", "Structured interviews are worse than unstructured ones", "Work samples predict performance best", "No method predicts anything"],
              answer: 2,
              explain:
                "Sıralama metinde: «Structured interviews predict better than unstructured ones, work samples predict better than either». Görüşmecinin kendine güveni ile isabet arasında «almost no relation» olduğu da ayrıca söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l5-25",
              no: 25,
              text: "Why do organisations keep the unstructured interview?",
              options: ["It is cheaper to run", "It gives the panel what the better method removes", "The research is not yet widely known in the sector", "Candidates prefer it"],
              answer: 1,
              explain:
                "Dördüncü paragraf üç şey sayıyor: kararın kurulun olduğu duygusu, anlatılabilir bir gerekçe ve sorumluluğun dağılması. «A work sample removes all three» cümlesi bağı doğrudan kuruyor; cehalet ise açıkça dışlanıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-l5-26",
              no: 26,
              text: "What does the writer say about her own conduct?",
              options: ["She always insisted on keeping the structured questions", "She has never sat on a panel", "She reported the panel afterwards", "She did not object, and thinks the panel was wrong"],
              answer: 3,
              explain:
                "Son paragraf iki şeyi birlikte söylüyor: «I did not object, because objecting would have meant saying that I did not trust the room» ve «On balance I think the room was wrong».",
            },
          ],
        },
        {
          id: "en-c1-05-l6",
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
              body: "Every proposal here assumes that the organisation wants a better prediction. It does not. It wants a decision that can be defended in a meeting, and those are different objects with different requirements. Until somebody writes that down, the reform literature is describing a country nobody lives in.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "I ran the numbers for eleven appointments over six years, matching the panel's ranking against the performance review two years later. The correlation was almost exactly zero. I expected weak. Zero was not what I expected, and I have not been able to explain it away.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "The cost falls on people who are not in the room. A process that favours the confident does not merely misselect; it teaches a whole category of candidate that the door is not for them, and that lesson is learned once and kept for a working life.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "I would separate two claims that keep getting merged. That interviews predict badly is well established. That any particular alternative is better in a real organisation, with real managers and no budget, is not, and the second claim is the one being sold.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "Nothing here is new. The same argument, with much the same evidence, appears in a report from 1978, and the recommendations are the same. What has changed is that we now have software to do rather faster the thing we were already doing badly.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-05-l6-27",
              no: 27,
              text: "Which writer reports a personal finding that surprised them?",
              answer: "b",
              explain:
                "Writer B kendi hesabını ve beklentisini birlikte veriyor: «The correlation was almost exactly zero. I expected weak. Zero was not what I expected», ve açıklayamadığını da kabul ediyor.",
            },
            {
              kind: "match",
              id: "en-c1-05-l6-28",
              no: 28,
              text: "Which writer distinguishes a well-established claim from a weaker one?",
              answer: "d",
              explain:
                "Writer D iki savı ayırıyor: görüşmelerin kötü kestirdiği «well established», herhangi bir alternatifin gerçek bir kurumda daha iyi olduğu ise değil. «the second claim is the one being sold».",
            },
            {
              kind: "match",
              id: "en-c1-05-l6-29",
              no: 29,
              text: "Which writer says the harm reaches beyond the candidates who were rejected?",
              answer: "c",
              explain:
                "Writer C zararı yayıyor: süreç yalnız yanlış seçmiyor, «it teaches a whole category of candidate that the door is not for them», ve bu ders bir çalışma ömrü boyunca kalıyor.",
            },
            {
              kind: "match",
              id: "en-c1-05-l6-30",
              no: 30,
              text: "Which writer says the debate misdescribes what organisations actually want?",
              answer: "a",
              explain:
                "Writer A varsayımı çürütüyor: kurum daha iyi kestirim değil, «a decision that can be defended in a meeting» istiyor. Reform yazını bu yüzden var olmayan bir ülkeyi tarif ediyor.",
            },
          ],
        },
        {
          id: "en-c1-05-l7",
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
              genreTr: "Uzun makale",
              title: "The pilot that was cancelled twice",
              body: `Between 2016 and 2022 a national employer ran the same pilot three times: replace the unstructured interview with a work sample for one category of post, and compare the appointments two years later. The design was sound and the sample was large enough to see an effect.

{{31}}

The first cancellation is the least interesting. A minister changed, the programme was reorganised, and the work stopped in month seven with no result at all.

{{32}}

The second attempt reached month twenty-two and produced a result, and the result was inconvenient. Appointments made by work sample performed slightly better, were noticeably more diverse, and the managers involved reported the process as less satisfying.

{{33}}

The third attempt was designed by people who had read the second report carefully, and it changed one thing: the managers kept a veto. Within a year the veto was being used in roughly a third of cases, and the difference between the two methods disappeared.

{{34}}`,
              gloss: [
                { de: "a pilot", tr: "pilot uygulama", en: "pilot scheme" },
                { de: "a veto", tr: "veto", en: "veto" },
                { de: "discretion", tr: "takdir yetkisi", en: "discretion" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "What happened next is the part worth studying, because it happened twice more and in very nearly the same order." },
            { key: "b", label: "b", body: "Nothing can be learned from an experiment that stops before it produces data, except how often that happens and to whom." },
            { key: "c", label: "c", body: "Two of those three findings were quoted in the summary. The third was not, and the third is the one that predicted what came next." },
            { key: "d", label: "d", body: "That is not a failure of the method. It is a demonstration that a method and the discretion left around it are not separate things." },
            { key: "e", label: "e", body: "Public sector recruitment in that period was also affected by a freeze on external appointments lasting eleven months." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-05-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Giriş tasarımın sağlam olduğunu söylüyor ve boşluktan sonraki paragraf «The first cancellation» diye başlıyor, yani araya iptalleri duyuran bir cümle girmeli. (a) bunu yapıyor ve tekrarı vurguluyor.",
            },
            {
              kind: "match",
              id: "en-c1-05-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "b",
              explain:
                "Önceki paragraf denemenin «stopped in month seven with no result at all» diye bittiğini söylüyor; (b) bundan çıkarılacak tek dersi veriyor: veri üretmeden duran deneyden ancak bunun ne sıklıkta olduğu öğrenilir.",
            },
            {
              kind: "match",
              id: "en-c1-05-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Önceki paragraf üç bulguyu sayıyor: «performed slightly better, were noticeably more diverse», ve yöneticilerin süreci «less satisfying» bulması. (c) hangisinin özete alınmadığını söylüyor ve üçüncü denemeye köprü kuruyor.",
            },
            {
              kind: "match",
              id: "en-c1-05-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Son paragraf vetonun etkisini veriyor: «the difference between the two methods disappeared». (d) bunun yöntemin başarısızlığı olmadığını söyleyip yazının savını kuruyor: yöntem ile çevresine bırakılan takdir yetkisi ayrı şeyler değil. (e) dış alım durdurmasından söz ediyor ve metnin hiçbir yerinde alım yasağı tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-05-l8",
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
              label: "a — Line manager",
              body: "People ask me for the criteria and I give them, and it does not help, which used to embarrass me. The criteria are accurate. What they cannot carry is that I am also deciding who I will be able to disagree with at four on a Friday, and in nine years nobody has asked me to write that down.",
            },
            {
              key: "b",
              label: "b — HR director",
              body: "We publish the profile of applicants at every stage, and the drop happens at the same point every year: between the longlist and the interview. I have shown that chart in eleven meetings. Nobody disputes it and nothing has changed, which tells you that the chart was not the missing thing.",
            },
            {
              key: "c",
              label: "c — Training lead",
              body: "New managers are given two hours on selection, and the two hours are good. Then they sit on a panel with three people who have been doing it for fifteen years, and the two hours evaporate before lunch. The training is not competing with ignorance; it is competing with the room.",
            },
            {
              key: "d",
              label: "d — Union representative",
              body: "I have agreed to flexible arrangements every year I have been in post, and I would defend most of them against anybody. What I would not defend is that we never recorded which tasks moved and to whom, so the next negotiation starts from nothing.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-05-l8-35",
              no: 35,
              text: "Which text says that an accurate account leaves out what actually decides?",
              answer: "a",
              explain:
                "Yönetici ölçütlerin doğruluğunu kabul edip eksiği adlandırıyor: «What they cannot carry is that I am also deciding who I will be able to disagree with at four on a Friday».",
            },
            {
              kind: "match",
              id: "en-c1-05-l8-36",
              no: 36,
              text: "Which text says that evidence on its own has changed nothing?",
              answer: "b",
              explain:
                "İnsan kaynakları müdürü grafiği on bir toplantıda göstermiş: «Nobody disputes it and nothing has changed, which tells you that the chart was not the missing thing».",
            },
            {
              kind: "match",
              id: "en-c1-05-l8-37",
              no: 37,
              text: "Which text says that training is defeated by what happens afterwards?",
              answer: "c",
              explain:
                "Eğitim sorumlusu iki saatin iyi olduğunu söylüyor ama «the two hours evaporate before lunch» ve gerekçeyi veriyor: «it is competing with the room».",
            },
            {
              kind: "match",
              id: "en-c1-05-l8-38",
              no: 38,
              text: "Which text criticises a failure to record what changed?",
              answer: "d",
              explain:
                "Sendika temsilcisi düzenlemelerin kendisini değil kayıtsızlığı eleştiriyor: «we never recorded which tasks moved and to whom, so the next negotiation starts from nothing».",
            },
            {
              kind: "match",
              id: "en-c1-05-l8-39",
              no: 39,
              text: "Which text says that nobody has asked for the real reason to be stated?",
              answer: "a",
              explain:
                "Yönetici süreyi de veriyor: «in nine years nobody has asked me to write that down». Yazılmayan şey, kararı asıl belirleyen ölçüt.",
            },
            {
              kind: "match",
              id: "en-c1-05-l8-40",
              no: 40,
              text: "Which text defends the very decisions it also criticises?",
              answer: "d",
              explain:
                "İki cümle yan yana duruyor: «I would defend most of them against anybody» ve «What I would not defend is …». Savunma düzenlemelere, eleştiri kayıt tutulmamasına.",
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
        "This part has four tasks. You hear short extracts, a report, a panel discussion and eight monologues. Read each instruction carefully: not every recording is played twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, bir panel ve sekiz kısa konuşma dinleyeceksin. Yönergeleri dikkatle oku: her kayıt iki kez çalınmıyor.",
      tasks: [
        {
          id: "en-c1-05-h1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear three short extracts. There are two questions on each. Choose a, b or c. You hear each extract twice.",
          promptTr: "Üç kısa parça dinleyeceksin. Her birine iki soru var. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Conversation",
              genreTr: "Konuşma",
              situation: "İki kişi bir işe alım pilot uygulamasını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Eren", text: "The pilot worked, and I say that as somebody who spent two years arguing against it. What I still cannot defend is that we let managers keep a veto." },
                { speaker: "Zsofia", text: "The veto is not ours, though. It was the condition for running the thing at all." },
                { speaker: "Eren", text: "Which is precisely the objection, not an answer to it. If we accept a condition that removes the effect, we should say so in the report rather than publish the design as though it were intact." },
                { speaker: "Zsofia", text: "I would go along with saying so. I would resist the next step, which is to make a recruitment pilot responsible for the whole distribution of authority in the organisation." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir yönetici görev tanımlarını yeniden yazma işini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You rewrote every job description in your organisation. Why?" },
                { speaker: "Manager", text: "Because they described a set of tasks and we were hiring for a set of judgements, and nobody had noticed that the two documents were the same document. The rewrite took fourteen months and I would not do it again." },
                { speaker: "Host", text: "Why not?" },
                { speaker: "Manager", text: "Because the descriptions are better and the appointments are the same. I improved the instrument and not the practice, which is the most common way to spend a year in this field." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi seçme yazınından bir bulgu aktarıyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "There is a finding in this literature that nobody enjoys and everybody can replicate. Interviewers who are given ten minutes to discuss a candidate before the interview produce more consistent judgements and no more accurate ones." },
                { speaker: "Lecturer", text: "Consistency and accuracy come apart, and when they come apart, organisations reliably choose consistency, because consistency is the thing they can be held to account for." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-05-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Eren's criticism?",
              options: ["The managers' veto", "The size of the sample", "The cost of the pilot"],
              answer: 0,
              explain:
                "Eren pilotun işlediğini baştan kabul ediyor: «The pilot worked, and I say that as somebody who spent two years arguing against it». Eleştirisi tek noktada: «we let managers keep a veto».",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h1-2",
              no: 2,
              ref: "a1",
              text: "What does Zsofia accept and what does she refuse?",
              options: ["She accepts the criticism but not the change to the report", "She refuses both parts", "She accepts the report change but not a wider duty"],
              answer: 2,
              explain:
                "Zsofia ayrımı kendisi yapıyor: «I would go along with saying so», ama «I would resist the next step, which is to make a recruitment pilot responsible for the whole distribution of authority».",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h1-3",
              no: 3,
              ref: "a2",
              text: "Why did the manager rewrite the descriptions?",
              options: ["They were badly out of date and inconsistent", "They described tasks rather than judgements", "The regulator required it"],
              answer: 1,
              explain:
                "Gerekçe doğrudan veriliyor: «they described a set of tasks and we were hiring for a set of judgements». Tarih ya da denetleyici kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h1-4",
              no: 4,
              ref: "a2",
              text: "What is her assessment of the project?",
              options: ["It changed the appointments considerably for the better", "It was worth the fourteen months", "It improved the document but not the practice"],
              answer: 2,
              explain:
                "Kendi cümlesi: «the descriptions are better and the appointments are the same. I improved the instrument and not the practice». On dört ayı bir daha yapmayacağını da söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the lecturer say about the ten-minute discussion?",
              options: ["It makes judgements more consistent but no better", "It improves accuracy considerably in most cases", "It is rarely used by experienced panels"],
              answer: 0,
              explain:
                "Bulgu iki ölçüyü ayırıyor: «more consistent judgements and no more accurate ones». Tutarlılık artıyor, isabet artmıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h1-6",
              no: 6,
              ref: "a3",
              text: "Why do organisations choose consistency?",
              options: ["It is considerably cheaper to administer in practice", "It is what an organisation can be judged on", "It is more accurate over a long period"],
              answer: 1,
              explain:
                "Gerekçe son cümlede: «because consistency is the thing they can be held to account for». Maliyet karşılaştırması yapılmıyor ve isabet açıkça artmıyor.",
            },
          ],
        },
        {
          id: "en-c1-05-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting a review of recruitment. Complete the sentences, questions 7 to 14, with a word, a number or a short phrase. You hear the report ONCE only.",
          promptTr:
            "Bir kadının işe alım incelemesini sunduğunu dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük, bir sayı ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir uzman kurul önünde inceleme sonuçlarını sunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Thank you. I will give you the headline findings and I will not pretend they are comfortable. We looked at four hundred and sixty appointments made between 2018 and 2023, and we were able to match three hundred and ninety of them to a performance review two years later. The correlation between the panel's ranking and the later assessment was zero point zero eight, which is not zero and is not much. Here is the first finding: the strongest predictor in our data is not the interview score, it is the work sample, which was used in only a fifth of the competitions. Second, the panel size matters more than we expected. A panel of three produces the same accuracy as a panel of five and takes about forty per cent less time. Third, the format of the feedback. We tried a letter, a telephone call and a scored grid, and the grid produced the fewest appeals, which surprised the two of us who had argued for the call. Fourth, a caution: candidates who were already internal did substantially better at interview and no better afterwards. And finally, the cost. Each competition costs about eleven thousand pounds in staff time, and nobody had ever added that up before.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Recruitment review — headline findings",
              body: `Appointments examined:             {{7}}
Appointments matched to a review:  {{8}}
Correlation with later assessment: {{9}}
The strongest predictor is the {{10}}.
A panel of {{11}} is as accurate as a larger one.
The feedback format with the fewest appeals was the {{12}}.
{{13}} candidates did better at interview and no better afterwards.
Cost of each competition in staff time: {{14}} pounds`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-05-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["460", "four hundred and sixty"],
              explain:
                "«We looked at four hundred and sixty appointments» — incelenen toplam. Üç yüz doksan, iki yıl sonraki değerlendirmeyle eşleştirilebilenlerin sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["390", "three hundred and ninety"],
              explain:
                "«we were able to match three hundred and ninety of them to a performance review» — eşleştirilebilen sayı. Dört yüz altmış incelemenin tamamı.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["0.08", "zero point zero eight"],
              explain:
                "«The correlation … was zero point zero eight, which is not zero and is not much». Konuşmacı sayıyı hem sıfırdan hem de anlamlı bir ilişkiden ayırıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["work sample", "sample"],
              explain:
                "Kayıt beklentiyi bozuyor: «the strongest predictor in our data is not the interview score, it is the work sample». Görüşme puanını yazan öğrenci çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["3", "three"],
              explain:
                "«A panel of three produces the same accuracy as a panel of five and takes about forty per cent less time». Beş, karşılaştırmanın öteki ucu.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["grid", "scored grid"],
              explain:
                "Üç biçim denenmiş ve «the grid produced the fewest appeals». Telefon araması, onu savunanların şaşkınlığıyla birlikte anılıyor, yani kazanan o değil.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["internal"],
              explain:
                "«candidates who were already internal did substantially better at interview and no better afterwards» — görüşmede öne çıkan ama sonrasında fark yaratmayan grup.",
            },
            {
              kind: "gap",
              id: "en-c1-05-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["11000", "eleven thousand"],
              explain:
                "«Each competition costs about eleven thousand pounds in staff time, and nobody had ever added that up before». Rakamın kendisi kadar hiç toplanmamış olması da bir bulgu.",
            },
          ],
        },
        {
          id: "en-c1-05-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about selection methods. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Seçme yöntemleri üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel",
              situation: "Üç konuşmacı seçme yöntemlerinin uygulanmasını tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Lenn, your paper says that most selection reform fails at implementation rather than at design. Why?" },
                { speaker: "Lenn", text: "Because the design is done by people who will not run it. A work sample takes forty minutes to mark, and the person marking it has a full day of their own work. Nobody costed that, and the method dies in month four, blamed for something that was never tested." },
                { speaker: "Chair", text: "Wren, is that fair?" },
                { speaker: "Wren", text: "It is fair and it is incomplete. I have run three of these. The marking time is real. What killed two of mine was not time; it was that the panel could see the candidate's answers and could not see their face, and they did not trust a decision they could not feel." },
                { speaker: "Chair", text: "Juno?" },
                { speaker: "Juno", text: "I want to disagree with both of them, politely. You are describing the failure of pilots, and pilots fail for pilot reasons. The interesting question is what happens when a method is simply imposed and nobody is asked whether they are comfortable. That has been done twice, in large organisations, and it worked." },
                { speaker: "Chair", text: "Lenn, does that change your position?" },
                { speaker: "Lenn", text: "Partly, and I should say so. Imposition works where an organisation can absorb a year of resentment. Mine cannot. That is not a reason to reject Juno's evidence; it is a reason to stop calling it general." },
                { speaker: "Chair", text: "Wren, what would you do tomorrow?" },
                { speaker: "Wren", text: "Cost the marking properly and pay for it, and then stop reporting the thing as a pilot. Something everybody knows is temporary is evaluated as temporary. Half the effects we measure are measurements of impermanence." },
                { speaker: "Chair", text: "Juno, a last word." },
                { speaker: "Juno", text: "Only that we keep comparing this with clinical trials, and it does not fit. In a trial the control group does not know it is competing with the treatment group. Here the control group runs the treatment group's process and writes the report. I would drop the analogy entirely." },
              ],
              gloss: [
                { de: "to mark", tr: "değerlendirmek, puanlamak", en: "mark" },
                { de: "imposition", tr: "dayatma", en: "imposition" },
                { de: "impermanence", tr: "geçicilik", en: "impermanence" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-05-h3-15",
              no: 15,
              ref: "c1",
              text: "According to Lenn, why does selection reform fail?",
              options: ["The designs themselves are poorly thought out", "Candidates dislike the methods", "The evidence is weak", "Nobody costs the work of running it"],
              answer: 3,
              explain:
                "Lenn maliyeti adlandırıyor: kırk dakikalık değerlendirme ve zaten dolu bir iş günü. «Nobody costed that, and the method dies in month four». Tasarımı kötü saymıyor, tasarımcının işi yürütmeyeceğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-16",
              no: 16,
              ref: "c1",
              text: "What does Wren add to Lenn's account?",
              options: ["That the marking time turned out not to be a real problem at all", "That panels distrusted a judgement they could not feel", "That the candidates strongly preferred the old method", "That the pilots were too small"],
              answer: 1,
              explain:
                "Wren süreyi doğruluyor ama eksik buluyor: «What killed two of mine was not time; it was that the panel could see the candidate's answers and could not see their face».",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-17",
              no: 17,
              ref: "c1",
              text: "What is Juno's objection to both of them?",
              options: ["They describe why pilots fail, not the method", "They have misread the data", "They are far too pessimistic about the candidates", "They rely on a single organisation"],
              answer: 0,
              explain:
                "Juno ayrımı kuruyor: «You are describing the failure of pilots, and pilots fail for pilot reasons», ve asıl sorunun dayatma durumunda ne olduğu olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-18",
              no: 18,
              ref: "c1",
              text: "How does Lenn respond to Juno?",
              options: ["He rejects the evidence", "He simply repeats his original claim", "He accepts it but limits its scope", "He changes the subject"],
              answer: 2,
              explain:
                "Lenn kısmen geri adım atıyor: «Partly, and I should say so», sonra sınırı çiziyor: «That is not a reason to reject Juno's evidence; it is a reason to stop calling it general».",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-19",
              no: 19,
              ref: "c1",
              text: "What does Wren propose doing tomorrow?",
              options: ["Running a considerably larger pilot in another region", "Paying for marking and dropping the pilot label", "Abandoning work samples in all competitions", "Training the panels again"],
              answer: 1,
              explain:
                "İki adım veriyor: «Cost the marking properly and pay for it, and then stop reporting the thing as a pilot». Yöntemi bırakmayı ya da yeni bir pilot açmayı önermiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Wren say about temporary schemes?",
              options: ["They are considerably cheaper to evaluate properly", "They should run for longer", "They attract noticeably better candidates overall", "Being temporary distorts what is measured"],
              answer: 3,
              explain:
                "«Something everybody knows is temporary is evaluated as temporary. Half the effects we measure are measurements of impermanence» — ölçülen şeyin bir kısmı yöntem değil, geçicilik.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-21",
              no: 21,
              ref: "c1",
              text: "Why does Juno reject the clinical trial comparison?",
              options: ["Trials are very much larger than anything here", "Trials are better funded", "Here the control group writes the report", "Selection can never be properly randomised"],
              answer: 2,
              explain:
                "Juno farkı düzenekte buluyor: denemede kontrol grubu yarıştığını bilmez, «Here the control group runs the treatment group's process and writes the report». Ölçek ve bütçe karşılaştırması yapılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-05-h3-22",
              no: 22,
              ref: "c1",
              text: "Which of the three moves position during the discussion?",
              options: ["Lenn", "Wren", "Juno", "None of them"],
              answer: 0,
              explain:
                "Yalnız Lenn konumunu değiştirdiğini söylüyor: «Partly, and I should say so». Wren baştan «fair and incomplete» diyerek tamamlıyor, Juno ise savını sonuna kadar sürdürüyor.",
            },
          ],
        },
        {
          id: "en-c1-05-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about hiring and work. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "İşe alım ve çalışma üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to withdraw a claim they made earlier" },
            { key: "b", label: "to separate two questions that are usually merged" },
            { key: "c", label: "to explain why a trial was stopped" },
            { key: "d", label: "to predict that a rule will be worked around" },
            { key: "e", label: "to give the credit for an idea to somebody else" },
            { key: "f", label: "to object to a comparison used in the debate" },
            { key: "g", label: "to point to a cost that appears in no budget" },
            { key: "h", label: "to request more time before a decision" },
            { key: "i", label: "to speak up for a colleague under attack" },
            { key: "j", label: "to say that the evidence does not yet justify acting" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı eski bir savına dönüyor.",
              plays: 2,
              segments: [
                { text: "For years I told this committee that anonymous applications would make no difference, and I said it in writing. Four departments have now run them and the longlists have changed in every one. I was wrong, and it seems better to say so than to be quoted against myself later." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı iki ayrı soruyu ayırıyor.",
              plays: 2,
              segments: [
                { text: "We keep hearing that the process is unfair. Two entirely different questions are being run together there: whether the criteria are the right ones, and whether they are applied consistently to everybody. The first is a policy question. The second is an audit, and only one of them is being funded." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı durdurulan bir denemeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "We ran the blind marking scheme for eleven months and then we stopped it. Not because it failed; the results were slightly better. It required two people to strip identifying details from every application, and when one of them left, nobody replaced her and the whole thing quietly ended." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir kuralın doğuracağı davranışı anlatıyor.",
              plays: 2,
              segments: [
                { text: "If we publish a rule that every shortlist must contain at least one external candidate, I can tell you now what will happen. Within a year every shortlist will contain exactly one, and that person will be interviewed last on a Friday afternoon. Nobody will have broken the rule." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı tartışmadaki bir benzetmeyi reddediyor.",
              plays: 2,
              segments: [
                { text: "People keep saying that hiring is like buying a machine: define the specification and compare the offers. It is a comforting picture and it is wrong in the way that matters. A machine does not decide how to interpret its own specification, and the whole difficulty here is that a person does." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı hiçbir bütçede görünmeyen bir maliyeti anlatıyor.",
              plays: 2,
              segments: [
                { text: "The competition appears in our accounts as an advertising cost of nine hundred pounds. What appears nowhere is that five managers spent two days each on it, that two of them cancelled visits to do so, and that the work those visits would have covered simply moved to somebody else. Nobody has ever been asked to put a figure on that." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı eleştirilen bir meslektaşından söz ediyor.",
              plays: 2,
              segments: [
                { text: "A great deal has been said this week about the officer who chaired that panel, most of it by people who have not read the file. She used the scored questions, she recorded her reasoning, and she was outvoted. If we want to criticise somebody, the papers make it perfectly clear who." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı kanıtın yeterliğini tartışıyor.",
              plays: 2,
              segments: [
                { text: "I am not opposed to the change and I want that understood. My point is narrower: we have two studies, both from the same organisation, and one of them was designed by the team proposing the reform. That is not enough to rewrite a national framework on, and saying so is not obstruction." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-05-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı yazılı olarak savunduğu görüşü geri alıyor: «I was wrong, and it seems better to say so than to be quoted against myself later».",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "«Two entirely different questions are being run together there» — ölçütlerin doğruluğu ile tutarlı uygulanması. Konuşmanın tamamı bu ayrımı kurmaya ayrılmış.",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı durdurma nedenini veriyor ve başarısızlığı açıkça dışlıyor: «Not because it failed; the results were slightly better». Neden, işi yapan kişinin ayrılması ve yerine kimsenin alınmaması.",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Kuralın nasıl dolanılacağı önceden anlatılıyor: «every shortlist will contain exactly one, and that person will be interviewed last on a Friday afternoon. Nobody will have broken the rule».",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "f",
              explain:
                "Konuşmacı tartışmada kullanılan benzetmeyi hedef alıyor: makine kendi şartnamesini yorumlamaz, «the whole difficulty here is that a person does».",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "g",
              explain:
                "Görünen maliyetle görünmeyen bedel karşılaştırılıyor: dokuz yüz poundluk ilan hesapta var, «What appears nowhere is that five managers spent two days each on it».",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Konuşmacı eleştirilen görevliyi koruyor: puanlı soruları kullanmış, gerekçesini kaydetmiş ve oyla ezilmiş. «If we want to criticise somebody, the papers make it perfectly clear who».",
            },
            {
              kind: "match",
              id: "en-c1-05-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "j",
              explain:
                "Konuşmacı değişikliğe karşı olmadığını söyleyip kanıtın yetersizliğini gösteriyor: aynı kurumdan iki çalışma ve biri reformu önerenlerce tasarlanmış. «That is not enough to rewrite a national framework on».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "This part has two tasks. Write 220 to 260 words for each. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var. Her biri için 220–260 kelime yaz. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-c1-05-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on hiring and automation. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. A more accurate selection method is worth adopting even if managers dislike it.\n2. A method that managers will not use as designed produces no improvement at all.\n\nWrite 220 to 260 words.",
          promptTr:
            "İşe alım ve otomasyon üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Daha isabetli bir seçme yöntemi, yöneticiler sevmese de benimsenmeye değer.\n2. Yöneticilerin tasarlandığı gibi kullanmayacağı bir yöntem hiçbir iyileşme sağlamaz.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two points raised in the seminar are not opposed so much as sequential, and the difficulty lies in deciding which one a reform should be designed around.

The case for accuracy is a case about the object of the exercise. If a method predicts performance better, then adopting it is simply what the organisation said it was trying to do, and the discomfort of the people running it is a cost rather than an objection. It is worth adding that discomfort is precisely what one would expect from a method that removes discretion, and that its presence is therefore weak evidence of anything.

The second point concerns what an organisation is capable of executing. The claim is not that managers are obstructive but that a method used at half strength is not the method that was evaluated: a scored exercise followed by an unrecorded conversation about fit is an unstructured interview with an expensive preliminary. On this account the accuracy figure belongs to a process nobody has actually run.

I regard the second as the more important, though for a narrower reason than is usually offered. Accuracy can be recovered later; a reform that fails visibly cannot, because the failure is remembered as evidence against the method rather than against the implementation.

My own view is that the framing conceals the real question, which is not which method to adopt but who is paid to run it. Nobody at the seminar costed the marking, and until somebody does, both points remain arguments about a process that exists on paper.`,
            criteria: [
              "İki nokta da adil biçimde özetlendi mi?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi görüş özetten ayrılıyor mu?",
              "Karşı görüşün en güçlü hâli mi kuruldu, yoksa zayıflatıldı mı?",
              "Çekimserlik ve ince ayrım ifadeleri C1 düzeyinde mi? (though for a narrower reason, on this account)",
              "220–260 kelime aralığında mı?",
              "Kayıt akademik mi?",
            ],
          },
        },
        {
          id: "en-c1-05-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to introduce a new selection method for one category of post. Write a report for its management. Describe how appointments are currently made, assess the likely effects of the change, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum bir görev grubu için yeni bir seçme yöntemi getirmek üzere. Yönetime bir rapor yaz. Atamaların şu an nasıl yapıldığını anlat, değişikliğin olası etkilerini değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe current practice precisely.", tr: "Mevcut uygulamayı kesin biçimde anlat." },
              { de: "Assess both the gains and the costs of the change.", tr: "Değişikliğin hem kazancını hem bedelini değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed work sample for team leader posts

Current practice
Appointments are made by a panel of three after a forty-five minute interview using six questions, four of which have been unchanged since 2017. Scores are recorded on a grid and, in eleven of the last fourteen competitions, the panel then held a further discussion that is not minuted. Two of those fourteen appointments were subsequently reversed within a year.

Assessment
The gain is likely to be real but smaller than the literature suggests. A work sample would replace the least reliable element of the interview, and our own reversal rate implies room for improvement. Two costs are not in the proposal. The first is marking: forty minutes per candidate, against an average of nine candidates, adds six hours per competition to the workload of people who currently have none allocated. The second is the unminuted discussion, which the proposal does not mention and which will survive the change unless it is addressed directly.

Recommendation
I recommend adopting the work sample for these posts, on two conditions: that the marking time is budgeted and released, and that the post-interview discussion is either minuted or discontinued. I would not recommend introducing the method while leaving the discussion in place, since that combination produces the cost of the new method and the outcome of the old one. I would also advise against evaluating the change after a single competition, as one cycle cannot distinguish a method from a novelty.`,
            criteria: [
              "Mevcut uygulama sayı ve tarihle mi anlatıldı?",
              "Hem kazanç hem bedel değerlendirildi mi?",
              "Öneri açık mı ve neyin yapılmayacağı da söylendi mi?",
              "Rapor biçimi (başlık, bölüm) kullanıldı mı?",
              "Kayıt kurumsal mı? Duygusal dilden kaçınıldı mı?",
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
      instruction: "This part has three tasks: an interview, a long turn, and a task we do together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, tek başına konuşma ve birlikte yapılan bir görev.",
      tasks: [
        {
          id: "en-c1-05-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about work, selection and how organisations decide.",
          promptTr: "Sana iş, seçme süreçleri ve kurumların nasıl karar verdiği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe a decision you have seen an organisation make that was defensible but probably wrong?", tr: "Günaydın. Bir kurumun verdiği, savunulabilir ama muhtemelen yanlış olan bir kararı anlatır mısın?" },
            { who: "you", hint: "Somut bir örnek seç ve savunulabilirlik ile doğruluk arasındaki farkı adlandır.", expect: "somut bir örnek vermek ve iki ölçütü ayırmak", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think that gap between what is defensible and what is right can be closed, or is it a permanent feature?", tr: "Teşekkürler. Sence savunulabilir olanla doğru olan arasındaki bu aralık kapatılabilir mi, yoksa kalıcı bir özellik mi?" },
            { who: "you", hint: "Bir konum al ama karşı görüşe bir pay bırak.", expect: "bir konum almak ve karşı görüşe pay bırakmak", seconds: 50 },
            { who: "partner", de: "And how would you decide whether a new procedure had changed a decision or only changed the paperwork?", tr: "Yeni bir yordamın kararı mı yoksa yalnız evrakı mı değiştirdiğine nasıl karar verirdin?" },
            { who: "you", hint: "Bir ölçüt öner ve onu neden seçtiğini açıkla.", expect: "bir ölçüt önermek ve seçimini gerekçelendirmek", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "describe a concrete case and analyse it", tr: "Somut bir durumu betimlemek ve çözümlemek" },
              { de: "take a position while conceding something", tr: "Bir konum alırken bir şeyi kabul etmek" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önermek ve gerekçelendirmek" },
            ],
            sample:
              "The clearest one I have seen was an appointment made from a shortlist of four where the strongest applicant had the weakest interview, and every step was documented. Nobody did anything improper; the process simply measured composure. I would say the gap is permanent rather than closable, although it can be narrowed, and I have to concede that people who say it can be closed are usually describing a smaller organisation than mine. As for telling a real change from a paper one, I would look at whether the reasons recorded before the decision predict the decision, and I would look across at least a dozen cases, because one is a story.",
            criteria: [
              "Örnek somut mu ve çözümlendi mi?",
              "Konum alınırken karşı görüşe pay bırakıldı mı?",
              "Ölçüt önerildi ve gerekçelendirildi mi?",
              "Çekimserlik ifadeleri C1 düzeyinde mi? (I would say, although, rather than)",
            ],
          },
        },
        {
          id: "en-c1-05-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. An organisation can either adopt a more accurate selection method that its managers resent, or keep a less accurate one that they will run properly. Set out the case for each, say which you would choose, and identify the strongest argument against your own choice.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir kurum ya yöneticilerinin hoşlanmadığı daha isabetli bir seçme yöntemini benimseyecek ya da onların düzgün uygulayacağı daha az isabetli bir yöntemi sürdürecek. Her ikisinin de savunmasını kur, hangisini seçeceğini söyle ve kendi seçimine karşı en güçlü savı adlandır.",
          prepSeconds: 60,
          speakSeconds: 110,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "set out both cases fairly", tr: "İki savunmayı da adil biçimde kur" },
              { de: "state and justify a choice", tr: "Bir seçim yap ve gerekçelendir" },
              { de: "name the strongest argument against your own choice", tr: "Kendi seçimine karşı en güçlü savı adlandır" },
            ],
            sample:
              "The case for the accurate method is that the organisation has already said what it is trying to do, and resentment from the people running a process is exactly what you would expect when discretion is removed; treating it as decisive would make reform impossible by definition. The case for the workable method is less noble and, I think, stronger than it sounds: a method delivered at half strength is not the method that was evaluated, so the accuracy figure describes something nobody has run. I would take the workable one and improve it slowly. The strongest argument against my own choice is that it makes the resentment self-justifying: every group that dislikes a method can defeat it simply by promising to implement it badly, and an organisation that concedes that has handed the design of its own procedures to whoever objects loudest. I do not think that defeats the case, but anybody arguing as I have should say what they would do the second time.",
            criteria: [
              "İki savunma da adil biçimde kuruldu mu?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi seçimine karşı en güçlü sav adlandırıldı mı, yoksa zayıf bir hâli mi kuruldu?",
              "İki dakika boyunca yapı korunabildi mi?",
              "Soyut sözcük dağarcığı C1 düzeyinde mi? (discretion, self-justifying, by definition)",
            ],
          },
        },
        {
          id: "en-c1-05-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "An employer must choose how to spend a one-year budget on improving how it appoints people. Talk with me about the options, defend two of them, and settle a priority order with me.",
          promptTr:
            "Bir işveren, insanları nasıl işe aldığını iyileştirmek için bir yıllık bütçeyi nasıl harcayacağına karar verecek. Seçenekleri benimle konuş, ikisini savun ve benimle bir öncelik sırası belirle.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: paying for the marking time of work samples, training every panel chair, auditing last year's appointments against performance, anonymising applications, and reducing panels from five people to three. Which two would you defend, and on what criterion?", tr: "Seçenekler: iş örneği değerlendirmelerinin süresini ücretlendirmek, her kurul başkanını eğitmek, geçen yılın atamalarını başarıyla karşılaştırıp denetlemek, başvuruları anonimleştirmek ve kurulları beş kişiden üçe indirmek. Hangi ikisini savunursun, hangi ölçütle?" },
            { who: "you", hint: "İki seçenek seç ve ölçütünü açıkça adlandır.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you. An audit produces a report, and reports are where reforms go to die. Is that not exactly the wrong thing to buy with a single year?", tr: "Üsteleyeyim. Denetim bir rapor üretir ve reformlar raporlarda ölür. Tek bir yılla alınacak en yanlış şey tam da bu değil mi?" },
            { who: "you", hint: "İtirazın gücünü kabul et, sonra ya konumunu değiştir ya da neden değiştirmediğini açıkla.", expect: "güçlü bir itirazı kabul etmek ve konumunu revize etmek ya da savunmasını gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "Understood. Can we settle a priority order for the top three, and name what we would drop?", tr: "Anlaşıldı. İlk üç için bir öncelik sırası belirleyip neyi bırakacağımızı söyleyebilir miyiz?" },
            { who: "you", hint: "Sıralamayı ver, her adımı gerekçelendir ve bırakılanı açıkla.", expect: "gerekçeli bir öncelik sırası kurmak ve dışarıda bırakılanı açıklamak", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "select options and name the criterion", tr: "Seçenekleri seçmek ve ölçütü adlandırmak" },
              { de: "handle a strong objection", tr: "Güçlü bir itirazı karşılamak" },
              { de: "settle a justified priority order", tr: "Gerekçeli bir öncelik sırası kurmak" },
            ],
            sample:
              "I would defend paying for the marking time and reducing the panel size, on the criterion of what fails first: methods die from unfunded labour long before they die from bad design. Your objection to the audit is fair and I want to concede most of it; what I would defend is a very small audit aimed at one question, namely whether the recorded scores predicted anything, which is cheap and produces a number rather than a report. So: fund the marking first, because nothing else survives without it; cut the panels to three second, since it releases the same hours we have just spent; and run the narrow audit third, because it tells us in a year whether any of this was worth doing. I would drop the training this year and say plainly why, rather than fund a course and let the room undo it before lunch.",
            criteria: [
              "Ölçüt açıkça adlandırıldı mı?",
              "İtirazın gücü kabul edildi mi ve konum ya revize edildi ya da gerekçelendirildi mi?",
              "Öncelik sırası kuruldu ve her adım gerekçelendirildi mi?",
              "Dışarıda bırakılan açıkça söylendi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

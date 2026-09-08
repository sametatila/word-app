import type { MockPaper } from "../types";

/**
 * B2 · Deneme 10 — "Qualifications, Recognition and Starting Again".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Denklik B2 için verimli
 * çünkü kimse gecikmeyi savunmuyor ama herkes gecikmeyi üreten adımların
 * her birini savunuyor: kimsenin tasarlamadığı bir sonuç. Bu yapı edilgen
 * cümleye, üçüncü tip koşula ve adlaştırmaya doğal zemin veriyor.
 *
 * Beşinci görev bilerek iki kişinin karşılaştırması üstünde kuruluyor:
 * dokuzuncu denemede tek bir cümlenin çözümlemesi vardı, yedincide bir
 * itiraf, sekizincide habercilik. Dinlemedeki söyleşi de bu kez sistemi
 * yöneten kişiyle değil, sistemden geçmiş ve şimdi bazılarına geçmemesini
 * öğütleyen kişiyle.
 */
export const EN_B2_10: MockPaper = {
  id: "en-b2-10",
  course: "en",
  level: "B2",
  no: 10,
  theme: "Qualifications, Recognition and Starting Again",
  themeTr: "Diploma denkliği, tanınma ve baştan başlamak",
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
          id: "en-b2-10-l1",
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
              title: "Four years to be believed",
              body: `A doctor who arrives with fifteen years of experience may not treat anybody until a board has said so, and in this country the board {{1}} about four years to say it.

Nobody defends the delay. What everybody defends is each of the separate steps that {{2}} it, and that is a different position altogether. Nevertheless, the wait is the only part the applicant experiences.

The language test is defensible. The examination in local practice is defensible. The supervised year is defensible, and so is the queue for a supervisor, which exists because the supervisors are the same people who are short-staffed in the first {{3}}.

Add them together and you produce a wait that nobody chose and nobody can be blamed for. It is the ordinary way in which institutions {{4}} out results that none of their members would sign.

Meanwhile the doctor is driving a delivery van, and the skill she came with is quietly {{5}} away.

The proposals that get discussed are all about speed. Very few of them {{6}} the question of what is being tested and by whom.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-10-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["spends", "lasts", "takes", "passes"],
              answer: 2,
              explain:
                "Bir işin ne kadar sürdüğü `take` ile bildirilir: «the board takes about four years». `spend` özne olarak kişiyi ve nesne olarak zamanı ister, `last` ise nesne almaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["produce", "perform", "provide", "propose"],
              answer: 0,
              explain:
                "Adımlar gecikmeyi ortaya çıkarıyor: `produce it`. `perform` bir eylemi yerine getirmektir, `provide` sağlamak, `propose` ise önermek — hiçbiri sonucu doğurmayı anlatmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["case", "line", "instance", "place"],
              answer: 3,
              explain:
                "`in the first place` en baştan beri anlamında yerleşik bir öbektir. `in the first instance` ilk aşamada demektir ve buradaki nedensel geri dönüşü vermez.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["bring", "turn", "carry", "give"],
              answer: 1,
              explain:
                "`turn out` bir sonucu üretmeyi anlatır: «institutions turn out results». `bring out` yayımlamak ya da ortaya çıkarmak, `carry out` yürütmek, `give out` ise dağıtmaktır.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["wearing", "falling", "dying", "going"],
              answer: 2,
              explain:
                "Bir yetinin yavaşça yitmesi `die away` ile anlatılır. `wear away` aşınmayı, `fall away` düşmeyi, `go away` ise uzaklaşmayı bildirir ve beceri için kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["raise", "rise", "lift", "arise"],
              answer: 0,
              explain:
                "`raise a question` bir soruyu gündeme getirmek demektir ve geçişli bir fiil ister. `rise` ve `arise` geçişsizdir; `lift` ise fiziksel kaldırmayı bildirir.",
            },
          ],
        },
        {
          id: "en-b2-10-l2",
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
              title: "What recognition is for",
              body: `Recognition is often described as a barrier, and that description gives away the whole argument {{7}} it begins.

A barrier is something you put up. A standard is something you hold people {{8}}, and the two are not the same thing, however similar they look from the queue.

Nor {{9}} the public interest served by pretending otherwise. Nobody wants a surgeon who has not been checked.

{{10}} the checking is proportionate is a separate question, and it is the one that is almost never asked.

Studies find no relation {{11}} the length of a recognition process and the quality of the practitioners who emerge from it.

The delay, {{12}} the other hand, is measurable, and it is measured in years of work that a country has paid to train somebody else to do.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-10-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["before"],
              explain:
                "Cümle, betimlemenin tartışmayı daha başlamadan bitirdiğini söylüyor: `gives away the whole argument before it begins`. `after` zamanı tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["to"],
              explain:
                "`hold somebody to a standard` yerleşik kalıptır ve nesne öne çekildiği için edat sonda kalıyor: «something you hold people to».",
            },
            {
              kind: "gap",
              id: "en-b2-10-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "Olumsuz `Nor` ile başlayan cümle devrik kuruluş ister ve yapı edilgen: «Nor is the public interest served». Özne tekil olduğu için `is`.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["whether"],
              explain:
                "Cümlenin öznesi bir dolaylı soru ve yüklem `is a separate question`. Özne konumundaki dolaylı soruyu `whether` başlatır; `if` bu konumda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["between"],
              explain:
                "`a relation between A and B` yapısı iki öğeyi karşılaştırır ve cümlede süre ile nitelik karşılaştırılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["on"],
              explain:
                "`on the other hand` karşıtlık kuran yerleşik bağlayıcıdır ve bir önceki cümledeki ölçülemezliğe karşı ölçülebilir olanı getiriyor.",
            },
          ],
        },
        {
          id: "en-b2-10-l3",
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
              title: "Professional recognition",
              body: `Recognition is the process by which a qualification obtained in one country is accepted as {{13}} to a qualification obtained in another.

The {{14}} of the process is normally a professional body rather than a ministry, which places the decision in the hands of the people the newcomer will compete with.

Applicants report that the requirements are published but that their {{15}} varies between regions and even between assessors.

Critics argue that the arrangement is defended in the name of safety while operating as a restriction on {{16}} to the profession.

The {{17}} of a supervised year is defended on safety grounds, although the shortage of supervisors turns it into a queue rather than a course.

Reviews conclude that shortening the process has been discussed for decades without any {{18}} change in its length.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-10-l3-13",
              no: 13,
              text: "EQUAL",
              accept: ["equivalent"],
              explain:
                "`accepted as ___ to` yapısı `to` tümleci alan bir sıfat ister ve iki belgenin denkliği anlatılıyor. `equal to` da olurdu ama denklik için yerleşik biçim `equivalent to`dur.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l3-14",
              no: 14,
              text: "AUTHOR",
              accept: ["authority"],
              explain:
                "`The ___ of the process is normally a professional body` yapısında cümlenin öznesi bir kurum adı olmalı: süreci yürüten yetkili merci. `author` bir metnin yazarıdır.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l3-15",
              no: 15,
              text: "APPLY",
              accept: ["application"],
              explain:
                "İyelik sıfatından sonra bir ad geliyor ve cümle kuralların yazılı olduğunu ama UYGULANIŞININ değiştiğini söylüyor. `applicant` bir kişiyi adlandırır ve bölgeye göre değişmez.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l3-16",
              no: 16,
              text: "ENTER",
              accept: ["entry"],
              explain:
                "`a restriction on ___ to the profession` yapısında edatın nesnesi bir ad olmalı ve mesleğe GİRİŞ kastediliyor. `enter` fiildir, `entrance` ise bir kapıyı ya da giriş sınavını adlandırır.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l3-17",
              no: 17,
              text: "REQUIRE",
              accept: ["requirement"],
              explain:
                "`The ___ of a supervised year is defended` yapısında cümlenin öznesi tekil bir ad ve yüklem `is`. Fiil biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l3-18",
              no: 18,
              text: "MEASURE",
              accept: ["measurable"],
              explain:
                "`without any ___ change` yapısında addan önce onu niteleyen bir sıfat var: ölçülebilir bir değişiklik olmamış. Ad biçimi bu konumda `change` ile tamlama kuramaz.",
            },
          ],
        },
        {
          id: "en-b2-10-l4",
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
              id: "en-b2-10-l4-19",
              no: 19,
              text: "The board has not yet reached a decision on her file.\nNo decision on her file ______ by the board.",
              cue: "REACHED",
              accept: ["has yet been reached", "has been reached yet"],
              explain:
                "Etken cümle edilgene çevriliyor ve olumsuzluk özneye taşınıyor: `No decision … has yet been reached`. Anahtar sözcük üçüncü hâl olduğu için zincir `has been + reached` biçimini alır.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l4-20",
              no: 20,
              text: "She only understood the size of the delay after she had signed the contract.\nNot until she had signed the contract ______ the size of the delay.",
              cue: "DID",
              accept: ["did she understand"],
              explain:
                "`Not until` ile başlayan cümle devrik kuruluş ister: yardımcı fiil özneden önce gelir ve ardından yalın fiil kalır.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l4-21",
              no: 21,
              text: "Nobody expected the assessment to differ so much between regions.\nThe assessment turned out ______ anybody had expected.",
              cue: "VARIABLE",
              accept: ["to be more variable than"],
              explain:
                "`turn out` mastar tümleci alır ve `so much` yapısı `than` ile kurulan bir karşılaştırmaya çevriliyor. `variable` uzun bir sıfat olduğu için derece `more … than` ile kurulur.",
            },
            {
              kind: "gap",
              id: "en-b2-10-l4-22",
              no: 22,
              text: "It was a mistake to send the original documents by post.\nThe original documents ______ by post.",
              cue: "SENT",
              accept: ["should not have been sent"],
              explain:
                "Geçmişe dönük bir yanlış `should not have + üçüncü hâl` ile bildiriliyor ve cümle edilgen olduğu için araya `been` giriyor.",
            },
          ],
        },
        {
          id: "en-b2-10-l5",
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
              title: "Two nurses, one qualification",
              body: `Uma and Zsofia trained together, in the same city, in the same three-year course, and they finished eleven days apart. They then moved to two different countries. Nine years later one of them runs a ward and the other has left the profession.

I want to be careful with this comparison, because it is the kind that proves too much if you let it. They are different people and nine years is long enough for anything to happen. What can be compared is not their careers but the two processes they entered.

Uma's country recognised the qualification in eleven weeks, on the basis of a language test and a written examination in local law. She was working, at a reduced grade, within four months.

Zsofia's country required a supervised year. That is defensible in itself. What is not usually mentioned is that the supervisors are senior nurses on the same wards that are short-staffed, and the queue for a place was, in her region, twenty-two months long. She spent those months in a warehouse.

The difference in outcome is not a difference in checking. Both countries checked her. Given that, the gap between them is not a gap in safety. One of them checked her while she was working and the other checked her by making her wait, and only the second is described as protecting patients.

Nine years is also long enough for a skill to go. Zsofia did not fail the supervised year. She never took it, because by the time the place came up she had a mortgage and a job that did not require her to sit an examination in a second language. If she had been allowed to work, she would have stayed.`,
              gloss: [
                { de: "a ward", tr: "hastane servisi", en: "ward" },
                { de: "supervised", tr: "gözetim altında", en: "supervised" },
                { de: "a mortgage", tr: "konut kredisi", en: "mortgage" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-10-l5-23",
              no: 23,
              text: "Why is the writer careful about the comparison?",
              options: [
                "Because such a comparison can be made to prove too much",
                "Because the two women did not train together",
                "Because nine years is too short a period",
                "Because neither of them completed the course",
              ],
              answer: 0,
              explain:
                "Yazar sınırı kendisi koyuyor: «it is the kind that proves too much if you let it», çünkü iki ayrı insan ve dokuz yıl söz konusu.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l5-24",
              no: 24,
              text: "What does the writer say can be compared?",
              options: [
                "The two women's abilities",
                "The two countries' hospitals",
                "The results of their examinations",
                "The systems each of them went through",
              ],
              answer: 3,
              explain:
                "Yazı karşılaştırmanın konusunu belirliyor: «What can be compared is not their careers but the two processes they entered».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l5-25",
              no: 25,
              text: "Why was the queue for a supervisor so long?",
              options: [
                "Too few nurses applied for recognition",
                "The examination was held only once a year",
                "The supervisors were needed on the wards",
                "The region had no hospitals of the right size",
              ],
              answer: 2,
              explain:
                "Metin döngüyü açıklıyor: «the supervisors are senior nurses on the same wards that are short-staffed», ve sıra o bölgede yirmi iki ay.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l5-26",
              no: 26,
              text: "What is the writer's point about checking?",
              options: [
                "Only one of the countries checked her at all",
                "Both checked her, but in different ways",
                "Neither country's checks were adequate",
                "The checks were identical in content",
              ],
              answer: 1,
              explain:
                "Metin ayrımı açıkça kuruyor: «Both countries checked her. One of them checked her while she was working and the other checked her by making her wait».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-l5-27",
              no: 27,
              text: "Why did Zsofia never take the supervised year?",
              options: [
                "She had failed the language test twice",
                "Her qualification had expired by then",
                "The hospital withdrew the offer of a place",
                "By the time it came she had other commitments",
              ],
              answer: 3,
              explain:
                "Son paragraf sebebi veriyor: «by the time the place came up she had a mortgage and a job that did not require her to sit an examination in a second language». Başarısız olmuş değil.",
            },
          ],
        },
        {
          id: "en-b2-10-l6",
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
              title: "Nobody designed this",
              body: `The most useful thing to understand about a four-year recognition process is that nobody wanted it to take four years. {{28}}

Each stage was added for a reason that survives inspection. The language test came after a case in which instructions were misunderstood. The local examination came after a change in the law. The supervised year came after an inquiry. {{29}}

The queue is different, because it was not added by anybody. It appeared when the number of applicants rose and the number of supervisors did not, and it now accounts for more of the total delay than every deliberate stage combined. {{30}}

This is why the usual reform fails. A minister announces that the process will be shortened, the professional body reviews its stages, and each stage is found to be justified, which it is. {{31}}

The honest reform would be duller and harder: fund the supervisors, or accept that a stage which cannot be staffed is a stage that has been abolished in practice and should be abolished on paper.`,
              gloss: [
                { de: "an inquiry", tr: "soruşturma", en: "inquiry" },
                { de: "to abolish", tr: "kaldırmak", en: "abolish" },
                { de: "deliberate", tr: "bilerek yapılan", en: "deliberate" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Nobody reviews the queue, because a queue is not a stage and appears in no list of requirements." },
            { key: "b", label: "b", body: "It is the sum of a series of decisions, each of which was reasonable when it was taken." },
            { key: "c", label: "c", body: "Remove any one of them in isolation and you would be arguing against a specific harm that has already occurred." },
            { key: "d", label: "d", body: "That fact alone should tell you where a reform would have to begin, and it is not where reforms begin." },
            { key: "e", label: "e", body: "The first mutual recognition agreement in Europe covered architects and was signed in 1985." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-10-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "b",
              explain:
                "Açılış kimsenin dört yıl istemediğini söylüyor. (b) sonucun nasıl doğduğunu veriyor: «the sum of a series of decisions, each of which was reasonable when it was taken».",
            },
            {
              kind: "match",
              id: "en-b2-10-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "c",
              explain:
                "Paragraf her aşamanın kaynağını sayıyor: «The language test came after a case in which instructions were misunderstood» ve benzerleri. (c) bunun tartışmayı nasıl kilitlediğini ekliyor: «you would be arguing against a specific harm that has already occurred».",
            },
            {
              kind: "match",
              id: "en-b2-10-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "a",
              explain:
                "Paragraf kuyruğun kimse tarafından eklenmediğini ve gecikmenin çoğunu oluşturduğunu söylüyor. (a) bunun neden gözden kaçtığını veriyor: «a queue is not a stage and appears in no list of requirements».",
            },
            {
              kind: "match",
              id: "en-b2-10-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "d",
              explain:
                "Paragraf her aşamanın haklı bulunduğu inceleme döngüsünü anlatıyor. (d) çıkarımı yapıyor: reformun başlaması gereken yer, reformların başladığı yer değil. (e) 1985'te imzalanan mimarlık anlaşmasından söz ediyor ve metinde anlaşmaların tarihi hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-10-l7",
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
              label: "a — Board member",
              body: "I have sat on the panel for six years and I have voted to shorten the process twice. Both times the vote passed and nothing changed, because the delay is not in our decisions. It is in the wait for a supervisor, and we do not appoint supervisors and we are not funded to.",
            },
            {
              key: "b",
              label: "b — Requalified engineer",
              body: "It took three years and I would do it again, and I would not tell most people to. The two things that got me through were savings and a spouse with an income. Advice that assumes those two things is not advice; it is a description of who succeeds.",
            },
            {
              key: "c",
              label: "c — Employer",
              body: "We stopped waiting. We now hire people at a lower grade while their file is open, which is legal and which nobody in the sector talks about. It is not generosity. Our vacancies were unfilled for eleven months and the alternative was closing a shift.",
            },
            {
              key: "d",
              label: "d — Language teacher",
              body: "The test is set at a level nobody uses. My students can take a history in a ward and cannot pass a paper that asks them to write a formal letter of complaint. I have written to the board about it three times and received the same reply twice.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-10-l7-32",
              no: 32,
              text: "says that a decision was taken and had no effect",
              answer: "a",
              explain:
                "Metin oylamayı ve sonucunu birlikte veriyor: «Both times the vote passed and nothing changed, because the delay is not in our decisions».",
            },
            {
              kind: "match",
              id: "en-b2-10-l7-33",
              no: 33,
              text: "says that success depends on circumstances rarely mentioned",
              answer: "b",
              explain:
                "Metin iki koşulu adlandırıyor: «savings and a spouse with an income», ve bunları varsayan öğüdün «a description of who succeeds» olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-10-l7-34",
              no: 34,
              text: "describes a practice adopted out of necessity rather than principle",
              answer: "c",
              explain:
                "Metin gerekçeyi açıkça ayırıyor: «It is not generosity. Our vacancies were unfilled for eleven months and the alternative was closing a shift».",
            },
            {
              kind: "match",
              id: "en-b2-10-l7-35",
              no: 35,
              text: "says the test measures something other than the work",
              answer: "d",
              explain:
                "Metin karşıtlığı somutluyor: öğrenciler serviste anamnez alabiliyor ama «cannot pass a paper that asks them to write a formal letter of complaint».",
            },
            {
              kind: "match",
              id: "en-b2-10-l7-36",
              no: 36,
              text: "points to a shortage that their own body cannot fix",
              answer: "a",
              explain:
                "Metin yetki sınırını veriyor: «we do not appoint supervisors and we are not funded to».",
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
          id: "en-b2-10-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Board member",
              genreTr: "Kurul üyesi",
              situation: "Bir kurul üyesi gecikmenin nerede olduğunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "People write to us about the four years as though the four years happened in this room. Our part of it is eleven weeks. The rest is a queue for something we neither run nor pay for, and saying so sounds like an excuse even when it is a fact." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Applicant",
              genreTr: "Başvuru sahibi",
              situation: "Bir başvuru sahibi bekleme süresini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The letter said the wait would be around nine months. It was twenty-two. Nobody lied to me; the person who wrote nine months believed it, and by the time it was twenty-two she had left the department." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Employer",
              genreTr: "İşveren",
              situation: "Bir işveren işe alım uygulamasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "We hire them at a lower grade while the file is open. It is entirely legal and almost nobody in the sector says it out loud, because it sounds like taking advantage. The alternative was a shift with nobody on it." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir araştırmacı bulguyu anlatıyor.",
              plays: 2,
              segments: [
                { text: "We compared eleven countries. There is no relation at all between the length of the process and the number of complaints against the practitioners who come out of it. That is not an argument for abolishing checks. It is an argument against assuming that longer means safer." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Language teacher",
              genreTr: "Dil öğretmeni",
              situation: "Bir öğretmen sınavın düzeyinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "My students can take a history from a frightened patient at two in the morning. What they cannot do is write a formal letter of complaint about a delayed delivery, and that is what the paper asks for." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "İki görevli bir dosyayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Her file has been open since March." },
                { text: "Waiting for what?" },
                { text: "A supervisor. There are four in the region and two of them have stopped taking anybody, because they are covering nights." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı sık yapılan öneriyi ele alıyor.",
              plays: 2,
              segments: [
                { text: "The proposal is always to speed up the process, and I have stopped signing letters that say that. Speed is not the variable anybody controls. The variable is how many supervisors exist, and that is a budget line in a different department." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir dinleyici kendi kararını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I did finish it, three years later, and the strange part is what I feel about the people who did not. I used to think they gave up. Now I think they did the arithmetic earlier than I did, and most of them were right." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-10-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the speaker say about the four years?",
              options: ["The board could shorten it easily", "Most of it is the board's own work", "Most of it happens outside the board"],
              answer: 2,
              explain:
                "Konuşmacı payı veriyor: «Our part of it is eleven weeks. The rest is a queue for something we neither run nor pay for».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-2",
              no: 2,
              ref: "a2",
              text: "What does the applicant say about the estimate?",
              options: ["It was written to mislead her", "It was believed by its author", "It was corrected within a month"],
              answer: 1,
              explain:
                "Başvuru sahibi kötü niyeti eliyor: «Nobody lied to me; the person who wrote nine months believed it».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-3",
              no: 3,
              ref: "a3",
              text: "Why does the employer describe the practice as difficult to discuss?",
              options: ["It looks like exploiting the situation", "It is against the current law", "It has never been tried before"],
              answer: 0,
              explain:
                "İşveren sessizliğin nedenini veriyor: «almost nobody in the sector says it out loud, because it sounds like taking advantage», oysa uygulama yasal.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the researcher conclude?",
              options: ["Checks should be removed altogether", "Shorter processes produce far more complaints", "Length does not predict safety"],
              answer: 2,
              explain:
                "Araştırmacı savını sınırlıyor: «That is not an argument for abolishing checks. It is an argument against assuming that longer means safer».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-5",
              no: 5,
              ref: "a5",
              text: "What is the teacher's objection to the test?",
              options: ["It asks for the wrong language", "It is marked far too strictly", "It is offered only twice a year"],
              answer: 0,
              explain:
                "Öğretmen iki beceriyi karşılaştırıyor: hasta anamnezi alınabiliyor ama «write a formal letter of complaint about a delayed delivery» isteniyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-6",
              no: 6,
              ref: "a6",
              text: "Why is the file still open?",
              options: ["A document is missing", "No supervisor is available", "The examination has been postponed"],
              answer: 1,
              explain:
                "Görevli sebebi veriyor: «A supervisor. There are four in the region and two of them have stopped taking anybody».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-7",
              no: 7,
              ref: "a7",
              text: "Why has the speaker stopped signing such letters?",
              options: ["The letters are never answered", "Nobody in the sector reads them", "The real constraint is elsewhere"],
              answer: 2,
              explain:
                "Konuşmacı asıl değişkeni adlandırıyor: «The variable is how many supervisors exist, and that is a budget line in a different department».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h1-8",
              no: 8,
              ref: "a8",
              text: "How has the speaker's view of those who stopped changed?",
              options: ["He now thinks they judged it correctly", "He now thinks they were very badly advised", "He now thinks they will return later"],
              answer: 0,
              explain:
                "Konuşmacı eski ve yeni yargısını karşılaştırıyor: «I used to think they gave up. Now I think they did the arithmetic earlier than I did, and most of them were right».",
            },
          ],
        },
        {
          id: "en-b2-10-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting the results of a five-year review. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Beş yıllık bir incelemenin sonuçlarını anlatan bir adamı dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir sorumlu beş yıllık denklik incelemesini sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the five-year figures, and I will give you the uncomfortable ones as well. We followed four thousand applications. Of those, fifty-two per cent were completed, and the median time to completion was thirty-one months. The board's own assessment accounted for eleven weeks of that; the rest was waiting. Twenty-eight per cent of applicants withdrew, and when we asked why, the most common reason given was money rather than the examinations. Applicants with a second income in the household were twice as likely to finish. And the finding nobody expected: the region with the shortest waiting time was also the region with the fewest supervisors, because it had stopped requiring the supervised year in 2019.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Recognition review — findings",
              body: `The review followed {{9}} applications.

{{10}} per cent of them were completed.

The median time to completion was {{11}} months.

The board's own assessment accounted for {{12}} weeks.

{{13}} per cent of applicants withdrew.

The most common reason given for withdrawing was {{14}}.

Applicants with a second household income were {{15}} as likely to finish.

The region with the shortest wait had stopped requiring the supervised year in {{16}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-10-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["4000", "four thousand"],
              explain:
                "Kayıt örneklem büyüklüğünü veriyor: «We followed four thousand applications».",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["52", "fifty-two"],
              explain:
                "«fifty-two per cent were completed» — tamamlanan başvuruların payı. Yirmi sekiz ise vazgeçenlerin payı.",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["31", "thirty-one"],
              explain:
                "«the median time to completion was thirty-one months» — ortanca süre. On bir hafta ise kurulun kendi payı.",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["11", "eleven"],
              explain:
                "«The board's own assessment accounted for eleven weeks of that; the rest was waiting» — kurulun süredeki payı hafta cinsinden.",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["28", "twenty-eight"],
              explain:
                "«Twenty-eight per cent of applicants withdrew» — süreçten çekilenlerin oranı.",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["money"],
              explain:
                "Kayıt gerekçeyi karşıtıyla veriyor: «the most common reason given was money rather than the examinations».",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["twice"],
              explain:
                "«Applicants with a second income in the household were twice as likely to finish» — bitirme olasılığındaki kat farkı.",
            },
            {
              kind: "gap",
              id: "en-b2-10-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["2019"],
              explain:
                "Beklenmeyen bulgu burada: en kısa bekleme süresine sahip bölge gözetimli yılı «in 2019» kaldırmış.",
            },
          ],
        },
        {
          id: "en-b2-10-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about the recognition of qualifications, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Diploma denkliği üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The delay comes from a shortage nobody planned." },
            { key: "b", label: "Each separate step can be justified on its own." },
            { key: "c", label: "The speaker has changed what they advise people to do." },
            { key: "d", label: "Whoever has savings is the one who finishes." },
            { key: "e", label: "The test measures the wrong kind of language." },
            { key: "f", label: "Employers have found a way around the wait." },
            { key: "g", label: "The process should be abolished altogether." },
            { key: "h", label: "Nothing has changed in twenty years." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı aşamaların savunulabilirliğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "Take any stage on its own and I will defend it to you for ten minutes. The language test came from a real case. The local examination came from a change in the law. Put them end to end and you get something nobody would have proposed." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı bekleme süresinin kaynağını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Two thirds of the wait is not a requirement at all. It is the gap between the number of people applying and the number of senior staff able to supervise them, and that gap was not decided by anybody." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kimin bitirdiğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I can predict who will complete, and it is not the strongest candidates. It is the ones with eighteen months of money behind them. Everything else is noise, and the guidance we publish is written as if that were not true." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı sınavın içeriğini ele alıyor.",
              plays: 2,
              segments: [
                { text: "The paper asks for a letter of complaint and a summary of a newspaper article. I have never once needed either on a ward. What I need is to understand a frightened person at two in the morning, and that is not on the paper." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı işverenlerin uygulamasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Three hospitals in my district now take people on at a lower grade while the file is open. It is legal, it is quiet, and it means the shortage is being solved by the employers rather than by the process that created it." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı verdiği öğüdün değiştiğini söylüyor.",
              plays: 2,
              segments: [
                { text: "For years I told everybody to start the process, because I had finished it and I thought it was a matter of persistence. Now I ask two questions about money first, and about half the time I tell people to think again." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-10-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "b",
              explain:
                "Konuşmacı her aşamayı tek tek savunuyor ve toplamı reddediyor: «Put them end to end and you get something nobody would have proposed».",
            },
            {
              kind: "match",
              id: "en-b2-10-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı beklemenin kaynağını adlandırıyor: başvuran sayısı ile gözetmen sayısı arasındaki açık, «and that gap was not decided by anybody».",
            },
            {
              kind: "match",
              id: "en-b2-10-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "d",
              explain:
                "Konuşmacı belirleyiciyi veriyor: «It is the ones with eighteen months of money behind them», en güçlü adaylar değil.",
            },
            {
              kind: "match",
              id: "en-b2-10-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "e",
              explain:
                "Konuşmacı sınav içeriğini işle karşılaştırıyor: şikâyet mektubu ve gazete özeti isteniyor, oysa gereken «to understand a frightened person at two in the morning».",
            },
            {
              kind: "match",
              id: "en-b2-10-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "f",
              explain:
                "Konuşmacı uygulamayı ve anlamını veriyor: dosya açıkken düşük kademeden işe alım, «the shortage is being solved by the employers rather than by the process that created it».",
            },
            {
              kind: "match",
              id: "en-b2-10-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "c",
              explain:
                "Konuşmacı öğüdünün değiştiğini söylüyor: «Now I ask two questions about money first, and about half the time I tell people to think again».",
            },
          ],
        },
        {
          id: "en-b2-10-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who requalified as a doctor and now advises other applicants. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Doktorluk denkliğini almış ve şimdi başka başvuru sahiplerine danışmanlık yapan bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, denklik sürecini tamamlamış olan Juno ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You finished the process. How long did it take?" },
                { text: "Three years and two months, and I want to say the second number as well: four years of income. The year before I started, I was earning nothing at all while I studied." },
                { text: "And now you advise people who are beginning." },
                { text: "I do, and the advice has changed. For the first two years I told everybody the same thing, which was that it is possible. That is true and it is almost useless." },
                { text: "Why useless?" },
                { text: "Because everybody already believes it is possible. What they need is a number. So now I ask how many months they can live without a professional salary, and if the answer is under eighteen I tell them what that usually means." },
                { text: "That sounds discouraging." },
                { text: "It is, and I would rather discourage somebody in March than watch them withdraw in the second year, having spent their savings and their confidence. About half the people I see are in that position." },
                { text: "Do you ever tell people not to start?" },
                { text: "I tell them not to start now. That is a different sentence and I am careful to say it that way. Some of them come back in two years with a different financial situation and finish without any trouble." },
                { text: "What would you change about the system?" },
                { text: "One thing. Let people work at a reduced grade while the file is open. Some employers already do it quietly and it is legal, and it would remove the reason most people give up." },
                { text: "Would that not lower standards?" },
                { text: "It would move the check rather than remove it. You are supervised on the ward instead of waiting for a place on a ward. The standard is the same; what changes is whether you can eat while you meet it." },
                { text: "Has anybody in authority listened?" },
                { text: "I have had three polite meetings. Everybody agrees, and nobody in the room controls the budget for supervisors, which is the honest answer to your question." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-10-h4-23",
              no: 23,
              ref: "d1",
              text: "What second figure does Juno insist on giving?",
              options: ["The number of examinations", "The years of income lost", "The cost of the language test"],
              answer: 1,
              explain:
                "Juno süreyi verirken ikinci sayıyı ekliyor: «four years of income», çünkü başlamadan önceki yıl da kazançsız geçmiş.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-24",
              no: 24,
              ref: "d1",
              text: "Why does she call her earlier advice useless?",
              options: ["Everybody already believes it", "It was factually incorrect", "Nobody asked her for it"],
              answer: 0,
              explain:
                "Juno savını iki adımda veriyor: «That is true and it is almost useless … everybody already believes it is possible».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-25",
              no: 25,
              ref: "d1",
              text: "What does she ask applicants now?",
              options: ["Which examinations they have passed", "How well they know the local law", "The number of months their savings cover"],
              answer: 2,
              explain:
                "Juno sorusunu sayıyla veriyor: «how many months they can live without a professional salary, and if the answer is under eighteen …».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-26",
              no: 26,
              ref: "d1",
              text: "Why does she accept being discouraging?",
              options: ["Because most applicants are not good enough", "Because withdrawing later costs more", "Because the board asked her to"],
              answer: 1,
              explain:
                "Juno iki zamanı karşılaştırıyor: martta caydırmayı, ikinci yılda «having spent their savings and their confidence» ayrılmaya yeğliyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-27",
              no: 27,
              ref: "d1",
              text: "What does she say she tells people?",
              options: ["Never to attempt the process", "To choose a different profession", "Not to start at this moment"],
              answer: 2,
              explain:
                "Juno cümlesinin farkını vurguluyor: «I tell them not to start now. That is a different sentence and I am careful to say it that way».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-28",
              no: 28,
              ref: "d1",
              text: "What single change would she make?",
              options: ["Letting applicants earn while they wait", "Shortening the language examination considerably", "Increasing the number of examinations required"],
              answer: 0,
              explain:
                "Juno tek değişikliği adlandırıyor: «Let people work at a reduced grade while the file is open», bazı işverenler bunu sessizce zaten yapıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-29",
              no: 29,
              ref: "d1",
              text: "How does she answer the objection about standards?",
              options: ["She accepts that standards would fall", "She says the check would move, not disappear", "She says standards are already too high"],
              answer: 1,
              explain:
                "Juno ayrımı kuruyor: «It would move the check rather than remove it … The standard is the same; what changes is whether you can eat while you meet it».",
            },
            {
              kind: "mcq",
              id: "en-b2-10-h4-30",
              no: 30,
              ref: "d1",
              text: "What does she say about her meetings with officials?",
              options: ["They disagreed with her proposal", "They refused to meet her again", "Nobody present controlled the budget"],
              answer: 2,
              explain:
                "Juno sonucu veriyor: «Everybody agrees, and nobody in the room controls the budget for supervisors».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 70,
      instruction: "This part has two tasks: an essay and a proposal.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir öneri metni.",
      tasks: [
        {
          id: "en-b2-10-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed the recognition of foreign qualifications. Now write an essay for your teacher, answering this question: \"Should people be allowed to work in their profession while their qualification is being assessed?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what the assessment is protecting — what happens to people during the wait",
          promptTr:
            "İngilizce dersinde yabancı diplomaların denkliğini tartıştınız. Öğretmenin için bir deneme yaz: \"İnsanların, diplomaları değerlendirilirken kendi mesleklerinde çalışmasına izin verilmeli mi?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: değerlendirme neyi koruyor — bekleme sırasında insanlara ne oluyor",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what the assessment is protecting.", tr: "Değerlendirmenin neyi koruduğunu tartış." },
              { de: "Discuss what happens to people during the wait.", tr: "Bekleme sırasında insanlara ne olduğunu tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Nobody seriously argues that a surgeon should be allowed to operate without being checked. The disagreement is about what the waiting achieves, which is a different question from what the checking achieves.

The case for the assessment is strong and it is worth stating properly. A qualification obtained under an unfamiliar system tells an employer very little on its own, and the public has no way of judging it. Somebody has to look.

What is harder to defend is the period in between. During it a trained person is not merely unemployed but deskilled, and the evidence suggests that most of those who withdraw do so for financial reasons rather than academic ones. The country loses the training twice: once in the country that paid for it and again here.

My own view is that the two functions have been confused. Supervision is a form of checking, and it can be carried out on a ward as easily as it can be waited for.

People should be allowed to work at a reduced grade while their file is open, provided the supervision is real and recorded.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Denetimin gerekliliği ciddiye alındı mı?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (whereas, provided that, in between)",
              "140–190 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-b2-10-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know supports people who are waiting for their qualifications to be recognised. Write a proposal for its committee. Describe the problem, set out what you propose and what you deliberately do not propose, and say what evidence would show that it had failed. Write 140 to 190 words.",
          promptTr:
            "Tanıdığın bir kuruluş, diploma denkliğini bekleyen insanlara destek veriyor. Yönetim kuruluna bir öneri metni yaz. Sorunu anlat, neyi önerdiğini ve bilerek neyi önermediğini ortaya koy ve hangi kanıtın başarısızlığı göstereceğini söyle. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Describe the problem precisely.", tr: "Sorunu kesin biçimde anlat." },
              { de: "Set out what you propose and what you deliberately do not propose.", tr: "Neyi önerdiğini ve bilerek neyi önermediğini ortaya koy." },
              { de: "State what evidence would show that it had failed.", tr: "Hangi kanıtın başarısızlığı göstereceğini söyle." },
            ],
            sample: `Proposal: a bridging fund for applicants in the supervised year

The problem
Of the ninety applicants we supported last year, thirty-one withdrew. In the exit interviews, twenty-six of the thirty-one gave money as the reason. The median wait for a supervised place in this region is now twenty-two months, and almost nobody can plan for that.

What I propose
A small monthly payment of three hundred euros for up to twelve months, available only to applicants who have already passed the written stages and are waiting for a placement. Repayable from the first professional salary, without interest.

What I do not propose
I do not propose a general hardship fund. We tried one in 2021 and it was spent within four months on applications at every stage, which helped nobody past the point where people actually leave.

How we would know it had failed
Two things. If withdrawal rates among recipients do not fall below twenty per cent within two years, the payment is too small. And if the average wait rises while we are paying, we are subsidising a delay rather than shortening it.`,
            criteria: [
              "Sorun somut sayılarla anlatıldı mı?",
              "Önerilen ve bilerek önerilmeyen ayrı ayrı verildi mi?",
              "Başarısızlık ölçütü gerçekten sınanabilir mi?",
              "Öneri metni kaydı ve başlıklandırma uygun mu?",
              "140–190 kelime aralığında mı?",
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
          id: "en-b2-10-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about qualifications, starting again and what counts as proof of skill.",
          promptTr: "Sana diplomalar, baştan başlamak ve becerinin nasıl kanıtlandığı hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. How do people prove what they can do in the field you know best?", tr: "İyi günler. En iyi bildiğin alanda insanlar ne yapabildiklerini nasıl kanıtlıyor?" },
            { who: "you", hint: "Somut bir örnek ver ve genel bir gözleme bağla.", expect: "somut bir örnekten genel bir gözleme geçmek", seconds: 45 },
            { who: "partner", de: "Thank you. Do you know anybody who had to start their career again?", tr: "Teşekkürler. Kariyerine baştan başlamak zorunda kalan birini tanıyor musun?" },
            { who: "you", hint: "Tek bir durumu sonucuyla anlat.", expect: "tek bir durumu sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if you had to prove your own skills in another country, what would be hardest?", tr: "Kendi becerilerini başka bir ülkede kanıtlaman gerekse en zoru ne olurdu?" },
            { who: "you", hint: "Koşul kipiyle cevapla ve gerekçelendir.", expect: "ikinci tip koşulla varsayımsal bir durum kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "move from an example to a general observation", tr: "Örnekten genel bir gözleme geçmek" },
              { de: "describe one case with its outcome", tr: "Tek bir durumu sonucuyla anlatmak" },
              { de: "use a second conditional", tr: "İkinci tip koşulu kullanmak" },
            ],
            sample:
              "In teaching, what you can do is demonstrated in a room with thirty people in it, and almost none of that appears on a certificate. My aunt was an accountant for twenty years and moved, and her qualification was recognised on paper but not by any employer, so she spent three years doing the same work at a junior grade. If I had to prove my skills abroad, the hardest part would not be an examination; it would be the year in which nobody would let me do the work that would produce the evidence.",
            criteria: [
              "İlk cevap örnekten gözleme geçebildi mi?",
              "Durum somut mu ve sonucu verildi mi?",
              "Son cevapta ikinci tip koşul kuruldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-b2-10-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of checking a foreign qualification, say which is better and explain one problem with your choice: a supervised year before the person may work, or supervision on the job at a reduced grade.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Yabancı bir diplomayı denetlemenin şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: kişi çalışmadan önce gözetimli bir yıl mı, yoksa düşük kademede işbaşında gözetim mi?",
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
              "The supervised year before employment has one clear advantage: nothing can go wrong with a patient while the assessment is still open, and that is not a small thing. Its cost is invisible and enormous. The person spends the year earning nothing, the skill decays, and the evidence suggests that most of those who leave the process leave for money rather than for failure. Supervision on the job reaches the same standard by a different route, and it reaches it while the person is still a practitioner. I would choose that. The problem with my own choice is who does the supervising. On a short-staffed ward the supervisor is the person with least time, and a check that is recorded but never performed is worse than a queue, because it looks like an answer.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Karşı tarafın gücü kabul edildi mi?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika akıcı konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-b2-10-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A regional authority has money for one measure to help people waiting for recognition. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir bölge yönetiminin denklik bekleyenlere yardım için tek bir önleme parası var. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: paying for more supervisors, a monthly payment to applicants, free preparation courses for the examinations, and an advice service that explains the process. Which of these would reduce the number of people who give up?", tr: "Fikirler: daha çok gözetmenin ücretini karşılamak, başvuru sahiplerine aylık ödeme, sınavlar için ücretsiz hazırlık kursları ve süreci anlatan bir danışma hizmeti. Bunlardan hangisi vazgeçenlerin sayısını azaltır?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden vazgeçmeyi azaltacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the preparation courses. People are not failing the examinations; they are running out of money before they sit them. Is that not the weakest of the four?", tr: "Hazırlık kurslarını sorgularım. İnsanlar sınavlarda kalmıyor; sınava girmeden önce paraları bitiyor. Dördü içinde en zayıfı bu değil mi?" },
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
              "Paying for supervisors is the only measure that shortens the wait itself; everything else helps people survive it. You are right that the courses do not address the point at which people leave, and I accept that as stated; what I would keep is a narrow version for the one examination with a high failure rate, if such a paper exists. The advice service is cheap and it changes nothing, because the problem is not that people misunderstand the process. So I would recommend the supervisors and the monthly payment, and reject the advice service.",
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

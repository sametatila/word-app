import type { MockPaper } from "../types";

/**
 * C1 · Deneme 9 — "Apology, Record and the Official Account".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Kurumsal özür C1 için
 * verimli çünkü tartışılan şey olayın kendisi değil, olayın tarifinin
 * kimin tarafından ve ne zaman sabitleneceği. Bu, adlaştırmaya, devrik
 * olumsuzlamaya ve çekimserlik belirtecine doğal zemin veriyor.
 *
 * Yedinci ve sekizinci denemede yazar dizisi belli hamleler taşıyordu
 * (çözümü yerinden eden, kaybı ikiye bölen, sınama öneren, sorunu yeni
 * saymayan). Buradaki dört hamle o listelerin hiçbirini tekrar etmiyor:
 * yanlış ölçüte göre yargılanan araç, kimsenin aramadığı üçüncü tarafta
 * çıkan etki, ilkeyle zamanlamanın karıştırılması ve talebin sanılandan
 * başka yerden gelmesi.
 */
export const EN_C1_09: MockPaper = {
  id: "en-c1-09",
  course: "en",
  level: "C1",
  no: 9,
  theme: "Apology, Record and the Official Account",
  themeTr: "Özür, kayıt ve resmî anlatı",
  minutes: 215,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 80,
      instruction:
        "This part has eight tasks. You complete texts, transform sentences, read an article and match texts, writers and paragraphs.",
      instructionTr:
        "Bu bölümde sekiz görev var. Metinleri tamamlayacak, cümleleri dönüştürecek, bir yazı okuyacak ve metin, yazar ve paragraf eşleyeceksin.",
      tasks: [
        {
          id: "en-c1-09-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en iyi uyan cevabı seç. a, b, c ya da d.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Essay",
              genreTr: "Deneme",
              title: "What an apology does",
              body: `A public apology is an odd instrument, and the oddness is worth {{1}} at rather than explaining away. It is issued by people who did not do the thing, to people who were not there, about events that are frequently beyond living memory.

The standard criticism {{2}} on that oddness: the words are cheap, nobody present is guilty, and the money has not moved. Every part of this is true and none of it settles the question.

What an apology actually {{3}} down is a description. Before it, what happened is contested; afterwards it is the official account, and every subsequent argument has to begin from there.

That is not a small thing, although it is routinely {{4}} for one. A government that has apologised cannot later argue that the matter was exaggerated, and the lawyers on both sides know it.

The timing is where the criticism {{5}} its force. Apologies are almost always issued at the point when the last person who could give evidence has died, and the pattern is too consistent to be an accident.

Whether the instrument could be used earlier is a question that has never been {{6}} to a serious test, because nobody with the power to issue one has any incentive to ask it.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-09-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["staring", "looking", "watching", "glancing"],
              answer: 1,
              explain:
                "`worth looking at` yerleşik yapıdır ve `at` edatı cümlede zaten duruyor. `stare at` dik dik bakmayı, `glance at` göz atmayı bildirir; `watch` ise edatsız gelir.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["stands", "lies", "sits", "rests"],
              answer: 3,
              explain:
                "`rest on something` bir savın bir dayanağa yaslanmasını anlatır. `lie in` bir şeyin özünü, `stand on` fiziksel duruşu bildirir; `sit on` ise bu bağlamda kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["pins", "puts", "sets", "holds"],
              answer: 0,
              explain:
                "`pin something down` bir şeyi kesin biçimde sabitlemeyi anlatır ve cümle tarifin sabitlenmesinden söz ediyor. `put down` yazmak ya da bastırmak, `set down` kayda geçirmek, `hold down` ise tutmaktır.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["exchanged", "passed", "mistaken", "held"],
              answer: 2,
              explain:
                "`be mistaken for something` bir şeyin başka bir şey sanılmasını anlatır ve cümle önemsiz sanılmayı bildiriyor. `pass for` etken kuruluş ister, `exchange for` ise takas bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["loses", "recovers", "spends", "keeps"],
              answer: 1,
              explain:
                "Bir önceki paragrafta eleştiri çürütülmüştü; bu cümle onun yeniden güç kazandığı noktayı gösteriyor. `recover its force` bu geri dönüşü verir; `lose` tam tersini söyler.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["taken", "brought", "set", "put"],
              answer: 3,
              explain:
                "`put something to the test` bir şeyi sınamaya tabi tutmayı anlatan yerleşik öbektir. `bring to` getirmeyi, `set to` başlamayı bildirir ve bu kalıbı kurmaz.",
            },
          ],
        },
        {
          id: "en-c1-09-l2",
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
              title: "The words and the money",
              body: `An apology is not a payment, and yet the two are constantly confused {{7}} both sides of every such argument.

The confusion is useful to a government, which can offer the cheaper of the two and {{8}} credit for having addressed the matter.

It is also useful to some campaigners, {{9}} whom the words are a step towards the money rather than an end in themselves.

The expectation of a settlement changes how the words are read. Nor {{10}} it obvious that the two should travel together. There are cases in which the money arrived and the description was never corrected at all.

{{11}} the apology precedes the settlement or follows it turns out to matter a great deal in practice.

As it is, the sequence is decided by lawyers, {{12}} duty is to the institution and to nobody else in the room.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-09-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["by"],
              explain:
                "Edilgen cümlede eylemi yapan `by` ile bildirilir: «are confused by both sides». `between` iki şeyin arasını gösterir ve burada karıştıranı değil karıştırılanı verir.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["take"],
              explain:
                "`take credit for something` bir işin övgüsünü üstlenmeyi anlatan yerleşik öbektir ve `can offer … and` bağlacından sonra yalın fiil gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["for"],
              explain:
                "`for whom` yapısı bir kişi öbeğine ilgi cümlesi bağlıyor ve anlam «onlar için» olduğu için edat `for`dur. `to whom` yönelme bildirir ve burada tümlecin anlamını bozar.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["is"],
              explain:
                "Olumsuz `Nor` ile başlayan cümle devrik kuruluş ister: yardımcı fiil özneden önce gelir. Boş özne `it` tekil olduğu için `is`.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["whether"],
              explain:
                "Cümlenin öznesi `precedes … or follows` biçiminde iki seçenekli bir dolaylı soru ve yüklem `turns out`. Özne konumundaki bu yapıyı `whether` başlatır.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["whose"],
              explain:
                "Virgülden sonra `lawyers` adına iyelik ilişkisiyle bağlanan bir ilgi adılı gerekiyor: `lawyers, whose duty is …`. `who` özne, `which` ise cansız öncül ister.",
            },
          ],
        },
        {
          id: "en-c1-09-l3",
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
              title: "The public apology",
              body: `An apology is distinguished from an expression of regret by its {{13}} of responsibility rather than by its tone.

Legal advisers resist the wording because an admission may create {{14}} in proceedings that have not yet begun.

Governments are also cautious because a single statement establishes a {{15}} that other groups will cite.

The statement is made by {{16}} who were not born when the events occurred, which critics treat as a defect and defenders as the point.

Assessments of such statements almost always turn on {{17}}, which is the one property that cannot be established from a text.

Reviews conclude that an apology unaccompanied by {{18}} is received very differently by those who were harmed.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-09-l3-13",
              no: 13,
              text: "ACKNOWLEDGE",
              accept: ["acknowledgement", "acknowledgment"],
              explain:
                "`by its ___ of responsibility` yapısında iyelikten sonra bir ad geliyor ve `of` tümleci o adın kendi edatıdır. Fiil biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l3-14",
              no: 14,
              text: "LIABLE",
              accept: ["liability"],
              explain:
                "`may create ___` yapısında fiilin nesnesi bir ad olmalı ve hukuki sorumluluk kastediliyor. `liable` sıfattır ve `create` fiilinin nesnesi olamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l3-15",
              no: 15,
              text: "PRECEDE",
              accept: ["precedent"],
              explain:
                "`establishes a ___ that other groups will cite` yapısında belirsiz tanımlıktan sonra bir ad geliyor ve daha sonra örnek gösterilecek bir emsal anlatılıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l3-16",
              no: 16,
              text: "REPRESENT",
              accept: ["representatives"],
              explain:
                "`made by ___ who were not born` yapısında edatın nesnesi kişi adı olmalı ve ilgi cümlesinin yüklemi çoğul (`were`), dolayısıyla ad da çoğul.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l3-17",
              no: 17,
              text: "SINCERE",
              accept: ["sincerity"],
              explain:
                "`turn on ___` yapısında edatın nesnesi bir ad olmalı ve devamı onu «the one property that cannot be established from a text» diye tanımlıyor: içtenlik.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l3-18",
              no: 18,
              text: "COMPENSATE",
              accept: ["compensation"],
              explain:
                "`unaccompanied by ___` yapısında edatın nesnesi bir ad olmalı ve metnin başından beri sözü edilen ikinci öğe tazminattır.",
            },
          ],
        },
        {
          id: "en-c1-09-l4",
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
              id: "en-c1-09-l4-19",
              no: 19,
              text: "People say that the statement was rewritten eleven times.\nThe statement ______ rewritten eleven times.",
              cue: "BEEN",
              accept: ["is said to have been"],
              explain:
                "`People say that …` yapısı edilgen bildirim kalıbına çevriliyor: `is said to + mastar`. Yeniden yazma geçmişte ve edilgen olduğu için zincir `to have been` biçimini alır.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l4-20",
              no: 20,
              text: "It was only after the last witness had died that the apology was issued.\nNot until the last witness had died ______ issued.",
              cue: "WAS",
              accept: ["was the apology"],
              explain:
                "`Not until …` öbeği cümle başına alındığında devrik kuruluş zorunludur: yardımcı fiil özneden önce gelir ve üçüncü hâl sonda kalır.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l4-21",
              no: 21,
              text: "Although the apology was welcome, no money followed it.\nWelcome ______ , no money followed it.",
              cue: "THOUGH",
              accept: ["though the apology was"],
              explain:
                "Sıfat öne alınmış bir ödün yapısı kuruluyor: `Adjective + though + özne + fiil`. `although` bu devrik biçimde kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-09-l4-22",
              no: 22,
              text: "An independent panel produced the wording.\nThe wording ______ an independent panel.",
              cue: "DRAWN",
              accept: ["was drawn up by"],
              explain:
                "`draw something up` bir metni hazırlamayı anlatır ve cümle edilgene çevriliyor; eylemi yapan `by` ile bağlanır.",
            },
          ],
        },
        {
          id: "en-c1-09-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 26. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–26. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Opinion piece",
              genreTr: "Görüş yazısı",
              title: "The forty-year rule",
              body: `There is a pattern in state apologies that nobody plans and everybody notices. They arrive at the point at which the last person who could give evidence has died.

I have gone through thirty-one of them. The median interval between the events and the statement is forty-two years, and the distribution is not what you would expect if the delay were caused by the difficulty of establishing facts. In eleven cases the facts had been established in public, by an inquiry, more than a decade before the words were issued.

The usual explanation is legal. An admission creates a liability, and a government that apologises while claimants are alive may find itself in court. That explanation is correct and it explains rather less than it appears to, because in nine of the thirty-one the claims were already out of time when the apology came.

What the pattern fits better is something duller. An apology has a cost that is neither legal nor financial: it obliges the person issuing it to say, in public, that an institution they lead did something indefensible. That cost falls entirely on the living, and it is at its lowest when nobody in the room was there.

I am not making an accusation. Every individual decision in my thirty-one cases was defensible, and several were brave. The pattern is what happens when a defensible decision is taken thirty-one times by people whose interests all point the same way.

The uncomfortable implication is that the instrument works best where it is worth least. An apology to somebody who is alive to hear it costs the institution something, which is arguably why it is not offered.`,
              gloss: [
                { de: "a claimant", tr: "hak talep eden kişi", en: "claimant" },
                { de: "an inquiry", tr: "soruşturma", en: "inquiry" },
                { de: "indefensible", tr: "savunulamaz", en: "indefensible" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-09-l5-23",
              no: 23,
              text: "What does the writer say about the length of the delay?",
              options: [
                "It is caused by the difficulty of establishing facts",
                "It has been growing shorter in recent decades",
                "Its pattern does not fit the usual explanation",
                "It is required by law in most of the cases",
              ],
              answer: 2,
              explain:
                "Yazar dağılımı ölçütle karşılaştırıyor: «the distribution is not what you would expect if the delay were caused by the difficulty of establishing facts», ve on bir olayda olguların çoktan saptandığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l5-24",
              no: 24,
              text: "Why does he say the legal explanation is not sufficient?",
              options: [
                "Many of the claims could no longer be brought",
                "Governments rarely take legal advice at all",
                "The courts have never accepted such claims",
                "The inquiries had not reported in time",
              ],
              answer: 0,
              explain:
                "Yazar sayıyı veriyor: «in nine of the thirty-one the claims were already out of time when the apology came», yani dava riski yokken de beklenmiş.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l5-25",
              no: 25,
              text: "What cost does he identify?",
              options: [
                "The cost of compensating the families involved",
                "The cost of holding a further public inquiry",
                "The political cost of admitting a mistake to voters",
                "The cost to the person who has to say the words",
              ],
              answer: 3,
              explain:
                "Metin maliyeti hukuki ve mali olandan ayırıyor: «it obliges the person issuing it to say, in public, that an institution they lead did something indefensible».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-l5-26",
              no: 26,
              text: "What is his conclusion?",
              options: [
                "Apologies should be issued automatically after forty years",
                "The instrument is cheapest where it matters least",
                "The individual decisions were mostly indefensible",
                "Compensation ought to replace apologies entirely",
              ],
              answer: 1,
              explain:
                "Son paragraf çıkarımı veriyor: «the instrument works best where it is worth least», çünkü yaşayan birine yöneltilen özür kuruma bir bedele mal olur.",
            },
          ],
        },
        {
          id: "en-c1-09-l6",
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
              body: "The instrument is being judged against a standard it was never able to meet. Nobody claims that an apology repairs anything. What it does is fix a description, and a description that has been fixed can be built on; the objection that it changes nothing is answered by looking at what people argue about afterwards.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "The effect that has actually been measured is not on the recipients at all. Two studies now find the largest change among people with no connection whatever to the events, who reported afterwards that they had not previously believed the accounts. That is a finding about the general public, and nobody was looking for it.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "There is no real disagreement about whether to apologise; there is a disagreement about when, and the two have been run together for thirty years. Almost everybody who objects to a particular apology objects to its date, and would have supported the identical words in 1990.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "It is assumed that the demand comes from the families. In the four cases I have worked on it came from inside the institution, usually from the second generation of staff, and the families were consulted afterwards and were frequently more sceptical than anybody had expected.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "This argument has a shape I recognise from other fields. Those under fifty regard the apology as obviously due; those over seventy regard it as an insult to people who acted under different assumptions. That is not a moral disagreement that can be settled. It is a disagreement that will simply end.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-09-l6-27",
              no: 27,
              text: "Which writer says the instrument is being measured against the wrong standard?",
              answer: "a",
              explain:
                "Writer A ölçütü reddediyor: «being judged against a standard it was never able to meet», ve yerine başka bir ölçüt öneriyor: tarifin sabitlenmesi ve sonrasında neyin tartışıldığı.",
            },
            {
              kind: "match",
              id: "en-c1-09-l6-28",
              no: 28,
              text: "Which writer reports an effect on people nobody was studying?",
              answer: "b",
              explain:
                "Writer B bulgunun yerini kaydırıyor: en büyük değişim «among people with no connection whatever to the events», ve ekliyor: «nobody was looking for it».",
            },
            {
              kind: "match",
              id: "en-c1-09-l6-29",
              no: 29,
              text: "Which writer says the disagreement concerns timing rather than principle?",
              answer: "c",
              explain:
                "Writer C ikisini ayırıyor: «There is no real disagreement about whether to apologise; there is a disagreement about when», ve itiraz edenlerin aynı sözleri 1990'da destekleyeceğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-09-l6-30",
              no: 30,
              text: "Which writer says the pressure comes from a different source than is assumed?",
              answer: "d",
              explain:
                "Writer D varsayımı adlandırıp çürütüyor: «It is assumed that the demand comes from the families», oysa dört olayda talep kurumun kendi ikinci kuşak personelinden gelmiş.",
            },
          ],
        },
        {
          id: "en-c1-09-l7",
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
              title: "Which comes first",
              body: `Every argument about an apology turns, within about four exchanges, into an argument about compensation. {{31}}

The two are separable in principle, and they are separated in practice far more often than the debate suggests. There are cases in which substantial sums were paid and no statement was ever made, and some of the recipients of those sums have written about it. {{32}}

Where the two are separated, the sequence matters more than anybody expected. An apology that comes first is read as an opening. The identical words after a settlement are read as a clause. {{33}}

Rarely is the sequence chosen by the people affected. It is chosen by lawyers, whose duty runs to the institution and whose instinct is to say nothing at all until the amount has been fixed. {{34}}

That is a defensible instinct, and it produces, reliably, the version of the words that is worth least to the person receiving them.`,
              gloss: [
                { de: "a settlement", tr: "uzlaşma, tazminat anlaşması", en: "settlement" },
                { de: "closure", tr: "kapanma, tamamlanma duygusu", en: "closure" },
                { de: "an instinct", tr: "içgüdü", en: "instinct" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "What they describe is neither gratitude nor closure. It is the specific irritation of having been paid to stop talking, and it appears in accounts written decades apart and on three continents." },
            { key: "b", label: "b", body: "This is treated as evasion by one side and as realism by the other, and it is neither. It is a question about what each of the two instruments is actually for, and it is almost never put in those terms." },
            { key: "c", label: "c", body: "Nobody has ever asked a claimant which order they would prefer. The two or three who have been asked informally disagreed with one another, which is itself worth knowing and is not what either campaign assumes." },
            { key: "d", label: "d", body: "There is nobody in the process whose duty is to the meaning of the sentence." },
            { key: "e", label: "e", body: "The largest single settlement of this kind was agreed in 2004 and covered approximately nine thousand people." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-09-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış kaymayı ölçüyor: tartışma «within about four exchanges» tazminata dönüyor. (b) bu kaymanın iki taraftaki okumasını verip yeniden çerçeveliyor: «a question about what each of the two instruments is actually for».",
            },
            {
              kind: "match",
              id: "en-c1-09-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "a",
              explain:
                "Paragraf para ödenip hiç açıklama yapılmayan olayları anıyor ve alıcıların yazdıklarına gönderme yapıyor. (a) «What they describe» ile o yazılara bağlanıp içeriğini veriyor.",
            },
            {
              kind: "match",
              id: "en-c1-09-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Paragraf sıranın etkisini veriyor: «An apology that comes first is read as an opening. The identical words after a settlement are read as a clause». (c) sıranın kime sorulmadığını ekliyor: «Nobody has ever asked a claimant which order they would prefer».",
            },
            {
              kind: "match",
              id: "en-c1-09-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Paragraf sırayı avukatların belirlediğini ve görevlerinin kuruma karşı olduğunu söylüyor. (d) bundan tek cümlelik çıkarımı yapıyor: cümlenin anlamına karşı görevli kimse yok. (e) 2004'teki en büyük uzlaşmadan söz ediyor ve metinde tutarların büyüklüğü hiç tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-09-l8",
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
              label: "a — Speechwriter",
              body: "I have drafted four of these and the argument is never about the truth of a sentence. It is about the tense. Was done, were done, we did. Every hour spent on that is an hour in which somebody decides how much of the thing the institution is prepared to own, and the drafting record is the only honest history of that decision.",
            },
            {
              key: "b",
              label: "b — Historian",
              body: "The inquiry established the facts in 1998 and the apology came in 2011, and in between the account did not change by a comma. What changed is that the sentence became citable. I can now write that the state has accepted something, where I previously wrote that it appeared to be the case, and reviewers no longer ask me to soften it.",
            },
            {
              key: "c",
              label: "c — Recipient's daughter",
              body: "My mother wanted it and did not live to hear it, which is the part I cannot get past. When it came I felt almost nothing, and then I was angry with myself for feeling almost nothing, and then I understood that it had not been addressed to me at all. It was addressed to the country, about us.",
            },
            {
              key: "d",
              label: "d — Lawyer",
              body: "I advised against it three times and I would advise against it again, and I want to be clear that this is not a view about whether it was deserved. My duty runs to one party. If anybody wants a different answer, they should change who is in the room when the question is asked.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-09-l8-35",
              no: 35,
              text: "says that the real decision is recorded somewhere other than the statement",
              answer: "a",
              explain:
                "Metin kararın izini başka bir yere koyuyor: «the drafting record is the only honest history of that decision», çünkü tartışma zamanların seçimi üzerinden yürüyor.",
            },
            {
              kind: "match",
              id: "en-c1-09-l8-36",
              no: 36,
              text: "says the value of the words lay in what they made it possible to write",
              answer: "b",
              explain:
                "Metin kazancı adlandırıyor: «the sentence became citable», ve artık «the state has accepted» yazabildiğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-09-l8-37",
              no: 37,
              text: "concludes that the statement was addressed to somebody else",
              answer: "c",
              explain:
                "Metin duyguyu çözümleyip sonuca varıyor: «it had not been addressed to me at all. It was addressed to the country, about us».",
            },
            {
              kind: "match",
              id: "en-c1-09-l8-38",
              no: 38,
              text: "separates their professional duty from their personal judgement",
              answer: "d",
              explain:
                "Metin ayrımı açıkça kuruyor: «this is not a view about whether it was deserved. My duty runs to one party».",
            },
            {
              kind: "match",
              id: "en-c1-09-l8-39",
              no: 39,
              text: "says the substance of the account did not alter during the interval",
              answer: "b",
              explain:
                "Metin süreyi ve değişmezliği birlikte veriyor: 1998 ile 2011 arasında «the account did not change by a comma».",
            },
            {
              kind: "match",
              id: "en-c1-09-l8-40",
              no: 40,
              text: "suggests changing who takes part rather than the advice that is given",
              answer: "d",
              explain:
                "Metin çözümü kendi görüşünde değil kurulun bileşiminde arıyor: «they should change who is in the room when the question is asked».",
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
        "This part has four tasks. You hear three extracts, a report, a panel discussion and eight short monologues.",
      instructionTr:
        "Bu bölümde dört görev var. Üç parça, bir sunum, bir panel tartışması ve sekiz kısa konuşma dinleyeceksin.",
      tasks: [
        {
          id: "en-c1-09-h1",
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
              situation: "Bir metin yazarı ile bir tarihçi taslak sürecini konuşuyor.",
              plays: 2,
              segments: [
                { text: "You spent six weeks on four hundred words." },
                { text: "On about eleven of them. The rest were agreed in an afternoon." },
                { text: "Which eleven?" },
                { text: "The verbs. Whether the sentence says mistakes were made or says we made them. That choice is the whole document and everybody in the room knows it." },
                { text: "And who wins that argument?" },
                { text: "Nobody wins it. It is settled by whoever is still in the meeting at seven o'clock, which is not a principle, and it is what actually happened." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki araştırmacı beklenmedik bir bulguyu tartışıyor.",
              plays: 2,
              segments: [
                { text: "The recipients barely moved on any measure." },
                { text: "That was in the design, though. They already believed it." },
                { text: "Exactly. The movement was in the control group, and we had no hypothesis for that at all." },
                { text: "Which is why nobody quotes it." },
                { text: "Nobody quotes it because it is not a finding about apology. It is a finding about how much the general public did not know, and that was somebody else's paper to write." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Bir avukat ile bir gazeteci zamanlamayı tartışıyor.",
              plays: 2,
              segments: [
                { text: "You advised them to wait." },
                { text: "I advised them that an admission is admissible. That is not the same sentence, although it produces the same delay." },
                { text: "Does the distinction matter?" },
                { text: "It matters to me and to nobody else, which I accept. What I will not accept is being described as the reason. I was asked one question and I answered it correctly." },
                { text: "Who should have been asked a different one?" },
                { text: "Somebody whose duty is not to the institution. There is no such person in the room, and inventing one is a policy question rather than a legal one." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-09-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the speechwriter say the argument was about?",
              options: ["The choice of verbs", "The length of the statement", "The date of publication"],
              answer: 0,
              explain:
                "Yazar tartışmanın odağını veriyor: «The verbs. Whether the sentence says mistakes were made or says we made them».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h1-2",
              no: 2,
              ref: "a1",
              text: "How does he describe the way it was settled?",
              options: ["By a vote of the whole committee", "By the seniority of the participants", "By who was still present late on"],
              answer: 2,
              explain:
                "Yazar süreci ilkeden ayırıyor: «It is settled by whoever is still in the meeting at seven o'clock, which is not a principle».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h1-3",
              no: 3,
              ref: "a2",
              text: "Where did the researchers find the change?",
              options: ["Among the recipients", "In the control group", "In the second wave of interviews"],
              answer: 1,
              explain:
                "Araştırmacı yeri açıkça veriyor: «The movement was in the control group, and we had no hypothesis for that at all».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h1-4",
              no: 4,
              ref: "a2",
              text: "Why does he think the result is rarely cited?",
              options: ["It concerns a different subject", "The sample was too small", "The method was criticised"],
              answer: 0,
              explain:
                "Araştırmacı bulguyu yeniden sınıflandırıyor: «it is not a finding about apology. It is a finding about how much the general public did not know».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h1-5",
              no: 5,
              ref: "a3",
              text: "What distinction does the lawyer draw?",
              options: ["Between advice and instruction", "Between his advice and a recommendation to wait", "Between civil and criminal proceedings"],
              answer: 1,
              explain:
                "Avukat kendi cümlesini düzeltiyor: «I advised them that an admission is admissible. That is not the same sentence, although it produces the same delay».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h1-6",
              no: 6,
              ref: "a3",
              text: "What does he say is missing from the process?",
              options: ["An independent record of the advice", "A deadline for a decision", "Somebody who does not act for the institution"],
              answer: 2,
              explain:
                "Avukat eksiği adlandırıyor: «Somebody whose duty is not to the institution. There is no such person in the room».",
            },
          ],
        },
        {
          id: "en-c1-09-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting a review of state apologies. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Devlet özürleri üzerine bir incelemeyi anlatan bir kadını dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir araştırmacı inceleme sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the figures from the review, and I will include the ones that were awkward. We examined thirty-one state apologies issued since 1990. The median interval between the events and the statement was forty-two years. In eleven of the thirty-one, the facts had already been established by a public inquiry more than a decade earlier. Compensation accompanied the statement in nine cases and followed it in six; in the remaining sixteen no money was ever paid. We interviewed one hundred and forty recipients or their descendants, and the single most common word in those interviews was late. And the finding we did not expect: satisfaction was lower where the compensation had come first.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Review of state apologies — findings",
              body: `The review examined {{7}} state apologies.

All of them were issued after {{8}}.

The median interval was {{9}} years.

The facts had already been established in {{10}} of the cases.

Compensation accompanied the statement in {{11}} cases.

No money at all was paid in {{12}} cases.

{{13}} recipients or descendants were interviewed.

The most common word in the interviews was {{14}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-09-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["31", "thirty-one"],
              explain:
                "Kayıt örneklem büyüklüğünü veriyor: «We examined thirty-one state apologies issued since 1990».",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["1990"],
              explain:
                "Aynı cümledeki tarih kapsamı belirliyor: «issued since 1990». Kırk iki ise aradaki süre.",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["42", "forty-two"],
              explain:
                "«The median interval between the events and the statement was forty-two years» — ortanca gecikme.",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["11", "eleven"],
              explain:
                "«In eleven of the thirty-one, the facts had already been established by a public inquiry more than a decade earlier».",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["9", "nine"],
              explain:
                "Kayıt üç durumu ayırıyor: «Compensation accompanied the statement in nine cases and followed it in six; in the remaining sixteen no money was ever paid». Not kâğıdı birlikte geleni soruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["16", "sixteen"],
              explain:
                "«in the remaining sixteen no money was ever paid» — hiç ödeme yapılmayan olayların sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["140", "one hundred and forty"],
              explain:
                "«We interviewed one hundred and forty recipients or their descendants» — görüşülen kişi sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-09-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["late"],
              explain:
                "«the single most common word in those interviews was late» — görüşmelerde en sık geçen sözcük.",
            },
          ],
        },
        {
          id: "en-c1-09-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear part of a panel discussion about the timing of official apologies. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr:
            "Resmî özürlerin zamanlaması üzerine bir panel tartışmasının bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Tartışmayı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir yönetici, tarihçi Ilja, avukat Bexi ve topluluk temsilcisi Noor ile konuşuyor.",
              plays: 1,
              segments: [
                { text: "Ilja, you have argued that an apology should not wait for the last witness. Why?" },
                { text: "Because the argument for waiting is presented as caution and functions as a filter. Wait long enough and the only people who can be contradicted are dead. That is not caution; it is the removal of the one group who could correct the wording." },
                { text: "Bexi, from the legal side?" },
                { text: "I would agree with the description and reject the implication. Nobody in my profession is trying to remove witnesses. We are answering a question about liability, correctly, and the delay is a consequence of the answer rather than its purpose." },
                { text: "Noor, you have been on the receiving end." },
                { text: "I have, and I want to say something that will not help either of them. The families I worked with did not want it earlier. They wanted it accurate, and in 1994 it would not have been accurate, because the department was still denying the documents existed." },
                { text: "Ilja, does that change your position?" },
                { text: "It complicates it and it does not move it. Noor is describing one case in which delay bought accuracy. My objection is to a pattern of thirty-one, and the pattern does not correlate with anything about accuracy." },
                { text: "Bexi?" },
                { text: "Then the disagreement is not about law at all, which is worth establishing. I can tell you why any single apology was delayed. I cannot tell you why the median is forty-two years, and neither can anybody else in this room." },
                { text: "Noor, is there a version of this that would satisfy you?" },
                { text: "Publish the drafting record twenty years afterwards. Not the statement — the arguments about the statement. That is where the institution's actual position is, and it is the only document that would tell a family what was decided about them." },
                { text: "Ilja, would that meet your objection?" },
                { text: "It would meet a different one, and I would take it. It does not shorten anything. It does mean that the people who choose the tense have to expect to be read." },
                { text: "So we have a proposal about records and no agreement about timing." },
                { text: "That is not quite what has happened. What we have established is that the timing argument is not a legal argument, and everybody in this room has now conceded that, including me." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-09-h3-15",
              no: 15,
              ref: "c1",
              text: "What is Ilja's objection to waiting?",
              options: [
                "It allows the wrong department to write the wording",
                "It removes the people who could correct the account",
                "It makes compensation legally impossible",
                "It shifts the cost onto the next generation",
              ],
              answer: 1,
              explain:
                "Ilja beklemenin işlevini adlandırıyor: «the only people who can be contradicted are dead … the removal of the one group who could correct the wording».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-16",
              no: 16,
              ref: "c1",
              text: "How does Bexi respond?",
              options: [
                "She denies that any delay occurs",
                "She says the profession has changed its advice",
                "She argues that accuracy requires delay",
                "She accepts the description but not the motive",
              ],
              answer: 3,
              explain:
                "Bexi ayrımı açıkça yapıyor: «I would agree with the description and reject the implication», ve gecikmeyi amaç değil sonuç sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Noor say about the families she worked with?",
              options: [
                "They preferred accuracy to speed",
                "They were never consulted at all",
                "They rejected the statement when it came",
                "They had asked for compensation instead",
              ],
              answer: 0,
              explain:
                "Noor tercihi veriyor: «They wanted it accurate», çünkü 1994'te belgelerin varlığı hâlâ inkâr ediliyordu.",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-18",
              no: 18,
              ref: "c1",
              text: "How does Ilja treat Noor's example?",
              options: [
                "He says it is not typical of her field",
                "He accepts it and abandons his argument",
                "He says one case does not answer a pattern",
                "He questions whether the documents existed",
              ],
              answer: 2,
              explain:
                "Ilja ölçeği ayırıyor: «Noor is describing one case … My objection is to a pattern of thirty-one».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-19",
              no: 19,
              ref: "c1",
              text: "What does Bexi concede at that point?",
              options: [
                "That the argument is not legal",
                "That her advice has been harmful",
                "That the median is easy to explain",
                "That witnesses are deliberately excluded",
              ],
              answer: 0,
              explain:
                "Bexi sınırını çiziyor: tek tek gecikmeleri açıklayabiliyor ama «I cannot tell you why the median is forty-two years», dolayısıyla «the disagreement is not about law at all».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Noor propose?",
              options: [
                "Publishing the drafting record later",
                "Issuing apologies within ten years",
                "Giving families a right of reply",
                "Separating the money from the words",
              ],
              answer: 0,
              explain:
                "Noor önerisini netleştiriyor: «Publish the drafting record twenty years afterwards. Not the statement — the arguments about the statement».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-21",
              no: 21,
              ref: "c1",
              text: "How does Ilja assess that proposal?",
              options: [
                "It solves the problem he raised",
                "It would be impossible to implement",
                "It has already been tried elsewhere",
                "It answers a different objection",
              ],
              answer: 3,
              explain:
                "Ilja kabulünü sınırlıyor: «It would meet a different one, and I would take it. It does not shorten anything».",
            },
            {
              kind: "mcq",
              id: "en-c1-09-h3-22",
              no: 22,
              ref: "c1",
              text: "How does Bexi describe the outcome of the discussion?",
              options: [
                "As a failure to reach any conclusion",
                "As a proposal that nobody supports",
                "As agreement on what it is not",
                "As a defeat for her own position",
              ],
              answer: 2,
              explain:
                "Bexi yöneticinin özetini düzeltiyor: «What we have established is that the timing argument is not a legal argument, and everybody in this room has now conceded that, including me».",
            },
          ],
        },
        {
          id: "en-c1-09-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about official apologies. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Resmî özürler üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to separate the act itself from its timing" },
            { key: "b", label: "to report a consequence that fell on somebody else" },
            { key: "c", label: "to say that the wording was negotiated rather than written" },
            { key: "d", label: "to refuse a role they have been assigned" },
            { key: "e", label: "to describe what changed for them personally" },
            { key: "f", label: "to warn that a precedent is being set" },
            { key: "g", label: "to explain why they did not speak earlier" },
            { key: "h", label: "to question who the statement was addressed to" },
            { key: "i", label: "to accept that a criticism of them is fair" },
            { key: "j", label: "to point out that the money and the words were separated" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı iki ayrı soruyu ayırıyor.",
              plays: 2,
              segments: [
                { text: "I have spent four years being told that I am against apologies. I am not. I have never met anybody who is against apologies. What I am against is issuing one in the year after the last claimant dies, and that is a question about a calendar, not about a principle." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı beklenmedik bir etkiyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "We were measuring the recipients and they did not move, because they had believed the account for fifty years. The group that moved was the one we included as a comparison. A third of them told us afterwards that until the statement they had assumed the whole thing was exaggerated." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı metnin nasıl oluştuğunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "People read it as though somebody sat down and wrote what they believed. Eleven bodies had a veto over that paragraph. What you are reading is the sentence that all eleven could live with, which is a different kind of document, and it should be read as one." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı kendisine verilen rolü reddediyor.",
              plays: 2,
              segments: [
                { text: "I am described in three books as the person who delayed it. I answered a question about admissibility and I answered it correctly. If the institution wanted a different answer it should have asked a different question, or asked somebody whose duty was not to it." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kendisi için ne değiştiğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "For thirty years I gave a lecture in which I said the evidence appeared to show something. I now say that it has been accepted. The evidence has not changed and my sentence has, and the students notice the difference even though they have never heard the earlier version." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı emsalden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Everybody in the department treated it as a single decision about a single history. Four other groups have written to us since, citing it, and two of the four have a better case than the one we settled. Nobody costed that, because nobody was asked to." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı yıllarca susmuş olmasını açıklıyor.",
              plays: 2,
              segments: [
                { text: "I knew what was in those files in 1996 and I said nothing until 2014. The reason is not brave and it is not complicated: I had eleven years to go until my pension and two children at school. I would like that written down alongside everything else I have said." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı metnin kime seslendiğini sorguluyor.",
              plays: 2,
              segments: [
                { text: "Read the second paragraph aloud and ask who it is for. It explains the historical context. We do not need the historical context; we were in it. That paragraph is written for a reader who has just arrived, and the whole document turns out to have been aimed past us." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-09-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı kendisine yüklenen konumu reddedip soruyu ayırıyor: «that is a question about a calendar, not about a principle».",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı etkinin yerini gösteriyor: alıcılar kıpırdamamış, «The group that moved was the one we included as a comparison».",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı metnin nasıl oluştuğunu açıklıyor: «Eleven bodies had a veto over that paragraph … the sentence that all eleven could live with».",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Konuşmacı kendisine biçilen rolü reddediyor: «I am described in three books as the person who delayed it», oysa sorulan soruya doğru cevap vermiş.",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı kendi cümlesindeki değişimi anlatıyor: «The evidence has not changed and my sentence has».",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Konuşmacı emsalin sonuçlarını gösteriyor: «Four other groups have written to us since, citing it», ve bunun hesaplanmadığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "g",
              explain:
                "Konuşmacı sessizliğinin nedenini süslemeden veriyor: «I had eleven years to go until my pension and two children at school».",
            },
            {
              kind: "match",
              id: "en-c1-09-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Konuşmacı muhatabı sorguluyor: tarihsel bağlam anlatan paragraf «written for a reader who has just arrived», dolayısıyla belge «aimed past us».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "This part has two tasks: an essay and a report.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir rapor.",
      tasks: [
        {
          id: "en-c1-09-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on official apologies. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. An apology is worth little unless it is accompanied by compensation.\n2. An apology is valuable in itself, because it fixes the official account of what happened.\n\nWrite 220 to 260 words.",
          promptTr:
            "Resmî özürler üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Tazminat eşlik etmedikçe özürün değeri azdır.\n2. Özür kendi başına değerlidir, çünkü olayın resmî anlatısını sabitler.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two positions are usually presented as a disagreement about sincerity, which flatters neither of them.

The first rests on a straightforward observation about incentives. Words cost an institution nothing that can be entered in an account, and a body that has apologised may reasonably calculate that the matter is now closed. On this reading the statement is not merely inadequate; it is actively useful to the party that issued it, since it converts a claim into a piece of history.

The second position does not dispute the incentive and denies that it settles anything. What an apology produces is a fixed description. Before it, the events are contested and every subsequent argument must establish them again; afterwards they are the official account, and a government that has accepted them cannot later suggest that they were exaggerated. That is a durable asset, and it is one that money does not buy.

The second point seems to me the more important, though for a reason neither speaker gave. Compensation is agreed by a small number of people and is spent; a description is public and is cited by anybody who needs it, including in cases the original claimants never brought.

My own view is that the argument has been conducted about the wrong variable. The interesting question is not which instrument is worth more but who chooses the order in which they arrive, and at present that is decided by lawyers whose duty runs entirely to one of the parties.`,
            criteria: [
              "İki nokta da adil ve tam özetlendi mi?",
              "Seçim gerekçelendirildi mi ve gerekçe özetten çıkıyor mu?",
              "Kendi görüş özetin tekrarı değil, ayrı bir sav mı?",
              "Adlaştırma ve çekimserlik belirteçleri kullanıldı mı? (on this reading, arguably, the incentive)",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-09-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is preparing a public statement about something it got badly wrong several years ago. Write a report for its board. Describe the present position, assess the likely effects of issuing the statement now, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kuruluş, yıllar önce ciddi biçimde yanlış yaptığı bir konuda kamuya açık bir bildiri hazırlıyor. Yönetim kuruluna bir rapor yaz. Bugünkü durumu anlat, bildirinin şimdi yayımlanmasının olası etkilerini değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the present position precisely.", tr: "Bugünkü durumu kesin biçimde anlat." },
              { de: "Assess both the gains and the risks.", tr: "Hem kazancı hem riski değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed statement on the 2016 assessments

Present position
We have never made a public statement about the 2016 assessments. Our website continues to describe the review of that year as inconclusive, which is no longer an accurate summary of our own internal findings, completed in 2021 and not published. Eleven of the fourteen families concerned have written to us at least once; four have written in each of the last three years.

Likely effects
The gain is not reputational and should not be presented as such. A statement would fix a description that we currently leave open, and it would end the position in which our public wording and our internal wording differ. That difference is our largest exposure, and it grows every time somebody new reads both.

The principal risk is precedent. Two other groups have raised comparable questions since 2019, and a statement that admits a general failure of method would be cited by them. That is a real cost and it is not a reason to withhold an accurate account; it is a reason to be exact about what is being admitted.

Recommendation
I recommend issuing the statement within this financial year, drafted by somebody who was not involved in the original decision, and I recommend that the drafting record be retained.

I would not publish it alongside a compensation offer, and I would not describe the delay as a review that is still under way.`,
            criteria: [
              "Bugünkü durum somut biçimde ve tarihleriyle anlatıldı mı?",
              "Hem kazanç hem risk değerlendirildi mi ve emsal riski ciddiye alındı mı?",
              "Öneri uygulanabilir mi ve neyin yapılmayacağı söylendi mi?",
              "Rapor kaydı ve başlıklandırma uygun mu?",
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
          id: "en-c1-09-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about apologies, records and who decides what happened.",
          promptTr: "Sana özürler, kayıtlar ve neyin olduğuna kimin karar verdiği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What makes an apology from an organisation different from one between two people?", tr: "İyi günler. Bir kurumun özrünü iki kişi arasındaki özürden ayıran nedir?" },
            { who: "you", hint: "Bir ayrım kur ve örnekle.", expect: "iki durumu ayırt etmek ve örneklendirmek", seconds: 45 },
            { who: "partner", de: "Thank you. Have you ever seen a written account of something you took part in?", tr: "Teşekkürler. Katıldığın bir olayın yazılı anlatısını hiç gördün mü?" },
            { who: "you", hint: "Tek bir olayı ve tepkini anlat.", expect: "tek bir olayı anlatmak ve kendi tepkisini çözümlemek", seconds: 45 },
            { who: "partner", de: "And if you had to decide when an organisation should apologise, what would your rule be?", tr: "Bir kurumun ne zaman özür dilemesi gerektiğine sen karar versen kuralın ne olurdu?" },
            { who: "you", hint: "Bir ölçüt öner ve gerekçelendir.", expect: "varsayımsal bir görevde ölçüt önermek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "draw a distinction and illustrate it", tr: "Bir ayrım kurmak ve örneklemek" },
              { de: "narrate one event and analyse the reaction", tr: "Tek bir olayı anlatıp tepkiyi çözümlemek" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önerip gerekçelendirmek" },
            ],
            sample:
              "Between two people an apology is addressed to the person who was hurt; from an institution it is addressed to everybody, and the person who was hurt is present as an example. My school published an account of a year I was in, and reading it I recognised every fact and none of the emphasis, which taught me that accuracy and honesty are separable. If I had to write a rule, I would tie the apology to the completion of the inquiry rather than to any calendar, because the only defensible reason to wait is that you do not yet know.",
            criteria: [
              "Ayrım açıkça kuruldu mu ve örneklendi mi?",
              "Anlatı tek ve belirgin mi, tepki çözümlendi mi?",
              "Son cevapta bir ölçüt önerildi ve savunuldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-c1-09-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. Compare these two ways of dealing with an institutional wrong, say which you would defend and explain one serious objection to your own position: a public statement that fixes the account, or a payment to those affected with no statement at all.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Kurumsal bir haksızlıkla baş etmenin şu iki yolunu karşılaştır, hangisini savunacağını söyle ve kendi konumuna yöneltilebilecek ciddi bir itirazı açıkla: anlatıyı sabitleyen kamuya açık bir bildiri mi, yoksa hiç bildiri olmadan etkilenenlere yapılan bir ödeme mi?",
          prepSeconds: 60,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "compare the two approaches", tr: "İki yaklaşımı karşılaştır" },
              { de: "state and justify a position", tr: "Bir konum belirt ve gerekçelendir" },
              { de: "state a serious objection to your own position", tr: "Kendi konumuna ciddi bir itiraz getir" },
            ],
            sample:
              "A payment reaches the people who were harmed, it reaches them now, and it does not require anybody to agree about what happened, which is why it can be arranged quickly. Its limitation is that it settles a claim without settling a description: the account remains contested, and the next group with a similar case has to establish the facts from the beginning. A statement is slower and cheaper and it produces something durable, because a fixed account can be cited by people who were never party to the original claim. I would defend the statement. The serious objection to my position is that it is easy for me to prefer the instrument that costs the institution nothing. Somebody who has waited forty years for a repair to a roof is entitled to ask why the description is being treated as the valuable part, and I do not have an answer that would satisfy them.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Konum gerekçelendirildi mi?",
              "Kendi konumuna yöneltilen itiraz ciddi mi?",
              "İki dakika akıcı ve düzenli konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-c1-09-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "An institution is preparing a statement and can commit to one procedural change. Talk with me about the options, then agree on a rule rather than on a single decision.",
          promptTr:
            "Bir kurum bildiri hazırlıyor ve tek bir usul değişikliğine söz verebiliyor. Seçenekleri benimle konuş, sonra tek bir karar üzerinde değil bir kural üzerinde anlaş.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: publish the drafting record after twenty years, appoint an adviser whose duty is to the affected families, fix a deadline once an inquiry reports, or separate the statement from any compensation offer. Where would you begin?", tr: "Seçenekler: taslak kaydını yirmi yıl sonra yayımlamak, görevi etkilenen ailelere karşı olan bir danışman atamak, soruşturma raporundan sonra bir son tarih koymak ya da bildiriyi tazminat teklifinden ayırmak. Nereden başlardın?" },
            { who: "you", hint: "Bir seçenek seç ve seçimi açık bir ölçüte bağla.", expect: "bir seçeneği seçmek ve açık bir ölçütle gerekçelendirmek", seconds: 45 },
            { who: "partner", de: "But every one of those depends on somebody inside the institution wanting it, and the whole problem is that nobody does. Does that not defeat your criterion?", tr: "Ama bunların hepsi kurum içinden birinin istemesine bağlı ve bütün sorun kimsenin istememesi. Bu ölçütünü çürütmüyor mu?" },
            { who: "you", hint: "İtirazın gücünü teslim et ve ölçütünü onaracak biçimde yeniden kur.", expect: "bir itirazı teslim edip kendi ölçütünü yeniden kurmak", seconds: 45 },
            { who: "partner", de: "Then give me the rule we would write down, not the option we would pick.", tr: "Öyleyse bana seçeceğimiz seçeneği değil, yazacağımız kuralı ver." },
            { who: "you", hint: "Genel ve uygulanabilir bir kural formüle et.", expect: "tek bir olaydan genel bir kurala geçmek ve onu ifade etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "justify a choice by an explicit criterion", tr: "Bir seçimi açık bir ölçütle gerekçelendirmek" },
              { de: "concede the force of an objection", tr: "Bir itirazın gücünü teslim etmek" },
              { de: "formulate a general rule", tr: "Genel bir kural formüle etmek" },
            ],
            sample:
              "I would begin with the deadline tied to the inquiry, on the criterion that it is the only option that removes discretion rather than relying on it. You are right that all four require somebody inside to want them, and I want to concede that properly: a rule adopted voluntarily can be abandoned voluntarily, which makes my criterion circular. What survives is the observation about discretion, so the rule we write down is this: any commitment we make must be one that binds a future post-holder rather than a present person, and it must be published at the moment it is made, because a rule nobody outside can see is not a rule but an intention.",
            criteria: [
              "Seçim açık bir ölçütle mi gerekçelendirildi?",
              "İtirazın gücü gerçekten teslim edildi mi?",
              "Sonunda seçenek değil, uygulanabilir bir kural üretildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

import type { MockPaper } from "../types";

/**
 * C1 · Deneme 6 — "Translation, Meaning and What Cannot Be Carried Over".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Bu kâğıtta okuma 5'in
 * kapanışı, okuma 6'nın yazar dizilimi, okuma 7'nin araştırma anlatısı ve
 * dinleme 3'ün panel yayı bilerek önceki beş kâğıttan farklı kuruldu:
 * aynı retorik iskelet altıncı kez gelseydi öğrenci savı değil kalıbı
 * tanırdı.
 *
 * C1 İMZALARI: devrik yapı, yarma cümle, çekimserlik belirteci ve
 * adlaştırma boşluksuz metinlerde geçiyor.
 */
export const EN_C1_06: MockPaper = {
  id: "en-c1-06",
  course: "en",
  level: "C1",
  no: 6,
  theme: "Translation, Meaning and What Cannot Be Carried Over",
  themeTr: "Çeviri, anlam ve aktarılamayan",
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
          id: "en-c1-06-l1",
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
              title: "The word that has no equivalent",
              body: `Rarely has a claim survived so long on so little evidence as the one about words that cannot be translated. There is no shortage of lists; what there is a shortage of is anybody {{1}} the trouble to check them.

The usual example is a term for a feeling, presented as untranslatable and then translated, in the same paragraph, by a phrase of eleven words. That phrase is the translation. What the claim really {{2}} down to is that no single word does the job, which is true and a great deal less interesting.

A second confusion is worth {{3}} apart. A word may have no equivalent because the thing it names does not exist in the other culture, which is a fact about the world; or because the other language divides the same ground differently, which is a fact about grammar. These two are constantly {{4}} together.

Whether any of this matters outside a magazine is an open question. Translators, who {{5}} for a living with exactly this problem, are notably uninterested in the debate, and evidence that untranslatability affects anything at all remains {{6}} to find.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-06-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["making", "having", "taking", "giving"],
              answer: 2,
              explain:
                "`take the trouble to do something` zahmete katlanmanın kalıbıdır. `make trouble` sorun çıkarmak, `have trouble` güçlük çekmek demektir; `give the trouble` ise İngilizcede yoktur.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["boils", "cuts", "breaks", "brings"],
              answer: 0,
              explain:
                "`boil down to something` bir savın özüne inmenin kalıbıdır ve boşluktan sonra `down to` geliyor. `cut down`, `break down` ve `bring down` bambaşka anlamlar taşır.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["keeping", "telling", "holding", "setting"],
              answer: 1,
              explain:
                "`tell two things apart` iki şeyi birbirinden ayırt etmektir. `keep apart` uzak tutmak, `hold apart` ayrı tutmak, `set apart` ise ayrıcalıklı kılmak anlamına gelir.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["put", "held", "set", "run"],
              answer: 3,
              explain:
                "`run two things together` ayrı olması gereken iki şeyi birbirine karıştırmaktır. `put together` birleştirmek, `hold together` bir arada tutmak, `set together` ise kalıp değildir.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["deal", "handle", "treat", "manage"],
              answer: 0,
              explain:
                "`deal with something` bir sorunla uğraşmanın kalıbıdır ve boşluktan sonra `with` geliyor. `handle`, `treat` ve `manage` doğrudan nesne alır ve `with` ile bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["heavy", "strong", "hard", "deep"],
              answer: 2,
              explain:
                "`hard to find` bir şeyin bulunmasının güçlüğünü anlatır ve cümlenin çekimser tonunu tamamlar. `heavy`, `strong` ve `deep` bu yapıda `to find` mastarıyla kullanılmaz.",
            },
          ],
        },
        {
          id: "en-c1-06-l2",
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
              title: "Asked to justify",
              body: `A translator is asked, more than any other kind of writer, to justify choices that a monolingual author makes {{7}} being asked about at all.

The demand is not unreasonable, {{8}} it is unevenly applied: nobody requires a novelist to explain why a sentence ends where it does.

What it produces is a peculiar habit of mind. The translator learns to hold two defences ready, one for the reader who wants the original and one {{9}} the reader who wants the English, and neither reader is ever in the room.

There is, {{10}} addition, an ownership problem. A translation is the only literary work whose author can be criticised for having succeeded, since a version that reads well is immediately suspected {{11}} having drifted.

None of this is an argument for leaving books untranslated. It is an argument for reviewing the translation rather than the translator, which is harder and, {{12}} the evidence of most review pages, a great deal rarer.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-06-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["without"],
              explain:
                "`without being asked` edilgen bir ulaç öbeği kurar: yazara hiç sorulmadan. `not` bu konumda ulaç alamaz; `before` ise zaman bildirir ve karşıtlığı kurmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["but", "although", "though"],
              explain:
                "İki yarı ödün kuruyor: talep makul, ama eşit uygulanmıyor. `but`, `although` ve `though` bunu verir; `so` sonuç bildirir ve eleştiriyi tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["for"],
              explain:
                "Cümle `one for the reader who … and one ___ the reader who …` biçiminde bir koşutluk kuruyor; ikinci öğe de aynı edatı ister. Koşutluğun bozulması cümleyi dilbilgisel olarak eksik bırakırdı.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["in"],
              explain:
                "`in addition` bir öğe daha eklemenin belirteç öbeğidir ve virgüller arasına yerleşir. `on addition` ya da `by addition` kalıp değildir.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["of"],
              explain:
                "`suspect somebody of doing something` yapısının edilgeni `be suspected of + ulaç` biçimindedir. `for` neden bildirir ve bu fiille kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["on"],
              explain:
                "`on the evidence of …` kanıta dayanarak demektir. `with the evidence` ya da `by the evidence` bu belirteç öbeğini kurmaz.",
            },
          ],
        },
        {
          id: "en-c1-06-l3",
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
              title: "Equivalence",
              body: `Equivalence is the assumption that a sentence in one language can stand in a stable relation to a sentence in another, usually with a gain in {{13}} and a loss that is hard to specify.

The assumption is useful and it is not quite true. Two sentences can match in reference and diverge in everything else: register, rhythm, and the {{14}} about what the reader already knows.

The problem is not a shortage of theory. It is that most theories are built on single sentences, and a book is not a {{15}} of sentences in that sense.

Critics of the concept are sometimes accused of {{16}}, as though doubting a working assumption were the same as declaring the work impossible.

Several publishers now name the translator on the cover. Early evidence suggests a modest {{17}} of the attention paid to how a book reads in English.

The most likely future is therefore a divided one, with different literatures settling the question according to their own {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-06-l3-13",
              no: 13,
              text: "CLEAR",
              accept: ["clarity"],
              explain:
                "`a gain in ___` yapısında edattan sonra soyut bir ad gerekiyor: `clarity`. Sıfat biçimi bu konumda duramaz; `clearance` ise başka bir anlam taşır.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l3-14",
              no: 14,
              text: "ASSUME",
              accept: ["assumptions", "assumption"],
              explain:
                "Liste üç öğe sayıyor: «register, rhythm, and the ___ about what the reader already knows». Üçüncüsü de bir ad olmalı; çoğul biçim de tekil biçim de dilbilgisel, fiil biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l3-15",
              no: 15,
              text: "COLLECT",
              accept: ["collection"],
              explain:
                "`not a ___ of sentences` yapısında belirsiz tanımlıktan sonra bir ad geliyor: `collection`. `collective` sıfattır ve `a … of` çerçevesine giremez.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l3-16",
              no: 16,
              text: "MYSTERY",
              accept: ["mysticism"],
              explain:
                "`accused of ___` bir ad ister ve suçlama bir tutuma yöneliyor: işi anlaşılmaz kılmak. `mystery` bir olguyu adlandırır, tutumu değil; `mysterious` ise sıfattır.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l3-17",
              no: 17,
              text: "BROAD",
              accept: ["broadening"],
              explain:
                "`a modest ___ of the attention` yapısında `a` ile `of` arasında süreç bildiren bir ad var: `broadening`. Sıfat (`broad`) belirsiz tanımlıkla tek başına ad öbeği kurmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l3-18",
              no: 18,
              text: "PRACTISE",
              accept: ["practices", "practises"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different literatures`), dolayısıyla ad da çoğul. Britanya yazımında ad `practice`, fiil `practise`dir; iki yazım da kabul ediliyor.",
            },
          ],
        },
        {
          id: "en-c1-06-l4",
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
              id: "en-c1-06-l4-19",
              no: 19,
              text: "The publisher did not name the translator on the cover.\nThe translator's name ______ on the cover.",
              cue: "APPEAR",
              accept: ["did not appear"],
              explain:
                "Etken olumsuz cümle, öznesi değişen bir yapıya çevriliyor: adın kendisi özne oluyor ve geçişsiz `appear` fiiliyle kuruluyor. Anahtar sözcük yalın hâlde kaldığı için `did` yardımcı fiili gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l4-20",
              no: 20,
              text: "It is a pity that we did not keep the first draft.\nI wish ______ the first draft.",
              cue: "KEPT",
              accept: ["we had kept"],
              explain:
                "Geçmişe dair pişmanlık `wish + past perfect` ile kurulur ve pişmanlık YAPILMAYAN bir şeye ait olduğu için yapı olumlu kalır: «I wish we had kept». `wish we kept` şimdiki bir durumu anlatırdı.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l4-21",
              no: 21,
              text: "Somebody had already translated the book twice before 1960.\nThe book ______ twice before 1960.",
              cue: "BEEN",
              accept: ["had already been translated"],
              explain:
                "Geçmişin geçmişi edilgene çevriliyor. Anahtar sözcük `been` zincirin ortasında duruyor ve önüne `had`, arkasına üçüncü hâl geliyor; `already` yardımcı fiillerin arasında kalıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-06-l4-22",
              no: 22,
              text: "Only when the second edition appeared did anybody notice the error.\nNobody noticed the error ______ appeared.",
              cue: "UNTIL",
              accept: ["until the second edition"],
              explain:
                "Devrik `Only when …` yapısı düz kurulmuş olumsuz bir cümleye çevriliyor: «Nobody noticed the error until the second edition appeared». Anahtar sözcük zaman bağlacı ve ardından özne geliyor.",
            },
          ],
        },
        {
          id: "en-c1-06-l5",
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
              title: "The sentence I could not carry over",
              body: `I have translated eleven books and I have never once been asked, by a reviewer, about a sentence. I have been asked about words, and about whether a version is faithful, which is a question with no agreed meaning. The sentence is where the work actually happens, and it is invisible.

Consider a case. A character in the original says something that runs to nineteen words and ends on the verb, which in that language delays the crucial information until the last syllable and produces, at the end of a paragraph, a small shock. English will not delay a verb that long. I can reproduce the information or the shock, and the choice is not between accuracy and beauty; it is between two kinds of accuracy, and nothing in the theory tells me which one the author would have wanted.

I should be careful, because the counter-argument is strong. A translator who reaches for effect too readily produces books that all sound the same, and the reader who wanted this author rather than that translator has been quietly cheated. It is precisely this danger that the doctrine of literalism exists to guard against, and the people defending it are not fools.

The way through is narrower than either camp allows. What a translation cannot do is both; what it can do is say which it chose. Rarely does a published translation carry a note of three lines explaining the two or three places where the choice was hardest, and the reluctance of publishers to allow such a note is, on balance, harder to defend than any translation I have produced.

None of this would settle an argument that has run for two thousand years. It would, however, move the argument out of the review pages and into the book, which is where the evidence has been all along.`,
              gloss: [
                { de: "faithful", tr: "sadık (çeviride)", en: "faithful" },
                { de: "literalism", tr: "sözcüğü sözcüğüne çeviri anlayışı", en: "literalism" },
                { de: "a syllable", tr: "hece", en: "syllable" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-06-l5-23",
              no: 23,
              text: "What does the writer say reviewers ask about?",
              options: ["Sentences", "Words and faithfulness", "The author's intentions", "The publisher's choices"],
              answer: 1,
              explain:
                "İlk paragraf ayrımı kuruyor: «I have never once been asked, by a reviewer, about a sentence. I have been asked about words, and about whether a version is faithful».",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l5-24",
              no: 24,
              text: "What is the difficulty with the nineteen-word sentence?",
              options: ["It is too long for English", "The vocabulary in it has no equivalent at all", "The author's meaning is unclear", "English cannot delay the verb that long"],
              answer: 3,
              explain:
                "Güçlük sözdiziminde: «English will not delay a verb that long». Anlam belirsiz değil; sorun bilgiyi mi yoksa sondaki sarsıntıyı mı korumak gerektiği.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l5-25",
              no: 25,
              text: "What does the writer concede to the opposing view?",
              options: ["Literal translation is always the better choice", "Reviewers understand the work well", "Reaching for effect makes books sound alike", "Theory answers the question"],
              answer: 2,
              explain:
                "Üçüncü paragraf ödünü veriyor: «A translator who reaches for effect too readily produces books that all sound the same», ve bu tehlikeye karşı duran anlayışı savunanların aptal olmadığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-l5-26",
              no: 26,
              text: "What does the writer propose?",
              options: ["A short note on the hardest choices", "A ban on reviewing translations at all", "Naming the translator on the cover", "Retranslating the eleven books"],
              answer: 0,
              explain:
                "Öneri dördüncü paragrafta: «a note of three lines explaining the two or three places where the choice was hardest». Yayıncıların buna izin vermemesi de asıl savunulamaz bulunan şey.",
            },
          ],
        },
        {
          id: "en-c1-06-l6",
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
              body: "Every argument here is conducted between people who read both languages. The reader who does not is the entire market and is never quoted. What they want from a translation is not fidelity or beauty; it is a book they can finish, and nobody in this debate has asked them.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "I compared four translations of the same novel against the original, sentence by sentence, for two years. What I expected was systematic difference. What I found was that all four diverge in the same eleven places and agree almost everywhere else, which suggests the difficulty is in the text rather than in the translator.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "The dispute is between two claims that never meet. That some effects cannot be carried across is a statement about languages. That a particular translator failed is a statement about a person, and the second is almost always what is meant when the first is said.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "Nobody has defined the term. The word faithful has meant at least four incompatible things in this discussion alone, and until somebody fixes it, every side can claim the word and none of them is arguing with anybody.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "We have been here before, and not long ago. The same argument, with much the same examples, ran through the eighteen-nineties and was settled by nothing; it simply stopped when the participants died.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-06-l6-27",
              no: 27,
              text: "Which writer reports a finding that contradicted their expectation?",
              answer: "b",
              explain:
                "Writer B beklentisini ve bulgusunu yan yana koyuyor: «What I expected was systematic difference. What I found was that all four diverge in the same eleven places», ve bundan güçlüğün metinde olduğu sonucunu çıkarıyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l6-28",
              no: 28,
              text: "Which writer says that two different kinds of claim are being confused?",
              answer: "c",
              explain:
                "Writer C iki sav türünü ayırıyor: diller hakkında bir sav ile bir kişi hakkında bir sav, «and the second is almost always what is meant when the first is said».",
            },
            {
              kind: "match",
              id: "en-c1-06-l6-29",
              no: 29,
              text: "Which writer says that a key term is used in incompatible ways?",
              answer: "d",
              explain:
                "Writer D sözcüğü sayıyor: «The word faithful has meant at least four incompatible things in this discussion alone», ve tanım yapılmadıkça tartışmanın kurulamayacağını söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l6-30",
              no: 30,
              text: "Which writer says the people most affected are absent from the debate?",
              answer: "a",
              explain:
                "Writer A eksik tarafı gösteriyor: iki dili okumayan okur «is the entire market and is never quoted», üstelik istediği şey de tartışılan ölçütlerin hiçbiri değil.",
            },
          ],
        },
        {
          id: "en-c1-06-l7",
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
              title: "The dictionary that took forty years",
              body: `In 1957 a small team began a dictionary of a language with about four thousand speakers and no written tradition. The plan was straightforward: record the words, define them in the national language, publish.

{{31}}

The first difficulty was not linguistic. The speakers cooperated, the recordings were good and the team was competent. What defeated the original plan was the definitions: almost every entry required a paragraph about who may say the word, to whom, and when.

{{32}}

Later volumes made the shape of the problem clearer. The words that could be defined in a line were overwhelmingly the ones borrowed from the national language, which suggests that the difficulty lay not in the language but in the distance between the two.

{{33}}

This has an implication that the team did not welcome. If the entries that are easy to write are the borrowed ones, then a dictionary produced under time pressure will describe the language as more similar to its neighbour than it actually is.

{{34}}`,
              gloss: [
                { de: "an entry", tr: "madde (sözlükte)", en: "dictionary entry" },
                { de: "a compiler", tr: "derleyici", en: "compiler" },
                { de: "ethnography", tr: "etnografya", en: "ethnography" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The first volume appeared in 1971 and covered the letter A." },
            { key: "b", label: "b", body: "Nobody had planned for that, and the format eventually adopted looks less like a dictionary than like a very short ethnography." },
            { key: "c", label: "c", body: "That finding is now quoted more often than the dictionary itself, which the surviving compilers find both gratifying and irritating." },
            { key: "d", label: "d", body: "The last volume appeared in 1997, and the team's own introduction says plainly which entries they no longer trust." },
            { key: "e", label: "e", body: "Field recording equipment of that period weighed about eleven kilograms and required mains power." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-06-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Giriş planı «record the words, define them … publish» diye özetliyor; (a) o planın gerçekte ne kadar sürdüğünü tek cümlede gösteriyor: on dört yılda yalnız A harfi. Başlıktaki kırk yıl da buradan anlaşılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "b",
              explain:
                "Önceki paragraf her maddenin «a paragraph about who may say the word, to whom, and when» gerektirdiğini söylüyor; (b) bunun planlanmamış olduğunu ve benimsenen biçimin sözlükten çok etnografyaya benzediğini ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Önceki paragraf asıl bulguyu veriyor: bir satırda tanımlanabilen sözcükler ödünç alınmış olanlar. (c) «That finding» ile o bulguya gönderme yapıp bugünkü ününü anlatıyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Son paragraf rahatsız edici çıkarımı veriyor: sözlük dili «more similar to its neighbour than it actually is» gösterecek. (d) ekibin bununla ne yaptığını söyleyip yazıyı kapatıyor: hangi maddelere artık güvenmediklerini kendi önsözlerine yazmışlar. (e) kayıt cihazlarının ağırlığından söz ediyor ve metnin hiçbir yerinde donanım tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-06-l8",
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
              label: "a — Literary translator",
              body: "People ask me which language is the hardest and I tell them, and it does not help, which used to irritate me. The answer is accurate. What it cannot carry is that the hardest text I have done was in the language I know best, because I could hear everything I was losing.",
            },
            {
              key: "b",
              label: "b — Publisher",
              body: "We began printing the translator's name on the cover four years ago. Sales did not move by any measurable amount. Reviews changed: about a third now discuss the English as English, which they did not before. I would not have predicted which of those two things would move.",
            },
            {
              key: "c",
              label: "c — Language teacher",
              body: "The literature says that exposure to varied texts builds judgement, and I do not dispute it. My difficulty is practical: a student reads whatever is on the syllabus that term, and nobody is arranging for them to meet the passage that cannot be done. We call it reading and treat it as though it were training.",
            },
            {
              key: "d",
              label: "d — Reviewer",
              body: "I have reviewed translations for eleven years and I would defend most of what I wrote. What I would not defend is that I almost never said which decisions I was praising, so a reader could not tell whether I had compared anything at all.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-06-l8-35",
              no: 35,
              text: "Which text says that an accurate answer misses what actually matters?",
              answer: "a",
              explain:
                "Çevirmen cevabın doğruluğunu kabul edip eksiği adlandırıyor: «What it cannot carry is that the hardest text I have done was in the language I know best».",
            },
            {
              kind: "match",
              id: "en-c1-06-l8-36",
              no: 36,
              text: "Which text reports an outcome the speaker had not predicted?",
              answer: "b",
              explain:
                "Yayıncı iki sonucu karşılaştırıyor: satışlar kıpırdamamış, değerlendirmeler değişmiş. «I would not have predicted which of those two things would move».",
            },
            {
              kind: "match",
              id: "en-c1-06-l8-37",
              no: 37,
              text: "Which text says that what is called learning is left to chance?",
              answer: "c",
              explain:
                "Öğretmen rastlantıyı adlandırıyor: «a student reads whatever is on the syllabus that term» ve yapılamayacak pasajla karşılaşmayı kimse ayarlamıyor. «We call it reading and treat it as though it were training».",
            },
            {
              kind: "match",
              id: "en-c1-06-l8-38",
              no: 38,
              text: "Which text criticises a failure to say what was being judged?",
              answer: "d",
              explain:
                "Eleştirmen kendi yazdıklarını değil, belirsizliği eleştiriyor: «I almost never said which decisions I was praising, so a reader could not tell whether I had compared anything at all».",
            },
            {
              kind: "match",
              id: "en-c1-06-l8-39",
              no: 39,
              text: "Which text says the hardest case came from the most familiar material?",
              answer: "a",
              explain:
                "Çevirmen gerekçeyi de veriyor: en iyi bildiği dildeki metin en zoruymuş, «because I could hear everything I was losing». Aşinalık işi kolaylaştırmıyor, kaybı duyulur kılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-06-l8-40",
              no: 40,
              text: "Which text defends the work it also criticises?",
              answer: "d",
              explain:
                "İki cümle yan yana duruyor: «I would defend most of what I wrote» ve «What I would not defend is …». Savunma yazıların içeriğine, eleştiri ise neyin övüldüğünün söylenmemesine.",
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
          id: "en-c1-06-h1",
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
              situation: "İki çevirmen bir yeniden çeviriyi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Tomo", text: "The retranslation is better, and I say that as somebody who defended the old one in print for a decade. What I still cannot defend is that we let the old version go out of print." },
                { speaker: "Lior", text: "The print decision is not ours. It belongs to the publisher." },
                { speaker: "Tomo", text: "Which is precisely the objection, not an answer to it. If we let a publisher decide which version exists, we are pretending there is one book, and we should at least say so in the introduction." },
                { speaker: "Lior", text: "I would go along with saying so. I would resist the next step, which is to make a translator responsible for the entire backlist policy of a company." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir altyazı çevirmeni işini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You have said that subtitling is a different problem from translation. In what way?" },
                { speaker: "Subtitler", text: "In one obvious way and one that people miss. The obvious one is space: forty characters and two seconds. The one people miss is that the original is still audible. A reader of a novel cannot hear what I removed; a viewer can hear the tone of a line I have flattened, and they know." },
                { speaker: "Host", text: "Does that make the job harder?" },
                { speaker: "Subtitler", text: "It makes it more honest, which is not the same thing. I am corrected by the film in real time, and no translator of books has that." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi bir araştırma bulgusunu aktarıyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "There is a finding in this field worth repeating whenever somebody claims that a word is untranslatable. When speakers of two languages are asked to sort the same set of situations, the boundaries they draw do differ, but the disagreement within each language is almost always larger than the difference between them." },
                { speaker: "Lecturer", text: "The interesting variation is not between languages; it is between people, and the untranslatability literature has spent a century looking at the smaller of the two numbers." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-06-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Tomo's criticism?",
              options: ["The new version is inaccurate in places", "The old version is no longer available", "The introduction is too long"],
              answer: 1,
              explain:
                "Tomo yeni çeviriyi baştan üstün buluyor: «The retranslation is better, and I say that as somebody who defended the old one in print for a decade». Eleştirisi eskisinin baskıdan kaldırılması.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h1-2",
              no: 2,
              ref: "a1",
              text: "What does Lior accept and what does he refuse?",
              options: ["The note but not a wider duty", "The criticism but not the note", "Neither part"],
              answer: 0,
              explain:
                "Lior ayrımı kendisi yapıyor: «I would go along with saying so», ama «I would resist the next step, which is to make a translator responsible for the entire backlist policy».",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h1-3",
              no: 3,
              ref: "a2",
              text: "What does the subtitler say people miss?",
              options: ["The limit on characters", "The speed at which the dialogue is spoken", "That viewers can still hear the source"],
              answer: 2,
              explain:
                "Konuşmacı iki güçlüğü ayırıyor: karakter sınırı «the obvious one», gözden kaçan ise «that the original is still audible». Seyirci düzleştirilmiş bir tonu duyabiliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h1-4",
              no: 4,
              ref: "a2",
              text: "How does she describe the effect of that?",
              options: ["It makes the work almost impossible", "It makes the work more honest", "It makes the work faster"],
              answer: 1,
              explain:
                "Kendi cümlesi: «It makes it more honest, which is not the same thing» — yani daha zor demiyor, gerçek zamanlı olarak düzeltildiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the research show?",
              options: ["Variation within a language exceeds variation between languages", "Speakers of different languages agree almost entirely with each other", "Boundaries are drawn identically"],
              answer: 0,
              explain:
                "Bulgu iki değişkenliği karşılaştırıyor: «the disagreement within each language is almost always larger than the difference between them». Sınırlar farklı çiziliyor, yani aynı değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h1-6",
              no: 6,
              ref: "a3",
              text: "What is the lecturer's criticism of the literature?",
              options: ["It is too recent", "It uses the wrong languages for comparison", "It has studied the smaller effect"],
              answer: 2,
              explain:
                "Son cümle: «the untranslatability literature has spent a century looking at the smaller of the two numbers». Eleştiri dil seçimine değil, hangi değişkenliğe bakıldığına.",
            },
          ],
        },
        {
          id: "en-c1-06-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting the results of a translation funding programme. Complete the sentences, questions 7 to 14, with a word, a number or a short phrase. You hear the report ONCE only.",
          promptTr:
            "Bir çeviri destek programının sonuçlarını anlatan bir adamı dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük, bir sayı ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Program sorumlusu kurula sonuçları sunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Thank you. I will give you the headline figures and I will not pretend they are comfortable. The programme funded two hundred and forty translations between 2015 and 2024, of which one hundred and eighty have been published. The average grant is nine thousand euros, which is about a third of what the work costs at a professional rate. Here is the first finding: the strongest predictor of whether a book finds a second publisher is not the reviews, it is whether the translator has worked with the same author before. Second, the language pair matters much less than we expected. Third, the format of our application. We tried a long form, a short form and a conversation, and the conversation produced the most complete information, which is expensive and which we have kept. Fourth, a caution: the translators we most want to fund are the ones least likely to apply, and we have not solved that. And finally, money. Seventy per cent of our budget comes from a single ministry that reviews the programme every three years.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Translation programme — headline figures",
              body: `Translations funded:     {{7}}
Translations published:  {{8}}
Average grant:           {{9}} euros
The grant covers about a {{10}} of the professional cost.
The strongest predictor of a second publisher is whether the translator has worked with the same {{11}} before.
The application format that worked best was the {{12}}.
The translators the programme most wants to fund are the least likely to {{13}}.
{{14}} per cent of the budget comes from one ministry.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-06-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["240", "two hundred and forty"],
              explain:
                "«The programme funded two hundred and forty translations» — desteklenen toplam. Yüz seksen ise yayımlananların sayısı; iki sayı aynı cümlede geçiyor.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["180", "one hundred and eighty"],
              explain:
                "«of which one hundred and eighty have been published» — yayımlanan sayı. İki yüz kırk, desteklenenlerin tamamı.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["9000", "nine thousand"],
              explain:
                "«The average grant is nine thousand euros» — ortalama destek tutarı. Cümlede `euros` basılı olduğu için boşluğa yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["third"],
              explain:
                "«which is about a third of what the work costs at a professional rate» — desteğin gerçek maliyete oranı. Cümlede `a` basılı olduğu için boşluğa yalnız kesir adı yazılır.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["author"],
              explain:
                "Kayıt beklentiyi bozuyor: en güçlü belirleyici «is not the reviews, it is whether the translator has worked with the same author before». Değerlendirmeleri yazan öğrenci çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["conversation"],
              explain:
                "Üç biçim denenmiş ve «the conversation produced the most complete information». Pahalı olmasına rağmen sürdürülüyor; uzun ve kısa form elenen biçimler.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["apply"],
              explain:
                "En rahatsız edici bulgu: «the translators we most want to fund are the ones least likely to apply». Sorun seçimde değil, başvuru anında.",
            },
            {
              kind: "gap",
              id: "en-c1-06-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["70", "seventy"],
              explain:
                "«Seventy per cent of our budget comes from a single ministry that reviews the programme every three years» — tek kaynağa bağlılık ve üstelik üç yılda bir gözden geçirme.",
            },
          ],
        },
        {
          id: "en-c1-06-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about funding translations. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Çeviri desteği üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel",
              situation: "Üç konuşmacı yeniden çevirilerin desteklenmesini tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Uma, you have argued that the programme should stop funding retranslations. That is unpopular." },
                { speaker: "Uma", text: "It is, and I want to be exact about it. My objection is not to retranslation; it is to funding a fourth version of a book that already has three while nine hundred titles have none. That is an allocation question, not a literary one." },
                { speaker: "Chair", text: "Vida?" },
                { speaker: "Vida", text: "I accept the arithmetic and I think it hides something. A retranslation is often the only way a book reaches a reader at all, because the existing version is fifty years old and unreadable. Calling that a fourth version flattens a real difference." },
                { speaker: "Chair", text: "Dragan, does that resolve it?" },
                { speaker: "Dragan", text: "It relocates it. What both of them are describing is a decision about who the programme is for: the literature or the reader. Nobody has written that down, and every disagreement we have had in eleven years has been this one wearing a different coat." },
                { speaker: "Chair", text: "Uma, is there evidence about which retranslations get read?" },
                { speaker: "Uma", text: "Almost none, and I would rather say so. We have sales figures for about a fifth of the titles and they are not comparable across countries. That is not enough to build a policy on, and I notice that everybody here, including me, has an anecdote that supports their own position." },
                { speaker: "Chair", text: "Vida, what about the effect on translators?" },
                { speaker: "Vida", text: "That is the part that worries me most. A programme that funds only first translations rewards whoever gets to a book first, and the person who gets there first is the person with the most free time. That is not the same as the best translator, and it will not correct itself." },
                { speaker: "Chair", text: "Dragan, a last word." },
                { speaker: "Dragan", text: "Only that the comparison with publishing a new novel is misleading. A publisher who backs a new novel is betting on a market that does not exist yet. We are choosing between books that already exist in another language, which is a smaller and much more answerable question. I would drop the analogy." },
              ],
              gloss: [
                { de: "a retranslation", tr: "yeniden çeviri", en: "retranslation" },
                { de: "allocation", tr: "kaynak dağıtımı", en: "allocation" },
                { de: "an anecdote", tr: "tek olaya dayalı örnek", en: "anecdote" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-06-h3-15",
              no: 15,
              ref: "c1",
              text: "What exactly is Uma objecting to?",
              options: ["Spending on titles that are already available", "Retranslation in principle", "The quality of the most recent retranslations overall", "The size of the grants"],
              answer: 0,
              explain:
                "Uma itirazını kendisi sınırlıyor: «My objection is not to retranslation; it is to funding a fourth version of a book that already has three while nine hundred titles have none».",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-16",
              no: 16,
              ref: "c1",
              text: "What does Vida say a retranslation can be?",
              options: ["A way of correcting errors", "A source of income for translators", "The only route to a reader", "A response to criticism"],
              answer: 2,
              explain:
                "«A retranslation is often the only way a book reaches a reader at all», çünkü eldeki sürüm elli yıllık ve okunmaz durumda. Hata düzeltmek ya da gelir sağlamak kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-17",
              no: 17,
              ref: "c1",
              text: "How does Dragan characterise the disagreement?",
              options: ["As a straightforward dispute about money", "As an unwritten choice of audience", "As a misunderstanding", "As a question that has already been settled"],
              answer: 1,
              explain:
                "Dragan ikisini de aynı karara bağlıyor: «a decision about who the programme is for: the literature or the reader», ve bunun hiç yazıya geçirilmediğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-18",
              no: 18,
              ref: "c1",
              text: "What does Uma say about the evidence?",
              options: ["It supports her position", "It is fully comparable across all countries", "It has been suppressed", "There is far too little of it"],
              answer: 3,
              explain:
                "Uma kanıtın azlığını kabul ediyor: beşte bir için satış verisi var ve ülkeler arası karşılaştırılamıyor. «That is not enough to build a policy on», üstelik herkesin kendi lehine bir örneği olduğunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-19",
              no: 19,
              ref: "c1",
              text: "What does Vida say about funding only first translations?",
              options: ["It would save money", "It would improve the quality considerably", "It rewards whoever is free soonest", "It would be popular"],
              answer: 2,
              explain:
                "Vida düzeneği açıyor: «rewards whoever gets to a book first, and the person who gets there first is the person with the most free time», ve bunun en iyi çevirmenle aynı şey olmadığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-20",
              no: 20,
              ref: "c1",
              text: "Why does Dragan reject the comparison with new novels?",
              options: ["Here the books already exist", "New novels are more profitable", "Publishers take fewer risks now", "Translation is slower"],
              answer: 0,
              explain:
                "Dragan farkı belirsizlikte buluyor: yeni romanda «a market that does not exist yet» üzerine bahse giriliyor, oysa burada kitaplar başka bir dilde zaten var ve soru daha yanıtlanabilir.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-21",
              no: 21,
              ref: "c1",
              text: "Which speaker says that a problem will not correct itself?",
              options: ["Uma", "Dragan", "The chair", "Vida"],
              answer: 3,
              explain:
                "Vida'nın kendi cümlesi: «That is not the same as the best translator, and it will not correct itself». Uma kanıt yokluğundan, Dragan ise benzetmenin yanlışlığından söz ediyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-06-h3-22",
              no: 22,
              ref: "c1",
              text: "Which speaker concedes the arithmetic of another?",
              options: ["Dragan", "Vida", "Uma", "None of them"],
              answer: 1,
              explain:
                "Vida açıkça kabul ediyor: «I accept the arithmetic and I think it hides something». Yani Uma'nın sayısını çürütmüyor, eksik bulduğunu söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-06-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about translation and publishing. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Çeviri ve yayıncılık üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to withdraw a claim they made earlier" },
            { key: "b", label: "to separate two questions that are usually merged" },
            { key: "c", label: "to explain why a project was abandoned" },
            { key: "d", label: "to predict that a rule will be worked around" },
            { key: "e", label: "to give the credit for a decision to somebody else" },
            { key: "f", label: "to object to a comparison used in the debate" },
            { key: "g", label: "to point to a cost that appears in no budget" },
            { key: "h", label: "to ask for a decision to be postponed" },
            { key: "i", label: "to defend a colleague who has been criticised" },
            { key: "j", label: "to say that the evidence is too thin to act on" },
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
                { text: "For years I argued in print that machine output was useless as a first draft and that anybody using it would produce flat prose. Two colleagues I respect now use it and their books do not read flat. I was wrong about that, and it seems better to say so than to be quoted against myself later." },
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
                { text: "We keep hearing that a translation is inaccurate. Two entirely different questions are being run together there: whether a sentence says something the original does not, and whether the whole reads as the original reads. The first can be checked by anybody with a dictionary. The second cannot be checked at all, and it is the one people mean." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bırakılan bir projeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "We spent two years on a parallel edition with the original on the left and the translation on the right. It was not abandoned because it failed; the pages people photographed and shared were always the left-hand ones. The design was teaching readers to distrust the thing we had paid for, so we stopped." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir kararın sahibini gösteriyor.",
              plays: 2,
              segments: [
                { text: "I have been thanked in three reviews for putting the translator on the cover, and it was not my decision. It was proposed by a junior editor in a meeting in 2019, twice, and refused twice before anybody listened. Her name is in the minutes and it should be in the reviews." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bir benzetmeyi reddediyor.",
              plays: 2,
              segments: [
                { text: "People keep saying that a translation is a performance, like a pianist playing a score. It is a comforting picture and it fails in the way that matters. A listener who dislikes the performance can hear the notes underneath it. A reader who dislikes a translation has nothing underneath at all, which is the whole of the difficulty." },
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
                { text: "The book appears in our accounts as a fee of six thousand euros. What appears nowhere is that the translator wrote to the author eleven times, read two earlier novels that will never be published here, and spent a fortnight on a glossary that the printer removed. Nobody has ever been asked to put a figure on that." },
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
                { text: "A great deal has been said this week about the translator of that novel, most of it by people who have not read the original. She flagged the passage in her note, she gave her reasoning, and the note was cut by the publisher. If we want to criticise somebody, the correspondence makes it perfectly clear who." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı kararın ertelenmesini istiyor.",
              plays: 2,
              segments: [
                { text: "I am not against the new guidance in principle, and I want that on the record. What I am asking for is ten weeks. The survey of translators reports in June, and adopting the guidance in April means adopting it without the one document that might change somebody's mind." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-06-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı yazılı olarak savunduğu görüşü geri alıyor: «I was wrong about that, and it seems better to say so than to be quoted against myself later».",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "«Two entirely different questions are being run together there» — tek bir cümlenin yanlışlığı ile bütünün okunuşu. Biri sözlükle denetlenebilir, öteki hiç denetlenemez.",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı bırakma nedenini veriyor ve başarısızlığı açıkça dışlıyor: «It was not abandoned because it failed». Neden, tasarımın okuru kendi ürünlerine güvensizliğe alıştırması.",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "e",
              explain:
                "Konuşmacı kendisine verilen payeyi reddedip sahibini gösteriyor: «It was proposed by a junior editor in a meeting in 2019 … Her name is in the minutes and it should be in the reviews».",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "f",
              explain:
                "Konuşmacı tartışmada kullanılan benzetmeyi hedef alıyor: dinleyici notaları duyabilir ama «A reader who dislikes a translation has nothing underneath at all».",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "g",
              explain:
                "Görünen ücretle görünmeyen emek karşılaştırılıyor: altı bin euro hesapta var, «What appears nowhere is that the translator wrote to the author eleven times».",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Konuşmacı eleştirilen çevirmeni koruyor: pasajı notunda belirtmiş, gerekçesini vermiş ve not yayıncı tarafından çıkarılmış. «the correspondence makes it perfectly clear who».",
            },
            {
              kind: "match",
              id: "en-c1-06-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Talep açık ve süreli: «What I am asking for is ten weeks», çünkü çevirmen anketi haziranda raporlanıyor. Konuşmacı ilkece karşı olmadığını da kayda geçiriyor.",
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
          id: "en-c1-06-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on translation. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. A translation should reproduce as closely as possible what the original says.\n2. A translation should reproduce as closely as possible what the original does to a reader.\n\nWrite 220 to 260 words.",
          promptTr:
            "Çeviri üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Çeviri, aslın SÖYLEDİĞİNİ olabildiğince yakın aktarmalı.\n2. Çeviri, aslın okurda YAPTIĞINI olabildiğince yakın aktarmalı.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two points raised in the seminar are usually presented as a choice, and the difficulty is that a translator has to make it several times on every page rather than once at the start.

The case for reproducing what the original says rests on verifiability. A reader who does not know the source language has no way of auditing a translator's judgement about effect, whereas a claim about reference can at least be checked. It is worth adding that the alternative has historically been used to justify a great deal of quiet improvement, and that the reader who wanted this author has a legitimate complaint about it.

The second point concerns what a reader actually receives. A sentence that is accurate at every word and lands with no force has not carried the original across in any sense the author would recognise; it has produced a document about the original. On this account, refusing to make a judgement about effect is itself a judgement, and a concealed one.

I regard the second as the more important, though for a narrower reason than is usually offered. The first can be recovered by a note; the second cannot be recovered at all, because a reader who has been bored by a page does not go back to it.

My own view is that the choice is made false by the format. A translation that carried three lines about its own hardest decisions would let a reader see the trade-off, and nobody at the seminar was willing to discuss why publishers do not permit it.`,
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
          id: "en-c1-06-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to translate its public information into three further languages using an automatic system with light human checking. Write a report for its management. Describe the current arrangement, assess the likely effects, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum, halka açık bilgilerini üç dile daha, hafif insan denetimli otomatik bir sistemle çevirmek üzere. Yönetime bir rapor yaz. Mevcut düzeni anlat, olası etkileri değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the current arrangement precisely.", tr: "Mevcut düzeni kesin biçimde anlat." },
              { de: "Assess both the gains and the risks.", tr: "Hem kazancı hem riski değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed automatic translation of public information

Current arrangement
Our public pages exist in two languages. The second version is produced by an external translator at a cost of about four thousand euros a year and is updated within ten working days of a change to the first. Of the eleven complaints we received last year about the second version, nine concerned pages that had not been updated rather than pages that were wrong.

Assessment
The gain is real and it is chiefly about speed: an automatic system would remove the ten-day gap, which our own complaints data identifies as the main problem. Two risks are not in the proposal. The first is uneven failure: the system will be reliable on ordinary prose and least reliable on exactly the material where an error is expensive, namely eligibility rules and deadlines. The second is that light checking tends to become no checking, because a checker who has found nothing wrong for six weeks stops reading closely.

Recommendation
I recommend adopting the system for descriptive pages and retaining human translation for the sections that state entitlements, dates and money, which are about a tenth of the total. I would not recommend applying it uniformly, since the pages where speed matters least are precisely the pages where errors matter most. I would also advise against evaluating the change by counting complaints, as an error that produces a missed deadline generates no complaint at all.`,
            criteria: [
              "Mevcut düzen sayı ve süreyle mi anlatıldı?",
              "Hem kazanç hem risk değerlendirildi mi?",
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
          id: "en-c1-06-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about languages, reading and what gets lost between them.",
          promptTr: "Sana diller, okuma ve diller arasında kaybolanlar hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe something you have read in translation that you suspect was different in the original?", tr: "Günaydın. Çeviriden okuduğun ve aslında farklı olduğundan kuşkulandığın bir şeyi anlatır mısın?" },
            { who: "you", hint: "Somut bir örnek seç ve kuşkunun nereden geldiğini adlandır.", expect: "somut bir örnek vermek ve kendi kuşkusunu gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think a reader without the original can ever judge a translation, or is that beyond them?", tr: "Teşekkürler. Sence aslı elinde olmayan bir okur bir çeviriyi yargılayabilir mi, yoksa bu onun sınırının ötesinde mi?" },
            { who: "you", hint: "Bir konum al ama karşı görüşe bir pay bırak.", expect: "bir konum almak ve karşı görüşe pay bırakmak", seconds: 50 },
            { who: "partner", de: "And how would you decide whether a translation had been improved or merely modernised?", tr: "Bir çevirinin iyileştirildiğine mi yoksa yalnız güncellendiğine mi karar vermek için ne yapardın?" },
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
              "The clearest case for me was a novel where every character spoke in the same register, which I doubt was true of a book that had won a prize for its dialogue. I could not check it, and that is exactly the position most readers are in. I would say a reader without the original can judge a great deal — whether a page holds together, whether the jokes work — although I have to concede that they cannot judge the one thing they are usually asked about. As for improvement against modernisation, I would look at whether the new version is easier in the places the old one was easy, or only in the places it was hard.",
            criteria: [
              "Örnek somut mu ve çözümlendi mi?",
              "Konum alınırken karşı görüşe pay bırakıldı mı?",
              "Ölçüt önerildi ve gerekçelendirildi mi?",
              "Çekimserlik ifadeleri C1 düzeyinde mi? (I would say, although, I doubt)",
            ],
          },
        },
        {
          id: "en-c1-06-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. A publisher can either commission a first translation of a book that has never appeared in your language, or a new translation of a classic that already has three. Set out the case for each, say which you would choose, and identify the strongest argument against your own choice.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir yayıncı ya dilinde hiç yayımlanmamış bir kitabın ilk çevirisini ya da zaten üç çevirisi olan bir klasiğin yeni çevirisini ısmarlayabilir. Her ikisinin de savunmasını kur, hangisini seçeceğini söyle ve kendi seçimine karşı en güçlü savı adlandır.",
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
              "The case for the first translation is arithmetical and, I think, close to decisive: a book that exists in no version is unavailable to everybody, whereas a classic with three versions is available to anybody who wants it, however imperfectly. The case for the retranslation is subtler and not merely commercial. A version from 1958 can be unreadable in a way that amounts to unavailability, and pretending that a book is accessible because a copy exists is a librarian's answer rather than a reader's. I would commission the first translation. The strongest argument against my own choice is that it assumes a reader who is looking, and the reader who would have been reached by a fresh classic is usually not looking at all; new translations are how a book re-enters circulation, and the first translation of an unknown novel very often enters nothing. I do not think that defeats the case, but anybody choosing as I have should say how the book will be found.",
            criteria: [
              "İki savunma da adil biçimde kuruldu mu?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi seçimine karşı en güçlü sav adlandırıldı mı, yoksa zayıf bir hâli mi kuruldu?",
              "İki dakika boyunca yapı korunabildi mi?",
              "Soyut sözcük dağarcığı C1 düzeyinde mi? (availability, circulation, decisive)",
            ],
          },
        },
        {
          id: "en-c1-06-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A funding body must decide how to spend a one-year budget on translation. Talk with me about the options, defend two of them, and settle a priority order with me.",
          promptTr:
            "Bir destek kurumu çeviri için bir yıllık bütçeyi nasıl harcayacağına karar verecek. Seçenekleri benimle konuş, ikisini savun ve benimle bir öncelik sırası belirle.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: raising the grant per book, funding more books at the current rate, paying for translators' notes to be printed, commissioning a survey of who actually reads translated fiction, and supporting first translations only. Which two would you defend, and on what criterion?", tr: "Seçenekler: kitap başına desteği artırmak, aynı tutarla daha çok kitap desteklemek, çevirmen notlarının basımını finanse etmek, çeviri edebiyatı kimin okuduğuna dair bir araştırma ısmarlamak ve yalnız ilk çevirileri desteklemek. Hangi ikisini savunursun, hangi ölçütle?" },
            { who: "you", hint: "İki seçenek seç ve ölçütünü açıkça adlandır.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you. A survey reads nobody a book, and a year spent on research is a year of titles not funded. Is that not exactly the wrong thing to buy?", tr: "Üsteleyeyim. Bir araştırma kimseye kitap okutmuyor ve araştırmaya ayrılan bir yıl, desteklenmeyen kitaplar demek. Alınacak en yanlış şey tam da bu değil mi?" },
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
              "I would defend raising the grant per book and funding the survey, on the criterion of what the programme cannot recover later: a translator who leaves the profession because the rate is a third of the cost does not come back, and a decision made blind in year one is repeated in every year after it. Your objection to the survey is fair and I want to concede part of it; what I would defend is a very small survey aimed at one question, namely who buys these books, which costs a fraction of a title. So: raise the rate first, because the labour is the constraint; run the narrow survey second, because everything after this year depends on it; print the notes third, since they are cheap and they change how the work is reviewed. I would drop the first-translations-only rule this year and say plainly why, rather than adopt a policy we cannot yet justify.",
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

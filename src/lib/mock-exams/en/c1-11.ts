import type { MockPaper } from "../types";

/**
 * C1 · Deneme 11 — "Measurement, Targets and What Gets Counted".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Hedef ve ölçüm konusu C1
 * için verimli çünkü tartışma iyi niyetle kötü niyet arasında değil: sayıya
 * bir sonuç bağlandığı anda sayının ölçtüğü şey değişiyor, ve bu, dürüst
 * insanlardan kurulu bir kurumda da olur. Devrik kuruluş, yarma cümle ve
 * adlaştırma bu savın doğal dili.
 *
 * Onuncu kâğıdın uzun görüş metni bir gazete yazısı, dinlemesi bir paneldi.
 * Burada bilerek iki tür de değişti: uzun metin bir kitap eleştirisi, yani
 * başkasının savını tartan bir metin; dinlemede panel yerine bir ders ve
 * salondan gelen sorular var.
 */
export const EN_C1_11: MockPaper = {
  id: "en-c1-11",
  course: "en",
  level: "C1",
  no: 11,
  theme: "Measurement, Targets and What Gets Counted",
  themeTr: "Ölçüm, hedefler ve sayılan şeyler",
  minutes: 215,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 80,
      instruction:
        "This part has eight tasks. You read texts with gaps, sentences to rewrite, a review, five short texts, a text with missing paragraphs and four short texts.",
      instructionTr:
        "Bu bölümde sekiz görev var. Boşluklu metinler, yeniden yazılacak cümleler, bir eleştiri yazısı, beş kısa metin, paragrafı eksik bir metin ve dört kısa metin okuyacaksın.",
      tasks: [
        {
          id: "en-c1-11-l1",
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
              title: "Eight minutes",
              body: `The eight-minute target was introduced for an entirely {{1}} reason. Before it existed, nobody could say how long an ambulance took to arrive, and the answer varied by region in ways that were suspected, resented and impossible to demonstrate.

Within four years the proportion of calls answered inside eight minutes had risen from sixty-eight to eighty-four per cent, and the average time taken to reach the patient's side had not {{2}} at all.

The two figures are not in conflict. The clock is stopped when a vehicle arrives at the address, and a service under pressure will {{3}} its resources towards the part of the journey that is counted. The allocation of vehicles is settled months in advance, and it is settled against the figure that will be published. A rapid-response car reaches the kerb inside the target; the crew and the equipment that will actually treat the patient arrive some minutes later, and no instrument records that gap.

None of this required anybody to behave dishonestly, which is the part most commentators {{4}}. Every individual decision in that chain was defensible, and several were clinically sensible. What changed was not the intentions of the service but the {{5}} of its attention, and attention follows measurement as reliably as water follows a channel.

Rarely is a target withdrawn once it has been published, and the reasons are political rather than technical. A figure that has been quoted in a hundred speeches acquires a constituency, and abandoning it looks like an admission that the previous decade was {{6}} away.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-11-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["respectable", "honourable", "creditable", "admirable"],
              answer: 0,
              explain:
                "Paragraf hedefin savunulabilir bir gerekçeyle kurulduğunu söylüyor: kimse süreyi bilmiyordu. `a respectable reason` bu yerleşik anlamı verir; öteki üçü ahlaki övgü bildirir ve `reason` ile eş dizim yapmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["altered", "amended", "shifted", "converted"],
              answer: 2,
              explain:
                "Cümle ortalama sürenin hiç değişmediğini söylüyor ve `shift` bir ölçüm değerinin yer değiştirmesini anlatır. `amended` metin düzeltmede, `converted` biçim değiştirmede kullanılır; `altered` ise `at all` ile bu yapıda zayıf kalır.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["deviate", "divert", "distract", "displace"],
              answer: 1,
              explain:
                "Kaynaklar sayılan bölüme yönlendiriliyor: `divert its resources towards`. `deviate` nesnesiz kullanılır, `distract` dikkati dağıtır, `displace` ise yerinden eder.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["oversee", "overtake", "overrule", "overlook"],
              answer: 3,
              explain:
                "Yorumcuların gözden kaçırdığı nokta anlatılıyor: `the part most commentators overlook`. `oversee` denetlemek, `overtake` geçmek, `overrule` ise bir kararı geçersiz kılmaktır.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["guidance", "instruction", "direction", "orientation"],
              answer: 2,
              explain:
                "Değişen şey hizmetin niyeti değil, dikkatinin yönü: `the direction of its attention`. `guidance` yol gösterme, `instruction` talimat, `orientation` ise konumlanmadır.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["cast", "thrown", "wasted", "spent"],
              answer: 1,
              explain:
                "`throw away` bir dönemin boşa harcanmasını anlatır ve cümlede `away` var. `cast away` denizde kalmayı çağrıştırır, `wasted away` erimeyi, `spent away` ise kurulu bir eş dizim değildir.",
            },
          ],
        },
        {
          id: "en-c1-11-l2",
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
              title: "The measurement changes the thing measured",
              body: `A figure that is merely observed and a figure to which a consequence is attached are two different objects, {{7}} they are written in the same units and printed in the same column.

Attach a consequence and the number begins to describe the response to the target rather than the condition it was built to report. It is {{8}} this that the literature means by a perverse indicator.

Nor {{9}} the effect confined to dishonest institutions. It appears wherever effort is finite and attention is directed, which is to say everywhere.

{{10}} follows is not corruption but reallocation. Staff move towards what is counted, and the movement is usually visible in the records as an improvement.

At no point {{11}} it necessary for anybody to decide to mislead. The distortion is produced by the arrangement rather than by the people inside it, and would survive a complete change of personnel.

This is by {{12}} means an argument against measuring things, although it is regularly quoted as one.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-11-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["although", "though"],
              explain:
                "İki yarı arasında ödün ilişkisi var: aynı birimle yazılmalarına karşın iki ayrı nesne. `although` bunu kurar; `because` gerekçe verirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["by"],
              explain:
                "`It is by this that the literature means …` yarma cümlesinde araç `by` ile bildirilir; `mean by something` yerleşik kuruluştur.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "`Nor` ile başlayan cümle devrik kuruluş ister ve yardımcı fiil özneden önce gelir: «Nor is the effect confined».",
            },
            {
              kind: "gap",
              id: "en-c1-11-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["what"],
              explain:
                "Cümlenin öznesi bir ad tümcesi: «What follows is not corruption but reallocation». `That` öncül isterdi.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["was", "is"],
              explain:
                "`At no point` olumsuz öbeği cümle başına gelince devrik kuruluş zorunlu olur ve yardımcı fiil özneden önce gelir: «At no point was it necessary».",
            },
            {
              kind: "gap",
              id: "en-c1-11-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["no"],
              explain:
                "`by no means` kalıbı güçlü bir olumsuzlama bildirir ve cümle ölçmeye karşı olunmadığını söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-11-l3",
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
              title: "Performance indicators",
              body: `A performance indicator is a quantity selected to stand for a condition that cannot be observed directly, and its central weakness is the {{13}} that occurs once the quantity itself becomes the object of effort.

The literature distinguishes deliberate manipulation from the {{14}} adjustment of priorities that follows any published figure, and treats the second as by far the more common.

Indicators are defended on the ground that they make institutions answerable to the public, and this claim to {{15}} is the strongest argument in their favour.

Critics reply that the {{16}} on a single number produces an institution well adapted to that number and to nothing else.

A further difficulty is the {{17}} that the selected quantity moves in step with the condition it represents, which is rarely tested after the indicator is adopted.

Reviews of long-running schemes conclude that most of the damage attributed to targets is {{18}} rather than designed, and that revising an indicator is politically harder than introducing one.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-11-l3-13",
              no: 13,
              text: "DISTORT",
              accept: ["distortion"],
              explain:
                "`the ___ that occurs` bir ad ister ve anlatılan şey ölçünün bozulması; çekimli `distort` bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l3-14",
              no: 14,
              text: "INTEND",
              accept: ["unintended"],
              explain:
                "Kasıtlı çarpıtma ile karşıtlık kuruluyor, dolayısıyla sıfat olumsuz ön ek alır: `the unintended adjustment`.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l3-15",
              no: 15,
              text: "ACCOUNT",
              accept: ["accountability"],
              explain:
                "`this claim to ___` bir ad ister ve kurumların halka hesap verebilirliği anlatılıyor; `accounting` muhasebeyi bildirir.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l3-16",
              no: 16,
              text: "RELY",
              accept: ["reliance"],
              explain:
                "`the ___ on a single number` yapısı `on` tümleci alan bir ad ister: `reliance on`. `reliability` güvenilirliktir ve bu edatı almaz.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l3-17",
              no: 17,
              text: "ASSUME",
              accept: ["assumption"],
              explain:
                "`the ___ that the selected quantity moves` yapısı `that` tümceciği alan bir ad ister ve sınanmayan şey bir varsayımdır.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l3-18",
              no: 18,
              text: "ACCIDENT",
              accept: ["accidental"],
              explain:
                "`is ___ rather than designed` yapısı `designed` ile eşlenen bir sıfat ister; ad olan `accident` bu karşıtlığı kuramaz.",
            },
          ],
        },
        {
          id: "en-c1-11-l4",
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
              id: "en-c1-11-l4-19",
              no: 19,
              text: "Nobody has ever explained why that particular figure was chosen.\nAt no point ______ why that particular figure was chosen.",
              cue: "BEEN",
              accept: ["has it been explained"],
              explain:
                "`At no point` cümle başına gelince devrik kuruluş zorunludur ve edilgen zincir `has been + üçüncü hâl` biçimini alır; biçimsel özne `it` yan tümceyi karşılar.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l4-20",
              no: 20,
              text: "The crews changed their behaviour, not their intentions.\nIt ______ the crews changed, not their intentions.",
              cue: "BEHAVIOUR",
              accept: ["was their behaviour that"],
              explain:
                "Yarma cümle bir öğeyi öne çıkarır: `It was X that …`. Vurgulanan öğe ad öbeği olduğu için `that` bağlacı gerekir.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l4-21",
              no: 21,
              text: "Measuring something well is more difficult than people assume.\nThere is more ______ than people assume.",
              cue: "MEASURING",
              accept: ["to measuring something well"],
              explain:
                "`There is more to X than …` kalıbı bir şeyin göründüğünden karmaşık olduğunu bildirir ve `to` edatı ad-eylem ister.",
            },
            {
              kind: "gap",
              id: "en-c1-11-l4-22",
              no: 22,
              text: "It is widely believed that the figure was chosen for political reasons.\nThe figure is ______ chosen for political reasons.",
              cue: "WIDELY",
              accept: ["widely believed to have been"],
              explain:
                "Kişisiz edilgen `It is believed that …` kişili edilgene çevriliyor; yan tümce ana fiilden önceye ait olduğu için mastar geçmiş biçime girer: `to have been`.",
            },
          ],
        },
        {
          id: "en-c1-11-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the review and answer questions 23 to 26. Choose a, b, c or d.",
          promptTr: "Eleştiri yazısını oku ve 23–26. maddeleri yanıtla. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Book review",
              genreTr: "Kitap eleştirisi",
              title: "A useful book that argues with the wrong opponent",
              body: `Selma Kurtay's study of public targets is the most careful account of the subject to appear in a decade, and it is at its best where the material is driest. Her reconstruction of a single ambulance service between 2004 and 2011 occupies eighty pages and could have occupied twice as many without losing the reader, largely because she resists the temptation to tell us what to think until the evidence has been laid out.

Her central claim is by now familiar, and she states it more precisely than her predecessors: the distortion produced by a target is a property of the arrangement rather than of the people inside it, and would survive a complete change of personnel. The chapter that demonstrates this, using two services with markedly different cultures and near-identical patterns of drift, is the best thing in the book.

Where the study is weaker is in its choice of opponent. Kurtay writes as though the case for measurement were being made by people who believe numbers are neutral, and she dismantles that position at length. Almost nobody now holds it. The serious defence of targets concedes the distortion at the outset and argues that the alternative, which is discretion exercised behind closed doors and never compared across regions, produced inequalities that were larger, older and entirely invisible. That argument appears in the book only in a footnote, where it is described as nostalgic.

The omission matters because it shapes the conclusion. Having established that indicators distort, Kurtay proceeds as though the burden of proof had shifted permanently onto anyone who wants to count anything. It has not. A target that is known to distort in a measurable way may still be preferable to an arrangement whose failures nobody can observe, and the comparison is empirical rather than philosophical.

None of which should deter the reader. The book is a genuine contribution and its final chapter, on the difficulty of withdrawing a published figure, ought to be read by anybody who has ever proposed one. It is simply a study that wins its argument and leaves the harder question untouched.`,
              gloss: [
                { de: "drift", tr: "yavaş kayma", en: "drift" },
                { de: "discretion", tr: "takdir yetkisi", en: "discretion" },
                { de: "nostalgic", tr: "geçmişe özlem duyan", en: "nostalgic" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-11-l5-23",
              no: 23,
              text: "What does the reviewer most admire about the book?",
              options: [
                "Its brevity on technical matters",
                "Its willingness to name individuals",
                "Its patience with detailed evidence",
                "Its treatment of earlier scholarship",
              ],
              answer: 2,
              explain:
                "Eleştirmen kitabın en iyi olduğu yeri belirtiyor: «at its best where the material is driest», çünkü yazar okuru yönlendirmeden önce kanıtı seriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l5-24",
              no: 24,
              text: "Why does the reviewer single out the chapter comparing two services?",
              options: [
                "It shows the effect despite different cultures",
                "It relies on a much larger sample than the rest",
                "It is the only chapter written in plain language",
                "It corrects an error made by earlier writers",
              ],
              answer: 0,
              explain:
                "Bölümün kanıt gücü kültür farkından geliyor: «two services with markedly different cultures and near-identical patterns of drift».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l5-25",
              no: 25,
              text: "What is the reviewer's main criticism?",
              options: [
                "The evidence is drawn from a single decade",
                "The book argues against a position few now hold",
                "The author's own preferences are never declared",
                "The statistical methods are inadequately described",
              ],
              answer: 1,
              explain:
                "Eleştirmen rakip seçimini sorun ediyor: yazar sayıları yansız sayanlara karşı yazıyor, oysa «Almost nobody now holds it».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-l5-26",
              no: 26,
              text: "What does the reviewer say about the book's conclusion?",
              options: [
                "It contradicts the evidence in the middle chapters",
                "It repeats the argument of the opening chapter",
                "It is stated too cautiously to be useful",
                "It assumes a burden of proof that has not moved",
              ],
              answer: 3,
              explain:
                "Eleştirmen sonucun dayanağını reddediyor: yazar ispat yükünün kalıcı olarak sayanlara geçtiğini varsayıyor, «It has not», ve karşılaştırma görgül bir sorundur.",
            },
          ],
        },
        {
          id: "en-c1-11-l6",
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
              body: "The objection to targets is usually made by people who have never had to defend an allocation of resources to anybody outside their own profession. Before the figures existed, the variation between regions was larger, older and completely undocumented, and the people who suffered from it had no language in which to complain. I would rather argue about a bad number than about nothing.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "What interests me is not the distortion, which is well established, but the asymmetry in what happens next. A target that is failing is revised within a year. A target that is being met while the underlying condition worsens can run for a decade, because everybody who could raise the alarm is being assessed on the figure that is going up.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "I ran a service under three successive indicators and I never once saw anybody falsify anything. What I saw was quieter and more corrosive: rotas built around the clock rather than the patient, and a slow drift in what the word urgent meant among people who would have been offended by the suggestion that they had changed at all.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "The technical fix is available and it is not exciting. Publish the distribution rather than the proportion, and the incentive to concentrate effort at the threshold disappears overnight, because there is no longer a cliff to stand next to. That we continue to publish a single percentage is a decision about presentation, not a limitation of statistics.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "Every generation rediscovers this problem and names it after a different economist, and the rediscovery is always presented as news. The insight is at least a century old and can be found, in almost the same words, in the literature on piece rates in nineteenth-century factories. What has changed is the scale, not the mechanism.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-11-l6-27",
              no: 27,
              text: "Which writer argues that the problem is not new?",
              answer: "e",
              explain:
                "(e) sorunun yaşını veriyor: «The insight is at least a century old», ve on dokuzuncu yüzyıl parça başı ücret yazınına gönderme yapıyor.",
            },
            {
              kind: "match",
              id: "en-c1-11-l6-28",
              no: 28,
              text: "Which writer says a solution already exists?",
              answer: "d",
              explain:
                "(d) çözümü adlandırıyor: «Publish the distribution rather than the proportion», ve tek yüzdeyi yayımlamanın bir sunum tercihi olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-11-l6-29",
              no: 29,
              text: "Which writer describes a change that those involved did not notice?",
              answer: "c",
              explain:
                "(c) kaymayı içeriden anlatıyor: «a slow drift in what the word urgent meant», üstelik değiştiğini söyleseniz gücenecek insanlar arasında.",
            },
            {
              kind: "match",
              id: "en-c1-11-l6-30",
              no: 30,
              text: "Which writer points out that failing and succeeding targets are treated differently?",
              answer: "b",
              explain:
                "(b) bakışımsızlığı veriyor: başarısız hedef bir yılda değişiyor, tutan hedef ise on yıl sürebiliyor çünkü alarmı verecek herkes o rakamla değerlendiriliyor.",
            },
          ],
        },
        {
          id: "en-c1-11-l7",
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
              title: "The number that could not be withdrawn",
              body: `The eight-minute figure was never intended to survive the decade in which it was set. The working group that produced it recorded, in a minute that nobody read for fifteen years, that it was provisional and should be reviewed once better data existed. {{31}}

Better data duly arrived. By 2009 the service could describe the whole distribution of response times, including the long tail that the single proportion had always concealed, and several senior officers said in public that the target had done its work and should be retired. {{32}}

The obstacle was not evidence and it was not cost. It was that the figure had been quoted by three ministers, printed on four hundred thousand leaflets and used, by the service itself, in every argument it had won since 2005. {{33}}

There is a general lesson here about the life cycle of a public number, and it is not the one usually drawn. A target does not fail because it is wrong. It fails because it succeeds, acquires defenders, and outlives the question it was invented to answer. {{34}}

The eight-minute figure was eventually replaced in 2017, and the replacement was announced as a technical adjustment rather than as a change of policy. That was, on balance, the only way it could have been done.`,
              gloss: [
                { de: "provisional", tr: "geçici", en: "provisional" },
                { de: "a long tail", tr: "uzun kuyruk (dağılımda)", en: "long tail" },
                { de: "a life cycle", tr: "yaşam döngüsü", en: "life cycle" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Retiring it would therefore have required somebody to explain what the previous twelve years had been about, and no institution volunteers for that. The figure was defended by people who privately agreed with every criticism of it.",
            },
            {
              key: "b",
              label: "b",
              body: "The minute was accurate about its own limitations and entirely wrong about what would happen next. Nothing that is published to the public and then quoted back at an institution remains provisional for long.",
            },
            {
              key: "c",
              label: "c",
              body: "Nothing happened. The distribution was published in an appendix, the proportion continued to appear in the summary, and the two coexisted for eight further years without anybody being required to reconcile them.",
            },
            {
              key: "d",
              label: "d",
              body: "The practical implication is uncomfortable for reformers: the moment to design the withdrawal of an indicator is the moment it is introduced, because after that the constituency grows faster than the evidence does.",
            },
            {
              key: "e",
              label: "e",
              body: "Response times in rural areas have always been longer, and the geography of the region has not changed materially since the nineteenth century.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-11-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış tutanağın rakamı geçici saydığını söylüyor: «it was provisional and should be reviewed». (b) o tutanağın kendi sınırında haklı, sonrasında yanılmış olduğunu ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-11-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "c",
              explain:
                "Paragraf çağrıyı veriyor: «several senior officers said in public that the target had done its work and should be retired». (c) sonucu veriyor: hiçbir şey olmadı, dağılım ekte kaldı, oran özet sayfada sürdü.",
            },
            {
              kind: "match",
              id: "en-c1-11-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "a",
              explain:
                "Paragraf engeli sayarak gösteriyor: «printed on four hundred thousand leaflets» ve üç bakanın alıntıladığı bir rakam. (a) bunun sonucunu veriyor: geri çekmek on iki yılın hesabını vermeyi gerektirirdi.",
            },
            {
              kind: "match",
              id: "en-c1-11-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Paragraf genel dersi veriyor: «It fails because it succeeds, acquires defenders, and outlives the question it was invented to answer». (d) bunun uygulamadaki karşılığını ekliyor: geri çekilme, göstergenin kurulduğu anda tasarlanmalı. (e) kırsal sürelerin uzunluğundan ve coğrafyadan söz ediyor; metinde bölge farkı hiç tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-11-l8",
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
              label: "a — Former service director",
              body: "I signed off the rotas that everybody now criticises, and I would sign them again with the information I had. The target was the only thing anybody above me read. What I would change is not the decision but the reporting: had the distribution been published alongside the proportion, the rota would have looked indefensible on paper within a month, and I would have lost the argument that I won.",
            },
            {
              key: "b",
              label: "b — Statistician",
              body: "A proportion measured against a threshold is the least informative summary available, and it is chosen precisely because it is easy to say. The distribution costs nothing extra to compute; it has been sitting in the same database since 2006. What prevents its publication is that it does not produce a sentence that fits into a speech.",
            },
            {
              key: "c",
              label: "c — Paramedic",
              body: "Nobody told us to game anything and nobody had to. You learn quickly which calls make the difference to the figure, and you are not consciously choosing when you turn left rather than right. Twelve years later I could not tell you when my sense of what counts as urgent changed, only that it is not what it was.",
            },
            {
              key: "d",
              label: "d — Health economist",
              body: "The counterfactual is what this debate keeps refusing to state. The alternative to a distorting target is not a well-run service; it is the arrangement that preceded it, in which allocation was decided regionally, defended by no one and compared with nothing. On the evidence, that was worse, and saying so is not a defence of the eight-minute figure.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-11-l8-35",
              no: 35,
              text: "Which text says that a change in judgement happened without being noticed?",
              answer: "c",
              explain:
                "(c) farkındalık olmadan gerçekleşen kaymayı anlatıyor: «I could not tell you when my sense of what counts as urgent changed, only that it is not what it was».",
            },
            {
              kind: "match",
              id: "en-c1-11-l8-36",
              no: 36,
              text: "Which text says the better figure is already available?",
              answer: "b",
              explain:
                "(b) verinin hazır olduğunu söylüyor: «it has been sitting in the same database since 2006», engel hesaplama değil sunum.",
            },
            {
              kind: "match",
              id: "en-c1-11-l8-37",
              no: 37,
              text: "Which text insists that the comparison must be with what came before?",
              answer: "d",
              explain:
                "(d) karşılaştırma noktasını adlandırıyor: «The alternative to a distorting target is not a well-run service; it is the arrangement that preceded it».",
            },
            {
              kind: "match",
              id: "en-c1-11-l8-38",
              no: 38,
              text: "Which text says the writer would have been defeated by better information?",
              answer: "a",
              explain:
                "(a) kendi aleyhine bir sonuç kuruyor: dağılım da yayımlansaydı «I would have lost the argument that I won».",
            },
            {
              kind: "match",
              id: "en-c1-11-l8-39",
              no: 39,
              text: "Which text explains a choice by what fits into political speech?",
              answer: "b",
              explain:
                "(b) engeli dile bağlıyor: «it does not produce a sentence that fits into a speech».",
            },
            {
              kind: "match",
              id: "en-c1-11-l8-40",
              no: 40,
              text: "Which text denies that anybody was instructed to manipulate the figure?",
              answer: "c",
              explain:
                "(c) talimatı reddediyor: «Nobody told us to game anything and nobody had to», çünkü hangi çağrının rakamı değiştirdiği kendiliğinden öğreniliyor.",
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
        "This part has four tasks. You hear three extracts, a report, a lecture with questions and eight short monologues.",
      instructionTr:
        "Bu bölümde dört görev var. Üç parça, bir sunum, soru alan bir ders ve sekiz kısa konuşma dinleyeceksin.",
      tasks: [
        {
          id: "en-c1-11-h1",
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
              situation: "Bir gazeteci ile eski bir hizmet yöneticisi rakamı konuşuyor.",
              plays: 2,
              segments: [
                { text: "Do you regret the rotas?" },
                { text: "Not with the information I had. The target was the only line anybody above me read, and I built around it, and I would do it again on the same evidence." },
                { text: "That sounds like a defence." },
                { text: "It is an explanation, which is a different thing. What I would change is what was published. Put the whole distribution next to the proportion and my rota looks indefensible inside a month." },
                { text: "So you would have lost the argument." },
                { text: "I would have lost it, and the service would have been better for it. That is not a comfortable sentence and I have had eleven years to find a better one." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki araştırmacı göstergenin nasıl seçildiğini konuşuyor.",
              plays: 2,
              segments: [
                { text: "Why a proportion rather than the distribution?" },
                { text: "Because you can say it. Eighty-four per cent inside eight minutes is a sentence. A distribution is a shape, and a shape does not survive being read aloud in a chamber." },
                { text: "Is that not slightly cynical?" },
                { text: "It is descriptive. The computation is trivial and the data has been there since 2006. Nothing technical has ever stood in the way, and pretending the obstacle is technical wastes everybody's time." },
                { text: "So the fix is presentational." },
                { text: "The fix is presentational and that is exactly why it has not happened." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Bir ekonomist ile bir sunucu ölçmenin alternatifini konuşuyor.",
              plays: 2,
              segments: [
                { text: "You are not defending the eight-minute figure." },
                { text: "I am not. I am objecting to the comparison being made against a service that never existed. The alternative was not a well-run system. It was regional allocation, defended by nobody and compared with nothing." },
                { text: "And that was worse?" },
                { text: "On the evidence we have, considerably. The variation between districts before 2004 was larger than anything the target produced, and nobody outside the districts could see it, which is the part that matters." },
                { text: "So we keep the target." },
                { text: "We keep counting. Whether we keep this particular number is a separate question and I would answer it differently." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-11-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the director's attitude to his own decisions?",
              options: ["He regrets them deeply now", "He would repeat them on that evidence", "He blames those who set the target for him"],
              answer: 1,
              explain:
                "Yönetici kendi kararını bilgi durumuna bağlıyor: «Not with the information I had … I would do it again on the same evidence».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h1-2",
              no: 2,
              ref: "a1",
              text: "What does he say about publishing more?",
              options: ["It would have defeated his own case", "It would have confused the public badly", "It was refused by the ministry"],
              answer: 0,
              explain:
                "Yönetici sonucu kendi aleyhine kuruyor: «I would have lost it, and the service would have been better for it».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h1-3",
              no: 3,
              ref: "a2",
              text: "Why is a proportion preferred?",
              options: ["It is cheaper to calculate", "It is more accurate in practice than the alternative", "It can be spoken in one sentence"],
              answer: 2,
              explain:
                "Araştırmacı gerekçeyi veriyor: «Eighty-four per cent inside eight minutes is a sentence. A distribution is a shape».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h1-4",
              no: 4,
              ref: "a2",
              text: "What does the second speaker say about the obstacle?",
              options: ["It has nothing to do with technique", "It is the age of the database", "It is the cost of new software"],
              answer: 0,
              explain:
                "Araştırmacı teknik engeli reddediyor: «Nothing technical has ever stood in the way», veri 2006'dan beri duruyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h1-5",
              no: 5,
              ref: "a3",
              text: "What is the economist objecting to?",
              options: ["A comparison with an imaginary service", "The accuracy of the records kept before 2004", "The tone of the current debate"],
              answer: 0,
              explain:
                "İktisatçı karşılaştırmayı reddediyor: «objecting to the comparison being made against a service that never existed».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h1-6",
              no: 6,
              ref: "a3",
              text: "What is his position on the eight-minute figure itself?",
              options: ["He would defend it in public", "He separates it from counting", "He wants it applied more widely"],
              answer: 1,
              explain:
                "İktisatçı ikisini ayırıyor: «We keep counting. Whether we keep this particular number is a separate question».",
            },
          ],
        },
        {
          id: "en-c1-11-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting the results of a review of a response-time target. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir müdahale süresi hedefinin incelemesini sunan bir kadını dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
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
                  text: "Thank you. These are the findings, including the ones we were not hoping for. The target requires arrival within eight minutes. We examined forty-one thousand calls made over three years. In twelve per cent of those, the recorded arrival and the moment a crew reached the patient differed by more than four minutes. After the target was introduced, nine per cent of calls were reclassified into a lower category. The proportion answered within the target rose from sixty-eight per cent to eighty-four. The average time to reach the patient's side did not change. The clock, as you know, is stopped at the kerb. Our central recommendation is that the single proportion be replaced by the distribution, and our second is that reclassification be reported separately every quarter.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Review of the response-time target",
              body: `The target requires arrival within {{7}} minutes.

The review examined calls made over {{8}} years.

The two recorded times differed by more than four minutes in {{9}} per cent of cases.

After the target was introduced, {{10}} per cent of calls were reclassified.

The proportion answered within the target rose to {{11}} per cent.

The average time to reach the patient's {{12}} did not change.

The clock is stopped at the {{13}}.

The main recommendation is to publish the {{14}} instead of the single proportion.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-11-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["8", "eight"],
              explain:
                "Sunum hedefi tanımlıyor: «The target requires arrival within eight minutes». Dört dakika, iki kayıt arasındaki farkın eşiğidir.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["3", "three"],
              explain:
                "«forty-one thousand calls made over three years» — inceleme süresi. Kırk bir bin, çağrı sayısıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["12", "twelve"],
              explain:
                "«In twelve per cent of those, the recorded arrival and the moment a crew reached the patient differed by more than four minutes» — iki kaydın ayrıştığı oran.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["9", "nine"],
              explain:
                "«nine per cent of calls were reclassified into a lower category» — yeniden sınıflandırma oranı. On iki, kayıt farkına aitti.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["84", "eighty-four"],
              explain:
                "«rose from sixty-eight per cent to eighty-four» — varılan oran. Altmış sekiz, başlangıç değeridir.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["side"],
              explain:
                "«The average time to reach the patient's side did not change» — değişmeyen ölçüm. Adrese varış ise hedefin ölçtüğü andır.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["kerb", "curb"],
              explain:
                "«The clock, as you know, is stopped at the kerb» — saatin durdurulduğu nokta; hastanın yanına varış ayrıca ölçülüyor.",
            },
            {
              kind: "gap",
              id: "en-c1-11-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["distribution"],
              explain:
                "«the single proportion be replaced by the distribution» — asıl öneri. İkinci öneri yeniden sınıflandırmanın ayrı raporlanmasıdır.",
            },
          ],
        },
        {
          id: "en-c1-11-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear part of a lecture on public targets, followed by questions from the audience. Choose a, b, c or d for questions 15 to 22. You hear the recording ONCE only.",
          promptTr:
            "Kamusal hedefler üzerine bir dersin bir bölümünü ve ardından salondan gelen soruları dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Lecture and questions",
              genreTr: "Ders ve sorular",
              situation: "Tarek Solmaz ders veriyor, sonra salondan üç soru alıyor.",
              plays: 1,
              segments: [
                { text: "I want to start by removing the moral vocabulary, because it is doing most of the damage in this field. Gaming, cheating, massaging: every one of those words implies an individual who decided something, and the effect I am describing survives the removal of every such individual." },
                { text: "Consider a service in which nobody lies. Effort is finite. Attention is directed at what is reported upwards. Within eighteen months the reported figure improves and the underlying condition does not, and you can produce this result in a simulation with no dishonest agents in it at all." },
                { text: "The second point is about asymmetry, and it is the one I would keep if I could keep only one. A target that is being missed generates pressure to change the target. A target that is being met while the thing beneath it deteriorates generates no pressure whatsoever, because everybody positioned to notice is being assessed on the number that is rising." },
                { text: "Third, and this is where I part company with most of my colleagues: none of this is an argument for abolishing measurement. The counterfactual is not a well-run service. It is the arrangement that preceded measurement, and in the case I know best that arrangement concealed regional differences considerably larger than anything the target subsequently produced." },
                { text: "Question from the floor: are you saying the distortion is acceptable?" },
                { text: "I am saying it is priced. A known distortion of a known size is a cost you can carry deliberately. An unknown one is not a smaller cost; it is an uncounted one, and the two get confused constantly in this debate." },
                { text: "Second question: what would you actually change?" },
                { text: "One thing, and it is unglamorous. Publish the distribution, not the proportion. The moment there is no threshold, there is no edge to concentrate effort at, and about half of the behaviour we have been calling gaming simply has nowhere to go." },
                { text: "Last question: why has that not been done?" },
                { text: "Because a distribution cannot be said in a sentence, and public accountability in this country is conducted almost entirely in sentences. That is not a technical obstacle and it is the only real one." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-11-h3-15",
              no: 15,
              ref: "c1",
              text: "Why does the lecturer object to words like gaming?",
              options: [
                "They are too informal for academic use",
                "They imply a decision by an individual",
                "They were invented by journalists",
                "They apply only to private companies",
              ],
              answer: 1,
              explain:
                "Konuşmacı gerekçeyi veriyor: bu sözcükler «an individual who decided something» varsayıyor, oysa etki o bireyler çıkarılınca da sürüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-16",
              no: 16,
              ref: "c1",
              text: "What does the simulation demonstrate?",
              options: [
                "The effect appears without any dishonesty",
                "Most staff behave dishonestly under pressure",
                "Targets improve services in the short term",
                "Reported figures are usually inaccurate",
              ],
              answer: 0,
              explain:
                "Konuşmacı sonucu adlandırıyor: «you can produce this result in a simulation with no dishonest agents in it at all».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-17",
              no: 17,
              ref: "c1",
              text: "What is the asymmetry he describes?",
              options: [
                "Rural and urban services are judged differently",
                "Old targets are defended more than new ones",
                "Only a failing target creates pressure to change",
                "Managers and staff read the figures differently",
              ],
              answer: 2,
              explain:
                "Konuşmacı iki durumu karşılaştırıyor: tutmayan hedef baskı üretiyor, tutan hedef ise «generates no pressure whatsoever».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-18",
              no: 18,
              ref: "c1",
              text: "Where does he differ from most of his colleagues?",
              options: [
                "He thinks the effect is overstated in the literature",
                "He believes individual dishonesty is the main cause",
                "He wants targets set by an independent body",
                "He does not conclude that measurement should end",
              ],
              answer: 3,
              explain:
                "Konuşmacı ayrıldığı noktayı söylüyor: «none of this is an argument for abolishing measurement», çünkü karşılaştırma ölçümden önceki düzenlemeyle yapılmalı.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-19",
              no: 19,
              ref: "c1",
              text: "What does he say about the arrangement that preceded measurement?",
              options: [
                "It hid larger differences between regions",
                "It was cheaper to run than the current one",
                "It has been described inaccurately by critics",
                "It worked well in the districts he studied",
              ],
              answer: 0,
              explain:
                "Konuşmacı önceki düzeni değerlendiriyor: «that arrangement concealed regional differences considerably larger than anything the target subsequently produced».",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-20",
              no: 20,
              ref: "c1",
              text: "How does he answer the question about acceptability?",
              options: [
                "He says the distortion has been exaggerated",
                "He says a known cost can be carried deliberately",
                "He says the question cannot be answered yet",
                "He says the public should decide the matter",
              ],
              answer: 1,
              explain:
                "Konuşmacı kabul etmeyi fiyatlamaya çeviriyor: «A known distortion of a known size is a cost you can carry deliberately», bilinmeyen ise sayılmamış bir maliyettir.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-21",
              no: 21,
              ref: "c1",
              text: "What single change does he propose?",
              options: [
                "Auditing the figures more frequently",
                "Setting a second target alongside the first",
                "Publishing the distribution instead",
                "Removing the response-time target entirely",
              ],
              answer: 2,
              explain:
                "Konuşmacı tek öneriyi veriyor: «Publish the distribution, not the proportion», çünkü eşik kalkınca yığılacak bir kenar kalmıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-11-h3-22",
              no: 22,
              ref: "c1",
              text: "Why has the change not been made?",
              options: [
                "The data has not been collected",
                "The cost of the software is prohibitive",
                "Professional bodies have opposed it",
                "Accountability is conducted in sentences",
              ],
              answer: 3,
              explain:
                "Konuşmacı engeli adlandırıyor: dağılım bir cümleyle söylenemiyor ve hesap verme «almost entirely in sentences» yürütülüyor.",
            },
          ],
        },
        {
          id: "en-c1-11-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about targets and measurement. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Hedefler ve ölçüm üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to correct a misunderstanding about who is to blame" },
            { key: "b", label: "to describe a change the speaker did not notice happening" },
            { key: "c", label: "to explain why a simple solution has not been adopted" },
            { key: "d", label: "to concede a point while limiting what follows from it" },
            { key: "e", label: "to warn about what happens when a target succeeds" },
            { key: "f", label: "to insist on comparing the present with the past" },
            { key: "g", label: "to recommend abolishing published figures altogether" },
            { key: "h", label: "to complain about the workload created by reporting" },
            { key: "i", label: "to point out that the problem is an old one" },
            { key: "j", label: "to defend a decision the speaker now regrets" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı suçlama dilini düzeltiyor.",
              plays: 2,
              segments: [
                { text: "Every account of this reaches for the word cheating, and cheating requires somebody who chose. Take out every person who chose and run it again: the figure still rises and the service still does not improve. That is not a moral story and treating it as one has cost us fifteen years." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kendi değişimini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I could not give you the month it happened. I know that in 2006 I would have called that call urgent and by 2014 I would not, and nothing in between felt like a decision. You do not experience a drift while you are drifting." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kolay çözümün neden uygulanmadığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The distribution takes four lines of code and the data has been there since 2006. It is not published because it cannot be quoted, and a figure that cannot be quoted is of no use to anybody standing up in a chamber. That is the whole obstacle." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir noktayı kabul edip sınırlıyor.",
              plays: 2,
              segments: [
                { text: "Yes, the target distorts, and I will not spend a minute disputing it. What I do dispute is what people put after that sentence. It does not follow that we should stop counting, and it certainly does not follow that the previous arrangement was better." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı tutan hedefin tehlikesini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The dangerous target is not the one that is failing. That one gets revised within the year. The dangerous one is rising steadily while the thing underneath it gets worse, because every person who could raise a hand is being judged on the line that is going up." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı geçmişle karşılaştırmakta ısrar ediyor.",
              plays: 2,
              segments: [
                { text: "Compare it with what, though. Not with an ideal service, because there was never one. Before 2004 the difference between two neighbouring districts was bigger than anything we have measured since, and not one person outside those districts could have told you it existed." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı sorunun yaşını anlatıyor.",
              plays: 2,
              segments: [
                { text: "We name this after a different economist every twenty years and present it as a discovery. You will find the same argument, almost word for word, in the disputes about piece rates in the eighteen nineties. The scale has changed. The mechanism has not moved at all." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı verdiği kararı savunuyor.",
              plays: 2,
              segments: [
                { text: "I wrote those rotas and I have read every criticism of them. With what was on my desk, I would write them again, and I say that knowing how it sounds. What I would change is the reporting, not the decision, and I have stopped pretending those are the same admission." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-11-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Birinci konuşmacı suçlama çerçevesini düzeltiyor: seçen herkes çıkarılınca da rakam yükseliyor, «That is not a moral story».",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "İkinci konuşmacı fark etmediği değişimi anlatıyor: «You do not experience a drift while you are drifting».",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Üçüncü konuşmacı kolay çözümün önündeki engeli açıklıyor: «It is not published because it cannot be quoted».",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Dördüncü konuşmacı çarpıtmayı kabul edip sonucu sınırlıyor: «It does not follow that we should stop counting».",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Beşinci konuşmacı tehlikeyi tutan hedefe bağlıyor: «every person who could raise a hand is being judged on the line that is going up», oysa altındaki durum kötüleşiyor.",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Altıncı konuşmacı karşılaştırma noktasında ısrar ediyor: ideal bir hizmetle değil, 2004 öncesi ilçe farklarıyla.",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Yedinci konuşmacı sorunun yaşını veriyor: aynı tartışma «in the disputes about piece rates in the eighteen nineties» bulunuyor.",
            },
            {
              kind: "match",
              id: "en-c1-11-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "j",
              explain:
                "Sekizinci konuşmacı kararını savunuyor ama pişmanlığını da taşıyor: «I would write them again, and I say that knowing how it sounds».",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "This part has two tasks: an essay and a proposal.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir öneri metni.",
      tasks: [
        {
          id: "en-c1-11-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have listened to a lecture arguing that published targets distort the services they measure. Write an essay for your tutor discussing which of the following does most to limit that distortion, and explaining why the other two are weaker: publishing fuller data, changing the target regularly, or leaving judgement to professionals. Write 220 to 260 words.",
          promptTr:
            "Yayımlanan hedeflerin ölçtükleri hizmeti bozduğunu savunan bir ders dinledin. Danışmanın için bir deneme yaz: aşağıdakilerden hangisi bu bozulmayı en çok sınırlar ve öteki ikisi neden daha zayıftır? Daha ayrıntılı veri yayımlamak, hedefi düzenli olarak değiştirmek ya da kararı meslek erbabına bırakmak. 220–260 kelime.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Choose one option and argue for it.", tr: "Bir seçeneği seçip savun." },
              { de: "Explain why each of the other two is weaker.", tr: "Öteki ikisinin neden daha zayıf olduğunu açıkla." },
              { de: "Concede at least one point to an option you reject.", tr: "Reddettiğin bir seçeneğe en az bir noktada hak ver." },
              { de: "Reach a conclusion that follows from the argument.", tr: "Gövdeden çıkan bir sonuca var." },
            ],
            sample: `The distortion described in the lecture is a property of thresholds rather than of people, and this points fairly directly to the remedy that is likely to work.

Publishing fuller data is the strongest of the three options precisely because it attacks the mechanism instead of the motive. Effort concentrates at a threshold because a threshold is what is reported; replace the proportion with the whole distribution and there is no edge at which concentrating effort produces a visible gain. The change is technically trivial, which is itself instructive: the obstacle has always been that a distribution cannot be quoted in a speech, and that is a fact about political language rather than about statistics.

Changing the target regularly is weaker for a reason that its advocates rarely address. A target that moves is a target nobody can be held to, and the instability would be exploited more readily than the stability it replaces. It would also destroy comparison over time, which is the single most useful property any published series has.

Leaving judgement to professionals deserves more respect than it usually receives, and I will concede its central point: the people at the front understand the trade-offs better than any indicator can. What that argument omits is the arrangement it would restore. Discretion exercised regionally and compared with nothing concealed inequalities considerably larger than those the targets produced, and it concealed them from precisely the people who suffered from them.

I would therefore publish the distribution and keep the target, on the ground that a known distortion is cheaper than an unobservable one.`,
            criteria: [
              "Bir seçenek seçildi mi ve savunuldu mu?",
              "Öteki ikisi ayrı ayrı çürütüldü mü?",
              "Reddedilen bir görüşe hak verildi mi?",
              "Kayıt akademik mi ve bağlayıcılar çeşitli mi?",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-11-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know publishes a single monthly figure that has begun to shape its own behaviour. Write a proposal to its board. Set out the problem, propose one change, state what you deliberately do not propose, and say what evidence after twelve months would show that the change had failed. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kuruluş, kendi davranışını biçimlendirmeye başlamış tek bir aylık rakam yayımlıyor. Yönetim kuruluna bir öneri metni yaz. Sorunu ortaya koy, tek bir değişiklik öner, bilerek neyi önermediğini belirt ve on iki ay sonra hangi kanıtın başarısızlığı göstereceğini söyle. 220–260 kelime.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Set out the problem precisely.", tr: "Sorunu kesin biçimde ortaya koy." },
              { de: "Propose one change and say what you do not propose.", tr: "Tek bir değişiklik öner ve neyi önermediğini söyle." },
              { de: "State what would count as failure after twelve months.", tr: "On iki ay sonra neyin başarısızlık sayılacağını söyle." },
            ],
            sample: `Proposal: replace the monthly headline figure with a published distribution

The problem is not that our figure is inaccurate. It is accurate, and that is part of the difficulty. Since it was introduced in March, the proportion of enquiries answered within two working days has risen from seventy-one to eighty-eight per cent, while the median time to a resolved case has lengthened by a day and a half. Both movements are real, and both follow from the same cause: a threshold at two days makes an enquiry answered on day three worth nothing, and staff have responded rationally to that arrangement.

I propose one change. We should publish the full distribution of response times each month and retire the single proportion from the summary page. Where a headline is unavoidable, the median should be used, since it has no threshold for effort to gather at.

I am deliberately not proposing two things that will be raised. I am not proposing that we stop measuring response times, which would restore an arrangement in which nobody could compare one team with another. Nor am I proposing a second target for resolution, since a second threshold produces a second distortion and the two interact unpredictably.

The change should be judged after twelve months against a stated failure condition. If the distribution is published but the old proportion continues to appear in board papers and internal briefings, the reform has failed in the only way that matters, and we should say so rather than count the publication itself as success.`,
            criteria: [
              "Sorun sayılarla ve kesin biçimde konuldu mu?",
              "Tek bir değişiklik önerildi mi?",
              "Bilerek önerilmeyenler açıkça sayıldı mı?",
              "Başarısızlık ölçütü sınanabilir mi?",
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
          id: "en-c1-11-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about measurement in work and study.",
          promptTr: "Sana işte ve öğrenimde ölçme hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Has your work or study ever been judged by a single number?", tr: "Günaydın. İşin ya da öğrenimin hiç tek bir sayıyla değerlendirildi mi?" },
            { who: "you", hint: "Somut bir örnek ver ve ne ölçtüğünü söyle.", expect: "somut bir örnek verip ölçülen şeyi adlandırmak", seconds: 45 },
            { who: "partner", de: "Thank you. Did knowing the measure change how you worked?", tr: "Teşekkürler. Ölçütü bilmek çalışma biçimini değiştirdi mi?" },
            { who: "you", hint: "Değişimi tarif et; kaçınmaya çalışmadan.", expect: "kendi davranışındaki değişimi tarif etmek", seconds: 45 },
            { who: "partner", de: "And what would have been lost if nothing had been measured at all?", tr: "Hiçbir şey ölçülmeseydi ne kaybedilirdi?" },
            { who: "you", hint: "Karşı olguyu kur ve gerekçelendir.", expect: "karşı olgusal bir durumu kurmak ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give a concrete example and name what it measured", tr: "Somut bir örnek verip ölçüleni adlandırmak" },
              { de: "describe a change in one's own behaviour", tr: "Kendi davranışındaki değişimi anlatmak" },
              { de: "construct a counterfactual", tr: "Karşı olgusal bir durum kurmak" },
            ],
            sample:
              "My last team was judged on tickets closed per week, which is a measure of closure rather than of resolution, and the difference between those two words turned out to be the whole job. Knowing it changed what I picked up first: I took the short ones in the morning, and I would like to say I did not, but the pattern is in the record and it is not ambiguous. Had nothing been measured at all, the loss would have been comparability rather than accuracy — nobody could have shown that one team was carrying twice the load of another, which is exactly the argument the figure eventually won for us.",
            criteria: [
              "Örnek somut mu ve ölçülen şey adlandırıldı mı?",
              "Kendi davranışındaki değişim kabul edildi mi?",
              "Karşı olgusal yapı doğru kuruldu mu?",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
        {
          id: "en-c1-11-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. A public service can publish one of the following: a single percentage, the full distribution of its results, or nothing at all. Evaluate the three and say which you would choose, including what your choice costs.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir kamu hizmeti şunlardan birini yayımlayabilir: tek bir yüzde, sonuçların tam dağılımı ya da hiçbir şey. Üçünü değerlendir ve hangisini seçeceğini, seçiminin bedeliyle birlikte söyle.",
          prepSeconds: 60,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "evaluate all three options", tr: "Üç seçeneği de değerlendir" },
              { de: "choose one and justify the choice", tr: "Birini seçip gerekçelendir" },
              { de: "state what the choice costs", tr: "Seçimin bedelini söyle" },
            ],
            sample:
              "Publishing nothing is the option that sounds cautious and is in fact the most dangerous, because it does not remove judgement; it merely moves it somewhere unobservable, and the inequalities that grow under those conditions are the oldest and the least contested. A single percentage is the option that actually gets used, and its defect is structural rather than moral: a threshold creates an edge, and effort gathers at edges without anybody deciding that it should. The full distribution removes the edge, and what it costs is the sentence — you can no longer say the thing in eight words at a public meeting, and public accountability in most countries is conducted in eight-word sentences. I would publish the distribution and accept that cost, on the grounds that it is a cost in convenience rather than in information, and that the convenience is being paid for by whoever falls just outside the threshold.",
            criteria: [
              "Üç seçenek de değerlendirildi mi?",
              "Seçim gerekçelendirildi mi?",
              "Seçimin bedeli açıkça söylendi mi?",
              "Söylem işaretleyicileri ve adlaştırma kullanıldı mı?",
              "İki dakika sürdürüldü mü?",
            ],
          },
        },
        {
          id: "en-c1-11-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt: "We discuss the topic further together.",
          promptTr: "Konuyu birlikte biraz daha tartışıyoruz.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Is it fair to say that a target which distorts a service should simply be abolished?", tr: "Bir hizmeti bozan hedefin doğrudan kaldırılması gerektiğini söylemek doğru olur mu?" },
            { who: "you", hint: "Görüşünü söyle ve karşılaştırma noktasını belirt.", expect: "görüş bildirmek ve karşılaştırma noktasını adlandırmak", seconds: 50 },
            { who: "partner", de: "But somebody has to be responsible. Does your account not remove responsibility altogether?", tr: "Ama birinin sorumlu olması gerekir. Senin açıklaman sorumluluğu tümüyle ortadan kaldırmıyor mu?" },
            { who: "you", hint: "İtirazı ciddiye al ve sorumluluğu yeniden konumlandır.", expect: "bir itirazı ciddiye alıp kavramı yeniden konumlandırmak", seconds: 50 },
            { who: "partner", de: "And who should decide which figure is published: the service, the ministry or an independent body?", tr: "Hangi rakamın yayımlanacağına kim karar vermeli: hizmetin kendisi mi, bakanlık mı, bağımsız bir kurum mu?" },
            { who: "you", hint: "Bir taraf seç ve sakıncasını da an.", expect: "bir tarafı seçmek ve sakıncasını anmak", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "name the comparison being made", tr: "Yapılan karşılaştırmayı adlandırmak" },
              { de: "take an objection seriously and answer it", tr: "Bir itirazı ciddiye alıp yanıtlamak" },
              { de: "choose a side and admit its drawback", tr: "Bir tarafı seçip sakıncasını kabul etmek" },
            ],
            sample:
              "Abolition is only obviously right if the comparison is with a service that runs well without any published figure, and that service is hypothetical. Compared with what preceded the target, which was regional allocation that nobody could examine, even a distorting number looks defensible. Your objection is the serious one and I do not want to dissolve responsibility: what I would say is that it sits with whoever chose the threshold rather than with whoever worked next to it, and that is a shift in location, not an amnesty. As for who publishes, I would give it to an independent body, and the drawback is real — an independent body has no incentive to produce a figure anybody can use, and you can end up with something rigorous, unquotable and therefore ignored.",
            criteria: [
              "Karşılaştırma noktası adlandırıldı mı?",
              "İtiraz ciddiye alındı mı, geçiştirilmedi mi?",
              "Taraf seçildi ve sakıncası kabul edildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

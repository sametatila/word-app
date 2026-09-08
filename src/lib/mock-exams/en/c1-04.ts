import type { MockPaper } from "../types";

/**
 * C1 · Deneme 4 — "Risk, Forecasting and Precaution".
 *
 * C1'in öteki üç denemesiyle AYNI PLAN; konu ayrı. Risk ve öngörü alanı
 * C1 için verimli çünkü metnin kendisi olasılık dilini, çekimserliği ve
 * karşı savın en güçlü hâlini kurmayı gerektiriyor; okuma 5 ile dinleme 3
 * bunu doğrudan ölçüyor.
 *
 * C1 İMZALARI: devrik yapı, yarma cümle, çekimserlik belirteci ve
 * adlaştırma boşluksuz metinlerde geçiyor — imza taraması `{{n}}`
 * işaretini sözcük saymadığı için boşluklu görevlere yerleştirilemez.
 */
export const EN_C1_04: MockPaper = {
  id: "en-c1-04",
  course: "en",
  level: "C1",
  no: 4,
  theme: "Risk, Forecasting and Precaution",
  themeTr: "Risk, öngörü ve ihtiyat",
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
          id: "en-c1-04-l1",
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
              title: "The warning that existed",
              body: `Seldom has a profession been judged as harshly for being approximately right as weather forecasting was after the storm. The warning existed; it simply {{1}} to reach the people who needed it.

The usual explanation is arrogance, and it explains less than the retellings suggest. The forecast had assigned a low probability to the worst outcome, which is not at all the same as {{2}} it out, and the distinction was lost somewhere between the office and the broadcast.

A second factor tends to be {{3}} over. A probabilistic warning has no natural grammar in ordinary English; a presenter who says there is a one in five chance of severe damage is heard to be {{4}} the risk, whatever the words themselves say.

Whether the failure could have been avoided is an open question. Several services have since tried plain-language scales, and the evidence for them remains {{5}} at best. What does seem to work is nothing so grand: a named threshold, published in advance, that {{6}} the audience what will actually be done at each level.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-04-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["missed", "failed", "lacked", "refused"],
              answer: 1,
              explain:
                "`fail to do something` bir eylemin gerçekleşmemesini bildirir ve boşluktan sonra `to reach` mastarı geliyor. `miss` doğrudan nesne ister, `lack` ad ister ve `refuse` isteyerek reddetmeyi anlatır, oysa burada bir niyet yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["putting", "leaving", "striking", "ruling"],
              answer: 3,
              explain:
                "`rule something out` bir olasılığı tamamen dışlamak demektir ve cümlenin karşıtlığı tam bu: düşük olasılık vermek, dışlamakla aynı şey değil. `put out`, `leave out` ve `strike out` bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["passed", "gone", "looked", "seen"],
              answer: 0,
              explain:
                "`pass over something` bir konuyu atlamak, üzerinde durmamak demektir ve edilgen biçimde de bu anlamı korur: «tends to be passed over». `go over` gözden geçirmek, `look over` incelemek anlamına gelir, yani ikisi de tam tersini söyler.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["reducing", "lowering", "downplaying", "shrinking"],
              answer: 2,
              explain:
                "`downplay a risk` bir riski olduğundan küçük göstermektir; cümlenin konusu riskin kendisi değil, dinleyicinin algısı. `reduce` ve `lower` riski gerçekten azaltmayı, `shrink` ise fiziksel küçülmeyi bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["thin", "broad", "narrow", "light"],
              answer: 0,
              explain:
                "`thin evidence` kanıtın yetersizliğini anlatan yerleşik bir eşdizimdir ve `at best` ile birlikte çekimser bir yargı kurar. `narrow` kapsam darlığını, `broad` genişliği bildirir; `light evidence` ise İngilizcede kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["says", "speaks", "informs", "tells"],
              answer: 3,
              explain:
                "`tell somebody what …` yapısı doğrudan nesne alır. `say` nesneyi `to` ile bağlar, `speak` bu yapıda kullanılmaz ve `inform` ardından `of` ya da `about` ister, `what` yan cümlesini doğrudan almaz.",
            },
          ],
        },
        {
          id: "en-c1-04-l2",
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
              title: "Judged on a single case",
              body: `Forecasting has always been judged by a standard {{7}} no other branch of science is held to: it is expected to be right about one particular case.

A climatologist who says that a given summer had a one in twenty chance of occurring without warming is making a claim about a distribution, {{8}} the public hears a claim about a summer.

The confusion is not the public's fault. Nothing in ordinary language marks the difference, and there is no reason {{9}} anybody should have learned it.

What follows is a peculiar asymmetry. A forecaster who hedges is accused of evasion; one who does not hedge is accused of arrogance the moment a single case goes the other way. {{10}} way, the criticism arrives.

Some services have responded by publishing their record over hundreds of forecasts, which is the only fair test of the enterprise. It has made remarkably little difference, {{11}} the fact that the record is, on the whole, rather good.

The lesson is not that communication is hopeless. It is that a probability has to be translated into an instruction before it can {{12}} acted upon.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-04-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["that", "which"],
              explain:
                "Boşluk `a standard` adını niteleyen bir ilgi cümlesi başlatıyor ve edat cümlenin sonunda kalıyor («is held to»). Öncül cansız olduğu için `that` ya da `which` gelir; `what` kendi öncülünü taşıdığı için bu yapıda kullanılamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["whereas", "while", "but"],
              explain:
                "İki yarı doğrudan karşıtlık kuruyor: dağılım hakkında bir sav ile tek bir yaz hakkında bir sav. `whereas`, `while` ve `but` bu karşıtlığı kurar; `because` ilişkiyi sebebe çevirir ve savı bozar.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["why"],
              explain:
                "`there is no reason why …` kalıbında yan cümleyi `why` bağlar. `that` bu adla da kurulabilir ama ardından gelen `should have learned` yapısı gerekçe sorusunu istiyor; `for` ise mastar gerektirir, çekimli yüklem alamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["either"],
              explain:
                "`either way` iki seçeneğin de aynı sonucu verdiğini bildirir ve önceki cümle tam iki seçenek sunuyor: çekinen de çekinmeyen de eleştiriliyor. `any way` ve `each way` bu kalıbın yerini tutmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["despite"],
              explain:
                "`despite the fact that …` bir ödün öbeği kurar: sicil iyi olmasına rağmen fark yaratmamış. `although` doğrudan yan cümle alır ve `the fact that` ile birlikte kullanılmaz; `because` ise ilişkiyi tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["be"],
              explain:
                "`act on something` fiilinin edilgeni `be acted upon` biçimindedir ve kip fiilinden (`can`) sonra yalın hâl gerekir. `is` kip fiiliyle yan yana gelemez, `been` ise `have` ister.",
            },
          ],
        },
        {
          id: "en-c1-04-l3",
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
              title: "The precautionary principle",
              body: `The precautionary principle is the rule that action to prevent serious harm should not be delayed by the {{13}} of full scientific certainty.

Its defenders describe it as codified common sense. Its critics point to its {{14}}: the same wording has been used to justify both a ban and a refusal to ban, depending on which harm is treated as the default.

Neither characterisation is complete. The principle is not a decision procedure and it is {{15}} of producing one, because it says nothing whatever about how much precaution is enough.

What it does well is narrower and still valuable: it shifts the {{16}} onto the activity, so that a producer must show a product is safe rather than a regulator show that it is not.

Several jurisdictions have written it into law. Early evidence suggests a modest {{17}} of the rule by the courts, together with a sharp rise in litigation about its wording.

The most likely future is therefore an uneven one, with different regulators applying it according to their own institutional {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-04-l3-13",
              no: 13,
              text: "ABSENT",
              accept: ["absence"],
              explain:
                "`delayed by the ___ of full scientific certainty` yapısında belirli tanımlıktan sonra bir ad gerekiyor: kesinliğin YOKLUĞU. `absent` sıfattır ve `the … of` çerçevesinin içine giremez.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l3-14",
              no: 14,
              text: "ELASTIC",
              accept: ["elasticity"],
              explain:
                "İki nokta üst üstenin ardındaki açıklama esnekliği anlatıyor: aynı ifade hem yasağı hem yasak koymamayı gerekçelendiriyor. `its` iyelik sıfatı bir ad istiyor ve `elastic` sıfatından türeyen ad `elasticity`dir.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l3-15",
              no: 15,
              text: "CAPABLE",
              accept: ["incapable"],
              explain:
                "`it is ___ of producing one` yapısı `of` ile kullanılan bir sıfat ister ve bağlam olumsuz: ilke bir karar yordamı üretemez. `capable` sıfatının olumsuzu `incapable`dır; olumsuzluk eki düşerse cümle kendi gerekçesiyle çelişir.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l3-16",
              no: 16,
              text: "RESPONSIBLE",
              accept: ["responsibility"],
              explain:
                "`shifts the ___ onto the activity` yapısında belirli tanımlıktan sonra bir ad geliyor ve devamı bunun ne olduğunu açıklıyor: kanıtlama yükümlülüğü üreticiye geçiyor. Sıfat biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l3-17",
              no: 17,
              text: "NARROW",
              accept: ["narrowing"],
              explain:
                "`a modest ___ of the rule by the courts` yapısında `a` ile `of` arasında bir ad var ve süreç bildiren biçim gerekiyor: `narrowing`. Sıfat (`narrow`) belirsiz tanımlıkla tek başına ad öbeği kurmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l3-18",
              no: 18,
              text: "TRADITION",
              accept: ["traditions"],
              explain:
                "`according to their own institutional ___` yapısında iki sıfattan sonra bir ad geliyor ve özne çoğul (`different regulators`), dolayısıyla ad da çoğul olmalı.",
            },
          ],
        },
        {
          id: "en-c1-04-l4",
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
              id: "en-c1-04-l4-19",
              no: 19,
              text: "It is likely that the report was written before the data arrived.\nThe report ______ before the data arrived.",
              cue: "HAVE",
              accept: ["may well have been written", "might well have been written"],
              explain:
                "Geçmişe dair güçlü bir olasılık `may/might well + have + üçüncü hâl` ile kurulur ve cümle edilgen olduğu için araya `been` giriyor. Anahtar sözcük `have` zincirin ortasında değişmeden duruyor; `well` olasılığın gücünü taşır.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l4-20",
              no: 20,
              text: "Nobody could have predicted the collapse.\nThe collapse ______ by anybody.",
              cue: "PREDICTED",
              accept: ["could not have been predicted"],
              explain:
                "Olumsuz özneli etken cümle edilgene çevriliyor ve olumsuzluk yükleme geçiyor. Anahtar sözcük üçüncü hâl olduğu için zincir `could not have been` biçiminde tamamlanıyor; `by anybody` zaten yazılı olduğundan olumsuzluk yüklemde durmak zorunda.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l4-21",
              no: 21,
              text: "They postponed the decision because the evidence was incomplete.\nThe decision ______ the evidence was incomplete.",
              cue: "PUT",
              accept: ["was put off because", "was put off as"],
              explain:
                "`postpone` fiili `put off` öbek fiiline çevriliyor ve cümle edilgen kuruluyor: «The decision was put off». Sebep bağlacı da boşluğun içinde kalıyor, çünkü boşluktan sonra doğrudan yan cümle geliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-04-l4-22",
              no: 22,
              text: "I regret that we published the figure before checking it.\nI wish ______ the figure before checking it.",
              cue: "PUBLISHED",
              accept: ["we had not published"],
              explain:
                "Geçmişe dair pişmanlık `wish + past perfect` ile kurulur ve pişmanlık yapılan bir şeye ait olduğu için yapı olumsuza döner: «I wish we had not published». `wish we did not publish` şimdiki bir durumu anlatırdı.",
            },
          ],
        },
        {
          id: "en-c1-04-l5",
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
              title: "In defence of the false alarm",
              body: `The false alarm has no defenders, which is a pity, because a system that never produces one is almost certainly worse than a system that does. This is not a paradox; it is arithmetic, and the arithmetic is not difficult. Any warning system that must decide in advance can be tuned towards missing real events or towards announcing events that do not occur, and it cannot be tuned away from both at once.

What follows from this is not an argument for carelessness. It is an argument about where the errors should be placed. If the cost of a missed flood is a hundred times the cost of an unnecessary evacuation, then a system producing no false alarms is announcing, in effect, that it is prepared to accept the hundredfold loss in order to avoid the embarrassment of the smaller one. It is precisely this preference that goes unstated whenever a service is criticised for crying wolf.

I should be careful here, because the counter-argument is strong and I have no wish to caricature it. Warnings that repeatedly come to nothing are ignored, and a system that has trained its public to disregard it has not avoided the missed event; it has merely arranged for the failure to occur later and with better documentation. On balance, the concern about credibility is legitimate, and the people raising it are not fools.

The way through is narrower than either side allows. The credibility problem is real, but it is a problem about explanation rather than about frequency: audiences tolerate unnecessary warnings remarkably well when they have been told in advance what rate to expect. Seldom has any service attempted this, and the reluctance of agencies to publish their own error rate is itself informative.

None of this makes the false alarm pleasant. What it might do is make the alternative visible, which is arguably the more useful of the two.`,
              gloss: [
                { de: "to be tuned", tr: "ayarlanmak", en: "tuned" },
                { de: "an evacuation", tr: "tahliye", en: "evacuation" },
                { de: "credibility", tr: "inandırıcılık", en: "credibility" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-04-l5-23",
              no: 23,
              text: "What does the writer say about warning systems?",
              options: ["They can be improved until both errors disappear", "They should be judged only on missed events", "They must trade one kind of error against another", "They are inherently less reliable than human judgement"],
              answer: 2,
              explain:
                "İlk paragraf ikilemi kuruyor: sistem ya gerçek olayları kaçırmaya ya da olmayacak olayları duyurmaya ayarlanabilir, «and it cannot be tuned away from both at once». Birinci şık tam olarak reddedilen olanaktır.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l5-24",
              no: 24,
              text: "According to the writer, what is a service without false alarms implicitly accepting?",
              options: ["A hundredfold loss rather than a small humiliation", "A reduction in the total number of warnings issued", "The criticism of the people it protects", "A slower response time in an emergency"],
              answer: 0,
              explain:
                "İkinci paragraf hesabı açıyor: kaçırılan sel, gereksiz tahliyenin yüz katıysa, hiç yanlış alarm vermeyen sistem «prepared to accept the hundredfold loss in order to avoid the embarrassment of the smaller one» demektir.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l5-25",
              no: 25,
              text: "What does the writer concede to the opposing view?",
              options: ["False alarms usually cost more than missed events do", "Repeated false alarms teach people to ignore them", "Evacuations are rarely necessary", "Forecasters are usually overconfident"],
              answer: 1,
              explain:
                "Ödün üçüncü paragrafta: «Warnings that repeatedly come to nothing are ignored» ve «On balance, the concern about credibility is legitimate». Maliyet karşılaştırması ise yazının kendi savını çürütürdü ve metinde tersi söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-l5-26",
              no: 26,
              text: "What does the writer identify as the real problem?",
              options: ["The number of false alarms produced", "The cost of unnecessary evacuations", "The refusal of agencies to publish their own error rates", "The absence of any explanation of the expected rate"],
              answer: 3,
              explain:
                "Dördüncü paragraf ayrımı kuruyor: sorun «about explanation rather than about frequency», çünkü dinleyiciler beklenecek oran önceden söylendiğinde gereksiz uyarılara katlanıyor. Yayımlamama isteksizliği bunun bir belirtisi olarak anılıyor, sorunun kendisi olarak değil.",
            },
          ],
        },
        {
          id: "en-c1-04-l6",
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
              body: "The defence of precaution is almost always made by people who will not bear its costs. It should make us ask who is absent from the conversation: the households for whom a two-year delay is not caution but a rent they cannot pay, and who are never invited to the consultation.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "I published a paper arguing that quantified risk assessment was a rhetorical device dressed up as a method, and I no longer believe it. Two agencies working from different data reached the same figure within a percentage point, which is not what a rhetorical device does.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Both sides treat uncertainty as a single thing. Not knowing a probability is a wholly different situation from knowing it perfectly well and disliking the answer, and most of these arguments dissolve the moment that distinction is drawn.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "What is missing from all of this is a definition. Nobody in the debate has said how much harm counts as serious, and until somebody does, the same principle can be made to support any conclusion that a regulator has already reached.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "The historical record is the part I find least discussed. Of the twelve substances withdrawn under this rule since 1990, four have since been reinstated, and as far as I can establish nobody has written up why.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-04-l6-27",
              no: 27,
              text: "Which writer says the debate confuses two different states of knowledge?",
              answer: "c",
              explain:
                "Writer C ayrımı doğrudan kuruyor: «Not knowing a probability is a wholly different situation from knowing it perfectly well and disliking the answer», ve tartışmaların bu ayrım yapılınca dağıldığını söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-04-l6-28",
              no: 28,
              text: "Which writer describes abandoning a view they had published?",
              answer: "b",
              explain:
                "Writer B hem eski konumunu hem geri alışını veriyor: «I published a paper arguing that … and I no longer believe it», üstelik fikrini değiştiren kanıtı da adlandırıyor.",
            },
            {
              kind: "match",
              id: "en-c1-04-l6-29",
              no: 29,
              text: "Which writer says that a key term has never been defined?",
              answer: "d",
              explain:
                "Writer D eksiği adlandırıyor: «Nobody in the debate has said how much harm counts as serious», ve bu boşluğun ilkeyi her sonuca uydurulabilir kıldığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-04-l6-30",
              no: 30,
              text: "Which writer draws attention to who actually bears the cost?",
              answer: "a",
              explain:
                "Writer A bedeli taşıyanı gösteriyor: «the households for whom a two-year delay is not caution but a rent they cannot pay», ve bu kesimin danışmaya çağrılmadığını söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-04-l7",
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
              title: "The model that learned the wrong thing",
              body: `In the late nineteen-nineties a national agency built a model to predict which bridges would deteriorate fastest. The plan was straightforward: gather the inspection histories, fit the model, rank the structures.

{{31}}

The difficulty was not one of data. The histories were long, the fields were consistent, and the engineers cooperated fully. What defeated the exercise was that the model had learned the inspection regime rather than the bridges.

{{32}}

Later work made the mechanism precise. Structures that were inspected more often accumulated more recorded defects, and the model, reasonably enough, treated a long defect list as evidence of poor condition rather than of frequent attention.

{{33}}

This has an uncomfortable implication for any system trained on administrative records. If the record reflects the behaviour of the organisation as much as the state of the world, then a model fitted to it will predict the organisation.

{{34}}`,
              gloss: [
                { de: "to fit a model", tr: "modeli veriye uydurmak", en: "fit a model" },
                { de: "a defect", tr: "kusur, arıza", en: "defect" },
                { de: "a regime", tr: "düzen, uygulama biçimi", en: "regime" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The first rankings were produced within a year and were greeted with disbelief. The structures at the top of the list were, almost without exception, the ones each region already regarded as being in the best condition." },
            { key: "b", label: "b", body: "In one district a bridge was visited twice a year because it lay on the route between two depots; in another, an identical structure was visited once every four years because it did not. Both regimes were defensible, and they were not comparable." },
            { key: "c", label: "c", body: "Once a correction for inspection frequency was applied, the ranking became unremarkable, which was itself the finding: the model added very little to what an experienced inspector already believed." },
            { key: "d", label: "d", body: "The lesson most often drawn is that such models are useless. A better one is that the record must be audited before it is fitted, which is exactly the sort of recommendation that no agency has ever put in a press release." },
            { key: "e", label: "e", body: "Bridges built with post-tensioned concrete between 1960 and 1980 are now the subject of a separate inspection programme with its own reporting line." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-04-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Giriş planı anlatıyor ve boşluktan sonraki paragraf «The difficulty was not one of data» diye başlıyor, yani araya bir başarısızlık girmiş olmalı. (a) o başarısızlığı veriyor: en iyi durumdaki yapıların listenin başına çıkması.",
            },
            {
              kind: "match",
              id: "en-c1-04-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "b",
              explain:
                "Önceki paragraf modelin «the inspection regime rather than the bridges» öğrendiğini söylüyor; (b) iki bölgenin denetim sıklığını karşılaştırarak o rejim farkını somutlaştırıyor.",
            },
            {
              kind: "match",
              id: "en-c1-04-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Önceki paragraf düzeneği açıklıyor: sık denetlenen yapı daha çok kusur biriktiriyor. (c) düzeltme uygulandığında ne olduğunu veriyor ve asıl bulguyu adlandırıyor: model deneyimli denetçiye pek bir şey eklemiyor.",
            },
            {
              kind: "match",
              id: "en-c1-04-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Son paragraf genel sonucu veriyor: «a model fitted to it will predict the organisation». (d) buradan çıkarılacak dersi tartışıp yazıyı kapatıyor: kayıt, modele verilmeden önce denetlenmeli. (e) belli bir beton türünden söz ediyor ve metnin hiçbir yerinde yapı malzemesi tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-04-l8",
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
              label: "a — Hydrologist",
              body: "People ask me for the probability and I give them a number, and it does not help, which used to frustrate me. The number is defensible. What it cannot carry is what a household should do differently at each level, and in fourteen years nobody has ever asked me that.",
            },
            {
              key: "b",
              label: "b — Insurance analyst",
              body: "We replaced eleven local risk maps with a single national model last year and nine of the replacements were straightforwardly better. The two that were not are the ones I think about: in both cases we dropped a local map that looked redundant and was in fact the only record of a drainage change made in the 1970s. We have rebuilt them, at a cost well above the saving.",
            },
            {
              key: "c",
              label: "c — Emergency planner",
              body: "The guidance says that exercises build judgement, and I do not dispute it. My difficulty is practical: a planner rehearses whatever scenario the calendar offers, and nobody is arranging for them to meet the events that are genuinely rare. We call it experience and treat it as though it were a syllabus.",
            },
            {
              key: "d",
              label: "d — Agency director",
              body: "I have signed off warnings at the lower threshold every year I have been in post, and I would defend nearly all of them against anybody. What I would not defend is that we never recorded what we expected to happen, so nobody can now say whether we were right.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-04-l8-35",
              no: 35,
              text: "Which text says that a defensible number withholds what the reader most needs?",
              answer: "a",
              explain:
                "Hidrolog sayının savunulabilirliğini kabul edip eksiğini adlandırıyor: «What it cannot carry is what a household should do differently at each level». Rakam doğru, talimat yok.",
            },
            {
              kind: "match",
              id: "en-c1-04-l8-36",
              no: 36,
              text: "Which text describes a consolidation that cost more than it saved?",
              answer: "b",
              explain:
                "Analist iki değişikliği geri almış: «We have rebuilt them, at a cost well above the saving». Gereksiz görünen yerel harita, 1970'lerdeki bir drenaj değişikliğinin tek kaydıymış.",
            },
            {
              kind: "match",
              id: "en-c1-04-l8-37",
              no: 37,
              text: "Which text says that what is called experience is left to chance?",
              answer: "c",
              explain:
                "Plancı rastlantıyı adlandırıyor: «a planner rehearses whatever scenario the calendar offers» ve nadir olaylarla karşılaşmayı kimse ayarlamıyor. «We call it experience and treat it as though it were a syllabus».",
            },
            {
              kind: "match",
              id: "en-c1-04-l8-38",
              no: 38,
              text: "Which text criticises a failure to record what was expected?",
              answer: "d",
              explain:
                "Müdür kararların kendisini değil, beklentinin yazılmamasını eleştiriyor: «we never recorded what we expected to happen, so nobody can now say whether we were right».",
            },
            {
              kind: "match",
              id: "en-c1-04-l8-39",
              no: 39,
              text: "Which text says that the question which would make the figure useful has never been put?",
              answer: "a",
              explain:
                "Hidrolog süreyi de veriyor: «in fourteen years nobody has ever asked me that». Sorulmayan soru, her düzeyde ne yapılacağı.",
            },
            {
              kind: "match",
              id: "en-c1-04-l8-40",
              no: 40,
              text: "Which text defends the very decisions it also criticises?",
              answer: "d",
              explain:
                "İki cümle yan yana duruyor: «I would defend nearly all of them against anybody» ve «What I would not defend is …». Savunma kararlara, eleştiri kayıt tutulmamasına.",
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
        "This part has four tasks. You hear short extracts, a talk, a panel discussion and eight monologues. Read each instruction carefully: not every recording is played twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, bir panel ve sekiz kısa konuşma dinleyeceksin. Yönergeleri dikkatle oku: her kayıt iki kez çalınmıyor.",
      tasks: [
        {
          id: "en-c1-04-h1",
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
              situation: "İki meteorolog bir uyarı sisteminin yenilenmesini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Signe", text: "The upgrade works, and I say that as somebody who spent two years arguing against it. What I still cannot defend is how we describe it to the public." },
                { speaker: "Wanda", text: "The wording is not ours, though. It comes from the national template." },
                { speaker: "Signe", text: "Which is precisely the objection, not an answer to it. If we adopt a template we did not write, we inherit whatever it obscures, and we should at least record that in the review." },
                { speaker: "Wanda", text: "I would go along with recording it. I would resist the next step, which is to make a regional office responsible for rewriting national communication policy." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir araştırmacı sel tartışmasından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You have said the flood debate is conducted at the wrong level of detail. What do you mean?" },
                { speaker: "Researcher", text: "People argue about whole catchments. A catchment is not a unit of decision; it is perhaps two hundred properties, each with a different floor level, and protection reaches them one at a time. Once you look at properties the argument becomes tractable and, I admit, a great deal less exciting." },
                { speaker: "Host", text: "Does that make you optimistic?" },
                { speaker: "Researcher", text: "It makes me specific, which is not the same thing. The property-level view tells you that some households will be defended and some will not, and nobody has a good word for that conversation, let alone a policy for it." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi öngörü puanlamasından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "The forecasting literature contains a warning worth repeating whenever a new score is proposed. Any measure of forecast quality that is used to evaluate forecasters will, within about three years, change what they forecast rather than how well they forecast, and the change will be perfectly rational at every step." },
                { speaker: "Lecturer", text: "The response is not to abandon scoring, which would be worse, but to expect the drift and to score against a benchmark that nobody in the organisation controls. Almost nobody does this, because a benchmark you do not control is one you cannot be seen to beat." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-04-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Signe's criticism of the upgrade?",
              options: ["The upgrade does not work as promised", "The cost of the upgrade to the region", "The public wording of the change"],
              answer: 2,
              explain:
                "Signe sistemin işlediğini baştan kabul ediyor: «The upgrade works, and I say that as somebody who spent two years arguing against it». Eleştirisi yalnız anlatımda: «how we describe it to the public». Maliyet hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h1-2",
              no: 2,
              ref: "a1",
              text: "What does Wanda accept and what does she refuse?",
              options: ["She accepts the record but not a wider duty", "She accepts the criticism but not the record", "She refuses both parts of the argument"],
              answer: 0,
              explain:
                "Wanda ayrımı kendisi yapıyor: «I would go along with recording it», ama «I would resist the next step, which is to make a regional office responsible for rewriting national communication policy».",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h1-3",
              no: 3,
              ref: "a2",
              text: "What does the researcher object to?",
              options: ["The lack of national funding for defences", "Arguing about whole catchments", "The speed of new building on flood plains"],
              answer: 1,
              explain:
                "İtiraz ölçek düzeyine: «People argue about whole catchments. A catchment is not a unit of decision». Fon ve yapılaşma hızı kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h1-4",
              no: 4,
              ref: "a2",
              text: "What does the researcher say about his own position?",
              options: ["He is optimistic about the outcome", "He is more precise rather than more hopeful", "He has a policy for the households not defended"],
              answer: 1,
              explain:
                "İyimserlik sorusuna verdiği yanıt ayrımı kuruyor: «It makes me specific, which is not the same thing», ve korunmayacak haneler için kimsenin bir politikası olmadığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the lecturer warn about a new score?",
              options: ["Scores are usually badly designed", "Forecasters will resist evaluation", "A score changes what is forecast"],
              answer: 2,
              explain:
                "Uyarı açık: puan «will … change what they forecast rather than how well they forecast». Direnişten söz edilmiyor; tersine değişimin her adımda akılcı olacağı söyleniyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h1-6",
              no: 6,
              ref: "a3",
              text: "Why is the recommended response rarely adopted?",
              options: ["It removes the chance of appearing to succeed", "It costs a great deal more than the score saves", "It requires abandoning scoring altogether"],
              answer: 0,
              explain:
                "Gerekçe son cümlede: «a benchmark you do not control is one you cannot be seen to beat». Puanlamayı bırakmak zaten açıkça reddedilen seçenek; maliyet karşılaştırması yapılmıyor.",
            },
          ],
        },
        {
          id: "en-c1-04-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear an officer reporting five years of results from a flood warning service. Complete the sentences, questions 7 to 14, with a word, a number or a short phrase. You hear the report ONCE only.",
          promptTr:
            "Bir yetkilinin sel uyarı hizmetinin beş yıllık sonuçlarını anlattığını dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük, bir sayı ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir yetkili beş yıllık sonuçları sunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Thank you. I will give you our five-year figures and I will not pretend that all of them are comfortable. We issued four hundred and twelve warnings and, of those, two hundred and nine were followed by flooding at the level warned. The remainder are what the press calls false alarms and what I would call a tuning decision. The total cost of the service is three point six million a year. Here is the first finding: the warnings people act on are not the most severe ones, they are the ones that name a street, because that is the level at which somebody recognises their own house. Second, the timing matters more than the wording. A warning issued the previous evening produces about three times the preparation of one issued at six in the morning, and that ratio has held in every district. Third, the channel. We tried a phone call, a letter and a text message, and the text message outperformed the other two, which disappointed the two of us who had argued for the phone call. Fourth, a caution: our own survey shows that the households who take no action are overwhelmingly those who have been warned before without flooding, and we have not solved that. And finally, staffing. We have nine duty forecasters and we need fourteen, and that is the constraint that keeps me awake, not the budget.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Flood warning service — five-year results",
              body: `The service issued {{7}} warnings in five years.

Flooding at the level warned followed {{8}} of them.

The service costs {{9}} million pounds a year.

People act most on the warnings that name a {{10}}.

A warning issued the {{11}} produces about three times the preparation.

The most effective channel was the {{12}}.

Households that take no action have usually been warned before without {{13}}.

The service has nine duty forecasters and needs {{14}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-04-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["412", "four hundred and twelve"],
              explain:
                "«We issued four hundred and twelve warnings» — beş yıllık toplam. İki yüz dokuz, bunların içinden gerçekleşenlerin sayısı; iki sayı aynı cümlede geçtiği için karıştırılması kolay.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["209", "two hundred and nine"],
              explain:
                "«two hundred and nine were followed by flooding at the level warned» — uyarılan düzeyde sel olan sayı. Geri kalanı konuşmacının «a tuning decision» dediği yanlış alarmlar.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["3.6", "three point six"],
              explain:
                "«The total cost of the service is three point six million a year». Cümlede `million pounds a year` zaten yazılı olduğu için boşluğa yalnız sayı geliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["street"],
              explain:
                "Kayıt beklentiyi bozuyor: «the warnings people act on are not the most severe ones, they are the ones that name a street», çünkü insan kendi evini o düzeyde tanıyor. Şiddet düzeyini yazan öğrenci çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["previous evening", "evening", "night before"],
              explain:
                "«A warning issued the previous evening produces about three times the preparation of one issued at six in the morning». Karşılaştırmanın öteki ucu sabah altı; hazırlık farkını yaratan akşam uyarısı.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["text message", "text"],
              explain:
                "Üç kanal denenmiş ve «the text message outperformed the other two». Telefon araması, kayıtta onu savunanların hayal kırıklığıyla birlikte anılıyor, yani kazanan değil.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["flooding", "a flood"],
              explain:
                "En rahatsız edici bulgu: harekete geçmeyen haneler «overwhelmingly those who have been warned before without flooding». Yani yanlış alarm geçmişi, sonraki uyarıyı etkisiz kılıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-04-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["14", "fourteen"],
              explain:
                "«We have nine duty forecasters and we need fourteen» — gereken sayı. Konuşmacı asıl kısıtın bütçe değil bu olduğunu ayrıca söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-04-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about warnings and precaution. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Uyarılar ve ihtiyat üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel",
              situation: "Üç konuşmacı uyarı eşiklerini tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Yuki, you have argued that publishing a single threshold does more harm than good. That is a strong claim." },
                { speaker: "Yuki", text: "It is, and I want to be exact about it. My objection is not to having a threshold; it is to publishing one number and calling it the policy. A number invites the response that the line is arbitrary, which is true and useless. Publish the consequence at each level and the conversation becomes possible." },
                { speaker: "Chair", text: "Elena, you have worked with those thresholds for two decades." },
                { speaker: "Elena", text: "I have, and I used to make Yuki's argument myself. I have changed my mind, for a reason I did not expect. The single number is the only part that survives a change of minister. Everything more detailed gets renegotiated within a year, and then nobody can compare one season with another." },
                { speaker: "Chair", text: "Reza, does that resolve it?" },
                { speaker: "Reza", text: "It sharpens it. What both of them are describing is a trade-off between stability and usefulness, and I would say plainly that we have never had a serious attempt to have both. Nobody has tried publishing the number alongside a fixed, audited statement of consequences, because the consequences are where the political pain is." },
                { speaker: "Chair", text: "Yuki, is there evidence either way?" },
                { speaker: "Yuki", text: "Very little, and I would rather say so than pretend. Two services have published consequence tables and both withdrew them within three years. That is not enough to conclude anything, and I notice that everyone on this panel, including me, has a story that explains those withdrawals in their own favour." },
                { speaker: "Chair", text: "Elena, what about the incentive question?" },
                { speaker: "Elena", text: "That is the part that worries me most. Any threshold attached to an obligation gets managed. If crossing the line triggers an evacuation, forecasts will cluster just below the line, and they will cluster honestly: the estimates have room in them and everybody knows where the boundary sits. I would build the review into the rule from the first day rather than add it once the drift is visible." },
                { speaker: "Chair", text: "Reza, a last word." },
                { speaker: "Reza", text: "Only that the comparison with medical screening is misleading and I wish it would stop. A screening programme can offer a second test to the people it worries. A flood warning cannot; the event either arrives or it does not, and there is no confirmatory step in between. Those are not the same problem." },
              ],
              gloss: [
                { de: "a threshold", tr: "eşik", en: "threshold" },
                { de: "to cluster", tr: "bir noktada toplanmak", en: "cluster" },
                { de: "confirmatory", tr: "doğrulayıcı", en: "confirmatory" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-04-h3-15",
              no: 15,
              ref: "c1",
              text: "What exactly is Yuki objecting to?",
              options: ["The existence of thresholds in principle", "Publishing a number without its consequences", "The accuracy of the forecasts behind the threshold", "The way forecasters estimate probabilities"],
              answer: 1,
              explain:
                "Yuki itirazını kendisi sınırlıyor: «My objection is not to having a threshold; it is to publishing one number and calling it the policy», ve çözümü de veriyor: her düzeydeki sonucu yayımlamak.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-16",
              no: 16,
              ref: "c1",
              text: "Why does Yuki say a published number alone is useless?",
              options: ["It is always out of date by the time it appears", "It is calculated differently in each region", "It excludes the most severe events", "It invites a true but unhelpful response"],
              answer: 3,
              explain:
                "«A number invites the response that the line is arbitrary, which is true and useless». Sorun doğruluk değil, tartışmanın orada tıkanması.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Elena say about her own view?",
              options: ["She once held the position Yuki now holds", "She has always disagreed with Yuki", "She is unsure which position is correct", "She avoids taking a position in public"],
              answer: 0,
              explain:
                "Elena konum değişikliğini açıkça bildiriyor: «I used to make Yuki's argument myself. I have changed my mind, for a reason I did not expect». Kararsız değil, gerekçesini de veriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-18",
              no: 18,
              ref: "c1",
              text: "What is Elena's reason for defending the single number?",
              options: ["It is cheaper to produce", "It is easier for the public to understand", "It survives changes of minister", "It is required by international agreement"],
              answer: 2,
              explain:
                "«The single number is the only part that survives a change of minister. Everything more detailed gets renegotiated within a year». Gerekçe maliyet ya da anlaşılırlık değil, mevsimler arası karşılaştırmanın korunması.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-19",
              no: 19,
              ref: "c1",
              text: "How does Reza characterise the disagreement?",
              options: ["As a misunderstanding between the two speakers", "As a dispute about the quality of the data", "As a question the evidence has already settled", "As a trade-off that has never been properly tested"],
              answer: 3,
              explain:
                "Reza ikisini de aynı ikilemin içine yerleştiriyor: «a trade-off between stability and usefulness» ve ekliyor: «we have never had a serious attempt to have both».",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Yuki say about the available evidence?",
              options: ["It supports her position clearly", "It is too thin to settle the question", "It has been withheld by two services", "It contradicts everything the panel has said"],
              answer: 1,
              explain:
                "Yuki kanıtın azlığını kabul ediyor: «Very little, and I would rather say so than pretend … That is not enough to conclude anything», üstelik kendisi dahil herkesin kendi lehine bir açıklaması olduğunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-21",
              no: 21,
              ref: "c1",
              text: "What does Elena predict about a threshold tied to an obligation?",
              options: ["Estimates will settle immediately under the threshold", "The obligation will be challenged in the courts by insurers", "The threshold will be abolished within three years", "Most services will ignore it entirely"],
              answer: 0,
              explain:
                "Elena kötü niyeti açıkça dışlıyor: tahminler eşiğin hemen altında toplanır «and they will cluster honestly», çünkü kestirimlerin içinde pay var ve sınırın yeri biliniyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-04-h3-22",
              no: 22,
              ref: "c1",
              text: "Why does Reza reject the comparison with medical screening?",
              options: ["Screening programmes are far better funded", "Screening is subject to stricter regulation", "A flood warning has no confirmatory second step", "Screening deals with a much smaller population"],
              answer: 2,
              explain:
                "Reza farkı düzenekte buluyor: tarama, kaygılandığı kişiye ikinci bir test sunabilir, «A flood warning cannot; the event either arrives or it does not». Bütçe ya da nüfus karşılaştırması yapılmıyor.",
            },
          ],
        },
        {
          id: "en-c1-04-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about warnings and risk decisions. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Uyarılar ve risk kararları üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to withdraw a claim they made earlier" },
            { key: "b", label: "to separate two issues that are usually treated as one" },
            { key: "c", label: "to explain why a system was switched off" },
            { key: "d", label: "to predict that a rule will be worked around" },
            { key: "e", label: "to give the credit for an idea to somebody else" },
            { key: "f", label: "to object to an analogy used in the debate" },
            { key: "g", label: "to point to a harm that nobody has counted" },
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
                { text: "For years I told this committee that a two-tier warning would confuse people, and I said it in print. Three services have now run one, and the evidence is that comprehension went up rather than down. I was wrong, and it seems better to say so than to be quoted against myself later." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı iki ayrı sorunu ayırıyor.",
              plays: 2,
              segments: [
                { text: "We keep hearing that the public does not understand risk. Two entirely different things are being run together there: not understanding a probability, and understanding it perfectly well and deciding that the cost of acting is more than a household can bear. The first is a teaching problem. The second is not, and no amount of explanation will touch it." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kapatılan bir sistemi anlatıyor.",
              plays: 2,
              segments: [
                { text: "We built the automated dial-out system and we switched it off after eleven months. Not because it failed technically; it worked exactly as specified. It called people at four in the morning for events that never came, and by the end our own staff were telling residents not to worry about it. That is why it went." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir eşiğin doğuracağı davranışı anlatıyor.",
              plays: 2,
              segments: [
                { text: "If we publish a rule that any forecast above eighty per cent triggers an evacuation, I can tell you now what will happen. Within two years very few forecasts will be issued above seventy-nine, and nobody will have lied; the estimates simply have room in them, and everybody knows where the line has been drawn." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı hiçbir hesapta görünmeyen bir zararı anlatıyor.",
              plays: 2,
              segments: [
                { text: "The evacuation appears in our accounts as a cost of two hundred thousand. What appears nowhere is that a hundred and forty small businesses lost a trading day, and that eleven of them told us afterwards it was the day that decided their year. Nobody has ever been asked to put a figure on that, so there is none." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı eleştirilen bir meslektaşından söz ediyor.",
              plays: 2,
              segments: [
                { text: "A great deal has been said this week about the officer who issued the warning, most of it by people who have not seen the file. She followed the threshold exactly as it is written, she recorded her reasoning at the time, and she escalated it twice. If we want to criticise somebody, the papers make it perfectly clear who." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı kanıtın yeterliğini tartışıyor.",
              plays: 2,
              segments: [
                { text: "I am not opposed to the change and I want that understood. My point is narrower: we have two studies, both from the same catchment, and one of them was funded by the body proposing the rule. That is not enough to rewrite a national standard on, and saying so is not obstruction." },
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
                { text: "I am not against the scheme in principle, and I want that on the record. What I am asking for is six weeks. The independent review reports in April, and deciding in March means deciding without the one document that might change somebody's mind." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-04-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı yazılı olarak savunduğu görüşü geri alıyor: «I was wrong, and it seems better to say so than to be quoted against myself later». Amaç bir uyarı ya da savunma değil, geri alış.",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "«Two entirely different things are being run together there» — olasılığı anlamamak ile anlayıp harekete geçememek. Konuşmanın tamamı bu ayrımı kurmaya ayrılmış.",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı kapatma kararının nedenini veriyor ve teknik arızayı açıkça dışlıyor: «Not because it failed technically; it worked exactly as specified». Neden, personelin bile sistemi ciddiye almaz hâle gelmesi.",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Kuralın nasıl dolanılacağı önceden anlatılıyor: «very few forecasts will be issued above seventy-nine, and nobody will have lied». Kötü niyet açıkça dışlanıyor; sorun eşiğin kendisinde.",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "g",
              explain:
                "Görünen maliyetle görünmeyen zarar karşılaştırılıyor: iki yüz bin hesapta var, «What appears nowhere is that a hundred and forty small businesses lost a trading day».",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "i",
              explain:
                "Konuşmacı eleştirilen memuru koruyor: eşiği yazıldığı gibi uygulamış, gerekçesini kaydetmiş ve konuyu iki kez üste taşımış. «If we want to criticise somebody, the papers make it perfectly clear who».",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "j",
              explain:
                "Konuşmacı değişikliğe karşı olmadığını söyleyip kanıtın yetersizliğini gösteriyor: aynı havzadan iki çalışma ve biri kuralı öneren kurumun fonuyla. «That is not enough to rewrite a national standard on».",
            },
            {
              kind: "match",
              id: "en-c1-04-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Talep açık ve süreli: «What I am asking for is six weeks», çünkü bağımsız inceleme nisanda raporlanıyor. Konuşmacı ilkece karşı olmadığını da ayrıca kayda geçiriyor.",
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
          id: "en-c1-04-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on public warnings. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. A warning that is issued too often will eventually be ignored.\n2. A warning that is withheld to protect credibility leaves people unprepared.\n\nWrite 220 to 260 words.",
          promptTr:
            "Kamu uyarıları üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Çok sık verilen bir uyarı sonunda dikkate alınmaz olur.\n2. İnandırıcılığı korumak için verilmeyen bir uyarı insanları hazırlıksız bırakır.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two points raised in the seminar are two descriptions of the same tuning decision, and the difficulty is deciding which failure a system should be designed to avoid.

The argument about over-warning is an argument about attention. A public that has been evacuated three times without incident will not move on the fourth occasion, and no amount of severity in the wording will change that. It is worth adding that the effect is cumulative and largely irreversible: credibility, once spent, is not restored by a subsequent success.

The second point concerns what withholding actually buys. A service that suppresses a marginal warning has not eliminated the risk; it has transferred it from an institution that can bear criticism to households that cannot bear a flood. On this account the preference for silence is not caution but a quiet reallocation of who suffers.

I regard the second as the more important, though for a narrower reason than is usually offered. The credibility problem has a remedy that has barely been tried, which is to publish the expected rate of unnecessary warnings in advance; the missed-event problem has no remedy at all once the water has arrived.

My own view is that the framing conceals the interesting question. Neither point tells us who should choose the threshold, and a decision that redistributes risk between an agency and a street ought not to be made privately by the agency. That, and not the arithmetic, is what nobody at the seminar was willing to discuss.`,
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
          id: "en-c1-04-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to adopt an automatic alert system that will contact people at any hour. Write a report for its board. Describe the current arrangement, assess the likely effects of the change, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum, insanları her saat arayabilecek otomatik bir uyarı sistemi kurmak üzere. Yönetim kuruluna bir rapor yaz. Mevcut düzeni anlat, değişikliğin olası etkilerini değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the current arrangement precisely.", tr: "Mevcut düzeni kesin biçimde anlat." },
              { de: "Assess both the gains and the costs of the change.", tr: "Değişikliğin hem kazancını hem bedelini değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed automatic alert system

Current arrangement
Alerts are issued by a duty officer between seven in the morning and eleven at night, using a text message and a notice on the website. Outside those hours a decision requires a telephone call to a second officer, which adds a median delay of fifty minutes. In the last two years this delay has affected eleven events, of which two would probably have warranted an earlier message.

Assessment
The gain is real and it is narrow: the system removes the fifty-minute delay and nothing else. Two further effects are not in the proposal. The first is habituation. The system as specified would have contacted residents at night on nineteen occasions last year, of which four were followed by the predicted event; our own survey of the neighbouring authority suggests that a run of three unnecessary night calls reduces subsequent response by about half. The second is the transfer of judgement: the officer currently exercising discretion at two in the morning would be replaced by a rule written eighteen months earlier.

Recommendation
I recommend adopting the system for daytime alerts immediately and running the night function in shadow mode for twelve months, with the messages logged but not sent. That gives us the rate before we impose it on residents. I would not recommend full night activation this year, and I would specifically advise against buying the escalation module until the shadow data exists, since it cannot be assessed without it.`,
            criteria: [
              "Mevcut düzen sayı ve süreyle mi anlatıldı?",
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
          id: "en-c1-04-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about risk, warnings and how people decide what to take seriously.",
          promptTr: "Sana risk, uyarılar ve insanların neyi ciddiye alacağına nasıl karar verdiği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe a warning you have received that you did not act on, and say why?", tr: "Günaydın. Aldığın ve harekete geçmediğin bir uyarıyı tarif eder ve nedenini söyler misin?" },
            { who: "you", hint: "Somut bir örnek seç ve kendi kararını çözümle.", expect: "somut bir örnek vermek ve kendi kararını çözümlemek", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think that reaction is a failure of the warning, or a reasonable judgement on your part?", tr: "Teşekkürler. Sence bu tepki uyarının bir kusuru mu, yoksa senin makul bir yargın mı?" },
            { who: "you", hint: "Bir konum al ama karşı görüşe bir pay bırak.", expect: "bir konum almak ve karşı görüşe pay bırakmak", seconds: 50 },
            { who: "partner", de: "And how would you decide whether a public body had warned people well or had simply been lucky?", tr: "Bir kurumun insanları iyi uyardığına mı yoksa yalnız şanslı olduğuna mı karar vermek için ne yapardın?" },
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
              "The obvious one is the heat alert we get every summer, which I have never once acted on, partly because it arrives at the same level whether the day is uncomfortable or genuinely dangerous. I would say that is mostly a failure of the warning rather than of me, although I have to concede that I would probably ignore a graded one too for the first few years, simply out of habit. As for telling good warning from luck, I would look at whether the body published what it expected to happen before the event, and I would look across many events rather than one, because a single correct call tells you almost nothing.",
            criteria: [
              "Örnek somut mu ve çözümlendi mi?",
              "Konum alınırken karşı görüşe pay bırakıldı mı?",
              "Ölçüt önerildi ve gerekçelendirildi mi?",
              "Çekimserlik ifadeleri C1 düzeyinde mi? (I would say, although, mostly)",
            ],
          },
        },
        {
          id: "en-c1-04-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. An agency can either issue warnings early and accept that many will be unnecessary, or issue them late and accept that some will arrive too late to be useful. Set out the case for each, say which you would choose, and identify the strongest argument against your own choice.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir kurum ya uyarıları erken verip birçoğunun gereksiz olacağını kabul edecek ya da geç verip bazılarının işe yaramayacak kadar geç geleceğini kabul edecek. Her ikisinin de savunmasını kur, hangisini seçeceğini söyle ve kendi seçimine karşı en güçlü savı adlandır.",
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
              "The case for warning early rests on asymmetry: the cost of an unnecessary preparation is an afternoon, and the cost of a missed event can be a life, so anybody who treats the two as comparable has already made a decision they have not admitted to. The case for warning late is about the durability of attention, and it is stronger than it sounds. A population that has been warned six times without incident is not merely unimpressed; it has learned something, and what it has learned is correct given its own experience. I would warn early. The strongest argument against my own choice is that it borrows from a resource I cannot replace: every unnecessary warning spends a little credibility, and there is no mechanism for earning it back, so a policy of warning early is a policy of drawing down a fund until it is empty. I do not think that defeats the case, but anybody arguing as I have should be required to say what happens in year ten.",
            criteria: [
              "İki savunma da adil biçimde kuruldu mu?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi seçimine karşı en güçlü sav adlandırıldı mı, yoksa zayıf bir hâli mi kuruldu?",
              "İki dakika boyunca yapı korunabildi mi?",
              "Soyut sözcük dağarcığı C1 düzeyinde mi? (asymmetry, durability, draw down)",
            ],
          },
        },
        {
          id: "en-c1-04-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "An agency must decide how to spend a one-year improvement budget on its warning service. Talk with me about the options, defend two of them, and settle a priority order with me.",
          promptTr:
            "Bir kurum uyarı hizmeti için bir yıllık iyileştirme bütçesini nasıl harcayacağına karar verecek. Seçenekleri benimle konuş, ikisini savun ve benimle bir öncelik sırası belirle.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: publishing the expected rate of unnecessary warnings, rewriting every message in plain language, buying a finer-grained model, hiring five more duty forecasters, and running a public exercise in each district. Which two would you defend, and on what criterion?", tr: "Seçenekler: beklenen gereksiz uyarı oranını yayımlamak, bütün iletileri sade dille yeniden yazmak, daha ince çözünürlüklü bir model satın almak, beş nöbetçi tahminci daha almak ve her ilçede halka açık bir tatbikat yapmak. Hangi ikisini savunursun, hangi ölçütle?" },
            { who: "you", hint: "İki seçenek seç ve ölçütünü açıkça adlandır.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you. Publishing an error rate hands your critics a headline and changes nothing about the forecasts themselves. Is that not the worst possible use of a one-year budget?", tr: "Üsteleyeyim. Hata oranını yayımlamak eleştirmenlerine hazır bir manşet verir ve tahminlerin kendisinde hiçbir şeyi değiştirmez. Bu bir yıllık bütçenin olabilecek en kötü kullanımı değil mi?" },
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
              "I would defend publishing the expected rate and hiring the forecasters, on the criterion of what fails first: attention fails before accuracy does, and staffing fails before either. Your objection is fair and I want to concede the headline: the first year would be unpleasant. What I would not concede is that it changes nothing, because the rate is what allows the next unnecessary warning to be described as expected rather than as a failure, and that is exactly the sentence we currently cannot say. So: forecasters first, since without them nothing else is delivered reliably; the published rate second, because it is cheap and it changes the terms of every later argument; plain language third, since it improves an instrument we would otherwise be issuing badly. I would drop the finer model this year and say plainly why, rather than buy resolution we have nobody to interpret.",
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

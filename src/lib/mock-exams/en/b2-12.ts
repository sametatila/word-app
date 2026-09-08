import type { MockPaper } from "../types";

/**
 * B2 · Deneme 12 — "Forecasts, Warnings and Acting on Uncertainty".
 *
 * B2'nin öteki denemeleriyle AYNI PLAN; konu ayrı. Uyarı konusu B2 için
 * verimli çünkü tartışma iki yanlış arasında geçiyor: gelmeyen fırtına için
 * yol kapatmak ile gelen fırtına için kapatmamak. Bu bakışım koşul kipini,
 * edilgen çatıyı ve karşıtlık bağlaçlarını zorunlu kılıyor.
 *
 * On birinci kâğıtta uzun görüş metni birinci tekil bir savunmaydı. Burada
 * bilerek üçüncü tekil bir olay yeniden kurulumu var: tek bir gecenin
 * saatleri, kararları ve sonradan verilen hükmü. Söyleşi de tasarımcıyla
 * değil, yüzde otuza bakıp yol kapatmak zorunda kalan nöbetçi amirle.
 */
export const EN_B2_12: MockPaper = {
  id: "en-b2-12",
  course: "en",
  level: "B2",
  no: 12,
  theme: "Forecasts, Warnings and Acting on Uncertainty",
  themeTr: "Tahminler, uyarılar ve belirsizlikte karar vermek",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. You read texts with gaps, sentences to rewrite, an article, a text with missing sentences and four short texts.",
      instructionTr:
        "Bu bölümde yedi görev var. Boşluklu metinler, yeniden yazılacak cümleler, bir yazı, cümlesi eksik bir metin ve dört kısa metin okuyacaksın.",
      tasks: [
        {
          id: "en-b2-12-l1",
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
              title: "The storm that went thirty kilometres north",
              body: `A warning that is issued too often stops being a warning, and everybody in the field knows it. The difficulty is that the same is true of a warning that is issued too {{1}}.

Forecasters work with probabilities. On a Tuesday evening in March they may believe there is a forty per cent chance that a river will {{2}} its banks before dawn. That is a genuine statement about the world, and it cannot be turned into a yes or a no without losing the very thing that makes it honest.

The public, however, is given a decision rather than a number. A road is closed or it is not. Nobody can half-close a road, and the officer on duty is therefore {{3}} to convert a probability into an action.

When the storm goes thirty kilometres north and the closed road stays dry, the officer is accused of {{4}} the situation. When the storm arrives and the road was open, the same officer is accused of ignoring the forecast. The two accusations are made by the same newspapers, sometimes in the same month.

What is rarely {{5}} out is that these two errors are not equally expensive. A closed road costs a morning. A river that arrives without warning costs considerably more, and the difference is not a matter of opinion.

Nevertheless, the cheaper error is the visible one, because a flood that did not happen leaves nothing behind {{6}} an inconvenience and a photograph of an empty road.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-12-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["rarely", "occasionally", "little", "few"],
              answer: 0,
              explain:
                "Cümle sıklığın öteki ucunu veriyor: çok sık uyarmak da çok seyrek uyarmak da uyarıyı bozar. `too rarely` bu ucu kurar; `occasionally` ara sıra olmayı bildirir ve `too` ile bu anlamı vermez, `little` ile `few` ise nicelik zarfıdır.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["cross", "burst", "descend", "spill"],
              answer: 1,
              explain:
                "`burst its banks` bir nehrin taşmasını anlatan yerleşik eş dizimdir. `cross` ile `descend` kıyıyı bu anlamda nesne almaz, `spill` ise sıvının kabından dökülmesini anlatır.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["likely", "eager", "obliged", "reluctant"],
              answer: 2,
              explain:
                "Yolu yarım kapatmak mümkün olmadığı için amir olasılığı eyleme çevirmek zorunda: `obliged to convert`. `likely` olasılık, `eager` isteklilik, `reluctant` ise isteksizlik bildirir; hiçbiri zorunluluk değildir.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["overtaking", "overcoming", "overtaken", "overstating"],
              answer: 3,
              explain:
                "Fırtına gelmeyince amir durumu abartmakla suçlanıyor: `overstating the situation`. `overtaking` geçmek, `overcoming` üstesinden gelmek demektir, `overtaken` ise edilgen sıfat olduğu için `accused of` sonrası bu nesneyi alamaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["pointed", "spelled", "worked", "acknowledged"],
              answer: 0,
              explain:
                "`point out` bir noktaya dikkat çekmeyi anlatır ve cümle nadiren dile getirilen bir gerçeği veriyor. `worked out` hesaplamak, `spelled out` tek tek açıklamaktır; `acknowledged` ise `out` edatını almaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["except", "beside", "apart", "but"],
              answer: 3,
              explain:
                "`leaves nothing behind but …` yapısı «yalnızca» anlamını verir. `except` bu konumda `for` ister, `beside` yan yana olmayı, `apart` ise `from` almadan kullanılmaz.",
            },
          ],
        },
        {
          id: "en-b2-12-l2",
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
              title: "What a forecast is actually saying",
              body: `A forecast of rain is not a promise of rain, {{7}} it is read as one by almost everybody who hears it.

If the same conditions occurred a hundred times, rain would fall on forty of those occasions. That is what the number means, and it is {{8}} the number the listener takes away.

Nor {{9}} the confusion accidental. Broadcasters shorten probabilities because a sentence containing a percentage is longer, harder to say and less memorable than a sentence containing a verb.

{{10}} follows is a system in which the forecaster is honest, the broadcaster is efficient and the listener is misinformed, and no individual in that chain has done anything obviously wrong.

Attempts to publish the raw figures have been made {{11}} the nineteen eighties, and they have generally increased trust among people who already understood probability.

The rest of the audience treats forty per cent {{12}} a failed prediction whenever the rain does not arrive, which is, of course, sixty times out of a hundred.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-12-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["but", "although", "though", "yet"],
              explain:
                "İki yarı arasında karşıtlık var: tahmin bir söz değil, ama söz gibi anlaşılıyor. Karşıtlık bağlacı gerekiyor; `because` gerekçe verirdi.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["not"],
              explain:
                "Sayının anlamı ile dinleyicinin aldığı şey karşılaştırılıyor: «it is not the number the listener takes away». Cümlenin devamı bu olumsuzluğu gerektiriyor.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["is"],
              explain:
                "`Nor` ile başlayan cümle devrik kuruluş ister ve yardımcı fiil özneden önce gelir: «Nor is the confusion accidental».",
            },
            {
              kind: "gap",
              id: "en-b2-12-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["what"],
              explain:
                "Cümlenin öznesi bir ad tümcesi: «What follows is a system …». `That` öncül isterdi, `which` ise cümle başında özne kuramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["since"],
              explain:
                "Yakın zamanlı geçmiş bir başlangıç noktası alıyor: «have been made since the nineteen eighties». `for` süre uzunluğu isterdi, on yıl adı değil.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["as"],
              explain:
                "`treat something as something` bir şeyi bir şey saymayı anlatır: «treats forty per cent as a failed prediction». `like` bu yapıda ad öbeğiyle benzetme kurar, sayma değil.",
            },
          ],
        },
        {
          id: "en-b2-12-l3",
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
              title: "Public warning systems",
              body: `A public warning system is the arrangement by which a technical forecast is converted into instructions, and its central problem is the {{13}} of a probability into a single action.

Systems are judged on two kinds of error: a warning that is not followed by an event, and an event that is not preceded by a warning. The second is far more {{14}}, although the first is far more often complained about.

Repeated warnings that come to nothing produce a measurable {{15}} in the proportion of people who act on the next one.

Most services therefore set a threshold, and the {{16}} of that threshold is a political decision presented as a technical one.

Officers on duty report that the hardest cases are those in which the forecast is neither {{17}} enough to act on nor weak enough to ignore.

Reviews carried out after major floods usually conclude that the information existed and that its {{18}} to the people affected was the point at which the system failed.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-12-l3-13",
              no: 13,
              text: "CONVERT",
              accept: ["conversion"],
              explain:
                "`the ___ of a probability into a single action` bir ad ister; çekimli `convert` bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l3-14",
              no: 14,
              text: "COST",
              accept: ["costly"],
              explain:
                "`far more ___` bir sıfat ister ve karşılaştırılan şey iki yanlışın bedeli. `cost` ad, `costing` ise eylemin sürüyor olmasını bildirir.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l3-15",
              no: 15,
              text: "REDUCE",
              accept: ["reduction"],
              explain:
                "`produce a measurable ___ in the proportion` ad ister ve ölçülen şey bir azalma.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l3-16",
              no: 16,
              text: "PLACE",
              accept: ["placement", "placing"],
              explain:
                "`the ___ of that threshold` ad ister ve anlatılan şey eşiğin nereye konduğu. Yalın `place` bu tamlamada eylemi vermez.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l3-17",
              no: 17,
              text: "STRENGTH",
              accept: ["strong"],
              explain:
                "`neither ___ enough to act on nor weak enough to ignore` yapısı `weak` ile eşlenen bir sıfat ister; ad olan `strength` `enough to` ile kurulmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l3-18",
              no: 18,
              text: "DELIVER",
              accept: ["delivery"],
              explain:
                "`its ___ to the people affected` ad ister ve sistemin çöktüğü nokta bilginin ulaştırılması.",
            },
          ],
        },
        {
          id: "en-b2-12-l4",
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
              id: "en-b2-12-l4-19",
              no: 19,
              text: "The council closed the road because the forecast was so poor.\nSuch ______ that the council closed the road.",
              cue: "WAS",
              accept: ["was the forecast"],
              explain:
                "`Such + ad + that` yapısı cümle başında devrik kuruluş ister: yardımcı fiil özneden önce gelir ve `so poor` yerini `Such` alır.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l4-20",
              no: 20,
              text: "Nobody warned the villages before the water arrived.\nThe villages ______ before the water arrived.",
              cue: "WARNED",
              accept: ["were not warned", "had not been warned"],
              explain:
                "Etken cümle edilgene çevriliyor ve eylemi yapan `nobody` olduğu için olumsuzluk yükleme taşınır.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l4-21",
              no: 21,
              text: "The officer acted on the forecast, so the town was not flooded.\nThe town would have been flooded ______ on the forecast.",
              cue: "ACTED",
              accept: ["had the officer not acted"],
              explain:
                "Gerçekleşmemiş bir sonuç kuruluyor: üçüncü tip koşulun koşul yarısı `had + üçüncü hâl` ister, gerçek olan olumlu olduğu için koşul olumsuza çevrilir ve `if` düşünce devrik kuruluş zorunlu olur.",
            },
            {
              kind: "gap",
              id: "en-b2-12-l4-22",
              no: 22,
              text: "People stopped taking the warnings seriously after the third false alarm.\nThe warnings ______ seriously after the third false alarm.",
              cue: "TAKEN",
              accept: ["were no longer taken", "are no longer taken"],
              explain:
                "Etken cümle edilgene çevriliyor ve `stopped` süreklilik bildirdiği için karşılığı `no longer` olur.",
            },
          ],
        },
        {
          id: "en-b2-12-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and answer questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı oku ve 23–27. maddeleri yanıtla. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Reconstruction",
              genreTr: "Olay yeniden kurulumu",
              title: "One night in March, hour by hour",
              body: `At 19.40 the duty officer for the district, Lenn Vanek, received a forecast giving a forty per cent probability that the river would rise above the wall before dawn. Forty per cent is the least useful number in the profession. It is too high to file and too low to justify anything expensive.

At 20.10 she asked for the two figures nobody publishes: how long an evacuation of the lower street would take, and how long the warning would give her. The answers were ninety minutes and, at worst, forty. Given that gap, the decision stopped being about probability and became about arithmetic.

At 20.35 she closed the lower street and moved eleven households to the school. The road was reopened at 06.00. The river rose to within thirty centimetres of the wall and stopped there, and the storm turned north over the hills.

The following week she was criticised in two newspapers. The criticism was not stupid, and it deserves to be stated at its strongest: eleven families spent a night in a school hall for an event that did not occur, and the same officer had closed the same street twice in the previous eighteen months.

What the criticism omitted was the ninety minutes. If she had waited for certainty, it would have arrived at about half past three, and the evacuation would have finished long after the water reached the doors. She was not predicting a flood. She was deciding at what point a decision would still be possible.

Three years later the same street was closed on the same reasoning and the water came through the wall at four in the morning. Nobody wrote about that decision either, which is the ordinary fate of a warning that works. The only visible outcome of a correct call is an absence, and absences are not reported.`,
              gloss: [
                { de: "duty officer", tr: "nöbetçi amir", en: "duty officer" },
                { de: "an evacuation", tr: "tahliye", en: "evacuation" },
                { de: "an absence", tr: "yokluk", en: "absence" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-12-l5-23",
              no: 23,
              text: "Why does the writer call forty per cent the least useful number?",
              options: [
                "It is almost never produced by forecasts",
                "It is usually wrong by a wide margin",
                "It neither justifies action nor allows inaction",
                "It cannot be explained to the public quickly",
              ],
              answer: 2,
              explain:
                "Yazı ikisini birden veriyor: «too high to file and too low to justify anything expensive», yani ne eylemi ne de eylemsizliği doğruluyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l5-24",
              no: 24,
              text: "What changed the nature of the decision at 20.10?",
              options: [
                "The comparison of two lengths of time",
                "A second forecast raising the probability",
                "The arrival of rain in the upper valley",
                "Advice from the district's chief officer",
              ],
              answer: 0,
              explain:
                "Amir iki süreyi istiyor ve sonucu metin adlandırıyor: doksan dakika ile en kötü ihtimalle kırk dakika; «the decision stopped being about probability and became about arithmetic».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l5-25",
              no: 25,
              text: "How does the writer treat the criticism in the newspapers?",
              options: [
                "As an attack that does not deserve an answer",
                "As proof that the officer had acted wrongly",
                "As something invented after the event",
                "As reasonable and worth stating fully",
              ],
              answer: 3,
              explain:
                "Yazı eleştiriyi ciddiye alıyor: «The criticism was not stupid, and it deserves to be stated at its strongest», ve iki dayanağını da sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l5-26",
              no: 26,
              text: "What does the writer say the criticism left out?",
              options: [
                "The cost of keeping the school hall open",
                "The time the evacuation itself required",
                "The number of families in the lower street",
                "The distance the storm travelled north",
              ],
              answer: 1,
              explain:
                "Yazı eksik parçayı adlandırıyor: «What the criticism omitted was the ninety minutes», çünkü kesinlik gece 03.30'da gelirdi.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-l5-27",
              no: 27,
              text: "What point does the last paragraph make?",
              options: [
                "Successful warnings leave nothing to report",
                "The wall should have been rebuilt earlier",
                "Officers are rarely thanked by the public",
                "The same street floods every three years",
              ],
              answer: 0,
              explain:
                "Son paragraf kuralı veriyor: «The only visible outcome of a correct call is an absence, and absences are not reported».",
            },
          ],
        },
        {
          id: "en-b2-12-l6",
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
              title: "Why the false alarm is the famous one",
              body: `Two errors are possible in any warning system, and only one of them ever becomes a story. {{28}}

A warning followed by nothing produces a crowd of inconvenienced people, all of whom are available for interview the next morning and all of whom are, quite reasonably, annoyed. {{29}}

The opposite error produces silence of a different kind. The people worst affected are dealing with a flooded house, and the officer who failed to act is not asked to explain a decision that was never formally taken. {{30}}

This asymmetry is not a media conspiracy. It follows from what is visible, and visibility is the raw material of reporting. {{31}}

The practical consequence is that public pressure pushes in one direction only, and that any threshold set under such pressure will drift upwards year by year until an event arrives to push it back down.`,
              gloss: [
                { de: "asymmetry", tr: "bakışımsızlık", en: "asymmetry" },
                { de: "a threshold", tr: "eşik", en: "threshold" },
                { de: "to drift", tr: "yavaşça kaymak", en: "drift" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Nothing that did not happen can be photographed, and a newspaper cannot lead with an empty street." },
            { key: "b", label: "b", body: "The failure to act leaves no document, no announcement and nobody standing in a hall at midnight." },
            { key: "c", label: "c", body: "The other one produces no photographs, no interviews and no obvious moment at which somebody chose badly." },
            { key: "d", label: "d", body: "They are also easy to find, because the authority itself gathered them in one building and wrote down their names." },
            { key: "e", label: "e", body: "River levels in this region have been recorded continuously since 1873." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-12-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "c",
              explain:
                "Açılış kuralı koyuyor: «Two errors are possible in any warning system, and only one of them ever becomes a story». (c) ötekini tarif ederek karşıtlığı tamamlıyor: fotoğraf, söyleşi ve seçim anı yok.",
            },
            {
              kind: "match",
              id: "en-b2-12-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "d",
              explain:
                "Paragraf mağdur olmayan ama rahatsız edilmiş bir kalabalık tarif ediyor: «all of whom are available for interview the next morning». (d) bunlara ulaşmanın kolaylığını ekliyor: idare onları tek binada toplamış.",
            },
            {
              kind: "match",
              id: "en-b2-12-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "b",
              explain:
                "Paragraf hesabın sorulamadığını söylüyor: «the officer who failed to act is not asked to explain a decision that was never formally taken». (b) bunu somutluyor: belge yok, duyuru yok, gece yarısı salonda duran kimse yok.",
            },
            {
              kind: "match",
              id: "en-b2-12-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Paragraf görünürlüğün habercilikteki yerini söylüyor: «visibility is the raw material of reporting». (a) bunu örnekliyor: olmayan şey fotoğraflanamaz. (e) 1873'ten beri tutulan nehir kayıtlarından söz ediyor ve metinde ölçüm tarihi hiç tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-12-l7",
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
              label: "a — Forecaster",
              body: "I can tell you there is a forty per cent chance and I cannot tell you whether to close the road, and people find that answer evasive. It is not evasive. Those are two different jobs, and mixing them is how a technical service ends up making political decisions it was never given the authority to make.",
            },
            {
              key: "b",
              label: "b — Mayor",
              body: "I have been criticised for both errors in the same term of office, once for closing the market when nothing came and once for waiting three hours too long. The second week was considerably worse, and it did not feel eleven times worse at the time, which is exactly the trap.",
            },
            {
              key: "c",
              label: "c — Statistician",
              body: "A service that is never wrong in the direction of caution is a service that is not warning early enough. False alarms are not a defect of the system; they are the price of the lead time, and any threshold low enough to be useful will produce them regularly.",
            },
            {
              key: "d",
              label: "d — Shopkeeper",
              body: "Three closures in eighteen months and nothing happened on any of them. I lost a Saturday each time. I still think they were right to close, and I would like somebody to say out loud that being right cost me two thousand euros, because at the moment that part is simply not mentioned.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-12-l7-32",
              no: 32,
              text: "Which text says that two roles should be kept separate?",
              answer: "a",
              explain:
                "(a) ayrımı adlandırıyor: «Those are two different jobs», ve karıştırmanın teknik bir kurumu siyasi karar vericiye çevirdiğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-12-l7-33",
              no: 33,
              text: "Which text says that false alarms are a necessary cost?",
              answer: "c",
              explain:
                "(c) yanlış alarmı kusur saymıyor: «they are the price of the lead time», ve yararlı her eşiğin bunları düzenli üreteceğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-12-l7-34",
              no: 34,
              text: "Which text says the losses from a correct decision are never acknowledged?",
              answer: "d",
              explain:
                "(d) hem kararı onaylıyor hem bedeli anıyor: «being right cost me two thousand euros, because at the moment that part is simply not mentioned».",
            },
            {
              kind: "match",
              id: "en-b2-12-l7-35",
              no: 35,
              text: "Which text says the two errors did not feel equally serious at the time?",
              answer: "b",
              explain:
                "(b) hissedilenle gerçek arasındaki farkı veriyor: «it did not feel eleven times worse at the time, which is exactly the trap».",
            },
            {
              kind: "match",
              id: "en-b2-12-l7-36",
              no: 36,
              text: "Which text gives a number for how often the writer was affected?",
              answer: "d",
              explain:
                "(d) sayıyı veriyor: «Three closures in eighteen months», ve her seferinde bir cumartesi kaybettiğini ekliyor.",
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
        "This part has four tasks. You hear extracts, some information, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Parçalar, bir bilgilendirme, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-12-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c for questions 1 to 8. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. 1–8. maddeler için a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir tahminci mesleğinin sınırını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I am asked whether it will rain and I answer with a percentage, and people hear that as an evasion. It is the opposite. The percentage is the honest answer and the yes or no is the one that hides what I do not know." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Phone call",
              genreTr: "Telefon görüşmesi",
              situation: "Biri uyarı hizmetini soruyor.",
              plays: 2,
              segments: [
                { text: "Do I need to sign up for the flood messages?" },
                { text: "You do, and it is free. We need the address, not just the phone number, because the messages go out by street." },
                { text: "And if I move?" },
                { text: "Tell us. A message sent to the wrong street is worse than no message at all." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir amir kararını anlatıyor.",
              plays: 2,
              segments: [
                { text: "I did not close the street because I thought the river would come. I closed it because moving those houses takes ninety minutes and the warning would have given me forty. Waiting would not have given me a better decision. It would have given me no decision." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Between neighbours",
              genreTr: "Komşular arasında",
              situation: "İki komşu üçüncü kapatmayı konuşuyor.",
              plays: 2,
              segments: [
                { text: "That is the third time and nothing has happened once." },
                { text: "I lost a Saturday too. I still think she was right, and I would like somebody to admit that being right has a price and that I paid it." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Lecture",
              genreTr: "Ders",
              situation: "Bir istatistikçi eşiği anlatıyor.",
              plays: 2,
              segments: [
                { text: "If a service never warns you about something that then fails to happen, the threshold is too high. False alarms are not evidence of incompetence. They are what you buy when you buy warning time, and a system without them is warning you far too late." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir görevli hizmetteki değişikliği duyuruyor.",
              plays: 2,
              segments: [
                { text: "From October the recorded line will be updated every three hours instead of every six, and the test message moves to the first Monday of the month. The service itself remains free, and sandbags are still kept at the school." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Newsroom",
              genreTr: "Haber odası",
              situation: "İki gazeteci haberi tartışıyor.",
              plays: 2,
              segments: [
                { text: "There is no picture for the flood that did not happen." },
                { text: "There is an empty road." },
                { text: "An empty road is not a photograph, it is an absence. That is why we always end up running the angry families and never the working system." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "Short talk",
              genreTr: "Kısa konuşma",
              situation: "Bir konuşmacı iki hatanın bedelini karşılaştırıyor.",
              plays: 2,
              segments: [
                { text: "A closed road costs a morning. A river that arrives unannounced costs houses, and in the worst cases it costs more than that. Those two are not comparable, and yet public argument treats them as though they sat on the same scale." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-12-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the forecaster say about percentages?",
              options: ["They are the truthful answer", "They confuse most listeners", "They are required by the service"],
              answer: 0,
              explain:
                "Tahminci kaçamak suçlamasını tersine çeviriyor: «The percentage is the honest answer and the yes or no is the one that hides what I do not know».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-2",
              no: 2,
              ref: "a2",
              text: "Why does the service need the address?",
              options: ["To send a paper copy each year", "To check that you live in the district", "Because messages are sent street by street"],
              answer: 2,
              explain:
                "Görevli gerekçeyi veriyor: «the messages go out by street», bu yüzden telefon numarası tek başına yetmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-3",
              no: 3,
              ref: "a3",
              text: "Why did the officer act when she did?",
              options: ["She was certain the river would rise", "Waiting would have removed the choice", "The forecast had reached ninety per cent"],
              answer: 1,
              explain:
                "Amir iki süreyi karşılaştırıyor: doksan dakikaya karşı kırk dakika, ve «Waiting … would have given me no decision».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the second speaker want?",
              options: ["The cost of being right acknowledged", "Compensation from the council", "An end to the road closures"],
              answer: 0,
              explain:
                "Konuşmacı kararı onaylıyor ama tanınma istiyor: «I would like somebody to admit that being right has a price and that I paid it».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the statistician say about false alarms?",
              options: ["They should be counted separately", "They show the threshold is too low", "They are the price of warning time"],
              answer: 2,
              explain:
                "İstatistikçi yanlış alarmı beceriksizlikten ayırıyor: «They are what you buy when you buy warning time».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-6",
              no: 6,
              ref: "a6",
              text: "What is changing in October?",
              options: ["The charge for the service", "How often the line is updated", "The place where sandbags are kept"],
              answer: 1,
              explain:
                "Duyuru değişikliği veriyor: «updated every three hours instead of every six», ücret ve kum torbası yeri aynı kalıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-7",
              no: 7,
              ref: "a7",
              text: "What is the second journalist's point?",
              options: ["An absence cannot be pictured", "The families were not interviewed", "The system does not really work"],
              answer: 0,
              explain:
                "Gazeteci nedeni adlandırıyor: «An empty road is not a photograph, it is an absence», bu yüzden hep öfkeli aileler haber oluyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the speaker say about the two errors?",
              options: ["Both are avoidable with better data", "They are argued about as equals", "The public prefers the second one"],
              answer: 1,
              explain:
                "Konuşmacı bedelleri ayırıp tartışmayı eleştiriyor: «public argument treats them as though they sat on the same scale».",
            },
          ],
        },
        {
          id: "en-b2-12-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear information about a local flood warning service. Complete the notes, questions 9 to 16. Write ONE or TWO words or a number in each gap. You hear the information twice.",
          promptTr:
            "Yerel bir sel uyarı hizmeti hakkında bilgi dinleyeceksin. 9–16. maddelerdeki notları tamamla. Her boşluğa BİR ya da İKİ sözcük veya bir sayı yaz. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Information",
              genreTr: "Bilgilendirme",
              situation: "Bir görevli uyarı hizmetini anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. The new arrangements begin in October. Warnings are sent by text, not by email, and to register we need your address as well as your number. The recorded line is updated every three hours. A test message goes out on the first Monday of each month, at nine in the morning. An amber warning means water is expected within twelve hours; a red warning means six. Sandbags are kept at the school, not at the depot, and the whole service is free.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notes",
              genreTr: "Not kâğıdı",
              title: "Flood warning service — notes",
              body: `New arrangements begin in:   {{9}}
Warnings are sent by:        {{10}}
To register, give your:      {{11}}
Line updated every:          {{12}} hours
Test message: first {{13}} of the month
Amber = water within {{14}} hours
Sandbags are kept at the {{15}}
Cost of the service:         {{16}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-12-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["october"],
              explain:
                "Kayıt başlangıcı veriyor: «The new arrangements begin in October». Pazartesi, deneme iletisinin günü.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["text", "text message"],
              explain:
                "Kayıt iki kanalı karşılaştırıyor: «sent by text, not by email». Not kâğıdı gönderim yolunu soruyor, dolayısıyla kullanılmayan kanal değil kullanılan kanal yazılır.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["address"],
              explain:
                "«we need your address as well as your number» — numaranın yanında istenen bilgi. Numara zaten kayıtlı olduğu için satırın sorduğu şey adrestir.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["3", "three"],
              explain:
                "«The recorded line is updated every three hours» — güncelleme sıklığı. On iki ve altı, uyarı renklerinin süreleri.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["monday"],
              explain:
                "«A test message goes out on the first Monday of each month» — deneme iletisinin günü. Dokuz, saatidir.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["12", "twelve"],
              explain:
                "«An amber warning means water is expected within twelve hours» — turuncu uyarının süresi. Altı, kırmızı uyarıya aittir.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["school"],
              explain:
                "«Sandbags are kept at the school, not at the depot» — kum torbalarının yeri; depo açıkça dışarıda bırakılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-12-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["free", "nothing"],
              explain:
                "«the whole service is free» — hizmetin bedeli. Kayıtta başka bir tutar geçmiyor.",
            },
          ],
        },
        {
          id: "en-b2-12-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about warnings and forecasts, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Uyarılar ve tahminler üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "Two separate jobs are being confused." },
            { key: "b", label: "The speaker was wrong in both directions." },
            { key: "c", label: "The decision was about time, not probability." },
            { key: "d", label: "False alarms are the cost of early warning." },
            { key: "e", label: "A correct decision leaves nothing to show." },
            { key: "f", label: "The public should be given the raw numbers." },
            { key: "g", label: "Warnings should be issued by the police." },
            { key: "h", label: "The speaker no longer acts on the messages." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı iki işin karıştırıldığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "My job ends at the percentage. Whether that percentage is enough to close a road is somebody else's job, and when the two get merged a technical office starts making decisions it was never elected to make." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kendi iki hatasını anlatıyor.",
              plays: 2,
              segments: [
                { text: "In one term I closed the market for a storm that never came, and eight months later I waited three hours too long. I have been shouted at for both, and only one of them kept me awake afterwards." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı kararını neye dayandırdığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "People assume I was betting on the river. I was not. Moving eleven households takes ninety minutes, the warning gives forty, and once you have those two numbers the probability stops being the thing you are deciding about." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı yanlış alarmı savunuyor.",
              plays: 2,
              segments: [
                { text: "Every warning that comes to nothing is treated as a failure, and it is not. Push the threshold up until they disappear and you have a service that tells people about the water while it is coming through the door." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı iyi kararın görünmezliğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "The second time she closed that street the water did come through, at four in the morning, and not one paper wrote about the closure. Getting it right produces an absence, and nobody has ever reported an absence." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı ham sayıların yayımlanmasını istiyor.",
              plays: 2,
              segments: [
                { text: "Give me the forty per cent. I am perfectly capable of deciding what to do with it, and every time somebody rounds it up into a warning or down into silence, I am being protected from information that is mine." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-12-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Birinci konuşmacı sınırı çiziyor: «My job ends at the percentage», ve karışmanın seçilmemiş bir ofisi karar verici yaptığını söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-12-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "İkinci konuşmacı iki yanlışı da anlatıyor: gelmeyen fırtına için pazarı kapatmış ve sekiz ay sonra «I waited three hours too long».",
            },
            {
              kind: "match",
              id: "en-b2-12-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Üçüncü konuşmacı iki süreyi veriyor: doksan dakikaya karşı kırk, ve «the probability stops being the thing you are deciding about».",
            },
            {
              kind: "match",
              id: "en-b2-12-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Dördüncü konuşmacı eşiği yükseltmenin sonucunu gösteriyor: «Push the threshold up until they disappear» dediğinde ortaya su kapıdan girerken haber veren bir hizmet çıkıyor.",
            },
            {
              kind: "match",
              id: "en-b2-12-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Beşinci konuşmacı doğru kararın izini adlandırıyor: «Getting it right produces an absence, and nobody has ever reported an absence».",
            },
            {
              kind: "match",
              id: "en-b2-12-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Altıncı konuşmacı ham sayıyı istiyor: «Give me the forty per cent», ve yuvarlanmanın kendisini bilgiden yoksun bıraktığını söylüyor.",
            },
          ],
        },
        {
          id: "en-b2-12-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear an interview with a woman who works as a duty officer for a flood service. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr:
            "Bir sel hizmetinde nöbetçi amir olarak çalışan bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Söyleşiyi iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir sunucu, dokuz yıldır nöbetçi amirlik yapan Lenn ile konuşuyor.",
              plays: 2,
              segments: [
                { text: "You have been making these decisions for nine years. What does a forty per cent forecast feel like?" },
                { text: "Like the worst number in the job. Eighty is easy and five is easy. Forty is where you find out what your service actually believes, because nothing in the manual covers it." },
                { text: "How do you decide?" },
                { text: "Not on the probability, which surprises people. I ask how long an action takes and how long the warning will give me. If the action is longer than the warning, the probability has stopped mattering." },
                { text: "That sounds like a way of avoiding the judgement." },
                { text: "It is a way of making the judgement earlier, at a point where it can still be carried out. Waiting for certainty is not caution. It is choosing to be certain and helpless at the same time." },
                { text: "You were criticised for the March closure." },
                { text: "I was, and the criticism had a real point in it. Eleven families spent a night in a hall for nothing, and one of them had a child of four months. I have never argued that the cost was zero." },
                { text: "Did it change what you do?" },
                { text: "It changed what I write down. I now record the two times, the action and the warning, in the log before I decide. Not to protect myself. So that whoever reviews it is arguing with the reasoning rather than with the outcome." },
                { text: "Does the public understand any of this?" },
                { text: "Individually, yes, every time. Collectively, no, and I have stopped expecting it to. The one thing I would change is the reporting: the closure that works is never a story, so people only ever read about the closures that look foolish." },
                { text: "Would publishing the probabilities help?" },
                { text: "It would help the people who already read carefully, which is not nothing. It would not touch the person who hears forty per cent and files it as no." },
                { text: "Last question. Would you take the job again?" },
                { text: "Yes, and I would want somebody to tell the new person the thing nobody told me: you will be judged on outcomes and you can only control decisions, and those are different, and the gap between them is where this job is actually lived." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-12-h4-23",
              no: 23,
              ref: "d1",
              text: "Why is forty per cent difficult?",
              options: ["It is usually inaccurate", "No rule covers that case", "It occurs several times a week"],
              answer: 1,
              explain:
                "Lenn kolay olanları ayırıyor: «Eighty is easy and five is easy», kırkta ise «nothing in the manual covers it».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-24",
              no: 24,
              ref: "d1",
              text: "What does she base the decision on?",
              options: ["A comparison of two durations", "The level of the river that evening", "The advice of the forecasting office"],
              answer: 0,
              explain:
                "Lenn olasılığı dışarıda bırakıyor: «I ask how long an action takes and how long the warning will give me».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-25",
              no: 25,
              ref: "d1",
              text: "How does she answer the charge of avoiding judgement?",
              options: ["She says the manual requires it", "She says nobody else will decide", "She says it moves the judgement earlier"],
              answer: 2,
              explain:
                "Lenn kaçınmayı reddediyor: «It is a way of making the judgement earlier», çünkü kesinliği beklemek kişiyi çaresiz bırakıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-26",
              no: 26,
              ref: "d1",
              text: "What does she say about the criticism she received?",
              options: ["It contained something valid", "It came only from one newspaper", "It was based on a false report"],
              answer: 0,
              explain:
                "Lenn eleştiriyi kabul ediyor: «the criticism had a real point in it», ve on bir ailenin bir geceyi salonda geçirdiğini anıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-27",
              no: 27,
              ref: "d1",
              text: "What did the episode change?",
              options: ["The threshold used by the service", "What she records before deciding", "The number of officers on duty"],
              answer: 1,
              explain:
                "Lenn değişikliği tarif ediyor: iki süreyi «in the log before I decide» yazıyor, kendini korumak için değil, gerekçenin tartışılabilmesi için.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-28",
              no: 28,
              ref: "d1",
              text: "What would she most like to change?",
              options: ["The way decisions are reported", "The training given to officers", "The wording of the messages"],
              answer: 0,
              explain:
                "Lenn tek değişikliği söylüyor: «the closure that works is never a story», bu yüzden yalnız aptalca görünen kapatmalar okunuyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-29",
              no: 29,
              ref: "d1",
              text: "What does she think about publishing probabilities?",
              options: ["It would remove the criticism", "It would help a limited group", "It would confuse most listeners"],
              answer: 1,
              explain:
                "Lenn sınırı çiziyor: dikkatli okuyanlara yarar, «It would not touch the person who hears forty per cent and files it as no».",
            },
            {
              kind: "mcq",
              id: "en-b2-12-h4-30",
              no: 30,
              ref: "d1",
              text: "What would she tell somebody starting the job?",
              options: ["Outcomes and decisions are not the same", "The first year is by far the hardest", "Never close a road before midnight"],
              answer: 0,
              explain:
                "Lenn işin özünü veriyor: «you will be judged on outcomes and you can only control decisions, and those are different».",
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
          id: "en-b2-12-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed public warnings about floods and storms. Now write an essay for your teacher, answering this question: \"Is it better to warn too often or too rarely?\" Use the two ideas below and add one idea of your own.\n\nIdeas: what repeated false alarms do — what a missed warning costs",
          promptTr:
            "İngilizce dersinde sel ve fırtına uyarılarını tartıştınız. Öğretmenin için bir deneme yaz: \"Çok sık uyarmak mı yoksa çok seyrek uyarmak mı daha iyidir?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: tekrarlanan yanlış alarmların etkisi — kaçırılan bir uyarının bedeli",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss what repeated false alarms do.", tr: "Tekrarlanan yanlış alarmların etkisini tartış." },
              { de: "Discuss what a missed warning costs.", tr: "Kaçırılan bir uyarının bedelini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Both mistakes are real and only one of them is ever discussed, which is itself part of the problem.

Warnings that come to nothing do genuine damage. After three closures with no flood, people begin to treat the fourth message as noise, and the loss of attention is not recovered by explaining afterwards that the service was being careful. A shopkeeper who loses three Saturdays is not being unreasonable when he stops believing the fourth.

Nevertheless, the two errors are not the same size. A closure costs a morning and some annoyance, whereas water arriving unannounced costs houses and occasionally lives, and no amount of inconvenience adds up to that. Treating the two as equal is the most common mistake in the public argument.

My own view is that the question is wrongly framed. What matters is not frequency but explanation: a warning that says what it is based on and how likely it is can be judged by the person receiving it.

I would rather be warned too often, provided I am told each time how probable the event was.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Yanlış alarmın zararı ciddiye alındı mı?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (nevertheless, whereas, provided that)",
              "140–190 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-b2-12-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Your neighbourhood association has asked you to report on the local warning service after a night when a street was closed and no flood came. Write a report for the committee. Describe what happened, assess the decision fairly, and recommend one change. Write 140 to 190 words.",
          promptTr:
            "Mahalle derneği, bir sokağın kapatıldığı ve selin gelmediği bir geceden sonra yerel uyarı hizmeti üzerine rapor yazmanı istedi. Yönetim kuruluna bir rapor yaz. Olanları anlat, kararı adil biçimde değerlendir ve tek bir değişiklik öner. 140–190 kelime.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Describe what happened, with times.", tr: "Olanları saatlerle anlat." },
              { de: "Assess the decision fairly, including its cost.", tr: "Kararı bedeliyle birlikte adil değerlendir." },
              { de: "Recommend one change.", tr: "Tek bir değişiklik öner." },
            ],
            sample: `Report on the closure of Mill Street, 14 March

At 20.35 the duty officer closed Mill Street and moved eleven households to the school. The road reopened at 06.00. The river rose to within thirty centimetres of the wall and the storm passed north of the town.

The cost was not nothing, and this report should say so plainly. Eleven families lost a night, two shops lost a Saturday delivery, and three residents have told me they will ignore the next message.

Nevertheless, the decision appears sound. Moving those households takes about ninety minutes and the warning would have given roughly forty, so waiting for certainty would have produced a decision that could no longer be carried out.

What failed was not the judgement but the explanation. Residents were told to leave and were not told why, and the reasoning only became public a week later through a newspaper.

I recommend one change: that the two timings behind any closure be published on the notice board within twenty-four hours.`,
            criteria: [
              "Olay saatlerle verildi mi?",
              "Kararın bedeli açıkça sayıldı mı?",
              "Değerlendirme tek yanlı mı, yoksa iki tarafı da görüyor mu?",
              "Öneri tek ve uygulanabilir mi?",
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
      instruction: "This part has three tasks: an interview, a long turn with a comparison, and a discussion.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, karşılaştırmalı tek başına konuşma ve tartışma.",
      tasks: [
        {
          id: "en-b2-12-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about warnings, weather and decisions.",
          promptTr: "Sana uyarılar, hava durumu ve karar verme hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. How much attention do you pay to weather forecasts?", tr: "Günaydın. Hava tahminlerine ne kadar dikkat edersin?" },
            { who: "you", hint: "Alışkanlığını anlat ve bir örnek ver.", expect: "bir alışkanlığı örnekle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Tell me about a time you ignored a warning, or followed one that turned out to be unnecessary.", tr: "Teşekkürler. Bir uyarıyı görmezden geldiğin ya da gereksiz çıkan bir uyarıya uyduğun bir zamanı anlat." },
            { who: "you", hint: "Tek bir olayı sonucuyla anlat.", expect: "bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if you had been told there was a forty per cent chance of flooding tonight, what would you have done?", tr: "Bu gece yüzde kırk sel olasılığı olduğu söylenseydi ne yapardın?" },
            { who: "you", hint: "Üçüncü tip koşulla cevapla ve gerekçelendir.", expect: "üçüncü tip koşul kurmak", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "describe a habit with an example", tr: "Bir alışkanlığı örnekle anlatmak" },
              { de: "narrate an event and its outcome", tr: "Bir olayı sonucuyla anlatmak" },
              { de: "use a third conditional", tr: "Üçüncü tip koşulu kullanmak" },
            ],
            sample:
              "I look at the forecast every morning and I mostly use it to decide about a coat, which is not a serious use of a serious service. I did once ignore a wind warning and cycled anyway, and I spent forty minutes pushing the bicycle along a road covered in branches. If I had been told there was a forty per cent chance of flooding, I would have moved everything off the floor and stayed, because moving things is cheap and leaving the flat is not.",
            criteria: [
              "İlk cevapta somut bir örnek verildi mi?",
              "Anlatı sonucuyla birlikte verildi mi?",
              "Üçüncü tip koşul doğru kuruldu mu?",
              "Cevaplar geliştirildi mi?",
            ],
          },
        },
        {
          id: "en-b2-12-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about a minute and a half. Compare two ways of telling the public about a possible flood: giving people the probability as a number, or giving them a single clear instruction. Say which works better and why, and mention one objection to your choice.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Olası bir seli halka duyurmanın iki yolunu karşılaştır: olasılığı sayı olarak vermek mi, tek ve açık bir talimat vermek mi? Hangisinin daha iyi işlediğini ve nedenini söyle, seçtiğine bir itirazı da an.",
          prepSeconds: 60,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "compare the two approaches", tr: "İki yaklaşımı karşılaştır" },
              { de: "say which works better and why", tr: "Hangisinin daha iyi işlediğini ve nedenini söyle" },
              { de: "mention one objection to your own choice", tr: "Kendi seçimine bir itirazı an" },
            ],
            sample:
              "A number is honest and it is also, for most people, unusable at eleven o'clock at night, because forty per cent is filed either as certainty or as nothing. A single instruction is usable and it hides everything the service does not know, which is how trust gets spent without anybody noticing. I would give the instruction and publish the number alongside it. The objection to that is real: a message with two parts is a message people stop reading halfway through, and there is good evidence that the second half of any public warning is the part that gets ignored.",
            criteria: [
              "İki yaklaşım da karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçimine bir itiraz anıldı mı?",
              "Karşıtlık yapıları kullanıldı mı? (whereas, alongside, without)",
              "Bir buçuk dakika sürdürüldü mü?",
            ],
          },
        },
        {
          id: "en-b2-12-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt: "We discuss the topic further together.",
          promptTr: "Konuyu birlikte biraz daha tartışıyoruz.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Some people say an official who closes a road for a flood that never comes should apologise. Do you agree?", tr: "Kimileri, gelmeyen bir sel için yolu kapatan görevlinin özür dilemesi gerektiğini söylüyor. Katılır mısın?" },
            { who: "you", hint: "Görüşünü söyle ve bir örnekle destekle.", expect: "görüş bildirmek ve örnekle desteklemek", seconds: 45 },
            { who: "partner", de: "But people did lose a night and some lost money. Does that count for nothing?", tr: "Ama insanlar bir gecelerini, bazıları da para kaybetti. Bu hiç mi sayılmaz?" },
            { who: "you", hint: "İtiraza doğrudan karşılık ver, kaybı yok sayma.", expect: "bir itiraza kaybı kabul ederek karşılık vermek", seconds: 45 },
            { who: "partner", de: "And should the public be given the raw probabilities, or is that too much information?", tr: "Halka ham olasılıklar verilmeli mi, yoksa bu fazla bilgi mi olur?" },
            { who: "you", hint: "Bir taraf seç ve gerekçelendir.", expect: "bir tarafı seçmek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "support an opinion with an example", tr: "Görüşü örnekle desteklemek" },
              { de: "answer an objection without dismissing it", tr: "İtirazı küçümsemeden karşılamak" },
              { de: "choose a side and justify it", tr: "Bir tarafı seçip gerekçelendirmek" },
            ],
            sample:
              "An apology would be the wrong instrument, because it treats a correct decision as a mistake that happened to be lucky. The officer who closed Mill Street was working with ninety minutes of action against forty minutes of warning, and that is not a gamble. Your point stands, though, and I do not want to wave it away: eleven families lost a night and two shops lost a delivery, and those losses are as real as the flood would have been. What they deserve is an accounting rather than an apology. On the probabilities, I would publish them, because a public that is never trusted with a number will never learn to read one.",
            criteria: [
              "Görüş örnekle desteklendi mi?",
              "İtiraz küçümsenmeden karşılandı mı?",
              "Taraf seçimi gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

import type { MockPaper } from "../types";

/**
 * B2 · Deneme 2 — "Science, Media and Trust".
 *
 * Deneme 1 ile AYNI PLAN; konu ayrı. Birincisi şehir, çalışma ve dikkat
 * üzerineydi, bu ikincisi bilimin kamuya nasıl aktarıldığı üzerine. İkisi de
 * B2'nin asıl ölçtüğü şeyi taşıyor: bir tartışmada iddiayı, gerekçeyi ve
 * gerekçenin sınırını ayırt etmek.
 *
 * B2 SINIRI: edilgen çeşitleri, üçüncü tip koşul, dolaylı anlatım, ortaç
 * öbeği, ileri bağlayıcılar, resmî/gayriresmî kayıt farkı.
 */
export const EN_B2_02: MockPaper = {
  id: "en-b2-02",
  course: "en",
  level: "B2",
  no: 2,
  theme: "Science, Media and Trust",
  themeTr: "Bilim, medya ve güven",
  minutes: 195,
  parts: [
    /* ── READING ───────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "This part has seven tasks. The first four are about vocabulary and grammar; the last three are reading tasks. Choose or write the correct answer for each question.",
      instructionTr:
        "Bu bölümde yedi görev var. İlk dördü kelime ve dilbilgisi, son üçü okuma görevi. Her soruda doğru cevabı seç ya da yaz.",
      tasks: [
        {
          id: "en-b2-02-l1",
          no: 1,
          format: "gapMcq",
          goal: "structure",
          prompt: "Read the text and decide which answer best fits each gap, 1 to 6. Choose a, b, c or d.",
          promptTr: "Metni oku ve 1–6. boşluklara en uygun seçeneği bul. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Magazine article",
              genreTr: "Dergi yazısı",
              title: "The press release problem",
              body: `Most science journalism begins with a press release rather than a paper, and this simple fact {{1}} for a surprising amount of what goes wrong.

A release is written by the university, not by the reporter, and its purpose is to attract attention. Nobody in the process is required to {{2}} that the wording matches the study exactly.

Researchers who have compared releases with the papers behind them {{3}} out that exaggeration usually enters at this stage, before any journalist is involved. Blaming the newspapers alone therefore {{4}} the point.

The remedy is unglamorous. Several universities now ask an author to sign off the release, which {{5}} the number of overstated claims by roughly a third in one trial.

That is a real improvement, but it is worth {{6}} in mind that a third is not everything, and the remaining two thirds still reach the public unchanged.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-02-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["explains", "answers", "accounts", "counts"],
              answer: 2,
              explain:
                "Boşluktan sonra `for` var ve anlam bir olguyu açıklamak: `account for`. `explain` bu anlamı verir ama `for` almaz; `answer for` sorumluluk üstlenmek, `count for` ise değer taşımak demektir.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["check", "control", "prove", "confirm"],
              answer: 0,
              explain:
                "Anlam, ifadenin çalışmayla örtüşüp örtüşmediğini denetlemek: `check that …`. `control` Türkçedeki \"kontrol etmek\"in yanıltıcı karşılığıdır ve İngilizcede yönetmek demektir; `prove` ve `confirm` ise sonucu baştan varsayar.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["put", "bring", "point", "set"],
              answer: 2,
              explain:
                "`point out that …` bir bulguyu dile getirmek anlamındaki öbek fiil. `put out`, `bring out` ve `set out` başka anlamlar taşır ve hiçbiri `that` yan cümlesiyle bu işlevi görmez.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["loses", "misses", "drops", "escapes"],
              answer: 1,
              explain:
                "`miss the point` yerleşik bir eşdizim: asıl meseleyi ıskalamak. `lose the point` puan kaybetmek çağrışımı yapar, `drop` ve `escape` ise bu adla bu anlamı hiç vermez.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["lowered", "reduced", "shortened", "decreased"],
              answer: 1,
              explain:
                "Nesne `the number of overstated claims` ve anlam sayıyı azaltmak: `reduce the number of` en doğal eşdizim. `lower` fiyat ya da düzeyle, `shorten` uzunlukla gider; `decrease` genelde geçişsiz kullanılır ve bu yapıda zayıf durur.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["holding", "taking", "keeping", "having"],
              answer: 2,
              explain:
                "`bear in mind` ve `keep in mind` aynı anlamı taşıyan iki kalıptır; cümledeki `worth + -ing` yapısı ikincisini istiyor. `hold in mind`, `take in mind` ve `have in mind` bu kalıbı kurmaz — `have in mind` başka bir anlam taşır (aklında bir plan olmak).",
            },
          ],
        },
        {
          id: "en-b2-02-l2",
          no: 2,
          format: "gap",
          goal: "structure",
          prompt: "Read the text and think of the word which best fits each gap, 7 to 12. Use only ONE word in each gap.",
          promptTr: "Metni oku ve 7–12. boşluklara en uygun sözcüğü bul. Her boşluğa YALNIZ BİR sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Report extract",
              genreTr: "Rapor bölümü",
              title: "What readers do with a correction",
              body: `A newspaper that publishes a correction has done the right thing, {{7}} the effect is smaller than editors hope.

In one study, readers {{8}} had seen the original article were shown the correction two days later. Three weeks after that, more than half of them repeated the original claim.

The finding has been replicated often enough {{9}} it is no longer controversial. What remains disputed is the explanation, {{10}} matters because different explanations imply different remedies.

If the cause were simply inattention, a clearer correction {{11}} have solved the problem years ago. The evidence suggests something less convenient: a first version leaves a trace that a second version does not remove.

Editors are therefore being asked to think {{12}} terms of prevention rather than repair, which is a harder discipline and a much less visible one.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-02-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["but", "although", "though", "yet"],
              explain:
                "İki yarı karşıt: doğru olan yapılmış, ama etkisi umulandan küçük. `but`, `although`, `though` ve `yet` bu karşıtlığı kurar. `so` ya da `because` anlamı bozardı.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["who", "that"],
              explain:
                "«readers ___ had seen the original article» yapısında boşluk özne konumunda bir ilgi zamiri istiyor ve öncül insan: `who` ya da `that`. Zamir özne olduğu için düşürülemez.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["that"],
              explain:
                "`often enough that …` yapısı bir sonucu bağlar: yeterince sık tekrarlanmış, öyle ki artık tartışmalı değil. `so … that` kalıbının bir çeşidi; `to` mastar isterdi ve buradaki yan cümleyi kuramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["which"],
              explain:
                "Virgülden sonra gelen ve bütün bir önceki cümleye gönderme yapan ilgi zamiri `which`tir: açıklamanın tartışmalı olması önemlidir. `that` bu tür açıklayıcı ilgi cümlesinde kullanılmaz, `what` ise öncül almaz.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["would"],
              explain:
                "Koşul cümlesi `If the cause were …` biçiminde ikinci tip; ana cümlenin yardımcı fiili `would` olur ve `have solved` ile birleşerek karma bir koşul kurar. `will` bu yapıda gelmez.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["in"],
              explain:
                "`think in terms of …` yerleşik bir kalıp: bir şeyi belli bir çerçeveden düşünmek. `on terms` ya da `with terms` bu anlamı vermez; `in terms of` sabit bir üçlüdür.",
            },
          ],
        },
        {
          id: "en-b2-02-l3",
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
              title: "Peer review",
              body: `Peer review is the process by which a scientific paper is judged by other researchers before {{13}}.

Its defenders describe it as a filter. Its critics point to the {{14}} of the process: two reviewers often disagree completely, and the outcome can depend on who was asked.

Neither description is quite right. Review rarely detects deliberate fraud, and it is {{15}} at doing so, because it assumes that the data it is shown is real.

What it does well is narrower and still valuable: it catches unclear writing, missing detail and {{16}} claims that the authors themselves recognise as too strong once they are named.

Several journals have experimented with open review, in which the reports are published. Early results suggest a modest {{17}} in the quality of the reports, and a sharp fall in the number of researchers willing to write them.

The most likely future is therefore a mixed one, with different fields making different choices according to their own {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-02-l3-13",
              no: 13,
              text: "PUBLISH",
              accept: ["publication"],
              explain:
                "`before ___` yapısında edattan sonra bir ad gerekiyor. `publish` fiilinin adı `publication`; `publisher` bir kişi ya da kurumu adlandırır ve makale bir kişiden önce değerlendirilmez.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l3-14",
              no: 14,
              text: "CONSIST",
              accept: ["inconsistency"],
              explain:
                "Cümlenin devamı iki hakemin tamamen anlaşmazlığa düştüğünü söylüyor: eleştiri tutarSIZLIĞA yapılıyor. Kökten önce `consistent` sıfatı, sonra olumsuzu `inconsistent`, sonra adı `inconsistency` türetiliyor. Olumsuzluk eki olmadan cümle tersine döner.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l3-15",
              no: 15,
              text: "EFFECT",
              accept: ["ineffective"],
              explain:
                "`it is ___ at doing so` yapısında bir sıfat gerekiyor ve anlam olumsuz: sahtekârlığı yakalamakta etkisiz. `effect` adından `effective` sıfatı, ondan da `ineffective` türetiliyor. Ad biçimi bu yapıda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l3-16",
              no: 16,
              text: "OVERSTATE",
              accept: ["overstated"],
              explain:
                "Boşluk `claims` adını niteliyor, yani bir sıfat gerekiyor ve ortaç biçimi bu işi görüyor: `overstated claims`. Devamındaki «too strong» aynı anlamı doğruluyor; ad biçimi (`overstatement`) burada `claims` ile yan yana duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l3-17",
              no: 17,
              text: "IMPROVE",
              accept: ["improvement"],
              explain:
                "`a modest ___ in the quality` yapısında `a` ile `in` arasında bir ad var: `improvement`. Cümlenin ikinci yarısındaki `a sharp fall` aynı yapıyı tekrarlıyor ve orada da bir ad bulunuyor.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l3-18",
              no: 18,
              text: "PRIORITY",
              accept: ["priorities"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different fields`), dolayısıyla ad da çoğul olmalı: `priorities`. Tekil biçim cümlenin çoğul öznesiyle uyuşmaz.",
            },
          ],
        },
        {
          id: "en-b2-02-l4",
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
              id: "en-b2-02-l4-19",
              no: 19,
              text: "The editors cancelled the interview because of the storm.\nThe interview ______ because of the storm.",
              cue: "OFF",
              accept: ["was called off", "had been called off"],
              explain:
                "Etken cümle edilgene çevriliyor ve `cancel` yerine öbek fiil isteniyor. Anahtar sözcük `off` değişmeden, öbek fiilin ikinci parçası olarak kalıyor: «was called off». Zaman bağlama göre geçmiş öncesi de olabilir.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l4-20",
              no: 20,
              text: "I regret not applying for that post.\nI ______ for that post.",
              cue: "WISH",
              accept: ["wish I had applied", "wish that I had applied"],
              explain:
                "Geçmişe dair pişmanlık `wish + past perfect` ile kurulur: «I wish I had applied». Anahtar sözcük `wish` değişmeden kullanılıyor. `wish I applied` şimdiki bir durumu anlatırdı ve pişmanlığı geçmişe bağlamazdı.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l4-21",
              no: 21,
              text: "Somebody is checking the figures at the moment.\nThe figures ______ at the moment.",
              cue: "BEING",
              accept: ["are being checked"],
              explain:
                "Şimdiki zamanın edilgeni isteniyor ve anahtar sözcük `being` bunu zorunlu kılıyor: «are being checked». Özne çoğul olduğu için yardımcı fiil `are`; `is being checked` özneyle uyuşmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-02-l4-22",
              no: 22,
              text: "It was a mistake to publish the figure before the check.\nWe ______ the figure before the check.",
              cue: "REGRET",
              accept: ["regret publishing", "now regret publishing"],
              explain:
                "«It was a mistake to …» yapısı, `regret + -ing` ile bir pişmanlık cümlesine çevriliyor. Anahtar sözcük `regret` değişmeden kalıyor ve ardından ulaç geliyor; `regret to publish` başka bir anlam taşır (kötü haberi bildirmek).",
            },
          ],
        },
        {
          id: "en-b2-02-l5",
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
              title: "The trouble with explaining better",
              body: `Whenever public trust in some finding turns out to be low, the response is almost always the same: we must explain it better. Having sat through a decade of workshops on exactly this, I have come to think the diagnosis is comfortable rather than correct.

The comfortable part is that it puts the problem in the audience. If people only understood, they would agree. Nevertheless, the studies that test this are not encouraging. When knowledge of a subject is measured directly, people who know more are often more firmly attached to their existing position, not less.

That result is easy to misread, so let me be careful. It does not mean that explanation is worthless, and it certainly does not mean that people are stupid. It means that explanation is doing something narrower than we assumed: it equips people to defend a view, and which view they defend was decided elsewhere.

Where, then? The honest answer is that we do not fully know, but the strongest evidence points to who is speaking rather than what is said. A finding delivered by an institution that a community already distrusts is not received as information at all.

If that is right, the practical conclusion is unwelcome for people like me. It means the most useful work is not writing a clearer paragraph. It is the slow, unglamorous business of being present in places where the institution has no standing, for years, without a campaign attached.

I want to be clear that I am not against explanation, which would be an odd position for someone who writes for a living. I am against treating it as sufficient. If we had built those relationships, the debate would have gone very differently.`,
              gloss: [
                { de: "a diagnosis", tr: "teşhis", en: "diagnosis" },
                { de: "to equip", tr: "donatmak", en: "to equip" },
                { de: "standing", tr: "itibar, saygınlık", en: "standing" },
                { de: "unglamorous", tr: "gösterişsiz", en: "unglamorous" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-02-l5-23",
              no: 23,
              text: "Why does the writer call the usual diagnosis \"comfortable\"?",
              options: [
                "Because it is cheap to put into practice everywhere",
                "Because it makes the listener responsible, not the speaker",
                "Because it has been recommended by several major institutions recently",
                "Because it produces results that are easy to measure and publish",
              ],
              answer: 1,
              explain:
                "Yazar rahatlığı açıkça tanımlıyor: «it puts the problem in the audience. If people only understood, they would agree» — yük dinleyicinin üstüne bırakılıyor. Maliyet, kurum tavsiyesi ya da ölçülebilirlik metinde hiç gerekçe olarak geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l5-24",
              no: 24,
              text: "What do the studies show about people who know more about a subject?",
              options: [
                "They change their minds more readily than others",
                "They are less interested in the subject over time",
                "They avoid discussing it with people who disagree",
                "They hold their existing position more firmly",
              ],
              answer: 3,
              explain:
                "Bulgu doğrudan veriliyor: «people who know more are often more firmly attached to their existing position, not less». Cümlenin sonundaki `not less` tam olarak birinci şıkkı eliyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l5-25",
              no: 25,
              text: "How does the writer say the finding should be understood?",
              options: [
                "Explanation has a narrower function than was assumed",
                "Explanation makes no difference to anybody",
                "People are less intelligent than researchers thought",
                "Knowledge should not be measured directly",
              ],
              answer: 0,
              explain:
                "Yazar iki yanlış okumayı önceden eliyor («It does not mean that explanation is worthless … people are stupid») ve kendi okumasını veriyor: açıklama «doing something narrower than we assumed». Ölçüm yöntemi tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l5-26",
              no: 26,
              text: "What does the writer say the evidence points to?",
              options: [
                "The complexity of the language used",
                "The length of time a claim has been public",
                "The identity of the institution making the claim",
                "The medium through which the claim is delivered",
              ],
              answer: 2,
              explain:
                "Metin ayrımı kendisi kuruyor: «who is speaking rather than what is said», ve devamında güvenilmeyen bir kurumdan gelen bulgunun bilgi olarak bile alınmadığını söylüyor. Dil, süre ve mecra metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-l5-27",
              no: 27,
              text: "What is the writer's position at the end?",
              options: [
                "Explanation should be replaced by campaigns",
                "Explanation is necessary but not sufficient on its own",
                "Explanation should be left to institutions with authority",
                "Explanation works only when it is repeated for many years",
              ],
              answer: 1,
              explain:
                "Son paragraf ayrımı net yapıyor: «I am not against explanation … I am against treating it as sufficient». Kampanyaları da açıkça dışlıyor («without a campaign attached»); kurumlara devretme metinde hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b2-02-l6",
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
              title: "Why a graph can be honest and still mislead",
              body: `Every statistics course teaches that a truncated axis exaggerates a difference. Far fewer courses teach the subtler problem, which is that an entirely honest graph can still leave a false impression. {{28}}

Consider a chart showing that a treatment doubles a rate. The number is correct and the axis is fair. {{29}}

The same difficulty appears with time. A five-year graph and a fifty-year graph of the same series can support opposite headlines, and neither is a distortion. {{30}}

Some journals now require a second panel showing absolute numbers alongside any relative figure. The change is small and it is resisted, mainly because it makes striking results look ordinary. {{31}}

None of this is an argument against graphs, which remain the most efficient way to show a pattern. It is an argument for reading the axis and the window before reading the shape.`,
              gloss: [
                { de: "truncated", tr: "kesilmiş, kırpılmış", en: "truncated" },
                { de: "an axis", tr: "eksen", en: "axis" },
                { de: "absolute numbers", tr: "mutlak sayılar", en: "absolute numbers" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "What it omits is that the rate rose from one in a hundred thousand to two, which most readers would judge differently." },
            { key: "b", label: "b", body: "That resistance is itself informative, since it tells you what the striking version was doing." },
            { key: "c", label: "c", body: "The choice of window is a decision, and it is almost never explained to the reader." },
            { key: "d", label: "d", body: "This is the harder lesson, because it cannot be fixed by a rule about where the axis starts." },
            { key: "e", label: "e", body: "Colour-blind readers frequently report difficulty with the standard red and green palette." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-02-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "d",
              explain:
                "Boşluktan önce iki ders karşılaştırılıyor: eksen kuralı ve daha ince olan sorun. (d) «This is the harder lesson» ile ikincisine geri gönderme yapıyor ve neden kuralla çözülemediğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-02-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "a",
              explain:
                "Önceki iki cümle grafiğin doğru ve dürüst olduğunu söylüyor; (a) «What it omits is …» ile eksik olanı veriyor: yüz binde birden ikiye çıkan bir oran. Dürüstlük ile eksiklik arasındaki bağ tam burada kuruluyor.",
            },
            {
              kind: "match",
              id: "en-b2-02-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "c",
              explain:
                "Paragraf beş yıllık ve elli yıllık grafiklerin zıt manşetleri destekleyebileceğini söylüyor; (c) bunu bir karara bağlıyor: pencere seçimi bir karardır ve okura hiç açıklanmaz. `window` sözcüğü paragrafın konusunu doğrudan sürdürüyor.",
            },
            {
              kind: "match",
              id: "en-b2-02-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Önceki cümle değişikliğe direnildiğini ve sebebini söylüyor; (b) «That resistance is itself informative» ile direnişe geri gönderme yapıp ondan bir çıkarım yapıyor. (e) renk körlüğünden söz ediyor ve metnin hiçbir yerinde renk tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-02-l7",
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
              label: "a — Nadia, science editor",
              body: "We stopped running headlines with the word breakthrough, and our traffic fell by about a tenth. I would do it again, but I want to be honest that it cost us something real, and anyone who says otherwise has not tried it.",
            },
            {
              key: "b",
              label: "b — Tomas, epidemiologist",
              body: "Journalists are blamed for uncertainty that we ourselves fail to state. Our own abstracts are written with more confidence than our results support, and the press release only makes that worse. The problem starts at our desks.",
            },
            {
              key: "c",
              label: "c — Grace, press officer",
              body: "My job is to get attention for the university, and I am judged on coverage. Nobody has ever asked me whether the coverage was accurate. Change the way I am assessed and the releases will change within a month.",
            },
            {
              key: "d",
              label: "d — Ravi, teacher",
              body: "My students can spot an obviously fake story easily. What defeats them is a real study described accurately but without its limits, because there is nothing false to find. That is the harder skill and we barely teach it.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-02-l7-32",
              no: 32,
              text: "Which text says the problem begins with researchers themselves?",
              answer: "b",
              explain:
                "Tomas sorumluluğu kendi tarafına alıyor: «Our own abstracts are written with more confidence than our results support» ve «The problem starts at our desks». Grace de sistemi eleştiriyor ama sorumluluğu değerlendirme ölçütlerine bağlıyor, araştırmacılara değil.",
            },
            {
              kind: "match",
              id: "en-b2-02-l7-33",
              no: 33,
              text: "Which text describes a decision that had a measurable cost?",
              answer: "a",
              explain:
                "Nadia kararı ve bedelini birlikte veriyor: manşet sözcüğü bırakılmış ve trafik yaklaşık onda bir düşmüş. «it cost us something real» ifadesi bedeli açıkça kabul ediyor.",
            },
            {
              kind: "match",
              id: "en-b2-02-l7-34",
              no: 34,
              text: "Which text says that changing an incentive would change behaviour quickly?",
              answer: "c",
              explain:
                "Grace koşulu ve süreyi birlikte söylüyor: «Change the way I am assessed and the releases will change within a month». Ölçüt değişirse davranış hızla değişir.",
            },
            {
              kind: "match",
              id: "en-b2-02-l7-35",
              no: 35,
              text: "Which text identifies a difficulty that has nothing false in it?",
              answer: "d",
              explain:
                "Ravi öğrencileri asıl zorlayan şeyi tarif ediyor: sınırları söylenmeden doğru aktarılmış gerçek bir çalışma, «because there is nothing false to find». Açıkça sahte haber onlar için kolay.",
            },
            {
              kind: "match",
              id: "en-b2-02-l7-36",
              no: 36,
              text: "Which text challenges people who claim a change is painless?",
              answer: "a",
              explain:
                "Nadia doğrudan bir itiraz kuruyor: «anyone who says otherwise has not tried it». Bedelin gerçek olduğunu söyleyip bunu inkâr edenleri karşısına alıyor; öteki metinlerde böyle bir meydan okuma yok.",
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
        "This part has four tasks. You hear short extracts, a talk, six speakers and an interview. You hear every recording twice.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa parçalar, bir sunum, altı konuşmacı ve bir söyleşi dinleyeceksin. Her kaydı iki kez dinleyebilirsin.",
      tasks: [
        {
          id: "en-b2-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In a newsroom",
              genreTr: "Haber merkezinde",
              situation: "Bir editör bir habere itiraz ediyor.",
              plays: 2,
              segments: [
                { text: "I am not saying the number is wrong. I am saying that without the sample size next to it, the number tells the reader nothing, and we have space for six more words." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "İki araştırmacı bir sonuç hakkında konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Lena", text: "The effect held up in the second dataset." },
                { speaker: "Omar", text: "It did, but the second dataset came from the same three hospitals, so it is less independent than it looks." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Bir uzman kısa bir yorum yapıyor.",
              plays: 2,
              segments: [
                { text: "People ask me whether the risk has doubled. It has. They then assume the risk is now large, and it is not. Both statements are true at the same time and that is the whole difficulty." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At a university",
              genreTr: "Üniversitede",
              situation: "Bir basın görevlisi bir yazarla konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Press officer", text: "Can we say the study proves the link?" },
                { speaker: "Author", text: "No. We can say it is consistent with the link. If we write proves, I will be asked about it for the next five years." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Bir dergi editörü bir değişikliği duyuruyor.",
              plays: 2,
              segments: [
                { text: "From January, every paper we publish must include a section on limitations. This is not a new requirement in principle; it has been in our guidance for years and simply has not been enforced." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At a conference",
              genreTr: "Konferansta",
              situation: "Bir konuşmacı soruya cevap veriyor.",
              plays: 2,
              segments: [
                { text: "That is a fair question and I do not have a good answer. We looked for the effect in older participants and we did not find it. I would rather say that than invent an explanation." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir gazeteci bir kaynağa ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "I have read the paper and the release, and they say different things about the age range. Before I write anything, I would like to know which one is right." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "In a classroom",
              genreTr: "Sınıfta",
              situation: "Bir öğretmen bir ödevi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Teacher", text: "For Friday, find one article that reports a study accurately, not one that gets it wrong." },
                { speaker: "Student", text: "That sounds harder." },
                { speaker: "Teacher", text: "It is, and that is the point of the exercise." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-02-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the editor objecting to?",
              options: ["An incorrect figure in the article", "A figure presented without its context", "The length of the article as a whole"],
              answer: 1,
              explain:
                "Editör sayının yanlış olduğunu açıkça reddediyor («I am not saying the number is wrong») ve eksiği söylüyor: örneklem büyüklüğü. Yer sorunu da eleniyor, çünkü altı sözcüklük yer olduğunu belirtiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-2",
              no: 2,
              ref: "a2",
              text: "What is Omar's reservation?",
              options: ["The second dataset is smaller than the first one", "The effect disappeared in the second dataset entirely", "The second dataset is not as independent as it seems"],
              answer: 2,
              explain:
                "Omar sonucu doğruluyor («It did») ama kaynağı sorguluyor: aynı üç hastaneden geldiği için «less independent than it looks». Etki kaybolmuyor; büyüklük hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-3",
              no: 3,
              ref: "a3",
              text: "What point is the speaker making?",
              options: ["A doubled risk can still be a small risk", "The risk has not actually changed at all", "People overestimate how often the risk occurs"],
              answer: 0,
              explain:
                "Konuşmacı iki ifadeyi birlikte doğru sayıyor: risk ikiye katlanmış ve yine de büyük değil. «Both statements are true at the same time» cümlesi tam bunu söylüyor; riskin değişmediğini hiç iddia etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-4",
              no: 4,
              ref: "a4",
              text: "Why does the author refuse the word \"proves\"?",
              options: ["Because the study was too small to publish anywhere", "Because it would commit him to a claim he cannot defend", "Because the press officer is not qualified to write it"],
              answer: 1,
              explain:
                "Yazar doğru ifadeyi veriyor («consistent with the link») ve sonucu söylüyor: «I will be asked about it for the next five years». Yani savunamayacağı bir iddiaya bağlanmak istemiyor. Çalışmanın büyüklüğü ya da görevlinin yetkinliği hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the editor say about the requirement?",
              options: ["It is completely new for this journal", "It replaces an older and stricter rule", "It already existed but was not applied"],
              answer: 2,
              explain:
                "Duyuru bunu açıkça söylüyor: «it has been in our guidance for years and simply has not been enforced». Yani yeni olan uygulama, kuralın kendisi değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-6",
              no: 6,
              ref: "a6",
              text: "How does the speaker respond to the question?",
              options: ["By admitting the gap rather than filling it", "By questioning whether the data was collected properly", "By promising to repeat the study next year"],
              answer: 0,
              explain:
                "Konuşmacı eksiği kabul ediyor ve bir açıklama uydurmayı reddediyor: «I would rather say that than invent an explanation». Veri toplama eleştirisi ya da tekrar sözü kayıtta yok.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-7",
              no: 7,
              ref: "a7",
              text: "Why is the journalist calling?",
              options: ["To ask for an interview about the paper", "To complain about the wording of the release", "To resolve a contradiction before publishing"],
              answer: 2,
              explain:
                "Gazeteci makale ile bültenin yaş aralığı konusunda farklı şeyler söylediğini belirtip «Before I write anything, I would like to know which one is right» diyor. Şikâyet değil, doğrulama isteği.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h1-8",
              no: 8,
              ref: "a8",
              text: "Why has the teacher set this task?",
              options: ["Because accurate reporting is harder to find", "Because the class already did the opposite task", "Because inaccurate articles are difficult to obtain"],
              answer: 0,
              explain:
                "Öğrenci ödevin daha zor olduğunu söylüyor ve öğretmen «It is, and that is the point of the exercise» diye onaylıyor. Zorluk kasıtlı. Sınıfın önceki ödevi ya da yanlış haber bulmanın güçlüğü kayıtta geçmiyor.",
            },
          ],
        },
        {
          id: "en-b2-02-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a fact-checking project. Complete the sentences, questions 9 to 16, with a word or a short phrase. You hear the talk twice.",
          promptTr:
            "Bir doğrulama projesi üzerine sunum dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da kısa bir öbekle tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir doğrulama projesinin sorumlusu üç yıllık sonuçları anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. I will give you our three-year results and I will not pretend they are all encouraging. We began with six people and we now have a team of nineteen. In three years we have checked about four thousand claims. Here is the first surprise: the claims that spread fastest are not political, they are about health. Second, timing matters far more than we expected. A check published within six hours reaches roughly ten times the audience of one published the next day, and that ratio has been stable across every topic we have looked at. Third, the format. We tried videos, long articles and short cards, and the short card outperformed everything else, which was disappointing for the two of us who like writing. Fourth, a caution: our own surveys show that people who already trust us read the checks, and people who do not, do not. We have not solved that. And finally, funding. Ninety per cent of our money comes from one foundation, and that is the risk that keeps me awake, not the abuse.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentence completion",
              genreTr: "Cümle tamamlama",
              title: "Fact-checking project — findings",
              body: `The team now has {{9}} members.

In three years the project has checked about {{10}} claims.

The claims that spread fastest are about {{11}}.

A check published within {{12}} hours reaches about ten times the audience.

The most effective format was the short {{13}}.

The checks are mostly read by people who already {{14}} the project.

{{15}} per cent of the funding comes from one foundation.

The speaker says the greatest risk is the {{16}}, not the abuse.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-02-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["19", "nineteen"],
              explain:
                "«We began with six people and we now have a team of nineteen» — bugünkü sayı on dokuz. Altı, kuruluş anındaki sayı; cümle tamamlama bugünü soruyor.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["4000", "4,000", "four thousand", "about 4000"],
              explain:
                "«In three years we have checked about four thousand claims» — doğrulanan iddia sayısı. Üç yıl süre, dört bin ise sayı; ikisi aynı cümlede geçtiği için karıştırılması kolay.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["health"],
              explain:
                "Konuşmacı beklentiyi eliyor: «the claims that spread fastest are not political, they are about health». Siyaseti yazan öğrenci `not … they are …` yapısının ilk yarısında durmuş olur.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["6", "six"],
              explain:
                "«A check published within six hours reaches roughly ten times the audience» — eşik altı saat. On, kitle katsayısı; cümlede iki sayı yan yana ve hangisinin saat olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["card", "cards"],
              explain:
                "Üç biçim denenmiş ve «the short card outperformed everything else» denmiş. Video ve uzun yazı kayıtta geçiyor ama ikisi de daha az etkili çıkan biçimler.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["trust"],
              explain:
                "Uyarı cümlesi şu: «people who already trust us read the checks, and people who do not, do not». Yani okuyucu kitlesi zaten güvenenlerle sınırlı ve konuşmacı bunun çözülmediğini ekliyor.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["90", "ninety"],
              explain:
                "«Ninety per cent of our money comes from one foundation» — fonun yüzde doksanı tek kaynaktan. Cümle tamamlamada `per cent` basılı olduğu için yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b2-02-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["funding", "money", "single funder"],
              explain:
                "Son cümle iki riski karşılaştırıyor: «that is the risk that keeps me awake, not the abuse» — `that` tek kaynağa bağımlılığı, yani fonlamayı gösteriyor. Tacizi yazan öğrenci cümlenin ikinci yarısını tersine okumuş olur.",
            },
          ],
        },
        {
          id: "en-b2-02-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six people talking about science in the news. What is each speaker's main point? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Haberlerde bilim üzerine konuşan altı kişi dinleyeceksin. Her konuşmacının ana noktası nedir? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The audience is blamed for a failure that is not theirs." },
            { key: "b", label: "A correct story can still leave a wrong impression." },
            { key: "c", label: "The incentives reward the wrong behaviour." },
            { key: "d", label: "The speaker has changed their own practice." },
            { key: "e", label: "Coverage is better than it used to be." },
            { key: "f", label: "The problem is the volume, not the accuracy." },
            { key: "g", label: "Experts should refuse to speak to the media." },
            { key: "h", label: "Training helps far less than people assume." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I used to end every talk by saying the public needs to be more scientifically literate. I have stopped. If a message fails with nine people out of ten, the message is the problem, and it took me far too long to see that." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "Every sentence in the piece was true. It still left readers thinking the treatment is available now, because the word trial appeared once, in the eleventh paragraph, where nobody reaches." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I sat through two days of media training and it was well delivered. Then I gave an interview and every habit came back within a minute. What actually changed my answers was writing them down beforehand." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "Nobody in this chain is dishonest. The researcher is measured on citations, the press officer on coverage, the reporter on clicks. Each of them behaves reasonably and the result is an overstated claim." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I have kept every clipping since 1998, and the standard today is markedly higher. We remember the worst examples and forget that the average piece now includes a sample size, which it did not then." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı haberlerdeki bilim aktarımından söz ediyor.",
              plays: 2,
              segments: [
                { text: "I now send a one-page summary with the three things the study does not show. It takes me twenty minutes and it has changed the questions I am asked. I should have started doing it a decade ago." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-02-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı sorumluluğu izleyiciden alıyor: «If a message fails with nine people out of ten, the message is the problem». Eskiden halkın bilgisizliğini söylerken artık bunu bırakmış.",
            },
            {
              kind: "match",
              id: "en-b2-02-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Her cümlenin doğru olduğu söyleniyor ama izlenim yanlış: `trial` sözcüğü on birinci paragrafta, kimsenin ulaşmadığı yerde geçiyor. Doğruluk ile izlenim arasındaki fark tam bu.",
            },
            {
              kind: "match",
              id: "en-b2-02-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "h",
              explain:
                "Eğitim iyi verilmiş ama etkisi bir dakika sürmüş: «every habit came back within a minute». Konuşmacı işe yarayan şeyin başka olduğunu söylüyor, yani eğitimin katkısı sanılandan küçük.",
            },
            {
              kind: "match",
              id: "en-b2-02-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Konuşmacı kimsenin sahtekâr olmadığını söyleyip zinciri sıralıyor: atıf, kapsama, tıklanma. «Each of them behaves reasonably and the result is an overstated claim» — sorun ölçütlerde.",
            },
            {
              kind: "match",
              id: "en-b2-02-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "1998'den beri kupür saklayan konuşmacı bugünkü düzeyi «markedly higher» buluyor ve somut bir kanıt veriyor: ortalama haber artık örneklem büyüklüğünü içeriyor, o zaman içermiyordu.",
            },
            {
              kind: "match",
              id: "en-b2-02-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "d",
              explain:
                "Konuşmacı kendi uygulamasını değiştirmiş: «I now send a one-page summary with the three things the study does not show» ve sorulan sorular değişmiş. Son cümle («I should have started doing it a decade ago») bunun kendi kararı olduğunu pekiştiriyor.",
            },
          ],
        },
        {
          id: "en-b2-02-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who edits a science section. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "Bir bilim sayfası editörüyle söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında bir bilim editörüyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Daniel, you have edited this section for twelve years. What has changed most?" },
                { speaker: "Daniel", text: "The speed, and not in the way people assume. Reporting is not faster than it was; the difference is that a mistake is now permanent and searchable. Twelve years ago a bad paragraph disappeared with the newspaper." },
                { speaker: "Host", text: "Does that make your team more careful?" },
                { speaker: "Daniel", text: "More careful and more defensive, which are not the same thing. Careful is good. Defensive means hedging every sentence until the piece says nothing, and I spend a lot of my time arguing against that." },
                { speaker: "Host", text: "How do you decide which studies to cover at all?" },
                { speaker: "Daniel", text: "We ask one question first: would we cover this if the result had been negative? If the answer is no, we are not covering science, we are covering a surprise. That rule has cost us some very popular stories." },
                { speaker: "Host", text: "Critics say science journalism is too negative about new findings." },
                { speaker: "Daniel", text: "I hear that, and I think it confuses two things. We are sceptical about single results, which is correct. We are not sceptical about science, and anyone who reads us regularly can see the difference." },
                { speaker: "Host", text: "What do you say to a researcher who feels misrepresented?" },
                { speaker: "Daniel", text: "First, that we will correct anything factually wrong, quickly and prominently. Second, and this is less popular, that a fair summary is not the same as the summary they would have written. Those two answers cover almost every complaint I receive." },
                { speaker: "Host", text: "Has anything you tried simply failed?" },
                { speaker: "Daniel", text: "Yes. We ran a series explaining statistical methods, which I was very proud of. Almost nobody read it. The lesson was not that readers are lazy; it was that method belongs inside the story, not beside it." },
                { speaker: "Host", text: "And what will you do differently next year?" },
                { speaker: "Daniel", text: "Publish less. We currently cover about eleven studies a week and I would rather do four properly. Whether my editor agrees is a separate conversation." },
              ],
              gloss: [
                { de: "to hedge", tr: "temkinli ifade kullanmak", en: "to hedge" },
                { de: "sceptical", tr: "kuşkucu", en: "sceptical" },
                { de: "to misrepresent", tr: "yanlış aktarmak", en: "to misrepresent" },
                { de: "prominently", tr: "göze çarpan bir yerde", en: "prominently" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-02-h4-23",
              no: 23,
              ref: "d1",
              text: "What does Daniel say has changed most?",
              options: ["Mistakes now stay visible permanently", "Reporting has become considerably faster", "Readers have become much less patient"],
              answer: 0,
              explain:
                "Daniel yaygın varsayımı eliyor: «Reporting is not faster than it was» ve farkı adlandırıyor — hata artık kalıcı ve aranabilir. Okuyucu sabrı söyleşide hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-24",
              no: 24,
              ref: "d1",
              text: "What distinction does he draw about his team?",
              options: ["Between experienced and new reporters", "Between being careful and being defensive", "Between science and general news writing"],
              answer: 1,
              explain:
                "Daniel iki kavramı ayırıyor: «More careful and more defensive, which are not the same thing». Dikkat iyi, savunmacılık ise cümleleri boşaltıyor ve buna karşı mücadele ettiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-25",
              no: 25,
              ref: "d1",
              text: "What is the first question his team asks about a study?",
              options: ["Whether the researchers are well known", "Whether the journal has a good reputation", "Whether they would report a negative result too"],
              answer: 2,
              explain:
                "Kural tek cümlede: «would we cover this if the result had been negative?» — Daniel bunu bir ölçüt olarak koyuyor ve hayır ise haberin bilim değil sürpriz olduğunu söylüyor. Araştırmacının ünü ya da derginin itibarı geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-26",
              no: 26,
              ref: "d1",
              text: "How does he answer the charge of negativity?",
              options: ["By accepting it and promising to change", "By separating scepticism about one result from scepticism about science", "By pointing out that most of the critics have never read the section regularly"],
              answer: 1,
              explain:
                "Daniel iki şeyin karıştırıldığını söylüyor: tek sonuçlara kuşkucu olmak doğru, bilime kuşkucu olmak başka. Eleştiriyi kabul etmiyor ve okurları suçlamıyor, tersine düzenli okuyanın farkı göreceğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-27",
              no: 27,
              ref: "d1",
              text: "What is his second answer to a researcher who feels misrepresented?",
              options: ["That a fair summary differs from their own", "That complaints must be sent within a week", "That the original paper will be linked"],
              answer: 0,
              explain:
                "İkinci cevabı kendisi de az sevilen buluyor: «a fair summary is not the same as the summary they would have written». Süre sınırı ya da bağlantı verme söyleşide geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-28",
              no: 28,
              ref: "d1",
              text: "What conclusion did he draw from the failed series?",
              options: ["Readers are unwilling to make an effort", "Method should be built into the story itself", "Statistics cannot be explained to a general audience"],
              answer: 1,
              explain:
                "Daniel tembellik açıklamasını açıkça reddediyor: «The lesson was not that readers are lazy» ve dersi veriyor — yöntem hikâyenin içinde olmalı, yanında değil. İstatistiğin anlatılamayacağını söylemiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-29",
              no: 29,
              ref: "d1",
              text: "What does he want to change next year?",
              options: ["To cover fewer studies in more depth", "To hire more specialist reporters", "To move the section online only"],
              answer: 0,
              explain:
                "Daniel sayı veriyor: haftada yaklaşık on bir çalışma yerine dördünü düzgün yapmayı tercih ediyor. Kadro ya da yayın mecrası söyleşide geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-02-h4-30",
              no: 30,
              ref: "d1",
              text: "How does he present that plan?",
              options: ["As a decision that has already been approved", "As something still to be agreed with somebody else", "As a change he expects to be resisted by readers"],
              answer: 1,
              explain:
                "Son cümle planı bir karara değil bir görüşmeye bağlıyor: «Whether my editor agrees is a separate conversation». Onay alınmış değil; okur tepkisinden de hiç söz edilmiyor.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 70,
      instruction: "This part has two tasks. Write 140 to 190 words for each. Both are compulsory.",
      instructionTr: "Bu bölümde iki görev var. Her biri için 140–190 kelime yaz. İkisi de zorunlu.",
      tasks: [
        {
          id: "en-b2-02-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed news and social media. Now write an essay for your teacher, answering this question: \"Should schools teach students how to judge news sources?\" Use the two ideas below and add one idea of your own.\n\nIdeas: time in the timetable — who decides what counts as reliable",
          promptTr:
            "İngilizce dersinde haberler ve sosyal medyayı tartıştınız. Öğretmenin için bir deneme yaz: \"Okullar öğrencilere haber kaynaklarını değerlendirmeyi öğretmeli mi?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: ders programındaki zaman — neyin güvenilir sayılacağına kim karar veriyor",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss the question of time in the timetable.", tr: "Ders programındaki zaman sorununu tartış." },
              { de: "Discuss who decides what counts as reliable.", tr: "Neyin güvenilir sayılacağına kimin karar verdiğini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost everyone agrees that students should be able to judge what they read. The disagreement begins as soon as somebody asks where the lessons will fit and who will write them.

The timetable objection is the weaker of the two, in my view. A separate subject is probably unnecessary; the skill can be practised inside history and science, where sources are already discussed. What it does require is training for teachers, and that is a genuine cost.

The second objection is harder. If a school teaches a list of trusted outlets, it is teaching a political judgement, and families will not all accept the same list. A curriculum that avoids this by teaching method instead of lists is more defensible, although it is also more difficult to examine.

My own worry is different. These lessons often teach students to spot obvious fakes, which they can already do. The difficult case is an accurate report without its limits, and that is the case we rarely practise.

Schools should teach this, but they should teach method rather than approved sources.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Karşı görüşün gücü kabul edildi mi, yoksa zayıf bir hâli mi kuruldu?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Bağlayıcılar çeşitli mi? (although, in my view, whereas)",
              "140–190 kelime aralığında mı?",
              "Kayıt deneme yazısına uygun mu?",
            ],
          },
        },
        {
          id: "en-b2-02-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You write for a student website. Write a review of a documentary, a podcast or a science book you have seen, heard or read recently. Say what it covers, what it does well, and who should not bother with it. Write 140 to 190 words.",
          promptTr:
            "Bir öğrenci sitesi için yazıyorsun. Yakınlarda izlediğin, dinlediğin ya da okuduğun bir belgeselin, podcast'in veya bilim kitabının değerlendirmesini yaz. Neyi kapsadığını, neyi iyi yaptığını ve kimin uzak durması gerektiğini söyle. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what it covers.", tr: "Neyi kapsadığını söyle." },
              { de: "Say what it does well, with an example.", tr: "Neyi iyi yaptığını bir örnekle söyle." },
              { de: "Say who should not bother with it, and why.", tr: "Kimin uzak durması gerektiğini ve nedenini söyle." },
            ],
            sample: `A Quiet Number is a six-part podcast about how official statistics are produced, and it is far better than that description suggests.

Each episode follows one figure from the moment it is collected to the moment it appears in a headline. The strongest episode is the third, on unemployment, which shows three countries counting the same situation in three different ways. By the end you understand why an international comparison can be technically correct and still meaningless.

What it does particularly well is refuse the easy conclusion. The presenter never suggests that the numbers are manipulated; she shows instead how many small, reasonable decisions sit behind a single line on a chart.

It is not for everyone. If you want a story with a villain, you will be disappointed, because there isn't one. Listeners who dislike detail should also stay away: episode four spends eleven minutes on a definition.

For anybody who reads statistics in the news, however, it is the most useful six hours I have spent this year.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "\"İyi yaptığı şey\" somut bir örnekle mi desteklendi?",
              "Olumsuz taraf gerçekten söylendi mi, yoksa yalnız övgü mü var?",
              "Değerlendirme kaydı tutarlı mı? Okuyucuya seslenen bir ton kurulmuş mu?",
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
      instruction: "This part has three tasks: an interview, a long turn comparing two situations, and a task we do together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, iki durumu karşılaştıran tek başına konuşma ve birlikte yapılan bir görev.",
      tasks: [
        {
          id: "en-b2-02-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about news, information and how you decide what to believe.",
          promptTr: "Sana haberler, bilgi ve neye inanacağına nasıl karar verdiğin hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Where do you usually get your news, and has that changed in the last few years?", tr: "Günaydın. Haberleri genelde nereden alıyorsun ve bu son birkaç yılda değişti mi?" },
            { who: "you", hint: "Şimdiki durumu ve değişimi anlat, bir gerekçe ver.", expect: "bir alışkanlığı ve zaman içindeki değişimini gerekçesiyle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Can you think of a time when you believed something that later turned out to be wrong?", tr: "Teşekkürler. Sonradan yanlış çıkan bir şeye inandığın bir anı hatırlıyor musun?" },
            { who: "you", hint: "Somut bir örnek ver ve neden inandığını açıkla.", expect: "somut bir örnek vermek ve kendi hatasını çözümlemek", seconds: 45 },
            { who: "partner", de: "And what makes you trust one source more than another?", tr: "Bir kaynağa ötekinden çok güvenmeni ne sağlıyor?" },
            { who: "you", hint: "Bir ölçüt söyle ve sınırını da kabul et.", expect: "bir ölçüt öne sürmek ve sınırını kabul etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give developed answers with reasons", tr: "Gerekçeli, geliştirilmiş cevaplar vermek" },
              { de: "analyse your own earlier mistake", tr: "Kendi eski hatanı çözümlemek" },
            ],
            sample:
              "I used to read one newspaper every morning; now most things reach me through a messaging group, which is faster and much less reliable. Two years ago I passed on a story about a local school closing. It came from someone I trust, and I did not check it, which is exactly the mistake. What makes me trust a source now is whether it corrects itself openly, although I have to admit that is hard to observe unless you follow it for a while.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Somut bir örnek verildi mi, yoksa genel mi konuşuldu?",
              "Kendi hatası çözümlendi mi, yalnız anlatıldı mı?",
              "Öne sürülen ölçütün sınırı kabul edildi mi?",
            ],
          },
        },
        {
          id: "en-b2-02-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of covering a new scientific result, say which is better and explain one problem with your choice: a short report published the same day, or a longer piece published a week later with reactions from other researchers.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Yeni bir bilimsel sonucu aktarmanın şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: aynı gün yayımlanan kısa bir haber mi, bir hafta sonra başka araştırmacıların görüşleriyle yayımlanan uzun bir yazı mı?",
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
              "The same-day report reaches people while they are still interested, and if the result matters for a decision, speed is not a luxury. The delayed piece is almost always more accurate, because other researchers have had time to object, and those objections are often the most useful part. I would choose the delayed piece for most results. The problem with my own choice is straightforward: by the time it appears, the first version has already shaped what people think, and a correction a week later reaches a much smaller audience. So the honest answer may be that you need both, with the short version written far more carefully than it usually is.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (accuracy, objection, audience)",
            ],
          },
        },
        {
          id: "en-b2-02-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A university wants to improve how its research is reported. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir üniversite araştırmalarının nasıl aktarıldığını iyileştirmek istiyor. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: authors must sign off every press release, releases must include a limitations paragraph, journalists get a phone number for questions, and the university stops issuing releases altogether. Which of these would actually change what readers see?", tr: "Fikirler: bültenleri yazarların onaylaması, bültenlere bir sınırlamalar paragrafı konması, gazetecilere soru için bir telefon numarası verilmesi ve üniversitenin bülten yayımlamayı büsbütün bırakması. Sence bunlardan hangisi okurun gördüğünü gerçekten değiştirir?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the limitations paragraph. In my experience nobody reads the last paragraph of anything. Does that change your view?", tr: "Sınırlamalar paragrafını sorgularım. Benim gördüğüm, hiç kimse hiçbir metnin son paragrafını okumuyor. Bu görüşünü değiştirir mi?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "Fair. So which two do we recommend, and which one do we reject?", tr: "Peki. Hangi ikisini öneriyoruz, hangisini reddediyoruz?" },
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
              "The strongest one is the author sign-off, because it puts the person who knows the limits in the way of the sentence that overstates them. You are right that a final paragraph gets skipped, so I would move the limits into the second paragraph rather than drop the idea. Stopping releases altogether seems worse than the disease: journalists would simply work from the abstract, which is often the least careful part. So I would recommend the sign-off and the phone number, and reject abolition.",
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

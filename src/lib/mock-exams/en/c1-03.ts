import type { MockPaper } from "../types";

/**
 * C1 · Deneme 3 — "Cities, Infrastructure and Maintenance".
 *
 * Deneme 1 ve 2 ile AYNI PLAN; konu ayrı. İlkler bellek/dil/kanıt ile
 * uzmanlık/zanaat/ölçek alanlarını aldı. Bakım ve altyapı C1 için verimli
 * çünkü konunun kendisi soyutlama, adlaştırma ve çekimser yargı istiyor:
 * görünmeyen emek, ertelenmiş maliyet, ölçüt bozulması.
 *
 * C1 İMZALARI: devrik yapı, yarma cümle, çekimserlik belirteci ve
 * adlaştırma boşluksuz metinlerde geçiyor — imza taraması `{{n}}`
 * işaretini sözcük saymadığı için boşluklu görevlere yerleştirilemez.
 */
export const EN_C1_03: MockPaper = {
  id: "en-c1-03",
  course: "en",
  level: "C1",
  no: 3,
  theme: "Cities, Infrastructure and Maintenance",
  themeTr: "Şehirler, altyapı ve bakım",
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
          id: "en-c1-03-l1",
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
              title: "The baths that closed without closing",
              body: `Rarely has a public asset been allowed to decay as visibly as the municipal swimming baths. There was no closure announcement and no campaign; the buildings simply {{1}} into disuse over about two decades.

The usual explanation is cost, and it {{2}} for a great deal of what happened. A new roof costs more than a council can find in a single year, which settles the matter for most committees. What that account leaves out is that the roof became expensive only after twelve years of small repairs had been {{3}} off, so the causation runs partly the other way.

A second factor is rarely {{4}} into the calculation. Maintenance depends on a class of worker whose value is invisible when the work is done properly, and those posts were the first to go when the budget {{5}} under pressure.

Whether any of this could have been prevented is an open question. Several cities have tried funds that are protected from annual raids, with results that can only be described as {{6}}.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-03-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["went", "dropped", "fell", "came"],
              answer: 2,
              explain:
                "`fall into disuse` yerleşik bir kalıptır ve yavaş, kendiliğinden bir terk edilişi anlatır — cümlenin «simply» ve «over about two decades» ile kurduğu ton tam bu. `go into`, `drop into` ve `come into` bu adla eşdizim kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["accounts", "counts", "answers", "allows"],
              answer: 0,
              explain:
                "`account for something` bir olguyu açıklamak demektir ve boşluktan sonra `for` geliyor. `count for` değer taşımak, `answer for` hesap vermek, `allow for` payını bırakmak anlamındadır; üçü de burada anlamı bozar.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["held", "kept", "left", "put"],
              answer: 3,
              explain:
                "`put something off` ertelemek demektir ve edilgen biçimde de bu anlamı korur: «had been put off». `hold off` beklemek, `keep off` uzak durmak, `leave off` bırakmak anlamına gelir ve hiçbiri erteleme bildirmez.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["put", "taken", "brought", "set"],
              answer: 1,
              explain:
                "`take something into the calculation` hesaba katmak anlamındadır ve `take … into account` kalıbının aynı ailesindendir. `put into`, `bring into` ve `set into` bu adla bu anlamı vermez.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["went", "fell", "got", "came"],
              answer: 3,
              explain:
                "`come under pressure` baskı altına girmenin kalıbıdır. `go under` batmak, `fall under` bir başlığın kapsamına girmek demektir; `get under` ise bu adla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["mixed", "various", "assorted", "divided"],
              answer: 0,
              explain:
                "`mixed results` sonuçların bir kısmı olumlu bir kısmı olumsuz demektir ve cümlenin çekimser tonunu taşır. `various` ve `assorted` çeşitliliği bildirir, değerlendirme yapmaz; `divided` görüşler için kullanılır, sonuçlar için değil.",
            },
          ],
        },
        {
          id: "en-c1-03-l2",
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
              title: "What a maintenance budget cannot show",
              body: `It is not the size of a maintenance budget {{7}} determines the condition of a city's assets, but the length of the period over which that budget is guaranteed.

This is why annual funding, {{8}} generous, produces a characteristic pattern of decay. A one-year settlement rewards work that can be finished inside a year; the work that cannot is precisely the work {{9}} which the greatest savings lie.

Nor is the remedy simply more money. The shorter the horizon, the {{10}} attractive a large intervention becomes, and an intervention that is never begun has no effect whatever on the eventual bill.

The problem is compounded by what gets noticed. A repair carried out well leaves nothing to photograph, {{11}} a collapse produces a page of coverage and a promise.

It is worth adding that none of this is {{12}} any means a new observation; engineers have been making it for fifty years, largely to each other.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-03-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["that", "which"],
              explain:
                "Cümle bir yarma yapısı: «It is not X that determines Y, but Z». Vurgulanan öğeden sonra `that` gelir ve öncül cansız olduğu için `which` de kabul edilir. `what` bu yapıda kullanılamaz, çünkü kendi öncülünü taşır.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["however", "though"],
              explain:
                "`however generous` bir ödün öbeği kurar: ne kadar cömert olursa olsun. `however` sıfatın önüne geçer; `although` ise tam bir yan cümle ister ve tek başına sıfatın önünde duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["in"],
              explain:
                "`savings lie in something` kalıbı tasarrufun nerede bulunduğunu bildirir ve ilgi cümlesi öne çekildiğinde edat `which`in önüne geçer: «the work in which the greatest savings lie». `at` ve `on` bu fiille kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["less"],
              explain:
                "`the shorter …, the less attractive …` orantı yapısıdır ve ikinci yarıda da karşılaştırma derecesi gerekir. Cümlenin mantığı olumsuz yönde işliyor: ufuk kısaldıkça büyük müdahale daha az çekici oluyor.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["whereas", "while"],
              explain:
                "İki yarı doğrudan karşıtlık kuruyor: iyi yapılmış onarım görüntü bırakmıyor, çöküş ise sayfalarca haber üretiyor. `whereas` ve `while` bu karşıtlığı kurar; `because` sebep bildirir ve ilişkiyi tersine çevirir.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["by"],
              explain:
                "`by any means` olumsuz bir cümlede «hiç de» anlamını taşır: bu gözlem hiç de yeni değil. `in any means` ve `with any means` kalıp değildir.",
            },
          ],
        },
        {
          id: "en-c1-03-l3",
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
              title: "Deferred maintenance",
              body: `Deferred maintenance is the accumulated cost of work that was necessary and was not carried out, usually recorded, if at all, as a single figure of doubtful {{13}}.

The concept is easy to define and notoriously hard to measure. An organisation that does not know the condition of its assets cannot produce the number at all, and one that does know is often {{14}} to publish it.

The measurement problem is not merely technical. A survey that produces a large figure invites the question of who allowed the {{15}} to happen, which is a strong reason for not commissioning one.

Critics of the concept argue that it encourages a kind of {{16}}: a building kept in perfect repair may be one that should have been sold a decade ago.

Several jurisdictions now require the figure to be published annually. Early evidence suggests a modest {{17}} in the sums allocated, together with a sharp rise in disputes about the method.

The most likely future is therefore an uneven one, with different bodies reporting according to their own {{18}} rather than to a shared standard.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-03-l3-13",
              no: 13,
              text: "ACCURATE",
              accept: ["accuracy"],
              explain:
                "`a figure of doubtful ___` yapısında sıfattan sonra soyut bir ad gerekiyor: `accuracy`. Sıfat biçimi (`accurate`) `of doubtful` öbeğinin ardında duramaz; olumsuz biçim (`inaccuracy`) ise `doubtful` ile birlikte anlamı ikilerdi.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l3-14",
              no: 14,
              text: "WILL",
              accept: ["unwilling"],
              explain:
                "`is often ___ to publish it` yapısı bir sıfat ister ve bağlam olumsuz: bilen kurum yayımlamaya İSTEKSİZ. `will` adından `willing` sıfatı, ondan da `unwilling` türetiliyor. Olumsuzluk eki düşerse cümle kendi gerekçesiyle çelişir.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l3-15",
              no: 15,
              text: "DETERIORATE",
              accept: ["deterioration"],
              explain:
                "`who allowed the ___ to happen` yapısında belirli tanımlıktan sonra bir ad geliyor: `deterioration`. Fiil biçimi bu konumda duramaz; ortaç (`deteriorating`) ise `the` ile birlikte tek başına ad öbeği kurmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l3-16",
              no: 16,
              text: "SENTIMENT",
              accept: ["sentimentality"],
              explain:
                "`a kind of ___` yapısı sayılamayan bir ad ister ve ardından gelen örnek duygusal bir aşırılığı anlatıyor: satılması gereken bir binayı kusursuz tutmak. `sentiment` yalın bir görüş bildirir; eleştirinin yerdiği şey ise aşırılık, yani `sentimentality`.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l3-17",
              no: 17,
              text: "EXPAND",
              accept: ["expansion"],
              explain:
                "`a modest ___ in the sums` yapısında `a` ile `in` arasında bir ad var: `expansion`. Cümlenin ikinci yarısındaki `a sharp rise` aynı yapıyı tekrarlıyor ve orada da bir ad bulunuyor.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l3-18",
              no: 18,
              text: "JUDGE",
              accept: ["judgements", "judgments"],
              explain:
                "`according to their own ___` yapısında iyelik sıfatından sonra bir ad geliyor ve özne çoğul (`different bodies`), dolayısıyla ad da çoğul. Britanya ve Amerika yazımı (`judgements` / `judgments`) ikisi de kabul edilir.",
            },
          ],
        },
        {
          id: "en-c1-03-l4",
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
              id: "en-c1-03-l4-19",
              no: 19,
              text: "Nobody realised how bad the roof was until the ceiling fell.\nNot until the ceiling fell ______ how bad the roof was.",
              cue: "ANYONE",
              accept: ["did anyone realise", "did anyone realize"],
              explain:
                "Olumsuz bir zaman öbeği cümle başına geçtiğinde özne ile yardımcı fiil devrilir: «Not until … did anyone realise». Anahtar sözcük `anyone` devrik yapının öznesi ve önüne `did` gerekiyor; İngiliz ve Amerikan yazımı ikisi de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l4-20",
              no: 20,
              text: "The council should have surveyed the buildings ten years ago.\nThe buildings ______ ten years ago.",
              cue: "SURVEYED",
              accept: ["should have been surveyed"],
              explain:
                "Geçmişe dönük bir gereklilik (`should have + üçüncü hâl`) edilgene çevriliyor. Anahtar sözcük üçüncü hâl olduğu için zincir `should have been` biçiminde tamamlanıyor; `should be surveyed` geçmişi kaybederdi.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l4-21",
              no: 21,
              text: "It is impossible to establish who authorised the delay.\nThere ______ of establishing who authorised the delay.",
              cue: "WAY",
              accept: ["is no way"],
              explain:
                "`It is impossible to do something` yapısı `there is no way of + ulaç` kalıbına çevriliyor. Anahtar sözcük `way` kalıbın çekirdeği; boşluktan sonra gelen `of establishing` bu kalıbın ikinci yarısını zaten veriyor.",
            },
            {
              kind: "gap",
              id: "en-c1-03-l4-22",
              no: 22,
              text: "The report was ignored, which surprised nobody.\nIt ______ that the report was ignored.",
              cue: "SURPRISE",
              accept: ["came as no surprise", "was no surprise"],
              explain:
                "«which surprised nobody» yapısı `it came as no surprise that …` kalıbına çevriliyor. Anahtar sözcük ad olduğu için önüne olumsuz belirteç gerekiyor; `was a surprise` anlamı tersine çevirirdi.",
            },
          ],
        },
        {
          id: "en-c1-03-l5",
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
              title: "The work that leaves no trace",
              body: `There is a class of work whose success is indistinguishable from nothing having happened, and our public language has almost no way of describing it. The engineer who replaces a cable before it fails, the inspector who closes a stairwell in March, the officer who talks a crowd out of a corner: none of them produces an event, and events are what we are able to notice, fund and reward.

What follows from this is not a sentimental point about unsung heroes. It is a structural one about measurement. An organisation that can only see events will systematically underinvest in the work that prevents them, not because anybody decides to, but because the accounting apparatus has no column for an absence. It is precisely this blindness that produces the familiar cycle of neglect and emergency, rather than any shortage of goodwill among the people involved.

I should be careful here, because the counter-argument is strong and I have no wish to caricature it. Prevention is easy to claim and hard to verify; a department that spends thirty years asserting that its vigilance is the reason nothing has gone wrong is making a claim that cannot be tested, and the history of public administration is not short of such departments. On balance, the demand for evidence is right, and the people making it are not fools.

The way through, I think, is narrower than either side allows. We cannot measure absences directly, but we can measure the conditions that produce them: the age of the assets, the size of the backlog, the number of inspections deferred. Rarely have these figures been published in a form that a citizen could actually use, and the reluctance of public bodies to publish them is itself informative.

None of this will make the work visible in the way that a ribbon-cutting is visible. What it might do is make its absence visible, which is arguably the more useful of the two.`,
              gloss: [
                { de: "a stairwell", tr: "merdiven boşluğu", en: "stairwell" },
                { de: "a backlog", tr: "birikmiş iş yükü", en: "backlog" },
                { de: "vigilance", tr: "tetikte olma", en: "vigilance" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-03-l5-23",
              no: 23,
              text: "What does the writer say is distinctive about preventive work?",
              options: ["It is usually carried out by unpaid volunteers", "Its success looks like nothing happening", "It is more expensive than emergency work", "It has become less common in recent years"],
              answer: 1,
              explain:
                "İlk cümle tanımı veriyor: «work whose success is indistinguishable from nothing having happened». Gönüllülük, maliyet karşılaştırması ve azalma savı metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l5-24",
              no: 24,
              text: "Why, according to the writer, do organisations underinvest in prevention?",
              options: ["Because managers deliberately prefer visible projects", "Because prevention is more expensive", "Because their accounting cannot record an absence", "Because the public demands emergency spending"],
              answer: 2,
              explain:
                "Gerekçe açıkça niyet dışı: «not because anybody decides to, but because the accounting apparatus has no column for an absence». Birinci şık tam olarak reddedilen kasıt açıklamasıdır.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l5-25",
              no: 25,
              text: "What does the writer concede to the opposing view?",
              options: ["Claims about prevention are hard to verify", "Prevention is often unnecessary", "Inspections are usually a formality", "Public bodies rarely employ enough engineers"],
              answer: 0,
              explain:
                "Ödün üçüncü paragrafta: «Prevention is easy to claim and hard to verify» ve «On balance, the demand for evidence is right». Yazar önlemenin gereksizliğini hiçbir yerde kabul etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-l5-26",
              no: 26,
              text: "What does the writer propose?",
              options: ["Publishing the names of the staff involved", "Measuring prevention directly", "Accepting that this kind of work will never be recognised", "Publishing figures that stand in for the invisible work"],
              answer: 3,
              explain:
                "Öneri dördüncü paragrafta ve doğrudan ölçmeyi dışlıyor: «We cannot measure absences directly, but we can measure the conditions that produce them». Ardından üç vekil gösterge sayılıyor: varlıkların yaşı, birikmiş işin büyüklüğü, ertelenen denetim sayısı.",
            },
          ],
        },
        {
          id: "en-c1-03-l6",
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
              body: "The defence of maintenance is almost always made by people who already hold a post within it. I do not say that makes it wrong, but it should make us ask who is absent from the conversation: the districts whose assets were never built in the first place, and who are now told that upkeep must come before anything new.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "My position has moved. Ten years ago I would have said that a backlog figure was a management fiction, and I said so at a conference. Watching two authorities produce comparable numbers with the same definition has convinced me that the difficulty is practical rather than conceptual.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Both sides treat maintenance as a single activity. It is not. Keeping a bridge safe and keeping a bridge pleasant are different operations with different funders and different failure modes, and most of the disagreements I have read dissolve once that separation is made.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "The distribution is usually left out. Deferred work survives only where somebody absorbs the risk, and historically that somebody has been whoever happens to be in the building when it fails. Any argument about efficiency that does not say who carries the risk is not an argument at all.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "We already know how this ends, because four other countries have run the experiment within living memory. What is striking is not the outcome but the confidence with which each administration believed its own assets to be newer than they were.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-03-l6-27",
              no: 27,
              text: "Which writer argues that the debate merges two separate activities?",
              answer: "c",
              explain:
                "Writer C ayrımı doğrudan kuruyor: «Keeping a bridge safe and keeping a bridge pleasant are different operations» ve anlaşmazlıkların bu ayrım yapılınca çözüldüğünü söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-03-l6-28",
              no: 28,
              text: "Which writer has changed their mind about a measurement?",
              answer: "b",
              explain:
                "Writer B eski konumunu ve dönüşünü birlikte veriyor: «Ten years ago I would have said that a backlog figure was a management fiction» — sonra iki idarenin karşılaştırılabilir sayı üretmesi onu ikna etmiş.",
            },
            {
              kind: "match",
              id: "en-c1-03-l6-29",
              no: 29,
              text: "Which writer says that the cost of inaction falls on people who did not choose it?",
              answer: "d",
              explain:
                "Writer D riski taşıyanı adlandırıyor: «whoever happens to be in the building when it fails». Karar verenle bedeli ödeyen aynı kişi değil.",
            },
            {
              kind: "match",
              id: "en-c1-03-l6-30",
              no: 30,
              text: "Which writer questions the standing of those who make the argument?",
              answer: "a",
              explain:
                "Writer A savı savunanların konumuna dikkat çekiyor: «made by people who already hold a post within it» ve konuşmada bulunmayanları soruyor. Savı yanlış saymıyor, kimin adına kurulduğunu sorguluyor.",
            },
          ],
        },
        {
          id: "en-c1-03-l7",
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
              title: "The survey that nobody wanted",
              body: `In the early nineteen-nineties a national audit office set out to establish the condition of every school building in the country. The plan was straightforward: send a surveyor to each site, record the defects, add up the cost.

{{31}}

The difficulty was not one of access. Head teachers cooperated, the surveyors were experienced, and the forms came back on time. What defeated the exercise was the word condition, which turned out to mean something different in each of the four regions.

{{32}}

Later attempts made the picture more precise. When the same buildings were surveyed twice by different teams working to a common definition, the two totals differed by less than nine per cent, which suggests that the earlier variation was a matter of definition rather than of judgement.

{{33}}

This has an uncomfortable implication for policy. If the total depends on a definition that is itself negotiable, then the figure can be moved without a single repair being carried out, and on at least two occasions it has been.

{{34}}`,
              gloss: [
                { de: "an audit office", tr: "sayıştay", en: "audit office" },
                { de: "a defect", tr: "kusur, arıza", en: "defect" },
                { de: "negotiable", tr: "pazarlığa açık", en: "negotiable" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The first returns arrived within four months and they were unusable. One region reported a backlog nine times larger, per pupil, than the region next to it, and nobody involved believed that the difference was real." },
            { key: "b", label: "b", body: "In one region a leaking roof was recorded as a defect only if water had reached a classroom; in another, a roof approaching the end of its expected life was counted whether or not it leaked. Both definitions are defensible, and they are not comparable." },
            { key: "c", label: "c", body: "That finding was, in its way, reassuring. It meant that a national figure was achievable after all, and that the obstacle had been administrative rather than a limit on what anybody could know." },
            { key: "d", label: "d", body: "The lesson most often drawn is that such surveys are futile. A better one is that the definition should be settled, published and made tedious to change, which is exactly the sort of recommendation that no minister has ever announced." },
            { key: "e", label: "e", body: "School buildings constructed between 1955 and 1975 used a range of prefabricated systems, several of which are now the subject of separate investigations." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-03-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Giriş planı anlatıyor ve boşluktan sonraki paragraf «The difficulty was not one of access» diye başlıyor, yani araya bir başarısızlık girmiş olmalı. (a) o başarısızlığı veriyor: dört ayda gelen ve kullanılamaz çıkan ilk sonuçlar.",
            },
            {
              kind: "match",
              id: "en-c1-03-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "b",
              explain:
                "Önceki paragraf sorunun «the word condition» olduğunu söylüyor; (b) bunu iki bölgenin tanımıyla örnekliyor ve «Both definitions are defensible, and they are not comparable» diyerek savı tamamlıyor.",
            },
            {
              kind: "match",
              id: "en-c1-03-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "c",
              explain:
                "Önceki paragraf iki ekibin ortak tanımla yüzde dokuzdan az fark ürettiğini söylüyor; (c) «That finding» ile o bulguya gönderme yapıp değerlendiriyor: engel yönetseldi, bilgiye erişimin sınırı değil.",
            },
            {
              kind: "match",
              id: "en-c1-03-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "d",
              explain:
                "Son paragraf rakamın tek onarım yapılmadan oynatılabildiğini söylüyor; (d) buradan çıkarılacak dersi tartışıyor ve yazının kapanışını veriyor. (e) 1955-1975 yapı sistemlerinden söz ediyor ve metnin hiçbir yerinde yapı tekniği tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-03-l8",
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
              label: "a — Highways engineer",
              body: "People ask me for the cost of the backlog and I give them a number, and it does not help, which used to frustrate me. The number is defensible. What it cannot carry is that half of it is urgent and half of it could wait a decade, and in eleven years nobody has ever asked me which half.",
            },
            {
              key: "b",
              label: "b — Finance director",
              body: "We consolidated eleven asset registers last year and nine of the mergers were straightforwardly better. The two that were not are the ones I think about: in both cases we dropped a local record that looked redundant and was in fact the only place a known weakness had been written down. We have rebuilt them, at a cost well above the saving.",
            },
            {
              key: "c",
              label: "c — Building inspector",
              body: "The guidance says that experience is what builds judgement, and I do not dispute it. My difficulty is practical: an inspector sees whatever is on the rota that month, and nobody is arranging for them to meet the failure modes that are rare. We call it experience and treat it as though it were a curriculum.",
            },
            {
              key: "d",
              label: "d — Council leader",
              body: "I have signed off deferrals every year I have been in post, and I would defend most of them against anybody. What I would not defend is that we never wrote down what we were deferring, or why, so whoever follows me inherits a decision with no reasoning attached to it.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-03-l8-35",
              no: 35,
              text: "Which text says that a correct figure conceals a distinction that matters?",
              answer: "a",
              explain:
                "Mühendis sayının savunulabilir olduğunu kabul edip eksiğini adlandırıyor: «What it cannot carry is that half of it is urgent and half of it could wait a decade». Rakam doğru, ayrım kayıp.",
            },
            {
              kind: "match",
              id: "en-c1-03-l8-36",
              no: 36,
              text: "Which text describes a saving that turned out to cost more?",
              answer: "b",
              explain:
                "Mali müdür iki birleştirmeyi geri almış: «We have rebuilt them, at a cost well above the saving». Gereksiz görünen yerel kayıt, bilinen bir zayıflığın yazılı olduğu tek yermiş.",
            },
            {
              kind: "match",
              id: "en-c1-03-l8-37",
              no: 37,
              text: "Which text says that what is called experience is left to chance?",
              answer: "c",
              explain:
                "Denetçi rastlantıyı adlandırıyor: «an inspector sees whatever is on the rota that month» ve nadir arıza türleriyle karşılaşmayı kimse ayarlamıyor. «We call it experience and treat it as though it were a curriculum».",
            },
            {
              kind: "match",
              id: "en-c1-03-l8-38",
              no: 38,
              text: "Which text criticises a failure to record reasoning?",
              answer: "d",
              explain:
                "Meclis başkanı kararların kendisini değil, gerekçesizliğini eleştiriyor: «we never wrote down what we were deferring, or why». Halef bir kararı gerekçesiz devralıyor.",
            },
            {
              kind: "match",
              id: "en-c1-03-l8-39",
              no: 39,
              text: "Which text says that nobody has asked the question that would make the information useful?",
              answer: "a",
              explain:
                "Mühendis süreyi de veriyor: «in eleven years nobody has ever asked me which half». Yararlı olacak soru, rakamın hangi yarısının acil olduğu.",
            },
            {
              kind: "match",
              id: "en-c1-03-l8-40",
              no: 40,
              text: "Which text defends the very decisions it also criticises?",
              answer: "d",
              explain:
                "İki cümle yan yana duruyor: «I would defend most of them against anybody» ve «What I would not defend is …». Savunma kararlara, eleştiri kayıt tutulmamasına.",
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
          id: "en-c1-03-h1",
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
              situation: "İki mühendis bir yol yenileme programını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Sunna", text: "The programme works, and I say that as somebody who spent three years arguing against it. What I still cannot defend is the order we do the streets in." },
                { speaker: "Bilal", text: "The order is not ours, though. We follow the complaint data." },
                { speaker: "Sunna", text: "Which is precisely the objection, not an answer to it. Complaints come from the streets that complain, and we should at least say so in the annual report." },
                { speaker: "Bilal", text: "I would go along with saying so. I would resist the next step, which is to make a resurfacing programme responsible for correcting who does and does not write to a council." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir şehir plancısı konut tartışmasından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You have said the housing debate is conducted at the wrong level of detail. What do you mean?" },
                { speaker: "Planner", text: "People argue about whole cities. A city is not a unit; it is perhaps four hundred neighbourhoods, and policy reaches them one at a time. Once you look at neighbourhoods the argument becomes tractable and, I admit, a good deal less exciting." },
                { speaker: "Host", text: "Does that make you optimistic?" },
                { speaker: "Planner", text: "It makes me specific, which is not the same thing. The neighbourhood view tells you that some places will keep a name whose meaning has changed entirely, and nobody has a good word for that experience, let alone a policy for it." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi göstergelerin bozulmasından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "The measurement literature contains a warning that is worth repeating whenever a new indicator is proposed. Any figure that is used to allocate money will, within about three years, be optimised by the people it measures, and the optimisation will be perfectly rational at every step." },
                { speaker: "Lecturer", text: "The response is not to abandon measurement, which would be worse, but to expect the drift and to build in a review that assumes it. Almost nobody does this, because a review that assumes your own indicator will decay is very difficult to write into a business case." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-03-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Sunna's main criticism of the programme?",
              options: ["The programme does not work", "The way the work is prioritised", "The cost of the programme to residents"],
              answer: 1,
              explain:
                "Sunna programın işlediğini baştan kabul ediyor: «The programme works, and I say that as somebody who spent three years arguing against it». Eleştirisi tek bir noktada: «the order we do the streets in». Maliyet hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h1-2",
              no: 2,
              ref: "a1",
              text: "What does Bilal accept and what does he refuse?",
              options: ["He accepts the report change but not a wider duty", "He accepts the criticism but not the report change", "He refuses both parts of the argument"],
              answer: 0,
              explain:
                "Bilal ayrımı kendisi yapıyor: «I would go along with saying so», ama «I would resist the next step, which is to make a resurfacing programme responsible for correcting who does and does not write to a council».",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h1-3",
              no: 3,
              ref: "a2",
              text: "What does the planner object to?",
              options: ["The lack of national funding for housing", "The speed of new building", "Arguing at the level of the whole city"],
              answer: 2,
              explain:
                "İtiraz ölçek düzeyine: «People argue about whole cities. A city is not a unit». Fon ya da yapım hızı kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h1-4",
              no: 4,
              ref: "a2",
              text: "What does the planner say about his own position?",
              options: ["He is optimistic about the outcome", "He has no policy for the experience he describes", "He is more precise rather than more hopeful"],
              answer: 2,
              explain:
                "İyimserlik sorusuna verdiği yanıt ayrımı kuruyor: «It makes me specific, which is not the same thing». Politika eksikliği doğru ama kendisine değil, alana ait bir gözlem olarak veriliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the lecturer say happens to a new indicator?",
              options: ["It should be avoided entirely wherever possible", "It will be optimised by those it measures", "It is usually badly designed at the outset"],
              answer: 1,
              explain:
                "Uyarı açık: «Any figure that is used to allocate money will, within about three years, be optimised by the people it measures». Ölçmeyi bırakmak ise açıkça daha kötü sayılıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h1-6",
              no: 6,
              ref: "a3",
              text: "Why is the recommended response rarely adopted?",
              options: ["It is hard to justify in a business case", "It costs a great deal more than the indicator saves", "It requires abandoning measurement altogether"],
              answer: 0,
              explain:
                "Gerekçe son cümlede: «a review that assumes your own indicator will decay is very difficult to write into a business case». Maliyet karşılaştırması yapılmıyor ve ölçmeyi bırakmak zaten reddedilen seçenek.",
            },
          ],
        },
        {
          id: "en-c1-03-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear an officer reporting the results of a condition survey. Complete the sentences, questions 7 to 14, with a word, a number or a short phrase. You hear the report ONCE only.",
          promptTr:
            "Bir yetkilinin durum tespiti sonuçlarını anlattığını dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük, bir sayı ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir yetkili meclis komisyonuna sonuçları sunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Thank you. I will give you the headline results of the survey and I will not pretend that they make comfortable reading. We inspected two thousand four hundred structures, and we were able to give a condition grade to two thousand one hundred of them; the remainder could not be reached safely. The total figure for outstanding work is one hundred and ninety million pounds, and I want to say immediately that the number is less useful than it looks. Here is the first finding: the worst grades are not on the oldest structures, they are on those built in the nineteen-sixties, because that is when the assumed design life was shortest. Second, the split matters more than the total. About a quarter of the sum is urgent within two years; the rest could be programmed over a decade without any additional risk. Third, the cost of the survey itself was one point four million, which is roughly what we spend on reactive repairs in five weeks. Fourth, a caution: we hold no condition record at all for the retaining walls, and those are the assets most likely to fail without warning. And finally, the workforce. We have eleven qualified inspectors and we need twenty-six, and that is the constraint that keeps me awake, not the money.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Condition survey — headline results",
              body: `The survey inspected {{7}} structures in total.

A condition grade was given to {{8}} of them.

The total figure for outstanding work is {{9}} million pounds.

The worst grades are on structures built in the {{10}}.

About {{11}} of the sum is urgent within two years.

The survey itself cost {{12}} million pounds.

No condition record at all is held for the {{13}}.

The council has eleven inspectors and needs {{14}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-03-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["2400", "two thousand four hundred"],
              explain:
                "«We inspected two thousand four hundred structures» — incelenen toplam. İki bin yüz, not verilebilenlerin sayısı; iki sayı arka arkaya geçiyor ve cümle toplamı soruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["2100", "two thousand one hundred"],
              explain:
                "«we were able to give a condition grade to two thousand one hundred of them» — not verilebilen sayı. Geri kalanına güvenli erişilemediği için not verilememiş.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["190", "one hundred and ninety"],
              explain:
                "«The total figure for outstanding work is one hundred and ninety million pounds». Cümlede `million pounds` zaten yazılı olduğu için boşluğa yalnız sayı geliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["1960s", "nineteen-sixties", "sixties"],
              explain:
                "Kayıt beklentiyi bozuyor: «the worst grades are not on the oldest structures, they are on those built in the nineteen-sixties». En eski yapıları yazan öğrenci tam olarak çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["a quarter", "one quarter", "25 per cent"],
              explain:
                "«About a quarter of the sum is urgent within two years» — acil pay. Geri kalanın on yıla yayılabildiği hemen ardından söyleniyor; oran ile toplamı karıştıran öğrenci yüz doksanı yazar.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["1.4", "one point four"],
              explain:
                "«the cost of the survey itself was one point four million». Kayıt bu rakamı hemen bir ölçüye bağlıyor: beş haftalık tepkisel onarım harcamasına denk.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["retaining walls", "walls"],
              explain:
                "«we hold no condition record at all for the retaining walls» ve hemen ardından bunların uyarısız çökmeye en yatkın varlıklar olduğu ekleniyor. Kaydın en rahatsız edici bulgusu bu.",
            },
            {
              kind: "gap",
              id: "en-c1-03-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["26", "twenty-six"],
              explain:
                "«We have eleven qualified inspectors and we need twenty-six» — gereken sayı. Konuşmacı asıl kısıtın para değil bu olduğunu ayrıca söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-03-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about the upkeep of public buildings. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Kamu binalarının bakımı üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel",
              situation: "Üç konuşmacı kamu binalarının bakımını tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Karin, you have argued that the backlog figure does more harm than good. That is a strong claim." },
                { speaker: "Karin", text: "It is, and I want to be exact about it. My objection is not to measuring; it is to publishing a single national total. A total invites the response that the sum is unaffordable, which is true and useless. Break it into what fails this year and the conversation becomes possible." },
                { speaker: "Chair", text: "Dmitri, you have worked with those totals for two decades." },
                { speaker: "Dmitri", text: "I have, and I used to make Karin's argument myself. I have changed my mind, for a reason I did not expect. The total is the only number that survives a change of administration. Everything more detailed gets redefined within a year, and then you cannot compare anything with anything." },
                { speaker: "Chair", text: "Fenna, does that resolve it?" },
                { speaker: "Fenna", text: "It sharpens it. What both of them are describing is a trade-off between comparability and usefulness, and I would say plainly that we have never had a serious attempt to have both. Nobody has tried publishing the total alongside a fixed, audited breakdown, because the breakdown is where the political pain is." },
                { speaker: "Chair", text: "Karin, is there evidence either way?" },
                { speaker: "Karin", text: "Very little, and I would rather say so than pretend. Two authorities have published breakdowns and both stopped after three years. That is not enough to conclude anything, and I notice that everyone on this panel, including me, has a story that explains the failure in their own favour." },
                { speaker: "Chair", text: "Dmitri, what about the incentive question?" },
                { speaker: "Dmitri", text: "That is the part that worries me most. Any figure attached to funding gets managed. If the urgent category attracts money, the urgent category grows, and it grows honestly: engineers reclassify in good faith because the definition has room in it. I would build the review into the rule from the first day, not add it after the drift appears." },
                { speaker: "Chair", text: "Fenna, a last word." },
                { speaker: "Fenna", text: "Only that the comparison with private companies is misleading and I wish it would stop. A company that defers maintenance eventually loses customers, which disciplines it. A council that defers maintenance loses nothing measurable for fifteen years, and by then the people who decided have gone. Those are not the same problem." },
              ],
              gloss: [
                { de: "a backlog", tr: "birikmiş iş yükü", en: "backlog" },
                { de: "comparability", tr: "karşılaştırılabilirlik", en: "comparability" },
                { de: "to reclassify", tr: "yeniden sınıflandırmak", en: "reclassify" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-03-h3-15",
              no: 15,
              ref: "c1",
              text: "What exactly is Karin objecting to?",
              options: ["The practice of measuring condition at all", "The accuracy of the surveys behind the figure", "Publishing one national total rather than a breakdown", "The way engineers classify urgent work"],
              answer: 2,
              explain:
                "Karin itirazını kendisi sınırlıyor: «My objection is not to measuring; it is to publishing a single national total». Ölçüm doğruluğu ve sınıflandırma başka konuşmacıların konusu.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-16",
              no: 16,
              ref: "c1",
              text: "Why does Karin say a national total is useless?",
              options: ["It invites a true but unhelpful response", "It is always out of date by the time it appears", "It is calculated differently in every region", "It excludes the buildings in the worst condition"],
              answer: 0,
              explain:
                "«A total invites the response that the sum is unaffordable, which is true and useless». Doğruluğu değil, tartışmayı bitirmesi sorun ediliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Dmitri say about his own view?",
              options: ["He has always disagreed with Karin", "He is unsure which position is correct", "He avoids taking a position in public", "He once held the position Karin now holds"],
              answer: 3,
              explain:
                "Dmitri konum değişikliğini açıkça bildiriyor: «I used to make Karin's argument myself. I have changed my mind, for a reason I did not expect». Kararsız değil, gerekçesini de veriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-18",
              no: 18,
              ref: "c1",
              text: "What is Dmitri's reason for defending the total?",
              options: ["It is cheaper to produce than a breakdown", "It survives changes of administration", "It is easier for the public to understand", "It is required by national regulation"],
              answer: 1,
              explain:
                "«The total is the only number that survives a change of administration. Everything more detailed gets redefined within a year». Gerekçe maliyet ya da anlaşılırlık değil, karşılaştırılabilirliğin korunması.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-19",
              no: 19,
              ref: "c1",
              text: "How does Fenna characterise the disagreement?",
              options: ["As a trade-off that has never been properly tested", "As a misunderstanding between the two speakers", "As a dispute about the quality of the data", "As a question that the evidence has already settled"],
              answer: 0,
              explain:
                "Fenna ikisini de aynı ikilemin içine yerleştiriyor: «a trade-off between comparability and usefulness» ve ekliyor: «we have never had a serious attempt to have both».",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Karin say about the available evidence?",
              options: ["It supports her position clearly", "It is too thin to settle the question", "It has been suppressed by two authorities", "It contradicts everything the panel has said"],
              answer: 1,
              explain:
                "Karin kanıtın azlığını kabul ediyor: «Very little, and I would rather say so than pretend … That is not enough to conclude anything», üstelik kendisi dahil herkesin kendi lehine bir açıklaması olduğunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-21",
              no: 21,
              ref: "c1",
              text: "What does Dmitri predict about a funded urgent category?",
              options: ["It will be abolished within three years", "It will be challenged in the courts", "It will grow through honest reclassification", "It will be ignored by most authorities"],
              answer: 2,
              explain:
                "Dmitri kötü niyeti açıkça dışlıyor: «engineers reclassify in good faith because the definition has room in it». Kategori büyür, çünkü tanım esnek ve para oraya bağlı.",
            },
            {
              kind: "mcq",
              id: "en-c1-03-h3-22",
              no: 22,
              ref: "c1",
              text: "Why does Fenna reject the comparison with private companies?",
              options: ["Companies have larger maintenance budgets", "Companies are subject to stricter inspection", "Councils own older buildings than companies do", "A company faces a consequence that a council does not"],
              answer: 3,
              explain:
                "Fenna farkı düzenekte buluyor: şirket müşteri kaybeder ve bu onu disipline eder, «A council that defers maintenance loses nothing measurable for fifteen years». Bütçe ya da bina yaşı karşılaştırması yapılmıyor.",
            },
          ],
        },
        {
          id: "en-c1-03-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about public assets and their upkeep. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Kamu varlıkları ve bakımı üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to concede a point they once disputed" },
            { key: "b", label: "to distinguish two problems that are usually merged" },
            { key: "c", label: "to explain why a scheme was abandoned" },
            { key: "d", label: "to warn that a target will be gamed" },
            { key: "e", label: "to credit a change to somebody else" },
            { key: "f", label: "to reject a comparison being used in the debate" },
            { key: "g", label: "to describe a cost that appears in no account" },
            { key: "h", label: "to ask for a decision to be postponed" },
            { key: "i", label: "to defend a colleague who has been criticised" },
            { key: "j", label: "to argue that the evidence is too thin to act on" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı eski bir tartışmaya dönüyor.",
              plays: 2,
              segments: [
                { text: "For years I said in meetings that a five-year settlement would change nothing, and I said it with some force. Three authorities now have one, and the pattern of their spending is visibly different from ours. I was wrong about that, and it seems worth saying so before somebody else does." },
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
                { text: "We keep hearing that the estate is in poor condition. Two entirely different things are being run together there: buildings that are unsafe, and buildings that are merely unpleasant. The first is an engineering emergency, the second is a budget preference, and treating them as one problem guarantees that neither gets solved." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bir hedefin yaratacağı davranıştan söz ediyor.",
              plays: 2,
              segments: [
                { text: "If we publish a target of ninety per cent of assets in grade two or better, I can tell you now what will happen. Within two years the grading will loosen, not because anybody cheats, but because every borderline case will be argued upwards by somebody with a deadline. The number will improve and the buildings will not." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir benzetmeyi reddediyor.",
              plays: 2,
              segments: [
                { text: "People keep saying that a city should manage its assets the way a household manages a roof. It is a comforting picture and it is wrong in the way that matters. A household has one roof and one decision; a city has eleven thousand and a rule about who may decide. The analogy hides exactly the part that is difficult." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bir değişikliğin sahibini adlandırıyor.",
              plays: 2,
              segments: [
                { text: "I have been given credit for the inspection reform in two newspapers and it is not mine. The proposal was written by a technician in the west depot who submitted it three times and was refused twice. I signed it, which is the easy part, and her name should be on it." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı hiçbir hesapta görünmeyen bir maliyeti anlatıyor.",
              plays: 2,
              segments: [
                { text: "The closure of the footbridge appears in our accounts as a saving of forty thousand a year. What does not appear anywhere is that six hundred people now walk an extra kilometre twice a day, and that the primary school has lost a third of its walking route. Nobody has ever been asked to put a figure on that, so there is none." },
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
                { text: "A good deal has been said this week about the officer who signed the deferral, most of it by people who have not read the file. She recorded her reasons in writing, she flagged the risk twice, and she was overruled. If we want to criticise somebody, the papers make it perfectly clear who." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı bir kararın ertelenmesini istiyor.",
              plays: 2,
              segments: [
                { text: "I am not against the disposal in principle, and I want that on the record. What I am asking for is eight weeks. The structural report arrives in March, and voting in February means voting without the one document that could change anybody's mind. Eight weeks costs us very little and buys us the argument we should be having." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-03-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı eski konumunu anıp geri alıyor: «I was wrong about that, and it seems worth saying so before somebody else does». Amaç bir kabul, bir uyarı ya da bir savunma değil.",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "«Two entirely different things are being run together there: buildings that are unsafe, and buildings that are merely unpleasant» — konuşmanın tamamı bu ayrımı kurmaya ayrılmış.",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "d",
              explain:
                "Hedefin nasıl bozulacağı önceden anlatılıyor: «The number will improve and the buildings will not», üstelik «not because anybody cheats» denerek kötü niyet dışlanıyor.",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "f",
              explain:
                "Konuşmacı tartışmada kullanılan benzetmeyi hedef alıyor: «The analogy hides exactly the part that is difficult». İtiraz kararın kendisine değil, kurulan karşılaştırmaya.",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı kendisine verilen payeyi reddedip sahibini gösteriyor: «The proposal was written by a technician in the west depot … her name should be on it».",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "g",
              explain:
                "Kayıt görünen tasarrufla görünmeyen bedeli karşılaştırıyor: kırk bin tasarruf hesapta var, «What does not appear anywhere is that six hundred people now walk an extra kilometre twice a day».",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Konuşmacı eleştirilen memuru koruyor: gerekçelerini yazmış, riski iki kez bildirmiş ve kararı ezilmiş. «If we want to criticise somebody, the papers make it perfectly clear who».",
            },
            {
              kind: "match",
              id: "en-c1-03-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Talep açık ve süreli: «What I am asking for is eight weeks», çünkü yapısal rapor martta geliyor. Konuşmacı satışa ilkece karşı olmadığını da ayrıca kayda geçiriyor.",
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
          id: "en-c1-03-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on public spending. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. New projects attract funding because they are visible and can be opened.\n2. Maintenance is cheaper over time but produces nothing that can be shown.\n\nWrite 220 to 260 words.",
          promptTr:
            "Kamu harcamaları üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Yeni projeler görünür oldukları ve açılışı yapılabildiği için fon çeker.\n2. Bakım uzun vadede daha ucuzdur ama gösterilecek bir şey üretmez.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two points raised in the seminar are not straightforwardly opposed, and the difficulty lies in deciding which of them a funding system should be designed around.

The case about visibility is a case about political survival. A new library can be opened, photographed and attributed to the people who authorised it, whereas a replaced cable can be attributed to nobody. Against this, it is worth adding that visibility is not merely vanity: an opening is also the moment at which a public can see what its money bought, and there is no obvious substitute for that.

The second point concerns the arithmetic of delay. The claim is not that maintenance is virtuous but that deferring it is expensive, since the cost of a repair rises with the square of the years it is postponed, or something close to it. On this account the preference for the new is not a moral failing but a predictable consequence of budgeting in single years.

I regard the second as the more important of the two, though for a narrower reason than is usually offered. Visibility can be engineered: a maintenance programme can be published, mapped and reported on. What cannot be engineered away is a one-year settlement, and until that changes the arithmetic will keep producing the same answer.

My own view is that the framing invites a false choice. The interesting question is not new against old but which decisions should be removed from the annual cycle altogether, and nobody at the seminar asked it in that form.`,
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
          id: "en-c1-03-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to close a facility rather than repair it. Write a report for its board. Describe the current situation, assess the likely effects of closing it, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum bir tesisi onarmak yerine kapatmak üzere. Yönetim kuruluna bir rapor yaz. Mevcut durumu anlat, kapatmanın olası etkilerini değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the current situation precisely.", tr: "Mevcut durumu kesin biçimde anlat." },
              { de: "Assess both the savings and the costs of closing.", tr: "Kapatmanın hem tasarrufunu hem bedelini değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed closure of the north hall

Current situation
The north hall has been in partial use since the roof survey of two years ago, when three bays were fenced off. It currently hosts four regular groups, two of which have no alternative venue within the district. The engineer's estimate for full repair is 340,000, against an annual running cost of 26,000 and an estimated demolition cost of 90,000.

Assessment
The saving from closure is real but smaller than it appears. Removing the running cost releases 26,000 a year; demolition consumes three and a half years of that saving before any benefit begins. Two further effects are not in the financial case. The first is displacement: the two groups without an alternative will not simply move, and our own attendance data from the west site suggests that roughly half of such members are lost permanently. The second is precedent. This would be the third closure in five years, and each has been justified on the ground that the previous one did not cause serious harm.

Recommendation
I recommend a phased repair beginning with the three fenced bays, funded over three years rather than one, and a decision on the remainder deferred until the second structural report in March. I would not recommend closure this year, and I would specifically advise against demolition before the site's future use has been decided, since that step is irreversible and removes every option we might later want.`,
            criteria: [
              "Mevcut durum sayı ve tarihle mi anlatıldı?",
              "Hem tasarruf hem bedel değerlendirildi mi?",
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
          id: "en-c1-03-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about cities, public services and how decisions about them are made.",
          promptTr: "Sana şehirler, kamu hizmetleri ve bunlara dair kararların nasıl alındığı hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe something in the place where you live that works well and that most people never notice?", tr: "Günaydın. Yaşadığın yerde iyi işleyen ama çoğu kişinin fark etmediği bir şeyi tarif eder misin?" },
            { who: "you", hint: "Somut bir şey seç ve neden görünmez olduğunu adlandır.", expect: "somut bir örneği betimlemek ve görünmezliğinin nedenini adlandırmak", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think that invisibility is a permanent feature of such work, or only a failure of reporting?", tr: "Teşekkürler. Sence bu görünmezlik böyle işlerin kalıcı bir özelliği mi, yoksa yalnız raporlamanın eksiği mi?" },
            { who: "you", hint: "Bir konum al ama karşı görüşe bir pay bırak.", expect: "bir konum almak ve karşı görüşe pay bırakmak", seconds: 50 },
            { who: "partner", de: "And how would you decide whether a service has genuinely improved or has only become better at reporting itself?", tr: "Bir hizmetin gerçekten iyileştiğine mi yoksa yalnız kendini raporlamakta ustalaştığına mı karar vermek için ne yapardın?" },
            { who: "you", hint: "Bir ölçüt öner ve onu neden seçtiğini açıkla.", expect: "bir ölçüt önermek ve seçimini gerekçelendirmek", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "describe something concrete and analyse it", tr: "Somut bir şeyi betimlemek ve çözümlemek" },
              { de: "take a position while conceding something", tr: "Bir konum alırken bir şeyi kabul etmek" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önermek ve gerekçelendirmek" },
            ],
            sample:
              "The obvious one is the drainage on the hill road, which floods in every other town near here and has not flooded once in my lifetime; nobody notices because the evidence of success is an ordinary morning. I would say the invisibility is structural rather than a reporting failure, although reporting makes it worse: you can publish the maintenance schedule, but you cannot publish the flood that did not occur. As for telling improvement from better reporting, I would look at whichever measure the organisation did not choose for itself, and I would look at it over a period longer than one administration.",
            criteria: [
              "Örnek somut mu ve çözümlendi mi?",
              "Konum alınırken karşı görüşe pay bırakıldı mı?",
              "Ölçüt önerildi ve gerekçelendirildi mi?",
              "Çekimserlik ifadeleri C1 düzeyinde mi? (I would say, although, rather than)",
            ],
          },
        },
        {
          id: "en-c1-03-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. A city has enough money either to build one new facility or to bring three existing ones back into full use. Set out the case for each, say which you would choose, and identify the strongest argument against your own choice.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir şehrin parası ya bir yeni tesis yapmaya ya da mevcut üç tesisi tam kullanıma döndürmeye yetiyor. Her ikisinin de savunmasını kur, hangisini seçeceğini söyle ve kendi seçimine karşı en güçlü savı adlandır.",
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
              "The case for the new facility is not merely political, although it is partly that. A new building can be designed for what people need now rather than for what they needed in 1974, and it arrives without the accumulated compromises of a repaired one. The case for restoring three is arithmetical and, I think, stronger: three buildings already sit inside the neighbourhoods that use them, and reopening them serves roughly four times the population for the same sum. I would restore the three. The strongest argument against my own choice is that a repaired building of that generation is repaired repeatedly: the money buys a decade, not a lifetime, and in fifteen years the same council will be having this conversation with less money and older assets. I do not think that defeats the case, but anybody making my argument should be required to say what happens in year eleven.",
            criteria: [
              "İki savunma da adil biçimde kuruldu mu?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi seçimine karşı en güçlü sav adlandırıldı mı, yoksa zayıf bir hâli mi kuruldu?",
              "İki dakika boyunca yapı korunabildi mi?",
              "Soyut sözcük dağarcığı C1 düzeyinde mi? (accumulated, arithmetical, defeats the case)",
            ],
          },
        },
        {
          id: "en-c1-03-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A council must choose how to spend a one-year maintenance grant. Talk with me about the options, defend two of them, and settle a priority order with me.",
          promptTr:
            "Bir belediye bir yıllık bakım ödeneğini nasıl harcayacağına karar verecek. Seçenekleri benimle konuş, ikisini savun ve benimle bir öncelik sırası belirle.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: repairing the retaining walls, replacing street lighting, refurbishing two community halls, surveying the whole estate properly, and clearing the backlog of small repairs. Which two would you defend, and on what criterion?", tr: "Seçenekler: istinat duvarlarını onarmak, sokak aydınlatmasını yenilemek, iki toplum salonunu elden geçirmek, tüm varlıkları düzgün biçimde tespit etmek ve küçük onarım birikimini eritmek. Hangi ikisini savunursun, hangi ölçütle?" },
            { who: "you", hint: "İki seçenek seç ve ölçütünü açıkça adlandır.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you. A survey repairs nothing at all, and a one-year grant spent on paperwork is exactly what the public complains about. Is that not the worst possible use of the money?", tr: "Üsteleyeyim. Tespit çalışması hiçbir şeyi onarmıyor ve bir yıllık ödeneği evrak işine harcamak halkın tam da şikâyet ettiği şey. Bu paranın olabilecek en kötü kullanımı değil mi?" },
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
              "I would defend the retaining walls and the survey, on the criterion of irreversibility: a wall that fails takes the road with it, and a survey is what stops us making this choice blind again next year. Your objection is fair and I want to concede part of it: a survey spent as a full-estate exercise would indeed be paperwork. What I would defend is a targeted survey of the asset class we have no records for at all, which is a much smaller commitment. So: walls first, because failure there is not recoverable; the targeted survey second, because everything after this year depends on it; small repairs third, since they are the only item where delay reliably multiplies the cost. I would drop the halls this year and say plainly why, rather than promise them and quietly not deliver.",
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

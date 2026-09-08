import type { MockPaper } from "../types";

/**
 * C1 · Deneme 2 — "Expertise, Craft and Scale".
 *
 * Deneme 1 ile AYNI PLAN; konu ayrı. Birincisi bellek, dil ve kanıt
 * üzerineydi; bu ikincisi bir işin ölçeklendiğinde ne kaybettiği üzerine.
 * İkisi de C1'in asıl ölçtüğü şeyi taşıyor: bir metinde iddiayı, iddianın
 * çekincesini ve çekincenin gerekçesini ayırt etmek.
 *
 * TEK DİNLETME: Teil 2 ve Teil 3 bir kez dinletiliyor, ötekiler iki kez —
 * Deneme 1 ile aynı ayrım.
 *
 * C1 SINIRI: devrik yapı, yarma cümle, adlaştırma, ortaç öbeği, çekimserlik
 * belirteçleri, ince kayıt farkları.
 */
export const EN_C1_02: MockPaper = {
  id: "en-c1-02",
  course: "en",
  level: "C1",
  no: 2,
  theme: "Expertise, Craft and Scale",
  themeTr: "Uzmanlık, zanaat ve ölçek",
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
          id: "en-c1-02-l1",
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
              title: "The last workshop on the street",
              body: `Seldom has a trade disappeared as quietly as shoe repair. There was no closure announcement and no campaign; the shops simply {{1}} one by one over about fifteen years.

The usual explanation is price, and it is not wrong so much as {{2}}. A resole costs more than a cheap pair of shoes, which settles the matter for most buyers. What that account leaves out is that the cheap pair became cheap only after the repairers had already begun to close, so the causation runs partly the other way.

A second factor rarely {{3}} attention. Repair depends on a stock of knowledge that cannot be written down quickly, and the apprenticeships that carried it were the first thing to go when margins {{4}}.

Whether any of this could have been prevented is an open question. Several cities have tried subsidies, with results that can only be described as {{5}}. What does seem to work, on the limited evidence available, is nothing so grand: a low rent, a visible location and a queue that {{6}} people that the shop is used.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-02-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["closed off", "closed in", "closed down", "closed up"],
              answer: 2,
              explain:
                "`close down` bir işletmenin kalıcı olarak kapanmasını bildiren öbek fiil. `close off` bir alanı kapatmak, `close in` yaklaşmak, `close up` ise geçici olarak kepenk indirmek demektir; cümledeki on beş yıllık süreç kalıcı kapanışı gerektiriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["partial", "incomplete", "shortened", "restricted"],
              answer: 1,
              explain:
                "`not wrong so much as incomplete` yapısı bir düzeltme kuruyor: açıklama yanlış değil, eksik. `partial` taraflı anlamına da geldiği için burada bulanık; `shortened` ve `restricted` bir açıklamanın kapsamı için kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["attracts", "draws", "pulls", "gathers"],
              answer: 0,
              explain:
                "`attract attention` yerleşik bir eşdizim. `draw attention` de doğrudur ama genellikle `to` ile bir hedefe yönlendirir; burada hedef yok. `pull` ve `gather` bu adla kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["tightened", "narrowed", "compressed", "shrank"],
              answer: 1,
              explain:
                "`margins narrow` sektör dilinde yerleşik bir kalıptır: kâr payının daralması. `tighten` bütçe ya da kural için, `compress` fiziksel sıkışma için, `shrink` ise toplam büyüklük için kullanılır; `margins` ile en doğal eş `narrow`.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["mixed", "divided", "varied", "assorted"],
              answer: 0,
              explain:
                "`mixed results` sabit bir eşdizim: kimi olumlu kimi olumsuz sonuçlar. `divided` görüşler için, `varied` çeşitlilik için, `assorted` ise nesneler için kullanılır ve hiçbiri sonuç değerlendirmesinde bu kalıbı kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["convinces", "persuades", "assures", "reminds"],
              answer: 3,
              explain:
                "Nesne insanlar ve devamında `that` yan cümlesi var; anlam ise zaten bilinen bir şeyi yeniden akla getirmek: `reminds people that …`. `convince` ve `persuade` bir görüşü değiştirmeyi, `assure` ise güvence vermeyi bildirir.",
            },
          ],
        },
        {
          id: "en-c1-02-l2",
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
              title: "What a checklist cannot carry",
              body: `It is not the existence of a procedure {{7}} distinguishes a skilled practitioner from a careless one, but the ability to recognise the case in which the procedure does not apply.

This is why written protocols, {{8}} valuable, have limits that are structural rather than temporary. A protocol encodes the situations its authors anticipated; the situations they did not anticipate are precisely the ones {{9}} which judgement is required.

Nor is the remedy simply more detail. The longer a document becomes, the {{10}} likely it is to be consulted at the moment of need, and a procedure that is not consulted has no effect whatever on behaviour.

What experienced practitioners appear to acquire is not a longer list {{11}} a faster sense of when the list has stopped describing the room they are in.

That sense resists documentation, which is inconvenient for institutions and, arguably, the reason {{12}} apprenticeship has survived in fields where almost everything else has been standardised.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-02-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["that"],
              explain:
                "«It is not the existence of a procedure ___ distinguishes …» bir yarma cümle (cleft): vurgulanan öge öne çekilmiş ve geri kalanı `that` ile bağlanıyor. `which` bu yapıda olumsuz vurgulu ögeden sonra kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["however", "though", "although", "while"],
              explain:
                "«written protocols, ___ valuable, have limits» yapısında araya giren bir ödün öbeği var: değerli olmalarına rağmen. `however valuable` ya da `though valuable` bu işi görür; `because` anlamı tersine çevirirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["in"],
              explain:
                "«the ones ___ which judgement is required» yapısında ilgi zamirinden önce bir edat gerekiyor ve `require judgement in a situation` eşdizimi `in` ister. `for which` ya da `on which` bu adla doğal durmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["less"],
              explain:
                "«The longer a document becomes, the ___ likely it is …» ikili karşılaştırma yapısı (`the … the …`) ve anlam ters orantılı: uzadıkça danışılma ihtimali düşer. `less` bu düşüşü verir; `more` cümlenin devamındaki olumsuz sonuçla çelişirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["but"],
              explain:
                "`not X but Y` yapısı kuruluyor: daha uzun bir liste değil, daha hızlı bir sezgi. `but` bu karşıtlığı bağlar; `and` iki ögeyi eşitler ve `not` ile başlayan yapıyı tamamlamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["why", "that"],
              explain:
                "`the reason ___ apprenticeship has survived` yapısında boşluk bir ilgi bağlacı istiyor: `the reason why` ya da yalın `the reason that`. `for which` de doğrudur ama tek sözcük sınırı bunu dışlıyor.",
            },
          ],
        },
        {
          id: "en-c1-02-l3",
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
              title: "Standardisation",
              body: `Standardisation is the process by which a variable practice is replaced by a single agreed method, usually with a gain in {{13}} and a loss that is harder to name.

The gain is easy to measure. A standardised procedure can be taught quickly, audited cheaply, and compared across sites; without it, large organisations would be {{14}}.

The loss is a question of scale rather than principle. In a small workshop, {{15}} from the method is a judgement; in a chain of four hundred branches it is a compliance failure, and the two are treated identically by the audit.

Critics of over-standardisation are sometimes accused of {{16}}, as though any defence of local judgement were a wish to return to an imagined past. The better versions of the argument are more specific.

They hold that a standard should carry an explicit account of its own {{17}}: the conditions under which it applies. Where that account is missing, practitioners are left to infer it, and their inferences are {{18}} inconsistent.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-02-l3-13",
              no: 13,
              text: "PREDICT",
              accept: ["predictability"],
              explain:
                "`a gain in ___` yapısında edattan sonra bir ad gerekiyor ve kastedilen şey öngörülebilirlik. Kökten `predictable` sıfatı, ondan da `predictability` adı türetiliyor. `prediction` tekil bir kestirimi adlandırır, bir özelliği değil.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l3-14",
              no: 14,
              text: "GOVERN",
              accept: ["ungovernable"],
              explain:
                "«without it, large organisations would be ___» yapısında bir sıfat gerekiyor ve anlam olumsuz: yönetilemez olurlardı. Kökten `governable` sıfatı, ondan da `ungovernable` türetiliyor. Olumsuzluk eki olmadan cümle kendi koşuluyla çelişir.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l3-15",
              no: 15,
              text: "DEPART",
              accept: ["departure"],
              explain:
                "`___ from the method is a judgement` yapısında özne konumunda bir ad var: yöntemden sapma. `depart` fiilinin adı `departure`. Ulaç biçimi (`departing`) de dilbilgisel olurdu ama kökten türetme görevinde beklenen biçim addır ve devamındaki `it is a compliance failure` bir adı gösteriyor.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l3-16",
              no: 16,
              text: "SENTIMENT",
              accept: ["sentimentality"],
              explain:
                "`accused of ___` yapısında edattan sonra bir ad gerekiyor ve suçlama duygusallık: kökten `sentimental` sıfatı, ondan da `sentimentality` adı türetiliyor. Devamındaki «a wish to return to an imagined past» bu adı açıklıyor; `sentiment` tek bir görüşü adlandırır, bir eğilimi değil.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l3-17",
              no: 17,
              text: "APPLY",
              accept: ["applicability"],
              explain:
                "«an explicit account of its own ___: the conditions under which it applies» — iki nokta üst üsteden sonrası boşluğu tanımlıyor: uygulanabilirlik alanı. Kökten `applicable` sıfatı, ondan da `applicability` adı türetiliyor. `application` bir uygulamayı adlandırır, kapsamı değil.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l3-18",
              no: 18,
              text: "PREDICT",
              accept: ["predictably"],
              explain:
                "«their inferences are ___ inconsistent» yapısında boşluk sıfatı niteliyor, yani bir belirteç gerekiyor: `predictably inconsistent` — tutarsızlıkları şaşırtıcı değil. Aynı kök 13. maddede ad olarak istenmişti; burada belirteç isteniyor ve fark cümledeki konumdan çıkıyor.",
            },
          ],
        },
        {
          id: "en-c1-02-l4",
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
              id: "en-c1-02-l4-19",
              no: 19,
              text: "They did not tell us about the change until the last minute.\nWe ______ about the change until the last minute.",
              cue: "INFORMED",
              accept: ["were not informed", "had not been informed"],
              explain:
                "Etken ve olumsuz bir cümle («They did not tell us»), edilgen olumsuza çevriliyor. Anahtar sözcük `informed` edilgen ortaç; olumsuzluk yardımcı fiile taşınıyor: «were not informed». Geçmiş öncesi okuma da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l4-20",
              no: 20,
              text: "It is possible that she missed the announcement.\nShe ______ the announcement.",
              cue: "MAY",
              accept: ["may have missed", "may well have missed"],
              explain:
                "Geçmişe dair olasılık kip fiiliyle kuruluyor: «may have missed». Anahtar sözcük `may` değişmeden kalıyor ve `have + üçüncü hâl` geçmişe gönderiyor. `may miss` şimdiki ya da gelecekteki bir olasılığı anlatırdı.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l4-21",
              no: 21,
              text: "The report is so detailed that few people read it in full.\nIt is ______ that few people read it in full.",
              cue: "SUCH",
              accept: ["such a detailed report"],
              explain:
                "`so + sıfat + that` yapısı, `such + a + sıfat + ad + that` yapısına çevriliyor. Anahtar sözcük `such` belirsiz tanımlıktan önce gelir ve arkasından ad öbeği gelmek zorundadır; `so detailed a report` da doğrudur ama anahtar sözcük `such` olduğu için o biçim kullanılamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-02-l4-22",
              no: 22,
              text: "She only understood the problem after the meeting.\nIt ______ after the meeting that she understood the problem.",
              cue: "NOT",
              accept: ["was not until", "was only not until"],
              explain:
                "Yarma cümle kuruluyor: «It was not until after the meeting that …». Anahtar sözcük `not` bu kalıbın parçası ve vurgulanan öge zaman; `only` ile kurulan özgün cümlenin anlamı aynen korunuyor.",
            },
          ],
        },
        {
          id: "en-c1-02-l5",
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
              title: "Against the word scalable",
              body: `The word has become an unquestioned compliment. A practice that scales is admired; one that does not is described, with a faint note of pity, as artisanal. I want to argue that the compliment conceals a category error, and that the error has costs we are only now beginning to count.

The tendency of the word is to flatten exactly this difference. Scaling is not neutral with respect to what is being scaled. Some activities lose nothing when repeated a thousand times: the manufacture of a bolt, the sorting of a parcel. Others lose the thing that made them worth doing, and the loss is not a failure of execution but a property of the activity itself. Teaching is the obvious case. So, less obviously, is diagnosis.

It is precisely this distinction that the vocabulary of scale erases. When we ask whether a practice can be scaled, we are asking an engineering question about a matter that is often not an engineering matter at all, and the framing tends to produce the answer it assumes.

I should be careful here, because the counter-argument is strong and I have no wish to caricature it. A method that helps ten people is, on any reasonable view, worth less than one that helps ten thousand, and appeals to craft have historically been used to defend arrangements that were merely comfortable for the practitioner. Anyone who has watched a profession resist an obvious improvement will recognise the pattern.

My reply is not that scale is bad but that the question is asked in the wrong order. We currently ask what can be scaled and then decide what to value. The better sequence asks what is worth preserving and then, and only then, how much of it can be delivered at volume. That ordering would not settle every case, but it would at least stop us from redefining the goal to fit the method.

Whether any institution will adopt it is another matter. Sequencing of this kind is expensive to defend and impossible to put on a chart, which is, arguably, why it is so rarely proposed.`,
              gloss: [
                { de: "artisanal", tr: "zanaat işi", en: "artisanal" },
                { de: "a category error", tr: "kategori hatası", en: "category error" },
                { de: "to caricature", tr: "çarpıtarak sunmak", en: "to caricature" },
                { de: "at volume", tr: "büyük ölçekte", en: "at volume" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-02-l5-23",
              no: 23,
              text: "What distinction does the writer draw in the second paragraph?",
              options: [
                "Between activities that survive repetition and those that do not",
                "Between activities that are profitable at scale and those that never will be",
                "Between manual work and work requiring formal qualifications",
                "Between practices that are old and those that are recent",
              ],
              answer: 0,
              explain:
                "Metin iki grubu adlandırıyor: cıvata üretimi ve koli ayırma tekrarla hiçbir şey kaybetmiyor; öğretim ve tanı ise «lose the thing that made them worth doing». Ayrım kârlılık, nitelik ya da eskilik üzerinden kurulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l5-24",
              no: 24,
              text: "What does the writer say about the framing of the question?",
              options: [
                "It is too technical for most decision-makers to follow",
                "It has been imposed by the institutions that pay for most of the work",
                "It treats a non-engineering matter as an engineering one",
                "It was reasonable when it was first introduced",
              ],
              answer: 2,
              explain:
                "Metin çerçevelemenin kusurunu tanımlıyor: «we are asking an engineering question about a matter that is often not an engineering matter at all» ve çerçeveleme varsaydığı cevabı üretiyor. Fon ya da anlaşılırlık metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l5-25",
              no: 25,
              text: "Why does the writer set out the counter-argument at length?",
              options: [
                "To show that it has recently been abandoned",
                "To concede that it has genuine force before replying",
                "To demonstrate that it rests on a misunderstanding",
                "To attribute it to a particular group of critics",
              ],
              answer: 1,
              explain:
                "Yazar niyetini açıkça söylüyor: «the counter-argument is strong and I have no wish to caricature it», ardından zanaat savunusunun tarihsel kötüye kullanımını da kabul ediyor. Sonra «My reply is …» ile cevabına geçiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-l5-26",
              no: 26,
              text: "What does the writer expect will happen to their proposal?",
              options: [
                "It will be adopted once the costs are better understood",
                "It will be rejected by practitioners rather than institutions",
                "It will be tested in a small number of organisations first",
                "It will rarely be proposed, because it is hard to defend",
              ],
              answer: 3,
              explain:
                "Son paragraf beklentiyi veriyor: bu tür bir sıralama «expensive to defend and impossible to put on a chart, which is, arguably, why it is so rarely proposed». Benimsenme ya da pilot uygulama beklentisi yok.",
            },
          ],
        },
        {
          id: "en-c1-02-l6",
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
              body: "The defence of craft is almost always made by people who already hold a position within it. I do not say that makes it wrong, but it should make us ask who is not in the conversation: the ten thousand people who never got near the practice because it was rationed by apprenticeship.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "My position has moved. Five years ago I would have said that anything of value can eventually be codified, and I argued it in print. Watching two colleagues train new staff has convinced me that some of what they transmit is not a rule at all, and I no longer think the difficulty is temporary.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Both sides in this argument treat scale as a single thing. It is not. Scaling a diagnosis to more patients is a wholly different operation from scaling it to more conditions, and almost every disagreement I have read collapses once that separation is made.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "The economics are usually left out. A practice survives at small scale only where somebody absorbs the cost, and historically that somebody has been the practitioner, working unpaid hours. Any defence of craft that does not say who pays is not an argument, it is a preference.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "We already know how this ends, because it has happened in four other fields within living memory. What is remarkable is not the outcome but the confidence with which each field believed itself to be the exception, and the speed with which that belief evaporated.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-02-l6-27",
              no: 27,
              text: "Which writer says that the disagreement rests on a failure to separate two different things?",
              answer: "c",
              explain:
                "Yazar C ayrımı kendisi kuruyor: hastaya ölçeklemek ile duruma ölçeklemek farklı işler ve «almost every disagreement I have read collapses once that separation is made». Tartışma bir ayrım yapılmadığı için sürüyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l6-28",
              no: 28,
              text: "Which writer reports having abandoned a position they once defended publicly?",
              answer: "b",
              explain:
                "Yazar B eski konumunu ve onu savunduğu yeri söylüyor: «Five years ago I would have said … and I argued it in print», sonra fikrinin değiştiğini ve zorluğun geçici olmadığını ekliyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l6-29",
              no: 29,
              text: "Which writer questions who is absent from the debate rather than what is said in it?",
              answer: "a",
              explain:
                "Yazar A iddiayı çürütmüyor, konuşanların konumunu sorguluyor: «it should make us ask who is not in the conversation», çıraklık yüzünden mesleğe hiç yaklaşamamış on bin kişiyi anıyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l6-30",
              no: 30,
              text: "Which writer says that a case is incomplete unless it identifies who bears the cost?",
              answer: "d",
              explain:
                "Yazar D koşulu açıkça koyuyor: «Any defence of craft that does not say who pays is not an argument, it is a preference». Maliyeti kimin üstlendiği söylenmedikçe savunma eksik sayılıyor.",
            },
          ],
        },
        {
          id: "en-c1-02-l7",
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
              title: "The examiner who could not explain",
              body: `In the nineteen-eighties a research team set out to capture what expert radiologists were doing when they read a scan. The plan was straightforward: interview the best of them, write down the rules, teach the rules to everyone else.

{{31}}

The failure was not one of articulacy. These were fluent, reflective people who could talk for an hour about any individual case. What defeated them was a request to describe the general procedure, which several of them denied having.

{{32}}

Later work made the picture more precise. When the same experts were shown cases in which the usual cues had been deliberately removed, their performance fell to that of a competent beginner, which suggests that the knowledge is bound to the cues rather than held apart from them.

{{33}}

This has an uncomfortable implication for training. If the knowledge cannot be separated from the cases, then the only reliable way to transmit it is to expose learners to a very large number of cases, which is expensive and slow.

{{34}}

None of this shows that the original project was misconceived. It shows that the object it was hunting was a different shape from the one it expected, and that is a more useful conclusion than failure.`,
              gloss: [
                { de: "articulacy", tr: "kendini ifade edebilme", en: "articulacy" },
                { de: "a cue", tr: "ipucu, işaret", en: "cue" },
                { de: "misconceived", tr: "yanlış tasarlanmış", en: "misconceived" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Three years later the team had a substantial body of transcripts and no rules worth teaching. The experts had answered every question willingly, and the answers had not added up to a procedure.",
            },
            {
              key: "b",
              label: "b",
              body: "It is worth pausing on that denial, because it is easy to read as modesty and almost certainly was not. Asked to say how they had reached a judgement, several replied that the judgement had arrived before any reasoning they could report.",
            },
            {
              key: "c",
              label: "c",
              body: "Attempts to shorten that exposure with simulated cases have had modest results, and the reason appears to be that simulations reproduce the cues the designers already understood.",
            },
            {
              key: "d",
              label: "d",
              body: "The equipment available at the time produced images at a resolution that would be considered inadequate for clinical use today.",
            },
            {
              key: "e",
              label: "e",
              body: "That finding also explains an oddity in the earlier transcripts, in which experts frequently mentioned features of the image that they did not treat as reasons.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-02-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Boşluktan önce plan anlatılıyor: görüş, kural, öğretim. (a) o planın sonucunu veriyor: üç yıl sonra tutanaklar var, öğretilecek kural yok. Devamındaki «The failure was not one of articulacy» da bu başarısızlığa geri gönderme yapıyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "b",
              explain:
                "Önceki paragraf uzmanların genel bir yordamı olduğunu inkâr ettiğini söylüyor; (b) «It is worth pausing on that denial» ile o inkâra geri gönderme yapıp yorumluyor. Gönderme öğesi doğrudan bağlanıyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "e",
              explain:
                "Önceki paragraf bilginin ipuçlarına bağlı olduğu bulgusunu veriyor; (e) «That finding also explains an oddity in the earlier transcripts» ile o bulguya geri gönderme yapıp daha önce anlatılan tutanaklarla bağ kuruyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "c",
              explain:
                "Önceki paragraf «the only reliable way to transmit it is to expose learners to a very large number of cases, which is expensive and slow» diyor; (c) bu maruziyeti kısaltma denemelerini ve neden sınırlı kaldığını anlatıyor. (d) dönemin görüntü çözünürlüğünden söz ediyor ve metnin hiçbir yerinde cihaz kalitesi tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-02-l8",
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
              label: "a — Master baker",
              body: "People ask for the recipe and I give it to them, and it does not help, which used to embarrass me. The recipe is accurate. What it cannot carry is the twenty small corrections you make on a humid morning, and those corrections are the trade. I have stopped apologising for that and started teaching mornings instead.",
            },
            {
              key: "b",
              label: "b — Operations director",
              body: "We standardised eleven processes last year and nine of them were straightforwardly better. The two that were not are the ones I think about: in both cases we removed a step that looked redundant and was in fact where an experienced person noticed something. We have put those steps back, which cost us more than leaving them would have.",
            },
            {
              key: "c",
              label: "c — Nurse educator",
              body: "The literature says exposure to cases is what builds judgement, and I do not dispute it. My difficulty is practical: a student on a ward sees whatever comes through the door that fortnight, and nobody is arranging for them to see the rare presentation. We call it experience and treat it as though it were curriculum.",
            },
            {
              key: "d",
              label: "d — Software architect",
              body: "Every few years somebody announces that our work has been automated, and every few years the announcement turns out to describe the part we found least interesting. I do not say this smugly. It is entirely possible that the next one is different, and I notice that I have no way of telling from inside.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-02-l8-35",
              no: 35,
              text: "Which text describes a change that turned out to be more expensive than doing nothing?",
              answer: "b",
              explain:
                "Operasyon müdürü geri alma maliyetini söylüyor: adımlar geri konmuş ve «which cost us more than leaving them would have». Yani değişiklik, hiç yapmamaktan pahalıya patlamış.",
            },
            {
              kind: "match",
              id: "en-c1-02-l8-36",
              no: 36,
              text: "Which text says the writer cannot judge their own situation reliably?",
              answer: "d",
              explain:
                "Yazılım mimarı kendi konumunun sınırını kabul ediyor: «I notice that I have no way of telling from inside». Kendi durumunu içeriden değerlendiremediğini açıkça söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l8-37",
              no: 37,
              text: "Which text says that an accurate description of the work fails to transmit it?",
              answer: "a",
              explain:
                "Fırıncı tarifin doğru olduğunu söylüyor ama aktarmadığını ekliyor: «The recipe is accurate. What it cannot carry is the twenty small corrections …». Doğruluk ile aktarılabilirlik ayrılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-02-l8-38",
              no: 38,
              text: "Which text accepts a claim from research but objects to how it is applied?",
              answer: "c",
              explain:
                "Hemşirelik eğitmeni literatürü kabul ediyor («I do not dispute it») ve itirazını uygulamaya yöneltiyor: nadir vakayı görmesi kimse tarafından ayarlanmıyor, «We call it experience and treat it as though it were curriculum».",
            },
            {
              kind: "match",
              id: "en-c1-02-l8-39",
              no: 39,
              text: "Which text mentions a reaction the writer has since given up?",
              answer: "a",
              explain:
                "Fırıncı eski tepkisini ve bıraktığını söylüyor: tarifin işe yaramaması «used to embarrass me» ve «I have stopped apologising for that». Vazgeçilen şey utanç ve özür.",
            },
            {
              kind: "match",
              id: "en-c1-02-l8-40",
              no: 40,
              text: "Which text says a repeated prediction has always concerned the least valued part of the work?",
              answer: "d",
              explain:
                "Yazılım mimarı tekrarlanan duyuruyu anlatıyor: her seferinde «the announcement turns out to describe the part we found least interesting». Tahmin hep işin en az değer verilen kısmını kapsıyor.",
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
        "This part has four tasks. Note that in tasks two and three you hear the recording ONCE only.",
      instructionTr:
        "Bu bölümde dört görev var. İkinci ve üçüncü görevde kaydı YALNIZ BİR KEZ dinleyeceksin.",
      tasks: [
        {
          id: "en-c1-02-h1",
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
              situation: "İki eğitmen bir çıraklık programını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Marta", text: "The programme works, and I say that as someone who spent two years arguing against it. What I still cannot defend is who gets in." },
                { speaker: "Sami", text: "The selection is not ours, though. We take who the employers send." },
                { speaker: "Marta", text: "Which is precisely the objection, not an answer to it. If we accept a pipeline we did not design, we inherit whatever it filters out, and we should at least say so in the report." },
                { speaker: "Sami", text: "I would go along with saying so. I would resist the next step, which is to make the programme responsible for fixing recruitment across an entire industry." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir mühendis otomasyon üzerine konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You have said the automation debate is conducted at the wrong level of detail. What do you mean?" },
                { speaker: "Engineer", text: "People argue about whole occupations. A job is not a unit; it is a bundle of perhaps forty tasks, and automation takes them one at a time. Once you look at tasks the argument becomes tractable and, I admit, a good deal less exciting." },
                { speaker: "Host", text: "Does that make you optimistic?" },
                { speaker: "Engineer", text: "It makes me specific, which is not the same thing. The task-level view tells you that some people will keep a job whose content has changed entirely, and nobody has a good word for that experience, let alone a policy for it." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi ölçme sorunlarından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "A measure that is easy to collect will, over time, drive out one that is hard to collect, regardless of which is more informative. This is not a claim about bad faith; it is a claim about what survives in an institution." },
                { speaker: "Lecturer", text: "The practical consequence is that you should be suspicious of any indicator that has been stable for a decade. Either the world has stopped moving, which is unlikely, or the indicator has quietly stopped tracking it." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-02-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Marta's position on the programme?",
              options: ["She still opposes it after the argument of the last two years", "She accepts that it works but objects to its intake", "She wants the employers to run the selection"],
              answer: 1,
              explain:
                "Marta işe yaradığını kabul ediyor ve eski karşıtlığını da söylüyor; itirazı başka: «What I still cannot defend is who gets in». Seçimi işverene bırakmayı savunmuyor, tersine onu sorun sayıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h1-2",
              no: 2,
              ref: "a1",
              text: "Where does Sami draw a line?",
              options: ["At making the programme fix industry recruitment", "At acknowledging the problem in the written report", "At continuing to accept employer selection"],
              answer: 0,
              explain:
                "Sami ilk adımı kabul ediyor («I would go along with saying so») ve sınırı ikinci adıma çekiyor: programı bütün bir sektörün işe alımını düzeltmekle sorumlu tutmak.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h1-3",
              no: 3,
              ref: "a2",
              text: "What is the engineer's objection to the usual debate?",
              options: ["It relies on data that is several years out of date", "It ignores the cost of new equipment", "It treats an occupation as a single unit"],
              answer: 2,
              explain:
                "Mühendis birimi düzeltiyor: «A job is not a unit; it is a bundle of perhaps forty tasks». Tartışma meslekler üzerinden yürüyor, oysa otomasyon görevleri tek tek alıyor. Veri ya da maliyet kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h1-4",
              no: 4,
              ref: "a2",
              text: "How does he answer the question about optimism?",
              options: ["By saying the outlook is worse than reported", "By distinguishing specificity from optimism", "By declining to answer a speculative question"],
              answer: 1,
              explain:
                "Mühendis iki şeyi ayırıyor: «It makes me specific, which is not the same thing». Ardından iyimserlik değil, karşılığı olmayan bir deneyimi adlandırıyor: içeriği tümüyle değişmiş bir işi sürdürmek.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the lecturer say about easy measures?",
              options: ["They are usually collected dishonestly", "They are more accurate than most people assume", "They displace better ones over time"],
              answer: 2,
              explain:
                "İddia şu: «A measure that is easy to collect will, over time, drive out one that is hard to collect». Öğretim üyesi bunun kötü niyetle ilgili olmadığını da açıkça söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h1-6",
              no: 6,
              ref: "a3",
              text: "Why should a stable indicator arouse suspicion?",
              options: ["Because it may have stopped following what it measures", "Because stability of this kind is rarely reported honestly", "Because indicators are replaced every decade"],
              answer: 0,
              explain:
                "İki olasılık sunuluyor ve biri elenerek öteki bırakılıyor: dünya durmuş olmalı, «which is unlikely, or the indicator has quietly stopped tracking it». Yani göstergenin ölçtüğü şeyi izlemeyi bırakmış olması.",
            },
          ],
        },
        {
          id: "en-c1-02-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a craft training scheme. Complete the sentences, questions 7 to 14, with a word or a short phrase. You hear the talk ONCE only.",
          promptTr:
            "Bir zanaat eğitimi programı üzerine sunum dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir zanaat eğitimi programının sorumlusu değerlendirme raporunu sunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Thank you for coming. This is the five-year evaluation and I want to give you the awkward numbers first. We trained one hundred and twelve people. Of those, sixty-one are still working in the trade, which is a retention rate we are pleased with and which is, I should say, well above the sector average of about a third. The cost is where it becomes difficult: nine thousand pounds per completed placement, and that figure has risen every year. The single largest item is not tuition, as most people assume, but the time of the master craftspeople, who cannot produce while they teach. Now, three findings. First, the drop-out point is remarkably consistent: month four, almost every time, and it coincides with the move from exercises to real commissions. Second, the trainees who stay are not the ones with the best entry scores; the correlation is close to zero, and we have stopped using the test. Third, and this surprised us, mixed-age cohorts outperformed same-age cohorts on every measure we tried. We do not know why, and I would rather say that than offer you a story.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentence completion",
              genreTr: "Cümle tamamlama",
              title: "Craft training scheme — five-year evaluation",
              body: `The scheme has trained {{7}} people.

Of those, {{8}} are still working in the trade.

The sector average retention rate is about {{9}}.

The cost per completed placement is {{10}} pounds.

The largest single cost is the time of the {{11}}.

Trainees usually drop out in month {{12}}.

The entry test has been abandoned because the correlation was close to {{13}}.

{{14}} cohorts did better on every measure.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-02-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["112", "one hundred and twelve"],
              explain:
                "«We trained one hundred and twelve people» — toplam eğitilen sayı. Altmış bir hâlâ çalışan sayısı; iki sayı arka arkaya geçiyor ve cümle tamamlama toplamı soruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["61", "sixty-one", "sixty one"],
              explain:
                "«sixty-one are still working in the trade» — meslekte kalan sayı. Bu sayı aynı zamanda konuşmacının memnun olduğu tutunma oranının payını veriyor.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["a third", "one third", "1/3", "33%"],
              explain:
                "«well above the sector average of about a third» — sektör ortalaması yaklaşık üçte bir. Program bunun belirgin biçimde üstünde; karşılaştırma noktası bu oran.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["9000", "9,000", "nine thousand"],
              explain:
                "«nine thousand pounds per completed placement» — tamamlanan yerleştirme başına maliyet. Konuşmacı bu rakamın her yıl arttığını da ekliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["master craftspeople", "craftspeople", "masters"],
              explain:
                "Beklenti eleniyor: «not tuition, as most people assume, but the time of the master craftspeople, who cannot produce while they teach». Öğretim ücretini yazan öğrenci cümlenin ilk yarısında durmuş olur.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["4", "four"],
              explain:
                "«the drop-out point is remarkably consistent: month four, almost every time» — ayrılma noktası dördüncü ay ve alıştırmalardan gerçek işlere geçişle çakışıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["zero", "0"],
              explain:
                "«the correlation is close to zero, and we have stopped using the test» — giriş sınavı bırakılmış çünkü kalanlarla puanlar arasında bağ yok. Sayı burada bir ölçümün kendisi, bir miktar değil.",
            },
            {
              kind: "gap",
              id: "en-c1-02-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["mixed-age", "mixed age", "mixed"],
              explain:
                "«mixed-age cohorts outperformed same-age cohorts on every measure we tried» — karma yaşlı gruplar üstün çıkmış. Konuşmacı sebebini bilmediğini de açıkça söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-02-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about standardising professional work. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Mesleki işin standartlaştırılması üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir panelde üç konuşmacı mesleki işin standartlaştırılmasını tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Hana, you have written that professional resistance to standardisation is usually misdiagnosed. In what way?" },
                { speaker: "Hana", text: "It is read as status defence, and sometimes that is exactly what it is. But in the cases I have studied, the resistance clusters around a small number of steps, and those steps almost always turn out to be the ones where the practitioner is absorbing variation that the standard does not see." },
                { speaker: "Chair", text: "Ruben, you design these systems. Is that recognisable?" },
                { speaker: "Ruben", text: "Recognisable and, I would add, predictable. We can usually tell in advance which steps will be defended, and we very rarely act on that knowledge, because the project is judged on how much has been standardised rather than on what happened afterwards." },
                { speaker: "Chair", text: "So the measurement drives the design?" },
                { speaker: "Ruben", text: "It does, and I want to be careful not to sound as though I am blaming a spreadsheet. Somebody chose that measure, and the choice was reasonable at the time; what is unreasonable is that nobody revisits it." },
                { speaker: "Chair", text: "Ella, from a union perspective?" },
                { speaker: "Ella", text: "I agree with almost all of that, and I want to add the part that usually goes missing. When a step is removed, the variation does not disappear; it moves. Usually it moves onto whoever is least able to refuse it, which in every workplace I know is the newest and the least secure." },
                { speaker: "Hana", text: "That matches my data, and it complicates my own argument, because it means resistance from senior staff can be genuine and self-interested at the same time." },
                { speaker: "Ella", text: "I would put it more strongly. Those two things are not in tension. A person can be defending the work and their position with the same sentence, and demanding that they choose is a rhetorical trick." },
                { speaker: "Chair", text: "One recommendation each." },
                { speaker: "Ruben", text: "Measure what happened six months later, not how much was standardised." },
                { speaker: "Ella", text: "Ask who absorbs the variation, and put the answer in the proposal." },
                { speaker: "Hana", text: "Mine is duller. Publish the cases where standardisation was tried and reversed. At present those disappear, and every organisation learns the same lesson from scratch." },
              ],
              gloss: [
                { de: "to misdiagnose", tr: "yanlış teşhis koymak", en: "to misdiagnose" },
                { de: "to absorb variation", tr: "değişkenliği soğurmak", en: "to absorb variation" },
                { de: "a rhetorical trick", tr: "söz oyunu", en: "rhetorical trick" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-02-h3-15",
              no: 15,
              ref: "c1",
              text: "How does Hana characterise professional resistance?",
              options: [
                "As always a defence of status",
                "As never a defence of status",
                "As concentrated on steps that absorb hidden variation",
                "As a reaction to the speed at which the change was introduced",
              ],
              answer: 2,
              explain:
                "Hana statü savunusu okumasını tümüyle reddetmiyor («sometimes that is exactly what it is») ama örüntüyü başka yerde buluyor: direniş, uygulayıcının standardın görmediği değişkenliği soğurduğu adımlarda yoğunlaşıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-16",
              no: 16,
              ref: "c1",
              text: "What does Ruben admit about his own field?",
              options: [
                "The predictions are usually wrong",
                "The knowledge exists but is not acted on",
                "The systems are designed too quickly",
                "The practitioners are rarely consulted before the design is fixed",
              ],
              answer: 1,
              explain:
                "Ruben hangi adımların savunulacağını önceden bilebildiklerini söylüyor ve «we very rarely act on that knowledge» diye ekliyor. Bilgi var, kullanılmıyor; sebebi de projenin neye göre değerlendirildiği.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Ruben say about the measure that drives design?",
              options: [
                "It was a poor choice from the beginning",
                "It was defensible once but is never reviewed",
                "It was imposed by people outside the profession",
                "It should be replaced by a financial measure",
              ],
              answer: 1,
              explain:
                "Ruben ölçütü savunuyor ve sorunu başka yere koyuyor: «the choice was reasonable at the time; what is unreasonable is that nobody revisits it». Kötü seçim değil, gözden geçirilmeyen seçim.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-18",
              no: 18,
              ref: "c1",
              text: "What does Ella add to the discussion?",
              options: [
                "That removing a step transfers variation to weaker staff",
                "That variation disappears once a step is removed",
                "That unions have opposed standardisation consistently",
                "That new staff adapt more easily than senior staff",
              ],
              answer: 0,
              explain:
                "Ella eksik parçayı adlandırıyor: «the variation does not disappear; it moves», ve kime taşındığını söylüyor — reddetmesi en zor olana, yani en yeni ve en güvencesiz olana.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-19",
              no: 19,
              ref: "c1",
              text: "Why does Hana say Ella's point complicates her own argument?",
              options: [
                "Because it contradicts her data",
                "Because it means resistance can be principled and self-interested at once",
                "Because it suggests her cases were badly chosen",
                "Because it moves the discussion away from the evidence she has gathered",
              ],
              answer: 1,
              explain:
                "Hana verisiyle uyuştuğunu söylüyor ama sonucu güç buluyor: kıdemli personelin direnişi «genuine and self-interested at the same time» olabiliyor. Verinin çelişmesi değil, yorumun ikiye ayrılamaması.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-20",
              no: 20,
              ref: "c1",
              text: "How does Ella respond to that difficulty?",
              options: [
                "She accepts that the two motives must be separated",
                "She argues that self-interest is the stronger motive",
                "She denies that senior staff resist at all",
                "She rejects the demand that the two be separated",
              ],
              answer: 3,
              explain:
                "Ella daha güçlü bir konum alıyor: «Those two things are not in tension» ve seçim yapılmasını istemeyi «a rhetorical trick» diye niteliyor. Yani ayrıştırma talebini reddediyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-21",
              no: 21,
              ref: "c1",
              text: "What is Ruben's recommendation?",
              options: [
                "To measure outcomes some months after the change",
                "To standardise fewer processes each year",
                "To involve practitioners in the design stage",
                "To publish the full cost of each standardisation programme",
              ],
              answer: 0,
              explain:
                "Ruben ölçütü değiştirmeyi öneriyor: «Measure what happened six months later, not how much was standardised». Katılım ya da maliyet yayımı onun önerisi değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-02-h3-22",
              no: 22,
              ref: "c1",
              text: "Why does Hana call her own recommendation \"duller\"?",
              options: [
                "Because it repeats what the others have said",
                "Because it concerns record-keeping rather than practice",
                "Because she doubts that anyone will act on it",
                "Because it applies only to her own field",
              ],
              answer: 1,
              explain:
                "Hana'nın önerisi geri alınmış standartlaştırma vakalarının yayımlanması, yani bir kayıt tutma meselesi. Gerekçesi de kayıt olmadığında her kurumun aynı dersi sıfırdan öğrenmesi; kendi alanıyla sınırlamıyor.",
            },
          ],
        },
        {
          id: "en-c1-02-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about a working practice. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Bir çalışma pratiği hakkında sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to concede a point they once disputed" },
            { key: "b", label: "to distinguish two problems that are usually merged" },
            { key: "c", label: "to explain why a solution was abandoned" },
            { key: "d", label: "to warn that a measure will be gamed" },
            { key: "e", label: "to credit a change to someone else" },
            { key: "f", label: "to reject an analogy being used in the debate" },
            { key: "g", label: "to describe a cost that is not recorded anywhere" },
            { key: "h", label: "to ask for the decision to be delayed" },
            { key: "i", label: "to defend a colleague who has been criticised" },
            { key: "j", label: "to point out that the evidence is too thin to act on" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "For three years I said the handover time was wasted and I was wrong. Reading the incident log properly, six of the eleven near misses were caught in exactly that fifteen minutes, and I should have looked before I argued." }],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "The moment you count completed forms, you will get completed forms. I am not predicting dishonesty; I am predicting that the easiest way to raise the number will be found, and it will not be the way you had in mind." }],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "People keep saying this is like the print industry in the eighties. It is not. There the skill sat in a machine that could be replaced; here it sits in a relationship with a client, and nobody has yet replaced one of those." }],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "Two questions are being run together. One is whether the work can be described. The other is whether it can be transferred by a description. They have different answers, and treating them as one is why this discussion goes round in circles." }],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "We ran the shadowing scheme for two years and then stopped, and I want the reason on the record: it worked, but it required two people to be free at the same time, and after the restructure that was never true again." }],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "The redesign is being attributed to the management team, and I was in those meetings. The structure we adopted was proposed by a technician in the second week and dismissed. She raised it again in month five and that is the version we use." }],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "Nothing appears in the budget for the hour a senior nurse spends each shift explaining what the guidance means in the particular case in front of them. It is real work, it is done, and no line anywhere records it." }],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı bir çalışma pratiğinden söz ediyor.",
              plays: 2,
              segments: [{ text: "I have read the pilot report twice. It covers one site, eleven weeks and no comparison group. It may well be pointing in the right direction, but it cannot bear the weight of a national rollout, and saying so is not obstruction." }],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-02-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı eski konumunu geri alıyor: «For three years I said the handover time was wasted and I was wrong» ve kanıtı veriyor — on bir ramak kalanın altısı o on beş dakikada yakalanmış.",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "d",
              explain:
                "Konuşmacı ölçütün oyuna geleceğini önceden söylüyor ve niyeti de ayırıyor: «I am not predicting dishonesty; I am predicting that the easiest way to raise the number will be found».",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "f",
              explain:
                "Konuşmacı tartışmada kullanılan benzetmeyi reddediyor: «People keep saying this is like the print industry in the eighties. It is not» ve farkı adlandırıyor — beceri makinede değil ilişkide.",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "b",
              explain:
                "Konuşmacı iki soruyu ayırıyor: iş tarif edilebilir mi, ve tarifle aktarılabilir mi. «They have different answers, and treating them as one is why this discussion goes round in circles».",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "c",
              explain:
                "Konuşmacı bırakılma sebebini kayda geçirmek istiyor: «it worked, but it required two people to be free at the same time», ve yeniden yapılanmadan sonra bu koşul bir daha hiç sağlanmamış.",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "e",
              explain:
                "Konuşmacı yeniden tasarımın yanlış kişiye atfedildiğini söyleyip asıl sahibini veriyor: «The structure we adopted was proposed by a technician in the second week and dismissed». Aynı kişi beşinci ayda konuyu yeniden açmış ve kullanılan sürüm o olmuş.",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "g",
              explain:
                "Konuşmacı hiçbir yerde kaydedilmeyen bir emeği anlatıyor: kıdemli hemşirenin her vardiyada rehberliği vakaya tercüme etmeye ayırdığı saat. «no line anywhere records it».",
            },
            {
              kind: "match",
              id: "en-c1-02-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "j",
              explain:
                "Konuşmacı pilot raporun kapsamını sayıyor (tek saha, on bir hafta, karşılaştırma grubu yok) ve sonucu veriyor: «it cannot bear the weight of a national rollout». Yönü reddetmiyor, kanıtın yükü kaldıramayacağını söylüyor.",
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
          id: "en-c1-02-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on training and expertise. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. Written procedures allow a skill to be taught to many people quickly.\n2. Some parts of a skill are learned only by working alongside an experienced person.\n\nWrite 220 to 260 words.",
          promptTr:
            "Eğitim ve uzmanlık üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Yazılı yordamlar bir beceriyi çok kişiye hızla öğretmeyi sağlar.\n2. Bir becerinin bazı parçaları ancak deneyimli biriyle çalışarak öğrenilir.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two points raised in the seminar are not straightforwardly opposed, and the difficulty lies in deciding which one a training system should be built around.

The case for written procedure is a case about reach. A documented method can be taught in a classroom, audited afterwards and revised centrally when it turns out to be wrong. Against the alternative, which depends on the availability of an experienced person, this is an enormous practical advantage, and it is worth adding that apprenticeship has historically rationed entry to a trade as effectively as any examination.

The second point concerns what a document can hold. The claim is not that procedures are inaccurate but that they describe the anticipated case, and that the judgement worth having is exercised precisely where the description stops applying. On this account, working alongside someone is not a slower version of reading; it is the only exposure to unanticipated cases that a learner reliably gets.

I regard the second as the more important of the two, though for a narrower reason than is usually offered. Procedures can be improved indefinitely and their limits are visible; what cannot be recovered, once a generation of practitioners has gone, is the stock of cases in their heads.

My own view is that the choice is a false one imposed by budgeting. The interesting design question is not which to adopt but which parts of a skill belong on paper, and nobody appears to be asking it in that order.`,
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
          id: "en-c1-02-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to standardise a process that experienced staff carry out differently. Write a report for its management. Describe what is currently done, assess the likely effects of standardising it, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum, deneyimli çalışanların farklı farklı yürüttüğü bir süreci standartlaştırmak üzere. Yönetime bir rapor yaz. Şu an ne yapıldığını anlat, standartlaştırmanın olası etkilerini değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe current practice and the variation in it.", tr: "Mevcut uygulamayı ve içindeki değişkenliği anlat." },
              { de: "Assess both gains and losses from standardising.", tr: "Standartlaştırmanın hem kazancını hem kaybını değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed standardisation of the intake process

Current practice

Intake is carried out by four staff, and the written guidance is two pages long. In practice each of them adds a step that is not in the guidance. Two ask an open question at the end of the call; one checks the address against an earlier record; one flags cases where the caller hesitates before giving a date. None of these steps is documented and, as far as I can establish, none has ever been discussed.

Assessment

Standardising would produce real gains. Training currently takes six weeks and would fall, and the variation makes the current data almost useless for comparison. The risk lies in the four undocumented steps. Each was added by an experienced person in response to something that went wrong, and at least one of them accounts for a category of error that the guidance does not mention.

Recommendation

I recommend standardising the process, but not before the four steps have been examined individually. Two of them can probably be written into the guidance at no cost. The address check may be redundant now that records are linked. What I would not do is adopt the standard first and review the exceptions afterwards, which is the sequence proposed. Once a step has been removed, the reason it existed is rarely recoverable, and the staff who could explain it will have moved on within two years.`,
            criteria: [
              "Mevcut uygulama ve içindeki değişkenlik somut olarak anlatıldı mı?",
              "Hem kazanç hem kayıp değerlendirildi mi, yoksa tek yan mı sunuldu?",
              "Öneri bir sıralama içeriyor mu — önce ne, sonra ne?",
              "\"Yapmayacağım şey\" açıkça söylendi mi ve gerekçelendirildi mi?",
              "Metin rapor gibi yapılandırılmış mı (başlıklar, bölümler)?",
              "220–260 kelime aralığında mı?",
              "Kayıt kurumsal ve nesnel mi?",
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
      instructionTr: "Bu bölümde üç görev var: söyleşi, tek başına uzun konuşma ve birlikte yapılan bir görev.",
      tasks: [
        {
          id: "en-c1-02-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about skill, learning and how work changes.",
          promptTr: "Sana beceri, öğrenme ve işin nasıl değiştiği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe something you can do well that you would find hard to explain to somebody else?", tr: "Günaydın. İyi yaptığın ama başkasına anlatması zor olacak bir şeyi tarif eder misin?" },
            { who: "you", hint: "Somut bir beceri seç ve anlatmayı zorlaştıran şeyi adlandır.", expect: "bir beceriyi tarif etmek ve aktarılmasını zorlaştıran şeyi adlandırmak", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think that difficulty is permanent, or only a sign that nobody has tried hard enough?", tr: "Teşekkürler. Sence bu zorluk kalıcı mı, yoksa yalnız kimsenin yeterince uğraşmadığının işareti mi?" },
            { who: "you", hint: "Bir konum al ama karşı görüşe bir pay bırak.", expect: "bir konum almak ve karşı görüşe pay bırakmak", seconds: 50 },
            { who: "partner", de: "And how would you decide whether a job has genuinely changed or only been renamed?", tr: "Bir işin gerçekten değiştiğine mi yoksa yalnız adının değiştiğine mi karar vermek için ne yapardın?" },
            { who: "you", hint: "Bir ölçüt öner ve onu neden seçtiğini açıkla.", expect: "bir ölçüt önermek ve seçimini gerekçelendirmek", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give extended, structured answers", tr: "Geliştirilmiş ve yapılandırılmış cevaplar vermek" },
              { de: "concede something to the opposing view", tr: "Karşı görüşe bir pay bırakmak" },
            ],
            sample:
              "I can tell within a minute whether a class has understood something, and I have never managed to say how. It is not one signal; it is a change in the rhythm of the questions. As to whether that is permanent, I would guess it is not in principle, but I would add that every attempt I have seen to write it down produced a checklist that new teachers followed correctly and still misread the room. On the last question, I would ask whether the mistakes have changed. If people are getting the same things wrong under a new title, the job has been renamed; if the errors are new, something real has moved.",
            criteria: [
              "Beceri somut mu ve aktarım zorluğu adlandırıldı mı?",
              "Karşı görüşe pay bırakıldı mı? (I would guess … but I would add …)",
              "Önerilen ölçüt gerekçelendirildi mi?",
              "Cümle yapıları çeşitli ve akıcı mı?",
            ],
          },
        },
        {
          id: "en-c1-02-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes on this question: \"When an organisation replaces a variable practice with a single standard method, what is gained and what is lost?\" Give at least one example and say where you would draw the line.",
          promptTr:
            "Şu soru üzerine yaklaşık iki dakika tek başına konuş: \"Bir kurum değişken bir uygulamayı tek bir standart yöntemle değiştirdiğinde ne kazanılır, ne kaybedilir?\" En az bir örnek ver ve sınırı nereye çekeceğini söyle.",
          prepSeconds: 60,
          speakSeconds: 110,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "set out gains and losses", tr: "Kazanç ve kayıpları ortaya koy" },
              { de: "give at least one concrete example", tr: "En az bir somut örnek ver" },
              { de: "say where you would draw the line and admit a weakness in it", tr: "Sınırı nereye çekeceğini söyle ve zayıf yanını kabul et" },
            ],
            sample:
              "The gains are easy to state and genuinely large: a standard can be taught quickly, checked cheaply and corrected in one place. The losses are harder to see because they are absences. When a hospital I worked with standardised its discharge letters, the letters improved in every measurable respect and one thing disappeared: the free-text line where a nurse used to write what worried her. That line had no field, no audit and, it turned out, no replacement. Where I would draw the line is at steps that exist because somebody added them after something went wrong. Those should be examined individually before removal, not swept up in a general tidying. The weakness in my rule is obvious. Almost every step in an old process can be described that way by whoever performs it, and I have no clean test for distinguishing a hard-won correction from a habit. What I would say is that the burden of proof currently sits in the wrong place.",
            criteria: [
              "Kazanç ve kayıp ayrı ayrı ortaya konuldu mu?",
              "Somut bir örnek verildi mi?",
              "Sınır açıkça çizildi mi?",
              "Kendi kuralının zayıf yanı kabul edildi mi? Bu, C1'de beklenen kendini sınama.",
              "İki dakika boyunca yapı korundu mu?",
            ],
          },
        },
        {
          id: "en-c1-02-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A training department has a fixed budget for one year. Talk with me about the options and then agree on a priority order for the top three.",
          promptTr:
            "Bir eğitim birimi bir yıllık sabit bir bütçeye sahip. Seçenekleri benimle konuş ve ilk üç için bir öncelik sırasında anlaş.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: writing a full procedure manual, paying experienced staff to mentor, filming demonstrations, running a case-discussion group every fortnight, and buying an off-the-shelf course. Which two would you defend, and on what criterion?", tr: "Seçenekler: eksiksiz bir yordam el kitabı yazmak, deneyimli personele mentorluk için ödeme yapmak, gösterimleri filme almak, iki haftada bir vaka tartışma grubu yapmak ve hazır bir kurs satın almak. Hangi ikisini savunursun, hangi ölçütle?" },
            { who: "you", hint: "İki seçenek seç ve ölçütünü açıkça adlandır.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you. Mentoring costs the most per learner by a wide margin, and it disappears the moment those staff retire. Is that not exactly the wrong thing to buy with a one-year budget?", tr: "Üsteleyeyim. Mentorluk öğrenci başına açık ara en pahalısı ve o personel emekli olduğu anda ortadan kalkıyor. Bir yıllık bütçeyle alınacak en yanlış şey tam da bu değil mi?" },
            { who: "you", hint: "İtirazın gücünü kabul et, sonra ya konumunu değiştir ya da neden değiştirmediğini açıkla.", expect: "güçlü bir itirazı kabul etmek ve konumunu revize etmek ya da savunmasını gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "Understood. Can we settle a priority order for the top three, and name what we would drop?", tr: "Anlaşıldı. İlk üç için bir öncelik sırası belirleyip neyi bırakacağımızı söyleyebilir miyiz?" },
            { who: "you", hint: "Sıralamayı ver, her adımı gerekçelendir ve bırakılanı açıkla.", expect: "gerekçeli bir öncelik sırası kurmak ve dışarıda bırakılanı açıklamak", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "name an explicit criterion", tr: "Açık bir ölçüt adlandırmak" },
              { de: "engage seriously with a strong objection", tr: "Güçlü bir itirazı ciddiye almak" },
              { de: "agree a justified priority order", tr: "Gerekçeli bir öncelik sırasında anlaşmak" },
            ],
            sample:
              "My criterion is whether the spending survives the people who deliver it. On that test, the case-discussion group and the filmed demonstrations come first, because both leave something behind. Your objection to mentoring is the strongest thing said so far and I want to take it seriously rather than defend my first answer. Where I would move is this: I would buy a small amount of mentoring, but only where the mentor's sessions are recorded and discussed by the group, so that the money buys a record and not only an experience. So: the discussion group first, filmed demonstrations second, limited recorded mentoring third. I would drop the full procedure manual, not because manuals are useless but because a year is not long enough to write a good one, and a bad one is worse than none.",
            criteria: [
              "Seçim ölçütü açıkça adlandırıldı mı?",
              "İtiraz gücüyle mi ele alındı, yoksa savuşturuldu mu?",
              "Konum revize edildiyse gerekçesi verildi mi?",
              "Öncelik sırası ve dışarıda bırakılan seçenek gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

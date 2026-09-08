import type { MockPaper } from "../types";

/**
 * C1 · Deneme 7 — "Archives, Selection and What Survives".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Arşiv C1 için verimli
 * çünkü savın kendisi ikinci dereceden: tartışılan şey belgeler değil,
 * belgeleri kimin hangi ölçütle seçtiği ve o ölçütün kayda geçmemesi.
 * Bu, edilgen yapıya, devrik olumsuzlamaya ve adlaştırmaya doğal zemin
 * veriyor.
 *
 * Altıncı denemenin altıncı ve sekizinci görevleri belirli bir yazar
 * dizisi kurmuştu (beklentisi çürüyen araştırmacı, iki savı ayıran
 * kişi, terimi tanımsız bulan kişi, dışarıda kalan okur). O dizi burada
 * bilerek kullanılmadı; yazarların hamleleri baştan yeniden kuruldu.
 */
export const EN_C1_07: MockPaper = {
  id: "en-c1-07",
  course: "en",
  level: "C1",
  no: 7,
  theme: "Archives, Selection and What Survives",
  themeTr: "Arşivler, seçme ve geriye kalan",
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
          id: "en-c1-07-l1",
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
              title: "The container that is not neutral",
              body: `An archive presents itself as a place where things are kept, which is true and which {{1}} the more interesting half of the description. Things are kept because somebody decided to keep them, and the decision is almost never recorded {{2}} the material it produced.

The consequence is a peculiar kind of silence. A researcher who finds nothing on a subject will {{3}} to describe the absence as a gap, as though the record had simply worn away. Some of it has. Much of it was never taken in. Rarely is the reasoning written down at the one moment when it would cost nothing to write.

Archivists are, in my experience, the people least likely to deny this. It is their profession that {{4}} the term "appraisal" for the moment of choosing, and its literature on the subject is a good deal more candid than anything written by the historians who use the results.

Digital storage was expected to do {{5}} with the problem. Keeping everything costs almost nothing, so nothing need be thrown out.

What happened instead is that selection moved. It now takes place at the moment of searching rather than the moment of accession, and it is performed by software whose criteria are, if anything, {{6}} accessible than a committee's.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-07-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["reveals", "resembles", "conceals", "confirms"],
              answer: 2,
              explain:
                "Cümle bir doğrunun bir başka doğruyu örttüğünü söylüyor ve sonraki cümle örtülen yarıyı açıyor: saklama bir karardır. `conceals` bu gizlemeyi verir; `reveals` tam tersini, `confirms` pekiştirmeyi, `resembles` ise benzerliği bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["alongside", "throughout", "beyond", "besides"],
              answer: 0,
              explain:
                "Kararın, ürettiği malzemeyle YAN YANA kaydedilmemesi anlatılıyor. `alongside` bu birlikteliği verir; `throughout` süre boyunca, `beyond` ötesinde, `besides` ise ayrıca demektir.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["incline", "lean", "apt", "tend"],
              answer: 3,
              explain:
                "`tend to + yalın fiil` eğilim bildiren tek yapıdır. `incline` bu anlamda `be inclined to` ister, `apt` bir sıfattır ve `be apt to` biçiminde gelir, `lean` ise `towards` alır.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["struck", "coined", "minted", "issued"],
              answer: 1,
              explain:
                "`coin a term` yeni bir terim türetmeyi anlatan yerleşik eşdizimdir. `mint`, `strike` ve `issue` para basmak ya da resmen yayımlamak için kullanılır; terim için gelmez.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["away", "off", "over", "out"],
              answer: 0,
              explain:
                "`do away with something` bir şeyi ortadan kaldırmayı anlatır ve cümlede `with` zaten duruyor. `do out of` yoksun bırakmak, `do over` yeniden yapmak anlamına gelir ve buradaki `with` ile birleşmez.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["scarcely", "hardly", "less", "little"],
              answer: 2,
              explain:
                "Cümlenin sonundaki `than` bir karşılaştırma derecesi zorunlu kılıyor ve `accessible` uzun bir sıfat olduğu için derece `less` ya da `more` ile kurulur. `scarcely`, `hardly` ve `little` derece değil, olumsuzlayıcı belirteçtir.",
            },
          ],
        },
        {
          id: "en-c1-07-l2",
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
              title: "The economics of keeping",
              body: `Nothing is kept for nothing. Storage costs money, cataloguing costs a great deal more, and {{7}} the two it is the second that gets cut.

An uncatalogued collection is not, in any working sense, an archive {{8}} all: it exists, and nobody can reach it.

Institutions are aware of this, which is {{9}} the backlog figures are so rarely published. The reluctance of institutions to release them is itself a finding of a kind.

{{10}} the criteria for appraisal been written down at the time, later researchers could at least have argued with them.

As it is, they are obliged to reason backwards from what remains, a procedure to {{11}} no other discipline would submit.

Nor {{12}} the problem confined to paper: material that was digital from the start decays faster, and the decision to migrate a format is itself an act of selection.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-07-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["of"],
              explain:
                "İki öğeden birini seçen kalıp `of the two`dur ve ardından hangisinin kastedildiği gelir. Başka bir edat bu bölüştürücü anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["at"],
              explain:
                "Olumsuzu pekiştiren yerleşik öbek `not … at all`dır: «is not … an archive at all». `in all` ve `of all` bu pekiştirmeyi yapmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["why"],
              explain:
                "`which is why` önceki cümleyi bir sonucun gerekçesi yapar: farkında oldukları için rakamları yayımlamıyorlar. `which is because` gerekçeyi ters yöne çevirirdi.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["had"],
              explain:
                "Ana cümle `could at least have argued` taşıyor, yani gerçekleşmemiş bir geçmiş kuruluyor. Bağlaçsız devrik koşul `Had + özne + üçüncü hâl` biçimindedir ve `if` yerine geçer.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["which"],
              explain:
                "İlgi adılı bir edattan (`to`) hemen sonra geliyor ve bu konumda `that` kullanılamaz; öncül de bir kişi değil bir yöntem olduğu için `whom` da olamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["is"],
              explain:
                "Olumsuz `Nor` ile başlayan cümle devrik kuruluş ister: yardımcı fiil özneden önce gelir. Özne `the problem` tekil olduğu için `is`.",
            },
          ],
        },
        {
          id: "en-c1-07-l3",
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
              title: "Appraisal",
              body: `Appraisal is the process by which an archivist determines which records are to be kept permanently. It is therefore an act of {{13}} carried out long before any researcher sees the material.

The {{14}} of a document is not a passive state. It requires periodic intervention, and the intervals are set by budgets rather than by the material itself.

A collection that has not been catalogued is, for practical purposes, {{15}}, whatever its physical condition.

Critics of the field argue that appraisal criteria reflect {{16}} priorities which are seldom stated and never audited.

Digital collections shift the difficulty from storage to {{17}}: the cost of keeping a file has collapsed, while the cost of finding it has not.

Reviews of the literature conclude that the most consequential decisions in the field are also those of lowest {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-07-l3-13",
              no: 13,
              text: "SELECT",
              accept: ["selection"],
              explain:
                "`an act of ___` yapısında `of` edatının nesnesi bir ad olmalı: `selection`. Fiil ya da sıfat biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l3-14",
              no: 14,
              text: "PRESERVE",
              accept: ["preservation"],
              explain:
                "`The ___ of a document is not a passive state` yapısında belirli tanımlıkla `of` arasında cümlenin öznesi duruyor ve yüklem `is`; dolayısıyla tekil bir ad gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l3-15",
              no: 15,
              text: "ACCESS",
              accept: ["inaccessible"],
              explain:
                "Cümle fiziksel durumu ayırıp erişimi olumsuzluyor: kataloglanmamış koleksiyona ulaşılamaz. `access` adından `accessible` sıfatı, ondan da olumsuzu `inaccessible` türetilir; ad biçimi `is` yükleminden sonra bu anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l3-16",
              no: 16,
              text: "INSTITUTION",
              accept: ["institutional"],
              explain:
                "`___ priorities` yapısında addan önce onu niteleyen bir sıfat var: `institutional`. Ad biçimi burada tamlayan olarak gelemez çünkü `priorities` zaten çoğul bir ad.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l3-17",
              no: 17,
              text: "RETRIEVE",
              accept: ["retrieval"],
              explain:
                "`from storage to ___` yapısı iki adı karşı karşıya koyuyor ve ikincisi de ad olmalı: `retrieval`. İki nokta üst üstenin ardındaki açıklama da bunu doğruluyor: bulmanın maliyeti.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l3-18",
              no: 18,
              text: "VISIBLE",
              accept: ["visibility"],
              explain:
                "`of lowest ___` yapısında en üstünlük sıfatından sonra bir ad geliyor ve `of + ad` bir niteleme öbeği kuruyor: en az görünür olanlar. Sıfat biçimi bu kalıba giremez.",
            },
          ],
        },
        {
          id: "en-c1-07-l4",
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
              id: "en-c1-07-l4-19",
              no: 19,
              text: "The committee never explained why the letters were destroyed.\nAt no point ______ why the letters were destroyed.",
              cue: "DID",
              accept: ["did the committee explain"],
              explain:
                "`At no point` gibi olumsuz bir öbek cümle başına geldiğinde devrik kuruluş zorunludur: yardımcı fiil özneden önce gelir ve ardından yalın fiil kalır.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l4-20",
              no: 20,
              text: "Nobody expected the backlog to be so large.\nThe backlog turned out ______ anybody had expected.",
              cue: "LARGER",
              accept: ["to be far larger than", "to be much larger than", "to be larger than"],
              explain:
                "`turn out` mastar tümleci alır ve `so large` yapısı `than` ile kurulan bir karşılaştırmaya çevriliyor. `far` ve `much` beklentiyle arasındaki farkı pekiştirir ve isteğe bağlıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l4-21",
              no: 21,
              text: "It is possible that the file was migrated in 1998.\nThe file ______ in 1998.",
              cue: "MIGHT",
              accept: ["might have been migrated"],
              explain:
                "Geçmişe dair olasılık `might have + üçüncü hâl` ile kurulur ve cümle edilgen olduğu için araya `been` girer. `may have been migrated` de anlamca yakındır ama anahtar sözcük `might` verilmiştir.",
            },
            {
              kind: "gap",
              id: "en-c1-07-l4-22",
              no: 22,
              text: "They should have written down the criteria at the time.\nThe criteria ______ down at the time.",
              cue: "OUGHT",
              accept: ["ought to have been written"],
              explain:
                "`should have + üçüncü hâl` yapısının eş anlamlısı `ought to have + üçüncü hâl`tır ve edilgende araya `been` girer. `ought` tek başına `to` almadan bu zinciri kuramaz.",
            },
          ],
        },
        {
          id: "en-c1-07-l5",
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
              title: "The boxes I destroyed",
              body: `In 2011 I authorised the destruction of about nine hundred boxes, and I would do it again, which is not the same as saying that I was right.

The material was the correspondence of a regional office over thirty-one years: leave requests, travel claims, the internal weather of a bureaucracy. We kept a sample of one year in five and a complete run of the minutes. The rest went.

The objection I hear most often is that I could not know what a historian in 2090 would want. That objection is correct and it is not an argument. Nobody can know. The alternative on offer was not omniscience; it was a different decision, which was to keep everything and catalogue none of it. An uncatalogued box is not a preserved record. It is a preserved object, and the two are confused constantly by people who have never tried to find anything.

What I did get wrong was the writing. We recorded what we destroyed, in the sense that a line exists giving the series and its extent. We did not record why, and the why is the only part a future reader could have argued with. It would have cost a fortnight.

I notice that the digital form of this problem is discussed as though it had been solved. It has not. On balance it is the harder version of the problem, not the easier one. Storage is cheap and finding is not, and a system that returns four million results has performed an appraisal without telling anybody its criteria. A committee, at least, can be asked.`,
              gloss: [
                { de: "to authorise", tr: "onay vermek", en: "authorise" },
                { de: "omniscience", tr: "her şeyi bilme", en: "omniscience" },
                { de: "extent", tr: "hacim, kapsam", en: "extent" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-07-l5-23",
              no: 23,
              text: "How does the writer describe her own decision?",
              options: [
                "She now believes that it was a mistake",
                "She would repeat it but not defend it",
                "She was overruled by her own committee",
                "She has never discussed it in public",
              ],
              answer: 1,
              explain:
                "Açılış cümlesi ikisini ayırıyor: «I would do it again, which is not the same as saying that I was right». Yani karar yinelenirdi ama doğruluk savunulmuyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l5-24",
              no: 24,
              text: "How does she respond to the objection she hears most often?",
              options: [
                "She argues that the future can be predicted",
                "She says the objection misreads the material",
                "She accepts it and has changed her practice",
                "She grants it but denies it leads anywhere",
              ],
              answer: 3,
              explain:
                "Yazar itirazı kabul edip sonuçsuz bırakıyor: «That objection is correct and it is not an argument», çünkü sunulan seçenek her şeyi bilmek değil, başka bir karardı.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l5-25",
              no: 25,
              text: "What does she regard as her actual error?",
              options: [
                "Failing to record the reasons",
                "Destroying too large a proportion of the whole",
                "Keeping any sample at all",
                "Cataloguing the minutes separately",
              ],
              answer: 0,
              explain:
                "Dördüncü paragraf hatayı adlandırıyor: «We did not record why, and the why is the only part a future reader could have argued with».",
            },
            {
              kind: "mcq",
              id: "en-c1-07-l5-26",
              no: 26,
              text: "What does she say about digital collections?",
              options: [
                "They have removed the need for appraisal",
                "They make the criteria much easier to inspect",
                "They appraise without stating the criteria",
                "They are cheaper to catalogue than paper",
              ],
              answer: 2,
              explain:
                "Son paragraf sorunu yer değiştirmiş sayıyor: «a system that returns four million results has performed an appraisal without telling anybody its criteria».",
            },
          ],
        },
        {
          id: "en-c1-07-l6",
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
              body: "The proposal to digitise everything is presented as an alternative to appraisal. It is not. It is appraisal performed by whoever writes the funding bid, since the collections that get scanned are the ones that photograph well and the ones a sponsor has already heard of.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "I would separate the loss into two kinds and treat them differently. Material destroyed on purpose can be reasoned about, because a policy existed and can be read. Material lost to a flood or a move cannot, and it is much the larger share, though it produces almost none of the outrage.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "The profession has been open about this for forty years. Read any appraisal manual. The people who write as though archivists had concealed the fact of selection have not opened the literature they are attacking, and the accusation would be easier to bear if it were better informed.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "My own practice changed after a single request. A student asked for the staff canteen accounts and I had to tell her they had been weeded in 1994. Everything I had been taught said those were low-value. She was writing about what people could afford to eat, and she was right and the manual was wrong.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "Any reform here has to begin with the money, and the money is not in the collections; it is in the catalogue. A backlog is not a storage problem. It is an unpaid wage bill, and every institution I know would rather buy a building than a cataloguer.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-07-l6-27",
              no: 27,
              text: "Which writer says that an apparently neutral solution merely relocates the same judgement?",
              answer: "a",
              explain:
                "Writer A çözümü reddetmiyor, yer değiştirdiğini söylüyor: «It is appraisal performed by whoever writes the funding bid», çünkü taranan koleksiyonlar iyi fotoğraf verenler ve sponsorun tanıdıkları.",
            },
            {
              kind: "match",
              id: "en-c1-07-l6-28",
              no: 28,
              text: "Which writer distinguishes between two kinds of loss?",
              answer: "b",
              explain:
                "Writer B ayrımı kendisi kuruyor: kasıtlı yok etme «can be reasoned about, because a policy existed», sel ya da taşınma kaybı ise akıl yürütmeye kapalı ve payı çok daha büyük.",
            },
            {
              kind: "match",
              id: "en-c1-07-l6-29",
              no: 29,
              text: "Which writer complains that the critics have not read the relevant literature?",
              answer: "c",
              explain:
                "Writer C suçlamanın kaynağını sorguluyor: «have not opened the literature they are attacking», üstelik mesleğin kırk yıldır açık olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-07-l6-30",
              no: 30,
              text: "Which writer describes changing their view because of a single case?",
              answer: "d",
              explain:
                "Writer D dönüm noktasını tek bir istekle veriyor: kantin hesapları 1994'te ayıklanmış ve «she was right and the manual was wrong».",
            },
          ],
        },
        {
          id: "en-c1-07-l7",
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
              title: "Keeping the mail",
              body: `In 2008 a national archive began capturing the email of senior officials, and the project is still described in its own reports as a pilot. {{31}}

The technical part was the part everybody worried about and the part that gave least trouble. Formats were migrated, attachments were resolved, and a set of tools now exists which any comparable institution can use without paying for it. {{32}}

The difficulty was appraisal, and it arrived in a form nobody had planned for. On paper, selection happened once, at the point of transfer, and it was carried out by a person who could see the shape of a file. In email there is no file and there is no shape. {{33}}

The programme's answer was to keep everything from a small number of accounts and nothing from the rest. This has an obvious defect, which its own staff name before anybody else does: it preserves the correspondence of the people who were already the most visible. {{34}}

Seventeen years on, the pilot has produced about four terabytes and one genuinely useful finding, which is that the interesting decisions were not made in email at all. They were made in meetings, and the email says "as discussed".`,
              gloss: [
                { de: "to capture", tr: "kayda almak", en: "capture" },
                { de: "to migrate a format", tr: "biçimi taşımak", en: "migrate a format" },
                { de: "a records officer", tr: "belge sorumlusu", en: "records officer" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "A single account produces more items in a month than a records officer could open in a career, so whatever is done has to be done by rule rather than by judgement, and a rule cannot see a shape either." },
            { key: "b", label: "b", body: "A pilot that has run for seventeen years is telling you something, and what it is telling you is not that the technology failed." },
            { key: "c", label: "c", body: "The alternative proposed at the time, which was to sample across the whole organisation, was rejected for a reason that has never been answered: nobody could describe how to sample a conversation." },
            { key: "d", label: "d", body: "It is worth being clear that this was a genuine achievement, and that it solved none of the problems which have actually stalled the programme." },
            { key: "e", label: "e", body: "The national archive moved to its present building in 1996 and holds approximately one hundred and eighty kilometres of shelving." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-07-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış tuhaflığı kuruyor: 2008'de başlayan iş hâlâ «a pilot» diye anılıyor. (b) o süreyi yorumluyor ve suçun teknolojide olmadığını söyleyerek bir sonraki paragrafın teknik başarısını hazırlıyor.",
            },
            {
              kind: "match",
              id: "en-c1-07-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "d",
              explain:
                "Paragraf teknik tarafın sorunsuz geçtiğini anlatıyor. (d) başarıyı teslim edip sınırını koyuyor: «it solved none of the problems which have actually stalled the programme» — üçüncü paragrafın açtığı güçlük tam da budur.",
            },
            {
              kind: "match",
              id: "en-c1-07-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "a",
              explain:
                "Paragraf kâğıt ile e-postayı karşılaştırıp «there is no file and there is no shape» diyor. (a) ölçeği verip sonucu çıkarıyor: iş kurala bırakılmak zorunda, «and a rule cannot see a shape either».",
            },
            {
              kind: "match",
              id: "en-c1-07-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "c",
              explain:
                "Paragraf seçilen çözümü ve kusurunu veriyor: zaten görünür olanların yazışması saklanıyor. (c) o sırada önerilen öteki yolu ve neden reddedildiğini ekliyor. (e) binanın 1996'daki taşınmasından ve raf uzunluğundan söz ediyor; metnin hiçbir yerinde bina ya da depolama hacmi tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-07-l8",
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
              label: "a — Conservator",
              body: "The queue on my bench is decided by what has been requested, which sounds fair and is not. A document nobody can find is never requested, so the material at the uncatalogued end of the store ages quietly while I re-house things that are already in good order. I have raised this twice and been told, correctly, that it is not my decision to make.",
            },
            {
              key: "b",
              label: "b — Local volunteer",
              body: "We had four hundred boxes in a church hall and no money whatsoever. What we did was photograph the box labels and put them online, which took nine Saturdays. Requests began arriving within a month, mostly from Australia, and two of them told us what was in boxes we had never opened.",
            },
            {
              key: "c",
              label: "c — Government auditor",
              body: "My interest is narrow and it is not historical. If a department cannot produce the record of a decision, that decision cannot be reviewed, and a body which cannot be reviewed will eventually behave as though it never will be. Whether a historian in 2090 is served by any of this is somebody else's question.",
            },
            {
              key: "d",
              label: "d — Novelist",
              body: "I went in wanting the texture of a single year and I came out with a list of prices, which turned out to be the same thing. What I could not get past was the silence around the people who did not write letters. The archive is a record of the literate, and by the second draft I had stopped pretending I had found anything else.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-07-l8-35",
              no: 35,
              text: "says that a routine practice quietly disadvantages part of a collection",
              answer: "a",
              explain:
                "Metin mekanizmayı açıyor: «A document nobody can find is never requested», dolayısıyla kataloglanmamış uç sıraya hiç girmiyor ve bakımsız yaşlanıyor.",
            },
            {
              kind: "match",
              id: "en-c1-07-l8-36",
              no: 36,
              text: "describes a very cheap measure that produced disproportionate returns",
              answer: "b",
              explain:
                "Metin maliyeti ve getiriyi yan yana koyuyor: «no money whatsoever», dokuz cumartesi emek, karşılığında bir ay içinde gelen istekler.",
            },
            {
              kind: "match",
              id: "en-c1-07-l8-37",
              no: 37,
              text: "values records chiefly because they make accountability possible",
              answer: "c",
              explain:
                "Metin ölçütünü açıkça daraltıyor: «If a department cannot produce the record of a decision, that decision cannot be reviewed», tarihçinin ihtiyacı ise başkasının sorunu.",
            },
            {
              kind: "match",
              id: "en-c1-07-l8-38",
              no: 38,
              text: "changed the way they presented their own work",
              answer: "d",
              explain:
                "Metin taslak düzeyinde bir değişiklik bildiriyor: «by the second draft I had stopped pretending I had found anything else», çünkü arşiv yalnız yazabilenlerin kaydı.",
            },
            {
              kind: "match",
              id: "en-c1-07-l8-39",
              no: 39,
              text: "learned something about their own holdings from an outsider",
              answer: "b",
              explain:
                "Metin bunu sonuç olarak veriyor: gelen isteklerden «two of them told us what was in boxes we had never opened».",
            },
            {
              kind: "match",
              id: "en-c1-07-l8-40",
              no: 40,
              text: "accepts that a decision affecting their work properly belongs to somebody else",
              answer: "a",
              explain:
                "Metin itirazını ve sınırını birlikte veriyor: «I have raised this twice and been told, correctly, that it is not my decision to make».",
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
          id: "en-c1-07-h1",
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
              situation: "Bir arşivci ile bir tarihçi bir sözcüğü tartışıyor.",
              plays: 2,
              segments: [
                { text: "You keep saying gap. I want to resist the word." },
                { text: "What would you say instead?" },
                { text: "Decision. Somebody in 1974 decided, and the decision is invisible because nobody wrote it down and the material is not there to remind you." },
                { text: "That is fair, although it makes my job sound more forensic than it is. I am reading what survives and I have three years in which to do it." },
                { text: "Which is why I do not blame historians for the word. I blame the profession that produced the silence and then published a finding aid reading as though nothing had been touched." },
                { text: "Would a note have helped?" },
                { text: "A note saying what was destroyed and why would have taken a fortnight in 1974, and it would be worth more to you now than the boxes." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki kişi bir fon başvurusunu tartışıyor.",
              plays: 2,
              segments: [
                { text: "The plan says digitise, and it does not say catalogue." },
                { text: "The panel will notice that." },
                { text: "The panel will fund it. They funded the last one, and that collection is now four thousand images which nobody can search." },
                { text: "So we write the cataloguing in and we lose on cost." },
                { text: "We write it in and we lose on cost this year. The alternative is winning and producing another unusable set, and I would rather explain a failed bid than that." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Radyoda iki kişi yok olmuş bir şirket arşivini konuşuyor.",
              plays: 2,
              segments: [
                { text: "The company's records were pulped in 2003, and everybody assumes that somebody made a decision." },
                { text: "You think not?" },
                { text: "I went and looked. There is a lease that ended, an invoice for a skip, and no minute of any kind. It was a Tuesday and somebody needed the room." },
                { text: "That is worse, in a way." },
                { text: "It is much worse, and it is also far more common. Deliberate destruction leaves a trail you can argue with. This leaves an invoice for a skip." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-07-h1-1",
              no: 1,
              ref: "a1",
              text: "Why does the archivist object to the word 'gap'?",
              options: ["It exaggerates how much has been lost", "It presents a decision as an accident", "It is a term historians rarely use"],
              answer: 1,
              explain:
                "Arşivci karşılık olarak başka bir sözcük öneriyor: «Decision. Somebody in 1974 decided», ve kararın görünmezliğini kaydın tutulmamasına bağlıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h1-2",
              no: 2,
              ref: "a1",
              text: "What does the archivist hold responsible?",
              options: ["The method the historian is using", "The lack of storage space in 1974", "A finding aid that hides the selection"],
              answer: 2,
              explain:
                "Arşivci suçu açıkça yerleştiriyor: «I blame the profession that produced the silence and then published a finding aid reading as though nothing had been touched». Tarihçiyi ise suçlamıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h1-3",
              no: 3,
              ref: "a2",
              text: "What is the woman's position?",
              options: ["It is better to lose the bid than repeat the last one", "The panel is certain to reject the plan", "The cataloguing should be added afterwards"],
              answer: 0,
              explain:
                "Kadın iki sonucu karşılaştırıp seçiyor: «I would rather explain a failed bid than that», yani kullanılamaz bir küme daha üretmektense kaybetmeyi yeğliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h1-4",
              no: 4,
              ref: "a2",
              text: "What does she say about the earlier project?",
              options: ["It cost a great deal more than was budgeted", "Its results cannot be searched", "It was never actually funded at all"],
              answer: 1,
              explain:
                "Kadın önceki işin sonucunu veriyor: «that collection is now four thousand images which nobody can search». Fon verilmiş, sorun sonuç.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h1-5",
              no: 5,
              ref: "a3",
              text: "What did the man find when he investigated?",
              options: ["Evidence of a deliberate policy", "A minute recording the destruction", "No record of any decision at all"],
              answer: 2,
              explain:
                "Adam bulduklarını sayıyor: biten bir kira sözleşmesi, konteyner faturası ve «no minute of any kind».",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h1-6",
              no: 6,
              ref: "a3",
              text: "Why does he say this is worse?",
              options: ["There is nothing that can be argued with", "Far more material was lost than expected", "The company denied that it had happened"],
              answer: 0,
              explain:
                "Adam karşıtlığı kuruyor: «Deliberate destruction leaves a trail you can argue with. This leaves an invoice for a skip».",
            },
          ],
        },
        {
          id: "en-c1-07-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a woman reporting the results of an appraisal review. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir değerlendirme incelemesinin sonuçlarını anlatan bir kadını dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir sorumlu değerlendirme incelemesinin sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the figures from the appraisal review, and I will include the ones that were awkward. The review covered nine collections and thirty-one years of accessions. Our first finding is that the average time between transfer and cataloguing is now four years, which is up from eighteen months a decade ago. Second, on requests: sixty per cent of everything we are asked for sits on less than two per cent of the shelving. Third, on destruction: of the series destroyed since 1994, we can give a reason for eleven per cent. Fourth, the awkward one — when we asked our own staff to appraise the same test collection independently, the two lists agreed on about a third. And finally, on cost: cataloguing accounts for seventy per cent of what we spend on a collection across its life, and it is the first line cut in every budget round.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Appraisal review — findings",
              body: `The review covered {{7}} collections.

It covered {{8}} years of accessions.

The average wait between transfer and cataloguing is now {{9}} years.

Sixty per cent of requests are for material on less than {{10}} per cent of the shelving.

A reason can be given for {{11}} per cent of the series destroyed since 1994.

Two independent appraisals of the same collection agreed on about a {{12}}.

Cataloguing accounts for {{13}} per cent of lifetime spending.

Cataloguing is the first line {{14}} in a budget round.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-07-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["9", "nine"],
              explain:
                "«The review covered nine collections and thirty-one years of accessions» — koleksiyon sayısı. Otuz bir ise yıl sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["31", "thirty-one"],
              explain:
                "Aynı cümlede iki sayı var ve ikincisi süreye ait: «thirty-one years of accessions».",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["4", "four"],
              explain:
                "«the average time between transfer and cataloguing is now four years» — bugünkü değer. On sekiz ay ise on yıl önceki değer.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["2", "two"],
              explain:
                "«sixty per cent of everything we are asked for sits on less than two per cent of the shelving» — raf oranı. Altmış istek oranıdır.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["11", "eleven"],
              explain:
                "«of the series destroyed since 1994, we can give a reason for eleven per cent» — gerekçesi bilinen oran.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["third"],
              explain:
                "«the two lists agreed on about a third» — bağımsız iki değerlendirmenin örtüşme oranı. Rakam değil kesir olarak veriliyor.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["70", "seventy"],
              explain:
                "«cataloguing accounts for seventy per cent of what we spend on a collection across its life» — ömür boyu harcamadaki pay.",
            },
            {
              kind: "gap",
              id: "en-c1-07-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["cut"],
              explain:
                "Kayıt aynı cümlede çelişkiyi kuruyor: en büyük payı alan kalem, «the first line cut in every budget round».",
            },
          ],
        },
        {
          id: "en-c1-07-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear part of a panel discussion about whether appraisal criteria should be published. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr:
            "Değerlendirme ölçütlerinin yayımlanıp yayımlanmaması üzerine bir panel tartışmasının bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Tartışmayı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir yönetici, arşivci Halvard, tarihçi Ines ve belge sorumlusu Runa ile konuşuyor.",
              plays: 1,
              segments: [
                { text: "Halvard, you have argued against publishing the criteria in full. Why?" },
                { text: "Because criteria that are published are criteria that are gamed. The moment a department knows which categories we keep, the interesting material gets filed in the categories we do not." },
                { text: "Ines, is that a real risk?" },
                { text: "It is real and it is not decisive. Everything Halvard describes is already happening, and it happens without publication because departments learn the criteria informally within about two years. Publication would only equalise who knows." },
                { text: "Runa, from inside a department?" },
                { text: "I would confirm Ines on the facts and disagree on the conclusion. We do learn the criteria, and we learn them badly, which produces caution rather than evasion. People over-file. If you published, you would get less material rather than more, and it would be better sorted." },
                { text: "Halvard, does that change anything for you?" },
                { text: "It changes what I am worried about. I had assumed evasion; Runa is describing over-filing, and over-filing is a problem I would rather have. I am not conceding the main point." },
                { text: "Which is?" },
                { text: "That publication is being asked to do two jobs. One is accountability for past decisions, which I am entirely in favour of and which requires publishing what we did, not what we intend. The other is transparency about future ones, which is the part that gets gamed." },
                { text: "Ines?" },
                { text: "That distinction is the most useful thing said so far, and I want to hold him to it. Retrospective publication would cost nothing and would answer most of what historians complain about. I notice that it is also the part nobody has done." },
                { text: "Runa, could a department object to retrospective publication?" },
                { text: "It would object, and the objection would be weak. It would be that a named officer made a decision that looks poor with hindsight. That is a personnel worry dressed as a policy one, and it should be answered by publishing the reasons and not the names." },
                { text: "So a proposal, briefly." },
                { text: "Publish what was destroyed and why, five years after the event, with the reasoning and without the individuals. I would sign that this afternoon." },
                { text: "Halvard?" },
                { text: "So would I, and I want it minuted that this is the first thing anybody has proposed in nine years that does not require new money." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-07-h3-15",
              no: 15,
              ref: "c1",
              text: "What is Halvard's initial objection to publication?",
              options: [
                "It would cost more than the archive can afford",
                "It would expose individual members of staff",
                "It would slow the transfer of records",
                "It would allow the criteria to be worked around",
              ],
              answer: 3,
              explain:
                "Halvard mekanizmayı veriyor: «criteria that are published are criteria that are gamed», ve ilginç malzemenin saklanmayan kategorilere kaydırılacağını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-16",
              no: 16,
              ref: "c1",
              text: "How does Ines respond to that objection?",
              options: [
                "She denies that departments learn the criteria",
                "She says the risk exists but is already realised",
                "She argues that gaming would be easy to detect",
                "She proposes publishing only part of the criteria",
              ],
              answer: 1,
              explain:
                "Ines riski kabul edip etkisini düşürüyor: «It is real and it is not decisive», çünkü ölçütler iki yıl içinde gayriresmî olarak zaten öğreniliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Runa say happens inside a department?",
              options: [
                "Uncertainty about the criteria makes people keep too much",
                "Officers deliberately misfile sensitive material",
                "The criteria are never learned at any stage",
                "Departments ask the archive for guidance each year",
              ],
              answer: 0,
              explain:
                "Runa sonucu adlandırıyor: ölçütler kötü öğrenildiği için «caution rather than evasion. People over-file», ve yayımlanırsa daha az ama daha düzenli malzeme geleceğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-18",
              no: 18,
              ref: "c1",
              text: "How does Halvard react to Runa's account?",
              options: [
                "He withdraws his objection entirely",
                "He disputes her description of departments",
                "He accepts the description but not the conclusion",
                "He says the two of them are describing different archives",
              ],
              answer: 2,
              explain:
                "Halvard kaygısının değiştiğini ama savını bırakmadığını söylüyor: «over-filing is a problem I would rather have. I am not conceding the main point».",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-19",
              no: 19,
              ref: "c1",
              text: "What is the distinction Halvard then draws?",
              options: [
                "Between paper records and digital ones",
                "Between the archive's duties and a department's",
                "Between what historians want and what auditors want",
                "Between accounting for past decisions and announcing future ones",
              ],
              answer: 3,
              explain:
                "Halvard yayımlamaya iki ayrı iş yüklendiğini söylüyor: geçmiş kararların hesabı ile gelecek kararların şeffaflığı, «which is the part that gets gamed».",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Ines say about that distinction?",
              options: [
                "It is the most useful contribution so far",
                "It repeats an argument made in the literature",
                "It cannot be applied in practice",
                "It concedes too much to the departments",
              ],
              answer: 0,
              explain:
                "Ines ayrımı benimsiyor ve Halvard'ı ona bağlamak istiyor: «That distinction is the most useful thing said so far, and I want to hold him to it».",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-21",
              no: 21,
              ref: "c1",
              text: "How does Runa characterise a department's likely objection?",
              options: [
                "As a legitimate concern about national security",
                "As a matter of cost that could be negotiated",
                "As a staffing worry presented as a policy argument",
                "As an objection that no department would actually make",
              ],
              answer: 2,
              explain:
                "Runa itirazın gerçek kaynağını gösteriyor: «That is a personnel worry dressed as a policy one», ve çözümü gerekçeleri yayımlayıp adları yayımlamamak.",
            },
            {
              kind: "mcq",
              id: "en-c1-07-h3-22",
              no: 22,
              ref: "c1",
              text: "What does Halvard note about the final proposal?",
              options: [
                "It repeats a proposal made nine years ago",
                "It is the first in years that needs no new funding",
                "It would require the agreement of every department",
                "It goes further than he is willing to support",
              ],
              answer: 1,
              explain:
                "Halvard öneriyi destekliyor ve tutanağa geçirtiyor: «the first thing anybody has proposed in nine years that does not require new money».",
            },
          ],
        },
        {
          id: "en-c1-07-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about records and archives. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Belgeler ve arşivler üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to correct a figure that is widely repeated" },
            { key: "b", label: "to explain why an obvious remedy has not been adopted" },
            { key: "c", label: "to warn that a change will create a new problem" },
            { key: "d", label: "to describe a practice they have given up" },
            { key: "e", label: "to argue that the disagreement is about definitions" },
            { key: "f", label: "to point out who is absent from the discussion" },
            { key: "g", label: "to say that a success was largely accidental" },
            { key: "h", label: "to refuse to make a prediction" },
            { key: "i", label: "to accept responsibility for an error" },
            { key: "j", label: "to question whether the problem is as new as claimed" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı dolaşımdaki bir sayıyı ele alıyor.",
              plays: 2,
              segments: [
                { text: "The number quoted everywhere is that ninety-five per cent of government records are destroyed. It comes from a single paper about one department in one decade, and the paper says so. The figure across the service is between ninety-seven and ninety-nine, and the difference is not trivial when you are arguing about what a sample can support." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı bir çözümün neden uygulanmadığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Everybody agrees that a short note explaining each destruction would solve most of this, and everybody has agreed for thirty years. It has not happened because the note has to be written by the person doing the destroying, at the end of a job nobody has budgeted properly, and there is no line in any contract that pays for it." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bir değişikliğin sonucundan söz ediyor.",
              plays: 2,
              segments: [
                { text: "If we move to automatic capture, we will stop losing material and start losing context. Everything will be there and nothing will be filed, and in twenty years somebody will write the same complaint I am writing now with the word inverted. I would still do it. I would just like it minuted that I said this." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bıraktığı bir uygulamayı anlatıyor.",
              plays: 2,
              segments: [
                { text: "For years I wrote finding aids in the voice of the institution, which meant no voice at all: this series comprises, this series was transferred. I have stopped. I now write what is missing and why I think it is missing, in the first person, and my successor can disagree with a person rather than with a wall." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı tartışmanın nerede tıkandığını gösteriyor.",
              plays: 2,
              segments: [
                { text: "Half this argument is about the word permanent. For a records manager it means until the retention period ends. For an archivist it means indefinitely. For a technologist it means until the next migration. Three people can say the record is kept permanently and mean three incompatible things, and nobody stops to check." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı bir başarının nasıl ortaya çıktığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "Our regional collection is the most complete in the country, and I have heard three conference papers explaining why. The real reason is that the building had a dry cellar and no money for a skip, so nothing was thrown away for forty years. It was neglect, and it has been written up as policy." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı kendi kararına dönüyor.",
              plays: 2,
              segments: [
                { text: "I signed the schedule that weeded the complaints files. I had read the summary and not the sample, and the summary said routine correspondence. It was not routine and it was the only place where the people who used the service spoke. That was my signature and my week, and there is nobody else to point at." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı tartışmada kimin bulunmadığını söylüyor.",
              plays: 2,
              segments: [
                { text: "Every person on this panel can get into a reading room. The catalogue is in one language, the opening hours assume a salary, and the request form assumes you already know what you are looking for. The people those three facts exclude are the larger part of the potential readership, and they have never once been in the room when priorities were set." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-07-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı dolaşımdaki rakamı düzeltiyor: «The number quoted everywhere is that ninety-five per cent … The figure across the service is between ninety-seven and ninety-nine».",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı çözümde herkesin anlaştığını söyleyip engeli veriyor: notu yok eden kişi yazmak zorunda ve «there is no line in any contract that pays for it».",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı değişikliği destekliyor ama yeni sorunu önceden adlandırıyor: «we will stop losing material and start losing context», üstelik tutanağa geçirilmesini istiyor.",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Konuşmacı bıraktığı yazma biçimini anlatıyor: kurumun sesiyle yazmayı «I have stopped» diyor ve yerine birinci tekil kişiyi koyuyor.",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı anlaşmazlığı sözcüğe bağlıyor: `permanent` üç meslekte üç ayrı şey demek ve «Three people can say the record is kept permanently and mean three incompatible things».",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "g",
              explain:
                "Konuşmacı övgüyü reddedip sebebi veriyor: kuru bir bodrum ve konteyner parasının olmayışı. «It was neglect, and it has been written up as policy».",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Konuşmacı sorumluluğu üstleniyor: özeti okuyup örneği okumamış ve «That was my signature and my week, and there is nobody else to point at».",
            },
            {
              kind: "match",
              id: "en-c1-07-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "f",
              explain:
                "Konuşmacı eksik tarafı gösteriyor: katalog dili, açılış saatleri ve istek formunun dışladığı kişiler «have never once been in the room when priorities were set».",
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
          id: "en-c1-07-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on public records. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. An institution should keep as much as it possibly can, because nobody can know what will be wanted later.\n2. An institution should keep less and describe what it keeps, because material that cannot be found has not been kept.\n\nWrite 220 to 260 words.",
          promptTr:
            "Kamu belgeleri üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Kurum elinden geldiğince çok şey saklamalı, çünkü sonradan neyin isteneceği bilinemez.\n2. Kurum daha az saklamalı ve sakladığını betimlemeli, çünkü bulunamayan şey saklanmış sayılmaz.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two positions are usually presented as a choice between generosity and discipline, which flatters the first and misrepresents the second.

The case for keeping everything rests on a genuine limit: appraisal requires a prediction about future demand, and the record of such predictions is poor. Categories dismissed as routine in one decade — canteen accounts, complaints files — have repeatedly turned out to carry the only evidence about people who wrote nothing else. Since storage is now inexpensive, the argument runs, the prudent course is to defer the decision indefinitely.

The second position accepts the limit and denies that deferral is available. A collection that has not been described cannot be searched, and a researcher who cannot find something is in precisely the position of one for whom it was destroyed. On this view, keeping without describing does not postpone the decision; it transfers it to whoever writes the search software, and that person publishes no criteria at all.

The second point seems to me the more important, for a reason that is administrative rather than intellectual. Cataloguing is the first budget line cut in almost every institution, so a policy of total retention will in practice produce enormous holdings that nobody can enter, while allowing everyone involved to feel that nothing has been lost.

My own view is that the argument is miscast. What matters is neither volume nor description but the record of the reasoning: a destruction that is explained can be argued with, and one that is merely logged cannot.`,
            criteria: [
              "İki nokta da adil ve tam özetlendi mi?",
              "Seçim gerekçelendirildi mi ve gerekçe özetten çıkıyor mu?",
              "Kendi görüş özetin tekrarı değil, ayrı bir sav mı?",
              "Soyut adlaştırma ve ileri bağlayıcılar kullanıldı mı? (deferral, on this view, in practice)",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-07-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know is about to move its old paper files into commercial storage and scan only what is requested. Write a report for its management. Describe the present arrangement, assess the likely effects, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kurum eski kâğıt dosyalarını ticari bir depoya taşımak ve yalnız istenenleri taramak üzere. Yönetime bir rapor yaz. Mevcut düzeni anlat, olası etkileri değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the present arrangement precisely.", tr: "Mevcut düzeni kesin biçimde anlat." },
              { de: "Assess both the gains and the risks.", tr: "Hem kazancı hem riski değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: proposed off-site storage of paper files

Present arrangement
Approximately six hundred boxes occupy two rooms on the second floor. There is a box list, compiled in 2014, giving a department and a date range for each box; there is no item-level description. Staff retrieve material themselves, on average four times a month, and no record is kept of what is consulted.

Likely effects
The gain is straightforward: two rooms released, at an estimated saving of eleven thousand euros a year against a storage charge of about three.

The risks are less visible. Scanning on request sounds economical, but it makes consultation contingent on somebody already knowing what to ask for, and our description is at box level. In practice this converts the collection from lightly used to unused, and the resulting fall in requests will be read, in three years, as evidence that the material was never needed.

There is also a legal exposure. We cannot currently demonstrate which files were consulted, and off-site storage will not improve that.

Recommendation
I recommend proceeding with the move, subject to two conditions. First, that the box list is expanded to file level before the boxes leave the building, which is a matter of perhaps three weeks' work and cannot be done afterwards at any price. Second, that retrieval statistics are recorded from the first day.

I would not recommend scanning on request as the sole route of access, and I would not treat a fall in requests as a finding.`,
            criteria: [
              "Mevcut düzen somut sayılarla mı anlatıldı?",
              "Hem kazanç hem risk değerlendirildi mi ve risk yüzeysel mi kalmış?",
              "Öneri koşullu ve uygulanabilir mi?",
              "Neyin yapılmayacağı açıkça söylendi mi?",
              "Rapor kaydı ve başlıklandırma uygun mu? 220–260 kelime aralığında mı?",
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
          id: "en-c1-07-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about records, memory and what organisations keep.",
          promptTr: "Sana kayıtlar, hafıza ve kurumların neyi sakladığı hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. What do you keep that you will probably never look at again?", tr: "İyi günler. Bir daha bakmayacağın hâlde sakladığın şey nedir?" },
            { who: "you", hint: "Somut bir örnek ver ve neden sakladığını açıkla.", expect: "somut bir örnekten genel bir gerekçeye geçmek", seconds: 45 },
            { who: "partner", de: "Thank you. Has anything ever been thrown away that you later needed?", tr: "Teşekkürler. Sonradan ihtiyaç duyduğun bir şey atıldı mı hiç?" },
            { who: "you", hint: "Tek bir olayı sonucuyla anlat.", expect: "geçmişte olmuş tek bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if an institution could keep only one kind of its own records, which should it be?", tr: "Bir kurum kendi kayıtlarından yalnız bir türü saklayabilse, hangisi olmalı?" },
            { who: "you", hint: "Bir ölçüt öner ve gerekçelendir.", expect: "varsayımsal bir kısıt altında ölçüt önermek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "move from an example to a general reason", tr: "Örnekten genel bir gerekçeye geçmek" },
              { de: "narrate one event with its outcome", tr: "Tek bir olayı sonucuyla anlatmak" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önerip gerekçelendirmek" },
            ],
            sample:
              "I keep about nine years of bank statements that I have never once opened, and the honest reason is not caution; it is that throwing them away would require me to decide, and filing them requires nothing. My father's employer closed and shredded everything, and when he tried to prove thirty years of contributions there was no personnel file at all; he was believed, eventually, on the strength of two payslips he happened to have kept. If an institution could keep only one kind of record, I would keep the minutes of the meetings where decisions were made, because everything else in an organisation is either a consequence of those or an attempt to describe them afterwards.",
            criteria: [
              "İlk cevap somut örnekten gerekçeye geçebildi mi?",
              "Anlatı tek ve belirgin mi, sonucu verildi mi?",
              "Son cevapta bir ölçüt önerildi ve savunuldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-c1-07-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. Compare these two approaches to public records, say which you would defend and explain one serious objection to your own position: keeping as much as possible and describing it lightly, or keeping much less and describing it fully.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Kamu belgelerine şu iki yaklaşımı karşılaştır, hangisini savunacağını söyle ve kendi konumuna yöneltilebilecek ciddi bir itirazı açıkla: olabildiğince çok saklayıp az betimlemek mi, çok daha az saklayıp tam betimlemek mi?",
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
              "The first approach has the advantage of deferring a judgement that nobody is qualified to make, and the record of appraisal decisions is bad enough to justify a good deal of humility. Against that, it defers the judgement onto the search, and the search is performed by software whose criteria are less inspectable than a committee's. The second approach accepts a real loss in exchange for a collection that can actually be entered, and I would defend it, chiefly because cataloguing is the first thing cut in every budget round, which means that a policy of total retention produces vast unusable holdings while allowing everybody to feel that nothing has gone. The serious objection to my own position is that the categories dismissed as routine are precisely the ones that later turn out to carry the only evidence about people who left nothing else; canteen accounts and complaints files are the standard examples, and they are standard because the profession has got them wrong more than once.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Konum gerekçelendirildi mi?",
              "Kendi konumuna yöneltilen itiraz ciddi mi, yoksa zayıf bir hâli mi kurulmuş?",
              "İki dakika akıcı ve yapısal olarak düzenli konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-c1-07-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "An institution has one year of a cataloguer's time and four candidate collections. Talk with me about how the year should be spent, and agree on a way of deciding rather than on a list.",
          promptTr:
            "Bir kurumun bir kataloglayıcının bir yıllık zamanı ve dört aday koleksiyonu var. Yılın nasıl harcanacağını benimle konuş ve bir liste üzerinde değil, bir karar verme yolu üzerinde anlaş.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The four are: a much-requested collection with a poor catalogue, a large uncatalogued one nobody has asked for, a small collection a funder wants scanned, and the institution's own administrative records. Where would you start?", tr: "Dördü şunlar: çok istenen ama kataloğu kötü bir koleksiyon, kimsenin sormadığı kataloglanmamış büyük bir koleksiyon, bir bağışçının taranmasını istediği küçük bir koleksiyon ve kurumun kendi idari kayıtları. Nereden başlardın?" },
            { who: "you", hint: "Bir başlangıç seç ve seçimi bir ölçüte bağla.", expect: "bir seçeneği seçmek ve onu açık bir ölçütle gerekçelendirmek", seconds: 45 },
            { who: "partner", de: "But the uncatalogued collection is unrequested precisely because it is uncatalogued, so demand cannot be the criterion. Does that not undo your argument?", tr: "Ama kataloglanmamış koleksiyon tam da kataloglanmadığı için istenmiyor; yani talep ölçüt olamaz. Bu savını çürütmüyor mu?" },
            { who: "you", hint: "İtirazın gücünü teslim et ve ölçütünü onaracak biçimde yeniden kur.", expect: "bir itirazı teslim edip kendi ölçütünü yeniden kurmak", seconds: 45 },
            { who: "partner", de: "Then give me the rule we would write down, not the collection we would choose.", tr: "Öyleyse bana seçeceğimiz koleksiyonu değil, yazacağımız kuralı ver." },
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
              "I would start with the much-requested collection, on the criterion that a bad catalogue over heavy use wastes more reader time than any other configuration. You are right that this criterion is circular, and I want to concede that properly rather than qualify it: demand measures description, not value, so it cannot be the whole rule. What I would keep from it is the observation about waste, and what I would add is a cheap test for the unknown collection — a week of sampling rather than a year of cataloguing. So the rule we write down is this: spend on the collections where use is known to be high, but reserve a fixed tenth of the year for sampling the ones we cannot see, and publish what the sampling found so that the next decision is made on something other than silence.",
            criteria: [
              "Seçim açık bir ölçütle mi gerekçelendirildi?",
              "İtirazın gücü gerçekten teslim edildi mi, yoksa geçiştirildi mi?",
              "Sonunda liste değil, uygulanabilir bir kural üretildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

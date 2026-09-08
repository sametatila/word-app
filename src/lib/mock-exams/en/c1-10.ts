import type { MockPaper } from "../types";

/**
 * C1 · Deneme 10 — "Maps, Borders and the Ground".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Sınır çizgisi C1 için
 * verimli çünkü tartışma iki belge arasında değil, belge ile arazi
 * arasında yürüyor: harita bir iddia, zemin ise onunla anlaşmak zorunda
 * değil. Bu, edilgen yapıya, devrik olumsuzlamaya ve adlaştırmaya doğal
 * zemin veriyor.
 *
 * Beşinci görev bilerek adli bir yeniden kurgu: dokuzuncu denemede otuz
 * bir olayın örüntüsü vardı, burada tek bir öğleden sonranın belgelerden
 * çıkarılması var. Dinlemedeki panelin bitişi de ayrı — yedincide somut
 * bir öneride buluşuluyordu, sekizincide anlaşmazlık yerine oturuyordu,
 * dokuzuncuda yönetici düzeltiliyordu; burada taraflar iki ayrı nesneyi
 * tartıştıklarını fark ediyor.
 */
export const EN_C1_10: MockPaper = {
  id: "en-c1-10",
  course: "en",
  level: "C1",
  no: 10,
  theme: "Maps, Borders and the Ground",
  themeTr: "Haritalar, sınırlar ve arazinin kendisi",
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
          id: "en-c1-10-l1",
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
              title: "The line and the ground",
              body: `A border drawn on a map is a claim about the ground, and the ground is under no obligation to {{1}} in.

Rivers move. A watercourse that was the frontier in 1893 may now run four hundred metres to the east, and the treaty says the river without saying which river, in which year.

Villages sit across lines that were {{2}} by somebody who had never seen them, working from a smaller map in a room in another country.

None of this is a scandal, and treating it as one gets the argument wrong from the start. Every boundary anybody has ever drawn had to be drawn by somebody, {{3}} imperfect information and under a deadline.

The interesting question is what happens afterwards. The map, having been drawn, begins to {{4}} authority of its own, and within two generations it is defended as though it were the older of the two documents.

Rarely does anybody ask which of them the people living there would {{5}} to. The survey is a technical exercise; the answer to that question would be a political one, and the two are kept carefully {{6}}.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-10-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["give", "join", "fall", "come"],
              answer: 2,
              explain:
                "`fall in with something` bir düzene uymayı anlatır ve cümle arazinin haritaya uymak zorunda olmadığını söylüyor. `give in` teslim olmak, `join in` katılmak, `come in` ise girmektir.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["ruled", "measured", "counted", "pressed"],
              answer: 0,
              explain:
                "`rule a line` cetvelle çizmek demektir ve devamı bunu doğruluyor: çizen kişi yeri hiç görmemiş. `measure` ölçmeyi, `press` bastırmayı bildirir ve çizgi için kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["by", "on", "from", "with"],
              answer: 3,
              explain:
                "`with imperfect information` bir koşulu bildirir ve cümlenin ikinci yarısı da aynı biçimde kuruluyor: `under a deadline`. `from` kaynağı, `on` dayanağı gösterir.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["assume", "acquire", "assert", "attach"],
              answer: 1,
              explain:
                "`acquire authority` bir şeyin zamanla otorite kazanmasını anlatır ve cümle haritanın çizildikten sonra bunu kazandığını söylüyor. `assume` üstlenmek, `assert` ileri sürmek, `attach` iliştirmektir.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["hold", "keep", "stand", "point"],
              answer: 2,
              explain:
                "`stand to something` bir belgeye bağlı kalmayı anlatan yapıdır ve soru insanların hangisine bağlı kalacağıdır. `hold to` de yakındır ama `would hold to` burada nesnesiz kalır; `point to` işaret etmektir.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["apart", "aside", "away", "off"],
              answer: 0,
              explain:
                "`keep two things apart` ikisini birbirinden ayrı tutmayı anlatır ve cümle teknik ile siyasi olanın ayrı tutulduğunu söylüyor. `keep aside` bir kenara koymak, `keep away` uzak tutmaktır.",
            },
          ],
        },
        {
          id: "en-c1-10-l2",
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
              title: "What a boundary is made of",
              body: `A boundary is not a line. It is a text, a set of coordinates, a row of markers and a habit, and the four of them agree less often {{7}} anybody outside the profession assumes.

The text is authoritative and it is also the oldest, which means it describes a landscape {{8}} longer exists.

Nor {{9}} the markers a neutral record. They were placed by teams working in one season, and a marker that fell over in 1954 was replaced by whoever noticed it, in a position established from memory.

{{10}} the habit — where people actually farm, pay and vote — should be given weight is the question the discipline has never settled.

The reluctance of governments to reopen any of this is easy to understand and hard to defend, {{11}} the cost of a resurvey is trivial beside the cost of a dispute.

As it is, the line is left alone, {{12}} suits everybody except the eleven households whose fields are on the wrong side of it.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-10-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["than"],
              explain:
                "`less often than` bir karşılaştırma kurar ve karşılaştırılan şey `than` ile bağlanır. `as` yalnız eşitlik yapısında (`as often as`) gelir.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["no"],
              explain:
                "`a landscape that no longer exists` beklenirdi; ilgi adılı düşürülemeyeceği için boşluk olumsuzlayıcıya ait: `no longer`. Süreklilik `no longer` ile kesilir, `not longer` diye bir kalıp yoktur.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["are"],
              explain:
                "Olumsuz `Nor` ile başlayan cümle devrik kuruluş ister ve özne `the markers` çoğul olduğu için yardımcı fiil `are`.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["whether"],
              explain:
                "Cümlenin öznesi bir dolaylı soru ve yüklem `is the question`. Özne konumundaki bu yapıyı `whether` başlatır; `if` bu konumda kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["since", "because"],
              explain:
                "İkinci yarı birinci yarının gerekçesini veriyor: yeniden ölçüm ucuz, anlaşmazlık pahalı. Sebep bağlacı `since` ya da `because` bu ilişkiyi kurar.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["which"],
              explain:
                "Virgülden sonra bütün bir cümleye gönderme yapan ilgi adılı gerekiyor: çizginin öylece bırakılması. Bunu yalnız `which` yapar.",
            },
          ],
        },
        {
          id: "en-c1-10-l3",
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
              title: "Boundary demarcation",
              body: `Demarcation is the physical marking on the ground of a boundary whose {{13}} has already been agreed in a treaty.

The two operations are distinct, and the {{14}} between them is the source of most later disputes, because a treaty may be signed decades before anybody walks the line.

Surveyors report that the {{15}} of nineteenth-century instruments has been consistently overstated, which matters wherever the original coordinates are treated as definitive.

Where a watercourse forms the boundary, {{16}} of the channel raises a question that most treaties do not answer.

Local {{17}} of the line is often better evidence of long practice than the archive, although it carries no legal weight.

Reviews conclude that a resurvey is politically {{18}} in almost every case where it is technically straightforward.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-10-l3-13",
              no: 13,
              text: "DESCRIBE",
              accept: ["description"],
              explain:
                "`a boundary whose ___ has already been agreed` yapısında `whose` iyelik kuruyor ve yüklem `has` tekil bir ad ister: antlaşmada üzerinde anlaşılan şey sınırın TARİFİDİR.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l3-14",
              no: 14,
              text: "SEPARATE",
              accept: ["separation"],
              explain:
                "`the ___ between them` yapısında belirli tanımlıkla `between` arasında bir ad geliyor ve iki işlemin birbirinden ayrılığı anlatılıyor. Sıfat biçimi (`separate`) bu konumda `the` ile ad öbeği kuramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l3-15",
              no: 15,
              text: "ACCURATE",
              accept: ["accuracy"],
              explain:
                "`the ___ of nineteenth-century instruments` yapısında belirli tanımlıkla `of` arasında bir ad geliyor ve abartıldığı söylenen şey aletlerin isabetidir.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l3-16",
              no: 16,
              text: "MOVE",
              accept: ["movement"],
              explain:
                "`___ of the channel raises a question` yapısında cümlenin öznesi bir ad ve yüklem tekil. Fiil biçimi bu konumda özne olamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l3-17",
              no: 17,
              text: "KNOW",
              accept: ["knowledge"],
              explain:
                "`Local ___ of the line` yapısında sıfattan sonra bir ad geliyor ve karşılaştırma arşivle yapılıyor: yerel bilgi. Fiil biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l3-18",
              no: 18,
              text: "POSSIBLE",
              accept: ["impossible"],
              explain:
                "Cümle teknik kolaylık ile siyasi güçlüğü karşı karşıya koyuyor: teknik olarak basit olan durumlarda yeniden ölçüm siyaseten OLANAKSIZ. `possible` sıfatının olumsuzu `impossible`dır.",
            },
          ],
        },
        {
          id: "en-c1-10-l4",
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
              id: "en-c1-10-l4-19",
              no: 19,
              text: "Nobody has walked the whole line since 1954.\nThe whole line ______ since 1954.",
              cue: "WALKED",
              accept: ["has not been walked"],
              explain:
                "`Nobody has …` yapısı edilgene çevrilirken olumsuzluk yükleme taşınıyor: `has not been walked`. Anahtar sözcük üçüncü hâl olduğu için zincir `has been` ile tamamlanır.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l4-20",
              no: 20,
              text: "The survey would have been simple if the markers had been recorded properly.\nHad the markers been recorded properly, the survey ______ simple.",
              cue: "WOULD",
              accept: ["would have been"],
              explain:
                "Devrik `Had + özne + üçüncü hâl` gerçekleşmemiş bir geçmiş kuruyor ve ana cümle `would have + üçüncü hâl` ister; burada yüklem `be` olduğu için `would have been`.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l4-21",
              no: 21,
              text: "It is impossible for a treaty of 1893 to describe a river that has moved.\nA treaty of 1893 ______ a river that has moved.",
              cue: "POSSIBLY",
              accept: ["cannot possibly describe"],
              explain:
                "Olanaksızlık, sıfatlı yapıdan kip fiiline çevriliyor: `cannot possibly + yalın fiil`. Anahtar sözcük belirteç olduğu için `cannot` ile fiil arasına girer.",
            },
            {
              kind: "gap",
              id: "en-c1-10-l4-22",
              no: 22,
              text: "Although the resurvey was cheap, no government ordered one.\nCheap ______ , no government ordered one.",
              cue: "THOUGH",
              accept: ["though the resurvey was"],
              explain:
                "Sıfat öne alınmış bir ödün yapısı kuruluyor: `Adjective + though + özne + fiil`. `although` bu devrik biçimde kullanılmaz.",
            },
          ],
        },
        {
          id: "en-c1-10-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 26. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–26. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Long-form article",
              genreTr: "Uzun yazı",
              title: "One afternoon in 1907",
              body: `The line that runs through the village of Ostrec was drawn on the afternoon of 14 May 1907, and it is possible to say almost exactly how.

Three documents survive. There is the minute of the commission, which records that the boundary was agreed and gives no reasoning. There is a working sheet with two pencil versions of the same stretch, one of them scored through. And there is a letter written eleven days later by the junior surveyor to his brother, complaining about the heat and mentioning, in a subordinate clause, that they had taken the northern option because the southern one would have required a second visit to the ridge.

That clause is the only surviving statement of a reason, and it is not in any archive of the commission. It is in a family collection that was catalogued in 1998.

I set this out because of what happens to such a line afterwards. Within thirty years the northern option had acquired a history. It was described, in three separate publications, as following an older ecclesiastical boundary, and one of those publications is still cited. There is no evidence for that claim and there is a plausible reason for its appearance: a line that follows something older is easier to defend than a line that avoided a second walk up a hill.

I am not arguing that the boundary is illegitimate. Every boundary was drawn by tired people with instruments they did not entirely trust. What I am arguing is narrower: we know why this one is where it is, we know it by accident, and the account that circulates is not that one.

The general point is uncomfortable for my own discipline. The reasons for most such decisions were never written down, and the histories that fill the gap were written later by people who needed the line to make sense.`,
              gloss: [
                { de: "a ridge", tr: "sırt, tepe hattı", en: "ridge" },
                { de: "a minute", tr: "tutanak", en: "minute" },
                { de: "ecclesiastical", tr: "kiliseye ait", en: "ecclesiastical" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-10-l5-23",
              no: 23,
              text: "What is unusual about this boundary?",
              options: [
                "It was drawn without any official record",
                "The reason for it happens to survive",
                "It was moved twice within thirty years",
                "It was agreed by a single surveyor",
              ],
              answer: 1,
              explain:
                "Yazı gerekçenin tesadüfen kaldığını söylüyor: kardeşine yazılan mektuptaki yan cümle «the only surviving statement of a reason», üstelik komisyon arşivinde değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l5-24",
              no: 24,
              text: "Why was the northern option chosen?",
              options: [
                "It followed an older church boundary",
                "The southern option was disputed locally",
                "The commission was divided on the southern one",
                "The southern one meant walking the ridge again",
              ],
              answer: 3,
              explain:
                "Mektup gerekçeyi veriyor: «the southern one would have required a second visit to the ridge». Kilise sınırı iddiası ise sonradan uydurulan açıklama.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l5-25",
              no: 25,
              text: "What does the writer say about the later account?",
              options: [
                "It was invented deliberately to mislead",
                "It has since been corrected in the literature",
                "It made the line easier to defend",
                "It came from the surveyor's own family",
              ],
              answer: 2,
              explain:
                "Yazar açıklamanın işlevini veriyor: «a line that follows something older is easier to defend than a line that avoided a second walk up a hill». Kasıt iddiası yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-l5-26",
              no: 26,
              text: "What is the writer's general point?",
              options: [
                "The reasons were rarely recorded and were supplied later",
                "Boundaries drawn in haste should be redrawn",
                "Archives should be transferred to public ownership",
                "Nineteenth-century surveying was unreliable",
              ],
              answer: 0,
              explain:
                "Son paragraf savı genelleştiriyor: «The reasons for most such decisions were never written down, and the histories that fill the gap were written later».",
            },
          ],
        },
        {
          id: "en-c1-10-l6",
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
              body: "Nobody in this dispute cares about the line. What is at stake is the water rights that follow from it, and those could be settled without touching the boundary at all. The map is being argued over because it is the only object in the room that both governments already recognise.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "The standard account holds that lines drawn from a distance ignore the ground. Then there is the eastern section, drawn in the same week by the same men, which follows the watershed for ninety kilometres with an accuracy that took the next survey four months to confirm. Any theory has to accommodate that, and most do not attempt to.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Everything the commentators have discovered in the last decade is in the field manuals of the 1930s, expressed more precisely and with the qualifications intact. Surveyors have never believed that a coordinate is the boundary. It is the historians of the subject who thought so, and they are now announcing the correction as a finding.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "Suppose we accept that the line is in the wrong place. Correcting it means a resurvey, new markers, land registry amendments in two systems that do not share a format, and compensation to about four hundred households. The technical error is forty metres. The correction is a decade, and nobody proposing it has costed the decade.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "This will not be settled where it is currently being argued. The commission has no power to amend a treaty and the courts will not hear a case brought by a village. Within five years it will be an environmental dispute about the river, because that is the only forum in which somebody with standing can bring it.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-10-l6-27",
              no: 27,
              text: "Which writer says the object under discussion stands in for another dispute?",
              answer: "a",
              explain:
                "Writer A asıl konuyu ayırıyor: «What is at stake is the water rights that follow from it», ve haritanın tartışılma nedenini veriyor: iki hükümetin de tanıdığı tek nesne o.",
            },
            {
              kind: "match",
              id: "en-c1-10-l6-28",
              no: 28,
              text: "Which writer offers an example that the usual account cannot absorb?",
              answer: "b",
              explain:
                "Writer B karşı örneği veriyor: aynı hafta aynı ekipçe çizilen doğu kesimi «follows the watershed for ninety kilometres», ve kuramın bunu açıklaması gerektiğini söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-10-l6-29",
              no: 29,
              text: "Which writer says the practitioners knew this before the commentators did?",
              answer: "c",
              explain:
                "Writer C kaynağı gösteriyor: bulguların hepsi «in the field manuals of the 1930s», ve düzeltmeyi keşif diye sunanların tarihçiler olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-10-l6-30",
              no: 30,
              text: "Which writer draws attention to the cost of putting it right?",
              answer: "d",
              explain:
                "Writer D hatayı kabul edip bedeli sayıyor: yeniden ölçüm, işaretler, iki ayrı tapu sistemi ve dört yüz haneye tazminat. «The technical error is forty metres. The correction is a decade».",
            },
          ],
        },
        {
          id: "en-c1-10-l7",
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
              title: "Who repaints the markers",
              body: `A boundary is not maintained by treaties. It is maintained by about nine hundred concrete posts, and somebody has to look at them. {{31}}

The commission that owns the line meets twice a year and has no field staff. The posts are inspected, in practice, by two forestry teams who are paid for something else and who walk that ground anyway, and the arrangement has never been written down. {{32}}

What happens when a post is lost is more revealing than the treaty. It is replaced from the position of the two neighbouring posts, by people with a tape and an afternoon, and the replacement becomes the record for everybody who comes afterwards. {{33}}

There have been three proposals since 1990 to establish a permanent inspection unit. All three were costed, all three were affordable, and all three were abandoned at the point where somebody asked which of the two governments would employ the staff. {{34}}

The line, meanwhile, is being maintained perfectly adequately by two men with a chainsaw who do not know they are doing it, and everybody involved understands that this is not a plan.`,
              gloss: [
                { de: "a post", tr: "sınır direği", en: "post" },
                { de: "to inspect", tr: "denetlemek", en: "inspect" },
                { de: "a chainsaw", tr: "motorlu testere", en: "chainsaw" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "That question is not technical and it is not expensive, and it is the reason a file that everybody agrees about has been open for thirty-four years." },
            { key: "b", label: "b", body: "That sentence sounds trivial and it is the whole of boundary maintenance, which is why the subject has almost no literature and a great deal of practice." },
            { key: "c", label: "c", body: "Nobody has ever audited that arrangement, and if either forestry service reorganised, the line would go uninspected without a single decision having been taken about it." },
            { key: "d", label: "d", body: "The archive therefore documents a boundary that is, in several places, wherever two competent people with a tape decided it was in about 1978." },
            { key: "e", label: "e", body: "Concrete boundary posts of this pattern were first manufactured in 1911 and weigh approximately eighty kilograms each." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-10-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış sıradan görünen bir cümleyle bitiyor: «somebody has to look at them». (b) o cümlenin ağırlığını veriyor: sınır bakımının tamamı bu ve konunun yazını yok, uygulaması çok.",
            },
            {
              kind: "match",
              id: "en-c1-10-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "c",
              explain:
                "Paragraf denetimin kayıtsız bir düzenlemeye dayandığını anlatıyor: «the arrangement has never been written down». (c) bunun kırılganlığını gösteriyor: orman idaresi yeniden yapılansa çizgi denetimsiz kalır.",
            },
            {
              kind: "match",
              id: "en-c1-10-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "d",
              explain:
                "Paragraf yerine koyma işini anlatıyor: «by people with a tape and an afternoon», ve yeni direk sonraki herkes için kayıt oluyor. (d) sonucu arşiv açısından ifade ediyor: sınır «wherever two competent people with a tape decided it was in about 1978».",
            },
            {
              kind: "match",
              id: "en-c1-10-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "a",
              explain:
                "Paragraf üç önerinin de aynı soruda takıldığını söylüyor: personeli hangi hükümet istihdam edecek. (a) o sorunun niteliğini veriyor: teknik de pahalı da değil, yine de dosya otuz dört yıldır açık. (e) direklerin 1911'deki üretimi ve ağırlığından söz ediyor; metinde direğin yapımı ya da ağırlığı hiç tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-10-l8",
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
              label: "a — Surveyor",
              body: "People ask me where the boundary is and I tell them it depends what they are going to do with the answer. For a fence, the markers. For a court, the coordinates. For a conversation with a neighbour, the hedge. Those three are not in the same place and none of them is wrong, and the profession has known this since before I was trained.",
            },
            {
              key: "b",
              label: "b — Farmer",
              body: "My family has worked that field since 1931 and we have paid tax on it to one country the entire time. Then a man with a machine stood in the yard for two hours and told me that four hectares of it are in the other one. I do not dispute his machine. I dispute the idea that this is new information about my field.",
            },
            {
              key: "c",
              label: "c — Ministry official",
              body: "The file is open, it has been open since 1991, and I can tell you precisely why nothing has happened. Every option requires the two of us to agree who pays the surveyors, and that question is one grade above anybody who has ever been in the room. It is not a disagreement. It is an absence.",
            },
            {
              key: "d",
              label: "d — Historian",
              body: "I published a paper in 2011 arguing that the line followed a mediaeval parish boundary. I now think that is wrong, and the reason I thought it was the same reason three earlier writers thought it: the alternative explanation is undignified, and nobody wants a frontier that exists because two men did not want to climb a hill twice.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-10-l8-35",
              no: 35,
              text: "says that several different answers can all be correct",
              answer: "a",
              explain:
                "Metin üç ayrı cevabı sıralayıp hepsini geçerli sayıyor: «Those three are not in the same place and none of them is wrong».",
            },
            {
              kind: "match",
              id: "en-c1-10-l8-36",
              no: 36,
              text: "accepts the measurement but rejects what is inferred from it",
              answer: "b",
              explain:
                "Metin ayrımı açıkça kuruyor: «I do not dispute his machine. I dispute the idea that this is new information about my field».",
            },
            {
              kind: "match",
              id: "en-c1-10-l8-37",
              no: 37,
              text: "says the obstacle is that nobody has the authority to decide",
              answer: "c",
              explain:
                "Metin engeli adlandırıyor: soru «one grade above anybody who has ever been in the room», ve bunun anlaşmazlık değil bir yokluk olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-10-l8-38",
              no: 38,
              text: "withdraws a claim they published themselves",
              answer: "d",
              explain:
                "Metin geri adımı açıkça atıyor: «I published a paper in 2011 arguing that … I now think that is wrong».",
            },
            {
              kind: "match",
              id: "en-c1-10-l8-39",
              no: 39,
              text: "explains why an unflattering explanation is resisted",
              answer: "d",
              explain:
                "Metin gerekçeyi veriyor: «the alternative explanation is undignified, and nobody wants a frontier that exists because two men did not want to climb a hill twice».",
            },
            {
              kind: "match",
              id: "en-c1-10-l8-40",
              no: 40,
              text: "says the profession has understood this for a long time",
              answer: "a",
              explain:
                "Metin bilgi tarihini veriyor: «the profession has known this since before I was trained».",
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
          id: "en-c1-10-h1",
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
              situation: "Bir ölçüm uzmanı ile bir gazeteci sınır sorusunu konuşuyor.",
              plays: 2,
              segments: [
                { text: "So where is the boundary?" },
                { text: "That depends entirely on what you are going to do with the answer." },
                { text: "That sounds like an evasion." },
                { text: "It is the opposite of one. For a fence you want the markers. For a court you want the coordinates. For a conversation with a neighbour you want the hedge, and those three are about forty metres apart." },
                { text: "And which is the real one?" },
                { text: "The question has no answer, and the profession stopped asking it two generations ago. It is only outside the profession that people still expect there to be one." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki bakanlık görevlisi dosyanın neden açık kaldığını konuşuyor.",
              plays: 2,
              segments: [
                { text: "Thirty-four years. What is actually blocking it?" },
                { text: "Nothing that anybody in the file disagrees about. Both sides accept the technical position and both sides accept the remedy." },
                { text: "Then what?" },
                { text: "Somebody has to decide which ministry employs the surveyors, and that is a level above everyone who has ever attended. It is not a dispute. It is a vacancy." },
                { text: "Could it not be escalated?" },
                { text: "It could, once, by somebody willing to spend the credit. Nobody has ever thought forty metres of hillside was worth that, and they are probably right, which is why it will still be open in ten years." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Bir tarihçi kendi yayınını gözden geçiriyor.",
              plays: 2,
              segments: [
                { text: "You have written that your own paper was wrong." },
                { text: "It was, and I would like to be precise about the kind of wrong. The evidence I cited exists. The inference does not follow from it, and I made it because the alternative was embarrassing." },
                { text: "Embarrassing to whom?" },
                { text: "To the subject. A frontier that follows a mediaeval parish is a serious object. A frontier that exists because two tired men did not want to walk up a hill a second time is a joke, and it is also what happened." },
                { text: "Has the correction been taken up?" },
                { text: "The 2011 paper is cited about four times a year. The correction has been cited twice in six years, and one of those was by me." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-10-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the surveyor say about the question?",
              options: ["It cannot be answered honestly", "The answer depends on the purpose", "It is answered by the coordinates"],
              answer: 1,
              explain:
                "Uzman cevabı amaca bağlıyor: «That depends entirely on what you are going to do with the answer», ve üç ayrı kullanım için üç ayrı yanıt veriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h1-2",
              no: 2,
              ref: "a1",
              text: "Who does he say still expects a single answer?",
              options: ["People outside the profession", "Younger surveyors", "The courts in both countries"],
              answer: 0,
              explain:
                "Uzman ayrımı kuruyor: meslek bu soruyu iki kuşak önce bırakmış, «It is only outside the profession that people still expect there to be one».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h1-3",
              no: 3,
              ref: "a2",
              text: "What does the official say is blocking the file?",
              options: ["A disagreement about the technical position", "A disagreement about the remedy", "The absence of anybody able to decide"],
              answer: 2,
              explain:
                "Görevli iki tarafın da teknik durumu ve çözümü kabul ettiğini söylüyor: engel «a level above everyone who has ever attended. It is not a dispute. It is a vacancy».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h1-4",
              no: 4,
              ref: "a2",
              text: "Why has nobody escalated it?",
              options: ["The cost would not justify it", "The rules forbid escalation", "No record of the file exists"],
              answer: 0,
              explain:
                "Görevli hesabı veriyor: yükseltmek itibar harcamayı gerektirir ve «Nobody has ever thought forty metres of hillside was worth that, and they are probably right».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h1-5",
              no: 5,
              ref: "a3",
              text: "What kind of error does the historian describe?",
              options: ["A wrong inference from real evidence", "A misreading of a document", "A mistake in the dates"],
              answer: 0,
              explain:
                "Tarihçi hatayı sınıflandırıyor: «The evidence I cited exists. The inference does not follow from it».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h1-6",
              no: 6,
              ref: "a3",
              text: "What does he say about the correction?",
              options: ["It has replaced the earlier paper", "It was rejected by the journal", "It is hardly ever cited"],
              answer: 2,
              explain:
                "Tarihçi sayıları karşılaştırıyor: eski makale yılda dört kez anılıyor, düzeltme altı yılda iki kez ve «one of those was by me».",
            },
          ],
        },
        {
          id: "en-c1-10-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting the results of a boundary review. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir sınır incelemesinin sonuçlarını anlatan bir adamı dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir uzman sınır incelemesinin sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. These are the results of the review, and I will include the awkward ones. The section we examined runs for two hundred and forty kilometres and is marked by nine hundred and twelve posts. We located eight hundred and sixty-one of them. Of those, forty-three were more than ten metres from the position recorded in the archive, and the largest single discrepancy was ninety-four metres. The posts have been inspected, in practice, by two forestry teams, and no written agreement covering that work has ever existed. The last complete survey of this section was carried out in 1954. And the finding we did not expect: where the archive and the ground disagree, local land use follows the ground in every case we checked.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Boundary review — findings",
              body: `The section examined runs for {{7}} kilometres.

It is marked by {{8}} posts.

The team located {{9}} of them.

{{10}} posts were more than ten metres out of position.

The largest discrepancy was {{11}} metres.

The posts are inspected by two {{12}} teams.

The last complete survey was carried out in {{13}}.

Where the archive and the ground disagree, local land use follows the {{14}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-10-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["240", "two hundred and forty"],
              explain:
                "Kayıt uzunluğu veriyor: «The section we examined runs for two hundred and forty kilometres».",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["912", "nine hundred and twelve"],
              explain:
                "Aynı cümlenin ikinci sayısı direk sayısına ait: «marked by nine hundred and twelve posts».",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["861", "eight hundred and sixty-one"],
              explain:
                "«We located eight hundred and sixty-one of them» — bulunan direk sayısı, toplamdan az.",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["43", "forty-three"],
              explain:
                "«forty-three were more than ten metres from the position recorded in the archive» — on metreden fazla sapan direk sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["94", "ninety-four"],
              explain:
                "«the largest single discrepancy was ninety-four metres» — en büyük tekil sapma. On metre ise eşik değer.",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["forestry"],
              explain:
                "«The posts have been inspected, in practice, by two forestry teams» — denetimi fiilen yapan ekipler.",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["1954"],
              explain:
                "«The last complete survey of this section was carried out in 1954» — son tam ölçümün yılı.",
            },
            {
              kind: "gap",
              id: "en-c1-10-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["ground"],
              explain:
                "Beklenmeyen bulgu burada: «local land use follows the ground in every case we checked», yani arşive değil araziye uyuluyor.",
            },
          ],
        },
        {
          id: "en-c1-10-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear part of a panel discussion about correcting a boundary. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr:
            "Bir sınırın düzeltilmesi üzerine bir panel tartışmasının bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Tartışmayı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir yönetici, ölçüm uzmanı Mira, hukukçu Ondrej ve yerel temsilci Piet ile konuşuyor.",
              plays: 1,
              segments: [
                { text: "Mira, the survey says the line is forty metres out. Should it be moved?" },
                { text: "The survey does not say that. It says the posts and the archive disagree by up to ninety-four metres in places. Which of the two is out is a question the survey cannot answer, and I want that on the record before anybody quotes me." },
                { text: "Ondrej, legally?" },
                { text: "Legally the treaty text governs, and the treaty describes a watercourse that has since moved. So the law points at an object that is not where the law thinks it is, and every lawyer in this field knows it and none of us will say it in a filing." },
                { text: "Piet, from the village?" },
                { text: "Nobody there is confused about where the boundary is. They know exactly. It is the hedge, it has been the hedge since before the war, and the four hectares your survey has just reassigned have been farmed and taxed on one side for ninety years." },
                { text: "Mira, does long practice count for anything technically?" },
                { text: "Not in my report, and that is a limitation of the report rather than a judgement about the practice. I measure what is there. What weight anybody gives the hedge is a decision for somebody else, and I have been careful never to make it." },
                { text: "Ondrej, could the practice be given legal weight?" },
                { text: "In principle, yes, and doing so would open every other section of the frontier to the same argument. That is not a reason against it. It is a reason why nobody will do it for one village." },
                { text: "Piet, would you accept a correction if compensation followed?" },
                { text: "You are asking whether we would sell it. That is a fair question and my answer is that some would, but you would be buying the field, not the argument. The argument is about who was told and when, and no payment settles that." },
                { text: "So we are further apart than when we started." },
                { text: "I do not think we are apart at all. Mira has been describing the posts, Ondrej has been describing the text, and Piet has been describing the practice. Those are three different boundaries, and we have spent an hour assuming they were one." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-10-h3-15",
              no: 15,
              ref: "c1",
              text: "What does Mira say about the survey?",
              options: [
                "It shows that the line must be moved",
                "It was carried out with outdated instruments",
                "It confirms the position in the archive",
                "It cannot say which record is wrong",
              ],
              answer: 3,
              explain:
                "Mira raporunun sınırını çiziyor: direkler ile arşiv uyuşmuyor, ama «Which of the two is out is a question the survey cannot answer».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-16",
              no: 16,
              ref: "c1",
              text: "What is Ondrej's point about the treaty?",
              options: [
                "It has been formally superseded",
                "It refers to something that has moved",
                "It was never ratified by one of the parties",
                "It contains no description of the line",
              ],
              answer: 1,
              explain:
                "Ondrej sorunu adlandırıyor: «the treaty describes a watercourse that has since moved», dolayısıyla hukuk yerinde olmayan bir nesneyi gösteriyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-17",
              no: 17,
              ref: "c1",
              text: "What does Piet say about the village?",
              options: [
                "Opinion there is divided",
                "Nobody has been told about the recent survey",
                "People there know exactly where it is",
                "The land has changed hands several times",
              ],
              answer: 2,
              explain:
                "Piet belirsizliği reddediyor: «Nobody there is confused about where the boundary is. They know exactly. It is the hedge».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-18",
              no: 18,
              ref: "c1",
              text: "How does Mira treat the question of long practice?",
              options: [
                "As outside what her report can address",
                "As evidence stronger than the archive",
                "As irrelevant to any decision",
                "As a matter for the courts to decide alone",
              ],
              answer: 0,
              explain:
                "Mira sınırı raporuna koyuyor: «that is a limitation of the report rather than a judgement about the practice … I have been careful never to make it».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-19",
              no: 19,
              ref: "c1",
              text: "Why does Ondrej say practice will not be given weight?",
              options: [
                "The courts have already refused to hear it",
                "It would contradict the survey",
                "It cannot be proved from documents",
                "It would apply everywhere else too",
              ],
              answer: 3,
              explain:
                "Ondrej sonucu genelleştiriyor: uygulamaya hukuki ağırlık vermek «would open every other section of the frontier to the same argument», bu yüzden tek köy için yapılmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-20",
              no: 20,
              ref: "c1",
              text: "How does Piet answer the question about compensation?",
              options: [
                "He rejects the idea of any payment",
                "He says a payment would settle it",
                "He says it buys the field only",
                "He says the village has never discussed it",
              ],
              answer: 2,
              explain:
                "Piet ayrımı kuruyor: «you would be buying the field, not the argument. The argument is about who was told and when».",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-21",
              no: 21,
              ref: "c1",
              text: "How does the chair sum up the discussion?",
              options: [
                "As having produced a proposal everybody supports",
                "As having moved them further apart",
                "As having settled the technical question",
                "As having identified who must decide",
              ],
              answer: 1,
              explain:
                "Yönetici toparlarken «So we are further apart than when we started» diyor; bu özet hemen ardından düzeltiliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-10-h3-22",
              no: 22,
              ref: "c1",
              text: "What correction is made to that summary?",
              options: [
                "The speakers agree on the remedy",
                "One speaker has changed position",
                "The survey has been misquoted by everybody throughout",
                "The three were discussing different things",
              ],
              answer: 3,
              explain:
                "Son konuşmacı ayrımı adlandırıyor: direkler, metin ve uygulama «three different boundaries, and we have spent an hour assuming they were one».",
            },
          ],
        },
        {
          id: "en-c1-10-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about boundaries and maps. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Sınırlar ve haritalar üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to correct a common belief about how a line was drawn" },
            { key: "b", label: "to explain why an obvious repair has not been made" },
            { key: "c", label: "to describe a practice that has quietly replaced the rule" },
            { key: "d", label: "to say that the dispute is really about an older document" },
            { key: "e", label: "to report that the evidence surprised the people who collected it" },
            { key: "f", label: "to identify who is absent from the negotiation" },
            { key: "g", label: "to concede a point they had long resisted" },
            { key: "h", label: "to warn that a technical fix will create a political problem" },
            { key: "i", label: "to withdraw something they published" },
            { key: "j", label: "to point out that the cost falls where nobody is looking" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı yaygın bir inancı düzeltiyor.",
              plays: 2,
              segments: [
                { text: "Everybody repeats that the line was drawn with a ruler by men who had never been there. Half of that is true. They had not been there, and they were working from a survey done on foot by somebody who had, which is why the eastern half follows the watershed to within about eleven metres." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı dosyanın neden kapanmadığını anlatıyor.",
              plays: 2,
              segments: [
                { text: "The survey costs about ninety thousand and both ministries have that. What neither of them has is the authority to say which one pays, and there is no committee above them that meets. So the file stays open, and it stays open for a reason that would take one letter to solve." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı fiilî düzeni anlatıyor.",
              plays: 2,
              segments: [
                { text: "There is a written procedure for replacing a lost marker and it has not been used since 1968. What actually happens is that whichever forestry team finds the stump puts a new post in from the two neighbours, tells nobody, and the line goes on being where they put it." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı tartışmanın asıl konusunu gösteriyor.",
              plays: 2,
              segments: [
                { text: "Nobody has spent nine years on forty metres of hillside. What is being fought over is the abstraction agreement of 1963, which allocates water by reference to the boundary. Move the line and you move the allocation, and that is what both delegations are actually protecting." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı beklenmedik bir bulguyu anlatıyor.",
              plays: 2,
              segments: [
                { text: "We expected land use to follow the archive, because the archive is what the tax office holds. It does not. In all eleven sections we checked, the fields, the fences and the payments follow the posts, including where the posts are demonstrably in the wrong place. Nobody on the team had predicted that." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı görüşmede kimin bulunmadığını söylüyor.",
              plays: 2,
              segments: [
                { text: "There are two delegations, four lawyers and a chair. The eleven households whose fields are cut by the line have never been in the room, and the procedure has no mechanism for putting them there. They are described throughout as the affected population, which is accurate and is not the same as present." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı uzun süre direndiği bir noktayı kabul ediyor.",
              plays: 2,
              segments: [
                { text: "I argued for eleven years that the coordinates should govern, because they are the only element that does not decay. I still think that is true and I no longer think it is decisive. A record that nobody on the ground has ever used is not governing anything; it is only waiting to be discovered." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı teknik çözümün sonucunu anlatıyor.",
              plays: 2,
              segments: [
                { text: "Satellite positioning solves the measurement problem completely and it creates a new one. Once the line can be established to a centimetre, every discrepancy becomes a decision that somebody has to take publicly. Ambiguity was doing a great deal of work, and we are about to remove it without having agreed what replaces it." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-10-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı yaygın anlatıyı yarı yarıya düzeltiyor: çizenler yerinde bulunmamış ama «working from a survey done on foot by somebody who had».",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "b",
              explain:
                "Konuşmacı paranın da çözümün de var olduğunu, eksik olanın yetki olduğunu söylüyor: «it stays open for a reason that would take one letter to solve».",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı yazılı usul ile fiilî uygulamayı karşılaştırıyor: usul 1968'den beri kullanılmıyor, «the line goes on being where they put it».",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Konuşmacı asıl konuyu gösteriyor: «What is being fought over is the abstraction agreement of 1963», çünkü su tahsisi sınıra bağlı.",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı beklentiyi ve bulguyu karşı karşıya koyuyor: «We expected land use to follow the archive … Nobody on the team had predicted that».",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Konuşmacı eksik tarafı adlandırıyor: on bir hane «have never been in the room», ve usulde onları getirecek bir mekanizma yok.",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "g",
              explain:
                "Konuşmacı savını korurken belirleyiciliğini bırakıyor: «I still think that is true and I no longer think it is decisive».",
            },
            {
              kind: "match",
              id: "en-c1-10-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Konuşmacı teknik çözümün doğuracağı yeni sorunu uyarıyor: «Ambiguity was doing a great deal of work, and we are about to remove it without having agreed what replaces it».",
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
          id: "en-c1-10-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on boundaries and records. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. Where a record and long local practice disagree, the record should govern, because it can be checked by anybody.\n2. Where they disagree, practice should govern, because it reflects how people have actually lived.\n\nWrite 220 to 260 words.",
          promptTr:
            "Sınırlar ve kayıtlar üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Kayıt ile yerleşik uygulama çeliştiğinde kayıt esas alınmalı; çünkü kaydı herkes denetleyebilir.\n2. Çeliştiklerinde uygulama esas alınmalı; çünkü insanların gerçekte nasıl yaşadığını gösterir.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two positions are usually treated as a contest between objectivity and sentiment, which misrepresents the second and flatters the first.

The case for the record is that it is inspectable. A coordinate can be checked by a stranger, in another country, fifty years later, and that property is what allows a boundary to be argued about rather than fought over. Practice, by contrast, is known only to those who follow it, and the person who benefits from it is generally the person asserting it.

The case for practice is not sentimental. It rests on the observation that a record which nobody has ever acted on is not governing anything. Where surveys have compared them, land use, fences and tax payments follow the markers on the ground even where the markers are demonstrably in the wrong place, and a rule that describes nothing anybody does is a rule in name only.

On balance the second point seems to me the more important, though only in a restricted form. The reason is not fairness but function: an authority that corrects a line against ninety years of use is not clarifying a boundary; it is creating a dispute where none existed.

My own view is that the argument conceals a category error. The text, the markers and the practice are not three accounts of one boundary. They are three boundaries, and the useful question is which of them a particular decision needs, rather than which of them is real.`,
            criteria: [
              "İki nokta da adil ve tam özetlendi mi?",
              "Seçim gerekçelendirildi mi ve gerekçe özetten çıkıyor mu?",
              "Kendi görüş özetin tekrarı değil, ayrı bir sav mı?",
              "Adlaştırma ve çekimserlik belirteçleri kullanıldı mı? (on balance, by contrast, in a restricted form)",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-10-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "An organisation you know maintains a set of physical markers or records that nobody has checked for many years. Write a report for its committee. Describe the present position, assess what would follow from a full check, and recommend a course of action. Write 220 to 260 words.",
          promptTr:
            "Tanıdığın bir kuruluş, yıllardır kimsenin denetlemediği bir dizi fiziksel işaret ya da kaydı elinde tutuyor. Yönetim kuruluna bir rapor yaz. Bugünkü durumu anlat, tam bir denetimden neyin doğacağını değerlendir ve bir yol öner. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the present position precisely.", tr: "Bugünkü durumu kesin biçimde anlat." },
              { de: "Assess what a full check would produce, including what is unwelcome.", tr: "Tam denetimin neyi ortaya çıkaracağını, istenmeyen sonuçlar dahil, değerlendir." },
              { de: "Recommend a course of action, including what you would not do.", tr: "Bir yol öner; neyi yapmayacağını da söyle." },
            ],
            sample: `Report: the site boundary markers

Present position
The site is defined by fourteen markers set in 1974. Our records consist of a hand-drawn plan and a schedule of distances. Neither has been checked against the ground since 1991. Two markers are known to have been replaced by contractors, in positions established from the neighbouring pair, and no note of either replacement exists.

What a full check would produce
It would produce a defensible plan, and it would almost certainly produce at least one discrepancy of a size that requires a decision. On the northern edge our fence has stood for thirty years in a position that the schedule does not support, and the neighbouring owner has maintained the hedge on our side of it throughout.

That is the uncomfortable part and the committee should see it now rather than in a solicitor's letter. A check we commission is one we control; a check prompted by a sale is not.

Recommendation
I recommend commissioning a survey this year, and I recommend that the report be written to us and retained rather than circulated.

I would not move any fence on the basis of it, and I would not approach the neighbouring owner until we have taken advice, since raising a question we cannot answer converts a settled arrangement into a dispute.`,
            criteria: [
              "Bugünkü durum somut biçimde ve tarihleriyle anlatıldı mı?",
              "Denetimin istenmeyen sonucu açıkça söylendi mi?",
              "Öneri uygulanabilir mi ve neyin yapılmayacağı gerekçesiyle verildi mi?",
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
          id: "en-c1-10-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about maps, records and the difference between them and the ground.",
          promptTr: "Sana haritalar, kayıtlar ve bunlarla arazi arasındaki fark hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Where have you noticed a map or a plan being wrong about a place you know?", tr: "İyi günler. Bildiğin bir yer hakkında bir haritanın ya da planın yanıldığını nerede fark ettin?" },
            { who: "you", hint: "Somut bir örnek ver ve genel bir gözleme bağla.", expect: "somut bir örnekten genel bir gözleme geçmek", seconds: 45 },
            { who: "partner", de: "Thank you. Has a record ever settled something that people around you already knew?", tr: "Teşekkürler. Bir kayıt, çevrendekilerin zaten bildiği bir şeyi hiç karara bağladı mı?" },
            { who: "you", hint: "Tek bir olayı sonucuyla anlat.", expect: "tek bir olayı sonucuyla anlatmak", seconds: 45 },
            { who: "partner", de: "And if a document and long local practice disagreed, which would you follow?", tr: "Bir belge ile yerleşik yerel uygulama çelişse hangisine uyardın?" },
            { who: "you", hint: "Bir ölçüt öner ve gerekçelendir.", expect: "varsayımsal bir çatışmada ölçüt önermek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "move from an example to a general observation", tr: "Örnekten genel bir gözleme geçmek" },
              { de: "narrate one event with its outcome", tr: "Tek bir olayı sonucuyla anlatmak" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önerip gerekçelendirmek" },
            ],
            sample:
              "The plan of my parents' building shows a corridor where there has been a wall since about 1980, and every official who visits works from the plan and is briefly confused. When the flats were sold, the surveyor's report finally recorded the wall, and what struck me was that nothing on the ground changed; only the possibility of arguing about it disappeared. If a document and a long practice disagreed, I would follow the document only where somebody outside has to be able to check the answer, and follow the practice everywhere else, because a rule that describes nothing anybody does is not doing any work.",
            criteria: [
              "İlk cevap örnekten gözleme geçebildi mi?",
              "Anlatı tek ve belirgin mi, sonucu verildi mi?",
              "Son cevapta bir ölçüt önerildi ve savunuldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-c1-10-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. Compare these two responses to a boundary that has been found to be in the wrong place, say which you would defend and explain one serious objection to your own position: correcting the line to match the record, or amending the record to match what people have long done.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Yanlış yerde olduğu anlaşılan bir sınıra verilecek şu iki karşılığı karşılaştır, hangisini savunacağını söyle ve kendi konumuna yöneltilebilecek ciddi bir itirazı açıkla: çizgiyi kayda uydurmak mı, kaydı insanların uzun süredir yaptığına uydurmak mı?",
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
              "Correcting the line has one decisive merit: it preserves the principle that a written record means what it says, and a system in which records can be amended to match whatever has happened is a system with no records at all. Against that, it takes a settled arrangement that has functioned for ninety years and converts it into a dispute, and the people who bear that are eleven households who were not consulted about the original line either. Amending the record accepts the ground as it is and is far cheaper in every sense. I would defend amending it. The serious objection to my own position is precedent, and it is not a weak one: once a record can be adjusted to fit practice, the party with the most established practice acquires an interest in creating more of it, and the record loses precisely the property that made it worth keeping.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Konum gerekçelendirildi mi?",
              "Kendi konumuna yöneltilen itiraz ciddi mi?",
              "İki dakika akıcı ve düzenli konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-c1-10-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A commission can commit to one change in how the boundary is handled. Talk with me about the options, then agree on a rule rather than on a single decision.",
          promptTr:
            "Bir komisyon, sınırın nasıl ele alındığı konusunda tek bir değişikliğe söz verebiliyor. Seçenekleri benimle konuş, sonra tek bir karar üzerinde değil bir kural üzerinde anlaş.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: a full resurvey, a permanent inspection unit, a rule giving weight to long practice, or a requirement that affected households sit in the room. Where would you begin?", tr: "Seçenekler: tam bir yeniden ölçüm, kalıcı bir denetim birimi, yerleşik uygulamaya ağırlık veren bir kural ya da etkilenen hanelerin görüşmede bulunmasını zorunlu kılmak. Nereden başlardın?" },
            { who: "you", hint: "Bir seçenek seç ve seçimi açık bir ölçüte bağla.", expect: "bir seçeneği seçmek ve açık bir ölçütle gerekçelendirmek", seconds: 45 },
            { who: "partner", de: "But a resurvey produces facts that somebody then has to act on, and at present nobody has the authority to act. Does that not make your criterion useless here?", tr: "Ama yeniden ölçüm, sonra birinin harekete geçmesi gereken olgular üretir ve şu an kimsenin yetkisi yok. Bu ölçütünü burada işe yaramaz kılmıyor mu?" },
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
              "I would begin with the inspection unit, on the criterion that it is the only option which produces information continuously rather than once. You are right that information without authority is worse than useless, and I want to concede that fully rather than qualify it: a survey that nobody can act on creates a liability and closes nothing. What survives from my criterion is the preference for continuous over single-shot. So the rule we write down is this: no commission may commission a finding it has no power to act on, and any body proposing a survey must name, in the same paper, the person who will decide what follows from it.",
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

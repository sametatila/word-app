import type { MockPaper } from "../types";

/**
 * B2 · Deneme 4 — "Museums, Heritage and Ownership".
 *
 * B2'nin öteki üç denemesiyle AYNI PLAN; konu ayrı. Müze ve miras tartışması
 * B2 için verimli çünkü aynı metinde belge dili, çıkar çatışması ve çekimser
 * yargı bir arada bulunuyor; okuma 5 ile dinleme 4'ün ölçtüğü görüş becerisi
 * tam olarak bunu istiyor.
 *
 * B2 İMZALARI: edilgen, ileri bağlayıcı, üçüncü tip koşul ve ortaç öbeği
 * boşluksuz metinlerde geçiyor — imza taraması `{{n}}` işaretini sözcük
 * saymadığı için boşluklu görevlere yerleştirmek işe yaramıyor.
 */
export const EN_B2_04: MockPaper = {
  id: "en-b2-04",
  course: "en",
  level: "B2",
  no: 4,
  theme: "Museums, Heritage and Ownership",
  themeTr: "Müzeler, miras ve sahiplik",
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
          id: "en-b2-04-l1",
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
              title: "The object that came back",
              body: `A museum that returns an object is usually described as {{1}} something up, which is a strange way to describe keeping a promise.

The collections of most large European museums were assembled at a time when the question of consent simply did not {{2}}. A receipt exists; a negotiation rarely does.

The difficulty {{3}} in the ninety thousand objects that nobody has ever asked about, rather than in the famous cases, which are argued in public and eventually resolved.

Several museums have now {{4}} their acquisition records available online. Early results suggest that requests rise sharply in the first year and then fall back, which the directors had not expected.

Critics say the exercise is designed to {{5}} attention away from the real question, and that criticism deserves an answer rather than a press release.

The pattern deserves {{6}} attention, because a queue that never forms is not the same as a queue that has been dealt with.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-04-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["taking", "giving", "putting", "holding"],
              answer: 1,
              explain:
                "`give something up` bir şeyden vazgeçmek demektir ve cümlenin ironisi buna dayanıyor. `take up` bir işe başlamak, `put up` inşa etmek ya da katlanmak, `hold up` geciktirmek anlamına gelir.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["raise", "rise", "lift", "arise"],
              answer: 3,
              explain:
                "Bir sorunun ortaya çıkması `arise` ile anlatılır ve fiil nesne almaz. `raise` nesne ister (bir soru YÖNELTMEK), `rise` yükselmek demektir ve soru öznesiyle kullanılmaz, `lift` ise fiziksel bir kaldırmadır.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["lies", "lays", "stands", "sets"],
              answer: 0,
              explain:
                "`the difficulty lies in …` sabit bir kalıptır: güçlük şurada yatıyor. `lay` nesne isteyen bir fiildir ve burada nesne yok; `stand` ve `set` bu kalıpta kullanılmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["done", "set", "made", "given"],
              answer: 2,
              explain:
                "`make something available` sabit bir eşdizim: erişilebilir kılmak. `give available` ve `do available` İngilizcede yoktur; `set available` de kalıp değildir.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["draw", "attract", "pull", "carry"],
              answer: 0,
              explain:
                "`draw attention away from something` dikkati başka yöne çekmenin kalıbıdır. `attract attention` yalnız dikkat çekmek anlamına gelir ve `away from` ile birlikte kullanılmaz; `pull` ve `carry` bu adla eşdizim kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["nearer", "stronger", "wider", "closer"],
              answer: 3,
              explain:
                "`closer attention` daha dikkatli inceleme demektir ve sabit bir eşdizimdir. `nearer` fiziksel yakınlık bildirir; `stronger` ve `wider` bu adla birlikte kullanılmaz.",
            },
          ],
        },
        {
          id: "en-b2-04-l2",
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
              title: "What visitors do with a label",
              body: `A label that explains an object is read by a small minority of visitors, {{7}} the exact proportion depends on the gallery.

In one experiment, visitors {{8}} had been given a printed guide spent longer in front of three objects and less time in the room overall.

The finding has been replicated often enough {{9}} it is no longer disputed.

What remains unclear is the reason, {{10}} matters because different explanations imply different designs.

Curators are therefore being asked to treat attention {{11}} a limited resource rather than as an unlimited one, which is a much harder brief.

The change has been resisted, and not {{12}} good reason: a gallery that explains nothing is not a solution either.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-04-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["although", "though"],
              explain:
                "İki yarı arasında bir kabul-çekince ilişkisi var: oran küçük, ama tam değeri değişiyor. `although` ve `though` bu ödünü verir. `because` sebep kurar ve ikinci yarıyı birincinin gerekçesi yapar, oysa değil.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["who", "that"],
              explain:
                "Boşluk `visitors` adını niteleyen bir yan cümle başlatıyor ve öncül insan; `who` ya da `that` gelir. `which` yalnız cansız öncüller için kullanılır.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["that"],
              explain:
                "`often enough that …` bir dereceyi sonucuna bağlar. `so` burada gelemez çünkü dereceyi zaten `enough` taşıyor; `to` ise mastar ister ve ardından çekimli yüklem gelemez.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["which"],
              explain:
                "Virgülden sonra gelen ve önceki savın tamamına gönderme yapan yan cümle `which` ile kurulur. `that` açıklayıcı yan cümlede kullanılmaz; `what` ise kendi öncülünü taşıyacağı için gönderme yerini boş bırakırdı.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["as"],
              explain:
                "`treat something as something` bir şeyi bir şey saymanın kalıbıdır ve cümlenin ikinci yarısı (`rather than as an unlimited one`) aynı edatı tekrarlayarak boşluğu belirliyor. `like` bu yapıda resmî metinde kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["without"],
              explain:
                "`not without good reason` iki olumsuzu üst üste koyup bir kabul bildirir: direnişin haklı bir yanı var. `for good reason` da doğaldır ama `not` ile birlikte anlamı tersine çevirirdi.",
            },
          ],
        },
        {
          id: "en-b2-04-l3",
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
              title: "Provenance research",
              body: `Provenance research is the process by which the history of an object's {{13}} is established, from the workshop that made it to the case it stands in today.

Its defenders describe it as a duty. Its critics point to its {{14}}: a single object can occupy a specialist for two years, and most museums employ nobody at all.

Neither description settles the matter. Research rarely produces a clean answer, and it is not {{15}} to do so, because the records it depends on were often written by the people with most to hide.

What it does well is narrower and still valuable: it turns a vague {{16}} into a documented one, so that a claim can be discussed rather than merely felt.

Several countries have now funded shared teams, in which specialists move between institutions. Early results suggest a marked {{17}} in the number of files completed each year.

The most likely future is therefore an uneven one, with different countries acting according to their own political {{18}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-04-l3-13",
              no: 13,
              text: "OWN",
              accept: ["ownership"],
              explain:
                "`an object's ___` yapısında iyelik ekinden sonra bir ad gerekiyor ve cümle nesnenin kime ait olduğunun tarihinden söz ediyor: `ownership`. `owner` bir kişiyi adlandırır ve bir kişinin tarihi burada kastedilmiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l3-14",
              no: 14,
              text: "SLOW",
              accept: ["slowness"],
              explain:
                "İki nokta üst üstenin ardındaki açıklama süreyi anlatıyor: tek nesne bir uzmanı iki yıl meşgul ediyor. Eleştiri YAVAŞLIĞA yapılıyor ve `its` iyelik sıfatı bir ad istiyor: `slowness`. Sıfat biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l3-15",
              no: 15,
              text: "DESIGN",
              accept: ["designed"],
              explain:
                "`it is not ___ to do so` yapısı edilgen bir ortaç ister: araştırma bunun için TASARLANMAMIŞ. `design` fiilinin üçüncü hâli bu edilgeni kurar; ad biçimi (`designer`) cümleyi anlamsız yapar.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l3-16",
              no: 16,
              text: "SUSPECT",
              accept: ["suspicion"],
              explain:
                "`a vague ___` yapısında sıfattan sonra bir ad geliyor ve karşıtı hemen veriliyor: belirsiz bir kuşku, belgelenmiş bir kuşkuya dönüşüyor. `suspicious` sıfattır ve `a vague` ile yan yana gelemez.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l3-17",
              no: 17,
              text: "GROW",
              accept: ["growth"],
              explain:
                "`a marked ___ in the number` yapısında `a` ile `in` arasında bir ad var: `growth`. Fiilin ulaç biçimi (`growing`) belirsiz tanımlıkla birlikte bu ad öbeğini kuramaz.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l3-18",
              no: 18,
              text: "CALCULATE",
              accept: ["calculations"],
              explain:
                "`their own political ___` yapısında iki sıfattan sonra bir ad geliyor ve özne çoğul (`different countries`), dolayısıyla ad da çoğul: `calculations`. Fiil biçimi bu konumda duramaz.",
            },
          ],
        },
        {
          id: "en-b2-04-l4",
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
              id: "en-b2-04-l4-19",
              no: 19,
              text: "The museum did not tell the family where the painting was.\nThe family ______ where the painting was.",
              cue: "TOLD",
              accept: ["were not told", "was not told"],
              explain:
                "Etken olumsuz cümle edilgene çevriliyor: dolaylı nesne (`the family`) özne oluyor. Anahtar sözcük `told` üçüncü hâl olduğu için `be` yardımcı fiili zorunlu; `family` İngilizcede hem tekil hem çoğul yüklem alabildiği için iki biçim de kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l4-20",
              no: 20,
              text: "They only discovered the letter after the case had closed.\nNot until the case had closed ______ the letter.",
              cue: "DID",
              accept: ["did they discover"],
              explain:
                "Olumsuz bir zaman öbeği («Not until …») cümle başına geçtiğinde özne ile yardımcı fiil yer değiştirir: «did they discover». Anahtar sözcük `did` bu devrik yapının yardımcı fiili; ardından yalın fiil gelir.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l4-21",
              no: 21,
              text: "It is possible that the label was written in the 1930s.\nThe label ______ in the 1930s.",
              cue: "HAVE",
              accept: ["may have been written", "might have been written", "could have been written"],
              explain:
                "Geçmişe dair olasılık `may/might/could + have + üçüncü hâl` ile kurulur ve cümle edilgen olduğu için `been` de gerekiyor. Anahtar sözcük `have` bu zincirin ortasında değişmeden duruyor.",
            },
            {
              kind: "gap",
              id: "en-b2-04-l4-22",
              no: 22,
              text: "We should not have published the photograph.\nPublishing the photograph ______.",
              cue: "MISTAKE",
              accept: ["was a mistake"],
              explain:
                "`should not have + üçüncü hâl` geçmişe dönük bir pişmanlık bildiriyor; bu, ulaç özneli bir yargı cümlesine çevriliyor. Anahtar sözcük ad olduğu için önüne hem bağ fiil hem belirsiz tanımlık gerekiyor.",
            },
          ],
        },
        {
          id: "en-b2-04-l5",
          no: 5,
          format: "mcq",
          goal: "opinion",
          prompt: "Read the article and questions 23 to 27. Choose a, b, c or d.",
          promptTr: "Yazıyı ve 23–27. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t5",
              genre: "Newspaper column",
              genreTr: "Gazete köşe yazısı",
              title: "What I learned from writing one label",
              body: `Two years ago I was asked to rewrite a single label in the gallery where I work, and I want to describe what that took, because the answer surprised me and it explains a great deal about museums.

The object is a carved wooden figure about sixty centimetres high. The old label gave a date, a region and the name of the man who brought it to Europe in 1897. It did not say how he obtained it, because the file does not say, and for eighty years nobody had asked the file.

My first draft named the expedition and described it accurately. It was rejected, and the reason given was not a political one. It was that the label had grown to a hundred and forty words, and a visitor reads about thirty.

I spent four months on the second draft. What eventually worked was not a longer text but a shorter one with a question inside it: we do not know how this object left its community, and we are trying to find out. Visitors stopped in front of it. Several of them wrote to us. If I had put that sentence in my first draft, I would have saved four months and a great deal of argument.

I am not going to claim that a label changes anything material. The figure is still here, and the question of where it should be is not decided by a curator with a word count. Nevertheless, the exercise changed how I read every other label in the building, most of which state a fact and hide a process.

What I would recommend to any museum is not a policy but a habit: take one object a month and write down what you do not know about it. Given enough months, the gaps stop looking like accidents and start looking like a pattern.`,
              gloss: [
                { de: "a label", tr: "etiket, tanıtım kartı", en: "museum label" },
                { de: "an expedition", tr: "sefer, keşif gezisi", en: "expedition" },
                { de: "a word count", tr: "kelime sınırı", en: "word count" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-04-l5-23",
              no: 23,
              text: "Why did the old label not explain how the object was obtained?",
              options: ["The museum had decided not to say", "The information was thought to be private by the trustees", "The file itself does not contain that information", "The man who brought it refused to explain"],
              answer: 2,
              explain:
                "Metin sebebi doğrudan veriyor: «because the file does not say, and for eighty years nobody had asked the file». Bir karar ya da ret değil, kayıtta bulunmayan bir bilgi söz konusu.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l5-24",
              no: 24,
              text: "Why was the first draft rejected?",
              options: ["It was too long for a visitor to read", "It named the expedition", "It was considered politically unacceptable", "It contained a factual error"],
              answer: 0,
              explain:
                "Yazı gerekçeyi açıkça siyasetin dışına koyuyor: «the reason given was not a political one», ardından sayıyı veriyor: yüz kırk kelimelik bir etiket, otuz kelime okuyan bir ziyaretçi. Metin doğru yazılmıştı, yani hata da yok.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l5-25",
              no: 25,
              text: "What made the second draft work?",
              options: ["It was longer and more detailed", "It removed the date and the region", "It was written by a committee", "It admitted what was not known"],
              answer: 3,
              explain:
                "İşe yarayan şey uzunluk değil, itiraf: «we do not know how this object left its community, and we are trying to find out». Metin tersine kısalmış; tarih ve bölgenin çıkarıldığı da hiç söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l5-26",
              no: 26,
              text: "What does the writer say about the effect of the label?",
              options: ["It settled the question of where the object belongs", "It changed how she reads other labels", "It increased visitor numbers considerably", "It persuaded the museum to return the figure"],
              answer: 1,
              explain:
                "Yazar maddi etkiyi reddedip tek gerçek etkiyi adlandırıyor: «the exercise changed how I read every other label in the building». Heykel hâlâ orada ve aidiyet sorusu bir küratör tarafından çözülmüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-l5-27",
              no: 27,
              text: "What does the writer recommend to museums?",
              options: ["Rewriting every label in the building", "A monthly habit of recording what is unknown", "Adopting a written policy on restitution claims", "Employing more provenance researchers"],
              answer: 1,
              explain:
                "Son paragraf ayrımı kendisi yapıyor: «not a policy but a habit: take one object a month and write down what you do not know about it». Politika seçeneği doğrudan reddediliyor.",
            },
          ],
        },
        {
          id: "en-b2-04-l6",
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
              genre: "Culture feature",
              genreTr: "Kültür yazısı",
              title: "Why a copy is not always the lesser thing",
              body: `The word replica carries an insult that the objects themselves do not deserve. A plaster cast made in 1870 can now be the only surviving record of a surface that has since weathered away. {{28}}

Consider the casts of medieval doorways collected by nineteenth-century art schools. Most were thrown out in the 1960s as embarrassing. {{29}}

The same reversal has happened with photographs. An image commissioned to advertise a department store is now the only evidence of a room that was demolished in 1954. {{30}}

Some museums have begun to catalogue their copies with the same care as their originals. The change is slow and it is resisted, largely because it complicates a story that donors find easy to understand. {{31}}

None of this argues that a copy equals an original, which it plainly does not. It argues that the value of an object is not fixed at the moment it is made.`,
              gloss: [
                { de: "a replica", tr: "kopya, replika", en: "replica" },
                { de: "a plaster cast", tr: "alçı kalıp", en: "plaster cast" },
                { de: "to weather away", tr: "aşınıp yok olmak", en: "weather away" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Those that survived are now consulted by conservators who cannot reach the buildings themselves." },
            { key: "b", label: "b", body: "That resistance tells you what the simpler story was doing for the museum." },
            { key: "c", label: "c", body: "In that case the copy has quietly become the original, and no label says so." },
            { key: "d", label: "d", body: "Nobody who commissioned it imagined that it would one day be evidence of anything." },
            { key: "e", label: "e", body: "Admission charges for temporary exhibitions have risen faster than inflation since 2010." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-04-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "c",
              explain:
                "Boşluktan önce kalıbın «the only surviving record» hâline geldiği söyleniyor; (c) bundan çıkarımı yapıyor: kopya sessizce aslın yerini almış ve hiçbir etiket bunu yazmıyor. «In that case» doğrudan o duruma gönderme.",
            },
            {
              kind: "match",
              id: "en-b2-04-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "a",
              explain:
                "Paragraf kalıpların çoğunun atıldığını söylüyor; (a) «Those that survived» ile kalanlara gönderme yapıp bugünkü işlevlerini veriyor. Atılanlar ile kalanlar arasındaki karşıtlık bağı kuruyor.",
            },
            {
              kind: "match",
              id: "en-b2-04-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "d",
              explain:
                "Önceki cümle fotoğrafın «the only evidence of a room that was demolished in 1954» hâline geldiğini anlatıyor; (d) sipariş edenin niyetine dönüyor: kimse bunun bir gün kanıt olacağını düşünmemişti. Amaç ile sonuç arasındaki uçurumu adlandırıyor.",
            },
            {
              kind: "match",
              id: "en-b2-04-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Önceki cümle direnci ve gerekçesini veriyor: «it complicates a story that donors find easy to understand». (b) direncin kendisinden bir çıkarım yapıyor. (e) müze giriş ücretlerinden söz ediyor ve metnin hiçbir yerinde ücret tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-04-l7",
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
              label: "a — Berk, museum director",
              body: "We returned two objects last year and I was warned that it would start a flood. It did not. What it started was three years of correspondence about a fourth object that we still cannot trace, and that work is the real cost, not the loss of the objects themselves.",
            },
            {
              key: "b",
              label: "b — Hulya, archaeologist",
              body: "Everybody wants to discuss the famous pieces. Meanwhile the site itself is being dug up at night and sold in fragments, and that removes more material every month than any single museum holds. The argument is aimed at the wrong century.",
            },
            {
              key: "c",
              label: "c — Onur, teacher",
              body: "My students can argue about ownership for an hour without once asking who wrote the record we are reading. That is the harder skill and we barely teach it, because it is slower and there is nothing satisfying to disagree about at the end.",
            },
            {
              key: "d",
              label: "d — Zehra, conservator",
              body: "I am asked whether an object is safer here. Sometimes it is, and saying so out loud is unpopular. But safety is a question about buildings and money, and it is used as though it were a question about rights, which it is not.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-04-l7-32",
              no: 32,
              text: "Which text says that the real cost was not the objects themselves?",
              answer: "a",
              explain:
                "Berk maliyeti yeniden tanımlıyor: «that work is the real cost, not the loss of the objects themselves» — üç yıllık yazışma. Nesnelerin gitmesi ona göre bedelin kendisi değil.",
            },
            {
              kind: "match",
              id: "en-b2-04-l7-33",
              no: 33,
              text: "Which text argues that the debate is aimed at the wrong period?",
              answer: "b",
              explain:
                "Hulya bugünkü kaybı öne çıkarıyor: kazı alanı gece kazılıp parçalanarak satılıyor ve «The argument is aimed at the wrong century». Tartışma geçmişte, sorun şimdide.",
            },
            {
              kind: "match",
              id: "en-b2-04-l7-34",
              no: 34,
              text: "Which text describes a skill that is rarely taught?",
              answer: "c",
              explain:
                "Onur eksik beceriyi adlandırıyor: kaydı kimin yazdığını sormak. «That is the harder skill and we barely teach it» ve gerekçesini de veriyor: yavaş ve tartışmaya elverişsiz.",
            },
            {
              kind: "match",
              id: "en-b2-04-l7-35",
              no: 35,
              text: "Which text objects to one kind of question being used in place of another?",
              answer: "d",
              explain:
                "Zehra iki soruyu ayırıyor: güvenlik binalar ve para hakkındadır, «it is used as though it were a question about rights, which it is not». İtiraz cevaba değil, sorunun yer değiştirmesine.",
            },
            {
              kind: "match",
              id: "en-b2-04-l7-36",
              no: 36,
              text: "Which text mentions a prediction that did not come true?",
              answer: "a",
              explain:
                "Berk uyarıyı ve sonucunu yan yana koyuyor: «I was warned that it would start a flood. It did not». Öteki metinlerde gerçekleşmemiş bir öngörü anlatılmıyor.",
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
          id: "en-b2-04-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Müze girişinde ziyaretçilere anons yapılıyor.",
              plays: 2,
              segments: [
                { text: "Good afternoon. The east wing is closed today while the floor is being replaced. The rest of the building is open as normal, and the ticket price has been reduced by two pounds for the whole day. If you booked online, the difference will be refunded automatically." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir müze ödünç isteğine yanıt veriyor.",
              plays: 2,
              segments: [
                { text: "Hello, this is about the loan request for the two drawings. We can lend one of them; the second is too fragile to travel and our conservator will not sign it off. If you need the pair, we can offer a photograph of the second at full size." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "At work",
              genreTr: "İş yerinde",
              situation: "İki çalışan açık gün sonuçlarını konuşuyor.",
              plays: 2,
              segments: [
                { text: "How did the open day go?" },
                { text: "Four hundred people, which is double last year." },
                { text: "And the questions?" },
                { text: "Almost all about one object. We had planned twelve talks and eleven of them turned out to be unnecessary." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Radio",
              genreTr: "Radyo",
              situation: "Radyoda bir uzman dinleyici sorusunu yanıtlıyor.",
              plays: 2,
              segments: [
                { text: "Listeners ask me every week whether museums should return everything. The honest answer is that the question hides three separate questions: who owns it, where is it safest, and who can see it. They do not have the same answer, and pretending that they do is how these arguments last fifty years." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Duyuru",
              situation: "Depo taşınması için çalışanlara talimat veriliyor.",
              plays: 2,
              segments: [
                { text: "A note for everybody working on the store move. Anything with a red tag goes to the new building, anything with a blue tag stays here, and anything with no tag at all comes to me before it is touched. The untagged items are the ones we know least about." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Voice message",
              genreTr: "Sesli ileti",
              situation: "Bir çalışan cuma günü için ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "Hi, about Friday. I can open the archive and sit with the researcher, but I have to leave at one for the school run. If we start at nine we will get through the 1890s boxes, and Beril said she can cover the afternoon." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir eğitmen ilk sergisini hazırlayanlara sesleniyor.",
              plays: 2,
              segments: [
                { text: "The most common mistake I see in a first exhibition is writing for the person who already knows. Your colleagues are not the audience. Write the first sentence for somebody who has walked in to get out of the rain, and put the argument in the second." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "In a gallery",
              genreTr: "Sergi salonunda",
              situation: "İki kişi boş bir salonu konuşuyor.",
              plays: 2,
              segments: [
                { text: "Why is this gallery so empty?" },
                { text: "It is the last one on the route. About one visitor in six gets this far." },
                { text: "Do they know that?" },
                { text: "They know. The best objects were moved here two years ago and it made no difference at all." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-04-h1-1",
              no: 1,
              ref: "a1",
              text: "What is the museum doing for visitors today?",
              options: ["Closing the whole building", "Refunding online tickets in full", "Charging less than usual"],
              answer: 2,
              explain:
                "Anons indirimi bildiriyor: «the ticket price has been reduced by two pounds for the whole day». Yalnız doğu kanadı kapalı ve çevrim içi biletlerde iade edilen şey biletin tamamı değil, aradaki fark.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the museum offering?",
              options: ["One original and a photograph", "Both drawings for a shorter period", "A decision after the conservator's report"],
              answer: 0,
              explain:
                "Teklif iki parçalı: «We can lend one of them» ve ikincisi için «a photograph of the second at full size». Konservatörün kararı zaten verilmiş («will not sign it off»), beklenen bir rapor yok.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-3",
              no: 3,
              ref: "a3",
              text: "What does the second speaker say about the open day?",
              options: ["Attendance was disappointing this year again", "Interest was concentrated on one thing", "The talks were too short"],
              answer: 1,
              explain:
                "Sorular tek bir nesnede toplanmış: «Almost all about one object» ve on iki sunumun on biri gereksiz kalmış. Katılım ise iki katına çıkmış, yani hayal kırıklığı değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-4",
              no: 4,
              ref: "a4",
              text: "What does the speaker say about the question?",
              options: ["It has a clear answer", "It is asked far too rarely in public debate", "It contains several different questions"],
              answer: 2,
              explain:
                "Konuşmacı soruyu üçe ayırıyor: «who owns it, where is it safest, and who can see it», üstelik cevapları aynı değil. Soru haftada bir soruluyor, yani seyrek de değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-5",
              no: 5,
              ref: "a5",
              text: "What must staff do with untagged items?",
              options: ["Report them before moving them", "Send them straight to the new building", "Leave them where they are"],
              answer: 0,
              explain:
                "Talimat etiketsizleri ayırıyor: «anything with no tag at all comes to me before it is touched». Kırmızı etiket yeni binaya, mavi etiket yerinde kalıyor; etiketsizler ikisine de girmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker doing?",
              options: ["Asking somebody to replace her all day", "Agreeing to help for part of the day", "Cancelling the appointment"],
              answer: 1,
              explain:
                "Konuşmacı geliyor ama sınır koyuyor: «I can open the archive and sit with the researcher, but I have to leave at one». Beril yalnız öğleden sonrayı devralıyor, günün tamamını değil.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-7",
              no: 7,
              ref: "a7",
              text: "What does the speaker recommend?",
              options: ["Writing shorter labels overall", "Asking your colleagues to check every text", "Aiming the opening at a casual visitor"],
              answer: 2,
              explain:
                "Öğüt hedef kitleyi değiştiriyor: «Write the first sentence for somebody who has walked in to get out of the rain». Meslektaşlar açıkça hedef kitle sayılmıyor; kısaltmadan da söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the second speaker say about the gallery?",
              options: ["The best objects have been moved out of it", "Most visitors never reach it", "It has been closed for two years"],
              answer: 1,
              explain:
                "Oran veriliyor: «About one visitor in six gets this far». En iyi nesneler iki yıl önce buraya TAŞINMIŞ, dışarı çıkarılmamış; salon da kapalı değil, yalnız uzakta.",
            },
          ],
        },
        {
          id: "en-b2-04-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting the results of a provenance project. Complete the sentences, questions 9 to 16, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir köken araştırması projesinin sonuçlarını anlatan bir adamı dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Proje sorumlusu üç yıllık sonuçları anlatıyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. I will give you our three-year figures and I will not pretend that all of them are comfortable. We began the project with three researchers and we now have a team of eleven. In that time we have examined about twelve thousand acquisition files. Here is the first surprise: the decade that produces the most unanswered questions is not the 1890s, it is the 1950s, because that is when the private sales begin and the paperwork gets thinner. Second, the source matters more than we expected. A file that came to us with a dealer's name attached takes roughly four times as long to resolve as one from an excavation. Third, the format of the published summary. We tried a database, a printed catalogue and a one-page note for each object, and the one-page note was read far more than the other two, which disappointed the two of us who built the database. Fourth, a caution: our own survey shows that the communities we most want to hear from find our website almost unusable, and we have not solved that. And finally, money. Eighty per cent of our funding comes from a single foundation, and that is the risk that keeps me awake, not the criticism.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Provenance project — three-year results",
              body: `The project started with {{9}} researchers.

The team now has {{10}} members.

About {{11}} acquisition files have been examined.

The decade with the most unanswered questions is the {{12}}.

A file with a {{13}} name attached takes about four times as long.

The format that was read most was the {{14}} note.

The communities the project wants to hear from find the {{15}} almost unusable.

{{16}} per cent of the funding comes from a single foundation.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-04-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["3", "three"],
              explain:
                "«We began the project with three researchers» — başlangıçtaki sayı. On bir bugünkü ekip; iki sayı aynı cümlede geçtiği için hangisinin başlangıç olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["11", "eleven"],
              explain:
                "«we now have a team of eleven» — bugünkü ekip sayısı. Üç, projenin başladığı andaki araştırmacı sayısı.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["12000", "twelve thousand"],
              explain:
                "«we have examined about twelve thousand acquisition files» — incelenen dosya sayısı. Cümlede `About` zaten yazılı olduğu için yalnız sayı isteniyor.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["1950s"],
              explain:
                "Kayıt beklentiyi bozuyor: «not the 1890s, it is the 1950s», çünkü özel satışlar o dönemde başlıyor ve evrak inceliyor. 1890'ları yazan öğrenci tam olarak çürütülen şıkkı almış olur.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["dealer", "dealers"],
              explain:
                "«A file that came to us with a dealer's name attached takes roughly four times as long» — kaynak bir satıcıysa iş dört katına çıkıyor. Kazıdan gelen dosya karşılaştırmanın öteki ucu.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["one-page"],
              explain:
                "Üç biçim denenmiş ve «the one-page note was read far more than the other two». Cümlede `note` zaten yazılı; veri tabanı ile basılı katalog elenen biçimler. Tireli ve tiresiz yazım aynı sayılıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["website"],
              explain:
                "En rahatsız edici bulgu: «the communities we most want to hear from find our website almost unusable». Sorun dosyalarda ya da biçimde değil, erişim aracında.",
            },
            {
              kind: "gap",
              id: "en-b2-04-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["80", "eighty"],
              explain:
                "«Eighty per cent of our funding comes from a single foundation» — tek kaynağa bağlılık oranı. Konuşmacı asıl riskin eleştiri değil bu olduğunu ekliyor.",
            },
          ],
        },
        {
          id: "en-b2-04-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six speakers talking about museums and collections, questions 17 to 22. Choose from a to h what each speaker says. You use each letter once only. You hear the recordings twice.",
          promptTr:
            "Müzeler ve koleksiyonlar üzerine konuşan altı kişi dinleyeceksin, 17–22. maddeler. Her konuşmacının söylediğini a'dan h'ye seç. Her harf en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The public is blamed for a failure that belongs to institutions." },
            { key: "b", label: "A correct statement can still mislead." },
            { key: "c", label: "The incentives reward the wrong behaviour." },
            { key: "d", label: "The speaker has changed their own practice." },
            { key: "e", label: "Things are better than they used to be." },
            { key: "f", label: "The problem is the quantity, not the principle." },
            { key: "g", label: "Museums should close their collections to researchers." },
            { key: "h", label: "New rules help far less than people assume." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı köken araştırmasının ölçeğinden söz ediyor.",
              plays: 2,
              segments: [
                { text: "I have no objection to the principle at all. My objection is arithmetical. We hold two million objects, four people work on provenance, and at the current rate the survey finishes some time in the year 2400." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı ziyaretçilere yöneltilen eleştiriyi ele alıyor.",
              plays: 2,
              segments: [
                { text: "It is easy to say that visitors should read more carefully. Give me a gallery where the label is at eye level, in two languages, and under forty words, and then we can talk about the visitor." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı eski komite tutanaklarını yeniden okuyor.",
              plays: 2,
              segments: [
                { text: "I have kept the acquisition minutes since 1994 and I read them again last month. The questions the committee asks now are ones that nobody would have asked then, and the answers are written down. On the things that can be measured, this is a better decade." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı kurumdaki ölçütlerden söz ediyor.",
              plays: 2,
              segments: [
                { text: "Nobody here is acting badly. The curator is judged on exhibitions, the director on visitor numbers, the funder on publicity. Each of them behaves reasonably and the result is that the store is never studied." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı kendi kurumlarının bir cümlesini ele alıyor.",
              plays: 2,
              segments: [
                { text: "The sentence on our website is true: every object in this gallery was legally acquired. What it does not say is that the law in question was written by the people who were doing the acquiring." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı etiket yazma biçimini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I now put the gaps in the record on the label itself, in the same size type as everything else. The letters I get are completely different, and much better. I should have started years ago." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-04-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "f",
              explain:
                "Konuşmacı ilkeyi açıkça savunuyor: «I have no objection to the principle at all. My objection is arithmetical» ve sayıları veriyor: iki milyon nesne, dört kişi, 2400 yılı. İtiraz ölçeğe.",
            },
            {
              kind: "match",
              id: "en-b2-04-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Konuşmacı suçu ziyaretçiden alıp kuruma veriyor: «Give me a gallery where the label is at eye level, in two languages, and under forty words, and then we can talk about the visitor».",
            },
            {
              kind: "match",
              id: "en-b2-04-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "e",
              explain:
                "1994'ten beri tutanak saklayan konuşmacı iki somut fark sayıyor: komitenin sorduğu sorular ve yanıtların yazıya geçmesi. «this is a better decade» değerlendirmesi bunlara dayanıyor.",
            },
            {
              kind: "match",
              id: "en-b2-04-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Kimse kötü niyetli değil ama ölçütler ayrı: sergi, ziyaretçi sayısı, tanıtım. «Each of them behaves reasonably and the result is that the store is never studied» — sorun ödül düzeneğinde.",
            },
            {
              kind: "match",
              id: "en-b2-04-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Cümlenin doğruluğu kabul ediliyor ve tamamlanıyor: «the law in question was written by the people who were doing the acquiring». Doğru bir ifade yanlış bir izlenim bırakabiliyor.",
            },
            {
              kind: "match",
              id: "en-b2-04-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "d",
              explain:
                "Konuşmacı kendi uygulamasını değiştirmiş: kayıttaki boşlukları etiketin üstüne, aynı punto ile yazıyor. Gelen mektuplar değişmiş ve «I should have started years ago» diyor.",
            },
          ],
        },
        {
          id: "en-b2-04-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a man who reduced the size of a museum collection. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "Bir müze koleksiyonunu küçülten bir adamla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında bölge müzesi müdürüyle söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Tarik, you gave four hundred objects to other museums rather than build a new store. That is unusual." },
                { speaker: "Tarik", text: "It is, and people assume it was a funding crisis. It was not. We had the money for the store. What we did not have was any honest answer to the question of why we were keeping things that nobody in this town had asked about since 1971." },
                { speaker: "Host", text: "Was the money the hardest part?" },
                { speaker: "Tarik", text: "No. The hardest part was the word collection. A collection is what makes a museum a museum in most people's minds, and I made ours smaller in public. Two members of the board resigned, and one of them had appointed me." },
                { speaker: "Host", text: "How long did the decision take?" },
                { speaker: "Tarik", text: "Five years, which is embarrassing to say out loud. I commissioned three reports, which is what people like me do instead of deciding. All three said the same thing, and I read all three as though they had said something else." },
                { speaker: "Host", text: "What finally moved you?" },
                { speaker: "Tarik", text: "A leak. Water came through the store roof one November and I stood there with a torch looking at boxes I could not identify. I realised I was not a custodian of those objects; I was a landlord who had lost the tenancy agreement." },
                { speaker: "Host", text: "And the smaller museum in practice?" },
                { speaker: "Tarik", text: "We show about the same number of objects and we know far more about each of them. Visitor numbers are almost unchanged, which is not the dramatic answer people want. The real change is that a researcher who writes to us now gets an answer in a week rather than a year." },
                { speaker: "Host", text: "Do you miss anything?" },
                { speaker: "Tarik", text: "The possibility, honestly. A large store is a store of futures: somebody might one day need that. I miss that feeling, and I think it was mostly a comfort rather than a plan." },
                { speaker: "Host", text: "What do people get wrong about small museums?" },
                { speaker: "Tarik", text: "They think small means simple. Forty thousand objects and two staff is not simpler than four hundred thousand and forty; it is the same problem with fewer hands. The difficulty did not go away; it changed shape." },
                { speaker: "Host", text: "Would you recommend it?" },
                { speaker: "Tarik", text: "Not as a general rule. If your collection is the only record of a community that has no other archive, this is advice from a comfortable position, and it is worth saying so. What I would recommend is writing down who each part of the store is for, and then reading your own answer honestly." },
              ],
              gloss: [
                { de: "a custodian", tr: "emanetçi, koruyucu", en: "custodian" },
                { de: "a tenancy agreement", tr: "kira sözleşmesi", en: "tenancy agreement" },
                { de: "a store", tr: "depo", en: "museum store" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-04-h4-23",
              no: 23,
              ref: "d1",
              text: "Why did Tarik give away part of the collection?",
              options: ["The museum could not afford to build a new store", "He could not justify keeping unused objects", "The board instructed him to do so"],
              answer: 1,
              explain:
                "Tarik para savını doğrudan reddediyor: «We had the money for the store». Eksik olan şey gerekçe: 1971'den beri kimsenin sormadığı nesnelerin neden tutulduğuna dair «any honest answer».",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-24",
              no: 24,
              ref: "d1",
              text: "What was the hardest part?",
              options: ["The loss of funding", "Finding museums that would take the objects", "What the word collection means to people"],
              answer: 2,
              explain:
                "Zorluk sözcüğün kendisinde: «A collection is what makes a museum a museum in most people's minds». İki yönetim kurulu üyesinin istifası bunun sonucu; nesneleri alacak müze bulmak hiç sorun olarak anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-25",
              no: 25,
              ref: "d1",
              text: "What does he say about the three reports?",
              options: ["He read them as saying what he wanted", "They contradicted each other on every point", "They were written by the board"],
              answer: 0,
              explain:
                "Kendi sözü: «All three said the same thing, and I read all three as though they had said something else». Raporlar çelişmiyor, okuyan kişi onları eğip büküyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-26",
              no: 26,
              ref: "d1",
              text: "What finally moved him?",
              options: ["A second resignation from the board that winter", "Standing among boxes he could not identify", "A report from an outside consultant"],
              answer: 1,
              explain:
                "Dönüm noktası bir sahne: çatı akıyor ve elinde fenerle tanımlayamadığı kutulara bakıyor. Kendi çıkarımı da o an geliyor: «I was a landlord who had lost the tenancy agreement».",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-27",
              no: 27,
              ref: "d1",
              text: "What has changed in practice?",
              options: ["Visitor numbers have risen sharply", "The museum now shows far fewer objects than before", "Researchers get answers much faster"],
              answer: 2,
              explain:
                "Asıl değişim şu: «a researcher who writes to us now gets an answer in a week rather than a year». Sergilenen nesne sayısı aşağı yukarı aynı, ziyaretçi sayısı da «almost unchanged».",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-28",
              no: 28,
              ref: "d1",
              text: "What does he say he misses?",
              options: ["A sense of future possibility", "The larger staff and the longer opening hours", "The building itself"],
              answer: 0,
              explain:
                "«The possibility, honestly. A large store is a store of futures» — özlenen şey bir duygu, üstelik kendisi bunun «a comfort rather than a plan» olduğunu ekliyor. Personel ya da bina anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-29",
              no: 29,
              ref: "d1",
              text: "What do people get wrong about small museums?",
              options: ["They assume the objects are less valuable", "They assume the work is simpler", "They assume the visitors are local"],
              answer: 1,
              explain:
                "«They think small means simple» ve hemen çürütülüyor: kırk bin nesne ile iki personel, dört yüz bin ile kırk personelden daha kolay değil. «the same problem with fewer hands».",
            },
            {
              kind: "mcq",
              id: "en-b2-04-h4-30",
              no: 30,
              ref: "d1",
              text: "What does he recommend?",
              options: ["Asking honestly who each area is kept for", "Giving objects to larger institutions nearby first", "Commissioning an independent report"],
              answer: 0,
              explain:
                "Öğüt son cümlede: «writing down who each part of the store is for», sonra kendi cevabını dürüstçe okumak. Rapor ısmarlamak ise Tarik'in kendi anlattığı erteleme yöntemi; nesneleri büyük kurumlara vermeyi de genel bir kural olarak önermiyor.",
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
          id: "en-b2-04-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed museums and where objects belong. Now write an essay for your teacher, answering this question: \"Should a museum return an object when its country of origin asks for it?\" Use the two ideas below and add one idea of your own.\n\nIdeas: who can see the object — how the museum obtained it",
          promptTr:
            "İngilizce dersinde müzeleri ve nesnelerin nereye ait olduğunu tartıştınız. Öğretmenin için bir deneme yaz: \"Bir müze, kaynak ülke istediğinde nesneyi geri vermeli mi?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: nesneyi kim görebiliyor — müze nesneyi nasıl edindi",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss who can see the object.", tr: "Nesneyi kimin görebildiğini tartış." },
              { de: "Discuss how the museum obtained it.", tr: "Müzenin onu nasıl edindiğini tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Almost everyone agrees that an object taken by force should go back. The disagreement begins as soon as the taking was legal at the time, which is true of most of the objects now under discussion.

The access argument is the weaker of the two, in my view. It is often said that more people can see an object in a large European city, and that is arithmetically true. It is also an argument that the people who already hold the object happen to find convincing, which should make us cautious.

The second question is harder and more useful. If a museum cannot say how it obtained something, the burden should not sit with the community asking for it. A file that is silent is not evidence of consent.

My own view is that the choice is presented too narrowly. Long loans, shared ownership and digital access are all available, and they are ignored because they satisfy nobody completely.

Museums should return an object where the record is silent, and negotiate everything else case by case.`,
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
          id: "en-b2-04-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You write for a student website. Write a review of a museum, an exhibition or a historic building you have visited recently. Say what it shows, what it does well, and who would be disappointed by it. Write 140 to 190 words.",
          promptTr:
            "Bir öğrenci sitesi için yazıyorsun. Yakınlarda gezdiğin bir müzenin, serginin ya da tarihî yapının değerlendirmesini yaz. Neyi gösterdiğini, neyi iyi yaptığını ve kimin hayal kırıklığına uğrayacağını söyle. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Say what it shows.", tr: "Neyi gösterdiğini söyle." },
              { de: "Say what it does well, with an example.", tr: "Neyi iyi yaptığını bir örnekle söyle." },
              { de: "Say who would be disappointed, and why.", tr: "Kimin hayal kırıklığına uğrayacağını ve nedenini söyle." },
            ],
            sample: `The Harbour Museum occupies two rooms above a working boatyard, and it is far better than that description suggests.

It shows about eighty objects from a single street between 1890 and 1975: tools, letters, three photographs of the same doorway, and a ledger that somebody kept for thirty years. The strongest room is the second, which follows one family and does not tidy the story. One label simply says that the museum does not know what happened to the youngest son after 1943, and leaves it there.

What it does particularly well is refuse to be complete. Nothing is described as unique, and the gaps in the record are printed in the same type as the facts, which is rarer than it should be.

It is not for everyone. If you want objects of obvious value, you will be disappointed, because almost nothing here is worth anything. Visitors with small children should also be warned: there is nothing to touch.

For anybody interested in how an ordinary place remembers itself, however, it is the best hour in the town.`,
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
      instruction: "This part has three tasks: an interview, a long turn, and a task we do together.",
      instructionTr: "Bu bölümde üç görev var: söyleşi, tek başına konuşma ve birlikte yapılan bir görev.",
      tasks: [
        {
          id: "en-b2-04-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about museums, history and how the past is presented.",
          promptTr: "Sana müzeler, tarih ve geçmişin nasıl sunulduğu hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. When did you last visit a museum or a historic building, and what took you there?", tr: "Günaydın. En son ne zaman bir müzeye ya da tarihî bir yapıya gittin, seni oraya ne götürdü?" },
            { who: "you", hint: "Somut bir ziyaret anlat ve nedenini ver.", expect: "somut bir deneyimi gerekçesiyle anlatmak", seconds: 45 },
            { who: "partner", de: "Thank you. Can you think of something you were taught about the past that you later found was incomplete?", tr: "Teşekkürler. Geçmişle ilgili öğrendiğin ve sonradan eksik olduğunu fark ettiğin bir şey var mı?" },
            { who: "you", hint: "Somut bir örnek ver ve neyin eksik olduğunu açıkla.", expect: "somut bir örnek vermek ve kendi bilgisini gözden geçirmek", seconds: 45 },
            { who: "partner", de: "And what makes you trust one museum or one history book more than another?", tr: "Bir müzeye ya da bir tarih kitabına ötekinden çok güvenmeni ne sağlıyor?" },
            { who: "you", hint: "Bir ölçüt söyle ve sınırını da kabul et.", expect: "bir ölçüt öne sürmek ve sınırını kabul etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give developed answers with reasons", tr: "Gerekçeli, geliştirilmiş cevaplar vermek" },
              { de: "reconsider something you were taught", tr: "Öğrendiğin bir şeyi yeniden değerlendirmek" },
            ],
            sample:
              "I went to a small local museum in March, mainly because it was raining, which is not a very noble reason. At school we were taught that the harbour here was built to bring goods in; a panel in that museum pointed out that for forty years it mostly took people out, and nobody had ever put those two facts side by side for me. What makes me trust a museum now is whether it says what it does not know, although I have to admit I have only noticed that in two places.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Somut bir örnek verildi mi, yoksa genel mi konuşuldu?",
              "Eksik bilgi çözümlendi mi, yalnız anlatıldı mı?",
              "Öne sürülen ölçütün sınırı kabul edildi mi?",
            ],
          },
        },
        {
          id: "en-b2-04-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of showing a difficult object, say which is better and explain one problem with your choice: displaying it with a full explanation of how it was obtained, or removing it from display until the research is finished.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Tartışmalı bir nesneyi sunmanın şu iki yolunu karşılaştır, hangisinin daha iyi olduğunu söyle ve seçtiğinin bir sorununu açıkla: nasıl edinildiğini tam olarak anlatan bir açıklamayla sergilemek mi, araştırma bitene kadar sergiden kaldırmak mı?",
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
              "Showing the object with a full explanation keeps the argument visible, and a visitor who reads it leaves knowing that there is a question at all. Removing it looks more responsible and is often the safer decision for the institution, but it also makes the problem disappear from public view, which is convenient for exactly the people who are being criticised. I would keep it on display. The problem with my own choice is that the explanation is written by the museum, in its own building, in its own language, and a community that disagrees with that account has no way of answering it in the same room. So the honest version of my position is that display is better only if somebody else is allowed to write part of the label.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin sorunu adlandırıldı mı?",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (responsibility, account, institution)",
            ],
          },
        },
        {
          id: "en-b2-04-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A city museum has money for one change this year. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir şehir müzesinin bu yıl tek bir değişiklik için parası var. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: put the acquisition records online, employ two provenance researchers, rewrite every label in two languages, and make entry free on Sundays. Which of these would actually change what visitors understand?", tr: "Fikirler: edinim kayıtlarını internete koymak, iki köken araştırmacısı işe almak, bütün etiketleri iki dilde yeniden yazmak ve pazar günleri girişi ücretsiz yapmak. Sence bunlardan hangisi ziyaretçinin anladığını gerçekten değiştirir?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would question the online records. Almost nobody outside the profession reads an acquisition file, and putting them up costs a year of somebody's time. Does that change your view?", tr: "Çevrim içi kayıtları sorgularım. Meslekten olmayan neredeyse hiç kimse edinim dosyası okumuyor ve bunları yüklemek birinin bir yılını alıyor. Bu görüşünü değiştirir mi?" },
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
              "The two researchers look like the least visible option and are probably the strongest, because without them there is nothing to put on a label or a website. You are right that few people read an acquisition file directly, so I would publish a summary rather than the whole file, which answers most of your objection without a year of scanning. Free Sundays seem worse than the disease: they raise the numbers and change nothing about what those numbers see. So I would recommend the researchers and the published summaries, and reject the free entry.",
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

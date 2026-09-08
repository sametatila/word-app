import type { MockPaper } from "../types";

/**
 * B2 · Deneme 1 — "Cities, Work and Attention".
 *
 * ÖLÇÜM PLANI (B2 tanımı: soyut konularda karmaşık metinlerin ana fikrini
 * anlamak; bir tartışmada tarafları ve gerekçeleri ayırt etmek; ayrıntılı
 * ve tutarlı metin üretmek):
 *
 *   Reading  70 dk · 36 madde
 *     Teil 1  6  şıklı boşluk       eşdizim ve sözcük seçimi (structure)
 *     Teil 2  6  açık boşluk        yapı, boşluk başına tek sözcük (structure)
 *     Teil 3  6  kelime türetme     verilen kökten biçim üretme (structure)
 *     Teil 4  4  cümle dönüştürme   anahtar sözcükle yeniden kurma (structure)
 *     Teil 5  5  dört şıklı seçme   uzun metin — tutum ve çıkarım (opinion)
 *     Teil 6  4  cümle yerleştirme  bağdaşıklık (structure)
 *     Teil 7  5  çoklu eşleştirme   dört metin, şık TEKRARLI (detail)
 *   Listening 40 dk · 30 madde
 *     Teil 1  8  üç şıklı seçme     bağımsız kısa parçalar (detail)
 *     Teil 2  8  cümle tamamlama    tek sesli sunum (detail)
 *     Teil 3  6  eşleştirme         altı konuşmacı ↔ sekiz seçenek (opinion)
 *     Teil 4  8  üç şıklı seçme     söyleşi (opinion)
 *   Writing  70 dk  deneme (140–190) + rapor ya da değerlendirme (140–190)
 *   Speaking 15 dk  söyleşi · karşılaştırma · işbirliği ve tartışma
 *
 * ALMANCADA KARŞILIĞI OLMAYAN İKİ GÖREV. Kelime türetme (Teil 3) ve anahtar
 * sözcükle dönüştürme (Teil 4) İngilizce sınav geleneğinin B2'den itibaren
 * ölçtüğü iki şey. Birincisi biçimbilimi ölçüyor: verilen kökten doğru sözcük
 * türünü, olumsuzluk ekini ve çoğulu üretmek. İkincisi dilbilgisel esnekliği:
 * aynı anlamı verilen bir anahtar sözcükle yeniden kurmak. Almanca kâğıtlarda
 * ikisinin de karşılığı yok, çünkü Almanca sınav geleneği bunları ayrı görev
 * olarak ölçmüyor.
 *
 * ÇOKLU EŞLEŞTİRMEDE ŞIK TEKRARI (Teil 7). Dört metne beş soru soruluyor ve
 * aynı metin birden çok sorunun cevabı olabiliyor. Almanca eşleştirmede her
 * ilan en fazla bir kez kullanılır; İngilizce çoklu eşleştirme tersini yapar
 * ve ölçtüğü şey de farklıdır — eleme değil, dört metinde tarama.
 *
 * B2 SINIRI: edilgen çeşitleri, üçüncü tip koşul, dolaylı anlatım, ortaç
 * öbeği, ileri bağlayıcılar, resmî/gayriresmî kayıt farkı.
 */
export const EN_B2_01: MockPaper = {
  id: "en-b2-01",
  course: "en",
  level: "B2",
  no: 1,
  theme: "Cities, Work and Attention",
  themeTr: "Şehirler, çalışma ve dikkat",
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
          id: "en-b2-01-l1",
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
              title: "The quiet carriage",
              body: `When train companies introduced quiet carriages, they expected the rules to be broken constantly. In practice, most passengers {{1}} to them without being asked.

What makes the difference is not the size of the sign but its position. A notice on the window is read; a notice above the door is not. Companies that {{2}} this simple point spend years wondering why their rules fail.

There is also a social effect that operators rarely {{3}} into account. In a carriage where nobody is talking, a phone call feels louder than it is, and most people would rather leave the carriage than {{4}} the disapproval of thirty strangers.

The result is a space that manages itself. Staff intervene perhaps twice a week, and the {{5}} majority of those cases involve somebody who has simply not seen the sign.

None of this means that quiet carriages solve anything large. They do, however, {{6}} a useful reminder that a rule people can see is worth more than a rule people are told about once.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-01-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["stick", "hold", "keep", "follow"],
              answer: 0,
              explain:
                "Boşluktan sonra `to them` var ve anlam kurallara uymak. `stick to` bu öbek fiili kurar. `hold to` başka bir anlam taşır (bir söze bağlı kalmak), `keep to` yakın ama devamında yol ya da program ister, `follow` ise `to` almaz.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["overlook", "oversee", "overtake", "overhear"],
              answer: 0,
              explain:
                "Anlam bir noktayı gözden kaçırmak: `overlook`. `oversee` denetlemek, `overtake` sollamak, `overhear` kulak misafiri olmak demektir. Dördü de aynı önekle kurulduğu için madde önekten değil kökten çözülüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["bring", "take", "put", "get"],
              answer: 1,
              explain:
                "`take something into account` sabit bir eşdizim: hesaba katmak. `bring into account`, `put into account` ve `get into account` İngilizcede yoktur; benzer görünen `bring into question` başka bir kalıptır.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["suffer", "face", "meet", "stand"],
              answer: 1,
              explain:
                "Nesne `the disapproval of thirty strangers` ve anlam bir tepkiyle karşı karşıya kalmak: `face disapproval` doğal bir eşdizim. `suffer` acı çekmeyi, `meet` karşılamayı (meet a demand), `stand` ise katlanmayı bildirir ve `would rather … than` yapısındaki kaçınma anlamını bozar.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["large", "wide", "vast", "broad"],
              answer: 2,
              explain:
                "`the vast majority` yerleşik bir eşdizim. `large majority` de geçer ama `vast` bu kalıpta belirgin biçimde daha sık; `wide` ve `broad` `majority` ile kullanılmaz, onlar `range` ya da `agreement` ile gider.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["serve", "provide", "deliver", "supply"],
              answer: 1,
              explain:
                "Nesne `a useful reminder` ve anlam bir hatırlatma sunmak: `provide a reminder`. `serve as a reminder` doğrudur ama `as` gerekir ve cümlede yok; `deliver` ve `supply` bu soyut adla doğal durmaz.",
            },
          ],
        },
        {
          id: "en-b2-01-l2",
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
              title: "Working from the library",
              body: `Public libraries have become workplaces, {{7}} nobody planned this and few libraries are funded for it.

In one city, staff counted the people who came in on a Tuesday morning. Almost half were working, either on a laptop or on the phone, and most of them {{8}} been there for more than two hours.

This creates a problem that is easy to state and hard to solve. A library {{9}} main room is full of quiet workers is not a library that invites a parent with a small child.

Some cities have responded {{10}} dividing the space, with one floor for work and one for everything else. Others have done nothing, {{11}} the belief that the demand will fall again.

Neither approach has been evaluated properly. If the funding {{12}} arrived with the visitors, the question would be simpler; instead, libraries are asked to serve a new group with an old budget.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-01-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["although", "though", "even"],
              explain:
                "İki yarı karşıt: kütüphaneler iş yeri oldu, oysa kimse bunu planlamadı. `although` ya da `though` bu ödün ilişkisini kurar; `even` de «even though» yapısının ilk sözcüğü olarak kabul edilir. `because` anlamı tersine çevirirdi.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["had"],
              explain:
                "Cümlenin ana zamanı geçmiş («staff counted») ve bu bilgi ondan da önceki bir süreyi anlatıyor: past perfect gerekiyor. `had been there for more than two hours` — `have` geçmiş bağlamda uyumsuz kalırdı.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["whose"],
              explain:
                "«A library ___ main room is full of quiet workers» yapısında boşluk bir iyelik ilgi zamiri istiyor: kütüphanenin ana salonu. `whose` cansız öncüllerle de kullanılır. `which` burada iyelik kuramaz, `that` de aynı işi göremez.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["by"],
              explain:
                "`respond by + -ing` yapısı bir tepkinin nasıl verildiğini bildirir: «have responded by dividing the space». `with` ya da `through` burada doğal değil; `to` ise tepkinin yöneldiği şeyi ister, bir eylemi değil.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["in", "on"],
              explain:
                "`in the belief that …` bir gerekçeyi bildiren yerleşik kalıp: talebin düşeceğine inandıkları için hiçbir şey yapmamışlar. `on the belief` de bazı yazarlarda geçer; `with` ya da `for` bu adla bu anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["had"],
              explain:
                "Ana cümlede `would be` var ve olay geçmişte gerçekleşmemiş: karma bir koşul kuruluyor. `If the funding had arrived …` yapısı `had` ister. `has` şimdiki zamanı, `would` ise koşul cümlesinin kendisini bozar.",
            },
          ],
        },
        {
          id: "en-b2-01-l3",
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
              title: "Noise maps",
              body: `A noise map shows how loud a city is, street by street. The first maps were drawn by hand and their {{13}} was limited, but modern maps are built from thousands of sensors.

Their main use is planning. A council that knows where the problem lies can act {{14}} instead of responding to complaints one at a time.

The maps have also changed the public conversation. Residents who were once told that their street was {{15}} loud can now point to a number.

Critics argue that a map measures volume but not {{16}}: a busy road and a night club produce very different kinds of disturbance at the same level.

There is broad {{17}} that the maps are useful, and equally broad frustration that they are updated so rarely. In most cities the {{18}} of a new map takes three years, by which time the traffic has changed again.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-01-l3-13",
              no: 13,
              text: "ACCURATE",
              accept: ["accuracy"],
              explain:
                "Boşluk `their ___ was limited` yapısında bir ad istiyor ve iyelik sıfatından sonra geliyor. `accurate` sıfatının adı `accuracy`; sıfatın kendisi bu yapıda duramaz. Sonda `-cy` ekiyle biçim değişiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l3-14",
              no: 14,
              text: "SYSTEM",
              accept: ["systematically"],
              explain:
                "Boşluk `can act ___` yapısında fiili niteliyor, yani bir belirteç gerekiyor. Kökten önce sıfat türetiliyor (`systematic`), sonra `-ally` ekiyle belirteç: `systematically`. `systematic` tek başına fiili niteleyemez.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l3-15",
              no: 15,
              text: "REASON",
              accept: ["unreasonably"],
              explain:
                "Cümle sakinlere söylenen şeyin haksızlığını ima ediyor ve boşluk `loud` sıfatını niteliyor: bir belirteç gerekiyor. Ayrıca olumsuzluk eki şart — `reasonably loud` cümlenin anlamını tersine çevirirdi. Doğru biçim `unreasonably`.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l3-16",
              no: 16,
              text: "ANNOY",
              accept: ["annoyance"],
              explain:
                "Boşluk `measures volume but not ___` yapısında bir ad istiyor ve ölçülemeyen şey rahatsızlığın kendisi. `annoy` fiilinin adı `annoyance`. Devamındaki «different kinds of disturbance» aynı anlam alanını sürdürüyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l3-17",
              no: 17,
              text: "AGREE",
              accept: ["agreement"],
              explain:
                "`broad ___ that …` yapısında bir ad gerekiyor: `agreement`. Cümlenin ikinci yarısındaki `equally broad frustration` aynı yapıyı tekrarlıyor ve orada da bir ad var, bu da boşluğun türünü doğruluyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l3-18",
              no: 18,
              text: "PRODUCE",
              accept: ["production"],
              explain:
                "`the ___ of a new map takes three years` yapısında `the` ile `of` arasında bir ad var. `produce` fiilinin bu bağlamdaki adı `production`; `producer` bir kişiyi, `product` ise sonucu adlandırır ve ikisi de üç yıl sürmez.",
            },
          ],
        },
        {
          id: "en-b2-01-l4",
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
              id: "en-b2-01-l4-19",
              no: 19,
              text: "I have not seen Tom for three years.\nThe ______ Tom was three years ago.",
              cue: "LAST",
              accept: ["last time I saw", "last time that I saw"],
              explain:
                "Süre bildiren `for three years` yapısı, `the last time …` kalıbıyla bir noktaya çevriliyor. Anahtar sözcük `last` değişmeden kullanılıyor ve ardından bir ad öbeği geliyor: «The last time I saw Tom was three years ago». `that` isteğe bağlı.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l4-20",
              no: 20,
              text: "They cancelled the meeting because of the storm.\nThe meeting ______ because of the storm.",
              cue: "CALLED",
              accept: ["was called off", "had been called off"],
              explain:
                "Etken cümle edilgene çevriliyor ve `cancel` yerine öbek fiil isteniyor: `call off`. Anahtar sözcük `called` değişmediği için yardımcı fiil önüne geliyor: «was called off». Geçmiş öncesi bir okuma da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l4-21",
              no: 21,
              text: "It is not necessary for you to bring your own laptop.\nYou ______ bring your own laptop.",
              cue: "HAVE",
              accept: ["do not have to", "don't have to"],
              explain:
                "Gereksizlik bildiren `it is not necessary` yapısı, kip fiiliyle `do not have to` biçimine çevriliyor. Yaygın hata `must not` yazmaktır ama o yasak bildirir, gereksizlik değil. Anahtar sözcük `have` değişmeden kalıyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-l4-22",
              no: 22,
              text: "Nobody told me about the change of room.\nI ______ about the change of room.",
              cue: "BEEN",
              accept: ["have not been told", "had not been told", "haven't been told"],
              explain:
                "Olumsuz özneli etken cümle («Nobody told me»), olumsuz edilgene çevriliyor. Anahtar sözcük `been` edilgenin ortacını gerektiriyor: «have not been told». Zaman bağlama göre present perfect ya da past perfect olabilir.",
            },
          ],
        },
        {
          id: "en-b2-01-l5",
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
              title: "In defence of the boring meeting",
              body: `Every few years a company announces that it has abolished meetings, and the announcement is reported as though it were an achievement. Given how much time meetings consume, the impulse is understandable. It is also, in my experience, usually wrong.

I spent eleven years in an organisation that ran on written updates. Nobody sat in a room. Decisions were made in documents, and anyone could read them at any hour. It was efficient in the way that a locked filing cabinet is efficient: nothing was lost, and nothing moved.

What we lost was not information. It was the moment when somebody says the quiet objection out loud. In writing, an objection has to be composed, and composing it takes courage that most people do not spend on a point they are only half sure about. In a room, the same objection escapes almost by accident, and it is frequently the most valuable thing said all week.

Defenders of the written model reply that a good culture allows written objections too. In principle this is true. In practice I have watched three organisations try it, and in each of them the written channel filled up with agreement while the doubts moved to private messages, where they helped nobody. Nevertheless, the objection deserves a proper answer rather than a shrug.

None of this defends the meeting as it is usually run. A meeting with fourteen people and no decision is a waste, and the fact that it has always been held on Tuesday is not a reason. If we had kept one weekly meeting, we would have caught two expensive mistakes in October rather than in March. The reform I would argue for is smaller and duller than abolition: three people, twenty minutes, one question, and a written record afterwards.

The reason this reform is rarely adopted is that it is not dramatic. Abolishing meetings makes a headline. Making them shorter makes a calendar entry, and nobody has ever been promoted for that.`,
              gloss: [
                { de: "to abolish", tr: "kaldırmak, ilga etmek", en: "to abolish" },
                { de: "an objection", tr: "itiraz", en: "objection" },
                { de: "to compose", tr: "kurmak, kaleme almak", en: "to compose" },
                { de: "duller", tr: "daha sıkıcı", en: "duller" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-01-l5-23",
              no: 23,
              text: "What does the writer suggest with the image of the filing cabinet?",
              options: [
                "The written system was disorganised",
                "The written system preserved everything but produced no movement",
                "The written system was too expensive to maintain",
                "The written system was popular with the staff",
              ],
              answer: 1,
              explain:
                "Benzetmenin karşılığı hemen ardından veriliyor: «nothing was lost, and nothing moved». Yani kayıt eksiksiz ama karar üretmiyor. Dağınıklık ve maliyet metinde geçmiyor; personelin memnuniyeti de hiç anılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l5-24",
              no: 24,
              text: "According to the writer, why do written objections rarely appear?",
              options: [
                "People are not allowed to write them",
                "Writing them takes courage people rarely spend on a half-formed doubt",
                "Written objections are usually deleted by managers before anyone reads them",
                "People prefer to raise them at the end of the year",
              ],
              answer: 1,
              explain:
                "Gerekçe açıkça veriliyor: itirazı yazmak «takes courage that most people do not spend on a point they are only half sure about». Yasak ya da silinme metinde yok; yazar tersine kültürün buna izin verdiği durumları da anlatıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l5-25",
              no: 25,
              text: "How does the writer answer the defenders of the written model?",
              options: [
                "By accepting the principle but reporting what he has observed",
                "By showing that their research is out of date",
                "By arguing that written culture cannot be changed",
                "By admitting that his own experience was unusual",
              ],
              answer: 0,
              explain:
                "Yazar ilkeyi kabul ediyor («In principle this is true») ve sonra gözlemini koyuyor: üç kurumda denenmiş, kuşkular özel mesajlara kaçmış. Araştırma tartışması ya da kendi deneyimini istisna sayma metinde yok.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l5-26",
              no: 26,
              text: "What does the writer say about the meeting as it is usually run?",
              options: [
                "It works well when the group is large",
                "It should be defended in its current form",
                "He does not defend it, and habit is not a justification",
                "It is better than the written model in every way",
              ],
              answer: 2,
              explain:
                "Yazar açıkça sınır çiziyor: «None of this defends the meeting as it is usually run» ve alışkanlığı gerekçe saymıyor — «the fact that it has always been held on Tuesday is not a reason». Büyük grubu tam tersine bir israf örneği olarak veriyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-l5-27",
              no: 27,
              text: "Why does the writer think his proposal is rarely adopted?",
              options: [
                "Because it costs more than abolition",
                "Because managers do not understand it",
                "Because it needs a kind of software that does not yet exist anywhere",
                "Because it offers no visible reward to the person who proposes it",
              ],
              answer: 3,
              explain:
                "Son paragraf gerekçeyi veriyor: reform «is not dramatic», kaldırmak manşet olur, kısaltmak yalnız bir takvim kaydı olur ve «nobody has ever been promoted for that». Maliyet, anlayış ya da yazılım metinde hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-b2-01-l6",
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
              title: "Why interruptions cost more than the interruption",
              body: `An interruption that lasts thirty seconds does not cost thirty seconds. Studies of office work have measured the true figure at somewhere between eleven and twenty-three minutes. {{28}}

The reason lies in what is being interrupted. A task held in working memory has a structure, and that structure is not saved when attention moves away. {{29}}

This is why the advice to "batch your messages" works better than it sounds. The saving is not in the reading; a message takes the same time whenever it is read. {{30}}

Employers who have taken this seriously have not banned anything. Instead they have changed what is expected: an answer within four hours rather than four minutes. {{31}}

The remaining difficulty is cultural rather than technical. In most teams, speed of reply is still read as a sign of commitment, and nobody has yet found a comfortable way to say that it is not.`,
              gloss: [
                { de: "working memory", tr: "işleyen bellek", en: "working memory" },
                { de: "to batch", tr: "toplu hâle getirmek", en: "to batch" },
                { de: "commitment", tr: "bağlılık, adanmışlık", en: "commitment" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "That single change removes most of the pressure without removing the tool." },
            { key: "b", label: "b", body: "The gap is the cost of rebuilding it, and it is paid every single time." },
            { key: "c", label: "c", body: "The range is wide because it depends heavily on how complex the interrupted task was." },
            { key: "d", label: "d", body: "It is in the number of times the structure of the main task has to be rebuilt." },
            { key: "e", label: "e", body: "Most modern phones can now display the number of unread messages on the lock screen." },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-01-l6-28",
              no: 28,
              text: "Gap 28",
              answer: "c",
              explain:
                "Boşluktan önce geniş bir aralık veriliyor: «between eleven and twenty-three minutes». (c) tam bu aralığı açıklıyor — genişliğin sebebi kesintiye uğrayan işin karmaşıklığı. Sayıdan sayının yorumuna geçiş.",
            },
            {
              kind: "match",
              id: "en-b2-01-l6-29",
              no: 29,
              text: "Gap 29",
              answer: "b",
              explain:
                "Önceki cümle yapının kaydedilmediğini söylüyor; (b) «The gap is the cost of rebuilding it» ile o yapıya geri gönderme yapıp maliyeti adlandırıyor. `it` zamiri doğrudan `that structure`ı gösteriyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-l6-30",
              no: 30,
              text: "Gap 30",
              answer: "d",
              explain:
                "Önceki cümle tasarrufun okumada OLMADIĞINI söylüyor; (d) «It is in the number of times …» ile aynı yapıyı olumlu tamamlıyor. `not in … / it is in …` karşıtlığı iki cümleyi birbirine kilitliyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-l6-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Önceki cümle tek bir değişikliği anlatıyor: dört dakika yerine dört saatlik yanıt beklentisi. (a) «That single change» ile ona geri gönderme yapıp sonucunu veriyor. (e) telefonların bildirim sayacından söz ediyor ve metinde hiçbir yerde cihaz özelliği tartışılmıyor — hiçbir boşluğa uymayan cümle odur.",
            },
          ],
        },
        {
          id: "en-b2-01-l7",
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
              label: "a — Ines, architect",
              body: "I design offices, and the brief has changed completely. Ten years ago clients asked for desks; now they ask for rooms you can close. What surprises me is that they still ask for the same total floor area, which does not add up, and somebody always has to say so.",
            },
            {
              key: "b",
              label: "b — Peter, facilities manager",
              body: "Our building was full on Tuesday and empty on Friday, so we closed one floor on Fridays and saved a great deal on heating. The staff response was better than I expected, mainly because we asked them first rather than announcing it.",
            },
            {
              key: "c",
              label: "c — Wanjiru, team leader",
              body: "The hardest part is not the space, it is the calendar. If half the team is at home, a meeting has to be online for everybody, otherwise the people at home hear nothing useful. We learned that the hard way, after a year of half-and-half meetings that nobody liked.",
            },
            {
              key: "d",
              label: "d — Marek, researcher",
              body: "The data is much less clear than either side claims. Productivity did not collapse, and it did not rise dramatically either. What did change, measurably, is who gets promoted: people seen in the building still do better, and that is the finding nobody wants to discuss.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-01-l7-32",
              no: 32,
              text: "Which text mentions a decision that the staff were consulted about?",
              answer: "b",
              explain:
                "Peter kararın kabul görmesini bir yönteme bağlıyor: «mainly because we asked them first rather than announcing it» — karar alınmadan önce danışılmış. Öteki üç metinde çalışanlara danışmaktan hiç söz edilmiyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-l7-33",
              no: 33,
              text: "Which text says that the evidence does not support either position?",
              answer: "d",
              explain:
                "Marek «The data is much less clear than either side claims» diyor ve iki yönü de eliyor: verim ne çökmüş ne fırlamış. `either side` ifadesi iki tarafı birden reddettiğini gösteriyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-l7-34",
              no: 34,
              text: "Which text describes a request that contains a contradiction?",
              answer: "a",
              explain:
                "Ines müşterilerin hem kapanabilir odalar hem aynı toplam alanı istediğini söylüyor ve «which does not add up» diye ekliyor. Bu bir çelişki; öteki metinlerde tutarsız bir talep anlatılmıyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-l7-35",
              no: 35,
              text: "Which text mentions a lesson learned from a period of failure?",
              answer: "c",
              explain:
                "Wanjiru «We learned that the hard way, after a year of half-and-half meetings that nobody liked» diyor: bir yıllık başarısızlıktan çıkarılan ders. Peter'ın deneyimi tersine beklediğinden iyi gitmiş.",
            },
            {
              kind: "match",
              id: "en-b2-01-l7-36",
              no: 36,
              text: "Which text raises a consequence that people avoid talking about?",
              answer: "d",
              explain:
                "Marek terfi bulgusunu verip «that is the finding nobody wants to discuss» diye bitiriyor. Ines'te de söylenmesi gereken bir şey var ama orada birinin söylediği belirtiliyor, kaçınılan bir konu değil.",
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
          id: "en-b2-01-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "You hear eight short extracts. Choose a, b or c. You hear every extract twice.",
          promptTr: "Sekiz kısa parça dinleyeceksin. a, b ya da c'yi seç. Her parçayı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "In a meeting",
              genreTr: "Toplantıda",
              situation: "Bir ekip lideri bir gecikmeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "The delay is not on our side. The supplier changed the material without telling us, and by the time we noticed, four hundred units had already been produced." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "On the phone",
              genreTr: "Telefonda",
              situation: "Bir yönetici bir başvuru hakkında konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Manager", text: "Her written work is the strongest we have seen this year." },
                { speaker: "Colleague", text: "Agreed. My only hesitation is that she has never led a team, and this role is two thirds management." },
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
                { text: "Whenever a city widens a road, traffic grows to fill it within about five years. This is so well documented that it has a name, and yet it is still treated as a surprise." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "At the office",
              genreTr: "Ofiste",
              situation: "İki meslektaş bir yazılım değişikliğinden söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Ana", text: "Have you seen the new version?" },
                { speaker: "Ben", text: "I have, and I would rather they had fixed the search than added three new colours." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Announcement",
              genreTr: "Anons",
              situation: "Bir kurumda bir duyuru yapılıyor.",
              plays: 2,
              segments: [
                { text: "From next month the canteen will close at two rather than three. Nobody is losing a job; the two staff affected have been offered hours in the morning, and both have accepted." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "At a conference",
              genreTr: "Konferansta",
              situation: "Bir konuşmacı sunumunu bitiriyor.",
              plays: 2,
              segments: [
                { text: "I have shown you three studies, and I want to be careful about what they prove. They show a correlation in one country over four years. They do not show that the policy caused it." },
              ],
            },
            {
              kind: "audio",
              id: "a7",
              genre: "Voicemail",
              genreTr: "Telesekreter iletisi",
              situation: "Bir mimar müşteriye ileti bırakıyor.",
              plays: 2,
              segments: [
                { text: "The council has approved the plans, but with a condition about the roof height. It is a small change on paper and an expensive one in practice, so let us talk before I redraw anything." },
              ],
            },
            {
              kind: "audio",
              id: "a8",
              genre: "In a shop",
              genreTr: "Mağazada",
              situation: "Bir müşteri bir ürünü soruyor.",
              plays: 2,
              segments: [
                { speaker: "Customer", text: "Is this the model that was recalled last year?" },
                { speaker: "Assistant", text: "No, that was the previous generation. This one has a different battery, although the case looks almost identical." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-01-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the speaker emphasise about the delay?",
              options: ["That responsibility lies elsewhere", "That the cost will be shared", "That production has now stopped"],
              answer: 0,
              explain:
                "İlk cümle sorumluluğu devrediyor: «The delay is not on our side» ve tedarikçinin habersiz malzeme değiştirdiği anlatılıyor. Maliyet paylaşımı ya da üretimin durduğu söylenmiyor; tersine dört yüz birim çoktan üretilmiş.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-2",
              no: 2,
              ref: "a2",
              text: "What is the colleague's reservation?",
              options: ["The quality of her written work", "Her lack of experience in leading people", "The length of time she has been available"],
              answer: 1,
              explain:
                "Meslektaş yazılı işi övmeye katılıyor («Agreed») ve tek çekincesini söylüyor: «she has never led a team, and this role is two thirds management». Yazılı iş tam olarak sorgulanmayan taraf.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-3",
              no: 3,
              ref: "a3",
              text: "What is the speaker's attitude?",
              options: ["Surprised by a recent discovery", "Frustrated that a known effect is ignored", "Uncertain whether the effect is real"],
              answer: 1,
              explain:
                "Konuşmacı etkinin çok iyi belgelendiğini, hatta bir adı olduğunu söylüyor ve «yet it is still treated as a surprise» diye ekliyor. Bu bir sitem; kendisi şaşırmıyor ve etkinin gerçekliğinden kuşku duymuyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-4",
              no: 4,
              ref: "a4",
              text: "What does Ben think about the new version?",
              options: ["The wrong problem was solved", "The colours are an improvement", "He has not looked at it yet"],
              answer: 0,
              explain:
                "Ben yeni sürümü gördüğünü söyleyip önceliği eleştiriyor: «I would rather they had fixed the search than added three new colours». Renkleri övmüyor, aramanın düzeltilmemiş olmasından yakınıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-5",
              no: 5,
              ref: "a5",
              text: "What does the announcement make clear?",
              options: ["The canteen will open later in the morning", "Nobody will lose their job because of the change", "The change will be reviewed after a month"],
              answer: 1,
              explain:
                "Anons bunu doğrudan söylüyor: «Nobody is losing a job» ve etkilenen iki çalışana sabah saatleri önerilip kabul edilmiş. Sabah açılışı değişmiyor, değerlendirme sözü de verilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-6",
              no: 6,
              ref: "a6",
              text: "What is the speaker careful to point out?",
              options: ["That the studies were poorly designed", "That the data covers ten countries", "That the studies do not establish cause"],
              answer: 2,
              explain:
                "Konuşmacı sınırı açıkça çiziyor: «They do not show that the policy caused it». Çalışmaları kötü tasarlanmış diye eleştirmiyor; kapsamı da tek ülke ve dört yıl olarak veriyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-7",
              no: 7,
              ref: "a7",
              text: "Why does the architect want to talk first?",
              options: ["Because the plans were rejected", "Because a small change has a large cost", "Because the deadline for the whole project has moved"],
              answer: 1,
              explain:
                "Mimar koşulu tarif ediyor: «a small change on paper and an expensive one in practice». Planlar onaylanmış, reddedilmemiş; süreden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h1-8",
              no: 8,
              ref: "a8",
              text: "What does the assistant say about the model?",
              options: ["It looks similar but is a later version", "It is the model that was recalled", "It has been discontinued this year"],
              answer: 0,
              explain:
                "Görevli geri çağrılanın önceki nesil olduğunu söylüyor ve farkı veriyor: «This one has a different battery, although the case looks almost identical». Benzerlik görünüşte, model farklı.",
            },
          ],
        },
        {
          id: "en-b2-01-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about a city's night-time economy. Complete the sentences, questions 9 to 16, with a word or a short phrase. You hear the talk twice.",
          promptTr:
            "Bir şehrin gece ekonomisi üzerine sunum dinleyeceksin. 9–16. maddelerdeki cümleleri bir sözcük ya da kısa bir öbekle tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir belediye görevlisi gece ekonomisi raporunu sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Good evening. I want to give you the findings of our two-year study of the night-time economy, and I will try to avoid the usual slogans. First, the size: between eight in the evening and six in the morning, this city supports about eleven thousand jobs. That is more than construction. Second, and this is the number that changed our thinking, the largest single group is not bar staff but cleaners. Third, transport. Our surveys found that the biggest complaint is not safety, as everybody assumes, but simply the cost of getting home. A night bus was tried in 2019 and it failed, and it failed for a reason we now understand: it ran only at weekends, when the people who needed it worked mainly on weekdays. The new service runs every night. Fourth, a warning about noise. Complaints rose by forty per cent after the pedestrian zone opened, and almost all of them come from one street. Finally, what we are asking the council for is not money but a licence officer who works after midnight, because at the moment the rules are written for a city that closes at eleven.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentence completion",
              genreTr: "Cümle tamamlama",
              title: "Night-time economy — findings",
              body: `The study lasted {{9}} years.

The night-time economy supports about {{10}} jobs in the city.

The largest single group of night workers is {{11}}.

The biggest complaint from surveys is the {{12}} of getting home.

The earlier night bus failed because it ran only at {{13}}.

Noise complaints rose by {{14}} per cent after the pedestrian zone opened.

Almost all noise complaints come from {{15}} street.

The council is asked to provide a licence officer who works after {{16}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-b2-01-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["2", "two"],
              explain:
                "Konuşmacı çalışmayı «our two-year study» diye tanıtıyor. Kayıtta 2019 yılı da geçiyor ama o başarısız otobüs denemesinin tarihi; hangi sayının süre olduğunu ayırmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["11000", "11,000", "eleven thousand", "about 11000"],
              explain:
                "«this city supports about eleven thousand jobs» — gece ekonomisindeki istihdam. Karşılaştırma için verilen inşaat sektörü bir sayı taşımıyor, yalnız kıyas noktası.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["cleaners", "cleaning staff"],
              explain:
                "Konuşmacı yaygın beklentiyi eliyor: «the largest single group is not bar staff but cleaners». Bar çalışanlarını yazan öğrenci cümlenin ilk yarısında durmuş olur; `not … but …` yapısını duymak gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["cost", "expense"],
              explain:
                "Yine bir beklenti eleniyor: «the biggest complaint is not safety, as everybody assumes, but simply the cost of getting home». Güvenlik kayıtta geçiyor ama açıkça reddedilmiş hâlde.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["weekends", "the weekend", "weekend"],
              explain:
                "Başarısızlığın sebebi veriliyor: «it ran only at weekends, when the people who needed it worked mainly on weekdays». Yani hizmetin çalıştığı zaman ile ihtiyacın olduğu zaman örtüşmemiş.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["40", "forty"],
              explain:
                "«Complaints rose by forty per cent after the pedestrian zone opened» — artış oranı yüzde kırk. Cümle tamamlamada `per cent` basılı olduğu için yalnız sayı yazılır.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-15",
              no: 15,
              ref: "b1",
              text: "Gap 15",
              accept: ["one", "a single", "1"],
              explain:
                "«almost all of them come from one street» — şikâyetlerin neredeyse tamamı tek bir sokaktan geliyor. Bu bilgi, kırk yüzdelik artışın şehre yayılmış bir sorun olmadığını gösteriyor.",
            },
            {
              kind: "gap",
              id: "en-b2-01-h2-16",
              no: 16,
              ref: "b1",
              text: "Gap 16",
              accept: ["midnight"],
              explain:
                "Talep tek ve somut: «a licence officer who works after midnight», çünkü mevcut kurallar gece on birde kapanan bir şehir için yazılmış. Para istenmediği de ayrıca vurgulanıyor.",
            },
          ],
        },
        {
          id: "en-b2-01-h3",
          no: 3,
          format: "match",
          goal: "opinion",
          prompt:
            "You hear six people talking about a change at their workplace. What is each speaker's main point? Choose from a to h. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "İş yerlerindeki bir değişiklikten söz eden altı kişi dinleyeceksin. Her konuşmacının ana noktası nedir? a'dan h'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "The change solved a problem nobody had named." },
            { key: "b", label: "The change was good but introduced too quickly." },
            { key: "c", label: "The benefits went to one group only." },
            { key: "d", label: "The reasons given were not the real reasons." },
            { key: "e", label: "The change made an existing inequality visible." },
            { key: "f", label: "The change worked because staff were consulted." },
            { key: "g", label: "The change has been reversed since." },
            { key: "h", label: "The effect will only be clear in a few years." },
          ],
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "They said it was about collaboration, and everybody nodded. Then the lease on the second building came up for renewal and was not renewed. I do not object to saving money; I object to being told a story about creativity." },
              ],
            },
            {
              kind: "audio",
              id: "c2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "For years we complained about Fridays without ever putting it into words. When they made Friday a no-meeting day, half the office said the same thing: I did not know that was what was wrong." },
              ],
            },
            {
              kind: "audio",
              id: "c3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "The idea was right. Announcing it on a Thursday and starting it on the Monday was not. We spent six weeks fixing things that a fortnight of preparation would have prevented." },
              ],
            },
            {
              kind: "audio",
              id: "c4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "Flexible hours are wonderful if your work is on a screen. The warehouse team still starts at six and finishes at two, exactly as before. Nobody lied to them, but nobody asked them either." },
              ],
            },
            {
              kind: "audio",
              id: "c5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "We had always assumed the workload was shared. The new tracking system did not create the imbalance; it simply put it on one page, and three people had to have a very uncomfortable conversation." },
              ],
            },
            {
              kind: "audio",
              id: "c6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı iş yerindeki bir değişiklikten söz ediyor.",
              plays: 2,
              segments: [
                { text: "Everybody wants a verdict after six months. But the thing we changed affects who joins us and who stays, and you cannot see that in a year. Ask me in 2029 and I will give you a real answer." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-b2-01-h3-17",
              no: 17,
              ref: "c1",
              text: "Speaker 1",
              answer: "d",
              explain:
                "Konuşmacı verilen gerekçeyle gerçek gerekçeyi ayırıyor: işbirliği denmiş ama asıl olay kiranın yenilenmemesi. «I object to being told a story about creativity» cümlesi itirazın gerekçeye değil, gerekçenin sahteliğine olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-b2-01-h3-18",
              no: 18,
              ref: "c2",
              text: "Speaker 2",
              answer: "a",
              explain:
                "Sorun yıllarca adlandırılamamış: «we complained about Fridays without ever putting it into words», değişiklikten sonra da «I did not know that was what was wrong» denmiş. Yani çözülen şey adı konmamış bir sorun.",
            },
            {
              kind: "match",
              id: "en-b2-01-h3-19",
              no: 19,
              ref: "c3",
              text: "Speaker 3",
              answer: "b",
              explain:
                "Fikri onaylıyor («The idea was right») ama uygulamanın hızını eleştiriyor: perşembe duyurulup pazartesi başlatılmış ve altı hafta düzeltmeyle geçmiş. Eleştiri içeriğe değil takvime.",
            },
            {
              kind: "match",
              id: "en-b2-01-h3-20",
              no: 20,
              ref: "c4",
              text: "Speaker 4",
              answer: "c",
              explain:
                "Esnek saatler yalnız ekran başında çalışanlara yaramış: «The warehouse team still starts at six and finishes at two, exactly as before». Fayda tek gruba gitmiş. Yalan söylenmediği de ayrıca belirtiliyor («Nobody lied to them»), yani gerekçe sorunu değil.",
            },
            {
              kind: "match",
              id: "en-b2-01-h3-21",
              no: 21,
              ref: "c5",
              text: "Speaker 5",
              answer: "e",
              explain:
                "Konuşmacı ayrımı kendisi yapıyor: «The new tracking system did not create the imbalance; it simply put it on one page». Yani dengesizlik zaten vardı, değişiklik onu görünür kıldı.",
            },
            {
              kind: "match",
              id: "en-b2-01-h3-22",
              no: 22,
              ref: "c6",
              text: "Speaker 6",
              answer: "h",
              explain:
                "Konuşmacı erken hüküm vermeye karşı çıkıyor: etki kimin katıldığı ve kaldığıyla ilgili ve «you cannot see that in a year». Sonunda somut bir tarih veriyor: «Ask me in 2029».",
            },
          ],
        },
        {
          id: "en-b2-01-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear an interview with a woman who studies attention at work. Choose a, b or c for questions 23 to 30. You hear the interview twice.",
          promptTr: "İş yerinde dikkat üzerine çalışan bir kadınla söyleşi dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir radyo programında dikkat araştırmacısıyla söyleşi yapılıyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "Dr Halim, your book argues that we have misunderstood distraction. In what way?" },
                { speaker: "Halim", text: "We treat it as a failure of the individual. Almost every popular book is addressed to the person: put your phone away, be disciplined. But if ninety per cent of people in an office are distracted, that is not ninety per cent of people failing. That is a description of the office." },
                { speaker: "Host", text: "So you would put the responsibility on employers." },
                { speaker: "Halim", text: "Partly, and I want to be precise here, because this is where I am often misquoted. I am not saying individuals have no responsibility. I am saying that we have spent twenty years on the smaller half of the problem." },
                { speaker: "Host", text: "What does the research actually show about open-plan offices?" },
                { speaker: "Halim", text: "Less than either side wants. The studies are noisy and the effects are smaller than the headlines. What is robust is something narrower: the number of face-to-face conversations falls when the walls come down, which is the opposite of the stated purpose." },
                { speaker: "Host", text: "That is counter-intuitive. Why would that happen?" },
                { speaker: "Halim", text: "The most likely explanation is that people compensate. If you can be overheard, you write instead of speaking. It is not that people become unfriendly; it is that the cheapest private channel wins." },
                { speaker: "Host", text: "And what about the advice to check messages only twice a day?" },
                { speaker: "Halim", text: "It works for the individual and it fails as a policy, because it moves the cost onto whoever is waiting. Unless the whole team agrees the same rhythm, you are simply being slow at somebody else's expense." },
                { speaker: "Host", text: "If you could change one thing tomorrow, what would it be?" },
                { speaker: "Halim", text: "I would make response-time expectations explicit and written down. Not shorter, not longer: written. Most of the anxiety I measure comes from people guessing what is expected, and guessing high." },
                { speaker: "Host", text: "Finally, are you optimistic?" },
                { speaker: "Halim", text: "Cautiously, and for an unromantic reason. Attention is now expensive enough that finance departments have started asking about it, and things change when they are counted." },
              ],
              gloss: [
                { de: "distraction", tr: "dikkat dağınıklığı", en: "distraction" },
                { de: "robust", tr: "sağlam, güvenilir (bulgu)", en: "robust" },
                { de: "to compensate", tr: "telafi etmek", en: "to compensate" },
                { de: "explicit", tr: "açıkça belirtilmiş", en: "explicit" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-b2-01-h4-23",
              no: 23,
              ref: "d1",
              text: "What is Dr Halim's central objection to popular books on distraction?",
              options: ["They address the individual rather than the setting", "They rely on studies that are too old", "They are written mainly for managers"],
              answer: 0,
              explain:
                "Halim kitapların muhatabını eleştiriyor: «Almost every popular book is addressed to the person». Sonra ölçeği veriyor: ofisteki insanların yüzde doksanı dikkati dağınıksa bu kişilerin başarısızlığı değil, ofisin tarifi. Çalışmaların eskiliği ya da hedef kitlesi tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-24",
              no: 24,
              ref: "d1",
              text: "Why does she add a qualification about responsibility?",
              options: ["Because she has changed her position recently", "Because her argument is often reported inaccurately", "Because employers have complained about her book"],
              answer: 1,
              explain:
                "Halim gerekçeyi kendisi söylüyor: «this is where I am often misquoted». Ardından sınırı çiziyor: bireyin sorumluluğu yok demiyor, sorunun küçük yarısına yirmi yıl harcandığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-25",
              no: 25,
              ref: "d1",
              text: "What does she say the research on open-plan offices shows?",
              options: ["A large effect that both sides accept", "Very little, except one narrow but reliable finding", "Nothing at all that can be measured with the current methods"],
              answer: 1,
              explain:
                "«Less than either side wants» diyor ve tek sağlam bulguyu adlandırıyor: duvarlar kalkınca yüz yüze konuşma sayısı düşüyor. Yani ölçülemez değil, dar ama güvenilir.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-26",
              no: 26,
              ref: "d1",
              text: "Why does she call that finding surprising?",
              options: ["Because it contradicts the aim of open-plan design", "Because it appears only in one country and one industry", "Because it was found by accident"],
              answer: 0,
              explain:
                "Bulgu «the opposite of the stated purpose» diye niteleniyor: açık ofisin amacı iletişimi artırmakken sonuç tersine çıkıyor. Ülke ya da tesadüf söyleşide geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-27",
              no: 27,
              ref: "d1",
              text: "How does she explain the finding?",
              options: ["People become less friendly over time", "People switch to a channel where they are not overheard", "People leave the building whenever they want a private conversation"],
              answer: 1,
              explain:
                "Açıklama telafi üzerinden: duyulabiliyorsan konuşmak yerine yazarsın, «the cheapest private channel wins». Halim samimiyetsizlik açıklamasını açıkça reddediyor: «It is not that people become unfriendly».",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-28",
              no: 28,
              ref: "d1",
              text: "What is her view of checking messages twice a day?",
              options: ["It is effective for one person but unfair as a rule", "It is the single best change a team can make", "It only works in small organisations"],
              answer: 0,
              explain:
                "Halim ikisini ayırıyor: «It works for the individual and it fails as a policy», çünkü maliyet bekleyene geçiyor. Ekibin tamamı aynı ritmi kabul etmedikçe başkasının sırtından yavaşlık olur.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-29",
              no: 29,
              ref: "d1",
              text: "What single change would she make?",
              options: ["Shorter expected response times", "Longer expected response times", "Response times that are stated in writing"],
              answer: 2,
              explain:
                "Halim iki yönü de eliyor ve üçüncüsünü seçiyor: «Not shorter, not longer: written». Gerekçe kaygının kaynağı: insanlar beklentiyi tahmin ediyor ve yüksek tahmin ediyor.",
            },
            {
              kind: "mcq",
              id: "en-b2-01-h4-30",
              no: 30,
              ref: "d1",
              text: "Why is she cautiously optimistic?",
              options: ["Because attention has become a financial question", "Because a new generation thinks differently", "Because the technology is improving"],
              answer: 0,
              explain:
                "Gerekçeyi «unromantic» diye niteliyor: dikkat artık finans birimlerinin sorduğu bir maliyet ve «things change when they are counted». Kuşak ya da teknoloji söyleşide hiç geçmiyor.",
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
          id: "en-b2-01-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In your English class you have discussed city centres. Now write an essay for your teacher, answering this question: \"Should city centres be closed to private cars?\" Use the two ideas below and add one idea of your own.\n\nIdeas: air quality — people who cannot use public transport",
          promptTr:
            "İngilizce dersinde şehir merkezlerini tartıştınız. Öğretmenin için bir deneme yaz: \"Şehir merkezleri özel araçlara kapatılmalı mı?\" Aşağıdaki iki fikri kullan ve kendi fikrinden birini ekle.\n\nFikirler: hava kalitesi — toplu taşımayı kullanamayan insanlar",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Discuss air quality.", tr: "Hava kalitesini tartış." },
              { de: "Discuss people who cannot use public transport.", tr: "Toplu taşımayı kullanamayan insanları tartış." },
              { de: "Add a third idea of your own.", tr: "Kendi üçüncü fikrini ekle." },
              { de: "Reach a clear conclusion.", tr: "Açık bir sonuca var." },
            ],
            sample: `Closing city centres to private cars is often presented as a simple choice between clean air and convenience. It is more complicated than that.

The strongest argument is air quality. Where central streets have been closed, measured pollution has fallen quickly, and the effect is largest exactly where children walk to school. This is not a small benefit, and it arrives within months rather than decades.

However, the objection about access is serious and is too often dismissed. Some people cannot use a bus or a tram, and telling them to plan better is not an answer. A scheme that does not include permits for these residents is not a fair scheme, whatever its environmental record.

My own concern is different: the shops. When traffic disappears, small businesses lose deliveries unless the plan includes them, and a centre of empty units helps nobody.

On balance I support closing central streets, but only where public transport is already good and exceptions are written into the rules from the beginning.`,
            criteria: [
              "İki verilen fikir de tartışıldı mı ve üçüncü kendi fikri eklendi mi?",
              "Karşı görüş ciddiye alındı mı, yoksa yalnız anıldı mı?",
              "Sonuç açık mı ve gövdeden çıkıyor mu?",
              "Paragraflar ayrı düşünceleri mi taşıyor?",
              "Bağlayıcılar çeşitli mi? (however, on balance, whereas)",
              "140–190 kelime aralığında mı?",
              "Kayıt deneme yazısına uygun mu? Konuşma dili ve kısaltma (`don't`) beklenmez.",
            ],
          },
        },
        {
          id: "en-b2-01-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "You work in an office where a new open-plan layout was introduced six months ago. Your manager has asked you to write a report on how it is working. Describe two effects you have seen, and make one recommendation. Write 140 to 190 words.",
          promptTr:
            "Altı ay önce açık ofis düzenine geçilen bir yerde çalışıyorsun. Yöneticin nasıl işlediğine dair bir rapor istedi. Gördüğün iki etkiyi anlat ve bir öneri sun. 140–190 kelime yaz.",
          items: [],
          rubric: {
            minWords: 140,
            points: [
              { de: "Describe one positive effect.", tr: "Bir olumlu etkiyi anlat." },
              { de: "Describe one problem.", tr: "Bir sorunu anlat." },
              { de: "Make one clear, practical recommendation.", tr: "Açık ve uygulanabilir bir öneri sun." },
            ],
            sample: `Introduction

This report describes the effects of the open-plan layout introduced in March and makes one recommendation.

Positive effects

New colleagues have settled in noticeably faster. Three people who joined in the spring said that they learned the names and the responsibilities of the team within a fortnight, which used to take much longer. Informal help is easier to ask for when the person is visible.

Problems

Concentrated work has become difficult. Several colleagues now arrive before eight in order to have two quiet hours, which is not a sustainable solution and effectively lengthens their day. Telephone calls are also a recurring complaint, particularly from the team that speaks to customers.

Recommendation

I recommend converting the two unused storage rooms on the second floor into bookable quiet rooms, each for one or two people. This would be inexpensive, it would not reverse the layout, and it would give the customer team somewhere to make calls without disturbing others.`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Rapor biçimi kullanıldı mı? Başlıklar ya da açık bölümler var mı?",
              "Etkiler somut mu, yoksa genel mi? (\"herkes memnun\" bir gözlem değildir)",
              "Öneri uygulanabilir mi ve gerekçelendirildi mi?",
              "Kayıt resmî mi? Rapor dili kişisel bir e-postadan farklıdır.",
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
          id: "en-b2-01-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about your work or studies and about how you organise your time.",
          promptTr: "Sana işin ya da öğrenimin ve zamanını nasıl düzenlediğin hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Could you tell me about a change in the way you work or study that you did not choose?", tr: "Günaydın. İşinde ya da öğreniminde kendi seçmediğin bir değişikliği anlatır mısın?" },
            { who: "you", hint: "Değişikliği anlat ve nasıl karşıladığını söyle.", expect: "kendi seçmediği bir değişikliği anlatmak ve ona tepkisini değerlendirmek", seconds: 45 },
            { who: "partner", de: "Thank you. Looking back, was your first reaction to it the right one?", tr: "Teşekkürler. Geriye dönüp bakınca ilk tepkin doğru muydu?" },
            { who: "you", hint: "Geçmişe dönük bir değerlendirme yap; gerekirse kendini düzelt.", expect: "geçmişe dönük bir değerlendirme yapmak ve gerekirse görüşünü düzeltmek", seconds: 45 },
            { who: "partner", de: "And how do you decide what to do first on a busy day?", tr: "Yoğun bir günde neyi önce yapacağına nasıl karar veriyorsun?" },
            { who: "you", hint: "Bir yöntem anlat ve sınırını da söyle.", expect: "bir yöntemi anlatmak ve sınırını kabul etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give developed answers with reasons", tr: "Gerekçeli, geliştirilmiş cevaplar vermek" },
              { de: "evaluate your own earlier reaction", tr: "Kendi eski tepkini değerlendirmek" },
            ],
            sample:
              "Two years ago our department merged with another one, which nobody asked us about. My first reaction was that it would slow everything down. Looking back, I was half right: the meetings did get longer, but I gained three colleagues who know things I did not. On a busy day I try to do the task that blocks other people first, although I have to admit that on a really bad day I do the easy things instead.",
            criteria: [
              "Cevaplar geliştirildi mi ve gerekçelendirildi mi?",
              "Geçmişe dönük değerlendirme yapıldı mı? (Looking back, I was …)",
              "Kendi görüşünü nitelendiren ifadeler var mı? (half right, I have to admit)",
              "Karmaşık cümle yapıları kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "en-b2-01-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about one and a half minutes. Compare these two ways of organising a workplace, say which you think works better, and explain one thing that could go wrong with your choice: an office where everybody is present three fixed days a week, or an office where everybody chooses their own days.",
          promptTr:
            "Yaklaşık bir buçuk dakika tek başına konuş. Bir iş yerini düzenlemenin şu iki yolunu karşılaştır, hangisinin daha iyi işlediğini söyle ve seçtiğin yolda ters gidebilecek bir şeyi açıkla: herkesin haftada üç sabit gün ofiste olduğu düzen mi, herkesin kendi günlerini seçtiği düzen mi?",
          prepSeconds: 60,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "compare the two systems", tr: "İki düzeni karşılaştır" },
              { de: "state and justify a preference", tr: "Bir tercihi belirt ve gerekçelendir" },
              { de: "identify a risk in your own choice", tr: "Kendi seçiminde bir riski adlandır" },
            ],
            sample:
              "Fixed days give you certainty: you know that Tuesday is the day you can catch somebody in person, and you plan around it. Free choice gives you flexibility, which matters enormously if you have children or a long journey. The obvious weakness of free choice is that people can be in the building all week and never overlap, so you get the cost of the office without the benefit. On balance I would choose fixed days, mainly because meetings become cheaper to arrange. What could go wrong is the assumption that everybody can make those particular days. If the fixed days are chosen by the people with the shortest journeys, the system quietly punishes everybody else, and that is worth checking before it is decided.",
            criteria: [
              "İki düzen de gerçekten karşılaştırıldı mı?",
              "Tercih gerekçelendirildi mi?",
              "Kendi seçiminin riski adlandırıldı mı? Bu, tek yanlı savunmayı önlüyor.",
              "Bir buçuk dakika boyunca akıcı konuşuldu mu?",
              "Soyut ifadeler kullanılabildi mi? (certainty, flexibility, on balance)",
            ],
          },
        },
        {
          id: "en-b2-01-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A company wants to reduce interruptions. Talk with me about these ideas, then decide which two we would recommend and which one we would reject.",
          promptTr:
            "Bir şirket kesintileri azaltmak istiyor. Bu fikirleri benimle konuş, sonra hangi ikisini önereceğimize ve hangisini reddedeceğimize karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The ideas are: a no-meeting day, a rule that messages are answered within four hours rather than immediately, bookable quiet rooms, and turning off all notifications by default. Which of these do you think would actually change behaviour?", tr: "Fikirler: toplantısız bir gün, iletilere hemen değil dört saat içinde cevap verme kuralı, ayırtılabilir sessiz odalar ve bütün bildirimlerin varsayılan olarak kapatılması. Sence bunlardan hangisi davranışı gerçekten değiştirir?" },
            { who: "you", hint: "Bir ya da iki fikri seç ve neden işe yarayacağını açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "I would push back on the notifications idea. If it is a default, people simply turn them on again in the first week. Is that fair?", tr: "Bildirim fikrine itiraz ederim. Varsayılan olursa insanlar ilk hafta içinde tekrar açar. Haklı mıyım?" },
            { who: "you", hint: "İtirazı değerlendir: kabul et, sınırla ya da çürüt.", expect: "bir itirazı değerlendirmek ve kısmen kabul etmek ya da çürütmek", seconds: 45 },
            { who: "partner", de: "Right. So which two do we recommend, and which one do we reject?", tr: "Peki. Hangi ikisini öneriyoruz, hangisini reddediyoruz?" },
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
              "I would start with the response-time rule, because it changes what people expect rather than what they can do. Quiet rooms help too, but only if booking them is easy. You have a point about notifications; a default that everybody reverses is worse than nothing, because it looks like action. I would still keep it, but only for the evening. So: the response-time rule and the quiet rooms, and I would reject the no-meeting day, since teams simply move the meetings to Thursday.",
            criteria: [
              "Seçenekler birbirine karşı mı değerlendirildi, yoksa tek tek mi anlatıldı?",
              "İtiraza doğrudan karşılık verildi mi ve kısmi kabul yapılabildi mi?",
              "Hem iki öneri hem bir ret gerekçelendirildi mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı? (You have a point about …)",
            ],
          },
        },
      ],
    },
  ],
};

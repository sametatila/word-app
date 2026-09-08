import type { MockPaper } from "../types";

/**
 * C1 · Deneme 1 — "Memory, Language and Evidence".
 *
 * ÖLÇÜM PLANI (C1 tanımı: uzun ve zorlu metinlerin örtük anlamını kavramak;
 * bir tartışmada konumları, çekinceleri ve bunların gerekçelerini ayırt
 * etmek; akıcı ve yapılandırılmış metin üretmek):
 *
 *   Reading  80 dk · 40 madde
 *     Teil 1  6  şıklı boşluk         eşdizim ve ince anlam farkı (structure)
 *     Teil 2  6  açık boşluk          yapı (structure)
 *     Teil 3  6  kelime türetme       biçimbilim (structure)
 *     Teil 4  4  cümle dönüştürme     dilbilgisel esneklik (structure)
 *     Teil 5  4  dört şıklı seçme     uzun metin — tutum (opinion)
 *     Teil 6  4  metinler-arası eşleştirme  beş yazar, kim ne diyor (opinion)
 *     Teil 7  4  paragraf yerleştirme bağdaşıklık (structure)
 *     Teil 8  6  çoklu eşleştirme     dört metin, şık TEKRARLI (detail)
 *   Listening 40 dk · 30 madde
 *     Teil 1  6  üç şıklı seçme   üç parça, her birine iki madde (opinion)
 *     Teil 2  8  cümle tamamlama  sunum — TEK dinletme (detail)
 *     Teil 3  8  dört şıklı seçme panel — TEK dinletme (opinion)
 *     Teil 4  8  eşleştirme       sekiz kısa konuşma (gist)
 *   Writing  80 dk  deneme (220–260) + öneri/rapor/değerlendirme (220–260)
 *   Speaking 15 dk  söyleşi · uzun konuşma · işbirliği ve tartışma
 *
 * TEK DİNLETME BURADA BAŞLIYOR. A1'den B2'ye kadar her kayıt iki kez
 * dinletiliyor, çünkü İngilizce sınav geleneğinde bu böyle. C1'de iki uzun
 * görev tek dinletmeye geçiyor: bu seviyede ölçülen şey artık bilgiyi
 * yakalamak değil, ilk geçişte yapıyı kurabilmek.
 *
 * METİNLER-ARASI EŞLEŞTİRME (Teil 6). Beş yazar aynı konuda yazıyor ve
 * maddeler kimin kiminle aynı fikirde olduğunu soruyor. Ölçülen şey tek bir
 * metni anlamak değil, iki metin arasında konum karşılaştırmak — C1'e özgü
 * bir iş ve Almanca kâğıtlarda tam karşılığı yok.
 *
 * C1 SINIRI: devrik yapı, yarma cümle, adlaştırma, ortaç öbeği, çekimserlik
 * belirteçleri, ince kayıt farkları.
 */
export const EN_C1_01: MockPaper = {
  id: "en-c1-01",
  course: "en",
  level: "C1",
  no: 1,
  theme: "Memory, Language and Evidence",
  themeTr: "Bellek, dil ve kanıt",
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
          id: "en-c1-01-l1",
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
              title: "The witness who was sure",
              body: `Confidence and accuracy are related, but the relationship is far weaker than juries {{1}}. A witness who is certain is not, on that account alone, more likely to be right.

What complicates matters is that confidence is not fixed. It rises after a witness is told that somebody else identified the same person, and it rises again each time the account is repeated. By the time of a trial, the original hesitation has been {{2}} out of the story altogether.

Researchers have therefore argued for recording confidence at the first identification and treating later statements with {{3}}. This is now standard in several jurisdictions, and where it has been adopted the number of disputed identifications has fallen {{4}}.

The reform is easy to describe and hard to sell, {{5}} it appears to weaken the strongest evidence a prosecutor has. In practice it does the opposite: it preserves the value of the first account instead of allowing it to be {{6}} away by everything that happens afterwards.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-01-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["assume", "presume", "suppose", "conceive"],
              answer: 0,
              explain:
                "Cümle jürilerin sorgulamadan kabul ettiği bir varsayımı anlatıyor: `assume` bu anlamı en yalın biçimde verir. `presume` bir gerekçeye dayanan varsayımı, `suppose` bir tahmini, `conceive` ise bir şeyi zihinde kurmayı bildirir ve hiçbiri buradaki eleştirel tonu taşımaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["worn", "smoothed", "rubbed", "washed"],
              answer: 1,
              explain:
                "`smooth out` bir pürüzü ortadan kaldırmak anlamındaki öbek fiil ve buradaki nesne bir tereddüt. `wear out` yıpratmak, `rub out` silmek, `wash out` yıkayıp çıkarmak demektir; üçü de anlatının kendiliğinden düzleşmesi fikrini vermez.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["care", "caution", "attention", "concern"],
              answer: 1,
              explain:
                "`treat something with caution` yerleşik bir eşdizim: temkinle yaklaşmak. `with care` özenli davranmayı, `with attention` dikkat vermeyi, `with concern` ise endişeyi bildirir; istenen şey şüpheli sayma tavrı.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["markedly", "highly", "greatly", "widely"],
              answer: 0,
              explain:
                "Boşluk `has fallen` fiilini niteliyor ve anlam gözle görülür bir düşüş: `fallen markedly`. `highly` sıfatlarla gider, `greatly` bu fiille zayıf durur, `widely` ise yaygınlığı bildirir, miktarı değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["whereas", "despite", "since", "albeit"],
              answer: 2,
              explain:
                "Boşluk bir gerekçe bağlacı istiyor: reform zor satılıyor, ÇÜNKÜ en güçlü kanıtı zayıflatır görünüyor. `since` bu sebebi kurar. `whereas` karşıtlık, `despite` ödün, `albeit` ise sıfat öbeğiyle kullanılan bir ödün bağlacıdır.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["given", "carried", "explained", "argued"],
              answer: 3,
              explain:
                "`argue something away` bir şeyi tartışarak geçersiz kılmak anlamındaki öbek fiil. `explain away` yakın bir anlam taşır ama edilgen özne bir hesap değil bir değer olduğunda `argued away` daha doğru; `given away` ve `carried away` bambaşka anlamlardadır.",
            },
          ],
        },
        {
          id: "en-c1-01-l2",
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
              title: "On the reluctance to say nothing",
              body: `Rarely {{7}} a scientist rewarded for reporting that an effect could not be found.

The reasons are institutional rather than intellectual. Journals prefer results, and it is on results {{8}} careers are built. A study that ends in uncertainty is therefore written up, if at all, in the language of a near miss.

The consequence is a literature in {{9}} the published record is systematically more confident than the work behind it. This is not fraud, and describing it as such {{10}} the discussion nowhere.

Several remedies have been proposed, of {{11}} the most promising is registration in advance: a researcher states what will be measured before the data exist, and the journal commits to publishing the outcome either way.

Registration does not solve everything. What it does do is remove the {{12}} tempting move of all, which is deciding what the question was after seeing the answer.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-01-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["is"],
              explain:
                "Cümle `Rarely` ile başlıyor ve olumsuz anlamlı bir belirteç cümle başına geldiğinde devrik yapı zorunlu olur: yardımcı fiil özneden önce gelir. Edilgen yapı `is … rewarded` olduğu için boşluğa `is` yazılır.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["that"],
              explain:
                "«it is on results ___ careers are built» bir yarma cümle (cleft): vurgulanan öge öne çekiliyor ve geri kalanı `that` ile bağlanıyor. `which` bu yapıda edatlı öbekten sonra kullanılmaz.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["which"],
              explain:
                "`a literature in ___ the published record is …` yapısında edattan sonra gelen ilgi zamiri `which` olmalı. `that` edatın ardından kullanılamaz, `what` ise öncül almaz.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["gets", "takes", "leads"],
              explain:
                "`get somewhere / get nowhere` kalıbı bir tartışmanın ilerleyip ilerlemediğini bildirir: «describing it as such gets the discussion nowhere». `takes` ve `leads` de aynı kalıpta kullanılabilir. `makes` bu adla bu anlamı vermez.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["which"],
              explain:
                "«Several remedies … of ___ the most promising is …» yapısı bir kısmi ilgi cümlesi kuruyor: önerilerin arasından en umut vereni. Edattan sonra `which` gerekir; `them` bir zamir olur ve cümleyi bağlamaz.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["most"],
              explain:
                "«the ___ tempting move of all» yapısında `of all` en üstünlük derecesi istiyor ve `tempting` uzun bir sıfat olduğu için biçim `the most tempting` olur. `more` karşılaştırma kurar ve `of all` ile gitmez.",
            },
          ],
        },
        {
          id: "en-c1-01-l3",
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
              title: "Eyewitness procedure",
              body: `The procedure by which a witness is asked to identify a suspect has undergone considerable {{13}} over the past thirty years.

The most important change concerns the officer running the process. Where that officer knows which person is the suspect, {{14}} signals can pass to the witness without anyone intending it.

For this reason many forces now use a colleague with no knowledge of the case, a practice whose {{15}} is now widely accepted even by those who resisted it.

A second change concerns sequence. Showing photographs one at a time reduces the {{16}} of a witness simply choosing whoever looks most like the memory.

Neither change is a guarantee, and it would be {{17}} to present them as one. What they do is narrow the range of ways in which an identification can go wrong, which is a more modest and more {{18}} claim.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-01-l3-13",
              no: 13,
              text: "REVISE",
              accept: ["revision"],
              explain:
                "`considerable ___` yapısında sıfattan sonra bir ad gerekiyor: `revision`. Fiilin kendisi bu konumda duramaz; `revised` ise sıfat olur ve `considerable` ile yan yana gelemez.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l3-14",
              no: 14,
              text: "INTEND",
              accept: ["unintended", "unintentional"],
              explain:
                "Boşluk `signals` adını niteliyor ve cümlenin sonu anlamı belirliyor: «without anyone intending it». Yani işaretler istemsiz. Kökten `intended` sıfatı, ondan da olumsuzu `unintended` türetiliyor; `unintentional` da kabul edilir.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l3-15",
              no: 15,
              text: "USE",
              accept: ["usefulness"],
              explain:
                "«a practice whose ___ is now widely accepted» yapısında iyelik ilgi zamirinden sonra bir ad geliyor ve kabul edilen şey uygulamanın yararlılığı. `use` de bir addır ama `whose use is accepted` kullanımın kendisinin kabulünü anlatır; kastedilen değerdir, dolayısıyla `usefulness`.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l3-16",
              no: 16,
              text: "LIKELY",
              accept: ["likelihood"],
              explain:
                "`reduces the ___ of a witness …` yapısında `the` ile `of` arasında bir ad var. `likely` sıfatının adı `likelihood`. Sıfat biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l3-17",
              no: 17,
              text: "LEAD",
              accept: ["misleading"],
              explain:
                "«it would be ___ to present them as one» yapısında bir sıfat gerekiyor ve anlam yanıltıcı olmak. Kökten `mislead` fiili, ondan da `misleading` sıfatı türetiliyor. Olumsuz yönü veren `mis-` öneki olmadan cümle tersine döner.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l3-18",
              no: 18,
              text: "DEFEND",
              accept: ["defensible"],
              explain:
                "`a more modest and more ___ claim` yapısında bir sıfat gerekiyor ve anlam savunulabilir olmak: `defensible`. `defensive` savunmacı demektir ve bir iddiayı nitelemez; `defended` ise bir edilgen ortaçtır ve `more` ile gitmez.",
            },
          ],
        },
        {
          id: "en-c1-01-l4",
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
              id: "en-c1-01-l4-19",
              no: 19,
              text: "People say the technique was developed in Japan.\nThe technique ______ developed in Japan.",
              cue: "SAID",
              accept: ["is said to have been", "was said to have been"],
              explain:
                "Kişisiz aktarım yapısı isteniyor: «The technique is said to have been developed …». Anahtar sözcük `said` edilgen aktarımın çekirdeği; ardından geçmişe gönderme için `to have been` geliyor. Beş sözcük sınırının tam ucunda.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l4-20",
              no: 20,
              text: "I only realised the mistake when I read the text aloud.\nNot ______ aloud did I realise the mistake.",
              cue: "UNTIL",
              accept: ["until I read it", "until I read the text"],
              explain:
                "Devrik yapı isteniyor: `Not until …` cümle başına geldiğinde ana cümle devrilir ve zaten `did I realise` biçiminde verilmiş. Anahtar sözcük `until` bu yapının bağlayıcısı; boşluğa yalnız yan cümlenin öznesi ve fiili yazılıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l4-21",
              no: 21,
              text: "The committee is unlikely to change its decision.\nThere ______ that the committee will change its decision.",
              cue: "LITTLE",
              accept: ["is little chance", "is little likelihood", "is little prospect"],
              explain:
                "Sıfatla kurulan olasılık («is unlikely to»), adlaştırılmış bir yapıya çevriliyor: «There is little chance that …». Anahtar sözcük `little` sayılamayan bir adı niteliyor, dolayısıyla `chance`, `likelihood` ya da `prospect` gelebilir.",
            },
            {
              kind: "gap",
              id: "en-c1-01-l4-22",
              no: 22,
              text: "Nobody expected the results to be so consistent.\nThe consistency of the results ______ by surprise.",
              cue: "TOOK",
              accept: ["took everyone", "took us all", "took everybody"],
              explain:
                "`take somebody by surprise` kalıbına çevriliyor ve olumsuz özneli cümle («Nobody expected») olumlu bir özneyle yeniden kuruluyor. Anahtar sözcük `took` kalıbın fiili; boşluğa yalnız nesne giriyor.",
            },
          ],
        },
        {
          id: "en-c1-01-l5",
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
              title: "The archive that remembers too well",
              body: `For most of recorded history the default condition of a statement was to disappear. A remark made in a meeting survived only in the memories of those present, and memory, as we know, edits generously. What is new is not that we are watched, which has always been true in villages, but that the watching is now perfectly retentive. The change worth naming is the erosion of an ordinary expectation: that most of what we say will be misremembered.

It is tempting to treat this as a straightforward loss of privacy, and much of the public argument does. I want to suggest that the more interesting change is to the possibility of revision. A person who cannot outrun an earlier version of themselves is not merely exposed; they are, in a sense, fixed.

Consider the ordinary business of changing one's mind. In principle this is admired. In practice it now carries an evidential cost. Not only is the earlier position retrievable, it is quotable without the reasoning that once surrounded it. What is retrieved is never the argument, only the sentence.

The usual response is to demand deletion, and I have some sympathy with it, not least because the alternative appears to be resignation. But deletion is a blunt instrument, and it tends to be available to precisely those with the resources to pursue it. A right that is expensive to exercise is not, for most people, a right.

There is a less discussed possibility, which is to change what a retrieved statement is taken to mean. We already do this in other domains: nobody reads a first draft as a final position, and no serious historian quotes a private letter as though it were a public declaration. The convention exists; it has simply not been extended to the archive we all now live inside.

I am under no illusion that conventions arrive on request. They emerge slowly, usually after enough people have been damaged by their absence. What can be said is that the technical question — can we delete this? — has absorbed nearly all the attention, while the interpretive question, which is cheaper and probably more useful, has barely been asked.`,
              gloss: [
                { de: "retentive", tr: "her şeyi tutan, unutmayan", en: "retentive" },
                { de: "revision", tr: "gözden geçirme, düzeltme", en: "revision" },
                { de: "evidential", tr: "kanıta ilişkin", en: "evidential" },
                { de: "a blunt instrument", tr: "kaba, ayrım gözetmeyen araç", en: "a blunt instrument" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-01-l5-23",
              no: 23,
              text: "What does the writer identify as genuinely new?",
              options: [
                "The fact that people observe one another",
                "The speed at which information now travels",
                "The number of people who now have access to stored records",
                "The completeness with which observation is stored",
              ],
              answer: 3,
              explain:
                "Yazar gözlenmenin yeni olmadığını açıkça söylüyor («which has always been true in villages») ve yeniliği tanımlıyor: «the watching is now perfectly retentive». Hız ve erişim sayısı metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l5-24",
              no: 24,
              text: "What does the writer mean by saying that a person may be \"fixed\"?",
              options: [
                "That their reputation has been repaired",
                "That they are prevented from moving away",
                "That the person they used to be stays attached to them",
                "That their earlier reasoning has been recovered",
              ],
              answer: 2,
              explain:
                "Cümlenin ilk yarısı anlamı veriyor: «A person who cannot outrun an earlier version of themselves». `fixed` burada onarılmak değil, sabitlenmek anlamında; yazarın vurgusu revizyon imkânının kaybı.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l5-25",
              no: 25,
              text: "What is the writer's objection to deletion as a remedy?",
              options: [
                "It is technically impossible in most systems",
                "It removes evidence that courts and future historians may later need",
                "It is only meaningfully available to those who can afford it",
                "It encourages people to make careless statements",
              ],
              answer: 2,
              explain:
                "Yazar aracın körlüğünü ve dağılımını birlikte eleştiriyor: «it tends to be available to precisely those with the resources to pursue it» ve «A right that is expensive to exercise is not, for most people, a right». Teknik imkânsızlık ya da mahkeme kaygısı metinde yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-l5-26",
              no: 26,
              text: "What does the final paragraph suggest about the writer's expectations?",
              options: [
                "He expects the convention he describes to be adopted quickly",
                "He doubts that conventions can be brought about deliberately",
                "He believes the technical question has now been answered",
                "He thinks the problem will disappear as habits change",
              ],
              answer: 1,
              explain:
                "Son paragraf iki şeyi söylüyor: yazar kuralların istek üzerine gelmediğini biliyor («conventions arrive on request» konusunda «I am under no illusion») ve bunların ancak yeterince zarardan sonra oluştuğunu ekliyor. Teknik sorunun çözüldüğünü değil, bütün dikkati soğurduğunu söylüyor.",
            },
          ],
        },
        {
          id: "en-c1-01-l6",
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
              body: "The demand for a right to be forgotten is understandable and, in my view, misdirected. What people actually want is not erasure but proportion: for a remark made at nineteen to be read as a remark made at nineteen. Erasure is what we ask for when we have no vocabulary for proportion.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "Colleagues argue that the harm here is overstated, and on the evidence available I have to concede that the population-level effects are small. My objection is different and I hold it firmly: the harm is concentrated on people who already have the least room to manoeuvre.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "Every generation believes its own technology to be the decisive break. Photographs were going to end private life; so was the telephone. I am not saying nothing has changed. I am saying that the confident tone of the current debate is the least reliable thing about it.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "We should be candid that deletion mechanisms mostly serve institutions rather than individuals. In the cases I have studied, the successful applicants were overwhelmingly organisations with legal departments. The remedy has been captured by the parties it was not designed for.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "The technical framing has done real damage. Once a question becomes a matter for engineers, it stops being a matter for anybody else, and the interesting arguments about interpretation are conducted, if at all, in a language that excludes the people affected.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-01-l6-27",
              no: 27,
              text: "Which writer argues that the wrong remedy is being demanded because the right concept is missing?",
              answer: "a",
              explain:
                "Yazar A talebi yeniden tanımlıyor: istenen şey silme değil orantı, «Erasure is what we ask for when we have no vocabulary for proportion». Yani yanlış çare, doğru kavramın yokluğundan doğuyor. D de çareyi eleştiriyor ama gerekçesi kavram eksikliği değil, kimin yararlandığı.",
            },
            {
              kind: "match",
              id: "en-c1-01-l6-28",
              no: 28,
              text: "Which writer accepts part of an opposing case while maintaining their own position?",
              answer: "b",
              explain:
                "Yazar B karşı tarafa açık bir taviz veriyor («I have to concede that the population-level effects are small») ve hemen ardından kendi itirazını koruyor: «My objection is different and I hold it firmly». Kısmi kabul ile konum koruma aynı cümlelerde.",
            },
            {
              kind: "match",
              id: "en-c1-01-l6-29",
              no: 29,
              text: "Which writer is most sceptical about the tone of the discussion rather than its subject?",
              answer: "c",
              explain:
                "Yazar C bir şeyin değişmediğini söylemiyor («I am not saying nothing has changed»); eleştirdiği şey tartışmanın kendinden emin tonu: «the confident tone of the current debate is the least reliable thing about it».",
            },
            {
              kind: "match",
              id: "en-c1-01-l6-30",
              no: 30,
              text: "Which writer claims that framing a question in one discipline's terms excludes others from it?",
              answer: "e",
              explain:
                "Yazar E çerçevelemenin sonucunu anlatıyor: bir soru mühendislerin işi olunca başkasının işi olmaktan çıkıyor ve tartışma «in a language that excludes the people affected» yürüyor.",
            },
          ],
        },
        {
          id: "en-c1-01-l7",
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
              title: "The interpreter in the room",
              body: `When two governments negotiate, a third person is present whose name rarely appears in the account afterwards. The interpreter is treated as a channel, and the metaphor is convenient for everybody involved.

{{31}}

The consequences are visible in the archive. Historians working on twentieth-century summits have found that where two interpreters were present, the two records frequently diverge on precisely the sentences that later mattered.

{{32}}

None of this implies bad faith. An interpreter who softens a threat is usually doing what a professional judgement tells them the speaker intended, and in the great majority of cases the judgement is sound.

{{33}}

Some services have responded by recording the original audio alongside the interpreted version, so that a disputed passage can be checked. The measure is unpopular with interpreters, who point out, not unreasonably, that no other participant is asked to work with a permanent record of every hesitation.

{{34}}

What is striking is how recent this discussion is. For most of the period in which modern diplomacy has existed, the question of what the interpreter contributed was not merely unanswered; it was regarded as slightly improper to ask.`,
              gloss: [
                { de: "to diverge", tr: "ayrışmak", en: "to diverge" },
                { de: "a summit", tr: "zirve", en: "summit" },
                { de: "improper", tr: "uygunsuz", en: "improper" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "It is also, on any close examination, false. Translation between languages that carve up obligation and politeness differently is not a transfer but a series of decisions, and the person making them is doing something closer to drafting than to transmission.",
            },
            {
              key: "b",
              label: "b",
              body: "The difficulty is that soundness cannot be assessed afterwards by anyone who was not in the room. A decision that was right at the time is indistinguishable, in the written record, from one that was not.",
            },
            {
              key: "c",
              label: "c",
              body: "One well-documented case concerns a conditional offer that appears in one version as an undertaking and in the other as a possibility. Both interpreters were experienced, and neither record is obviously wrong.",
            },
            {
              key: "d",
              label: "d",
              body: "Modern conference facilities typically provide booths with soundproofing to a specified standard, and the technical requirements are set out in an international norm.",
            },
            {
              key: "e",
              label: "e",
              body: "Their objection has some force, and the compromise that has emerged in several institutions is narrow: the audio exists, but it may be consulted only where the parties disagree about what was said.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-01-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "a",
              explain:
                "Boşluktan önceki paragraf benzetmenin herkes için elverişli olduğunu söylüyor; (a) «It is also, on any close examination, false» ile o benzetmeye geri gönderme yapıp çürütüyor. `also` ve `It` birlikte önceki cümleye kilitleniyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "c",
              explain:
                "Önceki paragraf «the two records frequently diverge on precisely the sentences that later mattered» diyor; (c) bunun belgelenmiş bir örneğini veriyor: bir versiyonda taahhüt, ötekinde olasılık. Genel bulgudan tekil örneğe geçiş.",
            },
            {
              kind: "match",
              id: "en-c1-01-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "b",
              explain:
                "Önceki paragraf kararların çoğunlukla isabetli olduğunu söylüyor; (b) «The difficulty is that soundness cannot be assessed afterwards» ile o isabetliliğe geri gönderme yapıp asıl sorunu koyuyor. `soundness` doğrudan önceki cümledeki `sound` sözcüğünü karşılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "e",
              explain:
                "Önceki paragraf çevirmenlerin itirazını aktarıyor; (e) «Their objection has some force» ile o itiraza gönderme yapıp varılan uzlaşmayı veriyor. (d) kabin yalıtımı standartlarından söz ediyor ve metnin hiçbir yerinde teknik donanım tartışılmıyor — hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-01-l8",
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
              label: "a — Court interpreter",
              body: "The hardest moment is a witness who says something that cannot be true in the target language without a choice being made. I render it as closely as the grammar permits and then, if the court allows, I say that a choice was made. Half of my colleagues consider that second step improper, and I understand why, but silence is also a choice and nobody calls it one.",
            },
            {
              key: "b",
              label: "b — Historian",
              body: "The records I work with were produced by people under enormous time pressure, and it shows. What frustrates me is not the errors, which are inevitable, but the convention of presenting the transcript as though it were the meeting. Nobody in the profession believes that, and yet the footnotes rarely say so.",
            },
            {
              key: "c",
              label: "c — Machine translation researcher",
              body: "Our systems are now excellent at the sentences that appear a million times and poor at the ones that appear once, which unfortunately is where the difficulty always was. I would add that the fluency of the output actively conceals this: a confident wrong translation is harder to catch than a clumsy one.",
            },
            {
              key: "d",
              label: "d — Diplomat",
              body: "I have sat through negotiations in which the interpreter's phrasing changed the temperature of the room, twice in one afternoon. Colleagues who dispute this have usually only worked in languages close to their own. I would not blame the interpreter for either occasion; the pressure to keep things moving comes from us.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-01-l8-35",
              no: 35,
              text: "Which text says that a convention is maintained although nobody accepts it?",
              answer: "b",
              explain:
                "Tarihçi tutanağın toplantı yerine geçirilmesini bir usul olarak eleştiriyor: «Nobody in the profession believes that, and yet the footnotes rarely say so» — inanılmayan ama sürdürülen bir uzlaşım.",
            },
            {
              kind: "match",
              id: "en-c1-01-l8-36",
              no: 36,
              text: "Which text says that an apparent strength makes a weakness harder to detect?",
              answer: "c",
              explain:
                "Araştırmacı akıcılığın kusuru gizlediğini söylüyor: «a confident wrong translation is harder to catch than a clumsy one». Güçlü görünen özellik (akıcılık) tespiti zorlaştırıyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-l8-37",
              no: 37,
              text: "Which text defends a practice that some colleagues regard as unacceptable?",
              answer: "a",
              explain:
                "Mahkeme çevirmeni seçim yapıldığını mahkemeye bildirmeyi savunuyor ve karşı çıkışı da anıyor: «Half of my colleagues consider that second step improper, and I understand why, but silence is also a choice».",
            },
            {
              kind: "match",
              id: "en-c1-01-l8-38",
              no: 38,
              text: "Which text attributes the underlying pressure to its own professional group?",
              answer: "d",
              explain:
                "Diplomat sorumluluğu kendi tarafına alıyor: «I would not blame the interpreter for either occasion; the pressure to keep things moving comes from us». Suçlanan taraf çevirmen değil, diplomatların kendisi.",
            },
            {
              kind: "match",
              id: "en-c1-01-l8-39",
              no: 39,
              text: "Which text dismisses a disagreement by pointing to the limited experience of those who raise it?",
              answer: "d",
              explain:
                "Diplomat itiraz edenleri bir sınırla açıklıyor: «Colleagues who dispute this have usually only worked in languages close to their own». İtiraz çürütülmüyor, itiraz edenlerin deneyimi daraltılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-l8-40",
              no: 40,
              text: "Which text says that the errors themselves are not what troubles the writer?",
              answer: "b",
              explain:
                "Tarihçi ayrımı açıkça yapıyor: «What frustrates me is not the errors, which are inevitable, but the convention …». Rahatsızlığın kaynağı hata değil, hatanın sunuluş biçimi.",
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
          id: "en-c1-01-h1",
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
              situation: "İki dilbilimci bir saha çalışmasını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Rosa", text: "The recordings are extraordinary, but I keep coming back to the consent question. Half of these speakers agreed in 1974 to something nobody could have described accurately at the time." },
                { speaker: "Ivan", text: "That is true of every archive, though. If we applied that standard consistently there would be very little left to work with." },
                { speaker: "Rosa", text: "I am not proposing that we destroy anything. I am proposing that we stop treating a 1974 signature as if it settled the matter, which is a much smaller claim." },
                { speaker: "Ivan", text: "Then we probably agree. What worries me is the direction of travel: once a caveat becomes a rule, the material stops circulating and the languages concerned lose the one advantage the archive gave them." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Radio interview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir yazar yeni kitabından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Host", text: "You have written about forgetting as a skill rather than a failure. Is that not a rather comfortable idea?" },
                { speaker: "Author", text: "It would be if I were recommending it, and I am careful not to. The claim is descriptive: a system that retained everything would be unusable, and every memory researcher I have spoken to takes that as obvious." },
                { speaker: "Host", text: "And yet the popular books all promise better recall." },
                { speaker: "Author", text: "They do, and they sell well, which tells you something about what readers want rather than about what is true. I would not be too hard on them; my own first book had a chapter I would now cut." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Lecture extract",
              genreTr: "Ders parçası",
              situation: "Bir öğretim üyesi kanıt standartlarından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Lecturer", text: "You will hear it said that a single study proves nothing. As a slogan this is useful and as a principle it is lazy, because it gives you no way of deciding what a hundred weak studies amount to." },
                { speaker: "Lecturer", text: "What matters is not the count but the independence. Twenty studies from one laboratory using one instrument are, for our purposes, closer to one study than to twenty, and no amount of arithmetic will rescue them." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-01-h1-1",
              no: 1,
              ref: "a1",
              text: "What is Rosa's position?",
              options: ["That the recordings should not be used at all", "That an old consent should not be treated as final", "That the speakers should be traced and asked again"],
              answer: 1,
              explain:
                "Rosa kendi iddiasını daraltıyor: «I am not proposing that we destroy anything. I am proposing that we stop treating a 1974 signature as if it settled the matter». Konuşmacıları yeniden bulmaktan hiç söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h1-2",
              no: 2,
              ref: "a1",
              text: "What does Ivan fear?",
              options: ["That a caution will harden into a restriction", "That the archive will be physically lost", "That other researchers will copy the material"],
              answer: 0,
              explain:
                "Ivan endişesini «the direction of travel» diye adlandırıyor: «once a caveat becomes a rule, the material stops circulating». Yani çekincenin kurala dönüşmesi. Fiziksel kayıp ya da kopyalama kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h1-3",
              no: 3,
              ref: "a2",
              text: "How does the author answer the suggestion that her idea is comfortable?",
              options: ["By agreeing that the idea is genuinely reassuring to people", "By pointing out that she is describing, not advising", "By citing the sales of her own book"],
              answer: 1,
              explain:
                "Yazar koşul kuruyor: «It would be if I were recommending it, and I am careful not to», ve iddianın betimleyici olduğunu söylüyor. Satış rakamı başka kitaplar için anılıyor, kendi savunması olarak değil.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h1-4",
              no: 4,
              ref: "a2",
              text: "What is her attitude to the popular books?",
              options: ["Dismissive, since they are written for money", "Hostile, because they misrepresent the research", "Restrained, because she includes her own earlier work"],
              answer: 2,
              explain:
                "Yazar sert davranmayacağını söylüyor ve kendi ilk kitabından bir bölümü şimdi çıkaracağını ekliyor: «I would not be too hard on them; my own first book had a chapter I would now cut». Bu, eleştiriyi kendine de uygulayan ölçülü bir tavır.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h1-5",
              no: 5,
              ref: "a3",
              text: "What is the lecturer's objection to the slogan?",
              options: ["It is false in most practical cases", "It offers no way of weighing weak evidence", "It is used mainly by people outside the field"],
              answer: 1,
              explain:
                "Öğretim üyesi sloganı yararlı ama tembel buluyor ve gerekçeyi veriyor: «it gives you no way of deciding what a hundred weak studies amount to». Yanlış olduğunu söylemiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h1-6",
              no: 6,
              ref: "a3",
              text: "What does the lecturer say matters most?",
              options: ["Whether the studies are independent of one another", "How many participants each study included", "Whether the results were published quickly"],
              answer: 0,
              explain:
                "Ölçüt açıkça veriliyor: «What matters is not the count but the independence», ve tek laboratuvardan yirmi çalışmanın bir çalışmaya daha yakın olduğu söyleniyor. Katılımcı sayısı ve yayın hızı kayıtta hiç geçmiyor.",
            },
          ],
        },
        {
          id: "en-c1-01-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a talk about an oral history project. Complete the sentences, questions 7 to 14, with a word or a short phrase. You hear the talk ONCE only.",
          promptTr:
            "Bir sözlü tarih projesi üzerine sunum dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da kısa bir öbekle tamamla. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Talk",
              genreTr: "Sunum",
              situation: "Bir sözlü tarih projesinin sorumlusu on yıllık sonuçları anlatıyor.",
              plays: 1,
              segments: [
                {
                  text: "Good afternoon. Ten years ago we set out to record two hundred interviews with people who had worked in the docks. We have completed three hundred and forty, which sounds like an achievement and was in fact a mistake, and I will come back to that. The average interview lasts two hours, and the longest ran to nine. Transcription is where the money goes: it costs us roughly eight times what the recording costs, and it is the item that funders least like to pay for. Now, the mistake. Because we prioritised numbers, we interviewed the people who volunteered, and the people who volunteer are not a cross-section. Our sample is heavily weighted towards men who stayed in the industry until retirement. The women who did the administrative work are barely represented, and those who left early are almost absent. If I were starting again, I would record half as many and choose them deliberately. One more thing worth saying: the most valuable material has come not from the interviews themselves but from the follow-up visits, when people bring out documents they did not think were interesting.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentence completion",
              genreTr: "Cümle tamamlama",
              title: "Oral history project — findings",
              body: `The original target was {{7}} interviews.

The number actually completed is {{8}}.

The longest interview lasted {{9}} hours.

Transcription costs about {{10}} times as much as recording.

The sample is weighted towards men who stayed until {{11}}.

The group that is almost absent is those who {{12}} early.

If starting again, the speaker would record {{13}} as many interviews.

The most valuable material has come from the {{14}} visits.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-01-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["200", "two hundred"],
              explain:
                "«we set out to record two hundred interviews» — hedef iki yüz. Üç yüz kırk ise gerçekleşen sayı; konuşmacı ikisini bilerek yan yana koyuyor ve fazlalığın bir hata olduğunu söylüyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["340", "three hundred and forty"],
              explain:
                "«We have completed three hundred and forty» — tamamlanan sayı. Hedefin üstünde olması başarı gibi görünüyor ama konuşmacı «was in fact a mistake» diyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["9", "nine"],
              explain:
                "«The average interview lasts two hours, and the longest ran to nine» — en uzunu dokuz saat. İki saat ortalamadır; cümlede iki sayı arka arkaya geçiyor ve not kâğıdı en uzunu soruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["8", "eight"],
              explain:
                "«it costs us roughly eight times what the recording costs» — deşifre kayıttan sekiz kat pahalı. Bu sayı aynı zamanda konuşmacının fon sorununu açıklıyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["retirement"],
              explain:
                "«heavily weighted towards men who stayed in the industry until retirement» — örneklem emekliliğe kadar sektörde kalan erkeklere kaymış. Bu, gönüllülük esasının yarattığı çarpıklığın somut hâli.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["left"],
              explain:
                "«those who left early are almost absent» — neredeyse hiç temsil edilmeyen grup erken ayrılanlar. Kadınlar da az temsil ediliyor ama konuşmacı onlar için «barely represented», bu grup için «almost absent» diyor.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["half"],
              explain:
                "«I would record half as many and choose them deliberately» — yarısı kadar kayıt, ama seçilerek. Konuşmacının kendi hatasından çıkardığı ders sayıyı değil seçimi önceliklemek.",
            },
            {
              kind: "gap",
              id: "en-c1-01-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["follow-up", "follow up"],
              explain:
                "«the most valuable material has come not from the interviews themselves but from the follow-up visits» — asıl değer sonraki ziyaretlerde, çünkü insanlar önemsiz sandıkları belgeleri o zaman çıkarıyor.",
            },
          ],
        },
        {
          id: "en-c1-01-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "You hear part of a panel discussion about archives and access. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr: "Arşivler ve erişim üzerine bir panelin bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Kaydı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir panelde üç konuşmacı arşiv erişimini tartışıyor.",
              plays: 1,
              segments: [
                { speaker: "Chair", text: "Nadia, you have argued that open access to archives is not the unmixed good it is presented as. Would you set out the case?" },
                { speaker: "Nadia", text: "I would put it more narrowly than that. Open access is good; what I object to is the assumption that it is costless. Every collection I have worked with has material that identifies living people who never consented, and putting it online does not make that problem smaller. It makes it faster." },
                { speaker: "Chair", text: "Tomas, you run a digitisation programme. Is that a fair description?" },
                { speaker: "Tomas", text: "It is fair, and I would add that we brought it on ourselves. For fifteen years the profession sold digitisation to funders as though the only obstacle were money. We never priced the review that ought to precede publication, and now we are asked why the backlog is so large." },
                { speaker: "Chair", text: "So the delay is a consequence of the promise?" },
                { speaker: "Tomas", text: "Partly. It is also a consequence of scale. Reviewing a box of letters takes a trained person a day; we have four hundred thousand boxes. No plausible amount of funding solves that by review alone." },
                { speaker: "Chair", text: "Priya, you have suggested that the debate is framed wrongly." },
                { speaker: "Priya", text: "I have, though I want to distance myself from a caricature that sometimes gets attributed to me. I am not saying access does not matter. I am saying that we treat access as binary — open or closed — when almost every real solution is a gradient. Supervised reading rooms, delayed release, access on request with a reason given: these are not failures to be open." },
                { speaker: "Nadia", text: "On that we agree entirely, and I would go further. The binary framing suits institutions, because it lets them announce a policy instead of building a process." },
                { speaker: "Tomas", text: "I will push back gently there. Building a process requires staff, and staff require exactly the funding that a policy announcement is designed to attract. It is not always cynicism; sometimes it is sequencing." },
                { speaker: "Chair", text: "A final word from each of you on what should change first." },
                { speaker: "Priya", text: "Terminology. As long as the only word we have is open, everything else sounds like a compromise." },
                { speaker: "Tomas", text: "Costing. Publish what review actually costs per box, and the conversation changes overnight." },
                { speaker: "Nadia", text: "Neither, for me. I would start with the people in the records, because they are the only party in this discussion who are never in the room." },
              ],
              gloss: [
                { de: "a backlog", tr: "birikmiş iş", en: "backlog" },
                { de: "a caricature", tr: "karikatür, çarpıtılmış hâl", en: "caricature" },
                { de: "a gradient", tr: "derece, kademe", en: "gradient" },
                { de: "sequencing", tr: "sıralama, öncelik düzeni", en: "sequencing" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-01-h3-15",
              no: 15,
              ref: "c1",
              text: "How does Nadia refine the chair's summary of her position?",
              options: [
                "She rejects open access in principle",
                "She objects to the belief that it has no costs",
                "She argues that consent can never be obtained",
                "She claims that online publication is technically unsafe",
              ],
              answer: 1,
              explain:
                "Nadia başkanın özetini daraltıyor: «Open access is good; what I object to is the assumption that it is costless». İlkeye karşı değil, maliyetsiz sayılmasına karşı; rızanın imkânsızlığını da hiç iddia etmiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-16",
              no: 16,
              ref: "c1",
              text: "What does Nadia say online publication does to the problem?",
              options: ["It reduces it over time", "It transfers it to another institution", "It accelerates it", "It makes it easier to detect"],
              answer: 2,
              explain:
                "Nadia iki cümleyi karşı karşıya koyuyor: «does not make that problem smaller. It makes it faster». Yani sorun küçülmüyor, hızlanıyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-17",
              no: 17,
              ref: "c1",
              text: "What responsibility does Tomas accept?",
              options: [
                "That his programme digitised the wrong collections",
                "That the profession presented money as the only obstacle",
                "That review standards were set too high",
                "That funders were misled about the timescale",
              ],
              answer: 1,
              explain:
                "Tomas «we brought it on ourselves» diyor ve gerekçeyi veriyor: on beş yıl boyunca dijitalleştirme fonculara tek engel paraymış gibi satılmış, inceleme maliyeti hiç fiyatlanmamış. Yanlış koleksiyon ya da yüksek standart iddiası yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-18",
              no: 18,
              ref: "c1",
              text: "What does Tomas say about funding and scale?",
              options: [
                "More funding would resolve the backlog within a decade",
                "Scale is a smaller problem than the promise that was made",
                "Review alone cannot solve the problem at any realistic budget",
                "The number of boxes has been overstated by critics",
              ],
              answer: 2,
              explain:
                "Tomas sayıyı verip sonucu söylüyor: dört yüz bin kutu ve kutu başına bir gün. «No plausible amount of funding solves that by review alone» — yani inceleme tek başına yetmez.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-19",
              no: 19,
              ref: "c1",
              text: "Why does Priya begin by distancing herself from a caricature?",
              options: [
                "Because she has changed her position since publishing it",
                "Because her view is often reported as opposition to access",
                "Because the chair has misquoted her in the introduction",
                "Because she disagrees with the other panellists",
              ],
              answer: 1,
              explain:
                "Priya kendisine atfedilen çarpıtmayı düzeltiyor: «I am not saying access does not matter». Yani görüşü erişime karşıtlık gibi aktarılıyor. Başkanı düzeltmiyor, genel bir yanlış anlamayı düzeltiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-20",
              no: 20,
              ref: "c1",
              text: "What is Priya's main claim about the debate?",
              options: [
                "It ignores the cost of digitisation entirely",
                "It treats a matter of degree as a matter of either-or",
                "It is dominated by institutions rather than researchers",
                "It relies on legal categories that are out of date",
              ],
              answer: 1,
              explain:
                "Priya «we treat access as binary — open or closed — when almost every real solution is a gradient» diyor ve ara çözümleri sayıyor. İkili çerçeveleme, derece meselesini ya-hep-ya-hiç meselesine indirgiyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-21",
              no: 21,
              ref: "c1",
              text: "How does Tomas respond to Nadia's remark about institutions?",
              options: [
                "He accepts it and adds a further example",
                "He rejects it as unfair to funders",
                "He suggests that the motive may be practical rather than cynical",
                "He argues that policies are more effective than processes",
              ],
              answer: 2,
              explain:
                "Tomas yumuşak bir itiraz getiriyor: süreç kadro ister, kadro fon ister ve fonu çeken şey politika duyurusudur. «It is not always cynicism; sometimes it is sequencing» — güdü art niyet değil sıralama olabilir.",
            },
            {
              kind: "mcq",
              id: "en-c1-01-h3-22",
              no: 22,
              ref: "c1",
              text: "How does Nadia's closing answer differ from the other two?",
              options: [
                "She names a change of vocabulary rather than of practice",
                "She declines to name any priority at all",
                "She sets aside both suggestions in favour of the people described in the records",
                "She repeats the point she made at the beginning",
              ],
              answer: 2,
              explain:
                "Nadia «Neither, for me» diyerek iki öneriyi de bir kenara koyuyor ve kayıtlardaki insanları öne alıyor: «they are the only party in this discussion who are never in the room». Terminoloji önerisi Priya'nın.",
            },
          ],
        },
        {
          id: "en-c1-01-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about a piece of research. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Bir araştırma hakkında sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to correct a misunderstanding of their own work" },
            { key: "b", label: "to explain why a result has not been published" },
            { key: "c", label: "to withdraw a claim made earlier" },
            { key: "d", label: "to defend a method that has been criticised" },
            { key: "e", label: "to warn against a likely misuse of a finding" },
            { key: "f", label: "to acknowledge a rival's contribution" },
            { key: "g", label: "to ask for help with an unresolved problem" },
            { key: "h", label: "to justify a change of research direction" },
            { key: "i", label: "to complain about the review process" },
            { key: "j", label: "to describe an unexpected practical use" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "Several summaries say we found that bilingual children learn to read later. We did not. We found that they reach one particular sub-skill later and catch up within the year, which is a different sentence and, unfortunately, a duller one." }],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "I can see exactly how this will be used: as an argument for testing four-year-olds. Nothing in our data supports that, and if a ministry cites us next year I would like it on record that we said so first." }],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "In my 2019 paper I said the effect was robust across settings. I no longer believe that. Two replications have failed and the honest thing is to say so plainly rather than to bury it in a footnote." }],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "Critics say our sample was self-selected, and it was. What they omit is that we tested for exactly that and reported the comparison in the appendix. I would rather be argued with on the basis of what we wrote." }],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "We had the results eighteen months ago. They are still not out, and the reason is not modesty: the effect is small and every journal we have approached wants a stronger version of the sentence than the data allows." }],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "It is worth saying that the design we used was not ours. A group in Lisbon published it four years earlier and it was largely ignored, including by us. We have written to them and cited it properly in the revision." }],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Speaker 7",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "We built the tool to score our own transcripts. Then a hospital asked whether it could flag inconsistent discharge notes, and it turns out that it can, rather better than it does the thing we designed it for." }],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı bir araştırmadan söz ediyor.",
              plays: 2,
              segments: [{ text: "After eleven years I am moving to a different question, and I want to be clear that this is not disillusionment. We answered what we could answer with the instruments available, and the remaining questions need instruments that do not exist yet." }],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-01-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı özetlerin yanlış aktardığını söyleyip doğrusunu veriyor: «We did not. We found that they reach one particular sub-skill later and catch up within the year». Amaç kendi çalışmasına dair bir yanlış anlamayı düzeltmek.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "e",
              explain:
                "Konuşmacı olası bir kötüye kullanımı önceden adlandırıyor: «as an argument for testing four-year-olds. Nothing in our data supports that» ve kayda geçmesini istiyor. Bu bir uyarı, bir düzeltme değil.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı eski iddiasını geri çekiyor: «I no longer believe that. Two replications have failed and the honest thing is to say so plainly». Bu bir düzeltme değil, iddianın kendisinden vazgeçme.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "d",
              explain:
                "Konuşmacı eleştiriyi kısmen kabul edip yöntemini savunuyor: «we tested for exactly that and reported the comparison in the appendix». Amaç yöntemi eleştiriye karşı korumak.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Konuşmacı yayımlanmama sebebini veriyor: etki küçük ve dergiler verinin izin verdiğinden güçlü bir cümle istiyor. «the reason is not modesty» ifadesi başka bir açıklamayı da baştan eliyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Konuşmacı tasarımın kendilerine ait olmadığını söylüyor ve önceliği başkasına veriyor: «A group in Lisbon published it four years earlier … We have written to them and cited it properly». Bu bir katkı teslimi.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "j",
              explain:
                "Araç kendi dökümleri için yapılmış ama hastane başka bir işte kullanmış ve «rather better than it does the thing we designed it for» çıkmış. Beklenmedik bir pratik kullanım anlatılıyor.",
            },
            {
              kind: "match",
              id: "en-c1-01-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "h",
              explain:
                "Konuşmacı yön değişikliğini gerekçelendiriyor ve yanlış okumayı önceden eliyor: «this is not disillusionment». Kalan sorular henüz var olmayan araçlar gerektiriyor.",
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
          id: "en-c1-01-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a discussion on public archives. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. Making records freely available online serves everyone equally.\n2. Records often contain information about people who never agreed to publication.\n\nWrite 220 to 260 words.",
          promptTr:
            "Kamu arşivleri üzerine bir tartışmaya katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Kayıtları internette serbestçe erişilebilir kılmak herkese eşit hizmet eder.\n2. Kayıtlar çoğu zaman yayımlanmayı hiç kabul etmemiş insanlar hakkında bilgi taşır.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `Both points made in the discussion are serious, and the disagreement between them is not easily settled by appealing to a principle.

The first holds that free online access serves everyone equally. Its strength lies in what it replaces: a system in which the people able to consult an archive were those who could afford to travel to it and take a week away from work. Digitisation removes a barrier that was never intended but was very real, and it is worth saying plainly that this is a democratic gain rather than a convenience.

The second point is that records frequently describe people who never agreed to publication, and often could not have. This is not a hypothetical concern. A hospital admission recorded in 1958 is a fact about someone who may still be living, and no consent form from that period anticipated a search engine.

Of the two, I regard the second as more important, though not for the reason usually given. The first problem has a known solution and a known cost: money, staff and time. The second has no solution at all in the same sense, because it concerns people who cannot be consulted, and a problem without a technical remedy deserves the greater share of our attention.

My own view is that the choice is often false. What is missing is not a decision between openness and protection but a vocabulary of intermediate arrangements, and the absence of that vocabulary is what makes the argument feel intractable.`,
            criteria: [
              "İki nokta da adil biçimde özetlendi mi, yoksa biri zayıflatılarak mı sunuldu?",
              "Seçim açıkça yapıldı ve gerekçelendirildi mi?",
              "Kendi görüş özetten ayrılıyor mu, yoksa özetin tekrarı mı?",
              "Metin bir denemenin yapısını taşıyor mu — giriş, iki taraf, karar, kendi konumu?",
              "Bağlayıcılar ve çekimserlik ifadeleri C1 düzeyinde mi? (though not for the reason usually given, in the same sense)",
              "220–260 kelime aralığında mı?",
              "Kayıt akademik mi? Konuşma dili ve kısaltmalar beklenmez.",
            ],
          },
        },
        {
          id: "en-c1-01-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "The library where you study is deciding how to spend a one-off sum on its local history collection. Write a proposal to the library committee. Describe the current situation, recommend how the money should be spent, and address one likely objection. Write 220 to 260 words.",
          promptTr:
            "Okuduğun kütüphane yerel tarih koleksiyonuna tek seferlik bir bütçe ayıracak. Kütüphane komisyonuna bir öneri yaz. Mevcut durumu anlat, paranın nasıl harcanması gerektiğini öner ve olası bir itirazı karşıla. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the current situation with evidence.", tr: "Mevcut durumu kanıtla anlat." },
              { de: "Make a specific recommendation.", tr: "Belirli bir öneri sun." },
              { de: "Address one objection that the committee is likely to raise.", tr: "Komisyonun getirmesi muhtemel bir itirazı karşıla." },
            ],
            sample: `Proposal: local history collection

Current situation

The collection holds approximately four thousand items, of which the catalogue lists fewer than half. In practice this means that a reader must know what they are looking for before they can find it, which reverses the purpose of a catalogue. Three enquiries in the last term were abandoned for this reason, according to the enquiry log.

Recommendation

I recommend that the whole sum be spent on cataloguing rather than on digitisation. Two part-time posts for one year would clear the backlog, and the resulting records would be usable immediately, at no further cost, by every reader and by other libraries through the shared catalogue.

Anticipated objection

The committee may reasonably object that digitisation is more visible and photographs well, whereas a catalogue record is invisible to anyone not already searching. I accept the force of this. My answer is that digitising an uncatalogued collection produces images that nobody can locate, and the sequence therefore matters: cataloguing first makes any later digitisation cheaper, while digitising first does nothing to make cataloguing cheaper.

Conclusion

I would add that cataloguing is reversible in a way that spending on equipment is not. If the committee prefers a smaller commitment, half the sum would still complete the two largest uncatalogued series, and I would regard that as a better outcome than an evenly divided budget that finishes neither task.`,
            criteria: [
              "Mevcut durum somut kanıtla mı anlatıldı? (sayı, kayıt, gözlem)",
              "Öneri belirli mi — ne, ne kadar, ne süreyle?",
              "İtiraz gerçekten güçlü hâliyle mi kuruldu, yoksa zayıflatılarak mı?",
              "İtiraza verilen cevap iddiayı karşılıyor mu?",
              "Metin bir öneri belgesi gibi mi yapılandırılmış (başlıklar, bölümler)?",
              "220–260 kelime aralığında mı?",
              "Kayıt resmî ve kurumsal mı?",
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
          id: "en-c1-01-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about evidence, memory and how you form judgements.",
          promptTr: "Sana kanıt, bellek ve yargıya nasıl vardığın hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good morning. Can you describe a time when you changed your mind about something you had held for a long time?", tr: "Günaydın. Uzun süredir savunduğun bir konuda fikrini değiştirdiğin bir anı anlatır mısın?" },
            { who: "you", hint: "Somut bir örnek ver ve neyin fikrini değiştirdiğini adlandır.", expect: "somut bir fikir değişimini anlatmak ve nedenini adlandırmak", seconds: 50 },
            { who: "partner", de: "Thank you. Do you think people are generally too quick or too slow to revise their views?", tr: "Teşekkürler. Sence insanlar görüşlerini genelde çok mu çabuk çok mu geç gözden geçiriyor?" },
            { who: "you", hint: "Genel bir yargı ver ama koşullandır; tek yanlı olma.", expect: "genel bir yargıyı koşullandırarak vermek", seconds: 50 },
            { who: "partner", de: "And what would make you distrust a source that you currently rely on?", tr: "Şu an güvendiğin bir kaynağa güvenini ne sarsardı?" },
            { who: "you", hint: "Somut bir ölçüt söyle ve neden o ölçüt olduğunu açıkla.", expect: "bir ölçüt öne sürmek ve ölçüt seçimini gerekçelendirmek", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "give extended, structured answers", tr: "Geliştirilmiş ve yapılandırılmış cevaplar vermek" },
              { de: "qualify general claims rather than assert them flatly", tr: "Genel yargıları düz iddia yerine koşullandırarak vermek" },
            ],
            sample:
              "For years I assumed that a longer training course must be better than a short one. What changed my mind was not an argument but a comparison: two colleagues, one with a fortnight of training and one with three months, made the same mistakes in the same order. On the general question, I would say people are quick to revise on matters where nothing follows from being wrong and extremely slow where something does, which is not really a fact about intelligence. What would make me distrust a source is not a single error but the way it handles one: if a correction appears without an explanation of how the error arose, I read everything else differently.",
            criteria: [
              "Örnek somut mu ve fikir değişiminin sebebi adlandırıldı mı?",
              "Genel yargı koşullandırıldı mı? (I would say … where … and … where …)",
              "Öne sürülen ölçüt gerekçelendirildi mi?",
              "Cümle yapıları çeşitli ve akıcı mı?",
            ],
          },
        },
        {
          id: "en-c1-01-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes on this question: \"When an institution has records about people who are still alive, what should guide its decision to publish?\" Consider at least two competing interests and say where you would draw the line.",
          promptTr:
            "Şu soru üzerine yaklaşık iki dakika tek başına konuş: \"Bir kurumun elinde hâlâ yaşayan insanlara dair kayıtlar varsa, yayımlama kararını ne yönlendirmeli?\" En az iki çatışan çıkarı ele al ve sınırı nereye çekeceğini söyle.",
          prepSeconds: 60,
          speakSeconds: 110,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "identify at least two competing interests", tr: "En az iki çatışan çıkarı adlandır" },
              { de: "state where you would draw the line and why", tr: "Sınırı nereye çekeceğini ve nedenini söyle" },
              { de: "acknowledge a case that your rule handles badly", tr: "Kendi kuralının kötü işlediği bir durumu kabul et" },
            ],
            sample:
              "There are at least three interests here and they do not point the same way. The first is the public interest in understanding how an institution behaved, which is strongest exactly where the institution behaved badly. The second is the interest of the individuals described, who are usually the least powerful party and who never chose to be in the file. The third, which is often forgotten, is the interest of future readers, since a record withheld now is frequently a record lost. I would draw the line at identification rather than at content: publish what the institution did, in full, and withhold what identifies a private individual until a fixed period has passed. I am aware that my rule handles one case badly. Where the individual is the whole story — where the harm was done to one named person — anonymising the record can make it unreadable, and I do not have a clean answer to that. What I would resist is treating that hard case as a reason to abandon the general rule, which is what usually happens.",
            criteria: [
              "En az iki çatışan çıkar adlandırıldı mı?",
              "Sınır açıkça çizildi mi ve gerekçelendirildi mi?",
              "Kendi kuralının kötü işlediği bir durum kabul edildi mi? Bu, C1'de beklenen kendini sınama.",
              "İki dakika boyunca yapı korundu mu — sıralama, karar, çekince?",
              "Soyut söz varlığı ve adlaştırma kullanılabildi mi?",
            ],
          },
        },
        {
          id: "en-c1-01-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A city archive must decide how to spend a limited budget. Talk with me about the options and then agree on a priority order for the top three.",
          promptTr:
            "Bir şehir arşivi sınırlı bir bütçeyi nasıl harcayacağına karar verecek. Seçenekleri benimle konuş ve ilk üç için bir öncelik sırasında anlaş.",
          prepSeconds: 40,
          exchange: [
            { who: "partner", de: "The options are: cataloguing the uncatalogued material, digitising what is already catalogued, a public exhibition, training staff in privacy review, and extending the opening hours. Which two strike you as most defensible, and why?", tr: "Seçenekler: kataloglanmamış malzemenin kataloglanması, zaten kataloglanmış olanın dijitalleştirilmesi, halka açık bir sergi, personele gizlilik incelemesi eğitimi ve açılış saatlerinin uzatılması. Sana en savunulabilir gelen ikisi hangisi, neden?" },
            { who: "you", hint: "İki seçenek seç ve seçim ölçütünü açıkça söyle.", expect: "iki seçeneği seçmek ve seçim ölçütünü açıkça adlandırmak", seconds: 50 },
            { who: "partner", de: "Let me press you on that. Everything you have chosen is invisible to the public, and this archive depends on public support for its funding. Is that not a real risk?", tr: "Bu noktada üsteleyeyim. Seçtiklerinin hepsi halka görünmez ve bu arşiv fonu için kamu desteğine bağlı. Bu gerçek bir risk değil mi?" },
            { who: "you", hint: "İtirazı ciddiye al: gücünü kabul et, sonra ya konumunu değiştir ya da neden değiştirmediğini açıkla.", expect: "güçlü bir itirazı kabul etmek ve konumunu ya revize etmek ya da savunmasını gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "All right. Can we agree on a priority order for the top three, and say what we would drop?", tr: "Peki. İlk üç için bir öncelik sırasında anlaşabilir miyiz, ve neyi bırakacağımızı söyleyebilir miyiz?" },
            { who: "you", hint: "Sıralamayı ver, her adımı kısaca gerekçelendir ve bırakılanı da açıkla.", expect: "gerekçeli bir öncelik sırası kurmak ve dışarıda bırakılanı açıklamak", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "name an explicit criterion for choosing", tr: "Seçim için açık bir ölçüt adlandırmak" },
              { de: "engage seriously with a strong objection", tr: "Güçlü bir itirazı ciddiye almak" },
              { de: "agree a justified priority order", tr: "Gerekçeli bir öncelik sırasında anlaşmak" },
            ],
            sample:
              "My criterion is whether the spending makes later spending cheaper. On that test, cataloguing and privacy training come first, because both reduce the cost of everything else. Your objection is a real one and I do not want to wave it away: an archive that produces nothing visible for two years is a soft target at the next budget. Where I would move is on sequencing rather than on priorities. I would take a small part of the sum for a modest exhibition drawn from what is already catalogued, precisely so that the invisible work survives politically. So: cataloguing first, privacy training second, a small exhibition third, and I would drop the extended opening hours, since the reading room is not currently full at the hours we already have.",
            criteria: [
              "Seçim ölçütü açıkça adlandırıldı mı?",
              "İtiraz güçlü hâliyle mi ele alındı, yoksa savuşturuldu mu?",
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

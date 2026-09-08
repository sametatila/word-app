import type { MockPaper } from "../types";

/**
 * C1 · Deneme 8 — "Rules, Games and Cheating".
 *
 * C1'in öteki denemeleriyle AYNI PLAN; konu ayrı. Kural kavramı C1 için
 * verimli çünkü sav tanım düzeyinde yürüyor: kuralı engelden ayıran şey
 * çiğnenebilir olması, hile de çiğnediği anlaşmaya muhtaç. Bu, koşul
 * yapılarına, devrik olumsuzlamaya ve adlaştırmaya doğal zemin veriyor.
 *
 * Yedinci denemeyle çakışmayı önlemek için yalnız konu değil hamleler de
 * ayrıldı: oradaki yazar dizisi (çözümü yerinden eden, kaybı ikiye bölen,
 * kaynağı okumayan eleştirmen, tek olayla fikrini değiştiren) burada
 * kullanılmadı; buradakiler sınama önerme, cezayı izleyen davranış,
 * sorunun yeni sayılması ve kimsenin itiraz etmediği durum üstüne kurulu.
 * Panelin sonu da bilerek çözümsüz: yedincide taraflar somut bir öneride
 * buluşuyordu, burada anlaşmazlık yalnız doğru yerine oturtuluyor.
 */
export const EN_C1_08: MockPaper = {
  id: "en-c1-08",
  course: "en",
  level: "C1",
  no: 8,
  theme: "Rules, Games and Cheating",
  themeTr: "Kurallar, oyunlar ve hile",
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
          id: "en-c1-08-l1",
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
              title: "The rule that can be broken",
              body: `A rule is not a constraint, and the difference is the whole subject. A wall stops you; a rule asks you not to, and the asking {{1}} for nothing unless you have agreed to be asked.

This is why cheating is a stranger act than it looks. The cheat does not reject the game. He {{2}} it, in the strict sense: he needs everybody else to go on playing honestly, since an advantage taken in a contest nobody is contesting is worth nothing at all.

It follows that a sport can be damaged by its own remedies. Every additional camera turns a question of trust into a question of detection, {{3}} is not the same question at all.

Consider the professional foul. It is prohibited, it is punished, and it is committed several times in every match by players who have {{4}} up the cost against the benefit and found the arithmetic acceptable.

Rarely does anybody ask whether this is cheating, and the laws cannot settle it, because the laws have already told everybody what it {{5}}.

What follows is not permissiveness. It is that a rule enforced by penalty alone has quietly become a tariff, and a tariff {{6}} nobody to anything.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-08-l1-1",
              no: 1,
              text: "Gap 1",
              options: ["stands", "counts", "makes", "goes"],
              answer: 1,
              explain:
                "`count for nothing` «hiçbir değeri olmamak» anlamında yerleşik bir öbektir ve cümle rica edilmenin kabul olmadan geçersizliğini söylüyor. `stand for` temsil etmek, `make for` yönelmek, `go for` ise geçerli olmak anlamına gelir.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l1-2",
              no: 2,
              text: "Gap 2",
              options: ["explores", "expands", "expels", "exploits"],
              answer: 3,
              explain:
                "İki nokta üst üstenin ardındaki açıklama fiili tanımlıyor: hilekâr oyunu reddetmiyor, ondan çıkar sağlıyor. `exploit` bunu verir; keşfetmek, genişletmek ve kovmak anlamlarındaki öteki fiiller bu bağlamda anlamsız kalır.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l1-3",
              no: 3,
              text: "Gap 3",
              options: ["which", "what", "that", "it"],
              answer: 0,
              explain:
                "Virgülden sonra bütün bir cümleye gönderme yapan ilgi adılı gerekiyor ve bunu yalnız `which` yapar. `that` virgüllü ilgi cümlesinde kullanılmaz, `what` öncül almaz, `it` ise iki cümleyi bağlaçsız birleştiremez.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l1-4",
              no: 4,
              text: "Gap 4",
              options: ["measured", "balanced", "weighed", "counted"],
              answer: 2,
              explain:
                "`weigh something up` bir şeyi enine boyuna tartmayı anlatan öbek fiildir ve cümlenin sonu bunu doğruluyor: «found the arithmetic acceptable». Öteki üç fiil `up` ile bu anlamı kurmaz.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l1-5",
              no: 5,
              text: "Gap 5",
              options: ["counts", "charges", "spends", "costs"],
              answer: 3,
              explain:
                "Öznesi eylem olan `cost` fiili bedeli bildirir: kural o hareketin neye mal olduğunu zaten söylemiştir. `charge` bedeli isteyeni özne alır, `spend` harcayanı, `count` ise saymayı bildirir.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l1-6",
              no: 6,
              text: "Gap 6",
              options: ["compels", "commits", "confines", "consigns"],
              answer: 1,
              explain:
                "`commit somebody to something` bir yükümlülük altına sokmayı anlatır ve cümle tarifenin hiçbir yükümlülük doğurmadığını söylüyor. `compel` mastar ister (`compels nobody to do`), `confine` ve `consign` ise sınırlamak ve devretmek anlamına gelir.",
            },
          ],
        },
        {
          id: "en-c1-08-l2",
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
              title: "Enforcement and its effects",
              body: `Enforcement is usually discussed as {{7}} it were neutral: the rule stays as it was and the detection improves.

It does not work like that. A rule enforced by suspicion produces one game and a rule enforced by camera produces another, {{8}} identical the words on the page may be.

Nowhere is this clearer {{9}} in the sports which introduced review and then found themselves rewriting the laws to fit what the cameras could see.

Not only {{10}} the laws change; the incentives changed with them, because an offence that is always detected is worth committing only when the penalty is small.

{{11}} the reformers understood this at the time is doubtful, and it would be unfair to expect it of them.

The same shift can be observed in any amateur club {{12}} has installed a scoreboard.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-08-l2-7",
              no: 7,
              text: "Gap 7",
              accept: ["though", "if"],
              explain:
                "`as though` ve `as if` gerçeğe aykırı bir benzetme kurar ve yüklem `were` bunu doğruluyor. Tek başına `as` bu kipi taşımaz.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l2-8",
              no: 8,
              text: "Gap 8",
              accept: ["however"],
              explain:
                "Sıfat başa alınmış bir ödün cümlesi kuruluyor: `however identical … may be`. Bu kalıp `however + sıfat + özne + may be` biçimindedir; `although` sıfatı öne çekemez.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l2-9",
              no: 9,
              text: "Gap 9",
              accept: ["than"],
              explain:
                "`Nowhere is this clearer` bir karşılaştırma derecesi taşıyor ve karşılaştırılan yer `than` ile bağlanır.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l2-10",
              no: 10,
              text: "Gap 10",
              accept: ["did"],
              explain:
                "`Not only` cümle başına geldiğinde devrik kuruluş zorunludur ve yüklem geçmiş zaman olduğu için yardımcı fiil `did`, ardından yalın fiil gelir.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l2-11",
              no: 11,
              text: "Gap 11",
              accept: ["whether"],
              explain:
                "Cümlenin öznesi bir soru cümleciği ve yüklem `is doubtful`. Özne konumundaki dolaylı soruyu `whether` başlatır; `if` bu konumda özne cümleciği kuramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l2-12",
              no: 12,
              text: "Gap 12",
              accept: ["that", "which"],
              explain:
                "Öncül `any amateur club`, yani bir kurum; özne görevindeki ilgi adılı `that` ya da `which` olur. `who` kişiler için, `where` ise yer bildiren tümleç için gelir.",
            },
          ],
        },
        {
          id: "en-c1-08-l3",
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
              title: "Cheating",
              body: `Cheating is conventionally defined as the deliberate breach of a {{13}} with the intention of gaining an advantage the rule exists to prevent.

The distinction between a rule and a habit lies in {{14}}: a provision that is never applied has, for practical purposes, lapsed.

Because the definition turns on intention, {{15}} breaches are classed as errors and attract a different sanction.

The philosophical literature emphasises that such an advantage is worthless unless the other {{16}} continue to observe the rule.

Sanctions are justified in two ways which are frequently confused: as {{17}}, and as the restoration of a result that would otherwise stand.

Reviews conclude that the most durable rules are those whose {{18}} the players themselves accept, rather than those which are most heavily policed.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-08-l3-13",
              no: 13,
              text: "PROHIBIT",
              accept: ["prohibition"],
              explain:
                "`the breach of a ___` yapısında belirsiz tanımlıktan sonra bir ad geliyor ve cümlenin sonu onu `the rule` diye anıyor. Fiil biçimi bu konumda duramaz.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l3-14",
              no: 14,
              text: "ENFORCE",
              accept: ["enforcement"],
              explain:
                "`lies in ___` yapısında edatın nesnesi bir ad olmalı ve iki nokta üst üstenin ardındaki açıklama onu tanımlıyor: uygulanmayan hüküm düşer.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l3-15",
              no: 15,
              text: "INTEND",
              accept: ["unintentional"],
              explain:
                "Cümle kasıt ölçütünün karşı yüzünü veriyor: kasıtsız ihlaller hata sayılıyor. `intend` fiilinden `intentional` sıfatı, ondan da olumsuzu `unintentional` türetilir ve `breaches` adını niteler.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l3-16",
              no: 16,
              text: "COMPETE",
              accept: ["competitors"],
              explain:
                "`the other ___ continue` yapısında yüklem çoğul (`continue`), dolayısıyla özne de çoğul bir kişi adı olmalı: `competitors`. `competition` sayılamayan bir süreç adıdır ve çoğul yüklem almaz.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l3-17",
              no: 17,
              text: "DETER",
              accept: ["deterrence"],
              explain:
                "İki gerekçe koşut biçimde sıralanıyor ve ikincisi bir ad öbeği (`the restoration of a result`); birincisi de ad olmalı. `deter` fiilinden türeyen ad `deterrence`tır.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l3-18",
              no: 18,
              text: "LEGITIMATE",
              accept: ["legitimacy"],
              explain:
                "`those whose ___ the players accept` yapısında `whose` iyelik kuruyor ve `accept` fiilinin nesnesi bir ad olmalı: `legitimacy`. Sıfat biçimi nesne olamaz.",
            },
          ],
        },
        {
          id: "en-c1-08-l4",
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
              id: "en-c1-08-l4-19",
              no: 19,
              text: "People believe that the committee knew about the practice for years.\nThe committee ______ about the practice for years.",
              cue: "HAVE",
              accept: ["is believed to have known"],
              explain:
                "`People believe that …` yapısı edilgen bildirim kalıbına çevriliyor: `is believed to + mastar`. Bilgi geçmişe ait olduğu için mastar `to have known` biçimini alır.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l4-20",
              no: 20,
              text: "It was only after the third appeal that the ruling was reversed.\nOnly after the third appeal ______ reversed.",
              cue: "WAS",
              accept: ["was the ruling"],
              explain:
                "`Only after …` öbeği cümle başına alındığında devrik kuruluş zorunludur: yardımcı fiil özneden önce gelir ve üçüncü hâl sonda kalır.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l4-21",
              no: 21,
              text: "The rule makes no difference to the way the players behave.\nThe rule ______ on the way the players behave.",
              cue: "BEARING",
              accept: ["has no bearing"],
              explain:
                "`have no bearing on something` bir şeyi etkilememek anlamında yerleşik bir öbektir ve `on` tümleci cümlede zaten duruyor.",
            },
            {
              kind: "gap",
              id: "en-c1-08-l4-22",
              no: 22,
              text: "Nobody had expected the ban to be lifted so quickly.\nThe ban ______ than anybody had expected.",
              cue: "SOONER",
              accept: ["was lifted much sooner", "was lifted far sooner", "was lifted sooner"],
              explain:
                "`so quickly` yapısı `than` ile kurulan bir karşılaştırmaya çevriliyor ve cümle edilgen kalıyor. `much` ve `far` beklentiyle arasındaki farkı pekiştirir ve zorunlu değildir.",
            },
          ],
        },
        {
          id: "en-c1-08-l5",
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
              title: "What a rule is for",
              body: `There is a familiar argument that cheating is simply rule-breaking, and it collapses on the first example anybody offers. A player who trips because the ground is wet has broken the rule and cheated nobody. A player who trips deliberately, is seen, and accepts the penalty has arguably cheated nobody either, though he would say so only in private and only after retiring.

The definition has to include intention, and once intention is admitted the argument becomes an argument about minds, which no camera resolves.

This is the difficulty with the reforms of the past two decades. Video review is extremely good at establishing what happened and has nothing whatever to say about why. It has therefore improved the accuracy of decisions and left the underlying question precisely where it was, while creating the impression that the question has been answered.

The impression is not harmless. A sport which believes it has solved cheating stops doing the slow things that actually govern conduct: the conversation in the changing room, the referee who has known a player for six seasons, the ordinary social cost of being thought unreliable by people whose opinion matters. Those mechanisms are unimpressive, unmeasurable and cheap, and they are the ones that were quietly retired when the cameras arrived. The erosion of them appears in no report, which is a large part of why nobody objected at the time.

None of this is an argument for removing the cameras, which would restore neither trust nor accuracy. It is an argument for being exact about what they bought. They bought correct decisions. They did not buy honest players, and the confusion between the two is now built into the way the game is discussed.`,
              gloss: [
                { de: "to retire", tr: "spordan çekilmek", en: "retire" },
                { de: "conduct", tr: "davranış", en: "conduct" },
                { de: "unmeasurable", tr: "ölçülemez", en: "unmeasurable" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-08-l5-23",
              no: 23,
              text: "What does the writer say about defining cheating as rule-breaking?",
              options: [
                "It fails as soon as an example is tested",
                "It is the definition used by most governing bodies",
                "It works everywhere except professional sport",
                "It is too narrow to include accidental fouls",
              ],
              answer: 0,
              explain:
                "Açılış savı ve çürütmeyi birlikte veriyor: «it collapses on the first example anybody offers», ardından ıslak zeminde düşen oyuncu örneği geliyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l5-24",
              no: 24,
              text: "What limitation of video review does the writer identify?",
              options: [
                "It is too slow to be used during play",
                "It produces decisions that players distrust",
                "It cannot establish why something was done",
                "It is applied inconsistently between sports",
              ],
              answer: 2,
              explain:
                "Yazı yeteneği ve sınırı yan yana koyuyor: «extremely good at establishing what happened and has nothing whatever to say about why».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l5-25",
              no: 25,
              text: "What does the writer say has been lost?",
              options: [
                "The authority of the governing body",
                "Informal mechanisms that shaped conduct",
                "The accuracy of refereeing decisions",
                "Public interest in the sport",
              ],
              answer: 1,
              explain:
                "Dördüncü paragraf üç mekanizmayı sayıyor — soyunma odasındaki konuşma, oyuncuyu altı sezondur tanıyan hakem, güvenilmez sayılmanın toplumsal bedeli — ve «they are the ones that were quietly retired when the cameras arrived» diyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-l5-26",
              no: 26,
              text: "What is the writer's conclusion?",
              options: [
                "The cameras should be withdrawn",
                "Intention should be dropped from the definition",
                "Referees need longer relationships with players",
                "The gains should be described accurately",
              ],
              answer: 3,
              explain:
                "Son paragraf kamerayı kaldırmayı açıkça reddediyor ve savı adlandırıyor: «It is an argument for being exact about what they bought. They bought correct decisions. They did not buy honest players».",
            },
          ],
        },
        {
          id: "en-c1-08-l6",
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
              body: "Before we define anything, I would propose a test. Ask whether the player would still do it if nobody else were bound by the rule. If the answer is no, the act depends on everybody else's compliance and we may call it cheating without further metaphysics. If the answer is yes, we are discussing a preference for a different game.",
            },
            {
              key: "b",
              label: "b — Writer B",
              body: "Watch what happens to conduct when a penalty changes and nothing else does. The behaviour tracks the penalty within a single season, every time, and it does not track the wording of the rule at all. Whatever the players are responding to, it is not the law as written.",
            },
            {
              key: "c",
              label: "c — Writer C",
              body: "The tone of this discussion suggests that something has lately gone wrong. Reports of paid substitutes, altered equipment and bribed officials fill the sporting press of the eighteen-nineties. What is new is the camera, and what the camera has changed is the volume of the complaint rather than the quantity of the offence.",
            },
            {
              key: "d",
              label: "d — Writer D",
              body: "The interesting cases are the ones where a rule is broken openly and nobody minds at all. A batsman who walks before he is given out is admired; a batsman who stands his ground is accused of nothing. The same act is optional in one direction and compulsory in neither, and any account of cheating has to explain that before it explains anything else.",
            },
            {
              key: "e",
              label: "e — Writer E",
              body: "Our survey of four hundred amateur players found that ninety per cent said cheating was wrong and sixty per cent admitted to it. I would not make much of that. It is the finding anybody would predict, and it has been reproduced so often that it now tells us chiefly that the questionnaire works.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-08-l6-27",
              no: 27,
              text: "Which writer proposes a way of testing a case rather than defining a term?",
              answer: "a",
              explain:
                "Writer A tanımı erteleyip bir sınama öneriyor: «Ask whether the player would still do it if nobody else were bound by the rule», ve iki cevabın iki ayrı sonuca götürdüğünü söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-l6-28",
              no: 28,
              text: "Which writer says that conduct follows the penalty rather than the wording?",
              answer: "b",
              explain:
                "Writer B gözlemi doğrudan veriyor: «The behaviour tracks the penalty within a single season, every time, and it does not track the wording of the rule at all».",
            },
            {
              kind: "match",
              id: "en-c1-08-l6-29",
              no: 29,
              text: "Which writer says that the problem is presented as newer than it is?",
              answer: "c",
              explain:
                "Writer C tarihe gönderme yapıyor: aynı suçlamalar «fill the sporting press of the eighteen-nineties», ve yeni olanın kamera olduğunu söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-l6-30",
              no: 30,
              text: "Which writer says an adequate account must first explain a case where nobody objects?",
              answer: "d",
              explain:
                "Writer D sırayı koyuyor: kimsenin itiraz etmediği kriket örneğini anıp «any account of cheating has to explain that before it explains anything else» diyor.",
            },
          ],
        },
        {
          id: "en-c1-08-l7",
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
              title: "A system built for people who will cheat",
              body: `Amateur golf has a scoring system which assumes, in its design, that a proportion of the people using it will lie. This is unusual, and it repays a closer look. {{31}}

A handicap is a number which allows a weak player to compete against a strong one. It is calculated from recent scores, and the incentive runs in both directions: a player who wants to win a competition benefits from a handicap that is too generous, while a player who wants to be admired benefits from one that is too severe. {{32}}

The system's answer is neither to trust nor to police. It is to make the two incentives collide. Scores must be submitted in ordinary play as well as in competition, so that a player building himself a soft handicap has to record his bad rounds in front of the very people he intends to beat. {{33}}

None of this eliminates the problem, and the governing bodies have never claimed that it does. What it does is change who does the work. Detection is not carried out by an official examining a card; it is carried out by three people in a group who know roughly how well the fourth plays. {{34}}

The lesson generalises awkwardly, which is the honest reason it is not applied more widely. It requires a community small enough for reputation to operate and stable enough for it to accumulate. Most institutions have neither, and a system which assumes both will simply fail in a new way.`,
              gloss: [
                { de: "a handicap", tr: "denkleştirme puanı", en: "handicap" },
                { de: "a card", tr: "skor kartı", en: "card" },
                { de: "to accumulate", tr: "birikmek", en: "accumulate" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "The result is a rule enforced almost entirely by embarrassment, which is cheap, effective inside a club, and completely unexportable to any setting in which the players are strangers to one another." },
            { key: "b", label: "b", body: "Most rule systems begin from the opposite assumption and treat dishonesty as an exception to be detected after the event." },
            { key: "c", label: "c", body: "Both directions are common, and neither is punished, for the sufficient reason that neither can be established from a card." },
            { key: "d", label: "d", body: "It is a design which makes the cheat's own social circle the instrument of enforcement, without requiring anybody to accuse anybody of anything." },
            { key: "e", label: "e", body: "The first national handicapping scheme was adopted in 1925 and used a formula with five separate components." },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-08-l7-31",
              no: 31,
              text: "Gap 31",
              answer: "b",
              explain:
                "Açılış tasarımı olağandışı sayıyor: sistem «assumes, in its design, that a proportion of the people using it will lie». (b) neyin olağan olduğunu söyleyerek karşıtlığı tamamlıyor: öteki sistemler dürüstlüğü «an exception to be detected after the event» sayar.",
            },
            {
              kind: "match",
              id: "en-c1-08-l7-32",
              no: 32,
              text: "Gap 32",
              answer: "c",
              explain:
                "Paragraf teşviki iki yönde de kuruyor: fazla cömert ve fazla sert puan. (c) «Both directions» ile ikisine gönderme yapıp neden cezalandırılamadıklarını veriyor: karttan saptanamıyorlar.",
            },
            {
              kind: "match",
              id: "en-c1-08-l7-33",
              no: 33,
              text: "Gap 33",
              answer: "d",
              explain:
                "Paragraf mekanizmayı anlatıyor: oyuncu «has to record his bad rounds in front of the very people he intends to beat». (d) bunu adlandırıyor: hilekârın kendi çevresi denetim aracına dönüşüyor, «without requiring anybody to accuse anybody of anything».",
            },
            {
              kind: "match",
              id: "en-c1-08-l7-34",
              no: 34,
              text: "Gap 34",
              answer: "a",
              explain:
                "Paragraf denetimin gruptaki üç kişiye geçtiğini söylüyor. (a) bunun adını koyup taşınabilirlik sınırını veriyor: «completely unexportable to any setting in which the players are strangers» — son paragraf da tam bu sınırı işliyor. (e) 1925'teki ilk ulusal düzenlemeden söz ediyor ve metnin hiçbir yerinde sistemin tarihi tartışılmıyor; hiçbir boşluğa uymayan paragraf odur.",
            },
          ],
        },
        {
          id: "en-c1-08-l8",
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
              label: "a — Referee",
              body: "The part of the job nobody sees is that most of what keeps a game honest happens before anything happens. If I have refereed a player twelve times, he knows what I will not tolerate and I know what he is likely to try. A neutral official flown in for a single match has none of that, and the match is worse for it, and I cannot prove a word of what I have just said.",
            },
            {
              key: "b",
              label: "b — Statistician",
              body: "I was asked to establish whether the new penalty had reduced the offence. It had, by about a third. What took another six months was the discovery that the recording form had changed in the same season, and that roughly half of the fall is officials writing it down differently. I published both numbers, and the second one has never been quoted.",
            },
            {
              key: "c",
              label: "c — Former player",
              body: "I did it for eleven years and I would not call it cheating, which is precisely the answer you would expect from me. What I will say is that I never did it in training, where it would have been pointless, and never when I was already winning comfortably. Make of that what you like. I have.",
            },
            {
              key: "d",
              label: "d — Rule-committee chair",
              body: "Every year somebody proposes a rule to prevent something that happened once on television. We pass about one in ten. The test I apply is not whether the behaviour is bad; it is whether a referee can see it in real time. A rule that cannot be applied does not reduce the behaviour. It reduces respect for the rules that can be.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-08-l8-35",
              no: 35,
              text: "says that a change in recording explains part of an apparent improvement",
              answer: "b",
              explain:
                "Metin iki değişikliğin çakıştığını söylüyor: «the recording form had changed in the same season, and … roughly half of the fall is officials writing it down differently».",
            },
            {
              kind: "match",
              id: "en-c1-08-l8-36",
              no: 36,
              text: "admits that the claim being made cannot be demonstrated",
              answer: "a",
              explain:
                "Metin savını kurup hemen sınırlıyor: «the match is worse for it, and I cannot prove a word of what I have just said».",
            },
            {
              kind: "match",
              id: "en-c1-08-l8-37",
              no: 37,
              text: "applies a test of practicality rather than of seriousness",
              answer: "d",
              explain:
                "Metin ölçütünü açıkça ayırıyor: «The test I apply is not whether the behaviour is bad; it is whether a referee can see it in real time».",
            },
            {
              kind: "match",
              id: "en-c1-08-l8-38",
              no: 38,
              text: "supplies details that work against their own defence",
              answer: "c",
              explain:
                "Metin savunmasını yaptıktan sonra onu zayıflatan ayrıntıları kendisi veriyor: antrenmanda ve rahat önde olduğunda yapmıyormuş. «Make of that what you like. I have».",
            },
            {
              kind: "match",
              id: "en-c1-08-l8-39",
              no: 39,
              text: "says that an unenforceable rule damages the other rules",
              answer: "d",
              explain:
                "Metin sonucu iki cümlede veriyor: «A rule that cannot be applied does not reduce the behaviour. It reduces respect for the rules that can be».",
            },
            {
              kind: "match",
              id: "en-c1-08-l8-40",
              no: 40,
              text: "reports a finding that has been ignored since publication",
              answer: "b",
              explain:
                "Metin iki sayıyı da yayımladığını ve ikincisinin «has never been quoted» olduğunu söylüyor.",
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
          id: "en-c1-08-h1",
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
              situation: "Bir antrenör ile bir hakem maçtan sonra konuşuyor.",
              plays: 2,
              segments: [
                { text: "You gave him a yellow, and you gave nothing for the same thing at the other end." },
                { text: "I gave what I saw. The other one I did not see, and I am not going to pretend that I did." },
                { text: "The camera saw it." },
                { text: "The camera is not part of my decision in this competition, and you argued against its being part of it, which I have not forgotten." },
                { text: "That is a fair hit." },
                { text: "It is also not an answer to your complaint. Your complaint is legitimate, and the remedy you rejected is the one that would have fixed it." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Extract two",
              genreTr: "İkinci parça",
              situation: "İki görevli bir ceza değişikliğinin sonuçlarını konuşuyor.",
              plays: 2,
              segments: [
                { text: "The offence is down a third since we doubled the penalty." },
                { text: "Down a third in the returns." },
                { text: "Meaning?" },
                { text: "Meaning we changed the sanction and the reporting form in the same window, and I cannot separate them. I would rather say that I do not know than let somebody put a third on a slide." },
                { text: "The committee will not enjoy that." },
                { text: "The committee will enjoy it a great deal less in three years, when somebody else separates them." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Extract three",
              genreTr: "Üçüncü parça",
              situation: "Radyoda iki kişi denkleştirme sistemini konuşuyor.",
              plays: 2,
              segments: [
                { text: "It is designed on the assumption that people will fiddle it." },
                { text: "Which sounds cynical." },
                { text: "It is the opposite of cynical. Assuming honesty and then hunting for exceptions is what produces suspicion. This assumes the incentive and then arranges for it to be inconvenient." },
                { text: "Does it work?" },
                { text: "Inside a club, extremely well. Outside one, not at all, and nobody has ever pretended otherwise. It runs on people knowing each other, and that is a resource rather than a rule." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-08-h1-1",
              no: 1,
              ref: "a1",
              text: "What does the referee admit?",
              options: ["That he applied the law incorrectly", "That the two incidents were different", "That he did not see one incident"],
              answer: 2,
              explain:
                "Hakem eksiğini açıkça söylüyor: «The other one I did not see, and I am not going to pretend that I did».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h1-2",
              no: 2,
              ref: "a1",
              text: "What is the referee's point about the camera?",
              options: ["The coach opposed introducing it", "It is unreliable in this competition", "It would not have altered his decision"],
              answer: 0,
              explain:
                "Hakem antrenörün geçmiş tutumunu hatırlatıyor: «you argued against its being part of it, which I have not forgotten», ve şikâyetin çaresinin reddedilen çare olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h1-3",
              no: 3,
              ref: "a2",
              text: "What is the second speaker's concern?",
              options: ["The penalty was doubled too quickly", "Two changes were made at the same time", "The committee has already published the figure"],
              answer: 1,
              explain:
                "Konuşmacı sorunu adlandırıyor: «we changed the sanction and the reporting form in the same window, and I cannot separate them».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h1-4",
              no: 4,
              ref: "a2",
              text: "Why does he prefer to say that he does not know?",
              options: ["The data was collected badly", "He disagrees with the committee's aims", "The claim would be exposed later"],
              answer: 2,
              explain:
                "Konuşmacı zamanlamayı hesaplıyor: «The committee will enjoy it a great deal less in three years, when somebody else separates them».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h1-5",
              no: 5,
              ref: "a3",
              text: "What does the man say about the design?",
              options: ["It treats the incentive as a fact to be managed", "It assumes that most players are honest", "It has been widely misunderstood by officials"],
              answer: 0,
              explain:
                "Adam iki yaklaşımı karşılaştırıyor: dürüstlüğü varsaymak kuşku üretiyor, bu sistem ise «assumes the incentive and then arranges for it to be inconvenient».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h1-6",
              no: 6,
              ref: "a3",
              text: "What limits the system?",
              options: ["The cost of administering it", "It needs players who know one another", "It works in only one country"],
              answer: 1,
              explain:
                "Adam sınırı açıkça koyuyor: kulüp içinde çok iyi, dışında hiç. «It runs on people knowing each other, and that is a resource rather than a rule».",
            },
          ],
        },
        {
          id: "en-c1-08-h2",
          no: 2,
          format: "notes",
          goal: "detail",
          prompt:
            "You hear a man reporting a three-year review of a rule change. Complete the sentences, questions 7 to 14, with a word or a number. You hear the report twice.",
          promptTr:
            "Bir kural değişikliğinin üç yıllık incelemesini anlatan bir adamı dinleyeceksin. 7–14. maddelerdeki cümleleri bir sözcük ya da sayıyla tamamla. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Report",
              genreTr: "Sunum",
              situation: "Bir sorumlu kural değişikliğinin üç yıllık sonuçlarını sunuyor.",
              plays: 2,
              segments: [
                {
                  text: "Thank you. This is the three-year review of the rule change, and I will give you the awkward numbers along with the comfortable ones. The change was introduced in twelve competitions and we have complete data for seven of them. Recorded offences fell by thirty-one per cent in the first season and by a further four in the second. In the third season they rose slightly. The most striking figure is not about offences at all: the average length of a match increased by nine minutes, almost all of it in stoppages. We surveyed the officials, and eighty-two per cent said that the rule was easier to apply than the one it replaced. We surveyed the players as well, where the figure was fifty-five. And one caution: two of the seven competitions changed their recording form in the same season, so the first-year fall is not clean.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Sentences",
              genreTr: "Cümleler",
              title: "Rule change — three-year review",
              body: `The change was introduced in {{7}} competitions.

Complete data exists for {{8}} of them.

Offences fell by {{9}} per cent in the first season.

In the third season the figure {{10}} slightly.

The average match became {{11}} minutes longer.

{{12}} per cent of officials found the rule easier to apply.

Among the players the figure was {{13}} per cent.

Two competitions changed their recording {{14}} in the same season.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "en-c1-08-h2-7",
              no: 7,
              ref: "b1",
              text: "Gap 7",
              accept: ["12", "twelve"],
              explain:
                "«The change was introduced in twelve competitions» — uygulanan yarışma sayısı. Yedi ise verisi tam olanların sayısı.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-8",
              no: 8,
              ref: "b1",
              text: "Gap 8",
              accept: ["7", "seven"],
              explain:
                "«we have complete data for seven of them» — on iki yarışmanın yedisi. İki sayı aynı cümlede geçtiği için ayırt edilmeleri gerekiyor.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-9",
              no: 9,
              ref: "b1",
              text: "Gap 9",
              accept: ["31", "thirty-one"],
              explain:
                "«Recorded offences fell by thirty-one per cent in the first season» — ilk sezondaki düşüş. Dört ise ikinci sezonun ek düşüşü.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-10",
              no: 10,
              ref: "b1",
              text: "Gap 10",
              accept: ["rose"],
              explain:
                "«In the third season they rose slightly» — yön değişikliği. İlk iki sezon düşüş, üçüncüsü yükseliş.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-11",
              no: 11,
              ref: "b1",
              text: "Gap 11",
              accept: ["9", "nine"],
              explain:
                "«the average length of a match increased by nine minutes, almost all of it in stoppages» — sunumun en çarpıcı saydığı sayı.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-12",
              no: 12,
              ref: "b1",
              text: "Gap 12",
              accept: ["82", "eighty-two"],
              explain:
                "«eighty-two per cent said that the rule was easier to apply» — hakemlerin oranı. Elli beş oyuncuların oranı.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-13",
              no: 13,
              ref: "b1",
              text: "Gap 13",
              accept: ["55", "fifty-five"],
              explain:
                "«We surveyed the players as well, where the figure was fifty-five» — aynı soruya oyuncuların verdiği oran.",
            },
            {
              kind: "gap",
              id: "en-c1-08-h2-14",
              no: 14,
              ref: "b1",
              text: "Gap 14",
              accept: ["form"],
              explain:
                "Çekince şu: «two of the seven competitions changed their recording form in the same season», dolayısıyla ilk yılın düşüşü temiz değil.",
            },
          ],
        },
        {
          id: "en-c1-08-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "You hear part of a panel discussion about whether intention should appear in the laws of a sport. Choose a, b, c or d for questions 15 to 22. You hear the discussion ONCE only.",
          promptTr:
            "Bir sporun kurallarında kastın yer alıp almaması üzerine bir panel tartışmasının bir bölümünü dinleyeceksin. 15–22. maddeler için a, b, c ya da d'yi seç. Tartışmayı YALNIZ BİR KEZ dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "c1",
              genre: "Panel discussion",
              genreTr: "Panel tartışması",
              situation: "Bir yönetici, eski oyuncu Vesna, kural uzmanı Kiro ve akademisyen Aras ile konuşuyor.",
              plays: 1,
              segments: [
                { text: "Vesna, you have argued that intention should not appear in the laws at all." },
                { text: "I have, and I want to be precise about why. Not because intention does not matter, since it obviously does, but because a referee cannot see it and a panel three days later can only guess at it. A law that requires a finding nobody can make will be applied by prejudice." },
                { text: "Kiro?" },
                { text: "Every legal system in the world manages this. We infer intention from conduct, and we do it in criminal courts with a great deal more at stake than a four-match suspension. The claim that it cannot be done is not a claim about intention. It is a claim about the quality of sports tribunals, and I would rather fix those." },
                { text: "Aras, from the philosophy?" },
                { text: "I would say that both of them are right about different questions. Kiro is right that intention is inferable. Vesna is right that in this institution it is not being inferred; it is being asserted. Whether that is a reason to remove intention from the law depends on whether you believe the institution is improvable, and on that I have no view." },
                { text: "Vesna, does the comparison with the courts move you?" },
                { text: "It weakens my argument and it does not defeat it. A court has disclosure, evidence, a defence lawyer and months. A disciplinary panel has a video clip, twenty minutes and a chairman who watched the incident live on television. The analogy imports the conclusion and leaves the machinery behind." },
                { text: "Kiro, is that fair?" },
                { text: "It is fair about the machinery, and it is an argument for building the machinery rather than for abandoning the distinction. If we take intention out, we punish the clumsy exactly as we punish the malicious, and the players will notice inside a season." },
                { text: "Aras, is there a middle position?" },
                { text: "There is one, and I distrust it. You keep intention as an aggravating factor rather than as an element, so that it raises the penalty without being required to establish the offence. It is what most codes already do, and it has the property of looking like a compromise while transferring the entire difficulty to the sentencing stage, where nobody is watching." },
                { text: "So where does that leave us?" },
                { text: "Where we started, but with the disagreement in the right place. It is not about whether intention matters." },
                { text: "It is about whether this particular body can be trusted to find it. Kiro thinks that can be fixed and I think it cannot." },
                { text: "And that is the question we have not answered." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "en-c1-08-h3-15",
              no: 15,
              ref: "c1",
              text: "What is Vesna's reason for excluding intention from the laws?",
              options: [
                "No official can establish it with confidence",
                "It matters far less than most people assume",
                "It makes the laws too long to teach properly",
                "Players cannot be expected to understand it",
              ],
              answer: 0,
              explain:
                "Vesna kastın önemini kabul edip uygulanabilirliği reddediyor: «A law that requires a finding nobody can make will be applied by prejudice».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-16",
              no: 16,
              ref: "c1",
              text: "What is Kiro's response?",
              options: [
                "Sport differs fundamentally from the courts",
                "Intention is rarely disputed in practice",
                "The objection is really about the tribunals",
                "Criminal law has abandoned the very same test",
              ],
              answer: 2,
              explain:
                "Kiro itirazın hedefini kaydırıyor: «It is a claim about the quality of sports tribunals, and I would rather fix those».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-17",
              no: 17,
              ref: "c1",
              text: "How does Aras characterise the disagreement?",
              options: [
                "As a confusion about the meaning of intention",
                "As one in which the evidence favours Kiro",
                "As a dispute that philosophy is able to settle",
                "As turning on whether the institution can improve",
              ],
              answer: 3,
              explain:
                "Aras iki tarafı ayrı sorularda haklı bulup kararı bir üçüncü soruya bağlıyor: «depends on whether you believe the institution is improvable, and on that I have no view».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-18",
              no: 18,
              ref: "c1",
              text: "How does Vesna respond to the comparison with the courts?",
              options: [
                "She rejects it as wholly irrelevant",
                "She concedes that it damages her case",
                "She says courts make the same errors",
                "She argues that the stakes are equally high",
              ],
              answer: 1,
              explain:
                "Vesna zararı teslim edip sınırlıyor: «It weakens my argument and it does not defeat it», çünkü mahkemenin donanımı panelde yok.",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-19",
              no: 19,
              ref: "c1",
              text: "What does Kiro say would follow from removing intention?",
              options: [
                "Panels would take a great deal longer to decide",
                "The number of appeals would rise very sharply",
                "Careless and deliberate acts would be treated alike",
                "Referees would apply the laws inconsistently",
              ],
              answer: 2,
              explain:
                "Kiro sonucu tek cümlede veriyor: «we punish the clumsy exactly as we punish the malicious, and the players will notice inside a season».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-20",
              no: 20,
              ref: "c1",
              text: "What does Aras say about the middle position?",
              options: [
                "It moves the difficulty out of sight",
                "It has never been attempted in any code",
                "It is the position he holds himself",
                "It would satisfy both of the other speakers",
              ],
              answer: 0,
              explain:
                "Aras uzlaşının görünüşünü ve gerçeğini ayırıyor: «looking like a compromise while transferring the entire difficulty to the sentencing stage, where nobody is watching».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-21",
              no: 21,
              ref: "c1",
              text: "What does Kiro say has been achieved by the discussion?",
              options: [
                "A change in Vesna's position",
                "A better location of the disagreement",
                "Agreement on a precise form of words",
                "A decision to reform the tribunals",
              ],
              answer: 1,
              explain:
                "Kiro sonucu ölçüyor: «Where we started, but with the disagreement in the right place. It is not about whether intention matters».",
            },
            {
              kind: "mcq",
              id: "en-c1-08-h3-22",
              no: 22,
              ref: "c1",
              text: "What remains unresolved at the end?",
              options: [
                "Whether intention can ever be reliably inferred",
                "Whether the penalty should be increased",
                "Whether the players understand the law",
                "Whether the body can be reformed",
              ],
              answer: 3,
              explain:
                "Vesna anlaşmazlığı adlandırıyor: «Kiro thinks that can be fixed and I think it cannot», ve yönetici kapatıyor: «that is the question we have not answered».",
            },
          ],
        },
        {
          id: "en-c1-08-h4",
          no: 4,
          format: "match",
          goal: "gist",
          prompt:
            "You hear eight short monologues about rules in sport. What is the speaker's main purpose? Choose from a to j. You use each answer once only. You hear the recordings twice.",
          promptTr:
            "Spordaki kurallar üzerine sekiz kısa konuşma dinleyeceksin. Konuşmacının asıl amacı nedir? a'dan j'ye seç. Her seçenek en fazla bir kez kullanılır. Kayıtları iki kez dinleyebilirsin.",
          options: [
            { key: "a", label: "to reject an analogy that is being used in the debate" },
            { key: "b", label: "to explain a decision that appears inconsistent" },
            { key: "c", label: "to identify an incentive that nobody designed" },
            { key: "d", label: "to say that a reform succeeded for the wrong reason" },
            { key: "e", label: "to decline to condemn a particular person" },
            { key: "f", label: "to describe a change of mind that took years" },
            { key: "g", label: "to argue that the measurement changed and not the behaviour" },
            { key: "h", label: "to defend a rule that is widely disliked" },
            { key: "i", label: "to ask for a smaller claim to be made" },
            { key: "j", label: "to say that the argument is being had in the wrong place" },
          ],
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Speaker 1",
              genreTr: "Birinci konuşmacı",
              situation: "Birinci konuşmacı tartışmada kullanılan bir benzetmeyi ele alıyor.",
              plays: 2,
              segments: [
                { text: "People keep saying that a sport is like a legal system. It is not. Nobody chooses to be subject to the criminal law, and the whole point of a game is that you agreed to it this morning and can walk away this evening. Every argument built on that comparison smuggles in an obligation which does not exist." },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Speaker 2",
              genreTr: "İkinci konuşmacı",
              situation: "İkinci konuşmacı kendisinden istenen açıklamayı anlatıyor.",
              plays: 2,
              segments: [
                { text: "The offence is down a third and I have been asked to say so at the annual meeting. What actually happened is that we changed the sanction and the reporting form in the same season, and about half of that fall is officials writing it down differently. The behaviour may well have improved. I cannot tell you that it has." },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Speaker 3",
              genreTr: "Üçüncü konuşmacı",
              situation: "Üçüncü konuşmacı fikstürün doğurduğu bir sonucu anlatıyor.",
              plays: 2,
              segments: [
                { text: "Nobody sat down and decided that a coach should rest his best players in the final round. The fixture list did that. When the table is already settled, resting them is the correct decision for the coach and a disappointment for everybody who bought a ticket, and no rule has been broken by anyone." },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Speaker 4",
              genreTr: "Dördüncü konuşmacı",
              situation: "Dördüncü konuşmacı sevilmeyen bir hükmü ele alıyor.",
              plays: 2,
              segments: [
                { text: "The two-minute rule is detested and I would keep it. It is crude, it punishes the unlucky, and it is the only provision in the code a referee can apply without knowing anything whatever about what was in a player's mind. Everything elegant in this document has been unenforceable for thirty years." },
              ],
            },
            {
              kind: "audio",
              id: "d5",
              genre: "Speaker 5",
              genreTr: "Beşinci konuşmacı",
              situation: "Beşinci konuşmacı tutarsız görünen bir düzenlemeyi anlatıyor.",
              plays: 2,
              segments: [
                { text: "We banned it in the junior game and permitted it in the senior game, and I have been asked why about forty times. The answer is that the risk lies in the growing skeleton and not in the act itself. It looks inconsistent because we wrote it as one rule with two applications instead of two rules, which was a drafting decision and a poor one." },
              ],
            },
            {
              kind: "audio",
              id: "d6",
              genre: "Speaker 6",
              genreTr: "Altıncı konuşmacı",
              situation: "Altıncı konuşmacı uzun süren bir fikir değişikliğini anlatıyor.",
              plays: 2,
              segments: [
                { text: "I argued against video review for eleven years. What changed my mind was not a study. It was refereeing a semi-final, getting one wrong, and watching a nineteen-year-old lose something on my mistake. I would have said at the time that an anecdote is a poor guide, and I would still say it, and here I am." },
              ],
            },
            {
              kind: "audio",
              id: "d7",
              genre: "Seventh speaker",
              genreTr: "Yedinci konuşmacı",
              situation: "Yedinci konuşmacı basındaki iddiayı kanıtla karşılaştırıyor.",
              plays: 2,
              segments: [
                { text: "The evidence supports a modest claim: that clubs with long-serving officials report fewer disputed decisions. It does not support the claim being made in the press, which is that familiarity prevents cheating. I would be delighted if somebody would make the smaller claim instead, because the smaller claim is probably true." },
              ],
            },
            {
              kind: "audio",
              id: "d8",
              genre: "Speaker 8",
              genreTr: "Sekizinci konuşmacı",
              situation: "Sekizinci konuşmacı tartışmanın hangi kurulda yürüdüğünü ele alıyor.",
              plays: 2,
              segments: [
                { text: "This is being fought out in the disciplinary panel and it does not belong there. A panel decides whether one player did one thing on one afternoon. What is actually in dispute is whether the rule ought to exist at all, and that is a question for the annual general meeting, where it has not been tabled in six years." },
              ],
            },
          ],
          items: [
            {
              kind: "match",
              id: "en-c1-08-h4-23",
              no: 23,
              ref: "d1",
              text: "Speaker 1",
              answer: "a",
              explain:
                "Konuşmacı benzetmeyi doğrudan reddediyor: «People keep saying that a sport is like a legal system. It is not», ve benzetmenin var olmayan bir yükümlülük taşıdığını söylüyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-24",
              no: 24,
              ref: "d2",
              text: "Speaker 2",
              answer: "g",
              explain:
                "Konuşmacı düşüşün kaynağını ayırıyor: «about half of that fall is officials writing it down differently», ve davranışın düzelip düzelmediğini söyleyemiyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-25",
              no: 25,
              ref: "d3",
              text: "Speaker 3",
              answer: "c",
              explain:
                "Konuşmacı sonucun kimsenin tasarımı olmadığını söylüyor: «Nobody sat down and decided … The fixture list did that», üstelik kural da çiğnenmiyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-26",
              no: 26,
              ref: "d4",
              text: "Speaker 4",
              answer: "h",
              explain:
                "Konuşmacı kusurlarını sayıp yine de savunuyor: «The two-minute rule is detested and I would keep it», çünkü kastı bilmeden uygulanabilen tek hüküm o.",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-27",
              no: 27,
              ref: "d5",
              text: "Speaker 5",
              answer: "b",
              explain:
                "Konuşmacı tutarsız görünen kararı açıklıyor: «the risk lies in the growing skeleton and not in the act itself», görünüşteki tutarsızlık ise bir yazım kararından geliyor.",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-28",
              no: 28,
              ref: "d6",
              text: "Speaker 6",
              answer: "f",
              explain:
                "Konuşmacı on bir yıllık bir karşı çıkışın nasıl döndüğünü anlatıyor ve dönüşün kaynağını itiraf ediyor: «What changed my mind was not a study».",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-29",
              no: 29,
              ref: "d7",
              text: "Speaker 7",
              answer: "i",
              explain:
                "Konuşmacı iki iddiayı karşılaştırıp küçüğünü istiyor: «I would be delighted if somebody would make the smaller claim instead, because the smaller claim is probably true».",
            },
            {
              kind: "match",
              id: "en-c1-08-h4-30",
              no: 30,
              ref: "d8",
              text: "Speaker 8",
              answer: "j",
              explain:
                "Konuşmacı tartışmanın yerini sorguluyor: «This is being fought out in the disciplinary panel and it does not belong there», doğru yer genel kurul.",
            },
          ],
        },
      ],
    },

    /* ── WRITING ───────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "This part has two tasks: an essay and a proposal.",
      instructionTr: "Bu bölümde iki görev var: bir deneme ve bir öneri metni.",
      tasks: [
        {
          id: "en-c1-08-w1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "You have attended a seminar on rules in sport. Write an essay for your tutor summarising which of the two points below is more important, and explaining why. You should also give your own view.\n\nPoints raised:\n1. A deliberate offence should be punished more heavily than a careless one, because intention is what makes an act wrong.\n2. Both should be punished identically, because intention cannot be established reliably and a rule that cannot be applied is worse than a blunt one.\n\nWrite 220 to 260 words.",
          promptTr:
            "Spordaki kurallar üzerine bir seminere katıldın. Danışmanın için bir deneme yaz: aşağıdaki iki noktadan hangisinin daha önemli olduğunu özetle ve nedenini açıkla. Kendi görüşünü de ver.\n\nTartışılan noktalar:\n1. Kasıtlı ihlal, dikkatsizlikle yapılandan daha ağır cezalandırılmalı; bir eylemi kötü kılan kasıttır.\n2. İkisi de aynı cezalandırılmalı; kast güvenilir biçimde saptanamaz ve uygulanamayan bir kural, kaba bir kuraldan kötüdür.\n\n220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Summarise both points fairly.", tr: "İki noktayı da adil biçimde özetle." },
              { de: "Say which is more important and justify the choice.", tr: "Hangisinin daha önemli olduğunu söyle ve seçimi gerekçelendir." },
              { de: "Give your own view, distinct from the summary.", tr: "Özetten ayrı olarak kendi görüşünü ver." },
            ],
            sample: `The two positions are usually presented as a disagreement about morality, when in fact only one of them is.

The first rests on an intuition that is very hard to give up. A player who injures an opponent by accident and one who does it on purpose have not done the same thing, whatever the outcome on the pitch, and a code that treats them identically will strike everybody who plays as unjust. Justice of that kind is not decoration; it is what makes players accept the code at all.

The second position does not deny any of this. It denies that the institution can act on it. A referee cannot see intention, and a tribunal three days later has a video clip and twenty minutes. Where a finding cannot be made reliably, it will be made by impression, and impressions run in familiar directions: the well-known player is careless and the unknown one is malicious.

On balance the second point seems to me the more important, because it concerns what will actually happen rather than what ought to. A distinction that exists only on paper does not deliver justice; it launders prejudice through a document.

My own view is that the choice is being posed too early. The real question is whether the tribunals are improvable, and neither side of the seminar addressed it. If they are, the first position wins on the merits. If they are not, keeping intention in the laws is a way of appearing to honour a principle while abandoning it in practice.`,
            criteria: [
              "İki nokta da adil ve tam özetlendi mi?",
              "Seçim gerekçelendirildi mi ve gerekçe özetten çıkıyor mu?",
              "Kendi görüş özetin tekrarı değil, ayrı bir sav mı?",
              "Çekimserlik belirteçleri ve adlaştırma kullanıldı mı? (on balance, the distinction, in practice)",
              "220–260 kelime aralığında mı?",
            ],
          },
        },
        {
          id: "en-c1-08-w2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "A club you belong to is considering a new rule to deal with a problem in its competitions. Write a proposal for the committee. Describe the problem, set out what you propose and what you would not propose, and say what evidence would show that the rule had failed. Write 220 to 260 words.",
          promptTr:
            "Üyesi olduğun bir kulüp, yarışmalarındaki bir sorun için yeni bir kural düşünüyor. Yönetim kuruluna bir öneri metni yaz. Sorunu anlat, neyi önerdiğini ve neyi önermediğini ortaya koy ve hangi kanıtın kuralın başarısız olduğunu göstereceğini söyle. 220–260 kelime yaz.",
          items: [],
          rubric: {
            minWords: 220,
            points: [
              { de: "Describe the problem precisely.", tr: "Sorunu kesin biçimde anlat." },
              { de: "Set out what you propose and what you deliberately do not propose.", tr: "Neyi önerdiğini ve bilerek neyi önermediğini ortaya koy." },
              { de: "State what evidence would show that the rule had failed.", tr: "Hangi kanıtın kuralın başarısız olduğunu göstereceğini söyle." },
            ],
            sample: `Proposal: withdrawals from the winter league

The problem
In each of the last three seasons, between nine and fourteen teams have withdrawn after the draw was published. The effect is not primarily competitive. It falls on the club that has already paid for a pitch and on the fixtures secretary, who redraws the round by hand.

What I propose
That any team withdrawing after the draw forfeits its entry fee, and that the fee is raised from ten to twenty-five pounds so that the forfeit is meaningful. The money should be returned to the club left without an opponent rather than retained centrally, since it is that club which carries the loss.

What I do not propose
I do not propose a ban on re-entry the following season, which has been suggested twice. It punishes the wrong people, since teams are rebuilt every year, and it would reduce the number of entrants, which is the underlying problem rather than the presenting one.

How we would know it had failed
Two findings would tell us. First, if withdrawals fell but total entries fell by a comparable number, we will simply have priced out the teams that were least certain of fielding a side. Second, if withdrawals move from after the draw to the week before it, the behaviour has been displaced and not reduced. I suggest we record both figures from the first season and publish them, whatever they show.`,
            criteria: [
              "Sorun somut sayılarla ve kime düştüğüyle birlikte anlatıldı mı?",
              "Önerilen ve bilerek önerilmeyen ayrı ayrı verildi mi?",
              "Başarısızlık ölçütü gerçekten sınanabilir mi?",
              "Öneri metni kaydı ve başlıklandırma uygun mu?",
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
          id: "en-c1-08-s1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt: "I ask you some questions about rules, games and what people agree to.",
          promptTr: "Sana kurallar, oyunlar ve insanların neye rıza gösterdiği hakkında sorular soracağım.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Good afternoon. Is there a rule you keep even though nobody would notice if you did not?", tr: "İyi günler. Uymasan kimsenin fark etmeyeceği hâlde uyduğun bir kural var mı?" },
            { who: "you", hint: "Somut bir örnek ver ve neden uyduğunu açıkla.", expect: "somut bir örnekten genel bir gerekçeye geçmek", seconds: 45 },
            { who: "partner", de: "Thank you. Have you ever seen somebody break a rule and found that you did not mind?", tr: "Teşekkürler. Birinin bir kuralı çiğnediğini görüp buna aldırmadığın oldu mu?" },
            { who: "you", hint: "Tek bir olayı anlat ve neden rahatsız olmadığını açıkla.", expect: "tek bir olayı anlatmak ve kendi tepkisini çözümlemek", seconds: 45 },
            { who: "partner", de: "And if you were writing the rules for something, what would you refuse to put in?", tr: "Bir şeyin kurallarını sen yazsan, neyi koymayı reddederdin?" },
            { who: "you", hint: "Bir ölçüt öner ve gerekçelendir.", expect: "varsayımsal bir görevde ölçüt önermek ve gerekçelendirmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "move from an example to a general reason", tr: "Örnekten genel bir gerekçeye geçmek" },
              { de: "analyse one's own reaction to an event", tr: "Bir olay karşısındaki kendi tepkisini çözümlemek" },
              { de: "propose and justify a criterion", tr: "Bir ölçüt önerip gerekçelendirmek" },
            ],
            sample:
              "I return the shopping trolley to the shelter even when the car park is empty at ten at night, and the reason is not virtue; it is that I would have to watch myself not do it. A neighbour of mine parks across the end of the road every Sunday and it blocks nobody, and I notice that my objection evaporates the moment the inconvenience does, which tells me my principle was never about the rule. If I were writing rules for anything, I would refuse to include any provision that requires somebody to establish what another person was thinking, because that finding will be made anyway and it will be made by impression.",
            criteria: [
              "İlk cevap örnekten gerekçeye geçebildi mi?",
              "İkinci cevapta kendi tepkisi çözümlendi mi, yoksa yalnız anlatıldı mı?",
              "Son cevapta bir ölçüt önerilip savunuldu mu?",
              "Soyut sözcük dağarı kullanıldı mı?",
            ],
          },
        },
        {
          id: "en-c1-08-s2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Talk on your own for about two minutes. Compare these two ways of keeping a competition honest, say which you would defend and explain one serious objection to your own position: technical detection such as cameras and testing, or the informal pressure of a community in which people know one another.",
          promptTr:
            "Yaklaşık iki dakika tek başına konuş. Bir yarışmayı dürüst tutmanın şu iki yolunu karşılaştır, hangisini savunacağını söyle ve kendi konumuna yöneltilebilecek ciddi bir itirazı açıkla: kamera ve test gibi teknik denetim mi, insanların birbirini tanıdığı bir topluluğun gayriresmî baskısı mı?",
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
              "Technical detection has the advantage of working on strangers, which is what modern competition consists of, and it produces a record that can be examined afterwards. Its cost is rarely stated: it converts a question of trust into a question of surveillance, and a player who is no longer trusted has correspondingly less reason to be trustworthy. Informal pressure is cheap, it reaches conduct that no rule describes, and it collapses the moment the group is large enough for anonymity. I would defend the technical route, chiefly because the alternative requires a stable community and most competitions no longer have one; nostalgia is not a governance strategy. The serious objection to my own position is that detection quietly retires the mechanisms it replaces. Clubs which install cameras stop having the conversation in the changing room, and if the cameras are later withdrawn, or simply fail, nothing is left underneath them.",
            criteria: [
              "İki yaklaşım da gerçekten karşılaştırıldı mı?",
              "Konum gerekçelendirildi mi?",
              "Kendi konumuna yöneltilen itiraz ciddi mi?",
              "İki dakika akıcı ve düzenli konuşuldu mu?",
            ],
          },
        },
        {
          id: "en-c1-08-s3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "A competition wants to reduce a persistent offence and can trial one change next season. Talk with me about the options, then agree which to trial and what result would make us abandon it.",
          promptTr:
            "Bir yarışma süregelen bir ihlali azaltmak istiyor ve gelecek sezon tek bir değişikliği deneyebiliyor. Seçenekleri benimle konuş, sonra hangisini deneyeceğimize ve hangi sonucun onu bıraktıracağına karar ver.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "The options are: double the penalty, add video review for that offence only, publish the offence counts by team, or train the officials to apply the existing rule consistently. Which would change behaviour?", tr: "Seçenekler: cezayı ikiye katlamak, yalnız o ihlal için video incelemesi eklemek, ihlal sayılarını takım takım yayımlamak ya da hakemleri mevcut kuralı tutarlı uygulamak üzere eğitmek. Hangisi davranışı değiştirir?" },
            { who: "you", hint: "Bir seçenek seç ve neden davranışı değiştireceğini açıkla.", expect: "seçenekleri değerlendirmek ve birini gerekçesiyle savunmak", seconds: 45 },
            { who: "partner", de: "But if we double the penalty and the recorded offences fall, we will not know whether the behaviour changed or the officials simply started recording it differently. Does that not sink your choice?", tr: "Ama cezayı ikiye katlar ve kayıtlı ihlaller düşerse, davranış mı değişti yoksa hakemler mi farklı kaydetmeye başladı, bilemeyiz. Bu seçimini batırmıyor mu?" },
            { who: "you", hint: "İtirazın gücünü teslim et ve ölçme sorununu çözecek bir şey öner.", expect: "bir itirazı teslim edip ölçme sorununa çözüm önermek", seconds: 45 },
            { who: "partner", de: "Then tell me what result, at the end of the season, would make us stop.", tr: "Öyleyse sezon sonunda hangi sonuç bunu bıraktırırdı, söyle." },
            { who: "you", hint: "Sınanabilir bir başarısızlık ölçütü formüle et.", expect: "sınanabilir bir başarısızlık ölçütü formüle etmek", seconds: 45 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "justify a choice against the alternatives", tr: "Bir seçimi seçeneklere karşı gerekçelendirmek" },
              { de: "concede the force of an objection", tr: "Bir itirazın gücünü teslim etmek" },
              { de: "formulate a testable failure condition", tr: "Sınanabilir bir başarısızlık ölçütü formüle etmek" },
            ],
            sample:
              "I would take the training, on the ground that the other three all assume the existing rule is being applied consistently, and every count we have suggests it is not. You are right about the measurement problem, and it applies to my choice more sharply than to yours, since training is precisely a change in how officials see things. What I would do is freeze the recording form for the season and have a second observer code twenty matches independently, which is cheap and is the only way to separate the two. As for abandoning it: if the independent coding shows the same rate of the offence while the official returns fall, we have trained the recording rather than the conduct, and I would stop and say so publicly rather than let the lower number stand.",
            criteria: [
              "Seçim seçeneklere karşı mı gerekçelendirildi?",
              "İtirazın gücü teslim edildi mi ve kendi seçimine de uygulandı mı?",
              "Başarısızlık ölçütü gerçekten sınanabilir mi?",
              "Karşı tarafın sözlerine gönderme yapıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};

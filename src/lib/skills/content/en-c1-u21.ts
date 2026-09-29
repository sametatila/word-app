import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 21 — "Tek bir sayıya üç ad, parayı kim kaybediyor,
 * açığa çıkarma istemek, faiz tartışması".
 *
 * Dört ders: Three names for one number · Who loses the money ·
 * Demanding disclosure · The interest rate debate.
 *
 *   Kelime: downturn, stagnation, deflation, business cycle, devaluation,
 *           real economy, in nominal terms, budget deficit, market failure,
 *           bailout package, speculative bubble, systemic risk, trade deficit,
 *           financial regulator, disclosure, whistleblower, misconduct,
 *           monetary policy, key interest rate, expansionary, countercyclical.
 *   Kalıp:  In the press release it is a downturn; in the model, stagnation. ·
 *           Deflation is a number; the business cycle is a story. ·
 *           What the bank calls a devaluation, the real economy calls a loss. ·
 *           What the budget deficit does is hide a market failure. ·
 *           Behind the bailout package stands a speculative bubble. ·
 *           The systemic risk we insure; the trade deficit we do not. ·
 *           The financial regulator demands that the disclosure be complete. ·
 *           Were it not for the lack of transparency, no reporting office would be needed. ·
 *           They ask that every whistleblower be heard before the misconduct is buried. ·
 *           Much as I welcome the monetary policy, the key interest rate hurts the young. ·
 *           An expansionary step, albeit restrictive later, buys time. ·
 *           Although countercyclical, the fiscal policy arrives too late.
 *
 * Ünitenin tek öğretme noktası ÇERÇEVE ÖBEĞİ: „in nominal terms“, „in real
 * terms“, „in terms of scale“, „in urban design terms“ (son ikisi bir
 * önceki ünitede geçti). Dört sözcük para hakkındaki herhangi bir iddianın
 * önüne konabiliyor ve içindeki tek bir rakamı değiştirmeden iddianın ne
 * söylediğini değiştiriyor: aynı bordro için ücretler nominal olarak yüzde
 * dört yükseldi, reel olarak yüzde bir düştü, ve iki yarı da doğru.
 * İngilizce bu çerçeveleri serbestçe kuruyor ve asıl mesele KONUMU: başta
 * duran çerçeve okuru iddia gelmeden uyarıyor, sonda duran ise daha
 * büyüğüne inanmış okuru düzeltiyor — sözcükler birebir aynı, iki cümle
 * ayrı iş görüyor. Almanca çoğunlukla boyutu isimden türetilmiş bir sıfata
 * ya da bir bileşiğe koyuyor, yani sınırlama cümlenin tamamının önünde
 * yüzmüyor, sınırladığı ÖĞEYE bağlanıyor. Ölçü: **ÇERÇEVE TAŞINABİLİR, EK
 * TAŞINAMAZ — İNGİLİZCE YAZAN OKURUN BOYUTU NE ZAMAN ÖĞRENECEĞİNİ SEÇİYOR,
 * VE BU SEÇİMİN ÖTEKİ TARAFTA KARŞILIĞI YOK.**
 */
export const enC1U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u21-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 21,
    title: "Pay rise or pay cut",
    genre: "article",
    intro: "Bir tekstil kasabasında ücret anlaşması. Ücretler arttı mı, azaldı mı?",
    gloss: [
      { de: "do the sums", tr: "hesap yapmak" },
      { de: "a pay stub", tr: "bordro" },
      { de: "a union", tr: "sendika" },
      { de: "a plant", tr: "fabrika" },
      { de: "textile", tr: "tekstil" },
      { de: "a victory", tr: "zafer" },
      { de: "bitter", tr: "sert" },
      { de: "a chamber of commerce", tr: "ticaret odası" },
      { de: "simply", tr: "yalın bir dille" },
      { de: "autumn", tr: "sonbahar" },
      { de: "a currency", tr: "para birimi" },
      { de: "imported", tr: "ithal" },
      { de: "cotton", tr: "pamuk" },
      { de: "lira", tr: "lira" },
      { de: "barely", tr: "neredeyse hiç" },
      { de: "reopen", tr: "yeniden açmak" },
      { de: "a pay rise", tr: "maaş zammı" },
    ],
    minutes: 12,
    text:
      "PAY RISE OR PAY CUT? A TEXTILE TOWN DOES THE SUMS\n" +
      "When the wage agreement at the Bursa textile plant was signed in March, the union called it a victory. In nominal terms, it was one: every worker on the floor gets four percent more on the monthly pay stub. In real terms, the picture is darker. Prices in the region rose by about five percent over the same year, so the same pay stub buys roughly one percent less than it did twelve months ago.\n" +
      "Both numbers are true, and that is exactly why the argument in the town has become so bitter. The company points to the first. The workers point to the second. Neither side is wrong.\n" +
      "In the press release it is a downturn; in the central bank's model, stagnation. Economists at the local chamber of commerce say the difference matters. A downturn is expected to end. Stagnation is a condition that can last for years, and in terms of planning, a family treats the two very differently. Ayten Demir, who has worked at the plant for eighteen years, put it simply: „I do not need a word for it. I need to know if I can pay the rent in the autumn.“\n" +
      "The currency has not helped. What the bank calls a devaluation, the real economy calls a loss: imported cotton now costs more in lira terms, even though the price in dollars has barely moved. In terms of jobs, the plant is stable for now, but two smaller suppliers closed in the winter.\n" +
      "Deflation is a number; the business cycle is a story. Nobody in the town is worried about deflation, since prices are still going up. What people want is a story they can believe: when will this part of the cycle end?\n" +
      "The union has promised to reopen talks in September. By then, it says, it will have the only figure that matters, the wage in real terms, and it will not sign anything that measures pay in nominal terms alone.",
    questions: [
      {
        text: "How much did wages rise in nominal terms?",
        options: ["four percent", "five percent", "one percent"],
        answer: 0,
        explain: "„In nominal terms, it was one: every worker on the floor gets four percent more on the monthly pay stub.“",
      },
      {
        text: "Why does the same pay stub buy less?",
        options: ["Prices rose faster than wages.", "The plant cut working hours.", "The union lost the vote."],
        answer: 0,
        explain: "„Prices in the region rose by about five percent over the same year…“",
      },
      {
        kind: "truefalse",
        text: "Both the company and the workers are telling the truth.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Both numbers are true, and that is exactly why the argument in the town has become so bitter.“",
      },
      {
        kind: "gapfill",
        text: "Deflation is a number; the business cycle is a ___.",
        options: [],
        answer: 0,
        accept: ["story"],
        explain: "„Deflation is a number; the business cycle is a story.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The wage agreement is signed in March.",
          "The company and the workers point to different numbers.",
          "Imported cotton costs more after the devaluation.",
          "The union will reopen talks in September.",
        ],
        explain: "Anlaşma, iki tarafın rakamları, döviz kuru; en sonda eylüldeki görüşme.",
      },
      {
        kind: "short_answer",
        text: "Which figure will the union insist on?",
        options: [],
        answer: 0,
        accept: ["the wage in real terms", "the real wage", "real wages"],
        explain: "„the only figure that matters, the wage in real terms…“",
      },
    ],
  },
  {
    id: "en-c1-u21-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 21,
    title: "Reporting misconduct at a bank",
    genre: "guide",
    intro: "Bankalar için yeni ihbar kuralları. Usulsüzlüğü bildiren çalışan nasıl korunuyor?",
    gloss: [
      { de: "complete", tr: "eksiksiz" },
      { de: "partial", tr: "kısmi" },
      { de: "a leak", tr: "sızıntı" },
      { de: "a last resort", tr: "son çare" },
      { de: "a witness", tr: "tanık" },
      { de: "a copy", tr: "suret" },
      { de: "independent", tr: "bağımsız" },
      { de: "discover", tr: "ortaya çıkarmak" },
      { de: "forbid", tr: "yasaklamak" },
      { de: "a chain of command", tr: "emir komuta zinciri" },
      { de: "unsure", tr: "emin olmayan" },
      { de: "confidential", tr: "gizli" },
      { de: "a weekday", tr: "hafta içi" },
      { de: "illegal", tr: "yasa dışı" },
    ],
    minutes: 12,
    text:
      "REPORTING MISCONDUCT AT WORK: WHAT THE NEW RULES MEAN FOR YOU\n" +
      "Since January, the financial regulator demands that every bank with more than fifty staff run an internal reporting office, and that the office be independent of the board. Were it not for three scandals in five years, the rule would probably never have been written. Here is what it means in practice.\n" +
      "1. The report. The regulator requires that a report be acknowledged within seven days and that the person who made it be told what happened within three months. If you hear nothing, write again and keep both emails.\n" +
      "2. The disclosure. When a bank discovers a problem, the regulator demands that the disclosure be complete. A partial disclosure is often worse than none, because readers trust it: someone who has seen four of five numbers believes they have seen the whole position.\n" +
      "3. Your protection. Unions have long asked that every whistleblower be heard before the misconduct is buried, and the new law finally says so. It forbids that anyone be dismissed or moved to a worse job because of a report made in good faith.\n" +
      "4. The records. Write the date on everything. Keep a copy outside the building. Tell one person who is not in your chain of command, so that there is a witness to the fact that you spoke up, not only to what you said.\n" +
      "5. The press. A leak to a newspaper is a last resort, and it is protected in fewer countries than people think. An internal report with a date on it is protected almost everywhere, and it is the document that decides everything afterward.\n" +
      "Were it not for people who took these steps, most of the cases of the last decade would never have come to light. If you are unsure, the regulator runs a free, confidential advice line on weekdays from 9:00 to 17:00.",
    questions: [
      {
        text: "What must every bank with more than fifty staff run?",
        options: ["an internal reporting office", "a free advice line", "a press office"],
        answer: 0,
        explain: "„the financial regulator demands that every bank with more than fifty staff run an internal reporting office…“",
      },
      {
        text: "Why is a partial disclosure often worse than none?",
        options: ["because readers trust it", "because it is late", "because it is illegal"],
        answer: 0,
        explain: "„A partial disclosure is often worse than none, because readers trust it…“",
      },
      {
        kind: "truefalse",
        text: "A leak to a newspaper is protected in most countries.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it is protected in fewer countries than people think.“",
      },
      {
        kind: "gapfill",
        text: "Unions have long asked that every whistleblower be heard ___ the misconduct is buried.",
        options: [],
        answer: 0,
        accept: ["before"],
        explain: "„Unions have long asked that every whistleblower be heard before the misconduct is buried…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Every bank must run an internal reporting office.",
          "A report must be acknowledged within seven days.",
          "Nobody may be dismissed because of a report.",
          "A leak to a newspaper is a last resort.",
        ],
        explain: "Kural, bildirimin süresi, çalışanın korunması; en sonda basına sızdırma.",
      },
      {
        kind: "short_answer",
        text: "Who should you tell?",
        options: [],
        answer: 0,
        accept: ["someone outside your chain", "one person outside the chain", "a witness"],
        explain: "„Tell one person who is not in your chain of command…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u21-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 21,
    title: "Interest rates and the young",
    genre: "dialogue",
    intro: "Politika işliyor ve yine de birine zarar veriyor. Kime?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "particular", tr: "belirli" },
      { de: "either", tr: "ikisinden biri" },
      { de: "defense", tr: "savunma" },
      { de: "spent", tr: "harcanan" },
      { de: "proposed", tr: "önerilen" },
      { de: "a rate", tr: "faiz oranı" },
      { de: "the young", tr: "gençler" },
      { de: "a saver", tr: "tasarruf sahibi" },
      { de: "a borrower", tr: "borçlanan" },
      { de: "an apartment", tr: "daire" },
      { de: "a deposit", tr: "peşinat" },
      { de: "time", tr: "zaman" },
      { de: "bought", tr: "satın alınan" },
      { de: "a step", tr: "adım" },
      { de: "later", tr: "sonra" },
      { de: "too late", tr: "çok geç" },
      { de: "a committee", tr: "kurul" },
      { de: "average", tr: "ortalama" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Melis", text: "Much as I welcome the monetary policy, the key interest rate hurts the young. Both halves are true and the second one is almost never in the same paragraph as the first." },
      { speaker: "Arda", text: "Why the young in particular?" },
      { speaker: "Melis", text: "Because they are the borrowers. A saver with an apartment already bought is on the other side of every rate, and the average of the two says nothing about either." },
      { speaker: "Arda", text: "So the average hides two directions." },
      { speaker: "Melis", text: "It hides two directions and a deposit. The rate moves the monthly payment, and the deposit is the part that decides who gets in at all." },
      { speaker: "Arda", text: "An expansionary step, albeit restrictive later, buys time." },
      { speaker: "Melis", text: "That is the honest defense of the whole policy and it is worth taking seriously. Time is a real thing to buy, and somebody has to decide what it is spent on." },
      { speaker: "Arda", text: "Who usually decides?" },
      { speaker: "Melis", text: "Nobody, in my experience. The time is bought and then it passes, and the same committee meets again with the same question and a worse starting point." },
      { speaker: "Arda", text: "Although countercyclical, the fiscal policy arrives too late." },
      { speaker: "Melis", text: "And that is the second half of the same problem. The design is right and the calendar is wrong, because the measurement that triggers it takes two quarters to arrive." },
      { speaker: "Arda", text: "Could that be fixed?" },
      { speaker: "Melis", text: "With rules that start themselves on a number rather than on a vote. It has been proposed in every decade I have read about and it loses the vote every time." },
    ],
    questions: [
      {
        text: "Why the young in particular?",
        options: ["they are the borrowers", "they are the savers", "they own apartments"],
        answer: 0,
        explain: "„Because they are the borrowers.“",
      },
      {
        text: "What decides who gets in at all?",
        options: ["the deposit", "the monthly payment", "the rate"],
        answer: 0,
        explain: "„the deposit is the part that decides who gets in at all.“",
      },
      {
        kind: "truefalse",
        text: "Nobody usually decides what the bought time is spent on.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nobody, in my experience.“",
      },
      {
        kind: "gapfill",
        text: "An expansionary step, albeit restrictive later, ___ time.",
        options: [],
        answer: 0,
        accept: ["buys"],
        explain: "„An expansionary step, albeit restrictive later, buys time.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Although countercyclical, the fiscal policy arrives too late.", "Although countercyclical, the fiscal policy arrives too late"],
        explain: "Tasarım doğru, takvim yanlış.",
      },
      {
        kind: "short_answer",
        text: "What would fix the calendar?",
        options: [],
        answer: 0,
        accept: ["rules that start themselves", "a number not a vote", "rules on a number"],
        explain: "„With rules that start themselves on a number rather than on a vote.“",
      },
    ],
  },
  {
    id: "en-c1-u21-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 21,
    title: "Deficit and market failure",
    genre: "monologue",
    intro: "Bir açık neyi gizliyor? Hangi riski sigortalıyoruz?",
    gloss: [
      { de: "appearing", tr: "görünen" },
      { de: "visible", tr: "görünür" },
      { de: "countable", tr: "sayılabilir" },
      { de: "none", tr: "hiçbiri" },
      { de: "event", tr: "olay" },
      { de: "lecture", tr: "ders" },
      { de: "daylight", tr: "gün ışığı" },
      { de: "a deficit", tr: "açık" },
      { de: "a failure", tr: "başarısızlık" },
      { de: "a gap", tr: "aralık" },
      { de: "a price", tr: "fiyat" },
      { de: "a bubble", tr: "balon" },
      { de: "a package", tr: "paket" },
      { de: "a bank", tr: "banka" },
      { de: "a loss", tr: "zarar" },
      { de: "shared", tr: "paylaşılan" },
      { de: "a gain", tr: "kazanç" },
      { de: "private", tr: "özel" },
      { de: "a taxpayer", tr: "vergi mükellefi" },
      { de: "lend", tr: "borç vermek" },
      { de: "produced", tr: "doğurdu" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Volkan", text: "What the budget deficit does is hide a market failure. A number everybody argues about, standing in front of a thing nobody has named." },
      { speaker: "Volkan", text: "A deficit is the gap between two columns. A market failure is a price that stopped telling the truth about a cost, and the second is what produced the first." },
      { speaker: "Volkan", text: "Arguing about the deficit is arguing about the size of a symptom, and it can be done for ten years without the word „price“ ever appearing." },
      { speaker: "Volkan", text: "Behind the bailout package stands a speculative bubble. Two years of cheap loans for office towers that nobody needed, and banks that kept lending because everyone else was." },
      { speaker: "Volkan", text: "The package is visible, dated and countable. The bubble was none of those things while it was growing, and everyone I have met remembers noticing it." },
      { speaker: "Volkan", text: "The systemic risk we insure; the trade deficit we do not. That choice was made on purpose, and it is worth knowing why." },
      { speaker: "Volkan", text: "We insure the first because a bank failing takes others with it. We do not insure the second because it is not an event; it is a direction." },
      { speaker: "Volkan", text: "So here is the line I would put at the end of any lecture on this. Losses that are shared and gains that are private are not a failure of the system." },
      { speaker: "Volkan", text: "They are the system working as it was built, and the building was done in public, in daylight, by people whose names are on the law." },
      { speaker: "Volkan", text: "A taxpayer who understands that will ask a better question at the next election than one who thinks somebody stole something." },
    ],
    questions: [
      {
        text: "What is a market failure?",
        options: ["a price that stopped telling the truth", "a gap between columns", "a bubble"],
        answer: 0,
        explain: "„A market failure is a price that stopped telling the truth about a cost…“",
      },
      {
        text: "Why is the trade deficit not insured?",
        options: ["it is a direction", "it is too large", "it is private"],
        answer: 0,
        explain: "„it is not an event; it is a direction.“",
      },
      {
        kind: "truefalse",
        text: "Shared losses and private gains are a failure of the system.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They are the system working as it was built…“",
      },
      {
        kind: "gapfill",
        text: "Behind the bailout package stands a speculative ___.",
        options: [],
        answer: 0,
        accept: ["bubble"],
        explain: "„Behind the bailout package stands a speculative bubble.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What the budget deficit does is hide a market failure.", "What the budget deficit does is hide a market failure"],
        explain: "Tartışılan sayı, adlandırılmamış şeyin önünde duruyor.",
      },
      {
        kind: "short_answer",
        text: "Where was the building done?",
        options: [],
        answer: 0,
        accept: ["in public", "in daylight", "in the open"],
        explain: "„the building was done in public, in daylight…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u21-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 21,
    title: "Notes for the economy page",
    genre: "info",
    intro: "Ekonomi sayfası için notlar: cümleler ve bir bilgi kartı.",
    gloss: [
      { de: "in nominal terms", tr: "nominal olarak" },
      { de: "in real terms", tr: "reel olarak" },
      { de: "a downturn", tr: "ekonomik daralma" },
      { de: "stagnation", tr: "durgunluk" },
      { de: "deflation", tr: "deflasyon" },
      { de: "a devaluation", tr: "değer kaybı" },
      { de: "a budget deficit", tr: "bütçe açığı" },
      { de: "a bailout package", tr: "kurtarma paketi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Basın bülteninde ekonomik daralma, modelde durgunluk.",
        answer: "In the press release it is a downturn; in the model, stagnation.",
        hint: "İki oda, iki sözcük; ikinci yarıda fiil yok.",
      },
      {
        kind: "build",
        tr: "Deflasyon bir sayıdır; konjonktür döngüsü bir öyküdür.",
        answer: "Deflation is a number; the business cycle is a story.",
        hint: "Biri gösterilerek yanlışlanabilir, öteki noktalardan çizilmiş bir biçim.",
      },
      {
        kind: "build",
        tr: "Bankanın değer kaybı dediğine reel ekonomi zarar diyor.",
        answer: "What the bank calls a devaluation, the real economy calls a loss.",
        hint: "İki ad ve sahipleri aynı cümlede.",
      },
      {
        kind: "build",
        tr: "Bütçe açığının yaptığı şey bir piyasa başarısızlığını gizlemektir.",
        answer: "What the budget deficit does is hide a market failure.",
        hint: "Tartışılan sayı, adlandırılmamış şeyin önünde.",
      },
      {
        kind: "build",
        tr: "Kurtarma paketinin arkasında bir spekülasyon balonu duruyor.",
        answer: "Behind the bailout package stands a speculative bubble.",
        hint: "Yer başta, özne sonda.",
      },
      {
        kind: "form",
        prompt: "Ekonomi haberi için bilgi kartını doldur.",
        facts: "Ücretler nominal olarak yüzde dört arttı, reel olarak yüzde bir düştü; bankanın değer kaybı dediği şey reel ekonomi için bir zarar; bütçe açığı bir piyasa başarısızlığını gizliyor.",
        fields: [
          { label: "Wages in nominal terms", answer: "up four percent", accept: ["four percent higher", "up 4 percent"] },
          { label: "Wages in real terms", answer: "down one percent", accept: ["one percent lower", "down 1 percent"] },
          { label: "For the real economy", answer: "a loss", accept: ["loss"] },
          { label: "What the deficit hides", answer: "a market failure", accept: ["market failure"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u21-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 21,
    title: "Rules for the banks",
    genre: "info",
    intro: "Eksiksizlik eşiği ve faizin iki yarısı.",
    gloss: [
      { de: "disclosure", tr: "açığa çıkarma" },
      { de: "a reporting office", tr: "bildirim birimi" },
      { de: "a whistleblower", tr: "ifşacı" },
      { de: "monetary policy", tr: "para politikası" },
      { de: "a key interest rate", tr: "politika faizi" },
      { de: "countercyclical", tr: "konjonktür karşıtı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Finansal düzenleyici kurum açığa çıkarmanın eksiksiz olmasını talep eder.",
        answer: "The financial regulator demands that the disclosure be complete.",
        hint: "Son sözcük bir yön değil, bir eşik.",
      },
      {
        kind: "build",
        tr: "Şeffaflık eksikliği olmasa hiçbir bildirim birimine gerek olmazdı.",
        answer: "Were it not for the lack of transparency, no reporting office would be needed.",
        hint: "Varsayım aynı zamanda bir itiraf.",
      },
      {
        kind: "build",
        tr: "Her ifşacının, usulsüzlük gömülmeden önce dinlenmesini istiyorlar.",
        answer: "They ask that every whistleblower be heard before the misconduct is buried.",
        hint: "Sıra kuralın kendisi: önce dinlenmek.",
      },
      {
        kind: "build",
        tr: "Para politikasını ne kadar olumlu bulsam da politika faizi gençlere zarar veriyor.",
        answer: "Much as I welcome the monetary policy, the key interest rate hurts the young.",
        hint: "İki yarı da doğru; ikincisi aynı paragrafta pek durmuyor.",
      },
      {
        kind: "build",
        tr: "Konjonktür karşıtı olsa da maliye politikası çok geç geliyor.",
        answer: "Although countercyclical, the fiscal policy arrives too late.",
        hint: "Tasarım doğru, takvim yanlış.",
      },
    ],
  },
];

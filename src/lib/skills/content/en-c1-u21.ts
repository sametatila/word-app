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
 *           Much as the monetary policy works, the key interest rate hurts the young. ·
 *           An expansionary step, albeit restrictive later, buys time. ·
 *           Albeit countercyclical, the fiscal policy arrives too late.
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
    title: "Three names for one number",
    genre: "info",
    intro: "Üç sözcük tek rakamı değiştirmeden iddiayı değiştiriyor. Nerede duruyorlar?",
    gloss: [
      { de: "per", tr: "başına" },
      { de: "cent", tr: "yüzde birim" },
      { de: "halves", tr: "yarılar" },
      { de: "builds", tr: "kuruyor" },
      { de: "adjective", tr: "sıfat" },
      { de: "noun", tr: "isim" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "pair", tr: "çift" },
      { de: "a figure", tr: "rakam" },
      { de: "a payslip", tr: "bordro" },
      { de: "a frame", tr: "çerçeve" },
      { de: "freely", tr: "serbestçe" },
      { de: "a dimension", tr: "boyut" },
      { de: "measured", tr: "ölçülen" },
      { de: "wherever", tr: "nereye isterse" },
      { de: "usefulness", tr: "yararı" },
      { de: "warns", tr: "uyarıyor" },
      { de: "taken back", tr: "geri alınan" },
      { de: "corrects", tr: "düzeltiyor" },
      { de: "identical", tr: "birebir aynı" },
      { de: "a compound", tr: "bileşik" },
      { de: "bound", tr: "bağlı" },
      { de: "an element", tr: "öğe" },
      { de: "floating", tr: "yüzen" },
      { de: "attached", tr: "iliştirilmiş" },
      { de: "an ending", tr: "ek" },
      { de: "an equivalent", tr: "karşılık" },
      { de: "point at", tr: "gösterilen" },
      { de: "a shape", tr: "biçim" },
      { de: "drawn through", tr: "içinden çizilmiş" },
      { de: "a household", tr: "hane" },
      { de: "the owners", tr: "sahipler" },
    ],
    minutes: 12,
    text:
      "In the press release it is a downturn; in the model, stagnation. One number, two rooms, and the real subject of this lesson is a phrase that is not in that sentence yet.\n" +
      "„In nominal terms.“ Three words that can be put in front of any claim about money, and they change what the claim says without changing a single figure in it. Wages rose four per cent in nominal terms and fell one per cent in real terms, and both halves are true of the same payslip.\n" +
      "This is a frame. English builds them freely: in terms of scale, in urban design terms, in real terms, in nominal terms, in legal terms. The dimension a claim is measured on gets named in a phrase, and the phrase can go wherever the writer wants it.\n" +
      "Where it goes is the whole of its usefulness. At the front it warns the reader before the claim arrives, so nothing has to be taken back. At the end it corrects a reader who has already believed something larger. The words are identical and the two sentences do different work.\n" +
      "German mostly does this another way. The dimension goes into an adjective built out of the noun, or into a compound, and the result is bound to one element of the sentence rather than floating in front of the whole clause. So a German reader usually meets the limitation attached to the word it limits, and an English reader meets it as a frame around everything.\n" +
      "Neither is better, and the difference matters in one place: a frame can be moved and an ending cannot. A writer in English chooses when the reader learns the dimension, and that choice has no equivalent on the other side.\n" +
      "Deflation is a number; the business cycle is a story. And this is why the frames are needed here more than anywhere else. One of those two can be wrong in a way somebody can point at; the other is a shape drawn through points that were already there.\n" +
      "What the bank calls a devaluation, the real economy calls a loss. One more pair with the owners attached, and the second of the two names is the one with a household in it.",
    questions: [
      {
        text: "What does the frame change?",
        options: ["what the claim says", "the figure", "the payslip"],
        answer: 0,
        explain: "„they change what the claim says without changing a single figure in it.“",
      },
      {
        text: "What does a frame at the front do?",
        options: ["warns the reader", "corrects the reader", "names the figure"],
        answer: 0,
        explain: "„At the front it warns the reader before the claim arrives…“",
      },
      {
        kind: "truefalse",
        text: "An ending can be moved like a frame.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a frame can be moved and an ending cannot.“",
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
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "In the press release it is a downturn; in the model, stagnation.",
          "The same payslip is true in both halves.",
          "A frame can be moved and an ending cannot.",
          "Deflation is a number; the business cycle is a story.",
        ],
        explain: "İki oda, iki çerçeve, taşınabilirlik; en sonda sayı ile öykü.",
      },
      {
        kind: "short_answer",
        text: "What does the writer choose?",
        options: [],
        answer: 0,
        accept: ["when the reader learns", "the position", "where it goes"],
        explain: "„A writer in English chooses when the reader learns the dimension…“",
      },
    ],
  },
  {
    id: "en-c1-u21-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 21,
    title: "Demanding disclosure",
    genre: "opinion",
    intro: "Talep eden bir kurum ve gömülen bir usulsüzlük. Sıra neden önemli?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "exists", tr: "var" },
      { de: "passive", tr: "edilgen" },
      { de: "burying", tr: "gömme" },
      { de: "practical", tr: "işe dönük" },
      { de: "complete", tr: "eksiksiz" },
      { de: "a regulator", tr: "düzenleyici kurum" },
      { de: "a threshold", tr: "eşik" },
      { de: "partial", tr: "kısmi" },
      { de: "worse", tr: "daha kötü" },
      { de: "trusted", tr: "güvenilen" },
      { de: "a supposing", tr: "varsayım" },
      { de: "needed", tr: "gerekli" },
      { de: "an office", tr: "birim" },
      { de: "heard", tr: "dinlenmiş" },
      { de: "buried", tr: "gömülmüş" },
      { de: "an order", tr: "sıra" },
      { de: "a leak", tr: "sızıntı" },
      { de: "a newspaper", tr: "gazete" },
      { de: "a last resort", tr: "son çare" },
      { de: "protected", tr: "korunan" },
      { de: "a record", tr: "kayıt" },
      { de: "a date", tr: "tarih" },
      { de: "a copy", tr: "suret" },
      { de: "a witness", tr: "tanık" },
      { de: "afterwards", tr: "sonradan" },
    ],
    minutes: 12,
    text:
      "The financial regulator demands that the disclosure be complete. Notice who is demanding, and then notice the last word, because the last word is the whole rule.\n" +
      "„Complete“ is a threshold rather than a direction. A partial disclosure is not a smaller good thing; it is often worse than none, because it is trusted. A reader who has seen four of five numbers believes they have seen the position.\n" +
      "Were it not for the lack of transparency, no reporting office would be needed. That is the supposing, and it is also an admission: the office exists because of a failure and it is a repair rather than a design.\n" +
      "They ask that every whistleblower be heard before the misconduct is buried. Here the order is the rule again, exactly as it was in the unit about a permit. Heard before, not heard after, and the two sentences describe two different countries.\n" +
      "Look at what „buried“ is doing. It is a passive with nobody in it, in a sentence that is otherwise about people, and it is the right choice: burying is usually done by a procedure rather than by a person, and naming one person would make the sentence smaller than the problem.\n" +
      "The practical part of this vocabulary is short and it is about records rather than courage. Write the date. Keep a copy outside the building. Tell one person who is not in the chain, so that there is a witness to the fact that it was said and not only to what was said.\n" +
      "A leak to a newspaper is a last resort and it is protected in fewer countries than people think. An internal report with a date on it is protected in most of them, and it is the document that decides everything afterwards.\n" +
      "None of that is grammar. It is in this unit because the sentences above are the ones a person writes on the worst week of a working life, and they should be written well.",
    questions: [
      {
        text: "What is „complete“?",
        options: ["a threshold", "a direction", "a deadline"],
        answer: 0,
        explain: "„„Complete“ is a threshold rather than a direction.“",
      },
      {
        text: "Why is a partial disclosure often worse?",
        options: ["because it is trusted", "because it is short", "because it is late"],
        answer: 0,
        explain: "„it is often worse than none, because it is trusted.“",
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
        text: "They ask that every whistleblower be heard ___ the misconduct is buried.",
        options: [],
        answer: 0,
        accept: ["before"],
        explain: "„They ask that every whistleblower be heard before the misconduct is buried.“",
      },
      {
        kind: "order",
        text: "Üç satırın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The financial regulator demands that the disclosure be complete.",
          "Were it not for the lack of transparency, no reporting office would be needed.",
          "They ask that every whistleblower be heard before the misconduct is buried.",
          "Write the date and keep a copy outside the building.",
        ],
        explain: "Talep, dayanak, sıra; en sonda işe dönük öğüt.",
      },
      {
        kind: "short_answer",
        text: "Who should you tell?",
        options: [],
        answer: 0,
        accept: ["somebody outside the chain", "one person outside", "a witness"],
        explain: "„Tell one person who is not in the chain…“",
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
    title: "The interest rate debate",
    genre: "dialogue",
    intro: "Politika işliyor ve yine de birine zarar veriyor. Kime?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "particular", tr: "belirli" },
      { de: "either", tr: "ikisinden biri" },
      { de: "defence", tr: "savunma" },
      { de: "spent", tr: "harcadı" },
      { de: "proposed", tr: "önerilen" },
      { de: "a rate", tr: "faiz oranı" },
      { de: "the young", tr: "gençler" },
      { de: "a saver", tr: "tasarruf sahibi" },
      { de: "a borrower", tr: "borçlanan" },
      { de: "a flat", tr: "daire" },
      { de: "a deposit", tr: "peşinat" },
      { de: "time", tr: "zaman" },
      { de: "bought", tr: "satın alınan" },
      { de: "a step", tr: "adım" },
      { de: "later", tr: "sonra" },
      { de: "too late", tr: "çok geç" },
      { de: "a committee", tr: "kurul" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Melis", text: "Much as the monetary policy works, the key interest rate hurts the young. Both halves are true and the second one is almost never in the same paragraph as the first." },
      { speaker: "Arda", text: "Why the young in particular?" },
      { speaker: "Melis", text: "Because they are the borrowers. A saver with a flat already bought is on the other side of every rate, and the average of the two says nothing about either." },
      { speaker: "Arda", text: "So the average hides two directions." },
      { speaker: "Melis", text: "It hides two directions and a deposit. The rate moves the monthly payment, and the deposit is the part that decides who gets in at all." },
      { speaker: "Arda", text: "An expansionary step, albeit restrictive later, buys time." },
      { speaker: "Melis", text: "That is the honest defence of the whole policy and it is worth taking seriously. Time is a real thing to buy, and somebody has to decide what it is spent on." },
      { speaker: "Arda", text: "Who usually decides?" },
      { speaker: "Melis", text: "Nobody, in my experience. The time is bought and then it passes, and the same committee meets again with the same question and a worse starting point." },
      { speaker: "Arda", text: "Albeit countercyclical, the fiscal policy arrives too late." },
      { speaker: "Melis", text: "And that is the second half of the same problem. The design is right and the calendar is wrong, because the measurement that triggers it takes two quarters to arrive." },
      { speaker: "Arda", text: "Could that be fixed?" },
      { speaker: "Melis", text: "With rules that start themselves on a number rather than on a vote. It has been proposed in every decade I have read about and it loses the vote every time." },
    ],
    questions: [
      {
        text: "Why the young in particular?",
        options: ["they are the borrowers", "they are the savers", "they own flats"],
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
        text: "Somebody usually decides what the bought time is spent on.",
        options: ["True", "False"],
        answer: 1,
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
        accept: ["Albeit countercyclical, the fiscal policy arrives too late.", "Albeit countercyclical, the fiscal policy arrives too late"],
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
    title: "Who loses the money",
    genre: "monologue",
    intro: "Bir açık neyi gizliyor? Hangi riski sigortalıyoruz?",
    gloss: [
      { de: "appearing", tr: "görünen" },
      { de: "bulletin", tr: "bülten" },
      { de: "visible", tr: "görünür" },
      { de: "countable", tr: "sayılabilir" },
      { de: "none", tr: "hiçbiri" },
      { de: "objects", tr: "nesneler" },
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
    ],
    minutes: 8,
    segments: [
      { speaker: "Volkan", text: "What the budget deficit does is hide a market failure. A number everybody argues about, standing in front of a thing nobody has named." },
      { speaker: "Volkan", text: "A deficit is the gap between two columns. A market failure is a price that stopped telling the truth about a cost, and the second is what produced the first." },
      { speaker: "Volkan", text: "Arguing about the deficit is arguing about the size of a symptom, and it can be done for ten years without the word „price“ ever appearing." },
      { speaker: "Volkan", text: "Behind the bailout package stands a speculative bubble. The place is in the front slot again and the subject arrives last, which is how a bulletin puts a new thing on the stage." },
      { speaker: "Volkan", text: "The package is visible, dated and countable. The bubble was none of those things while it was growing, and everyone I have met remembers noticing it." },
      { speaker: "Volkan", text: "The systemic risk we insure; the trade deficit we do not. Two objects at the front, and the second half has kept its verb because the two are not parallel." },
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
        options: ["it is a direction", "it is not an event", "it is private"],
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
    title: "In the press release it is a downturn; in the model, stagnation",
    genre: "info",
    intro: "Çerçeve öbeği ve gizlenen başarısızlık.",
    gloss: [
      { de: "dimension", tr: "boyut" },
      { de: "bound", tr: "bağlı" },
      { de: "adjective", tr: "sıfat" },
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
        prompt: "Çerçeve kartını doldur.",
        facts: "Çerçeve iddianın ölçüldüğü boyutu adlandırıyor; başta uyarıyor, sonda düzeltiyor; Almanca boyutu sıfata ya da bileşiğe koyuyor; çerçeve taşınabilir, ek taşınamaz.",
        fields: [
          { label: "What it names", answer: "the dimension", accept: ["a dimension"] },
          { label: "At the front", answer: "it warns", accept: ["a warning"] },
          { label: "At the end", answer: "it corrects", accept: ["a correction"] },
          { label: "In German", answer: "bound to one word", accept: ["an adjective"] },
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
    title: "The financial regulator demands that the disclosure be complete",
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
        tr: "Para politikası ne kadar işlese de politika faizi gençlere zarar veriyor.",
        answer: "Much as the monetary policy works, the key interest rate hurts the young.",
        hint: "İki yarı da doğru; ikincisi aynı paragrafta pek durmuyor.",
      },
      {
        kind: "build",
        tr: "Konjonktür karşıtı olsa da maliye politikası çok geç geliyor.",
        answer: "Albeit countercyclical, the fiscal policy arrives too late.",
        hint: "Tasarım doğru, takvim yanlış.",
      },
    ],
  },
];

import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 15 tüketici hattı: abonelikten çıkış rehberi, bir yemek kutusu
 * aboneliğini iptal etmek için yapılan telefon görüşmesi, haksız ücrete
 * itiraz e-postası. Dil bilgisi bağımlı edatlar — responsible for,
 * depend on, reason for.
 */
export const enB2P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r15",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Getting Out: Canceling a Subscription",
    genre: "guide",
    intro: "Bir tüketici rehberi: bir abonelikten çıkarken nelere bakmalı, ne yazılı olmalı, ücret kesilmeye devam ederse ne yapmalı.",
    gloss: [
      { de: "keen on", tr: "hevesli" },
      { de: "entitled to", tr: "hakkı olan" },
      { de: "notice period", tr: "bildirim süresi" },
      { de: "renewal", tr: "yenileme" },
      { de: "minimum term", tr: "asgari süre" },
      { de: "dispute", tr: "anlaşmazlık" },
      { de: "retention offer", tr: "vazgeçirme teklifi" },
      { de: "statement", tr: "hesap dökümü" },
      { de: "to reverse", tr: "iade etmek" },
      { de: "precise", tr: "net" },
    ],
    minutes: 8,
    text:
      "Getting out: a short guide to canceling subscriptions\n\n" +
      "Signing up for a subscription usually takes one click. Leaving can take considerably " +
      "longer, and companies are not always keen on making it easy. Before you start, it helps " +
      "to know what you are entitled to and what you are not.\n\n" +
      "First, find the terms you agreed to. Look for the notice period, which is how long before " +
      "the renewal date you must cancel, and for any minimum term. A gym membership with a " +
      "twelve-month minimum cannot normally be ended after three months simply because you have " +
      "stopped going, however reasonable that seems.\n\n" +
      "Second, cancel in writing, even if the company invites you to phone. A phone call leaves " +
      "you with nothing to show if the payments continue. An email or a message through your " +
      "account creates a record with a date on it, and the date is what disputes usually depend " +
      "on.\n\n" +
      "Third, expect a retention offer. Many services respond to a cancellation with a discount, " +
      "a free month or a cheaper plan. There is nothing wrong with accepting one if it genuinely " +
      "suits you, but read what you are agreeing to: some offers quietly restart the minimum " +
      "term.\n\n" +
      "Finally, check your bank statement for the next two months. If you are charged after " +
      "canceling, contact the company first and keep a copy of your cancellation. If that " +
      "fails, your bank may be able to reverse the payment, although this is not guaranteed and " +
      "should not be treated as a first step.\n\n" +
      "Above all, stay calm and keep records. The person on the phone is rarely responsible for " +
      "the policy, and is far more likely to help someone who is polite and precise.",
    questions: [
      {
        text: "What should you look for in the terms?",
        options: [
          "the company's phone number",
          "the prices of other plans",
          "the notice period",
        ],
        answer: 2,
        explain: "Yenileme tarihinden ne kadar önce iptal edilmesi gerektiğini gösteren bildirim süresi ve asgari süre.",
      },
      {
        text: "Why does the guide recommend canceling in writing?",
        options: [
          "It is quicker than phoning.",
          "It creates a dated record.",
          "Companies prefer email.",
        ],
        answer: 1,
        explain: "Yazılı iptal tarihli bir kayıt bırakır; anlaşmazlıklar çoğu zaman o tarihe bağlıdır.",
      },
      {
        kind: "truefalse",
        text: "Accepting a retention offer can restart the minimum term.",
        options: ["True", "False"],
        answer: 0,
        explain: "„some offers quietly restart the minimum term“.",
      },
      {
        kind: "gapfill",
        text: "Check your bank statement for the next ___ months.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„check your bank statement for the next two months“.",
      },
      {
        kind: "short_answer",
        text: "Who should you contact first if you are charged after canceling?",
        options: [],
        answer: 0,
        accept: ["the company", "the company first", "company", "the service"],
        explain: "Önce şirkete başvurulmalı; banka yoluyla geri alma ilk adım sayılmamalı.",
      },
      {
        text: "What does the last paragraph advise?",
        options: [
          "being polite and precise",
          "asking for a manager at once",
          "canceling by phone only",
        ],
        answer: 0,
        explain: "Telefondaki kişi politikadan sorumlu değil; nazik ve net olana yardım etmesi daha olası.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l15",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Before You Go, Can We Offer You …",
    genre: "phone",
    intro: "Bir telefon görüşmesi: bir müşteri haftalık yemek kutusu aboneliğini iptal etmek istiyor, temsilci ise bir teklif sunuyor.",
    gloss: [
      { de: "to hold", tr: "hatta beklemek" },
      { de: "to throw away", tr: "çöpe atmak" },
      { de: "every other week", tr: "iki haftada bir" },
      { de: "contract", tr: "sözleşme" },
      { de: "to pause", tr: "dondurmak" },
      { de: "to confirm", tr: "teyit etmek" },
      { de: "portion", tr: "porsiyon" },
      { de: "to launch", tr: "piyasaya sürmek" },
      { de: "settings", tr: "ayarlar" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Agent", text: "Thanks for holding. I understand you'd like to cancel your weekly recipe box. Can I ask what the reason is?" },
      { speaker: "Mr Hale", text: "It's nothing to do with the food, which is fine. We've just realized we throw away about a third of it, because we're rarely home before eight." },
      { speaker: "Agent", text: "That's useful to know. Before you go, we could switch you to a box every other week, at twenty per cent off for the first three months." },
      { speaker: "Mr Hale", text: "Would that change my contract? The last time I accepted a discount somewhere, I found out later that I'd agreed to another year." },
      { speaker: "Agent", text: "No, there's no minimum period on this plan. You can pause or cancel at any time, as long as you do it before Wednesday midnight for the following week." },
      { speaker: "Mr Hale", text: "In that case I'll try it, but I'd like it in writing. Could you send me an email confirming the new price and the fact that there's no minimum term?" },
      { speaker: "Agent", text: "Of course, you'll have it within the hour. I've also noted that you're interested in smaller portions, which we're launching in the spring." },
      { speaker: "Mr Hale", text: "Thanks. And if the new box doesn't work either, I'm assuming I can just cancel online without calling again?" },
      { speaker: "Agent", text: "Yes, there's a button in your account settings. You shouldn't have been told to phone us in the first place; that page is being corrected." },
    ],
    questions: [
      {
        text: "Why does Mr Hale want to cancel?",
        options: [
          "They throw a lot of it away.",
          "The food quality is poor.",
          "The price has gone up.",
        ],
        answer: 0,
        explain: "Yemekten memnun; ama sekizden önce eve gelmedikleri için üçte birini atıyorlar.",
      },
      {
        text: "What does the agent offer him?",
        options: [
          "a free box next month",
          "smaller boxes at full price",
          "a cheaper box every two weeks",
        ],
        answer: 2,
        explain: "İki haftada bir kutu, ilk üç ay yüzde yirmi indirimli.",
      },
      {
        kind: "truefalse",
        text: "The new plan comes with a minimum period of one year.",
        options: ["True", "False"],
        answer: 1,
        explain: "„there's no minimum period on this plan“.",
      },
      {
        kind: "gapfill",
        text: "Changes must be made before ___ midnight for the following week.",
        options: [],
        answer: 0,
        accept: ["Wednesday", "wednesday"],
        explain: "„as long as you do it before Wednesday midnight“.",
      },
      {
        kind: "short_answer",
        text: "What does Mr Hale ask to receive in writing?",
        options: [],
        answer: 0,
        accept: ["an email confirming it", "a confirmation email", "an email", "an email confirming the new price", "a confirmation of the new price", "confirmation of the new price", "the new price", "the new price and no minimum term"],
        explain: "Yeni fiyatı ve asgari süre olmadığını onaylayan bir e-posta istiyor.",
      },
      {
        text: "What does the agent admit at the end?",
        options: [
          "The online button does not work.",
          "He should not have been told to phone.",
          "The smaller portions are canceled.",
        ],
        answer: 1,
        explain: "„You shouldn't have been told to phone us in the first place.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w15",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Charged After Canceling",
    genre: "email",
    intro: "İptal ettiğin bir abonelik için ücret alınmaya devam ediyor: önce iki cümle kur, sonra şirkete net ve kanıtlı bir e-posta yaz.",
    gloss: [
      { de: "refund", tr: "para iadesi" },
      { de: "automatic", tr: "otomatik" },
      { de: "to acknowledge", tr: "teyit etmek" },
      { de: "to process", tr: "işleme koymak" },
      { de: "to settle", tr: "çözmek" },
      { de: "total", tr: "toplam" },
      { de: "consumer", tr: "tüketici" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Sözleşmenin sonunda para iadesi almaya hakkım var.",
        answer: "I am entitled to a refund at the end of the contract.",
        alternatives: ["At the end of the contract, I am entitled to a refund."],
        hint: "„entitled“ sıfatı „to“ edatıyla gelir: entitled to + isim.",
      },
      {
        kind: "build",
        tr: "Aynı ay için iki kez ücretlendirildiğimden şikâyet etmek için yazıyorum.",
        answer: "I am writing to complain about being charged twice for the same month.",
        alternatives: ["I am writing to complain about being charged for the same month twice."],
        hint: "„complain about“ ardından fiil gelirse -ing olur: about being charged.",
      },
      {
        kind: "free",
        prompt:
          "İptal ettiğin bir abonelik için ücret alınmaya devam etti. Şirkete bir e-posta yaz: ne zaman ve nasıl iptal ettiğini söyle, hangi ücretlerin haksız olduğunu belirt, ne istediğini açıkça yaz ve bir sonraki adımını nazikçe bildir.",
        checklist: [
          "Ne zaman ve nasıl iptal ettiğini yaz",
          "Haksız ücretleri tutarıyla belirt",
          "Ne istediğini ve hangi süre içinde istediğini yaz",
          "Bir sonraki adımını nazik ama net biçimde bildir",
        ],
        minWords: 120,
        phrases: [
          { de: "I canceled my subscription on … by …", tr: "Aboneliğimi … tarihinde … yoluyla iptal ettim", en: "" },
          { de: "Despite this, I have been charged for …", tr: "Buna rağmen … için ücret alındı", en: "" },
          { de: "I would therefore like you to …", tr: "Bu nedenle … yapmanızı rica ediyorum", en: "" },
          { de: "I have attached …", tr: "… ekte gönderiyorum", en: "" },
          { de: "If I have not heard from you by …, I will …", tr: "… tarihine kadar sizden haber alamazsam … yapacağım", en: "" },
        ],
        sample:
          "Dear Customer Services, I am writing to complain about being charged twice after " +
          "canceling my membership, and to ask for both payments to be refunded. " +
          "I canceled my subscription on 3 March by email, as your terms require, and received an " +
          "automatic reply confirming that my request had arrived. My notice period was one month, " +
          "so I accepted the payment taken on 1 April. " +
          "Despite this, I have been charged for May and June as well, a total of fifty-eight " +
          "euros. I am not responsible for your system failing to process a cancellation that you " +
          "acknowledged in writing. " +
          "I would therefore like you to refund both payments within fourteen days and to confirm " +
          "that my account has been closed. I have attached a copy of my original email and of " +
          "your automatic reply. " +
          "If I have not heard from you by 30 June, I will ask my bank to reverse the payments and " +
          "report the matter to a consumer organization. I would much prefer to settle it with you " +
          "directly. " +
          "Yours faithfully, Daniel Ferreira",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s15",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Leaving Be as Easy as Joining?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: şirketlerin gerekçesini hakkıyla ver ve zor çıkışın bedelini kimin ödediğini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir abonelikten çıkmak, ona girmek kadar kolay olmak zorunda mı? Konumunu söyle, şirketlerin gerekçesini hakkıyla ver, zor çıkışın bedelini kimin ödediğini söyle ve bir kural öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Şirketlerin gerekçesini hakkıyla ver",
        "Zor çıkışın bedelini kimin ödediğini söyle",
        "Bir kural öner",
      ],
      targets: [
        { de: "I think the rule should be simple: …", tr: "Bence kural basit olmalı: …" },
        { de: "To be fair to the companies, …", tr: "Şirketlere haksızlık etmemek için söyleyeyim, …" },
        { de: "In practice, the people who lose out are …", tr: "Pratikte kaybeden kişiler …" },
        { de: "What I'd like to see is a rule that …", tr: "Görmek istediğim şey … bir kural" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I think the rule should be simple: if you can join with one click, you should be able to " +
        "leave with one click. Anything else is a fee you pay in time instead of money. " +
        "To be fair to the companies, there are reasons for some friction. A short conversation " +
        "can catch people who are canceling by mistake or who would genuinely prefer a cheaper " +
        "plan, and an offer to stay isn't a trick in itself. Some customers are glad to be asked. " +
        "The problem starts when the process is designed to be tiring. In practice, the people " +
        "who lose out are the ones with the least spare attention: people working shifts, people " +
        "caring for a relative, older customers who find phone menus stressful. They keep paying " +
        "for months, not because they have chosen to, but because leaving takes an evening they " +
        "don't have. " +
        "What I'd like to see is a rule that canceling must use the same channel as joining, and " +
        "that any offer made on the way out appears on one screen, with a visible button to " +
        "refuse it. Companies can still try to keep their customers; they just have to do it " +
        "in the open.",
      rubricHint:
        "Karşı tarafın gerekçesini adil anlatma, bedeli ödeyen kesimi adlandırma ve uygulanabilir bir kural beklenir; „to be fair to“ ve „the people who lose out“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g15",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "responsible for, depend on, reason for",
    genre: "grammar",
    intro: "Birçok sıfat, fiil ve isim kendi edatıyla gelir; edat anlamdan tahmin edilmez, kalıpla öğrenilir.",
    focus: "Bağımlı edatlar: sıfat, fiil ve isimden sonra gelen sabit edatlar",
    gloss: [
      { de: "responsible", tr: "sorumlu" },
      { de: "to depend", tr: "bağlı olmak" },
      { de: "to apply", tr: "başvurmak" },
      { de: "refund", tr: "para iadesi" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Sıfat + edat",
        tr: "Bazı sıfatlar belirli bir edatla kalıplaşmıştır: „responsible for“, „aware of“, „keen on“, „entitled to“, „satisfied with“. Türkçedeki hâl ekleri yol göstermez: „-den sorumlu“ İngilizcede „for“ alır, „from“ değil.",
        examples: [
          { de: "Who is responsible for the policy?", tr: "Politikadan kim sorumlu?", note: "responsible for" },
          { de: "Were you aware of the minimum term?", tr: "Asgari süreden haberin var mıydı?", note: "aware of" },
          { de: "She isn't keen on long contracts.", tr: "Uzun sözleşmelere pek hevesli değil.", note: "keen on" },
        ],
      },
      {
        heading: "Fiil + edat",
        tr: "„depend on“, „apply for“, „complain about“, „insist on“ gibi fiillerde edat fiilin parçasıdır. Edattan sonra bir fiil gelirse -ing biçimini alır: „complain about being charged“, „insist on speaking to a manager“.",
        examples: [
          { de: "The price depends on the length of the contract.", tr: "Fiyat sözleşmenin süresine bağlı.", note: "depend on" },
          { de: "I'd like to apply for a refund.", tr: "Para iadesi için başvurmak istiyorum.", note: "apply for" },
          { de: "He insisted on speaking to a manager.", tr: "Bir yöneticiyle konuşmakta ısrar etti.", note: "edat + -ing" },
        ],
      },
      {
        heading: "İsim + edat",
        tr: "İsimlerin de edatı vardır ve ilgili fiilinkinden farklı olabilir: „a reason for“, „an increase in“, „a solution to“. Artış ve düşüşte „in“ NEYİN değiştiğini, „of“ NE KADAR değiştiğini söyler: „an increase of ten per cent“.",
        examples: [
          { de: "What was the reason for the charge?", tr: "Ücretin sebebi neydi?", note: "reason for" },
          { de: "There has been an increase in complaints.", tr: "Şikâyetlerde artış oldu.", note: "increase in" },
          { de: "We need a solution to this problem.", tr: "Bu soruna bir çözüm lazım.", note: "solution to" },
        ],
      },
    ],
    questions: [
      {
        text: "Who is responsible ___ the new policy?",
        options: ["of", "for", "to"],
        answer: 1,
        explain: "„responsible“ „for“ edatıyla gelir.",
      },
      {
        text: "He insisted ___ speaking to a manager.",
        options: ["on", "to", "for"],
        answer: 0,
        explain: "„insist on“ kalıbı sabittir ve ardından -ing gelir.",
      },
      {
        text: "Which is correct?",
        options: [
          "I'm writing to complain about charge twice.",
          "I'm writing to complain for being charged twice.",
          "I'm writing to complain about being charged twice.",
        ],
        answer: 2,
        explain: "„complain about“ ve edattan sonra fiil -ing biçimini alır.",
      },
      {
        kind: "gapfill",
        text: "The price depends ___ the length of the contract.",
        options: [],
        answer: 0,
        accept: ["on", "upon"],
        explain: "„depend on“ kalıbı sabittir.",
      },
      {
        kind: "gapfill",
        text: "I'd like to apply ___ a refund.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Bir şey için başvurmak „apply for“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "There has been an increase ___ complaints.",
        options: [],
        answer: 0,
        accept: ["in"],
        explain: "Neyin arttığını „an increase in“ söyler.",
      },
      {
        kind: "gapfill",
        text: "Were you aware ___ the minimum term?",
        options: [],
        answer: 0,
        accept: ["of"],
        explain: "„aware“ „of“ edatıyla gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We need", "a solution", "to", "this problem"],
        explain: "„a solution to“ isim + edat kalıbıdır.",
      },
      {
        kind: "truefalse",
        text: "„She isn't keen on long contracts.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„keen“ „on“ edatıyla gelir.",
      },
      {
        kind: "truefalse",
        text: "„I'm entitled for a refund.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„entitled“ „to“ edatıyla gelir: „I'm entitled to a refund.“",
      },
    ],
  },
];

import type { ModuleExamPlan } from "../types";

/**
 * İNGİLİZCE kursun C1 modül sınavları (10 modül).
 *
 * Alan adları ve `en` alanının gerekçesi kardeş dosyada: `./a1.ts` başlığı.
 *
 * C1'de sınavın sorduğu soru değişiyor. A1–B1'de "ne yazıyor", B2'de "ne
 * demeye getiriyor" soruluyordu; C1'de "bunu neden BÖYLE söyledi" soruluyor.
 * Metinler artık bilgi ya da duruş değil ÜSLUP taşıyor: bir basın
 * açıklamasının failsizliği, bir sözleşme maddesinin bağlayıcılığı, bir
 * okur yorumunun ölçülülüğü, bir yan cümlenin kattığı sitem. Okuma
 * sorularının en az biri her kâğıtta doğrudan bunu hedefliyor.
 *
 * Yazma görevleri 110 kelimeden başlıyor: C1'de bir metnin iş görmesi için
 * yalnızca bilgi değil kuruluş da gerekiyor — giriş, gerekçe, çekince,
 * öneri, kapanış.
 *
 * TEMALAR DERSLERİN KENDİSİNDEN. İki kursun C1 müfredatı ayrışıyor: Almanca
 * C1.3 "Retorik ve sunum sanatı", İngilizce C1.3'ün on dersi ise hukuk ve
 * sözleşme dili. Kâğıdın ölçtüğü şey modülün KENDİSİ olmak zorunda olduğu
 * için `titleTr` derslerin gerçek temasını söylüyor.
 *
 * Bu kâğıtlar yazıldığında Patika'nın ünite kartı hâlâ tek bir seviye
 * listesini basıyordu, yani on ünitede de Almanca dersin adını. 2026-09-21'de
 * `MODULE_THEMES` kursa göre bölündü ve İngilizce C1 temaları buradaki
 * `titleTr` satırlarıyla aynı dersleri anlatıyor — ikisi birlikte değişir.
 */
export const EN_C1_EXAMS: ModuleExamPlan[] = [
  {
    level: "C1",
    index: 0,
    code: "C1.1",
    titleDe: "Register and tone",
    titleTr: "Üslup ve dil düzeyi",
    focus: [
      { de: "Register shift", tr: "aynı şeyi üç ayrı tonda söylemek" },
      { de: "Ellipsis and substitution", tr: "söylenmeyeni bırakmak" },
      { de: "Fronting and end-weight", tr: "ağırlığı sona atmak" },
      { de: "Reporting verbs and evaluation", tr: "hükmü aktarma fiili taşır" },
      { de: "Understatement", tr: "ölçülü söyleyerek fazlasını demek" },
    ],
    canDo: [
      { de: "I can say the same thing in three registers and choose one.", tr: "Aynı şeyi üç ayrı dil düzeyinde söyleyip birini seçebiliyorum.", en: "I can say the same thing in three registers and choose one." },
      { de: "I can leave a word out where the register asks for it.", tr: "Dil düzeyi gerektirdiğinde bir sözcüğü söylemeden bırakabiliyorum.", en: "I can leave a word out where the register asks for it." },
      { de: "I can move the weight of a sentence to its end.", tr: "Cümlenin ağırlığını sonuna taşıyabiliyorum.", en: "I can move the weight of a sentence to its end." },
      { de: "I can carry a verdict in the reporting verb itself.", tr: "Hükmü aktarma fiilinin kendisinde taşıyabiliyorum.", en: "I can carry a verdict in the reporting verb itself." },
      { de: "I can criticize through understatement.", tr: "Ölçülü ifadeyle eleştirebiliyorum.", en: "I can criticize through understatement." },
    ],
    listening: {
      title: "How shall we word it?",
      titleTr: "Nasıl yazalım?",
      situation: "Bir yönetim toplantısında aynı kararın nasıl yazılacağı tartışılıyor.",
      turns: [
        { speaker: "Chair", de: "We agree on the matter. What remains is the wording, and the wording is not a detail.", tr: "Konuda anlaşıyoruz. Kalan şey ifade ve ifade bir ayrıntı değil." },
        { speaker: "Ms. Neuhaus", de: "A cordial note and a matter-of-fact note say the same thing; the salutation alone sets the register.", tr: "Sıcak bir not ile kuru bir not aynı şeyi söyler; dil düzeyini tek başına hitap belirler." },
        { speaker: "Mr. Wolf", de: "Quoted verbatim, the second line reads like a reproach. I would put the weight at the end.", tr: "Birebir alıntılandığında ikinci satır sitem gibi okunuyor. Ağırlığı sona koyardım." },
        { speaker: "Chair", de: "Into the sentence creeps a connotation nobody intended. Granted, the figure is high, albeit explicable.", tr: "Cümleye kimsenin istemediği bir yan anlam sızıyor. Doğrusu rakam yüksek, gerekçesi olsa da." },
        { speaker: "Ms. Neuhaus", de: "Then we concede the point rather than gloss it over. He claimed it; she conceded it — the verb carries the verdict.", tr: "O hâlde noktayı geçiştirmek yerine kabul ediyoruz. O iddia etti, öteki kabul etti — hükmü fiil taşıyor." },
        { speaker: "Mr. Wolf", de: "Not exactly cheap, that solution. I wouldn't say no to a less patronizing tone either.", tr: "Ucuz sayılmaz o çözüm. Daha az tepeden bir ton da fena olmazdı." },
        { speaker: "Chair", de: "Such composure is rare. Let the draft stand as it is; the latter reading leaves an unease I can live with.", tr: "Böyle bir soğukkanlılık nadirdir. Taslak böyle kalsın; ikinci okuma bir tedirginlik bırakıyor ama katlanabilirim." },
      ],
      questions: [
        { de: "What, according to Ms. Neuhaus, sets the register?", tr: "Bayan Neuhaus'a göre dil düzeyini ne belirliyor?", options: ["The salutation alone", "The length of the note", "The figure in the second line", "The name of the sender"], answer: 0 },
        { de: "Why does Mr. Wolf want to move the weight to the end?", tr: "Bay Wolf ağırlığı neden sona taşımak istiyor?", options: ["The line reads like a reproach as it stands", "The sentence is too long", "The figure must come first", "The salutation is missing"], answer: 0 },
        { de: "What does “Not exactly cheap, that solution” actually say?", tr: "„Not exactly cheap, that solution“ aslında ne diyor?", options: ["It is expensive, said with understatement", "The price is unknown", "The solution is acceptable", "The cost was already agreed"], answer: 0 },
      ],
    },
    reading: {
      title: "Statement on the interruption of 14 March",
      titleTr: "Şirket açıklaması",
      genre: "Basın açıklaması",
      text: "STATEMENT ON THE INTERRUPTION OF 14 MARCH\n\nThe interruption of our service is deeply regretted. According to present knowledge the cause was a technical omission in one subsystem; personal data, on the basis of the checks carried out so far, were not affected.\n\nImmediately after the matter became known, the necessary measures were initiated. The service in question has been available again since the evening of the same day. The review of the incident is ongoing; an external firm has been commissioned.\n\nOur spokesperson stated that the results would be published in full. Customers who have suffered a loss can turn to the hotline that has been set up.\n\nWe take the incident as an occasion to examine our processes, and we will inform you again before the end of the month. Not exactly a comfortable week, this one — but a useful one.",
      questions: [
        { de: "What does the text say about personal data?", tr: "Metin kişisel veriler hakkında ne diyor?", options: ["They were not affected according to the checks so far", "They were lost", "They were deleted", "Nothing is said about them"], answer: 0 },
        { de: "Why does the text say “the necessary measures were initiated” instead of “we acted”?", tr: "Metin neden „we acted“ yerine „the necessary measures were initiated“ diyor?", options: ["The action matters more than the actor in this register", "Nobody acted", "It is shorter", "It is a mistake in the draft"], answer: 0 },
        { de: "What does the last sentence add to the statement?", tr: "Son cümle açıklamaya ne katıyor?", options: ["An understatement that admits more than it says", "A new fact about the cause", "A legal reservation", "A promise of compensation"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Aynı kararı iki ayrı dil düzeyinde söylüyorsun.", de: "Formally: the request is declined. Between us: I wouldn't say no to a second look.", tr: "Resmî hâli: talep reddedildi. Aramızda: ikinci bir bakışa itirazım olmaz." },
      { situation: "Ölçülü bir ifadeyle eleştiriyorsun.", de: "Not exactly a convincing draft, and hardly the tone we agreed on.", tr: "İkna edici bir taslak sayılmaz, hem üzerinde anlaştığımız ton da değil." },
    ],
    writing: {
      prompt: "Bir aksaklık hakkında kurumsal bir açıklama yaz.",
      stimulus: "Our system was down for six hours and nobody has explained why.",
      checklist: [
        "Olayı failsiz bir dille bildir („the interruption is regretted“)",
        "Bilinen sebebi ve bilinmeyeni ayır",
        "Ne yapıldığını edilgen yapıyla say",
        "Bir aktarma fiiliyle sözcüyü konuştur („our spokesperson stated that …“)",
        "Ölçülü bir kapanış cümlesi yaz",
      ],
      minWords: 110,
      phrases: [
        { de: "The interruption is deeply regretted.", tr: "Kesinti için derin üzüntü duyuluyor", en: "The interruption is deeply regretted." },
        { de: "According to present knowledge …", tr: "Şimdiki bilgiye göre …", en: "According to present knowledge …" },
        { de: "The necessary measures were initiated.", tr: "Gerekli tedbirler alındı", en: "The necessary measures were initiated." },
        { de: "Our spokesperson stated that …", tr: "Sözcümüz …-i belirtti", en: "Our spokesperson stated that …" },
        { de: "We will inform you again before …", tr: "…-den önce sizi yeniden bilgilendireceğiz", en: "We will inform you again before …" },
      ],
      sample:
        "STATEMENT ON THE OUTAGE OF 2 JUNE\n\nThe interruption of our service is deeply regretted. According to present knowledge the cause lay in one subsystem; what cannot yet be said is whether a second component contributed.\n\nImmediately after the matter became known, the necessary measures were initiated and the service was restored the same evening. The review is ongoing, and an external firm has been commissioned to repeat the checks.\n\nOur spokesperson stated that the findings would be published in full. Customers who have suffered a loss are asked to turn to the hotline that has been set up.\n\nWe take the incident as an occasion to examine our processes. Not exactly a week we would choose again — and a report will follow before the end of the month.",
    },
  },

  {
    level: "C1",
    index: 1,
    code: "C1.2",
    titleDe: "Dissent without rupture",
    titleTr: "Tartışma ve karşı çıkma",
    focus: [
      { de: "Concessive range", tr: "granted / albeit / much as" },
      { de: "Reporting verbs in argument", tr: "postulates / refutes / substantiates" },
      { de: "Irony in dispute", tr: "iğneli cevap ve sınırı" },
      { de: "Subjunctive in motions", tr: "We move that the board grant …" },
      { de: "Cohesion across an argument", tr: "uzun bir savı bağlamak" },
    ],
    canDo: [
      { de: "I can disagree without breaking the relationship.", tr: "İlişkiyi koparmadan karşı çıkabiliyorum.", en: "I can disagree without breaking the relationship." },
      { de: "I can quote an opponent fairly and still refute them.", tr: "Rakibi adil aktarıp yine de çürütebiliyorum.", en: "I can quote an opponent fairly and still refute them." },
      { de: "I can judge when irony helps and when it damages.", tr: "İroninin nerede yardım ettiğini, nerede zarar verdiğini kestirebiliyorum.", en: "I can judge when irony helps and when it damages." },
      { de: "I can put a motion in the formal register.", tr: "Bir önergeyi resmî üslupta yazabiliyorum.", en: "I can put a motion in the formal register." },
      { de: "I can hold a long argument together.", tr: "Uzun bir savı bir arada tutabiliyorum.", en: "I can hold a long argument together." },
    ],
    listening: {
      title: "The barbed reply",
      titleTr: "İğneleyici cevap",
      situation: "Bir panelde iki konuşmacı bir öneriyi tartışıyor.",
      turns: [
        { speaker: "Presenter", de: "You called the proposal irreversible. Your colleague postulates the opposite.", tr: "Öneriyi geri dönülemez diye adlandırdınız. Meslektaşınız tam tersini savunuyor." },
        { speaker: "Author", de: "She postulates it; she does not substantiate it. Granted, there is little leeway, albeit some.", tr: "Savunuyor ama temellendirmiyor. Doğrusu manevra alanı az, ama yine de var." },
        { speaker: "Researcher", de: "Not exactly a generous reading, is it? I wouldn't call the figures a doctrine.", tr: "Cömert bir okuma sayılmaz, değil mi? Rakamlara doktrin demezdim." },
        { speaker: "Author", de: "Much as I acknowledge the snag, the plan stays viable. What the debate does is polarize.", tr: "Pürüzü kabul etsem de plan uygulanabilir kalıyor. Bu tartışmanın yaptığı şey kutuplaştırmak." },
        { speaker: "Researcher", de: "Then let us keep it at the argument. To report a claim is not to falsify it.", tr: "O hâlde meseleyi savda tutalım. Bir iddiayı aktarmak onu çürütmek değildir." },
        { speaker: "Presenter", de: "So we move that the committee grant a second hearing before the vote?", tr: "Yani oylamadan önce komitenin ikinci bir oturum tanımasını mı öneriyoruz?" },
        { speaker: "Author", de: "We do. Were it not for the deadline, I would ask for a written reply as well.", tr: "Öneriyoruz. Süre olmasaydı yazılı bir cevap da isterdim." },
      ],
      questions: [
        { de: "What is the author's objection to the colleague's claim?", tr: "Yazarın meslektaşın savına itirazı ne?", options: ["She does not substantiate it", "She never made it", "She quoted it wrongly", "She agreed too quickly"], answer: 0 },
        { de: "What does “Not exactly a generous reading, is it?” do in this exchange?", tr: "„Not exactly a generous reading, is it?“ bu konuşmada ne yapıyor?", options: ["It criticizes through irony without an open attack", "It accepts the reading", "It asks a factual question", "It ends the debate"], answer: 0 },
        { de: "What is finally proposed?", tr: "Sonunda ne öneriliyor?", options: ["That the committee grant a second hearing", "That the vote be canceled", "That the figures be published", "That the deadline be moved"], answer: 0 },
      ],
    },
    reading: {
      title: "On the pleasure of being refuted",
      titleTr: "Deneme yazısı",
      genre: "Deneme yazısı",
      text: "ON THE PLEASURE OF BEING REFUTED\n\nA debate that nobody loses is not a debate. Granted, the claim sounds like a platitude, albeit one we ignore whenever a committee meets.\n\nWhat a manifesto assumes, an ideology rarely states. The doctrine is left in the room like furniture: everyone walks around it, nobody moves it. Much as I admire the dialectic of the class, the habit ends at the door of the supervisory board, where dissent is read as disloyalty.\n\nOne speaker postulates; another refutes; a third merely affirms and is thanked for the contribution. To resign oneself is to forfeit the argument, and to forfeit the argument is to keep the room quiet at the price of keeping it wrong.\n\nNot exactly a comfortable doctrine, this one. It asks that every claim be open to a counterstatement, including the claim I have just made. What holds the chain of argument together is not the strength of the first link but the willingness to test the last.",
      questions: [
        { de: "What does the writer say happens to a doctrine in the room?", tr: "Yazara göre odadaki doktrine ne oluyor?", options: ["Everyone walks around it and nobody moves it", "It is refuted at once", "It is written into the minutes", "It is quoted by the board"], answer: 0 },
        { de: "What is the cost of resigning oneself, according to the text?", tr: "Metne göre boyun eğmenin bedeli ne?", options: ["The room stays quiet but wrong", "The debate becomes too long", "The speaker loses the vote", "The doctrine is forgotten"], answer: 0 },
        { de: "Why does the writer add “including the claim I have just made”?", tr: "Yazar neden „including the claim I have just made“ ekliyor?", options: ["To apply the rule to the essay itself", "To withdraw the argument", "To quote an opponent", "To soften a personal attack"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Kırmadan karşı çıkıyorsun.", de: "Much as I acknowledge the snag, the plan stays viable — granted, with less leeway than we hoped.", tr: "Pürüzü kabul etsem de plan uygulanabilir kalıyor — doğrusu umduğumuzdan az manevra alanıyla." },
      { situation: "Bir önergeyi resmî üslupta söylüyorsun.", de: "We move that the committee grant a second hearing before the vote is taken.", tr: "Oylama yapılmadan önce komitenin ikinci bir oturum tanımasını öneriyoruz." },
    ],
    writing: {
      prompt: "Bir öneriye karşı çıkan ama kapıyı kapatmayan bir katkı yaz.",
      checklist: [
        "Karşı tarafın savını adil aktar („X postulates that …“)",
        "Bir ödün ver („Granted, …, albeit …“)",
        "Kendi savını temellendir",
        "Bir önergeyle ya da somut bir istekle kapat",
        "İroniyi en çok bir kez ve ölçülü kullan",
      ],
      minWords: 110,
      phrases: [
        { de: "X postulates that …; the substantiation is missing.", tr: "X …-i savunuyor; temellendirme eksik", en: "X postulates that …; the substantiation is missing." },
        { de: "Granted, …, albeit …", tr: "Doğrusu …, olsa da …", en: "Granted, …, albeit …" },
        { de: "Much as I acknowledge …, the plan stays …", tr: "…-i kabul etsem de plan … kalıyor", en: "Much as I acknowledge …, the plan stays …" },
        { de: "To report a claim is not to falsify it.", tr: "Bir iddiayı aktarmak onu çürütmek değildir", en: "To report a claim is not to falsify it." },
        { de: "We move that the committee grant …", tr: "Komitenin … tanımasını öneriyoruz", en: "We move that the committee grant …" },
      ],
      sample:
        "A CONTRIBUTION TO THE DEBATE ON THE NEW RULE\n\nThe chair postulates that the rule is irreversible; the substantiation, however, is missing from the paper. Granted, the timetable is tight, albeit not as tight as the third paragraph suggests.\n\nMuch as I share the aim, the instrument stays questionable. What the rule does is standardize a decision that two departments make differently for good reasons, and to call that difference a flaw is to refute a claim nobody has made.\n\nTo report an objection is not to obstruct a vote. I would therefore ask that the paper be read once more against the figures of March rather than those of last year.\n\nWe move that the committee grant a second hearing before the vote is taken. Not exactly a dramatic request — and, I hope, a modest one.",
    },
  },

  {
    level: "C1",
    index: 2,
    code: "C1.3",
    titleDe: "Legal and contract language",
    titleTr: "Hukuk ve sözleşme dili",
    focus: [
      { de: "Subjunctive in petitions", tr: "We request that the office register …" },
      { de: "Register shift in legal texts", tr: "aynı olay üç metinde" },
      { de: "Reporting verbs in testimony", tr: "stated / conceded / alleged" },
      { de: "Settled legal collocations", tr: "yerleşik hukuk kalıpları" },
      { de: "Ellipsis in legal reading", tr: "maddede geçmeyeni okumak" },
    ],
    canDo: [
      { de: "I can write a petition in the register that is expected.", tr: "Bir dilekçeyi beklenen üslupta yazabiliyorum.", en: "I can write a petition in the register that is expected." },
      { de: "I can tell what a clause binds and what it leaves open.", tr: "Bir maddenin neyi bağladığını, neyi açık bıraktığını ayırabiliyorum.", en: "I can tell what a clause binds and what it leaves open." },
      { de: "I can report testimony with the right verb.", tr: "Tanık ifadesini doğru fiille aktarabiliyorum.", en: "I can report testimony with the right verb." },
      { de: "I can appeal against a decision within the period.", tr: "Bir karara süresi içinde itiraz edebiliyorum.", en: "I can appeal against a decision within the period." },
      { de: "I can say why irony has no place in a ruling.", tr: "Bir kararda ironinin neden yeri olmadığını söyleyebiliyorum.", en: "I can say why irony has no place in a ruling." },
    ],
    listening: {
      title: "Before the limitation period ends",
      titleTr: "Zamanaşımı dolmadan",
      situation: "Bir başvuru sahibi ile bir görevli itiraz süresini konuşuyor.",
      turns: [
        { speaker: "Officer", de: "The notice of right to appeal was served on 3 April. The cut-off period runs for one month.", tr: "İtiraz hakkı bildirimi 3 Nisanda tebliğ edildi. Kesin süre bir ay işliyor." },
        { speaker: "Visitor", de: "Then we request that the office register the appeal before the limitation period ends.", tr: "O hâlde zamanaşımı dolmadan idarenin itirazı kaydetmesini talep ediyoruz." },
        { speaker: "Officer", de: "It can be lodged, albeit only with a power of attorney. Without it the appeal is inadmissible.", tr: "Kaydedilebilir, ama yalnızca vekâletnameyle. Onsuz itiraz kabul edilemez." },
        { speaker: "Visitor", de: "The witness stated that the file had been complete; the office merely alleged the opposite.", tr: "Tanık dosyanın tam olduğunu ifade etti; idare ise tersini yalnızca iddia etti." },
        { speaker: "Officer", de: "Those are two different verbs, and in a ruling the difference is the whole case.", tr: "Bunlar iki ayrı fiil ve bir kararda bu fark davanın tamamıdır." },
        { speaker: "Visitor", de: "Granted. Much as we welcome the expert report, it does not name the administrative decision.", tr: "Doğrusu öyle. Bilirkişi raporunu ne kadar olumlu bulsak da idari kararı adlandırmıyor." },
        { speaker: "Officer", de: "Then the revocation stays open. Were it not for the service of documents, we would have no date at all.", tr: "O hâlde geri alma açık kalıyor. Tebligat olmasaydı hiç tarihimiz olmazdı." },
      ],
      questions: [
        { de: "What makes the appeal inadmissible?", tr: "İtirazı kabul edilemez kılan ne?", options: ["A missing power of attorney", "A late expert report", "The witness statement", "The revocation"], answer: 0 },
        { de: "Why does the officer insist on the difference between “stated” and “alleged”?", tr: "Görevli „stated“ ile „alleged“ arasındaki farkta neden ısrar ediyor?", options: ["In a ruling the choice of verb decides the case", "Both verbs are wrong here", "The witness used neither", "The office prefers shorter words"], answer: 0 },
        { de: "What does the expert report fail to do?", tr: "Bilirkişi raporu neyi yapmıyor?", options: ["It does not name the administrative decision", "It does not mention the date", "It contradicts the witness", "It was never served"], answer: 0 },
      ],
    },
    reading: {
      title: "Clause 7 — termination and its limits",
      titleTr: "Sözleşme metni",
      genre: "Sözleşme metni",
      text: "CLAUSE 7 — TERMINATION AND ITS LIMITS\n\n7.1 The contracting party may terminate this agreement in writing, subject to a cut-off period of one month to the end of a calendar month. Service of documents by electronic means is deemed sufficient.\n\n7.2 The right of revocation under 7.1 shall remain unaffected by an administrative decision of the supervisory office. Where a decree is issued, the party concerned shall be heard beforehand.\n\n7.3 Enforcement proceedings are excluded until the limitation period has expired. A claim lodged after that date is inadmissible.\n\n7.4 Should a provision of this agreement be or become void, the remaining provisions shall remain binding.\n\nNote for the reader: 7.2 states who shall be heard; it does not state within what period. Nor is the arbitration board mentioned anywhere in this clause — a silence that the consumer protection office has criticized twice.",
      questions: [
        { de: "What is the notice requirement under 7.1?", tr: "7.1'e göre bildirim koşulu ne?", options: ["Writing, with one month to the end of the month", "Writing, with no period", "Electronic service only", "A hearing before the office"], answer: 0 },
        { de: "What happens to the other provisions if one becomes void?", tr: "Bir hüküm geçersiz olursa öteki hükümlere ne olur?", options: ["They remain binding", "The whole agreement ends", "They must be renewed", "They are suspended for a month"], answer: 0 },
        { de: "What is the point of the note for the reader?", tr: "Okura düşülen notun vurgusu ne?", options: ["It names two things the clause leaves unsaid", "It corrects a mistake in 7.3", "It adds a new obligation", "It quotes the arbitration board"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir dilekçeyi resmî üslupta söylüyorsun.", de: "We request that the office register the appeal before the cut-off period expires.", tr: "Kesin süre dolmadan idarenin itirazı kaydetmesini talep ediyoruz." },
      { situation: "Bir maddenin sessiz kaldığı yeri gösteriyorsun.", de: "The clause states who shall be heard; it does not state within what period.", tr: "Madde kimin dinleneceğini söylüyor; hangi süre içinde olduğunu söylemiyor." },
    ],
    writing: {
      prompt: "Reddedilen bir talep için itiraz dilekçesi yaz.",
      stimulus: "Your claim is rejected; the limitation period expired on 30 April.",
      checklist: [
        "Dosya numarasıyla ve resmî hitapla başla",
        "Dilek kipiyle talebini koy („We request that …“)",
        "Olguları aktarma fiilleriyle ayır („stated“, „alleged“, „conceded“)",
        "Bir maddenin sessiz kaldığı yeri göster",
        "Süreyi ve sonraki adımı yaz",
      ],
      minWords: 110,
      phrases: [
        { de: "We request that the office …", tr: "İdarenin … yapmasını talep ediyoruz", en: "We request that the office …" },
        { de: "The witness stated that …, whereas the office alleged …", tr: "Tanık …-i ifade etti, idare ise …-i iddia etti", en: "The witness stated that …, whereas the office alleged …" },
        { de: "The cut-off period runs from the service of documents.", tr: "Kesin süre tebligattan itibaren işler", en: "The cut-off period runs from the service of documents." },
        { de: "The clause does not state within what period.", tr: "Madde hangi süre içinde olduğunu söylemiyor", en: "The clause does not state within what period." },
        { de: "The right of revocation shall remain unaffected.", tr: "Geri alma hakkı etkilenmeden kalır", en: "The right of revocation shall remain unaffected." },
      ],
      sample:
        "NOTICE OF APPEAL — FILE 2026/318\n\nDear Sir or Madam,\n\nWe request that the office reconsider the decision of 2 May, by which the claim was rejected for expiry of the limitation period.\n\nThe period runs from the service of documents. Service was effected on 3 April, not on 28 March: the electronic receipt in the file carries the later date. The witness stated that the folder had been complete on that day, whereas the office merely alleged the opposite; the expert report neither confirms nor contests it.\n\nClause 7.2 states who shall be heard before a decree is issued; it does not state within what period. Nor is the arbitration board mentioned at all.\n\nWe therefore request that the claim be heard on the merits. The right of revocation shall remain unaffected.\n\nYours sincerely,\nA. Demir",
    },
  },

  {
    level: "C1",
    index: 3,
    code: "C1.4",
    titleDe: "Literature and interpretation",
    titleTr: "Edebiyat ve yorum",
    focus: [
      { de: "Register: spoken and written", tr: "günlük dil ile yazı dili" },
      { de: "Fronting in narrative", tr: "anlatıcının yerini belirlemek" },
      { de: "Reporting verbs in interpretation", tr: "contextualizes / deciphers / dissects" },
      { de: "Ellipsis in poetic language", tr: "şiirin eksilttiği" },
      { de: "Concession in reading", tr: "albeit / much as ile yorum farkı" },
    ],
    canDo: [
      { de: "I can tell a spoken register from a written one.", tr: "Konuşma dilini yazı dilinden ayırabiliyorum.", en: "I can tell a spoken register from a written one." },
      { de: "I can say where the narrator stands in a text.", tr: "Bir metinde anlatıcının nerede durduğunu söyleyebiliyorum.", en: "I can say where the narrator stands in a text." },
      { de: "I can report an interpretation without adopting it.", tr: "Bir yorumu benimsemeden aktarabiliyorum.", en: "I can report an interpretation without adopting it." },
      { de: "I can read what a text leaves out.", tr: "Bir metnin söylemediğini okuyabiliyorum.", en: "I can read what a text leaves out." },
      { de: "I can hold a long essay together.", tr: "Uzun bir denemeyi bir arada tutabiliyorum.", en: "I can hold a long essay together." },
    ],
    listening: {
      title: "Two readings of the same page",
      titleTr: "Aynı sayfanın iki okuması",
      situation: "Bir derste iki yorum çatışıyor.",
      turns: [
        { speaker: "Lecturer", de: "Where does the narrator stand here? Into the novella creeps a monologue nobody announces.", tr: "Anlatıcı burada nerede duruyor? Uzun öyküye kimsenin duyurmadığı bir iç konuşma sızıyor." },
        { speaker: "Author", de: "She contextualizes the scene; I would rather decipher it. The topos we know; the canon we argue about.", tr: "O sahneyi bağlamına yerleştiriyor; ben daha çok çözmek isterim. Klişeyi biliyoruz; kanonu tartışıyoruz." },
        { speaker: "Critic", de: "Much as we like to call it strangeness, it is really otherness — and the difference is the whole reading.", tr: "Ona ne kadar yabancılık demeyi sevsek de aslında bu ötekilik — ve bu fark okumanın tamamıdır." },
        { speaker: "Lecturer", de: "The poem is fragmentary; the reader, contemplative. What is left out does the work here.", tr: "Şiir parçalı; okur ise dalgın. Burada işi yapan şey söylenmeyen." },
        { speaker: "Author", de: "Although a symbol of purity, the artifact bears a stigma. To call the text ideological is not to read it.", tr: "Saflığın simgesi olsa da nesne bir leke taşıyor. Bir metne ideolojik demek onu okumak değildir." },
        { speaker: "Critic", de: "Said emphatically, an empty phrase sounds like a claim. That is what the class rewards.", tr: "Vurguyla söylenen boş bir söz iddia gibi duyuluyor. Dersin ödüllendirdiği şey bu." },
        { speaker: "Lecturer", de: "Where emancipation stagnates, the anger does not subside. Let us keep that line for next week.", tr: "Kurtuluşun durduğu yerde öfke dinmiyor. O satırı haftaya bırakalım." },
      ],
      questions: [
        { de: "What does the critic say about “strangeness”?", tr: "Eleştirmen „strangeness“ hakkında ne diyor?", options: ["It is really otherness, and the difference decides the reading", "It is the same as otherness", "The poem never uses it", "It belongs to the canon"], answer: 0 },
        { de: "What, according to the lecturer, does the work in the poem?", tr: "Öğretim üyesine göre şiirde işi yapan şey ne?", options: ["What is left out", "The monologue", "The narrator's name", "The last line"], answer: 0 },
        { de: "What is the point of “Said emphatically, an empty phrase sounds like a claim”?", tr: "„Said emphatically, an empty phrase sounds like a claim“ ne demek istiyor?", options: ["Delivery can disguise the absence of content", "Empty phrases are always claims", "The class forbids emphasis", "A claim must be said loudly"], answer: 0 },
      ],
    },
    reading: {
      title: "The page the classic does not write",
      titleTr: "Köşe yazısı",
      genre: "Köşe yazısı",
      text: "THE PAGE THE CLASSIC DOES NOT WRITE\n\nEvery generation reads the same novella and finds a different silence in it.\n\nIn colloquial language the opening line lands as a complaint; on the page it reads as a verdict. What the narrative perspective does is withhold: we are told where the brother stood, never where the narrator was. A whole family is handed down in one clause, and the clause has no verb.\n\nThe class prefers the interpretive framework to the text. One reader contextualizes the scene, a second deciphers it, a third dissects it until nothing is left to read. Much as I admire the apparatus, the aesthetics of the novella survive without it: a reminiscence survives as lore, a relic as a cipher.\n\nAlthough time-honored, the reading I was taught leaves out the one sentence the author never wrote. Where the emancipation of the daughter stagnates, the wrath of the last page does not subside — and no footnote has ever explained why.",
      questions: [
        { de: "What does the narrative perspective withhold?", tr: "Anlatıcının bakışı neyi saklıyor?", options: ["Where the narrator was", "Where the brother stood", "The name of the family", "The date of the scene"], answer: 0 },
        { de: "What does the writer think of the class's apparatus?", tr: "Yazar dersin aygıtı hakkında ne düşünüyor?", options: ["It is admirable but the text survives without it", "It is the only way to read", "It ruined the novella", "It repeats the author's own words"], answer: 0 },
        { de: "Why does the writer mention “the one sentence the author never wrote”?", tr: "Yazar „the one sentence the author never wrote“ ifadesini neden anıyor?", options: ["To point at what the accepted reading leaves out", "To correct a printing error", "To quote a lost manuscript", "To praise the footnotes"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "İki okumayı karşılaştırıyorsun.", de: "Much as we like to call it strangeness, it is really otherness — albeit a difference the class rarely names.", tr: "Ona ne kadar yabancılık demeyi sevsek de aslında bu ötekilik — derste pek adlandırılmayan bir fark olsa da." },
      { situation: "Metnin eksilttiğini gösteriyorsun.", de: "We are told where the brother stood, never where the narrator was.", tr: "Kardeşin nerede durduğu söyleniyor, anlatıcının nerede olduğu hiç." },
    ],
    writing: {
      prompt: "Bir metni yorumlayan bir deneme paragrafı yaz.",
      checklist: [
        "Metni ve okuma sorusunu başa koy",
        "Bir aktarma fiiliyle başka bir yorumu aktar",
        "Bir ödün ver („Although …“, „Much as …“)",
        "Metnin söylemediğini göster",
        "Kendi okumanı bir cümlede topla",
      ],
      minWords: 110,
      phrases: [
        { de: "In colloquial language the line lands as …", tr: "Günlük dilde satır … gibi düşüyor", en: "In colloquial language the line lands as …" },
        { de: "What the narrative perspective does is …", tr: "Anlatıcının bakışının yaptığı şey …", en: "What the narrative perspective does is …" },
        { de: "One reader contextualizes it; another dissects it.", tr: "Bir okur bağlamlandırıyor, öteki parçalıyor", en: "One reader contextualizes it; another dissects it." },
        { de: "Although time-honored, the reading leaves out …", tr: "Köklü olsa da bu okuma …-i atlıyor", en: "Although time-honored, the reading leaves out …" },
        { de: "What is left out does the work here.", tr: "Burada işi yapan şey söylenmeyen", en: "What is left out does the work here." },
      ],
      sample:
        "ON THE SILENCE IN THE SECOND CHAPTER\n\nThe question is not what the chapter says about the departure, but where it stands while it says it.\n\nIn colloquial language the opening line lands as a complaint; on the page it reads as a verdict. What the narrative perspective does is withhold: we are told when the brother left and what the mother wore, never what the narrator felt. A whole decision is handed down in a clause without a verb.\n\nOne reader contextualizes the scene as a portrait of the period; another dissects it until only the syntax is left. Although time-honored, both readings leave out the sentence the author never wrote — the one that would have named the cost.\n\nWhat is left out does the work here, and that is why the chapter still unsettles.",
    },
  },

  {
    level: "C1",
    index: 4,
    code: "C1.5",
    titleDe: "Belonging and its words",
    titleTr: "Göç, aidiyet ve kültür",
    focus: [
      { de: "Register shift in naming", tr: "aynı kesimin üç adı" },
      { de: "Fronting the excluded", tr: "dışarıda kalanı öne almak" },
      { de: "Subjunctive in claims of equality", tr: "demands that … be …" },
      { de: "Collocation in the vocabulary of migration", tr: "göç sözlüğünün eşdizimleri" },
      { de: "Ellipsis in talk about belonging", tr: "aidiyetin söylemediği" },
    ],
    canDo: [
      { de: "I can hear which name a text chooses for a group.", tr: "Bir metnin bir kesime hangi adı seçtiğini duyabiliyorum.", en: "I can hear which name a text chooses for a group." },
      { de: "I can put the excluded side first in a sentence.", tr: "Dışarıda kalan tarafı cümlenin başına alabiliyorum.", en: "I can put the excluded side first in a sentence." },
      { de: "I can state a claim of equality in the formal register.", tr: "Bir eşitlik talebini resmî üslupta kurabiliyorum.", en: "I can state a claim of equality in the formal register." },
      { de: "I can use the vocabulary of migration precisely.", tr: "Göç sözlüğünü tam yerinde kullanabiliyorum.", en: "I can use the vocabulary of migration precisely." },
      { de: "I can name what a debate leaves unsaid.", tr: "Bir tartışmanın söylemediğini adlandırabiliyorum.", en: "I can name what a debate leaves unsaid." },
    ],
    listening: {
      title: "Three names for one street",
      titleTr: "Aynı sokağın üç adı",
      situation: "Bir radyo röportajında uyum tartışması konuşuluyor.",
      turns: [
        { speaker: "Presenter", de: "In the arts section it is a subculture; in the ministry, cultural policy. Which word is right?", tr: "Kültür sayfasında altkültür, bakanlıkta kültür politikası. Hangi sözcük doğru?" },
        { speaker: "Researcher", de: "Both, and that is the problem. What one calls a cultural scene, another calls a parallel society.", tr: "İkisi de, sorun da bu. Birinin kültür sahnesi dediğine öteki paralel toplum diyor." },
        { speaker: "Officer", de: "High culture is a register; dominant culture is a claim. The street itself has neither.", tr: "Yüksek kültür bir üslup; başat kültür bir iddia. Sokağın kendisinde ikisi de yok." },
        { speaker: "Researcher", de: "Behind the demarcation line stands xenophobia, and behind the word “influx” stands a counted number.", tr: "Sınır çizgisinin ardında yabancı korkusu, „akın“ sözcüğünün ardında ise sayılmış bir sayı duruyor." },
        { speaker: "Presenter", de: "Much as we like to call it acculturation, the course they attend is called an adaptation course.", tr: "Ona ne kadar kültürlenme demeyi sevsek de gittikleri kursun adı uyum kursu." },
        { speaker: "Officer", de: "Although a sign of hybridity, adaptability is asked of one side only. The principle of equality demands that human dignity be untouchable.", tr: "Melezliğin işareti olsa da uyum yeteneği tek taraftan isteniyor. Eşitlik ilkesi insan onurunun dokunulmaz olmasını gerektiriyor." },
        { speaker: "Researcher", de: "Then let us count what is missing: the diaspora keeps the heritage language; the enclave, the silence.", tr: "O hâlde eksiği sayalım: diaspora miras dilini koruyor, kapalı topluluk ise sessizliği." },
      ],
      questions: [
        { de: "What does the officer say about “dominant culture”?", tr: "Görevli „başat kültür“ hakkında ne diyor?", options: ["It is a claim, not a register", "It is the only correct term", "It describes the street exactly", "It replaces high culture"], answer: 0 },
        { de: "What is asked of one side only?", tr: "Yalnızca bir taraftan istenen şey ne?", options: ["Adaptability", "The adaptation course", "The counted number", "The heritage language"], answer: 0 },
        { de: "What is the point of the last line?", tr: "Son satırın vurgusu ne?", options: ["What a debate leaves unsaid is itself a finding", "The diaspora refuses to speak", "The enclave has no language", "Silence is a kind of dialect"], answer: 0 },
      ],
    },
    reading: {
      title: "The word before the number",
      titleTr: "Haber metni",
      genre: "Haber metni",
      text: "THE WORD BEFORE THE NUMBER\n\nThe district was described yesterday, in the same hour, as a cultural scene and as a parallel society.\n\nWhat the ministry calls cultural policy, the arts section calls a subculture; both texts quote the same two streets. Behind the demarcation line stands the older word, and behind the newer word “influx” stands a figure that was counted last spring: out-migration and internal migration together produce what the report prints as net migration.\n\nThe participation model, albeit well-founded, is addressed to one side. Much as the committee likes to speak of acculturation, the course it funds is called an adaptation course; the culture of welcome appears only in the title. One official reinterprets the culture of remembrance, another guards the interpretive authority, and the customary law of the neighborhood is called venerable by people who have never obeyed it.\n\nWhat the debate leaves unsaid is simpler than the vocabulary: nobody in either text is quoted from the street itself.",
      questions: [
        { de: "What produces the figure printed as “net migration”?", tr: "„Net göç“ diye basılan rakamı ne üretiyor?", options: ["Out-migration and internal migration together", "The number of new arrivals only", "The participation model", "The census of last spring"], answer: 0 },
        { de: "What does the writer note about the welcoming culture?", tr: "Yazar karşılama kültürü hakkında ne saptıyor?", options: ["It appears only in the title", "It was funded twice", "It replaced the adaptation course", "It is a legal term"], answer: 0 },
        { de: "What is the criticism in the last paragraph?", tr: "Son paragraftaki eleştiri ne?", options: ["Neither text quotes anyone from the district", "The vocabulary is too simple", "The committee never met", "The figures were invented"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir adlandırmanın bedelini gösteriyorsun.", de: "What one calls a cultural scene, another calls a parallel society — and the figure is the same.", tr: "Birinin kültür sahnesi dediğine öteki paralel toplum diyor — rakam ise aynı." },
      { situation: "Bir eşitlik talebini resmî üslupta söylüyorsun.", de: "The principle of equality demands that human dignity be untouchable, not negotiable.", tr: "Eşitlik ilkesi insan onurunun pazarlık konusu değil dokunulmaz olmasını gerektiriyor." },
    ],
    writing: {
      prompt: "Bir adlandırma tartışması üzerine ölçülü bir yorum yaz.",
      checklist: [
        "İki ayrı adı ve kaynaklarını karşılaştır",
        "Rakamın nasıl kurulduğunu göster",
        "Bir ödün ver („albeit“, „much as“)",
        "Dilek kipiyle bir talep yaz",
        "Tartışmanın söylemediğini adlandırarak kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "What one calls …, another calls …", tr: "Birinin … dediğine öteki … diyor", en: "What one calls …, another calls …" },
        { de: "Behind the word … stands a counted figure.", tr: "… sözcüğünün ardında sayılmış bir rakam duruyor", en: "Behind the word … stands a counted figure." },
        { de: "Although well-founded, the model is addressed to one side.", tr: "Temelli olsa da model tek tarafa sesleniyor", en: "Although well-founded, the model is addressed to one side." },
        { de: "The principle of equality demands that … be …", tr: "Eşitlik ilkesi …-in … olmasını gerektiriyor", en: "The principle of equality demands that … be …" },
        { de: "What the debate leaves unsaid is …", tr: "Tartışmanın söylemediği şey …", en: "What the debate leaves unsaid is …" },
      ],
      sample:
        "ON THE NAME WE GIVE THE DISTRICT\n\nWhat the ministry calls cultural policy, the arts section called a subculture on the same morning, and both quoted the same two streets.\n\nBehind the word “influx” stands a counted figure: out-migration and internal migration together produce the number the report prints as net migration. Read in that order, the sentence describes a district; read in reverse, it describes a threat.\n\nAlthough well-founded, the participation model is addressed to one side only, and the culture of welcome appears in the title rather than in the budget. Much as the committee likes to speak of acculturation, the course it funds is called an adaptation course.\n\nThe principle of equality demands that human dignity be untouchable, not conditional. What the debate leaves unsaid is simpler than its vocabulary: nobody from the street is quoted in either text.",
    },
  },

  {
    level: "C1",
    index: 5,
    code: "C1.6",
    titleDe: "Work and the bargaining table",
    titleTr: "Çalışma dünyası ve toplu sözleşme",
    focus: [
      { de: "Register shift in naming a measure", tr: "aynı kararın üç adı" },
      { de: "Fronting in talk about authority", tr: "emri kimin verdiğini öne almak" },
      { de: "Subjunctive in collective bargaining", tr: "asks that the firm make permanent …" },
      { de: "Concession in the flexibility debate", tr: "albeit / much as ile esneklik" },
      { de: "Cohesion across a long report", tr: "uzun bir raporu bağlamak" },
    ],
    canDo: [
      { de: "I can hear the difference between an efficiency gain and work intensification.", tr: "Verimlilik kazancı ile işin yoğunlaşması arasındaki farkı duyabiliyorum.", en: "I can hear the difference between an efficiency gain and work intensification." },
      { de: "I can name who holds the authority to give orders.", tr: "Emir verme yetkisinin kimde olduğunu adlandırabiliyorum.", en: "I can name who holds the authority to give orders." },
      { de: "I can put a demand at the bargaining table.", tr: "Müzakere masasında bir talep koyabiliyorum.", en: "I can put a demand at the bargaining table." },
      { de: "I can weigh flexibility against status insecurity.", tr: "Esnekliği güvencesizlikle tartabiliyorum.", en: "I can weigh flexibility against status insecurity." },
      { de: "I can report a meeting so that a reader can act on it.", tr: "Bir toplantıyı okurun işine yarayacak biçimde aktarabiliyorum.", en: "I can report a meeting so that a reader can act on it." },
    ],
    listening: {
      title: "At the bargaining table",
      titleTr: "Müzakere masasında",
      situation: "Bir işyeri temsilcisi ile yönetim esneklik düzenlemesini görüşüyor.",
      turns: [
        { speaker: "Manager", de: "In the report it is an efficiency gain. The figure is undisputed.", tr: "Raporda bu bir verimlilik kazancı. Rakam tartışmasız." },
        { speaker: "Colleague", de: "On the floor it is work intensification. What management calls flexibilization, we call precarization.", tr: "Sahada bu işin yoğunlaşması. Yönetimin esnekleştirme dediğine biz güvencesizleştirme diyoruz." },
        { speaker: "Manager", de: "Granted, the pacing changed, albeit within the code of conduct we agreed on.", tr: "Doğrusu ritim değişti, üzerinde anlaştığımız davranış kuralları içinde olsa da." },
        { speaker: "Colleague", de: "Behind the delegation stands the authority to give orders. Subordination we notice; room to maneuver we do not.", tr: "Yetki devrinin ardında emir verme yetkisi duruyor. Tabiiyeti fark ediyoruz; manevra alanını etmiyoruz." },
        { speaker: "Manager", de: "Then put it in writing. Collective bargaining rights demand that the conduct of negotiations be free from state interference.", tr: "O hâlde yazıya geçirin. Toplu sözleşme hakkı, görüşmelerin devlet müdahalesi olmadan yürütülmesini gerektirir." },
        { speaker: "Colleague", de: "We ask that the firm make permanent every apprenticeship contract that has run for two years.", tr: "İki yıl süren her çıraklık sözleşmesinin sürekli hâle getirilmesini talep ediyoruz." },
        { speaker: "Manager", de: "Much as we would like to spin off the unit, the work stays in-house. I will take that to the board on Friday.", tr: "Birimi ne kadar ayırmak istesek de iş kurum içinde kalıyor. Bunu cuma yönetime taşıyacağım." },
      ],
      questions: [
        { de: "What is the same measure called on the floor?", tr: "Aynı tedbire sahada ne deniyor?", options: ["Work intensification", "An efficiency gain", "A code of conduct", "A delegation"], answer: 0 },
        { de: "What stands behind the delegation, according to the colleague?", tr: "Meslektaşa göre yetki devrinin ardında ne duruyor?", options: ["The authority to give orders", "The bargaining autonomy", "The apprenticeship contract", "The board"], answer: 0 },
        { de: "What is the union side's concrete demand?", tr: "Çalışan tarafının somut talebi ne?", options: ["Making long apprenticeship contracts permanent", "Spinning off the unit", "Changing the code of conduct", "Reducing the pacing"], answer: 0 },
      ],
    },
    reading: {
      title: "Report on the reorganization — section 4",
      titleTr: "İşyeri raporu",
      genre: "İşyeri raporu",
      text: "REPORT ON THE REORGANIZATION — SECTION 4\n\nIn the management summary the change appears as an efficiency gain; in the interviews with the teams it appears as work intensification. Both descriptions rest on the same two figures.\n\nStandardization is a method; rationalization is a program, and the report uses the words interchangeably. What the power structure does is hide the power imbalance: behind the delegation of the new tasks stands the authority to give orders, which section 2 does not mention at all.\n\nAlthough the unit was spun off, the work has stayed in-house. Although permeable, the new border between the two teams does not remove the job insecurity of those who were moved. Deskilling is not the opposite of professionalization; both are visible in the same department.\n\nThe skilled labor shortage is announced in section 1; the labor reserve is counted in section 3. What holds this report together is not its argument but its vocabulary — the finding we would ask the board to read twice.",
      questions: [
        { de: "What do the management summary and the interviews have in common?", tr: "Yönetim özeti ile görüşmelerin ortak yanı ne?", options: ["They rest on the same two figures", "They use the same word for the change", "They were written by one author", "They quote section 2"], answer: 0 },
        { de: "What does section 2 fail to mention?", tr: "İkinci bölüm neyi hiç anmıyor?", options: ["The authority to give orders", "The labor reserve", "The spin-off", "The status insecurity"], answer: 0 },
        { de: "What is the report's own finding about itself?", tr: "Raporun kendisi hakkındaki bulgusu ne?", options: ["Its vocabulary, not its argument, holds it together", "Its figures are wrong", "It was written too late", "It repeats section 1"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Aynı tedbirin iki adını gösteriyorsun.", de: "In the report it is an efficiency gain; on the floor it is work intensification.", tr: "Raporda verimlilik kazancı; sahada işin yoğunlaşması." },
      { situation: "Masaya somut bir talep koyuyorsun.", de: "We ask that the firm make permanent every contract that has run for two years.", tr: "İki yıl süren her sözleşmenin sürekli hâle getirilmesini talep ediyoruz." },
    ],
    writing: {
      prompt: "Bir yeniden yapılanma raporunun bir bölümünü yaz.",
      stimulus: "The reorganization delivered an efficiency gain of eleven percent.",
      checklist: [
        "Aynı olgunun iki adını karşılaştır",
        "Yetkinin nerede durduğunu göster",
        "Bir ödün ver („albeit“, „much as“)",
        "Dilek kipiyle bir talep ya da öneri yaz",
        "Raporu tek bir bulguyla kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "In the summary it appears as …; in the interviews, as …", tr: "Özette … olarak, görüşmelerde … olarak görünüyor", en: "In the summary it appears as …; in the interviews, as …" },
        { de: "What the power structure does is hide …", tr: "Güç yapısının yaptığı şey …-i gizlemek", en: "What the power structure does is hide …" },
        { de: "Although permeable, the border does not remove …", tr: "Geçirgen olsa da sınır …-i kaldırmıyor", en: "Although permeable, the border does not remove …" },
        { de: "We would ask that the board …", tr: "Yönetimin … yapmasını isterdik", en: "We would ask that the board …" },
        { de: "What holds this report together is …", tr: "Bu raporu bir arada tutan şey …", en: "What holds this report together is …" },
      ],
      sample:
        "SECTION 4 — WHAT THE FIGURES DO NOT SAY\n\nIn the management summary the change appears as an efficiency gain of eleven percent; in the interviews it appears as work intensification. Both rest on the same two figures, counted in the same month.\n\nWhat the power structure does is hide the power imbalance. Behind the delegation of the new tasks stands the authority to give orders, and section 2 does not name it. Standardization is a method; rationalization is a program, and the report uses the two words interchangeably.\n\nAlthough permeable, the new border between the teams does not remove the job insecurity of those who were moved. Although the unit was spun off, the work has stayed in-house.\n\nWe would ask the board to read section 3 against section 1. What holds this report together is its vocabulary, not its argument.",
    },
  },

  {
    level: "C1",
    index: 6,
    code: "C1.7",
    titleDe: "Land, food and the soil",
    titleTr: "Toprak, gıda ve tarım",
    focus: [
      { de: "Register shift in naming land", tr: "aynı tarlanın üç adı" },
      { de: "Fronting in talk about ownership", tr: "toprağı kimin aldığını öne almak" },
      { de: "Subjunctive in demands", tr: "demands that the reform be decided locally" },
      { de: "Concession in the farming debate", tr: "albeit / much as ile verim tartışması" },
      { de: "Understatement about practice", tr: "„species-appropriate indeed“" },
    ],
    canDo: [
      { de: "I can hear which interest a land word serves.", tr: "Bir toprak sözcüğünün hangi çıkara hizmet ettiğini duyabiliyorum.", en: "I can hear which interest a land word serves." },
      { de: "I can read a label against the report behind it.", tr: "Bir etiketi arkasındaki raporla birlikte okuyabiliyorum.", en: "I can read a label against the report behind it." },
      { de: "I can weigh yield against variety.", tr: "Verimi çeşitlilikle tartabiliyorum.", en: "I can weigh yield against variety." },
      { de: "I can state a demand for food sovereignty.", tr: "Gıda egemenliği talebini kurabiliyorum.", en: "I can state a demand for food sovereignty." },
      { de: "I can criticize a practice through understatement.", tr: "Bir uygulamayı ölçülü ifadeyle eleştirebiliyorum.", en: "I can criticize a practice through understatement." },
    ],
    listening: {
      title: "Yield or variety",
      titleTr: "Verim mi çeşitlilik mi",
      situation: "Bir tarım panelinde iki konuşmacı toprak kullanımını tartışıyor.",
      turns: [
        { speaker: "Presenter", de: "In the plan it is land consumption; in the village it is an arable field. Which term will you use?", tr: "Planda arazi tüketimi, köyde ekilebilir tarla. Hangi terimi kullanacaksınız?" },
        { speaker: "Planner", de: "What the council calls land consolidation, the neighbor calls land speculation. Both are accurate.", tr: "Belediyenin arazi toplulaştırması dediğine komşu arazi spekülasyonu diyor. İkisi de doğru." },
        { speaker: "Researcher", de: "Behind the rural exodus stands a failed farm succession, not a shortage of land.", tr: "Kırdan göçün ardında başarısız bir devir duruyor, arazi kıtlığı değil." },
        { speaker: "Planner", de: "Much as we praise agroecology, the monoculture feeds the city. Food sovereignty demands that the reform be decided locally.", tr: "Tarımsal ekolojiyi övsek de tek ürün şehri besliyor. Gıda egemenliği reformun yerel olarak kararlaştırılmasını gerektiriyor." },
        { speaker: "Researcher", de: "The method, albeit soil-conserving, does not restore soil fertility in one generation.", tr: "Yöntem toprağı korusa da bir kuşakta verimliliği geri getirmiyor." },
        { speaker: "Presenter", de: "And the label? The report says the housing is species-appropriate.", tr: "Etiket peki? Rapor barındırmanın türüne uygun olduğunu söylüyor." },
        { speaker: "Researcher", de: "Species-appropriate indeed. Soil erosion may well deplete that field before the next quota is agreed.", tr: "Türüne uygun, tabii. Toprak erozyonu bir sonraki kota kararlaşmadan o tarlayı tüketebilir." },
      ],
      questions: [
        { de: "What stands behind the rural exodus, according to the researcher?", tr: "Araştırmacıya göre kırdan göçün ardında ne duruyor?", options: ["A failed farm succession", "A shortage of land", "The monoculture", "The council's plan"], answer: 0 },
        { de: "What does the researcher say about the soil-conserving method?", tr: "Araştırmacı toprağı koruyan yöntem hakkında ne diyor?", options: ["It does not restore fertility in one generation", "It is the only option", "It lowers the yield to zero", "It was never tested"], answer: 0 },
        { de: "What does “Species-appropriate indeed” express?", tr: "„Species-appropriate indeed“ neyi anlatıyor?", options: ["Doubt about the label, said with irony", "Agreement with the report", "A legal definition", "A question about the quota"], answer: 0 },
      ],
    },
    reading: {
      title: "Sustainability report — the field and the label",
      titleTr: "Sürdürülebilirlik raporu",
      genre: "Sürdürülebilirlik raporu",
      text: "SUSTAINABILITY REPORT — THE FIELD AND THE LABEL\n\nIn the plan the parcel appears as land consumption; in the register it is an arable field; in the sale document it is an interim use.\n\nWhat land grabbing does is dress a territorial claim in the language of investment. Behind the price stands neither the producer price nor the world market price but the expectation of a change of use. Much as we welcome the country-of-origin labeling, the traceability stops at the first buyer.\n\nThe method is described as soil-conserving and site-adapted. Although accurate, both words are compatible with a field that has been overfertilized for a decade: nitrate pollution seeps away where nobody measures it, and the crop protection product kills what should pollinate.\n\nSpecies-appropriate indeed, says the caption under the photograph of the barn. The report is thorough on the milk quota and silent on the seed replanting right — a silence that the farming association has now questioned twice.",
      questions: [
        { de: "What stands behind the price of the parcel?", tr: "Parselin fiyatının ardında ne duruyor?", options: ["The expectation of a change of use", "The world market price", "The producer price", "The country-of-origin labeling"], answer: 0 },
        { de: "Where does the traceability stop?", tr: "İzlenebilirlik nerede bitiyor?", options: ["At the first buyer", "At the field", "At the label", "At the milk quota"], answer: 0 },
        { de: "What is the effect of “Species-appropriate indeed” in this text?", tr: "„Species-appropriate indeed“ bu metinde ne etki yapıyor?", options: ["It casts doubt on the caption without an open charge", "It confirms the caption", "It quotes the association", "It states a legal standard"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir adlandırmanın çıkarını gösteriyorsun.", de: "What the council calls land consolidation, the neighbor calls land speculation.", tr: "Belediyenin arazi toplulaştırması dediğine komşu arazi spekülasyonu diyor." },
      { situation: "Ölçülü bir ifadeyle etikete kuşku düşürüyorsun.", de: "Species-appropriate indeed — and measured by whom, the report does not say.", tr: "Türüne uygun, tabii — kim ölçmüş, rapor söylemiyor." },
    ],
    writing: {
      prompt: "Tohum hakları ya da toprak kullanımı üzerine bir görüş yazısı yaz.",
      checklist: [
        "Aynı şeyin iki ya da üç adını karşılaştır",
        "Fiyatın ya da kararın ardındaki beklentiyi göster",
        "Bir ödün ver („albeit“, „much as“)",
        "Dilek kipiyle bir talep yaz",
        "Ölçülü bir ifadeyle kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "In the plan it is …; in the register, …", tr: "Planda …, sicilde …", en: "In the plan it is …; in the register, …" },
        { de: "Behind the price stands the expectation of …", tr: "Fiyatın ardında … beklentisi duruyor", en: "Behind the price stands the expectation of …" },
        { de: "Although accurate, the word is compatible with …", tr: "Doğru olsa da bu sözcük … ile bağdaşıyor", en: "Although accurate, the word is compatible with …" },
        { de: "Food sovereignty demands that the reform be …", tr: "Gıda egemenliği reformun … olmasını gerektiriyor", en: "Food sovereignty demands that the reform be …" },
        { de: "The report is thorough on … and silent on …", tr: "Rapor … konusunda ayrıntılı, … konusunda sessiz", en: "The report is thorough on … and silent on …" },
      ],
      sample:
        "ON THE SEED AND THE SILENCE\n\nIn the plan the parcel is land consumption; in the register it is an arable field; in the sale document it becomes an interim use. Three names, one field, and only the third is priced.\n\nBehind the price stands the expectation of a change of use rather than any producer price. Much as we welcome the country-of-origin labeling, the traceability stops at the first buyer, and the sustainability standard is signed by the same firm that writes the report.\n\nAlthough accurate, the words “soil-conserving” and “site-adapted” are compatible with a field that has been overfertilized for a decade. Food sovereignty demands that the reform be decided locally, not merely labeled.\n\nThe report is thorough on the milk quota and silent on the seed replanting right. Not exactly an accident, that silence.",
    },
  },

  {
    level: "C1",
    index: 7,
    code: "C1.8",
    titleDe: "Climate and the city",
    titleTr: "İklim ve kent",
    focus: [
      { de: "Register shift in naming a target", tr: "aynı hedefin üç adı" },
      { de: "Subjunctive in obligation", tr: "demands that the duty be given priority" },
      { de: "Concession in the growth debate", tr: "albeit / much as ile büyüme" },
      { de: "Hedging and modal nuance", tr: "may well / might / would tend to" },
      { de: "Understatement about renewal", tr: "„revitalized indeed“" },
    ],
    canDo: [
      { de: "I can tell a balance from a label in climate language.", tr: "İklim dilinde dengeyi etiketten ayırabiliyorum.", en: "I can tell a balance from a label in climate language." },
      { de: "I can state the precautionary principle as an obligation.", tr: "İhtiyat ilkesini bir yükümlülük olarak kurabiliyorum.", en: "I can state the precautionary principle as an obligation." },
      { de: "I can weigh growth against sufficiency.", tr: "Büyümeyi yeterlilikle tartabiliyorum.", en: "I can weigh growth against sufficiency." },
      { de: "I can say how certain a model is.", tr: "Bir modelin ne kadar kesin olduğunu söyleyebiliyorum.", en: "I can say how certain a model is." },
      { de: "I can object to a plan in the register of the hearing.", tr: "Bir plana duruşmaya uygun üslupta itiraz edebiliyorum.", en: "I can object to a plan in the register of the hearing." },
    ],
    listening: {
      title: "At the planning hearing",
      titleTr: "Plan duruşmasında",
      situation: "Bir kent planı duruşmasında itirazlar dinleniyor.",
      turns: [
        { speaker: "Chair", de: "In the brochure it is emission reduction; in the study it is decarbonization. The plan uses both.", tr: "Broşürde salım azaltımı, çalışmada karbondan arınma. Plan ikisini de kullanıyor." },
        { speaker: "Planner", de: "Climate neutrality is a balance; climate-neutral is a label. We are aiming at the first.", tr: "İklim nötrlüğü bir denge; iklim-nötr bir etiket. Biz birincisini hedefliyoruz." },
        { speaker: "Resident", de: "What overexploitation does is hide the pollutant load. Behind the resource consumption stands a lost carbon sink.", tr: "Aşırı kullanımın yaptığı şey kirletici yükünü gizlemek. Kaynak tüketiminin ardında yitirilmiş bir yutak duruyor." },
        { speaker: "Planner", de: "The precautionary principle demands that the responsibility to protect be given priority over the zoning plan.", tr: "İhtiyat ilkesi koruma sorumluluğunun imar planından önce gelmesini gerektiriyor." },
        { speaker: "Researcher", de: "A feedback loop may well push the quarter past a tipping point; the model, however, is volatile.", tr: "Bir geri besleme döngüsü mahalleyi devrilme noktasının ötesine itebilir; model ise oynak." },
        { speaker: "Resident", de: "The square was revitalized; the neighbors, less so. We have no gentrification here — we densify and refurbish.", tr: "Meydan canlandırıldı; komşular daha az. Burada mutenalaştırma yok — yoğunlaştırıp yeniliyoruz." },
        { speaker: "Chair", de: "Noted. In terms of scale, a fine-grained quarter would tend to serve accessibility better.", tr: "Kayda geçti. Ölçek açısından ince dokulu bir mahalle erişilebilirliğe muhtemelen daha iyi hizmet ederdi." },
      ],
      questions: [
        { de: "What is the difference the planner insists on?", tr: "Plancının ısrar ettiği fark ne?", options: ["Climate neutrality is a balance, climate-neutral a label", "Decarbonization is cheaper", "The brochure is more accurate", "Both terms mean the same"], answer: 0 },
        { de: "How certain is the model, according to the researcher?", tr: "Araştırmacıya göre model ne kadar kesin?", options: ["It is volatile, so the conclusion is cautious", "It is proven", "It cannot be tested", "It was rejected"], answer: 0 },
        { de: "What does “The square was revitalized; the neighbors, less so” do?", tr: "„The square was revitalized; the neighbors, less so“ ne yapıyor?", options: ["It names displacement through understatement", "It praises the renewal", "It reports a measurement", "It asks for a new plan"], answer: 0 },
      ],
    },
    reading: {
      title: "Revitalized, and for whom?",
      titleTr: "Gazete yorumu",
      genre: "Gazete yorumu",
      text: "REVITALIZED, AND FOR WHOM?\n\nIn the brochure the quarter is being revitalized; in the zoning plan it is being densified; in the rent index it has simply become expensive.\n\nClimate neutrality is a balance, climate-neutral is a label, and the plan for the eastern district uses the second word in a sentence that measures nothing. Behind the resource consumption of the new blocks stands a carbon sink that was removed in March. Species extinction we count; the heat island we do not.\n\nThe precautionary principle demands that the responsibility to protect be given priority over the change of use. Much as I agree with the criticism of growth we heard in class, the growth imperative pays the pensions — and the decoupling, albeit real, has not yet delivered sufficiency.\n\nA feedback loop may well push the district past a tipping point, though the model is volatile. Revitalized indeed: the square was refurbished, the neighbors, less so. What the plan leaves unsaid is who will still be living there when the trees have grown.",
      questions: [
        { de: "What was removed in March?", tr: "Martta kaldırılan şey ne?", options: ["A carbon sink", "The zoning plan", "The rent index", "The heat island"], answer: 0 },
        { de: "What does the writer concede about the criticism of growth?", tr: "Yazar büyüme eleştirisi konusunda neyi kabul ediyor?", options: ["The growth imperative pays the pensions", "The criticism is wrong", "Decoupling has delivered sufficiency", "The class was canceled"], answer: 0 },
        { de: "What is the function of “Revitalized indeed”?", tr: "„Revitalized indeed“in işlevi ne?", options: ["It turns the brochure's word against itself", "It states a measured result", "It quotes the planner", "It praises the refurbishment"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir hedefi etiketten ayırıyorsun.", de: "Climate neutrality is a balance; climate-neutral is a label, and the plan uses the label.", tr: "İklim nötrlüğü bir denge; iklim-nötr bir etiket ve plan etiketi kullanıyor." },
      { situation: "Bir modelin kesinliğini ölçülü söylüyorsun.", de: "A feedback loop may well push us past a tipping point, though the model is volatile.", tr: "Bir geri besleme döngüsü bizi devrilme noktasının ötesine itebilir, model oynak olsa da." },
    ],
    writing: {
      prompt: "Bir kent planına itiraz dilekçesi yaz.",
      stimulus: "The eastern district will be revitalized and densified in a climate-neutral way.",
      checklist: [
        "Planın adlandırmasını kendi sözcükleriyle karşılaştır",
        "İhtiyat ilkesini bir yükümlülük olarak koy",
        "Bir ödün ver ve karşı savı tart",
        "Kesinlik derecesini işaretle („may well“, „would tend to“)",
        "Somut bir talep ve süreyle kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "In the brochure it is …; in the zoning plan, …", tr: "Broşürde …, imar planında …", en: "In the brochure it is …; in the zoning plan, …" },
        { de: "Climate neutrality is a balance; climate-neutral is a label.", tr: "İklim nötrlüğü bir denge; iklim-nötr bir etiket", en: "Climate neutrality is a balance; climate-neutral is a label." },
        { de: "The precautionary principle demands that … be given priority.", tr: "İhtiyat ilkesi …-in önce gelmesini gerektiriyor", en: "The precautionary principle demands that … be given priority." },
        { de: "A feedback loop may well …", tr: "Bir geri besleme döngüsü … edebilir", en: "A feedback loop may well …" },
        { de: "What the plan leaves unsaid is …", tr: "Planın söylemediği şey …", en: "What the plan leaves unsaid is …" },
      ],
      sample:
        "OBJECTION TO THE PLAN FOR THE EASTERN DISTRICT\n\nIn the brochure the quarter is being revitalized; in the zoning plan it is being densified; in the rent index it has become expensive. Three registers, one decision.\n\nClimate neutrality is a balance; climate-neutral is a label, and the plan uses the label in a sentence that measures nothing. Behind the resource consumption of the new blocks stands a carbon sink that was removed in March.\n\nThe precautionary principle demands that the responsibility to protect be given priority over the change of use. Although the growth imperative pays for the infrastructure, the decoupling has not yet delivered sufficiency, and a feedback loop may well push the district past a tipping point.\n\nWe therefore request a life cycle assessment before the construction halt is lifted. What the plan leaves unsaid is who will still live there.",
    },
  },

  {
    level: "C1",
    index: 8,
    code: "C1.9",
    titleDe: "Money and the forecast",
    titleTr: "Ekonomi ve finans",
    focus: [
      { de: "Register shift in naming a number", tr: "aynı rakamın üç adı" },
      { de: "Subjunctive in demands for disclosure", tr: "demands that the disclosure be complete" },
      { de: "Reporting verbs in allegations", tr: "alleges / proves / feigns" },
      { de: "Hedging in forecasting", tr: "may well / might / would tend to" },
      { de: "Understatement about ethics", tr: "„thoroughly green“" },
    ],
    canDo: [
      { de: "I can tell a downturn from a stagnation in the register used.", tr: "Kullanılan dil düzeyinde gerilemeyi durgunluktan ayırabiliyorum.", en: "I can tell a downturn from a stagnation in the register used." },
      { de: "I can demand disclosure in the formal register.", tr: "Şeffaflığı resmî üslupta talep edebiliyorum.", en: "I can demand disclosure in the formal register." },
      { de: "I can separate an allegation from a proof.", tr: "Bir iddiayı kanıttan ayırabiliyorum.", en: "I can separate an allegation from a proof." },
      { de: "I can mark how certain a forecast is.", tr: "Bir tahminin kesinliğini işaretleyebiliyorum.", en: "I can mark how certain a forecast is." },
      { de: "I can name greenwashing without an open charge.", tr: "Yeşil aklamayı açık suçlama yapmadan adlandırabiliyorum.", en: "I can name greenwashing without an open charge." },
    ],
    listening: {
      title: "Which word will the market read?",
      titleTr: "Piyasa hangi sözcüğü okuyacak?",
      situation: "Bir analist görüşmesinde tahmin ve şeffaflık tartışılıyor.",
      turns: [
        { speaker: "Host", de: "In the press release it is a downturn; in your model it is stagnation. Which word will the market read?", tr: "Basın bülteninde gerileme, sizin modelinizde durgunluk. Piyasa hangi sözcüğü okuyacak?" },
        { speaker: "Researcher", de: "Deflation is a number; the business cycle is a story. What the budget deficit does is hide a market failure.", tr: "Deflasyon bir sayı; konjonktür bir anlatı. Bütçe açığının yaptığı şey bir piyasa başarısızlığını gizlemek." },
        { speaker: "Agent", de: "Behind the bailout package stands a speculative bubble that nobody priced in.", tr: "Kurtarma paketinin ardında kimsenin fiyatlamadığı bir spekülatif balon duruyor." },
        { speaker: "Researcher", de: "The regulator demands that the disclosure be complete. Were it not for the lack of transparency, no reporting office would be needed.", tr: "Düzenleyici açıklamanın eksiksiz olmasını talep ediyor. Şeffaflık eksikliği olmasaydı ihbar birimine gerek kalmazdı." },
        { speaker: "Agent", de: "One party alleges accounting fraud; another proves an embezzlement of a different year. That is not the same file.", tr: "Bir taraf muhasebe hilesi iddia ediyor, öteki başka bir yılın zimmetini kanıtlıyor. Bu aynı dosya değil." },
        { speaker: "Host", de: "So how certain is the forecast?", tr: "Peki tahmin ne kadar kesin?" },
        { speaker: "Researcher", de: "The investment cycle may well turn before the savings rate falls. Thoroughly green, that document — and rather thin on the default risk.", tr: "Yatırım döngüsü tasarruf oranı düşmeden dönebilir. Baştan aşağı yeşil o izahname — temerrüt riskinde ise biraz ince." },
      ],
      questions: [
        { de: "What stands behind the bailout package, according to the agent?", tr: "Temsilciye göre kurtarma paketinin ardında ne duruyor?", options: ["A speculative bubble nobody priced in", "A trade deficit", "The reporting office", "A monetary decision"], answer: 0 },
        { de: "What is the difference the agent draws?", tr: "Temsilcinin çizdiği ayrım ne?", options: ["An allegation and a proof belong to different files", "Fraud and embezzlement are the same", "The regulator decides both", "Neither can be disclosed"], answer: 0 },
        { de: "What does “Thoroughly green, that document” suggest?", tr: "„Thoroughly green, that document“ ne ima ediyor?", options: ["Greenwashing, said without an open charge", "A positive audit result", "A legal classification", "A forecast of the return"], answer: 0 },
      ],
    },
    reading: {
      title: "On the three names of one number",
      titleTr: "Deneme yazısı",
      genre: "Deneme yazısı",
      text: "ON THE THREE NAMES OF ONE NUMBER\n\nThe same quarter was called a downturn by the ministry, a stagnation by the bank and a healthy correction by the firm that had sold the paper.\n\nDeflation is a number; the business cycle is a story told with numbers. What the budget deficit does is hide a market failure long enough for the market to forget it, and behind every bailout package stands a speculative bubble that the document described as an expected return.\n\nThe financial regulator demands that the disclosure be complete. Were it not for the lack of transparency, no reporting office would be needed and no whistleblower would have to choose between a career and a file. One party alleges accounting fraud; another proves an embezzlement from a different year; the gray area between them is where the pretext lives.\n\nThoroughly green, the last document — and remarkably thin on the default risk. Much as I welcome the monetary policy on paper, the key interest rate is paid by people who never read one.",
      questions: [
        { de: "What did the firm that sold the paper call the quarter?", tr: "Kâğıdı satan şirket o çeyreğe ne dedi?", options: ["A healthy correction", "A downturn", "A stagnation", "A market failure"], answer: 0 },
        { de: "What, according to the text, is the gray area?", tr: "Metne göre gri alan neresi?", options: ["The space between an allegation and a proof", "The budget deficit", "The reporting office", "The document"], answer: 0 },
        { de: "What does the last sentence criticize?", tr: "Son cümle neyi eleştiriyor?", options: ["Those who bear the cost do not read the documents", "Monetary policy never works", "The document was too long", "The regulator is too strict"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Aynı rakamın iki adını gösteriyorsun.", de: "In the press release it is a downturn; in the model it is stagnation.", tr: "Basın bülteninde gerileme; modelde durgunluk." },
      { situation: "İddiayı kanıttan ayırıyorsun.", de: "One party alleges accounting fraud; another proves an embezzlement of a different year.", tr: "Bir taraf muhasebe hilesi iddia ediyor, öteki başka bir yılın zimmetini kanıtlıyor." },
    ],
    writing: {
      prompt: "Bir strateji raporunun bir bölümünü yaz.",
      checklist: [
        "Aynı rakamın iki adını karşılaştır",
        "Dilek kipiyle bir şeffaflık talebi koy",
        "İddia ile kanıtı aktarma fiilleriyle ayır",
        "Tahminin kesinliğini işaretle",
        "Ölçülü bir ifadeyle kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "In the press release it is …; in the model, …", tr: "Basın bülteninde …, modelde …", en: "In the press release it is …; in the model, …" },
        { de: "The regulator demands that the disclosure be complete.", tr: "Düzenleyici açıklamanın eksiksiz olmasını talep ediyor", en: "The regulator demands that the disclosure be complete." },
        { de: "One party alleges …; another proves …", tr: "Bir taraf … iddia ediyor; öteki … kanıtlıyor", en: "One party alleges …; another proves …" },
        { de: "The cycle may well turn before …", tr: "Döngü … olmadan dönebilir", en: "The cycle may well turn before …" },
        { de: "Thoroughly green, that document.", tr: "Baştan aşağı yeşil o izahname", en: "Thoroughly green, that document." },
      ],
      sample:
        "STRATEGY PAPER — SECTION 2: WHAT WE ARE PRICING\n\nIn the press release the quarter is a downturn; in our model it is a stagnation; in the seller's summary it is a healthy correction. The figure is the same in all three.\n\nThe regulator demands that the disclosure be complete, and on this file it is not: the follow-up costs appear once, without a date. One party alleges accounting fraud; another proves an embezzlement from a different year, and the gray area between the two is where the pretext lives.\n\nThe investment cycle may well turn before the savings rate falls, though the model is thin on the default risk and a single quarter would tend to prove little.\n\nThoroughly green, the document — and remarkably quiet on the capital requirement. We would ask the board to read section 4 first.",
    },
  },

  {
    level: "C1",
    index: 9,
    code: "C1.10",
    titleDe: "Evidence, judgment and choice",
    titleTr: "Kanıt, yargı ve seçim",
    focus: [
      { de: "Register shift between stylistic levels", tr: "aynı savın üç dil düzeyi" },
      { de: "Fronting in building an argument", tr: "savın sırasını kurmak" },
      { de: "Reporting verbs and evaluation", tr: "advocates / affirms / misrepresents" },
      { de: "Modal nuance about oneself", tr: "may well / might have / would tend to" },
      { de: "Understatement in judgment", tr: "„measured indeed“" },
    ],
    canDo: [
      { de: "I can make the same claim in three registers.", tr: "Aynı savı üç ayrı dil düzeyinde söyleyebiliyorum.", en: "I can make the same claim in three registers." },
      { de: "I can order an argument so that the weight falls at the end.", tr: "Bir savı ağırlığı sona düşecek biçimde sıralayabiliyorum.", en: "I can order an argument so that the weight falls at the end." },
      { de: "I can tell a distortion from a truism.", tr: "Bir çarpıtmayı bir bedahetten ayırabiliyorum.", en: "I can tell a distortion from a truism." },
      { de: "I can speak about myself without self-deception.", tr: "Kendimi aldatmadan kendimden söz edebiliyorum.", en: "I can speak about myself without self-deception." },
      { de: "I can close a long case with a measured judgment.", tr: "Uzun bir savı ölçülü bir yargıyla kapatabiliyorum.", en: "I can close a long case with a measured judgment." },
    ],
    listening: {
      title: "The last supervision",
      titleTr: "Son danışma görüşmesi",
      situation: "Bir mentörlük görüşmesinde bütün yol değerlendiriliyor.",
      turns: [
        { speaker: "Tutor", de: "In the essay it is rhetoric; in the pamphlet, pathos. You have used both this year.", tr: "Denemede retorik, bildiride patos. Bu yıl ikisini de kullandın." },
        { speaker: "Author", de: "A stylistic device is a choice; a break in style is a mistake. I could not always tell them apart.", tr: "Üslup aracı bir seçim; üslup kırılması bir hata. İkisini her zaman ayırt edemedim." },
        { speaker: "Tutor", de: "What the line of argument does is hide a flaw in reasoning. Behind the prevailing doctrine stands a school of thought.", tr: "Savın kuruluşunun yaptığı şey bir akıl hatasını gizlemek. Yerleşik öğretinin ardında bir düşünce okulu duruyor." },
        { speaker: "Author", de: "One advocates a claim; another merely affirms it. I think I affirmed for a whole term.", tr: "Biri bir savı savunur; öteki yalnızca onaylar. Sanırım bir dönem boyunca onayladım." },
        { speaker: "Tutor", de: "To misrepresent a study is a distortion, not a truism. You never did that, and it matters.", tr: "Bir çalışmayı yanlış aktarmak bir çarpıtmadır, bedahet değil. Bunu hiç yapmadın ve bu önemli." },
        { speaker: "Author", de: "A self-image may well outlive self-knowledge. Mine did, until the second reader asked why.", tr: "Bir benlik imgesi kendini bilmekten uzun yaşayabilir. Benimki yaşadı, ikinci okur „neden“ diye sorana kadar." },
        { speaker: "Tutor", de: "Measured indeed, that answer. Where irreversibility is real, a coherent plan is not enough — and you know it now.", tr: "Ölçülü bir cevap, doğrusu. Geri dönülemezlik gerçek olduğunda tutarlı bir plan yetmez — artık biliyorsun." },
      ],
      questions: [
        { de: "What distinction does the author draw about style?", tr: "Yazar üslup konusunda hangi ayrımı çiziyor?", options: ["A device is a choice, a break is a mistake", "Rhetoric is better than pathos", "Both belong to the pamphlet", "Neither can be taught"], answer: 0 },
        { de: "What does the author admit about the term?", tr: "Yazar dönem hakkında neyi kabul ediyor?", options: ["He merely affirmed claims instead of advocating them", "He misrepresented a study", "He never read the doctrine", "He changed his school of thought"], answer: 0 },
        { de: "What does “Measured indeed, that answer” do here?", tr: "„Measured indeed, that answer“ burada ne yapıyor?", options: ["It praises with restraint rather than flattery", "It asks for a longer answer", "It repeats the question", "It closes the file"], answer: 0 },
      ],
    },
    reading: {
      title: "What the case still leaves to choose",
      titleTr: "Kişisel deneme",
      genre: "Kişisel deneme",
      text: "WHAT THE CASE STILL LEAVES TO CHOOSE\n\nI have argued this point for eleven years, in three registers, and the last version is the shortest.\n\nIn the essay it was rhetoric; in the pamphlet, pathos; in the report, a reference value with a footnote. What the line of argument does is hide a flaw in reasoning, and the flaw in mine was the order: I put the strongest evidence first, where it could be forgotten, and the reservation last, where it looked like doubt.\n\nOne advocates a claim; another merely affirms it and is thanked for the contribution. To misrepresent a study is a distortion rather than a truism, and persuasiveness is not the same as being justifiable. A self-image may well outlive self-knowledge: mine did, until a second reader asked, quite mildly, why the middle section was missing.\n\nMeasured indeed, that question. Where irreversibility is real, a coherent plan is not enough; what remains is the choice, and the choice is not made by the evidence.",
      questions: [
        { de: "What does the writer say the flaw in the argument was?", tr: "Yazara göre savdaki kusur neydi?", options: ["The order of evidence and reservation", "A misquoted study", "The length of the essay", "The footnote in the report"], answer: 0 },
        { de: "What ended the writer's self-image?", tr: "Yazarın benlik imgesini ne bitirdi?", options: ["A mild question from a second reader", "A rejected paper", "A change of register", "A missing reference value"], answer: 0 },
        { de: "What is the point of the closing sentence?", tr: "Kapanış cümlesinin vurgusu ne?", options: ["Evidence does not make the decision for you", "Plans are always coherent", "Irreversibility can be avoided", "The case is now closed"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Kendin hakkında ölçülü konuşuyorsun.", de: "A self-image may well outlive self-knowledge; mine did for a whole year.", tr: "Bir benlik imgesi kendini bilmekten uzun yaşayabilir; benimki bir yıl yaşadı." },
      { situation: "Uzun bir savı ölçülü bir yargıyla kapatıyorsun.", de: "Where irreversibility is real, a coherent plan is not enough.", tr: "Geri dönülemezlik gerçek olduğunda tutarlı bir plan yetmez." },
    ],
    writing: {
      prompt: "Kursu kapatan kişisel bir deneme yaz: kanıt, yargı ve seçim.",
      checklist: [
        "Savını bir cümlede söyle ve dil düzeyini belirt",
        "Bir akıl hatasını ya da sıralama hatasını kabul et",
        "İddia, onay ve çarpıtmayı aktarma fiilleriyle ayır",
        "Kendin hakkında kip nüansıyla konuş („may well“, „might have“)",
        "Ölçülü bir yargıyla kapat",
      ],
      minWords: 110,
      phrases: [
        { de: "In the essay it was …; in the report, …", tr: "Denemede …, raporda …", en: "In the essay it was …; in the report, …" },
        { de: "What the line of argument does is hide …", tr: "Savın kuruluşunun yaptığı şey …-i gizlemek", en: "What the line of argument does is hide …" },
        { de: "One advocates a claim; another merely affirms it.", tr: "Biri bir savı savunur; öteki yalnızca onaylar", en: "One advocates a claim; another merely affirms it." },
        { de: "A self-image may well outlive self-knowledge.", tr: "Bir benlik imgesi kendini bilmekten uzun yaşayabilir", en: "A self-image may well outlive self-knowledge." },
        { de: "Where irreversibility is real, a coherent plan is not enough.", tr: "Geri dönülemezlik gerçek olduğunda tutarlı bir plan yetmez", en: "Where irreversibility is real, a coherent plan is not enough." },
      ],
      sample:
        "WHAT I WOULD ARGUE DIFFERENTLY NOW\n\nI have made the same case three times: in an essay, in a pamphlet and in a report with a footnote. The claim did not change; the register did, and with it the number of readers who believed it.\n\nWhat the line of argument does is hide a flaw in reasoning. Mine was the order. I put the strongest evidence first, where it could be forgotten, and the reservation last, where it read as doubt rather than as care.\n\nOne advocates a claim; another merely affirms it. For one term I affirmed, and I was thanked for the contribution. To misrepresent a study would have been a distortion; that I avoided, and persuasiveness is still not the same as being justifiable.\n\nA self-image may well outlive self-knowledge. Measured indeed, the question that ended mine — and where irreversibility is real, no plan is enough.",
    },
  },
];

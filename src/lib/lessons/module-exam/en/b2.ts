import type { ModuleExamPlan } from "../types";

/**
 * İNGİLİZCE kursun B2 modül sınavları (10 modül).
 *
 * Alan adları ve `en` alanının gerekçesi kardeş dosyada: `./a1.ts` başlığı.
 *
 * B2'de metin bir KAYIT taşıyor: tutanak, resmî yazışma, düzeltme, rapor.
 * Soru artık "ne demeye getiriyor" değil, "bunu kim, hangi sıfatla, hangi
 * bağlayıcılıkla söylüyor" diye soruyor — bir tutanakta "it is claimed that"
 * ile yazılan cümle ile düz bildirim aynı şey değildir ve B2'yi geçen birinin
 * bu farkı görmesi gerekir. Okuma soruları bu yüzden üçe çıkıyor: biri her
 * kâğıtta doğrudan bu ayrımı hedefliyor.
 *
 * Yazma görevleri 90 kelimeden başlıyor: resmî bir yazının gövdesi (atıf,
 * olgu, talep, süre, kapanış) daha azına sığmıyor. Beş kâğıtta UYARAN var —
 * cevap yazısı ancak neye cevap verildiği görünürken ölçülebilir.
 */
export const EN_B2_EXAMS: ModuleExamPlan[] = [
  {
    level: "B2",
    index: 0,
    code: "B2.1",
    titleDe: "Professional communication",
    titleTr: "Profesyonel iletişim",
    focus: [
      { de: "It is said that … / are reported to be …", tr: "kaynağı söylemeden aktarmak" },
      { de: "Participle clauses", tr: "Having finished …, Being absent …" },
      { de: "Future perfect and future continuous", tr: "By June we will have …" },
      { de: "Perfect modals", tr: "must have been / should have raised" },
      { de: "Nominalisation", tr: "tutanak dili: the assignment of the task" },
    ],
    canDo: [
      { de: "I can open a briefing and set the objective.", tr: "Bir bilgilendirmeyi açıp amacı koyabiliyorum.", en: "I can open a briefing and set the objective." },
      { de: "I can write a handover note that a colleague can use.", tr: "Meslektaşımın kullanabileceği bir devir notu yazabiliyorum.", en: "I can write a handover note that a colleague can use." },
      { de: "I can record decisions and objections in the minutes.", tr: "Kararları ve itirazları tutanağa geçirebiliyorum.", en: "I can record decisions and objections in the minutes." },
      { de: "I can say what should have been done differently.", tr: "Neyin başka yapılması gerektiğini söyleyebiliyorum.", en: "I can say what should have been done differently." },
      { de: "I can soften a hard message with tone and nuance.", tr: "Sert bir mesajı tonla yumuşatabiliyorum.", en: "I can soften a hard message with tone and nuance." },
    ],
    listening: {
      title: "The morning briefing",
      titleTr: "Sabah bilgilendirmesi",
      situation: "Bir proje ekibi sabah toplantısında gecikmeyi ve kararı konuşuyor.",
      turns: [
        { speaker: "Moderator", de: "Let's start with the timeline. The findings are reported to be complete.", tr: "Zaman planıyla başlayalım. Bulguların tamamlandığı bildiriliyor." },
        { speaker: "Mr. Adler", de: "Having reviewed the draft, I found one bottleneck: the second check was never assigned.", tr: "Taslağı gözden geçirince bir darboğaz buldum: ikinci kontrol hiç kimseye verilmemiş." },
        { speaker: "Ms. Renner", de: "May I clarify? So the delay is not in the capacity but in the assignment of the task.", tr: "Netleştirebilir miyim? Yani gecikme kapasitede değil, görevin atanmasında." },
        { speaker: "Mr. Adler", de: "Exactly. Someone should have raised the alert in April; the fault must have been there for weeks.", tr: "Aynen. Nisanda uyarıyı biri vermeliydi; hata haftalardır orada olmalı." },
        { speaker: "Moderator", de: "Can we record that the milestone is moved by two weeks, provided nothing else comes up?", tr: "Başka bir şey çıkmazsa aşamanın iki hafta ertelendiğini kayda geçirebilir miyiz?" },
        { speaker: "Ms. Renner", de: "Agreed. I note, however, that the stakeholders have to be informed by Friday.", tr: "Kabul. Ancak paydaşların cumaya kadar bilgilendirilmesi gerektiğini belirtiyorum." },
        { speaker: "Moderator", de: "By Friday we will have circulated the memo. Admittedly, the tone must be moderate.", tr: "Cumaya kadar notu dağıtmış olacağız. Doğrusu, tonun ölçülü olması gerekiyor." },
        { speaker: "Mr. Adler", de: "Nevertheless, the priority is clear. Let's conclude with that consensus.", tr: "Yine de öncelik açık. Bu ortak görüşle kapatalım." },
      ],
      questions: [
        { de: "Where is the delay, according to Ms. Renner?", tr: "Bayan Renner'a göre gecikme nerede?", options: ["In the assignment of the task", "In the capacity of the team", "In the stakeholders' reply", "In the second check itself"], answer: 0 },
        { de: "What is recorded in the minutes?", tr: "Tutanağa ne geçiriliyor?", options: ["The milestone is moved by two weeks", "The project is stopped", "The team is made larger", "The memo is cancelled"], answer: 0 },
        { de: "What does „the fault must have been there for weeks“ express?", tr: "„The fault must have been there for weeks“ neyi anlatıyor?", options: ["A firm conclusion about the past", "A rule for the future", "A request", "A doubt about the findings"], answer: 0 },
      ],
    },
    reading: {
      title: "Minutes of the project meeting",
      titleTr: "Proje toplantısı tutanağı",
      genre: "Tutanak",
      text: "MINUTES OF THE PROJECT MEETING\n14 May, 9:30, remote\n\n1 — Status of the findings\nMr Adler reported that the draft had been completed in the previous week. The late assignment of the second check is said to be the reason for the delay; accordingly, the team had to adjust the outline twice.\n\n2 — Scheduling\nIt was decided that the milestone is moved by two weeks. Ms Renner noted that the stakeholders are to be informed by Friday. The memo is circulated by the project office.\n\n3 — Open points\nThe question of the capacity for June remains to be clarified. Provided that no reply arrives before the next meeting, the priority is set by the project office.\n\nNext meeting: 28 May, 9:30. Minutes: L. Sander",
      questions: [
        { de: "Why did the team have to adjust the outline?", tr: "Ekip taslağı neden iki kez düzeltmek zorunda kaldı?", options: ["Because the second check was assigned late", "Because the client cancelled", "Because the draft was lost", "Because the office changed"], answer: 0 },
        { de: "What happens if no reply arrives before the next meeting?", tr: "Bir sonraki toplantıya kadar cevap gelmezse ne olur?", options: ["The project office sets the priority", "The point is closed", "The meeting is moved", "The stakeholders decide"], answer: 0 },
        { de: "What does the form „is said to be the reason“ show?", tr: "„is said to be the reason“ biçimi neyi gösteriyor?", options: ["A reported claim, not the writer's own statement", "A decision of the group", "A condition", "A forecast of the office"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Toplantıda kararı kayda geçiriyorsun.", de: "Can we record that the milestone is moved by two weeks?", tr: "Aşamanın iki hafta ertelendiğini kayda geçirebilir miyiz?" },
      { situation: "Bir eksiği ölçülü bir tonla söylüyorsun.", de: "Admittedly, someone should have raised the alert much earlier.", tr: "Doğrusu, uyarıyı birinin çok daha önce vermesi gerekirdi." },
    ],
    writing: {
      prompt: "Bir proje toplantısının kısa tutanağını yaz.",
      checklist: [
        "Tarihi ve gündem maddesini başa yaz",
        "En az bir kararı kişisiz biçimde bildir („It was decided that …“)",
        "En az bir kişinin söylediğini aktarımla yaz („… is said to be …“, „X noted that …“)",
        "Açık kalan bir noktayı ve sorumlusunu yaz",
        "Bir sonraki toplantının tarihini ekle",
      ],
      minWords: 90,
      phrases: [
        { de: "It was decided that …", tr: "…-mesine karar verildi", en: "It was decided that …" },
        { de: "Ms X noted that …", tr: "Bayan X …-i belirtti", en: "Ms X noted that …" },
        { de: "The delay is said to be …", tr: "Gecikmenin … olduğu söyleniyor", en: "The delay is said to be …" },
        { de: "The question of … remains to be clarified.", tr: "… sorusunun netleşmesi gerekiyor", en: "The question of … remains to be clarified." },
        { de: "Next meeting: …", tr: "Bir sonraki toplantı: …", en: "Next meeting: …" },
      ],
      sample:
        "MINUTES OF THE TEAM MEETING\n3 June, 10:00\n\n1 — Status\nMs Yilmaz reported that the first part had been finished on time. The late delivery is said to be the reason for the second part, which is now moved by one week.\n\n2 — Decisions\nIt was decided that the new date is 20 June. Mr Brandt noted that the client is to be informed this week; the memo is circulated by the office.\n\n3 — Open points\nThe question of the capacity for July remains to be clarified. Provided that nobody replies by Friday, the priority is set by the project office.\n\nNext meeting: 17 June, 10:00.",
    },
  },

  {
    level: "B2",
    index: 1,
    code: "B2.2",
    titleDe: "Claims and complaints",
    titleTr: "Müzakere ve şikâyet",
    focus: [
      { de: "It is claimed that … / What we contest is …", tr: "iddiayı ve itirazı ayırmak" },
      { de: "Third conditional", tr: "If we had agreed, … would have been settled" },
      { de: "Perfect modals", tr: "should have acknowledged / can't have made" },
      { de: "Inversion after negative adverbials", tr: "Under no circumstances will we …" },
      { de: "Nominalisation", tr: "resmî yazı dili: the reimbursement of the cost" },
    ],
    canDo: [
      { de: "I can state a claim and say what exactly I contest.", tr: "Bir iddiayı kurup tam olarak neye itiraz ettiğimi söyleyebiliyorum.", en: "I can state a claim and say what exactly I contest." },
      { de: "I can write a formal complaint with a deadline.", tr: "Süre tanıyan resmî bir şikâyet yazabiliyorum.", en: "I can write a formal complaint with a deadline." },
      { de: "I can make a concession without withdrawing my demand.", tr: "Talebimden vazgeçmeden ödün verebiliyorum.", en: "I can make a concession without withdrawing my demand." },
      { de: "I can quantify a loss and ask to be reimbursed.", tr: "Zararı rakamla belirtip iade isteyebiliyorum.", en: "I can quantify a loss and ask to be reimbursed." },
      { de: "I can keep a firm letter polite.", tr: "Sert bir mektubu nazik tutabiliyorum.", en: "I can keep a firm letter polite." },
    ],
    listening: {
      title: "The disputed account",
      titleTr: "İtiraz edilen hesap",
      situation: "Bir müşteri temsilcisi ile tedarikçi bir talebi görüşüyor.",
      turns: [
        { speaker: "Representative", de: "It is claimed that the goods were dispatched on 4 March. Our file says 10 March.", tr: "Malların 4 Martta gönderildiği iddia ediliyor. Bizim dosyamızda 10 Mart yazıyor." },
        { speaker: "Supplier", de: "The delay is said to be minimal. Admittedly, our position was rather rigid last month.", tr: "Gecikmenin çok az olduğu söyleniyor. Doğrusu geçen ay tutumumuz biraz katıydı." },
        { speaker: "Representative", de: "What we contest is not the date but the liability for the damages.", tr: "İtiraz ettiğimiz şey tarih değil, zararın sorumluluğu." },
        { speaker: "Supplier", de: "You must have misread the clause; the threshold applies only above ten thousand.", tr: "Maddeyi yanlış okumuş olmalısınız; eşik yalnızca on binin üstünde geçerli." },
        { speaker: "Representative", de: "We should have acknowledged your letter earlier, and I apologise for that.", tr: "Yazınızı daha önce teyit etmemiz gerekirdi, bunun için özür dilerim." },
        { speaker: "Supplier", de: "If we had agreed in March, the matter would have been settled without correspondence.", tr: "Martta anlaşsaydık konu bu yazışmalar olmadan çözülmüş olurdu." },
        { speaker: "Representative", de: "Under no circumstances will we accept a second delay. Nevertheless, we are flexible on the date.", tr: "İkinci bir gecikmeyi hiçbir koşulda kabul etmeyeceğiz. Yine de tarihte esneğiz." },
        { speaker: "Supplier", de: "Then the reimbursement of the transport cost is our concession. I will confirm it in writing.", tr: "O hâlde taşıma bedelinin iadesi bizim ödünümüz. Yazılı olarak teyit edeceğim." },
      ],
      questions: [
        { de: "What does the representative contest?", tr: "Temsilci neye itiraz ediyor?", options: ["The liability for the damages", "The date of dispatch", "The price of the goods", "The wording of the letter"], answer: 0 },
        { de: "What is the supplier's concession?", tr: "Tedarikçinin ödünü ne?", options: ["Reimbursing the transport cost", "Cancelling the invoice", "Changing the threshold", "Paying the damages in full"], answer: 0 },
        { de: "What does „We should have acknowledged your letter“ do here?", tr: "„We should have acknowledged your letter“ burada ne yapıyor?", options: ["It admits a mistake without dropping the demand", "It withdraws the claim", "It sets a new deadline", "It denies the delay"], answer: 0 },
      ],
    },
    reading: {
      title: "Formal complaint and final deadline",
      titleTr: "Şikâyet ve süre tanıma",
      genre: "Resmî mektup",
      text: "Dear Sir or Madam,\n\nwith reference to my letter of 8 March and to your reply of 21 March, I am writing to you once again.\n\nThe device has now been repaired three times. The last repair was carried out on 2 April; four days later the same fault returned. The device can therefore not be used for the purpose described in your own reply.\n\nAs a consequence of the repeated breakdowns, additional costs of 180 have arisen. It is claimed in your letter that a further repair is sufficient; what I contest is exactly that. I therefore decline it and demand the replacement of the device, together with the reimbursement of the costs named above.\n\nUnder no circumstances will I accept a further delay. I request a written reply by 30 April. Should no reply arrive by then, the matter will be passed to our legal adviser.\n\nYours sincerely,\nD. Kirmizi",
      questions: [
        { de: "How many times has the device been repaired?", tr: "Cihaz kaç kez tamir edildi?", options: ["Three times", "Twice", "Four times", "Once"], answer: 0 },
        { de: "What does the writer demand?", tr: "Yazan kişi ne talep ediyor?", options: ["A replacement and the reimbursement of the costs", "One more repair", "A discount only", "An apology only"], answer: 0 },
        { de: "What is the effect of „It is claimed in your letter that …“?", tr: "„It is claimed in your letter that …“ ne etki yapıyor?", options: ["It attributes the statement to the other side before rejecting it", "It accepts the statement", "It quotes a rule", "It makes a promise"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Müzakerede itirazını ayırıyorsun.", de: "What we contest is not the date but the liability for the damages.", tr: "İtiraz ettiğimiz şey tarih değil, zararın sorumluluğu." },
      { situation: "Sert bir sınır koyup ödün veriyorsun.", de: "Under no circumstances will we accept a second delay; nevertheless, we are flexible on the date.", tr: "İkinci gecikmeyi hiçbir koşulda kabul etmeyiz; yine de tarihte esneğiz." },
    ],
    writing: {
      prompt: "Üçüncü kez bozulan bir ürün için resmî bir şikâyet mektubu yaz.",
      stimulus: "Dear customer, we regret the delay and would like to offer you a further repair.",
      checklist: [
        "Önceki yazışmaya atıfla başla („with reference to your letter of …“)",
        "Şimdiye kadar ne yapıldığını edilgen geçmişle say",
        "Zararı ya da masrafı rakamla belirt",
        "Somut talebini yaz (değişim, iade, tazminat)",
        "Bir süre tanı ve süre dolarsa ne yapacağını bildir",
      ],
      minWords: 90,
      phrases: [
        { de: "With reference to your letter of …", tr: "… tarihli yazınıza atıfla", en: "With reference to your letter of …" },
        { de: "The device has been repaired … times.", tr: "Cihaz … kez tamir edildi", en: "The device has been repaired … times." },
        { de: "As a consequence of …, additional costs have arisen.", tr: "… sonucunda ek masraflar doğdu", en: "As a consequence of …, additional costs have arisen." },
        { de: "I therefore decline … and demand …", tr: "Bu yüzden …-i reddediyor ve …-i talep ediyorum", en: "I therefore decline … and demand …" },
        { de: "I request a written reply by …", tr: "…-e kadar yazılı cevap rica ediyorum", en: "I request a written reply by …" },
      ],
      sample:
        "Dear Sir or Madam,\n\nwith reference to your letter of 21 March, I am writing to you once again. The device has been repaired three times, most recently on 2 April. Four days later the same fault returned, so the device cannot be used.\n\nAs a consequence of the repeated breakdowns, additional costs of 180 have arisen. It is claimed in your letter that a further repair is sufficient; what I contest is exactly that. I therefore decline one more repair and demand the replacement of the device and the reimbursement of these costs.\n\nI request a written reply by 30 April. Should no reply arrive by then, I will take legal advice.\n\nYours sincerely,\nD. Kirmizi",
    },
  },

  {
    level: "B2",
    index: 2,
    code: "B2.3",
    titleDe: "Process and passive",
    titleTr: "Edilgenin bütün hâlleri",
    focus: [
      { de: "It is reported that … / is thought to be …", tr: "kaynaksız aktarım" },
      { de: "Participle clauses in instructions", tr: "Having filtered …, Being loaded first …" },
      { de: "Nominalisation", tr: "the treatment of the surface" },
      { de: "Perfect modals", tr: "must have been caused / can't have been done" },
      { de: "Inversion: Nowhere is it written …", tr: "kuralı vurgulayarak reddetmek" },
    ],
    canDo: [
      { de: "I can describe a process step by step in the passive.", tr: "Bir süreci edilgen yapıyla adım adım anlatabiliyorum.", en: "I can describe a process step by step in the passive." },
      { de: "I can report what was checked and what was not.", tr: "Neyin kontrol edildiğini, neyin edilmediğini bildirebiliyorum.", en: "I can report what was checked and what was not." },
      { de: "I can write an incident report without blaming a person.", tr: "Kişiyi suçlamadan olay raporu yazabiliyorum.", en: "I can write an incident report without blaming a person." },
      { de: "I can say what must have caused a fault.", tr: "Bir arızaya ne yol açmış olabileceğini söyleyebiliyorum.", en: "I can say what must have caused a fault." },
      { de: "I can point to a written requirement.", tr: "Yazılı bir gerekliliğe işaret edebiliyorum.", en: "I can point to a written requirement." },
    ],
    listening: {
      title: "After the outage",
      titleTr: "Kesintiden sonra",
      situation: "İki teknik sorumlu bir arızanın sebebini konuşuyor.",
      turns: [
        { speaker: "Engineer", de: "It is reported that the sensor was calibrated in May. The entry in the manual says nothing.", tr: "Sensörün mayısta ayarlandığı bildiriliyor. Kılavuzdaki kayıtta bir şey yazmıyor." },
        { speaker: "Manager", de: "Then the disruption must have been caused by the update, not by the sensor.", tr: "O hâlde kesintiye sensör değil, güncelleme yol açmış olmalı." },
        { speaker: "Engineer", de: "The maintenance can't have been done last week; the inventory shows no entry at all.", tr: "Bakım geçen hafta yapılmış olamaz; envanterde hiç kayıt yok." },
        { speaker: "Manager", de: "Someone should have lowered the pressure before the trial. Being loaded first, the crate stayed in the workshop.", tr: "Denemeden önce basıncın düşürülmesi gerekirdi. İlk yüklendiği için sandık atölyede kaldı." },
        { speaker: "Engineer", de: "Nowhere is it written that a second check is optional. That is the guideline, not my opinion.", tr: "İkinci kontrolün isteğe bağlı olduğu hiçbir yerde yazmıyor. Bu kılavuz, benim görüşüm değil." },
        { speaker: "Manager", de: "Agreed. Having read the provision again, I think the deviation was within the guideline.", tr: "Katılıyorum. Hükmü yeniden okuyunca sapmanın kılavuz içinde olduğunu düşünüyorum." },
        { speaker: "Engineer", de: "By Friday the pilot will have been finished, and the report is written by the workshop.", tr: "Cumaya kadar pilot bitmiş olacak, rapor da atölye tarafından yazılıyor." },
        { speaker: "Manager", de: "Apparently the whole outage lasted roughly two hours; hence the loss is modest.", tr: "Güzel. Görünüşe göre kesinti kabaca iki saat sürmüş; dolayısıyla zarar ölçülü." },
      ],
      questions: [
        { de: "What must have caused the disruption?", tr: "Kesintiye ne yol açmış olmalı?", options: ["The update", "The sensor", "The crate", "The pressure"], answer: 0 },
        { de: "Why is the engineer sure that the maintenance was not done?", tr: "Teknik sorumlu bakımın yapılmadığından neden emin?", options: ["There is no entry in the inventory", "The manual is new", "The workshop was closed", "The sensor failed"], answer: 0 },
        { de: "What does „Nowhere is it written that a second check is optional“ do?", tr: "„Nowhere is it written that a second check is optional“ ne yapıyor?", options: ["It appeals to a written rule and rejects the excuse", "It admits a mistake", "It asks for permission", "It reports a measurement"], answer: 0 },
      ],
    },
    reading: {
      title: "Maintenance notice — the new procedure",
      titleTr: "Süreç duyurusu",
      genre: "Duyuru",
      text: "MAINTENANCE NOTICE — THE NEW PROCEDURE\n\nFrom 1 June the treatment of the surface is carried out in two steps.\n\nStep one: having filtered the liquid, the component is loaded into the crate. Being easily damaged by heat, the glue is applied only after the gauge has been read.\n\nStep two: once completed, the entry is made in the inventory. The quantity and the deviation from the guideline are recorded in the same row. Nowhere is it written that this row may be left empty.\n\nIt is reported that the last outage was caused by a missing entry. The maintenance is therefore checked twice: by the workshop and, at the end of the week, by the manager.\n\nBy the end of June the new procedure will have been tested on the pilot line. Should a fault appear, the trial is stopped and the parameter is verified before the work is resumed.",
      questions: [
        { de: "When is the glue applied?", tr: "Tutkal ne zaman uygulanıyor?", options: ["After the gauge has been read", "Before the liquid is filtered", "At the end of the week", "Only on the pilot line"], answer: 0 },
        { de: "What happens if a fault appears?", tr: "Bir arıza çıkarsa ne oluyor?", options: ["The trial is stopped and the parameter is verified", "The entry is deleted", "The manager repeats stage one", "The crate is unloaded"], answer: 0 },
        { de: "What does „It is reported that the last outage was caused …“ show?", tr: "„It is reported that the last outage was caused …“ neyi gösteriyor?", options: ["An account whose source is not named", "A decision of the workshop", "A measured fact of this notice", "A warning for the future"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir arızanın sebebini tahminle bildiriyorsun.", de: "The disruption must have been caused by the update, not by the sensor.", tr: "Kesintiye sensör değil, güncelleme yol açmış olmalı." },
      { situation: "Yazılı bir gerekliliğe işaret ediyorsun.", de: "Nowhere is it written that the second check is optional.", tr: "İkinci kontrolün isteğe bağlı olduğu hiçbir yerde yazmıyor." },
    ],
    writing: {
      prompt: "Bir arıza hakkında kısa bir olay raporu yaz: ne yapıldı, ne bulundu, ne öneriliyor.",
      checklist: [
        "Olayı tarih ve süreyle başa yaz",
        "Yapılanları edilgen yapıyla say („the sensor was checked …“)",
        "Bir sebep tahmini kur („must have been caused by …“)",
        "İsimleştirme kullan („the treatment of …“, „the maintenance of …“)",
        "Bir öneri ve bir sonraki adımı yaz",
      ],
      minWords: 90,
      phrases: [
        { de: "The fault was noticed at … on …", tr: "Arıza …-de saat …-de görüldü", en: "The fault was noticed at … on …" },
        { de: "The sensor was checked and the entry was made.", tr: "Sensör kontrol edildi ve kayıt düşüldü", en: "The sensor was checked and the entry was made." },
        { de: "The outage must have been caused by …", tr: "Kesintiye … yol açmış olmalı", en: "The outage must have been caused by …" },
        { de: "The maintenance of … is carried out twice.", tr: "…-in bakımı iki kez yapılıyor", en: "The maintenance of … is carried out twice." },
        { de: "It is recommended that … be verified.", tr: "…-in doğrulanması öneriliyor", en: "It is recommended that … be verified." },
      ],
      sample:
        "INCIDENT REPORT — PILOT LINE\n\nThe fault was noticed at 14:20 on 3 June and lasted roughly two hours.\n\nThe sensor was checked first and no deviation was found. The entry for the last maintenance was missing from the inventory, and the gauge had not been read before the glue was applied. The outage must have been caused by the update, because the parameter was changed on the same morning.\n\nThe treatment of the surface is now carried out in two steps, and the maintenance of the line is checked twice. It is recommended that every entry be verified by the workshop before the trial is resumed.",
    },
  },

  {
    level: "B2",
    index: 3,
    code: "B2.4",
    titleDe: "Media and reported speech",
    titleTr: "Medya ve aktarılan söz",
    focus: [
      { de: "It is claimed that … / is thought to have been …", tr: "iddiayı sahibine bağlamak" },
      { de: "Participle clauses", tr: "Having read the editorial, …" },
      { de: "Cleft sentences", tr: "What the paper argues is …" },
      { de: "Perfect modals", tr: "must have been / should have checked" },
      { de: "Inversion", tr: "Never before has such a case …" },
    ],
    canDo: [
      { de: "I can read a headline critically.", tr: "Bir haber başlığını eleştirel okuyabiliyorum.", en: "I can read a headline critically." },
      { de: "I can attribute a quotation to its source.", tr: "Bir alıntıyı kaynağına bağlayabiliyorum.", en: "I can attribute a quotation to its source." },
      { de: "I can write a press summary that separates fact and claim.", tr: "Olguyu iddiadan ayıran bir basın özeti yazabiliyorum.", en: "I can write a press summary that separates fact and claim." },
      { de: "I can check a claim against the method behind it.", tr: "Bir iddiayı arkasındaki yöntemle sınayabiliyorum.", en: "I can check a claim against the method behind it." },
      { de: "I can say what a correction does and does not admit.", tr: "Bir düzeltmenin neyi kabul ettiğini, neyi etmediğini söyleyebiliyorum.", en: "I can say what a correction does and does not admit." },
    ],
    listening: {
      title: "Before the correction",
      titleTr: "Düzeltmeden önce",
      situation: "Bir yayın toplantısında bir iddianın doğruluğu tartışılıyor.",
      turns: [
        { speaker: "Editor", de: "The figures are said to show a fall in circulation. Where does the number come from?", tr: "Rakamların tirajda düşüş gösterdiği söyleniyor. Sayı nereden geliyor?" },
        { speaker: "Reporter", de: "From a database. Having read the editorial, I asked the publisher for the methodology.", tr: "Bir veri tabanından. Başyazıyı okuyunca yayıncıdan yöntemi istedim." },
        { speaker: "Researcher", de: "It seems to have been taken from a projection, not from a survey. That is a contradiction.", tr: "Ölçümden değil, bir tahminden alınmış görünüyor. Bu bir çelişki." },
        { speaker: "Editor", de: "We should have checked the attribution before the story was broadcast.", tr: "Haber yayınlanmadan önce kaynağı kontrol etmemiz gerekirdi." },
        { speaker: "Reporter", de: "What the paper argues is accountability; the bias must have been there from the start.", tr: "Gazetenin savunduğu şey hesap verebilirlik; yanlılık başından beri orada olmalı." },
        { speaker: "Researcher", de: "Apparently the intern paraphrased the quotation. The consent for the name was never given.", tr: "Görünüşe göre stajyer alıntıyı kendi sözcükleriyle yazmış. Ad için rıza hiç alınmamış." },
        { speaker: "Editor", de: "Then a correction is published tomorrow. Never before has such a case reached the hearing.", tr: "O hâlde yarın bir düzeltme yayımlanıyor. Böyle bir olay daha önce hiç duruşmaya gitmedi." },
        { speaker: "Reporter", de: "By Friday the correction will have been printed, and the relevance of the story is reviewed.", tr: "Cumaya kadar düzeltme basılmış olacak, haberin önemi de gözden geçiriliyor." },
      ],
      questions: [
        { de: "Where does the number seem to come from?", tr: "Sayı nereden geliyor gibi görünüyor?", options: ["From a projection", "From a measurement", "From the publisher's letter", "From the intern's own notes"], answer: 0 },
        { de: "What was never given?", tr: "Hiç alınmayan şey ne?", options: ["The consent for the name", "The methodology", "The correction", "The database entry"], answer: 0 },
        { de: "What does „We should have checked the attribution“ admit?", tr: "„We should have checked the attribution“ neyi kabul ediyor?", options: ["An omission by the paper itself", "A mistake of the researcher", "A rule of the database", "A claim of the publisher"], answer: 0 },
      ],
    },
    reading: {
      title: "Correction and a reader's reply",
      titleTr: "Düzeltme ve okur cevabı",
      genre: "Okur mektubu",
      text: "CORRECTION\n\nIn our report of 12 May it was stated that the circulation of the magazine had fallen by a quarter. The figure was taken from a projection and not from a survey. The publisher, whose letter reached us on 14 May, is right on this point. We regret the mistake.\n\n*\n\nA reader writes:\n\nThank you for the correction, which however admits less than it appears to. What the paper argues is that a single figure was wrong; what is missing is the question of how it was chosen.\n\nHaving read both texts, I note that the quotation was paraphrased by an intern and that no consent was given for the name. Never before has an outlet of this size explained so little about its own methodology. Only in the last line is the database mentioned at all.\n\nThe mistake must have been noticed earlier. In that case a correction on page two is not sufficient.\n\nT. Aksoy",
      questions: [
        { de: "What was wrong in the report of 12 May?", tr: "12 Mayıs haberinde yanlış olan ne?", options: ["The figure came from a projection", "The publisher's name", "The date of the letter", "The size of the outlet"], answer: 0 },
        { de: "What does the reader say is missing?", tr: "Okura göre eksik olan ne?", options: ["How the figure was chosen", "The name of the intern", "A second correction", "The letter of the publisher"], answer: 0 },
        { de: "What is the point of „which however admits less than it appears to“?", tr: "„which however admits less than it appears to“ ne demek istiyor?", options: ["The correction looks bigger than it is", "The correction is too long", "The correction repeats the claim", "The correction was published late"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir iddiayı kaynağına bağlıyorsun.", de: "The figures are said to show a fall, but the source is a projection.", tr: "Rakamların düşüş gösterdiği söyleniyor ama kaynak bir tahmin." },
      { situation: "Kendi kurumunun eksiğini kabul ediyorsun.", de: "We should have checked the attribution before the story was broadcast.", tr: "Haber yayınlanmadan önce kaynağı kontrol etmemiz gerekirdi." },
    ],
    writing: {
      prompt: "Bir haberin kısa basın özetini yaz: olguyu iddiadan ayır.",
      stimulus: "Circulation collapses: magazine loses a quarter of its readers",
      checklist: [
        "Başlığın iddiasını aktarımla yaz („It is claimed that …“)",
        "Olguyu ayrı bir cümlede bildir",
        "Kaynağı ve yöntemi belirt („taken from a projection …“)",
        "Bir çekince ya da eksik koy („what is missing is …“)",
        "Sonuç olarak neyin gözden geçirilmesi gerektiğini yaz",
      ],
      minWords: 90,
      phrases: [
        { de: "It is claimed that …", tr: "… olduğu iddia ediliyor", en: "It is claimed that …" },
        { de: "The figure was taken from …", tr: "Rakam …-den alındı", en: "The figure was taken from …" },
        { de: "What the report argues is …", tr: "Haberin savunduğu şey …", en: "What the report argues is …" },
        { de: "What is missing is …", tr: "Eksik olan şey …", en: "What is missing is …" },
        { de: "The relevance of … should therefore be reviewed.", tr: "Bu yüzden …-in önemi gözden geçirilmeli", en: "The relevance of … should therefore be reviewed." },
      ],
      sample:
        "PRESS SUMMARY — 12 MAY\n\nIt is claimed in the headline that the magazine has lost a quarter of its readers. The figure was taken from a projection published by a database; a survey for the same year is not quoted.\n\nWhat the report argues is that the fall is unusual. What is missing is the method: neither the size of the sample nor the year is named, and the quotation from the publisher was paraphrased rather than printed.\n\nThe mistake must have been noticed before the story was broadcast. The relevance of the projection should therefore be reviewed before the piece is repeated.",
    },
  },

  {
    level: "B2",
    index: 4,
    code: "B2.5",
    titleDe: "Science and method",
    titleTr: "Bilim ve teknoloji",
    focus: [
      { de: "It is reported that … / is thought to have been …", tr: "bulguyu aktarmak" },
      { de: "Third conditional", tr: "If the sample had been larger, …" },
      { de: "Inversion", tr: "Never has such a pattern emerged" },
      { de: "Nominalisation", tr: "the automation of the process" },
      { de: "Hedging: seems to be / arguably", tr: "temkinli sonuç" },
    ],
    canDo: [
      { de: "I can explain how a study was carried out.", tr: "Bir çalışmanın nasıl yürütüldüğünü anlatabiliyorum.", en: "I can explain how a study was carried out." },
      { de: "I can describe a measurement and its limits.", tr: "Bir ölçümü ve sınırlarını anlatabiliyorum.", en: "I can describe a measurement and its limits." },
      { de: "I can say what would have followed from a larger sample.", tr: "Daha büyük bir örneklemden ne çıkardı, söyleyebiliyorum.", en: "I can say what would have followed from a larger sample." },
      { de: "I can write a tentative conclusion without overstating it.", tr: "Abartmadan geçici bir sonuç yazabiliyorum.", en: "I can write a tentative conclusion without overstating it." },
      { de: "I can separate what the data shows from what it implies.", tr: "Verinin gösterdiğini ima ettiğinden ayırabiliyorum.", en: "I can separate what the data shows from what it implies." },
    ],
    listening: {
      title: "The sample was too small",
      titleTr: "Örneklem küçüktü",
      situation: "Bir laboratuvar devrinde iki araştırmacı bulguyu tartışıyor.",
      turns: [
        { speaker: "Researcher", de: "It is reported that the experiment was repeated twice. The cohort is thought to have been too small.", tr: "Deneyin iki kez tekrarlandığı bildiriliyor. Kohortun fazla küçük olduğu düşünülüyor." },
        { speaker: "Lecturer", de: "Having heated the liquid, did you add the catalyst at the same frequency?", tr: "Sıvıyı ısıttıktan sonra katalizörü aynı sıklıkta mı eklediniz?" },
        { speaker: "Researcher", de: "Yes, and the measurements remain stable. What the study determines is the limit, not the cause.", tr: "Evet, ölçümler kararlı kalıyor. Çalışmanın belirlediği şey sınır, sebep değil." },
        { speaker: "Lecturer", de: "The team must have neglected one step; the software, which was updated in May, failed once.", tr: "Ekip bir adımı ihmal etmiş olmalı; mayısta güncellenen yazılım bir kez çöktü." },
        { speaker: "Researcher", de: "If the sample had been larger, we would have generalized the finding.", tr: "Örneklem daha büyük olsaydı bulguyu genelleyebilirdik." },
        { speaker: "Lecturer", de: "Never has such a pattern emerged so early. Rarely does a question arise before the second trial.", tr: "Böyle bir örüntü hiç bu kadar erken çıkmadı. İkinci denemeden önce nadiren soru doğar." },
        { speaker: "Researcher", de: "It seems to be a sensible reading. Apparently the first check was rather superficial.", tr: "Makul bir okuma gibi görünüyor. Görünüşe göre ilk kontrol biraz yüzeyseldi." },
        { speaker: "Lecturer", de: "On balance the result is arguably provisional. By June the emissions will have been measured again.", tr: "Her şey bir arada, sonuç tartışmalı biçimde geçici. Hazirana kadar salımlar yeniden ölçülmüş olacak." },
      ],
      questions: [
        { de: "What is thought about the cohort?", tr: "Kohort hakkında ne düşünülüyor?", options: ["It was too small", "It was too big", "It was measured twice", "It was chosen by chance"], answer: 0 },
        { de: "What would have followed from a larger sample?", tr: "Daha büyük bir örneklemden ne çıkardı?", options: ["The finding could have been generalized", "The software would have failed", "The catalyst would have changed", "The trial would have stopped"], answer: 0 },
        { de: "What does „the result is arguably provisional“ express?", tr: "„the result is arguably provisional“ neyi anlatıyor?", options: ["A careful reading, open to change", "A final conclusion", "A statistical mistake", "A rule of the institute"], answer: 0 },
      ],
    },
    reading: {
      title: "Summary of the study",
      titleTr: "Çalışma özeti",
      genre: "Çalışma özeti",
      text: "SUMMARY OF THE STUDY\n\nMethod. The experiment was carried out on two cohorts between January and April. Having heated the liquid, the catalyst was added at a fixed frequency; the reaction was then measured every ten minutes. The automation of the process was introduced in February, so the later measurements are thought to be more exact.\n\nFindings. A pattern emerged in the second cohort only. Never has such a pattern been observed this early, and rarely does a deviation of this size occur twice.\n\nLimits. The sample was small. If the cohort had been larger, the finding could have been generalized; as it stands, the result seems to be provisional. The software, which was updated in May, failed once and one entry had to be recovered by hand.\n\nConclusion. On balance the reading is arguably sensible, but a second trial is required before the hypothesis is specified.",
      questions: [
        { de: "When were the more accurate measurements taken?", tr: "Daha doğru ölçümler ne zaman yapıldı?", options: ["After the automation was introduced", "In January", "Before the catalyst was added", "After the software failed"], answer: 0 },
        { de: "Why could the finding not be generalized?", tr: "Bulgu neden genellenemedi?", options: ["The sample was small", "The reaction was too slow", "The cohorts were mixed", "The entry was lost"], answer: 0 },
        { de: "What does the word „provisional“ do in the Limits section?", tr: "„provisional“ sözcüğü Sınırlar bölümünde ne yapıyor?", options: ["It marks the result as open to change", "It states that the result is wrong", "It names the method", "It reports another team's claim"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir bulgunun sınırını söylüyorsun.", de: "If the sample had been larger, we would have generalized the finding.", tr: "Örneklem daha büyük olsaydı bulguyu genelleyebilirdik." },
      { situation: "Temkinli bir sonuç bildiriyorsun.", de: "On balance the result is arguably provisional and a second trial is required.", tr: "Her şey bir arada sonuç geçici sayılır ve ikinci bir deneme gerekiyor." },
    ],
    writing: {
      prompt: "Bir çalışmanın geçici sonuç notunu yaz.",
      checklist: [
        "Yöntemi kısaca yaz (edilgen yapı)",
        "Bulguyu bir cümlede bildir",
        "Sınırı yaz ve bir „If … had …“ cümlesi kur",
        "İsimleştirme kullan („the automation of …“)",
        "Temkinli bir sonuçla kapat („seems to be“, „arguably“)",
      ],
      minWords: 90,
      phrases: [
        { de: "The experiment was carried out on …", tr: "Deney … üzerinde yürütüldü", en: "The experiment was carried out on …" },
        { de: "The measurements are thought to be …", tr: "Ölçümlerin … olduğu düşünülüyor", en: "The measurements are thought to be …" },
        { de: "If the sample had been larger, …", tr: "Örneklem daha büyük olsaydı, …", en: "If the sample had been larger, …" },
        { de: "The automation of the process …", tr: "Sürecin otomasyonu …", en: "The automation of the process …" },
        { de: "On balance the result seems to be …", tr: "Her şey bir arada sonuç … görünüyor", en: "On balance the result seems to be …" },
      ],
      sample:
        "TENTATIVE CONCLUSION\n\nThe experiment was carried out on two cohorts between January and April. Having heated the liquid, the catalyst was added at a fixed frequency and the reaction was measured every ten minutes. The automation of the process was introduced in February; the later measurements are therefore thought to be more exact.\n\nA pattern emerged in the second cohort only, and the deviation occurred twice. The sample, however, was small. If the cohort had been larger, the finding could have been generalized.\n\nOn balance the result seems to be provisional rather than clear, and a second trial is arguably required before the hypothesis is specified.",
    },
  },

  {
    level: "B2",
    index: 5,
    code: "B2.6",
    titleDe: "Society and the economy",
    titleTr: "Toplum ve ekonomi",
    focus: [
      { de: "Cleft sentences", tr: "What drives the price is …" },
      { de: "Nominalisation", tr: "the measurement of inequality" },
      { de: "Participle clauses", tr: "Facing a housing shortage, …" },
      { de: "Inversion", tr: "Never has turnout been so low" },
      { de: "Hedging: plausible / questionable", tr: "iddiayı ölçülü tartmak" },
    ],
    canDo: [
      { de: "I can read a report about inequality and name its measure.", tr: "Eşitsizlik raporunu okuyup ölçüsünü adlandırabiliyorum.", en: "I can read a report about inequality and name its measure." },
      { de: "I can explain what drives a price.", tr: "Bir fiyatı neyin sürüklediğini açıklayabiliyorum.", en: "I can explain what drives a price." },
      { de: "I can describe who is affected by a measure.", tr: "Bir tedbirden kimin etkilendiğini anlatabiliyorum.", en: "I can describe who is affected by a measure." },
      { de: "I can discuss a draft law and its enforcement.", tr: "Bir kanun tasarısını ve uygulanmasını tartışabiliyorum.", en: "I can discuss a draft law and its enforcement." },
      { de: "I can speak about a group without a generalisation.", tr: "Bir kesim hakkında genelleme yapmadan konuşabiliyorum.", en: "I can speak about a group without a generalisation." },
    ],
    listening: {
      title: "Rents and the new law",
      titleTr: "Kiralar ve yeni kanun",
      situation: "Bir radyo tartışmasında iki uzman konut sorununu konuşuyor.",
      turns: [
        { speaker: "Presenter", de: "The housing shortage is said to be worst in this district. What drives the price here?", tr: "Konut sıkıntısının bu ilçede en ağır olduğu söyleniyor. Fiyatı burada ne sürüklüyor?" },
        { speaker: "Researcher", de: "What drives the price is not inflation alone; it was the interest rate that changed first.", tr: "Fiyatı sürükleyen tek şey enflasyon değil; ilk değişen faiz oranı oldu." },
        { speaker: "Official", de: "Facing a housing shortage, many families moved out. The measurement of inequality begins there.", tr: "Konut sıkıntısıyla karşılaşan birçok aile taşındı. Eşitsizliğin ölçümü orada başlıyor." },
        { speaker: "Researcher", de: "Built quickly, the new residential area is already overcrowded and the green space was never funded.", tr: "Hızla inşa edilen yeni yerleşim alanı zaten aşırı kalabalık ve yeşil alan hiç fonlanmadı." },
        { speaker: "Official", de: "The draft law must have been unclear; they can't have read the regulation before the vote.", tr: "Kanun tasarısı belirsiz olmalı; oylamadan önce düzenlemeyi okumuş olamazlar." },
        { speaker: "Presenter", de: "Never has voter turnout been so low in this ward. Is that connected?", tr: "Bu bölgede seçmen katılımı hiç bu kadar düşük olmadı. Bağlantılı mı?" },
        { speaker: "Researcher", de: "Apparently the claim is plausible, but on balance the figure is arguably questionable.", tr: "Görünüşe göre bu iddia makul ama her şey bir arada, rakam tartışmalı biçimde kuşkulu." },
        { speaker: "Official", de: "In a sense, yes. We should have funded enforcement; by spring the upturn will have started.", tr: "Bir bakıma evet. Uygulamayı fonlamamız gerekirdi; ilkbahara kadar toparlanma başlamış olacak." },
      ],
      questions: [
        { de: "What changed first, according to the researcher?", tr: "Araştırmacıya göre ilk ne değişti?", options: ["The interest rate", "Inflation", "The draft law", "Voter turnout"], answer: 0 },
        { de: "What was never funded in the new area?", tr: "Yeni alanda hiç fonlanmayan şey ne?", options: ["The green space", "The enforcement of the law", "The residential blocks", "The measurement"], answer: 0 },
        { de: "What does „the figure is arguably questionable“ do?", tr: "„the figure is arguably questionable“ ne yapıyor?", options: ["It weakens the claim without rejecting it", "It rejects the claim completely", "It accepts the claim", "It names the source"], answer: 0 },
      ],
    },
    reading: {
      title: "Who pays for the shortage?",
      titleTr: "Gazete yorumu",
      genre: "Gazete yorumu",
      text: "WHO PAYS FOR THE SHORTAGE?\n\nRents are said to be rising because of inflation. What drives the price, however, is the interest rate: it was the rate that changed first, and the housing shortage followed.\n\nFacing that shortage, families with a modest income left the district. Built quickly, the new residential area is overcrowded and the promised green space has not been funded. The measurement of inequality begins with this kind of move, not with the national budget.\n\nNever has voter turnout in the ward been so low. Admittedly the connection is questionable; a single election proves nothing. Nonetheless, the claim that nobody noticed is by no means plausible: the law was discussed twice.\n\nWe should have funded enforcement rather than the campaign. In a sense, the price of the shortage is being paid by the group that was named in every speech and consulted in none.",
      questions: [
        { de: "What does the writer say drives the price?", tr: "Yazara göre fiyatı ne sürüklüyor?", options: ["The interest rate", "Inflation alone", "The national budget", "The election campaign"], answer: 0 },
        { de: "What has not been funded?", tr: "Fonlanmayan şey ne?", options: ["The promised green space", "The new residential area", "The draft law", "The measurement"], answer: 0 },
        { de: "What is the point of the last line?", tr: "Son cümlenin vurgusu ne?", options: ["The affected group was talked about but never asked", "The group refused to vote", "The speeches were too long", "The shortage is over"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir fiyat hareketini açıklıyorsun.", de: "What drives the price is not inflation alone but the interest rate.", tr: "Fiyatı sürükleyen tek şey enflasyon değil, faiz oranı." },
      { situation: "Bir iddiayı ölçülü tartıyorsun.", de: "Apparently the claim is plausible, but on balance the figure is questionable.", tr: "Görünüşe göre iddia makul ama her şey bir arada rakam kuşkulu." },
    ],
    writing: {
      prompt: "Bir gazete yorumuna cevap yazısı yaz.",
      stimulus: "Rents are rising because people want to live in the centre — the market will solve it.",
      checklist: [
        "Hangi yazıya cevap verdiğini yaz",
        "Bir yarma cümlesiyle asıl sebebi koy („What drives … is …“)",
        "Bir isimleştirme kullan („the measurement of …“)",
        "Karşı görüşe ölçülü yer ver („admittedly“, „nonetheless“)",
        "Somut bir talebi ya da sonucu yaz",
      ],
      minWords: 90,
      phrases: [
        { de: "In your piece of … it is claimed that …", tr: "… tarihli yazınızda … iddia ediliyor", en: "In your piece of … it is claimed that …" },
        { de: "What drives … is …", tr: "…-i sürükleyen şey …", en: "What drives … is …" },
        { de: "The measurement of … begins with …", tr: "…-in ölçümü … ile başlıyor", en: "The measurement of … begins with …" },
        { de: "Admittedly …; nonetheless, …", tr: "Doğrusu …; yine de …", en: "Admittedly …; nonetheless, …" },
        { de: "We should have funded … rather than …", tr: "…-i değil …-i fonlamamız gerekirdi", en: "We should have funded … rather than …" },
      ],
      sample:
        "Dear Editor,\n\nin your piece of 9 May it is claimed that rents are rising because everybody wants to live in the centre. What drives the price, however, is the interest rate: it was the rate that changed first, and the shortage followed.\n\nThe measurement of inequality begins with the families who left the district, not with the national budget. Built quickly, the new area is overcrowded and the green space has not been funded.\n\nAdmittedly the market is part of the answer; nonetheless, the claim that it will solve the problem alone is by no means plausible. We should have funded enforcement rather than another campaign.\n\nYours faithfully,\nK. Demir",
    },
  },

  {
    level: "B2",
    index: 6,
    code: "B2.7",
    titleDe: "Culture and the arts",
    titleTr: "Kültür ve sanat",
    focus: [
      { de: "Cleft sentences", tr: "What the play does is …" },
      { de: "Participle clauses", tr: "Having watched her rehearse, …" },
      { de: "Third conditional", tr: "If she had portrayed it, …" },
      { de: "Inversion", tr: "Never has a defeat caused such outrage" },
      { de: "Tact: opposing view / counterargument", tr: "beğenmediğini incelikle söylemek" },
    ],
    canDo: [
      { de: "I can read a catalogue entry and name what it claims.", tr: "Bir katalog künyesini okuyup neyi savunduğunu adlandırabiliyorum.", en: "I can read a catalogue entry and name what it claims." },
      { de: "I can say what a play or a film actually does.", tr: "Bir oyunun ya da filmin ne yaptığını söyleyebiliyorum.", en: "I can say what a play or a film actually does." },
      { de: "I can describe a performance and its shortcomings.", tr: "Bir temsili ve eksiklerini anlatabiliyorum.", en: "I can describe a performance and its shortcomings." },
      { de: "I can disagree with a review with tact.", tr: "Bir eleştiriye incelikle karşı çıkabiliyorum.", en: "I can disagree with a review with tact." },
      { de: "I can say that I disliked something without being rude.", tr: "Bir şeyi beğenmediğimi kabalaşmadan söyleyebiliyorum.", en: "I can say that I disliked something without being rude." },
    ],
    listening: {
      title: "After the second act",
      titleTr: "İkinci perdeden sonra",
      situation: "İki seyirci temsilden sonra oyunu tartışıyor.",
      turns: [
        { speaker: "Visitor", de: "What the play does is name the cost of the era. The context was clear from the first scene.", tr: "Oyunun yaptığı şey o dönemin bedelini adlandırmak. Bağlam ilk sahneden belliydi." },
        { speaker: "Critic", de: "In that respect I agree. The ending, however, must have been hasty.", tr: "Bu açıdan katılıyorum. Ancak final aceleci olmalı." },
        { speaker: "Visitor", de: "Having watched the company rehearse, I expected a grand depiction of the last night.", tr: "Topluluğun provasını izlemiş olarak son gecenin görkemli bir betimini bekliyordum." },
        { speaker: "Critic", de: "If she had portrayed the room, the work would have been convincing, especially since the start was strong.", tr: "Odayı betimlemiş olsaydı eser ikna edici olurdu, hele başlangıç güçlüyken." },
        { speaker: "Visitor", de: "That is an opposing view, and a fair one. They can't have missed the shortcoming themselves.", tr: "Bu karşı bir görüş ve haklı bir görüş. Eksiği kendileri de kaçırmış olamaz." },
        { speaker: "Critic", de: "Never has a premiere in this hall caused such applause and such doubt at once.", tr: "Bu salonda bir prömiyer hiç aynı anda bu kadar alkış ve bu kadar kuşku toplamadı." },
        { speaker: "Visitor", de: "Apparently the jury was carried away. On balance the interpretation is arguably monotonous.", tr: "Görünüşe göre jüri sürüklenmiş. Her şey bir arada, yorum tartışmalı biçimde tekdüze." },
        { speaker: "Critic", de: "I would put it with more moderation: entertaining, worth seeing, but not timeless.", tr: "Ben daha ölçülü söylerdim: eğlenceli, görülmeye değer ama zamansız değil." },
      ],
      questions: [
        { de: "What does the visitor say the play does?", tr: "Seyirciye göre oyun ne yapıyor?", options: ["It names the cost of the era", "It changes the ending", "It copies an older work", "It avoids the context"], answer: 0 },
        { de: "What would have made the work convincing, in the critic's view?", tr: "Eleştirmene göre eseri ne ikna edici kılardı?", options: ["A depiction of the room", "A shorter first act", "A different jury", "More applause"], answer: 0 },
        { de: "How does the critic close the conversation?", tr: "Eleştirmen konuşmayı nasıl kapatıyor?", options: ["With moderation: worth seeing but not timeless", "By calling the play a failure", "By agreeing with the jury", "By refusing to judge"], answer: 0 },
      ],
    },
    reading: {
      title: "A strong start and a hasty end",
      titleTr: "Sahne eleştirisi",
      genre: "Sanat eleştirisi",
      text: "A STRONG START AND A HASTY END\n\nThe premiere was said to be the highlight of the season, and for two acts the claim held.\n\nWhat the drama does is name the cost of an era without turning it into a parody. Having rehearsed for three months, the company plays the first scenes with a persistence that fascinates: the worldview of the period is carried by the costumes, not by a speech.\n\nThen the ending. The last act must have been cut at short notice: the depiction of the final night is neither grand nor revealing; it just stops. If the director had portrayed the empty room, the tragedy would have landed. As it is, the audience applauds the performers and leaves the work open.\n\nNever has a premiere in this hall divided a jury so sharply. On balance the evening is arguably worth seeing — especially since the first hour is undisputed — but it is not timeless.",
      questions: [
        { de: "How does the company carry the worldview of the period?", tr: "Topluluk dönemin dünya görüşünü nasıl taşıyor?", options: ["Through the costumes", "Through a long speech", "Through the music", "Through the parody"], answer: 0 },
        { de: "What is the critic's judgement of the last act?", tr: "Eleştirmenin son perde hakkındaki yargısı ne?", options: ["It seems to have been cut at short notice", "It was the strongest part", "It repeated the first act", "It was changed by the jury"], answer: 0 },
        { de: "What does „arguably worth seeing … but not timeless“ show?", tr: "„arguably worth seeing … but not timeless“ neyi gösteriyor?", options: ["A measured view with a reservation", "A complete rejection", "A strong recommendation", "A neutral description"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir eserin ne yaptığını söylüyorsun.", de: "What the play does is name the cost of the era without a parody.", tr: "Oyunun yaptığı şey, parodiye kaçmadan o dönemin bedelini adlandırmak." },
      { situation: "Beğenmediğini incelikle söylüyorsun.", de: "I would put it with more moderation: entertaining, but arguably not timeless.", tr: "Daha ölçülü söylerdim: eğlenceli ama zamansız sayılmaz." },
    ],
    writing: {
      prompt: "Gördüğün bir etkinlik hakkında kısa bir eleştiri yaz.",
      checklist: [
        "Etkinliği ve beklentiyi başa yaz",
        "Bir yarma cümlesiyle eserin ne yaptığını söyle",
        "Bir eksiği „must have been“ ya da „if … had …“ ile koy",
        "Karşı görüşe yer ver („opposing view“, „counterargument“)",
        "Ölçülü bir yargıyla kapat",
      ],
      minWords: 90,
      phrases: [
        { de: "The premiere was said to be …", tr: "Prömiyerin … olduğu söyleniyordu", en: "The premiere was said to be …" },
        { de: "What the play does is …", tr: "Oyunun yaptığı şey …", en: "What the play does is …" },
        { de: "The ending must have been …", tr: "Final … olmalı", en: "The ending must have been …" },
        { de: "If the director had …, the work would have …", tr: "Yönetmen … yapsaydı eser … olurdu", en: "If the director had …, the work would have …" },
        { de: "On balance it is arguably worth seeing.", tr: "Her şey bir arada görülmeye değer sayılır", en: "On balance it is arguably worth seeing." },
      ],
      sample:
        "THE CONCERT IN THE OLD HALL\n\nThe evening was said to be the highlight of the festival, and for an hour the claim held.\n\nWhat the programme does is place two eras next to each other without explaining either. Having rehearsed together for only a week, the performers still play the first pieces with a persistence that fascinates.\n\nThe last piece, however, must have been chosen at short notice: it is neither grand nor revealing. If the conductor had kept the quiet ending, the evening would have landed.\n\nAn opposing view is possible, especially since the applause was long. On balance the concert is arguably worth hearing, but it is not the highlight.",
    },
  },

  {
    level: "B2",
    index: 7,
    code: "B2.8",
    titleDe: "Money and career",
    titleTr: "Para ve kariyer stratejisi",
    focus: [
      { de: "Cleft sentences", tr: "What decides a career is …" },
      { de: "Nominalisation", tr: "the preparation of the cost estimate" },
      { de: "Participle clauses", tr: "Having read the personnel file, …" },
      { de: "Third conditional", tr: "If the insurance had covered it, …" },
      { de: "Future perfect", tr: "By December we will have …" },
    ],
    canDo: [
      { de: "I can read a cost report and name what is missing.", tr: "Bir maliyet raporunu okuyup eksiğini adlandırabiliyorum.", en: "I can read a cost report and name what is missing." },
      { de: "I can say what decides a career in my field.", tr: "Alanımda kariyeri neyin belirlediğini söyleyebiliyorum.", en: "I can say what decides a career in my field." },
      { de: "I can understand a contract term and a notice period.", tr: "Bir sözleşme süresini ve ihbar süresini anlayabiliyorum.", en: "I can understand a contract term and a notice period." },
      { de: "I can negotiate conditions in writing.", tr: "Koşulları yazılı olarak müzakere edebiliyorum.", en: "I can negotiate conditions in writing." },
      { de: "I can ask about a raise without putting the other side in a corner.", tr: "Karşı tarafı köşeye sıkıştırmadan zam sorabiliyorum.", en: "I can ask about a raise without putting the other side in a corner." },
    ],
    listening: {
      title: "The salary conversation",
      titleTr: "Maaş görüşmesi",
      situation: "Bir çalışan ile yöneticisi zam ve koşulları görüşüyor.",
      turns: [
        { speaker: "Manager", de: "Having read the personnel file, I can see the case. The budget plan, however, is fixed until December.", tr: "Personel dosyasını okuyunca durumu görüyorum. Ancak bütçe planı aralığa kadar sabit." },
        { speaker: "Colleague", de: "What decides a career here is not the hourly wage but the chance of promotion.", tr: "Burada kariyeri belirleyen şey saat ücreti değil, terfi şansı." },
        { speaker: "Manager", de: "That is fair. The profitability is expected to fall, so a raise was refused for operational reasons.", tr: "Bu haklı. Kârlılığın düşmesi bekleniyor, bu yüzden zam işletme gerekçesiyle reddedildi." },
        { speaker: "Colleague", de: "If the liability insurance had covered the last project, we would have saved the whole sum.", tr: "Sorumluluk sigortası son projeyi kapsasaydı bütün tutarı kurtarmış olurduk." },
        { speaker: "Manager", de: "They can't have signed that clause without a check. We should have asked for an interest-free plan.", tr: "O maddeyi kontrol etmeden imzalamış olamazlar. Faizsiz bir plan istememiz gerekirdi." },
        { speaker: "Colleague", de: "Then let us talk about flextime. A permanent position matters more to me than a bonus.", tr: "O hâlde esnek çalışmayı konuşalım. Kalıcı kadro benim için ikramiyeden önemli." },
        { speaker: "Manager", de: "By December we will have decided on the fixed-term contracts.", tr: "Aralığa kadar belirli süreli sözleşmelere karar vermiş olacağız." },
        { speaker: "Colleague", de: "Then I will put the two conditions in writing, and we can comply with the works council rule.", tr: "O hâlde iki koşulu yazıya geçireceğim, böylece işçi temsilciliği kuralına da uyarız." },
      ],
      questions: [
        { de: "What decides a career, according to the colleague?", tr: "Meslektaşa göre kariyeri ne belirliyor?", options: ["The chance of promotion", "The hourly wage", "The bonus", "The notice period"], answer: 0 },
        { de: "Why was the raise refused?", tr: "Zam neden reddedildi?", options: ["For operational reasons", "Because the file was missing", "Because of the works council", "Because the contract ended"], answer: 0 },
        { de: "What does the colleague ask for instead of a bonus?", tr: "Meslektaş ikramiye yerine ne istiyor?", options: ["Flextime and a permanent position", "A longer notice period", "An interest-free loan", "A new personnel file"], answer: 0 },
      ],
    },
    reading: {
      title: "Reading your contract: five clauses",
      titleTr: "Sözleşme rehberi",
      genre: "Rehber yazısı",
      text: "READING YOUR CONTRACT: FIVE CLAUSES THAT BIND YOU\n\n1 — The contract term. A fixed term ends by itself; a permanent position does not. What decides your planning is this line, not the salary.\n\n2 — The notice period. The preparation of a handover takes weeks, so a short period helps you and your employer equally.\n\n3 — Insurance. Liability insurance covers damage caused at work; the company pension is separate. If the insurance had covered every case, the clause would be shorter.\n\n4 — Payment. The due date and the late fee are named in the same sentence.\n\n5 — Time off. Your vacation entitlement is proportional to the months worked. A raise may be refused for operational reasons, but time off may not.\n\nBy the end of the year most readers will have signed something like this. Read clause two twice: it is the one that is arguably the hardest to change later.",
      questions: [
        { de: "Which clause decides your planning, according to the guide?", tr: "Rehbere göre planlamanı hangi madde belirliyor?", options: ["The contract term", "The payment clause", "The insurance clause", "The time-off clause"], answer: 0 },
        { de: "What may not be refused for operational reasons?", tr: "İşletme gerekçesiyle reddedilemeyen şey ne?", options: ["Time off", "A raise", "A permanent position", "A handover"], answer: 0 },
        { de: "Why does the guide say „read clause two twice“?", tr: "Rehber neden „ikinci maddeyi iki kez oku“ diyor?", options: ["Because it is the hardest to change later", "Because it is the shortest", "Because it names the salary", "Because it is often missing"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Zam görüşmesinde önceliğini söylüyorsun.", de: "What decides a career here is not the wage but the chance of promotion.", tr: "Burada kariyeri belirleyen şey ücret değil, terfi şansı." },
      { situation: "Bir koşulu müzakere ediyorsun.", de: "If the insurance had covered the project, we would have saved the whole sum.", tr: "Sigorta projeyi kapsasaydı bütün tutarı kurtarmış olurduk." },
    ],
    writing: {
      prompt: "Koşulları müzakere eden bir e-posta yaz.",
      stimulus: "Unfortunately a raise is not possible this year for operational reasons.",
      checklist: [
        "Gelen cevaba atıf yap ve anladığını göster",
        "Bir yarma cümlesiyle asıl önceliğini koy",
        "İsimleştirme kullan („the preparation of …“)",
        "Bir „If … had …“ ile geçmiş bir kararı tart",
        "İki somut koşulla ve bir süreyle kapat",
      ],
      minWords: 90,
      phrases: [
        { de: "Thank you for your reply of …", tr: "… tarihli cevabınız için teşekkürler", en: "Thank you for your reply of …" },
        { de: "What matters most to me is …", tr: "Benim için en önemli olan …", en: "What matters most to me is …" },
        { de: "The preparation of the handover takes …", tr: "Devrin hazırlanması … sürüyor", en: "The preparation of the handover takes …" },
        { de: "If the budget had allowed it, …", tr: "Bütçe izin verseydi, …", en: "If the budget had allowed it, …" },
        { de: "By December we will have …", tr: "Aralığa kadar … yapmış olacağız", en: "By December we will have …" },
      ],
      sample:
        "Dear Ms Renner,\n\nthank you for your reply of 6 May. I understand that a raise is not possible this year for operational reasons, and I am not asking you to reopen the budget plan.\n\nWhat matters most to me is not the hourly wage but the chance of promotion and a reliable schedule. If the budget had allowed a raise, I would of course have accepted it; as it stands, two other conditions would be worth more to me: flextime from September and a permanent position at the end of the fixed term.\n\nThe preparation of the handover takes three weeks, so an early decision helps both sides. Could we agree the two points before December?\n\nBest regards,\nS. Kaya",
    },
  },

  {
    level: "B2",
    index: 8,
    code: "B2.9",
    titleDe: "Relationships and psychology",
    titleTr: "İnsan ilişkileri ve psikoloji",
    focus: [
      { de: "Cleft sentences", tr: "What really hurt was …" },
      { de: "Participle clauses", tr: "Having tried to mediate, …" },
      { de: "Third conditional", tr: "If we had talked, …" },
      { de: "Perfect modals", tr: "He must have failed to …" },
      { de: "Inversion", tr: "Never has a burden felt so heavy" },
    ],
    canDo: [
      { de: "I can name a feeling precisely instead of generally.", tr: "Bir duyguyu genel değil tam olarak adlandırabiliyorum.", en: "I can name a feeling precisely instead of generally." },
      { de: "I can describe how a conflict grew.", tr: "Bir anlaşmazlığın nasıl büyüdüğünü anlatabiliyorum.", en: "I can describe how a conflict grew." },
      { de: "I can mediate between two sides.", tr: "İki taraf arasında arabuluculuk yapabiliyorum.", en: "I can mediate between two sides." },
      { de: "I can say what would have happened if we had talked.", tr: "Konuşsaydık ne olacağını söyleyebiliyorum.", en: "I can say what would have happened if we had talked." },
      { de: "I can write a letter that repairs a relationship.", tr: "Bir ilişkiyi onaran bir mektup yazabiliyorum.", en: "I can write a letter that repairs a relationship." },
    ],
    listening: {
      title: "The person between us",
      titleTr: "Aramızdaki kişi",
      situation: "İki meslektaş bir kırılmayı bir arabulucuyla konuşuyor.",
      turns: [
        { speaker: "Mediator", de: "Let us name it first. What really hurt was not the decision itself, I think.", tr: "Önce adını koyalım. Bence asıl kıran şey kararın kendisi değildi." },
        { speaker: "Colleague", de: "No. What really hurt was the exclusion: the meeting was held without me.", tr: "Değildi. Asıl kıran şey dışlanmaktı: toplantı bensiz yapıldı." },
        { speaker: "Ms. Renner", de: "Having tried to mediate twice, I said nothing in the end. That was my mistake.", tr: "İki kez arabuluculuk denedikten sonra sonunda hiçbir şey söylemedim. Hatam buydu." },
        { speaker: "Mediator", de: "He must have failed to empathise rather than intended the distrust.", tr: "Güvensizliği kastetmekten çok, empati kurmayı başaramamış olmalı." },
        { speaker: "Colleague", de: "Perhaps. Never has a burden at work felt so heavy, and the rage passed only last week.", tr: "Belki. İş yerinde bir yük hiç bu kadar ağır gelmemişti ve öfke ancak geçen hafta geçti." },
        { speaker: "Ms. Renner", de: "If we had talked in March, the whole thing would have been settled in an hour.", tr: "Martta konuşsaydık bütün mesele bir saatte çözülmüş olurdu." },
        { speaker: "Mediator", de: "Apparently the tone of voice carried more than the words. That is a nonverbal signal.", tr: "Görünüşe göre ses tonu sözcüklerden fazlasını taşımış. Bu sözsüz bir işaret." },
        { speaker: "Colleague", de: "In essence, yes. On balance the choice of words is arguably the part we can still change.", tr: "Özünde evet. Her şey bir arada, hâlâ değiştirebileceğimiz kısım sözcük seçimi." },
      ],
      questions: [
        { de: "What really hurt the colleague?", tr: "Meslektaşı asıl ne kırdı?", options: ["Being left out of the meeting", "The decision itself", "The mediator's question", "The tone of the letter"], answer: 0 },
        { de: "What does the mediator suggest about the other person?", tr: "Arabulucu öteki kişi hakkında ne söylüyor?", options: ["He failed to empathise rather than intended harm", "He planned the exclusion", "He never noticed the meeting", "He apologised in March"], answer: 0 },
        { de: "What carried more than the words, apparently?", tr: "Görünüşe göre sözcüklerden fazlasını ne taşıdı?", options: ["The tone of voice", "The written note", "The mediator's silence", "The decision"], answer: 0 },
      ],
    },
    reading: {
      title: "When nobody says it out loud",
      titleTr: "Danışma köşesi",
      genre: "Rehber yazısı",
      text: "WHEN NOBODY SAYS IT OUT LOUD\n\nMost conflicts at work are not about the decision. What really hurts is the exclusion: a meeting held without you, a message sent to everyone else.\n\nHaving mediated in dozens of teams, I notice the same pattern. The person who was left out waits for an admission; the other side waits for the rage to pass. Neither happens, and the distrust grows. He must have failed to empathise, people say — and often that is true, because an impulsive colleague is not the same as an unforgiving one.\n\nWhat helps is modest and almost mechanical. Name the feeling once, without a generalisation. Say what you needed. If we had talked in the first week, most of these cases would have been settled in an hour.\n\nNever has a burden felt lighter for being carried in silence. On balance the choice of words is arguably the only part that is still in your hands.",
      questions: [
        { de: "What does the writer say most conflicts at work are about?", tr: "Yazara göre iş yerindeki anlaşmazlıkların çoğu neyle ilgili?", options: ["Being excluded", "The decision itself", "Money", "The tone of the manager"], answer: 0 },
        { de: "What does each side wait for?", tr: "Her taraf neyi bekliyor?", options: ["An admission and the passing of the rage", "A written apology", "A new mediator", "A meeting with the manager"], answer: 0 },
        { de: "What is the point of „an impulsive colleague is not the same as an unforgiving one“?", tr: "„an impulsive colleague is not the same as an unforgiving one“ ne demek istiyor?", options: ["It separates a habit from an intention", "It blames the colleague", "It excuses the exclusion", "It describes two teams"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Bir kırılmanın asıl sebebini adlandırıyorsun.", de: "What really hurt was not the decision but the exclusion.", tr: "Asıl kıran şey karar değil, dışlanmaktı." },
      { situation: "Arabuluculuk yapıyorsun.", de: "He must have failed to empathise rather than intended the distrust.", tr: "Güvensizliği kastetmekten çok empati kurmayı başaramamış olmalı." },
    ],
    writing: {
      prompt: "Bir ilişkiyi onaran bir mektup yaz.",
      checklist: [
        "Neyi fark ettiğini yaz",
        "Bir yarma cümlesiyle asıl sebebi adlandır („What really hurt was …“)",
        "Kendi payını kabul et („I should have …“)",
        "Bir „If we had …“ cümlesi kur",
        "Somut bir öneriyle kapat",
      ],
      minWords: 90,
      phrases: [
        { de: "I have thought about our conversation of …", tr: "… tarihli konuşmamızı düşündüm", en: "I have thought about our conversation of …" },
        { de: "What really hurt was …", tr: "Asıl kıran şey …", en: "What really hurt was …" },
        { de: "I should have said it at the time.", tr: "O zaman söylemem gerekirdi", en: "I should have said it at the time." },
        { de: "If we had talked earlier, …", tr: "Daha önce konuşsaydık, …", en: "If we had talked earlier, …" },
        { de: "In essence, I would like to …", tr: "Özünde … yapmak istiyorum", en: "In essence, I would like to …" },
      ],
      sample:
        "Dear Deniz,\n\nI have thought about our conversation of last Tuesday, and I would rather write than leave it there.\n\nWhat really hurt was not your decision about the project; it was the exclusion. The meeting was held without me and I heard about it from a colleague. Having noticed that, I said nothing for three weeks. I should have said it at the time, and I am sorry.\n\nIf we had talked in the first week, the whole thing would have been settled in an hour. You must have been under pressure yourself.\n\nIn essence, I would like to keep the working relationship and agree one rule: whoever is affected is asked first. Could we have a coffee on Thursday?\n\nBest regards,\nElif",
    },
  },

  {
    level: "B2",
    index: 9,
    code: "B2.10",
    titleDe: "Formal correspondence",
    titleTr: "Resmî yazışma ve kapanış",
    focus: [
      { de: "Cleft sentences", tr: "What caused the delay was …" },
      { de: "Nominalisation", tr: "the filing of the enclosure" },
      { de: "Participle clauses", tr: "Having read the interim report, …" },
      { de: "Inversion", tr: "Never has an answer come so promptly" },
      { de: "in view of / provided that", tr: "koşullu kapanış" },
    ],
    canDo: [
      { de: "I can write with a file number and the right register.", tr: "Dosya numarasıyla ve doğru resmî tonla yazabiliyorum.", en: "I can write with a file number and the right register." },
      { de: "I can say what caused a delay without blaming a person.", tr: "Gecikmeye neyin yol açtığını kişiyi suçlamadan söyleyebiliyorum.", en: "I can say what caused a delay without blaming a person." },
      { de: "I can ask for a deadline extension and give a reason.", tr: "Süre uzatımı isteyip gerekçesini verebiliyorum.", en: "I can ask for a deadline extension and give a reason." },
      { de: "I can answer a complaint and close the file.", tr: "Bir şikâyeti cevaplayıp dosyayı kapatabiliyorum.", en: "I can answer a complaint and close the file." },
      { de: "I can write a closing line that leaves the door open.", tr: "Kapıyı açık bırakan bir kapanış cümlesi yazabiliyorum.", en: "I can write a closing line that leaves the door open." },
    ],
    listening: {
      title: "Closing the file",
      titleTr: "Dosyayı kapatmak",
      situation: "Bir kurum görevlisi ile hizmet sağlayıcı dosyayı kapatmayı konuşuyor.",
      turns: [
        { speaker: "Officer", de: "The case file is said to be complete. What caused the delay in March?", tr: "Dosyanın tamamlandığı söyleniyor. Martta gecikmeye ne yol açtı?" },
        { speaker: "Agent", de: "What caused the delay was a scheduling conflict, not the missing enclosure.", tr: "Gecikmeye yol açan şey bir takvim çakışmasıydı, eksik ek değil." },
        { speaker: "Officer", de: "Having read the interim report, I accept that. The filing of the enclosure is recorded on the tenth.", tr: "Ara raporu okuduktan sonra bunu kabul ediyorum. Ekin dosyalanması onunda kayıtlı." },
        { speaker: "Agent", de: "It was the deadline extension that saved the project. We should have asked for it earlier.", tr: "Projeyi kurtaran şey süre uzatımıydı. Daha önce istememiz gerekirdi." },
        { speaker: "Officer", de: "Never has an answer come so promptly from your side; that is noted in the file.", tr: "Sizin taraftan bir cevap hiç bu kadar çabuk gelmedi; bu dosyaya not düşüldü." },
        { speaker: "Agent", de: "Then the supplementary agreement is signed this week, provided that the price adjustment stands.", tr: "O hâlde ek sözleşme bu hafta imzalanıyor, fiyat düzeltmesi geçerli kalırsa." },
        { speaker: "Officer", de: "In view of your letter, it seems to be settled. By March the remaining amount will have been paid.", tr: "Yazınız göz önüne alınırsa, konu çözülmüş görünüyor. Marta kadar kalan tutar ödenmiş olacak." },
        { speaker: "Agent", de: "Good. I would arguably make clear one last point: the right of return remains contractual.", tr: "Güzel. Son bir noktayı netleştirmek isterim: iade hakkı sözleşmeye bağlı kalıyor." },
      ],
      questions: [
        { de: "What caused the delay in March?", tr: "Martta gecikmeye ne yol açtı?", options: ["A scheduling conflict", "The missing enclosure", "The price adjustment", "The interim report"], answer: 0 },
        { de: "What saved the project?", tr: "Projeyi ne kurtardı?", options: ["The deadline extension", "The supplementary agreement", "The file number", "The reminder"], answer: 0 },
        { de: "What condition does the agent attach to signing?", tr: "Hizmet sağlayıcı imzaya hangi koşulu bağlıyor?", options: ["The price adjustment must stand", "The file must be reopened", "The return must be free", "The report must be rewritten"], answer: 0 },
      ],
    },
    reading: {
      title: "Answer to your complaint",
      titleTr: "Resmî cevap yazısı",
      genre: "Resmî e-posta",
      text: "Subject: answer to your complaint — file 2026/118\n\nDear Mr Aksoy,\n\nwith reference to your registered letter of 3 April, which reached our incoming mail on the fifth, I can now answer you in full.\n\nWhat caused the delay was a scheduling conflict in the workshop and not, as stated in your letter, a missing proof of purchase. The filing of your enclosure is recorded on 10 April. Having read the interim report, we accept that the first reply was neither prompt nor clear enough.\n\nThe remaining amount is therefore credited to your account this week, and a voucher for the delivery cost is enclosed. In view of the terms of use, the right of return remains unchanged.\n\nNever has a case of this kind been closed without a written summary; it is attached. Provided that no further point arises, the file is closed on 30 April.\n\nYours sincerely,\nL. Sander, customer office",
      questions: [
        { de: "What caused the delay, according to the office?", tr: "Kuruma göre gecikmeye ne yol açtı?", options: ["A scheduling conflict in the workshop", "A missing proof of purchase", "The registered letter", "The voucher"], answer: 0 },
        { de: "What does the office admit about the first reply?", tr: "Kurum ilk cevabı hakkında neyi kabul ediyor?", options: ["It was neither prompt nor clear enough", "It was never sent", "It was written by the workshop", "It contained a wrong amount"], answer: 0 },
        { de: "Under what condition is the matter settled?", tr: "Konu hangi koşulda çözülmüş sayılıyor?", options: ["Provided that no further point arises", "Provided that the voucher is used", "Only after 30 April", "Only if the return is claimed"], answer: 0 },
      ],
    },
    speaking: [
      { situation: "Gecikmenin sebebini kişiyi suçlamadan bildiriyorsun.", de: "What caused the delay was a scheduling conflict, not a missing document.", tr: "Gecikmeye yol açan şey bir takvim çakışmasıydı, eksik belge değil." },
      { situation: "Dosyayı koşullu olarak kapatıyorsun.", de: "Provided that no further point arises, we consider the matter settled.", tr: "Başka bir nokta çıkmazsa konuyu çözülmüş sayıyoruz." },
    ],
    writing: {
      prompt: "Bir şikâyete resmî cevap yaz ve dosyayı kapat.",
      stimulus: "I have waited five weeks for an answer and nobody has explained the delay.",
      checklist: [
        "Gelen yazıya tarih ve dosya numarasıyla atıf yap",
        "Bir yarma cümlesiyle sebebi bildir („What caused the delay was …“)",
        "Bir isimleştirme kullan („the filing of …“)",
        "Ne yapıldığını ve neyin ekli olduğunu yaz",
        "Koşullu bir kapanış kur („provided that …“, „in view of …“)",
      ],
      minWords: 90,
      phrases: [
        { de: "With reference to your letter of …", tr: "… tarihli yazınıza atıfla", en: "With reference to your letter of …" },
        { de: "What caused the delay was …", tr: "Gecikmeye yol açan şey …", en: "What caused the delay was …" },
        { de: "The filing of your enclosure is recorded on …", tr: "Ekinizin dosyalanması …-de kayıtlı", en: "The filing of your enclosure is recorded on …" },
        { de: "A voucher is enclosed.", tr: "Bir kupon ektedir", en: "A voucher is enclosed." },
        { de: "Provided that no further point arises, …", tr: "Başka bir nokta çıkmazsa, …", en: "Provided that no further point arises, …" },
      ],
      sample:
        "Subject: answer to your complaint — file 2026/204\n\nDear Ms Yilmaz,\n\nwith reference to your letter of 3 April, which reached our incoming mail on the fifth, I can now answer you in full.\n\nWhat caused the delay was a scheduling conflict in our workshop and not a missing document: the filing of your enclosure is recorded on 10 April. Having read the interim report, we accept that our first reply was neither prompt nor clear enough.\n\nThe remaining amount is credited to your account this week and a voucher for the delivery cost is enclosed. In view of the terms of use, your right of return remains unchanged.\n\nProvided that no further point arises, we consider the matter settled.\n\nYours sincerely,\nL. Sander",
    },
  },
];

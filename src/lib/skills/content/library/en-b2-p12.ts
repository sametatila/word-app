import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 12 sağlık hizmeti hattı: kaçırılan randevular üzerine bir klinik
 * raporu, iki çalışanın fazladan randevu tartışması, yeni hastalar için bir
 * bilgi broşürü. Dil bilgisi edilgen çeşitleri — is being done, has been
 * done, should have been done (B1'deki is/was done'ın ötesi).
 */
export const enB2P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r12",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Why Appointments Are Missed",
    genre: "report",
    intro: "Bir klinik grubunun raporundan bir bölüm: randevular neden kaçırılıyor, hastalar ne diyor, neler deneniyor.",
    gloss: [
      { de: "without notice", tr: "haber vermeden" },
      { de: "slot", tr: "randevu saati" },
      { de: "forgetfulness", tr: "unutkanlık" },
      { de: "on hold", tr: "hatta beklerken" },
      { de: "school run", tr: "okula götürme" },
      { de: "to rebook", tr: "yeniden randevu vermek" },
      { de: "to release", tr: "boşaltmak" },
      { de: "caution", tr: "uyarı" },
      { de: "to struggle", tr: "zorlanmak" },
      { de: "to deserve", tr: "hak etmek" },
      { de: "stretched", tr: "uzamak" },
      { de: "explanation", tr: "açıklama" },
    ],
    minutes: 8,
    text:
      "Why appointments are missed: findings from the first year\n\n" +
      "Across our six clinics, roughly one appointment in eleven is missed without notice. " +
      "Each missed slot could have been given to somebody else, and in the busiest months the " +
      "waiting list for a first visit has been stretched to seven weeks.\n\n" +
      "The usual explanation is forgetfulness, and reminders have been sent by text since 2019. " +
      "They help, but less than expected. When we phoned a sample of four hundred patients who " +
      "had missed an appointment, only a quarter said they had simply forgotten.\n\n" +
      "The largest group, almost forty percent, had tried to cancel. Most had rung during the " +
      "morning, when the lines are busiest, and given up after several minutes on hold. " +
      "In other words, many of the appointments recorded as missed should have been recorded " +
      "as canceled, and could have been offered to another patient if canceling had been " +
      "easier.\n\n" +
      "A second group had been given a time they could not realistically attend: an early slot " +
      "for a parent on the school run, or an appointment that had been moved without their " +
      "knowledge. Several said they had never been told about the change at all.\n\n" +
      "Two changes are now being tested. Patients can cancel by replying to the reminder with " +
      "a single word, and appointments that are rebooked by the clinic must be confirmed by the " +
      "patient before the old slot is released. Early results will be published in the spring.\n\n" +
      "We would add one caution. A missed appointment is sometimes a sign that a patient is " +
      "struggling, and these figures should not be used to decide who deserves to be seen.",
    questions: [
      {
        text: "How often are appointments missed without notice?",
        options: ["about one in four", "about one in seven", "about one in eleven"],
        answer: 2,
        explain: "„roughly one appointment in eleven is missed without notice“.",
      },
      {
        text: "What did the largest group of patients say?",
        options: [
          "They had tried to cancel.",
          "They had simply forgotten.",
          "They had moved away.",
        ],
        answer: 0,
        explain: "Yüzde kırka yakını iptal etmeye çalışmış ama hatta beklerken vazgeçmiş.",
      },
      {
        kind: "truefalse",
        text: "Most of the patients who were phoned said they had forgotten the appointment.",
        options: ["True", "False"],
        answer: 1,
        explain: "Yalnız dörtte biri unuttuğunu söylemiş: „only a quarter said they had simply forgotten“.",
      },
      {
        kind: "gapfill",
        text: "The waiting list for a first visit has been stretched to ___ weeks.",
        options: [],
        answer: 0,
        accept: ["seven", "7"],
        explain: "„has been stretched to seven weeks“.",
      },
      {
        kind: "short_answer",
        text: "How can patients now cancel an appointment?",
        options: [],
        answer: 0,
        accept: ["by replying to the reminder", "replying to the reminder", "reply to the reminder", "by replying to the reminder with a single word", "by replying to the text", "reply to the text", "by replying with one word", "by replying with a single word", "by text"],
        explain: "Hatırlatma mesajına tek kelimeyle cevap vererek iptal edebiliyorlar.",
      },
      {
        text: "Why does the report end with a caution?",
        options: [
          "The new trial has already failed.",
          "The figures could be used unfairly.",
          "The clinics may close in spring.",
        ],
        answer: 1,
        explain: "Rakamlar kimin muayene edilmeyi hak ettiğine karar vermek için kullanılmamalı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l12",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "One Extra Patient Every Afternoon?",
    genre: "dialogue",
    intro: "İki klinik çalışanı boş kalan randevuları doldurmak için fazladan hasta yazmayı tartışıyor.",
    gloss: [
      { de: "schedule", tr: "randevu listesi" },
      { de: "to turn up", tr: "gelmek" },
      { de: "to bump", tr: "yerinden etmek" },
      { de: "voucher", tr: "kupon" },
      { de: "prescription refill", tr: "tekrar reçetesi" },
      { de: "sensible", tr: "makul" },
      { de: "to push back", tr: "ertelemek" },
      { de: "to measure", tr: "ölçmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Mr. Brandt", text: "I've been looking at the figures again. If we booked one extra patient into every afternoon schedule, most of the gaps would be filled." },
      { speaker: "Ms. Okafor", text: "Most of them, yes. But on the days when everybody turns up, the last patient would be kept waiting for an hour, and the doctor would finish at eight." },
      { speaker: "Mr. Brandt", text: "Airlines have been doing this for decades. They simply accept that a few people on a full flight will be disappointed." },
      { speaker: "Ms. Okafor", text: "A passenger who is bumped gets a voucher. A patient who is sent home gets nothing, and may not come back. That's the difference I keep returning to." },
      { speaker: "Mr. Brandt", text: "Fair. What if the extra place were kept for someone who can wait? A prescription refill, say, rather than a new problem." },
      { speaker: "Ms. Okafor", text: "That's more sensible. It would have to be explained when the appointment is made, though. Nobody should find out on the day that they're the one being pushed back." },
      { speaker: "Mr. Brandt", text: "Agreed. Should we try it on Tuesdays only? Tuesday has had the most empty slots every month since March." },
      { speaker: "Ms. Okafor", text: "Tuesdays for six weeks, then. And the waiting times should be recorded as well as the gaps, otherwise we'll only be measuring the half that makes us look good." },
    ],
    questions: [
      {
        text: "What does Mr. Brandt suggest at first?",
        options: [
          "finishing clinics at eight",
          "an extra patient each afternoon",
          "calling patients the day before",
        ],
        answer: 1,
        explain: "Her öğleden sonra listesine bir hasta fazla yazmayı öneriyor.",
      },
      {
        text: "What is Ms. Okafor's objection to the airline comparison?",
        options: [
          "Airlines charge far more money.",
          "A plane cannot wait for an hour.",
          "A patient sent home gets nothing.",
        ],
        answer: 2,
        explain: "Yolcuya kupon veriliyor; eve gönderilen hastaya hiçbir şey verilmiyor.",
      },
      {
        kind: "truefalse",
        text: "They agree that the extra place should go to a patient who can wait.",
        options: ["True", "False"],
        answer: 0,
        explain: "Tekrar reçetesi kontrolü gibi bekleyebilecek bir iş için ayrılması kararlaştırılıyor.",
      },
      {
        kind: "gapfill",
        text: "The trial will run on Tuesdays for ___ weeks.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„Tuesdays for six weeks, then.“",
      },
      {
        kind: "short_answer",
        text: "What does Ms. Okafor want recorded as well as the gaps?",
        options: [],
        answer: 0,
        accept: ["the waiting times", "waiting times"],
        explain: "Yalnız boşluklar ölçülürse işin yalnız iyi görünen yarısı ölçülmüş olur.",
      },
      {
        text: "Why do they choose Tuesday?",
        options: [
          "It has had the most empty slots.",
          "It is the quietest day for doctors.",
          "Patients have asked for that day.",
        ],
        answer: 0,
        explain: "„Tuesday has had the most empty slots every month since March.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w12",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "A Pamphlet for New Patients",
    genre: "guide",
    intro: "Yeni hastalar için bir bilgi broşürü yazıyorsun: önce iki cümle kur, sonra randevu düzenini açık ve suçlamayan bir dille anlat.",
    gloss: [
      { de: "routine", tr: "rutin" },
      { de: "urgent", tr: "acil" },
      { de: "reminder", tr: "hatırlatma" },
      { de: "to confirm", tr: "teyit etmek" },
      { de: "front desk", tr: "danışma" },
      { de: "waiting list", tr: "bekleme listesi" },
      { de: "to hold against", tr: "aleyhine saymak" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Randevunuz değiştirildiyse size haber verilmesi gerekirdi.",
        answer: "If your appointment was moved, you should have been told.",
        alternatives: ["You should have been told if your appointment was moved."],
        hint: "Yapılması gerekip yapılmamış edilgen iş: should have been + üçüncü biçim.",
      },
      {
        kind: "build",
        tr: "Sistem şu anda güncellendiği için hatlar yoğun.",
        answer: "The lines are busy because the system is being updated.",
        alternatives: ["Because the system is being updated, the lines are busy."],
        hint: "Şu anda süren edilgen iş: is/are being + üçüncü biçim.",
      },
      {
        kind: "free",
        prompt:
          "Yeni hastalar için bir bilgi broşürü yaz: randevunun nasıl alındığını, nasıl iptal edildiğini, klinik randevuyu değiştirirse ne olacağını ve erken haber vermenin neden önemli olduğunu anlat; hastayı suçlamayan bir dille bitir.",
        checklist: [
          "Randevunun nasıl alındığını yaz",
          "İptalin nasıl yapıldığını yaz",
          "Klinik randevuyu değiştirirse ne olacağını anlat",
          "Erken haber vermenin nedenini suçlamadan açıkla",
        ],
        minWords: 120,
        phrases: [
          { de: "Appointments can be booked by …", tr: "Randevu … ile alınabilir", en: "" },
          { de: "If you need to cancel, …", tr: "İptal etmeniz gerekirse …", en: "" },
          { de: "If we have to move your appointment, you will be …", tr: "Randevunuzu değiştirmemiz gerekirse size …", en: "" },
          { de: "Please let us know as early as possible, because …", tr: "Lütfen olabildiğince erken haber verin, çünkü …", en: "" },
          { de: "This does not mean that …", tr: "Bu … anlamına gelmez", en: "" },
        ],
        sample:
          "Welcome to the practice. This pamphlet explains how appointments work and what to do " +
          "if your plans change. " +
          "Appointments can be booked by phone, online or at the front desk. Routine appointments " +
          "are usually offered within two weeks; urgent problems are seen on the same day. " +
          "If you need to cancel, reply CANCEL to the reminder text, which is sent two days before " +
          "your visit. You do not need to phone, and you will not be asked for a reason. " +
          "If we have to move your appointment, you will be contacted by text and by phone, " +
          "and the new time will not be confirmed until you have agreed to it. If that has not " +
          "happened, you should have been told, and we would like to hear about it. " +
          "Please let us know as early as possible, because every slot that is freed can be " +
          "offered to someone on the waiting list. " +
          "This does not mean that a missed appointment will be held against you. Life gets in " +
          "the way, and we would rather you arrived late than not at all.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s12",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Missed Appointments Cost Money?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir cezanın çekiciliğini kabul et, sonra kimi vuracağını göster.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Randevusuna haber vermeden gelmeyen hastalardan ücret alınmalı mı? Konumunu söyle, fikrin neden çekici olduğunu kabul et, ücretin en çok kimi vuracağını söyle ve daha iyi işleyecek bir çözüm öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Fikrin neden çekici olduğunu kabul et",
        "Ücretin en çok kimi vuracağını söyle",
        "Daha iyi işleyecek bir çözüm öner",
      ],
      targets: [
        { de: "On balance, I'm against it, although I understand the appeal.", tr: "Her şeyi tartınca karşıyım, gerçi çekiciliğini anlıyorum." },
        { de: "I can see why the idea is attractive: …", tr: "Fikrin neden çekici olduğunu anlıyorum: …" },
        { de: "The people it would hit hardest are …", tr: "En çok vuracağı kişiler …" },
        { de: "What would work better, I think, is …", tr: "Bence daha iyi işleyecek olan …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "On balance, I'm against it, although I understand the appeal, and I understand why the " +
        "idea keeps coming back every few years. " +
        "I can see why the idea is attractive: a missed slot is a real loss, another patient " +
        "could have been seen, and a small fine sounds like a fair way of making people take a " +
        "booking seriously. " +
        "The trouble is who would actually end up paying. As far as I know, most people who miss " +
        "appointments haven't forgotten at all. They tried to cancel and couldn't get through, " +
        "or they were given a time they could never have made, or their week had simply fallen " +
        "apart. " +
        "The people it would hit hardest are exactly the ones a clinic ought to worry about most: " +
        "people with unpredictable shifts, carers, and people who are unwell in ways that make " +
        "planning difficult. " +
        "What would work better, I think, is making canceling as easy as booking. If a patient " +
        "can cancel with one word in a text message, a lot of the missed slots become freed " +
        "slots, somebody on the waiting list is seen sooner, and nobody has to be punished for " +
        "having a complicated life.",
      rubricHint:
        "Karşı tarafın gerekçesini hakkıyla kabul etme, etkilenen kesimi adlandırma ve somut bir çözüm beklenir; „I can see why“, „the people it would hit hardest“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g12",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "is being checked, should have been told",
    genre: "grammar",
    intro: "Edilgen yalnız „is done“ ve „was done“ değildir; süren, bugüne uzanan ve kiple kurulan biçimleri de vardır.",
    focus: "Edilgen çeşitleri: sürekli, perfect ve kipli edilgen (is being done, has been done, should have been done)",
    gloss: [
      { de: "appointment", tr: "randevu" },
      { de: "to confirm", tr: "onaylamak" },
      { de: "to inform", tr: "bilgilendirmek" },
      { de: "prescription", tr: "reçete" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Süren ve bugüne uzanan edilgen",
        tr: "Edilgenin zamanı „be“ fiilinden okunur. Şu anda süren iş için „is/are being + üçüncü hâl“, sonucu bugün görünen iş için „has/have been + üçüncü hâl“ kullanılır. Geçmişte o anda sürüyorsa „was/were being“ olur.",
        examples: [
          { de: "The system is being updated this week.", tr: "Sistem bu hafta güncelleniyor.", note: "şu anda süren" },
          { de: "Your appointment has been moved to Tuesday.", tr: "Randevunuz salıya alındı.", note: "sonuç bugün" },
          { de: "The patient was being examined when the alarm went off.", tr: "Alarm çaldığında hasta muayene ediliyordu.", note: "geçmişte süren" },
        ],
      },
      {
        heading: "Kipli edilgen",
        tr: "Kip fiilinden sonra „be + üçüncü hâl“ gelir: „must be confirmed“, „can be canceled“. Geçmişe dönük yargıda „should/could/must have been + üçüncü hâl“ kullanılır; „should have been“ çoğu zaman yapılmamış bir işi eleştirir.",
        examples: [
          { de: "Changes must be confirmed by the patient.", tr: "Değişiklikler hasta tarafından onaylanmalı.", note: "must be" },
          { de: "Appointments can be canceled by text.", tr: "Randevular mesajla iptal edilebilir.", note: "can be" },
          { de: "She should have been informed about the change.", tr: "Değişiklik hakkında bilgilendirilmesi gerekirdi.", note: "yapılmadı" },
        ],
      },
      {
        heading: "Fail ne zaman eklenir?",
        tr: "Edilgende yapanı söylemek zorunlu değildir; bilgi yeni ya da önemliyse „by“ ile eklenir. „by someone“ ya da „by people“ gibi boş failler cümleyi uzatır ve hiçbir şey katmaz.",
        examples: [
          { de: "The prescription has been signed by the doctor.", tr: "Reçete doktor tarafından imzalandı.", note: "fail önemli" },
          { de: "The results will be sent next week.", tr: "Sonuçlar gelecek hafta gönderilecek.", note: "fail gereksiz" },
          { de: "The clinic is being run by a new team.", tr: "Klinik yeni bir ekip tarafından yönetiliyor.", note: "yeni bilgi" },
        ],
      },
    ],
    questions: [
      {
        text: "Your prescription ___ by the doctor, so you can collect it now.",
        options: ["has been signed", "has signed", "is signing"],
        answer: 0,
        explain: "Reçete imzalayan değil imzalanan; sonucu bugün görünüyor: has been + üçüncü hâl.",
      },
      {
        text: "The system ___ at the moment, so the lines are busy.",
        options: ["is updated", "is being updated", "has updated"],
        answer: 1,
        explain: "„at the moment“ şu anda süren edilgen ister: is being + üçüncü hâl.",
      },
      {
        text: "Nobody told her. She ___ about the change.",
        options: ["should inform", "should be informing", "should have been informed"],
        answer: 2,
        explain: "Geçmişte yapılması gerekip yapılmamış edilgen iş: should have been + üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "Changes must ___ confirmed by the patient.",
        options: [],
        answer: 0,
        accept: ["be"],
        explain: "Kip fiilinden sonra edilgen „be + üçüncü hâl“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "The patient was ___ examined when the alarm went off. (be)",
        options: [],
        answer: 0,
        accept: ["being"],
        explain: "Geçmişte o anda süren edilgen: was being + üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "Appointments can be ___ by text. (cancel)",
        options: [],
        answer: 0,
        accept: ["canceled"],
        explain: "„can be“ ardından üçüncü hâl gelir.",
      },
      {
        kind: "gapfill",
        text: "Your appointment ___ been moved to Tuesday.",
        options: [],
        answer: 0,
        accept: ["has"],
        explain: "Sonucu bugün görünen edilgen: has been + üçüncü hâl.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "should have been", "informed", "about the change"],
        explain: "Özne + should have been + üçüncü hâl + tümleç.",
      },
      {
        kind: "truefalse",
        text: "„The system is being updated.“ — Güncelleme şu anda sürüyor mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„is being + üçüncü hâl“ şu anda süren edilgen işi anlatır.",
      },
      {
        kind: "truefalse",
        text: "„The results will be sent by someone next week.“ — „by someone“ cümleye bilgi katıyor mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Boş bir fail yeni bilgi vermez; „The results will be sent next week“ yeterlidir.",
      },
    ],
  },
];

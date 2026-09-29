import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 6 — "İkinci elden haber, tamamlandığında, yüzey
 * işlemi, yapılmış olacak".
 *
 * Dört ders: As it is reported · Once completed ·
 * The treatment of the surface · It will have been done.
 *
 *   Kelime: origin, verify, accuracy, disclose, conceal, withhold,
 *           validate, certify, filter, mix, load, crate, glue, component,
 *           unload, gauge, treat, refine, requirement, yield, input,
 *           deviation, guideline, provision, pilot, prototype, quantity,
 *           proportion, portion, length, width, height.
 *   Kalıp:  It is reported that the origin is unclear. ·
 *           The figures are said to verify the claim. ·
 *           The accuracy is thought to be high. ·
 *           Having filtered the liquid, mix the powder. ·
 *           Being loaded first, the crate arrives last. ·
 *           Glued on Monday, the component was tested. ·
 *           The treatment of the surface took two hours. ·
 *           The refinement of the process is ongoing. ·
 *           The requirement of a second check is clear. ·
 *           By June the pilot will have been finished. ·
 *           This time next month we will be testing the prototype. ·
 *           The quantity will have been checked by then.
 *
 * Ünitenin tek öğretme noktası TALİMATTA ORTACIN YAZILMAYAN ÖZNESİ.
 * „Having filtered the liquid, mix the powder“ — ikinci yarı emir kipi,
 * yani gizli öznesi „sen“; ortaç öznesini ana cümleden aldığı için o da
 * „sen“. Kural bozulmuş gibi görünürken tam tersine korunuyor, ve bu
 * yüzden „Having filtered the liquid, the powder is mixed“ yanlış:
 * süzme işi toza geçiyor.
 */
export const enB2U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u06-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "Repairing a loose chair leg",
    genre: "guide",
    intro: "Gevşemiş bir sandalye ayağını onarmak için adım adım rehber. İşin sırası nasıl?",
    gloss: [
      { de: "loose", tr: "gevşek" },
      { de: "sandpaper", tr: "zımpara kâğıdı" },
      { de: "a strap", tr: "kayış" },
      { de: "wood", tr: "tahta" },
      { de: "a cloth", tr: "bez" },
      { de: "a rope", tr: "ip" },
      { de: "a brush", tr: "fırça" },
      { de: "upside down", tr: "baş aşağı" },
      { de: "pull", tr: "çekmek" },
      { de: "a hole", tr: "delik" },
      { de: "easily", tr: "kolayca" },
      { de: "force", tr: "zorlamak" },
      { de: "wipe", tr: "silmek" },
      { de: "a layer", tr: "katman" },
      { de: "tied", tr: "bağlanmış" },
      { de: "tie", tr: "bağlamak" },
      { de: "tight", tr: "sıkı" },
    ],
    minutes: 9,
    text:
      "REPAIRING A LOOSE CHAIR LEG: A STEP-BY-STEP GUIDE\n" +
      "A loose chair leg is one of the most common repairs in any home, and you do not need to be an expert to fix it. The whole job takes about an hour of work, plus a day of waiting.\n" +
      "You will need: wood glue, a clean cloth, fine sandpaper, a strap or strong rope, and a small brush.\n" +
      "1. Remove the leg. Having turned the chair upside down, pull the loose leg out of its hole. If it does not come out easily, do not force it.\n" +
      "2. Clean both parts. Having removed the old glue with sandpaper, wipe the leg and the hole with a dry cloth. Old glue is the main reason why repairs fail.\n" +
      "3. Apply the glue. Using the small brush, put a thin layer of glue inside the hole and on the end of the leg. Too much glue is a common mistake: a small quantity is enough.\n" +
      "4. Put the leg back. Holding the chair with one hand, push the leg into the hole and turn it a little so that the glue spreads.\n" +
      "5. Tie the chair. Wrap the strap around all four legs and pull it tight. Having tied the strap, wipe off any glue that comes out of the joint.\n" +
      "6. Wait. Glued on Monday, a chair can be used on Tuesday evening, but not before. Being made of wood, the joint needs time to dry completely.\n" +
      "A final tip: if the hole has become too wide, fill it with thin pieces of wood before you glue the leg. Treated this way, most chairs will last for many more years.",
    questions: [
      {
        text: "How long does the whole job take?",
        options: ["about an hour of work plus a day of waiting", "one hour", "one week"],
        answer: 0,
        explain: "„The whole job takes about an hour of work, plus a day of waiting.“",
      },
      {
        text: "What is the main reason why repairs fail?",
        options: ["old glue", "too little glue", "a wide hole"],
        answer: 0,
        explain: "„Old glue is the main reason why repairs fail.“",
      },
      {
        kind: "truefalse",
        text: "A small quantity of glue is enough.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Too much glue is a common mistake: a small quantity is enough.“",
      },
      {
        kind: "gapfill",
        text: "Having removed the old glue with sandpaper, wipe the leg and the hole with a dry ___.",
        options: [],
        answer: 0,
        accept: ["cloth"],
        explain: "„Having removed the old glue with sandpaper, wipe the leg and the hole with a dry cloth.“",
      },
      {
        kind: "order",
        text: "Talimatın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Turn the chair upside down.",
          "Remove the old glue with sandpaper.",
          "Push the leg into the hole.",
          "Wrap the strap around all four legs.",
        ],
        explain: "Sökmek, temizlemek, yerine takmak, en sonda bağlamak.",
      },
      {
        kind: "short_answer",
        text: "What should you do if the hole is too wide?",
        options: [],
        answer: 0,
        accept: ["fill it with wood", "fill it with thin pieces of wood", "fill it"],
        explain: "„if the hole has become too wide, fill it with thin pieces of wood before you glue the leg.“",
      },
    ],
  },
  {
    id: "en-b2-u06-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "Questions over honey labels",
    genre: "article",
    intro: "Bal etiketleriyle ilgili bir haber. Balın kaynağı hakkında neler biliniyor?",
    gloss: [
      { de: "honey", tr: "bal" },
      { de: "a label", tr: "etiket" },
      { de: "a laboratory", tr: "laboratuvar" },
      { de: "a region", tr: "bölge" },
      { de: "popular", tr: "sevilen" },
      { de: "a brand", tr: "marka" },
      { de: "import", tr: "ithal etmek" },
      { de: "own", tr: "kendi" },
      { de: "a spokesperson", tr: "sözcü" },
      { de: "an authority", tr: "kurum" },
      { de: "independent", tr: "bağımsız" },
      { de: "responsible", tr: "sorumlu" },
      { de: "lead", tr: "yol açmak" },
      { de: "a jar", tr: "kavanoz" },
    ],
    minutes: 9,
    text:
      "QUESTIONS OVER HONEY LABELS\n" +
      "Supermarkets across the region have removed a popular brand of honey from their shelves after doubts about where it really comes from.\n" +
      "It is reported that the origin of the honey is unclear. The label says „local mountain honey“, but laboratory tests are said to show that a large part of it was imported and mixed with a small portion of local honey.\n" +
      "The company, Green Valley, has not disclosed the results of its own tests. A spokesperson said yesterday that the company is thought to have followed all the guidelines and will work closely with the food authority.\n" +
      "According to the food authority, three independent laboratories have now examined samples. Their figures are said to verify the claim that the honey was mixed. The accuracy of the tests is thought to be high, because the laboratories used different methods and came to the same result.\n" +
      "It is not yet known who is responsible. Beekeepers in the area are believed to have sold honey to the company for years, and several of them say they were never asked to certify the quantity they delivered.\n" +
      "Customers who bought the honey can return it to the shop for a full refund. The food authority stresses that the honey is safe to eat: the problem is the label, not the product.\n" +
      "The case is expected to lead to stricter rules. From next year, every jar of honey sold as local will have to carry the name of the farm and a certificate that has been validated by the authority.",
    questions: [
      {
        text: "What do the laboratory tests show?",
        options: ["Much of the honey was imported and mixed.", "The honey is not safe to eat.", "The label is correct."],
        answer: 0,
        explain: "„laboratory tests are said to show that a large part of it was imported and mixed with a small portion of local honey.“",
      },
      {
        text: "Why is the accuracy of the tests thought to be high?",
        options: ["Different methods gave the same result.", "The company did the tests.", "Beekeepers checked them."],
        answer: 0,
        explain: "„because the laboratories used different methods and came to the same result.“",
      },
      {
        kind: "truefalse",
        text: "The company has published the results of its own tests.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The company, Green Valley, has not disclosed the results of its own tests.“",
      },
      {
        kind: "gapfill",
        text: "It is reported that the ___ of the honey is unclear.",
        options: [],
        answer: 0,
        accept: ["origin"],
        explain: "„It is reported that the origin of the honey is unclear.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Supermarkets removed the honey.",
          "The company has not disclosed its tests.",
          "Three laboratories examined samples.",
          "Stricter rules are expected next year.",
        ],
        explain: "Haber olayla açılıyor, şirketin tavrını ve kanıtı veriyor, en sonda beklenen kurallara geçiyor.",
      },
      {
        kind: "short_answer",
        text: "What can customers do with the honey?",
        options: [],
        answer: 0,
        accept: ["return it", "return it to the shop", "get a refund"],
        explain: "„Customers who bought the honey can return it to the shop for a full refund.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u06-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "Trouble on the paint line",
    genre: "dialogue",
    intro: "Boya hattında bir sorun çıktı. Masalara ne oldu, müşteriye ne söylenecek?",
    gloss: [
      { de: "humidity", tr: "nem" },
      { de: "a coat", tr: "kat" },
      { de: "sand", tr: "zımparalamak" },
      { de: "a log", tr: "günlük kaydı" },
      { de: "noon", tr: "öğle" },
      { de: "annoying", tr: "can sıkıcı" },
      { de: "a disaster", tr: "felaket" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Berk", text: "Have you read the log from the paint line yesterday? Something went wrong with the tables." },
      { speaker: "Işıl", text: "I have. The treatment of the surface took two hours, which is almost twice the normal time." },
      { speaker: "Berk", text: "Why so long?" },
      { speaker: "Işıl", text: "The first coat did not dry. The humidity in the hall was far too high, and nobody noticed until lunchtime." },
      { speaker: "Berk", text: "Is there a rule for checking the humidity?" },
      { speaker: "Işıl", text: "Yes, in the guidelines. The requirement of a second check is clear: once at the start of the shift and once at noon. The morning check was never done." },
      { speaker: "Berk", text: "So what happened to the tables?" },
      { speaker: "Işıl", text: "Twelve of them need a new coat. The refinement of the process is ongoing. For now, we just have to sand them and start again." },
      { speaker: "Berk", text: "How much will that cost us?" },
      { speaker: "Işıl", text: "Roughly a day of work and a small quantity of paint. The deviation from the plan is annoying, but it is not a disaster." },
      { speaker: "Berk", text: "Should we tell the customer?" },
      { speaker: "Işıl", text: "Yes. The delivery will be one day late. I would rather disclose that now than conceal it and explain it later." },
    ],
    questions: [
      {
        text: "How long did the treatment of the surface take?",
        options: ["two hours", "one hour", "a whole day"],
        answer: 0,
        explain: "„The treatment of the surface took two hours, which is almost twice the normal time.“",
      },
      {
        text: "Why did the first coat not dry?",
        options: ["The humidity was too high.", "The paint was old.", "The hall was too cold."],
        answer: 0,
        explain: "„The humidity in the hall was far too high, and nobody noticed until lunchtime.“",
      },
      {
        kind: "truefalse",
        text: "The morning humidity check was never done.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The morning check was never done.“",
      },
      {
        kind: "gapfill",
        text: "The requirement of a second ___ is clear.",
        options: [],
        answer: 0,
        accept: ["check"],
        explain: "„The requirement of a second check is clear: once at the start of the shift and once at noon.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The refinement of the process is ongoing.", "The refinement of the process is ongoing"],
        explain: "Süreç notunda fiil yerine isim: „refine“ → „refinement“.",
      },
      {
        kind: "short_answer",
        text: "How late will the delivery be?",
        options: [],
        answer: 0,
        accept: ["one day", "one day late", "a day"],
        explain: "„The delivery will be one day late.“",
      },
    ],
  },
  {
    id: "en-b2-u06-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "The cargo bike pilot",
    genre: "monologue",
    intro: "Kargo bisikleti projesinin kısa durum raporu. Haziranda ne bitmiş olacak?",
    gloss: [
      { de: "a cargo bike", tr: "kargo bisikleti" },
      { de: "a battery", tr: "pil" },
      { de: "narrow", tr: "dar" },
      { de: "positive", tr: "olumlu" },
      { de: "a parcel", tr: "koli" },
      { de: "design", tr: "tasarım" },
      { de: "affect", tr: "etkilemek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Pınar", text: "Thanks, everyone. I will give you a short update on the cargo bike project before we move on to the budget." },
      { speaker: "Pınar", text: "Here is the main news. By June the pilot will have been finished. Twenty bikes are being used by delivery drivers in the city center right now, and the feedback is very positive." },
      { speaker: "Pınar", text: "This time next month we will be testing the second prototype. It has a longer battery life and a lower height, which should make loading easier." },
      { speaker: "Pınar", text: "The quantity of parts we need for the first hundred bikes will have been checked by then. Our supplier in Poland has promised to confirm everything by the end of April." },
      { speaker: "Pınar", text: "One thing is still open. The drivers say the box is too narrow for some parcels, so the width of the box will have to change." },
      { speaker: "Pınar", text: "We will be discussing that with the design team next week. If the change is small, it will not affect the schedule." },
      { speaker: "Pınar", text: "By the end of the summer, the first hundred bikes will have been delivered to our customers. That is the plan, and so far we are on track." },
      { speaker: "Pınar", text: "Any questions before we move on?" },
    ],
    questions: [
      {
        text: "Who is using the bikes in the pilot?",
        options: ["delivery drivers", "students", "the design team"],
        answer: 0,
        explain: "„Twenty bikes are being used by delivery drivers in the city center right now…“",
      },
      {
        text: "What is new about the second prototype?",
        options: ["a longer battery life and a lower height", "a bigger box", "a new supplier"],
        answer: 0,
        explain: "„It has a longer battery life and a lower height, which should make loading easier.“",
      },
      {
        kind: "truefalse",
        text: "The drivers think the box is too wide.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The drivers say the box is too narrow for some parcels…“",
      },
      {
        kind: "gapfill",
        text: "This time next month we will be testing the second ___.",
        options: [],
        answer: 0,
        accept: ["prototype"],
        explain: "„This time next month we will be testing the second prototype.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By June the pilot will have been finished.", "By June the pilot will have been finished"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will they discuss the box with the design team?",
        options: [],
        answer: 0,
        accept: ["next week", "in a week"],
        explain: "„We will be discussing that with the design team next week.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u06-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "Workshop instructions",
    genre: "info",
    intro: "Atölye için adım adım talimat ve onarım kartı hazırla.",
    gloss: [
      { de: "having filtered", tr: "süzdükten sonra" },
      { de: "being loaded", tr: "yüklendiği için" },
      { de: "glued", tr: "yapıştırılan" },
      { de: "the treatment", tr: "işlemden geçirilmesi" },
      { de: "a layer", tr: "katman" },
      { de: "a strap", tr: "kayış" },
      { de: "a rope", tr: "ip" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sıvıyı süzdükten sonra tozu karıştır.",
        answer: "Having filtered the liquid, mix the powder.",
        hint: "İki yarının da öznesi aynı: yazılmayan „sen“.",
      },
      {
        kind: "build",
        tr: "Önce yüklendiği için sandık en son varıyor.",
        answer: "Being loaded first, the crate arrives last.",
        hint: "Aynı anda olan iş: yalın „-ing“.",
      },
      {
        kind: "build",
        tr: "Pazartesi yapıştırılan bileşen sınandı.",
        answer: "Glued on Monday, the component was tested.",
        hint: "Üçüncü hâlle başlıyor: yapıştıran söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Yüzeyin işlemden geçirilmesi iki saat sürdü.",
        answer: "The treatment of the surface took two hours.",
        hint: "İsim bir sayı taşıyabiliyor; fiil taşıyamıyor.",
      },
      {
        kind: "form",
        prompt: "Atölye için onarım kartını doldur.",
        facts: "Önce eski tutkal zımparayla temizleniyor; ince bir kat tutkal sürülüyor; sandalye bir kayışla bağlanıyor; pazartesi yapıştırılan sandalye salı akşamı kullanılabiliyor.",
        fields: [
          { label: "First step", answer: "remove the old glue", accept: ["clean off the old glue", "remove old glue"] },
          { label: "Glue", answer: "a thin layer", accept: ["thin layer", "a small quantity"] },
          { label: "Holding it together", answer: "a strap", accept: ["with a strap", "a strap or rope"] },
          { label: "Glued on Monday, ready on", answer: "Tuesday evening", accept: ["Tuesday", "on Tuesday evening"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u06-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "Notes on the pilot",
    genre: "info",
    intro: "Pilot proje ve kaynağı belirsiz bir haber hakkında kısa notlar yaz.",
    gloss: [
      { de: "it is reported that", tr: "bildiriliyor ki" },
      { de: "are said to verify", tr: "doğruladığı söyleniyor" },
      { de: "is thought to be", tr: "olduğu düşünülüyor" },
      { de: "will have been finished", tr: "bitirilmiş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kökenin belirsiz olduğu bildiriliyor.",
        answer: "It is reported that the origin is unclear.",
        hint: "Uzun yol: „it“ özne, rapor „that“ cümleciğinde.",
      },
      {
        kind: "build",
        tr: "Rakamların iddiayı doğruladığı söyleniyor.",
        answer: "The figures are said to verify the claim.",
        hint: "Kısa yol: özne öne çıkıyor, geriye mastar kalıyor.",
      },
      {
        kind: "build",
        tr: "Doğruluğun yüksek olduğu düşünülüyor.",
        answer: "The accuracy is thought to be high.",
        hint: "Sınama: fiilin önüne bir ad koy, cümle hâlâ doğru mu?",
      },
      {
        kind: "build",
        tr: "Hazirana kadar pilot uygulama bitirilmiş olacak.",
        answer: "By June the pilot will have been finished.",
        hint: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Miktar o zamana kadar denetlenmiş olacak.",
        answer: "The quantity will have been checked by then.",
        hint: "Aynı dört sözcük; kimin denetleyeceği belli değil.",
      },
    ],
  },
];

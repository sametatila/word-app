import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 7 — "Mayısta denetlenen, ne değişti, hiçbir yerde
 * yazmıyor, taşınmış olmalı".
 *
 * Dört ders: Which was checked in May · What was changed ·
 * Nowhere is it written · It must have been moved.
 *
 *   Kelime: sensor, manual, govern, trial, column, row, cell, footnote,
 *           entry, inventory, surplus, reserve, overtime, warehouse,
 *           workshop, align, safeguard, precaution, outage, guard,
 *           vulnerability, negligence, violation, omission, disruption,
 *           maintenance, lower, upkeep, restoration, collapse, jam,
 *           insert.
 *   Kalıp:  The sensor, which was checked in May, failed. ·
 *           The manual is old, which is why we stopped. ·
 *           The rule to which we refer governs the trial. ·
 *           What was changed is the entry. ·
 *           It was the inventory that failed. ·
 *           What is missing is the surplus. ·
 *           Nowhere is it written that a safeguard is optional. ·
 *           Rarely has a precaution been so useful. ·
 *           Only after the outage did they act. ·
 *           The disruption must have been caused by the update. ·
 *           The maintenance can't have been done last week. ·
 *           Someone should have lowered the pressure.
 *
 * Ünitenin tek öğretme noktası KİPLİ EDİLGENİN GEÇMİŞE DÖNÜK HÂLİ. Ünite
 * 2 ve 4 geçmişe dönük kipleri, ünite 6 edilgeni ayrı ayrı öğretmişti;
 * burada ikisi üst üste biniyor ve dizilişte tek bir seçenek kalıyor:
 * „must“ + „have“ + „been“ + üçüncü hâl. Dört sözcük, tek sıra.
 */
export const enB2U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u07-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "Incident report on Line 3",
    genre: "report",
    intro: "Üretim hattı dört saat durdu. Olay raporu neyi kesin biliyor, neyi bilmiyor?",
    gloss: [
      { de: "software", tr: "yazılım" },
      { de: "to install", tr: "yüklemek" },
      { de: "to appear", tr: "ortaya çıkmak" },
      { de: "a tank", tr: "tank" },
      { de: "a log", tr: "kayıt defteri" },
      { de: "an approval", tr: "onay" },
      { de: "an action", tr: "önlem" },
      { de: "a technician", tr: "teknisyen" },
      { de: "ill", tr: "hasta" },
    ],
    minutes: 9,
    text:
      "INCIDENT REPORT: LINE 3 STOPPAGE, 14 MARCH\n" +
      "Summary. At 06:40 on Tuesday, the bottling machines on Line 3 stopped for four hours. Nobody was hurt, but about 18,000 bottles had to be thrown away and two deliveries were late.\n" +
      "What we know. The disruption must have been caused by the software update that was installed on Sunday night. The machines ran normally until the update, and the same fault appeared on Line 4, which received the same update on Monday. The pressure in the filling tanks should have been lowered before the restart, but the new software does not show that step on the screen.\n" +
      "What we do not know yet. The sensor on the main tank can't have been checked last week, because the maintenance log for that week is empty. It may have been checked and not recorded, or it may not have been checked at all. We are asking the night shift.\n" +
      "What went wrong in the process. The update must have been approved by somebody, but the approval is not in the system. Someone should have tested it on one line first. The manual says that every update has to be tried on a single line for 24 hours, and this rule was not followed.\n" +
      "Actions. The update has been removed from Lines 3 and 4. A technician will check every sensor before Friday, and the maintenance log will be printed and signed every day until the new system is fixed. From next month, no update can be installed without two signatures.\n" +
      "Report prepared by Hakan Demir, maintenance manager.",
    questions: [
      {
        text: "What must have caused the disruption?",
        options: ["the software update", "a broken sensor", "the night shift"],
        answer: 0,
        explain: "„The disruption must have been caused by the software update that was installed on Sunday night.“",
      },
      {
        text: "Why is it unclear whether the sensor was checked last week?",
        options: ["The maintenance log is empty.", "The technician was ill.", "Line 3 was closed."],
        answer: 0,
        explain: "„because the maintenance log for that week is empty.“",
      },
      {
        kind: "truefalse",
        text: "The same fault appeared on Line 4.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the same fault appeared on Line 4, which received the same update on Monday.“",
      },
      {
        kind: "gapfill",
        text: "The pressure in the filling tanks should have been ___ before the restart.",
        options: [],
        answer: 0,
        accept: ["lowered"],
        explain: "„The pressure in the filling tanks should have been lowered before the restart…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The machines on Line 3 stopped for four hours.",
          "The update must have caused the disruption.",
          "Nobody knows if the sensor was checked.",
          "No update can be installed without two signatures.",
        ],
        explain: "Özet, bilinenler, bilinmeyenler, en sonda alınan önlemler.",
      },
      {
        kind: "short_answer",
        text: "How long must every update be tried on a single line?",
        options: [],
        answer: 0,
        accept: ["24 hours", "for 24 hours", "twenty-four hours", "a day"],
        explain: "„every update has to be tried on a single line for 24 hours…“",
      },
    ],
  },
  {
    id: "en-b2-u07-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "The site manager's letter",
    genre: "letter",
    intro: "Elektrik kesintisinden sonra tesis müdüründen çalışanlara mektup. Neler değişiyor?",
    gloss: [
      { de: "a power outage", tr: "elektrik kesintisi" },
      { de: "frozen", tr: "donmuş" },
      { de: "stock", tr: "stok" },
      { de: "backup", tr: "yedek" },
      { de: "a generator", tr: "jeneratör" },
      { de: "discover", tr: "keşfetmek" },
      { de: "an alarm", tr: "alarm" },
      { de: "electrical", tr: "elektrikli" },
      { de: "wonder", tr: "merak etmek" },
    ],
    minutes: 9,
    text:
      "Dear colleagues,\n" +
      "Three weeks ago the power outage stopped both warehouses for a whole night. Many of you worked overtime to save the frozen stock, and I want to thank you properly.\n" +
      "I also want to be honest about what we learned. Nowhere in our safety manual is it written that the backup generator must be tested every month. We tested it once a year, and on the night it was needed, it failed after twenty minutes. Rarely has a small precaution been so important.\n" +
      "Only after the outage did we discover how many things depend on that one machine: the cold rooms, the doors, the alarm system and the computers that track our inventory. Not once in ten years had anybody made a list of them.\n" +
      "So we are changing four things. The generator will be tested on the first Monday of every month. A second, smaller generator will guard the cold rooms. The workshop team will write down every vulnerability they know about, and we will read the list together in May. And the manual will finally say what nobody wrote down before: a safeguard is not optional.\n" +
      "Under no circumstances should anyone try to repair the electrical system alone. If the lights go out, call the maintenance number first.\n" +
      "Never again do I want to stand in a dark warehouse and wonder which machines are still running. With your help, I am sure I will not have to.\n" +
      "Best regards,\n" +
      "Leyla Arslan, Site Manager",
    questions: [
      {
        text: "How often was the generator tested before the outage?",
        options: ["once a year", "every month", "never"],
        answer: 0,
        explain: "„We tested it once a year, and on the night it was needed, it failed after twenty minutes.“",
      },
      {
        text: "What will guard the cold rooms?",
        options: ["a second, smaller generator", "the workshop team", "a new alarm"],
        answer: 0,
        explain: "„A second, smaller generator will guard the cold rooms.“",
      },
      {
        kind: "truefalse",
        text: "The manual already said that the generator must be tested every month.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nowhere in our safety manual is it written that the backup generator must be tested every month.“",
      },
      {
        kind: "gapfill",
        text: "Only after the outage did we ___ how many things depend on that one machine.",
        options: [],
        answer: 0,
        accept: ["discover"],
        explain: "„Only after the outage did we discover how many things depend on that one machine…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Many colleagues worked overtime to save the stock.",
          "The generator failed after twenty minutes.",
          "The generator will be tested every month.",
          "Call the maintenance number first.",
        ],
        explain: "Teşekkür, olanlar, yapılacak değişiklikler, en sonda bir uyarı.",
      },
      {
        kind: "short_answer",
        text: "When will they read the list of vulnerabilities together?",
        options: [],
        answer: 0,
        accept: ["in May", "May"],
        explain: "„we will read the list together in May.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u07-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "The cold room sensor",
    genre: "dialogue",
    intro: "Soğuk odadaki algılayıcı bozuldu. Alarm neden çalmadı?",
    gloss: [
      { de: "an alarm", tr: "alarm" },
      { de: "an audit", tr: "denetim" },
      { de: "own", tr: "kendi" },
      { de: "a technician", tr: "teknisyen" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Sinem", text: "Have you seen the report from the cold room? The sensor, which was checked in May, failed on Saturday night." },
      { speaker: "Tarık", text: "Only one sensor? I thought there were several in that room." },
      { speaker: "Sinem", text: "No, there is just one on that line, which is exactly the problem. When it failed, nothing else was watching the temperature." },
      { speaker: "Tarık", text: "How warm did it get?" },
      { speaker: "Sinem", text: "Eleven degrees for about six hours. The fish, which we had moved there on Friday, all had to be thrown away." },
      { speaker: "Tarık", text: "And the alarm? Nobody called me." },
      { speaker: "Sinem", text: "The alarm is connected to the sensor, which is why it stayed silent. If the sensor says everything is fine, the alarm believes it." },
      { speaker: "Tarık", text: "What does the manual say?" },
      { speaker: "Sinem", text: "The manual is five years old, which is why we stopped using it. But the rule to which we refer in every audit is clear: two sensors in every cold room." },
      { speaker: "Tarık", text: "So we were breaking our own rule." },
      { speaker: "Sinem", text: "We were. The footnote under the inventory table even says so, in row twelve, which nobody ever reads." },
      { speaker: "Tarık", text: "What happens now?" },
      { speaker: "Sinem", text: "A second sensor goes in on Monday. The supplier, whose technician is coming at eight, has promised to stay until both are working." },
    ],
    questions: [
      {
        text: "How many sensors are on that line?",
        options: ["one", "several", "two"],
        answer: 0,
        explain: "„No, there is just one on that line, which is exactly the problem.“",
      },
      {
        text: "Why did the alarm stay silent?",
        options: ["It is connected to the sensor.", "Nobody switched it on.", "Tarık turned it off."],
        answer: 0,
        explain: "„The alarm is connected to the sensor, which is why it stayed silent.“",
      },
      {
        kind: "truefalse",
        text: "The fish had to be thrown away.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The fish, which we had moved there on Friday, all had to be thrown away.“",
      },
      {
        kind: "gapfill",
        text: "The rule to ___ we refer in every audit is clear.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "„But the rule to which we refer in every audit is clear: two sensors in every cold room.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The sensor, which was checked in May, failed on Saturday night.", "The sensor, which was checked in May, failed on Saturday night"],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir algılayıcı var.",
      },
      {
        kind: "short_answer",
        text: "When does the second sensor go in?",
        options: [],
        answer: 0,
        accept: ["on Monday", "Monday"],
        explain: "„A second sensor goes in on Monday.“",
      },
    ],
  },
  {
    id: "en-b2-u07-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "A gap in the stock count",
    genre: "monologue",
    intro: "Depo müdürünün hafta sonu öncesi sesli mesajı. Stok sayımında ne yanlış gitti?",
    gloss: [
      { de: "stock", tr: "stok" },
      { de: "a rumor", tr: "söylenti" },
      { de: "software", tr: "yazılım" },
      { de: "a pallet", tr: "palet" },
      { de: "in reality", tr: "gerçekte" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ozan", text: "Hi everyone, it is Ozan. A quick update on the stock count before the weekend, because I know there have been rumors." },
      { speaker: "Ozan", text: "First, what was changed is the entry, not the stock. Nobody has taken anything from the warehouse." },
      { speaker: "Ozan", text: "It was the inventory that failed. The software counted the same pallet of printer paper twice, once in row four and once in row nine." },
      { speaker: "Ozan", text: "What is missing is the surplus we expected. We thought we had two hundred boxes in reserve. In reality we have about forty." },
      { speaker: "Ozan", text: "It was Julia who noticed the problem. She compared the screen with the shelves on Tuesday, during her overtime, and the numbers did not align." },
      { speaker: "Ozan", text: "What I need from you is simple. Please do not order anything from the reserve until Monday." },
      { speaker: "Ozan", text: "The correct entry was inserted this morning, and a full count by hand will take place on Saturday." },
      { speaker: "Ozan", text: "It is the Saturday team that I want to thank in advance. Coffee and breakfast are on me." },
    ],
    questions: [
      {
        text: "What was changed?",
        options: ["the entry", "the stock", "the shelves"],
        answer: 0,
        explain: "„First, what was changed is the entry, not the stock.“",
      },
      {
        text: "Who noticed the problem?",
        options: ["Julia", "Ozan", "the Saturday team"],
        answer: 0,
        explain: "„It was Julia who noticed the problem.“",
      },
      {
        kind: "truefalse",
        text: "Someone took boxes from the warehouse.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody has taken anything from the warehouse.“",
      },
      {
        kind: "gapfill",
        text: "We thought we had two hundred boxes in ___.",
        options: [],
        answer: 0,
        accept: ["reserve"],
        explain: "„We thought we had two hundred boxes in reserve.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It was the inventory that failed.", "It was the inventory that failed"],
        explain: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "short_answer",
        text: "When will the full count take place?",
        options: [],
        answer: 0,
        accept: ["on Saturday", "Saturday"],
        explain: "„a full count by hand will take place on Saturday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u07-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "A maintenance report",
    genre: "info",
    intro: "Hattaki arıza için bakım raporunun cümlelerini kur, sonra arıza kartını doldur.",
    gloss: [
      { de: "must have been caused", tr: "yol açmış olmalı" },
      { de: "can't have been done", tr: "yapılmış olamaz" },
      { de: "should have lowered", tr: "indirmesi gerekirdi" },
      { de: "which was checked", tr: "denetlenen" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Aksamaya güncelleme yol açmış olmalı.",
        answer: "The disruption must have been caused by the update.",
        hint: "Dört sözcük, tek sıra: must, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Bakım geçen hafta yapılmış olamaz.",
        answer: "The maintenance can't have been done last week.",
        hint: "Olumsuz çıkarım ve edilgen üst üste; sıra yine aynı.",
      },
      {
        kind: "build",
        tr: "Birinin basıncı indirmesi gerekirdi.",
        answer: "Someone should have lowered the pressure.",
        hint: "Etken ve kısa: yargı, kanıt okuması değil.",
      },
      {
        kind: "build",
        tr: "Mayısta denetlenen algılayıcı arızalandı.",
        answer: "The sensor, which was checked in May, failed.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
      {
        kind: "form",
        prompt: "Olay raporu için arıza kartını doldur.",
        facts: "Aksamaya büyük olasılıkla güncelleme yol açtı; bakım geçen hafta yapılmamış olmalı; biri basıncı indirmeliydi; mayısta denetlenen algılayıcı arızalandı.",
        fields: [
          { label: "Cause", answer: "the update", accept: ["must have been caused by the update", "update"] },
          { label: "Maintenance last week", answer: "can't have been done", accept: ["not done", "cannot have been done", "not done last week"] },
          { label: "Pressure", answer: "should have been lowered", accept: ["should have lowered", "someone should have lowered it", "lower it"] },
          { label: "Failed part", answer: "the sensor", accept: ["sensor", "the sensor checked in May"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u07-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "Safety after the outage",
    genre: "opinion",
    intro: "Kesintiden sonraki güvenlik notunun cümlelerini kur: ne hiçbir yerde yazmıyordu, ne değişti?",
    gloss: [
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "rarely", tr: "nadiren" },
      { de: "only after", tr: "ancak … sonra" },
      { de: "what was changed", tr: "değişen şey" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Güvence önleminin isteğe bağlı olduğu hiçbir yerde yazmıyor.",
        answer: "Nowhere is it written that a safeguard is optional.",
        hint: "Olumsuz zarf başta; „is“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir tedbir nadiren bu kadar yararlı oldu.",
        answer: "Rarely has a precaution been so useful.",
        hint: "„has“ özneyi atlıyor, fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "build",
        tr: "Ancak kesintiden sonra harekete geçtiler.",
        answer: "Only after the outage did they act.",
        hint: "Taşınacak yardımcı fiil yoksa „did“ geliyor.",
      },
      {
        kind: "build",
        tr: "Değişen şey kayıt satırı.",
        answer: "What was changed is the entry.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Başarısız olan envanterdi.",
        answer: "It was the inventory that failed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 6 — "Sağlık: belirti, izin, çare".
 *
 * Dört ders: Beim Arzt · Ich fühle mich nicht gut · Das dürfen Sie nicht! ·
 * Omas Hausmittel. İçerik ünite 1-6'nın kelimeleriyle sınırlı.
 *
 *   Ünite 6: die Krankheit, das Medikament, husten, die Behandlung,
 *            untersuchen, die Sprechstunde, der Magen, der Puls ·
 *            sich fühlen, schwindlig, übel, die Grippe, erkältet sein,
 *            schlimm, niesen, sich anstecken · dürfen, erlaubt,
 *            die Erlaubnis, schädlich, harmlos, vorsichtig, gefährlich, fett ·
 *            das Mittel, die Zitrone, der Tipp, die Orange, der Löffel,
 *            rühren, heiß, lauwarm
 *   Kalıplar: Sie sollen … nehmen. · Was soll ich machen? ·
 *             Ich fühle mich nicht gut. · Mir ist schwindlig. · Darf ich …? ·
 *             Das dürfen Sie nicht. · Du solltest … trinken. ·
 *             Das hilft gegen …
 *
 * Üç şey ölçülüyor: sollen ile dürfen ayrımı (aktarılan tavsiye ↔ izin),
 * izin fiilinin olumsuzunun "gerek yok" değil "YASAK" demesi ve belirtiyi
 * yaşayan kişinin özne olmaması ("Mir ist schwindlig", "Ich bin schwindlig"
 * değil).
 */
export const a2U06: SkillExercise[] = [
  {
    id: "a2-u06-r1",
    level: "A2",
    skill: "reading",
    unit: 6,
    title: "Hinweise für Patienten",
    genre: "Bilgilendirme",
    intro: "Muayenehanenin bekleme odasındaki bilgi yazısı. Ne zaman gelinir, ne getirilir?",
    gloss: [
      { de: "die Sprechstunde", tr: "muayene saati", en: "consultation hours" },
      { de: "die Behandlung", tr: "tedavi", en: "treatment" },
      { de: "untersuchen", tr: "muayene etmek", en: "to examine" },
      { de: "das Medikament", tr: "ilaç", en: "medicine" },
      { de: "husten", tr: "öksürmek", en: "to cough" },
      { de: "die Krankheit", tr: "hastalık", en: "illness" },
      { de: "vorsichtig", tr: "dikkatli", en: "careful" },
    ],
    minutes: 4,
    text:
      "PRAXIS DR. WEBER — HINWEISE FÜR PATIENTEN\n\n" +
      "Unsere Sprechstunde ist von Montag bis Freitag von 8 bis 12 Uhr. Am Dienstag und Donnerstag sind wir zusätzlich von 15 bis 18 Uhr für Sie da. Am Mittwochnachmittag bleibt die Praxis geschlossen.\n\n" +
      "Bitte bringen Sie zu jedem Termin Ihre Karte mit. Wenn Sie schon Medikamente nehmen, schreiben Sie die Namen bitte auf einen Zettel.\n\n" +
      "Wer stark hustet oder Fieber hat, meldet sich bitte am Empfang und wartet im kleinen Raum links. So schützen wir andere Patienten.\n\n" +
      "Vor einer Behandlung untersuchen wir Sie immer zuerst. Seien Sie bitte vorsichtig mit Informationen aus dem Internet: nicht jede Krankheit sieht gleich aus.",
    questions: [
      {
        text: "Wann ist die Praxis am Nachmittag offen?",
        options: ["Montag und Freitag", "Dienstag und Donnerstag", "Jeden Tag"],
        answer: 1,
        explain: "„Am Dienstag und Donnerstag sind wir zusätzlich von 15 bis 18 Uhr für Sie da.“",
      },
      {
        kind: "gapfill",
        text: "Am Mittwochnachmittag bleibt die Praxis ___.",
        options: [],
        answer: 0,
        accept: ["geschlossen"],
        explain: "„Am Mittwochnachmittag bleibt die Praxis geschlossen.“",
      },
      {
        text: "Was soll man zu jedem Termin mitbringen?",
        options: ["Einen Zettel", "Die Karte", "Ein Medikament"],
        answer: 1,
        explain: "„Bitte bringen Sie zu jedem Termin Ihre Karte mit.“ Zettel yalnız ilaç isimleri için.",
      },
      {
        kind: "short_answer",
        text: "Wo warten Patienten mit Husten oder Fieber?",
        options: [],
        answer: 0,
        accept: ["im kleinen Raum links", "im kleinen Raum", "links"],
        explain: "„wartet im kleinen Raum links“ — böylece öteki hastalar korunuyor.",
      },
      {
        text: "Die Praxis untersucht Patienten erst nach der Behandlung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Vor einer Behandlung untersuchen wir Sie immer zuerst.“",
      },
    ],
  },
  {
    id: "a2-u06-r2",
    level: "A2",
    skill: "reading",
    unit: 6,
    title: "Omas Hausmittel",
    genre: "Dergi yazısı",
    intro: "Ev çareleri üzerine kısa bir yazı. Neye ne iyi geliyor?",
    gloss: [
      { de: "das Mittel", tr: "çare", en: "remedy" },
      { de: "die Zitrone", tr: "limon", en: "lemon" },
      { de: "die Orange", tr: "portakal", en: "orange" },
      { de: "der Löffel", tr: "kaşık", en: "spoon" },
      { de: "rühren", tr: "karıştırmak", en: "to stir" },
      { de: "heiß", tr: "sıcak", en: "hot" },
      { de: "lauwarm", tr: "ılık", en: "lukewarm" },
      { de: "der Tipp", tr: "tavsiye", en: "tip" },
    ],
    minutes: 4,
    text:
      "Nicht gegen alles braucht man ein Medikament. Viele alte Hausmittel helfen wirklich — und man hat sie meistens zu Hause.\n\n" +
      "Gegen Halsschmerzen hilft heißer Tee mit Zitrone. Wichtig: der Tee soll nicht zu heiß sein, sondern lauwarm, sonst tut er dem Hals nur weh. Man nimmt einen Löffel Honig und rührt ihn langsam ein.\n\n" +
      "Bei einer Erkältung ist Vitamin C ein gutes Mittel. Eine Orange am Tag reicht schon.\n\n" +
      "Und ein Tipp von meiner Großmutter: warme Socken. Sie hat immer gesagt, kalte Füße machen krank. Ob das stimmt, weiß ich nicht — aber schaden kann es nicht.",
    questions: [
      {
        text: "Wie soll der Tee sein?",
        options: ["Sehr heiß", "Lauwarm", "Kalt"],
        answer: 1,
        explain: "„der Tee soll nicht zu heiß sein, sondern lauwarm“ — çok sıcağı boğaza zarar veriyor.",
      },
      {
        kind: "gapfill",
        text: "Man nimmt einen Löffel Honig und ___ ihn langsam ein.",
        options: [],
        answer: 0,
        accept: ["rührt"],
        explain: "„einrühren“ ayrılabilen bir fiil; şimdiki zamanda ön ek cümlenin sonuna düşer.",
      },
      {
        text: "Was hilft bei einer Erkältung?",
        options: ["Vitamin C", "Kalte Füße", "Ein Medikament"],
        answer: 0,
        explain: "„Bei einer Erkältung ist Vitamin C ein gutes Mittel. Eine Orange am Tag reicht schon.“",
      },
      {
        kind: "short_answer",
        text: "Was war der Tipp der Großmutter?",
        options: [],
        answer: 0,
        accept: ["warme Socken", "Socken"],
        explain: "„Und ein Tipp von meiner Großmutter: warme Socken.“",
      },
      {
        text: "Der Autor ist sicher, dass kalte Füße krank machen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ob das stimmt, weiß ich nicht — aber schaden kann es nicht.“",
      },
    ],
  },
  {
    id: "a2-u06-l1",
    level: "A2",
    skill: "listening",
    unit: 6,
    title: "Ich fühle mich nicht gut",
    genre: "Diyalog",
    intro: "İşte bir sohbet: belirtiler neler, ne yapması öneriliyor?",
    gloss: [
      { de: "sich fühlen", tr: "kendini hissetmek", en: "to feel" },
      { de: "schwindlig", tr: "başı dönen", en: "dizzy" },
      { de: "übel", tr: "midesi bulanan", en: "queasy" },
      { de: "niesen", tr: "hapşırmak", en: "to sneeze" },
      { de: "die Grippe", tr: "grip", en: "flu" },
      { de: "sich anstecken", tr: "hastalık kapmak", en: "to catch an illness" },
      { de: "schlimm", tr: "fena", en: "bad" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Kolleginnen", text: "Du siehst blass aus. Fühlst du dich nicht gut?" },
      { speaker: "Mert", text: "Nein, seit heute Morgen nicht. Mir ist schwindlig, und mir ist auch ein bisschen übel." },
      { speaker: "Kolleginnen", text: "Hast du Fieber?" },
      { speaker: "Mert", text: "Ich glaube nicht. Aber ich niese seit gestern die ganze Zeit." },
      { speaker: "Kolleginnen", text: "Das klingt eher nach einer Erkältung als nach Grippe. Trotzdem: geh nach Hause." },
      { speaker: "Mert", text: "So schlimm ist es nicht. Ich habe heute noch zwei Termine." },
      { speaker: "Kolleginnen", text: "Und wenn wir uns alle bei dir anstecken? Ruf lieber die Praxis an und frag, was du machen sollst." },
    ],
    questions: [
      {
        text: "Welche Beschwerden hat Mert?",
        options: ["Kopfschmerzen und Fieber", "Schwindel und Übelkeit", "Bauchschmerzen"],
        answer: 1,
        explain: "„Mir ist schwindlig, und mir ist auch ein bisschen übel.“ Ateşi olduğunu sanmıyor.",
      },
      {
        kind: "gapfill",
        text: "Mir ist ___.",
        options: [],
        answer: 0,
        accept: ["schwindlig"],
        explain: "Bu belirtide kişi özne olmaz, yönelme hâlinde durur: „Mir ist schwindlig“, „Ich bin schwindlig“ değil.",
      },
      {
        text: "Was denkt die Kollegin?",
        options: ["Es ist eine Grippe.", "Es ist eher eine Erkältung.", "Er hat nichts."],
        answer: 1,
        explain: "„Das klingt eher nach einer Erkältung als nach Grippe.“",
      },
      {
        kind: "dictation",
        text: "Kollegin'in son cümlesinin ilk yarısını yaz: „Und wenn wir …“",
        options: [],
        answer: 0,
        accept: ["Und wenn wir uns alle bei dir anstecken?"],
        explain: "„sich anstecken“ dönüşlü; yan cümlede fiil sona gider — „uns … anstecken“.",
      },
    ],
  },
  {
    id: "a2-u06-l2",
    level: "A2",
    skill: "listening",
    unit: 6,
    title: "Darf ich das?",
    genre: "Diyalog",
    intro: "Kontrol muayenesi. Neye izin var, ne yasak?",
    gloss: [
      { de: "erlaubt", tr: "serbest", en: "allowed" },
      { de: "die Erlaubnis", tr: "izin", en: "permission" },
      { de: "gefährlich", tr: "tehlikeli", en: "dangerous" },
      { de: "schädlich", tr: "zararlı", en: "harmful" },
      { de: "harmlos", tr: "zararsız", en: "harmless" },
      { de: "fett", tr: "yağlı", en: "fatty" },
      { de: "der Magen", tr: "mide", en: "stomach" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Kaya", text: "Frau Doktor, darf ich wieder Sport machen?" },
      { speaker: "Ärztin", text: "Spazieren gehen ja, das ist harmlos. Aber Fußball dürfen Sie noch nicht — das wäre zu gefährlich für das Knie." },
      { speaker: "Herr Kaya", text: "Und wie lange noch?" },
      { speaker: "Ärztin", text: "Mindestens vier Wochen. Danach schauen wir noch einmal." },
      { speaker: "Herr Kaya", text: "Okay. Und darf ich alles essen? Meine Frau kocht ziemlich fett." },
      { speaker: "Ärztin", text: "Erlaubt ist fast alles. Sehr fettes Essen ist aber schädlich für Ihren Magen, besonders am Abend." },
      { speaker: "Herr Kaya", text: "Verstanden. Und Kaffee?" },
      { speaker: "Ärztin", text: "Zwei Tassen am Tag, das ist in Ordnung. Mehr sollten Sie nicht trinken." },
    ],
    questions: [
      {
        text: "Was darf Herr Kaya machen?",
        options: ["Fußball spielen", "Spazieren gehen", "Gar keinen Sport"],
        answer: 1,
        explain: "„Spazieren gehen ja, das ist harmlos. Aber Fußball dürfen Sie noch nicht.“",
      },
      {
        kind: "gapfill",
        text: "Aber Fußball ___ Sie noch nicht.",
        options: [],
        answer: 0,
        accept: ["dürfen"],
        explain: "İzin fiilinin olumsuzu „gerek yok“ değil YASAK demektir — burada tam da bu anlamda.",
      },
      {
        text: "Warum ist sehr fettes Essen ein Problem?",
        options: ["Es ist schädlich für den Magen.", "Es ist gefährlich für das Knie.", "Es ist zu teuer."],
        answer: 0,
        explain: "„Sehr fettes Essen ist aber schädlich für Ihren Magen, besonders am Abend.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel Kaffee ist in Ordnung?",
        options: [],
        answer: 0,
        accept: ["zwei Tassen", "zwei Tassen am Tag", "2 Tassen"],
        explain: "„Zwei Tassen am Tag, das ist in Ordnung.“",
      },
    ],
  },
  {
    id: "a2-u06-w1",
    level: "A2",
    skill: "writing",
    unit: 6,
    title: "sollen, dürfen und „mir ist …“",
    genre: "Dil bilgisi",
    intro: "Aktarılan tavsiye, izin ve belirtinin hâli. Üçü de kolayca karışır.",
    gloss: [
      { de: "das Medikament", tr: "ilaç", en: "medicine" },
      { de: "erlaubt", tr: "serbest", en: "allowed" },
      { de: "schwindlig", tr: "başı dönen", en: "dizzy" },
      { de: "das Mittel", tr: "çare", en: "remedy" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Akşamları iki hap almalısınız.",
        answer: "Abends sollen Sie zwei Tabletten nehmen",
        hint: "Doktorun söylediği aktarılıyor → „sollen“. Zaman zarfı başta olunca özne fiilin arkasına düşer.",
      },
      {
        kind: "build",
        tr: "Spor yapabilir miyim?",
        answer: "Darf ich Sport machen",
        hint: "İzin soruluyor → „dürfen“. Kip fiili başa geçer, asıl fiil sonda kalır.",
      },
      {
        kind: "build",
        tr: "Bu öksürüğe iyi gelir.",
        answer: "Das hilft gegen Husten",
        hint: "Neye iyi geldiği „gegen“ ile söylenir ve bu edat belirtme hâlini getirir.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi doğru hâlle yeniden yaz: bu belirtide kişi özne olmaz.",
        source: "Ich bin schwindlig.",
        answer: "Mir ist schwindlig.",
        alternatives: ["Mir ist schwindlig"],
        why: "Yazıldığı gibi „ben baş döndürücüyüm“ anlamına gelir. Belirtiyi yaşayan kişi yönelme hâlinde durur.",
      },
    ],
  },
  {
    id: "a2-u06-w2",
    level: "A2",
    skill: "writing",
    unit: 6,
    title: "Einem kranken Freund schreiben",
    genre: "Mesaj",
    intro: "Hasta bir arkadaşına yaz: hâlini sor, iki çare öner, ne yapması gerektiğini söyle.",
    gloss: [
      { de: "sich fühlen", tr: "kendini hissetmek", en: "to feel" },
      { de: "das Mittel", tr: "çare", en: "remedy" },
      { de: "die Zitrone", tr: "limon", en: "lemon" },
      { de: "der Tipp", tr: "tavsiye", en: "tip" },
      { de: "die Sprechstunde", tr: "muayene saati", en: "consultation hours" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Mert'in mesajına cevap yaz. Hâlini sor, en az iki çare öner ve doktora gitmesi gerekip gerekmediği hakkında bir şey söyle.",
        stimulus:
          "Hey,\n\nich bin heute nicht im Büro. Mir ist seit gestern schwindlig und ich niese die ganze Zeit. Kein Fieber, aber ich fühle mich echt schlecht.\n\nHast du einen Tipp?\n\nMert",
        checklist: [
          "Hâlini sordun mu („Wie fühlst du dich?“)?",
          "En az iki çare önerdin mi („Du solltest …“)?",
          "Bir çarenin neye iyi geldiğini söyledin mi („Das hilft gegen …“)?",
          "Doktora gitme konusunda bir şey yazdın mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Wie fühlst du dich heute?", tr: "bugün kendini nasıl hissediyorsun", en: "how do you feel today" },
          { de: "Du solltest viel trinken.", tr: "çok su içsen iyi olur", en: "you should drink a lot" },
          { de: "Das hilft gegen Halsschmerzen.", tr: "bu boğaz ağrısına iyi gelir", en: "that helps against a sore throat" },
        ],
        sample:
          "Hey Mert,\n\ndas klingt nicht gut. Wie fühlst du dich heute?\n\nIch habe zwei Tipps für dich. Du solltest viel trinken, am besten lauwarmen Tee mit Zitrone und einem Löffel Honig. Das hilft wirklich gegen Halsschmerzen. Und iss eine Orange am Tag, Vitamin C ist ein gutes Mittel bei einer Erkältung.\n\nWenn es morgen nicht besser ist, ruf bitte die Praxis an. Die Sprechstunde ist von acht bis zwölf.\n\nGute Besserung!\nLea",
      },
    ],
  },
];

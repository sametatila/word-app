import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 4 — "Ev ve kira dünyası" (dersler 13–16).
 *
 * Dersler: Der Mietvertrag · Ärger im Haus · Das WG-Casting ·
 * Der Schaden muss weg.
 *
 * Bu ünitenin dili iki kutupta duruyor: sözleşme ve arıza talebi KİŞİSİZ
 * (edilgen), komşu ve ev arkadaşı konuşması KİBAR (dilek kipi). Egzersizler
 * ikisini de ayrı ayrı çalıştırıyor, çünkü aynı konuda yanlış kutbu seçmek
 * ya kaba ya anlaşılmaz oluyor.
 *
 * Yeni 32 kelime: verpflichtet, die Kündigung, die Gebühr, das Amt,
 * der Anwalt, regeln, falls, übernehmen, der Lärm, sich beschweren,
 * der Streit, die Nachbarin, der Ärger, still, klopfen, aufmerksam,
 * die WG, gemeinsam, sich einigen, der Hausmeister, reinigen, ordnen,
 * das Haustier, das Zeug, der Schaden, spätestens, der Handwerker,
 * der Mechaniker, die Panne, die Heizung, funktionieren, sorgen.
 */
export const b1U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u4-r1",
    level: "B1",
    skill: "reading",
    unit: 4,
    title: "Was im Mietvertrag steht",
    genre: "Sözleşme özeti",
    intro: "Bir kira sözleşmesinin sade özeti. Edilgen cümlelere dikkat: kimin yaptığı söylenmiyor.",
    minutes: 5,
    gloss: [
      { de: "verpflichtet", tr: "yükümlü", en: "obliged" },
      { de: "die Gebühr", tr: "ücret / harç", en: "fee" },
      { de: "die Kündigung", tr: "fesih bildirimi", en: "termination" },
      { de: "regeln", tr: "düzenlemek", en: "to regulate" },
      { de: "übernehmen", tr: "devralmak", en: "to take over" },
    ],
    text:
      "Im Mietvertrag wird geregelt, was der Mieter und was der Vermieter machen muss. " +
      "Der Mieter ist verpflichtet, die Miete bis zum dritten des Monats zu zahlen. " +
      "Zusätzlich werden jeden Monat Kosten für Heizung und Wasser berechnet. " +
      "Diese Gebühr wird einmal im Jahr genau geprüft.\n\n" +
      "Kleine Reparaturen bis fünfzig Euro werden vom Mieter übernommen. " +
      "Alles, was teurer ist, wird vom Vermieter bezahlt. Wenn etwas kaputt ist, " +
      "muss der Schaden sofort gemeldet werden.\n\n" +
      "Die Kündigung muss schriftlich sein. Die Frist ist drei Monate zum Monatsende. " +
      "Falls Sie früher ausziehen wollen, brauchen Sie einen neuen Mieter. " +
      "Bei Streit hilft oft ein Gespräch; wenn das nicht reicht, wird ein Anwalt oder " +
      "das Amt eingeschaltet. Meistens ist das aber nicht nötig.",
    questions: [
      {
        text: "Bis wann muss die Miete gezahlt werden?",
        options: ["Bis zum ersten", "Bis zum dritten", "Bis zum Monatsende"],
        answer: 1,
        explain: "„Der Mieter ist verpflichtet, die Miete bis zum dritten des Monats zu zahlen.“",
      },
      {
        text: "Wer bezahlt eine Reparatur für achtzig Euro?",
        options: ["Der Mieter", "Der Vermieter", "Das Amt"],
        answer: 1,
        explain: "„Kleine Reparaturen bis fünfzig Euro werden vom Mieter übernommen. Alles, was teurer ist, wird vom Vermieter bezahlt.“",
      },
      {
        text: "Wie lang ist die Frist bei der Kündigung?",
        options: ["Ein Monat", "Zwei Monate", "Drei Monate"],
        answer: 2,
        explain: "„Die Frist ist drei Monate zum Monatsende.“",
      },
      {
        text: "Was braucht man, um früher auszuziehen?",
        options: ["Einen Anwalt", "Einen neuen Mieter", "Eine Gebühr"],
        answer: 1,
        explain: "„Falls Sie früher ausziehen wollen, brauchen Sie einen neuen Mieter.“",
      },
      {
        kind: "gapfill",
        text: "Wenn etwas kaputt ist, muss der Schaden sofort ___ werden.",
        options: [],
        answer: 0,
        accept: ["gemeldet"],
        explain: "Edilgen: yardımcı fiil ile ortaç. „… muss der Schaden sofort gemeldet werden.“",
      },
      {
        kind: "short_answer",
        text: "Bis wie viel Euro zahlt der Mieter eine Reparatur selbst?",
        options: [],
        answer: 0,
        accept: ["bis fünfzig Euro", "fünfzig Euro", "50 Euro"],
        explain: "„Kleine Reparaturen bis fünfzig Euro werden vom Mieter übernommen.“",
      },
    ],
  },
  {
    id: "b1-u4-r2",
    level: "B1",
    skill: "reading",
    unit: 4,
    title: "Zettel im Treppenhaus",
    genre: "Not / duyuru",
    intro: "Merdiven boşluğuna asılmış üç not. Aynı sorun, üç farklı ton. Hangisi işe yarar?",
    minutes: 5,
    gloss: [
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "sich beschweren", tr: "şikâyet etmek", en: "to complain" },
      { de: "der Ärger", tr: "sıkıntı / dert", en: "trouble" },
      { de: "aufmerksam", tr: "dikkatli", en: "considerate" },
      { de: "der Hausmeister", tr: "kapıcı", en: "caretaker" },
    ],
    text:
      "Zettel 1: Der Lärm nachts muss aufhören! Ich habe genug und beschwere mich beim Vermieter. " +
      "Wer nicht still sein kann, soll ausziehen.\n\n" +
      "Zettel 2: Liebe Nachbarn, es wäre schön, wenn es nach zehn Uhr etwas ruhiger wäre. " +
      "Ich stehe früh auf und bin dann sehr müde. Wenn es einmal später wird, ist das kein " +
      "Problem — sagt einfach kurz Bescheid. Vielen Dank, Wohnung 3.\n\n" +
      "Zettel 3: Wegen Ärger im Haus: Am Freitag um acht treffen wir uns unten. " +
      "Der Hausmeister kommt auch. Wir wollen uns gemeinsam einigen, statt jeden Monat " +
      "neue Zettel zu schreiben. Bitte klopft bei mir, falls ihr nicht kommen könnt.\n\n" +
      "Notiz des Hausmeisters: Zettel 2 und 3 sind aufmerksam geschrieben und helfen wirklich. " +
      "Zettel 1 macht den Streit nur größer. Ein Gespräch hilft mehr als ein böser Satz.",
    questions: [
      {
        text: "Was will der Schreiber von Zettel 1?",
        options: ["Ein Gespräch", "Dass der Lärm aufhört", "Ein Treffen"],
        answer: 1,
        explain: "„Der Lärm nachts muss aufhören!“",
      },
      {
        text: "Was bittet Wohnung 3?",
        options: ["Nach zehn Uhr etwas ruhiger zu sein", "Nie laut zu sein", "Auszuziehen"],
        answer: 0,
        explain: "„… es wäre schön, wenn es nach zehn Uhr etwas ruhiger wäre.“",
      },
      {
        text: "Wozu lädt Zettel 3 ein?",
        options: ["Zu einem Treffen am Freitag", "Zu einem Fest", "Zum Hausmeister"],
        answer: 0,
        explain: "„Am Freitag um acht treffen wir uns unten.“",
      },
      {
        text: "Was sagt der Hausmeister über Zettel 1?",
        options: ["Er ist hilfreich", "Er macht den Streit größer", "Er ist zu lang"],
        answer: 1,
        explain: "„Zettel 1 macht den Streit nur größer.“",
      },
      {
        kind: "gapfill",
        text: "Wir wollen uns gemeinsam ___.",
        options: [],
        answer: 0,
        accept: ["einigen"],
        explain: "„Wir wollen uns gemeinsam einigen.“ — uzlaşmak.",
      },
      {
        kind: "short_answer",
        text: "Wann treffen sich die Nachbarn?",
        options: [],
        answer: 0,
        accept: ["am Freitag um acht", "Freitag um acht", "am Freitag"],
        explain: "„Am Freitag um acht treffen wir uns unten.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u4-l1",
    level: "B1",
    skill: "listening",
    unit: 4,
    title: "Das WG-Gespräch",
    genre: "Tanışma konuşması",
    intro: "Paylaşımlı eve aday biri geliyor. Dinle: hangi kurallar var, ne konuşuluyor?",
    minutes: 4,
    gloss: [
      { de: "die WG", tr: "paylaşımlı ev", en: "shared flat" },
      { de: "reinigen", tr: "temizlemek", en: "to clean" },
      { de: "das Haustier", tr: "evcil hayvan", en: "pet" },
      { de: "gemeinsam", tr: "ortak / birlikte", en: "together" },
    ],
    segments: [
      { text: "Schön, dass du da bist. Wir sind zu dritt in der WG." },
      { text: "Danke. Wie ist das mit der Küche und dem Bad?" },
      { text: "Jeder reinigt eine Woche lang alles gemeinsame. Danach ist der Nächste dran." },
      { text: "Das finde ich gut. Und darf man ein Haustier haben?" },
      { text: "Eine Katze wäre möglich, aber wir müssten uns vorher alle einigen." },
      { text: "Verstehe. Wann ist bei euch Ruhe?" },
      { text: "Ab elf. Wenn du länger arbeitest, ist das kein Problem — sag nur Bescheid." },
      { text: "Gut. Ich würde gern nächste Woche einziehen." },
    ],
    questions: [
      {
        text: "Wie viele Personen wohnen in der WG?",
        options: ["Zwei", "Drei", "Vier"],
        answer: 1,
        explain: "„Wir sind zu dritt in der WG.“",
      },
      {
        text: "Wie wird das Reinigen geregelt?",
        options: ["Jeder eine Woche", "Eine Firma kommt", "Jeder sein Zimmer"],
        answer: 0,
        explain: "„Jeder reinigt eine Woche lang alles gemeinsame.“",
      },
      {
        text: "Was gilt für ein Haustier?",
        options: ["Verboten", "Alle müssten sich einigen", "Nur Hunde"],
        answer: 1,
        explain: "„Eine Katze wäre möglich, aber wir müssten uns vorher alle einigen.“",
      },
      {
        kind: "gapfill",
        text: "Ruhe ist ab ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["elf"],
        explain: "„Ab elf.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange reinigt jeder das Gemeinsame?",
        options: [],
        answer: 0,
        accept: ["eine Woche", "eine Woche lang"],
        explain: "„Jeder reinigt eine Woche lang alles gemeinsame.“",
      },
    ],
  },
  {
    id: "b1-u4-l2",
    level: "B1",
    skill: "listening",
    unit: 4,
    title: "Die Heizung ist kaputt",
    genre: "Telefon görüşmesi",
    intro: "Kiracı ev sahibini arıyor. Dinle: ne bozuk, ne zaman geliyorlar?",
    minutes: 4,
    gloss: [
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
      { de: "der Schaden", tr: "hasar / arıza", en: "damage" },
      { de: "der Handwerker", tr: "usta / tamirci", en: "tradesman" },
      { de: "spätestens", tr: "en geç", en: "at the latest" },
    ],
    segments: [
      { text: "Guten Tag, hier ist Familie Yıldız aus der zweiten Etage." },
      { text: "Guten Tag. Was kann ich für Sie tun?" },
      { text: "Unsere Heizung funktioniert seit gestern nicht mehr." },
      { text: "Haben Sie schon geprüft, ob genug Wasser drin ist?" },
      { text: "Ja, das habe ich. Der Schaden ist sicher größer." },
      { text: "Dann schicke ich einen Handwerker. Passt Ihnen morgen Vormittag?" },
      { text: "Morgen arbeite ich. Ginge es auch am Freitag?" },
      { text: "Ja, Freitag spätestens um zwölf ist er bei Ihnen." },
    ],
    questions: [
      {
        text: "Was ist das Problem?",
        options: ["Die Heizung funktioniert nicht", "Das Wasser ist kalt", "Die Tür klemmt"],
        answer: 0,
        explain: "„Unsere Heizung funktioniert seit gestern nicht mehr.“",
      },
      {
        text: "Was hat der Mieter schon geprüft?",
        options: ["Ob genug Wasser drin ist", "Ob der Strom da ist", "Ob das Fenster offen ist"],
        answer: 0,
        explain: "„Haben Sie schon geprüft, ob genug Wasser drin ist?“ — „Ja, das habe ich.“",
      },
      {
        text: "Wann kommt der Handwerker?",
        options: ["Morgen Vormittag", "Am Freitag", "Nächste Woche"],
        answer: 1,
        explain: "„Ja, Freitag spätestens um zwölf ist er bei Ihnen.“",
      },
      {
        kind: "gapfill",
        text: "Freitag ___ um zwölf ist er bei Ihnen.",
        options: [],
        answer: 0,
        accept: ["spätestens"],
        explain: "„Freitag spätestens um zwölf …“",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag kommt der Handwerker?",
        options: [],
        answer: 0,
        accept: ["am Freitag", "Freitag"],
        explain: "„Ja, Freitag spätestens um zwölf ist er bei Ihnen.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u4-w1",
    level: "B1",
    skill: "writing",
    unit: 4,
    title: "Ein Zettel an die Nachbarn",
    genre: "Kibar not",
    intro: "Aynı şikâyeti kibar biçimde yaz. Dilek kipi burada nezaket değil, işe yarama meselesi.",
    minutes: 8,
    gloss: [
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "still", tr: "sessiz", en: "quiet" },
      { de: "klopfen", tr: "kapıyı çalmak", en: "to knock" },
      { de: "die Nachbarin", tr: "kadın komşu", en: "neighbour" },
      { de: "sich einigen", tr: "uzlaşmak", en: "to agree" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ondan sonra biraz daha sessiz olsa çok iyi olurdu.",
        answer: "Es wäre schön, wenn es danach etwas stiller wäre.",
        hint: "Kişisiz dilek kipi ve koşul yan cümlesi; ikisinde de Konjunktiv II.",
      },
      {
        kind: "build",
        tr: "Bir sorun olursa lütfen kapımı çalın.",
        answer: "Falls es ein Problem gibt, klopfen Sie bitte bei mir.",
        alternatives: ["Wenn es ein Problem gibt, klopfen Sie bitte bei mir."],
        hint: "Koşul bağlacı yan cümleyi kurar; ana cümle emir kipiyle başlar.",
      },
      {
        kind: "build",
        tr: "Komşumla birlikte bir çözümde uzlaşabiliriz.",
        answer: "Die Nachbarin und ich könnten uns gemeinsam auf eine Lösung einigen.",
        hint: "Kibar öneri için Konjunktiv II; dönüşlü zamir fiilden hemen sonra.",
      },
      {
        kind: "rewrite",
        prompt: "Bu notu kibar biçimde yeniden yaz.",
        source: "Der Lärm muss sofort aufhören! Ich beschwere mich beim Vermieter.",
        answer: "Es wäre schön, wenn es abends etwas ruhiger wäre. Vielleicht können wir kurz darüber sprechen.",
        why: "Suçlamayı çıkar, isteği dilek kipine al, bir görüşme öner.",
      },
    ],
  },
  {
    id: "b1-u4-w2",
    level: "B1",
    skill: "writing",
    unit: 4,
    title: "Schaden melden",
    genre: "Resmî bildirim",
    intro: "Ev sahibine yazılı arıza bildirimi. Kişisiz, net ve tarihli.",
    minutes: 12,
    gloss: [
      { de: "der Schaden", tr: "hasar / arıza", en: "damage" },
      { de: "die Panne", tr: "arıza", en: "breakdown" },
      { de: "der Mechaniker", tr: "tamirci", en: "mechanic" },
      { de: "spätestens", tr: "en geç", en: "at the latest" },
      { de: "sorgen", tr: "gereğini yapmak", en: "to see to it" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kalorifer üç gündür çalışmıyor.",
        answer: "Die Heizung funktioniert seit drei Tagen nicht.",
        hint: "„seit“ + Dativ; Almancada şimdiki zaman kullanılır.",
      },
      {
        kind: "build",
        tr: "Arızanın en geç cuma günü giderilmesini rica ediyorum.",
        answer: "Ich bitte darum, dass der Schaden spätestens am Freitag repariert wird.",
        hint: "„bitten um“ + yan cümle; yan cümlede edilgen ve fiil sonda.",
      },
      {
        kind: "free",
        prompt: "Ev sahibine yazılı bir arıza bildirimi yaz: neyin bozulduğunu, ne zamandan beri sürdüğünü, ne denediğini ve ne zamana kadar çözüm beklediğini söyle. Kişisiz ve net yaz, suçlama yok.",
        checklist: [
          "Uygun hitap ve kapanış var mı?",
          "Arızayı ve ne zamandan beri sürdüğünü yazdın mı?",
          "Kendin ne denediğini söyledin mi?",
          "Somut bir tarih verdin mi (spätestens …)?",
          "Ton kişisiz ve sakin mi?",
        ],
        minWords: 60,
        sample:
          "Sehr geehrter Herr Berger,\n\n" +
          "ich melde Ihnen einen Schaden in meiner Wohnung in der zweiten Etage. " +
          "Die Heizung funktioniert seit dem dritten März nicht mehr. " +
          "Ich habe selbst geprüft, ob genug Wasser in der Heizung ist; daran liegt es nicht. Ein Mechaniker hat die Anlage im Winter schon einmal repariert; seitdem gab es keine Panne.\n\n" +
          "Im Moment wird es in den Zimmern sehr kalt. Ich bitte darum, dass ein " +
          "Handwerker spätestens am Freitag kommt. Am Vormittag bin ich zu Hause.\n\n" +
          "Bitte sorgen Sie dafür, dass der Schaden schnell repariert wird. " +
          "Falls Sie Fragen haben, klopfen Sie einfach oder rufen Sie an.\n\n" +
          "Mit freundlichen Grüßen\nAyla Yıldız",
        phrases: [
          { de: "Ich melde Ihnen einen Schaden.", tr: "Size bir arıza bildiriyorum.", en: "I am reporting a damage." },
          { de: "seit dem …", tr: "…'den beri", en: "since …" },
          { de: "Ich bitte darum, dass …", tr: "… olmasını rica ediyorum", en: "I request that …" },
          { de: "Bitte sorgen Sie dafür, dass …", tr: "Lütfen … olmasını sağlayın", en: "Please see to it that …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Edilgen çatıyı düzelt.",
        source: "Der Schaden muss sofort melden werden.",
        answer: "Der Schaden muss sofort gemeldet werden.",
        why: "Edilgen çatı Partizip II + werden ile kurulur. Türkçede edilgenlik tek ekle olduğu için mastar (melden) bırakılıyor; Almanca ortaç (gemeldet) ister.",
      },
    ],
  },
];

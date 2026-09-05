import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 3 — modül sınırını geçen ünite (dersler 9–12).
 *
 * Dersler: Ich kündige · Auf der Jobmesse · Die Wohnungssuche ·
 * Die Wohnungsbesichtigung. İlk ikisi iş dünyasının sonu, son ikisi ev
 * dünyasının başı; egzersizler de bu geçişi izliyor — işi bırakıp başka
 * şehre taşınan biri.
 *
 * Ünite 1–2'nin 64 kelimesi serbest; buraya 32 tane daha eklendi:
 * die Frist, kündigen, entlassen, die Bedingung, der Auftrag, die Sorge,
 * entscheiden, das Verhältnis, sich beschäftigen, die Branche, der Kontakt,
 * die Verbindung, ansprechen, die Visitenkarte, die Unterhaltung,
 * der Direktor, der Mieter, die Etage, das Gebäude, die Fläche, der Zustand,
 * überlegen, nötig, eventuell, einziehen, ausziehen, der Flur, das Dach,
 * der Boden, heizen, beachten, zusätzlich.
 */
export const b1U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u3-r1",
    level: "B1",
    skill: "reading",
    unit: 3,
    title: "Ich kündige — aber richtig",
    genre: "Danışma yazısı",
    intro: "İstifa etmenin kurallarını anlatan kısa bir rehber. Süreye ve yazılı biçime dikkat et.",
    minutes: 5,
    gloss: [
      { de: "die Frist", tr: "süre / ihbar süresi", en: "notice period" },
      { de: "kündigen", tr: "istifa etmek", en: "to resign" },
      { de: "die Bedingung", tr: "şart", en: "condition" },
      { de: "das Verhältnis", tr: "ilişki", en: "relationship" },
      { de: "entlassen", tr: "işten çıkarmak", en: "to dismiss" },
    ],
    text:
      "Wer die Stelle wechseln will, muss zwei Dinge beachten: die Frist und die Form. " +
      "In den meisten Verträgen steht eine Frist von vier Wochen zum Monatsende. " +
      "Wenn Sie am zehnten kündigen, endet das Verhältnis nicht am zehnten. " +
      "Es endet erst am Ende des nächsten Monats.\n\n" +
      "Die Form ist einfach, aber wichtig: eine Kündigung muss schriftlich sein. " +
      "Eine Mail reicht nicht immer; in vielen Firmen ist ein Brief mit Unterschrift nötig. " +
      "Schreiben Sie kurz, ohne Sorge und ohne böse Worte. Der Grund muss nicht im Brief stehen.\n\n" +
      "Zusätzlich sollten Sie ein gutes Verhältnis haben. Sie brauchen später vielleicht " +
      "einen Kontakt in dieser Branche, und die Welt ist klein. " +
      "Fragen Sie auch nach einem Zeugnis, denn das ist Ihr Recht.\n\n" +
      "Anders ist es, wenn die Firma Sie entlässt. Dann gelten andere Bedingungen und Sie " +
      "sollten sich sofort melden, weil Sie sonst Geld verlieren.",
    questions: [
      {
        text: "Was muss man beim Kündigen beachten?",
        options: ["Die Frist und die Form", "Nur den Grund", "Nur das Datum"],
        answer: 0,
        explain: "„… muss zwei Dinge beachten: die Frist und die Form.“",
      },
      {
        text: "Wann endet das Verhältnis, wenn man am zehnten kündigt?",
        options: ["Am zehnten", "Am Ende des nächsten Monats", "Nach einer Woche"],
        answer: 1,
        explain: "„… endet das Verhältnis also nicht am zehnten, sondern erst am Ende des nächsten Monats.“",
      },
      {
        text: "Wie muss eine Kündigung sein?",
        options: ["Schriftlich", "Am Telefon", "Nur eine Mail"],
        answer: 0,
        explain: "„… eine Kündigung muss schriftlich sein.“",
      },
      {
        text: "Warum soll man ein gutes Verhältnis haben?",
        options: ["Wegen des Geldes", "Weil man später einen Kontakt braucht", "Wegen der Frist"],
        answer: 1,
        explain: "„Sie brauchen später vielleicht einen Kontakt in dieser Branche.“",
      },
      {
        kind: "gapfill",
        text: "Der Grund muss nicht im Brief ___.",
        options: [],
        answer: 0,
        accept: ["stehen"],
        explain: "„Der Grund muss nicht im Brief stehen.“",
      },
      {
        kind: "short_answer",
        text: "Wie lang ist die Frist in den meisten Verträgen?",
        options: [],
        answer: 0,
        accept: ["vier Wochen", "4 Wochen"],
        explain: "„In den meisten Verträgen steht eine Frist von vier Wochen zum Monatsende.“",
      },
    ],
  },
  {
    id: "b1-u3-r2",
    level: "B1",
    skill: "reading",
    unit: 3,
    title: "Drei Wohnungen",
    genre: "İlan",
    intro: "Üç daire ilanı ve bir kiracının notu. Hangisi hangi koşulda uygun?",
    minutes: 5,
    gloss: [
      { de: "die Etage", tr: "kat", en: "floor" },
      { de: "die Fläche", tr: "alan / yüzölçümü", en: "area" },
      { de: "der Zustand", tr: "durum / hâl", en: "condition" },
      { de: "einziehen", tr: "yeni eve taşınmak", en: "to move in" },
      { de: "heizen", tr: "ısıtmak", en: "to heat" },
    ],
    text:
      "Wohnung A: zweite Etage, Fläche fünfundfünfzig Quadratmeter, guter Zustand, " +
      "kein Aufzug im Gebäude. Man kann sofort einziehen. Der Boden ist neu.\n\n" +
      "Wohnung B: Dach, achtzig Quadratmeter, sehr hell, aber im Winter teuer zu heizen. " +
      "Der Flur ist lang und dunkel. Frei ab dem ersten Juli.\n\n" +
      "Wohnung C: Erdgeschoss, sechzig Quadratmeter, alter Zustand, günstig. " +
      "Der Mieter muss selbst renovieren. Zusätzlich gibt es einen kleinen Garten.\n\n" +
      "Notiz von Herrn Kaya: Ich ziehe im August aus meiner alten Wohnung aus, also passt B " +
      "vom Datum am besten. Aber ich überlege, ob die Kosten im Winter nötig sind. " +
      "Wohnung A ist kleiner, dafür ist der Zustand besser und ich könnte sofort einziehen. " +
      "Wohnung C wäre günstig, aber ich habe keine Zeit zu renovieren. " +
      "Eventuell schaue ich mir A und B beide an und entscheide dann.",
    questions: [
      {
        text: "Welche Wohnung ist am größten?",
        options: ["A", "B", "C"],
        answer: 1,
        explain: "„Wohnung B: Dach, achtzig Quadratmeter …“ — en büyük alan.",
      },
      {
        text: "Was ist das Problem bei Wohnung B?",
        options: ["Sie ist dunkel", "Sie ist im Winter teuer zu heizen", "Sie hat keinen Garten"],
        answer: 1,
        explain: "„… aber im Winter teuer zu heizen.“",
      },
      {
        text: "Warum passt Wohnung C nicht für Herrn Kaya?",
        options: ["Sie ist zu teuer", "Er hat keine Zeit zu renovieren", "Sie ist zu klein"],
        answer: 1,
        explain: "„Wohnung C wäre günstig, aber ich habe keine Zeit zu renovieren.“",
      },
      {
        text: "Wann zieht Herr Kaya aus seiner alten Wohnung aus?",
        options: ["Im Juli", "Im August", "Im September"],
        answer: 1,
        explain: "„Ich ziehe im August aus meiner alten Wohnung aus.“",
      },
      {
        kind: "gapfill",
        text: "___ schaue ich mir A und B beide an und entscheide dann.",
        options: [],
        answer: 0,
        accept: ["Eventuell"],
        explain: "„Eventuell schaue ich mir A und B beide an.“ — belki, olası.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Quadratmeter hat Wohnung C?",
        options: [],
        answer: 0,
        accept: ["sechzig", "sechzig Quadratmeter", "60"],
        explain: "„Wohnung C: Erdgeschoss, sechzig Quadratmeter …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u3-l1",
    level: "B1",
    skill: "listening",
    unit: 3,
    title: "Auf der Jobmesse",
    genre: "Kısa tanışma",
    intro: "Bir kariyer fuarında iki kişi tanışıyor. Dinle: kim hangi sektörde, ne değiş tokuş ediyorlar?",
    minutes: 4,
    gloss: [
      { de: "die Branche", tr: "sektör", en: "industry" },
      { de: "die Visitenkarte", tr: "kartvizit", en: "business card" },
      { de: "ansprechen", tr: "konuşmaya başlamak", en: "to approach" },
      { de: "sich beschäftigen", tr: "bir işle uğraşmak", en: "to work on" },
    ],
    segments: [
      { text: "Entschuldigung, darf ich Sie kurz ansprechen? Ich bin Nuri Öz." },
      { text: "Gern. Ich bin Frau Klein. Womit beschäftigen Sie sich denn?" },
      { text: "Ich arbeite seit sechs Jahren in der Branche für Möbel." },
      { text: "Interessant. Und was suchen Sie hier auf der Messe?" },
      { text: "Ich möchte wissen, ob es bei Ihnen offene Stellen gibt." },
      { text: "Im Moment nicht, aber im Herbst vielleicht. Haben Sie eine Visitenkarte?" },
      { text: "Ja, hier bitte. Darf ich auch Ihren Kontakt haben?" },
      { text: "Natürlich. Melden Sie sich einfach im September." },
    ],
    questions: [
      {
        text: "In welcher Branche arbeitet Herr Öz?",
        options: ["Möbel", "Bau", "Verkauf"],
        answer: 0,
        explain: "„Ich arbeite seit sechs Jahren in der Branche für Möbel.“",
      },
      {
        text: "Was möchte er auf der Messe wissen?",
        options: ["Wie hoch das Gehalt ist", "Ob es offene Stellen gibt", "Wo die Firma liegt"],
        answer: 1,
        explain: "„Ich möchte wissen, ob es bei Ihnen offene Stellen gibt.“",
      },
      {
        text: "Wann soll er sich melden?",
        options: ["Im Juli", "Im September", "Sofort"],
        answer: 1,
        explain: "„Melden Sie sich einfach im September.“",
      },
      {
        kind: "gapfill",
        text: "Haben Sie eine ___?",
        options: [],
        answer: 0,
        accept: ["Visitenkarte"],
        explain: "„Haben Sie eine Visitenkarte?“",
      },
      {
        kind: "short_answer",
        text: "Wie viele Jahre arbeitet Herr Öz schon in der Branche?",
        options: [],
        answer: 0,
        accept: ["sechs Jahre", "sechs", "6"],
        explain: "„Ich arbeite seit sechs Jahren in der Branche für Möbel.“",
      },
    ],
  },
  {
    id: "b1-u3-l2",
    level: "B1",
    skill: "listening",
    unit: 3,
    title: "Die Besichtigung",
    genre: "Daire gezme",
    intro: "Bir daire geziliyor. Dinle: kiracı ne soruyor, hangi cevabı alıyor?",
    minutes: 4,
    gloss: [
      { de: "der Mieter", tr: "kiracı", en: "tenant" },
      { de: "der Flur", tr: "hol", en: "hallway" },
      { de: "der Boden", tr: "zemin", en: "floor" },
      { de: "zusätzlich", tr: "ek olarak", en: "in addition" },
    ],
    segments: [
      { text: "Kommen Sie herein. Der Flur ist etwas eng, aber die Zimmer sind hell." },
      { text: "Der Boden sieht neu aus. Wurde hier renoviert?" },
      { text: "Ja, letztes Jahr. Der alte Mieter ist im Mai ausgezogen." },
      { text: "Können Sie mir sagen, wie hoch die Kosten für das Heizen sind?" },
      { text: "Etwa hundert Euro im Monat, zusätzlich zur Miete." },
      { text: "Und wann könnte ich einziehen?" },
      { text: "Ab dem ersten des nächsten Monats." },
      { text: "Gut. Ich überlege es mir und melde mich morgen." },
    ],
    questions: [
      {
        text: "Was sagt der Vermieter über den Flur?",
        options: ["Er ist eng", "Er ist neu", "Er ist dunkel"],
        answer: 0,
        explain: "„Der Flur ist etwas eng, aber die Zimmer sind hell.“",
      },
      {
        text: "Wann ist der alte Mieter ausgezogen?",
        options: ["Im März", "Im Mai", "Im Juli"],
        answer: 1,
        explain: "„Der alte Mieter ist im Mai ausgezogen.“",
      },
      {
        text: "Wie viel kostet das Heizen?",
        options: ["Fünfzig Euro", "Hundert Euro", "Zweihundert Euro"],
        answer: 1,
        explain: "„Etwa hundert Euro im Monat, zusätzlich zur Miete.“",
      },
      {
        kind: "gapfill",
        text: "Ich überlege es mir und ___ mich morgen.",
        options: [],
        answer: 0,
        accept: ["melde"],
        explain: "„Ich überlege es mir und melde mich morgen.“",
      },
      {
        kind: "short_answer",
        text: "Wann wurde in der Wohnung renoviert?",
        options: [],
        answer: 0,
        accept: ["letztes Jahr", "im letzten Jahr"],
        explain: "„Ja, letztes Jahr.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u3-w1",
    level: "B1",
    skill: "writing",
    unit: 3,
    title: "Die Kündigung",
    genre: "Resmî mektup",
    intro: "Kısa ve kuru bir istifa mektubu yaz. Gerekçe yok, süre var.",
    minutes: 8,
    gloss: [
      { de: "kündigen", tr: "istifa etmek", en: "to resign" },
      { de: "die Frist", tr: "süre / ihbar süresi", en: "notice period" },
      { de: "das Verhältnis", tr: "ilişki", en: "relationship" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Sözleşmemi süresi içinde feshediyorum.",
        answer: "Ich kündige meinen Vertrag fristgemäß.",
        alternatives: ["Ich kündige meinen Vertrag zum nächsten möglichen Termin."],
        hint: "Kısa ve kuru: özne, fiil, nesne. Gerekçe yok.",
      },
      {
        kind: "build",
        tr: "Bir çalışma belgesi rica ediyorum.",
        answer: "Ich bitte um ein Zeugnis.",
        hint: "Bu fiil sabit bir edat alıyor: „bitten um“ + belirtme hâli.",
      },
      {
        kind: "build",
        tr: "İş birliği için teşekkür ederim.",
        answer: "Ich danke Ihnen für die Zusammenarbeit.",
        hint: "Teşekkür yönelme hâli, sebep edatı belirtme hâli ister.",
      },
      {
        kind: "form",
        prompt: "İstifa mektubunun künyesini doldur.",
        facts: "Çalışan: Nuri Öz; son gün 31 Ağustos; ihbar süresi dört hafta; ek istek: çalışma belgesi.",
        fields: [
          { label: "Absender", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Letzter Tag", answer: "31. August", accept: ["31.08.", "einunddreißigster August", "31 August"] },
          { label: "Frist", answer: "vier Wochen", accept: ["4 Wochen", "vier Wochen zum Monatsende"] },
          { label: "Zusätzlich", answer: "Zeugnis", accept: ["ein Zeugnis", "Arbeitszeugnis"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yan cümledeki fiil sırasını düzelt.",
        source: "Ich möchte Ihnen mitteilen, dass ich kündige meinen Vertrag.",
        answer: "Ich möchte Ihnen mitteilen, dass ich meinen Vertrag kündige.",
        why: "dass yan cümlesinde çekimli fiil en sona gider. Türkçede zaten sonda olduğu için bu sıra tanıdık, ama Almancada ana cümle sırası yanlışlıkla taşınıyor.",
      },
    ],
  },
  {
    id: "b1-u3-w2",
    level: "B1",
    skill: "writing",
    unit: 3,
    title: "Anfrage zur Wohnung",
    genre: "Yarı resmî e-posta",
    intro: "Bir daire ilanına yazıyorsun. Kendini tanıt, üç soru sor, randevu iste.",
    minutes: 12,
    gloss: [
      { de: "die Besichtigung", tr: "daireyi gezme", en: "viewing" },
      { de: "die Etage", tr: "kat", en: "floor" },
      { de: "der Zustand", tr: "durum / hâl", en: "condition" },
      { de: "nötig", tr: "gerekli", en: "necessary" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Isıtma masraflarının ne kadar olduğunu sorabilir miyim?",
        answer: "Darf ich fragen, wie hoch die Kosten für das Heizen sind?",
        hint: "Dolaylı soru: bağlaçtan sonra fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Ne zaman taşınabileceğimi bilmek isterdim.",
        answer: "Ich würde gern wissen, wann ich einziehen kann.",
        hint: "Konjunktiv II ile kibar istek, sonra dolaylı soru.",
      },
      {
        kind: "free",
        prompt: "Bir daire ilanına e-posta yaz. Kendini kısaca tanıt (kim olduğun, ne iş yaptığın), üç soru sor (kat, ısıtma masrafı, ne zaman boşalıyor) ve bir gezme randevusu iste.",
        checklist: [
          "Uygun hitap ve kapanış var mı?",
          "Kendini bir cümleyle tanıttın mı?",
          "Üç soruyu da dolaylı soru biçiminde sordun mu?",
          "Gezme için somut bir zaman önerdin mi?",
        ],
        minWords: 65,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich habe Ihre Anzeige gelesen und interessiere mich sehr für die Wohnung. " +
          "Ich heiße Nuri Öz, bin dreißig Jahre alt und arbeite seit sechs Jahren " +
          "in einer Firma hier in der Stadt.\n\n" +
          "Ich hätte drei Fragen. Können Sie mir sagen, in welcher Etage die Wohnung " +
          "liegt? Darf ich fragen, wie hoch die Kosten für das Heizen sind? " +
          "Und ich würde gern wissen, ab wann ich einziehen kann.\n\n" +
          "Wäre eine Besichtigung am Samstag möglich? Ich bin den ganzen Tag frei " +
          "und komme gern zu Ihnen.\n\n" +
          "Mit freundlichen Grüßen\nNuri Öz",
        phrases: [
          { de: "Ich interessiere mich für …", tr: "… ile ilgileniyorum", en: "I am interested in …" },
          { de: "Können Sie mir sagen, …", tr: "Bana söyleyebilir misiniz …", en: "Could you tell me …" },
          { de: "Wäre … möglich?", tr: "… mümkün olur mu?", en: "Would … be possible?" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Dolaylı soruyu düzelt.",
        source: "Können Sie mir sagen, wann kann ich einziehen?",
        answer: "Können Sie mir sagen, wann ich einziehen kann?",
        why: "Dolaylı soru yan cümledir: soru sırası (kann ich) bozulur, çekimli fiil sona gider.",
      },
    ],
  },
];

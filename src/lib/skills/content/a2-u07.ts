import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 7 — "Eczane, sakatlık, sigorta, acil".
 *
 * Dört ders: Beratung in der Apotheke · Beim Sport verletzt ·
 * Die Versichertenkarte · Notfall beim Zahnarzt. İçerik ünite 1-7'nin
 * kelimeleriyle sınırlı.
 *
 *   Ünite 7: der Apotheker, die Packung, der Hustensaft, die Augentropfen,
 *            die Kopfschmerzen, die Schlaftablette, schlucken, die Tube ·
 *            verletzt, der Knöchel, geschwollen, wehtun, der Gips,
 *            das Handgelenk, röntgen, die Erste Hilfe · die Krankenkasse,
 *            privat, notwendig, die Vereinbarung, der Bescheid, gültig sein,
 *            bestätigen, berechtigt · furchtbar, die Zahnschmerzen,
 *            der Notarzt, schmerzhaft, das Kinn, ansonsten, heftig, zittern
 *   Kalıplar: Bekomme ich das ohne Rezept? · Wie oft darf ich das nehmen? ·
 *             Ich habe mir … verletzt. · Mein … tut weh. ·
 *             Bei welcher Krankenkasse sind Sie? · Soll ich sofort kommen?
 *
 * Modülün en görünmez kalıbı burada: Almanca "bileğimi incittim" demez,
 * "kendime bileği incittim" der — dönüşlü zamir YÖNELME hâlinde ve iyelik
 * yerine belirlilik takısı. Türkçe konuşan bunu kendiliğinden kuramaz, o
 * yüzden hem dinleme hem yazma tarafında ayrı ayrı ölçülüyor.
 */
export const a2U07: SkillExercise[] = [
  {
    id: "a2-u07-r1",
    level: "A2",
    skill: "reading",
    unit: 7,
    title: "Was gibt es ohne Rezept?",
    genre: "Bilgilendirme",
    intro: "Eczanenin bilgi yazısı: neyi reçetesiz alabilirsin, neyi alamazsın?",
    gloss: [
      { de: "der Apotheker", tr: "eczacı", en: "pharmacist" },
      { de: "der Hustensaft", tr: "öksürük şurubu", en: "cough syrup" },
      { de: "die Augentropfen", tr: "göz damlası", en: "eye drops" },
      { de: "die Schlaftablette", tr: "uyku hapı", en: "sleeping pill" },
      { de: "die Packung", tr: "paket", en: "packet" },
      { de: "die Tube", tr: "tüp", en: "tube" },
      { de: "schlucken", tr: "yutmak", en: "to swallow" },
      { de: "die Kopfschmerzen", tr: "baş ağrısı", en: "headache" },
    ],
    minutes: 4,
    text:
      "APOTHEKE AM MARKT — HÄUFIGE FRAGEN\n\n" +
      "Viele Mittel bekommen Sie bei uns ohne Rezept: Hustensaft, einfache Augentropfen und Cremes gegen trockene Haut. Auch etwas gegen leichte Kopfschmerzen finden Sie im Regal neben der Kasse.\n\n" +
      "Für Schlaftabletten brauchen Sie dagegen immer ein Rezept vom Arzt. Das ist kein Service-Problem, sondern ein Gesetz.\n\n" +
      "Bitte fragen Sie unseren Apotheker, wenn Sie schon andere Medikamente nehmen. Manche Mittel passen nicht zusammen.\n\n" +
      "Und ein praktischer Hinweis: Tabletten schluckt man am besten mit einem großen Glas Wasser, nicht mit Kaffee. Eine Packung reicht meistens für zehn Tage, eine Tube Creme für etwa vier Wochen.",
    questions: [
      {
        text: "Wofür braucht man immer ein Rezept?",
        options: ["Für Hustensaft", "Für Schlaftabletten", "Für Augentropfen"],
        answer: 1,
        explain: "„Für Schlaftabletten brauchen Sie dagegen immer ein Rezept vom Arzt.“",
      },
      {
        kind: "gapfill",
        text: "Tabletten ___ man am besten mit einem großen Glas Wasser.",
        options: [],
        answer: 0,
        accept: ["schluckt"],
        explain: "Belirsiz özne „man“ tekil çekim alır: schluckt.",
      },
      {
        text: "Wo findet man etwas gegen leichte Kopfschmerzen?",
        options: ["Im Regal neben der Kasse", "Nur beim Arzt", "Hinter dem Tresen"],
        answer: 0,
        explain: "„finden Sie im Regal neben der Kasse“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange reicht eine Tube Creme?",
        options: [],
        answer: 0,
        accept: ["etwa vier Wochen", "vier Wochen", "4 Wochen"],
        explain: "„eine Tube Creme für etwa vier Wochen“. On gün, bir paket hapın süresi.",
      },
      {
        text: "Man soll Tabletten mit Kaffee nehmen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „mit einem großen Glas Wasser, nicht mit Kaffee“.",
      },
    ],
  },
  {
    id: "a2-u07-r2",
    level: "A2",
    skill: "reading",
    unit: 7,
    title: "Ein Brief von der Krankenkasse",
    genre: "Resmî yazı",
    intro: "Sigortadan gelen bir mektup. Ne isteniyor, ne zamana kadar?",
    gloss: [
      { de: "die Krankenkasse", tr: "sağlık sigortası", en: "health insurance" },
      { de: "der Bescheid", tr: "resmî bildirim", en: "official notice" },
      { de: "bestätigen", tr: "onaylamak", en: "to confirm" },
      { de: "gültig sein", tr: "geçerli olmak", en: "to be valid" },
      { de: "notwendig", tr: "gerekli", en: "necessary" },
      { de: "berechtigt", tr: "yetkili", en: "entitled" },
      { de: "privat", tr: "özel", en: "private" },
      { de: "die Vereinbarung", tr: "anlaşma", en: "agreement" },
    ],
    minutes: 4,
    text:
      "Sehr geehrte Frau Demir,\n\n" +
      "vielen Dank für Ihren Anruf. Mit diesem Bescheid bestätigen wir Ihre neue Adresse.\n\n" +
      "Ihre alte Versichertenkarte ist noch bis zum 31. Dezember gültig. Danach schicken wir Ihnen automatisch eine neue Karte. Sie müssen dafür nichts tun.\n\n" +
      "Eine Sache ist aber notwendig: Bitte schicken Sie uns eine Kopie Ihres Arbeitsvertrags. Ohne dieses Dokument sind Sie ab Januar nicht mehr berechtigt, unsere Familienversicherung zu nutzen.\n\n" +
      "Wenn Sie zusätzlich privat versichert sind, teilen Sie uns das bitte mit. Für Zahnbehandlungen gibt es dann eine andere Vereinbarung.\n\n" +
      "Mit freundlichen Grüßen\nAOK Nordwest",
    questions: [
      {
        text: "Was bestätigt der Brief?",
        options: ["Die neue Adresse", "Einen Termin", "Eine Rechnung"],
        answer: 0,
        explain: "„Mit diesem Bescheid bestätigen wir Ihre neue Adresse.“",
      },
      {
        kind: "gapfill",
        text: "Ihre alte Versichertenkarte ist noch bis zum 31. Dezember ___.",
        options: [],
        answer: 0,
        accept: ["gültig"],
        explain: "Sıfat yüklem olarak kullanıldığı için ek almıyor: „ist gültig“.",
      },
      {
        text: "Was soll Frau Demir schicken?",
        options: ["Eine neue Karte", "Eine Kopie des Arbeitsvertrags", "Ein Foto"],
        answer: 1,
        explain: "„Bitte schicken Sie uns eine Kopie Ihres Arbeitsvertrags.“ Yeni kartı sigorta kendisi gönderiyor.",
      },
      {
        kind: "short_answer",
        text: "Ab wann ist das Dokument notwendig?",
        options: [],
        answer: 0,
        accept: ["ab Januar", "Januar"],
        explain: "„Ohne dieses Dokument sind Sie ab Januar nicht mehr berechtigt.“",
      },
      {
        text: "Frau Demir muss die neue Karte selbst beantragen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „schicken wir Ihnen automatisch eine neue Karte. Sie müssen dafür nichts tun.“",
      },
    ],
  },
  {
    id: "a2-u07-l1",
    level: "A2",
    skill: "listening",
    unit: 7,
    title: "Beim Sport verletzt",
    genre: "Diyalog",
    intro: "Acil serviste bir konuşma. Nasıl olmuş, neresi incinmiş?",
    gloss: [
      { de: "verletzt", tr: "yaralı", en: "injured" },
      { de: "der Knöchel", tr: "ayak bileği", en: "ankle" },
      { de: "geschwollen", tr: "şişmiş", en: "swollen" },
      { de: "wehtun", tr: "ağrımak", en: "to hurt" },
      { de: "röntgen", tr: "röntgen çekmek", en: "to X-ray" },
      { de: "der Gips", tr: "alçı", en: "plaster cast" },
      { de: "die Erste Hilfe", tr: "ilk yardım", en: "first aid" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Pfleger", text: "Guten Abend. Was ist passiert?" },
      { speaker: "Jana", text: "Ich habe mir beim Fußball den Knöchel verletzt. Ich bin auf dem nassen Platz ausgerutscht." },
      { speaker: "Pfleger", text: "Tut es sehr weh?" },
      { speaker: "Jana", text: "Beim Gehen ja. Und der Fuß ist ziemlich geschwollen." },
      { speaker: "Pfleger", text: "Hat jemand vor Ort Erste Hilfe gemacht?" },
      { speaker: "Jana", text: "Ja, mein Trainer hat sofort Eis draufgelegt. Das hat geholfen." },
      { speaker: "Pfleger", text: "Gut. Wir röntgen den Fuß gleich. Wenn etwas gebrochen ist, bekommen Sie heute noch einen Gips." },
      { speaker: "Jana", text: "Und wenn nichts gebrochen ist?" },
      { speaker: "Pfleger", text: "Dann eine Woche Ruhe. Kein Sport, auch wenn es besser wird." },
    ],
    questions: [
      {
        text: "Wie ist Jana gestürzt?",
        options: ["Sie ist ausgerutscht.", "Sie ist gegen einen Spieler gelaufen.", "Sie ist vom Rad gefallen."],
        answer: 0,
        explain: "„Ich bin auf dem nassen Platz ausgerutscht.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ beim Fußball den Knöchel verletzt.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "Almanca „bileğimi incittim“ demez: dönüşlü zamir YÖNELME hâlinde durur ve iyelik yerine belirlilik takısı gelir.",
      },
      {
        text: "Was hat der Trainer gemacht?",
        options: ["Er hat Eis draufgelegt.", "Er hat einen Arzt gerufen.", "Er hat nichts gemacht."],
        answer: 0,
        explain: "„mein Trainer hat sofort Eis draufgelegt. Das hat geholfen.“",
      },
      {
        kind: "short_answer",
        text: "Was passiert, wenn nichts gebrochen ist?",
        options: [],
        answer: 0,
        accept: ["eine Woche Ruhe", "Ruhe", "kein Sport"],
        explain: "„Dann eine Woche Ruhe. Kein Sport, auch wenn es besser wird.“",
      },
    ],
  },
  {
    id: "a2-u07-l2",
    level: "A2",
    skill: "listening",
    unit: 7,
    title: "Notfall beim Zahnarzt",
    genre: "Telefon görüşmesi",
    intro: "Sabah erken bir telefon: ağrı ne kadar şiddetli, hasta ne zaman gelecek?",
    gloss: [
      { de: "die Zahnschmerzen", tr: "diş ağrısı", en: "toothache" },
      { de: "heftig", tr: "şiddetli", en: "severe" },
      { de: "furchtbar", tr: "korkunç", en: "awful" },
      { de: "schmerzhaft", tr: "acı verici", en: "painful" },
      { de: "das Kinn", tr: "çene", en: "chin" },
      { de: "zittern", tr: "titremek", en: "to shake" },
      { de: "ansonsten", tr: "aksi takdirde", en: "otherwise" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Praxis", text: "Zahnarztpraxis Berger, guten Morgen." },
      { speaker: "Herr Roth", text: "Guten Morgen. Ich habe seit der Nacht furchtbare Zahnschmerzen. Können Sie mir heute helfen?" },
      { speaker: "Praxis", text: "Wie stark sind die Schmerzen denn?" },
      { speaker: "Herr Roth", text: "Sehr heftig. Ich habe kaum geschlafen, und meine Hände zittern schon." },
      { speaker: "Praxis", text: "Tut auch das Kinn weh oder nur der Zahn?" },
      { speaker: "Herr Roth", text: "Beides. Und kaltes Wasser ist besonders schmerzhaft." },
      { speaker: "Praxis", text: "Dann kommen Sie bitte um Viertel vor neun. Wir schieben Sie dazwischen." },
      { speaker: "Herr Roth", text: "Soll ich sofort kommen?" },
      { speaker: "Praxis", text: "Nein, Viertel vor neun reicht. Ansonsten müssen Sie im Wartezimmer sehr lange sitzen." },
    ],
    questions: [
      {
        text: "Seit wann hat Herr Roth Schmerzen?",
        options: ["Seit gestern Morgen", "Seit der Nacht", "Seit einer Woche"],
        answer: 1,
        explain: "„Ich habe seit der Nacht furchtbare Zahnschmerzen.“",
      },
      {
        kind: "gapfill",
        text: "Meine Hände ___ schon.",
        options: [],
        answer: 0,
        accept: ["zittern"],
        explain: "Çoğul özneye fiil uyar: die Hände zittern.",
      },
      {
        text: "Wann soll er kommen?",
        options: ["Sofort", "Um Viertel vor neun", "Am Nachmittag"],
        answer: 1,
        explain: "„Dann kommen Sie bitte um Viertel vor neun.“ Hemen gelmesine gerek yok.",
      },
      {
        kind: "dictation",
        text: "Herr Roth'un randevu saatini teyit etmek için sorduğu soruyu yaz.",
        options: [],
        answer: 0,
        accept: ["Soll ich sofort kommen?"],
        explain: "Kip fiili başa geçince cümle soru olur ve asıl fiil sonda kalır.",
      },
    ],
  },
  {
    id: "a2-u07-w1",
    level: "A2",
    skill: "writing",
    unit: 7,
    title: "Ich habe mir den Knöchel verletzt",
    genre: "Dil bilgisi",
    intro: "Vücudunun bir yerini incittiğini söylemenin Almanca yolu. Türkçeden birebir çevrilmez.",
    gloss: [
      { de: "der Knöchel", tr: "ayak bileği", en: "ankle" },
      { de: "das Handgelenk", tr: "el bileği", en: "wrist" },
      { de: "wehtun", tr: "ağrımak", en: "to hurt" },
      { de: "geschwollen", tr: "şişmiş", en: "swollen" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Futbolda bileğimi incittim.",
        answer: "Beim Fußball habe ich mir den Knöchel verletzt",
        hint: "Dönüşlü zamir YÖNELME hâlinde (mir) ve incinen yerin önünde iyelik değil belirlilik takısı var (den).",
      },
      {
        kind: "build",
        tr: "El bileğim ağrıyor.",
        answer: "Mein Handgelenk tut weh",
        hint: "Burada ağrıyan yer ÖZNE olur ve iyelik kullanılır. „wehtun“ ayrılabilen: ön ek sonda.",
      },
      {
        kind: "build",
        tr: "Ayağım şişti.",
        answer: "Mein Fuß ist geschwollen",
        hint: "Durum bir sıfatla anlatılır ve sıfat yüklem olduğu için ek almaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi Almancanın söylediği biçimde yeniden yaz.",
        source: "Ich habe meinen Knöchel verletzt.",
        answer: "Ich habe mir den Knöchel verletzt.",
        alternatives: ["Ich habe mir den Knöchel verletzt"],
        why: "Dilbilgisi kurulabilir ama Almanca böyle söylemez: kendine zarar verirken zamir yönelme hâline girer, iyelik yerine belirlilik takısı gelir.",
      },
    ],
  },
  {
    id: "a2-u07-w2",
    level: "A2",
    skill: "writing",
    unit: 7,
    title: "An die Krankenkasse schreiben",
    genre: "Resmî yazı",
    intro: "Sigortaya kısa bir e-posta yaz: neyi soruyorsun, hangi belgeyi gönderiyorsun?",
    gloss: [
      { de: "die Krankenkasse", tr: "sağlık sigortası", en: "health insurance" },
      { de: "bestätigen", tr: "onaylamak", en: "to confirm" },
      { de: "gültig sein", tr: "geçerli olmak", en: "to be valid" },
      { de: "notwendig", tr: "gerekli", en: "necessary" },
      { de: "der Bescheid", tr: "resmî bildirim", en: "official notice" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Sigortadan gelen mektuba cevap yaz. Belgeyi gönderdiğini söyle, kartının ne zamana kadar geçerli olduğunu teyit et ve bir soru sor.",
        stimulus:
          "Sehr geehrte Frau Demir,\n\nmit diesem Bescheid bestätigen wir Ihre neue Adresse. Ihre alte Karte ist noch bis zum 31. Dezember gültig.\n\nBitte schicken Sie uns eine Kopie Ihres Arbeitsvertrags. Ohne dieses Dokument sind Sie ab Januar nicht mehr berechtigt, unsere Familienversicherung zu nutzen.\n\nMit freundlichen Grüßen\nAOK Nordwest",
        checklist: [
          "Resmî hitapla başladın mı („Sehr geehrte Damen und Herren“)?",
          "Belgeyi gönderdiğini yazdın mı?",
          "Kartın ne zamana kadar geçerli olduğunu teyit ettin mi?",
          "Bir soru sordun mu ve resmî bir kapanışla bitirdin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Im Anhang finden Sie …", tr: "ekte … bulacaksınız", en: "please find … attached" },
          { de: "Können Sie mir bitte bestätigen, dass …", tr: "…-i teyit edebilir misiniz", en: "could you please confirm that …" },
          { de: "Mit freundlichen Grüßen", tr: "saygılarımla", en: "kind regards" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihren Bescheid vom 3. November.\n\nIm Anhang finden Sie eine Kopie meines Arbeitsvertrags. Ich hoffe, das Dokument reicht so.\n\nKönnen Sie mir bitte bestätigen, dass meine alte Karte wirklich bis zum 31. Dezember gültig ist? Ich habe im Januar einen Termin beim Zahnarzt und möchte sicher sein, dass alles in Ordnung ist.\n\nIst für die Zahnbehandlung noch etwas anderes notwendig?\n\nMit freundlichen Grüßen\nAyşe Demir",
      },
    ],
  },
];

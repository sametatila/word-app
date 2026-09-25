import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 para ve tüketim hattı: forumda ikinci el tartışması, radyoda tüketici
 * önerisi, tamir kafesi değerlendirmesi. Dil bilgisi Genitiv — yazılı dilin
 * hâli ve onu isteyen edatlar.
 */
export const deB1P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r9",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Forum: Lohnt sich Gebrauchtes wirklich?",
    genre: "forum",
    intro: "Bir forum başlığında üç kişi ikinci el almayı tartışıyor: kim ne kazanıyor, kim ne kaybediyor.",
    gloss: [
      { de: "gebraucht", tr: "ikinci el", en: "second-hand" },
      { de: "die Ersparnis", tr: "tasarruf", en: "saving" },
      { de: "die Garantie", tr: "garanti", en: "warranty" },
      { de: "der Aufwand", tr: "zahmet", en: "effort" },
      { de: "das Risiko", tr: "risk", en: "risk" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
    ],
    minutes: 6,
    text:
      "Thema: Lohnt sich Gebrauchtes wirklich?\n\n" +
      "nordlicht77: Ich kaufe seit fünf Jahren fast alles gebraucht. Die " +
      "Ersparnis liegt bei Möbeln locker bei siebzig Prozent. Klar dauert die " +
      "Suche, aber ich rechne die Stunden nicht gegen das Geld — ich suche " +
      "abends auf dem Sofa, nicht während der Arbeitszeit.\n\n" +
      "Marek_B: Bei Möbeln bin ich dabei, bei Technik nicht. Ich habe letztes " +
      "Jahr eine gebrauchte Waschmaschine gekauft, hundertachtzig Euro. Nach " +
      "vier Monaten war die Pumpe kaputt, die Reparatur hat hundertzwanzig " +
      "gekostet. Wegen der fehlenden Garantie war ich allein mit dem " +
      "Problem.\n\n" +
      "Ines: Das ist der Punkt, über den selten jemand spricht. Gebraucht " +
      "kaufen lohnt sich vor allem für Leute, die selbst reparieren können " +
      "oder jemanden kennen. Für alle anderen ist der niedrige Preis nur die " +
      "halbe Rechnung.\n\n" +
      "nordlicht77: Stimmt teilweise. Aber trotz des Risikos wäre ich bei der " +
      "Waschmaschine nicht im Minus: dreihundert neu, hundertachtzig plus " +
      "hundertzwanzig gebraucht — das ist dasselbe, und die Maschine läuft " +
      "jetzt weiter.\n\n" +
      "Marek_B: Rechnerisch hast du recht. Der Aufwand steht in der Rechnung " +
      "nur nicht drin.",
    questions: [
      {
        text: "Worin sind sich nordlicht77 und Marek_B einig?",
        options: [
          "Bei Möbeln lohnt sich Gebrauchtes.",
          "Technik sollte man immer gebraucht kaufen.",
          "Die Suche kostet zu viel Zeit.",
        ],
        answer: 0,
        explain: "Marek_B açıkça „Bei Möbeln bin ich dabei“ diyor; ayrıldıkları yer teknik.",
      },
      {
        text: "Was war bei Marek_B das eigentliche Problem?",
        options: [
          "Die Maschine war zu teuer.",
          "Ohne Garantie stand er allein da.",
          "Er konnte die Maschine nicht abholen.",
        ],
        answer: 1,
        explain: "„Wegen der fehlenden Garantie war ich allein mit dem Problem.“",
      },
      {
        kind: "truefalse",
        text: "Ines findet, Gebrauchtkaufen lohnt sich für alle gleich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Ona göre özellikle tamir edebilen ya da tanıdığı olan için değiyor.",
      },
      {
        kind: "gapfill",
        text: "Die Reparatur der Pumpe hat ___ Euro gekostet.",
        options: [],
        answer: 0,
        accept: ["hundertzwanzig", "120"],
        explain: "„die Reparatur hat hundertzwanzig gekostet“.",
      },
      {
        kind: "short_answer",
        text: "Was fehlt laut Marek_B in der Rechnung?",
        options: [],
        answer: 0,
        accept: ["der Aufwand", "Aufwand", "die Mühe"],
        explain: "Son cümle: „Der Aufwand steht in der Rechnung nur nicht drin.“",
      },
      {
        text: "Wie endet die Diskussion?",
        options: [
          "mit einem Streit",
          "mit einem teilweisen Einverständnis",
          "ohne Antwort von Marek_B",
        ],
        answer: 1,
        explain: "„Rechnerisch hast du recht“ — hesabı kabul ediyor, ama eksiğini söylüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l9",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Verbrauchertipp: Der Vertrag im Kleingedruckten",
    genre: "monologue",
    intro: "Radyoda kısa bir tüketici önerisi: abonelik sözleşmelerinde nereye bakmalı.",
    gloss: [
      { de: "der Vertrag", tr: "sözleşme", en: "contract" },
      { de: "die Kündigung", tr: "fesih", en: "cancellation" },
      { de: "die Laufzeit", tr: "sözleşme süresi", en: "contract period" },
      { de: "sich verlängern", tr: "uzamak", en: "to be extended" },
      { de: "die Frist", tr: "süre", en: "deadline" },
      { de: "der Anbieter", tr: "sağlayıcı", en: "provider" },
    ],
    minutes: 6,
    segments: [
      { text: "Unser Verbrauchertipp am Donnerstag: Worauf man beim Abschluss eines Vertrags achten sollte." },
      { text: "Der erste Blick gilt nicht dem Preis, sondern der Laufzeit. Zwölf Monate sind üblich, vierundzwanzig sind selten ein gutes Geschäft." },
      { text: "Wichtiger als der Monatspreis ist die Frage, wann und wie sich der Vertrag verlängert." },
      { text: "Seit der Gesetzesänderung dürfen sich Verträge nur noch auf unbestimmte Zeit verlängern, und die Kündigungsfrist beträgt dann einen Monat." },
      { text: "Trotzdem finden viele Anbieter Wege, den Wechsel mühsam zu machen: Die Kündigung soll dann zum Beispiel per Post kommen." },
      { text: "Mein Rat: Tragen Sie das Ende der Laufzeit sofort in den Kalender ein, und zwar zwei Monate vorher." },
      { text: "Und heben Sie die Bestätigung der Kündigung auf. Ohne diesen Nachweis wird aus einer Kleinigkeit schnell ein langer Streit." },
    ],
    questions: [
      {
        text: "Worauf soll man laut dem Tipp zuerst schauen?",
        options: ["auf den Monatspreis", "auf die Laufzeit", "auf den Namen des Anbieters"],
        answer: 1,
        explain: "„Der erste Blick gilt nicht dem Preis, sondern der Laufzeit.“",
      },
      {
        text: "Was hat sich durch die Gesetzesänderung geändert?",
        options: [
          "Verträge verlängern sich nur noch auf unbestimmte Zeit.",
          "Verträge dürfen höchstens sechs Monate laufen.",
          "Die Kündigung muss per Post kommen.",
        ],
        answer: 0,
        explain: "„Seit der Gesetzesänderung dürfen sich Verträge nur noch auf unbestimmte Zeit verlängern“; devamında fesih süresinin o zaman bir ay olduğu söyleniyor. Postayla fesih yasanın değil, bazı sağlayıcıların çıkardığı bir zorluk.",
      },
      {
        kind: "truefalse",
        text: "Eine Laufzeit von vierundzwanzig Monaten ist meistens günstig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„vierundzwanzig sind selten ein gutes Geschäft“.",
      },
      {
        kind: "gapfill",
        text: "Man soll das Ende der Laufzeit ___ Monate vorher eintragen.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„und zwar zwei Monate vorher“.",
      },
      {
        kind: "short_answer",
        text: "Was soll man unbedingt aufheben?",
        options: [],
        answer: 0,
        accept: [
          "die Bestätigung der Kündigung",
          "die Bestätigung",
          "den Nachweis der Kündigung",
          "die Kündigungsbestätigung",
          "den Nachweis",
        ],
        explain: "„heben Sie die Bestätigung der Kündigung auf“ — kanıt olmadan uzun bir tartışma çıkıyor.",
      },
      {
        text: "Wie machen manche Anbieter den Wechsel schwer?",
        options: [
          "Sie erhöhen den Preis.",
          "Sie verlangen die Kündigung per Post.",
          "Sie kündigen selbst.",
        ],
        answer: 1,
        explain: "„Die Kündigung soll dann zum Beispiel per Post kommen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w9",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Bewertung: Das Repair-Café",
    genre: "review",
    intro: "Bir tamir kafesini değerlendiriyorsun: önce iki cümle kur, sonra ayrıntılı ve dengeli bir yorum yaz.",
    gloss: [
      { de: "die Werkstatt", tr: "atölye", en: "workshop" },
      { de: "ehrenamtlich", tr: "gönüllü", en: "voluntary" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "geduldig", tr: "sabırlı", en: "patient" },
      { de: "der Andrang", tr: "yoğunluk", en: "rush" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kalabalık yüzünden bir saat bekledim.",
        answer: "Wegen des Andrangs habe ich eine Stunde gewartet.",
        alternatives: ["Ich habe wegen des Andrangs eine Stunde gewartet."],
        hint: "„wegen“ Genitiv ister: eril isimde „des …(e)s“ biçimi gelir.",
      },
      {
        kind: "build",
        tr: "Buna rağmen yine gelirim.",
        answer: "Trotzdem komme ich wieder.",
        alternatives: ["Ich komme trotzdem wieder."],
        hint: "„trotzdem“ başa gelirse fiil hemen arkasından gelir ve özne arkaya düşer.",
      },
      {
        kind: "free",
        prompt:
          "Tamir kafesi için bir değerlendirme yaz: ne zaman gittiğini ve neyi tamir ettirdiğini söyle, süreci anlat, iyi ve kötü yanlarını yaz, kime uygun olduğunu söyle ve bir öneride bulun.",
        checklist: [
          "Ne zaman gittiğini ve neyi getirdiğini yaz",
          "Sürecin nasıl işlediğini anlat",
          "En az bir iyi ve bir kötü yanı yaz",
          "Kime uygun olduğunu söyle ve bir öneri ver",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich war im … mit einem defekten …", tr: "… ayında bozuk bir … ile oradaydım", en: "I was there in … with a broken …" },
          { de: "Der Ablauf ist einfach: …", tr: "İşleyiş basit: …", en: "The process is simple: …" },
          { de: "Positiv ist vor allem, dass …", tr: "En olumlu yanı … olması", en: "What is particularly positive is that …" },
          { de: "Weniger gut gefallen hat mir, dass …", tr: "Daha az hoşuma giden şey … olması", en: "What I liked less was that …" },
          { de: "Für … ist das Angebot ideal, für … weniger.", tr: "… için ideal, … için daha az.", en: "The offer is ideal for …, less so for …" },
        ],
        sample:
          "Ich war im März zum ersten Mal im Repair-Café in der Turnhalle, mit einem defekten Toaster " +
          "und einer Hose ohne Reißverschluss. Der Ablauf ist einfach: Man zieht eine Nummer, wartet " +
          "und arbeitet dann mit einem ehrenamtlichen Helfer zusammen am eigenen Gerät. " +
          "Positiv ist vor allem, dass niemand einem das Werkzeug aus der Hand nimmt. " +
          "Mein Helfer war sehr geduldig und hat mir erklärt, warum sich der Toaster nicht mehr ausschaltet. " +
          "Wegen des Andrangs habe ich allerdings eine Stunde gewartet, und die Hose hat niemand " +
          "übernommen, weil an dem Tag keine Näherin da war. " +
          "Für Leute, die etwas lernen wollen, ist das Angebot ideal, für alle, die es einfach schnell " +
          "repariert haben möchten, weniger. Mein Vorschlag wäre, im Internet vorher anzuzeigen, " +
          "welche Helfer kommen. Trotzdem komme ich wieder.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s9",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Reparieren oder neu kaufen?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir karar kuralı anlat ve sınırını söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bir şey bozulduğunda tamir mi ettiriyorsun yoksa yenisini mi alıyorsun? Kuralını anlat, bir örnek ver ve kuralının işlemediği durumu söyle.",
      bulletsTr: [
        "Kararını nasıl verdiğini tek cümleyle söyle",
        "Somut bir örnek anlat",
        "Kuralın işlemediği bir durumu söyle",
        "Başkasına ne önerdiğini söyle",
      ],
      targets: [
        { de: "Meine Faustregel ist: …", tr: "Benim pratik kuralım: …" },
        { de: "Ein gutes Beispiel dafür war …", tr: "Buna iyi bir örnek … oldu" },
        { de: "Die Rechnung geht aber nicht auf, wenn …", tr: "Ama … olduğunda hesap tutmuyor" },
        { de: "Ich rate deshalb dazu, …", tr: "Bu yüzden … tavsiye ediyorum" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Meine Faustregel ist: Wenn die Reparatur weniger als die Hälfte des Neupreises kostet und " +
        "das Gerät noch nicht halb so alt ist wie seine übliche Lebensdauer, lasse ich reparieren. " +
        "Ein gutes Beispiel dafür war unsere Spülmaschine. Sie war fünf Jahre alt, die Reparatur " +
        "hat hundertvierzig Euro gekostet, eine neue hätte fünfhundert gekostet. " +
        "Seitdem läuft sie schon zwei Jahre ohne Probleme. " +
        "Die Rechnung geht aber nicht auf, wenn ein Gerät jedes Jahr etwas anderes hat. " +
        "Bei meinem alten Drucker habe ich dreimal hintereinander reparieren lassen und am Ende " +
        "trotzdem einen neuen gekauft; das Geld war einfach weg. " +
        "Ich rate deshalb dazu, sich aufzuschreiben, was man in den letzten drei Jahren für ein Gerät " +
        "bezahlt hat. Danach entscheidet man nicht mehr aus dem Gefühl heraus.",
      rubricHint:
        "Bir kural, bir örnek ve bir karşı örnek beklenir; „wenn … dann“, Genitiv („die Hälfte des Neupreises“) ve „raten zu“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g9",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "wegen des Wetters",
    genre: "grammar",
    intro: "Genitiv konuşmada azalıyor ama yazıda her yerde; biçimlerini ve onu isteyen edatları öğren.",
    focus: "Genitiv: sahiplik, edatlar ve -s eki",
    gloss: [
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "der Chef", tr: "patron", en: "boss" },
      { de: "die Reparatur", tr: "tamir", en: "repair" },
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "die Entscheidung", tr: "karar", en: "decision" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Sahiplik: isim ismin arkasına geçer",
        tr: "Türkçede tamlayan önce gelir: „patronun arabası“. Almancada Genitiv'de sıra TERSİNE döner: „das Auto des Chefs“. Eril ve nötr isimler -s ya da -es alır; dişil ve çoğul isimler ek almaz, yalnız artikel değişir (der).",
        examples: [
          { de: "Das ist das Auto des Chefs.", tr: "Bu, patronun arabası.", note: "eril → des + -s" },
          { de: "Die Farbe des Hauses gefällt mir.", tr: "Evin rengini beğeniyorum.", note: "nötr → des + -es" },
          { de: "Der Preis der Reparatur war hoch.", tr: "Tamirin fiyatı yüksekti.", note: "dişil → der, ek yok" },
        ],
      },
      {
        heading: "Genitiv isteyen edatlar",
        tr: "Yazılı dilde sık geçen dört edat Genitiv ister: „wegen“ (yüzünden), „trotz“ (rağmen), „während“ (sırasında), „statt“ (yerine). Konuşmada bunların Dativ ile kullanıldığını da duyarsın; sınavda ve yazıda Genitiv beklenir.",
        examples: [
          { de: "Wegen des Wetters bleiben wir zu Hause.", tr: "Hava yüzünden evde kalıyoruz.", note: "wegen + Genitiv" },
          { de: "Trotz des Lärms habe ich geschlafen.", tr: "Gürültüye rağmen uyudum.", note: "trotz + Genitiv" },
          { de: "Während der Arbeit telefoniere ich nicht.", tr: "Çalışırken telefonla konuşmam.", note: "während + Genitiv" },
        ],
      },
      {
        heading: "Özel adlar ve konuşma dili",
        tr: "Özel adlarda Genitiv -s'si adın SONUNA eklenir, artikel kullanılmaz ve ad, Türkçedeki gibi ismin önünde durur: „Annas Bruder“, „Berlins Museen“. Konuşmada ise Genitiv'in yerini çoğu zaman „von + Dativ“ alır: „das Auto von meinem Chef“. İkisi de doğrudur ama yazıda Genitiv daha uygundur.",
        examples: [
          { de: "Annas Entscheidung war richtig.", tr: "Anna'nın kararı doğruydu.", note: "özel ad + s, artikel yok" },
          { de: "Das ist das Fahrrad von meiner Schwester.", tr: "Bu, kız kardeşimin bisikleti.", note: "konuşma dili" },
          { de: "Das ist das Fahrrad meiner Schwester.", tr: "Bu, kız kardeşimin bisikleti.", note: "yazı dili" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist das Auto ___ Chefs.",
        options: ["der", "des", "dem"],
        answer: 1,
        explain: "Eril Genitiv artikeli des'tir ve isim -s alır.",
      },
      {
        text: "___ des Wetters bleiben wir zu Hause.",
        options: ["Wegen", "Mit", "Nach"],
        answer: 0,
        explain: "Sebep bildiren ve Genitiv isteyen edat wegen'dir.",
      },
      {
        text: "Der Preis ___ Reparatur war hoch.",
        options: ["des", "dem", "der"],
        answer: 2,
        explain: "„die Reparatur“ dişildir; Genitiv'de artikel der olur ve isim ek almaz.",
      },
      {
        kind: "gapfill",
        text: "Trotz ___ Lärms habe ich geschlafen. (der)",
        options: [],
        answer: 0,
        accept: ["des"],
        explain: "„trotz“ Genitiv ister; eril isimde des + -s.",
      },
      {
        kind: "gapfill",
        text: "Während ___ Arbeit telefoniere ich nicht. (die)",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "Dişil Genitiv artikeli der'dir.",
      },
      {
        kind: "gapfill",
        text: "Die Farbe des ___ gefällt mir. (das Haus)",
        options: [],
        answer: 0,
        accept: ["Hauses"],
        explain: "Tek heceli nötr isimler Genitiv'de -es alır: des Hauses.",
      },
      {
        kind: "gapfill",
        text: "___ Entscheidung war richtig. (Anna)",
        options: [],
        answer: 0,
        accept: ["Annas"],
        explain: "Özel adda Genitiv -s adın sonuna gelir ve artikel kullanılmaz.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wegen", "des Wetters", "bleiben", "wir", "zu Hause"],
        explain: "Edat öbeği birinci öge; fiil ikinci sırada, özne arkasında.",
      },
      {
        kind: "truefalse",
        text: "„Wegen dem Regen sind wir geblieben.“ — Bu biçim yazı dilinde doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Konuşmada duyulur ama yazıda „wegen des Regens“ beklenir.",
      },
      {
        kind: "truefalse",
        text: "„Das ist das Fahrrad meiner Schwester.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil Genitiv: iyelik sözcüğü meiner olur, isim ek almaz.",
      },
    ],
  },
];

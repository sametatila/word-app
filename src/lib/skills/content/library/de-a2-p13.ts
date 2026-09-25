import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 13.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 13 öğrenme hattı: dil okulunun kelime öğrenme rehberi, sürücü kursundan
 * telesekreter mesajı, akşam kursu için geri bildirim. Söyleyiş odağı Türkçe
 * okumayla çelişen üç yazım: j, qu ve chs; dil bilgisi ge- almayan ortaçlar
 * (be-, ver-, er- ve -ieren) — parti 1 Perfekt'in yardımcı fiilini işledi,
 * burada ortacın kendisinin biçimi var.
 */
export const deA2P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r13",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "So bleiben neue Wörter im Kopf",
    genre: "guide",
    intro: "Bir dil okulunun kursiyerlerine verdiği beş öneri: kelimeler nasıl daha iyi akılda kalır?",
    gloss: [
      { de: "sich merken", tr: "aklında tutmak", en: "to memorize" },
      { de: "wiederholen", tr: "tekrarlamak", en: "to repeat" },
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "der Fehler", tr: "hata", en: "mistake" },
      { de: "die Angst", tr: "korku", en: "fear" },
      { de: "die Farbe", tr: "renk", en: "color" },
    ],
    minutes: 5,
    text:
      "Viele Kursteilnehmer fragen uns: Wie kann ich mir neue Wörter besser merken? " +
      "Hier sind unsere fünf wichtigsten Tipps.\n\n" +
      "1. Lernen Sie jeden Tag ein bisschen. Zehn Minuten am Morgen sind besser als zwei Stunden am Sonntag.\n\n" +
      "2. Lernen Sie Wörter nie allein. Schreiben Sie immer einen kurzen Satz dazu, bei Nomen auch den Artikel " +
      "und die Pluralform.\n\n" +
      "3. Arbeiten Sie mit Farben. Viele schreiben der-Wörter blau, die-Wörter rot und das-Wörter grün.\n\n" +
      "4. Sprechen Sie laut. Wenn man ein Wort hört und selbst sagt, vergisst man es nicht so schnell.\n\n" +
      "5. Wiederholen Sie alte Wörter nach einem Tag, nach einer Woche und nach einem Monat. " +
      "Dann bleiben sie lange im Kopf.\n\n" +
      "Und das Wichtigste: Haben Sie keine Angst vor Fehlern. Auch unsere Lehrerinnen und Lehrer " +
      "haben einmal mit „Guten Tag“ angefangen.\n\n" +
      "Ihre Sprachschule Mondial",
    questions: [
      {
        text: "Was ist laut Text besser?",
        options: ["zwei Stunden am Sonntag", "jeden Tag zehn Minuten", "nur vor einer Prüfung lernen"],
        answer: 1,
        explain: "„Zehn Minuten am Morgen sind besser als zwei Stunden am Sonntag.“",
      },
      {
        text: "Was soll man bei Nomen immer mitschreiben?",
        options: ["den Artikel und den Plural", "eine Farbe für jeden Satz", "das Wort in drei Sprachen"],
        answer: 0,
        explain: "İkinci öneri: „bei Nomen auch den Artikel und die Pluralform“.",
      },
      {
        kind: "truefalse",
        text: "Man soll alte Wörter nur einmal wiederholen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Metin üç tekrar öneriyor: bir gün, bir hafta ve bir ay sonra.",
      },
      {
        kind: "gapfill",
        text: "Viele schreiben die-Wörter ___.",
        options: [],
        answer: 0,
        accept: ["rot"],
        explain: "„der-Wörter blau, die-Wörter rot und das-Wörter grün“.",
      },
      {
        kind: "short_answer",
        text: "Wovor soll man keine Angst haben?",
        options: [],
        answer: 0,
        accept: ["vor Fehlern", "Fehlern", "Fehler"],
        explain: "„Haben Sie keine Angst vor Fehlern.“",
      },
      {
        text: "Wann soll man alte Wörter wiederholen?",
        options: [
          "jeden Sonntag und jeden Mittwoch",
          "nach dem Kurs und vor der Prüfung",
          "nach einem Tag, einer Woche, einem Monat",
        ],
        answer: 2,
        explain: "Beşinci öneri: „nach einem Tag, nach einer Woche und nach einem Monat“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l13",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Nachricht von der Fahrschule",
    genre: "phone",
    intro: "Sürücü kursundan telesekretere bırakılan mesaj: teori sınavı neden kaydı, yeni tarih ne, ne getirilecek.",
    gloss: [
      { de: "die Fahrschule", tr: "sürücü kursu", en: "driving school" },
      { de: "die Prüfung", tr: "sınav", en: "exam" },
      { de: "ausfallen", tr: "iptal olmak", en: "to be canceled" },
      { de: "der Personalausweis", tr: "kimlik kartı", en: "ID card" },
      { de: "die Fahrstunde", tr: "direksiyon dersi", en: "driving lesson" },
      { de: "zurückrufen", tr: "geri aramak", en: "to call back" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Lindner", text: "Guten Tag, Herr Kaya, hier ist Sabine Lindner von der Fahrschule Blinker." },
      { speaker: "Frau Lindner", text: "Ich rufe wegen Ihrer Theorieprüfung an. Der Termin am Dienstag fällt leider aus." },
      { speaker: "Frau Lindner", text: "Das Prüfungsbüro ist an dem Tag geschlossen, das haben wir erst heute erfahren." },
      { speaker: "Frau Lindner", text: "Wir haben aber schon einen neuen Termin für Sie: Freitag, den siebzehnten, um halb neun." },
      { speaker: "Frau Lindner", text: "Bitte seien Sie schon um acht Uhr bei uns in der Fahrschule. Wir fahren dann zusammen hin." },
      { speaker: "Frau Lindner", text: "Und bringen Sie Ihren Personalausweis mit. Ohne Ausweis dürfen Sie nicht an der Prüfung teilnehmen." },
      { speaker: "Frau Lindner", text: "Ihre erste Fahrstunde können wir auch schon planen, zum Beispiel am Montag danach um vier." },
      { speaker: "Frau Lindner", text: "Rufen Sie mich bitte bis Donnerstag zurück, am besten nachmittags. Vielen Dank und bis bald!" },
    ],
    questions: [
      {
        text: "Warum ruft Frau Lindner an?",
        options: [
          "Herr Kaya hat die Prüfung bestanden.",
          "Die Fahrstunde am Montag fällt aus.",
          "Der Termin für die Prüfung ändert sich.",
        ],
        answer: 2,
        explain: "„Der Termin am Dienstag fällt leider aus“ ve hemen yeni bir tarih veriyor.",
      },
      {
        text: "Warum ist am Dienstag keine Prüfung?",
        options: ["Frau Lindner ist krank.", "Das Prüfungsbüro ist geschlossen.", "Herr Kaya hat keine Zeit."],
        answer: 1,
        explain: "„Das Prüfungsbüro ist an dem Tag geschlossen.“",
      },
      {
        kind: "truefalse",
        text: "Herr Kaya soll um acht Uhr in der Fahrschule sein.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Bitte seien Sie schon um acht Uhr bei uns in der Fahrschule.“ Sınav saat sekiz buçukta.",
      },
      {
        kind: "gapfill",
        text: "Die neue Prüfung ist am Freitag um halb ___.",
        options: [],
        answer: 0,
        accept: ["neun", "9"],
        explain: "„Freitag, den siebzehnten, um halb neun.“",
      },
      {
        kind: "short_answer",
        text: "Was muss Herr Kaya mitbringen?",
        options: [],
        answer: 0,
        accept: ["seinen Personalausweis", "den Personalausweis", "Personalausweis", "seinen Ausweis"],
        explain: "„bringen Sie Ihren Personalausweis mit“ — kimliksiz sınava giremiyor.",
      },
      {
        text: "Bis wann soll Herr Kaya zurückrufen?",
        options: ["bis Donnerstag", "bis Freitag", "bis Montag"],
        answer: 0,
        explain: "„Rufen Sie mich bitte bis Donnerstag zurück.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w13",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Rückmeldung zum Abendkurs",
    genre: "formal",
    intro: "Dil okulu bitirdiğin akşam kursu hakkında görüşünü soruyor: önce iki cümle kur, sonra kısa ve nazik bir geri bildirim yaz.",
    gloss: [
      { de: "die Rückmeldung", tr: "geri bildirim", en: "feedback" },
      { de: "erklären", tr: "açıklamak", en: "to explain" },
      { de: "besonders", tr: "özellikle", en: "especially" },
      { de: "der Vorschlag", tr: "öneri", en: "suggestion" },
      { de: "helfen", tr: "yardım etmek", en: "to help" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kurs bana çok yardımcı oldu.",
        answer: "Der Kurs hat mir sehr geholfen.",
        alternatives: ["Mir hat der Kurs sehr geholfen."],
        hint: "„helfen“ Dativ ister: mir. Perfekt'i haben ile kurulur: hat … geholfen.",
      },
      {
        kind: "build",
        tr: "Ne yazık ki konuşmak için az zamanımız vardı.",
        answer: "Leider hatten wir wenig Zeit zum Sprechen.",
        alternatives: ["Wir hatten leider wenig Zeit zum Sprechen."],
        hint: "haben'in Präteritum'u: wir hatten. „Leider“ başa gelince fiil yine ikinci sırada kalır.",
      },
      {
        kind: "free",
        prompt:
          "Dil okulundaki akşam kursun bitti ve okul görüşünü soruyor. Okul yöneticisi Frau Albers'e yaz: hangi kursa ne zamandan ne zamana katıldığını söyle, iki iyi yanını anlat, bir eksikliği nazikçe belirt, bir öneri yap ve sonraki kursa gelip gelmeyeceğini yaz.",
        checklist: [
          "Hangi kursa ne zaman katıldığını yaz",
          "İyi bulduğun iki şeyi anlat",
          "Bir eksikliği nazikçe söyle ve bir öneri yap",
          "Sonraki kurs için planını yaz",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich habe von … bis … den Kurs … besucht.", tr: "…'dan …'a kadar … kursuna katıldım.", en: "I attended the … course from … to …" },
          { de: "Besonders gut fand ich …", tr: "Özellikle … çok iyiydi", en: "What I particularly liked was …" },
          { de: "Leider hatten wir …", tr: "Ne yazık ki … vardı", en: "Unfortunately we had …" },
          { de: "Mein Vorschlag: …", tr: "Önerim şu: …", en: "My suggestion: …" },
          { de: "Ich möchte gern den nächsten Kurs machen.", tr: "Bir sonraki kursa da katılmak isterim.", en: "I would like to take the next course." },
        ],
        sample:
          "Sehr geehrte Frau Albers,\n\n" +
          "vielen Dank für Ihre Frage. Ich habe von März bis Juni den Abendkurs A2 bei Herrn Petersen besucht. " +
          "Der Kurs hat mir sehr geholfen. Besonders gut fand ich die Grammatik: Herr Petersen hat alles langsam " +
          "und mit vielen Beispielen erklärt. Auch die Gruppe war sehr nett, wir haben uns oft nach dem Kurs getroffen. " +
          "Leider hatten wir wenig Zeit zum Sprechen, weil wir viele Aufgaben im Buch gemacht haben. " +
          "Mein Vorschlag: Vielleicht können wir im nächsten Kurs öfter in kleinen Gruppen sprechen. " +
          "Ich möchte im September gern den B1-Kurs machen.\n\n" +
          "Mit freundlichen Grüßen\nMerve Aksoy",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s13",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "j, qu und chs",
    genre: "pronounce",
    intro: "Üç yazım Türkçe okumayla çelişir: j Almancada y, qu kv, chs çoğu kelimede ks okunur. Altı cümlede üçünü de doğru söyle.",
    gloss: [
      { de: "die Qualität", tr: "kalite", en: "quality" },
      { de: "die Quittung", tr: "makbuz", en: "receipt" },
      { de: "wachsen", tr: "büyümek", en: "to grow" },
      { de: "der Fuchs", tr: "tilki", en: "fox" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Im Januar war ich in Japan.",
        tr: "Ocak ayında Japonya'daydım.",
        hint: "Almanca j, Türkçe y gibidir: YAA-nu-ar, YAA-pan. Türkçedeki j sesi burada hiç yok.",
        confusions: [
          {
            heard: ["Schanuar", "Schapan"],
            fix: "j'yi Türkçe j gibi okursan „ş“ye yakın duyulur; dilin ortası damağa kalkar ve y sesi çıkar.",
            expected: "Januar",
          },
        ],
      },
      {
        de: "Ja, das Jahr war wirklich gut.",
        tr: "Evet, yıl gerçekten iyiydi.",
        hint: "ja = yaa, Jahr = yaar. İkisi de y ile başlar ve ünlü uzundur.",
        confusions: [
          {
            heard: ["Schar"],
            fix: "Jahr'ı j ile söylersen başka bir kelimeye döner; y ile başla: YAAR.",
            expected: "Jahr",
          },
        ],
      },
      {
        de: "Die Qualität ist sehr gut.",
        tr: "Kalite çok iyi.",
        hint: "qu = kv: KVA-li-tät. Önce k, hemen ardından alt dudak üst dişlere değer ve v gelir.",
        confusions: [
          {
            heard: ["Kualität"],
            fix: "qu Türkçedeki „ku“ değil; u yerine dudak-diş v sesi gelir: kv.",
            expected: "Qualität",
          },
        ],
      },
      {
        de: "Ich habe eine Frage zur Quittung.",
        tr: "Makbuzla ilgili bir sorum var.",
        hint: "Quittung: KVİT-tung. Yine kv; ardından kısa bir i.",
        confusions: [
          {
            heard: ["Kuittung"],
            fix: "k ile i arasına u koyma; dudaklar yuvarlanmaz, v sesi gelir.",
            expected: "Quittung",
          },
        ],
      },
      {
        de: "Die Kinder wachsen so schnell.",
        tr: "Çocuklar çok hızlı büyüyor.",
        hint: "wachsen: VAK-sen. Burada chs, ks okunur; ş değil.",
        confusions: [
          {
            heard: ["waschen"],
            fix: "chs'yi ş gibi söylersen „yıkamak“ anlamına gelen waschen duyulur; k ile s'yi art arda söyle.",
            expected: "wachsen",
          },
        ],
      },
      {
        de: "Der Fuchs wohnt im Wald.",
        tr: "Tilki ormanda yaşar.",
        hint: "Fuchs: FUKS. Kısa u, ardından net bir ks.",
        confusions: [
          {
            heard: ["Fusch"],
            fix: "Sondaki chs ş'ye kayarsa kelime tanınmaz; dilin arkasıyla k, sonra s.",
            expected: "Fuchs",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g13",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "besucht, verstanden, studiert",
    genre: "grammar",
    intro: "Her ortaç ge- ile başlamaz: bazı ön ekler ve -ieren eki ge-'yi dışarıda bırakır.",
    focus: "Partizip II: ge- almayan fiiller (be-, ver-, er- ön ekleri ve -ieren)",
    gloss: [
      { de: "besuchen", tr: "ziyaret etmek", en: "to visit" },
      { de: "verstehen", tr: "anlamak", en: "to understand" },
      { de: "erklären", tr: "açıklamak", en: "to explain" },
      { de: "studieren", tr: "üniversitede okumak", en: "to study" },
      { de: "bekommen", tr: "almak", en: "to get" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Ayrılmayan ön ekler",
        tr: "be-, ver-, er-, ent-, emp-, ge- ve zer- ile başlayan fiiller ortaçta ge- almaz. Bu ön ekler vurgusuzdur ve kökten hiç ayrılmaz. Ortacın sonu yine -t ya da -en olur.",
        examples: [
          { de: "Ich habe meine Oma besucht.", tr: "Ninemi ziyaret ettim.", note: "besuchen → besucht" },
          { de: "Hast du die Aufgabe verstanden?", tr: "Ödevi anladın mı?", note: "verstehen → verstanden" },
          { de: "Er hat mir den Weg erklärt.", tr: "Bana yolu tarif etti.", note: "erklären → erklärt" },
        ],
      },
      {
        heading: "-ieren fiilleri",
        tr: "-ieren ile biten fiiller de ge- almaz, ortaç -iert ile biter: studieren → studiert, telefonieren → telefoniert. Çoğu yabancı kökenlidir; vurgu hep -ie- hecesindedir.",
        examples: [
          { de: "Sie hat drei Jahre in Köln studiert.", tr: "Üç yıl Köln'de üniversite okudu.", note: "studieren → studiert" },
          { de: "Wir haben gestern lange telefoniert.", tr: "Dün uzun uzun telefonlaştık.", note: "telefonieren → telefoniert" },
          { de: "Was ist passiert?", tr: "Ne oldu?", note: "passieren sein ile" },
        ],
      },
      {
        heading: "Ayrılabilen ön ekle karıştırma",
        tr: "an-, auf-, ein- gibi ayrılabilen ön eklerde ge- ön ekle kökün ARASINA girer: angerufen, eingekauft. Ayrılmayan ön eklerde ise ge- hiç yoktur. Bazı ortaçlar mastarla aynı görünür: bekommen, vergessen.",
        examples: [
          { de: "Ich habe dich gestern angerufen.", tr: "Dün seni aradım.", note: "ayrılabilen: an-ge-rufen" },
          { de: "Ich habe einen Brief bekommen.", tr: "Bir mektup aldım.", note: "mastarla aynı biçim" },
          { de: "Wir haben den Schlüssel vergessen.", tr: "Anahtarı unuttuk.", note: "ver- → ge- yok" },
        ],
      },
    ],
    questions: [
      {
        text: "Hast du die Aufgabe ___?",
        options: ["verstanden", "geverstanden", "verstehen"],
        answer: 0,
        explain: "ver- ayrılmayan bir ön ektir; ortaç ge- almaz: verstanden.",
      },
      {
        text: "Sie hat drei Jahre in Köln ___.",
        options: ["gestudiert", "studieren", "studiert"],
        answer: 2,
        explain: "-ieren fiillerinin ortacı ge- almaz, -iert ile biter.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich habe meine Oma gebesucht.",
          "Ich habe meine Oma besucht.",
          "Ich habe meine Oma besuchen.",
        ],
        answer: 1,
        explain: "be- ön ekli fiilde ge- yoktur; Perfekt'te ortaç gerekir: besucht.",
      },
      {
        kind: "gapfill",
        text: "Er hat mir den Weg ___. (erklären)",
        options: [],
        answer: 0,
        accept: ["erklärt"],
        explain: "er- ayrılmayan ön ek: ortaç ge- almaz, erklärt.",
      },
      {
        kind: "gapfill",
        text: "Wir haben gestern lange ___. (telefonieren)",
        options: [],
        answer: 0,
        accept: ["telefoniert"],
        explain: "-ieren → -iert, ge- yok: telefoniert.",
      },
      {
        kind: "gapfill",
        text: "Ich habe einen Brief ___. (bekommen)",
        options: [],
        answer: 0,
        accept: ["bekommen"],
        explain: "be- ile ge- düşer; ortaç -en ile biter ve mastarla aynı görünür.",
      },
      {
        kind: "gapfill",
        text: "Die Werkstatt hat das Auto schnell ___. (reparieren)",
        options: [],
        answer: 0,
        accept: ["repariert"],
        explain: "reparieren bir -ieren fiilidir: repariert.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Gestern", "habe", "ich", "meinen Schlüssel", "vergessen"],
        explain: "Yardımcı fiil ikinci sırada, ortaç en sonda; vergessen ge- almaz.",
      },
      {
        kind: "truefalse",
        text: "„Wir haben die alte Wohnung verkauft.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "ver- ön ekli fiilde ge- yok: verkauft. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Was ist gepassiert?“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "passieren bir -ieren fiilidir; doğrusu „Was ist passiert?“",
      },
    ],
  },
];

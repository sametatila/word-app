import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 19.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 19 gençler ve söz hakkı hattı: küçük bir kasabanın gençlik danışma
 * kurulu, gençlik merkezinde cumartesi açılışı toplantısı, gazetedeki bir
 * habere okur mektubu. Dil bilgisi sıfattan türeyen isimler — der Erwachsene,
 * ein Erwachsener, etwas Neues; parti 6'daki sıfat çekiminin isim hâli.
 */
export const deB1P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r19",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Die Jugendlichen reden mit",
    genre: "article",
    intro: "Yerel bir haber: bir kasabada gençler belediyeye danışmanlık yapıyor; nasıl başladı, ne değişti, işin zor yanı ne.",
    gloss: [
      { de: "der Beirat", tr: "danışma kurulu", en: "advisory council" },
      { de: "beraten", tr: "danışmanlık yapmak", en: "to advise" },
      { de: "betreffen", tr: "ilgilendirmek", en: "to concern" },
      { de: "die Unterschrift", tr: "imza", en: "signature" },
      { de: "erreichen", tr: "elde etmek", en: "to achieve" },
      { de: "ernst", tr: "ciddi", en: "seriously" },
    ],
    minutes: 6,
    text:
      "Die Jugendlichen reden mit\n\n" +
      "Seit einem Jahr hat die Kleinstadt Hohenfeld einen Jugendbeirat. Zwölf Jugendliche zwischen " +
      "vierzehn und neunzehn Jahren treffen sich einmal im Monat im Rathaus und beraten den Stadtrat bei " +
      "allem, was junge Leute betrifft.\n\n" +
      "Die Idee kam von einer Sechzehnjährigen, Mira Schulz. „Die Erwachsenen haben immer über uns " +
      "gesprochen, aber nie mit uns“, sagt sie. Als der Stadtrat den alten Fußballplatz hinter der Schule " +
      "verkaufen wollte, hat sie Unterschriften gesammelt: fast vierhundert in drei Wochen.\n\n" +
      "Inzwischen hat der Beirat einiges erreicht. Der letzte Bus aus der Kreisstadt fährt am Wochenende " +
      "eine Stunde später, und im alten Bahnhof gibt es jetzt einen Raum, in dem Jugendliche abends Musik " +
      "machen können. Das Wichtigste ist für Mira aber etwas anderes: „Man nimmt uns endlich ernst.“\n\n" +
      "Ganz einfach ist die Arbeit nicht. Die Sitzungen im Rathaus sind lang, und viele Themen sind für " +
      "Neue schwer zu verstehen. Deshalb bekommt jedes neue Mitglied einen Paten aus dem Stadtrat, der " +
      "die Fachwörter erklärt.\n\n" +
      "Bürgermeister Klaus Brenner war am Anfang skeptisch. Heute sagt er: „Die Jungen stellen genau die " +
      "Fragen, die wir Älteren längst vergessen haben.“",
    questions: [
      {
        text: "Was macht der Jugendbeirat?",
        options: [
          "Er berät den Stadtrat bei Themen für junge Leute.",
          "Er organisiert Konzerte im Rathaus.",
          "Er verkauft Fahrkarten für den Bus.",
        ],
        answer: 0,
        explain: "„… und beraten den Stadtrat bei allem, was junge Leute betrifft.“",
      },
      {
        text: "Wie hat alles angefangen?",
        options: [
          "Der Bürgermeister hatte die Idee.",
          "Mira hat Unterschriften gegen einen Verkauf gesammelt.",
          "Die Schule hat einen Wettbewerb gemacht.",
        ],
        answer: 1,
        explain: "Belediye futbol sahasını satmak isteyince Mira üç haftada dört yüze yakın imza toplamış.",
      },
      {
        kind: "truefalse",
        text: "Durch den Beirat fährt der letzte Bus am Wochenende später.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Der letzte Bus aus der Kreisstadt fährt am Wochenende eine Stunde später.“",
      },
      {
        kind: "gapfill",
        text: "Mira hat fast ___ Unterschriften gesammelt.",
        options: [],
        answer: 0,
        accept: ["vierhundert", "400"],
        explain: "„… fast vierhundert in drei Wochen“.",
      },
      {
        kind: "short_answer",
        text: "Wer hilft neuen Mitgliedern mit den Fachwörtern?",
        options: [],
        answer: 0,
        accept: ["ein Pate aus dem Stadtrat", "ein Pate", "der Pate", "Pate", "einen Paten", "ihr Pate", "jemand aus dem Stadtrat"],
        explain: "„… bekommt jedes neue Mitglied einen Paten aus dem Stadtrat, der die Fachwörter erklärt.“",
      },
      {
        text: "Was denkt der Bürgermeister heute?",
        options: [
          "Die Sitzungen dauern zu lange.",
          "Der Beirat kostet die Stadt zu viel.",
          "Die Jungen stellen wichtige Fragen.",
        ],
        answer: 2,
        explain: "„Die Jungen stellen genau die Fragen, die wir Älteren längst vergessen haben.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l19",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Besprechung: Samstags im Jugendzentrum",
    genre: "meeting",
    intro: "Gençlik merkezinin ekibi ve bir genç konuşuyor: merkez cumartesi akşamları açılabilir mi, hangi koşullarla.",
    gloss: [
      { de: "die Tankstelle", tr: "benzin istasyonu", en: "gas station" },
      { de: "die Fachkraft", tr: "nitelikli eleman", en: "qualified member of staff" },
      { de: "aufschließen", tr: "kilidi açmak", en: "to unlock" },
      { de: "übernehmen", tr: "üstlenmek", en: "to take on" },
      { de: "das Recht", tr: "hak", en: "right" },
      { de: "die Ruhe", tr: "sessizlik", en: "quiet" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Herr Weiler", text: "Danke, dass ihr gekommen seid. Heute geht es um die Frage, ob das Jugendzentrum auch samstags öffnen kann." },
      { speaker: "Nuray", text: "Am Samstagabend gibt es für uns nichts. Die Kleinen haben den Spielplatz, die Erwachsenen haben ihre Kneipe, und wir stehen an der Tankstelle." },
      { speaker: "Frau Jansen", text: "Das verstehe ich gut. Das Problem ist das Personal. Am Wochenende muss immer eine Fachkraft da sein, und wir sind nur zu zweit." },
      { speaker: "Nuray", text: "Und wenn Ältere aus unserer Gruppe mithelfen? Einige sind schon achtzehn und haben den Kurs für Gruppenleiter gemacht." },
      { speaker: "Herr Weiler", text: "Das wäre eine Möglichkeit. Aber allein dürfen sie nicht aufschließen. Jemand aus dem Team muss bis zweiundzwanzig Uhr bleiben." },
      { speaker: "Frau Jansen", text: "Ich könnte zwei Samstage im Monat übernehmen, wenn ich dafür am Montag frei habe." },
      { speaker: "Herr Weiler", text: "Gut, dann probieren wir es bis zu den Sommerferien: zweimal im Monat, von achtzehn bis zweiundzwanzig Uhr." },
      { speaker: "Nuray", text: "Darf die Musik dann auch laut sein? Das ist das Einzige, was wir wirklich wollen." },
      { speaker: "Herr Weiler", text: "Bis zweiundzwanzig Uhr ja. Oben wohnen Nachbarn, und die haben danach ein Recht auf Ruhe." },
    ],
    questions: [
      {
        text: "Worum geht es in der Besprechung?",
        options: [
          "um eine Öffnung am Samstagabend",
          "um neue Möbel für das Zentrum",
          "um einen Ausflug in den Ferien",
        ],
        answer: 0,
        explain: "„Heute geht es um die Frage, ob das Jugendzentrum auch samstags öffnen kann.“",
      },
      {
        text: "Warum ist die Öffnung am Wochenende schwierig?",
        options: [
          "weil die Nachbarn sie verbieten",
          "weil zu wenig Personal da ist",
          "weil das Zentrum kein Geld für Strom hat",
        ],
        answer: 1,
        explain: "„Das Problem ist das Personal … und wir sind nur zu zweit.“",
      },
      {
        kind: "truefalse",
        text: "Ältere Jugendliche dürfen das Zentrum nicht allein aufschließen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Aber allein dürfen sie nicht aufschließen.“ Ekipten biri saat yirmi ikiye kadar kalmalı.",
      },
      {
        kind: "gapfill",
        text: "Frau Jansen möchte dafür am ___ frei haben.",
        options: [],
        answer: 0,
        accept: ["Montag"],
        explain: "„… wenn ich dafür am Montag frei habe.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann läuft der Versuch?",
        options: [],
        answer: 0,
        accept: ["bis zu den Sommerferien", "bis zu den Ferien", "bis zum Sommer", "Sommerferien", "bis zu den großen Ferien", "bis vor den Sommerferien"],
        explain: "„… dann probieren wir es bis zu den Sommerferien“.",
      },
      {
        text: "Warum darf die Musik nach zweiundzwanzig Uhr nicht laut sein?",
        options: [
          "weil dann alle nach Hause müssen",
          "weil das Team dann müde ist",
          "weil oben Nachbarn wohnen",
        ],
        answer: 2,
        explain: "„Oben wohnen Nachbarn, und die haben danach ein Recht auf Ruhe.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w19",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Leserbrief: Die Jugendlichen am Bahnhof",
    genre: "letter",
    intro: "Yerel gazetede gençler hakkında bir haber çıktı: önce iki cümle kur, sonra gazeteye dengeli bir okur mektubu yaz.",
    gloss: [
      { de: "der Anwohner", tr: "mahalle sakini", en: "local resident" },
      { de: "das Verbot", tr: "yasak", en: "ban" },
      { de: "der Jugendliche", tr: "genç", en: "teenager" },
      { de: "verschieben", tr: "kaydırmak", en: "to shift" },
      { de: "der Treffpunkt", tr: "buluşma yeri", en: "meeting point" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Gençlerin buluşabilecekleri bir yere ihtiyaçları var.",
        answer: "Die Jugendlichen brauchen einen Ort, an dem sie sich treffen können.",
        alternatives: ["Einen Ort, an dem sie sich treffen können, brauchen die Jugendlichen."],
        hint: "„die Jugendlichen“ sıfattan türemiş bir isimdir ve sıfat gibi çekilir: belirli artikelli çoğulda -en.",
      },
      {
        kind: "build",
        tr: "Yaşlıların da huzura hakkı var.",
        answer: "Auch die Älteren haben ein Recht auf Ruhe.",
        alternatives: ["Die Älteren haben auch ein Recht auf Ruhe."],
        hint: "„alt“ sıfatının karşılaştırma biçiminden isim: „die Älteren“; artikelden sonra çoğulda -en.",
      },
      {
        kind: "free",
        prompt:
          "Gazeteye bir okur mektubu yaz: hangi habere cevap verdiğini söyle, sakinlerin şikâyetini anladığını göster, gençlerin durumunu anlat, yasak yerine somut bir öneri getir ve kısa bir çağrıyla bitir.",
        stimulus:
          "Ärger am Bahnhofsplatz\n\n" +
          "Anwohner klagen seit Wochen über Jugendliche, die abends auf dem Bahnhofsplatz laut Musik hören " +
          "und Müll liegen lassen. Die Stadt prüft jetzt ein Verbot: Ab 22 Uhr soll der Platz gesperrt werden.",
        checklist: [
          "Hangi habere cevap verdiğini söyle",
          "İki tarafı da dikkate al",
          "Yasak yerine somut bir öneri getir",
          "Kısa bir çağrıyla bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Mit Interesse habe ich Ihren Artikel über … gelesen.", tr: "… ile ilgili yazınızı ilgiyle okudum.", en: "I read your article about … with interest." },
          { de: "Ich kann die Anwohner gut verstehen, aber …", tr: "Sakinleri iyi anlıyorum ama …", en: "I understand the residents well, but …" },
          { de: "Ein Verbot löst das Problem nicht, sondern …", tr: "Bir yasak sorunu çözmez, aksine …", en: "A ban doesn't solve the problem, instead …" },
          { de: "Viel sinnvoller wäre es, …", tr: "Çok daha mantıklı olan … olurdu", en: "It would be much more sensible to …" },
          { de: "Ich wünsche mir, dass …", tr: "…'i diliyorum", en: "I would like to see …" },
        ],
        sample:
          "Sehr geehrte Redaktion,\n\n" +
          "mit Interesse habe ich Ihren Artikel über den Bahnhofsplatz gelesen. Ich wohne selbst in der Nähe " +
          "und kann die Anwohner gut verstehen, aber in dem Artikel kommt nur eine Seite zu Wort. " +
          "Die Jugendlichen stehen am Bahnhof, weil es in unserem Viertel keinen anderen Ort für sie gibt: " +
          "Das Jugendzentrum schließt um achtzehn Uhr, und in den Cafés sind sie nicht willkommen. " +
          "Ein Verbot löst das Problem nicht, sondern verschiebt es nur in die nächste Straße. Die Jugendlichen " +
          "brauchen einen Ort, an dem sie sich treffen können. Viel sinnvoller wäre es, den alten Kiosk am " +
          "Park als Treffpunkt zu öffnen, mit Mülleimern und klaren Zeiten. Auch die Älteren haben ein Recht " +
          "auf Ruhe, das ist klar. Ich wünsche mir, dass die Stadt vor einer Entscheidung mit beiden Gruppen " +
          "spricht.\n\n" +
          "Mit freundlichen Grüßen\nMurat Demirel",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s19",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Wählen ab sechzehn?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir öneriyi iki gerekçeyle savun ya da reddet.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Gençler on altı yaşında oy kullanabilmeli mi? Görüşünü söyle, iki gerekçe ver, karşı tarafın en güçlü argümanını söyle ve bir sonuçla bitir.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "İki gerekçe ver",
        "Karşı tarafın en güçlü argümanını söyle",
        "Bir sonuçla bitir",
      ],
      targets: [
        { de: "Ich bin dafür, dass …", tr: "…'den yanayım" },
        { de: "Die Jüngeren sind davon am längsten betroffen.", tr: "Bundan en uzun süre gençler etkileniyor." },
        { de: "Kritiker sagen, dass …", tr: "Eleştirenler … diyor" },
        { de: "Am Ende überzeugt mich …", tr: "Sonunda beni ikna eden …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich bin dafür, dass Jugendliche ab sechzehn wählen dürfen, zumindest bei Wahlen in ihrer Stadt. " +
        "Erstens sind die Jüngeren von vielen Entscheidungen am längsten betroffen: Wenn heute über Schulen, " +
        "Busse oder das Klima entschieden wird, leben sie noch sechzig Jahre damit. Zweitens dürfen " +
        "Sechzehnjährige schon arbeiten und Steuern zahlen, aber nicht mitbestimmen, was mit dem Geld " +
        "passiert. Kritiker sagen, dass sich viele in diesem Alter noch nicht genug für Politik interessieren. " +
        "Das stimmt vielleicht, aber das gilt auch für viele Erwachsene, und niemand nimmt ihnen deshalb das " +
        "Wahlrecht weg. Am Ende überzeugt mich ein einfacher Gedanke: Wer früh wählen darf, lernt früh, " +
        "dass seine Stimme zählt, und bleibt wahrscheinlich länger dabei.",
      rubricHint:
        "İki gerekçe ve bir karşı argüman beklenir; sıfattan türeyen isimler („die Jüngeren“, „Erwachsene“) doğru çekilmeli, „dass“ yan cümlesi kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g19",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "der Erwachsene, etwas Neues",
    genre: "grammar",
    intro: "Birçok sıfat büyük harfle isim olur ama sıfat gibi çekilmeye devam eder: der Bekannte, ein Bekannter, etwas Gutes.",
    focus: "Sıfattan türeyen isimler: der Erwachsene, ein Erwachsener, etwas Neues",
    gloss: [
      { de: "der Erwachsene", tr: "yetişkin", en: "adult" },
      { de: "der Bekannte", tr: "tanıdık", en: "acquaintance" },
      { de: "der Kranke", tr: "hasta", en: "patient" },
      { de: "neu", tr: "yeni", en: "new" },
      { de: "besonders", tr: "özel", en: "special" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Sıfat isim olunca",
        tr: "„erwachsen“ (yetişkin) sıfatından „der Erwachsene“ (yetişkin kişi) olur: büyük harfle yazılır ama eki, sıfat çekimi tablosuna göre değişmeye devam eder. Belirli artikelden sonra -e ya da -en, eril belirsiz artikelden sonra yalın hâlde -er gelir.",
        examples: [
          { de: "Der Erwachsene zahlt zehn Euro.", tr: "Yetişkin on euro öder.", note: "der → -e" },
          { de: "Ein Erwachsener zahlt zehn Euro.", tr: "Bir yetişkin on euro öder.", note: "ein → -er" },
          { de: "Kinder und Erwachsene sind willkommen.", tr: "Çocuklar da yetişkinler de davetli.", note: "artikelsiz çoğul → -e" },
        ],
      },
      {
        heading: "Hâle ve cinsiyete göre ek",
        tr: "Hâl değişince ek de değişir, tıpkı sıfatta olduğu gibi: „Ich treffe einen Bekannten“ (Akkusativ), „bei einer Bekannten“ (Dativ). Kişinin cinsiyetini artikel söyler: der Bekannte bir erkek, die Bekannte bir kadın tanıdıktır.",
        examples: [
          { de: "Gestern habe ich einen Bekannten getroffen.", tr: "Dün bir tanıdığa rastladım.", note: "Akkusativ eril → -en" },
          { de: "Sie wohnt zurzeit bei einer Bekannten.", tr: "Şu sıralar bir tanıdığının yanında kalıyor.", note: "Dativ dişil → -en" },
          { de: "Die Kranken warten im Flur.", tr: "Hastalar koridorda bekliyor.", note: "belirli çoğul → -en" },
        ],
      },
      {
        heading: "etwas Neues, nichts Besonderes, das Beste",
        tr: "„etwas, nichts, viel, wenig“ sözcüklerinden sonra sıfat nötr bir isim olur, büyük harfle yazılır ve -es alır: „etwas Neues“, „nichts Besonderes“. Belirli artikelle nötr biçim de çok sık kullanılır: „das Beste“, „das Wichtigste“.",
        examples: [
          { de: "Ich möchte etwas Neues lernen.", tr: "Yeni bir şey öğrenmek istiyorum.", note: "etwas + -es" },
          { de: "Im Fernsehen kommt heute nichts Besonderes.", tr: "Bugün televizyonda özel bir şey yok.", note: "nichts + -es" },
          { de: "Das Beste am Urlaub war das Essen.", tr: "Tatilin en iyi yanı yemekti.", note: "das + en üstün derece" },
        ],
      },
    ],
    questions: [
      {
        text: "Ein ___ zahlt zehn Euro.",
        options: ["Erwachsene", "Erwachsener", "Erwachsenen"],
        answer: 1,
        explain: "„ein“ eril yalında ek almaz; bilgiyi sıfattan türeyen isim taşır: -er.",
      },
      {
        text: "Gestern habe ich einen ___ getroffen.",
        options: ["Bekannten", "Bekannter", "Bekannte"],
        answer: 0,
        explain: "Eril Akkusativ'de „einen“den sonra -en gelir: einen Bekannten.",
      },
      {
        text: "Ich möchte etwas ___ lernen.",
        options: ["neu", "neue", "Neues"],
        answer: 2,
        explain: "„etwas“tan sonra sıfat nötr isim olur: büyük harf ve -es.",
      },
      {
        kind: "gapfill",
        text: "Die ___ warten im Flur. (krank)",
        options: [],
        answer: 0,
        accept: ["Kranken"],
        explain: "Belirli artikelli çoğulda -en: die Kranken.",
      },
      {
        kind: "gapfill",
        text: "Im Fernsehen kommt heute nichts ___. (besonders)",
        options: [],
        answer: 0,
        accept: ["Besonderes"],
        explain: "„nichts“tan sonra nötr isim ve -es eki: nichts Besonderes.",
      },
      {
        kind: "gapfill",
        text: "Das ___ am Urlaub war das Essen. (gut, Superlativ)",
        options: [],
        answer: 0,
        accept: ["Beste"],
        explain: "„gut“un en üstün derecesi isim olunca: das Beste.",
      },
      {
        kind: "gapfill",
        text: "Sie wohnt zurzeit bei einer ___. (bekannt)",
        options: [],
        answer: 0,
        accept: ["Bekannten"],
        explain: "„bei“ Dativ ister; dişil belirsiz artikelden sonra -en: einer Bekannten.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "habe", "einen Bekannten", "am Bahnhof", "getroffen"],
        explain: "Perfekt: „habe“ ikinci sırada, Partizip en sonda; „einen Bekannten“ Akkusativ'de -en alır.",
      },
      {
        kind: "truefalse",
        text: "„Der Jugendliche wartet vor der Tür.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Belirli artikelle yalın tekilde -e eki: der Jugendliche.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe heute nichts Neu gehört.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„nichts“tan sonra -es gerekir: „nichts Neues“.",
      },
    ],
  },
];

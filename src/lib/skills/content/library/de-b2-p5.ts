import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: yazılı söyleşi, podcast ve yönerge metni. Üçü de edatlı
 * fiiller ve da-/wo- bileşikleriyle dolu; dil bilgisi tam olarak bu yapı.
 */
export const deB2P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r5",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Am Ende bleiben die Schlüssel",
    genre: "Söyleşi",
    intro: "Kayıp eşya müzayedesini yürüten biriyle söyleşi okuyacaksın: nasıl işliyor, insanlar neye kızıyor, ne geriye kalıyor.",
    gloss: [
      { de: "die Versteigerung", tr: "açık artırma", en: "auction" },
      { de: "das Schnäppchen", tr: "kelepir", en: "bargain" },
      { de: "der Posten", tr: "kalem", en: "lot" },
      { de: "bieten", tr: "teklif vermek", en: "to bid" },
      { de: "haften", tr: "sorumlu olmak", en: "to be liable" },
      { de: "aufbewahren", tr: "saklamak", en: "to keep" },
      { de: "der Sammler", tr: "koleksiyoncu", en: "collector" },
    ],
    minutes: 9,
    text:
      "„AM ENDE BLEIBEN DIE SCHLÜSSEL“\n" +
      "Ein Gespräch mit Ute Barsch, seit neun Jahren zuständig für die Fundsachenversteigerung der Stadt\n\n" +
      "Frau Barsch, womit rechnen Besucher, wenn sie zum ersten Mal kommen?\n" +
      "Die meisten rechnen mit Schnäppchen und wundern sich dann über die Stimmung. Es ist keine Trödelhalle, " +
      "es ist ein Verfahren. Über jeden Posten wird protokolliert, wer geboten hat und wie viel.\n\n" +
      "Worüber ärgern sich die Leute am häufigsten?\n" +
      "Darüber, dass sie nichts anfassen dürfen, bevor sie bieten. Ich verstehe das, aber wir haften nicht für " +
      "die Sachen. Wer sich für ein Fahrrad interessiert, kann es in der Besichtigung von allen Seiten ansehen — " +
      "nur eben nicht fahren.\n\n" +
      "Was kommt am häufigsten herein?\n" +
      "Regenschirme im Herbst, Brillen das ganze Jahr, und Fahrräder, sehr viele Fahrräder. Worauf sich niemand " +
      "vorbereitet, sind die Kuscheltiere. Wir bewahren sie sechs Monate auf, und in dieser Zeit fragt fast nie " +
      "jemand danach.\n\n" +
      "Und die Schlüssel?\n" +
      "Am Ende bleiben immer die Schlüssel. Zweitausend im Jahr, geschätzt. Man kann sie nicht versteigern, weil " +
      "niemand weiß, wozu sie gehören, und man kann sie schlecht wegwerfen, weil sie für irgendjemanden alles " +
      "bedeuten. Wir bewahren sie länger auf, als wir müssten.\n\n" +
      "Erinnern Sie sich an einen besonderen Fall?\n" +
      "An einen Koffer mit Briefen aus den sechziger Jahren. Wir haben monatelang darauf gewartet, dass sich " +
      "jemand meldet. Am Ende hat ihn ein Sammler ersteigert, und ich habe mich lange darüber geärgert, obwohl " +
      "alles korrekt war.\n\n" +
      "Worauf achten Sie bei Neulingen im Team?\n" +
      "Ob sie sich für die Sachen interessieren oder nur für die Preise. Wer nur rechnet, hält das hier nicht " +
      "lange aus.",
    questions: [
      {
        text: "Was betont Frau Barsch an der Versteigerung?",
        options: [
          "Sie ist ein geregeltes Verfahren.",
          "Sie ist vor allem ein Volksfest.",
          "Sie bringt der Stadt viel Geld.",
        ],
        answer: 0,
        explain: "„Es ist keine Trödelhalle, es ist ein Verfahren. Über jeden Posten wird protokolliert …“",
      },
      {
        text: "Worüber ärgern sich die Besucher am häufigsten?",
        options: [
          "dass sie vorher nichts anfassen dürfen",
          "dass die Preise am Ende zu hoch sind",
          "dass die Termine viel zu selten sind",
        ],
        answer: 0,
        explain: "„Darüber, dass sie nichts anfassen dürfen, bevor sie bieten.“",
      },
      {
        kind: "truefalse",
        text: "Schlüssel werden regelmäßig versteigert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Man kann sie nicht versteigern, weil niemand weiß, wozu sie gehören.“",
      },
      {
        kind: "gapfill",
        text: "Kuscheltiere werden ___ Monate aufbewahrt.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„Wir bewahren sie sechs Monate auf …“",
      },
      {
        kind: "short_answer",
        text: "Was hat der Sammler ersteigert?",
        options: [],
        answer: 0,
        accept: ["einen Koffer mit Briefen", "einen Koffer", "den Koffer mit Briefen"],
        explain: "„An einen Koffer mit Briefen aus den sechziger Jahren … Am Ende hat ihn ein Sammler ersteigert.“",
      },
      {
        text: "Worauf achtet Frau Barsch bei neuen Mitarbeitern?",
        options: [
          "auf ihr Interesse an den Dingen",
          "auf ihre Erfahrung mit Auktionen",
          "auf ihre Schnelligkeit beim Rechnen",
        ],
        answer: 0,
        explain: "„Ob sie sich für die Sachen interessieren oder nur für die Preise.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l5",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Zwölftausend Stunden Erinnerung",
    genre: "Podcast",
    intro: "Bir podcast bölümü ses arşivini anlatıyor: kime, ne soruluyor, neye dikkat ediliyor, kayıtlar ne oluyor.",
    gloss: [
      { de: "das Tonarchiv", tr: "ses arşivi", en: "audio archive" },
      { de: "sich stapeln", tr: "yığılmak", en: "to pile up" },
      { de: "aushalten", tr: "dayanmak", en: "to endure" },
      { de: "einverstanden", tr: "razı", en: "in agreement" },
      { de: "kippen", tr: "yön değiştirmek", en: "to tip over" },
      { de: "verschlagworten", tr: "etiketlemek", en: "to tag" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Host", text: "Willkommen zurück. Heute sind wir in einem Raum, in dem sich zwölftausend Stunden Erinnerung stapeln: dem Tonarchiv der Stadtbibliothek." },
      { speaker: "Host", text: "Seit achtzehn Jahren nehmen hier Ehrenamtliche Gespräche mit älteren Menschen auf. Ich habe mit der Leiterin, Hanna Sperber, darüber gesprochen, worauf es dabei ankommt." },
      { speaker: "Hanna", text: "Die häufigste Frage ist: Wen fragt ihr? Und die Antwort überrascht viele. Wir suchen nicht nach großen Ereignissen. Wir fragen nach Wegen zur Arbeit, nach Küchen, nach Straßennamen." },
      { speaker: "Hanna", text: "Wer nach dem großen Ereignis fragt, bekommt eine Geschichte, die schon hundertmal erzählt wurde. Wer nach dem Alltag fragt, bekommt etwas, woran sich sonst niemand erinnert." },
      { speaker: "Host", text: "Und wie bereitet man sich darauf vor?" },
      { speaker: "Hanna", text: "Wenig recherchieren, viel zuhören. Unsere Leute lernen vor allem eines: aushalten, dass jemand zwanzig Sekunden schweigt. Genau danach kommt meistens der wichtige Satz." },
      { speaker: "Hanna", text: "Technisch ist es einfach. Zwei Mikrofone, ein ruhiger Raum, keine Küche mit Kühlschrank. Und wir fragen immer am Anfang, womit die Person einverstanden ist und was gesperrt bleiben soll." },
      { speaker: "Host", text: "Gibt es etwas, worüber die Gespräche regelmäßig kippen?" },
      { speaker: "Hanna", text: "Ja, Fotos. Wenn jemand ein Album mitbringt, redet er über die Bilder statt über sich. Wir bitten deshalb darum, das Album erst am Ende herauszuholen." },
      { speaker: "Host", text: "Und was passiert mit den Aufnahmen?" },
      { speaker: "Hanna", text: "Sie werden verschriftlicht und verschlagwortet. Wer daran mitarbeiten möchte, muss nicht tippen können — Zuhören reicht. Die nächste Schulung ist im März." },
    ],
    questions: [
      {
        text: "Wonach fragt das Archiv vor allem?",
        options: ["nach dem Alltag", "nach großen Ereignissen", "nach politischen Meinungen"],
        answer: 0,
        explain: "„Wir suchen nicht nach großen Ereignissen. Wir fragen nach Wegen zur Arbeit, nach Küchen, nach Straßennamen.“",
      },
      {
        text: "Was lernen die Ehrenamtlichen als Wichtigstes?",
        options: ["Schweigen aushalten", "schnell mitschreiben", "gründlich recherchieren"],
        answer: 0,
        explain: "„Unsere Leute lernen vor allem eines: aushalten, dass jemand zwanzig Sekunden schweigt.“",
      },
      {
        kind: "truefalse",
        text: "Fotoalben helfen dem Gespräch von Anfang an.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Wenn jemand ein Album mitbringt, redet er über die Bilder statt über sich.“ — albüm sona bırakılıyor.",
      },
      {
        kind: "short_answer",
        text: "Wann ist die nächste Schulung?",
        options: [],
        answer: 0,
        accept: ["im März", "März", "im Maerz"],
        explain: "„Die nächste Schulung ist im März.“",
      },
      {
        kind: "dictation",
        text: "Hazırlıkla ilgili iki kelimelik kuralı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Wenig recherchieren, viel zuhören.", "Wenig recherchieren viel zuhören"],
        explain: "„Wenig recherchieren, viel zuhören.“ — iki mastar, iki zıt miktar.",
      },
      {
        text: "Was wird am Anfang jedes Gesprächs geklärt?",
        options: [
          "womit die Person einverstanden ist",
          "wie lange das Gespräch dauern soll",
          "wer die Aufnahme später bezahlt",
        ],
        answer: 0,
        explain: "„… wir fragen immer am Anfang, womit die Person einverstanden ist und was gesperrt bleiben soll.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w5",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Anleitung für ein erstes Interview",
    genre: "Yönerge",
    intro: "İlk kez kayıt alacak gönüllüler için bir yönerge yazacaksın; önce iki cümle kur, sonra yönergeyi yaz.",
    gloss: [
      { de: "die Aufnahme", tr: "kayıt", en: "recording" },
      { de: "das Einverständnis", tr: "rıza", en: "consent" },
      { de: "schweigen", tr: "susmak", en: "to stay silent" },
      { de: "nachfragen", tr: "üstüne sormak", en: "to follow up" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kayıttan önce mutlaka rızasını sor.",
        answer: "Frag vor der Aufnahme unbedingt nach ihrem Einverständnis.",
        alternatives: ["Vor der Aufnahme frag unbedingt nach ihrem Einverständnis."],
        hint: "„fragen“ edatıyla birlikte öğrenilir: fragen nach + Dativ.",
      },
      {
        kind: "build",
        tr: "Sessizliğe dayan, çünkü önemli cümle çoğu zaman ondan sonra gelir.",
        answer: "Halte das Schweigen aus, denn der wichtige Satz kommt meistens danach.",
        alternatives: ["Halte das Schweigen aus, denn danach kommt meistens der wichtige Satz."],
        hint: "„denn“ ana cümle bağlacıdır ve sırayı bozmaz; „danach“ bir da-bileşiğidir ve öne alınabilir.",
      },
      {
        kind: "free",
        prompt:
          "İlk kez yaşlı bir kişiyle kayıtlı görüşme yapacak gönüllüler için yönerge yaz: hazırlık, ilk beş dakika, soru türleri, kaçınılacaklar ve kapanış. Kısa başlıklar kullan.",
        checklist: [
          "Hazırlıkta ne kadar araştırma yapılacağını söyle",
          "İlk beş dakika için somut bir açılış öner",
          "Soru türü için bir kural ver",
          "Bir tuzağı adlandır ve kapanışı anlat",
        ],
        minWords: 90,
        phrases: [
          { de: "Frag nach …", tr: "… sor" },
          { de: "Beginne mit etwas, woran …", tr: "… olan bir şeyle başla" },
          { de: "Bitte darum, dass …", tr: "… olmasını rica et" },
          { de: "Halte das Schweigen aus.", tr: "Sessizliğe dayan." },
          { de: "Rechne damit, dass …", tr: "… olacağını hesaba kat" },
        ],
        sample:
          "Diese Anleitung ist für alle, die zum ersten Mal ein Gespräch aufnehmen.\n\n" +
          "Vorbereitung. Recherchiere wenig. Zwei Namen und ein Jahrzehnt reichen; alles andere soll aus dem " +
          "Gespräch kommen. Frag vor der Aufnahme unbedingt nach ihrem Einverständnis und kläre, worüber sie " +
          "nicht sprechen möchte.\n\n" +
          "Die ersten fünf Minuten. Beginne mit etwas, woran sich jeder erinnert: dem Weg zur Schule, dem Geruch " +
          "einer Küche, dem ersten eigenen Zimmer. Nach dem großen Ereignis fragst du später oder gar nicht.\n\n" +
          "Fragen. Kurze Fragen sind besser als kluge. Frag nach Orten, nicht nach Gefühlen; die Gefühle kommen " +
          "von selbst. Wenn eine Antwort abbricht, frag nach, aber nur einmal.\n\n" +
          "Was du vermeiden solltest. Halte das Schweigen aus, denn der wichtige Satz kommt meistens danach. " +
          "Und bitte darum, dass Fotoalben erst am Ende herauskommen; sonst redet dein Gegenüber über die Bilder " +
          "statt über sich.\n\n" +
          "Zum Schluss. Sag, was mit der Aufnahme passiert, und lass dir bestätigen, dass es so in Ordnung ist. " +
          "Schreib danach in fünf Sätzen auf, woran du dich erinnerst.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s5",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Woran erinnert sich eine Stadt?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: en güçlü karşı görüşle başla, sonra kendi ölçütünü kur.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bir şehir arşivlere, anma yerlerine ve tabelalara para harcamalı mı, yoksa bu para bugünün ihtiyaçlarına mı gitmeli? Karşı görüşle başla, sonra kendi ölçütünü söyle.",
      bulletsTr: [
        "En güçlü karşı argümanla başla",
        "Ona iki farklı düzeyde cevap ver",
        "Kendi ölçütünü tek cümleyle koy",
        "Ölçütünü iki somut örnekle sına",
      ],
      targets: [
        { de: "Ich fange mit dem Einwand an, den ich am stärksten finde: …", tr: "En güçlü bulduğum itirazla başlıyorum: …" },
        { de: "Darauf gibt es zwei Antworten.", tr: "Buna iki cevap var." },
        { de: "Wovon nichts aufbewahrt wurde, …", tr: "Hiçbir şeyi saklanmamış olan …" },
        { de: "Mein Kriterium wäre …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Ich fange mit dem Einwand an, den ich am stärksten finde: Eine Stadt, die sich um Archive kümmert, " +
        "während die Schulen bröckeln, setzt falsche Prioritäten. Darauf gibt es zwei Antworten. Die erste ist " +
        "die einfache: Es geht um sehr kleine Summen. Die zweite ist wichtiger. Erinnerung ist kein Denkmal, " +
        "sondern eine Entscheidung darüber, worüber man später überhaupt streiten kann. Wovon nichts aufbewahrt " +
        "wurde, davon redet in dreißig Jahren niemand mehr. Mein Kriterium wäre deshalb nicht das Alter, sondern " +
        "die Gefahr des Verschwindens. Ein Rathaus aus dem achtzehnten Jahrhundert verschwindet nicht; die " +
        "Tonbänder einer Fabrik, in der viertausend Menschen gearbeitet haben, verschwinden bei einem einzigen " +
        "Umzug. Ich würde also weniger in Bronze investieren und mehr in das, was sich nicht wiederholen lässt: " +
        "Aufnahmen, Fotos und Zeugnisse von Menschen, die man heute noch fragen kann.",
      rubricHint:
        "Karşı görüşle başlanmalı ve sonuç tek bir ölçüte bağlanmalı; edatlı fiiller ve da-/wo- bileşikleri beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g5",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Worauf wartest du? Darauf.",
    genre: "Kural",
    intro: "Fiiller Almancada kendi edatlarını taşır; nesne bir şeyse edat zamirle değil, da- ve wo- bileşikleriyle kurulur.",
    focus: "Verben mit Präposition ve da-/wo-Komposita",
    gloss: [
      { de: "sich kümmern um", tr: "ilgilenmek", en: "to take care of" },
      { de: "rechnen mit", tr: "hesaba katmak", en: "to expect" },
      { de: "bitten um", tr: "rica etmek", en: "to ask for" },
      { de: "sich interessieren für", tr: "ilgi duymak", en: "to be interested in" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Edat fiile ait",
        tr: "Türkçede nesnenin hâli fiile göre değişir ama ayrı bir edat gerekmez: „otobüsü bekliyorum“. Almancada birçok fiil sabit bir edatla gelir ve o edat kelimeyle birlikte ezberlenir: warten auf, denken an, sich freuen über, bitten um, sich kümmern um, rechnen mit, achten auf.",
        examples: [
          { de: "Ich warte auf den Bus.", tr: "Otobüsü bekliyorum.", note: "warten auf + Akkusativ" },
          { de: "Er hat mich um Hilfe gebeten.", tr: "Benden yardım istedi.", note: "bitten um" },
          { de: "Wir rechnen mit Regen.", tr: "Yağmur bekliyoruz.", note: "rechnen mit + Dativ" },
        ],
      },
      {
        heading: "Şey ise da-, soru ise wo-",
        tr: "Nesne bir NESNE ise „auf es“ denmez, edat „da-“ ile birleşir: darauf, darüber, daran, damit, davon. Soruda ise „auf was“ yerine „worauf“ kullanılır. Edat ünlüyle başlıyorsa araya bir -r- girer.",
        examples: [
          { de: "Worauf wartest du? — Auf den Bus. Darauf warte ich seit zehn Minuten.", tr: "Neyi bekliyorsun? Otobüsü. On dakikadır onu bekliyorum." },
          { de: "Woran denkst du?", tr: "Ne düşünüyorsun?", note: "an → woran" },
          { de: "Womit rechnest du?", tr: "Neyi hesaba katıyorsun?", note: "mit → womit" },
        ],
      },
      {
        heading: "İnsan ise normal zamir",
        tr: "Nesne bir KİŞİ ise da-/wo- bileşiği kullanılmaz: „auf ihn“, „mit ihr“, „an wen“. Ayrıca da- bileşiği arkadan gelecek bir „dass“ cümlesini ya da mastarı önceden duyurabilir.",
        examples: [
          { de: "Ich warte auf ihn.", tr: "Onu bekliyorum.", note: "kişi → auf ihn" },
          { de: "Ich rechne damit, dass es regnet.", tr: "Yağmur yağacağını hesaba katıyorum.", note: "damit ileriyi işaret eder" },
          { de: "Ich freue mich darauf, dich zu sehen.", tr: "Seni görmeyi dört gözle bekliyorum." },
        ],
      },
    ],
    questions: [
      {
        text: "Ich warte ___ den Bus.",
        options: ["auf", "für", "an"],
        answer: 0,
        explain: "„warten“ sabit edatı „auf“tur ve Akkusativ ister.",
      },
      {
        text: "___ wartest du?",
        options: ["Worauf", "Auf was", "Wovon"],
        answer: 0,
        explain: "Nesne bir şey olduğunda soru wo- bileşiğiyle kurulur; „auf was“ yalnız günlük konuşmada duyulur.",
      },
      {
        text: "Ich interessiere mich sehr ___ alte Fotos.",
        options: ["für", "an", "über"],
        answer: 0,
        explain: "„sich interessieren“ edatı „für“dür.",
      },
      {
        kind: "gapfill",
        text: "Ich freue mich ___ das Wochenende.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "Gelecekteki bir şey için „sich freuen auf“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Wir rechnen ___, dass es regnet.",
        options: [],
        answer: 0,
        accept: ["damit"],
        explain: "Arkadan „dass“ cümlesi geliyor; edat önce da- bileşiği olarak duyurulur: damit.",
      },
      {
        kind: "gapfill",
        text: "___ denkst du gerade? (denken an)",
        options: [],
        answer: 0,
        accept: ["Woran", "woran"],
        explain: "„an“ ünlüyle başladığı için araya -r- girer: woran.",
      },
      {
        kind: "gapfill",
        text: "Er hat mich ___ Hilfe gebeten.",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "„bitten“ sabit edatı „um“dur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "kümmere", "mich", "darum"],
        explain: "Dönüşlü zamir fiilden hemen sonra, da-bileşiği sonda: Ich kümmere mich darum.",
      },
      {
        kind: "truefalse",
        text: "„Ich freue mich auf es.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Nesne bir şey olduğunda edat zamirle birleşmez; doğrusu „Ich freue mich darauf.“",
      },
      {
        kind: "truefalse",
        text: "„Ich warte auf ihn.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Nesne bir kişi olduğu için normal zamir kullanılır; „darauf“ burada yanlış olurdu.",
      },
    ],
  },
];

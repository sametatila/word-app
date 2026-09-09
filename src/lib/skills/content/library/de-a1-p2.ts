import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 1'den farkı metin TÜRÜ: orada kayıp ilanı, postane diyaloğu ve
 * kartpostal vardı; burada haftalık program, telesekreter mesajı ve küçük
 * ilan var. Söyleyiş odağı ei/ie değil „z“ = ts; dil bilgisi Akkusativ değil
 * Präsens çekimi ve kök değişen fiiller.
 */
export const deA1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r2",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Ferienprogramm im Jugendhaus",
    genre: "Program",
    intro: "Bir gençlik evinin tatil programını okuyacaksın: hangi gün ne var, ne kadar tutuyor, nasıl kayıt yapılıyor.",
    gloss: [
      { de: "das Grillfest", tr: "mangal partisi", en: "barbecue party" },
      { de: "basteln", tr: "el işi yapmak", en: "to make crafts" },
      { de: "kostenlos", tr: "ücretsiz", en: "free of charge" },
      { de: "der Helm", tr: "kask", en: "helmet" },
      { de: "die Fahrradtour", tr: "bisiklet turu", en: "bike ride" },
      { de: "die Anmeldung", tr: "kayıt", en: "registration" },
    ],
    minutes: 4,
    text:
      "FERIENPROGRAMM — JUGENDHAUS AM PARK\nErste Ferienwoche\n\n" +
      "Montag: Wir backen Pizza. Von zehn bis zwei Uhr.\n" +
      "Dienstag: Fahrradtour zum See. Start um neun Uhr vor dem Haus. Bitte einen Helm mitbringen!\n" +
      "Mittwoch: Wir basteln Lampen aus Papier.\n" +
      "Donnerstag: Kinotag. Die Gruppe wählt den Film zusammen.\n" +
      "Freitag: Grillfest im Garten. Eltern und Geschwister sind auch willkommen.\n\n" +
      "Alle Tage sind kostenlos. Nur die Fahrradtour kostet drei Euro.\n\n" +
      "Anmeldung bis Freitag im Büro oder am Telefon: 030 44 12 09. " +
      "Das Jugendhaus ist von neun bis achtzehn Uhr offen.",
    questions: [
      {
        text: "Was ist das für ein Text?",
        options: ["ein Programm für die Ferien", "eine Einladung zum Geburtstag", "eine Anzeige für ein Fahrrad"],
        answer: 0,
        explain: "Başlık „Ferienprogramm“ ve altında beş gün sıralanıyor — bu bir tatil programı, davet ya da ilan değil.",
      },
      {
        text: "Wann beginnt die Fahrradtour?",
        options: ["um neun Uhr", "um zehn Uhr", "um zwei Uhr"],
        answer: 0,
        explain: "„Start um neun Uhr vor dem Haus.“ Saat on ile iki pazartesi pizzanın saatleri.",
      },
      {
        kind: "truefalse",
        text: "Alle Tage kosten drei Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Alle Tage sind kostenlos. Nur die Fahrradtour kostet drei Euro.“ — para yalnız bir gün için.",
      },
      {
        kind: "gapfill",
        text: "Am Mittwoch basteln die Kinder Lampen aus ___.",
        options: [],
        answer: 0,
        accept: ["Papier"],
        explain: "„Mittwoch: Wir basteln Lampen aus Papier.“",
      },
      {
        kind: "short_answer",
        text: "Wer darf am Freitag auch kommen?",
        options: [],
        answer: 0,
        accept: ["Eltern und Geschwister", "die Eltern und die Geschwister", "Eltern und Geschwister sind willkommen"],
        explain: "„Freitag: Grillfest im Garten. Eltern und Geschwister sind auch willkommen.“",
      },
      {
        text: "Wie meldet man sich an?",
        options: ["im Büro oder am Telefon", "mit einer E-Mail an das Haus", "am Montag direkt im Garten"],
        answer: 0,
        explain: "„Anmeldung bis Freitag im Büro oder am Telefon“ — e-posta ya da bahçe geçmiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l2",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Eine Nachricht von Jonas",
    genre: "Sesli mesaj",
    intro: "Jonas telesekretere mesaj bırakıyor: anahtar nerede, köpeğe ne zaman bakılacak, sorun olursa ne yapılacak.",
    gloss: [
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "der Eingang", tr: "giriş", en: "entrance" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "das Futter", tr: "mama", en: "pet food" },
      { de: "der Kühlschrank", tr: "buzdolabı", en: "fridge" },
      { de: "lieb", tr: "uysal", en: "gentle" },
    ],
    minutes: 4,
    segments: [
      { text: "Hallo Tarek, hier ist Jonas. Ich bin heute nicht zu Hause. Meine Schwester ist krank und ich fahre zu ihr." },
      { text: "Der Schlüssel für meine Wohnung liegt bei Frau Berger. Sie wohnt unten, links neben dem Eingang." },
      { text: "Bitte hol den Schlüssel nach vier Uhr ab. Vorher arbeitet Frau Berger noch." },
      { text: "Mein Hund heißt Rocco. Er bekommt um sechs Uhr sein Futter. Das Futter steht in der Küche, neben dem Kühlschrank." },
      { text: "Bitte geh mit ihm eine halbe Stunde in den Park. Er ist lieb, aber er läuft gern schnell." },
      { text: "Bei Problemen ruf mich bitte an. Danke dir und bis morgen!" },
    ],
    questions: [
      {
        text: "Warum ruft Jonas an?",
        options: ["Er ist nicht da und braucht Hilfe.", "Er lädt Tarek zum Essen ein.", "Er sucht seinen Hund im Park."],
        answer: 0,
        explain: "„Ich bin heute nicht zu Hause“ — sonra da anahtar ve köpek için ricalar geliyor.",
      },
      {
        text: "Wo liegt der Schlüssel?",
        options: ["bei Frau Berger unten", "in der Küche von Jonas", "im Park neben dem Eingang"],
        answer: 0,
        explain: "„Der Schlüssel … liegt bei Frau Berger. Sie wohnt unten, links neben dem Eingang.“",
      },
      {
        kind: "truefalse",
        text: "Tarek soll den Schlüssel am Morgen abholen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Bitte hol den Schlüssel nach vier Uhr ab“ — sabah değil, saat dörtten sonra.",
      },
      {
        kind: "short_answer",
        text: "Wann bekommt Rocco sein Futter?",
        options: [],
        answer: 0,
        accept: ["um sechs Uhr", "sechs Uhr", "um 6 Uhr", "um sechs"],
        explain: "„Er bekommt um sechs Uhr sein Futter.“",
      },
      {
        kind: "dictation",
        text: "Jonas anahtarla ilgili ricasını söylüyor: cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Bitte hol den Schlüssel nach vier Uhr ab.", "Bitte hol den Schlüssel nach vier Uhr ab"],
        explain: "„Bitte hol den Schlüssel nach vier Uhr ab.“ — ayrılabilen fiilde „ab“ cümlenin sonuna gider.",
      },
      {
        text: "Was soll Tarek mit dem Hund machen?",
        options: [
          "eine halbe Stunde in den Park gehen",
          "ihn zu Frau Berger nach unten bringen",
          "ihn um vier Uhr im Garten suchen",
        ],
        answer: 0,
        explain: "„Bitte geh mit ihm eine halbe Stunde in den Park.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w2",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Schreibtisch zu verkaufen",
    genre: "Küçük ilan",
    intro: "Odanı boşaltıyorsun; önce iki cümle kur, sonra bir eşyanı satmak için kısa bir ilan yaz.",
    gloss: [
      { de: "verkaufen", tr: "satmak", en: "to sell" },
      { de: "die Ecke", tr: "köşe", en: "corner" },
      { de: "der Preis", tr: "fiyat", en: "price" },
      { de: "kaputt", tr: "bozuk", en: "broken" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Masa iki yaşında ve hâlâ çok iyi.",
        answer: "Der Tisch ist zwei Jahre alt und noch sehr gut.",
        alternatives: ["Der Tisch ist noch sehr gut und zwei Jahre alt."],
        hint: "Yaş için kalıp „ist … Jahre alt“; sıfatlar (gut) yüklemde çekimsiz kalır.",
      },
      {
        kind: "build",
        tr: "Onu cumartesi günü gelip alabilirsin.",
        answer: "Du kannst ihn am Samstag abholen.",
        alternatives: ["Am Samstag kannst du ihn abholen."],
        hint: "Modal fiil (kannst) ikinci sırada durur, asıl fiil (abholen) yalın hâlde cümlenin SONUNA gider.",
      },
      {
        kind: "free",
        prompt:
          "Odanı boşaltıyorsun. Bir eşyanı satmak için küçük bir ilan yaz: ne satıyorsun, nasıl görünüyor, kaç yaşında, ne kadar istiyorsun, alıcı onu ne zaman ve nereden alabilir.",
        checklist: [
          "Ne sattığını ve nasıl göründüğünü yaz",
          "Kaç yaşında olduğunu ve durumunu söyle",
          "Fiyatı yaz",
          "Ne zaman ve nereden alınacağını söyle",
        ],
        minWords: 25,
        phrases: [
          { de: "Ich verkaufe …", tr: "… satıyorum" },
          { de: "Er ist … Jahre alt.", tr: "… yaşında." },
          { de: "Der Preis ist … Euro.", tr: "Fiyatı … Euro." },
          { de: "Du kannst ihn … abholen.", tr: "Onu … gelip alabilirsin." },
          { de: "Bitte schreib mir eine Nachricht!", tr: "Lütfen bana mesaj yaz!" },
        ],
        sample:
          "Ich verkaufe meinen Schreibtisch. Er ist braun und sehr groß. Der Tisch ist drei Jahre alt und noch sehr gut. " +
          "Nur eine kleine Ecke ist kaputt. Der Preis ist vierzig Euro. Du kannst ihn am Samstag von zehn bis achtzehn Uhr abholen. " +
          "Ich wohne in der Ahornstraße acht. Bitte schreib mir eine Nachricht!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s2",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "z ist ts",
    genre: "Ses çalışması",
    intro: "Almancada „z“ harfi hep „ts“ okunur, Türkçedeki z sesi gibi değil; yedi cümlede bunu ve „tz“ birleşimini çalış.",
    gloss: [
      { de: "der Zucker", tr: "şeker", en: "sugar" },
      { de: "zuerst", tr: "önce", en: "first" },
      { de: "zusammen", tr: "birlikte", en: "together" },
      { de: "der Zahnarzt", tr: "diş hekimi", en: "dentist" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Zehn Minuten, dann bin ich da.",
        tr: "On dakika, sonra oradayım.",
        hint: "„zehn“ = TSEEN. Önce t, hemen ardından s; tek ses gibi hızlı söyle.",
        confusions: [
          { heard: ["sehn", "sehen", "zen"], fix: "„z“ Türkçedeki z değil: dilin ucuyla önce t, sonra s — tseen.", expected: "zehn" },
        ],
      },
      {
        de: "Mein Zimmer ist leider zu klein.",
        tr: "Odam maalesef fazla küçük.",
        hint: "„Zimmer“ = TSİ-mer, „zu“ = TSU. İki kelimede de baştaki ses ts.",
        confusions: [
          { heard: ["Simmer", "Sie mir", "su klein"], fix: "Baştaki z'yi s gibi söyleme; ts ile başla: tsimer, tsu.", expected: "Zimmer" },
        ],
      },
      {
        de: "Der Zug fährt um zwölf Uhr.",
        tr: "Tren saat on ikide kalkıyor.",
        hint: "„Zug“ = TSUUK, „zwölf“ = TSVÖLF — z'den sonra gelen w, v gibi okunur.",
        confusions: [
          { heard: ["Sug", "Suk", "swölf"], fix: "„Zug“ ve „zwölf“ ts ile başlar; „zw“ ise ts+v: tsvölf.", expected: "Zug" },
        ],
      },
      {
        de: "Wir sitzen zusammen im Garten.",
        tr: "Bahçede birlikte oturuyoruz.",
        hint: "„tz“ de ts okunur: Zİ-tsen. „zusammen“ = tsu-ZA-men, vurgu ortada.",
        confusions: [
          { heard: ["sitsen", "sizen", "susammen"], fix: "„sitzen“ ortasındaki tz tek bir ts sesi; „zusammen“ baştan ts ile başlar.", expected: "sitzen" },
        ],
      },
      {
        de: "Wie viel Zucker nimmst du?",
        tr: "Ne kadar şeker alıyorsun?",
        hint: "„Zucker“ = TSU-ker, ortadaki ck sert k. Sonu -er hafif „a“ gibi duyulur.",
        confusions: [
          { heard: ["Sucker", "Sugar", "Zuker"], fix: "Baştaki ses ts; İngilizce „sugar“ gibi okuma: tsuka.", expected: "Zucker" },
        ],
      },
      {
        de: "Zuerst trinke ich einen Tee.",
        tr: "Önce bir çay içiyorum.",
        hint: "„zuerst“ = tsu-ERST, iki heceli ve vurgu ikinci hecede.",
        confusions: [
          { heard: ["Suerst", "zurst", "erst"], fix: "Baştaki ts'yi söyle ve iki heceyi ayır: tsu-erst.", expected: "zuerst" },
        ],
      },
      {
        de: "Wir gehen morgen zum Zahnarzt.",
        tr: "Yarın diş hekimine gidiyoruz.",
        hint: "Üç kez ts: „zum“, „Zahn-“ ve „-arzt“ sonundaki z.",
        confusions: [
          { heard: ["sum Sahnarzt", "Zahnarst", "Sahnarzt"], fix: "Hem baştaki z hem sondaki z ts okunur: tsum TSAAN-artst.", expected: "Zahnarzt" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g2",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "fährst du oder fahrst du?",
    genre: "Kural",
    intro: "Geniş zamanda fiilin nasıl çekildiğini ve bazı fiillerin kökünün neden değiştiğini öğren.",
    focus: "Präsens: fiil çekimi ve düzensiz kök (fahren → du fährst)",
    gloss: [
      { de: "sprechen", tr: "konuşmak", en: "to speak" },
      { de: "fahren", tr: "gitmek", en: "to go by vehicle" },
      { de: "nehmen", tr: "almak", en: "to take" },
      { de: "schlafen", tr: "uyumak", en: "to sleep" },
      { de: "arbeiten", tr: "çalışmak", en: "to work" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Ek nereye geliyor?",
        tr: "Türkçede kişi ekini fiilin sonuna ekliyorsun: gel-iyor-um, gel-iyor-sun. Almancada da aynı yere gelir ama ek altı kişiye göre değişir: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
        examples: [
          { de: "Ich lerne Deutsch.", tr: "Almanca öğreniyorum.", note: "lern + e" },
          { de: "Du lernst schnell.", tr: "Hızlı öğreniyorsun.", note: "lern + st" },
          { de: "Wir lernen zusammen.", tr: "Birlikte öğreniyoruz.", note: "lern + en" },
        ],
      },
      {
        heading: "Kök değişen fiiller",
        tr: "Bazı fiillerde kökteki ünlü YALNIZ du ve er/sie/es biçiminde değişir: a → ä (fahren, schlafen), e → i/ie (sprechen, nehmen, lesen, sehen). Öteki kişilerde kök aynı kalır.",
        examples: [
          { de: "Du fährst nach Hause.", tr: "Eve gidiyorsun.", note: "fahren → du fährst" },
          { de: "Er spricht drei Sprachen.", tr: "Üç dil konuşuyor.", note: "sprechen → er spricht" },
          { de: "Wir fahren nach Hause.", tr: "Eve gidiyoruz.", note: "wir'de kök değişmez" },
        ],
      },
      {
        heading: "İki tuzak",
        tr: "Kökü -t ya da -d ile biten fiiller telaffuz için araya bir e alır: du arbeitest, er arbeitet. „nehmen“ ise kökü de kısaltır: du nimmst, er nimmt.",
        examples: [
          { de: "Du arbeitest zu viel.", tr: "Çok çalışıyorsun.", note: "arbeit + e + st" },
          { de: "Er nimmt den Bus.", tr: "Otobüse biniyor.", note: "nehmen → nimmt" },
        ],
      },
    ],
    questions: [
      {
        text: "Du ___ sehr schnell.",
        options: ["sprichst", "sprechst", "spricht"],
        answer: 0,
        explain: "„sprechen“ kök değiştirir: du biçiminde e → i, yani sprichst.",
      },
      {
        text: "Er ___ heute nach Berlin.",
        options: ["fährt", "fahrt", "fahren"],
        answer: 0,
        explain: "„fahren“ üçüncü tekilde a → ä alır: er fährt.",
      },
      {
        text: "Ihr ___ zu viel Kuchen.",
        options: ["esst", "isst", "essen"],
        answer: 0,
        explain: "Kök değişimi yalnız du ve er/sie/es'te olur; ihr biçimi düzenli kalır: esst.",
      },
      {
        kind: "gapfill",
        text: "Du ___ (lesen) ein Buch.",
        options: [],
        answer: 0,
        accept: ["liest"],
        explain: "„lesen“ du biçiminde e → ie olur ve kök zaten s ile bittiği için tek t kalır: liest.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ (fahren) morgen nach Hause.",
        options: [],
        answer: 0,
        accept: ["fahren"],
        explain: "wir biçiminde kök değişmez ve ek -en'dir: wir fahren.",
      },
      {
        kind: "gapfill",
        text: "Anna ___ (arbeiten) bei einer Bank.",
        options: [],
        answer: 0,
        accept: ["arbeitet"],
        explain: "Kökü -t ile biten fiil araya e alır: arbeit + e + t.",
      },
      {
        kind: "gapfill",
        text: "Er ___ (nehmen) den Bus.",
        options: [],
        answer: 0,
        accept: ["nimmt"],
        explain: "„nehmen“ üçüncü tekilde hem ünlüsünü hem kökünü değiştirir: nimmt.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wo", "schläfst", "du", "heute"],
        explain: "W-sorusunda fiil ikinci sırada durur ve du biçiminde a → ä olur: Wo schläfst du heute?",
      },
      {
        kind: "truefalse",
        text: "„Du gebst mir das Buch.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„geben“ du biçiminde e → i alır; doğrusu „Du gibst mir das Buch.“",
      },
      {
        kind: "truefalse",
        text: "„Wir sprechen kein Englisch.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "wir biçiminde kök değişmez ve ek -en'dir; cümle doğru.",
      },
    ],
  },
];

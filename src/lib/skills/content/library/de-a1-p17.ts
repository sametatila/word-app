import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 17.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. İletişim ve arkadaşlık hattı:
 * dil değişimi için tandem ilanı, telefon dükkânında SIM kart, forumda koşu
 * arkadaşı arayan ilan. Söyleyiş odağı au çift ünlüsü; dil bilgisi üçüncü
 * kişi iyeliği — sein mi ihr mi.
 */
export const deA1P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r17",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Tandem: Deutsch und Spanisch",
    genre: "ad",
    intro: "Bir üniversite panosunda dil değişimi ilanı asılı: kim yazmış, ne arıyor, ne zaman vakti var.",
    gloss: [
      { de: "das Tandem", tr: "dil değişimi", en: "language exchange" },
      { de: "der Koch", tr: "aşçı", en: "cook" },
      { de: "schwer", tr: "zor", en: "difficult" },
      { de: "treffen", tr: "buluşmak", en: "to meet" },
      { de: "spazieren", tr: "yürüyüş yapmak", en: "to stroll" },
      { de: "das Hobby", tr: "hobi", en: "hobby" },
    ],
    minutes: 4,
    text:
      "TANDEM: DEUTSCH UND SPANISCH\n\n" +
      "Hallo! Ich heiße Carlos, bin achtundzwanzig Jahre alt und komme aus Valencia in Spanien. " +
      "Seit März wohne ich in Leipzig und arbeite als Koch in einem Hotel.\n\n" +
      "Ich lerne seit vier Monaten Deutsch. Lesen geht schon gut, aber Sprechen ist noch schwer für mich. " +
      "Ich suche eine Partnerin oder einen Partner für ein Tandem: Wir sprechen eine Stunde Deutsch und eine Stunde Spanisch.\n\n" +
      "Am Montag und am Mittwoch habe ich frei. Wir können uns in einem Café treffen oder zusammen spazieren gehen. " +
      "Am Wochenende arbeite ich leider immer.\n\n" +
      "Meine Hobbys sind Fußball, Kochen und Filme.\n\n" +
      "Schreib mir einfach eine E-Mail!",
    questions: [
      {
        text: "Was sucht Carlos?",
        options: ["eine Wohnung in Leipzig", "eine Arbeit in einem Hotel", "einen Partner für Deutsch und Spanisch"],
        answer: 2,
        explain: "Leipzig'de oturuyor ve işi zaten var; „Ich suche eine Partnerin oder einen Partner für ein Tandem“.",
      },
      {
        text: "Was ist für Carlos noch schwer?",
        options: ["Sprechen", "Lesen", "Kochen"],
        answer: 0,
        explain: "„Lesen geht schon gut, aber Sprechen ist noch schwer für mich.“",
      },
      {
        kind: "truefalse",
        text: "Carlos hat am Wochenende Zeit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am Wochenende arbeite ich leider immer“; boş günleri pazartesi ve çarşamba.",
      },
      {
        kind: "gapfill",
        text: "Carlos lernt seit ___ Monaten Deutsch.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„Ich lerne seit vier Monaten Deutsch.“",
      },
      {
        kind: "short_answer",
        text: "Was ist Carlos von Beruf?",
        options: [],
        answer: 0,
        accept: ["Koch", "er ist Koch", "Koch in einem Hotel"],
        explain: "„arbeite als Koch in einem Hotel“.",
      },
      {
        text: "Wo möchte Carlos seinen Partner treffen?",
        options: ["in der Küche von seinem Hotel", "im Café oder beim Spazierengehen", "in einer Sprachschule in Leipzig"],
        answer: 1,
        explain: "„Wir können uns in einem Café treffen oder zusammen spazieren gehen.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l17",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Eine SIM-Karte, bitte",
    genre: "dialogue",
    intro: "Almanya'ya yeni gelen bir adam telefon dükkânında SIM kart alıyor: hangi paket, ne kadar, ne zaman çalışacak.",
    gloss: [
      { de: "das Handy", tr: "cep telefonu", en: "cell phone" },
      { de: "das Angebot", tr: "teklif", en: "offer" },
      { de: "das Internet", tr: "internet", en: "internet" },
      { de: "der Pass", tr: "pasaport", en: "passport" },
      { de: "die Nummer", tr: "numara", en: "number" },
      { de: "die SMS", tr: "kısa mesaj", en: "text message" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Lange", text: "Guten Tag! Kann ich Ihnen helfen?" },
      { speaker: "Herr Novak", text: "Ja, bitte. Ich bin neu in Deutschland und brauche eine SIM-Karte für mein Handy." },
      { speaker: "Frau Lange", text: "Gern. Wir haben zwei Angebote: mit wenig Internet für sieben Euro im Monat oder mit viel Internet für zwölf Euro." },
      { speaker: "Herr Novak", text: "Ich telefoniere oft mit meiner Familie im Internet. Ich nehme das Angebot für zwölf Euro." },
      { speaker: "Frau Lange", text: "Gut. Haben Sie Ihren Pass oder Ihren Ausweis dabei?" },
      { speaker: "Herr Novak", text: "Hier ist mein Pass. Kann ich heute schon telefonieren?" },
      { speaker: "Frau Lange", text: "Die Karte funktioniert in ungefähr einer Stunde. Dann bekommen Sie eine SMS mit Ihrer neuen Nummer." },
      { speaker: "Herr Novak", text: "Und wie bezahle ich jeden Monat?" },
      { speaker: "Frau Lange", text: "Sie bezahlen jeden Monat im Internet oder hier im Laden. Das ist ganz einfach." },
    ],
    questions: [
      {
        text: "Was braucht Herr Novak?",
        options: ["ein neues Handy", "eine SIM-Karte", "einen neuen Pass"],
        answer: 1,
        explain: "„Ich … brauche eine SIM-Karte für mein Handy.“",
      },
      {
        text: "Wie viel bezahlt er im Monat?",
        options: ["sieben Euro", "neunzehn Euro", "zwölf Euro"],
        answer: 2,
        explain: "Ailesiyle internetten çok konuştuğu için „das Angebot für zwölf Euro“ alıyor.",
      },
      {
        kind: "truefalse",
        text: "Herr Novak kann sofort telefonieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Die Karte funktioniert in ungefähr einer Stunde“ — hemen değil, yaklaşık bir saat sonra.",
      },
      {
        kind: "gapfill",
        text: "Die Karte funktioniert in ungefähr einer ___.",
        options: [],
        answer: 0,
        accept: ["Stunde"],
        explain: "„Die Karte funktioniert in ungefähr einer Stunde.“",
      },
      {
        kind: "short_answer",
        text: "Was zeigt Herr Novak der Verkäuferin?",
        options: [],
        answer: 0,
        accept: ["seinen Pass", "den Pass", "Pass"],
        explain: "„Hier ist mein Pass.“",
      },
      {
        text: "Wie bekommt er seine neue Nummer?",
        options: ["mit einer SMS", "auf einem Papier", "in einer E-Mail"],
        answer: 0,
        explain: "„Dann bekommen Sie eine SMS mit Ihrer neuen Nummer.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w17",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Wer läuft mit mir?",
    genre: "forum",
    intro: "Mahalle forumunda birlikte koşacak birini arıyorsun: önce iki cümle kur, sonra kısa bir ilan yaz.",
    gloss: [
      { de: "laufen", tr: "koşmak", en: "to run" },
      { de: "allein", tr: "yalnız", en: "alone" },
      { de: "die Lust", tr: "istek", en: "desire" },
      { de: "jemand", tr: "biri", en: "someone" },
      { de: "langweilig", tr: "sıkıcı", en: "boring" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Haftada üç kez parkta koşuyorum.",
        answer: "Ich laufe dreimal pro Woche im Park.",
        alternatives: ["Dreimal pro Woche laufe ich im Park."],
        hint: "Sıklık ifadesi başa gelince fiil ikinci sırada kalır ve özne arkasına geçer.",
      },
      {
        kind: "build",
        tr: "Sabahları saat yedide koşmak istiyorum.",
        answer: "Ich möchte morgens um sieben Uhr laufen.",
        alternatives: ["Morgens um sieben Uhr möchte ich laufen."],
        hint: "„möchte“ ikinci sırada, asıl fiil „laufen“ cümlenin sonunda.",
      },
      {
        kind: "free",
        prompt:
          "Forum için kısa bir ilan yaz: kendini tanıt, ne zaman ve nerede koştuğunu söyle, ne kadar ve ne hızla koştuğunu yaz ve nasıl ulaşılacağını söyle.",
        checklist: [
          "Kendini kısaca tanıt",
          "Ne zaman ve nerede koştuğunu yaz",
          "Ne kadar ve ne hızla koştuğunu söyle",
          "Nasıl ulaşılacağını yaz",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich suche jemanden zum Laufen.", tr: "Birlikte koşacak birini arıyorum.", en: "I'm looking for someone to run with." },
          { de: "Ich laufe … pro Woche.", tr: "Haftada … koşuyorum.", en: "I run … a week." },
          { de: "Allein ist es langweilig.", tr: "Yalnız sıkıcı oluyor.", en: "It's boring alone." },
          { de: "Hast du Lust?", tr: "Canın ister mi?", en: "Do you feel like it?" },
          { de: "Schreib mir eine Nachricht!", tr: "Bana mesaj yaz!", en: "Send me a message!" },
        ],
        sample:
          "Hallo, ich heiße Emre und bin einunddreißig Jahre alt. Ich suche jemanden zum Laufen. " +
          "Ich laufe dreimal pro Woche im Stadtpark, am Montag, am Mittwoch und am Freitag. " +
          "Ich möchte morgens um sieben Uhr laufen, vor der Arbeit. Ich laufe ungefähr dreißig Minuten, nicht sehr schnell. " +
          "Allein ist es oft langweilig. Hast du Lust? Schreib mir eine Nachricht!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s17",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "au wie in Haus",
    genre: "pronounce",
    intro: "Almanca „au“ tek hecede kayan bir sestir: a'dan u'ya geçer. Ne ayrı ayrı a-u ne de „av“ ya da „o“ okunur; altı cümlede çalış.",
    gloss: [
      { de: "die Frau", tr: "kadın", en: "woman" },
      { de: "kaufen", tr: "satın almak", en: "to buy" },
      { de: "blau", tr: "mavi", en: "blue" },
      { de: "laufen", tr: "koşmak", en: "to run" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Die Frau wohnt in einem kleinen Haus.",
        tr: "Kadın küçük bir evde oturuyor.",
        hint: "„Frau“ FRAU, „Haus“ HAUS: a ile başla, u'ya kay, tek hece.",
        confusions: [
          {
            heard: [],
            fix: "au'yu iki hece yapma ve sona v ekleme: FRAV değil, FRAU.",
            expected: "Frau",
          },
        ],
      },
      {
        de: "Ich komme auch mit.",
        tr: "Ben de geliyorum.",
        hint: "„auch“ = AUH: au'dan sonra sert ch.",
        confusions: [
          {
            heard: ["ach"],
            fix: "au kısalıp a olursa „ach“ duyulur; u'ya kadar kay.",
            expected: "auch",
          },
        ],
      },
      {
        de: "Wir kaufen heute ein blaues Auto.",
        tr: "Bugün mavi bir araba alıyoruz.",
        hint: "„kaufen“ KAU-fen, „blaues“ BLAU-es, „Auto“ AU-to: üçünde de aynı kayan ses.",
        confusions: [
          {
            heard: [],
            fix: "„blaues“ içinde au ile e arasına v ya da y ekleme: BLAU-es.",
            expected: "blaues",
          },
        ],
      },
      {
        de: "Die Frauen bauen einen Tisch.",
        tr: "Kadınlar bir masa yapıyor.",
        hint: "„Frauen“ FRAU-en, „bauen“ BAU-en: au'dan sonra ünlü gelse de araya v girmez.",
        confusions: [
          {
            heard: [],
            fix: "„Fraven, baven“ deme; au biter, e ayrı başlar.",
            expected: "bauen",
          },
        ],
      },
      {
        de: "Am Sonntag laufe ich im Park.",
        tr: "Pazar günü parkta koşuyorum.",
        hint: "„laufe“ = LAU-fe: au kayar, f ondan sonra gelir.",
        confusions: [
          {
            heard: [],
            fix: "au'yu o gibi söyleme; ağız a için açılır, u için yuvarlanır.",
            expected: "laufe",
          },
        ],
      },
      {
        de: "Draußen ist es schon dunkel, schau mal!",
        tr: "Dışarısı çoktan karardı, bak!",
        hint: "„draußen“ DRAU-sen, „schau“ ŞAU: au her yerde aynı.",
        confusions: [
          {
            heard: [],
            fix: "„schau“ tek hece: ŞAU. Sona v ya da ekstra ünlü ekleme.",
            expected: "schau",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g17",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "sein Bruder, ihr Bruder",
    genre: "grammar",
    intro: "Türkçede „onun“ tek kelimedir; Almancada sahibin kim olduğu sein mi ihr mi olacağını seçer, sahip olunan isim de sondaki eki.",
    focus: "Üçüncü kişi iyeliği: sein ya da ihr — kökü sahip, eki isim belirler",
    gloss: [
      { de: "der Bruder", tr: "erkek kardeş", en: "brother" },
      { de: "die Schwester", tr: "kız kardeş", en: "sister" },
      { de: "der Sohn", tr: "oğul", en: "son" },
      { de: "der Ball", tr: "top", en: "ball" },
      { de: "der Nachbar", tr: "komşu", en: "neighbor" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Sahip seçer: sein ya da ihr",
        tr: "Türkçede „onun kardeşi“ derken sahibin kadın mı erkek mi olduğu anlaşılmaz. Almancada sahip erkekse ya da nötrse „sein“, kadınsa „ihr“ kullanılır. Sahip birden çoksa, yani „onların“ diyorsan, yine „ihr“ gelir.",
        examples: [
          { de: "Tom und sein Bruder spielen Fußball.", tr: "Tom ve erkek kardeşi futbol oynuyor.", note: "sahip Tom → sein" },
          { de: "Anna und ihr Bruder spielen Fußball.", tr: "Anna ve erkek kardeşi futbol oynuyor.", note: "sahip Anna → ihr" },
          { de: "Die Kinder suchen ihren Ball.", tr: "Çocuklar toplarını arıyor.", note: "sahip çoğul → ihr" },
        ],
      },
      {
        heading: "Ek isimden gelir",
        tr: "Kökü sahip seçer, sondaki eki ise sahip olunan isim belirler — tıpkı mein, meine, meinen gibi. Dişil ve çoğul isimde -e gelir; eril isim nesne olunca -en gelir.",
        examples: [
          { de: "Er ruft seine Mutter an.", tr: "Annesini arıyor.", note: "sahip er → sein, die Mutter → -e" },
          { de: "Sie besucht ihren Vater.", tr: "Babasını ziyaret ediyor.", note: "sahip sie → ihr, der Vater nesne → -en" },
          { de: "Das Kind sucht sein Buch.", tr: "Çocuk kitabını arıyor.", note: "sahip das Kind → sein, das Buch → ek yok" },
        ],
      },
      {
        heading: "Üç ayrı ihr",
        tr: "„ihr“ üç şey olabilir: kadının iyeliği, çoğulun iyeliği ve „siz“ zamiri. Önünde ya da arkasında bir isim duruyorsa iyeliktir; fiilin öznesiyse zamirdir.",
        examples: [
          { de: "Frau Berg sucht ihren Schlüssel.", tr: "Bayan Berg anahtarını arıyor.", note: "kadının iyeliği" },
          { de: "Unsere Nachbarn verkaufen ihr Auto.", tr: "Komşularımız arabalarını satıyor.", note: "çoğulun iyeliği" },
          { de: "Kommt ihr morgen?", tr: "Yarın geliyor musunuz?", note: "zamir: siz" },
        ],
      },
    ],
    questions: [
      {
        text: "Lena ruft ___ Bruder an.",
        options: ["seinen", "ihren", "ihr"],
        answer: 1,
        explain: "Sahip Lena, yani ihr; „der Bruder“ nesne olduğu için -en: ihren.",
      },
      {
        text: "Herr Klein ist krank. ___ Frau kauft heute ein.",
        options: ["Seine", "Ihre", "Sein"],
        answer: 0,
        explain: "Sahip Herr Klein, yani sein; „die Frau“ dişil olduğu için seine.",
      },
      {
        text: "Die Kinder suchen ___ Ball.",
        options: ["seinen", "sein", "ihren"],
        answer: 2,
        explain: "Sahip çoğul (die Kinder), yani ihr; eril nesne „der Ball“ → ihren.",
      },
      {
        kind: "gapfill",
        text: "Paul liebt ___ Katze. (sein)",
        options: [],
        answer: 0,
        accept: ["seine"],
        explain: "„die Katze“ dişil; sein + e = seine.",
      },
      {
        kind: "gapfill",
        text: "Frau Demir besucht ___ Sohn. (ihr)",
        options: [],
        answer: 0,
        accept: ["ihren"],
        explain: "Eril „der Sohn“ nesne; ihr + en = ihren.",
      },
      {
        kind: "gapfill",
        text: "Das ist Tom und das ist ___ Schwester.",
        options: [],
        answer: 0,
        accept: ["seine"],
        explain: "Sahip Tom → sein; „die Schwester“ dişil → seine.",
      },
      {
        kind: "gapfill",
        text: "Unsere Nachbarn haben einen Hund. ___ Hund heißt Rex.",
        options: [],
        answer: 0,
        accept: ["Ihr"],
        explain: "Sahip çoğul (komşular) → ihr; „der Hund“ özne olduğu için ek yok: Ihr Hund.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Anna", "sucht", "ihren", "Schlüssel"],
        explain: "Fiil ikinci sırada; sahip Anna → ihr, eril nesne → ihren Schlüssel.",
      },
      {
        kind: "truefalse",
        text: "„Maria und sein Mann wohnen in Bonn.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Sahip Maria, bir kadın; doğrusu „Maria und ihr Mann“.",
      },
      {
        kind: "truefalse",
        text: "„Tim zeigt seine Fotos.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Sahip Tim → sein; çoğul „die Fotos“ → seine. Cümle doğru.",
      },
    ],
  },
];

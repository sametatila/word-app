import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 sağlık ve hareket hattı: mahalle gazetesinde spor haberi, belediye
 * dairesinde randevu, gürültü şikâyeti. Söyleyiş odağı sonda sertleşen b, d, g;
 * dil bilgisi A2'nin dönüm noktası — yan cümlede fiilin sona gitmesi.
 */
export const deA2P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r6",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Laufgruppe sucht neue Mitglieder",
    genre: "article",
    intro: "Mahalle gazetesinde küçük bir haber: kim koşuyor, ne zaman buluşuyorlar, yeni gelenler ne yapmalı.",
    gloss: [
      { de: "die Laufgruppe", tr: "koşu grubu", en: "running group" },
      { de: "das Mitglied", tr: "üye", en: "member" },
      { de: "der Anfänger", tr: "yeni başlayan", en: "beginner" },
      { de: "die Strecke", tr: "parkur", en: "route" },
      { de: "kostenlos", tr: "ücretsiz", en: "free of charge" },
      { de: "sich anmelden", tr: "kaydolmak", en: "to sign up" },
    ],
    minutes: 5,
    text:
      "Laufgruppe sucht neue Mitglieder\n\n" +
      "Seit drei Jahren trifft sich jeden Dienstag eine kleine Laufgruppe am Südpark. " +
      "Angefangen haben vier Nachbarn, heute sind es fast dreißig Leute.\n\n" +
      "„Wir laufen nicht schnell, wir laufen zusammen“, sagt Rita Kern, die die Gruppe gegründet hat. " +
      "„Bei uns ist niemand zu langsam. Wer nicht mehr kann, geht ein Stück und wartet auf die anderen.“\n\n" +
      "Es gibt zwei Strecken: drei Kilometer für Anfänger und acht Kilometer für alle, die schon länger dabei sind. " +
      "Nach dem Laufen sitzt die Gruppe oft noch eine halbe Stunde im Café gegenüber.\n\n" +
      "Das Training ist kostenlos, weil die Stadt den Park zur Verfügung stellt. " +
      "Wer mitlaufen möchte, muss sich nicht anmelden. Man kommt einfach am Dienstag um achtzehn Uhr zum Eingang Süd. " +
      "Nur bei starkem Regen fällt das Training aus. Eine Nachricht steht dann auf der Internetseite der Gruppe.",
    questions: [
      {
        text: "Wie hat die Gruppe angefangen?",
        options: ["mit dreißig Leuten", "mit vier Nachbarn", "mit einem Kurs der Stadt"],
        answer: 1,
        explain: "„Angefangen haben vier Nachbarn“ — otuz kişi bugünkü sayı.",
      },
      {
        text: "Was meint Rita Kern mit „Bei uns ist niemand zu langsam“?",
        options: [
          "Alle laufen gleich schnell.",
          "Langsame Leute dürfen nicht mitkommen.",
          "Auch wer nicht schnell ist, gehört dazu.",
        ],
        answer: 2,
        explain: "Devamı bunu açıklıyor: yorulan yürüyor ve ötekiler bekliyor.",
      },
      {
        kind: "truefalse",
        text: "Man muss sich vorher anmelden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Wer mitlaufen möchte, muss sich nicht anmelden“ — gelip katılmak yeterli.",
      },
      {
        kind: "gapfill",
        text: "Die kurze Strecke ist ___ Kilometer lang.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„drei Kilometer für Anfänger und acht Kilometer für alle, die schon länger dabei sind“.",
      },
      {
        kind: "short_answer",
        text: "Wer stellt der Gruppe den Park zur Verfügung?",
        options: [],
        answer: 0,
        accept: ["die Stadt", "Stadt"],
        explain: "„weil die Stadt den Park zur Verfügung stellt“ — gerekçe yan cümlede.",
      },
      {
        text: "Wann fällt das Training aus?",
        options: ["bei starkem Regen", "im Winter", "wenn Rita Kern keine Zeit hat"],
        answer: 0,
        explain: "„Nur bei starkem Regen fällt das Training aus“; duyuru internet sayfasında.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l6",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Termin beim Bürgeramt",
    genre: "dialogue",
    intro: "Biri belediyeye taşındığını bildirmek istiyor: hangi belge lazım, randevu ne zaman, ücret ne kadar.",
    gloss: [
      { de: "das Bürgeramt", tr: "nüfus müdürlüğü", en: "citizens' office" },
      { de: "ummelden", tr: "adres değişikliği bildirmek", en: "to register a change of address" },
      { de: "der Ausweis", tr: "kimlik", en: "identity card" },
      { de: "die Bestätigung", tr: "onay yazısı", en: "confirmation" },
      { de: "der Vermieter", tr: "ev sahibi", en: "landlord" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Kraus", text: "Bürgeramt Mitte, Kraus am Apparat. Was kann ich für Sie tun?" },
      { speaker: "Herr Bilgin", text: "Guten Tag. Ich bin letzte Woche umgezogen und möchte mich ummelden. Brauche ich dafür einen Termin?" },
      { speaker: "Frau Kraus", text: "Ja, ohne Termin geht es leider nicht. Der nächste freie Platz ist am Donnerstag um elf Uhr zwanzig." },
      { speaker: "Herr Bilgin", text: "Donnerstag passt gut. Was muss ich mitbringen?" },
      { speaker: "Frau Kraus", text: "Ihren Ausweis und die Bestätigung vom Vermieter. Ohne diese Bestätigung können wir die Ummeldung nicht machen." },
      { speaker: "Herr Bilgin", text: "Die habe ich schon bekommen. Kostet das etwas?" },
      { speaker: "Frau Kraus", text: "Die Ummeldung selbst ist kostenlos. Nur wenn Sie eine extra Bescheinigung möchten, kostet das fünf Euro Gebühr." },
      { speaker: "Herr Bilgin", text: "Gut, dann komme ich am Donnerstag. Muss ich früher da sein?" },
      { speaker: "Frau Kraus", text: "Kommen Sie bitte zehn Minuten vorher und ziehen Sie unten eine Nummer. Auf Wiederhören!" },
    ],
    questions: [
      {
        text: "Warum ruft Herr Bilgin an?",
        options: ["Er hat seinen Ausweis verloren.", "Er sucht eine neue Wohnung.", "Er ist umgezogen."],
        answer: 2,
        explain: "„Ich bin letzte Woche umgezogen und möchte mich ummelden.“",
      },
      {
        text: "Was braucht er unbedingt?",
        options: [
          "den Ausweis und die Bestätigung vom Vermieter",
          "nur den Ausweis",
          "einen Brief von der Bank",
        ],
        answer: 0,
        explain: "„Ohne diese Bestätigung können wir die Ummeldung nicht machen.“",
      },
      {
        kind: "truefalse",
        text: "Die Ummeldung kostet fünf Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Adres bildirimi ücretsiz; beş euro yalnız ayrıca belge isteyenler için.",
      },
      {
        kind: "gapfill",
        text: "Der Termin ist am Donnerstag um ___ Uhr zwanzig.",
        options: [],
        answer: 0,
        accept: ["elf", "11"],
        explain: "„am Donnerstag um elf Uhr zwanzig“.",
      },
      {
        kind: "short_answer",
        text: "Was soll Herr Bilgin unten machen?",
        options: [],
        answer: 0,
        accept: ["eine Nummer ziehen", "eine Nummer", "Nummer ziehen"],
        explain: "„ziehen Sie unten eine Nummer“ — on dakika önce gelip sıra numarası alacak.",
      },
      {
        text: "Kann man ohne Termin kommen?",
        options: ["Ja, immer.", "Nein, ein Termin ist nötig.", "Nur am Donnerstag."],
        answer: 1,
        explain: "„ohne Termin geht es leider nicht“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w6",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Zu laut im Haus",
    genre: "opinion",
    intro: "Apartmanda gece gürültüsü var: önce iki cümle kur, sonra yöneticiye durumu anlatan bir metin yaz.",
    gloss: [
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "die Hausverwaltung", tr: "apartman yönetimi", en: "property management" },
      { de: "die Nachtruhe", tr: "gece sessizliği", en: "quiet hours at night" },
      { de: "sich beschweren", tr: "şikâyet etmek", en: "to complain" },
      { de: "die Lösung", tr: "çözüm", en: "solution" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Uyuyamıyorum çünkü komşular gece çok gürültü yapıyor.",
        answer: "Ich kann nicht schlafen, weil die Nachbarn nachts sehr laut sind.",
        alternatives: ["Ich kann nicht schlafen, weil die Nachbarn nachts viel Lärm machen."],
        hint: "„weil“ yan cümle kurar: çekimli fiil o cümlenin EN SONUNA gider.",
      },
      {
        kind: "build",
        tr: "Zaten iki kez onlarla konuştum.",
        answer: "Ich habe schon zweimal mit ihnen gesprochen.",
        alternatives: ["Zweimal habe ich schon mit ihnen gesprochen."],
        hint: "Perfekt: „habe“ ikinci sırada, Partizip cümlenin sonunda; „mit“ Dativ ister → ihnen.",
      },
      {
        kind: "free",
        prompt:
          "Apartman yönetimine bir metin yaz: kim olduğunu ve hangi dairede oturduğunu söyle, sorunun ne olduğunu ve ne zaman olduğunu anlat, şimdiye kadar ne yaptığını yaz ve bir çözüm öner.",
        checklist: [
          "Kendini tanıt ve daireni yaz",
          "Sorunu ve ne zaman olduğunu anlat",
          "Şimdiye kadar ne yaptığını yaz",
          "Bir çözüm öner ve kibarca bitir",
        ],
        minWords: 50,
        phrases: [
          { de: "Ich wohne seit … in der Wohnung …", tr: "… tarihinden beri … numaralı dairede oturuyorum", en: "I have lived in flat … since …" },
          { de: "Leider gibt es ein Problem mit …", tr: "Maalesef … ile ilgili bir sorun var", en: "Unfortunately there is a problem with …" },
          { de: "Ich habe schon mehrmals …", tr: "Birkaç kez … yaptım", en: "I have already … several times" },
          { de: "Könnten Sie bitte …?", tr: "Lütfen … yapabilir misiniz?", en: "Could you please …?" },
          { de: "Ich hoffe auf eine Lösung.", tr: "Bir çözüm bulunmasını umuyorum.", en: "I hope for a solution." },
        ],
        sample:
          "Sehr geehrte Damen und Herren, mein Name ist Deniz Aslan und ich wohne seit einem Jahr in der Wohnung 14. " +
          "Leider gibt es ein Problem mit dem Lärm. Fast jede Nacht läuft in der Wohnung über mir bis zwei Uhr laute Musik. " +
          "Ich stehe um halb sechs auf und kann deshalb kaum schlafen. " +
          "Ich habe schon zweimal freundlich mit den Nachbarn gesprochen, aber es hat sich nichts geändert. " +
          "Könnten Sie bitte an alle Mieter eine Information über die Nachtruhe schicken? " +
          "Ich möchte keinen Streit, ich hoffe nur auf eine Lösung. Mit freundlichen Grüßen, Deniz Aslan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s6",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Am Wortende wird es hart",
    genre: "pronounce",
    intro: "b, d ve g kelime sonunda p, t, k gibi okunur; altı cümlede yumuşak ile sert biçimi yan yana söyle.",
    gloss: [
      { de: "der Tag", tr: "gün", en: "day" },
      { de: "das Kind", tr: "çocuk", en: "child" },
      { de: "der Korb", tr: "sepet", en: "basket" },
      { de: "der Zug", tr: "tren", en: "train" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Der Tag war lang, die Tage sind kurz.",
        tr: "Gün uzundu, günler kısa.",
        hint: "„Tag“ sonda TAAK; ama çoğul „Tage“ içinde g ortada kalır ve yumuşak okunur.",
        confusions: [
          {
            heard: ["Take"],
            fix: "Sertleşme yalnız SONDA olur; ünlüden önce gelen g yumuşak kalır.",
            expected: "Tage",
          },
        ],
      },
      {
        de: "Das Kind spielt mit den Kindern.",
        tr: "Çocuk öbür çocuklarla oynuyor.",
        hint: "„Kind“ sonda KİNT; „Kindern“ içinde d ortada kaldığı için yumuşak.",
        confusions: [
          {
            heard: ["Kintern"],
            fix: "İkinci kelimede d ile n arasında ünlü var; ses sertleşmez.",
            expected: "Kindern",
          },
        ],
      },
      {
        de: "Der Korb ist voll, die Körbe sind leer.",
        tr: "Sepet dolu, sepetler boş.",
        hint: "„Korb“ sonda KORP; „Körbe“ içinde b yumuşak kalır.",
        confusions: [
          {
            heard: ["Körpe"],
            fix: "Çoğulda b ünlüden önce geliyor; p diye söylenmez.",
            expected: "Körbe",
          },
        ],
      },
      {
        de: "Der Zug fährt ab, die Züge sind pünktlich.",
        tr: "Tren kalkıyor, trenler tam vaktinde.",
        hint: "„Zug“ = TSUUK, „ab“ = AP; ama „Züge“ yumuşak g ile.",
        confusions: [
          {
            heard: ["Züke"],
            fix: "„ab“ sertleşir çünkü sondadır; „Züge“ sertleşmez çünkü g ortadadır.",
            expected: "Züge",
          },
        ],
      },
      {
        de: "Er ist gesund und bleibt gesund.",
        tr: "Sağlıklı ve sağlıklı kalıyor.",
        hint: "„gesund“ = ge-ZUNT, „bleibt“ = BLAYPT. İki sertleşme aynı cümlede.",
        confusions: [
          {
            heard: ["bleibd"],
            fix: "b'den sonra t geldiğinde b de sertleşir: BLAYPT.",
            expected: "bleibt",
          },
        ],
      },
      {
        de: "Das Lied ist schön, die Lieder auch.",
        tr: "Şarkı güzel, şarkılar da.",
        hint: "„Lied“ = LİİT: sondaki d, yazıda d kalsa da t gibi duyulur. Çoğul „Lieder“ içinde ise d ortada kalır ve yumuşak okunur.",
        confusions: [
          {
            heard: ["Lieter"],
            fix: "Sertleşme yalnız sonda olur: „Lied“ LİİT, ama „Lieder“ LİİDA.",
            expected: "Lied",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g6",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "weil und dass",
    genre: "grammar",
    intro: "Yan cümlede fiil sona gider; iki bağlaç bu kuralın kapısını açıyor.",
    focus: "Nebensatz: weil ve dass ile fiilin sona gitmesi",
    gloss: [
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "glauben", tr: "inanmak", en: "to believe" },
      { de: "wissen", tr: "bilmek", en: "to know" },
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "krank", tr: "hasta", en: "sick" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "weil: sebep, fiil sonda",
        tr: "„weil“ bir sebep cümlesi başlatır ve o cümlenin çekimli fiili EN SONA gider. Ana cümledeki kural değişmez: orada fiil hâlâ ikinci sıradadır. İki cümleyi virgül ayırır.",
        examples: [
          { de: "Ich komme nicht, weil ich krank bin.", tr: "Gelmiyorum çünkü hastayım.", note: "bin → sonda" },
          { de: "Wir sagen den Termin ab, weil das Kind Fieber hat.", tr: "Randevuyu iptal ediyoruz çünkü çocuğun ateşi var.", note: "hat → sonda" },
          { de: "Weil es regnet, bleiben wir zu Hause.", tr: "Yağmur yağdığı için evde kalıyoruz.", note: "yan cümle başta: ana cümlede fiil hemen arkasından gelir" },
        ],
      },
      {
        heading: "dass: cümlenin kendisi nesne olur",
        tr: "„dass“ bir cümleyi başka bir cümlenin nesnesi yapar: „Biliyorum ki …“, „Sanıyorum ki …“. Kural aynı: „dass“tan sonra fiil sona gider. Türkçedeki „-diğini“ yapısının karşılığıdır.",
        examples: [
          { de: "Ich weiß, dass du morgen arbeitest.", tr: "Yarın çalıştığını biliyorum.", note: "arbeitest → sonda" },
          { de: "Sie glaubt, dass der Zug Verspätung hat.", tr: "Trenin rötarlı olduğunu düşünüyor.", note: "hat → sonda" },
          { de: "Es ist gut, dass du angerufen hast.", tr: "Araman iyi oldu.", note: "Perfekt'te yardımcı fiil en sonda" },
        ],
      },
      {
        heading: "Perfekt ve modal fiil yan cümlede",
        tr: "Yan cümlede ÇEKİMLİ fiil sona gider — Perfekt'te bu yardımcı fiildir, modal yapıda modal fiildir. Yani Partizip ya da mastar ondan ÖNCE durur: „… gearbeitet hat“, „… kommen kann“.",
        examples: [
          { de: "Ich glaube, dass er gestern gearbeitet hat.", tr: "Dün çalıştığını sanıyorum.", note: "gearbeitet hat" },
          { de: "Sie sagt, dass sie nicht kommen kann.", tr: "Gelemeyeceğini söylüyor.", note: "kommen kann" },
          { de: "Er kommt nicht, weil er arbeiten muss.", tr: "Gelmiyor çünkü çalışmak zorunda.", note: "arbeiten muss" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich bleibe zu Hause, weil ich müde ___.",
        options: ["bin", "ist", "sein"],
        answer: 0,
        explain: "„weil“ yan cümlesinde çekimli fiil sona gider ve özneye göre çekilir: bin.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich weiß, dass du arbeitest morgen.",
          "Ich weiß, dass arbeitest du morgen.",
          "Ich weiß, dass du morgen arbeitest.",
        ],
        answer: 2,
        explain: "„dass“tan sonra özne gelir ve fiil en sona gider.",
      },
      {
        text: "Weil es regnet, ___ wir zu Hause.",
        options: ["bleiben", "wir bleiben", "bleiben wir zu Hause"],
        answer: 0,
        explain: "Yan cümle başta olduğunda ana cümlenin fiili hemen virgülden sonra gelir.",
      },
      {
        kind: "gapfill",
        text: "Sie sagt, dass sie heute nicht kommen ___. (können)",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Modal fiil çekimlidir ve yan cümlenin en sonunda durur: kommen kann.",
      },
      {
        kind: "gapfill",
        text: "Wir sagen den Termin ab, ___ das Kind Fieber hat. (weil / dass)",
        options: [],
        answer: 0,
        accept: ["weil"],
        explain: "Sebep bildiriliyor; „dass“ sebep değil nesne cümlesi kurar.",
      },
      {
        kind: "gapfill",
        text: "Ich glaube, dass er gestern ___ hat. (arbeiten, Perfekt)",
        options: [],
        answer: 0,
        accept: ["gearbeitet"],
        explain: "Yan cümlede Partizip, çekimli yardımcı fiilden ÖNCE durur: gearbeitet hat.",
      },
      {
        kind: "gapfill",
        text: "Er kommt nicht, weil er arbeiten ___. (müssen)",
        options: [],
        answer: 0,
        accept: ["muss"],
        explain: "Modal fiil sona gider, mastar onun önünde kalır.",
      },
      {
        kind: "order",
        text: "Yan cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["weil", "ich", "keine", "Zeit", "habe"],
        explain: "Bağlaç başta, özne arkasından, çekimli fiil en sonda: weil ich keine Zeit habe.",
      },
      {
        kind: "truefalse",
        text: "„Ich komme nicht, weil ich bin krank.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yan cümlede fiil sona gitmeli: „weil ich krank bin“.",
      },
      {
        kind: "truefalse",
        text: "„Es ist gut, dass du angerufen hast.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Perfekt yan cümlede: Partizip önce, çekimli „hast“ en sonda.",
      },
    ],
  },
];

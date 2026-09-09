import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: bilgilendirme yazısı, muayenehane sesli mesajı ve dernek bülteni.
 * Söyleyiş odağı eu/äu ile ä; dil bilgisi sein, haben ve modal fiillerin
 * Präteritum'u.
 */
export const deA2P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r4",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Was darf in welche Tonne?",
    genre: "Bilgilendirme",
    intro: "Apartman girişindeki çöp ayırma yazısını okuyacaksın: hangi kutuya ne giriyor, ne girmiyor, sorun olursa kime sorulacak.",
    gloss: [
      { de: "die Tonne", tr: "çöp kutusu", en: "bin" },
      { de: "sortieren", tr: "ayırmak", en: "to sort" },
      { de: "die Verpackung", tr: "ambalaj", en: "packaging" },
      { de: "der Bioabfall", tr: "organik atık", en: "organic waste" },
      { de: "die Windel", tr: "bebek bezi", en: "diaper" },
      { de: "das Geschirr", tr: "bulaşık", en: "crockery" },
    ],
    minutes: 5,
    text:
      "WAS DARF IN WELCHE TONNE?\n\n" +
      "In unserem Hof stehen vier Tonnen. Bitte helfen Sie mit: Falsch sortierter Müll kostet das ganze Haus Geld.\n\n" +
      "Blaue Tonne — Papier. Zeitungen, Hefte, Kartons. Bitte die Kartons vorher klein machen. " +
      "Fotos und schmutziges Papier gehören nicht hinein.\n\n" +
      "Gelber Sack — Verpackungen. Joghurtbecher, Dosen, Plastikflaschen. Bitte nur leeren, nicht waschen.\n\n" +
      "Braune Tonne — Bioabfall. Obst, Gemüse, Kaffeesatz, Eierschalen. Keine Plastiktüten, auch keine grünen.\n\n" +
      "Graue Tonne — Rest. Alles andere: Windeln, Staub, kaputtes Geschirr.\n\n" +
      "Glas und Batterien gehören nicht in den Hof. Glas bringen Sie bitte zu den Containern an der Kirche, " +
      "Batterien nimmt jeder Supermarkt zurück.\n\n" +
      "Bei Fragen: Hausmeisterbüro, Montag und Donnerstag von acht bis zehn.",
    questions: [
      {
        text: "Warum ist die richtige Tonne wichtig?",
        options: [
          "Falscher Müll kostet das Haus Geld.",
          "Der Hausmeister hat dann weniger Arbeit.",
          "Die Stadt schickt sonst einen Brief.",
        ],
        answer: 0,
        explain: "„Falsch sortierter Müll kostet das ganze Haus Geld.“ — gerekçe daha ilk paragrafta.",
      },
      {
        text: "Was kommt in den gelben Sack?",
        options: [
          "Verpackungen aus Plastik und Dosen",
          "Zeitungen, Hefte und alte Kartons",
          "Obst, Gemüse und Eierschalen",
        ],
        answer: 0,
        explain: "„Gelber Sack — Verpackungen. Joghurtbecher, Dosen, Plastikflaschen.“",
      },
      {
        kind: "truefalse",
        text: "Man muss die Joghurtbecher vor dem Wegwerfen waschen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Bitte nur leeren, nicht waschen.“ — boşaltmak yeterli.",
      },
      {
        kind: "gapfill",
        text: "Kartons soll man vorher ___ machen.",
        options: [],
        answer: 0,
        accept: ["klein"],
        explain: "„Bitte die Kartons vorher klein machen.“",
      },
      {
        kind: "short_answer",
        text: "Wohin bringt man Glas?",
        options: [],
        answer: 0,
        accept: ["zu den Containern", "an die Kirche", "Container an der Kirche"],
        explain: "„Glas bringen Sie bitte zu den Containern an der Kirche.“",
      },
      {
        text: "Wann kann man den Hausmeister fragen?",
        options: [
          "montags und donnerstags am Morgen",
          "jeden Tag zwischen acht und zehn",
          "nur nach einem Anruf im Büro",
        ],
        answer: 0,
        explain: "„Hausmeisterbüro, Montag und Donnerstag von acht bis zehn“ — yalnız iki gün, sabah saatleri.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l4",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Anruf aus der Tierarztpraxis",
    genre: "Sesli mesaj",
    intro: "Veteriner muayenehanesi telesekretere mesaj bırakıyor: randevu neden değişti, ne getirilecek, neye dikkat edilecek.",
    gloss: [
      { de: "die Fortbildung", tr: "hizmet içi eğitim", en: "training course" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "der Impfpass", tr: "aşı karnesi", en: "vaccination record" },
      { de: "fressen", tr: "yemek", en: "to eat (animals)" },
      { de: "erlaubt", tr: "serbest", en: "allowed" },
      { de: "unruhig", tr: "huzursuz", en: "restless" },
    ],
    minutes: 5,
    segments: [
      { text: "Guten Tag, Frau Baran. Hier ist die Tierarztpraxis Doktor Simon. Ich rufe wegen Ihres Termins am Donnerstag an." },
      { text: "Leider muss Frau Doktor Simon an diesem Tag zu einer Fortbildung. Wir müssen den Termin verschieben." },
      { text: "Ich kann Ihnen Freitag um halb elf oder Montag um sechzehn Uhr anbieten." },
      { text: "Bitte bringen Sie den Impfpass von Ihrer Katze mit. Beim letzten Mal haben Sie ihn zu Hause vergessen." },
      { text: "Wichtig: Die Katze darf vorher nichts fressen. Sechs Stunden ohne Futter, aber Wasser ist erlaubt." },
      { text: "Wenn die Katze sehr unruhig ist, holen Sie die Transportbox schon am Vorabend heraus." },
      { text: "Rufen Sie uns bitte bis morgen Mittag zurück. Sie erreichen uns von acht bis achtzehn Uhr. Vielen Dank!" },
    ],
    questions: [
      {
        text: "Warum ruft die Praxis an?",
        options: [
          "Sie will den Termin verschieben.",
          "Die Katze ist plötzlich krank geworden.",
          "Eine Rechnung ist noch offen.",
        ],
        answer: 0,
        explain: "„Wir müssen den Termin verschieben“ — hekim o gün eğitimde.",
      },
      {
        text: "Welche zwei Termine bietet die Praxis an?",
        options: [
          "Freitag halb elf oder Montag vier Uhr",
          "Donnerstag zehn Uhr oder Freitag sechs Uhr",
          "Montag halb elf oder Dienstag vier Uhr",
        ],
        answer: 0,
        explain: "„Freitag um halb elf oder Montag um sechzehn Uhr“ — on altı, öğleden sonra dört demek.",
      },
      {
        kind: "truefalse",
        text: "Die Katze darf vor dem Termin Wasser trinken.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Sechs Stunden ohne Futter, aber Wasser ist erlaubt.“",
      },
      {
        kind: "short_answer",
        text: "Was soll Frau Baran mitbringen?",
        options: [],
        answer: 0,
        accept: ["den Impfpass", "Impfpass", "den Impfpass der Katze", "den Impfpass von ihrer Katze"],
        explain: "„Bitte bringen Sie den Impfpass von Ihrer Katze mit.“",
      },
      {
        kind: "dictation",
        text: "Yemekle ilgili uyarıyı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Die Katze darf vorher nichts fressen.", "Die Katze darf vorher nichts fressen"],
        explain: "„Die Katze darf vorher nichts fressen.“ — hayvanların yemesi için „fressen“ kullanılır.",
      },
      {
        text: "Bis wann soll Frau Baran zurückrufen?",
        options: ["bis morgen Mittag", "bis Donnerstag früh", "bis heute achtzehn Uhr"],
        answer: 0,
        explain: "„Rufen Sie uns bitte bis morgen Mittag zurück.“ Sekiz-on sekiz arası ise açık olunan saatler.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w4",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Bericht für den Vereinsbrief",
    genre: "Bülten yazısı",
    intro: "Derneğin bülteni için kısa bir etkinlik raporu yazacaksın; önce iki cümle kur, sonra raporu yaz.",
    gloss: [
      { de: "platt", tr: "patlak", en: "flat" },
      { de: "teilnehmen", tr: "katılmak", en: "to take part" },
      { de: "der Reifen", tr: "lastik", en: "tire" },
      { de: "die Pumpe", tr: "pompa", en: "pump" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Tura yirmi iki kişi katıldı.",
        answer: "An der Tour haben zweiundzwanzig Personen teilgenommen.",
        alternatives: ["Zweiundzwanzig Personen haben an der Tour teilgenommen."],
        hint: "Ayrılabilen fiilin Partizip'inde „ge-“ ön ekle kökün ARASINA girer: teil-ge-nommen.",
      },
      {
        kind: "build",
        tr: "Sabah hava soğuktu ama öğleden sonra güneş açtı.",
        answer: "Am Morgen war es kalt, aber am Nachmittag kam die Sonne.",
        alternatives: ["Es war am Morgen kalt, aber am Nachmittag kam die Sonne."],
        hint: "„aber“ kelime sırasını değiştirmez; zaman ifadesi başa gelince fiil yine ikinci sırada kalır.",
      },
      {
        kind: "free",
        prompt:
          "Derneğin ya da apartmanın bülteni için katıldığın bir etkinliği anlat: ne zaman ve nerede oldu, kaç kişi katıldı, neler yapıldı, bir aksilik oldu mu, nasıl bitti ve kime teşekkür ediyorsun.",
        checklist: [
          "Tarihi, yeri ve katılımcı sayısını yaz",
          "Neler yapıldığını sırayla anlat",
          "Bir aksiliği ve çözümünü söyle",
          "Nasıl bittiğini yaz ve teşekkür et",
        ],
        minWords: 40,
        phrases: [
          { de: "Am … hat … stattgefunden.", tr: "… tarihinde … gerçekleşti." },
          { de: "… Personen haben teilgenommen.", tr: "… kişi katıldı." },
          { de: "Ein Problem gab es auch: …", tr: "Bir sorun da yaşandı: …" },
          { de: "Nächstes Mal …", tr: "Bir dahaki sefere …" },
          { de: "Vielen Dank an …", tr: "… teşekkür ederiz." },
        ],
        sample:
          "Am Sonntag, dem vierzehnten Mai, hat unsere erste gemeinsame Fahrradtour stattgefunden. " +
          "Zweiundzwanzig Personen haben teilgenommen, davon sechs Kinder. Wir sind um neun Uhr am Sportplatz " +
          "gestartet und über den alten Bahnweg zum See gefahren. Am Morgen war es kalt, aber am Nachmittag kam " +
          "die Sonne. Ein Problem gab es auch: Zwei Reifen waren platt, und wir hatten nur eine Pumpe dabei. " +
          "Nächstes Mal nehmen wir zwei mit. Um sechzehn Uhr waren alle wieder zu Hause. " +
          "Vielen Dank an Familie Hoffmann für den Kuchen!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s4",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "eu, äu und ä",
    genre: "Ses çalışması",
    intro: "„eu“ ve „äu“ aynı sesi verir: oy. Tek başına „ä“ ise Türkçedeki e gibidir, ay gibi değil.",
    gloss: [
      { de: "der Baum", tr: "ağaç", en: "tree" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "der Bäcker", tr: "fırıncı", en: "baker" },
      { de: "spät", tr: "geç", en: "late" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Heute ist Freitag, der neunte.",
        tr: "Bugün cuma, ayın dokuzu.",
        hint: "„heute“ = HOY-te, „neunte“ = NOY-te. „eu“ hep oy okunur.",
        confusions: [
          { heard: ["Höüte", "Heu-te", "neunte mit e-u"], fix: "İki harfi ayrı ayrı söyleme; tek bir oy sesi çıkar: hoyte, noynte.", expected: "heute" },
        ],
      },
      {
        de: "Meine Freundin kauft neue Bäume.",
        tr: "Arkadaşım yeni ağaçlar alıyor.",
        hint: "„Freundin“ ve „neue“ eu ile, „Bäume“ äu ile — üçü de aynı oy sesi.",
        confusions: [
          { heard: ["Bäume mit ä-u", "Bahume", "Fröindin"], fix: "„äu“ da tam olarak „eu“ gibi okunur: BOY-me.", expected: "Bäume" },
        ],
      },
      {
        de: "Die Häuser hier sind sehr teuer.",
        tr: "Buradaki evler çok pahalı.",
        hint: "„Häuser“ = HOY-za, „teuer“ = TOY-a. Sondaki -er yine „a“ gibi zayıf.",
        confusions: [
          { heard: ["Hauser", "Häuser mit ä", "teu-er"], fix: "„Haus“ çoğul olunca äu alır ve ses oy'a döner: hoyza.", expected: "Häuser" },
        ],
      },
      {
        de: "Er ärgert sich über die Verspätung.",
        tr: "Gecikmeye sinirleniyor.",
        hint: "Tek başına „ä“ Türkçedeki e gibidir: ER-gert, fer-ŞPEE-tung.",
        confusions: [
          { heard: ["ärgert wie aygert", "Verspaytung"], fix: "„ä“ ay değil e sesidir; ay sesi için „ei“ yazılır.", expected: "ärgert" },
        ],
      },
      {
        de: "Die Männer arbeiten heute spät.",
        tr: "Adamlar bugün geç saate kadar çalışıyor.",
        hint: "„Männer“ kısa e, „spät“ uzun e. İkisinde de ay sesi yok.",
        confusions: [
          { heard: ["Mainner", "spayt", "Manner"], fix: "Kısa ya da uzun olabilir ama „ä“ hep e ailesindendir: MEN-na, ŞPEET.", expected: "spät" },
        ],
      },
      {
        de: "Läufst du heute zum Bäcker?",
        tr: "Bugün fırına yürüyor musun?",
        hint: "Aynı cümlede iki ses: „Läufst“ oy, „Bäcker“ e. Yazılış benziyor, ses ayrı.",
        confusions: [
          { heard: ["Laufst du", "Böcker", "Bäcker mit oy"], fix: "„äu“ oy, tek „ä“ e: LOYFST ama BE-ka.", expected: "Läufst" },
        ],
      },
      {
        de: "Ich freue mich über deine Nachricht.",
        tr: "Mesajına sevindim.",
        hint: "„freue“ = FROY-e; sondaki e ayrı bir hece olarak hafifçe duyulur.",
        confusions: [
          { heard: ["Ich fröhe mich", "Ich freu mich über"], fix: "„eu“ oy, arkasından gelen e yutulmaz: fro-ye.", expected: "freue" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g4",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "war, hatte, musste",
    genre: "Kural",
    intro: "Konuşurken çoğu fiil için Perfekt kullanılır, ama üç grup fiil geçmişte hep kısa biçimiyle söylenir.",
    focus: "Präteritum: sein, haben ve modal fiiller",
    gloss: [
      { de: "müde", tr: "yorgun", en: "tired" },
      { de: "eigentlich", tr: "aslında", en: "actually" },
      { de: "krank", tr: "hasta", en: "ill" },
      { de: "dabei", tr: "yanında", en: "with one" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Hangi fiil hangi geçmiş?",
        tr: "Türkçede tek bir geçmiş zaman var. Almancada konuşma dilinde çoğu fiil Perfekt ile anlatılır, ama sein, haben ve modal fiiller neredeyse hep Präteritum ile gelir. „Ich bin müde gewesen“ değil, „Ich war müde“.",
        examples: [
          { de: "Gestern war ich sehr müde.", tr: "Dün çok yorgundum." },
          { de: "Wir hatten keinen Schlüssel dabei.", tr: "Yanımızda anahtar yoktu." },
          { de: "Ich musste lange warten.", tr: "Uzun süre beklemek zorunda kaldım." },
        ],
      },
      {
        heading: "war ve hatte",
        tr: "İki fiil de üçüncü tekilde EK ALMAZ: er war, er hatte. Sıra şöyle: war, warst, war, waren, wart, waren; hatte, hattest, hatte, hatten, hattet, hatten.",
        examples: [
          { de: "Warst du gestern zu Hause?", tr: "Dün evde miydin?" },
          { de: "Sie hatte keine Zeit.", tr: "Vakti yoktu.", note: "hatte, hattet değil" },
          { de: "Wart ihr schon in Wien?", tr: "Viyana'da bulundunuz mu?" },
        ],
      },
      {
        heading: "Modal fiillerde nokta düşer",
        tr: "Modal fiiller Präteritum'da ünlüsündeki noktayı kaybeder ve hatte gibi çekilir: können → konnte, müssen → musste, dürfen → durfte, wollen → wollte, sollen → sollte, mögen → mochte.",
        examples: [
          { de: "Als Kind konnte ich nicht schwimmen.", tr: "Çocukken yüzemezdim.", note: "können → konnte" },
          { de: "Wir durften nicht mitkommen.", tr: "Bizim gelmemize izin yoktu." },
          { de: "Er wollte eigentlich früher kommen.", tr: "Aslında daha erken gelmek istiyordu." },
        ],
      },
    ],
    questions: [
      {
        text: "Gestern ___ ich sehr müde.",
        options: ["war", "bin", "bin gewesen"],
        answer: 0,
        explain: "„sein“ geçmişte konuşma dilinde de Präteritum ile gelir: ich war.",
      },
      {
        text: "Wir ___ kein Geld dabei.",
        options: ["hatten", "haben", "hatte"],
        answer: 0,
        explain: "„wir“ biçiminde ek -en'dir: wir hatten.",
      },
      {
        text: "Als Kind ___ ich nicht schwimmen.",
        options: ["konnte", "könnte", "gekonnt"],
        answer: 0,
        explain: "Präteritum'da noktalar düşer: können → konnte. „könnte“ ise dilek kipidir.",
      },
      {
        kind: "gapfill",
        text: "Er ___ (sein) letzte Woche krank.",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "Üçüncü tekilde ek yok: er war.",
      },
      {
        kind: "gapfill",
        text: "___ (haben) ihr gestern Zeit?",
        options: [],
        answer: 0,
        accept: ["Hattet", "hattet"],
        explain: "„ihr“ biçiminde -et eki gelir: hattet ihr?",
      },
      {
        kind: "gapfill",
        text: "Ich ___ (müssen) am Samstag arbeiten.",
        options: [],
        answer: 0,
        accept: ["musste"],
        explain: "„müssen“ Präteritum'da noktasını kaybeder: musste.",
      },
      {
        kind: "gapfill",
        text: "Sie ___ (wollen) eigentlich früher kommen.",
        options: [],
        answer: 0,
        accept: ["wollte"],
        explain: "„wollen“ zaten noktasızdır ve hatte gibi çekilir: wollte.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "hatten", "keinen", "Schlüssel", "dabei"],
        explain: "Çekimli fiil ikinci sırada, „dabei“ cümle sonunda: Wir hatten keinen Schlüssel dabei.",
      },
      {
        kind: "truefalse",
        text: "„Er hattet gestern keine Zeit.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Üçüncü tekilde ek yoktur; doğrusu „Er hatte gestern keine Zeit.“",
      },
      {
        kind: "truefalse",
        text: "„Sie durfte nicht mitkommen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„dürfen“ Präteritum'da durfte olur ve üçüncü tekilde ek almaz; cümle doğru.",
      },
    ],
  },
];

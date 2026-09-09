import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Metin türleri parti 1 ve 2'den ayrı: tarif, havuz anonsu ve resmî bir soru
 * e-postası. Söyleyiş odağı w/v ayrımı; dil bilgisi artikel ve çoğul biçimleri.
 */
export const deA1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r3",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Kartoffelsuppe für vier Personen",
    genre: "Tarif",
    intro: "Basit bir çorba tarifi okuyacaksın: neler gerekiyor, hangi sırayla yapılıyor, sonunda ne öneriliyor.",
    gloss: [
      { de: "die Zwiebel", tr: "soğan", en: "onion" },
      { de: "schneiden", tr: "kesmek", en: "to cut" },
      { de: "der Topf", tr: "tencere", en: "pot" },
      { de: "weich", tr: "yumuşak", en: "soft" },
      { de: "der Herd", tr: "ocak", en: "stove" },
      { de: "schmecken", tr: "tadı olmak", en: "to taste" },
    ],
    minutes: 4,
    text:
      "KARTOFFELSUPPE FÜR VIER PERSONEN\n\n" +
      "Du brauchst: ein Kilo Kartoffeln, zwei Karotten, eine Zwiebel, einen Liter Wasser, Salz, " +
      "Pfeffer und ein bisschen Butter.\n\n" +
      "So geht es:\n" +
      "Wasche die Kartoffeln und schneide sie klein. Die Karotten und die Zwiebel auch.\n" +
      "Koche das Wasser in einem großen Topf. Gib dann das Gemüse dazu.\n" +
      "Nach zwanzig Minuten sind die Kartoffeln weich.\n" +
      "Nimm den Topf vom Herd und gib Salz, Pfeffer und Butter dazu.\n\n" +
      "Tipp: Frisches Brot passt sehr gut dazu. Die Suppe schmeckt am nächsten Tag noch besser.",
    questions: [
      {
        text: "Was für ein Text ist das?",
        options: ["ein Rezept für eine Suppe", "eine Einladung zum Essen", "eine Karte aus einem Restaurant"],
        answer: 0,
        explain: "Önce malzemeler („Du brauchst …“), sonra adımlar geliyor — bu bir tarif, davet ya da menü değil.",
      },
      {
        text: "Wie lange kocht das Gemüse?",
        options: ["zwanzig Minuten", "zehn Minuten", "eine Stunde"],
        answer: 0,
        explain: "„Nach zwanzig Minuten sind die Kartoffeln weich.“",
      },
      {
        kind: "truefalse",
        text: "Man braucht Fleisch für die Suppe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Malzeme listesinde et yok: patates, havuç, soğan, su, tuz, biber ve tereyağı.",
      },
      {
        kind: "gapfill",
        text: "Die Suppe ist für ___ Personen.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "Başlık „Kartoffelsuppe für vier Personen“ diyor.",
      },
      {
        kind: "short_answer",
        text: "Was passt gut zu der Suppe?",
        options: [],
        answer: 0,
        accept: ["frisches Brot", "Brot", "frisches Brot passt gut"],
        explain: "„Tipp: Frisches Brot passt sehr gut dazu.“",
      },
      {
        text: "Wann schmeckt die Suppe noch besser?",
        options: ["am nächsten Tag", "nach zwanzig Minuten", "direkt vom Herd"],
        answer: 0,
        explain: "„Die Suppe schmeckt am nächsten Tag noch besser.“ Yirmi dakika pişme süresi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l3",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Durchsage im Freibad",
    genre: "Anons",
    intro: "Açık havuzda kapanış anonsunu dinleyeceksin: saatler, bulunan eşyalar ve yarınla ilgili bilgi.",
    gloss: [
      { de: "das Freibad", tr: "açık havuz", en: "outdoor pool" },
      { de: "die Umkleide", tr: "soyunma odası", en: "changing room" },
      { de: "die Brille", tr: "gözlük", en: "glasses" },
      { de: "das Handtuch", tr: "havlu", en: "towel" },
      { de: "die Kasse", tr: "kasa", en: "cash desk" },
      { de: "das Becken", tr: "havuz teknesi", en: "pool basin" },
    ],
    minutes: 4,
    segments: [
      { text: "Liebe Gäste, wir schließen heute um acht Uhr. Bitte verlassen Sie das Wasser um zehn vor acht." },
      { text: "Die Duschen und die Umkleide sind bis halb neun offen." },
      { text: "Wir haben heute wieder viele Sachen gefunden: eine Brille, zwei Handtücher und einen blauen Rucksack." },
      { text: "Die Sachen liegen an der Kasse. Bitte fragen Sie dort nach Ihren Dingen." },
      { text: "Morgen öffnen wir schon um sieben Uhr. Das Wetter wird warm und sonnig." },
      { text: "Am Freitag bleibt das Freibad zu. Wir putzen dann das große Becken. Danke und einen schönen Abend!" },
    ],
    questions: [
      {
        text: "Wo hört man diesen Text?",
        options: ["im Freibad", "im Supermarkt", "am Bahnhof"],
        answer: 0,
        explain: "„Am Freitag bleibt das Freibad zu“ ve duş, soyunma odası, havuz teknesi — sahne açık havuz.",
      },
      {
        text: "Wann müssen die Gäste aus dem Wasser?",
        options: ["um zehn vor acht", "um halb neun", "um sieben Uhr"],
        answer: 0,
        explain: "„Bitte verlassen Sie das Wasser um zehn vor acht.“ Sekiz buçuğa kadar duşlar açık kalıyor.",
      },
      {
        kind: "truefalse",
        text: "Die gefundenen Sachen bekommt man an der Kasse.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die Sachen liegen an der Kasse. Bitte fragen Sie dort nach Ihren Dingen.“",
      },
      {
        kind: "short_answer",
        text: "Wann öffnet das Freibad morgen?",
        options: [],
        answer: 0,
        accept: ["um sieben Uhr", "sieben Uhr", "um sieben", "um 7 Uhr"],
        explain: "„Morgen öffnen wir schon um sieben Uhr.“",
      },
      {
        kind: "dictation",
        text: "Cuma günüyle ilgili cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Am Freitag bleibt das Freibad zu.", "Am Freitag bleibt das Freibad zu"],
        explain: "„Am Freitag bleibt das Freibad zu.“ — zaman ifadesi başta olunca fiil ikinci sırada kalır.",
      },
      {
        text: "Warum ist das Freibad am Freitag zu?",
        options: ["Man putzt das große Becken.", "Das Wetter ist dann zu kalt.", "Die Duschen sind kaputt."],
        answer: 0,
        explain: "„Wir putzen dann das große Becken.“ Hava yarın sıcak ve güneşli olacak.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w3",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Anfrage: Ferienwohnung",
    genre: "E-posta",
    intro: "Bir tatil evi ilanı buldun; önce iki cümle kur, sonra ev sahibine sorularını içeren kısa bir e-posta yaz.",
    gloss: [
      { de: "die Ferienwohnung", tr: "tatil evi", en: "holiday flat" },
      { de: "frei", tr: "boş", en: "available" },
      { de: "die Nacht", tr: "gece", en: "night" },
      { de: "der Parkplatz", tr: "otopark", en: "parking space" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Temmuzda bir hafta için bir daire arıyoruz.",
        answer: "Wir suchen eine Wohnung für eine Woche im Juli.",
        alternatives: ["Im Juli suchen wir eine Wohnung für eine Woche."],
        hint: "„für“ edatından sonra Akkusativ gelir: für eine Woche. Ay adı „im“ ile: im Juli.",
      },
      {
        kind: "build",
        tr: "Daire dört kişi için yeterince büyük mü?",
        answer: "Ist die Wohnung groß genug für vier Personen?",
        alternatives: ["Ist die Wohnung für vier Personen groß genug?"],
        hint: "„genug“ Türkçedeki gibi sıfattan ÖNCE değil, SONRA gelir: groß genug.",
      },
      {
        kind: "free",
        prompt:
          "İnternette bir tatil evi buldun. Ev sahibine e-posta yaz: ne zaman ve kaç kişi gelmek istiyorsun, evin o tarihlerde boş olup olmadığını sor, fiyatı ve mutfak, otopark gibi bir iki ayrıntıyı sor, cevap iste.",
        checklist: [
          "Ne zaman ve kaç kişi geleceğini yaz",
          "Evin o tarihlerde boş olup olmadığını sor",
          "Fiyatı sor",
          "Bir iki ayrıntı daha sor ve cevap iste",
        ],
        minWords: 25,
        phrases: [
          { de: "Sehr geehrte Frau …,", tr: "Sayın … Hanım," },
          { de: "Wir möchten … bleiben.", tr: "… kalmak istiyoruz." },
          { de: "Ist die Wohnung … frei?", tr: "Daire … boş mu?" },
          { de: "Was kostet eine Nacht?", tr: "Bir gece ne kadar?" },
          { de: "Freundliche Grüße", tr: "Saygılarımla" },
        ],
        sample:
          "Sehr geehrte Frau Kunz, wir möchten im Juli eine Woche in Ihrer Ferienwohnung bleiben. " +
          "Wir sind vier Personen: zwei Erwachsene und zwei Kinder. Ist die Wohnung vom achten bis zum fünfzehnten Juli frei? " +
          "Was kostet eine Nacht? Gibt es eine Küche und einen Parkplatz? Bitte schreiben Sie mir bald. " +
          "Freundliche Grüße, Elif Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s3",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "w ist v, v ist f",
    genre: "Ses çalışması",
    intro: "Almancada „w“ Türkçedeki v gibi, „v“ ise çoğu kelimede f gibi okunur; yedi cümlede ikisini ayır.",
    gloss: [
      { de: "der Wagen", tr: "araba", en: "car" },
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "die Vase", tr: "vazo", en: "vase" },
      { de: "das Fenster", tr: "pencere", en: "window" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Wir wohnen in der Waldstraße.",
        tr: "Waldstraße'de oturuyoruz.",
        hint: "Üç kelimede de w: VİR VOO-nen … VALT-ştraase. Alt dudak üst dişlere değsin.",
        confusions: [
          { heard: ["Uir wohnen", "Wir bohnen", "Waldstrasse mit b"], fix: "„w“ ne u ne b: Türkçedeki v gibi, dişle dudak arasından titreşimli.", expected: "wohnen" },
        ],
      },
      {
        de: "Mein Vater kommt um vier Uhr.",
        tr: "Babam saat dörtte geliyor.",
        hint: "„Vater“ = FAA-ter, „vier“ = FİİR. Buradaki v, f gibi ve titreşimsiz.",
        confusions: [
          { heard: ["Water", "wier", "Vater mit v"], fix: "Almancada „v“ genelde f okunur: faater, fiir. v gibi söylersen başka kelime duyulur.", expected: "Vater" },
        ],
      },
      {
        de: "Wie viel Wasser trinkst du?",
        tr: "Ne kadar su içiyorsun?",
        hint: "„wie“ ve „Wasser“ v sesi, „viel“ f sesi: VİİL değil FİİL.",
        confusions: [
          { heard: ["wie wiel", "wie fiel Vasser"], fix: "Aynı cümlede iki farklı ses var: „viel“ f ile, „Wasser“ v ile.", expected: "viel" },
        ],
      },
      {
        de: "Der Wagen ist von Viktor.",
        tr: "Araba Viktor'un.",
        hint: "„Wagen“ = VAA-gen; „von“ ve „Viktor“ f ile başlar.",
        confusions: [
          { heard: ["Der Vagen ist won", "fon Wiktor"], fix: "„W“ hep v, „V“ hep f: VAA-gen fon FİK-tor.", expected: "von Viktor" },
        ],
      },
      {
        de: "Wir warten vor dem Kino.",
        tr: "Sinemanın önünde bekliyoruz.",
        hint: "„wir“ ve „warten“ v ile, „vor“ f ile: fooa dem Kino.",
        confusions: [
          { heard: ["wir warten wor", "vir varten for"], fix: "İlk iki kelime v, üçüncüsü f. „vor“ = foor.", expected: "vor" },
        ],
      },
      {
        de: "Wann kommst du von der Arbeit?",
        tr: "İşten ne zaman geliyorsun?",
        hint: "„Wann“ = VAN, „von“ = FON. İkisi arka arkaya geldiği için karışır.",
        confusions: [
          { heard: ["Fann kommst", "won der Arbeit"], fix: "Soru kelimesi v ile, edat f ile: VAN … FON DER AR-bayt.", expected: "wann" },
        ],
      },
      {
        de: "Die Vase steht am Fenster.",
        tr: "Vazo pencerede duruyor.",
        hint: "İstisna: yabancı kökenli kelimelerde „v“ yine v okunur — VAA-ze. „Fenster“ ise gerçek f.",
        confusions: [
          { heard: ["die Fase", "die Phase"], fix: "„Vase“ yabancı kelime, bu yüzden f değil v: vaaze.", expected: "Vase" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g3",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "der, die, das — und der Plural",
    genre: "Kural",
    intro: "İsimlerin üç cinsini ve beş çoğul biçimini tanı: artikel isimle birlikte öğrenilir, çoğulda hepsi „die“ olur.",
    focus: "Artikel ve çoğul biçimleri",
    gloss: [
      { de: "die Zeitung", tr: "gazete", en: "newspaper" },
      { de: "das Mädchen", tr: "kız çocuk", en: "girl" },
      { de: "das Regal", tr: "raf", en: "shelf" },
      { de: "der Vater", tr: "baba", en: "father" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Türkçede olmayan şey",
        tr: "Türkçede isimlerin cinsi yoktur; Almancada her ismin bir artikeli vardır ve kelimeyle birlikte ezberlenir. Bazı sonlar cinsi ele verir: -ung, -heit, -keit ile bitenler hep die; -chen ile bitenler hep das.",
        examples: [
          { de: "die Wohnung, die Freiheit", tr: "daire, özgürlük", note: "-ung ve -heit → die" },
          { de: "das Mädchen, das Brötchen", tr: "kız çocuk, küçük ekmek", note: "-chen → das" },
          { de: "der Lehrer, der Fahrer", tr: "öğretmen, sürücü", note: "kişi anlatan -er → der" },
        ],
      },
      {
        heading: "Beş çoğul biçimi",
        tr: "Türkçede tek bir ek var: -ler/-lar. Almancada beş yol var: -e (der Tag → die Tage), -er (das Kind → die Kinder), -(e)n (die Frau → die Frauen), -s (das Auto → die Autos) ve eksiz (der Lehrer → die Lehrer). Bazılarında ünlü de nokta alır.",
        examples: [
          { de: "der Tag → die Tage", tr: "gün → günler", note: "-e" },
          { de: "das Kind → die Kinder", tr: "çocuk → çocuklar", note: "-er" },
          { de: "der Vater → die Väter", tr: "baba → babalar", note: "eksiz, ama a → ä" },
        ],
      },
      {
        heading: "İki tuzak",
        tr: "Çoğulda cins kaybolur: der, die, das ne olursa olsun çoğulun artikeli hep die'dir. Ve „ein“ın çoğulu yoktur — çoğulda artikelsiz söylersin ya da olumsuzda „keine“ kullanırsın.",
        examples: [
          { de: "die Bücher, die Männer, die Zeitungen", tr: "kitaplar, adamlar, gazeteler", note: "hepsi die" },
          { de: "Wir haben Kinder.", tr: "Çocuklarımız var.", note: "„ein Kinder“ olmaz" },
          { de: "Ich habe keine Fragen.", tr: "Sorum yok." },
        ],
      },
    ],
    questions: [
      {
        text: "___ Zeitung liegt auf dem Tisch.",
        options: ["Die", "Der", "Das"],
        answer: 0,
        explain: "-ung ile biten isimler dişildir: die Zeitung.",
      },
      {
        text: "___ Mädchen spielt im Garten.",
        options: ["Das", "Die", "Der"],
        answer: 0,
        explain: "-chen ile biten isimler nötrdür, anlamı kız olsa bile: das Mädchen.",
      },
      {
        text: "Wie heißt der Plural von „das Buch“?",
        options: ["die Bücher", "die Buchs", "die Buche"],
        answer: 0,
        explain: "„Buch“ -er çoğulu alır ve ünlü nokta alır: die Bücher.",
      },
      {
        kind: "gapfill",
        text: "Plural: das Auto → die ___",
        options: [],
        answer: 0,
        accept: ["Autos"],
        explain: "Yabancı kökenli kısa kelimeler -s çoğulu alır: die Autos.",
      },
      {
        kind: "gapfill",
        text: "Plural: die Frau → die ___",
        options: [],
        answer: 0,
        accept: ["Frauen"],
        explain: "Dişil isimlerin çoğu -(e)n çoğulu alır: die Frauen.",
      },
      {
        kind: "gapfill",
        text: "Artikel: ___ Wohnung (der / die / das)",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "-ung sonu dişili gösterir: die Wohnung.",
      },
      {
        kind: "gapfill",
        text: "Plural: der Vater → die ___",
        options: [],
        answer: 0,
        accept: ["Väter"],
        explain: "Bu kelime ek almaz, yalnız ünlüsü nokta alır: die Väter.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Im", "Regal", "stehen", "die", "Bücher"],
        explain: "Yer ifadesi başa gelince fiil yine ikinci sırada durur: Im Regal stehen die Bücher.",
      },
      {
        kind: "truefalse",
        text: "„Die Zeitungen“ ist der Plural von „die Zeitung“.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil isim -en çoğulu alır ve artikel yine die kalır: die Zeitungen.",
      },
      {
        kind: "truefalse",
        text: "„Wir haben ein Kinder.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„ein“ın çoğulu yoktur; doğrusu „Wir haben Kinder.“",
      },
    ],
  },
];

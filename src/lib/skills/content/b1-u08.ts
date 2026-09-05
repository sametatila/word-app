import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 8 — "Seçenek, anlatı, ilgi cümlesi" (dersler 29–32).
 *
 * Dersler: entweder … oder · Eine Geschichte erzählen · Relativsatz (Nominativ)
 * · Relativsatz (Akkusativ).
 *
 * Ünitenin ağırlık merkezi İLGİ CÜMLESİ ve bu Türkçe konuşan için sıradan bir
 * dilbilgisi konusu değil: Türkçede ilgi ZAMİRİ yoktur, sıfat-fiil vardır
 * ("bana yardım eden adam"). Yani öğrenci yeni bir sözcük değil, yeni bir
 * CÜMLE TÜRÜ öğreniyor ve dayanacağı bir Türkçe kalıp yok. Zamirin hâli de
 * ana cümleden değil YAN cümledeki görevinden geliyor — ikinci tuzak bu.
 *   der Mann, DER mir geholfen hat   (yan cümlenin öznesi → Nominativ)
 *   der Mann, DEN ich gesehen habe   (yan cümlenin nesnesi → Akkusativ)
 * İkinci ayrım sondern: Türkçe "ama" hem aber hem sondern'i karşılıyor,
 * Almanca ise OLUMSUZDAN sonra düzeltme geliyorsa sondern zorunlu kılıyor.
 *
 * Yeni 32 kelime: die Alternative, vegetarisch, auswählen, sondern, dagegen,
 * der Typ, eher, genauso, geschehen, retten, verschwinden, erfahren,
 * die Wahrheit, plötzlich, die Tat, die Freude, zuverlässig, neugierig,
 * der Eindruck, höflich, fröhlich, das Verhalten, auffallen, die Bekannte,
 * der Roman, drehen, berühren, die Rolle, die Szene, das Publikum,
 * die Schauspielerin, der Zuschauer.
 */
export const b1U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u8-r1",
    level: "B1",
    skill: "reading",
    unit: 8,
    title: "Entweder Fleisch oder nicht",
    genre: "Kantin duyurusu ve yorum",
    intro: "Bir yemekhane iki seçenek sunuyor. Kim neyi neden seçiyor?",
    minutes: 5,
    gloss: [
      { de: "die Alternative", tr: "seçenek", en: "alternative" },
      { de: "auswählen", tr: "seçmek", en: "to select" },
      { de: "vegetarisch", tr: "etsiz", en: "vegetarian" },
      { de: "dagegen", tr: "buna karşılık", en: "on the other hand" },
      { de: "eher", tr: "daha çok", en: "rather" },
    ],
    text:
      "Ab Montag gibt es bei uns täglich zwei Gerichte: entweder ein Gericht mit Fleisch " +
      "oder eine vegetarische Alternative. Sie wählen morgens aus, damit die Küche " +
      "rechtzeitig planen kann.\n\n" +
      "Warum diese Änderung? Bisher gab es nur ein Gericht. Wer kein Fleisch isst, " +
      "musste sich etwas mitbringen. Das war nicht richtig, sondern einfach bequem für uns.\n\n" +
      "Notiz von Katrin: Ich esse eher wenig Fleisch, deshalb finde ich das klasse. " +
      "Mein Kollege dagegen sagt, der Typ Mensch, der jeden Tag Fleisch will, wird " +
      "jetzt weniger Auswahl haben. Das ist aber falsch: es sind genauso zwei " +
      "Gerichte wie vorher, nur anders.\n\n" +
      "Übrigens: Wer nichts auswählt, bekommt automatisch das vegetarische Essen. " +
      "Das ist kein Problem, sondern eine einfache Regel.",
    questions: [
      {
        text: "Was gibt es ab Montag?",
        options: ["Nur vegetarisches Essen", "Zwei Gerichte zur Auswahl", "Kein Essen mehr"],
        answer: 1,
        explain: "„… entweder ein Gericht mit Fleisch oder eine vegetarische Alternative.“",
      },
      {
        text: "Warum sollen die Leute morgens auswählen?",
        options: ["Damit die Küche planen kann", "Weil es billiger ist", "Weil es Vorschrift ist"],
        answer: 0,
        explain: "„Sie wählen morgens aus, damit die Küche rechtzeitig planen kann.“",
      },
      {
        text: "Was bekommt jemand, der nichts auswählt?",
        options: ["Gar nichts", "Das Gericht mit Fleisch", "Das vegetarische Essen"],
        answer: 2,
        explain: "„Wer nichts auswählt, bekommt automatisch das vegetarische Essen.“",
      },
      {
        kind: "gapfill",
        text: "Das war nicht richtig, ___ einfach bequem für uns.",
        options: [],
        answer: 0,
        accept: ["sondern"],
        explain: "Olumsuzdan sonra düzeltme geliyor: „sondern“ — burada „aber“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag beginnt die neue Regel?",
        options: [],
        answer: 0,
        accept: ["am Montag", "Montag", "ab Montag"],
        explain: "„Ab Montag gibt es bei uns täglich zwei Gerichte …“",
      },
    ],
  },
  {
    id: "b1-u8-r2",
    level: "B1",
    skill: "reading",
    unit: 8,
    title: "Der Mann, der nicht wartete",
    genre: "Kısa öykü",
    intro: "Kısa bir öykü. Her ilgi cümlesinde zamirin kimi gösterdiğine dikkat et.",
    minutes: 6,
    gloss: [
      { de: "geschehen", tr: "olmak / vuku bulmak", en: "to happen" },
      { de: "retten", tr: "kurtarmak", en: "to rescue" },
      { de: "verschwinden", tr: "kaybolmak", en: "to disappear" },
      { de: "die Wahrheit", tr: "gerçek", en: "truth" },
      { de: "die Tat", tr: "eylem", en: "deed" },
    ],
    text:
      "Es geschah an einem Dienstag im November. Eine Frau, die jeden Morgen den gleichen " +
      "Zug nahm, verlor auf dem Bahnsteig ihre Tasche. Darin waren ihre Papiere und " +
      "das Geld für die Miete.\n\n" +
      "Ein Mann, den sie nie vorher gesehen hatte, lief plötzlich los. Er holte die " +
      "Tasche, die schon fast im Zug verschwunden war, und gab sie ihr zurück. " +
      "Danach stieg er ein, ohne ein Wort zu sagen.\n\n" +
      "Die Frau, die vor Freude kaum sprechen konnte, erfuhr seinen Namen nie. " +
      "Sie schrieb später einen Brief an die Zeitung, damit die Leute die Wahrheit " +
      "erfahren: es gibt sie noch, diese kleinen Taten.\n\n" +
      "Der Mann, den die ganze Stadt danach suchte, meldete sich nicht. Ein Bekannter " +
      "meinte, er sei einfach so ein Typ. Wer jemanden rettet, tut es nicht für die " +
      "Zeitung, sondern weil es richtig ist.",
    questions: [
      {
        text: "Was verlor die Frau?",
        options: ["Ihren Zug", "Ihre Tasche", "Ihre Papiere allein"],
        answer: 1,
        explain: "„… verlor auf dem Bahnsteig ihre Tasche.“",
      },
      {
        text: "Was tat der Mann?",
        options: ["Er rief die Polizei", "Er holte die Tasche zurück", "Er stieg sofort ein"],
        answer: 1,
        explain: "„Er holte die Tasche … und gab sie ihr zurück.“",
      },
      {
        text: "Warum schrieb die Frau an die Zeitung?",
        options: ["Damit die Leute die Wahrheit erfahren", "Um Geld zu bekommen", "Um sich zu beschweren"],
        answer: 0,
        explain: "„Sie schrieb später einen Brief an die Zeitung, damit die Leute die Wahrheit erfahren …“",
      },
      {
        kind: "gapfill",
        text: "Ein Mann, ___ sie nie vorher gesehen hatte, lief plötzlich los.",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "Zamir yan cümlenin NESNESİ (sie hatte IHN gesehen) → Akkusativ: „den“.",
      },
      {
        kind: "short_answer",
        text: "An welchem Wochentag geschah es?",
        options: [],
        answer: 0,
        accept: ["an einem Dienstag", "Dienstag", "am Dienstag"],
        explain: "„Es geschah an einem Dienstag im November.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u8-l1",
    level: "B1",
    skill: "listening",
    unit: 8,
    title: "Entweder heute oder gar nicht",
    genre: "Karar konuşması",
    intro: "İki arkadaş iki seçenek arasında kalıyor. Hangisi neden eleniyor?",
    minutes: 4,
    gloss: [
      { de: "die Alternative", tr: "seçenek", en: "alternative" },
      { de: "genauso", tr: "aynı şekilde", en: "just as" },
      { de: "eher", tr: "daha çok", en: "rather" },
      { de: "der Eindruck", tr: "izlenim", en: "impression" },
    ],
    segments: [
      { text: "Also, entweder gehen wir heute ins Kino oder wir lassen es ganz." },
      { text: "Wieso denn? Nächste Woche geht doch auch." },
      { text: "Nächste Woche läuft der Film nicht mehr. Eine andere Alternative gibt es nicht." },
      { text: "Dann heute. Aber eher spät, ich habe bis sechs zu tun." },
      { text: "Um neun? Das Kino ist dann genauso voll, aber wir bekommen noch Plätze." },
      { text: "Gut. Ich hatte den Eindruck, du wolltest gar nicht." },
      { text: "Doch, ich wollte. Ich war nur nicht sicher, ob du Zeit hast." },
      { text: "Habe ich. Dann treffen wir uns um zehn vor neun." },
    ],
    questions: [
      {
        text: "Warum kann man nicht nächste Woche gehen?",
        options: ["Das Kino ist zu", "Der Film läuft nicht mehr", "Es gibt keine Plätze"],
        answer: 1,
        explain: "„Nächste Woche läuft der Film nicht mehr.“",
      },
      {
        text: "Wann treffen sich die beiden?",
        options: ["Um zehn vor neun", "Um sechs", "Um elf"],
        answer: 0,
        explain: "„Dann treffen wir uns um zehn vor neun.“",
      },
      {
        text: "Welchen Eindruck hatte die erste Person?",
        options: ["Die andere wollte nicht", "Die andere hatte kein Geld", "Die andere war krank"],
        answer: 0,
        explain: "„Ich hatte den Eindruck, du wolltest gar nicht.“",
      },
      {
        kind: "gapfill",
        text: "___ gehen wir heute ins Kino ___ wir lassen es ganz.",
        options: [],
        answer: 0,
        accept: ["Entweder … oder", "entweder oder", "Entweder oder"],
        explain: "İki seçenekli kalıp: „entweder … oder“.",
      },
      {
        kind: "short_answer",
        text: "Bis wann hat die zweite Person zu tun?",
        options: [],
        answer: 0,
        accept: ["bis sechs", "sechs", "bis 6"],
        explain: "„Aber eher spät, ich habe bis sechs zu tun.“",
      },
    ],
  },
  {
    id: "b1-u8-l2",
    level: "B1",
    skill: "listening",
    unit: 8,
    title: "Nach dem Theater",
    genre: "Oyun sonrası sohbet",
    intro: "İki kişi bir oyunu konuşuyor. Kim neyi beğendi, kim neyi beğenmedi?",
    minutes: 4,
    gloss: [
      { de: "die Rolle", tr: "rol", en: "role" },
      { de: "die Szene", tr: "sahne", en: "scene" },
      { de: "berühren", tr: "duygulandırmak", en: "to move" },
      { de: "das Publikum", tr: "seyirci", en: "audience" },
    ],
    segments: [
      { text: "Und? Wie fandest du das Stück?" },
      { text: "Die Szene am Ende hat mich wirklich berührt." },
      { text: "Mich auch. Die Schauspielerin, die die Mutter spielt, ist unglaublich." },
      { text: "Ja. Die Rolle, die sie da hat, ist gar nicht einfach." },
      { text: "Das Publikum war übrigens sehr still. Das sagt schon viel." },
      { text: "Ja. Nur der Anfang war mir zu lang." },
      { text: "Mir auch. Aber die Geschichte kommt aus einem Roman, den ich gelesen habe." },
      { text: "Dann leihst du ihn mir mal. Ich bin neugierig." },
    ],
    questions: [
      {
        text: "Was hat die zweite Person berührt?",
        options: ["Der Anfang", "Die Szene am Ende", "Die Musik"],
        answer: 1,
        explain: "„Die Szene am Ende hat mich wirklich berührt.“",
      },
      {
        text: "Was sagen die beiden über den Anfang?",
        options: ["Er war zu lang", "Er war zu kurz", "Er war der beste Teil"],
        answer: 0,
        explain: "„Nur der Anfang war mir zu lang.“ — „Mir auch.“",
      },
      {
        text: "Woher kommt die Geschichte?",
        options: ["Aus einem Film", "Aus einem Roman", "Aus einer Zeitung"],
        answer: 1,
        explain: "„… die Geschichte kommt aus einem Roman, den ich gelesen habe.“",
      },
      {
        kind: "gapfill",
        text: "Die Schauspielerin, ___ die Mutter spielt, ist unglaublich.",
        options: [],
        answer: 0,
        accept: ["die"],
        explain: "Zamir yan cümlenin ÖZNESİ (sie spielt die Mutter) → Nominativ: „die“.",
      },
      {
        kind: "short_answer",
        text: "Wen spielt die Schauspielerin?",
        options: [],
        answer: 0,
        accept: ["die Mutter", "Mutter"],
        explain: "„Die Schauspielerin, die die Mutter spielt …“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u8-w1",
    level: "B1",
    skill: "writing",
    unit: 8,
    title: "Zwei Wege, eine Wahl",
    genre: "Karşılaştırmalı not",
    intro: "İki seçeneği karşılaştır ve birini seç. Olumsuzdan sonraki düzeltmeye dikkat et.",
    minutes: 8,
    gloss: [
      { de: "die Alternative", tr: "seçenek", en: "alternative" },
      { de: "sondern", tr: "bilakis", en: "but rather" },
      { de: "auswählen", tr: "seçmek", en: "to select" },
      { de: "zuverlässig", tr: "güvenilir", en: "reliable" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ya bugün seçeriz ya da hiç.",
        answer: "Entweder wählen wir heute aus oder gar nicht.",
        hint: "„entweder“ birinci öğe ise fiil hemen arkasından gelir.",
      },
      {
        kind: "build",
        tr: "Bu ucuz değil, sadece daha güvenilir.",
        answer: "Das ist nicht billig, sondern nur zuverlässiger.",
        hint: "Olumsuzdan sonra düzeltme: sondern.",
      },
      {
        kind: "build",
        tr: "Bana yardım eden meslektaş yarın izinli.",
        answer: "Die Kollegin, die mir geholfen hat, hat morgen frei.",
        alternatives: ["Der Kollege, der mir geholfen hat, hat morgen frei."],
        hint: "Zamir yan cümlenin öznesi → Nominativ.",
      },
      {
        kind: "form",
        prompt: "Seçim kartını doldur.",
        facts: "Seçen: Katrin Weber; seçenek A: etli yemek; seçenek B: etsiz yemek; seçim: B; sebep: az et yiyor.",
        fields: [
          { label: "Name", answer: "Katrin Weber", accept: ["Katrin", "Weber"] },
          { label: "Alternative A", answer: "Gericht mit Fleisch", accept: ["mit Fleisch", "Fleisch"] },
          { label: "Alternative B", answer: "vegetarisches Gericht", accept: ["vegetarisch", "ohne Fleisch"] },
          { label: "Wahl", answer: "B", accept: ["Alternative B", "vegetarisch"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Olumsuzdan sonraki bağlacı düzelt.",
        source: "Das war nicht richtig, aber bequem für uns.",
        answer: "Das war nicht richtig, sondern bequem für uns.",
        why: "Türkçe 'ama' hem aber hem sondern'i karşılar, o yüzden ikisi de doğru görünür. Almanca ayırır: OLUMSUZ bir ifadeyi DÜZELTEN bir devam geliyorsa sondern zorunludur. 'aber' ise olumsuzu düzeltmez, ona bir çekince ekler.",
      },
    ],
  },
  {
    id: "b1-u8-w2",
    level: "B1",
    skill: "writing",
    unit: 8,
    title: "Ein Mensch, den ich kenne",
    genre: "Kişi betimlemesi",
    intro: "Tanıdığın birini anlat. Her cümlede ilgi zamirinin hâlini yan cümledeki görevinden çıkar.",
    minutes: 12,
    gloss: [
      { de: "das Verhalten", tr: "davranış", en: "behaviour" },
      { de: "auffallen", tr: "dikkat çekmek", en: "to stand out" },
      { de: "höflich", tr: "kibar", en: "polite" },
      { de: "neugierig", tr: "meraklı", en: "curious" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Dün gördüğüm kadın komşumuz.",
        answer: "Die Frau, die ich gestern gesehen habe, ist unsere Nachbarin.",
        hint: "Zamir yan cümlenin nesnesi (ich habe SIE gesehen) → Akkusativ.",
      },
      {
        kind: "build",
        tr: "Bende iz bırakan davranışı çok kibardı.",
        answer: "Das Verhalten, das mir aufgefallen ist, war sehr höflich.",
        hint: "Nötr isim, yan cümlenin öznesi → das.",
      },
      {
        kind: "free",
        prompt: "Tanıdığın bir kişiyi anlat: kim olduğunu, nasıl tanıştığınızı, hangi özelliğinin sende iz bıraktığını ve neden onu anlattığını yaz. En az üç ilgi cümlesi kullan (der/die/das ve den).",
        checklist: [
          "Kişi kim, nasıl tanışıldı — anlatılmış mı?",
          "En az üç ilgi cümlesi var mı?",
          "En az bir tanesinde zamir NESNE (den/die/das) mi?",
          "Bir karakter özelliği somut bir olayla desteklenmiş mi?",
          "Neden bu kişinin anlatıldığı söylenmiş mi?",
        ],
        minWords: 70,
        sample:
          "Ich möchte über eine Frau schreiben, die ich seit zwei Jahren kenne.\n\n" +
          "Wir haben uns in dem Kurs kennengelernt, den ich damals abends besucht habe. " +
          "Sie saß immer vorn und stellte Fragen, die sich sonst niemand traute.\n\n" +
          "Was mir aufgefallen ist, war ihr Verhalten gegenüber neuen Leuten. Einmal kam " +
          "ein Mann, der kaum ein Wort verstand. Sie hat sich neben ihn gesetzt und alles " +
          "langsam wiederholt. Das war nicht bloß höflich, sondern wirklich hilfsbereit.\n\n" +
          "Sie ist außerdem sehr neugierig und fragt viel. Manchen fällt das auf, " +
          "aber mich stört es gar nicht.\n\n" +
          "Ich schreibe über sie, weil sie mir gezeigt hat, dass eine kleine Tat reicht.",
        phrases: [
          { de: "Ich möchte über … schreiben, die/den …", tr: "… hakkında yazmak istiyorum", en: "I would like to write about …" },
          { de: "Was mir aufgefallen ist, …", tr: "Bende iz bırakan şey …", en: "What struck me …" },
          { de: "nicht nur …, sondern …", tr: "sadece … değil, …", en: "not only …, but …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İlgi zamirinin hâlini düzelt.",
        source: "Der Mann, den mir geholfen hat, war sehr höflich.",
        answer: "Der Mann, der mir geholfen hat, war sehr höflich.",
        why: "Türkçede ilgi zamiri yoktur ('bana yardım eden adam'), o yüzden hâl seçimi için dayanılacak bir kalıp yok ve ana cümledeki hâl yanlışlıkla taşınıyor. Zamirin hâli YAN cümledeki görevinden gelir: burada 'er hat mir geholfen' — yan cümlenin öznesi, yani Nominativ: der.",
      },
    ],
  },
];

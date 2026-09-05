import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 34 — "Sağlık alışkanlığı ve kuşaklar" (dersler 133–136).
 *
 * Dersler: Vorsorge im Alltag · Die Schwangerschaft · Die große Familie ·
 * Generationen.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   indem           Türkçe 'ederek / yaparak' ULAÇTIR: öznesi yoktur ve
 *                   çekilmez. Almanca aynı anlamı TAM BİR YAN CÜMLEYLE
 *                   kurar: indem + özne + çekimli fiil (sonda). Ulaç
 *                   alışkanlığı yüzünden özne ve fiil birden düşüyor.
 *   zayıf eril      der Neffe, der Kollege, der Kunde, der Mensch,
 *   isim            der Herr gibi eril isimler Nominativ DIŞINDA her
 *                   hâlde -n/-en alır. Türkçede ismin kendisi hiç
 *                   değişmediği için bu ek büsbütün atlanıyor:
 *                   "meinen Neffe" yerine "meinen Neffen".
 *
 * Yeni 32 kelime: die Gymnastik, schwitzen, das Vitamin, der Schnupfen,
 * indem, fest, halb, rein, die Schwangerschaft, die Geburt,
 * der Nachwuchs, die Erziehung, das Ehepaar, die Scheidung, mitten,
 * sowieso, der Enkel, die Enkelin, der Neffe, die Nichte, der Cousin,
 * die Cousine, der Onkel, die Tante, die Generation, die Jugend,
 * der Krieg, die Jugendliche, zerstören, die Verwandte, der Tod, verraten.
 */
export const b1U34: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u34-r1",
    level: "B1",
    skill: "reading",
    unit: 34,
    title: "Gesund bleiben im Alltag",
    genre: "Sağlık rehberi",
    intro: "Gündelik korunma. Neyi nasıl yaparak?",
    minutes: 5,
    gloss: [
      { de: "die Gymnastik", tr: "jimnastik", en: "gymnastics" },
      { de: "schwitzen", tr: "terlemek", en: "to sweat" },
      { de: "das Vitamin", tr: "vitamin", en: "vitamin" },
      { de: "der Schnupfen", tr: "nezle", en: "cold" },
      { de: "indem", tr: "-erek / -arak", en: "by (doing)" },
    ],
    text:
      "Man bleibt gesund, indem man kleine Dinge regelmäßig macht — nicht, " +
      "indem man einmal im Jahr alles ändert.\n\n" +
      "Zehn Minuten Gymnastik am Morgen reichen. Sie müssen dabei nicht " +
      "schwitzen; wichtiger ist, dass Sie es jeden Tag machen. Wer sich " +
      "fest vornimmt, eine Stunde zu laufen, hört nach zwei Wochen auf.\n\n" +
      "Beim Essen gilt dasselbe. Sie brauchen kein Vitamin aus der " +
      "Apotheke, wenn Sie täglich Gemüse essen. Im Winter ist ein " +
      "Schnupfen sowieso normal — er kommt und geht, und ein halber Tag " +
      "Ruhe hilft mehr als eine Tablette.\n\n" +
      "Mitten im Alltag ist das schwer, das wissen wir alle. Aber Sie " +
      "gewinnen nichts, indem Sie sich zu viel vornehmen. Fangen Sie mit " +
      "einer Sache an, und zwar heute.",
    questions: [
      {
        text: "Wie bleibt man laut Text gesund?",
        options: ["Durch kleine, regelmäßige Dinge", "Durch eine große Änderung im Jahr", "Durch Vitamine"],
        answer: 0,
        explain: "„Man bleibt gesund, indem man kleine Dinge regelmäßig macht …“",
      },
      {
        text: "Wie lange soll die Gymnastik dauern?",
        options: ["Zehn Minuten", "Eine Stunde", "Einen halben Tag"],
        answer: 0,
        explain: "„Zehn Minuten Gymnastik am Morgen reichen.“",
      },
      {
        text: "Was hilft bei einem Schnupfen mehr als eine Tablette?",
        options: ["Ein halber Tag Ruhe", "Gymnastik", "Ein Vitamin"],
        answer: 0,
        explain: "„… ein halber Tag Ruhe hilft mehr als eine Tablette.“",
      },
      {
        kind: "gapfill",
        text: "Man bleibt gesund, ___ man kleine Dinge regelmäßig macht.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "Türkçedeki '-erek' burada tam bir yan cümledir: indem + özne + fiil.",
      },
      {
        kind: "short_answer",
        text: "Womit soll man anfangen?",
        options: [],
        answer: 0,
        accept: ["mit einer Sache", "einer Sache", "eine Sache"],
        explain: "„Fangen Sie mit einer Sache an, und zwar heute.“",
      },
    ],
  },
  {
    id: "b1-u34-r2",
    level: "B1",
    skill: "reading",
    unit: 34,
    title: "Drei Generationen",
    genre: "Aile yazısı",
    intro: "Üç kuşak bir arada. Kim neyi hatırlıyor, kim neyi anlatmıyor?",
    minutes: 5,
    gloss: [
      { de: "die Generation", tr: "kuşak", en: "generation" },
      { de: "der Krieg", tr: "savaş", en: "war" },
      { de: "zerstören", tr: "yıkmak", en: "to destroy" },
      { de: "die Jugend", tr: "gençlik", en: "youth" },
      { de: "der Tod", tr: "ölüm", en: "death" },
    ],
    text:
      "Mein Großvater hat über den Krieg nie geredet. Erst als er über " +
      "achtzig war, hat er meinem Neffen zwei Sätze erzählt, an einem " +
      "Nachmittag im Garten.\n\n" +
      "Seine Jugend war zerstört, das wusste die ganze Familie. Aber die " +
      "Einzelheiten kannte niemand. Er hat nichts verraten, auch meiner " +
      "Tante nicht, und sie war seine Lieblingstochter.\n\n" +
      "Meine Generation fragt anders. Wir fragen direkt, manchmal zu " +
      "direkt. Mein Cousin hat einmal ein Video gemacht, in dem er meinen " +
      "Onkel eine Stunde lang gefragt hat. Der Onkel hat mitgemacht — " +
      "und danach eine Woche nicht angerufen.\n\n" +
      "Nach dem Tod meines Großvaters haben wir Briefe gefunden. Darin " +
      "stand mehr als in achtzig Jahren Gespräch. Vielleicht ist das " +
      "die Antwort: manche Dinge sagt man nicht, indem man redet.",
    questions: [
      {
        text: "Worüber hat der Großvater nie geredet?",
        options: ["Über den Krieg", "Über die Familie", "Über den Garten"],
        answer: 0,
        explain: "„Mein Großvater hat über den Krieg nie geredet.“",
      },
      {
        text: "Wer hat die zwei Sätze gehört?",
        options: ["Die Tante", "Der Neffe", "Der Cousin"],
        answer: 1,
        explain: "„… hat er meinem Neffen zwei Sätze erzählt …“",
      },
      {
        text: "Was wurde nach seinem Tod gefunden?",
        options: ["Ein Video", "Briefe", "Fotos"],
        answer: 1,
        explain: "„Nach dem Tod meines Großvaters haben wir Briefe gefunden.“",
      },
      {
        kind: "gapfill",
        text: "Mein Cousin hat ein Video gemacht, in dem er meinen ___ gefragt hat.",
        options: [],
        answer: 0,
        accept: ["Onkel"],
        explain: "„der Onkel“ zayıf isim DEĞİLDİR, ek almaz — ama „Neffe“ alır.",
      },
      {
        kind: "short_answer",
        text: "Was hat der Onkel nach dem Video gemacht?",
        options: [],
        answer: 0,
        accept: ["eine Woche nicht angerufen", "nicht angerufen", "eine Woche nichts"],
        explain: "„Der Onkel hat mitgemacht — und danach eine Woche nicht angerufen.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u34-l1",
    level: "B1",
    skill: "listening",
    unit: 34,
    title: "Bald zu dritt",
    genre: "Aile konuşması",
    intro: "Bir doğum yaklaşıyor. Ne planlanıyor, ne değişiyor?",
    minutes: 4,
    gloss: [
      { de: "die Schwangerschaft", tr: "gebelik", en: "pregnancy" },
      { de: "die Geburt", tr: "doğum", en: "birth" },
      { de: "der Nachwuchs", tr: "yeni gelen", en: "offspring", note: "aileye katılan bebek" },
      { de: "die Erziehung", tr: "çocuk yetiştirme", en: "upbringing" },
    ],
    segments: [
      { text: "Wie geht es dir in der Schwangerschaft?" },
      { text: "Besser als im dritten Monat. Ich schlafe wieder." },
      { text: "Und wann ist die Geburt?" },
      { text: "Mitten im März. Wir sind fast fertig mit dem Zimmer. Der Nachwuchs bekommt das kleine Zimmer." },
      { text: "Arbeitet ihr beide weiter?" },
      { text: "Halb. Ich bleibe ein Jahr, mein Mann sechs Monate." },
      { text: "Das ist gut. Erziehung ist nicht die Arbeit von einer Person." },
      { text: "Genau. Wir schaffen das, indem wir uns abwechseln." },
    ],
    questions: [
      {
        text: "Wie geht es ihr jetzt?",
        options: ["Besser als im dritten Monat", "Schlechter", "Genauso"],
        answer: 0,
        explain: "„Besser als im dritten Monat. Ich schlafe wieder.“",
      },
      {
        text: "Wann ist die Geburt?",
        options: ["Mitten im März", "Im Januar", "Im Sommer"],
        answer: 0,
        explain: "„Mitten im März. Wir sind fast fertig mit dem Zimmer.“",
      },
      {
        text: "Wie lange bleibt der Mann zu Hause?",
        options: ["Ein Jahr", "Sechs Monate", "Gar nicht"],
        answer: 1,
        explain: "„Ich bleibe ein Jahr, mein Mann sechs Monate.“",
      },
      {
        kind: "gapfill",
        text: "Wir schaffen das, ___ wir uns abwechseln.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "Nasıl sorusunun cevabı → indem yan cümlesi, fiil sonda.",
      },
      {
        kind: "short_answer",
        text: "Was ist fast fertig?",
        options: [],
        answer: 0,
        accept: ["das Zimmer", "Zimmer"],
        explain: "„Wir sind fast fertig mit dem Zimmer.“",
      },
    ],
  },
  {
    id: "b1-u34-l2",
    level: "B1",
    skill: "listening",
    unit: 34,
    title: "Wer kommt alles?",
    genre: "Aile planı",
    intro: "Bir aile buluşması planlanıyor. Kim geliyor?",
    minutes: 4,
    gloss: [
      { de: "der Neffe", tr: "yeğen", en: "nephew", note: "erkek biçimi" },
      { de: "die Nichte", tr: "yeğen", en: "niece", note: "kız biçimi" },
      { de: "der Enkel", tr: "torun", en: "grandson" },
      { de: "die Cousine", tr: "kuzen", en: "cousin", note: "kız biçimi" },
    ],
    segments: [
      { text: "Wer kommt am Sonntag alles?" },
      { text: "Meine Tante, mein Onkel und die beiden Enkel." },
      { text: "Und die Kinder deiner Schwester?" },
      { text: "Meinen Neffen bringe ich mit, die Nichte ist krank." },
      { text: "Schade. Und deine Cousine aus Wien?" },
      { text: "Die kommt nicht, sie hat sowieso nie Zeit." },
      { text: "Dann sind wir elf. Ich sage der Küche Bescheid." },
      { text: "Zwölf. Meinen Cousin habe ich vergessen." },
    ],
    questions: [
      {
        text: "Wer kommt auf jeden Fall?",
        options: ["Tante, Onkel und die Enkel", "Nur die Enkel", "Die Cousine"],
        answer: 0,
        explain: "„Meine Tante, mein Onkel und die beiden Enkel.“",
      },
      {
        text: "Warum kommt die Nichte nicht?",
        options: ["Sie ist krank", "Sie hat keine Zeit", "Sie ist verreist"],
        answer: 0,
        explain: "„Meinen Neffen bringe ich mit, die Nichte ist krank.“",
      },
      {
        text: "Wie viele sind es am Ende?",
        options: ["Elf", "Zwölf", "Zehn"],
        answer: 1,
        explain: "„Zwölf. Meinen Cousin habe ich vergessen.“",
      },
      {
        kind: "gapfill",
        text: "Meinen ___ bringe ich mit, die Nichte ist krank.",
        options: [],
        answer: 0,
        accept: ["Neffen"],
        explain: "„der Neffe“ zayıf isimdir: Nominativ dışında -n alır.",
      },
      {
        kind: "short_answer",
        text: "Wen hat die Person vergessen?",
        options: [],
        answer: 0,
        accept: ["den Cousin", "ihren Cousin", "Cousin"],
        explain: "„Zwölf. Meinen Cousin habe ich vergessen.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u34-w1",
    level: "B1",
    skill: "writing",
    unit: 34,
    title: "Wie ich gesund bleibe",
    genre: "Alışkanlık yazısı",
    intro: "Nasıl sağlıklı kaldığını yaz. Türkçedeki '-erek' burada tam bir cümle.",
    minutes: 8,
    gloss: [
      { de: "die Gymnastik", tr: "jimnastik", en: "gymnastics" },
      { de: "das Vitamin", tr: "vitamin", en: "vitamin" },
      { de: "fest", tr: "sıkı / kesin", en: "firm" },
      { de: "sowieso", tr: "zaten", en: "anyway" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Her sabah on dakika hareket ederek sağlıklı kalıyorum.",
        answer: "Ich bleibe gesund, indem ich mich jeden Morgen zehn Minuten bewege.",
        hint: "indem + özne + fiil (sonda).",
      },
      {
        kind: "build",
        tr: "Kendine çok yükleyerek hiçbir şey kazanmazsın.",
        answer: "Du gewinnst nichts, indem du dir zu viel vornimmst.",
        hint: "Yine indem yan cümlesi.",
      },
      {
        kind: "build",
        tr: "Kışın nezle zaten normal, kesin kurallar ve vitaminler pek işe yaramıyor.",
        answer: "Im Winter ist ein Schnupfen sowieso normal, feste Regeln und Vitamine helfen wenig.",
        hint: "Zaman öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "form",
        prompt: "Alışkanlık kartını doldur.",
        facts: "Kişi: Sedef Aydın; sabah: 10 dakika jimnastik; beslenme: her gün sebze; vitamin: gerekli değil; nezle: yarım gün dinlenme.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Morgens", answer: "10 Minuten Gymnastik", accept: ["Gymnastik", "zehn Minuten"] },
          { label: "Essen", answer: "jeden Tag Gemüse", accept: ["Gemüse", "täglich Gemüse"] },
          { label: "Bei Schnupfen", answer: "ein halber Tag Ruhe", accept: ["Ruhe", "halber Tag"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Ulacı tam bir yan cümleye çevir.",
        source: "Ich bleibe gesund, indem viel Bewegung und wenig Stress.",
        answer: "Ich bleibe gesund, indem ich mich viel bewege und wenig Stress habe.",
        why: "Türkçe 'hareket ederek' ULAÇTIR: öznesi yoktur ve fiil çekilmez, o yüzden Almancada da isim öbeği bırakılıyor. Almanca aynı anlamı TAM BİR YAN CÜMLEYLE kurar: indem + özne + çekimli fiil, fiil sonda. Öznesiz 'indem' cümlesi olmaz — bu, Türkçedeki ulacın karşılığı olmadığı için en sık düşen yapı.",
      },
    ],
  },
  {
    id: "b1-u34-w2",
    level: "B1",
    skill: "writing",
    unit: 34,
    title: "Meine Familie",
    genre: "Aile betimlemesi",
    intro: "Aileni anlat. Bazı eril isimler yalın hâl dışında ek alır.",
    minutes: 12,
    gloss: [
      { de: "die Verwandte", tr: "akraba", en: "relative", note: "kadın biçimi" },
      { de: "das Ehepaar", tr: "evli çift", en: "married couple" },
      { de: "die Scheidung", tr: "boşanma", en: "divorce" },
      { de: "die Enkelin", tr: "torun", en: "granddaughter", note: "kız biçimi" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yeğenimi pazar günü getiriyorum.",
        answer: "Meinen Neffen bringe ich am Sonntag mit.",
        hint: "„der Neffe“ zayıf isim: Akkusativ'de -n.",
      },
      {
        kind: "build",
        tr: "Amcamı ve teyzemi de davet ettim.",
        answer: "Meinen Onkel und meine Tante habe ich auch eingeladen.",
        hint: "„der Onkel“ zayıf DEĞİL: ek almaz.",
      },
      {
        kind: "free",
        prompt: "Aileni anlat: kaç kişisiniz, kim nerede yaşıyor, kim kime yakın, bir kuşak farkı ya da bir değişiklik (taşınma, doğum, ayrılık) ve ailenin bir alışkanlığı. En az iki akraba adını Akkusativ ya da Dativ'de kullan.",
        checklist: [
          "Aile büyüklüğü ve yerler söylenmiş mi?",
          "En az iki akraba adı hâl ekiyle kullanılmış mı?",
          "Bir kuşak farkı ya da değişiklik anlatılmış mı?",
          "Bir aile alışkanlığı var mı?",
          "Metin bir değerlendirmeyle bitiyor mu?",
        ],
        minWords: 70,
        sample:
          "Wir sind eine große Familie: meine Eltern, drei Geschwister und " +
          "inzwischen sechs Kinder. Die meisten wohnen in der gleichen Region, " +
          "nur meine Cousine ist weiter weg.\n\n" +
          "Am nächsten Sonntag sehen wir uns alle. Meinen Neffen bringe ich " +
          "mit, meine Nichte ist leider krank. Das Ehepaar aus dem Nachbarhaus kommt mit der Enkelin, und eine Verwandte aus Berlin auch. Meinen Onkel habe ich auch " +
          "eingeladen, obwohl er seit der Scheidung fast nie kommt.\n\n" +
          "Zwischen den Generationen gibt es einen deutlichen Unterschied. " +
          "Meine Großmutter hat über schwere Dinge nie geredet. Wir fragen " +
          "direkt — manchmal zu direkt, und dann ruft jemand eine Woche " +
          "nicht an.\n\n" +
          "Eine Sache ist geblieben: am Sonntag wird gekocht, und zwar viel " +
          "zu viel. Ich glaube, wir halten die Familie zusammen, indem wir " +
          "einfach jedes Mal wieder an den gleichen Tisch kommen.",
        phrases: [
          { de: "Wir sind eine große Familie.", tr: "Biz kalabalık bir aileyiz.", en: "We are a big family." },
          { de: "Meinen Neffen bringe ich mit.", tr: "Yeğenimi getiriyorum.", en: "I'm bringing my nephew." },
          { de: "…, indem wir …", tr: "… -erek …", en: "…, by …-ing" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Zayıf eril isimlerin ekini düzelt.",
        source: "Ich habe meinen Neffe und meinen Kollege eingeladen.",
        answer: "Ich habe meinen Neffen und meinen Kollegen eingeladen.",
        why: "Türkçede ismin kendisi hiç değişmez, yalnız ek gelir ('yeğenimi'), o yüzden Almancada da artikel değiştirilip isim olduğu gibi bırakılıyor. Bazı eril isimler ise ZAYIF çekilir: der Neffe, der Kollege, der Kunde, der Mensch, der Herr, der Student — Nominativ dışında her hâlde -n ya da -en alırlar. der Onkel bu gruba GİRMEZ, o yüzden ek almaz.",
      },
    ],
  },
];

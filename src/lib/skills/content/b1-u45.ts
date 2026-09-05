import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 45 — "Kapanış" (dersler 177–180).
 *
 * Dersler: Wetterextreme · Tiere und Natur · Freizeit planen ·
 * B1-Abschluss.
 *
 * Bu B1 patikasının SON ünitesi ve iki rewrite'ı bilerek bir TEKRAR:
 * 44 ünite boyunca ölçülen aktarım hatalarının en pahalı iki sınıfını
 * son kez, bir arada çalıştırıyor.
 *   anlamı çeviren    Bir grup Almanca yapı, Türkçeden birebir
 *   Dativ kalıpları   çevrildiğinde cümleyi dilbilgisel olarak DOĞRU
 *                     bırakır ama anlamı bozar ya da tersine çevirir:
 *                     mir ist kalt (ünite 20/40), mir gefällt (17),
 *                     mir tut das Knie weh (33), untersuchen lassen (18).
 *                     Bunlar hiçbir doğrulayıcının göremeyeceği hatalar.
 *   yan cümlede       Türkçede yan cümle önde de olsa ana cümlenin sırası
 *   fiil sonda        değişmez ve yan cümlede fiil zaten sondadır — ama
 *                     kipli fiille birlikte sıra terstir. Ünite 3, 19, 33
 *                     ve 43 bunun ayrı parçalarını aldı; burada hepsi
 *                     tek metinde geçiyor.
 *
 * Yeni 32 kelime: der Donner, donnern, frieren, steil, flach, quer,
 * trocknen, wild, das Gift, giftig, fressen, die Schlange, ernähren,
 * die Biologie, künstlich, entdecken, sich verabreden, verabredet,
 * jederzeit, gratis, inklusive, einschließlich, maximal, durchschnittlich,
 * optimistisch, realistisch, zurechtkommen, erfüllen, endgültig,
 * nochmals, gleichfalls, Prost.
 */
export const b1U45: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u45-r1",
    level: "B1",
    skill: "reading",
    unit: 45,
    title: "Wenn das Wetter extrem wird",
    genre: "Uyarı metni",
    intro: "Fırtına ve dolu. Ne yapılır, ne yapılmaz?",
    minutes: 5,
    gloss: [
      { de: "der Donner", tr: "gök gürültüsü", en: "thunder" },
      { de: "frieren", tr: "üşümek / donmak", en: "to freeze" },
      { de: "steil", tr: "dik", en: "steep" },
      { de: "trocknen", tr: "kurutmak", en: "to dry" },
      { de: "wild", tr: "vahşi", en: "wild" },
    ],
    text:
      "Wenn Sie Donner hören und das Wetter wild wird, gehen Sie nicht " +
      "auf einen steilen Weg. Auf einer flachen Wiese sind Sie sicherer " +
      "als oben am Hang.\n\n" +
      "Ziehen Sie nasse Sachen aus, sobald Sie im Trockenen sind. " +
      "Wer nass bleibt, friert schnell, auch im Sommer. Nasse Kleidung " +
      "trocknet am Körper nicht — sie kühlt ihn.\n\n" +
      "Wenn Ihnen kalt wird und Sie zittern, ist das noch normal. " +
      "Gefährlich wird es, wenn das Zittern aufhört und Ihnen plötzlich " +
      "warm ist. Dann muss jemand Hilfe holen.\n\n" +
      "Und lassen Sie sich im Zweifel abholen, statt weiterzugehen. " +
      "Wer zurechtkommen will, kommt meistens auch zurecht — aber im " +
      "Sturm ist das keine Frage von Willen, sondern von Wetter.",
    questions: [
      {
        text: "Wo ist man bei Donner sicherer?",
        options: ["Auf einem steilen Weg", "Auf einer flachen Wiese", "Oben am Hang"],
        answer: 1,
        explain: "„Auf einer flachen Wiese sind Sie sicherer als oben am Hang.“",
      },
      {
        text: "Was macht nasse Kleidung am Körper?",
        options: ["Sie trocknet", "Sie kühlt den Körper", "Sie wärmt"],
        answer: 1,
        explain: "„Nasse Kleidung trocknet am Körper nicht — sie kühlt ihn.“",
      },
      {
        text: "Wann wird es gefährlich?",
        options: ["Wenn man zittert", "Wenn das Zittern aufhört und einem warm wird", "Wenn es regnet"],
        answer: 1,
        explain: "„Gefährlich wird es, wenn das Zittern aufhört und Ihnen plötzlich warm ist.“",
      },
      {
        kind: "gapfill",
        text: "Wenn ___ kalt wird und Sie zittern, ist das noch normal.",
        options: [],
        answer: 0,
        accept: ["Ihnen"],
        explain: "„kalt sein/werden“ kişiyi DATİV'e koyar: mir ist kalt, Ihnen wird kalt.",
      },
      {
        kind: "short_answer",
        text: "Was soll man im Zweifel machen?",
        options: [],
        answer: 0,
        accept: ["sich abholen lassen", "sich abholen lassen statt weiterzugehen", "abholen lassen"],
        explain: "„Und lassen Sie sich im Zweifel abholen, statt weiterzugehen.“",
      },
    ],
  },
  {
    id: "b1-u45-r2",
    level: "B1",
    skill: "reading",
    unit: 45,
    title: "Was B1 wirklich heißt",
    genre: "Kapanış yazısı",
    intro: "Bir seviyenin sonu. Ne başarıldı, ne başarılmadı?",
    minutes: 6,
    gloss: [
      { de: "erfüllen", tr: "yerine getirmek", en: "to fulfil" },
      { de: "realistisch", tr: "gerçekçi", en: "realistic" },
      { de: "zurechtkommen", tr: "başa çıkmak", en: "to cope" },
      { de: "endgültig", tr: "kesin", en: "final" },
      { de: "durchschnittlich", tr: "ortalama", en: "on average" },
    ],
    text:
      "B1 heißt nicht, dass Sie fertig sind. Es heißt, dass Sie im Alltag " +
      "zurechtkommen: beim Arzt, im Amt, mit Nachbarn, bei der Arbeit.\n\n" +
      "Realistisch gesehen können Sie jetzt etwa dreitausend Wörter. " +
      "Durchschnittlich braucht man von A1 bis hierher zwei Jahre, " +
      "manche länger. Wer sechs Monate gebraucht hat, hat meistens " +
      "achtzehn Monate lang etwas anderes dafür aufgegeben.\n\n" +
      "Was Sie noch nicht können, ist auch klar: lange Texte über " +
      "Themen, die Sie nicht kennen; schnelle Gespräche zwischen " +
      "Muttersprachlern; Witze. Das kommt auf B2 — und endgültig fertig ist man " +
      "auch dort nicht. Es kommt nur, " +
      "wenn Sie weitermachen.\n\n" +
      "Zum Schluss noch etwas. Am Anfang haben Sie jedes Wort einzeln " +
      "gelernt. Heute lesen Sie diesen Text, ohne die meisten Wörter " +
      "zu bemerken. Genau das war das Ziel — und wenn Sie das gerade " +
      "gemerkt haben, ist es erfüllt.",
    questions: [
      {
        text: "Was heißt B1 laut Text?",
        options: ["Dass man fertig ist", "Dass man im Alltag zurechtkommt", "Dass man alles versteht"],
        answer: 1,
        explain: "„Es heißt, dass Sie im Alltag zurechtkommen …“",
      },
      {
        text: "Wie lange braucht man durchschnittlich von A1 bis B1?",
        options: ["Zwei Jahre", "Sechs Monate", "Fünf Jahre"],
        answer: 0,
        explain: "„Durchschnittlich braucht man von A1 bis hierher zwei Jahre …“",
      },
      {
        text: "Was kommt erst auf B2?",
        options: ["Der Alltag", "Schnelle Gespräche und Witze", "Das Alphabet"],
        answer: 1,
        explain: "„… schnelle Gespräche zwischen Muttersprachlern; Witze. Das kommt auf B2 …“",
      },
      {
        kind: "gapfill",
        text: "Heute lesen Sie diesen Text, ___ die meisten Wörter ___ ___.",
        options: [],
        answer: 0,
        accept: ["ohne zu bemerken", "ohne / zu bemerken"],
        explain: "„ohne … zu“ + mastar — ünite 43'ün kalıbı.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Wörter kann man laut Text jetzt etwa?",
        options: [],
        answer: 0,
        accept: ["etwa dreitausend", "dreitausend", "3000"],
        explain: "„Realistisch gesehen können Sie jetzt etwa dreitausend Wörter.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u45-l1",
    level: "B1",
    skill: "listening",
    unit: 45,
    title: "Tiere im Garten",
    genre: "Doğa sohbeti",
    intro: "Bahçedeki hayvanlar konuşuluyor. Hangisi tehlikeli, hangisi değil?",
    minutes: 4,
    gloss: [
      { de: "die Schlange", tr: "yılan", en: "snake" },
      { de: "giftig", tr: "zehirli", en: "poisonous" },
      { de: "fressen", tr: "yemek", en: "to eat", note: "hayvanlar için" },
      { de: "entdecken", tr: "keşfetmek", en: "to discover" },
    ],
    segments: [
      { text: "Ich habe gestern hinter dem Haus eine Schlange entdeckt." },
      { text: "War sie giftig?" },
      { text: "Nein. Hier gibt es nur eine giftige Art, und die sieht anders aus." },
      { text: "Trotzdem: mir wäre das nicht angenehm." },
      { text: "Sie frisst Mäuse. Eigentlich hilft sie uns." },
      { text: "Das schon. Aber ich lasse den Garten trotzdem prüfen." },
      { text: "Kannst du machen. Kostet gratis, wenn du beim Amt fragst." },
      { text: "Gut zu wissen. Dann rufe ich morgen dort an." },
    ],
    questions: [
      {
        text: "Wo war die Schlange?",
        options: ["Hinter dem Haus", "Im Haus", "Auf der Straße"],
        answer: 0,
        explain: "„Ich habe gestern hinter dem Haus eine Schlange entdeckt.“",
      },
      {
        text: "War sie giftig?",
        options: ["Ja", "Nein", "Das weiß niemand"],
        answer: 1,
        explain: "„Nein. Hier gibt es nur eine giftige Art, und die sieht anders aus.“",
      },
      {
        text: "Was frisst die Schlange?",
        options: ["Mäuse", "Pflanzen", "Nichts"],
        answer: 0,
        explain: "„Sie frisst Mäuse. Eigentlich hilft sie uns.“",
      },
      {
        kind: "gapfill",
        text: "Trotzdem: ___ wäre das nicht angenehm.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "„angenehm sein“ kişiyi Dativ'e koyar — gefallen ve kalt sein gibi.",
      },
      {
        kind: "short_answer",
        text: "Was kostet nichts?",
        options: [],
        answer: 0,
        accept: ["die Prüfung beim Amt", "prüfen lassen", "wenn man beim Amt fragt"],
        explain: "„Kostet gratis, wenn du beim Amt fragst.“",
      },
    ],
  },
  {
    id: "b1-u45-l2",
    level: "B1",
    skill: "listening",
    unit: 45,
    title: "Zum Abschluss",
    genre: "Kurs sonu",
    intro: "Kurs bitiyor. Sonra ne olacak?",
    minutes: 4,
    gloss: [
      { de: "sich verabreden", tr: "sözleşmek", en: "to arrange to meet" },
      { de: "jederzeit", tr: "her zaman", en: "any time" },
      { de: "nochmals", tr: "bir kez daha", en: "once again" },
      { de: "gleichfalls", tr: "size de", en: "likewise" },
    ],
    segments: [
      { text: "Das war die letzte Stunde. Wie geht es bei euch weiter?" },
      { text: "Ich mache im Herbst B2. Vorher brauche ich eine Pause." },
      { text: "Verständlich. Und du?" },
      { text: "Ich weiß es noch nicht endgültig. Erst mal weiterlesen." },
      { text: "Wir könnten uns einmal im Monat verabreden und nur reden." },
      { text: "Gute Idee. Ihr könnt mich jederzeit fragen, ich helfe gern." },
      { text: "Danke nochmals für alles. Wirklich." },
      { text: "Gleichfalls. Es hat mir mit euch Spaß gemacht." },
    ],
    questions: [
      {
        text: "Was macht die erste Person im Herbst?",
        options: ["B2", "Eine Reise", "Nichts"],
        answer: 0,
        explain: "„Ich mache im Herbst B2. Vorher brauche ich eine Pause.“",
      },
      {
        text: "Was schlägt jemand vor?",
        options: ["Einmal im Monat treffen und reden", "Einen neuen Kurs", "Ein Buch lesen"],
        answer: 0,
        explain: "„Wir könnten uns einmal im Monat verabreden und nur reden.“",
      },
      {
        text: "Was sagt die Lehrerin am Ende?",
        options: ["Sie hat keine Zeit", "Es hat ihr Spaß gemacht", "Sie hört auf"],
        answer: 1,
        explain: "„Gleichfalls. Es hat mir mit euch Spaß gemacht.“",
      },
      {
        kind: "gapfill",
        text: "Es hat ___ mit euch Spaß gemacht.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "„Spaß machen“ da kişiyi Dativ'e koyar: es macht mir Spaß.",
      },
      {
        kind: "short_answer",
        text: "Wie oft wollen sie sich treffen?",
        options: [],
        answer: 0,
        accept: ["einmal im Monat", "einmal pro Monat"],
        explain: "„Wir könnten uns einmal im Monat verabreden …“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u45-w1",
    level: "B1",
    skill: "writing",
    unit: 45,
    title: "Eine Warnung schreiben",
    genre: "Uyarı metni",
    intro: "Bir uyarı yaz. Bu kalıplarda kişi özne değil, Dativ'dir.",
    minutes: 8,
    gloss: [
      { de: "das Gift", tr: "zehir", en: "poison" },
      { de: "künstlich", tr: "yapay", en: "artificial" },
      { de: "quer", tr: "çapraz", en: "across" },
      { de: "maximal", tr: "en çok", en: "at most" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üşürseniz ıslak şeyleri çıkarın.",
        answer: "Wenn Ihnen kalt wird, ziehen Sie nasse Sachen aus; künstliche Kleidung trocknet schneller.",
        hint: "„kalt werden“ kişiyi Dativ'e koyar.",
      },
      {
        kind: "build",
        tr: "Şüphedeyseniz kendinizi aldırın.",
        answer: "Lassen Sie sich im Zweifel abholen.",
        hint: "Ettirgen lassen — ünite 18.",
      },
      {
        kind: "build",
        tr: "Yolu en çok iki kişi çapraz geçsin.",
        answer: "Maximal zwei Personen sollen den Weg quer überqueren, und Beeren mit Gift lassen Sie stehen.",
        hint: "Sayı zarfı öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "form",
        prompt: "Uyarı kartını doldur.",
        facts: "Tehlike: fırtına; kaçınılacak: dik yol; yapılacak: düz alan, ıslak kıyafeti çıkar; tehlike işareti: titreme durunca; son çare: yardım çağır.",
        fields: [
          { label: "Gefahr", answer: "Sturm", accept: ["Donner", "der Sturm"] },
          { label: "Meiden", answer: "steiler Weg", accept: ["steile Wege", "der Hang"] },
          { label: "Tun", answer: "nasse Sachen ausziehen", accept: ["ausziehen", "flache Wiese"] },
          { label: "Alarmzeichen", answer: "Zittern hört auf", accept: ["kein Zittern mehr", "plötzlich warm"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Kişinin hâlini düzelt — bu kalıplarda özne değildir.",
        source: "Ich bin kalt, das Knie tut mich weh und ich gefalle dieser Weg nicht.",
        answer: "Mir ist kalt, das Knie tut mir weh und dieser Weg gefällt mir nicht.",
        why: "Bu, 45 ünitede en çok tekrar eden hata sınıfının özeti. Türkçede bu cümlelerin hepsinde özne KİŞİDİR ('üşüyorum', 'dizim ağrıyor', 'bu yolu beğenmiyorum'), o yüzden Almancada da 'ich' özne yapılıyor. Almancada kişi DATİV'e geçer ve özne başka bir şeydir: mir ist kalt, mir tut das Knie weh, mir gefällt der Weg. Aynı kalıp mir ist langweilig, mir macht es Spaß, mir wäre das nicht angenehm için de geçerli.",
      },
    ],
  },
  {
    id: "b1-u45-w2",
    level: "B1",
    skill: "writing",
    unit: 45,
    title: "Mein B1-Rückblick",
    genre: "Kapanış yazısı",
    intro: "B1'i kapat. Yan cümlelerde fiilin yerini son kez sınayalım.",
    minutes: 12,
    gloss: [
      { de: "zurechtkommen", tr: "başa çıkmak", en: "to cope" },
      { de: "erfüllen", tr: "yerine getirmek", en: "to fulfil" },
      { de: "optimistisch", tr: "iyimser", en: "optimistic" },
      { de: "endgültig", tr: "kesin", en: "final" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Erken başlamam gerektiği için sabahları çalıştım.",
        answer: "Weil ich früh anfangen musste, habe ich morgens gelernt.",
        hint: "Yan cümlede asıl fiil, sonra kipli fiil; ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Şimdi gündelik hayatta başa çıkabildiğimi biliyorum.",
        answer: "Ich weiß jetzt endgültig, dass ich im Alltag zurechtkomme und meine Aufgaben erfüllen kann.",
        hint: "dass yan cümlesinde fiil sonda; ayrılabilen fiil bütün kalır.",
      },
      {
        kind: "free",
        prompt: "B1 yolculuğunu kapat: nereden başladın, en zor ne oldu, ne zaman ilk kez 'oldu' dedin, şimdi neyi yapabiliyorsun ve neyi hâlâ yapamıyorsun, ve bundan sonra ne yapacaksın. En az üç yan cümle kullan ve fiilleri doğru yere koy.",
        checklist: [
          "Başlangıç noktası anlatılmış mı?",
          "En zor şey somut mu?",
          "Bir dönüm anı var mı?",
          "Hem yapabildiğin hem yapamadığın söylenmiş mi?",
          "En az üç yan cümlede fiil doğru yerde mi?",
        ],
        minWords: 80,
        sample:
          "Angefangen habe ich vor zwei Jahren mit A1, ohne ein Wort " +
          "zu kennen. Weil ich damals voll arbeiten musste, habe ich " +
          "morgens vor der Schicht gelernt, zwanzig Minuten lang.\n\n" +
          "Am schwersten war für mich nicht die Grammatik, sondern das " +
          "Reden. Ich habe monatelang alles im Kopf übersetzt, und wenn " +
          "ich endlich fertig war, war das Gespräch schon weiter.\n\n" +
          "Der Moment kam im letzten Winter beim Arzt. Ich habe erklärt, " +
          "was mir weh tut, und erst danach gemerkt, dass ich nicht " +
          "übersetzt hatte. Seitdem weiß ich, dass ich im Alltag " +
          "zurechtkomme.\n\n" +
          "Was ich noch nicht kann, ist auch klar: schnelle Gespräche " +
          "zwischen mehreren Leuten, und Witze verstehe ich meistens " +
          "zwei Sekunden zu spät.\n\n" +
          "Im Herbst fange ich mit B2 an. Realistisch gesehen dauert das " +
          "wieder lange — aber diesmal bin ich optimistisch, weil ich " +
          "weiß, dass es geht.",
        phrases: [
          { de: "Angefangen habe ich vor zwei Jahren.", tr: "İki yıl önce başladım.", en: "I started two years ago." },
          { de: "Am schwersten war für mich …", tr: "Benim için en zoru … idi.", en: "The hardest thing for me was …" },
          { de: "Seitdem weiß ich, dass …", tr: "O zamandan beri biliyorum ki …", en: "Since then I know that …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yan cümlelerdeki fiil sırasını düzelt.",
        source: "Weil ich musste früh anfangen, ich habe morgens gelernt, und ich weiß, dass ich komme im Alltag zurecht.",
        answer: "Weil ich früh anfangen musste, habe ich morgens gelernt, und ich weiß, dass ich im Alltag zurechtkomme.",
        why: "Bu da bir özet: 45 ünite boyunca üç ayrı yerde ölçülen tek bir kural. Yan cümlede çekimli fiil EN SONA gider (ünite 3); yanında bir kipli fiil varsa asıl fiil önce, kipli fiil en sonda (ünite 19); ayrılabilen fiil yan cümlede AYRILMAZ, bütün kalır (zurechtkomme). Ve yan cümle önde olduğunda ana cümle fiille başlar (ünite 33).",
      },
    ],
  },
];

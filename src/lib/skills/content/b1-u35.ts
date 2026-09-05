import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 35 — "Bakım, emeklilik, bırakmak" (dersler 137–140).
 *
 * Dersler: Pflege zu Hause · In Pension · Beim Friseur ·
 * Das Sucht-Gespräch.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   aufhören mit /  Türkçe 'sigarayı bıraktım' der: nesne doğrudan gelir.
 *   aufhören zu     Almanca iki yoldan birini ister — mit + Dativ
 *                   ("mit dem Rauchen aufhören") ya da zu'lu mastar
 *                   ("aufhören zu rauchen"). Doğrudan nesne olmaz.
 *   isimleşmiş      Türkçede mastar zaten isim gibi kullanılır ('okumak
 *   mastar          güzeldir') ve yazımı değişmez. Almanca mastarı
 *                   isimleştirdiğinde BÜYÜK harfle yazar ve das verir:
 *                   das Rauchen, beim Anziehen, zum Aufstehen.
 *
 * Yeni 32 kelime: die Betreuung, der Betreuer, der Pfleger,
 * der Krankenpfleger, das Altenheim, die Senioren, der Halt, die Liste,
 * der Pensionist, die Pension, selber, aufhalten, ziehen, die Badewanne,
 * Achtung, die Ordination, der Friseur, die Friseurin, die Frisur,
 * der Bart, die Bürste, die Zahnbürste, der Salon, die Drogerie,
 * die Droge, das Suchtmittel, der Raucher, der Nichtraucher, betrunken,
 * sich verstecken, fangen, das Opfer.
 */
export const b1U35: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u35-r1",
    level: "B1",
    skill: "reading",
    unit: 35,
    title: "Pflege zu Hause",
    genre: "Bilgilendirme metni",
    intro: "Evde bakım nasıl düzenlenir? Hangi iş kime?",
    minutes: 5,
    gloss: [
      { de: "die Betreuung", tr: "bakım", en: "care" },
      { de: "der Pfleger", tr: "bakıcı", en: "carer" },
      { de: "das Altenheim", tr: "huzurevi", en: "care home" },
      { de: "die Badewanne", tr: "küvet", en: "bathtub" },
      { de: "der Halt", tr: "tutamak / destek", en: "support" },
    ],
    text:
      "Die meisten Menschen wollen zu Hause bleiben, nicht ins Altenheim. " +
      "Das geht länger, als viele denken — aber nur, wenn man früh plant.\n\n" +
      "Das Schwierigste ist fast nie das Kochen. Schwierig sind das Aufstehen, " +
      "das Anziehen und vor allem das Waschen. Ein Halt an der Badewanne " +
      "kostet wenig und ändert sehr viel.\n\n" +
      "Eine Betreuung muss nicht rund um die Uhr da sein. Oft reichen zwei " +
      "Stunden am Morgen, wenn ein Pfleger beim Anziehen hilft und danach " +
      "eine Liste für den Tag hinterlässt.\n\n" +
      "Sprechen Sie früh mit der Familie darüber, auch wenn niemand will. " +
      "Wer erst anfängt zu planen, wenn nichts mehr geht, hat keine Wahl " +
      "mehr — und dann entscheidet die Lage, nicht der Mensch.",
    questions: [
      {
        text: "Wo wollen die meisten Menschen bleiben?",
        options: ["Im Altenheim", "Zu Hause", "Bei der Familie"],
        answer: 1,
        explain: "„Die meisten Menschen wollen zu Hause bleiben, nicht ins Altenheim.“",
      },
      {
        text: "Was ist laut Text am schwierigsten?",
        options: ["Das Kochen", "Aufstehen, Anziehen und Waschen", "Das Einkaufen"],
        answer: 1,
        explain: "„Schwierig sind das Aufstehen, das Anziehen und vor allem das Waschen.“",
      },
      {
        text: "Wie viel Betreuung reicht oft?",
        options: ["Rund um die Uhr", "Zwei Stunden am Morgen", "Ein Tag pro Woche"],
        answer: 1,
        explain: "„Oft reichen zwei Stunden am Morgen …“",
      },
      {
        kind: "gapfill",
        text: "Schwierig sind das ___, das ___ und vor allem das Waschen.",
        options: [],
        answer: 0,
        accept: ["Aufstehen Anziehen", "Aufstehen / Anziehen"],
        explain: "İsimleşmiş mastar BÜYÜK harfle yazılır ve „das“ alır.",
      },
      {
        kind: "short_answer",
        text: "Was lässt der Pfleger da?",
        options: [],
        answer: 0,
        accept: ["eine Liste für den Tag", "eine Liste", "Liste"],
        explain: "„… und danach eine Liste für den Tag dalässt.“",
      },
    ],
  },
  {
    id: "b1-u35-r2",
    level: "B1",
    skill: "reading",
    unit: 35,
    title: "Aufhören ist keine Frage von Willen",
    genre: "Deneyim yazısı",
    intro: "Biri sigarayı bırakmış. Ne işe yaradı, ne yaramadı?",
    minutes: 5,
    gloss: [
      { de: "der Raucher", tr: "sigara içen", en: "smoker" },
      { de: "der Nichtraucher", tr: "içmeyen", en: "non-smoker" },
      { de: "das Suchtmittel", tr: "bağımlılık yapan madde", en: "addictive substance" },
      { de: "sich verstecken", tr: "saklanmak", en: "to hide" },
      { de: "das Opfer", tr: "kurban", en: "victim" },
    ],
    text:
      "Ich war zwanzig Jahre Raucher. Ich habe viermal mit dem Rauchen " +
      "aufgehört und dreimal wieder angefangen. Beim fünften Mal hat es " +
      "geklappt, und ich weiß bis heute nicht genau warum.\n\n" +
      "Was nicht geholfen hat: gute Vorsätze. Was geholfen hat: keine " +
      "Zigaretten im Haus und ein anderer Weg zur Arbeit, weg vom Kiosk.\n\n" +
      "Am schwersten war nicht der Körper, sondern das Verstecken. " +
      "Als Raucher habe ich mich ständig versteckt — vor den Kindern, vor " +
      "den Kollegen, am Ende vor mir selbst. Ein Suchtmittel macht dich " +
      "nicht zum Opfer, aber es macht, dass du nicht mehr ehrlich bist.\n\n" +
      "Heute bin ich Nichtraucher und rede nicht darüber, wenn mich " +
      "niemand fragt. Wer aufhören will, hört nicht auf, weil ihm jemand " +
      "eine Rede hält.",
    questions: [
      {
        text: "Wie oft hat die Person aufgehört?",
        options: ["Einmal", "Viermal, beim fünften Mal hat es geklappt", "Nie"],
        answer: 1,
        explain: "„Ich habe viermal mit dem Rauchen aufgehört … Beim fünften Mal hat es geklappt …“",
      },
      {
        text: "Was hat geholfen?",
        options: ["Gute Vorsätze", "Keine Zigaretten im Haus und ein anderer Weg", "Eine Therapie"],
        answer: 1,
        explain: "„Was geholfen hat: keine Zigaretten im Haus und ein anderer Weg zur Arbeit …“",
      },
      {
        text: "Was war am schwersten?",
        options: ["Der Körper", "Das Verstecken", "Die Kollegen"],
        answer: 1,
        explain: "„Am schwersten war nicht der Körper, sondern das Verstecken.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe viermal ___ ___ Rauchen aufgehört.",
        options: [],
        answer: 0,
        accept: ["mit dem"],
        explain: "„aufhören“ doğrudan nesne almaz: mit + Dativ ya da zu'lu mastar.",
      },
      {
        kind: "short_answer",
        text: "Was ist die Person heute?",
        options: [],
        answer: 0,
        accept: ["Nichtraucher", "sie ist Nichtraucher"],
        explain: "„Heute bin ich Nichtraucher …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u35-l1",
    level: "B1",
    skill: "listening",
    unit: 35,
    title: "Beim Friseur",
    genre: "Kuaförde",
    intro: "Bir saç kesimi. Ne isteniyor, ne öneriliyor?",
    minutes: 4,
    gloss: [
      { de: "der Friseur", tr: "kuaför", en: "hairdresser" },
      { de: "die Frisur", tr: "saç modeli", en: "hairstyle" },
      { de: "der Bart", tr: "sakal", en: "beard" },
      { de: "der Salon", tr: "salon", en: "salon" },
    ],
    segments: [
      { text: "Guten Tag. Was darf es sein?" },
      { text: "Nur schneiden bitte, nicht zu kurz." },
      { text: "Wie viel etwa? Zwei Finger?" },
      { text: "Ein Finger reicht. Die Frisur soll gleich bleiben." },
      { text: "Verstanden. Und der Bart?" },
      { text: "Den mache ich selber, danke." },
      { text: "Gut. Waschen ist im Preis, das dauert fünf Minuten." },
      { text: "Gern. Ich habe sowieso Zeit, ich bin seit Mai Pensionist." },
    ],
    questions: [
      {
        text: "Wie viel soll geschnitten werden?",
        options: ["Zwei Finger", "Ein Finger", "Gar nichts"],
        answer: 1,
        explain: "„Ein Finger reicht. Die Frisur soll gleich bleiben.“",
      },
      {
        text: "Wer macht den Bart?",
        options: ["Der Friseur", "Der Kunde selber", "Niemand"],
        answer: 1,
        explain: "„Den mache ich selber, danke.“",
      },
      {
        text: "Seit wann ist der Kunde Pensionist?",
        options: ["Seit Mai", "Seit einem Jahr", "Seit gestern"],
        answer: 0,
        explain: "„… ich bin seit Mai Pensionist.“",
      },
      {
        kind: "gapfill",
        text: "___ ist im Preis, das dauert fünf Minuten.",
        options: [],
        answer: 0,
        accept: ["Waschen", "Das Waschen"],
        explain: "İsimleşmiş mastar büyük harfle: „Waschen“ burada bir isimdir.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert das Waschen?",
        options: [],
        answer: 0,
        accept: ["fünf Minuten", "5 Minuten"],
        explain: "„Waschen ist im Preis, das dauert fünf Minuten.“",
      },
    ],
  },
  {
    id: "b1-u35-l2",
    level: "B1",
    skill: "listening",
    unit: 35,
    title: "Ein schwieriges Gespräch",
    genre: "Kaygı konuşması",
    intro: "Biri bir yakını için endişeli. Nasıl konuşulmalı?",
    minutes: 4,
    gloss: [
      { de: "betrunken", tr: "sarhoş", en: "drunk" },
      { de: "die Droge", tr: "uyuşturucu", en: "drug" },
      { de: "aufhalten", tr: "durdurmak", en: "to stop" },
      { de: "Achtung", tr: "Dikkat", en: "Attention" },
    ],
    segments: [
      { text: "Ich mache mir Sorgen um meinen Bruder." },
      { text: "Warum? Ist etwas passiert?" },
      { text: "Er kommt oft betrunken nach Hause, dreimal die Woche." },
      { text: "Hast du mit ihm geredet?" },
      { text: "Ich habe es versucht. Er sagt, er kann jederzeit aufhören." },
      { text: "Das sagen fast alle. Aufhalten kannst du ihn nicht." },
      { text: "Was mache ich dann?" },
      { text: "Sag einmal ruhig, was du siehst. Und dann bleib da." },
    ],
    questions: [
      {
        text: "Worüber macht sich die Person Sorgen?",
        options: ["Über ihren Bruder", "Über die Arbeit", "Über die Kinder"],
        answer: 0,
        explain: "„Ich mache mir Sorgen um meinen Bruder.“",
      },
      {
        text: "Wie oft kommt er betrunken nach Hause?",
        options: ["Einmal die Woche", "Dreimal die Woche", "Jeden Tag"],
        answer: 1,
        explain: "„Er kommt oft betrunken nach Hause, dreimal die Woche.“",
      },
      {
        text: "Was rät die zweite Person?",
        options: ["Ruhig sagen, was man sieht, und dableiben", "Nichts sagen", "Die Familie rufen"],
        answer: 0,
        explain: "„Sag einmal ruhig, was du siehst. Und dann bleib da.“",
      },
      {
        kind: "gapfill",
        text: "Er sagt, er kann jederzeit ___.",
        options: [],
        answer: 0,
        accept: ["aufhören"],
        explain: "Kipli fiilden sonra çıplak mastar: kann aufhören.",
      },
      {
        kind: "short_answer",
        text: "Was kann man laut der zweiten Person nicht?",
        options: [],
        answer: 0,
        accept: ["ihn aufhalten", "aufhalten"],
        explain: "„Aufhalten kannst du ihn nicht.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u35-w1",
    level: "B1",
    skill: "writing",
    unit: 35,
    title: "Warum ich aufgehört habe",
    genre: "Kişisel yazı",
    intro: "Bıraktığın bir şeyi anlat. 'bırakmak' Almancada doğrudan nesne almaz.",
    minutes: 8,
    gloss: [
      { de: "der Raucher", tr: "sigara içen", en: "smoker" },
      { de: "der Nichtraucher", tr: "içmeyen", en: "non-smoker" },
      { de: "das Suchtmittel", tr: "bağımlılık maddesi", en: "addictive substance" },
      { de: "die Drogerie", tr: "kozmetik market", en: "drugstore" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Dört kez sigarayı bıraktım.",
        answer: "Ich habe viermal mit dem Rauchen aufgehört.",
        alternatives: ["Ich habe viermal aufgehört zu rauchen."],
        hint: "mit + Dativ ya da zu'lu mastar.",
      },
      {
        kind: "build",
        tr: "Beşinci seferde işe yaradı.",
        answer: "Beim fünften Mal hat es geklappt.",
        hint: "Zaman öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Bugün sigara içmiyorum ve kimseye anlatmıyorum.",
        answer: "Heute bin ich Nichtraucher und erzähle niemandem davon.",
        hint: "„als/Nichtraucher“ artikelsiz meslek/rol.",
      },
      {
        kind: "form",
        prompt: "Bırakma kartını doldur.",
        facts: "Kişi: Nuri Öz; süre: 20 yıl; deneme sayısı: 5; işe yarayan: evde sigara yok, farklı yol; bugün: içmiyor.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Wie lange", answer: "20 Jahre", accept: ["zwanzig Jahre"] },
          { label: "Versuche", answer: "5", accept: ["fünf", "fünfmal"] },
          { label: "Was half", answer: "keine Zigaretten im Haus", accept: ["anderer Weg", "keine Zigaretten"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„aufhören“ yapısını düzelt.",
        source: "Ich habe das Rauchen aufgehört und den Kaffee auch.",
        answer: "Ich habe mit dem Rauchen aufgehört und mit dem Kaffee auch.",
        alternatives: ["Ich habe aufgehört zu rauchen und Kaffee zu trinken."],
        why: "Türkçe 'sigarayı bıraktım' der ve nesne doğrudan gelir, o yüzden Almancada da Akkusativ nesne konuyor. Almanca 'aufhören' fiiline doğrudan nesne vermez: ya mit + Dativ ile bağlar (mit dem Rauchen aufhören) ya da zu'lu mastar alır (aufhören zu rauchen).",
      },
    ],
  },
  {
    id: "b1-u35-w2",
    level: "B1",
    skill: "writing",
    unit: 35,
    title: "Ein Plan für die Betreuung",
    genre: "Bakım planı",
    intro: "Bir bakım planı yaz. Mastar isimleşince büyük harfle yazılır.",
    minutes: 12,
    gloss: [
      { de: "der Betreuer", tr: "bakıcı", en: "carer" },
      { de: "die Senioren", tr: "yaşlılar", en: "seniors" },
      { de: "der Krankenpfleger", tr: "hasta bakıcı", en: "nurse" },
      { de: "die Pension", tr: "emeklilik", en: "retirement" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kalkmak ve giyinmek en zor kısım.",
        answer: "Das Aufstehen und das Anziehen sind das Schwerste.",
        hint: "İsimleşmiş mastar: büyük harf + das.",
      },
      {
        kind: "build",
        tr: "Bakıcı yıkanmada yardım ediyor.",
        answer: "Der Betreuer hilft beim Waschen.",
        hint: "„bei dem Waschen“ → beim Waschen.",
      },
      {
        kind: "free",
        prompt: "Evde bakım için bir plan yaz: kim için, hangi işler zor, kim ne zaman yardım edecek, hangi küçük değişiklikler gerekiyor, ve aile içinde ne konuşulmalı. En az üç isimleşmiş mastar kullan (das Aufstehen, beim Anziehen, zum Waschen).",
        checklist: [
          "Kim için olduğu söylenmiş mi?",
          "Zor olan işler somut mu?",
          "Zaman planı var mı?",
          "En az üç isimleşmiş mastar var mı?",
          "Aile içinde konuşulacak bir konu geçiyor mu?",
        ],
        minWords: 70,
        sample:
          "Der Plan ist für meine Mutter, die seit dem Winter allein wohnt " +
          "und nicht ins Altenheim will.\n\n" +
          "Schwierig sind vor allem das Aufstehen am Morgen und das Waschen. " +
          "Beim Anziehen geht es noch, wenn die Sachen bereitliegen. " +
          "Das Kochen macht sie selber und will das auch behalten.\n\n" +
          "Ein Betreuer kommt ab Mai zwei Stunden am Morgen. Er hilft beim " +
          "Waschen und lässt eine Liste für den Tag da. Am Wochenende " +
          "kommen wir, meine Schwester und ich, abwechselnd.\n\n" +
          "Zwei kleine Änderungen brauchen wir noch: einen Halt an der " +
          "Badewanne und ein Licht im Flur, das nachts angeht.\n\n" +
          "Mit meinem Bruder müssen wir noch reden. Er wohnt weit weg und " +
          "sagt bisher nichts — aber schweigen ist auch eine Antwort.",
        phrases: [
          { de: "Schwierig sind das Aufstehen und das Waschen.", tr: "Zor olan kalkmak ve yıkanmak.", en: "Getting up and washing are difficult." },
          { de: "Er hilft beim Anziehen.", tr: "Giyinmede yardım ediyor.", en: "He helps with getting dressed." },
          { de: "Wir kommen abwechselnd.", tr: "Dönüşümlü geliyoruz.", en: "We come in turns." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İsimleşmiş mastarları düzelt.",
        source: "Das aufstehen ist schwer, und beim anziehen braucht sie Hilfe.",
        answer: "Das Aufstehen ist schwer, und beim Anziehen braucht sie Hilfe.",
        why: "Türkçede mastar zaten isim gibi kullanılır ('kalkmak zor') ve yazımı hiç değişmez, o yüzden Almancada küçük harfle bırakılıyor. Almanca mastarı isimleştirdiğinde onu BÜYÜK harfle yazar ve nötr artikel verir: das Aufstehen, das Waschen, beim Anziehen, zum Lesen. Artikel görünmese bile (beim = bei dem) isim oradadır.",
      },
    ],
  },
];

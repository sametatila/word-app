import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 25 — "Çözmek, özlemek, geriye bakmak" (dersler 97–100).
 *
 * Dersler: Einen Konflikt lösen · Heimweh · Der Lebenstraum · Rückblick.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   nesne sırası   Türkçede iki nesnenin sırası serbesttir ('ona onu
 *                  verdim' de 'onu ona verdim' de olur). Almancada
 *                  kural nesnenin ZAMİR olup olmamasına bağlı: iki isimde
 *                  Dativ önce (dem Bruder das Buch), ama zamir varsa
 *                  Akkusativ öne geçer (ich gebe es ihm).
 *   hin ↔ her      Türkçede 'buraya/oraya' yön bildirir ama KONUŞANA GÖRE
 *                  yön ayrımı yoktur. Almanca ayırır: konuşandan UZAĞA
 *                  hin, konuşana DOĞRU her — dorthin gehen ama hierher
 *                  kommen. Bu sistemin Türkçede eşi yok.
 *
 * Yeni 32 kelime: der Konflikt, schweigen, klären, der Vorwurf,
 * der Respekt, fair, schuldig, lösen, das Heimweh, vermissen,
 * die Entfernung, der Angehörige, die Trennung, das Heim, hierher,
 * dorthin, der Zweifel, starten, der Schritt, kämpfen, folgen,
 * der Meister, die Spur, hinterlassen, weiterhin, erinnern, nachher,
 * längst, diesmal, ungefähr, schauen, der Bericht.
 */
export const b1U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u25-r1",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "Wie man einen Konflikt klärt",
    genre: "Rehber metin",
    intro: "Bir anlaşmazlık nasıl çözülür? Üç adım ve bir uyarı.",
    minutes: 5,
    gloss: [
      { de: "der Konflikt", tr: "çatışma", en: "conflict" },
      { de: "klären", tr: "açıklığa kavuşturmak", en: "to clarify" },
      { de: "der Vorwurf", tr: "suçlama", en: "reproach" },
      { de: "schweigen", tr: "susmak", en: "to be silent" },
      { de: "der Respekt", tr: "saygı", en: "respect" },
    ],
    text:
      "Die meisten Konflikte werden nicht gelöst, sondern nur verschoben. " +
      "Man schweigt zwei Wochen, dann redet man wieder über das Wetter, " +
      "und beim nächsten Mal ist alles wieder da.\n\n" +
      "Der erste Schritt ist der schwerste: sagen, dass etwas offen ist. " +
      "Nicht mit einem Vorwurf beginnen. „Du hast nie Zeit“ macht die Tür " +
      "zu; „mir hat gefehlt, dass wir reden“ lässt sie offen.\n\n" +
      "Zweitens: nur eine Sache pro Gespräch. Wer drei alte Geschichten " +
      "gleichzeitig klären will, klärt keine. Und drittens: fair bleiben, " +
      "auch wenn man schuldig ist. Respekt ist keine Belohnung für gutes " +
      "Verhalten, sondern die Bedingung dafür, dass überhaupt geredet wird.\n\n" +
      "Wenn Sie etwas versprochen haben, halten Sie es. Sagen Sie es der " +
      "anderen Person selbst — sagen Sie es ihr ins Gesicht, nicht über " +
      "Dritte. Das ist am Ende der ganze Unterschied.",
    questions: [
      {
        text: "Was passiert mit den meisten Konflikten?",
        options: ["Sie werden gelöst", "Sie werden nur verschoben", "Sie werden vergessen"],
        answer: 1,
        explain: "„Die meisten Konflikte werden nicht gelöst, sondern nur verschoben.“",
      },
      {
        text: "Womit soll man NICHT beginnen?",
        options: ["Mit einem Vorwurf", "Mit einer Frage", "Mit einem Wunsch"],
        answer: 0,
        explain: "„Nicht mit einem Vorwurf beginnen.“",
      },
      {
        text: "Wie viele Themen pro Gespräch?",
        options: ["Eines", "Drei", "So viele wie möglich"],
        answer: 0,
        explain: "„Zweitens: nur eine Sache pro Gespräch.“",
      },
      {
        kind: "gapfill",
        text: "Sagen Sie ___ ___ ins Gesicht, nicht über Dritte.",
        options: [],
        answer: 0,
        accept: ["es ihr"],
        explain: "İki nesne de ZAMİR → Akkusativ öne geçer: es ihr.",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Text die Bedingung dafür, dass geredet wird?",
        options: [],
        answer: 0,
        accept: ["Respekt", "der Respekt"],
        explain: "„Respekt ist … die Bedingung dafür, dass überhaupt geredet wird.“",
      },
    ],
  },
  {
    id: "b1-u25-r2",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "Heimweh nach zwei Orten",
    genre: "Kişisel yazı",
    intro: "İki yere birden özlem. Yön sözcüklerine dikkat: hangi taraf?",
    minutes: 5,
    gloss: [
      { de: "das Heimweh", tr: "sıla hasreti", en: "homesickness" },
      { de: "vermissen", tr: "özlemek", en: "to miss" },
      { de: "die Entfernung", tr: "uzaklık", en: "distance" },
      { de: "hierher", tr: "buraya", en: "to here" },
      { de: "dorthin", tr: "oraya", en: "to there" },
    ],
    text:
      "Ich bin vor elf Jahren hierhergekommen. Am Anfang habe ich jede Woche " +
      "gerechnet, wie lange es noch dauert, bis ich wieder dorthin fahren " +
      "kann.\n\n" +
      "Das Heimweh war damals einfach: ich habe einen Ort vermisst. Heute ist " +
      "es nicht mehr so einfach. Wenn ich dort bin, vermisse ich nach zehn Tagen " +
      "meine Küche hier. Wenn ich hier bin, fehlt mir der Lärm dort.\n\n" +
      "Die Entfernung ist nicht das Problem. Drei Stunden im Flugzeug sind " +
      "nichts. Das Problem ist, dass die Angehörigen dort älter werden und " +
      "ich es nur auf Fotos sehe. Eine Trennung, die niemand entschieden " +
      "hat, aber die trotzdem jeden Tag da ist.\n\n" +
      "Ich habe längst aufgehört zu fragen, wo mein Zuhause ist. Es sind " +
      "zwei. Das ist keine Antwort, aber es ist die Wahrheit, und ich habe " +
      "gelernt, damit zu leben.",
    questions: [
      {
        text: "Wann ist die Person hierhergekommen?",
        options: ["Vor elf Jahren", "Vor drei Jahren", "Vor zehn Tagen"],
        answer: 0,
        explain: "„Ich bin vor elf Jahren hierhergekommen.“",
      },
      {
        text: "Wie hat sich das Heimweh verändert?",
        options: ["Es ist weg", "Es geht jetzt in beide Richtungen", "Es ist stärker geworden"],
        answer: 1,
        explain: "„Wenn ich dort bin, vermisse ich … meine Küche hier. Wenn ich hier bin, fehlt mir der Lärm dort.“",
      },
      {
        text: "Was ist laut Text das eigentliche Problem?",
        options: ["Die Entfernung", "Dass die Angehörigen älter werden", "Das Flugzeug"],
        answer: 1,
        explain: "„Das Problem ist, dass die Angehörigen dort älter werden …“",
      },
      {
        kind: "gapfill",
        text: "Ich bin vor elf Jahren ___gekommen.",
        options: [],
        answer: 0,
        accept: ["hierher"],
        explain: "Konuşana DOĞRU yön → her: hierhergekommen. Uzağa gitse dorthin olurdu.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert der Flug?",
        options: [],
        answer: 0,
        accept: ["drei Stunden", "3 Stunden"],
        explain: "„Drei Stunden im Flugzeug sind nichts.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u25-l1",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "Der erste Schritt",
    genre: "Hayal konuşması",
    intro: "Biri bir hayalin peşine düşüyor. İlk adım ne, kuşku ne?",
    minutes: 4,
    gloss: [
      { de: "der Zweifel", tr: "kuşku", en: "doubt" },
      { de: "starten", tr: "başlamak", en: "to start" },
      { de: "kämpfen", tr: "mücadele etmek", en: "to fight" },
      { de: "der Meister", tr: "usta", en: "master" },
    ],
    segments: [
      { text: "Du redest seit Jahren von deiner Werkstatt. Wann startest du?" },
      { text: "Ich habe Zweifel. Was, wenn es nicht läuft?" },
      { text: "Dann läuft es nicht. Aber du hast es zumindest versucht." },
      { text: "Der erste Schritt macht mir am meisten Angst." },
      { text: "Dann mach ihn klein. Frag erst mal beim Meister nach." },
      { text: "Das könnte ich diese Woche machen." },
      { text: "Genau. Niemand kämpft am ersten Tag um alles." },
      { text: "Gut. Ich rufe ihn morgen an und erzähle dir nachher davon." },
    ],
    questions: [
      {
        text: "Wovon redet die erste Person seit Jahren?",
        options: ["Von einer Reise", "Von ihrer eigenen Werkstatt", "Von einem Umzug"],
        answer: 1,
        explain: "„Du redest seit Jahren von deiner Werkstatt.“",
      },
      {
        text: "Was macht ihr am meisten Angst?",
        options: ["Der erste Schritt", "Das Geld", "Die Familie"],
        answer: 0,
        explain: "„Der erste Schritt macht mir am meisten Angst.“",
      },
      {
        text: "Was soll sie zuerst tun?",
        options: ["Beim Meister nachfragen", "Einen Vertrag schreiben", "Kündigen"],
        answer: 0,
        explain: "„Frag erst mal beim Meister nach.“",
      },
      {
        kind: "gapfill",
        text: "Ich rufe ihn morgen an und erzähle ___ nachher davon.",
        options: [],
        answer: 0,
        accept: ["dir"],
        explain: "Tek zamir nesne → Dativ: dir. („davon“ ikinci nesnenin yerini tutuyor.)",
      },
      {
        kind: "short_answer",
        text: "Wann ruft sie an?",
        options: [],
        answer: 0,
        accept: ["morgen", "am nächsten Tag"],
        explain: "„Ich rufe ihn morgen an …“",
      },
    ],
  },
  {
    id: "b1-u25-l2",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "Was bleibt von diesem Jahr?",
    genre: "Yıl sonu sohbeti",
    intro: "Geçen yıla bakılıyor. Ne kaldı, ne değişti?",
    minutes: 4,
    gloss: [
      { de: "die Spur", tr: "iz", en: "trace" },
      { de: "hinterlassen", tr: "geride bırakmak", en: "to leave behind" },
      { de: "weiterhin", tr: "bundan sonra da", en: "still" },
      { de: "diesmal", tr: "bu kez", en: "this time" },
    ],
    segments: [
      { text: "Was bleibt für dich von diesem Jahr?" },
      { text: "Der Umzug. Der hat wirklich Spuren hinterlassen." },
      { text: "War es gut oder schlimm?" },
      { text: "Beides. Ich erinnere mich an sechs schlimme Wochen und an einen guten Herbst." },
      { text: "Und nächstes Jahr? Weiterhin dasselbe?" },
      { text: "Nein. Diesmal will ich früher entscheiden, nicht erst im Sommer." },
      { text: "Das sagst du jedes Jahr." },
      { text: "Ich weiß. Aber diesmal habe ich es ungefähr aufgeschrieben." },
    ],
    questions: [
      {
        text: "Was bleibt von diesem Jahr?",
        options: ["Der Umzug", "Eine Reise", "Eine neue Stelle"],
        answer: 0,
        explain: "„Der Umzug. Der hat wirklich Spuren hinterlassen.“",
      },
      {
        text: "War es gut oder schlimm?",
        options: ["Nur gut", "Nur schlimm", "Beides"],
        answer: 2,
        explain: "„Beides. Ich erinnere mich an sechs schlimme Wochen und an einen guten Herbst.“",
      },
      {
        text: "Was will die Person nächstes Jahr anders machen?",
        options: ["Früher entscheiden", "Weniger arbeiten", "Wieder umziehen"],
        answer: 0,
        explain: "„Diesmal will ich früher entscheiden, nicht erst im Sommer.“",
      },
      {
        kind: "gapfill",
        text: "Der Umzug hat wirklich Spuren ___.",
        options: [],
        answer: 0,
        accept: ["hinterlassen"],
        explain: "„hinterlassen“ ayrılmayan fiildir: ortacı ge- almaz.",
      },
      {
        kind: "short_answer",
        text: "Woran erinnert sie sich?",
        options: [],
        answer: 0,
        accept: ["an sechs schlimme Wochen und einen guten Herbst", "sechs schlimme Wochen", "einen guten Herbst"],
        explain: "„Ich erinnere mich an sechs schlimme Wochen und an einen guten Herbst.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u25-w1",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "Das Gespräch suchen",
    genre: "Uzlaşma mesajı",
    intro: "Bir anlaşmazlığı çözmek için yaz. İki nesne varsa sıra zamire bağlı.",
    minutes: 8,
    gloss: [
      { de: "klären", tr: "açıklığa kavuşturmak", en: "to clarify" },
      { de: "der Vorwurf", tr: "suçlama", en: "reproach" },
      { de: "schuldig", tr: "suçlu", en: "guilty" },
      { de: "fair", tr: "adil", en: "fair" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bunu kardeşime kendim söyledim.",
        answer: "Ich habe es meinem Bruder selbst gesagt.",
        hint: "Zamir + isim → zamir önce.",
      },
      {
        kind: "build",
        tr: "Bunu ona yüzüne söyledim.",
        answer: "Ich habe es ihm ins Gesicht gesagt.",
        hint: "İki zamir → Akkusativ önce: es ihm.",
      },
      {
        kind: "build",
        tr: "Bir suçlamayla başlamak istemiyorum.",
        answer: "Ich möchte nicht mit einem Vorwurf beginnen.",
        hint: "Kipli fiilden sonra çıplak mastar.",
      },
      {
        kind: "form",
        prompt: "Uzlaşma kartını doldur.",
        facts: "Yazan: Nuri Öz; konu: iki haftadır konuşulmayan mesele; istek: bir görüşme; öneri: cumartesi; ton: suçlamasız.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Thema", answer: "das offene Gespräch", accept: ["ein Gespräch", "der Konflikt"] },
          { label: "Wunsch", answer: "ein Gespräch", accept: ["reden", "ein Treffen"] },
          { label: "Vorschlag", answer: "Samstag", accept: ["am Samstag"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "İki nesnenin sırasını düzelt.",
        source: "Ich habe ihm es gesagt und dann habe ich das Buch ihm gegeben.",
        answer: "Ich habe es ihm gesagt und dann habe ich ihm das Buch gegeben.",
        why: "Türkçede iki nesnenin sırası serbesttir ('ona onu verdim' de 'onu ona verdim' de olur), o yüzden Almancada da rastgele seçiliyor. Almancada kural nesnenin ZAMİR olup olmamasına bağlı: iki isimde Dativ önce gelir (ihm das Buch), ama Akkusativ ZAMİR ise o öne geçer (es ihm).",
      },
    ],
  },
  {
    id: "b1-u25-w2",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "Zwei Orte",
    genre: "Kişisel yazı",
    intro: "İki yer arasındaki hayatını yaz. Yön konuşana göre işaretlenir.",
    minutes: 12,
    gloss: [
      { de: "vermissen", tr: "özlemek", en: "to miss" },
      { de: "der Angehörige", tr: "yakın (akraba)", en: "relative" },
      { de: "die Trennung", tr: "ayrılık", en: "separation" },
      { de: "erinnern", tr: "hatırlamak", en: "to remember" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "On bir yıl önce buraya geldim.",
        answer: "Ich bin vor elf Jahren hierhergekommen.",
        hint: "Konuşana doğru → her.",
      },
      {
        kind: "build",
        tr: "Yılda iki kez oraya gidiyorum.",
        answer: "Zweimal im Jahr fahre ich dorthin.",
        hint: "Konuşandan uzağa → hin.",
      },
      {
        kind: "free",
        prompt: "İki yer arasında bir hayatı anlat (kendi hayatın ya da tanıdığın birinin): ne zaman gelinmiş, başta ne özlenmiş, bugün ne değişmiş, ve bu durumla nasıl yaşanıyor. En az bir 'hierher' ve bir 'dorthin' kullan.",
        checklist: [
          "Ne zaman gelindiği söylenmiş mi?",
          "Başlangıçtaki özlem anlatılmış mı?",
          "Bugünkü durum farklı mı anlatılmış?",
          "Hem hierher hem dorthin kullanılmış mı?",
          "Bir sonuç ya da kabul cümlesi var mı?",
        ],
        minWords: 70,
        sample:
          "Meine Tante ist vor zwanzig Jahren hierhergekommen, mit zwei Koffern " +
          "und ohne ein Wort Deutsch.\n\n" +
          "Am Anfang hatte sie großes Heimweh. Sie hat jeden Sonntag angerufen " +
          "und gerechnet, wann sie wieder dorthin fahren kann. Die Entfernung " +
          "war damals viel größer als heute, auch wenn der Weg derselbe ist.\n\n" +
          "Heute ist es anders. Wenn sie zwei Wochen dort ist, vermisst sie " +
          "ihre Küche hier. Ihre Angehörigen dort werden älter, und das sieht " +
          "sie meistens nur auf Fotos. Das ist eine Trennung, die niemand " +
          "entschieden hat.\n\n" +
          "Sie hat längst aufgehört zu fragen, wo ihr Zuhause ist. Es sind zwei. " +
          "Ich erinnere mich, dass sie das früher traurig gesagt hat. " +
          "Heute sagt sie es ruhig.",
        phrases: [
          { de: "Ich bin … hierhergekommen.", tr: "… buraya geldim.", en: "I came here …" },
          { de: "Wann kann ich wieder dorthin fahren?", tr: "Ne zaman tekrar oraya gidebilirim?", en: "When can I go there again?" },
          { de: "Es sind zwei.", tr: "İki tane.", en: "There are two." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yön sözcüklerini düzelt.",
        source: "Ich bin vor elf Jahren dorthin gekommen und fahre jedes Jahr hierher zurück.",
        answer: "Ich bin vor elf Jahren hierhergekommen und fahre jedes Jahr dorthin zurück.",
        why: "Türkçede 'buraya' ve 'oraya' yön bildirir ama KONUŞANIN yerine göre bir ayrım yoktur — cümlenin kendisi hangi taraftan anlatıldığını söylemez. Almanca bunu zorunlu kılar: konuşandan UZAĞA giden yön hin (dorthin, hingehen), konuşana DOĞRU gelen yön her (hierher, herkommen). Yazan buradaysa 'hierhergekommen' der, oraya giderken 'dorthin fahren'.",
      },
    ],
  },
];

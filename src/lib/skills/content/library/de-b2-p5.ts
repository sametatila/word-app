import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: yazılı söyleşi, podcast ve yönerge metni. Üçü de edatlı
 * fiiller ve da-/wo- bileşikleriyle dolu; dil bilgisi tam olarak bu yapı.
 */
export const deB2P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r5",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Am Ende bleiben die Schlüssel",
    genre: "Söyleşi",
    intro: "Kayıp eşya müzayedesini yürüten biriyle söyleşi okuyacaksın: nasıl işliyor, insanlar neye kızıyor, ne geriye kalıyor.",
    gloss: [
      { de: "die Versteigerung", tr: "açık artırma", en: "auction" },
      { de: "das Schnäppchen", tr: "kelepir", en: "bargain" },
      { de: "der Posten", tr: "kalem", en: "lot" },
      { de: "bieten", tr: "teklif vermek", en: "to bid" },
      { de: "haften", tr: "sorumlu olmak", en: "to be liable" },
      { de: "aufbewahren", tr: "saklamak", en: "to keep" },
      { de: "der Sammler", tr: "koleksiyoncu", en: "collector" },
    ],
    minutes: 9,
    text:
      "„AM ENDE BLEIBEN DIE SCHLÜSSEL“\n" +
      "Ein Gespräch mit Ute Barsch, seit neun Jahren zuständig für die Fundsachenversteigerung der Stadt\n\n" +
      "Frau Barsch, womit rechnen Besucher, wenn sie zum ersten Mal kommen?\n" +
      "Die meisten rechnen mit Schnäppchen und wundern sich dann über die Stimmung. Es ist keine Trödelhalle, " +
      "es ist ein Verfahren. Über jeden Posten wird protokolliert, wer geboten hat und wie viel.\n\n" +
      "Worüber ärgern sich die Leute am häufigsten?\n" +
      "Darüber, dass sie nichts anfassen dürfen, bevor sie bieten. Ich verstehe das, aber wir haften nicht für " +
      "die Sachen. Wer sich für ein Fahrrad interessiert, kann es in der Besichtigung von allen Seiten ansehen — " +
      "nur eben nicht fahren.\n\n" +
      "Was kommt am häufigsten herein?\n" +
      "Regenschirme im Herbst, Brillen das ganze Jahr, und Fahrräder, sehr viele Fahrräder. Worauf sich niemand " +
      "vorbereitet, sind die Kuscheltiere. Wir bewahren sie sechs Monate auf, und in dieser Zeit fragt fast nie " +
      "jemand danach.\n\n" +
      "Und die Schlüssel?\n" +
      "Am Ende bleiben immer die Schlüssel. Zweitausend im Jahr, geschätzt. Man kann sie nicht versteigern, weil " +
      "niemand weiß, wozu sie gehören, und man kann sie schlecht wegwerfen, weil sie für irgendjemanden alles " +
      "bedeuten. Wir bewahren sie länger auf, als wir müssten.\n\n" +
      "Erinnern Sie sich an einen besonderen Fall?\n" +
      "An einen Koffer mit Briefen aus den sechziger Jahren. Wir haben monatelang darauf gewartet, dass sich " +
      "jemand meldet. Am Ende hat ihn ein Sammler ersteigert, und ich habe mich lange darüber geärgert, obwohl " +
      "alles korrekt war.\n\n" +
      "Worauf achten Sie bei Neulingen im Team?\n" +
      "Ob sie sich für die Sachen interessieren oder nur für die Preise. Wer nur rechnet, hält das hier nicht " +
      "lange aus.",
    questions: [
      {
        text: "Was betont Frau Barsch an der Versteigerung?",
        options: [
          "Sie ist ein geregeltes Verfahren.",
          "Sie ist vor allem ein Volksfest.",
          "Sie bringt der Stadt viel Geld.",
        ],
        answer: 0,
        explain: "„Es ist keine Trödelhalle, es ist ein Verfahren. Über jeden Posten wird protokolliert …“",
      },
      {
        text: "Worüber ärgern sich die Besucher am häufigsten?",
        options: [
          "dass sie vorher nichts anfassen dürfen",
          "dass die Preise am Ende zu hoch sind",
          "dass die Termine viel zu selten sind",
        ],
        answer: 0,
        explain: "„Darüber, dass sie nichts anfassen dürfen, bevor sie bieten.“",
      },
      {
        kind: "truefalse",
        text: "Schlüssel werden regelmäßig versteigert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Man kann sie nicht versteigern, weil niemand weiß, wozu sie gehören.“",
      },
      {
        kind: "gapfill",
        text: "Kuscheltiere werden ___ Monate aufbewahrt.",
        options: [],
        answer: 0,
        accept: ["sechs", "6"],
        explain: "„Wir bewahren sie sechs Monate auf …“",
      },
      {
        kind: "short_answer",
        text: "Was hat der Sammler ersteigert?",
        options: [],
        answer: 0,
        accept: ["einen Koffer mit Briefen", "einen Koffer", "den Koffer mit Briefen"],
        explain: "„An einen Koffer mit Briefen aus den sechziger Jahren … Am Ende hat ihn ein Sammler ersteigert.“",
      },
      {
        text: "Worauf achtet Frau Barsch bei neuen Mitarbeitern?",
        options: [
          "auf ihr Interesse an den Dingen",
          "auf ihre Erfahrung mit Auktionen",
          "auf ihre Schnelligkeit beim Rechnen",
        ],
        answer: 0,
        explain: "„Ob sie sich für die Sachen interessieren oder nur für die Preise.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l5",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Zwei Jahre für einen Hund",
    genre: "Podcast",
    intro: "Bir podcast bölümünde refakat köpeklerini büyüten aileler anlatılıyor: neye alıştırılıyor, en zoru ne, sonunda ne oluyor.",
    gloss: [
      { de: "der Assistenzhund", tr: "refakat köpeği", en: "assistance dog" },
      { de: "die Rolltreppe", tr: "yürüyen merdiven", en: "escalator" },
      { de: "das Kunststück", tr: "numara", en: "trick" },
      { de: "geeignet", tr: "uygun", en: "suitable" },
      { de: "vermitteln", tr: "sahiplendirmek", en: "to rehome" },
      { de: "großziehen", tr: "büyütmek", en: "to raise" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Moderator", text: "Willkommen zurück. Heute geht es um eine Ausbildung, die zwei Jahre dauert, und um Menschen, die dabei fast alles machen und am Ende nichts behalten." },
      { speaker: "Moderator", text: "Assistenzhunde werden nicht in einem Zentrum groß. Sie leben die ersten anderthalb Jahre in einer Familie. Ich habe mit Nuray Kilic gesprochen, die das zum dritten Mal macht." },
      { speaker: "Nuray", text: "Man gewöhnt den Hund an alles, woran ein normaler Hund nie gewöhnt wird: an Aufzüge, an Rolltreppen, an Krankenhausflure, an Menschen, die plötzlich schreien." },
      { speaker: "Nuray", text: "Dafür bekommt man eine Liste, und auf dieser Liste steht nichts über Kunststücke. Es geht um Ruhe. Ein Hund, der sich über jeden Besucher freut, ist für diese Arbeit nicht geeignet." },
      { speaker: "Moderator", text: "Und was ist das Schwierigste?" },
      { speaker: "Nuray", text: "Nicht das Abgeben, was alle denken. Das Schwierigste ist das erste halbe Jahr, weil man ständig damit rechnen muss, etwas falsch zu machen, und weil einem niemand sagt, was genau." },
      { speaker: "Nuray", text: "Beim Abgeben weint man einen Tag. Danach denkt man an den Menschen, der ihn jetzt hat, und das trägt erstaunlich gut." },
      { speaker: "Moderator", text: "Wie viele Hunde schaffen die Prüfung?" },
      { speaker: "Nuray", text: "Etwa die Hälfte. Die anderen werden vermittelt, meistens an die Familie, die sie großgezogen hat. Darüber wird selten gesprochen, und ich finde das falsch: Es gehört dazu." },
      { speaker: "Moderator", text: "Worauf sollte jemand achten, der sich dafür interessiert?" },
      { speaker: "Nuray", text: "Auf die eigene Wohnung nicht. Auf den eigenen Alltag schon. Wer den Hund nicht überallhin mitnehmen kann, kann ihn nicht ausbilden, und das merkt man erst im dritten Monat." },
    ],
    questions: [
      {
        text: "Worum geht es in der Folge?",
        options: [
          "um Familien, die Assistenzhunde großziehen",
          "um die Prüfung am Ende der Ausbildung",
          "um die Kosten einer Hundeausbildung",
        ],
        answer: 0,
        explain: "„Sie leben die ersten anderthalb Jahre in einer Familie“ — bölüm bu ailelerle ilgili.",
      },
      {
        text: "Was steht auf der Liste, die die Familien bekommen?",
        options: [
          "woran der Hund gewöhnt werden soll",
          "welche Kunststücke er lernen muss",
          "wie oft er geprüft wird",
        ],
        answer: 0,
        explain: "„… auf dieser Liste steht nichts über Kunststücke. Es geht um Ruhe.“",
      },
      {
        kind: "truefalse",
        text: "Für Nuray ist das Abgeben das Schwierigste.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Nicht das Abgeben, was alle denken. Das Schwierigste ist das erste halbe Jahr.“",
      },
      {
        kind: "short_answer",
        text: "Wie viele Hunde bestehen die Prüfung?",
        options: [],
        answer: 0,
        accept: ["etwa die Hälfte", "die Hälfte", "ungefähr die Hälfte"],
        explain: "„Etwa die Hälfte. Die anderen werden vermittelt …“",
      },
      {
        kind: "dictation",
        text: "Teslim gününü anlatan ilk cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Beim Abgeben weint man einen Tag.", "Beim Abgeben weint man einen Tag"],
        explain: "„Beim Abgeben weint man einen Tag.“ — „bei“ + adlaştırma bir zaman öbeği kurar.",
      },
      {
        text: "Worauf sollte man laut Nuray achten?",
        options: ["auf den eigenen Alltag", "auf die Größe der Wohnung", "auf die Erfahrung mit Hunden"],
        answer: 0,
        explain: "„Auf die eigene Wohnung nicht. Auf den eigenen Alltag schon.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w5",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Anleitung für neue Welpenpaten",
    genre: "Yönerge",
    intro: "Bir yavru köpeği ilk kez büyütecek kişilere yönerge yazacaksın; önce iki cümle kur, sonra yönergeyi yaz.",
    gloss: [
      { de: "der Welpe", tr: "yavru köpek", en: "puppy" },
      { de: "sich gewöhnen an", tr: "alışmak", en: "to get used to" },
      { de: "schaden", tr: "zarar vermek", en: "to harm" },
      { de: "der Abgabetermin", tr: "teslim tarihi", en: "handover date" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Köpeği en baştan asansöre alıştır.",
        answer: "Gewöhne den Hund von Anfang an an den Aufzug.",
        alternatives: ["Von Anfang an gewöhne den Hund an den Aufzug."],
        hint: "„gewöhnen an“ edatıyla birlikte öğrenilir ve Akkusativ ister.",
      },
      {
        kind: "build",
        tr: "Bunun uzun süreceğini en baştan hesaba kat.",
        answer: "Rechne von Anfang an damit, dass es lange dauert.",
        alternatives: ["Von Anfang an rechne damit, dass es lange dauert."],
        hint: "„rechnen mit“ nesnesi bir cümleyse edat önce „damit“ olarak duyurulur.",
      },
      {
        kind: "free",
        prompt:
          "Bir yavru köpeği ilk kez büyütecek kişilere yönerge yaz: ilk hafta nasıl geçiyor, neye alıştırılmalı, neyden kaçınılmalı, ne zaman ve neyi bildirmeli, nasıl bitiriliyor. Kısa başlıklar kullan.",
        checklist: [
          "İlk haftadan ne beklenmemesi gerektiğini yaz",
          "Neye alıştırılacağını günlük hayattan örneklerle say",
          "Kaçınılması gerekeni ve nedenini söyle",
          "Neyin ne zaman bildirileceğini ve kapanışı yaz",
        ],
        minWords: 90,
        phrases: [
          { de: "In der ersten Woche geht es nur darum, dass …", tr: "İlk hafta yalnız … ile ilgilidir" },
          { de: "Gewöhne ihn an …", tr: "Onu …'e alıştır" },
          { de: "Rechne damit, dass …", tr: "… olacağını hesaba kat" },
          { de: "Melde alles, wovor …", tr: "…'den korktuğu her şeyi bildir" },
          { de: "Sprich mit jemandem, der …", tr: "… olan biriyle konuş" },
        ],
        sample:
          "Anleitung für neue Welpenpaten\n\n" +
          "Die erste Woche. Erwarte nichts. In den ersten sieben Tagen geht es nur darum, dass der Welpe sich an " +
          "dich und an die Wohnung gewöhnt; alles andere kommt später. Rechne von Anfang an damit, dass es " +
          "lange dauert.\n\n" +
          "Woran du ihn gewöhnen sollst. Beginne mit dem, was in deinem Alltag sowieso vorkommt: der Aufzug, " +
          "der Bus, der Wochenmarkt, das Wartezimmer beim Arzt. Zwei kurze Situationen am Tag reichen; eine " +
          "lange schadet mehr, als sie nützt.\n\n" +
          "Wovon du die Finger lassen sollst. Bring ihm keine Kunststücke bei und spiel nicht mit ihm im " +
          "Treppenhaus. Beides gewöhnt ihn daran, dass draußen etwas passiert, und genau das wollen wir nicht.\n\n" +
          "Was du melden musst. Alles, wovor er sich zweimal erschreckt hat. Nicht am Monatsende, sondern in " +
          "derselben Woche, weil wir sonst nicht wissen, worauf wir bei der Prüfung achten müssen.\n\n" +
          "Zum Schluss. Frag früh nach dem Abgabetermin und sprich mit jemandem, der es schon einmal gemacht " +
          "hat. Über den letzten Tag redet niemand gern, und genau deshalb sollte man vorher darüber reden.",
      },
    ],
  },
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s5",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Woran erkennt man eine gute Ausbildung?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: kolay ölçütü ele, kendi ölçütünü parçalara ayır ve örnekle sına.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "İyi bir eğitimi (meslek eğitimi, kurs, çıraklık) neyden tanırsın? Yaygın ölçütü sına, kendi ölçütünü en az iki parçaya ayır ve her parçayı somutlaştır.",
      bulletsTr: [
        "Yaygın ölçütü adlandır ve neden yetersiz olduğunu söyle",
        "Birinci ölçütünü ver: hatalarla nasıl davranılıyor",
        "İkinci ölçütünü ver: sorumluluk hangi sırayla veriliyor",
        "Sonu neyle bittiğine bakarak bitir",
      ],
      targets: [
        { de: "Darauf würde ich mich nicht verlassen.", tr: "Buna güvenmezdim." },
        { de: "Mein erstes Kriterium hat mit … zu tun.", tr: "İlk ölçütüm … ile ilgili" },
        { de: "Wo niemand einem sagt, …", tr: "Kimsenin söylemediği yerde …" },
        { de: "Ich würde darauf achten, worüber …", tr: "Ne hakkında konuşulduğuna dikkat ederdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Die übliche Antwort lautet: an der Prüfung am Ende. Darauf würde ich mich nicht verlassen, und zwar " +
        "aus einem einfachen Grund: Eine Prüfung misst, was sich an einem Tag zeigen lässt, und die meisten " +
        "Berufe bestehen aus dem, was sich nicht an einem Tag zeigt. Mein erstes Kriterium hat mit Fehlern zu " +
        "tun. In einer guten Ausbildung wird man auf Fehler hingewiesen, bevor sie teuer werden, und man wird " +
        "dabei nicht beschämt. Wo niemand einem sagt, was genau falsch war, lernt man nur, vorsichtig zu " +
        "wirken. Das zweite Kriterium ist die Reihenfolge. Man sollte früh etwas machen dürfen, wofür jemand " +
        "anders die Verantwortung trägt, und später etwas, wofür man selbst haftet. Wird diese Reihenfolge " +
        "umgedreht, sucht man sich Aufgaben, bei denen man nicht auffällt. Und drittens würde ich darauf " +
        "achten, worüber am Ende gesprochen wird. Endet eine Ausbildung nur mit einem Zeugnis, fehlt etwas. " +
        "Endet sie mit einem Gespräch darüber, was man als Nächstes lernen sollte, war es eine.",
      rubricHint:
        "Yaygın ölçüt sınanmalı ve kendi ölçütü en az iki parçaya ayrılmalı; edatlı fiiller ve da-/wo- bileşikleri beklenir.",
    },
  },
  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g5",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Worauf wartest du? Darauf.",
    genre: "Kural",
    intro: "Fiiller Almancada kendi edatlarını taşır; nesne bir şeyse edat zamirle değil, da- ve wo- bileşikleriyle kurulur.",
    focus: "Verben mit Präposition ve da-/wo-Komposita",
    gloss: [
      { de: "sich kümmern um", tr: "ilgilenmek", en: "to take care of" },
      { de: "rechnen mit", tr: "hesaba katmak", en: "to expect" },
      { de: "bitten um", tr: "rica etmek", en: "to ask for" },
      { de: "sich interessieren für", tr: "ilgi duymak", en: "to be interested in" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Edat fiile ait",
        tr: "Türkçede nesnenin hâli fiile göre değişir ama ayrı bir edat gerekmez: „otobüsü bekliyorum“. Almancada birçok fiil sabit bir edatla gelir ve o edat kelimeyle birlikte ezberlenir: warten auf, denken an, sich freuen über, bitten um, sich kümmern um, rechnen mit, achten auf.",
        examples: [
          { de: "Ich warte auf den Bus.", tr: "Otobüsü bekliyorum.", note: "warten auf + Akkusativ" },
          { de: "Er hat mich um Hilfe gebeten.", tr: "Benden yardım istedi.", note: "bitten um" },
          { de: "Wir rechnen mit Regen.", tr: "Yağmur bekliyoruz.", note: "rechnen mit + Dativ" },
        ],
      },
      {
        heading: "Şey ise da-, soru ise wo-",
        tr: "Nesne bir NESNE ise „auf es“ denmez, edat „da-“ ile birleşir: darauf, darüber, daran, damit, davon. Soruda ise „auf was“ yerine „worauf“ kullanılır. Edat ünlüyle başlıyorsa araya bir -r- girer.",
        examples: [
          { de: "Worauf wartest du? — Auf den Bus. Darauf warte ich seit zehn Minuten.", tr: "Neyi bekliyorsun? Otobüsü. On dakikadır onu bekliyorum." },
          { de: "Woran denkst du?", tr: "Ne düşünüyorsun?", note: "an → woran" },
          { de: "Womit rechnest du?", tr: "Neyi hesaba katıyorsun?", note: "mit → womit" },
        ],
      },
      {
        heading: "İnsan ise normal zamir",
        tr: "Nesne bir KİŞİ ise da-/wo- bileşiği kullanılmaz: „auf ihn“, „mit ihr“, „an wen“. Ayrıca da- bileşiği arkadan gelecek bir „dass“ cümlesini ya da mastarı önceden duyurabilir.",
        examples: [
          { de: "Ich warte auf ihn.", tr: "Onu bekliyorum.", note: "kişi → auf ihn" },
          { de: "Ich rechne damit, dass es regnet.", tr: "Yağmur yağacağını hesaba katıyorum.", note: "damit ileriyi işaret eder" },
          { de: "Ich freue mich darauf, dich zu sehen.", tr: "Seni görmeyi dört gözle bekliyorum." },
        ],
      },
    ],
    questions: [
      {
        text: "Ich warte ___ den Bus.",
        options: ["auf", "für", "an"],
        answer: 0,
        explain: "„warten“ sabit edatı „auf“tur ve Akkusativ ister.",
      },
      {
        text: "___ wartest du?",
        options: ["Worauf", "Auf was", "Wovon"],
        answer: 0,
        explain: "Nesne bir şey olduğunda soru wo- bileşiğiyle kurulur; „auf was“ yalnız günlük konuşmada duyulur.",
      },
      {
        text: "Ich interessiere mich sehr ___ alte Fotos.",
        options: ["für", "an", "über"],
        answer: 0,
        explain: "„sich interessieren“ edatı „für“dür.",
      },
      {
        kind: "gapfill",
        text: "Ich freue mich ___ das Wochenende.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "Gelecekteki bir şey için „sich freuen auf“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Wir rechnen ___, dass es regnet.",
        options: [],
        answer: 0,
        accept: ["damit"],
        explain: "Arkadan „dass“ cümlesi geliyor; edat önce da- bileşiği olarak duyurulur: damit.",
      },
      {
        kind: "gapfill",
        text: "___ denkst du gerade? (denken an)",
        options: [],
        answer: 0,
        accept: ["Woran", "woran"],
        explain: "„an“ ünlüyle başladığı için araya -r- girer: woran.",
      },
      {
        kind: "gapfill",
        text: "Er hat mich ___ Hilfe gebeten.",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "„bitten“ sabit edatı „um“dur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "kümmere", "mich", "darum"],
        explain: "Dönüşlü zamir fiilden hemen sonra, da-bileşiği sonda: Ich kümmere mich darum.",
      },
      {
        kind: "truefalse",
        text: "„Ich freue mich auf es.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Nesne bir şey olduğunda edat zamirle birleşmez; doğrusu „Ich freue mich darauf.“",
      },
      {
        kind: "truefalse",
        text: "„Ich warte auf ihn.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Nesne bir kişi olduğu için normal zamir kullanılır; „darauf“ burada yanlış olurdu.",
      },
    ],
  },
];

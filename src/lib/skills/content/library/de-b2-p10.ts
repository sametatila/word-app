import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 10.
 *
 * B2 hücresini ONA tamamlayan son parti. Kurallar ve emsal: `de-b2.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 medya hattı: bir forum tartışması, bir atölye kaydı, bir forum
 * katkısı. Dil bilgisi öznel modal fiiller — „muss“ artık zorunluluk değil
 * tahmin bildiriyor.
 */
export const deB2P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r10",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Forum: Woran erkennt ihr eine gute Quelle?",
    genre: "forum",
    intro: "Bir forumda dört kişi kaynak güvenilirliğini tartışıyor: hangi ölçüt işe yarıyor, hangisi aldatıcı.",
    gloss: [
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "die Pressemitteilung", tr: "basın bülteni", en: "press release" },
      { de: "die Studie", tr: "araştırma", en: "study" },
      { de: "die Gegenposition", tr: "karşı görüş", en: "opposing view" },
      { de: "der Verfasser", tr: "yazar", en: "author" },
      { de: "prüfen", tr: "denetlemek", en: "to check" },
    ],
    minutes: 8,
    text:
      "Thema: Woran erkennt ihr eine gute Quelle?\n\n" +
      "Kerstin_H: Mein erstes Kriterium ist banal: Steht ein Name darunter? " +
      "Ein Text ohne Verfasser muss nicht falsch sein, aber niemand steht dafür gerade.\n\n" +
      "jonas.m: Das reicht mir nicht. Namen gibt es überall. Ich schaue, ob die Zahlen " +
      "im Text zu einer Studie führen, die man selbst aufrufen kann. " +
      "In neun von zehn Fällen endet die Spur bei einer Pressemitteilung, " +
      "und die ist bekanntlich Werbung mit Fußnoten.\n\n" +
      "Kerstin_H: Einverstanden, aber die meisten Leute lesen keine Studien. " +
      "Ein Kriterium, das nur Fachleute anwenden können, hilft nicht weiter.\n\n" +
      "Anouk: Bei mir hat sich etwas anderes bewährt: Wie geht der Text mit dem um, " +
      "was gegen ihn spricht? Wenn eine Gegenposition gar nicht vorkommt, werde ich " +
      "misstrauisch, auch wenn alles andere stimmt. Gute Texte sagen, wo ihre Grenze liegt.\n\n" +
      "jonas.m: Das ist tatsächlich praktikabler als meine Methode. Dürfte auch schwerer " +
      "zu fälschen sein.\n\n" +
      "Robert_K: Ihr redet alle über Texte. Das Problem sind aber Bilder und kurze Videos, " +
      "die ohne Zusammenhang geteilt werden. Da hilft kein Kriterium, da hilft nur die " +
      "Frage, wo das Ding zum ersten Mal aufgetaucht ist — und die stellt kaum jemand.\n\n" +
      "Anouk: Stimmt. Vielleicht ist das die ehrlichste Antwort: Wir prüfen das, " +
      "was aussieht wie etwas, das man prüfen kann.",
    questions: [
      {
        text: "Was kritisiert Kerstin_H an jonas.ms Kriterium?",
        options: [
          "Es ist zu streng für Fachleute.",
          "Die meisten Leute können es nicht anwenden.",
          "Es funktioniert nur bei Bildern.",
        ],
        answer: 1,
        explain: "„Ein Kriterium, das nur Fachleute anwenden können, hilft nicht weiter.“",
      },
      {
        text: "Welches Kriterium nennt Anouk?",
        options: [
          "ob der Text mit Gegenpositionen umgeht",
          "ob ein Name darunter steht",
          "ob der Text lang genug ist",
        ],
        answer: 0,
        explain: "Karşı görüş hiç geçmiyorsa kuşkulanıyor.",
      },
      {
        kind: "truefalse",
        text: "jonas.m hält Anouks Kriterium für schlechter als sein eigenes.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das ist tatsächlich praktikabler als meine Methode.“",
      },
      {
        kind: "gapfill",
        text: "In ___ von zehn Fällen endet die Spur bei einer Pressemitteilung.",
        options: [],
        answer: 0,
        accept: ["neun", "9"],
        explain: "„In neun von zehn Fällen endet die Spur bei einer Pressemitteilung.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frage stellt Robert_K bei Bildern?",
        options: [],
        answer: 0,
        accept: [
          "wo es zuerst aufgetaucht ist",
          "wo das Bild zuerst war",
          "wo es zum ersten Mal auftauchte",
        ],
        explain: "„wo das Ding zum ersten Mal aufgetaucht ist“.",
      },
      {
        text: "Was meint Anouks letzter Satz?",
        options: [
          "Wir prüfen nur das, was prüfbar aussieht.",
          "Prüfen ist immer sinnlos.",
          "Bilder sind leichter zu prüfen als Texte.",
        ],
        answer: 0,
        explain: "Denetleme çabası, denetlenebilir görünen şeylere gidiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l10",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Workshop: Drei Fragen vor dem Teilen",
    genre: "guide",
    intro: "Bir atölye kaydı: bir içeriği paylaşmadan önce sorulacak üç soru ve bunların sınırı.",
    gloss: [
      { de: "der Absender", tr: "gönderen", en: "sender" },
      { de: "die Pause", tr: "ara", en: "break" },
      { de: "auslösen", tr: "tetiklemek", en: "to trigger" },
      { de: "die Empörung", tr: "öfke", en: "outrage" },
      { de: "die Eile", tr: "acele", en: "haste" },
      { de: "teilen", tr: "paylaşmak", en: "to share" },
    ],
    minutes: 8,
    segments: [
      { text: "Willkommen zum zweiten Teil. Heute geht es nicht um Werkzeuge, sondern um drei Fragen, die man sich selbst stellt." },
      { text: "Erste Frage: Wer ist der Absender, und was hat er davon, wenn ich das weitergebe?" },
      { text: "Diese Frage klingt nach Misstrauen, sie ist aber neutral. Auch eine Hilfsorganisation hat etwas davon, und das macht ihre Botschaft nicht falsch." },
      { text: "Zweite Frage: Was hat der Beitrag bei mir ausgelöst? Wenn die erste Reaktion Empörung war, lohnt sich eine Pause von zehn Minuten." },
      { speaker: "Frau Barth", text: "In unseren Tests war genau das der wirksamste Schritt. Nicht das Prüfen, sondern das Warten." },
      { text: "Dritte Frage: Wäre ich bereit, das mit meinem Namen zu unterschreiben? Wer zögert, sollte nicht teilen." },
      { speaker: "Frau Barth", text: "Die Grenze dieser Methode ist klar: Sie hilft gegen Eile, nicht gegen Überzeugung. Wer etwas glauben will, findet immer eine Begründung." },
      { text: "Deshalb endet der Workshop nicht mit einer Regel, sondern mit einer Übung: Suchen Sie einen Beitrag, den Sie geteilt haben und heute anders sehen." },
    ],
    questions: [
      {
        text: "Warum ist die erste Frage laut Vortrag neutral?",
        options: [
          "weil sie niemanden betrifft",
          "weil auch seriöse Absender etwas davon haben",
          "weil sie selten beantwortet wird",
        ],
        answer: 1,
        explain: "Bir yardım kuruluşunun da kazancı var ve bu mesajını yanlış yapmıyor.",
      },
      {
        text: "Was war laut Frau Barth der wirksamste Schritt?",
        options: ["das Prüfen", "das Warten", "das Nachfragen"],
        answer: 1,
        explain: "„Nicht das Prüfen, sondern das Warten.“",
      },
      {
        kind: "truefalse",
        text: "Die Methode hilft auch gegen feste Überzeugungen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Sie hilft gegen Eile, nicht gegen Überzeugung.“",
      },
      {
        kind: "gapfill",
        text: "Bei Empörung lohnt sich eine Pause von ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„lohnt sich eine Pause von zehn Minuten“.",
      },
      {
        kind: "short_answer",
        text: "Womit endet der Workshop?",
        options: [],
        answer: 0,
        accept: ["mit einer Übung", "einer Übung", "mit einer Aufgabe"],
        explain: "Kuralla değil, bir alıştırmayla bitiyor.",
      },
      {
        text: "Was sagt die dritte Frage?",
        options: [
          "ob man den Beitrag mit dem eigenen Namen unterschreiben würde",
          "ob der Beitrag neu ist",
          "ob viele Leute ihn geteilt haben",
        ],
        answer: 0,
        explain: "Tereddüt eden paylaşmamalı.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w10",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Beitrag im Forum: Meine Regel",
    genre: "forum",
    intro: "Foruma katkı yazıyorsun: önce iki cümle kur, sonra kendi kuralını gerekçesiyle ve sınırıyla anlat.",
    gloss: [
      { de: "die Regel", tr: "kural", en: "rule" },
      { de: "die Ausnahme", tr: "istisna", en: "exception" },
      { de: "der Hinweis", tr: "uyarı", en: "hint" },
      { de: "übertreiben", tr: "abartmak", en: "to exaggerate" },
      { de: "der Beitrag", tr: "katkı", en: "post" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bu kural çoğu durumda işe yarıyor olmalı.",
        answer: "Diese Regel dürfte in den meisten Fällen funktionieren.",
        alternatives: ["In den meisten Fällen dürfte diese Regel funktionieren."],
        hint: "„dürfte“ burada izin değil, ihtiyatlı bir TAHMİN bildiriyor.",
      },
      {
        kind: "build",
        tr: "Yazar metni okumamış olmalı.",
        answer: "Der Verfasser muss den Text nicht gelesen haben.",
        alternatives: ["Der Verfasser kann den Text nicht gelesen haben."],
        hint: "Öznel „müssen“ güçlü bir çıkarım bildirir; geçmiş için mastar + „haben“ gelir.",
      },
      {
        kind: "free",
        prompt:
          "Foruma bir katkı yaz: tartışmaya kısaca bağlan, kendi kuralını söyle, nereden geldiğini anlat, kuralının sınırını dürüstçe yaz ve başkalarına bir soru bırak.",
        checklist: [
          "Tartışmaya bağlan ve kendi kuralını yaz",
          "Kuralın nereden geldiğini anlat",
          "Sınırını dürüstçe söyle",
          "Başkalarına bir soru bırak",
        ],
        minWords: 120,
        phrases: [
          { de: "Ich lese hier schon länger mit und …", tr: "Bir süredir burayı takip ediyorum ve …", en: "I have been following this for a while and …" },
          { de: "Meine eigene Regel ist ziemlich einfach: …", tr: "Kendi kuralım oldukça basit: …", en: "My own rule is quite simple: …" },
          { de: "Darauf gekommen bin ich, weil …", tr: "Buna … yüzünden vardım", en: "I came to this because …" },
          { de: "Sie stößt allerdings da an ihre Grenze, wo …", tr: "Ancak … noktasında sınırına dayanıyor", en: "However, it reaches its limit where …" },
          { de: "Mich würde interessieren, wie ihr das löst.", tr: "Bunu nasıl çözdüğünüzü merak ediyorum.", en: "I would be interested to know how you solve this." },
        ],
        sample:
          "Ich lese hier schon länger mit und finde die Diskussion über Quellen gut, glaube aber, " +
          "dass wir zu viel über Prüfen und zu wenig über Tempo reden. " +
          "Meine eigene Regel ist ziemlich einfach: Wenn ich einen Beitrag sofort weitergeben will, " +
          "gebe ich ihn nicht weiter. Die Eile selbst ist für mich das Warnzeichen geworden. " +
          "Darauf gekommen bin ich, weil ich vor zwei Jahren ein Video geteilt habe, das ich " +
          "zehn Minuten später wieder gelöscht habe; es war echt, aber vier Jahre alt und aus " +
          "einem anderen Land. Der Verfasser muss das gewusst haben, er hat es trotzdem ohne " +
          "Datum gepostet, und ich habe mitgeholfen. " +
          "Die Regel stößt allerdings da an ihre Grenze, wo es wirklich eilig ist — " +
          "bei Warnungen zum Beispiel, wo zehn Minuten Unterschied machen können. " +
          "Für solche Fälle dürfte ein zweites Kriterium nötig sein, ich habe aber keins gefunden. " +
          "Mich würde interessieren, wie ihr das löst.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s10",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollten Plattformen Inhalte löschen?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: iki değer çatıştığında nasıl karar verdiğini anlat.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Platformlar yanlış bilgi içeren gönderileri silmeli mi? İki değerin çatıştığı yeri adlandır, kendi ölçütünü söyle, kötüye kullanım riskini anlat ve bir güvence öner.",
      bulletsTr: [
        "Çatışan iki değeri adlandır",
        "Kendi ölçütünü söyle",
        "Kötüye kullanım riskini anlat",
        "Bir güvence öner",
      ],
      targets: [
        { de: "Hier stehen sich zwei berechtigte Interessen gegenüber: …", tr: "Burada iki meşru çıkar karşı karşıya: …" },
        { de: "Mein Kriterium wäre weniger …, sondern …", tr: "Ölçütüm … değil, … olurdu" },
        { de: "Missbrauchen ließe sich das vor allem dann, wenn …", tr: "Bu özellikle … olursa kötüye kullanılabilir" },
        { de: "Als Absicherung würde ich verlangen, dass …", tr: "Güvence olarak … isterdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Hier stehen sich zwei berechtigte Interessen gegenüber: der Schutz vor Schaden auf der " +
        "einen und die Freiheit, auch Unsinn zu sagen, auf der anderen Seite. " +
        "Wer eines von beiden einfach für wichtiger erklärt, macht es sich zu leicht. " +
        "Mein Kriterium wäre weniger der Wahrheitsgehalt, sondern der konkrete Schaden: " +
        "Ein falscher Beitrag über ein Medikament kann jemanden ins Krankenhaus bringen, " +
        "ein falscher Beitrag über ein Fußballspiel nicht. " +
        "Missbrauchen ließe sich das vor allem dann, wenn die Plattform selbst entscheidet, " +
        "was als Schaden gilt, und zwar ohne Begründung und ohne Widerspruchsmöglichkeit. " +
        "Dann verschiebt sich die Grenze still, und zwar in die Richtung, die gerade bequem ist. " +
        "Als Absicherung würde ich deshalb verlangen, dass jede Löschung begründet wird, " +
        "dass die Zahlen veröffentlicht werden und dass eine unabhängige Stelle Stichproben prüft. " +
        "Ohne diese drei Punkte bin ich gegen das Löschen, mit ihnen dafür.",
      rubricHint:
        "İki değerin adlandırılması, bir ölçüt ve somut güvenceler beklenir; „sich gegenüberstehen“, „weniger … sondern“ ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g10",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Er muss es gewusst haben",
    genre: "grammar",
    intro: "Modal fiiller ikinci bir iş daha yapar: zorunluluk değil, konuşanın ne kadar emin olduğunu bildirir.",
    focus: "Öznel modal fiiller: tahmin ve kesinlik derecesi",
    gloss: [
      { de: "die Vermutung", tr: "tahmin", en: "assumption" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "das Lokal", tr: "mekân", en: "restaurant" },
      { de: "unterwegs", tr: "yolda", en: "on the way" },
      { de: "krank", tr: "hasta", en: "ill" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Aynı fiil, iki iş",
        tr: "„Er muss arbeiten“ iki şey söyleyebilir: bir zorunluluk (çalışmak zorunda) ya da bir çıkarım (çalışıyor olmalı). Hangisi olduğunu bağlam belirler. Bu ikinci kullanıma ÖZNEL modal fiil denir ve konuşanın ne kadar emin olduğunu ölçer.",
        examples: [
          { de: "Er muss krank sein, er ist sonst nie zu Hause.", tr: "Hasta olmalı, yoksa asla evde olmaz.", note: "güçlü çıkarım" },
          { de: "Sie dürfte schon unterwegs sein.", tr: "Yola çıkmış olmalı.", note: "ihtiyatlı tahmin" },
          { de: "Das kann nicht stimmen.", tr: "Bu doğru olamaz.", note: "güçlü ret" },
        ],
      },
      {
        heading: "Kesinlik ölçeği",
        tr: "Sıralama şöyledir: „müssen“ neredeyse kesin, „dürfte“ muhtemelen, „könnte/kann“ mümkün, „mag“ olabilir de olmayabilir de. Olumsuzda „kann nicht“ neredeyse imkânsız demektir. Ayrıca „sollen“ ve „wollen“ ayrı bir iş yapar: başkasının ya da öznenin İDDİASINI aktarır.",
        examples: [
          { de: "Der Zug könnte Verspätung haben.", tr: "Tren gecikebilir.", note: "mümkün" },
          { de: "Das Lokal soll sehr gut sein.", tr: "Mekân çok iyiymiş.", note: "başkaları öyle diyor" },
          { de: "Er will nichts gewusst haben.", tr: "Hiçbir şey bilmediğini iddia ediyor.", note: "öznenin kendi iddiası" },
        ],
      },
      {
        heading: "Geçmiş için: mastar + haben/sein",
        tr: "Tahmin geçmişe bakıyorsa modal fiil ŞİMDİKİ zamanda kalır ve arkasına Partizip + „haben“ ya da „sein“ gelir: „muss gewusst haben“, „dürfte abgefahren sein“. Modal fiilin kendisi geçmişe çekilmez — „musste gewusst haben“ yanlıştır.",
        examples: [
          { de: "Er muss es gewusst haben.", tr: "Bunu biliyor olmalı.", note: "geçmiş çıkarım" },
          { de: "Der Zug dürfte schon abgefahren sein.", tr: "Tren çoktan kalkmış olmalı.", note: "sein ile" },
          { de: "Sie kann das nicht gesagt haben.", tr: "Bunu söylemiş olamaz.", note: "olumsuz çıkarım" },
        ],
      },
    ],
    questions: [
      {
        text: "„Er muss krank sein.“ — Was bedeutet das hier?",
        options: [
          "Er ist verpflichtet, krank zu sein.",
          "Ich bin fast sicher, dass er krank ist.",
          "Er soll krank werden.",
        ],
        answer: 1,
        explain: "Öznel kullanımda „müssen“ güçlü bir çıkarımdır.",
      },
      {
        text: "Welche Form drückt die vorsichtigste Vermutung aus?",
        options: ["muss", "dürfte", "kann nicht"],
        answer: 1,
        explain: "„dürfte“ ihtiyatlı bir tahmindir; „muss“ neredeyse kesin, „kann nicht“ redde yakın.",
      },
      {
        text: "„Das Lokal soll sehr gut sein.“ — Wer sagt das?",
        options: ["der Sprecher selbst", "andere Leute", "der Besitzer des Lokals"],
        answer: 1,
        explain: "„sollen“ başkalarının iddiasını aktarır.",
      },
      {
        kind: "gapfill",
        text: "Er ___ es gewusst haben, anders ist das nicht zu erklären. (müssen)",
        options: [],
        answer: 0,
        accept: ["muss"],
        explain: "Geçmişe bakan güçlü çıkarım: muss + Partizip + haben.",
      },
      {
        kind: "gapfill",
        text: "Der Zug ___ schon abgefahren sein. (dürfen, Konjunktiv II)",
        options: [],
        answer: 0,
        accept: ["dürfte"],
        explain: "İhtiyatlı tahmin için „dürfte“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Sie ___ das nicht gesagt haben, ich war dabei. (können)",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Olumsuz çıkarım: „kann nicht … gesagt haben“.",
      },
      {
        kind: "gapfill",
        text: "Er ___ nichts gewusst haben. (wollen)",
        options: [],
        answer: 0,
        accept: ["will"],
        explain: "„wollen“ öznenin kendi iddiasını aktarır: bilmediğini iddia ediyor.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Zug", "dürfte", "schon", "abgefahren", "sein"],
        explain: "Modal fiil ikinci sırada; Partizip ve „sein“ cümlenin sonunda.",
      },
      {
        kind: "truefalse",
        text: "„Er musste es gewusst haben.“ — Bu tahmin bildiren doğru bir biçim mi?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Öznel kullanımda modal fiil şimdiki zamanda kalır: „Er muss es gewusst haben.“",
      },
      {
        kind: "truefalse",
        text: "„Das kann nicht stimmen.“ — Bu güçlü bir ret mi?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Olumsuz „können“ neredeyse imkânsızlık bildirir.",
      },
    ],
  },
];

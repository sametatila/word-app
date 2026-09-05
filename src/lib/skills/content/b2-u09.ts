import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 9 — "Başkasının bilgisiyle ne yapıyorsun?".
 *
 * Dört ders: Er soll im Ausland sein · Das Interview · Der Leserbrief ·
 * Die packende Doku. Dördü de kendine ait olmayan bir bilgiyle ilgileniyor:
 * söylentiye mesafe koymak, bir soruyu aktarmak, itiraz ederken tavizi de
 * vermek ve bir izlenimi sıfata sıkıştırmak.
 *
 *   Ünite 9: das Gerücht, sich aufhalten, kursieren, die Verschwörungstheorie,
 *            die Empörung, anonym, verschweigen, enthüllen · der Anlass,
 *            der Gesprächspartner, der Moderator, die Pressekonferenz,
 *            befragen, ausweichen, nachhaken, zitieren · der Leserbrief,
 *            die Redaktion, die Kolumne, der Leitartikel, die Rubrik,
 *            die Gegendarstellung, die Veröffentlichung, journalistisch ·
 *            der Dokumentarfilm, die Einschaltquote, ausstrahlen, mitreißen,
 *            beeindrucken, fesselnd, sehenswert, zeitgenössisch
 *   Kalıplar: Er soll … sein · Er will … haben · Auf die Frage, ob … ·
 *            Er betonte, dass … · Zwar …, jedoch … · Einerseits … andererseits …
 *            die im Film gezeigten …
 *
 * soll ile will arasındaki fark bu ünitenin merkezi: soll başkasının iddiasını,
 * will kişinin kendi iddiasını işaretler. İkisi de "-mış" ile çevrilebildiği
 * için Türkçe konuşan farkı ancak bağlamdan görür — egzersizler bu yüzden
 * iddianın kaynağını her seferinde sorar.
 */
export const b2U09: SkillExercise[] = [
  {
    id: "b2-u09-r1",
    level: "B2",
    skill: "reading",
    unit: 9,
    title: "Wer sagt das eigentlich?",
    genre: "Deneme",
    intro: "Söylentilerin nasıl yayıldığını anlatan bir yazı. Kimin iddia ettiğine dikkat et.",
    gloss: [
      { de: "das Gerücht", tr: "söylenti", en: "rumour" },
      { de: "sich aufhalten", tr: "bir yerde bulunmak", en: "to be staying" },
      { de: "kursieren", tr: "ortalıkta dolaşmak", en: "to circulate" },
      { de: "die Verschwörungstheorie", tr: "komplo teorisi", en: "conspiracy theory" },
      { de: "die Empörung", tr: "infial", en: "outrage" },
      { de: "anonym", tr: "anonim", en: "anonymous" },
      { de: "verschweigen", tr: "gizlemek", en: "to withhold" },
      { de: "enthüllen", tr: "ifşa etmek", en: "to reveal" },
    ],
    minutes: 6,
    text:
      "WER SAGT DAS EIGENTLICH?\n\n" +
      "„Der Bürgermeister soll seit Wochen im Ausland sein.“ Dieser Satz kursierte im Frühjahr drei Wochen lang in unserer Stadt, und man konnte an ihm sehr genau studieren, wie ein Gerücht funktioniert.\n\n" +
      "Zuerst die Form. Wer „soll“ sagt, behauptet nichts. Er berichtet, dass andere etwas behaupten — und schiebt die Verantwortung damit weiter. Anders bei „will“: „Er will nichts davon gewusst haben“ heißt, dass er es selbst sagt und dass der Schreiber daran zweifelt. Zwei Modalverben, zwei ganz verschiedene Quellen.\n\n" +
      "Dann der Weg. Das Gerücht begann in einem anonymen Kommentar unter einem Zeitungsartikel. Innerhalb von zwei Tagen stand es in vier Gruppenchats, und am vierten Tag fragte jemand in der Ratssitzung, wo der Bürgermeister sich aufhalten solle. Da war aus einer Behauptung schon eine Tatsache geworden, über die man sich streiten konnte.\n\n" +
      "Dann die Empörung. Sie kommt immer vor der Prüfung, nie danach. Wer empört ist, fragt nicht mehr nach der Quelle — und wenn die Redaktion später schreibt, es habe nie eine Auslandsreise gegeben, liest das die Hälfte gar nicht mehr.\n\n" +
      "Und zum Schluss die Verschwörungstheorie. Sie entsteht nicht aus dem Gerücht selbst, sondern aus seiner Widerlegung: Wenn die Reise nie stattgefunden hat, dann will man wohl etwas verschweigen. So dreht sich jedes Dementi zum Beweis um.\n\n" +
      "Es hat übrigens einen Menschen gebraucht, um die Sache zu enthüllen — einen Praktikanten, der den Terminkalender der Stadt las. Der Bürgermeister war in diesen Wochen jeden Tag im Rathaus.",
    questions: [
      {
        text: "Was drückt „Er soll im Ausland sein“ aus?",
        options: [
          "Der Schreiber behauptet es selbst.",
          "Andere behaupten es; der Schreiber gibt es weiter.",
          "Es ist amtlich bestätigt.",
        ],
        answer: 1,
        explain: "„Wer 'soll' sagt, behauptet nichts. Er berichtet, dass andere etwas behaupten.“",
      },
      {
        kind: "gapfill",
        text: "Er ___ nichts davon gewusst haben — er selbst sagt das, und der Schreiber zweifelt.",
        options: [],
        answer: 0,
        accept: ["will"],
        explain: "wollen öznel kip olarak kişinin KENDİ iddiasını işaretler; sollen başkasınınkini.",
      },
      {
        kind: "short_answer",
        text: "Wo begann das Gerücht?",
        options: [],
        answer: 0,
        accept: ["in einem anonymen Kommentar", "in einem Kommentar", "unter einem Zeitungsartikel"],
        explain: "„Das Gerücht begann in einem anonymen Kommentar unter einem Zeitungsartikel.“",
      },
      {
        text: "Woraus entsteht laut Text die Verschwörungstheorie?",
        options: [
          "aus dem Gerücht selbst",
          "aus seiner Widerlegung",
          "aus der Berichterstattung der Redaktion",
        ],
        answer: 1,
        explain: "„Sie entsteht nicht aus dem Gerücht selbst, sondern aus seiner Widerlegung.“",
      },
      {
        text: "Der Bürgermeister war tatsächlich im Ausland.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Der Bürgermeister war in diesen Wochen jeden Tag im Rathaus.“",
      },
    ],
  },

  {
    id: "b2-u09-r2",
    level: "B2",
    skill: "reading",
    unit: 9,
    title: "Leserbrief an die Redaktion",
    genre: "Okur mektubu",
    intro: "Bir okurun gazeteye yazdığı itiraz mektubu. Nerede hak veriyor, nerede karşı çıkıyor?",
    gloss: [
      { de: "der Leserbrief", tr: "okur mektubu", en: "letter to the editor" },
      { de: "die Redaktion", tr: "yayın kurulu", en: "editorial team" },
      { de: "die Kolumne", tr: "köşe yazısı", en: "column" },
      { de: "der Leitartikel", tr: "başyazı", en: "editorial" },
      { de: "die Rubrik", tr: "kategori", en: "section" },
      { de: "die Gegendarstellung", tr: "karşı açıklama", en: "right of reply" },
      { de: "die Veröffentlichung", tr: "yayımlama", en: "publication" },
      { de: "journalistisch", tr: "gazetecilikle ilgili", en: "journalistic" },
    ],
    minutes: 6,
    text:
      "LESERBRIEF ZUM LEITARTIKEL VOM 12. MÄRZ\n\n" +
      "Sehr geehrte Redaktion,\n\n" +
      "ich lese Ihre Zeitung seit achtzehn Jahren, und ich schreibe zum ersten Mal einen Leserbrief. Das sollte Ihnen zeigen, dass es mir ernst ist.\n\n" +
      "Zwar teile ich die Grundthese Ihres Leitartikels, jedoch halte ich den Weg dorthin für journalistisch fragwürdig. Dass die Innenstadt ein Verkehrsproblem hat, bestreitet niemand. Aber Sie stützen sich auf eine einzige Zahl, und diese Zahl stammt aus einer Erhebung, die vier Jahre alt ist. Das steht auch nirgends im Text.\n\n" +
      "Einerseits verlangen Sie in Ihrer Kolumne regelmäßig, dass Politiker ihre Quellen offenlegen. Andererseits verzichten Sie im eigenen Leitartikel genau darauf. Diesen Widerspruch sollten Sie auflösen, nicht ich.\n\n" +
      "Zwei Anmerkungen noch. Erstens: Der Text stand in der Rubrik „Meinung“, das ist mir bewusst. Eine Meinung darf zugespitzt sein — aber die Zahlen darunter müssen trotzdem stimmen. Zweitens: Ich verlange keine Gegendarstellung, dazu ist der Fall zu klein. Eine kurze Korrektur bei der nächsten Veröffentlichung würde genügen.\n\n" +
      "Ich schreibe das nicht, weil ich Ihre Zeitung schlecht finde, sondern weil ich sie brauche. Wer nichts erwartet, schreibt keine Leserbriefe.\n\n" +
      "Mit freundlichen Grüßen\nH. Bergmann, Freiburg",
    questions: [
      {
        kind: "gapfill",
        text: "___ teile ich die Grundthese, jedoch halte ich den Weg dorthin für fragwürdig.",
        options: [],
        answer: 0,
        accept: ["Zwar"],
        explain: "zwar … jedoch: önce taviz, sonra itiraz. İkinci bölüm ağır basar.",
      },
      {
        text: "Was kritisiert der Leser am Leitartikel?",
        options: [
          "die Grundthese",
          "dass sich der Text auf eine vier Jahre alte Zahl stützt",
          "dass er in der Rubrik „Meinung“ stand",
        ],
        answer: 1,
        explain: "„…Sie stützen sich auf eine einzige Zahl, und diese Zahl stammt aus einer Erhebung, die vier Jahre alt ist.“",
      },
      {
        kind: "short_answer",
        text: "Was verlangt der Leser statt einer Gegendarstellung?",
        options: [],
        answer: 0,
        accept: ["eine kurze Korrektur", "eine Korrektur", "nur eine Korrektur"],
        explain: "„Eine kurze Korrektur bei der nächsten Veröffentlichung würde genügen.“",
      },
      {
        text: "Welchen Widerspruch nennt der Leser?",
        options: [
          "Die Zeitung verlangt Quellen von Politikern, legt aber eigene nicht offen.",
          "Die Zeitung schreibt zu selten über Verkehr.",
          "Die Kolumne widerspricht dem Leitartikel.",
        ],
        answer: 0,
        explain: "„Einerseits verlangen Sie … dass Politiker ihre Quellen offenlegen. Andererseits verzichten Sie im eigenen Leitartikel genau darauf.“",
      },
      {
        text: "Der Leser findet die Zeitung insgesamt schlecht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…nicht, weil ich Ihre Zeitung schlecht finde, sondern weil ich sie brauche.“",
      },
    ],
  },

  {
    id: "b2-u09-l1",
    level: "B2",
    skill: "listening",
    unit: 9,
    title: "Nach der Pressekonferenz",
    genre: "Diyalog",
    intro: "İki gazeteci basın toplantısından çıkmış, kimin neye cevap vermediğini konuşuyor.",
    gloss: [
      { de: "der Anlass", tr: "vesile", en: "occasion" },
      { de: "der Gesprächspartner", tr: "muhatap", en: "interviewee" },
      { de: "der Moderator", tr: "sunucu", en: "host" },
      { de: "die Pressekonferenz", tr: "basın toplantısı", en: "press conference" },
      { de: "befragen", tr: "soru sormak", en: "to question" },
      { de: "ausweichen", tr: "kaçamak cevap vermek", en: "to dodge" },
      { de: "nachhaken", tr: "üstüne gitmek", en: "to follow up" },
      { de: "zitieren", tr: "alıntılamak", en: "to quote" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ines", text: "Und? Hast du etwas aus der Pressekonferenz mitgenommen?" },
      { speaker: "Deniz", text: "Wenig. Auf die Frage, ob die Stelle gestrichen wird, ist er ausgewichen." },
      { speaker: "Ines", text: "Was hat er stattdessen gesagt?" },
      { speaker: "Deniz", text: "Er betonte, dass alle Optionen geprüft würden. Das heißt nichts." },
      { speaker: "Ines", text: "Hat jemand nachgehakt?" },
      { speaker: "Deniz", text: "Der Moderator nicht. Aber die Kollegin vom Rundfunk hat zweimal nachgehakt." },
      { speaker: "Ines", text: "Und dann?" },
      { speaker: "Deniz", text: "Dann sagte er, er wolle dem Verfahren nicht vorgreifen. Wortwörtlich." },
      { speaker: "Ines", text: "Kannst du ihn so zitieren?" },
      { speaker: "Deniz", text: "Ja, ich habe die Aufnahme. Was ich nicht kann, ist daraus eine Nachricht machen." },
      { speaker: "Ines", text: "Was war überhaupt der Anlass? Warum jetzt?" },
      { speaker: "Deniz", text: "Der Haushalt kommt nächste Woche in den Rat. Deshalb dieser Termin." },
      { speaker: "Ines", text: "Dann befragen wir am besten jemanden aus dem Rat." },
      { speaker: "Deniz", text: "Genau. Ein Gesprächspartner, der nicht auf dem Podium sitzt, sagt oft mehr." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Deniz'in soruya kaçamak cevap verildiğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Auf die Frage, ob die Stelle gestrichen wird, ist er ausgewichen."],
        explain: "Dolaylı soru: ob ile kurulur, çekimli fiil yan cümlenin sonunda.",
      },
      {
        text: "Wer hat nachgehakt?",
        options: ["der Moderator", "die Kollegin vom Rundfunk", "niemand"],
        answer: 1,
        explain: "„Der Moderator nicht. Aber die Kollegin vom Rundfunk hat zweimal nachgehakt.“",
      },
      {
        kind: "short_answer",
        text: "Was war der Anlass für den Termin?",
        options: [],
        answer: 0,
        accept: ["der Haushalt", "die Haushaltssitzung", "der Haushalt im Rat"],
        explain: "„Der Haushalt kommt nächste Woche in den Rat. Deshalb dieser Termin.“",
      },
      {
        text: "Warum will Deniz jemanden aus dem Rat befragen?",
        options: [
          "weil ein Gesprächspartner abseits des Podiums oft mehr sagt",
          "weil der Moderator nichts gefragt hat",
          "weil die Aufnahme unbrauchbar ist",
        ],
        answer: 0,
        explain: "„Ein Gesprächspartner, der nicht auf dem Podium sitzt, sagt oft mehr.“",
      },
      {
        text: "Deniz kann den Sprecher nicht wörtlich zitieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, ich habe die Aufnahme.“ Sorun alıntıda değil, haberi çıkarmakta.",
      },
    ],
  },

  {
    id: "b2-u09-l2",
    level: "B2",
    skill: "listening",
    unit: 9,
    title: "Hast du die Doku gesehen?",
    genre: "Diyalog",
    intro: "İki arkadaş dün akşam yayınlanan bir belgeseli konuşuyor.",
    gloss: [
      { de: "der Dokumentarfilm", tr: "belgesel", en: "documentary" },
      { de: "die Einschaltquote", tr: "izlenme oranı", en: "viewing figures" },
      { de: "ausstrahlen", tr: "yayınlamak", en: "to broadcast" },
      { de: "mitreißen", tr: "coşturmak", en: "to carry away" },
      { de: "beeindrucken", tr: "etkilemek", en: "to impress" },
      { de: "fesselnd", tr: "sürükleyici", en: "gripping" },
      { de: "sehenswert", tr: "görülmeye değer", en: "worth watching" },
      { de: "zeitgenössisch", tr: "çağdaş", en: "contemporary" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Mira", text: "Hast du den Dokumentarfilm gesehen, den sie gestern ausgestrahlt haben?" },
      { speaker: "Jo", text: "Die Hälfte. Danach bin ich eingeschlafen, ehrlich." },
      { speaker: "Mira", text: "Schade. Die erste Hälfte ist zäh, aber die zweite reißt richtig mit." },
      { speaker: "Jo", text: "Was passiert denn noch?" },
      { speaker: "Mira", text: "Die im Film gezeigten Aufnahmen aus dem Archiv sind das Beste daran." },
      { speaker: "Jo", text: "Alte Aufnahmen? Das klingt nicht besonders fesselnd." },
      { speaker: "Mira", text: "Doch, weil sie neben die heutigen gestellt werden. Derselbe Platz, sechzig Jahre Abstand." },
      { speaker: "Jo", text: "Okay, das beeindruckt mich tatsächlich." },
      { speaker: "Mira", text: "Und die Musik ist zeitgenössisch, nicht dieses übliche Klavier." },
      { speaker: "Jo", text: "Hatte die Doku eigentlich gute Einschaltquoten?" },
      { speaker: "Mira", text: "Erstaunlich gute, für einen Mittwochabend. Es lief besser als der Krimi." },
      { speaker: "Jo", text: "Dann hole ich den Rest nach." },
      { speaker: "Mira", text: "Tu das. Die zweite Hälfte allein ist schon sehenswert." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Mira'nın arşiv görüntülerini övdüğü cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die im Film gezeigten Aufnahmen aus dem Archiv sind das Beste daran."],
        explain: "Ortaç sıfatı: 'die Aufnahmen, die im Film gezeigt werden' tek sıfata sıkışıyor.",
      },
      {
        text: "Warum wirken die alten Aufnahmen laut Mira?",
        options: [
          "weil sie in Farbe sind",
          "weil sie neben die heutigen gestellt werden",
          "weil sie neu vertont wurden",
        ],
        answer: 1,
        explain: "„Doch, weil sie neben die heutigen gestellt werden. Derselbe Platz, sechzig Jahre Abstand.“",
      },
      {
        kind: "short_answer",
        text: "Welche Hälfte des Films ist besser?",
        options: [],
        answer: 0,
        accept: ["die zweite", "die zweite Hälfte", "zweite Hälfte"],
        explain: "„Die erste Hälfte ist zäh, aber die zweite reißt richtig mit.“",
      },
      {
        text: "Wie waren die Einschaltquoten?",
        options: [
          "erstaunlich gut, besser als der Krimi",
          "schlecht, weil Mittwoch",
          "das wird im Gespräch nicht gesagt",
        ],
        answer: 0,
        explain: "„Erstaunlich gute, für einen Mittwochabend. Es lief besser als der Krimi.“",
      },
      {
        text: "Jo hat den ganzen Film gesehen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Hälfte. Danach bin ich eingeschlafen.“",
      },
    ],
  },

  {
    id: "b2-u09-w1",
    level: "B2",
    skill: "writing",
    unit: 9,
    title: "Kaynağı işaretle",
    genre: "Cümle kurma",
    intro: "İddia kimin? Söylenti kipi, dolaylı soru, iki parçalı bağlaç ve ortaç sıfatı.",
    gloss: [
      { de: "sich aufhalten", tr: "bir yerde bulunmak", en: "to be staying" },
      { de: "ausweichen", tr: "kaçamak cevap vermek", en: "to dodge" },
      { de: "die Kolumne", tr: "köşe yazısı", en: "column" },
      { de: "ausstrahlen", tr: "yayınlamak", en: "to broadcast" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Haftalardır yurt dışındaymış.",
        answer: "Er soll seit Wochen im Ausland sein",
        hint: "sollen öznel kip: iddia başkasına ait, yazan aktarıyor.",
      },
      {
        kind: "build",
        tr: "Kendi iddiasına göre hiçbir şey bilmiyormuş.",
        answer: "Er will nichts davon gewusst haben",
        hint: "wollen öznel kip: iddia kişinin kendisine ait, yazan şüpheli.",
      },
      {
        kind: "build",
        tr: "Kadronun kaldırılıp kaldırılmayacağı sorusuna kaçamak cevap verdi.",
        answer: "Auf die Frage, ob die Stelle gestrichen wird, ist er ausgewichen",
        hint: "Dolaylı soru ob ile; çekimli fiil yan cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Köşe yazısını beğeniyorum ama başyazıyı beğenmiyorum.",
        answer: "Zwar mag ich die Kolumne, jedoch nicht den Leitartikel",
        hint: "zwar cümle başında olunca fiil hemen arkasından gelir.",
      },
      {
        kind: "rewrite",
        prompt: "Yan cümleyi ortaç sıfatına çevir.",
        source: "Die Aufnahmen, die gestern ausgestrahlt wurden, sind sehenswert.",
        answer: "Die gestern ausgestrahlten Aufnahmen sind sehenswert.",
        alternatives: ["Die gestern ausgestrahlten Aufnahmen sind sehenswert"],
        why: "Ortaç sıfatı ilgi cümlesini artikel ile ad arasına sıkıştırır: zaman ve yer belirteçleri de oraya taşınır. Türkçedeki '-en, -dığı' ortaçları da aynı yeri tutar, o yüzden sıra tanıdıktır; asıl fark ortacın çekimli sıfat eki almasıdır.",
      },
    ],
  },

  {
    id: "b2-u09-w2",
    level: "B2",
    skill: "writing",
    unit: 9,
    title: "Ihr Leserbrief",
    genre: "Okur mektubu",
    intro: "Bir yazıya itiraz et — ama önce hak verdiğin yeri söyle.",
    gloss: [
      { de: "die Redaktion", tr: "yayın kurulu", en: "editorial team" },
      { de: "der Leitartikel", tr: "başyazı", en: "editorial" },
      { de: "journalistisch", tr: "gazetecilikle ilgili", en: "journalistic" },
      { de: "die Veröffentlichung", tr: "yayımlama", en: "publication" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Okuduğun bir yazıya okur mektubu yaz — gerçek bir yazı ya da uydurduğun bir başyazı olabilir. Şu sırayı tut: neden yazdığın, hangi noktada hak verdiğin, hangi noktada karşı çıktığın ve ne istediğin. Taviz ile itirazı zwar … jedoch ya da einerseits … andererseits ile bağla; en az bir kez de ortaç sıfatı kullan. Ton sert olabilir ama hakaret olmasın.",
        checklist: [
          "Hangi yazıya cevap verildiği baştan belli mi?",
          "En az bir zwar … jedoch ya da einerseits … andererseits var mı?",
          "Hak verilen nokta ile itiraz edilen nokta ayrı mı?",
          "Sonda somut bir istek var mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Zwar teile ich Ihre These, jedoch …", tr: "tezinize katılıyorum ama …", en: "I do share your thesis, however …" },
          { de: "Einerseits …, andererseits …", tr: "bir yandan …, öte yandan …", en: "on the one hand …, on the other …" },
          { de: "Eine kurze Korrektur würde genügen.", tr: "kısa bir düzeltme yeterli olur", en: "a short correction would suffice" },
        ],
        sample:
          "Sehr geehrte Redaktion,\n\n" +
          "ich schreibe zu Ihrem Leitartikel über die Schließung des Hallenbads.\n\n" +
          "Zwar teile ich Ihre Grundthese, dass die Stadt sparen muss, jedoch halte ich die Auswahl für falsch begründet. Sie schreiben, das Bad sei zu wenig ausgelastet. Die von Ihnen genannten Zahlen stammen aber aus dem Jahr, in dem das Bad fünf Monate wegen Reparaturen geschlossen war. Das steht nirgends im Text, und journalistisch ist das ein Problem.\n\n" +
          "Einerseits verlangen Sie von der Verwaltung Transparenz, andererseits nennen Sie Ihre eigene Quelle nicht. Das passt nicht zusammen.\n\n" +
          "Ich bitte nicht um eine Gegendarstellung. Eine kurze Einordnung der Zahlen bei der nächsten Veröffentlichung würde genügen — und wäre für Ihre Leser wichtiger als jede weitere Meinung.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];

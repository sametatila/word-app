import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: seslendirme söyleşisi, radyo denemesi ve kişisel e-posta. Üçü de
 * tonu taşıyan küçük kelimelerle çalışır; dil bilgisi modal parçacıklar.
 */
export const deC1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r4",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Der Satz steht da, der Ton nicht",
    genre: "interview",
    intro: "Bir sesli kitap seslendiricisiyle söyleşi okuyacaksın: tonu ne belirliyor, hangi küçük kelimeler işi taşıyor.",
    gloss: [
      { de: "einlesen", tr: "seslendirmek", en: "to record" },
      { de: "der Vorwurf", tr: "sitem", en: "reproach" },
      { de: "die Feststellung", tr: "saptama", en: "statement of fact" },
      { de: "die Fassung", tr: "versiyon", en: "version" },
      { de: "weglassen", tr: "atlamak", en: "to omit" },
      { de: "verschlucken", tr: "yutmak", en: "to swallow" },
      { de: "die Pause", tr: "duraklama", en: "pause" },
      { de: "betonen", tr: "vurgulamak", en: "to stress" },
    ],
    minutes: 10,
    text:
      "„DER SATZ STEHT DA, DER TON NICHT“\n" +
      "Ein Gespräch mit Ilka Rosenow, seit vierzehn Jahren Hörbuchsprecherin\n\n" +
      "Frau Rosenow, was ist beim Einlesen das eigentliche Problem?\n" +
      "Dass im Text nur die Wörter stehen. Ob eine Figur „Komm doch mit“ als Bitte, als Vorwurf oder als müde " +
      "Wiederholung sagt, entscheidet nicht der Autor, sondern ich. Und ich entscheide es hundertmal am Tag.\n\n" +
      "Woran halten Sie sich dabei?\n" +
      "An den Partikeln, vor allem. Deutsch hat diese kleinen Wörter, die im Wörterbuch fast nichts bedeuten " +
      "und im Satz alles: doch, ja, mal, eben, halt. Wenn da steht „Das ist ja interessant“, ist der Satz ohne " +
      "das „ja“ eine Feststellung. Mit „ja“ ist es Überraschung — oder Ironie, je nachdem, wie ich ihn lege.\n\n" +
      "Können Sie ein Beispiel geben?\n" +
      "„Nimm es dir eben.“ Ohne „eben“ ist das eine Aufforderung. Mit „eben“ sage ich dir zusätzlich, dass es " +
      "keine große Sache ist und dass du zu lange fragst. Übersetzen kann man das kaum. Ich habe einmal eine " +
      "Fassung eingelesen, in der „halt“ konsequent weggelassen worden war, und die Figur wurde streng, obwohl " +
      "kein anderes Wort verändert war.\n\n" +
      "Was ist schwieriger, Sachbuch oder Roman?\n" +
      "Sachbuch. Im Roman gibt der Text Hinweise, im Sachbuch nicht. Da steht ein Satz mit vier Nebensätzen, " +
      "und meine Aufgabe ist es, dem Hörer zu zeigen, welcher davon die Hauptaussage trägt. Das mache ich mit " +
      "Pausen, nicht mit Lautstärke.\n\n" +
      "Hören Sie sich selbst gern zu?\n" +
      "Nein. Aber ich höre mir seit Jahren die ersten fünf Minuten am nächsten Morgen an. Man hört sofort, ob " +
      "man am Vortag müde war: Dann werden die Partikel verschluckt, und der Text klingt wie ein Formular.\n\n" +
      "Was raten Sie Anfängern?\n" +
      "Lesen Sie den Satz zuerst laut, ohne ihn zu betonen. Wenn er dann noch verständlich ist, war er gut " +
      "geschrieben. Wenn nicht, wissen Sie, wo Sie helfen müssen — und zwar dort, nicht überall.",
    questions: [
      {
        text: "Worin sieht Frau Rosenow ihre Hauptaufgabe?",
        options: [
          "den Ton herzustellen, der im Text fehlt",
          "Fehler im Manuskript zu korrigieren",
          "möglichst gleichmäßig und laut zu lesen",
        ],
        answer: 0,
        explain: "„Dass im Text nur die Wörter stehen … entscheidet nicht der Autor, sondern ich.“",
      },
      {
        text: "Was passierte in der Fassung ohne „halt“?",
        options: ["Die Figur wirkte streng.", "Der Text wurde deutlich kürzer.", "Die Hörer merkten nichts."],
        answer: 0,
        explain: "„… und die Figur wurde streng, obwohl kein anderes Wort verändert war.“",
      },
      {
        kind: "truefalse",
        text: "Frau Rosenow hört sich am nächsten Morgen einen Teil ihrer Aufnahme an.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Aber ich höre mir seit Jahren die ersten fünf Minuten am nächsten Morgen an.“",
      },
      {
        kind: "gapfill",
        text: "Die Hauptaussage zeigt sie mit ___, nicht mit Lautstärke.",
        options: [],
        answer: 0,
        accept: ["Pausen"],
        explain: "„Das mache ich mit Pausen, nicht mit Lautstärke.“",
      },
      {
        kind: "short_answer",
        text: "Woran hört sie, dass sie am Vortag müde war?",
        options: [],
        answer: 0,
        accept: ["die Partikel werden verschluckt", "Partikel verschluckt", "an den verschluckten Partikeln"],
        explain: "„Dann werden die Partikel verschluckt, und der Text klingt wie ein Formular.“",
      },
      {
        text: "Was rät sie Anfängern?",
        options: [
          "den Satz zuerst unbetont zu lesen",
          "jeden Satz mehrfach stark zu betonen",
          "das Manuskript vorher zu kürzen",
        ],
        answer: 0,
        explain: "„Lesen Sie den Satz zuerst laut, ohne ihn zu betonen.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l4",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Was der Raum von dir will",
    genre: "essay",
    intro: "Radyoda kısa bir deneme dinleyeceksin: mekânlar davranışı nasıl yönlendiriyor ve bunu kim tasarlıyor.",
    gloss: [
      { de: "verzögert", tr: "gecikmeli", en: "delayed" },
      { de: "anstrengend", tr: "yorucu", en: "exhausting" },
      { de: "die Sitzordnung", tr: "oturma düzeni", en: "seating arrangement" },
      { de: "der Anlass", tr: "vesile", en: "occasion" },
      { de: "die Armlehne", tr: "kolçak", en: "armrest" },
      { de: "innehalten", tr: "durup düşünmek", en: "to pause" },
    ],
    minutes: 10,
    segments: [
      { text: "Es gibt Orte, an denen fast alle Menschen leiser werden, ohne dass jemand sie darum bittet. Man betritt sie, und die Stimme geht herunter. Warum eigentlich?" },
      { text: "Die naheliegende Antwort lautet: Erziehung. In einer Kirche flüstert man, weil man es gelernt hat. Das erklärt aber nicht, warum dasselbe in einem alten Bahnhofssaal passiert, in dem nie jemand gebetet hat." },
      { text: "Die zweite Antwort ist akustisch. In hohen Räumen mit harten Wänden kommt die eigene Stimme verzögert zurück. Man hört sich selbst zweimal. Das Sprechen wird anstrengend, und man wird automatisch leiser." },
      { text: "Solche Effekte sind erstaunlich zuverlässig. In einem Versuch wurde in einer Betriebskantine die Sitzordnung geändert: aus langen Tischen wurden Vierertische." },
      { text: "Die Zahl der Gespräche zwischen Abteilungen ging um ein Drittel zurück, und niemand hatte etwas verboten. Die Leute hatten schlicht keinen Anlass mehr, sich neben Fremde zu setzen." },
      { text: "Man kann das begrüßen oder beunruhigend finden. Beides greift zu kurz, solange man nicht fragt, wer den Raum entworfen hat und was er damit wollte." },
      { text: "Denn Räume steuern nicht nur, sie steuern gerichtet. Eine Bank ohne Armlehne lädt zum Sitzen ein; eine Bank mit drei Armlehnen verhindert das Liegen. Beides ist eine Entscheidung, aber nur eine davon steht irgendwo geschrieben." },
      { text: "Genau darin liegt der Reiz dieser Steuerung für Verwaltungen: Sie kommt ohne Verbotsschild aus, und wogegen niemand protestiert, muss auch niemand begründen." },
      { text: "Deshalb ein Vorschlag zum Schluss. Wenn Sie das nächste Mal einen Raum betreten und sich anders verhalten als sonst, halten Sie kurz inne." },
      { text: "Fragen Sie nicht, was mit Ihnen los ist. Fragen Sie, was der Raum von Ihnen will — und wer ihm das beigebracht hat." },
    ],
    questions: [
      {
        text: "Was ist die These des Beitrags?",
        options: [
          "Räume steuern Verhalten, ohne etwas zu verbieten.",
          "Menschen verhalten sich in Kirchen besonders höflich.",
          "Akustik ist wichtiger als jede Architektur.",
        ],
        answer: 0,
        explain: "„… sie kommt ohne Verbotsschild aus“ ve kantin örneğinde „niemand hatte etwas verboten“.",
      },
      {
        text: "Warum wird man in hohen Räumen leiser?",
        options: [
          "weil man die eigene Stimme verzögert hört",
          "weil man es in der Kirche so gelernt hat",
          "weil die harten Wände den Schall schlucken",
        ],
        answer: 0,
        explain: "„… kommt die eigene Stimme verzögert zurück … Das Sprechen wird anstrengend.“",
      },
      {
        kind: "truefalse",
        text: "In dem Versuch wurden Gespräche zwischen Abteilungen verboten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„… und niemand hatte etwas verboten“ — yalnız masa düzeni değişti.",
      },
      {
        kind: "short_answer",
        text: "Was verhindert eine Bank mit drei Armlehnen?",
        options: [],
        answer: 0,
        accept: ["das Liegen", "Liegen", "dass man liegt"],
        explain: "„… eine Bank mit drei Armlehnen verhindert das Liegen.“",
      },
      {
        kind: "dictation",
        text: "Akustik açıklamasındaki kısa cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Man hört sich selbst zweimal.", "Man hört sich selbst zweimal"],
        explain: "„Man hört sich selbst zweimal.“ — dönüşlü zamir fiilden hemen sonra gelir.",
      },
      {
        text: "Warum ist diese Steuerung für Verwaltungen attraktiv?",
        options: [
          "Sie muss nicht begründet werden.",
          "Sie ist besonders billig zu haben.",
          "Ihre Wirkung ist sofort messbar.",
        ],
        answer: 0,
        explain: "„… und wogegen niemand protestiert, muss auch niemand begründen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w4",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Eine ehrliche Antwort",
    genre: "email",
    intro: "Yakın bir arkadaşın büyük bir karar aldı ve fikrini soruyor; önce iki cümle kur, sonra cevabı yaz.",
    gloss: [
      { de: "die Sorge", tr: "kaygı", en: "concern" },
      { de: "beurteilen", tr: "değerlendirmek", en: "to judge" },
      { de: "die Kalkulation", tr: "hesap", en: "calculation" },
      { de: "aufschließen", tr: "kapıyı açmak", en: "to unlock" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bunu bir kere açıkça söylemem lazım.",
        answer: "Ich muss das jetzt mal ganz offen sagen.",
        alternatives: ["Jetzt muss ich das mal ganz offen sagen."],
        hint: "„mal“ cümleyi gündelikleştirir ve sertliği alır; anlamı „bir kez“ değildir.",
      },
      {
        kind: "build",
        tr: "Sen bunu zaten benden iyi biliyorsun.",
        answer: "Du weißt das ja sowieso besser als ich.",
        alternatives: ["Das weißt du ja sowieso besser als ich."],
        hint: "„ja“ karşındakinin zaten bildiği bir şeye gönderme yapar ve cümleyi ortak zemine oturtur.",
      },
      {
        kind: "free",
        prompt:
          "Yakın bir arkadaşın büyük bir karar verdi ve dürüst fikrini istiyor. Cevap yaz: önce sevindiğini söyle, kaygını bir kez ve kesin biçimde adlandır, neyi değerlendiremeyeceğini kabul et, somut yardım öner ve sıcak bir kapanış yap. Günlük dilin küçük kelimelerini kullan.",
        stimulus:
          "Hey! Kurze Info, bevor du es von anderen hörst: Ich kündige zum ersten Oktober und mache die " +
          "Werkstatt allein weiter. Kai steigt aus. Ich weiß, das kommt plötzlich, aber ich habe lange " +
          "gerechnet. Sag mal ehrlich, was du denkst.",
        checklist: [
          "Önce sevindiğini söyle ve nedenini yaz",
          "Kaygını bir kez, tek noktada ve somut söyle",
          "Neyi değerlendiremeyeceğini açıkça kabul et",
          "İki somut yardım öner ve sıcak bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "Erst mal: Ich freue mich für dich.", tr: "Öncelikle: senin adına sevindim." },
          { de: "Ich sage dir einen Punkt, und dann lasse ich es.", tr: "Tek bir noktayı söyleyeyim, sonra bırakıyorum." },
          { de: "Du weißt ja selbst am besten, …", tr: "Sen zaten en iyi bilirsin …" },
          { de: "Das kann ich nicht beurteilen.", tr: "Bunu değerlendiremem." },
          { de: "Ruf mich mal an, wenn …", tr: "… olunca bir ara beni ara" },
        ],
        sample:
          "Hey Su,\n\n" +
          "erst mal: Ich freue mich für dich, und zwar wirklich. Du redest seit vier Jahren von dieser " +
          "Werkstatt, und jetzt machst du es eben. Das ist doch genau die Sorte Entscheidung, bei der du " +
          "hinterher nicht sagen musst, du hättest es nie versucht.\n\n" +
          "Du hast nach meiner ehrlichen Meinung gefragt, also sage ich dir einen Punkt, und dann lasse ich es. " +
          "Was mir Sorgen macht, ist nicht das Geld, sondern Kai. Ihr habt euch bisher die Wochenenden geteilt. " +
          "Wenn du allein weitermachst, bist du der einzige Mensch, der aufschließen kann, und das über Monate. " +
          "Du weißt ja selbst am besten, wie du nach drei Wochen ohne freien Tag wirst. Die Zahlen kann ich " +
          "nicht beurteilen; davon verstehe ich zu wenig, und du hast ja lange gerechnet.\n\n" +
          "Deshalb keine große Rede, sondern zwei Angebote. Erstens: Ich kann von Oktober bis Weihnachten jeden " +
          "zweiten Samstag da sein, Kasse und Telefon, das kriege ich hin. Zweitens: Ruf mich mal an, wenn du " +
          "die Kalkulation durchgehst — nicht weil ich es besser wüsste, sondern weil man beim Vorlesen selber " +
          "Sachen hört.\n\n" +
          "Und sonst: Sag einfach, wann du Hilfe beim Umräumen brauchst. Ich komme.\n\n" +
          "Alles Gute, Emre",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s4",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Geschenk oder Zumutung?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: bir ölçüt kur, üç parçaya ayır ve her parçayı örnekle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Dürüstlük ne zaman bir armağan, ne zaman bir yüktür? Kolaycı „hep dürüst ol“ cevabını aşan bir ölçüt kur ve örneklerle sına.",
      bulletsTr: [
        "Sorunun neden „hep dürüst ol“ ile bitmediğini söyle",
        "Ölçütünün ilk parçası: durum hâlâ açık mı",
        "İkinci parça: kaç kez söyleniyor",
        "Üçüncü parça: neyi değerlendiremediğini söylemek",
      ],
      targets: [
        { de: "Ehrlichkeit ist ja keine Eigenschaft der Aussage.", tr: "Dürüstlük zaten cümlenin bir niteliği değil." },
        { de: "Genau das wäre mein erstes Kriterium: …", tr: "İlk ölçütüm tam da bu olurdu: …" },
        { de: "Nennt man sie dreimal, …", tr: "Üç kez söylenirse …" },
        { de: "Man muss eben sagen, was man nicht beurteilen kann.", tr: "İnsanın değerlendiremediğini söylemesi gerekir işte." },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Ich glaube, die Frage lässt sich nicht mit „immer ehrlich“ beantworten, und zwar nicht aus Feigheit. " +
        "Ehrlichkeit ist ja keine Eigenschaft der Aussage, sondern der Situation. Derselbe Satz kann ein " +
        "Geschenk sein und eine Zumutung, je nachdem, ob der andere noch etwas entscheiden kann. Genau das wäre " +
        "mein erstes Kriterium: Ist die Sache noch offen? Wer mir eine Woche vor der Prüfung sagt, dass mein " +
        "Plan zu eng ist, hilft mir. Wer es mir am Abend danach sagt, erleichtert nur sich selbst. Das zweite " +
        "Kriterium ist die Zahl. Eine Sorge nennt man einmal, deutlich und ohne Umschweife. Nennt man sie " +
        "dreimal, ist es keine Ehrlichkeit mehr, sondern Druck. Und drittens: Man muss eben sagen, was man " +
        "nicht beurteilen kann. Das klingt banal, ist aber selten. Wer alles kommentiert, wird am Ende für " +
        "nichts mehr ernst genommen. Ehrlich ist also nicht, wer am meisten sagt, sondern wer den Teil sagt, " +
        "den der andere braucht — und ihn dann stehen lässt.",
      rubricHint:
        "Ölçüt en az üç parçaya ayrılmalı ve her parça bir örnekle sınanmalı; modal parçacıklar doğal biçimde geçmeli.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g4",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "doch, ja, mal, eben",
    genre: "grammar",
    intro: "Sözlükte neredeyse hiçbir şey ifade etmeyen, cümledeyse tutumu tümüyle belirleyen dört küçük kelime.",
    focus: "Modalpartikel: doch, ja, mal, eben",
    gloss: [
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "einreichen", tr: "teslim etmek", en: "to submit" },
      { de: "schade", tr: "yazık", en: "a pity" },
      { de: "nass", tr: "ıslak", en: "wet" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Bilgi değil, tutum",
        tr: "Türkçede bu işi tonlama ve „işte“, „zaten“, „hele bir“, „canım“ gibi kelimeler görür. Almancada dört küçük parçacık aynı yükü taşır: doch, ja, mal, eben. Cümlenin bilgisini değiştirmezler, konuşanın tutumunu taşırlar; vurgusuzdurlar ve cümlenin ortasında dururlar.",
        examples: [
          { de: "Das ist interessant.", tr: "Bu ilginç.", note: "yalın saptama" },
          { de: "Das ist ja interessant!", tr: "Bak sen, bu ilginçmiş!", note: "şaşırma" },
          { de: "Das ist doch interessant.", tr: "Ama bu ilginç işte.", note: "beklenene itiraz" },
        ],
      },
      {
        heading: "Dördü ne yapar",
        tr: "„doch“ beklenenin tersini söyler ya da emri yumuşatır. „ja“ karşındakinin zaten bildiği bir şeye gönderir; ünlemde şaşırma verir. „mal“ ricayı gündelikleştirir. „eben“ ve „halt“ kabullenme bildirir: değişmez, öyledir.",
        examples: [
          { de: "Komm doch mit, es dauert nicht lange.", tr: "Hadi gel, uzun sürmez.", note: "yumuşatılmış çağrı" },
          { de: "Kannst du mir mal kurz helfen?", tr: "Bir dakika yardım eder misin?", note: "gündelik rica" },
          { de: "So ist es eben.", tr: "İşte böyle.", note: "kabullenme" },
        ],
      },
      {
        heading: "Nerede durmaz, nerede yazılmaz",
        tr: "Bu parçacıklar cümlenin birinci öğesi olamaz ve vurgu almazlar; vurgulanırsa anlamları tümüyle değişir („Komm ja mit!“ bir tehdittir). Ayrıca resmî yazışmada, sözleşmede ve raporda kullanılmazlar: orada tutum değil, içerik istenir.",
        examples: [
          { de: "Ich habe es dir doch gesagt!", tr: "Sana söylemiştim ama!", note: "sitem" },
          { de: "Ruf mich mal an, wenn du Zeit hast.", tr: "Vaktin olunca bir ara beni ara." },
          { de: "Der Antrag ist bis Freitag einzureichen.", tr: "Başvuru cumaya kadar verilmelidir.", note: "resmî: parçacık yok" },
        ],
      },
    ],
    questions: [
      {
        text: "Komm ___ mit, es dauert wirklich nicht lange.",
        options: ["doch", "ja", "eben"],
        answer: 0,
        explain: "„doch“ emri yumuşatır ve karşıdakinin tereddüdüne cevap verir; „ja“ burada tehdit tonu getirirdi.",
      },
      {
        text: "Du bist ___ ganz nass!",
        options: ["ja", "mal", "eben"],
        answer: 0,
        explain: "Ünlemde „ja“ gözle görülen bir şeye şaşırma bildirir.",
      },
      {
        text: "Kannst du mir ___ kurz helfen?",
        options: ["mal", "ja", "eben"],
        answer: 0,
        explain: "„mal“ ricayı küçültür ve gündelikleştirir: büyük bir şey istemiyorum demektir.",
      },
      {
        kind: "gapfill",
        text: "So ist es ___. Da kann man nichts machen.",
        options: [],
        answer: 0,
        accept: ["eben", "halt"],
        explain: "Kabullenme bildiren parçacık „eben“ (güneyde „halt“) burada uygundur.",
      },
      {
        kind: "gapfill",
        text: "Du weißt ___ selbst, wie das läuft.",
        options: [],
        answer: 0,
        accept: ["ja"],
        explain: "„ja“ karşındakinin zaten bildiği bilgiye gönderme yapar.",
      },
      {
        kind: "gapfill",
        text: "Ruf mich ___ an, wenn du Zeit hast.",
        options: [],
        answer: 0,
        accept: ["mal"],
        explain: "Rica gündelikleşiyor ve zorunluluk hissi kayboluyor: ruf mich mal an.",
      },
      {
        kind: "gapfill",
        text: "Ich habe es dir ___ gesagt!",
        options: [],
        answer: 0,
        accept: ["doch"],
        explain: "„doch“ burada karşıdakinin unuttuğu bir şeyi hatırlatır ve sitem tonu taşır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das", "ist", "ja", "wirklich", "schade"],
        explain: "Parçacık çekimli fiilden hemen sonra durur: Das ist ja wirklich schade.",
      },
      {
        kind: "truefalse",
        text: "Modal parçacıklar cümlenin birinci öğesi olabilir.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Bu parçacıklar öne çekilemez; yeri cümlenin ortasıdır.",
      },
      {
        kind: "truefalse",
        text: "Modal parçacık cümlenin bilgi içeriğini değil, konuşanın tutumunu değiştirir.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Das ist interessant“ ile „Das ist ja interessant“ aynı olguyu bildirir, tutumları farklıdır.",
      },
    ],
  },
];

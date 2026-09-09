import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: tüketici rehberi, meslek röportajı ve kişisel blog yazısı. Monolog
 * bir öneri geliştirmeyi ister; dil bilgisi Konjunktiv II.
 */
export const deB1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r3",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Wenn die Tür zufällt",
    genre: "Rehber metin",
    intro: "Kapıda kalanlara yönelik bir tüketici rehberini okuyacaksın: telefonda ne sorulmalı, neye dikkat edilmeli, fatura fahişse ne yapılmalı.",
    gloss: [
      { de: "zufallen", tr: "kapanıvermek", en: "to slam shut" },
      { de: "unseriös", tr: "güvenilmez", en: "dodgy" },
      { de: "die Anfahrt", tr: "yol ücreti", en: "call-out travel" },
      { de: "der Zuschlag", tr: "ek ücret", en: "surcharge" },
      { de: "auflegen", tr: "telefonu kapatmak", en: "to hang up" },
      { de: "aufbohren", tr: "delerek açmak", en: "to drill open" },
      { de: "der Vorbehalt", tr: "çekince", en: "reservation" },
    ],
    minutes: 7,
    text:
      "WENN DIE TÜR ZUFÄLLT: WAS SIE VORHER WISSEN SOLLTEN\n\n" +
      "Die Wohnungstür fällt zu, der Schlüssel liegt drinnen. In diesem Moment sucht fast jeder das erste " +
      "Ergebnis im Netz und ruft an. Genau darauf warten unseriöse Anbieter.\n\n" +
      "Am besten wäre es, die Nummer eines Schlüsseldienstes schon vorher zu speichern. Wer in Ruhe vergleicht, " +
      "zahlt selten mehr als hundertfünfzig Euro; wer in Panik anruft, bekommt manchmal eine Rechnung über " +
      "achthundert.\n\n" +
      "Fragen Sie am Telefon nach dem Gesamtpreis, nicht nach dem Stundenlohn. Ein seriöser Betrieb nennt eine " +
      "Spanne und sagt Ihnen, ob Anfahrt, Zuschlag für das Wochenende und Material darin enthalten sind. " +
      "Wenn jemand am Telefon keinen Preis nennen will, sollten Sie auflegen.\n\n" +
      "Achten Sie außerdem auf die Adresse. Viele Anzeigen zeigen eine Nummer aus Ihrer Stadt, aber die Firma " +
      "sitzt dreihundert Kilometer entfernt und schickt jemand anderen. Die Anfahrt zahlen dann Sie.\n\n" +
      "Und noch etwas: Eine zugefallene Tür wird geöffnet, nicht aufgebohrt. Wenn der Monteur sofort zur " +
      "Bohrmaschine greift, obwohl das Schloss gar nicht abgeschlossen ist, ist das ein schlechtes Zeichen. " +
      "Bitten Sie ihn, es zuerst mit einer Karte zu versuchen.\n\n" +
      "Ist die Rechnung am Ende viel höher als besprochen, zahlen Sie unter Vorbehalt und schreiben das auf die " +
      "Quittung. Danach hätten Sie immer noch die Möglichkeit, das Geld zurückzufordern.",
    questions: [
      {
        text: "Was ist das Ziel des Textes?",
        options: [
          "Leser vor zu teuren Anbietern schützen",
          "erklären, wie ein Türschloss funktioniert",
          "für einen bestimmten Betrieb werben",
        ],
        answer: 0,
        explain: "Metin baştan sona uyarı ve öneri veriyor: „Genau darauf warten unseriöse Anbieter.“",
      },
      {
        text: "Wonach soll man am Telefon fragen?",
        options: ["nach dem Gesamtpreis", "nach dem Stundenlohn", "nach dem Namen des Monteurs"],
        answer: 0,
        explain: "„Fragen Sie am Telefon nach dem Gesamtpreis, nicht nach dem Stundenlohn.“",
      },
      {
        kind: "truefalse",
        text: "Eine zugefallene Tür muss man normalerweise aufbohren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Eine zugefallene Tür wird geöffnet, nicht aufgebohrt.“ Matkaba sarılmak kötü işaret sayılıyor.",
      },
      {
        kind: "gapfill",
        text: "Wer in Ruhe vergleicht, zahlt selten mehr als ___ Euro.",
        options: [],
        answer: 0,
        accept: ["hundertfünfzig", "150"],
        explain: "„Wer in Ruhe vergleicht, zahlt selten mehr als hundertfünfzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man tun, wenn die Rechnung zu hoch ist?",
        options: [],
        answer: 0,
        accept: ["unter Vorbehalt zahlen", "unter Vorbehalt", "das auf die Quittung schreiben"],
        explain: "„… zahlen Sie unter Vorbehalt und schreiben das auf die Quittung.“",
      },
      {
        text: "Warum ist eine Nummer aus der eigenen Stadt kein gutes Zeichen?",
        options: [
          "Die Firma kann trotzdem weit weg sitzen.",
          "Ortsnummern sind fast immer teurer.",
          "Die Nummer gehört meistens der Konkurrenz.",
        ],
        answer: 0,
        explain: "„… aber die Firma sitzt dreihundert Kilometer entfernt und schickt jemand anderen.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l3",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Um Viertel nach zwei",
    genre: "Röportaj",
    intro: "Gece gazete dağıtan bir kadınla söyleşi: işin ritmi, zorlukları, güzel yanı ve kime tavsiye ettiği.",
    gloss: [
      { de: "durchhalten", tr: "dayanmak", en: "to keep it up" },
      { de: "der Wecker", tr: "çalar saat", en: "alarm clock" },
      { de: "die Ausgabe", tr: "baskı", en: "edition" },
      { de: "der Gehweg", tr: "kaldırım", en: "sidewalk" },
      { de: "spiegelglatt", tr: "buz gibi kaygan", en: "icy" },
      { de: "begegnen", tr: "rastlamak", en: "to run into" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Reporter", text: "Frau Vogt, Sie stehen jeden Tag um Viertel nach zwei auf. Wie lange machen Sie das schon?" },
      { speaker: "Frau Vogt", text: "Seit elf Jahren. Am Anfang dachte ich, ich halte das keine drei Monate durch. Heute wache ich zwei Minuten vor dem Wecker auf." },
      { speaker: "Reporter", text: "Wie viele Zeitungen sind es pro Nacht?" },
      { speaker: "Frau Vogt", text: "Zwischen zweihundert und zweihundertfünfzig, je nach Tag. Am Wochenende sind die Ausgaben dicker, dann passt weniger in den Wagen und ich fahre zweimal." },
      { speaker: "Reporter", text: "Was ist das Schwierigste?" },
      { speaker: "Frau Vogt", text: "Nicht die Kälte, wie alle denken. Am schwersten sind freilaufende Hunde und dunkle Hauseingänge. Und der Januar, wenn der Gehweg spiegelglatt ist." },
      { speaker: "Reporter", text: "Und das Schönste?" },
      { speaker: "Frau Vogt", text: "Die Stadt gehört mir. Zwischen drei und fünf begegne ich vielleicht zwei Menschen. Außerdem bin ich fertig, wenn andere anfangen, und habe den ganzen Tag frei." },
      { speaker: "Reporter", text: "Würden Sie die Arbeit weiterempfehlen?" },
      { speaker: "Frau Vogt", text: "Nur jemandem, der wirklich früh schlafen kann. Wer abends noch ausgeht, hält das nicht durch. Das hätte mir am Anfang jemand sagen sollen." },
    ],
    questions: [
      {
        text: "Was für eine Arbeit macht Frau Vogt?",
        options: [
          "Sie trägt nachts Zeitungen aus.",
          "Sie arbeitet in einer Druckerei.",
          "Sie fährt morgens einen Schulbus.",
        ],
        answer: 0,
        explain: "„Wie viele Zeitungen sind es pro Nacht?“ ve „Am Wochenende sind die Ausgaben dicker“ — gece gazete dağıtıyor.",
      },
      {
        text: "Warum fährt sie am Wochenende zweimal?",
        options: ["Die Ausgaben sind dicker.", "Es sind mehr Kunden.", "Der Wagen ist kleiner."],
        answer: 0,
        explain: "„Am Wochenende sind die Ausgaben dicker, dann passt weniger in den Wagen.“",
      },
      {
        kind: "truefalse",
        text: "Frau Vogt wacht heute meistens ohne Wecker auf.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Heute wache ich zwei Minuten vor dem Wecker auf.“",
      },
      {
        kind: "short_answer",
        text: "Wie vielen Menschen begegnet sie zwischen drei und fünf?",
        options: [],
        answer: 0,
        accept: ["vielleicht zwei", "zwei", "zwei Menschen", "etwa zwei"],
        explain: "„Zwischen drei und fünf begegne ich vielleicht zwei Menschen.“",
      },
      {
        kind: "dictation",
        text: "İşin en güzel yanını anlattığı ilk cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Die Stadt gehört mir.", "Die Stadt gehört mir"],
        explain: "„Die Stadt gehört mir.“ — sahiplik „gehören“ ile ve Dativ ile kurulur.",
      },
      {
        text: "Wem würde sie die Arbeit empfehlen?",
        options: [
          "Menschen, die abends nicht ausgehen",
          "Menschen, die gern allein sind",
          "Menschen, die keine Angst vor Hunden haben",
        ],
        answer: 0,
        explain: "„Wer abends noch ausgeht, hält das nicht durch.“ Yalnızlık ve köpekler başka bağlamda geçiyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w3",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Warum ich wieder Briefe schreibe",
    genre: "Blog yazısı",
    intro: "Yeniden başladığın bir alışkanlığı anlatan bir blog yazısı yazacaksın; önce iki cümle kur, sonra yazıyı yaz.",
    gloss: [
      { de: "die Handschrift", tr: "el yazısı", en: "handwriting" },
      { de: "der Chatverlauf", tr: "sohbet geçmişi", en: "chat history" },
      { de: "aufheben", tr: "saklamak", en: "to keep" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Keşke daha sık el yazısıyla yazsam.",
        answer: "Ich wünschte, ich würde öfter mit der Hand schreiben.",
        alternatives: ["Ich wünschte, öfter würde ich mit der Hand schreiben."],
        hint: "Gerçekleşmemiş dilek Konjunktiv II ister: „würde + Infinitiv“, mastar cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Bir mektup daha uzun sürerdi ama daha uzun da kalırdı.",
        answer: "Ein Brief würde länger dauern, aber er würde auch länger bleiben.",
        alternatives: ["Ein Brief würde länger dauern, er würde aber auch länger bleiben."],
        hint: "„aber“ iki ana cümleyi bağlar ve sırayı bozmaz; „würde“ ikinci sırada, mastar sonda kalır.",
      },
      {
        kind: "free",
        prompt:
          "Bıraktığın ve sonra yeniden başladığın bir alışkanlığı anlat: neydi, neden bırakmıştın, seni ne geri getirdi, ne değişti ve başkasına tavsiye eder miydin.",
        checklist: [
          "Alışkanlığın ne olduğunu ve neden bıraktığını yaz",
          "Seni geri getiren olayı anlat",
          "Bugün hayatında ne değiştiğini somut örnekle göster",
          "Kime tavsiye ettiğini söyleyerek bitir",
        ],
        minWords: 60,
        phrases: [
          { de: "Angefangen hat es mit …", tr: "Her şey … ile başladı" },
          { de: "Ich hätte nie gedacht, dass …", tr: "… olacağını hiç düşünmezdim" },
          { de: "Es dauert …, und das ist der Punkt.", tr: "… sürüyor, mesele de tam bu." },
          { de: "Seitdem …", tr: "O zamandan beri …" },
          { de: "Ich würde es jedem empfehlen, der …", tr: "… olan herkese tavsiye ederdim" },
        ],
        sample:
          "Angefangen hat es mit einer Kiste. Vor drei Jahren habe ich darin vierzig Briefe von meiner Großmutter " +
          "gefunden, an einem Abend gelesen und danach zwei Wochen an nichts anderes gedacht. Von mir würde niemand " +
          "so eine Kiste finden: Alles, was ich schreibe, liegt in Chatverläufen, die niemand aufhebt. " +
          "Seitdem schreibe ich jeden Monat einen Brief mit der Hand. Es dauert eine Stunde, und das ist der Punkt. " +
          "In einer Nachricht schreibe ich, was ich gerade mache; in einem Brief schreibe ich, was ich denke. " +
          "Zwei von fünf Menschen antworten nie. Die anderen drei aber schreiben Sätze, die sie mir nie geschickt " +
          "hätten. Ich würde es jedem empfehlen, der glaubt, keine Zeit dafür zu haben.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s3",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Eine Sache in deiner Stadt",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir şeyi seç, neden önemli olduğunu anlat ve nasıl yapılacağını söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Yaşadığın yerde tek bir şeyi değiştirebilseydin ne olurdu? Neyi seçtiğini söyle, neden önemli olduğunu açıkla ve nasıl yapılabileceğine dair somut bir fikir ver.",
      bulletsTr: [
        "Neyi değiştireceğini tek cümleyle söyle",
        "Bugünkü durumu kısaca anlat",
        "Kimin itiraz edeceğini ve neden haklı olduğunu söyle",
        "Uygulanabilir bir ilk adım öner",
      ],
      targets: [
        { de: "Wenn ich etwas ändern könnte, …", tr: "Bir şeyi değiştirebilseydim …" },
        { de: "Ich würde zuerst …", tr: "Önce … yapardım" },
        { de: "Natürlich würden manche protestieren.", tr: "Elbette bazıları itiraz ederdi." },
        { de: "Das wäre ein erster Schritt.", tr: "Bu ilk adım olurdu." },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "Wenn ich eine Sache ändern könnte, wäre es der Platz vor unserem Bahnhof. Im Moment ist er ein " +
        "Parkplatz mit vier Bäumen, und im Sommer steht dort die Hitze. Ich würde zuerst die Hälfte der " +
        "Stellplätze wegnehmen, Bäume pflanzen und ein paar Bänke aufstellen, auf die man sich ohne Kaffee " +
        "setzen darf. Das klingt klein, aber es ist der erste Ort, den Besucher sehen. Natürlich würden " +
        "manche protestieren, und ich verstehe das: Wer schwere Sachen kauft, braucht sein Auto. " +
        "Deshalb würde ich im Parkhaus zweihundert Meter weiter die erste Stunde kostenlos machen. " +
        "Das wäre ein erster Schritt, und nach einem Jahr sieht man, ob es funktioniert.",
      rubricHint:
        "Konjunktiv II beklenir (würde, wäre, könnte); öneri somut olmalı ve en az bir karşı görüş kabul edilmeli.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g3",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Könnten Sie mir helfen?",
    genre: "Kural",
    intro: "Aynı biçim üç işi birden görür: nazik rica, gerçekleşmemiş dilek ve gerçekdışı koşul.",
    focus: "Konjunktiv II: nezaket, dilek ve gerçekdışı koşul",
    gloss: [
      { de: "stören", tr: "rahatsız etmek", en: "to disturb" },
      { de: "an deiner Stelle", tr: "senin yerinde olsam", en: "in your place" },
      { de: "das Klavier", tr: "piyano", en: "piano" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Nezaket: fiil biçim değiştirir",
        tr: "Türkçede ricayı yumuşatmak için ek ve kalıp eklersin: „yardım eder misiniz“ → „yardım edebilir misiniz“. Almancada fiilin kendisi başka bir biçime geçer: können → könnten, haben → hätte, sein → wäre.",
        examples: [
          { de: "Könnten Sie mir bitte helfen?", tr: "Bana yardım edebilir misiniz?", note: "Können → Könnten" },
          { de: "Ich hätte gern einen Termin.", tr: "Bir randevu istiyordum." },
          { de: "Wäre Freitag möglich?", tr: "Cuma mümkün olur muydu?" },
        ],
      },
      {
        heading: "Günlük biçim: würde + Infinitiv",
        tr: "Çoğu fiil için günlük dilde „würde + mastar“ kullanılır. Ama sein, haben ve modal fiiller kendi kısa biçimleriyle söylenir: wäre, hätte, könnte, müsste, dürfte, sollte. Bunlarda „würde“ kullanmak kulağa yanlış gelir.",
        examples: [
          { de: "Ich würde gern Klavier lernen.", tr: "Piyano öğrenmek isterdim.", note: "würde + Infinitiv" },
          { de: "Ich hätte mehr Zeit.", tr: "Daha çok vaktim olurdu.", note: "„würde haben“ denmez" },
          { de: "Du solltest früher schlafen.", tr: "Daha erken uyumalısın." },
        ],
      },
      {
        heading: "Gerçekdışı koşul",
        tr: "Olmayan bir durumu anlatırken İKİ tarafta da Konjunktiv II gerekir. Yan cümlede fiil sona gider; ana cümle „würde“ ile ya da fiilin kendi biçimiyle kurulur.",
        examples: [
          { de: "Wenn ich Zeit hätte, würde ich mitkommen.", tr: "Vaktim olsa gelirdim." },
          { de: "Wenn ich Zeit hätte, käme ich mit.", tr: "Vaktim olsa gelirdim.", note: "aynı anlam, kısa biçim" },
          { de: "An deiner Stelle würde ich zum Arzt gehen.", tr: "Senin yerinde olsam doktora giderdim." },
        ],
      },
    ],
    questions: [
      {
        text: "___ Sie mir bitte kurz helfen?",
        options: ["Könnten", "Können", "Konnten"],
        answer: 0,
        explain: "Nazik rica Konjunktiv II ile kurulur: Könnten Sie …? „Konnten“ geçmiş zamandır.",
      },
      {
        text: "Ich ___ gern einen Termin am Freitag.",
        options: ["hätte", "habe", "hatte"],
        answer: 0,
        explain: "İstek kibarca söyleniyor: ich hätte gern.",
      },
      {
        text: "Wenn ich mehr Zeit ___, würde ich Klavier lernen.",
        options: ["hätte", "habe", "hatte"],
        answer: 0,
        explain: "Gerçekdışı koşulda iki taraf da Konjunktiv II olur: hätte … würde.",
      },
      {
        kind: "gapfill",
        text: "An deiner Stelle ___ ich zum Arzt gehen.",
        options: [],
        answer: 0,
        accept: ["würde"],
        explain: "Öğüt verirken „würde + Infinitiv“ kullanılır: würde ich … gehen.",
      },
      {
        kind: "gapfill",
        text: "Es ___ (sein) schön, wenn du kommen könntest.",
        options: [],
        answer: 0,
        accept: ["wäre"],
        explain: "„sein“ kendi kısa biçimini kullanır: es wäre.",
      },
      {
        kind: "gapfill",
        text: "___ (können) ich Sie kurz stören?",
        options: [],
        answer: 0,
        accept: ["Könnte", "könnte"],
        explain: "Rica olduğu için modal fiil Konjunktiv II'ye geçer: Könnte ich …?",
      },
      {
        kind: "gapfill",
        text: "Wenn wir ein Auto ___ (haben), wären wir schneller da.",
        options: [],
        answer: 0,
        accept: ["hätten"],
        explain: "„haben“ kısa biçimiyle çekilir ve yan cümlede sona gider: hätten.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wenn", "ich", "Zeit", "hätte", "käme", "ich"],
        explain: "Yan cümle önce ve fiili sonda; ana cümle hemen fiille başlar: Wenn ich Zeit hätte, käme ich.",
      },
      {
        kind: "truefalse",
        text: "„Könntest du bitte das Fenster zumachen?“ — Bu nazik bir rica mıdır?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Kannst du“ yerine „Könntest du“ demek ricayı yumuşatır; evet, nazik bir ricadır.",
      },
      {
        kind: "truefalse",
        text: "„Wenn ich reich bin, würde ich viel reisen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Gerçekdışı koşulda yan cümle de Konjunktiv II olmalı: „Wenn ich reich wäre, würde ich viel reisen.“",
      },
    ],
  },
];

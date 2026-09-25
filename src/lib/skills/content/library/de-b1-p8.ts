import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 uyku ve dikkat hattı: kişisel bir blog yazısı, ekip toplantısı,
 * bir anketin raporu. Dil bilgisi edatlı fiiller ve onların soru/işaret
 * biçimleri — wofür, dafür, worauf, darauf.
 */
export const deB1P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r8",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Zwei Wochen ohne Wecker",
    genre: "blog",
    intro: "Bir blog yazısı: çalar saatsiz iki hafta neyi değiştirdi, neyi değiştirmedi.",
    gloss: [
      { de: "der Wecker", tr: "çalar saat", en: "alarm clock" },
      { de: "der Schlafrhythmus", tr: "uyku düzeni", en: "sleep rhythm" },
      { de: "verzichten", tr: "vazgeçmek", en: "to do without" },
      { de: "sich gewöhnen", tr: "alışmak", en: "to get used to" },
      { de: "die Konzentration", tr: "dikkat", en: "concentration" },
      { de: "das Experiment", tr: "deney", en: "experiment" },
    ],
    minutes: 6,
    text:
      "Zwei Wochen ohne Wecker\n\n" +
      "Ich habe im Urlaub ein Experiment gemacht: vierzehn Tage lang auf den Wecker verzichten " +
      "und einfach aufwachen, wenn der Körper so weit ist.\n\n" +
      "Die erste Woche war eine Enttäuschung. Ich bin jeden Tag später aufgestanden, " +
      "am Sonntag sogar erst um halb zwölf. Abends war ich dafür bis zwei Uhr wach " +
      "und habe mich über mich selbst geärgert.\n\n" +
      "In der zweiten Woche hat sich etwas verschoben. Mein Schlafrhythmus hat sich " +
      "bei ungefähr halb neun eingependelt, jeden Tag fast auf die Minute genau. " +
      "Ich habe mich schnell daran gewöhnt und bin ohne dieses schwere Gefühl aufgewacht, " +
      "das ich sonst kenne.\n\n" +
      "Was ich nicht erwartet hatte: Meine Konzentration am Nachmittag war deutlich besser. " +
      "Ich habe Texte gelesen, die ich sonst nach zehn Minuten weglege.\n\n" +
      "Trotzdem ist das Experiment vorbei. Mein Zug fährt um sieben und darauf habe ich " +
      "keinen Einfluss. Ich habe aber etwas mitgenommen: Ich gehe jetzt früher ins Bett, " +
      "statt morgens gegen mich selbst zu kämpfen.",
    questions: [
      {
        text: "Wie war die erste Woche?",
        options: [
          "Der Körper hat sofort einen Rhythmus gefunden.",
          "Der Schlaf ist immer später geworden.",
          "Der Autor hat kaum geschlafen.",
        ],
        answer: 1,
        explain: "Her gün daha geç kalkmış, pazar günü on bir buçukta.",
      },
      {
        text: "Was ist in der zweiten Woche passiert?",
        options: [
          "Der Rhythmus hat sich bei halb neun eingependelt.",
          "Der Autor hat wieder den Wecker gestellt.",
          "Der Schlaf ist noch unruhiger geworden.",
        ],
        answer: 0,
        explain: "„Mein Schlafrhythmus hat sich bei ungefähr halb neun eingependelt.“",
      },
      {
        kind: "truefalse",
        text: "Der Autor macht auch nach dem Urlaub ohne Wecker weiter.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Trotzdem ist das Experiment vorbei“ — treni yedide kalkıyor.",
      },
      {
        kind: "gapfill",
        text: "Das Experiment hat ___ Tage gedauert.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„vierzehn Tage lang auf den Wecker verzichten“.",
      },
      {
        kind: "short_answer",
        text: "Welche Wirkung hatte der Autor nicht erwartet?",
        options: [],
        answer: 0,
        accept: ["bessere Konzentration", "die Konzentration am Nachmittag", "mehr Konzentration"],
        explain: "„Meine Konzentration am Nachmittag war deutlich besser.“",
      },
      {
        text: "Was nimmt der Autor aus dem Versuch mit?",
        options: [
          "Er geht früher ins Bett.",
          "Er steht jeden Tag um halb neun auf.",
          "Er arbeitet nur noch nachmittags.",
        ],
        answer: 0,
        explain: "Son cümle: sabah kendiyle savaşmak yerine akşam erken yatıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l8",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Besprechung: Die Kernzeit",
    genre: "meeting",
    intro: "Küçük bir ekip toplanıyor: ortak çalışma saati kaç olsun, kimin hangi kısıtı var.",
    gloss: [
      { de: "die Kernzeit", tr: "ortak çalışma saati", en: "core hours" },
      { de: "die Absprache", tr: "mutabakat", en: "agreement" },
      { de: "die Kita", tr: "kreş", en: "day nursery" },
      { de: "einverstanden", tr: "hemfikir", en: "in agreement" },
      { de: "der Kompromiss", tr: "uzlaşma", en: "compromise" },
      { de: "protokollieren", tr: "tutanağa geçirmek", en: "to minute" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Adler", text: "Heute nur ein Punkt: Wir brauchen eine Kernzeit, in der alle erreichbar sind. Zurzeit ist das Zufall." },
      { speaker: "Herr Bruns", text: "Ich wäre für zehn bis vierzehn Uhr. Vorher schaffe ich die ruhige Arbeit, die sonst liegen bleibt." },
      { speaker: "Frau Özkan", text: "Zehn ist für mich zu spät. Ich muss um sechzehn Uhr in der Kita sein und verliere dann die letzte Stunde." },
      { speaker: "Frau Adler", text: "Was wäre mit neun bis dreizehn Uhr? Dann hätten wir vier gemeinsame Stunden." },
      { speaker: "Herr Bruns", text: "Neun geht bei mir nur an drei Tagen. Dienstag und Donnerstag bringe ich mein Kind zum Sport." },
      { speaker: "Frau Özkan", text: "Dann machen wir es doch unterschiedlich: montags, mittwochs und freitags neun bis dreizehn, dienstags und donnerstags zehn bis vierzehn." },
      { speaker: "Frau Adler", text: "Das ist ein Kompromiss, aber schwer zu merken. Ich schlage vor, wir probieren es vier Wochen und schauen dann." },
      { speaker: "Herr Bruns", text: "Einverstanden. Wichtig ist nur, dass die Absprache im Kalender steht und nicht in irgendeiner Nachricht." },
      { speaker: "Frau Adler", text: "Ich protokolliere das und trage die Zeiten heute noch ein." },
    ],
    questions: [
      {
        text: "Worum geht es in der Besprechung?",
        options: [
          "um neue Projekte",
          "um eine gemeinsame Kernzeit",
          "um die Urlaubsplanung",
        ],
        answer: 1,
        explain: "„Wir brauchen eine Kernzeit, in der alle erreichbar sind.“",
      },
      {
        text: "Warum passt Frau Özkan zehn Uhr nicht?",
        options: [
          "Sie beginnt erst um elf.",
          "Sie muss um sechzehn Uhr in der Kita sein.",
          "Sie arbeitet dienstags nicht.",
        ],
        answer: 1,
        explain: "Geç başlarsa son saati kaybediyor.",
      },
      {
        kind: "truefalse",
        text: "Am Ende gibt es für alle Tage dieselbe Kernzeit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Günlere göre iki farklı zaman aralığı kabul ediliyor.",
      },
      {
        kind: "gapfill",
        text: "Der Kompromiss wird ___ Wochen ausprobiert.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„wir probieren es vier Wochen und schauen dann“.",
      },
      {
        kind: "short_answer",
        text: "Wo soll die Absprache stehen?",
        options: [],
        answer: 0,
        accept: ["im Kalender", "Kalender", "in dem Kalender"],
        explain: "„dass die Absprache im Kalender steht und nicht in irgendeiner Nachricht“.",
      },
      {
        text: "Was kritisiert Frau Adler am Kompromiss?",
        options: ["Er ist zu teuer.", "Er ist schwer zu merken.", "Er hilft Herrn Bruns nicht."],
        answer: 1,
        explain: "„Das ist ein Kompromiss, aber schwer zu merken.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w8",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Bericht über eine Umfrage",
    genre: "report",
    intro: "Ekipte yapılan küçük bir anketi raporluyorsun: önce iki cümle kur, sonra sayıları yorumlayan bir rapor yaz.",
    gloss: [
      { de: "die Umfrage", tr: "anket", en: "survey" },
      { de: "teilnehmen", tr: "katılmak", en: "to take part" },
      { de: "die Mehrheit", tr: "çoğunluk", en: "majority" },
      { de: "auffällig", tr: "dikkat çekici", en: "striking" },
      { de: "die Empfehlung", tr: "öneri", en: "recommendation" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Ankete on sekiz kişiden on dördü katıldı.",
        answer: "An der Umfrage haben vierzehn von achtzehn Personen teilgenommen.",
        alternatives: ["Vierzehn von achtzehn Personen haben an der Umfrage teilgenommen."],
        hint: "„teilnehmen an“ Dativ ister; ayrılabilen fiilin Partizip'i teilgenommen'dir.",
      },
      {
        kind: "build",
        tr: "Çoğunluk sabahki saati tercih ediyor.",
        answer: "Die Mehrheit bevorzugt die Zeit am Morgen.",
        alternatives: ["Die Zeit am Morgen wird von der Mehrheit bevorzugt."],
        hint: "„die Mehrheit“ tekildir; fiil de tekil çekilir.",
      },
      {
        kind: "free",
        prompt:
          "Küçük bir anketin raporunu yaz: anketin konusunu ve kaç kişinin katıldığını söyle, iki sonucu sayılarla ver, dikkat çeken bir ayrıntıyı yorumla ve bir öneriyle bitir.",
        checklist: [
          "Anketin konusunu ve katılımcı sayısını yaz",
          "İki sonucu sayılarla ver",
          "Dikkat çeken bir ayrıntıyı yorumla",
          "Somut bir öneriyle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Ziel der Umfrage war, herauszufinden, …", tr: "Anketin amacı … öğrenmekti", en: "The aim of the survey was to find out …" },
          { de: "Von … Befragten gaben … an, dass …", tr: "… katılımcının …'i … olduğunu belirtti", en: "Of … respondents, … stated that …" },
          { de: "Auffällig ist, dass …", tr: "Dikkat çeken şey …", en: "It is striking that …" },
          { de: "Das könnte daran liegen, dass …", tr: "Bunun sebebi … olabilir", en: "This could be because …" },
          { de: "Ich empfehle deshalb, …", tr: "Bu yüzden … öneriyorum", en: "I therefore recommend …" },
        ],
        sample:
          "Ziel der Umfrage war, herauszufinden, wann die gemeinsame Kernzeit im Team liegen sollte. " +
          "An der Umfrage haben vierzehn von achtzehn Personen teilgenommen. " +
          "Von vierzehn Befragten gaben neun an, dass sie eine Kernzeit am Vormittag bevorzugen; " +
          "vier wünschten sich den frühen Nachmittag, einer Person war es egal. " +
          "Auffällig ist, dass alle vier Personen mit kleinen Kindern für den Vormittag gestimmt haben. " +
          "Das könnte daran liegen, dass der Nachmittag durch Kita und Schule fest verplant ist. " +
          "Auffällig war außerdem eine Bemerkung im freien Feld: Mehrere Leute stören sich weniger an der " +
          "Uhrzeit als daran, dass die Regel ständig wechselt. " +
          "Ich empfehle deshalb, die Kernzeit von neun bis dreizehn Uhr festzulegen, sie vier Wochen zu " +
          "testen und erst danach wieder darüber zu sprechen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s8",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Handy aus dem Schlafzimmer?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: yaygın bir tavsiyeyi değerlendir.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "„Telefon yatak odasında olmamalı“ tavsiyesi sık veriliyor. Sen ne düşünüyorsun? Görüşünü söyle, kendi deneyiminden bir örnek ver ve bu tavsiyenin kime uymadığını söyle.",
      bulletsTr: [
        "Tavsiyeye katılıp katılmadığını söyle",
        "Kendi deneyiminden bir örnek ver",
        "Tavsiyenin kime uymadığını anlat",
        "Daha işe yarar bulduğun bir kuralı söyle",
      ],
      targets: [
        { de: "Grundsätzlich halte ich den Rat für …", tr: "Temelde bu tavsiyeyi … buluyorum" },
        { de: "Ich habe die Erfahrung gemacht, dass …", tr: "Deneyimlerimden biliyorum ki …" },
        { de: "Für Leute, die …, funktioniert das nicht.", tr: "… olan kişiler için bu işlemiyor." },
        { de: "Sinnvoller finde ich die Regel, …", tr: "Daha mantıklı bulduğum kural …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Grundsätzlich halte ich den Rat für richtig, aber er wird meistens zu streng formuliert. " +
        "Ich habe die Erfahrung gemacht, dass nicht das Gerät stört, sondern das, was ich damit mache: " +
        "Ein Hörbuch im Dunkeln hat mir nie den Schlaf genommen, fünf Minuten Nachrichten dagegen " +
        "schon. Als ich das Handy einen Monat lang in die Küche gelegt habe, bin ich zwar schneller " +
        "eingeschlafen, habe aber dreimal verschlafen, weil ich keinen Wecker hatte. " +
        "Für Leute, die nachts erreichbar sein müssen, zum Beispiel für kranke Eltern, " +
        "funktioniert das ohnehin nicht. Sinnvoller finde ich die Regel, dass das Handy im Zimmer " +
        "bleiben darf, aber nicht mehr in die Hand genommen wird, wenn das Licht aus ist. " +
        "Das kann man durchhalten, und genau darauf kommt es bei solchen Regeln an.",
      rubricHint:
        "Tavsiyenin sınırı ve kişisel bir örnek beklenir; „nicht … sondern“, „als“ ve „darauf kommt es an“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g8",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "worauf, darauf, wofür, dafür",
    genre: "grammar",
    intro: "Edatlı fiillerde soru ve işaret biçimleri nesnenin insan olup olmamasına göre değişir.",
    focus: "Edatlı fiiller ve wo(r)- / da(r)- biçimleri",
    gloss: [
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "sich kümmern", tr: "ilgilenmek", en: "to take care" },
      { de: "denken", tr: "düşünmek", en: "to think" },
      { de: "der Urlaub", tr: "tatil", en: "vacation" },
      { de: "der Bus", tr: "otobüs", en: "bus" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Edat fiile aittir",
        tr: "Almancada birçok fiil belirli bir edatla kalıplaşır ve o edat bir hâl ister: „warten auf“ + Akkusativ, „denken an“ + Akkusativ, „sich kümmern um“ + Akkusativ, „sich interessieren für“ + Akkusativ. Edat anlamını çeviriden çıkaramazsın, fiille birlikte öğrenilir.",
        examples: [
          { de: "Ich warte auf den Bus.", tr: "Otobüsü bekliyorum.", note: "warten auf + Akkusativ" },
          { de: "Sie denkt oft an ihre Schwester.", tr: "Sık sık kız kardeşini düşünüyor.", note: "denken an" },
          { de: "Wer kümmert sich um die Anmeldung?", tr: "Kayıtla kim ilgileniyor?", note: "sich kümmern um" },
        ],
      },
      {
        heading: "Eşya için wo(r)- ve da(r)-",
        tr: "Nesne bir EŞYA ya da durumsa soru „wo“ + edat, işaret ise „da“ + edat ile kurulur. Edat ünlüyle başlıyorsa araya bir r girer: worauf, darauf, worüber, darüber.",
        examples: [
          { de: "Worauf wartest du? — Auf den Bus.", tr: "Neyi bekliyorsun? — Otobüsü.", note: "wo + r + auf" },
          { de: "Der Bus kommt gleich, darauf warte ich.", tr: "Otobüs birazdan gelir, onu bekliyorum.", note: "da + r + auf" },
          { de: "Wofür interessierst du dich?", tr: "Neyle ilgileniyorsun?", note: "wofür: r yok, f ünsüz" },
        ],
      },
      {
        heading: "İnsan için edat + zamir",
        tr: "Nesne bir KİŞİ ise bu biçimler kullanılmaz. Soru „edat + wen/wem“, işaret ise „edat + zamir“ olur: „Auf wen wartest du?“ — „Auf ihn.“ Bu ayrım Almancada zorunludur ve Türkçede karşılığı yoktur.",
        examples: [
          { de: "Auf wen wartest du? — Auf meinen Bruder.", tr: "Kimi bekliyorsun? — Kardeşimi.", note: "kişi → auf wen" },
          { de: "An wen denkst du? — An sie.", tr: "Kimi düşünüyorsun? — Onu.", note: "kişi → an sie" },
          { de: "Ich kümmere mich um ihn.", tr: "Onunla ilgileniyorum.", note: "darum değil, um ihn" },
        ],
      },
    ],
    questions: [
      {
        text: "___ wartest du? — Auf den Bus.",
        options: ["Auf wen", "Worauf", "Wofür"],
        answer: 1,
        explain: "Beklenen bir eşya; soru worauf ile kurulur.",
      },
      {
        text: "___ wartest du? — Auf meinen Bruder.",
        options: ["Auf wen", "Worauf", "Woran"],
        answer: 0,
        explain: "Beklenen bir kişi; o zaman edat + wen kullanılır.",
      },
      {
        text: "Der Zug kommt gleich, ___ warte ich.",
        options: ["auf ihn", "darauf", "worauf"],
        answer: 1,
        explain: "Eşyaya işaret: da + r + auf = darauf.",
      },
      {
        kind: "gapfill",
        text: "___ interessierst du dich? — Für Geschichte.",
        options: [],
        answer: 0,
        accept: ["Wofür", "wofür"],
        explain: "„sich interessieren für“ + eşya: wofür (f ünsüz olduğu için r yok).",
      },
      {
        kind: "gapfill",
        text: "Sie denkt oft ___ ihre Schwester. (an / auf)",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "„denken an“ kalıplaşmıştır ve Akkusativ ister.",
      },
      {
        kind: "gapfill",
        text: "Ich kümmere mich ___ ihn. (um / darum)",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "Nesne kişi olduğu için „darum“ değil, edat + zamir gelir.",
      },
      {
        kind: "gapfill",
        text: "___ denkst du? — An den Urlaub.",
        options: [],
        answer: 0,
        accept: ["Woran", "woran"],
        explain: "Eşya ya da durum: wo + r + an = woran.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wer", "kümmert", "sich", "um", "die Anmeldung"],
        explain: "Dönüşlü zamir fiilden sonra, edat öbeği en sonda: Wer kümmert sich um die Anmeldung?",
      },
      {
        kind: "truefalse",
        text: "„Darauf warte ich.“ — Bu cümle bir kişi için doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„darauf“ yalnız eşya ve durumlar için; kişide „auf ihn/sie“ denir.",
      },
      {
        kind: "truefalse",
        text: "„Wofür interessierst du dich?“ — Bu soru doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Konu bir alan, yani eşya sınıfında; wofür doğru biçimdir.",
      },
    ],
  },
];

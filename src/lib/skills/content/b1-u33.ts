import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 33 — "Acil durum ve anlatı" (dersler 129–132).
 *
 * Dersler: Notfall unterwegs · Von der Reise erzählen · Körperteile ·
 * Eine kleine Verletzung.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   beden + Dativ   Türkçede beden bölümü İYELİK EKİ alır ('parmağımı
 *                   kırdım', 'dizim ağrıyor'), o yüzden Almancada
 *                   mein/meinen kullanılıyor. Almanca tersini yapar:
 *                   beden bölümü BELİRLİ ARTİKEL alır, kişi ise Dativ'e
 *                   geçer — ich habe mir den Finger gebrochen,
 *                   mir tut das Knie weh.
 *   virgülden sonra Yan cümle önde olduğunda ana cümle FİİLLE başlar.
 *   fiil            Türkçede yan cümle önde de olsa ana cümlenin sırası
 *                   değişmez ('vardığımda kimse yoktu'), o yüzden özne
 *                   olduğu yerde bırakılıyor. Almancada yan cümle
 *                   birinci öğedir; ikinci sıra fiile aittir.
 *
 * Yeni 32 kelime: der Notfall, der Alarm, die Feuerwehr, der Transport,
 * die Mobilität, der Sitz, das Lager, der Blitz, das Abenteuer,
 * die Erzählung, die Fotografie, der Fotograf, das Video, der Mond,
 * der Stern, der Ozean, der Muskel, das Knie, die Schulter, die Brust,
 * die Lippe, die Nase, der Finger, der Nerv, die Wunde, das Pflaster,
 * die Spritze, das Schmerzmittel, die Infektion, brechen, stecken,
 * der Fall.
 */
export const b1U33: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u33-r1",
    level: "B1",
    skill: "reading",
    unit: 33,
    title: "Was im Notfall zählt",
    genre: "Bilgilendirme metni",
    intro: "Yolda bir acil durum. Ne söylenir, ne yapılır?",
    minutes: 5,
    gloss: [
      { de: "der Notfall", tr: "acil durum", en: "emergency" },
      { de: "die Feuerwehr", tr: "itfaiye", en: "fire brigade" },
      { de: "der Alarm", tr: "alarm", en: "alarm" },
      { de: "der Transport", tr: "nakil", en: "transport" },
      { de: "der Sitz", tr: "koltuk", en: "seat" },
    ],
    text:
      "Wenn Sie einen Notfall melden, sagen Sie zuerst WO, dann WAS. " +
      "Die Feuerwehr braucht den Ort, bevor sie irgendetwas anderes " +
      "braucht. Alles Weitere kann man am Telefon klären.\n\n" +
      "Der Transport ist schon unterwegs, aber bleiben Sie am Apparat, bis " +
      "die Stelle auflegt. Wer sofort auflegt, " +
      "kostet Zeit: oft kommt eine Rückfrage, und der Alarm läuft ohnehin " +
      "schon.\n\n" +
      "Wenn jemand nicht mehr aus dem Sitz im Auto kommt, ziehen Sie ihn nicht " +
      "heraus. Vielleicht hat er sich etwas gebrochen, und ein falscher " +
      "Transport macht es schlimmer. Öffnen Sie nur die Tür und reden Sie " +
      "mit ihm.\n\n" +
      "Als ich das zum ersten Mal erlebt habe, war ich völlig hilflos. " +
      "Heute weiß ich: man muss nichts können. Man muss nur bleiben und " +
      "den Ort sagen.",
    questions: [
      {
        text: "Was sagt man zuerst?",
        options: ["Was passiert ist", "Wo es passiert ist", "Den eigenen Namen"],
        answer: 1,
        explain: "„… sagen Sie zuerst WO, dann WAS.“",
      },
      {
        text: "Wie lange soll man am Telefon bleiben?",
        options: ["Bis die Stelle auflegt", "Zwei Minuten", "Bis die Feuerwehr da ist"],
        answer: 0,
        explain: "„Bleiben Sie am Apparat, bis die Stelle auflegt.“",
      },
      {
        text: "Was soll man bei jemandem im Auto NICHT tun?",
        options: ["Mit ihm reden", "Ihn herausziehen", "Die Tür öffnen"],
        answer: 1,
        explain: "„… ziehen Sie ihn nicht heraus.“",
      },
      {
        kind: "gapfill",
        text: "Als ich das zum ersten Mal erlebt habe, ___ ich völlig hilflos.",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "Yan cümle önde → ana cümle FİİLLE başlar: war ich.",
      },
      {
        kind: "short_answer",
        text: "Was muss man laut Text können?",
        options: [],
        answer: 0,
        accept: ["nichts", "man muss nichts können", "nur bleiben und den Ort sagen"],
        explain: "„Heute weiß ich: man muss nichts können.“",
      },
    ],
  },
  {
    id: "b1-u33-r2",
    level: "B1",
    skill: "reading",
    unit: 33,
    title: "Eine kleine Verletzung",
    genre: "Sağlık rehberi",
    intro: "Küçük bir yara. Ne zaman kendin, ne zaman doktora?",
    minutes: 5,
    gloss: [
      { de: "die Wunde", tr: "yara", en: "wound" },
      { de: "das Pflaster", tr: "yara bandı", en: "plaster" },
      { de: "die Infektion", tr: "enfeksiyon", en: "infection" },
      { de: "das Schmerzmittel", tr: "ağrı kesici", en: "painkiller" },
      { de: "brechen", tr: "kırmak", en: "to break" },
    ],
    text:
      "Die meisten kleinen Wunden heilen allein. Waschen Sie die Stelle mit " +
      "Wasser, trocknen Sie sie ab und machen Sie ein Pflaster darauf. " +
      "Mehr ist am ersten Tag nicht nötig.\n\n" +
      "Zum Arzt gehen Sie, wenn die Wunde tief ist, wenn etwas darin steckt " +
      "oder wenn sie nach zwei Tagen rot und warm wird. Das sind die " +
      "Zeichen einer Infektion, und die wartet nicht.\n\n" +
      "Wenn Sie sich den Finger gebrochen haben, merken Sie es meistens " +
      "sofort: die Stelle schwillt an, und Sie können ihn nicht bewegen. " +
      "Bei einem Muskel ist es anders — da tut es erst am nächsten Tag " +
      "richtig weh.\n\n" +
      "Ein Schmerzmittel hilft, aber es ändert nichts an der Ursache. " +
      "Wenn Ihnen das Knie seit einer Woche wehtut, ist eine Tablette " +
      "keine Lösung, sondern eine Pause davor.",
    questions: [
      {
        text: "Was macht man bei einer kleinen Wunde?",
        options: ["Waschen, trocknen, Pflaster", "Sofort zum Arzt", "Nichts"],
        answer: 0,
        explain: "„Waschen Sie die Stelle mit Wasser, trocknen Sie sie ab und machen Sie ein Pflaster darauf.“",
      },
      {
        text: "Wann geht man zum Arzt?",
        options: ["Immer", "Wenn die Wunde tief ist oder rot und warm wird", "Nach einer Woche"],
        answer: 1,
        explain: "„Zum Arzt gehen Sie, wenn die Wunde tief ist … oder wenn sie nach zwei Tagen rot und warm wird.“",
      },
      {
        text: "Wann tut ein Muskel richtig weh?",
        options: ["Sofort", "Am nächsten Tag", "Nach einer Woche"],
        answer: 1,
        explain: "„Bei einem Muskel ist es anders — da tut es erst am nächsten Tag richtig weh.“",
      },
      {
        kind: "gapfill",
        text: "Wenn Sie ___ ___ Finger gebrochen haben, merken Sie es sofort.",
        options: [],
        answer: 0,
        accept: ["sich den"],
        explain: "Beden bölümü belirli artikel alır, kişi Dativ'e geçer: sich den Finger.",
      },
      {
        kind: "short_answer",
        text: "Was ändert ein Schmerzmittel nicht?",
        options: [],
        answer: 0,
        accept: ["die Ursache", "nichts an der Ursache", "Ursache"],
        explain: "„Ein Schmerzmittel hilft, aber es ändert nichts an der Ursache.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u33-l1",
    level: "B1",
    skill: "listening",
    unit: 33,
    title: "Die Nacht am Ozean",
    genre: "Gezi anlatısı",
    intro: "Bir gezi anısı anlatılıyor. Ne oldu, ne kaldı?",
    minutes: 4,
    gloss: [
      { de: "das Abenteuer", tr: "macera", en: "adventure" },
      { de: "der Ozean", tr: "okyanus", en: "ocean" },
      { de: "das Lager", tr: "kamp", en: "camp" },
      { de: "der Stern", tr: "yıldız", en: "star" },
    ],
    segments: [
      { text: "Erzähl noch mal von der Nacht am Ozean." },
      { text: "Als wir ankamen, war das Lager schon voll." },
      { text: "Und dann?" },
      { text: "Wir haben oben am Hügel geschlafen, ohne Zelt." },
      { text: "Ohne Zelt? War das nicht kalt?" },
      { text: "Sehr. Aber als der Mond weg war, sah man jeden Stern." },
      { text: "Hast du Fotos gemacht?" },
      { text: "Ein Video. Für eine gute Fotografie war es viel zu dunkel." },
    ],
    questions: [
      {
        text: "Was war los, als sie ankamen?",
        options: ["Das Lager war voll", "Es regnete", "Es war zu spät"],
        answer: 0,
        explain: "„Als wir ankamen, war das Lager schon voll.“",
      },
      {
        text: "Wo haben sie geschlafen?",
        options: ["Im Lager", "Oben am Hügel", "Im Auto"],
        answer: 1,
        explain: "„Wir haben oben am Hügel geschlafen, ohne Zelt.“",
      },
      {
        text: "Was hat sie aufgenommen?",
        options: ["Fotos", "Ein Video", "Nichts"],
        answer: 1,
        explain: "„Ein Video. Für eine gute Fotografie war es viel zu dunkel.“",
      },
      {
        kind: "gapfill",
        text: "Als wir ankamen, ___ das Lager schon voll.",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "Yan cümle önde → fiil hemen virgülden sonra.",
      },
      {
        kind: "short_answer",
        text: "Wann sah man jeden Stern?",
        options: [],
        answer: 0,
        accept: ["als der Mond weg war", "wenn der Mond weg war", "ohne Mond"],
        explain: "„Aber als der Mond weg war, sah man jeden Stern.“",
      },
    ],
  },
  {
    id: "b1-u33-l2",
    level: "B1",
    skill: "listening",
    unit: 33,
    title: "In der Praxis",
    genre: "Muayene konuşması",
    intro: "Küçük bir yaralanma muayenesi. Ne oldu, ne yapılıyor?",
    minutes: 4,
    gloss: [
      { de: "das Knie", tr: "diz", en: "knee" },
      { de: "die Schulter", tr: "omuz", en: "shoulder" },
      { de: "stecken", tr: "saplı olmak", en: "to be stuck" },
      { de: "die Spritze", tr: "iğne", en: "injection" },
    ],
    segments: [
      { text: "Was ist passiert?" },
      { text: "Ich bin auf der Treppe gefallen und mir tut das Knie weh." },
      { text: "Können Sie es bewegen?" },
      { text: "Ja, aber nur langsam. Die Schulter geht besser." },
      { text: "Gut. Steckt etwas in der Wunde?" },
      { text: "Ich glaube nicht. Ich habe sie zu Hause gewaschen." },
      { text: "Richtig so. Dann bekommen Sie keine Spritze, nur ein Pflaster." },
      { text: "Und wenn es morgen schlimmer wird?" },
    ],
    questions: [
      {
        text: "Was ist passiert?",
        options: ["Sie ist auf der Treppe gefallen", "Sie hatte einen Unfall im Auto", "Sie ist gerannt"],
        answer: 0,
        explain: "„Ich bin auf der Treppe gefallen und mir tut das Knie weh.“",
      },
      {
        text: "Wie kann sie das Knie bewegen?",
        options: ["Gar nicht", "Nur langsam", "Ganz normal"],
        answer: 1,
        explain: "„Ja, aber nur langsam.“",
      },
      {
        text: "Was bekommt sie?",
        options: ["Eine Spritze", "Nur ein Pflaster", "Ein Schmerzmittel"],
        answer: 1,
        explain: "„Dann bekommen Sie keine Spritze, nur ein Pflaster.“",
      },
      {
        kind: "gapfill",
        text: "Ich bin auf der Treppe gefallen und ___ tut das Knie weh.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "Beden bölümü artikel alır, kişi Dativ olur: mir tut das Knie weh.",
      },
      {
        kind: "short_answer",
        text: "Wo hat sie die Wunde gewaschen?",
        options: [],
        answer: 0,
        accept: ["zu Hause", "sie hat sie zu Hause gewaschen"],
        explain: "„Ich habe sie zu Hause gewaschen.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u33-w1",
    level: "B1",
    skill: "writing",
    unit: 33,
    title: "Was mir passiert ist",
    genre: "Yaralanma bildirimi",
    intro: "Bir yaralanmayı anlat. Almancada beden bölümü iyelik almaz.",
    minutes: 8,
    gloss: [
      { de: "der Finger", tr: "parmak", en: "finger" },
      { de: "die Nase", tr: "burun", en: "nose" },
      { de: "der Fall", tr: "düşme / vaka", en: "fall / case" },
      { de: "der Nerv", tr: "sinir", en: "nerve" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Parmağımı kırdım.",
        answer: "Ich habe mir den Finger gebrochen.",
        hint: "Beden bölümü artikel alır, kişi Dativ.",
      },
      {
        kind: "build",
        tr: "Dizim iki gündür ağrıyor.",
        answer: "Mir tut das Knie seit zwei Tagen weh.",
        alternatives: ["Das Knie tut mir seit zwei Tagen weh."],
        hint: "Yine Dativ + belirli artikel.",
      },
      {
        kind: "build",
        tr: "Düştüğümde omzum yere çarptı.",
        answer: "Als ich gefallen bin, kam die Schulter auf den Boden.",
        hint: "Yan cümle önde → ana cümle fiille başlar.",
      },
      {
        kind: "form",
        prompt: "Yaralanma kartını doldur.",
        facts: "Kişi: Nuri Öz; olay: merdivende düşme; yaralanan: diz; ek şikâyet: omuz; tedavi: yara bandı, iğne yok.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Vorfall", answer: "Fall auf der Treppe", accept: ["gefallen", "Treppe"] },
          { label: "Verletzt", answer: "das Knie", accept: ["Knie", "am Knie"] },
          { label: "Behandlung", answer: "ein Pflaster", accept: ["Pflaster", "keine Spritze"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Beden bölümünün yapısını düzelt.",
        source: "Ich habe meinen Finger gebrochen und mein Knie tut weh.",
        answer: "Ich habe mir den Finger gebrochen und mir tut das Knie weh.",
        why: "Türkçede beden bölümü İYELİK EKİ alır ('parmağımı', 'dizim'), o yüzden Almancada mein/meinen kullanılıyor — ve cümle dilbilgisel olarak yanlış değil, sadece Almanca gibi durmuyor. Almanca kalıbı şudur: beden bölümü BELİRLİ ARTİKEL alır, kime ait olduğu Dativ ile söylenir — mir den Finger, mir das Knie, ihm die Hand.",
      },
    ],
  },
  {
    id: "b1-u33-w2",
    level: "B1",
    skill: "writing",
    unit: 33,
    title: "Von der Reise erzählen",
    genre: "Anlatı",
    intro: "Bir yolculuk anını anlat. Yan cümle önde ise ana cümle fiille başlar.",
    minutes: 12,
    gloss: [
      { de: "die Erzählung", tr: "anlatı", en: "story" },
      { de: "der Blitz", tr: "şimşek", en: "lightning" },
      { de: "der Mond", tr: "ay", en: "moon" },
      { de: "die Fotografie", tr: "fotoğrafçılık", en: "photography" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Vardığımızda kamp çoktan doluydu.",
        answer: "Als wir ankamen, war das Lager schon voll.",
        hint: "Virgülden sonra fiil.",
      },
      {
        kind: "build",
        tr: "Ay kaybolunca her yıldız görünüyordu.",
        answer: "Als der Mond weg war, sah man jeden Stern.",
        hint: "Aynı kural: fiil ikinci sırada.",
      },
      {
        kind: "free",
        prompt: "Bir yolculuktan bir geceyi ya da bir olayı anlat: nerede ve ne zaman, ne oldu, o an ne hissettin, ne geride kaldı. En az üç cümlen bir yan cümleyle başlasın (Als …, Wenn …, Nachdem …).",
        checklist: [
          "Yer ve zaman verilmiş mi?",
          "Olay geçmiş zamanda anlatılmış mı?",
          "En az üç cümle yan cümleyle başlıyor mu?",
          "Bu cümlelerde ana cümle fiille mi başlıyor?",
          "Sonda bir değerlendirme var mı?",
        ],
        minWords: 70,
        sample:
          "Vor zwei Jahren waren wir im Sommer am Ozean. Als wir am Abend " +
          "ankamen, war das Lager schon voll, und wir mussten weitergehen.\n\n" +
          "Nachdem wir eine Stunde gelaufen waren, fanden wir oben am Hügel " +
          "einen ruhigen Platz. Ein Zelt hatten wir nicht dabei. Es war kalt, " +
          "aber als der Mond hinter den Wolken verschwand, sah man jeden " +
          "Stern bis zum Wasser.\n\n" +
          "In der Nacht kam ein Sturm. Wenn ein Blitz kam, war für eine " +
          "Sekunde alles hell — der Hügel, das Gras, der ganze Ozean.\n\n" +
          "Für eine Fotografie war es zu dunkel, und mein Video zeigt fast " +
          "nichts. Diese Erzählung ist alles, was übrig ist, und ehrlich " +
          "gesagt reicht sie mir.",
        phrases: [
          { de: "Als wir ankamen, war …", tr: "Vardığımızda … idi.", en: "When we arrived, … was …" },
          { de: "Nachdem wir … waren, fanden wir …", tr: "… -dikten sonra … bulduk.", en: "After we had …, we found …" },
          { de: "Diese Erzählung ist alles, was übrig ist.", tr: "Bu anlatı geriye kalan tek şey.", en: "This story is all that is left." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Virgülden sonraki sırayı düzelt.",
        source: "Als wir ankamen, das Lager war voll. Nachdem wir gelaufen waren, wir fanden einen Platz.",
        answer: "Als wir ankamen, war das Lager voll. Nachdem wir gelaufen waren, fanden wir einen Platz.",
        why: "Türkçede yan cümle önde de olsa ana cümlenin sırası DEĞİŞMEZ ('vardığımızda kamp doluydu'), o yüzden özne olduğu yerde bırakılıyor. Almancada yan cümlenin tamamı BİRİNCİ ÖĞEDİR; ikinci sıra fiile aittir. Bu yüzden virgülden hemen sonra fiil gelir, özne ondan sonra.",
      },
    ],
  },
];

import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 21 — "Vücut, ağrı ve doktor".
 *
 * Dört ders: Der Körper · Mein Kopf tut weh · Ein Termin beim Arzt ·
 * Du musst zum Arzt! İçerik ünite 1-21'in kelimeleriyle sınırlı.
 *
 *   Ünite 21: der Körper, der Kopf, der Arm, das Bein, die Hand,
 *             das Gewicht, der Mensch, das Leben · weh tun, der Schmerz,
 *             der Bauch, der Rücken, der Hals, fehlen, die Sache,
 *             passieren · der Termin, die Praxis, dringend, der Mittwoch,
 *             möglich, der Arzt, besuchen, die Stelle · müssen, krank,
 *             das Fieber, das Bett, sofort, sollen, bekommen, sich kümmern
 *
 * İKİ ANAHTAR KALIP — ikisi de Türkçeden birebir çevrilemez:
 *
 * 1) "Was fehlt Ihnen?" — doktorun standart açılış sorusu. Kelimesi kelimesine
 *    "size ne EKSİK?" demek; "neyiniz var?" anlamına gelir. Türkçedeki
 *    "nen var?" mantığı burada tersine çalışır: Almanca eksikliği sorar.
 *    Cevap da datif ile gelir: "Mir fehlt nichts" / "Mir tut der Kopf weh".
 *
 * 2) "weh tun" DATİF ister ve ayrılır: "Der Hals tut MIR weh." Ağrıyan yer
 *    ÖZNEDİR, kişi datiftedir — Türkçenin "boğazım ağrıyor"undaki iyelik
 *    yapısı yok. "Ich tue weh" cümlesi yanlıştır.
 *
 * KÜLTÜREL: Almanya'da doktora Termin ile gidilir; "dringend" demek daha
 * erken bir yer açtırır. Okuma egzersizi bunu telefon kaydı üstünden veriyor.
 */
export const a1U21: SkillExercise[] = [
  {
    id: "a1-u21-r1",
    level: "A1",
    skill: "reading",
    unit: 21,
    title: "Die Praxis Dr. Weber",
    genre: "Bilgi yazısı",
    intro: "Bir muayenehanenin kapısındaki bilgi. Ne zaman, nasıl randevu?",
    gloss: [
      { de: "die Praxis", tr: "muayenehane", en: "doctor's practice" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "dringend", tr: "acil", en: "urgent" },
      { de: "möglich", tr: "mümkün", en: "possible" },
    ],
    minutes: 3,
    text:
      "Praxis Dr. Weber\n\nMontag bis Freitag: 8 bis 12 Uhr\nMontag und Mittwoch auch: 15 bis 18 Uhr\nAm Wochenende ist die Praxis zu.\n\nBitte immer mit Termin kommen! Ohne Termin ist ein Besuch nur bei dringenden Sachen möglich — dann warten Sie bitte im Wartezimmer.\n\nTermine: Telefon 0231 / 44 55 66, oder direkt hier an der Anmeldung.\n\nBitte die Karte von der Krankenkasse mitnehmen. Der Arzt fragt auch nach Ihrem Gewicht.\n\nSind Sie krank und können nicht kommen? Rufen Sie uns bitte an. Ein Termin ohne Anruf kostet 20 Euro.",
    questions: [
      {
        text: "Wann ist die Praxis am Mittwochnachmittag auf?",
        options: ["von 15 bis 18 Uhr", "gar nicht", "von 8 bis 12 Uhr"],
        answer: 0,
        explain: "„Montag und Mittwoch auch: 15 bis 18 Uhr“.",
      },
      {
        text: "Kann man ohne Termin kommen?",
        options: ["nur bei dringenden Sachen", "immer", "nie"],
        answer: 0,
        explain:
          "„Ohne Termin ist ein Besuch nur bei dringenden Sachen möglich.“ Almanya'da doktora Termin ile gidilir.",
      },
      {
        kind: "gapfill",
        text: "Bitte die ___ von der Krankenkasse mitnehmen.",
        options: [],
        answer: 0,
        accept: ["Karte"],
        explain: "„Bitte die Karte von der Krankenkasse mitnehmen.“ — sağlık sigortası kartı.",
      },
      {
        text: "Was passiert, wenn man einen Termin hat und nicht anruft?",
        options: ["Es kostet 20 Euro.", "Nichts.", "Man bekommt keinen Termin mehr."],
        answer: 0,
        explain: "„Ein Termin ohne Anruf kostet 20 Euro.“ — haber vermemek para cezası doğurur.",
      },
      {
        text: "Richtig oder falsch? Die Praxis ist am Samstag auf.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Wochenende ist die Praxis zu.“",
      },
    ],
  },
  {
    id: "a1-u21-r2",
    level: "A1",
    skill: "reading",
    unit: 21,
    title: "Mir tut alles weh",
    genre: "Mesaj",
    intro: "Ali hasta. Arkadaşına yazıyor.",
    gloss: [
      { de: "weh tun", tr: "ağrımak", en: "to hurt" },
      { de: "das Fieber", tr: "ateş", en: "fever" },
      { de: "der Hals", tr: "boğaz", en: "throat" },
      { de: "sich kümmern", tr: "ilgilenmek", en: "to take care" },
    ],
    minutes: 3,
    text:
      "Hallo Max,\n\nheute kann ich leider nicht zum Sport kommen. Ich bin krank. Mein Kopf tut weh und der Hals auch — heute tut mir der Körper weh. Ich habe Fieber und liege im Bett.\n\nMeine Schwester kümmert sich um mich. Sie kocht und kauft Tee. Sehr nett!\n\nMorgen habe ich einen Termin beim Arzt — um 9 Uhr. Hoffentlich ist es nichts Schlimmes.\n\nDiesmal klappt es leider nicht. Aber am Mittwoch bin ich sicher wieder da.\n\nAli",
    questions: [
      {
        text: "Was tut Ali weh?",
        options: ["der Kopf und der Hals", "der Bauch und der Rücken", "der Arm"],
        answer: 0,
        explain: "„Mein Kopf tut weh und der Hals auch.“",
      },
      {
        text: "Wer kümmert sich um Ali?",
        options: ["seine Schwester", "seine Mutter", "sein Freund Max"],
        answer: 0,
        explain: "„Meine Schwester kümmert sich um mich.“",
      },
      {
        kind: "gapfill",
        text: "Der Termin beim Arzt ist um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["9", "neun"],
        explain: "„Morgen habe ich einen Termin beim Arzt — um 9 Uhr.“",
      },
      {
        text: "Wann will Ali wieder zum Sport kommen?",
        options: ["am Mittwoch", "morgen", "am Wochenende"],
        answer: 0,
        explain: "„Aber am Mittwoch bin ich sicher wieder da.“",
      },
    ],
  },
  {
    id: "a1-u21-l1",
    level: "A1",
    skill: "listening",
    unit: 21,
    title: "Einen Termin machen",
    genre: "Telefon",
    intro: "Muayenehaneye telefon. Randevu alınıyor.",
    gloss: [
      { de: "dringend", tr: "acil", en: "urgent" },
      { de: "möglich", tr: "mümkün", en: "possible" },
      { de: "der Bauch", tr: "karın", en: "belly" },
    ],
    minutes: 2,
    segments: [
      { text: "Praxis Dr. Weber, guten Tag." },
      { text: "Guten Tag, hier ist Elif Yılmaz. Ich brauche einen Termin." },
      { text: "Gern. Was fehlt Ihnen denn?" },
      { text: "Mein Bauch tut seit zwei Tagen weh. Es ist sehr dringend." },
      { text: "Dann kommen Sie heute um 16 Uhr. Geht das?" },
      { text: "Ja, das ist möglich. Vielen Dank!" },
    ],
    questions: [
      {
        text: "„Was fehlt Ihnen?“ sorusu ne demek?",
        options: ["Neyiniz var?", "Neyi unuttunuz?", "Neye ihtiyacınız var?"],
        answer: 0,
        explain:
          "Kelimesi kelimesine „size ne eksik?“ — doktorun standart açılış sorusu, „neyiniz var?“ demektir.",
      },
      {
        text: "Wo hat Elif Schmerzen?",
        options: ["im Bauch", "im Kopf", "im Rücken"],
        answer: 0,
        explain: "„Mein Bauch tut seit zwei Tagen weh.“",
      },
      {
        kind: "gapfill",
        text: "Elif bekommt einen Termin um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["16"],
        explain: "„Dann kommen Sie heute um 16 Uhr.“",
      },
      {
        text: "Warum bekommt sie so schnell einen Termin?",
        options: ["Es ist dringend.", "Sie ist eine Freundin.", "Die Praxis ist leer."],
        answer: 0,
        explain: "„Es ist sehr dringend.“ — bu sözcük daha erken bir yer açtırır.",
      },
    ],
  },
  {
    id: "a1-u21-l2",
    level: "A1",
    skill: "listening",
    unit: 21,
    title: "Du musst zum Arzt!",
    genre: "Diyalog",
    intro: "İki arkadaş. Biri hasta, diğeri öğüt veriyor.",
    gloss: [
      { de: "sofort", tr: "hemen", en: "immediately" },
      { de: "sollen", tr: "-meli, -malı", en: "should" },
      { de: "das Bett", tr: "yatak", en: "bed" },
    ],
    minutes: 2,
    segments: [
      { text: "Wie geht es dir? Bist du krank?" },
      { text: "Mir tut der Rücken weh. Und ich habe Fieber." },
      { text: "Fieber? Dann musst du sofort zum Arzt!" },
      { text: "Ach, das geht schon wieder weg." },
      { text: "Nein. Du sollst ins Bett und viel trinken. Ich kaufe dir Tee." },
      { text: "Danke. Vielleicht rufe ich morgen die Praxis an." },
    ],
    questions: [
      {
        text: "Was tut der ersten Person weh?",
        options: ["der Rücken", "der Kopf", "der Arm"],
        answer: 0,
        explain: "„Mir tut der Rücken weh.“ — ağrıyan yer ÖZNE, kişi datif („mir“).",
      },
      {
        text: "Was soll die kranke Person machen?",
        options: ["ins Bett gehen und viel trinken", "arbeiten gehen", "Sport machen"],
        answer: 0,
        explain: "„Du sollst ins Bett und viel trinken.“",
      },
      {
        kind: "gapfill",
        text: "„Dann musst du ___ zum Arzt!“",
        options: [],
        answer: 0,
        accept: ["sofort"],
        explain: "„Dann musst du sofort zum Arzt!“",
      },
      {
        text: "Was will die kranke Person morgen machen?",
        options: ["die Praxis anrufen", "zum Training gehen", "nichts"],
        answer: 0,
        explain: "„Vielleicht rufe ich morgen die Praxis an.“ — ayrılabilen fiil: rufe … an.",
      },
    ],
  },
  {
    id: "a1-u21-w1",
    level: "A1",
    skill: "writing",
    unit: 21,
    title: "Wo tut es weh?",
    genre: "Dil bilgisi",
    intro: "Ağrı cümlesi Türkçeden ters kurulur. Üç deneme.",
    gloss: [
      { de: "weh tun", tr: "ağrımak", en: "to hurt" },
      { de: "fehlen", tr: "eksik olmak", en: "to be missing" },
      { de: "der Schmerz", tr: "ağrı", en: "pain" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Başım ağrıyor.",
        answer: "Mein Kopf tut weh",
        hint: "Ağrıyan yer ÖZNEDİR: „Mein Kopf tut weh.“ — „Ich tue weh“ YANLIŞTIR. „weh tun“ ayrılır: tut … weh.",
      },
      {
        kind: "build",
        tr: "Boğazım ağrıyor.",
        answer: "Der Hals tut mir weh",
        hint: "İkinci biçim: kişi DATİFTE („mir“), organ artikelle gelir. „Mein Hals tut weh“ da doğrudur, ikisi de kullanılır.",
      },
      {
        kind: "rewrite",
        prompt: "Doktorun sorusunu yaz.",
        source: "Neyiniz var?",
        answer: "Was fehlt Ihnen?",
        alternatives: ["Was fehlt Ihnen", "Was fehlt dir?", "Was fehlt dir"],
        why:
          "Almanca eksikliği sorar: „size ne EKSİK?“ Türkçenin „nen var?“ mantığının tersi. Cevap da datifle gelir: „Mir fehlt nichts.“",
      },
    ],
  },
  {
    id: "a1-u21-w2",
    level: "A1",
    skill: "writing",
    unit: 21,
    title: "Ich bin krank",
    genre: "Mesaj",
    intro: "Hasta olduğun için gelemeyeceğini haber ver.",
    gloss: [
      { de: "krank", tr: "hasta", en: "ill" },
      { de: "das Fieber", tr: "ateş", en: "fever" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yarın için bir randevuya ihtiyacım var.",
        answer: "Ich brauche einen Termin für morgen",
        hint: "„brauchen“ akkusatif ister: einen Termin. Telefonda randevu almanın standart açılışı.",
      },
      {
        kind: "free",
        prompt:
          "Hastasın ve yarınki derse/işe gidemiyorsun. Mesaj yaz (4-5 cümle): hasta olduğunu söyle, neyinin ağrıdığını yaz, doktor randevun olduğunu belirt ve ne zaman döneceğini söyle.",
        minWords: 30,
        checklist: [
          "Hasta olduğunu yazdın mı? (Ich bin krank.)",
          "Neyinin ağrıdığını yazdın mı? („… tut weh“ ya da „Ich habe …schmerzen“)",
          "Doktordan söz ettin mi? (Ich habe einen Termin beim Arzt.)",
          "Ne zaman döneceğini yazdın mı? (Am Mittwoch bin ich wieder da.)",
        ],
        phrases: [
          { de: "Ich bin krank.", tr: "Hastayım.", en: "I'm ill." },
          { de: "Mein Kopf tut weh.", tr: "Başım ağrıyor.", en: "My head hurts." },
          { de: "Ich habe einen Termin beim Arzt.", tr: "Doktor randevum var.", en: "I have a doctor's appointment." },
        ],
        sample:
          "Guten Morgen Frau Berger,\n\nleider kann ich heute nicht kommen. Ich bin krank. Mein Hals tut weh und ich habe Fieber. Seit heute Morgen liege ich im Bett.\n\nHeute um 16 Uhr habe ich einen Termin beim Arzt. Hoffentlich ist es nichts Schlimmes.\n\nAm Mittwoch bin ich sicher wieder da. Es tut mir leid!\n\nViele Grüße\nElif Yılmaz",
      },
    ],
  },
];

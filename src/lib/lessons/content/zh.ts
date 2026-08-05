import type { Lesson } from "../types";

/**
 * Dersler — Zürih Almancası kursu.
 *
 * Buradaki öğrenci çoğunlukla Hochdeutsch biliyor ve lehçeye geçiyor; bu
 * yüzden dersler sıfırdan dilbilgisi öğretmiyor, **farkı** öğretiyor. Her
 * kural „Hochdeutsch'ta şöyle, lehçede böyle“ ekseninde kurulu.
 *
 * Rol yapmada model lehçe konuşuyor ama öğrencinin Hochdeutsch cevabı da
 * kabul ediliyor: amaç konuşmayı kesmek değil, lehçeye alıştırmak.
 */
export const zhLessons: Lesson[] = [
  {
    id: "zh-a1-l1",
    level: "A1",
    course: "gsw-zh",
    ruleId: "gsw-Verben",
    title: "En sık fiiller: isch, hät, gaht",
    summary: "Hochdeutsch'un ist/hat/geht biçimleri lehçede başka sesler alır.",
    minutes: 7,
    rule:
      "Züritüütsch'te en sık fiiller Hochdeutsch'tan belirgin biçimde ayrılır: ist → isch, hat → hät, geht → gaht, kommt → chunt, will → wott. Bunlar her cümlede geçtiği için lehçeyi anlaşılır kılan ilk şey bunların oturmasıdır.",
    examples: [
      { de: "Das isch mis Huus.", tr: "Bu benim evim. (Das ist mein Haus.)" },
      { de: "Er hät kei Ziit.", tr: "Onun vakti yok. (Er hat keine Zeit.)" },
      { de: "Wänn chunt de Zug?", tr: "Tren ne zaman geliyor? (Wann kommt der Zug?)" },
    ],
    checks: [
      {
        prompt: "Hochdeutsch „Das ist gut“ lehçede nasıl?",
        options: ["Das ist guet.", "Das isch guet.", "Das hät guet."],
        answer: "Das isch guet.",
        why: "„ist“ lehçede „isch“ olur; „st“ her yerde şt okunur.",
      },
        {
        prompt: "„Er hat Zeit“ lehçede?",
        options: ["Er hät Ziit.", "Er hat Ziit.", "Er isch Ziit."],
        answer: "Er hät Ziit.",
        why: "„hat“ → „hät“ ve „Zeit“ → „Ziit“ (ikili ünlü tek sese iner).",
      },
      {
        prompt: "„Wann kommt sie?“ lehçede?",
        options: ["Wänn chunt si?", "Wänn kommt si?", "Wänn gaht si?"],
        answer: "Wänn chunt si?",
        why: "„kommt“ → „chunt“; baştaki Ch lehçenin imza sesi.",
      },
    ],
    roleplay: {
      scene:
        "Zürih'te bir komşunla kısa bir sohbet ediyorsun. Lehçe fiilleri kullanmaya çalış: isch, hät, gaht, chunt. Takılırsan Hochdeutsch da olur.",
      partner: "güler yüzlü bir Zürihli komşu",
      opening: "Grüezi! Wie gaht's? Sind Sie neu do?",
      openingTr: "Merhaba! Nasılsınız? Buraya yeni misiniz?",
      minTurns: 4,
    },
  },
  {
    id: "zh-a2-l1",
    level: "A2",
    course: "gsw-zh",
    ruleId: "gsw-Perfekt",
    title: "Geçmiş zaman yalnızca Perfekt",
    summary: "Lehçede Präteritum yoktur; her geçmiş Perfekt ile kurulur.",
    minutes: 8,
    rule:
      "Züritüütsch'te Hochdeutsch'un „ich war, ich hatte, ich ging“ gibi Präteritum biçimleri YOKTUR. Her geçmiş Perfekt ile kurulur ve „ge-“ öneki tek bir g'ye iner: gewesen → gsi, gehabt → gha, gegangen → gange, gesehen → gseh.",
    examples: [
      { de: "Ich bi geschter dihei gsi.", tr: "Dün evdeydim. (Ich war gestern zu Hause.)" },
      { de: "Mir hend kei Ziit gha.", tr: "Vaktimiz olmadı. (Wir hatten keine Zeit.)" },
      { de: "Si isch ins Chino gange.", tr: "Sinemaya gitti. (Sie ging ins Kino.)" },
    ],
    checks: [
      {
        prompt: "Hochdeutsch „Ich war müde“ lehçede?",
        options: ["Ich war müed.", "Ich bi müed gsi.", "Ich ha müed gsi."],
        answer: "Ich bi müed gsi.",
        why: "Präteritum yok; „war“ yerine „bi … gsi“ (bin … gewesen) kurulur.",
      },
      {
        prompt: "„Wir hatten Glück“ lehçede?",
        options: ["Mir hend Glück gha.", "Mir hatten Glück.", "Mir sind Glück gsi."],
        answer: "Mir hend Glück gha.",
        why: "„hatten“ → „hend … gha“; yardımcı fiil „haben“, Partizip „gha“.",
      },
      {
        prompt: "„gesehen“ lehçede nasıl kısalır?",
        options: ["gseh", "gsehen", "seh"],
        answer: "gseh",
        why: "„ge-“ öneki tek g'ye iner ve sonundaki -en düşer.",
      },
    ],
    roleplay: {
      scene:
        "Hafta sonunu anlatıyorsun. Geçmişi hep Perfekt ile kur — gsi, gha, gange, gseh biçimlerini kullanmayı dene.",
      partner: "hafta sonunu merak eden bir arkadaş",
      opening: "Sali! Was häsch am Wuchenänd gmacht?",
      openingTr: "Selam! Hafta sonu ne yaptın?",
      minTurns: 4,
    },
  },
];

import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 23 — "Olmayanı anlatmak" (dersler 89–92).
 *
 * Dersler: Auf der Demo · Im Tierheim · Irreale Bedingungen · Wünsche.
 *
 * Ünitenin dilbilgisi ekseni Konjunktiv II ve iki ayrı hata çıkıyor:
 *   geçmişte gerçek  Türkçede gerçek dışı koşul temiz bir ekle kurulur
 *   dışı koşul       ('gelseydim') ve zaman ayrı işaretlenmez. Almanca
 *                    iki katman ister: hätte/wäre + Partizip. Öğrenci
 *                    normal geçmişi kullanınca ("wenn ich Zeit gehabt
 *                    habe") cümle gerçek bir koşula dönüşüyor.
 *   würde ↔ wäre     Öğrenci würde'yi tek kalıp sanıp her fiile takıyor.
 *                    Almanca sein, haben ve kipli fiillerde KENDİ
 *                    Konjunktiv II biçimini ister: wäre, hätte, könnte,
 *                    müsste — "sein würde" denmez.
 *
 * Yeni 32 kelime: sich einsetzen, die Forderung, friedlich, der Streik,
 * protestieren, der Protest, die Öffentlichkeit, schreien, das Zuhause,
 * scheu, füttern, der Tierpark, beißen, treu, die Liebe, die Beziehung,
 * reich, das Gold, das Wunder, das Boot, ewig, der König, die Hälfte,
 * das Vergnügen, reichen, sich wünschen, das Geheimnis, zukünftig,
 * die Änderung, sich entschließen, der Beginn, seltsam.
 */
export const b1U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u23-r1",
    level: "B1",
    skill: "reading",
    unit: 23,
    title: "Der friedliche Protest",
    genre: "Haber ve yorum",
    intro: "Bir gösteri anlatılıyor. Talep ne, sonuç ne oldu?",
    minutes: 5,
    gloss: [
      { de: "die Forderung", tr: "talep", en: "demand" },
      { de: "friedlich", tr: "barışçıl", en: "peaceful" },
      { de: "die Öffentlichkeit", tr: "kamuoyu", en: "the public" },
      { de: "sich einsetzen", tr: "mücadele etmek", en: "to campaign" },
      { de: "der Streik", tr: "grev", en: "strike" },
    ],
    text:
      "Am Samstag haben etwa dreitausend Menschen dafür protestiert, dass das alte " +
      "Bad bleibt. Der Protest war friedlich: niemand hat geschrien, " +
      "und um sechs war alles vorbei.\n\n" +
      "Die Forderung ist einfach. Das Bad soll bleiben, bis ein neues fertig " +
      "ist. Wer sich dafür einsetzt, sagt: ein Viertel ohne Bad verliert " +
      "mehr als ein Gebäude.\n\n" +
      "Die Stadt hatte den Abriss für Juni geplant. Wenn die Öffentlichkeit " +
      "nicht protestiert hätte, wäre die Entscheidung schon gefallen. So aber " +
      "wird im Herbst neu beraten.\n\n" +
      "Eine Lehrerin sagte uns: „Vor zehn Jahren hätten wir das nicht " +
      "geschafft. Damals gab es keinen Streik und keine Gruppe. Heute " +
      "kennen sich die Leute — das ist der ganze Unterschied.“",
    questions: [
      {
        text: "Wofür haben die Menschen protestiert?",
        options: ["Für ein neues Bad", "Dafür, dass das alte Bad bleibt", "Gegen die Stadt"],
        answer: 1,
        explain: "„… haben etwa dreitausend Menschen dafür protestiert, dass das alte Bad bleibt.“",
      },
      {
        text: "Wie war der Protest?",
        options: ["Laut", "Friedlich", "Kurz und wütend"],
        answer: 1,
        explain: "„Der Protest war friedlich: niemand hat geschrien …“",
      },
      {
        text: "Wann wird jetzt neu beraten?",
        options: ["Im Juni", "Im Herbst", "Nächstes Jahr"],
        answer: 1,
        explain: "„So aber wird im Herbst neu beraten.“",
      },
      {
        kind: "gapfill",
        text: "Wenn die Öffentlichkeit nicht protestiert ___, wäre die Entscheidung schon gefallen.",
        options: [],
        answer: 0,
        accept: ["hätte"],
        explain: "Geçmişte gerçek dışı koşul: hätte/wäre + Partizip.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Menschen haben protestiert?",
        options: [],
        answer: 0,
        accept: ["etwa dreitausend", "dreitausend", "3000"],
        explain: "„Am Samstag haben etwa dreitausend Menschen … protestiert.“",
      },
    ],
  },
  {
    id: "b1-u23-r2",
    level: "B1",
    skill: "reading",
    unit: 23,
    title: "Ein Zuhause für Nero",
    genre: "Barınak ilanı",
    intro: "Bir köpek yeni yuva arıyor. Karakteri nasıl, kime uygun?",
    minutes: 5,
    gloss: [
      { de: "das Zuhause", tr: "yuva", en: "home" },
      { de: "scheu", tr: "ürkek", en: "shy" },
      { de: "füttern", tr: "beslemek", en: "to feed" },
      { de: "treu", tr: "sadık", en: "loyal" },
      { de: "beißen", tr: "ısırmak", en: "to bite" },
    ],
    text:
      "Nero ist sieben Jahre alt und seit acht Monaten bei uns. Er ist groß, " +
      "ruhig und ausgesprochen treu — aber am Anfang sehr scheu.\n\n" +
      "Er hat noch nie jemanden gebissen. Wenn er Angst hat, geht er weg " +
      "statt zu bellen. Wer ihn füttert, ist nach drei Tagen sein Mensch. " +
      "Danach hört er auf jedes Wort.\n\n" +
      "Nero passt nicht in eine kleine Wohnung und nicht zu kleinen Kindern. " +
      "Er braucht einen Garten und zwei lange Runden am Tag. Wenn wir mehr " +
      "Platz hätten, würden wir ihn selbst behalten.\n\n" +
      "Ein neues Zuhause zu finden braucht Zeit, und eine Beziehung zu einem \n" +
      "Tier aus dem Heim erst recht. Die ersten " +
      "zwei Wochen sind seltsam für beide Seiten. Danach kommt etwas zurück, " +
      "das man nicht kaufen kann.",
    questions: [
      {
        text: "Wie alt ist Nero?",
        options: ["Sieben Jahre", "Acht Monate", "Drei Jahre"],
        answer: 0,
        explain: "„Nero ist sieben Jahre alt und seit acht Monaten bei uns.“",
      },
      {
        text: "Was macht Nero, wenn er Angst hat?",
        options: ["Er bellt", "Er geht weg", "Er beißt"],
        answer: 1,
        explain: "„Wenn er Angst hat, geht er weg statt zu bellen.“",
      },
      {
        text: "Für wen passt Nero NICHT?",
        options: ["Für kleine Kinder", "Für ältere Leute", "Für Leute mit Garten"],
        answer: 0,
        explain: "„Nero passt nicht in eine kleine Wohnung und nicht zu kleinen Kindern.“",
      },
      {
        kind: "gapfill",
        text: "Wenn wir mehr Platz ___, würden wir ihn selbst behalten.",
        options: [],
        answer: 0,
        accept: ["hätten"],
        explain: "„haben“ kendi Konjunktiv II biçimini alır: hätten, „haben würden“ değil.",
      },
      {
        kind: "short_answer",
        text: "Was braucht Nero jeden Tag?",
        options: [],
        answer: 0,
        accept: ["zwei lange Runden", "zwei Runden", "einen Garten und zwei Runden"],
        explain: "„Er braucht einen Garten und zwei lange Runden am Tag.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u23-l1",
    level: "B1",
    skill: "listening",
    unit: 23,
    title: "Was wäre, wenn?",
    genre: "Hayal sohbeti",
    intro: "İki kişi olmayacak şeyleri konuşuyor. Kim ne yapardı?",
    minutes: 4,
    gloss: [
      { de: "reich", tr: "zengin", en: "rich" },
      { de: "das Wunder", tr: "mucize", en: "miracle" },
      { de: "das Boot", tr: "tekne", en: "boat" },
      { de: "das Vergnügen", tr: "keyif", en: "pleasure" },
    ],
    segments: [
      { text: "Was würdest du machen, wenn du plötzlich reich wärst?" },
      { text: "Ich würde die Hälfte verteilen. Wirklich." },
      { text: "Das sagen alle. Und die andere Hälfte?" },
      { text: "Ein kleines Boot. Kein Gold, kein großes Haus." },
      { text: "Ein Boot wäre auch mein Vergnügen. Aber ich könnte nicht aufhören zu arbeiten." },
      { text: "Warum nicht? Wenn ich nicht müsste, würde ich sofort aufhören." },
      { text: "Nach zwei Monaten wäre mir langweilig. Das ist kein Wunder." },
      { text: "Dann arbeite eben vier Stunden am Tag. So schwer ist das nicht." },
    ],
    questions: [
      {
        text: "Was würde die zweite Person mit der Hälfte machen?",
        options: ["Verteilen", "Ein Haus kaufen", "Sparen"],
        answer: 0,
        explain: "„Ich würde die Hälfte verteilen.“",
      },
      {
        text: "Was möchte sie sich kaufen?",
        options: ["Ein großes Haus", "Ein kleines Boot", "Gold"],
        answer: 1,
        explain: "„Ein kleines Boot. Kein Gold, kein großes Haus.“",
      },
      {
        text: "Warum würde die erste Person weiterarbeiten?",
        options: ["Wegen des Geldes", "Weil ihr sonst langweilig wäre", "Wegen der Kollegen"],
        answer: 1,
        explain: "„Nach zwei Monaten wäre mir langweilig.“",
      },
      {
        kind: "gapfill",
        text: "Was würdest du machen, wenn du plötzlich reich ___?",
        options: [],
        answer: 0,
        accept: ["wärst"],
        explain: "„sein“ kendi Konjunktiv II biçimini alır: wärst, „sein würdest“ değil.",
      },
      {
        kind: "short_answer",
        text: "Nach wie langer Zeit wäre der ersten Person langweilig?",
        options: [],
        answer: 0,
        accept: ["nach zwei Monaten", "zwei Monaten", "zwei Monate"],
        explain: "„Nach zwei Monaten wäre mir langweilig.“",
      },
    ],
  },
  {
    id: "b1-u23-l2",
    level: "B1",
    skill: "listening",
    unit: 23,
    title: "Ein Wunsch und eine Entscheidung",
    genre: "Kişisel konuşma",
    intro: "Biri bir karar vermiş. Dilek ne, karar ne?",
    minutes: 4,
    gloss: [
      { de: "sich wünschen", tr: "dilemek", en: "to wish" },
      { de: "sich entschließen", tr: "karar vermek", en: "to decide" },
      { de: "die Änderung", tr: "değişiklik", en: "change" },
      { de: "das Geheimnis", tr: "sır", en: "secret" },
    ],
    segments: [
      { text: "Ich habe mich entschlossen. Ab Januar arbeite ich nur noch vier Tage." },
      { text: "Wirklich? Das ist eine große Änderung." },
      { text: "Ich wünsche mir das seit Jahren. Jetzt reicht es mir." },
      { text: "Hättest du das früher gemacht, wärst du nicht so erschöpft gewesen." },
      { text: "Ich weiß. Aber ich hatte immer Angst vor dem Beginn." },
      { text: "Verstehe ich. Sag es aber der Chefin selbst, nicht über andere." },
      { text: "Natürlich. Es ist ja kein Geheimnis." },
      { text: "Gut. Zukünftig hast du dann drei Tage für dich." },
    ],
    questions: [
      {
        text: "Was hat die erste Person entschieden?",
        options: ["Zu kündigen", "Ab Januar vier Tage zu arbeiten", "Umzuziehen"],
        answer: 1,
        explain: "„Ab Januar arbeite ich nur noch vier Tage.“",
      },
      {
        text: "Wovor hatte sie Angst?",
        options: ["Vor der Chefin", "Vor dem Beginn", "Vor dem Geld"],
        answer: 1,
        explain: "„Aber ich hatte immer Angst vor dem Beginn.“",
      },
      {
        text: "Was rät die zweite Person?",
        options: ["Es der Chefin selbst zu sagen", "Zu warten", "Nichts zu sagen"],
        answer: 0,
        explain: "„Sag es aber der Chefin selbst, nicht über andere.“",
      },
      {
        kind: "gapfill",
        text: "___ du das früher gemacht, wärst du nicht so erschöpft gewesen.",
        options: [],
        answer: 0,
        accept: ["Hättest"],
        explain: "Geçmişte gerçek dışı koşul; „wenn“ düşünce fiil başa geçer.",
      },
      {
        kind: "short_answer",
        text: "Ab wann gilt die Änderung?",
        options: [],
        answer: 0,
        accept: ["ab Januar", "Januar"],
        explain: "„Ab Januar arbeite ich nur noch vier Tage.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u23-w1",
    level: "B1",
    skill: "writing",
    unit: 23,
    title: "Was anders gelaufen wäre",
    genre: "Değerlendirme yazısı",
    intro: "Olmuş bir olayı 'olmasaydı' diye anlat. İki katmanı da kur.",
    minutes: 8,
    gloss: [
      { de: "der Protest", tr: "protesto", en: "protest" },
      { de: "die Forderung", tr: "talep", en: "demand" },
      { de: "protestieren", tr: "protesto etmek", en: "to protest" },
      { de: "die Öffentlichkeit", tr: "kamuoyu", en: "the public" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kamuoyu protesto etmeseydi karar çoktan verilmiş olurdu.",
        answer: "Wenn die Öffentlichkeit nicht protestiert hätte, wäre die Entscheidung schon gefallen.",
        hint: "İki yarıda da hätte/wäre + Partizip.",
      },
      {
        kind: "build",
        tr: "On yıl önce bunu başaramazdık.",
        answer: "Vor zehn Jahren hätten wir das nicht geschafft.",
        hint: "Geçmişte gerçek dışı: hätten + Partizip.",
      },
      {
        kind: "build",
        tr: "Daha çok yerimiz olsaydı onu kendimiz alırdık.",
        answer: "Wenn wir mehr Platz hätten, würden wir ihn selbst behalten.",
        hint: "Şimdiki gerçek dışı: hätten … würden.",
      },
      {
        kind: "form",
        prompt: "Protesto haber kartını doldur.",
        facts: "Gün: cumartesi; katılım: yaklaşık 3000 kişi; konu: eski havuzun korunması; ton: barışçıl; sonuç: sonbaharda yeniden görüşme.",
        fields: [
          { label: "Tag", answer: "Samstag", accept: ["am Samstag"] },
          { label: "Teilnehmer", answer: "etwa 3000", accept: ["dreitausend", "3000"] },
          { label: "Forderung", answer: "das alte Bad soll bleiben", accept: ["das Bad soll bleiben", "das alte Bad"] },
          { label: "Ergebnis", answer: "neue Beratung im Herbst", accept: ["im Herbst", "Beratung im Herbst"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Gerçek dışı koşulun zamanını düzelt.",
        source: "Wenn ich mehr Zeit gehabt habe, wäre ich gekommen.",
        answer: "Wenn ich mehr Zeit gehabt hätte, wäre ich gekommen.",
        why: "Türkçede gerçek dışı koşul temiz bir ekle kurulur ('vaktim olsaydı') ve zaman ayrıca işaretlenmez, o yüzden Almancada normal geçmiş kullanılıyor. Ama 'gehabt habe' GERÇEK bir koşuldur ('vaktim olduysa'). Olmamış bir geçmiş için iki katman gerekir: hätte/wäre + Partizip, cümlenin İKİ yarısında da.",
      },
    ],
  },
  {
    id: "b1-u23-w2",
    level: "B1",
    skill: "writing",
    unit: 23,
    title: "Wenn ich könnte",
    genre: "Dilek metni",
    intro: "Dileklerini yaz. sein, haben ve kipli fiiller 'würde' almaz — kendi kalıpları var.",
    minutes: 12,
    gloss: [
      { de: "sich wünschen", tr: "dilemek", en: "to wish" },
      { de: "reichen", tr: "yetmek", en: "to be enough" },
      { de: "ewig", tr: "sonsuza dek", en: "forever" },
      { de: "zukünftig", tr: "bundan böyle", en: "in future" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Zengin olsam yarısını dağıtırdım.",
        answer: "Wenn ich reich wäre, würde ich die Hälfte verteilen.",
        hint: "sein → wäre; öteki fiil → würde.",
      },
      {
        kind: "build",
        tr: "Mecbur olmasam hemen bırakırdım.",
        answer: "Wenn ich nicht müsste, würde ich sofort aufhören.",
        hint: "müssen → müsste, kendi biçimi.",
      },
      {
        kind: "free",
        prompt: "Bir dileğini yaz: ne dilersin, neden, gerçekleşse hayatında ne değişirdi, ve şimdi bunun için ne yapabilirsin. En az üç Konjunktiv II cümlesi kullan ve en az birinde wäre ya da hätte geçsin.",
        checklist: [
          "Dilek net söylenmiş mi?",
          "Sebep verilmiş mi?",
          "Gerçekleşse ne değişirdi anlatılmış mı?",
          "En az üç Konjunktiv II cümlesi var mı?",
          "En az birinde wäre/hätte var mı?",
        ],
        minWords: 70,
        sample:
          "Ich wünsche mir seit Jahren mehr Zeit. Nicht mehr Geld, nur mehr Zeit.\n\n" +
          "Wenn ich vier Tage arbeiten könnte, hätte ich einen ganzen Tag für " +
          "meine Familie. Ich wäre am Wochenende nicht so erschöpft, und ich " +
          "müsste nicht jeden Abend rechnen, was noch offen ist.\n\n" +
          "Hätte ich das vor fünf Jahren gemacht, wäre vieles leichter gewesen. " +
          "Aber ich hatte Angst vor dem Beginn und vor der Frage, ob das Geld " +
          "reicht.\n\n" +
          "Jetzt weiß ich: es würde reichen. Zukünftig will ich zumindest " +
          "einmal fragen, statt es ewig zu verschieben. Fragen kostet nichts, " +
          "und die Antwort kenne ich sonst nie.",
        phrases: [
          { de: "Ich wünsche mir …", tr: "… diliyorum.", en: "I wish for …" },
          { de: "Wenn ich … könnte, hätte ich …", tr: "… -abilseydim, … olurdu.", en: "If I could …, I would have …" },
          { de: "Hätte ich das früher gemacht, …", tr: "Bunu daha önce yapsaydım …", en: "Had I done that earlier, …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„würde“ fazlalıklarını kaldır.",
        source: "Wenn ich reich sein würde, würde ich mehr Zeit haben würden.",
        answer: "Wenn ich reich wäre, hätte ich mehr Zeit.",
        why: "Öğrenci würde'yi tek kalıp sanıp her fiile takıyor, çünkü Türkçede gerçek dışılık tek ekle kurulur ve fiil ayrımı yoktur. Almanca ayırır: sein → wäre, haben → hätte, kipli fiiller → könnte/müsste/dürfte. Bu fiiller KENDİ Konjunktiv II biçimlerini taşıdığı için würde almazlar; würde yalnız öteki fiiller için yardımcıdır.",
      },
    ],
  },
];

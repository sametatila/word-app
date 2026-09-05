import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 24 — "Kaçırılan ve tutulan" (dersler 93–96).
 *
 * Dersler: Die Vergangenheit bereuen · Zukunftsangst · Freundschaft pflegen
 * · Die Liebeserklärung.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   kennen ↔ wissen   Türkçe 'bilmek' İKİSİNİ DE karşılar, o yüzden ayrım
 *                     hiç görünmüyor. Almanca ayırır: KİŞİ ve YER için
 *                     kennen (tanımak), OLGU ve yan cümle için wissen.
 *                     "Ich weiß ihn seit zehn Jahren" bu yüzden çok sık.
 *   dönüşlü zamirin   Türkçede dönüşlülük fiilin içindedir ve hâli yoktur.
 *   hâli              Almancada dönüşlü zamir nesne varsa DATİV'e geçer:
 *                     "ich wasche mich" ama "ich wasche mir die Hände";
 *                     "ich überlege mir das", "ich wünsche mir etwas".
 *
 * Yeni 32 kelime: versäumen, die Chance, ursprünglich, anfangs, ärgerlich,
 * das Gewissen, zufällig, der Zeitpunkt, die Sicherheit, sich fürchten,
 * erschrecken, der Schreck, das Risiko, nachdenken, ernsthaft, offenbar,
 * pflegen, die Freundschaft, die Distanz, vertraut, nah, versprechen,
 * verlassen, verbringen, verliebt, der Mut, gestehen, küssen, lächeln,
 * die Ehe, sich trennen, schätzen.
 */
export const b1U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u24-r1",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "Die Chance, die ich versäumt habe",
    genre: "Kişisel yazı",
    intro: "Biri kaçırdığı bir fırsatı anlatıyor. Neden kaçırmış, bugün ne düşünüyor?",
    minutes: 5,
    gloss: [
      { de: "versäumen", tr: "kaçırmak", en: "to miss" },
      { de: "die Chance", tr: "fırsat", en: "chance" },
      { de: "ursprünglich", tr: "aslında / başlangıçta", en: "originally" },
      { de: "der Zeitpunkt", tr: "zaman noktası", en: "point in time" },
      { de: "das Gewissen", tr: "vicdan", en: "conscience" },
    ],
    text:
      "Vor sechs Jahren hätte ich ein Jahr im Ausland arbeiten können. " +
      "Die Firma hat gefragt, ich habe nein gesagt. Ursprünglich wollte ich " +
      "unbedingt, aber der Zeitpunkt war schlecht.\n\n" +
      "Anfangs war ich sicher, dass ich richtig entschieden hatte. Meine " +
      "Mutter war krank, und ich kannte niemanden dort. Heute weiß ich, dass " +
      "beides stimmte — und dass ich trotzdem hätte gehen können.\n\n" +
      "Ich habe mir das lange nicht überlegt. Erst als ein Kollege dieselbe " +
      "Chance bekam und ging, wurde ich ärgerlich. Nicht auf ihn. Auf mich.\n\n" +
      "Mein Gewissen ist trotzdem ruhig. Wer für jemanden bleibt, versäumt " +
      "nicht sein Leben, sondern wählt ein anderes. Nur sollte man das " +
      "bewusst tun, nicht aus Angst. Das ist der ganze Unterschied.",
    questions: [
      {
        text: "Was hätte die Person vor sechs Jahren machen können?",
        options: ["Im Ausland arbeiten", "Studieren", "Eine Firma gründen"],
        answer: 0,
        explain: "„Vor sechs Jahren hätte ich ein Jahr im Ausland arbeiten können.“",
      },
      {
        text: "Warum hat sie nein gesagt?",
        options: ["Sie wollte nie", "Die Mutter war krank und sie kannte niemanden dort", "Zu wenig Geld"],
        answer: 1,
        explain: "„Meine Mutter war krank, und ich kannte niemanden dort.“",
      },
      {
        text: "Wann wurde sie ärgerlich?",
        options: ["Sofort", "Als ein Kollege dieselbe Chance bekam", "Nie"],
        answer: 1,
        explain: "„Erst als ein Kollege dieselbe Chance bekam und ging, wurde ich ärgerlich.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ das lange nicht überlegt.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "Nesne var (das) → dönüşlü zamir Dativ'e geçer: „mir“.",
      },
      {
        kind: "short_answer",
        text: "Auf wen war sie ärgerlich?",
        options: [],
        answer: 0,
        accept: ["auf sich", "auf sich selbst", "auf sich, nicht auf ihn"],
        explain: "„Nicht auf ihn. Auf mich.“",
      },
    ],
  },
  {
    id: "b1-u24-r2",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "Freundschaft auf Distanz",
    genre: "Deneme",
    intro: "Uzaktaki dostluklar üzerine bir yazı. Ne işe yarıyor, ne yaramıyor?",
    minutes: 5,
    gloss: [
      { de: "pflegen", tr: "sürdürmek / bakmak", en: "to maintain" },
      { de: "die Distanz", tr: "mesafe", en: "distance" },
      { de: "vertraut", tr: "içten / tanıdık", en: "familiar" },
      { de: "schätzen", tr: "değer vermek", en: "to appreciate" },
      { de: "verbringen", tr: "(zaman) geçirmek", en: "to spend" },
    ],
    text:
      "Ich kenne meine beste Freundin seit zwanzig Jahren. Seit sechs davon " +
      "wohnt sie in einer anderen Stadt. Wir sehen uns dreimal im Jahr, und " +
      "trotzdem ist alles vertraut, sobald sie zur Tür hereinkommt.\n\n" +
      "Eine Freundschaft auf Distanz zu pflegen ist Arbeit. Nicht schwere " +
      "Arbeit, aber regelmäßige: eine Nachricht, ein Anruf, ein Foto von " +
      "nichts Besonderem. Wer wartet, bis er etwas Wichtiges zu erzählen " +
      "hat, meldet sich am Ende gar nicht.\n\n" +
      "Was nicht funktioniert, ist der große Plan. Zweimal haben wir eine " +
      "lange Reise versprochen und beide Male versäumt. Zwei Tage, die wir " +
      "wirklich zusammen verbringen, sind besser als zwei Wochen, die nie " +
      "stattfinden.\n\n" +
      "Ich weiß nicht, ob wir wieder in derselben Stadt leben werden. " +
      "Wahrscheinlich nicht. Aber ich schätze diese Freundschaft mehr als " +
      "manche, die zwei Straßen weiter wohnen.",
    questions: [
      {
        text: "Wie oft sehen sich die beiden?",
        options: ["Dreimal im Jahr", "Jeden Monat", "Einmal im Jahr"],
        answer: 0,
        explain: "„Wir sehen uns dreimal im Jahr …“",
      },
      {
        text: "Was gehört laut Text zur Pflege einer Freundschaft?",
        options: ["Große Pläne", "Regelmäßige kleine Zeichen", "Lange Reisen"],
        answer: 1,
        explain: "„Nicht schwere Arbeit, aber regelmäßige: eine Nachricht, ein Anruf, ein Foto …“",
      },
      {
        text: "Was hat nicht funktioniert?",
        options: ["Die lange Reise", "Die Anrufe", "Die Besuche im Herbst"],
        answer: 0,
        explain: "„Zweimal haben wir eine lange Reise versprochen und beide Male versäumt.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ meine beste Freundin seit zwanzig Jahren.",
        options: [],
        answer: 0,
        accept: ["kenne"],
        explain: "KİŞİ için „kennen“. „wissen“ olgu ve yan cümle için gelir.",
      },
      {
        kind: "short_answer",
        text: "Was ist besser als zwei Wochen, die nie stattfinden?",
        options: [],
        answer: 0,
        accept: ["zwei Tage zusammen", "zwei Tage"],
        explain: "„Zwei Tage, die wir wirklich zusammen verbringen, sind besser als zwei Wochen …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u24-l1",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "Wovor fürchtest du dich?",
    genre: "Gelecek konuşması",
    intro: "İki kişi kaygılarını konuşuyor. Kim neyden korkuyor?",
    minutes: 4,
    gloss: [
      { de: "sich fürchten", tr: "korkmak", en: "to be afraid" },
      { de: "die Sicherheit", tr: "güvenlik", en: "security" },
      { de: "das Risiko", tr: "risk", en: "risk" },
      { de: "ernsthaft", tr: "ciddi ciddi", en: "seriously" },
    ],
    segments: [
      { text: "Denkst du manchmal ernsthaft über die nächsten zehn Jahre nach?" },
      { text: "Ständig. Ich fürchte mich vor allem vor dem Geld." },
      { text: "Wovor genau? Du hast doch eine sichere Stelle." },
      { text: "Sicherheit gibt es nicht mehr so wie früher. Das weiß jeder." },
      { text: "Da hast du wohl recht. Mich erschreckt eher die Gesundheit." },
      { text: "Verstehe. Aber das Risiko kann man nicht wegdenken." },
      { text: "Nein. Ich überlege mir trotzdem jeden Herbst einen Plan." },
      { text: "Offenbar hilft dir das. Mir hilft es, nicht zu weit zu schauen." },
    ],
    questions: [
      {
        text: "Wovor fürchtet sich die zweite Person?",
        options: ["Vor dem Geld", "Vor der Gesundheit", "Vor der Arbeit"],
        answer: 0,
        explain: "„Ich fürchte mich vor allem vor dem Geld.“",
      },
      {
        text: "Was erschreckt die erste Person?",
        options: ["Das Geld", "Die Gesundheit", "Die Zukunft der Kinder"],
        answer: 1,
        explain: "„Mich erschreckt eher die Gesundheit.“",
      },
      {
        text: "Was hilft der ersten Person?",
        options: ["Ein Plan", "Nicht zu weit zu schauen", "Mit anderen reden"],
        answer: 1,
        explain: "„Mir hilft es, nicht zu weit zu schauen.“",
      },
      {
        kind: "gapfill",
        text: "Ich überlege ___ trotzdem jeden Herbst einen Plan.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "Nesne var (einen Plan) → dönüşlü zamir Dativ: „mir“.",
      },
      {
        kind: "short_answer",
        text: "Über welchen Zeitraum denkt die erste Person nach?",
        options: [],
        answer: 0,
        accept: ["die nächsten zehn Jahre", "zehn Jahre"],
        explain: "„Denkst du manchmal ernsthaft über die nächsten zehn Jahre nach?“",
      },
    ],
  },
  {
    id: "b1-u24-l2",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "Er hat es endlich gesagt",
    genre: "Arkadaş sohbeti",
    intro: "Bir itiraf anlatılıyor. Ne oldu, nasıl karşılandı?",
    minutes: 4,
    gloss: [
      { de: "gestehen", tr: "itiraf etmek", en: "to confess" },
      { de: "der Mut", tr: "cesaret", en: "courage" },
      { de: "verliebt", tr: "âşık", en: "in love" },
      { de: "lächeln", tr: "gülümsemek", en: "to smile" },
    ],
    segments: [
      { text: "Und? Hat er es gesagt?" },
      { text: "Ja. Nach zwei Jahren hat er endlich gestanden, dass er verliebt ist." },
      { text: "Zwei Jahre! Wo war denn der Mut?" },
      { text: "Er hatte Angst, die Freundschaft zu verlieren." },
      { text: "Verstehe ich. Und sie?" },
      { text: "Sie hat nur gelächelt und gesagt: Das weiß ich seit Monaten." },
      { text: "Also wusste sie es die ganze Zeit?" },
      { text: "Offenbar. Sie kennt ihn eben besser als er sich selbst." },
    ],
    questions: [
      {
        text: "Wie lange hat er gewartet?",
        options: ["Zwei Monate", "Zwei Jahre", "Zwei Wochen"],
        answer: 1,
        explain: "„Nach zwei Jahren hat er endlich gestanden …“",
      },
      {
        text: "Wovor hatte er Angst?",
        options: ["Die Freundschaft zu verlieren", "Vor ihrer Familie", "Vor dem Umzug"],
        answer: 0,
        explain: "„Er hatte Angst, die Freundschaft zu verlieren.“",
      },
      {
        text: "Was hat sie gemacht?",
        options: ["Sie war überrascht", "Sie hat gelächelt und gesagt, sie weiß es längst", "Sie war böse"],
        answer: 1,
        explain: "„Sie hat nur gelächelt und gesagt: Das weiß ich seit Monaten.“",
      },
      {
        kind: "gapfill",
        text: "Sie ___ ihn eben besser als er sich selbst.",
        options: [],
        answer: 0,
        accept: ["kennt"],
        explain: "Kişi için „kennen“; „Das weiß ich“ ise bir OLGU için „wissen“.",
      },
      {
        kind: "short_answer",
        text: "Seit wann wusste sie es?",
        options: [],
        answer: 0,
        accept: ["seit Monaten", "seit einigen Monaten", "Monate"],
        explain: "„Das weiß ich seit Monaten.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u24-w1",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "Eine versäumte Chance",
    genre: "Kişisel yazı",
    intro: "Kaçırdığın bir fırsatı yaz. Nesne varsa dönüşlü zamir Dativ olur.",
    minutes: 8,
    gloss: [
      { de: "versäumen", tr: "kaçırmak", en: "to miss" },
      { de: "ärgerlich", tr: "kızgın", en: "annoyed" },
      { de: "anfangs", tr: "başlangıçta", en: "at first" },
      { de: "nachdenken", tr: "düşünmek", en: "to reflect" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bunu uzun süre düşünmedim.",
        answer: "Ich habe mir das lange nicht überlegt.",
        hint: "Nesne var (das) → mir.",
      },
      {
        kind: "build",
        tr: "Her sonbahar kendime bir plan kuruyorum.",
        answer: "Jeden Herbst überlege ich mir einen Plan.",
        hint: "Yine nesne var → mir.",
      },
      {
        kind: "build",
        tr: "Orada kimseyi tanımıyordum.",
        answer: "Ich kannte dort niemanden.",
        hint: "Kişi → kennen.",
      },
      {
        kind: "form",
        prompt: "Geri dönüş kartını doldur.",
        facts: "Kişi: Sedef Aydın; kaçırılan: yurt dışında bir yıl; ne zaman: 6 yıl önce; sebep: annesi hastaydı; bugün: bilinçli seçim olarak görüyor.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Chance", answer: "ein Jahr im Ausland", accept: ["im Ausland arbeiten", "Ausland"] },
          { label: "Wann", answer: "vor sechs Jahren", accept: ["sechs Jahre", "vor 6 Jahren"] },
          { label: "Grund", answer: "die Mutter war krank", accept: ["die Mutter", "Krankheit der Mutter"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Dönüşlü zamirin hâlini düzelt.",
        source: "Ich habe mich das nicht überlegt und ich wünsche mich mehr Zeit.",
        answer: "Ich habe mir das nicht überlegt und ich wünsche mir mehr Zeit.",
        why: "Türkçede dönüşlülük fiilin içindedir ve hâli yoktur, o yüzden Almancada tek biçim (mich) kullanılıyor. Almanca ayırır: cümlede BAŞKA bir nesne varsa dönüşlü zamir Dativ'e geçer — ich wasche mich, ama ich wasche mir die Hände; ich überlege mir das, ich wünsche mir etwas.",
      },
    ],
  },
  {
    id: "b1-u24-w2",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "Über eine Freundschaft",
    genre: "Betimleme",
    intro: "Uzun bir dostluğu anlat. Türkçe 'bilmek' Almancada ikiye ayrılır.",
    minutes: 12,
    gloss: [
      { de: "die Freundschaft", tr: "dostluk", en: "friendship" },
      { de: "pflegen", tr: "sürdürmek", en: "to maintain" },
      { de: "versprechen", tr: "söz vermek", en: "to promise" },
      { de: "die Ehe", tr: "evlilik", en: "marriage" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "En yakın arkadaşımı yirmi yıldır tanıyorum.",
        answer: "Ich kenne meine beste Freundin seit zwanzig Jahren.",
        hint: "Kişi → kennen.",
      },
      {
        kind: "build",
        tr: "Yeniden aynı şehirde yaşayıp yaşamayacağımızı bilmiyorum.",
        answer: "Ich weiß nicht, ob wir wieder in derselben Stadt leben werden.",
        hint: "Yan cümle → wissen.",
      },
      {
        kind: "free",
        prompt: "Uzun süredir devam eden bir dostluğu anlat: kimi ne zamandan beri tanıyorsun, nasıl tanıştınız, mesafe ya da zaman bu dostluğu nasıl etkiledi, ve onu sürdürmek için ne yapıyorsun. En az bir 'kennen' ve bir 'wissen' cümlesi kullan.",
        checklist: [
          "Kim ve ne zamandan beri — söylenmiş mi?",
          "Tanışma anlatılmış mı?",
          "Mesafenin ya da zamanın etkisi var mı?",
          "Sürdürmek için ne yapıldığı somut mu?",
          "Hem 'kennen' hem 'wissen' doğru kullanılmış mı?",
        ],
        minWords: 70,
        sample:
          "Ich kenne Elif seit zwanzig Jahren. Wir haben uns in der Schule " +
          "kennengelernt, zufällig, weil wir am selben Tisch saßen.\n\n" +
          "Seit sechs Jahren wohnt sie in einer anderen Stadt. Anfangs habe ich " +
          "gedacht, dass die Distanz alles ändert. Heute weiß ich, dass das " +
          "nicht stimmt — aber ich weiß auch, dass es Arbeit ist.\n\n" +
          "Wir schreiben uns fast jede Woche, meistens über nichts Besonderes. " +
          "Zweimal haben wir eine lange Reise versprochen und beide Male " +
          "versäumt. Zwei Tage, die wir wirklich zusammen verbringen, sind " +
          "besser als zwei Wochen, die nie stattfinden.\n\n" +
          "Ich schätze diese Freundschaft sehr. Sie kennt mich besser als " +
          "manche, die zwei Straßen weiter wohnen, und das ist kein Zufall.",
        phrases: [
          { de: "Ich kenne … seit …", tr: "… -den beri tanıyorum.", en: "I have known … for …" },
          { de: "Heute weiß ich, dass …", tr: "Bugün biliyorum ki …", en: "Today I know that …" },
          { de: "Wir haben uns kennengelernt.", tr: "Tanıştık.", en: "We got to know each other." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„bilmek“ fiilini ikiye ayır.",
        source: "Ich weiß ihn seit zehn Jahren, aber ich kenne nicht, wo er wohnt.",
        answer: "Ich kenne ihn seit zehn Jahren, aber ich weiß nicht, wo er wohnt.",
        why: "Türkçe 'bilmek' ikisini de karşıladığı için ayrım hiç görünmüyor ve iki fiil rastgele seçiliyor. Almanca ayırır: KİŞİ, YER ve tanıdık bir şey için kennen (birini/bir yeri tanımak); OLGU, bilgi ve yan cümle için wissen. Kısa kural: kennen'in arkasından bir isim gelir, wissen'in arkasından bir yan cümle.",
      },
    ],
  },
];

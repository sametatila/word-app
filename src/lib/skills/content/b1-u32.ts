import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 32 — "Yer ve zaman" (dersler 125–128).
 *
 * Dersler: Eine Unterkunft suchen · Die Hafenstadt · Berg und Tal ·
 * Den Wohnort wechseln.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   an die ↔ an der  Ünite 26 nesne koymayı çalıştı (stellen/stehen); bu
 *                    ünite aynı ayrımı YER için alıyor. Türkçede 'sahile
 *                    gidiyorum' ile 'sahilde oturuyorum' farkı isim
 *                    ekindedir; Almancada EDATIN HÂLİNDEDİR: yön varsa
 *                    Akkusativ (an die Küste fahren), yer varsa Dativ
 *                    (an der Küste wohnen). Edat aynı kalır, hâl değişir.
 *   in ↔ nach        Türkçe 'iki hafta sonra' der ve şimdiden itibaren mi
 *   (zaman)          yoksa bir olaydan sonra mı olduğunu bağlamdan bırakır.
 *                    Almanca ayırır: ŞİMDİDEN itibaren in zwei Wochen,
 *                    bir olaydan SONRA nach zwei Wochen. 'nach' seçmek
 *                    cümleyi geçmişe çeker.
 *
 * Yeni 32 kelime: die Übernachtung, die Hütte, die Saison, der Tourismus,
 * die Touristin, das Souvenir, die Rundfahrt, die Rückkehr, der Hafen,
 * die Fähre, die Küste, der Sand, der Stein, der Turm, die Burg,
 * das Denkmal, das Gebirge, der Hügel, das Tal, die Wiese, das Gras,
 * der Nebel, der Sturm, die Region, der Wohnort, der Wohnsitz,
 * der Vorort, das Quartier, die Metropole, die Zone, der Kreis, das Eck.
 */
export const b1U32: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u32-r1",
    level: "B1",
    skill: "reading",
    unit: 32,
    title: "Eine Unterkunft in der Saison",
    genre: "Konaklama rehberi",
    intro: "Sezonda yer bulmak. Ne zaman, nerede, ne kadar?",
    minutes: 5,
    gloss: [
      { de: "die Übernachtung", tr: "geceleme", en: "overnight stay" },
      { de: "die Hütte", tr: "dağ evi", en: "hut" },
      { de: "die Saison", tr: "sezon", en: "season" },
      { de: "der Tourismus", tr: "turizm", en: "tourism" },
      { de: "die Rundfahrt", tr: "tur", en: "round trip" },
    ],
    text:
      "In der Saison ist eine Übernachtung an der Küste zweimal so teuer " +
      "wie im Herbst. Wer im Juli an die Küste fährt, sollte drei Monate " +
      "vorher buchen.\n\n" +
      "Günstiger sind Hütten im Gebirge. Sie liegen meistens außerhalb der " +
      "Orte, dafür kostet eine Nacht knapp die Hälfte. Der Tourismus ist " +
      "dort ruhiger, und im Nebel sieht man ohnehin nichts.\n\n" +
      "Wenn Sie nur zwei Tage bleiben, lohnt sich eine Rundfahrt mehr als " +
      "ein festes Quartier. Man schläft dann in einer anderen Region als " +
      "am ersten Abend und sieht mehr.\n\n" +
      "Ein letzter Hinweis: buchen Sie in zwei Wochen, nicht später. " +
      "Die günstigen Zimmer sind dann weg, und was übrig bleibt, kostet " +
      "wieder zweimal so viel.",
    questions: [
      {
        text: "Wie teuer ist eine Übernachtung an der Küste in der Saison?",
        options: ["Zweimal so teuer wie im Herbst", "Viel billiger", "Gleich teuer"],
        answer: 0,
        explain: "„In der Saison ist eine Übernachtung an der Küste zweimal so teuer wie im Herbst.“",
      },
      {
        text: "Was ist günstiger?",
        options: ["Hütten im Gebirge", "Zimmer an der Küste", "Hotels in der Stadt"],
        answer: 0,
        explain: "„Günstiger sind Hütten im Gebirge.“",
      },
      {
        text: "Wann lohnt sich eine Rundfahrt?",
        options: ["Bei zwei Tagen", "Bei zwei Wochen", "Nie"],
        answer: 0,
        explain: "„Wenn Sie nur zwei Tage bleiben, lohnt sich eine Rundfahrt mehr …“",
      },
      {
        kind: "gapfill",
        text: "Wer im Juli ___ ___ Küste fährt, sollte drei Monate vorher buchen.",
        options: [],
        answer: 0,
        accept: ["an die"],
        explain: "Yön var (fahren) → Akkusativ: an die Küste. Kalmak olsaydı „an der“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange vorher soll man für Juli buchen?",
        options: [],
        answer: 0,
        accept: ["drei Monate", "3 Monate", "drei Monate vorher"],
        explain: "„… sollte drei Monate vorher buchen.“",
      },
    ],
  },
  {
    id: "b1-u32-r2",
    level: "B1",
    skill: "reading",
    unit: 32,
    title: "Raus aus der Metropole",
    genre: "Deneyim yazısı",
    intro: "Biri şehirden banliyöye taşınmış. Ne kazandı, ne kaybetti?",
    minutes: 5,
    gloss: [
      { de: "die Metropole", tr: "büyük şehir", en: "metropolis" },
      { de: "der Vorort", tr: "banliyö", en: "suburb" },
      { de: "der Wohnort", tr: "ikamet yeri", en: "place of residence" },
      { de: "die Rückkehr", tr: "geri dönüş", en: "return" },
      { de: "die Region", tr: "bölge", en: "region" },
    ],
    text:
      "Vor drei Jahren sind wir aus der Metropole in einen Vorort gezogen. " +
      "Der Weg zur Arbeit ist seitdem länger, alles andere ist besser.\n\n" +
      "Wir wohnen jetzt am Rand einer Wiese, mit Blick auf einen Hügel. " +
      "Die Miete ist um vierzig Prozent billiger, und für das gleiche Geld " +
      "haben wir zwei Zimmer mehr. Nach zwei Wochen war das für mich " +
      "normal und ich wollte nicht mehr zurück.\n\n" +
      "Was fehlt, ist die Auswahl. In der Metropole gibt es abends alles, " +
      "hier schließt um acht der letzte Laden. Wer das braucht, wird in " +
      "einem Vorort nicht glücklich.\n\n" +
      "Eine Rückkehr in die alte Region planen wir nicht. Aber ich verstehe " +
      "jeden, der bleibt: " +
      "der Wohnort ist keine Frage von richtig und falsch, sondern davon, " +
      "was einem am Abend fehlt.",
    questions: [
      {
        text: "Wann ist die Familie gezogen?",
        options: ["Vor drei Jahren", "Vor zwei Wochen", "Letztes Jahr"],
        answer: 0,
        explain: "„Vor drei Jahren sind wir aus der Metropole in einen Vorort gezogen.“",
      },
      {
        text: "Was ist schlechter geworden?",
        options: ["Die Miete", "Der Weg zur Arbeit", "Die Wohnung"],
        answer: 1,
        explain: "„Der Weg zur Arbeit ist seitdem länger, alles andere ist besser.“",
      },
      {
        text: "Was fehlt im Vorort?",
        options: ["Die Auswahl am Abend", "Der Platz", "Die Ruhe"],
        answer: 0,
        explain: "„Was fehlt, ist die Auswahl. In der Metropole gibt es abends alles …“",
      },
      {
        kind: "gapfill",
        text: "___ zwei Wochen war das für mich normal.",
        options: [],
        answer: 0,
        accept: ["Nach"],
        explain: "Bir olaydan SONRA geçen süre → nach. Şimdiden itibaren olsaydı „in“.",
      },
      {
        kind: "short_answer",
        text: "Um wie viel ist die Miete billiger?",
        options: [],
        answer: 0,
        accept: ["um vierzig Prozent", "vierzig Prozent", "40 Prozent"],
        explain: "„Die Miete ist um vierzig Prozent billiger …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u32-l1",
    level: "B1",
    skill: "listening",
    unit: 32,
    title: "Im Hafen",
    genre: "Liman konuşması",
    intro: "Bir liman gezisi planlanıyor. Feribot ne zaman, nereye?",
    minutes: 4,
    gloss: [
      { de: "der Hafen", tr: "liman", en: "harbour" },
      { de: "die Fähre", tr: "feribot", en: "ferry" },
      { de: "der Turm", tr: "kule", en: "tower" },
      { de: "das Denkmal", tr: "anıt", en: "monument" },
    ],
    segments: [
      { text: "Die Fähre fährt um zehn. Sollen wir vorher an den Hafen gehen?" },
      { text: "Gern. Am Hafen gibt es diesen alten Turm." },
      { text: "Den kenne ich noch nicht. Kann man nach oben?" },
      { text: "Ja, aber nur bis zwölf. Danach macht er zu." },
      { text: "Dann zuerst der Turm, dann das Denkmal am Wasser." },
      { text: "Und die Burg? Die liegt auf dem Hügel über der Stadt." },
      { text: "Dafür reicht die Zeit nicht. In zwei Wochen komme ich wieder." },
      { text: "Gut. Dann gehen wir jetzt an die Küste und essen dort." },
    ],
    questions: [
      {
        text: "Wann fährt die Fähre?",
        options: ["Um zehn", "Um zwölf", "Um acht"],
        answer: 0,
        explain: "„Die Fähre fährt um zehn.“",
      },
      {
        text: "Bis wann kann man auf den Turm?",
        options: ["Bis zehn", "Bis zwölf", "Den ganzen Tag"],
        answer: 1,
        explain: "„Ja, aber nur bis zwölf. Danach macht er zu.“",
      },
      {
        text: "Warum sehen sie die Burg nicht?",
        options: ["Sie ist zu", "Die Zeit reicht nicht", "Sie ist zu weit"],
        answer: 1,
        explain: "„Dafür reicht die Zeit nicht.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ Wochen komme ich wieder.",
        options: [],
        answer: 0,
        accept: ["In zwei"],
        explain: "Şimdiden itibaren gelecek bir zaman → „in zwei Wochen“.",
      },
      {
        kind: "short_answer",
        text: "Wo liegt die Burg?",
        options: [],
        answer: 0,
        accept: ["auf dem Hügel", "auf einem Hügel", "über der Stadt"],
        explain: "„Die liegt auf dem Hügel über der Stadt.“",
      },
    ],
  },
  {
    id: "b1-u32-l2",
    level: "B1",
    skill: "listening",
    unit: 32,
    title: "Wetter im Gebirge",
    genre: "Dağ yürüyüşü planı",
    intro: "Dağda hava konuşuluyor. Ne bekleniyor, ne yapılıyor?",
    minutes: 4,
    gloss: [
      { de: "das Gebirge", tr: "sıradağ", en: "mountains" },
      { de: "das Tal", tr: "vadi", en: "valley" },
      { de: "der Nebel", tr: "sis", en: "fog" },
      { de: "der Sturm", tr: "fırtına", en: "storm" },
    ],
    segments: [
      { text: "Im Gebirge kann das Wetter in einer Stunde umschlagen." },
      { text: "Heute soll es aber ruhig bleiben, oder?" },
      { text: "Am Vormittag ja. Ab drei kommt Nebel, vielleicht sogar Sturm." },
      { text: "Dann gehen wir früh los und sind um zwei wieder im Tal." },
      { text: "Genau. Und wir bleiben auf dem Weg, nicht auf der Wiese." },
      { text: "Klar. Im Nebel findet man auf dem Gras keine Spur mehr." },
      { text: "Ich nehme trotzdem die Jacke mit. Oben ist es immer kälter." },
      { text: "Gute Idee. In zwei Stunden sind wir oben, wenn es gut läuft." },
    ],
    questions: [
      {
        text: "Wann kommt der Nebel?",
        options: ["Am Vormittag", "Ab drei", "Am Abend"],
        answer: 1,
        explain: "„Am Vormittag ja. Ab drei kommt Nebel, vielleicht sogar Sturm.“",
      },
      {
        text: "Wann wollen sie wieder im Tal sein?",
        options: ["Um zwei", "Um drei", "Um fünf"],
        answer: 0,
        explain: "„Dann gehen wir früh los und sind um zwei wieder im Tal.“",
      },
      {
        text: "Warum bleiben sie auf dem Weg?",
        options: ["Im Nebel findet man auf dem Gras keine Spur", "Die Wiese ist gesperrt", "Es ist verboten"],
        answer: 0,
        explain: "„Im Nebel findet man auf dem Gras keine Spur mehr.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ Stunden sind wir oben, wenn es gut läuft.",
        options: [],
        answer: 0,
        accept: ["In zwei"],
        explain: "Şimdiden itibaren → in zwei Stunden.",
      },
      {
        kind: "short_answer",
        text: "Was nimmt die Person trotzdem mit?",
        options: [],
        answer: 0,
        accept: ["die Jacke", "eine Jacke", "Jacke"],
        explain: "„Ich nehme trotzdem die Jacke mit.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u32-w1",
    level: "B1",
    skill: "writing",
    unit: 32,
    title: "Wo wir waren",
    genre: "Gezi anlatısı",
    intro: "Bir geziyi anlat. Aynı edat, yön ve yer için farklı hâl alır.",
    minutes: 8,
    gloss: [
      { de: "die Küste", tr: "sahil", en: "coast" },
      { de: "der Sand", tr: "kum", en: "sand" },
      { de: "die Burg", tr: "kale", en: "castle" },
      { de: "der Hügel", tr: "tepe", en: "hill" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Temmuzda sahile gittik.",
        answer: "Im Juli sind wir an die Küste gefahren.",
        hint: "Yön → Akkusativ: an die Küste.",
      },
      {
        kind: "build",
        tr: "Bir hafta sahilde kaldık.",
        answer: "Eine Woche haben wir an der Küste gewohnt.",
        hint: "Yer → Dativ: an der Küste.",
      },
      {
        kind: "build",
        tr: "Kale şehrin üstündeki tepede duruyor.",
        answer: "Die Burg steht auf dem Hügel über der Stadt.",
        hint: "Durum → Dativ: auf dem Hügel.",
      },
      {
        kind: "form",
        prompt: "Gezi kartını doldur.",
        facts: "Ay: temmuz; yer: sahil; konaklama: dağ evi; gezilen: kule ve anıt; ulaşım: feribot.",
        fields: [
          { label: "Monat", answer: "Juli", accept: ["im Juli"] },
          { label: "Ort", answer: "an der Küste", accept: ["Küste", "die Küste"] },
          { label: "Unterkunft", answer: "eine Hütte", accept: ["Hütte", "in einer Hütte"] },
          { label: "Gesehen", answer: "Turm und Denkmal", accept: ["der Turm", "Turm, Denkmal"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Edatın hâlini yön ve yere göre düzelt.",
        source: "Wir fahren an der Küste und wohnen an die Küste.",
        answer: "Wir fahren an die Küste und wohnen an der Küste.",
        why: "Türkçede 'sahile gitmek' ile 'sahilde kalmak' farkı İSİM EKİNDEDİR, o yüzden Almancada edat aynı kalınca fark yok sanılıyor. Almancada fark EDATIN HÂLİNDEDİR: yön varsa Akkusativ (an die Küste fahren), yer varsa Dativ (an der Küste wohnen). Aynı kural an, auf, in, über, unter, vor, hinter, neben, zwischen için geçerli.",
      },
    ],
  },
  {
    id: "b1-u32-w2",
    level: "B1",
    skill: "writing",
    unit: 32,
    title: "Wir ziehen um",
    genre: "Taşınma duyurusu",
    intro: "Taşınmanı duyur. 'sonra' Almancada iki ayrı sözcüktür.",
    minutes: 12,
    gloss: [
      { de: "der Wohnsitz", tr: "ikametgâh", en: "residence" },
      { de: "das Quartier", tr: "semt", en: "quarter" },
      { de: "der Vorort", tr: "banliyö", en: "suburb" },
      { de: "die Zone", tr: "bölge", en: "zone" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "İki hafta sonra banliyöye taşınıyoruz.",
        answer: "In zwei Wochen ziehen wir in einen Vorort.",
        hint: "Şimdiden itibaren → in; yön → Akkusativ.",
      },
      {
        kind: "build",
        tr: "Taşındıktan iki hafta sonra bu bana normal geldi.",
        answer: "Nach zwei Wochen war das für mich normal.",
        hint: "Bir olaydan sonra → nach.",
      },
      {
        kind: "free",
        prompt: "Taşındığını ya da taşınacağını duyur: eski ve yeni yer, ne zaman, neden, yeni yerin nesi iyi ve nesi eksik, ve nasıl ulaşılacağı. En az bir 'in + zaman' ve bir 'nach + zaman' kullan.",
        checklist: [
          "Eski ve yeni yer söylenmiş mi?",
          "Tarih net mi?",
          "Sebep verilmiş mi?",
          "Hem iyi hem eksik bir yön var mı?",
          "Hem 'in zwei Wochen' hem 'nach zwei Wochen' türü kullanım var mı?",
        ],
        minWords: 70,
        sample:
          "Liebe alle,\n\n" +
          "in drei Wochen ziehen wir um. Wir verlassen die Metropole und " +
          "gehen in einen Vorort im Norden, etwa zwanzig Minuten mit dem Zug.\n\n" +
          "Der Grund ist einfach: für dasselbe Geld bekommen wir dort zwei " +
          "Zimmer mehr, und die Wohnung liegt am Rand einer Wiese. " +
          "Als wir das erste Mal dort waren, hat es gestürmt — und trotzdem " +
          "wollten wir bleiben.\n\n" +
          "Was fehlen wird, ist die Auswahl am Abend. Hier schließt der " +
          "letzte Laden um acht. Wir haben aber gemerkt: nach zwei Wochen " +
          "in der Region ist das ganz normal. Das Quartier ist ruhig und die ganze Zone gehört zur Region.\n\n" +
          "Der neue Wohnsitz steht unten. Kommt uns besuchen, am besten " +
          "im Sommer, wenn man auf dem Hügel sitzen kann.",
        phrases: [
          { de: "In drei Wochen ziehen wir um.", tr: "Üç hafta sonra taşınıyoruz.", en: "We are moving in three weeks." },
          { de: "Nach zwei Wochen ist das normal.", tr: "İki hafta sonra normal geliyor.", en: "After two weeks that is normal." },
          { de: "Kommt uns besuchen.", tr: "Bizi ziyarete gelin.", en: "Come and visit us." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Zaman edatını düzelt.",
        source: "Nach zwei Wochen ziehen wir um, und in zwei Wochen dort war das für mich normal.",
        answer: "In zwei Wochen ziehen wir um, und nach zwei Wochen dort war das für mich normal.",
        why: "Türkçe 'iki hafta sonra' der ve ŞİMDİDEN mi yoksa BİR OLAYDAN sonra mı olduğunu bağlama bırakır, o yüzden Almancada tek edat seçiliyor. Almanca ayırır: şimdiden itibaren gelecek bir an için in zwei Wochen; bir başlangıçtan sonra geçen süre için nach zwei Wochen. Yanlış seçim cümleyi geçmişe ya da geleceğe kaydırır.",
      },
    ],
  },
];

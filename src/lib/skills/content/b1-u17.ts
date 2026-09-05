import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 17 — "Okuduğun, izlediğin, dinlediğin" (dersler 65–68).
 *
 * Dersler: Fake News erkennen · Der Serienabend · Der Buchclub ·
 * Mein Musikgeschmack.
 *
 * Ünitenin dili BEĞENİ bildirmek. İki aktarım hatası tam buraya düşüyor:
 *   gefallen'in öznesi   Türkçede beğenen kişi ÖZNEDİR ('filmi beğendim');
 *                        Almancada beğenilen şey öznedir, kişi Dativ'e
 *                        geçer: "mir gefällt der Film". Aynı kalıp
 *                        schmecken, fehlen, passen için de geçerli ve
 *                        "ich gefalle den Film" en inatçı hatalardan biri.
 *   freuen auf ↔ über    Türkçede tek fiil var ('sevinmek'); Almanca
 *                        zamanı edatla ayırır: GELECEK için auf + Akkusativ,
 *                        OLMUŞ bir şey için über + Akkusativ.
 *
 * Yeni 32 kelime: stammen, die Presse, der Journalist, verdächtig,
 * die Reportage, veröffentlichen, die Kritik, der Kanal, die Folge,
 * die Figur, die Serie, die Heldin, die Fortsetzung, überraschen,
 * die Überraschung, die Stimmung, das Kapitel, der Autor, die Autorin,
 * der Schriftsteller, der Leser, das Gedicht, der Verlag,
 * die Buchhandlung, der Sänger, die Sängerin, der Tanz, die Bühne,
 * der Auftritt, aufführen, die Stimme, wunderschön.
 */
export const b1U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u17-r1",
    level: "B1",
    skill: "reading",
    unit: 17,
    title: "Woher stammt diese Nachricht?",
    genre: "Rehber metin",
    intro: "Bir haberin güvenilir olup olmadığı nasıl anlaşılır? Üç ölçüt.",
    minutes: 5,
    gloss: [
      { de: "der Ton", tr: "üslup", en: "tone" },
      { de: "stammen", tr: "gelmek / kaynaklanmak", en: "to originate" },
      { de: "die Presse", tr: "basın", en: "the press" },
      { de: "verdächtig", tr: "şüpheli", en: "suspicious" },
      { de: "veröffentlichen", tr: "yayımlamak", en: "to publish" },
      { de: "der Kanal", tr: "kanal", en: "channel" },
    ],
    text:
      "Jeden Tag lesen wir Meldungen, von denen wir nicht wissen, woher sie " +
      "stammen. Drei Fragen helfen fast immer.\n\n" +
      "Erstens: Wer hat das veröffentlicht? Eine Zeitung mit Namen und Adresse " +
      "ist etwas anderes als ein Kanal ohne Adresse. Journalisten müssen für " +
      "ihre Arbeit einstehen; ein Konto ohne Namen muss das nicht.\n\n" +
      "Zweitens: Wann ist es entstanden? Alte Bilder werden gern neu " +
      "veröffentlicht. Ein Foto von einer Reportage aus dem Jahr 2019 sagt " +
      "über heute gar nichts.\n\n" +
      "Drittens: Wie ist der Ton? Wer sehr laut schreibt und nur eine Seite " +
      "zeigt, ist verdächtig. Kritik an der Presse ist erlaubt und oft nötig, " +
      "aber wer behauptet, dass alle lügen, will meistens nur, dass niemand " +
      "mehr nachfragt.\n\n" +
      "Am Ende hilft eine einfache Regel: Wenn eine Meldung dich sofort sehr " +
      "ärgert, warte zehn Minuten und suche sie noch einmal.",
    questions: [
      {
        text: "Was ist die erste Frage?",
        options: ["Wer hat es veröffentlicht?", "Wie teuer ist es?", "Wer liest es?"],
        answer: 0,
        explain: "„Erstens: Wer hat das veröffentlicht?“",
      },
      {
        text: "Was sagt der Text über alte Bilder?",
        options: ["Sie sind immer falsch", "Sie werden gern neu veröffentlicht", "Sie sind besser"],
        answer: 1,
        explain: "„Alte Bilder werden gern neu veröffentlicht.“",
      },
      {
        text: "Was ist laut Text verdächtig?",
        options: ["Wer nur eine Seite zeigt", "Wer eine Quelle nennt", "Wer ein Datum nennt"],
        answer: 0,
        explain: "„Wer sehr laut schreibt und nur eine Seite zeigt, ist verdächtig.“",
      },
      {
        kind: "gapfill",
        text: "Wir lesen Meldungen, von denen wir nicht wissen, woher sie ___.",
        options: [],
        answer: 0,
        accept: ["stammen"],
        explain: "„woher etwas stammt“ — kaynağı sormanın kalıbı.",
      },
      {
        kind: "short_answer",
        text: "Was soll man tun, wenn eine Meldung sofort ärgert?",
        options: [],
        answer: 0,
        accept: ["zehn Minuten warten", "warten und noch einmal suchen", "zehn Minuten"],
        explain: "„… warte zehn Minuten und suche sie noch einmal.“",
      },
    ],
  },
  {
    id: "b1-u17-r2",
    level: "B1",
    skill: "reading",
    unit: 17,
    title: "Im Buchclub",
    genre: "Kulüp duyurusu ve yorum",
    intro: "Bir kitap kulübü ve iki okurun yorumu. Kim neyi beğenmiş?",
    minutes: 5,
    gloss: [
      { de: "das Kapitel", tr: "bölüm", en: "chapter" },
      { de: "die Figur", tr: "karakter", en: "character" },
      { de: "die Autorin", tr: "yazar", en: "author", note: "kadın biçimi" },
      { de: "der Leser", tr: "okur", en: "reader" },
      { de: "die Buchhandlung", tr: "kitapçı", en: "bookshop" },
    ],
    text:
      "Unser Buchclub trifft sich jeden ersten Montag in der Buchhandlung am " +
      "Markt. Diesmal lesen wir bis Kapitel zehn. Wer nicht fertig wird, kommt " +
      "trotzdem — es geht ums Reden, nicht ums Schaffen.\n\n" +
      "Kommentar von Sedef: Mir gefällt vor allem die Hauptfigur. Sie ist keine " +
      "Heldin, sie macht ständig Fehler, und genau deshalb glaube ich ihr. " +
      "Die Autorin schreibt einfach, aber nie langweilig.\n\n" +
      "Kommentar von Jonas: Mir gefallen die ersten Kapitel nicht so gut. " +
      "Es passiert wenig, und ich habe zweimal aufgehört. Ab Kapitel sechs " +
      "wurde es besser, das gebe ich zu. Die Stimmung am Ende hat mich " +
      "wirklich überrascht.\n\n" +
      "Nächstes Mal wählen wir ein Gedicht statt eines Romans. Der Verlag " +
      "schickt uns dafür zehn Bücher. Wer eins möchte, sagt bis Freitag " +
      "Bescheid.",
    questions: [
      {
        text: "Wo trifft sich der Buchclub?",
        options: ["In der Buchhandlung am Markt", "In einer Wohnung", "In der Schule"],
        answer: 0,
        explain: "„Unser Buchclub trifft sich jeden ersten Montag in der Buchhandlung am Markt.“",
      },
      {
        text: "Warum glaubt Sedef der Hauptfigur?",
        options: ["Weil sie eine Heldin ist", "Weil sie ständig Fehler macht", "Weil sie klug ist"],
        answer: 1,
        explain: "„Sie ist keine Heldin, sie macht ständig Fehler, und genau deshalb glaube ich ihr.“",
      },
      {
        text: "Ab wann wurde das Buch für Jonas besser?",
        options: ["Ab Kapitel zwei", "Ab Kapitel sechs", "Gar nicht"],
        answer: 1,
        explain: "„Ab Kapitel sechs wurde es besser, das gebe ich zu.“",
      },
      {
        kind: "gapfill",
        text: "___ gefallen die ersten Kapitel nicht so gut.",
        options: [],
        answer: 0,
        accept: ["Mir"],
        explain: "„gefallen“de beğenen kişi DATİV: mir gefallen die Kapitel.",
      },
      {
        kind: "short_answer",
        text: "Was lesen sie nächstes Mal?",
        options: [],
        answer: 0,
        accept: ["ein Gedicht", "Gedicht"],
        explain: "„Nächstes Mal wählen wir ein Gedicht statt eines Romans.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u17-l1",
    level: "B1",
    skill: "listening",
    unit: 17,
    title: "Noch eine Folge?",
    genre: "Dizi akşamı",
    intro: "İki kişi diziyi konuşuyor. Kim devamını bekliyor, kim beklemiyor?",
    minutes: 4,
    gloss: [
      { de: "die Folge", tr: "bölüm", en: "episode" },
      { de: "die Fortsetzung", tr: "devam", en: "sequel" },
      { de: "überraschen", tr: "şaşırtmak", en: "to surprise" },
      { de: "die Stimmung", tr: "atmosfer / hava", en: "mood" },
    ],
    segments: [
      { text: "Und? Wie fandest du die letzte Folge?" },
      { text: "Das Ende hat mich total überrascht. Damit hatte ich nicht gerechnet." },
      { text: "Mir gefällt die Serie immer besser." },
      { text: "Mir auch. Vor allem die Stimmung, alles ist so ruhig und dunkel." },
      { text: "Ich freue mich schon auf die Fortsetzung im Herbst." },
      { text: "Ich weiß nicht. Manchmal ist eine Fortsetzung schlechter." },
      { text: "Kann sein. Aber über diese Überraschung habe ich mich echt gefreut." },
      { text: "Gut, dann schauen wir noch eine Folge. Aber wirklich nur eine." },
    ],
    questions: [
      {
        text: "Was hat die zweite Person überrascht?",
        options: ["Das Ende", "Der Anfang", "Die Musik"],
        answer: 0,
        explain: "„Das Ende hat mich total überrascht.“",
      },
      {
        text: "Was gefällt beiden an der Serie?",
        options: ["Die Stimmung", "Die Länge", "Die Musik"],
        answer: 0,
        explain: "„Vor allem die Stimmung, alles ist so ruhig und dunkel.“",
      },
      {
        text: "Was sagt die zweite Person über Fortsetzungen?",
        options: ["Sie sind immer besser", "Manchmal sind sie schlechter", "Sie sieht nie welche"],
        answer: 1,
        explain: "„Manchmal ist eine Fortsetzung schlechter.“",
      },
      {
        kind: "gapfill",
        text: "Ich freue mich schon ___ die Fortsetzung im Herbst.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "GELECEK bir şey için „sich freuen auf“; olmuş bir şey için „über“.",
      },
      {
        kind: "short_answer",
        text: "Wann kommt die Fortsetzung?",
        options: [],
        answer: 0,
        accept: ["im Herbst", "Herbst"],
        explain: "„Ich freue mich schon auf die Fortsetzung im Herbst.“",
      },
    ],
  },
  {
    id: "b1-u17-l2",
    level: "B1",
    skill: "listening",
    unit: 17,
    title: "Der Auftritt",
    genre: "Konser sonrası",
    intro: "Bir konser konuşuluyor. Kime ne kadar hitap etmiş?",
    minutes: 4,
    gloss: [
      { de: "der Auftritt", tr: "sahne performansı", en: "performance" },
      { de: "die Bühne", tr: "sahne", en: "stage" },
      { de: "die Stimme", tr: "ses", en: "voice" },
      { de: "wunderschön", tr: "harikulade", en: "beautiful" },
    ],
    segments: [
      { text: "Der Auftritt gestern war wunderschön." },
      { text: "Findest du? Mir hat die zweite Sängerin besser gefallen." },
      { text: "Ihre Stimme ist stark, das stimmt. Aber sie stand kaum auf der Bühne." },
      { text: "Das war Absicht, glaube ich. Sie wollte den Tanz zeigen." },
      { text: "Möglich. Mir fehlte trotzdem etwas." },
      { text: "Was denn?" },
      { text: "Ruhe. Alles war laut, von der ersten Minute an." },
      { text: "Dann gefällt dir das nächste Konzert besser. Da wird nur Klavier aufgeführt." },
    ],
    questions: [
      {
        text: "Wer hat der zweiten Person besser gefallen?",
        options: ["Die erste Sängerin", "Die zweite Sängerin", "Der Tänzer"],
        answer: 1,
        explain: "„Mir hat die zweite Sängerin besser gefallen.“",
      },
      {
        text: "Warum stand sie kaum auf der Bühne?",
        options: ["Sie war krank", "Sie wollte den Tanz zeigen", "Es war zu dunkel"],
        answer: 1,
        explain: "„Das war Absicht, glaube ich. Sie wollte den Tanz zeigen.“",
      },
      {
        text: "Was fehlte der ersten Person?",
        options: ["Ruhe", "Musik", "Licht"],
        answer: 0,
        explain: "„Ruhe. Alles war laut, von der ersten Minute an.“",
      },
      {
        kind: "gapfill",
        text: "___ hat die zweite Sängerin besser gefallen.",
        options: [],
        answer: 0,
        accept: ["Mir"],
        explain: "„gefallen“ ve „fehlen“ kişiyi Dativ'e koyar: mir gefällt, mir fehlt.",
      },
      {
        kind: "short_answer",
        text: "Was wird im nächsten Konzert aufgeführt?",
        options: [],
        answer: 0,
        accept: ["nur Klavier", "Klavier"],
        explain: "„Da wird nur Klavier aufgeführt.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u17-w1",
    level: "B1",
    skill: "writing",
    unit: 17,
    title: "Eine Kritik schreiben",
    genre: "Değerlendirme",
    intro: "Bir dizi ya da kitap hakkında yorum yaz. 'gefallen'in öznesine dikkat.",
    minutes: 8,
    gloss: [
      { de: "die Kritik", tr: "eleştiri", en: "review" },
      { de: "die Figur", tr: "karakter", en: "character" },
      { de: "die Serie", tr: "dizi", en: "series" },
      { de: "die Heldin", tr: "kadın kahraman", en: "heroine" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Diziyi, özellikle de kadın kahramanı çok beğendim.",
        answer: "Mir hat die Serie sehr gut gefallen, vor allem die Heldin.",
        alternatives: ["Die Serie hat mir sehr gut gefallen, vor allem die Heldin."],
        hint: "Beğenilen şey ÖZNE, kişi Dativ.",
      },
      {
        kind: "build",
        tr: "İlk bölümleri pek beğenmedim.",
        answer: "Mir haben die ersten Folgen nicht so gut gefallen.",
        hint: "Özne çoğul → haben, gefallen.",
      },
      {
        kind: "build",
        tr: "Bana bir şey eksik geldi, bu yüzden eleştirim kısa.",
        answer: "Mir hat etwas gefehlt, meine Kritik ist deshalb kurz.",
        hint: "„fehlen“ de aynı kalıpta.",
      },
      {
        kind: "form",
        prompt: "Değerlendirme kartını doldur.",
        facts: "Yazan: Sedef Aydın; tür: dizi; beğenilen: ana karakter; beğenilmeyen: ilk bölümler; puan: 4/5.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Art", answer: "Serie", accept: ["eine Serie", "die Serie"] },
          { label: "Gut", answer: "die Hauptfigur", accept: ["Hauptfigur", "die Figur"] },
          { label: "Weniger gut", answer: "die ersten Folgen", accept: ["erste Folgen", "der Anfang"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„gefallen“ cümlesindeki özneyi düzelt.",
        source: "Ich gefalle den Film und ich fehle die Ruhe.",
        answer: "Mir gefällt der Film und mir fehlt die Ruhe.",
        why: "Türkçede beğenen kişi ÖZNEDİR ('filmi beğendim'), o yüzden Almancada da 'ich' özne yapılıyor. Almancada tersidir: beğenilen ŞEY öznedir, kişi Dativ'e geçer. Aynı kalıp fehlen, schmecken, passen, gehören için de geçerli — fiil özneye göre çekilir, kişiye göre değil.",
      },
    ],
  },
  {
    id: "b1-u17-w2",
    level: "B1",
    skill: "writing",
    unit: 17,
    title: "Ein Beitrag für den Buchclub",
    genre: "Kulüp yazısı",
    intro: "Okuduğun kitap hakkında yaz. Sevinç edatını zamana göre seç.",
    minutes: 12,
    gloss: [
      { de: "der Schriftsteller", tr: "yazar", en: "writer" },
      { de: "das Kapitel", tr: "bölüm", en: "chapter" },
      { de: "die Überraschung", tr: "sürpriz", en: "surprise" },
      { de: "der Verlag", tr: "yayınevi", en: "publisher" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Sonbahardaki devamını dört gözle bekliyorum.",
        answer: "Ich freue mich auf die Fortsetzung im Herbst.",
        hint: "Gelecek bir şey → auf.",
      },
      {
        kind: "build",
        tr: "Sondaki sürprize gerçekten sevindim.",
        answer: "Über die Überraschung am Ende habe ich mich wirklich gefreut.",
        alternatives: ["Ich habe mich über die Überraschung am Ende wirklich gefreut."],
        hint: "Olmuş bir şey → über.",
      },
      {
        kind: "free",
        prompt: "Okuduğun ya da izlediğin bir şey hakkında kulüp yazısı yaz: adı ve türü, konusu kısaca, neyi beğendiğin ve neyi beğenmediğin (gefallen kalıbıyla), ve başkalarına önerip önermediğin. En az bir 'freuen auf' ya da 'freuen über' cümlesi kullan.",
        checklist: [
          "Ad ve tür söylenmiş mi?",
          "Konu kısaca anlatılmış mı?",
          "Beğeni 'gefallen' kalıbıyla mı yazılmış?",
          "Beğenilmeyen bir yön de var mı?",
          "En az bir 'freuen auf/über' cümlesi var mı?",
        ],
        minWords: 70,
        sample:
          "Ich habe diesen Monat einen Roman gelesen, den mir eine Kollegin " +
          "empfohlen hat.\n\n" +
          "Die Geschichte spielt in einer kleinen Stadt. Die Hauptfigur ist " +
          "keine Heldin: sie macht ständig Fehler und sagt fast nie die Wahrheit. " +
          "Genau das hat mir gefallen, weil sie dadurch echt ist.\n\n" +
          "Die ersten drei Kapitel haben mir nicht so gut gefallen. Es passiert " +
          "wenig, und ich habe zweimal aufgehört. Ab der Mitte wurde es besser, " +
          "und über das Ende habe ich mich richtig gefreut — die Überraschung " +
          "war gut vorbereitet.\n\n" +
          "Der Schriftsteller schreibt einfach, aber nie langweilig. Der Verlag " +
          "bringt im Herbst einen zweiten Teil heraus, und ich freue mich schon " +
          "darauf.\n\n" +
          "Ich empfehle das Buch allen, denen ruhige Geschichten gefallen.",
        phrases: [
          { de: "Mir hat … gefallen.", tr: "… beğendim.", en: "I liked …" },
          { de: "Ich freue mich auf …", tr: "… dört gözle bekliyorum.", en: "I'm looking forward to …" },
          { de: "Ich empfehle es allen, denen …", tr: "… olanlara öneririm.", en: "I recommend it to everyone who …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sevinç edatını zamana göre düzelt.",
        source: "Ich freue mich über die nächste Folge im Herbst.",
        answer: "Ich freue mich auf die nächste Folge im Herbst.",
        why: "Türkçede tek fiil var ('sevinmek') ve zaman ayrımı edatla değil cümleden anlaşılır. Almanca bunu edata yükler: HENÜZ OLMAMIŞ, beklenen bir şey için sich freuen AUF; ZATEN OLMUŞ bir şey için sich freuen ÜBER. İkisi de Akkusativ alır, fark yalnız zamanda.",
      },
    ],
  },
];

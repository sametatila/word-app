import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 19.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 19 gündelik hizmetler hattı: kargo dolabının kullanım rehberi,
 * fotoğrafçıda vesikalık çektirme, baca temizleyicisine randevu değiştirme
 * yazısı.
 * Söyleyiş odağı Almanca ritim: vurgulu hece uzun ve güçlü, arada kalanlar
 * kısa — Türkçenin eşit heceli akışından farkı; dil bilgisi welcher, dieser,
 * jeder — der gibi çekilen soru ve gösterme sözcükleri.
 */
export const deA2P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r19",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Die Paketstation: So geht's",
    genre: "guide",
    intro: "Kargo dolabının kısa kullanım rehberi: nasıl kayıt olunur, paket nasıl alınır, kaç gün bekler, paket nasıl gönderilir.",
    gloss: [
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "eingeben", tr: "girmek", en: "to enter" },
      { de: "der Absender", tr: "gönderen", en: "sender" },
      { de: "verschicken", tr: "yollamak", en: "to send" },
      { de: "das Fach", tr: "bölme", en: "compartment" },
      { de: "die Paketmarke", tr: "kargo etiketi", en: "shipping label" },
    ],
    minutes: 5,
    text:
      "Keine Zeit für die Post? An der Paketstation holen Sie Ihre Pakete ab, wann Sie wollen: " +
      "auch nachts und am Sonntag.\n\n" +
      "So funktioniert es: Melden Sie sich einmal kostenlos in unserer App an. Sie bekommen dann eine Kundennummer. " +
      "Wenn Sie im Internet etwas bestellen, schreiben Sie als Adresse Ihren Namen, Ihre Kundennummer und die Nummer " +
      "der Paketstation.\n\n" +
      "Wenn das Paket da ist, bekommen Sie eine Nachricht mit einem Code aufs Handy. Geben Sie den Code am " +
      "Bildschirm ein. Eine Tür geht auf, und Sie nehmen Ihr Paket heraus.\n\n" +
      "Wichtig: Das Paket bleibt sieben Tage in der Station. Danach geht es zurück an den Absender.\n\n" +
      "Sie können hier auch Pakete verschicken: Kleben Sie die Paketmarke auf das Paket, halten Sie sie vor den " +
      "Bildschirm und legen Sie das Paket in ein freies Fach.\n\n" +
      "Probleme? Unsere Hotline hilft Ihnen jeden Tag von 7 bis 22 Uhr.",
    questions: [
      {
        text: "Was ist der Vorteil der Paketstation?",
        options: [
          "Die Pakete sind billiger.",
          "Man kann Pakete zu jeder Zeit abholen.",
          "Die Pakete kommen direkt nach Hause.",
        ],
        answer: 1,
        explain: "„holen Sie Ihre Pakete ab, wann Sie wollen: auch nachts und am Sonntag“.",
      },
      {
        text: "Was bekommt man, wenn das Paket da ist?",
        options: ["eine Nachricht mit einem Code", "einen Brief von der Post", "einen Anruf vom Absender"],
        answer: 0,
        explain: "„bekommen Sie eine Nachricht mit einem Code aufs Handy“.",
      },
      {
        kind: "truefalse",
        text: "Für die Anmeldung muss man bezahlen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Melden Sie sich einmal kostenlos in unserer App an.“",
      },
      {
        kind: "gapfill",
        text: "Das Paket bleibt ___ Tage in der Station.",
        options: [],
        answer: 0,
        accept: ["sieben", "7"],
        explain: "„Das Paket bleibt sieben Tage in der Station.“",
      },
      {
        kind: "short_answer",
        text: "Wohin geht das Paket nach sieben Tagen?",
        options: [],
        answer: 0,
        accept: ["zurück an den Absender", "an den Absender", "zum Absender", "zurück"],
        explain: "„Danach geht es zurück an den Absender.“",
      },
      {
        text: "Wann hilft die Hotline?",
        options: ["nur am Wochenende", "Tag und Nacht", "jeden Tag von 7 bis 22 Uhr"],
        answer: 2,
        explain: "„Unsere Hotline hilft Ihnen jeden Tag von 7 bis 22 Uhr.“ Gece açık olan dolap, yardım hattı değil.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l19",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Passfotos im Fotostudio",
    genre: "dialogue",
    intro: "Bir kadın yeni kimlik kartı için fotoğrafçıda vesikalık çektiriyor: çekimde nelere dikkat ediliyor, hangi fotoğraf seçiliyor, ne kadar tutuyor ve belediyeye ne götürülecek.",
    gloss: [
      { de: "das Passfoto", tr: "vesikalık fotoğraf", en: "passport photo" },
      { de: "der Personalausweis", tr: "kimlik kartı", en: "ID card" },
      { de: "die Brille", tr: "gözlük", en: "glasses" },
      { de: "ernst", tr: "ciddi", en: "serious" },
      { de: "der Zettel", tr: "kâğıt", en: "slip" },
      { de: "das Amt", tr: "resmî daire", en: "office" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Aksoy", text: "Guten Tag. Ich brauche Passfotos für einen neuen Personalausweis. Geht das gleich, oder brauche ich einen Termin?" },
      { speaker: "Herr Lorenz", text: "Das geht gleich. Setzen Sie sich bitte auf diesen Stuhl vor der weißen Wand. Und die Brille nehmen Sie bitte ab." },
      { speaker: "Frau Aksoy", text: "Muss ich auch die Ohrringe abnehmen? Und darf ich lächeln?" },
      { speaker: "Herr Lorenz", text: "Die Ohrringe dürfen Sie tragen. Aber bitte nicht lächeln, der Mund bleibt zu. Schauen Sie gerade in die Kamera." },
      { speaker: "Frau Aksoy", text: "Das ist gar nicht so leicht. Auf jedem Passfoto sehe ich so ernst aus." },
      { speaker: "Herr Lorenz", text: "Das sagt fast jeder Kunde. So, ich habe drei Fotos gemacht. Welches nehmen wir? Bei diesem hier sind Ihre Augen fast zu." },
      { speaker: "Frau Aksoy", text: "Dann lieber das dritte. Auf diesem sehe ich am freundlichsten aus. Was kostet das?" },
      { speaker: "Herr Lorenz", text: "Vier Fotos auf Papier und die digitale Version kosten zusammen vierzehn Euro. Das Amt nimmt nämlich nur noch digitale Fotos." },
      { speaker: "Frau Aksoy", text: "Und welche Fotos gebe ich dann im Bürgeramt ab?" },
      { speaker: "Herr Lorenz", text: "Gar keine. Wir schicken das Foto online an das Amt. Sie bekommen diesen Zettel mit einem Code. Bringen Sie ihn bitte zum Termin mit, dann findet das Amt Ihr Foto." },
    ],
    questions: [
      {
        text: "Was muss Frau Aksoy vor dem Foto abnehmen?",
        options: ["die Ohrringe", "die Brille", "die Jacke"],
        answer: 1,
        explain: "Fotoğrafçı „die Brille nehmen Sie bitte ab“ diyor; küpeler için „Die Ohrringe dürfen Sie tragen.“",
      },
      {
        text: "Welches Foto nimmt Frau Aksoy?",
        options: ["das erste", "das zweite", "das dritte"],
        answer: 2,
        explain: "„Dann lieber das dritte. Auf diesem sehe ich am freundlichsten aus.“",
      },
      {
        kind: "truefalse",
        text: "Auf dem Passfoto darf Frau Aksoy lächeln.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Fotoğrafçı „Aber bitte nicht lächeln, der Mund bleibt zu“ diyor.",
      },
      {
        kind: "gapfill",
        text: "Die Fotos und die digitale Version kosten zusammen ___ Euro.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„Vier Fotos auf Papier und die digitale Version kosten zusammen vierzehn Euro.“",
      },
      {
        kind: "short_answer",
        text: "Was soll Frau Aksoy zum Termin im Bürgeramt mitbringen?",
        options: [],
        answer: 0,
        accept: ["den Zettel", "Zettel", "den Zettel mit dem Code", "den Code", "einen Zettel mit einem Code"],
        explain: "„Sie bekommen diesen Zettel mit einem Code. Bringen Sie ihn bitte zum Termin mit.“",
      },
      {
        text: "Wozu ist der Code?",
        options: ["Das Amt findet damit ihr Foto.", "Sie bezahlt damit weniger.", "Sie bestellt damit neue Fotos."],
        answer: 0,
        explain: "Fotoğraf internetten daireye gidiyor; kod getirilirse „dann findet das Amt Ihr Foto“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w19",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Ein neuer Termin für den Schornsteinfeger",
    genre: "formal",
    intro: "Baca temizleyicisi geleceği günü bildirdi ama o gün evde değilsin: önce iki cümle kur, sonra yeni bir zaman öneren kısa bir yazı yaz.",
    gloss: [
      { de: "der Schornsteinfeger", tr: "baca temizleyicisi", en: "chimney sweep" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "die Fortbildung", tr: "mesleki eğitim", en: "training course" },
      { de: "der Vormittag", tr: "öğleden önce", en: "morning" },
      { de: "das Erdgeschoss", tr: "zemin kat", en: "ground floor" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "O gün maalesef evde değilim.",
        answer: "An diesem Tag bin ich leider nicht zu Hause.",
        alternatives: ["Ich bin an diesem Tag leider nicht zu Hause."],
        hint: "Zaman öbeği başa gelince fiil (bin) ikinci sırada kalır, özne arkasına geçer.",
      },
      {
        kind: "build",
        tr: "Gelecek hafta her sabah vaktim var.",
        answer: "Nächste Woche habe ich jeden Vormittag Zeit.",
        alternatives: ["Ich habe nächste Woche jeden Vormittag Zeit."],
        hint: "„jeden Vormittag“ Akkusativ'de bir zaman bildirir: der Vormittag → jeden.",
      },
      {
        kind: "free",
        prompt:
          "Posta kutuna baca temizleyicisinden bir not geldi: 12 Mart'ta saat 9 ile 12 arasında dairene gelecek. O gün evde olamayacaksın. Ona yaz: notu aldığını söyle, neden evde olmadığını açıkla, iki yeni zaman öner, anahtarı bir komşuya bırakma seçeneğini söyle ve telefon numaranı ver.",
        checklist: [
          "Notu aldığını ve verilen tarihi yaz",
          "O gün neden evde olmadığını açıkla",
          "İki yeni zaman öner",
          "Komşu seçeneğini ve telefon numaranı yaz",
        ],
        minWords: 50,
        phrases: [
          { de: "Vielen Dank für Ihre Nachricht.", tr: "Notunuz için çok teşekkürler.", en: "Thank you for your message." },
          { de: "An diesem Tag bin ich leider nicht zu Hause.", tr: "O gün maalesef evde değilim.", en: "Unfortunately I'm not at home that day." },
          { de: "Passt Ihnen vielleicht der …?", tr: "… size uyar mı?", en: "Would … suit you?" },
          { de: "Ich kann den Schlüssel bei … lassen.", tr: "Anahtarı …'a bırakabilirim.", en: "I can leave the key with …" },
          { de: "Bitte rufen Sie mich kurz an.", tr: "Lütfen beni kısaca arayın.", en: "Please give me a quick call." },
        ],
        sample:
          "Sehr geehrter Herr Hofmann,\n\n" +
          "vielen Dank für Ihre Nachricht im Briefkasten. Sie möchten am 12. März zwischen 9 und 12 Uhr zu mir kommen. " +
          "An diesem Tag bin ich leider nicht zu Hause, weil ich eine Fortbildung in Stuttgart habe. " +
          "Nächste Woche habe ich jeden Vormittag Zeit. Passt Ihnen vielleicht der Dienstag oder der Donnerstag ab 8 Uhr? " +
          "Wenn das nicht geht, kann ich den Schlüssel auch bei meiner Nachbarin, Frau Schulz, im Erdgeschoss lassen. " +
          "Bitte rufen Sie mich kurz an: 0170 2468135.\n\n" +
          "Mit freundlichen Grüßen\nAli Demir",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s19",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Lang und kurz: der deutsche Rhythmus",
    genre: "pronounce",
    intro: "Türkçede her hece aşağı yukarı aynı uzunluktadır; Almancada vurgulu heceler uzun ve güçlü, arada kalanlar kısa ve hızlıdır. Altı cümlede bu ritmi kur.",
    gloss: [
      { de: "morgen", tr: "yarın", en: "tomorrow" },
      { de: "das Geschenk", tr: "hediye", en: "gift" },
      { de: "gerade", tr: "az önce", en: "just" },
      { de: "abfahren", tr: "kalkmak", en: "to depart" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Wir fahren morgen nach Berlin.",
        tr: "Yarın Berlin'e gidiyoruz.",
        hint: "Üç vuruş: FAH-ren, MOR-gen, ber-LİN. „wir“, „-ren“, „-gen“, „nach“ kısa ve hafif geçer.",
        confusions: [
          {
            heard: [],
            fix: "Heceleri eşit uzunlukta sayarsan cümle kesik kesik duyulur; vurgulu heceleri uzat, ötekileri kısalt.",
            expected: "morgen",
          },
        ],
      },
      {
        de: "Das ist ein Geschenk für meine Mutter.",
        tr: "Bu annem için bir hediye.",
        hint: "Vuruşlar: ge-SCHENK ve MUT-ter. „das ist ein“ tek nefeste, hızlıca.",
        confusions: [
          {
            heard: [],
            fix: "„das ist ein“ gibi küçük kelimeleri tek tek vurgulama; hepsi bir sonraki vurguya koşar.",
            expected: "Geschenk",
          },
        ],
      },
      {
        de: "Ich habe es dir gestern gesagt.",
        tr: "Bunu sana dün söyledim.",
        hint: "İki güçlü vuruş: GES-tern ve ge-SAGT. „ich habe es dir“ kısa bir yürüyüş gibi.",
        confusions: [
          {
            heard: [],
            fix: "Yardımcı fiili ve zamirleri uzatma; ağırlık zaman kelimesinde ve ortaçta.",
            expected: "gestern",
          },
        ],
      },
      {
        de: "Kannst du mir bitte helfen?",
        tr: "Bana yardım edebilir misin lütfen?",
        hint: "Vuruşlar: BİT-te ve HEL-fen. „kannst du mir“ hızlı ve alçak başlar.",
        confusions: [
          {
            heard: [],
            fix: "Her kelimeyi ayrı ayrı basarsan cümle sert duyulur; ilk üç kelimeyi kaynaştır.",
            expected: "helfen",
          },
        ],
      },
      {
        de: "Der Zug ist gerade abgefahren.",
        tr: "Tren az önce kalktı.",
        hint: "Vuruşlar: ZUK, ge-RAA-de, AB-ge-fah-ren. abgefahren'de yalnız ab vurgulu, kalan üç hece kısa.",
        confusions: [
          {
            heard: [],
            fix: "abgefahren'in dört hecesini eşit söyleme; ab güçlü, -ge-fah-ren hızlı ve hafif.",
            expected: "abgefahren",
          },
        ],
      },
      {
        de: "Am Wochenende besuchen wir die Großeltern.",
        tr: "Hafta sonu büyükannemle büyükbabamı ziyaret ediyoruz.",
        hint: "Üç ana vuruş: WO-chen-en-de, be-SUU-chen, GROSS-el-tern. Aradaki heceler sıkışır.",
        confusions: [
          {
            heard: [],
            fix: "Uzun kelimelerde yalnız bir hece öne çıkar; geri kalanını kısaltmazsan cümle çok uzar.",
            expected: "besuchen",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g19",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Welcher? — Dieser!",
    genre: "grammar",
    intro: "„hangi“, „bu“ ve „her“ Almancada tek biçimli değildir: welcher, dieser ve jeder isme göre der, die, das'ın eklerini alır.",
    focus: "welcher, dieser, jeder: der-ekleriyle çekilen soru ve gösterme sözcükleri",
    gloss: [
      { de: "welcher", tr: "hangi", en: "which" },
      { de: "dieser", tr: "bu", en: "this" },
      { de: "jeder", tr: "her", en: "every" },
      { de: "das Zimmer", tr: "oda", en: "room" },
      { de: "die Jacke", tr: "ceket", en: "jacket" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "welcher? — hangi?",
        tr: "welcher, der'in eklerini alır: eril welcher (Akkusativ: welchen), dişil ve çoğul welche, nötr welches. Türkçede „hangi“ hiç değişmez; Almancada ismin cinsine ve hâline bakılır.",
        examples: [
          { de: "Welcher Bus fährt zum Bahnhof?", tr: "Hangi otobüs gara gidiyor?", note: "der Bus → welcher" },
          { de: "Welche Jacke nimmst du?", tr: "Hangi ceketi alıyorsun?", note: "die Jacke → welche" },
          { de: "Welchen Film möchtest du sehen?", tr: "Hangi filmi izlemek istiyorsun?", note: "Akkusativ: welchen" },
        ],
      },
      {
        heading: "dieser — bu",
        tr: "dieser aynı ekleri alır: dieser, diese, dieses, Akkusativ'de eril diesen. Bir şeyi gösterirken ya da „bu yıl, bu hafta“ derken kullanılır.",
        examples: [
          { de: "Dieser Käse ist sehr gut.", tr: "Bu peynir çok güzel.", note: "der Käse → dieser" },
          { de: "Dieses Jahr fahren wir nicht weg.", tr: "Bu yıl bir yere gitmiyoruz.", note: "das Jahr → dieses" },
          { de: "Kennst du diesen Mann?", tr: "Bu adamı tanıyor musun?", note: "Akkusativ: diesen" },
        ],
      },
      {
        heading: "jeder — her",
        tr: "jeder de aynı ekleri alır ama yalnız TEKİL isimle kullanılır: jeder Kurs, jede Woche, jedes Kind. Çoğul için „alle“ gerekir. Zaman bildirirken Akkusativ'dedir: jeden Morgen.",
        examples: [
          { de: "Jeder Kurs dauert zehn Wochen.", tr: "Her kurs on hafta sürüyor.", note: "der Kurs → jeder" },
          { de: "Jede Woche rufe ich meine Mutter an.", tr: "Her hafta annemi arıyorum.", note: "die Woche → jede" },
          { de: "Ich jogge jeden Morgen im Park.", tr: "Her sabah parkta koşuyorum.", note: "Akkusativ: jeden" },
        ],
      },
    ],
    questions: [
      {
        text: "___ Bus fährt zum Bahnhof?",
        options: ["Welche", "Welcher", "Welches"],
        answer: 1,
        explain: "der Bus eril ve özne: welcher.",
      },
      {
        text: "Ich nehme ___ Schuhe hier.",
        options: ["dieser", "dieses", "diese"],
        answer: 2,
        explain: "Schuhe çoğul: diese.",
      },
      {
        text: "Ich jogge ___ Morgen im Park.",
        options: ["jeden", "jeder", "jedes"],
        answer: 0,
        explain: "der Morgen bir zaman bildiriyor ve Akkusativ'de: jeden Morgen.",
      },
      {
        kind: "gapfill",
        text: "___ Film möchtest du sehen? (welch-, der Film)",
        options: [],
        answer: 0,
        accept: ["Welchen", "welchen"],
        explain: "Film nesne, yani Akkusativ; eril Akkusativ eki -en: welchen.",
      },
      {
        kind: "gapfill",
        text: "___ Jahr fahren wir nicht weg. (dies-, das Jahr)",
        options: [],
        answer: 0,
        accept: ["Dieses", "dieses"],
        explain: "das Jahr nötr: dieses, das'taki -s gibi.",
      },
      {
        kind: "gapfill",
        text: "Kennst du ___ Mann dort? (dies-, der Mann)",
        options: [],
        answer: 0,
        accept: ["diesen"],
        explain: "Mann nesne ve eril: den → diesen.",
      },
      {
        kind: "gapfill",
        text: "___ Woche rufe ich meine Mutter an. (jed-, die Woche)",
        options: [],
        answer: 0,
        accept: ["Jede", "jede"],
        explain: "die Woche dişil: jede.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Welches", "Zimmer", "ist", "noch", "frei"],
        explain: "Soru sözcüğü ismiyle birlikte başta (welches Zimmer), fiil ikinci sırada.",
      },
      {
        kind: "truefalse",
        text: "„Dieser Käse schmeckt mir sehr gut.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "der Käse eril ve özne: dieser. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Jede Kinder bekommen ein Eis.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "jeder yalnız tekille kullanılır: „Jedes Kind bekommt ein Eis.“ Çoğulda „Alle Kinder …“.",
      },
    ],
  },
];

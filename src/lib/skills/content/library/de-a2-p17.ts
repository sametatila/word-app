import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 17.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 17 kültür hattı: „Müzeler Gecesi“ programı, tiyatro gişesinde bilet
 * alma, gidilen bir konseri arkadaşa anlatan e-posta. Söyleyiş odağı emir
 * cümlesinin ezgisi — rica ile emri ayıran bitte, mal, doch ve yumuşak düşüş;
 * dil bilgisi belgisiz zamirler: man, jemand, niemand, etwas, nichts, alles.
 */
export const deA2P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r17",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Lange Nacht der Museen",
    genre: "info",
    intro: "Şehrin müzeler gecesi programı: bilet ne kadar, müzeler arasında nasıl gidilir, hangi müzede ne var.",
    gloss: [
      { de: "ermäßigt", tr: "indirimli", en: "reduced" },
      { de: "ausprobieren", tr: "denemek", en: "to try out" },
      { de: "der Mond", tr: "ay", en: "moon" },
      { de: "die Kasse", tr: "gişe", en: "ticket office" },
      { de: "die Schlange", tr: "kuyruk", en: "line" },
      { de: "die Mitternacht", tr: "gece yarısı", en: "midnight" },
    ],
    minutes: 5,
    text:
      "Lange Nacht der Museen – Samstag, 14. September, 18 bis 1 Uhr\n\n" +
      "Zwölf Museen in der Stadt öffnen eine Nacht lang ihre Türen. Mit einem Ticket kommen Sie in alle Häuser. " +
      "Das Ticket kostet 15 Euro, ermäßigt 10 Euro. Kinder unter zwölf Jahren zahlen nichts.\n\n" +
      "Zwischen den Museen fahren extra Busse alle zehn Minuten. Sie starten am Rathausplatz. " +
      "Mit dem Ticket fahren Sie kostenlos.\n\n" +
      "Unsere Tipps: Im Stadtmuseum können Kinder bis 21 Uhr alte Spiele ausprobieren. " +
      "Das Naturkundemuseum zeigt um 20 und um 22 Uhr einen Film über den Mond. " +
      "Im Kunsthaus spielt ab 23 Uhr eine Jazzband.\n\n" +
      "Tickets gibt es online und an jeder Museumskasse. Aber Achtung: Am Abend sind die Schlangen an den Kassen " +
      "oft lang. Kaufen Sie Ihr Ticket deshalb am besten vorher im Internet.\n\n" +
      "Im Rathauscafé gibt es bis Mitternacht Suppe und Getränke.",
    questions: [
      {
        text: "Wie viel kostet ein normales Ticket?",
        options: ["15 Euro", "10 Euro", "12 Euro"],
        answer: 0,
        explain: "„Das Ticket kostet 15 Euro, ermäßigt 10 Euro.“",
      },
      {
        text: "Wo kann man Musik hören?",
        options: ["im Stadtmuseum", "im Naturkundemuseum", "im Kunsthaus"],
        answer: 2,
        explain: "„Im Kunsthaus spielt ab 23 Uhr eine Jazzband.“",
      },
      {
        kind: "truefalse",
        text: "Mit dem Ticket fährt man kostenlos mit den Bussen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Mit dem Ticket fahren Sie kostenlos.“",
      },
      {
        kind: "gapfill",
        text: "Die Busse fahren alle ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„fahren extra Busse alle zehn Minuten“.",
      },
      {
        kind: "short_answer",
        text: "Wo starten die Busse?",
        options: [],
        answer: 0,
        accept: ["am Rathausplatz", "Rathausplatz"],
        explain: "„Sie starten am Rathausplatz.“",
      },
      {
        text: "Warum soll man das Ticket vorher kaufen?",
        options: [
          "Im Internet ist es billiger.",
          "An den Kassen wartet man lange.",
          "Die Kassen sind abends geschlossen.",
        ],
        answer: 1,
        explain: "„Am Abend sind die Schlangen an den Kassen oft lang.“ Fiyat iki yolda da aynı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l17",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "An der Theaterkasse",
    genre: "dialogue",
    intro: "Tiyatro gişesinde iki bilet isteniyor: cumartesi dolu, pazar için yer var; koltuk, fiyat ve indirim konuşuluyor.",
    gloss: [
      { de: "ausverkauft", tr: "biletleri tükenmiş", en: "sold out" },
      { de: "die Vorstellung", tr: "gösteri", en: "performance" },
      { de: "der Platz", tr: "yer", en: "seat" },
      { de: "die Reihe", tr: "sıra", en: "row" },
      { de: "die Ermäßigung", tr: "indirim", en: "reduction" },
      { de: "der Schauspieler", tr: "oyuncu", en: "actor" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Selin", text: "Guten Tag, haben Sie noch zwei Karten für Samstagabend?" },
      { speaker: "Frau Rieger", text: "Samstag ist leider ausverkauft. Am Sonntag gibt es aber noch eine Vorstellung um sechzehn Uhr." },
      { speaker: "Selin", text: "Sonntag geht auch. Wo sind noch Plätze frei?" },
      { speaker: "Frau Rieger", text: "Unten gibt es nur noch einzelne Plätze. Zusammen sitzen können Sie oben auf dem Balkon, in Reihe drei." },
      { speaker: "Selin", text: "Sieht man von dort gut?" },
      { speaker: "Frau Rieger", text: "Ja, sehr gut. Man hört die Schauspieler nur manchmal etwas leiser. Die Karte kostet dort zweiundzwanzig Euro." },
      { speaker: "Selin", text: "Meine Freundin studiert noch. Gibt es eine Ermäßigung?" },
      { speaker: "Frau Rieger", text: "Ja, mit Studentenausweis zahlt sie die Hälfte. Den Ausweis muss sie am Eingang zeigen." },
      { speaker: "Selin", text: "Gut, dann nehme ich die zwei. Kann ich mit Karte zahlen?" },
      { speaker: "Frau Rieger", text: "Natürlich. Die Vorstellung dauert zwei Stunden mit Pause. Viel Spaß!" },
    ],
    questions: [
      {
        text: "Warum kauft Selin keine Karten für Samstag?",
        options: ["Sie hat am Samstag keine Zeit.", "Es gibt keine Karten mehr.", "Die Karten sind zu teuer."],
        answer: 1,
        explain: "„Samstag ist leider ausverkauft.“",
      },
      {
        text: "Wo sitzen Selin und ihre Freundin?",
        options: ["unten in Reihe drei", "ganz vorne unten", "oben auf dem Balkon"],
        answer: 2,
        explain: "Aşağıda yalnız tek tük yer var; birlikte oturmak için „oben auf dem Balkon, in Reihe drei“.",
      },
      {
        kind: "truefalse",
        text: "Vom Balkon sieht man schlecht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ja, sehr gut“ — yalnız oyuncular bazen biraz daha kısık duyuluyor.",
      },
      {
        kind: "gapfill",
        text: "Eine Karte auf dem Balkon kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["zweiundzwanzig", "22"],
        explain: "„Die Karte kostet dort zweiundzwanzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Was muss die Freundin am Eingang zeigen?",
        options: [],
        answer: 0,
        accept: ["ihren Studentenausweis", "den Studentenausweis", "Studentenausweis", "den Ausweis"],
        explain: "„Den Ausweis muss sie am Eingang zeigen.“ İndirim öğrenci kimliğiyle.",
      },
      {
        text: "Wie lange dauert die Vorstellung?",
        options: ["zwei Stunden mit Pause", "eine Stunde ohne Pause", "drei Stunden mit Pause"],
        answer: 0,
        explain: "„Die Vorstellung dauert zwei Stunden mit Pause.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w17",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Das Konzert am Samstag",
    genre: "email",
    intro: "Hafta sonu bir konsere gittin: önce iki cümle kur, sonra bir arkadaşına nasıl geçtiğini anlatan bir e-posta yaz.",
    gloss: [
      { de: "das Konzert", tr: "konser", en: "concert" },
      { de: "das Lied", tr: "şarkı", en: "song" },
      { de: "mitsingen", tr: "birlikte şarkı söylemek", en: "to sing along" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "eng", tr: "dar", en: "cramped" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Konser yarım saat geç başladı.",
        answer: "Das Konzert hat eine halbe Stunde später angefangen.",
        alternatives: ["Eine halbe Stunde später hat das Konzert angefangen."],
        hint: "anfangen ayrılabilen bir fiil: Perfekt'te an-ge-fangen ve ortaç cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Bir dahaki sefere sen de gelmelisin!",
        answer: "Nächstes Mal musst du auch mitkommen!",
        alternatives: ["Du musst nächstes Mal auch mitkommen!"],
        hint: "Modal fiil ikinci sırada, mastar sonda; mitkommen mastarda bölünmez.",
      },
      {
        kind: "free",
        prompt:
          "Geçen hafta sonu bir konsere gittin. Arkadaşın Tom'a e-posta yaz: kimin konseri olduğunu, nerede ve kiminle gittiğini söyle, en güzel anı anlat, hoşuna gitmeyen bir şeyden bahset ve onu bir sonraki konsere davet et.",
        checklist: [
          "Kimin konseri olduğunu, nerede ve kiminle gittiğini yaz",
          "En güzel anı anlat",
          "Hoşuna gitmeyen bir şeyi yaz",
          "Arkadaşını bir sonraki konsere davet et",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich muss dir von … erzählen!", tr: "Sana …'dan bahsetmem lazım!", en: "I have to tell you about …!" },
          { de: "Ich war mit … im Konzert von …", tr: "… ile …'nın konserindeydim.", en: "I went to …'s concert with …" },
          { de: "Am schönsten war …", tr: "En güzeli …'ydı", en: "The best part was …" },
          { de: "Nicht so toll war …", tr: "Pek iyi olmayan şey …'ydı", en: "What wasn't so great was …" },
          { de: "Nächstes Mal musst du mitkommen!", tr: "Bir dahaki sefere sen de gelmelisin!", en: "Next time you have to come along!" },
        ],
        sample:
          "Hallo Tom,\n\n" +
          "wie geht's dir? Ich muss dir von Samstag erzählen! Ich war mit Deniz im Konzert von Lina Berg in der Stadthalle. " +
          "Du weißt ja, ich höre ihre Lieder schon seit Jahren. Das Konzert hat eine halbe Stunde später angefangen, " +
          "aber dann war es fantastisch. Am schönsten war das letzte Lied: Alle haben mitgesungen, das Licht war aus " +
          "und nur die Handys haben geleuchtet. Nicht so toll war die Luft in der Halle, es war sehr warm und eng. " +
          "Im Dezember spielt sie noch einmal in Hamburg. Nächstes Mal musst du auch mitkommen!\n\n" +
          "Liebe Grüße\nMira",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s17",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Bitte oder Befehl?",
    genre: "pronounce",
    intro: "Emir kipi Almancada kaba değildir; kibarlığı „bitte, mal, doch“ ve yumuşak bir ezgi taşır. Altı cümlede ricayı rica gibi söyle.",
    gloss: [
      { de: "das Fenster", tr: "pencere", en: "window" },
      { de: "vorbeikommen", tr: "uğramak", en: "to come by" },
      { de: "sich setzen", tr: "oturmak", en: "to sit down" },
      { de: "leise", tr: "sessiz", en: "quiet" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Mach bitte das Fenster zu.",
        tr: "Lütfen pencereyi kapat.",
        hint: "Ses orta yükseklikte başlar, „bitte“ hafif söylenir, „zu“da yavaşça iner. Kısa ve sert bir düşüş emir gibi duyulur.",
        confusions: [
          {
            heard: [],
            fix: "Kelimeleri kesik kesik ve yüksek sesle söyleme; rica akıcı ve sonda yumuşak iner.",
            expected: "bitte",
          },
        ],
      },
      {
        de: "Komm doch mal vorbei!",
        tr: "Bir uğrasana!",
        hint: "„doch mal“ daveti samimi yapar: ses „vor-BEI“de hafifçe yükselir, sonra rahatça iner.",
        confusions: [
          {
            heard: [],
            fix: "„doch“u vurgularsan itiraz gibi duyulur; vurgu vorbei'de, doch ve mal hafif.",
            expected: "vorbei",
          },
        ],
      },
      {
        de: "Setzen Sie sich bitte.",
        tr: "Lütfen oturun.",
        hint: "Resmî rica: SET-zen başta hafif vurgulu, „bitte“ sonda alçak ve yumuşak.",
        confusions: [
          {
            heard: [],
            fix: "Sie'li emir zaten kibardır; sesi yükseltip sert bitirirsen komut gibi olur.",
            expected: "Setzen",
          },
        ],
      },
      {
        de: "Gib mir mal das Salz, bitte.",
        tr: "Tuzu bana bir verir misin?",
        hint: "Sofrada gündelik rica: „mal“ hafif, vurgu SALZ'da, „bitte“ alçak bir kuyruk gibi.",
        confusions: [
          {
            heard: [],
            fix: "Sondaki bitte'yi yüksek ve uzun söylersen sabırsızlık gibi duyulur; kısa ve alçak bırak.",
            expected: "Salz",
          },
        ],
      },
      {
        de: "Warten Sie bitte einen Moment.",
        tr: "Lütfen bir dakika bekleyin.",
        hint: "Telefonda ya da gişede: ses sakin, vurgu mo-MENT'te, sonra hafif bir düşüş.",
        confusions: [
          {
            heard: [],
            fix: "Hızlı ve düz söylersen aceleci duyulur; tempoyu düşür, Moment'i vurgula.",
            expected: "Moment",
          },
        ],
      },
      {
        de: "Seid bitte leise, das Baby schläft.",
        tr: "Lütfen sessiz olun, bebek uyuyor.",
        hint: "Rica ile sebep bir arada: „Seid bitte LEI-se →“ kısa durak, „das Baby SCHLÄFT ↘“.",
        confusions: [
          {
            heard: [],
            fix: "Sessizlik isterken kendin bağırma; alçak sesle ama net söyle, sebebi ekle.",
            expected: "leise",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g17",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "jemand, niemand, etwas, nichts",
    genre: "grammar",
    intro: "Belli olmayan bir kişi ya da şeyden söz etmek için kullanılan kısa kelimeler; Türkçedeki çift olumsuzluk burada yok.",
    focus: "Belgisiz zamirler: man, jemand, niemand, etwas, nichts, alles",
    gloss: [
      { de: "jemand", tr: "biri", en: "someone" },
      { de: "niemand", tr: "hiç kimse", en: "nobody" },
      { de: "etwas", tr: "bir şey", en: "something" },
      { de: "nichts", tr: "hiçbir şey", en: "nothing" },
      { de: "trennen", tr: "ayırmak", en: "to separate" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Kişi: jemand, niemand, man",
        tr: "jemand „biri“, niemand „hiç kimse“ demektir; ikisi de tekil fiil alır. man „insan, herkes“ anlamında genel öznedir ve fiil hep üçüncü tekil çekilir. Türkçede bu tür cümleler çoğu zaman edilgen kurulur: „ayrılır, içilmez“.",
        examples: [
          { de: "Hat jemand meinen Schlüssel gesehen?", tr: "Anahtarımı gören oldu mu?", note: "jemand + hat" },
          { de: "Niemand ist gekommen.", tr: "Kimse gelmedi.", note: "tek olumsuzluk yeter" },
          { de: "In Deutschland trennt man den Müll.", tr: "Almanya'da çöp ayrıştırılır.", note: "man + trennt" },
        ],
      },
      {
        heading: "Şey: etwas, nichts, alles",
        tr: "etwas „bir şey“, nichts „hiçbir şey“, alles „her şey“ demektir. alles çoğul anlamı taşısa da fiil tekildir: „Alles ist fertig.“",
        examples: [
          { de: "Möchtest du etwas trinken?", tr: "Bir şey içmek ister misin?", note: "etwas" },
          { de: "Ich habe nichts gehört.", tr: "Hiçbir şey duymadım.", note: "nichts" },
          { de: "Alles ist fertig, wir können essen.", tr: "Her şey hazır, yemek yiyebiliriz.", note: "alles + ist" },
        ],
      },
      {
        heading: "Çift olumsuzluk yok",
        tr: "Türkçede „kimse gelmedi, hiçbir şey duymadım“ derken fiil de olumsuzdur. Almancada niemand ve nichts zaten olumsuzdur; yanına bir nicht daha EKLENMEZ. Nesne olarak jemand ve niemand -en alabilir: jemanden, niemanden.",
        examples: [
          { de: "Ich kenne hier niemanden.", tr: "Burada kimseyi tanımıyorum.", note: "nesne: niemanden" },
          { de: "Kennst du jemanden in Hamburg?", tr: "Hamburg'da birini tanıyor musun?", note: "nesne: jemanden" },
          { de: "Wir haben heute nichts gekauft.", tr: "Bugün hiçbir şey almadık.", note: "nicht yok" },
        ],
      },
    ],
    questions: [
      {
        text: "Die Tür ist offen. Ist ___ zu Hause?",
        options: ["etwas", "jemand", "nichts"],
        answer: 1,
        explain: "Bir kişi soruluyor: jemand.",
      },
      {
        text: "Ich habe Hunger, aber im Kühlschrank ist ___.",
        options: ["niemand", "man", "nichts"],
        answer: 2,
        explain: "Bir şeyin olmadığı söyleniyor: nichts. niemand kişi içindir.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: ["Niemand ist gekommen.", "Niemand ist nicht gekommen.", "Niemand sind gekommen."],
        answer: 0,
        explain: "niemand zaten olumsuz ve tekil fiil alır; ikinci bir nicht gerekmez.",
      },
      {
        kind: "gapfill",
        text: "In Deutschland trennt ___ den Müll. (man / jemand)",
        options: [],
        answer: 0,
        accept: ["man"],
        explain: "Genel bir kural anlatılıyor, özne herkes: man.",
      },
      {
        kind: "gapfill",
        text: "Möchtest du ___ trinken? (etwas / nichts)",
        options: [],
        answer: 0,
        accept: ["etwas"],
        explain: "İkram ederken „bir şey“ sorulur: etwas.",
      },
      {
        kind: "gapfill",
        text: "Ich bin neu. Ich kenne hier ___. (jemanden / niemanden)",
        options: [],
        answer: 0,
        accept: ["niemanden", "niemand"],
        explain: "Yeni gelen kimseyi tanımıyor; nesne olduğu için niemanden, fiil olumsuz yapılmaz.",
      },
      {
        kind: "gapfill",
        text: "___ ist fertig, wir können essen. (Alles / Nichts)",
        options: [],
        answer: 0,
        accept: ["Alles", "alles"],
        explain: "Her şey hazır: alles, fiil tekil (ist).",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Hat", "jemand", "meinen Schlüssel", "gesehen"],
        explain: "Soru cümlesi: yardımcı fiil başta, jemand özne, ortaç sonda.",
      },
      {
        kind: "truefalse",
        text: "„Hier darf man nicht rauchen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "man genel öznedir ve fiil üçüncü tekil: man darf. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe nichts nicht gehört.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "nichts zaten olumsuz; doğrusu „Ich habe nichts gehört.“",
      },
    ],
  },
];

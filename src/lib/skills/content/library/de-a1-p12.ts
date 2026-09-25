import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 12.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. İş hattı: çiçekçinin
 * yardımcı eleman ilanı, şirket gezisini planlayan iki iş arkadaşı, patrona
 * izin e-postası. Söyleyiş odağı konuşmadaki kısa biçimler (geht's, gibt's);
 * dil bilgisi zaman edatları am / um / im.
 */
export const deA1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r12",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Aushilfe im Blumenladen gesucht",
    genre: "ad",
    intro: "Bir çiçekçinin vitrininde iş ilanı asılı: ne iş, hangi günler, ne kadar ödüyorlar, nasıl başvurulur.",
    gloss: [
      { de: "die Aushilfe", tr: "yardımcı eleman", en: "temporary worker" },
      { de: "die Blume", tr: "çiçek", en: "flower" },
      { de: "der Kunde", tr: "müşteri", en: "customer" },
      { de: "die Kasse", tr: "kasa", en: "checkout" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "der Lebenslauf", tr: "özgeçmiş", en: "resume" },
    ],
    minutes: 4,
    text:
      "AUSHILFE GESUCHT!\n\n" +
      "Der Blumenladen Rosa in der Marktstraße 5 sucht eine Aushilfe für das Wochenende.\n\n" +
      "Ihre Arbeit: Sie verkaufen Blumen, gießen die Pflanzen und helfen an der Kasse. " +
      "Am Samstag bringen Sie auch Blumen zu Kunden in der Stadt. Dafür brauchen Sie ein Fahrrad.\n\n" +
      "Die Arbeitszeit: Freitag von vierzehn bis achtzehn Uhr und Samstag von acht bis dreizehn Uhr. " +
      "Wir bezahlen vierzehn Euro pro Stunde.\n\n" +
      "Sie sprechen gut Deutsch und sind freundlich. Sie brauchen keine Erfahrung, wir zeigen Ihnen alles.\n\n" +
      "Interesse? Kommen Sie mit Ihrem Lebenslauf in den Laden oder schreiben Sie uns eine E-Mail.",
    questions: [
      {
        text: "Wen sucht der Blumenladen?",
        options: ["eine Aushilfe für das Wochenende", "einen Fahrer mit Auto", "eine Chefin für den Laden"],
        answer: 0,
        explain: "„sucht eine Aushilfe für das Wochenende“ — hafta sonu için yardımcı eleman aranıyor.",
      },
      {
        text: "Warum braucht man ein Fahrrad?",
        options: [
          "Der Laden ist weit vom Bahnhof.",
          "Man bringt am Samstag Blumen zu Kunden.",
          "Man fährt am Freitag zum Markt.",
        ],
        answer: 1,
        explain: "„Am Samstag bringen Sie auch Blumen zu Kunden in der Stadt. Dafür brauchen Sie ein Fahrrad.“",
      },
      {
        kind: "truefalse",
        text: "Für die Arbeit braucht man keine Erfahrung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Sie brauchen keine Erfahrung, wir zeigen Ihnen alles.“",
      },
      {
        kind: "gapfill",
        text: "Der Laden bezahlt ___ Euro pro Stunde.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„Wir bezahlen vierzehn Euro pro Stunde.“",
      },
      {
        kind: "short_answer",
        text: "Wann arbeitet man am Samstag?",
        options: [],
        answer: 0,
        accept: ["von acht bis dreizehn Uhr", "von 8 bis 13 Uhr", "acht bis dreizehn Uhr"],
        explain: "„Samstag von acht bis dreizehn Uhr“; cuma günü saatler farklı.",
      },
      {
        text: "Wie kann man sich melden?",
        options: ["am Telefon beim Chef", "mit einem Brief an die Stadt", "im Laden oder per E-Mail"],
        answer: 2,
        explain: "„Kommen Sie mit Ihrem Lebenslauf in den Laden oder schreiben Sie uns eine E-Mail.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l12",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Wohin geht der Betriebsausflug?",
    genre: "dialogue",
    intro: "İki iş arkadaşı şirketin yıllık gezisini planlıyor: nereye gidecekler, nerede buluşacaklar, parayı kim ödüyor.",
    gloss: [
      { de: "das Schiff", tr: "gemi", en: "ship" },
      { de: "langweilig", tr: "sıkıcı", en: "boring" },
      { de: "die Firma", tr: "şirket", en: "company" },
      { de: "das Mittagessen", tr: "öğle yemeği", en: "lunch" },
      { de: "das Getränk", tr: "içecek", en: "drink" },
      { de: "planen", tr: "planlamak", en: "to plan" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Aksoy", text: "Herr Wolf, haben Sie kurz Zeit? Wir müssen den Betriebsausflug planen." },
      { speaker: "Herr Wolf", text: "Ja, gern. Letztes Jahr waren wir im Museum. Das war ein bisschen langweilig." },
      { speaker: "Frau Aksoy", text: "Ich habe zwei Ideen: eine Fahrt mit dem Schiff auf dem Rhein oder eine Radtour." },
      { speaker: "Herr Wolf", text: "Eine Radtour ist schwierig. Nicht alle Kollegen haben ein Fahrrad." },
      { speaker: "Frau Aksoy", text: "Stimmt. Dann nehmen wir das Schiff. Es fährt um zehn Uhr in Bonn ab. Wir treffen uns um neun Uhr am Bahnhof." },
      { speaker: "Herr Wolf", text: "Gibt es auf dem Schiff auch etwas zu essen?" },
      { speaker: "Frau Aksoy", text: "Ja, es gibt ein Mittagessen. Die Firma bezahlt das Essen und die Fahrt. Nur die Getränke bezahlt jeder selbst." },
      { speaker: "Herr Wolf", text: "Super. Wie viele Leute kommen mit?" },
      { speaker: "Frau Aksoy", text: "Vierzehn Kollegen. Ich schreibe heute noch eine E-Mail an alle." },
    ],
    questions: [
      {
        text: "Worüber sprechen die zwei Kollegen?",
        options: ["über einen Kurs im Büro", "über einen Ausflug mit der Firma", "über ihren Urlaub in Bonn"],
        answer: 1,
        explain: "„Wir müssen den Betriebsausflug planen“ — konu şirketin gezisi.",
      },
      {
        text: "Warum machen sie keine Radtour?",
        options: ["Das Wetter ist zu schlecht.", "Die Radtour ist zu teuer.", "Nicht alle haben ein Fahrrad."],
        answer: 2,
        explain: "„Nicht alle Kollegen haben ein Fahrrad“ — bu yüzden gemiyi seçiyorlar.",
      },
      {
        kind: "truefalse",
        text: "Die Firma bezahlt das Mittagessen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die Firma bezahlt das Essen und die Fahrt“; yalnız içecekleri herkes kendisi ödüyor.",
      },
      {
        kind: "gapfill",
        text: "Das Schiff fährt um ___ Uhr ab.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„Es fährt um zehn Uhr in Bonn ab“; buluşma bir saat önce.",
      },
      {
        kind: "short_answer",
        text: "Wo treffen sich die Kollegen?",
        options: [],
        answer: 0,
        accept: ["am Bahnhof", "Bahnhof", "um neun Uhr am Bahnhof"],
        explain: "„Wir treffen uns um neun Uhr am Bahnhof.“",
      },
      {
        text: "Was bezahlt jeder selbst?",
        options: ["die Getränke", "das Mittagessen", "die Fahrt mit dem Schiff"],
        answer: 0,
        explain: "„Nur die Getränke bezahlt jeder selbst.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w12",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Ich möchte Urlaub nehmen",
    genre: "email",
    intro: "Patronundan izin istiyorsun: önce iki cümle kur, sonra kısa bir e-posta yaz.",
    gloss: [
      { de: "der Urlaub", tr: "izin", en: "leave" },
      { de: "die Hochzeit", tr: "düğün", en: "wedding" },
      { de: "die Kollegin", tr: "iş arkadaşı", en: "colleague" },
      { de: "möglich", tr: "mümkün", en: "possible" },
      { de: "die Antwort", tr: "cevap", en: "answer" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Temmuzda iki hafta izin almak istiyorum.",
        answer: "Ich möchte im Juli zwei Wochen Urlaub nehmen.",
        alternatives: ["Im Juli möchte ich zwei Wochen Urlaub nehmen."],
        hint: "„möchte“ ikinci sırada, „nehmen“ en sonda durur; ay adı „im“ ile söylenir.",
      },
      {
        kind: "build",
        tr: "Bu sürede işimi Tom yapıyor.",
        answer: "In dieser Zeit macht Tom meine Arbeit.",
        alternatives: ["Tom macht in dieser Zeit meine Arbeit."],
        hint: "Zaman ifadesi başa gelince fiil ikinci sırada kalır ve özne arkasına geçer.",
      },
      {
        kind: "free",
        prompt:
          "Patronuna kısa bir e-posta yaz: hangi tarihler arasında izin istediğini söyle, nedenini yaz, bu sürede işini kimin yapacağını belirt ve kibarca cevap iste.",
        checklist: [
          "Patronuna hitap et",
          "İzin istediğin tarihleri yaz",
          "Nedenini açıkla",
          "İşini kimin yapacağını söyle ve cevap iste",
        ],
        minWords: 35,
        phrases: [
          { de: "Liebe Frau …,", tr: "Sevgili … Hanım,", en: "Dear Ms …," },
          { de: "Ich möchte vom … bis zum … Urlaub nehmen.", tr: "…'den …'e kadar izin almak istiyorum.", en: "I would like to take leave from … to …" },
          { de: "Meine Schwester heiratet in …", tr: "Kız kardeşim …'de evleniyor.", en: "My sister is getting married in …" },
          { de: "In dieser Zeit macht … meine Arbeit.", tr: "Bu sürede işimi … yapıyor.", en: "During this time … is doing my work." },
          { de: "Ist das möglich?", tr: "Bu mümkün mü?", en: "Is that possible?" },
        ],
        sample:
          "Liebe Frau Hartmann, ich möchte vom zehnten bis zum vierundzwanzigsten Juli Urlaub nehmen. " +
          "Meine Schwester heiratet in Izmir und die ganze Familie kommt zur Hochzeit. " +
          "In dieser Zeit macht meine Kollegin Lena meine Arbeit, sie kennt alle Kunden. " +
          "Ist das möglich? Ich freue mich auf Ihre Antwort. Viele Grüße, Deniz Aydin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s12",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Wie geht's?",
    genre: "pronounce",
    intro: "Günlük konuşmada „es“ çoğu zaman tek bir s'ye iner ve önceki kelimeye yapışır: „geht es“ → „geht's“. Altı cümlede bu kısa biçimleri akıcı söyle.",
    gloss: [
      { de: "gehen", tr: "gitmek", en: "to go" },
      { de: "stimmen", tr: "doğru olmak", en: "to be correct" },
      { de: "klappen", tr: "yolunda gitmek", en: "to work out" },
      { de: "der Urlaub", tr: "tatil", en: "vacation" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Hallo, wie geht's dir?",
        tr: "Merhaba, nasılsın?",
        hint: "„geht's“ = GEETS: es tek bir s olur, t ile birleşip ts gibi duyulur.",
        confusions: [
          {
            heard: [],
            fix: "„geht es“ iki ayrı kelime gibi söylenirse resmî duyulur; sohbette kısa biçim tek hece: GEETS.",
            expected: "geht's",
          },
        ],
      },
      {
        de: "Gibt's hier in der Nähe ein Restaurant?",
        tr: "Yakında bir restoran var mı?",
        hint: "„gibt's“ = GİPTS: b burada p gibi, sonra ts. Tek hece.",
        confusions: [
          {
            heard: [],
            fix: "Araya ünlü koyma: GİP-TİS değil, tek hamlede GİPTS.",
            expected: "gibt's",
          },
        ],
      },
      {
        de: "Wie war's im Urlaub?",
        tr: "Tatil nasıldı?",
        hint: "„war's“ = VAARS: uzun a, r hafif, sonda yalnız s.",
        confusions: [
          {
            heard: [],
            fix: "„war es“ yerine kısa biçimde es'in ünlüsü tamamen düşer; s önceki kelimeye yapışır.",
            expected: "war's",
          },
        ],
      },
      {
        de: "Tschüss, mach's gut!",
        tr: "Hoşça kal, kendine iyi bak!",
        hint: "„mach's“ = MAHS: sert ch'den sonra doğrudan s gelir.",
        confusions: [
          {
            heard: [],
            fix: "ch ile s arasına ünlü girmez; veda kalıbı tek nefeste söylenir.",
            expected: "mach's",
          },
        ],
      },
      {
        de: "Klappt's am Freitag bei dir?",
        tr: "Cuma senin için uygun mu?",
        hint: "„klappt's“ = KLAPTS: p, t ve s art arda, hepsi duyulur.",
        confusions: [
          {
            heard: [],
            fix: "Sondaki ts'yi yutma; kısa biçimde es'ten geriye kalan tek şey bu s.",
            expected: "klappt's",
          },
        ],
      },
      {
        de: "Das ist sehr teuer, stimmt's?",
        tr: "Bu çok pahalı, değil mi?",
        hint: "„stimmt's“ = ŞTİMTS: sonda soru ezgisi yükselir.",
        confusions: [
          {
            heard: [],
            fix: "„stimmt's“ cümle sonunda onay ister; sesi sonda hafifçe yükselt.",
            expected: "stimmt's",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g12",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "am Montag, um acht, im Mai",
    genre: "grammar",
    intro: "Türkçede tek bir „-de“ eki yeter; Almancada gün, saat ve ay ayrı edat ister. Hangisinin ne zaman geldiğini öğren.",
    focus: "Zaman edatları: am (gün), um (saat), im (ay ve mevsim)",
    gloss: [
      { de: "das Wochenende", tr: "hafta sonu", en: "weekend" },
      { de: "der Nachmittag", tr: "öğleden sonra", en: "afternoon" },
      { de: "die Nacht", tr: "gece", en: "night" },
      { de: "der Sommer", tr: "yaz", en: "summer" },
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Üç edat, üç zaman",
        tr: "Türkçede „pazartesi günü, saat sekizde, mayısta“ derken hep aynı -de ekini kullanırsın. Almancada gün „am“, saat „um“, ay ve mevsim „im“ alır. Edatı zamanın türü seçer.",
        examples: [
          { de: "Am Montag habe ich einen Kurs.", tr: "Pazartesi kursum var.", note: "gün → am" },
          { de: "Der Kurs beginnt um acht Uhr.", tr: "Kurs saat sekizde başlıyor.", note: "saat → um" },
          { de: "Im Mai fahren wir nach Spanien.", tr: "Mayısta İspanya'ya gidiyoruz.", note: "ay → im" },
        ],
      },
      {
        heading: "am: günler ve günün bölümleri",
        tr: "„am“, „an dem“ın kısa biçimidir. Günler, hafta sonu ve günün bölümleri (Morgen, Nachmittag, Abend) „am“ ile söylenir. Tek istisna gecedir: „in der Nacht“.",
        examples: [
          { de: "Am Wochenende schlafe ich lange.", tr: "Hafta sonu uzun uyurum.", note: "am Wochenende" },
          { de: "Wir essen am Abend zusammen.", tr: "Akşam birlikte yemek yiyoruz.", note: "günün bölümü → am" },
          { de: "In der Nacht ist es hier sehr ruhig.", tr: "Gece burası çok sakin.", note: "istisna: in der Nacht" },
        ],
      },
      {
        heading: "Edatsız zaman ifadeleri",
        tr: "„heute, morgen, gestern“ ve „nächste Woche, jeden Tag“ gibi ifadeler edat almaz. Saat aralığı ise „von … bis“ ile söylenir.",
        examples: [
          { de: "Morgen arbeite ich nicht.", tr: "Yarın çalışmıyorum.", note: "edat yok" },
          { de: "Nächste Woche habe ich Urlaub.", tr: "Gelecek hafta iznim var.", note: "edat yok" },
          { de: "Die Praxis ist von neun bis zwölf Uhr offen.", tr: "Muayenehane dokuzdan on ikiye kadar açık.", note: "von … bis" },
        ],
      },
    ],
    questions: [
      {
        text: "Der Film beginnt ___ zwanzig Uhr.",
        options: ["um", "am", "im"],
        answer: 0,
        explain: "Saat söyleniyor; saatten önce um gelir.",
      },
      {
        text: "Wir fahren ___ August ans Meer.",
        options: ["am", "um", "im"],
        answer: 2,
        explain: "Ay adlarından önce im gelir: im August.",
      },
      {
        text: "Was ist richtig?",
        options: ["im Nacht", "in der Nacht", "am Nacht"],
        answer: 1,
        explain: "Günün bölümleri am alır ama gece istisnadır: in der Nacht.",
      },
      {
        kind: "gapfill",
        text: "___ Dienstag gehe ich zum Arzt.",
        options: [],
        answer: 0,
        accept: ["Am", "am"],
        explain: "Günlerden önce am gelir: am Dienstag.",
      },
      {
        kind: "gapfill",
        text: "Im Winter ist es kalt und ___ Sommer ist es warm.",
        options: [],
        answer: 0,
        accept: ["im"],
        explain: "Mevsimler de aylar gibi im alır: im Sommer.",
      },
      {
        kind: "gapfill",
        text: "Ich stehe jeden Tag ___ sechs Uhr auf.",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "Saatten önce um gelir; „jeden Tag“ ise edatsız kalır.",
      },
      {
        kind: "gapfill",
        text: "Wir treffen uns ___ Nachmittag im Café.",
        options: [],
        answer: 0,
        accept: ["am"],
        explain: "Günün bölümleri am alır: am Nachmittag.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Am Samstag", "spiele", "ich", "um zehn Uhr", "Fußball"],
        explain: "Gün başta, fiil ikinci, özne arkasında, saat ondan sonra: Am Samstag spiele ich um zehn Uhr Fußball.",
      },
      {
        kind: "truefalse",
        text: "„Nächste Woche habe ich Zeit.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„nächste Woche“ edat almaz; cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Wir fliegen am Juli nach Ankara.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Ay adı am değil im alır; doğrusu „Wir fliegen im Juli nach Ankara.“",
      },
    ],
  },
];

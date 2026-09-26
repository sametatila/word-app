import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 iş ve boş zaman hattı: panodaki tanıtım yazısı, sokak röportajı,
 * randevu iptali. Söyleyiş odağı -ig / -lich / -isch ekleri; dil bilgisi
 * belirtme hâli zamirleri.
 */
export const deA1P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r9",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Unsere neue Kollegin",
    genre: "profile",
    intro: "İş yerinin panosunda yeni gelen bir çalışanın tanıtımı asılı: kim, ne yapıyor, nerede oturuyor.",
    gloss: [
      { de: "die Kollegin", tr: "iş arkadaşı", en: "colleague" },
      { de: "die Abteilung", tr: "birim", en: "department" },
      { de: "der Stock", tr: "kat", en: "floor" },
      { de: "die Ausbildung", tr: "meslek eğitimi", en: "vocational training" },
      { de: "der Garten", tr: "bahçe", en: "garden" },
      { de: "willkommen", tr: "hoş geldiniz", en: "welcome" },
    ],
    minutes: 4,
    text:
      "Herzlich willkommen, Frau Schuster!\n\n" +
      "Seit dem ersten Oktober arbeitet unsere neue Kollegin Anna Schuster bei uns. Sie kommt aus Rostock und wohnt jetzt in Erfurt.\n\n" +
      "Frau Schuster hat ihre Ausbildung in einem Krankenhaus gemacht. Danach hat sie fünf Jahre in einer Apotheke gearbeitet.\n\n" +
      "Bei uns arbeitet sie in der Abteilung Einkauf. Ihr Büro ist im zweiten Stock, Zimmer 214. " +
      "Sie ist von Montag bis Donnerstag da, am Freitag arbeitet sie zu Hause.\n\n" +
      "In der Freizeit fährt Frau Schuster gern Rad und arbeitet in ihrem Garten. Sie hat zwei Katzen.\n\n" +
      "Wir freuen uns auf die Zusammenarbeit!",
    questions: [
      {
        text: "Was für ein Text ist das?",
        options: ["eine Stellenanzeige", "eine Vorstellung am schwarzen Brett", "eine Einladung zu einem Fest"],
        answer: 1,
        explain: "Metin yeni gelen bir çalışanı tanıtıyor; iş ilanı ya da davetiye değil.",
      },
      {
        text: "Wo arbeitet Frau Schuster jetzt?",
        options: ["in der Abteilung Einkauf", "in einer Apotheke", "in einem Krankenhaus"],
        answer: 0,
        explain: "Eczane ve hastane geçmişine ait; şimdi „in der Abteilung Einkauf“ çalışıyor.",
      },
      {
        kind: "truefalse",
        text: "Am Freitag ist Frau Schuster im Büro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„am Freitag arbeitet sie zu Hause“ — büroda pazartesiden perşembeye.",
      },
      {
        kind: "gapfill",
        text: "Ihr Büro ist im ___ Stock.",
        options: [],
        answer: 0,
        accept: ["zweiten", "2.", "zweiten Stock"],
        explain: "„Ihr Büro ist im zweiten Stock, Zimmer 214.“",
      },
      {
        kind: "short_answer",
        text: "Was macht Frau Schuster in der Freizeit?",
        options: [],
        answer: 0,
        accept: ["Rad fahren", "sie fährt Rad", "Rad fahren und im Garten arbeiten"],
        explain: "„fährt Frau Schuster gern Rad und arbeitet in ihrem Garten“.",
      },
      {
        text: "Woher kommt Frau Schuster?",
        options: ["aus Erfurt", "aus Rostock", "aus einer Apotheke"],
        answer: 1,
        explain: "„Sie kommt aus Rostock und wohnt jetzt in Erfurt“ — memleketi Rostock.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l9",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Was machen Sie am Wochenende?",
    genre: "interview",
    intro: "Radyo muhabiri sokakta üç kişiye aynı soruyu soruyor: hafta sonu planları ne.",
    gloss: [
      { de: "das Wochenende", tr: "hafta sonu", en: "weekend" },
      { de: "der Markt", tr: "pazar", en: "market" },
      { de: "wandern", tr: "doğa yürüyüşü yapmak", en: "to hike" },
      { de: "die Enkelin", tr: "torun", en: "granddaughter" },
      { de: "aufräumen", tr: "toplamak", en: "to tidy up" },
      { de: "der Regen", tr: "yağmur", en: "rain" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Reporterin", text: "Guten Tag! Wir sind von Radio Mitte. Eine kurze Frage: Was machen Sie am Wochenende?" },
      { speaker: "Herr Lang", text: "Ich gehe am Samstag früh auf den Markt. Danach koche ich für meine Familie." },
      { speaker: "Reporterin", text: "Und am Sonntag?" },
      { speaker: "Herr Lang", text: "Am Sonntag wandern wir im Wald. Aber nur bei gutem Wetter, nicht bei Regen." },
      { speaker: "Frau Özdemir", text: "Ich arbeite leider am Samstag. Am Sonntag kommt meine Enkelin und wir backen zusammen." },
      { speaker: "Reporterin", text: "Das klingt schön. Und Sie, junger Mann?" },
      { speaker: "Tobias", text: "Ich muss mein Zimmer aufräumen. Am Abend spiele ich dann Fußball mit Freunden." },
      { speaker: "Reporterin", text: "Vielen Dank und ein schönes Wochenende!" },
    ],
    questions: [
      {
        text: "Wer fragt die Leute?",
        options: ["eine Lehrerin", "eine Reporterin", "eine Verkäuferin"],
        answer: 1,
        explain: "„Wir sind von Radio Mitte“ — soruyu bir radyo muhabiri soruyor.",
      },
      {
        text: "Was macht Herr Lang am Samstag früh?",
        options: ["Er geht auf den Markt.", "Er wandert im Wald.", "Er spielt Fußball."],
        answer: 0,
        explain: "„Ich gehe am Samstag früh auf den Markt“; yürüyüş pazar günü.",
      },
      {
        kind: "truefalse",
        text: "Frau Özdemir hat am Samstag frei.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ich arbeite leider am Samstag“ — torunuyla pazar günü buluşuyor.",
      },
      {
        kind: "gapfill",
        text: "Herr Lang wandert nur bei gutem ___.",
        options: [],
        answer: 0,
        accept: ["Wetter"],
        explain: "„Aber nur bei gutem Wetter, nicht bei Regen.“",
      },
      {
        kind: "short_answer",
        text: "Was macht Frau Özdemir mit ihrer Enkelin?",
        options: [],
        answer: 0,
        accept: ["backen", "sie backen", "sie backen zusammen"],
        explain: "„kommt meine Enkelin und wir backen zusammen“.",
      },
      {
        text: "Was muss Tobias zuerst machen?",
        options: ["Fußball spielen", "kochen", "sein Zimmer aufräumen"],
        answer: 2,
        explain: "Önce „Ich muss mein Zimmer aufräumen“, futbol akşam.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w9",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Einen Termin absagen",
    genre: "email",
    intro: "Randevuna gidemiyorsun: önce iki cümle kur, sonra muayenehaneye kısa bir e-posta yaz.",
    gloss: [
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "die Dienstreise", tr: "iş seyahati", en: "business trip" },
      { de: "möglich", tr: "mümkün", en: "possible" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yarınki randevuma gelemiyorum.",
        answer: "Ich kann morgen nicht zu meinem Termin kommen.",
        alternatives: ["Morgen kann ich nicht zu meinem Termin kommen."],
        hint: "„kann“ ikinci sırada, „kommen“ en sonda; „nicht“ „zu meinem Termin“ öbeğinden önce gelir.",
      },
      {
        kind: "build",
        tr: "Gelecek hafta yeni bir randevu alabilir miyim?",
        answer: "Kann ich nächste Woche einen neuen Termin bekommen?",
        alternatives: ["Kann ich einen neuen Termin nächste Woche bekommen?"],
        hint: "Evet-hayır sorusunda çekimli fiil EN BAŞA geçer, özne arkasından gelir.",
      },
      {
        kind: "free",
        prompt:
          "Muayenehaneye kısa bir e-posta yaz: kim olduğunu ve randevunun ne zaman olduğunu söyle, neden gelemediğini yaz, yeni bir tarih iste ve kibarca bitir.",
        checklist: [
          "Kibarca hitap et ve kendini tanıt",
          "Randevunun gün ve saatini yaz",
          "Neden gelemediğini açıkla",
          "Yeni bir randevu iste ve teşekkür et",
        ],
        minWords: 30,
        phrases: [
          { de: "Sehr geehrte Damen und Herren,", tr: "Sayın yetkili,", en: "Dear Sir or Madam," },
          { de: "Ich habe am … einen Termin.", tr: "… günü randevum var.", en: "I have an appointment on …" },
          { de: "Leider kann ich nicht kommen.", tr: "Maalesef gelemiyorum.", en: "Unfortunately I cannot come." },
          { de: "Können wir den Termin verschieben?", tr: "Randevuyu erteleyebilir miyiz?", en: "Can we postpone the appointment?" },
          { de: "Vielen Dank im Voraus.", tr: "Şimdiden teşekkürler.", en: "Thank you in advance." },
        ],
        sample:
          "Sehr geehrte Damen und Herren, mein Name ist Emre Yalcin. " +
          "Ich habe am Mittwoch um zehn Uhr einen Termin bei Doktor Frank. " +
          "Leider kann ich nicht kommen, denn ich bin auf einer Dienstreise in Hamburg. " +
          "Können wir den Termin auf nächste Woche verschieben? Am Montag und am Dienstag habe ich Zeit. " +
          "Vielen Dank im Voraus. Mit freundlichen Grüßen, Emre Yalcin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s9",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "-ig, -lich, -isch",
    genre: "pronounce",
    intro: "Kelime sonundaki üç ek: -ig ve -lich yumuşak ch ile, -isch ş ile biter; altı cümlede farkı duyur.",
    gloss: [
      { de: "richtig", tr: "doğru", en: "correct" },
      { de: "freundlich", tr: "güler yüzlü", en: "friendly" },
      { de: "praktisch", tr: "pratik", en: "practical" },
      { de: "wichtig", tr: "önemli", en: "important" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Das ist wirklich richtig.",
        tr: "Bu gerçekten doğru.",
        hint: "Sondaki -ig, -ik değil -ih okunur: RİH-tih. İki ek de aynı cümlede.",
        confusions: [
          {
            heard: ["Das ist wirklik richtik"],
            fix: "Kelime sonundaki -ig yumuşak ch sesiyle biter; k sesi Güney lehçesidir, ölçünlü değil.",
            expected: "richtig",
          },
        ],
      },
      {
        de: "Die Nachbarin ist sehr freundlich.",
        tr: "Komşu çok güler yüzlü.",
        hint: "-lich içindeki ch yumuşaktır ve i kısadır: FROYNT-lih.",
        confusions: [
          {
            heard: ["Die Nachbarin ist sehr freundlik"],
            fix: "-lich sonu k ile bitmez; dil öne gelir, hava ince bir kanaldan geçer.",
            expected: "freundlich",
          },
        ],
      },
      {
        de: "Diese Tasche ist sehr praktisch.",
        tr: "Bu çanta çok pratik.",
        hint: "-isch tek bir ş sesidir: PRAK-tiş. Burada ch ayrı okunmaz.",
        confusions: [
          {
            heard: ["Diese Tasche ist sehr praktih"],
            fix: "sch harf üçlüsü tek ş verir; -isch ekinde de böyledir.",
            expected: "praktisch",
          },
        ],
      },
      {
        de: "Das Gespräch war wichtig.",
        tr: "Konuşma önemliydi.",
        hint: "„Gespräch“ sonunda yumuşak ch, „wichtig“ sonunda -ih. İkisi aynı ses ailesinden.",
        confusions: [
          {
            heard: ["Das Gespräk war wichtik"],
            fix: "İkisi de ch ile biter; k sesi ikisinde de yanlıştır.",
            expected: "wichtig",
          },
        ],
      },
      {
        de: "Er spricht ruhig und deutlich.",
        tr: "Sakin ve net konuşuyor.",
        hint: "„ruhig“ = RUU-ih, „deutlich“ = DOYT-lih. Sondaki iki ek aynı bitişi paylaşır.",
        confusions: [
          {
            heard: ["Er spricht ruhik und deutlik"],
            fix: "İki ek de yumuşak ch ile biter; ayrıca „spricht“ içindeki ch de yumuşaktır.",
            expected: "deutlich",
          },
        ],
      },
      {
        de: "Der Kurs ist typisch für Anfänger.",
        tr: "Kurs yeni başlayanlar için tipik.",
        hint: "„typisch“ içindeki y bir ü gibi okunur: TÜÜ-piş.",
        confusions: [
          {
            heard: ["Der Kurs ist tipisch für Anfänger"],
            fix: "Almancada y çoğu kelimede ü sesi verir; i değil.",
            expected: "typisch",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g9",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Ich sehe ihn morgen",
    genre: "grammar",
    intro: "Nesne yerine zamir koyduğunda biçim değişir; hangi zamirin hangi ismin yerini tuttuğunu öğren.",
    focus: "Personalpronomen im Akkusativ: mich, dich, ihn, sie, es",
    gloss: [
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "die Zeitung", tr: "gazete", en: "newspaper" },
      { de: "das Paket", tr: "paket", en: "package" },
      { de: "verstehen", tr: "anlamak", en: "to understand" },
      { de: "abholen", tr: "almaya gitmek", en: "to pick up" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Zamir ismin cinsini taşır",
        tr: "Türkçede nesne zamiri tektir: „onu“. Almancada ise zamir, yerini tuttuğu ismin cinsini korur. Eril isim → ihn, dişil isim → sie, nötr isim → es, çoğul → sie. Yani „onu“ demek için önce ismin artikelini bilmek gerekir.",
        examples: [
          { de: "Wo ist der Schlüssel? — Ich habe ihn.", tr: "Anahtar nerede? — Bende.", note: "der → ihn" },
          { de: "Wo ist die Zeitung? — Ich lese sie.", tr: "Gazete nerede? — Onu okuyorum.", note: "die → sie" },
          { de: "Wo ist das Paket? — Ich hole es ab.", tr: "Paket nerede? — Onu almaya gidiyorum.", note: "das → es" },
        ],
      },
      {
        heading: "Tam liste",
        tr: "Yalın hâlden belirtme hâline beş biçim değişir: ich → mich, du → dich, er → ihn, wir → uns, ihr → euch. „sie“ ve „es“ aynı kalır; kibar „Sie“ de her iki hâlde Sie'dir.",
        examples: [
          { de: "Verstehst du mich?", tr: "Beni anlıyor musun?", note: "ich → mich" },
          { de: "Ich rufe dich später an.", tr: "Seni sonra ararım.", note: "du → dich" },
          { de: "Wir besuchen euch am Sonntag.", tr: "Pazar günü sizi ziyaret ediyoruz.", note: "ihr → euch" },
        ],
      },
      {
        heading: "Zamir nereye gider?",
        tr: "Zamir, yerini tuttuğu ismin durduğu yerde kalır: fiilden sonra. Ayrılabilen fiillerde ön ek yine cümlenin sonunda durur, zamir onun önünde yer alır.",
        examples: [
          { de: "Ich hole dich um acht ab.", tr: "Seni sekizde almaya geliyorum.", note: "zamir, ön ekten önce" },
          { de: "Kennst du sie?", tr: "Onu tanıyor musun?", note: "soruda da fiilden sonra" },
          { de: "Er versteht uns nicht.", tr: "Bizi anlamıyor.", note: "„nicht“ zamirden sonra gelir" },
        ],
      },
    ],
    questions: [
      {
        text: "Wo ist der Schlüssel? — Ich habe ___.",
        options: ["sie", "ihn", "es"],
        answer: 1,
        explain: "„der Schlüssel“ erildir; belirtme hâlinde zamiri ihn olur.",
      },
      {
        text: "Wo ist die Zeitung? — Ich lese ___ gerade.",
        options: ["sie", "ihn", "es"],
        answer: 0,
        explain: "„die Zeitung“ dişildir; zamiri sie'dir ve belirtme hâlinde de değişmez.",
      },
      {
        text: "Verstehst du ___? (ich)",
        options: ["mir", "ich", "mich"],
        answer: 2,
        explain: "„verstehen“ belirtme hâli ister: ich → mich.",
      },
      {
        kind: "gapfill",
        text: "Wo ist das Paket? — Ich hole ___ morgen ab.",
        options: [],
        answer: 0,
        accept: ["es"],
        explain: "„das Paket“ nötrdür; zamiri es'tir ve ayrılan ön ekten önce durur.",
      },
      {
        kind: "gapfill",
        text: "Wir besuchen ___ am Sonntag. (ihr)",
        options: [],
        answer: 0,
        accept: ["euch"],
        explain: "„ihr“ belirtme hâlinde euch olur.",
      },
      {
        kind: "gapfill",
        text: "Ich rufe ___ später an. (du)",
        options: [],
        answer: 0,
        accept: ["dich"],
        explain: "„du“ belirtme hâlinde dich olur; zamir ön ekten önce durur.",
      },
      {
        kind: "gapfill",
        text: "Er versteht ___ nicht. (wir)",
        options: [],
        answer: 0,
        accept: ["uns"],
        explain: "„wir“ belirtme hâlinde uns olur ve „nicht“ ondan sonra gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "hole", "dich", "um acht", "ab"],
        explain: "Fiil ikinci, zamir hemen arkasında, ayrılan ön ek en sonda: Ich hole dich um acht ab.",
      },
      {
        kind: "truefalse",
        text: "„Wo ist der Zug? — Ich sehe es nicht.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„der Zug“ eril olduğu için zamir ihn olmalı: „Ich sehe ihn nicht.“",
      },
      {
        kind: "truefalse",
        text: "„Kennst du sie?“ — Bu soru doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil ya da çoğul bir isim için sie doğrudur ve fiilden sonra durur.",
      },
    ],
  },
];

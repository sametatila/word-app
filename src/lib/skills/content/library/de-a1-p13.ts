import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 13.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. Konaklama hattı: gençlik
 * yurdunun ev kuralları, otel resepsiyonunda giriş, misafir kalınan aileye
 * teşekkür kartı. Söyleyiş odağı ince l; dil bilgisi ja / nein / doch —
 * olumsuz soruya cevap.
 */
export const deA1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r13",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Willkommen in der Jugendherberge",
    genre: "info",
    intro: "Gençlik yurdunun odalarında bir bilgi kâğıdı asılı: kahvaltı ne zaman, havlular nereden alınır, gece hangi kurallar geçerli.",
    gloss: [
      { de: "die Jugendherberge", tr: "gençlik yurdu", en: "youth hostel" },
      { de: "das Erdgeschoss", tr: "zemin kat", en: "ground floor" },
      { de: "die Bettwäsche", tr: "nevresim takımı", en: "bed linen" },
      { de: "das Handtuch", tr: "havlu", en: "towel" },
      { de: "leise", tr: "sessiz", en: "quiet" },
      { de: "verboten", tr: "yasak", en: "forbidden" },
    ],
    minutes: 4,
    text:
      "WILLKOMMEN IN DER JUGENDHERBERGE AM SEE!\n\n" +
      "Frühstück gibt es von sieben bis halb zehn im Erdgeschoss. Das Abendessen beginnt um achtzehn Uhr.\n\n" +
      "Bettwäsche und Handtücher bekommen Sie an der Rezeption. Bitte bringen Sie die Bettwäsche " +
      "am letzten Tag wieder zurück.\n\n" +
      "Ab zweiundzwanzig Uhr ist Ruhe im Haus. Bitte seien Sie dann leise.\n\n" +
      "Die Haustür ist von Mitternacht bis sechs Uhr zu. Mit Ihrer Zimmerkarte können Sie die Tür aber immer öffnen.\n\n" +
      "Rauchen ist im ganzen Haus verboten. Fahrräder stehen hinter dem Haus.\n\n" +
      "Am letzten Tag muss Ihr Zimmer bis zehn Uhr frei sein. Wir wünschen Ihnen schöne Tage am See!",
    questions: [
      {
        text: "Wann gibt es Frühstück?",
        options: ["ab achtzehn Uhr", "bis Mitternacht", "von sieben bis halb zehn"],
        answer: 2,
        explain: "„Frühstück gibt es von sieben bis halb zehn“; saat on sekiz akşam yemeğinin saati.",
      },
      {
        text: "Wo bekommt man Handtücher?",
        options: ["an der Rezeption", "im Erdgeschoss beim Frühstück", "hinter dem Haus"],
        answer: 0,
        explain: "„Bettwäsche und Handtücher bekommen Sie an der Rezeption.“",
      },
      {
        kind: "truefalse",
        text: "Nach Mitternacht kommt man mit der Zimmerkarte ins Haus.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Kapı gece yarısından sonra kapalı ama „Mit Ihrer Zimmerkarte können Sie die Tür aber immer öffnen.“",
      },
      {
        kind: "gapfill",
        text: "Ab ___ Uhr ist Ruhe im Haus.",
        options: [],
        answer: 0,
        accept: ["zweiundzwanzig", "22"],
        explain: "„Ab zweiundzwanzig Uhr ist Ruhe im Haus.“",
      },
      {
        kind: "short_answer",
        text: "Wo stehen die Fahrräder?",
        options: [],
        answer: 0,
        accept: ["hinter dem Haus", "hinten am Haus"],
        explain: "„Fahrräder stehen hinter dem Haus.“",
      },
      {
        text: "Was bringt man am letzten Tag zurück?",
        options: ["die Handtücher aus dem Bad", "die Bettwäsche", "den Schlüssel für das Fahrrad"],
        answer: 1,
        explain: "„Bitte bringen Sie die Bettwäsche am letzten Tag wieder zurück.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l13",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Check-in im Hotel Lindenhof",
    genre: "dialogue",
    intro: "Bir kadın akşam otele varıyor ve resepsiyonda giriş yapıyor: kaç gece kalacak, kahvaltı ne zaman, oda nerede.",
    gloss: [
      { de: "das Einzelzimmer", tr: "tek kişilik oda", en: "single room" },
      { de: "der Ausweis", tr: "kimlik", en: "ID card" },
      { de: "reservieren", tr: "ayırtmak", en: "to reserve" },
      { de: "der Aufzug", tr: "asansör", en: "elevator" },
      { de: "das Passwort", tr: "şifre", en: "password" },
      { de: "bestellen", tr: "sipariş etmek", en: "to order" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Herr Brandt", text: "Guten Abend und willkommen im Hotel Lindenhof. Wie kann ich Ihnen helfen?" },
      { speaker: "Frau Yilmaz", text: "Guten Abend. Ich habe ein Zimmer reserviert. Mein Name ist Elif Yilmaz." },
      { speaker: "Herr Brandt", text: "Einen Moment, bitte ... Ja, hier: ein Einzelzimmer für drei Nächte, bis Freitag. Ihren Ausweis, bitte." },
      { speaker: "Frau Yilmaz", text: "Hier, bitte. Ist das Frühstück im Preis?" },
      { speaker: "Herr Brandt", text: "Ja, das Frühstück kostet nichts extra. Es gibt Frühstück von halb sieben bis zehn Uhr im ersten Stock." },
      { speaker: "Frau Yilmaz", text: "Sehr gut. Und gibt es hier WLAN?" },
      { speaker: "Herr Brandt", text: "Ja, das Passwort steht auf Ihrer Karte. Ihr Zimmer ist im dritten Stock, Nummer dreihundertzwölf. Der Aufzug ist dort links." },
      { speaker: "Frau Yilmaz", text: "Danke. Kann ich für morgen früh ein Taxi bestellen? Um sieben Uhr?" },
      { speaker: "Herr Brandt", text: "Natürlich, ich bestelle es für Sie. Das Taxi wartet dann vor dem Eingang. Einen schönen Abend!" },
    ],
    questions: [
      {
        text: "Wie lange bleibt Frau Yilmaz im Hotel?",
        options: ["drei Nächte", "eine Woche", "zwei Nächte"],
        answer: 0,
        explain: "„ein Einzelzimmer für drei Nächte, bis Freitag“.",
      },
      {
        text: "Was möchte Herr Brandt sehen?",
        options: ["ihre Kreditkarte", "ihren Ausweis", "ihre Reservierung auf Papier"],
        answer: 1,
        explain: "„Ihren Ausweis, bitte.“ Kadın kimliğini veriyor.",
      },
      {
        kind: "truefalse",
        text: "Das Frühstück kostet extra.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„das Frühstück kostet nichts extra“ — kahvaltı fiyata dahil.",
      },
      {
        kind: "gapfill",
        text: "Das Zimmer ist im ___ Stock.",
        options: [],
        answer: 0,
        accept: ["dritten", "3."],
        explain: "„Ihr Zimmer ist im dritten Stock“; kahvaltı birinci katta.",
      },
      {
        kind: "short_answer",
        text: "Wo steht das Passwort für das WLAN?",
        options: [],
        answer: 0,
        accept: ["auf der Karte", "auf ihrer Karte", "auf der Zimmerkarte"],
        explain: "„das Passwort steht auf Ihrer Karte“.",
      },
      {
        text: "Wann kommt das Taxi?",
        options: ["heute Abend", "um halb sieben", "morgen um sieben Uhr"],
        answer: 2,
        explain: "„Kann ich für morgen früh ein Taxi bestellen? Um sieben Uhr?“ — resepsiyon siparişi veriyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w13",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Danke für die schönen Tage",
    genre: "personal",
    intro: "Bir arkadaşının ailesinde birkaç gün misafir kaldın: önce iki cümle kur, sonra onlara kısa bir teşekkür kartı yaz.",
    gloss: [
      { de: "besonders", tr: "özellikle", en: "especially" },
      { de: "hoffen", tr: "ummak", en: "to hope" },
      { de: "besuchen", tr: "ziyaret etmek", en: "to visit" },
      { de: "die Woche", tr: "hafta", en: "week" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sizin yanınızdaki hafta çok güzeldi.",
        answer: "Die Woche bei euch war sehr schön.",
        alternatives: ["Bei euch war die Woche sehr schön."],
        hint: "„war“, „sein“ fiilinin geçmişidir ve ikinci sırada durur; „bei euch“ = sizin yanınızda.",
      },
      {
        kind: "build",
        tr: "Gelecek yaz siz bizi ziyaret edebilirsiniz.",
        answer: "Nächsten Sommer könnt ihr uns besuchen.",
        alternatives: ["Ihr könnt uns nächsten Sommer besuchen."],
        hint: "„könnt“ ikinci sırada, „besuchen“ sonda; zaman başa gelince özne fiilin arkasına geçer.",
      },
      {
        kind: "free",
        prompt:
          "Misafir kaldığın aileye kısa bir teşekkür kartı yaz: ne için teşekkür ettiğini söyle, en çok neyi beğendiğini yaz (bir yer, bir yemek), şimdi nerede olduğunu anlat ve yeniden görüşmek istediğini belirt.",
        checklist: [
          "Aileye hitap et ve teşekkür et",
          "En çok neyi beğendiğini yaz",
          "Şimdi nerede olduğunu ve ne yaptığını söyle",
          "Yeniden görüşmek istediğini yaz ve vedalaş",
        ],
        minWords: 35,
        phrases: [
          { de: "Liebe Familie …,", tr: "Sevgili … ailesi,", en: "Dear … family," },
          { de: "Vielen Dank für …!", tr: "… için çok teşekkürler!", en: "Many thanks for …!" },
          { de: "Besonders schön war …", tr: "Özellikle … çok güzeldi.", en: "… was especially nice." },
          { de: "Jetzt bin ich wieder in …", tr: "Şimdi yine …'deyim.", en: "Now I'm back in …" },
          { de: "Ich hoffe, wir sehen uns bald wieder.", tr: "Umarım yakında yine görüşürüz.", en: "I hope we'll see each other again soon." },
        ],
        sample:
          "Liebe Familie Wagner, vielen Dank für die schönen Tage bei euch in Freiburg! Die Woche bei euch war sehr schön. " +
          "Besonders schön war der Tag im Schwarzwald, und der Apfelkuchen von Oma Helga war super. " +
          "Jetzt bin ich wieder in Istanbul und arbeite viel. Nächsten Sommer könnt ihr uns besuchen. " +
          "Ich hoffe, wir sehen uns bald wieder! Liebe Grüße, Aylin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s13",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Das helle l",
    genre: "pronounce",
    intro: "Almanca l her zaman incedir: dilin ucu üst dişlerin arkasına değer. Türkçedeki „al, bol“ kelimelerindeki kalın l'yi kullanma; altı cümlede çalış.",
    gloss: [
      { de: "alt", tr: "eski", en: "old" },
      { de: "voll", tr: "dolu", en: "full" },
      { de: "holen", tr: "gidip getirmek", en: "to fetch" },
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Das Hotel ist alt, aber schön.",
        tr: "Otel eski ama güzel.",
        hint: "„alt“ = ALT: a'dan sonra bile l ince kalır; Türkçedeki „alt“ kelimesindeki kalın l gibi değil.",
        confusions: [
          {
            heard: [],
            fix: "Dilin arkasını kaldırma; yalnız dilin ucu dişlerin arkasına değsin.",
            expected: "alt",
          },
        ],
      },
      {
        de: "Der Koffer ist schon voll.",
        tr: "Bavul çoktan doldu.",
        hint: "„voll“ = FOL: o'dan sonra da l ince ve kısa.",
        confusions: [
          {
            heard: [],
            fix: "Kalın l ile ses boğuk çıkar; l'yi ağzın önünde tut.",
            expected: "voll",
          },
        ],
      },
      {
        de: "Hallo, wir haben ein Zimmer für zwei Nächte.",
        tr: "Merhaba, iki gece için bir odamız var.",
        hint: "„Hallo“ = ha-LOO: vurgu ikinci hecede, l dişlerin arkasında.",
        confusions: [
          {
            heard: [],
            fix: "İki l tek ses verir ve incedir; a'dan sonra kalınlaşmaz.",
            expected: "Hallo",
          },
        ],
      },
      {
        de: "Bitte holen Sie den Schlüssel unten.",
        tr: "Lütfen anahtarı aşağıdan alın.",
        hint: "„holen“ HOO-len, „Schlüssel“ ŞLÜ-sel: iki kelimede de l aynı ince ses.",
        confusions: [
          {
            heard: [],
            fix: "o ve u'dan sonra da l'yi ince söyle; ses boğazdan değil ağzın önünden çıkar.",
            expected: "holen",
          },
        ],
      },
      {
        de: "Im Juli ist es nicht so kalt.",
        tr: "Temmuzda hava o kadar soğuk değil.",
        hint: "„Juli“, „kalt“: iki l de ince; „kalt“ta a'dan sonra dikkat.",
        confusions: [
          {
            heard: [],
            fix: "„kalt“ kelimesinde dili geri çekme; l, i'nin yanındaki kadar ince kalmalı.",
            expected: "kalt",
          },
        ],
      },
      {
        de: "Wir wollen morgen lange schlafen.",
        tr: "Yarın uzun uzun uyumak istiyoruz.",
        hint: "„wollen“, „lange“, „schlafen“: l önde de ortada da aynı ince ses.",
        confusions: [
          {
            heard: [],
            fix: "l'yi a ve o'nun yanında kalınlaştırma; her yerde aynı ince l.",
            expected: "wollen",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g13",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Doch, ich komme!",
    genre: "grammar",
    intro: "Olumsuz bir soruya „evet“ demek Almancada ayrı bir kelime ister: doch. Üç cevap kelimesinin nerede kullanıldığını öğren.",
    focus: "Cevap kelimeleri: ja, nein ve doch — olumsuz soruya cevap",
    gloss: [
      { de: "der Hunger", tr: "açlık", en: "hunger" },
      { de: "mitkommen", tr: "birlikte gelmek", en: "to come along" },
      { de: "schwimmen", tr: "yüzmek", en: "to swim" },
      { de: "richtig", tr: "doğru", en: "correct" },
      { de: "müde", tr: "yorgun", en: "tired" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Olumlu soru: ja ya da nein",
        tr: "Olumlu bir soruya cevap Türkçedeki gibidir: onaylıyorsan „ja“, reddediyorsan „nein“. Cevap kelimesinden sonra çoğu zaman tam bir cümle gelir.",
        examples: [
          { de: "Kommst du morgen? — Ja, ich komme.", tr: "Yarın geliyor musun? — Evet, geliyorum.", note: "onay → ja" },
          { de: "Hast du Hunger? — Nein, ich habe keinen Hunger.", tr: "Acıktın mı? — Hayır, aç değilim.", note: "ret → nein" },
          { de: "Ist das dein Koffer? — Ja, das ist mein Koffer.", tr: "Bu senin bavulun mu? — Evet, benim bavulum.", note: "onay → ja" },
        ],
      },
      {
        heading: "Olumsuz soru: doch ya da nein",
        tr: "Soruda „nicht“ ya da „kein“ varsa iş değişir. Olumsuzluğu düzeltip „hayır, aslında geliyorum“ demek istiyorsan „doch“ dersin. Olumsuzluğu onaylıyorsan „nein“ dersin. Türkçede burada „evet“ ile „hayır“ karışabilir; Almancada „doch“ karışıklığı çözer.",
        examples: [
          { de: "Kommst du nicht mit? — Doch, ich komme mit.", tr: "Gelmiyor musun? — Geliyorum tabii.", note: "olumsuzu düzeltiyor → doch" },
          { de: "Kommst du nicht mit? — Nein, ich bleibe zu Hause.", tr: "Gelmiyor musun? — Hayır, evde kalıyorum.", note: "olumsuzu onaylıyor → nein" },
          { de: "Hast du keine Zeit? — Doch, ich habe Zeit.", tr: "Vaktin yok mu? — Var, vaktim var.", note: "kein ile de doch" },
        ],
      },
      {
        heading: "Olumsuz bir söze itiraz",
        tr: "Soru olmasa da biri olumsuz bir şey söylediğinde ona itiraz etmek için „doch“ kullanılır. Burada „ja“ demek yanlış olur, çünkü „ja“ olumsuzu onaylıyormuş gibi duyulur.",
        examples: [
          { de: "Das ist nicht richtig. — Doch, das ist richtig!", tr: "Bu doğru değil. — Doğru, bal gibi doğru!", note: "itiraz → doch" },
          { de: "Du kannst nicht schwimmen. — Doch, ich kann schwimmen!", tr: "Yüzme bilmiyorsun. — Biliyorum!", note: "itiraz → doch" },
          { de: "Es gibt keine Milch mehr. — Doch, im Kühlschrank.", tr: "Hiç süt kalmadı. — Var, buzdolabında.", note: "kısa itiraz" },
        ],
      },
    ],
    questions: [
      {
        text: "Hast du keinen Hunger? — ___, ich möchte etwas essen.",
        options: ["Ja", "Doch", "Nein"],
        answer: 1,
        explain: "Soru olumsuz ve cevap onu düzeltiyor: aç olduğunu söylemek için doch.",
      },
      {
        text: "Bist du müde? — ___, ich gehe ins Bett.",
        options: ["Ja", "Doch", "Nicht"],
        answer: 0,
        explain: "Soru olumlu ve cevap onaylıyor; olumlu soruda onay ja ile verilir.",
      },
      {
        text: "Wohnst du nicht in Berlin? — Nein, ___",
        options: ["ich wohne in Berlin.", "doch, in Berlin.", "ich wohne in Hamburg."],
        answer: 2,
        explain: "„Nein“ olumsuzu onaylıyor: Berlin'de oturmuyor, başka bir şehirde oturuyor.",
      },
      {
        kind: "gapfill",
        text: "Kommst du nicht zur Party? — ___, ich komme um acht.",
        options: [],
        answer: 0,
        accept: ["Doch", "doch"],
        explain: "Olumsuz soruya olumlu cevap: doch.",
      },
      {
        kind: "gapfill",
        text: "Ist das dein Fahrrad? — ___, das ist mein Fahrrad.",
        options: [],
        answer: 0,
        accept: ["Ja", "ja"],
        explain: "Soru olumlu ve cevap onaylıyor: ja.",
      },
      {
        kind: "gapfill",
        text: "Hast du kein Auto? — ___, ich fahre immer mit dem Bus.",
        options: [],
        answer: 0,
        accept: ["Nein", "nein"],
        explain: "Arabası gerçekten yok; olumsuzu onaylayan cevap nein'dır.",
      },
      {
        kind: "gapfill",
        text: "Du sprichst kein Deutsch. — ___, ich spreche ein bisschen Deutsch!",
        options: [],
        answer: 0,
        accept: ["Doch", "doch"],
        explain: "Olumsuz bir söze itiraz ediliyor; itiraz kelimesi doch'tur.",
      },
      {
        kind: "order",
        text: "Cevabı doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Doch,", "ich", "habe", "heute", "Zeit"],
        explain: "„Doch“ cümlenin dışında durur; ardından özne ve ikinci sırada fiil gelir: Doch, ich habe heute Zeit.",
      },
      {
        kind: "truefalse",
        text: "„Hast du keine Kinder? — Ja, ich habe zwei Kinder.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Olumsuz soruya olumlu cevap doch ister: „Doch, ich habe zwei Kinder.“",
      },
      {
        kind: "truefalse",
        text: "„Gehst du nicht ins Kino? — Nein, ich bin zu müde.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Sinemaya gitmiyor; olumsuzu onaylayan cevap nein ile doğru kurulmuş.",
      },
    ],
  },
];

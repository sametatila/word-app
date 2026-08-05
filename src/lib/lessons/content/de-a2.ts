import type { Lesson } from "../types";

/**
 * A2 dersleri — Almanca.
 *
 * A1 cümlenin iskeletini kurdu; A2 o iskeleti zamanda ve nezakette esnetiyor.
 * Üçü de Türkçe konuşanın doğrudan karşılığı olmayan yapılar: geçmiş zamanın
 * iki parçaya bölünmesi, edatların hâl seçmesi, ve nezaketin ayrı bir fiil
 * biçimiyle kurulması.
 */
export const deA2: Lesson[] = [
  {
    id: "de-a2-l1",
    level: "A2",
    course: "de",
    ruleId: "Perfekt",
    title: "Geçmiş zaman: haben/sein + Partizip",
    summary: "Konuşma dilinde geçmiş iki parçalıdır ve ikinci parça sona gider.",
    minutes: 8,
    rule:
      "Almanca konuşma dilinde geçmiş zaman Perfekt ile kurulur: yardımcı fiil (haben ya da sein) İKİNCİ sırada, asıl fiilin Partizip biçimi cümlenin SONUNDA. Hareket ve durum değişikliği bildiren fiiller „sein“ alır (gehen, kommen, fahren, bleiben), gerisi „haben“.",
    examples: [
      { de: "Ich habe gestern gearbeitet.", tr: "Dün çalıştım." },
      { de: "Wir sind nach Berlin gefahren.", tr: "Berlin'e gittik." },
      { de: "Hast du das Buch gelesen?", tr: "Kitabı okudun mu?" },
    ],
    checks: [
      {
        kind: "fill",
        prompt: "„Ich ___ einen Film ___.“ (sehen)",
        options: ["habe … gesehen", "bin … gesehen", "habe … sehen"],
        answer: "habe … gesehen",
        why: "„sehen“ hareket bildirmez, „haben“ alır; Partizip biçimi „gesehen“ ve sona gider.",
      },
      {
        kind: "fill",
        prompt: "„Wir ___ ins Kino ___.“ (gehen)",
        options: ["haben … gegangen", "sind … gegangen", "sind … gehen"],
        answer: "sind … gegangen",
        why: "„gehen“ yer değişikliği bildirir, yardımcı fiili „sein“dir.",
      },
      {
        kind: "pick",
        prompt: "Hangisi doğru?",
        options: [
          "Ich habe gestern gearbeitet.",
          "Ich gearbeitet habe gestern.",
          "Ich habe gearbeitet gestern.",
        ],
        answer: "Ich habe gestern gearbeitet.",
        why: "Yardımcı fiil ikinci, Partizip en sonda; zaman ifadesi ikisinin arasında.",
      },
      {
        kind: "spot",
        prompt: "Hangi cümlede hata var?",
        options: [
          "Ich habe viel gelernt.",
          "Wir sind spät gekommen.",
          "Ich bin einen Film gesehen.",
        ],
        answer: "Ich bin einen Film gesehen.",
        why: "„sehen“ hareket bildirmez, „haben“ alır: „Ich habe einen Film gesehen.“",
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın dün ne yaptığını soruyor. Perfekt ile anlat: hem „haben“ hem „sein“ alan fiiller kullanmaya çalış (arbeiten, essen, gehen, fahren).",
      partner: "meraklı bir arkadaş",
      opening: "Hey! Was hast du gestern gemacht?",
      openingTr: "Selam! Dün ne yaptın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-l2",
    level: "A2",
    course: "de",
    ruleId: "Wechselpraepositionen",
    title: "Nerede / nereye: in, auf, an",
    summary: "Aynı edat, hareket varsa Akkusativ, yoksa Dativ ister.",
    minutes: 8,
    rule:
      "in, auf, an, unter, über gibi edatlar iki hâl birden alır ve seçim soruya bağlıdır. „Wohin?“ (nereye) — hareket var, Akkusativ. „Wo?“ (nerede) — hareket yok, Dativ. Türkçede bu ayrım ekle yapıldığı için (eve / evde) edatın hâl değiştirmesi beklenmedik geliyor.",
    examples: [
      { de: "Ich gehe in die Stadt.", tr: "Şehre gidiyorum. (nereye → Akkusativ)" },
      { de: "Ich bin in der Stadt.", tr: "Şehirdeyim. (nerede → Dativ)" },
      { de: "Er legt das Buch auf den Tisch.", tr: "Kitabı masaya koyuyor." },
      { de: "Das Buch liegt auf dem Tisch.", tr: "Kitap masada duruyor." },
    ],
    checks: [
      {
        kind: "fill",
        prompt: "„Ich fahre ___ die Schweiz.“",
        options: ["in", "in der", "in die"],
        answer: "in die",
        why: "Hareket var („fahre“), yani Akkusativ: „in die Schweiz“.",
      },
      {
        kind: "fill",
        prompt: "„Wir wohnen ___ Berlin.“",
        options: ["in", "in die", "nach"],
        answer: "in",
        why: "Şehir adlarında „wohnen“ ile yalın „in“ kullanılır; hareket yok.",
      },
      {
        kind: "fill",
        prompt: "„Der Schlüssel liegt ___ Tisch.“",
        options: ["auf den", "auf dem", "auf das"],
        answer: "auf dem",
        why: "„liegen“ durum bildirir, hareket yok → Dativ: „auf dem Tisch“.",
      },
      {
        kind: "spot",
        prompt: "Hangi cümlede hata var?",
        options: [
          "Ich gehe in die Küche.",
          "Das Glas steht auf den Tisch.",
          "Wir sind im Garten.",
        ],
        answer: "Das Glas steht auf den Tisch.",
        why: "„stehen“ durum bildirir, hareket yok → Dativ: „auf dem Tisch“.",
      },
    ],
    roleplay: {
      scene:
        "Evde bir şey kaybettin ve ev arkadaşına soruyorsun. Hem „nerede“ hem „nereye“ soruları kur — edatın hâl değiştirdiği yerleri bilerek kullan.",
      partner: "yardım etmeye çalışan ev arkadaşı",
      opening: "Was suchst du denn? Hast du im Wohnzimmer geschaut?",
      openingTr: "Ne arıyorsun? Oturma odasına baktın mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-l3",
    level: "A2",
    course: "de",
    ruleId: "Konjunktiv-Hoeflichkeit",
    title: "Kibar istek: möchte, hätte gern, könnten Sie",
    summary: "İstek doğrudan söylenmez; kalıp değişir.",
    minutes: 7,
    rule:
      "Almancada istek „will“ ile söylenmez — kaba durur. Yerine kalıplar kullanılır: „ich möchte…“, „ich hätte gern…“, „könnten Sie…?“. Türkçede nezaket tonla kurulabildiği için bu kalıpları atlamak sık görülüyor ama Almancada ton yetmiyor, biçim değişmek zorunda.",
    examples: [
      { de: "Ich möchte einen Kaffee, bitte.", tr: "Bir kahve istiyorum, lütfen." },
      { de: "Ich hätte gern die Rechnung.", tr: "Hesabı alabilir miyim." },
      { de: "Könnten Sie mir helfen?", tr: "Bana yardım edebilir misiniz?" },
    ],
    checks: [
      {
        kind: "pick",
        prompt: "Bir restoranda en uygunu hangisi?",
        options: ["Ich will ein Bier.", "Ich möchte ein Bier, bitte.", "Gib mir ein Bier."],
        answer: "Ich möchte ein Bier, bitte.",
        why: "„will“ ve emir kipi kaba durur; „möchte“ + „bitte“ nötr ve kibar.",
      },
      {
        kind: "pick",
        prompt: "Yardım isterken hangisi kibar?",
        options: ["Helfen Sie mir!", "Können Sie mir helfen?", "Könnten Sie mir helfen?"],
        answer: "Könnten Sie mir helfen?",
        why: "„könnten“ „können“in kibar biçimi; ikisi de olur ama „könnten“ daha yumuşak.",
      },
      {
        kind: "pick",
        prompt: "„Ich ___ gern einen Tisch für zwei.“",
        options: ["habe", "hätte", "will"],
        answer: "hätte",
        why: "„hätte gern“ kalıp hâlinde kibar istek bildirir.",
      },
      {
        kind: "spot",
        prompt: "Hangi cümle bir restoranda kaba durur?",
        options: [
          "Ich hätte gern die Karte.",
          "Ich will die Karte.",
          "Könnten Sie mir die Karte bringen?",
        ],
        answer: "Ich will die Karte.",
        why: "„will“ doğrudan istek bildirir ve kaba durur; „möchte“ ya da „hätte gern“ kullanılır.",
      },
    ],
    roleplay: {
      scene:
        "Bir restorandasın. Sipariş ver, bir şey rica et ve sonunda hesabı iste. Her istekte kibar kalıplardan birini kullan.",
      partner: "resmî konuşan bir garson",
      opening: "Guten Abend! Haben Sie schon gewählt?",
      openingTr: "İyi akşamlar! Seçiminizi yaptınız mı?",
      minTurns: 4,
    },
  },
];

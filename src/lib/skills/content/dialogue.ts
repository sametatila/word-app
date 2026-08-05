import type { SpeakingDialogueExercise } from "../types";

/**
 * Karşılıklı konuşma alıştırmaları.
 *
 * Tema kapalı seçilir — kafede sipariş gibi. Sebebi mimari: konuşmayı anlayan
 * şey bir dil modeli değil, önceden yazılmış dallar arasında niyet eşleştirmesi
 * (bkz. lib/dialogue.ts). Kapalı bir temada öğrencinin söyleyebileceği şeylerin
 * listesi gerçekten kısadır; açık bir temada ("bugün nasıl geçti?") aynı yapı
 * hemen çuvallar.
 *
 * `match` alanına kök yazılır, tam cümle değil: tanıyıcı çekimi ve noktalamayı
 * her seferinde farklı yazar, öğrenci de tam cümle kurmayabilir. "kaffee" kökü
 * hem "Einen Kaffee, bitte" hem "Ich hätte gern einen Kaffee" içinde bulunur.
 *
 * Her dalın `uses` alanı, o cevapla fiilen kullanılmış sayılan kalıpları
 * taşır; konuşma sonunda öğrenciye hangilerine hiç gelmediği gösterilir.
 * Pekiştirme kısmı bu ve ölçüsü uydurma değil — gerçekten tutan dallardan
 * toplanıyor.
 */
export const dialogues: SpeakingDialogueExercise[] = [
  {
    id: "a2-d1",
    level: "A2",
    skill: "speaking",
    title: "Im Café",
    genre: "Diyalog",
    intro:
      "Garson seninle konuşuyor. Sorularına yüksek sesle Almanca cevap ver — ne dediğine göre konuşma farklı ilerler.",
    minutes: 6,
    gloss: [
      { de: "bestellen", tr: "sipariş vermek" },
      { de: "die Rechnung", tr: "hesap" },
      { de: "bar zahlen", tr: "nakit ödemek" },
      { de: "mit Karte", tr: "kartla" },
      { de: "der Kuchen", tr: "kek, pasta" },
    ],
    targets: [
      { de: "Ich hätte gern …", tr: "… istiyorum (kibar)" },
      { de: "mit Milch / ohne Zucker", tr: "sütlü / şekersiz" },
      { de: "Was empfehlen Sie?", tr: "Ne tavsiye edersiniz?" },
      { de: "Die Rechnung, bitte.", tr: "Hesap, lütfen." },
      { de: "Ich zahle bar / mit Karte.", tr: "Nakit / kartla ödüyorum." },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Guten Tag! Was möchten Sie trinken?",
        askTr: "İyi günler! Ne içmek istersiniz?",
        cue: "Bir içecek söyle: kahve, çay ya da su. „Ich hätte gern einen Kaffee.“",
        replies: [
          {
            match: ["kaffee", "espresso", "cappuccino"],
            say: "Einen Kaffee, sehr gern. Möchten Sie ihn mit Milch?",
            sayTr: "Bir kahve, memnuniyetle. Sütlü ister misiniz?",
            next: "milk",
            uses: ["Ich hätte gern …"],
          },
          {
            match: ["tee", "kräutertee"],
            say: "Ein Tee, gute Wahl. Möchten Sie Zucker dazu?",
            sayTr: "Bir çay, iyi seçim. Yanında şeker ister misiniz?",
            next: "milk",
            uses: ["Ich hätte gern …"],
          },
          {
            match: ["wasser", "mineralwasser"],
            say: "Ein Wasser, kommt sofort. Mit Kohlensäure oder ohne?",
            sayTr: "Bir su, hemen geliyor. Gazlı mı gazsız mı?",
            next: "milk",
            uses: ["Ich hätte gern …"],
          },
          {
            match: ["empfehl", "vorschlag", "was ist gut"],
            say: "Unser Apfelkuchen ist heute sehr gut. Und dazu einen Kaffee?",
            sayTr: "Elmalı keğimiz bugün çok iyi. Yanına bir kahve?",
            next: "milk",
            uses: ["Was empfehlen Sie?"],
          },
        ],
        fallback: {
          say: "Entschuldigung, das habe ich nicht verstanden.",
          sayTr: "Pardon, anlayamadım.",
          example: "Ich hätte gern einen Kaffee.",
        },
      },
      {
        id: "milk",
        ask: "Also — mit Milch und Zucker?",
        askTr: "Peki — sütlü ve şekerli mi?",
        cue: "Kabul et ya da reddet: „Ja, mit Milch.“ / „Nein, ohne Zucker.“",
        replies: [
          {
            match: ["ohne", "kein", "keine", "nein", "nicht"],
            say: "Alles klar, ohne. Möchten Sie auch etwas essen?",
            sayTr: "Tamam, olmasın. Bir şey yemek de ister misiniz?",
            next: "food",
            uses: ["mit Milch / ohne Zucker"],
          },
          {
            match: ["milch", "zucker", "ja", "gern", "bitte"],
            say: "Sehr gern. Möchten Sie auch etwas essen?",
            sayTr: "Memnuniyetle. Bir şey yemek de ister misiniz?",
            next: "food",
            uses: ["mit Milch / ohne Zucker"],
          },
        ],
        fallback: {
          say: "Wie bitte? Mit Milch oder ohne?",
          sayTr: "Efendim? Sütlü mü sütsüz mü?",
          example: "Ja, mit Milch, bitte.",
        },
      },
      {
        id: "food",
        ask: "Möchten Sie auch ein Stück Kuchen?",
        askTr: "Bir dilim kek de ister misiniz?",
        cue: "İstersen söyle, istemezsen kibarca reddet: „Nein, danke.“",
        replies: [
          {
            match: ["kuchen", "stück", "apfel", "schokolade", "ja", "gern"],
            say: "Ein Stück Apfelkuchen, kommt sofort.",
            sayTr: "Bir dilim elmalı kek, hemen geliyor.",
            next: "bill",
            uses: ["Ich hätte gern …"],
          },
          {
            match: ["nein", "danke", "nichts", "kein"],
            say: "Kein Problem. Sagen Sie Bescheid, wenn Sie noch etwas brauchen.",
            sayTr: "Sorun değil. Bir şeye ihtiyacınız olursa söyleyin.",
            next: "bill",
          },
        ],
        fallback: {
          say: "Möchten Sie etwas essen, ja oder nein?",
          sayTr: "Bir şey yemek ister misiniz, evet mi hayır mı?",
          example: "Nein, danke.",
        },
      },
      {
        id: "bill",
        ask: "Sonst noch etwas?",
        askTr: "Başka bir şey?",
        cue: "Hesabı iste: „Die Rechnung, bitte.“",
        replies: [
          {
            match: ["rechnung", "zahlen", "bezahlen", "bitte zahlen"],
            say: "Gern. Das macht vier Euro achtzig. Zahlen Sie bar oder mit Karte?",
            sayTr: "Tabii. Dört euro seksen ediyor. Nakit mi kartla mı ödersiniz?",
            next: "pay",
            uses: ["Die Rechnung, bitte."],
          },
          {
            match: ["nein", "danke", "das war", "nichts"],
            say: "Gut. Möchten Sie dann zahlen? Das macht vier Euro achtzig.",
            sayTr: "Peki. Ödemek ister misiniz? Dört euro seksen ediyor.",
            next: "pay",
          },
        ],
        fallback: {
          say: "Brauchen Sie noch etwas?",
          sayTr: "Başka bir şeye ihtiyacınız var mı?",
          example: "Die Rechnung, bitte.",
        },
      },
      {
        id: "pay",
        ask: "Bar oder mit Karte?",
        askTr: "Nakit mi kartla mı?",
        cue: "Ödeme şeklini söyle: „Ich zahle bar.“ / „Mit Karte, bitte.“",
        replies: [
          {
            match: ["karte", "kreditkarte", "ec"],
            say: "Mit Karte, gern. Bitte hier auflegen. Danke schön!",
            sayTr: "Kartla, tabii. Buraya okutun lütfen. Teşekkürler!",
            next: "bye",
            uses: ["Ich zahle bar / mit Karte."],
          },
          {
            match: ["bar", "bargeld", "cash"],
            say: "Bar, sehr gut. Fünf Euro — hier sind zwanzig Cent zurück.",
            sayTr: "Nakit, çok iyi. Beş euro — yirmi sent para üstü.",
            next: "bye",
            uses: ["Ich zahle bar / mit Karte."],
          },
        ],
        fallback: {
          say: "Bar oder mit Karte?",
          sayTr: "Nakit mi kartla mı?",
          example: "Ich zahle mit Karte.",
        },
      },
      {
        id: "bye",
        ask: "Vielen Dank und einen schönen Tag noch!",
        askTr: "Çok teşekkürler, iyi günler!",
        cue: "Vedalaş: „Danke, ebenfalls!“ / „Auf Wiedersehen.“",
        replies: [
          {
            match: ["danke", "ebenfalls", "wiedersehen", "tschüss", "ihnen auch"],
            say: "Auf Wiedersehen!",
            sayTr: "Görüşmek üzere!",
            uses: ["Die Rechnung, bitte."],
          },
        ],
        fallback: {
          say: "Auf Wiedersehen!",
          sayTr: "Görüşmek üzere!",
          example: "Danke, ebenfalls!",
        },
      },
    ],
  },
];

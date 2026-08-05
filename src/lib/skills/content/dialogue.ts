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

  // ─────────────────── A1 · yol sormak ───────────────────
  //
  // Kafe diyaloğu A2; havuzda başlangıç seviyesi yoktu. Yol sormak bunun için
  // iyi bir tema: kelime dağarcığı dar, kalıplar sayılı ve gerçekten ilk
  // günden lazım olan şey.
  {
    id: "a1-d1",
    level: "A1",
    skill: "speaking",
    title: "Nach dem Weg fragen",
    genre: "Diyalog",
    intro:
      "Sokakta birine yol soruyorsun. Yüksek sesle Almanca cevap ver — ne dediğine göre konuşma değişir.",
    minutes: 5,
    gloss: [
      { de: "der Bahnhof", tr: "tren istasyonu" },
      { de: "die Apotheke", tr: "eczane" },
      { de: "geradeaus", tr: "dümdüz" },
      { de: "links / rechts", tr: "sol / sağ" },
      { de: "zu Fuß", tr: "yürüyerek" },
    ],
    targets: [
      { de: "Entschuldigung, wo ist …?", tr: "Affedersiniz, … nerede?" },
      { de: "Wie komme ich zum …?", tr: "…'a nasıl giderim?" },
      { de: "Ist es weit?", tr: "Uzak mı?" },
      { de: "Vielen Dank!", tr: "Çok teşekkürler!" },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Entschuldigung, kann ich Ihnen helfen? Sie sehen verloren aus.",
        askTr: "Affedersiniz, yardım edebilir miyim? Kaybolmuş görünüyorsunuz.",
        cue: "Nereye gitmek istediğini söyle: „Wo ist der Bahnhof?“ ya da „Ich suche die Apotheke.“",
        replies: [
          {
            match: ["bahnhof", "zug", "bahn"],
            say: "Der Bahnhof? Gehen Sie geradeaus, dann links.",
            sayTr: "İstasyon mu? Dümdüz gidin, sonra sola.",
            next: "far",
            uses: ["Entschuldigung, wo ist …?"],
          },
          {
            match: ["apotheke", "medikament"],
            say: "Die Apotheke ist gleich um die Ecke, rechts.",
            sayTr: "Eczane hemen köşeyi dönünce, sağda.",
            next: "far",
            uses: ["Entschuldigung, wo ist …?"],
          },
          {
            match: ["supermarkt", "einkaufen", "laden"],
            say: "Der Supermarkt ist dort drüben, neben der Bank.",
            sayTr: "Süpermarket şurada, bankanın yanında.",
            next: "far",
            uses: ["Wie komme ich zum …?"],
          },
        ],
        fallback: {
          say: "Entschuldigung, das habe ich nicht verstanden. Wohin möchten Sie?",
          sayTr: "Pardon, anlayamadım. Nereye gitmek istiyorsunuz?",
          example: "Wo ist der Bahnhof?",
        },
      },
      {
        id: "far",
        ask: "Möchten Sie noch etwas wissen? Ist es weit für Sie?",
        askTr: "Başka bir şey öğrenmek ister misiniz? Sizin için uzak mı?",
        cue: "Uzak olup olmadığını sor ya da yürüyerek mi gideceğini söyle.",
        replies: [
          {
            match: ["weit", "wie lang", "wie weit", "minuten"],
            say: "Nein, nur fünf Minuten zu Fuß.",
            sayTr: "Hayır, yürüyerek sadece beş dakika.",
            next: "thanks",
            uses: ["Ist es weit?"],
          },
          {
            match: ["fuss", "fuß", "laufen", "gehen"],
            say: "Ja, zu Fuß ist es sehr einfach.",
            sayTr: "Evet, yürüyerek çok kolay.",
            next: "thanks",
            uses: ["Ist es weit?"],
          },
          {
            match: ["bus", "tram", "taxi"],
            say: "Mit dem Bus geht es auch — Linie 4.",
            sayTr: "Otobüsle de olur — 4 numaralı hat.",
            next: "thanks",
            uses: ["Wie komme ich zum …?"],
          },
        ],
        fallback: {
          say: "Es ist nicht weit. Haben Sie noch eine Frage?",
          sayTr: "Uzak değil. Başka sorunuz var mı?",
          example: "Ist es weit von hier?",
        },
      },
      {
        id: "thanks",
        ask: "Gern geschehen. Alles klar?",
        askTr: "Rica ederim. Her şey tamam mı?",
        cue: "Teşekkür et: „Vielen Dank!“",
        replies: [
          {
            match: ["danke", "dank", "vielen"],
            say: "Bitte schön. Einen schönen Tag noch!",
            sayTr: "Rica ederim. İyi günler!",
            uses: ["Vielen Dank!"],
          },
          {
            match: ["ja", "alles klar", "klar", "gut"],
            say: "Sehr gut. Viel Erfolg!",
            sayTr: "Çok iyi. Başarılar!",
            uses: ["Vielen Dank!"],
          },
        ],
        fallback: {
          say: "Schönen Tag noch!",
          sayTr: "İyi günler!",
          example: "Vielen Dank!",
        },
      },
    ],
  },

  // ─────────────────── Zürih · dükkânda ───────────────────
  //
  // Lehçede diyalog, telaffuz alıştırmalarının aksine **çalışıyor**. Sebep
  // eşleştirmenin biçimi: `matchReply` tam cümle değil kök arıyor, dolayısıyla
  // tanıyıcı lehçeyi standart Almancaya çevirse bile içerik kelimesi çoğu
  // zaman tanınabilir kalıyor.
  //
  // Yine de köklere Hochdeutsch karşılığı da yazılıyor ("chäs" yanına "käse"):
  // tanıyıcı de-CH modeliyle standart biçimi üretme eğiliminde ve yalnızca
  // lehçe kökü yazmak, doğru konuşan öğrencinin cevabını kaçırmak olurdu.
  // Fazladan kök yanlış eşleşme riski taşımıyor — ikisi de aynı dala gidiyor.
  {
    id: "zh-a2-d1",
    level: "A2",
    skill: "speaking",
    course: "gsw-zh",
    title: "Im Lade",
    genre: "Diyalog",
    intro:
      "Dükkânda alışveriş yapıyorsun. Züritüütsch konuş — Hochdeutsch söylersen de anlaşılır, ama lehçeyi dene.",
    minutes: 6,
    gloss: [
      { de: "de Lade", tr: "dükkân (der Laden)" },
      { de: "de Chäs", tr: "peynir (der Käse)" },
      { de: "s Brot", tr: "ekmek" },
      { de: "wieviel", tr: "ne kadar" },
      { de: "zäme", tr: "toplam, birlikte (zusammen)" },
    ],
    targets: [
      { de: "Ich hätt gern …", tr: "… istiyorum" },
      { de: "Wieviel choschtet das?", tr: "Bu ne kadar?" },
      { de: "Das isch alles.", tr: "Hepsi bu." },
      { de: "Merci vilmal.", tr: "Çok teşekkürler." },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Grüezi! Was chan ich für Sie tue?",
        askTr: "Merhaba! Sizin için ne yapabilirim?",
        cue: "Ne istediğini söyle: „Ich hätt gern es Brot.“ ya da „Ich hätt gern Chäs.“",
        replies: [
          {
            // Lehçe kökü ve tanıyıcının üretebileceği Hochdeutsch biçimi birlikte.
            match: ["brot", "broot"],
            say: "Es Brot, gern. Suscht no öppis?",
            sayTr: "Bir ekmek, tabii. Başka bir şey?",
            next: "more",
            uses: ["Ich hätt gern …"],
          },
          {
            match: ["chäs", "käse", "chaes"],
            say: "Chäs, sehr gern. Wieviel möchtet Sie?",
            sayTr: "Peynir, memnuniyetle. Ne kadar istersiniz?",
            next: "more",
            uses: ["Ich hätt gern …"],
          },
          {
            match: ["milch", "joghurt"],
            say: "Milch han ich do. Suscht no öppis?",
            sayTr: "Süt burada. Başka bir şey?",
            next: "more",
            uses: ["Ich hätt gern …"],
          },
        ],
        fallback: {
          say: "Entschuldigung, das han ich nöd verstande. Was hättet Sie gern?",
          sayTr: "Pardon, anlamadım. Ne istersiniz?",
          example: "Ich hätt gern es Brot.",
        },
      },
      {
        id: "more",
        ask: "Suscht no öppis, oder isch das alles?",
        askTr: "Başka bir şey mi, yoksa hepsi bu mu?",
        cue: "Fiyatı sor ya da bittiğini söyle: „Das isch alles.“",
        replies: [
          {
            match: ["wieviel", "wie viel", "choschtet", "kostet", "priis", "preis"],
            say: "Das macht achti Franke zäme.",
            sayTr: "Toplam sekiz frank.",
            next: "pay",
            uses: ["Wieviel choschtet das?"],
          },
          {
            match: ["alles", "das isch", "nüt me", "fertig"],
            say: "Guet, denn machts achti Franke.",
            sayTr: "Tamam, o zaman sekiz frank.",
            next: "pay",
            uses: ["Das isch alles."],
          },
        ],
        fallback: {
          say: "Also guet. Wottet Sie no öppis?",
          sayTr: "Peki. Başka bir şey ister misiniz?",
          example: "Das isch alles.",
        },
      },
      {
        id: "pay",
        ask: "Zahlet Sie bar oder mit Charte?",
        askTr: "Nakit mi kartla mı ödeyeceksiniz?",
        cue: "Nasıl ödeyeceğini söyle: „bar“ ya da „mit Charte“.",
        replies: [
          {
            match: ["bar", "baar", "cash"],
            say: "Bar, guet. Merci vilmal und en schöne Tag!",
            sayTr: "Nakit, tamam. Çok teşekkürler ve iyi günler!",
            uses: ["Merci vilmal."],
          },
          {
            match: ["charte", "karte", "kart"],
            say: "Mit Charte, gern. Merci vilmal!",
            sayTr: "Kartla, tabii. Çok teşekkürler!",
            uses: ["Merci vilmal."],
          },
        ],
        fallback: {
          say: "Kei Problem. Bar oder mit Charte?",
          sayTr: "Sorun değil. Nakit mi kartla mı?",
          example: "Ich zahle bar.",
        },
      },
    ],
  },
];

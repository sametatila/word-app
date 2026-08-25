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
    theme: { role: "Kellnerin in einem kleinen Café", goal: "Sipariş al, süt/şeker sor, bir tatlı tavsiye et, sonunda hesabı getir ve ödeme şeklini sor.", limits: "Fiyat sorulursa 3–5 Euro arası söyle." },
    level: "A2",
    skill: "speaking",
    title: "Im Café",
    genre: "Diyalog",
    intro:
      "Garson seninle konuşuyor. Sorularına yüksek sesle Almanca cevap ver — ne dediğine göre konuşma farklı ilerler.",
    minutes: 6,
    gloss: [
      { de: "bestellen", tr: "sipariş etmek", en: "to order" },
      { de: "die Rechnung", tr: "hesap", en: "bill" },
      { de: "bar zahlen", tr: "nakit ödemek", en: "to pay in cash" },
      { de: "mit Karte", tr: "kartla", en: "by card" },
      { de: "der Kuchen", tr: "kek", en: "cake" },
    ],
    targets: [
      { de: "Ich hätte gern …", tr: "… istiyorum", en: "I would like …" },
      { de: "mit Milch / ohne Zucker", tr: "sütlü / şekersiz", en: "with milk / without sugar" },
      { de: "Was empfehlen Sie?", tr: "Ne tavsiye edersiniz?", en: "What do you recommend?" },
      { de: "Die Rechnung, bitte.", tr: "Hesap, lütfen.", en: "The bill, please." },
      { de: "Ich zahle bar / mit Karte.", tr: "Nakit / kartla ödüyorum.", en: "I pay in cash / by card." },
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
    theme: { role: "Passantin auf der Straße", goal: "Öğrenci bir yer soruyor (istasyon, eczane, market): yolu kısa tarif et, ne kadar uzak olduğunu söyle, yürüyerek mi otobüsle mi olduğunu sor.", limits: "Yön tarifini iki adımda tut (links, rechts, geradeaus)." },
    level: "A1",
    skill: "speaking",
    title: "Nach dem Weg fragen",
    genre: "Diyalog",
    intro:
      "Sokakta birine yol soruyorsun. Yüksek sesle Almanca cevap ver — ne dediğine göre konuşma değişir.",
    minutes: 5,
    gloss: [
      { de: "der Bahnhof", tr: "tren istasyonu", en: "train station" },
      { de: "die Apotheke", tr: "eczane", en: "pharmacy" },
      { de: "geradeaus", tr: "dümdüz", en: "straight ahead" },
      { de: "links / rechts", tr: "sol / sağ", en: "left / right" },
      { de: "zu Fuß", tr: "yürüyerek", en: "on foot" },
    ],
    targets: [
      { de: "Entschuldigung, wo ist …?", tr: "Affedersiniz, … nerede?", en: "Excuse me, where is …?" },
      { de: "Wie komme ich zum …?", tr: "…'a nasıl giderim?", en: "How do I get to …?" },
      { de: "Ist es weit?", tr: "Uzak mı?", en: "Is it far?" },
      { de: "Vielen Dank!", tr: "Çok teşekkürler!", en: "Thank you very much!" },
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
    theme: { role: "Verchöiferin imene chliine Lade", goal: "Ne istediğini sor, miktar ve fiyat söyle, başka bir şey isteyip istemediğini sor, ödemeyi al." },
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

  // ─────────────────── B1 · doktorda ───────────────────
  //
  // Kapalı tema kuralına uyan ama gerçekten lazım olan bir durum: şikâyetini
  // anlatmak, süreyi söylemek, tavsiyeyi anlamak. Söylenebileceklerin listesi
  // kısa (birkaç organ, birkaç süre ifadesi) ama kelimeler bilinmediğinde
  // insan gerçekten çaresiz kalıyor — bu yüzden ezberlenmesi değil,
  // söylenebilmesi önemli.
  {
    id: "b1-d1",
    theme: { role: "Ärztin in einer Hausarztpraxis", goal: "Şikâyeti ve süresini sor, iki kısa muayene sorusu sor, tanı ve tavsiye ver, gerekirse reçete ve kontrol randevusu.", limits: "Ciddi tanı koyma; öneriler dinlenme, sıvı, ilaç düzeyinde kalsın." },
    level: "B1",
    skill: "speaking",
    title: "Beim Arzt",
    genre: "Diyalog",
    intro:
      "Doktordasın. Şikâyetini yüksek sesle Almanca anlat — ne dediğine göre doktor farklı sorular soruyor.",
    minutes: 7,
    gloss: [
      { de: "die Schmerzen", tr: "ağrı", en: "pain" },
      { de: "der Hals", tr: "boğaz", en: "throat" },
      { de: "das Fieber", tr: "ateş", en: "fever" },
      { de: "das Rezept", tr: "reçete", en: "prescription" },
      { de: "sich ausruhen", tr: "dinlenmek", en: "to rest" },
    ],
    targets: [
      { de: "Ich habe … schmerzen.", tr: "…m ağrıyor.", en: "My … hurts." },
      { de: "Seit … Tagen.", tr: "… gündür.", en: "For … days." },
      { de: "Ich habe Fieber.", tr: "Ateşim var.", en: "I have a fever." },
      { de: "Brauche ich ein Rezept?", tr: "Reçeteye ihtiyacım var mı?", en: "Do I need a prescription?" },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Guten Tag! Was fehlt Ihnen denn?",
        askTr: "İyi günler! Şikâyetiniz nedir?",
        cue: "Neren ağrıyor söyle: „Ich habe Halsschmerzen.“ ya da „Mein Kopf tut weh.“",
        replies: [
          {
            match: ["hals", "schluck", "rachen"],
            say: "Halsschmerzen also. Seit wann haben Sie das?",
            sayTr: "Boğaz ağrısı demek. Ne zamandır böyle?",
            next: "since",
            uses: ["Ich habe … schmerzen."],
          },
          {
            match: ["kopf", "migräne"],
            say: "Kopfschmerzen. Seit wann geht das schon so?",
            sayTr: "Baş ağrısı. Ne zamandır sürüyor?",
            next: "since",
            uses: ["Ich habe … schmerzen."],
          },
          {
            match: ["bauch", "magen", "übel"],
            say: "Bauchschmerzen. Und seit wann?",
            sayTr: "Karın ağrısı. Peki ne zamandır?",
            next: "since",
            uses: ["Ich habe … schmerzen."],
          },
        ],
        fallback: {
          say: "Entschuldigung, wo genau haben Sie Schmerzen?",
          sayTr: "Pardon, tam olarak neresi ağrıyor?",
          example: "Ich habe Halsschmerzen.",
        },
      },
      {
        id: "since",
        ask: "Und haben Sie auch Fieber gemessen?",
        askTr: "Ateşinizi ölçtünüz mü?",
        cue: "Süreyi ya da ateşi söyle: „Seit drei Tagen.“ / „Ja, ich habe Fieber.“",
        replies: [
          {
            match: ["fieber", "temperatur", "grad"],
            say: "Fieber, verstehe. Dann sollten Sie sich ausruhen.",
            sayTr: "Ateş var, anlıyorum. O zaman dinlenmelisiniz.",
            next: "advice",
            uses: ["Ich habe Fieber."],
          },
          {
            match: ["seit", "tage", "tagen", "woche", "gestern"],
            say: "Alles klar. Das klingt nach einer Erkältung.",
            sayTr: "Anlaşıldı. Bu bir soğuk algınlığına benziyor.",
            next: "advice",
            uses: ["Seit … Tagen."],
          },
          {
            match: ["nein", "nicht gemessen", "kein"],
            say: "Kein Fieber, gut. Dann ist es wohl harmlos.",
            sayTr: "Ateş yok, iyi. O zaman muhtemelen ciddi değil.",
            next: "advice",
            uses: ["Ich habe Fieber."],
          },
        ],
        fallback: {
          say: "Sagen Sie mir bitte, seit wann Sie das haben.",
          sayTr: "Ne zamandır olduğunu söyler misiniz?",
          example: "Seit drei Tagen.",
        },
      },
      {
        id: "advice",
        ask: "Ich verschreibe Ihnen etwas. Haben Sie noch Fragen?",
        askTr: "Size bir şey yazacağım. Sorunuz var mı?",
        cue: "Reçeteyi sor ya da teşekkür et: „Brauche ich ein Rezept?“",
        replies: [
          {
            match: ["rezept", "medikament", "tablette", "apotheke"],
            say: "Ja, hier ist das Rezept. Gehen Sie damit in die Apotheke.",
            sayTr: "Evet, reçete burada. Bununla eczaneye gidin.",
            uses: ["Brauche ich ein Rezept?"],
          },
          {
            match: ["danke", "dank", "nein"],
            say: "Gute Besserung! Und ruhen Sie sich aus.",
            sayTr: "Geçmiş olsun! Ve dinlenin.",
            uses: ["Brauche ich ein Rezept?"],
          },
        ],
        fallback: {
          say: "Gute Besserung! Melden Sie sich, wenn es schlimmer wird.",
          sayTr: "Geçmiş olsun! Kötüleşirse haber verin.",
          example: "Brauche ich ein Rezept?",
        },
      },
    ],
  },

  // ─────────────── Zürih · yeni biriyle tanışma ───────────────
  //
  // Zürih havuzunda tek diyalog vardı (dükkân) ve o A2. Tanışma teması hem
  // daha erken bir seviyeye uyuyor hem de lehçenin en sık kalıplarını bir
  // arada çalıştırıyor: Grüezi, wie gaht's, ich chume vo, ich schaffe als.
  //
  // Köklere burada da Hochdeutsch karşılıkları yazıldı — de-CH tanıyıcısı
  // lehçeyi standart biçimde yazma eğiliminde (bkz. zh-a2-d1).
  {
    id: "zh-a1-d1",
    theme: { role: "Nachbarin im Treppenhaus", goal: "Tanışma: isim, nereli olduğu, ne iş yaptığı, hobisi; sen de kendinden kısa bilgi ver." },
    level: "A1",
    skill: "speaking",
    course: "gsw-zh",
    title: "Sich vorstelle",
    genre: "Diyalog",
    intro:
      "Biriyle yeni tanışıyorsun. Züritüütsch cevap ver — Hochdeutsch de anlaşılır ama lehçeyi dene.",
    minutes: 5,
    gloss: [
      { de: "Grüezi", tr: "merhaba (resmî)" },
      { de: "Wie gaht's?", tr: "Nasılsın? (Wie geht es?)" },
      { de: "ich chume vo", tr: "…-dan geliyorum (ich komme aus)" },
      { de: "ich schaffe", tr: "çalışıyorum (ich arbeite)" },
      { de: "Freut mi", tr: "Memnun oldum (Freut mich)" },
    ],
    targets: [
      { de: "Ich heisse …", tr: "Adım …" },
      { de: "Ich chume vo …", tr: "…-danım." },
      { de: "Ich schaffe als …", tr: "… olarak çalışıyorum." },
      { de: "Freut mi!", tr: "Memnun oldum!" },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Grüezi! Ich heisse Anna. Und Sie?",
        askTr: "Merhaba! Benim adım Anna. Ya siz?",
        cue: "Adını söyle: „Ich heisse …“ ya da „Min Name isch …“",
        replies: [
          {
            match: ["heisse", "heiße", "name", "bi de", "bin"],
            say: "Freut mi! Und wo chömed Sie her?",
            sayTr: "Memnun oldum! Peki nereden geliyorsunuz?",
            next: "from",
            uses: ["Ich heisse …"],
          },
          {
            match: ["grüezi", "salü", "hallo", "guete"],
            say: "Grüezi mitenand! Wie heissed Sie denn?",
            sayTr: "Herkese merhaba! Peki adınız ne?",
            next: "from",
            uses: ["Ich heisse …"],
          },
        ],
        fallback: {
          say: "Entschuldigung, wie heissed Sie?",
          sayTr: "Pardon, adınız neydi?",
          example: "Ich heisse Samet.",
        },
      },
      {
        id: "from",
        ask: "Und wo chömed Sie her?",
        askTr: "Peki nereden geliyorsunuz?",
        cue: "Nereli olduğunu söyle: „Ich chume vo de Türkei.“",
        replies: [
          {
            match: ["türkei", "turkei", "istanbul", "ankara"],
            say: "Vo de Türkei! Schön. Und was mached Sie beruflich?",
            sayTr: "Türkiye'den! Güzel. Peki mesleğiniz ne?",
            next: "work",
            uses: ["Ich chume vo …"],
          },
          {
            match: ["chume", "komme", "wohne", "läbe"],
            say: "Aha, verstande. Und was mached Sie beruflich?",
            sayTr: "Anladım. Peki mesleğiniz ne?",
            next: "work",
            uses: ["Ich chume vo …"],
          },
        ],
        fallback: {
          say: "Vo wo chömed Sie? Vo de Schwiiz oder vo uswärts?",
          sayTr: "Nereden geliyorsunuz? İsviçre'den mi, dışarıdan mı?",
          example: "Ich chume vo de Türkei.",
        },
      },
      {
        id: "work",
        ask: "Und was mached Sie beruflich?",
        askTr: "Peki mesleğiniz ne?",
        cue: "İşini söyle: „Ich schaffe als …“",
        replies: [
          {
            match: ["schaffe", "arbeite", "bi", "student", "ingenieur", "lehrer"],
            say: "Spannend! Es het mi gfreut, Sie kenne z lerne.",
            sayTr: "İlginç! Sizinle tanışmak beni sevindirdi.",
            uses: ["Ich schaffe als …"],
          },
          {
            match: ["freut", "gfreut", "au"],
            say: "Mich au! En schöne Tag no.",
            sayTr: "Ben de! İyi günler.",
            uses: ["Freut mi!"],
          },
        ],
        fallback: {
          say: "Was isch Ihres Bruef?",
          sayTr: "Mesleğiniz nedir?",
          example: "Ich schaffe als Ingenieur.",
        },
      },
    ],
  },

  // ─────────────── B2 · iş görüşmesi ───────────────
  //
  // Havuzdaki en zor tema ve kapalı tema kuralını zorlayan yer: iş görüşmesi
  // aslında açık uçlu. Yine de çalışıyor, çünkü **soruları uygulama soruyor**
  // ve bunlar sayılı: deneyim, güçlü yön, ücret beklentisi, soru var mı.
  // Öğrencinin cevabı serbest ama hangi dala gideceği birkaç anahtar kelimeyle
  // belirleniyor.
  //
  // Serbest sohbetle farkı bu: orada model her şeye cevap verir ama konuşma
  // dağılır; burada tema dar ve öğrenci gerçek bir görüşmenin sırasını
  // yaşıyor.
  {
    id: "b2-d1",
    theme: { role: "Personalchefin bei einem Vorstellungsgespräch", goal: "Deneyimi, güçlü ve zayıf yönleri, motivasyonu sor; maaş beklentisi ve başlangıç tarihini konuş; sonunda soruları olup olmadığını sor.", limits: "Pozisyon: müşteri hizmetleri; şirket adı uydurma, kısa tut." },
    level: "B2",
    skill: "speaking",
    title: "Vorstellungsgespräch",
    genre: "Diyalog",
    intro:
      "Bir iş görüşmesindesin. Sorulara yüksek sesle Almanca cevap ver — gerçek bir görüşmenin sırasıyla ilerliyor.",
    minutes: 8,
    gloss: [
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "die Stärke", tr: "güçlü yön", en: "strength" },
      { de: "das Gehalt", tr: "maaş", en: "salary" },
      { de: "die Stelle", tr: "iş", en: "position" },
      { de: "sich bewerben", tr: "başvurmak", en: "to apply" },
    ],
    targets: [
      { de: "Ich habe … Jahre Erfahrung.", tr: "… yıllık deneyimim var.", en: "I have … years of experience." },
      { de: "Meine Stärke ist …", tr: "Güçlü yönüm …", en: "My strength is …" },
      { de: "Ich stelle mir … vor.", tr: "… düşünüyorum.", en: "I have … in mind." },
      { de: "Ich hätte eine Frage.", tr: "Bir sorum olacak.", en: "I have a question." },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Schön, dass Sie da sind. Erzählen Sie kurz von Ihrer Erfahrung.",
        askTr: "Geldiğiniz için teşekkürler. Kısaca deneyiminizden bahsedin.",
        cue: "Kaç yıllık deneyimin olduğunu söyle: „Ich habe fünf Jahre Erfahrung als …“",
        replies: [
          {
            match: ["jahre", "jahr", "erfahrung", "gearbeitet"],
            say: "Das klingt solide. Was würden Sie als Ihre Stärke bezeichnen?",
            sayTr: "Sağlam görünüyor. Güçlü yönünüz nedir?",
            next: "strength",
            uses: ["Ich habe … Jahre Erfahrung."],
          },
          {
            match: ["studiert", "studium", "abschluss", "universität"],
            say: "Eine gute Ausbildung. Und was ist Ihre Stärke?",
            sayTr: "İyi bir eğitim. Peki güçlü yönünüz nedir?",
            next: "strength",
            uses: ["Ich habe … Jahre Erfahrung."],
          },
        ],
        fallback: {
          say: "Erzählen Sie mir bitte, wo Sie bisher gearbeitet haben.",
          sayTr: "Şimdiye kadar nerede çalıştığınızı anlatır mısınız?",
          example: "Ich habe fünf Jahre Erfahrung.",
        },
      },
      {
        id: "strength",
        ask: "Was ist Ihre größte Stärke?",
        askTr: "En güçlü yönünüz nedir?",
        cue: "Bir güçlü yön söyle: „Meine Stärke ist Teamarbeit.“",
        replies: [
          {
            match: ["stärke", "team", "kommunikation", "organisiert", "lerne"],
            say: "Verstehe. Und welches Gehalt stellen Sie sich vor?",
            sayTr: "Anlıyorum. Peki nasıl bir maaş düşünüyorsunuz?",
            next: "salary",
            uses: ["Meine Stärke ist …"],
          },
          {
            match: ["schwäche", "schwierig", "problem"],
            say: "Ehrlich, das schätze ich. Und Ihre Gehaltsvorstellung?",
            sayTr: "Dürüst, bunu takdir ederim. Peki maaş beklentiniz?",
            next: "salary",
            uses: ["Meine Stärke ist …"],
          },
        ],
        fallback: {
          say: "Nennen Sie mir bitte eine Stärke von Ihnen.",
          sayTr: "Bana güçlü bir yönünüzü söyleyin lütfen.",
          example: "Meine Stärke ist Teamarbeit.",
        },
      },
      {
        id: "salary",
        ask: "Welche Gehaltsvorstellung haben Sie?",
        askTr: "Maaş beklentiniz nedir?",
        cue: "Bir rakam söyle ya da soruyu geri çevir: „Was bieten Sie denn an?“",
        replies: [
          {
            match: ["stelle mir", "vorstellung", "euro", "franken", "brutto"],
            say: "Das liegt im Rahmen. Haben Sie noch Fragen an uns?",
            sayTr: "Bu makul bir aralıkta. Bize sorunuz var mı?",
            next: "questions",
            uses: ["Ich stelle mir … vor."],
          },
          {
            match: ["bieten", "budget", "rahmen", "verhandel"],
            say: "Gute Frage. Wir haben einen festen Rahmen. Noch Fragen?",
            sayTr: "İyi soru. Belirli bir aralığımız var. Başka sorunuz?",
            next: "questions",
            uses: ["Ich stelle mir … vor."],
          },
        ],
        fallback: {
          say: "Sagen Sie mir ruhig eine Zahl oder eine Spanne.",
          sayTr: "Rahatça bir rakam ya da aralık söyleyebilirsiniz.",
          example: "Ich stelle mir 60.000 Euro vor.",
        },
      },
      {
        id: "questions",
        ask: "Haben Sie noch Fragen an uns?",
        askTr: "Bize sorunuz var mı?",
        cue: "Bir soru sor ya da kapat: „Ich hätte eine Frage zum Team.“",
        replies: [
          {
            match: ["frage", "team", "wann", "homeoffice", "urlaub"],
            say: "Gerne. Wir melden uns bis Ende der Woche bei Ihnen.",
            sayTr: "Memnuniyetle. Hafta sonuna kadar size döneceğiz.",
            uses: ["Ich hätte eine Frage."],
          },
          {
            match: ["nein", "danke", "alles klar"],
            say: "Dann danke ich Ihnen für das Gespräch. Auf Wiedersehen!",
            sayTr: "O zaman görüşme için teşekkür ederim. Hoşça kalın!",
            uses: ["Ich hätte eine Frage."],
          },
        ],
        fallback: {
          say: "Wir melden uns bald. Vielen Dank für Ihre Zeit!",
          sayTr: "Yakında size döneceğiz. Vaktiniz için teşekkürler!",
          example: "Ich hätte eine Frage zum Team.",
        },
      },
    ],
  },

  // ─────────────── C1 · fikir belirtme ve karşı çıkma ───────────────
  //
  // C1'de eksik olan kelime değil, **ton**. Öğrenci fikrini söyleyebiliyor
  // ama katılmadığında ya çok sert ("Nein, das ist falsch") ya da hiç
  // söyleyemiyor. Almancada karşı çıkmanın kalıpları var ve bunlar
  // öğrenilmediğinde insan ya kaba ya sessiz kalıyor.
  //
  // Dallar bilerek "katılıyorum / kısmen / katılmıyorum" ekseninde: aynı
  // soruya üç farklı tonda cevap verilebiliyor ve karşılık da ona göre
  // değişiyor. Öğrenilen şey içerik değil, nasıl söylendiği.
  {
    id: "c1-d1",
    theme: { role: "Gesprächspartner in einer Podiumsdiskussion", goal: "Konu: şehir merkezinde araba yasağı. Görüşünü iste, bir karşı argüman getir, gerekçe ve örnek iste, uzlaşma noktası ara.", limits: "Tek taraflı kalma; öğrenciyi nüans yapmaya zorla." },
    level: "C1",
    skill: "speaking",
    title: "Eine Meinung äußern",
    genre: "Diyalog",
    intro:
      "Bir tartışmadasın. Katılabilir, kısmen katılabilir ya da karşı çıkabilirsin — önemli olan bunu Almancada nasıl söylediğin.",
    minutes: 8,
    gloss: [
      { de: "meiner Meinung nach", tr: "bence", en: "in my opinion" },
      { de: "das sehe ich anders", tr: "ben farklı görüyorum", en: "I see it differently" },
      { de: "einerseits … andererseits", tr: "bir yandan … öte yandan", en: "on the one hand … on the other hand" },
      { de: "da haben Sie recht", tr: "bu konuda haklısınız", en: "you are right about that" },
      { de: "ich bezweifle, dass …", tr: "… olduğundan şüpheliyim", en: "I doubt that …" },
    ],
    targets: [
      { de: "Meiner Meinung nach …", tr: "Bence …", en: "In my opinion …" },
      { de: "Das sehe ich anders.", tr: "Ben farklı görüyorum.", en: "I see it differently." },
      { de: "Einerseits …, andererseits …", tr: "Bir yandan …, öte yandan …", en: "On the one hand …, on the other hand …" },
      { de: "Da haben Sie recht, aber …", tr: "Haklısınız, ama …", en: "You are right, but …" },
    ],
    dialogue: [
      {
        id: "start",
        ask: "Homeoffice macht Teams weniger produktiv. Wie sehen Sie das?",
        askTr: "Evden çalışma ekipleri daha verimsiz yapıyor. Siz nasıl görüyorsunuz?",
        cue: "Fikrini söyle: „Meiner Meinung nach …“ ya da „Das sehe ich anders.“",
        replies: [
          {
            match: ["sehe ich anders", "anders", "bezweifle", "stimme nicht", "widersprechen"],
            say: "Interessant. Woran machen Sie das fest?",
            sayTr: "İlginç. Bunu neye dayandırıyorsunuz?",
            next: "why",
            uses: ["Das sehe ich anders."],
          },
          {
            match: ["einerseits", "andererseits", "teilweise", "kommt darauf an"],
            say: "Ein differenzierter Blick. Wo genau liegt für Sie die Grenze?",
            sayTr: "Ayrıntılı bir bakış. Sizce sınır tam olarak nerede?",
            next: "why",
            uses: ["Einerseits …, andererseits …"],
          },
          {
            match: ["recht", "stimme zu", "genau", "sehe ich auch"],
            say: "Da sind wir uns einig. Aber gibt es keine Gegenargumente?",
            sayTr: "Bu konuda hemfikiriz. Ama karşı argüman yok mu?",
            next: "why",
            uses: ["Da haben Sie recht, aber …"],
          },
        ],
        fallback: {
          say: "Sagen Sie mir ruhig, was Sie davon halten.",
          sayTr: "Bu konuda ne düşündüğünüzü rahatça söyleyin.",
          // Örnek cümle bir dala uymak zorunda: uymazsa öğrenciye çalışmayan
          // bir çıkış yolu gösterilir. „Meiner Meinung nach…“ nötr olduğu için
          // hiçbir dalı seçmiyordu; yerine tonu belli olan kalıp konuldu.
          example: "Das sehe ich anders.",
        },
      },
      {
        id: "why",
        ask: "Können Sie das begründen?",
        askTr: "Bunu gerekçelendirebilir misiniz?",
        cue: "Gerekçeni söyle ya da bir örnek ver: „In meinem Team war es so, dass …“",
        replies: [
          {
            match: ["team", "erfahrung", "beispiel", "beobachtet", "arbeite"],
            say: "Ein konkretes Beispiel — das überzeugt. Und langfristig?",
            sayTr: "Somut bir örnek — bu ikna edici. Peki uzun vadede?",
            next: "close",
            uses: ["Meiner Meinung nach …"],
          },
          {
            match: ["studie", "zahlen", "untersuchung", "statistik"],
            say: "Zahlen sind ein starkes Argument. Und langfristig gesehen?",
            sayTr: "Rakamlar güçlü bir argüman. Uzun vadede peki?",
            next: "close",
            uses: ["Meiner Meinung nach …"],
          },
        ],
        fallback: {
          say: "Haben Sie ein Beispiel dafür?",
          sayTr: "Buna bir örnek verebilir misiniz?",
          example: "In meinem Team war es so, dass wir produktiver waren.",
        },
      },
      {
        id: "close",
        ask: "Also, worauf kommt es Ihrer Meinung nach am Ende an?",
        askTr: "Peki sizce sonuçta önemli olan ne?",
        cue: "Toparla: „Am Ende kommt es darauf an, dass …“",
        replies: [
          {
            match: ["kommt es darauf an", "wichtig", "entscheidend", "am ende", "letztlich"],
            say: "Gut zusammengefasst. Danke für den Austausch!",
            sayTr: "İyi toparladınız. Fikir alışverişi için teşekkürler!",
            uses: ["Meiner Meinung nach …"],
          },
          {
            match: ["recht", "einig", "zustimmen", "unterschiedlich"],
            say: "Dann sind wir uns zumindest teilweise einig. Danke!",
            sayTr: "O zaman en azından kısmen hemfikiriz. Teşekkürler!",
            uses: ["Da haben Sie recht, aber …"],
          },
        ],
        fallback: {
          say: "Danke für das Gespräch — das war aufschlussreich.",
          sayTr: "Sohbet için teşekkürler — aydınlatıcıydı.",
          example: "Am Ende kommt es darauf an, wie das Team arbeitet.",
        },
      },
    ],
  },
];

import { de, tr, type Lesson } from "../types";

/**
 * A1 · Modül 3 — Yeme-içme (konular 021-030).
 *
 * Modülün ekseni sipariş dili: kafede başlayan `Ich möchte …` kalıbı büfede
 * kısalıyor, restoranda kibarlaşıyor, markette ihtiyaç cümlesine dönüşüyor.
 * Dilbilgisi tarafında belirtme hâli (Akkusativ) bu senaryolara yayılarak
 * öğretiliyor: önce belirsiz artikel (einen/ein), sonra belirli artikel (den),
 * sonra olumsuzu (keinen). Sarmal tekrar için önceki derslerin kelimeleri
 * (Kaffee, Tee, Wasser, Rechnung) örneklerde bilerek geri geliyor.
 */
export const deA1B03: Lesson[] = [
  {
    id: "de-a1-cafe",
    icon: "cafe",
    level: "A1",
    course: "de",
    title: "Im Café",
    titleTr: "Kafede",
    summary: "Kibarca sipariş vermeyi ve hesap istemeyi öğretir.",
    minutes: 8,
    focusId: "Akkusativ-einen",
    vocab: [
      { de: "der Kaffee", tr: "kahve" },
      { de: "der Tee", tr: "çay" },
      { de: "das Wasser", tr: "su" },
      { de: "bestellen", tr: "sipariş etmek" },
      { de: "die Rechnung", tr: "hesap" },
          { de: "die Tasse", tr: "fincan" },
      { de: "das Glas", tr: "bardak" },
      { de: "der Kakao", tr: "kakao" },
],
    patterns: [
      { de: "Ich möchte …", tr: "kibarca bir şey isterken kullanılır" },
      { de: "Die Rechnung, bitte!", tr: "hesap isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir kafedeyiz! Kibarca sipariş vermeyi ve hesap istemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Sipariş vermenin anahtarı tek bir kalıp; ama önce içeceklerin adlarını öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Kaffee"),
          tr("Türkçesi 'kahve' demek. Lütfen"),
          de("der Kaffee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kaffee" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Tee"),
          tr("Türkçesi 'çay' demek. Lütfen"),
          de("der Tee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tee" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Wasser"),
          tr("Türkçesi 'su' demek. Lütfen"),
          de("das Wasser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wasser" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("bestellen"),
          tr("Türkçesi 'sipariş etmek' demek. Lütfen"),
          de("bestellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bestellen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Rechnung"),
          tr("Türkçesi 'hesap' demek. Lütfen"),
          de("die Rechnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rechnung" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Tasse"),
          tr("Türkçesi 'fincan' demek. Lütfen"),
          de("die Tasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tasse" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Glas"),
          tr("Türkçesi 'bardak' demek. Lütfen"),
          de("das Glas"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Glas" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Kakao"),
          tr("Türkçesi 'kakao' demek. Lütfen"),
          de("der Kakao"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kakao" },
      },
      {
        say: [
          tr("Şimdi kalıbımız:"),
          de("Ich möchte …"),
          tr("Kibarca '… istiyorum' demek. Sipariş verirken hep bu kalıbı kullanırız."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bir su istiyorum.' Almancası:"),
          de("Ich möchte ein Wasser."),
          tr("Lütfen"),
          de("Ich möchte ein Wasser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte ein Wasser" },
      },
      {
        say: [
          tr("Bir püf noktası: eril kelimelerde"),
          de("ein"),
          tr("değil"),
          de("einen"),
          tr("denir."),
          de("der Kaffee"),
          tr("eril olduğu için 'Bir kahve istiyorum' şöyle olur:"),
          de("Ich möchte einen Kaffee."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte einen Kaffee"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte einen Kaffee" },
      },
      {
        say: [
          tr("Şimdi sıra sende: 'Bir çay istiyorum.' nasıl dersin?"),
          de("der Tee"),
          tr("de eril bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Ich möchte einen Tee",
          hint: [
            de("der Tee"),
            tr("eril; artikel"),
            de("einen"),
            tr("olmalı:"),
            de("Ich möchte einen Tee."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İçecekler bitti, hesap isteyeceksin. Almancada hesap istemek çok kısa:"),
          de("Die Rechnung, bitte!"),
          tr("Yani 'Hesap, lütfen!' Lütfen"),
          de("Die Rechnung, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Rechnung, bitte" },
      },
      {
        say: [
          tr(
            "Küçük bir meydan okuma: 'Bir kahve ve bir su istiyorum.' nasıl dersin? Dikkat: kahve eril, su değil.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich möchte einen Kaffee und ein Wasser",
          hint: [
            de("der Kaffee"),
            tr("eril,"),
            de("einen"),
            tr("alır;"),
            de("das Wasser"),
            tr("nötr,"),
            de("ein"),
            tr("kalır:"),
            de("Ich möchte einen Kaffee und ein Wasser."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte ein Kaffee."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte ein Kaffee.",
          answer: false,
          why: [
            de("der Kaffee"),
            tr("eril ve burada nesne; artikel"),
            de("einen"),
            tr("olmalı. Doğrusu:"),
            de("Ich möchte einen Kaffee."),
          ],
        },
      },
      {
        say: [
          tr(
            "Harika gidiyorsun! Şimdi gerçek bir kafedesin: garson sipariş almaya geliyor. Öğrendiğin kalıplarla sipariş ver ve sonunda hesabı iste.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kafede oturuyorsun ve garson siparişini almaya geldi. 'Ich möchte …' kalıbıyla bir şeyler sipariş et, sohbet et ve sonunda hesabı iste.",
      partner: "güler yüzlü bir garson",
      opening: "Guten Tag! Was möchten Sie bestellen?",
      openingTr: "İyi günler! Ne sipariş etmek istersiniz?",
      goal: "Sipariş verilmiş, masaya gelmiş ve hesap istenmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-fruehstueck",
    icon: "food",
    level: "A1",
    course: "de",
    title: "Das Frühstück",
    titleTr: "Kahvaltı",
    summary: "Kahvaltıda ne yiyip ne içtiğini anlatmayı öğretir.",
    minutes: 8,
    focusId: "Akkusativ",
    vocab: [
      { de: "das Frühstück", tr: "kahvaltı" },
      { de: "das Brot", tr: "ekmek" },
      { de: "der Käse", tr: "peynir" },
      { de: "essen", tr: "yemek" },
      { de: "trinken", tr: "içmek" },
          { de: "das Brötchen", tr: "küçük ekmek" },
      { de: "die Butter", tr: "tereyağı" },
      { de: "die Marmelade", tr: "reçel" },
],
    patterns: [
      { de: "Ich esse …", tr: "ne yediğini söylerken kullanılır" },
      { de: "Ich trinke …", tr: "ne içtiğini söylerken kullanılır" },
      { de: "… zum Frühstück", tr: "kahvaltıda dediğini eklerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Günaydın! Bugün kahvaltı sofrasındayız. Ne yediğini ve ne içtiğini söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu iki kalıp sohbetin en kolay kapısı: insanlar sabah ne yediğini merak eder ve sen de onlara sorabilirsin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Frühstück"),
          tr("Türkçesi 'kahvaltı' demek. Lütfen"),
          de("das Frühstück"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Frühstück" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Brot"),
          tr("Türkçesi 'ekmek' demek. Lütfen"),
          de("das Brot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Brot" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Käse"),
          tr("Türkçesi 'peynir' demek. Lütfen"),
          de("der Käse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Käse" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("essen"),
          tr("Türkçesi 'yemek' demek. Lütfen"),
          de("essen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "essen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("trinken"),
          tr("Türkçesi 'içmek' demek. Lütfen"),
          de("trinken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "trinken" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Brötchen"),
          tr("Türkçesi 'küçük ekmek' demek. Lütfen"),
          de("das Brötchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Brötchen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Butter"),
          tr("Türkçesi 'tereyağı' demek. Lütfen"),
          de("die Butter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Butter" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Marmelade"),
          tr("Türkçesi 'reçel' demek. Lütfen"),
          de("die Marmelade"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Marmelade" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich esse …"),
          tr(
            "Yani '… yiyorum'. Türkçede fiil cümlenin en sonunda durur; Almancada ise hemen öznenin ardından, ikinci sırada gelir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ekmek yiyorum.' Almancası:"),
          de("Ich esse Brot."),
          tr(
            "Miktarı belli olmayan yiyeceklerin önüne artikel koymuyoruz, tıpkı Türkçede 'ekmek yiyorum' derken bir sayı söylemediğin gibi. Lütfen",
          ),
          de("Ich esse Brot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich esse Brot" },
      },
      {
        say: [tr("Sıra sende: 'Ekmek ve peynir yiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich esse Brot und Käse",
          hint: [
            tr("İki yiyeceği"),
            de("und"),
            tr("bağlar ve ikisinin de önüne artikel gelmez:"),
            de("Ich esse Brot und Käse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich trinke …"),
          tr(
            "Yani '… içiyorum'. Bir bardak ya da bir fincan kastediyorsan önüne artikel koyarsın; genel olarak içtiğini söylerken artikel gerekmez.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bir kahve içiyorum.' Almancası:"),
          de("Ich trinke einen Kaffee."),
          tr("Kahve eril bir kelimedir, o yüzden nesne olunca artikeli"),
          de("einen"),
          tr("olur. Lütfen"),
          de("Ich trinke einen Kaffee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich trinke einen Kaffee" },
      },
      {
        say: [
          tr("Bir de zaman ifademiz var:"),
          de("zum Frühstück"),
          tr(
            "yani 'kahvaltıda'. Türkçede bunu cümlenin başına koyarsın; Almancada rahatça sona ekleyebilirsin.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich esse Käse zum Frühstück"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich esse Käse zum Frühstück" },
      },
      {
        say: [tr("Şimdi ikisini birleştir: 'Kahvaltıda bir çay içiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich trinke einen Tee zum Frühstück",
          accept: ["Zum Frühstück trinke ich einen Tee"],
          hint: [
            de("der Tee"),
            tr("de eril, yani nesne olunca"),
            de("einen"),
            tr("alır; zaman ifadesi de sona gider:"),
            de("Ich trinke einen Tee zum Frühstück."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich esse Brot zum Frühstück."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich esse Brot zum Frühstück.",
          answer: true,
          why: [
            tr("Doğru."),
            de("Brot"),
            tr(
              "gibi miktarı belli olmayan yiyeceklerde artikel kullanılmaz ve zaman ifadesi sonda durur.",
            ),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık sabah sofrasında ne yediğini ve ne içtiğini söyleyebiliyorsun. Şimdi mutfaktasın: ev arkadaşın kahvaltıyı hazırlamış ve sana ne istediğini soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ev arkadaşınla kahvaltı sofrasındasın. Ne yiyip ne içmek istediğini söyle, sofrada başka ne olduğunu sor ve kahvaltıda neleri sevdiğini anlat.",
      partner: "sabahları neşeli, çok konuşan bir ev arkadaşı",
      opening: "Guten Morgen! Was isst du zum Frühstück?",
      openingTr: "Günaydın! Kahvaltıda ne yersin?",
      goal: "İkiniz de ne yiyip içeceğinizi söylemiş, sofrada eksik olan bir şey bulunmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-imbiss",
    icon: "food",
    level: "A1",
    course: "de",
    title: "Am Imbiss",
    titleTr: "Büfede",
    summary: "Büfede kısa sipariş vermeyi, fiyat sormayı ve paket istemeyi öğretir.",
    minutes: 8,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "der Imbiss", tr: "büfe" },
      { de: "die Wurst", tr: "sosis" },
      { de: "die Pommes", tr: "patates kızartması" },
      { de: "das Getränk", tr: "içecek" },
      { de: "kosten", tr: "fiyatı olmak" },
          { de: "der Hunger", tr: "açlık" },
      { de: "der Durst", tr: "susuzluk" },
      { de: "die Pizza", tr: "pizza" },
],
    patterns: [
      { de: "Einmal … bitte", tr: "büfede kısa sipariş verirken kullanılır" },
      { de: "Was kostet …?", tr: "fiyat sorarken kullanılır" },
      { de: "Zum Mitnehmen, bitte", tr: "yemeği paket isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir büfenin önünde sıradayız. Kısa sipariş vermeyi, fiyat sormayı ve yemeği paket istemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Büfede kimse uzun cümle kurmaz, sıra hızlı ilerler. Bu yüzden buranın dili kısacıktır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Imbiss"),
          tr("Türkçesi 'büfe' demek. Lütfen"),
          de("der Imbiss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Imbiss" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Wurst"),
          tr("Türkçesi 'sosis' demek. Lütfen"),
          de("die Wurst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wurst" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Pommes"),
          tr("Türkçesi 'patates kızartması' demek. Lütfen"),
          de("die Pommes"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pommes" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Getränk"),
          tr("Türkçesi 'içecek' demek. Lütfen"),
          de("das Getränk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Getränk" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("kosten"),
          tr("Türkçesi 'fiyatı olmak, tutmak' demek. Lütfen"),
          de("kosten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kosten" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Hunger"),
          tr("Türkçesi 'açlık' demek. Lütfen"),
          de("der Hunger"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hunger" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Durst"),
          tr("Türkçesi 'susuzluk' demek. Lütfen"),
          de("der Durst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Durst" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Pizza"),
          tr("Türkçesi 'pizza' demek. Lütfen"),
          de("die Pizza"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pizza" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Einmal … bitte"),
          tr(
            "Türkçede 'bir porsiyon sosis, lütfen' dersin ya; bu kalıp tam olarak o. Fiil bile kullanmıyoruz: porsiyon sayısı başa, yemeğin adı ortaya geliyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bir porsiyon patates kızartması, lütfen.' Almancası:"),
          de("Einmal Pommes, bitte."),
          tr("Lütfen"),
          de("Einmal Pommes, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Einmal Pommes, bitte" },
      },
      {
        say: [tr("Sıra sende: 'Bir porsiyon sosis, lütfen.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Einmal Wurst, bitte",
          hint: [
            tr("Porsiyon sayısı en başa, yemeğin adı ortaya, kibarlık kelimesi sona:"),
            de("Einmal Wurst, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız fiyat sormak için:"),
          de("Was kostet …?"),
          tr("Yani '… ne kadar?' Tek bir şeyin fiyatını soruyorsan fiil"),
          de("kostet"),
          tr("biçiminde olur."),
        ],
      },
      {
        say: [
          tr("Örnek:"),
          de("Was kostet das Getränk?"),
          tr("Yani 'İçecek ne kadar?' Lütfen"),
          de("Was kostet das Getränk"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Was kostet das Getränk" },
      },
      {
        say: [
          tr("Şimdi küçük bir tuzak:"),
          de("die Pommes"),
          tr(
            "her zaman çoğuldur, tıpkı Türkçedeki 'patatesler' gibi. Çoğul bir şeyin fiyatını sorarken fiil de çoğula uyar ve",
          ),
          de("kosten"),
          tr("olur."),
        ],
      },
      {
        say: [tr("Öyleyse 'Patates kızartması ne kadar?' nasıl sorulur?")],
        expect: {
          kind: "produce",
          target: "Was kosten die Pommes",
          hint: [
            de("die Pommes"),
            tr("çoğul olduğu için fiil de çoğula uyar:"),
            de("Was kosten die Pommes?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız: yemeği orada yemeyip yanına alacaksan"),
          de("Zum Mitnehmen, bitte."),
          tr("dersin, yani 'Paket olsun, lütfen.' Lütfen"),
          de("Zum Mitnehmen, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zum Mitnehmen, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Pommes kostet drei Euro."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Pommes kostet drei Euro.",
          answer: false,
          why: [
            de("die Pommes"),
            tr("çoğuldur, fiil de çoğula uymalı. Doğrusu:"),
            de("Die Pommes kosten drei Euro."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık sıra sana geldiğinde ne diyeceğini biliyorsun. Şimdi büfecinin karşısındasın: siparişini ver, fiyatı sor ve paket mi istediğini söyle.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Öğle arasında bir büfenin önündesin ve arkanda sıra var. Kısa cümlelerle siparişini ver, fiyatı sor ve yemeği orada mı yiyeceğini yoksa paket mi alacağını söyle.",
      partner: "eli çabuk, şakacı bir büfeci",
      opening: "Hallo! Möchten Sie Wurst oder Pommes?",
      openingTr: "Merhaba! Sosis mi istersiniz, patates mi?",
      goal: "Sipariş verilmiş, fiyat söylenmiş ve burada mı yeneceği yoksa paket mi olacağı kararlaşmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-restaurant",
    icon: "food",
    level: "A1",
    course: "de",
    title: "Im Restaurant",
    titleTr: "Restoranda",
    summary: "Restoranda kibarca sipariş vermeyi ve hesabı ödemeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "das Restaurant", tr: "lokanta" },
      { de: "die Speisekarte", tr: "yemek listesi" },
      { de: "die Vorspeise", tr: "başlangıç yemeği" },
      { de: "die Suppe", tr: "çorba" },
      { de: "bezahlen", tr: "ödemek" },
          { de: "der Wein", tr: "şarap" },
      { de: "das Bier", tr: "bira" },
      { de: "der Appetit", tr: "iştah" },
],
    patterns: [
      { de: "Ich hätte gern …", tr: "çok kibar biçimde bir şey isterken kullanılır" },
      { de: "… als Vorspeise", tr: "başlangıç yemeğini söylerken kullanılır" },
      { de: "Ich möchte bezahlen", tr: "hesabı ödemek isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "İyi akşamlar! Bugün bir restorandayız. Çok kibar sipariş vermeyi, başlangıç seçmeyi ve hesabı ödemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Restoranda ton büfedekinden biraz daha resmidir: kısa emirler yerine tam cümle kurarsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Restaurant"),
          tr("Türkçesi 'lokanta' demek. Lütfen"),
          de("das Restaurant"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Restaurant" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Speisekarte"),
          tr("Türkçesi 'yemek listesi' demek. Lütfen"),
          de("die Speisekarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Speisekarte" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Vorspeise"),
          tr("Türkçesi 'başlangıç yemeği' demek. Lütfen"),
          de("die Vorspeise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Vorspeise" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Suppe"),
          tr("Türkçesi 'çorba' demek. Lütfen"),
          de("die Suppe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Suppe" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("bezahlen"),
          tr("Türkçesi 'ödemek' demek. Lütfen"),
          de("bezahlen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bezahlen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Wein"),
          tr("Türkçesi 'şarap' demek. Lütfen"),
          de("der Wein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wein" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Bier"),
          tr("Türkçesi 'bira' demek. Lütfen"),
          de("das Bier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bier" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Appetit"),
          tr("Türkçesi 'iştah' demek. Lütfen"),
          de("der Appetit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Appetit" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich hätte gern …"),
          tr(
            "Almancanın en kibar isteme biçimi; Türkçedeki '… rica ediyorum' gibi. Kafede öğrendiğin isteme kalıbından bir tık daha naziktir ve restoranda hep bunu duyarsın.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bir çorba rica ediyorum.' Almancası:"),
          de("Ich hätte gern eine Suppe."),
          tr("Lütfen"),
          de("Ich hätte gern eine Suppe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich hätte gern eine Suppe" },
      },
      {
        say: [
          tr(
            "Sıra sende: 'Yemek listesini rica ediyorum.' nasıl dersin? Belli bir şeyi istiyorsun, o yüzden kelimenin kendi artikeli kalır.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich hätte gern die Speisekarte",
          hint: [
            tr("Kalıbı olduğu gibi bırak, sonuna istediğin şeyi ekle:"),
            de("Ich hätte gern die Speisekarte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi başlangıç yemeği:"),
          de("als Vorspeise"),
          tr(
            "yani 'başlangıç olarak'. Bunu cümlenin sonuna ekliyorsun; sıralama Türkçedekinin tam tersi ama kural bu kadar basit.",
          ),
        ],
      },
      {
        say: [tr("Deneyelim: 'Başlangıç olarak bir çorba rica ediyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich hätte gern eine Suppe als Vorspeise",
          hint: [
            tr("Önce isteğini söyle, sonra başlangıç olduğunu ekle:"),
            de("Ich hätte gern eine Suppe als Vorspeise."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yemek bitti, ödeme zamanı. Kalıbımız:"),
          de("Ich möchte bezahlen."),
          tr(
            "Burada iki fiil var ve dikkat: asıl fiil cümlenin en sonuna gidiyor, tıpkı Türkçedeki 'ödemek istiyorum' gibi.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte bezahlen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte bezahlen" },
      },
      {
        say: [tr("Şimdi uzatalım: 'Hesabı ödemek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte die Rechnung bezahlen",
          hint: [
            tr("Nesne ortada durur, asıl fiil en sona gider:"),
            de("Ich möchte die Rechnung bezahlen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de garsonun sorusu var, Almanya'da bunu her masada duyarsın:"),
          de("Zusammen oder getrennt?"),
          tr("Yani 'Hesap tek mi olsun, ayrı ayrı mı?' Cevabın çok kısa:"),
          de("Zusammen, bitte."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Zusammen, bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Zusammen, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich hätte gern eine Suppe und ein Wasser."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich hätte gern eine Suppe und ein Wasser.",
          answer: true,
          why: [
            tr("Doğru. Çorba dişil olduğu için"),
            de("eine Suppe"),
            tr("olur, su ise nötr olduğu için"),
            de("ein Wasser"),
            tr("kalır. İkisi de yerli yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir restoranda baştan sona idare edebilirsin. Şimdi masaya oturdun ve garson yanına geliyor: siparişini ver, başlangıcını seç ve sonunda hesabı iste.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir restoranda masaya oturdun ve garson siparişini almaya geldi. Yemek listesini iste, başlangıç olarak bir şey seç, ana yemeğini söyle ve sonunda ödeme yapmak istediğini belirt.",
      partner: "ne önereceğini iyi bilen, sakin bir garson",
      opening: "Guten Abend! Möchten Sie schon bestellen?",
      openingTr: "İyi akşamlar! Sipariş vermek ister misiniz?",
      goal: "Başlangıç ve ana yemek seçilmiş, sonunda ödeme istenmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-lieblingsessen",
    icon: "food",
    level: "A1",
    course: "de",
    title: "Mein Lieblingsessen",
    titleTr: "Sevilen yemekler",
    summary: "Neyi severek yediğini ve neyi daha çok sevdiğini anlatmayı öğretir.",
    minutes: 8,
    focusId: "Gern-lieber",
    vocab: [
      { de: "das Fleisch", tr: "et" },
      { de: "das Gemüse", tr: "sebze" },
      { de: "das Obst", tr: "meyve" },
      { de: "mögen", tr: "sevmek" },
      { de: "lieber", tr: "daha çok" },
          { de: "der Apfel", tr: "elma" },
      { de: "die Banane", tr: "muz" },
      { de: "die Schokolade", tr: "çikolata" },
],
    patterns: [
      { de: "Ich esse gern …", tr: "severek yediğin şeyi söylerken kullanılır" },
      { de: "Ich mag …", tr: "bir şeyi sevdiğini söylerken kullanılır" },
      { de: "Ich esse lieber …", tr: "iki şey arasında tercihini söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün sevdiğin yemekleri konuşacağız: neyi severek yediğini ve neyi daha çok sevdiğini söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu kalıplar tanışma sohbetlerinin belkemiği: hem kendini anlatırsın hem karşındakini konuşturursun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Fleisch"),
          tr("Türkçesi 'et' demek. Lütfen"),
          de("das Fleisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fleisch" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Gemüse"),
          tr("Türkçesi 'sebze' demek. Lütfen"),
          de("das Gemüse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gemüse" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Obst"),
          tr("Türkçesi 'meyve' demek. Lütfen"),
          de("das Obst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Obst" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("mögen"),
          tr("Türkçesi 'sevmek, hoşlanmak' demek. Lütfen"),
          de("mögen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mögen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("lieber"),
          tr("Türkçesi 'daha çok' demek. Lütfen"),
          de("lieber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lieber" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Apfel"),
          tr("Türkçesi 'elma' demek. Lütfen"),
          de("der Apfel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Apfel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Banane"),
          tr("Türkçesi 'muz' demek. Lütfen"),
          de("die Banane"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Banane" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Schokolade"),
          tr("Türkçesi 'çikolata' demek. Lütfen"),
          de("die Schokolade"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schokolade" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich esse gern …"),
          tr("Yani '… yemeyi severim'. Buradaki küçük kelime"),
          de("gern"),
          tr(
            "işi bitiriyor. Türkçede 'severek yerim' derken 'severek' fiilden önce gelir; Almancada ise fiilden hemen sonra durur.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sebze yemeyi severim.' Almancası:"),
          de("Ich esse gern Gemüse."),
          tr("Lütfen"),
          de("Ich esse gern Gemüse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich esse gern Gemüse" },
      },
      {
        say: [tr("Sıra sende: 'Çay içmeyi severim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich trinke gern Tee",
          hint: [
            tr("Sıra şöyle: önce fiil, hemen arkasından"),
            de("gern"),
            tr("sonra içeceğin adı:"),
            de("Ich trinke gern Tee."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich mag …"),
          tr("Bu fiil bir şeyi doğrudan sevmek demek ve düzensizdir: ben biçimi"),
          de("ich mag"),
          tr("olur, sonuna hiçbir ek gelmez."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Peynir severim.' Almancası:"),
          de("Ich mag Käse."),
          tr("Lütfen"),
          de("Ich mag Käse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich mag Käse" },
      },
      {
        say: [tr("Şimdi sen: 'Meyve ve sebze severim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich mag Obst und Gemüse",
          hint: [
            tr("Fiilin ben biçimi ek almaz ve iki yiyeceği"),
            de("und"),
            tr("bağlar:"),
            de("Ich mag Obst und Gemüse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız tercih için:"),
          de("Ich esse lieber …"),
          tr(
            "Yani 'ben daha çok … yerim'. İki şey arasında seçim yaparken kullanılır ve bu kelime de fiilden hemen sonra durur.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben daha çok sebze yerim.' Almancası:"),
          de("Ich esse lieber Gemüse."),
          tr("Lütfen"),
          de("Ich esse lieber Gemüse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich esse lieber Gemüse" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gern esse Fleisch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gern esse Fleisch.",
          answer: false,
          why: [
            de("gern"),
            tr("fiilden önce değil, fiilden sonra gelir. Doğrusu:"),
            de("Ich esse gern Fleisch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık damak tadını anlatabilirsin. Şimdi öğle molasındasın: iş arkadaşın ne yemek istediğini soruyor, sen de tercihini anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Öğle molasında iş arkadaşınla nereye yemeğe gideceğinizi konuşuyorsunuz. Neyi severek yediğini söyle, iki seçenek arasında tercihini belirt ve ona da ne sevdiğini sor.",
      partner: "yemek konusunda çok meraklı bir iş arkadaşı",
      opening: "Ich esse gern Gemüse. Und was isst du gern?",
      openingTr: "Ben sebze yemeyi severim. Peki sen neyi severek yersin?",
      goal: "İkinizin de sevdiği yemekler konuşulmuş ve öğlen nereye gideceğinize karar verilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-supermarkt",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "Im Supermarkt",
    titleTr: "Markette",
    summary: "Markette neye ihtiyacın olduğunu söylemeyi ve aradığını sormayı öğretir.",
    minutes: 8,
    focusId: "Akkusativ",
    vocab: [
      { de: "der Supermarkt", tr: "market" },
      { de: "brauchen", tr: "ihtiyacı olmak" },
      { de: "finden", tr: "bulmak" },
      { de: "die Milch", tr: "süt" },
      { de: "der Zucker", tr: "şeker" },
          { de: "der Kunde", tr: "müşteri" },
      { de: "das Geschäft", tr: "mağaza" },
      { de: "die Birne", tr: "armut" },
],
    patterns: [
      { de: "Ich brauche …", tr: "neye ihtiyacın olduğunu söylerken kullanılır" },
      { de: "Wo finde ich …?", tr: "bir şeyin nerede olduğunu sorarken kullanılır" },
      { de: "Haben Sie …?", tr: "bir ürünün olup olmadığını sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün markette dolaşıyoruz. Neye ihtiyacın olduğunu söylemeyi ve aradığın şeyin nerede olduğunu sormayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Markette iki cümle işini görür: ne aradığını söylemek ve nerede olduğunu sormak. Bugün ayrıca küçük ama önemli bir kural öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Supermarkt"),
          tr("Türkçesi 'market' demek. Lütfen"),
          de("der Supermarkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Supermarkt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("brauchen"),
          tr("Türkçesi 'ihtiyacı olmak' demek. Lütfen"),
          de("brauchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "brauchen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("finden"),
          tr("Türkçesi 'bulmak' demek. Lütfen"),
          de("finden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "finden" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Milch"),
          tr("Türkçesi 'süt' demek. Lütfen"),
          de("die Milch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Milch" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Zucker"),
          tr("Türkçesi 'şeker' demek. Lütfen"),
          de("der Zucker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zucker" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Kunde"),
          tr("Türkçesi 'müşteri' demek. Lütfen"),
          de("der Kunde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kunde" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Geschäft"),
          tr("Türkçesi 'mağaza' demek. Lütfen"),
          de("das Geschäft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Geschäft" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Birne"),
          tr("Türkçesi 'armut' demek. Lütfen"),
          de("die Birne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Birne" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich brauche …"),
          tr(
            "Yani '… lazım'. Türkçede ihtiyaç cümlesi 'var' ile biter, Almancada ise tek bir fiil bütün işi görür.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Süt lazım.' Almancası:"),
          de("Ich brauche Milch."),
          tr("Lütfen"),
          de("Ich brauche Milch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich brauche Milch" },
      },
      {
        say: [tr("Sıra sende: 'Ekmek ve peynir lazım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich brauche Brot und Käse",
          hint: [
            tr("Kalıbın sonuna iki yiyeceği ekle, artikel koyma:"),
            de("Ich brauche Brot und Käse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wo finde ich …?"),
          tr(
            "Yani '… nerede bulurum?' Burada bugünün kuralı devreye giriyor: aradığın şey cümlenin nesnesi olduğunda eril kelimelerin artikeli değişir.",
          ),
        ],
      },
      {
        say: [
          tr("Bir örnekle bakalım:"),
          de("der Käse"),
          tr("nesne olunca"),
          de("den Käse"),
          tr(
            "olur. Türkçede kelimenin sonuna bir ek getiriyorsun ya, Almancada değişen şey kelimenin başındaki artikel.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Peyniri nerede bulurum?' Almancası:"),
          de("Wo finde ich den Käse?"),
          tr("Lütfen"),
          de("Wo finde ich den Käse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo finde ich den Käse" },
      },
      {
        say: [tr("Şimdi sen sor: 'Şekeri nerede bulurum?'")],
        expect: {
          kind: "produce",
          target: "Wo finde ich den Zucker",
          hint: [
            de("der Zucker"),
            tr("eril; nesne olunca artikeli"),
            de("den"),
            tr("olur:"),
            de("Wo finde ich den Zucker?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de raflarda hiç göremediğin bir şeyi sormanın kısa yolu var:"),
          de("Haben Sie Zucker?"),
          tr("Yani 'Sizde şeker var mı?' Lütfen"),
          de("Haben Sie Zucker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Haben Sie Zucker" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich brauche Milch und Zucker."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich brauche Milch und Zucker.",
          answer: true,
          why: [
            tr(
              "Doğru. Miktarı belli olmayan yiyeceklerin önüne artikel gelmez, kalıp olduğu gibi çalışır.",
            ),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık markette kaybolmazsın. Şimdi reyonların arasındasın ve bir görevli sana yardım etmek için yaklaşıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir markette alışveriş yapıyorsun ama aradığın birkaç şeyi bulamıyorsun. Neye ihtiyacın olduğunu söyle, ürünlerin nerede olduğunu sor ve olmayan bir şeyi soruştur.",
      partner: "yardımsever ama acelesi olan bir market görevlisi",
      opening: "Guten Tag! Suchen Sie etwas?",
      openingTr: "İyi günler! Bir şey mi arıyorsunuz?",
      goal: "Aradığın ürünlerin yeri öğrenilmiş, bulunmayan bir şey için başka bir çözüm önerilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-mengen",
    icon: "shopping",
    level: "A1",
    course: "de",
    title: "Ein Kilo Tomaten",
    titleTr: "Miktarlar",
    summary: "Ne kadar istediğini söylemeyi öğretir: kilo, şişe ve tane.",
    minutes: 8,
    focusId: "Zahlen-Preise",
    vocab: [
      { de: "das Kilo", tr: "kilo" },
      { de: "die Kartoffel", tr: "patates" },
      { de: "die Flasche", tr: "şişe" },
      { de: "das Stück", tr: "tane" },
      { de: "die Tomate", tr: "domates" },
          { de: "der Salat", tr: "salata" },
      { de: "das Öl", tr: "sıvı yağ" },
      { de: "das Mineralwasser", tr: "maden suyu" },
],
    patterns: [
      { de: "ein Kilo …", tr: "kiloyla miktar söylerken kullanılır" },
      { de: "zwei Flaschen …", tr: "şişeyle miktar söylerken kullanılır" },
      { de: "drei Stück …", tr: "taneyle miktar söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün miktarları öğreneceğiz: bir kilo, iki şişe, üç tane. Ne kadar istediğini söyleyebileceksin. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Miktar söylemeden alışveriş bitmiyor; üç ölçü kelimesiyle bütün pazarı dolaşabilirsin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Kilo"),
          tr("Türkçesi 'kilo' demek. Lütfen"),
          de("das Kilo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kilo" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kartoffel"),
          tr("Türkçesi 'patates' demek. Lütfen"),
          de("die Kartoffel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kartoffel" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Flasche"),
          tr("Türkçesi 'şişe' demek. Lütfen"),
          de("die Flasche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Flasche" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Stück"),
          tr("Türkçesi 'tane, parça' demek. Lütfen"),
          de("das Stück"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Stück" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Tomate"),
          tr("Türkçesi 'domates' demek. Lütfen"),
          de("die Tomate"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tomate" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Salat"),
          tr("Türkçesi 'salata' demek. Lütfen"),
          de("der Salat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Salat" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Öl"),
          tr("Türkçesi 'sıvı yağ' demek. Lütfen"),
          de("das Öl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Öl" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Mineralwasser"),
          tr("Türkçesi 'maden suyu' demek. Lütfen"),
          de("das Mineralwasser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mineralwasser" },
      },
      {
        say: [
          tr("İlk kuralımız çok kolay: ölçüyle yiyeceği yan yana koyuyorsun, araya hiçbir şey girmiyor."),
          de("ein Kilo Tomaten"),
          tr(
            "Sıra Türkçedeki 'bir kilo domates' ile birebir aynı. Tek fark, sayılabilen yiyeceğin burada çoğul olması.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("ein Kilo Tomaten"), tr("deyin.")],
        expect: { kind: "repeat", target: "ein Kilo Tomaten" },
      },
      {
        say: [tr("Sıra sende: 'Bir kilo domates istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte ein Kilo Tomaten",
          hint: [
            tr("Kafede öğrendiğin isteme kalıbının sonuna ölçüyü ve yiyeceği ekle:"),
            de("Ich möchte ein Kilo Tomaten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi ilginç bir ayrıntı: miktar ikiye üçe çıkınca her ölçü çoğul olmuyor."),
          de("zwei Kilo"),
          tr("ve"),
          de("drei Stück"),
          tr("hiç değişmez; ama"),
          de("zwei Flaschen"),
          tr("çoğul olur. Kısacası dişil ölçüler çoğullaşır, diğerleri olduğu gibi kalır."),
        ],
      },
      {
        say: [tr("Lütfen"), de("zwei Kilo Tomaten"), tr("deyin.")],
        expect: { kind: "repeat", target: "zwei Kilo Tomaten" },
      },
      {
        say: [tr("Şimdi sen dene: 'İki şişe su rica ediyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich hätte gern zwei Flaschen Wasser",
          hint: [
            de("die Flasche"),
            tr("dişil olduğu için çoğulu"),
            de("zwei Flaschen"),
            tr("olur:"),
            de("Ich hätte gern zwei Flaschen Wasser."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Küçük miktarlar için gram ve tane işini görür:"),
          de("hundert Gramm Käse"),
          tr("gibi. Şimdi taneyle deneyelim, lütfen"),
          de("drei Stück Käse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "drei Stück Käse" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich möchte zwei Kilos Tomaten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich möchte zwei Kilos Tomaten.",
          answer: false,
          why: [
            de("Kilo"),
            tr("ölçüsü çoğul olmaz, olduğu gibi kalır. Doğrusu:"),
            de("Ich möchte zwei Kilo Tomaten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ne kadar istediğini söyleyebilirsin. Şimdi bir sebze dükkânındasın: tezgâhın arkasındaki adam sabahtan beri müşteri bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir sebze dükkânında alışveriş yapıyorsun. Ne istediğini ölçüsüyle birlikte söyle, birkaç şey daha ekle ve fiyatı sor.",
      partner: "tezgâhıyla övünen, konuşkan bir manav",
      opening: "Die Tomaten sind heute frisch. Wie viel möchten Sie?",
      openingTr: "Domatesler bugün taze. Ne kadar istersiniz?",
      goal: "İstediğin ürünler ölçüsüyle tartılmış ve toplam tutar söylenmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-kochen",
    icon: "food",
    level: "A1",
    course: "de",
    title: "Wir kochen zusammen",
    titleTr: "Birlikte pişirme",
    summary: "Mutfakta kimin ne yaptığını anlatmayı öğretir.",
    minutes: 8,
    focusId: "Konjugation-Präsens",
    vocab: [
      { de: "kochen", tr: "yemek pişirmek" },
      { de: "schneiden", tr: "doğramak" },
      { de: "die Zwiebel", tr: "soğan" },
      { de: "das Salz", tr: "tuz" },
      { de: "der Herd", tr: "ocak" },
          { de: "grillen", tr: "mangal yapmak" },
      { de: "riechen", tr: "kokmak" },
      { de: "der Reis", tr: "pirinç" },
],
    patterns: [
      { de: "Ich schneide …", tr: "kendi yaptığın işi söylerken kullanılır" },
      { de: "Wir kochen …", tr: "birlikte yaptığınız işi söylerken kullanılır" },
      { de: "Du schneidest …", tr: "karşındakinin yaptığı işi söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün mutfaktayız ve birlikte yemek yapıyoruz. Kimin ne yaptığını söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada fiiller kişiye göre sonlarını değiştirir, tıpkı Türkçedeki 'doğruyorum, doğruyorsun' gibi. Bugün bunu tencerenin başında çalışacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("kochen"),
          tr("Türkçesi 'yemek pişirmek' demek. Lütfen"),
          de("kochen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kochen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("schneiden"),
          tr("Türkçesi 'doğramak, kesmek' demek. Lütfen"),
          de("schneiden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schneiden" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Zwiebel"),
          tr("Türkçesi 'soğan' demek. Lütfen"),
          de("die Zwiebel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zwiebel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Salz"),
          tr("Türkçesi 'tuz' demek. Lütfen"),
          de("das Salz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Salz" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Herd"),
          tr("Türkçesi 'ocak' demek. Lütfen"),
          de("der Herd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Herd" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("grillen"),
          tr("Türkçesi 'mangal yapmak' demek. Lütfen"),
          de("grillen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "grillen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("riechen"),
          tr("Türkçesi 'kokmak' demek. Lütfen"),
          de("riechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "riechen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Reis"),
          tr("Türkçesi 'pirinç' demek. Lütfen"),
          de("der Reis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Reis" },
      },
      {
        say: [
          tr("İlk kalıbımız kendi yaptığın iş için:"),
          de("Ich schneide …"),
          tr("Fiilin sözlükteki hâli"),
          de("schneiden"),
          tr("ama ben biçiminde sonu değişir ve"),
          de("ich schneide"),
          tr("olur."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Soğanı doğruyorum.' Almancası:"),
          de("Ich schneide die Zwiebel."),
          tr("Lütfen"),
          de("Ich schneide die Zwiebel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich schneide die Zwiebel" },
      },
      {
        say: [
          tr("Biz biçiminde işin kolayı var: fiil sözlükteki hâlinden hiç ayrılmaz."),
          de("wir kochen"),
          tr("yani 'pişiriyoruz'."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Birlikte pişiriyoruz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir kochen zusammen",
          hint: [
            tr("Biz biçiminde fiil değişmez, sözlükteki hâliyle aynı kalır:"),
            de("Wir kochen zusammen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sen biçiminde fiilin sonu yine değişir:"),
          de("du kochst"),
          tr("ve"),
          de("du schneidest"),
          tr(
            "Kökü t ya da d ile biten fiillerde söylemesi kolaylaşsın diye araya bir sesli girer, bu yüzden ikincisi bir hece uzun duyulur.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ekmeği kesiyorsun.' Almancası:"),
          de("Du schneidest das Brot."),
          tr("Lütfen"),
          de("Du schneidest das Brot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Du schneidest das Brot" },
      },
      {
        say: [tr("Şimdi sen: 'Soğanı doğruyorsun.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Du schneidest die Zwiebel",
          hint: [
            tr("Sen biçiminde fiilin sonu değişir ve araya bir sesli girer:"),
            de("Du schneidest die Zwiebel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Mutfakta iki kısa cümle daha çok işine yarar:"),
          de("Ich brauche Salz."),
          tr("ve"),
          de("Wo ist der Herd?"),
          tr("İlkini birlikte söyleyelim. Lütfen"),
          de("Ich brauche Salz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich brauche Salz" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich schneide die Tomaten und du kochst."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich schneide die Tomaten und du kochst.",
          answer: true,
          why: [
            tr("Doğru. Ben biçiminde"),
            de("ich schneide"),
            tr("sen biçiminde"),
            de("du kochst"),
            tr("olur; ikisi de yerli yerinde."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık mutfakta iş bölüşebilirsin. Şimdi arkadaşının evindesin, tezgâhta malzemeler duruyor ve akşam yemeğini birlikte yapacaksınız.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Arkadaşınla onun mutfağında akşam yemeği yapıyorsunuz. Ne yapacağınızı konuşun: sen ne doğradığını söyle, ondan bir şey yapmasını iste ve eksik malzemeyi sor.",
      partner: "mutfakta lafı çok olan, dağınık bir arkadaş",
      opening: "Ich habe Tomaten und Zwiebeln. Was kochen wir heute?",
      openingTr: "Domates ve soğan var. Bugün ne pişiriyoruz?",
      goal: "Kimin ne yapacağı paylaşılmış ve eksik malzeme için bir çözüm bulunmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-allergie",
    icon: "doctor",
    level: "A1",
    course: "de",
    title: "Ich vertrage das nicht",
    titleTr: "Alerji ve tercih",
    summary: "Yemediğin şeyleri ve alerjini kibarca söylemeyi öğretir.",
    minutes: 9,
    focusId: "Negation-kein",
    vocab: [
      { de: "allergisch", tr: "alerjik" },
      { de: "die Nuss", tr: "sert kabuklu yemiş" },
      { de: "das Ei", tr: "yumurta" },
      { de: "ohne", tr: "olmadan" },
      { de: "vertragen", tr: "bünyesine uymak" },
          { de: "der Schinken", tr: "jambon" },
      { de: "das Hähnchen", tr: "piliç" },
      { de: "das Eis", tr: "dondurma" },
],
    patterns: [
      { de: "Ich esse kein …", tr: "bir yiyeceği hiç yemediğini söylerken kullanılır" },
      { de: "Ich bin allergisch gegen …", tr: "alerjini söylerken kullanılır" },
      { de: "Gibt es … ohne …?", tr: "bir şeyin o malzeme olmadan hâlini sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün yemediğin şeyleri ve alerjini anlatmayı öğreneceğiz. Dışarıda yemek yerken en çok işine yarayacak konulardan biri bu. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir şeyi yemediğini söyleyemezsen tabağında sürprizler çıkar. Üç kalıpla bunu kibarca halledeceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("allergisch"),
          tr("Türkçesi 'alerjik' demek. Lütfen"),
          de("allergisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "allergisch" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Nuss"),
          tr("Türkçesi 'sert kabuklu yemiş' demek; fındık da ceviz de bu kelimeye girer. Lütfen"),
          de("die Nuss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nuss" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Ei"),
          tr("Türkçesi 'yumurta' demek. Lütfen"),
          de("das Ei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ei" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ohne"),
          tr("Türkçesi 'olmadan, -sız' demek. Lütfen"),
          de("ohne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ohne" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("vertragen"),
          tr("Türkçesi 'bünyesine uymak, dokunmamak' demek. Lütfen"),
          de("vertragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vertragen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Schinken"),
          tr("Türkçesi 'jambon' demek. Lütfen"),
          de("der Schinken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schinken" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Hähnchen"),
          tr("Türkçesi 'piliç' demek. Lütfen"),
          de("das Hähnchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Hähnchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Eis"),
          tr("Türkçesi 'dondurma' demek. Lütfen"),
          de("das Eis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Eis" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich esse kein …"),
          tr(
            "Yani '… yemiyorum'. Türkçede olumsuzluk fiilin içine bir ek olarak girer; Almancada ise yiyeceğin önüne ayrı bir kelime olarak gelir.",
          ),
        ],
      },
      {
        say: [
          tr("Bu kelime yiyeceğin cinsine göre biraz değişir:"),
          de("das Fleisch"),
          tr("için"),
          de("kein Fleisch"),
          tr("deriz, eril olan"),
          de("der Käse"),
          tr("için ise"),
          de("keinen Käse"),
          tr("olur."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich esse kein Fleisch"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich esse kein Fleisch" },
      },
      {
        say: [tr("Sıra sende: 'Peynir yemiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich esse keinen Käse",
          hint: [
            de("der Käse"),
            tr("eril olduğu için olumsuzluk kelimesi de değişir:"),
            de("Ich esse keinen Käse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız alerji için:"),
          de("Ich bin allergisch gegen …"),
          tr("Kalıbın kendisi hiç değişmiyor; sonuna yiyeceğin adını ekliyorsun."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kuruyemişe alerjim var.' Almancası:"),
          de("Ich bin allergisch gegen Nüsse."),
          tr("Kuruyemişleri çoğul söylüyoruz. Lütfen"),
          de("Ich bin allergisch gegen Nüsse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin allergisch gegen Nüsse" },
      },
      {
        say: [tr("Şimdi sen: 'Süte alerjim var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin allergisch gegen Milch",
          hint: [
            tr("Kalıbın sonuna yiyeceğin adını ekle, başka hiçbir şey değişmez:"),
            de("Ich bin allergisch gegen Milch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıp sorunu baştan çözer:"),
          de("Gibt es eine Suppe ohne Ei?"),
          tr("Yani 'Yumurtasız çorba var mı?' Lütfen"),
          de("Gibt es eine Suppe ohne Ei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Gibt es eine Suppe ohne Ei" },
      },
      {
        say: [
          tr("Bir de her yerde işine yarayacak kısa bir cümle var:"),
          de("Ich vertrage das nicht."),
          tr("Yani 'Bu bana dokunuyor.' Lütfen"),
          de("Ich vertrage das nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich vertrage das nicht" },
      },
      {
        say: [
          tr("Küçük bir ek bilgi: dişil kelimelerde olumsuzluk kelimesi"),
          de("keine"),
          tr("olur. Sosis dişil olduğu için"),
          de("keine Wurst"),
          tr("denir."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich esse keine Wurst."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich esse keine Wurst.",
          answer: true,
          why: [
            tr("Doğru."),
            de("die Wurst"),
            tr("dişil olduğu için olumsuzluk kelimesi"),
            de("keine"),
            tr("biçimini alır."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık tabağına ne geleceğini kendin belirleyebilirsin. Şimdi işyerinin yemekhanesindesin ve aşçı bugün ne olduğunu anlatıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İşyerinin yemekhanesinde sıradasın ve bugünün yemeğinde yiyemediğin bir şey olabilir. Neyi yemediğini söyle, alerjini anlat ve o malzeme olmadan bir seçenek olup olmadığını sor.",
      partner: "yemeğini anlatmayı seven, sabırlı bir aşçı",
      opening: "Heute gibt es Suppe und Wurst. Was möchten Sie?",
      openingTr: "Bugün çorba ve sosis var. Ne istersiniz?",
      goal: "Yiyemediğin şey söylenmiş ve sana uygun bir seçenek bulunmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-einladung-essen",
    icon: "party",
    level: "A1",
    course: "de",
    title: "Zum Essen eingeladen",
    titleTr: "Yemek daveti",
    summary: "Sofrada ikramı kabul etmeyi, kibarca reddetmeyi ve yemeği övmeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "schmecken", tr: "tadı güzel olmak" },
      { de: "lecker", tr: "lezzetli" },
      { de: "anbieten", tr: "sunmak" },
      { de: "probieren", tr: "tatmak" },
      { de: "satt", tr: "tok" },
          { de: "danken", tr: "teşekkür etmek" },
      { de: "sich freuen", tr: "sevinmek" },
      { de: "bitten", tr: "rica etmek" },
],
    patterns: [
      { de: "Möchtest du …?", tr: "karşındakine bir şey teklif ederken kullanılır" },
      { de: "Das schmeckt sehr gut", tr: "yemeği överken kullanılır" },
      { de: "Nein danke, ich bin satt", tr: "kibarca reddederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir yemek davetindeyiz. İkramı kabul etmeyi, kibarca reddetmeyi ve yemeği övmeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da sofrada yemeği övmek insanı çok mutlu eder; 'yeter' demeyi bilmek de en az onun kadar işe yarar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("schmecken"),
          tr("Türkçesi 'tadı güzel olmak' demek; yemekten söz ederken kullanılır. Lütfen"),
          de("schmecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schmecken" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("lecker"),
          tr("Türkçesi 'lezzetli' demek. Lütfen"),
          de("lecker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lecker" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("anbieten"),
          tr("Türkçesi 'sunmak' demek. Lütfen"),
          de("anbieten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anbieten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("probieren"),
          tr("Türkçesi 'tatmak, denemek' demek. Lütfen"),
          de("probieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "probieren" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("satt"),
          tr("Türkçesi 'tok' demek. Lütfen"),
          de("satt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "satt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("danken"),
          tr("Türkçesi 'teşekkür etmek' demek. Lütfen"),
          de("danken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "danken" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("sich freuen"),
          tr("Türkçesi 'sevinmek' demek. Lütfen"),
          de("sich freuen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich freuen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bitten"),
          tr("Türkçesi 'rica etmek' demek. Lütfen"),
          de("bitten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bitten" },
      },
      {
        say: [
          tr("İlk kalıbımız teklif etmek için:"),
          de("Möchtest du …?"),
          tr("Kafede kendin için"),
          de("ich möchte"),
          tr("diyordun; karşındakine sorarken fiilin sonu değişir ve"),
          de("möchtest du"),
          tr("olur."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Tatlı ister misin?' Almancası:"),
          de("Möchtest du einen Nachtisch?"),
          tr("Lütfen"),
          de("Möchtest du einen Nachtisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Möchtest du einen Nachtisch" },
      },
      {
        say: [
          tr(
            "Şimdi bir şeyi denemesini teklif edelim. Cümlede iki fiil olunca çekimli olan başta kalır, asıl fiil mastar hâliyle en sona gider.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Çorbayı tatmak ister misin?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Möchtest du die Suppe probieren",
          hint: [
            tr("Soru başta, nesne ortada, asıl fiil en sonda:"),
            de("Möchtest du die Suppe probieren?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız övgü için:"),
          de("Das schmeckt sehr gut."),
          tr("Yani 'Çok lezzetli.' Bu fiil yalnızca tat için kullanılır, başka yerde karşına çıkmaz."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das schmeckt sehr gut"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das schmeckt sehr gut" },
      },
      {
        say: [tr("Şimdi neyin lezzetli olduğunu söyle: 'Çorba çok lezzetli.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Die Suppe schmeckt sehr gut",
          hint: [
            tr("Neyin lezzetli olduğunu başa koy, fiili hemen arkasına ekle:"),
            de("Die Suppe schmeckt sehr gut."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Tek kelimeyle övmek istersen"),
          de("Sehr lecker!"),
          tr("demen yeter; sofrada en çok duyacağın kelimelerden biri budur."),
        ],
      },
      {
        say: [
          tr("Bir de kibarca 'yeter' demeyi öğrenelim:"),
          de("Nein danke, ich bin satt."),
          tr("Yani 'Hayır teşekkürler, doydum.' Lütfen"),
          de("Nein danke, ich bin satt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nein danke, ich bin satt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Möchtest du probieren die Suppe?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Möchtest du probieren die Suppe?",
          answer: false,
          why: [
            tr("Cümlede iki fiil var, o yüzden asıl fiil en sona gider. Doğrusu:"),
            de("Möchtest du die Suppe probieren?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir sofrada kendini idare edebilirsin. Şimdi bir arkadaşının evindesin: sofra kurulmuş ve ev sahibi tabağını doldurmak için sabırsızlanıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir Alman arkadaşının evine yemeğe davetlisin ve sofraya yeni oturdun. İkramları kabul et ya da kibarca reddet, yemeği öv ve ev sahibine de bir şey teklif et.",
      partner: "misafirini doyurmadan bırakmayan, ısrarcı bir ev sahibi",
      opening: "Willkommen! Möchtest du zuerst eine Suppe?",
      openingTr: "Hoş geldin! Önce bir çorba ister misin?",
      goal: "İkramlar konuşulmuş, yemek övülmüş ve sofradan kalkarken teşekkür edilmiş olur.",
      minTurns: 6,
    },
  },
];

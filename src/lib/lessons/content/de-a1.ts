import { de, tr, type Lesson } from "../types";

/**
 * A1 dersleri — Almanca.
 *
 * Her ders bir senaryo (tanışma, kafe) ve o senaryonun konuşulabilmesi için
 * gereken en küçük dil takımını öğretiyor: birkaç kelime, birkaç kalıp.
 * Anlatımın sırası her derste aynı iskelet: hazır mısın → kelimeler tek tek →
 * kalıp + örnek + üretim → doğru/yanlış → konuşmaya geçiş. İskeletin sabit
 * olması öğrencinin dersin biçimini değil içeriğini düşünmesini sağlıyor.
 */
export const deA1: Lesson[] = [
  {
    id: "de-a1-hallo",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Hallo!",
    titleTr: "Tanışma",
    summary: "Adını, nereli olduğunu ve nerede oturduğunu söylemeyi öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "hallo", tr: "merhaba" },
      { de: "heißen", tr: "adı … olmak" },
      { de: "kommen", tr: "gelmek" },
      { de: "wohnen", tr: "oturmak" },
      { de: "der Name", tr: "isim" },
    ],
    patterns: [
      { de: "Ich heiße …", tr: "adını söylerken kullanılır" },
      { de: "Ich komme aus …", tr: "nereli olduğunu söylerken kullanılır" },
      { de: "Ich wohne in …", tr: "nerede oturduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün kendimizi tanıtmayı öğreneceğiz. Üç kalıp işleyeceğiz: adını söylemek, nereli olduğunu söylemek ve nerede oturduğunu söylemek. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu üç kalıpla ilk tanışma konuşmanı yapabileceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("hallo"),
          tr("Türkçesi 'merhaba' demek. Lütfen"),
          de("hallo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hallo" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("heißen"),
          tr("Türkçesi 'adı bir şey olmak' demek. Lütfen"),
          de("heißen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heißen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("kommen"),
          tr("Türkçesi 'gelmek' demek. Lütfen"),
          de("kommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kommen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("wohnen"),
          tr("Türkçesi 'oturmak, yaşamak' demek. Lütfen"),
          de("wohnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wohnen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Name"),
          tr("Türkçesi 'isim' demek. Lütfen"),
          de("der Name"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Name" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Ich heiße …"),
          tr("Adını söylerken kullanılır, yani 'Benim adım …' demek."),
        ],
      },
      {
        say: [
          tr("Örnek bir cümle: 'Benim adım Anna.' Almancası:"),
          de("Ich heiße Anna."),
          tr("Lütfen"),
          de("Ich heiße Anna"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich heiße Anna" },
      },
      {
        say: [
          tr(
            "Şimdi sıra sende: 'Benim adım Ali.' demek için hangi Almanca cümleyi kullanırsın? Lütfen söyle.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich heiße Ali",
          hint: [
            tr("Kalıbımız"),
            de("Ich heiße …"),
            tr("idi. Adı kalıbın sonuna ekle ve tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich komme aus …"),
          tr("Nereli olduğunu söyler: 'Ben …'dan geliyorum' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben Türkiye'den geliyorum.' Almancası:"),
          de("Ich komme aus der Türkei."),
          tr("Lütfen"),
          de("Ich komme aus der Türkei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich komme aus der Türkei" },
      },
      {
        say: [
          tr(
            "Peki 'Ben İstanbul'dan geliyorum.' demek için hangi cümleyi kullanırsın? Küçük bir bilgi: şehir adlarının önüne artikel gelmez.",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich komme aus Istanbul",
          hint: [
            tr("Şehir adlarının önüne artikel gelmez, kalıp yeterli:"),
            de("Ich komme aus Istanbul."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız:"),
          de("Ich wohne in …"),
          tr("Nerede oturduğunu söyler: '… şehrinde oturuyorum' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Berlin'de oturuyorum.' Almancası:"),
          de("Ich wohne in Berlin."),
          tr("Lütfen"),
          de("Ich wohne in Berlin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wohne in Berlin" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich heiße aus Ankara."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich heiße aus Ankara.",
          answer: false,
          why: [
            de("heißen"),
            tr("yalnızca ad söylemek içindir. Nereli olduğunu söylemek için"),
            de("Ich komme aus Ankara."),
            tr("denir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bugün kendini tanıtmayı öğrendin. Şimdi öğrendiklerini gerçek bir konuşmada kullanma zamanı: yeni bir komşunla tanışacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartmanına yeni taşındın ve merdivende bir komşunla karşılaştın. Kendini tanıt: adını, nereli olduğunu ve nerede oturduğunu söyle.",
      partner: "meraklı ama kibar bir komşu",
      opening: "Hallo! Sie sind neu hier, oder? Wie heißen Sie?",
      openingTr: "Merhaba! Buraya yeni taşındınız, değil mi? Adınız ne?",
      minTurns: 4,
    },
  },
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
          tr("Son kelimemiz:"),
          de("die Rechnung"),
          tr("Türkçesi 'hesap' demek. Lütfen"),
          de("die Rechnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rechnung" },
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
          tr("Bir püf noktası: eril kelimelerde 'ein' değil 'einen' denir."),
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
            tr("eril; 'ein' değil 'einen' olmalı:"),
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
            tr("eril, 'einen' alır;"),
            de("das Wasser"),
            tr("nötr, 'ein' kalır:"),
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
            tr("eril ve burada nesne; 'einen' olmalı. Doğrusu:"),
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
      minTurns: 4,
    },
  },
];

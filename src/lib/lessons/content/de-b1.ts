import { de, tr, type Lesson } from "../types";

/**
 * B1 dersleri — Almanca.
 *
 * A seviyeleri tek cümle kurdurdu; B1 cümleleri bağlamayı ve inceltmeyi
 * öğretiyor. Senaryolar da buna göre "yetişkin işleri": iş görüşmesi ve ev
 * arama — ikisi de Almanya'da yaşayan birinin er geç yaşayacağı, kalıpların
 * gerçekten gerektiği konuşmalar.
 */
export const deB1: Lesson[] = [
  {
    id: "de-b1-bewerbung",
    level: "B1",
    course: "de",
    title: "Das Vorstellungsgespräch",
    titleTr: "İş görüşmesi",
    summary: "Sebep anlatmayı öğretir: weil yan cümlesi ve seit + Dativ.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "die Stelle", tr: "pozisyon, iş" },
      { de: "die Erfahrung", tr: "deneyim" },
      { de: "sich bewerben", tr: "başvurmak" },
      { de: "die Stärke", tr: "güçlü yön" },
      { de: "der Lebenslauf", tr: "özgeçmiş" },
    ],
    patterns: [
      { de: "…, weil …", tr: "sebep söylerken kullanılır; fiil yan cümlenin sonuna gider" },
      { de: "seit + Dativ", tr: "'…'den beri' derken kullanılır: seit drei Jahren" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir iş görüşmesindesin! Sebep bildiren 'weil' cümlelerini ve '…'den beri' anlamındaki 'seit' kalıbını öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İş görüşmesinin iki temel sorusu var: neden ve ne zamandır. İkisine de bu dersin kalıplarıyla cevap vereceksin. Önce kelimeler.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Stelle"),
          tr("Türkçesi 'pozisyon, iş' demek. Lütfen"),
          de("die Stelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stelle" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Erfahrung"),
          tr("Türkçesi 'deneyim' demek. Lütfen"),
          de("die Erfahrung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erfahrung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sich bewerben"),
          tr("Türkçesi 'başvurmak' demek. Lütfen"),
          de("sich bewerben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich bewerben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Stärke"),
          tr("Türkçesi 'güçlü yön' demek. Lütfen"),
          de("die Stärke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stärke" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Lebenslauf"),
          tr("Türkçesi 'özgeçmiş' demek. Lütfen"),
          de("der Lebenslauf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Lebenslauf" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("weil"),
          tr(
            "'çünkü' demek. Ama dikkat: 'weil' ile başlayan yan cümlede fiil cümlenin SONUNA gider. Türkçedeki gibi ortada kalmaz.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Başvuruyorum çünkü yeni deneyimler istiyorum.' Almancası:"),
          de("Ich bewerbe mich, weil ich neue Erfahrungen möchte."),
          tr("Lütfen"),
          de("Ich bewerbe mich, weil ich neue Erfahrungen möchte"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Ich bewerbe mich, weil ich neue Erfahrungen möchte",
        },
      },
      {
        say: [
          tr(
            "Şimdi sıra sende: 'Bu pozisyonu istiyorum çünkü Almanca konuşuyorum.' nasıl dersin?",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich möchte die Stelle, weil ich Deutsch spreche",
          accept: ["Ich möchte diese Stelle, weil ich Deutsch spreche"],
          hint: [
            tr("'weil'den sonra fiil en sona gider:"),
            de("Ich möchte die Stelle, weil ich Deutsch spreche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("seit"),
          tr(
            "'…'den beri' demek ve her zaman Dativ alır: seit einem Jahr, seit drei Jahren. Türkçeden farkı şu: Almanca hâlâ süren işler için şimdiki zaman kullanır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Üç yıldır öğretmen olarak çalışıyorum.' Almancası:"),
          de("Ich arbeite seit drei Jahren als Lehrer."),
          tr("Lütfen"),
          de("Ich arbeite seit drei Jahren als Lehrer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich arbeite seit drei Jahren als Lehrer" },
      },
      {
        say: [tr("Peki 'Bir yıldır Almanca öğreniyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich lerne seit einem Jahr Deutsch",
          hint: [
            tr("'seit' Dativ alır: 'ein Jahr' → 'einem Jahr'."),
            de("Ich lerne seit einem Jahr Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich lerne Deutsch, weil ich arbeite in Berlin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich lerne Deutsch, weil ich arbeite in Berlin.",
          answer: false,
          why: [
            de("weil"),
            tr("fiili yan cümlenin sonuna atar. Doğrusu:"),
            de("Ich lerne Deutsch, weil ich in Berlin arbeite."),
          ],
        },
      },
      {
        say: [
          tr(
            "Hazırsın! Şimdi görüşme odasındasın: neden başvurduğunu 'weil' ile, ne zamandır çalıştığını 'seit' ile anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir şirkette iş görüşmesindesin. Neden başvurduğunu 'weil' ile, ne kadar süredir çalıştığını ya da öğrendiğini 'seit' ile anlat; güçlü yönlerinden bahset.",
      partner: "profesyonel ama samimi bir İK uzmanı",
      opening:
        "Guten Tag, schön, dass Sie da sind! Erzählen Sie mal: Warum bewerben Sie sich bei uns?",
      openingTr: "İyi günler, hoş geldiniz! Anlatın bakalım: Neden bize başvuruyorsunuz?",
      minTurns: 5,
    },
  },
  {
    id: "de-b1-wohnung",
    level: "B1",
    course: "de",
    title: "Die Wohnungssuche",
    titleTr: "Ev arama",
    summary: "Kibar istek ve ricayı öğretir: Konjunktiv II ile würde ve könnten.",
    minutes: 10,
    focusId: "Konjunktiv-II",
    vocab: [
      { de: "die Wohnung", tr: "daire" },
      { de: "die Miete", tr: "kira" },
      { de: "die Besichtigung", tr: "daireyi gezme" },
      { de: "hell", tr: "aydınlık" },
      { de: "der Vermieter", tr: "ev sahibi" },
    ],
    patterns: [
      { de: "Ich würde gern …", tr: "kibarca '… isterdim' derken kullanılır" },
      { de: "Könnten Sie …?", tr: "kibar rica: '… yapabilir misiniz?' derken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ev arıyoruz! Almanya'da ev sahibiyle konuşmanın anahtarı kibarlık: 'isterdim' ve 'yapabilir misiniz' kalıplarını öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu iki kalıp Konjunktiv II ile kurulur — dilek kipi. Doğrudan 'istiyorum' demekten daha yumuşak duyulur ve resmî konuşmaların tamamı bununla döner. Önce kelimeler.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Wohnung"),
          tr("Türkçesi 'daire' demek. Lütfen"),
          de("die Wohnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wohnung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Miete"),
          tr("Türkçesi 'kira' demek. Lütfen"),
          de("die Miete"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Miete" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Besichtigung"),
          tr("Türkçesi 'daireyi gezme, görme randevusu' demek. Lütfen"),
          de("die Besichtigung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Besichtigung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("hell"),
          tr("Türkçesi 'aydınlık' demek. Lütfen"),
          de("hell"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hell" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Vermieter"),
          tr("Türkçesi 'ev sahibi' demek. Lütfen"),
          de("der Vermieter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vermieter" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich würde gern …"),
          tr("Kibarca '… isterdim' demek. Asıl fiil mastar hâliyle cümlenin sonuna gider."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Daireyi gezmek isterdim.' Almancası:"),
          de("Ich würde gern die Wohnung besichtigen."),
          tr("Lütfen"),
          de("Ich würde gern die Wohnung besichtigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich würde gern die Wohnung besichtigen" },
      },
      {
        say: [
          tr("Şimdi sıra sende: 'Ev sahibiyle konuşmak isterdim.' nasıl dersin? İpucu:"),
          de("mit"),
          tr("edatı Dativ alır."),
        ],
        expect: {
          kind: "produce",
          target: "Ich würde gern mit dem Vermieter sprechen",
          hint: [
            de("mit"),
            tr("Dativ aldığı için 'mit dem Vermieter' olur, fiil sona:"),
            de("Ich würde gern mit dem Vermieter sprechen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Könnten Sie …?"),
          tr("Kibar rica: '… yapabilir misiniz?' demek. Fiil yine cümlenin sonunda."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bana daireyi gösterebilir misiniz?' Almancası:"),
          de("Könnten Sie mir die Wohnung zeigen?"),
          tr("Lütfen"),
          de("Könnten Sie mir die Wohnung zeigen?"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Könnten Sie mir die Wohnung zeigen" },
      },
      {
        say: [tr("Peki 'Bana kirayı söyleyebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Könnten Sie mir die Miete sagen",
          accept: ["Könnten Sie die Miete sagen"],
          hint: [
            tr("Kalıp:"),
            de("Könnten Sie"),
            tr("artı istenen şey, fiil sonda:"),
            de("Könnten Sie mir die Miete sagen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Könnten Sie zeigen mir die Wohnung?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Könnten Sie zeigen mir die Wohnung?",
          answer: false,
          why: [
            tr("Bu kalıpta asıl fiil cümlenin sonuna gider. Doğrusu:"),
            de("Könnten Sie mir die Wohnung zeigen?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Çok iyi! Şimdi ilanını gördüğün daire için ev sahibiyle görüşüyorsun. Kibar kalıplarla soru sor ve bir gezme randevusu almaya çalış.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir daire ilanı için ev sahibiyle telefonda görüşüyorsun. 'Ich würde gern …' ve 'Könnten Sie …?' kalıplarıyla daireyi sor, kirayı öğren ve bir gezme randevusu al.",
      partner: "biraz resmî ama yardımsever bir ev sahibi",
      opening: "Guten Tag! Sie interessieren sich für die Wohnung, richtig?",
      openingTr: "İyi günler! Daireyle ilgileniyorsunuz, değil mi?",
      minTurns: 5,
    },
  },
];

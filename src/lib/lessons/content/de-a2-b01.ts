import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 1 — konular 001-010 (Modül 1: Geçmişi anlatmak).
 *
 * A1'de Perfekt'in iskeleti kurulmuştu: yardımcı fiil ikinci sırada, ortaç
 * sonda, hareket fiilleri sein alıyor. Bu modül o iskeleti üç yönden
 * dolduruyor — kuralsız ortaçlar, ayrılabilen fiillerin ortadan bölünen
 * ortaçları ve ge- almayan fiiller. Sonda iki ders Präteritum'a geçiyor:
 * sein ve haben geçmişte Perfekt'e girmiyor, kendi kısa biçimlerini
 * kullanıyor ve konuşmada en çok duyulan geçmiş bu.
 *
 * Sözlükçe havuzun A2 katmanından geliyor ve ders başına sekiz kelime taşıyor.
 * Fiil seçimi dersin dilbilgisini taşıyor: 002'nin sekiz fiilinin sekizi de
 * kuralsız ortaç kuruyor, 003'ün sekizi de ayrılabilen. Kelime listesi burada
 * süs değil, alıştırmanın kendisi.
 */
export const deA2B01: Lesson[] = [
  {
    id: "de-a2-urlaub",
    icon: "vacation",
    level: "A2",
    course: "de",
    title: "Letzter Urlaub",
    titleTr: "Son tatil",
    summary: "Geçmişi anlatmayı öğretir: Perfekt, sein ve haben ayrımıyla.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "die Natur", tr: "doğa" },
      { de: "der Berg", tr: "dağ" },
      { de: "losgehen", tr: "yola çıkmak" },
      { de: "verreisen", tr: "seyahate çıkmak" },
      { de: "hinfahren", tr: "araçla gitmek" },
      { de: "zurückkommen", tr: "geri gelmek" },
      { de: "unternehmen", tr: "bir şeyler yapmak" },
      { de: "fantastisch", tr: "muhteşem" },
    ],
    patterns: [
      { de: "Ich bin … verreist.", tr: "geçmişte seyahate çıktığını söylerken kullanılır" },
      { de: "Wir haben … unternommen.", tr: "orada neler yaptığını anlatırken kullanılır" },
      { de: "Es war fantastisch.", tr: "bir deneyimi tek cümlede değerlendirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün geçmişten bahsediyoruz: son tatilin! Almancada geçmiş, Perfekt ile anlatılır. Bir yere gitmeyi ve orada bir şeyler yapmayı anlatmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Perfekt iki parçadan oluşur: yardımcı fiil ikinci sırada, asıl fiil ortaç hâliyle cümlenin sonunda. Yardımcı fiil hep aynı değil; yer değiştiren fiiller birini, geri kalanı ötekini alır. Bugünkü sekiz kelimeden üçü tam da o ayrımı taşıyor. Önce kelimeler.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Natur"),
          tr("Türkçesi 'doğa' demek. Lütfen"),
          de("die Natur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Natur" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Berg"),
          tr("Türkçesi 'dağ' demek. Lütfen"),
          de("der Berg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Berg" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("losgehen"),
          tr("Türkçesi 'yola çıkmak' demek. Lütfen"),
          de("losgehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "losgehen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verreisen"),
          tr("Türkçesi 'seyahate çıkmak' demek; şehirden ayrılıp gitmek. Lütfen"),
          de("verreisen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verreisen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("hinfahren"),
          tr("Türkçesi 'oraya araçla gitmek' demek. Lütfen"),
          de("hinfahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hinfahren" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zurückkommen"),
          tr("Türkçesi 'geri gelmek' demek. Lütfen"),
          de("zurückkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückkommen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("unternehmen"),
          tr(
            "Türkçesi 'bir şeyler yapmak' demek; gezmek, çıkmak, program yapmak anlamında. Lütfen",
          ),
          de("unternehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unternehmen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("fantastisch"),
          tr("Türkçesi 'muhteşem' demek. Lütfen"),
          de("fantastisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fantastisch" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich bin … verreist."),
          tr(
            "Yer değiştiren fiiller yardımcı olarak birinci fiili alır: gitmek, gelmek, yola çıkmak. Bugünkü üç fiilin üçü de bu gruptan.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yazın seyahate çıktım.' Almancası:"),
          de("Im Sommer bin ich verreist."),
          tr("Lütfen"),
          de("Im Sommer bin ich verreist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Im Sommer bin ich verreist" },
      },
      {
        say: [tr("Şimdi sıra sende: 'Pazar günü geri geldim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Sonntag bin ich zurückgekommen",
          hint: [
            de("zurückkommen"),
            tr("de yer değiştiren bir fiil, o yüzden yardımcı fiil aynı kalıyor ve ortaç sonda duruyor:"),
            de("Am Sonntag bin ich zurückgekommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir haben … unternommen."),
          tr(
            "Yer değiştirmeyen fiiller öteki yardımcı fiili alır. Bu fiilin ortacında bir şey daha var: başında 'ge' yok. Vurgusuz bir ön ek taşıyan fiiller o heceyi hiç almaz.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Dağlarda çok şey yaptık.' Almancası:"),
          de("In den Bergen haben wir viel unternommen."),
          tr("Lütfen"),
          de("In den Bergen haben wir viel unternommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "In den Bergen haben wir viel unternommen" },
      },
      {
        say: [tr("Sıra sende: 'Doğada çok şey yaptık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "In der Natur haben wir viel unternommen",
          hint: [
            tr("Yer değiştirmeyen fiil ikinci yardımcı fiili alır ve ortaç yine sonda:"),
            de("In der Natur haben wir viel unternommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız çok kısa:"),
          de("Es war fantastisch."),
          tr(
            "Bir deneyimi tek cümlede değerlendirmenin en kolay yolu. Anlatının sonuna eklenir.",
          ),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe nach Berlin hingefahren."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe nach Berlin hingefahren.",
          answer: false,
          why: [
            de("hinfahren"),
            tr("yer değiştiren bir fiil; ikinci yardımcı fiili değil birinciyi alır. Doğrusu:"),
            de("Ich bin nach Berlin hingefahren."),
          ],
        },
      },
      {
        say: [
          tr(
            "Harika! Şimdi bir arkadaşın sana tatilini soruyor. Nereye gittiğini, orada ne yaptığını ve ne zaman döndüğünü anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla kahve içiyorsun ve sana son tatilini soruyor. Nereye gittiğini yer değiştiren fiillerle, orada ne yaptığını ise ikinci yardımcı fiille anlat.",
      partner: "tatil hikâyelerini seven bir arkadaş",
      opening: "Hallo! Du warst doch weg. Wohin bist du verreist?",
      openingTr: "Selam! Sen yoktun ya. Nereye seyahat ettin?",
      goal: "Tatilin nereye, ne zaman ve neler yaparak geçtiği anlatılmış; arkadaşın da kendi tatilinden bir şey söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-perfekt-unregel",
    icon: "food",
    level: "A2",
    course: "de",
    title: "Gesungen, gerufen, verloren",
    titleTr: "Kural dışı ortaçlar",
    summary:
      "Sık kullanılan fiillerin kuralsız ortaçlarını ve neden ezberlenmeleri gerektiğini öğretir.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "verlieren", tr: "kaybetmek" },
      { de: "nennen", tr: "adlandırmak" },
      { de: "weglaufen", tr: "kaçmak" },
      { de: "fallen", tr: "düşmek" },
      { de: "verbrennen", tr: "yakmak" },
      { de: "backen", tr: "fırında pişirmek" },
      { de: "lügen", tr: "yalan söylemek" },
      { de: "sterben", tr: "ölmek" },
    ],
    patterns: [
      { de: "Ich habe … verloren.", tr: "bir şeyi kaybettiğini anlatır" },
      { de: "Er hat mich … genannt.", tr: "kuralsız ortacın ikinci örneğini gösterir" },
      { de: "Er ist … gefallen.", tr: "kuralsız ortaç ile yer değiştiren fiili birleştirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Perfekt'in kuralını biliyorsun ama fiillerin bir kısmı o kurala uymuyor. Bugün en sık kullanılan sekiz tanesini alacağız; onlar olmadan geçmişten söz edemezsin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede geçmiş eki hep aynıdır: geldim, gittim, yedim. Almancada fiillerin bir grubu ortaç kurarken hem sonunu hem ortasındaki sesli harfi değiştirir. Kuralı yok, ezberlenir; ama iyi haber şu: bu gruptakiler en sık kullanılan fiiller olduğu için onları her gün duyacak ve kendiliğinden öğreneceksin. Bugünkü sekiz kelimenin sekizi de bu gruptan.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("verlieren"),
          tr("Türkçesi 'kaybetmek' demek. Lütfen"),
          de("verlieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verlieren" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("nennen"),
          tr("Türkçesi 'adlandırmak' demek. Lütfen"),
          de("nennen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nennen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("weglaufen"),
          tr("Türkçesi 'kaçmak' demek. Lütfen"),
          de("weglaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weglaufen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("fallen"),
          tr("Türkçesi 'düşmek' demek. Lütfen"),
          de("fallen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fallen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("verbrennen"),
          tr("Türkçesi 'yakmak' demek. Lütfen"),
          de("verbrennen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verbrennen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("backen"),
          tr("Türkçesi 'fırında pişirmek' demek; kek, ekmek, kurabiye. Lütfen"),
          de("backen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "backen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("lügen"),
          tr("Türkçesi 'yalan söylemek' demek. Lütfen"),
          de("lügen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lügen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sterben"),
          tr("Türkçesi 'ölmek' demek. Lütfen"),
          de("sterben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sterben" },
      },
      {
        say: [
          tr("Şimdi farkı duy. Kurallı bir fiilde ortacın sonu düz kalır:"),
          de("gekauft, gemacht, gefragt"),
          tr("Bugünkü fiillerde ise sonu değişiyor ve çoğunlukla ortadaki sesli harf de kayıyor:"),
          de("verloren, genannt, weggelaufen, verbrannt, gebacken, gelogen"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe … verloren."),
          tr("Bir şeyi kaybettiğini anlatır. Sesli harfin nasıl kaydığına dikkat et."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Anahtarımı kaybettim.' Almancası:"),
          de("Ich habe meinen Schlüssel verloren."),
          tr("Lütfen"),
          de("Ich habe meinen Schlüssel verloren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe meinen Schlüssel verloren" },
      },
      {
        say: [tr("Sıra sende: 'Ekmeği yaktım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe das Brot verbrannt",
          hint: [
            de("verbrennen"),
            tr("kuralsız bir fiil; ortacı düz değil, sonu değişiyor:"),
            de("Ich habe das Brot verbrannt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Er hat mich … genannt."),
          tr("Aynı grup, başka bir fiil. Bu fiilin ortacında hem sesli harf hem de son değişiyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bir pasta pişirdik.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben einen Kuchen gebacken",
          hint: [
            de("backen"),
            tr("fiilinin ortacı sonundan değişiyor:"),
            de("Wir haben einen Kuchen gebacken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız iki kuralı birleştiriyor:"),
          de("Er ist … gefallen."),
          tr(
            "Fiil hem kuralsız hem de yer değiştiren bir fiil, yani yardımcı fiil de değişiyor. İkisi bir arada geldiğinde en çok hata burada yapılır.",
          ),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Glas ist vom Tisch gefallen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Glas ist vom Tisch gefallen.",
          answer: true,
          why: [
            de("fallen"),
            tr("hem kuralsız hem de yer değiştiren bir fiil: yardımcı fiil doğru, ortaç doğru."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi bir arkadaşınla dün ne yaptığınızı konuşuyorsunuz. Bugünkü kuralsız fiilleri kullanarak anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla dün akşamı konuşuyorsunuz. Sen bir şeyi kaybettin, sonra beklenmedik bir şey oldu. Anlatırken bugünkü kuralsız ortaçları kullan.",
      partner: "merakla dinleyen bir arkadaş",
      opening: "Und? Was hast du gestern Abend gemacht?",
      openingTr: "Ee? Dün akşam ne yaptın?",
      goal: "Dün akşam olan iki olay kuralsız ortaçlarla anlatılmış ve arkadaşın da kendi akşamından bir şey söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-perfekt-trennbar",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Ich habe alles vorbereitet",
    titleTr: "Ayrılabilenlerin Perfekt'i",
    summary:
      "Ayrılabilen fiillerin ortacını öğretir: ön ek ile kök arasına giren hece.",
    minutes: 10,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "vorbeikommen", tr: "uğramak" },
      { de: "zurückbringen", tr: "geri götürmek" },
      { de: "vorbereiten", tr: "hazırlamak" },
      { de: "aufwecken", tr: "uyandırmak" },
      { de: "ausgehen", tr: "dışarı çıkmak" },
      { de: "zuhören", tr: "dinlemek" },
      { de: "abschließen", tr: "kilitlemek" },
      { de: "ausschalten", tr: "kapatmak" },
    ],
    patterns: [
      { de: "Ich habe alles vorbereitet.", tr: "hazırlığı bitirdiğini söyler" },
      { de: "Er ist … vorbeigekommen.", tr: "birinin uğradığını anlatır" },
      { de: "Hast du … ausgeschaltet?", tr: "unutulmuş bir işi sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ayrılabilen fiillerin geçmişini öğreniyoruz. Bu fiiller şimdiki zamanda ikiye bölünüyordu; geçmişte ise bölünmüyor, ortadan açılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural tek cümle: ön ek başta kalır, ortacın hecesi ön ekle kökün arasına girer, hepsi tek kelime olarak yazılır. Bugünkü sekiz fiilin sekizi de ayrılabilen fiil; sekizinde de aynı şeyi göreceksin.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("vorbeikommen"),
          tr("Türkçesi 'uğramak' demek. Lütfen"),
          de("vorbeikommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorbeikommen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("zurückbringen"),
          tr("Türkçesi 'geri götürmek' demek. Lütfen"),
          de("zurückbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückbringen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("vorbereiten"),
          tr("Türkçesi 'hazırlamak' demek. Lütfen"),
          de("vorbereiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorbereiten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aufwecken"),
          tr("Türkçesi 'uyandırmak' demek. Lütfen"),
          de("aufwecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufwecken" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("ausgehen"),
          tr("Türkçesi 'dışarı çıkmak' demek; akşam eğlenmeye çıkmak anlamında. Lütfen"),
          de("ausgehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausgehen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zuhören"),
          tr("Türkçesi 'dinlemek' demek; birine kulak vermek. Lütfen"),
          de("zuhören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuhören" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("abschließen"),
          tr("Türkçesi 'kilitlemek' demek. Lütfen"),
          de("abschließen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abschließen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("ausschalten"),
          tr("Türkçesi 'kapatmak' demek; cihazı, ışığı kapatmak. Lütfen"),
          de("ausschalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausschalten" },
      },
      {
        say: [
          tr("Şimdi kuralı gör. Şimdiki zamanda fiil ikiye bölünüyordu:"),
          de("Ich schalte den Fernseher aus."),
          tr("Geçmişte ise bölünmüyor, ortadan açılıyor:"),
          de("Ich habe den Fernseher ausgeschaltet."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe alles vorbereitet."),
          tr(
            "Bu fiilin bir farkı var: kökü vurgusuz bir ön ekle başladığı için ortacın hecesini hiç almıyor. Ayrılabilen ön ek başta, gerisi düz.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yemeği hazırladım.' Almancası:"),
          de("Ich habe das Essen vorbereitet."),
          tr("Lütfen"),
          de("Ich habe das Essen vorbereitet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe das Essen vorbereitet" },
      },
      {
        say: [tr("Sıra sende: 'Kitapları geri götürdüm.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe die Bücher zurückgebracht",
          hint: [
            tr("Ön ek başta kalıyor, ortacın hecesi araya giriyor:"),
            de("Ich habe die Bücher zurückgebracht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Er ist … vorbeigekommen."),
          tr(
            "Uğramak yer değiştiren bir fiil, o yüzden yardımcı fiil değişiyor; ama ortacın kuruluşu aynı.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Dün akşam dışarı çıktık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Gestern Abend sind wir ausgegangen",
          hint: [
            de("ausgehen"),
            tr("yer değiştiren bir fiil, o yüzden birinci yardımcı fiili alır:"),
            de("Gestern Abend sind wir ausgegangen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız bir soru:"),
          de("Hast du … ausgeschaltet?"),
          tr("Evden çıkarken unutulmuş bir işi sormanın en doğal yolu."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe die Tür geabschlossen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe die Tür geabschlossen.",
          answer: false,
          why: [
            tr("Ortacın hecesi ön ekin önüne değil, ön ekle kökün arasına girer. Doğrusu:"),
            de("Ich habe die Tür abgeschlossen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi evden çıkmadan önce her şeyi yapıp yapmadığını konuşuyorsunuz. Bugünkü fiillerle anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Tatile çıkmadan önce ev arkadaşınla son kontrolü yapıyorsunuz. O soruyor, sen neyi hallettiğini ayrılabilen fiillerin ortacıyla anlatıyorsun.",
      partner: "her şeyi iki kez soran bir ev arkadaşı",
      opening: "Wir fahren gleich los. Hast du alles vorbereitet?",
      openingTr: "Birazdan yola çıkıyoruz. Her şeyi hazırladın mı?",
      goal: "Kapı, cihazlar ve hazırlık tek tek geçilmiş ve iki kişi de evden çıkmaya hazır olduğuna karar vermiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-gestern-abend",
    icon: "media",
    level: "A2",
    course: "de",
    title: "Gestern Abend",
    titleTr: "Dün akşam",
    summary: "Bir akşamı sırayla anlatmayı öğretir: önce, ardından, en son.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "einschlafen", tr: "uykuya dalmak" },
      { de: "spannend", tr: "sürükleyici" },
      { de: "abends", tr: "akşamları" },
      { de: "vorher", tr: "önceden" },
      { de: "anschließend", tr: "ardından" },
      { de: "zuletzt", tr: "en son" },
      { de: "das Programm", tr: "program" },
      { de: "ansehen", tr: "izlemek" },
    ],
    patterns: [
      { de: "Ich habe … angesehen.", tr: "ne izlediğini anlatır" },
      { de: "Anschließend bin ich eingeschlafen.", tr: "bir işten sonrasını anlatır" },
      { de: "Zuletzt habe ich …", tr: "akşamın son işini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir akşamı sırayla anlatmayı öğreniyoruz. Olayları anlatmak yetmez; hangisinin önce, hangisinin sonra olduğunu da söylemek gerekir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede sıra çoğu zaman fiilin kendisinden anlaşılır: 'yiyip yattım' dersin, sıra bellidir. Almancada bunu yapan ayrı kelimeler var ve bunlar cümlenin başına geçtiğinde özne fiilin arkasına düşer. Bugün hem o kelimeleri hem de o yer değiştirmeyi göreceğiz.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("einschlafen"),
          tr("Türkçesi 'uykuya dalmak' demek. Lütfen"),
          de("einschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einschlafen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("spannend"),
          tr("Türkçesi 'sürükleyici, merak uyandıran' demek. Lütfen"),
          de("spannend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spannend" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("abends"),
          tr("Türkçesi 'akşamları' demek; her akşam olan şeyler için. Lütfen"),
          de("abends"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abends" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("vorher"),
          tr("Türkçesi 'önceden, ondan önce' demek. Lütfen"),
          de("vorher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorher" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("anschließend"),
          tr("Türkçesi 'ardından' demek. Lütfen"),
          de("anschließend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anschließend" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zuletzt"),
          tr("Türkçesi 'en son' demek. Lütfen"),
          de("zuletzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuletzt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Programm"),
          tr("Türkçesi 'program' demek. Lütfen"),
          de("das Programm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Programm" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("ansehen"),
          tr("Türkçesi 'izlemek' demek. Lütfen"),
          de("ansehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ansehen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe … angesehen."),
          tr("Ne izlediğini anlatır. Fiil ayrılabilen bir fiil, ortacı ortadan açılıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sürükleyici bir program izledim.' Almancası:"),
          de("Ich habe ein spannendes Programm angesehen."),
          tr("Lütfen"),
          de("Ich habe ein spannendes Programm angesehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe ein spannendes Programm angesehen" },
      },
      {
        say: [
          tr("İkinci kalıbımız sırayı kuruyor:"),
          de("Anschließend bin ich eingeschlafen."),
          tr(
            "Sıra kelimesi başa geçince özne fiilin arkasına düşüyor. Türkçede böyle bir yer değiştirme yok, o yüzden burada dikkat gerekiyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Ardından uykuya daldım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Anschließend bin ich eingeschlafen",
          hint: [
            tr("Sıra kelimesi başta olduğu için özne fiilin arkasına geçer:"),
            de("Anschließend bin ich eingeschlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız akşamın son işini söylüyor:"),
          de("Zuletzt habe ich …"),
          tr("Aynı yer değiştirme burada da geçerli."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Önceden yemek yaptım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Vorher habe ich gekocht",
          hint: [
            de("vorher"),
            tr("başta olduğu için özne fiilin arkasına düşer:"),
            de("Vorher habe ich gekocht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Anschließend ich bin eingeschlafen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Anschließend ich bin eingeschlafen.",
          answer: false,
          why: [
            tr("Sıra kelimesi başa geçince fiil ikinci sırada kalmak zorunda, özne arkaya düşer. Doğrusu:"),
            de("Anschließend bin ich eingeschlafen."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi bir arkadaşın dün akşamını soruyor. Sırayı belli ederek anlat."),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş çıkışı bir arkadaşınla karşılaştın ve dün akşamı soruyor. En az üç işi sırayla anlat: önce ne yaptın, ardından ne oldu, en son ne yaptın.",
      partner: "akşamları hep dışarıda olan bir arkadaş",
      opening: "Sag mal, was hast du gestern Abend gemacht?",
      openingTr: "Söylesene, dün akşam ne yaptın?",
      goal: "Dün akşamın en az üç işi doğru sırayla anlatılmış ve arkadaşın da kendi akşamını sıralamış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-montagmorgen",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Chaos am Montag",
    titleTr: "Aksilik anlatma",
    summary: "Ters giden bir sabahı anlatmayı öğretir: gecikme, kaçırma, aksilik.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "verschlafen", tr: "uyuyakalmak" },
      { de: "verpassen", tr: "kaçırmak" },
      { de: "sich verspäten", tr: "gecikmek" },
      { de: "anhalten", tr: "durmak" },
      { de: "stehenbleiben", tr: "olduğu yerde durmak" },
      { de: "nass", tr: "ıslak" },
      { de: "hektisch", tr: "telaşlı" },
      { de: "schrecklich", tr: "korkunç" },
    ],
    patterns: [
      { de: "Ich habe verschlafen.", tr: "sabahın nasıl başladığını söyler" },
      { de: "Ich habe … verpasst.", tr: "neyi kaçırdığını anlatır" },
      { de: "Nichts hat geklappt.", tr: "gün hakkındaki genel hükmü verir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ters giden bir sabahı anlatıyoruz. Herkesin başına gelir ve anlatması da en çok işe yarayan hikâyelerden biridir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü fiillerin bir kısmı kuralsız ortaç kuruyor, bir kısmı da kendine has bir şey yapıyor: vurgusuz ön ekle başlayan fiiller ortacın hecesini hiç almıyor. Bunu iki kelimede birden göreceksin.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("verschlafen"),
          tr("Türkçesi 'uyuyakalmak' demek. Lütfen"),
          de("verschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verschlafen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("verpassen"),
          tr("Türkçesi 'kaçırmak' demek; otobüsü, treni, randevuyu. Lütfen"),
          de("verpassen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verpassen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sich verspäten"),
          tr("Türkçesi 'gecikmek' demek. Lütfen"),
          de("sich verspäten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verspäten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("anhalten"),
          tr("Türkçesi 'durmak, durdurmak' demek; araç için kullanılır. Lütfen"),
          de("anhalten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anhalten" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("stehenbleiben"),
          tr("Türkçesi 'olduğu yerde kalmak' demek; yürüyen biri ya da duran bir saat için. Lütfen"),
          de("stehenbleiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stehenbleiben" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("nass"),
          tr("Türkçesi 'ıslak' demek. Lütfen"),
          de("nass"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nass" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("hektisch"),
          tr("Türkçesi 'telaşlı, koşuşturmalı' demek. Lütfen"),
          de("hektisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hektisch" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("schrecklich"),
          tr("Türkçesi 'korkunç, berbat' demek. Lütfen"),
          de("schrecklich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schrecklich" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe verschlafen."),
          tr(
            "Buradaki fiil hem kuralsız hem de vurgusuz bir ön ekle başlıyor: ortacın hecesi yok ve fiilin sonu da değişmiyor. Şimdiki zamanla ortaç aynı görünüyor, farkı yardımcı fiil yaratıyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu sabah uyuyakaldım.' Almancası:"),
          de("Heute Morgen habe ich verschlafen."),
          tr("Lütfen"),
          de("Heute Morgen habe ich verschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Heute Morgen habe ich verschlafen" },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe … verpasst."),
          tr("Aynı ön ek, ama bu fiil kurallı: sonu düz kalıyor, yine de ortacın hecesi yok."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Otobüsü kaçırdım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe den Bus verpasst",
          hint: [
            de("verpassen"),
            tr("vurgusuz bir ön ekle başlıyor, o yüzden ortacın hecesi hiç gelmiyor:"),
            de("Ich habe den Bus verpasst."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız günü tek cümlede özetliyor:"),
          de("Nichts hat geklappt."),
          tr("Bu fiil kurallı ve ön eki yok, o yüzden ortaç düz kuruluyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Tren gecikti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Zug hat sich verspätet",
          hint: [
            tr("Dönüşlü zamir cümlede ayrı durur ve ortaç sona gider:"),
            de("Der Zug hat sich verspätet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe den Bus geverpasst."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe den Bus geverpasst.",
          answer: false,
          why: [
            tr("Vurgusuz ön ekle başlayan fiiller ortacın hecesini hiç almaz. Doğrusu:"),
            de("Ich habe den Bus verpasst."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi işe geç kaldın ve sebebini anlatıyorsun. Bugünkü kelimelerle anlat."),
        ],
      },
    ],
    roleplay: {
      scene:
        "Pazartesi sabahı işe yarım saat geç kaldın. Bir iş arkadaşın seni kapıda karşılıyor ve ne olduğunu soruyor. Sabahın aksiliklerini sırayla anlat.",
      partner: "seni kapıda karşılayan bir iş arkadaşı",
      opening: "Da bist du ja endlich! Was ist denn passiert?",
      openingTr: "Nihayet geldin! Ne oldu?",
      goal: "Gecikmenin en az iki sebebi anlatılmış ve iş arkadaşın da benzer bir sabahından söz etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-kindheit-foto",
    icon: "camera",
    level: "A2",
    course: "de",
    title: "Ein altes Foto",
    titleTr: "Eski bir fotoğraf",
    summary: "Çocukluğu anlatmayı öğretir: geçmişte olmak ve sahip olmak.",
    minutes: 10,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "damals", tr: "o zamanlar" },
      { de: "das Gesicht", tr: "yüz" },
      { de: "blond", tr: "sarışın" },
      { de: "schüchtern", tr: "utangaç" },
      { de: "brav", tr: "uslu" },
      { de: "verspielt", tr: "oyunbaz" },
      { de: "die Grundschule", tr: "ilkokul" },
      { de: "fotografieren", tr: "fotoğraf çekmek" },
    ],
    patterns: [
      { de: "Damals war ich …", tr: "çocukken nasıl olduğunu anlatır" },
      { de: "Wir hatten …", tr: "geçmişte neyin olduğunu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün eski bir fotoğrafa bakıyoruz ve çocukluğunu anlatıyorsun. Bunun için iki fiilin ayrı bir geçmiş biçimi var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İki fiil geçmişte Perfekt'e girmez: olmak ve sahip olmak. Onların kendi kısa geçmiş biçimleri vardır ve konuşmada en çok duyulan geçmiş budur. Bugün onları sekiz yeni kelimeyle çalıştıracağız.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("damals"),
          tr("Türkçesi 'o zamanlar' demek. Lütfen"),
          de("damals"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "damals" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Gesicht"),
          tr("Türkçesi 'yüz' demek. Lütfen"),
          de("das Gesicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gesicht" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("blond"),
          tr("Türkçesi 'sarışın' demek. Lütfen"),
          de("blond"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "blond" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schüchtern"),
          tr("Türkçesi 'utangaç' demek. Lütfen"),
          de("schüchtern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schüchtern" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("brav"),
          tr("Türkçesi 'uslu' demek; çocuklar için kullanılır. Lütfen"),
          de("brav"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "brav" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("verspielt"),
          tr("Türkçesi 'oyunbaz' demek. Lütfen"),
          de("verspielt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verspielt" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Grundschule"),
          tr("Türkçesi 'ilkokul' demek. Lütfen"),
          de("die Grundschule"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Grundschule" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("fotografieren"),
          tr("Türkçesi 'fotoğraf çekmek' demek. Lütfen"),
          de("fotografieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fotografieren" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Damals war ich …"),
          tr(
            "Olmak fiilinin geçmişi. Bu cümlede yardımcı fiil ve ortaç yok; tek kelimelik bir geçmiş, tıpkı Türkçedeki 'idim' gibi.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'O zamanlar çok utangaçtım.' Almancası:"),
          de("Damals war ich sehr schüchtern."),
          tr("Lütfen"),
          de("Damals war ich sehr schüchtern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Damals war ich sehr schüchtern" },
      },
      {
        say: [tr("Sıra sende: 'O zamanlar sarışındım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Damals war ich blond",
          hint: [
            de("damals"),
            tr("başta olduğu için özne fiilin arkasına düşer ve olmak fiili kısa geçmişini alır:"),
            de("Damals war ich blond."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir hatten …"),
          tr("Sahip olmak fiilinin geçmişi. O da tek kelimelik ve nesnesi belirtme hâline girer."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bizim bir köpeğimiz vardı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir hatten einen Hund",
          hint: [
            tr("Sahip olmak fiili nesnesini belirtme hâline sokar:"),
            de("Wir hatten einen Hund."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Damals bin ich schüchtern gewesen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Damals bin ich schüchtern gewesen.",
          answer: false,
          why: [
            tr(
              "Dilbilgisi olarak kurulabilir ama konuşmada kullanılmaz: olmak fiili geçmişte kısa biçimini alır. Doğrusu:",
            ),
            de("Damals war ich schüchtern."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi elinde eski bir fotoğraf var ve birine gösteriyorsun. Çocukluğunu anlat."),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşına telefonundan çocukluk fotoğrafını gösteriyorsun. O sana o zamanlar nasıl biri olduğunu soruyor; görünüşünü ve huyunu geçmiş zamanla anlat.",
      partner: "fotoğrafa bakıp soru soran bir arkadaş",
      opening: "Oh, bist du das? Wie alt warst du denn damals?",
      openingTr: "Aa, bu sen misin? O zamanlar kaç yaşındaydın?",
      goal: "Fotoğraftaki çocuğun görünüşü ve huyu anlatılmış, arkadaşın da kendi çocukluğundan bir şey söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-fruher",
    icon: "city",
    level: "A2",
    course: "de",
    title: "Früher war alles anders",
    titleTr: "Eskiden ve şimdi",
    summary: "Eskiyle bugünü karşılaştırmayı öğretir: vardı, yoktu, başkaydı.",
    minutes: 10,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "anders", tr: "başka türlü" },
      { de: "modern", tr: "modern" },
      { de: "altmodisch", tr: "eski moda" },
      { de: "das Gegenteil", tr: "tersi" },
      { de: "jahrelang", tr: "yıllarca" },
      { de: "der Fernseher", tr: "televizyon" },
      { de: "der Wagen", tr: "otomobil" },
      { de: "verschieden", tr: "farklı" },
    ],
    patterns: [
      { de: "Früher war alles anders.", tr: "eskiyle bugünü karşılaştırmaya başlar" },
      { de: "Wir hatten keinen …", tr: "eskiden neyin olmadığını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün eskiyle bugünü karşılaştırıyoruz. Bu, her sohbette işe yarayan bir konu ve iki fiilin kısa geçmişiyle kuruluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir önceki derste olmak ve sahip olmak fiillerinin kısa geçmişini gördün. Şimdi onları olumsuzla birlikte kullanacağız: 'yoktu' demek, sahip olmak fiilinin geçmişi artı olumsuzluk demek. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("anders"),
          tr("Türkçesi 'başka türlü' demek. Lütfen"),
          de("anders"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anders" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("modern"),
          tr("Türkçesi 'modern' demek. Lütfen"),
          de("modern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "modern" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("altmodisch"),
          tr("Türkçesi 'eski moda' demek. Lütfen"),
          de("altmodisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "altmodisch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Gegenteil"),
          tr("Türkçesi 'tersi, zıddı' demek. Lütfen"),
          de("das Gegenteil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gegenteil" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("jahrelang"),
          tr("Türkçesi 'yıllarca' demek. Lütfen"),
          de("jahrelang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jahrelang" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Fernseher"),
          tr("Türkçesi 'televizyon' demek; cihazın kendisi. Lütfen"),
          de("der Fernseher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fernseher" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Wagen"),
          tr("Türkçesi 'otomobil' demek. Lütfen"),
          de("der Wagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wagen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("verschieden"),
          tr("Türkçesi 'farklı, birbirinden ayrı' demek. Lütfen"),
          de("verschieden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verschieden" },
      },
      {
        say: [
          tr("İlk kalıbımız derse adını veriyor:"),
          de("Früher war alles anders."),
          tr("Bu cümle bir karşılaştırmayı başlatır; arkasından somut örnekler gelir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Eskiden her şey daha eski modaydı.' Almancası:"),
          de("Früher war alles altmodisch."),
          tr("Lütfen"),
          de("Früher war alles altmodisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Früher war alles altmodisch" },
      },
      {
        say: [tr("Sıra sende: 'Bugün her şey modern.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Heute ist alles modern",
          hint: [
            tr("Şimdiki hâl için olmak fiilinin bugünkü biçimi kullanılır:"),
            de("Heute ist alles modern."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir hatten keinen …"),
          tr(
            "'Yoktu' demenin yolu: sahip olmak fiilinin kısa geçmişi artı olumsuzluk. Olumsuzluk kelimesi ismin cinsine göre değişir.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bizim televizyonumuz yoktu.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir hatten keinen Fernseher",
          hint: [
            de("der Fernseher"),
            tr("eril ve nesne olduğu için olumsuzluk kelimesi de eril belirtme hâlini alır:"),
            de("Wir hatten keinen Fernseher."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Früher hatten wir kein Wagen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Früher hatten wir kein Wagen.",
          answer: false,
          why: [
            de("der Wagen"),
            tr("eril; nesne olunca olumsuzluk kelimesi de eril belirtme hâline girer. Doğrusu:"),
            de("Früher hatten wir keinen Wagen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi yaşça büyük biriyle konuşuyorsun ve eskiden hayatın nasıl olduğunu karşılaştırıyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Komşun yaşça senden çok büyük ve eski günlerden söz ediyor. Sen de kendi ülkendeki eski günleri anlatıyorsun. Neyin olduğunu, neyin olmadığını ve neyin başka olduğunu karşılaştır.",
      partner: "eski günleri özleyen yaşlı bir komşu",
      opening: "Wissen Sie, früher war hier alles ganz anders. War es bei Ihnen auch so?",
      openingTr: "Biliyor musunuz, eskiden burada her şey bambaşkaydı. Sizde de öyle miydi?",
      goal: "Eskiyle bugün en az üç noktada karşılaştırılmış ve iki taraf da neyin daha iyi olduğuna dair bir şey söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-erste-mal",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Mein erstes Mal",
    titleTr: "İlk deneyimler",
    summary: "İlk kez yaşanan bir şeyi ve o anki duyguyu anlatmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "nervös", tr: "gergin" },
      { de: "plötzlich", tr: "aniden" },
      { de: "die Erfahrung", tr: "deneyim" },
      { de: "erleichtert", tr: "içi rahatlamış" },
      { de: "der Führerschein", tr: "ehliyet" },
      { de: "aufregend", tr: "heyecan verici" },
      { de: "der Club", tr: "kulüp" },
      { de: "überrascht", tr: "şaşırmış" },
    ],
    patterns: [
      { de: "Ich war sehr nervös.", tr: "o anki duyguyu söyler" },
      { de: "Das war eine … Erfahrung.", tr: "yaşananı tek cümlede değerlendirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir şeyi ilk kez yaptığın anı anlatıyoruz: ilk konser, ilk sınav, ilk direksiyon. Olayla birlikte duyguyu da söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir anıyı anlatırken iki şey iç içe geçer: ne olduğu ve o sırada nasıl hissettiğin. Olay Perfekt ile, duygu ise olmak fiilinin kısa geçmişiyle kurulur. Bugün ikisini bir arada kullanacağız.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("nervös"),
          tr("Türkçesi 'gergin, heyecanlı' demek. Lütfen"),
          de("nervös"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nervös" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("plötzlich"),
          tr("Türkçesi 'aniden, birdenbire' demek. Lütfen"),
          de("plötzlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "plötzlich" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Erfahrung"),
          tr("Türkçesi 'deneyim' demek. Lütfen"),
          de("die Erfahrung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erfahrung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("erleichtert"),
          tr("Türkçesi 'içi rahatlamış' demek; bir yükün kalkması. Lütfen"),
          de("erleichtert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erleichtert" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Führerschein"),
          tr("Türkçesi 'ehliyet' demek. Lütfen"),
          de("der Führerschein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Führerschein" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("aufregend"),
          tr("Türkçesi 'heyecan verici' demek. Lütfen"),
          de("aufregend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufregend" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Club"),
          tr("Türkçesi 'kulüp' demek. Lütfen"),
          de("der Club"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Club" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("überrascht"),
          tr("Türkçesi 'şaşırmış' demek. Lütfen"),
          de("überrascht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "überrascht" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich war sehr nervös."),
          tr(
            "Duygu geçmişte olmak fiilinin kısa biçimiyle söylenir. Bu cümle bir anının içine her yere sığar.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'İlk konserimde çok gergindim.' Almancası:"),
          de("Bei meinem ersten Besuch im Club war ich sehr nervös."),
          tr("Lütfen"),
          de("Bei meinem ersten Besuch im Club war ich sehr nervös"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bei meinem ersten Besuch im Club war ich sehr nervös" },
      },
      {
        say: [tr("Sıra sende: 'Sonra içim rahatladı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Danach war ich erleichtert",
          hint: [
            tr("Duygu yine olmak fiilinin kısa geçmişiyle kurulur ve zaman kelimesi başta:"),
            de("Danach war ich erleichtert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yaşananı değerlendiriyor:"),
          de("Das war eine … Erfahrung."),
          tr("Sıfat isimden önce gelir ve dişil ismin önünde sonuna bir harf alır."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Ehliyetimi aldım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe den Führerschein gemacht",
          hint: [
            tr("Almancada ehliyet için 'yapmak' fiili kullanılır ve nesne belirtme hâline girer:"),
            de("Ich habe den Führerschein gemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das war eine schöne Erfahrung."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das war eine schöne Erfahrung.",
          answer: true,
          why: [
            de("die Erfahrung"),
            tr("dişil; belirsiz artikelden sonra sıfat sonuna bir harf alır ve cümle doğru kurulmuş."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi bir arkadaşına bir şeyi ilk kez yaptığın anı anlat: ne oldu, nasıl hissettin."),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla oturuyorsunuz ve o sana hayatında ilk kez yaptığın bir şeyi soruyor. Olayı sırayla anlat ve o sırada ne hissettiğini de söyle.",
      partner: "hikâye dinlemeyi seven bir arkadaş",
      opening: "Erzähl mal: Woran erinnerst du dich noch, wenn du an dein erstes Mal denkst?",
      openingTr: "Anlatsana: ilk kez yaptığın bir şeyi düşününce aklına ne geliyor?",
      goal: "Bir ilk deneyim olay ve duygu birlikte anlatılmış ve arkadaşın da kendi ilkinden söz etmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wochenbericht",
    icon: "calendar",
    level: "A2",
    course: "de",
    title: "Die letzte Woche",
    titleTr: "Haftayı özetleme",
    summary: "Geçen haftayı özetlemeyi öğretir: neyi yetiştirdin, ne oldu.",
    minutes: 10,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "voll", tr: "dolu" },
      { de: "schaffen", tr: "başarmak" },
      { de: "der Rest", tr: "kalan" },
      { de: "der Arbeitstag", tr: "iş günü" },
      { de: "stattfinden", tr: "gerçekleşmek" },
      { de: "wegbringen", tr: "götürmek" },
      { de: "durchgehen", tr: "gözden geçirmek" },
      { de: "wenigstens", tr: "en azından" },
    ],
    patterns: [
      { de: "Ich habe … geschafft.", tr: "neyi yetiştirdiğini söyler" },
      { de: "… hat stattgefunden.", tr: "bir etkinliğin olduğunu bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün geçen haftayı özetliyoruz. Bu, işte ve derste sürekli sorulan bir şey: ne yaptın, neyi yetiştirdin, ne oldu. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir haftayı özetlemek tek tek olayları saymak değildir; hangisinin bittiğini, hangisinin gerçekleştiğini söylemektir. Bugünkü fiillerin üçü ayrılabilen fiil ve ortaçları yine ortadan açılıyor.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("voll"),
          tr("Türkçesi 'dolu' demek; hem kap hem program için kullanılır. Lütfen"),
          de("voll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "voll" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("schaffen"),
          tr("Türkçesi 'başarmak, yetiştirmek' demek. Lütfen"),
          de("schaffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schaffen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Rest"),
          tr("Türkçesi 'kalan' demek. Lütfen"),
          de("der Rest"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rest" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Arbeitstag"),
          tr("Türkçesi 'iş günü' demek. Lütfen"),
          de("der Arbeitstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arbeitstag" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("stattfinden"),
          tr("Türkçesi 'gerçekleşmek' demek; toplantı, konser, ders için kullanılır. Lütfen"),
          de("stattfinden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stattfinden" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("wegbringen"),
          tr("Türkçesi 'götürmek, götürüp bırakmak' demek. Lütfen"),
          de("wegbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wegbringen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("durchgehen"),
          tr("Türkçesi 'gözden geçirmek' demek; bir listeyi baştan sona bakmak. Lütfen"),
          de("durchgehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "durchgehen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("wenigstens"),
          tr("Türkçesi 'en azından' demek. Lütfen"),
          de("wenigstens"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wenigstens" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe … geschafft."),
          tr("Bir işi yetiştirdiğini söyler. Fiil kurallı, ortacı düz kuruluyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'En azından bir şeyi yetiştirdim.' Almancası:"),
          de("Wenigstens eine Sache habe ich geschafft."),
          tr("Lütfen"),
          de("Wenigstens eine Sache habe ich geschafft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wenigstens eine Sache habe ich geschafft" },
      },
      {
        say: [tr("Sıra sende: 'Çöpü götürdüm.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe den Müll weggebracht",
          hint: [
            de("wegbringen"),
            tr("ayrılabilen bir fiil; ortacın hecesi ön ekle kökün arasına girer:"),
            de("Ich habe den Müll weggebracht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("… hat stattgefunden."),
          tr(
            "Bir etkinliğin olduğunu bildirir. Bu fiilin öznesi genelde etkinliğin kendisidir, kişi değil.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Konser cumartesi gerçekleşti.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Das Konzert hat am Samstag stattgefunden",
          hint: [
            tr("Etkinlik özne oluyor ve ortaç sona gidiyor:"),
            de("Das Konzert hat am Samstag stattgefunden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Woche war sehr voll und ich habe fast alles geschafft."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Woche war sehr voll und ich habe fast alles geschafft.",
          answer: true,
          why: [
            tr(
              "İki cümle de doğru: birincisinde olmak fiilinin kısa geçmişi, ikincisinde kurallı bir ortaç var.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi haftanı özetliyorsun: neyi yetiştirdin, ne oldu, neyi yetiştiremedin.")],
      },
    ],
    roleplay: {
      scene:
        "Pazartesi sabahı bir iş arkadaşınla kahve içiyorsunuz ve geçen haftayı özetliyorsunuz. Neyi yetiştirdiğini, hangi etkinliğin gerçekleştiğini ve neyi yapamadığını anlat.",
      partner: "haftayı senin kadar yoğun geçirmiş bir iş arkadaşı",
      opening: "Guten Morgen! Wie war deine letzte Woche?",
      openingTr: "Günaydın! Geçen haftan nasıldı?",
      goal: "Haftanın en az üç işi özetlenmiş, biri yetişmemiş olarak belirtilmiş ve iş arkadaşın da kendi haftasını anlatmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-tolle-nachricht",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Rate mal, was passiert ist!",
    titleTr: "Haber verme",
    summary: "İyi bir haberi vermeyi ve karşıdakini şaşırtmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "bestehen", tr: "geçmek" },
      { de: "erraten", tr: "doğru tahmin etmek" },
      { de: "die Zusage", tr: "olumlu cevap" },
      { de: "jubeln", tr: "sevinç çığlığı atmak" },
      { de: "das Stipendium", tr: "burs" },
      { de: "außergewöhnlich", tr: "olağanüstü" },
      { de: "staunen", tr: "hayret etmek" },
      { de: "die Verlobung", tr: "nişan" },
    ],
    patterns: [
      { de: "Rate mal, was passiert ist!", tr: "haberi merak uyandırarak açar" },
      { de: "Ich habe … bestanden.", tr: "sınav sonucunu bildirir" },
      { de: "Wir haben … bekommen.", tr: "alınan bir haberi bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iyi bir haber veriyoruz. Almancada haber doğrudan söylenmez; önce merak uyandırılır, sonra söylenir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü iki fiil kuralsız ve ikisi de ortacın hecesini almıyor, çünkü vurgusuz bir ön ekle başlıyorlar. Şimdiki zaman ile ortaç neredeyse aynı görünüyor; farkı yardımcı fiil yaratıyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("bestehen"),
          tr("Türkçesi 'sınavı geçmek' demek. Lütfen"),
          de("bestehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bestehen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("erraten"),
          tr("Türkçesi 'doğru tahmin etmek' demek. Lütfen"),
          de("erraten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "erraten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Zusage"),
          tr("Türkçesi 'olumlu cevap' demek; bir başvuruya gelen kabul. Lütfen"),
          de("die Zusage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zusage" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("jubeln"),
          tr("Türkçesi 'sevinç çığlığı atmak' demek. Lütfen"),
          de("jubeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jubeln" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Stipendium"),
          tr("Türkçesi 'burs' demek. Lütfen"),
          de("das Stipendium"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Stipendium" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("außergewöhnlich"),
          tr("Türkçesi 'olağanüstü' demek. Lütfen"),
          de("außergewöhnlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "außergewöhnlich" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("staunen"),
          tr("Türkçesi 'hayret etmek' demek. Lütfen"),
          de("staunen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "staunen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Verlobung"),
          tr("Türkçesi 'nişan' demek. Lütfen"),
          de("die Verlobung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Verlobung" },
      },
      {
        say: [
          tr("İlk kalıbımız haberi açıyor:"),
          de("Rate mal, was passiert ist!"),
          tr(
            "Bir emir cümlesi ile bir yan cümle bir arada. Yan cümlede fiil en sona gidiyor; bunu ilerideki modüllerde ayrıntılı göreceğiz.",
          ),
        ],
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe … bestanden."),
          tr("Sınav sonucunu bildirir. Fiil kuralsız ve ortacın hecesini almıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sınavı geçtim!' Almancası:"),
          de("Ich habe die Prüfung bestanden."),
          tr("Lütfen"),
          de("Ich habe die Prüfung bestanden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe die Prüfung bestanden" },
      },
      {
        say: [tr("Sıra sende: 'Bursu aldım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe das Stipendium bekommen",
          hint: [
            tr("Almak fiili kuralsız ve o da ortacın hecesini almaz:"),
            de("Ich habe das Stipendium bekommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız:"),
          de("Wir haben … bekommen."),
          tr("Gelen bir haberi bildirir; başvuru, davet ya da cevap için kullanılır."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Olumlu cevabı aldık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben die Zusage bekommen",
          hint: [
            de("die Zusage"),
            tr("dişil olduğu için artikeli nesne olunca değişmez:"),
            de("Wir haben die Zusage bekommen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe die Prüfung gebestanden."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe die Prüfung gebestanden.",
          answer: false,
          why: [
            tr("Vurgusuz ön ekle başlayan fiiller ortacın hecesini hiç almaz. Doğrusu:"),
            de("Ich habe die Prüfung bestanden."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşını arıyorsun ve ona iyi haberi veriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşını arıyorsun ve ona iyi bir haberin var. Önce merak uyandır, tahmin ettir, sonra haberi söyle ve nasıl olduğunu anlat.",
      partner: "telefonu hemen açan yakın bir arkadaş",
      opening: "Hey! Du klingst ja aufgeregt. Was ist denn los?",
      openingTr: "Hey! Sesin heyecanlı geliyor. Ne oldu?",
      goal: "Haber önce tahmin ettirilip sonra açıkça söylenmiş ve arkadaşın da tepkisini vermiş olur.",
      minTurns: 8,
    },
  },
];

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
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "der Urlaub", tr: "tatil" },
      { de: "das Meer", tr: "deniz" },
      { de: "der Strand", tr: "plaj" },
      { de: "fahren", tr: "gitmek (araçla)" },
      { de: "sehen", tr: "görmek" },
    ],
    patterns: [
      { de: "Ich bin … gefahren.", tr: "geçmişte bir yere gittiğini söylerken kullanılır" },
      { de: "Ich habe … gesehen.", tr: "geçmişte yaptığın diğer şeyleri anlatırken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün geçmişten bahsediyoruz: son tatilin! Almancada geçmiş, Perfekt ile anlatılır. 'Gittim' ve 'gördüm' demeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Perfekt iki parçadan oluşur: yardımcı fiil ikinci sırada, asıl fiil 'ge-' hâliyle cümlenin sonunda. Hangi yardımcı fiil? Birazdan göreceğiz. Önce kelimeler.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Urlaub"),
          tr("Türkçesi 'tatil' demek. Lütfen"),
          de("der Urlaub"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Urlaub" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Meer"),
          tr("Türkçesi 'deniz' demek. Lütfen"),
          de("das Meer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Meer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Strand"),
          tr("Türkçesi 'plaj' demek. Lütfen"),
          de("der Strand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Strand" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("fahren"),
          tr("Türkçesi 'araçla gitmek' demek. Lütfen"),
          de("fahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fahren" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sehen"),
          tr("Türkçesi 'görmek' demek. Lütfen"),
          de("sehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sehen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich bin … gefahren."),
          tr(
            "Hareket bildiren fiiller 'sein' ile kurulur: gitmek, gelmek, uçmak. 'Ben bir yere gittim' demek.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Tatilde Antalya'ya gittim.' Almancası:"),
          de("Ich bin nach Antalya gefahren."),
          tr("Lütfen"),
          de("Ich bin nach Antalya gefahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin nach Antalya gefahren" },
      },
      {
        say: [tr("Şimdi sıra sende: 'Ben İzmir'e gittim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin nach Izmir gefahren",
          hint: [
            tr("Şehir adlarının önüne"),
            de("nach"),
            tr("gelir ve ortaç en sonda durur:"),
            de("Ich bin nach Izmir gefahren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe … gesehen."),
          tr("Hareket bildirmeyen fiillerin çoğu 'haben' ile kurulur. 'Ben … gördüm' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Denizi gördüm.' Almancası:"),
          de("Ich habe das Meer gesehen."),
          tr("Lütfen"),
          de("Ich habe das Meer gesehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe das Meer gesehen" },
      },
      {
        say: [
          tr("Peki 'Plajı gördüm.' nasıl dersin? Dikkat:"),
          de("der Strand"),
          tr("eril ve cümlenin nesnesi."),
        ],
        expect: {
          kind: "produce",
          target: "Ich habe den Strand gesehen",
          hint: [
            de("der Strand"),
            tr("eril ve nesne olduğu için artikel değişir:"),
            de("den Strand"),
            tr("olur:"),
            de("Ich habe den Strand gesehen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe nach Berlin gefahren."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe nach Berlin gefahren.",
          answer: false,
          why: [
            de("fahren"),
            tr("hareket fiili; 'haben' değil 'sein' alır. Doğrusu:"),
            de("Ich bin nach Berlin gefahren."),
          ],
        },
      },
      {
        say: [
          tr(
            "Harika! Şimdi bir arkadaşın sana tatilini soruyor. Nereye gittiğini ve ne gördüğünü Perfekt ile anlat.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla kahve içiyorsun ve sana son tatilini soruyor. Nereye gittiğini 'Ich bin … gefahren', ne gördüğünü ve yaptığını 'Ich habe …' ile anlat.",
      partner: "tatil hikâyelerini seven bir arkadaş",
      opening: "Hallo! Du warst doch im Urlaub. Wohin bist du gefahren?",
      openingTr: "Selam! Sen tatildeydin ya. Nereye gittin?",
      goal: "Tatilin nereye, nasıl ve neler yaparak geçtiği anlatılmış; arkadaşın da kendi tatilinden bir şey söylemiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-perfekt-unregel",
    icon: "food",
    level: "A2",
    course: "de",
    title: "Gegessen, getrunken, gelesen",
    titleTr: "Kural dışı ortaçlar",
    summary:
      "Sık kullanılan fiillerin kuralsız ortaçlarını ve neden ezberlenmeleri gerektiğini öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "lesen", tr: "okumak" },
      { de: "die Zeitung", tr: "gazete" },
      { de: "der Wein", tr: "şarap" },
      { de: "das Glas", tr: "bardak" },
      { de: "gemütlich", tr: "keyifli" },
    ],
    patterns: [
      { de: "Ich habe … gegessen.", tr: "ne yediğini anlatır" },
      { de: "Ich habe … getrunken.", tr: "ne içtiğini anlatır" },
      { de: "Ich habe … gelesen.", tr: "ne okuduğunu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Perfekt'in kuralını biliyorsun ama fiillerin bir kısmı o kurala uymuyor. Bugün en sık kullanılanlarını alacağız; onlar olmadan geçmişten söz edemezsin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede geçmiş eki hep aynıdır: geldim, gittim, yedim. Almancada fiillerin bir grubu ortaç kurarken hem sonunu hem ortasındaki sesli harfi değiştirir. Kuralı yok, ezberlenir; ama iyi haber şu: bu gruptakiler en sık kullanılan fiiller olduğu için onları zaten her gün duyacak ve kendiliğinden öğreneceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("lesen"),
          tr("Türkçesi 'okumak' demek. Lütfen"),
          de("lesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lesen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Zeitung"),
          tr("Türkçesi 'gazete' demek. Lütfen"),
          de("die Zeitung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zeitung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Wein"),
          tr("Türkçesi 'şarap' demek. Lütfen"),
          de("der Wein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wein" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
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
          de("gemütlich"),
          tr("Türkçesi 'keyifli, rahat' demek; Almanların çok sevdiği bir kelimedir. Lütfen"),
          de("gemütlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gemütlich" },
      },
      {
        say: [
          tr("Şimdi farkı duy. Kurallı bir fiilde ortaç sonu düz kalır:"),
          de("gekauft"),
          tr("Kuralsız fiillerde ise sonu değişir ve çoğunlukla ortadaki sesli harf de kayar:"),
          de("gegessen, getrunken, gelesen, gesprochen, geschrieben"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe Fleisch gegessen."),
          tr("Yani 'Et yedim.' Yardımcı fiil ikinci sırada, ortaç en sonda; bu kısım hiç değişmiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe Fleisch gegessen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe Fleisch gegessen" },
      },
      {
        say: [
          tr("İkinci kalıbımız içecekler için:"),
          de("Ich habe Wasser getrunken."),
          tr("Ortaç yine sonda ve yine kuralsız."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe Wasser getrunken"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe Wasser getrunken" },
      },
      {
        say: [tr("Sıra sende: 'Bir şarap içtim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe einen Wein getrunken",
          hint: [
            tr("Şarap eril ve cümlenin nesnesi, ortaç ise sonda:"),
            de("Ich habe einen Wein getrunken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız:"),
          de("Ich habe ein Buch gelesen."),
          tr("Bu fiilin ortacında sonu değişiyor ama sesli harf yerinde kalıyor; her fiil aynı biçimde davranmıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe ein Buch gelesen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe ein Buch gelesen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Gazeteyi okudum.'")],
        expect: {
          kind: "produce",
          target: "Ich habe die Zeitung gelesen",
          hint: [
            tr("Gazete dişil olduğu için nesne hâlinde değişmez, ortaç yine sonda:"),
            de("Ich habe die Zeitung gelesen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir akşamı tek cümlede toparlamak istersen:"),
          de("Wir haben gemütlich gegessen und Wein getrunken."),
          tr("İki ortaç yan yana geldiğinde yardımcı fiili tekrar etmene gerek yok."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe das Buch gelest."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe das Buch gelest.",
          answer: false,
          why: [
            tr("Yanlış. Bu fiil kuralsız; ortacı düz ekle kurulmaz. Doğrusu:"),
            de("Ich habe das Buch gelesen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu ortaçlar günlük konuşmanın belkemiği. Şimdi öğle molasındasın ve iş arkadaşın dün akşam ne yediğini soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Öğle molasında bir iş arkadaşınla dün akşam ne yiyip içtiğinizi konuşuyorsunuz. Yediklerini, içtiklerini ve akşamın nasıl geçtiğini Perfekt ile anlat.",
      partner: "yemek konusunda meraklı, ayrıntı soran bir iş arkadaşı",
      opening: "Ich habe gestern richtig lecker gegessen. Und du, was hast du gegessen?",
      openingTr: "Dün gerçekten çok lezzetli bir şey yedim. Peki sen ne yedin?",
      goal: "Dün akşam ne yiyip içtiğin ve akşamın nasıl geçtiği anlatılmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-perfekt-trennbar",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Ich habe eingekauft",
    titleTr: "Ayrılabilenlerin Perfekt'i",
    summary:
      "Ayrılabilen fiillerin geçmiş ortacında ekin kelimenin ortasına girdiğini öğretir.",
    minutes: 9,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "mitnehmen", tr: "yanına almak" },
      { de: "vorbeikommen", tr: "uğramak" },
      { de: "zurückbringen", tr: "geri götürmek" },
      { de: "vorbereiten", tr: "hazırlamak" },
      { de: "fertig", tr: "hazır" },
    ],
    patterns: [
      { de: "Ich habe … eingekauft.", tr: "alışveriş yaptığını anlatır" },
      { de: "Ich habe … abgeholt.", tr: "birini gidip aldığını anlatır" },
      { de: "Ich bin … aufgestanden.", tr: "kaçta kalktığını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün ayrılabilen fiilleri geçmişe taşıyacağız. Kural tuhaf ama bir kez gördüğünde bir daha unutmazsın. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede ek her zaman kelimenin sonuna eklenir. Almancada bu fiillerde geçmiş eki kelimenin tam ORTASINA giriyor: önce önek, sonra ek, sonra gövde. Üstelik hepsi tek kelime yazılıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("mitnehmen"),
          tr("Türkçesi 'yanına almak' demek. Lütfen"),
          de("mitnehmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitnehmen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vorbeikommen"),
          tr("Türkçesi 'uğramak' demek. Lütfen"),
          de("vorbeikommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorbeikommen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("zurückbringen"),
          tr("Türkçesi 'geri götürmek' demek. Lütfen"),
          de("zurückbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zurückbringen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("vorbereiten"),
          tr("Türkçesi 'hazırlamak' demek. Lütfen"),
          de("vorbereiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vorbereiten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("fertig"),
          tr("Türkçesi 'hazır, bitmiş' demek. Lütfen"),
          de("fertig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fertig" },
      },
      {
        say: [
          tr("Kuralı gözünde canlandır. Fiil"),
          de("einkaufen"),
          tr("Ortaç kurarken ek öneğin arkasına giriyor:"),
          de("eingekauft"),
          tr("Aynısı diğerlerinde de olur:"),
          de("angerufen, aufgestanden, abgeholt"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe im Supermarkt eingekauft."),
          tr("Yani 'Markette alışveriş yaptım.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe im Supermarkt eingekauft"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe im Supermarkt eingekauft" },
      },
      {
        say: [
          tr("İkinci kalıbımız birini karşılamak için:"),
          de("Ich habe meinen Bruder abgeholt."),
          tr("Yani 'Kardeşimi almaya gittim.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe meinen Bruder abgeholt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe meinen Bruder abgeholt" },
      },
      {
        say: [tr("Sıra sende: 'Kızımı gidip aldım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe meine Tochter abgeholt",
          hint: [
            tr("Kız evlat dişil olduğu için iyelik"),
            de("meine"),
            tr("olur; ek yine öneğin arkasına girer:"),
            de("Ich habe meine Tochter abgeholt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımızda yardımcı fiil değişiyor:"),
          de("Ich bin um sieben aufgestanden."),
          tr("Kalkmak bir hareket olduğu için 'sein' alıyor; ortaçtaki kural ise aynı kalıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich bin um sieben aufgestanden"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich bin um sieben aufgestanden" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Altıda kalktım.'")],
        expect: {
          kind: "produce",
          target: "Ich bin um sechs aufgestanden",
          hint: [
            tr("Saatin edatını hatırlıyorsun ve yardımcı fiil hareket olduğu için değişiyor:"),
            de("Ich bin um sechs aufgestanden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Aynı kural bütün ayrılabilenlerde işliyor. İlki:"),
          de("Ich habe meinen Sohn mitgenommen."),
          tr("İkincisi:"),
          de("Ich bin bei dir vorbeigekommen."),
          tr("Ve üçüncüsü:"),
          de("Ich habe das Buch zurückgebracht."),
          tr("Ek her seferinde aynı yere girdi: öneğin hemen arkasına."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe meinen Sohn mitgenommen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe meinen Sohn mitgenommen" },
      },
      {
        say: [
          tr("Bir günü toparlamak da kolay:"),
          de("Ich habe alles vorbereitet und bin fertig."),
          tr("Burada ek hiç yok. Sebebi şu: öneği attığında geriye kalan gövde de zaten vurgusuz bir önekle başlıyor, o grubun ise ek almadığını yakında göreceksin."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe meine Schwester angerufen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe meine Schwester angerufen.",
          answer: true,
          why: [
            tr("Doğru. Ek öneğin arkasına, gövdenin önüne girmiş ve hepsi tek kelime yazılmış; kural tam uygulanmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gününü ayrıntısıyla anlatabilirsin. Şimdi ev arkadaşınla kimin ne yaptığını konuşuyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ev arkadaşınla akşam eve döndünüz ve gün içinde kimin neyi hallettiğini konuşuyorsunuz. Yaptıklarını ayrılabilen fiillerle anlat.",
      partner: "işleri paylaşmayı önemseyen, biraz titiz bir ev arkadaşı",
      opening: "Ich habe schon angerufen und aufgeräumt. Was hast du gemacht?",
      openingTr: "Ben telefon ettim, ortalığı da topladım bile. Sen ne yaptın?",
      goal: "Gün içinde kimin neyi hallettiği karşılıklı anlatılmış ve kalan iş paylaşılmış olur.",
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
    summary:
      "Bir akşamı sırayla anlatmayı ve zaman kelimesi başa geçince fiilin nereye gittiğini öğretir.",
    minutes: 8,
    focusId: "Perfekt",
    vocab: [
      { de: "zuerst", tr: "önce" },
      { de: "danach", tr: "ondan sonra" },
      { de: "einschlafen", tr: "uykuya dalmak" },
      { de: "spannend", tr: "heyecan verici" },
      { de: "langweilig", tr: "sıkıcı" },
    ],
    patterns: [
      { de: "Zuerst habe ich …", tr: "önce ne yaptığını anlatır" },
      { de: "Danach bin ich …", tr: "sonra ne olduğunu anlatır" },
      { de: "Ich habe ferngesehen.", tr: "televizyon izlediğini anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün tek tek cümleler değil, bir akşamın tamamını anlatacağız. Sıralama kelimeleri olmadan hikâye dağılır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir kural hatırlatması: sıralama kelimesini cümlenin başına koyduğunda fiil hemen onun arkasına geçer, özne fiilin arkasına düşer. Bu yer değiştirme Türkçede yok, o yüzden en çok burada hata yapılır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("zuerst"),
          tr("Türkçesi 'önce, ilk olarak' demek. Lütfen"),
          de("zuerst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuerst" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("danach"),
          tr("Türkçesi 'ondan sonra' demek. Lütfen"),
          de("danach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "danach" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("einschlafen"),
          tr("Türkçesi 'uykuya dalmak' demek; uyumaktan farklı, dalma anını anlatır. Lütfen"),
          de("einschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einschlafen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("spannend"),
          tr("Türkçesi 'heyecan verici' demek. Lütfen"),
          de("spannend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spannend" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("langweilig"),
          tr("Türkçesi 'sıkıcı' demek. Lütfen"),
          de("langweilig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "langweilig" },
      },
      {
        say: [
          tr("İlk kalıbımızda yer değiştirmeyi gör:"),
          de("Zuerst habe ich gekocht."),
          tr("Sıralama kelimesi başta, yardımcı fiil hemen arkasında, özne üçüncü sırada. Ortaç yine en sonda duruyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Zuerst habe ich gekocht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Zuerst habe ich gekocht" },
      },
      {
        say: [tr("Sıra sende: 'Önce bir film izledim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Zuerst habe ich einen Film gesehen",
          hint: [
            tr("Sıralama kelimesinden hemen sonra yardımcı fiil gelir, ortaç ise sonda kalır:"),
            de("Zuerst habe ich einen Film gesehen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımızda yardımcı fiil değişiyor:"),
          de("Danach bin ich ins Bett gegangen."),
          tr("Gitmek hareket bildirdiği için 'sein' alıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Danach bin ich ins Bett gegangen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Danach bin ich ins Bett gegangen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Sonra uyuyakaldım.'")],
        expect: {
          kind: "produce",
          target: "Danach bin ich eingeschlafen",
          hint: [
            tr("Uykuya dalmak da bir geçiş, o yüzden hareket fiili sayılır; ek yine öneğin arkasına girer:"),
            de("Danach bin ich eingeschlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız akşamların klasiği:"),
          de("Ich habe ferngesehen."),
          tr("Yani 'Televizyon izledim.' Bu da ayrılabilen bir fiil, ek yine ortaya girmiş."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe ferngesehen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe ferngesehen" },
      },
      {
        say: [
          tr("İzlediğin şeyi değerlendirmek istersen iki kelime yeter:"),
          de("Der Film war langweilig, aber die Serie war spannend."),
          tr("Değerlendirme yaparken tek parça geçmiş kullanılıyor; Perfekt kurmaya çalışma."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Gestern Abend ich habe ferngesehen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Gestern Abend ich habe ferngesehen.",
          answer: false,
          why: [
            tr("Yanlış. Zaman ifadesi başa geçince fiil hemen onun arkasına gelmeli, özne ise fiilden sonra. Doğrusu:"),
            de("Gestern Abend habe ich ferngesehen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir akşamı baştan sona anlatabilirsin. Şimdi bir arkadaşın dün akşam ne yaptığını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın dün akşamını merak ediyor. Ne yaptığını sırayla anlat: önce ne, sonra ne, en sonunda ne oldu.",
      partner: "kendi akşamını da anlatmak isteyen bir arkadaş",
      opening: "Gestern Abend war ich zu Hause. Was hast du gemacht?",
      openingTr: "Dün akşam evdeydim. Sen ne yaptın?",
      goal: "Dün akşam önce, sonra ve en sonunda ne olduğu sırayla anlatılmış olur.",
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
    summary:
      "Aksilikleri anlatmayı ve bazı fiillerin ortaçta neden 'ge-' almadığını öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "verschlafen", tr: "uyuyakalmak" },
      { de: "vergessen", tr: "unutmak" },
      { de: "verlieren", tr: "kaybetmek" },
      { de: "der Schlüssel", tr: "anahtar" },
      { de: "das Chaos", tr: "karmaşa" },
    ],
    patterns: [
      { de: "Ich habe verschlafen.", tr: "uyuyakaldığını söyler" },
      { de: "Ich habe … vergessen.", tr: "bir şeyi unuttuğunu söyler" },
      { de: "Der Bus ist weggefahren.", tr: "otobüsün kaçtığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün hepimizin yaşadığı o pazartesi sabahını anlatacağız: uyuyakalmak, otobüsü kaçırmak, anahtarı unutmak. Bir de yeni bir ortaç kuralı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural şu: bir fiil vurgusuz bir önekle başlıyorsa ortaçta 'ge-' almaz. Yani öneki olan her fiil ekin ortaya girmesini gerektirmiyor; bir grubu eki hiç almıyor. Bunu bir kez duyduğunda çok sayıda fiili birden çözersin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("verschlafen"),
          tr("Türkçesi 'uyuyakalmak' demek, yani fazla uyuyup geç kalmak. Lütfen"),
          de("verschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verschlafen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vergessen"),
          tr("Türkçesi 'unutmak' demek. Lütfen"),
          de("vergessen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vergessen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verlieren"),
          tr("Türkçesi 'kaybetmek' demek. Lütfen"),
          de("verlieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verlieren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Schlüssel"),
          tr("Türkçesi 'anahtar' demek. Lütfen"),
          de("der Schlüssel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schlüssel" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Chaos"),
          tr("Türkçesi 'karmaşa' demek. Lütfen"),
          de("das Chaos"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Chaos" },
      },
      {
        say: [
          tr("Kuralı yan yana koyduğunda fark açık:"),
          de("kaufen"),
          tr("ortaçta"),
          de("gekauft"),
          tr("olur ama"),
          de("vergessen"),
          tr("ortaçta yine"),
          de("vergessen"),
          tr("kalır. Önek vurgusuz olduğu için ek girecek yer bulamıyor."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız, o sabahın ilk cümlesi:"),
          de("Ich habe verschlafen."),
          tr("Yani 'Uyuyakaldım.' Ortaç mastarla birebir aynı görünüyor ve bu doğru."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe verschlafen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe verschlafen" },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich habe mein Handy vergessen."),
          tr("Yani 'Telefonumu unuttum.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe mein Handy vergessen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe mein Handy vergessen" },
      },
      {
        say: [tr("Sıra sende: 'Anahtarımı unuttum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe meinen Schlüssel vergessen",
          hint: [
            tr("Anahtar eril ve nesne olduğu için iyelik ek alır, ortaç ise hiç değişmez:"),
            de("Ich habe meinen Schlüssel vergessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımızda otobüs kaçıyor:"),
          de("Der Bus ist weggefahren."),
          tr("Burada önek vurguluymuş, o yüzden ek ortaya girmiş; hareket olduğu için de yardımcı fiil değişmiş."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Bus ist weggefahren"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Bus ist weggefahren" },
      },
      {
        say: [tr("Bir tane daha: 'Çantamı kaybettim.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe meine Tasche verloren",
          hint: [
            tr("Bu fiil hem kuralsız hem de önekli: ortaçta ek yok ama ortadaki sesli harf değişiyor:"),
            de("Ich habe meine Tasche verloren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonunda hepsini tek cümlede toplayabilirsin:"),
          de("Es war ein totales Chaos."),
          tr("Yani 'Tam bir karmaşaydı.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe den Termin vergessen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe den Termin vergessen.",
          answer: true,
          why: [
            tr("Doğru. Bu önekle başlayan fiiller ortaçta ek almaz, o yüzden ortaç mastarla aynı görünür; cümle kusursuz."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık aksiliklerini anlatabilirsin. Şimdi işe bir saat geç kaldın ve patronun kapıda seni bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İşe bir saat geç kaldın ve patronun nedenini soruyor. Sabah başına gelen aksilikleri sırayla ve geçmiş zamanla anlat.",
      partner: "kaşlarını kaldırmış ama dinlemeye açık bir patron",
      opening: "Sie kommen eine Stunde zu spät. Warum denn?",
      openingTr: "Bir saat geç kaldınız. Nedenmiş bakalım?",
      goal: "Geç kalmanın sebebi sırayla anlatılmış ve patronun durumu kabul etmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-kindheit-foto",
    icon: "camera",
    level: "A2",
    course: "de",
    title: "Ein altes Foto",
    titleTr: "Eski bir fotoğraf",
    summary:
      "Çocukluğu anlatmayı ve iki fiilin geçmişte Perfekt yerine kendi kısa biçimini kullandığını öğretir.",
    minutes: 9,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Kindheit", tr: "çocukluk" },
      { de: "damals", tr: "o zamanlar" },
      { de: "der Junge", tr: "oğlan" },
      { de: "das Mädchen", tr: "kız çocuk" },
      { de: "glücklich", tr: "mutlu" },
    ],
    patterns: [
      { de: "Ich war …", tr: "geçmişte nasıl ya da nerede olduğunu söyler" },
      { de: "Wir hatten …", tr: "geçmişte neyin olduğunu söyler" },
      { de: "Damals …", tr: "'o zamanlar' diyerek geçmişe açar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün eski bir fotoğrafın başına oturuyoruz. Bunun için Perfekt'i bir kenara bırakacağız, çünkü iki fiil geçmişte bambaşka davranıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İki fiil var ki Almanlar onları geçmişte neredeyse hiç Perfekt ile kullanmaz: olmak ve sahip olmak. Bunların kendi kısa geçmiş biçimleri var ve konuşmada hep o biçim duyulur. Yani bugün öğreneceğin şey kuraldan bir kaçış değil, en sık duyacağın geçmiş. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Kindheit"),
          tr("Türkçesi 'çocukluk' demek. Lütfen"),
          de("die Kindheit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kindheit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("damals"),
          tr("Türkçesi 'o zamanlar' demek. Lütfen"),
          de("damals"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "damals" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Junge"),
          tr("Türkçesi 'oğlan' demek. Lütfen"),
          de("der Junge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Junge" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Mädchen"),
          tr("Türkçesi 'kız çocuk' demek. Küçük bir şaşırtmaca: kelime kız anlamına gelse de nötr artikel alır. Lütfen"),
          de("das Mädchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mädchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("glücklich"),
          tr("Türkçesi 'mutlu' demek. Lütfen"),
          de("glücklich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "glücklich" },
      },
      {
        say: [
          tr("İlk kalıbımız 'olmak' fiilinin geçmişi:"),
          de("Ich war ein Kind."),
          tr("Tek kelime, tek parça. Perfekt gibi iki parçaya bölünmüyor, ortaç da yok."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich war ein Kind"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich war ein Kind" },
      },
      {
        say: [tr("Sıra sende: 'Çok mutluydum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich war sehr glücklich",
          hint: [
            tr("Tek parça yeter, ortaç aramaya kalkma:"),
            de("Ich war sehr glücklich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız 'sahip olmak' fiilinin geçmişi:"),
          de("Wir hatten einen Garten."),
          tr("Yani 'Bahçemiz vardı.' Yine tek parça."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wir hatten einen Garten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wir hatten einen Garten" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bir köpeğimiz vardı.'")],
        expect: {
          kind: "produce",
          target: "Wir hatten einen Hund",
          hint: [
            tr("Köpek eril ve nesne olduğu için o ek gelir, fiil ise tek parça kalır:"),
            de("Wir hatten einen Hund."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız hikâyeyi açan kelime:"),
          de("Damals war ich zehn Jahre alt."),
          tr("Başa geldiği için fiil hemen arkasına geçti; bu yer değiştirmeyi artık tanıyorsun."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Damals war ich zehn Jahre alt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Damals war ich zehn Jahre alt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Damals war ich ein glückliches Kind."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Damals war ich ein glückliches Kind.",
          answer: true,
          why: [
            tr("Doğru. Zaman kelimesi başta, fiil hemen arkasında, özne üçüncü sırada; geçmiş de tek parça kurulmuş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık çocukluğundan söz edebilirsin. Şimdi annenle eski bir albüme bakıyorsun ve bir fotoğrafta duruyorsunuz.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Annenle eski bir fotoğraf albümüne bakıyorsunuz. Fotoğraftaki çocukluğunu anlat: kaç yaşındaydın, neyin vardı, nasıl bir çocuktun.",
      partner: "her fotoğrafta bir anı hatırlayan duygusal bir anne",
      opening: "Schau mal, dieses Foto! Wie alt warst du da?",
      openingTr: "Şuna baksana, bu fotoğraf! Burada kaç yaşındaydın?",
      goal: "Fotoğraftaki çocukluğun anlatılmış ve annenle ortak bir anıda buluşulmuş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-fruher",
    icon: "city",
    level: "A2",
    course: "de",
    title: "Früher war alles anders",
    titleTr: "Eskiden ve şimdi",
    summary:
      "Eskiyle bugünü karşılaştırmayı ve 'vardı' demenin geçmiş biçimini öğretir.",
    minutes: 9,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "früher", tr: "eskiden" },
      { de: "anders", tr: "farklı" },
      { de: "es gab", tr: "vardı" },
      { de: "modern", tr: "modern" },
      { de: "das Dorf", tr: "köy" },
    ],
    patterns: [
      { de: "Früher war …", tr: "eskiden nasıl olduğunu anlatır" },
      { de: "Heute ist …", tr: "bugün nasıl olduğunu anlatır" },
      { de: "Es gab …", tr: "eskiden neyin var olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bugün eskiyle bugünü karşılaştıracağız. Bu, Almanya'da her sohbette karşına çıkacak bir konu; özellikle yaşlı komşularınla. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen sefer iki fiilin tek parça geçmişini öğrenmiştin. Bugün ona bir tane daha ekleyeceğiz: 'var' demenin geçmişi. Bu kalıplaşmış bir biçimdir, çekim aramana gerek yok. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("früher"),
          tr("Türkçesi 'eskiden' demek. Lütfen"),
          de("früher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "früher" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("anders"),
          tr("Türkçesi 'farklı' demek. Lütfen"),
          de("anders"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anders" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz iki parçadan oluşuyor:"),
          de("es gab"),
          tr("Türkçesi 'vardı' demek. Lütfen"),
          de("es gab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "es gab" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("modern"),
          tr("Türkçesi 'modern' demek. Lütfen"),
          de("modern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "modern" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Dorf"),
          tr("Türkçesi 'köy' demek. Lütfen"),
          de("das Dorf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Dorf" },
      },
      {
        say: [
          tr("İlk kalıbımız geçmişe bakar:"),
          de("Früher war alles ruhiger."),
          tr("Zaman kelimesi başta olduğu için fiil hemen arkasına geçti."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Früher war alles ruhiger"), tr("deyin.")],
        expect: { kind: "repeat", target: "Früher war alles ruhiger" },
      },
      {
        say: [tr("Sıra sende: 'Eskiden her şey farklıydı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Früher war alles anders",
          hint: [
            tr("Zaman kelimesi başta, fiil hemen arkasında, özne üçüncü sırada:"),
            de("Früher war alles anders."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bugünü söyler ve karşıtlığı kurar:"),
          de("Heute ist alles modern."),
          tr("İki cümleyi arka arkaya söylediğinde karşılaştırma kendiliğinden çıkar."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Heute ist alles modern"), tr("deyin.")],
        expect: { kind: "repeat", target: "Heute ist alles modern" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız kalıplaşmış bir ikili:"),
          de("Es gab hier keine Autos."),
          tr("Yani 'Burada hiç araba yoktu.' Bu kalıbın şimdiki hâli 'var' demek; geçmişi işte bu."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es gab hier keine Autos"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es gab hier keine Autos" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Burada bir köy vardı.'")],
        expect: {
          kind: "produce",
          target: "Es gab hier ein Dorf",
          hint: [
            tr("Bu kalıp değişmez, arkasından gelen ise nesnedir:"),
            de("Es gab hier ein Dorf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es gab damals viele Kinder."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es gab damals viele Kinder.",
          answer: true,
          why: [
            tr("Doğru. Kalıp aynen kalmış, zaman kelimesi araya girmiş ve arkasından gelen çoğul nesne doğru kurulmuş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık karşılaştırma yapabilirsin. Şimdi mahallenin en eski sakiniyle bankta oturuyorsun ve o eskiyi anlatmaya başlıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Mahallenin en eski sakiniyle bir bankta oturuyorsun. Buranın eskiden nasıl olduğunu sor ve kendi memleketinin eskisiyle bugününü karşılaştır.",
      partner: "eski günleri özleyen, anlatmaya doyamayan yaşlı bir komşu",
      opening: "Hier war früher alles ganz anders. Können Sie sich das vorstellen?",
      openingTr: "Burası eskiden bambaşkaydı. Gözünüzde canlandırabiliyor musunuz?",
      goal: "Mahallenin eskiden nasıl olduğu öğrenilmiş ve senin memleketinle karşılaştırılmış olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-erste-mal",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Mein erstes Mal",
    titleTr: "İlk deneyimler",
    summary:
      "Bir şeyi ilk kez yaptığını anlatmayı ve o anki duygunu ifade etmeyi öğretir.",
    minutes: 8,
    focusId: "Perfekt",
    vocab: [
      { de: "das Mal", tr: "kez" },
      { de: "nervös", tr: "gergin, heyecanlı" },
      { de: "plötzlich", tr: "birden" },
      { de: "mutig", tr: "cesur" },
      { de: "unglaublich", tr: "inanılmaz" },
    ],
    patterns: [
      { de: "Zum ersten Mal habe ich …", tr: "bir şeyi ilk kez yaptığını anlatır" },
      { de: "Ich war nervös.", tr: "o an ne hissettiğini söyler" },
      { de: "Es hat geklappt.", tr: "işin yolunda gittiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir hikâye anlatmayı öğreneceğiz: bir şeyi ilk kez yaptığın anı. Ne yaptığını, ne hissettiğini ve nasıl bittiğini bir araya getireceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyi bir hikâyenin üç parçası var: olay, duygu, sonuç. Olayı Perfekt ile, duyguyu tek parça geçmişle, sonucu yine Perfekt ile anlatacaksın. Yani yeni kural yok; bildiklerini bir arada kullanacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Mal"),
          tr("Türkçesi 'kez, kere' demek. Lütfen"),
          de("das Mal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mal" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("nervös"),
          tr("Türkçesi 'heyecanlı, gergin' demek. Lütfen"),
          de("nervös"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nervös" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("plötzlich"),
          tr("Türkçesi 'birden, aniden' demek. Lütfen"),
          de("plötzlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "plötzlich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("mutig"),
          tr("Türkçesi 'cesur' demek. Lütfen"),
          de("mutig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mutig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unglaublich"),
          tr("Türkçesi 'inanılmaz' demek. Lütfen"),
          de("unglaublich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unglaublich" },
      },
      {
        say: [
          tr("İlk kalıbımız hikâyeyi açar:"),
          de("Zum ersten Mal habe ich allein gekocht."),
          tr("Baştaki uzun ifade tek bir parça sayılır, o yüzden yardımcı fiil hemen arkasına geçer."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Zum ersten Mal habe ich allein gekocht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Zum ersten Mal habe ich allein gekocht" },
      },
      {
        say: [tr("Sıra sende: 'İlk kez Almanca konuştum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Zum ersten Mal habe ich Deutsch gesprochen",
          hint: [
            tr("Baştaki ifadeden hemen sonra yardımcı fiil gelir, kuralsız ortaç ise sonda kalır:"),
            de("Zum ersten Mal habe ich Deutsch gesprochen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız duyguyu söyler:"),
          de("Ich war sehr nervös."),
          tr("Duyguyu anlatırken Perfekt kurmaya çalışma; tek parça geçmiş burada doğal olan."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich war sehr nervös"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich war sehr nervös" },
      },
      {
        say: [
          tr("Hikâyeye bir dönüm noktası eklemek istersen:"),
          de("Plötzlich war alles ganz einfach."),
          tr("Yani 'Birden her şey kolaylaştı.'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Plötzlich war alles ganz einfach"), tr("deyin.")],
        expect: { kind: "repeat", target: "Plötzlich war alles ganz einfach" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız sonucu verir:"),
          de("Es hat geklappt."),
          tr("Yani 'Oldu, yürüdü.' Bu fiil kurallı, o yüzden ortacı düz ekle kuruluyor."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Her şey yolunda gitti.'")],
        expect: {
          kind: "produce",
          target: "Es hat gut geklappt",
          accept: ["Alles hat gut geklappt"],
          hint: [
            tr("Kurallı fiilin ortacı düz ekle kurulur ve yine sonda durur:"),
            de("Es hat gut geklappt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonunda kendine hakkını da verirsin:"),
          de("Ich war richtig mutig."),
          tr("Ve o anı tek kelimeyle özetlersin:"),
          de("Es war unglaublich."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es hat geklappen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es hat geklappen.",
          answer: false,
          why: [
            tr("Yanlış. Bu fiil kurallı; ortacı mastar sonuyla değil düz ekle biter. Doğrusu:"),
            de("Es hat geklappt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık küçük bir hikâye kurabilirsin. Şimdi bir arkadaşın yüzündeki mutluluğu fark etti ve merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşına ilk kez yaptığın bir şeyi anlatıyorsun. Ne yaptığını, o an ne hissettiğini ve sonucun ne olduğunu sırayla anlat.",
      partner: "hikâyenin devamını dört gözle bekleyen bir arkadaş",
      opening: "Du siehst so glücklich aus! Was hast du zum ersten Mal gemacht?",
      openingTr: "Çok mutlu görünüyorsun! İlk kez ne yaptın?",
      goal: "İlk deneyimin ne olduğu, o an ne hissettiğin ve nasıl sonuçlandığı anlatılmış olur.",
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
    summary:
      "Bir haftayı gün gün özetlemeyi ve haftanın nasıl geçtiğini değerlendirmeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "anstrengend", tr: "yorucu" },
      { de: "voll", tr: "dolu" },
      { de: "der Alltag", tr: "günlük hayat" },
      { de: "schaffen", tr: "yetiştirmek" },
      { de: "zum Glück", tr: "neyse ki" },
    ],
    patterns: [
      { de: "Am Montag habe ich …", tr: "hangi gün ne yaptığını anlatır" },
      { de: "Die Woche war anstrengend.", tr: "haftanın nasıl geçtiğini söyler" },
      { de: "Zum Glück habe ich alles geschafft.", tr: "her şeyi yetiştirdiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Selam! Bugün koca bir haftayı birkaç cümleye sığdıracağız. Bu, iş yerinde ve arkadaş sohbetlerinde her cuma kuracağın bir özet. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İyi bir özetin tarifi şu: gün, sonra o gün yaptığın iş, en sonunda da haftanın genel hükmü. Gün adı başa geçtiğinde fiilin ne yaptığını artık biliyorsun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("anstrengend"),
          tr("Türkçesi 'yorucu' demek. Lütfen"),
          de("anstrengend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anstrengend" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("voll"),
          tr("Türkçesi 'dolu' demek. Lütfen"),
          de("voll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "voll" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Alltag"),
          tr("Türkçesi 'günlük hayat' demek. Lütfen"),
          de("der Alltag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Alltag" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schaffen"),
          tr("Türkçesi 'yetiştirmek, üstesinden gelmek' demek. Lütfen"),
          de("schaffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schaffen" },
      },
      {
        say: [
          tr("Son kelimemiz iki parçadan oluşuyor:"),
          de("zum Glück"),
          tr("Türkçesi 'neyse ki' demek. Lütfen"),
          de("zum Glück"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zum Glück" },
      },
      {
        say: [
          tr("İlk kalıbımız günü öne alır:"),
          de("Am Montag habe ich meine Mutter abgeholt."),
          tr("Gün başta, yardımcı fiil hemen arkasında, ortaç en sonda. Üç kural aynı cümlede çalışıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Am Montag habe ich meine Mutter abgeholt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Am Montag habe ich meine Mutter abgeholt" },
      },
      {
        say: [tr("Sıra sende: 'Salı günü alışveriş yaptım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Dienstag habe ich eingekauft",
          hint: [
            tr("Gün başa geçince yardımcı fiil hemen arkasına gelir, ek ise öneğin arkasına girer:"),
            de("Am Dienstag habe ich eingekauft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hükmü verir:"),
          de("Die Woche war sehr voll."),
          tr("Haftayı değerlendirirken tek parça geçmiş kullanılır, Perfekt değil."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Die Woche war sehr voll"), tr("deyin.")],
        expect: { kind: "repeat", target: "Die Woche war sehr voll" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Hafta çok yorucuydu.'")],
        expect: {
          kind: "produce",
          target: "Die Woche war sehr anstrengend",
          hint: [
            tr("Tek parça geçmiş yeter, arkasından da niteleyen kelime gelir:"),
            de("Die Woche war sehr anstrengend."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız rahatlamayı anlatır:"),
          de("Zum Glück habe ich alles geschafft."),
          tr("Baştaki ikili de tek parça sayılır, o yüzden yardımcı fiil yine hemen arkasına geçiyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Zum Glück habe ich alles geschafft"), tr("deyin.")],
        expect: { kind: "repeat", target: "Zum Glück habe ich alles geschafft" },
      },
      {
        say: [
          tr("Haftanın olağan akışını anlatmak istersen tek kelime yeter:"),
          de("Der Alltag war ganz normal."),
          tr("Yani 'Günlük hayat gayet normaldi.'"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zum Glück habe ich nichts vergessen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zum Glück habe ich nichts vergessen.",
          answer: true,
          why: [
            tr("Doğru. Baştaki ifadeden sonra yardımcı fiil gelmiş, özne üçüncü sıraya düşmüş ve ortaç sonda kalmış."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık haftanı özetleyebilirsin. Şimdi cuma akşamı bir arkadaşınla oturuyorsun ve o ilk soruyu soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Cuma akşamı bir arkadaşınla oturuyorsun ve haftan soruluyor. Hangi gün ne yaptığını anlat ve haftanın genel olarak nasıl geçtiğini söyle.",
      partner: "kendi haftasından da yakınmak isteyen bir arkadaş",
      opening: "Endlich Freitag! Wie war deine Woche?",
      openingTr: "Nihayet cuma! Haftan nasıl geçti?",
      goal: "Haftanın günleri anlatılmış ve haftanın nasıl geçtiği tek cümleyle değerlendirilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a2-tolle-nachricht",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Rate mal, was passiert ist!",
    titleTr: "Haber verme",
    summary:
      "Heyecanlı bir haberi vermeyi ve bazı fiillerin ortaçta neden hiç 'ge-' almadığını öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "bekommen", tr: "almak" },
      { de: "passieren", tr: "olmak" },
      { de: "die Überraschung", tr: "sürpriz" },
      { de: "die Prüfung", tr: "sınav" },
      { de: "gratulieren", tr: "tebrik etmek" },
    ],
    patterns: [
      { de: "Stell dir vor, …", tr: "heyecanlı bir haberi açar" },
      { de: "Ich habe … bekommen.", tr: "bir şeyi aldığını ya da kazandığını söyler" },
      { de: "Was ist passiert?", tr: "ne olduğunu sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hoş geldin! Bu modülün son dersinde iyi haber veriyoruz. Bir de ortaç kuralının son parçasını tamamlayacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kuralı iki adımda tamamlıyoruz. Vurgusuz önekle başlayan fiillerin ek almadığını biliyorsun. Ek almayan ikinci bir grup daha var: sonu belirli bir uzun ekle biten fiiller. Bu iki grubu tanıdığında Perfekt'te artık şaşırmazsın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("bekommen"),
          tr("Türkçesi 'almak, kavuşmak' demek. Lütfen"),
          de("bekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bekommen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("passieren"),
          tr("Türkçesi 'olmak, meydana gelmek' demek. Lütfen"),
          de("passieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "passieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Überraschung"),
          tr("Türkçesi 'sürpriz' demek. Lütfen"),
          de("die Überraschung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Überraschung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Prüfung"),
          tr("Türkçesi 'sınav' demek. Lütfen"),
          de("die Prüfung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Prüfung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gratulieren"),
          tr("Türkçesi 'tebrik etmek' demek. Lütfen"),
          de("gratulieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gratulieren" },
      },
      {
        say: [
          tr("İki grubu yan yana duy. Vurgusuz önekli fiil:"),
          de("bekommen"),
          tr("ortaçta yine"),
          de("bekommen"),
          tr("Uzun ekle biten fiil:"),
          de("passieren"),
          tr("ortaçta"),
          de("passiert"),
          tr("İkisinde de o küçük ek hiç görünmüyor."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız haberi açar:"),
          de("Stell dir vor, ich habe die Wohnung bekommen!"),
          tr("Baştaki ifade 'Bir düşün, tahmin et' demek; Almanlar iyi haberi hep böyle başlatır. Aynı işi gören bir cümle daha:"),
          de("Ich habe eine Überraschung für dich!"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Stell dir vor, ich habe die Wohnung bekommen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Stell dir vor, ich habe die Wohnung bekommen" },
      },
      {
        say: [tr("Sıra sende: 'Sınavı başardım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe die Prüfung geschafft",
          hint: [
            tr("Bu fiil kurallıydı, ortacı düz ekle kurulur ve sonda durur:"),
            de("Ich habe die Prüfung geschafft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız karşı taraftan gelir:"),
          de("Was ist passiert?"),
          tr(
            "Yani 'Ne oldu?' Bu fiil bir şeyin olup bitmesini anlattığı için yardımcı fiili 'olmak' — tıpkı hareket fiillerindeki gibi. Ortaçta ise ek yok.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was ist passiert"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was ist passiert" },
      },
      {
        say: [tr("Şimdi sen sor: 'Dün ne oldu?'")],
        expect: {
          kind: "produce",
          target: "Was ist gestern passiert",
          hint: [
            tr("Soru kelimesi başta, yardımcı fiil arkasında, zaman ortada, ortaç sonda:"),
            de("Was ist gestern passiert?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Haberi duyan kişinin cevabı da hazırdır:"),
          de("Das ist ja toll! Ich gratuliere dir!"),
          tr("Yani 'Bu harika! Seni tebrik ederim!'"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich gratuliere dir"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich gratuliere dir" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe die Wohnung gebekommen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe die Wohnung gebekommen.",
          answer: false,
          why: [
            tr("Yanlış. Bu fiil vurgusuz bir önekle başlıyor, o yüzden ortaçta o ek hiç gelmez. Doğrusu:"),
            de("Ich habe die Wohnung bekommen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu modülü bitirdin: artık geçmişi kuralsız fiillerle, ayrılabilen fiillerle ve tek parça biçimle anlatabiliyorsun. Şimdi bir arkadaşını arayıp büyük haberi veriyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşını arayıp sevindirici bir haber veriyorsun. Haberi heyecanla aç, ne olduğunu anlat ve arkadaşının sorularına cevap ver.",
      partner: "haberi duyunca bağıracak kadar coşkulu bir arkadaş",
      opening: "Hallo! Du klingst ja aufgeregt. Was ist los?",
      openingTr: "Alo! Sesin çok heyecanlı geliyor. Ne oldu?",
      goal: "Haber verilmiş, ayrıntıları sorulmuş ve birlikte kutlanmış olur.",
      minTurns: 7,
    },
  },
];

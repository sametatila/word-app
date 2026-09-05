import { de, tr, type Lesson } from "../types";

/**
 * A1 · Modül 7 — Ev ve yaşam (061–070).
 *
 * Modülün üç dil sorunu var ve üçü de Türkçe konuşanın kendiliğinden
 * yapamayacağı şeyler:
 *
 *   1. **„Es gibt“.** Türkçede „var“ tek başına bir yüklem; Almancada bir
 *      özne ve bir fiil gerekiyor ve arkasından gelen kelime belirtme hâline
 *      giriyor. Öğrenci „Ein Balkon ist“ demeye kalkıyor.
 *   2. **Yer bildirirken üç ayrı fiil.** Türkçede her şey „duruyor“; Almancada
 *      ayakta duran `stehen`, yatan `liegen`, asılı olan `hängen` alıyor.
 *      Üstüne yer bildiren edat kelimeyi yönelme hâline sokuyor.
 *   3. **Kişisiz „man“.** Türkçede „yapılmaz, girilmez“ diye edilgen kurulan
 *      kural cümleleri Almancada bir öznesiz zamirle kuruluyor.
 *
 * Sıra buna göre: önce evin bütünü ve „var“ kalıbı, sonra odalar ve artikel,
 * sonra eşyaların yeri, sonra apartman hayatı (komşu, kural, kira), en sonda
 * ev işleri, taşınma, balkon ve arıza bildirme. Her ders öncekilerin
 * kelimelerini yeniden kullanıyor.
 */
export const deA1B07: Lesson[] = [
  {
    id: "de-a1-wohnung-zeigen",
    icon: "home",
    level: "A1",
    course: "de",
    title: "Meine Wohnung",
    titleTr: "Evi tanıtma",
    summary: "Evini tanıtmayı öğretir: kaç oda var, nasıl bir yer.",
    minutes: 8,
    focusId: "Es-gibt",
    vocab: [
      { de: "die Wohnung", tr: "daire" },
      { de: "das Haus", tr: "ev" },
      { de: "das Zimmer", tr: "oda" },
      { de: "hell", tr: "aydınlık" },
      { de: "ruhig", tr: "sakin" },
      { de: "das Apartment", tr: "stüdyo daire" },
      { de: "der Raum", tr: "mekân" },
      { de: "das Fenster", tr: "pencere" },
],
    patterns: [
      { de: "Es gibt …", tr: "bir şeyin var olduğunu söyler" },
      { de: "Die Wohnung hat …", tr: "evin neye sahip olduğunu söyler" },
      { de: "… ist hell und ruhig.", tr: "evin nasıl bir yer olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün evini tanıtmayı öğreneceğiz: kaç odası var, nasıl bir yer. Almancada 'var' demenin kendine özgü bir yolu var, onu göreceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ev konuşması her yerde çıkıyor: iş arkadaşınla, komşunla, ev bakarken. Üç kalıp öğreneceğiz ve üçüyle evini baştan sona anlatabileceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Wohnung"),
          tr("Türkçesi 'daire' demek — apartmandaki ev. Lütfen"),
          de("die Wohnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wohnung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Haus"),
          tr("Türkçesi 'bina, müstakil ev' demek. Lütfen"),
          de("das Haus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Haus" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Zimmer"),
          tr("Türkçesi 'oda' demek. Lütfen"),
          de("das Zimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Zimmer" },
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
          tr("Beşinci kelimemiz:"),
          de("ruhig"),
          tr("Türkçesi 'sessiz, sakin' demek. Lütfen"),
          de("ruhig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ruhig" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Apartment"),
          tr("Türkçesi 'stüdyo daire' demek. Lütfen"),
          de("das Apartment"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Apartment" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Raum"),
          tr("Türkçesi 'mekân' demek. Lütfen"),
          de("der Raum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Raum" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Fenster"),
          tr("Türkçesi 'pencere' demek. Lütfen"),
          de("das Fenster"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fenster" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es gibt …"),
          tr(
            "Türkçede 'var' demek için tek kelime yeter. Almancada ise bir özne ve bir fiil gerekiyor; bu ikisi hep birlikte kullanılıyor ve kalıp hiç değişmiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Üç oda var.' Almancası:"),
          de("Es gibt drei Zimmer."),
          tr("Lütfen"),
          de("Es gibt drei Zimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es gibt drei Zimmer" },
      },
      {
        say: [tr("Sıra sende: 'İki oda var.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Es gibt zwei Zimmer",
          hint: [
            tr("Kalıp hiç değişmiyor, sadece sayıyı koyuyorsun:"),
            de("Es gibt zwei Zimmer."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Die Wohnung hat …"),
          tr("'Evin şu var' demek. Örnek: 'Evin üç odası var.'"),
          de("Die Wohnung hat drei Zimmer."),
          tr("Lütfen"),
          de("Die Wohnung hat drei Zimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Wohnung hat drei Zimmer" },
      },
      {
        say: [
          tr("Son kalıbımız evi anlatır:"),
          de("Die Wohnung ist hell und ruhig."),
          tr("'Ev aydınlık ve sakin' demek. Lütfen"),
          de("Die Wohnung ist hell und ruhig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Wohnung ist hell und ruhig" },
      },
      {
        say: [tr("Şimdi sen: 'Bina sakin.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das Haus ist ruhig",
          hint: [
            tr("Önce bina, sonra fiil, sonra özelliği:"),
            de("Das Haus ist ruhig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es gibt drei Zimmern."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es gibt drei Zimmern.",
          answer: false,
          why: [
            tr("Bu kelimenin çoğulu tekiliyle aynı, sonuna ek almaz. Doğrusu"),
            de("Es gibt drei Zimmer."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık evini anlatabilirsin. Şimdi bunu gerçek bir konuşmada kullanacaksın: bir arkadaşın yeni evini merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni bir eve taşındın ve bir arkadaşın evini soruyor. Kaç oda olduğunu, evin nasıl bir yer olduğunu anlat ve neyin var olduğunu söyle.",
      partner: "yeni evini görmek için sabırsızlanan bir arkadaş",
      opening: "Und, wie ist die neue Wohnung? Wie viele Zimmer hat sie?",
      openingTr: "Ee, yeni ev nasıl? Kaç odası var?",
      goal: "Evin kaç odalı ve nasıl bir yer olduğu anlatılmış; arkadaşın gelip görmeye söz vermiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-zimmer",
    icon: "home",
    level: "A1",
    course: "de",
    title: "Die Zimmer",
    titleTr: "Odalar",
    summary: "Evin odalarını ve her odanın artikelini öğretir.",
    minutes: 8,
    focusId: "Artikel",
    vocab: [
      { de: "das Schlafzimmer", tr: "yatak odası" },
      { de: "das Wohnzimmer", tr: "oturma odası" },
      { de: "die Küche", tr: "mutfak" },
      { de: "das Bad", tr: "banyo" },
      { de: "der Flur", tr: "koridor" },
      { de: "die Dusche", tr: "duş" },
      { de: "die Treppe", tr: "merdiven" },
      { de: "der Eingang", tr: "giriş" },
],
    patterns: [
      { de: "Das ist …", tr: "bir odayı gösterirken kullanılır" },
      { de: "Hier ist …", tr: "bir odanın yerini gösterirken kullanılır" },
      { de: "Wie viele Zimmer hat …?", tr: "kaç oda olduğunu sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün evin odalarını öğreneceğiz. Her odanın kendi artikeli var ve Türkçede böyle bir şey olmadığı için kelimeyi hep artikeliyle birlikte öğrenmen gerekiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Küçük bir kolaylık: sonu 'oda' kelimesiyle biten bileşik kelimelerin hepsi aynı artikeli alır. Bunu fark edince yarısı kendiliğinden gelir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Schlafzimmer"),
          tr("Türkçesi 'yatak odası' demek. Lütfen"),
          de("das Schlafzimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schlafzimmer" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Wohnzimmer"),
          tr("Türkçesi 'oturma odası' demek. Lütfen"),
          de("das Wohnzimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wohnzimmer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Küche"),
          tr("Türkçesi 'mutfak' demek. Lütfen"),
          de("die Küche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Küche" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Bad"),
          tr("Türkçesi 'banyo' demek. Lütfen"),
          de("das Bad"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Bad" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Flur"),
          tr("Türkçesi 'koridor, antre' demek. Lütfen"),
          de("der Flur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flur" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Dusche"),
          tr("Türkçesi 'duş' demek. Lütfen"),
          de("die Dusche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Dusche" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Treppe"),
          tr("Türkçesi 'merdiven' demek. Lütfen"),
          de("die Treppe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Treppe" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Eingang"),
          tr("Türkçesi 'giriş' demek. Lütfen"),
          de("der Eingang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Eingang" },
      },
      {
        say: [
          tr(
            "Fark ettin mi: yatak odası ve oturma odası aynı artikeli alıyor. Çünkü ikisi de oda kelimesiyle bitiyor ve artikel her zaman son parçadan gelir. Mutfak ve koridor ise kendi artikellerini taşıyor.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız bir odayı gösterir. Örnek: 'Burası mutfak.'"),
          de("Das ist die Küche."),
          tr("Lütfen"),
          de("Das ist die Küche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist die Küche" },
      },
      {
        say: [tr("Sıra sende: 'Burası yatak odası.' demek için ne dersin? Artikeline dikkat et.")],
        expect: {
          kind: "produce",
          target: "Das ist das Schlafzimmer",
          hint: [
            tr("Oda ile biten kelimeler aynı artikeli alır:"),
            de("Das ist das Schlafzimmer."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yer gösterir:"),
          de("Hier ist das Bad."),
          tr("'Banyo burada' demek. Lütfen"),
          de("Hier ist das Bad"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hier ist das Bad" },
      },
      {
        say: [tr("Şimdi sen: 'Koridor burada.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Hier ist der Flur",
          hint: [
            tr("Bu kelime kendi artikelini taşıyor:"),
            de("Hier ist der Flur."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız bir soru:"),
          de("Wie viele Zimmer hat die Wohnung?"),
          tr("'Evin kaç odası var?' demek. Lütfen"),
          de("Wie viele Zimmer hat die Wohnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wie viele Zimmer hat die Wohnung" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist das Wohnzimmer."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist das Wohnzimmer.",
          answer: true,
          why: [
            tr("Doğru. Oda ile biten kelimeler artikellerini son parçadan alır, o yüzden bu kelime de aynı artikeli taşır."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık odaları adlarıyla söyleyebilirsin. Şimdi evini gezdireceksin: bir arkadaşın ilk kez sana geliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın ilk kez evine geldi ve sen ona evi gezdiriyorsun. Odaları tek tek göster ve her birinin adını doğru artikeliyle söyle.",
      partner: "her şeyi beğenen, meraklı bir arkadaş",
      opening: "Wow, schön hier! Was ist denn das für ein Zimmer?",
      openingTr: "Vay, burası güzelmiş! Bu ne odası?",
      goal: "Bütün odalar gezilmiş ve arkadaşın evin planını anlamış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-moebel",
    icon: "home",
    level: "A1",
    course: "de",
    title: "Wo steht das Sofa?",
    titleTr: "Eşyaların yeri",
    summary: "Eşyaların nerede olduğunu söylemeyi ve duruş fiillerini ayırmayı öğretir.",
    minutes: 9,
    focusId: "Präposition-in-an-auf",
    vocab: [
      { de: "das Sofa", tr: "kanepe" },
      { de: "der Tisch", tr: "masa" },
      { de: "der Schrank", tr: "dolap" },
      { de: "die Wand", tr: "duvar" },
      { de: "die Ecke", tr: "köşe" },
      { de: "die Möbel", tr: "mobilya" },
      { de: "stellen", tr: "koymak" },
      { de: "stehen", tr: "ayakta durmak" },
],
    patterns: [
      { de: "… steht in der Ecke.", tr: "ayakta duran bir eşyanın yerini söyler" },
      { de: "… hängt an der Wand.", tr: "asılı bir şeyin yerini söyler" },
      { de: "… liegt auf dem Tisch.", tr: "yatan bir şeyin yerini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün eşyaların nerede olduğunu söylemeyi öğreneceğiz. Burada Türkçeden ayrılan güzel bir ayrıntı var: Almancada bir şeyin nasıl durduğuna göre fiil değişiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede her şey 'duruyor'. Almancada ise ayakta duran, yatan ve asılı olan için ayrı fiiller var. Kulağa zor geliyor ama üç kelime öğrenince oturuyor. Önce eşyaları öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Sofa"),
          tr("Türkçesi 'koltuk, kanepe' demek. Lütfen"),
          de("das Sofa"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Sofa" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Tisch"),
          tr("Türkçesi 'masa' demek. Lütfen"),
          de("der Tisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Schrank"),
          tr("Türkçesi 'dolap' demek. Lütfen"),
          de("der Schrank"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schrank" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Wand"),
          tr("Türkçesi 'duvar' demek. Lütfen"),
          de("die Wand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wand" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Ecke"),
          tr("Türkçesi 'köşe' demek. Lütfen"),
          de("die Ecke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ecke" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Möbel"),
          tr("Türkçesi 'mobilya' demek. Lütfen"),
          de("die Möbel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Möbel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("stellen"),
          tr("Türkçesi 'koymak' demek. Lütfen"),
          de("stellen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stellen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("stehen"),
          tr("Türkçesi 'ayakta durmak' demek. Lütfen"),
          de("stehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stehen" },
      },
      {
        say: [
          tr(
            "Şimdi üç fiil. Ayakları üstünde duran eşyalar için bir fiil, düz yatan şeyler için başka bir fiil, duvara asılı olanlar için üçüncüsü kullanılıyor. Bir de şu var: yer bildirirken kelimenin artikeli değişiyor.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız. 'Koltuk köşede duruyor.' Almancası:"),
          de("Das Sofa steht in der Ecke."),
          tr("Lütfen"),
          de("Das Sofa steht in der Ecke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Sofa steht in der Ecke" },
      },
      {
        say: [tr("Sıra sende: 'Dolap köşede duruyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Schrank steht in der Ecke",
          hint: [
            tr("Dolap ayakları üstünde durduğu için aynı fiili kullanıyoruz:"),
            de("Der Schrank steht in der Ecke."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız asılı şeyler için. 'Saat duvarda asılı.' Almancası:"),
          de("Die Uhr hängt an der Wand."),
          tr("Lütfen"),
          de("Die Uhr hängt an der Wand"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Uhr hängt an der Wand" },
      },
      {
        say: [
          tr("Üçüncü kalıbımız yatan şeyler için:"),
          de("Das Buch liegt auf dem Tisch."),
          tr("'Kitap masanın üstünde duruyor' demek. Lütfen"),
          de("Das Buch liegt auf dem Tisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Buch liegt auf dem Tisch" },
      },
      {
        say: [tr("Şimdi sen: 'Çanta masanın üstünde duruyor.' demek için ne dersin? Çanta yattığı için yatan şeylerin fiilini kullan.")],
        expect: {
          kind: "produce",
          target: "Die Tasche liegt auf dem Tisch",
          hint: [
            tr("Yatan şeyler için ayrı bir fiil vardı:"),
            de("Die Tasche liegt auf dem Tisch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Sofa steht in die Ecke."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Sofa steht in die Ecke.",
          answer: false,
          why: [
            tr("Burada hareket yok, bir şeyin nerede olduğunu söylüyoruz; o yüzden artikel değişir. Doğrusu"),
            de("Das Sofa steht in der Ecke."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık eşyaların yerini söyleyebilirsin. Şimdi bunu kullanacaksın: bir arkadaşın sana yeni evinde eşyaları nereye koyacağını soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın yeni evine eşya yerleştiriyor ve sana fikir soruyor. Hangi eşyanın nerede duracağını söyle; duruş fiillerini doğru seç.",
      partner: "kararsız ama eğlenceli bir arkadaş",
      opening: "Sag mal, wo stelle ich das Sofa hin? In die Ecke?",
      openingTr: "Söylesene, koltuğu nereye koyayım? Köşeye mi?",
      goal: "Her eşyanın nereye konacağı kararlaşmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-nachbarn",
    icon: "greet",
    level: "A1",
    course: "de",
    title: "Die neuen Nachbarn",
    titleTr: "Komşular",
    summary: "Yeni komşularla tanışmayı ve kapıyı çalmayı öğretir.",
    minutes: 8,
    focusId: "Vorstellung",
    vocab: [
      { de: "der Nachbar", tr: "komşu" },
      { de: "die Nachbarin", tr: "kadın komşu" },
      { de: "klopfen", tr: "kapıyı çalmak" },
      { de: "willkommen", tr: "hoş geldin" },
      { de: "neu", tr: "yeni" },
      { de: "der Aufzug", tr: "asansör" },
      { de: "der Stock", tr: "kat" },
      { de: "der Bekannte", tr: "tanıdık" },
],
    patterns: [
      { de: "Wir sind neu hier.", tr: "buraya yeni taşındığını söyler" },
      { de: "Herzlich willkommen!", tr: "birini karşılarken kullanılır" },
      { de: "Klopfen Sie einfach.", tr: "çekinmeden gelmesini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün komşularla tanışmayı öğreneceğiz. Almanya'da yeni taşınınca kapı çalıp kendini tanıtmak alışılmış bir şey; bunun hazır kalıpları var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İlk cümleler önemli: doğru kalıpla başlarsan konuşma kendiliğinden açılıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Nachbar"),
          tr("Türkçesi 'komşu' demek — erkek komşu için. Lütfen"),
          de("der Nachbar"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nachbar" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Nachbarin"),
          tr("Bu da kadın komşu için. Almancada meslek ve rol adlarının kadın biçimi çoğu zaman sona bir ek alarak yapılır. Lütfen"),
          de("die Nachbarin"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachbarin" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("klopfen"),
          tr("Türkçesi 'kapıyı çalmak' demek. Lütfen"),
          de("klopfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "klopfen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("willkommen"),
          tr("Türkçesi 'hoş geldin' demek. Lütfen"),
          de("willkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "willkommen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("neu"),
          tr("Türkçesi 'yeni' demek. Lütfen"),
          de("neu"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "neu" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Aufzug"),
          tr("Türkçesi 'asansör' demek. Lütfen"),
          de("der Aufzug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Aufzug" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Stock"),
          tr("Türkçesi 'kat' demek. Lütfen"),
          de("der Stock"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stock" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Bekannte"),
          tr("Türkçesi 'tanıdık' demek. Lütfen"),
          de("der Bekannte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bekannte" },
      },
      {
        say: [
          tr("İlk kalıbımız kapıyı çaldığında söyleyeceğin cümle:"),
          de("Wir sind neu hier."),
          tr("'Buraya yeni taşındık' demek. Lütfen"),
          de("Wir sind neu hier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir sind neu hier" },
      },
      {
        say: [tr("Sıra sende. Tek başına taşındıysan 'Buraya yeni taşındım.' dersin. Bunun Almancası ne olur?")],
        expect: {
          kind: "produce",
          target: "Ich bin neu hier",
          hint: [
            tr("Kalıp aynı, sadece kişi değişiyor:"),
            de("Ich bin neu hier."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız karşılama için:"),
          de("Herzlich willkommen!"),
          tr("'Hoş geldiniz' demek ve çok sıcak bir karşılamadır. Lütfen"),
          de("Herzlich willkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Herzlich willkommen" },
      },
      {
        say: [
          tr("Son kalıbımız bir davet:"),
          de("Klopfen Sie einfach."),
          tr("'Çekinmeden kapıyı çalın' demek. Lütfen"),
          de("Klopfen Sie einfach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Klopfen Sie einfach" },
      },
      {
        say: [tr("Şimdi sen: 'Komşum çok sakin.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Nachbar ist sehr ruhig",
          hint: [
            tr("Önce komşu, sonra fiil, sonra özelliği:"),
            de("Mein Nachbar ist sehr ruhig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist meine Nachbarin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist meine Nachbarin.",
          answer: true,
          why: [
            tr("Doğru. Kadın komşu için kelimenin sonuna ek gelir ve kelime dişil olduğu için iyelik de dişil biçimini alır."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık komşunla ilk konuşmayı yapabilirsin. Şimdi kapıyı çalıyorsun: karşında yeni komşun var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni taşındın ve komşunun kapısını çaldın. Kendini tanıt, yeni taşındığını söyle ve kısa bir sohbet et.",
      partner: "yıllardır o binada oturan, sıcakkanlı bir komşu",
      opening: "Guten Tag! Sie sind wohl die neuen Nachbarn, oder?",
      openingTr: "İyi günler! Siz yeni komşular olmalısınız, değil mi?",
      goal: "Karşılıklı tanışılmış ve komşunla ilk kısa sohbet bir vedayla kapanmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-hausordnung",
    icon: "office",
    level: "A1",
    course: "de",
    title: "Die Hausordnung",
    titleTr: "Apartman kuralları",
    summary: "Apartman kurallarını anlamayı ve neyin yasak olduğunu söylemeyi öğretir.",
    minutes: 9,
    focusId: "Negation-nicht",
    vocab: [
      { de: "die Hausordnung", tr: "apartman yönetmeliği" },
      { de: "der Müll", tr: "çöp" },
      { de: "der Keller", tr: "bodrum" },
      { de: "leise", tr: "sessiz" },
      { de: "laut", tr: "gürültülü" },
      { de: "die Ordnung", tr: "düzen" },
      { de: "dürfen", tr: "izinli olmak" },
      { de: "der Schlüssel", tr: "anahtar" },
],
    patterns: [
      { de: "Man darf nicht …", tr: "bir şeyin yasak olduğunu söyler" },
      { de: "Bitte leise sein.", tr: "sessiz olmasını rica eder" },
      { de: "Der Müll kommt …", tr: "çöpün nereye gittiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün apartman kurallarını öğreneceğiz. Almanya'da her binanın yazılı kuralları var ve bunları anlamak işini çok kolaylaştırır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural cümlelerinde Türkçe 'yapılmaz' der ve kimin yapmadığını söylemez. Almancada bunun için özel bir kelime var: kimseyi göstermeyen, herkesi kapsayan bir özne. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Hausordnung"),
          tr("Türkçesi 'apartman yönetmeliği' demek. Lütfen"),
          de("die Hausordnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Hausordnung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Müll"),
          tr("Türkçesi 'çöp' demek. Lütfen"),
          de("der Müll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Müll" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Keller"),
          tr("Türkçesi 'bodrum' demek. Lütfen"),
          de("der Keller"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Keller" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("leise"),
          tr("Türkçesi 'sessiz' demek. Lütfen"),
          de("leise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leise" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("laut"),
          tr("Türkçesi 'gürültülü' demek. Lütfen"),
          de("laut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "laut" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Ordnung"),
          tr("Türkçesi 'düzen' demek. Lütfen"),
          de("die Ordnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ordnung" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("dürfen"),
          tr("Türkçesi 'izinli olmak' demek. Lütfen"),
          de("dürfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dürfen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Schlüssel"),
          tr("Türkçesi 'anahtar' demek. Lütfen"),
          de("der Schlüssel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schlüssel" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Man darf nicht …"),
          tr(
            "Baştaki kelime kimseyi göstermez, 'herkes' anlamındadır. Türkçede bunu edilgen kurarız: yapılmaz, girilmez. Almancada ise cümlenin bir öznesi olmak zorunda ve o özne bu kelimedir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Burada sigara içilmez.' Almancası:"),
          de("Man darf hier nicht rauchen."),
          tr("Lütfen"),
          de("Man darf hier nicht rauchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Man darf hier nicht rauchen" },
      },
      {
        say: [tr("Sıra sende: 'Burada park edilmez.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Man darf hier nicht parken",
          hint: [
            tr("Kalıp aynı, sadece son fiil değişiyor:"),
            de("Man darf hier nicht parken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kibar bir rica:"),
          de("Bitte leise sein."),
          tr("'Lütfen sessiz olun' demek. Apartman ilanlarında sık görürsün. Lütfen"),
          de("Bitte leise sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bitte leise sein" },
      },
      {
        say: [
          tr("Son kalıbımız çöp için:"),
          de("Der Müll kommt nach unten."),
          tr("'Çöp aşağı gider' demek. Lütfen"),
          de("Der Müll kommt nach unten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Müll kommt nach unten" },
      },
      {
        say: [tr("Şimdi sen: 'Çöp bodruma gider.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Müll kommt in den Keller",
          hint: [
            tr("Buraya doğru bir hareket var, o yüzden artikel değişiyor:"),
            de("Der Müll kommt in den Keller."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Hier man darf nicht rauchen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Hier man darf nicht rauchen.",
          answer: false,
          why: [
            tr("Başta yer bildiren bir kelime varken fiil ikinci sıraya geçmeli, özne arkasına. Doğrusu"),
            de("Hier darf man nicht rauchen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kuralları anlayabilir ve anlatabilirsin. Şimdi bina yöneticisi seni kapıda durdurup kuralları anlatacak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Binaya yeni taşındın ve yönetici sana apartman kurallarını anlatıyor. Anlamadığın yeri sor ve kuralları kendi cümlenle tekrarla.",
      partner: "kuralları önemseyen ama yardımsever bir bina yöneticisi",
      opening: "Willkommen im Haus! Kennen Sie schon die Hausordnung?",
      openingTr: "Binamıza hoş geldiniz! Apartman kurallarını biliyor musunuz?",
      goal: "Kuralların hepsi anlaşılmış ve senin tarafından tekrarlanarak onaylanmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-miete-zahlen",
    icon: "money",
    level: "A1",
    course: "de",
    title: "Die Miete",
    titleTr: "Kira ve faturalar",
    summary: "Kirayı ve aidatı konuşmayı öğretir; sıcak ve soğuk kira farkını gösterir.",
    minutes: 9,
    focusId: "Zahlen-Preise",
    vocab: [
      { de: "die Miete", tr: "kira" },
      { de: "die Nebenkosten", tr: "aidat" },
      { de: "der Vermieter", tr: "ev sahibi" },
      { de: "der Monat", tr: "ay" },
      { de: "warm", tr: "sıcak" },
      { de: "mieten", tr: "kiralamak" },
      { de: "vermieten", tr: "kiraya vermek" },
      { de: "überweisen", tr: "havale etmek" },
],
    patterns: [
      { de: "Die Miete kostet …", tr: "kiranın ne kadar olduğunu söyler" },
      { de: "warm oder kalt", tr: "kiranın aidat dahil mi olduğunu sorar" },
      { de: "pro Monat", tr: "aylık olduğunu belirtir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kirayı konuşmayı öğreneceğiz. Almanya'da kira ilanlarında çok garip gelen bir ayrım var: sıcak kira ve soğuk kira. Onu da göreceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ayrımı bilmeden ev bakarsan fiyatları yanlış karşılaştırırsın. Önce kelimeleri öğrenelim, sonra ayrımı açalım.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Miete"),
          tr("Türkçesi 'kira' demek. Lütfen"),
          de("die Miete"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Miete" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Nebenkosten"),
          tr("Türkçesi 'aidat ve ek giderler' demek — ısınma, su, çöp. Lütfen"),
          de("die Nebenkosten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nebenkosten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Vermieter"),
          tr("Türkçesi 'ev sahibi' demek. Lütfen"),
          de("der Vermieter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vermieter" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Monat"),
          tr("Türkçesi 'ay' demek. Lütfen"),
          de("der Monat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Monat" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("warm"),
          tr("Türkçesi 'sıcak' demek. Lütfen"),
          de("warm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "warm" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("mieten"),
          tr("Türkçesi 'kiralamak' demek. Lütfen"),
          de("mieten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mieten" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("vermieten"),
          tr("Türkçesi 'kiraya vermek' demek. Lütfen"),
          de("vermieten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vermieten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("überweisen"),
          tr("Türkçesi 'havale etmek' demek. Lütfen"),
          de("überweisen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "überweisen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Die Miete kostet …"),
          tr("Örnek: 'Kira sekiz yüz euro.'"),
          de("Die Miete kostet achthundert Euro."),
          tr("Lütfen"),
          de("Die Miete kostet achthundert Euro"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Miete kostet achthundert Euro" },
      },
      {
        say: [tr("Sıra sende: 'Kira beş yüz euro.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Miete kostet fünfhundert Euro",
          hint: [
            tr("Kalıp aynı, sadece sayı değişiyor:"),
            de("Die Miete kostet fünfhundert Euro."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi o garip ayrım. Aidat dahil kiraya"),
          de("warm"),
          tr("denir, aidat hariç olana"),
          de("kalt"),
          tr("denir. Sıcaklıkla ilgisi yok; ısınma giderinin fiyata dahil olup olmadığını anlatıyor."),
        ],
      },
      {
        say: [
          tr("İlanda bunu şöyle sorarsın:"),
          de("Ist die Miete warm oder kalt?"),
          tr("Lütfen"),
          de("Ist die Miete warm oder kalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ist die Miete warm oder kalt" },
      },
      {
        say: [tr("Şimdi sen sor: 'Aidat dahil mi?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Sind die Nebenkosten dabei",
          hint: [
            tr("Bu kelime çoğul olduğu için fiil de çoğul biçimini alır:"),
            de("Sind die Nebenkosten dabei?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız aylık olduğunu belirtir:"),
          de("pro Monat"),
          tr("Örnek:"),
          de("Ich zahle die Miete pro Monat."),
          tr("Lütfen"),
          de("Ich zahle die Miete pro Monat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich zahle die Miete pro Monat" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Miete kostet achthundert Euro pro Monat."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Miete kostet achthundert Euro pro Monat.",
          answer: true,
          why: [
            tr("Doğru. Fiil ikinci sırada, fiyat arkasında ve aylık olduğunu belirten kalıp en sonda."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kira konuşmasını yapabilirsin. Şimdi bir daire bakıyorsun ve ev sahibiyle fiyatı konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir daireye bakmaya gittin ve ev sahibiyle konuşuyorsun. Kirayı sor, aidatın dahil olup olmadığını öğren ve fiyatı doğru anladığından emin ol.",
      partner: "işini bilen, doğrudan konuşan bir ev sahibi",
      opening: "Na, wie gefällt Ihnen die Wohnung?",
      openingTr: "Ee, daire nasıl, beğendiniz mi?",
      goal: "Kira, aidat ve toplam tutar netleşmiş; daireyi düşünüp düşünmeyeceğini söylemiş olursun.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-putzen",
    icon: "home",
    level: "A1",
    course: "de",
    title: "Wir putzen die Wohnung",
    titleTr: "Ev temizliği",
    summary: "Ev işlerini anlatmayı öğretir ve ayrılabilen fiilleri ev işlerinde çalıştırır.",
    minutes: 8,
    focusId: "Trennbare-Verben",
    vocab: [
      { de: "putzen", tr: "temizlemek" },
      { de: "aufräumen", tr: "toplamak" },
      { de: "waschen", tr: "yıkamak" },
      { de: "sauber", tr: "temiz" },
      { de: "die Maschine", tr: "makine" },
      { de: "der Kühlschrank", tr: "buzdolabı" },
      { de: "tun", tr: "yapmak" },
      { de: "holen", tr: "gidip getirmek" },
],
    patterns: [
      { de: "Ich räume … auf.", tr: "neyi topladığını söyler" },
      { de: "Ich wasche ab.", tr: "bulaşık yıkadığını söyler" },
      { de: "… ist sauber.", tr: "bir yerin temiz olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ev işlerini anlatmayı öğreneceğiz. İki fiil yine ikiye bölünüyor — bunu daha önce görmüştün, şimdi ev işlerinde çalıştıracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ev arkadaşınla ya da ailenle iş bölüşürken tam olarak bu kelimeler lazım oluyor. Önce onları öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("putzen"),
          tr("Türkçesi 'temizlemek' demek. Lütfen"),
          de("putzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "putzen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("aufräumen"),
          tr("Türkçesi 'toplamak, düzene sokmak' demek. Lütfen"),
          de("aufräumen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufräumen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("waschen"),
          tr("Türkçesi 'yıkamak' demek. Lütfen"),
          de("waschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "waschen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sauber"),
          tr("Türkçesi 'temiz' demek. Lütfen"),
          de("sauber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sauber" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Maschine"),
          tr("Türkçesi 'makine' demek. Lütfen"),
          de("die Maschine"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Maschine" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Kühlschrank"),
          tr("Türkçesi 'buzdolabı' demek. Lütfen"),
          de("der Kühlschrank"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kühlschrank" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("tun"),
          tr("Türkçesi 'yapmak' demek. Lütfen"),
          de("tun"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tun" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("holen"),
          tr("Türkçesi 'gidip getirmek' demek. Lütfen"),
          de("holen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "holen" },
      },
      {
        say: [
          tr(
            "İki fiilimiz ikiye bölünen türden: cümle kurulunca baştaki parça kalkıp en sona gidiyor. Kuralı biliyorsun, şimdi ev işlerinde kullanacağız.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız. 'Odayı topluyorum.' Almancası:"),
          de("Ich räume das Zimmer auf."),
          tr("Lütfen"),
          de("Ich räume das Zimmer auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich räume das Zimmer auf" },
      },
      {
        say: [tr("Sıra sende: 'Mutfağı topluyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich räume die Küche auf",
          hint: [
            tr("Baştaki parça yine en sona gider:"),
            de("Ich räume die Küche auf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız bulaşık için:"),
          de("Ich wasche ab."),
          tr("'Bulaşık yıkıyorum' demek; nesne söylemene gerek yok. Lütfen"),
          de("Ich wasche ab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wasche ab" },
      },
      {
        say: [
          tr("Son kalıbımız sonucu söyler:"),
          de("Die Küche ist sauber."),
          tr("'Mutfak temiz' demek. Lütfen"),
          de("Die Küche ist sauber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Küche ist sauber" },
      },
      {
        say: [tr("Şimdi sen: 'Banyo temiz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das Bad ist sauber",
          hint: [
            tr("Banyo kelimesinin artikelini hatırla:"),
            de("Das Bad ist sauber."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich aufräume das Zimmer."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich aufräume das Zimmer.",
          answer: false,
          why: [
            tr("Fiilin baştaki parçası yapışık kalmış; cümlenin sonuna gitmeli. Doğrusu"),
            de("Ich räume das Zimmer auf."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ev işlerini paylaşabilirsin. Şimdi ev arkadaşınla kimin ne yapacağını konuşacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ev arkadaşınla hafta sonu temizliğini bölüşüyorsunuz. Hangi işi üstlendiğini söyle ve ondan ne yapmasını istediğini belirt.",
      partner: "ev işlerinden pek hoşlanmayan bir ev arkadaşı",
      opening: "Also, wer räumt heute die Küche auf?",
      openingTr: "Peki, bugün mutfağı kim toplayacak?",
      goal: "Temizlik işleri paylaşılmış ve kimin ne zaman yapacağı kararlaşmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-umzug",
    icon: "key",
    level: "A1",
    course: "de",
    title: "Der Umzug",
    titleTr: "Taşınma",
    summary: "Yardım istemeyi ve taşınma gününü konuşmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-können",
    vocab: [
      { de: "der Umzug", tr: "taşınma" },
      { de: "helfen", tr: "yardım etmek" },
      { de: "packen", tr: "paketlemek" },
      { de: "schwer", tr: "ağır" },
      { de: "der Karton", tr: "koli" },
      { de: "umziehen", tr: "taşınmak" },
      { de: "das Gepäck", tr: "bagaj" },
      { de: "legen", tr: "koymak" },
],
    patterns: [
      { de: "Kannst du …?", tr: "birinden bir şey yapmasını isterken kullanılır" },
      { de: "Wir tragen …", tr: "birlikte ne taşıdığınızı söyler" },
      { de: "Vorsicht, schwer!", tr: "bir şeyin ağır olduğunu uyarır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün taşınma gününü konuşacağız. En çok işine yarayacak şey yardım istemek olacak; bunun için tek bir fiil yetiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Yardım isterken Türkçede soruyu tonla yumuşatırız. Almancada da soru kalıbı yeterince kibar; ayrıca bir şey eklemene gerek yok. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Umzug"),
          tr("Türkçesi 'taşınma' demek. Lütfen"),
          de("der Umzug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Umzug" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("helfen"),
          tr("Türkçesi 'yardım etmek' demek. Lütfen"),
          de("helfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "helfen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("packen"),
          tr("Türkçesi 'paketlemek, bavul hazırlamak' demek. Lütfen"),
          de("packen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "packen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("schwer"),
          tr("Türkçesi 'ağır' demek. Lütfen"),
          de("schwer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwer" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Karton"),
          tr("Türkçesi 'koli, karton kutu' demek. Lütfen"),
          de("der Karton"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Karton" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("umziehen"),
          tr("Türkçesi 'taşınmak' demek. Lütfen"),
          de("umziehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umziehen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Gepäck"),
          tr("Türkçesi 'bagaj' demek. Lütfen"),
          de("das Gepäck"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gepäck" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("legen"),
          tr("Türkçesi 'koymak' demek. Lütfen"),
          de("legen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "legen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Kannst du …?"),
          tr(
            "'Yapabilir misin' demek. Dikkat çekici bir şey var: bu kalıpla kullandığın asıl fiil çekilmez, olduğu gibi kalır ve cümlenin en sonuna gider.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bana yardım edebilir misin?' Almancası:"),
          de("Kannst du mir helfen?"),
          tr("Lütfen"),
          de("Kannst du mir helfen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Kannst du mir helfen" },
      },
      {
        say: [tr("Sıra sende: 'Koliyi taşıyabilir misin?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Kannst du den Karton tragen",
          hint: [
            tr("Asıl fiil çekilmeden en sona gider:"),
            de("Kannst du den Karton tragen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız birlikte iş yapmayı anlatır:"),
          de("Wir tragen das Sofa."),
          tr("'Koltuğu birlikte taşıyoruz' demek. Lütfen"),
          de("Wir tragen das Sofa"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir tragen das Sofa" },
      },
      {
        say: [tr("Şimdi sen: 'Dolabı taşıyoruz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir tragen den Schrank",
          hint: [
            tr("Dolap burada nesne olduğu için artikeli değişir:"),
            de("Wir tragen den Schrank."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız bir uyarı:"),
          de("Vorsicht, schwer!"),
          tr("'Dikkat, ağır!' demek. Taşınma gününde en çok duyacağın cümle. Lütfen"),
          de("Vorsicht, schwer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Vorsicht, schwer" },
      },
      {
        say: [
          tr("Taşınmadan önceki iş de bir cümleyle anlatılır:"),
          de("Ich packe die Kartons."),
          tr("'Kolileri hazırlıyorum' demek. Lütfen"),
          de("Ich packe die Kartons"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich packe die Kartons" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Kannst du mir beim Umzug helfen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Kannst du mir beim Umzug helfen?",
          answer: true,
          why: [
            tr("Doğru. Soruda çekimli fiil başta duruyor, asıl fiil ise çekilmeden en sona gitmiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık yardım isteyebilirsin. Şimdi taşınma günündesin ve bir arkadaşın yardıma geldi.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Taşınma günü ve bir arkadaşın yardıma geldi. Neyi nereye taşıyacağınızı söyle, ondan yardım iste ve ağır eşyalar için onu uyar.",
      partner: "yardıma koşan ama biraz aceleci bir arkadaş",
      opening: "So, ich bin da! Was soll ich zuerst tragen?",
      openingTr: "İşte geldim! Önce neyi taşıyayım?",
      goal: "Hangi eşyanın nereye taşınacağı kararlaşmış ve ağır olanlar için yardım ayarlanmış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-garten",
    icon: "flower",
    level: "A1",
    course: "de",
    title: "Auf dem Balkon",
    titleTr: "Balkon ve bahçe",
    summary: "Balkonda ve bahçede neler olduğunu anlatmayı öğretir.",
    minutes: 8,
    focusId: "Es-gibt",
    vocab: [
      { de: "der Balkon", tr: "balkon" },
      { de: "der Garten", tr: "bahçe" },
      { de: "die Blume", tr: "çiçek" },
      { de: "gießen", tr: "sulamak" },
      { de: "der Stuhl", tr: "sandalye" },
      { de: "scheinen", tr: "parlamak" },
      { de: "der Wind", tr: "rüzgar" },
      { de: "liegen", tr: "yatmak" },
],
    patterns: [
      { de: "Auf dem Balkon gibt es …", tr: "balkonda ne olduğunu söyler" },
      { de: "Ich gieße …", tr: "neyi suladığını söyler" },
      { de: "Ich sitze gern …", tr: "nerede oturmayı sevdiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün balkonu ve bahçeyi anlatmayı öğreneceğiz. 'Var' kalıbını hatırlıyorsun; bu sefer başına bir yer ekleyeceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da balkon ve bahçe küçük sohbetlerin en sevilen konusu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Balkon"),
          tr("Türkçesi 'balkon' demek. Lütfen"),
          de("der Balkon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Balkon" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Garten"),
          tr("Türkçesi 'bahçe' demek. Lütfen"),
          de("der Garten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Garten" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Blume"),
          tr("Türkçesi 'çiçek' demek. Lütfen"),
          de("die Blume"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Blume" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("gießen"),
          tr("Türkçesi 'sulamak' demek. Lütfen"),
          de("gießen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gießen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Stuhl"),
          tr("Türkçesi 'sandalye' demek. Lütfen"),
          de("der Stuhl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stuhl" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("scheinen"),
          tr("Türkçesi 'parlamak' demek. Lütfen"),
          de("scheinen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "scheinen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Wind"),
          tr("Türkçesi 'rüzgar' demek. Lütfen"),
          de("der Wind"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Wind" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("liegen"),
          tr("Türkçesi 'yatmak' demek. Lütfen"),
          de("liegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "liegen" },
      },
      {
        say: [
          tr(
            "İlk kalıbımızda 'var' kalıbının başına yeri koyuyoruz. Yer başa gelince fiil hemen arkasından geliyor — bu kuralı artık biliyorsun.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Balkonda iki sandalye var.' Almancası:"),
          de("Auf dem Balkon gibt es zwei Stühle."),
          tr("Lütfen"),
          de("Auf dem Balkon gibt es zwei Stühle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Auf dem Balkon gibt es zwei Stühle" },
      },
      {
        say: [tr("Sıra sende: 'Bahçede çiçekler var.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Im Garten gibt es Blumen",
          hint: [
            tr("Bahçe için yer bildiren biçim kısalır ve tek kelimeye iner:"),
            de("Im Garten gibt es Blumen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich gieße die Blumen."),
          tr("'Çiçekleri suluyorum' demek. Lütfen"),
          de("Ich gieße die Blumen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich gieße die Blumen" },
      },
      {
        say: [
          tr("Son kalıbımız tercihini söyler:"),
          de("Ich sitze gern auf dem Balkon."),
          tr("'Balkonda oturmayı seviyorum' demek. Lütfen"),
          de("Ich sitze gern auf dem Balkon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich sitze gern auf dem Balkon" },
      },
      {
        say: [tr("Şimdi sen: 'Bahçede oturmayı seviyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich sitze gern im Garten",
          hint: [
            tr("Bahçe için yer bildiren biçim yine kısalıyor:"),
            de("Ich sitze gern im Garten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Auf dem Balkon gibt es zwei Stuhl."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Auf dem Balkon gibt es zwei Stuhl.",
          answer: false,
          why: [
            tr("Birden fazlaysa kelime çoğul olmalı ve bu kelimenin çoğulunda ortadaki ses de değişir. Doğrusu"),
            de("Auf dem Balkon gibt es zwei Stühle."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık balkonunu ve bahçeni anlatabilirsin. Şimdi komşunla balkonda küçük bir sohbet edeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Komşun balkonda seni görüp sohbete başlıyor. Balkonunda neler olduğunu anlat, çiçeklerinden söz et ve orada oturmayı sevip sevmediğini söyle.",
      partner: "çiçek yetiştirmeye meraklı bir komşu",
      opening: "Ihre Blumen sehen richtig schön aus! Gießen Sie die jeden Tag?",
      openingTr: "Çiçekleriniz gerçekten güzel görünüyor! Her gün mü suluyorsunuz?",
      goal: "Balkonundaki her şey anlatılmış ve komşunla bir kahve sözü verilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-kaputt",
    icon: "repair",
    level: "A1",
    course: "de",
    title: "Die Lampe ist kaputt",
    titleTr: "Arıza bildirme",
    summary: "Evde bozulan bir şeyi bildirmeyi ve tamir için yardım istemeyi öğretir.",
    minutes: 9,
    focusId: "Sein-Haben",
    vocab: [
      { de: "kaputt", tr: "bozuk" },
      { de: "funktionieren", tr: "çalışmak" },
      { de: "die Lampe", tr: "lamba" },
      { de: "das Licht", tr: "ışık" },
      { de: "der Hausmeister", tr: "apartman görevlisi" },
      { de: "reparieren", tr: "tamir etmek" },
      { de: "die Reparatur", tr: "tamir" },
      { de: "das Feuer", tr: "ateş" },
],
    patterns: [
      { de: "… ist kaputt.", tr: "bir şeyin bozuk olduğunu söyler" },
      { de: "… funktioniert nicht.", tr: "bir şeyin çalışmadığını söyler" },
      { de: "Können Sie kommen?", tr: "birinden gelmesini rica eder" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün evde bir şey bozulduğunda ne diyeceğini öğreneceğiz. İki farklı anlatım var ve ikisi de çok kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir arızayı bildirmek kirayla ilgili haklarının bir parçası; net söylemek işini kolaylaştırıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("kaputt"),
          tr("Türkçesi 'bozuk' demek. Lütfen"),
          de("kaputt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kaputt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("funktionieren"),
          tr("Türkçesi 'çalışmak, işlemek' demek — makineler için. Lütfen"),
          de("funktionieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "funktionieren" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Lampe"),
          tr("Türkçesi 'lamba' demek. Lütfen"),
          de("die Lampe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lampe" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Licht"),
          tr("Türkçesi 'ışık' demek. Lütfen"),
          de("das Licht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Licht" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Hausmeister"),
          tr("Türkçesi 'apartman görevlisi' demek — binanın tamir işlerine bakan kişi. Lütfen"),
          de("der Hausmeister"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hausmeister" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("reparieren"),
          tr("Türkçesi 'tamir etmek' demek. Lütfen"),
          de("reparieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "reparieren" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Reparatur"),
          tr("Türkçesi 'tamir' demek. Lütfen"),
          de("die Reparatur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Reparatur" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Feuer"),
          tr("Türkçesi 'ateş' demek. Lütfen"),
          de("das Feuer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Feuer" },
      },
      {
        say: [
          tr(
            "İlk kalıbımız en kısa yol: eşyanın adını söylüyorsun, sonra bozuk olduğunu. Türkçedeki 'lamba bozuk' ile birebir aynı sıra.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Lamba bozuk.' Almancası:"),
          de("Die Lampe ist kaputt."),
          tr("Lütfen"),
          de("Die Lampe ist kaputt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Lampe ist kaputt" },
      },
      {
        say: [tr("Sıra sende: 'Elektrikli süpürge bozuk.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Der Staubsauger ist kaputt",
          hint: [
            tr("Önce eşyanın adı, sonra fiil, sonra bozuk kelimesi:"),
            de("Der Staubsauger ist kaputt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız aynı şeyi başka türlü söyler:"),
          de("Das Licht funktioniert nicht."),
          tr("'Işık çalışmıyor' demek. Lütfen"),
          de("Das Licht funktioniert nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Licht funktioniert nicht" },
      },
      {
        say: [tr("Şimdi sen: 'Lamba çalışmıyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Lampe funktioniert nicht",
          hint: [
            tr("Olumsuzluk kelimesi fiilden sonra, cümlenin sonuna gelir:"),
            de("Die Lampe funktioniert nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız yardım çağırır:"),
          de("Können Sie kommen?"),
          tr("'Gelebilir misiniz?' demek ve resmî konuşurken kullanılır. Lütfen"),
          de("Können Sie kommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können Sie kommen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Licht nicht funktioniert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Licht nicht funktioniert.",
          answer: false,
          why: [
            tr(
              "Yanlış. Fiil ikinci sırada durmalı, olumsuzluk kelimesi cümlenin sonuna gitmeli. Doğrusu:",
            ),
            de("Das Licht funktioniert nicht."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir arızayı bildirebilirsin. Şimdi apartman görevlisini arayacaksın: evde bir şey bozuldu.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Evde bir şey bozuldu ve apartman görevlisini aradın. Neyin bozuk olduğunu söyle, ne zamandır böyle olduğunu anlat ve gelmesini rica et.",
      partner: "işi başından aşkın ama çözüm bulan bir apartman görevlisi",
      opening: "Hausmeister Berger, guten Tag. Was kann ich für Sie tun?",
      openingTr: "Apartman görevlisi Berger, iyi günler. Sizin için ne yapabilirim?",
      goal: "Arıza anlatılmış ve görevlinin ne zaman geleceği kararlaşmış olur.",
      minTurns: 6,
    },
  },
];

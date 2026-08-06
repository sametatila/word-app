import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 6 — Şehirde (konular 051-060).
 *
 * Modülün iki dilbilgisi hattı var ve ikisi de yol üstünde öğreniliyor:
 * kibar emir (Sie-emri, çünkü tarifi hep karşındaki verir) ve araç bildiren
 * edat (mit + Dativ, çünkü şehirde her cümle bir araçla kuruluyor). İkisi de
 * Türkçeyle karşıtlık üzerinden anlatılıyor: Türkçede emir eki fiile yapışır
 * ve "otobüsle" tek bir ekle söylenir; Almancada emirde fiil öne fırlar,
 * araçta ise ismin önündeki küçük kelime cinse göre değişir.
 *
 * Sahneler bilinçli olarak bir yolculuk gibi diziliyor: yol soruluyor, araca
 * biniliyor, bilet alınıyor, tren gecikiyor, taksiye biniliyor, sonra şehir
 * geziliyor ve en sonunda danışmaya dönülüyor. Bir dersin sahnesi bir
 * sonrakinin başlangıcı olduğu için kelimeler kendiliğinden tekrar ediyor.
 */
export const deA1B06: Lesson[] = [
  {
    id: "de-a1-weg",
    icon: "city",
    level: "A1",
    course: "de",
    title: "Wo ist der Bahnhof?",
    titleTr: "Yol sorma",
    summary: "Kibarca yol sormayı ve verilen tarifi anlamayı öğretir.",
    minutes: 8,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "der Bahnhof", tr: "tren garı" },
      { de: "der Weg", tr: "yol" },
      { de: "geradeaus", tr: "dosdoğru" },
      { de: "links", tr: "sol" },
      { de: "rechts", tr: "sağ" },
    ],
    patterns: [
      { de: "Entschuldigung, wo ist …?", tr: "kibarca yol sorarken kullanılır" },
      { de: "Gehen Sie geradeaus.", tr: "tarif verirken kullanılır" },
      { de: "Der Bahnhof ist rechts.", tr: "bir yerin hangi tarafta olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Yeni bir şehirde en çok işine yarayacak beceri yol sormak. Bugün kibarca yol sormayı ve sana verilen tarifi anlamayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da yol sorarken cümlenin başına bir özür kelimesi konur; o olmadan sorunca kaba duruyor. Tarif de üç kelimeyle veriliyor: dosdoğru, sol, sağ. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Bahnhof"),
          tr("Türkçesi 'tren garı' demek. Lütfen"),
          de("der Bahnhof"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bahnhof" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Weg"),
          tr("Türkçesi 'yol' demek. Lütfen"),
          de("der Weg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Weg" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("geradeaus"),
          tr("Türkçesi 'dosdoğru' demek. Lütfen"),
          de("geradeaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "geradeaus" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("links"),
          tr("Türkçesi 'sol' demek. Lütfen"),
          de("links"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "links" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("rechts"),
          tr("Türkçesi 'sağ' demek. Lütfen"),
          de("rechts"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rechts" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Entschuldigung, wo ist der Bahnhof?"),
          tr(
            "Yani 'Affedersiniz, tren garı nerede?' Baştaki özür kelimesini atlamak Almanya'da fark ediliyor; birine seslenirken hep onunla başla.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Entschuldigung, wo ist der Bahnhof"), tr("deyin.")],
        expect: { kind: "repeat", target: "Entschuldigung, wo ist der Bahnhof" },
      },
      {
        say: [tr("Sıra sende: 'Affedersiniz, market nerede?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Entschuldigung, wo ist der Supermarkt",
          hint: [
            tr("Önce özür kelimesi, sonra soru:"),
            de("Entschuldigung, wo ist der Supermarkt?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi cevabı anlama sırası. Tarif verirken Almanca ilginç bir şey yapıyor:"),
          de("Gehen Sie geradeaus."),
          tr(
            "Yani 'Dosdoğru gidin'. Türkçede emir ekini fiile yapıştırırız, 'gidin' deriz ve kime söylediğimiz ekten bellidir. Almancada ise fiil cümlenin başına fırlar ve hemen arkasına 'siz' konur. Kişi söylenmeden emir olmuyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Gehen Sie geradeaus"), tr("deyin.")],
        expect: { kind: "repeat", target: "Gehen Sie geradeaus" },
      },
      {
        say: [tr("Şimdi sen tarif ver: 'Sola gidin.'")],
        expect: {
          kind: "produce",
          target: "Gehen Sie links",
          hint: [
            tr("Fiil başa gelir, hemen arkasına 'siz':"),
            de("Gehen Sie links."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Tarifin sonunda hedefin hangi tarafta olduğu söylenir:"),
          de("Der Bahnhof ist rechts."),
          tr("Sevindirici bir ekleme de duyabilirsin:"),
          de("Der Weg ist nicht weit."),
          tr("Lütfen"),
          de("Der Bahnhof ist rechts"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Bahnhof ist rechts" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Gehen geradeaus."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Gehen geradeaus.",
          answer: false,
          why: [
            tr("Almancada emirde kişi düşmez; fiilin hemen arkasına 'siz' gelmeli. Doğrusu:"),
            de("Gehen Sie geradeaus."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık yol sorabilir ve gelen tarifi anlayabilirsin. Şimdi bir sokaktasın ve garı bulman gerekiyor: yoldan geçen birine sor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yabancı bir şehirde sokaktasın ve tren garını arıyorsun. Yoldan geçen birine kibarca sor, tarifi dinle ve anlamadığın yeri bir daha sor.",
      partner: "acelesi olmayan, tarif vermeyi seven yaşlı bir adam",
      opening: "Sie sehen verloren aus. Kann ich Ihnen helfen?",
      openingTr: "Kaybolmuş gibisiniz. Yardım edebilir miyim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-bus-bahn",
    icon: "transport",
    level: "A1",
    course: "de",
    title: "Mit dem Bus oder mit der Bahn?",
    titleTr: "Toplu taşıma",
    summary: "Hangi araçla gittiğini söylemeyi ve durak sormayı öğretir.",
    minutes: 8,
    focusId: "Präposition-mit",
    vocab: [
      { de: "der Bus", tr: "otobüs" },
      { de: "die U-Bahn", tr: "metro" },
      { de: "die Haltestelle", tr: "durak" },
      { de: "fahren", tr: "gitmek" },
      { de: "die Linie", tr: "hat" },
    ],
    patterns: [
      { de: "Ich fahre mit dem Bus.", tr: "hangi araçla gittiğini söylerken kullanılır" },
      { de: "Wo ist die Haltestelle?", tr: "durağın yerini sorarken kullanılır" },
      { de: "Welche Linie fährt zum Bahnhof?", tr: "hangi hattın gerektiğini sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Şehir içinde yürümek her zaman yetmez. Bugün hangi araçla gittiğini söylemeyi, durağı sormayı ve doğru hattı bulmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da toplu taşıma dakikası dakikasına işler, o yüzden herkes hangi araçla gittiğini net söyler. Bunun için tek bir küçük kelime var ve o kelime bu dersin kalbi. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Bus"),
          tr("Türkçesi 'otobüs' demek. Lütfen"),
          de("der Bus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bus" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die U-Bahn"),
          tr("Türkçesi 'metro' demek. Lütfen"),
          de("die U-Bahn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die U-Bahn" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Haltestelle"),
          tr("Türkçesi 'durak' demek. Lütfen"),
          de("die Haltestelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Haltestelle" },
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
          de("die Linie"),
          tr("Türkçesi 'hat' demek. Lütfen"),
          de("die Linie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Linie" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich fahre mit dem Bus."),
          tr(
            "Yani 'Otobüsle gidiyorum'. Türkçede araca tek bir ek getiriyoruz: otobüsle, metroyla, taksiyle. Almancada isim hiç değişmiyor; onun yerine önündeki küçük kelime araçla gitmeyi anlatan edattan sonra değişiyor. Eril ve nötr araçlarda",
          ),
          de("mit dem"),
          tr("dişil araçlarda"),
          de("mit der"),
          tr("deniyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich fahre mit dem Bus"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich fahre mit dem Bus" },
      },
      {
        say: [
          tr("Sıra sende: 'Metroyla gidiyorum.' nasıl dersin?"),
          de("die U-Bahn"),
          tr("dişil bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Ich fahre mit der U-Bahn",
          hint: [
            de("die U-Bahn"),
            tr("dişil olduğu için edattan sonraki kelime değişir:"),
            de("Ich fahre mit der U-Bahn."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Araca binmek için önce durağı bulmak lazım:"),
          de("Wo ist die Haltestelle?"),
          tr("Cevap çoğu zaman geçen dersteki gibi gelir:"),
          de("Die Haltestelle ist links."),
          tr("Lütfen"),
          de("Wo ist die Haltestelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo ist die Haltestelle" },
      },
      {
        say: [
          tr("Durakta bir soru daha soracaksın:"),
          de("Welche Linie fährt zum Bahnhof?"),
          tr("Yani 'Hangi hat gara gidiyor?' Cevap kısa olur:"),
          de("Die Linie drei."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Welche Linie fährt zum Bahnhof"), tr("deyin.")],
        expect: { kind: "repeat", target: "Welche Linie fährt zum Bahnhof" },
      },
      {
        say: [tr("Şimdi sen sor: 'Hangi hat markete gidiyor?'")],
        expect: {
          kind: "produce",
          target: "Welche Linie fährt zum Supermarkt",
          hint: [
            tr("Soru aynı kalıyor, yalnızca gidilecek yer değişiyor:"),
            de("Welche Linie fährt zum Supermarkt?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich fahre mit die U-Bahn."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich fahre mit die U-Bahn.",
          answer: false,
          why: [
            tr("Araç bildiren edattan sonra dişil kelimeler biçim değiştirir. Doğrusu:"),
            de("Ich fahre mit der U-Bahn."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hangi araçla gittiğini söyleyebilir, durağı ve hattı sorabilirsin. Şimdi duraktasın ve yanındaki kişiye doğru otobüsü soruyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir otobüs durağındasın ve gara gitmek istiyorsun. Yanındaki kişiye hangi hattın gittiğini sor, kaç durak olduğunu öğren ve nasıl gideceğini anlat.",
      partner: "her gün aynı hattı kullanan, yardımsever bir yolcu",
      opening: "Warten Sie auch auf die Linie drei?",
      openingTr: "Siz de üç numaralı hattı mı bekliyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-ticket",
    icon: "ticket",
    level: "A1",
    course: "de",
    title: "Eine Fahrkarte, bitte",
    titleTr: "Bilet almak",
    summary: "Gişede bilet almayı, gidiş dönüş sormayı ve peronu öğrenmeyi öğretir.",
    minutes: 8,
    focusId: "Modalverb-möchten",
    vocab: [
      { de: "die Fahrkarte", tr: "bilet" },
      { de: "der Automat", tr: "otomat" },
      { de: "einfach", tr: "tek yön" },
      { de: "hin und zurück", tr: "gidiş dönüş" },
      { de: "das Gleis", tr: "peron" },
    ],
    patterns: [
      { de: "Einmal nach … bitte.", tr: "gişede kısa bilet isterken kullanılır" },
      { de: "Ich möchte eine Fahrkarte nach …", tr: "bileti tam cümleyle isterken kullanılır" },
      { de: "Von welchem Gleis fährt der Zug?", tr: "peronu sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Gara geldin, şimdi bilet lazım. Bugün gişede bilet almayı, gidiş mi gidiş dönüş mü olduğunu söylemeyi ve peronu öğrenmeyi çalışacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Gişedeki konuşma çok kısadır: iki kelimeyle bilet alınır. Uzun cümle kurmak zorunda değilsin ama ikisini de göstereceğim. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Fahrkarte"),
          tr("Türkçesi 'bilet' demek. Lütfen"),
          de("die Fahrkarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Fahrkarte" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Automat"),
          tr("Türkçesi 'otomat' demek. Lütfen"),
          de("der Automat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Automat" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("einfach"),
          tr("Bilet alırken 'tek yön' demek. Lütfen"),
          de("einfach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einfach" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("hin und zurück"),
          tr("Türkçesi 'gidiş dönüş' demek. Lütfen"),
          de("hin und zurück"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hin und zurück" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Gleis"),
          tr("Türkçesi 'peron' demek. Lütfen"),
          de("das Gleis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gleis" },
      },
      {
        say: [
          tr("Gişedeki en kısa yol şu:"),
          de("Einmal nach Berlin, bitte."),
          tr(
            "Yani 'Berlin'e bir tane, lütfen'. Cümlede ne fiil var ne özne; gişede kimse bunu tuhaf bulmuyor, herkes böyle söylüyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Einmal nach Berlin, bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Einmal nach Berlin, bitte" },
      },
      {
        say: [tr("Sıra sende: 'Köln'e bir tane, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Einmal nach Köln, bitte",
          hint: [
            tr("Kalıp aynı, yalnızca şehir değişiyor:"),
            de("Einmal nach Köln, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Tam cümle kurmak istersen kafeden tanıdığın kalıp burada da çalışır:"),
          de("Ich möchte eine Fahrkarte nach Berlin."),
          tr("Görevlinin sana soracağı tek bir şey var:"),
          de("Einfach oder hin und zurück?"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte eine Fahrkarte nach Berlin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte eine Fahrkarte nach Berlin" },
      },
      {
        say: [tr("Şimdi cevabı sen ver: 'Gidiş dönüş, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Hin und zurück, bitte",
          hint: [
            tr("İki kelime yeter, sonuna nezaket kelimesini ekle:"),
            de("Hin und zurück, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bileti aldın, geriye tek bir şey kaldı:"),
          de("Von welchem Gleis fährt der Zug?"),
          tr("Yani 'Tren hangi perondan kalkıyor?' Lütfen"),
          de("Von welchem Gleis fährt der Zug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Von welchem Gleis fährt der Zug" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Einmal nach Hamburg, bitte."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Einmal nach Hamburg, bitte.",
          answer: true,
          why: [
            tr("Doğru. Gişede fiilsiz bu kısa kalıp yeterlidir:"),
            de("Einmal nach Hamburg, bitte."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bilet alabiliyor, gidiş dönüş söyleyebiliyor ve peronu sorabiliyorsun. Şimdi gişedesin ve sıra sana geldi.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Tren garının bilet gişesindesin ve bugün Berlin'e gitmek istiyorsun. Bileti iste, gidiş dönüş olup olmadığını söyle, fiyatı öğren ve peronu sor.",
      partner: "hızlı konuşan ama kibar bir gişe görevlisi",
      opening: "Der Nächste, bitte! Wohin möchten Sie fahren?",
      openingTr: "Sıradaki, lütfen! Nereye gitmek istiyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-verspaetung",
    icon: "train",
    level: "A1",
    course: "de",
    title: "Der Zug hat Verspätung",
    titleTr: "Rötar",
    summary: "Gecikmeyi anlamayı, ne kadar süreceğini sormayı ve beklemeyi anlatmayı öğretir.",
    minutes: 9,
    focusId: "Sein-Haben",
    vocab: [
      { de: "der Zug", tr: "tren" },
      { de: "die Verspätung", tr: "gecikme" },
      { de: "warten", tr: "beklemek" },
      { de: "pünktlich", tr: "dakik" },
      { de: "die Abfahrt", tr: "kalkış" },
    ],
    patterns: [
      { de: "Der Zug hat Verspätung.", tr: "trenin geciktiğini söylerken kullanılır" },
      { de: "Wann kommt der Zug?", tr: "trenin ne zaman geleceğini sorarken kullanılır" },
      { de: "Ich warte zehn Minuten.", tr: "ne kadar beklediğini söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Perondasın ve tren yok. Bugün gecikmeyi anlatmayı, ne zaman geleceğini sormayı ve beklemeyi söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da trenlerin dakikliği meşhurdur ama gecikince de herkes aynı iki kelimeyi kullanır. Bu derste asıl mesele küçük bir fiil seçimi. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Zug"),
          tr("Türkçesi 'tren' demek. Lütfen"),
          de("der Zug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zug" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Verspätung"),
          tr("Türkçesi 'gecikme' demek. Lütfen"),
          de("die Verspätung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Verspätung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("warten"),
          tr("Türkçesi 'beklemek' demek. Lütfen"),
          de("warten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "warten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("pünktlich"),
          tr("Türkçesi 'dakik, tam vaktinde' demek. Lütfen"),
          de("pünktlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "pünktlich" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Abfahrt"),
          tr("Türkçesi 'kalkış' demek. Lütfen"),
          de("die Abfahrt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Abfahrt" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Der Zug hat Verspätung."),
          tr(
            "Türkçede 'tren gecikmeli' deriz, yani bir sıfat kullanırız. Almancada ise gecikme trenin sahip olduğu bir şeydir: 'trenin gecikmesi var' gibi. Bu yüzden burada 'olmak' değil 'sahip olmak' fiili kullanılır. Sık yapılan hata da tam burada.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Zug hat Verspätung"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Zug hat Verspätung" },
      },
      {
        say: [tr("Sıra sende: 'Tren on dakika gecikmeli.'")],
        expect: {
          kind: "produce",
          target: "Der Zug hat zehn Minuten Verspätung",
          hint: [
            tr("Süre, sahip olunan şeyin önüne girer:"),
            de("Der Zug hat zehn Minuten Verspätung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi de merak ettiğin şeyi sor:"),
          de("Wann kommt der Zug?"),
          tr("Yani 'Tren ne zaman geliyor?' Cevabı anonstan duyacaksın:"),
          de("Die Abfahrt ist um zehn Uhr."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wann kommt der Zug"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wann kommt der Zug" },
      },
      {
        say: [tr("Şimdi ne kadar beklediğini söyle: 'On dakika bekliyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich warte zehn Minuten",
          hint: [
            tr("Önce sen, sonra fiil, en sonda süre:"),
            de("Ich warte zehn Minuten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İşler yolundaysa duyacağın cümle de şu:"),
          de("Der Zug ist pünktlich."),
          tr("Burada gerçekten bir özellik anlatıldığı için 'olmak' fiili doğru. Lütfen"),
          de("Der Zug ist pünktlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Der Zug ist pünktlich" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Zug ist Verspätung."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Zug ist Verspätung.",
          answer: false,
          why: [
            tr("Gecikme bir özellik değil, trenin sahip olduğu bir şeydir. Doğrusu:"),
            de("Der Zug hat Verspätung."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gecikmeyi anlatabilir, ne zaman geleceğini sorabilir ve beklediğini söyleyebilirsin. Şimdi perondasın ve yanındaki yolcu da aynı treni bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Peronda bekliyorsun ve tren hâlâ gelmedi. Yanındaki yolcuya durumu sor, ne kadar gecikme olduğunu konuş ve ne yapacağını anlat.",
      partner: "gecikmelere alışmış, hafif alaycı bir yolcu",
      opening: "Schon wieder zehn Minuten später. Warten Sie auch auf den Zug nach Köln?",
      openingTr: "Yine on dakika gecikme. Siz de Köln trenini mi bekliyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-taxi",
    icon: "car",
    level: "A1",
    course: "de",
    title: "Mit dem Taxi",
    titleTr: "Takside",
    summary: "Taksiciye adresi söylemeyi, süreyi sormayı ve ödeme sırasında konuşmayı öğretir.",
    minutes: 8,
    focusId: "Präposition-mit",
    vocab: [
      { de: "das Taxi", tr: "taksi" },
      { de: "der Fahrer", tr: "şoför" },
      { de: "der Flughafen", tr: "havalimanı" },
      { de: "halten", tr: "durmak" },
      { de: "das Trinkgeld", tr: "bahşiş" },
    ],
    patterns: [
      { de: "Zum Flughafen, bitte.", tr: "taksiciye nereye gideceğini söylerken kullanılır" },
      { de: "Wie lange dauert es?", tr: "yolculuğun süresini sorarken kullanılır" },
      { de: "Stimmt so.", tr: "üstü kalsın derken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bazen otobüs beklemeye vakit yoktur. Bugün taksiciye nereye gideceğini söylemeyi, süreyi sormayı ve ödeme sırasındaki o kısa cümleyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Takside konuşma iki cümleden ibarettir: nereye ve ne kadar sürer. Bir de inerken söylenen üç kelimelik bir kalıp var. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Taxi"),
          tr("Türkçesi 'taksi' demek. Lütfen"),
          de("das Taxi"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Taxi" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Fahrer"),
          tr("Türkçesi 'şoför' demek. Lütfen"),
          de("der Fahrer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fahrer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Flughafen"),
          tr("Türkçesi 'havalimanı' demek. Lütfen"),
          de("der Flughafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flughafen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("halten"),
          tr("Türkçesi 'durmak' demek. Lütfen"),
          de("halten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "halten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Trinkgeld"),
          tr("Türkçesi 'bahşiş' demek. Lütfen"),
          de("das Trinkgeld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Trinkgeld" },
      },
      {
        say: [
          tr("Taksiye biner binmez söyleyeceğin cümle:"),
          de("Zum Flughafen, bitte."),
          tr(
            "Yani 'Havalimanına, lütfen'. Türkçede yönü ismin sonundaki küçük ekle veririz: havalimanına. Almancada ismin önüne bir yön kelimesi gelir ve o kelime, isim eril ya da nötrse",
          ),
          de("zum"),
          tr("dişilse"),
          de("zur"),
          tr("biçimini alır."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Zum Flughafen, bitte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Zum Flughafen, bitte" },
      },
      {
        say: [tr("Sıra sende: 'Gara, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Zum Bahnhof, bitte",
          hint: [
            de("der Bahnhof"),
            tr("eril olduğu için yön kelimesi kaynaşmış hâliyle kullanılır:"),
            de("Zum Bahnhof, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yola çıktınız. Merak ettiğin şeyi sorabilirsin:"),
          de("Wie lange dauert es?"),
          tr("Cevap kısa gelir:"),
          de("Ungefähr zwanzig Minuten."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wie lange dauert es"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wie lange dauert es" },
      },
      {
        say: [tr("Şimdi şoföre nerede duracağını söyle: 'Burada durun, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Halten Sie hier, bitte",
          hint: [
            tr("Kibar emirde fiil başa gelir, arkasına 'siz':"),
            de("Halten Sie hier, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ödeme sırasında bahşiş vermek istiyorsan tek bir kalıp yeter:"),
          de("Stimmt so."),
          tr("Yani 'Üstü kalsın'. Lütfen"),
          de("Stimmt so"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Stimmt so" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zur Flughafen, bitte."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zur Flughafen, bitte.",
          answer: false,
          why: [
            de("der Flughafen"),
            tr("eril; bu biçim dişil kelimeler içindir. Doğrusu:"),
            de("Zum Flughafen, bitte."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık taksiye binip nereye gideceğini söyleyebilir, süreyi sorabilir ve ödeyebilirsin. Şimdi taksinin arka koltuğundasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir taksiye bindin ve havalimanına gitmen gerekiyor. Nereye gideceğini söyle, ne kadar süreceğini sor, yolda kısa bir sohbet et ve inerken ödemeyi konuş.",
      partner: "sohbeti seven, şehri avucunun içi gibi bilen bir taksi şoförü",
      opening: "Guten Abend! Wohin darf ich Sie fahren?",
      openingTr: "İyi akşamlar! Sizi nereye götüreyim?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-stadtplan",
    icon: "city",
    level: "A1",
    course: "de",
    title: "Ist das weit?",
    titleTr: "Mesafe ve konum",
    summary: "Bir yerin uzak olup olmadığını sormayı ve konumu tarif etmeyi öğretir.",
    minutes: 8,
    focusId: "W-Fragen",
    vocab: [
      { de: "der Stadtplan", tr: "şehir haritası" },
      { de: "die Brücke", tr: "köprü" },
      { de: "die Nähe", tr: "yakın" },
      { de: "zu Fuß", tr: "yürüyerek" },
      { de: "gegenüber", tr: "karşısında" },
    ],
    patterns: [
      { de: "Ist das weit?", tr: "bir yerin uzak olup olmadığını sorarken kullanılır" },
      { de: "Das ist fünf Minuten zu Fuß.", tr: "mesafeyi dakikayla söylerken kullanılır" },
      { de: "Das Museum ist in der Nähe.", tr: "bir yerin yakında olduğunu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Tarifi aldın ama bir soru kaldı: yürüyecek misin, yoksa araç mı lazım? Bugün mesafe sormayı ve bir yerin nerede olduğunu tarif etmeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da mesafe kilometreyle değil, dakikayla söylenir: kaç dakika yürüyorsun, o kadar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Stadtplan"),
          tr("Türkçesi 'şehir haritası' demek. Lütfen"),
          de("der Stadtplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stadtplan" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Brücke"),
          tr("Türkçesi 'köprü' demek. Lütfen"),
          de("die Brücke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Brücke" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Nähe"),
          tr("Türkçesi 'yakın' demek. Lütfen"),
          de("die Nähe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nähe" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("zu Fuß"),
          tr("Türkçesi 'yürüyerek' demek. Lütfen"),
          de("zu Fuß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zu Fuß" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gegenüber"),
          tr("Türkçesi 'karşısında' demek. Lütfen"),
          de("gegenüber"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gegenüber" },
      },
      {
        say: [
          tr("İlk kalıbımız üç kelimelik bir soru:"),
          de("Ist das weit?"),
          tr(
            "Yani 'Uzak mı?' Türkçede soruyu sona eklediğimiz bir ekle kurarız; Almancada soru eki yok, onun yerine fiil cümlenin başına geçiyor. Fiil başa geçtiyse o cümle bir sorudur.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ist das weit"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ist das weit" },
      },
      {
        say: [
          tr("Cevap neredeyse hep dakikayla gelir:"),
          de("Das ist fünf Minuten zu Fuß."),
          tr("Lütfen"),
          de("Das ist fünf Minuten zu Fuß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist fünf Minuten zu Fuß" },
      },
      {
        say: [tr("Sıra sende: 'Yürüyerek on dakika.'")],
        expect: {
          kind: "produce",
          target: "Das ist zehn Minuten zu Fuß",
          hint: [
            tr("Süre ortada, yürümek en sonda kalır:"),
            de("Das ist zehn Minuten zu Fuß."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yakın olduğunu söylemek için de hazır bir kalıp var:"),
          de("Das Museum ist in der Nähe."),
          tr("Konumu daha da netleştirmek istersen:"),
          de("Es ist bei der Brücke."),
          tr("ya da"),
          de("Es ist gegenüber."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das Museum ist in der Nähe"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das Museum ist in der Nähe" },
      },
      {
        say: [tr("Şimdi sen tarif et: 'Market karşıda.'")],
        expect: {
          kind: "produce",
          target: "Der Supermarkt ist gegenüber",
          hint: [
            tr("Önce yer, sonra fiil, en sonda konum:"),
            de("Der Supermarkt ist gegenüber."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Bahnhof ist in der Nähe."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Bahnhof ist in der Nähe.",
          answer: true,
          why: [
            tr("Doğru. Bir yerin yakında olduğu Almancada tam olarak böyle söylenir:"),
            de("Der Bahnhof ist in der Nähe."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık uzak mı diye sorabilir ve bir yerin nerede olduğunu tarif edebilirsin. Şimdi elinde bir şehir haritası var ve otelin resepsiyonundasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Otelin resepsiyonundasın ve elinde şehir haritası var. Gitmek istediğin yeri söyle, uzak olup olmadığını sor, yürüyerek kaç dakika sürdüğünü öğren ve konumu tarif ettir.",
      partner: "haritayı kalemle işaretlemeyi seven bir resepsiyon görevlisi",
      opening: "Guten Morgen! Wohin möchten Sie heute gehen?",
      openingTr: "Günaydın! Bugün nereye gitmek istiyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-sehenswuerdig",
    icon: "map",
    level: "A1",
    course: "de",
    title: "Was kann man hier sehen?",
    titleTr: "Gezilecek yerler",
    summary: "Şehirde ne görülebileceğini sormayı ve öneri yapmayı öğretir.",
    minutes: 9,
    focusId: "Modalverb-können",
    vocab: [
      { de: "das Museum", tr: "müze" },
      { de: "die Kirche", tr: "kilise" },
      { de: "der Turm", tr: "kule" },
      { de: "die Altstadt", tr: "eski şehir" },
      { de: "empfehlen", tr: "tavsiye etmek" },
    ],
    patterns: [
      { de: "Was kann man hier sehen?", tr: "gezilecek yerleri sorarken kullanılır" },
      { de: "Man kann die Altstadt sehen.", tr: "ne yapılabileceğini söylerken kullanılır" },
      { de: "Ich empfehle die Kirche.", tr: "bir yeri tavsiye ederken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir günün var ve şehri gezeceksin. Bugün nerelerin görülebileceğini sormayı ve kendi tavsiyeni vermeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste küçük ama çok kullanışlı bir kelime var: herkesi birden anlatan bir özne. Türkçede o özneyi hiç söylemeyiz, Almancada söylemek zorundayız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Museum"),
          tr("Türkçesi 'müze' demek. Lütfen"),
          de("das Museum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Museum" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kirche"),
          tr("Türkçesi 'kilise' demek. Lütfen"),
          de("die Kirche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kirche" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Turm"),
          tr("Türkçesi 'kule' demek. Lütfen"),
          de("der Turm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Turm" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Altstadt"),
          tr("Türkçesi 'eski şehir' demek. Lütfen"),
          de("die Altstadt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Altstadt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("empfehlen"),
          tr("Türkçesi 'tavsiye etmek' demek. Lütfen"),
          de("empfehlen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "empfehlen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Was kann man hier sehen?"),
          tr(
            "Yani 'Burada ne görülebilir?' Türkçede belirsiz bir özneden söz ederken özneyi hiç söylemeyiz: 'ne gezilir', 'ne yenir' deriz. Almancada özne boş kalamaz, o yüzden herkesi birden anlatan küçük bir kelime konur. Görülecek şey söylenir, sonra fiil en sona gider.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was kann man hier sehen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was kann man hier sehen" },
      },
      {
        say: [
          tr("Cevap da aynı kelimeyle kurulur:"),
          de("Man kann die Altstadt sehen."),
          tr("Yani 'Eski şehir gezilebilir'. Lütfen"),
          de("Man kann die Altstadt sehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Man kann die Altstadt sehen" },
      },
      {
        say: [tr("Sıra sende: 'Müze gezilebilir.'")],
        expect: {
          kind: "produce",
          target: "Man kann das Museum sehen",
          hint: [
            tr("Özne söylenir, asıl fiil en sonda kalır:"),
            de("Man kann das Museum sehen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kendi tavsiyeni vermek istersen ikinci kalıp devreye giriyor:"),
          de("Ich empfehle die Kirche."),
          tr("Yani 'Kiliseyi tavsiye ederim'. Lütfen"),
          de("Ich empfehle die Kirche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich empfehle die Kirche" },
      },
      {
        say: [
          tr("Şimdi sen tavsiye et: 'Kuleyi tavsiye ederim.'"),
          de("der Turm"),
          tr("eril bir kelime ve burada cümlenin nesnesi."),
        ],
        expect: {
          kind: "produce",
          target: "Ich empfehle den Turm",
          hint: [
            de("der Turm"),
            tr("eril; nesne olunca biçim değiştirir:"),
            de("Ich empfehle den Turm."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de tavsiyeyi güçlendiren küçük bir cümle var:"),
          de("Das lohnt sich."),
          tr("Yani 'Değer'. Lütfen"),
          de("Das lohnt sich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das lohnt sich" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Man kann hier viel sehen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Man kann hier viel sehen.",
          answer: true,
          why: [
            tr("Doğru. Özne yerinde duruyor ve asıl fiil cümlenin sonunda:"),
            de("Man kann hier viel sehen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık nerelerin gezilebileceğini sorabilir ve kendi tavsiyeni verebilirsin. Şimdi turizm danışmasındasın ve bir günün var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Şehrin turizm danışmasındasın ve yarın bir günün boş. Nelerin gezilebileceğini sor, önerilere fikir söyle ve kendi tercihini gerekçesiyle anlat.",
      partner: "şehrini çok seven, hevesli bir turizm görevlisi",
      opening: "Willkommen in unserer Stadt! Wie lange bleiben Sie hier?",
      openingTr: "Şehrimize hoş geldiniz! Ne kadar kalacaksınız?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-verlaufen",
    icon: "city",
    level: "A1",
    course: "de",
    title: "Ich habe mich verlaufen",
    titleTr: "Kaybolmak",
    summary: "Kaybolduğunu söylemeyi ve ayrıntılı tarifi takip etmeyi öğretir.",
    minutes: 9,
    focusId: "Imperativ-Sie",
    vocab: [
      { de: "sich verlaufen", tr: "kaybolmak" },
      { de: "die Straße", tr: "cadde" },
      { de: "die Ampel", tr: "trafik ışığı" },
      { de: "die Kreuzung", tr: "kavşak" },
      { de: "abbiegen", tr: "dönmek" },
    ],
    patterns: [
      { de: "Ich habe mich verlaufen.", tr: "kaybolduğunu söylerken kullanılır" },
      { de: "Nehmen Sie die zweite Straße.", tr: "hangi caddeye girileceğini söyler" },
      { de: "Biegen Sie an der Ampel rechts ab.", tr: "nerede dönüleceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Telefonun bitti ve nerede olduğunu bilmiyorsun. Bugün kaybolduğunu söylemeyi ve uzun bir tarifi adım adım takip etmeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste bir cümleyi olduğu gibi ezberleyeceğiz: kaybolduğunu söyleyen cümle. İçindeki zaman kuralını ileride ayrıca göreceğiz, şimdilik hazır bir kalıp olarak kullan. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich verlaufen"),
          tr("Türkçesi 'kaybolmak' demek. Lütfen"),
          de("sich verlaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verlaufen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Straße"),
          tr("Türkçesi 'cadde' demek. Lütfen"),
          de("die Straße"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Straße" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Ampel"),
          tr("Türkçesi 'trafik ışığı' demek. Lütfen"),
          de("die Ampel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ampel" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Kreuzung"),
          tr("Türkçesi 'kavşak' demek. Lütfen"),
          de("die Kreuzung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kreuzung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("abbiegen"),
          tr("Türkçesi 'dönmek' demek. Lütfen"),
          de("abbiegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abbiegen" },
      },
      {
        say: [
          tr("İlk kalıbımız, yardım isterken söyleyeceğin cümle:"),
          de("Ich habe mich verlaufen."),
          tr(
            "Yani 'Kayboldum'. Karşındaki bunu duyunca hemen yardıma geçer. Cümleyi bir bütün olarak aklında tut.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe mich verlaufen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe mich verlaufen" },
      },
      {
        say: [
          tr("Arkasına aradığın yeri eklersin. Şimdi sen söyle: 'Garı arıyorum.'"),
        ],
        expect: {
          kind: "produce",
          target: "Ich suche den Bahnhof",
          hint: [
            de("der Bahnhof"),
            tr("aradığın şey olduğu için biçim değiştirir:"),
            de("Ich suche den Bahnhof."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi tarif geliyor ve iki cümleden oluşuyor. Birincisi hangi caddeye gireceğini söyler:"),
          de("Nehmen Sie die zweite Straße."),
          tr("Yani 'İkinci caddeye girin'. Lütfen"),
          de("Nehmen Sie die zweite Straße"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nehmen Sie die zweite Straße" },
      },
      {
        say: [
          tr("İkincisi nerede döneceğini söyler:"),
          de("Biegen Sie an der Ampel rechts ab."),
          tr(
            "Dönmek anlamındaki fiil ikiye bölünüyor: bir parçası cümlenin başında, diğer parçası en sonunda duruyor. Sona kadar dinlemeden anlam tamamlanmıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Biegen Sie an der Ampel rechts ab"), tr("deyin.")],
        expect: { kind: "repeat", target: "Biegen Sie an der Ampel rechts ab" },
      },
      {
        say: [tr("Şimdi sen tarif ver: 'Kavşakta sola dönün.'")],
        expect: {
          kind: "produce",
          target: "Biegen Sie an der Kreuzung links ab",
          hint: [
            tr("Fiilin ikinci parçası en sonda kalmalı:"),
            de("Biegen Sie an der Kreuzung links ab."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe mich verlaufen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe mich verlaufen.",
          answer: true,
          why: [
            tr("Doğru. Kaybolduğunu söylerken Almanca tam olarak böyle der:"),
            de("Ich habe mich verlaufen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kaybolduğunu söyleyebilir ve gelen tarifi sonuna kadar takip edebilirsin. Şimdi tanımadığın bir sokaktasın ve bir dükkâna girip yardım isteyeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kaybolduğunu fark ettin ve bir dükkâna girip yardım istedin. Durumunu anlat, nereye gitmek istediğini söyle, tarifi dinle ve emin olmak için tekrar et.",
      partner: "sakin sakin tarif eden, sabırlı bir dükkân sahibi",
      opening: "Sie sehen ratlos aus. Suchen Sie eine bestimmte Straße?",
      openingTr: "Şaşırmış görünüyorsunuz. Belli bir cadde mi arıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-fahrrad",
    icon: "bike",
    level: "A1",
    course: "de",
    title: "Mit dem Fahrrad",
    titleTr: "Bisikletle",
    summary: "Bisikletle gitmeyi anlatmayı, bisiklet kiralamayı ve uyarıları anlamayı öğretir.",
    minutes: 8,
    focusId: "Präposition-mit",
    vocab: [
      { de: "das Fahrrad", tr: "bisiklet" },
      { de: "der Radweg", tr: "bisiklet yolu" },
      { de: "leihen", tr: "kiralamak" },
      { de: "der Helm", tr: "kask" },
      { de: "aufpassen", tr: "dikkat etmek" },
    ],
    patterns: [
      { de: "Ich fahre mit dem Fahrrad.", tr: "bisikletle gittiğini söylerken kullanılır" },
      { de: "Wo ist der Radweg?", tr: "bisiklet yolunu sorarken kullanılır" },
      { de: "Ich möchte ein Fahrrad leihen.", tr: "bisiklet kiralarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Almanya'da şehir içinde en hızlı yol çoğu zaman bisiklettir. Bugün bisikletle gittiğini söylemeyi, bisiklet kiralamayı ve yol uyarılarını anlamayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bisiklet yolları burada ayrı bir şerittir ve yürüyerek üstünde durmak hoş karşılanmaz. Kelimeleri öğrenirken bunu aklında tut, işine yarayacak.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Fahrrad"),
          tr("Türkçesi 'bisiklet' demek. Lütfen"),
          de("das Fahrrad"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fahrrad" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Radweg"),
          tr("Türkçesi 'bisiklet yolu' demek. Lütfen"),
          de("der Radweg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Radweg" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("leihen"),
          tr("Türkçesi 'kiralamak, ödünç almak' demek. Lütfen"),
          de("leihen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "leihen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Helm"),
          tr("Türkçesi 'kask' demek. Lütfen"),
          de("der Helm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Helm" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("aufpassen"),
          tr("Türkçesi 'dikkat etmek' demek. Lütfen"),
          de("aufpassen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufpassen" },
      },
      {
        say: [
          tr("Araç bildiren kalıp burada da aynı çalışıyor:"),
          de("Ich fahre mit dem Fahrrad."),
          tr("Bisiklet nötr bir kelime ve nötrler eriller gibi davranıyor, yani"),
          de("mit dem"),
          tr("diyoruz. Almanların günlük konuşmada daha kısa bir söyleyişi de var:"),
          de("Ich fahre Rad."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich fahre mit dem Fahrrad"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich fahre mit dem Fahrrad" },
      },
      {
        say: [tr("Sıra sende: 'Bisiklet yolu nerede?'")],
        expect: {
          kind: "produce",
          target: "Wo ist der Radweg",
          hint: [
            tr("Soru kelimesi başta, sorduğun şey sonda:"),
            de("Wo ist der Radweg?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bisikletin yoksa kiralarsın:"),
          de("Ich möchte ein Fahrrad leihen."),
          tr("Yanına bir de kask istemek iyi olur:"),
          de("Haben Sie auch einen Helm?"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich möchte ein Fahrrad leihen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich möchte ein Fahrrad leihen" },
      },
      {
        say: [tr("Şimdi kaskı sen iste: 'Bir kask istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich möchte einen Helm",
          hint: [
            de("der Helm"),
            tr("eril; istenen şey olunca biçim değiştirir:"),
            de("Ich möchte einen Helm."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yolda birinden şu uyarıyı duyabilirsin:"),
          de("Pass auf!"),
          tr("Yani 'Dikkat et!' Bu bir arkadaşa söylenen kısa emir; kibar biçimi ise:"),
          de("Passen Sie auf!"),
          tr("Lütfen"),
          de("Pass auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Pass auf" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich fahre mit das Fahrrad."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich fahre mit das Fahrrad.",
          answer: false,
          why: [
            tr("Araç bildiren kelimeden sonra nötr artikel"),
            de("das"),
            tr("olarak kalmaz,"),
            de("dem"),
            tr("olur. Doğrusu:"),
            de("Ich fahre mit dem Fahrrad."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bisikletle gittiğini söyleyebilir, bisiklet kiralayabilir ve uyarıları anlayabilirsin. Şimdi bir kiralama dükkânındasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir bisiklet kiralama dükkânındasın ve şehri bisikletle gezmek istiyorsun. Bisiklet iste, kaç saatliğine olduğunu söyle, fiyatı sor ve bisiklet yolunu öğren.",
      partner: "bisikletleri kendi çocukları gibi seven bir dükkân sahibi",
      opening: "Hallo! Möchten Sie ein Fahrrad für heute leihen?",
      openingTr: "Merhaba! Bugünlük bir bisiklet mi kiralamak istiyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-bahnhof-info",
    icon: "office",
    level: "A1",
    course: "de",
    title: "Am Informationsschalter",
    titleTr: "Danışmada",
    summary: "Danışmada kalkış saatini, peronu ve aktarma olup olmadığını sormayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "der Schalter", tr: "gişe" },
      { de: "der Fahrplan", tr: "tarife" },
      { de: "umsteigen", tr: "aktarma yapmak" },
      { de: "die Auskunft", tr: "danışma" },
      { de: "direkt", tr: "aktarmasız" },
    ],
    patterns: [
      { de: "Wann fährt der Zug nach …?", tr: "kalkış saatini sorarken kullanılır" },
      { de: "Muss ich umsteigen?", tr: "aktarma olup olmadığını sorarken kullanılır" },
      { de: "Ist der Zug direkt?", tr: "trenin aktarmasız olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Gardaki en faydalı yer danışmadır: bir soruyla bütün yolculuğunu çözebilirsin. Bugün kalkış saatini, peronu ve aktarmayı sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu dersin bütün cümleleri soru. Almancada soru iki türlü kurulur ve ikisini de bugün göreceksin: soru kelimesiyle başlayanlar ve doğrudan fiille başlayanlar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Schalter"),
          tr("Türkçesi 'gişe' demek. Lütfen"),
          de("der Schalter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schalter" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Fahrplan"),
          tr("Türkçesi 'tarife' demek. Lütfen"),
          de("der Fahrplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fahrplan" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("umsteigen"),
          tr("Türkçesi 'aktarma yapmak' demek. Lütfen"),
          de("umsteigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umsteigen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Auskunft"),
          tr("Türkçesi 'danışma' demek. Lütfen"),
          de("die Auskunft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Auskunft" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("direkt"),
          tr("Türkçesi 'aktarmasız, doğrudan' demek. Lütfen"),
          de("direkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "direkt" },
      },
      {
        say: [
          tr("İlk sorumuz bir soru kelimesiyle başlıyor:"),
          de("Wann fährt der Zug nach Berlin?"),
          tr(
            "Yani 'Berlin treni ne zaman kalkıyor?' Sıra hep aynı: önce soru kelimesi, hemen arkasından fiil, sonra kim ya da ne.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wann fährt der Zug nach Berlin"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wann fährt der Zug nach Berlin" },
      },
      {
        say: [tr("Sıra sende: 'Hamburg treni ne zaman kalkıyor?'")],
        expect: {
          kind: "produce",
          target: "Wann fährt der Zug nach Hamburg",
          hint: [
            tr("Soru kelimesi başta, fiil hemen arkasında:"),
            de("Wann fährt der Zug nach Hamburg?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci sorumuzda soru kelimesi yok; fiil doğrudan başa geçiyor:"),
          de("Muss ich umsteigen?"),
          tr(
            "Yani 'Aktarma yapmam gerekiyor mu?' Türkçede soruyu sondaki ekle kurarız, Almancada fiili öne almak yeterli.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Muss ich umsteigen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Muss ich umsteigen" },
      },
      {
        say: [tr("Şimdi sen sor: 'Tren aktarmasız mı?'")],
        expect: {
          kind: "produce",
          target: "Ist der Zug direkt",
          hint: [
            tr("Fiil başa geçince cümle soru olur:"),
            de("Ist der Zug direkt?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Aktarmayı sorduğunda cevap iyi haberse şöyle gelir:"),
          de("Nein, der Zug fährt direkt."),
          tr("Kalkış saatlerinin hepsi de şurada yazılıdır:"),
          de("Der Fahrplan hängt dort."),
          tr("Lütfen"),
          de("Nein, der Zug fährt direkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nein, der Zug fährt direkt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wann der Zug fährt nach Berlin?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wann der Zug fährt nach Berlin?",
          answer: false,
          why: [
            tr("Soru kelimesinden hemen sonra fiil gelmeli. Doğrusu:"),
            de("Wann fährt der Zug nach Berlin?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kalkış saatini, peronu ve aktarmayı sorabilirsin; bu üç soruyla Almanya'da her yere gidebilirsin. Şimdi danışmanın önündesin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Garın danışma gişesindesin ve bugün Hamburg'a gitmek istiyorsun. Trenin ne zaman kalktığını sor, aktarma olup olmadığını öğren, peronu sor ve yolculuğun ne kadar süreceğini konuş.",
      partner: "her soruya hazır cevabı olan, işini seven bir danışma görevlisi",
      opening: "Guten Tag! Brauchen Sie eine Auskunft?",
      openingTr: "İyi günler! Bilgi almak ister misiniz?",
      minTurns: 4,
    },
  },
];

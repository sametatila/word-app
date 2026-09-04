import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 7 — Seyahat (061–070).
 *
 * Modülün dil omurgası dört şey ve dördü de Türkçe konuşanın kendiliğinden
 * kuramayacağı yapılar: yön edatları, gelecek zaman, "var" kalıbı ve
 * yer/yön ayrımı. Türkçede her yere „-e/-a“ ile gidilir: denize, dağlara,
 * İtalya'ya. Almancada gideceğin yerin türüne göre edat değişiyor.
 *
 * Sözlükçe havuzun A2 katmanından geliyor. Seyahat havuzun en zengin
 * alanlarından biri — otel, uçuş, tren, kamp, hava durumu, hediyelik — ve
 * modül artık o alanı gerçekten kullanıyor. Eskiden 50 kelimenin 16'sı B1
 * üstü, 15'i A1 tekrarıydı ve 6'sı havuzda hiç yoktu.
 */
export const deA2B07: Lesson[] = [
  {
    id: "de-a2-reiseplan",
    icon: "map",
    level: "A2",
    course: "de",
    title: "Wohin fahren wir?",
    titleTr: "Rota planı",
    summary: "Bir yolculuğu planlamayı ve rotayı anlatmayı öğretir.",
    minutes: 10,
    focusId: "Wechselpräpositionen",
    vocab: [
      { de: "der Reiseplan", tr: "seyahat planı" },
      { de: "die Landkarte", tr: "harita" },
      { de: "die Anreise", tr: "gidiş yolculuğu" },
      { de: "die Abreise", tr: "yola çıkış" },
      { de: "der Zwischenstopp", tr: "ara durak" },
      { de: "das Verkehrsmittel", tr: "ulaşım aracı" },
      { de: "umsteigen", tr: "aktarma yapmak" },
      { de: "der Weg", tr: "yol" },
    ],
    patterns: [
      { de: "Wir fahren ans Meer.", tr: "denize gitmeyi anlatır" },
      { de: "Sie müssen in Mannheim umsteigen.", tr: "aktarmayı bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir yolculuk planlıyoruz. Almancada nereye gittiğini söylerken gideceğin yerin türüne göre edat değişiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede her yere aynı ekle gideriz: denize, dağlara, şehre. Almancada üç ayrı edat var ve hepsi belirtme hâlini getiriyor, çünkü hareket söz konusu. Şehir ve ülke adları ise ayrı bir edat alıyor. Bunu bu modül boyunca göreceğiz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Reiseplan"),
          tr("Türkçesi 'seyahat planı' demek. Lütfen"),
          de("der Reiseplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Reiseplan" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Landkarte"),
          tr("Türkçesi 'harita' demek. Lütfen"),
          de("die Landkarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Landkarte" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Anreise"),
          tr("Türkçesi 'gidiş yolculuğu' demek. Lütfen"),
          de("die Anreise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Anreise" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Abreise"),
          tr("Türkçesi 'yola çıkış, ayrılış' demek. Lütfen"),
          de("die Abreise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Abreise" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Zwischenstopp"),
          tr("Türkçesi 'ara durak' demek. Lütfen"),
          de("der Zwischenstopp"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zwischenstopp" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Verkehrsmittel"),
          tr("Türkçesi 'ulaşım aracı' demek. Lütfen"),
          de("das Verkehrsmittel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Verkehrsmittel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("umsteigen"),
          tr("Türkçesi 'aktarma yapmak' demek. Lütfen"),
          de("umsteigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umsteigen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Weg"),
          tr("Türkçesi 'yol' demek. Lütfen"),
          de("der Weg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Weg" },
      },
      {
        say: [
          tr("Şimdi üç edatı bir arada duy. Denize, dağa ve şehre gitmek üç ayrı edat alıyor:"),
          de("ans Meer, in die Berge, nach Berlin"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir fahren ans Meer."),
          tr("Edat ile artikel kaynaşmış. Hareket olduğu için belirtme hâli geliyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Arabayla gidiş beş saat sürüyor.' Almancası:"),
          de("Die Anreise mit dem Auto dauert fünf Stunden."),
          tr("Lütfen"),
          de("Die Anreise mit dem Auto dauert fünf Stunden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Anreise mit dem Auto dauert fünf Stunden" },
      },
      {
        say: [tr("Sıra sende: 'Viyana'da bir ara durağımız var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben einen Zwischenstopp in Wien",
          hint: [
            tr("Nesne belirtme hâline girer ve yer bildiren edat yönelme hâlini getirir:"),
            de("Wir haben einen Zwischenstopp in Wien."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Sie müssen in Mannheim umsteigen."),
          tr(
            "Kip fiili ikinci sırada, ayrılabilen fiil sonda ve bölünmemiş hâlde. Tren istasyonunda en çok duyacağın cümlelerden biri.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bana gara giden yolu gösterebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Können Sie mir den Weg zum Bahnhof zeigen",
          hint: [
            tr("Gösterilen kişi yönelme hâlinde, gösterilen şey belirtme hâlinde ve asıl fiil sonda:"),
            de("Können Sie mir den Weg zum Bahnhof zeigen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir fahren am Meer."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir fahren am Meer.",
          answer: false,
          why: [
            tr(
              "Gitmek hareket bildirir, o yüzden edat belirtme hâlini getirmeli; yazılan biçim 'deniz kenarında araba sürüyoruz' anlamına gelir. Doğrusu:",
            ),
            de("Wir fahren ans Meer."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir arkadaşınla tatil rotası planlıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla yaz tatilini planlıyorsunuz. Nereye gideceğinizi, hangi araçla gideceğinizi ve yolda nerede duracağınızı konuşun.",
      partner: "haritayı önüne açmış, her şeyi planlamak isteyen bir arkadaş",
      opening: "Also, wohin fahren wir dieses Jahr? Ans Meer oder in die Berge?",
      openingTr: "Peki, bu yıl nereye gidiyoruz? Denize mi, dağlara mı?",
      goal: "Gidilecek yer, ulaşım aracı ve rotadaki bir durak kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-hotel",
    icon: "bed",
    level: "A2",
    course: "de",
    title: "An der Rezeption",
    titleTr: "Otelde",
    summary: "Otelde giriş yapmayı ve oda hakkında soru sormayı öğretir.",
    minutes: 10,
    focusId: "W-Fragen",
    vocab: [
      { de: "das Hotelzimmer", tr: "otel odası" },
      { de: "der Zimmerschlüssel", tr: "oda anahtarı" },
      { de: "das Doppelbett", tr: "çift kişilik yatak" },
      { de: "die Unterkunft", tr: "kalacak yer" },
      { de: "die Jugendherberge", tr: "gençlik yurdu" },
      { de: "reservieren", tr: "ayırtmak" },
      { de: "buchen", tr: "rezervasyon yapmak" },
      { de: "einchecken", tr: "check-in yapmak" },
    ],
    patterns: [
      { de: "Ich habe ein Zimmer reserviert.", tr: "rezervasyonu bildirir" },
      { de: "Ab wann kann ich einchecken?", tr: "giriş saatini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün otel resepsiyonundayız. Rezervasyonu bildirmek ve doğru soruları sormak konaklamanın yarısı. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Resepsiyonda kullanılan sorular soru kelimesiyle başlar ve bazıları bir edatla birleşir: 'ne zamandan itibaren', 'ne zamana kadar'. Edat en başta durur ve soru kelimesi onun arkasından gelir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Hotelzimmer"),
          tr("Türkçesi 'otel odası' demek. Lütfen"),
          de("das Hotelzimmer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Hotelzimmer" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Zimmerschlüssel"),
          tr("Türkçesi 'oda anahtarı' demek. Lütfen"),
          de("der Zimmerschlüssel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zimmerschlüssel" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Doppelbett"),
          tr("Türkçesi 'çift kişilik yatak' demek. Lütfen"),
          de("das Doppelbett"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Doppelbett" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Unterkunft"),
          tr("Türkçesi 'kalacak yer' demek. Lütfen"),
          de("die Unterkunft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Unterkunft" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Jugendherberge"),
          tr("Türkçesi 'gençlik yurdu' demek; ucuz bir konaklama biçimi. Lütfen"),
          de("die Jugendherberge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Jugendherberge" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("reservieren"),
          tr("Türkçesi 'ayırtmak' demek. Lütfen"),
          de("reservieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "reservieren" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("buchen"),
          tr("Türkçesi 'rezervasyon yapmak' demek. Lütfen"),
          de("buchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "buchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("einchecken"),
          tr("Türkçesi 'giriş yapmak' demek. Lütfen"),
          de("einchecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einchecken" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe ein Zimmer reserviert."),
          tr(
            "Sonu belirli bir heceyle biten yabancı kökenli fiil, o yüzden ortacın hecesini almıyor ve sonu değişmiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Roma'da bir otel rezerve ettik.' Almancası:"),
          de("Wir haben ein Hotel in Rom gebucht."),
          tr("Lütfen"),
          de("Wir haben ein Hotel in Rom gebucht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir haben ein Hotel in Rom gebucht" },
      },
      {
        say: [tr("Sıra sende: 'Basel'de hâlâ kalacak yer arıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich suche noch eine Unterkunft in Basel",
          hint: [
            tr("Nesne belirtme hâline girer, yer bildiren edat ise yönelme hâlini getirir:"),
            de("Ich suche noch eine Unterkunft in Basel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ab wann kann ich einchecken?"),
          tr("Edat en başta, soru kelimesi onun arkasında. Resepsiyonda ilk sorulan sorulardan biri."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Oda anahtarını resepsiyona bıraktım.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe den Zimmerschlüssel an der Rezeption abgegeben",
          hint: [
            tr("Yer bildiren edat yönelme hâlini getirir ve ayrılabilen fiilin ortacı sona gider:"),
            de("Ich habe den Zimmerschlüssel an der Rezeption abgegeben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe ein Zimmer reserviert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe ein Zimmer reserviert.",
          answer: true,
          why: [
            tr(
              "Sonu belirli bir heceyle biten yabancı kökenli fiiller ortacın hecesini almaz; cümle doğru kurulmuş.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi otel resepsiyonundasın ve giriş yapıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir otele vardın ve giriş yapıyorsun. Rezervasyonunu bildir, oda hakkında bir şey sor ve kahvaltı saatini öğren.",
      partner: "resepsiyonda çalışan güler yüzlü bir görevli",
      opening: "Herzlich willkommen! Haben Sie reserviert?",
      openingTr: "Hoş geldiniz! Rezervasyonunuz var mı?",
      goal: "Rezervasyon bulunmuş, oda hakkında bir soru sorulmuş ve kahvaltı ile çıkış saati öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-koffer",
    icon: "suitcase",
    level: "A2",
    course: "de",
    title: "Der Koffer ist gepackt",
    titleTr: "Bavul hazırlama",
    summary: "Bavul hazırlarken neyin alındığını ve neyin unutulduğunu anlatmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt-trennbar",
    vocab: [
      { de: "die Reisetasche", tr: "seyahat çantası" },
      { de: "das Handgepäck", tr: "el bagajı" },
      { de: "einpacken", tr: "bavula koymak" },
      { de: "verstauen", tr: "yerleştirmek" },
      { de: "die Badehose", tr: "mayo" },
      { de: "das Handtuch", tr: "havlu" },
      { de: "die Seife", tr: "sabun" },
      { de: "aufbewahren", tr: "saklamak" },
    ],
    patterns: [
      { de: "Hast du die Badehose eingepackt?", tr: "bir şeyin alınıp alınmadığını sorar" },
      { de: "Ich nehme nur Handgepäck mit.", tr: "ne kadar bagaj aldığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bavul hazırlıyoruz. Ayrılabilen fiiller bu derste bir kez daha karşına çıkacak, bu kez soru cümlesinde. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçmiş zamanda soru sorarken yardımcı fiil başa geçiyor, ortaç ise sonda kalıyor. Ayrılabilen fiilde ortacın hecesi yine ön ekle kökün arasında duruyor. Bavul hazırlarken en çok kurulan cümle bu. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Reisetasche"),
          tr("Türkçesi 'seyahat çantası' demek. Lütfen"),
          de("die Reisetasche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Reisetasche" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Handgepäck"),
          tr("Türkçesi 'el bagajı' demek. Lütfen"),
          de("das Handgepäck"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handgepäck" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("einpacken"),
          tr("Türkçesi 'bavula koymak, paketlemek' demek. Lütfen"),
          de("einpacken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einpacken" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verstauen"),
          tr("Türkçesi 'yerleştirmek, sığdırmak' demek. Lütfen"),
          de("verstauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verstauen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Badehose"),
          tr("Türkçesi 'mayo' demek. Lütfen"),
          de("die Badehose"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Badehose" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Handtuch"),
          tr("Türkçesi 'havlu' demek. Lütfen"),
          de("das Handtuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handtuch" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Seife"),
          tr("Türkçesi 'sabun' demek. Lütfen"),
          de("die Seife"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Seife" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("aufbewahren"),
          tr("Türkçesi 'saklamak, muhafaza etmek' demek. Lütfen"),
          de("aufbewahren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufbewahren" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Hast du die Badehose eingepackt?"),
          tr(
            "Yardımcı fiil başta olduğu için soru; ortaç sonda ve hecesi ön ekle kökün arasına girmiş.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Seyahat çantam neredeyse doldu.' Almancası:"),
          de("Meine Reisetasche ist schon fast voll."),
          tr("Lütfen"),
          de("Meine Reisetasche ist schon fast voll"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Meine Reisetasche ist schon fast voll" },
      },
      {
        say: [tr("Sıra sende: 'Havluyu bavula koydun mu?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Hast du das Handtuch eingepackt",
          hint: [
            tr("Yardımcı fiil başta, ortaç sonda ve hecesi ön ekle kökün arasında:"),
            de("Hast du das Handtuch eingepackt?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich nehme nur Handgepäck mit."),
          tr("Ayrılabilen fiilin ön eki şimdiki zamanda cümlenin sonuna düşüyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Şoför çantaları bagaja yerleştiriyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Fahrer verstaut die Taschen im Kofferraum",
          hint: [
            tr("Vurgusuz ön ekli fiil bölünmez ve yer bildiren edat yönelme hâlini getirir:"),
            de("Der Fahrer verstaut die Taschen im Kofferraum."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Hast du die Badehose gepackt ein?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Hast du die Badehose gepackt ein?",
          answer: false,
          why: [
            tr("Geçmiş zamanda ortaç bölünmez; ön ek ortacın başında kalır. Doğrusu:"),
            de("Hast du die Badehose eingepackt?"),
          ],
        },
      },
      {
        say: [tr("Şimdi yola çıkmadan önce bavulu birlikte gözden geçiriyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Yarın tatile çıkıyorsunuz ve bavulları hazırlıyorsunuz. Ev arkadaşın neyin alındığını soruyor; sen de neyin unutulduğunu hatırlatıyorsun.",
      partner: "her şeyi iki kez kontrol eden bir yol arkadaşı",
      opening: "So, ich bin fast fertig. Hast du alles eingepackt?",
      openingTr: "Ben neredeyse bitirdim. Sen her şeyi koydun mu?",
      goal: "En az üç eşya tek tek geçilmiş, biri unutulmuş çıkmış ve bavul tamam denmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-flughafen",
    icon: "plane",
    level: "A2",
    course: "de",
    title: "Am Flughafen",
    titleTr: "Havalimanında",
    summary: "Havalimanındaki adımları ve zorunlulukları anlatmayı öğretir.",
    minutes: 10,
    focusId: "Modalverb-müssen",
    vocab: [
      { de: "die Bordkarte", tr: "biniş kartı" },
      { de: "die Passkontrolle", tr: "pasaport kontrolü" },
      { de: "die Sicherheitskontrolle", tr: "güvenlik kontrolü" },
      { de: "der Flugbegleiter", tr: "kabin görevlisi" },
      { de: "der Flug", tr: "uçuş" },
      { de: "der Sitzplatz", tr: "oturacak yer" },
      { de: "die Ankunftszeit", tr: "varış saati" },
      { de: "der Rückflug", tr: "dönüş uçuşu" },
    ],
    patterns: [
      { de: "Sie müssen zur Sicherheitskontrolle.", tr: "nereye gitmesi gerektiğini söyler" },
      { de: "Wann ist die Ankunftszeit?", tr: "varış saatini sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün havalimanındayız. Burada her şey bir zorunluluk sırasıyla ilerliyor ve o sırayı anlatan kip fiili zorunluluk fiili. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu kip fiilinin ilginç bir kullanımı var: yön bildiren bir ifadeyle birlikte asıl fiil hiç söylenmez. 'Güvenlik kontrolüne gitmeniz gerekiyor' derken 'gitmek' fiili düşer, çünkü zaten anlaşılır. Türkçede böyle bir kısaltma yok. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Bordkarte"),
          tr("Türkçesi 'biniş kartı' demek. Lütfen"),
          de("die Bordkarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bordkarte" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Passkontrolle"),
          tr("Türkçesi 'pasaport kontrolü' demek. Lütfen"),
          de("die Passkontrolle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Passkontrolle" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Sicherheitskontrolle"),
          tr("Türkçesi 'güvenlik kontrolü' demek. Lütfen"),
          de("die Sicherheitskontrolle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sicherheitskontrolle" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Flugbegleiter"),
          tr("Türkçesi 'kabin görevlisi' demek. Lütfen"),
          de("der Flugbegleiter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flugbegleiter" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Flug"),
          tr("Türkçesi 'uçuş' demek. Lütfen"),
          de("der Flug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flug" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Sitzplatz"),
          tr("Türkçesi 'oturacak yer' demek. Lütfen"),
          de("der Sitzplatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sitzplatz" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Ankunftszeit"),
          tr("Türkçesi 'varış saati' demek. Lütfen"),
          de("die Ankunftszeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ankunftszeit" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Rückflug"),
          tr("Türkçesi 'dönüş uçuşu' demek. Lütfen"),
          de("der Rückflug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rückflug" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Sie müssen zur Sicherheitskontrolle."),
          tr(
            "Asıl fiil yok. Yön bildiren edat cümleyi tamamlıyor ve gitmek fiili düşüyor; bu, Almancada çok doğal bir kısaltma.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Uçuştan iki saat önce giriş yapmamız gerekiyor.' Almancası:"),
          de("Wir müssen zwei Stunden vor dem Flug einchecken."),
          tr("Lütfen"),
          de("Wir müssen zwei Stunden vor dem Flug einchecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir müssen zwei Stunden vor dem Flug einchecken" },
      },
      {
        say: [tr("Sıra sende: 'Lütfen biniş kartınızı gösterin.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Zeigen Sie mir bitte Ihre Bordkarte",
          hint: [
            tr("Kibar emirde fiil başa geçer, gösterilen kişi yönelme hâlinde durur:"),
            de("Zeigen Sie mir bitte Ihre Bordkarte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wann ist die Ankunftszeit?"),
          tr("Zaman soran soru kelimesi başta, fiil ikinci sırada."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Dönüş uçuşumuz pazar akşamı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Unser Rückflug ist am Sonntagabend",
          hint: [
            tr("Gün adının önüne kaynaşmış bir edat gelir:"),
            de("Unser Rückflug ist am Sonntagabend."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Sie müssen zur Sicherheitskontrolle."),
          tr("cümlesi tamam mı, yoksa bir fiil mi eksik?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Sie müssen zur Sicherheitskontrolle.",
          answer: true,
          why: [
            tr(
              "Cümle tamam. Zorunluluk fiili yön bildiren bir ifadeyle kullanıldığında gitmek fiili söylenmez; havalimanında tam olarak böyle duyarsın.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi havalimanındasın ve check-in bankosundasın.")],
      },
    ],
    roleplay: {
      scene:
        "Havalimanında check-in bankosundasın. Uçuşunu söyle, bagajını ver, oturacak yer iste ve bir sonraki adımı sor.",
      partner: "check-in bankosunda çalışan bir görevli",
      opening: "Guten Tag, wohin fliegen Sie heute?",
      openingTr: "İyi günler, bugün nereye uçuyorsunuz?",
      goal: "Check-in tamamlanmış, oturacak yer konuşulmuş ve bir sonraki adım ile saat öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-wetterbericht",
    icon: "weather",
    level: "A2",
    course: "de",
    title: "Der Wetterbericht",
    titleTr: "Hava tahmini",
    summary: "Hava durumunu anlatmayı ve gelecek zamanla tahmin yapmayı öğretir.",
    minutes: 10,
    focusId: "Futur-werden",
    vocab: [
      { de: "bewölkt", tr: "bulutlu" },
      { de: "sonnig", tr: "güneşli" },
      { de: "neblig", tr: "sisli" },
      { de: "windig", tr: "rüzgârlı" },
      { de: "schneien", tr: "kar yağmak" },
      { de: "das Gewitter", tr: "gök gürültülü fırtına" },
      { de: "stürmisch", tr: "fırtınalı" },
      { de: "die Wolke", tr: "bulut" },
    ],
    patterns: [
      { de: "Morgen wird es sonnig.", tr: "yarının havasını tahmin eder" },
      { de: "Es gibt heute Abend ein Gewitter.", tr: "hava olayını bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hava durumunu konuşuyoruz. Bu, seviyenin tek yeni zaman yapısını getiriyor: gelecek zaman. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada gelecek çoğu zaman şimdiki zamanla söylenir; yarın, gelecek hafta gibi bir kelime yeterlidir. Ama tahmin yaparken ayrı bir yardımcı fiil kullanılır ve asıl fiil sona gider. Hava tahmini bunun en doğal kullanıldığı yer. Bir de hava cümlelerinin öznesi hep aynı kişisiz kelimedir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("bewölkt"),
          tr("Türkçesi 'bulutlu' demek. Lütfen"),
          de("bewölkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bewölkt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sonnig"),
          tr("Türkçesi 'güneşli' demek. Lütfen"),
          de("sonnig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sonnig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("neblig"),
          tr("Türkçesi 'sisli' demek. Lütfen"),
          de("neblig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "neblig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("windig"),
          tr("Türkçesi 'rüzgârlı' demek. Lütfen"),
          de("windig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "windig" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("schneien"),
          tr("Türkçesi 'kar yağmak' demek. Lütfen"),
          de("schneien"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schneien" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Gewitter"),
          tr("Türkçesi 'gök gürültülü fırtına' demek. Lütfen"),
          de("das Gewitter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gewitter" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("stürmisch"),
          tr("Türkçesi 'fırtınalı' demek. Lütfen"),
          de("stürmisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stürmisch" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Wolke"),
          tr("Türkçesi 'bulut' demek. Lütfen"),
          de("die Wolke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wolke" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Morgen wird es sonnig."),
          tr(
            "Yardımcı fiil ikinci sırada, kişisiz özne onun arkasında. Hava cümlelerinde özne hep bu küçük kelime.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yarın hava yine sıcak ve güneşli olacak.' Almancası:"),
          de("Morgen wird das Wetter wieder warm und sonnig."),
          tr("Lütfen"),
          de("Morgen wird das Wetter wieder warm und sonnig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Morgen wird das Wetter wieder warm und sonnig" },
      },
      {
        say: [tr("Sıra sende: 'Bu gece kar yağacak.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Heute Nacht wird es schneien",
          hint: [
            tr("Yardımcı fiil ikinci sırada, asıl fiil sonda ve özne kişisiz:"),
            de("Heute Nacht wird es schneien."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Es gibt heute Abend ein Gewitter."),
          tr("'Var' kalıbı; ardından gelen isim belirtme hâline giriyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Gökyüzünde çok bulut var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Himmel sind viele Wolken",
          hint: [
            tr("Yer ifadesi başta olduğu için özne fiilin arkasına düşer ve fiil çoğula uyar:"),
            de("Am Himmel sind viele Wolken."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Morgen es wird sonnig."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Morgen es wird sonnig.",
          answer: false,
          why: [
            tr("Zaman ifadesi başa geçtiğinde fiil ikinci sırada kalır, özne arkaya düşer. Doğrusu:"),
            de("Morgen wird es sonnig."),
          ],
        },
      },
      {
        say: [tr("Şimdi hafta sonu havasını konuşuyorsunuz ve plan yapıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Hafta sonu için plan yapıyorsunuz ama hava belirsiz. Hava tahminini anlat, gelecek zamanla tahmin yap ve buna göre bir plan öner.",
      partner: "hava durumuna göre plan yapan bir arkadaş",
      opening: "Was meinst du, wie wird das Wetter am Wochenende?",
      openingTr: "Sence hafta sonu hava nasıl olacak?",
      goal: "Hava tahmini gelecek zamanla anlatılmış ve buna uygun bir hafta sonu planı üzerinde anlaşılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-ausflug",
    icon: "mountain",
    level: "A2",
    course: "de",
    title: "Der Tagesausflug",
    titleTr: "Günübirlik gezi",
    summary: "Günübirlik bir geziyi planlamayı ve koşula bağlamayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "der Spaziergang", tr: "yürüyüş" },
      { de: "die Bootsfahrt", tr: "tekne gezisi" },
      { de: "der Freizeitpark", tr: "lunapark" },
      { de: "der Zoo", tr: "hayvanat bahçesi" },
      { de: "die Raststätte", tr: "dinlenme tesisi" },
      { de: "die Eintrittskarte", tr: "giriş bileti" },
      { de: "die Tour", tr: "tur" },
      { de: "bummeln", tr: "dolaşmak" },
    ],
    patterns: [
      { de: "Wenn das Wetter gut ist, machen wir eine Bootsfahrt.", tr: "planı koşula bağlar" },
      { de: "Wie viel kostet die Eintrittskarte?", tr: "bilet fiyatını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün günübirlik bir gezi planlıyoruz. Plan havaya bağlı olunca koşul cümlesi kurmak gerekiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Koşul cümlesinde fiil en sona gider ve koşul başta olduğunda ana cümlede özne fiilin arkasına düşer. Türkçede koşul fiile yapışan bir ektir ve fiil zaten sondadır, o yüzden bizde hiçbir şey yer değiştirmez; Almancada iki şey birden değişir. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Spaziergang"),
          tr("Türkçesi 'yürüyüş' demek; gezinti anlamında. Lütfen"),
          de("der Spaziergang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Spaziergang" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Bootsfahrt"),
          tr("Türkçesi 'tekne gezisi' demek. Lütfen"),
          de("die Bootsfahrt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Bootsfahrt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Freizeitpark"),
          tr("Türkçesi 'lunapark' demek. Lütfen"),
          de("der Freizeitpark"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Freizeitpark" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Zoo"),
          tr("Türkçesi 'hayvanat bahçesi' demek. Lütfen"),
          de("der Zoo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Zoo" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Raststätte"),
          tr("Türkçesi 'dinlenme tesisi' demek; otoyol üstündeki mola yeri. Lütfen"),
          de("die Raststätte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Raststätte" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Eintrittskarte"),
          tr("Türkçesi 'giriş bileti' demek. Lütfen"),
          de("die Eintrittskarte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Eintrittskarte" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Tour"),
          tr("Türkçesi 'tur' demek. Lütfen"),
          de("die Tour"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Tour" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bummeln"),
          tr("Türkçesi 'oyalanarak dolaşmak' demek. Lütfen"),
          de("bummeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bummeln" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn das Wetter gut ist, machen wir eine Bootsfahrt."),
          tr(
            "Koşul cümlesinde fiil en sonda; virgülden sonra ana cümle fiille başlıyor ve özne onun arkasına düşüyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yağmur yağarsa hayvanat bahçesine gidiyoruz.' Almancası:"),
          de("Wenn es regnet, gehen wir in den Zoo."),
          tr("Lütfen"),
          de("Wenn es regnet, gehen wir in den Zoo"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wenn es regnet, gehen wir in den Zoo" },
      },
      {
        say: [tr("Sıra sende: 'Vaktimiz olursa şehirde dolaşırız.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn wir Zeit haben, bummeln wir durch die Stadt",
          hint: [
            tr("Koşul cümlesinde fiil sonda, ana cümlede fiil hemen virgülden sonra:"),
            de("Wenn wir Zeit haben, bummeln wir durch die Stadt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wie viel kostet die Eintrittskarte?"),
          tr("İki kelimelik soru kalıbı ve arkasından fiil; fiyat sormanın standart yolu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Sonraki dinlenme tesisinde mola veriyoruz.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "An der nächsten Raststätte machen wir eine Pause",
          hint: [
            tr("Yer ifadesi başta olduğu için özne fiilin arkasına düşer:"),
            de("An der nächsten Raststätte machen wir eine Pause."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn das Wetter gut ist, machen wir eine Bootsfahrt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn das Wetter gut ist, machen wir eine Bootsfahrt.",
          answer: true,
          why: [
            tr(
              "Koşul cümlesinde fiil en sonda, ana cümlede fiil hemen virgülden sonra ve özne arkada: iki kural da yerinde.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi bir günlük gezi planlıyorsunuz ve planı havaya bağlıyorsunuz.")],
      },
    ],
    roleplay: {
      scene:
        "Pazar günü için bir gezi planlıyorsunuz ama hava belirsiz. İki ayrı plan öner: hava güzel olursa ne, kötü olursa ne yapacaksınız.",
      partner: "her ihtimale karşı plan isteyen bir arkadaş",
      opening: "Am Sonntag wollen wir doch raus. Was machen wir, wenn es regnet?",
      openingTr: "Pazar günü dışarı çıkacaktık ya. Yağmur yağarsa ne yaparız?",
      goal: "İki koşullu plan kurulmuş, bilet ya da ücret konuşulmuş ve buluşma saati kararlaştırılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-camping",
    icon: "nature",
    level: "A2",
    course: "de",
    title: "Auf dem Campingplatz",
    titleTr: "Kampta",
    summary: "Kamp alanında neyin olup olmadığını sormayı öğretir.",
    minutes: 10,
    focusId: "Es-gibt",
    vocab: [
      { de: "der Campingplatz", tr: "kamp alanı" },
      { de: "das Zelt", tr: "çadır" },
      { de: "das Lagerfeuer", tr: "kamp ateşi" },
      { de: "das Wohnmobil", tr: "karavan" },
      { de: "angeln", tr: "balık tutmak" },
      { de: "das Messer", tr: "bıçak" },
      { de: "der Bach", tr: "dere" },
      { de: "braten", tr: "kızartmak" },
    ],
    patterns: [
      { de: "Gibt es hier Duschen?", tr: "bir şeyin olup olmadığını sorar" },
      { de: "Es gibt einen Bach hinter dem Platz.", tr: "neyin olduğunu bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kamp alanındayız. Bir yerde neyin olup olmadığını sormanın Almanca yolunu öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "'Var' kalıbı Almancada beklenmedik biçimde kuruluyor: kişisiz bir özne ve 'vermek' fiili. Kelimesi kelimesine 'o veriyor' demek ama anlamı 'var'. Ardından gelen isim özne değil nesne sayılır ve belirtme hâline girer. Bu, Türkçe konuşan için en çok hata yapılan kalıplardan biri. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Campingplatz"),
          tr("Türkçesi 'kamp alanı' demek. Lütfen"),
          de("der Campingplatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Campingplatz" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Zelt"),
          tr("Türkçesi 'çadır' demek. Lütfen"),
          de("das Zelt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Zelt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Lagerfeuer"),
          tr("Türkçesi 'kamp ateşi' demek. Lütfen"),
          de("das Lagerfeuer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Lagerfeuer" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Wohnmobil"),
          tr("Türkçesi 'karavan' demek. Lütfen"),
          de("das Wohnmobil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wohnmobil" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("angeln"),
          tr("Türkçesi 'balık tutmak' demek. Lütfen"),
          de("angeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "angeln" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Messer"),
          tr("Türkçesi 'bıçak' demek. Lütfen"),
          de("das Messer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Messer" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Bach"),
          tr("Türkçesi 'dere' demek. Lütfen"),
          de("der Bach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bach" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("braten"),
          tr("Türkçesi 'kızartmak' demek. Lütfen"),
          de("braten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "braten" },
      },
      {
        say: [
          tr("İlk kalıbımız bir soru:"),
          de("Gibt es hier Duschen?"),
          tr("Fiil başta olduğu için soru; kişisiz özne onun hemen arkasında."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kamp alanında bir dere var.' Almancası:"),
          de("Auf dem Campingplatz gibt es einen Bach."),
          tr("Lütfen"),
          de("Auf dem Campingplatz gibt es einen Bach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Auf dem Campingplatz gibt es einen Bach" },
      },
      {
        say: [tr("Sıra sende: 'Burada bir kamp ateşi var mı?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Gibt es hier ein Lagerfeuer",
          hint: [
            tr("Fiil başta, kişisiz özne arkasında ve isim belirtme hâlinde:"),
            de("Gibt es hier ein Lagerfeuer?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Es gibt einen Bach hinter dem Platz."),
          tr(
            "Eril isim burada belirtme hâlinde. En sık hata bu: kalıp 'var' anlamına geldiği için isim yalın kalır sanılıyor.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Dedem her pazar gölde balık tutar.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Opa angelt jeden Sonntag am See",
          hint: [
            tr("Sıklık bildiren zaman ifadesi belirtme hâline girer ve yer bildiren edat yönelme hâlini getirir:"),
            de("Mein Opa angelt jeden Sonntag am See."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es gibt ein Bach hinter dem Platz."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es gibt ein Bach hinter dem Platz.",
          answer: false,
          why: [
            tr("Bu kalıptan sonra isim belirtme hâline girer; eril isimde artikel değişir. Doğrusu:"),
            de("Es gibt einen Bach hinter dem Platz."),
          ],
        },
      },
      {
        say: [tr("Şimdi kamp alanına vardın ve neyin olduğunu soruyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir kamp alanına yeni vardın. Görevliye neyin olup olmadığını sor: duş, elektrik, alışveriş imkânı. Bir de nerede ateş yakabileceğini öğren.",
      partner: "kamp alanının kurallarını iyi bilen bir görevli",
      opening: "Grüß Sie! Zelt oder Wohnmobil?",
      openingTr: "Merhaba! Çadır mı, karavan mı?",
      goal: "En az üç imkân sorulmuş, bir kural öğrenilmiş ve yer seçilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-stadtfuehrung",
    icon: "culture",
    level: "A2",
    course: "de",
    title: "Die Stadtführung",
    titleTr: "Şehir turu",
    summary: "Şehir turunda gezilen yerleri ve tarihini anlatmayı öğretir.",
    minutes: 10,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Kirche", tr: "kilise" },
      { de: "das Schloss", tr: "şato" },
      { de: "das Museum", tr: "müze" },
      { de: "die Ausstellung", tr: "sergi" },
      { de: "die Brücke", tr: "köprü" },
      { de: "der Brunnen", tr: "çeşme" },
      { de: "der Stadtplan", tr: "şehir haritası" },
      { de: "der Tourist", tr: "turist" },
    ],
    patterns: [
      { de: "Diese Kirche ist fast 800 Jahre alt.", tr: "bir yapının yaşını söyler" },
      { de: "Früher war hier ein Markt.", tr: "burada eskiden ne olduğunu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün şehir turundayız. Rehber geçmişten söz ediyor ve sen de duyduklarını anlatabilmelisin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Rehberler geçmişi anlatırken Perfekt değil, kısa geçmiş biçimlerini kullanır. Olmak ve sahip olmak fiillerini modül 1'de görmüştün; şehir anlatısında bunlar sürekli karşına çıkacak. Bir de yapıların yaşını söyleyen bir kalıp öğreneceğiz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Kirche"),
          tr("Türkçesi 'kilise' demek. Lütfen"),
          de("die Kirche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kirche" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Schloss"),
          tr("Türkçesi 'şato, saray' demek. Lütfen"),
          de("das Schloss"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schloss" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Museum"),
          tr("Türkçesi 'müze' demek. Lütfen"),
          de("das Museum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Museum" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Ausstellung"),
          tr("Türkçesi 'sergi' demek. Lütfen"),
          de("die Ausstellung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ausstellung" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Brücke"),
          tr("Türkçesi 'köprü' demek. Lütfen"),
          de("die Brücke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Brücke" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Brunnen"),
          tr("Türkçesi 'çeşme' demek. Lütfen"),
          de("der Brunnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Brunnen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Stadtplan"),
          tr("Türkçesi 'şehir haritası' demek. Lütfen"),
          de("der Stadtplan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stadtplan" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Tourist"),
          tr("Türkçesi 'turist' demek. Lütfen"),
          de("der Tourist"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tourist" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Diese Kirche ist fast 800 Jahre alt."),
          tr(
            "Yaş söylerken sayı, zaman birimi ve sıfat bu sırayla gelir. Zaman birimi çoğul olsa da bu kalıpta hep aynı biçimde kalır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pazar meydanında güzel bir çeşme var.' Almancası:"),
          de("Auf dem Marktplatz gibt es einen schönen Brunnen."),
          tr("Lütfen"),
          de("Auf dem Marktplatz gibt es einen schönen Brunnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Auf dem Marktplatz gibt es einen schönen Brunnen" },
      },
      {
        say: [tr("Sıra sende: 'Pazar günü bir şato gezdik.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Am Sonntag haben wir ein Schloss besichtigt",
          hint: [
            tr("Zaman ifadesi başta olduğu için özne fiilin arkasına düşer ve ortaç sona gider:"),
            de("Am Sonntag haben wir ein Schloss besichtigt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Früher war hier ein Markt."),
          tr("Olmak fiilinin kısa geçmişi; şehrin geçmişini anlatmanın en kısa yolu."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Yazın şehrimize çok turist geliyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Im Sommer kommen viele Touristen in unsere Stadt",
          hint: [
            tr("Zaman ifadesi başta, özne arkada ve yön bildiren edat belirtme hâlini getirir:"),
            de("Im Sommer kommen viele Touristen in unsere Stadt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Diese Kirche ist fast 800 Jahre alt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Diese Kirche ist fast 800 Jahre alt.",
          answer: true,
          why: [
            tr("Yaş kalıbında sayı, zaman birimi ve sıfat bu sırayla geliyor: cümle doğru."),
          ],
        },
      },
      {
        say: [tr("Şimdi bir şehir turundasın ve rehbere soru soruyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir şehir turundasın. Rehbere gördüğün yapıları sor, birinin yaşını ve geçmişini öğren ve bir de yakında ne olduğunu sor.",
      partner: "şehrin tarihini anlatmaktan hoşlanan bir rehber",
      opening: "Hier stehen wir vor dem ältesten Gebäude der Stadt. Haben Sie Fragen?",
      openingTr: "Şu an şehrin en eski binasının önündeyiz. Sorunuz var mı?",
      goal: "En az iki yapı hakkında soru sorulmuş, biri hakkında geçmiş bilgisi alınmış ve bir sonraki durak öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-souvenirs",
    icon: "gift",
    level: "A2",
    course: "de",
    title: "Souvenirs kaufen",
    titleTr: "Hediyelik",
    summary: "Kime ne alacağını konuşmayı ve hediyelik seçmeyi öğretir.",
    minutes: 10,
    focusId: "Dativ",
    vocab: [
      { de: "das Andenken", tr: "hatıra eşyası" },
      { de: "typisch", tr: "tipik" },
      { de: "originell", tr: "özgün" },
      { de: "handlich", tr: "kullanışlı" },
      { de: "der Becher", tr: "kupa" },
      { de: "die Kette", tr: "kolye" },
      { de: "das Wechselgeld", tr: "para üstü" },
      { de: "die Kosmetik", tr: "kozmetik" },
    ],
    patterns: [
      { de: "Ich kaufe meiner Schwester ein Andenken.", tr: "kime ne aldığını söyler" },
      { de: "Was ist typisch für diese Stadt?", tr: "yöreye özgü olanı sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hediyelik alıyoruz. Kime ne alacağını söylerken modül 4'te çalıştığın hâl yine karşına çıkacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Alan kişi yönelme hâlinde ve alınan şeyden önce geliyor. Bir de yöreye özgü olanı soran bir kalıp öğreneceğiz; onun içindeki edat belirtme hâlini getiriyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Andenken"),
          tr("Türkçesi 'hatıra eşyası' demek. Lütfen"),
          de("das Andenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Andenken" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("typisch"),
          tr("Türkçesi 'tipik, ona özgü' demek. Lütfen"),
          de("typisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "typisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("originell"),
          tr("Türkçesi 'özgün, sıra dışı' demek. Lütfen"),
          de("originell"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "originell" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("handlich"),
          tr("Türkçesi 'kullanışlı, taşıması kolay' demek. Lütfen"),
          de("handlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "handlich" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Becher"),
          tr("Türkçesi 'kupa' demek. Lütfen"),
          de("der Becher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Becher" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Kette"),
          tr("Türkçesi 'kolye' demek. Lütfen"),
          de("die Kette"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kette" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Wechselgeld"),
          tr("Türkçesi 'para üstü' demek. Lütfen"),
          de("das Wechselgeld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wechselgeld" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Kosmetik"),
          tr("Türkçesi 'kozmetik' demek. Lütfen"),
          de("die Kosmetik"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kosmetik" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich kaufe meiner Schwester ein Andenken."),
          tr("Alan kişi yönelme hâlinde ve önde; alınan şey belirtme hâlinde ve arkada."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kız kardeşime küçük bir hediyelik aldım.' Almancası:"),
          de("Ich habe meiner Schwester ein kleines Andenken gekauft."),
          tr("Lütfen"),
          de("Ich habe meiner Schwester ein kleines Andenken gekauft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe meiner Schwester ein kleines Andenken gekauft" },
      },
      {
        say: [tr("Sıra sende: 'Anneme bir kolye alıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kaufe meiner Mutter eine Kette",
          hint: [
            tr("Alan kişi yönelme hâlinde ve önde:"),
            de("Ich kaufe meiner Mutter eine Kette."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Was ist typisch für diese Stadt?"),
          tr("Yöreye özgü olanı sorar. Buradaki edat belirtme hâlini getiriyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Satıcı bana para üstünü verdi.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Die Verkäuferin hat mir das Wechselgeld gegeben",
          hint: [
            tr("Alan kişi yönelme hâlinde ve verilen şeyden önce:"),
            de("Die Verkäuferin hat mir das Wechselgeld gegeben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich kaufe meine Schwester ein Andenken."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich kaufe meine Schwester ein Andenken.",
          answer: false,
          why: [
            tr("Alan kişi yönelme hâlinde olmalı; yazılan biçimde kız kardeş satın alınan şey gibi duruyor. Doğrusu:"),
            de("Ich kaufe meiner Schwester ein Andenken."),
          ],
        },
      },
      {
        say: [tr("Şimdi hediyelik dükkânındasın ve kime ne alacağını konuşuyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Tatilin son günü hediyelik dükkânındasın. Yöreye özgü ne olduğunu sor, iki kişiye hediye seç ve fiyatları öğren.",
      partner: "yöreye özgü ürünleri öneren bir dükkân sahibi",
      opening: "Suchen Sie ein Mitbringsel? Ich zeige Ihnen etwas Typisches.",
      openingTr: "Hediyelik mi arıyorsunuz? Size yöreye özgü bir şey göstereyim.",
      goal: "En az iki kişiye hediye seçilmiş, biri için sebep söylenmiş ve ödeme yapılıp para üstü konuşulmuş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-reise-problem",
    icon: "train",
    level: "A2",
    course: "de",
    title: "Der Zug hat Verspätung",
    titleTr: "Seyahat aksiliği",
    summary: "Yolculuktaki aksiliği anlatmayı ve yeni bir yol bulmayı öğretir.",
    minutes: 10,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "die Verspätung", tr: "gecikme" },
      { de: "eintreffen", tr: "varmak" },
      { de: "umkehren", tr: "geri dönmek" },
      { de: "der Fahrschein", tr: "bilet" },
      { de: "der Schaffner", tr: "kondüktör" },
      { de: "das Abteil", tr: "kompartıman" },
      { de: "die Endstation", tr: "son durak" },
      { de: "die Zugfahrt", tr: "tren yolculuğu" },
    ],
    patterns: [
      { de: "Unser Zug hat Verspätung.", tr: "gecikmeyi bildirir" },
      { de: "Wir müssen bis zur Endstation fahren.", tr: "nereye kadar gideceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde yolculuk aksadı. Uçuş iptal oldu ve trenle devam ediyorsunuz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aksilik anlatırken kuralsız ortaçlar yine karşına çıkıyor; bugünkü fiillerden biri hem kuralsız hem de ayrılabilen ve yer değiştiren bir fiil, yani üç kural bir arada. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Verspätung"),
          tr("Türkçesi 'gecikme' demek. Lütfen"),
          de("die Verspätung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Verspätung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("eintreffen"),
          tr("Türkçesi 'varmak, ulaşmak' demek. Lütfen"),
          de("eintreffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "eintreffen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("umkehren"),
          tr("Türkçesi 'geri dönmek' demek. Lütfen"),
          de("umkehren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umkehren" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Fahrschein"),
          tr("Türkçesi 'bilet' demek. Lütfen"),
          de("der Fahrschein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Fahrschein" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Schaffner"),
          tr("Türkçesi 'kondüktör' demek. Lütfen"),
          de("der Schaffner"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schaffner" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Abteil"),
          tr("Türkçesi 'kompartıman' demek. Lütfen"),
          de("das Abteil"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Abteil" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Endstation"),
          tr("Türkçesi 'son durak' demek. Lütfen"),
          de("die Endstation"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Endstation" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Zugfahrt"),
          tr("Türkçesi 'tren yolculuğu' demek. Lütfen"),
          de("die Zugfahrt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Zugfahrt" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Unser Zug hat Verspätung."),
          tr(
            "Gecikme bir sıfat değil, bir isim olarak kullanılıyor ve artikelsiz duruyor. Türkçedeki 'trenimiz gecikmeli' ile aynı işi görür.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Trenimiz maalesef on beş dakika gecikmeli.' Almancası:"),
          de("Unser Zug hat leider 15 Minuten Verspätung."),
          tr("Lütfen"),
          de("Unser Zug hat leider 15 Minuten Verspätung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Unser Zug hat leider 15 Minuten Verspätung" },
      },
      {
        say: [tr("Sıra sende: 'Tren tam zamanında vardı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Zug ist pünktlich eingetroffen",
          hint: [
            de("eintreffen"),
            tr("hem yer değiştiren hem kuralsız hem de ayrılabilen bir fiil:"),
            de("Der Zug ist pünktlich eingetroffen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir müssen bis zur Endstation fahren."),
          tr("İki edat art arda geliyor ve ikincisi yönelme hâlini getiriyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kondüktör biletlerimizi görmek istiyor.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Schaffner möchte unsere Fahrscheine sehen",
          hint: [
            tr("Kip fiili ikinci sırada, asıl fiil sonda ve nesne belirtme hâlinde:"),
            de("Der Schaffner möchte unsere Fahrscheine sehen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Zug hat pünktlich eingetroffen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Zug hat pünktlich eingetroffen.",
          answer: false,
          why: [
            de("eintreffen"),
            tr("yer değiştiren bir fiil; ikinci yardımcı fiili değil birinciyi alır. Doğrusu:"),
            de("Der Zug ist pünktlich eingetroffen."),
          ],
        },
      },
      {
        say: [tr("Şimdi yolculuğun aksadı ve yeni bir yol bulman gerekiyor.")],
      },
    ],
    roleplay: {
      scene:
        "Uçuşun iptal oldu ve trenle devam etmeye karar verdin. Gişedeki görevliye durumu anlat, bir bilet al ve kaçta varacağını öğren.",
      partner: "tren gişesinde çalışan bir görevli",
      opening: "Guten Tag. Wohin möchten Sie fahren?",
      openingTr: "İyi günler. Nereye gitmek istiyorsunuz?",
      goal: "Durum anlatılmış, bilet alınmış ve varış saati ile aktarma öğrenilmiş olur.",
      minTurns: 8,
    },
  },
];

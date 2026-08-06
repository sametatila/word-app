import { de, tr, type Lesson } from "../types";

/**
 * A2 · Parti 9 — Medya ve teknoloji (konular 081-090).
 *
 * Modülün asıl konusu ekran değil, YAN CÜMLE. `wenn` bağlacı burada dört
 * derse yayılıyor ve her seferinde başka bir yüzüyle geliyor: kuralın kendisi
 * (081), yan cümlenin arkaya alınmış hâli (082), kip fiiliyle birlikte (084)
 * ve resmî bir sahnede (089). Türkçeyle karşıtlık modülün omurgası: bizde
 * koşul fiile yapışan bir ektir ve fiil zaten sondadır, o yüzden hiçbir şey
 * yer değiştirmez; Almancada bağlaç fiili sona iter ve ana cümlenin sırasını
 * da bozar. Öğrencinin en çok takıldığı yer burası.
 *
 * İkinci hat, fiillerin kendi edatları (085, 088): Türkçede fiil ekle
 * çalışırken Almancada fiilin yanında ezberlenmesi gereken bir edat var.
 * 087 üstünlük derecesini, 086 sen-emrini tazeliyor; 090 ise modülü Perfekt
 * ile kapatıyor — bir günlük telefonsuz deney, geçmişi anlatmanın doğal
 * bahanesi.
 */
export const deA2B09: Lesson[] = [
  {
    id: "de-a2-wenn",
    icon: "calendar",
    level: "A2",
    course: "de",
    title: "Wenn ich Zeit habe",
    titleTr: "Koşul: wenn",
    summary: "Koşul cümlesi kurmayı ve ana cümlenin sırasının nasıl değiştiğini öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "normalerweise", tr: "normalde" },
      { de: "meistens", tr: "çoğunlukla" },
      { de: "sonst", tr: "yoksa" },
      { de: "die Gelegenheit", tr: "fırsat" },
      { de: "sich melden", tr: "haber vermek" },
    ],
    patterns: [
      { de: "Wenn ich Zeit habe, rufe ich dich an.", tr: "koşulu ve sonucunu söylerken kullanılır" },
      { de: "Wenn …, dann …", tr: "koşulun sonucunu vurgularken kullanılır" },
      { de: "Immer wenn …", tr: "her seferinde olan bir şeyi anlatırken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Gürültü dersinde bir bağlaç tanımıştın: fiili cümlenin sonuna iten bağlaç. Bugün onu tam olarak öğreneceğiz, çünkü Almancada plan yapmanın yolu ondan geçiyor. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede koşulu fiile yapışan bir ekle kurarız: 'vaktim olursa'. Fiil zaten sonda olduğu için cümlede hiçbir şey yer değiştirmez. Almancada ise bağlaç fiili sona itiyor ve dahası, ana cümlenin sırasını da bozuyor. İşin şaşırtan kısmı bu ikincisi. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("normalerweise"),
          tr("Türkçesi 'normalde' demek. Lütfen"),
          de("normalerweise"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "normalerweise" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("meistens"),
          tr("Türkçesi 'çoğunlukla' demek. Lütfen"),
          de("meistens"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "meistens" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sonst"),
          tr("Türkçesi 'yoksa' demek. Lütfen"),
          de("sonst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sonst" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Gelegenheit"),
          tr("Türkçesi 'fırsat' demek. Lütfen"),
          de("die Gelegenheit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Gelegenheit" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich melden"),
          tr("Türkçesi 'haber vermek' demek. Lütfen"),
          de("sich melden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich melden" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wenn ich Zeit habe, rufe ich dich an."),
          tr(
            "Yani 'Vaktim olursa seni ararım'. İki şeye birden dikkat et. Birinci yarıda fiil en sona gitti. İkinci yarıda ise fiil hemen başa geçti ve sen fiilin arkasına düştün, çünkü birinci yarının tamamı cümlenin birinci öğesi sayılıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wenn ich Zeit habe, rufe ich dich an"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wenn ich Zeit habe, rufe ich dich an" },
      },
      {
        say: [tr("Sıra sende: 'Yağmur yağarsa evde kalırım.'")],
        expect: {
          kind: "produce",
          target: "Wenn es regnet, bleibe ich zu Hause",
          hint: [
            tr("Birinci yarıda fiil sona, ikinci yarıda fiil başa gider:"),
            de("Wenn es regnet, bleibe ich zu Hause."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci yarıyı vurgulamak istersen araya küçük bir kelime konur ve sıra değişmez:"),
          de("Wenn ich Zeit habe, dann melde ich mich."),
          tr("Yani 'Vaktim olursa o zaman haber veririm'. Lütfen"),
          de("Wenn ich Zeit habe, dann melde ich mich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wenn ich Zeit habe, dann melde ich mich" },
      },
      {
        say: [
          tr(
            "Şimdi bu bağlacın ikinci işi. Türkçede iki ayrı ek kullanırız: 'olursa' ve 'olduğunda'. Almancada ikisi de aynı bağlaçla söylenir; hangisi olduğunu cümlenin gerisi belli eder:",
          ),
          de("Immer wenn ich Zeit habe, gehe ich schwimmen."),
          tr("Yani 'Ne zaman vaktim olsa yüzmeye giderim'. Baştaki kelime 'her seferinde' anlamını veriyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Immer wenn ich Zeit habe, gehe ich schwimmen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Immer wenn ich Zeit habe, gehe ich schwimmen" },
      },
      {
        say: [tr("Şimdi sen kur: 'Fırsat olursa haber veririm.'")],
        expect: {
          kind: "produce",
          target: "Wenn ich eine Gelegenheit habe, melde ich mich",
          hint: [
            tr("Koşul yarısında fiil sonda, ana yarıda fiil hemen başta:"),
            de("Wenn ich eine Gelegenheit habe, melde ich mich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich Zeit habe, ich rufe dich an."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich Zeit habe, ich rufe dich an.",
          answer: false,
          why: [
            tr("Koşul yarısı cümlenin birinci öğesi sayılır; o yüzden ana yarıda fiil öne geçmeli. Doğrusu:"),
            de("Wenn ich Zeit habe, rufe ich dich an."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık koşul kurabiliyorsun ve bu, Almancada plan yapmanın anahtarı. Şimdi bir arkadaşını arıyorsun: hafta sonu için henüz kesin bir şey söyleyemiyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın seni hafta sonu için arıyor ama programın belirsiz. Neye bağlı olduğunu koşul cümleleriyle anlat, ne zaman haber vereceğini söyle ve bir yedek plan üzerinde anlaşın.",
      partner: "kesin cevap almadan telefonu kapatmayan bir arkadaş",
      opening: "Und, was machst du am Samstag? Hast du schon Pläne?",
      openingTr: "Ee, cumartesi ne yapıyorsun? Planın var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-serien",
    icon: "media",
    level: "A2",
    course: "de",
    title: "Welche Serie schaust du?",
    titleTr: "Diziler",
    summary: "Dizi konuşmayı ve yan cümleyi cümlenin arkasına almayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "die Staffel", tr: "sezon" },
      { de: "der Schauspieler", tr: "oyuncu" },
      { de: "die Handlung", tr: "konu" },
      { de: "der Held", tr: "kahraman" },
      { de: "süchtig", tr: "bağımlı" },
    ],
    patterns: [
      { de: "Ich schaue weiter, wenn eine Folge endet.", tr: "koşulu cümlenin arkasına alırken kullanılır" },
      { de: "Ich kann nicht aufhören.", tr: "bırakamadığını söylerken kullanılır" },
      { de: "Die zweite Staffel ist besser.", tr: "sezonları karşılaştırırken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Herkesin bir dizisi var ve konu açılınca kimse susmuyor. Bugün dizi konuşmayı öğreneceğiz. Yeni bir kural yok ama geçen dersteki yapıyı ters çevireceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Koşul yarısı hep başta durmak zorunda değil. Arkaya alırsan ana cümle bozulmadan kalır ve cümle daha rahat söylenir. Almanlar günlük konuşmada çoğu zaman bunu tercih ediyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Staffel"),
          tr("Türkçesi 'sezon' demek. Lütfen"),
          de("die Staffel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Staffel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Schauspieler"),
          tr("Türkçesi 'oyuncu' demek. Lütfen"),
          de("der Schauspieler"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schauspieler" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Handlung"),
          tr("Türkçesi 'konu, olay örgüsü' demek. Lütfen"),
          de("die Handlung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Handlung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Held"),
          tr("Türkçesi 'kahraman' demek. Lütfen"),
          de("der Held"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Held" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("süchtig"),
          tr("Türkçesi 'bağımlı' demek. Lütfen"),
          de("süchtig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "süchtig" },
      },
      {
        say: [
          tr("Geçen derste koşulu başa koymuştuk. Şimdi arkaya alalım:"),
          de("Ich schaue weiter, wenn eine Folge endet."),
          tr(
            "Yani 'Bir bölüm bitince devam ediyorum'. Ana cümle bozulmadan kaldı; koşul yarısında ise fiil yine en sonda. Yani tek kural değişmedi: bağlaçtan sonra fiil sona gider.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich schaue weiter, wenn eine Folge endet"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich schaue weiter, wenn eine Folge endet" },
      },
      {
        say: [tr("Sıra sende: 'Bir sezon bitince üzülüyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich bin traurig, wenn eine Staffel endet",
          hint: [
            tr("Ana cümle önde kalır, bağlaçtan sonra fiil sona gider:"),
            de("Ich bin traurig, wenn eine Staffel endet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Diziyi anlatırken en çok kuracağın cümleler şunlar:"),
          de("Die Handlung ist spannend."),
          tr("ve"),
          de("Der Schauspieler ist wirklich gut."),
          tr("Lütfen"),
          de("Die Handlung ist spannend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Handlung ist spannend" },
      },
      {
        say: [
          tr("Bırakamadığını söylemek için iki hazır cümle var:"),
          de("Ich kann nicht aufhören."),
          tr("ve daha abartılısı:"),
          de("Ich bin richtig süchtig."),
          tr("Lütfen"),
          de("Ich kann nicht aufhören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich kann nicht aufhören" },
      },
      {
        say: [tr("Şimdi sezonları karşılaştır: 'İkinci sezon daha iyi.'")],
        expect: {
          kind: "produce",
          target: "Die zweite Staffel ist besser",
          hint: [
            tr("Sıra sayısı başta, karşılaştırma en sonda:"),
            de("Die zweite Staffel ist besser."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich schaue weiter, wenn eine Folge endet."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich schaue weiter, wenn eine Folge endet.",
          answer: true,
          why: [
            tr("Doğru. Ana cümle önde bozulmadan duruyor ve bağlaçtan sonra fiil sona gitmiş:"),
            de("Ich schaue weiter, wenn eine Folge endet."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık dizi konuşmasına rahatça girebilirsin. Şimdi öğle molasındasın ve iş arkadaşın herkesin izlediği diziden bahsediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Öğle molasında iş arkadaşınla dizi konuşuyorsunuz. Ne izlediğini anlat, konusunu ve oyuncularını değerlendir, onun önerisine cevap ver ve hangi sezonun daha iyi olduğunu tartışın.",
      partner: "her diziyi bir hafta sonunda bitiren bir iş arkadaşı",
      opening: "Sag mal, schaust du eigentlich auch diese neue Serie?",
      openingTr: "Söylesene, sen de bu yeni diziyi izliyor musun?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-nachrichten",
    icon: "media",
    level: "A2",
    course: "de",
    title: "Hast du das gehört?",
    titleTr: "Haberler",
    summary: "Duyduğun bir haberi aktarmayı ve inanmadığını söylemeyi öğretir.",
    minutes: 9,
    focusId: "Nebensatz-dass",
    vocab: [
      { de: "glauben", tr: "inanmak" },
      { de: "die Schlagzeile", tr: "manşet" },
      { de: "berichten", tr: "haber vermek" },
      { de: "die Quelle", tr: "kaynak" },
      { de: "der Unsinn", tr: "saçmalık" },
    ],
    patterns: [
      { de: "Ich habe gelesen, dass …", tr: "okuduğun bir haberi aktarırken kullanılır" },
      { de: "Das glaube ich nicht.", tr: "inanmadığını söylerken kullanılır" },
      { de: "Wo hast du das gelesen?", tr: "kaynağı sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir haber duydun ve birine anlatacaksın. Bugün duyduğunu aktarmayı, inanmadığını söylemeyi ve kaynağı sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Başkasının söylediğini aktarırken Almanca bir bağlaç kullanır ve o bağlaç da fiili sona iter. İş yeri dersinde bunu görmüştün; bugün haber aktarırken kullanacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("glauben"),
          tr("Türkçesi 'inanmak' demek. Lütfen"),
          de("glauben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "glauben" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Schlagzeile"),
          tr("Türkçesi 'manşet' demek. Lütfen"),
          de("die Schlagzeile"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schlagzeile" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("berichten"),
          tr("Türkçesi 'haber vermek' demek. Lütfen"),
          de("berichten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "berichten" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Quelle"),
          tr("Türkçesi 'kaynak' demek. Lütfen"),
          de("die Quelle"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Quelle" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Unsinn"),
          tr("Türkçesi 'saçmalık' demek. Lütfen"),
          de("der Unsinn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Unsinn" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe gelesen, dass der Bus nicht fährt."),
          tr(
            "Yani 'Otobüsün çalışmadığını okudum'. Bağlaçtan sonraki yarıda fiil en sona gitti. Türkçede de aktarma cümlesinde fiil sonda durur, o yüzden burada iki dil aynı yöne bakıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe gelesen, dass der Bus nicht fährt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe gelesen, dass der Bus nicht fährt" },
      },
      {
        say: [tr("Sıra sende: 'Yarın yağmur yağacağını duydum.' Bunu 'yağmur yağıyor' diye kur.")],
        expect: {
          kind: "produce",
          target: "Ich habe gehört, dass es morgen regnet",
          hint: [
            tr("Bağlaçtan sonraki yarıda fiil en sona gider:"),
            de("Ich habe gehört, dass es morgen regnet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Habere inanmadıysan cevabın kısa olur:"),
          de("Das glaube ich nicht."),
          tr("Daha sert söylemek istersen:"),
          de("Das ist doch Unsinn!"),
          tr("Lütfen"),
          de("Das glaube ich nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das glaube ich nicht" },
      },
      {
        say: [
          tr("Almanya'da bir habere inanmadan önce hep aynı şey sorulur:"),
          de("Wo hast du das gelesen?"),
          tr("Yani 'Bunu nerede okudun?' Kaynağı sormak kabalık sayılmaz, tersine iyi karşılanır. Lütfen"),
          de("Wo hast du das gelesen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo hast du das gelesen" },
      },
      {
        say: [tr("Şimdi sen bir kuşku belirt: 'Kaynağın iyi olmadığına inanıyorum.' Bunu 'kaynak iyi değil' diye kur.")],
        expect: {
          kind: "produce",
          target: "Ich glaube, dass die Quelle nicht gut ist",
          hint: [
            tr("Bağlaçtan sonra fiil en sona gider, olumsuzluk onun önünde kalır:"),
            de("Ich glaube, dass die Quelle nicht gut ist."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe gelesen, dass fährt der Bus nicht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe gelesen, dass fährt der Bus nicht.",
          answer: false,
          why: [
            tr("Bağlaçtan sonra fiil öne geçmez, en sona gider. Doğrusu:"),
            de("Ich habe gelesen, dass der Bus nicht fährt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir haberi aktarabilir ve şüpheni belli edebilirsin. Şimdi apartmanın önünde komşunla karşılaştın ve elinde gazete var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Komşun sana duyduğu bir haberi anlatıyor. Haberi dinle, inanıp inanmadığını söyle, kaynağını sor ve kendi duyduğun bir haberi de aktar.",
      partner: "her duyduğuna hemen inanan, heyecanlı bir komşu",
      opening: "Haben Sie das schon gehört? Es steht heute in allen Zeitungen!",
      openingTr: "Duydunuz mu? Bugün bütün gazetelerde var!",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-social-media",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Zu viel am Handy",
    titleTr: "Ekran süresi",
    summary: "Telefonda geçen zamanı konuşmayı ve koşulu kip fiiliyle kurmayı öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "das Handy", tr: "cep telefonu" },
      { de: "der Bildschirm", tr: "ekran" },
      { de: "die App", tr: "uygulama" },
      { de: "verbringen", tr: "geçirmek" },
      { de: "ablenken", tr: "dikkati dağıtmak" },
    ],
    patterns: [
      { de: "Ich verbringe zu viel Zeit mit dem Handy.", tr: "bir şeyle çok vakit geçirdiğini söyler" },
      { de: "Wenn ich das Handy weglege, kann ich besser arbeiten.", tr: "koşulu kip fiiliyle kurarken kullanılır" },
      { de: "Das lenkt mich ab.", tr: "dikkatinin dağıldığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Telefonu elinden bırakamamak herkesin derdi. Bugün ekran süresini konuşmayı öğreneceğiz ve koşul cümlesini bu kez bir kip fiiliyle kuracağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ana cümlede kip fiili varsa bir şey değişmez: kip fiili öne geçer, asıl fiil yine en sonda kalır. İki kural aynı cümlede çalışır ve bu, kulağını en çok geliştiren alıştırmadır. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Handy"),
          tr("Türkçesi 'cep telefonu' demek. Lütfen"),
          de("das Handy"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handy" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Bildschirm"),
          tr("Türkçesi 'ekran' demek. Lütfen"),
          de("der Bildschirm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Bildschirm" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die App"),
          tr("Türkçesi 'uygulama' demek. Lütfen"),
          de("die App"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die App" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verbringen"),
          tr("Türkçesi 'geçirmek' demek. Lütfen"),
          de("verbringen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verbringen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("ablenken"),
          tr("Türkçesi 'dikkatini dağıtmak' demek. Lütfen"),
          de("ablenken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ablenken" },
      },
      {
        say: [
          tr("İlk kalıbımız bir itiraf:"),
          de("Ich verbringe zu viel Zeit mit dem Handy."),
          tr(
            "Yani 'Telefonla çok fazla vakit geçiriyorum'. Buradaki edat sana tanıdık: araç ya da eşlik bildiren edat, arkasından gelen kelimeyi hep aynı biçime sokuyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich verbringe zu viel Zeit mit dem Handy"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich verbringe zu viel Zeit mit dem Handy" },
      },
      {
        say: [tr("Sıra sende: 'Uygulamalarla çok fazla vakit geçiriyorum.' Uygulamalar çoğul.")],
        expect: {
          kind: "produce",
          target: "Ich verbringe zu viel Zeit mit den Apps",
          hint: [
            tr("Çoğul kelimeler bu edattan sonra sonuna bir harf alır:"),
            de("Ich verbringe zu viel Zeit mit den Apps."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi koşulu kip fiiliyle kuralım:"),
          de("Wenn ich das Handy weglege, kann ich besser arbeiten."),
          tr(
            "Koşul yarısında fiil sona gitti; ana yarıda ise kip fiili öne geçti ve asıl fiil en sonda kaldı. Yani iki yarıda da fiil kendi yerini biliyor.",
          ),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Wenn ich das Handy weglege, kann ich besser arbeiten"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Wenn ich das Handy weglege, kann ich besser arbeiten",
        },
      },
      {
        say: [tr("Şimdi sen kur: 'Ekran açıkken uyuyamıyorum.' Bunu 'ekran açık olursa' diye kur.")],
        expect: {
          kind: "produce",
          target: "Wenn der Bildschirm an ist, kann ich nicht schlafen",
          hint: [
            tr("Koşul yarısında fiil sonda, ana yarıda kip fiili başta, asıl fiil en sonda:"),
            de("Wenn der Bildschirm an ist, kann ich nicht schlafen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sebebini tek cümleyle özetlemek istersen:"),
          de("Das lenkt mich ab."),
          tr("Yani 'Dikkatimi dağıtıyor'. Lütfen"),
          de("Das lenkt mich ab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das lenkt mich ab" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich das Handy weglege, kann ich besser arbeiten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich das Handy weglege, kann ich besser arbeiten.",
          answer: true,
          why: [
            tr("Doğru. Koşul yarısında fiil sonda, ana yarıda kip fiili öne geçmiş ve asıl fiil sonda kalmış:"),
            de("Wenn ich das Handy weglege, kann ich besser arbeiten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ekran süreni anlatabilir ve koşulu kip fiiliyle kurabilirsin. Şimdi bir arkadaşınla oturuyorsun ve o telefonuna bakmayı bırakmıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla oturuyorsunuz ama o sürekli telefonuna bakıyor. Bunun seni rahatsız ettiğini kibarca söyle, kendi alışkanlığını itiraf et ve birlikte bir kural önerin.",
      partner: "telefonunu savunan ama haksız olduğunu bilen bir arkadaş",
      opening: "Sorry, ich schaue nur kurz. Störe ich dich damit?",
      openingTr: "Pardon, kısacık bakıyorum. Bu seni rahatsız mı ediyor?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-warten-auf",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Ich warte auf deine Antwort",
    titleTr: "Edatlı fiiller",
    summary: "Bazı fiillerin kendi edatıyla birlikte ezberlenmesi gerektiğini öğretir.",
    minutes: 9,
    focusId: "Verben-mit-Präpositionen",
    vocab: [
      { de: "warten auf", tr: "beklemek" },
      { de: "die Antwort", tr: "cevap" },
      { de: "die Geduld", tr: "sabır" },
      { de: "ungeduldig", tr: "sabırsız" },
      { de: "sich erinnern", tr: "hatırlamak" },
    ],
    patterns: [
      { de: "Ich warte auf deine Antwort.", tr: "birinden cevap beklerken kullanılır" },
      { de: "Ich denke an dich.", tr: "birini düşündüğünü söylerken kullanılır" },
      { de: "Ich erinnere mich an das Treffen.", tr: "bir şeyi hatırladığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almancanın ezber isteyen ama karşılığını fazlasıyla veren bir konusu var: kendi edatı olan fiiller. Bir kez öğrenince yüzlerce cümle kuruluyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede fiil ekle çalışır: 'cevabı bekliyorum' deriz, ek isme gelir. Almancada ise bazı fiillerin yanında sabit bir edat vardır ve o edat mantıkla bulunmaz, fiille birlikte ezberlenir. Bu yüzden bugün fiilleri hep edatıyla söyleyeceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("warten auf"),
          tr("Türkçesi 'beklemek' demek. Edatı da birlikte söyleyin. Lütfen"),
          de("warten auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "warten auf" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Antwort"),
          tr("Türkçesi 'cevap' demek. Lütfen"),
          de("die Antwort"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Antwort" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Geduld"),
          tr("Türkçesi 'sabır' demek. Lütfen"),
          de("die Geduld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Geduld" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ungeduldig"),
          tr("Türkçesi 'sabırsız' demek. Lütfen"),
          de("ungeduldig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ungeduldig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich erinnern"),
          tr("Türkçesi 'hatırlamak' demek. Lütfen"),
          de("sich erinnern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich erinnern" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich warte auf deine Antwort."),
          tr(
            "Yani 'Cevabını bekliyorum'. Türkçeden bakınca edat fazlalık gibi durur ama Almancada onsuz olmaz. Üstelik bu edattan sonra kelime nesne biçimine girer.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich warte auf deine Antwort"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich warte auf deine Antwort" },
      },
      {
        say: [tr("Sıra sende: 'Otobüsü bekliyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich warte auf den Bus",
          hint: [
            tr("Fiilin edatı düşmez ve otobüs nesne biçimine girer:"),
            de("Ich warte auf den Bus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci fiilimizin edatı başka:"),
          de("Ich denke an dich."),
          tr(
            "Yani 'Seni düşünüyorum'. Türkçede burada hiçbir edat yok; Almanca ise bu fiili kendi edatıyla kullanır. Aynı edat hatırlamak fiilinde de karşımıza çıkıyor:",
          ),
          de("Ich erinnere mich an das Treffen."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich denke an dich"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich denke an dich" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Ailemi düşünüyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich denke an meine Familie",
          hint: [
            tr("Bu fiilin edatı sabittir ve arkasından gelen kelime nesne biçiminde durur:"),
            de("Ich denke an meine Familie."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Beklemek uzarsa iki cümle işine yarar:"),
          de("Ich habe keine Geduld mehr."),
          tr("ve"),
          de("Ich werde langsam ungeduldig."),
          tr("Lütfen"),
          de("Ich habe keine Geduld mehr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe keine Geduld mehr" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich warte deine Antwort."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich warte deine Antwort.",
          answer: false,
          why: [
            tr("Bu fiil edatsız kullanılmaz. Doğrusu:"),
            de("Ich warte auf deine Antwort."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık üç fiili edatıyla biliyorsun ve bu, Almancanın kapılarından birini açıyor. Şimdi telefondasın: bir arkadaşın günlerdir cevap vermiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Günlerdir cevap vermeyen bir arkadaşını aradın. Ne beklediğini söyle, sabrının tükendiğini nazikçe belli et, onun açıklamasını dinle ve yeni bir söz alın.",
      partner: "sürekli mesaj yazmayı unutan, mahcup bir arkadaş",
      opening: "Oh nein, ich wollte dir gestern schreiben! Bist du sauer?",
      openingTr: "Eyvah, dün sana yazacaktım! Bana kızdın mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-computerproblem",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Der Computer spinnt",
    titleTr: "Bilgisayar sorunu",
    summary: "Bir arkadaşa teknik yardım verirken kısa emirler kurmayı öğretir.",
    minutes: 8,
    focusId: "Imperativ-du",
    vocab: [
      { de: "der Computer", tr: "bilgisayar" },
      { de: "speichern", tr: "kaydetmek" },
      { de: "abstürzen", tr: "çökmek" },
      { de: "das Programm", tr: "program" },
      { de: "der Akku", tr: "batarya" },
    ],
    patterns: [
      { de: "Starte den Computer neu!", tr: "arkadaşına ne yapması gerektiğini söylerken kullanılır" },
      { de: "Hast du gespeichert?", tr: "kaydedip kaydetmediğini sorarken kullanılır" },
      { de: "Es funktioniert wieder.", tr: "sorunun çözüldüğünü söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir arkadaşının bilgisayarı çöktü ve senden yardım istiyor. Bugün kısa emirlerle yol göstermeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "A1'de arkadaşça öğüt vermeyi öğrenmiştin: fiil başa gelir ve kişi hiç söylenmez. Bugün aynı biçimi teknik yardımda kullanacağız; bir de öneki ayrılan fiillerde ne olduğunu göreceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Computer"),
          tr("Türkçesi 'bilgisayar' demek. Lütfen"),
          de("der Computer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Computer" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("speichern"),
          tr("Türkçesi 'kaydetmek' demek. Lütfen"),
          de("speichern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "speichern" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("abstürzen"),
          tr("Türkçesi 'çökmek' demek. Lütfen"),
          de("abstürzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abstürzen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
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
          de("der Akku"),
          tr("Türkçesi 'batarya' demek. Lütfen"),
          de("der Akku"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Akku" },
      },
      {
        say: [
          tr("Sorun şöyle anlatılır:"),
          de("Das Programm ist abgestürzt."),
          tr("Günlük konuşmada daha kısası da var:"),
          de("Der Computer spinnt."),
          tr("Yani 'Bilgisayar çıldırdı'. Almanlar bozulan her aygıt için bunu söyler."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Computer spinnt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Computer spinnt" },
      },
      {
        say: [
          tr("Şimdi yardım sırası. Arkadaşına emir verirken fiil başa gelir, kişi söylenmez:"),
          de("Starte den Computer neu!"),
          tr(
            "Dikkat et: fiilin öneki yine cümlenin sonuna düştü. Emirde bile o kural değişmiyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Starte den Computer neu"), tr("deyin.")],
        expect: { kind: "repeat", target: "Starte den Computer neu" },
      },
      {
        say: [tr("Sıra sende: 'Programı kaydet!'")],
        expect: {
          kind: "produce",
          target: "Speichere das Programm",
          hint: [
            tr("Emirde fiil başa gelir ve kişi söylenmez:"),
            de("Speichere das Programm!"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yardım ederken en çok soracağın soru şu:"),
          de("Hast du gespeichert?"),
          tr("Bir de bataryayı sorarsın:"),
          de("Ist der Akku leer?"),
          tr("Lütfen"),
          de("Hast du gespeichert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hast du gespeichert" },
      },
      {
        say: [tr("Şimdi sen sorunun bittiğini söyle: 'Yine çalışıyor.'")],
        expect: {
          kind: "produce",
          target: "Es funktioniert wieder",
          hint: [
            tr("Kısa bir cümle yeter, sonunda 'yine' durur:"),
            de("Es funktioniert wieder."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Starte du den Computer neu!"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Starte du den Computer neu!",
          answer: false,
          why: [
            tr("Arkadaşa verilen emirde kişi hiç söylenmez. Doğrusu:"),
            de("Starte den Computer neu!"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık teknik yardım verebilirsin. Şimdi telefonun çaldı: bir arkadaşın panik hâlinde ve sunumu kaybolmuş.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın bilgisayarı çöktüğü için seni aradı. Sorunun ne olduğunu sor, adım adım ne yapması gerektiğini emir cümleleriyle söyle ve sonunda çözülüp çözülmediğini öğren.",
      partner: "teknolojiden hiç anlamayan, panik hâlinde bir arkadaş",
      opening: "Hilfe, alles ist weg! Was soll ich jetzt machen?",
      openingTr: "İmdat, her şey gitti! Şimdi ne yapayım?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-fotos-teilen",
    icon: "camera",
    level: "A2",
    course: "de",
    title: "Schau mal, meine Fotos",
    titleTr: "Fotoğraf paylaşma",
    summary: "Fotoğraflarını gösterirken en üstün derecede sıfat kullanmayı öğretir.",
    minutes: 8,
    focusId: "Superlativ",
    vocab: [
      { de: "teilen", tr: "paylaşmak" },
      { de: "die Aussicht", tr: "manzara" },
      { de: "der Sonnenuntergang", tr: "gün batımı" },
      { de: "lustig", tr: "komik" },
      { de: "das Album", tr: "albüm" },
    ],
    patterns: [
      { de: "Das ist das schönste Foto.", tr: "en beğendiğin şeyi söylerken kullanılır" },
      { de: "Die Aussicht war am schönsten.", tr: "bir şeyin en üstün olduğunu söylerken kullanılır" },
      { de: "Zeig mal!", tr: "birinden göstermesini isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Tatilden döndün ve telefonunda yüzlerce fotoğraf var. Bugün 'en güzel', 'en komik' demeyi öğreneceğiz. Almancada bunun iki biçimi var ve hangisini kullanacağın cümlenin şekline bağlı. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede tek bir kelime yeter: 'en güzel'. Almancada sıfat ismin önündeyse başka, cümlenin sonunda yalnız duruyorsa başka bir biçim alır. Bugün ikisini de göreceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("teilen"),
          tr("Türkçesi 'paylaşmak' demek. Lütfen"),
          de("teilen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "teilen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Aussicht"),
          tr("Türkçesi 'manzara' demek. Lütfen"),
          de("die Aussicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Aussicht" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Sonnenuntergang"),
          tr("Türkçesi 'gün batımı' demek. Lütfen"),
          de("der Sonnenuntergang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sonnenuntergang" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("lustig"),
          tr("Türkçesi 'komik' demek. Lütfen"),
          de("lustig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lustig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Album"),
          tr("Türkçesi 'albüm' demek. Lütfen"),
          de("das Album"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Album" },
      },
      {
        say: [
          tr("İlk biçim, sıfat ismin önündeyken:"),
          de("Das ist das schönste Foto."),
          tr(
            "Yani 'Bu en güzel fotoğraf'. Sıfat ismin önüne geçtiği için sonuna bir ek aldı ve önüne de bir kelime geldi.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist das schönste Foto"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist das schönste Foto" },
      },
      {
        say: [tr("Sıra sende: 'Bu en komik fotoğraf.'")],
        expect: {
          kind: "produce",
          target: "Das ist das lustigste Foto",
          hint: [
            tr("Sıfat ismin önünde durduğu için ek alır:"),
            de("Das ist das lustigste Foto."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci biçim, sıfat cümlenin sonunda yalnız kalınca:"),
          de("Die Aussicht war am schönsten."),
          tr(
            "Yani 'Manzara en güzeldi'. Burada isim yok, o yüzden sıfat başka bir biçime giriyor. Aynı fark Türkçede yok, bu yüzden ikisini birlikte duymak iyi olur:",
          ),
          de("Das schönste Foto ist vom Sonnenuntergang."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Die Aussicht war am schönsten"), tr("deyin.")],
        expect: { kind: "repeat", target: "Die Aussicht war am schönsten" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Gün batımı en güzeldi.'")],
        expect: {
          kind: "produce",
          target: "Der Sonnenuntergang war am schönsten",
          hint: [
            tr("Sıfat cümlenin sonunda yalnız kaldığı için öteki biçimi alır:"),
            de("Der Sonnenuntergang war am schönsten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşındaki merak edince şunu duyarsın:"),
          de("Zeig mal!"),
          tr("Sen de albümü paylaşırsın:"),
          de("Ich teile das Album mit dir."),
          tr("Lütfen"),
          de("Ich teile das Album mit dir"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich teile das Album mit dir" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Aussicht war am schönsten."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Aussicht war am schönsten.",
          answer: true,
          why: [
            tr("Doğru. Sıfat cümlenin sonunda yalnız durduğu için bu biçimi aldı:"),
            de("Die Aussicht war am schönsten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık fotoğraflarını anlatabilirsin. Şimdi bir arkadaşınla kahvedesin ve telefonu ona uzatıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Tatil fotoğraflarını bir arkadaşına gösteriyorsun. Hangi fotoğrafın en güzel olduğunu söyle, nerede çekildiğini anlat, en komik anı anlat ve albümü paylaşmayı teklif et.",
      partner: "her fotoğrafa ayrı yorum yapan, hevesli bir arkadaş",
      opening: "Warst du wirklich dort? Zeig mal, wie war das Wetter?",
      openingTr: "Gerçekten orada mıydın? Göstersene, hava nasıldı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-podcast",
    icon: "music",
    level: "A2",
    course: "de",
    title: "Mein Lieblingspodcast",
    titleTr: "Podcast önerisi",
    summary: "Bir yayının konusunu anlatmayı ve neye ilgi duyduğunu söylemeyi öğretir.",
    minutes: 9,
    focusId: "Verben-mit-Präpositionen",
    vocab: [
      { de: "der Podcast", tr: "podcast" },
      { de: "das Thema", tr: "konu" },
      { de: "sich interessieren für", tr: "ilgi duymak" },
      { de: "der Moderator", tr: "sunucu" },
      { de: "unterhaltsam", tr: "eğlenceli" },
    ],
    patterns: [
      { de: "Es geht um Geschichte.", tr: "bir yayının konusunu söylerken kullanılır" },
      { de: "Ich interessiere mich für Musik.", tr: "neye ilgi duyduğunu söylerken kullanılır" },
      { de: "Hör mal rein!", tr: "birine bir yayını önerirken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Yolda, mutfakta, sporda: podcast dinlemek Almanya'da çok yaygın. Bugün bir yayını anlatmayı ve neye ilgi duyduğunu söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen derste fiillerin kendi edatı olduğunu görmüştük. Bugün iki tane daha ekleyeceğiz ve ikisi de sohbetin ortasında sürekli karşına çıkacak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Podcast"),
          tr("Türkçesi 'podcast' demek. Lütfen"),
          de("der Podcast"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Podcast" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Thema"),
          tr("Türkçesi 'konu' demek. Lütfen"),
          de("das Thema"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Thema" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sich interessieren für"),
          tr("Türkçesi 'ilgi duymak' demek. Edatını da birlikte söyleyin. Lütfen"),
          de("sich interessieren für"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich interessieren für" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Moderator"),
          tr("Türkçesi 'sunucu' demek. Lütfen"),
          de("der Moderator"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Moderator" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unterhaltsam"),
          tr("Türkçesi 'eğlenceli' demek. Lütfen"),
          de("unterhaltsam"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unterhaltsam" },
      },
      {
        say: [
          tr("Bir yayının konusunu söylemek için hazır bir kalıp var:"),
          de("Es geht um Geschichte."),
          tr(
            "Yani 'Konusu tarih'. Baştaki kelime hiçbir şeyi göstermiyor, tıpkı hava cümlelerindeki gibi sadece cümleyi ayakta tutuyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es geht um Geschichte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es geht um Geschichte" },
      },
      {
        say: [tr("Sıra sende: 'Konusu müzik.'")],
        expect: {
          kind: "produce",
          target: "Es geht um Musik",
          hint: [
            tr("Kalıp aynı kalır, yalnızca konu değişir:"),
            de("Es geht um Musik."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi kendi ilgini söyle. Bu fiil hem dönüşlü hem de kendi edatı olan bir fiil:"),
          de("Ich interessiere mich für Geschichte."),
          tr(
            "Yani 'Tarihe ilgi duyuyorum'. Üç parçası da birlikte ezberlenir: fiil, dönüşlü kelime ve edat.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich interessiere mich für Geschichte"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich interessiere mich für Geschichte" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Müziğe ilgi duyuyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich interessiere mich für Musik",
          hint: [
            tr("Fiil, dönüşlü kelime ve edat birlikte durur:"),
            de("Ich interessiere mich für Musik."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Beğendiğin yayını önerirken kısa konuşulur:"),
          de("Der Moderator ist sehr unterhaltsam."),
          tr("ve sonunda:"),
          de("Hör mal rein!"),
          tr("Yani 'Bir dinle bakalım'. Lütfen"),
          de("Hör mal rein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hör mal rein" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich interessiere mich über Musik."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich interessiere mich über Musik.",
          answer: false,
          why: [
            tr("Bu fiilin edatı başkadır ve değiştirilemez. Doğrusu:"),
            de("Ich interessiere mich für Musik."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir yayını anlatabilir ve ilgi alanını söyleyebilirsin. Şimdi bir arkadaşınla yürüyüştesin ve kulaklığını çıkarıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla yürüyüşteyken sevdiğin podcasti anlatıyorsun. Konusunu anlat, sunucusunu değerlendir, neye ilgi duyduğunu söyle ve ona da öneri sor.",
      partner: "podcast dinlemeyi hiç denememiş, meraklı bir arkadaş",
      opening: "Du hörst ja ständig etwas. Worum geht es denn diesmal?",
      openingTr: "Sürekli bir şey dinliyorsun. Bu seferki ne hakkında?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-online-termin",
    icon: "tech",
    level: "A2",
    course: "de",
    title: "Der Online-Termin",
    titleTr: "Görüntülü görüşme",
    summary: "Görüntülü görüşmede bağlantı sorunlarını kibarca çözmeyi öğretir.",
    minutes: 9,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "die Verbindung", tr: "bağlantı" },
      { de: "das Mikrofon", tr: "mikrofon" },
      { de: "die Kamera", tr: "kamera" },
      { de: "stumm", tr: "sessiz" },
      { de: "unterbrechen", tr: "kesmek" },
    ],
    patterns: [
      { de: "Wenn die Verbindung schlecht ist, rufe ich Sie an.", tr: "sorun çıkarsa ne yapacağını söyler" },
      { de: "Man hört Sie nicht.", tr: "karşı tarafın duyulmadığını söylerken kullanılır" },
      { de: "Kamera an, bitte.", tr: "kamerayı açmasını isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Görüntülü bir görüşmedesin ve karşı taraf donuyor. Bugün bağlantı sorunlarını kibarca söylemeyi öğreneceğiz. Resmî bir sahne olduğu için hep siz diliyle konuşacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste koşul cümlesi son kez karşına çıkıyor, bu kez resmî bir konuşmanın içinde. Bir de Almancanın 'duyulmuyor' demek için kullandığı özneyi göreceksin: kişi belirsizse cümle boş bırakılmıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Verbindung"),
          tr("Türkçesi 'bağlantı' demek. Lütfen"),
          de("die Verbindung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Verbindung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Mikrofon"),
          tr("Türkçesi 'mikrofon' demek. Lütfen"),
          de("das Mikrofon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Mikrofon" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Kamera"),
          tr("Türkçesi 'kamera' demek. Lütfen"),
          de("die Kamera"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kamera" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("stumm"),
          tr("Türkçesi 'sessiz' demek. Lütfen"),
          de("stumm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stumm" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unterbrechen"),
          tr("Türkçesi 'kesmek, bölmek' demek. Lütfen"),
          de("unterbrechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unterbrechen" },
      },
      {
        say: [
          tr("İlk kalıbımız bir koşul, bu kez resmî:"),
          de("Wenn die Verbindung schlecht ist, rufe ich Sie an."),
          tr(
            "Yani 'Bağlantı kötü olursa sizi ararım'. Kural aynı: koşul yarısında fiil sonda, ana yarıda fiil hemen başta.",
          ),
        ],
      },
      {
        say: [
          tr("Lütfen"),
          de("Wenn die Verbindung schlecht ist, rufe ich Sie an"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Wenn die Verbindung schlecht ist, rufe ich Sie an",
        },
      },
      {
        say: [tr("Sıra sende: 'Sizi duyamazsam yazarım.' Bunu 'sizi duymuyorum' diye kur.")],
        expect: {
          kind: "produce",
          target: "Wenn ich Sie nicht höre, schreibe ich Ihnen",
          hint: [
            tr("Koşul yarısında fiil sonda, ana yarıda fiil başta durur:"),
            de("Wenn ich Sie nicht höre, schreibe ich Ihnen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşı tarafı duyamıyorsan Almanca kimseyi suçlamaz, belirsiz bir özne kullanır:"),
          de("Man hört Sie nicht."),
          tr(
            "Yani 'Sesiniz gelmiyor'. Sebebi de çoğu zaman aynıdır:",
          ),
          de("Ihr Mikrofon ist stumm."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Man hört Sie nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Man hört Sie nicht" },
      },
      {
        say: [tr("Şimdi sen rica et: 'Kamera açık, lütfen.' Kısa biçimini kullan.")],
        expect: {
          kind: "produce",
          target: "Kamera an, bitte",
          hint: [
            tr("Görüntülü görüşmede cümle çok kısalır:"),
            de("Kamera an, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Konuşmanın ortasında araya girmen gerekirse kibar biçimi şu:"),
          de("Darf ich kurz unterbrechen?"),
          tr("Bağlantı koptuysa da kısaca özür dilersin:"),
          de("Entschuldigung, ich war kurz weg."),
          tr("Lütfen"),
          de("Darf ich kurz unterbrechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darf ich kurz unterbrechen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn die Verbindung schlecht ist, rufe ich Sie an."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn die Verbindung schlecht ist, rufe ich Sie an.",
          answer: true,
          why: [
            tr("Doğru. Koşul yarısında fiil sonda, ana yarıda fiil öne geçmiş durumda:"),
            de("Wenn die Verbindung schlecht ist, rufe ich Sie an."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık görüntülü bir görüşmeyi yönetebilirsin. Şimdi ekranın karşısındasın: randevun başladı ama ses gelmiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Resmî bir kurumla görüntülü randevun başladı ama teknik sorunlar var. Sesin gelmediğini kibarca söyle, kamerayı açmasını rica et, bağlantı kopmasına karşı bir plan öner ve görüşmeyi sürdür.",
      partner: "teknikle arası pek iyi olmayan, resmî konuşan bir görevli",
      opening: "Guten Tag, können Sie mich sehen? Ich glaube, es gibt ein Problem.",
      openingTr: "İyi günler, beni görebiliyor musunuz? Sanırım bir sorun var.",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-digital-detox",
    icon: "nature",
    level: "A2",
    course: "de",
    title: "Ein Tag ohne Handy",
    titleTr: "Dijital mola",
    summary: "Telefonsuz geçen bir günü anlatmayı ve o gün ne hissettiğini söylemeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "ausprobieren", tr: "denemek" },
      { de: "komisch", tr: "tuhaf" },
      { de: "die Stille", tr: "sessizlik" },
      { de: "sich langweilen", tr: "canı sıkılmak" },
      { de: "der Versuch", tr: "deneme" },
    ],
    patterns: [
      { de: "Ich habe es ausprobiert.", tr: "bir şeyi denediğini anlatırken kullanılır" },
      { de: "Zuerst war es komisch.", tr: "başlangıçtaki hissini anlatırken kullanılır" },
      { de: "Danach habe ich mich besser gefühlt.", tr: "sonrasındaki hissini anlatırken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bir gün boyunca telefonu kapatmak: Almanya'da çok konuşulan bir deney. Bugün böyle bir günü anlatmayı öğreneceğiz ve bunun için geçmiş zamanı kullanacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ders modülü kapatıyor. Yeni bir kural yok; olan biteni anlatan yapıyı ve duyguları anlatan tek parçalı biçimi bir arada kullanacaksın. İyi bir hikâye zaten ikisini birden ister. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("ausprobieren"),
          tr("Türkçesi 'denemek' demek. Lütfen"),
          de("ausprobieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausprobieren" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("komisch"),
          tr("Türkçesi 'tuhaf' demek. Lütfen"),
          de("komisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "komisch" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Stille"),
          tr("Türkçesi 'sessizlik' demek. Lütfen"),
          de("die Stille"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stille" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sich langweilen"),
          tr("Türkçesi 'canı sıkılmak' demek. Lütfen"),
          de("sich langweilen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich langweilen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Versuch"),
          tr("Türkçesi 'deneme' demek. Lütfen"),
          de("der Versuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Versuch" },
      },
      {
        say: [
          tr("Hikâye şöyle açılıyor:"),
          de("Ich habe einen Tag ohne Handy ausprobiert."),
          tr(
            "Öneki ayrılan fiilin geçmiş biçimini hatırlıyorsun: geçmiş eki kelimenin ortasına girdi ve fiil cümlenin en sonunda kaldı.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe einen Tag ohne Handy ausprobiert"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe einen Tag ohne Handy ausprobiert" },
      },
      {
        say: [tr("Sıra sende: 'Bir deneme yaptım.'")],
        expect: {
          kind: "produce",
          target: "Ich habe einen Versuch gemacht",
          hint: [
            tr("Yardımcı fiil ikinci sırada, geçmiş biçimi en sonda:"),
            de("Ich habe einen Versuch gemacht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Duyguyu anlatırken tek parçalı biçim kullanılır:"),
          de("Zuerst war es komisch."),
          tr("Sonra hikâye ilerler:"),
          de("Dann habe ich mich gelangweilt."),
          tr("Lütfen"),
          de("Zuerst war es komisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zuerst war es komisch" },
      },
      {
        say: [tr("Şimdi sen anlat: 'Sonra canım sıkıldı.'")],
        expect: {
          kind: "produce",
          target: "Dann habe ich mich gelangweilt",
          hint: [
            tr("Sıralama kelimesi başta, yardımcı fiil hemen arkasında, geçmiş biçimi en sonda:"),
            de("Dann habe ich mich gelangweilt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonu iyi bitiyor:"),
          de("Danach habe ich mich besser gefühlt."),
          tr("ve sebebini de söylersin:"),
          de("Die Stille war schön."),
          tr("Lütfen"),
          de("Danach habe ich mich besser gefühlt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Danach habe ich mich besser gefühlt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zuerst war es komisch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zuerst war es komisch.",
          answer: true,
          why: [
            tr("Doğru. Duygu ve durum anlatılırken tek parçalı geçmiş biçimi kullanılır:"),
            de("Zuerst war es komisch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin: koşul kurabiliyor, fiilleri edatıyla kullanabiliyor ve bir deneyimi anlatabiliyorsun. Şimdi bir arkadaşın bu deneyi merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir gün boyunca telefonunu kapattın ve arkadaşın nasıl geçtiğini soruyor. Günü sırayla anlat, başta ve sonda ne hissettiğini söyle ve ona da denemesini önerip önermeyeceğine karar ver.",
      partner: "böyle bir şeyi asla yapamayacağını söyleyen bir arkadaş",
      opening: "Einen ganzen Tag ohne Handy? Wie hast du das ausgehalten?",
      openingTr: "Bütün bir gün telefonsuz mu? Buna nasıl dayandın?",
      minTurns: 4,
    },
  },
];

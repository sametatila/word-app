import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 6 — Alışveriş ve hizmetler (konular 051-060).
 *
 * Modülün omurgası karşılaştırma. Önce sıfatın sonuna gelen ek ve `als`
 * öğretiliyor, sonra üstünlük (`am …sten`), sonra ikisi gerçek satın alma
 * kararlarında çalıştırılıyor: iki ceket, iki tarife, iki gönderi biçimi.
 * Araya sıfat çekiminin ilk adımı giriyor — `ein` sonrası sıfatın ismin
 * cinsine göre sonunun değişmesi, ki bu Türkçe konuşan için tamamen yeni:
 * Türkçede sıfat hiç değişmez.
 *
 * Sözlükçe havuzun A2 katmanından geliyor. 054 bilerek renk ve desen dersine
 * çevrildi: sıfat çekimini sekiz kez tekrarlatmanın en doğal yolu sekiz renk
 * ve desen sıfatı vermek. `als` da sözlükçeye alındı — karşılaştırmanın
 * kendisini taşıyan kelime bu ve havuzda A2 madde başı olarak duruyor.
 */
export const deA2B06: Lesson[] = [
  {
    id: "de-a2-komparativ",
    icon: "chart",
    level: "A2",
    course: "de",
    title: "Größer, schneller, billiger",
    titleTr: "Karşılaştırma",
    summary: "İki şeyi karşılaştırmayı ve sıfatın sonundaki eki öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "der Unterschied", tr: "fark" },
      { de: "vergleichen", tr: "karşılaştırmak" },
      { de: "die Qualität", tr: "kalite" },
      { de: "preiswert", tr: "uygun fiyatlı" },
      { de: "stark", tr: "güçlü" },
      { de: "schwach", tr: "zayıf" },
      { de: "als", tr: "-den daha" },
      { de: "gigantisch", tr: "devasa" },
    ],
    patterns: [
      { de: "Das ist besser als das.", tr: "iki şeyi karşılaştırır" },
      { de: "Was ist der Unterschied?", tr: "aradaki farkı sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iki şeyi karşılaştırmayı öğreniyoruz. Türkçede 'daha' kelimesini sıfatın önüne koyarız; Almancada sıfatın sonuna bir ek gelir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İki adım var. Birincisi sıfatın sonuna gelen ek; kısa sıfatların çoğunda ortadaki sesli harf de değişir. İkincisi karşılaştırma kelimesi: Türkçedeki '-den' ekinin yerini tutar ve iki şeyin arasında durur. Bugün o kelimeyi de sözlükçeye alıyoruz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Unterschied"),
          tr("Türkçesi 'fark' demek. Lütfen"),
          de("der Unterschied"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Unterschied" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vergleichen"),
          tr("Türkçesi 'karşılaştırmak' demek. Lütfen"),
          de("vergleichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vergleichen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Qualität"),
          tr("Türkçesi 'kalite' demek. Lütfen"),
          de("die Qualität"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Qualität" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("preiswert"),
          tr("Türkçesi 'uygun fiyatlı' demek; ucuz değil, fiyatına değer anlamında. Lütfen"),
          de("preiswert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "preiswert" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("stark"),
          tr("Türkçesi 'güçlü' demek. Lütfen"),
          de("stark"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "stark" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("schwach"),
          tr("Türkçesi 'zayıf' demek. Lütfen"),
          de("schwach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwach" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("als"),
          tr("Karşılaştırmada Türkçesi '-den daha' demek; iki şeyin arasında durur. Lütfen"),
          de("als"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "als" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gigantisch"),
          tr("Türkçesi 'devasa, kocaman' demek. Lütfen"),
          de("gigantisch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gigantisch" },
      },
      {
        say: [
          tr("Şimdi eki duy. Sıfatın sonuna bir hece geliyor ve kısa sıfaklarda sesli harf değişiyor:"),
          de("stark – stärker, schwach – schwächer, groß – größer, alt – älter"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das ist besser als das."),
          tr(
            "Karşılaştırma kelimesi iki şeyin arasında. Türkçede '-den' eki isme yapışır; Almancada ayrı bir kelimedir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu ceket ötekinden daha uygun fiyatlı.' Almancası:"),
          de("Diese Jacke ist preiswerter als die andere."),
          tr("Lütfen"),
          de("Diese Jacke ist preiswerter als die andere"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Diese Jacke ist preiswerter als die andere" },
      },
      {
        say: [tr("Sıra sende: 'Kardeşim benden daha güçlü.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Bruder ist stärker als ich",
          hint: [
            tr("Sıfatın sesli harfi değişiyor ve karşılaştırılan kişi yalın hâlde kalıyor:"),
            de("Mein Bruder ist stärker als ich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Was ist der Unterschied?"),
          tr("Aradaki farkı sorar; mağazada iki ürün arasında karar verirken en işe yarayan soru."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Lütfen iki teklifi karşılaştırın.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Vergleichen Sie bitte die beiden Angebote",
          hint: [
            tr("Kibar emirde fiil başa geçer ve hitap hemen arkasından gelir:"),
            de("Vergleichen Sie bitte die beiden Angebote."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mein Bruder ist größer als ich."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mein Bruder ist größer als ich.",
          answer: true,
          why: [
            tr(
              "Sıfat karşılaştırma ekini almış, sesli harfi değişmiş ve karşılaştırma kelimesi doğru yerde: cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi mağazadasın ve iki ürünü karşılaştırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir elektronik mağazasındasın ve iki cihaz arasında karar veremiyorsun. Satış görevlisine farkı sor, fiyat ve kaliteyi karşılaştır ve bir karar ver.",
      partner: "iki ürünü de iyi bilen bir satış görevlisi",
      opening: "Kann ich Ihnen helfen? Suchen Sie etwas Bestimmtes?",
      openingTr: "Yardımcı olabilir miyim? Belirli bir şey mi arıyorsunuz?",
      goal: "İki ürün en az iki özellikte karşılaştırılmış ve sonunda biri seçilip sebebi söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-superlativ",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Am besten!",
    titleTr: "En üstünlük",
    summary: "Hepsinin arasından en iyisini söylemeyi ve indirimleri konuşmayı öğretir.",
    minutes: 10,
    focusId: "Superlativ",
    vocab: [
      { de: "beliebt", tr: "sevilen" },
      { de: "das Einkaufszentrum", tr: "alışveriş merkezi" },
      { de: "das Kaufhaus", tr: "büyük mağaza" },
      { de: "der Schlussverkauf", tr: "sezon sonu indirimi" },
      { de: "die Ermäßigung", tr: "indirim" },
      { de: "der Sonderpreis", tr: "özel fiyat" },
      { de: "der Stammkunde", tr: "sürekli müşteri" },
      { de: "das Preisschild", tr: "fiyat etiketi" },
    ],
    patterns: [
      { de: "Das ist am billigsten.", tr: "hepsinin arasından en ucuzu söyler" },
      { de: "Gibt es eine Ermäßigung?", tr: "indirim olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Geçen ders ikiyi karşılaştırdık. Bugün hepsinin arasından birini seçiyoruz ve bunun kendine has bir biçimi var. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "En üstünlük iki parçadan oluşuyor: sıfatın önünde kaynaşmış bir edat, sonunda ise bir hece. İkisi birlikte 'hepsinin en …' anlamını veriyor. Türkçede tek bir 'en' kelimesi yeter; Almanca bunu iki uçtan birden işaretler. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("beliebt"),
          tr("Türkçesi 'sevilen, rağbet gören' demek. Lütfen"),
          de("beliebt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beliebt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Einkaufszentrum"),
          tr("Türkçesi 'alışveriş merkezi' demek. Lütfen"),
          de("das Einkaufszentrum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Einkaufszentrum" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Kaufhaus"),
          tr("Türkçesi 'büyük mağaza' demek. Lütfen"),
          de("das Kaufhaus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kaufhaus" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Schlussverkauf"),
          tr("Türkçesi 'sezon sonu indirimi' demek. Lütfen"),
          de("der Schlussverkauf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Schlussverkauf" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Ermäßigung"),
          tr("Türkçesi 'indirim' demek; öğrenci ya da emekli indirimi gibi. Lütfen"),
          de("die Ermäßigung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ermäßigung" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Sonderpreis"),
          tr("Türkçesi 'özel fiyat' demek. Lütfen"),
          de("der Sonderpreis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sonderpreis" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Stammkunde"),
          tr("Türkçesi 'sürekli müşteri' demek. Lütfen"),
          de("der Stammkunde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stammkunde" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Preisschild"),
          tr("Türkçesi 'fiyat etiketi' demek. Lütfen"),
          de("das Preisschild"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Preisschild" },
      },
      {
        say: [
          tr("Şimdi üç basamağı bir arada duy:"),
          de("billig – billiger – am billigsten"),
          tr("Sırasıyla: düz sıfat, karşılaştırma, en üstünlük."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das ist am billigsten."),
          tr("Kaynaşmış edat önde, hece sonda. İkisi birlikte 'hepsinin en ucuzu' demek."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu mağazada en çok sevileni bu.' Almancası:"),
          de("In diesem Kaufhaus ist das am beliebtesten."),
          tr("Lütfen"),
          de("In diesem Kaufhaus ist das am beliebtesten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "In diesem Kaufhaus ist das am beliebtesten" },
      },
      {
        say: [tr("Sıra sende: 'Sezon sonu indiriminde en uygun fiyatlı.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Im Schlussverkauf ist es am preiswertesten",
          hint: [
            tr("Kaynaşmış edat önde, en üstünlük hecesi sonda:"),
            de("Im Schlussverkauf ist es am preiswertesten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Gibt es eine Ermäßigung?"),
          tr("'Var mı' kalıbı ile sorulur ve ardından gelen isim belirtme hâline girer."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Sürekli müşteri olarak indirim alıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Als Stammkunde bekomme ich eine Ermäßigung",
          hint: [
            tr("Sıfat gibi kullanılan edat başta olduğu için özne fiilin arkasına düşer:"),
            de("Als Stammkunde bekomme ich eine Ermäßigung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist der billigste als alle."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist der billigste als alle.",
          answer: false,
          why: [
            tr(
              "En üstünlükte karşılaştırma kelimesi kullanılmaz; o yalnız iki şey karşılaştırılırken gelir. Doğrusu:",
            ),
            de("Das ist am billigsten."),
          ],
        },
      },
      {
        say: [tr("Şimdi alışveriş merkezindesin ve en iyisini arıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Alışveriş merkezinde bir arkadaşınla dolaşıyorsunuz. Hangi mağazanın en ucuz, hangisinin en iyi olduğunu tartışın ve indirim olup olmadığını sorun.",
      partner: "her mağazayı bilen ve fiyat karşılaştırmayı seven bir arkadaş",
      opening: "Wo gehen wir zuerst hin? Wo ist es denn am günstigsten?",
      openingTr: "Önce nereye gidelim? En uygun olan neresi?",
      goal: "En az üç seçenek en üstünlük biçimiyle karşılaştırılmış ve nereye gidileceğine karar verilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-zwei-jacken",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Welche Jacke ist besser?",
    titleTr: "İki ürün kıyası",
    summary: "Kıyafet denerken tercih bildirmeyi ve iki seçenek arasında karar vermeyi öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "der Anzug", tr: "takım elbise" },
      { de: "die Mode", tr: "moda" },
      { de: "weich", tr: "yumuşak" },
      { de: "der Rock", tr: "etek" },
      { de: "entweder", tr: "ya" },
      { de: "dünn", tr: "ince" },
      { de: "bequem", tr: "rahat" },
      { de: "hässlich", tr: "çirkin" },
    ],
    patterns: [
      { de: "Entweder der Rock oder der Anzug.", tr: "iki seçeneği yan yana koyar" },
      { de: "Kann ich das anprobieren?", tr: "denemek için izin ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün mağazada iki kıyafet arasında karar veriyoruz. İki seçeneği yan yana koyan bir bağlaç çifti öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu bağlaç iki parçalıdır: birincisi ilk seçeneğin önünde, ikincisi ikinci seçeneğin önünde durur. Türkçedeki 'ya … ya da' ile birebir aynı işi görür. Bugün birincisini sözlükçeye alıyoruz. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Anzug"),
          tr("Türkçesi 'takım elbise' demek. Lütfen"),
          de("der Anzug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anzug" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Mode"),
          tr("Türkçesi 'moda' demek. Lütfen"),
          de("die Mode"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mode" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("weich"),
          tr("Türkçesi 'yumuşak' demek. Lütfen"),
          de("weich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Rock"),
          tr("Türkçesi 'etek' demek. Lütfen"),
          de("der Rock"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Rock" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("entweder"),
          tr("Türkçesi 'ya' demek; arkasından ikinci bir bağlaç gelir. Lütfen"),
          de("entweder"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "entweder" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("dünn"),
          tr("Türkçesi 'ince' demek. Lütfen"),
          de("dünn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dünn" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("bequem"),
          tr("Türkçesi 'rahat' demek. Lütfen"),
          de("bequem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bequem" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("hässlich"),
          tr("Türkçesi 'çirkin' demek. Lütfen"),
          de("hässlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hässlich" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Entweder der Rock oder der Anzug."),
          tr("İki seçenek yan yana. Her iki isim de yalın hâlde duruyor, çünkü ikisi de özne."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu pantolon ötekinden daha rahat.' Almancası:"),
          de("Diese Jacke ist bequemer als die andere."),
          tr("Lütfen"),
          de("Diese Jacke ist bequemer als die andere"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Diese Jacke ist bequemer als die andere" },
      },
      {
        say: [tr("Sıra sende: 'Bu etek daha yumuşak.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Dieser Rock ist weicher",
          hint: [
            tr("Eril isimde işaret sıfatı ek alır ve sıfata karşılaştırma eki gelir:"),
            de("Dieser Rock ist weicher."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Kann ich das anprobieren?"),
          tr("Kip fiili başta olduğu için soru; ayrılabilen fiil sonda ve bölünmemiş hâlde."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Ya eteği ya da takım elbiseyi alıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich nehme entweder den Rock oder den Anzug",
          hint: [
            tr("İki seçenek de nesne olduğu için ikisi de belirtme hâline girer:"),
            de("Ich nehme entweder den Rock oder den Anzug."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Diese Jacke ist bequemer wie die andere."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Diese Jacke ist bequemer wie die andere.",
          answer: false,
          why: [
            tr(
              "Karşılaştırmada kullanılan kelime bu değil; buradaki kelime benzerlik bildirir. Doğrusu:",
            ),
            de("Diese Jacke ist bequemer als die andere."),
          ],
        },
      },
      {
        say: [tr("Şimdi mağazada iki kıyafet arasında karar veriyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir mağazada iki kıyafet arasında kaldın ve satış görevlisinden yardım istiyorsun. Denemek için izin iste, ikisini karşılaştır ve bir karar ver.",
      partner: "ikisini de öven ama sonunda dürüst olan bir satış görevlisi",
      opening: "Die beiden stehen Ihnen gut. Welche gefällt Ihnen besser?",
      openingTr: "İkisi de size yakışıyor. Hangisini daha çok beğendiniz?",
      goal: "İkisi de denenmiş, en az iki özellikte karşılaştırılmış ve biri seçilip sebebi söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-adjektiv-ein",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Ein hellblaues Hemd",
    titleTr: "Sıfat çekimi",
    summary: "Renk ve desen sıfatlarıyla sıfat çekiminin ilk adımını öğretir.",
    minutes: 10,
    focusId: "Adjektivdeklination-Einstieg",
    vocab: [
      { de: "grün", tr: "yeşil" },
      { de: "grau", tr: "gri" },
      { de: "hellblau", tr: "açık mavi" },
      { de: "dunkelblau", tr: "koyu mavi" },
      { de: "bunt", tr: "rengârenk" },
      { de: "gestreift", tr: "çizgili" },
      { de: "kariert", tr: "kareli" },
      { de: "einfarbig", tr: "tek renkli" },
    ],
    patterns: [
      { de: "Ich suche ein hellblaues Hemd.", tr: "aradığın şeyi renkle tarif eder" },
      { de: "Haben Sie das auch einfarbig?", tr: "başka bir deseni sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Türkçe konuşan için tamamen yeni bir şey öğreniyoruz: Almancada sıfat, bir ismin önünde durduğunda sonu değişir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede sıfat hiç değişmez: yeşil ceket, yeşil gömlek, yeşil ayakkabı. Almancada ise sıfat ismin cinsine göre sonuna bir harf alır. Bugün en kolay hâlini çalışıyoruz: belirsiz artikelden sonra. Sekiz renk ve desen sıfatıyla aynı kuralı sekiz kez göreceksin. Önce kelimeler.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("grün"),
          tr("Türkçesi 'yeşil' demek. Lütfen"),
          de("grün"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "grün" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("grau"),
          tr("Türkçesi 'gri' demek. Lütfen"),
          de("grau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "grau" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("hellblau"),
          tr("Türkçesi 'açık mavi' demek. Lütfen"),
          de("hellblau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hellblau" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("dunkelblau"),
          tr("Türkçesi 'koyu mavi' demek. Lütfen"),
          de("dunkelblau"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dunkelblau" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("bunt"),
          tr("Türkçesi 'rengârenk' demek. Lütfen"),
          de("bunt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bunt" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("gestreift"),
          tr("Türkçesi 'çizgili' demek. Lütfen"),
          de("gestreift"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gestreift" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("kariert"),
          tr("Türkçesi 'kareli' demek. Lütfen"),
          de("kariert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kariert" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("einfarbig"),
          tr("Türkçesi 'tek renkli, desensiz' demek. Lütfen"),
          de("einfarbig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einfarbig" },
      },
      {
        say: [
          tr("Şimdi kuralı üç cinste birden duy. Aynı sıfat, üç ayrı son:"),
          de("ein grüner Rock, eine grüne Hose, ein grünes Hemd"),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich suche ein hellblaues Hemd."),
          tr(
            "Cinssiz bir isim, o yüzden sıfat 'es' ile bitiyor. Artikel ismin cinsini göstermediği zaman o işi sıfat üstleniyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yeşil bir etek arıyorum.' Almancası:"),
          de("Ich suche einen grünen Rock."),
          tr("Lütfen"),
          de("Ich suche einen grünen Rock"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich suche einen grünen Rock" },
      },
      {
        say: [tr("Sıra sende: 'Gri bir pantolon arıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich suche eine graue Hose",
          hint: [
            tr("Dişil bir isim, o yüzden sıfat sonuna bir harf alır:"),
            de("Ich suche eine graue Hose."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Haben Sie das auch einfarbig?"),
          tr("Sıfat burada bir ismin önünde değil, o yüzden hiç ek almıyor. Kural yalnız ismin önünde işler."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kareli bir gömlek istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte ein kariertes Hemd",
          hint: [
            tr("Cinssiz bir isimde sıfat iki harfle biter:"),
            de("Ich möchte ein kariertes Hemd."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich suche ein hellblaues Hemd."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich suche ein hellblaues Hemd.",
          answer: true,
          why: [
            tr(
              "İsim cinssiz ve belirsiz artikelden sonra geliyor; sıfat da o cinsi gösteren eki almış. Cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi mağazada belirli bir renk ve desen arıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir mağazada belirli bir renk ve desende kıyafet arıyorsun. Ne aradığını tarif et, gösterilenleri değerlendir ve başka bir renk ya da desen iste.",
      partner: "raflardan farklı seçenekler getiren bir satış görevlisi",
      opening: "Guten Tag! Suchen Sie etwas Bestimmtes?",
      openingTr: "İyi günler! Belirli bir şey mi arıyorsunuz?",
      goal: "Aranan renk ve desen tarif edilmiş, en az iki seçenek değerlendirilmiş ve biri seçilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-friseur",
    icon: "art",
    level: "A2",
    course: "de",
    title: "Beim Friseur",
    titleTr: "Kuaförde",
    summary: "Kuaförde ne istediğini anlatmayı ve sonucu değerlendirmeyi öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "der Friseursalon", tr: "kuaför salonu" },
      { de: "die Schere", tr: "makas" },
      { de: "föhnen", tr: "fön çekmek" },
      { de: "bürsten", tr: "fırçalamak" },
      { de: "sich kämmen", tr: "saçını taramak" },
      { de: "glänzend", tr: "parlak" },
      { de: "gepflegt", tr: "bakımlı" },
      { de: "sanft", tr: "nazik" },
    ],
    patterns: [
      { de: "Bitte etwas kürzer.", tr: "ne kadar kısaltılacağını söyler" },
      { de: "Können Sie mir die Haare föhnen?", tr: "ek bir hizmet ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün kuaförde ne istediğini anlatmayı öğreniyoruz. Burada karşılaştırma biçimi çok işine yarayacak: daha kısa, daha koyu, daha az. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kuaförde istekler hep karşılaştırma biçimiyle söylenir, çünkü bir ölçü değil bir yön belirtirsin: mevcut hâlinden daha kısa. Bir de kişiye yapılan bir işi anlatırken kişi yönelme hâline giriyor; bunu modül 3'te de görmüştün. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Friseursalon"),
          tr("Türkçesi 'kuaför salonu' demek. Lütfen"),
          de("der Friseursalon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Friseursalon" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Schere"),
          tr("Türkçesi 'makas' demek. Lütfen"),
          de("die Schere"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Schere" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("föhnen"),
          tr("Türkçesi 'fön çekmek' demek. Lütfen"),
          de("föhnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "föhnen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("bürsten"),
          tr("Türkçesi 'fırçalamak' demek. Lütfen"),
          de("bürsten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bürsten" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("sich kämmen"),
          tr("Türkçesi 'saçını taramak' demek. Lütfen"),
          de("sich kämmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich kämmen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("glänzend"),
          tr("Türkçesi 'parlak' demek. Lütfen"),
          de("glänzend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "glänzend" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("gepflegt"),
          tr("Türkçesi 'bakımlı' demek. Lütfen"),
          de("gepflegt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gepflegt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sanft"),
          tr("Türkçesi 'nazik' demek. Lütfen"),
          de("sanft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sanft" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Bitte etwas kürzer."),
          tr(
            "İki kelimelik bir istek. Karşılaştırma biçimi burada bir ölçü değil bir yön söylüyor: şimdikinden daha kısa.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Lütfen biraz daha kısa, ama çok kısa değil.' Almancası:"),
          de("Bitte etwas kürzer, aber nicht zu kurz."),
          tr("Lütfen"),
          de("Bitte etwas kürzer, aber nicht zu kurz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bitte etwas kürzer, aber nicht zu kurz" },
      },
      {
        say: [tr("Sıra sende: 'Saçlarım daha parlak olsun istiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte glänzendere Haare",
          hint: [
            tr("Sıfat hem karşılaştırma ekini hem de çoğul ismin önünde durduğu için son ekini alır:"),
            de("Ich möchte glänzendere Haare."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Können Sie mir die Haare föhnen?"),
          tr(
            "Kişi yönelme hâlinde ve saç belirlilik takısıyla duruyor. Türkçedeki 'saçımı' derken kullandığımız iyelik ekinin karşılığı bu ikili.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Bana fön çekebilir misiniz?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Können Sie mir föhnen",
          hint: [
            tr("Hizmet verilen kişi yönelme hâlinde ve asıl fiil sonda:"),
            de("Können Sie mir föhnen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Können Sie mich die Haare föhnen?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Können Sie mich die Haare föhnen?",
          answer: false,
          why: [
            tr(
              "Kişiye bir şey yapıldığında kişi yönelme hâlinde durur, belirtme hâlinde değil. Doğrusu:",
            ),
            de("Können Sie mir die Haare föhnen?"),
          ],
        },
      },
      {
        say: [tr("Şimdi kuafördesin ve ne istediğini anlatıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Kuaförde koltuğa oturdun. Ne istediğini karşılaştırma biçimiyle anlat, bir ek hizmet iste ve sonunda sonucu değerlendir.",
      partner: "ne istediğini iyice anlamak isteyen bir kuaför",
      opening: "So, was darf es heute sein? Nur schneiden?",
      openingTr: "Evet, bugün ne yapalım? Sadece kesim mi?",
      goal: "İstek net anlatılmış, bir ek hizmet konuşulmuş ve sonuç hakkında bir cümle söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-reklamation",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Die Reklamation",
    titleTr: "Ürün şikâyeti",
    summary: "Bozuk bir üründe şikâyeti anlatmayı ve iade istemeyi öğretir.",
    minutes: 10,
    focusId: "Perfekt",
    vocab: [
      { de: "fehlerhaft", tr: "hatalı" },
      { de: "beschädigt", tr: "hasarlı" },
      { de: "zerbrochen", tr: "kırık" },
      { de: "abgenutzt", tr: "yıpranmış" },
      { de: "die Rückgabe", tr: "iade" },
      { de: "der Kassenzettel", tr: "kasa fişi" },
      { de: "verärgert", tr: "kızgın" },
      { de: "der Filialleiter", tr: "şube müdürü" },
    ],
    patterns: [
      { de: "Das Paket ist beschädigt angekommen.", tr: "ürünün nasıl geldiğini anlatır" },
      { de: "Ich möchte das zurückgeben.", tr: "iade isteğini bildirir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bozuk bir ürünü şikâyet ediyoruz. Almanya'da bu hakkın var ama doğru kelimeleri kullanmak süreci hızlandırır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bugünkü sıfatların dördü de ortaçtan gelmiş: bir fiilin ortacı zamanla sıfat olarak kullanılır hâle gelmiş. Bu yüzden hepsi aynı hecelerle bitiyor ve hepsi 'bir şey olmuş, sonucu bu' anlamını taşıyor. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("fehlerhaft"),
          tr("Türkçesi 'hatalı' demek. Lütfen"),
          de("fehlerhaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fehlerhaft" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("beschädigt"),
          tr("Türkçesi 'hasarlı' demek. Lütfen"),
          de("beschädigt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beschädigt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("zerbrochen"),
          tr("Türkçesi 'kırık' demek. Lütfen"),
          de("zerbrochen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zerbrochen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("abgenutzt"),
          tr("Türkçesi 'yıpranmış, eskimiş' demek. Lütfen"),
          de("abgenutzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abgenutzt" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Rückgabe"),
          tr("Türkçesi 'iade' demek. Lütfen"),
          de("die Rückgabe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Rückgabe" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Kassenzettel"),
          tr("Türkçesi 'kasa fişi' demek. Lütfen"),
          de("der Kassenzettel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kassenzettel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("verärgert"),
          tr("Türkçesi 'kızgın, canı sıkılmış' demek. Lütfen"),
          de("verärgert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verärgert" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Filialleiter"),
          tr("Türkçesi 'şube müdürü' demek. Lütfen"),
          de("der Filialleiter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Filialleiter" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Das Paket ist beschädigt angekommen."),
          tr(
            "İki ortaç bir arada: biri sıfat gibi kullanılıyor, öteki geçmiş zamanın kendisi. Fiil yer değiştirdiği için yardımcı fiil de ona göre.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kutuda iki kırık tabak vardı.' Almancası:"),
          de("Im Karton waren zwei zerbrochene Teller."),
          tr("Lütfen"),
          de("Im Karton waren zwei zerbrochene Teller"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Im Karton waren zwei zerbrochene Teller" },
      },
      {
        say: [tr("Sıra sende: 'Halı çoktan yıpranmış.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Der Teppich ist schon abgenutzt",
          hint: [
            tr("Ortaçtan gelen sıfat yüklem olarak kullanıldığında hiç ek almaz:"),
            de("Der Teppich ist schon abgenutzt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız iade isteğini bildirir:"),
          de("Ich möchte das zurückgeben."),
          tr(
            "Almanya'da iade genelde fişe bağlıdır, o yüzden bu cümleden hemen sonra fiş sorulur.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Fişsiz iade mümkün mü?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ist die Rückgabe ohne Kassenzettel möglich",
          hint: [
            tr("Fiil başta olduğu için cümle soru olur ve edat belirtme hâlini getirir:"),
            de("Ist die Rückgabe ohne Kassenzettel möglich?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Paket ist beschädigt angekommen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Paket ist beschädigt angekommen.",
          answer: true,
          why: [
            tr(
              "Varmak yer değiştiren bir fiil, o yüzden birinci yardımcı fiili almış; hasar bildiren sıfat ise ek almadan durmuş. Cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi mağazada bozuk bir ürünü şikâyet ediyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Aldığın ürün hasarlı çıktı ve mağazaya geri getirdin. Sorunu anlat, ne istediğini söyle ve olmazsa müdürle konuşmak istediğini belirt.",
      partner: "önce kuralları söyleyen ama sonra çözüm arayan bir kasiyer",
      opening: "Guten Tag. Sie möchten etwas zurückgeben?",
      openingTr: "İyi günler. Bir şeyi iade mi etmek istiyorsunuz?",
      goal: "Sorun anlatılmış, fiş konusu geçmiş ve iade ya da değişim konusunda bir sonuca varılmış olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-handyvertrag",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Der Handyvertrag",
    titleTr: "Telefon aboneliği",
    summary: "Tarifeleri karşılaştırmayı ve aboneliğin şartlarını sormayı öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "wöchentlich", tr: "haftalık" },
      { de: "das Smartphone", tr: "akıllı telefon" },
      { de: "der Klingelton", tr: "zil sesi" },
      { de: "das WLAN", tr: "kablosuz internet" },
      { de: "der Router", tr: "modem" },
      { de: "das Ladekabel", tr: "şarj kablosu" },
      { de: "der Benutzername", tr: "kullanıcı adı" },
      { de: "die Stromrechnung", tr: "elektrik faturası" },
    ],
    patterns: [
      { de: "Dieser Tarif ist teurer als der andere.", tr: "iki tarifeyi karşılaştırır" },
      { de: "Ist das WLAN kostenlos?", tr: "bir hizmetin ücretsiz olup olmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün telefon ve internet aboneliğini konuşuyoruz. Karşılaştırma biçimi burada gerçek bir para kararına dönüşüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Abonelik konuşmalarının üç sorusu var: ne kadar, ne kadar süreyle, neler dâhil. Karşılaştırma biçimi birincisinde, sıklık bildiren sıfatlar ikincisinde işine yarayacak. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("wöchentlich"),
          tr("Türkçesi 'haftalık, her hafta' demek. Lütfen"),
          de("wöchentlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wöchentlich" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Smartphone"),
          tr("Türkçesi 'akıllı telefon' demek. Lütfen"),
          de("das Smartphone"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Smartphone" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Klingelton"),
          tr("Türkçesi 'zil sesi' demek. Lütfen"),
          de("der Klingelton"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Klingelton" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das WLAN"),
          tr("Türkçesi 'kablosuz internet' demek. Lütfen"),
          de("das WLAN"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das WLAN" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Router"),
          tr("Türkçesi 'modem' demek. Lütfen"),
          de("der Router"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Router" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Ladekabel"),
          tr("Türkçesi 'şarj kablosu' demek. Lütfen"),
          de("das Ladekabel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ladekabel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Benutzername"),
          tr("Türkçesi 'kullanıcı adı' demek. Lütfen"),
          de("der Benutzername"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Benutzername" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("die Stromrechnung"),
          tr("Türkçesi 'elektrik faturası' demek. Lütfen"),
          de("die Stromrechnung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stromrechnung" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Dieser Tarif ist teurer als der andere."),
          tr(
            "Bu sıfatın karşılaştırma biçiminde ortadaki sesli harflerden biri düşüyor; kuralın kendisi aynı, yazımı biraz kısalıyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu yıl elektrik faturası çok yüksek.' Almancası:"),
          de("Die Stromrechnung ist dieses Jahr sehr hoch."),
          tr("Lütfen"),
          de("Die Stromrechnung ist dieses Jahr sehr hoch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Stromrechnung ist dieses Jahr sehr hoch" },
      },
      {
        say: [tr("Sıra sende: 'Kullanıcı adımı unuttum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe meinen Benutzernamen vergessen",
          hint: [
            tr("Bu eril isim belirtme hâlinde sonuna bir harf alır:"),
            de("Ich habe meinen Benutzernamen vergessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ist das WLAN kostenlos?"),
          tr("Fiil başta olduğu için cümle soru; sıfat yüklem olduğu için ek almıyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Modem dâhil mi?' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ist der Router dabei",
          hint: [
            tr("Fiil başta, zarf sonda:"),
            de("Ist der Router dabei?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Dieser Tarif ist teuerer als der andere."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Dieser Tarif ist teuerer als der andere.",
          answer: false,
          why: [
            tr("Bu sıfatın karşılaştırma biçiminde ortadaki sesli harf düşer. Doğrusu:"),
            de("Dieser Tarif ist teurer als der andere."),
          ],
        },
      },
      {
        say: [tr("Şimdi mağazada iki tarifeyi karşılaştırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bir telefon mağazasındasın ve iki tarife arasında karar veremiyorsun. Fiyatı, süreyi ve nelerin dâhil olduğunu sor, ikisini karşılaştır ve bir karar ver.",
      partner: "iki tarifeyi de anlatan bir satış görevlisi",
      opening: "Suchen Sie einen neuen Vertrag? Ich zeige Ihnen gern zwei Angebote.",
      openingTr: "Yeni bir abonelik mi arıyorsunuz? Size iki teklif gösterebilirim.",
      goal: "İki tarife fiyat ve içerik olarak karşılaştırılmış ve biri seçilip sebebi söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-bank-konto",
    icon: "money",
    level: "A2",
    course: "de",
    title: "Ein Konto eröffnen",
    titleTr: "Banka hesabı",
    summary: "Bankada hesap açmayı ve para konularını konuşmayı öğretir.",
    minutes: 10,
    focusId: "W-Fragen",
    vocab: [
      { de: "die Sparkasse", tr: "tasarruf bankası" },
      { de: "die Kontonummer", tr: "hesap numarası" },
      { de: "der Kredit", tr: "kredi" },
      { de: "sparen", tr: "biriktirmek" },
      { de: "das Sparbuch", tr: "tasarruf cüzdanı" },
      { de: "der Geldschein", tr: "banknot" },
      { de: "das Kleingeld", tr: "bozuk para" },
      { de: "ausgeben", tr: "harcamak" },
    ],
    patterns: [
      { de: "Ich möchte ein Konto eröffnen.", tr: "bankadaki isteğini bildirir" },
      { de: "Wie hoch sind die Gebühren?", tr: "ücretleri sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bankadayız ve hesap açıyoruz. Almanya'da hayatın her adımı bir banka hesabına bağlı, bu yüzden bu ders çok işine yarayacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bankada sorular hep soru kelimesiyle başlar ve bir tanesi Türkçe konuşan için ilginçtir: 'ne kadar' sorusu tek bir kelimeyle değil, bir soru kelimesi ile bir sıfatın birleşmesiyle kurulur. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Sparkasse"),
          tr("Türkçesi 'tasarruf bankası' demek; Almanya'da çok yaygın bir banka türü. Lütfen"),
          de("die Sparkasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sparkasse" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Kontonummer"),
          tr("Türkçesi 'hesap numarası' demek. Lütfen"),
          de("die Kontonummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Kontonummer" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Kredit"),
          tr("Türkçesi 'kredi' demek. Lütfen"),
          de("der Kredit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kredit" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sparen"),
          tr("Türkçesi 'biriktirmek, tasarruf etmek' demek. Lütfen"),
          de("sparen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sparen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Sparbuch"),
          tr("Türkçesi 'tasarruf cüzdanı' demek. Lütfen"),
          de("das Sparbuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Sparbuch" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Geldschein"),
          tr("Türkçesi 'banknot, kâğıt para' demek. Lütfen"),
          de("der Geldschein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Geldschein" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Kleingeld"),
          tr("Türkçesi 'bozuk para' demek. Lütfen"),
          de("das Kleingeld"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kleingeld" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("ausgeben"),
          tr("Türkçesi 'para harcamak' demek. Lütfen"),
          de("ausgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausgeben" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich möchte ein Konto eröffnen."),
          tr("Kibar istek biçimi ikinci sırada, asıl fiil sonda. Bankada söylenecek ilk cümle bu."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Hesabım bu bankada.' Almancası:"),
          de("Mein Konto ist bei der Sparkasse."),
          tr("Lütfen"),
          de("Mein Konto ist bei der Sparkasse"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Konto ist bei der Sparkasse" },
      },
      {
        say: [tr("Sıra sende: 'Yeni bir bisiklet için para biriktiriyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich spare für ein neues Fahrrad",
          hint: [
            tr("Amaç bildiren edat belirtme hâlini getirir ve sıfat da ona göre ek alır:"),
            de("Ich spare für ein neues Fahrrad."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wie hoch sind die Gebühren?"),
          tr(
            "Türkçede 'ne kadar' deriz; Almancada soru kelimesinin yanına bir sıfat gelir ve bu ikisi birlikte miktar sorar.",
          ),
        ],
      },
      {
        say: [tr("Sıra sende: 'Kitaplara çok para harcıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich gebe viel Geld für Bücher aus",
          hint: [
            tr("Ayrılabilen fiilin ön eki cümlenin sonuna düşer:"),
            de("Ich gebe viel Geld für Bücher aus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wie hoch sind die Gebühren?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wie hoch sind die Gebühren?",
          answer: true,
          why: [
            tr(
              "Miktar sorusu soru kelimesi ile bir sıfatın birleşmesiyle kurulur ve fiil çoğula uymuştur: cümle doğru.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi bankadasın ve hesap açtırıyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bankada hesap açtırmak istiyorsun. Ne istediğini söyle, ücretleri ve şartları sor, gereken belgeleri öğren.",
      partner: "adım adım anlatan bir banka görevlisi",
      opening: "Guten Tag! Sie möchten ein Konto eröffnen? Haben Sie Ihren Ausweis dabei?",
      openingTr: "İyi günler! Hesap mı açtırmak istiyorsunuz? Kimliğiniz yanınızda mı?",
      goal: "Hesap türü seçilmiş, ücretler sorulmuş ve gereken belgeler öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-post",
    icon: "mail",
    level: "A2",
    course: "de",
    title: "Auf der Post",
    titleTr: "Postanede",
    summary: "Postanede gönderi biçimini seçmeyi ve ağırlık konuşmayı öğretir.",
    minutes: 10,
    focusId: "Superlativ",
    vocab: [
      { de: "der Umschlag", tr: "zarf" },
      { de: "das Postamt", tr: "postane" },
      { de: "das Porto", tr: "posta ücreti" },
      { de: "abschicken", tr: "yollamak" },
      { de: "das Briefpapier", tr: "mektup kâğıdı" },
      { de: "die Waage", tr: "terazi" },
      { de: "das Blatt", tr: "yaprak, sayfa" },
      { de: "das Gramm", tr: "gram" },
    ],
    patterns: [
      { de: "Was ist am schnellsten?", tr: "en hızlı seçeneği sorar" },
      { de: "Wie viel wiegt das Paket?", tr: "ağırlığı sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün postanedeyiz. Gönderi biçimleri arasında seçim yaparken en üstünlük biçimi tam da işine yarayacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Postanede üç şey konuşulur: ne kadar ağır, ne kadar ücret, ne kadar sürer. Üçüncüsünde en üstünlük biçimi kullanılır. Bir de ağırlık birimleri: Almancada bunlar sayıdan sonra hep tekil kalır ve bu Türkçe konuşan için tanıdık bir kural. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Umschlag"),
          tr("Türkçesi 'zarf' demek. Lütfen"),
          de("der Umschlag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Umschlag" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Postamt"),
          tr("Türkçesi 'postane' demek. Lütfen"),
          de("das Postamt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Postamt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Porto"),
          tr("Türkçesi 'posta ücreti' demek. Lütfen"),
          de("das Porto"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Porto" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("abschicken"),
          tr("Türkçesi 'yollamak, postaya vermek' demek. Lütfen"),
          de("abschicken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abschicken" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("das Briefpapier"),
          tr("Türkçesi 'mektup kâğıdı' demek. Lütfen"),
          de("das Briefpapier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Briefpapier" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Waage"),
          tr("Türkçesi 'terazi, tartı' demek. Lütfen"),
          de("die Waage"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Waage" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Blatt"),
          tr("Türkçesi 'yaprak, sayfa' demek. Lütfen"),
          de("das Blatt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Blatt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Gramm"),
          tr("Türkçesi 'gram' demek. Lütfen"),
          de("das Gramm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gramm" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Was ist am schnellsten?"),
          tr("En üstünlük biçimi: kaynaşmış edat önde, hece sonda. Seçenekler arasından en hızlıyı sorar."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu mektubun ücreti bir avro.' Almancası:"),
          de("Das Porto für den Brief kostet einen Euro."),
          tr("Lütfen"),
          de("Das Porto für den Brief kostet einen Euro"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das Porto für den Brief kostet einen Euro" },
      },
      {
        say: [tr("Sıra sende: 'İki yüz gram peynire ihtiyacım var.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich brauche zweihundert Gramm Käse",
          hint: [
            tr("Ağırlık birimi sayıdan sonra tekil kalır ve ardından gelen isim artikelsiz durur:"),
            de("Ich brauche zweihundert Gramm Käse."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wie viel wiegt das Paket?"),
          tr("Ağırlığı sorar; iki kelimelik bir soru kalıbı ve arkasından fiil geliyor."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Formu hemen gönderiyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich schicke das Formular gleich ab",
          hint: [
            tr("Ayrılabilen fiilin ön eki cümlenin sonuna düşer:"),
            de("Ich schicke das Formular gleich ab."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich brauche zweihundert Gramme Käse."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich brauche zweihundert Gramme Käse.",
          answer: false,
          why: [
            tr("Ağırlık birimleri sayıdan sonra çoğul yapılmaz, tekil kalır. Doğrusu:"),
            de("Ich brauche zweihundert Gramm Käse."),
          ],
        },
      },
      {
        say: [tr("Şimdi postanedesin ve bir paket gönderiyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Postanede bir paket göndermek istiyorsun. Ağırlığı tarttır, seçenekleri sor, en hızlısını ve en ucuzunu öğren ve birini seç.",
      partner: "seçenekleri sıralayan bir postane görevlisi",
      opening: "Guten Tag! Soll das Paket ins Inland oder ins Ausland?",
      openingTr: "İyi günler! Paket yurt içine mi yoksa yurt dışına mı?",
      goal: "Ağırlık ve ücret öğrenilmiş, en az iki gönderi biçimi karşılaştırılmış ve biri seçilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-a2-flohmarkt",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Auf dem Flohmarkt",
    titleTr: "Bitpazarında pazarlık",
    summary: "İkinci el eşya alırken pazarlık etmeyi ve durumunu sormayı öğretir.",
    minutes: 10,
    focusId: "Komparativ",
    vocab: [
      { de: "der Flohmarkt", tr: "bit pazarı" },
      { de: "gebraucht", tr: "ikinci el" },
      { de: "rostig", tr: "paslı" },
      { de: "ausmisten", tr: "ayıklamak" },
      { de: "die Menge", tr: "miktar" },
      { de: "das Brettspiel", tr: "kutu oyunu" },
      { de: "der Hocker", tr: "tabure" },
      { de: "einzeln", tr: "tek tek" },
    ],
    patterns: [
      { de: "Geht es auch etwas billiger?", tr: "pazarlığı kibarca açar" },
      { de: "Verkaufen Sie die auch einzeln?", tr: "tek tek satılıp satılmadığını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Modülün son dersinde bit pazarındayız. Almanya'da pazarlık her yerde yapılmaz ama burada yapılır ve bunun kendine has kibar bir dili vardır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Pazarlığın kibar hâli bir soruyla açılır ve o soruda karşılaştırma biçimi kullanılır: 'biraz daha ucuz olur mu'. Doğrudan fiyat söylemek yerine yön göstermek, Almancada daha nazik durur. Önce sekiz kelime.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Flohmarkt"),
          tr("Türkçesi 'bit pazarı' demek. Lütfen"),
          de("der Flohmarkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flohmarkt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("gebraucht"),
          tr("Türkçesi 'ikinci el, kullanılmış' demek. Lütfen"),
          de("gebraucht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gebraucht" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("rostig"),
          tr("Türkçesi 'paslı' demek. Lütfen"),
          de("rostig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "rostig" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ausmisten"),
          tr("Türkçesi 'ayıklamak, gereksizleri atmak' demek. Lütfen"),
          de("ausmisten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausmisten" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Menge"),
          tr("Türkçesi 'miktar' demek. Lütfen"),
          de("die Menge"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Menge" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("das Brettspiel"),
          tr("Türkçesi 'kutu oyunu' demek. Lütfen"),
          de("das Brettspiel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Brettspiel" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("der Hocker"),
          tr("Türkçesi 'tabure' demek. Lütfen"),
          de("der Hocker"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Hocker" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("einzeln"),
          tr("Türkçesi 'tek tek, ayrı ayrı' demek. Lütfen"),
          de("einzeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einzeln" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Geht es auch etwas billiger?"),
          tr(
            "Pazarlığı kibarca açar. Fiil kişisiz bir özneyle kullanılıyor ve karşılaştırma biçimi bir yön gösteriyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu şapkayı bit pazarından aldım.' Almancası:"),
          de("Diesen Hut habe ich auf dem Flohmarkt gekauft."),
          tr("Lütfen"),
          de("Diesen Hut habe ich auf dem Flohmarkt gekauft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Diesen Hut habe ich auf dem Flohmarkt gekauft" },
      },
      {
        say: [tr("Sıra sende: 'Biz ikinci el bir çamaşır makinesi aldık.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben eine gebrauchte Waschmaschine gekauft",
          hint: [
            tr("Dişil bir isimde belirsiz artikelden sonra sıfat sonuna bir harf alır:"),
            de("Wir haben eine gebrauchte Waschmaschine gekauft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Verkaufen Sie die auch einzeln?"),
          tr("Bir takımın tek tek satılıp satılmadığını sorar; pazarda çok işe yarayan bir soru."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Yılda bir kez dolabı ayıklıyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Einmal im Jahr miste ich den Kleiderschrank aus",
          hint: [
            tr("Zaman ifadesi başta olunca özne fiilin arkasına düşer ve ayrılabilen ön ek sona gider:"),
            de("Einmal im Jahr miste ich den Kleiderschrank aus."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Geht es auch etwas billiger?"),
          tr("cümlesi pazarlık için uygun mu?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Geht es auch etwas billiger?",
          answer: true,
          why: [
            tr(
              "Doğrudan fiyat söylemek yerine yön gösteren, kişisiz özneyle kurulmuş kibar bir pazarlık sorusu: bit pazarında tam da böyle söylenir.",
            ),
          ],
        },
      },
      {
        say: [tr("Şimdi bit pazarındasın ve bir şey almak istiyorsun.")],
      },
    ],
    roleplay: {
      scene:
        "Bit pazarında bir tezgâhta ilgini çeken bir şey buldun. Durumunu sor, fiyatı öğren, kibarca pazarlık et ve bir sonuca var.",
      partner: "eşyanın hikâyesini anlatmayı seven bir tezgâh sahibi",
      opening: "Schauen Sie sich ruhig um! Gefällt Ihnen etwas?",
      openingTr: "Rahatça bakın! Beğendiğiniz bir şey var mı?",
      goal: "Eşyanın durumu ve fiyatı konuşulmuş, kibar bir pazarlık yapılmış ve alınıp alınmadığına karar verilmiş olur.",
      minTurns: 8,
    },
  },
];

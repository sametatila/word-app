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
 * Sahneler bir hizmet zinciri gibi diziliyor: mağaza, kuaför, şikâyet
 * masası, telefon bayisi, banka, postane, bitpazarı. Önceki seviyelerin
 * kelimeleri (die Jacke, teuer, günstig, besser, der Vertrag, kaputt,
 * funktionieren) yeni diye öğretilmiyor, karşılaştırmaların içinde geri
 * geliyor.
 */
export const deA2B06: Lesson[] = [
  {
    id: "de-a2-komparativ",
    icon: "chart",
    level: "A2",
    course: "de",
    title: "Größer, schneller, billiger",
    titleTr: "Karşılaştırma",
    summary: "İki şeyi karşılaştırmayı ve farkı söylemeyi öğretir.",
    minutes: 9,
    focusId: "Komparativ",
    vocab: [
      { de: "billig", tr: "ucuz" },
      { de: "lang", tr: "uzun" },
      { de: "der Unterschied", tr: "fark" },
      { de: "vergleichen", tr: "karşılaştırmak" },
      { de: "genauso", tr: "tıpkı, aynı derecede" },
    ],
    patterns: [
      { de: "… ist billiger als …", tr: "iki şeyi karşılaştırırken kullanılır" },
      { de: "genauso … wie …", tr: "ikisi eşitse kullanılır" },
      { de: "Was ist der Unterschied?", tr: "farkı sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün alışverişin kalbindeyiz: karşılaştırma. İki şeyden hangisinin daha ucuz, daha uzun, daha iyi olduğunu söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede karşılaştırma kolay: sıfatın önüne 'daha' koyarsın, sıfat hiç değişmez. Almancada tam tersi olur; ayrı bir kelime yok, sıfatın kendi sonu değişir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("billig"),
          tr("Türkçesi 'ucuz' demek. Lütfen"),
          de("billig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "billig" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("lang"),
          tr("Türkçesi 'uzun' demek. Lütfen"),
          de("lang"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lang" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Unterschied"),
          tr("Türkçesi 'fark' demek. Lütfen"),
          de("der Unterschied"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Unterschied" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("vergleichen"),
          tr("Türkçesi 'karşılaştırmak' demek. Lütfen"),
          de("vergleichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vergleichen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("genauso"),
          tr("Türkçesi 'aynı derecede' demek. Lütfen"),
          de("genauso"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "genauso" },
      },
      {
        say: [
          tr("Kural iki parçalı. Birincisi: sıfatın sonuna küçük bir ek geliyor."),
          de("billig"),
          tr("kelimesi"),
          de("billiger"),
          tr("olur. İkincisi: karşılaştırdığın şeyin önüne bir bağlaç konur ve o bağlaç Türkçedeki '-dan' ekinin yerini tutar:"),
          de("als"),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ceket gömlekten daha pahalı.' Almancası:"),
          de("Die Jacke ist teurer als das Hemd."),
          tr("Lütfen"),
          de("Die Jacke ist teurer als das Hemd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Jacke ist teurer als das Hemd" },
      },
      {
        say: [tr("Sıra sende: 'Gömlek ceketten daha ucuz.'")],
        expect: {
          kind: "produce",
          target: "Das Hemd ist billiger als die Jacke",
          hint: [
            tr("Sıfatın sonuna ek gelir, karşılaştırılan şey de bağlacın arkasına:"),
            de("Das Hemd ist billiger als die Jacke."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de küçük bir sürpriz var: bazı kısa sıfatlarda sesli harf de değişir."),
          de("lang"),
          tr("kelimesi"),
          de("länger"),
          tr("olur; aynı şey"),
          de("alt"),
          tr("ve"),
          de("groß"),
          tr("için de geçerli."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Pantolon ceketten daha uzun.'")],
        expect: {
          kind: "produce",
          target: "Die Hose ist länger als die Jacke",
          hint: [
            tr("Bu sıfatta sesli harf de değişiyor:"),
            de("Die Hose ist länger als die Jacke."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkisi eşitse başka bir kalıp kullanılır:"),
          de("Die Hose ist genauso teuer wie das Hemd."),
          tr("Burada sıfat hiç değişmiyor, çünkü ortada fark yok. Lütfen"),
          de("Die Hose ist genauso teuer wie das Hemd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Hose ist genauso teuer wie das Hemd" },
      },
      {
        say: [
          tr("Farkı merak edersen tek soru yeter:"),
          de("Was ist der Unterschied?"),
          tr("İki ürünü karşılaştırmasını da isteyebilirsin:"),
          de("Können Sie die zwei vergleichen?"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Jacke ist teuer als das Hemd."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Jacke ist teuer als das Hemd.",
          answer: false,
          why: [
            tr("Karşılaştırma yapılıyorsa sıfatın sonuna ek gelmeli. Doğrusu:"),
            de("Die Jacke ist teurer als das Hemd."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iki şeyi karşılaştırabiliyorsun. Şimdi bir mağazadasın: iki ürün arasında kalmışsın ve satış görevlisi yardıma geliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir mağazada iki ürün arasında kararsız kaldın. Aralarındaki farkı sor, fiyatlarını karşılaştır ve hangisini neden seçtiğini söyle.",
      partner: "her iki ürünü de öven, satmayı bilen bir mağaza görevlisi",
      opening: "Die beiden sind sehr ähnlich. Welche gefällt Ihnen besser?",
      openingTr: "İkisi birbirine çok benziyor. Hangisini daha çok beğendiniz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-superlativ",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Am besten!",
    titleTr: "En üstünlük",
    summary: "Bir şeyin en üstün olduğunu söylemeyi öğretir.",
    minutes: 9,
    focusId: "Superlativ",
    vocab: [
      { de: "hoch", tr: "yüksek" },
      { de: "niedrig", tr: "düşük" },
      { de: "die Auswahl", tr: "seçenek çeşitliliği" },
      { de: "beliebt", tr: "sevilen, popüler" },
      { de: "am liebsten", tr: "en çok" },
    ],
    patterns: [
      { de: "… ist am billigsten", tr: "en üstünü söylerken kullanılır" },
      { de: "Am liebsten …", tr: "en çok neyi sevdiğini söylerken kullanılır" },
      { de: "die größte Auswahl", tr: "ismin önünde üstünlük söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Geçen ders ikisini karşılaştırdık. Bugün üçü, beşi, hepsi arasından en üstününü söylemeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede tek bir kelime her işi görüyor: 'en'. Almancada ise sıfatın sonu yine değişiyor ve önüne küçük bir kelime geliyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("hoch"),
          tr("Türkçesi 'yüksek' demek. Lütfen"),
          de("hoch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hoch" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("niedrig"),
          tr("Türkçesi 'düşük' demek. Lütfen"),
          de("niedrig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "niedrig" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Auswahl"),
          tr("Türkçesi 'seçenek çeşitliliği' demek. Lütfen"),
          de("die Auswahl"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Auswahl" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("beliebt"),
          tr("Türkçesi 'sevilen, popüler' demek. Lütfen"),
          de("beliebt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beliebt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("am liebsten"),
          tr("Türkçesi 'en çok' demek. Lütfen"),
          de("am liebsten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "am liebsten" },
      },
      {
        say: [
          tr("Üstünlük kalıbı iki parçadan oluşuyor: önce küçük bir kelime, sonra sonu değişmiş sıfat."),
          de("am billigsten"),
          tr("Yani 'en ucuz'. Karşılaştırmadaki ek burada büyüyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu ceket en ucuz.' Almancası:"),
          de("Diese Jacke ist am billigsten."),
          tr("Lütfen"),
          de("Diese Jacke ist am billigsten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Diese Jacke ist am billigsten" },
      },
      {
        say: [tr("Sıra sende: 'Bu telefon en pahalı.'")],
        expect: {
          kind: "produce",
          target: "Dieses Handy ist am teuersten",
          hint: [
            tr("Önce küçük kelime, sonra sonu büyümüş sıfat:"),
            de("Dieses Handy ist am teuersten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Fiyat konuşurken iki kelime hep beraber gezer:"),
          de("Der Preis ist hier am niedrigsten."),
          tr("Tersini de duyarsın:"),
          de("Dort sind die Preise am höchsten."),
          tr("Karşılaştırmasız hâliyle de sık duyulur:"),
          de("Der Preis ist zu hoch."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Seçenek burada en fazla.'")],
        expect: {
          kind: "produce",
          target: "Die Auswahl ist hier am größten",
          hint: [
            tr("Bu sıfatta sesli harf de değişiyor:"),
            de("Die Auswahl ist hier am größten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kendi tercihini söylerken de aynı kalıp işe yarıyor:"),
          de("Am liebsten kaufe ich im Angebot."),
          tr("Cümle bu kalıpla başlayınca fiil hemen ikinci sıraya geçiyor. Lütfen"),
          de("Am liebsten kaufe ich im Angebot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am liebsten kaufe ich im Angebot" },
      },
      {
        say: [
          tr("İsmin önünde kullanmak istersen sıfat ismin önüne geçer:"),
          de("Das ist die beliebteste Marke."),
          tr("Buradaki biçim biraz daha uzun ama mantık aynı."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Dieses Handy ist am teuer."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Dieses Handy ist am teuer.",
          answer: false,
          why: [
            tr("Üstünlükte sıfatın sonu da değişmeli, yalnız küçük kelime yetmez. Doğrusu:"),
            de("Dieses Handy ist am teuersten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık en iyisini, en ucuzunu, en sevdiğini söyleyebilirsin. Şimdi bir elektronik mağazasındasın: satıcı sana en çok satılanı gösteriyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir elektronik mağazasında telefon bakıyorsun. Hangisinin en ucuz, hangisinin en popüler olduğunu sor ve en çok neyi tercih ettiğini söyle.",
      partner: "her ürünün rakamlarını ezbere bilen bir satış danışmanı",
      opening: "Dieses Modell ist bei uns am beliebtesten. Suchen Sie etwas Bestimmtes?",
      openingTr: "Bu model bizde en çok satan. Belirli bir şey mi arıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-zwei-jacken",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Welche Jacke ist besser?",
    titleTr: "İki ürün kıyası",
    summary: "İki ürün arasında seçim yaparken kıyas yapmayı öğretir.",
    minutes: 8,
    focusId: "Komparativ",
    vocab: [
      { de: "der Mantel", tr: "palto" },
      { de: "dünn", tr: "ince" },
      { de: "dick", tr: "kalın" },
      { de: "der Stoff", tr: "kumaş" },
      { de: "bequem", tr: "rahat" },
    ],
    patterns: [
      { de: "… ist wärmer als …", tr: "iki ürünü kıyaslarken kullanılır" },
      { de: "Die passt besser", tr: "hangisinin daha iyi olduğunu söylerken kullanılır" },
      { de: "Welcher … ist bequemer?", tr: "hangisinin daha rahat olduğunu sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün kabin önündeyiz: iki parça var, biri seçilecek. Kıyas yapmayı ve kararını gerekçesiyle söylemeyi çalışacağız. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen iki derste kuralı öğrendin; bugün onu gerçek bir alışverişte kullanacaksın. Kelimeler de kumaşla ilgili. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Mantel"),
          tr("Türkçesi 'palto' demek. Lütfen"),
          de("der Mantel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Mantel" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("dünn"),
          tr("Türkçesi 'ince' demek. Lütfen"),
          de("dünn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dünn" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("dick"),
          tr("Türkçesi 'kalın' demek. Lütfen"),
          de("dick"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dick" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Stoff"),
          tr("Türkçesi 'kumaş' demek. Lütfen"),
          de("der Stoff"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Stoff" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("bequem"),
          tr("Türkçesi 'rahat' demek. Lütfen"),
          de("bequem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "bequem" },
      },
      {
        say: [
          tr("İki parçayı kıyaslarken en çok duyacağın cümle şu:"),
          de("Der Mantel ist dicker als die Jacke."),
          tr("Kalınsa daha sıcak tutar:"),
          de("Der Mantel ist wärmer."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Der Mantel ist dicker als die Jacke"), tr("deyin.")],
        expect: { kind: "repeat", target: "Der Mantel ist dicker als die Jacke" },
      },
      {
        say: [tr("Sıra sende: 'Bu kumaş daha ince.'")],
        expect: {
          kind: "produce",
          target: "Der Stoff ist dünner",
          hint: [
            tr("Sıfatın sonuna ek gelir, karşılaştırılan şeyi söylemek zorunda değilsin:"),
            de("Der Stoff ist dünner."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kararını söylerken iki kısa cümle yeter:"),
          de("Die passt besser."),
          tr("ve"),
          de("Die nehme ich."),
          tr("Lütfen"),
          de("Die passt besser"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die passt besser" },
      },
      {
        say: [tr("Şimdi sen sor: 'Hangi palto daha rahat?'")],
        expect: {
          kind: "produce",
          target: "Welcher Mantel ist bequemer",
          hint: [
            tr("Soru kelimesi ismin cinsine uyar, sıfat da ek alır:"),
            de("Welcher Mantel ist bequemer?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Jacke passt besser."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Jacke passt besser.",
          answer: true,
          why: [
            tr("Doğru. Bu sıfatın karşılaştırma biçimi düzensizdir ve sonuna ek almaz, kelimenin kendisi değişir:"),
            de("gut, besser"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kararını gerekçesiyle söyleyebilirsin. Şimdi kabinin önündesin: elinde iki parça var ve görevli bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Mağazada bir ceket ile bir palto arasında kaldın ve ikisini de denedin. Kumaşlarını kıyasla, hangisinin daha rahat olduğunu sor ve kararını gerekçesiyle söyle.",
      partner: "acele ettirmeyen, dürüst tavsiye veren bir mağaza görevlisi",
      opening: "Beide stehen Ihnen gut. Welche ist bequemer?",
      openingTr: "İkisi de size yakıştı. Hangisi daha rahat?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-adjektiv-ein",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Ein roter Mantel",
    titleTr: "Sıfat çekimi",
    summary: "Sıfatın ismin cinsine göre sonunun değiştiğini öğretir.",
    minutes: 9,
    focusId: "Adjektivdeklination-Einstieg",
    vocab: [
      { de: "das Kleid", tr: "elbise" },
      { de: "der Anzug", tr: "takım elbise" },
      { de: "grün", tr: "yeşil" },
      { de: "gelb", tr: "sarı" },
      { de: "elegant", tr: "şık" },
    ],
    patterns: [
      { de: "ein roter Mantel", tr: "eril isimlerde sıfat çekimi" },
      { de: "eine grüne Jacke", tr: "dişil isimlerde sıfat çekimi" },
      { de: "ein gelbes Kleid", tr: "nötr isimlerde sıfat çekimi" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün Almancanın en çok korkulan konusuna ilk adımı atıyoruz, ama korkacak bir şey yok: sıfatın ismin önünde nasıl durduğunu öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede sıfat hiç değişmez: yeşil elbise, yeşil ceket, yeşil pantolon. Almancada ise sıfat ismin cinsine bakar ve sonunu ona göre ayarlar. Bugün yalnızca tek bir durumu öğreneceğiz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Kleid"),
          tr("Türkçesi 'elbise' demek. Lütfen"),
          de("das Kleid"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kleid" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Anzug"),
          tr("Türkçesi 'takım elbise' demek. Lütfen"),
          de("der Anzug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anzug" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("grün"),
          tr("Türkçesi 'yeşil' demek. Lütfen"),
          de("grün"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "grün" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("gelb"),
          tr("Türkçesi 'sarı' demek. Lütfen"),
          de("gelb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gelb" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("elegant"),
          tr("Türkçesi 'şık' demek. Lütfen"),
          de("elegant"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "elegant" },
      },
      {
        say: [
          tr("Kural şu: belirsiz artikelden sonra gelen sıfat, ismin cinsine göre sonuna bir harf alıyor. Nötr isimlerde bu"),
          de("ein gelbes Kleid"),
          tr("biçiminde duyuluyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bu yeşil bir elbise.' Almancası:"),
          de("Das ist ein grünes Kleid."),
          tr("Lütfen"),
          de("Das ist ein grünes Kleid"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist ein grünes Kleid" },
      },
      {
        say: [tr("Sıra sende: 'Bu sarı bir elbise.'")],
        expect: {
          kind: "produce",
          target: "Das ist ein gelbes Kleid",
          hint: [
            tr("Nötr isimlerde sıfat sonuna bir ek alır:"),
            de("Das ist ein gelbes Kleid."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Eril isimlerde son harf değişiyor:"),
          de("ein roter Mantel"),
          tr("Dişil isimlerde ise daha kısa kalıyor:"),
          de("eine grüne Jacke"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Das ist eine grüne Jacke"), tr("deyin.")],
        expect: { kind: "repeat", target: "Das ist eine grüne Jacke" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bu şık bir takım elbise.'")],
        expect: {
          kind: "produce",
          target: "Das ist ein eleganter Anzug",
          hint: [
            de("der Anzug"),
            tr("eril, o yüzden sıfat eril ekini alır:"),
            de("Das ist ein eleganter Anzug."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Mağazada bunu en çok arama cümlesinde kullanırsın:"),
          de("Ich suche einen roten Mantel."),
          tr("Nesne olunca eril biçim biraz daha değişiyor, ama bugün aklında kalması gereken üçlü bu:"),
          de("ein roter, eine grüne, ein gelbes"),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist ein elegante Anzug."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist ein elegante Anzug.",
          answer: false,
          why: [
            tr("Eril isimde sıfatın sonu farklı olmalı. Doğrusu:"),
            de("Das ist ein eleganter Anzug."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık rengi ismin önüne koyabilirsin. Şimdi mağazadasın ve aradığın şeyi rengiyle tarif edeceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir mağazada belirli bir şey arıyorsun ve rengini de söylemek istiyorsun. Ne aradığını rengiyle tarif et, gösterilenleri değerlendir ve beğendiğini söyle.",
      partner: "raftaki her rengi bilen, yardımsever bir mağaza görevlisi",
      opening: "Willkommen! Suchen Sie etwas für einen besonderen Anlass?",
      openingTr: "Hoş geldiniz! Özel bir gün için mi bakıyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-friseur",
    icon: "art",
    level: "A2",
    course: "de",
    title: "Beim Friseur",
    titleTr: "Kuaförde",
    summary: "Kuaförde ne istediğini ölçüsüyle anlatmayı öğretir.",
    minutes: 8,
    focusId: "Komparativ",
    vocab: [
      { de: "der Friseur", tr: "kuaför" },
      { de: "waschen", tr: "yıkamak" },
      { de: "färben", tr: "boyamak" },
      { de: "trocknen", tr: "kurutmak" },
      { de: "der Spiegel", tr: "ayna" },
    ],
    patterns: [
      { de: "Etwas kürzer, bitte", tr: "ne kadar kısaltılacağını söylerken kullanılır" },
      { de: "Nicht zu kurz", tr: "sınır koyarken kullanılır" },
      { de: "Waschen und schneiden, bitte", tr: "hangi işlemi istediğini söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün kuaför koltuğundayız. Ne kadar kısaltılacağını söylemeyi ve sınırını çizmeyi öğreneceğiz; bu konuşmayı yanlış yaparsan sonucu aynada görürsün. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Burada karşılaştırma biçimi ölçü aleti gibi çalışıyor: daha kısa, daha uzun, çok kısa değil. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Friseur"),
          tr("Türkçesi 'kuaför' demek. Lütfen"),
          de("der Friseur"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Friseur" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("waschen"),
          tr("Türkçesi 'yıkamak' demek. Lütfen"),
          de("waschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "waschen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("färben"),
          tr("Türkçesi 'boyamak' demek. Lütfen"),
          de("färben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "färben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("trocknen"),
          tr("Türkçesi 'kurutmak' demek. Lütfen"),
          de("trocknen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "trocknen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Spiegel"),
          tr("Türkçesi 'ayna' demek. Lütfen"),
          de("der Spiegel"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Spiegel" },
      },
      {
        say: [
          tr("Koltuğa oturunca ilk söyleyeceğin şey işlem:"),
          de("Waschen und schneiden, bitte."),
          tr("Kurutmayı da isteyebilirsin:"),
          de("Waschen, schneiden und trocknen."),
          tr("Randevu alırken de meslek adını kullanırsın:"),
          de("Ich brauche einen Termin beim Friseur."),
          tr("Lütfen"),
          de("Waschen und schneiden, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Waschen und schneiden, bitte" },
      },
      {
        say: [
          tr("Sonra ölçü gelir ve burada karşılaştırma biçimi devreye girer:"),
          de("Etwas kürzer, bitte."),
          tr("Yani 'Biraz daha kısa.' Baştaki kelime 'biraz' demek ve ölçüyü yumuşatır."),
        ],
      },
      {
        say: [tr("Sıra sende: 'Biraz daha kısa, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Etwas kürzer, bitte",
          hint: [
            tr("Sıfatın karşılaştırma biçimini kullan, sesli harf de değişiyor:"),
            de("Etwas kürzer, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sınırını da hemen çiz, yoksa iş işten geçer:"),
          de("Nicht zu kurz, bitte."),
          tr("Buradaki küçük kelime 'fazla' demek. Lütfen"),
          de("Nicht zu kurz, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nicht zu kurz, bitte" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Saçımı boyatmak istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich möchte die Haare färben",
          hint: [
            tr("İsteme fiili ikinci sırada, asıl fiil en sonda:"),
            de("Ich möchte die Haare färben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sonunda kuaför aynayı uzatır ve sorar:"),
          de("Gefällt es Ihnen?"),
          tr("Sen de aynaya bakıp cevap verirsin:"),
          de("Im Spiegel sieht es gut aus."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nicht zu lang, bitte."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nicht zu lang, bitte.",
          answer: true,
          why: [
            tr("Doğru. Burada sıfatın kendisi kullanılıyor, çünkü karşılaştırma değil sınır koyma var:"),
            de("nicht zu lang"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık koltuğa güvenle oturabilirsin. Şimdi kuaför makası eline aldı ve ne istediğini soruyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Kuaförde koltuğa oturdun ve saçını kestireceksin. Hangi işlemi istediğini söyle, ne kadar kısa olacağını ölçüsüyle anlat ve sınırını çiz.",
      partner: "sohbeti seven ama makası hızlı olan bir kuaför",
      opening: "Was darf es heute sein? Nur schneiden oder auch färben?",
      openingTr: "Bugün ne yapalım? Sadece kesim mi, boya da var mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-reklamation",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Die Reklamation",
    titleTr: "Ürün şikâyeti",
    summary: "Bozuk bir ürünü şikâyet etmeyi ve parayı geri istemeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "die Reklamation", tr: "şikâyet" },
      { de: "die Garantie", tr: "garanti" },
      { de: "defekt", tr: "arızalı" },
      { de: "der Beleg", tr: "fiş" },
      { de: "sich beschweren", tr: "şikâyet etmek" },
    ],
    patterns: [
      { de: "Ich habe … gekauft", tr: "ne zaman aldığını anlatırken kullanılır" },
      { de: "Es funktioniert nicht", tr: "çalışmadığını söylerken kullanılır" },
      { de: "Ich möchte mein Geld zurück", tr: "para iadesi isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Aldığın şey bozuk çıktı ve mağazaya geri götürüyorsun. Bugün şikâyetini sırayla anlatmayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu konuşmanın sırası bellidir: önce ne zaman aldığını söylersin, sonra sorunu anlatırsın, en sonda ne istediğini. İlk adım geçmiş zaman, o yüzden bugün onu tazeliyoruz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Reklamation"),
          tr("Türkçesi 'şikâyet' demek. Lütfen"),
          de("die Reklamation"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Reklamation" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Garantie"),
          tr("Türkçesi 'garanti' demek. Lütfen"),
          de("die Garantie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Garantie" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("defekt"),
          tr("Türkçesi 'arızalı' demek. Lütfen"),
          de("defekt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "defekt" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Beleg"),
          tr("Türkçesi 'fiş' demek. Lütfen"),
          de("der Beleg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Beleg" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich beschweren"),
          tr("Türkçesi 'şikâyet etmek' demek. Lütfen"),
          de("sich beschweren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich beschweren" },
      },
      {
        say: [
          tr("Masaya gelince önce konunun ne olduğunu söylersin:"),
          de("Ich habe eine Reklamation."),
          tr("Arkasından satın almayı anlatırsın ve bu cümle geçmiş zamandır:"),
          de("Ich habe das Handy hier gekauft."),
          tr("Yardımcı fiil ikinci sırada, geçmiş biçim en sonda; bu sıra artık sana tanıdık."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich habe das Handy hier gekauft"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich habe das Handy hier gekauft" },
      },
      {
        say: [tr("Sıra sende: 'Bunu geçen hafta aldım.'")],
        expect: {
          kind: "produce",
          target: "Ich habe das letzte Woche gekauft",
          hint: [
            tr("Zaman ifadesi ortada durur, geçmiş biçim en sona gider:"),
            de("Ich habe das letzte Woche gekauft."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci adım sorunu anlatmak. İki cümle yeter:"),
          de("Es funktioniert nicht."),
          tr("ve daha resmi olanı:"),
          de("Das Gerät ist defekt."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Telefon arızalı.'")],
        expect: {
          kind: "produce",
          target: "Das Handy ist defekt",
          hint: [
            tr("Önce ne olduğunu söyle, sonra durumunu:"),
            de("Das Handy ist defekt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü adım ne istediğin. Görevli önce belgeni sorar:"),
          de("Haben Sie den Beleg?"),
          tr("Garanti hâlâ geçerliyse işin kolay:"),
          de("Die Garantie gilt zwei Jahre."),
          tr("Lütfen"),
          de("Ich möchte mein Geld zurück"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte mein Geld zurück" },
      },
      {
        say: [
          tr("Sonuç alamazsan bir üst adım var:"),
          de("Ich möchte mich beschweren."),
          tr("Bu cümle konuşmanın tonunu değiştirir, o yüzden en sona sakla."),
        ],
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe das Handy gekauft gestern."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe das Handy gekauft gestern.",
          answer: false,
          why: [
            tr("Geçmiş biçim cümlenin en sonunda durur, ondan sonra hiçbir şey gelmez. Doğrusu:"),
            de("Ich habe das Handy gestern gekauft."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hakkını arayabilirsin. Şimdi mağazanın şikâyet masasındasın: elinde bozuk telefon ve fiş var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İki hafta önce aldığın telefon bozuldu ve mağazaya geri getirdin. Ne zaman aldığını söyle, sorunu anlat, fişini göster ve ne istediğini net biçimde belirt.",
      partner: "kuralları savunan ama çözüm arayan bir müşteri hizmetleri görevlisi",
      opening: "Guten Tag! Worum geht es bei Ihrer Reklamation?",
      openingTr: "İyi günler! Şikâyetiniz ne hakkında?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-handyvertrag",
    icon: "phone",
    level: "A2",
    course: "de",
    title: "Der Handyvertrag",
    titleTr: "Telefon aboneliği",
    summary: "İki tarifeyi karşılaştırmayı ve aboneliği iptal etmeyi öğretir.",
    minutes: 9,
    focusId: "Komparativ",
    vocab: [
      { de: "der Tarif", tr: "tarife" },
      { de: "kündigen", tr: "iptal etmek" },
      { de: "monatlich", tr: "aylık" },
      { de: "unbegrenzt", tr: "sınırsız" },
      { de: "das Internet", tr: "internet" },
    ],
    patterns: [
      { de: "Welcher Tarif ist günstiger?", tr: "iki tarifeyi karşılaştırırken kullanılır" },
      { de: "unbegrenztes Internet", tr: "paketin içeriğini söylerken kullanılır" },
      { de: "Ich möchte den Vertrag kündigen", tr: "aboneliği bitirirken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün telefon bayisindeyiz. İki tarifeyi karşılaştırmayı ve gerekirse aboneliği bitirmeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da abonelik sözleşmeyle olur ve sözleşmeyi bitirmek de ayrı bir cümle ister. İkisini de bugün öğreniyoruz. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Tarif"),
          tr("Türkçesi 'tarife' demek. Lütfen"),
          de("der Tarif"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tarif" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("kündigen"),
          tr("Türkçesi 'iptal etmek' demek. Lütfen"),
          de("kündigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kündigen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("monatlich"),
          tr("Türkçesi 'aylık' demek. Lütfen"),
          de("monatlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "monatlich" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("unbegrenzt"),
          tr("Türkçesi 'sınırsız' demek. Lütfen"),
          de("unbegrenzt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unbegrenzt" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Internet"),
          tr("Türkçesi 'internet' demek. Lütfen"),
          de("das Internet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Internet" },
      },
      {
        say: [
          tr("Bayide ilk soracağın şey karşılaştırma:"),
          de("Welcher Tarif ist günstiger?"),
          tr("Soru kelimesi ismin cinsine uyuyor, sıfat da karşılaştırma ekini alıyor."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Welcher Tarif ist günstiger"), tr("deyin.")],
        expect: { kind: "repeat", target: "Welcher Tarif ist günstiger" },
      },
      {
        say: [tr("Sıra sende: 'Bu tarife daha pahalı.'")],
        expect: {
          kind: "produce",
          target: "Dieser Tarif ist teurer",
          hint: [
            tr("Sıfatın sonuna karşılaştırma eki gelir:"),
            de("Dieser Tarif ist teurer."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Paketin içinde ne olduğunu iki kelimeyle anlarsın:"),
          de("unbegrenztes Internet"),
          tr("Buradaki sıfat da geçen dersteki gibi ismin cinsine göre ek almış. Aylık ücret ise şöyle söylenir:"),
          de("Der Tarif kostet monatlich zwanzig Euro."),
        ],
      },
      {
        say: [
          tr("Sözleşmeyi bitirmek istediğinde tek bir cümle yeter. Sözleşme kelimesini iş dersinden biliyorsun. Lütfen"),
          de("Ich möchte den Vertrag kündigen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte den Vertrag kündigen" },
      },
      {
        say: [tr("Şimdi sen sor: 'Hangi tarife daha ucuz?'")],
        expect: {
          kind: "produce",
          target: "Welcher Tarif ist billiger",
          hint: [
            tr("Soru kelimesi eril biçimde kalır, sıfat ek alır:"),
            de("Welcher Tarif ist billiger?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Tarif kostet monatlich zwanzig Euro."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Tarif kostet monatlich zwanzig Euro.",
          answer: true,
          why: [
            tr("Doğru. Sıklık bildiren kelime fiilden sonra, fiyat ise en sonda duruyor:"),
            de("kostet monatlich zwanzig Euro"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık tarifeyi de sözleşmeyi de idare edersin. Şimdi bayidesin: danışman iki tarifeyi önüne koydu.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Telefon bayisinde iki tarife arasında seçim yapıyorsun. Hangisinin daha ucuz olduğunu sor, içeriklerini karşılaştır ve eski sözleşmeni iptal etmek istediğini söyle.",
      partner: "pahalı tarifeyi öneren, hızlı konuşan bir bayi danışmanı",
      opening: "Wir haben zwei Tarife im Angebot. Wie viel telefonieren Sie im Monat?",
      openingTr: "İki tarifemiz var. Ayda ne kadar konuşuyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-bank-konto",
    icon: "money",
    level: "A2",
    course: "de",
    title: "Ein Konto eröffnen",
    titleTr: "Banka hesabı",
    summary: "Bankada hesap açtırmayı ve gereken belgeleri sormayı öğretir.",
    minutes: 9,
    focusId: "W-Fragen",
    vocab: [
      { de: "das Konto", tr: "hesap" },
      { de: "eröffnen", tr: "açtırmak" },
      { de: "die Unterlagen", tr: "belgeler" },
      { de: "überweisen", tr: "havale etmek" },
      { de: "gebührenfrei", tr: "ücretsiz" },
    ],
    patterns: [
      { de: "Ich möchte ein Konto eröffnen", tr: "hesap açtırmak isterken kullanılır" },
      { de: "Welche Unterlagen brauche ich?", tr: "gereken belgeleri sorarken kullanılır" },
      { de: "Ist das gebührenfrei?", tr: "ücret olup olmadığını sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bankadayız. Hesap açtırmayı, hangi belgelerin gerektiğini sormayı ve para göndermeyi öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da hesap olmadan ne kira ödenir ne maaş alınır, o yüzden bu konuşma erken karşına çıkar. Sorular hep aynı soru kelimeleriyle başlar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Konto"),
          tr("Türkçesi 'hesap' demek. Lütfen"),
          de("das Konto"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Konto" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("eröffnen"),
          tr("Türkçesi 'açtırmak' demek. Lütfen"),
          de("eröffnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "eröffnen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Unterlagen"),
          tr("Türkçesi 'belgeler' demek; bu kelime hep çoğuldur. Lütfen"),
          de("die Unterlagen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Unterlagen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("überweisen"),
          tr("Türkçesi 'havale etmek' demek. Lütfen"),
          de("überweisen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "überweisen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gebührenfrei"),
          tr("Türkçesi 'ücretsiz' demek. Lütfen"),
          de("gebührenfrei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gebührenfrei" },
      },
      {
        say: [
          tr("Gişeye oturunca söyleyeceğin ilk cümle hazır:"),
          de("Ich möchte ein Konto eröffnen."),
          tr("İsteme fiili ikinci sırada, asıl fiil en sonda. Lütfen"),
          de("Ich möchte ein Konto eröffnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich möchte ein Konto eröffnen" },
      },
      {
        say: [
          tr("Arkasından belgeleri sorarsın. Soru kelimesi başta, fiil hemen ikinci sırada:"),
          de("Welche Unterlagen brauche ich?"),
        ],
      },
      {
        say: [tr("Sıra sende: 'Hangi belgelere ihtiyacım var?'")],
        expect: {
          kind: "produce",
          target: "Welche Unterlagen brauche ich",
          hint: [
            tr("Soru kelimesi ve sorduğun şey başta, fiil ikinci sırada, özne en sonda:"),
            de("Welche Unterlagen brauche ich?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Ücret konusu Almanya'da her zaman sorulur:"),
          de("Ist das Konto gebührenfrei?"),
          tr("Cevabı iyi olursa şunu duyarsın:"),
          de("Das Konto ist kostenlos."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Para göndermek istiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich möchte Geld überweisen",
          hint: [
            tr("İsteme fiili ikinci sırada, asıl fiil en sonda:"),
            de("Ich möchte Geld überweisen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kartın ne zaman geleceğini de sorabilirsin:"),
          de("Wann bekomme ich die Karte?"),
          tr("Lütfen"),
          de("Wann bekomme ich die Karte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wann bekomme ich die Karte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Welche Unterlagen ich brauche?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Welche Unterlagen ich brauche?",
          answer: false,
          why: [
            tr("Soru kelimesinden sonra fiil hemen ikinci sıraya gelir, özne arkasına düşer. Doğrusu:"),
            de("Welche Unterlagen brauche ich?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bankada işini kendin görürsün. Şimdi gişedesin: danışman önüne bir form koydu.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir bankada hesap açtırmak istiyorsun. Ne istediğini söyle, hangi belgelerin gerektiğini sor, ücret olup olmadığını öğren ve kartın ne zaman geleceğini sor.",
      partner: "her adımı sırayla anlatan, resmi ama nazik bir banka danışmanı",
      opening: "Guten Tag! Sind Sie schon Kundin bei uns?",
      openingTr: "İyi günler! Bizde hesabınız var mıydı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-post",
    icon: "mail",
    level: "A2",
    course: "de",
    title: "Auf der Post",
    titleTr: "Postanede",
    summary: "Postanede gönderi biçimini seçmeyi ve pul almayı öğretir.",
    minutes: 8,
    focusId: "Superlativ",
    vocab: [
      { de: "die Post", tr: "postane" },
      { de: "die Briefmarke", tr: "pul" },
      { de: "das Einschreiben", tr: "taahhütlü gönderi" },
      { de: "der Umschlag", tr: "zarf" },
      { de: "wiegen", tr: "tartmak" },
    ],
    patterns: [
      { de: "Was ist am schnellsten?", tr: "en hızlı seçeneği sorarken kullanılır" },
      { de: "per Einschreiben", tr: "gönderi biçimini söylerken kullanılır" },
      { de: "Zwei Briefmarken, bitte", tr: "pul isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün postanedeyiz. En hızlı yolu sormayı, taahhütlü göndermeyi ve pul almayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da resmi belgeler çoğu zaman taahhütlü gönderilir, çünkü ulaştığının kaydı kalır. Bugünün üstünlük kalıbı da tam burada işine yarayacak. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Post"),
          tr("Türkçesi 'postane' demek. Lütfen"),
          de("die Post"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Post" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Briefmarke"),
          tr("Türkçesi 'pul' demek. Lütfen"),
          de("die Briefmarke"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Briefmarke" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Einschreiben"),
          tr("Türkçesi 'taahhütlü gönderi' demek. Lütfen"),
          de("das Einschreiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Einschreiben" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Umschlag"),
          tr("Türkçesi 'zarf' demek. Lütfen"),
          de("der Umschlag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Umschlag" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("wiegen"),
          tr("Türkçesi 'tartmak' demek. Lütfen"),
          de("wiegen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wiegen" },
      },
      {
        say: [
          tr("Nereye gittiğini söylemek tek cümle:"),
          de("Ich gehe schnell zur Post."),
          tr("Gişede seçenekler sıralanır; sen üstünlük kalıbıyla sorarsın:"),
          de("Was ist am schnellsten?"),
          tr("Lütfen"),
          de("Was ist am schnellsten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Was ist am schnellsten" },
      },
      {
        say: [tr("Sıra sende: 'En ucuzu hangisi?'")],
        expect: {
          kind: "produce",
          target: "Was ist am billigsten",
          hint: [
            tr("Üstünlük kalıbında önce küçük kelime, sonra sonu büyümüş sıfat gelir:"),
            de("Was ist am billigsten?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Gönderi biçimini söylerken hazır bir kalıp var:"),
          de("per Einschreiben"),
          tr("Yani 'taahhütlü olarak'. Görevli önce paketi tartar:"),
          de("Wir wiegen das Paket zuerst."),
        ],
      },
      {
        say: [tr("Şimdi sen iste: 'İki pul, lütfen.'")],
        expect: {
          kind: "produce",
          target: "Zwei Briefmarken, bitte",
          hint: [
            tr("Sayı başta, kelimenin çoğulu ortada, kibarlık sonda:"),
            de("Zwei Briefmarken, bitte."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Zarf da gerekiyorsa aynı kısalıkta istersin:"),
          de("Einen Umschlag, bitte."),
          tr("Lütfen"),
          de("Einen Umschlag, bitte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Einen Umschlag, bitte" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Paket wiegt zwei Kilo."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Paket wiegt zwei Kilo.",
          answer: true,
          why: [
            tr("Doğru. Ağırlık söylenirken ölçü kelimesi çoğul olmaz, olduğu gibi kalır:"),
            de("zwei Kilo"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık postaneden elin boş dönmezsin. Şimdi sıradasın: görevli senin gönderini bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Postanede resmi bir belge göndereceksin. En hızlı ve en ucuz seçeneği sor, taahhütlü göndermek istediğini söyle ve yanına pul ile zarf al.",
      partner: "seçenekleri sırayla sayan, aceleci bir postane görevlisi",
      opening: "Der Nächste, bitte! Was möchten Sie verschicken?",
      openingTr: "Sıradaki, buyurun! Ne göndermek istiyorsunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-flohmarkt",
    icon: "shopping",
    level: "A2",
    course: "de",
    title: "Auf dem Flohmarkt",
    titleTr: "Bitpazarında pazarlık",
    summary: "Pazarlık etmeyi ve ikinci el bir şeyi almayı öğretir.",
    minutes: 8,
    focusId: "Komparativ",
    vocab: [
      { de: "der Flohmarkt", tr: "bitpazarı" },
      { de: "handeln", tr: "pazarlık etmek" },
      { de: "gebraucht", tr: "ikinci el" },
      { de: "verkaufen", tr: "satmak" },
      { de: "das Schnäppchen", tr: "kelepir" },
    ],
    patterns: [
      { de: "Das ist mir zu teuer", tr: "fiyatı yüksek bulduğunu söylerken kullanılır" },
      { de: "Geht es billiger?", tr: "pazarlık başlatırken kullanılır" },
      { de: "Letzter Preis?", tr: "son fiyatı sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bitpazarındayız ve burada fiyatlar sabit değil. Pazarlık etmeyi öğreneceğiz; bu modülün bütün karşılaştırma kalıpları burada işine yarayacak. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da mağazada pazarlık edilmez ama bitpazarında beklenir. Üç kısa cümle bütün pazarlığı yürütür. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Flohmarkt"),
          tr("Türkçesi 'bitpazarı' demek. Lütfen"),
          de("der Flohmarkt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Flohmarkt" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("handeln"),
          tr("Türkçesi 'pazarlık etmek' demek. Lütfen"),
          de("handeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "handeln" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("gebraucht"),
          tr("Türkçesi 'ikinci el' demek. Lütfen"),
          de("gebraucht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gebraucht" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("verkaufen"),
          tr("Türkçesi 'satmak' demek. Lütfen"),
          de("verkaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verkaufen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Schnäppchen"),
          tr("Türkçesi 'kelepir' demek. Lütfen"),
          de("das Schnäppchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schnäppchen" },
      },
      {
        say: [
          tr("Pazarlığın ilk cümlesi fiyatı reddetmez, sadece yüksek bulur:"),
          de("Das ist mir zu teuer."),
          tr("Ortadaki küçük kelime 'bana göre' demek ve cümleyi kibarlaştırır. Lütfen"),
          de("Das ist mir zu teuer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Das ist mir zu teuer" },
      },
      {
        say: [
          tr("İkinci cümle kapıyı aralar ve karşılaştırma biçimini kullanır:"),
          de("Geht es billiger?"),
          tr("Yani 'Daha ucuza olur mu?'"),
        ],
      },
      {
        say: [tr("Sıra sende: 'Daha ucuza olur mu?'")],
        expect: {
          kind: "produce",
          target: "Geht es billiger",
          hint: [
            tr("Fiil başta, sıfat da karşılaştırma ekini alır:"),
            de("Geht es billiger?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Buranın kuralı zaten bu:"),
          de("Auf dem Flohmarkt kann man handeln."),
          tr("Ürünün ikinci el olması da senin elini güçlendirir:"),
          de("Das Fahrrad ist gebraucht."),
          tr("Satıcıysan da tersini söylersin:"),
          de("Ich verkaufe hier alte Bücher."),
        ],
      },
      {
        say: [tr("Şimdi sen söyle: 'Bisikleti satıyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich verkaufe das Fahrrad",
          hint: [
            tr("Fiil ikinci sırada, sattığın şey arkasında:"),
            de("Ich verkaufe das Fahrrad."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Pazarlığı bitiren soru ise tek kelimeliktir:"),
          de("Letzter Preis?"),
          tr("Anlaştıysan da memnuniyetini söylersin:"),
          de("Das war ein gutes Geschäft."),
          tr("Lütfen"),
          de("Letzter Preis"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Letzter Preis" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das ist ein echtes Schnäppchen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das ist ein echtes Schnäppchen.",
          answer: true,
          why: [
            tr("Doğru. Nötr isimden önce gelen sıfat, sıfat çekimi dersinde öğrendiğin eki almış:"),
            de("ein echtes Schnäppchen"),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık pazarlık masasından kalkmadan fiyatı düşürebilirsin. Şimdi tezgâhın önündesin: gözüne bir bisiklet kestirdin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bitpazarında ikinci el bir bisiklet gördün ve almak istiyorsun. Fiyatı sor, yüksek bulduğunu kibarca söyle, pazarlık et ve son fiyatı öğren.",
      partner: "fiyatını kolay düşürmeyen, esprili bir tezgâh sahibi",
      opening: "Das Fahrrad ist ein Schnäppchen! Möchten Sie es ausprobieren?",
      openingTr: "Bu bisiklet tam kelepir! Denemek ister misiniz?",
      minTurns: 4,
    },
  },
];

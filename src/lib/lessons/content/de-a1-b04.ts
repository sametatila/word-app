import { de, tr, type Lesson } from "../types";

/**
 * A1 · Modül 4 — Günlük düzen (031–040).
 *
 * Modülün omurgası üç kural ve hepsi Türkçe konuşan için sezgiye aykırı:
 *
 *   1. **Ayrılabilen fiiller.** Türkçede fiilin başındaki bir parçanın kalkıp
 *      cümlenin sonuna gitmesi diye bir şey yok. Bu yüzden öğrenci öneki fiile
 *      yapışık bırakıyor ve „Ich aufstehe“ diyor.
 *   2. **Fiil ikinci sırada.** Türkçede fiil sona gider; başa bir zaman ifadesi
 *      koyunca öğrenci özneyi de öne alıp „Heute ich lerne“ diyor.
 *   3. **Yarım saat bir sonraki saate göre söylenir.** „halb acht“ yedi
 *      buçuktur, sekiz buçuk değil. Türkçe tam tersini yaptığı için bu, saat
 *      konusunun en pahalı hatası.
 *
 * Sıra bunun üzerine kurulu: önce günün iskeleti ve saat, sonra ayrılabilen
 * fiiller, sonra V2, en sonda ikisinin birlikte kullanıldığı plan ve randevu
 * konuşmaları. Her ders öncekilerin kelimelerini yeniden kullanıyor.
 */
export const deA1B04: Lesson[] = [
  {
    id: "de-a1-mein-tag",
    icon: "calendar",
    level: "A1",
    course: "de",
    title: "Mein Tag",
    titleTr: "Günlük rutin",
    summary: "Bir günün nasıl geçtiğini anlatmayı öğretir: gün başlar, çalışırsın, uyursun.",
    minutes: 8,
    focusId: "Konjugation-Präsens",
    vocab: [
      { de: "der Tag", tr: "gün" },
      { de: "der Morgen", tr: "sabah" },
      { de: "der Abend", tr: "akşam" },
      { de: "beginnen", tr: "başlamak" },
      { de: "die Nacht", tr: "gece" },
      { de: "zuerst", tr: "önce" },
      { de: "dann", tr: "sonra" },
      { de: "immer", tr: "her zaman" },
],
    patterns: [
      { de: "Mein Tag beginnt um …", tr: "günün kaçta başladığını söyler" },
      { de: "Ich arbeite …", tr: "ne zaman çalıştığını söyler" },
      { de: "Ich gehe schlafen.", tr: "uyumaya gittiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün gününü anlatmayı öğreneceğiz: günün kaçta başlıyor, ne zaman çalışıyorsun, ne zaman uyuyorsun. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Biriyle tanıştığında en çok konuşulan şeylerden biri bu. Üç kalıp öğreneceğiz ve üçüyle birlikte kendi gününü baştan sona anlatabileceksin. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Tag"),
          tr("Türkçesi 'gün' demek. Lütfen"),
          de("der Tag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Tag" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Morgen"),
          tr("Türkçesi 'sabah' demek. Lütfen"),
          de("der Morgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Morgen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Abend"),
          tr("Türkçesi 'akşam' demek. Lütfen"),
          de("der Abend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Abend" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("beginnen"),
          tr("Türkçesi 'başlamak' demek. Lütfen"),
          de("beginnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "beginnen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Nacht"),
          tr("Türkçesi 'gece' demek. Lütfen"),
          de("die Nacht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nacht" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("zuerst"),
          tr("Türkçesi 'önce' demek. Lütfen"),
          de("zuerst"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zuerst" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("dann"),
          tr("Türkçesi 'sonra' demek. Lütfen"),
          de("dann"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "dann" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("immer"),
          tr("Türkçesi 'her zaman' demek. Lütfen"),
          de("immer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "immer" },
      },
      {
        say: [
          tr("Şimdi ilk kalıbımız:"),
          de("Mein Tag beginnt um …"),
          tr("Günün kaçta başladığını söyler. Saat, kalıbın sonuna gelir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Günüm yedide başlıyor.' Almancası:"),
          de("Mein Tag beginnt um sieben."),
          tr("Lütfen"),
          de("Mein Tag beginnt um sieben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Tag beginnt um sieben" },
      },
      {
        say: [tr("Sıra sende: 'Günüm sekizde başlıyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Tag beginnt um acht",
          hint: [
            tr("Saat kalıbın sonuna gelir:"),
            de("Mein Tag beginnt um acht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Ich arbeite …"),
          tr(
            "Almancada fiilin sonu kişiye göre değişir — tıpkı Türkçedeki gibi. 'Çalışırım' derken sona e, 'çalışırsın' derken sona st gelir. Bu fiilin gövdesi t ile bittiği için araya bir e daha girer:",
          ),
          de("arbeitest"),
          tr("gibi."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Sabahları çalışıyorum.' Almancası:"),
          de("Ich arbeite am Morgen."),
          tr("Lütfen"),
          de("Ich arbeite am Morgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich arbeite am Morgen" },
      },
      {
        say: [
          tr("Şimdi sen sor: 'Akşamları çalışıyor musun?' demek için ne dersin? Soruda fiil başa geçer."),
        ],
        expect: {
          kind: "produce",
          target: "Arbeitest du am Abend",
          hint: [
            tr("Soruda fiil başa geçer ve 'sen' için sonuna st gelir:"),
            de("Arbeitest du am Abend?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız:"),
          de("Ich gehe schlafen."),
          tr("'Uyumaya gidiyorum' demek. Lütfen"),
          de("Ich gehe schlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich gehe schlafen" },
      },
      {
        say: [tr("Bir cümle daha: 'Akşamım altıda başlıyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Mein Abend beginnt um sechs",
          hint: [
            tr("Kalıp aynı, sadece günün yerine akşamı koyuyorsun:"),
            de("Mein Abend beginnt um sechs."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mein Tag beginnen um sieben."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mein Tag beginnen um sieben.",
          answer: false,
          why: [
            tr("Fiil burada kişiye göre değişmeli. Öznemiz 'benim günüm' olduğu için doğrusu"),
            de("Mein Tag beginnt um sieben."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık gününü baştan sona anlatabilirsin. Şimdi bunu gerçek bir konuşmada kullanacaksın: yeni bir iş arkadaşın gününü merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni işindesin ve öğle molasında bir iş arkadaşınla sohbet ediyorsun. Gününün nasıl geçtiğini anlat: kaçta başlıyor, ne zaman çalışıyorsun, akşam ne yapıyorsun.",
      partner: "güler yüzlü, sohbeti seven bir iş arkadaşı",
      opening: "Sag mal, wann beginnt dein Tag? Stehst du früh auf?",
      openingTr: "Söylesene, günün kaçta başlıyor? Erken kalkıyor musun?",
      goal: "Gününün başlangıcı, iş saatleri ve akşamı anlatılmış; iş arkadaşın da kendi gününden bir şey söylemiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-uhrzeit",
    icon: "clock",
    level: "A1",
    course: "de",
    title: "Wie spät ist es?",
    titleTr: "Saat",
    summary: "Saati sormayı ve söylemeyi öğretir; yarım saatin Almancada nasıl kurulduğunu gösterir.",
    minutes: 9,
    focusId: "Uhrzeit",
    vocab: [
      { de: "die Uhr", tr: "saat" },
      { de: "die Stunde", tr: "saat süresi" },
      { de: "die Minute", tr: "dakika" },
      { de: "halb", tr: "yarım" },
      { de: "spät", tr: "geç" },
      { de: "der Moment", tr: "an" },
      { de: "gleich", tr: "birazdan" },
      { de: "gerade", tr: "şu anda" },
],
    patterns: [
      { de: "Wie spät ist es?", tr: "saati sorarken kullanılır" },
      { de: "Es ist halb …", tr: "yarım saati söylerken kullanılır" },
      { de: "Um wie viel Uhr …?", tr: "bir şeyin kaçta olduğunu sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün saati öğreneceğiz: saati sormak, saati söylemek ve bir şeyin kaçta olduğunu sormak. Burada Türkçeden ayrılan bir nokta var, onu da göreceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Saat, bir dilde en çok kullanılan şeylerden biri. Randevu alırken, tren sorarken, buluşma ayarlarken hep lazım. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Uhr"),
          tr("Türkçesi 'saat' demek — hem duvardaki saat hem kolundaki. Lütfen"),
          de("die Uhr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Uhr" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Stunde"),
          tr("Bu da 'saat' ama süre olarak: 'iki saat sürdü' derkenki saat. Lütfen"),
          de("die Stunde"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Stunde" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Minute"),
          tr("Türkçesi 'dakika' demek. Lütfen"),
          de("die Minute"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Minute" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("halb"),
          tr("Türkçesi 'yarım' demek. Lütfen"),
          de("halb"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "halb" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("spät"),
          tr("Türkçesi 'geç' demek. Lütfen"),
          de("spät"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spät" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Moment"),
          tr("Türkçesi 'an' demek. Lütfen"),
          de("der Moment"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Moment" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("gleich"),
          tr("Türkçesi 'birazdan' demek. Lütfen"),
          de("gleich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gleich" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("gerade"),
          tr("Türkçesi 'şu anda' demek. Lütfen"),
          de("gerade"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gerade" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wie spät ist es?"),
          tr("'Saat kaç?' demek. Kelime kelime çevirirsen 'ne kadar geç' çıkar ama anlamı sadece saat sormak."),
        ],
      },
      {
        say: [
          tr("Cevap şöyle olur: 'Saat üç.' Almancası:"),
          de("Es ist drei Uhr."),
          tr("Lütfen"),
          de("Es ist drei Uhr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es ist drei Uhr" },
      },
      {
        say: [
          tr("Sıra sende: 'Saat yedi.' demek için ne dersin?"),
        ],
        expect: {
          kind: "produce",
          target: "Es ist sieben Uhr",
          accept: ["Es ist sieben"],
          hint: [
            tr("Kalıp hazır, sadece sayıyı değiştir:"),
            de("Es ist sieben Uhr."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr(
            "Şimdi dikkat — burası çok kişinin yanıldığı yer. Türkçede 'yedi buçuk' dersin, yani geçtiğin saati temel alırsın. Almancada ise gelecek saat temel alınır:",
          ),
          de("halb acht"),
          tr("dedikleri şey yedi buçuktur. Sekiz buçuk değil."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Saat yedi buçuk.' Almancası:"),
          de("Es ist halb acht."),
          tr("Lütfen"),
          de("Es ist halb acht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es ist halb acht" },
      },
      {
        say: [tr("Şimdi sen dene: 'Saat üç buçuk.' demek için ne dersin? Bir sonraki saati söylemen gerekiyor.")],
        expect: {
          kind: "produce",
          target: "Es ist halb vier",
          hint: [
            tr("Üç buçuk için dörde yarım kaldığını söylüyorsun:"),
            de("Es ist halb vier."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız:"),
          de("Um wie viel Uhr …?"),
          tr("Bir şeyin kaçta olduğunu sorar. Örnek:"),
          de("Um wie viel Uhr beginnt dein Tag?"),
          tr("Lütfen"),
          de("Um wie viel Uhr beginnt dein Tag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Um wie viel Uhr beginnt dein Tag" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es ist halb neun."),
          tr("Bu cümle 'saat sekiz buçuk' demek. Doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es ist halb neun.",
          answer: true,
          why: [
            tr("Doğru. Almancada yarım, gelecek saate göre söylenir:"),
            de("halb neun"),
            tr("dokuza yarım saat var demek, yani sekiz buçuk."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık saati sorabilir ve söyleyebilirsin. Şimdi bunu kullanacaksın: bir yabancı sana saati soracak ve sonra tren saatlerini konuşacaksınız.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Durakta beklerken biri sana saati soruyor. Saati söyle, sonra sen de ona trenin kaçta geldiğini sor. Yarım saatleri kullanmaya çalış.",
      partner: "acelesi olan ama kibar bir yolcu",
      opening: "Entschuldigung, wie spät ist es bitte?",
      openingTr: "Affedersiniz, saat kaç acaba?",
      goal: "Saat söylenmiş ve trenin kaçta geleceği öğrenilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-trennbar",
    icon: "bed",
    level: "A1",
    course: "de",
    title: "Ich stehe früh auf",
    titleTr: "Ayrılabilen fiiller",
    summary: "Öneki cümlenin sonuna giden fiilleri öğretir: aufstehen, einkaufen, anrufen.",
    minutes: 9,
    focusId: "Trennbare-Verben",
    vocab: [
      { de: "aufstehen", tr: "kalkmak" },
      { de: "einkaufen", tr: "alışveriş yapmak" },
      { de: "anrufen", tr: "telefonla aramak" },
      { de: "ankommen", tr: "varmak" },
      { de: "mitkommen", tr: "birlikte gelmek" },
      { de: "aufmachen", tr: "açmak" },
      { de: "zumachen", tr: "kapatmak" },
      { de: "anmachen", tr: "açmak" },
],
    patterns: [
      { de: "Ich stehe um … auf.", tr: "kaçta kalktığını söyler" },
      { de: "Ich kaufe … ein.", tr: "ne zaman alışveriş yaptığını söyler" },
      { de: "Rufst du mich an?", tr: "birinden seni aramasını isterken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almancanın en şaşırtıcı kurallarından birini öğreneceğiz: bazı fiiller ikiye ayrılıyor ve bir parçası cümlenin sonuna gidiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede böyle bir şey yok, o yüzden ilk başta tuhaf geliyor. Ama bu fiiller günlük hayatın tam ortasında: kalkmak, alışveriş yapmak, telefon etmek. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("aufstehen"),
          tr("Türkçesi 'kalkmak' demek. Lütfen"),
          de("aufstehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufstehen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("einkaufen"),
          tr("Türkçesi 'alışveriş yapmak' demek. Lütfen"),
          de("einkaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "einkaufen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("anrufen"),
          tr("Türkçesi 'telefonla aramak' demek. Lütfen"),
          de("anrufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anrufen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ankommen"),
          tr("Türkçesi 'varmak' demek — trenin gara varması gibi. Lütfen"),
          de("ankommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ankommen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("mitkommen"),
          tr("Türkçesi 'birlikte gelmek' demek. Lütfen"),
          de("mitkommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "mitkommen" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("aufmachen"),
          tr("Türkçesi 'açmak' demek. Lütfen"),
          de("aufmachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufmachen" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("zumachen"),
          tr("Türkçesi 'kapatmak' demek. Lütfen"),
          de("zumachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zumachen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("anmachen"),
          tr("Türkçesi 'açmak' demek. Lütfen"),
          de("anmachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anmachen" },
      },
      {
        say: [
          tr(
            "Şimdi kural. Bu fiillerin başındaki küçük parça, cümle kurulunca yerinde durmuyor: fiilin gövdesi ikinci sıraya geçiyor, baştaki parça ise cümlenin en sonuna gidiyor. Yani fiil ikiye bölünüyor ve cümleyi kucaklıyor.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız. 'Altıda kalkıyorum.' Almancası:"),
          de("Ich stehe um sechs auf."),
          tr("Baştaki parça en sona gitti. Lütfen"),
          de("Ich stehe um sechs auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich stehe um sechs auf" },
      },
      {
        say: [tr("Sıra sende: 'Yedide kalkıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich stehe um sieben auf",
          hint: [
            tr("Baştaki parça cümlenin sonuna gider:"),
            de("Ich stehe um sieben auf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız. 'Cumartesi alışveriş yapıyorum.' Almancası:"),
          de("Ich kaufe am Samstag ein."),
          tr("Lütfen"),
          de("Ich kaufe am Samstag ein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich kaufe am Samstag ein" },
      },
      {
        say: [tr("Şimdi sen: 'Yarın alışveriş yapıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kaufe morgen ein",
          hint: [
            tr("Zaman ortada kalır, parça en sonda:"),
            de("Ich kaufe morgen ein."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız bir soru:"),
          de("Rufst du mich an?"),
          tr("'Beni arar mısın?' demek. Soruda bile parça sonda kalıyor. Lütfen"),
          de("Rufst du mich an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Rufst du mich an" },
      },
      {
        say: [tr("Bir tane daha: 'Beni akşam arar mısın?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Rufst du mich am Abend an",
          hint: [
            tr("Zaman ifadesi araya girer, parça yine sonda:"),
            de("Rufst du mich am Abend an?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich aufstehe um sechs."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich aufstehe um sechs.",
          answer: false,
          why: [
            tr("Parça fiile yapışık kalmış. Cümle kurulunca en sona gitmeli:"),
            de("Ich stehe um sechs auf."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bu fiilleri doğru kurabilirsin. Şimdi bir arkadaşınla yarının planını konuşacaksın ve bu fiillere sürekli ihtiyacın olacak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla yarını planlıyorsunuz. Kaçta kalkacağını, ne zaman alışverişe gideceğini söyle ve onu seninle gelmeye çağır. Ayrılabilen fiilleri kullan.",
      partner: "her şeyi son dakikaya bırakan bir arkadaş",
      opening: "Hallo! Stehst du morgen früh auf oder schläfst du lange?",
      openingTr: "Selam! Yarın erken mi kalkıyorsun, yoksa geç mi uyanacaksın?",
      goal: "Yarın kaçta kalkacağın ve alışverişe kaçta gideceğiniz kararlaşmış, arkadaşın gelip gelmeyeceğini söylemiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-wochentage",
    icon: "calendar",
    level: "A1",
    course: "de",
    title: "Am Montag habe ich Zeit",
    titleTr: "Haftanın günleri",
    summary: "Haftanın günlerini ve gün ile saati birbirinden ayıran edatları öğretir.",
    minutes: 8,
    focusId: "Temporal-am-um",
    vocab: [
      { de: "der Montag", tr: "pazartesi" },
      { de: "der Dienstag", tr: "salı" },
      { de: "der Samstag", tr: "cumartesi" },
      { de: "der Sonntag", tr: "pazar" },
      { de: "die Woche", tr: "hafta" },
      { de: "jeder", tr: "her" },
      { de: "letzte", tr: "son" },
      { de: "nie", tr: "asla" },
],
    patterns: [
      { de: "Am Montag …", tr: "hangi gün olduğunu söyler" },
      { de: "Um … Uhr …", tr: "saat kaçta olduğunu söyler" },
      { de: "von … bis …", tr: "başlangıç ve bitişi söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün haftanın günlerini öğreneceğiz ve çok işine yarayacak küçük bir kural göreceğiz: gün için ayrı, saat için ayrı bir kelime kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Randevu almak, buluşma ayarlamak, 'ne zaman müsaitsin' demek — hepsi bu iki küçük kelimeye bağlı. Önce günleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Montag"),
          tr("Türkçesi 'pazartesi' demek. Lütfen"),
          de("der Montag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Montag" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Dienstag"),
          tr("Türkçesi 'salı' demek. Lütfen"),
          de("der Dienstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Dienstag" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Samstag"),
          tr("Türkçesi 'cumartesi' demek. Lütfen"),
          de("der Samstag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Samstag" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Sonntag"),
          tr("Türkçesi 'pazar' demek. Lütfen"),
          de("der Sonntag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sonntag" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("die Woche"),
          tr("Türkçesi 'hafta' demek. Lütfen"),
          de("die Woche"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Woche" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("jeder"),
          tr("Türkçesi 'her' demek. Lütfen"),
          de("jeder"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "jeder" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("letzte"),
          tr("Türkçesi 'son' demek. Lütfen"),
          de("letzte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "letzte" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("nie"),
          tr("Türkçesi 'asla' demek. Lütfen"),
          de("nie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "nie" },
      },
      {
        say: [
          tr("Şimdi kural. Günlerle"),
          de("am"),
          tr("kullanılır, saatlerle"),
          de("um"),
          tr("kullanılır. Türkçede ikisi de aynı ekle söylendiği için karıştırmak kolay: pazartesi günü, saat sekizde."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız. 'Pazartesi vaktim var.' Almancası:"),
          de("Am Montag habe ich Zeit."),
          tr("Lütfen"),
          de("Am Montag habe ich Zeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Montag habe ich Zeit" },
      },
      {
        say: [tr("Sıra sende: 'Salı günü vaktim yok.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Dienstag habe ich keine Zeit",
          hint: [
            tr("Gün için kullandığımız kelimeyi hatırla ve olumsuzu sona ekle:"),
            de("Am Dienstag habe ich keine Zeit."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız saat için. 'Sekizde günüm başlıyor.' Almancası:"),
          de("Um acht Uhr beginnt mein Tag."),
          tr("Lütfen"),
          de("Um acht Uhr beginnt mein Tag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Um acht Uhr beginnt mein Tag" },
      },
      {
        say: [tr("Şimdi sen: 'Pazar günü çalışmıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Sonntag arbeite ich nicht",
          hint: [
            tr("Gün başa gelince fiil hemen arkasından gelir:"),
            de("Am Sonntag arbeite ich nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız bir aralık bildiriyor:"),
          de("von … bis …"),
          tr("Örnek: 'Dokuzdan beşe kadar çalışıyorum.'"),
          de("Ich arbeite von neun bis fünf."),
          tr("Lütfen"),
          de("Ich arbeite von neun bis fünf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich arbeite von neun bis fünf" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Am Samstag habe ich Zeit."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Am Samstag habe ich Zeit.",
          answer: true,
          why: [
            tr("Doğru. Günlerle"),
            de("am"),
            tr("kullanılır ve gün başa geçince fiil hemen arkasından gelir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hangi gün ve saat müsait olduğunu söyleyebilirsin. Şimdi bir spor salonunda ders saati ayarlayacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir spor salonuna yazılıyorsun ve görevliyle hangi gün, hangi saatte geleceğini konuşuyorsun. Günleri ve saatleri doğru edatlarla söyle.",
      partner: "yardımcı olmaya çalışan bir spor salonu görevlisi",
      opening: "Guten Tag! An welchen Tagen möchten Sie kommen?",
      openingTr: "İyi günler! Hangi günler gelmek istersiniz?",
      goal: "Hangi gün ve hangi saatte geleceğin kararlaştırılmış ve görevli bunu kaydetmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-v2",
    icon: "school",
    level: "A1",
    course: "de",
    title: "Heute lerne ich Deutsch",
    titleTr: "Fiil ikinci sırada",
    summary: "Cümlenin başına zaman ifadesi gelince fiilin yerinin değişmediğini öğretir.",
    minutes: 9,
    focusId: "V2-Regel",
    vocab: [
      { de: "heute", tr: "bugün" },
      { de: "morgen", tr: "yarın" },
      { de: "das Wochenende", tr: "hafta sonu" },
      { de: "lernen", tr: "öğrenmek" },
      { de: "manchmal", tr: "bazen" },
      { de: "noch", tr: "hâlâ" },
      { de: "schon", tr: "çoktan" },
      { de: "sicher", tr: "emin" },
],
    patterns: [
      { de: "Heute lerne ich …", tr: "bugün ne yaptığını söyler" },
      { de: "Morgen …", tr: "yarın ne yapacağını söyler" },
      { de: "Am Wochenende …", tr: "hafta sonu ne yaptığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almancanın belkemiği olan kuralı öğreneceğiz. Bir kere oturunca cümlelerinin yarısı kendiliğinden düzelir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kural şu: Almanca cümlede çekimli fiil her zaman ikinci öğedir. Türkçede fiil sona gider, bu yüzden en çok atlanan kural bu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("heute"),
          tr("Türkçesi 'bugün' demek. Lütfen"),
          de("heute"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "heute" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("morgen"),
          tr("Türkçesi 'yarın' demek. Lütfen"),
          de("morgen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "morgen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Wochenende"),
          tr("Türkçesi 'hafta sonu' demek. Lütfen"),
          de("das Wochenende"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wochenende" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("lernen"),
          tr("Türkçesi 'öğrenmek' demek. Lütfen"),
          de("lernen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lernen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("manchmal"),
          tr("Türkçesi 'bazen' demek. Lütfen"),
          de("manchmal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "manchmal" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("noch"),
          tr("Türkçesi 'hâlâ' demek. Lütfen"),
          de("noch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "noch" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("schon"),
          tr("Türkçesi 'çoktan' demek. Lütfen"),
          de("schon"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schon" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sicher"),
          tr("Türkçesi 'emin' demek. Lütfen"),
          de("sicher"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sicher" },
      },
      {
        say: [
          tr(
            "Şimdi kuralı görelim. Cümleye normalde özneyle başlarsın. Ama başa bir zaman ifadesi koyarsan, o ifade birinci öğe olur ve fiil yerini korumak için özneyi arkasına atar. Yani özne ile fiil yer değiştirir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bugün Almanca öğreniyorum.' Almancası:"),
          de("Heute lerne ich Deutsch."),
          tr("Fiil ikinci sırada, özne arkasında. Lütfen"),
          de("Heute lerne ich Deutsch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Heute lerne ich Deutsch" },
      },
      {
        say: [tr("Sıra sende: 'Yarın Almanca öğreniyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Morgen lerne ich Deutsch",
          hint: [
            tr("Başa zaman gelince özne fiilin arkasına geçer:"),
            de("Morgen lerne ich Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci örnek. 'Yarın çalışmıyorum.' Almancası:"),
          de("Morgen arbeite ich nicht."),
          tr("Lütfen"),
          de("Morgen arbeite ich nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Morgen arbeite ich nicht" },
      },
      {
        say: [tr("Şimdi sen: 'Hafta sonu bazen çalışıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Wochenende arbeite ich manchmal",
          hint: [
            tr("Hafta sonu başta, fiil hemen arkasında:"),
            de("Am Wochenende arbeite ich manchmal."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha duyalım:"),
          de("Am Wochenende schlafe ich lange."),
          tr("'Hafta sonu geç uyanıyorum' demek. Lütfen"),
          de("Am Wochenende schlafe ich lange"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Wochenende schlafe ich lange" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Heute ich lerne Deutsch."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Heute ich lerne Deutsch.",
          answer: false,
          why: [
            tr("Başta zaman ifadesi varken özne fiilin arkasına geçmeli. Doğrusu"),
            de("Heute lerne ich Deutsch."),
          ],
        },
      },
      {
        say: [
          tr(
            "Bu kuralı kullandıkça yerleşecek. Şimdi bir dil kursunda öğretmeninle konuşacaksın ve cümlelerine zaman ifadeleriyle başlayacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir dil kursundasın ve öğretmenin ne zaman çalıştığını soruyor. Cevaplarına 'bugün', 'yarın' ve 'hafta sonu' ile başla — kuralı kullanman gereken yer tam orası.",
      partner: "meraklı ve cesaretlendiren bir dil öğretmeni",
      opening: "Schön, dass Sie da sind! Wann lernen Sie am liebsten Deutsch?",
      openingTr: "Geldiğinize sevindim! Almanca çalışmayı en çok ne zaman seviyorsunuz?",
      goal: "Bugün, yarın ve hafta sonu ne yapacağın söylenmiş; öğretmen çalışma planını onaylamış olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-morgenroutine",
    icon: "sun",
    level: "A1",
    course: "de",
    title: "Zuerst dusche ich",
    titleTr: "Sabah sıralaması",
    summary: "Sabah yaptıklarını sırayla anlatmayı öğretir: önce, sonra, ardından.",
    minutes: 8,
    focusId: "V2-Regel",
    vocab: [
      { de: "wecken", tr: "uyandırmak" },
      { de: "sich waschen", tr: "yıkanmak" },
      { de: "duschen", tr: "duş almak" },
      { de: "sich anziehen", tr: "giyinmek" },
      { de: "schnell", tr: "hızlı" },
      { de: "baden", tr: "banyo yapmak" },
      { de: "frühstücken", tr: "kahvaltı yapmak" },
      { de: "früh", tr: "erken" },
],
    patterns: [
      { de: "Zuerst …", tr: "ilk yaptığın şeyi söyler" },
      { de: "Dann …", tr: "sonra yaptığın şeyi söyler" },
      { de: "Danach …", tr: "ardından yaptığın şeyi söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün sabahını sırayla anlatmayı öğreneceğiz. Sıralama kelimeleri de cümlenin başına geliyor, yani dünkü kuralı yeniden kullanacağız. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir şeyi adım adım anlatabilmek en işe yarayan becerilerden biri: tarif verirken, yemek anlatırken, günü anlatırken hep lazım. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("wecken"),
          tr("Türkçesi 'uyandırmak' demek. Lütfen"),
          de("wecken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wecken" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich waschen"),
          tr("Türkçesi 'yıkanmak' demek. Lütfen"),
          de("sich waschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich waschen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("duschen"),
          tr("Türkçesi 'duş almak' demek. Lütfen"),
          de("duschen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "duschen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("sich anziehen"),
          tr("Türkçesi 'giyinmek' demek. Lütfen"),
          de("sich anziehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich anziehen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("schnell"),
          tr("Türkçesi 'hızlı' demek. Lütfen"),
          de("schnell"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schnell" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("baden"),
          tr("Türkçesi 'banyo yapmak' demek. Lütfen"),
          de("baden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "baden" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("frühstücken"),
          tr("Türkçesi 'kahvaltı yapmak' demek. Lütfen"),
          de("frühstücken"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "frühstücken" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("früh"),
          tr("Türkçesi 'erken' demek. Lütfen"),
          de("früh"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "früh" },
      },
      {
        say: [
          tr("İlk sıralama kelimemiz:"),
          de("Zuerst"),
          tr("'Önce' demek ve cümlenin başına gelir. Başa geldiği için fiil hemen arkasından gelir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Önce uyanıyorum.' Almancası:"),
          de("Zuerst wache ich auf."),
          tr("Lütfen"),
          de("Zuerst wache ich auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zuerst wache ich auf" },
      },
      {
        say: [tr("Sıra sende: 'Önce duş alıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Zuerst dusche ich",
          hint: [
            tr("Sıralama kelimesi başta, fiil hemen arkasında:"),
            de("Zuerst dusche ich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci sıralama kelimemiz:"),
          de("Dann"),
          tr("'Sonra' demek. Örnek: 'Sonra giyiniyorum.'"),
          de("Dann ziehe ich mich an."),
          tr("Lütfen"),
          de("Dann ziehe ich mich an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Dann ziehe ich mich an" },
      },
      {
        say: [tr("Şimdi sen: 'Sonra hızlıca giyiniyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Dann ziehe ich mich schnell an",
          hint: [
            tr("Hızlı kelimesi ortada kalır, ayrılan parça en sonda:"),
            de("Dann ziehe ich mich schnell an."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü sıralama kelimemiz:"),
          de("Danach"),
          tr("'Ardından' demek. Örnek:"),
          de("Danach trinke ich Tee."),
          tr("Lütfen"),
          de("Danach trinke ich Tee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Danach trinke ich Tee" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zuerst dusche ich, dann trinke ich Tee."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zuerst dusche ich, dann trinke ich Tee.",
          answer: true,
          why: [
            tr("Doğru. İki bölümde de sıralama kelimesi başta ve fiil hemen arkasında."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık sabahını sırayla anlatabilirsin. Şimdi bunu kullanacaksın: ev arkadaşın sabahları neden bu kadar geç çıktığını merak ediyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ev arkadaşın sabahları neden geç çıktığını soruyor. Sabah sıranı adım adım anlat: önce ne yapıyorsun, sonra ne, ardından ne.",
      partner: "sabahları çok erken kalkan bir ev arkadaşı",
      opening: "Du bist wieder spät dran! Was machst du morgens so lange?",
      openingTr: "Yine geç kaldın! Sabahları bu kadar uzun ne yapıyorsun?",
      goal: "Sabah sıran baştan sona anlatılmış ve geç çıkmanın sebebi bulunmuş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-arbeitstag",
    icon: "job",
    level: "A1",
    course: "de",
    title: "Ein langer Arbeitstag",
    titleTr: "İş günü",
    summary: "İşin kaçta başlayıp bittiğini ve mola vermeyi anlatmayı öğretir.",
    minutes: 9,
    focusId: "Trennbare-Verben",
    vocab: [
      { de: "anfangen", tr: "başlamak" },
      { de: "aufhören", tr: "bırakmak" },
      { de: "die Pause", tr: "mola" },
      { de: "der Kollege", tr: "iş arkadaşı" },
      { de: "der Arbeitsplatz", tr: "iş yeri" },
      { de: "die Aufgabe", tr: "görev" },
      { de: "das Praktikum", tr: "staj" },
      { de: "enden", tr: "bitmek" },
],
    patterns: [
      { de: "Die Arbeit fängt um … an.", tr: "işin kaçta başladığını söyler" },
      { de: "Ich höre um … auf.", tr: "işi kaçta bitirdiğini söyler" },
      { de: "Ich mache eine Pause.", tr: "mola verdiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iş gününü anlatmayı öğreneceğiz: iş kaçta başlıyor, kaçta bitiyor, ne zaman mola veriyorsun. İki tane daha ayrılabilen fiil göreceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu kalıplar iş yerinde her gün kullanılır. Bir tanesinde küçük bir sürpriz var: fiilin ortasındaki harf değişiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("anfangen"),
          tr("Türkçesi 'başlamak' demek. Lütfen"),
          de("anfangen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "anfangen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("aufhören"),
          tr("Türkçesi 'bitirmek, son vermek' demek. Lütfen"),
          de("aufhören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufhören" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Pause"),
          tr("Türkçesi 'mola' demek. Lütfen"),
          de("die Pause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Pause" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Kollege"),
          tr("Türkçesi 'iş arkadaşı' demek. Lütfen"),
          de("der Kollege"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kollege" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Arbeitsplatz"),
          tr("Türkçesi 'iş yeri' demek. Lütfen"),
          de("der Arbeitsplatz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Arbeitsplatz" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("die Aufgabe"),
          tr("Türkçesi 'görev' demek. Lütfen"),
          de("die Aufgabe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Aufgabe" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Praktikum"),
          tr("Türkçesi 'staj' demek. Lütfen"),
          de("das Praktikum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Praktikum" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("enden"),
          tr("Türkçesi 'bitmek' demek. Lütfen"),
          de("enden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "enden" },
      },
      {
        say: [
          tr(
            "İlk kalıbımızda küçük bir sürpriz var. Başlamak fiili üçüncü kişide ortadaki sesi değiştiriyor ve baştaki parça yine sona gidiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'İş dokuzda başlıyor.' Almancası:"),
          de("Die Arbeit fängt um neun an."),
          tr("Lütfen"),
          de("Die Arbeit fängt um neun an"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Arbeit fängt um neun an" },
      },
      {
        say: [tr("Sıra sende: 'İş sekizde başlıyor.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Die Arbeit fängt um acht an",
          hint: [
            tr("Ortadaki ses değişiyor ve parça en sona gidiyor:"),
            de("Die Arbeit fängt um acht an."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız işin bitişi için. 'Beşte bitiriyorum.' Almancası:"),
          de("Ich höre um fünf auf."),
          tr("Lütfen"),
          de("Ich höre um fünf auf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich höre um fünf auf" },
      },
      {
        say: [tr("Şimdi sen: 'Altıda bitiriyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich höre um sechs auf",
          hint: [
            tr("Saat ortada, ayrılan parça en sonda:"),
            de("Ich höre um sechs auf."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız:"),
          de("Ich mache eine Pause."),
          tr("'Mola veriyorum' demek. Lütfen"),
          de("Ich mache eine Pause"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich mache eine Pause" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Die Arbeit fängt um neun."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Die Arbeit fängt um neun.",
          answer: false,
          why: [
            tr("Fiilin ayrılan parçası eksik kalmış. Cümlenin sonuna gelmeli:"),
            de("Die Arbeit fängt um neun an."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iş gününü baştan sona anlatabilirsin. Şimdi ofiste yeni bir iş arkadaşına çalışma saatlerini anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Ofise yeni gelen bir iş arkadaşın çalışma saatlerini soruyor. İşin kaçta başladığını, kaçta bittiğini ve ne zaman mola verdiğini anlat.",
      partner: "işe yeni başlamış, biraz çekingen bir iş arkadaşı",
      opening: "Entschuldige, wann fängt die Arbeit hier eigentlich an?",
      openingTr: "Pardon, burada iş aslında kaçta başlıyor?",
      goal: "Çalışma saatlerin ve mola düzenin anlatılmış; yeni iş arkadaşın kendi saatlerini söylemiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-feierabend",
    icon: "feelings",
    level: "A1",
    course: "de",
    title: "Endlich Feierabend!",
    titleTr: "İş sonrası",
    summary: "İş çıkışında ne yaptığını ve neyi tercih ettiğini anlatmayı öğretir.",
    minutes: 8,
    focusId: "Gern-lieber",
    vocab: [
      { de: "der Feierabend", tr: "iş çıkışı" },
      { de: "die Lust", tr: "istek" },
      { de: "fernsehen", tr: "televizyon izlemek" },
      { de: "spazieren gehen", tr: "yürüyüşe çıkmak" },
      { de: "endlich", tr: "nihayet" },
      { de: "der Spaß", tr: "eğlence" },
      { de: "das Ende", tr: "son" },
      { de: "sitzen", tr: "oturmak" },
],
    patterns: [
      { de: "Nach der Arbeit …", tr: "iş çıkışında ne yaptığını söyler" },
      { de: "Ich ruhe mich aus.", tr: "dinlendiğini söyler" },
      { de: "Ich … lieber …", tr: "iki şeyden hangisini tercih ettiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iş çıkışını konuşacağız: yorgunken ne yaparsın, neyi daha çok tercih edersin. Küçük bir kelime öğreneceğiz ve onunla tercihini söyleyebileceksin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almancada iş çıkışının kendine ait bir kelimesi var — Türkçede tek kelimeyle karşılığı yok. Onunla başlayalım, sonra kalıplara geçeriz.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Feierabend"),
          tr("İş bittikten sonraki serbest zaman demek. Lütfen"),
          de("der Feierabend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Feierabend" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Lust"),
          tr("Türkçesi 'istek' demek. Lütfen"),
          de("die Lust"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Lust" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("fernsehen"),
          tr("Türkçesi 'televizyon izlemek' demek. Lütfen"),
          de("fernsehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fernsehen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("spazieren gehen"),
          tr("Türkçesi 'yürüyüşe çıkmak' demek. Lütfen"),
          de("spazieren gehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spazieren gehen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("endlich"),
          tr("Türkçesi 'nihayet' demek. Lütfen"),
          de("endlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "endlich" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Spaß"),
          tr("Türkçesi 'eğlence' demek. Lütfen"),
          de("der Spaß"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Spaß" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Ende"),
          tr("Türkçesi 'son' demek. Lütfen"),
          de("das Ende"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Ende" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sitzen"),
          tr("Türkçesi 'oturmak' demek. Lütfen"),
          de("sitzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sitzen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Nach der Arbeit …"),
          tr("'İşten sonra' demek ve cümlenin başına gelir. Başta olduğu için fiil hemen arkasından gelir."),
        ],
      },
      {
        say: [
          tr("Örnek: 'İşten sonra dinleniyorum.' Almancası:"),
          de("Nach der Arbeit ruhe ich mich aus."),
          tr("Lütfen"),
          de("Nach der Arbeit ruhe ich mich aus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nach der Arbeit ruhe ich mich aus" },
      },
      {
        say: [tr("Sıra sende: 'İşten sonra televizyon izliyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Nach der Arbeit sehe ich fern",
          hint: [
            tr("Fiilin ayrılan parçası cümlenin sonuna gider:"),
            de("Nach der Arbeit sehe ich fern."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi tercih kelimesi:"),
          de("lieber"),
          tr("'Daha çok, tercihen' demek. İki şeyden hangisini seçtiğini söylerken kullanılır."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Ben daha çok yürüyüşe çıkarım.' Almancası:"),
          de("Ich gehe lieber spazieren."),
          tr("Lütfen"),
          de("Ich gehe lieber spazieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich gehe lieber spazieren" },
      },
      {
        say: [tr("Şimdi sen: 'Akşamları daha çok yürüyüşe çıkarım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Abend gehe ich lieber spazieren",
          hint: [
            tr("Akşam başta olduğu için fiil hemen arkasından gelir:"),
            de("Am Abend gehe ich lieber spazieren."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir de günlük bir söz öğrenelim:"),
          de("Endlich Feierabend!"),
          tr("İş biterken herkesin söylediği şey. Lütfen"),
          de("Endlich Feierabend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Endlich Feierabend" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nach der Arbeit ich sehe fern."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nach der Arbeit ich sehe fern.",
          answer: false,
          why: [
            tr(
              "Yanlış. Zaman ifadesi başta olduğu için fiil hemen arkasından gelmeli. Doğrusu:",
            ),
            de("Nach der Arbeit sehe ich fern."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iş çıkışını anlatabilir ve tercihini söyleyebilirsin. Şimdi bir arkadaşın seni akşam bir şeyler yapmaya çağıracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yorgun bir iş gününün sonunda bir arkadaşın seni akşam bir şeyler yapmaya çağırıyor. Ne yapmayı tercih ettiğini söyle ve gerekçeni anlat.",
      partner: "enerjik, seni evden çıkarmaya kararlı bir arkadaş",
      opening: "Endlich Feierabend! Kommst du mit oder bleibst du zu Hause?",
      openingTr: "Nihayet paydos! Geliyor musun, yoksa evde mi kalıyorsun?",
      goal: "Akşam ne yapacağınıza karar verilmiş ya da nazikçe vazgeçilmiş olur.",
      minTurns: 6,
    },
  },
  {
    id: "de-a1-wochenende-plan",
    icon: "party",
    level: "A1",
    course: "de",
    title: "Was machst du am Wochenende?",
    titleTr: "Hafta sonu planı",
    summary: "Hafta sonu planını anlatmayı ve belirsiz planları söylemeyi öğretir.",
    minutes: 8,
    focusId: "V2-Regel",
    vocab: [
      { de: "der Plan", tr: "plan" },
      { de: "vielleicht", tr: "belki" },
      { de: "frei", tr: "boş" },
      { de: "ausschlafen", tr: "geç uyanmak" },
      { de: "der Ausflug", tr: "gezi" },
      { de: "der Urlaub", tr: "tatil" },
      { de: "die Ferien", tr: "okul tatili" },
      { de: "wandern", tr: "doğa yürüyüşü yapmak" },
],
    patterns: [
      { de: "Am Samstag …", tr: "hangi gün ne yaptığını söyler" },
      { de: "Vielleicht …", tr: "kesin olmayan planı söyler" },
      { de: "Ich habe frei.", tr: "izinli olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün hafta sonu planını anlatmayı öğreneceğiz. Bir de çok işine yarayacak bir kelime var: planın kesin olmadığında kullanacağın kelime. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Hafta sonu planı, Almanya'da en sık sorulan sorulardan biri. Cuma günü herkes birbirine sorar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Plan"),
          tr("Türkçesi 'plan' demek. Lütfen"),
          de("der Plan"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Plan" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vielleicht"),
          tr("Türkçesi 'belki' demek. Lütfen"),
          de("vielleicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vielleicht" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("frei"),
          tr("Türkçesi 'izinli, boş' demek. Lütfen"),
          de("frei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "frei" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ausschlafen"),
          tr("Türkçesi 'doya doya uyumak, geç uyanmak' demek. Lütfen"),
          de("ausschlafen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ausschlafen" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Ausflug"),
          tr("Türkçesi 'gezi' demek — günübirlik kısa gezi. Lütfen"),
          de("der Ausflug"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Ausflug" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("der Urlaub"),
          tr("Türkçesi 'tatil' demek. Lütfen"),
          de("der Urlaub"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Urlaub" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("die Ferien"),
          tr("Türkçesi 'okul tatili' demek. Lütfen"),
          de("die Ferien"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Ferien" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("wandern"),
          tr("Türkçesi 'doğa yürüyüşü yapmak' demek. Lütfen"),
          de("wandern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wandern" },
      },
      {
        say: [
          tr("İlk kalıbımız gün ile başlıyor:"),
          de("Am Samstag …"),
          tr("Gün başta olduğu için fiil hemen arkasından gelir — bunu artık biliyorsun."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Cuma izinliyim.' Cuma, Almancada"),
          de("der Freitag"),
          tr("demek. Cümlenin tamamı:"),
          de("Am Freitag habe ich frei."),
          tr("Lütfen"),
          de("Am Freitag habe ich frei"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Freitag habe ich frei" },
      },
      {
        say: [tr("Sıra sende: 'Cumartesi izinliyim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Samstag habe ich frei",
          hint: [
            tr("Gün başta, fiil hemen arkasında:"),
            de("Am Samstag habe ich frei."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kesin olmayan planlar için:"),
          de("Vielleicht …"),
          tr("Örnek: 'Belki sinemaya giderim.'"),
          de("Vielleicht gehe ich ins Kino."),
          tr("Lütfen"),
          de("Vielleicht gehe ich ins Kino"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Vielleicht gehe ich ins Kino" },
      },
      {
        say: [tr("Şimdi sen: 'Belki bir gezi yaparım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Vielleicht mache ich einen Ausflug",
          hint: [
            tr("Belki kelimesi başta olduğu için fiil hemen arkasından gelir:"),
            de("Vielleicht mache ich einen Ausflug."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız:"),
          de("Am Sonntag schlafe ich aus."),
          tr("'Pazar günü geç uyanıyorum' demek. Lütfen"),
          de("Am Sonntag schlafe ich aus"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Sonntag schlafe ich aus" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Am Sonntag ich schlafe aus."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Am Sonntag ich schlafe aus.",
          answer: false,
          why: [
            tr("Gün başta olduğu için özne fiilin arkasına geçmeli. Doğrusu"),
            de("Am Sonntag schlafe ich aus."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hafta sonu planını anlatabilirsin. Şimdi bir arkadaşınla hafta sonunu konuşacaksın — henüz kesin olmayan planlarını da söyle.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Cuma akşamı bir arkadaşınla hafta sonunu konuşuyorsunuz. Hangi gün ne yapacağını anlat; kesin olmayan planlar için belki kelimesini kullan.",
      partner: "hafta sonu planı yapmayı seven bir arkadaş",
      opening: "Hast du schon Pläne für das Wochenende?",
      openingTr: "Hafta sonu için planın var mı?",
      goal: "Cumartesi ve pazar planların söylenmiş ve bir konuda birlikte hareket etmeye karar verilmiş olur.",
      minTurns: 7,
    },
  },
  {
    id: "de-a1-zeit-haben",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Hast du morgen Zeit?",
    titleTr: "Vakit sorma",
    summary: "Birine vakti olup olmadığını sormayı ve kibarca hayır demeyi öğretir.",
    minutes: 9,
    focusId: "Temporal-am-um",
    vocab: [
      { de: "das Treffen", tr: "buluşma" },
      { de: "passen", tr: "uymak" },
      { de: "der Anruf", tr: "telefon araması" },
      { de: "der Vormittag", tr: "öğleden önce" },
      { de: "der Nachmittag", tr: "öğleden sonra" },
      { de: "telefonieren", tr: "telefonla konuşmak" },
      { de: "das Gespräch", tr: "konuşma" },
      { de: "fertig sein", tr: "hazır olmak" },
],
    patterns: [
      { de: "Hast du am … Zeit?", tr: "birine vakti olup olmadığını sorar" },
      { de: "Um … passt es mir.", tr: "hangi saatin sana uyduğunu söyler" },
      { de: "Leider kann ich nicht.", tr: "kibarca hayır derken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün buluşma ayarlamayı öğreneceğiz: birine vakti var mı diye sormak, hangi saatin uyduğunu söylemek ve gelemeyeceksen kibarca hayır demek. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Kibarca hayır demek, evet demek kadar önemli. Almancada bunun hazır bir kalıbı var ve tek kelimeyle yumuşuyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Treffen"),
          tr("Türkçesi 'buluşma' demek. Lütfen"),
          de("das Treffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Treffen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("passen"),
          tr("Türkçesi 'uymak' demek — 'bana uyar' derkenki uymak. Lütfen"),
          de("passen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "passen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Anruf"),
          tr("Türkçesi 'telefon araması' demek. Lütfen"),
          de("der Anruf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Anruf" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Vormittag"),
          tr("Türkçesi 'öğleden önce' demek. Lütfen"),
          de("der Vormittag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Vormittag" },
      },
      {
        say: [
          tr("Beşinci kelimemiz:"),
          de("der Nachmittag"),
          tr("Türkçesi 'öğleden sonra' demek. Lütfen"),
          de("der Nachmittag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Nachmittag" },
      },
      {
        say: [
          tr("Altıncı kelimemiz:"),
          de("telefonieren"),
          tr("Türkçesi 'telefonla konuşmak' demek. Lütfen"),
          de("telefonieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "telefonieren" },
      },
      {
        say: [
          tr("Yedinci kelimemiz:"),
          de("das Gespräch"),
          tr("Türkçesi 'konuşma' demek. Lütfen"),
          de("das Gespräch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Gespräch" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("fertig sein"),
          tr("Türkçesi 'hazır olmak' demek. Lütfen"),
          de("fertig sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fertig sein" },
      },
      {
        say: [
          tr("İlk kalıbımız bir soru:"),
          de("Hast du am … Zeit?"),
          tr("'Falanca gün vaktin var mı?' demek. Günü ortaya koyuyorsun, vakit kelimesi sonda kalıyor."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pazartesi vaktin var mı?' Almancası:"),
          de("Hast du am Montag Zeit?"),
          tr("Lütfen"),
          de("Hast du am Montag Zeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hast du am Montag Zeit" },
      },
      {
        say: [tr("Sıra sende: 'Salı vaktin var mı?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Hast du am Dienstag Zeit",
          hint: [
            tr("Gün ortada, vakit kelimesi sonda:"),
            de("Hast du am Dienstag Zeit?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız cevap için:"),
          de("Um … passt es mir."),
          tr("'Saat şu bana uyar' demek. Örnek:"),
          de("Um drei Uhr passt es mir."),
          tr("Lütfen"),
          de("Um drei Uhr passt es mir"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Um drei Uhr passt es mir" },
      },
      {
        say: [tr("Şimdi sen: 'Öğleden sonra bana uyar.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Am Nachmittag passt es mir",
          hint: [
            tr("Zaman başta olduğu için fiil hemen arkasından gelir:"),
            de("Am Nachmittag passt es mir."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız kibarca hayır demek için:"),
          de("Leider kann ich nicht."),
          tr("'Maalesef gelemiyorum' demek. Baştaki kelime cümleyi yumuşatıyor. Lütfen"),
          de("Leider kann ich nicht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Leider kann ich nicht" },
      },
      {
        say: [
          tr("Gelemeyeceksen buluşmayı iptal edersin. Bunun cümlesi de ikiye bölünen fiillerden:"),
          de("Ich sage das Treffen ab."),
          tr("Lütfen"),
          de("Ich sage das Treffen ab"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich sage das Treffen ab" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Am drei Uhr passt es mir."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Am drei Uhr passt es mir.",
          answer: false,
          why: [
            tr("Yanlış. Günlerle"),
            de("am"),
            tr("kullanılır ama saatlerle"),
            de("um"),
            tr("gelir. Doğrusu:"),
            de("Um drei Uhr passt es mir."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık buluşma ayarlayabilir, uymayan saate kibarca hayır diyebilirsin. Şimdi bir arkadaşın seni arayacak ve bu hafta buluşmak isteyecek.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın seni arıyor ve bu hafta buluşmak istiyor. Hangi gün ve saatin sana uyduğunu söyle, uymayan bir gün için kibarca hayır de.",
      partner: "ısrarcı olmayan ama bir an önce karar vermek isteyen bir arkadaş",
      opening: "Hallo! Hast du diese Woche mal Zeit für einen Kaffee?",
      openingTr: "Selam! Bu hafta bir kahve içmeye vaktin olur mu?",
      goal: "Buluşmanın günü ve saati kesinleşmiş, uymayan gün nazikçe elenmiş olur.",
      minTurns: 6,
    },
  },
];

import { de, tr, type Lesson } from "../types";

/**
 * A1 · Parti 8 — Boş zaman (konular 071-080).
 *
 * Modülün taşıdığı iki yapı, boş zaman konuşmasının kendisinden çıkıyor:
 * bir şeyi severek yapmayı anlatan küçük kelime (gern, lieber) ve
 * yapabilmeyi anlatan kip (können). İkisi de Türkçede ayrı bir fiille
 * karşılanıyor — "severim", "bilirim" — Almancada ise cümleye eklenen tek
 * bir parçayla; ders boyunca vurgu bu farkta.
 *
 * Sıra da bilinçli: önce kendi hobilerini anlatıyor (071-074), sonra
 * başkasını davet ediyor (075-079), en sonunda daveti kibarca geri çeviriyor
 * (080). Böylece modül, öğrettiği kalıpların hepsinin bir arada çalıştığı bir
 * konuşmayla kapanıyor.
 */
export const deA1B08: Lesson[] = [
  {
    id: "de-a1-hobbys",
    icon: "sport",
    level: "A1",
    course: "de",
    title: "Meine Hobbys",
    titleTr: "Hobiler",
    summary: "Boş zamanında ne yaptığını ve neyi severek yaptığını anlatmayı öğretir.",
    minutes: 8,
    focusId: "Gern-lieber",
    vocab: [
      { de: "das Hobby", tr: "hobi" },
      { de: "die Freizeit", tr: "boş zaman" },
      { de: "spielen", tr: "oynamak" },
      { de: "malen", tr: "resim yapmak" },
      { de: "sammeln", tr: "biriktirmek" },
    ],
    patterns: [
      { de: "Mein Hobby ist …", tr: "hobini söylerken kullanılır" },
      { de: "Ich spiele gern …", tr: "severek yaptığın şeyi söylerken kullanılır" },
      { de: "In meiner Freizeit …", tr: "boş zamanında ne yaptığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Almanya'da yeni tanıştığın birinin sana soracağı ilk şeylerden biri hobin. Bugün boş zamanında ne yaptığını ve neyi severek yaptığını anlatmayı öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste küçük bir kelime var ki bütün boş zaman konuşmalarının anahtarı. Türkçede 'severim' diye ayrı bir fiil kullanırız; Almancada fiile dokunmadan cümleye tek bir kelime eklenir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Hobby"),
          tr("Türkçesi 'hobi' demek. Lütfen"),
          de("das Hobby"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Hobby" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Freizeit"),
          tr("Türkçesi 'boş zaman' demek. Lütfen"),
          de("die Freizeit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Freizeit" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("spielen"),
          tr("Türkçesi 'oynamak' demek. Lütfen"),
          de("spielen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "spielen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("malen"),
          tr("Türkçesi 'resim yapmak' demek. Lütfen"),
          de("malen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "malen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sammeln"),
          tr("Türkçesi 'biriktirmek' demek. Lütfen"),
          de("sammeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sammeln" },
      },
      {
        say: [
          tr("İlk kalıbımız çok kısa:"),
          de("Mein Hobby ist Musik."),
          tr("Yani 'Hobim müzik'. Birden çok hobin varsa hepsini sıralamana gerek yok; bir ikisini söylemen yeter."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Mein Hobby ist Musik"), tr("deyin.")],
        expect: { kind: "repeat", target: "Mein Hobby ist Musik" },
      },
      {
        say: [
          tr("Şimdi asıl kelime geliyor:"),
          de("Ich spiele gern Fußball."),
          tr(
            "Yani 'Severek futbol oynarım'. Dikkat et: Almancada 'sevmek' diye ayrı bir fiil kurmuyoruz. Fiil aynı kalıyor, arkasına tek bir kelime ekleniyor ve anlam 'severek yaparım' oluyor. Bu kelimeyi hangi fiile eklersen ekle aynı işi görüyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich spiele gern Fußball"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich spiele gern Fußball" },
      },
      {
        say: [tr("Sıra sende: 'Severek resim yaparım.'")],
        expect: {
          kind: "produce",
          target: "Ich male gern",
          hint: [
            tr("Fiil olduğu gibi kalır, o küçük kelime hemen arkasına gelir:"),
            de("Ich male gern."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız cümleye baştan giriyor:"),
          de("In meiner Freizeit sammle ich Bücher."),
          tr(
            "Yani 'Boş zamanımda kitap biriktiriyorum'. Cümleye zaman ifadesiyle başladın diye fiil hemen arkasına geçti ve sen fiilin ardına düştün. Almancada fiil her zaman ikinci sırada durur.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("In meiner Freizeit sammle ich Bücher"), tr("deyin.")],
        expect: { kind: "repeat", target: "In meiner Freizeit sammle ich Bücher" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Boş zamanımda resim yapıyorum.'")],
        expect: {
          kind: "produce",
          target: "In meiner Freizeit male ich",
          hint: [
            tr("Zaman ifadesi baştaysa fiil ikinci sıraya geçer, sen fiilin arkasında kalırsın:"),
            de("In meiner Freizeit male ich."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gern spiele Fußball."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gern spiele Fußball.",
          answer: false,
          why: [
            tr(
              "Yanlış. Severek yapmayı anlatan kelime fiilin ARKASINA gelir, önüne değil. Doğrusu:",
            ),
            de("Ich spiele gern Fußball."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hobini söyleyebilir ve neyi severek yaptığını anlatabilirsin. Şimdi bir dil kursundasın ve mola verdiniz: yanındaki kişi seninle tanışmak istiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir dil kursunun molasındasın ve yanındaki kişiyle sohbete başladın. Hobilerini anlat, boş zamanında ne yaptığını söyle ve onun hobilerini de sor.",
      partner: "meraklı ve çok soru soran bir kurs arkadaşı",
      opening: "Endlich Pause! Was machst du eigentlich in deiner Freizeit?",
      openingTr: "Nihayet mola! Boş zamanında ne yaparsın aslında?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-koennen",
    icon: "sport",
    level: "A1",
    course: "de",
    title: "Ich kann gut schwimmen",
    titleTr: "Yetenekler",
    summary: "Neyi yapabildiğini, neyi yapamadığını söylemeyi ve karşındakine sormayı öğretir.",
    minutes: 8,
    focusId: "Modalverb-können",
    vocab: [
      { de: "schwimmen", tr: "yüzmek" },
      { de: "tanzen", tr: "dans etmek" },
      { de: "singen", tr: "şarkı söylemek" },
      { de: "üben", tr: "alıştırma yapmak" },
      { de: "das Talent", tr: "yetenek" },
    ],
    patterns: [
      { de: "Ich kann gut schwimmen.", tr: "bir şeyi iyi yapabildiğini söylerken kullanılır" },
      { de: "Ich kann nicht so gut singen.", tr: "bir şeyi pek yapamadığını söylerken kullanılır" },
      { de: "Kannst du tanzen?", tr: "karşındakine yapabilir misin diye sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Hobilerini anlattın; peki neleri yapabiliyorsun? Bugün bir şeyi yapabildiğini, pek yapamadığını söylemeyi ve karşındakine bunu sormayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'yüzme biliyorum' deriz, yani ayrı bir fiil kullanırız. Almancada cümleye bir yardımcı fiil giriyor ve asıl fiil cümlenin sonuna gidiyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("schwimmen"),
          tr("Türkçesi 'yüzmek' demek. Lütfen"),
          de("schwimmen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwimmen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("tanzen"),
          tr("Türkçesi 'dans etmek' demek. Lütfen"),
          de("tanzen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tanzen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("singen"),
          tr("Türkçesi 'şarkı söylemek' demek. Lütfen"),
          de("singen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "singen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("üben"),
          tr("Türkçesi 'çalışmak, alıştırma yapmak' demek. Lütfen"),
          de("üben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "üben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("das Talent"),
          tr("Türkçesi 'yetenek' demek. Lütfen"),
          de("das Talent"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Talent" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich kann gut schwimmen."),
          tr(
            "Yani 'İyi yüzerim'. Cümlenin şekline dikkat et: yapabilmeyi anlatan fiil ikinci sırada duruyor, asıl fiil ise en sonda bekliyor. Türkçede de asıl fiil sonda durduğu için bu sıra sana ters gelmeyecek.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich kann gut schwimmen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich kann gut schwimmen" },
      },
      {
        say: [tr("Sıra sende: 'İyi dans ederim.'")],
        expect: {
          kind: "produce",
          target: "Ich kann gut tanzen",
          hint: [
            tr("Asıl fiil cümlenin en sonunda kalır:"),
            de("Ich kann gut tanzen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yapamadığın şeyi söylemek de aynı kalıpla oluyor, araya küçük bir olumsuzluk giriyor:"),
          de("Ich kann nicht so gut singen."),
          tr(
            "Yani 'Pek iyi şarkı söyleyemem'. Almanlar burada 'hiç yapamam' demez; bu yumuşak biçim daha çok kullanılır.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich kann nicht so gut singen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich kann nicht so gut singen" },
      },
      {
        say: [
          tr("Şimdi karşındakine sor. Soruda fiil başa geçiyor: 'Dans edebiliyor musun?'"),
        ],
        expect: {
          kind: "produce",
          target: "Kannst du tanzen",
          hint: [
            tr("Soruda yapabilmeyi anlatan fiil başa gelir, asıl fiil yine sonda kalır:"),
            de("Kannst du tanzen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Cevabın mütevazı olacaksa iki hazır cümle var:"),
          de("Ich habe kein Talent."),
          tr("ve"),
          de("Aber ich übe jeden Tag."),
          tr("Lütfen"),
          de("Aber ich übe jeden Tag"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Aber ich übe jeden Tag" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich kann gut zu tanzen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich kann gut zu tanzen.",
          answer: false,
          why: [
            tr("Bu kalıpta asıl fiilin önüne hiçbir şey gelmez, fiil yalın hâlde sonda durur. Doğrusu:"),
            de("Ich kann gut tanzen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık neyi yapabildiğini, neyi pek yapamadığını söyleyebilir ve karşındakine sorabilirsin. Şimdi bir spor kursuna yazılıyorsun ve eğitmen seni tanımak istiyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir spor kursuna yazılmak için geldin ve eğitmen neler yapabildiğini soruyor. Yapabildiklerini anlat, iyi olmadığın şeyi söyle ve ona da bir soru sor.",
      partner: "cesaretlendirmeyi seven, enerjik bir spor eğitmeni",
      opening: "Schön, dass Sie da sind! Können Sie schon schwimmen?",
      openingTr: "Geldiğiniz için sevindim! Yüzme biliyor musunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-sport",
    icon: "sport",
    level: "A1",
    course: "de",
    title: "Machst du Sport?",
    titleTr: "Spor",
    summary: "Spor yapıp yapmadığını ve ne sıklıkta yaptığını anlatmayı öğretir.",
    minutes: 8,
    focusId: "Konjugation-Präsens",
    vocab: [
      { de: "der Sport", tr: "spor" },
      { de: "joggen", tr: "koşu yapmak" },
      { de: "das Fitnessstudio", tr: "spor salonu" },
      { de: "die Mannschaft", tr: "takım" },
      { de: "zweimal", tr: "iki kez" },
    ],
    patterns: [
      { de: "Ich mache Sport.", tr: "spor yaptığını söylerken kullanılır" },
      { de: "Ich gehe joggen.", tr: "koşuya gittiğini söylerken kullanılır" },
      { de: "zweimal pro Woche", tr: "ne sıklıkta yaptığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Spor konuşması Almanya'da hiç bitmez: kim ne yapıyor, haftada kaç kez. Bugün spor yaptığını söylemeyi ve sıklığı anlatmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste iki fiil ayrımı var: bazı sporlar 'yapılır', bazılarına 'gidilir'. Bir de sıklığı söylemenin kendine has bir sırası var. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Sport"),
          tr("Türkçesi 'spor' demek. Lütfen"),
          de("der Sport"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Sport" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("joggen"),
          tr("Türkçesi 'koşu yapmak' demek. Lütfen"),
          de("joggen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "joggen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Fitnessstudio"),
          tr("Türkçesi 'spor salonu' demek. Lütfen"),
          de("das Fitnessstudio"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fitnessstudio" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Mannschaft"),
          tr("Türkçesi 'takım' demek. Lütfen"),
          de("die Mannschaft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mannschaft" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zweimal"),
          tr("Türkçesi 'iki kez' demek. Lütfen"),
          de("zweimal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zweimal" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich mache Sport."),
          tr("Yani 'Spor yapıyorum'. Nerede yaptığını da ekleyebilirsin:"),
          de("Ich mache Sport im Fitnessstudio."),
          tr("Takım hâlinde oynuyorsan şöyle dersin:"),
          de("Unsere Mannschaft spielt am Samstag."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich mache Sport im Fitnessstudio"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich mache Sport im Fitnessstudio" },
      },
      {
        say: [
          tr("Bazı sporlara ise 'yapmak' değil 'gitmek' fiiliyle gidilir:"),
          de("Ich gehe joggen."),
          tr(
            "Yani 'Koşuya gidiyorum'. İki fiil yan yana duruyor ve ikincisi yalın hâlde sonda kalıyor. Yüzmek için de aynısı geçerli:",
          ),
          de("Ich gehe schwimmen."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich gehe joggen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich gehe joggen" },
      },
      {
        say: [tr("Sıra sende: 'Yüzmeye gidiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich gehe schwimmen",
          hint: [
            tr("İkinci fiil yalın hâlde en sonda durur:"),
            de("Ich gehe schwimmen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Şimdi sıklık. Türkçede 'haftada iki kez' deriz; Almancada sıra tam tersi: önce kaç kez, sonra hafta."),
          de("zweimal pro Woche"),
          tr("Cümlede de zaman ifadesi fiilin hemen arkasına girer:"),
          de("Ich mache zweimal pro Woche Sport."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich mache zweimal pro Woche Sport"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich mache zweimal pro Woche Sport" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Haftada iki kez koşuya gidiyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich gehe zweimal pro Woche joggen",
          hint: [
            tr("Sıklık ortada durur, ikinci fiil yine en sonda kalır:"),
            de("Ich gehe zweimal pro Woche joggen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich gehe joggen zweimal pro Woche."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich gehe joggen zweimal pro Woche.",
          answer: false,
          why: [
            tr("İkinci fiil cümlenin en sonunda durmalı, sıklık onun önüne girer. Doğrusu:"),
            de("Ich gehe zweimal pro Woche joggen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık spor yaptığını, nerede ve ne sıklıkta yaptığını anlatabilirsin. Şimdi bir spor salonundasın ve danışmadaki kişi seninle ilgileniyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir spor salonunu gezmeye geldin ve danışmadaki kişi sorular soruyor. Ne tür spor yaptığını, ne sıklıkta yaptığını anlat ve salonun saatlerini sor.",
      partner: "üyelik satmaya çalışan ama samimi bir salon danışmanı",
      opening: "Willkommen! Machen Sie im Moment regelmäßig Sport?",
      openingTr: "Hoş geldiniz! Şu sıralar düzenli spor yapıyor musunuz?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-musik",
    icon: "music",
    level: "A1",
    course: "de",
    title: "Welche Musik hörst du?",
    titleTr: "Müzik",
    summary: "Hangi müziği dinlediğini, hangisini daha çok sevdiğini anlatmayı öğretir.",
    minutes: 9,
    focusId: "Gern-lieber",
    vocab: [
      { de: "die Musik", tr: "müzik" },
      { de: "das Lied", tr: "şarkı" },
      { de: "die Gitarre", tr: "gitar" },
      { de: "das Konzert", tr: "konser" },
      { de: "hören", tr: "dinlemek" },
    ],
    patterns: [
      { de: "Ich höre gern …", tr: "hangi müziği sevdiğini söylerken kullanılır" },
      { de: "Ich höre lieber …", tr: "iki müzikten hangisini daha çok sevdiğini söyler" },
      { de: "Ich spiele Gitarre.", tr: "çaldığın enstrümanı söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Müzik, tanıştığın herkesle konuşabileceğin bir konu. Bugün ne dinlediğini, hangisini daha çok sevdiğini ve çaldığın bir şey varsa onu anlatmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Geçen derslerde severek yapmayı anlatan kelimeyi öğrenmiştin. Bugün onun bir arkadaşı var: iki şey arasında tercih yaparken kullanılan biçimi. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Musik"),
          tr("Türkçesi 'müzik' demek. Lütfen"),
          de("die Musik"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Musik" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Lied"),
          tr("Türkçesi 'şarkı' demek. Lütfen"),
          de("das Lied"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Lied" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Gitarre"),
          tr("Türkçesi 'gitar' demek. Lütfen"),
          de("die Gitarre"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Gitarre" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Konzert"),
          tr("Türkçesi 'konser' demek. Lütfen"),
          de("das Konzert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Konzert" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("hören"),
          tr("Türkçesi 'dinlemek' demek. Lütfen"),
          de("hören"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hören" },
      },
      {
        say: [
          tr("İlk kalıbımız tanıdık:"),
          de("Ich höre gern Rockmusik."),
          tr("Yani 'Severek rock dinlerim'. Sorusu da şöyle geliyor:"),
          de("Welche Musik hörst du?"),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich höre gern Rockmusik"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich höre gern Rockmusik" },
      },
      {
        say: [
          tr("Şimdi tercih sırası. İki şeyden birini seçerken o kelimenin karşılaştırmalı biçimi kullanılır:"),
          de("Ich höre lieber Jazz."),
          tr(
            "Yani 'Daha çok caz dinlerim'. Türkçede 'daha çok severim' deriz; Almancada aynı küçük kelime biçim değiştirip bu işi görüyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich höre lieber Jazz"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich höre lieber Jazz" },
      },
      {
        say: [tr("Sıra sende: 'Daha çok pop müzik dinlerim.'")],
        expect: {
          kind: "produce",
          target: "Ich höre lieber Popmusik",
          hint: [
            tr("Tercih bildiren kelime fiilin hemen arkasına gelir:"),
            de("Ich höre lieber Popmusik."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir enstrüman çalıyorsan onu söylemek çok kolay:"),
          de("Ich spiele Gitarre."),
          tr(
            "Enstrümanın önüne hiçbir şey koymuyorsun, doğrudan adını söylüyorsun. Şarkı söylemeyi de eklemek istersen:",
          ),
          de("Ich singe auch gern."),
          tr("Beğendiğin bir parçayı anlatmak istersen:"),
          de("Das Lied gefällt mir."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich spiele Gitarre"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich spiele Gitarre" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Severek konsere giderim.'")],
        expect: {
          kind: "produce",
          target: "Ich gehe gern ins Konzert",
          hint: [
            tr("Önce sen ve fiil, sonra severek yapmayı anlatan kelime, en sonda gidilen yer:"),
            de("Ich gehe gern ins Konzert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich singe gern."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich singe gern.",
          answer: true,
          why: [
            tr("Doğru. Severek yapmayı anlatan kelime fiilin hemen arkasında duruyor:"),
            de("Ich singe gern."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık müzik zevkini anlatabilir ve tercihini söyleyebilirsin. Şimdi bir konser çıkışındasın ve yanındaki kişi konuşmaya başladı.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir konser çıkışında tanımadığın biriyle sohbete başladın. Konseri nasıl bulduğunu söyle, hangi müziği sevdiğini anlat ve onun zevkini de sor.",
      partner: "her konsere giden, hevesli bir müzik hayranı",
      opening: "Das war ein tolles Konzert, oder? Hörst du oft solche Musik?",
      openingTr: "Harika bir konserdi, değil mi? Sık sık böyle müzik dinler misin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-kino",
    icon: "film",
    level: "A1",
    course: "de",
    title: "Gehen wir ins Kino?",
    titleTr: "Sinema daveti",
    summary: "Birini sinemaya davet etmeyi, teklifi kabul etmeyi ve saat kararlaştırmayı öğretir.",
    minutes: 9,
    focusId: "Ja-Nein-Fragen",
    vocab: [
      { de: "das Kino", tr: "sinema" },
      { de: "der Film", tr: "film" },
      { de: "die Idee", tr: "fikir" },
      { de: "das Popcorn", tr: "patlamış mısır" },
      { de: "abholen", tr: "almaya gelmek" },
    ],
    patterns: [
      { de: "Gehen wir ins Kino?", tr: "birini davet ederken kullanılır" },
      { de: "Gute Idee!", tr: "teklifi kabul ederken kullanılır" },
      { de: "Wann treffen wir uns?", tr: "buluşma saatini sorarken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Birini bir yere davet etmek Almancada tek cümlelik bir iş. Bugün davet etmeyi, teklifi kabul etmeyi ve saat kararlaştırmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede soru sormak için sona küçük bir ek koyarız. Almancada böyle bir ek yok; onun yerine fiil cümlenin başına geçiyor. Davet de tam olarak böyle kuruluyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Kino"),
          tr("Türkçesi 'sinema' demek. Lütfen"),
          de("das Kino"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Kino" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Film"),
          tr("Türkçesi 'film' demek. Lütfen"),
          de("der Film"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Film" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Idee"),
          tr("Türkçesi 'fikir' demek. Lütfen"),
          de("die Idee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Idee" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Popcorn"),
          tr("Türkçesi 'patlamış mısır' demek. Lütfen"),
          de("das Popcorn"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Popcorn" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("abholen"),
          tr("Türkçesi 'almaya gelmek' demek. Lütfen"),
          de("abholen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "abholen" },
      },
      {
        say: [
          tr("İlk kalıbımız bir davet:"),
          de("Gehen wir ins Kino?"),
          tr(
            "Yani 'Sinemaya gidelim mi?' Fiil en başta duruyor ve arkasına 'biz' geliyor; bu sıra cümleyi hem soru hem davet yapıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Gehen wir ins Kino"), tr("deyin.")],
        expect: { kind: "repeat", target: "Gehen wir ins Kino" },
      },
      {
        say: [tr("Sıra sende: 'Konsere gidelim mi?'")],
        expect: {
          kind: "produce",
          target: "Gehen wir ins Konzert",
          hint: [
            tr("Fiil başta, 'biz' hemen arkasında, gidilecek yer sonda:"),
            de("Gehen wir ins Konzert?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Karşındaki kabul ederse duyacağın cevaplar kısa:"),
          de("Gute Idee!"),
          tr("ya da"),
          de("Ja, gern!"),
          tr("Gerisini de konuşursunuz:"),
          de("Der Film beginnt um acht."),
          tr("Salonda duyacağın ilk yakınma ise hep aynıdır:"),
          de("Das Popcorn ist teuer."),
          tr("Lütfen"),
          de("Gute Idee"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Gute Idee" },
      },
      {
        say: [
          tr("Sonra iş ayrıntıya geliyor:"),
          de("Wann treffen wir uns?"),
          tr("Yani 'Ne zaman buluşuyoruz?' Cevabı da hazır:"),
          de("Um acht vor dem Kino."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Wann treffen wir uns"), tr("deyin.")],
        expect: { kind: "repeat", target: "Wann treffen wir uns" },
      },
      {
        say: [
          tr("Arabayla geleceksen şu cümle çok işine yarar: 'Seni sekizde alırım.' Almancası:"),
          de("Ich hole dich um acht ab."),
          tr("Çünkü"),
          de("abholen"),
          tr(
            "ikiye bölünen fiillerden; bir parçası cümlenin sonuna düşer. Şimdi sen söyle: 'Seni sekizde alırım.'",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich hole dich um acht ab",
          hint: [
            tr("Fiilin ikinci parçası cümlenin en sonunda kalır:"),
            de("Ich hole dich um acht ab."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich hole ab dich um acht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich hole ab dich um acht.",
          answer: false,
          why: [
            tr("Bu fiil ikiye bölünür ve ayrılan parça cümlenin en sonuna gider. Doğrusu:"),
            de("Ich hole dich um acht ab."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık birini davet edebilir, teklifi kabul edebilir ve saat kararlaştırabilirsin. Şimdi bir arkadaşını arıyorsun: bu akşam iyi bir film var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşını arayıp bu akşam sinemaya davet ediyorsun. Teklifini yap, hangi filmi izleyeceğinizi konuş ve saati ve buluşma yerini kararlaştır.",
      partner: "her filme varım diyen, hevesli bir arkadaş",
      opening: "Hey, schön dass du anrufst! Was gibt es?",
      openingTr: "Hey, aradığına sevindim! Ne var ne yok?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-wetter-smalltalk",
    icon: "sun",
    level: "A1",
    course: "de",
    title: "Schönes Wetter heute!",
    titleTr: "Hava sohbeti",
    summary: "Hava durumunu anlatmayı ve havadan sohbet başlatmayı öğretir.",
    minutes: 8,
    focusId: "Sein-Haben",
    vocab: [
      { de: "das Wetter", tr: "hava" },
      { de: "die Sonne", tr: "güneş" },
      { de: "der Regen", tr: "yağmur" },
      { de: "regnen", tr: "yağmur yağmak" },
      { de: "kalt", tr: "soğuk" },
    ],
    patterns: [
      { de: "Es ist sonnig.", tr: "havanın nasıl olduğunu söylerken kullanılır" },
      { de: "Es regnet.", tr: "yağmur yağdığını söylerken kullanılır" },
      { de: "Was für ein Wetter!", tr: "havaya şaşırdığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Almanya'da sohbet çoğu zaman havayla başlar; asansörde, durakta, kasada. Bugün hava durumunu anlatmayı ve bu sohbeti sürdürmeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu derste küçük ama şart olan bir kelime var. Türkçede 'yağmur yağıyor' derken cümlede özne yoktur; Almancada özne boş kalamaz, o yüzden hava cümlelerine hazır bir özne konur. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Wetter"),
          tr("Türkçesi 'hava' demek. Lütfen"),
          de("das Wetter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Wetter" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Sonne"),
          tr("Türkçesi 'güneş' demek. Lütfen"),
          de("die Sonne"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sonne" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Regen"),
          tr("Türkçesi 'yağmur' demek. Lütfen"),
          de("der Regen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Regen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("regnen"),
          tr("Türkçesi 'yağmur yağmak' demek. Lütfen"),
          de("regnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "regnen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("kalt"),
          tr("Türkçesi 'soğuk' demek. Lütfen"),
          de("kalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "kalt" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es ist sonnig."),
          tr(
            "Yani 'Hava güneşli'. Baştaki küçük kelime hiçbir şeyi göstermiyor; sadece cümlenin öznesiz kalmaması için orada duruyor. Onu atlarsan cümle Almanca olmaktan çıkıyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es ist sonnig"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es ist sonnig" },
      },
      {
        say: [tr("Sıra sende: 'Hava soğuk.'")],
        expect: {
          kind: "produce",
          target: "Es ist kalt",
          hint: [
            tr("Cümle o küçük özneyle başlar, sonra fiil, en sonda hava durumu:"),
            de("Es ist kalt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Yağmur için ayrı bir fiil var ve aynı özneyle çalışıyor:"),
          de("Es regnet."),
          tr("Yani 'Yağmur yağıyor'. İki kelime, tam bir cümle."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es regnet"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es regnet" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Bugün yağmur yağıyor.'")],
        expect: {
          kind: "produce",
          target: "Heute regnet es",
          accept: ["Es regnet heute"],
          hint: [
            tr("Cümleye zamanla başlarsan fiil ikinci sıraya geçer:"),
            de("Heute regnet es."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Sohbeti başlatmak için de hazır iki cümle var:"),
          de("Schönes Wetter heute!"),
          tr("ve hava kötüyse"),
          de("Was für ein Wetter!"),
          tr("Almanların bir de teselli cümlesi var:"),
          de("Nach dem Regen kommt die Sonne."),
          tr("Lütfen"),
          de("Was für ein Wetter"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Was für ein Wetter" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ist heute kalt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ist heute kalt.",
          answer: false,
          why: [
            tr("Hava cümlelerinde özne düşmez ve fiil ikinci sırada durur. Doğrusu:"),
            de("Heute ist es kalt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık havadan konuşabilir ve bir sohbeti kolayca başlatabilirsin. Şimdi apartmanın girişinde komşunla karşılaştın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Apartmanın girişinde komşunla karşılaştın. Havadan konuş, bugün ne yapacağını söyle ve onun planını da sor.",
      partner: "her sabah köpeğini gezdiren, sohbeti seven bir komşu",
      opening: "Guten Morgen! Schönes Wetter heute, nicht wahr?",
      openingTr: "Günaydın! Bugün hava çok güzel, değil mi?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-park",
    icon: "nature",
    level: "A1",
    course: "de",
    title: "Ein Tag im Park",
    titleTr: "Parkta",
    summary: "Parkta ne olduğunu anlatmayı ve birlikte plan yapmayı öğretir.",
    minutes: 8,
    focusId: "Es-gibt",
    vocab: [
      { de: "der Park", tr: "park" },
      { de: "der See", tr: "göl" },
      { de: "die Wiese", tr: "çayır" },
      { de: "das Picknick", tr: "piknik" },
      { de: "der Baum", tr: "ağaç" },
    ],
    patterns: [
      { de: "Es gibt einen See.", tr: "bir yerde ne olduğunu söylerken kullanılır" },
      { de: "Wir machen ein Picknick.", tr: "birlikte plan yaparken kullanılır" },
      { de: "Wir sitzen auf der Wiese.", tr: "nerede olduğunuzu söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Güneş açtı ve herkes parkta. Bugün bir yerde neler olduğunu anlatmayı ve birlikte plan yapmayı öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'göl var' deriz ve tek kelime yeter. Almancada bunun için iki kelimelik hazır bir kalıp kullanılır ve arkasından gelen şey nesne sayılır. Bu ayrıntı dersin can alıcı noktası. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Park"),
          tr("Türkçesi 'park' demek. Lütfen"),
          de("der Park"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Park" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der See"),
          tr("Türkçesi 'göl' demek. Lütfen"),
          de("der See"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der See" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Wiese"),
          tr("Türkçesi 'çayır' demek. Lütfen"),
          de("die Wiese"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Wiese" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Picknick"),
          tr("Türkçesi 'piknik' demek. Lütfen"),
          de("das Picknick"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Picknick" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Baum"),
          tr("Türkçesi 'ağaç' demek. Lütfen"),
          de("der Baum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Baum" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Es gibt einen See."),
          tr("Yani 'Bir göl var'. Kalıptan sonra gelen şey nesne olduğu için eril kelimeler biçim değiştiriyor:"),
          de("der See"),
          tr("değil"),
          de("einen See"),
          tr("diyoruz. Dişil ve nötr kelimelerde değişiklik yok."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Es gibt einen See"), tr("deyin.")],
        expect: { kind: "repeat", target: "Es gibt einen See" },
      },
      {
        say: [
          tr("Sıra sende: 'Bir park var.'"),
          de("der Park"),
          tr("eril bir kelime."),
        ],
        expect: {
          kind: "produce",
          target: "Es gibt einen Park",
          hint: [
            de("der Park"),
            tr("eril; bu kalıptan sonra nesne olur ve biçim değiştirir:"),
            de("Es gibt einen Park."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Parkta ne yapacağınızı söylemek için ikinci kalıp:"),
          de("Wir machen ein Picknick."),
          tr("Nerede olduğunuzu da eklersin:"),
          de("Wir sitzen auf der Wiese."),
          tr("Lütfen"),
          de("Wir machen ein Picknick"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir machen ein Picknick" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Çayırda oturuyoruz.'")],
        expect: {
          kind: "produce",
          target: "Wir sitzen auf der Wiese",
          hint: [
            tr("Önce siz ve fiil, en sonda nerede olduğunuz:"),
            de("Wir sitzen auf der Wiese."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Gölge arıyorsan söyleyeceğin cümle de şu:"),
          de("Wir sitzen unter dem Baum."),
          tr("Lütfen"),
          de("Wir sitzen unter dem Baum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir sitzen unter dem Baum" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Es gibt ein See."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Es gibt ein See.",
          answer: false,
          why: [
            de("der See"),
            tr("eril ve bu kalıptan sonra nesne olur. Doğrusu:"),
            de("Es gibt einen See."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir yerde neler olduğunu anlatabilir ve birlikte plan yapabilirsin. Şimdi parktasın: arkadaşın çoktan bir yer bulmuş.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Güneşli bir günde arkadaşınla parkta buluştun. Parkta neler olduğunu anlat, nerede oturacağınızı konuş ve ne yapacağınıza karar verin.",
      partner: "her şeyi planlamayı seven, neşeli bir arkadaş",
      opening: "Da bist du ja! Sollen wir zum See gehen oder auf die Wiese?",
      openingTr: "İşte geldin! Göle mi gidelim, çayıra mı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-schwimmbad",
    icon: "sport",
    level: "A1",
    course: "de",
    title: "Im Schwimmbad",
    titleTr: "Havuzda",
    summary: "Havuzda giriş ücretini sormayı, kabinleri bulmayı ve yapabildiğini söylemeyi öğretir.",
    minutes: 8,
    focusId: "Modalverb-können",
    vocab: [
      { de: "das Schwimmbad", tr: "yüzme havuzu" },
      { de: "der Eintritt", tr: "giriş ücreti" },
      { de: "das Handtuch", tr: "havlu" },
      { de: "tauchen", tr: "dalmak" },
      { de: "tief", tr: "derin" },
    ],
    patterns: [
      { de: "Was kostet der Eintritt?", tr: "giriş ücretini sorarken kullanılır" },
      { de: "Wo sind die Umkleiden?", tr: "kabinleri sorarken kullanılır" },
      { de: "Ich kann nicht tief tauchen.", tr: "neyi yapamadığını söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Yazın en serin yer havuz. Bugün giriş ücretini sormayı, kabinleri bulmayı ve suda neyi yapıp yapamadığını söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da havuzlarda kurallar nettir ve girişte iki soru sorarsan gerisi kolay gelir. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("das Schwimmbad"),
          tr("Türkçesi 'yüzme havuzu' demek. Lütfen"),
          de("das Schwimmbad"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Schwimmbad" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Eintritt"),
          tr("Türkçesi 'giriş ücreti' demek. Lütfen"),
          de("der Eintritt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Eintritt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("das Handtuch"),
          tr("Türkçesi 'havlu' demek. Lütfen"),
          de("das Handtuch"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Handtuch" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("tauchen"),
          tr("Türkçesi 'dalmak' demek. Lütfen"),
          de("tauchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tauchen" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("tief"),
          tr("Türkçesi 'derin' demek. Lütfen"),
          de("tief"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "tief" },
      },
      {
        say: [
          tr("Girişteki ilk sorun fiyat olacak:"),
          de("Was kostet der Eintritt?"),
          tr("Cevabı da şöyle geliyor:"),
          de("Der Eintritt kostet fünf Euro."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Was kostet der Eintritt"), tr("deyin.")],
        expect: { kind: "repeat", target: "Was kostet der Eintritt" },
      },
      {
        say: [
          tr("İkinci sorun kabinler. Bu kelimeyi mağazadan hatırlıyorsun:"),
          de("Wo sind die Umkleiden?"),
          tr("Lütfen"),
          de("Wo sind die Umkleiden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wo sind die Umkleiden" },
      },
      {
        say: [tr("Şimdi havluyu sen sor: 'Havlu ne kadar?'")],
        expect: {
          kind: "produce",
          target: "Was kostet das Handtuch",
          hint: [
            tr("Soru kelimesi başta, fiyatı sorulan şey sonda:"),
            de("Was kostet das Handtuch?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Suya girince yapabildiklerini anlatma sırası gelir:"),
          de("Ich kann gut schwimmen, aber ich kann nicht tief tauchen."),
          tr(
            "İki cümle de aynı kalıpla kuruldu: asıl fiil en sonda bekliyor. Planını anlatmak istersen de tek cümle yeter:",
          ),
          de("Ich gehe heute ins Schwimmbad."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich kann nicht tief tauchen"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich kann nicht tief tauchen" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Derin dalabiliyorum.'")],
        expect: {
          kind: "produce",
          target: "Ich kann tief tauchen",
          hint: [
            tr("Yapabilmeyi anlatan fiil ikinci sırada, asıl fiil en sonda:"),
            de("Ich kann tief tauchen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Das Eintritt kostet fünf Euro."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Das Eintritt kostet fünf Euro.",
          answer: false,
          why: [
            tr("Yanlış. Giriş ücreti eril bir kelimedir. Doğrusu:"),
            de("Der Eintritt kostet fünf Euro."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık havuza girip gereken her şeyi sorabilirsin. Şimdi havuzun gişesindesin ve görevli seni bekliyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir yüzme havuzunun gişesindesin. Giriş ücretini sor, kaç saat kalabileceğini öğren, kabinlerin yerini sor ve havlu kiralanıp kiralanmadığını konuş.",
      partner: "kuralları tek tek anlatan, dost canlısı bir havuz görevlisi",
      opening: "Hallo! Möchten Sie eine Karte für zwei Stunden oder für den ganzen Tag?",
      openingTr: "Merhaba! İki saatlik bilet mi istersiniz, tam günlük mü?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-fernsehen",
    icon: "media",
    level: "A1",
    course: "de",
    title: "Was läuft im Fernsehen?",
    titleTr: "TV ve dizi",
    summary: "Ne izlediğini anlatmayı, kanalı sormayı ve programın saatini söylemeyi öğretir.",
    minutes: 9,
    focusId: "Gern-lieber",
    vocab: [
      { de: "die Sendung", tr: "program" },
      { de: "der Kanal", tr: "kanal" },
      { de: "die Serie", tr: "dizi" },
      { de: "die Nachrichten", tr: "haberler" },
      { de: "schauen", tr: "izlemek" },
    ],
    patterns: [
      { de: "Ich schaue gern Serien.", tr: "ne izlemeyi sevdiğini söylerken kullanılır" },
      { de: "Auf welchem Kanal läuft das?", tr: "kanalı sorarken kullanılır" },
      { de: "Die Sendung beginnt um acht.", tr: "programın saatini söylerken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Akşam oldu ve kumanda elinde. Bugün ne izlediğini anlatmayı, kanalı sormayı ve programın kaçta başladığını söylemeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu ders, severek yapmayı anlatan kelimeyi bir kez daha pekiştirecek; bu sefer izlemekle. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Sendung"),
          tr("Türkçesi 'program' demek. Lütfen"),
          de("die Sendung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Sendung" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("der Kanal"),
          tr("Türkçesi 'kanal' demek. Lütfen"),
          de("der Kanal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Kanal" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Serie"),
          tr("Türkçesi 'dizi' demek. Lütfen"),
          de("die Serie"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Serie" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Nachrichten"),
          tr("Türkçesi 'haberler' demek. Lütfen"),
          de("die Nachrichten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Nachrichten" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("schauen"),
          tr("Türkçesi 'izlemek' demek. Lütfen"),
          de("schauen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schauen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich schaue gern Serien."),
          tr(
            "Yani 'Severek dizi izlerim'. Buradaki küçük kelime hobiler dersindekiyle aynı; hangi fiile eklersen ekle 'severek yaparım' anlamını veriyor.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Ich schaue gern Serien"), tr("deyin.")],
        expect: { kind: "repeat", target: "Ich schaue gern Serien" },
      },
      {
        say: [tr("Sıra sende: 'Severek haber izlerim.'")],
        expect: {
          kind: "produce",
          target: "Ich schaue gern Nachrichten",
          hint: [
            tr("Fiil aynı kalır, o küçük kelime hemen arkasına gelir:"),
            de("Ich schaue gern Nachrichten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir şeyin hangi kanalda olduğunu sormak için:"),
          de("Auf welchem Kanal läuft das?"),
          tr("Yani 'Bu hangi kanalda?' Televizyonda bir programın 'olması' için ayrı bir fiil kullanılıyor, tıpkı bizim 'oynuyor' dememiz gibi."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Auf welchem Kanal läuft das"), tr("deyin.")],
        expect: { kind: "repeat", target: "Auf welchem Kanal läuft das" },
      },
      {
        say: [
          tr("Saatini söylemek de kolay:"),
          de("Die Sendung beginnt um acht."),
          tr("Lütfen"),
          de("Die Sendung beginnt um acht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Sendung beginnt um acht" },
      },
      {
        say: [tr("Şimdi sen söyle: 'Dizi dokuzda başlıyor.'")],
        expect: {
          kind: "produce",
          target: "Die Serie beginnt um neun",
          hint: [
            tr("Önce program, sonra fiil, en sonda saat:"),
            de("Die Serie beginnt um neun."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Der Film beginnt um neun."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Der Film beginnt um neun.",
          answer: true,
          why: [
            tr("Doğru. Saat bildiren kısım cümlenin sonunda ve fiil ikinci sırada:"),
            de("Der Film beginnt um neun."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ne izlediğini anlatabilir, kanalı sorabilir ve saati söyleyebilirsin. Şimdi evde ev arkadaşınla aynı kanepedesin ve kumanda ortada.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Akşam evdesin ve ev arkadaşınla ne izleyeceğinize karar veremiyorsunuz. Ne izlemek istediğini söyle, sebebini anlat, onun önerisine cevap ver ve bir saatte anlaşın.",
      partner: "her akşam haberleri izlemek isteyen bir ev arkadaşı",
      opening: "Die Nachrichten fangen gleich an. Oder möchtest du etwas anderes sehen?",
      openingTr: "Haberler birazdan başlıyor. Yoksa başka bir şey mi izlemek istersin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a1-absage",
    icon: "phone",
    level: "A1",
    course: "de",
    title: "Leider kann ich nicht",
    titleTr: "Nazikçe reddetme",
    summary: "Bir daveti kırmadan geri çevirmeyi ve başka bir gün önermeyi öğretir.",
    minutes: 9,
    focusId: "Modalverb-können",
    vocab: [
      { de: "schade", tr: "yazık" },
      { de: "klappen", tr: "denk gelmek" },
      { de: "diesmal", tr: "bu sefer" },
      { de: "trotzdem", tr: "yine de" },
      { de: "unbedingt", tr: "mutlaka" },
    ],
    patterns: [
      { de: "Leider kann ich nicht.", tr: "kibarca hayır derken kullanılır" },
      { de: "Das klappt diesmal nicht.", tr: "bu sefer olmadığını söylerken kullanılır" },
      { de: "Vielleicht nächste Woche?", tr: "başka bir zaman önerirken kullanılır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Davet aldın ama gidemeyeceksin. Bugün bir daveti kırmadan geri çevirmeyi ve yerine başka bir gün önermeyi öğreneceğiz. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Almanya'da hayır demek kabalık sayılmaz; kabalık olan, cevabı belirsiz bırakmaktır. Ama üç parçalı bir sıra var: üzüldüğünü söyle, sebebini söyle, yeni bir gün öner. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("schade"),
          tr("Türkçesi 'yazık' demek. Lütfen"),
          de("schade"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schade" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("klappen"),
          tr("Türkçesi 'denk gelmek, olmak' demek. Lütfen"),
          de("klappen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "klappen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("diesmal"),
          tr("Türkçesi 'bu sefer' demek. Lütfen"),
          de("diesmal"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "diesmal" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("trotzdem"),
          tr("Türkçesi 'yine de' demek. Lütfen"),
          de("trotzdem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "trotzdem" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("unbedingt"),
          tr("Türkçesi 'mutlaka' demek. Lütfen"),
          de("unbedingt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "unbedingt" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Leider kann ich nicht."),
          tr(
            "Yani 'Maalesef gelemiyorum'. Bunu randevu dersinden hatırlıyor olabilirsin; bugün asıl derinliğine iniyoruz. Cümleye üzüntü bildiren kelimeyle başladığın için fiil hemen arkasına geçti ve sen üçüncü sıraya düştün. Almancada fiil hep ikinci sırada durur, bu cümle bunun güzel bir örneği.",
          ),
        ],
      },
      {
        say: [tr("Lütfen"), de("Leider kann ich nicht"), tr("deyin.")],
        expect: { kind: "repeat", target: "Leider kann ich nicht" },
      },
      {
        say: [tr("Sıra sende. Sebebini de ekle: 'Bu sefer denk gelmiyor.'")],
        expect: {
          kind: "produce",
          target: "Das klappt diesmal nicht",
          hint: [
            tr("Önce konu, sonra fiil, olumsuzluk en sonda:"),
            de("Das klappt diesmal nicht."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üzüldüğünü göstermek için tek kelime yeter:"),
          de("Schade!"),
          tr("Davet için teşekkür etmeyi de unutma; bunun hazır biçimi şu:"),
          de("Danke trotzdem!"),
          tr("Lütfen"),
          de("Danke trotzdem"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Danke trotzdem" },
      },
      {
        say: [
          tr("Şimdi en önemli parça: yeni bir gün önermek."),
          de("Vielleicht nächste Woche?"),
          tr("Bunu eklemezsen cevabın soğuk kalır. Bir de sıcak bir kapanış var:"),
          de("Beim nächsten Mal komme ich unbedingt."),
        ],
      },
      {
        say: [tr("Lütfen"), de("Vielleicht nächste Woche"), tr("deyin.")],
        expect: { kind: "repeat", target: "Vielleicht nächste Woche" },
      },
      {
        say: [tr("Şimdi sen öner: 'Belki gelecek cumartesi?'")],
        expect: {
          kind: "produce",
          target: "Vielleicht nächsten Samstag",
          hint: [
            tr("Öneri kelimesi başta, gün en sonda:"),
            de("Vielleicht nächsten Samstag?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Leider ich kann nicht."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Leider ich kann nicht.",
          answer: false,
          why: [
            tr(
              "Yanlış. Üzüntü bildiren kelime başta olunca fiil hemen arkasından gelmeli. Doğrusu:",
            ),
            de("Leider kann ich nicht."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık bir daveti kırmadan geri çevirebilir ve yerine yeni bir gün önerebilirsin. Şimdi telefonun çalıyor: bir arkadaşın seni bu akşama çağırıyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın seni bu akşam bir şeye davet etmek için aradı ama gidemeyeceksin. Üzüldüğünü söyle, gelemediğini nazikçe belirt, sebebini anlat ve başka bir gün öner.",
      partner: "kolay pes etmeyen, ısrarcı ama sevecen bir arkadaş",
      opening: "Hallo! Wir gehen heute Abend essen. Kommst du mit?",
      openingTr: "Merhaba! Bu akşam yemeğe gidiyoruz. Sen de gelir misin?",
      minTurns: 4,
    },
  },
];

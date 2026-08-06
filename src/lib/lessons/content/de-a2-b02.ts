import { de, tr, type Lesson } from "../types";

/**
 * A2 · Modül 2 — Benim hikâyem (011–020).
 *
 * Modül 1 Perfekt'i derinleştirdi. Bu modülün işi, geçmişi **anlatılabilir**
 * hâle getirmek: bir hayat hikâyesi tek tek olaylardan ibaret değil, olayların
 * arasında istekler, zorunluluklar ve yasaklar var.
 *
 * Üç yeni şey öğretiliyor ve üçü de Türkçe konuşan için ayrı bir zorluk:
 *
 *   1. **Präteritum modalleri.** Almancada „istiyordum, yapamadım, zorundaydım“
 *      için konuşma dilinde Perfekt kullanılmaz; modal fiillerin kendi geçmiş
 *      biçimi vardır ve bunlar tek kelimedir. Öğrenci Perfekt kurmaya kalkıp
 *      „Ich habe gewollt“ diyor.
 *   2. **Dönüşlü fiiller.** Türkçede „tanıştık, alıştım“ tek kelimede biter;
 *      Almancada ayrı bir zamir gerekiyor ve o zamir cümlede kendi yerini alıyor.
 *   3. **`seit` ve `vor`.** İkisi de Türkçede „önce“ ve „beri“ ile karşılanıyor
 *      ama biri hâlâ süren bir şeyi, diğeri bitmiş bir noktayı anlatıyor —
 *      karıştırıldığında cümlenin anlamı değişiyor.
 *
 * Sıra hikâye anlatmanın sırası: önce hayat çizgisi ve modallerin geçmişi,
 * sonra dönüşlülerle ilişkiler ve değişim, sonda utanç ve gurur anıları.
 */
export const deA2B02: Lesson[] = [
  {
    id: "de-a2-lebensweg",
    icon: "culture",
    level: "A2",
    course: "de",
    title: "Mein Weg nach Deutschland",
    titleTr: "Göç hikâyesi",
    summary: "Bir hayat hikâyesini sırayla anlatmayı öğretir: kaç yaşındaydın, sonra ne oldu.",
    minutes: 9,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Heimat", tr: "memleket" },
      { de: "auswandern", tr: "başka ülkeye göç etmek" },
      { de: "die Grenze", tr: "sınır" },
      { de: "der Koffer", tr: "bavul" },
      { de: "aufregend", tr: "heyecan verici" },
    ],
    patterns: [
      { de: "Ich war … Jahre alt.", tr: "o sırada kaç yaşında olduğunu söyler" },
      { de: "Zuerst hatten wir …", tr: "başlangıçta neyin olduğunu söyler" },
      { de: "Dann sind wir …", tr: "sonra ne olduğunu anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün bir hayat hikâyesini anlatmayı öğreneceğiz. Geçmiş zamanı biliyorsun; bugün ona iki kısa biçim ekleyeceğiz ve hikâyen akmaya başlayacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Küçük bir kolaylık var: 'olmak' ve 'sahip olmak' fiillerinin geçmişi konuşma dilinde iki parçaya bölünmez, tek kelimeyle söylenir. Hikâye anlatırken en çok bu ikisini kullanacaksın. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Heimat"),
          tr("Türkçesi 'memleket' demek. Lütfen"),
          de("die Heimat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Heimat" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("auswandern"),
          tr("Türkçesi 'başka bir ülkeye göç etmek' demek. Lütfen"),
          de("auswandern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "auswandern" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Grenze"),
          tr("Türkçesi 'sınır' demek. Lütfen"),
          de("die Grenze"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Grenze" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Koffer"),
          tr("Türkçesi 'bavul' demek. Lütfen"),
          de("der Koffer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Koffer" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("aufregend"),
          tr("Türkçesi 'heyecan verici' demek. Lütfen"),
          de("aufregend"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufregend" },
      },
      {
        say: [
          tr("İki yeni kelime hikâyenin girişinde hemen iş görür:"),
          de("Wir sind vor zehn Jahren ausgewandert."),
          tr("ve o günleri anlatırken:"),
          de("Die erste Zeit war aufregend."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız yaşını söyler:"),
          de("Ich war zwanzig Jahre alt."),
          tr("'Yirmi yaşındaydım' demek. Lütfen"),
          de("Ich war zwanzig Jahre alt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich war zwanzig Jahre alt" },
      },
      {
        say: [tr("Sıra sende: 'On sekiz yaşındaydım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich war achtzehn Jahre alt",
          hint: [
            tr("Geçmiş tek kelimeyle söyleniyor, cümle ikiye bölünmüyor:"),
            de("Ich war achtzehn Jahre alt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız 'sahip olmak' fiilinin geçmişini kullanır:"),
          de("Zuerst hatten wir nichts."),
          tr("'Başta hiçbir şeyimiz yoktu' demek. Lütfen"),
          de("Zuerst hatten wir nichts"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zuerst hatten wir nichts" },
      },
      {
        say: [tr("Şimdi sen: 'Başta sadece bir bavulumuz vardı.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Zuerst hatten wir nur einen Koffer",
          hint: [
            tr("Bavul burada nesne olduğu için artikeli değişir:"),
            de("Zuerst hatten wir nur einen Koffer."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız hikâyeyi ilerletir:"),
          de("Dann sind wir nach Deutschland gekommen."),
          tr("'Sonra Almanya'ya geldik' demek. Lütfen"),
          de("Dann sind wir nach Deutschland gekommen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Dann sind wir nach Deutschland gekommen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Zuerst wir hatten nichts."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Zuerst wir hatten nichts.",
          answer: false,
          why: [
            tr("Sıralama kelimesi başta olduğu için fiil ikinci sıraya, özne de arkasına geçmeli. Doğrusu"),
            de("Zuerst hatten wir nichts."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık hikâyeni sırayla anlatabilirsin. Şimdi biri sana buraya nasıl geldiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir dil kursunda tanıştığın biri sana Almanya'ya nasıl geldiğini soruyor. Hikâyeni sırayla anlat: kaç yaşındaydın, başta neyin vardı, sonra ne oldu.",
      partner: "kendi hikâyesini de anlatmak isteyen bir kursiyer",
      opening: "Sag mal, wie bist du eigentlich nach Deutschland gekommen?",
      openingTr: "Söylesene, Almanya'ya aslında nasıl geldin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-wollte-konnte",
    icon: "plane",
    level: "A2",
    course: "de",
    title: "Ich wollte Pilot werden",
    titleTr: "Çocukluk hayalleri",
    summary: "Geçmişteki isteği, yapamamayı ve zorunluluğu anlatmayı öğretir.",
    minutes: 9,
    focusId: "Präteritum-Modal",
    vocab: [
      { de: "wollte", tr: "istiyordum" },
      { de: "konnte", tr: "yapabiliyordum" },
      { de: "musste", tr: "zorundaydım" },
      { de: "der Traum", tr: "hayal, rüya" },
      { de: "der Pilot", tr: "pilot" },
    ],
    patterns: [
      { de: "Ich wollte …", tr: "geçmişte ne istediğini söyler" },
      { de: "Ich konnte nicht …", tr: "geçmişte neyi yapamadığını söyler" },
      { de: "Ich musste …", tr: "geçmişte neye mecbur olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün çok işine yarayacak bir şey öğreneceğiz: geçmişte ne istediğini, neyi yapamadığını ve neye mecbur olduğunu anlatmak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Burada dikkat: bu üç fiilin geçmişi iki parçaya bölünmez. Konuşurken Almanlar hep tek kelimelik biçimi kullanır. Yani kural değil, tam tersine bir kolaylık. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'istemek' fiilinin geçmiş biçimi:"),
          de("wollte"),
          tr("'İstiyordum' demek. Lütfen"),
          de("wollte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "wollte" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'yapabilmek' fiilinin geçmiş biçimi:"),
          de("konnte"),
          tr("'Yapabiliyordum' demek. Lütfen"),
          de("konnte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "konnte" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz 'zorunda olmak' fiilinin geçmiş biçimi:"),
          de("musste"),
          tr("'Zorundaydım' demek. Lütfen"),
          de("musste"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "musste" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("der Traum"),
          tr("Türkçesi 'hayal, rüya' demek. Lütfen"),
          de("der Traum"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Traum" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Pilot"),
          tr("Türkçesi 'pilot' demek. Lütfen"),
          de("der Pilot"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Pilot" },
      },
      {
        say: [
          tr(
            "Bu üç kelimeyle bir cümle kurarken asıl fiil çekilmeden cümlenin sonunda kalır — bugünkü kullanımdaki gibi, sadece baştaki kelime geçmiş biçimine giriyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Pilot olmak istiyordum.' Almancası:"),
          de("Ich wollte Pilot werden."),
          tr("Lütfen"),
          de("Ich wollte Pilot werden"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wollte Pilot werden" },
      },
      {
        say: [tr("Sıra sende: 'Doktor olmak istiyordum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich wollte Arzt werden",
          accept: ["Ich wollte Ärztin werden"],
          hint: [
            tr("Asıl fiil çekilmeden cümlenin sonunda kalır:"),
            de("Ich wollte Arzt werden."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yapamamayı anlatır:"),
          de("Ich konnte nicht studieren."),
          tr("'Üniversiteye gidemedim' demek. Lütfen"),
          de("Ich konnte nicht studieren"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich konnte nicht studieren" },
      },
      {
        say: [tr("Şimdi sen: 'Çalışmak zorundaydım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich musste arbeiten",
          hint: [
            tr("Zorunluluğun geçmiş biçimi ikinci sırada, asıl fiil sonda:"),
            de("Ich musste arbeiten."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha duyalım:"),
          de("Mein Traum war ein anderer."),
          tr("'Hayalim başkaydı' demek. Lütfen"),
          de("Mein Traum war ein anderer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Traum war ein anderer" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe Pilot werden gewollt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe Pilot werden gewollt.",
          answer: false,
          why: [
            tr("Bu fiillerin geçmişi konuşma dilinde iki parçaya bölünmez, tek kelimeyle söylenir. Doğrusu"),
            de("Ich wollte Pilot werden."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık geçmişteki hayallerini anlatabilirsin. Şimdi biri sana çocukken ne olmak istediğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla çocukluk hayallerinizi konuşuyorsunuz. Ne olmak istediğini, neyi yapamadığını ve bunun yerine ne yapmak zorunda kaldığını anlat.",
      partner: "kendi çocukluk hayalini de anlatan bir arkadaş",
      opening: "Was wolltest du eigentlich werden, als du klein warst?",
      openingTr: "Küçükken aslında ne olmak istiyordun?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-schulzeit",
    icon: "school",
    level: "A2",
    course: "de",
    title: "Meine Schulzeit",
    titleTr: "Okul yılları",
    summary: "Okulda nelerin zorunlu, nelerin yasak olduğunu geçmiş zamanla anlatmayı öğretir.",
    minutes: 9,
    focusId: "Präteritum-Modal",
    vocab: [
      { de: "durfte", tr: "iznim vardı" },
      { de: "das Fach", tr: "ders, branş" },
      { de: "der Unterricht", tr: "ders saati, öğretim" },
      { de: "die Note", tr: "not" },
      { de: "streng", tr: "sert, katı" },
    ],
    patterns: [
      { de: "Wir mussten …", tr: "neyin zorunlu olduğunu söyler" },
      { de: "Wir durften nicht …", tr: "neyin yasak olduğunu söyler" },
      { de: "Mein Lieblingsfach war …", tr: "en sevdiği dersi söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün okul yıllarını anlatmayı öğreneceğiz. Geçen dersten üç biçimi biliyorsun; bugün dördüncüsünü ekleyeceğiz: izin. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Okul anıları neredeyse her sohbette çıkıyor ve hepsi aynı iki şeyin etrafında dönüyor: neyi yapmak zorundaydın, neye izin yoktu. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'izinli olmak' fiilinin geçmiş biçimi:"),
          de("durfte"),
          tr("'İznim vardı' demek. Lütfen"),
          de("durfte"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "durfte" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("das Fach"),
          tr("Türkçesi 'ders, branş' demek — matematik, tarih gibi. Lütfen"),
          de("das Fach"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Fach" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Unterricht"),
          tr("Türkçesi 'ders saati, öğretim' demek. Lütfen"),
          de("der Unterricht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Unterricht" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Note"),
          tr("Türkçesi 'not' demek — karnedeki not. Lütfen"),
          de("die Note"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Note" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("streng"),
          tr("Türkçesi 'sert, katı' demek. Lütfen"),
          de("streng"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "streng" },
      },
      {
        say: [
          tr("İlk kalıbımız zorunluluk anlatır:"),
          de("Wir mussten Uniform tragen."),
          tr("'Üniforma giymek zorundaydık' demek. Lütfen"),
          de("Wir mussten Uniform tragen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir mussten Uniform tragen" },
      },
      {
        say: [tr("Sıra sende: 'Çok öğrenmek zorundaydık.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir mussten viel lernen",
          hint: [
            tr("Zorunluluğun geçmiş biçimi ikinci sırada, asıl fiil en sonda:"),
            de("Wir mussten viel lernen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız yasağı anlatır:"),
          de("Wir durften nicht sprechen."),
          tr("'Konuşmamıza izin yoktu' demek. Lütfen"),
          de("Wir durften nicht sprechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir durften nicht sprechen" },
      },
      {
        say: [tr("Şimdi sen: 'Cep telefonu kullanmamıza izin yoktu.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir durften kein Handy benutzen",
          hint: [
            tr("Olumsuzluk nesnenin önüne geçer, asıl fiil yine sonda:"),
            de("Wir durften kein Handy benutzen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız en sevdiğin dersi söyler:"),
          de("Mein Lieblingsfach war Mathe."),
          tr("Lütfen"),
          de("Mein Lieblingsfach war Mathe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Lieblingsfach war Mathe" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Unser Lehrer war sehr streng."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Unser Lehrer war sehr streng.",
          answer: true,
          why: [
            tr("Doğru. Geçmişte bir şeyin nasıl olduğu tek kelimeyle söylenir ve cümle ikiye bölünmez."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık okul yıllarını anlatabilirsin. Şimdi bir arkadaşınla okul anılarınızı karşılaştıracaksınız.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla okul yıllarınızı konuşuyorsunuz. Neyin zorunlu, neyin yasak olduğunu anlat ve en sevdiğin dersi söyle.",
      partner: "okulu hiç sevmemiş, esprili bir arkadaş",
      opening: "Wie war deine Schulzeit? Wart ihr streng erzogen?",
      openingTr: "Okul yılların nasıldı? Size sıkı mı davranıldı?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-umzug-geschichte",
    icon: "home",
    level: "A2",
    course: "de",
    title: "Der große Umzug",
    titleTr: "Taşınma hikâyesi",
    summary: "Bir taşınmayı baştan sona anlatmayı ve başlangıçtaki zorluğu söylemeyi öğretir.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "umgezogen", tr: "taşınmak fiilinin geçmiş biçimi" },
      { de: "gepackt", tr: "paketlemek fiilinin geçmiş biçimi" },
      { de: "der Abschied", tr: "veda" },
      { de: "fremd", tr: "yabancı" },
      { de: "schwierig", tr: "zor" },
    ],
    patterns: [
      { de: "Wir sind umgezogen.", tr: "taşındığınızı söyler" },
      { de: "Ich habe … gepackt.", tr: "neyi paketlediğini söyler" },
      { de: "Am Anfang war es schwer.", tr: "başlangıcın nasıl geçtiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir taşınmayı anlatmayı öğreneceğiz. Burada güzel bir ayrıntı var: taşınmak fiili yer değiştirme bildirdiği için diğer yardımcı fiili alıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Aynı hikâyede iki yardımcı fiili birden kullanacaksın: taşınmak için biri, paketlemek için diğeri. Karar her seferinde fiile göre veriliyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz 'taşınmak' fiilinin geçmiş biçimi:"),
          de("umgezogen"),
          tr("Lütfen"),
          de("umgezogen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "umgezogen" },
      },
      {
        say: [
          tr("İkinci kelimemiz 'paketlemek' fiilinin geçmiş biçimi:"),
          de("gepackt"),
          tr("Lütfen"),
          de("gepackt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "gepackt" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("der Abschied"),
          tr("Türkçesi 'veda' demek. Lütfen"),
          de("der Abschied"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Abschied" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("fremd"),
          tr("Türkçesi 'yabancı' demek — tanıdık olmayan. Lütfen"),
          de("fremd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "fremd" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("schwierig"),
          tr("Türkçesi 'zor' demek. Lütfen"),
          de("schwierig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "schwierig" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Wir sind letztes Jahr umgezogen."),
          tr("'Geçen yıl taşındık' demek. Lütfen"),
          de("Wir sind letztes Jahr umgezogen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir sind letztes Jahr umgezogen" },
      },
      {
        say: [tr("Sıra sende: 'Berlin'e taşındık.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir sind nach Berlin umgezogen",
          hint: [
            tr("Taşınmak yer değiştirme bildirir, o yüzden bu yardımcı fiili alır:"),
            de("Wir sind nach Berlin umgezogen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız başka bir yardımcı fiil alır:"),
          de("Ich habe alles gepackt."),
          tr("'Her şeyi topladım' demek. Lütfen"),
          de("Ich habe alles gepackt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe alles gepackt" },
      },
      {
        say: [tr("Şimdi sen: 'Yirmi koli paketledim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe zwanzig Kisten gepackt",
          hint: [
            tr("Paketlemek yer değiştirme bildirmez, diğer yardımcı fiili alır:"),
            de("Ich habe zwanzig Kisten gepackt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız başlangıcı değerlendirir. Ondan önce vedayı da anabilirsin:"),
          de("Der Abschied war schwierig."),
          tr("Sonra başlangıç geliyor:"),
          de("Am Anfang war alles fremd."),
          tr("'Başta her şey yabancıydı' demek. Lütfen"),
          de("Am Anfang war alles fremd"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Am Anfang war alles fremd" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir haben nach Berlin umgezogen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir haben nach Berlin umgezogen.",
          answer: false,
          why: [
            tr("Taşınmak bir yerden bir yere gitmeyi anlatır, o yüzden diğer yardımcı fiili alır. Doğrusu"),
            de("Wir sind nach Berlin umgezogen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık taşınma hikâyeni anlatabilirsin. Şimdi bir komşun sana nereden geldiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni komşun taşınma hikâyeni soruyor. Ne zaman ve nereye taşındığınızı, neleri paketlediğini ve başlangıcın nasıl geçtiğini anlat.",
      partner: "kendisi de yakın zamanda taşınmış bir komşu",
      opening: "Ihr seid neu hier, oder? Wann seid ihr umgezogen?",
      openingTr: "Siz yenisiniz, değil mi? Ne zaman taşındınız?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-kennenlernen",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Wie habt ihr euch kennengelernt?",
    titleTr: "Tanışma hikâyesi",
    summary: "Dönüşlü fiillerle tanışma ve ilişki hikâyesi anlatmayı öğretir.",
    minutes: 9,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich kennenlernen", tr: "tanışmak" },
      { de: "sich verlieben", tr: "âşık olmak" },
      { de: "sich treffen", tr: "buluşmak" },
      { de: "die Beziehung", tr: "ilişki" },
      { de: "zufällig", tr: "tesadüfen" },
    ],
    patterns: [
      { de: "Wir haben uns kennengelernt.", tr: "nasıl tanıştığınızı anlatır" },
      { de: "Wir haben uns verliebt.", tr: "âşık olduğunuzu söyler" },
      { de: "Wir treffen uns …", tr: "ne sıklıkla buluştuğunuzu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün dönüşlü fiilleri öğreneceğiz. Türkçede 'tanıştık' tek kelimede biter; Almancada ise cümleye küçük bir zamir eklemen gerekir ve o zamir atlanırsa cümle yarım kalır. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu zamir 'birbirimizi' ya da 'kendimi' anlamını taşıyor. Türkçe konuşanın en sık unuttuğu şeylerden biri, çünkü Türkçede karşılığı ekin içinde saklı. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich kennenlernen"),
          tr("Türkçesi 'tanışmak' demek. Lütfen"),
          de("sich kennenlernen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich kennenlernen" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich verlieben"),
          tr("Türkçesi 'âşık olmak' demek. Lütfen"),
          de("sich verlieben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verlieben" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("sich treffen"),
          tr("Türkçesi 'buluşmak' demek. Lütfen"),
          de("sich treffen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich treffen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Beziehung"),
          tr("Türkçesi 'ilişki' demek. Lütfen"),
          de("die Beziehung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Beziehung" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("zufällig"),
          tr("Türkçesi 'tesadüfen' demek. Lütfen"),
          de("zufällig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "zufällig" },
      },
      {
        say: [
          tr(
            "Şimdi kural. Bu fiillerle cümle kurarken zamir fiilin hemen arkasına gelir. Geçmiş zamanda da aynı yerde durur; geçmiş biçim yine cümlenin sonundadır. Tesadüfse şöyle söylenir:",
          ),
          de("Wir haben uns zufällig getroffen."),
        ],
      },
      {
        say: [
          tr("Örnek: 'Berlin'de tanıştık.' Almancası:"),
          de("Wir haben uns in Berlin kennengelernt."),
          tr("Lütfen"),
          de("Wir haben uns in Berlin kennengelernt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir haben uns in Berlin kennengelernt" },
      },
      {
        say: [tr("Sıra sende: 'Bir kursta tanıştık.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir haben uns in einem Kurs kennengelernt",
          hint: [
            tr("Zamir yardımcı fiilin hemen arkasında, geçmiş biçim en sonda:"),
            de("Wir haben uns in einem Kurs kennengelernt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("Wir haben uns sofort verliebt."),
          tr("'Hemen âşık olduk' demek. Lütfen"),
          de("Wir haben uns sofort verliebt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Wir haben uns sofort verliebt" },
      },
      {
        say: [tr("Şimdi sen: 'Her hafta buluşuyoruz.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wir treffen uns jede Woche",
          hint: [
            tr("Şimdiki zamanda zamir fiilin hemen arkasına gelir:"),
            de("Wir treffen uns jede Woche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Unsere Beziehung war von Anfang an gut."),
          tr("'İlişkimiz baştan beri iyiydi' demek. Lütfen"),
          de("Unsere Beziehung war von Anfang an gut"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Unsere Beziehung war von Anfang an gut" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wir haben in Berlin kennengelernt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wir haben in Berlin kennengelernt.",
          answer: false,
          why: [
            tr("Dönüşlü zamir eksik; bu fiil onsuz kullanılmaz. Doğrusu"),
            de("Wir haben uns in Berlin kennengelernt."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık tanışma hikâyeni anlatabilirsin. Şimdi biri sana eşinle ya da en yakın arkadaşınla nasıl tanıştığını soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir yemekte tanıştığın biri sana en yakın arkadaşınla nasıl tanıştığını soruyor. Nerede tanıştığınızı, ne olduğunu ve şimdi ne sıklıkla buluştuğunuzu anlat.",
      partner: "hikâye dinlemeyi seven, meraklı bir masa arkadaşı",
      opening: "Ihr kennt euch schon lange, oder? Wie habt ihr euch kennengelernt?",
      openingTr: "Uzun zamandır tanışıyorsunuz, değil mi? Nasıl tanıştınız?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-drei-jahre",
    icon: "calendar",
    level: "A2",
    course: "de",
    title: "Seit drei Jahren",
    titleTr: "Süre ve zaman noktası",
    summary: "Hâlâ süren bir zamanı ve geçmişte kalmış bir noktayı ayırmayı öğretir.",
    minutes: 9,
    focusId: "Dativ-Präpositionen",
    vocab: [
      { de: "seit", tr: "…-den beri" },
      { de: "vor", tr: "…önce" },
      { de: "inzwischen", tr: "bu arada, artık" },
      { de: "ungefähr", tr: "yaklaşık" },
      { de: "der Moment", tr: "an" },
    ],
    patterns: [
      { de: "seit einem Jahr", tr: "hâlâ süren bir zamanı anlatır" },
      { de: "vor zwei Monaten", tr: "geçmişte kalmış bir noktayı anlatır" },
      { de: "nach der Arbeit", tr: "bir şeyden sonrasını anlatır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iki küçük kelimeyi ayırt etmeyi öğreneceğiz. İkisi de Türkçede 'önce' ve 'beri' ile karşılanıyor ama anlamları farklı; karıştırırsan cümlenin anlamı tersine dönüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Ayrım şu: biri hâlâ süren bir şeyi anlatır, diğeri bitmiş bir noktayı. 'Üç yıldır buradayım' ile 'üç yıl önce geldim' aynı şey değil. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("seit"),
          tr("Türkçesi '…-den beri' demek — hâlâ sürüyor. Lütfen"),
          de("seit"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "seit" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("vor"),
          tr("Türkçesi '…önce' demek — bitmiş bir nokta. Lütfen"),
          de("vor"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "vor" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("inzwischen"),
          tr("Türkçesi 'bu arada, artık' demek. Lütfen"),
          de("inzwischen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "inzwischen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("ungefähr"),
          tr("Türkçesi 'yaklaşık' demek. Lütfen"),
          de("ungefähr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "ungefähr" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("der Moment"),
          tr("Türkçesi 'an' demek. Lütfen"),
          de("der Moment"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Moment" },
      },
      {
        say: [
          tr(
            "İkisinin ortak bir yanı var: arkalarından gelen kelime hâl değiştirir. Bir yıl derken 'bir' kelimesi biçim değiştiriyor, iki ay derken 'ay' kelimesi çoğulda ek alıyor. Diğer iki kelime ise cümleye olduğu gibi girer:",
          ),
          de("Inzwischen spreche ich besser Deutsch."),
          tr("ve"),
          de("Das war vor ungefähr zwei Jahren."),
        ],
      },
      {
        say: [
          tr("İlk örnek. 'Bir yıldır burada oturuyorum.' Almancası:"),
          de("Ich wohne seit einem Jahr hier."),
          tr("Lütfen"),
          de("Ich wohne seit einem Jahr hier"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich wohne seit einem Jahr hier" },
      },
      {
        say: [tr("Sıra sende: 'İki yıldır Almanca öğreniyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich lerne seit zwei Jahren Deutsch",
          hint: [
            tr("Çoğulda kelimenin sonuna bir ek daha geliyor:"),
            de("Ich lerne seit zwei Jahren Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci örnek bitmiş bir noktayı anlatır:"),
          de("Vor zwei Monaten war ich in Istanbul."),
          tr("'İki ay önce İstanbul'daydım' demek. Lütfen"),
          de("Vor zwei Monaten war ich in Istanbul"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Vor zwei Monaten war ich in Istanbul" },
      },
      {
        say: [tr("Şimdi sen: 'Üç ay önce taşındım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Vor drei Monaten bin ich umgezogen",
          hint: [
            tr("Zaman başta olduğu için yardımcı fiil ikinci sıraya geçer:"),
            de("Vor drei Monaten bin ich umgezogen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Üçüncü kalıbımız da aynı aileden:"),
          de("Nach der Arbeit gehe ich einkaufen."),
          tr("'İşten sonra alışverişe giderim' demek. Lütfen"),
          de("Nach der Arbeit gehe ich einkaufen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Nach der Arbeit gehe ich einkaufen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich wohne seit ein Jahr hier."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich wohne seit ein Jahr hier.",
          answer: false,
          why: [
            tr("Bu kelimeden sonra gelen sözcük hâl değiştirmeli. Doğrusu"),
            de("Ich wohne seit einem Jahr hier."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ne kadar süredir bir şey yaptığını doğru söyleyebilirsin. Şimdi biri sana ne zamandır Almanya'da olduğunu soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni tanıştığın biri ne zamandır Almanya'da olduğunu soruyor. Ne kadar süredir burada olduğunu ve hangi olayın ne zaman olduğunu anlat; süre ile zaman noktasını karıştırma.",
      partner: "sorularını üst üste soran, sıcak bir tanıdık",
      opening: "Wie lange bist du schon in Deutschland?",
      openingTr: "Ne zamandır Almanya'dasın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-veraenderung",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Was hat sich verändert?",
    titleTr: "Değişimler",
    summary: "Nelerin değiştiğini ve neye alıştığını anlatmayı öğretir.",
    minutes: 9,
    focusId: "Reflexivverben",
    vocab: [
      { de: "sich verändern", tr: "değişmek" },
      { de: "sich gewöhnen", tr: "alışmak" },
      { de: "die Veränderung", tr: "değişim" },
      { de: "selbstständig", tr: "bağımsız, kendi başına" },
      { de: "langsam", tr: "yavaş yavaş" },
    ],
    patterns: [
      { de: "Es hat sich verändert.", tr: "bir şeyin değiştiğini söyler" },
      { de: "Ich habe mich daran gewöhnt.", tr: "bir şeye alıştığını söyler" },
      { de: "Am Anfang … jetzt …", tr: "başlangıç ile bugünü karşılaştırır" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün değişimi anlatmayı öğreneceğiz. Yine dönüşlü fiiller var ama bu sefer zamir 'kendimi' anlamında; iki fiili birlikte görünce fark oturacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir yere yerleşmiş herkesin anlattığı iki şey var: neyin değiştiği ve neye alıştığı. İkisinin de hazır kalıbı var. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("sich verändern"),
          tr("Türkçesi 'değişmek' demek. Lütfen"),
          de("sich verändern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich verändern" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("sich gewöhnen"),
          tr("Türkçesi 'alışmak' demek. Lütfen"),
          de("sich gewöhnen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich gewöhnen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Veränderung"),
          tr("Türkçesi 'değişim' demek. Lütfen"),
          de("die Veränderung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Veränderung" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("selbstständig"),
          tr("Türkçesi 'kendi başına, bağımsız' demek. Lütfen"),
          de("selbstständig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "selbstständig" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("langsam"),
          tr("Türkçesi 'yavaş yavaş' demek. Lütfen"),
          de("langsam"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "langsam" },
      },
      {
        say: [
          tr("Değişim bazen ağırdan gelir; o zaman şöyle dersin:"),
          de("Es geht langsam, aber es geht."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Vieles hat sich verändert."),
          tr("'Çok şey değişti' demek. Zamir yardımcı fiilin hemen arkasında. Lütfen"),
          de("Vieles hat sich verändert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Vieles hat sich verändert" },
      },
      {
        say: [tr("Sıra sende: 'Her şey değişti.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Alles hat sich verändert",
          hint: [
            tr("Zamiri unutma, bu fiil onsuz kullanılmaz:"),
            de("Alles hat sich verändert."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız alışmayı anlatır:"),
          de("Ich habe mich daran gewöhnt."),
          tr("'Ona alıştım' demek. Bu sefer zamir 'kendimi' anlamında. Lütfen"),
          de("Ich habe mich daran gewöhnt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe mich daran gewöhnt" },
      },
      {
        say: [tr("Şimdi sen: 'Yeni işime alıştım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe mich an die neue Arbeit gewöhnt",
          hint: [
            tr("Neye alıştığını da söylemen gerekiyor; bu fiil tek başına yarım kalır:"),
            de("Ich habe mich an die neue Arbeit gewöhnt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız iki zamanı karşılaştırır:"),
          de("Am Anfang war es schwierig, jetzt bin ich selbstständig."),
          tr("Lütfen"),
          de("Am Anfang war es schwierig, jetzt bin ich selbstständig"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Am Anfang war es schwierig, jetzt bin ich selbstständig",
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe mich an das Wetter gewöhnt."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe mich an das Wetter gewöhnt.",
          answer: true,
          why: [
            tr("Doğru. Dönüşlü zamir yardımcı fiilin hemen arkasında ve geçmiş biçim cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık değişimi anlatabilirsin. Şimdi biri sana buraya geldiğinden beri nelerin değiştiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir tanıdığın Almanya'ya geldiğinden beri nelerin değiştiğini soruyor. Neyin değiştiğini, neye alıştığını ve başlangıç ile bugünü karşılaştırarak anlat.",
      partner: "kendi değişimini de anlatan, anlayışlı bir tanıdık",
      opening: "Und, was hat sich für dich am meisten verändert?",
      openingTr: "Peki senin için en çok ne değişti?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-grosseltern",
    icon: "family",
    level: "A2",
    course: "de",
    title: "Bei meinen Großeltern",
    titleTr: "Dede-nine anıları",
    summary: "Çocukluk anılarını anlatmayı öğretir: orası nasıldı, ne vardı, neye izin vardı.",
    minutes: 9,
    focusId: "Präteritum-sein-haben",
    vocab: [
      { de: "die Großeltern", tr: "büyükanne ve büyükbaba" },
      { de: "die Erinnerung", tr: "anı" },
      { de: "backen", tr: "fırında pişirmek" },
      { de: "das Enkelkind", tr: "torun" },
      { de: "riechen", tr: "kokmak" },
    ],
    patterns: [
      { de: "Bei meinen Großeltern war es …", tr: "orasının nasıl olduğunu söyler" },
      { de: "Es gab immer …", tr: "orada her zaman ne olduğunu söyler" },
      { de: "Ich durfte …", tr: "neye izin verildiğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün çocukluk anılarını anlatmayı öğreneceğiz. Geçmişi tek kelimeyle söyleyen biçimleri biliyorsun; bugün onlara bir tane daha eklenecek ve anlatım tamamlanacak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Anı anlatırken hep aynı üç şey söyleniyor: orası nasıldı, orada ne vardı, neye izin vardı. Üçünün de hazır kalıbı var. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("die Großeltern"),
          tr("Türkçesi 'büyükanne ve büyükbaba' demek; tek kelime, hep çoğul. Lütfen"),
          de("die Großeltern"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Großeltern" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("die Erinnerung"),
          tr("Türkçesi 'anı' demek. Lütfen"),
          de("die Erinnerung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Erinnerung" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("backen"),
          tr("Türkçesi 'fırında pişirmek' demek — kek, ekmek. Lütfen"),
          de("backen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "backen" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("das Enkelkind"),
          tr("Türkçesi 'torun' demek. Lütfen"),
          de("das Enkelkind"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "das Enkelkind" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("riechen"),
          tr("Türkçesi 'kokmak' demek. Lütfen"),
          de("riechen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "riechen" },
      },
      {
        say: [
          tr("Kokuyla fırın hep yan yana anılır:"),
          de("Meine Oma hat jeden Sonntag Kuchen gebacken."),
        ],
      },
      {
        say: [
          tr("İlk kalıbımız orayı anlatır:"),
          de("Bei meinen Großeltern war es immer warm."),
          tr("Lütfen"),
          de("Bei meinen Großeltern war es immer warm"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Bei meinen Großeltern war es immer warm" },
      },
      {
        say: [tr("Sıra sende: 'Büyükannemlerde her zaman sakindi.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Bei meinen Großeltern war es immer ruhig",
          hint: [
            tr("Başta yer bildiren bir öbek var, o yüzden fiil hemen arkasından gelir:"),
            de("Bei meinen Großeltern war es immer ruhig."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız orada ne olduğunu söyler:"),
          de("Es gab immer Kuchen."),
          tr("'Her zaman kek olurdu' demek. Lütfen"),
          de("Es gab immer Kuchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Es gab immer Kuchen" },
      },
      {
        say: [tr("Şimdi sen: 'Ev her zaman ekmek kokardı.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Das Haus hat immer nach Brot gerochen",
          hint: [
            tr("Kokmak fiilinin geçmiş biçimi cümlenin sonuna gider:"),
            de("Das Haus hat immer nach Brot gerochen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız izni anlatır:"),
          de("Ich durfte lange draußen bleiben."),
          tr("'Dışarıda uzun kalmama izin vardı' demek. Lütfen"),
          de("Ich durfte lange draußen bleiben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich durfte lange draußen bleiben" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Bei meinen Großeltern es war immer warm."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Bei meinen Großeltern es war immer warm.",
          answer: false,
          why: [
            tr("Başta yer bildiren bir öbek varken fiil ikinci sıraya geçmeli. Doğrusu"),
            de("Bei meinen Großeltern war es immer warm."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık çocukluk anılarını anlatabilirsin. Şimdi biri sana çocukken tatilleri nerede geçirdiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla çocukluk anılarınızı paylaşıyorsunuz. Büyüklerinin yanının nasıl olduğunu, orada ne olduğunu ve neye izin verildiğini anlat.",
      partner: "kendi çocukluğunu özleyen, duygulu bir arkadaş",
      opening: "Wo warst du als Kind am liebsten?",
      openingTr: "Çocukken en çok nerede olmayı severdin?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-peinlich",
    icon: "feelings",
    level: "A2",
    course: "de",
    title: "Das war mir so peinlich!",
    titleTr: "Utanç anısı",
    summary: "Başına gelen utanç verici bir olayı anlatmayı öğretir.",
    minutes: 9,
    focusId: "Perfekt-unregelmäßig",
    vocab: [
      { de: "peinlich", tr: "utanç verici" },
      { de: "lachen", tr: "gülmek" },
      { de: "verwechseln", tr: "karıştırmak" },
      { de: "die Situation", tr: "durum" },
      { de: "sich schämen", tr: "utanmak" },
    ],
    patterns: [
      { de: "Mir ist … passiert.", tr: "başına bir şey geldiğini söyler" },
      { de: "Alle haben gelacht.", tr: "herkesin güldüğünü söyler" },
      { de: "Zum Glück …", tr: "işin iyi tarafını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün başına gelen utanç verici bir olayı anlatmayı öğreneceğiz. Bu tür hikâyeler her sohbette çıkar ve anlatması da dinlemesi de keyiflidir. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İlk kalıpta küçük bir fark var: olay senin başına geliyor, yani sen özne değilsin. Almancada bu durumda cümle 'bana oldu' diye kurulur. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("peinlich"),
          tr("Türkçesi 'utanç verici' demek. Lütfen"),
          de("peinlich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "peinlich" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("lachen"),
          tr("Türkçesi 'gülmek' demek. Lütfen"),
          de("lachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "lachen" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("verwechseln"),
          tr("Türkçesi 'karıştırmak' demek — birini başkası sanmak gibi. Lütfen"),
          de("verwechseln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "verwechseln" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("die Situation"),
          tr("Türkçesi 'durum' demek. Lütfen"),
          de("die Situation"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Situation" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("sich schämen"),
          tr("Türkçesi 'utanmak' demek. Lütfen"),
          de("sich schämen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "sich schämen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Mir ist etwas Peinliches passiert."),
          tr("'Başıma utanç verici bir şey geldi' demek. Lütfen"),
          de("Mir ist etwas Peinliches passiert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mir ist etwas Peinliches passiert" },
      },
      {
        say: [tr("Sıra sende: 'Otobüste düştüm.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bin im Bus hingefallen",
          hint: [
            tr("Düşmek yer değiştirme bildirir, o yüzden bu yardımcı fiili alır:"),
            de("Ich bin im Bus hingefallen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız çevrenin tepkisini anlatır. Önce durumu duyalım:"),
          de("Die Situation war furchtbar."),
          tr("En sık yaşanan aksiliklerden biri de budur:"),
          de("Ich habe die Namen verwechselt."),
          tr("Sonra tepki:"),
          de("Alle haben gelacht."),
          tr("'Herkes güldü' demek. Lütfen"),
          de("Alle haben gelacht"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Alle haben gelacht" },
      },
      {
        say: [tr("Şimdi sen: 'Çok utandım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe mich sehr geschämt",
          hint: [
            tr("Dönüşlü zamir yardımcı fiilin arkasında, geçmiş biçim sonda:"),
            de("Ich habe mich sehr geschämt."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız hikâyeyi yumuşatır:"),
          de("Zum Glück hat es niemand gesehen."),
          tr("'İyi ki kimse görmedi' demek. Lütfen"),
          de("Zum Glück hat es niemand gesehen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Zum Glück hat es niemand gesehen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mir ist ein Fehler passiert."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mir ist ein Fehler passiert.",
          answer: true,
          why: [
            tr("Doğru. Olay senin başına geldiği için cümle 'bana' ile başlar ve fiil yer değiştirme bildirdiği için bu yardımcı fiili alır."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık böyle bir anıyı anlatabilirsin. Şimdi bir arkadaşın seni güldürecek bir hikâye isteyecek.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşınla utanç verici anılarınızı paylaşıyorsunuz. Başına ne geldiğini, çevrenin nasıl tepki verdiğini ve işin iyi tarafını anlat.",
      partner: "kendi hikâyesini de anlatmaya hazır, şakacı bir arkadaş",
      opening: "Erzähl mal, was war dir mal richtig peinlich?",
      openingTr: "Anlatsana, en çok neye utandın?",
      minTurns: 4,
    },
  },
  {
    id: "de-a2-erfolg",
    icon: "star",
    level: "A2",
    course: "de",
    title: "Darauf bin ich stolz",
    titleTr: "Gurur anısı",
    summary: "Başardığın bir şeyi ve arkasındaki emeği anlatmayı öğretir.",
    minutes: 9,
    focusId: "Perfekt",
    vocab: [
      { de: "der Erfolg", tr: "başarı" },
      { de: "hart", tr: "sıkı, ağır" },
      { de: "die Mühe", tr: "emek, çaba" },
      { de: "aufgeben", tr: "pes etmek" },
      { de: "weitermachen", tr: "devam etmek" },
    ],
    patterns: [
      { de: "Ich habe es geschafft.", tr: "bir şeyi başardığını söyler" },
      { de: "Ich habe hart gearbeitet.", tr: "arkasındaki emeği söyler" },
      { de: "Darauf bin ich stolz.", tr: "gurur duyduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bu modülün son dersi. Bugün başardığın bir şeyi anlatmayı öğreneceğiz — hikâyenin en güzel kısmı burası. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bir başarıyı anlatmak üç parçadan oluşuyor: ne yaptın, ne kadar emek verdin, şimdi ne hissediyorsun. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      {
        say: [
          tr("İlk kelimemiz:"),
          de("der Erfolg"),
          tr("Türkçesi 'başarı' demek. Lütfen"),
          de("der Erfolg"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "der Erfolg" },
      },
      {
        say: [
          tr("İkinci kelimemiz:"),
          de("hart"),
          tr("Türkçesi 'sıkı, ağır' demek — sıkı çalışmak derkenki gibi. Lütfen"),
          de("hart"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "hart" },
      },
      {
        say: [
          tr("Üçüncü kelimemiz:"),
          de("die Mühe"),
          tr("Türkçesi 'emek, çaba' demek. Lütfen"),
          de("die Mühe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "die Mühe" },
      },
      {
        say: [
          tr("Dördüncü kelimemiz:"),
          de("aufgeben"),
          tr("Türkçesi 'pes etmek' demek. Lütfen"),
          de("aufgeben"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "aufgeben" },
      },
      {
        say: [
          tr("Son kelimemiz:"),
          de("weitermachen"),
          tr("Türkçesi 'devam etmek' demek. Lütfen"),
          de("weitermachen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "weitermachen" },
      },
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich habe es geschafft."),
          tr("'Başardım' demek ve tek başına bir cümle olarak kullanılır. Lütfen"),
          de("Ich habe es geschafft"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich habe es geschafft" },
      },
      {
        say: [tr("Sıra sende: 'Çok sıkı çalıştım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe sehr hart gearbeitet",
          hint: [
            tr("Geçmiş biçim cümlenin en sonuna gider:"),
            de("Ich habe sehr hart gearbeitet."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız gururu anlatır:"),
          de("Darauf bin ich stolz."),
          tr("'Bununla gurur duyuyorum' demek. Lütfen"),
          de("Darauf bin ich stolz"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darauf bin ich stolz" },
      },
      {
        say: [tr("Şimdi sen: 'Pes etmedim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich habe nicht aufgegeben",
          hint: [
            tr("Olumsuzluk geçmiş biçimin önüne gelir:"),
            de("Ich habe nicht aufgegeben."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Die Mühe hat sich gelohnt."),
          tr("'Emek boşa gitmedi' demek. Lütfen"),
          de("Die Mühe hat sich gelohnt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Mühe hat sich gelohnt" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich habe weitergemacht und es geschafft."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich habe weitergemacht und es geschafft.",
          answer: true,
          why: [
            tr("Doğru. İki geçmiş biçim de kendi bölümünün sonunda duruyor ve yardımcı fiil bir kez söyleniyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin. Şimdi biri sana neyle gurur duyduğunu soracak ve ona kendi hikâyeni anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir iş görüşmesinden önce tanıştığın biri neyle gurur duyduğunu soruyor. Neyi başardığını, ne kadar emek verdiğini ve pes etmediğini anlat.",
      partner: "seni dinleyen, teşvik eden bir tanıdık",
      opening: "Worauf bist du in deinem Leben besonders stolz?",
      openingTr: "Hayatında en çok neyle gurur duyuyorsun?",
      minTurns: 4,
    },
  },
];
